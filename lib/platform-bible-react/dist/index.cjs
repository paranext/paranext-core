"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),E=require("react"),ne=require("lucide-react"),Ce=require("clsx"),vc=require("tailwind-merge"),Is=require("@radix-ui/react-dropdown-menu"),re=require("platform-bible-utils"),je=require("@tanstack/react-table"),yc=require("@radix-ui/react-slot"),Nn=require("class-variance-authority"),wc=require("@radix-ui/react-select"),Te=require("@mui/material"),xc=require("@radix-ui/react-popover"),Ae=require("cmdk"),kc=require("@radix-ui/react-dialog"),fo=require("@mui/styled-engine"),Nr=require("react-dom"),Ec=require("@radix-ui/react-tabs"),Tc=require("@radix-ui/react-separator"),Nc=require("@radix-ui/react-label"),Sc=require("@radix-ui/react-slider"),Cc=require("@radix-ui/react-switch"),jc=require("@radix-ui/react-toast");function Je(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const N=Je(E),ge=Je(Is),xe=Je(wc),Ar=Je(xc),tt=Je(kc),Oc=Je(Nr),De=Je(Ec),$s=Je(Tc),Ms=Je(Nc),Sr=Je(Sc),mo=Je(Cc),Ue=Je(jc);const Rc=vc.extendTailwindMerge({prefix:"pr-"});function M(...e){return Rc(Ce.clsx(e))}const lr=E.forwardRef(({className:e,type:t,...r},n)=>l.jsx("input",{type:t,className:M("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:n,...r}));lr.displayName="Input";const Pc=E.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:r,handleSubmit:n,...o},a)=>l.jsxs("div",{className:"pr-relative",children:[l.jsx(lr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n(),t(s)},onClick:r,ref:a}),l.jsx(ne.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var _c=Object.defineProperty,Ic=(e,t,r)=>t in e?_c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ae=(e,t,r)=>Ic(e,typeof t!="symbol"?t+"":t,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Oo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],As=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Sa=Uc();function cr(e,t=!0){return t&&(e=e.toUpperCase()),e in Sa?Sa[e]:0}function Ro(e){return cr(e)>0}function $c(e){const t=typeof e=="string"?cr(e):e;return t>=40&&t<=66}function Mc(e){return(typeof e=="string"?cr(e):e)<=39}function Ds(e){return e<=66}function Ac(e){const t=typeof e=="string"?cr(e):e;return Fs(t)&&!Ds(t)}function*Dc(){for(let e=1;e<=Mt.length;e++)yield e}const Lc=1,Ls=Mt.length;function Bc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Po(e,t="***"){const r=e-1;return r<0||r>=Mt.length?t:Mt[r]}function Bs(e){return e<=0||e>Ls?"******":As[e-1]}function Fc(e){return Bs(cr(e))}function Fs(e){const t=typeof e=="number"?Po(e):e;return Ro(t)&&!Oo.includes(t)}function Vc(e){const t=typeof e=="number"?Po(e):e;return Ro(t)&&Oo.includes(t)}function zc(e){return As[e-1].includes("*obsolete*")}function Uc(){const e={};for(let t=0;t<Mt.length;t++)e[Mt[t]]=t+1;return e}const me={allBookIds:Mt,nonCanonicalIds:Oo,bookIdToNumber:cr,isBookIdValid:Ro,isBookNT:$c,isBookOT:Mc,isBookOTNT:Ds,isBookDC:Ac,allBookNumbers:Dc,firstBook:Lc,lastBook:Ls,extraBooks:Bc,bookNumberToId:Po,bookNumberToEnglishName:Bs,bookIdToEnglishName:Fc,isCanonical:Fs,isExtraMaterial:Vc,isObsolete:zc};var Qe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Qe||{});const Fe=class{constructor(t){if(ae(this,"name"),ae(this,"fullPath"),ae(this,"isPresent"),ae(this,"hasVerseSegments"),ae(this,"isCustomized"),ae(this,"baseVersification"),ae(this,"scriptureBooks"),ae(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Qe[t]):(this._type=t,this.name=Qe[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ae(Fe,"Original",new Fe(Qe.Original)),ae(Fe,"Septuagint",new Fe(Qe.Septuagint)),ae(Fe,"Vulgate",new Fe(Qe.Vulgate)),ae(Fe,"English",new Fe(Qe.English)),ae(Fe,"RussianProtestant",new Fe(Qe.RussianProtestant)),ae(Fe,"RussianOrthodox",new Fe(Qe.RussianOrthodox));let Ct=Fe;function Ca(e,t){const r=t[0];for(let n=1;n<t.length;n++)e=e.split(t[n]).join(r);return e.split(r)}var Vs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Vs||{});const Ie=class ce{constructor(t,r,n,o){if(ae(this,"firstChapter"),ae(this,"lastChapter"),ae(this,"lastVerse"),ae(this,"hasSegmentsDefined"),ae(this,"text"),ae(this,"BBBCCCVVVS"),ae(this,"longHashCode"),ae(this,"versification"),ae(this,"rtlMark","‏"),ae(this,"_bookNum",0),ae(this,"_chapterNum",0),ae(this,"_verseNum",0),ae(this,"_verse"),n==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=r!=null&&r instanceof Ct?r:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof Ct?r:void 0;this.setEmpty(a),this._verseNum=t%ce.chapterDigitShifter,this._chapterNum=Math.floor(t%ce.bookDigitShifter/ce.chapterDigitShifter),this._bookNum=Math.floor(t/ce.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof ce){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Ct?t:ce.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&n!=null)if(typeof t=="string"&&typeof r=="string"&&typeof n=="string")this.setEmpty(o),this.updateInternal(t,r,n);else if(typeof t=="number"&&typeof r=="number"&&typeof n=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=n,this.versification=o??ce.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new ce(t),{success:!0,verseRef:r}}catch(n){if(n instanceof vr)return r=new ce,{success:!1,verseRef:r};throw n}}static getBBBCCCVVV(t,r,n){return t%ce.bcvMaxValue*ce.bookDigitShifter+(r>=0?r%ce.bcvMaxValue*ce.chapterDigitShifter:0)+(n>=0?n%ce.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:n,verseNum:o,verse:a,versificationStr:s}=t,c=a||o.toString();let p;return s&&(p=new Ct(s)),r?new ce(r,n.toString(),c,p):new ce}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let n;for(let o=0;o<t.length;o++){if(n=t[o],n<"0"||n>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +n-0,r>ce.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ce.verseRangeSeparator)||this._verse.includes(ce.verseSequenceIndicator))}get book(){return me.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=me.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:n}=ce.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=n,!(this._verseNum>=0)&&({vNum:this._verseNum}=ce.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>me.lastBook)throw new vr("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ct(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ce.verseRangeSeparators,ce.verseSequenceIndicators)}get BBBCCC(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ce.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new Ct(Qe[s])}catch{throw new vr("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new vr("Invalid reference : "+t);const n=r[1].split(":"),o=+n[0];if(n.length!==2||me.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!ce.isVerseParseable(n[1]))throw new vr("Invalid reference : "+t);this.updateInternal(r[0],n[0],n[1])}simplify(){this._verse=void 0}clone(){return new ce(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof ce?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=ce.verseRangeSeparators,n=ce.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=Ca(this._verse,n);for(const s of a.map(c=>Ca(c,r))){const c=this.clone();c.verse=s[0];const p=c.verseNum;if(o.push(c),s.length>1){const f=this.clone();if(f.verse=s[1],!t)for(let m=p+1;m<f.verseNum;m++){const v=new ce(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(v)}o.push(f)}}return o}validateVerse(t,r){if(!this.verse)return this.internalValid;let n=0;for(const o of this.allVerses(!0,t,r)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(n>s)return 3;if(n===s)return 4;n=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>me.lastBook?2:(me.isCanonical(this._bookNum),0)}setEmpty(t=ce.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,n){this.bookNum=me.bookIdToNumber(t),this.chapter=r,this.verse=n}};ae(Ie,"defaultVersification",Ct.English),ae(Ie,"verseRangeSeparator","-"),ae(Ie,"verseSequenceIndicator",","),ae(Ie,"verseRangeSeparators",[Ie.verseRangeSeparator]),ae(Ie,"verseSequenceIndicators",[Ie.verseSequenceIndicator]),ae(Ie,"chapterDigitShifter",1e3),ae(Ie,"bookDigitShifter",Ie.chapterDigitShifter*Ie.chapterDigitShifter),ae(Ie,"bcvMaxValue",Ie.chapterDigitShifter-1),ae(Ie,"ValidStatusType",Vs);let vr=class extends Error{};const Sn=ge.Root,_o=ge.Trigger,zs=ge.Group,Gc=ge.Portal,Hc=ge.Sub,Xc=ge.RadioGroup,Us=E.forwardRef(({className:e,inset:t,children:r,...n},o)=>l.jsxs(ge.SubTrigger,{ref:o,className:M("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...n,children:[r,l.jsx(ne.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Us.displayName=ge.SubTrigger.displayName;const Gs=E.forwardRef(({className:e,...t},r)=>l.jsx(ge.SubContent,{ref:r,className:M("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Gs.displayName=ge.SubContent.displayName;const zr=E.forwardRef(({className:e,sideOffset:t=4,...r},n)=>l.jsx(ge.Portal,{children:l.jsx(ge.Content,{ref:n,sideOffset:t,className:M("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));zr.displayName=ge.Content.displayName;const Io=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Item,{ref:n,className:M("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...r}));Io.displayName=ge.Item.displayName;const Cn=E.forwardRef(({className:e,children:t,checked:r,...n},o)=>l.jsxs(ge.CheckboxItem,{ref:o,className:M("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:r,...n,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Cn.displayName=ge.CheckboxItem.displayName;const $o=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(ge.RadioItem,{ref:n,className:M("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(ge.ItemIndicator,{children:l.jsx(ne.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));$o.displayName=ge.RadioItem.displayName;const pr=E.forwardRef(({className:e,inset:t,...r},n)=>l.jsx(ge.Label,{ref:n,className:M("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...r}));pr.displayName=ge.Label.displayName;const Ur=E.forwardRef(({className:e,...t},r)=>l.jsx(ge.Separator,{ref:r,className:M("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ur.displayName=ge.Separator.displayName;function Hs({className:e,...t}){return l.jsx("span",{className:M("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Hs.displayName="DropdownMenuShortcut";const qc=E.forwardRef(({bookId:e,handleSelectBook:t,isSelected:r,handleHighlightBook:n,handleKeyDown:o,bookType:a,children:s},c)=>l.jsxs(Io,{ref:c,textValue:e,className:M("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":r}),onSelect:p=>{p.preventDefault(),t()},onKeyDown:p=>{o(p)},onFocus:n,onMouseMove:n,children:[l.jsx("span",{className:M("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":r,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:me.bookIdToEnglishName(e)}),r&&l.jsx("div",{children:s})]},e));function Wc({handleSelectChapter:e,endChapter:t,activeChapter:r,highlightedChapter:n,handleHighlightedChapter:o}){const a=Array.from({length:t},(c,p)=>p+1),s=E.useCallback(c=>{o(c)},[o]);return l.jsx("div",{className:M("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(c=>l.jsx("div",{className:M("pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":c===r,"pr-bg-amber-200":c===n}),onClick:p=>{p.preventDefault(),p.stopPropagation(),e(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&e(c)},tabIndex:0,onMouseMove:()=>s(c),children:c},c))})}function Yc({handleSort:e,handleLocationHistory:t,handleBookmarks:r}){return l.jsxs(pr,{className:"pr-flex pr-justify-between",children:[l.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),l.jsxs("div",{className:"pr-flex pr-items-center",children:[l.jsx(ne.ArrowDownWideNarrow,{onClick:e,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(ne.Clock,{onClick:t,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"}),l.jsx(ne.Bookmark,{onClick:r,className:"pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"})]})]})}const Rr=me.allBookIds,Kc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ja=["OT","NT","DC"],Jc=32+32+32,Zc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Qc=e=>({OT:Rr.filter(r=>me.isBookOT(r)),NT:Rr.filter(r=>me.isBookNT(r)),DC:Rr.filter(r=>me.isBookDC(r))})[e],yr=e=>re.getChaptersForBook(me.bookIdToNumber(e));function ep(){return Rr.map(t=>me.bookIdToEnglishName(t))}function tp(e){return ep().includes(e)}function rp(e){const t=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(tp(t))return Rr.find(n=>me.bookIdToEnglishName(n)===t)}function np({scrRef:e,handleSubmit:t}){const[r,n]=E.useState(""),[o,a]=E.useState(me.bookNumberToId(e.bookNum)),[s,c]=E.useState(e.chapterNum??0),[p,f]=E.useState(me.bookNumberToId(e.bookNum)),[m,v]=E.useState(!1),[g,d]=E.useState(m),h=E.useRef(void 0),u=E.useRef(void 0),b=E.useRef(void 0),x=E.useCallback(T=>Qc(T).filter(R=>{const _=me.bookIdToEnglishName(R).toLowerCase(),z=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return _.includes(z)||R.toLowerCase().includes(z)}),[r]),O=T=>{n(T)},w=E.useRef(!1),k=E.useCallback(T=>{if(w.current){w.current=!1;return}v(T)},[]),y=E.useCallback((T,R,_,z)=>{if(c(me.bookNumberToId(e.bookNum)!==T?1:e.chapterNum),R||yr(T)===-1){t({bookNum:me.bookIdToNumber(T),chapterNum:_||1,verseNum:z||1}),v(!1),n("");return}a(o!==T?T:""),v(!R)},[t,e.bookNum,e.chapterNum,o]),S=T=>{T<=0||T>yr(o)||y(o,!0,T)},C=E.useCallback(()=>{Zc.forEach(T=>{const R=r.match(T);if(R){const[_,z=void 0,G=void 0]=R.slice(1),D=rp(_);(me.isBookIdValid(_)||D)&&y(D??_,!0,z?parseInt(z,10):1,G?parseInt(G,10):1)}})},[y,r]),I=E.useCallback(T=>{m?(T.key==="ArrowDown"||T.key==="ArrowUp")&&(typeof b<"u"&&b.current!==null?b.current.focus():typeof u<"u"&&u.current!==null&&u.current.focus(),T.preventDefault()):v(!0)},[m]),A=T=>{const{key:R}=T;R==="ArrowRight"||R==="ArrowLeft"||R==="ArrowDown"||R==="ArrowUp"||R==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:R})),h.current.focus())},F=T=>{const{key:R}=T;if(p===o){if(R==="Enter"){T.preventDefault(),y(o,!0,s);return}let _=0;if(R==="ArrowRight")if(s<yr(p))_=1;else{T.preventDefault();return}else if(R==="ArrowLeft")if(s>1)_=-1;else{T.preventDefault();return}else R==="ArrowDown"?_=6:R==="ArrowUp"&&(_=-6);s+_<=0||s+_>yr(p)?c(0):_!==0&&(c(s+_),T.preventDefault())}};return E.useEffect(()=>{o===p?o===me.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[p,e.bookNum,e.chapterNum,o]),E.useLayoutEffect(()=>{d(m)},[m]),E.useLayoutEffect(()=>{const T=setTimeout(()=>{if(g&&u.current&&b.current){const _=b.current.offsetTop-Jc;u.current.scrollTo({top:_,behavior:"instant"})}},10);return()=>{clearTimeout(T)}},[g]),l.jsx("div",{className:"pr-twp pr-flex",children:l.jsxs(Sn,{modal:!1,open:m,onOpenChange:k,children:[l.jsx(_o,{asChild:!0,children:l.jsx(Pc,{ref:h,value:r,handleSearch:O,handleKeyDown:I,handleOnClick:()=>{a(me.bookNumberToId(e.bookNum)),f(me.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),v(!0),h.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:C,placeholder:`${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),l.jsxs(zr,{className:"pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:A,align:"start",ref:u,children:[l.jsx(Yc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ja.map((T,R)=>x(T).length>0&&l.jsxs("div",{children:[l.jsx(pr,{className:"pr-font-semibold pr-text-foreground/80",children:Kc[T]}),x(T).map(_=>l.jsx("div",{children:l.jsx(qc,{bookId:_,handleSelectBook:()=>y(_,!1),isSelected:o===_,handleHighlightBook:()=>f(_),handleKeyDown:F,bookType:T,ref:z=>{o===_&&(b.current=z)},children:l.jsx(Wc,{handleSelectChapter:S,endChapter:yr(_),activeChapter:e.bookNum===me.bookIdToNumber(_)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:z=>{c(z)}})})},_)),ja.length-1!==R?l.jsx(Ur,{}):void 0]},T))]})]})})}const Xs=Nn.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=E.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...o},a)=>{const s=n?yc.Slot:"button";return l.jsx(s,{className:M(Xs({variant:t,size:r,className:e})),ref:a,...o})});ve.displayName="Button";function op({table:e}){return l.jsxs(Sn,{children:[l.jsx(Is.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ve,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[l.jsx(ne.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),l.jsxs(zr,{align:"end",className:"pr-w-[150px]",children:[l.jsx(pr,{children:"Toggle columns"}),l.jsx(Ur,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>l.jsx(Cn,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const Qt=xe.Root,qs=xe.Group,er=xe.Value,At=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Trigger,{ref:n,className:M("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...r,children:[t,l.jsx(xe.Icon,{asChild:!0,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));At.displayName=xe.Trigger.displayName;const Mo=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollUpButton,{ref:r,className:M("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Mo.displayName=xe.ScrollUpButton.displayName;const Ao=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.ScrollDownButton,{ref:r,className:M("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:l.jsx(ne.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ao.displayName=xe.ScrollDownButton.displayName;const Dt=E.forwardRef(({className:e,children:t,position:r="popper",...n},o)=>l.jsx(xe.Portal,{children:l.jsxs(xe.Content,{ref:o,className:M("pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:r,...n,children:[l.jsx(Mo,{}),l.jsx(xe.Viewport,{className:M("pr-p-1",r==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),l.jsx(Ao,{})]})}));Dt.displayName=xe.Content.displayName;const Ws=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.Label,{ref:r,className:M("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ws.displayName=xe.Label.displayName;const He=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(xe.Item,{ref:n,className:M("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...r,children:[l.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:l.jsx(xe.ItemIndicator,{children:l.jsx(ne.Check,{className:"pr-h-4 pr-w-4"})})}),l.jsx(xe.ItemText,{children:t})]}));He.displayName=xe.Item.displayName;const Ys=E.forwardRef(({className:e,...t},r)=>l.jsx(xe.Separator,{ref:r,className:M("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Ys.displayName=xe.Separator.displayName;function ap({table:e}){return l.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[l.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),l.jsxs(Qt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[l.jsx(At,{className:"pr-h-8 pr-w-[70px]",children:l.jsx(er,{placeholder:e.getState().pagination.pageSize})}),l.jsx(Dt,{side:"top",children:[10,20,30,40,50].map(t=>l.jsx(He,{value:`${t}`,children:t},t))})]})]}),l.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),l.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),l.jsx(ne.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),l.jsx(ne.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),l.jsx(ne.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[l.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),l.jsx(ne.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}const Gr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("div",{className:M("pr-twp pr-relative pr-w-full",{"pr-overflow-auto":!t}),children:l.jsx("table",{ref:n,className:M("pr-w-full pr-caption-bottom pr-text-sm",e),...r})}));Gr.displayName="Table";const Hr=E.forwardRef(({className:e,stickyHeader:t,...r},n)=>l.jsx("thead",{ref:n,className:M({"pr-sticky pr-top-0 pr-bg-muted":t},"[&_tr]:pr-border-b",e),...r}));Hr.displayName="TableHeader";const Xr=E.forwardRef(({className:e,...t},r)=>l.jsx("tbody",{ref:r,className:M("[&_tr:last-child]:pr-border-0",e),...t}));Xr.displayName="TableBody";const Ks=E.forwardRef(({className:e,...t},r)=>l.jsx("tfoot",{ref:r,className:M("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));Ks.displayName="TableFooter";const ct=E.forwardRef(({className:e,...t},r)=>l.jsx("tr",{ref:r,className:M("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));ct.displayName="TableRow";const tr=E.forwardRef(({className:e,...t},r)=>l.jsx("th",{ref:r,className:M("pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",e),...t}));tr.displayName="TableHead";const Lt=E.forwardRef(({className:e,...t},r)=>l.jsx("td",{ref:r,className:M("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0",e),...t}));Lt.displayName="TableCell";const Js=E.forwardRef(({className:e,...t},r)=>l.jsx("caption",{ref:r,className:M("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Js.displayName="TableCaption";function Zs({columns:e,data:t,enablePagination:r=!1,showPaginationControls:n=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:s=()=>{}}){var b;const[c,p]=E.useState([]),[f,m]=E.useState([]),[v,g]=E.useState({}),[d,h]=E.useState({}),u=je.useReactTable({data:t,columns:e,getCoreRowModel:je.getCoreRowModel(),...r&&{getPaginationRowModel:je.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:je.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:je.getFilteredRowModel(),onColumnVisibilityChange:g,onRowSelectionChange:h,state:{sorting:c,columnFilters:f,columnVisibility:v,rowSelection:d}});return l.jsxs("div",{className:"pr-twp pr-font-sans",children:[o&&l.jsx(op,{table:u}),l.jsxs(Gr,{stickyHeader:a,children:[l.jsx(Hr,{stickyHeader:a,children:u.getHeaderGroups().map(x=>l.jsx(ct,{children:x.headers.map(O=>l.jsx(tr,{children:O.isPlaceholder?void 0:je.flexRender(O.column.columnDef.header,O.getContext())},O.id))},x.id))}),l.jsx(Xr,{children:(b=u.getRowModel().rows)!=null&&b.length?u.getRowModel().rows.map(x=>l.jsx(ct,{onClick:()=>s(x,u),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(O=>l.jsx(Lt,{children:je.flexRender(O.column.columnDef.cell,O.getContext())},O.id))},x.id)):l.jsx(ct,{children:l.jsx(Lt,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]}),r&&l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>u.previousPage(),disabled:!u.getCanPreviousPage(),children:"Previous"}),l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>u.nextPage(),disabled:!u.getCanNextPage(),children:"Next"})]}),r&&n&&l.jsx(ap,{table:u})]})}const sp=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Oa=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},Ra=(e,t,r,n)=>{if(!e||e===""||t==="")return[];const o=[],a=sp(e);let s=n.chapterNum,c=n.verseNum,p=0;return a.forEach(f=>{f.startsWith("\\id")&&(s=0,c=0),f.startsWith("\\c")&&(s=Oa(f),c=0),f.startsWith("\\v")&&(c=Oa(f),s===0&&(s=n.chapterNum));const m=r(f,t);for(let v=0;v<m.length;v++){const g={reference:{...n,chapterNum:s!==void 0?+s:-1,verseNum:c!==void 0?+c:-1},snippet:f,key:p};p+=1,o.push(g)}}),o};function ip({selectedItem:e,text:t,extractItems:r,scriptureReference:n,setScriptureReference:o,localizedStrings:a}){const s=a["%webView_inventory_occurrences_table_header_reference%"],c=a["%webView_inventory_occurrences_table_header_occurrence%"],[p,f]=E.useState(Ra(t,e,r,n));return E.useEffect(()=>f(Ra(t,e,r,n)),[t,e,n,r]),l.jsxs(Gr,{stickyHeader:!0,children:[l.jsx(Hr,{stickyHeader:!0,children:l.jsxs(ct,{children:[l.jsx(tr,{children:s}),l.jsx(tr,{children:c})]})}),l.jsx(Xr,{children:p.map(m=>l.jsxs(ct,{onClick:()=>{o(m.reference)},children:[l.jsx(Lt,{children:`${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}`}),l.jsx(Lt,{children:m.snippet})]},m.key))})]})}const lp=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_book%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),jn=e=>e==="asc"?l.jsx(ne.ArrowUpIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):e==="desc"?l.jsx(ne.ArrowDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}):l.jsx(ne.ArrowUpDownIcon,{className:"pr-ms-2 pr-h-4 pr-w-4"}),cp=(e,t,r)=>{let n=e;return t!=="all"&&(n=n.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),r!==""&&(n=n.filter(o=>o.item.includes(r))),n},pp=(e,t,r)=>{const n=[],o=t(e);for(let a=0;a<o.length;a++){const s=o[a],c=n.find(p=>p.item===s);if(c)c.count+=1;else{const p={item:s,count:1,status:r(s)};n.push(p)}}return n},bt=(e,t)=>e[t]??t;function dp({scriptureReference:e,setScriptureReference:t,localizedStrings:r,extractItems:n,approvedItems:o,onApprovedItemsChange:a,unapprovedItems:s,onUnapprovedItemsChange:c,text:p,scope:f,onScopeChange:m,getColumns:v}){const g=bt(r,"%webView_inventory_all%"),d=bt(r,"%webView_inventory_approved%"),h=bt(r,"%webView_inventory_unapproved%"),u=bt(r,"%webView_inventory_unknown%"),b=bt(r,"%webView_inventory_scope_book%"),x=bt(r,"%webView_inventory_scope_chapter%"),O=bt(r,"%webView_inventory_scope_verse%"),w=bt(r,"%webView_inventory_filter_text%"),[k,y]=E.useState([]),[S,C]=E.useState("all"),[I,A]=E.useState(""),[F,T]=E.useState(""),R=E.useCallback((V,j)=>{y(q=>{let U=[];return V.forEach(Y=>{U=q.map(W=>W.item===Y&&W.status!==j?{...W,status:j}:W)}),U});let L=[...o];V.forEach(q=>{j==="approved"?L.includes(q)||L.push(q):L=L.filter(U=>U!==q)}),a(L);let X=[...s];V.forEach(q=>{j==="unapproved"?X.includes(q)||X.push(q):X=X.filter(U=>U!==q)}),c(X)},[o,a,s,c]),_=E.useCallback(V=>o.includes(V)?"approved":s.includes(V)?"unapproved":"unknown",[o,s]);E.useEffect(()=>{p&&y(pp(p,n,_))},[n,p,_]);const z=E.useMemo(()=>cp(k,S,I),[k,S,I]);E.useEffect(()=>{T("")},[z]);const G=(V,j)=>{j.toggleAllRowsSelected(!1),V.toggleSelected(void 0),T(V.getValue("item"))},D=E.useMemo(()=>v(R),[v,R]),H=V=>{if(V==="book"||V==="chapter"||V==="verse")m(V);else throw new Error(`Invalid scope value: ${V}`)},ee=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")C(V);else throw new Error(`Invalid status filter value: ${V}`)};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-flex-col",children:[l.jsxs("div",{className:"pr-flex",children:[l.jsxs(Qt,{onValueChange:V=>ee(V),defaultValue:S,children:[l.jsx(At,{className:"pr-m-1",children:l.jsx(er,{placeholder:"Select filter"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(He,{value:"all",children:g}),l.jsx(He,{value:"approved",children:d}),l.jsx(He,{value:"unapproved",children:h}),l.jsx(He,{value:"unknown",children:u})]})]}),l.jsxs(Qt,{onValueChange:V=>H(V),defaultValue:f,children:[l.jsx(At,{className:"pr-m-1",children:l.jsx(er,{placeholder:"Select scope"})}),l.jsxs(Dt,{className:"pr-font-sans",children:[l.jsx(He,{value:"book",children:b}),l.jsx(He,{value:"chapter",children:x}),l.jsx(He,{value:"verse",children:O})]})]}),l.jsx(lr,{className:"pr-m-1 pr-rounded-md pr-border",placeholder:w,value:I,onChange:V=>{A(V.target.value)}})]}),l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(Zs,{columns:D,data:z,onRowClickHandler:G,stickyHeader:!0})}),F!==""&&l.jsx("div",{className:"pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border",children:l.jsx(ip,{selectedItem:F,text:p,extractItems:n,scriptureReference:e,setScriptureReference:V=>t(V),localizedStrings:r})})]})}const up=e=>({accessorKey:"item",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,jn(t.getIsSorted())]})}),fp=e=>({accessorKey:"count",header:({column:t})=>l.jsxs(ve,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,jn(t.getIsSorted())]})}),mp=(e,t)=>({accessorKey:"status",header:({column:r,table:n})=>{const o=n.getSelectedRowModel().rows,a=[];return o.forEach(s=>{a.push(s.getValue("item"))}),l.jsxs("div",{className:"pr-flex pr-justify-start",children:[l.jsxs(ve,{className:"pr-mt-1",variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,jn(r.getIsSorted())]}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(ne.CircleCheckIcon,{onClick:()=>{t(a,"approved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(ne.CircleXIcon,{onClick:()=>{t(a,"unapproved")}})}),l.jsx(ve,{className:"pr-m-1",children:l.jsx(ne.CircleHelpIcon,{onClick:()=>{t(a,"unknown")}})})]})},cell:({row:r})=>{switch(r.getValue("status")){case"approved":return l.jsx(ne.CircleCheckIcon,{});case"unapproved":return l.jsx(ne.CircleXIcon,{});case"unknown":default:return l.jsx(ne.CircleHelpIcon,{})}}}),Xn={[re.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[re.getLocalizeKeyForScrollGroupId(0)]:"A",[re.getLocalizeKeyForScrollGroupId(1)]:"B",[re.getLocalizeKeyForScrollGroupId(2)]:"C",[re.getLocalizeKeyForScrollGroupId(3)]:"D",[re.getLocalizeKeyForScrollGroupId(4)]:"E",[re.getLocalizeKeyForScrollGroupId(5)]:"F",[re.getLocalizeKeyForScrollGroupId(6)]:"G",[re.getLocalizeKeyForScrollGroupId(7)]:"H",[re.getLocalizeKeyForScrollGroupId(8)]:"I",[re.getLocalizeKeyForScrollGroupId(9)]:"J",[re.getLocalizeKeyForScrollGroupId(10)]:"K",[re.getLocalizeKeyForScrollGroupId(11)]:"L",[re.getLocalizeKeyForScrollGroupId(12)]:"M",[re.getLocalizeKeyForScrollGroupId(13)]:"N",[re.getLocalizeKeyForScrollGroupId(14)]:"O",[re.getLocalizeKeyForScrollGroupId(15)]:"P",[re.getLocalizeKeyForScrollGroupId(16)]:"Q",[re.getLocalizeKeyForScrollGroupId(17)]:"R",[re.getLocalizeKeyForScrollGroupId(18)]:"S",[re.getLocalizeKeyForScrollGroupId(19)]:"T",[re.getLocalizeKeyForScrollGroupId(20)]:"U",[re.getLocalizeKeyForScrollGroupId(21)]:"V",[re.getLocalizeKeyForScrollGroupId(22)]:"W",[re.getLocalizeKeyForScrollGroupId(23)]:"X",[re.getLocalizeKeyForScrollGroupId(24)]:"Y",[re.getLocalizeKeyForScrollGroupId(25)]:"Z"};function hp({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:n={}}){const o={...Xn,...Object.fromEntries(Object.entries(n).map(([a,s])=>[a,a===s&&a in Xn?Xn[a]:s]))};return l.jsxs(Qt,{value:`${t}`,onValueChange:a=>r(a==="undefined"?void 0:parseInt(a,10)),children:[l.jsx(At,{className:"pr-w-auto",children:l.jsx(er,{placeholder:o[re.getLocalizeKeyForScrollGroupId(t)]??t})}),l.jsx(Dt,{style:{zIndex:250},children:e.map(a=>l.jsx(He,{value:`${a}`,children:o[re.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const gp=Ar.Root,bp=Ar.Trigger,Qs=E.forwardRef(({className:e,align:t="center",sideOffset:r=4,...n},o)=>l.jsx(Ar.Portal,{children:l.jsx(Ar.Content,{ref:o,align:t,sideOffset:r,className:M("pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));Qs.displayName=Ar.Content.displayName;const vp=tt.Portal,ei=E.forwardRef(({className:e,...t},r)=>l.jsx(tt.Overlay,{ref:r,className:M("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));ei.displayName=tt.Overlay.displayName;const yp=E.forwardRef(({className:e,children:t,...r},n)=>l.jsxs(vp,{children:[l.jsx(ei,{}),l.jsxs(tt.Content,{ref:n,className:M("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...r,children:[t,l.jsxs(tt.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[l.jsx(ne.X,{className:"pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));yp.displayName=tt.Content.displayName;const wp=E.forwardRef(({className:e,...t},r)=>l.jsx(tt.Title,{ref:r,className:M("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));wp.displayName=tt.Title.displayName;const xp=E.forwardRef(({className:e,...t},r)=>l.jsx(tt.Description,{ref:r,className:M("pr-text-sm pr-text-muted-foreground",e),...t}));xp.displayName=tt.Description.displayName;const ti=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Command,{ref:r,className:M("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));ti.displayName=Ae.Command.displayName;const ri=E.forwardRef(({className:e,...t},r)=>l.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3",children:[l.jsx(ne.Search,{className:"pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),l.jsx(Ae.Command.Input,{ref:r,className:M("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));ri.displayName=Ae.Command.Input.displayName;const ni=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Command.List,{ref:r,className:M("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));ni.displayName=Ae.Command.List.displayName;const oi=E.forwardRef((e,t)=>l.jsx(Ae.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));oi.displayName=Ae.Command.Empty.displayName;const kp=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Command.Group,{ref:r,className:M("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));kp.displayName=Ae.Command.Group.displayName;const Ep=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Command.Separator,{ref:r,className:M("pr--mx-1 pr-h-px pr-bg-border",e),...t}));Ep.displayName=Ae.Command.Separator.displayName;const ai=E.forwardRef(({className:e,...t},r)=>l.jsx(Ae.Command.Item,{ref:r,className:M("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));ai.displayName=Ae.Command.Item.displayName;function Tp(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function ho({id:e,options:t=[],className:r,value:n,onChange:o=()=>{},getOptionLabel:a=Tp,buttonPlaceholder:s="",textPlaceholder:c="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",dir:m="ltr",...v}){const[g,d]=E.useState(!1);return l.jsxs(gp,{open:g,onOpenChange:d,...v,children:[l.jsx(bp,{asChild:!0,children:l.jsxs(ve,{variant:f,role:"combobox","aria-expanded":g,id:e,className:M("pr-w-[200px] pr-justify-between",r),children:[n?a(n):s,l.jsx(ne.ChevronsUpDown,{className:"pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),l.jsx(Qs,{className:"pr-w-[200px] pr-p-0",dir:m,children:l.jsxs(ti,{children:[l.jsx(ri,{dir:m,placeholder:c,className:"pr-text-inherit"}),l.jsx(oi,{children:p}),l.jsx(ni,{children:t.map(h=>l.jsxs(ai,{value:a(h),onSelect:()=>{o(h),d(!1)},children:[l.jsx(ne.Check,{className:M("pr-me-2 pr-h-4 pr-w-4",{"pr-opacity-0":!n||a(n)!==a(h)})}),a(h)]},a(h)))})]})})]})}function Np({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:r=!1,chapterCount:n}){const[o,a]=E.useState(1),[s,c]=E.useState(n),[p,f]=E.useState(Array.from({length:n},(g,d)=>d+1));E.useEffect(()=>{a(1),e(1),c(n),t(n),f(Array.from({length:n},(g,d)=>d+1))},[n,t,e]);const m=g=>{a(g),e(g),g>s&&(c(g),t(g))},v=g=>{c(g),t(g),g<o&&(a(g),e(g))};return l.jsxs(l.Fragment,{children:[l.jsx(Te.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:r,control:l.jsx(ho,{onChange:m,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),l.jsx(Te.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:r,control:l.jsx(ho,{onChange:v,className:"book-selection-chapter",options:p,getOptionLabel:g=>g.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var Pt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Pt||{});function si({id:e,isChecked:t,labelText:r="",labelPosition:n=Pt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:c=!1,className:p,onChange:f}){const m=l.jsx(Te.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${c?"error":""} ${p??""}`,onChange:f});let v;if(r){const g=n===Pt.Before||n===Pt.Above,d=l.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${p??""}`,children:r}),h=n===Pt.Before||n===Pt.After,u=h?d:l.jsx("div",{children:d}),b=h?m:l.jsx("div",{children:m});v=l.jsxs(Te.FormLabel,{className:`papi-checkbox ${n.toString()}`,disabled:s,error:c,children:[g&&u,b,!g&&u]})}else v=m;return v}function Sp({id:e,className:t,legend:r,listItems:n,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return l.jsxs("fieldset",{id:e,className:t,children:[r&&l.jsx("legend",{children:r}),n.map(c=>l.jsx(si,{className:"check-item",isChecked:o.includes(c),labelText:s?s(c):c,onChange:p=>a(c,p.target.checked)},c))]})}function Cp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jp(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}),r}var Do={},ii={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ii);var Op=ii.exports,qn={};function dr(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...n){return e(...n)||t(...n)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},P.apply(this,arguments)}function _t(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function li(e){if(!_t(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=li(e[r])}),t}function pt(e,t,r={clone:!0}){const n=r.clone?P({},e):e;return _t(e)&&_t(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(_t(t[o])&&o in e&&_t(e[o])?n[o]=pt(e[o],t[o],r):r.clone?n[o]=_t(t[o])?li(t[o]):t[o]:n[o]=t[o])}),n}var go={exports:{}},nn={exports:{}},pe={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pa;function Rp(){if(Pa)return pe;Pa=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function w(y){if(typeof y=="object"&&y!==null){var S=y.$$typeof;switch(S){case t:switch(y=y.type,y){case p:case f:case n:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case c:case m:case h:case d:case s:return y;default:return S}}case r:return S}}}function k(y){return w(y)===f}return pe.AsyncMode=p,pe.ConcurrentMode=f,pe.ContextConsumer=c,pe.ContextProvider=s,pe.Element=t,pe.ForwardRef=m,pe.Fragment=n,pe.Lazy=h,pe.Memo=d,pe.Portal=r,pe.Profiler=a,pe.StrictMode=o,pe.Suspense=v,pe.isAsyncMode=function(y){return k(y)||w(y)===p},pe.isConcurrentMode=k,pe.isContextConsumer=function(y){return w(y)===c},pe.isContextProvider=function(y){return w(y)===s},pe.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},pe.isForwardRef=function(y){return w(y)===m},pe.isFragment=function(y){return w(y)===n},pe.isLazy=function(y){return w(y)===h},pe.isMemo=function(y){return w(y)===d},pe.isPortal=function(y){return w(y)===r},pe.isProfiler=function(y){return w(y)===a},pe.isStrictMode=function(y){return w(y)===o},pe.isSuspense=function(y){return w(y)===v},pe.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===f||y===a||y===o||y===v||y===g||typeof y=="object"&&y!==null&&(y.$$typeof===h||y.$$typeof===d||y.$$typeof===s||y.$$typeof===c||y.$$typeof===m||y.$$typeof===b||y.$$typeof===x||y.$$typeof===O||y.$$typeof===u)},pe.typeOf=w,pe}var de={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a;function Pp(){return _a||(_a=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,n=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,p=e?Symbol.for("react.async_mode"):60111,f=e?Symbol.for("react.concurrent_mode"):60111,m=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,u=e?Symbol.for("react.block"):60121,b=e?Symbol.for("react.fundamental"):60117,x=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function w(B){return typeof B=="string"||typeof B=="function"||B===n||B===f||B===a||B===o||B===v||B===g||typeof B=="object"&&B!==null&&(B.$$typeof===h||B.$$typeof===d||B.$$typeof===s||B.$$typeof===c||B.$$typeof===m||B.$$typeof===b||B.$$typeof===x||B.$$typeof===O||B.$$typeof===u)}function k(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var $=B.type;switch($){case p:case f:case n:case a:case o:case v:return $;default:var le=$&&$.$$typeof;switch(le){case c:case m:case h:case d:case s:return le;default:return te}}case r:return te}}}var y=p,S=f,C=c,I=s,A=t,F=m,T=n,R=h,_=d,z=r,G=a,D=o,H=v,ee=!1;function V(B){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),j(B)||k(B)===p}function j(B){return k(B)===f}function L(B){return k(B)===c}function X(B){return k(B)===s}function q(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function U(B){return k(B)===m}function Y(B){return k(B)===n}function W(B){return k(B)===h}function J(B){return k(B)===d}function K(B){return k(B)===r}function Z(B){return k(B)===a}function Q(B){return k(B)===o}function ie(B){return k(B)===v}de.AsyncMode=y,de.ConcurrentMode=S,de.ContextConsumer=C,de.ContextProvider=I,de.Element=A,de.ForwardRef=F,de.Fragment=T,de.Lazy=R,de.Memo=_,de.Portal=z,de.Profiler=G,de.StrictMode=D,de.Suspense=H,de.isAsyncMode=V,de.isConcurrentMode=j,de.isContextConsumer=L,de.isContextProvider=X,de.isElement=q,de.isForwardRef=U,de.isFragment=Y,de.isLazy=W,de.isMemo=J,de.isPortal=K,de.isProfiler=Z,de.isStrictMode=Q,de.isSuspense=ie,de.isValidElementType=w,de.typeOf=k}()),de}var Ia;function ci(){return Ia||(Ia=1,process.env.NODE_ENV==="production"?nn.exports=Rp():nn.exports=Pp()),nn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Wn,$a;function _p(){if($a)return Wn;$a=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var p=Object.getOwnPropertyNames(s).map(function(m){return s[m]});if(p.join("")!=="0123456789")return!1;var f={};return"abcdefghijklmnopqrst".split("").forEach(function(m){f[m]=m}),Object.keys(Object.assign({},f)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Wn=o()?Object.assign:function(a,s){for(var c,p=n(a),f,m=1;m<arguments.length;m++){c=Object(arguments[m]);for(var v in c)t.call(c,v)&&(p[v]=c[v]);if(e){f=e(c);for(var g=0;g<f.length;g++)r.call(c,f[g])&&(p[f[g]]=c[f[g]])}}return p},Wn}var Yn,Ma;function Lo(){if(Ma)return Yn;Ma=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Yn=e,Yn}var Kn,Aa;function pi(){return Aa||(Aa=1,Kn=Function.call.bind(Object.prototype.hasOwnProperty)),Kn}var Jn,Da;function Ip(){if(Da)return Jn;Da=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Lo(),r={},n=pi();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,c,p,f){if(process.env.NODE_ENV!=="production"){for(var m in a)if(n(a,m)){var v;try{if(typeof a[m]!="function"){var g=Error((p||"React class")+": "+c+" type `"+m+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[m]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}v=a[m](s,m,p,c,null,t)}catch(h){v=h}if(v&&!(v instanceof Error)&&e((p||"React class")+": type specification of "+c+" `"+m+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in r)){r[v.message]=!0;var d=f?f():"";e("Failed "+c+" type: "+v.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Jn=o,Jn}var Zn,La;function $p(){if(La)return Zn;La=1;var e=ci(),t=_p(),r=Lo(),n=pi(),o=Ip(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(c){var p="Warning: "+c;typeof console<"u"&&console.error(p);try{throw new Error(p)}catch{}});function s(){return null}return Zn=function(c,p){var f=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function v(j){var L=j&&(f&&j[f]||j[m]);if(typeof L=="function")return L}var g="<<anonymous>>",d={array:x("array"),bigint:x("bigint"),bool:x("boolean"),func:x("function"),number:x("number"),object:x("object"),string:x("string"),symbol:x("symbol"),any:O(),arrayOf:w,element:k(),elementType:y(),instanceOf:S,node:F(),objectOf:I,oneOf:C,oneOfType:A,shape:R,exact:_};function h(j,L){return j===L?j!==0||1/j===1/L:j!==j&&L!==L}function u(j,L){this.message=j,this.data=L&&typeof L=="object"?L:{},this.stack=""}u.prototype=Error.prototype;function b(j){if(process.env.NODE_ENV!=="production")var L={},X=0;function q(Y,W,J,K,Z,Q,ie){if(K=K||g,Q=Q||J,ie!==r){if(p){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=K+":"+J;!L[te]&&X<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+K+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),L[te]=!0,X++)}}return W[J]==null?Y?W[J]===null?new u("The "+Z+" `"+Q+"` is marked as required "+("in `"+K+"`, but its value is `null`.")):new u("The "+Z+" `"+Q+"` is marked as required in "+("`"+K+"`, but its value is `undefined`.")):null:j(W,J,K,Z,Q)}var U=q.bind(null,!1);return U.isRequired=q.bind(null,!0),U}function x(j){function L(X,q,U,Y,W,J){var K=X[q],Z=D(K);if(Z!==j){var Q=H(K);return new u("Invalid "+Y+" `"+W+"` of type "+("`"+Q+"` supplied to `"+U+"`, expected ")+("`"+j+"`."),{expectedType:j})}return null}return b(L)}function O(){return b(s)}function w(j){function L(X,q,U,Y,W){if(typeof j!="function")return new u("Property `"+W+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var J=X[q];if(!Array.isArray(J)){var K=D(J);return new u("Invalid "+Y+" `"+W+"` of type "+("`"+K+"` supplied to `"+U+"`, expected an array."))}for(var Z=0;Z<J.length;Z++){var Q=j(J,Z,U,Y,W+"["+Z+"]",r);if(Q instanceof Error)return Q}return null}return b(L)}function k(){function j(L,X,q,U,Y){var W=L[X];if(!c(W)){var J=D(W);return new u("Invalid "+U+" `"+Y+"` of type "+("`"+J+"` supplied to `"+q+"`, expected a single ReactElement."))}return null}return b(j)}function y(){function j(L,X,q,U,Y){var W=L[X];if(!e.isValidElementType(W)){var J=D(W);return new u("Invalid "+U+" `"+Y+"` of type "+("`"+J+"` supplied to `"+q+"`, expected a single ReactElement type."))}return null}return b(j)}function S(j){function L(X,q,U,Y,W){if(!(X[q]instanceof j)){var J=j.name||g,K=V(X[q]);return new u("Invalid "+Y+" `"+W+"` of type "+("`"+K+"` supplied to `"+U+"`, expected ")+("instance of `"+J+"`."))}return null}return b(L)}function C(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function L(X,q,U,Y,W){for(var J=X[q],K=0;K<j.length;K++)if(h(J,j[K]))return null;var Z=JSON.stringify(j,function(ie,B){var te=H(B);return te==="symbol"?String(B):B});return new u("Invalid "+Y+" `"+W+"` of value `"+String(J)+"` "+("supplied to `"+U+"`, expected one of "+Z+"."))}return b(L)}function I(j){function L(X,q,U,Y,W){if(typeof j!="function")return new u("Property `"+W+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var J=X[q],K=D(J);if(K!=="object")return new u("Invalid "+Y+" `"+W+"` of type "+("`"+K+"` supplied to `"+U+"`, expected an object."));for(var Z in J)if(n(J,Z)){var Q=j(J,Z,U,Y,W+"."+Z,r);if(Q instanceof Error)return Q}return null}return b(L)}function A(j){if(!Array.isArray(j))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var L=0;L<j.length;L++){var X=j[L];if(typeof X!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(X)+" at index "+L+"."),s}function q(U,Y,W,J,K){for(var Z=[],Q=0;Q<j.length;Q++){var ie=j[Q],B=ie(U,Y,W,J,K,r);if(B==null)return null;B.data&&n(B.data,"expectedType")&&Z.push(B.data.expectedType)}var te=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new u("Invalid "+J+" `"+K+"` supplied to "+("`"+W+"`"+te+"."))}return b(q)}function F(){function j(L,X,q,U,Y){return z(L[X])?null:new u("Invalid "+U+" `"+Y+"` supplied to "+("`"+q+"`, expected a ReactNode."))}return b(j)}function T(j,L,X,q,U){return new u((j||"React class")+": "+L+" type `"+X+"."+q+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function R(j){function L(X,q,U,Y,W){var J=X[q],K=D(J);if(K!=="object")return new u("Invalid "+Y+" `"+W+"` of type `"+K+"` "+("supplied to `"+U+"`, expected `object`."));for(var Z in j){var Q=j[Z];if(typeof Q!="function")return T(U,Y,W,Z,H(Q));var ie=Q(J,Z,U,Y,W+"."+Z,r);if(ie)return ie}return null}return b(L)}function _(j){function L(X,q,U,Y,W){var J=X[q],K=D(J);if(K!=="object")return new u("Invalid "+Y+" `"+W+"` of type `"+K+"` "+("supplied to `"+U+"`, expected `object`."));var Z=t({},X[q],j);for(var Q in Z){var ie=j[Q];if(n(j,Q)&&typeof ie!="function")return T(U,Y,W,Q,H(ie));if(!ie)return new u("Invalid "+Y+" `"+W+"` key `"+Q+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(X[q],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(j),null,"  "));var B=ie(J,Q,U,Y,W+"."+Q,r);if(B)return B}return null}return b(L)}function z(j){switch(typeof j){case"number":case"string":case"undefined":return!0;case"boolean":return!j;case"object":if(Array.isArray(j))return j.every(z);if(j===null||c(j))return!0;var L=v(j);if(L){var X=L.call(j),q;if(L!==j.entries){for(;!(q=X.next()).done;)if(!z(q.value))return!1}else for(;!(q=X.next()).done;){var U=q.value;if(U&&!z(U[1]))return!1}}else return!1;return!0;default:return!1}}function G(j,L){return j==="symbol"?!0:L?L["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&L instanceof Symbol:!1}function D(j){var L=typeof j;return Array.isArray(j)?"array":j instanceof RegExp?"object":G(L,j)?"symbol":L}function H(j){if(typeof j>"u"||j===null)return""+j;var L=D(j);if(L==="object"){if(j instanceof Date)return"date";if(j instanceof RegExp)return"regexp"}return L}function ee(j){var L=H(j);switch(L){case"array":case"object":return"an "+L;case"boolean":case"date":case"regexp":return"a "+L;default:return L}}function V(j){return!j.constructor||!j.constructor.name?g:j.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},Zn}var Qn,Ba;function Mp(){if(Ba)return Qn;Ba=1;var e=Lo();function t(){}function r(){}return r.resetWarningCache=t,Qn=function(){function n(s,c,p,f,m,v){if(v!==e){var g=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function o(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:o,element:n,elementType:n,instanceOf:o,node:n,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:r,resetWarningCache:t};return a.PropTypes=a,a},Qn}if(process.env.NODE_ENV!=="production"){var Ap=ci(),Dp=!0;go.exports=$p()(Ap.isElement,Dp)}else go.exports=Mp()();var Lp=go.exports;const i=Cp(Lp);function Bp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function di(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;const p=a.type;return typeof p=="function"&&!Bp(p)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ui=dr(i.element,di);ui.isRequired=dr(i.element.isRequired,di);const qr=ui;function Fp(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Vp(e,t,r,n,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let c;return typeof a=="function"&&!Fp(a)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const zp=dr(i.elementType,Vp),Up="exact-prop: ​";function fi(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Up]:t=>{const r=Object.keys(t).filter(n=>!e.hasOwnProperty(n));return r.length>0?new Error(`The following props are not supported: ${r.map(n=>`\`${n}\``).join(", ")}. Please remove them.`):null}})}function rr(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var bo={exports:{}},ue={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fa;function Gp(){if(Fa)return ue;Fa=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function u(b){if(typeof b=="object"&&b!==null){var x=b.$$typeof;switch(x){case e:switch(b=b.type,b){case r:case o:case n:case f:case m:return b;default:switch(b=b&&b.$$typeof,b){case c:case s:case p:case g:case v:case a:return b;default:return x}}case t:return x}}}return ue.ContextConsumer=s,ue.ContextProvider=a,ue.Element=e,ue.ForwardRef=p,ue.Fragment=r,ue.Lazy=g,ue.Memo=v,ue.Portal=t,ue.Profiler=o,ue.StrictMode=n,ue.Suspense=f,ue.SuspenseList=m,ue.isAsyncMode=function(){return!1},ue.isConcurrentMode=function(){return!1},ue.isContextConsumer=function(b){return u(b)===s},ue.isContextProvider=function(b){return u(b)===a},ue.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},ue.isForwardRef=function(b){return u(b)===p},ue.isFragment=function(b){return u(b)===r},ue.isLazy=function(b){return u(b)===g},ue.isMemo=function(b){return u(b)===v},ue.isPortal=function(b){return u(b)===t},ue.isProfiler=function(b){return u(b)===o},ue.isStrictMode=function(b){return u(b)===n},ue.isSuspense=function(b){return u(b)===f},ue.isSuspenseList=function(b){return u(b)===m},ue.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===o||b===n||b===f||b===m||b===d||typeof b=="object"&&b!==null&&(b.$$typeof===g||b.$$typeof===v||b.$$typeof===a||b.$$typeof===s||b.$$typeof===p||b.$$typeof===h||b.getModuleId!==void 0)},ue.typeOf=u,ue}var fe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Va;function Hp(){return Va||(Va=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,u=!1,b=!1,x=!1,O=!1,w;w=Symbol.for("react.module.reference");function k($){return!!(typeof $=="string"||typeof $=="function"||$===r||$===o||O||$===n||$===f||$===m||x||$===d||h||u||b||typeof $=="object"&&$!==null&&($.$$typeof===g||$.$$typeof===v||$.$$typeof===a||$.$$typeof===s||$.$$typeof===p||$.$$typeof===w||$.getModuleId!==void 0))}function y($){if(typeof $=="object"&&$!==null){var le=$.$$typeof;switch(le){case e:var Ne=$.type;switch(Ne){case r:case o:case n:case f:case m:return Ne;default:var Pe=Ne&&Ne.$$typeof;switch(Pe){case c:case s:case p:case g:case v:case a:return Pe;default:return le}}case t:return le}}}var S=s,C=a,I=e,A=p,F=r,T=g,R=v,_=t,z=o,G=n,D=f,H=m,ee=!1,V=!1;function j($){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function L($){return V||(V=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function X($){return y($)===s}function q($){return y($)===a}function U($){return typeof $=="object"&&$!==null&&$.$$typeof===e}function Y($){return y($)===p}function W($){return y($)===r}function J($){return y($)===g}function K($){return y($)===v}function Z($){return y($)===t}function Q($){return y($)===o}function ie($){return y($)===n}function B($){return y($)===f}function te($){return y($)===m}fe.ContextConsumer=S,fe.ContextProvider=C,fe.Element=I,fe.ForwardRef=A,fe.Fragment=F,fe.Lazy=T,fe.Memo=R,fe.Portal=_,fe.Profiler=z,fe.StrictMode=G,fe.Suspense=D,fe.SuspenseList=H,fe.isAsyncMode=j,fe.isConcurrentMode=L,fe.isContextConsumer=X,fe.isContextProvider=q,fe.isElement=U,fe.isForwardRef=Y,fe.isFragment=W,fe.isLazy=J,fe.isMemo=K,fe.isPortal=Z,fe.isProfiler=Q,fe.isStrictMode=ie,fe.isSuspense=B,fe.isSuspenseList=te,fe.isValidElementType=k,fe.typeOf=y}()),fe}process.env.NODE_ENV==="production"?bo.exports=Gp():bo.exports=Hp();var gn=bo.exports;const Xp=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function qp(e){const t=`${e}`.match(Xp);return t&&t[1]||""}function mi(e,t=""){return e.displayName||e.name||qp(e)||t}function za(e,t,r){const n=mi(t);return e.displayName||(n!==""?`${r}(${n})`:r)}function Wp(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return mi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case gn.ForwardRef:return za(e,e.render,"ForwardRef");case gn.Memo:return za(e,e.type,"memo");default:return}}}function dt(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`):null}const Yp=i.oneOfType([i.func,i.object]),Bo=Yp;function rt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":rr(7));return e.charAt(0).toUpperCase()+e.slice(1)}function vo(...e){return e.reduce((t,r)=>r==null?t:function(...o){t.apply(this,o),r.apply(this,o)},()=>{})}function hi(e,t=166){let r;function n(...o){const a=()=>{e.apply(this,o)};clearTimeout(r),r=setTimeout(a,t)}return n.clear=()=>{clearTimeout(r)},n}function Kp(e,t){return process.env.NODE_ENV==="production"?()=>null:(r,n,o,a,s)=>{const c=o||"<<anonymous>>",p=s||n;return typeof r[n]<"u"?new Error(`The ${a} \`${p}\` of \`${c}\` is deprecated. ${t}`):null}}function Jp(e,t){var r,n;return N.isValidElement(e)&&t.indexOf((r=e.type.muiName)!=null?r:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function nr(e){return Oe(e).defaultView||window}function Zp(e,t){if(process.env.NODE_ENV==="production")return()=>null;const r=t?P({},t.propTypes):null;return o=>(a,s,c,p,f,...m)=>{const v=f||s,g=r==null?void 0:r[v];if(g){const d=g(a,s,c,p,f,...m);if(d)return d}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function bn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Qp=typeof window<"u"?N.useLayoutEffect:N.useEffect,Bt=Qp;let Ua=0;function ed(e){const[t,r]=N.useState(e),n=e||t;return N.useEffect(()=>{t==null&&(Ua+=1,r(`mui-${Ua}`))},[t]),n}const Ga=N["useId".toString()];function gi(e){if(Ga!==void 0){const t=Ga();return e??t}return ed(e)}function td(e,t,r,n,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function bi({controlled:e,default:t,name:r,state:n="value"}){const{current:o}=N.useRef(e!==void 0),[a,s]=N.useState(t),c=o?e:a;if(process.env.NODE_ENV!=="production"){N.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${n} state of ${r} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[n,r,e]);const{current:f}=N.useRef(t);N.useEffect(()=>{!o&&f!==t&&console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`))},[JSON.stringify(t)])}const p=N.useCallback(f=>{o||s(f)},[]);return[c,p]}function Dr(e){const t=N.useRef(e);return Bt(()=>{t.current=e}),N.useRef((...r)=>(0,t.current)(...r)).current}function We(...e){return N.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(r=>{bn(r,t)})},e)}const Ha={};function rd(e,t){const r=N.useRef(Ha);return r.current===Ha&&(r.current=e(t)),r}const nd=[];function od(e){N.useEffect(e,nd)}class Wr{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Wr}start(t,r){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,r()},t)}}function Cr(){const e=rd(Wr.create).current;return od(e.disposeEffect),e}let On=!0,yo=!1;const ad=new Wr,sd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function id(e){const{type:t,tagName:r}=e;return!!(r==="INPUT"&&sd[t]&&!e.readOnly||r==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ld(e){e.metaKey||e.altKey||e.ctrlKey||(On=!0)}function eo(){On=!1}function cd(){this.visibilityState==="hidden"&&yo&&(On=!0)}function pd(e){e.addEventListener("keydown",ld,!0),e.addEventListener("mousedown",eo,!0),e.addEventListener("pointerdown",eo,!0),e.addEventListener("touchstart",eo,!0),e.addEventListener("visibilitychange",cd,!0)}function dd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return On||id(t)}function vi(){const e=N.useCallback(o=>{o!=null&&pd(o.ownerDocument)},[]),t=N.useRef(!1);function r(){return t.current?(yo=!0,ad.start(100,()=>{yo=!1}),t.current=!1,!0):!1}function n(o){return dd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:n,onBlur:r,ref:e}}function yi(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ud(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function fd(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const md=Number.isInteger||fd;function wi(e,t,r,n){const o=e[t];if(o==null||!md(o)){const a=ud(o);return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`)}return null}function xi(e,t,...r){return e[t]===void 0?null:wi(e,t,...r)}function wo(){return null}xi.isRequired=wi;wo.isRequired=wo;const ki=process.env.NODE_ENV==="production"?wo:xi;function Ei(e,t){const r=P({},t);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))r[n]=P({},e[n],r[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const o=e[n]||{},a=t[n];r[n]={},!a||!Object.keys(a)?r[n]=o:!o||!Object.keys(o)?r[n]=a:(r[n]=P({},a),Object.keys(o).forEach(s=>{r[n][s]=Ei(o[s],a[s])}))}else r[n]===void 0&&(r[n]=e[n])}),r}function mt(e,t,r=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((a,s)=>{if(s){const c=t(s);c!==""&&a.push(c),r&&r[s]&&a.push(r[s])}return a},[]).join(" ")}),n}const Xa=e=>e,hd=()=>{let e=Xa;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Xa}}},gd=hd(),Ti=gd,Ni={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function ot(e,t,r="Mui"){const n=Ni[t];return n?`${r}-${n}`:`${Ti.generate(e)}-${t}`}function kt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=ot(e,o,r)}),n}function bd(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}function he(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}const vd=["values","unit","step"],yd=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>P({},r,{[n.key]:n.val}),{})};function wd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,o=he(e,vd),a=yd(t),s=Object.keys(a);function c(g){return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r})`}function p(g){return`@media (max-width:${(typeof t[g]=="number"?t[g]:g)-n/100}${r})`}function f(g,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[g]=="number"?t[g]:g}${r}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-n/100}${r})`}function m(g){return s.indexOf(g)+1<s.length?f(g,s[s.indexOf(g)+1]):c(g)}function v(g){const d=s.indexOf(g);return d===0?c(s[1]):d===s.length-1?p(s[d]):f(g,s[s.indexOf(g)+1]).replace("@media","@media not all and")}return P({keys:s,values:a,up:c,down:p,between:f,only:m,not:v,unit:r},o)}const xd={borderRadius:4},kd=xd,Ed=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},Et=Ed;function Pr(e,t){return t?pt(e,t,{clone:!1}):e}const Fo={xs:0,sm:600,md:900,lg:1200,xl:1536},qa={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Fo[e]}px)`};function ut(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const a=n.breakpoints||qa;return t.reduce((s,c,p)=>(s[a.up(a.keys[p])]=r(t[p]),s),{})}if(typeof t=="object"){const a=n.breakpoints||qa;return Object.keys(t).reduce((s,c)=>{if(Object.keys(a.values||Fo).indexOf(c)!==-1){const p=a.up(c);s[p]=r(t[c],c)}else{const p=c;s[p]=t[p]}return s},{})}return r(t)}function Td(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,o)=>{const a=e.up(o);return n[a]={},n},{}))||{}}function Nd(e,t){return e.reduce((r,n)=>{const o=r[n];return(!o||Object.keys(o).length===0)&&delete r[n],r},t)}function Rn(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(n!=null)return n}return t.split(".").reduce((n,o)=>n&&n[o]!=null?n[o]:null,e)}function vn(e,t,r,n=r){let o;return typeof e=="function"?o=e(r):Array.isArray(e)?o=e[r]||n:o=Rn(e,r)||n,t&&(o=t(o,n,e)),o}function Ee(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=s=>{if(s[t]==null)return null;const c=s[t],p=s.theme,f=Rn(p,n)||{};return ut(s,c,v=>{let g=vn(f,o,v);return v===g&&typeof v=="string"&&(g=vn(f,o,`${t}${v==="default"?"":rt(v)}`,v)),r===!1?g:{[r]:g}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:Et}:{},a.filterProps=[t],a}function Sd(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const Cd={m:"margin",p:"padding"},jd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Wa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Od=Sd(e=>{if(e.length>2)if(Wa[e])e=Wa[e];else return[e];const[t,r]=e.split(""),n=Cd[t],o=jd[r]||"";return Array.isArray(o)?o.map(a=>n+a):[n+o]}),Pn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],_n=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Rd=[...Pn,..._n];function Yr(e,t,r,n){var o;const a=(o=Rn(e,t,!1))!=null?o:r;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Si(e){return Yr(e,"spacing",8,"spacing")}function Kr(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function Pd(e,t){return r=>e.reduce((n,o)=>(n[o]=Kr(t,r),n),{})}function _d(e,t,r,n){if(t.indexOf(r)===-1)return null;const o=Od(r),a=Pd(o,n),s=e[r];return ut(e,s,a)}function Ci(e,t){const r=Si(e.theme);return Object.keys(e).map(n=>_d(e,t,n,r)).reduce(Pr,{})}function ye(e){return Ci(e,Pn)}ye.propTypes=process.env.NODE_ENV!=="production"?Pn.reduce((e,t)=>(e[t]=Et,e),{}):{};ye.filterProps=Pn;function we(e){return Ci(e,_n)}we.propTypes=process.env.NODE_ENV!=="production"?_n.reduce((e,t)=>(e[t]=Et,e),{}):{};we.filterProps=_n;process.env.NODE_ENV!=="production"&&Rd.reduce((e,t)=>(e[t]=Et,e),{});function Id(e=8){if(e.mui)return e;const t=Si({spacing:e}),r=(...n)=>(process.env.NODE_ENV!=="production"&&(n.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)),(n.length===0?[1]:n).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return r.mui=!0,r}function In(...e){const t=e.reduce((n,o)=>(o.filterProps.forEach(a=>{n[a]=o}),n),{}),r=n=>Object.keys(n).reduce((o,a)=>t[a]?Pr(o,t[a](n)):o,{});return r.propTypes=process.env.NODE_ENV!=="production"?e.reduce((n,o)=>Object.assign(n,o.propTypes),{}):{},r.filterProps=e.reduce((n,o)=>n.concat(o.filterProps),[]),r}function Xe(e){return typeof e!="number"?e:`${e}px solid`}function Ze(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const $d=Ze("border",Xe),Md=Ze("borderTop",Xe),Ad=Ze("borderRight",Xe),Dd=Ze("borderBottom",Xe),Ld=Ze("borderLeft",Xe),Bd=Ze("borderColor"),Fd=Ze("borderTopColor"),Vd=Ze("borderRightColor"),zd=Ze("borderBottomColor"),Ud=Ze("borderLeftColor"),Gd=Ze("outline",Xe),Hd=Ze("outlineColor"),$n=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Yr(e.theme,"shape.borderRadius",4,"borderRadius"),r=n=>({borderRadius:Kr(t,n)});return ut(e,e.borderRadius,r)}return null};$n.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Et}:{};$n.filterProps=["borderRadius"];In($d,Md,Ad,Dd,Ld,Bd,Fd,Vd,zd,Ud,$n,Gd,Hd);const Mn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Yr(e.theme,"spacing",8,"gap"),r=n=>({gap:Kr(t,n)});return ut(e,e.gap,r)}return null};Mn.propTypes=process.env.NODE_ENV!=="production"?{gap:Et}:{};Mn.filterProps=["gap"];const An=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Yr(e.theme,"spacing",8,"columnGap"),r=n=>({columnGap:Kr(t,n)});return ut(e,e.columnGap,r)}return null};An.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Et}:{};An.filterProps=["columnGap"];const Dn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Yr(e.theme,"spacing",8,"rowGap"),r=n=>({rowGap:Kr(t,n)});return ut(e,e.rowGap,r)}return null};Dn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Et}:{};Dn.filterProps=["rowGap"];const Xd=Ee({prop:"gridColumn"}),qd=Ee({prop:"gridRow"}),Wd=Ee({prop:"gridAutoFlow"}),Yd=Ee({prop:"gridAutoColumns"}),Kd=Ee({prop:"gridAutoRows"}),Jd=Ee({prop:"gridTemplateColumns"}),Zd=Ee({prop:"gridTemplateRows"}),Qd=Ee({prop:"gridTemplateAreas"}),eu=Ee({prop:"gridArea"});In(Mn,An,Dn,Xd,qd,Wd,Yd,Kd,Jd,Zd,Qd,eu);function Zt(e,t){return t==="grey"?t:e}const tu=Ee({prop:"color",themeKey:"palette",transform:Zt}),ru=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Zt}),nu=Ee({prop:"backgroundColor",themeKey:"palette",transform:Zt});In(tu,ru,nu);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const ou=Ee({prop:"width",transform:Ve}),Vo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,o;const a=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||Fo[r];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ve(r)}};return ut(e,e.maxWidth,t)}return null};Vo.filterProps=["maxWidth"];const au=Ee({prop:"minWidth",transform:Ve}),su=Ee({prop:"height",transform:Ve}),iu=Ee({prop:"maxHeight",transform:Ve}),lu=Ee({prop:"minHeight",transform:Ve});Ee({prop:"size",cssProperty:"width",transform:Ve});Ee({prop:"size",cssProperty:"height",transform:Ve});const cu=Ee({prop:"boxSizing"});In(ou,Vo,au,su,iu,lu,cu);const pu={border:{themeKey:"borders",transform:Xe},borderTop:{themeKey:"borders",transform:Xe},borderRight:{themeKey:"borders",transform:Xe},borderBottom:{themeKey:"borders",transform:Xe},borderLeft:{themeKey:"borders",transform:Xe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Xe},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:$n},color:{themeKey:"palette",transform:Zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Zt},backgroundColor:{themeKey:"palette",transform:Zt},p:{style:we},pt:{style:we},pr:{style:we},pb:{style:we},pl:{style:we},px:{style:we},py:{style:we},padding:{style:we},paddingTop:{style:we},paddingRight:{style:we},paddingBottom:{style:we},paddingLeft:{style:we},paddingX:{style:we},paddingY:{style:we},paddingInline:{style:we},paddingInlineStart:{style:we},paddingInlineEnd:{style:we},paddingBlock:{style:we},paddingBlockStart:{style:we},paddingBlockEnd:{style:we},m:{style:ye},mt:{style:ye},mr:{style:ye},mb:{style:ye},ml:{style:ye},mx:{style:ye},my:{style:ye},margin:{style:ye},marginTop:{style:ye},marginRight:{style:ye},marginBottom:{style:ye},marginLeft:{style:ye},marginX:{style:ye},marginY:{style:ye},marginInline:{style:ye},marginInlineStart:{style:ye},marginInlineEnd:{style:ye},marginBlock:{style:ye},marginBlockStart:{style:ye},marginBlockEnd:{style:ye},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Mn},rowGap:{style:Dn},columnGap:{style:An},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:Vo},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},zo=pu;function du(...e){const t=e.reduce((n,o)=>n.concat(Object.keys(o)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function uu(e,t){return typeof e=="function"?e(t):e}function fu(){function e(r,n,o,a){const s={[r]:n,theme:o},c=a[r];if(!c)return{[r]:n};const{cssProperty:p=r,themeKey:f,transform:m,style:v}=c;if(n==null)return null;if(f==="typography"&&n==="inherit")return{[r]:n};const g=Rn(o,f)||{};return v?v(s):ut(s,n,h=>{let u=vn(g,m,h);return h===u&&typeof h=="string"&&(u=vn(g,m,`${r}${h==="default"?"":rt(h)}`,h)),p===!1?u:{[p]:u}})}function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const s=(n=a.unstable_sxConfig)!=null?n:zo;function c(p){let f=p;if(typeof p=="function")f=p(a);else if(typeof p!="object")return p;if(!f)return null;const m=Td(a.breakpoints),v=Object.keys(m);let g=m;return Object.keys(f).forEach(d=>{const h=uu(f[d],a);if(h!=null)if(typeof h=="object")if(s[d])g=Pr(g,e(d,h,a,s));else{const u=ut({theme:a},h,b=>({[d]:b}));du(u,h)?g[d]=t({sx:h,theme:a}):g=Pr(g,u)}else g=Pr(g,e(d,h,a,s))}),Nd(v,g)}return Array.isArray(o)?o.map(c):c(o)}return t}const ji=fu();ji.filterProps=["sx"];const Uo=ji;function mu(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const hu=["breakpoints","palette","spacing","shape"];function Go(e={},...t){const{breakpoints:r={},palette:n={},spacing:o,shape:a={}}=e,s=he(e,hu),c=wd(r),p=Id(o);let f=pt({breakpoints:c,direction:"ltr",components:{},palette:P({mode:"light"},n),spacing:p,shape:P({},kd,a)},s);return f.applyStyles=mu,f=t.reduce((m,v)=>pt(m,v),f),f.unstable_sxConfig=P({},zo,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Uo({sx:v,theme:this})},f}function gu(e){return Object.keys(e).length===0}function Oi(e=null){const t=N.useContext(fo.ThemeContext);return!t||gu(t)?e:t}const bu=Go();function Ri(e=bu){return Oi(e)}const vu=["ownerState"],yu=["variants"],wu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function xu(e){return Object.keys(e).length===0}function ku(e){return typeof e=="string"&&e.charCodeAt(0)>96}function cn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Eu=Go(),Ya=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function on({defaultTheme:e,theme:t,themeId:r}){return xu(t)?e:t[r]||t}function Tu(e){return e?(t,r)=>r[e]:null}function pn(e,t){let{ownerState:r}=t,n=he(t,vu);const o=typeof e=="function"?e(P({ownerState:r},n)):e;if(Array.isArray(o))return o.flatMap(a=>pn(a,P({ownerState:r},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let c=he(o,yu);return a.forEach(p=>{let f=!0;typeof p.props=="function"?f=p.props(P({ownerState:r},n,r)):Object.keys(p.props).forEach(m=>{(r==null?void 0:r[m])!==p.props[m]&&n[m]!==p.props[m]&&(f=!1)}),f&&(Array.isArray(c)||(c=[c]),c.push(typeof p.style=="function"?p.style(P({ownerState:r},n,r)):p.style))}),c}return o}function Nu(e={}){const{themeId:t,defaultTheme:r=Eu,rootShouldForwardProp:n=cn,slotShouldForwardProp:o=cn}=e,a=s=>Uo(P({},s,{theme:on(P({},s,{defaultTheme:r,themeId:t}))}));return a.__mui_systemSx=!0,(s,c={})=>{fo.internal_processStyles(s,y=>y.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:p,slot:f,skipVariantsResolver:m,skipSx:v,overridesResolver:g=Tu(Ya(f))}=c,d=he(c,wu),h=m!==void 0?m:f&&f!=="Root"&&f!=="root"||!1,u=v||!1;let b;process.env.NODE_ENV!=="production"&&p&&(b=`${p}-${Ya(f||"Root")}`);let x=cn;f==="Root"||f==="root"?x=n:f?x=o:ku(s)&&(x=void 0);const O=fo(s,P({shouldForwardProp:x,label:b},d)),w=y=>typeof y=="function"&&y.__emotion_real!==y||_t(y)?S=>pn(y,P({},S,{theme:on({theme:S.theme,defaultTheme:r,themeId:t})})):y,k=(y,...S)=>{let C=w(y);const I=S?S.map(w):[];p&&g&&I.push(T=>{const R=on(P({},T,{defaultTheme:r,themeId:t}));if(!R.components||!R.components[p]||!R.components[p].styleOverrides)return null;const _=R.components[p].styleOverrides,z={};return Object.entries(_).forEach(([G,D])=>{z[G]=pn(D,P({},T,{theme:R}))}),g(T,z)}),p&&!h&&I.push(T=>{var R;const _=on(P({},T,{defaultTheme:r,themeId:t})),z=_==null||(R=_.components)==null||(R=R[p])==null?void 0:R.variants;return pn({variants:z},P({},T,{theme:_}))}),u||I.push(a);const A=I.length-S.length;if(Array.isArray(y)&&A>0){const T=new Array(A).fill("");C=[...y,...T],C.raw=[...y.raw,...T]}const F=O(C,...I);if(process.env.NODE_ENV!=="production"){let T;p&&(T=`${p}${rt(f||"")}`),T===void 0&&(T=`Styled(${Wp(s)})`),F.displayName=T}return s.muiName&&(F.muiName=s.muiName),F};return O.withConfig&&(k.withConfig=O.withConfig),k}}function Su(e){const{theme:t,name:r,props:n}=e;return!t||!t.components||!t.components[r]||!t.components[r].defaultProps?n:Ei(t.components[r].defaultProps,n)}function Cu({props:e,name:t,defaultTheme:r,themeId:n}){let o=Ri(r);return n&&(o=o[n]||o),Su({theme:o,name:t,props:e})}function Ho(e,t=0,r=1){return process.env.NODE_ENV!=="production"&&(e<t||e>r)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`),bd(e,t,r)}function ju(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,o)=>o<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function Ft(e){if(e.type)return e;if(e.charAt(0)==="#")return Ft(ju(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:rr(9,e));let n=e.substring(t+1,e.length-1),o;if(r==="color"){if(n=n.split(" "),o=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:rr(10,o))}else n=n.split(",");return n=n.map(a=>parseFloat(a)),{type:r,values:n,colorSpace:o}}function Ln(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function Ou(e){e=Ft(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),s=(f,m=(f+r/30)%12)=>o-a*Math.max(Math.min(m-3,9-m,1),-1);let c="rgb";const p=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",p.push(t[3])),Ln({type:c,values:p})}function Ka(e){e=Ft(e);let t=e.type==="hsl"||e.type==="hsla"?Ft(Ou(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ja(e,t){const r=Ka(e),n=Ka(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function yn(e,t){return e=Ft(e),t=Ho(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Ln(e)}function Ru(e,t){if(e=Ft(e),t=Ho(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return Ln(e)}function Pu(e,t){if(e=Ft(e),t=Ho(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return Ln(e)}function _u(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Iu={black:"#000",white:"#fff"},Lr=Iu,$u={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Mu=$u,Au={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Gt=Au,Du={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ht=Du,Lu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},wr=Lu,Bu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Xt=Bu,Fu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},qt=Fu,Vu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Wt=Vu,zu=["mode","contrastThreshold","tonalOffset"],Za={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Lr.white,default:Lr.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},to={text:{primary:Lr.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Lr.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Qa(e,t,r,n){const o=n.light||n,a=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=Pu(e.main,o):t==="dark"&&(e.dark=Ru(e.main,a)))}function Uu(e="light"){return e==="dark"?{main:Xt[200],light:Xt[50],dark:Xt[400]}:{main:Xt[700],light:Xt[400],dark:Xt[800]}}function Gu(e="light"){return e==="dark"?{main:Gt[200],light:Gt[50],dark:Gt[400]}:{main:Gt[500],light:Gt[300],dark:Gt[700]}}function Hu(e="light"){return e==="dark"?{main:Ht[500],light:Ht[300],dark:Ht[700]}:{main:Ht[700],light:Ht[400],dark:Ht[800]}}function Xu(e="light"){return e==="dark"?{main:qt[400],light:qt[300],dark:qt[700]}:{main:qt[700],light:qt[500],dark:qt[900]}}function qu(e="light"){return e==="dark"?{main:Wt[400],light:Wt[300],dark:Wt[700]}:{main:Wt[800],light:Wt[500],dark:Wt[900]}}function Wu(e="light"){return e==="dark"?{main:wr[400],light:wr[300],dark:wr[700]}:{main:"#ed6c02",light:wr[500],dark:wr[900]}}function Yu(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,o=he(e,zu),a=e.primary||Uu(t),s=e.secondary||Gu(t),c=e.error||Hu(t),p=e.info||Xu(t),f=e.success||qu(t),m=e.warning||Wu(t);function v(u){const b=Ja(u,to.text.primary)>=r?to.text.primary:Za.text.primary;if(process.env.NODE_ENV!=="production"){const x=Ja(u,b);x<3&&console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const g=({color:u,name:b,mainShade:x=500,lightShade:O=300,darkShade:w=700})=>{if(u=P({},u),!u.main&&u[x]&&(u.main=u[x]),!u.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.`:rr(11,b?` (${b})`:"",x));if(typeof u.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:rr(12,b?` (${b})`:"",JSON.stringify(u.main)));return Qa(u,"light",O,n),Qa(u,"dark",w,n),u.contrastText||(u.contrastText=v(u.main)),u},d={dark:to,light:Za};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),pt(P({common:P({},Lr),mode:t,primary:g({color:a,name:"primary"}),secondary:g({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:g({color:c,name:"error"}),warning:g({color:m,name:"warning"}),info:g({color:p,name:"info"}),success:g({color:f,name:"success"}),grey:Mu,contrastThreshold:r,getContrastText:v,augmentColor:g,tonalOffset:n},d[t]),o)}const Ku=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ju(e){return Math.round(e*1e5)/1e5}const es={textTransform:"uppercase"},ts='"Roboto", "Helvetica", "Arial", sans-serif';function Zu(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=ts,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:m,pxToRem:v}=r,g=he(r,Ku);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof f!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=v||(x=>`${x/f*d}rem`),u=(x,O,w,k,y)=>P({fontFamily:n,fontWeight:x,fontSize:h(O),lineHeight:w},n===ts?{letterSpacing:`${Ju(k/O)}em`}:{},y,m),b={h1:u(a,96,1.167,-1.5),h2:u(a,60,1.2,-.5),h3:u(s,48,1.167,0),h4:u(s,34,1.235,.25),h5:u(s,24,1.334,0),h6:u(c,20,1.6,.15),subtitle1:u(s,16,1.75,.15),subtitle2:u(c,14,1.57,.1),body1:u(s,16,1.5,.15),body2:u(s,14,1.43,.15),button:u(c,14,1.75,.4,es),caption:u(s,12,1.66,.4),overline:u(s,12,2.66,1,es),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return pt(P({htmlFontSize:f,pxToRem:h,fontFamily:n,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:p},b),g,{clone:!1})}const Qu=.2,ef=.14,tf=.12;function be(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Qu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ef})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${tf})`].join(",")}const rf=["none",be(0,2,1,-1,0,1,1,0,0,1,3,0),be(0,3,1,-2,0,2,2,0,0,1,5,0),be(0,3,3,-2,0,3,4,0,0,1,8,0),be(0,2,4,-1,0,4,5,0,0,1,10,0),be(0,3,5,-1,0,5,8,0,0,1,14,0),be(0,3,5,-1,0,6,10,0,0,1,18,0),be(0,4,5,-2,0,7,10,1,0,2,16,1),be(0,5,5,-3,0,8,10,1,0,3,14,2),be(0,5,6,-3,0,9,12,1,0,3,16,2),be(0,6,6,-3,0,10,14,1,0,4,18,3),be(0,6,7,-4,0,11,15,1,0,4,20,3),be(0,7,8,-4,0,12,17,2,0,5,22,4),be(0,7,8,-4,0,13,19,2,0,5,24,4),be(0,7,9,-4,0,14,21,2,0,5,26,4),be(0,8,9,-5,0,15,22,2,0,6,28,5),be(0,8,10,-5,0,16,24,2,0,6,30,5),be(0,8,11,-5,0,17,26,2,0,6,32,5),be(0,9,11,-5,0,18,28,2,0,7,34,6),be(0,9,12,-6,0,19,29,2,0,7,36,6),be(0,10,13,-6,0,20,31,3,0,8,38,7),be(0,10,13,-6,0,21,33,3,0,8,40,7),be(0,10,14,-6,0,22,35,3,0,8,42,7),be(0,11,14,-7,0,23,36,3,0,9,44,8),be(0,11,15,-7,0,24,38,3,0,9,46,8)],nf=rf,of=["duration","easing","delay"],af={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},sf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function rs(e){return`${Math.round(e)}ms`}function lf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function cf(e){const t=P({},af,e.easing),r=P({},sf,e.duration);return P({getAutoHeightDuration:lf,create:(o=["all"],a={})=>{const{duration:s=r.standard,easing:c=t.easeInOut,delay:p=0}=a,f=he(a,of);if(process.env.NODE_ENV!=="production"){const m=g=>typeof g=="string",v=g=>!isNaN(parseFloat(g));!m(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!m(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),m(c)||console.error('MUI: Argument "easing" must be a string.'),!v(p)&&!m(p)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(f).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(m=>`${m} ${typeof s=="string"?s:rs(s)} ${c} ${typeof p=="string"?p:rs(p)}`).join(",")}},e,{easing:t,duration:r})}const pf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},df=pf,uf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function ff(e={},...t){const{mixins:r={},palette:n={},transitions:o={},typography:a={}}=e,s=he(e,uf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":rr(18));const c=Yu(n),p=Go(e);let f=pt(p,{mixins:_u(p.breakpoints,r),palette:c,shadows:nf.slice(),typography:Zu(c,a),transitions:cf(o),zIndex:P({},df)});if(f=pt(f,s),f=t.reduce((m,v)=>pt(m,v),f),process.env.NODE_ENV!=="production"){const m=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(g,d)=>{let h;for(h in g){const u=g[h];if(m.indexOf(h)!==-1&&Object.keys(u).length>0){if(process.env.NODE_ENV!=="production"){const b=ot("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(g,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:u}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}g[h]={}}}};Object.keys(f.components).forEach(g=>{const d=f.components[g].styleOverrides;d&&g.indexOf("Mui")===0&&v(d,g)})}return f.unstable_sxConfig=P({},zo,s==null?void 0:s.unstable_sxConfig),f.unstable_sx=function(v){return Uo({sx:v,theme:this})},f}const mf=ff(),Xo=mf,qo="$$material";function ht({props:e,name:t}){return Cu({props:e,name:t,defaultTheme:Xo,themeId:qo})}const Pi=e=>cn(e)&&e!=="classes",hf=Nu({themeId:qo,defaultTheme:Xo,rootShouldForwardProp:Pi}),Re=hf;function gf(e){return ot("MuiSvgIcon",e)}kt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const bf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],vf=e=>{const{color:t,fontSize:r,classes:n}=e,o={root:["root",t!=="inherit"&&`color${rt(t)}`,`fontSize${rt(r)}`]};return mt(o,gf,n)},yf=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.color!=="inherit"&&t[`color${rt(r.color)}`],t[`fontSize${rt(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,n,o,a,s,c,p,f,m,v,g,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(r=e.transitions)==null||(n=r.create)==null?void 0:n.call(r,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,24))||"1.5rem",large:((f=e.typography)==null||(m=f.pxToRem)==null?void 0:m.call(f,35))||"2.1875rem"}[t.fontSize],color:(v=(g=(e.vars||e).palette)==null||(g=g[t.color])==null?void 0:g.main)!=null?v:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),Wo=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:c="svg",fontSize:p="medium",htmlColor:f,inheritViewBox:m=!1,titleAccess:v,viewBox:g="0 0 24 24"}=n,d=he(n,bf),h=N.isValidElement(o)&&o.type==="svg",u=P({},n,{color:s,component:c,fontSize:p,instanceFontSize:t.fontSize,inheritViewBox:m,viewBox:g,hasSvgAsChild:h}),b={};m||(b.viewBox=g);const x=vf(u);return l.jsxs(yf,P({as:c,className:Ce(x.root,a),focusable:"false",color:f,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:r},b,d,h&&o.props,{ownerState:u,children:[h?o.props.children:o,v?l.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Wo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Wo.muiName="SvgIcon";const ns=Wo;function _i(e,t){function r(n,o){return l.jsx(ns,P({"data-testid":`${t}Icon`,ref:o},n,{children:e}))}return process.env.NODE_ENV!=="production"&&(r.displayName=`${t}Icon`),r.muiName=ns.muiName,N.memo(N.forwardRef(r))}const wf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ti.configure(e)}},xf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:rt,createChainedFunction:vo,createSvgIcon:_i,debounce:hi,deprecatedPropType:Kp,isMuiElement:Jp,ownerDocument:Oe,ownerWindow:nr,requirePropFactory:Zp,setRef:bn,unstable_ClassNameGenerator:wf,unstable_useEnhancedEffect:Bt,unstable_useId:gi,unsupportedProp:td,useControlled:bi,useEventCallback:Dr,useForkRef:We,useIsFocusVisible:vi},Symbol.toStringTag,{value:"Module"})),kf=jp(xf);var os;function Ef(){return os||(os=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=kf}(qn)),qn}var Tf=Op;Object.defineProperty(Do,"__esModule",{value:!0});var Ii=Do.default=void 0,Nf=Tf(Ef()),Sf=l;Ii=Do.default=(0,Nf.default)((0,Sf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function $i(e){return typeof e=="string"}function jr(e,t,r){return e===void 0||$i(e)?t:P({},t,{ownerState:P({},t.ownerState,r)})}const Cf={disableDefaultClasses:!1},jf=N.createContext(Cf);function Of(e){const{disableDefaultClasses:t}=N.useContext(jf);return r=>t?"":e(r)}function Mi(e,t=[]){if(e===void 0)return{};const r={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!t.includes(n)).forEach(n=>{r[n]=e[n]}),r}function Rf(e,t,r){return typeof e=="function"?e(t,r):e}function as(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>!(r.match(/^on[A-Z]/)&&typeof e[r]=="function")).forEach(r=>{t[r]=e[r]}),t}function Pf(e){const{getSlotProps:t,additionalProps:r,externalSlotProps:n,externalForwardedProps:o,className:a}=e;if(!t){const d=Ce(r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),h=P({},r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),u=P({},r,o,n);return d.length>0&&(u.className=d),Object.keys(h).length>0&&(u.style=h),{props:u,internalRef:void 0}}const s=Mi(P({},o,n)),c=as(n),p=as(o),f=t(s),m=Ce(f==null?void 0:f.className,r==null?void 0:r.className,a,o==null?void 0:o.className,n==null?void 0:n.className),v=P({},f==null?void 0:f.style,r==null?void 0:r.style,o==null?void 0:o.style,n==null?void 0:n.style),g=P({},f,r,p,c);return m.length>0&&(g.className=m),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:f.ref}}const _f=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Vt(e){var t;const{elementType:r,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=he(e,_f),c=a?{}:Rf(n,o),{props:p,internalRef:f}=Pf(P({},s,{externalSlotProps:c})),m=We(f,c==null?void 0:c.ref,(t=e.additionalProps)==null?void 0:t.ref);return jr(r,P({},p,{ref:m}),o)}const Ai="base";function If(e){return`${Ai}--${e}`}function $f(e,t){return`${Ai}-${e}-${t}`}function Di(e,t){const r=Ni[t];return r?If(r):$f(e,t)}function Mf(e,t){const r={};return t.forEach(n=>{r[n]=Di(e,n)}),r}const Af=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Df(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Lf(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let r=t(`[name="${e.name}"]:checked`);return r||(r=t(`[name="${e.name}"]`)),r!==e}function Bf(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Lf(e))}function Ff(e){const t=[],r=[];return Array.from(e.querySelectorAll(Af)).forEach((n,o)=>{const a=Df(n);a===-1||!Bf(n)||(a===0?t.push(n):r.push({documentOrder:o,tabIndex:a,node:n}))}),r.sort((n,o)=>n.tabIndex===o.tabIndex?n.documentOrder-o.documentOrder:n.tabIndex-o.tabIndex).map(n=>n.node).concat(t)}function Vf(){return!0}function wn(e){const{children:t,disableAutoFocus:r=!1,disableEnforceFocus:n=!1,disableRestoreFocus:o=!1,getTabbable:a=Ff,isEnabled:s=Vf,open:c}=e,p=N.useRef(!1),f=N.useRef(null),m=N.useRef(null),v=N.useRef(null),g=N.useRef(null),d=N.useRef(!1),h=N.useRef(null),u=We(t.ref,h),b=N.useRef(null);N.useEffect(()=>{!c||!h.current||(d.current=!r)},[r,c]),N.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current);return h.current.contains(w.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(v.current&&v.current.focus&&(p.current=!0,v.current.focus()),v.current=null)}},[c]),N.useEffect(()=>{if(!c||!h.current)return;const w=Oe(h.current),k=C=>{b.current=C,!(n||!s()||C.key!=="Tab")&&w.activeElement===h.current&&C.shiftKey&&(p.current=!0,m.current&&m.current.focus())},y=()=>{const C=h.current;if(C===null)return;if(!w.hasFocus()||!s()||p.current){p.current=!1;return}if(C.contains(w.activeElement)||n&&w.activeElement!==f.current&&w.activeElement!==m.current)return;if(w.activeElement!==g.current)g.current=null;else if(g.current!==null)return;if(!d.current)return;let I=[];if((w.activeElement===f.current||w.activeElement===m.current)&&(I=a(h.current)),I.length>0){var A,F;const T=!!((A=b.current)!=null&&A.shiftKey&&((F=b.current)==null?void 0:F.key)==="Tab"),R=I[0],_=I[I.length-1];typeof R!="string"&&typeof _!="string"&&(T?_.focus():R.focus())}else C.focus()};w.addEventListener("focusin",y),w.addEventListener("keydown",k,!0);const S=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(S),w.removeEventListener("focusin",y),w.removeEventListener("keydown",k,!0)}},[r,n,o,s,c,a]);const x=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0,g.current=w.target;const k=t.props.onFocus;k&&k(w)},O=w=>{v.current===null&&(v.current=w.relatedTarget),d.current=!0};return l.jsxs(N.Fragment,{children:[l.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:f,"data-testid":"sentinelStart"}),N.cloneElement(t,{ref:u,onFocus:x}),l.jsx("div",{tabIndex:c?0:-1,onFocus:O,ref:m,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(wn.propTypes={children:qr,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(wn["propTypes"]=fi(wn.propTypes));function zf(e){return typeof e=="function"?e():e}const Br=N.forwardRef(function(t,r){const{children:n,container:o,disablePortal:a=!1}=t,[s,c]=N.useState(null),p=We(N.isValidElement(n)?n.ref:null,r);if(Bt(()=>{a||c(zf(o)||document.body)},[o,a]),Bt(()=>{if(s&&!a)return bn(r,s),()=>{bn(r,null)}},[r,s,a]),a){if(N.isValidElement(n)){const f={ref:p};return N.cloneElement(n,f)}return l.jsx(N.Fragment,{children:n})}return l.jsx(N.Fragment,{children:s&&Oc.createPortal(n,s)})});process.env.NODE_ENV!=="production"&&(Br.propTypes={children:i.node,container:i.oneOfType([dt,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Br["propTypes"]=fi(Br.propTypes));function Uf(e){const t=Oe(e);return t.body===e?nr(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function _r(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ss(e){return parseInt(nr(e).getComputedStyle(e).paddingRight,10)||0}function Gf(e){const r=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return r||n}function is(e,t,r,n,o){const a=[t,r,...n];[].forEach.call(e.children,s=>{const c=a.indexOf(s)===-1,p=!Gf(s);c&&p&&_r(s,o)})}function ro(e,t){let r=-1;return e.some((n,o)=>t(n)?(r=o,!0):!1),r}function Hf(e,t){const r=[],n=e.container;if(!t.disableScrollLock){if(Uf(n)){const s=yi(Oe(n));r.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${ss(n)+s}px`;const c=Oe(n).querySelectorAll(".mui-fixed");[].forEach.call(c,p=>{r.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${ss(p)+s}px`})}let a;if(n.parentNode instanceof DocumentFragment)a=Oe(n).body;else{const s=n.parentElement,c=nr(n);a=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}r.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{r.forEach(({value:a,el:s,property:c})=>{a?s.style.setProperty(c,a):s.style.removeProperty(c)})}}function Xf(e){const t=[];return[].forEach.call(e.children,r=>{r.getAttribute("aria-hidden")==="true"&&t.push(r)}),t}class qf{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,r){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&_r(t.modalRef,!1);const o=Xf(r);is(r,t.mount,t.modalRef,o,!0);const a=ro(this.containers,s=>s.container===r);return a!==-1?(this.containers[a].modals.push(t),n):(this.containers.push({modals:[t],container:r,restore:null,hiddenSiblings:o}),n)}mount(t,r){const n=ro(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[n];o.restore||(o.restore=Hf(o,r))}remove(t,r=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const o=ro(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(n,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&_r(t.modalRef,r),is(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&_r(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Wf(e){return typeof e=="function"?e():e}function Yf(e){return e?e.props.hasOwnProperty("in"):!1}const Kf=new qf;function Jf(e){const{container:t,disableEscapeKeyDown:r=!1,disableScrollLock:n=!1,manager:o=Kf,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:c,children:p,onClose:f,open:m,rootRef:v}=e,g=N.useRef({}),d=N.useRef(null),h=N.useRef(null),u=We(h,v),[b,x]=N.useState(!m),O=Yf(p);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const k=()=>Oe(d.current),y=()=>(g.current.modalRef=h.current,g.current.mount=d.current,g.current),S=()=>{o.mount(y(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},C=Dr(()=>{const D=Wf(t)||k().body;o.add(y(),D),h.current&&S()}),I=N.useCallback(()=>o.isTopModal(y()),[o]),A=Dr(D=>{d.current=D,D&&(m&&I()?S():h.current&&_r(h.current,w))}),F=N.useCallback(()=>{o.remove(y(),w)},[w,o]);N.useEffect(()=>()=>{F()},[F]),N.useEffect(()=>{m?C():(!O||!a)&&F()},[m,F,O,a,C]);const T=D=>H=>{var ee;(ee=D.onKeyDown)==null||ee.call(D,H),!(H.key!=="Escape"||H.which===229||!I())&&(r||(H.stopPropagation(),f&&f(H,"escapeKeyDown")))},R=D=>H=>{var ee;(ee=D.onClick)==null||ee.call(D,H),H.target===H.currentTarget&&f&&f(H,"backdropClick")};return{getRootProps:(D={})=>{const H=Mi(e);delete H.onTransitionEnter,delete H.onTransitionExited;const ee=P({},H,D);return P({role:"presentation"},ee,{onKeyDown:T(ee),ref:u})},getBackdropProps:(D={})=>{const H=D;return P({"aria-hidden":!0},H,{onClick:R(H),open:m})},getTransitionProps:()=>{const D=()=>{x(!1),s&&s()},H=()=>{x(!0),c&&c(),a&&F()};return{onEnter:vo(D,p==null?void 0:p.props.onEnter),onExited:vo(H,p==null?void 0:p.props.onExited)}},rootRef:u,portalRef:A,isTopModal:I,exited:b,hasTransition:O}}var $e="top",Ye="bottom",Ke="right",Me="left",Yo="auto",Jr=[$e,Ye,Ke,Me],or="start",Fr="end",Zf="clippingParents",Li="viewport",xr="popper",Qf="reference",ls=Jr.reduce(function(e,t){return e.concat([t+"-"+or,t+"-"+Fr])},[]),Bi=[].concat(Jr,[Yo]).reduce(function(e,t){return e.concat([t,t+"-"+or,t+"-"+Fr])},[]),em="beforeRead",tm="read",rm="afterRead",nm="beforeMain",om="main",am="afterMain",sm="beforeWrite",im="write",lm="afterWrite",cm=[em,tm,rm,nm,om,am,sm,im,lm];function nt(e){return e?(e.nodeName||"").toLowerCase():null}function ze(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function zt(e){var t=ze(e).Element;return e instanceof t||e instanceof Element}function qe(e){var t=ze(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Ko(e){if(typeof ShadowRoot>"u")return!1;var t=ze(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function pm(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!qe(a)||!nt(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var c=o[s];c===!1?a.removeAttribute(s):a.setAttribute(s,c===!0?"":c)}))})}function dm(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=s.reduce(function(p,f){return p[f]="",p},{});!qe(o)||!nt(o)||(Object.assign(o.style,c),Object.keys(a).forEach(function(p){o.removeAttribute(p)}))})}}const um={name:"applyStyles",enabled:!0,phase:"write",fn:pm,effect:dm,requires:["computeStyles"]};function et(e){return e.split("-")[0]}var $t=Math.max,xn=Math.min,ar=Math.round;function xo(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Fi(){return!/^((?!chrome|android).)*safari/i.test(xo())}function sr(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&qe(e)&&(o=e.offsetWidth>0&&ar(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&ar(n.height)/e.offsetHeight||1);var s=zt(e)?ze(e):window,c=s.visualViewport,p=!Fi()&&r,f=(n.left+(p&&c?c.offsetLeft:0))/o,m=(n.top+(p&&c?c.offsetTop:0))/a,v=n.width/o,g=n.height/a;return{width:v,height:g,top:m,right:f+v,bottom:m+g,left:f,x:f,y:m}}function Jo(e){var t=sr(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Vi(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Ko(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function ft(e){return ze(e).getComputedStyle(e)}function fm(e){return["table","td","th"].indexOf(nt(e))>=0}function Tt(e){return((zt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Bn(e){return nt(e)==="html"?e:e.assignedSlot||e.parentNode||(Ko(e)?e.host:null)||Tt(e)}function cs(e){return!qe(e)||ft(e).position==="fixed"?null:e.offsetParent}function mm(e){var t=/firefox/i.test(xo()),r=/Trident/i.test(xo());if(r&&qe(e)){var n=ft(e);if(n.position==="fixed")return null}var o=Bn(e);for(Ko(o)&&(o=o.host);qe(o)&&["html","body"].indexOf(nt(o))<0;){var a=ft(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function Zr(e){for(var t=ze(e),r=cs(e);r&&fm(r)&&ft(r).position==="static";)r=cs(r);return r&&(nt(r)==="html"||nt(r)==="body"&&ft(r).position==="static")?t:r||mm(e)||t}function Zo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Ir(e,t,r){return $t(e,xn(t,r))}function hm(e,t,r){var n=Ir(e,t,r);return n>r?r:n}function zi(){return{top:0,right:0,bottom:0,left:0}}function Ui(e){return Object.assign({},zi(),e)}function Gi(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var gm=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Ui(typeof t!="number"?t:Gi(t,Jr))};function bm(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,c=et(r.placement),p=Zo(c),f=[Me,Ke].indexOf(c)>=0,m=f?"height":"width";if(!(!a||!s)){var v=gm(o.padding,r),g=Jo(a),d=p==="y"?$e:Me,h=p==="y"?Ye:Ke,u=r.rects.reference[m]+r.rects.reference[p]-s[p]-r.rects.popper[m],b=s[p]-r.rects.reference[p],x=Zr(a),O=x?p==="y"?x.clientHeight||0:x.clientWidth||0:0,w=u/2-b/2,k=v[d],y=O-g[m]-v[h],S=O/2-g[m]/2+w,C=Ir(k,S,y),I=p;r.modifiersData[n]=(t={},t[I]=C,t.centerOffset=C-S,t)}}function vm(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Vi(t.elements.popper,o)&&(t.elements.arrow=o))}const ym={name:"arrow",enabled:!0,phase:"main",fn:bm,effect:vm,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ir(e){return e.split("-")[1]}var wm={top:"auto",right:"auto",bottom:"auto",left:"auto"};function xm(e,t){var r=e.x,n=e.y,o=t.devicePixelRatio||1;return{x:ar(r*o)/o||0,y:ar(n*o)/o||0}}function ps(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,c=e.position,p=e.gpuAcceleration,f=e.adaptive,m=e.roundOffsets,v=e.isFixed,g=s.x,d=g===void 0?0:g,h=s.y,u=h===void 0?0:h,b=typeof m=="function"?m({x:d,y:u}):{x:d,y:u};d=b.x,u=b.y;var x=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),w=Me,k=$e,y=window;if(f){var S=Zr(r),C="clientHeight",I="clientWidth";if(S===ze(r)&&(S=Tt(r),ft(S).position!=="static"&&c==="absolute"&&(C="scrollHeight",I="scrollWidth")),S=S,o===$e||(o===Me||o===Ke)&&a===Fr){k=Ye;var A=v&&S===y&&y.visualViewport?y.visualViewport.height:S[C];u-=A-n.height,u*=p?1:-1}if(o===Me||(o===$e||o===Ye)&&a===Fr){w=Ke;var F=v&&S===y&&y.visualViewport?y.visualViewport.width:S[I];d-=F-n.width,d*=p?1:-1}}var T=Object.assign({position:c},f&&wm),R=m===!0?xm({x:d,y:u},ze(r)):{x:d,y:u};if(d=R.x,u=R.y,p){var _;return Object.assign({},T,(_={},_[k]=O?"0":"",_[w]=x?"0":"",_.transform=(y.devicePixelRatio||1)<=1?"translate("+d+"px, "+u+"px)":"translate3d("+d+"px, "+u+"px, 0)",_))}return Object.assign({},T,(t={},t[k]=O?u+"px":"",t[w]=x?d+"px":"",t.transform="",t))}function km(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,c=r.roundOffsets,p=c===void 0?!0:c,f={placement:et(t.placement),variation:ir(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ps(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:p})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ps(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:p})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Em={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:km,data:{}};var an={passive:!0};function Tm(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,c=s===void 0?!0:s,p=ze(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&f.forEach(function(m){m.addEventListener("scroll",r.update,an)}),c&&p.addEventListener("resize",r.update,an),function(){a&&f.forEach(function(m){m.removeEventListener("scroll",r.update,an)}),c&&p.removeEventListener("resize",r.update,an)}}const Nm={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Tm,data:{}};var Sm={left:"right",right:"left",bottom:"top",top:"bottom"};function dn(e){return e.replace(/left|right|bottom|top/g,function(t){return Sm[t]})}var Cm={start:"end",end:"start"};function ds(e){return e.replace(/start|end/g,function(t){return Cm[t]})}function Qo(e){var t=ze(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function ea(e){return sr(Tt(e)).left+Qo(e).scrollLeft}function jm(e,t){var r=ze(e),n=Tt(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,c=0,p=0;if(o){a=o.width,s=o.height;var f=Fi();(f||!f&&t==="fixed")&&(c=o.offsetLeft,p=o.offsetTop)}return{width:a,height:s,x:c+ea(e),y:p}}function Om(e){var t,r=Tt(e),n=Qo(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=$t(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=$t(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-n.scrollLeft+ea(e),p=-n.scrollTop;return ft(o||r).direction==="rtl"&&(c+=$t(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:c,y:p}}function ta(e){var t=ft(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Hi(e){return["html","body","#document"].indexOf(nt(e))>=0?e.ownerDocument.body:qe(e)&&ta(e)?e:Hi(Bn(e))}function $r(e,t){var r;t===void 0&&(t=[]);var n=Hi(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=ze(n),s=o?[a].concat(a.visualViewport||[],ta(n)?n:[]):n,c=t.concat(s);return o?c:c.concat($r(Bn(s)))}function ko(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Rm(e,t){var r=sr(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function us(e,t,r){return t===Li?ko(jm(e,r)):zt(t)?Rm(t,r):ko(Om(Tt(e)))}function Pm(e){var t=$r(Bn(e)),r=["absolute","fixed"].indexOf(ft(e).position)>=0,n=r&&qe(e)?Zr(e):e;return zt(n)?t.filter(function(o){return zt(o)&&Vi(o,n)&&nt(o)!=="body"}):[]}function _m(e,t,r,n){var o=t==="clippingParents"?Pm(e):[].concat(t),a=[].concat(o,[r]),s=a[0],c=a.reduce(function(p,f){var m=us(e,f,n);return p.top=$t(m.top,p.top),p.right=xn(m.right,p.right),p.bottom=xn(m.bottom,p.bottom),p.left=$t(m.left,p.left),p},us(e,s,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Xi(e){var t=e.reference,r=e.element,n=e.placement,o=n?et(n):null,a=n?ir(n):null,s=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,p;switch(o){case $e:p={x:s,y:t.y-r.height};break;case Ye:p={x:s,y:t.y+t.height};break;case Ke:p={x:t.x+t.width,y:c};break;case Me:p={x:t.x-r.width,y:c};break;default:p={x:t.x,y:t.y}}var f=o?Zo(o):null;if(f!=null){var m=f==="y"?"height":"width";switch(a){case or:p[f]=p[f]-(t[m]/2-r[m]/2);break;case Fr:p[f]=p[f]+(t[m]/2-r[m]/2);break}}return p}function Vr(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,c=r.boundary,p=c===void 0?Zf:c,f=r.rootBoundary,m=f===void 0?Li:f,v=r.elementContext,g=v===void 0?xr:v,d=r.altBoundary,h=d===void 0?!1:d,u=r.padding,b=u===void 0?0:u,x=Ui(typeof b!="number"?b:Gi(b,Jr)),O=g===xr?Qf:xr,w=e.rects.popper,k=e.elements[h?O:g],y=_m(zt(k)?k:k.contextElement||Tt(e.elements.popper),p,m,s),S=sr(e.elements.reference),C=Xi({reference:S,element:w,strategy:"absolute",placement:o}),I=ko(Object.assign({},w,C)),A=g===xr?I:S,F={top:y.top-A.top+x.top,bottom:A.bottom-y.bottom+x.bottom,left:y.left-A.left+x.left,right:A.right-y.right+x.right},T=e.modifiersData.offset;if(g===xr&&T){var R=T[o];Object.keys(F).forEach(function(_){var z=[Ke,Ye].indexOf(_)>=0?1:-1,G=[$e,Ye].indexOf(_)>=0?"y":"x";F[_]+=R[G]*z})}return F}function Im(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,c=r.flipVariations,p=r.allowedAutoPlacements,f=p===void 0?Bi:p,m=ir(n),v=m?c?ls:ls.filter(function(h){return ir(h)===m}):Jr,g=v.filter(function(h){return f.indexOf(h)>=0});g.length===0&&(g=v);var d=g.reduce(function(h,u){return h[u]=Vr(e,{placement:u,boundary:o,rootBoundary:a,padding:s})[et(u)],h},{});return Object.keys(d).sort(function(h,u){return d[h]-d[u]})}function $m(e){if(et(e)===Yo)return[];var t=dn(e);return[ds(e),t,ds(t)]}function Mm(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!0:s,p=r.fallbackPlacements,f=r.padding,m=r.boundary,v=r.rootBoundary,g=r.altBoundary,d=r.flipVariations,h=d===void 0?!0:d,u=r.allowedAutoPlacements,b=t.options.placement,x=et(b),O=x===b,w=p||(O||!h?[dn(b)]:$m(b)),k=[b].concat(w).reduce(function(U,Y){return U.concat(et(Y)===Yo?Im(t,{placement:Y,boundary:m,rootBoundary:v,padding:f,flipVariations:h,allowedAutoPlacements:u}):Y)},[]),y=t.rects.reference,S=t.rects.popper,C=new Map,I=!0,A=k[0],F=0;F<k.length;F++){var T=k[F],R=et(T),_=ir(T)===or,z=[$e,Ye].indexOf(R)>=0,G=z?"width":"height",D=Vr(t,{placement:T,boundary:m,rootBoundary:v,altBoundary:g,padding:f}),H=z?_?Ke:Me:_?Ye:$e;y[G]>S[G]&&(H=dn(H));var ee=dn(H),V=[];if(a&&V.push(D[R]<=0),c&&V.push(D[H]<=0,D[ee]<=0),V.every(function(U){return U})){A=T,I=!1;break}C.set(T,V)}if(I)for(var j=h?3:1,L=function(Y){var W=k.find(function(J){var K=C.get(J);if(K)return K.slice(0,Y).every(function(Z){return Z})});if(W)return A=W,"break"},X=j;X>0;X--){var q=L(X);if(q==="break")break}t.placement!==A&&(t.modifiersData[n]._skip=!0,t.placement=A,t.reset=!0)}}const Am={name:"flip",enabled:!0,phase:"main",fn:Mm,requiresIfExists:["offset"],data:{_skip:!1}};function fs(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function ms(e){return[$e,Ke,Ye,Me].some(function(t){return e[t]>=0})}function Dm(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Vr(t,{elementContext:"reference"}),c=Vr(t,{altBoundary:!0}),p=fs(s,n),f=fs(c,o,a),m=ms(p),v=ms(f);t.modifiersData[r]={referenceClippingOffsets:p,popperEscapeOffsets:f,isReferenceHidden:m,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":m,"data-popper-escaped":v})}const Lm={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Dm};function Bm(e,t,r){var n=et(e),o=[Me,$e].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],c=a[1];return s=s||0,c=(c||0)*o,[Me,Ke].indexOf(n)>=0?{x:c,y:s}:{x:s,y:c}}function Fm(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=Bi.reduce(function(m,v){return m[v]=Bm(v,t.rects,a),m},{}),c=s[t.placement],p=c.x,f=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=p,t.modifiersData.popperOffsets.y+=f),t.modifiersData[n]=s}const Vm={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Fm};function zm(e){var t=e.state,r=e.name;t.modifiersData[r]=Xi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Um={name:"popperOffsets",enabled:!0,phase:"read",fn:zm,data:{}};function Gm(e){return e==="x"?"y":"x"}function Hm(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,c=s===void 0?!1:s,p=r.boundary,f=r.rootBoundary,m=r.altBoundary,v=r.padding,g=r.tether,d=g===void 0?!0:g,h=r.tetherOffset,u=h===void 0?0:h,b=Vr(t,{boundary:p,rootBoundary:f,padding:v,altBoundary:m}),x=et(t.placement),O=ir(t.placement),w=!O,k=Zo(x),y=Gm(k),S=t.modifiersData.popperOffsets,C=t.rects.reference,I=t.rects.popper,A=typeof u=="function"?u(Object.assign({},t.rects,{placement:t.placement})):u,F=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),T=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,R={x:0,y:0};if(S){if(a){var _,z=k==="y"?$e:Me,G=k==="y"?Ye:Ke,D=k==="y"?"height":"width",H=S[k],ee=H+b[z],V=H-b[G],j=d?-I[D]/2:0,L=O===or?C[D]:I[D],X=O===or?-I[D]:-C[D],q=t.elements.arrow,U=d&&q?Jo(q):{width:0,height:0},Y=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:zi(),W=Y[z],J=Y[G],K=Ir(0,C[D],U[D]),Z=w?C[D]/2-j-K-W-F.mainAxis:L-K-W-F.mainAxis,Q=w?-C[D]/2+j+K+J+F.mainAxis:X+K+J+F.mainAxis,ie=t.elements.arrow&&Zr(t.elements.arrow),B=ie?k==="y"?ie.clientTop||0:ie.clientLeft||0:0,te=(_=T==null?void 0:T[k])!=null?_:0,$=H+Z-te-B,le=H+Q-te,Ne=Ir(d?xn(ee,$):ee,H,d?$t(V,le):V);S[k]=Ne,R[k]=Ne-H}if(c){var Pe,ke=k==="x"?$e:Me,Nt=k==="x"?Ye:Ke,_e=S[y],at=y==="y"?"height":"width",Le=_e+b[ke],st=_e-b[Nt],Se=[$e,Me].indexOf(x)!==-1,Ut=(Pe=T==null?void 0:T[y])!=null?Pe:0,St=Se?Le:_e-C[at]-I[at]-Ut+F.altAxis,fr=Se?_e+C[at]+I[at]-Ut-F.altAxis:st,en=d&&Se?hm(St,_e,fr):Ir(d?St:Le,_e,d?fr:st);S[y]=en,R[y]=en-_e}t.modifiersData[n]=R}}const Xm={name:"preventOverflow",enabled:!0,phase:"main",fn:Hm,requiresIfExists:["offset"]};function qm(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Wm(e){return e===ze(e)||!qe(e)?Qo(e):qm(e)}function Ym(e){var t=e.getBoundingClientRect(),r=ar(t.width)/e.offsetWidth||1,n=ar(t.height)/e.offsetHeight||1;return r!==1||n!==1}function Km(e,t,r){r===void 0&&(r=!1);var n=qe(t),o=qe(t)&&Ym(t),a=Tt(t),s=sr(e,o,r),c={scrollLeft:0,scrollTop:0},p={x:0,y:0};return(n||!n&&!r)&&((nt(t)!=="body"||ta(a))&&(c=Wm(t)),qe(t)?(p=sr(t,!0),p.x+=t.clientLeft,p.y+=t.clientTop):a&&(p.x=ea(a))),{x:s.left+c.scrollLeft-p.x,y:s.top+c.scrollTop-p.y,width:s.width,height:s.height}}function Jm(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(c){if(!r.has(c)){var p=t.get(c);p&&o(p)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function Zm(e){var t=Jm(e);return cm.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function Qm(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function eh(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var hs={placement:"bottom",modifiers:[],strategy:"absolute"};function gs(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function th(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?hs:o;return function(c,p,f){f===void 0&&(f=a);var m={placement:"bottom",orderedModifiers:[],options:Object.assign({},hs,a),modifiersData:{},elements:{reference:c,popper:p},attributes:{},styles:{}},v=[],g=!1,d={state:m,setOptions:function(x){var O=typeof x=="function"?x(m.options):x;u(),m.options=Object.assign({},a,m.options,O),m.scrollParents={reference:zt(c)?$r(c):c.contextElement?$r(c.contextElement):[],popper:$r(p)};var w=Zm(eh([].concat(n,m.options.modifiers)));return m.orderedModifiers=w.filter(function(k){return k.enabled}),h(),d.update()},forceUpdate:function(){if(!g){var x=m.elements,O=x.reference,w=x.popper;if(gs(O,w)){m.rects={reference:Km(O,Zr(w),m.options.strategy==="fixed"),popper:Jo(w)},m.reset=!1,m.placement=m.options.placement,m.orderedModifiers.forEach(function(F){return m.modifiersData[F.name]=Object.assign({},F.data)});for(var k=0;k<m.orderedModifiers.length;k++){if(m.reset===!0){m.reset=!1,k=-1;continue}var y=m.orderedModifiers[k],S=y.fn,C=y.options,I=C===void 0?{}:C,A=y.name;typeof S=="function"&&(m=S({state:m,options:I,name:A,instance:d})||m)}}}},update:Qm(function(){return new Promise(function(b){d.forceUpdate(),b(m)})}),destroy:function(){u(),g=!0}};if(!gs(c,p))return d;d.setOptions(f).then(function(b){!g&&f.onFirstUpdate&&f.onFirstUpdate(b)});function h(){m.orderedModifiers.forEach(function(b){var x=b.name,O=b.options,w=O===void 0?{}:O,k=b.effect;if(typeof k=="function"){var y=k({state:m,name:x,instance:d,options:w}),S=function(){};v.push(y||S)}})}function u(){v.forEach(function(b){return b()}),v=[]}return d}}var rh=[Nm,Um,Em,um,Vm,Am,Xm,ym,Lm],nh=th({defaultModifiers:rh});const qi="Popper";function oh(e){return Di(qi,e)}Mf(qi,["root"]);const ah=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],sh=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function ih(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function kn(e){return typeof e=="function"?e():e}function Fn(e){return e.nodeType!==void 0}function lh(e){return!Fn(e)}const ch=()=>mt({root:["root"]},Of(oh)),ph={},dh=N.forwardRef(function(t,r){var n;const{anchorEl:o,children:a,direction:s,disablePortal:c,modifiers:p,open:f,placement:m,popperOptions:v,popperRef:g,slotProps:d={},slots:h={},TransitionProps:u}=t,b=he(t,ah),x=N.useRef(null),O=We(x,r),w=N.useRef(null),k=We(w,g),y=N.useRef(k);Bt(()=>{y.current=k},[k]),N.useImperativeHandle(g,()=>w.current,[]);const S=ih(m,s),[C,I]=N.useState(S),[A,F]=N.useState(kn(o));N.useEffect(()=>{w.current&&w.current.forceUpdate()}),N.useEffect(()=>{o&&F(kn(o))},[o]),Bt(()=>{if(!A||!f)return;const G=ee=>{I(ee.placement)};if(process.env.NODE_ENV!=="production"&&A&&Fn(A)&&A.nodeType===1){const ee=A.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let D=[{name:"preventOverflow",options:{altBoundary:c}},{name:"flip",options:{altBoundary:c}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{G(ee)}}];p!=null&&(D=D.concat(p)),v&&v.modifiers!=null&&(D=D.concat(v.modifiers));const H=nh(A,x.current,P({placement:S},v,{modifiers:D}));return y.current(H),()=>{H.destroy(),y.current(null)}},[A,c,p,f,v,S]);const T={placement:C};u!==null&&(T.TransitionProps=u);const R=ch(),_=(n=h.root)!=null?n:"div",z=Vt({elementType:_,externalSlotProps:d.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:O},ownerState:t,className:R.root});return l.jsx(_,P({},z,{children:typeof a=="function"?a(T):a}))}),Wi=N.forwardRef(function(t,r){const{anchorEl:n,children:o,container:a,direction:s="ltr",disablePortal:c=!1,keepMounted:p=!1,modifiers:f,open:m,placement:v="bottom",popperOptions:g=ph,popperRef:d,style:h,transition:u=!1,slotProps:b={},slots:x={}}=t,O=he(t,sh),[w,k]=N.useState(!0),y=()=>{k(!1)},S=()=>{k(!0)};if(!p&&!m&&(!u||w))return null;let C;if(a)C=a;else if(n){const F=kn(n);C=F&&Fn(F)?Oe(F).body:Oe(null).body}const I=!m&&p&&(!u||w)?"none":void 0,A=u?{in:m,onEnter:y,onExited:S}:void 0;return l.jsx(Br,{disablePortal:c,container:C,children:l.jsx(dh,P({anchorEl:n,direction:s,disablePortal:c,modifiers:f,ref:r,open:u?!w:m,placement:v,popperOptions:g,popperRef:d,slotProps:b,slots:x},O,{style:P({position:"fixed",top:0,left:0,display:I},h),TransitionProps:A,children:o}))})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={anchorEl:dr(i.oneOfType([dt,i.object,i.func]),e=>{if(e.open){const t=kn(e.anchorEl);if(t&&Fn(t)&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||lh(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([dt,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Bo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});function Qr(){const e=Ri(Xo);return process.env.NODE_ENV!=="production"&&N.useDebugValue(e),e[qo]||e}function Eo(e,t){return Eo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},Eo(e,t)}function uh(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Eo(e,t)}const bs={disabled:!1};var fh=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const Yi=E.createContext(null);var mh=function(t){return t.scrollTop},Or="unmounted",jt="exited",Ot="entering",Jt="entered",To="exiting",gt=function(e){uh(t,e);function t(n,o){var a;a=e.call(this,n,o)||this;var s=o,c=s&&!s.isMounting?n.enter:n.appear,p;return a.appearStatus=null,n.in?c?(p=jt,a.appearStatus=Ot):p=Jt:n.unmountOnExit||n.mountOnEnter?p=Or:p=jt,a.state={status:p},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===Or?{status:jt}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Ot&&s!==Jt&&(a=Ot):(s===Ot||s===Jt)&&(a=To)}this.updateStatus(!1,a)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var o=this.props.timeout,a,s,c;return a=s=c=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:c}},r.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Ot){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this);s&&mh(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===jt&&this.setState({status:Or})},r.performEnter=function(o){var a=this,s=this.props.enter,c=this.context?this.context.isMounting:o,p=this.props.nodeRef?[c]:[Nr.findDOMNode(this),c],f=p[0],m=p[1],v=this.getTimeouts(),g=c?v.appear:v.enter;if(!o&&!s||bs.disabled){this.safeSetState({status:Jt},function(){a.props.onEntered(f)});return}this.props.onEnter(f,m),this.safeSetState({status:Ot},function(){a.props.onEntering(f,m),a.onTransitionEnd(g,function(){a.safeSetState({status:Jt},function(){a.props.onEntered(f,m)})})})},r.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:Nr.findDOMNode(this);if(!a||bs.disabled){this.safeSetState({status:jt},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:To},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:jt},function(){o.props.onExited(c)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},r.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,a.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},r.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:Nr.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],f=p[0],m=p[1];this.props.addEndListener(f,m)}o!=null&&setTimeout(this.nextCallback,o)},r.render=function(){var o=this.state.status;if(o===Or)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var c=he(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return E.createElement(Yi.Provider,{value:null},typeof s=="function"?s(o,c):E.cloneElement(E.Children.only(s),c))},t}(E.Component);gt.contextType=Yi;gt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,r,n,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,r,n,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var r=fh;t.addEndListener||(r=r.isRequired);for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return r.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Yt(){}gt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Yt,onEntering:Yt,onEntered:Yt,onExit:Yt,onExiting:Yt,onExited:Yt};gt.UNMOUNTED=Or;gt.EXITED=jt;gt.ENTERING=Ot;gt.ENTERED=Jt;gt.EXITING=To;const Ki=gt,Ji=e=>e.scrollTop;function En(e,t){var r,n;const{timeout:o,easing:a,style:s={}}=e;return{duration:(r=s.transitionDuration)!=null?r:typeof o=="number"?o:o[t.mode]||0,easing:(n=s.transitionTimingFunction)!=null?n:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const hh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function No(e){return`scale(${e}, ${e**2})`}const gh={entering:{opacity:1,transform:No(1)},entered:{opacity:1,transform:"none"}},no=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),ra=N.forwardRef(function(t,r){const{addEndListener:n,appear:o=!0,children:a,easing:s,in:c,onEnter:p,onEntered:f,onEntering:m,onExit:v,onExited:g,onExiting:d,style:h,timeout:u="auto",TransitionComponent:b=Ki}=t,x=he(t,hh),O=Cr(),w=N.useRef(),k=Qr(),y=N.useRef(null),S=We(y,a.ref,r),C=G=>D=>{if(G){const H=y.current;D===void 0?G(H):G(H,D)}},I=C(m),A=C((G,D)=>{Ji(G);const{duration:H,delay:ee,easing:V}=En({style:h,timeout:u,easing:s},{mode:"enter"});let j;u==="auto"?(j=k.transitions.getAutoHeightDuration(G.clientHeight),w.current=j):j=H,G.style.transition=[k.transitions.create("opacity",{duration:j,delay:ee}),k.transitions.create("transform",{duration:no?j:j*.666,delay:ee,easing:V})].join(","),p&&p(G,D)}),F=C(f),T=C(d),R=C(G=>{const{duration:D,delay:H,easing:ee}=En({style:h,timeout:u,easing:s},{mode:"exit"});let V;u==="auto"?(V=k.transitions.getAutoHeightDuration(G.clientHeight),w.current=V):V=D,G.style.transition=[k.transitions.create("opacity",{duration:V,delay:H}),k.transitions.create("transform",{duration:no?V:V*.666,delay:no?H:H||V*.333,easing:ee})].join(","),G.style.opacity=0,G.style.transform=No(.75),v&&v(G)}),_=C(g),z=G=>{u==="auto"&&O.start(w.current||0,G),n&&n(y.current,G)};return l.jsx(b,P({appear:o,in:c,nodeRef:y,onEnter:A,onEntered:F,onEntering:I,onExit:R,onExited:_,onExiting:T,addEndListener:z,timeout:u==="auto"?null:u},x,{children:(G,D)=>N.cloneElement(a,P({style:P({opacity:0,transform:No(.75),visibility:G==="exited"&&!c?"hidden":void 0},gh[G],h,a.props.style),ref:S},D))}))});process.env.NODE_ENV!=="production"&&(ra.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});ra.muiSupportAuto=!0;const So=ra,bh=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},vs=bh,vh=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],yh=Re(Wi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Zi=N.forwardRef(function(t,r){var n;const o=Oi(),a=ht({props:t,name:"MuiPopper"}),{anchorEl:s,component:c,components:p,componentsProps:f,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:O,slots:w,slotProps:k}=a,y=he(a,vh),S=(n=w==null?void 0:w.root)!=null?n:p==null?void 0:p.Root,C=P({anchorEl:s,container:m,disablePortal:v,keepMounted:g,modifiers:d,open:h,placement:u,popperOptions:b,popperRef:x,transition:O},y);return l.jsx(yh,P({as:c,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:k??f},C,{ref:r}))});process.env.NODE_ENV!=="production"&&(Zi.propTypes={anchorEl:i.oneOfType([dt,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([dt,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:Bo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const Qi=Zi;function wh(e){return ot("MuiTooltip",e)}const xh=kt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),xt=xh,kh=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Eh(e){return Math.round(e*1e5)/1e5}const Th=e=>{const{classes:t,disableInteractive:r,arrow:n,touch:o,placement:a}=e,s={popper:["popper",!r&&"popperInteractive",n&&"popperArrow"],tooltip:["tooltip",n&&"tooltipArrow",o&&"touch",`tooltipPlacement${rt(a.split("-")[0])}`],arrow:["arrow"]};return mt(s,wh,t)},Nh=Re(Qi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.popper,!r.disableInteractive&&t.popperInteractive,r.arrow&&t.popperArrow,!r.open&&t.popperClose]}})(({theme:e,ownerState:t,open:r})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!r&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${xt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${xt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${xt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${xt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Sh=Re("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.tooltip,r.touch&&t.touch,r.arrow&&t.tooltipArrow,t[`tooltipPlacement${rt(r.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:yn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Eh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${xt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${xt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${xt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${xt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Ch=Re("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:yn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let sn=!1;const ys=new Wr;let kr={x:0,y:0};function ln(e,t){return r=>{t&&t(r),e(r)}}const el=N.forwardRef(function(t,r){var n,o,a,s,c,p,f,m,v,g,d,h,u,b,x,O,w,k,y;const S=ht({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:I,components:A={},componentsProps:F={},describeChild:T=!1,disableFocusListener:R=!1,disableHoverListener:_=!1,disableInteractive:z=!1,disableTouchListener:G=!1,enterDelay:D=100,enterNextDelay:H=0,enterTouchDelay:ee=700,followCursor:V=!1,id:j,leaveDelay:L=0,leaveTouchDelay:X=1500,onClose:q,onOpen:U,open:Y,placement:W="bottom",PopperComponent:J,PopperProps:K={},slotProps:Z={},slots:Q={},title:ie,TransitionComponent:B=So,TransitionProps:te}=S,$=he(S,kh),le=N.isValidElement(I)?I:l.jsx("span",{children:I}),Ne=Qr(),Pe=Ne.direction==="rtl",[ke,Nt]=N.useState(),[_e,at]=N.useState(null),Le=N.useRef(!1),st=z||V,Se=Cr(),Ut=Cr(),St=Cr(),fr=Cr(),[en,ua]=bi({controlled:Y,default:!1,name:"Tooltip",state:"open"});let it=en;if(process.env.NODE_ENV!=="production"){const{current:oe}=N.useRef(Y!==void 0);N.useEffect(()=>{ke&&ke.disabled&&!oe&&ie!==""&&ke.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ie,ke,oe])}const Vn=gi(j),mr=N.useRef(),tn=Dr(()=>{mr.current!==void 0&&(document.body.style.WebkitUserSelect=mr.current,mr.current=void 0),fr.clear()});N.useEffect(()=>tn,[tn]);const fa=oe=>{ys.clear(),sn=!0,ua(!0),U&&!it&&U(oe)},rn=Dr(oe=>{ys.start(800+L,()=>{sn=!1}),ua(!1),q&&it&&q(oe),Se.start(Ne.transitions.duration.shortest,()=>{Le.current=!1})}),zn=oe=>{Le.current&&oe.type!=="touchstart"||(ke&&ke.removeAttribute("title"),Ut.clear(),St.clear(),D||sn&&H?Ut.start(sn?H:D,()=>{fa(oe)}):fa(oe))},ma=oe=>{Ut.clear(),St.start(L,()=>{rn(oe)})},{isFocusVisibleRef:ha,onBlur:sc,onFocus:ic,ref:lc}=vi(),[,ga]=N.useState(!1),ba=oe=>{sc(oe),ha.current===!1&&(ga(!1),ma(oe))},va=oe=>{ke||Nt(oe.currentTarget),ic(oe),ha.current===!0&&(ga(!0),zn(oe))},ya=oe=>{Le.current=!0;const Be=le.props;Be.onTouchStart&&Be.onTouchStart(oe)},wa=zn,xa=ma,cc=oe=>{ya(oe),St.clear(),Se.clear(),tn(),mr.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",fr.start(ee,()=>{document.body.style.WebkitUserSelect=mr.current,zn(oe)})},pc=oe=>{le.props.onTouchEnd&&le.props.onTouchEnd(oe),tn(),St.start(X,()=>{rn(oe)})};N.useEffect(()=>{if(!it)return;function oe(Be){(Be.key==="Escape"||Be.key==="Esc")&&rn(Be)}return document.addEventListener("keydown",oe),()=>{document.removeEventListener("keydown",oe)}},[rn,it]);const dc=We(le.ref,lc,Nt,r);!ie&&ie!==0&&(it=!1);const Un=N.useRef(),uc=oe=>{const Be=le.props;Be.onMouseMove&&Be.onMouseMove(oe),kr={x:oe.clientX,y:oe.clientY},Un.current&&Un.current.update()},hr={},Gn=typeof ie=="string";T?(hr.title=!it&&Gn&&!_?ie:null,hr["aria-describedby"]=it?Vn:null):(hr["aria-label"]=Gn?ie:null,hr["aria-labelledby"]=it&&!Gn?Vn:null);const Ge=P({},hr,$,le.props,{className:Ce($.className,le.props.className),onTouchStart:ya,ref:dc},V?{onMouseMove:uc}:{});process.env.NODE_ENV!=="production"&&(Ge["data-mui-internal-clone-element"]=!0,N.useEffect(()=>{ke&&!ke.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ke]));const gr={};G||(Ge.onTouchStart=cc,Ge.onTouchEnd=pc),_||(Ge.onMouseOver=ln(wa,Ge.onMouseOver),Ge.onMouseLeave=ln(xa,Ge.onMouseLeave),st||(gr.onMouseOver=wa,gr.onMouseLeave=xa)),R||(Ge.onFocus=ln(va,Ge.onFocus),Ge.onBlur=ln(ba,Ge.onBlur),st||(gr.onFocus=va,gr.onBlur=ba)),process.env.NODE_ENV!=="production"&&le.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));const fc=N.useMemo(()=>{var oe;let Be=[{name:"arrow",enabled:!!_e,options:{element:_e,padding:4}}];return(oe=K.popperOptions)!=null&&oe.modifiers&&(Be=Be.concat(K.popperOptions.modifiers)),P({},K.popperOptions,{modifiers:Be})},[_e,K]),br=P({},S,{isRtl:Pe,arrow:C,disableInteractive:st,placement:W,PopperComponentProp:J,touch:Le.current}),Hn=Th(br),ka=(n=(o=Q.popper)!=null?o:A.Popper)!=null?n:Nh,Ea=(a=(s=(c=Q.transition)!=null?c:A.Transition)!=null?s:B)!=null?a:So,Ta=(p=(f=Q.tooltip)!=null?f:A.Tooltip)!=null?p:Sh,Na=(m=(v=Q.arrow)!=null?v:A.Arrow)!=null?m:Ch,mc=jr(ka,P({},K,(g=Z.popper)!=null?g:F.popper,{className:Ce(Hn.popper,K==null?void 0:K.className,(d=(h=Z.popper)!=null?h:F.popper)==null?void 0:d.className)}),br),hc=jr(Ea,P({},te,(u=Z.transition)!=null?u:F.transition),br),gc=jr(Ta,P({},(b=Z.tooltip)!=null?b:F.tooltip,{className:Ce(Hn.tooltip,(x=(O=Z.tooltip)!=null?O:F.tooltip)==null?void 0:x.className)}),br),bc=jr(Na,P({},(w=Z.arrow)!=null?w:F.arrow,{className:Ce(Hn.arrow,(k=(y=Z.arrow)!=null?y:F.arrow)==null?void 0:k.className)}),br);return l.jsxs(N.Fragment,{children:[N.cloneElement(le,Ge),l.jsx(ka,P({as:J??Qi,placement:W,anchorEl:V?{getBoundingClientRect:()=>({top:kr.y,left:kr.x,right:kr.x,bottom:kr.y,width:0,height:0})}:ke,popperRef:Un,open:ke?it:!1,id:Vn,transition:!0},gr,mc,{popperOptions:fc,children:({TransitionProps:oe})=>l.jsx(Ea,P({timeout:Ne.transitions.duration.shorter},oe,hc,{children:l.jsxs(Ta,P({},gc,{children:[ie,C?l.jsx(Na,P({},bc,{ref:at})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(el.propTypes={arrow:i.bool,children:qr.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const jh=el;function ws(e,t,r){return e?l.jsx(Te.ListItemIcon,{className:`papi-menu-icon-${r?"leading":"trailing"}`,children:l.jsx("img",{src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`})}):void 0}function na(e){const{onClick:t,label:r,tooltip:n,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:c=!1,className:p,isDisabled:f=!1,isDense:m=!0,isSubMenuParent:v=!1,hasDisabledGutters:g=!1,hasDivider:d=!1,focusVisibleClassName:h,id:u,children:b}=e,x=l.jsx(Te.MenuItem,{sx:{lineHeight:.8},autoFocus:c,className:p,disabled:f,dense:m,disableGutters:g,divider:d,focusVisibleClassName:h,onClick:t,id:u,children:r?l.jsxs(l.Fragment,{children:[ws(a,r,!0),l.jsx(Te.ListItemText,{primary:r,inset:!a&&o}),v?l.jsx(Te.ListItemIcon,{className:"papi-menu-icon-trailing",children:l.jsx(Ii,{})}):ws(s,r,!1)]}):b});return n?l.jsx(jh,{title:n,placement:"right",children:l.jsx("div",{children:x})}):x}function tl(e){return Object.entries(e.groups).map(([r,n])=>({id:r,group:n}))}function Oh(e){const[t,r]=E.useState(void 0),{parentMenuItem:n,parentItemProps:o,menuDefinition:a}=e,s=f=>{r(f.currentTarget)},c=()=>{r(void 0)},p=()=>{let f=tl(a).filter(m=>"menuItem"in m.group);if(!(n!=null&&n.id))throw new Error("A valid parent menu item is required for submenus.");return f=f.filter(m=>"menuItem"in m.group&&m.group.menuItem===n.id),l.jsx(oa,{...e,includedGroups:f})};return l.jsxs(l.Fragment,{children:[l.jsx(na,{onClick:s,...o,isSubMenuParent:!0}),l.jsx(Te.Menu,{anchorEl:t,open:!!t,onClose:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:p()},n.id)]})}const Rh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function oa(e){const{menuDefinition:t,onClick:r,commandHandler:n,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=E.useMemo(()=>{const m=o&&o.length>0?o:tl(t).filter(h=>!("menuItem"in h.group)),v=Object.values(m).sort((h,u)=>(h.group.order||0)-(u.group.order||0)),g=[];v.forEach(h=>{Rh(h.id,t.items).forEach(u=>g.push({item:u,isLastItemInGroup:!1})),g.length>0&&(g[g.length-1].isLastItemInGroup=!0)}),g.length>0&&(g[g.length-1].isLastItemInGroup=!1);const d=g.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:g,allowForLeadingIcons:d}},[o,t]),c=({item:m,isLastItemInGroup:v})=>({className:"papi-menu-item",label:m.label,tooltip:m.tooltip,iconPathBefore:"iconPathBefore"in m?m.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in m?m.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[p]=a;if(!p)return l.jsx("div",{});const f=p.item.group;return l.jsx("div",{role:"menu","aria-label":f,children:a.map((m,v)=>{const{item:g}=m,d=c(m);if("command"in g){const h=g.group+v;return l.jsx(na,{onClick:u=>{r==null||r(u),n(g)},...d},h)}return l.jsx(Oh,{parentMenuItem:g,parentItemProps:d,...e},f+g.id)})},f)}function Ph(e){const{menuDefinition:t,columnId:r}=e;let a=Object.entries(t.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return r&&"columns"in t&&t.columns[r]&&(a=a.filter(s=>"column"in s.group&&s.group.column===r)),l.jsx(oa,{...e,includedGroups:a})}function _h({commandHandler:e,menuDefinition:t,id:r,metadata:n,onClick:o,className:a}){return l.jsxs(Te.Grid,{id:r,item:!0,xs:"auto",role:"menu","aria-label":r,className:`papi-menu-column ${a??""}`,children:[l.jsx("h3",{"aria-label":n.label,className:`papi-menu-column-header ${a??""}`,children:n.label}),l.jsx(Te.List,{id:r,dense:!0,className:a??"",children:l.jsx(Ph,{commandHandler:e,menuDefinition:t,columnId:r,onClick:o})})]})}function rl({commandHandler:e,className:t,multiColumnMenu:r,id:n}){const{columns:o}=r,a=E.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const p=c,f=o[p];typeof f=="object"&&typeof f.order=="number"&&!Number.isNaN(f.order)?s.set(f.order,{id:p,metadata:f}):console.warn(`Property ${c} (${typeof f}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((c,p)=>(c.metadata.order||0)-(p.metadata.order||0))},[o,n]);return l.jsx(Te.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:n,children:a.map((s,c)=>l.jsx(_h,{commandHandler:e,menuDefinition:r,...s,className:t},c))})}const nl=N.createContext({});process.env.NODE_ENV!=="production"&&(nl.displayName="ListContext");const Ih=nl;function $h(e){return ot("MuiList",e)}kt("MuiList",["root","padding","dense","subheader"]);const Mh=["children","className","component","dense","disablePadding","subheader"],Ah=e=>{const{classes:t,disablePadding:r,dense:n,subheader:o}=e;return mt({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},$h,t)},Dh=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>P({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ol=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:c=!1,disablePadding:p=!1,subheader:f}=n,m=he(n,Mh),v=N.useMemo(()=>({dense:c}),[c]),g=P({},n,{component:s,dense:c,disablePadding:p}),d=Ah(g);return l.jsx(Ih.Provider,{value:v,children:l.jsxs(Dh,P({as:s,className:Ce(d.root,a),ref:r,ownerState:g},m,{children:[f,o]}))})});process.env.NODE_ENV!=="production"&&(ol.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Lh=ol,Bh=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function oo(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function xs(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function al(e,t){if(t===void 0)return!0;let r=e.innerText;return r===void 0&&(r=e.textContent),r=r.trim().toLowerCase(),r.length===0?!1:t.repeating?r[0]===t.keys[0]:r.indexOf(t.keys.join(""))===0}function Er(e,t,r,n,o,a){let s=!1,c=o(e,t,t?r:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const p=n?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!al(c,a)||p)c=o(e,c,r);else return c.focus(),!0}return!1}const sl=N.forwardRef(function(t,r){const{actions:n,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:f=!1,onKeyDown:m,variant:v="selectedMenu"}=t,g=he(t,Bh),d=N.useRef(null),h=N.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Bt(()=>{o&&d.current.focus()},[o]),N.useImperativeHandle(n,()=>({adjustStyleForScrollbar:(w,k)=>{const y=!d.current.style.width;if(w.clientHeight<d.current.clientHeight&&y){const S=`${yi(Oe(w))}px`;d.current.style[k.direction==="rtl"?"paddingLeft":"paddingRight"]=S,d.current.style.width=`calc(100% + ${S})`}return d.current}}),[]);const u=w=>{const k=d.current,y=w.key,S=Oe(k).activeElement;if(y==="ArrowDown")w.preventDefault(),Er(k,S,f,p,oo);else if(y==="ArrowUp")w.preventDefault(),Er(k,S,f,p,xs);else if(y==="Home")w.preventDefault(),Er(k,null,f,p,oo);else if(y==="End")w.preventDefault(),Er(k,null,f,p,xs);else if(y.length===1){const C=h.current,I=y.toLowerCase(),A=performance.now();C.keys.length>0&&(A-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&I!==C.keys[0]&&(C.repeating=!1)),C.lastTime=A,C.keys.push(I);const F=S&&!C.repeating&&al(S,C);C.previousKeyMatched&&(F||Er(k,S,!1,p,oo,C))?w.preventDefault():C.previousKeyMatched=!1}m&&m(w)},b=We(d,r);let x=-1;N.Children.forEach(s,(w,k)=>{if(!N.isValidElement(w)){x===k&&(x+=1,x>=s.length&&(x=-1));return}process.env.NODE_ENV!=="production"&&gn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(v==="selectedMenu"&&w.props.selected||x===-1)&&(x=k),x===k&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(x+=1,x>=s.length&&(x=-1))});const O=N.Children.map(s,(w,k)=>{if(k===x){const y={};return a&&(y.autoFocus=!0),w.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),N.cloneElement(w,y)}return w});return l.jsx(Lh,P({role:"menu",ref:b,className:c,onKeyDown:u,tabIndex:o?0:-1},g,{children:O}))});process.env.NODE_ENV!=="production"&&(sl.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Fh=sl,Vh=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],zh={entering:{opacity:1},entered:{opacity:1}},il=N.forwardRef(function(t,r){const n=Qr(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:c,easing:p,in:f,onEnter:m,onEntered:v,onEntering:g,onExit:d,onExited:h,onExiting:u,style:b,timeout:x=o,TransitionComponent:O=Ki}=t,w=he(t,Vh),k=N.useRef(null),y=We(k,c.ref,r),S=z=>G=>{if(z){const D=k.current;G===void 0?z(D):z(D,G)}},C=S(g),I=S((z,G)=>{Ji(z);const D=En({style:b,timeout:x,easing:p},{mode:"enter"});z.style.webkitTransition=n.transitions.create("opacity",D),z.style.transition=n.transitions.create("opacity",D),m&&m(z,G)}),A=S(v),F=S(u),T=S(z=>{const G=En({style:b,timeout:x,easing:p},{mode:"exit"});z.style.webkitTransition=n.transitions.create("opacity",G),z.style.transition=n.transitions.create("opacity",G),d&&d(z)}),R=S(h),_=z=>{a&&a(k.current,z)};return l.jsx(O,P({appear:s,in:f,nodeRef:k,onEnter:I,onEntered:A,onEntering:C,onExit:T,onExited:R,onExiting:F,addEndListener:_,timeout:x},w,{children:(z,G)=>N.cloneElement(c,P({style:P({opacity:0,visibility:z==="exited"&&!f?"hidden":void 0},zh[z],b,c.props.style),ref:y},G))}))});process.env.NODE_ENV!=="production"&&(il.propTypes={addEndListener:i.func,appear:i.bool,children:qr.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Uh=il;function Gh(e){return ot("MuiBackdrop",e)}kt("MuiBackdrop",["root","invisible"]);const Hh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Xh=e=>{const{classes:t,invisible:r}=e;return mt({root:["root",r&&"invisible"]},Gh,t)},qh=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.invisible&&t.invisible]}})(({ownerState:e})=>P({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ll=N.forwardRef(function(t,r){var n,o,a;const s=ht({props:t,name:"MuiBackdrop"}),{children:c,className:p,component:f="div",components:m={},componentsProps:v={},invisible:g=!1,open:d,slotProps:h={},slots:u={},TransitionComponent:b=Uh,transitionDuration:x}=s,O=he(s,Hh),w=P({},s,{component:f,invisible:g}),k=Xh(w),y=(n=h.root)!=null?n:v.root;return l.jsx(b,P({in:d,timeout:x},O,{children:l.jsx(qh,P({"aria-hidden":!0},y,{as:(o=(a=u.root)!=null?a:m.Root)!=null?o:f,className:Ce(k.root,p,y==null?void 0:y.className),ownerState:P({},w,y==null?void 0:y.ownerState),classes:k,ref:r,children:c}))}))});process.env.NODE_ENV!=="production"&&(ll.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Wh=ll;function Yh(e){return ot("MuiModal",e)}kt("MuiModal",["root","hidden","backdrop"]);const Kh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Jh=e=>{const{open:t,exited:r,classes:n}=e;return mt({root:["root",!t&&r&&"hidden"],backdrop:["backdrop"]},Yh,n)},Zh=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,!r.open&&r.exited&&t.hidden]}})(({theme:e,ownerState:t})=>P({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Qh=Re(Wh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),cl=N.forwardRef(function(t,r){var n,o,a,s,c,p;const f=ht({name:"MuiModal",props:t}),{BackdropComponent:m=Qh,BackdropProps:v,className:g,closeAfterTransition:d=!1,children:h,container:u,component:b,components:x={},componentsProps:O={},disableAutoFocus:w=!1,disableEnforceFocus:k=!1,disableEscapeKeyDown:y=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:I=!1,hideBackdrop:A=!1,keepMounted:F=!1,onBackdropClick:T,open:R,slotProps:_,slots:z}=f,G=he(f,Kh),D=P({},f,{closeAfterTransition:d,disableAutoFocus:w,disableEnforceFocus:k,disableEscapeKeyDown:y,disablePortal:S,disableRestoreFocus:C,disableScrollLock:I,hideBackdrop:A,keepMounted:F}),{getRootProps:H,getBackdropProps:ee,getTransitionProps:V,portalRef:j,isTopModal:L,exited:X,hasTransition:q}=Jf(P({},D,{rootRef:r})),U=P({},D,{exited:X}),Y=Jh(U),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),q){const{onEnter:te,onExited:$}=V();W.onEnter=te,W.onExited=$}const J=(n=(o=z==null?void 0:z.root)!=null?o:x.Root)!=null?n:Zh,K=(a=(s=z==null?void 0:z.backdrop)!=null?s:x.Backdrop)!=null?a:m,Z=(c=_==null?void 0:_.root)!=null?c:O.root,Q=(p=_==null?void 0:_.backdrop)!=null?p:O.backdrop,ie=Vt({elementType:J,externalSlotProps:Z,externalForwardedProps:G,getSlotProps:H,additionalProps:{ref:r,as:b},ownerState:U,className:Ce(g,Z==null?void 0:Z.className,Y==null?void 0:Y.root,!U.open&&U.exited&&(Y==null?void 0:Y.hidden))}),B=Vt({elementType:K,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(P({},te,{onClick:$=>{T&&T($),te!=null&&te.onClick&&te.onClick($)}})),className:Ce(Q==null?void 0:Q.className,v==null?void 0:v.className,Y==null?void 0:Y.backdrop),ownerState:U});return!F&&!R&&(!q||X)?null:l.jsx(Br,{ref:j,container:u,disablePortal:S,children:l.jsxs(J,P({},ie,{children:[!A&&m?l.jsx(K,P({},B)):null,l.jsx(wn,{disableEnforceFocus:k,disableAutoFocus:w,disableRestoreFocus:C,isEnabled:L,open:R,children:N.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(cl.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:qr.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([dt,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const eg=cl;function tg(e){return ot("MuiPaper",e)}kt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const rg=["className","component","elevation","square","variant"],ng=e=>{const{square:t,elevation:r,variant:n,classes:o}=e,a={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${r}`]};return mt(a,tg,o)},og=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,r.variant==="elevation"&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return P({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&P({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${yn("#fff",vs(t.elevation))}, ${yn("#fff",vs(t.elevation))})`},e.vars&&{backgroundImage:(r=e.vars.overlays)==null?void 0:r[t.elevation]}))}),pl=N.forwardRef(function(t,r){const n=ht({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:c=!1,variant:p="elevation"}=n,f=he(n,rg),m=P({},n,{component:a,elevation:s,square:c,variant:p}),v=ng(m);return process.env.NODE_ENV!=="production"&&Qr().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),l.jsx(og,P({as:a,ownerState:m,className:Ce(v.root,o),ref:r},f))});process.env.NODE_ENV!=="production"&&(pl.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:dr(ki,e=>{const{elevation:t,variant:r}=e;return t>0&&r==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const ag=pl;function sg(e){return ot("MuiPopover",e)}kt("MuiPopover",["root","paper"]);const ig=["onEntering"],lg=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],cg=["slotProps"];function ks(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.height/2:t==="bottom"&&(r=e.height),r}function Es(e,t){let r=0;return typeof t=="number"?r=t:t==="center"?r=e.width/2:t==="right"&&(r=e.width),r}function Ts(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function un(e){return typeof e=="function"?e():e}const pg=e=>{const{classes:t}=e;return mt({root:["root"],paper:["paper"]},sg,t)},dg=Re(eg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),dl=Re(ag,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),ul=N.forwardRef(function(t,r){var n,o,a;const s=ht({props:t,name:"MuiPopover"}),{action:c,anchorEl:p,anchorOrigin:f={vertical:"top",horizontal:"left"},anchorPosition:m,anchorReference:v="anchorEl",children:g,className:d,container:h,elevation:u=8,marginThreshold:b=16,open:x,PaperProps:O={},slots:w,slotProps:k,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:S=So,transitionDuration:C="auto",TransitionProps:{onEntering:I}={},disableScrollLock:A=!1}=s,F=he(s.TransitionProps,ig),T=he(s,lg),R=(n=k==null?void 0:k.paper)!=null?n:O,_=N.useRef(),z=We(_,R.ref),G=P({},s,{anchorOrigin:f,anchorReference:v,elevation:u,marginThreshold:b,externalPaperSlotProps:R,transformOrigin:y,TransitionComponent:S,transitionDuration:C,TransitionProps:F}),D=pg(G),H=N.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(m||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),m;const te=un(p),$=te&&te.nodeType===1?te:Oe(_.current).body,le=$.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ne=$.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ne.top===0&&Ne.left===0&&Ne.right===0&&Ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:le.top+ks(le,f.vertical),left:le.left+Es(le,f.horizontal)}},[p,f.horizontal,f.vertical,m,v]),ee=N.useCallback(te=>({vertical:ks(te,y.vertical),horizontal:Es(te,y.horizontal)}),[y.horizontal,y.vertical]),V=N.useCallback(te=>{const $={width:te.offsetWidth,height:te.offsetHeight},le=ee($);if(v==="none")return{top:null,left:null,transformOrigin:Ts(le)};const Ne=H();let Pe=Ne.top-le.vertical,ke=Ne.left-le.horizontal;const Nt=Pe+$.height,_e=ke+$.width,at=nr(un(p)),Le=at.innerHeight-b,st=at.innerWidth-b;if(b!==null&&Pe<b){const Se=Pe-b;Pe-=Se,le.vertical+=Se}else if(b!==null&&Nt>Le){const Se=Nt-Le;Pe-=Se,le.vertical+=Se}if(process.env.NODE_ENV!=="production"&&$.height>Le&&$.height&&Le&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${$.height-Le}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),b!==null&&ke<b){const Se=ke-b;ke-=Se,le.horizontal+=Se}else if(_e>st){const Se=_e-st;ke-=Se,le.horizontal+=Se}return{top:`${Math.round(Pe)}px`,left:`${Math.round(ke)}px`,transformOrigin:Ts(le)}},[p,v,H,ee,b]),[j,L]=N.useState(x),X=N.useCallback(()=>{const te=_.current;if(!te)return;const $=V(te);$.top!==null&&(te.style.top=$.top),$.left!==null&&(te.style.left=$.left),te.style.transformOrigin=$.transformOrigin,L(!0)},[V]);N.useEffect(()=>(A&&window.addEventListener("scroll",X),()=>window.removeEventListener("scroll",X)),[p,A,X]);const q=(te,$)=>{I&&I(te,$),X()},U=()=>{L(!1)};N.useEffect(()=>{x&&X()}),N.useImperativeHandle(c,()=>x?{updatePosition:()=>{X()}}:null,[x,X]),N.useEffect(()=>{if(!x)return;const te=hi(()=>{X()}),$=nr(p);return $.addEventListener("resize",te),()=>{te.clear(),$.removeEventListener("resize",te)}},[p,x,X]);let Y=C;C==="auto"&&!S.muiSupportAuto&&(Y=void 0);const W=h||(p?Oe(un(p)).body:void 0),J=(o=w==null?void 0:w.root)!=null?o:dg,K=(a=w==null?void 0:w.paper)!=null?a:dl,Z=Vt({elementType:K,externalSlotProps:P({},R,{style:j?R.style:P({},R.style,{opacity:0})}),additionalProps:{elevation:u,ref:z},ownerState:G,className:Ce(D.paper,R==null?void 0:R.className)}),Q=Vt({elementType:J,externalSlotProps:(k==null?void 0:k.root)||{},externalForwardedProps:T,additionalProps:{ref:r,slotProps:{backdrop:{invisible:!0}},container:W,open:x},ownerState:G,className:Ce(D.root,d)}),{slotProps:ie}=Q,B=he(Q,cg);return l.jsx(J,P({},B,!$i(J)&&{slotProps:ie,disableScrollLock:A},{children:l.jsx(S,P({appear:!0,in:x,onEntering:q,onExited:U,timeout:Y},F,{children:l.jsx(K,P({},Z,{children:g}))}))}))});process.env.NODE_ENV!=="production"&&(ul.propTypes={action:Bo,anchorEl:dr(i.oneOfType([dt,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=un(e.anchorEl);if(t&&t.nodeType===1){const r=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&r.top===0&&r.left===0&&r.right===0&&r.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([dt,i.func]),disableScrollLock:i.bool,elevation:ki,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:zp}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const ug=ul;function fg(e){return ot("MuiMenu",e)}kt("MuiMenu",["root","paper","list"]);const mg=["onEntering"],hg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],gg={vertical:"top",horizontal:"right"},bg={vertical:"top",horizontal:"left"},vg=e=>{const{classes:t}=e;return mt({root:["root"],paper:["paper"],list:["list"]},fg,t)},yg=Re(ug,{shouldForwardProp:e=>Pi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),wg=Re(dl,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),xg=Re(Fh,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),fl=N.forwardRef(function(t,r){var n,o;const a=ht({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:p,disableAutoFocusItem:f=!1,MenuListProps:m={},onClose:v,open:g,PaperProps:d={},PopoverClasses:h,transitionDuration:u="auto",TransitionProps:{onEntering:b}={},variant:x="selectedMenu",slots:O={},slotProps:w={}}=a,k=he(a.TransitionProps,mg),y=he(a,hg),S=Qr(),C=S.direction==="rtl",I=P({},a,{autoFocus:s,disableAutoFocusItem:f,MenuListProps:m,onEntering:b,PaperProps:d,transitionDuration:u,TransitionProps:k,variant:x}),A=vg(I),F=s&&!f&&g,T=N.useRef(null),R=(V,j)=>{T.current&&T.current.adjustStyleForScrollbar(V,S),b&&b(V,j)},_=V=>{V.key==="Tab"&&(V.preventDefault(),v&&v(V,"tabKeyDown"))};let z=-1;N.Children.map(c,(V,j)=>{N.isValidElement(V)&&(process.env.NODE_ENV!=="production"&&gn.isFragment(V)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),V.props.disabled||(x==="selectedMenu"&&V.props.selected||z===-1)&&(z=j))});const G=(n=O.paper)!=null?n:wg,D=(o=w.paper)!=null?o:d,H=Vt({elementType:O.root,externalSlotProps:w.root,ownerState:I,className:[A.root,p]}),ee=Vt({elementType:G,externalSlotProps:D,ownerState:I,className:A.paper});return l.jsx(yg,P({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?gg:bg,slots:{paper:G,root:O.root},slotProps:{root:H,paper:ee},open:g,ref:r,transitionDuration:u,TransitionProps:P({onEntering:R},k),ownerState:I},y,{classes:h,children:l.jsx(xg,P({onKeyDown:_,actions:T,autoFocus:s&&(z===-1||f),autoFocusItem:F,variant:x},m,{className:Ce(A.list,m.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(fl.propTypes={anchorEl:i.oneOfType([dt,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const kg=fl;function Eg({className:e,commandHandler:t,menuDefinition:r,children:n}){var f;const[o,a]=E.useState(void 0),s=E.useCallback(m=>{m.preventDefault(),a(o===void 0?{mouseX:m.clientX+2,mouseY:m.clientY-6}:void 0)},[o]),c=E.useCallback(()=>{a(void 0)},[]),p=E.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((f=r==null?void 0:r.items)==null?void 0:f.length)??0)===0||!n?n:l.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[n,l.jsx(kg,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:p,children:l.jsx(oa,{menuDefinition:r,commandHandler:t,onClick:c})})]})}function Tg(e){return{preserveValue:!0,...e}}const Tn=(e,t,r={})=>{const n=E.useRef(t);n.current=t;const o=E.useRef(r);o.current=Tg(o.current);const[a,s]=E.useState(()=>n.current),[c,p]=E.useState(!0);return E.useEffect(()=>{let f=!0;return p(!!e),(async()=>{if(e){const m=await e();f&&(s(()=>m),p(!1))}})(),()=>{f=!1,o.current.preserveValue||s(()=>n.current)}},[e]),[a,c]},Ng=_i(l.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function ml({menuProvider:e,normalMenu:t,fullMenu:r,commandHandler:n,containerRef:o,className:a,ariaLabelPrefix:s,children:c}){const[p,f]=E.useState(!1),[m,v]=E.useState(!1),g=E.useCallback(()=>{p&&f(!1),v(!1)},[p]),d=E.useCallback(k=>{k.stopPropagation(),f(y=>{const S=!y;return S&&k.shiftKey?v(!0):S||v(!1),S})},[]),h=E.useCallback(k=>(g(),n(k)),[n,g]),[u,b]=E.useState({top:1,left:1});E.useEffect(()=>{if(p){const k=o==null?void 0:o.current;if(k){const y=k.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,I=y.top+S+k.clientHeight,A=y.left+C;b({top:I,left:A})}}},[p,o]);const[x]=Tn(E.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,p]),t),[O]=Tn(E.useCallback(async()=>(e==null?void 0:e(!0))??r??x,[e,r,x,p]),r??x),w=m&&O?O:x;return l.jsxs(l.Fragment,{children:[l.jsx(Te.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:c??l.jsx(Ng,{})}),l.jsx(Te.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:p,onClose:g,PaperProps:{className:"papi-menu-drawer-paper",style:{top:u.top,left:u.left}},children:w?l.jsx(rl,{className:a,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:w}):void 0})]})}function Sg({id:e,label:t,isDisabled:r=!1,tooltip:n,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:c,onClick:p,children:f}){return l.jsx(Te.IconButton,{id:e,disabled:r,edge:a,size:s,"aria-label":t,title:o?void 0:n??t,className:`papi-icon-button ${c??""}`,onClick:p,children:f})}const wt="scrBook",Cg="scrRef",Rt="source",jg="details",Og="Scripture Reference",Rg="Scripture Book",hl="Type",Pg="Details";function _g(e,t){const r=t??!1;return[{accessorFn:n=>`${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,id:wt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Og,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?me.bookNumberToEnglishName(o.start.bookNum):n.row.groupingColumnId===wt?re.formatScrRef(o.start):void 0},getGroupingValue:n=>n.start.bookNum,sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!0},{accessorFn:n=>re.formatScrRef(n.start),id:Cg,header:void 0,cell:n=>{const o=n.row.original;return n.row.getIsGrouped()?void 0:re.formatScrRef(o.start)},sortingFn:(n,o)=>re.compareScrRefs(n.original.start,o.original.start),enableGrouping:!1},{accessorFn:n=>n.source.displayName,id:Rt,header:r?(e==null?void 0:e.typeColumnName)??hl:void 0,cell:n=>r||n.row.getIsGrouped()?n.getValue():void 0,getGroupingValue:n=>n.source.id,sortingFn:(n,o)=>n.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:n=>n.detail,id:jg,header:(e==null?void 0:e.detailsColumnName)??Pg,cell:n=>n.getValue(),enableGrouping:!1}]}function Ig({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:n,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:s,onRowSelected:c,direction:p="ltr"}){const[f,m]=E.useState([]),[v,g]=E.useState([{id:wt,desc:!1}]),[d,h]=E.useState({}),u=E.useMemo(()=>e.flatMap(T=>T.data.map(R=>({...R,source:T.source}))),[e]),b=E.useMemo(()=>_g({scriptureReferenceColumnName:n,typeColumnName:a,detailsColumnName:s},r),[n,a,s,r]);E.useEffect(()=>{f.includes(Rt)?g([{id:Rt,desc:!1},{id:wt,desc:!1}]):g([{id:wt,desc:!1}])},[f]);const x=E.useCallback((T,R)=>!R||re.compareScrRefs(T,R)===0?`${re.scrRefToBBBCCCVVV(T)}`:`${re.scrRefToBBBCCCVVV(T)}-${re.scrRefToBBBCCCVVV(R)}`,[]),O=E.useCallback(T=>`${x(T.start,T.end)} ${T.source} ${T.detail}`,[x]),w=je.useReactTable({data:u,columns:b,state:{grouping:f,sorting:v,rowSelection:d},onGroupingChange:m,onSortingChange:g,onRowSelectionChange:h,getExpandedRowModel:je.getExpandedRowModel(),getGroupedRowModel:je.getGroupedRowModel(),getCoreRowModel:je.getCoreRowModel(),getSortedRowModel:je.getSortedRowModel(),getRowId:O,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});E.useEffect(()=>{if(c){const T=w.getSelectedRowModel().rowsById,R=Object.keys(T);if(R.length===1){const _=u.find(z=>O(z)===R[0])||void 0;_&&c(_)}}},[d,u,O,c,w]);const k=o??Rg,y=a??hl,S=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[wt]},{label:`Group by ${y}`,value:[Rt]},{label:`Group by ${k} and ${y}`,value:[wt,Rt]},{label:`Group by ${y} and ${k}`,value:[Rt,wt]}],C=T=>{m(JSON.parse(T))},I=(T,R)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(R)},A=(T,R)=>T.getIsGrouped()?"":M("banded-row",R%2===0?"even":"odd"),F=(T,R,_)=>{if(!((T==null?void 0:T.length)===0||R.depth<_.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"pr-ps-4";default:return}switch(R.depth){case 1:return"pr-ps-8";case 2:return"pr-ps-12";default:return}}};return l.jsxs("div",{className:"pr-twp pr-flex pr-h-full pr-w-full pr-flex-col",children:[!t&&l.jsxs(Qt,{value:JSON.stringify(f),onValueChange:T=>{C(T)},children:[l.jsx(At,{className:"pr-mb-1 pr-mt-2",children:l.jsx(er,{})}),l.jsx(Dt,{position:"item-aligned",children:l.jsx(qs,{children:S.map(T=>l.jsx(He,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),l.jsxs(Gr,{className:"pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0",children:[t&&l.jsx(Hr,{children:w.getHeaderGroups().map(T=>l.jsx(ct,{children:T.headers.filter(R=>R.column.columnDef.header).map(R=>l.jsx(tr,{colSpan:R.colSpan,className:"top-0 pr-sticky",children:R.isPlaceholder?void 0:l.jsxs("div",{children:[R.column.getCanGroup()?l.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",je.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},T.id))}),l.jsx(Xr,{children:w.getRowModel().rows.map((T,R)=>l.jsx(ct,{"data-state":T.getIsSelected()?"selected":"",className:M(A(T,R)),onClick:_=>I(T,_),children:T.getVisibleCells().map(_=>{if(!(_.getIsPlaceholder()||_.column.columnDef.enableGrouping&&!_.getIsGrouped()&&(_.column.columnDef.id!==Rt||!r)))return l.jsx(Lt,{className:M(_.column.columnDef.id,"pr-p-[1px]",F(f,T,_)),children:(()=>_.getIsGrouped()?l.jsxs(ve,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&l.jsx(ne.ChevronDown,{}),!T.getIsExpanded()&&(p==="ltr"?l.jsx(ne.ChevronRight,{}):l.jsx(ne.ChevronLeft,{}))," ",je.flexRender(_.column.columnDef.cell,_.getContext())," (",T.subRows.length,")"]}):je.flexRender(_.column.columnDef.cell,_.getContext()))()},_.id)})},T.id))})]})]})}function gl({onSearch:e,placeholder:t,isFullWidth:r}){const[n,o]=E.useState(""),a=s=>{o(s),e(s)};return l.jsx(lr,{className:M("pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",{"pr-w-full":r}),placeholder:t,value:n,onChange:s=>a(s.target.value)})}function $g({id:e,isDisabled:t=!1,orientation:r="horizontal",min:n=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:c,value:p,valueLabelDisplay:f="off",className:m,onChange:v,onChangeCommitted:g}){return l.jsx(Te.Slider,{id:e,disabled:t,orientation:r,min:n,max:o,step:a,marks:s,defaultValue:c,value:p,valueLabelDisplay:f,className:`papi-slider ${r} ${m??""}`,onChange:v,onChangeCommitted:g})}function Mg({autoHideDuration:e=void 0,id:t,isOpen:r=!1,className:n,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const p={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:n};return l.jsx(Te.Snackbar,{autoHideDuration:e??void 0,open:r,onClose:o,anchorOrigin:a,id:t,ContentProps:p})}const aa=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Root,{orientation:"vertical",ref:r,className:M("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));aa.displayName=De.List.displayName;const sa=E.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:M("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));sa.displayName=De.List.displayName;const bl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,...t,className:M("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),ia=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:M("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ia.displayName=De.Content.displayName;function Ag({tabList:e,onSearch:t,searchPlaceholder:r,headerTitle:n,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return l.jsxs("div",{className:"pr-twp",children:[l.jsxs("div",{className:"pr-sticky pr-top-0 pr-space-y-2 pr-pb-2",children:[n?l.jsx("h1",{children:n}):"",l.jsx(gl,{isFullWidth:o,onSearch:t,placeholder:r})]}),l.jsxs(aa,{dir:a,children:[l.jsx(sa,{children:e.map(s=>l.jsx(bl,{value:s.value,children:s.value},s.key))}),e.map(s=>l.jsx(ia,{value:s.value,children:s.content},s.key))]})]})}const la=E.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...n},o)=>l.jsx($s.Root,{ref:o,decorative:r,orientation:t,className:M("pr-twp pr-shrink-0 pr-bg-border",t==="horizontal"?"pr-h-[1px] pr-w-full":"pr-h-full pr-w-[1px]",e),...n}));la.displayName=$s.Root.displayName;function Dg({children:e}){return l.jsx("div",{className:"pr-twp pr-grid",children:e})}function Lg({primary:e,secondary:t,children:r,isLoading:n=!1,loadingMessage:o}){return l.jsxs("div",{className:"pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"pr-text-sm pr-font-medium pr-leading-none",children:e}),l.jsx("p",{className:"pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground",children:t})]}),n?l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:o}):l.jsx("div",{children:r})]})}function Bg({primary:e,secondary:t,includeSeparator:r=!1}){return l.jsxs("div",{className:"pr-space-y-4 pr-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"pr-text-lg pr-font-medium",children:e}),l.jsx("p",{className:"pr-text-sm pr-text-muted-foreground",children:t})]}),r?l.jsx(la,{}):""]})}const ur=E.forwardRef(({className:e,...t},r)=>l.jsx(ne.LoaderCircle,{size:35,className:M("pr-animate-spin",e),...t,ref:r}));ur.displayName="Spinner";function Fg({id:e,isChecked:t,isDisabled:r=!1,hasError:n=!1,className:o,onChange:a}){return l.jsx(Te.Switch,{id:e,checked:t,disabled:r,className:`papi-switch ${n?"error":""} ${o??""}`,onChange:a})}const Vg=Nn.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),ca=E.forwardRef(({className:e,...t},r)=>l.jsx(Ms.Root,{ref:r,className:M(Vg(),e),...t}));ca.displayName=Ms.Root.displayName;function zg({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:n=!1,helperText:o,label:a,placeholder:s,isRequired:c=!1,className:p,defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}){return l.jsxs("div",{className:M("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":n}),children:[l.jsx(ca,{htmlFor:e,className:M({"pr-text-red-600":r,"pr-hidden":!a}),children:`${a}${c?"*":""}`}),l.jsx(lr,{id:e,disabled:t,placeholder:s,required:c,className:M(p,{"pr-border-red-600":r}),defaultValue:f,value:m,onChange:v,onFocus:g,onBlur:d}),l.jsx("p",{className:M({"pr-hidden":!o}),children:o})]})}function Ug({menuProvider:e,commandHandler:t,className:r,id:n,children:o}){const a=E.useRef(void 0);return l.jsx("div",{ref:a,style:{position:"relative"},children:l.jsx(Te.AppBar,{position:"static",id:n,children:l.jsxs(Te.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[e?l.jsx(ml,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?l.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Gg=Nn.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),vl=E.forwardRef(({className:e,variant:t,...r},n)=>l.jsx("div",{ref:n,role:"alert",className:M(Gg({variant:t}),e),...r}));vl.displayName="Alert";const yl=E.forwardRef(({className:e,...t},r)=>l.jsxs("h5",{ref:r,className:M("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));yl.displayName="AlertTitle";const wl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:M("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));wl.displayName="AlertDescription";const xl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:M("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));xl.displayName="Card";const kl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:M("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));kl.displayName="CardHeader";const El=E.forwardRef(({className:e,...t},r)=>l.jsx("h3",{ref:r,className:M("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));El.displayName="CardTitle";const Tl=E.forwardRef(({className:e,...t},r)=>l.jsx("p",{ref:r,className:M("pr-text-sm pr-text-muted-foreground",e),...t}));Tl.displayName="CardDescription";const Nl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:M("pr-p-6 pr-pt-0",e),...t}));Nl.displayName="CardContent";const Sl=E.forwardRef(({className:e,...t},r)=>l.jsx("div",{ref:r,className:M("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));Sl.displayName="CardFooter";const Cl=E.forwardRef(({className:e,...t},r)=>l.jsxs(Sr.Root,{ref:r,className:M("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[l.jsx(Sr.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:l.jsx(Sr.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),l.jsx(Sr.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));Cl.displayName=Sr.Root.displayName;const jl=E.forwardRef(({className:e,...t},r)=>l.jsx(mo.Root,{className:M("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:r,children:l.jsx(mo.Thumb,{className:M("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));jl.displayName=mo.Root.displayName;const Hg=De.Root,Ol=E.forwardRef(({className:e,...t},r)=>l.jsx(De.List,{ref:r,className:M("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Ol.displayName=De.List.displayName;const Rl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Trigger,{ref:r,className:M("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Rl.displayName=De.Trigger.displayName;const Pl=E.forwardRef(({className:e,...t},r)=>l.jsx(De.Content,{ref:r,className:M("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Pl.displayName=De.Content.displayName;const Xg=1,qg=1e6;let ao=0;function Wg(){return ao=(ao+1)%Number.MAX_SAFE_INTEGER,ao.toString()}const so=new Map,Ns=e=>{if(so.has(e))return;const t=setTimeout(()=>{so.delete(e),Mr({type:"REMOVE_TOAST",toastId:e})},qg);so.set(e,t)},Yg=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,Xg)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case"DISMISS_TOAST":{const{toastId:r}=t;return r?Ns(r):e.toasts.forEach(n=>{Ns(n.id)}),{...e,toasts:e.toasts.map(n=>n.id===r||r===void 0?{...n,open:!1}:n)}}case"REMOVE_TOAST":return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};default:throw new Error("Unknown toast action type")}},fn=[];let mn={toasts:[]};function Mr(e){mn=Yg(mn,e),fn.forEach(t=>{t(mn)})}function Kg({...e}){const t=Wg(),r=o=>Mr({type:"UPDATE_TOAST",toast:{...o,id:t}}),n=()=>Mr({type:"DISMISS_TOAST",toastId:t});return Mr({type:"ADD_TOAST",toast:{...e,id:t,open:!0,onOpenChange:o=>{o||n()}}}),{id:t,dismiss:n,update:r}}function _l(){const[e,t]=E.useState(mn);return E.useEffect(()=>(fn.push(t),()=>{const r=fn.indexOf(t);r>-1&&fn.splice(r,1)}),[e]),{...e,toast:Kg,dismiss:r=>Mr({type:"DISMISS_TOAST",toastId:r})}}const Jg=Ue.Provider,Il=E.forwardRef(({className:e,...t},r)=>l.jsx(Ue.Viewport,{ref:r,className:M("pr-fixed pr-top-0 pr-z-[100] pr-flex pr-max-h-screen pr-w-full pr-flex-col-reverse pr-p-4 sm:pr-bottom-0 sm:pr-right-0 sm:pr-top-auto sm:pr-flex-col md:pr-max-w-[420px]",e),...t}));Il.displayName=Ue.Viewport.displayName;const Zg=Nn.cva("pr-group pr-pointer-events-auto pr-relative pr-flex pr-w-full pr-items-center pr-justify-between pr-space-x-4 pr-overflow-hidden pr-rounded-md pr-border pr-p-6 pr-pr-8 pr-shadow-lg pr-transition-all data-[swipe=cancel]:pr-translate-x-0 data-[swipe=end]:pr-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:pr-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:pr-transition-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[swipe=end]:pr-animate-out data-[state=closed]:pr-fade-out-80 data-[state=closed]:pr-slide-out-to-right-full data-[state=open]:pr-slide-in-from-top-full data-[state=open]:sm:pr-slide-in-from-bottom-full",{variants:{variant:{default:"pr-border pr-bg-background pr-text-foreground",destructive:"pr-destructive pr-group pr-border-destructive pr-bg-destructive pr-text-destructive-foreground"}},defaultVariants:{variant:"default"}}),$l=E.forwardRef(({className:e,variant:t,...r},n)=>l.jsx(Ue.Root,{ref:n,className:M("pr-twp",Zg({variant:t}),e),...r}));$l.displayName=Ue.Root.displayName;const Qg=E.forwardRef(({className:e,...t},r)=>l.jsx(Ue.Action,{ref:r,className:M("pr-inline-flex pr-h-8 pr-shrink-0 pr-items-center pr-justify-center pr-rounded-md pr-border pr-bg-transparent pr-px-3 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-secondary focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 group-[.destructive]:pr-border-muted/40 group-[.destructive]:hover:pr-border-destructive/30 group-[.destructive]:hover:pr-bg-destructive group-[.destructive]:hover:pr-text-destructive-foreground group-[.destructive]:focus:pr-ring-destructive",e),...t}));Qg.displayName=Ue.Action.displayName;const Ml=E.forwardRef(({className:e,...t},r)=>l.jsx(Ue.Close,{ref:r,className:M("pr-absolute pr-right-2 pr-top-2 pr-rounded-md pr-p-1 pr-text-foreground/50 pr-opacity-0 pr-transition-opacity hover:pr-text-foreground focus:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 group-hover:pr-opacity-100 group-[.destructive]:pr-text-red-300 group-[.destructive]:hover:pr-text-red-50 group-[.destructive]:focus:pr-ring-red-400 group-[.destructive]:focus:pr-ring-offset-red-600",e),"toast-close":"",...t,children:l.jsx(ne.X,{className:"pr-h-4 pr-w-4"})}));Ml.displayName=Ue.Close.displayName;const Al=E.forwardRef(({className:e,...t},r)=>l.jsx(Ue.Title,{ref:r,className:M("pr-text-sm pr-font-semibold",e),...t}));Al.displayName=Ue.Title.displayName;const Dl=E.forwardRef(({className:e,...t},r)=>l.jsx(Ue.Description,{ref:r,className:M("pr-text-sm pr-opacity-90",e),...t}));Dl.displayName=Ue.Description.displayName;function eb(){const{toasts:e}=_l();return l.jsxs(Jg,{children:[e.map(({id:t,title:r,description:n,action:o,...a})=>l.jsxs($l,{...a,children:[l.jsxs("div",{className:"pr-twp pr-grid pr-gap-1",children:[r&&l.jsx(Al,{children:r}),n&&l.jsx(Dl,{children:n})]}),o,l.jsx(Ml,{})]},t)),l.jsx(Il,{})]})}function tb({isInstalling:e,handleClick:t,buttonText:r,className:n,...o}){return l.jsx(ve,{className:M("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600 hover:pr-text-white":!r,"pr-w-20":r},n),onClick:t,...o,children:e?l.jsx(ur,{size:15}):l.jsxs(l.Fragment,{children:[l.jsx(ne.Download,{size:25,className:M("pr-h-4 pr-w-4",{"pr-mr-1":r})}),r]})})}function rb({isEnabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:M("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ur,{size:15,className:"pr-mr-1 pr-text-white"}),"Enabling..."]}):"Enable"})}function nb({isDisabling:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:M("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",{"pr-cursor-not-allowed pr-bg-gray-400":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ur,{size:15,className:"pr-mr-1 pr-text-black"}),"Disabling..."]}):"Disable"})}function ob({isUpdating:e,handleClick:t,className:r,...n}){return l.jsx(ve,{className:M("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e},r),onClick:t,...n,children:e?l.jsxs(l.Fragment,{children:[l.jsx(ur,{size:15,className:"pr-mr-1 pr-text-white"}),"Updating..."]}):"Update"})}function It(){return It=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},It.apply(this,arguments)}const ab=["children","options"],Ss=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),Cs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},sb=["style","script"],ib=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,lb=/mailto:/i,cb=/\n{2,}$/,Ll=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,pb=/^ *> ?/gm,db=/^ {2,}\n/,ub=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Bl=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Fl=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,fb=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,mb=/^(?:\n *)*\n/,hb=/\r\n?/g,gb=/^\[\^([^\]]+)](:.*)\n/,bb=/^\[\^([^\]]+)]/,vb=/\f/g,yb=/^\s*?\[(x|\s)\]/,Vl=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,zl=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ul=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,Co=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,wb=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Gl=/^<!--[\s\S]*?(?:-->)/,xb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,jo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,kb=/^\{.*\}$/,Eb=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Tb=/^<([^ >]+@[^ >]+)>/,Nb=/^<([^ >]+:\/[^ >]+)>/,Sb=/-([a-z])?/gi,Hl=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Cb=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,jb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Ob=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Rb=/(\[|\])/g,Pb=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,_b=/\t/g,Ib=/^ *\| */,$b=/(^ *\||\| *$)/g,Mb=/ *$/,Ab=/^ *:-+: *$/,Db=/^ *:-+ *$/,Lb=/^ *-+: *$/,Bb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Fb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Vb=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,zb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Ub=/^\\([^0-9A-Za-z\s])/,Gb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Hb=/^\n+/,Xb=/^([ \t]*)/,qb=/\\([^\\])/g,js=/ *\n+$/,Wb=/(?:^|\n)( *)$/,pa="(?:\\d+\\.)",da="(?:[*+-])";function Xl(e){return"( *)("+(e===1?pa:da)+") +"}const ql=Xl(1),Wl=Xl(2);function Yl(e){return new RegExp("^"+(e===1?ql:Wl))}const Yb=Yl(1),Kb=Yl(2);function Kl(e){return new RegExp("^"+(e===1?ql:Wl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?pa:da)+" )[^\\n]*)*(\\n|$)","gm")}const Jl=Kl(1),Zl=Kl(2);function Ql(e){const t=e===1?pa:da;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const ec=Ql(1),tc=Ql(2);function Os(e,t){const r=t===1,n=r?ec:tc,o=r?Jl:Zl,a=r?Yb:Kb;return{t(s,c,p){const f=Wb.exec(p);return f&&(c.o||!c._&&!c.u)?n.exec(s=f[1]+s):null},i:se.HIGH,l(s,c,p){const f=r?+s[2]:void 0,m=s[0].replace(cb,`
`).match(o);let v=!1;return{p:m.map(function(g,d){const h=a.exec(g)[0].length,u=new RegExp("^ {1,"+h+"}","gm"),b=g.replace(u,"").replace(a,""),x=d===m.length-1,O=b.indexOf(`

`)!==-1||x&&v;v=O;const w=p._,k=p.o;let y;p.o=!0,O?(p._=!1,y=b.replace(js,`

`)):(p._=!0,y=b.replace(js,""));const S=c(y,p);return p._=w,p.o=k,S}),m:r,g:f}},h:(s,c,p)=>e(s.m?"ol":"ul",{key:p.k,start:s.g},s.p.map(function(f,m){return e("li",{key:m},c(f,p))}))}}const Jb=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,Zb=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,rc=[Ll,Bl,Fl,Vl,Ul,zl,Gl,Hl,Jl,ec,Zl,tc],Qb=[...rc,/^[^\n]+(?:  \n|\n{2,})/,Co,jo];function ev(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function tv(e){return Lb.test(e)?"right":Ab.test(e)?"center":Db.test(e)?"left":null}function Rs(e,t,r){const n=r.$;r.$=!0;const o=t(e.trim(),r);r.$=n;let a=[[]];return o.forEach(function(s,c){s.type==="tableSeparator"?c!==0&&c!==o.length-1&&a.push([]):(s.type!=="text"||o[c+1]!=null&&o[c+1].type!=="tableSeparator"||(s.v=s.v.replace(Mb,"")),a[a.length-1].push(s))}),a}function rv(e,t,r){r._=!0;const n=Rs(e[1],t,r),o=e[2].replace($b,"").split("|").map(tv),a=function(s,c,p){return s.trim().split(`
`).map(function(f){return Rs(f,c,p)})}(e[3],t,r);return r._=!1,{S:o,A:a,L:n,type:"table"}}function Ps(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function vt(e){return function(t,r){return r._?e.exec(t):null}}function yt(e){return function(t,r){return r._||r.u?e.exec(t):null}}function lt(e){return function(t,r){return r._||r.u?null:e.exec(t)}}function Tr(e){return function(t){return e.exec(t)}}function nv(e,t,r){if(t._||t.u||r&&!r.endsWith(`
`))return null;let n="";e.split(`
`).every(a=>!rc.some(s=>s.test(a))&&(n+=a+`
`,a.trim()));const o=n.trimEnd();return o==""?null:[n,o]}function Kt(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function _s(e){return e.replace(qb,"$1")}function hn(e,t,r){const n=r._||!1,o=r.u||!1;r._=!0,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function ov(e,t,r){const n=r._||!1,o=r.u||!1;r._=!1,r.u=!0;const a=e(t,r);return r._=n,r.u=o,a}function av(e,t,r){return r._=!1,e(t,r)}const io=(e,t,r)=>({v:hn(t,e[1],r)});function lo(){return{}}function co(){return null}function sv(...e){return e.filter(Boolean).join(" ")}function po(e,t,r){let n=e;const o=t.split(".");for(;o.length&&(n=n[o[0]],n!==void 0);)o.shift();return n||r}var se;function iv(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||ev,t.namedCodesToUnicode=t.namedCodesToUnicode?It({},Cs,t.namedCodesToUnicode):Cs;const r=t.createElement||N.createElement;function n(d,h,...u){const b=po(t.overrides,`${d}.props`,{});return r(function(x,O){const w=po(O,x);return w?typeof w=="function"||typeof w=="object"&&"render"in w?w:po(O,`${x}.component`,x):x}(d,t.overrides),It({},h,b,{className:sv(h==null?void 0:h.className,b.className)||void 0}),...u)}function o(d){let h=!1;t.forceInline?h=!0:t.forceBlock||(h=Pb.test(d)===!1);const u=m(f(h?d:`${d.trimEnd().replace(Hb,"")}

`,{_:h}));for(;typeof u[u.length-1]=="string"&&!u[u.length-1].trim();)u.pop();if(t.wrapper===null)return u;const b=t.wrapper||(h?"span":"div");let x;if(u.length>1||t.forceWrapper)x=u;else{if(u.length===1)return x=u[0],typeof x=="string"?n("span",{key:"outer"},x):x;x=null}return N.createElement(b,{key:"outer"},x)}function a(d){const h=d.match(ib);return h?h.reduce(function(u,b,x){const O=b.indexOf("=");if(O!==-1){const w=function(C){return C.indexOf("-")!==-1&&C.match(xb)===null&&(C=C.replace(Sb,function(I,A){return A.toUpperCase()})),C}(b.slice(0,O)).trim(),k=function(C){const I=C[0];return(I==='"'||I==="'")&&C.length>=2&&C[C.length-1]===I?C.slice(1,-1):C}(b.slice(O+1).trim()),y=Ss[w]||w,S=u[y]=function(C,I){return C==="style"?I.split(/;\s?/).reduce(function(A,F){const T=F.slice(0,F.indexOf(":"));return A[T.replace(/(-[a-z])/g,R=>R[1].toUpperCase())]=F.slice(T.length+1).trim(),A},{}):C==="href"?Kt(I):(I.match(kb)&&(I=I.slice(1,I.length-1)),I==="true"||I!=="false"&&I)}(w,k);typeof S=="string"&&(Co.test(S)||jo.test(S))&&(u[y]=N.cloneElement(o(S.trim()),{key:x}))}else b!=="style"&&(u[Ss[b]||b]=!0);return u},{}):null}const s=[],c={},p={blockQuote:{t:lt(Ll),i:se.HIGH,l:(d,h,u)=>({v:h(d[0].replace(pb,""),u)}),h:(d,h,u)=>n("blockquote",{key:u.k},h(d.v,u))},breakLine:{t:Tr(db),i:se.HIGH,l:lo,h:(d,h,u)=>n("br",{key:u.k})},breakThematic:{t:lt(ub),i:se.HIGH,l:lo,h:(d,h,u)=>n("hr",{key:u.k})},codeBlock:{t:lt(Fl),i:se.MAX,l:d=>({v:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(d,h,u)=>n("pre",{key:u.k},n("code",It({},d.O,{className:d.M?`lang-${d.M}`:""}),d.v))},codeFenced:{t:lt(Bl),i:se.MAX,l:d=>({O:a(d[3]||""),v:d[4],M:d[2]||void 0,type:"codeBlock"})},codeInline:{t:yt(fb),i:se.LOW,l:d=>({v:d[2]}),h:(d,h,u)=>n("code",{key:u.k},d.v)},footnote:{t:lt(gb),i:se.MAX,l:d=>(s.push({I:d[2],j:d[1]}),{}),h:co},footnoteReference:{t:vt(bb),i:se.HIGH,l:d=>({v:d[1],B:`#${t.slugify(d[1])}`}),h:(d,h,u)=>n("a",{key:u.k,href:Kt(d.B)},n("sup",{key:u.k},d.v))},gfmTask:{t:vt(yb),i:se.HIGH,l:d=>({R:d[1].toLowerCase()==="x"}),h:(d,h,u)=>n("input",{checked:d.R,key:u.k,readOnly:!0,type:"checkbox"})},heading:{t:lt(t.enforceAtxHeadings?zl:Vl),i:se.HIGH,l:(d,h,u)=>({v:hn(h,d[2],u),T:t.slugify(d[2]),C:d[1].length}),h:(d,h,u)=>n(`h${d.C}`,{id:d.T,key:u.k},h(d.v,u))},headingSetext:{t:lt(Ul),i:se.MAX,l:(d,h,u)=>({v:hn(h,d[1],u),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:Tr(Gl),i:se.HIGH,l:()=>({}),h:co},image:{t:yt(Zb),i:se.HIGH,l:d=>({D:d[1],B:_s(d[2]),F:d[3]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D||void 0,title:d.F||void 0,src:Kt(d.B)})},link:{t:vt(Jb),i:se.LOW,l:(d,h,u)=>({v:ov(h,d[1],u),B:_s(d[2]),F:d[3]}),h:(d,h,u)=>n("a",{key:u.k,href:Kt(d.B),title:d.F},h(d.v,u))},linkAngleBraceStyleDetector:{t:vt(Nb),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:vt(Eb)(d,h),i:se.MAX,l:d=>({v:[{v:d[1],type:"text"}],B:d[1],F:void 0,type:"link"})},linkMailtoDetector:{t:vt(Tb),i:se.MAX,l(d){let h=d[1],u=d[1];return lb.test(u)||(u="mailto:"+u),{v:[{v:h.replace("mailto:",""),type:"text"}],B:u,type:"link"}}},orderedList:Os(n,1),unorderedList:Os(n,2),newlineCoalescer:{t:lt(mb),i:se.LOW,l:lo,h:()=>`
`},paragraph:{t:nv,i:se.LOW,l:io,h:(d,h,u)=>n("p",{key:u.k},h(d.v,u))},ref:{t:vt(Cb),i:se.MAX,l:d=>(c[d[1]]={B:d[2],F:d[4]},{}),h:co},refImage:{t:yt(jb),i:se.MAX,l:d=>({D:d[1]||void 0,P:d[2]}),h:(d,h,u)=>n("img",{key:u.k,alt:d.D,src:Kt(c[d.P].B),title:c[d.P].F})},refLink:{t:vt(Ob),i:se.MAX,l:(d,h,u)=>({v:h(d[1],u),Z:h(d[0].replace(Rb,"\\$1"),u),P:d[2]}),h:(d,h,u)=>c[d.P]?n("a",{key:u.k,href:Kt(c[d.P].B),title:c[d.P].F},h(d.v,u)):n("span",{key:u.k},h(d.Z,u))},table:{t:lt(Hl),i:se.HIGH,l:rv,h:(d,h,u)=>n("table",{key:u.k},n("thead",null,n("tr",null,d.L.map(function(b,x){return n("th",{key:x,style:Ps(d,x)},h(b,u))}))),n("tbody",null,d.A.map(function(b,x){return n("tr",{key:x},b.map(function(O,w){return n("td",{key:w,style:Ps(d,w)},h(O,u))}))})))},tableSeparator:{t:function(d,h){return h.$?(h._=!0,Ib.exec(d)):null},i:se.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:Tr(Gb),i:se.MIN,l:d=>({v:d[0].replace(wb,(h,u)=>t.namedCodesToUnicode[u]?t.namedCodesToUnicode[u]:h)}),h:d=>d.v},textBolded:{t:yt(Bb),i:se.MED,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("strong",{key:u.k},h(d.v,u))},textEmphasized:{t:yt(Fb),i:se.LOW,l:(d,h,u)=>({v:h(d[2],u)}),h:(d,h,u)=>n("em",{key:u.k},h(d.v,u))},textEscaped:{t:yt(Ub),i:se.HIGH,l:d=>({v:d[1],type:"text"})},textMarked:{t:yt(Vb),i:se.LOW,l:io,h:(d,h,u)=>n("mark",{key:u.k},h(d.v,u))},textStrikethroughed:{t:yt(zb),i:se.LOW,l:io,h:(d,h,u)=>n("del",{key:u.k},h(d.v,u))}};t.disableParsingRawHTML!==!0&&(p.htmlBlock={t:Tr(Co),i:se.HIGH,l(d,h,u){const[,b]=d[3].match(Xb),x=new RegExp(`^${b}`,"gm"),O=d[3].replace(x,""),w=(k=O,Qb.some(I=>I.test(k))?av:hn);var k;const y=d[1].toLowerCase(),S=sb.indexOf(y)!==-1;u.N=u.N||y==="a";const C=S?d[3]:w(h,O,u);return u.N=!1,{O:a(d[2]),v:C,G:S,H:S?y:d[1]}},h:(d,h,u)=>n(d.H,It({key:u.k},d.O),d.G?d.v:h(d.v,u))},p.htmlSelfClosing={t:Tr(jo),i:se.HIGH,l:d=>({O:a(d[2]||""),H:d[1]}),h:(d,h,u)=>n(d.H,It({},d.O,{key:u.k}))});const f=function(d){let h=Object.keys(d);function u(b,x){let O=[],w="";for(;b;){let k=0;for(;k<h.length;){const y=h[k],S=d[y],C=S.t(b,x,w);if(C){const I=C[0];b=b.substring(I.length);const A=S.l(C,u,x);A.type==null&&(A.type=y),O.push(A),w=I;break}k++}}return O}return h.sort(function(b,x){let O=d[b].i,w=d[x].i;return O!==w?O-w:b<x?-1:1}),function(b,x){return u(function(O){return O.replace(hb,`
`).replace(vb,"").replace(_b,"    ")}(b),x)}}(p),m=(v=function(d){return function(h,u,b){return d[h.type].h(h,u,b)}}(p),function d(h,u={}){if(Array.isArray(h)){const b=u.k,x=[];let O=!1;for(let w=0;w<h.length;w++){u.k=w;const k=d(h[w],u),y=typeof k=="string";y&&O?x[x.length-1]+=k:k!==null&&x.push(k),O=y}return u.k=b,x}return v(h,d,u)});var v;const g=o(e);return s.length?n("div",null,g,n("footer",{key:"footer"},s.map(function(d){return n("div",{id:t.slugify(d.j),key:d.j},d.j,m(f(d.I,{_:!0})))}))):g}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(se||(se={}));const lv=e=>{let{children:t,options:r}=e,n=function(o,a){if(o==null)return{};var s,c,p={},f=Object.keys(o);for(c=0;c<f.length;c++)a.indexOf(s=f[c])>=0||(p[s]=o[s]);return p}(e,ab);return N.cloneElement(iv(t,r),n)};function cv({id:e,markdown:t}){return l.jsx("div",{id:e,className:"pr-prose",children:l.jsx(lv,{children:t})})}const nc=E.forwardRef((e,t)=>l.jsxs(ve,{ref:t,className:"pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",...e,children:[l.jsx(ne.Filter,{size:16,className:"pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"}),"Filter",l.jsx(ne.ChevronDown,{size:16,className:"pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"})]}));var oc=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(oc||{});function pv({id:e,groups:t}){return l.jsx("div",{id:e,children:l.jsxs(Sn,{children:[l.jsx(_o,{asChild:!0,children:l.jsx(nc,{})}),l.jsx(zr,{children:t.map(r=>l.jsxs("div",{children:[l.jsx(pr,{children:r.label}),l.jsx(zs,{children:r.items.map(n=>l.jsx("div",{children:n.itemType===0?l.jsx(Cn,{onClick:n.onClick,children:n.label}):l.jsx($o,{onClick:n.onClick,value:n.label,children:n.label})},n.label))}),l.jsx(Ur,{})]},r.label))})]})})}function dv({id:e,message:t}){return l.jsx("div",{id:e,className:"pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center",children:l.jsx("div",{className:"pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center",children:l.jsx("p",{className:"pr-text-lg pr-text-gray-800",children:t})})})}function uv({id:e,category:t,downloads:r,languages:n,moreInfoUrl:o}){const a=new re.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((c,p)=>c+p,0)),s=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:e,className:"pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",children:[l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:t})}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"CATEGORY"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsxs("div",{className:"pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1",children:[l.jsx(ne.User,{className:"pr-mr-1 pr-h-4 pr-w-4"}),l.jsx("span",{className:"pr-text-xs pr-font-semibold pr-text-gray-700",children:a})]}),l.jsx("span",{className:"pr-text-xs pr-text-gray-500",children:"USERS"})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-flex pr-flex-col pr-items-center",children:[l.jsx("div",{className:"pr-flex pr-items-center",children:n.slice(0,3).map(c=>l.jsx("span",{className:"pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",children:c.toUpperCase()},c))}),n.length>3&&l.jsxs("button",{type:"button",onClick:()=>s(),className:"pr-text-xs pr-text-gray-500 pr-underline",children:["+",n.length-3," more languages"]})]}),l.jsx("div",{className:"pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300"}),l.jsxs("div",{className:"pr-ml-auto pr-flex pr-flex-col pr-space-y-2",children:[l.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Website",l.jsx(ne.Link,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]}),l.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",children:["Support",l.jsx(ne.CircleHelp,{className:"pr-ml-1 pr-inline pr-h-4 pr-w-4"})]})]})]})}function ac({id:e,versionHistory:t}){const[r,n]=E.useState(!1),o=new Date;function a(c){const p=new Date(c),f=new Date(o.getTime()-p.getTime()),m=f.getUTCFullYear()-1970,v=f.getUTCMonth(),g=f.getUTCDate()-1;let d="";return m>0?d=`${m.toString()} year${m===1?"":"s"} ago`:v>0?d=`${v.toString()} month${v===1?"":"s"} ago`:g===0?d="today":d=`${g.toString()} day${g===1?"":"s"} ago`,d}const s=Object.entries(t).sort((c,p)=>p[0].localeCompare(c[0]));return l.jsxs("div",{id:e,children:[l.jsx("h3",{className:"pr-text-md pr-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600",children:(r?s:s.slice(0,5)).map(c=>l.jsxs("div",{className:"pr-mt-3 pr-flex pr-justify-between",children:[l.jsx("div",{className:"pr-text-gray-600",children:l.jsx("li",{className:"pr-prose pr-text-xs",children:l.jsx("span",{children:c[1].description})})}),l.jsxs("div",{className:"pr-justify-end pr-text-right",children:[l.jsxs("div",{children:["Version ",c[0]]}),l.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>n(!r),className:"pr-text-xs pr-text-gray-500 pr-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function fv({id:e,publisherDisplayName:t,fileSize:r,locales:n,versionHistory:o}){const a=E.useMemo(()=>re.formatBytes(r),[r]),c=(p=>{const f=new Intl.DisplayNames(navigator.language,{type:"language"});return p.map(m=>f.of(m))})(n);return l.jsx("div",{id:e,className:"pr-border-t pr-pb-4 pr-pt-4",children:l.jsxs("div",{className:"pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0",children:[l.jsx(ac,{versionHistory:o}),l.jsx("div",{className:"pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300"}),l.jsxs("div",{className:"pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3",children:[l.jsx("h2",{className:"pr-text-md pr-font-semibold",children:"Information"}),l.jsxs("div",{className:"pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600",children:[l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Publisher"}),l.jsx("span",{className:"pr-font-semibold",children:t}),l.jsx("span",{className:"pr-mb-2 pr-mt-4",children:"Size"}),l.jsx("span",{className:"pr-font-semibold",children:a})]}),l.jsx("div",{className:"pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600",children:l.jsxs("p",{className:"pr-flex pr-flex-col pr-justify-start",children:[l.jsx("span",{className:"pr-mb-2",children:"Languages"}),l.jsx("span",{className:"pr-font-semibold",children:c.join(", ")})]})})]})]})]})})}const mv=(e,t)=>{E.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])},uo=()=>!1,hv=(e,t)=>{const[r]=Tn(E.useCallback(async()=>{if(!e)return uo;const n=await Promise.resolve(e(t));return async()=>n()},[t,e]),uo,{preserveValue:!1});E.useEffect(()=>()=>{r!==uo&&r()},[r])};exports.Alert=vl;exports.AlertDescription=wl;exports.AlertTitle=yl;exports.BookChapterControl=np;exports.Button=ve;exports.Card=xl;exports.CardContent=Nl;exports.CardDescription=Tl;exports.CardFooter=Sl;exports.CardHeader=kl;exports.CardTitle=El;exports.ChapterRangeSelector=Np;exports.Checkbox=si;exports.Checklist=Sp;exports.ComboBox=ho;exports.ContextMenu=Eg;exports.DataTable=Zs;exports.DisableButton=nb;exports.DropdownMenu=Sn;exports.DropdownMenuCheckboxItem=Cn;exports.DropdownMenuContent=zr;exports.DropdownMenuGroup=zs;exports.DropdownMenuItem=Io;exports.DropdownMenuItemType=oc;exports.DropdownMenuLabel=pr;exports.DropdownMenuPortal=Gc;exports.DropdownMenuRadioGroup=Xc;exports.DropdownMenuRadioItem=$o;exports.DropdownMenuSeparator=Ur;exports.DropdownMenuShortcut=Hs;exports.DropdownMenuSub=Hc;exports.DropdownMenuSubContent=Gs;exports.DropdownMenuSubTrigger=Us;exports.DropdownMenuTrigger=_o;exports.EnableButton=rb;exports.FilterButton=nc;exports.FilterDropdown=pv;exports.Footer=fv;exports.GridMenu=rl;exports.HamburgerMenuButton=ml;exports.INVENTORY_STRING_KEYS=lp;exports.IconButton=Sg;exports.Input=lr;exports.InstallButton=tb;exports.Inventory=dp;exports.Label=ca;exports.LabelPosition=Pt;exports.MarkdownRenderer=cv;exports.MenuItem=na;exports.MoreInfo=uv;exports.NavigationContentSearch=Ag;exports.NoExtensionsFound=dv;exports.ScriptureResultsViewer=Ig;exports.ScrollGroupSelector=hp;exports.SearchBar=gl;exports.Select=Qt;exports.SelectContent=Dt;exports.SelectGroup=qs;exports.SelectItem=He;exports.SelectLabel=Ws;exports.SelectScrollDownButton=Ao;exports.SelectScrollUpButton=Mo;exports.SelectSeparator=Ys;exports.SelectTrigger=At;exports.SelectValue=er;exports.Separator=la;exports.SettingsList=Dg;exports.SettingsListHeader=Bg;exports.SettingsListItem=Lg;exports.ShadCnSlider=Cl;exports.ShadCnSwitch=jl;exports.Slider=$g;exports.Snackbar=Mg;exports.Spinner=ur;exports.Switch=Fg;exports.Table=Gr;exports.TableBody=Xr;exports.TableCaption=Js;exports.TableCell=Lt;exports.TableFooter=Ks;exports.TableHead=tr;exports.TableHeader=Hr;exports.TableRow=ct;exports.Tabs=Hg;exports.TabsContent=Pl;exports.TabsList=Ol;exports.TabsTrigger=Rl;exports.TextField=zg;exports.Toaster=eb;exports.Toolbar=Ug;exports.UpdateButton=ob;exports.VersionHistory=ac;exports.VerticalTabs=aa;exports.VerticalTabsContent=ia;exports.VerticalTabsList=sa;exports.VerticalTabsTrigger=bl;exports.buttonVariants=Xs;exports.getSortingIcon=jn;exports.inventoryCountColumn=fp;exports.inventoryItemColumn=up;exports.inventoryStatusColumn=mp;exports.useEvent=mv;exports.useEventAsync=hv;exports.usePromise=Tn;exports.useToast=_l;function gv(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),n=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&n?r.insertBefore(o,n):r.appendChild(o)}gv(`/*
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
    --background: 0, 0%, 100%;
    --foreground: 0, 0%, 0%;
    --muted: 33.9, 32.4%, 86.1%;
    --muted-foreground: 15.5, 13.2%, 53.9%;
    --popover: 0, 0%, 100%;
    --popover-foreground: 0, 0%, 0%;
    --card: 0 0% 100%;
    --card-foreground: 0, 0%, 0%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
    --primary: 173.4, 82.1%, 15.3%;
    --primary-foreground: 40, 85.7%, 97.3%;
    --secondary: 161.3, 26.7%, 88.2%;
    --secondary-foreground: 173.4, 82.1%, 15.3%;
    --accent: 161.3, 26.7%, 88.2%;
    --accent-foreground: 173.4, 82.1%, 15.3%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    /* stylelint-disable selector-class-pattern */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(173, 82%, 15%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(161, 26%, 88%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.5);
    }

    .pr-bg-muted\\/40 {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.4);
    }
  }

  .paratext-dark {
    --background: 0, 0%, 0%;
    --foreground: 0, 0%, 100%;
    --muted: 15.5, 13.2%, 53.9%;
    --muted-foreground: 33.9, 32.4%, 86.1%;
    --popover: 180, 71.4%, 5%;
    --popover-foreground: 0, 0%, 100%;
    --card: 0 0% 0%;
    --card-foreground: 0, 0%, 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3, 26.7%, 88.2%;
    --primary-foreground: 173.4, 82.1%, 15.3%;
    --secondary: 180, 71.4%, 11%;
    --secondary-foreground: 161.3, 26.7%, 88.2%;
    --accent: 180, 71.4%, 11%;
    --accent-foreground: 161.3, 26.7%, 88.2%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(161.3, 26.7%, 88.2%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(180, 71.4%, 11%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.5);
    }

    .pr-bg-muted\\/40 {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.4);
    }
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
.pr-pointer-events-auto {
  pointer-events: auto;
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
.pr-right-2 {
  right: 0.5rem;
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
.pr-z-\\[100\\] {
  z-index: 100;
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
.pr-mt-1 {
  margin-top: 0.25rem;
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
.pr-max-h-screen {
  max-height: 100vh;
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
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
.pr-border-destructive {
  border-color: hsl(var(--destructive));
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
.pr-pr-8 {
  padding-right: 2rem;
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
.pr-text-foreground\\/50 {
  color: hsl(var(--foreground) / 0.5);
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
.pr-opacity-90 {
  opacity: 0.9;
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
.hover\\:pr-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:pr-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:pr-bg-secondary:hover {
  background-color: hsl(var(--secondary));
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
.focus\\:pr-opacity-100:focus {
  opacity: 1;
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
.pr-group.destructive .group-\\[\\.destructive\\]\\:pr-border-muted\\/40 {
  border-color: hsl(var(--muted) / 0.4);
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:pr-text-red-300 {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-border-destructive\\/30:hover {
  border-color: hsl(var(--destructive) / 0.3);
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-bg-destructive:hover {
  background-color: hsl(var(--destructive));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-text-destructive-foreground:hover {
  color: hsl(var(--destructive-foreground));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-text-red-50:hover {
  --tw-text-opacity: 1;
  color: rgb(254 242 242 / var(--tw-text-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-destructive:focus {
  --tw-ring-color: hsl(var(--destructive));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-red-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-offset-red-600:focus {
  --tw-ring-offset-color: #dc2626;
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
.data-\\[swipe\\=cancel\\]\\:pr-translate-x-0[data-swipe=cancel] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[swipe\\=end\\]\\:pr-translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe=end] {
  --tw-translate-x: var(--radix-toast-swipe-end-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[swipe\\=move\\]\\:pr-translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe=move] {
  --tw-translate-x: var(--radix-toast-swipe-move-x);
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
.data-\\[swipe\\=move\\]\\:pr-transition-none[data-swipe=move] {
  transition-property: none;
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
.data-\\[swipe\\=end\\]\\:pr-animate-out[data-swipe=end] {
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
.data-\\[state\\=closed\\]\\:pr-fade-out-80[data-state=closed] {
  --tw-exit-opacity: 0.8;
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
.data-\\[state\\=closed\\]\\:pr-slide-out-to-right-full[data-state=closed] {
  --tw-exit-translate-x: 100%;
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
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-full[data-state=open] {
  --tw-enter-translate-y: -100%;
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

  .sm\\:pr-bottom-0 {
    bottom: 0px;
  }

  .sm\\:pr-right-0 {
    right: 0px;
  }

  .sm\\:pr-top-auto {
    top: auto;
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

  .sm\\:pr-flex-col {
    flex-direction: column;
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

  .data-\\[state\\=open\\]\\:sm\\:pr-slide-in-from-bottom-full[data-state=open] {
    --tw-enter-translate-y: 100%;
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

  .md\\:pr-max-w-\\[420px\\] {
    max-width: 420px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
  display: flex;
  gap: 8px;
}
`,"top");
//# sourceMappingURL=index.cjs.map
