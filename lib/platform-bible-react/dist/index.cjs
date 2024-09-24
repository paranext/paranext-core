"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("react/jsx-runtime"),E=require("react"),oe=require("lucide-react"),Ce=require("clsx"),wc=require("tailwind-merge"),Ms=require("@radix-ui/react-dropdown-menu"),re=require("platform-bible-utils"),xc=require("@radix-ui/react-slot"),Tn=require("class-variance-authority"),kc=require("@radix-ui/react-popover"),Ae=require("cmdk"),Ec=require("@radix-ui/react-dialog"),Nc=require("@radix-ui/react-label"),Tc=require("@radix-ui/react-radio-group"),je=require("@tanstack/react-table"),Sc=require("@radix-ui/react-select"),Cc=require("@radix-ui/react-toggle-group"),jc=require("@radix-ui/react-toggle"),Oc=require("@radix-ui/react-tabs"),Rc=require("@radix-ui/react-separator"),Se=require("@mui/material"),Pc=require("@radix-ui/react-checkbox"),fo=require("@mui/styled-engine"),Tr=require("react-dom"),Ds=require("sonner"),_c=require("@radix-ui/react-slider"),Ic=require("@radix-ui/react-switch");function Re(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const N=Re(E),ge=Re(Ms),Dr=Re(kc),tt=Re(Ec),As=Re(Nc),Ar=Re(Tc),we=Re(Sc),Sn=Re(Cc),Bs=Re(jc),Be=Re(Oc),Ls=Re(Rc),mo=Re(Pc),$c=Re(Tr),Sr=Re(_c),ho=Re(Ic);const Mc=wc.extendTailwindMerge({prefix:"pr-"});function $(...e){return Mc(Ce.clsx(e))}const lr=E.forwardRef(({className:e,type:t,...r},n)=>i.jsx("input",{type:t,className:$("pr-twp pr-flex pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-font-sans pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));lr.displayName="Input";const Dc=E.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>i.jsxs("div",{className:"pr-relative",children:[i.jsx(lr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),i.jsx(oe.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var Ac=Object.defineProperty,Bc=(e,t,r)=>t in e?Ac(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ae=(e,t,r)=>Bc(e,typeof t!="symbol"?t+"":t,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ro=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Fs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ja=Xc();function cr(e,t=!0){return t&&(e=e.toUpperCase()),e in ja?ja[e]:0}function Po(e){return cr(e)>0}function Lc(e){const t=typeof e=="string"?cr(e):e;return t>=40&&t<=66}function Fc(e){return(typeof e=="string"?cr(e):e)<=39}function Vs(e){return e<=66}function Vc(e){const t=typeof e=="string"?cr(e):e;return Us(t)&&!Vs(t)}function*zc(){for(let e=1;e<=Mt.length;e++)yield e}const Gc=1,zs=Mt.length;function Uc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function _o(e,t="***"){const r=e-1;return r<0||r>=Mt.length?t:Mt[r]}function Gs(e){return e<=0||e>zs?"******":Fs[e-1]}function Hc(e){return Gs(cr(e))}function Us(e){const t=typeof e=="number"?_o(e):e;return Po(t)&&!Ro.includes(t)}function qc(e){const t=typeof e=="number"?_o(e):e;return Po(t)&&Ro.includes(t)}function Wc(e){return Fs[e-1].includes("*obsolete*")}function Xc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const me={allBookIds:Mt,nonCanonicalIds:Ro,bookIdToNumber:cr,isBookIdValid:Po,isBookNT:Lc,isBookOT:Fc,isBookOTNT:Vs,isBookDC:Vc,allBookNumbers:zc,firstBook:Gc,lastBook:zs,extraBooks:Uc,bookNumberToId:_o,bookNumberToEnglishName:Gs,bookIdToEnglishName:Hc,isCanonical:Us,isExtraMaterial:qc,isObsolete:Wc};var Ze=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ze||{});const Ve=class{constructor(t){if(ae(this,"name"),ae(this,"fullPath"),ae(this,"isPresent"),ae(this,"hasVerseSegments"),ae(this,"isCustomized"),ae(this,"baseVersification"),ae(this,"scriptureBooks"),ae(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ze[t]):(this._type=t,this.name=Ze[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ae(Ve,"Original",new Ve(Ze.Original)),ae(Ve,"Septuagint",new Ve(Ze.Septuagint)),ae(Ve,"Vulgate",new Ve(Ze.Vulgate)),ae(Ve,"English",new Ve(Ze.English)),ae(Ve,"RussianProtestant",new Ve(Ze.RussianProtestant)),ae(Ve,"RussianOrthodox",new Ve(Ze.RussianOrthodox));let Ct=Ve;function Oa(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var Hs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Hs||{});const $e=class ce{constructor(t,r,n,o){if(ae(this,"firstChapter"),ae(this,"lastChapter"),ae(this,"lastVerse"),ae(this,"hasSegmentsDefined"),ae(this,"text"),ae(this,"BBBCCCVVVS"),ae(this,"longHashCode"),ae(this,"versification"),ae(this,"rtlMark","‏"),ae(this,"_bookNum",0),ae(this,"_chapterNum",0),ae(this,"_verseNum",0),ae(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof Ct?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof Ct?r:void 0;this.setEmpty(a),this._verseNum=t%ce.chapterDigitShifter,this._chapterNum=Math.floor(t%ce.bookDigitShifter/ce.chapterDigitShifter),this._bookNum=Math.floor(t/ce.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof ce){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Ct?t:ce.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??ce.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new ce(t),{success:!0,verseRef:r}}catch(n){if(n instanceof vr)return r=new ce,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%ce.bcvMaxValue*ce.bookDigitShifter+(r>=0?r%ce.bcvMaxValue*ce.chapterDigitShifter:0)+(n>=0?n%ce.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new Ct(s)),r?new ce(r,n.toString(),c,p):new ce}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>ce.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ce.verseRangeSeparator)||this._verse.includes(ce.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=ce.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ce.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new vr("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ct(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ce.verseRangeSeparators,ce.verseSequenceIndicators)}get BBBCCC(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Ct(Ze[s])}catch{throw new vr("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new vr("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||me.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!ce.isVerseParseable(n[1]))throw new vr("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ce(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof ce?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=ce.verseRangeSeparators,n=ce.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Oa(this._verse,n);for(const s of a.map(c=>Oa(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const u=this.clone();if(u.verse=s[1],!t)for(let m=p+1;m<u.verseNum;m++){const v=new ce(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(u)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=ce.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=me.bookIdToNumber(t),this.chapter=r,this.verse=n}};ae($e,"defaultVersification",Ct.English),ae($e,"verseRangeSeparator","-"),ae($e,"verseSequenceIndicator",","),ae($e,"verseRangeSeparators",[$e.verseRangeSeparator]),ae($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),ae($e,"chapterDigitShifter",1e3),ae($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),ae($e,"bcvMaxValue",$e.chapterDigitShifter-1),ae($e,"ValidStatusType",Hs);let vr=class extends Error{};const Cn=ge.Root,Io=ge.Trigger,qs=ge.Group,Kc=ge.Portal,Yc=ge.Sub,Jc=ge.RadioGroup,Ws=E.forwardRef(({className:e,inset:t,children:r,...n},o)=>i.jsxs(ge.SubTrigger,{ref:o,className:$("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,i.jsx(oe.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ws.displayName=ge.SubTrigger.displayName;const Xs=E.forwardRef(({className:e,...t},r)=>i.jsx(ge.SubContent,{ref:r,className:$("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Xs.displayName=ge.SubContent.displayName;const Gr=E.forwardRef(({className:e,sideOffset:t=4,...r},n)=>i.jsx(ge.Portal,{children:i.jsx(ge.Content,{ref:n,sideOffset:t,className:$("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Gr.displayName=ge.Content.displayName;const $o=E.forwardRef(({className:e,inset:t,...r},n)=>i.jsx(ge.Item,{ref:n,className:$("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));$o.displayName=ge.Item.displayName;const jn=E.forwardRef(({className:e,children:t,checked:r,...n},o)=>i.jsxs(ge.CheckboxItem,{ref:o,className:$("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(ge.ItemIndicator,{children:i.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));jn.displayName=ge.CheckboxItem.displayName;const Mo=E.forwardRef(({className:e,children:t,...r},n)=>i.jsxs(ge.RadioItem,{ref:n,className:$("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(ge.ItemIndicator,{children:i.jsx(oe.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Mo.displayName=ge.RadioItem.displayName;const pr=E.forwardRef(({className:e,inset:t,...r},n)=>i.jsx(ge.Label,{ref:n,className:$("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));pr.displayName=ge.Label.displayName;const Ur=E.forwardRef(({className:e,...t},r)=>i.jsx(ge.Separator,{ref:r,className:$("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ur.displayName=ge.Separator.displayName;function Ks({className:e,...t}){return i.jsx("span",{className:$("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Ks.displayName="DropdownMenuShortcut";const Zc=E.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>i.jsxs($o,{ref:c,textValue:e,className:$("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[i.jsx("span",{className:$("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),r&&i.jsx("div",{children:s})]},e));function Qc({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=E.useCallback(c=>{o(c)},[o]);return i.jsx("div",{className:$("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>i.jsx("div",{className:$("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function ep({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return i.jsxs(pr,{className:"pr-flex pr-justify-between",children:[i.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),i.jsxs("div",{className:"pr-flex pr-items-center",children:[i.jsx(oe.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),i.jsx(oe.Clock,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),i.jsx(oe.Bookmark,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const Rr=me.allBookIds,tp={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ra=["OT","NT","DC"],rp=32+32+32,np=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],op=e=>({OT:Rr.filter(r=>me.isBookOT(r)),NT:Rr.filter(r=>me.isBookNT(r)),DC:Rr.filter(r=>me.isBookDC(r))})[e],yr=e=>re.getChaptersForBook(me.bookIdToNumber(e));function ap(){return Rr.map(t=>me.bookIdToEnglishName(t))}function sp(e){return ap().includes(e)}function ip(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(sp(t))return Rr.find(n=>me.bookIdToEnglishName(n)===t)}function lp({scrRef:e,handleSubmit:t}){const[r,n]=E.useState(""),[o,a]=E.useState(me.bookNumberToId(e.bookNum)),[s,c]=E.useState(e.chapterNum??0),[p,u]=E.useState(me.bookNumberToId(e.bookNum)),[m,v]=E.useState(!1),[b,d]=E.useState(m),h=E.useRef(void 0),f=E.useRef(void 0),g=E.useRef(void 0),w=E.useCallback(T=>op(T).filter(M=>{const A=me.bookIdToEnglishName(M).toLowerCase(),z=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return A.includes(z)||M.toLowerCase().includes(z)}),[r]),O=T=>{n(T)},x=E.useRef(!1),k=E.useCallback(T=>{if(x.current){x.current=!1;return}v(T)},[]),y=E.useCallback((T,M,A,z)=>{if(c(me.bookNumberToId(e.bookNum)!==T?1:e.chapterNum),M||yr(T)===-1){t({bookNum:me.bookIdToNumber(T),chapterNum:A||1,verseNum:z||1}),v(!1),n("");return}a(o!==T?T:""),v(!M)},[t,e.bookNum,e.chapterNum,o]),S=T=>{T<=0||T>yr(o)||y(o,!0,T)},C=E.useCallback(()=>{np.forEach(T=>{const M=r.match(T);if(M){const[A,z=void 0,U=void 0]=M.slice(1),B=ip(A);(me.isBookIdValid(A)||B)&&y(B??A,!0,z?parseInt(z,10):1,U?parseInt(U,10):1)}})},[y,r]),I=E.useCallback(T=>{m?(T.key==="ArrowDown"||T.key==="ArrowUp")&&(typeof g<"u"&&g.current!==null?g.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),T.preventDefault()):v(!0)},[m]),R=T=>{const{key:M}=T;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:M})),h.current.focus())},_=T=>{const{key:M}=T;if(p===o){if(M==="Enter"){T.preventDefault(),y(o,!0,s);return}let A=0;if(M==="ArrowRight")if(s<yr(p))A=1;else{T.preventDefault();return}else if(M==="ArrowLeft")if(s>1)A=-1;else{T.preventDefault();return}else M==="ArrowDown"?A=6:M==="ArrowUp"&&(A=-6);s+A<=0||s+A>yr(p)?c(0):A!==0&&(c(s+A),T.preventDefault())}};return E.useEffect(()=>{o===p?o===me.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),E.useLayoutEffect(()=>{d(m)},[m]),E.useLayoutEffect(()=>{const T=setTimeout(()=>{if(b&&f.current&&g.current){const A=g.current.offsetTop-rp;f.current.scrollTo({top:A,behavior:"instant"})}},10);return()=>{clearTimeout(T)}},[b]),i.jsx("div",{className:"pr-twp pr-flex",children:i.jsxs(Cn,{modal:!1,open:m,onOpenChange:k,children:[i.jsx(Io,{asChild:!0,children:i.jsx(Dc,{ref:h,value:r,handleSearch:O,handleKeyDown:I,handleOnClick:()=>{a(me.bookNumberToId(e.bookNum)),u(me.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:C,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),i.jsxs(Gr,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:R,align:"start",ref:f,children:[i.jsx(ep,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),Ra.map((T,M)=>w(T).length>0&&i.jsxs("div",{children:[i.jsx(pr,{className:"pr-font-semibold pr-text-foreground/80",children:tp[T]}),w(T).map(A=>i.jsx("div",{children:i.jsx(Zc,{bookId:A,handleSelectBook:()=>y(A,!1),isSelected:o===A,handleHighlightBook:()=>u(A),handleKeyDown:_,bookType:T,ref:z=>{o===A&&(g.current=z)},children:i.jsx(Qc,{handleSelectChapter:S,endChapter:yr(A),activeChapter:e.bookNum===me.bookIdToNumber(A)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{c(z)}})})},A)),Ra.length-1!==M?i.jsx(Ur,{}):void 0]},T))]})]})})}const Ys=Tn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ke=E.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?xc.Slot:"button";return i.jsx(s,{className:$(Ys({variant:t,size:r,className:e})),ref:a,...o})});ke.displayName="Button";const cp=Dr.Root,pp=Dr.Trigger,Js=E.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>i.jsx(Dr.Portal,{children:i.jsx(Dr.Content,{ref:o,align:t,sideOffset:r,className:$("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Js.displayName=Dr.Content.displayName;const dp=tt.Portal,Zs=E.forwardRef(({className:e,...t},r)=>i.jsx(tt.Overlay,{ref:r,className:$("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Zs.displayName=tt.Overlay.displayName;const up=E.forwardRef(({className:e,children:t,...r},n)=>i.jsxs(dp,{children:[i.jsx(Zs,{}),i.jsxs(tt.Content,{ref:n,className:$("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,i.jsxs(tt.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[i.jsx(oe.X,{className:"pr-h-4 pr-w-4"}),i.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));up.displayName=tt.Content.displayName;const fp=E.forwardRef(({className:e,...t},r)=>i.jsx(tt.Title,{ref:r,className:$("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));fp.displayName=tt.Title.displayName;const mp=E.forwardRef(({className:e,...t},r)=>i.jsx(tt.Description,{ref:r,className:$("pr-text-sm pr-text-muted-foreground",e),...t}));mp.displayName=tt.Description.displayName;const Qs=E.forwardRef(({className:e,...t},r)=>i.jsx(Ae.Command,{ref:r,className:$("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Qs.displayName=Ae.Command.displayName;const ei=E.forwardRef(({className:e,...t},r)=>i.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[i.jsx(oe.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),i.jsx(Ae.Command.Input,{ref:r,className:$("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));ei.displayName=Ae.Command.Input.displayName;const ti=E.forwardRef(({className:e,...t},r)=>i.jsx(Ae.Command.List,{ref:r,className:$("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));ti.displayName=Ae.Command.List.displayName;const ri=E.forwardRef((e,t)=>i.jsx(Ae.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));ri.displayName=Ae.Command.Empty.displayName;const hp=E.forwardRef(({className:e,...t},r)=>i.jsx(Ae.Command.Group,{ref:r,className:$("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));hp.displayName=Ae.Command.Group.displayName;const gp=E.forwardRef(({className:e,...t},r)=>i.jsx(Ae.Command.Separator,{ref:r,className:$("pr--mx-1 pr-h-px pr-bg-border",e),...t}));gp.displayName=Ae.Command.Separator.displayName;const ni=E.forwardRef(({className:e,...t},r)=>i.jsx(Ae.Command.Item,{ref:r,className:$("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));ni.displayName=Ae.Command.Item.displayName;function bp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function go({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=bp,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:u="outline",dir:m="ltr",isDisabled:v=!1,...b}){const[d,h]=E.useState(!1);return i.jsxs(cp,{open:d,onOpenChange:h,...b,children:[i.jsx(pp,{asChild:!0,children:i.jsxs(ke,{variant:u,role:"combobox","aria-expanded":d,id:e,className:$("pr-w-[200px] pr-justify-between",r),disabled:v,children:[n?a(n):s,i.jsx(oe.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),i.jsx(Js,{className:"pr-w-[200px] pr-p-0",dir:m,children:i.jsxs(Qs,{children:[i.jsx(ei,{dir:m,placeholder:c,className:"pr-text-inherit"}),i.jsx(ri,{children:p}),i.jsx(ti,{children:t.map(f=>i.jsxs(ni,{value:a(f),onSelect:()=>{o(f),h(!1)},children:[i.jsx(oe.Check,{className:$("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(f)})}),a(f)]},a(f)))})]})})]})}const vp=Tn.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Qe=E.forwardRef(({className:e,...t},r)=>i.jsx(As.Root,{ref:r,className:$("pr-twp pr-font-sans",vp(),e),...t}));Qe.displayName=As.Root.displayName;function oi({startChapter:e,endChapter:t,handleSelectStartChapter:r,handleSelectEndChapter:n,isDisabled:o=!1,chapterCount:a}){const s=E.useMemo(()=>Array.from({length:a},(u,m)=>m+1),[a]),c=u=>{r(u),u>t&&n(u)},p=u=>{n(u),u<e&&r(u)};return i.jsxs(i.Fragment,{children:[i.jsx(Qe,{htmlFor:"start-chapters-combobox",children:"Chapters"}),i.jsx(go,{isDisabled:o,onChange:c,className:"pr-ml-2 pr-mr-2 pr-w-20",options:s,getOptionLabel:u=>u.toString(),value:e},"start chapter"),i.jsx(Qe,{htmlFor:"end-chapters-combobox",children:"to"}),i.jsx(go,{isDisabled:o,onChange:p,className:"pr-ml-2 pr-w-20",options:s,getOptionLabel:u=>u.toString(),value:t},"end chapter")]})}const Do=E.forwardRef(({className:e,...t},r)=>i.jsx(Ar.Root,{className:$("pr-twp pr-grid pr-gap-2",e),...t,ref:r}));Do.displayName=Ar.Root.displayName;const hn=E.forwardRef(({className:e,...t},r)=>i.jsx(Ar.Item,{ref:r,className:$("pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t,children:i.jsx(Ar.Indicator,{className:"pr-flex pr-items-center pr-justify-center",children:i.jsx(oe.Circle,{className:"pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current"})})}));hn.displayName=Ar.Item.displayName;var ai=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(ai||{});const yp=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Wn=(e,t)=>e[t]??t;function wp({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:r,selectedBookIds:n,chapterCount:o,endChapter:a,handleSelectEndChapter:s,startChapter:c,handleSelectStartChapter:p,localizedStrings:u}){const m=Wn(u,"%webView_bookSelector_currentBook%"),v=Wn(u,"%webView_bookSelector_choose%"),b=Wn(u,"%webView_bookSelector_chooseBooks%"),[d,h]=E.useState("current book"),f=g=>{h(g),e(g)};return i.jsx(Do,{className:"pr-twp pr-flex",value:d,onValueChange:g=>f(g),children:i.jsxs("div",{className:"pr-grid pr-grid-cols-3 pr-gap-4",children:[i.jsxs("div",{className:"pr-flex pr-items-center",children:[i.jsx(hn,{value:"current book"}),i.jsx(Qe,{className:"pr-ml-1",children:`${m}:`})]}),i.jsx(Qe,{className:"pr-flex pr-items-center",children:t}),i.jsx("div",{className:"pr-flex pr-items-center",children:i.jsx(oi,{isDisabled:d==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:s,chapterCount:o,startChapter:c,endChapter:a})}),i.jsxs("div",{className:"pr-flex pr-items-center",children:[i.jsx(hn,{value:"choose books"}),i.jsx(Qe,{className:"pr-ml-1",children:`${b}:`})]}),i.jsx(Qe,{className:"pr-flex pr-items-center",children:n.map(g=>me.bookIdToEnglishName(g)).join(", ")}),i.jsx(ke,{className:"pr-flex pr-items-center",disabled:d==="current book",onClick:()=>r(),children:v})]})})}function xp({table:e}){return i.jsxs(Cn,{children:[i.jsx(Ms.DropdownMenuTrigger,{asChild:!0,children:i.jsxs(ke,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[i.jsx(oe.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),i.jsxs(Gr,{align:"end",className:"pr-w-[150px]",children:[i.jsx(pr,{children:"Toggle columns"}),i.jsx(Ur,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>i.jsx(jn,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const Qt=we.Root,si=we.Group,er=we.Value,Dt=E.forwardRef(({className:e,children:t,...r},n)=>i.jsxs(we.Trigger,{ref:n,className:$("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,i.jsx(we.Icon,{asChild:!0,children:i.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));Dt.displayName=we.Trigger.displayName;const Ao=E.forwardRef(({className:e,...t},r)=>i.jsx(we.ScrollUpButton,{ref:r,className:$("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:i.jsx(oe.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ao.displayName=we.ScrollUpButton.displayName;const Bo=E.forwardRef(({className:e,...t},r)=>i.jsx(we.ScrollDownButton,{ref:r,className:$("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:i.jsx(oe.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Bo.displayName=we.ScrollDownButton.displayName;const At=E.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>i.jsx(we.Portal,{children:i.jsxs(we.Content,{ref:o,className:$("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[i.jsx(Ao,{}),i.jsx(we.Viewport,{className:$("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),i.jsx(Bo,{})]})}));At.displayName=we.Content.displayName;const ii=E.forwardRef(({className:e,...t},r)=>i.jsx(we.Label,{ref:r,className:$("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));ii.displayName=we.Label.displayName;const He=E.forwardRef(({className:e,children:t,...r},n)=>i.jsxs(we.Item,{ref:n,className:$("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[i.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:i.jsx(we.ItemIndicator,{children:i.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}),i.jsx(we.ItemText,{children:t})]}));He.displayName=we.Item.displayName;const li=E.forwardRef(({className:e,...t},r)=>i.jsx(we.Separator,{ref:r,className:$("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));li.displayName=we.Separator.displayName;function kp({table:e}){return i.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[i.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[i.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),i.jsxs(Qt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[i.jsx(Dt,{className:"pr-h-8 pr-w-[70px]",children:i.jsx(er,{placeholder:e.getState().pagination.pageSize})}),i.jsx(At,{side:"top",children:[10,20,30,40,50].map(t=>i.jsx(He,{value:`${t}`,children:t},t))})]})]}),i.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),i.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[i.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[i.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),i.jsx(oe.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),i.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[i.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),i.jsx(oe.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),i.jsxs(ke,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[i.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),i.jsx(oe.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),i.jsxs(ke,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[i.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),i.jsx(oe.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Hr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>i.jsx("div",{className:$("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:i.jsx("table",{ref:n,className:$("pr-w-full pr-caption-bottom pr-text-sm",e),...r})}));Hr.displayName="Table";const qr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>i.jsx("thead",{ref:n,className:$({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...r}));qr.displayName="TableHeader";const Wr=E.forwardRef(({className:e,...t},r)=>i.jsx("tbody",{ref:r,className:$("[&_tr:last-child]:pr-border-0",e),...t}));Wr.displayName="TableBody";const ci=E.forwardRef(({className:e,...t},r)=>i.jsx("tfoot",{ref:r,className:$("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));ci.displayName="TableFooter";const ct=E.forwardRef(({className:e,...t},r)=>i.jsx("tr",{ref:r,className:$("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));ct.displayName="TableRow";const tr=E.forwardRef(({className:e,...t},r)=>i.jsx("th",{ref:r,className:$("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));tr.displayName="TableHead";const Bt=E.forwardRef(({className:e,...t},r)=>i.jsx("td",{ref:r,className:$("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));Bt.displayName="TableCell";const pi=E.forwardRef(({className:e,...t},r)=>i.jsx("caption",{ref:r,className:$("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));pi.displayName="TableCaption";function di({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var g;const[c,p]=E.useState([]),[u,m]=E.useState([]),[v,b]=E.useState({}),[d,h]=E.useState({}),f=je.useReactTable({data:t,columns:e,getCoreRowModel:je.getCoreRowModel(),...r&&{getPaginationRowModel:je.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:je.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:je.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:h,state:{sorting:c,columnFilters:u,columnVisibility:v,rowSelection:d}});return i.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&i.jsx(xp,{table:f}),i.jsxs(Hr,{stickyHeader:a,children:[i.jsx(qr,{stickyHeader:a,children:f.getHeaderGroups().map(w=>i.jsx(ct,{children:w.headers.map(O=>i.jsx(tr,{children:O.isPlaceholder?void 0:je.flexRender(O.column.columnDef.header,O.getContext())},O.id))},w.id))}),i.jsx(Wr,{children:(g=f.getRowModel().rows)!=null&&g.length?f.getRowModel().rows.map(w=>i.jsx(ct,{onClick:()=>s(w,f),"data-state":w.getIsSelected()&&"selected",children:w.getVisibleCells().map(O=>i.jsx(Bt,{children:je.flexRender(O.column.columnDef.cell,O.getContext())},O.id))},w.id)):i.jsx(ct,{children:i.jsx(Bt,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),r&&i.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[i.jsx(ke,{variant:"outline",size:"sm",onClick:()=>f.previousPage(),disabled:!f.getCanPreviousPage(),children:"Previous"}),i.jsx(ke,{variant:"outline",size:"sm",onClick:()=>f.nextPage(),disabled:!f.getCanNextPage(),children:"Next"})]}),r&&n&&i.jsx(kp,{table:f})]})}const Ep=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Pa=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},_a=(e,t,r,n)=>{if(!e||e===""||t==="")return[];const o=[],a=Ep(e);let s=n.chapterNum,c=n.verseNum,p=0;return a.forEach(u=>{u.startsWith("\\id")&&(s=0,c=0),u.startsWith("\\c")&&(s=Pa(u),c=0),u.startsWith("\\v")&&(c=Pa(u),s===0&&(s=n.chapterNum));const m=r(u,t);for(let v=0;v<m.length;v++){const b={reference:{...n,chapterNum:s!==void 0?+s:-1,verseNum:c!==void 0?+c:-1},snippet:u,key:p};p+=1,o.push(b)}}),o};function Np({selectedItem:e,text:t,extractItems:r,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,u]=E.useState(_a(t,e,r,n));return E.useEffect(()=>u(_a(t,e,r,n)),[t,e,n,r]),i.jsxs(Hr,{stickyHeader:!0,children:[i.jsx(qr,{stickyHeader:!0,children:i.jsxs(ct,{children:[i.jsx(tr,{children:s}),i.jsx(tr,{children:c})]})}),i.jsx(Wr,{children:p.map(m=>i.jsxs(ct,{onClick:()=>{o(m.reference)},children:[i.jsx(Bt,{children:`${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),i.jsx(Bt,{children:m.snippet})]},m.key))})]})}const Tp=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_platformScripture_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),On=e=>e==="asc"?i.jsx(oe.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?i.jsx(oe.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):i.jsx(oe.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),Sp=(e,t,r)=>{let n=e;return t!=="all"&&(n=n.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),r!==""&&(n=n.filter(o=>o.item.includes(r))),n},Cp=(e,t,r)=>{const n=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=n.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:r(s)};n.push(p)}}return n},bt=(e,t)=>e[t]??t;function jp({scriptureReference:e,setScriptureReference:t,localizedStrings:r,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:u,onScopeChange:m,getColumns:v}){const b=bt(r,"%webView_inventory_all%"),d=bt(r,"%webView_inventory_approved%"),h=bt(r,"%webView_inventory_unapproved%"),f=bt(r,"%webView_inventory_unknown%"),g=bt(r,"%webView_platformScripture_currentBook%"),w=bt(r,"%webView_inventory_scope_chapter%"),O=bt(r,"%webView_inventory_scope_verse%"),x=bt(r,"%webView_inventory_filter_text%"),[k,y]=E.useState([]),[S,C]=E.useState("all"),[I,R]=E.useState(""),[_,T]=E.useState(""),M=E.useCallback((V,j)=>{y(W=>{let G=[];return V.forEach(K=>{G=W.map(X=>X.item===K&&X.status!==j?{...X,status:j}:X)}),G});let L=[...o];V.forEach(W=>{j==="approved"?L.includes(W)||L.push(W):L=L.filter(G=>G!==W)}),a(L);let q=[...s];V.forEach(W=>{j==="unapproved"?q.includes(W)||q.push(W):q=q.filter(G=>G!==W)}),c(q)},[o,a,s,c]),A=E.useCallback(V=>o.includes(V)?"approved":s.includes(V)?"unapproved":"unknown",[o,s]);E.useEffect(()=>{p&&y(Cp(p,n,A))},[n,p,A]);const z=E.useMemo(()=>Sp(k,S,I),[k,S,I]);E.useEffect(()=>{T("")},[z]);const U=(V,j)=>{j.toggleAllRowsSelected(!1),V.toggleSelected(void 0),T(V.getValue("item"))},B=E.useMemo(()=>v(M),[v,M]),H=V=>{if(V==="book"||V==="chapter"||V==="verse")m(V);else throw new Error(`Invalid scope value: ${V}`)},ee=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")C(V);else throw new Error(`Invalid status filter value: ${V}`)};return i.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[i.jsxs("div",{className:"pr-flex",children:[i.jsxs(Qt,{onValueChange:V=>ee(V),defaultValue:S,children:[i.jsx(Dt,{className:"pr-m-1",children:i.jsx(er,{placeholder:"Select filter"})}),i.jsxs(At,{className:"pr-font-sans",children:[i.jsx(He,{value:"all",children:b}),i.jsx(He,{value:"approved",children:d}),i.jsx(He,{value:"unapproved",children:h}),i.jsx(He,{value:"unknown",children:f})]})]}),i.jsxs(Qt,{onValueChange:V=>H(V),defaultValue:u,children:[i.jsx(Dt,{className:"pr-m-1",children:i.jsx(er,{placeholder:"Select scope"})}),i.jsxs(At,{className:"pr-font-sans",children:[i.jsx(He,{value:"book",children:g}),i.jsx(He,{value:"chapter",children:w}),i.jsx(He,{value:"verse",children:O})]})]}),i.jsx(lr,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:x,value:I,onChange:V=>{R(V.target.value)}})]}),i.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:i.jsx(di,{columns:B,data:z,onRowClickHandler:U,stickyHeader:!0})}),_!==""&&i.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:i.jsx(Np,{selectedItem:_,text:p,extractItems:n,scriptureReference:e,setScriptureReference:V=>t(V),localizedStrings:r})})]})}const ui=Tn.cva("pr-twp pr-font-sans pr-inline-flex pr-items-center pr-justify-center pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-muted hover:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=on]:pr-bg-accent data-[state=on]:pr-text-accent-foreground",{variants:{variant:{default:"pr-bg-transparent",outline:"pr-border pr-border-input pr-bg-transparent hover:pr-bg-accent hover:pr-text-accent-foreground"},size:{default:"pr-h-10 pr-px-3",sm:"pr-h-9 pr-px-2.5",lg:"pr-h-11 pr-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Op=E.forwardRef(({className:e,variant:t,size:r,...n},o)=>i.jsx(Bs.Root,{ref:o,className:$(ui({variant:t,size:r,className:e})),...n}));Op.displayName=Bs.Root.displayName;const fi=E.createContext({size:"default",variant:"default"}),Lo=E.forwardRef(({className:e,variant:t,size:r,children:n,...o},a)=>i.jsx(Sn.Root,{ref:a,className:$("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1 pr-font-sans",e),...o,children:i.jsx(fi.Provider,{value:{variant:t,size:r},children:n})}));Lo.displayName=Sn.Root.displayName;const Pr=E.forwardRef(({className:e,children:t,variant:r,size:n,...o},a)=>{const s=E.useContext(fi);return i.jsx(Sn.Item,{ref:a,className:$(ui({variant:s.variant||r,size:s.size||n}),e),...o,children:t})});Pr.displayName=Sn.Item.displayName;const Rp=e=>({accessorKey:"item",header:({column:t})=>i.jsxs(ke,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,On(t.getIsSorted())]})}),Pp=e=>({accessorKey:"count",header:({column:t})=>i.jsx("div",{className:"pr-flex pr-justify-end pr-tabular-nums",children:i.jsxs(ke,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,On(t.getIsSorted())]})}),cell:({row:t})=>i.jsx("div",{className:"pr-flex pr-justify-end",children:t.getValue("count")})}),_p=(e,t)=>({accessorKey:"status",header:({column:r})=>i.jsx("div",{className:"pr-flex pr-justify-center",children:i.jsxs(ke,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,On(r.getIsSorted())]})}),cell:({row:r})=>{const n=r.getValue("status"),o=r.getValue("item");return i.jsxs(Lo,{value:n,variant:"outline",type:"single",children:[i.jsx(Pr,{onClick:()=>t([o],"approved"),value:"approved",children:i.jsx(oe.CircleCheckIcon,{})}),i.jsx(Pr,{onClick:()=>t([o],"unapproved"),value:"unapproved",children:i.jsx(oe.CircleXIcon,{})}),i.jsx(Pr,{onClick:()=>t([o],"unknown"),value:"unknown",children:i.jsx(oe.CircleHelpIcon,{})})]})}});function mi({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=E.useState(""),a=s=>{o(s),e(s)};return i.jsx(lr,{className:$("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}const Fo=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.Root,{orientation:"vertical",ref:r,className:$("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Fo.displayName=Be.List.displayName;const Vo=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.List,{ref:r,className:$("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Vo.displayName=Be.List.displayName;const hi=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.Trigger,{ref:r,...t,className:$("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),zo=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.Content,{ref:r,className:$("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));zo.displayName=Be.Content.displayName;function Ip({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return i.jsxs("div",{className:"pr-twp",children:[i.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?i.jsx("h1",{children:n}):"",i.jsx(mi,{isFullWidth:o,onSearch:t,placeholder:r})]}),i.jsxs(Fo,{dir:a,children:[i.jsx(Vo,{children:e.map(s=>i.jsx(hi,{value:s.value,children:s.value},s.key))}),e.map(s=>i.jsx(zo,{value:s.value,children:s.content},s.key))]})]})}const wt="scrBook",$p="scrRef",jt="source",Mp="details",Dp="Scripture Reference",Ap="Scripture Book",gi="Type",Bp="Details";function Lp(e,t){const r=t??!1;return[{accessorFn:n=>`${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:wt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Dp,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?me.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===wt?re.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>re.formatScrRef(n.start),id:$p,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:re.formatScrRef(o.start)},sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:jt,header:r?(e==null?void 0:e.typeColumnName)??gi:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:Mp,header:(e==null?void 0:e.detailsColumnName)??Bp,cell:n=>n.getValue(),enableGrouping:!1}]}const Fp=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||re.compareScrRefs(e.start,e.end)===0?`${re.scrRefToBBBCCCVVV(e.start)}+${t}`:`${re.scrRefToBBBCCCVVV(e.start)}+${t}-${re.scrRefToBBBCCCVVV(e.end)}+${r}`},Ia=e=>`${Fp({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Vp({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[u,m]=E.useState([]),[v,b]=E.useState([{id:wt,desc:!1}]),[d,h]=E.useState({}),f=E.useMemo(()=>e.flatMap(R=>R.data.map(_=>({..._,source:R.source}))),[e]),g=E.useMemo(()=>Lp({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);E.useEffect(()=>{u.includes(jt)?b([{id:jt,desc:!1},{id:wt,desc:!1}]):b([{id:wt,desc:!1}])},[u]);const w=je.useReactTable({data:f,columns:g,state:{grouping:u,sorting:v,rowSelection:d},onGroupingChange:m,onSortingChange:b,onRowSelectionChange:h,getExpandedRowModel:je.getExpandedRowModel(),getGroupedRowModel:je.getGroupedRowModel(),getCoreRowModel:je.getCoreRowModel(),getSortedRowModel:je.getSortedRowModel(),getRowId:Ia,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});E.useEffect(()=>{if(c){const R=w.getSelectedRowModel().rowsById,_=Object.keys(R);if(_.length===1){const T=f.find(M=>Ia(M)===_[0])||void 0;T&&c(T)}}},[d,f,c,w]);const O=o??Ap,x=a??gi,k=[{label:"No Grouping",value:[]},{label:`Group by ${O}`,value:[wt]},{label:`Group by ${x}`,value:[jt]},{label:`Group by ${O} and ${x}`,value:[wt,jt]},{label:`Group by ${x} and ${O}`,value:[jt,wt]}],y=R=>{m(JSON.parse(R))},S=(R,_)=>{!R.getIsGrouped()&&!R.getIsSelected()&&R.getToggleSelectedHandler()(_)},C=(R,_)=>R.getIsGrouped()?"":$("banded-row",_%2===0?"even":"odd"),I=(R,_,T)=>{if(!((R==null?void 0:R.length)===0||_.depth<T.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"pr-ps-4";default:return}switch(_.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return i.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&i.jsxs(Qt,{value:JSON.stringify(u),onValueChange:R=>{y(R)},children:[i.jsx(Dt,{className:"pr-mb-1 pr-mt-2",children:i.jsx(er,{})}),i.jsx(At,{position:"item-aligned",children:i.jsx(si,{children:k.map(R=>i.jsx(He,{value:JSON.stringify(R.value),children:R.label},R.label))})})]}),i.jsxs(Hr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&i.jsx(qr,{children:w.getHeaderGroups().map(R=>i.jsx(ct,{children:R.headers.filter(_=>_.column.columnDef.header).map(_=>i.jsx(tr,{colSpan:_.colSpan,className:"top-0 pr-sticky",children:_.isPlaceholder?void 0:i.jsxs("div",{children:[_.column.getCanGroup()?i.jsx(ke,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",je.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},R.id))}),i.jsx(Wr,{children:w.getRowModel().rows.map((R,_)=>i.jsx(ct,{"data-state":R.getIsSelected()?"selected":"",className:$(C(R,_)),onClick:T=>S(R,T),children:R.getVisibleCells().map(T=>{if(!(T.getIsPlaceholder()||T.column.columnDef.enableGrouping&&!T.getIsGrouped()&&(T.column.columnDef.id!==jt||!r)))return i.jsx(Bt,{className:$(T.column.columnDef.id,"pr-p-[1px]",I(u,R,T)),children:(()=>T.getIsGrouped()?i.jsxs(ke,{variant:"link",onClick:R.getToggleExpandedHandler(),type:"button",children:[R.getIsExpanded()&&i.jsx(oe.ChevronDown,{}),!R.getIsExpanded()&&(p==="ltr"?i.jsx(oe.ChevronRight,{}):i.jsx(oe.ChevronLeft,{}))," ",je.flexRender(T.column.columnDef.cell,T.getContext())," (",R.subRows.length,")"]}):je.flexRender(T.column.columnDef.cell,T.getContext()))()},T.id)})},R.id))})]})]})}const Xn={[re.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[re.getLocalizeKeyForScrollGroupId(0)]:"A",[re.getLocalizeKeyForScrollGroupId(1)]:"B",[re.getLocalizeKeyForScrollGroupId(2)]:"C",[re.getLocalizeKeyForScrollGroupId(3)]:"D",[re.getLocalizeKeyForScrollGroupId(4)]:"E",[re.getLocalizeKeyForScrollGroupId(5)]:"F",[re.getLocalizeKeyForScrollGroupId(6)]:"G",[re.getLocalizeKeyForScrollGroupId(7)]:"H",[re.getLocalizeKeyForScrollGroupId(8)]:"I",[re.getLocalizeKeyForScrollGroupId(9)]:"J",[re.getLocalizeKeyForScrollGroupId(10)]:"K",[re.getLocalizeKeyForScrollGroupId(11)]:"L",[re.getLocalizeKeyForScrollGroupId(12)]:"M",[re.getLocalizeKeyForScrollGroupId(13)]:"N",[re.getLocalizeKeyForScrollGroupId(14)]:"O",[re.getLocalizeKeyForScrollGroupId(15)]:"P",[re.getLocalizeKeyForScrollGroupId(16)]:"Q",[re.getLocalizeKeyForScrollGroupId(17)]:"R",[re.getLocalizeKeyForScrollGroupId(18)]:"S",[re.getLocalizeKeyForScrollGroupId(19)]:"T",[re.getLocalizeKeyForScrollGroupId(20)]:"U",[re.getLocalizeKeyForScrollGroupId(21)]:"V",[re.getLocalizeKeyForScrollGroupId(22)]:"W",[re.getLocalizeKeyForScrollGroupId(23)]:"X",[re.getLocalizeKeyForScrollGroupId(24)]:"Y",[re.getLocalizeKeyForScrollGroupId(25)]:"Z"};function zp({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:n={}}){const o={...Xn,...Object.fromEntries(Object.entries(n).map(([a,s])=>[a,a===s&&a in Xn?Xn[a]:s]))};return i.jsxs(Qt,{value:`${t}`,onValueChange:a=>r(a==="undefined"?void 0:parseInt(a,10)),children:[i.jsx(Dt,{className:"pr-twp pr-w-auto",children:i.jsx(er,{placeholder:o[re.getLocalizeKeyForScrollGroupId(t)]??t})}),i.jsx(At,{style:{zIndex:250},children:e.map(a=>i.jsx(He,{value:`${a}`,children:o[re.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const Go=E.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>i.jsx(Ls.Root,{ref:o,decorative:r,orientation:t,className:$("pr-twp pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));Go.displayName=Ls.Root.displayName;function Gp({children:e}){return i.jsx("div",{className:"pr-twp pr-grid",children:e})}function Up({primary:e,secondary:t,children:r,isLoading:n=!1,loadingMessage:o}){return i.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[i.jsxs("div",{children:[i.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),i.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:t})]}),n?i.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):i.jsx("div",{children:r})]})}function Hp({primary:e,secondary:t,includeSeparator:r=!1}){return i.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[i.jsxs("div",{children:[i.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),i.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?i.jsx(Go,{}):""]})}var Pt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Pt||{});function qp({id:e,isChecked:t,labelText:r="",labelPosition:n=Pt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:u}){const m=i.jsx(Se.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:u});let v;if(r){const b=n===Pt.Before||n===Pt.Above,d=i.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===Pt.Before||n===Pt.After,f=h?d:i.jsx("div",{children:d}),g=h?m:i.jsx("div",{children:m});v=i.jsxs(Se.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[b&&f,g,!b&&f]})}else v=m;return v}const bi=N.forwardRef(({className:e,...t},r)=>i.jsx(mo.Root,{ref:r,className:$("pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",e),...t,children:i.jsx(mo.Indicator,{className:$("pr-flex pr-items-center pr-justify-center pr-text-current"),children:i.jsx(oe.Check,{className:"pr-h-4 pr-w-4"})})}));bi.displayName=mo.Root.displayName;function Wp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return i.jsxs("fieldset",{id:e,className:t,children:[r&&i.jsx("legend",{className:"pr-font-sans",children:r}),n.map(c=>i.jsxs("div",{className:"pr-m-2 pr-flex pr-items-center",children:[i.jsx(bi,{className:"pr-mr-2 pr-align-middle",checked:o.includes(c),onCheckedChange:p=>a(c,p)},c),i.jsx(Qe,{children:s?s(c):c})]}))]})}function Xp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Kp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Uo={},vi={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(vi);var Yp=vi.exports,Kn={};function dr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function _t(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function yi(e){if(!_t(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=yi(e[r])}),t}function pt(e,t,r={clone:!0}){const n=r.clone?P({},e):e;return _t(e)&&_t(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(_t(t[o])&&o in e&&_t(e[o])?n[o]=pt(e[o],t[o],r):r.clone?n[o]=_t(t[o])?yi(t[o]):t[o]:n[o]=t[o])}),n}var bo={exports:{}},on={exports:{}},pe={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $a;function Jp(){if($a)return pe;$a=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case u:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function k(y){return x(y)===u}return pe.AsyncMode=p,pe.ConcurrentMode=u,pe.ContextConsumer=c,pe.ContextProvider=s,pe.Element=t,pe.ForwardRef=m,pe.Fragment=n,pe.Lazy=h,pe.Memo=d,pe.Portal=r,pe.Profiler=a,pe.StrictMode=o,pe.Suspense=v,pe.isAsyncMode=function(y){return k(y)||x(y)===p},pe.isConcurrentMode=k,pe.isContextConsumer=function(y){return x(y)===c},pe.isContextProvider=function(y){return x(y)===s},pe.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},pe.isForwardRef=function(y){return x(y)===m},pe.isFragment=function(y){return x(y)===n},pe.isLazy=function(y){return x(y)===h},pe.isMemo=function(y){return x(y)===d},pe.isPortal=function(y){return x(y)===r},pe.isProfiler=function(y){return x(y)===a},pe.isStrictMode=function(y){return x(y)===o},pe.isSuspense=function(y){return x(y)===v},pe.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===u||y===a||y===o||y===v||y===b||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===g||y.$$typeof===w||y.$$typeof===O||y.$$typeof===f)},pe.typeOf=x,pe}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Zp(){return Ma||(Ma=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(F){return typeof F=="string"||typeof F=="function"||F===n||F===u||F===a||F===o||F===v||F===b||typeof F=="object"&&F!==null&&(F.$$typeof===h||F.$$typeof===d||F.$$typeof===s||F.$$typeof===c||F.$$typeof===m||F.$$typeof===g||F.$$typeof===w||F.$$typeof===O||F.$$typeof===f)}function k(F){if(typeof F=="object"&&F!==null){var te=F.$$typeof;switch(te){case t:var D=F.type;switch(D){case p:case u:case n:case a:case o:case v:return D;default:var le=D&&D.$$typeof;switch(le){case c:case m:case h:case d:case s:return le;default:return te}}case r:return te}}}var y=p,S=u,C=c,I=s,R=t,_=m,T=n,M=h,A=d,z=r,U=a,B=o,H=v,ee=!1;function V(F){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(F)||k(F)===p}function j(F){return k(F)===u}function L(F){return k(F)===c}function q(F){return k(F)===s}function W(F){return typeof F=="object"&&F!==null&&F.$$typeof===t}function G(F){return k(F)===m}function K(F){return k(F)===n}function X(F){return k(F)===h}function J(F){return k(F)===d}function Y(F){return k(F)===r}function Z(F){return k(F)===a}function Q(F){return k(F)===o}function ie(F){return k(F)===v}de.AsyncMode=y,de.ConcurrentMode=S,de.ContextConsumer=C,de.ContextProvider=I,de.Element=R,de.ForwardRef=_,de.Fragment=T,de.Lazy=M,de.Memo=A,de.Portal=z,de.Profiler=U,de.StrictMode=B,de.Suspense=H,de.isAsyncMode=V,de.isConcurrentMode=j,de.isContextConsumer=L,de.isContextProvider=q,de.isElement=W,de.isForwardRef=G,de.isFragment=K,de.isLazy=X,de.isMemo=J,de.isPortal=Y,de.isProfiler=Z,de.isStrictMode=Q,de.isSuspense=ie,de.isValidElementType=x,de.typeOf=k}()),de}var Da;function wi(){return Da||(Da=1,process.env.NODE_ENV==="production"?on.exports=Jp():on.exports=Zp()),on.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Yn,Aa;function Qp(){if(Aa)return Yn;Aa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(m){u[m]=m}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Yn=o()?Object.assign:function(a,s){for(var c,p=n(a),u,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){u=e(c);for(var b=0;b<u.length;b++)r.call(c,u[b])&&(p[u[b]]=c[u[b]])}}return p},Yn}var Jn,Ba;function Ho(){if(Ba)return Jn;Ba=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Jn=e,Jn}var Zn,La;function xi(){return La||(La=1,Zn=Function.call.bind(Object.prototype.hasOwnProperty)),Zn}var Qn,Fa;function ed(){if(Fa)return Qn;Fa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ho(),r={},n=xi();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,u){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var b=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw b.name="Invariant Violation",b}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=u?u():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Qn=o,Qn}var eo,Va;function td(){if(Va)return eo;Va=1;var e=wi(),t=Qp(),r=Ho(),n=xi(),o=ed(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return eo=function(c,p){var u=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var L=j&&(u&&j[u]||j[m]);if(typeof L=="function")return L}var b="<<anonymous>>",d={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:O(),arrayOf:x,element:k(),elementType:y(),instanceOf:S,node:_(),objectOf:I,oneOf:C,oneOfType:R,shape:M,exact:A};function h(j,L){return j===L?j!==0||1/j===1/L:j!==j&&L!==L}function f(j,L){this.message=j,this.data=L&&typeof L=="object"?L:{},this.stack=""}f.prototype=Error.prototype;function g(j){if(process.env.NODE_ENV!=="production")var L={},q=0;function W(K,X,J,Y,Z,Q,ie){if(Y=Y||b,Q=Q||J,ie!==r){if(p){var F=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw F.name="Invariant Violation",F}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=Y+":"+J;!L[te]&&q<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+Y+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[te]=!0,q++)}}return X[J]==null?K?X[J]===null?new f("The "+Z+" `"+Q+"` is marked as required "+("in `"+Y+"`, but its value is `null`.")):new f("The "+Z+" `"+Q+"` is marked as required in "+("`"+Y+"`, but its value is `undefined`.")):null:j(X,J,Y,Z,Q)}var G=W.bind(null,!1);return G.isRequired=W.bind(null,!0),G}function w(j){function L(q,W,G,K,X,J){var Y=q[W],Z=B(Y);if(Z!==j){var Q=H(Y);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Q+"` supplied to `"+G+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return g(L)}function O(){return g(s)}function x(j){function L(q,W,G,K,X){if(typeof j!="function")return new f("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var J=q[W];if(!Array.isArray(J)){var Y=B(J);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected an array."))}for(var Z=0;Z<J.length;Z++){var Q=j(J,Z,G,K,X+"["+Z+"]",r);if(Q instanceof Error)return Q}return null}return g(L)}function k(){function j(L,q,W,G,K){var X=L[q];if(!c(X)){var J=B(X);return new f("Invalid "+G+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement."))}return null}return g(j)}function y(){function j(L,q,W,G,K){var X=L[q];if(!e.isValidElementType(X)){var J=B(X);return new f("Invalid "+G+" `"+K+"` of type "+("`"+J+"` supplied to `"+W+"`, expected a single ReactElement type."))}return null}return g(j)}function S(j){function L(q,W,G,K,X){if(!(q[W]instanceof j)){var J=j.name||b,Y=V(q[W]);return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected ")+("instance of `"+J+"`."))}return null}return g(L)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function L(q,W,G,K,X){for(var J=q[W],Y=0;Y<j.length;Y++)if(h(J,j[Y]))return null;var Z=JSON.stringify(j,function(ie,F){var te=H(F);return te==="symbol"?String(F):F});return new f("Invalid "+K+" `"+X+"` of value `"+String(J)+"` "+("supplied to `"+G+"`, expected one of "+Z+"."))}return g(L)}function I(j){function L(q,W,G,K,X){if(typeof j!="function")return new f("Property `"+X+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var J=q[W],Y=B(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type "+("`"+Y+"` supplied to `"+G+"`, expected an object."));for(var Z in J)if(n(J,Z)){var Q=j(J,Z,G,K,X+"."+Z,r);if(Q instanceof Error)return Q}return null}return g(L)}function R(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<j.length;L++){var q=j[L];if(typeof q!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+L+"."),s}function W(G,K,X,J,Y){for(var Z=[],Q=0;Q<j.length;Q++){var ie=j[Q],F=ie(G,K,X,J,Y,r);if(F==null)return null;F.data&&n(F.data,"expectedType")&&Z.push(F.data.expectedType)}var te=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new f("Invalid "+J+" `"+Y+"` supplied to "+("`"+X+"`"+te+"."))}return g(W)}function _(){function j(L,q,W,G,K){return z(L[q])?null:new f("Invalid "+G+" `"+K+"` supplied to "+("`"+W+"`, expected a ReactNode."))}return g(j)}function T(j,L,q,W,G){return new f((j||"React class")+": "+L+" type `"+q+"."+W+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function M(j){function L(q,W,G,K,X){var J=q[W],Y=B(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+G+"`, expected `object`."));for(var Z in j){var Q=j[Z];if(typeof Q!="function")return T(G,K,X,Z,H(Q));var ie=Q(J,Z,G,K,X+"."+Z,r);if(ie)return ie}return null}return g(L)}function A(j){function L(q,W,G,K,X){var J=q[W],Y=B(J);if(Y!=="object")return new f("Invalid "+K+" `"+X+"` of type `"+Y+"` "+("supplied to `"+G+"`, expected `object`."));var Z=t({},q[W],j);for(var Q in Z){var ie=j[Q];if(n(j,Q)&&typeof ie!="function")return T(G,K,X,Q,H(ie));if(!ie)return new f("Invalid "+K+" `"+X+"` key `"+Q+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(q[W],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var F=ie(J,Q,G,K,X+"."+Q,r);if(F)return F}return null}return g(L)}function z(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(z);if(j===null||c(j))return!0;var L=v(j);if(L){var q=L.call(j),W;if(L!==j.entries){for(;!(W=q.next()).done;)if(!z(W.value))return!1}else for(;!(W=q.next()).done;){var G=W.value;if(G&&!z(G[1]))return!1}}else return!1;return!0;default:return!1}}function U(j,L){return j==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function B(j){var L=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":U(L,j)?"symbol":L}function H(j){if(typeof j>"u"||j===null)return""+j;var L=B(j);if(L==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return L}function ee(j){var L=H(j);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function V(j){return!j.constructor||!j.constructor.name?b:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},eo}var to,za;function rd(){if(za)return to;za=1;var e=Ho();function t(){}function r(){}return r.resetWarningCache=t,to=function(){function n(s,c,p,u,m,v){if(v!==e){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},to}if(process.env.NODE_ENV!=="production"){var nd=wi(),od=!0;bo.exports=td()(nd.isElement,od)}else bo.exports=rd()();var ad=bo.exports;const l=Xp(ad);function sd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ki(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!sd(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ei=dr(l.element,ki);Ei.isRequired=dr(l.element.isRequired,ki);const Xr=Ei;function id(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ld(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!id(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const cd=dr(l.elementType,ld),pd="exact-prop: ​";function Ni(e){return process.env.NODE_ENV==="production"?e:P({},e,{[pd]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function rr(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var vo={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ga;function dd(){if(Ga)return ue;Ga=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function f(g){if(typeof g=="object"&&g!==null){var w=g.$$typeof;switch(w){case e:switch(g=g.type,g){case r:case o:case n:case u:case m:return g;default:switch(g=g&&g.$$typeof,g){case c:case s:case p:case b:case v:case a:return g;default:return w}}case t:return w}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=p,ue.Fragment=r,ue.Lazy=b,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=n,ue.Suspense=u,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(g){return f(g)===s},ue.isContextProvider=function(g){return f(g)===a},ue.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},ue.isForwardRef=function(g){return f(g)===p},ue.isFragment=function(g){return f(g)===r},ue.isLazy=function(g){return f(g)===b},ue.isMemo=function(g){return f(g)===v},ue.isPortal=function(g){return f(g)===t},ue.isProfiler=function(g){return f(g)===o},ue.isStrictMode=function(g){return f(g)===n},ue.isSuspense=function(g){return f(g)===u},ue.isSuspenseList=function(g){return f(g)===m},ue.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===o||g===n||g===u||g===m||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===s||g.$$typeof===p||g.$$typeof===h||g.getModuleId!==void 0)},ue.typeOf=f,ue}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ua;function ud(){return Ua||(Ua=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,f=!1,g=!1,w=!1,O=!1,x;x=Symbol.for("react.module.reference");function k(D){return!!(typeof D=="string"||typeof D=="function"||D===r||D===o||O||D===n||D===u||D===m||w||D===d||h||f||g||typeof D=="object"&&D!==null&&(D.$$typeof===b||D.$$typeof===v||D.$$typeof===a||D.$$typeof===s||D.$$typeof===p||D.$$typeof===x||D.getModuleId!==void 0))}function y(D){if(typeof D=="object"&&D!==null){var le=D.$$typeof;switch(le){case e:var Ne=D.type;switch(Ne){case r:case o:case n:case u:case m:return Ne;default:var _e=Ne&&Ne.$$typeof;switch(_e){case c:case s:case p:case b:case v:case a:return _e;default:return le}}case t:return le}}}var S=s,C=a,I=e,R=p,_=r,T=b,M=v,A=t,z=o,U=n,B=u,H=m,ee=!1,V=!1;function j(D){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L(D){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(D){return y(D)===s}function W(D){return y(D)===a}function G(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function K(D){return y(D)===p}function X(D){return y(D)===r}function J(D){return y(D)===b}function Y(D){return y(D)===v}function Z(D){return y(D)===t}function Q(D){return y(D)===o}function ie(D){return y(D)===n}function F(D){return y(D)===u}function te(D){return y(D)===m}fe.ContextConsumer=S,fe.ContextProvider=C,fe.Element=I,fe.ForwardRef=R,fe.Fragment=_,fe.Lazy=T,fe.Memo=M,fe.Portal=A,fe.Profiler=z,fe.StrictMode=U,fe.Suspense=B,fe.SuspenseList=H,fe.isAsyncMode=j,fe.isConcurrentMode=L,fe.isContextConsumer=q,fe.isContextProvider=W,fe.isElement=G,fe.isForwardRef=K,fe.isFragment=X,fe.isLazy=J,fe.isMemo=Y,fe.isPortal=Z,fe.isProfiler=Q,fe.isStrictMode=ie,fe.isSuspense=F,fe.isSuspenseList=te,fe.isValidElementType=k,fe.typeOf=y}()),fe}process.env.NODE_ENV==="production"?vo.exports=dd():vo.exports=ud();var gn=vo.exports;const fd=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function md(e){const t=`${e}`.match(fd);return t&&t[1]||""}function Ti(e,t=""){return e.displayName||e.name||md(e)||t}function Ha(e,t,r){const n=Ti(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function hd(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ti(e,"Component");if(typeof e=="object")switch(e.$$typeof){case gn.ForwardRef:return Ha(e,e.render,"ForwardRef");case gn.Memo:return Ha(e,e.type,"memo");default:return}}}function dt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const gd=l.oneOfType([l.func,l.object]),qo=gd;function rt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":rr(7));return e.charAt(0).toUpperCase()+e.slice(1)}function yo(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function Si(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function bd(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function vd(e,t){var r,n;return N.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function nr(e){return Oe(e).defaultView||window}function yd(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?P({},t.propTypes):null;return o=>(a,s,c,p,u,...m)=>{const v=u||s,b=r==null?void 0:r[v];if(b){const d=b(a,s,c,p,u,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function bn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const wd=typeof window<"u"?N.useLayoutEffect:N.useEffect,Lt=wd;let qa=0;function xd(e){const[t,r]=N.useState(e),n=e||t;return N.useEffect(()=>{t==null&&(qa+=1,r(`mui-${qa}`))},[t]),n}const Wa=N["useId".toString()];function Ci(e){if(Wa!==void 0){const t=Wa();return e??t}return xd(e)}function kd(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function ji({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:u}=N.useRef(t);N.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=N.useCallback(u=>{o||s(u)},[]);return[c,p]}function Br(e){const t=N.useRef(e);return Lt(()=>{t.current=e}),N.useRef((...r)=>(0,t.current)(...r)).current}function Xe(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{bn(r,t)})},e)}const Xa={};function Ed(e,t){const r=N.useRef(Xa);return r.current===Xa&&(r.current=e(t)),r}const Nd=[];function Td(e){N.useEffect(e,Nd)}class Kr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Kr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Cr(){const e=Ed(Kr.create).current;return Td(e.disposeEffect),e}let Rn=!0,wo=!1;const Sd=new Kr,Cd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function jd(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&Cd[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Od(e){e.metaKey||e.altKey||e.ctrlKey||(Rn=!0)}function ro(){Rn=!1}function Rd(){this.visibilityState==="hidden"&&wo&&(Rn=!0)}function Pd(e){e.addEventListener("keydown",Od,!0),e.addEventListener("mousedown",ro,!0),e.addEventListener("pointerdown",ro,!0),e.addEventListener("touchstart",ro,!0),e.addEventListener("visibilitychange",Rd,!0)}function _d(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Rn||jd(t)}function Oi(){const e=N.useCallback(o=>{o!=null&&Pd(o.ownerDocument)},[]),t=N.useRef(!1);function r(){return t.current?(wo=!0,Sd.start(100,()=>{wo=!1}),t.current=!1,!0):!1}function n(o){return _d(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function Ri(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Id(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function $d(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Md=Number.isInteger||$d;function Pi(e,t,r,n){const o=e[t];if(o==null||!Md(o)){const a=Id(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function _i(e,t,...r){return e[t]===void 0?null:Pi(e,t,...r)}function xo(){return null}_i.isRequired=Pi;xo.isRequired=xo;const Ii=process.env.NODE_ENV==="production"?xo:_i;function $i(e,t){const r=P({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=P({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=P({},a),Object.keys(o).forEach(s=>{r[n][s]=$i(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function mt(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const Ka=e=>e,Dd=()=>{let e=Ka;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ka}}},Ad=Dd(),Mi=Ad,Di={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function ot(e,t,r="Mui"){const n=Di[t];return n?`${r}-${n}`:`${Mi.generate(e)}-${t}`}function kt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=ot(e,o,r)}),n}function Bd(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function he(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const Ld=["values","unit","step"],Fd=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>P({},r,{[n.key]:n.val}),{})};function Vd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=he(e,Ld),a=Fd(t),s=Object.keys(a);function c(b){return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${r})`}function p(b){return`@media (max-width:${(typeof t[b]=="number"?t[b]:b)-n/100}${r})`}function u(b,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(b){return s.indexOf(b)+1<s.length?u(b,s[s.indexOf(b)+1]):c(b)}function v(b){const d=s.indexOf(b);return d===0?c(s[1]):d===s.length-1?p(s[d]):u(b,s[s.indexOf(b)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:u,only:m,not:v,unit:r},o)}const zd={borderRadius:4},Gd=zd,Ud=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},Et=Ud;function _r(e,t){return t?pt(e,t,{clone:!1}):e}const Wo={xs:0,sm:600,md:900,lg:1200,xl:1536},Ya={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Wo[e]}px)`};function ut(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||Ya;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||Ya;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||Wo).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function Hd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function qd(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function Pn(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function vn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=Pn(e,r)||n,t&&(o=t(o,n,e)),o}function Ee(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,u=Pn(p,n)||{};return ut(s,c,v=>{let b=vn(u,o,v);return v===b&&typeof v=="string"&&(b=vn(u,o,`${t}${v==="default"?"":rt(v)}`,v)),r===!1?b:{[r]:b}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:Et}:{},a.filterProps=[t],a}function Wd(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const Xd={m:"margin",p:"padding"},Kd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Ja={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Yd=Wd(e=>{if(e.length>2)if(Ja[e])e=Ja[e];else return[e];const[t,r]=e.split(""),n=Xd[t],o=Kd[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),_n=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],In=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Jd=[..._n,...In];function Yr(e,t,r,n){var o;const a=(o=Pn(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ai(e){return Yr(e,"spacing",8,"spacing")}function Jr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function Zd(e,t){return r=>e.reduce((n,o)=>(n[o]=Jr(t,r),n),{})}function Qd(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=Yd(r),a=Zd(o,n),s=e[r];return ut(e,s,a)}function Bi(e,t){const r=Ai(e.theme);return Object.keys(e).map(n=>Qd(e,t,n,r)).reduce(_r,{})}function ve(e){return Bi(e,_n)}ve.propTypes=process.env.NODE_ENV!=="production"?_n.reduce((e,t)=>(e[t]=Et,e),{}):{};ve.filterProps=_n;function ye(e){return Bi(e,In)}ye.propTypes=process.env.NODE_ENV!=="production"?In.reduce((e,t)=>(e[t]=Et,e),{}):{};ye.filterProps=In;process.env.NODE_ENV!=="production"&&Jd.reduce((e,t)=>(e[t]=Et,e),{});function eu(e=8){if(e.mui)return e;const t=Ai({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function $n(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?_r(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function qe(e){return typeof e!="number"?e:`${e}px solid`}function Je(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const tu=Je("border",qe),ru=Je("borderTop",qe),nu=Je("borderRight",qe),ou=Je("borderBottom",qe),au=Je("borderLeft",qe),su=Je("borderColor"),iu=Je("borderTopColor"),lu=Je("borderRightColor"),cu=Je("borderBottomColor"),pu=Je("borderLeftColor"),du=Je("outline",qe),uu=Je("outlineColor"),Mn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Yr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Jr(t,n)});return ut(e,e.borderRadius,r)}return null};Mn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Et}:{};Mn.filterProps=["borderRadius"];$n(tu,ru,nu,ou,au,su,iu,lu,cu,pu,Mn,du,uu);const Dn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Yr(e.theme,"spacing",8,"gap"),r=n=>({gap:Jr(t,n)});return ut(e,e.gap,r)}return null};Dn.propTypes=process.env.NODE_ENV!=="production"?{gap:Et}:{};Dn.filterProps=["gap"];const An=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Yr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Jr(t,n)});return ut(e,e.columnGap,r)}return null};An.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Et}:{};An.filterProps=["columnGap"];const Bn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Yr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Jr(t,n)});return ut(e,e.rowGap,r)}return null};Bn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Et}:{};Bn.filterProps=["rowGap"];const fu=Ee({prop:"gridColumn"}),mu=Ee({prop:"gridRow"}),hu=Ee({prop:"gridAutoFlow"}),gu=Ee({prop:"gridAutoColumns"}),bu=Ee({prop:"gridAutoRows"}),vu=Ee({prop:"gridTemplateColumns"}),yu=Ee({prop:"gridTemplateRows"}),wu=Ee({prop:"gridTemplateAreas"}),xu=Ee({prop:"gridArea"});$n(Dn,An,Bn,fu,mu,hu,gu,bu,vu,yu,wu,xu);function Zt(e,t){return t==="grey"?t:e}const ku=Ee({prop:"color",themeKey:"palette",transform:Zt}),Eu=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Zt}),Nu=Ee({prop:"backgroundColor",themeKey:"palette",transform:Zt});$n(ku,Eu,Nu);function ze(e){return e<=1&&e!==0?`${e*100}%`:e}const Tu=Ee({prop:"width",transform:ze}),Xo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||Wo[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:ze(r)}};return ut(e,e.maxWidth,t)}return null};Xo.filterProps=["maxWidth"];const Su=Ee({prop:"minWidth",transform:ze}),Cu=Ee({prop:"height",transform:ze}),ju=Ee({prop:"maxHeight",transform:ze}),Ou=Ee({prop:"minHeight",transform:ze});Ee({prop:"size",cssProperty:"width",transform:ze});Ee({prop:"size",cssProperty:"height",transform:ze});const Ru=Ee({prop:"boxSizing"});$n(Tu,Xo,Su,Cu,ju,Ou,Ru);const Pu={border:{themeKey:"borders",transform:qe},borderTop:{themeKey:"borders",transform:qe},borderRight:{themeKey:"borders",transform:qe},borderBottom:{themeKey:"borders",transform:qe},borderLeft:{themeKey:"borders",transform:qe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:qe},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Mn},color:{themeKey:"palette",transform:Zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Zt},backgroundColor:{themeKey:"palette",transform:Zt},p:{style:ye},pt:{style:ye},pr:{style:ye},pb:{style:ye},pl:{style:ye},px:{style:ye},py:{style:ye},padding:{style:ye},paddingTop:{style:ye},paddingRight:{style:ye},paddingBottom:{style:ye},paddingLeft:{style:ye},paddingX:{style:ye},paddingY:{style:ye},paddingInline:{style:ye},paddingInlineStart:{style:ye},paddingInlineEnd:{style:ye},paddingBlock:{style:ye},paddingBlockStart:{style:ye},paddingBlockEnd:{style:ye},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Dn},rowGap:{style:Bn},columnGap:{style:An},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ze},maxWidth:{style:Xo},minWidth:{transform:ze},height:{transform:ze},maxHeight:{transform:ze},minHeight:{transform:ze},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Ko=Pu;function _u(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Iu(e,t){return typeof e=="function"?e(t):e}function $u(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:u,transform:m,style:v}=c;if(n==null)return null;if(u==="typography"&&n==="inherit")return{[r]:n};const b=Pn(o,u)||{};return v?v(s):ut(s,n,h=>{let f=vn(b,m,h);return h===f&&typeof h=="string"&&(f=vn(b,m,`${r}${h==="default"?"":rt(h)}`,h)),p===!1?f:{[p]:f}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:Ko;function c(p){let u=p;if(typeof p=="function")u=p(a);else if(typeof p!="object")return p;if(!u)return null;const m=Hd(a.breakpoints),v=Object.keys(m);let b=m;return Object.keys(u).forEach(d=>{const h=Iu(u[d],a);if(h!=null)if(typeof h=="object")if(s[d])b=_r(b,e(d,h,a,s));else{const f=ut({theme:a},h,g=>({[d]:g}));_u(f,h)?b[d]=t({sx:h,theme:a}):b=_r(b,f)}else b=_r(b,e(d,h,a,s))}),qd(v,b)}return Array.isArray(o)?o.map(c):c(o)}return t}const Li=$u();Li.filterProps=["sx"];const Yo=Li;function Mu(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const Du=["breakpoints","palette","spacing","shape"];function Jo(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=he(e,Du),c=Vd(r),p=eu(o);let u=pt({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},Gd,a)},s);return u.applyStyles=Mu,u=t.reduce((m,v)=>pt(m,v),u),u.unstable_sxConfig=P({},Ko,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Yo({sx:v,theme:this})},u}function Au(e){return Object.keys(e).length===0}function Fi(e=null){const t=N.useContext(fo.ThemeContext);return!t||Au(t)?e:t}const Bu=Jo();function Vi(e=Bu){return Fi(e)}const Lu=["ownerState"],Fu=["variants"],Vu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function zu(e){return Object.keys(e).length===0}function Gu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function pn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Uu=Jo(),Za=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function an({defaultTheme:e,theme:t,themeId:r}){return zu(t)?e:t[r]||t}function Hu(e){return e?(t,r)=>r[e]:null}function dn(e,t){let{ownerState:r}=t,n=he(t,Lu);const o=typeof e=="function"?e(P({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>dn(a,P({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=he(o,Fu);return a.forEach(p=>{let u=!0;typeof p.props=="function"?u=p.props(P({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:r},n,r)):p.style))}),c}return o}function qu(e={}){const{themeId:t,defaultTheme:r=Uu,rootShouldForwardProp:n=pn,slotShouldForwardProp:o=pn}=e,a=s=>Yo(P({},s,{theme:an(P({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{fo.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:u,skipVariantsResolver:m,skipSx:v,overridesResolver:b=Hu(Za(u))}=c,d=he(c,Vu),h=m!==void 0?m:u&&u!=="Root"&&u!=="root"||!1,f=v||!1;let g;process.env.NODE_ENV!=="production"&&p&&(g=`${p}-${Za(u||"Root")}`);let w=pn;u==="Root"||u==="root"?w=n:u?w=o:Gu(s)&&(w=void 0);const O=fo(s,P({shouldForwardProp:w,label:g},d)),x=y=>typeof y=="function"&&y.__emotion_real!==y||_t(y)?S=>dn(y,P({},S,{theme:an({theme:S.theme,defaultTheme:r,themeId:t})})):y,k=(y,...S)=>{let C=x(y);const I=S?S.map(x):[];p&&b&&I.push(T=>{const M=an(P({},T,{defaultTheme:r,themeId:t}));if(!M.components||!M.components[p]||!M.components[p].styleOverrides)return null;const A=M.components[p].styleOverrides,z={};return Object.entries(A).forEach(([U,B])=>{z[U]=dn(B,P({},T,{theme:M}))}),b(T,z)}),p&&!h&&I.push(T=>{var M;const A=an(P({},T,{defaultTheme:r,themeId:t})),z=A==null||(M=A.components)==null||(M=M[p])==null?void 0:M.variants;return dn({variants:z},P({},T,{theme:A}))}),f||I.push(a);const R=I.length-S.length;if(Array.isArray(y)&&R>0){const T=new Array(R).fill("");C=[...y,...T],C.raw=[...y.raw,...T]}const _=O(C,...I);if(process.env.NODE_ENV!=="production"){let T;p&&(T=`${p}${rt(u||"")}`),T===void 0&&(T=`Styled(${hd(s)})`),_.displayName=T}return s.muiName&&(_.muiName=s.muiName),_};return O.withConfig&&(k.withConfig=O.withConfig),k}}function Wu(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:$i(t.components[r].defaultProps,n)}function Xu({props:e,name:t,defaultTheme:r,themeId:n}){let o=Vi(r);return n&&(o=o[n]||o),Wu({theme:o,name:t,props:e})}function Zo(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),Bd(e,t,r)}function Ku(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Ft(e){if(e.type)return e;if(e.charAt(0)==="#")return Ft(Ku(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:rr(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:rr(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function Ln(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function Yu(e){e=Ft(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(u,m=(u+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),Ln({type:c,values:p})}function Qa(e){e=Ft(e);let t=e.type==="hsl"||e.type==="hsla"?Ft(Yu(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function es(e,t){const r=Qa(e),n=Qa(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function yn(e,t){return e=Ft(e),t=Zo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Ln(e)}function Ju(e,t){if(e=Ft(e),t=Zo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return Ln(e)}function Zu(e,t){if(e=Ft(e),t=Zo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return Ln(e)}function Qu(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ef={black:"#000",white:"#fff"},Lr=ef,tf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},rf=tf,nf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ut=nf,of={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ht=of,af={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},wr=af,sf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},qt=sf,lf={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Wt=lf,cf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Xt=cf,pf=["mode","contrastThreshold","tonalOffset"],ts={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Lr.white,default:Lr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},no={text:{primary:Lr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Lr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function rs(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=Zu(e.main,o):t==="dark"&&(e.dark=Ju(e.main,a)))}function df(e="light"){return e==="dark"?{main:qt[200],light:qt[50],dark:qt[400]}:{main:qt[700],light:qt[400],dark:qt[800]}}function uf(e="light"){return e==="dark"?{main:Ut[200],light:Ut[50],dark:Ut[400]}:{main:Ut[500],light:Ut[300],dark:Ut[700]}}function ff(e="light"){return e==="dark"?{main:Ht[500],light:Ht[300],dark:Ht[700]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function mf(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:Wt[700],light:Wt[500],dark:Wt[900]}}function hf(e="light"){return e==="dark"?{main:Xt[400],light:Xt[300],dark:Xt[700]}:{main:Xt[800],light:Xt[500],dark:Xt[900]}}function gf(e="light"){return e==="dark"?{main:wr[400],light:wr[300],dark:wr[700]}:{main:"#ed6c02",light:wr[500],dark:wr[900]}}function bf(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=he(e,pf),a=e.primary||df(t),s=e.secondary||uf(t),c=e.error||ff(t),p=e.info||mf(t),u=e.success||hf(t),m=e.warning||gf(t);function v(f){const g=es(f,no.text.primary)>=r?no.text.primary:ts.text.primary;if(process.env.NODE_ENV!=="production"){const w=es(f,g);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${g} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const b=({color:f,name:g,mainShade:w=500,lightShade:O=300,darkShade:x=700})=>{if(f=P({},f),!f.main&&f[w]&&(f.main=f[w]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:rr(11,g?` (${g})`:"",w));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:rr(12,g?` (${g})`:"",JSON.stringify(f.main)));return rs(f,"light",O,n),rs(f,"dark",x,n),f.contrastText||(f.contrastText=v(f.main)),f},d={dark:no,light:ts};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),pt(P({common:P({},Lr),mode:t,primary:b({color:a,name:"primary"}),secondary:b({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:b({color:c,name:"error"}),warning:b({color:m,name:"warning"}),info:b({color:p,name:"info"}),success:b({color:u,name:"success"}),grey:rf,contrastThreshold:r,getContrastText:v,augmentColor:b,tonalOffset:n},d[t]),o)}const vf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function yf(e){return Math.round(e*1e5)/1e5}const ns={textTransform:"uppercase"},os='"Roboto", "Helvetica", "Arial", sans-serif';function wf(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=os,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:u=16,allVariants:m,pxToRem:v}=r,b=he(r,vf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(w=>`${w/u*d}rem`),f=(w,O,x,k,y)=>P({fontFamily:n,fontWeight:w,fontSize:h(O),lineHeight:x},n===os?{letterSpacing:`${yf(k/O)}em`}:{},y,m),g={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(c,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(c,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(c,14,1.75,.4,ns),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,ns),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return pt(P({htmlFontSize:u,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},g),b,{clone:!1})}const xf=.2,kf=.14,Ef=.12;function be(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${xf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${kf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ef})`].join(",")}const Nf=["none",be(0,2,1,-1,0,1,1,0,0,1,3,0),be(0,3,1,-2,0,2,2,0,0,1,5,0),be(0,3,3,-2,0,3,4,0,0,1,8,0),be(0,2,4,-1,0,4,5,0,0,1,10,0),be(0,3,5,-1,0,5,8,0,0,1,14,0),be(0,3,5,-1,0,6,10,0,0,1,18,0),be(0,4,5,-2,0,7,10,1,0,2,16,1),be(0,5,5,-3,0,8,10,1,0,3,14,2),be(0,5,6,-3,0,9,12,1,0,3,16,2),be(0,6,6,-3,0,10,14,1,0,4,18,3),be(0,6,7,-4,0,11,15,1,0,4,20,3),be(0,7,8,-4,0,12,17,2,0,5,22,4),be(0,7,8,-4,0,13,19,2,0,5,24,4),be(0,7,9,-4,0,14,21,2,0,5,26,4),be(0,8,9,-5,0,15,22,2,0,6,28,5),be(0,8,10,-5,0,16,24,2,0,6,30,5),be(0,8,11,-5,0,17,26,2,0,6,32,5),be(0,9,11,-5,0,18,28,2,0,7,34,6),be(0,9,12,-6,0,19,29,2,0,7,36,6),be(0,10,13,-6,0,20,31,3,0,8,38,7),be(0,10,13,-6,0,21,33,3,0,8,40,7),be(0,10,14,-6,0,22,35,3,0,8,42,7),be(0,11,14,-7,0,23,36,3,0,9,44,8),be(0,11,15,-7,0,24,38,3,0,9,46,8)],Tf=Nf,Sf=["duration","easing","delay"],Cf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},jf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function as(e){return`${Math.round(e)}ms`}function Of(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Rf(e){const t=P({},Cf,e.easing),r=P({},jf,e.duration);return P({getAutoHeightDuration:Of,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,u=he(a,Sf);if(process.env.NODE_ENV!=="production"){const m=b=>typeof b=="string",v=b=>!isNaN(parseFloat(b));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:as(s)} ${c} ${typeof p=="string"?p:as(p)}`).join(",")}},e,{easing:t,duration:r})}const Pf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},_f=Pf,If=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function $f(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=he(e,If);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":rr(18));const c=bf(n),p=Jo(e);let u=pt(p,{mixins:Qu(p.breakpoints,r),palette:c,shadows:Tf.slice(),typography:wf(c,a),transitions:Rf(o),zIndex:P({},_f)});if(u=pt(u,s),u=t.reduce((m,v)=>pt(m,v),u),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(b,d)=>{let h;for(h in b){const f=b[h];if(m.indexOf(h)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const g=ot("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(b,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}b[h]={}}}};Object.keys(u.components).forEach(b=>{const d=u.components[b].styleOverrides;d&&b.indexOf("Mui")===0&&v(d,b)})}return u.unstable_sxConfig=P({},Ko,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(v){return Yo({sx:v,theme:this})},u}const Mf=$f(),Qo=Mf,ea="$$material";function ht({props:e,name:t}){return Xu({props:e,name:t,defaultTheme:Qo,themeId:ea})}const zi=e=>pn(e)&&e!=="classes",Df=qu({themeId:ea,defaultTheme:Qo,rootShouldForwardProp:zi}),Pe=Df;function Af(e){return ot("MuiSvgIcon",e)}kt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Bf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Lf=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${rt(t)}`,`fontSize${rt(r)}`]};return mt(o,Af,n)},Ff=Pe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${rt(r.color)}`],t[`fontSize${rt(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,u,m,v,b,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((u=e.typography)==null||(m=u.pxToRem)==null?void 0:m.call(u,35))||"2.1875rem"}[t.fontSize],color:(v=(b=(e.vars||e).palette)==null||(b=b[t.color])==null?void 0:b.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),ta=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:u,inheritViewBox:m=!1,titleAccess:v,viewBox:b="0 0 24 24"}=n,d=he(n,Bf),h=N.isValidElement(o)&&o.type==="svg",f=P({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:b,hasSvgAsChild:h}),g={};m||(g.viewBox=b);const w=Lf(f);return i.jsxs(Ff,P({as:c,className:Ce(w.root,a),focusable:"false",color:u,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},g,d,h&&o.props,{ownerState:f,children:[h?o.props.children:o,v?i.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(ta.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});ta.muiName="SvgIcon";const ss=ta;function Gi(e,t){function r(n,o){return i.jsx(ss,P({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=ss.muiName,N.memo(N.forwardRef(r))}const Vf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Mi.configure(e)}},zf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:rt,createChainedFunction:yo,createSvgIcon:Gi,debounce:Si,deprecatedPropType:bd,isMuiElement:vd,ownerDocument:Oe,ownerWindow:nr,requirePropFactory:yd,setRef:bn,unstable_ClassNameGenerator:Vf,unstable_useEnhancedEffect:Lt,unstable_useId:Ci,unsupportedProp:kd,useControlled:ji,useEventCallback:Br,useForkRef:Xe,useIsFocusVisible:Oi},Symbol.toStringTag,{value:"Module"})),Gf=Kp(zf);var is;function Uf(){return is||(is=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Gf}(Kn)),Kn}var Hf=Yp;Object.defineProperty(Uo,"__esModule",{value:!0});var Ui=Uo.default=void 0,qf=Hf(Uf()),Wf=i;Ui=Uo.default=(0,qf.default)((0,Wf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Hi(e){return typeof e=="string"}function jr(e,t,r){return e===void 0||Hi(e)?t:P({},t,{ownerState:P({},t.ownerState,r)})}const Xf={disableDefaultClasses:!1},Kf=N.createContext(Xf);function Yf(e){const{disableDefaultClasses:t}=N.useContext(Kf);return r=>t?"":e(r)}function qi(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function Jf(e,t,r){return typeof e=="function"?e(t,r):e}function ls(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function Zf(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),f=P({},r,o,n);return d.length>0&&(f.className=d),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:void 0}}const s=qi(P({},o,n)),c=ls(n),p=ls(o),u=t(s),m=Ce(u==null?void 0:u.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=P({},u==null?void 0:u.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),b=P({},u,r,p,c);return m.length>0&&(b.className=m),Object.keys(v).length>0&&(b.style=v),{props:b,internalRef:u.ref}}const Qf=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Vt(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=he(e,Qf),c=a?{}:Jf(n,o),{props:p,internalRef:u}=Zf(P({},s,{externalSlotProps:c})),m=Xe(u,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return jr(r,P({},p,{ref:m}),o)}const Wi="base";function em(e){return`${Wi}--${e}`}function tm(e,t){return`${Wi}-${e}-${t}`}function Xi(e,t){const r=Di[t];return r?em(r):tm(e,t)}function rm(e,t){const r={};return t.forEach(n=>{r[n]=Xi(e,n)}),r}const nm=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function om(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function am(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function sm(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||am(e))}function im(e){const t=[],r=[];return Array.from(e.querySelectorAll(nm)).forEach((n,o)=>{const a=om(n);a===-1||!sm(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function lm(){return!0}function wn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=im,isEnabled:s=lm,open:c}=e,p=N.useRef(!1),u=N.useRef(null),m=N.useRef(null),v=N.useRef(null),b=N.useRef(null),d=N.useRef(!1),h=N.useRef(null),f=Xe(t.ref,h),g=N.useRef(null);N.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),N.useEffect(()=>{if(!c||!h.current)return;const x=Oe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),N.useEffect(()=>{if(!c||!h.current)return;const x=Oe(h.current),k=C=>{g.current=C,!(n||!s()||C.key!=="Tab")&&x.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!x.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(x.activeElement)||n&&x.activeElement!==u.current&&x.activeElement!==m.current)return;if(x.activeElement!==b.current)b.current=null;else if(b.current!==null)return;if(!d.current)return;let I=[];if((x.activeElement===u.current||x.activeElement===m.current)&&(I=a(h.current)),I.length>0){var R,_;const T=!!((R=g.current)!=null&&R.shiftKey&&((_=g.current)==null?void 0:_.key)==="Tab"),M=I[0],A=I[I.length-1];typeof M!="string"&&typeof A!="string"&&(T?A.focus():M.focus())}else C.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",k,!0);const S=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),x.removeEventListener("focusin",y),x.removeEventListener("keydown",k,!0)}},[r,n,o,s,c,a]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),d.current=!0,b.current=x.target;const k=t.props.onFocus;k&&k(x)},O=x=>{v.current===null&&(v.current=x.relatedTarget),d.current=!0};return i.jsxs(N.Fragment,{children:[i.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:u,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:f,onFocus:w}),i.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(wn.propTypes={children:Xr,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(wn["propTypes"]=Ni(wn.propTypes));function cm(e){return typeof e=="function"?e():e}const Fr=N.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=N.useState(null),p=Xe(N.isValidElement(n)?n.ref:null,r);if(Lt(()=>{a||c(cm(o)||document.body)},[o,a]),Lt(()=>{if(s&&!a)return bn(r,s),()=>{bn(r,null)}},[r,s,a]),a){if(N.isValidElement(n)){const u={ref:p};return N.cloneElement(n,u)}return i.jsx(N.Fragment,{children:n})}return i.jsx(N.Fragment,{children:s&&$c.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Fr.propTypes={children:l.node,container:l.oneOfType([dt,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(Fr["propTypes"]=Ni(Fr.propTypes));function pm(e){const t=Oe(e);return t.body===e?nr(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Ir(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function cs(e){return parseInt(nr(e).getComputedStyle(e).paddingRight,10)||0}function dm(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function ps(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!dm(s);c&&p&&Ir(s,o)})}function oo(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function um(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(pm(n)){const s=Ri(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${cs(n)+s}px`;const c=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${cs(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,c=nr(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function fm(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class mm{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Ir(t.modalRef,!1);const o=fm(r);ps(r,t.mount,t.modalRef,o,!0);const a=oo(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=oo(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=um(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=oo(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&Ir(t.modalRef,r),ps(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&Ir(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function hm(e){return typeof e=="function"?e():e}function gm(e){return e?e.props.hasOwnProperty("in"):!1}const bm=new mm;function vm(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=bm,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:u,open:m,rootRef:v}=e,b=N.useRef({}),d=N.useRef(null),h=N.useRef(null),f=Xe(h,v),[g,w]=N.useState(!m),O=gm(p);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const k=()=>Oe(d.current),y=()=>(b.current.modalRef=h.current,b.current.mount=d.current,b.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Br(()=>{const B=hm(t)||k().body;o.add(y(),B),h.current&&S()}),I=N.useCallback(()=>o.isTopModal(y()),[o]),R=Br(B=>{d.current=B,B&&(m&&I()?S():h.current&&Ir(h.current,x))}),_=N.useCallback(()=>{o.remove(y(),x)},[x,o]);N.useEffect(()=>()=>{_()},[_]),N.useEffect(()=>{m?C():(!O||!a)&&_()},[m,_,O,a,C]);const T=B=>H=>{var ee;(ee=B.onKeyDown)==null||ee.call(B,H),!(H.key!=="Escape"||H.which===229||!I())&&(r||(H.stopPropagation(),u&&u(H,"escapeKeyDown")))},M=B=>H=>{var ee;(ee=B.onClick)==null||ee.call(B,H),H.target===H.currentTarget&&u&&u(H,"backdropClick")};return{getRootProps:(B={})=>{const H=qi(e);delete H.onTransitionEnter,delete H.onTransitionExited;const ee=P({},H,B);return P({role:"presentation"},ee,{onKeyDown:T(ee),ref:f})},getBackdropProps:(B={})=>{const H=B;return P({"aria-hidden":!0},H,{onClick:M(H),open:m})},getTransitionProps:()=>{const B=()=>{w(!1),s&&s()},H=()=>{w(!0),c&&c(),a&&_()};return{onEnter:yo(B,p==null?void 0:p.props.onEnter),onExited:yo(H,p==null?void 0:p.props.onExited)}},rootRef:f,portalRef:R,isTopModal:I,exited:g,hasTransition:O}}var Me="top",Ke="bottom",Ye="right",De="left",ra="auto",Zr=[Me,Ke,Ye,De],or="start",Vr="end",ym="clippingParents",Ki="viewport",xr="popper",wm="reference",ds=Zr.reduce(function(e,t){return e.concat([t+"-"+or,t+"-"+Vr])},[]),Yi=[].concat(Zr,[ra]).reduce(function(e,t){return e.concat([t,t+"-"+or,t+"-"+Vr])},[]),xm="beforeRead",km="read",Em="afterRead",Nm="beforeMain",Tm="main",Sm="afterMain",Cm="beforeWrite",jm="write",Om="afterWrite",Rm=[xm,km,Em,Nm,Tm,Sm,Cm,jm,Om];function nt(e){return e?(e.nodeName||"").toLowerCase():null}function Ge(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function zt(e){var t=Ge(e).Element;return e instanceof t||e instanceof Element}function We(e){var t=Ge(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function na(e){if(typeof ShadowRoot>"u")return!1;var t=Ge(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Pm(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!We(a)||!nt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function _m(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,u){return p[u]="",p},{});!We(o)||!nt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const Im={name:"applyStyles",enabled:!0,phase:"write",fn:Pm,effect:_m,requires:["computeStyles"]};function et(e){return e.split("-")[0]}var $t=Math.max,xn=Math.min,ar=Math.round;function ko(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ji(){return!/^((?!chrome|android).)*safari/i.test(ko())}function sr(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&We(e)&&(o=e.offsetWidth>0&&ar(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&ar(n.height)/e.offsetHeight||1);var s=zt(e)?Ge(e):window,c=s.visualViewport,p=!Ji()&&r,u=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,b=n.height/a;return{width:v,height:b,top:m,right:u+v,bottom:m+b,left:u,x:u,y:m}}function oa(e){var t=sr(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Zi(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&na(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ft(e){return Ge(e).getComputedStyle(e)}function $m(e){return["table","td","th"].indexOf(nt(e))>=0}function Nt(e){return((zt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Fn(e){return nt(e)==="html"?e:e.assignedSlot||e.parentNode||(na(e)?e.host:null)||Nt(e)}function us(e){return!We(e)||ft(e).position==="fixed"?null:e.offsetParent}function Mm(e){var t=/firefox/i.test(ko()),r=/Trident/i.test(ko());if(r&&We(e)){var n=ft(e);if(n.position==="fixed")return null}var o=Fn(e);for(na(o)&&(o=o.host);We(o)&&["html","body"].indexOf(nt(o))<0;){var a=ft(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Qr(e){for(var t=Ge(e),r=us(e);r&&$m(r)&&ft(r).position==="static";)r=us(r);return r&&(nt(r)==="html"||nt(r)==="body"&&ft(r).position==="static")?t:r||Mm(e)||t}function aa(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function $r(e,t,r){return $t(e,xn(t,r))}function Dm(e,t,r){var n=$r(e,t,r);return n>r?r:n}function Qi(){return{top:0,right:0,bottom:0,left:0}}function el(e){return Object.assign({},Qi(),e)}function tl(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Am=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,el(typeof t!="number"?t:tl(t,Zr))};function Bm(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=et(r.placement),p=aa(c),u=[De,Ye].indexOf(c)>=0,m=u?"height":"width";if(!(!a||!s)){var v=Am(o.padding,r),b=oa(a),d=p==="y"?Me:De,h=p==="y"?Ke:Ye,f=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],g=s[p]-r.rects.reference[p],w=Qr(a),O=w?p==="y"?w.clientHeight||0:w.clientWidth||0:0,x=f/2-g/2,k=v[d],y=O-b[m]-v[h],S=O/2-b[m]/2+x,C=$r(k,S,y),I=p;r.modifiersData[n]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function Lm(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Zi(t.elements.popper,o)&&(t.elements.arrow=o))}const Fm={name:"arrow",enabled:!0,phase:"main",fn:Bm,effect:Lm,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ir(e){return e.split("-")[1]}var Vm={top:"auto",right:"auto",bottom:"auto",left:"auto"};function zm(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:ar(r*o)/o||0,y:ar(n*o)/o||0}}function fs(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,m=e.roundOffsets,v=e.isFixed,b=s.x,d=b===void 0?0:b,h=s.y,f=h===void 0?0:h,g=typeof m=="function"?m({x:d,y:f}):{x:d,y:f};d=g.x,f=g.y;var w=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),x=De,k=Me,y=window;if(u){var S=Qr(r),C="clientHeight",I="clientWidth";if(S===Ge(r)&&(S=Nt(r),ft(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===Me||(o===De||o===Ye)&&a===Vr){k=Ke;var R=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];f-=R-n.height,f*=p?1:-1}if(o===De||(o===Me||o===Ke)&&a===Vr){x=Ye;var _=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];d-=_-n.width,d*=p?1:-1}}var T=Object.assign({position:c},u&&Vm),M=m===!0?zm({x:d,y:f},Ge(r)):{x:d,y:f};if(d=M.x,f=M.y,p){var A;return Object.assign({},T,(A={},A[k]=O?"0":"",A[x]=w?"0":"",A.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+f+"px)":"translate3d("+d+"px, "+f+"px, 0)",A))}return Object.assign({},T,(t={},t[k]=O?f+"px":"",t[x]=w?d+"px":"",t.transform="",t))}function Gm(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,u={placement:et(t.placement),variation:ir(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,fs(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,fs(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Um={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Gm,data:{}};var sn={passive:!0};function Hm(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=Ge(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach(function(m){m.addEventListener("scroll",r.update,sn)}),c&&p.addEventListener("resize",r.update,sn),function(){a&&u.forEach(function(m){m.removeEventListener("scroll",r.update,sn)}),c&&p.removeEventListener("resize",r.update,sn)}}const qm={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Hm,data:{}};var Wm={left:"right",right:"left",bottom:"top",top:"bottom"};function un(e){return e.replace(/left|right|bottom|top/g,function(t){return Wm[t]})}var Xm={start:"end",end:"start"};function ms(e){return e.replace(/start|end/g,function(t){return Xm[t]})}function sa(e){var t=Ge(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function ia(e){return sr(Nt(e)).left+sa(e).scrollLeft}function Km(e,t){var r=Ge(e),n=Nt(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var u=Ji();(u||!u&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+ia(e),y:p}}function Ym(e){var t,r=Nt(e),n=sa(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=$t(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=$t(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+ia(e),p=-n.scrollTop;return ft(o||r).direction==="rtl"&&(c+=$t(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function la(e){var t=ft(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function rl(e){return["html","body","#document"].indexOf(nt(e))>=0?e.ownerDocument.body:We(e)&&la(e)?e:rl(Fn(e))}function Mr(e,t){var r;t===void 0&&(t=[]);var n=rl(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=Ge(n),s=o?[a].concat(a.visualViewport||[],la(n)?n:[]):n,c=t.concat(s);return o?c:c.concat(Mr(Fn(s)))}function Eo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Jm(e,t){var r=sr(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function hs(e,t,r){return t===Ki?Eo(Km(e,r)):zt(t)?Jm(t,r):Eo(Ym(Nt(e)))}function Zm(e){var t=Mr(Fn(e)),r=["absolute","fixed"].indexOf(ft(e).position)>=0,n=r&&We(e)?Qr(e):e;return zt(n)?t.filter(function(o){return zt(o)&&Zi(o,n)&&nt(o)!=="body"}):[]}function Qm(e,t,r,n){var o=t==="clippingParents"?Zm(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,u){var m=hs(e,u,n);return p.top=$t(m.top,p.top),p.right=xn(m.right,p.right),p.bottom=xn(m.bottom,p.bottom),p.left=$t(m.left,p.left),p},hs(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function nl(e){var t=e.reference,r=e.element,n=e.placement,o=n?et(n):null,a=n?ir(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case Me:p={x:s,y:t.y-r.height};break;case Ke:p={x:s,y:t.y+t.height};break;case Ye:p={x:t.x+t.width,y:c};break;case De:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var u=o?aa(o):null;if(u!=null){var m=u==="y"?"height":"width";switch(a){case or:p[u]=p[u]-(t[m]/2-r[m]/2);break;case Vr:p[u]=p[u]+(t[m]/2-r[m]/2);break}}return p}function zr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?ym:c,u=r.rootBoundary,m=u===void 0?Ki:u,v=r.elementContext,b=v===void 0?xr:v,d=r.altBoundary,h=d===void 0?!1:d,f=r.padding,g=f===void 0?0:f,w=el(typeof g!="number"?g:tl(g,Zr)),O=b===xr?wm:xr,x=e.rects.popper,k=e.elements[h?O:b],y=Qm(zt(k)?k:k.contextElement||Nt(e.elements.popper),p,m,s),S=sr(e.elements.reference),C=nl({reference:S,element:x,strategy:"absolute",placement:o}),I=Eo(Object.assign({},x,C)),R=b===xr?I:S,_={top:y.top-R.top+w.top,bottom:R.bottom-y.bottom+w.bottom,left:y.left-R.left+w.left,right:R.right-y.right+w.right},T=e.modifiersData.offset;if(b===xr&&T){var M=T[o];Object.keys(_).forEach(function(A){var z=[Ye,Ke].indexOf(A)>=0?1:-1,U=[Me,Ke].indexOf(A)>=0?"y":"x";_[A]+=M[U]*z})}return _}function eh(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,u=p===void 0?Yi:p,m=ir(n),v=m?c?ds:ds.filter(function(h){return ir(h)===m}):Zr,b=v.filter(function(h){return u.indexOf(h)>=0});b.length===0&&(b=v);var d=b.reduce(function(h,f){return h[f]=zr(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[et(f)],h},{});return Object.keys(d).sort(function(h,f){return d[h]-d[f]})}function th(e){if(et(e)===ra)return[];var t=un(e);return[ms(e),t,ms(t)]}function rh(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,u=r.padding,m=r.boundary,v=r.rootBoundary,b=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,f=r.allowedAutoPlacements,g=t.options.placement,w=et(g),O=w===g,x=p||(O||!h?[un(g)]:th(g)),k=[g].concat(x).reduce(function(G,K){return G.concat(et(K)===ra?eh(t,{placement:K,boundary:m,rootBoundary:v,padding:u,flipVariations:h,allowedAutoPlacements:f}):K)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,R=k[0],_=0;_<k.length;_++){var T=k[_],M=et(T),A=ir(T)===or,z=[Me,Ke].indexOf(M)>=0,U=z?"width":"height",B=zr(t,{placement:T,boundary:m,rootBoundary:v,altBoundary:b,padding:u}),H=z?A?Ye:De:A?Ke:Me;y[U]>S[U]&&(H=un(H));var ee=un(H),V=[];if(a&&V.push(B[M]<=0),c&&V.push(B[H]<=0,B[ee]<=0),V.every(function(G){return G})){R=T,I=!1;break}C.set(T,V)}if(I)for(var j=h?3:1,L=function(K){var X=k.find(function(J){var Y=C.get(J);if(Y)return Y.slice(0,K).every(function(Z){return Z})});if(X)return R=X,"break"},q=j;q>0;q--){var W=L(q);if(W==="break")break}t.placement!==R&&(t.modifiersData[n]._skip=!0,t.placement=R,t.reset=!0)}}const nh={name:"flip",enabled:!0,phase:"main",fn:rh,requiresIfExists:["offset"],data:{_skip:!1}};function gs(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function bs(e){return[Me,Ye,Ke,De].some(function(t){return e[t]>=0})}function oh(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=zr(t,{elementContext:"reference"}),c=zr(t,{altBoundary:!0}),p=gs(s,n),u=gs(c,o,a),m=bs(p),v=bs(u);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:u,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const ah={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:oh};function sh(e,t,r){var n=et(e),o=[De,Me].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[De,Ye].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function ih(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=Yi.reduce(function(m,v){return m[v]=sh(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,u=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=u),t.modifiersData[n]=s}const lh={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:ih};function ch(e){var t=e.state,r=e.name;t.modifiersData[r]=nl({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ph={name:"popperOffsets",enabled:!0,phase:"read",fn:ch,data:{}};function dh(e){return e==="x"?"y":"x"}function uh(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,u=r.rootBoundary,m=r.altBoundary,v=r.padding,b=r.tether,d=b===void 0?!0:b,h=r.tetherOffset,f=h===void 0?0:h,g=zr(t,{boundary:p,rootBoundary:u,padding:v,altBoundary:m}),w=et(t.placement),O=ir(t.placement),x=!O,k=aa(w),y=dh(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,R=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,_=typeof R=="number"?{mainAxis:R,altAxis:R}:Object.assign({mainAxis:0,altAxis:0},R),T=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,M={x:0,y:0};if(S){if(a){var A,z=k==="y"?Me:De,U=k==="y"?Ke:Ye,B=k==="y"?"height":"width",H=S[k],ee=H+g[z],V=H-g[U],j=d?-I[B]/2:0,L=O===or?C[B]:I[B],q=O===or?-I[B]:-C[B],W=t.elements.arrow,G=d&&W?oa(W):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Qi(),X=K[z],J=K[U],Y=$r(0,C[B],G[B]),Z=x?C[B]/2-j-Y-X-_.mainAxis:L-Y-X-_.mainAxis,Q=x?-C[B]/2+j+Y+J+_.mainAxis:q+Y+J+_.mainAxis,ie=t.elements.arrow&&Qr(t.elements.arrow),F=ie?k==="y"?ie.clientTop||0:ie.clientLeft||0:0,te=(A=T==null?void 0:T[k])!=null?A:0,D=H+Z-te-F,le=H+Q-te,Ne=$r(d?xn(ee,D):ee,H,d?$t(V,le):V);S[k]=Ne,M[k]=Ne-H}if(c){var _e,xe=k==="x"?Me:De,Tt=k==="x"?Ke:Ye,Ie=S[y],at=y==="y"?"height":"width",Le=Ie+g[xe],st=Ie-g[Tt],Te=[Me,De].indexOf(w)!==-1,Gt=(_e=T==null?void 0:T[y])!=null?_e:0,St=Te?Le:Ie-C[at]-I[at]-Gt+_.altAxis,fr=Te?Ie+C[at]+I[at]-Gt-_.altAxis:st,tn=d&&Te?Dm(St,Ie,fr):$r(d?St:Le,Ie,d?fr:st);S[y]=tn,M[y]=tn-Ie}t.modifiersData[n]=M}}const fh={name:"preventOverflow",enabled:!0,phase:"main",fn:uh,requiresIfExists:["offset"]};function mh(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function hh(e){return e===Ge(e)||!We(e)?sa(e):mh(e)}function gh(e){var t=e.getBoundingClientRect(),r=ar(t.width)/e.offsetWidth||1,n=ar(t.height)/e.offsetHeight||1;return r!==1||n!==1}function bh(e,t,r){r===void 0&&(r=!1);var n=We(t),o=We(t)&&gh(t),a=Nt(t),s=sr(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((nt(t)!=="body"||la(a))&&(c=hh(t)),We(t)?(p=sr(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=ia(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function vh(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function yh(e){var t=vh(e);return Rm.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function wh(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function xh(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var vs={placement:"bottom",modifiers:[],strategy:"absolute"};function ys(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function kh(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?vs:o;return function(c,p,u){u===void 0&&(u=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},vs,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],b=!1,d={state:m,setOptions:function(w){var O=typeof w=="function"?w(m.options):w;f(),m.options=Object.assign({},a,m.options,O),m.scrollParents={reference:zt(c)?Mr(c):c.contextElement?Mr(c.contextElement):[],popper:Mr(p)};var x=yh(xh([].concat(n,m.options.modifiers)));return m.orderedModifiers=x.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!b){var w=m.elements,O=w.reference,x=w.popper;if(ys(O,x)){m.rects={reference:bh(O,Qr(x),m.options.strategy==="fixed"),popper:oa(x)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(_){return m.modifiersData[_.name]=Object.assign({},_.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,I=C===void 0?{}:C,R=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:R,instance:d})||m)}}}},update:wh(function(){return new Promise(function(g){d.forceUpdate(),g(m)})}),destroy:function(){f(),b=!0}};if(!ys(c,p))return d;d.setOptions(u).then(function(g){!b&&u.onFirstUpdate&&u.onFirstUpdate(g)});function h(){m.orderedModifiers.forEach(function(g){var w=g.name,O=g.options,x=O===void 0?{}:O,k=g.effect;if(typeof k=="function"){var y=k({state:m,name:w,instance:d,options:x}),S=function(){};v.push(y||S)}})}function f(){v.forEach(function(g){return g()}),v=[]}return d}}var Eh=[qm,ph,Um,Im,lh,nh,fh,Fm,ah],Nh=kh({defaultModifiers:Eh});const ol="Popper";function Th(e){return Xi(ol,e)}rm(ol,["root"]);const Sh=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Ch=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function jh(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function kn(e){return typeof e=="function"?e():e}function Vn(e){return e.nodeType!==void 0}function Oh(e){return!Vn(e)}const Rh=()=>mt({root:["root"]},Yf(Th)),Ph={},_h=N.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:u,placement:m,popperOptions:v,popperRef:b,slotProps:d={},slots:h={},TransitionProps:f}=t,g=he(t,Sh),w=N.useRef(null),O=Xe(w,r),x=N.useRef(null),k=Xe(x,b),y=N.useRef(k);Lt(()=>{y.current=k},[k]),N.useImperativeHandle(b,()=>x.current,[]);const S=jh(m,s),[C,I]=N.useState(S),[R,_]=N.useState(kn(o));N.useEffect(()=>{x.current&&x.current.forceUpdate()}),N.useEffect(()=>{o&&_(kn(o))},[o]),Lt(()=>{if(!R||!u)return;const U=ee=>{I(ee.placement)};if(process.env.NODE_ENV!=="production"&&R&&Vn(R)&&R.nodeType===1){const ee=R.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let B=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{U(ee)}}];p!=null&&(B=B.concat(p)),v&&v.modifiers!=null&&(B=B.concat(v.modifiers));const H=Nh(R,w.current,P({placement:S},v,{modifiers:B}));return y.current(H),()=>{H.destroy(),y.current(null)}},[R,c,p,u,v,S]);const T={placement:C};f!==null&&(T.TransitionProps=f);const M=Rh(),A=(n=h.root)!=null?n:"div",z=Vt({elementType:A,externalSlotProps:d.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:O},ownerState:t,className:M.root});return i.jsx(A,P({},z,{children:typeof a=="function"?a(T):a}))}),al=N.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:u,open:m,placement:v="bottom",popperOptions:b=Ph,popperRef:d,style:h,transition:f=!1,slotProps:g={},slots:w={}}=t,O=he(t,Ch),[x,k]=N.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!f||x))return null;let C;if(a)C=a;else if(n){const _=kn(n);C=_&&Vn(_)?Oe(_).body:Oe(null).body}const I=!m&&p&&(!f||x)?"none":void 0,R=f?{in:m,onEnter:y,onExited:S}:void 0;return i.jsx(Fr,{disablePortal:c,container:C,children:i.jsx(_h,P({anchorEl:n,direction:s,disablePortal:c,modifiers:u,ref:r,open:f?!x:m,placement:v,popperOptions:b,popperRef:d,slotProps:g,slots:w},O,{style:P({position:"fixed",top:0,left:0,display:I},h),TransitionProps:R,children:o}))})});process.env.NODE_ENV!=="production"&&(al.propTypes={anchorEl:dr(l.oneOfType([dt,l.object,l.func]),e=>{if(e.open){const t=kn(e.anchorEl);if(t&&Vn(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Oh(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([dt,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:qo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});function en(){const e=Vi(Qo);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[ea]||e}function No(e,t){return No=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},No(e,t)}function Ih(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,No(e,t)}const ws={disabled:!1};var $h=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const sl=E.createContext(null);var Mh=function(t){return t.scrollTop},Or="unmounted",Ot="exited",Rt="entering",Jt="entered",To="exiting",gt=function(e){Ih(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=Ot,a.appearStatus=Rt):p=Jt:n.unmountOnExit||n.mountOnEnter?p=Or:p=Ot,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Or?{status:Ot}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Rt&&s!==Jt&&(a=Rt):(s===Rt||s===Jt)&&(a=To)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Rt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Tr.findDOMNode(this);s&&Mh(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ot&&this.setState({status:Or})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[Tr.findDOMNode(this),c],u=p[0],m=p[1],v=this.getTimeouts(),b=c?v.appear:v.enter;if(!o&&!s||ws.disabled){this.safeSetState({status:Jt},function(){a.props.onEntered(u)});return}this.props.onEnter(u,m),this.safeSetState({status:Rt},function(){a.props.onEntering(u,m),a.onTransitionEnd(b,function(){a.safeSetState({status:Jt},function(){a.props.onEntered(u,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:Tr.findDOMNode(this);if(!a||ws.disabled){this.safeSetState({status:Ot},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:To},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Ot},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:Tr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=p[0],m=p[1];this.props.addEndListener(u,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===Or)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=he(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(sl.Provider,{value:null},typeof s=="function"?s(o,c):E.cloneElement(E.Children.only(s),c))},t}(E.Component);gt.contextType=sl;gt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,r,n,o,a){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var r=$h;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function Kt(){}gt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Kt,onEntering:Kt,onEntered:Kt,onExit:Kt,onExiting:Kt,onExited:Kt};gt.UNMOUNTED=Or;gt.EXITED=Ot;gt.ENTERING=Rt;gt.ENTERED=Jt;gt.EXITING=To;const il=gt,ll=e=>e.scrollTop;function En(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Dh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function So(e){return`scale(${e}, ${e**2})`}const Ah={entering:{opacity:1,transform:So(1)},entered:{opacity:1,transform:"none"}},ao=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),ca=N.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:u,onEntering:m,onExit:v,onExited:b,onExiting:d,style:h,timeout:f="auto",TransitionComponent:g=il}=t,w=he(t,Dh),O=Cr(),x=N.useRef(),k=en(),y=N.useRef(null),S=Xe(y,a.ref,r),C=U=>B=>{if(U){const H=y.current;B===void 0?U(H):U(H,B)}},I=C(m),R=C((U,B)=>{ll(U);const{duration:H,delay:ee,easing:V}=En({style:h,timeout:f,easing:s},{mode:"enter"});let j;f==="auto"?(j=k.transitions.getAutoHeightDuration(U.clientHeight),x.current=j):j=H,U.style.transition=[k.transitions.create("opacity",{duration:j,delay:ee}),k.transitions.create("transform",{duration:ao?j:j*.666,delay:ee,easing:V})].join(","),p&&p(U,B)}),_=C(u),T=C(d),M=C(U=>{const{duration:B,delay:H,easing:ee}=En({style:h,timeout:f,easing:s},{mode:"exit"});let V;f==="auto"?(V=k.transitions.getAutoHeightDuration(U.clientHeight),x.current=V):V=B,U.style.transition=[k.transitions.create("opacity",{duration:V,delay:H}),k.transitions.create("transform",{duration:ao?V:V*.666,delay:ao?H:H||V*.333,easing:ee})].join(","),U.style.opacity=0,U.style.transform=So(.75),v&&v(U)}),A=C(b),z=U=>{f==="auto"&&O.start(x.current||0,U),n&&n(y.current,U)};return i.jsx(g,P({appear:o,in:c,nodeRef:y,onEnter:R,onEntered:_,onEntering:I,onExit:M,onExited:A,onExiting:T,addEndListener:z,timeout:f==="auto"?null:f},w,{children:(U,B)=>N.cloneElement(a,P({style:P({opacity:0,transform:So(.75),visibility:U==="exited"&&!c?"hidden":void 0},Ah[U],h,a.props.style),ref:S},B))}))});process.env.NODE_ENV!=="production"&&(ca.propTypes={addEndListener:l.func,appear:l.bool,children:Xr.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});ca.muiSupportAuto=!0;const Co=ca,Bh=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},xs=Bh,Lh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Fh=Pe(al,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),cl=N.forwardRef(function(t,r){var n;const o=Fi(),a=ht({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:u,container:m,disablePortal:v,keepMounted:b,modifiers:d,open:h,placement:f,popperOptions:g,popperRef:w,transition:O,slots:x,slotProps:k}=a,y=he(a,Lh),S=(n=x==null?void 0:x.root)!=null?n:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:b,modifiers:d,open:h,placement:f,popperOptions:g,popperRef:w,transition:O},y);return i.jsx(Fh,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??u},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(cl.propTypes={anchorEl:l.oneOfType([dt,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([dt,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:qo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const pl=cl;function Vh(e){return ot("MuiTooltip",e)}const zh=kt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),xt=zh,Gh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Uh(e){return Math.round(e*1e5)/1e5}const Hh=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${rt(a.split("-")[0])}`],arrow:["arrow"]};return mt(s,Vh,t)},qh=Pe(pl,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${xt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${xt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${xt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${xt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Wh=Pe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${rt(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:yn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Uh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${xt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${xt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${xt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${xt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Xh=Pe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:yn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let ln=!1;const ks=new Kr;let kr={x:0,y:0};function cn(e,t){return r=>{t&&t(r),e(r)}}const dl=N.forwardRef(function(t,r){var n,o,a,s,c,p,u,m,v,b,d,h,f,g,w,O,x,k,y;const S=ht({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:R={},componentsProps:_={},describeChild:T=!1,disableFocusListener:M=!1,disableHoverListener:A=!1,disableInteractive:z=!1,disableTouchListener:U=!1,enterDelay:B=100,enterNextDelay:H=0,enterTouchDelay:ee=700,followCursor:V=!1,id:j,leaveDelay:L=0,leaveTouchDelay:q=1500,onClose:W,onOpen:G,open:K,placement:X="bottom",PopperComponent:J,PopperProps:Y={},slotProps:Z={},slots:Q={},title:ie,TransitionComponent:F=Co,TransitionProps:te}=S,D=he(S,Gh),le=N.isValidElement(I)?I:i.jsx("span",{children:I}),Ne=en(),_e=Ne.direction==="rtl",[xe,Tt]=N.useState(),[Ie,at]=N.useState(null),Le=N.useRef(!1),st=z||V,Te=Cr(),Gt=Cr(),St=Cr(),fr=Cr(),[tn,ma]=ji({controlled:K,default:!1,name:"Tooltip",state:"open"});let it=tn;if(process.env.NODE_ENV!=="production"){const{current:ne}=N.useRef(K!==void 0);N.useEffect(()=>{xe&&xe.disabled&&!ne&&ie!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,xe,ne])}const zn=Ci(j),mr=N.useRef(),rn=Br(()=>{mr.current!==void 0&&(document.body.style.WebkitUserSelect=mr.current,mr.current=void 0),fr.clear()});N.useEffect(()=>rn,[rn]);const ha=ne=>{ks.clear(),ln=!0,ma(!0),G&&!it&&G(ne)},nn=Br(ne=>{ks.start(800+L,()=>{ln=!1}),ma(!1),W&&it&&W(ne),Te.start(Ne.transitions.duration.shortest,()=>{Le.current=!1})}),Gn=ne=>{Le.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Gt.clear(),St.clear(),B||ln&&H?Gt.start(ln?H:B,()=>{ha(ne)}):ha(ne))},ga=ne=>{Gt.clear(),St.start(L,()=>{nn(ne)})},{isFocusVisibleRef:ba,onBlur:lc,onFocus:cc,ref:pc}=Oi(),[,va]=N.useState(!1),ya=ne=>{lc(ne),ba.current===!1&&(va(!1),ga(ne))},wa=ne=>{xe||Tt(ne.currentTarget),cc(ne),ba.current===!0&&(va(!0),Gn(ne))},xa=ne=>{Le.current=!0;const Fe=le.props;Fe.onTouchStart&&Fe.onTouchStart(ne)},ka=Gn,Ea=ga,dc=ne=>{xa(ne),St.clear(),Te.clear(),rn(),mr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",fr.start(ee,()=>{document.body.style.WebkitUserSelect=mr.current,Gn(ne)})},uc=ne=>{le.props.onTouchEnd&&le.props.onTouchEnd(ne),rn(),St.start(q,()=>{nn(ne)})};N.useEffect(()=>{if(!it)return;function ne(Fe){(Fe.key==="Escape"||Fe.key==="Esc")&&nn(Fe)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[nn,it]);const fc=Xe(le.ref,pc,Tt,r);!ie&&ie!==0&&(it=!1);const Un=N.useRef(),mc=ne=>{const Fe=le.props;Fe.onMouseMove&&Fe.onMouseMove(ne),kr={x:ne.clientX,y:ne.clientY},Un.current&&Un.current.update()},hr={},Hn=typeof ie=="string";T?(hr.title=!it&&Hn&&!A?ie:null,hr["aria-describedby"]=it?zn:null):(hr["aria-label"]=Hn?ie:null,hr["aria-labelledby"]=it&&!Hn?zn:null);const Ue=P({},hr,D,le.props,{className:Ce(D.className,le.props.className),onTouchStart:xa,ref:fc},V?{onMouseMove:mc}:{});process.env.NODE_ENV!=="production"&&(Ue["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const gr={};U||(Ue.onTouchStart=dc,Ue.onTouchEnd=uc),A||(Ue.onMouseOver=cn(ka,Ue.onMouseOver),Ue.onMouseLeave=cn(Ea,Ue.onMouseLeave),st||(gr.onMouseOver=ka,gr.onMouseLeave=Ea)),M||(Ue.onFocus=cn(wa,Ue.onFocus),Ue.onBlur=cn(ya,Ue.onBlur),st||(gr.onFocus=wa,gr.onBlur=ya)),process.env.NODE_ENV!=="production"&&le.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));const hc=N.useMemo(()=>{var ne;let Fe=[{name:"arrow",enabled:!!Ie,options:{element:Ie,padding:4}}];return(ne=Y.popperOptions)!=null&&ne.modifiers&&(Fe=Fe.concat(Y.popperOptions.modifiers)),P({},Y.popperOptions,{modifiers:Fe})},[Ie,Y]),br=P({},S,{isRtl:_e,arrow:C,disableInteractive:st,placement:X,PopperComponentProp:J,touch:Le.current}),qn=Hh(br),Na=(n=(o=Q.popper)!=null?o:R.Popper)!=null?n:qh,Ta=(a=(s=(c=Q.transition)!=null?c:R.Transition)!=null?s:F)!=null?a:Co,Sa=(p=(u=Q.tooltip)!=null?u:R.Tooltip)!=null?p:Wh,Ca=(m=(v=Q.arrow)!=null?v:R.Arrow)!=null?m:Xh,gc=jr(Na,P({},Y,(b=Z.popper)!=null?b:_.popper,{className:Ce(qn.popper,Y==null?void 0:Y.className,(d=(h=Z.popper)!=null?h:_.popper)==null?void 0:d.className)}),br),bc=jr(Ta,P({},te,(f=Z.transition)!=null?f:_.transition),br),vc=jr(Sa,P({},(g=Z.tooltip)!=null?g:_.tooltip,{className:Ce(qn.tooltip,(w=(O=Z.tooltip)!=null?O:_.tooltip)==null?void 0:w.className)}),br),yc=jr(Ca,P({},(x=Z.arrow)!=null?x:_.arrow,{className:Ce(qn.arrow,(k=(y=Z.arrow)!=null?y:_.arrow)==null?void 0:k.className)}),br);return i.jsxs(N.Fragment,{children:[N.cloneElement(le,Ue),i.jsx(Na,P({as:J??pl,placement:X,anchorEl:V?{getBoundingClientRect:()=>({top:kr.y,left:kr.x,right:kr.x,bottom:kr.y,width:0,height:0})}:xe,popperRef:Un,open:xe?it:!1,id:zn,transition:!0},gr,gc,{popperOptions:hc,children:({TransitionProps:ne})=>i.jsx(Ta,P({timeout:Ne.transitions.duration.shorter},ne,bc,{children:i.jsxs(Sa,P({},vc,{children:[ie,C?i.jsx(Ca,P({},yc,{ref:at})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(dl.propTypes={arrow:l.bool,children:Xr.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Kh=dl;function Es(e,t,r){return e?i.jsx(Se.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:i.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function pa(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:u=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:b=!1,hasDivider:d=!1,focusVisibleClassName:h,id:f,children:g}=e,w=i.jsx(Se.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:u,dense:m,disableGutters:b,divider:d,focusVisibleClassName:h,onClick:t,id:f,children:r?i.jsxs(i.Fragment,{children:[Es(a,r,!0),i.jsx(Se.ListItemText,{primary:r,inset:!a&&o}),v?i.jsx(Se.ListItemIcon,{className:"papi-menu-icon-trailing",children:i.jsx(Ui,{})}):Es(s,r,!1)]}):g});return n?i.jsx(Kh,{title:n,placement:"right",children:i.jsx("div",{children:w})}):w}function ul(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function Yh(e){const[t,r]=E.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=u=>{r(u.currentTarget)},c=()=>{r(void 0)},p=()=>{let u=ul(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),i.jsx(da,{...e,includedGroups:u})};return i.jsxs(i.Fragment,{children:[i.jsx(pa,{onClick:s,...o,isSubMenuParent:!0}),i.jsx(Se.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const Jh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function da(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=E.useMemo(()=>{const m=o&&o.length>0?o:ul(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,f)=>(h.group.order||0)-(f.group.order||0)),b=[];v.forEach(h=>{Jh(h.id,t.items).forEach(f=>b.push({item:f,isLastItemInGroup:!1})),b.length>0&&(b[b.length-1].isLastItemInGroup=!0)}),b.length>0&&(b[b.length-1].isLastItemInGroup=!1);const d=b.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:b,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return i.jsx("div",{});const u=p.item.group;return i.jsx("div",{role:"menu","aria-label":u,children:a.map((m,v)=>{const{item:b}=m,d=c(m);if("command"in b){const h=b.group+v;return i.jsx(pa,{onClick:f=>{r==null||r(f),n(b)},...d},h)}return i.jsx(Yh,{parentMenuItem:b,parentItemProps:d,...e},u+b.id)})},u)}function Zh(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),i.jsx(da,{...e,includedGroups:a})}function Qh({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return i.jsxs(Se.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[i.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),i.jsx(Se.List,{id:r,dense:!0,className:a??"",children:i.jsx(Zh,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function fl({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=E.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,u=o[p];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?s.set(u.order,{id:p,metadata:u}):console.warn(`Property ${c} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return i.jsx(Se.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>i.jsx(Qh,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const ml=N.createContext({});process.env.NODE_ENV!=="production"&&(ml.displayName="ListContext");const eg=ml;function tg(e){return ot("MuiList",e)}kt("MuiList",["root","padding","dense","subheader"]);const rg=["children","className","component","dense","disablePadding","subheader"],ng=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return mt({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},tg,t)},og=Pe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),hl=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:u}=n,m=he(n,rg),v=N.useMemo(()=>({dense:c}),[c]),b=P({},n,{component:s,dense:c,disablePadding:p}),d=ng(b);return i.jsx(eg.Provider,{value:v,children:i.jsxs(og,P({as:s,className:Ce(d.root,a),ref:r,ownerState:b},m,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(hl.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const ag=hl,sg=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function so(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function Ns(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function gl(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function Er(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!gl(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const bl=N.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:u=!1,onKeyDown:m,variant:v="selectedMenu"}=t,b=he(t,sg),d=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Lt(()=>{o&&d.current.focus()},[o]),N.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(x,k)=>{const y=!d.current.style.width;if(x.clientHeight<d.current.clientHeight&&y){const S=`${Ri(Oe(x))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const f=x=>{const k=d.current,y=x.key,S=Oe(k).activeElement;if(y==="ArrowDown")x.preventDefault(),Er(k,S,u,p,so);else if(y==="ArrowUp")x.preventDefault(),Er(k,S,u,p,Ns);else if(y==="Home")x.preventDefault(),Er(k,null,u,p,so);else if(y==="End")x.preventDefault(),Er(k,null,u,p,Ns);else if(y.length===1){const C=h.current,I=y.toLowerCase(),R=performance.now();C.keys.length>0&&(R-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=R,C.keys.push(I);const _=S&&!C.repeating&&gl(S,C);C.previousKeyMatched&&(_||Er(k,S,!1,p,so,C))?x.preventDefault():C.previousKeyMatched=!1}m&&m(x)},g=Xe(d,r);let w=-1;N.Children.forEach(s,(x,k)=>{if(!N.isValidElement(x)){w===k&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&gn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=k),w===k&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const O=N.Children.map(s,(x,k)=>{if(k===w){const y={};return a&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(x,y)}return x});return i.jsx(ag,P({role:"menu",ref:g,className:c,onKeyDown:f,tabIndex:o?0:-1},b,{children:O}))});process.env.NODE_ENV!=="production"&&(bl.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const ig=bl,lg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],cg={entering:{opacity:1},entered:{opacity:1}},vl=N.forwardRef(function(t,r){const n=en(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:u,onEnter:m,onEntered:v,onEntering:b,onExit:d,onExited:h,onExiting:f,style:g,timeout:w=o,TransitionComponent:O=il}=t,x=he(t,lg),k=N.useRef(null),y=Xe(k,c.ref,r),S=z=>U=>{if(z){const B=k.current;U===void 0?z(B):z(B,U)}},C=S(b),I=S((z,U)=>{ll(z);const B=En({style:g,timeout:w,easing:p},{mode:"enter"});z.style.webkitTransition=n.transitions.create("opacity",B),z.style.transition=n.transitions.create("opacity",B),m&&m(z,U)}),R=S(v),_=S(f),T=S(z=>{const U=En({style:g,timeout:w,easing:p},{mode:"exit"});z.style.webkitTransition=n.transitions.create("opacity",U),z.style.transition=n.transitions.create("opacity",U),d&&d(z)}),M=S(h),A=z=>{a&&a(k.current,z)};return i.jsx(O,P({appear:s,in:u,nodeRef:k,onEnter:I,onEntered:R,onEntering:C,onExit:T,onExited:M,onExiting:_,addEndListener:A,timeout:w},x,{children:(z,U)=>N.cloneElement(c,P({style:P({opacity:0,visibility:z==="exited"&&!u?"hidden":void 0},cg[z],g,c.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(vl.propTypes={addEndListener:l.func,appear:l.bool,children:Xr.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const pg=vl;function dg(e){return ot("MuiBackdrop",e)}kt("MuiBackdrop",["root","invisible"]);const ug=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],fg=e=>{const{classes:t,invisible:r}=e;return mt({root:["root",r&&"invisible"]},dg,t)},mg=Pe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),yl=N.forwardRef(function(t,r){var n,o,a;const s=ht({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:u="div",components:m={},componentsProps:v={},invisible:b=!1,open:d,slotProps:h={},slots:f={},TransitionComponent:g=pg,transitionDuration:w}=s,O=he(s,ug),x=P({},s,{component:u,invisible:b}),k=fg(x),y=(n=h.root)!=null?n:v.root;return i.jsx(g,P({in:d,timeout:w},O,{children:i.jsx(mg,P({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:m.Root)!=null?o:u,className:Ce(k.root,p,y==null?void 0:y.className),ownerState:P({},x,y==null?void 0:y.ownerState),classes:k,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(yl.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const hg=yl;function gg(e){return ot("MuiModal",e)}kt("MuiModal",["root","hidden","backdrop"]);const bg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],vg=e=>{const{open:t,exited:r,classes:n}=e;return mt({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},gg,n)},yg=Pe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),wg=Pe(hg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),wl=N.forwardRef(function(t,r){var n,o,a,s,c,p;const u=ht({name:"MuiModal",props:t}),{BackdropComponent:m=wg,BackdropProps:v,className:b,closeAfterTransition:d=!1,children:h,container:f,component:g,components:w={},componentsProps:O={},disableAutoFocus:x=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:R=!1,keepMounted:_=!1,onBackdropClick:T,open:M,slotProps:A,slots:z}=u,U=he(u,bg),B=P({},u,{closeAfterTransition:d,disableAutoFocus:x,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:R,keepMounted:_}),{getRootProps:H,getBackdropProps:ee,getTransitionProps:V,portalRef:j,isTopModal:L,exited:q,hasTransition:W}=vm(P({},B,{rootRef:r})),G=P({},B,{exited:q}),K=vg(G),X={};if(h.props.tabIndex===void 0&&(X.tabIndex="-1"),W){const{onEnter:te,onExited:D}=V();X.onEnter=te,X.onExited=D}const J=(n=(o=z==null?void 0:z.root)!=null?o:w.Root)!=null?n:yg,Y=(a=(s=z==null?void 0:z.backdrop)!=null?s:w.Backdrop)!=null?a:m,Z=(c=A==null?void 0:A.root)!=null?c:O.root,Q=(p=A==null?void 0:A.backdrop)!=null?p:O.backdrop,ie=Vt({elementType:J,externalSlotProps:Z,externalForwardedProps:U,getSlotProps:H,additionalProps:{ref:r,as:g},ownerState:G,className:Ce(b,Z==null?void 0:Z.className,K==null?void 0:K.root,!G.open&&G.exited&&(K==null?void 0:K.hidden))}),F=Vt({elementType:Y,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:D=>{T&&T(D),te!=null&&te.onClick&&te.onClick(D)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,K==null?void 0:K.backdrop),ownerState:G});return!_&&!M&&(!W||q)?null:i.jsx(Fr,{ref:j,container:f,disablePortal:S,children:i.jsxs(J,P({},ie,{children:[!R&&m?i.jsx(Y,P({},F)):null,i.jsx(wn,{disableEnforceFocus:k,disableAutoFocus:x,disableRestoreFocus:C,isEnabled:L,open:M,children:N.cloneElement(h,X)})]}))})});process.env.NODE_ENV!=="production"&&(wl.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Xr.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([dt,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const xg=wl;function kg(e){return ot("MuiPaper",e)}kt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Eg=["className","component","elevation","square","variant"],Ng=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return mt(a,kg,o)},Tg=Pe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${yn("#fff",xs(t.elevation))}, ${yn("#fff",xs(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),xl=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,u=he(n,Eg),m=P({},n,{component:a,elevation:s,square:c,variant:p}),v=Ng(m);return process.env.NODE_ENV!=="production"&&en().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),i.jsx(Tg,P({as:a,ownerState:m,className:Ce(v.root,o),ref:r},u))});process.env.NODE_ENV!=="production"&&(xl.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:dr(Ii,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Sg=xl;function Cg(e){return ot("MuiPopover",e)}kt("MuiPopover",["root","paper"]);const jg=["onEntering"],Og=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Rg=["slotProps"];function Ts(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function Ss(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function Cs(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function fn(e){return typeof e=="function"?e():e}const Pg=e=>{const{classes:t}=e;return mt({root:["root"],paper:["paper"]},Cg,t)},_g=Pe(xg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),kl=Pe(Sg,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),El=N.forwardRef(function(t,r){var n,o,a;const s=ht({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:b,className:d,container:h,elevation:f=8,marginThreshold:g=16,open:w,PaperProps:O={},slots:x,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=Co,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:R=!1}=s,_=he(s.TransitionProps,jg),T=he(s,Og),M=(n=k==null?void 0:k.paper)!=null?n:O,A=N.useRef(),z=Xe(A,M.ref),U=P({},s,{anchorOrigin:u,anchorReference:v,elevation:f,marginThreshold:g,externalPaperSlotProps:M,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:_}),B=Pg(U),H=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=fn(p),D=te&&te.nodeType===1?te:Oe(A.current).body,le=D.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:le.top+Ts(le,u.vertical),left:le.left+Ss(le,u.horizontal)}},[p,u.horizontal,u.vertical,m,v]),ee=N.useCallback(te=>({vertical:Ts(te,y.vertical),horizontal:Ss(te,y.horizontal)}),[y.horizontal,y.vertical]),V=N.useCallback(te=>{const D={width:te.offsetWidth,height:te.offsetHeight},le=ee(D);if(v==="none")return{top:null,left:null,transformOrigin:Cs(le)};const Ne=H();let _e=Ne.top-le.vertical,xe=Ne.left-le.horizontal;const Tt=_e+D.height,Ie=xe+D.width,at=nr(fn(p)),Le=at.innerHeight-g,st=at.innerWidth-g;if(g!==null&&_e<g){const Te=_e-g;_e-=Te,le.vertical+=Te}else if(g!==null&&Tt>Le){const Te=Tt-Le;_e-=Te,le.vertical+=Te}if(process.env.NODE_ENV!=="production"&&D.height>Le&&D.height&&Le&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${D.height-Le}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),g!==null&&xe<g){const Te=xe-g;xe-=Te,le.horizontal+=Te}else if(Ie>st){const Te=Ie-st;xe-=Te,le.horizontal+=Te}return{top:`${Math.round(_e)}px`,left:`${Math.round(xe)}px`,transformOrigin:Cs(le)}},[p,v,H,ee,g]),[j,L]=N.useState(w),q=N.useCallback(()=>{const te=A.current;if(!te)return;const D=V(te);D.top!==null&&(te.style.top=D.top),D.left!==null&&(te.style.left=D.left),te.style.transformOrigin=D.transformOrigin,L(!0)},[V]);N.useEffect(()=>(R&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[p,R,q]);const W=(te,D)=>{I&&I(te,D),q()},G=()=>{L(!1)};N.useEffect(()=>{w&&q()}),N.useImperativeHandle(c,()=>w?{updatePosition:()=>{q()}}:null,[w,q]),N.useEffect(()=>{if(!w)return;const te=Si(()=>{q()}),D=nr(p);return D.addEventListener("resize",te),()=>{te.clear(),D.removeEventListener("resize",te)}},[p,w,q]);let K=C;C==="auto"&&!S.muiSupportAuto&&(K=void 0);const X=h||(p?Oe(fn(p)).body:void 0),J=(o=x==null?void 0:x.root)!=null?o:_g,Y=(a=x==null?void 0:x.paper)!=null?a:kl,Z=Vt({elementType:Y,externalSlotProps:P({},M,{style:j?M.style:P({},M.style,{opacity:0})}),additionalProps:{elevation:f,ref:z},ownerState:U,className:Ce(B.paper,M==null?void 0:M.className)}),Q=Vt({elementType:J,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:T,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:X,open:w},ownerState:U,className:Ce(B.root,d)}),{slotProps:ie}=Q,F=he(Q,Rg);return i.jsx(J,P({},F,!Hi(J)&&{slotProps:ie,disableScrollLock:R},{children:i.jsx(S,P({appear:!0,in:w,onEntering:W,onExited:G,timeout:K},_,{children:i.jsx(Y,P({},Z,{children:b}))}))}))});process.env.NODE_ENV!=="production"&&(El.propTypes={action:qo,anchorEl:dr(l.oneOfType([dt,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=fn(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([dt,l.func]),disableScrollLock:l.bool,elevation:Ii,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:cd}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const Ig=El;function $g(e){return ot("MuiMenu",e)}kt("MuiMenu",["root","paper","list"]);const Mg=["onEntering"],Dg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Ag={vertical:"top",horizontal:"right"},Bg={vertical:"top",horizontal:"left"},Lg=e=>{const{classes:t}=e;return mt({root:["root"],paper:["paper"],list:["list"]},$g,t)},Fg=Pe(Ig,{shouldForwardProp:e=>zi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Vg=Pe(kl,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),zg=Pe(ig,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Nl=N.forwardRef(function(t,r){var n,o;const a=ht({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:u=!1,MenuListProps:m={},onClose:v,open:b,PaperProps:d={},PopoverClasses:h,transitionDuration:f="auto",TransitionProps:{onEntering:g}={},variant:w="selectedMenu",slots:O={},slotProps:x={}}=a,k=he(a.TransitionProps,Mg),y=he(a,Dg),S=en(),C=S.direction==="rtl",I=P({},a,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:m,onEntering:g,PaperProps:d,transitionDuration:f,TransitionProps:k,variant:w}),R=Lg(I),_=s&&!u&&b,T=N.useRef(null),M=(V,j)=>{T.current&&T.current.adjustStyleForScrollbar(V,S),g&&g(V,j)},A=V=>{V.key==="Tab"&&(V.preventDefault(),v&&v(V,"tabKeyDown"))};let z=-1;N.Children.map(c,(V,j)=>{N.isValidElement(V)&&(process.env.NODE_ENV!=="production"&&gn.isFragment(V)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),V.props.disabled||(w==="selectedMenu"&&V.props.selected||z===-1)&&(z=j))});const U=(n=O.paper)!=null?n:Vg,B=(o=x.paper)!=null?o:d,H=Vt({elementType:O.root,externalSlotProps:x.root,ownerState:I,className:[R.root,p]}),ee=Vt({elementType:U,externalSlotProps:B,ownerState:I,className:R.paper});return i.jsx(Fg,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Ag:Bg,slots:{paper:U,root:O.root},slotProps:{root:H,paper:ee},open:b,ref:r,transitionDuration:f,TransitionProps:P({onEntering:M},k),ownerState:I},y,{classes:h,children:i.jsx(zg,P({onKeyDown:A,actions:T,autoFocus:s&&(z===-1||u),autoFocusItem:_,variant:w},m,{className:Ce(R.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(Nl.propTypes={anchorEl:l.oneOfType([dt,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Gg=Nl;function Ug({className:e,commandHandler:t,menuDefinition:r,children:n}){var u;const[o,a]=E.useState(void 0),s=E.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=E.useCallback(()=>{a(void 0)},[]),p=E.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=r==null?void 0:r.items)==null?void 0:u.length)??0)===0||!n?n:i.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,i.jsx(Gg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:i.jsx(da,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function Hg(e){return{preserveValue:!0,...e}}const Nn=(e,t,r={})=>{const n=E.useRef(t);n.current=t;const o=E.useRef(r);o.current=Hg(o.current);const[a,s]=E.useState(()=>n.current),[c,p]=E.useState(!0);return E.useEffect(()=>{let u=!0;return p(!!e),(async()=>{if(e){const m=await e();u&&(s(()=>m),p(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},qg=Gi(i.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Tl({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,u]=E.useState(!1),[m,v]=E.useState(!1),b=E.useCallback(()=>{p&&u(!1),v(!1)},[p]),d=E.useCallback(k=>{k.stopPropagation(),u(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=E.useCallback(k=>(b(),n(k)),[n,b]),[f,g]=E.useState({top:1,left:1});E.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+k.clientHeight,R=y.left+C;g({top:I,left:R})}}},[p,o]);const[w]=Nn(E.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[O]=Nn(E.useCallback(async()=>(e==null?void 0:e(!0))??r??w,[e,r,w,p]),r??w),x=m&&O?O:w;return i.jsxs(i.Fragment,{children:[i.jsx(Se.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??i.jsx(qg,{})}),i.jsx(Se.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:b,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:x?i.jsx(fl,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function Wg({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:u}){return i.jsx(Se.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:u})}function Xg({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:u="off",className:m,onChange:v,onChangeCommitted:b}){return i.jsx(Se.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:u,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:b})}function Kg({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return i.jsx(Se.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const ur=E.forwardRef(({className:e,...t},r)=>i.jsx(oe.LoaderCircle,{size:35,className:$("pr-animate-spin",e),...t,ref:r}));ur.displayName="Spinner";function Yg({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return i.jsx(Se.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}function Jg({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:u,value:m,onChange:v,onFocus:b,onBlur:d}){return i.jsxs("div",{className:$("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[i.jsx(Qe,{htmlFor:e,className:$({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),i.jsx(lr,{id:e,disabled:t,placeholder:s,required:c,className:$(p,{"pr-border-red-600":r}),defaultValue:u,value:m,onChange:v,onFocus:b,onBlur:d}),i.jsx("p",{className:$({"pr-hidden":!o}),children:o})]})}function Zg({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=E.useRef(void 0);return i.jsx("div",{ref:a,style:{position:"relative"},children:i.jsx(Se.AppBar,{position:"static",id:n,children:i.jsxs(Se.Toolbar,{className:$("pr-bg-muted pr-text-muted-foreground",r),variant:"dense",children:[e?i.jsx(Tl,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?i.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Qg=Tn.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),Sl=E.forwardRef(({className:e,variant:t,...r},n)=>i.jsx("div",{ref:n,role:"alert",className:$(Qg({variant:t}),e),...r}));Sl.displayName="Alert";const Cl=E.forwardRef(({className:e,...t},r)=>i.jsxs("h5",{ref:r,className:$("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));Cl.displayName="AlertTitle";const jl=E.forwardRef(({className:e,...t},r)=>i.jsx("div",{ref:r,className:$("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));jl.displayName="AlertDescription";const Ol=E.forwardRef(({className:e,...t},r)=>i.jsx("div",{ref:r,className:$("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));Ol.displayName="Card";const Rl=E.forwardRef(({className:e,...t},r)=>i.jsx("div",{ref:r,className:$("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));Rl.displayName="CardHeader";const Pl=E.forwardRef(({className:e,...t},r)=>i.jsx("h3",{ref:r,className:$("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));Pl.displayName="CardTitle";const _l=E.forwardRef(({className:e,...t},r)=>i.jsx("p",{ref:r,className:$("pr-text-sm pr-text-muted-foreground",e),...t}));_l.displayName="CardDescription";const Il=E.forwardRef(({className:e,...t},r)=>i.jsx("div",{ref:r,className:$("pr-p-6 pr-pt-0",e),...t}));Il.displayName="CardContent";const $l=E.forwardRef(({className:e,...t},r)=>i.jsx("div",{ref:r,className:$("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));$l.displayName="CardFooter";function eb({...e}){return i.jsx(Ds.Toaster,{className:"pr-toaster pr-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Ml=E.forwardRef(({className:e,...t},r)=>i.jsxs(Sr.Root,{ref:r,className:$("pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center pr-font-sans",e),...t,children:[i.jsx(Sr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:i.jsx(Sr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),i.jsx(Sr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Ml.displayName=Sr.Root.displayName;const Dl=E.forwardRef(({className:e,...t},r)=>i.jsx(ho.Root,{className:$("pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:i.jsx(ho.Thumb,{className:$("pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));Dl.displayName=ho.Root.displayName;const tb=Be.Root,Al=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.List,{ref:r,className:$("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Al.displayName=Be.List.displayName;const Bl=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.Trigger,{ref:r,className:$("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Bl.displayName=Be.Trigger.displayName;const Ll=E.forwardRef(({className:e,...t},r)=>i.jsx(Be.Content,{ref:r,className:$("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ll.displayName=Be.Content.displayName;function rb({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return i.jsx(ke,{className:$("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?i.jsx(ur,{size:15}):i.jsxs(i.Fragment,{children:[i.jsx(oe.Download,{size:25,className:$("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function nb({isEnabling:e,handleClick:t,className:r,...n}){return i.jsx(ke,{className:$("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?i.jsxs(i.Fragment,{children:[i.jsx(ur,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function ob({isDisabling:e,handleClick:t,className:r,...n}){return i.jsx(ke,{className:$("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?i.jsxs(i.Fragment,{children:[i.jsx(ur,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function ab({isUpdating:e,handleClick:t,className:r,...n}){return i.jsx(ke,{className:$("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?i.jsxs(i.Fragment,{children:[i.jsx(ur,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function It(){return It=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},It.apply(this,arguments)}const sb=["children","options"],js=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),Os={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},ib=["style","script"],lb=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,cb=/mailto:/i,pb=/\n{2,}$/,Fl=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,db=/^ *> ?/gm,ub=/^ {2,}\n/,fb=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Vl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,zl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,mb=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,hb=/^(?:\n *)*\n/,gb=/\r\n?/g,bb=/^\[\^([^\]]+)](:.*)\n/,vb=/^\[\^([^\]]+)]/,yb=/\f/g,wb=/^\s*?\[(x|\s)\]/,Gl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ul=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Hl=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,jo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,xb=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,ql=/^<!--[\s\S]*?(?:-->)/,kb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,Oo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Eb=/^\{.*\}$/,Nb=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Tb=/^<([^ >]+@[^ >]+)>/,Sb=/^<([^ >]+:\/[^ >]+)>/,Cb=/-([a-z])?/gi,Wl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,jb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,Ob=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Rb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Pb=/(\[|\])/g,_b=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Ib=/\t/g,$b=/^ *\| */,Mb=/(^ *\||\| *$)/g,Db=/ *$/,Ab=/^ *:-+: *$/,Bb=/^ *:-+ *$/,Lb=/^ *-+: *$/,Fb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Vb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,zb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,Gb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Ub=/^\\([^0-9A-Za-z\s])/,Hb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,qb=/^\n+/,Wb=/^([ \t]*)/,Xb=/\\([^\\])/g,Rs=/ *\n+$/,Kb=/(?:^|\n)( *)$/,ua="(?:\\d+\\.)",fa="(?:[*+-])";function Xl(e){return"( *)("+(e===1?ua:fa)+") +"}const Kl=Xl(1),Yl=Xl(2);function Jl(e){return new RegExp("^"+(e===1?Kl:Yl))}const Yb=Jl(1),Jb=Jl(2);function Zl(e){return new RegExp("^"+(e===1?Kl:Yl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?ua:fa)+" )[^\\n]*)*(\\n|$)","gm")}const Ql=Zl(1),ec=Zl(2);function tc(e){const t=e===1?ua:fa;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const rc=tc(1),nc=tc(2);function Ps(e,t){const r=t===1,n=r?rc:nc,o=r?Ql:ec,a=r?Yb:Jb;return{t(s,c,p){const u=Kb.exec(p);return u&&(c.o||!c._&&!c.u)?n.exec(s=u[1]+s):null},i:se.HIGH,l(s,c,p){const u=r?+s[2]:void 0,m=s[0].replace(pb,`
`).match(o);let v=!1;return{p:m.map(function(b,d){const h=a.exec(b)[0].length,f=new RegExp("^ {1,"+h+"}","gm"),g=b.replace(f,"").replace(a,""),w=d===m.length-1,O=g.indexOf(`

`)!==-1||w&&v;v=O;const x=p._,k=p.o;let y;p.o=!0,O?(p._=!1,y=g.replace(Rs,`

`)):(p._=!0,y=g.replace(Rs,""));const S=c(y,p);return p._=x,p.o=k,S}),m:r,g:u}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(u,m){return e("li",{key:m},c(u,p))}))}}const Zb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Qb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,oc=[Fl,Vl,zl,Gl,Hl,Ul,ql,Wl,Ql,rc,ec,nc],ev=[...oc,/^[^\n]+(?:  \n|\n{2,})/,jo,Oo];function tv(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function rv(e){return Lb.test(e)?"right":Ab.test(e)?"center":Bb.test(e)?"left":null}function _s(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(Db,"")),a[a.length-1].push(s))}),a}function nv(e,t,r){r._=!0;const n=_s(e[1],t,r),o=e[2].replace(Mb,"").split("|").map(rv),a=function(s,c,p){return s.trim().split(`
`).map(function(u){return _s(u,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function Is(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function vt(e){return function(t,r){return r._?e.exec(t):null}}function yt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function lt(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function Nr(e){return function(t){return e.exec(t)}}function ov(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!oc.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Yt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function $s(e){return e.replace(Xb,"$1")}function mn(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function av(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function sv(e,t,r){return r._=!1,e(t,r)}const io=(e,t,r)=>({v:mn(t,e[1],r)});function lo(){return{}}function co(){return null}function iv(...e){return e.filter(Boolean).join(" ")}function po(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var se;function lv(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||tv,t.namedCodesToUnicode=t.namedCodesToUnicode?It({},Os,t.namedCodesToUnicode):Os;const r=t.createElement||N.createElement;function n(d,h,...f){const g=po(t.overrides,`${d}.props`,{});return r(function(w,O){const x=po(O,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:po(O,`${w}.component`,w):w}(d,t.overrides),It({},h,g,{className:iv(h==null?void 0:h.className,g.className)||void 0}),...f)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=_b.test(d)===!1);const f=m(u(h?d:`${d.trimEnd().replace(qb,"")}

`,{_:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const g=t.wrapper||(h?"span":"div");let w;if(f.length>1||t.forceWrapper)w=f;else{if(f.length===1)return w=f[0],typeof w=="string"?n("span",{key:"outer"},w):w;w=null}return N.createElement(g,{key:"outer"},w)}function a(d){const h=d.match(lb);return h?h.reduce(function(f,g,w){const O=g.indexOf("=");if(O!==-1){const x=function(C){return C.indexOf("-")!==-1&&C.match(kb)===null&&(C=C.replace(Cb,function(I,R){return R.toUpperCase()})),C}(g.slice(0,O)).trim(),k=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(g.slice(O+1).trim()),y=js[x]||x,S=f[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(R,_){const T=_.slice(0,_.indexOf(":"));return R[T.replace(/(-[a-z])/g,M=>M[1].toUpperCase())]=_.slice(T.length+1).trim(),R},{}):C==="href"?Yt(I):(I.match(Eb)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(x,k);typeof S=="string"&&(jo.test(S)||Oo.test(S))&&(f[y]=N.cloneElement(o(S.trim()),{key:w}))}else g!=="style"&&(f[js[g]||g]=!0);return f},{}):null}const s=[],c={},p={blockQuote:{t:lt(Fl),i:se.HIGH,l:(d,h,f)=>({v:h(d[0].replace(db,""),f)}),h:(d,h,f)=>n("blockquote",{key:f.k},h(d.v,f))},breakLine:{t:Nr(ub),i:se.HIGH,l:lo,h:(d,h,f)=>n("br",{key:f.k})},breakThematic:{t:lt(fb),i:se.HIGH,l:lo,h:(d,h,f)=>n("hr",{key:f.k})},codeBlock:{t:lt(zl),i:se.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,f)=>n("pre",{key:f.k},n("code",It({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:lt(Vl),i:se.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:yt(mb),i:se.LOW,l:d=>({v:d[2]}),h:(d,h,f)=>n("code",{key:f.k},d.v)},footnote:{t:lt(bb),i:se.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:co},footnoteReference:{t:vt(vb),i:se.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,f)=>n("a",{key:f.k,href:Yt(d.B)},n("sup",{key:f.k},d.v))},gfmTask:{t:vt(wb),i:se.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,f)=>n("input",{checked:d.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:lt(t.enforceAtxHeadings?Ul:Gl),i:se.HIGH,l:(d,h,f)=>({v:mn(h,d[2],f),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,f)=>n(`h${d.C}`,{id:d.T,key:f.k},h(d.v,f))},headingSetext:{t:lt(Hl),i:se.MAX,l:(d,h,f)=>({v:mn(h,d[1],f),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:Nr(ql),i:se.HIGH,l:()=>({}),h:co},image:{t:yt(Qb),i:se.HIGH,l:d=>({D:d[1],B:$s(d[2]),F:d[3]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D||void 0,title:d.F||void 0,src:Yt(d.B)})},link:{t:vt(Zb),i:se.LOW,l:(d,h,f)=>({v:av(h,d[1],f),B:$s(d[2]),F:d[3]}),h:(d,h,f)=>n("a",{key:f.k,href:Yt(d.B),title:d.F},h(d.v,f))},linkAngleBraceStyleDetector:{t:vt(Sb),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:vt(Nb)(d,h),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:vt(Tb),i:se.MAX,l(d){let h=d[1],f=d[1];return cb.test(f)||(f="mailto:"+f),{v:[{v:h.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:Ps(n,1),unorderedList:Ps(n,2),newlineCoalescer:{t:lt(hb),i:se.LOW,l:lo,h:()=>`
`},paragraph:{t:ov,i:se.LOW,l:io,h:(d,h,f)=>n("p",{key:f.k},h(d.v,f))},ref:{t:vt(jb),i:se.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:co},refImage:{t:yt(Ob),i:se.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,f)=>n("img",{key:f.k,alt:d.D,src:Yt(c[d.P].B),title:c[d.P].F})},refLink:{t:vt(Rb),i:se.MAX,l:(d,h,f)=>({v:h(d[1],f),Z:h(d[0].replace(Pb,"\\$1"),f),P:d[2]}),h:(d,h,f)=>c[d.P]?n("a",{key:f.k,href:Yt(c[d.P].B),title:c[d.P].F},h(d.v,f)):n("span",{key:f.k},h(d.Z,f))},table:{t:lt(Wl),i:se.HIGH,l:nv,h:(d,h,f)=>n("table",{key:f.k},n("thead",null,n("tr",null,d.L.map(function(g,w){return n("th",{key:w,style:Is(d,w)},h(g,f))}))),n("tbody",null,d.A.map(function(g,w){return n("tr",{key:w},g.map(function(O,x){return n("td",{key:x,style:Is(d,x)},h(O,f))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,$b.exec(d)):null},i:se.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:Nr(Hb),i:se.MIN,l:d=>({v:d[0].replace(xb,(h,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:h)}),h:d=>d.v},textBolded:{t:yt(Fb),i:se.MED,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("strong",{key:f.k},h(d.v,f))},textEmphasized:{t:yt(Vb),i:se.LOW,l:(d,h,f)=>({v:h(d[2],f)}),h:(d,h,f)=>n("em",{key:f.k},h(d.v,f))},textEscaped:{t:yt(Ub),i:se.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:yt(zb),i:se.LOW,l:io,h:(d,h,f)=>n("mark",{key:f.k},h(d.v,f))},textStrikethroughed:{t:yt(Gb),i:se.LOW,l:io,h:(d,h,f)=>n("del",{key:f.k},h(d.v,f))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:Nr(jo),i:se.HIGH,l(d,h,f){const[,g]=d[3].match(Wb),w=new RegExp(`^${g}`,"gm"),O=d[3].replace(w,""),x=(k=O,ev.some(I=>I.test(k))?sv:mn);var k;const y=d[1].toLowerCase(),S=ib.indexOf(y)!==-1;f.N=f.N||y==="a";const C=S?d[3]:x(h,O,f);return f.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,f)=>n(d.H,It({key:f.k},d.O),d.G?d.v:h(d.v,f))},p.htmlSelfClosing={t:Nr(Oo),i:se.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,f)=>n(d.H,It({},d.O,{key:f.k}))});const u=function(d){let h=Object.keys(d);function f(g,w){let O=[],x="";for(;g;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(g,w,x);if(C){const I=C[0];g=g.substring(I.length);const R=S.l(C,f,w);R.type==null&&(R.type=y),O.push(R),x=I;break}k++}}return O}return h.sort(function(g,w){let O=d[g].i,x=d[w].i;return O!==x?O-x:g<w?-1:1}),function(g,w){return f(function(O){return O.replace(gb,`
`).replace(yb,"").replace(Ib,"    ")}(g),w)}}(p),m=(v=function(d){return function(h,f,g){return d[h.type].h(h,f,g)}}(p),function d(h,f={}){if(Array.isArray(h)){const g=f.k,w=[];let O=!1;for(let x=0;x<h.length;x++){f.k=x;const k=d(h[x],f),y=typeof k=="string";y&&O?w[w.length-1]+=k:k!==null&&w.push(k),O=y}return f.k=g,w}return v(h,d,f)});var v;const b=o(e);return s.length?n("div",null,b,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(u(d.I,{_:!0})))}))):b}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(se||(se={}));const cv=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},u=Object.keys(o);for(c=0;c<u.length;c++)a.indexOf(s=u[c])>=0||(p[s]=o[s]);return p}(e,sb);return N.cloneElement(lv(t,r),n)};function pv({id:e,markdown:t}){return i.jsx("div",{id:e,className:"pr-prose",children:i.jsx(cv,{children:t})})}const ac=E.forwardRef((e,t)=>i.jsxs(ke,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[i.jsx(oe.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",i.jsx(oe.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var sc=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(sc||{});function dv({id:e,groups:t}){return i.jsx("div",{id:e,children:i.jsxs(Cn,{children:[i.jsx(Io,{asChild:!0,children:i.jsx(ac,{})}),i.jsx(Gr,{children:t.map(r=>i.jsxs("div",{children:[i.jsx(pr,{children:r.label}),i.jsx(qs,{children:r.items.map(n=>i.jsx("div",{children:n.itemType===0?i.jsx(jn,{onClick:n.onClick,children:n.label}):i.jsx(Mo,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),i.jsx(Ur,{})]},r.label))})]})})}function uv({id:e,message:t}){return i.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:i.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:i.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function fv({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new re.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return i.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[i.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[i.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:i.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),i.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),i.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),i.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[i.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[i.jsx(oe.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),i.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),i.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),i.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),i.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[i.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>i.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&i.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),i.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),i.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[i.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",i.jsx(oe.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),i.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",i.jsx(oe.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function ic({id:e,versionHistory:t}){const[r,n]=E.useState(!1),o=new Date;function a(c){const p=new Date(c),u=new Date(o.getTime()-p.getTime()),m=u.getUTCFullYear()-1970,v=u.getUTCMonth(),b=u.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:b===0?d="today":d=`${b.toString()} day${b===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return i.jsxs("div",{id:e,children:[i.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),i.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>i.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[i.jsx("div",{className:"pr-text-gray-600",children:i.jsx("li",{className:"pr-prose pr-text-xs",children:i.jsx("span",{children:c[1].description})})}),i.jsxs("div",{className:"pr-justify-end pr-text-right",children:[i.jsxs("div",{children:["Version ",c[0]]}),i.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&i.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function mv({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=E.useMemo(()=>re.formatBytes(r),[r]),c=(p=>{const u=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>u.of(m))})(n);return i.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:i.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[i.jsx(ic,{versionHistory:o}),i.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),i.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[i.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),i.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[i.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[i.jsx("span",{className:"pr-mb-2",children:"Publisher"}),i.jsx("span",{className:"pr-font-semibold",children:t}),i.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),i.jsx("span",{className:"pr-font-semibold",children:a})]}),i.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:i.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[i.jsx("span",{className:"pr-mb-2",children:"Languages"}),i.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const hv=(e,t)=>{E.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},uo=()=>!1,gv=(e,t)=>{const[r]=Nn(E.useCallback(async()=>{if(!e)return uo;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),uo,{preserveValue:!1});E.useEffect(()=>()=>{r!==uo&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Ds.toast});exports.Alert=Sl;exports.AlertDescription=jl;exports.AlertTitle=Cl;exports.BOOK_SELECTOR_STRING_KEYS=yp;exports.BookChapterControl=lp;exports.BookSelectionMode=ai;exports.BookSelector=wp;exports.Button=ke;exports.Card=Ol;exports.CardContent=Il;exports.CardDescription=_l;exports.CardFooter=$l;exports.CardHeader=Rl;exports.CardTitle=Pl;exports.ChapterRangeSelector=oi;exports.Checkbox=qp;exports.Checklist=Wp;exports.ComboBox=go;exports.ContextMenu=Ug;exports.DataTable=di;exports.DisableButton=ob;exports.DropdownMenu=Cn;exports.DropdownMenuCheckboxItem=jn;exports.DropdownMenuContent=Gr;exports.DropdownMenuGroup=qs;exports.DropdownMenuItem=$o;exports.DropdownMenuItemType=sc;exports.DropdownMenuLabel=pr;exports.DropdownMenuPortal=Kc;exports.DropdownMenuRadioGroup=Jc;exports.DropdownMenuRadioItem=Mo;exports.DropdownMenuSeparator=Ur;exports.DropdownMenuShortcut=Ks;exports.DropdownMenuSub=Yc;exports.DropdownMenuSubContent=Xs;exports.DropdownMenuSubTrigger=Ws;exports.DropdownMenuTrigger=Io;exports.EnableButton=nb;exports.FilterButton=ac;exports.FilterDropdown=dv;exports.Footer=mv;exports.GridMenu=fl;exports.HamburgerMenuButton=Tl;exports.INVENTORY_STRING_KEYS=Tp;exports.IconButton=Wg;exports.Input=lr;exports.InstallButton=rb;exports.Inventory=jp;exports.Label=Qe;exports.LabelPosition=Pt;exports.MarkdownRenderer=pv;exports.MenuItem=pa;exports.MoreInfo=fv;exports.NavigationContentSearch=Ip;exports.NoExtensionsFound=uv;exports.RadioGroup=Do;exports.RadioGroupItem=hn;exports.ScriptureResultsViewer=Vp;exports.ScrollGroupSelector=zp;exports.SearchBar=mi;exports.Select=Qt;exports.SelectContent=At;exports.SelectGroup=si;exports.SelectItem=He;exports.SelectLabel=ii;exports.SelectScrollDownButton=Bo;exports.SelectScrollUpButton=Ao;exports.SelectSeparator=li;exports.SelectTrigger=Dt;exports.SelectValue=er;exports.Separator=Go;exports.SettingsList=Gp;exports.SettingsListHeader=Hp;exports.SettingsListItem=Up;exports.ShadCnSlider=Ml;exports.ShadCnSwitch=Dl;exports.Slider=Xg;exports.Snackbar=Kg;exports.Sonner=eb;exports.Spinner=ur;exports.Switch=Yg;exports.Table=Hr;exports.TableBody=Wr;exports.TableCaption=pi;exports.TableCell=Bt;exports.TableFooter=ci;exports.TableHead=tr;exports.TableHeader=qr;exports.TableRow=ct;exports.Tabs=tb;exports.TabsContent=Ll;exports.TabsList=Al;exports.TabsTrigger=Bl;exports.TextField=Jg;exports.ToggleGroup=Lo;exports.ToggleGroupItem=Pr;exports.Toolbar=Zg;exports.UpdateButton=ab;exports.VersionHistory=ic;exports.VerticalTabs=Fo;exports.VerticalTabsContent=zo;exports.VerticalTabsList=Vo;exports.VerticalTabsTrigger=hi;exports.buttonVariants=Ys;exports.getSortingIcon=On;exports.inventoryCountColumn=Pp;exports.inventoryItemColumn=Rp;exports.inventoryStatusColumn=_p;exports.useEvent=hv;exports.useEventAsync=gv;exports.usePromise=Nn;function bv(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}bv(`/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
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

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
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

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(.pr-twp,.pr-twp *) {
  display: none;
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds pr-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
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
.pr-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.pr-pointer-events-none {
  pointer-events: none;
}
.pr-fixed {
  position: fixed;
}
.pr-absolute {
  position: absolute;
}
.pr-relative {
  position: relative;
}
.pr-sticky {
  position: sticky;
}
.pr-inset-0 {
  inset: 0px;
}
.pr-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.pr-bottom-2 {
  bottom: 0.5rem;
}
.pr-left-2 {
  left: 0.5rem;
}
.pr-left-2\\.5 {
  left: 0.625rem;
}
.pr-left-\\[50\\%\\] {
  left: 50%;
}
.pr-right-3 {
  right: 0.75rem;
}
.pr-right-4 {
  right: 1rem;
}
.pr-top-0 {
  top: 0px;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-2 {
  top: 0.5rem;
}
.pr-top-2\\.5 {
  top: 0.625rem;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
}
.pr-z-10 {
  z-index: 10;
}
.pr-z-30 {
  z-index: 30;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr-m-1 {
  margin: 0.25rem;
}
.pr-m-2 {
  margin: 0.5rem;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.pr-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-mb-1 {
  margin-bottom: 0.25rem;
}
.pr-mb-2 {
  margin-bottom: 0.5rem;
}
.pr-mb-20 {
  margin-bottom: 5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-1 {
  margin-left: 0.25rem;
}
.pr-ml-2 {
  margin-left: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-1 {
  margin-right: 0.25rem;
}
.pr-mr-2 {
  margin-right: 0.5rem;
}
.pr-ms-2 {
  margin-inline-start: 0.5rem;
}
.pr-ms-5 {
  margin-inline-start: 1.25rem;
}
.pr-ms-auto {
  margin-inline-start: auto;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-20 {
  margin-top: 5rem;
}
.pr-mt-3 {
  margin-top: 0.75rem;
}
.pr-mt-4 {
  margin-top: 1rem;
}
.pr-mt-auto {
  margin-top: auto;
}
.pr-box-border {
  box-sizing: border-box;
}
.pr-box-content {
  box-sizing: content-box;
}
.pr-block {
  display: block;
}
.pr-inline-block {
  display: inline-block;
}
.pr-inline {
  display: inline;
}
.pr-flex {
  display: flex;
}
.pr-inline-flex {
  display: inline-flex;
}
.pr-grid {
  display: grid;
}
.pr-inline-grid {
  display: inline-grid;
}
.pr-hidden {
  display: none;
}
.pr-aspect-square {
  aspect-ratio: 1 / 1;
}
.pr-h-1\\/2 {
  height: 50%;
}
.pr-h-10 {
  height: 2.5rem;
}
.pr-h-11 {
  height: 2.75rem;
}
.pr-h-12 {
  height: 3rem;
}
.pr-h-14 {
  height: 3.5rem;
}
.pr-h-2 {
  height: 0.5rem;
}
.pr-h-2\\.5 {
  height: 0.625rem;
}
.pr-h-24 {
  height: 6rem;
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
.pr-h-5 {
  height: 1.25rem;
}
.pr-h-6 {
  height: 1.5rem;
}
.pr-h-7 {
  height: 1.75rem;
}
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-96 {
  height: 24rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[100\\%\\] {
  height: 100%;
}
.pr-h-\\[1px\\] {
  height: 1px;
}
.pr-h-\\[405px\\] {
  height: 405px;
}
.pr-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
}
.pr-max-h-\\[300px\\] {
  max-height: 300px;
}
.pr-w-0 {
  width: 0px;
}
.pr-w-1\\/3 {
  width: 33.333333%;
}
.pr-w-10 {
  width: 2.5rem;
}
.pr-w-11 {
  width: 2.75rem;
}
.pr-w-14 {
  width: 3.5rem;
}
.pr-w-2 {
  width: 0.5rem;
}
.pr-w-2\\.5 {
  width: 0.625rem;
}
.pr-w-20 {
  width: 5rem;
}
.pr-w-3 {
  width: 0.75rem;
}
.pr-w-3\\.5 {
  width: 0.875rem;
}
.pr-w-3\\/4 {
  width: 75%;
}
.pr-w-4 {
  width: 1rem;
}
.pr-w-5 {
  width: 1.25rem;
}
.pr-w-6 {
  width: 1.5rem;
}
.pr-w-72 {
  width: 18rem;
}
.pr-w-8 {
  width: 2rem;
}
.pr-w-9 {
  width: 2.25rem;
}
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[100px\\] {
  width: 100px;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-\\[150px\\] {
  width: 150px;
}
.pr-w-\\[1px\\] {
  width: 1px;
}
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
}
.pr-w-auto {
  width: auto;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.pr-max-w-64 {
  max-width: 16rem;
}
.pr-max-w-lg {
  max-width: 32rem;
}
.pr-flex-1 {
  flex: 1 1 0%;
}
.pr-shrink-0 {
  flex-shrink: 0;
}
.pr-flex-grow {
  flex-grow: 1;
}
.pr-grow {
  flex-grow: 1;
}
.pr-caption-bottom {
  caption-side: bottom;
}
.pr--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes pr-spin {

  to {
    transform: rotate(360deg);
  }
}
.pr-animate-spin {
  animation: pr-spin 1s linear infinite;
}
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-cursor-pointer {
  cursor: pointer;
}
.pr-touch-none {
  touch-action: none;
}
.pr-select-none {
  user-select: none;
}
.pr-list-disc {
  list-style-type: disc;
}
.pr-columns-2 {
  columns: 2;
}
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.pr-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
}
.pr-flex-col-reverse {
  flex-direction: column-reverse;
}
.pr-flex-wrap {
  flex-wrap: wrap;
}
.pr-items-start {
  align-items: flex-start;
}
.pr-items-center {
  align-items: center;
}
.pr-justify-start {
  justify-content: flex-start;
}
.pr-justify-end {
  justify-content: flex-end;
}
.pr-justify-center {
  justify-content: center;
}
.pr-justify-between {
  justify-content: space-between;
}
.pr-gap-0 {
  gap: 0px;
}
.pr-gap-0\\.5 {
  gap: 0.125rem;
}
.pr-gap-1 {
  gap: 0.25rem;
}
.pr-gap-1\\.5 {
  gap: 0.375rem;
}
.pr-gap-2 {
  gap: 0.5rem;
}
.pr-gap-2\\.5 {
  gap: 0.625rem;
}
.pr-gap-3 {
  gap: 0.75rem;
}
.pr-gap-4 {
  gap: 1rem;
}
.pr-gap-6 {
  gap: 1.5rem;
}
.pr-gap-x-4 {
  column-gap: 1rem;
}
.pr-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.pr-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.pr-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.pr-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.pr-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.pr-self-stretch {
  align-self: stretch;
}
.pr-overflow-auto {
  overflow: auto;
}
.pr-overflow-hidden {
  overflow: hidden;
}
.pr-overflow-y-auto {
  overflow-y: auto;
}
.pr-overflow-x-hidden {
  overflow-x: hidden;
}
.pr-overflow-y-hidden {
  overflow-y: hidden;
}
.pr-whitespace-normal {
  white-space: normal;
}
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
}
.pr-text-balance {
  text-wrap: balance;
}
.pr-break-words {
  overflow-wrap: break-word;
}
.pr-rounded-full {
  border-radius: 9999px;
}
.pr-rounded-lg {
  border-radius: var(--radius);
}
.pr-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.pr-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
}
.pr-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.pr-rounded-ss-none {
  border-start-start-radius: 0px;
}
.pr-border {
  border-width: 1px;
}
.pr-border-0 {
  border-width: 0px;
}
.pr-border-2 {
  border-width: 2px;
}
.pr-border-b {
  border-bottom-width: 1px;
}
.pr-border-b-0 {
  border-bottom-width: 0px;
}
.pr-border-e {
  border-inline-end-width: 1px;
}
.pr-border-l {
  border-left-width: 1px;
}
.pr-border-l-2 {
  border-left-width: 2px;
}
.pr-border-r-0 {
  border-right-width: 0px;
}
.pr-border-t {
  border-top-width: 1px;
}
.pr-border-t-0 {
  border-top-width: 0px;
}
.pr-border-solid {
  border-style: solid;
}
.pr-border-dashed {
  border-style: dashed;
}
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.pr-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.pr-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.pr-border-input {
  border-color: hsl(var(--input));
}
.pr-border-primary {
  border-color: hsl(var(--primary));
}
.pr-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.pr-border-transparent {
  border-color: transparent;
}
.pr-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.pr-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.pr-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.pr-bg-accent {
  background-color: hsl(var(--accent));
}
.pr-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.pr-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.pr-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.pr-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.pr-bg-background {
  background-color: hsl(var(--background));
}
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.pr-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.pr-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.pr-bg-border {
  background-color: hsl(var(--border));
}
.pr-bg-card {
  background-color: hsl(var(--card));
}
.pr-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.pr-bg-destructive {
  background-color: hsl(var(--destructive));
}
.pr-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.pr-bg-foreground {
  background-color: hsl(var(--foreground));
}
.pr-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.pr-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.pr-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.pr-bg-input {
  background-color: hsl(var(--input));
}
.pr-bg-muted {
  background-color: hsl(var(--muted));
}
.pr-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.pr-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
}
.pr-bg-popover {
  background-color: hsl(var(--popover));
}
.pr-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.pr-bg-primary {
  background-color: hsl(var(--primary));
}
.pr-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.pr-bg-ring {
  background-color: hsl(var(--ring));
}
.pr-bg-secondary {
  background-color: hsl(var(--secondary));
}
.pr-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.pr-bg-transparent {
  background-color: transparent;
}
.pr-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.pr-fill-current {
  fill: currentColor;
}
.pr-p-0 {
  padding: 0px;
}
.pr-p-1 {
  padding: 0.25rem;
}
.pr-p-2 {
  padding: 0.5rem;
}
.pr-p-4 {
  padding: 1rem;
}
.pr-p-6 {
  padding: 1.5rem;
}
.pr-p-8 {
  padding: 2rem;
}
.pr-p-\\[1px\\] {
  padding: 1px;
}
.pr-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.pr-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pr-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.pr-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.pr-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pr-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.pr-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
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
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.pr-pb-2 {
  padding-bottom: 0.5rem;
}
.pr-pb-3 {
  padding-bottom: 0.75rem;
}
.pr-pb-4 {
  padding-bottom: 1rem;
}
.pr-pe-2 {
  padding-inline-end: 0.5rem;
}
.pr-pl-4 {
  padding-left: 1rem;
}
.pr-pl-5 {
  padding-left: 1.25rem;
}
.pr-pl-8 {
  padding-left: 2rem;
}
.pr-pr-2 {
  padding-right: 0.5rem;
}
.pr-pr-3 {
  padding-right: 0.75rem;
}
.pr-pr-4 {
  padding-right: 1rem;
}
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
}
.pr-pt-0 {
  padding-top: 0px;
}
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-center {
  text-align: center;
}
.pr-text-right {
  text-align: right;
}
.pr-text-start {
  text-align: start;
}
.pr-text-end {
  text-align: end;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.pr-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.pr-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.pr-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.pr-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.pr-font-bold {
  font-weight: 700;
}
.pr-font-medium {
  font-weight: 500;
}
.pr-font-normal {
  font-weight: 400;
}
.pr-font-semibold {
  font-weight: 600;
}
.pr-uppercase {
  text-transform: uppercase;
}
.pr-capitalize {
  text-transform: capitalize;
}
.pr-not-italic {
  font-style: normal;
}
.pr-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.pr-leading-9 {
  line-height: 2.25rem;
}
.pr-leading-none {
  line-height: 1;
}
.pr-leading-relaxed {
  line-height: 1.625;
}
.pr-tracking-tight {
  letter-spacing: -0.025em;
}
.pr-tracking-widest {
  letter-spacing: 0.1em;
}
.pr-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.pr-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.pr-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.pr-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.pr-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.pr-text-current {
  color: currentColor;
}
.pr-text-destructive {
  color: hsl(var(--destructive));
}
.pr-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.pr-text-foreground {
  color: hsl(var(--foreground));
}
.pr-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.pr-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.pr-text-inherit {
  color: inherit;
}
.pr-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.pr-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.pr-text-primary {
  color: hsl(var(--primary));
}
.pr-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.pr-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.pr-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.pr-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.pr-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.pr-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
}
.pr-underline {
  text-decoration-line: underline;
}
.pr-underline-offset-4 {
  text-underline-offset: 4px;
}
.pr-opacity-0 {
  opacity: 0;
}
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
}
.pr-opacity-70 {
  opacity: 0.7;
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
.pr-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.pr-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.pr-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-200 {
  transition-duration: 200ms;
}
.pr-duration-300 {
  transition-duration: 300ms;
}
.pr-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.pr-duration-200 {
  animation-duration: 200ms;
}
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.\\*\\:pr-m-4 > * {
  margin: 1rem;
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
.hover\\:pr-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:pr-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:pr-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:pr-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:pr-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:pr-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:pr-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:pr-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\\:pr-underline:hover {
  text-decoration-line: underline;
}
.hover\\:pr-opacity-100:hover {
  opacity: 1;
}
.focus\\:pr-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:pr-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:pr-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:pr-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:pr-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
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
.focus-visible\\:pr-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
}
.focus-visible\\:pr-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:pr-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.disabled\\:pr-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:pr-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
  opacity: 0.5;
}
.pr-group:hover .group-hover\\:pr-opacity-100 {
  opacity: 1;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
  opacity: 0.7;
}
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[side\\=bottom\\]\\:pr-translate-y-1[data-side=bottom] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:pr--translate-x-1[data-side=left] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:pr-translate-x-1[data-side=right] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:pr--translate-y-1[data-side=top] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:pr-translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:pr-translate-x-0[data-state=unchecked] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:pr-bg-accent[data-state=on] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:pr-bg-input[data-state=unchecked] {
  background-color: hsl(var(--input));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:pr-text-accent-foreground[data-state=on] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled=true] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=active\\]\\:pr-shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
}
@media (min-width: 640px) {

  .sm\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:pr-static {
    position: static;
  }

  .sm\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:pr-flex {
    display: flex;
  }

  .sm\\:pr-table-cell {
    display: table-cell;
  }

  .sm\\:pr-hidden {
    display: none;
  }

  .sm\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-gap-4 {
    gap: 1rem;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-border-0 {
    border-width: 0px;
  }

  .sm\\:pr-bg-transparent {
    background-color: transparent;
  }

  .sm\\:pr-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:pr-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:pr-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:pr-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:pr-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:pr-text-left {
    text-align: left;
  }
}
@media (min-width: 768px) {

  .md\\:pr-inline {
    display: inline;
  }

  .md\\:pr-flex {
    display: flex;
  }

  .md\\:pr-table-cell {
    display: table-cell;
  }

  .md\\:pr-h-8 {
    height: 2rem;
  }

  .md\\:pr-w-8 {
    width: 2rem;
  }

  .md\\:pr-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:pr-grow-0 {
    flex-grow: 0;
  }

  .md\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:pr-gap-8 {
    gap: 2rem;
  }

  .md\\:pr-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
@media (min-width: 1024px) {

  .lg\\:pr-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .lg\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:pr-whitespace-nowrap {
    white-space: nowrap;
  }
}
@media (prefers-color-scheme: dark) {

  .dark\\:pr--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>svg\\+div\\]\\:pr-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:pr-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:pr-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:pr-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:pr-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pr-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:pr-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:pr-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
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
`,"top");
//# sourceMappingURL=index.cjs.map
