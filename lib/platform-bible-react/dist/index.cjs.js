"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=require("react/jsx-runtime"),Z=require("@mui/material"),te=require("react"),Ur=require("react-data-grid"),_r=require("@mui/styled-engine");function vn(e){const r=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:()=>e[t]})}}return r.default=e,Object.freeze(r)}const rr=vn(te);function Oe({id:e,isDisabled:r=!1,className:t,onClick:n,onContextMenu:o,children:a}){return S.jsx(Z.Button,{id:e,disabled:r,className:`papi-button ${t??""}`,onClick:n,onContextMenu:o,children:a})}function ur({id:e,title:r,isDisabled:t=!1,isClearable:n=!0,hasError:o=!1,isFullWidth:a=!1,width:s,options:c=[],className:u,value:i,onChange:l,onFocus:d,onBlur:f,getOptionLabel:b}){return S.jsx(Z.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!n,fullWidth:a,options:c,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:i,onChange:l,onFocus:d,onBlur:f,getOptionLabel:b,renderInput:y=>S.jsx(Z.TextField,{...y,error:o,fullWidth:a,disabled:t,label:r,style:{width:s}})})}function xn({startChapter:e,endChapter:r,handleSelectStartChapter:t,handleSelectEndChapter:n,isDisabled:o,chapterCount:a}){const s=te.useMemo(()=>Array.from({length:a},(i,l)=>l+1),[a]),c=(i,l)=>{t(l),l>r&&n(l)},u=(i,l)=>{n(l),l<e&&t(l)};return S.jsxs(S.Fragment,{children:[S.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:S.jsx(ur,{onChange:(i,l)=>c(i,l),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:i=>i.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),S.jsx(Z.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:S.jsx(ur,{onChange:(i,l)=>u(i,l),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:i=>i.toString(),value:r,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ae=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ae||{});function jt({id:e,isChecked:r,labelText:t="",labelPosition:n=Ae.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:u,onChange:i}){const l=S.jsx(Z.Checkbox,{id:e,checked:r,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${u??""}`,onChange:i});let d;if(t){const f=n===Ae.Before||n===Ae.Above,b=S.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${u??""}`,children:t}),y=n===Ae.Before||n===Ae.After,h=y?b:S.jsx("div",{children:b}),p=y?l:S.jsx("div",{children:l});d=S.jsxs(Z.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[f&&h,p,!f&&h]})}else d=l;return d}function Dt(e){const{onClick:r,name:t,hasAutoFocus:n=!1,className:o,isDense:a=!0,hasDisabledGutters:s=!1,hasDivider:c=!1,focusVisibleClassName:u,id:i,children:l}=e;return S.jsx(Z.MenuItem,{autoFocus:n,className:o,dense:a,disableGutters:s,divider:c,focusVisibleClassName:u,onClick:r,id:i,children:t||l})}function Nn({commandHandler:e,name:r,className:t,items:n,id:o}){return S.jsxs(Z.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${t??""}`,children:[S.jsx("h3",{className:`papi-menu ${t??""}`,children:r}),n.map((a,s)=>S.jsx(Dt,{className:`papi-menu-item ${a.className}`,onClick:()=>{e(a)},...a},s))]})}function Vt({commandHandler:e,className:r,columns:t,id:n}){return S.jsx(Z.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${r??""}`,columns:t.length,id:n,children:t.map((o,a)=>S.jsx(Nn,{commandHandler:e,name:o.name,className:r,items:o.items},a))})}function Sn({id:e,label:r,isDisabled:t=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:u,children:i}){return S.jsx(Z.IconButton,{id:e,disabled:t,edge:a,size:s,"aria-label":r,title:o?void 0:n??r,className:`papi-icon-button ${c??""}`,onClick:u,children:i})}var kn=Object.defineProperty,En=(e,r,t)=>r in e?kn(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,$=(e,r,t)=>(En(e,typeof r!="symbol"?r+"":r,t),t);const Pe=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ar=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],zt=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Kr=Mn();function Ge(e,r=!0){return r&&(e=e.toUpperCase()),e in Kr?Kr[e]:0}function Pr(e){return Ge(e)>0}function wn(e){const r=typeof e=="string"?Ge(e):e;return r>=40&&r<=66}function Tn(e){return(typeof e=="string"?Ge(e):e)<=39}function Lt(e){return e<=66}function Cn(e){const r=typeof e=="string"?Ge(e):e;return Jt(r)&&!Lt(r)}function*On(){for(let e=1;e<=Pe.length;e++)yield e}const _n=1,qt=Pe.length;function Rn(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Mr(e,r="***"){const t=e-1;return t<0||t>=Pe.length?r:Pe[t]}function Xt(e){return e<=0||e>qt?"******":zt[e-1]}function $n(e){return Xt(Ge(e))}function Jt(e){const r=typeof e=="number"?Mr(e):e;return Pr(r)&&!Ar.includes(r)}function An(e){const r=typeof e=="number"?Mr(e):e;return Pr(r)&&Ar.includes(r)}function Pn(e){return zt[e-1].includes("*obsolete*")}function Mn(){const e={};for(let r=0;r<Pe.length;r++)e[Pe[r]]=r+1;return e}const _e={allBookIds:Pe,nonCanonicalIds:Ar,bookIdToNumber:Ge,isBookIdValid:Pr,isBookNT:wn,isBookOT:Tn,isBookOTNT:Lt,isBookDC:Cn,allBookNumbers:On,firstBook:_n,lastBook:qt,extraBooks:Rn,bookNumberToId:Mr,bookNumberToEnglishName:Xt,bookIdToEnglishName:$n,isCanonical:Jt,isExtraMaterial:An,isObsolete:Pn};var Se=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Se||{});const Re=class{constructor(e){if($(this,"name"),$(this,"fullPath"),$(this,"isPresent"),$(this,"hasVerseSegments"),$(this,"isCustomized"),$(this,"baseVersification"),$(this,"scriptureBooks"),$(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ce=Re;$(ce,"Original",new Re(Se.Original)),$(ce,"Septuagint",new Re(Se.Septuagint)),$(ce,"Vulgate",new Re(Se.Vulgate)),$(ce,"English",new Re(Se.English)),$(ce,"RussianProtestant",new Re(Se.RussianProtestant)),$(ce,"RussianOrthodox",new Re(Se.RussianOrthodox));function Wr(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var Ht=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ht||{});const _=class{constructor(r,t,n,o){if($(this,"firstChapter"),$(this,"lastChapter"),$(this,"lastVerse"),$(this,"hasSegmentsDefined"),$(this,"text"),$(this,"BBBCCCVVVS"),$(this,"longHashCode"),$(this,"versification"),$(this,"rtlMark","‏"),$(this,"_bookNum",0),$(this,"_chapterNum",0),$(this,"_verseNum",0),$(this,"_verse"),n==null&&o==null)if(r!=null&&typeof r=="string"){const a=r,s=t!=null&&t instanceof ce?t:void 0;this.setEmpty(s),this.parse(a)}else if(r!=null&&typeof r=="number"){const a=t!=null&&t instanceof ce?t:void 0;this.setEmpty(a),this._verseNum=r%_.chapterDigitShifter,this._chapterNum=Math.floor(r%_.bookDigitShifter/_.chapterDigitShifter),this._bookNum=Math.floor(r/_.bookDigitShifter)}else if(t==null)if(r!=null&&r instanceof _){const a=r;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(r==null)return;const a=r instanceof ce?r:_.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(r!=null&&t!=null&&n!=null)if(typeof r=="string"&&typeof t=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(r,t,n);else if(typeof r=="number"&&typeof t=="number"&&typeof n=="number")this._bookNum=r,this._chapterNum=t,this._verseNum=n,this.versification=o??_.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(r,t=_.defaultVersification){const n=new _(t);return n.parse(r),n}static isVerseParseable(r){return r.length>0&&"0123456789".includes(r[0])&&!r.endsWith(this.verseRangeSeparator)&&!r.endsWith(this.verseSequenceIndicator)}static tryParse(r){let t;try{return t=_.parse(r),{success:!0,verseRef:t}}catch(n){if(n instanceof Ke)return t=new _,{success:!1,verseRef:t};throw n}}static getBBBCCCVVV(r,t,n){return r%_.bcvMaxValue*_.bookDigitShifter+(t>=0?t%_.bcvMaxValue*_.chapterDigitShifter:0)+(n>=0?n%_.bcvMaxValue:0)}static tryGetVerseNum(r){let t;if(!r)return t=-1,{success:!0,vNum:t};t=0;let n;for(let o=0;o<r.length;o++){if(n=r[o],n<"0"||n>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +n-+"0",t>_.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(_.verseRangeSeparator)||this._verse.includes(_.verseSequenceIndicator))}get book(){return _e.bookNumberToId(this.bookNum,"")}set book(r){this.bookNum=_e.bookIdToNumber(r)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(r){const t=+r;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(r){const{success:t,vNum:n}=_.tryGetVerseNum(r);this._verse=t?void 0:r.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=_.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(r){if(r<=0||r>_e.lastBook)throw new Ke("BookNum must be greater than zero and less than or equal to last book");this._bookNum=r}get chapterNum(){return this._chapterNum}set chapterNum(r){this.chapterNum=r}get verseNum(){return this._verseNum}set verseNum(r){this._verseNum=r}get versificationStr(){var r;return(r=this.versification)==null?void 0:r.name}set versificationStr(r){this.versification=this.versification!=null?new ce(r):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(_.verseRangeSeparators,_.verseSequenceIndicators)}get BBBCCC(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(r){if(r=r.replace(this.rtlMark,""),r.includes("/")){const a=r.split("/");if(r=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new ce(Se[s])}catch{throw new Ke("Invalid reference : "+r)}}const t=r.trim().split(" ");if(t.length!==2)throw new Ke("Invalid reference : "+r);const n=t[1].split(":"),o=+n[0];if(n.length!==2||_e.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!_.isVerseParseable(n[1]))throw new Ke("Invalid reference : "+r);this.updateInternal(t[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new _(this)}toString(){const r=this.book;return r===""?"":`${r} ${this.chapter}:${this.verse}`}equals(r){return r._bookNum===this._bookNum&&r._chapterNum===this._chapterNum&&r._verseNum===this._verseNum&&r._verse===this._verse&&r.versification!=null&&this.versification!=null&&r.versification.equals(this.versification)}allVerses(r=!1,t=_.verseRangeSeparators,n=_.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Wr(this._verse,n);for(const s of a.map(c=>Wr(c,t))){const c=this.clone();c.verse=s[0];const u=c.verseNum;if(o.push(c),s.length>1){const i=this.clone();if(i.verse=s[1],!r)for(let l=u+1;l<i.verseNum;l++){const d=new _(this._bookNum,this._chapterNum,l,this.versification);this.isExcluded||o.push(d)}o.push(i)}}return o}validateVerse(r,t){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,r,t)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>_e.lastBook?2:0}setEmpty(r=_.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=r}updateInternal(r,t,n){this.bookNum=_e.bookIdToNumber(r),this.chapter=t,this.verse=n}};let be=_;$(be,"defaultVersification",ce.English),$(be,"verseRangeSeparator","-"),$(be,"verseSequenceIndicator",","),$(be,"verseRangeSeparators",[_.verseRangeSeparator]),$(be,"verseSequenceIndicators",[_.verseSequenceIndicator]),$(be,"chapterDigitShifter",1e3),$(be,"bookDigitShifter",_.chapterDigitShifter*_.chapterDigitShifter),$(be,"bcvMaxValue",_.chapterDigitShifter-1),$(be,"ValidStatusType",Ht);class Ke extends Error{}var In=Object.defineProperty,Bn=(e,r,t)=>r in e?In(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,A=(e,r,t)=>(Bn(e,typeof r!="symbol"?r+"":r,t),t);const Me=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ir=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Gt=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Yr=Gn();function Fe(e,r=!0){return r&&(e=e.toUpperCase()),e in Yr?Yr[e]:0}function Br(e){return Fe(e)>0}function jn(e){const r=typeof e=="string"?Fe(e):e;return r>=40&&r<=66}function Dn(e){return(typeof e=="string"?Fe(e):e)<=39}function Ft(e){return e<=66}function Vn(e){const r=typeof e=="string"?Fe(e):e;return Wt(r)&&!Ft(r)}function*zn(){for(let e=1;e<=Me.length;e++)yield e}const Ln=1,Ut=Me.length;function qn(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function jr(e,r="***"){const t=e-1;return t<0||t>=Me.length?r:Me[t]}function Kt(e){return e<=0||e>Ut?"******":Gt[e-1]}function Xn(e){return Kt(Fe(e))}function Wt(e){const r=typeof e=="number"?jr(e):e;return Br(r)&&!Ir.includes(r)}function Jn(e){const r=typeof e=="number"?jr(e):e;return Br(r)&&Ir.includes(r)}function Hn(e){return Gt[e-1].includes("*obsolete*")}function Gn(){const e={};for(let r=0;r<Me.length;r++)e[Me[r]]=r+1;return e}const ke={allBookIds:Me,nonCanonicalIds:Ir,bookIdToNumber:Fe,isBookIdValid:Br,isBookNT:jn,isBookOT:Dn,isBookOTNT:Ft,isBookDC:Vn,allBookNumbers:zn,firstBook:Ln,lastBook:Ut,extraBooks:qn,bookNumberToId:jr,bookNumberToEnglishName:Kt,bookIdToEnglishName:Xn,isCanonical:Wt,isExtraMaterial:Jn,isObsolete:Hn};var Ee=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ee||{});const $e=class{constructor(e){if(A(this,"name"),A(this,"fullPath"),A(this,"isPresent"),A(this,"hasVerseSegments"),A(this,"isCustomized"),A(this,"baseVersification"),A(this,"scriptureBooks"),A(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let le=$e;A(le,"Original",new $e(Ee.Original)),A(le,"Septuagint",new $e(Ee.Septuagint)),A(le,"Vulgate",new $e(Ee.Vulgate)),A(le,"English",new $e(Ee.English)),A(le,"RussianProtestant",new $e(Ee.RussianProtestant)),A(le,"RussianOrthodox",new $e(Ee.RussianOrthodox));function Zr(e,r){const t=r[0];for(let n=1;n<r.length;n++)e=e.split(r[n]).join(t);return e.split(t)}var Yt=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Yt||{});const R=class{constructor(e,r,t,n){if(A(this,"firstChapter"),A(this,"lastChapter"),A(this,"lastVerse"),A(this,"hasSegmentsDefined"),A(this,"text"),A(this,"BBBCCCVVVS"),A(this,"longHashCode"),A(this,"versification"),A(this,"rtlMark","‏"),A(this,"_bookNum",0),A(this,"_chapterNum",0),A(this,"_verseNum",0),A(this,"_verse"),t==null&&n==null)if(e!=null&&typeof e=="string"){const o=e,a=r!=null&&r instanceof le?r:void 0;this.setEmpty(a),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=r!=null&&r instanceof le?r:void 0;this.setEmpty(o),this._verseNum=e%R.chapterDigitShifter,this._chapterNum=Math.floor(e%R.bookDigitShifter/R.chapterDigitShifter),this._bookNum=Math.floor(e/R.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof R){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof le?e:R.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&t!=null)if(typeof e=="string"&&typeof r=="string"&&typeof t=="string")this.setEmpty(n),this.updateInternal(e,r,t);else if(typeof e=="number"&&typeof r=="number"&&typeof t=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=t,this.versification=n??R.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,r=R.defaultVersification){const t=new R(r);return t.parse(e),t}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=R.parse(e),{success:!0,verseRef:r}}catch(t){if(t instanceof We)return r=new R,{success:!1,verseRef:r};throw t}}static getBBBCCCVVV(e,r,t){return e%R.bcvMaxValue*R.bookDigitShifter+(r>=0?r%R.bcvMaxValue*R.chapterDigitShifter:0)+(t>=0?t%R.bcvMaxValue:0)}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let t;for(let n=0;n<e.length;n++){if(t=e[n],t<"0"||t>"9")return n===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +t-+"0",r>R.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(R.verseRangeSeparator)||this._verse.includes(R.verseSequenceIndicator))}get book(){return ke.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=ke.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:t}=R.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=R.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>ke.lastBook)throw new We("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new le(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(R.verseRangeSeparators,R.verseSequenceIndicators)}get BBBCCC(){return R.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return R.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const a=+o[1].trim();this.versification=new le(Ee[a])}catch{throw new We("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new We("Invalid reference : "+e);const t=r[1].split(":"),n=+t[0];if(t.length!==2||ke.bookIdToNumber(r[0])===0||!Number.isInteger(n)||n<0||!R.isVerseParseable(t[1]))throw new We("Invalid reference : "+e);this.updateInternal(r[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new R(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,r=R.verseRangeSeparators,t=R.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const n=[],o=Zr(this._verse,t);for(const a of o.map(s=>Zr(s,r))){const s=this.clone();s.verse=a[0];const c=s.verseNum;if(n.push(s),a.length>1){const u=this.clone();if(u.verse=a[1],!e)for(let i=c+1;i<u.verseNum;i++){const l=new R(this._bookNum,this._chapterNum,i,this.versification);this.isExcluded||n.push(l)}n.push(u)}}return n}validateVerse(e,r){if(!this.verse)return this.internalValid;let t=0;for(const n of this.allVerses(!0,e,r)){const o=n.internalValid;if(o!==0)return o;const a=n.BBBCCCVVV;if(t>a)return 3;if(t===a)return 4;t=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ke.lastBook?2:0}setEmpty(e=R.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,t){this.bookNum=ke.bookIdToNumber(e),this.chapter=r,this.verse=t}};let ye=R;A(ye,"defaultVersification",le.English),A(ye,"verseRangeSeparator","-"),A(ye,"verseSequenceIndicator",","),A(ye,"verseRangeSeparators",[R.verseRangeSeparator]),A(ye,"verseSequenceIndicators",[R.verseSequenceIndicator]),A(ye,"chapterDigitShifter",1e3),A(ye,"bookDigitShifter",R.chapterDigitShifter*R.chapterDigitShifter),A(ye,"bcvMaxValue",R.chapterDigitShifter-1),A(ye,"ValidStatusType",Yt);class We extends Error{}const Zt=[{shortName:"ERR",fullNames:["ERROR"],chapters:-1},{shortName:"GEN",fullNames:["Genesis"],chapters:50},{shortName:"EXO",fullNames:["Exodus"],chapters:40},{shortName:"LEV",fullNames:["Leviticus"],chapters:27},{shortName:"NUM",fullNames:["Numbers"],chapters:36},{shortName:"DEU",fullNames:["Deuteronomy"],chapters:34},{shortName:"JOS",fullNames:["Joshua"],chapters:24},{shortName:"JDG",fullNames:["Judges"],chapters:21},{shortName:"RUT",fullNames:["Ruth"],chapters:4},{shortName:"1SA",fullNames:["1 Samuel"],chapters:31},{shortName:"2SA",fullNames:["2 Samuel"],chapters:24},{shortName:"1KI",fullNames:["1 Kings"],chapters:22},{shortName:"2KI",fullNames:["2 Kings"],chapters:25},{shortName:"1CH",fullNames:["1 Chronicles"],chapters:29},{shortName:"2CH",fullNames:["2 Chronicles"],chapters:36},{shortName:"EZR",fullNames:["Ezra"],chapters:10},{shortName:"NEH",fullNames:["Nehemiah"],chapters:13},{shortName:"EST",fullNames:["Esther"],chapters:10},{shortName:"JOB",fullNames:["Job"],chapters:42},{shortName:"PSA",fullNames:["Psalm","Psalms"],chapters:150},{shortName:"PRO",fullNames:["Proverbs"],chapters:31},{shortName:"ECC",fullNames:["Ecclesiastes"],chapters:12},{shortName:"SNG",fullNames:["Song of Solomon","Song of Songs"],chapters:8},{shortName:"ISA",fullNames:["Isaiah"],chapters:66},{shortName:"JER",fullNames:["Jeremiah"],chapters:52},{shortName:"LAM",fullNames:["Lamentations"],chapters:5},{shortName:"EZK",fullNames:["Ezekiel"],chapters:48},{shortName:"DAN",fullNames:["Daniel"],chapters:12},{shortName:"HOS",fullNames:["Hosea"],chapters:14},{shortName:"JOL",fullNames:["Joel"],chapters:3},{shortName:"AMO",fullNames:["Amos"],chapters:9},{shortName:"OBA",fullNames:["Obadiah"],chapters:1},{shortName:"JON",fullNames:["Jonah"],chapters:4},{shortName:"MIC",fullNames:["Micah"],chapters:7},{shortName:"NAM",fullNames:["Nahum"],chapters:3},{shortName:"HAB",fullNames:["Habakkuk"],chapters:3},{shortName:"ZEP",fullNames:["Zephaniah"],chapters:3},{shortName:"HAG",fullNames:["Haggai"],chapters:2},{shortName:"ZEC",fullNames:["Zechariah"],chapters:14},{shortName:"MAL",fullNames:["Malachi"],chapters:4},{shortName:"MAT",fullNames:["Matthew"],chapters:28},{shortName:"MRK",fullNames:["Mark"],chapters:16},{shortName:"LUK",fullNames:["Luke"],chapters:24},{shortName:"JHN",fullNames:["John"],chapters:21},{shortName:"ACT",fullNames:["Acts"],chapters:28},{shortName:"ROM",fullNames:["Romans"],chapters:16},{shortName:"1CO",fullNames:["1 Corinthians"],chapters:16},{shortName:"2CO",fullNames:["2 Corinthians"],chapters:13},{shortName:"GAL",fullNames:["Galatians"],chapters:6},{shortName:"EPH",fullNames:["Ephesians"],chapters:6},{shortName:"PHP",fullNames:["Philippians"],chapters:4},{shortName:"COL",fullNames:["Colossians"],chapters:4},{shortName:"1TH",fullNames:["1 Thessalonians"],chapters:5},{shortName:"2TH",fullNames:["2 Thessalonians"],chapters:3},{shortName:"1TI",fullNames:["1 Timothy"],chapters:6},{shortName:"2TI",fullNames:["2 Timothy"],chapters:4},{shortName:"TIT",fullNames:["Titus"],chapters:3},{shortName:"PHM",fullNames:["Philemon"],chapters:1},{shortName:"HEB",fullNames:["Hebrews"],chapters:13},{shortName:"JAS",fullNames:["James"],chapters:5},{shortName:"1PE",fullNames:["1 Peter"],chapters:5},{shortName:"2PE",fullNames:["2 Peter"],chapters:3},{shortName:"1JN",fullNames:["1 John"],chapters:5},{shortName:"2JN",fullNames:["2 John"],chapters:1},{shortName:"3JN",fullNames:["3 John"],chapters:1},{shortName:"JUD",fullNames:["Jude"],chapters:1},{shortName:"REV",fullNames:["Revelation"],chapters:22}];let xr;const Nr=()=>(xr||(xr=ke.allBookIds.map(e=>({bookId:e,label:ke.bookIdToEnglishName(e)}))),xr),Qt=1,Fn=Zt.length-1,en=1,rn=1,tn=e=>{var r;return((r=Zt[e])==null?void 0:r.chapters)??-1},Qr=(e,r)=>({bookNum:Math.max(Qt,Math.min(e.bookNum+r,Fn)),chapterNum:1,verseNum:1}),et=(e,r)=>({...e,chapterNum:Math.min(Math.max(en,e.chapterNum+r),tn(e.bookNum)),verseNum:1}),rt=(e,r)=>({...e,verseNum:Math.max(rn,e.verseNum+r)});var Un=Object.getOwnPropertyNames,Kn=Object.getOwnPropertySymbols,Wn=Object.prototype.hasOwnProperty;function tt(e,r){return function(t,n,o){return e(t,n,o)&&r(t,n,o)}}function ir(e){return function(r,t,n){if(!r||!t||typeof r!="object"||typeof t!="object")return e(r,t,n);var o=n.cache,a=o.get(r),s=o.get(t);if(a&&s)return a===t&&s===r;o.set(r,t),o.set(t,r);var c=e(r,t,n);return o.delete(r),o.delete(t),c}}function nt(e){return Un(e).concat(Kn(e))}var nn=Object.hasOwn||function(e,r){return Wn.call(e,r)};function Ue(e,r){return e||r?e===r:e===r||e!==e&&r!==r}var on="_owner",ot=Object.getOwnPropertyDescriptor,at=Object.keys;function Yn(e,r,t){var n=e.length;if(r.length!==n)return!1;for(;n-- >0;)if(!t.equals(e[n],r[n],n,n,e,r,t))return!1;return!0}function Zn(e,r){return Ue(e.getTime(),r.getTime())}function st(e,r,t){if(e.size!==r.size)return!1;for(var n={},o=e.entries(),a=0,s,c;(s=o.next())&&!s.done;){for(var u=r.entries(),i=!1,l=0;(c=u.next())&&!c.done;){var d=s.value,f=d[0],b=d[1],y=c.value,h=y[0],p=y[1];!i&&!n[l]&&(i=t.equals(f,h,a,l,e,r,t)&&t.equals(b,p,f,h,e,r,t))&&(n[l]=!0),l++}if(!i)return!1;a++}return!0}function Qn(e,r,t){var n=at(e),o=n.length;if(at(r).length!==o)return!1;for(var a;o-- >0;)if(a=n[o],a===on&&(e.$$typeof||r.$$typeof)&&e.$$typeof!==r.$$typeof||!nn(r,a)||!t.equals(e[a],r[a],a,a,e,r,t))return!1;return!0}function Ye(e,r,t){var n=nt(e),o=n.length;if(nt(r).length!==o)return!1;for(var a,s,c;o-- >0;)if(a=n[o],a===on&&(e.$$typeof||r.$$typeof)&&e.$$typeof!==r.$$typeof||!nn(r,a)||!t.equals(e[a],r[a],a,a,e,r,t)||(s=ot(e,a),c=ot(r,a),(s||c)&&(!s||!c||s.configurable!==c.configurable||s.enumerable!==c.enumerable||s.writable!==c.writable)))return!1;return!0}function eo(e,r){return Ue(e.valueOf(),r.valueOf())}function ro(e,r){return e.source===r.source&&e.flags===r.flags}function it(e,r,t){if(e.size!==r.size)return!1;for(var n={},o=e.values(),a,s;(a=o.next())&&!a.done;){for(var c=r.values(),u=!1,i=0;(s=c.next())&&!s.done;)!u&&!n[i]&&(u=t.equals(a.value,s.value,a.value,s.value,e,r,t))&&(n[i]=!0),i++;if(!u)return!1}return!0}function to(e,r){var t=e.length;if(r.length!==t)return!1;for(;t-- >0;)if(e[t]!==r[t])return!1;return!0}var no="[object Arguments]",oo="[object Boolean]",ao="[object Date]",so="[object Map]",io="[object Number]",co="[object Object]",lo="[object RegExp]",uo="[object Set]",fo="[object String]",po=Array.isArray,ct=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,lt=Object.assign,ho=Object.prototype.toString.call.bind(Object.prototype.toString);function mo(e){var r=e.areArraysEqual,t=e.areDatesEqual,n=e.areMapsEqual,o=e.areObjectsEqual,a=e.arePrimitiveWrappersEqual,s=e.areRegExpsEqual,c=e.areSetsEqual,u=e.areTypedArraysEqual;return function(i,l,d){if(i===l)return!0;if(i==null||l==null||typeof i!="object"||typeof l!="object")return i!==i&&l!==l;var f=i.constructor;if(f!==l.constructor)return!1;if(f===Object)return o(i,l,d);if(po(i))return r(i,l,d);if(ct!=null&&ct(i))return u(i,l,d);if(f===Date)return t(i,l,d);if(f===RegExp)return s(i,l,d);if(f===Map)return n(i,l,d);if(f===Set)return c(i,l,d);var b=ho(i);return b===ao?t(i,l,d):b===lo?s(i,l,d):b===so?n(i,l,d):b===uo?c(i,l,d):b===co?typeof i.then!="function"&&typeof l.then!="function"&&o(i,l,d):b===no?o(i,l,d):b===oo||b===io||b===fo?a(i,l,d):!1}}function go(e){var r=e.circular,t=e.createCustomConfig,n=e.strict,o={areArraysEqual:n?Ye:Yn,areDatesEqual:Zn,areMapsEqual:n?tt(st,Ye):st,areObjectsEqual:n?Ye:Qn,arePrimitiveWrappersEqual:eo,areRegExpsEqual:ro,areSetsEqual:n?tt(it,Ye):it,areTypedArraysEqual:n?Ye:to};if(t&&(o=lt({},o,t(o))),r){var a=ir(o.areArraysEqual),s=ir(o.areMapsEqual),c=ir(o.areObjectsEqual),u=ir(o.areSetsEqual);o=lt({},o,{areArraysEqual:a,areMapsEqual:s,areObjectsEqual:c,areSetsEqual:u})}return o}function bo(e){return function(r,t,n,o,a,s,c){return e(r,t,c)}}function yo(e){var r=e.circular,t=e.comparator,n=e.createState,o=e.equals,a=e.strict;if(n)return function(c,u){var i=n(),l=i.cache,d=l===void 0?r?new WeakMap:void 0:l,f=i.meta;return t(c,u,{cache:d,equals:o,meta:f,strict:a})};if(r)return function(c,u){return t(c,u,{cache:new WeakMap,equals:o,meta:void 0,strict:a})};var s={cache:void 0,equals:o,meta:void 0,strict:a};return function(c,u){return t(c,u,s)}}we();we({strict:!0});we({circular:!0});we({circular:!0,strict:!0});we({createInternalComparator:function(){return Ue}});we({strict:!0,createInternalComparator:function(){return Ue}});we({circular:!0,createInternalComparator:function(){return Ue}});we({circular:!0,createInternalComparator:function(){return Ue},strict:!0});function we(e){e===void 0&&(e={});var r=e.circular,t=r===void 0?!1:r,n=e.createInternalComparator,o=e.createState,a=e.strict,s=a===void 0?!1:a,c=go(e),u=mo(c),i=n?n(u):bo(u);return yo({circular:t,comparator:u,createState:o,equals:i,strict:s})}function vo(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}vo("","top");function tr({variant:e="outlined",id:r,isDisabled:t=!1,hasError:n=!1,isFullWidth:o=!1,helperText:a,label:s,placeholder:c,isRequired:u=!1,className:i,defaultValue:l,value:d,onChange:f,onFocus:b,onBlur:y}){return S.jsx(Z.TextField,{variant:e,id:r,disabled:t,error:n,fullWidth:o,helperText:a,label:s,placeholder:c,required:u,className:`papi-textfield ${i??""}`,defaultValue:l,value:d,onChange:f,onFocus:b,onBlur:y})}function xo({scrRef:e,handleSubmit:r,id:t}){const n=u=>{r(u)},o=(u,i)=>{const d={bookNum:_e.bookIdToNumber(i.bookId),chapterNum:1,verseNum:1};n(d)},a=u=>{r({...e,chapterNum:+u.target.value})},s=u=>{r({...e,verseNum:+u.target.value})},c=te.useMemo(()=>Nr()[e.bookNum-1],[e.bookNum]);return S.jsxs("span",{id:t,children:[S.jsx(ur,{title:"Book",className:"papi-ref-selector book",value:c,options:Nr(),onChange:o,isClearable:!1,width:200}),S.jsx(Oe,{onClick:()=>n(Qr(e,-1)),isDisabled:e.bookNum<=Qt,children:"<"}),S.jsx(Oe,{onClick:()=>n(Qr(e,1)),isDisabled:e.bookNum>=Nr().length,children:">"}),S.jsx(tr,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:a}),S.jsx(Oe,{onClick:()=>r(et(e,-1)),isDisabled:e.chapterNum<=en,children:"<"}),S.jsx(Oe,{onClick:()=>r(et(e,1)),isDisabled:e.chapterNum>=tn(e.bookNum),children:">"}),S.jsx(tr,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),S.jsx(Oe,{onClick:()=>r(rt(e,-1)),isDisabled:e.verseNum<=rn,children:"<"}),S.jsx(Oe,{onClick:()=>r(rt(e,1)),children:">"})]})}function No({onSearch:e,placeholder:r,isFullWidth:t}){const[n,o]=te.useState(""),a=s=>{o(s),e(s)};return S.jsx(Z.Paper,{component:"form",className:"search-bar-paper",children:S.jsx(tr,{isFullWidth:t,className:"search-bar-input",placeholder:r,value:n,onChange:s=>a(s.target.value)})})}function So({id:e,isDisabled:r=!1,orientation:t="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:u,valueLabelDisplay:i="off",className:l,onChange:d,onChangeCommitted:f}){return S.jsx(Z.Slider,{id:e,disabled:r,orientation:t,min:n,max:o,step:a,marks:s,defaultValue:c,value:u,valueLabelDisplay:i,className:`papi-slider ${t} ${l??""}`,onChange:d,onChangeCommitted:f})}function ko({autoHideDuration:e=void 0,id:r,isOpen:t=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const u={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return S.jsx(Z.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:a,id:r,ContentProps:u})}function Eo({id:e,isChecked:r,isDisabled:t=!1,hasError:n=!1,className:o,onChange:a}){return S.jsx(Z.Switch,{id:e,checked:r,disabled:t,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}function ut({onRowChange:e,row:r,column:t}){const n=o=>{e({...r,[t.key]:o.target.value})};return S.jsx(tr,{defaultValue:r[t.key],onChange:n})}const wo=({onChange:e,disabled:r,checked:t,...n})=>{const o=a=>{e(a.target.checked,a.nativeEvent.shiftKey)};return S.jsx(jt,{...n,isChecked:t,isDisabled:r,onChange:o})};function To({columns:e,sortColumns:r,onSortColumnsChange:t,onColumnResize:n,defaultColumnWidth:o,defaultColumnMinWidth:a,defaultColumnMaxWidth:s,defaultColumnSortable:c=!0,defaultColumnResizable:u=!0,rows:i,enableSelectColumn:l,selectColumnWidth:d=50,rowKeyGetter:f,rowHeight:b=35,headerRowHeight:y=35,selectedRows:h,onSelectedRowsChange:p,onRowsChange:k,onCellClick:Y,onCellDoubleClick:D,onCellContextMenu:P,onCellKeyDown:m,direction:Q="ltr",enableVirtualization:se=!0,onCopy:de,onPaste:ue,onScroll:V,className:ee,id:pe}){const he=te.useMemo(()=>{const ne=e.map(W=>typeof W.editable=="function"?{...W,editable:fe=>!!W.editable(fe),renderEditCell:W.renderEditCell||ut}:W.editable&&!W.renderEditCell?{...W,renderEditCell:ut}:W.renderEditCell&&!W.editable?{...W,editable:!1}:W);return l?[{...Ur.SelectColumn,minWidth:d},...ne]:ne},[e,l,d]);return S.jsx(Ur,{columns:he,defaultColumnOptions:{width:o,minWidth:a,maxWidth:s,sortable:c,resizable:u},sortColumns:r,onSortColumnsChange:t,onColumnResize:n,rows:i,rowKeyGetter:f,rowHeight:b,headerRowHeight:y,selectedRows:h,onSelectedRowsChange:p,onRowsChange:k,onCellClick:Y,onCellDoubleClick:D,onCellContextMenu:P,onCellKeyDown:m,direction:Q,enableVirtualization:se,onCopy:de,onPaste:ue,onScroll:V,renderers:{renderCheckbox:wo},className:ee??"rdg-light",id:pe})}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},M.apply(this,arguments)}function qe(e){return e!==null&&typeof e=="object"&&e.constructor===Object}function an(e){if(!qe(e))return e;const r={};return Object.keys(e).forEach(t=>{r[t]=an(e[t])}),r}function ve(e,r,t={clone:!0}){const n=t.clone?M({},e):e;return qe(e)&&qe(r)&&Object.keys(r).forEach(o=>{o!=="__proto__"&&(qe(r[o])&&o in e&&qe(e[o])?n[o]=ve(e[o],r[o],t):t.clone?n[o]=qe(r[o])?an(r[o]):r[o]:n[o]=r[o])}),n}function Co(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Rr={exports:{}},cr={exports:{}},L={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ft;function Oo(){if(ft)return L;ft=1;var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,i=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,p=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,Y=e?Symbol.for("react.scope"):60119;function D(m){if(typeof m=="object"&&m!==null){var Q=m.$$typeof;switch(Q){case r:switch(m=m.type,m){case u:case i:case n:case a:case o:case d:return m;default:switch(m=m&&m.$$typeof,m){case c:case l:case y:case b:case s:return m;default:return Q}}case t:return Q}}}function P(m){return D(m)===i}return L.AsyncMode=u,L.ConcurrentMode=i,L.ContextConsumer=c,L.ContextProvider=s,L.Element=r,L.ForwardRef=l,L.Fragment=n,L.Lazy=y,L.Memo=b,L.Portal=t,L.Profiler=a,L.StrictMode=o,L.Suspense=d,L.isAsyncMode=function(m){return P(m)||D(m)===u},L.isConcurrentMode=P,L.isContextConsumer=function(m){return D(m)===c},L.isContextProvider=function(m){return D(m)===s},L.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===r},L.isForwardRef=function(m){return D(m)===l},L.isFragment=function(m){return D(m)===n},L.isLazy=function(m){return D(m)===y},L.isMemo=function(m){return D(m)===b},L.isPortal=function(m){return D(m)===t},L.isProfiler=function(m){return D(m)===a},L.isStrictMode=function(m){return D(m)===o},L.isSuspense=function(m){return D(m)===d},L.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===i||m===a||m===o||m===d||m===f||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===b||m.$$typeof===s||m.$$typeof===c||m.$$typeof===l||m.$$typeof===p||m.$$typeof===k||m.$$typeof===Y||m.$$typeof===h)},L.typeOf=D,L}var q={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dt;function _o(){return dt||(dt=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,r=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,i=e?Symbol.for("react.concurrent_mode"):60111,l=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,h=e?Symbol.for("react.block"):60121,p=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,Y=e?Symbol.for("react.scope"):60119;function D(v){return typeof v=="string"||typeof v=="function"||v===n||v===i||v===a||v===o||v===d||v===f||typeof v=="object"&&v!==null&&(v.$$typeof===y||v.$$typeof===b||v.$$typeof===s||v.$$typeof===c||v.$$typeof===l||v.$$typeof===p||v.$$typeof===k||v.$$typeof===Y||v.$$typeof===h)}function P(v){if(typeof v=="object"&&v!==null){var ie=v.$$typeof;switch(ie){case r:var N=v.type;switch(N){case u:case i:case n:case a:case o:case d:return N;default:var Be=N&&N.$$typeof;switch(Be){case c:case l:case y:case b:case s:return Be;default:return ie}}case t:return ie}}}var m=u,Q=i,se=c,de=s,ue=r,V=l,ee=n,pe=y,he=b,ne=t,W=a,oe=o,fe=d,Ce=!1;function Ie(v){return Ce||(Ce=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),g(v)||P(v)===u}function g(v){return P(v)===i}function x(v){return P(v)===c}function O(v){return P(v)===s}function T(v){return typeof v=="object"&&v!==null&&v.$$typeof===r}function E(v){return P(v)===l}function I(v){return P(v)===n}function w(v){return P(v)===y}function C(v){return P(v)===b}function B(v){return P(v)===t}function z(v){return P(v)===a}function j(v){return P(v)===o}function re(v){return P(v)===d}q.AsyncMode=m,q.ConcurrentMode=Q,q.ContextConsumer=se,q.ContextProvider=de,q.Element=ue,q.ForwardRef=V,q.Fragment=ee,q.Lazy=pe,q.Memo=he,q.Portal=ne,q.Profiler=W,q.StrictMode=oe,q.Suspense=fe,q.isAsyncMode=Ie,q.isConcurrentMode=g,q.isContextConsumer=x,q.isContextProvider=O,q.isElement=T,q.isForwardRef=E,q.isFragment=I,q.isLazy=w,q.isMemo=C,q.isPortal=B,q.isProfiler=z,q.isStrictMode=j,q.isSuspense=re,q.isValidElementType=D,q.typeOf=P}()),q}var pt;function sn(){return pt||(pt=1,process.env.NODE_ENV==="production"?cr.exports=Oo():cr.exports=_o()),cr.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Sr,ht;function Ro(){if(ht)return Sr;ht=1;var e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var u=Object.getOwnPropertyNames(s).map(function(l){return s[l]});if(u.join("")!=="0123456789")return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(l){i[l]=l}),Object.keys(Object.assign({},i)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Sr=o()?Object.assign:function(a,s){for(var c,u=n(a),i,l=1;l<arguments.length;l++){c=Object(arguments[l]);for(var d in c)r.call(c,d)&&(u[d]=c[d]);if(e){i=e(c);for(var f=0;f<i.length;f++)t.call(c,i[f])&&(u[i[f]]=c[i[f]])}}return u},Sr}var kr,mt;function Dr(){if(mt)return kr;mt=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return kr=e,kr}var Er,gt;function cn(){return gt||(gt=1,Er=Function.call.bind(Object.prototype.hasOwnProperty)),Er}var wr,bt;function $o(){if(bt)return wr;bt=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var r=Dr(),t={},n=cn();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,u,i){if(process.env.NODE_ENV!=="production"){for(var l in a)if(n(a,l)){var d;try{if(typeof a[l]!="function"){var f=Error((u||"React class")+": "+c+" type `"+l+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[l]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}d=a[l](s,l,u,c,null,r)}catch(y){d=y}if(d&&!(d instanceof Error)&&e((u||"React class")+": type specification of "+c+" `"+l+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof d+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),d instanceof Error&&!(d.message in t)){t[d.message]=!0;var b=i?i():"";e("Failed "+c+" type: "+d.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},wr=o,wr}var Tr,yt;function Ao(){if(yt)return Tr;yt=1;var e=sn(),r=Ro(),t=Dr(),n=cn(),o=$o(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var u="Warning: "+c;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return Tr=function(c,u){var i=typeof Symbol=="function"&&Symbol.iterator,l="@@iterator";function d(g){var x=g&&(i&&g[i]||g[l]);if(typeof x=="function")return x}var f="<<anonymous>>",b={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:Y(),arrayOf:D,element:P(),elementType:m(),instanceOf:Q,node:V(),objectOf:de,oneOf:se,oneOfType:ue,shape:pe,exact:he};function y(g,x){return g===x?g!==0||1/g===1/x:g!==g&&x!==x}function h(g,x){this.message=g,this.data=x&&typeof x=="object"?x:{},this.stack=""}h.prototype=Error.prototype;function p(g){if(process.env.NODE_ENV!=="production")var x={},O=0;function T(I,w,C,B,z,j,re){if(B=B||f,j=j||C,re!==t){if(u){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ie=B+":"+C;!x[ie]&&O<3&&(a("You are manually calling a React.PropTypes validation function for the `"+j+"` prop on `"+B+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),x[ie]=!0,O++)}}return w[C]==null?I?w[C]===null?new h("The "+z+" `"+j+"` is marked as required "+("in `"+B+"`, but its value is `null`.")):new h("The "+z+" `"+j+"` is marked as required in "+("`"+B+"`, but its value is `undefined`.")):null:g(w,C,B,z,j)}var E=T.bind(null,!1);return E.isRequired=T.bind(null,!0),E}function k(g){function x(O,T,E,I,w,C){var B=O[T],z=oe(B);if(z!==g){var j=fe(B);return new h("Invalid "+I+" `"+w+"` of type "+("`"+j+"` supplied to `"+E+"`, expected ")+("`"+g+"`."),{expectedType:g})}return null}return p(x)}function Y(){return p(s)}function D(g){function x(O,T,E,I,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+E+"` has invalid PropType notation inside arrayOf.");var C=O[T];if(!Array.isArray(C)){var B=oe(C);return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+E+"`, expected an array."))}for(var z=0;z<C.length;z++){var j=g(C,z,E,I,w+"["+z+"]",t);if(j instanceof Error)return j}return null}return p(x)}function P(){function g(x,O,T,E,I){var w=x[O];if(!c(w)){var C=oe(w);return new h("Invalid "+E+" `"+I+"` of type "+("`"+C+"` supplied to `"+T+"`, expected a single ReactElement."))}return null}return p(g)}function m(){function g(x,O,T,E,I){var w=x[O];if(!e.isValidElementType(w)){var C=oe(w);return new h("Invalid "+E+" `"+I+"` of type "+("`"+C+"` supplied to `"+T+"`, expected a single ReactElement type."))}return null}return p(g)}function Q(g){function x(O,T,E,I,w){if(!(O[T]instanceof g)){var C=g.name||f,B=Ie(O[T]);return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+E+"`, expected ")+("instance of `"+C+"`."))}return null}return p(x)}function se(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function x(O,T,E,I,w){for(var C=O[T],B=0;B<g.length;B++)if(y(C,g[B]))return null;var z=JSON.stringify(g,function(re,v){var ie=fe(v);return ie==="symbol"?String(v):v});return new h("Invalid "+I+" `"+w+"` of value `"+String(C)+"` "+("supplied to `"+E+"`, expected one of "+z+"."))}return p(x)}function de(g){function x(O,T,E,I,w){if(typeof g!="function")return new h("Property `"+w+"` of component `"+E+"` has invalid PropType notation inside objectOf.");var C=O[T],B=oe(C);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type "+("`"+B+"` supplied to `"+E+"`, expected an object."));for(var z in C)if(n(C,z)){var j=g(C,z,E,I,w+"."+z,t);if(j instanceof Error)return j}return null}return p(x)}function ue(g){if(!Array.isArray(g))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var x=0;x<g.length;x++){var O=g[x];if(typeof O!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Ce(O)+" at index "+x+"."),s}function T(E,I,w,C,B){for(var z=[],j=0;j<g.length;j++){var re=g[j],v=re(E,I,w,C,B,t);if(v==null)return null;v.data&&n(v.data,"expectedType")&&z.push(v.data.expectedType)}var ie=z.length>0?", expected one of type ["+z.join(", ")+"]":"";return new h("Invalid "+C+" `"+B+"` supplied to "+("`"+w+"`"+ie+"."))}return p(T)}function V(){function g(x,O,T,E,I){return ne(x[O])?null:new h("Invalid "+E+" `"+I+"` supplied to "+("`"+T+"`, expected a ReactNode."))}return p(g)}function ee(g,x,O,T,E){return new h((g||"React class")+": "+x+" type `"+O+"."+T+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+E+"`.")}function pe(g){function x(O,T,E,I,w){var C=O[T],B=oe(C);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type `"+B+"` "+("supplied to `"+E+"`, expected `object`."));for(var z in g){var j=g[z];if(typeof j!="function")return ee(E,I,w,z,fe(j));var re=j(C,z,E,I,w+"."+z,t);if(re)return re}return null}return p(x)}function he(g){function x(O,T,E,I,w){var C=O[T],B=oe(C);if(B!=="object")return new h("Invalid "+I+" `"+w+"` of type `"+B+"` "+("supplied to `"+E+"`, expected `object`."));var z=r({},O[T],g);for(var j in z){var re=g[j];if(n(g,j)&&typeof re!="function")return ee(E,I,w,j,fe(re));if(!re)return new h("Invalid "+I+" `"+w+"` key `"+j+"` supplied to `"+E+"`.\nBad object: "+JSON.stringify(O[T],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(g),null,"  "));var v=re(C,j,E,I,w+"."+j,t);if(v)return v}return null}return p(x)}function ne(g){switch(typeof g){case"number":case"string":case"undefined":return!0;case"boolean":return!g;case"object":if(Array.isArray(g))return g.every(ne);if(g===null||c(g))return!0;var x=d(g);if(x){var O=x.call(g),T;if(x!==g.entries){for(;!(T=O.next()).done;)if(!ne(T.value))return!1}else for(;!(T=O.next()).done;){var E=T.value;if(E&&!ne(E[1]))return!1}}else return!1;return!0;default:return!1}}function W(g,x){return g==="symbol"?!0:x?x["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&x instanceof Symbol:!1}function oe(g){var x=typeof g;return Array.isArray(g)?"array":g instanceof RegExp?"object":W(x,g)?"symbol":x}function fe(g){if(typeof g>"u"||g===null)return""+g;var x=oe(g);if(x==="object"){if(g instanceof Date)return"date";if(g instanceof RegExp)return"regexp"}return x}function Ce(g){var x=fe(g);switch(x){case"array":case"object":return"an "+x;case"boolean":case"date":case"regexp":return"a "+x;default:return x}}function Ie(g){return!g.constructor||!g.constructor.name?f:g.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Tr}var Cr,vt;function Po(){if(vt)return Cr;vt=1;var e=Dr();function r(){}function t(){}return t.resetWarningCache=r,Cr=function(){function n(s,c,u,i,l,d){if(d!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:r};return a.PropTypes=a,a},Cr}if(process.env.NODE_ENV!=="production"){var Mo=sn(),Io=!0;Rr.exports=Ao()(Mo.isElement,Io)}else Rr.exports=Po()();var Bo=Rr.exports;const G=Co(Bo);function Je(e){let r="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+r+" for the full message."}var $r={exports:{}},X={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xt;function jo(){if(xt)return X;xt=1;var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),i=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function h(p){if(typeof p=="object"&&p!==null){var k=p.$$typeof;switch(k){case e:switch(p=p.type,p){case t:case o:case n:case i:case l:return p;default:switch(p=p&&p.$$typeof,p){case c:case s:case u:case f:case d:case a:return p;default:return k}}case r:return k}}}return X.ContextConsumer=s,X.ContextProvider=a,X.Element=e,X.ForwardRef=u,X.Fragment=t,X.Lazy=f,X.Memo=d,X.Portal=r,X.Profiler=o,X.StrictMode=n,X.Suspense=i,X.SuspenseList=l,X.isAsyncMode=function(){return!1},X.isConcurrentMode=function(){return!1},X.isContextConsumer=function(p){return h(p)===s},X.isContextProvider=function(p){return h(p)===a},X.isElement=function(p){return typeof p=="object"&&p!==null&&p.$$typeof===e},X.isForwardRef=function(p){return h(p)===u},X.isFragment=function(p){return h(p)===t},X.isLazy=function(p){return h(p)===f},X.isMemo=function(p){return h(p)===d},X.isPortal=function(p){return h(p)===r},X.isProfiler=function(p){return h(p)===o},X.isStrictMode=function(p){return h(p)===n},X.isSuspense=function(p){return h(p)===i},X.isSuspenseList=function(p){return h(p)===l},X.isValidElementType=function(p){return typeof p=="string"||typeof p=="function"||p===t||p===o||p===n||p===i||p===l||p===b||typeof p=="object"&&p!==null&&(p.$$typeof===f||p.$$typeof===d||p.$$typeof===a||p.$$typeof===s||p.$$typeof===u||p.$$typeof===y||p.getModuleId!==void 0)},X.typeOf=h,X}var J={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nt;function Do(){return Nt||(Nt=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),r=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),i=Symbol.for("react.suspense"),l=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y=!1,h=!1,p=!1,k=!1,Y=!1,D;D=Symbol.for("react.module.reference");function P(N){return!!(typeof N=="string"||typeof N=="function"||N===t||N===o||Y||N===n||N===i||N===l||k||N===b||y||h||p||typeof N=="object"&&N!==null&&(N.$$typeof===f||N.$$typeof===d||N.$$typeof===a||N.$$typeof===s||N.$$typeof===u||N.$$typeof===D||N.getModuleId!==void 0))}function m(N){if(typeof N=="object"&&N!==null){var Be=N.$$typeof;switch(Be){case e:var sr=N.type;switch(sr){case t:case o:case n:case i:case l:return sr;default:var Fr=sr&&sr.$$typeof;switch(Fr){case c:case s:case u:case f:case d:case a:return Fr;default:return Be}}case r:return Be}}}var Q=s,se=a,de=e,ue=u,V=t,ee=f,pe=d,he=r,ne=o,W=n,oe=i,fe=l,Ce=!1,Ie=!1;function g(N){return Ce||(Ce=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function x(N){return Ie||(Ie=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function O(N){return m(N)===s}function T(N){return m(N)===a}function E(N){return typeof N=="object"&&N!==null&&N.$$typeof===e}function I(N){return m(N)===u}function w(N){return m(N)===t}function C(N){return m(N)===f}function B(N){return m(N)===d}function z(N){return m(N)===r}function j(N){return m(N)===o}function re(N){return m(N)===n}function v(N){return m(N)===i}function ie(N){return m(N)===l}J.ContextConsumer=Q,J.ContextProvider=se,J.Element=de,J.ForwardRef=ue,J.Fragment=V,J.Lazy=ee,J.Memo=pe,J.Portal=he,J.Profiler=ne,J.StrictMode=W,J.Suspense=oe,J.SuspenseList=fe,J.isAsyncMode=g,J.isConcurrentMode=x,J.isContextConsumer=O,J.isContextProvider=T,J.isElement=E,J.isForwardRef=I,J.isFragment=w,J.isLazy=C,J.isMemo=B,J.isPortal=z,J.isProfiler=j,J.isStrictMode=re,J.isSuspense=v,J.isSuspenseList=ie,J.isValidElementType=P,J.typeOf=m}()),J}process.env.NODE_ENV==="production"?$r.exports=jo():$r.exports=Do();var St=$r.exports;const Vo=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function zo(e){const r=`${e}`.match(Vo);return r&&r[1]||""}function ln(e,r=""){return e.displayName||e.name||zo(e)||r}function kt(e,r,t){const n=ln(r);return e.displayName||(n!==""?`${t}(${n})`:t)}function Lo(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ln(e,"Component");if(typeof e=="object")switch(e.$$typeof){case St.ForwardRef:return kt(e,e.render,"ForwardRef");case St.Memo:return kt(e,e.type,"memo");default:return}}}function ge(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Je(7));return e.charAt(0).toUpperCase()+e.slice(1)}function un(e,r){const t=M({},r);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))t[n]=M({},e[n],t[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=r[n];t[n]={},!a||!Object.keys(a)?t[n]=o:!o||!Object.keys(o)?t[n]=a:(t[n]=M({},a),Object.keys(o).forEach(s=>{t[n][s]=un(o[s],a[s])}))}else t[n]===void 0&&(t[n]=e[n])}),t}function qo(e,r,t=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=r(s);c!==""&&a.push(c),t&&t[s]&&a.push(t[s])}return a},[]).join(" ")}),n}const Et=e=>e,Xo=()=>{let e=Et;return{configure(r){e=r},generate(r){return e(r)},reset(){e=Et}}},Jo=Xo(),Ho=Jo,Go={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Vr(e,r,t="Mui"){const n=Go[r];return n?`${t}-${n}`:`${Ho.generate(e)}-${r}`}function Fo(e,r,t="Mui"){const n={};return r.forEach(o=>{n[o]=Vr(e,o,t)}),n}function Ne(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}function fn(e){var r,t,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=fn(e[r]))&&(n&&(n+=" "),n+=t);else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function Uo(){for(var e,r,t=0,n="";t<arguments.length;)(e=arguments[t++])&&(r=fn(e))&&(n&&(n+=" "),n+=r);return n}const Ko=["values","unit","step"],Wo=e=>{const r=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return r.sort((t,n)=>t.val-n.val),r.reduce((t,n)=>M({},t,{[n.key]:n.val}),{})};function Yo(e){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:n=5}=e,o=Ne(e,Ko),a=Wo(r),s=Object.keys(a);function c(f){return`@media (min-width:${typeof r[f]=="number"?r[f]:f}${t})`}function u(f){return`@media (max-width:${(typeof r[f]=="number"?r[f]:f)-n/100}${t})`}function i(f,b){const y=s.indexOf(b);return`@media (min-width:${typeof r[f]=="number"?r[f]:f}${t}) and (max-width:${(y!==-1&&typeof r[s[y]]=="number"?r[s[y]]:b)-n/100}${t})`}function l(f){return s.indexOf(f)+1<s.length?i(f,s[s.indexOf(f)+1]):c(f)}function d(f){const b=s.indexOf(f);return b===0?c(s[1]):b===s.length-1?u(s[b]):i(f,s[s.indexOf(f)+1]).replace("@media","@media not all and")}return M({keys:s,values:a,up:c,down:u,between:i,only:l,not:d,unit:t},o)}const Zo={borderRadius:4},Qo=Zo,ea=process.env.NODE_ENV!=="production"?G.oneOfType([G.number,G.string,G.object,G.array]):{},Te=ea;function er(e,r){return r?ve(e,r,{clone:!1}):e}const zr={xs:0,sm:600,md:900,lg:1200,xl:1536},wt={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${zr[e]}px)`};function xe(e,r,t){const n=e.theme||{};if(Array.isArray(r)){const a=n.breakpoints||wt;return r.reduce((s,c,u)=>(s[a.up(a.keys[u])]=t(r[u]),s),{})}if(typeof r=="object"){const a=n.breakpoints||wt;return Object.keys(r).reduce((s,c)=>{if(Object.keys(a.values||zr).indexOf(c)!==-1){const u=a.up(c);s[u]=t(r[c],c)}else{const u=c;s[u]=r[u]}return s},{})}return t(r)}function ra(e={}){var r;return((r=e.keys)==null?void 0:r.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function ta(e,r){return e.reduce((t,n)=>{const o=t[n];return(!o||Object.keys(o).length===0)&&delete t[n],t},r)}function dr(e,r,t=!0){if(!r||typeof r!="string")return null;if(e&&e.vars&&t){const n=`vars.${r}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return r.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function fr(e,r,t,n=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||n:o=dr(e,t)||n,r&&(o=r(o,n,e)),o}function H(e){const{prop:r,cssProperty:t=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[r]==null)return null;const c=s[r],u=s.theme,i=dr(u,n)||{};return xe(s,c,d=>{let f=fr(i,o,d);return d===f&&typeof d=="string"&&(f=fr(i,o,`${r}${d==="default"?"":ge(d)}`,d)),t===!1?f:{[t]:f}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[r]:Te}:{},a.filterProps=[r],a}function na(e){const r={};return t=>(r[t]===void 0&&(r[t]=e(t)),r[t])}const oa={m:"margin",p:"padding"},aa={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Tt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},sa=na(e=>{if(e.length>2)if(Tt[e])e=Tt[e];else return[e];const[r,t]=e.split(""),n=oa[r],o=aa[t]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],ia=[...pr,...hr];function or(e,r,t,n){var o;const a=(o=dr(e,r,!1))!=null?o:t;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function dn(e){return or(e,"spacing",8,"spacing")}function ar(e,r){if(typeof r=="string"||r==null)return r;const t=Math.abs(r),n=e(t);return r>=0?n:typeof n=="number"?-n:`-${n}`}function ca(e,r){return t=>e.reduce((n,o)=>(n[o]=ar(r,t),n),{})}function la(e,r,t,n){if(r.indexOf(t)===-1)return null;const o=sa(t),a=ca(o,n),s=e[t];return xe(e,s,a)}function pn(e,r){const t=dn(e.theme);return Object.keys(e).map(n=>la(e,r,n,t)).reduce(er,{})}function U(e){return pn(e,pr)}U.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,r)=>(e[r]=Te,e),{}):{};U.filterProps=pr;function K(e){return pn(e,hr)}K.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,r)=>(e[r]=Te,e),{}):{};K.filterProps=hr;process.env.NODE_ENV!=="production"&&ia.reduce((e,r)=>(e[r]=Te,e),{});function ua(e=8){if(e.mui)return e;const r=dn({spacing:e}),t=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=r(a);return typeof s=="number"?`${s}px`:s}).join(" "));return t.mui=!0,t}function mr(...e){const r=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),t=n=>Object.keys(n).reduce((o,a)=>r[a]?er(o,r[a](n)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},t.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),t}function me(e){return typeof e!="number"?e:`${e}px solid`}const fa=H({prop:"border",themeKey:"borders",transform:me}),da=H({prop:"borderTop",themeKey:"borders",transform:me}),pa=H({prop:"borderRight",themeKey:"borders",transform:me}),ha=H({prop:"borderBottom",themeKey:"borders",transform:me}),ma=H({prop:"borderLeft",themeKey:"borders",transform:me}),ga=H({prop:"borderColor",themeKey:"palette"}),ba=H({prop:"borderTopColor",themeKey:"palette"}),ya=H({prop:"borderRightColor",themeKey:"palette"}),va=H({prop:"borderBottomColor",themeKey:"palette"}),xa=H({prop:"borderLeftColor",themeKey:"palette"}),gr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const r=or(e.theme,"shape.borderRadius",4,"borderRadius"),t=n=>({borderRadius:ar(r,n)});return xe(e,e.borderRadius,t)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Te}:{};gr.filterProps=["borderRadius"];mr(fa,da,pa,ha,ma,ga,ba,ya,va,xa,gr);const br=e=>{if(e.gap!==void 0&&e.gap!==null){const r=or(e.theme,"spacing",8,"gap"),t=n=>({gap:ar(r,n)});return xe(e,e.gap,t)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{gap:Te}:{};br.filterProps=["gap"];const yr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const r=or(e.theme,"spacing",8,"columnGap"),t=n=>({columnGap:ar(r,n)});return xe(e,e.columnGap,t)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Te}:{};yr.filterProps=["columnGap"];const vr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const r=or(e.theme,"spacing",8,"rowGap"),t=n=>({rowGap:ar(r,n)});return xe(e,e.rowGap,t)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Te}:{};vr.filterProps=["rowGap"];const Na=H({prop:"gridColumn"}),Sa=H({prop:"gridRow"}),ka=H({prop:"gridAutoFlow"}),Ea=H({prop:"gridAutoColumns"}),wa=H({prop:"gridAutoRows"}),Ta=H({prop:"gridTemplateColumns"}),Ca=H({prop:"gridTemplateRows"}),Oa=H({prop:"gridTemplateAreas"}),_a=H({prop:"gridArea"});mr(br,yr,vr,Na,Sa,ka,Ea,wa,Ta,Ca,Oa,_a);function Xe(e,r){return r==="grey"?r:e}const Ra=H({prop:"color",themeKey:"palette",transform:Xe}),$a=H({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Xe}),Aa=H({prop:"backgroundColor",themeKey:"palette",transform:Xe});mr(Ra,$a,Aa);function ae(e){return e<=1&&e!==0?`${e*100}%`:e}const Pa=H({prop:"width",transform:ae}),Lr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const r=t=>{var n;return{maxWidth:((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[t])||zr[t]||ae(t)}};return xe(e,e.maxWidth,r)}return null};Lr.filterProps=["maxWidth"];const Ma=H({prop:"minWidth",transform:ae}),Ia=H({prop:"height",transform:ae}),Ba=H({prop:"maxHeight",transform:ae}),ja=H({prop:"minHeight",transform:ae});H({prop:"size",cssProperty:"width",transform:ae});H({prop:"size",cssProperty:"height",transform:ae});const Da=H({prop:"boxSizing"});mr(Pa,Lr,Ma,Ia,Ba,ja,Da);const Va={border:{themeKey:"borders",transform:me},borderTop:{themeKey:"borders",transform:me},borderRight:{themeKey:"borders",transform:me},borderBottom:{themeKey:"borders",transform:me},borderLeft:{themeKey:"borders",transform:me},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:gr},color:{themeKey:"palette",transform:Xe},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Xe},backgroundColor:{themeKey:"palette",transform:Xe},p:{style:K},pt:{style:K},pr:{style:K},pb:{style:K},pl:{style:K},px:{style:K},py:{style:K},padding:{style:K},paddingTop:{style:K},paddingRight:{style:K},paddingBottom:{style:K},paddingLeft:{style:K},paddingX:{style:K},paddingY:{style:K},paddingInline:{style:K},paddingInlineStart:{style:K},paddingInlineEnd:{style:K},paddingBlock:{style:K},paddingBlockStart:{style:K},paddingBlockEnd:{style:K},m:{style:U},mt:{style:U},mr:{style:U},mb:{style:U},ml:{style:U},mx:{style:U},my:{style:U},margin:{style:U},marginTop:{style:U},marginRight:{style:U},marginBottom:{style:U},marginLeft:{style:U},marginX:{style:U},marginY:{style:U},marginInline:{style:U},marginInlineStart:{style:U},marginInlineEnd:{style:U},marginBlock:{style:U},marginBlockStart:{style:U},marginBlockEnd:{style:U},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:br},rowGap:{style:vr},columnGap:{style:yr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ae},maxWidth:{style:Lr},minWidth:{transform:ae},height:{transform:ae},maxHeight:{transform:ae},minHeight:{transform:ae},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},qr=Va;function za(...e){const r=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),t=new Set(r);return e.every(n=>t.size===Object.keys(n).length)}function La(e,r){return typeof e=="function"?e(r):e}function qa(){function e(t,n,o,a){const s={[t]:n,theme:o},c=a[t];if(!c)return{[t]:n};const{cssProperty:u=t,themeKey:i,transform:l,style:d}=c;if(n==null)return null;if(i==="typography"&&n==="inherit")return{[t]:n};const f=dr(o,i)||{};return d?d(s):xe(s,n,y=>{let h=fr(f,l,y);return y===h&&typeof y=="string"&&(h=fr(f,l,`${t}${y==="default"?"":ge(y)}`,y)),u===!1?h:{[u]:h}})}function r(t){var n;const{sx:o,theme:a={}}=t||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:qr;function c(u){let i=u;if(typeof u=="function")i=u(a);else if(typeof u!="object")return u;if(!i)return null;const l=ra(a.breakpoints),d=Object.keys(l);let f=l;return Object.keys(i).forEach(b=>{const y=La(i[b],a);if(y!=null)if(typeof y=="object")if(s[b])f=er(f,e(b,y,a,s));else{const h=xe({theme:a},y,p=>({[b]:p}));za(h,y)?f[b]=r({sx:y,theme:a}):f=er(f,h)}else f=er(f,e(b,y,a,s))}),ta(d,f)}return Array.isArray(o)?o.map(c):c(o)}return r}const hn=qa();hn.filterProps=["sx"];const Xr=hn,Xa=["breakpoints","palette","spacing","shape"];function Jr(e={},...r){const{breakpoints:t={},palette:n={},spacing:o,shape:a={}}=e,s=Ne(e,Xa),c=Yo(t),u=ua(o);let i=ve({breakpoints:c,direction:"ltr",components:{},palette:M({mode:"light"},n),spacing:u,shape:M({},Qo,a)},s);return i=r.reduce((l,d)=>ve(l,d),i),i.unstable_sxConfig=M({},qr,s==null?void 0:s.unstable_sxConfig),i.unstable_sx=function(d){return Xr({sx:d,theme:this})},i}function Ja(e){return Object.keys(e).length===0}function Ha(e=null){const r=rr.useContext(_r.ThemeContext);return!r||Ja(r)?e:r}const Ga=Jr();function Fa(e=Ga){return Ha(e)}const Ua=["variant"];function Ct(e){return e.length===0}function mn(e){const{variant:r}=e,t=Ne(e,Ua);let n=r||"";return Object.keys(t).sort().forEach(o=>{o==="color"?n+=Ct(n)?e[o]:ge(e[o]):n+=`${Ct(n)?o:ge(o)}${ge(e[o].toString())}`}),n}const Ka=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Wa(e){return Object.keys(e).length===0}function Ya(e){return typeof e=="string"&&e.charCodeAt(0)>96}const Za=(e,r)=>r.components&&r.components[e]&&r.components[e].styleOverrides?r.components[e].styleOverrides:null,Qa=(e,r)=>{let t=[];r&&r.components&&r.components[e]&&r.components[e].variants&&(t=r.components[e].variants);const n={};return t.forEach(o=>{const a=mn(o.props);n[a]=o.style}),n},es=(e,r,t,n)=>{var o;const{ownerState:a={}}=e,s=[],c=t==null||(o=t.components)==null||(o=o[n])==null?void 0:o.variants;return c&&c.forEach(u=>{let i=!0;Object.keys(u.props).forEach(l=>{a[l]!==u.props[l]&&e[l]!==u.props[l]&&(i=!1)}),i&&s.push(r[mn(u.props)])}),s};function lr(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const rs=Jr(),Ot=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Ze({defaultTheme:e,theme:r,themeId:t}){return Wa(r)?e:r[t]||r}function ts(e){return e?(r,t)=>t[e]:null}function ns(e={}){const{themeId:r,defaultTheme:t=rs,rootShouldForwardProp:n=lr,slotShouldForwardProp:o=lr}=e,a=s=>Xr(M({},s,{theme:Ze(M({},s,{defaultTheme:t,themeId:r}))}));return a.__mui_systemSx=!0,(s,c={})=>{_r.internal_processStyles(s,P=>P.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:u,slot:i,skipVariantsResolver:l,skipSx:d,overridesResolver:f=ts(Ot(i))}=c,b=Ne(c,Ka),y=l!==void 0?l:i&&i!=="Root"&&i!=="root"||!1,h=d||!1;let p;process.env.NODE_ENV!=="production"&&u&&(p=`${u}-${Ot(i||"Root")}`);let k=lr;i==="Root"||i==="root"?k=n:i?k=o:Ya(s)&&(k=void 0);const Y=_r(s,M({shouldForwardProp:k,label:p},b)),D=(P,...m)=>{const Q=m?m.map(V=>typeof V=="function"&&V.__emotion_real!==V?ee=>V(M({},ee,{theme:Ze(M({},ee,{defaultTheme:t,themeId:r}))})):V):[];let se=P;u&&f&&Q.push(V=>{const ee=Ze(M({},V,{defaultTheme:t,themeId:r})),pe=Za(u,ee);if(pe){const he={};return Object.entries(pe).forEach(([ne,W])=>{he[ne]=typeof W=="function"?W(M({},V,{theme:ee})):W}),f(V,he)}return null}),u&&!y&&Q.push(V=>{const ee=Ze(M({},V,{defaultTheme:t,themeId:r}));return es(V,Qa(u,ee),ee,u)}),h||Q.push(a);const de=Q.length-m.length;if(Array.isArray(P)&&de>0){const V=new Array(de).fill("");se=[...P,...V],se.raw=[...P.raw,...V]}else typeof P=="function"&&P.__emotion_real!==P&&(se=V=>P(M({},V,{theme:Ze(M({},V,{defaultTheme:t,themeId:r}))})));const ue=Y(se,...Q);if(process.env.NODE_ENV!=="production"){let V;u&&(V=`${u}${ge(i||"")}`),V===void 0&&(V=`Styled(${Lo(s)})`),ue.displayName=V}return s.muiName&&(ue.muiName=s.muiName),ue};return Y.withConfig&&(D.withConfig=Y.withConfig),D}}function os(e){const{theme:r,name:t,props:n}=e;return!r||!r.components||!r.components[t]||!r.components[t].defaultProps?n:un(r.components[t].defaultProps,n)}function as({props:e,name:r,defaultTheme:t,themeId:n}){let o=Fa(t);return n&&(o=o[n]||o),os({theme:o,name:r,props:e})}function gn(e,r=0,t=1){return process.env.NODE_ENV!=="production"&&(e<r||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`),Math.min(Math.max(r,e),t)}function ss(e){e=e.slice(1);const r=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(r);return t&&t[0].length===1&&(t=t.map(n=>n+n)),t?`rgb${t.length===4?"a":""}(${t.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function He(e){if(e.type)return e;if(e.charAt(0)==="#")return He(ss(e));const r=e.indexOf("("),t=e.substring(0,r);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Je(9,e));let n=e.substring(r+1,e.length-1),o;if(t==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Je(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:t,values:n,colorSpace:o}}function Hr(e){const{type:r,colorSpace:t}=e;let{values:n}=e;return r.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):r.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),r.indexOf("color")!==-1?n=`${t} ${n.join(" ")}`:n=`${n.join(", ")}`,`${r}(${n})`}function is(e){e=He(e);const{values:r}=e,t=r[0],n=r[1]/100,o=r[2]/100,a=n*Math.min(o,1-o),s=(i,l=(i+t/30)%12)=>o-a*Math.max(Math.min(l-3,9-l,1),-1);let c="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",u.push(r[3])),Hr({type:c,values:u})}function _t(e){e=He(e);let r=e.type==="hsl"||e.type==="hsla"?He(is(e)).values:e.values;return r=r.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*r[0]+.7152*r[1]+.0722*r[2]).toFixed(3))}function Rt(e,r){const t=_t(e),n=_t(r);return(Math.max(t,n)+.05)/(Math.min(t,n)+.05)}function cs(e,r){if(e=He(e),r=gn(r),e.type.indexOf("hsl")!==-1)e.values[2]*=1-r;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-r;return Hr(e)}function ls(e,r){if(e=He(e),r=gn(r),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*r;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*r;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*r;return Hr(e)}function us(e,r){return M({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},r)}const fs={black:"#000",white:"#fff"},nr=fs,ds={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ps=ds,hs={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},je=hs,ms={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},De=ms,gs={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Qe=gs,bs={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ve=bs,ys={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},ze=ys,vs={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Le=vs,xs=["mode","contrastThreshold","tonalOffset"],$t={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:nr.white,default:nr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Or={text:{primary:nr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:nr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function At(e,r,t,n){const o=n.light||n,a=n.dark||n*1.5;e[r]||(e.hasOwnProperty(t)?e[r]=e[t]:r==="light"?e.light=ls(e.main,o):r==="dark"&&(e.dark=cs(e.main,a)))}function Ns(e="light"){return e==="dark"?{main:Ve[200],light:Ve[50],dark:Ve[400]}:{main:Ve[700],light:Ve[400],dark:Ve[800]}}function Ss(e="light"){return e==="dark"?{main:je[200],light:je[50],dark:je[400]}:{main:je[500],light:je[300],dark:je[700]}}function ks(e="light"){return e==="dark"?{main:De[500],light:De[300],dark:De[700]}:{main:De[700],light:De[400],dark:De[800]}}function Es(e="light"){return e==="dark"?{main:ze[400],light:ze[300],dark:ze[700]}:{main:ze[700],light:ze[500],dark:ze[900]}}function ws(e="light"){return e==="dark"?{main:Le[400],light:Le[300],dark:Le[700]}:{main:Le[800],light:Le[500],dark:Le[900]}}function Ts(e="light"){return e==="dark"?{main:Qe[400],light:Qe[300],dark:Qe[700]}:{main:"#ed6c02",light:Qe[500],dark:Qe[900]}}function Cs(e){const{mode:r="light",contrastThreshold:t=3,tonalOffset:n=.2}=e,o=Ne(e,xs),a=e.primary||Ns(r),s=e.secondary||Ss(r),c=e.error||ks(r),u=e.info||Es(r),i=e.success||ws(r),l=e.warning||Ts(r);function d(h){const p=Rt(h,Or.text.primary)>=t?Or.text.primary:$t.text.primary;if(process.env.NODE_ENV!=="production"){const k=Rt(h,p);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${p} on ${h}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return p}const f=({color:h,name:p,mainShade:k=500,lightShade:Y=300,darkShade:D=700})=>{if(h=M({},h),!h.main&&h[k]&&(h.main=h[k]),!h.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${p?` (${p})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:Je(11,p?` (${p})`:"",k));if(typeof h.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${p?` (${p})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Je(12,p?` (${p})`:"",JSON.stringify(h.main)));return At(h,"light",Y,n),At(h,"dark",D,n),h.contrastText||(h.contrastText=d(h.main)),h},b={dark:Or,light:$t};return process.env.NODE_ENV!=="production"&&(b[r]||console.error(`MUI: The palette mode \`${r}\` is not supported.`)),ve(M({common:M({},nr),mode:r,primary:f({color:a,name:"primary"}),secondary:f({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:c,name:"error"}),warning:f({color:l,name:"warning"}),info:f({color:u,name:"info"}),success:f({color:i,name:"success"}),grey:ps,contrastThreshold:t,getContrastText:d,augmentColor:f,tonalOffset:n},b[r]),o)}const Os=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function _s(e){return Math.round(e*1e5)/1e5}const Pt={textTransform:"uppercase"},Mt='"Roboto", "Helvetica", "Arial", sans-serif';function Rs(e,r){const t=typeof r=="function"?r(e):r,{fontFamily:n=Mt,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:u=700,htmlFontSize:i=16,allVariants:l,pxToRem:d}=t,f=Ne(t,Os);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof i!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,y=d||(k=>`${k/i*b}rem`),h=(k,Y,D,P,m)=>M({fontFamily:n,fontWeight:k,fontSize:y(Y),lineHeight:D},n===Mt?{letterSpacing:`${_s(P/Y)}em`}:{},m,l),p={h1:h(a,96,1.167,-1.5),h2:h(a,60,1.2,-.5),h3:h(s,48,1.167,0),h4:h(s,34,1.235,.25),h5:h(s,24,1.334,0),h6:h(c,20,1.6,.15),subtitle1:h(s,16,1.75,.15),subtitle2:h(c,14,1.57,.1),body1:h(s,16,1.5,.15),body2:h(s,14,1.43,.15),button:h(c,14,1.75,.4,Pt),caption:h(s,12,1.66,.4),overline:h(s,12,2.66,1,Pt),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return ve(M({htmlFontSize:i,pxToRem:y,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:u},p),f,{clone:!1})}const $s=.2,As=.14,Ps=.12;function F(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${$s})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${As})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ps})`].join(",")}const Ms=["none",F(0,2,1,-1,0,1,1,0,0,1,3,0),F(0,3,1,-2,0,2,2,0,0,1,5,0),F(0,3,3,-2,0,3,4,0,0,1,8,0),F(0,2,4,-1,0,4,5,0,0,1,10,0),F(0,3,5,-1,0,5,8,0,0,1,14,0),F(0,3,5,-1,0,6,10,0,0,1,18,0),F(0,4,5,-2,0,7,10,1,0,2,16,1),F(0,5,5,-3,0,8,10,1,0,3,14,2),F(0,5,6,-3,0,9,12,1,0,3,16,2),F(0,6,6,-3,0,10,14,1,0,4,18,3),F(0,6,7,-4,0,11,15,1,0,4,20,3),F(0,7,8,-4,0,12,17,2,0,5,22,4),F(0,7,8,-4,0,13,19,2,0,5,24,4),F(0,7,9,-4,0,14,21,2,0,5,26,4),F(0,8,9,-5,0,15,22,2,0,6,28,5),F(0,8,10,-5,0,16,24,2,0,6,30,5),F(0,8,11,-5,0,17,26,2,0,6,32,5),F(0,9,11,-5,0,18,28,2,0,7,34,6),F(0,9,12,-6,0,19,29,2,0,7,36,6),F(0,10,13,-6,0,20,31,3,0,8,38,7),F(0,10,13,-6,0,21,33,3,0,8,40,7),F(0,10,14,-6,0,22,35,3,0,8,42,7),F(0,11,14,-7,0,23,36,3,0,9,44,8),F(0,11,15,-7,0,24,38,3,0,9,46,8)],Is=Ms,Bs=["duration","easing","delay"],js={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ds={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function It(e){return`${Math.round(e)}ms`}function Vs(e){if(!e)return 0;const r=e/36;return Math.round((4+15*r**.25+r/5)*10)}function zs(e){const r=M({},js,e.easing),t=M({},Ds,e.duration);return M({getAutoHeightDuration:Vs,create:(o=["all"],a={})=>{const{duration:s=t.standard,easing:c=r.easeInOut,delay:u=0}=a,i=Ne(a,Bs);if(process.env.NODE_ENV!=="production"){const l=f=>typeof f=="string",d=f=>!isNaN(parseFloat(f));!l(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!d(s)&&!l(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),l(c)||console.error('MUI: Argument "easing" must be a string.'),!d(u)&&!l(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(i).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(i).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(l=>`${l} ${typeof s=="string"?s:It(s)} ${c} ${typeof u=="string"?u:It(u)}`).join(",")}},e,{easing:r,duration:t})}const Ls={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},qs=Ls,Xs=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Js(e={},...r){const{mixins:t={},palette:n={},transitions:o={},typography:a={}}=e,s=Ne(e,Xs);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Je(18));const c=Cs(n),u=Jr(e);let i=ve(u,{mixins:us(u.breakpoints,t),palette:c,shadows:Is.slice(),typography:Rs(c,a),transitions:zs(o),zIndex:M({},qs)});if(i=ve(i,s),i=r.reduce((l,d)=>ve(l,d),i),process.env.NODE_ENV!=="production"){const l=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],d=(f,b)=>{let y;for(y in f){const h=f[y];if(l.indexOf(y)!==-1&&Object.keys(h).length>0){if(process.env.NODE_ENV!=="production"){const p=Vr("",y);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${p}' syntax:`,JSON.stringify({root:{[`&.${p}`]:h}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[y]={}}}};Object.keys(i.components).forEach(f=>{const b=i.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&d(b,f)})}return i.unstable_sxConfig=M({},qr,s==null?void 0:s.unstable_sxConfig),i.unstable_sx=function(d){return Xr({sx:d,theme:this})},i}const Hs=Js(),bn=Hs,yn="$$material";function Gs({props:e,name:r}){return as({props:e,name:r,defaultTheme:bn,themeId:yn})}const Fs=e=>lr(e)&&e!=="classes",Us=ns({themeId:yn,defaultTheme:bn,rootShouldForwardProp:Fs}),Ks=Us;function Ws(e){return Vr("MuiSvgIcon",e)}Fo("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ys=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Zs=e=>{const{color:r,fontSize:t,classes:n}=e,o={root:["root",r!=="inherit"&&`color${ge(r)}`,`fontSize${ge(t)}`]};return qo(o,Ws,n)},Qs=Ks("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,t.color!=="inherit"&&r[`color${ge(t.color)}`],r[`fontSize${ge(t.fontSize)}`]]}})(({theme:e,ownerState:r})=>{var t,n,o,a,s,c,u,i,l,d,f,b,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:r.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(u=c.pxToRem)==null?void 0:u.call(c,24))||"1.5rem",large:((i=e.typography)==null||(l=i.pxToRem)==null?void 0:l.call(i,35))||"2.1875rem"}[r.fontSize],color:(d=(f=(e.vars||e).palette)==null||(f=f[r.color])==null?void 0:f.main)!=null?d:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[r.color]}}),Gr=rr.forwardRef(function(r,t){const n=Gs({props:r,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:u="medium",htmlColor:i,inheritViewBox:l=!1,titleAccess:d,viewBox:f="0 0 24 24"}=n,b=Ne(n,Ys),y=rr.isValidElement(o)&&o.type==="svg",h=M({},n,{color:s,component:c,fontSize:u,instanceFontSize:r.fontSize,inheritViewBox:l,viewBox:f,hasSvgAsChild:y}),p={};l||(p.viewBox=f);const k=Zs(h);return S.jsxs(Qs,M({as:c,className:Uo(k.root,a),focusable:"false",color:i,"aria-hidden":d?void 0:!0,role:d?"img":void 0,ref:t},p,b,y&&o.props,{ownerState:h,children:[y?o.props.children:o,d?S.jsx("title",{children:d}):null]}))});process.env.NODE_ENV!=="production"&&(Gr.propTypes={children:G.node,classes:G.object,className:G.string,color:G.oneOfType([G.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),G.string]),component:G.elementType,fontSize:G.oneOfType([G.oneOf(["inherit","large","medium","small"]),G.string]),htmlColor:G.string,inheritViewBox:G.bool,shapeRendering:G.string,sx:G.oneOfType([G.arrayOf(G.oneOfType([G.func,G.object,G.bool])),G.func,G.object]),titleAccess:G.string,viewBox:G.string});Gr.muiName="SvgIcon";const Bt=Gr;function ei(e,r){function t(n,o){return S.jsx(Bt,M({"data-testid":`${r}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${r}Icon`),t.muiName=Bt.muiName,rr.memo(rr.forwardRef(t))}const ri=ei(S.jsx("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");function ti({menu:e,dataHandler:r,commandHandler:t,className:n,id:o,children:a}){const[s,c]=te.useState(!1),[u,i]=te.useState(!1),l=te.useCallback(()=>{s&&c(!1),i(!1)},[s]),d=te.useCallback(k=>{k.stopPropagation(),c(Y=>{const D=!Y;return D&&k.shiftKey?i(!0):D||i(!1),D})},[]),f=te.useRef(null),[b,y]=te.useState(0);te.useEffect(()=>{s&&f.current&&y(f.current.clientHeight)},[s]);const h=te.useCallback(k=>(l(),t(k)),[t,l]);let p=e;return!p&&r&&(p=r(u)),S.jsx("div",{ref:f,style:{position:"relative"},children:S.jsx(Z.AppBar,{position:"static",id:o,children:S.jsxs(Z.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[p?S.jsx(Z.IconButton,{edge:"start",className:`papi-menuButton ${n??""}`,color:"inherit","aria-label":"open drawer",onClick:d,children:S.jsx(ri,{})}):void 0,a?S.jsx("div",{className:"papi-menu-children",children:a}):void 0,p?S.jsx(Z.Drawer,{className:`papi-menu-drawer ${n??""}`,anchor:"left",variant:"persistent",open:s,onClose:l,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b}},children:S.jsx(Vt,{commandHandler:h,columns:p.columns})}):void 0]})})})}const ni=(e,r,t=!0)=>{const[n,o]=te.useState(()=>r),[a,s]=te.useState(!0);return te.useEffect(()=>{let c=!0;return s(!!e),(async()=>{if(e){const u=await e();c&&(o(()=>u),s(!1))}})(),()=>{c=!1,t||o(()=>r)}},[e,r,t]),[n,a]};exports.Button=Oe;exports.ChapterRangeSelector=xn;exports.Checkbox=jt;exports.ComboBox=ur;exports.GridMenu=Vt;exports.IconButton=Sn;exports.LabelPosition=Ae;exports.MenuItem=Dt;exports.RefSelector=xo;exports.SearchBar=No;exports.Slider=So;exports.Snackbar=ko;exports.Switch=Eo;exports.Table=To;exports.TextField=tr;exports.Toolbar=ti;exports.usePromise=ni;function oi(e,r="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),n=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),r==="top"&&n?t.insertBefore(o,n):t.appendChild(o)}oi(`.papi-button {
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
