"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("react/jsx-runtime"),N=require("react"),pl=require("platform-bible-utils"),ss=require("@radix-ui/react-dropdown-menu"),Te=require("lucide-react"),Pe=require("clsx"),dl=require("tailwind-merge"),fl=require("@radix-ui/react-slot"),as=require("class-variance-authority"),we=require("@mui/material"),Ur=require("@mui/styled-engine"),un=require("react-dom"),gl=require("@radix-ui/react-label"),ml=require("@radix-ui/react-select"),hl=require("@radix-ui/react-tabs");function Wt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const C=Wt(N),me=Wt(ss),vl=Wt(un),ls=Wt(gl),xe=Wt(ml),je=Wt(hl);var bl=Object.defineProperty,wl=(e,t,n)=>t in e?bl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ie=(e,t,n)=>(wl(e,typeof t!="symbol"?t+"":t,n),n);const Tt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],uo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],us=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],si=kl();function Xt(e,t=!0){return t&&(e=e.toUpperCase()),e in si?si[e]:0}function co(e){return Xt(e)>0}function yl(e){const t=typeof e=="string"?Xt(e):e;return t>=40&&t<=66}function xl(e){return(typeof e=="string"?Xt(e):e)<=39}function cs(e){return e<=66}function Sl(e){const t=typeof e=="string"?Xt(e):e;return fs(t)&&!cs(t)}function*Cl(){for(let e=1;e<=Tt.length;e++)yield e}const El=1,ps=Tt.length;function Rl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function po(e,t="***"){const n=e-1;return n<0||n>=Tt.length?t:Tt[n]}function ds(e){return e<=0||e>ps?"******":us[e-1]}function Tl(e){return ds(Xt(e))}function fs(e){const t=typeof e=="number"?po(e):e;return co(t)&&!uo.includes(t)}function Pl(e){const t=typeof e=="number"?po(e):e;return co(t)&&uo.includes(t)}function Ol(e){return us[e-1].includes("*obsolete*")}function kl(){const e={};for(let t=0;t<Tt.length;t++)e[Tt[t]]=t+1;return e}const ge={allBookIds:Tt,nonCanonicalIds:uo,bookIdToNumber:Xt,isBookIdValid:co,isBookNT:yl,isBookOT:xl,isBookOTNT:cs,isBookDC:Sl,allBookNumbers:Cl,firstBook:El,lastBook:ps,extraBooks:Rl,bookNumberToId:po,bookNumberToEnglishName:ds,bookIdToEnglishName:Tl,isCanonical:fs,isExtraMaterial:Pl,isObsolete:Ol};var dt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(dt||{});const Fe=class{constructor(t){if(ie(this,"name"),ie(this,"fullPath"),ie(this,"isPresent"),ie(this,"hasVerseSegments"),ie(this,"isCustomized"),ie(this,"baseVersification"),ie(this,"scriptureBooks"),ie(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ie(Fe,"Original",new Fe(dt.Original)),ie(Fe,"Septuagint",new Fe(dt.Septuagint)),ie(Fe,"Vulgate",new Fe(dt.Vulgate)),ie(Fe,"English",new Fe(dt.English)),ie(Fe,"RussianProtestant",new Fe(dt.RussianProtestant)),ie(Fe,"RussianOrthodox",new Fe(dt.RussianOrthodox));let Ft=Fe;function ai(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var gs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(gs||{});const $e=class le{constructor(t,n,r,o){if(ie(this,"firstChapter"),ie(this,"lastChapter"),ie(this,"lastVerse"),ie(this,"hasSegmentsDefined"),ie(this,"text"),ie(this,"BBBCCCVVVS"),ie(this,"longHashCode"),ie(this,"versification"),ie(this,"rtlMark","‏"),ie(this,"_bookNum",0),ie(this,"_chapterNum",0),ie(this,"_verseNum",0),ie(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Ft?n:void 0;this.setEmpty(i),this._verseNum=t%le.chapterDigitShifter,this._chapterNum=Math.floor(t%le.bookDigitShifter/le.chapterDigitShifter),this._bookNum=Math.floor(t/le.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof le){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Ft?t:le.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??le.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=le.defaultVersification){const r=new le(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=le.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof tn)return n=new le,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%le.bcvMaxValue*le.bookDigitShifter+(n>=0?n%le.bcvMaxValue*le.chapterDigitShifter:0)+(r>=0?r%le.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>le.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(le.verseRangeSeparator)||this._verse.includes(le.verseSequenceIndicator))}get book(){return ge.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ge.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=le.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=le.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ge.lastBook)throw new tn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Ft(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(le.verseRangeSeparators,le.verseSequenceIndicators)}get BBBCCC(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return le.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Ft(dt[s])}catch{throw new tn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new tn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ge.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!le.isVerseParseable(r[1]))throw new tn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new le(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof le?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=le.verseRangeSeparators,r=le.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=ai(this._verse,r);for(const s of i.map(a=>ai(a,n))){const a=this.clone();a.verse=s[0];const u=a.verseNum;if(o.push(a),s.length>1){const c=this.clone();if(c.verse=s[1],!t)for(let p=u+1;p<c.verseNum;p++){const g=new le(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||o.push(g)}o.push(c)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ge.lastBook?2:(ge.isCanonical(this._bookNum),0)}setEmpty(t=le.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ge.bookIdToNumber(t),this.chapter=n,this.verse=r}};ie($e,"defaultVersification",Ft.English),ie($e,"verseRangeSeparator","-"),ie($e,"verseSequenceIndicator",","),ie($e,"verseRangeSeparators",[$e.verseRangeSeparator]),ie($e,"verseSequenceIndicators",[$e.verseSequenceIndicator]),ie($e,"chapterDigitShifter",1e3),ie($e,"bookDigitShifter",$e.chapterDigitShifter*$e.chapterDigitShifter),ie($e,"bcvMaxValue",$e.chapterDigitShifter-1),ie($e,"ValidStatusType",gs);class tn extends Error{}function re(...e){return dl.twMerge(Pe.clsx(e))}const fo=me.Root,ms=me.Trigger,Nl=me.Group,_l=me.Portal,$l=me.Sub,Ml=me.RadioGroup,hs=N.forwardRef(({className:e,inset:t,children:n,...r},o)=>b.jsxs(me.SubTrigger,{ref:o,className:re("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,b.jsx(Te.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));hs.displayName=me.SubTrigger.displayName;const vs=N.forwardRef(({className:e,...t},n)=>b.jsx(me.SubContent,{ref:n,className:re("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));vs.displayName=me.SubContent.displayName;const or=N.forwardRef(({className:e,sideOffset:t=4,...n},r)=>b.jsx(me.Portal,{children:b.jsx(me.Content,{ref:r,sideOffset:t,className:re("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));or.displayName=me.Content.displayName;const go=N.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Item,{ref:r,className:re("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));go.displayName=me.Item.displayName;const mo=N.forwardRef(({className:e,children:t,checked:n,...r},o)=>b.jsxs(me.CheckboxItem,{ref:o,className:re("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(Te.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));mo.displayName=me.CheckboxItem.displayName;const bs=N.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(me.RadioItem,{ref:r,className:re("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(me.ItemIndicator,{children:b.jsx(Te.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));bs.displayName=me.RadioItem.displayName;const Rn=N.forwardRef(({className:e,inset:t,...n},r)=>b.jsx(me.Label,{ref:r,className:re("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Rn.displayName=me.Label.displayName;const ir=N.forwardRef(({className:e,...t},n)=>b.jsx(me.Separator,{ref:n,className:re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ir.displayName=me.Separator.displayName;function ws({className:e,...t}){return b.jsx("span",{className:re("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}ws.displayName="DropdownMenuShortcut";const sr=N.forwardRef(({className:e,type:t,...n},r)=>b.jsx("input",{type:t,className:re("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));sr.displayName="Input";const Il=N.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>b.jsxs("div",{className:"pr-relative",children:[b.jsx(sr,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),b.jsx(Te.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function jl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(a,u)=>u+1),s=N.useCallback(a=>{o(a)},[o]);return b.jsx("div",{className:re("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(a=>b.jsx("div",{className:re("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":a===n,"pr-bg-amber-200":a===r}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(a)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(a)},tabIndex:0,onMouseMove:()=>s(a),children:a},a))})}const Al=N.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},a)=>b.jsxs(go,{ref:a,textValue:e,className:re("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:u=>{u.preventDefault(),t()},onKeyDown:u=>{o(u)},onFocus:r,onMouseMove:r,children:[b.jsx("span",{className:re("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ge.bookIdToEnglishName(e)}),n&&b.jsx("div",{children:s})]},e));function Dl({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return b.jsxs(Rn,{className:"pr-flex pr-justify-between",children:[b.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),b.jsxs("div",{className:"pr-flex pr-items-center",children:[b.jsx(Te.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(Te.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),b.jsx(Te.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const fn=ge.allBookIds,Fl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},li=["OT","NT","DC"],Vl=32+32+32,Ll=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Bl=e=>({OT:fn.filter(n=>ge.isBookOT(n)),NT:fn.filter(n=>ge.isBookNT(n)),DC:fn.filter(n=>ge.isBookDC(n))})[e],nn=e=>pl.getChaptersForBook(ge.bookIdToNumber(e));function zl(){return fn.map(t=>ge.bookIdToEnglishName(t))}function Hl(e){return zl().includes(e)}function Gl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Hl(t))return fn.find(r=>ge.bookIdToEnglishName(r)===t)}function Ul({scrRef:e,handleSubmit:t}){const[n,r]=N.useState(""),[o,i]=N.useState(ge.bookNumberToId(e.bookNum)),[s,a]=N.useState(e.chapterNum??0),[u,c]=N.useState(ge.bookNumberToId(e.bookNum)),[p,g]=N.useState(!1),[f,d]=N.useState(p),h=N.useRef(void 0),m=N.useRef(void 0),v=N.useRef(void 0),y=N.useCallback(P=>Bl(P).filter(I=>{const $=ge.bookIdToEnglishName(I).toLowerCase(),L=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(L)||I.toLowerCase().includes(L)}),[n]),O=P=>{r(P)},x=N.useRef(!1),S=N.useCallback(P=>{if(x.current){x.current=!1;return}g(P)},[]),w=N.useCallback((P,I,$,L)=>{if(a(ge.bookNumberToId(e.bookNum)!==P?1:e.chapterNum),I||nn(P)===-1){t({bookNum:ge.bookIdToNumber(P),chapterNum:$||1,verseNum:L||1}),g(!1),r("");return}i(o!==P?P:""),g(!I)},[t,e.bookNum,e.chapterNum,o]),T=P=>{P<=0||P>nn(o)||w(o,!0,P)},k=N.useCallback(()=>{Ll.forEach(P=>{const I=n.match(P);if(I){const[$,L=void 0,B=void 0]=I.slice(1),M=Gl($);(ge.isBookIdValid($)||M)&&w(M??$,!0,L?parseInt(L,10):1,B?parseInt(B,10):1)}})},[w,n]),D=N.useCallback(P=>{p?(P.key==="ArrowDown"||P.key==="ArrowUp")&&(typeof v<"u"&&v.current!==null?v.current.focus():typeof m<"u"&&m.current!==null&&m.current.focus(),P.preventDefault()):g(!0)},[p]),F=P=>{const{key:I}=P;I==="ArrowRight"||I==="ArrowLeft"||I==="ArrowDown"||I==="ArrowUp"||I==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:I})),h.current.focus())},V=P=>{const{key:I}=P;if(u===o){if(I==="Enter"){P.preventDefault(),w(o,!0,s);return}let $=0;if(I==="ArrowRight")if(s<nn(u))$=1;else{P.preventDefault();return}else if(I==="ArrowLeft")if(s>1)$=-1;else{P.preventDefault();return}else I==="ArrowDown"?$=6:I==="ArrowUp"&&($=-6);s+$<=0||s+$>nn(u)?a(0):$!==0&&(a(s+$),P.preventDefault())}};return N.useEffect(()=>{o===u?o===ge.bookNumberToId(e.bookNum)?a(e.chapterNum):a(1):a(0)},[u,e.bookNum,e.chapterNum,o]),N.useLayoutEffect(()=>{d(p)},[p]),N.useLayoutEffect(()=>{const P=setTimeout(()=>{if(f&&m.current&&v.current){const $=v.current.offsetTop-Vl;m.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(P)}},[f]),b.jsx("div",{className:"pr-flex",children:b.jsxs(fo,{modal:!1,open:p,onOpenChange:S,children:[b.jsx(ms,{asChild:!0,children:b.jsx(Il,{ref:h,value:n,handleSearch:O,handleKeyDown:D,handleOnClick:()=>{i(ge.bookNumberToId(e.bookNum)),c(ge.bookNumberToId(e.bookNum)),a(e.chapterNum>0?e.chapterNum:0),g(!0),h.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:k,placeholder:`${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),b.jsxs(or,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:F,align:"start",ref:m,children:[b.jsx(Dl,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),li.map((P,I)=>y(P).length>0&&b.jsxs("div",{children:[b.jsx(Rn,{className:"pr-font-semibold pr-text-slate-700",children:Fl[P]}),y(P).map($=>b.jsx("div",{children:b.jsx(Al,{bookId:$,handleSelectBook:()=>w($,!1),isSelected:o===$,handleHighlightBook:()=>c($),handleKeyDown:V,bookType:P,ref:L=>{o===$&&(v.current=L)},children:b.jsx(jl,{handleSelectChapter:T,endChapter:nn($),activeChapter:e.bookNum===ge.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:L=>{a(L)}})})},$)),li.length-1!==I?b.jsx(ir,{}):void 0]},P))]})]})})}const ql=as.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ot=N.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?fl.Slot:"button";return b.jsx(s,{className:re(ql({variant:t,size:n,className:e})),ref:i,...o})});ot.displayName="Button";function Wl({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return b.jsx(ot,{id:e,disabled:t,className:re("papi-button",n),onClick:r,onContextMenu:o,children:i})}function qr({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:a=[],className:u,value:c,onChange:p,onFocus:g,onBlur:f,getOptionLabel:d}){return b.jsx(we.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:a,className:`papi-combo-box ${o?"error":""} ${u??""}`,value:c,onChange:p,onFocus:g,onBlur:f,getOptionLabel:d,renderInput:h=>b.jsx(we.TextField,{...h,error:o,fullWidth:i,disabled:n,label:t,style:{width:s}})})}function Xl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=N.useState(1),[s,a]=N.useState(r),[u,c]=N.useState(Array.from({length:r},(f,d)=>d+1));N.useEffect(()=>{i(1),e(1),a(r),t(r),c(Array.from({length:r},(f,d)=>d+1))},[r,t,e]);const p=(f,d)=>{i(d),e(d),d>s&&(a(d),t(d))},g=(f,d)=>{a(d),t(d),d<o&&(i(d),e(d))};return b.jsxs(b.Fragment,{children:[b.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:b.jsx(qr,{onChange:(f,d)=>p(f,d),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:f=>f.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),b.jsx(we.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:b.jsx(qr,{onChange:(f,d)=>g(f,d),className:"book-selection-chapter",isClearable:!1,options:u,getOptionLabel:f=>f.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ct=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ct||{});function ys({id:e,isChecked:t,labelText:n="",labelPosition:r=Ct.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:a=!1,className:u,onChange:c}){const p=b.jsx(we.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${a?"error":""} ${u??""}`,onChange:c});let g;if(n){const f=r===Ct.Before||r===Ct.Above,d=b.jsx("span",{className:`papi-checkbox-label ${a?"error":""} ${u??""}`,children:n}),h=r===Ct.Before||r===Ct.After,m=h?d:b.jsx("div",{children:d}),v=h?p:b.jsx("div",{children:p});g=b.jsxs(we.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:a,children:[f&&m,v,!f&&m]})}else g=p;return g}function Yl({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return b.jsxs("fieldset",{id:e,className:t,children:[n&&b.jsx("legend",{children:n}),r.map(a=>b.jsx(ys,{className:"check-item",isChecked:o.includes(a),labelText:s?s(a):a,onChange:()=>i(a)},a))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},E.apply(this,arguments)}function Kl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Jl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Wr={exports:{}},An={exports:{}},ue={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ui;function Zl(){if(ui)return ue;ui=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(w){if(typeof w=="object"&&w!==null){var T=w.$$typeof;switch(T){case t:switch(w=w.type,w){case u:case c:case r:case i:case o:case g:return w;default:switch(w=w&&w.$$typeof,w){case a:case p:case h:case d:case s:return w;default:return T}}case n:return T}}}function S(w){return x(w)===c}return ue.AsyncMode=u,ue.ConcurrentMode=c,ue.ContextConsumer=a,ue.ContextProvider=s,ue.Element=t,ue.ForwardRef=p,ue.Fragment=r,ue.Lazy=h,ue.Memo=d,ue.Portal=n,ue.Profiler=i,ue.StrictMode=o,ue.Suspense=g,ue.isAsyncMode=function(w){return S(w)||x(w)===u},ue.isConcurrentMode=S,ue.isContextConsumer=function(w){return x(w)===a},ue.isContextProvider=function(w){return x(w)===s},ue.isElement=function(w){return typeof w=="object"&&w!==null&&w.$$typeof===t},ue.isForwardRef=function(w){return x(w)===p},ue.isFragment=function(w){return x(w)===r},ue.isLazy=function(w){return x(w)===h},ue.isMemo=function(w){return x(w)===d},ue.isPortal=function(w){return x(w)===n},ue.isProfiler=function(w){return x(w)===i},ue.isStrictMode=function(w){return x(w)===o},ue.isSuspense=function(w){return x(w)===g},ue.isValidElementType=function(w){return typeof w=="string"||typeof w=="function"||w===r||w===c||w===i||w===o||w===g||w===f||typeof w=="object"&&w!==null&&(w.$$typeof===h||w.$$typeof===d||w.$$typeof===s||w.$$typeof===a||w.$$typeof===p||w.$$typeof===v||w.$$typeof===y||w.$$typeof===O||w.$$typeof===m)},ue.typeOf=x,ue}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ci;function Ql(){return ci||(ci=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,a=e?Symbol.for("react.context"):60110,u=e?Symbol.for("react.async_mode"):60111,c=e?Symbol.for("react.concurrent_mode"):60111,p=e?Symbol.for("react.forward_ref"):60112,g=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,d=e?Symbol.for("react.memo"):60115,h=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,v=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,O=e?Symbol.for("react.scope"):60119;function x(j){return typeof j=="string"||typeof j=="function"||j===r||j===c||j===i||j===o||j===g||j===f||typeof j=="object"&&j!==null&&(j.$$typeof===h||j.$$typeof===d||j.$$typeof===s||j.$$typeof===a||j.$$typeof===p||j.$$typeof===v||j.$$typeof===y||j.$$typeof===O||j.$$typeof===m)}function S(j){if(typeof j=="object"&&j!==null){var ee=j.$$typeof;switch(ee){case t:var _=j.type;switch(_){case u:case c:case r:case i:case o:case g:return _;default:var ae=_&&_.$$typeof;switch(ae){case a:case p:case h:case d:case s:return ae;default:return ee}}case n:return ee}}}var w=u,T=c,k=a,D=s,F=t,V=p,P=r,I=h,$=d,L=n,B=i,M=o,z=g,ne=!1;function te(j){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),R(j)||S(j)===u}function R(j){return S(j)===c}function A(j){return S(j)===a}function G(j){return S(j)===s}function Y(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function H(j){return S(j)===p}function U(j){return S(j)===r}function W(j){return S(j)===h}function X(j){return S(j)===d}function q(j){return S(j)===n}function K(j){return S(j)===i}function Q(j){return S(j)===o}function se(j){return S(j)===g}ce.AsyncMode=w,ce.ConcurrentMode=T,ce.ContextConsumer=k,ce.ContextProvider=D,ce.Element=F,ce.ForwardRef=V,ce.Fragment=P,ce.Lazy=I,ce.Memo=$,ce.Portal=L,ce.Profiler=B,ce.StrictMode=M,ce.Suspense=z,ce.isAsyncMode=te,ce.isConcurrentMode=R,ce.isContextConsumer=A,ce.isContextProvider=G,ce.isElement=Y,ce.isForwardRef=H,ce.isFragment=U,ce.isLazy=W,ce.isMemo=X,ce.isPortal=q,ce.isProfiler=K,ce.isStrictMode=Q,ce.isSuspense=se,ce.isValidElementType=x,ce.typeOf=S}()),ce}var pi;function xs(){return pi||(pi=1,process.env.NODE_ENV==="production"?An.exports=Zl():An.exports=Ql()),An.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Rr,di;function eu(){if(di)return Rr;di=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},a=0;a<10;a++)s["_"+String.fromCharCode(a)]=a;var u=Object.getOwnPropertyNames(s).map(function(p){return s[p]});if(u.join("")!=="0123456789")return!1;var c={};return"abcdefghijklmnopqrst".split("").forEach(function(p){c[p]=p}),Object.keys(Object.assign({},c)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Rr=o()?Object.assign:function(i,s){for(var a,u=r(i),c,p=1;p<arguments.length;p++){a=Object(arguments[p]);for(var g in a)t.call(a,g)&&(u[g]=a[g]);if(e){c=e(a);for(var f=0;f<c.length;f++)n.call(a,c[f])&&(u[c[f]]=a[c[f]])}}return u},Rr}var Tr,fi;function ho(){if(fi)return Tr;fi=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Tr=e,Tr}var Pr,gi;function Ss(){return gi||(gi=1,Pr=Function.call.bind(Object.prototype.hasOwnProperty)),Pr}var Or,mi;function tu(){if(mi)return Or;mi=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=ho(),n={},r=Ss();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,a,u,c){if(process.env.NODE_ENV!=="production"){for(var p in i)if(r(i,p)){var g;try{if(typeof i[p]!="function"){var f=Error((u||"React class")+": "+a+" type `"+p+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[p]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}g=i[p](s,p,u,a,null,t)}catch(h){g=h}if(g&&!(g instanceof Error)&&e((u||"React class")+": type specification of "+a+" `"+p+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof g+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),g instanceof Error&&!(g.message in n)){n[g.message]=!0;var d=c?c():"";e("Failed "+a+" type: "+g.message+(d??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Or=o,Or}var kr,hi;function nu(){if(hi)return kr;hi=1;var e=xs(),t=eu(),n=ho(),r=Ss(),o=tu(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(a){var u="Warning: "+a;typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}});function s(){return null}return kr=function(a,u){var c=typeof Symbol=="function"&&Symbol.iterator,p="@@iterator";function g(R){var A=R&&(c&&R[c]||R[p]);if(typeof A=="function")return A}var f="<<anonymous>>",d={array:y("array"),bigint:y("bigint"),bool:y("boolean"),func:y("function"),number:y("number"),object:y("object"),string:y("string"),symbol:y("symbol"),any:O(),arrayOf:x,element:S(),elementType:w(),instanceOf:T,node:V(),objectOf:D,oneOf:k,oneOfType:F,shape:I,exact:$};function h(R,A){return R===A?R!==0||1/R===1/A:R!==R&&A!==A}function m(R,A){this.message=R,this.data=A&&typeof A=="object"?A:{},this.stack=""}m.prototype=Error.prototype;function v(R){if(process.env.NODE_ENV!=="production")var A={},G=0;function Y(U,W,X,q,K,Q,se){if(q=q||f,Q=Q||X,se!==n){if(u){var j=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw j.name="Invariant Violation",j}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ee=q+":"+X;!A[ee]&&G<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[ee]=!0,G++)}}return W[X]==null?U?W[X]===null?new m("The "+K+" `"+Q+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+K+" `"+Q+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:R(W,X,q,K,Q)}var H=Y.bind(null,!1);return H.isRequired=Y.bind(null,!0),H}function y(R){function A(G,Y,H,U,W,X){var q=G[Y],K=M(q);if(K!==R){var Q=z(q);return new m("Invalid "+U+" `"+W+"` of type "+("`"+Q+"` supplied to `"+H+"`, expected ")+("`"+R+"`."),{expectedType:R})}return null}return v(A)}function O(){return v(s)}function x(R){function A(G,Y,H,U,W){if(typeof R!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var X=G[Y];if(!Array.isArray(X)){var q=M(X);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an array."))}for(var K=0;K<X.length;K++){var Q=R(X,K,H,U,W+"["+K+"]",n);if(Q instanceof Error)return Q}return null}return v(A)}function S(){function R(A,G,Y,H,U){var W=A[G];if(!a(W)){var X=M(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return v(R)}function w(){function R(A,G,Y,H,U){var W=A[G];if(!e.isValidElementType(W)){var X=M(W);return new m("Invalid "+H+" `"+U+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return v(R)}function T(R){function A(G,Y,H,U,W){if(!(G[Y]instanceof R)){var X=R.name||f,q=te(G[Y]);return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected ")+("instance of `"+X+"`."))}return null}return v(A)}function k(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function A(G,Y,H,U,W){for(var X=G[Y],q=0;q<R.length;q++)if(h(X,R[q]))return null;var K=JSON.stringify(R,function(se,j){var ee=z(j);return ee==="symbol"?String(j):j});return new m("Invalid "+U+" `"+W+"` of value `"+String(X)+"` "+("supplied to `"+H+"`, expected one of "+K+"."))}return v(A)}function D(R){function A(G,Y,H,U,W){if(typeof R!="function")return new m("Property `"+W+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type "+("`"+q+"` supplied to `"+H+"`, expected an object."));for(var K in X)if(r(X,K)){var Q=R(X,K,H,U,W+"."+K,n);if(Q instanceof Error)return Q}return null}return v(A)}function F(R){if(!Array.isArray(R))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<R.length;A++){var G=R[A];if(typeof G!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ne(G)+" at index "+A+"."),s}function Y(H,U,W,X,q){for(var K=[],Q=0;Q<R.length;Q++){var se=R[Q],j=se(H,U,W,X,q,n);if(j==null)return null;j.data&&r(j.data,"expectedType")&&K.push(j.data.expectedType)}var ee=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new m("Invalid "+X+" `"+q+"` supplied to "+("`"+W+"`"+ee+"."))}return v(Y)}function V(){function R(A,G,Y,H,U){return L(A[G])?null:new m("Invalid "+H+" `"+U+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return v(R)}function P(R,A,G,Y,H){return new m((R||"React class")+": "+A+" type `"+G+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function I(R){function A(G,Y,H,U,W){var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));for(var K in R){var Q=R[K];if(typeof Q!="function")return P(H,U,W,K,z(Q));var se=Q(X,K,H,U,W+"."+K,n);if(se)return se}return null}return v(A)}function $(R){function A(G,Y,H,U,W){var X=G[Y],q=M(X);if(q!=="object")return new m("Invalid "+U+" `"+W+"` of type `"+q+"` "+("supplied to `"+H+"`, expected `object`."));var K=t({},G[Y],R);for(var Q in K){var se=R[Q];if(r(R,Q)&&typeof se!="function")return P(H,U,W,Q,z(se));if(!se)return new m("Invalid "+U+" `"+W+"` key `"+Q+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(G[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(R),null,"  "));var j=se(X,Q,H,U,W+"."+Q,n);if(j)return j}return null}return v(A)}function L(R){switch(typeof R){case"number":case"string":case"undefined":return!0;case"boolean":return!R;case"object":if(Array.isArray(R))return R.every(L);if(R===null||a(R))return!0;var A=g(R);if(A){var G=A.call(R),Y;if(A!==R.entries){for(;!(Y=G.next()).done;)if(!L(Y.value))return!1}else for(;!(Y=G.next()).done;){var H=Y.value;if(H&&!L(H[1]))return!1}}else return!1;return!0;default:return!1}}function B(R,A){return R==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function M(R){var A=typeof R;return Array.isArray(R)?"array":R instanceof RegExp?"object":B(A,R)?"symbol":A}function z(R){if(typeof R>"u"||R===null)return""+R;var A=M(R);if(A==="object"){if(R instanceof Date)return"date";if(R instanceof RegExp)return"regexp"}return A}function ne(R){var A=z(R);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function te(R){return!R.constructor||!R.constructor.name?f:R.constructor.name}return d.checkPropTypes=o,d.resetWarningCache=o.resetWarningCache,d.PropTypes=d,d},kr}var Nr,vi;function ru(){if(vi)return Nr;vi=1;var e=ho();function t(){}function n(){}return n.resetWarningCache=t,Nr=function(){function r(s,a,u,c,p,g){if(g!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},Nr}if(process.env.NODE_ENV!=="production"){var ou=xs(),iu=!0;Wr.exports=nu()(ou.isElement,iu)}else Wr.exports=ru()();var su=Wr.exports;const l=Kl(su);function Yt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Et(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Cs(e){if(!Et(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Cs(e[n])}),t}function it(e,t,n={clone:!0}){const r=n.clone?E({},e):e;return Et(e)&&Et(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Et(t[o])&&o in e&&Et(e[o])?r[o]=it(e[o],t[o],n):n.clone?r[o]=Et(t[o])?Cs(t[o]):t[o]:r[o]=t[o])}),r}function au(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Es(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;const u=i.type;return typeof u=="function"&&!au(u)&&(a="Did you accidentally use a plain function component for an element instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Rs=Yt(l.element,Es);Rs.isRequired=Yt(l.element.isRequired,Es);const Tn=Rs;function lu(e){const{prototype:t={}}=e;return!!t.isReactComponent}function uu(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let a;return typeof i=="function"&&!lu(i)&&(a="Did you accidentally provide a plain function component instead?"),a!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const cu=Yt(l.elementType,uu),pu="exact-prop: ​";function Ts(e){return process.env.NODE_ENV==="production"?e:E({},e,{[pu]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Bt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Xr={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bi;function du(){if(bi)return pe;bi=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h;h=Symbol.for("react.module.reference");function m(v){if(typeof v=="object"&&v!==null){var y=v.$$typeof;switch(y){case e:switch(v=v.type,v){case n:case o:case r:case c:case p:return v;default:switch(v=v&&v.$$typeof,v){case a:case s:case u:case f:case g:case i:return v;default:return y}}case t:return y}}}return pe.ContextConsumer=s,pe.ContextProvider=i,pe.Element=e,pe.ForwardRef=u,pe.Fragment=n,pe.Lazy=f,pe.Memo=g,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=c,pe.SuspenseList=p,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(v){return m(v)===s},pe.isContextProvider=function(v){return m(v)===i},pe.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},pe.isForwardRef=function(v){return m(v)===u},pe.isFragment=function(v){return m(v)===n},pe.isLazy=function(v){return m(v)===f},pe.isMemo=function(v){return m(v)===g},pe.isPortal=function(v){return m(v)===t},pe.isProfiler=function(v){return m(v)===o},pe.isStrictMode=function(v){return m(v)===r},pe.isSuspense=function(v){return m(v)===c},pe.isSuspenseList=function(v){return m(v)===p},pe.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===n||v===o||v===r||v===c||v===p||v===d||typeof v=="object"&&v!==null&&(v.$$typeof===f||v.$$typeof===g||v.$$typeof===i||v.$$typeof===s||v.$$typeof===u||v.$$typeof===h||v.getModuleId!==void 0)},pe.typeOf=m,pe}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wi;function fu(){return wi||(wi=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),a=Symbol.for("react.server_context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),d=Symbol.for("react.offscreen"),h=!1,m=!1,v=!1,y=!1,O=!1,x;x=Symbol.for("react.module.reference");function S(_){return!!(typeof _=="string"||typeof _=="function"||_===n||_===o||O||_===r||_===c||_===p||y||_===d||h||m||v||typeof _=="object"&&_!==null&&(_.$$typeof===f||_.$$typeof===g||_.$$typeof===i||_.$$typeof===s||_.$$typeof===u||_.$$typeof===x||_.getModuleId!==void 0))}function w(_){if(typeof _=="object"&&_!==null){var ae=_.$$typeof;switch(ae){case e:var Ce=_.type;switch(Ce){case n:case o:case r:case c:case p:return Ce;default:var Ne=Ce&&Ce.$$typeof;switch(Ne){case a:case s:case u:case f:case g:case i:return Ne;default:return ae}}case t:return ae}}}var T=s,k=i,D=e,F=u,V=n,P=f,I=g,$=t,L=o,B=r,M=c,z=p,ne=!1,te=!1;function R(_){return ne||(ne=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(_){return te||(te=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(_){return w(_)===s}function Y(_){return w(_)===i}function H(_){return typeof _=="object"&&_!==null&&_.$$typeof===e}function U(_){return w(_)===u}function W(_){return w(_)===n}function X(_){return w(_)===f}function q(_){return w(_)===g}function K(_){return w(_)===t}function Q(_){return w(_)===o}function se(_){return w(_)===r}function j(_){return w(_)===c}function ee(_){return w(_)===p}de.ContextConsumer=T,de.ContextProvider=k,de.Element=D,de.ForwardRef=F,de.Fragment=V,de.Lazy=P,de.Memo=I,de.Portal=$,de.Profiler=L,de.StrictMode=B,de.Suspense=M,de.SuspenseList=z,de.isAsyncMode=R,de.isConcurrentMode=A,de.isContextConsumer=G,de.isContextProvider=Y,de.isElement=H,de.isForwardRef=U,de.isFragment=W,de.isLazy=X,de.isMemo=q,de.isPortal=K,de.isProfiler=Q,de.isStrictMode=se,de.isSuspense=j,de.isSuspenseList=ee,de.isValidElementType=S,de.typeOf=w}()),de}process.env.NODE_ENV==="production"?Xr.exports=du():Xr.exports=fu();var Xn=Xr.exports;const gu=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function mu(e){const t=`${e}`.match(gu);return t&&t[1]||""}function Ps(e,t=""){return e.displayName||e.name||mu(e)||t}function yi(e,t,n){const r=Ps(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function hu(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ps(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Xn.ForwardRef:return yi(e,e.render,"ForwardRef");case Xn.Memo:return yi(e,e.type,"memo");default:return}}}function st(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const vu=l.oneOfType([l.func,l.object]),vo=vu;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Bt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Yr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Os(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function bu(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const a=o||"<<anonymous>>",u=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`):null}}function wu(e,t){var n,r;return C.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Oe(e){return e&&e.ownerDocument||document}function zt(e){return Oe(e).defaultView||window}function yu(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?E({},t.propTypes):null;return o=>(i,s,a,u,c,...p)=>{const g=c||s,f=n==null?void 0:n[g];if(f){const d=f(i,s,a,u,c,...p);if(d)return d}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Yn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const xu=typeof window<"u"?C.useLayoutEffect:C.useEffect,Pt=xu;let xi=0;function Su(e){const[t,n]=C.useState(e),r=e||t;return C.useEffect(()=>{t==null&&(xi+=1,n(`mui-${xi}`))},[t]),r}const Si=C["useId".toString()];function ks(e){if(Si!==void 0){const t=Si();return e??t}return Su(e)}function Cu(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ns({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=C.useRef(e!==void 0),[i,s]=C.useState(t),a=o?e:i;if(process.env.NODE_ENV!=="production"){C.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:c}=C.useRef(t);C.useEffect(()=>{!o&&c!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const u=C.useCallback(c=>{o||s(c)},[]);return[a,u]}function yn(e){const t=C.useRef(e);return Pt(()=>{t.current=e}),C.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return C.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Yn(n,t)})},e)}const Ci={};function Eu(e,t){const n=C.useRef(Ci);return n.current===Ci&&(n.current=e(t)),n}const Ru=[];function Tu(e){C.useEffect(e,Ru)}class Pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function cn(){const e=Eu(Pn.create).current;return Tu(e.disposeEffect),e}let ar=!0,Kr=!1;const Pu=new Pn,Ou={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ku(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Ou[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Nu(e){e.metaKey||e.altKey||e.ctrlKey||(ar=!0)}function _r(){ar=!1}function _u(){this.visibilityState==="hidden"&&Kr&&(ar=!0)}function $u(e){e.addEventListener("keydown",Nu,!0),e.addEventListener("mousedown",_r,!0),e.addEventListener("pointerdown",_r,!0),e.addEventListener("touchstart",_r,!0),e.addEventListener("visibilitychange",_u,!0)}function Mu(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return ar||ku(t)}function _s(){const e=C.useCallback(o=>{o!=null&&$u(o.ownerDocument)},[]),t=C.useRef(!1);function n(){return t.current?(Kr=!0,Pu.start(100,()=>{Kr=!1}),t.current=!1,!0):!1}function r(o){return Mu(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function $s(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Iu(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function ju(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Au=Number.isInteger||ju;function Ms(e,t,n,r){const o=e[t];if(o==null||!Au(o)){const i=Iu(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Is(e,t,...n){return e[t]===void 0?null:Ms(e,t,...n)}function Jr(){return null}Is.isRequired=Ms;Jr.isRequired=Jr;const js=process.env.NODE_ENV==="production"?Jr:Is;function As(e,t){const n=E({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=E({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=E({},i),Object.keys(o).forEach(s=>{n[r][s]=As(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ut(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const a=t(s);a!==""&&i.push(a),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ei=e=>e,Du=()=>{let e=Ei;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ei}}},Fu=Du(),Ds=Fu,Fs={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Qe(e,t,n="Mui"){const r=Fs[t];return r?`${n}-${r}`:`${Ds.generate(e)}-${t}`}function ht(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Qe(e,o,n)}),r}function Vu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Vs(e){return typeof e=="string"}function pn(e,t,n){return e===void 0||Vs(e)?t:E({},t,{ownerState:E({},t.ownerState,n)})}const Lu={disableDefaultClasses:!1},Bu=C.createContext(Lu);function zu(e){const{disableDefaultClasses:t}=C.useContext(Bu);return n=>t?"":e(n)}function Ls(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Hu(e,t,n){return typeof e=="function"?e(t,n):e}function Ri(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Gu(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const d=Pe(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),h=E({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=E({},n,o,r);return d.length>0&&(m.className=d),Object.keys(h).length>0&&(m.style=h),{props:m,internalRef:void 0}}const s=Ls(E({},o,r)),a=Ri(r),u=Ri(o),c=t(s),p=Pe(c==null?void 0:c.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=E({},c==null?void 0:c.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=E({},c,n,u,a);return p.length>0&&(f.className=p),Object.keys(g).length>0&&(f.style=g),{props:f,internalRef:c.ref}}const Uu=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Ot(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=fe(e,Uu),a=i?{}:Hu(r,o),{props:u,internalRef:c}=Gu(E({},s,{externalSlotProps:a})),p=Ue(c,a==null?void 0:a.ref,(t=e.additionalProps)==null?void 0:t.ref);return pn(n,E({},u,{ref:p}),o)}const Bs="base";function qu(e){return`${Bs}--${e}`}function Wu(e,t){return`${Bs}-${e}-${t}`}function zs(e,t){const n=Fs[t];return n?qu(n):Wu(e,t)}function Xu(e,t){const n={};return t.forEach(r=>{n[r]=zs(e,r)}),n}const Yu=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ku(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Ju(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Zu(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Ju(e))}function Qu(e){const t=[],n=[];return Array.from(e.querySelectorAll(Yu)).forEach((r,o)=>{const i=Ku(r);i===-1||!Zu(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function ec(){return!0}function Kn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=Qu,isEnabled:s=ec,open:a}=e,u=C.useRef(!1),c=C.useRef(null),p=C.useRef(null),g=C.useRef(null),f=C.useRef(null),d=C.useRef(!1),h=C.useRef(null),m=Ue(t.ref,h),v=C.useRef(null);C.useEffect(()=>{!a||!h.current||(d.current=!n)},[n,a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Oe(h.current);return h.current.contains(x.activeElement)||(h.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),h.current.setAttribute("tabIndex","-1")),d.current&&h.current.focus()),()=>{o||(g.current&&g.current.focus&&(u.current=!0,g.current.focus()),g.current=null)}},[a]),C.useEffect(()=>{if(!a||!h.current)return;const x=Oe(h.current),S=k=>{v.current=k,!(r||!s()||k.key!=="Tab")&&x.activeElement===h.current&&k.shiftKey&&(u.current=!0,p.current&&p.current.focus())},w=()=>{const k=h.current;if(k===null)return;if(!x.hasFocus()||!s()||u.current){u.current=!1;return}if(k.contains(x.activeElement)||r&&x.activeElement!==c.current&&x.activeElement!==p.current)return;if(x.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!d.current)return;let D=[];if((x.activeElement===c.current||x.activeElement===p.current)&&(D=i(h.current)),D.length>0){var F,V;const P=!!((F=v.current)!=null&&F.shiftKey&&((V=v.current)==null?void 0:V.key)==="Tab"),I=D[0],$=D[D.length-1];typeof I!="string"&&typeof $!="string"&&(P?$.focus():I.focus())}else k.focus()};x.addEventListener("focusin",w),x.addEventListener("keydown",S,!0);const T=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&w()},50);return()=>{clearInterval(T),x.removeEventListener("focusin",w),x.removeEventListener("keydown",S,!0)}},[n,r,o,s,a,i]);const y=x=>{g.current===null&&(g.current=x.relatedTarget),d.current=!0,f.current=x.target;const S=t.props.onFocus;S&&S(x)},O=x=>{g.current===null&&(g.current=x.relatedTarget),d.current=!0};return b.jsxs(C.Fragment,{children:[b.jsx("div",{tabIndex:a?0:-1,onFocus:O,ref:c,"data-testid":"sentinelStart"}),C.cloneElement(t,{ref:m,onFocus:y}),b.jsx("div",{tabIndex:a?0:-1,onFocus:O,ref:p,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Kn.propTypes={children:Tn,disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableRestoreFocus:l.bool,getTabbable:l.func,isEnabled:l.func,open:l.bool.isRequired});process.env.NODE_ENV!=="production"&&(Kn["propTypes"]=Ts(Kn.propTypes));function tc(e){return typeof e=="function"?e():e}const xn=C.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,a]=C.useState(null),u=Ue(C.isValidElement(r)?r.ref:null,n);if(Pt(()=>{i||a(tc(o)||document.body)},[o,i]),Pt(()=>{if(s&&!i)return Yn(n,s),()=>{Yn(n,null)}},[n,s,i]),i){if(C.isValidElement(r)){const c={ref:u};return C.cloneElement(r,c)}return b.jsx(C.Fragment,{children:r})}return b.jsx(C.Fragment,{children:s&&vl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(xn.propTypes={children:l.node,container:l.oneOfType([st,l.func]),disablePortal:l.bool});process.env.NODE_ENV!=="production"&&(xn["propTypes"]=Ts(xn.propTypes));function nc(e){const t=Oe(e);return t.body===e?zt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function gn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ti(e){return parseInt(zt(e).getComputedStyle(e).paddingRight,10)||0}function rc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Pi(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const a=i.indexOf(s)===-1,u=!rc(s);a&&u&&gn(s,o)})}function $r(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function oc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(nc(r)){const s=$s(Oe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ti(r)+s}px`;const a=Oe(r).querySelectorAll(".mui-fixed");[].forEach.call(a,u=>{n.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${Ti(u)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=Oe(r).body;else{const s=r.parentElement,a=zt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&a.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:a})=>{i?s.style.setProperty(a,i):s.style.removeProperty(a)})}}function ic(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class sc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&gn(t.modalRef,!1);const o=ic(n);Pi(n,t.mount,t.modalRef,o,!0);const i=$r(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=$r(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=oc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=$r(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&gn(t.modalRef,n),Pi(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&gn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function ac(e){return typeof e=="function"?e():e}function lc(e){return e?e.props.hasOwnProperty("in"):!1}const uc=new sc;function cc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=uc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:a,children:u,onClose:c,open:p,rootRef:g}=e,f=C.useRef({}),d=C.useRef(null),h=C.useRef(null),m=Ue(h,g),[v,y]=C.useState(!p),O=lc(u);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const S=()=>Oe(d.current),w=()=>(f.current.modalRef=h.current,f.current.mount=d.current,f.current),T=()=>{o.mount(w(),{disableScrollLock:r}),h.current&&(h.current.scrollTop=0)},k=yn(()=>{const M=ac(t)||S().body;o.add(w(),M),h.current&&T()}),D=C.useCallback(()=>o.isTopModal(w()),[o]),F=yn(M=>{d.current=M,M&&(p&&D()?T():h.current&&gn(h.current,x))}),V=C.useCallback(()=>{o.remove(w(),x)},[x,o]);C.useEffect(()=>()=>{V()},[V]),C.useEffect(()=>{p?k():(!O||!i)&&V()},[p,V,O,i,k]);const P=M=>z=>{var ne;(ne=M.onKeyDown)==null||ne.call(M,z),!(z.key!=="Escape"||z.which===229||!D())&&(n||(z.stopPropagation(),c&&c(z,"escapeKeyDown")))},I=M=>z=>{var ne;(ne=M.onClick)==null||ne.call(M,z),z.target===z.currentTarget&&c&&c(z,"backdropClick")};return{getRootProps:(M={})=>{const z=Ls(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ne=E({},z,M);return E({role:"presentation"},ne,{onKeyDown:P(ne),ref:m})},getBackdropProps:(M={})=>{const z=M;return E({"aria-hidden":!0},z,{onClick:I(z),open:p})},getTransitionProps:()=>{const M=()=>{y(!1),s&&s()},z=()=>{y(!0),a&&a(),i&&V()};return{onEnter:Yr(M,u==null?void 0:u.props.onEnter),onExited:Yr(z,u==null?void 0:u.props.onExited)}},rootRef:m,portalRef:F,isTopModal:D,exited:v,hasTransition:O}}var Me="top",qe="bottom",We="right",Ie="left",bo="auto",On=[Me,qe,We,Ie],Ht="start",Sn="end",pc="clippingParents",Hs="viewport",rn="popper",dc="reference",Oi=On.reduce(function(e,t){return e.concat([t+"-"+Ht,t+"-"+Sn])},[]),Gs=[].concat(On,[bo]).reduce(function(e,t){return e.concat([t,t+"-"+Ht,t+"-"+Sn])},[]),fc="beforeRead",gc="read",mc="afterRead",hc="beforeMain",vc="main",bc="afterMain",wc="beforeWrite",yc="write",xc="afterWrite",Sc=[fc,gc,mc,hc,vc,bc,wc,yc,xc];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function kt(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function Ge(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function wo(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Cc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ge(i)||!Ze(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var a=o[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function Ec(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),a=s.reduce(function(u,c){return u[c]="",u},{});!Ge(o)||!Ze(o)||(Object.assign(o.style,a),Object.keys(i).forEach(function(u){o.removeAttribute(u)}))})}}const Rc={name:"applyStyles",enabled:!0,phase:"write",fn:Cc,effect:Ec,requires:["computeStyles"]};function Ke(e){return e.split("-")[0]}var Rt=Math.max,Jn=Math.min,Gt=Math.round;function Zr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Us(){return!/^((?!chrome|android).)*safari/i.test(Zr())}function Ut(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ge(e)&&(o=e.offsetWidth>0&&Gt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Gt(r.height)/e.offsetHeight||1);var s=kt(e)?Le(e):window,a=s.visualViewport,u=!Us()&&n,c=(r.left+(u&&a?a.offsetLeft:0))/o,p=(r.top+(u&&a?a.offsetTop:0))/i,g=r.width/o,f=r.height/i;return{width:g,height:f,top:p,right:c+g,bottom:p+f,left:c,x:c,y:p}}function yo(e){var t=Ut(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function qs(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&wo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Le(e).getComputedStyle(e)}function Tc(e){return["table","td","th"].indexOf(Ze(e))>=0}function vt(e){return((kt(e)?e.ownerDocument:e.document)||window.document).documentElement}function lr(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(wo(e)?e.host:null)||vt(e)}function ki(e){return!Ge(e)||at(e).position==="fixed"?null:e.offsetParent}function Pc(e){var t=/firefox/i.test(Zr()),n=/Trident/i.test(Zr());if(n&&Ge(e)){var r=at(e);if(r.position==="fixed")return null}var o=lr(e);for(wo(o)&&(o=o.host);Ge(o)&&["html","body"].indexOf(Ze(o))<0;){var i=at(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function kn(e){for(var t=Le(e),n=ki(e);n&&Tc(n)&&at(n).position==="static";)n=ki(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&at(n).position==="static")?t:n||Pc(e)||t}function xo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function mn(e,t,n){return Rt(e,Jn(t,n))}function Oc(e,t,n){var r=mn(e,t,n);return r>n?n:r}function Ws(){return{top:0,right:0,bottom:0,left:0}}function Xs(e){return Object.assign({},Ws(),e)}function Ys(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var kc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Xs(typeof t!="number"?t:Ys(t,On))};function Nc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,a=Ke(n.placement),u=xo(a),c=[Ie,We].indexOf(a)>=0,p=c?"height":"width";if(!(!i||!s)){var g=kc(o.padding,n),f=yo(i),d=u==="y"?Me:Ie,h=u==="y"?qe:We,m=n.rects.reference[p]+n.rects.reference[u]-s[u]-n.rects.popper[p],v=s[u]-n.rects.reference[u],y=kn(i),O=y?u==="y"?y.clientHeight||0:y.clientWidth||0:0,x=m/2-v/2,S=g[d],w=O-f[p]-g[h],T=O/2-f[p]/2+x,k=mn(S,T,w),D=u;n.modifiersData[r]=(t={},t[D]=k,t.centerOffset=k-T,t)}}function _c(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||qs(t.elements.popper,o)&&(t.elements.arrow=o))}const $c={name:"arrow",enabled:!0,phase:"main",fn:Nc,effect:_c,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function qt(e){return e.split("-")[1]}var Mc={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Ic(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Gt(n*o)/o||0,y:Gt(r*o)/o||0}}function Ni(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,a=e.position,u=e.gpuAcceleration,c=e.adaptive,p=e.roundOffsets,g=e.isFixed,f=s.x,d=f===void 0?0:f,h=s.y,m=h===void 0?0:h,v=typeof p=="function"?p({x:d,y:m}):{x:d,y:m};d=v.x,m=v.y;var y=s.hasOwnProperty("x"),O=s.hasOwnProperty("y"),x=Ie,S=Me,w=window;if(c){var T=kn(n),k="clientHeight",D="clientWidth";if(T===Le(n)&&(T=vt(n),at(T).position!=="static"&&a==="absolute"&&(k="scrollHeight",D="scrollWidth")),T=T,o===Me||(o===Ie||o===We)&&i===Sn){S=qe;var F=g&&T===w&&w.visualViewport?w.visualViewport.height:T[k];m-=F-r.height,m*=u?1:-1}if(o===Ie||(o===Me||o===qe)&&i===Sn){x=We;var V=g&&T===w&&w.visualViewport?w.visualViewport.width:T[D];d-=V-r.width,d*=u?1:-1}}var P=Object.assign({position:a},c&&Mc),I=p===!0?Ic({x:d,y:m},Le(n)):{x:d,y:m};if(d=I.x,m=I.y,u){var $;return Object.assign({},P,($={},$[S]=O?"0":"",$[x]=y?"0":"",$.transform=(w.devicePixelRatio||1)<=1?"translate("+d+"px, "+m+"px)":"translate3d("+d+"px, "+m+"px, 0)",$))}return Object.assign({},P,(t={},t[S]=O?m+"px":"",t[x]=y?d+"px":"",t.transform="",t))}function jc(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,a=n.roundOffsets,u=a===void 0?!0:a,c={placement:Ke(t.placement),variation:qt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ni(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ni(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Ac={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:jc,data:{}};var Dn={passive:!0};function Dc(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,a=s===void 0?!0:s,u=Le(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach(function(p){p.addEventListener("scroll",n.update,Dn)}),a&&u.addEventListener("resize",n.update,Dn),function(){i&&c.forEach(function(p){p.removeEventListener("scroll",n.update,Dn)}),a&&u.removeEventListener("resize",n.update,Dn)}}const Fc={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Dc,data:{}};var Vc={left:"right",right:"left",bottom:"top",top:"bottom"};function Gn(e){return e.replace(/left|right|bottom|top/g,function(t){return Vc[t]})}var Lc={start:"end",end:"start"};function _i(e){return e.replace(/start|end/g,function(t){return Lc[t]})}function So(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Co(e){return Ut(vt(e)).left+So(e).scrollLeft}function Bc(e,t){var n=Le(e),r=vt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,u=0;if(o){i=o.width,s=o.height;var c=Us();(c||!c&&t==="fixed")&&(a=o.offsetLeft,u=o.offsetTop)}return{width:i,height:s,x:a+Co(e),y:u}}function zc(e){var t,n=vt(e),r=So(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=Rt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Rt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-r.scrollLeft+Co(e),u=-r.scrollTop;return at(o||n).direction==="rtl"&&(a+=Rt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:a,y:u}}function Eo(e){var t=at(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ks(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:Ge(e)&&Eo(e)?e:Ks(lr(e))}function hn(e,t){var n;t===void 0&&(t=[]);var r=Ks(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Le(r),s=o?[i].concat(i.visualViewport||[],Eo(r)?r:[]):r,a=t.concat(s);return o?a:a.concat(hn(lr(s)))}function Qr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Hc(e,t){var n=Ut(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function $i(e,t,n){return t===Hs?Qr(Bc(e,n)):kt(t)?Hc(t,n):Qr(zc(vt(e)))}function Gc(e){var t=hn(lr(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&Ge(e)?kn(e):e;return kt(r)?t.filter(function(o){return kt(o)&&qs(o,r)&&Ze(o)!=="body"}):[]}function Uc(e,t,n,r){var o=t==="clippingParents"?Gc(e):[].concat(t),i=[].concat(o,[n]),s=i[0],a=i.reduce(function(u,c){var p=$i(e,c,r);return u.top=Rt(p.top,u.top),u.right=Jn(p.right,u.right),u.bottom=Jn(p.bottom,u.bottom),u.left=Rt(p.left,u.left),u},$i(e,s,r));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Js(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ke(r):null,i=r?qt(r):null,s=t.x+t.width/2-n.width/2,a=t.y+t.height/2-n.height/2,u;switch(o){case Me:u={x:s,y:t.y-n.height};break;case qe:u={x:s,y:t.y+t.height};break;case We:u={x:t.x+t.width,y:a};break;case Ie:u={x:t.x-n.width,y:a};break;default:u={x:t.x,y:t.y}}var c=o?xo(o):null;if(c!=null){var p=c==="y"?"height":"width";switch(i){case Ht:u[c]=u[c]-(t[p]/2-n[p]/2);break;case Sn:u[c]=u[c]+(t[p]/2-n[p]/2);break}}return u}function Cn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,a=n.boundary,u=a===void 0?pc:a,c=n.rootBoundary,p=c===void 0?Hs:c,g=n.elementContext,f=g===void 0?rn:g,d=n.altBoundary,h=d===void 0?!1:d,m=n.padding,v=m===void 0?0:m,y=Xs(typeof v!="number"?v:Ys(v,On)),O=f===rn?dc:rn,x=e.rects.popper,S=e.elements[h?O:f],w=Uc(kt(S)?S:S.contextElement||vt(e.elements.popper),u,p,s),T=Ut(e.elements.reference),k=Js({reference:T,element:x,strategy:"absolute",placement:o}),D=Qr(Object.assign({},x,k)),F=f===rn?D:T,V={top:w.top-F.top+y.top,bottom:F.bottom-w.bottom+y.bottom,left:w.left-F.left+y.left,right:F.right-w.right+y.right},P=e.modifiersData.offset;if(f===rn&&P){var I=P[o];Object.keys(V).forEach(function($){var L=[We,qe].indexOf($)>=0?1:-1,B=[Me,qe].indexOf($)>=0?"y":"x";V[$]+=I[B]*L})}return V}function qc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,a=n.flipVariations,u=n.allowedAutoPlacements,c=u===void 0?Gs:u,p=qt(r),g=p?a?Oi:Oi.filter(function(h){return qt(h)===p}):On,f=g.filter(function(h){return c.indexOf(h)>=0});f.length===0&&(f=g);var d=f.reduce(function(h,m){return h[m]=Cn(e,{placement:m,boundary:o,rootBoundary:i,padding:s})[Ke(m)],h},{});return Object.keys(d).sort(function(h,m){return d[h]-d[m]})}function Wc(e){if(Ke(e)===bo)return[];var t=Gn(e);return[_i(e),t,_i(t)]}function Xc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!0:s,u=n.fallbackPlacements,c=n.padding,p=n.boundary,g=n.rootBoundary,f=n.altBoundary,d=n.flipVariations,h=d===void 0?!0:d,m=n.allowedAutoPlacements,v=t.options.placement,y=Ke(v),O=y===v,x=u||(O||!h?[Gn(v)]:Wc(v)),S=[v].concat(x).reduce(function(H,U){return H.concat(Ke(U)===bo?qc(t,{placement:U,boundary:p,rootBoundary:g,padding:c,flipVariations:h,allowedAutoPlacements:m}):U)},[]),w=t.rects.reference,T=t.rects.popper,k=new Map,D=!0,F=S[0],V=0;V<S.length;V++){var P=S[V],I=Ke(P),$=qt(P)===Ht,L=[Me,qe].indexOf(I)>=0,B=L?"width":"height",M=Cn(t,{placement:P,boundary:p,rootBoundary:g,altBoundary:f,padding:c}),z=L?$?We:Ie:$?qe:Me;w[B]>T[B]&&(z=Gn(z));var ne=Gn(z),te=[];if(i&&te.push(M[I]<=0),a&&te.push(M[z]<=0,M[ne]<=0),te.every(function(H){return H})){F=P,D=!1;break}k.set(P,te)}if(D)for(var R=h?3:1,A=function(U){var W=S.find(function(X){var q=k.get(X);if(q)return q.slice(0,U).every(function(K){return K})});if(W)return F=W,"break"},G=R;G>0;G--){var Y=A(G);if(Y==="break")break}t.placement!==F&&(t.modifiersData[r]._skip=!0,t.placement=F,t.reset=!0)}}const Yc={name:"flip",enabled:!0,phase:"main",fn:Xc,requiresIfExists:["offset"],data:{_skip:!1}};function Mi(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ii(e){return[Me,We,qe,Ie].some(function(t){return e[t]>=0})}function Kc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=Cn(t,{elementContext:"reference"}),a=Cn(t,{altBoundary:!0}),u=Mi(s,r),c=Mi(a,o,i),p=Ii(u),g=Ii(c);t.modifiersData[n]={referenceClippingOffsets:u,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:g},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":g})}const Jc={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Kc};function Zc(e,t,n){var r=Ke(e),o=[Ie,Me].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],a=i[1];return s=s||0,a=(a||0)*o,[Ie,We].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Qc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=Gs.reduce(function(p,g){return p[g]=Zc(g,t.rects,i),p},{}),a=s[t.placement],u=a.x,c=a.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=s}const ep={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Qc};function tp(e){var t=e.state,n=e.name;t.modifiersData[n]=Js({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const np={name:"popperOffsets",enabled:!0,phase:"read",fn:tp,data:{}};function rp(e){return e==="x"?"y":"x"}function op(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,a=s===void 0?!1:s,u=n.boundary,c=n.rootBoundary,p=n.altBoundary,g=n.padding,f=n.tether,d=f===void 0?!0:f,h=n.tetherOffset,m=h===void 0?0:h,v=Cn(t,{boundary:u,rootBoundary:c,padding:g,altBoundary:p}),y=Ke(t.placement),O=qt(t.placement),x=!O,S=xo(y),w=rp(S),T=t.modifiersData.popperOffsets,k=t.rects.reference,D=t.rects.popper,F=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,V=typeof F=="number"?{mainAxis:F,altAxis:F}:Object.assign({mainAxis:0,altAxis:0},F),P=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0};if(T){if(i){var $,L=S==="y"?Me:Ie,B=S==="y"?qe:We,M=S==="y"?"height":"width",z=T[S],ne=z+v[L],te=z-v[B],R=d?-D[M]/2:0,A=O===Ht?k[M]:D[M],G=O===Ht?-D[M]:-k[M],Y=t.elements.arrow,H=d&&Y?yo(Y):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ws(),W=U[L],X=U[B],q=mn(0,k[M],H[M]),K=x?k[M]/2-R-q-W-V.mainAxis:A-q-W-V.mainAxis,Q=x?-k[M]/2+R+q+X+V.mainAxis:G+q+X+V.mainAxis,se=t.elements.arrow&&kn(t.elements.arrow),j=se?S==="y"?se.clientTop||0:se.clientLeft||0:0,ee=($=P==null?void 0:P[S])!=null?$:0,_=z+K-ee-j,ae=z+Q-ee,Ce=mn(d?Jn(ne,_):ne,z,d?Rt(te,ae):te);T[S]=Ce,I[S]=Ce-z}if(a){var Ne,ye=S==="x"?Me:Ie,wt=S==="x"?qe:We,_e=T[w],et=w==="y"?"height":"width",Ae=_e+v[ye],tt=_e-v[wt],Ee=[Me,Ie].indexOf(y)!==-1,_t=(Ne=P==null?void 0:P[w])!=null?Ne:0,yt=Ee?Ae:_e-k[et]-D[et]-_t+V.altAxis,Kt=Ee?_e+k[et]+D[et]-_t-V.altAxis:tt,Mn=d&&Ee?Oc(yt,_e,Kt):mn(d?yt:Ae,_e,d?Kt:tt);T[w]=Mn,I[w]=Mn-_e}t.modifiersData[r]=I}}const ip={name:"preventOverflow",enabled:!0,phase:"main",fn:op,requiresIfExists:["offset"]};function sp(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function ap(e){return e===Le(e)||!Ge(e)?So(e):sp(e)}function lp(e){var t=e.getBoundingClientRect(),n=Gt(t.width)/e.offsetWidth||1,r=Gt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function up(e,t,n){n===void 0&&(n=!1);var r=Ge(t),o=Ge(t)&&lp(t),i=vt(t),s=Ut(e,o,n),a={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||Eo(i))&&(a=ap(t)),Ge(t)?(u=Ut(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):i&&(u.x=Co(i))),{x:s.left+a.scrollLeft-u.x,y:s.top+a.scrollTop-u.y,width:s.width,height:s.height}}function cp(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!n.has(a)){var u=t.get(a);u&&o(u)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function pp(e){var t=cp(e);return Sc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function dp(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function fp(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ji={placement:"bottom",modifiers:[],strategy:"absolute"};function Ai(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function gp(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?ji:o;return function(a,u,c){c===void 0&&(c=i);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},ji,i),modifiersData:{},elements:{reference:a,popper:u},attributes:{},styles:{}},g=[],f=!1,d={state:p,setOptions:function(y){var O=typeof y=="function"?y(p.options):y;m(),p.options=Object.assign({},i,p.options,O),p.scrollParents={reference:kt(a)?hn(a):a.contextElement?hn(a.contextElement):[],popper:hn(u)};var x=pp(fp([].concat(r,p.options.modifiers)));return p.orderedModifiers=x.filter(function(S){return S.enabled}),h(),d.update()},forceUpdate:function(){if(!f){var y=p.elements,O=y.reference,x=y.popper;if(Ai(O,x)){p.rects={reference:up(O,kn(x),p.options.strategy==="fixed"),popper:yo(x)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(V){return p.modifiersData[V.name]=Object.assign({},V.data)});for(var S=0;S<p.orderedModifiers.length;S++){if(p.reset===!0){p.reset=!1,S=-1;continue}var w=p.orderedModifiers[S],T=w.fn,k=w.options,D=k===void 0?{}:k,F=w.name;typeof T=="function"&&(p=T({state:p,options:D,name:F,instance:d})||p)}}}},update:dp(function(){return new Promise(function(v){d.forceUpdate(),v(p)})}),destroy:function(){m(),f=!0}};if(!Ai(a,u))return d;d.setOptions(c).then(function(v){!f&&c.onFirstUpdate&&c.onFirstUpdate(v)});function h(){p.orderedModifiers.forEach(function(v){var y=v.name,O=v.options,x=O===void 0?{}:O,S=v.effect;if(typeof S=="function"){var w=S({state:p,name:y,instance:d,options:x}),T=function(){};g.push(w||T)}})}function m(){g.forEach(function(v){return v()}),g=[]}return d}}var mp=[Fc,np,Ac,Rc,ep,Yc,ip,$c,Jc],hp=gp({defaultModifiers:mp});const Zs="Popper";function vp(e){return zs(Zs,e)}Xu(Zs,["root"]);const bp=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],wp=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function yp(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Zn(e){return typeof e=="function"?e():e}function ur(e){return e.nodeType!==void 0}function xp(e){return!ur(e)}const Sp=()=>ut({root:["root"]},zu(vp)),Cp={},Ep=C.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:a,modifiers:u,open:c,placement:p,popperOptions:g,popperRef:f,slotProps:d={},slots:h={},TransitionProps:m}=t,v=fe(t,bp),y=C.useRef(null),O=Ue(y,n),x=C.useRef(null),S=Ue(x,f),w=C.useRef(S);Pt(()=>{w.current=S},[S]),C.useImperativeHandle(f,()=>x.current,[]);const T=yp(p,s),[k,D]=C.useState(T),[F,V]=C.useState(Zn(o));C.useEffect(()=>{x.current&&x.current.forceUpdate()}),C.useEffect(()=>{o&&V(Zn(o))},[o]),Pt(()=>{if(!F||!c)return;const B=ne=>{D(ne.placement)};if(process.env.NODE_ENV!=="production"&&F&&ur(F)&&F.nodeType===1){const ne=F.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ne.top===0&&ne.left===0&&ne.right===0&&ne.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:a}},{name:"flip",options:{altBoundary:a}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ne})=>{B(ne)}}];u!=null&&(M=M.concat(u)),g&&g.modifiers!=null&&(M=M.concat(g.modifiers));const z=hp(F,y.current,E({placement:T},g,{modifiers:M}));return w.current(z),()=>{z.destroy(),w.current(null)}},[F,a,u,c,g,T]);const P={placement:k};m!==null&&(P.TransitionProps=m);const I=Sp(),$=(r=h.root)!=null?r:"div",L=Ot({elementType:$,externalSlotProps:d.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:O},ownerState:t,className:I.root});return b.jsx($,E({},L,{children:typeof i=="function"?i(P):i}))}),Qs=C.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:a=!1,keepMounted:u=!1,modifiers:c,open:p,placement:g="bottom",popperOptions:f=Cp,popperRef:d,style:h,transition:m=!1,slotProps:v={},slots:y={}}=t,O=fe(t,wp),[x,S]=C.useState(!0),w=()=>{S(!1)},T=()=>{S(!0)};if(!u&&!p&&(!m||x))return null;let k;if(i)k=i;else if(r){const V=Zn(r);k=V&&ur(V)?Oe(V).body:Oe(null).body}const D=!p&&u&&(!m||x)?"none":void 0,F=m?{in:p,onEnter:w,onExited:T}:void 0;return b.jsx(xn,{disablePortal:a,container:k,children:b.jsx(Ep,E({anchorEl:r,direction:s,disablePortal:a,modifiers:c,ref:n,open:m?!x:p,placement:g,popperOptions:f,popperRef:d,slotProps:v,slots:y},O,{style:E({position:"fixed",top:0,left:0,display:D},h),TransitionProps:F,children:o}))})});process.env.NODE_ENV!=="production"&&(Qs.propTypes={anchorEl:Yt(l.oneOfType([st,l.object,l.func]),e=>{if(e.open){const t=Zn(e.anchorEl);if(t&&ur(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||xp(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:l.oneOfType([l.node,l.func]),container:l.oneOfType([st,l.func]),direction:l.oneOf(["ltr","rtl"]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:vo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),transition:l.bool});const Rp=["values","unit","step"],Tp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>E({},n,{[r.key]:r.val}),{})};function Pp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,Rp),i=Tp(t),s=Object.keys(i);function a(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function u(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function c(f,d){const h=s.indexOf(d);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(h!==-1&&typeof t[s[h]]=="number"?t[s[h]]:d)-r/100}${n})`}function p(f){return s.indexOf(f)+1<s.length?c(f,s[s.indexOf(f)+1]):a(f)}function g(f){const d=s.indexOf(f);return d===0?a(s[1]):d===s.length-1?u(s[d]):c(f,s[s.indexOf(f)+1]).replace("@media","@media not all and")}return E({keys:s,values:i,up:a,down:u,between:c,only:p,not:g,unit:n},o)}const Op={borderRadius:4},kp=Op,Np=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.string,l.object,l.array]):{},bt=Np;function vn(e,t){return t?it(e,t,{clone:!1}):e}const Ro={xs:0,sm:600,md:900,lg:1200,xl:1536},Di={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ro[e]}px)`};function lt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Di;return t.reduce((s,a,u)=>(s[i.up(i.keys[u])]=n(t[u]),s),{})}if(typeof t=="object"){const i=r.breakpoints||Di;return Object.keys(t).reduce((s,a)=>{if(Object.keys(i.values||Ro).indexOf(a)!==-1){const u=i.up(a);s[u]=n(t[a],a)}else{const u=a;s[u]=t[u]}return s},{})}return n(t)}function _p(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function $p(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function cr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Qn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=cr(e,n)||r,t&&(o=t(o,r,e)),o}function Se(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const a=s[t],u=s.theme,c=cr(u,r)||{};return lt(s,a,g=>{let f=Qn(c,o,g);return g===f&&typeof g=="string"&&(f=Qn(c,o,`${t}${g==="default"?"":Je(g)}`,g)),n===!1?f:{[n]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:bt}:{},i.filterProps=[t],i}function Mp(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Ip={m:"margin",p:"padding"},jp={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Fi={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Ap=Mp(e=>{if(e.length>2)if(Fi[e])e=Fi[e];else return[e];const[t,n]=e.split(""),r=Ip[t],o=jp[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),pr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],dr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Dp=[...pr,...dr];function Nn(e,t,n,r){var o;const i=(o=cr(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ea(e){return Nn(e,"spacing",8,"spacing")}function _n(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Fp(e,t){return n=>e.reduce((r,o)=>(r[o]=_n(t,n),r),{})}function Vp(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Ap(n),i=Fp(o,r),s=e[n];return lt(e,s,i)}function ta(e,t){const n=ea(e.theme);return Object.keys(e).map(r=>Vp(e,t,r,n)).reduce(vn,{})}function ve(e){return ta(e,pr)}ve.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=bt,e),{}):{};ve.filterProps=pr;function be(e){return ta(e,dr)}be.propTypes=process.env.NODE_ENV!=="production"?dr.reduce((e,t)=>(e[t]=bt,e),{}):{};be.filterProps=dr;process.env.NODE_ENV!=="production"&&Dp.reduce((e,t)=>(e[t]=bt,e),{});function Lp(e=8){if(e.mui)return e;const t=ea({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function fr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?vn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function He(e){return typeof e!="number"?e:`${e}px solid`}function Xe(e,t){return Se({prop:e,themeKey:"borders",transform:t})}const Bp=Xe("border",He),zp=Xe("borderTop",He),Hp=Xe("borderRight",He),Gp=Xe("borderBottom",He),Up=Xe("borderLeft",He),qp=Xe("borderColor"),Wp=Xe("borderTopColor"),Xp=Xe("borderRightColor"),Yp=Xe("borderBottomColor"),Kp=Xe("borderLeftColor"),Jp=Xe("outline",He),Zp=Xe("outlineColor"),gr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Nn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:_n(t,r)});return lt(e,e.borderRadius,n)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:bt}:{};gr.filterProps=["borderRadius"];fr(Bp,zp,Hp,Gp,Up,qp,Wp,Xp,Yp,Kp,gr,Jp,Zp);const mr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Nn(e.theme,"spacing",8,"gap"),n=r=>({gap:_n(t,r)});return lt(e,e.gap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{gap:bt}:{};mr.filterProps=["gap"];const hr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Nn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:_n(t,r)});return lt(e,e.columnGap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:bt}:{};hr.filterProps=["columnGap"];const vr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Nn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:_n(t,r)});return lt(e,e.rowGap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:bt}:{};vr.filterProps=["rowGap"];const Qp=Se({prop:"gridColumn"}),ed=Se({prop:"gridRow"}),td=Se({prop:"gridAutoFlow"}),nd=Se({prop:"gridAutoColumns"}),rd=Se({prop:"gridAutoRows"}),od=Se({prop:"gridTemplateColumns"}),id=Se({prop:"gridTemplateRows"}),sd=Se({prop:"gridTemplateAreas"}),ad=Se({prop:"gridArea"});fr(mr,hr,vr,Qp,ed,td,nd,rd,od,id,sd,ad);function Lt(e,t){return t==="grey"?t:e}const ld=Se({prop:"color",themeKey:"palette",transform:Lt}),ud=Se({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Lt}),cd=Se({prop:"backgroundColor",themeKey:"palette",transform:Lt});fr(ld,ud,cd);function Ve(e){return e<=1&&e!==0?`${e*100}%`:e}const pd=Se({prop:"width",transform:Ve}),To=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ro[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ve(n)}};return lt(e,e.maxWidth,t)}return null};To.filterProps=["maxWidth"];const dd=Se({prop:"minWidth",transform:Ve}),fd=Se({prop:"height",transform:Ve}),gd=Se({prop:"maxHeight",transform:Ve}),md=Se({prop:"minHeight",transform:Ve});Se({prop:"size",cssProperty:"width",transform:Ve});Se({prop:"size",cssProperty:"height",transform:Ve});const hd=Se({prop:"boxSizing"});fr(pd,To,dd,fd,gd,md,hd);const vd={border:{themeKey:"borders",transform:He},borderTop:{themeKey:"borders",transform:He},borderRight:{themeKey:"borders",transform:He},borderBottom:{themeKey:"borders",transform:He},borderLeft:{themeKey:"borders",transform:He},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:He},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:gr},color:{themeKey:"palette",transform:Lt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Lt},backgroundColor:{themeKey:"palette",transform:Lt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ve},mt:{style:ve},mr:{style:ve},mb:{style:ve},ml:{style:ve},mx:{style:ve},my:{style:ve},margin:{style:ve},marginTop:{style:ve},marginRight:{style:ve},marginBottom:{style:ve},marginLeft:{style:ve},marginX:{style:ve},marginY:{style:ve},marginInline:{style:ve},marginInlineStart:{style:ve},marginInlineEnd:{style:ve},marginBlock:{style:ve},marginBlockStart:{style:ve},marginBlockEnd:{style:ve},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:mr},rowGap:{style:vr},columnGap:{style:hr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ve},maxWidth:{style:To},minWidth:{transform:Ve},height:{transform:Ve},maxHeight:{transform:Ve},minHeight:{transform:Ve},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Po=vd;function bd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function wd(e,t){return typeof e=="function"?e(t):e}function yd(){function e(n,r,o,i){const s={[n]:r,theme:o},a=i[n];if(!a)return{[n]:r};const{cssProperty:u=n,themeKey:c,transform:p,style:g}=a;if(r==null)return null;if(c==="typography"&&r==="inherit")return{[n]:r};const f=cr(o,c)||{};return g?g(s):lt(s,r,h=>{let m=Qn(f,p,h);return h===m&&typeof h=="string"&&(m=Qn(f,p,`${n}${h==="default"?"":Je(h)}`,h)),u===!1?m:{[u]:m}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:Po;function a(u){let c=u;if(typeof u=="function")c=u(i);else if(typeof u!="object")return u;if(!c)return null;const p=_p(i.breakpoints),g=Object.keys(p);let f=p;return Object.keys(c).forEach(d=>{const h=wd(c[d],i);if(h!=null)if(typeof h=="object")if(s[d])f=vn(f,e(d,h,i,s));else{const m=lt({theme:i},h,v=>({[d]:v}));bd(m,h)?f[d]=t({sx:h,theme:i}):f=vn(f,m)}else f=vn(f,e(d,h,i,s))}),$p(g,f)}return Array.isArray(o)?o.map(a):a(o)}return t}const na=yd();na.filterProps=["sx"];const Oo=na;function xd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Sd=["breakpoints","palette","spacing","shape"];function ko(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=fe(e,Sd),a=Pp(n),u=Lp(o);let c=it({breakpoints:a,direction:"ltr",components:{},palette:E({mode:"light"},r),spacing:u,shape:E({},kp,i)},s);return c.applyStyles=xd,c=t.reduce((p,g)=>it(p,g),c),c.unstable_sxConfig=E({},Po,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Oo({sx:g,theme:this})},c}function Cd(e){return Object.keys(e).length===0}function ra(e=null){const t=C.useContext(Ur.ThemeContext);return!t||Cd(t)?e:t}const Ed=ko();function oa(e=Ed){return ra(e)}const Rd=["ownerState"],Td=["variants"],Pd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Od(e){return Object.keys(e).length===0}function kd(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Un(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Nd=ko(),Vi=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Fn({defaultTheme:e,theme:t,themeId:n}){return Od(t)?e:t[n]||t}function _d(e){return e?(t,n)=>n[e]:null}function qn(e,t){let{ownerState:n}=t,r=fe(t,Rd);const o=typeof e=="function"?e(E({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>qn(i,E({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let a=fe(o,Td);return i.forEach(u=>{let c=!0;typeof u.props=="function"?c=u.props(E({ownerState:n},r,n)):Object.keys(u.props).forEach(p=>{(n==null?void 0:n[p])!==u.props[p]&&r[p]!==u.props[p]&&(c=!1)}),c&&(Array.isArray(a)||(a=[a]),a.push(typeof u.style=="function"?u.style(E({ownerState:n},r,n)):u.style))}),a}return o}function $d(e={}){const{themeId:t,defaultTheme:n=Nd,rootShouldForwardProp:r=Un,slotShouldForwardProp:o=Un}=e,i=s=>Oo(E({},s,{theme:Fn(E({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,a={})=>{Ur.internal_processStyles(s,w=>w.filter(T=>!(T!=null&&T.__mui_systemSx)));const{name:u,slot:c,skipVariantsResolver:p,skipSx:g,overridesResolver:f=_d(Vi(c))}=a,d=fe(a,Pd),h=p!==void 0?p:c&&c!=="Root"&&c!=="root"||!1,m=g||!1;let v;process.env.NODE_ENV!=="production"&&u&&(v=`${u}-${Vi(c||"Root")}`);let y=Un;c==="Root"||c==="root"?y=r:c?y=o:kd(s)&&(y=void 0);const O=Ur(s,E({shouldForwardProp:y,label:v},d)),x=w=>typeof w=="function"&&w.__emotion_real!==w||Et(w)?T=>qn(w,E({},T,{theme:Fn({theme:T.theme,defaultTheme:n,themeId:t})})):w,S=(w,...T)=>{let k=x(w);const D=T?T.map(x):[];u&&f&&D.push(P=>{const I=Fn(E({},P,{defaultTheme:n,themeId:t}));if(!I.components||!I.components[u]||!I.components[u].styleOverrides)return null;const $=I.components[u].styleOverrides,L={};return Object.entries($).forEach(([B,M])=>{L[B]=qn(M,E({},P,{theme:I}))}),f(P,L)}),u&&!h&&D.push(P=>{var I;const $=Fn(E({},P,{defaultTheme:n,themeId:t})),L=$==null||(I=$.components)==null||(I=I[u])==null?void 0:I.variants;return qn({variants:L},E({},P,{theme:$}))}),m||D.push(i);const F=D.length-T.length;if(Array.isArray(w)&&F>0){const P=new Array(F).fill("");k=[...w,...P],k.raw=[...w.raw,...P]}const V=O(k,...D);if(process.env.NODE_ENV!=="production"){let P;u&&(P=`${u}${Je(c||"")}`),P===void 0&&(P=`Styled(${hu(s)})`),V.displayName=P}return s.muiName&&(V.muiName=s.muiName),V};return O.withConfig&&(S.withConfig=O.withConfig),S}}function Md(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:As(t.components[n].defaultProps,r)}function Id({props:e,name:t,defaultTheme:n,themeId:r}){let o=oa(n);return r&&(o=o[r]||o),Md({theme:o,name:t,props:e})}function No(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Vu(e,t,n)}function jd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Nt(e){if(e.type)return e;if(e.charAt(0)==="#")return Nt(jd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Bt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Bt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function br(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Ad(e){e=Nt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(c,p=(c+n/30)%12)=>o-i*Math.max(Math.min(p-3,9-p,1),-1);let a="rgb";const u=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(a+="a",u.push(t[3])),br({type:a,values:u})}function Li(e){e=Nt(e);let t=e.type==="hsl"||e.type==="hsla"?Nt(Ad(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Bi(e,t){const n=Li(e),r=Li(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function er(e,t){return e=Nt(e),t=No(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,br(e)}function Dd(e,t){if(e=Nt(e),t=No(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return br(e)}function Fd(e,t){if(e=Nt(e),t=No(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return br(e)}function Vd(e,t){return E({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Ld={black:"#000",white:"#fff"},En=Ld,Bd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},zd=Bd,Hd={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$t=Hd,Gd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Mt=Gd,Ud={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},on=Ud,qd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},It=qd,Wd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},jt=Wd,Xd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},At=Xd,Yd=["mode","contrastThreshold","tonalOffset"],zi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:En.white,default:En.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Mr={text:{primary:En.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:En.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Hi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Fd(e.main,o):t==="dark"&&(e.dark=Dd(e.main,i)))}function Kd(e="light"){return e==="dark"?{main:It[200],light:It[50],dark:It[400]}:{main:It[700],light:It[400],dark:It[800]}}function Jd(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[500],light:$t[300],dark:$t[700]}}function Zd(e="light"){return e==="dark"?{main:Mt[500],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function Qd(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[700],light:jt[500],dark:jt[900]}}function ef(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[800],light:At[500],dark:At[900]}}function tf(e="light"){return e==="dark"?{main:on[400],light:on[300],dark:on[700]}:{main:"#ed6c02",light:on[500],dark:on[900]}}function nf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Yd),i=e.primary||Kd(t),s=e.secondary||Jd(t),a=e.error||Zd(t),u=e.info||Qd(t),c=e.success||ef(t),p=e.warning||tf(t);function g(m){const v=Bi(m,Mr.text.primary)>=n?Mr.text.primary:zi.text.primary;if(process.env.NODE_ENV!=="production"){const y=Bi(m,v);y<3&&console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return v}const f=({color:m,name:v,mainShade:y=500,lightShade:O=300,darkShade:x=700})=>{if(m=E({},m),!m.main&&m[y]&&(m.main=m[y]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.`:Bt(11,v?` (${v})`:"",y));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${v?` (${v})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Bt(12,v?` (${v})`:"",JSON.stringify(m.main)));return Hi(m,"light",O,r),Hi(m,"dark",x,r),m.contrastText||(m.contrastText=g(m.main)),m},d={dark:Mr,light:zi};return process.env.NODE_ENV!=="production"&&(d[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),it(E({common:E({},En),mode:t,primary:f({color:i,name:"primary"}),secondary:f({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:a,name:"error"}),warning:f({color:p,name:"warning"}),info:f({color:u,name:"info"}),success:f({color:c,name:"success"}),grey:zd,contrastThreshold:n,getContrastText:g,augmentColor:f,tonalOffset:r},d[t]),o)}const rf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function of(e){return Math.round(e*1e5)/1e5}const Gi={textTransform:"uppercase"},Ui='"Roboto", "Helvetica", "Arial", sans-serif';function sf(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ui,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:a=500,fontWeightBold:u=700,htmlFontSize:c=16,allVariants:p,pxToRem:g}=n,f=fe(n,rf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof c!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const d=o/14,h=g||(y=>`${y/c*d}rem`),m=(y,O,x,S,w)=>E({fontFamily:r,fontWeight:y,fontSize:h(O),lineHeight:x},r===Ui?{letterSpacing:`${of(S/O)}em`}:{},w,p),v={h1:m(i,96,1.167,-1.5),h2:m(i,60,1.2,-.5),h3:m(s,48,1.167,0),h4:m(s,34,1.235,.25),h5:m(s,24,1.334,0),h6:m(a,20,1.6,.15),subtitle1:m(s,16,1.75,.15),subtitle2:m(a,14,1.57,.1),body1:m(s,16,1.5,.15),body2:m(s,14,1.43,.15),button:m(a,14,1.75,.4,Gi),caption:m(s,12,1.66,.4),overline:m(s,12,2.66,1,Gi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return it(E({htmlFontSize:c,pxToRem:h,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:a,fontWeightBold:u},v),f,{clone:!1})}const af=.2,lf=.14,uf=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${af})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${lf})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${uf})`].join(",")}const cf=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],pf=cf,df=["duration","easing","delay"],ff={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},gf={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function qi(e){return`${Math.round(e)}ms`}function mf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function hf(e){const t=E({},ff,e.easing),n=E({},gf,e.duration);return E({getAutoHeightDuration:mf,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:a=t.easeInOut,delay:u=0}=i,c=fe(i,df);if(process.env.NODE_ENV!=="production"){const p=f=>typeof f=="string",g=f=>!isNaN(parseFloat(f));!p(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!g(s)&&!p(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),p(a)||console.error('MUI: Argument "easing" must be a string.'),!g(u)&&!p(u)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(c).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(p=>`${p} ${typeof s=="string"?s:qi(s)} ${a} ${typeof u=="string"?u:qi(u)}`).join(",")}},e,{easing:t,duration:n})}const vf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},bf=vf,wf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function yf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=fe(e,wf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Bt(18));const a=nf(r),u=ko(e);let c=it(u,{mixins:Vd(u.breakpoints,n),palette:a,shadows:pf.slice(),typography:sf(a,i),transitions:hf(o),zIndex:E({},bf)});if(c=it(c,s),c=t.reduce((p,g)=>it(p,g),c),process.env.NODE_ENV!=="production"){const p=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],g=(f,d)=>{let h;for(h in f){const m=f[h];if(p.indexOf(h)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const v=Qe("",h);console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${v}' syntax:`,JSON.stringify({root:{[`&.${v}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[h]={}}}};Object.keys(c.components).forEach(f=>{const d=c.components[f].styleOverrides;d&&f.indexOf("Mui")===0&&g(d,f)})}return c.unstable_sxConfig=E({},Po,s==null?void 0:s.unstable_sxConfig),c.unstable_sx=function(g){return Oo({sx:g,theme:this})},c}const xf=yf(),_o=xf,$o="$$material",ia=e=>Un(e)&&e!=="classes",Sf=$d({themeId:$o,defaultTheme:_o,rootShouldForwardProp:ia}),ke=Sf;function $n(){const e=oa(_o);return process.env.NODE_ENV!=="production"&&C.useDebugValue(e),e[$o]||e}function ct({props:e,name:t}){return Id({props:e,name:t,defaultTheme:_o,themeId:$o})}function eo(e,t){return eo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},eo(e,t)}function Cf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,eo(e,t)}const Wi={disabled:!1};var Ef=process.env.NODE_ENV!=="production"?l.oneOfType([l.number,l.shape({enter:l.number,exit:l.number,appear:l.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&l.oneOfType([l.string,l.shape({enter:l.string,exit:l.string,active:l.string}),l.shape({enter:l.string,enterDone:l.string,enterActive:l.string,exit:l.string,exitDone:l.string,exitActive:l.string})]);const sa=N.createContext(null);var Rf=function(t){return t.scrollTop},dn="unmounted",xt="exited",St="entering",Vt="entered",to="exiting",pt=function(e){Cf(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,a=s&&!s.isMounting?r.enter:r.appear,u;return i.appearStatus=null,r.in?a?(u=xt,i.appearStatus=St):u=Vt:r.unmountOnExit||r.mountOnEnter?u=dn:u=xt,i.state={status:u},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===dn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==St&&s!==Vt&&(i=St):(s===St||s===Vt)&&(i=to)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,a;return i=s=a=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,a=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:a}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===St){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);s&&Rf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:dn})},n.performEnter=function(o){var i=this,s=this.props.enter,a=this.context?this.context.isMounting:o,u=this.props.nodeRef?[a]:[un.findDOMNode(this),a],c=u[0],p=u[1],g=this.getTimeouts(),f=a?g.appear:g.enter;if(!o&&!s||Wi.disabled){this.safeSetState({status:Vt},function(){i.props.onEntered(c)});return}this.props.onEnter(c,p),this.safeSetState({status:St},function(){i.props.onEntering(c,p),i.onTransitionEnd(f,function(){i.safeSetState({status:Vt},function(){i.props.onEntered(c,p)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),a=this.props.nodeRef?void 0:un.findDOMNode(this);if(!i||Wi.disabled){this.safeSetState({status:xt},function(){o.props.onExited(a)});return}this.props.onExit(a),this.safeSetState({status:to},function(){o.props.onExiting(a),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(a)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(a){s&&(s=!1,i.nextCallback=null,o(a))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),a=o==null&&!this.props.addEndListener;if(!s||a){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=u[0],p=u[1];this.props.addEndListener(c,p)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===dn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var a=fe(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return N.createElement(sa.Provider,{value:null},typeof s=="function"?s(o,a):N.cloneElement(N.Children.only(s),a))},t}(N.Component);pt.contextType=sa;pt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:l.shape({current:typeof Element>"u"?l.any:function(e,t,n,r,o,i){var s=e[t];return l.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:l.oneOfType([l.func.isRequired,l.element.isRequired]).isRequired,in:l.bool,mountOnEnter:l.bool,unmountOnExit:l.bool,appear:l.bool,enter:l.bool,exit:l.bool,timeout:function(t){var n=Ef;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:l.func,onEnter:l.func,onEntering:l.func,onEntered:l.func,onExit:l.func,onExiting:l.func,onExited:l.func}:{};function Dt(){}pt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Dt,onEntering:Dt,onEntered:Dt,onExit:Dt,onExiting:Dt,onExited:Dt};pt.UNMOUNTED=dn;pt.EXITED=xt;pt.ENTERING=St;pt.ENTERED=Vt;pt.EXITING=to;const aa=pt,la=e=>e.scrollTop;function tr(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Tf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function no(e){return`scale(${e}, ${e**2})`}const Pf={entering:{opacity:1,transform:no(1)},entered:{opacity:1,transform:"none"}},Ir=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Mo=C.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:a,onEnter:u,onEntered:c,onEntering:p,onExit:g,onExited:f,onExiting:d,style:h,timeout:m="auto",TransitionComponent:v=aa}=t,y=fe(t,Tf),O=cn(),x=C.useRef(),S=$n(),w=C.useRef(null),T=Ue(w,i.ref,n),k=B=>M=>{if(B){const z=w.current;M===void 0?B(z):B(z,M)}},D=k(p),F=k((B,M)=>{la(B);const{duration:z,delay:ne,easing:te}=tr({style:h,timeout:m,easing:s},{mode:"enter"});let R;m==="auto"?(R=S.transitions.getAutoHeightDuration(B.clientHeight),x.current=R):R=z,B.style.transition=[S.transitions.create("opacity",{duration:R,delay:ne}),S.transitions.create("transform",{duration:Ir?R:R*.666,delay:ne,easing:te})].join(","),u&&u(B,M)}),V=k(c),P=k(d),I=k(B=>{const{duration:M,delay:z,easing:ne}=tr({style:h,timeout:m,easing:s},{mode:"exit"});let te;m==="auto"?(te=S.transitions.getAutoHeightDuration(B.clientHeight),x.current=te):te=M,B.style.transition=[S.transitions.create("opacity",{duration:te,delay:z}),S.transitions.create("transform",{duration:Ir?te:te*.666,delay:Ir?z:z||te*.333,easing:ne})].join(","),B.style.opacity=0,B.style.transform=no(.75),g&&g(B)}),$=k(f),L=B=>{m==="auto"&&O.start(x.current||0,B),r&&r(w.current,B)};return b.jsx(v,E({appear:o,in:a,nodeRef:w,onEnter:F,onEntered:V,onEntering:D,onExit:I,onExited:$,onExiting:P,addEndListener:L,timeout:m==="auto"?null:m},y,{children:(B,M)=>C.cloneElement(i,E({style:E({opacity:0,transform:no(.75),visibility:B==="exited"&&!a?"hidden":void 0},Pf[B],h,i.props.style),ref:T},M))}))});process.env.NODE_ENV!=="production"&&(Mo.propTypes={addEndListener:l.func,appear:l.bool,children:Tn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});Mo.muiSupportAuto=!0;const ro=Mo,Of=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Xi=Of,kf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Nf=ke(Qs,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ua=C.forwardRef(function(t,n){var r;const o=ra(),i=ct({props:t,name:"MuiPopper"}),{anchorEl:s,component:a,components:u,componentsProps:c,container:p,disablePortal:g,keepMounted:f,modifiers:d,open:h,placement:m,popperOptions:v,popperRef:y,transition:O,slots:x,slotProps:S}=i,w=fe(i,kf),T=(r=x==null?void 0:x.root)!=null?r:u==null?void 0:u.Root,k=E({anchorEl:s,container:p,disablePortal:g,keepMounted:f,modifiers:d,open:h,placement:m,popperOptions:v,popperRef:y,transition:O},w);return b.jsx(Nf,E({as:a,direction:o==null?void 0:o.direction,slots:{root:T},slotProps:S??c},k,{ref:n}))});process.env.NODE_ENV!=="production"&&(ua.propTypes={anchorEl:l.oneOfType([st,l.object,l.func]),children:l.oneOfType([l.node,l.func]),component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disablePortal:l.bool,keepMounted:l.bool,modifiers:l.arrayOf(l.shape({data:l.object,effect:l.func,enabled:l.bool,fn:l.func,name:l.any,options:l.object,phase:l.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:l.arrayOf(l.string),requiresIfExists:l.arrayOf(l.string)})),open:l.bool.isRequired,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:l.shape({modifiers:l.array,onFirstUpdate:l.func,placement:l.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:l.oneOf(["absolute","fixed"])}),popperRef:vo,slotProps:l.shape({root:l.oneOfType([l.func,l.object])}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transition:l.bool});const ca=ua;function _f(e){return Qe("MuiTooltip",e)}const $f=ht("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ft=$f,Mf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function If(e){return Math.round(e*1e5)/1e5}const jf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(i.split("-")[0])}`],arrow:["arrow"]};return ut(s,_f,t)},Af=ke(ca,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>E({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ft.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ft.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ft.arrow}`]:E({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ft.arrow}`]:E({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Df=ke("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>E({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:er(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${If(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ft.popper}[data-popper-placement*="left"] &`]:E({transformOrigin:"right center"},t.isRtl?E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):E({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ft.popper}[data-popper-placement*="right"] &`]:E({transformOrigin:"left center"},t.isRtl?E({marginRight:"14px"},t.touch&&{marginRight:"24px"}):E({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ft.popper}[data-popper-placement*="top"] &`]:E({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ft.popper}[data-popper-placement*="bottom"] &`]:E({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Ff=ke("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:er(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Vn=!1;const Yi=new Pn;let sn={x:0,y:0};function Ln(e,t){return n=>{t&&t(n),e(n)}}const pa=C.forwardRef(function(t,n){var r,o,i,s,a,u,c,p,g,f,d,h,m,v,y,O,x,S,w;const T=ct({props:t,name:"MuiTooltip"}),{arrow:k=!1,children:D,components:F={},componentsProps:V={},describeChild:P=!1,disableFocusListener:I=!1,disableHoverListener:$=!1,disableInteractive:L=!1,disableTouchListener:B=!1,enterDelay:M=100,enterNextDelay:z=0,enterTouchDelay:ne=700,followCursor:te=!1,id:R,leaveDelay:A=0,leaveTouchDelay:G=1500,onClose:Y,onOpen:H,open:U,placement:W="bottom",PopperComponent:X,PopperProps:q={},slotProps:K={},slots:Q={},title:se,TransitionComponent:j=ro,TransitionProps:ee}=T,_=fe(T,Mf),ae=C.isValidElement(D)?D:b.jsx("span",{children:D}),Ce=$n(),Ne=Ce.direction==="rtl",[ye,wt]=C.useState(),[_e,et]=C.useState(null),Ae=C.useRef(!1),tt=L||te,Ee=cn(),_t=cn(),yt=cn(),Kt=cn(),[Mn,qo]=Ns({controlled:U,default:!1,name:"Tooltip",state:"open"});let nt=Mn;if(process.env.NODE_ENV!=="production"){const{current:oe}=C.useRef(U!==void 0);C.useEffect(()=>{ye&&ye.disabled&&!oe&&se!==""&&ye.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[se,ye,oe])}const yr=ks(R),Jt=C.useRef(),In=yn(()=>{Jt.current!==void 0&&(document.body.style.WebkitUserSelect=Jt.current,Jt.current=void 0),Kt.clear()});C.useEffect(()=>In,[In]);const Wo=oe=>{Yi.clear(),Vn=!0,qo(!0),H&&!nt&&H(oe)},jn=yn(oe=>{Yi.start(800+A,()=>{Vn=!1}),qo(!1),Y&&nt&&Y(oe),Ee.start(Ce.transitions.duration.shortest,()=>{Ae.current=!1})}),xr=oe=>{Ae.current&&oe.type!=="touchstart"||(ye&&ye.removeAttribute("title"),_t.clear(),yt.clear(),M||Vn&&z?_t.start(Vn?z:M,()=>{Wo(oe)}):Wo(oe))},Xo=oe=>{_t.clear(),yt.start(A,()=>{jn(oe)})},{isFocusVisibleRef:Yo,onBlur:Qa,onFocus:el,ref:tl}=_s(),[,Ko]=C.useState(!1),Jo=oe=>{Qa(oe),Yo.current===!1&&(Ko(!1),Xo(oe))},Zo=oe=>{ye||wt(oe.currentTarget),el(oe),Yo.current===!0&&(Ko(!0),xr(oe))},Qo=oe=>{Ae.current=!0;const De=ae.props;De.onTouchStart&&De.onTouchStart(oe)},ei=xr,ti=Xo,nl=oe=>{Qo(oe),yt.clear(),Ee.clear(),In(),Jt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Kt.start(ne,()=>{document.body.style.WebkitUserSelect=Jt.current,xr(oe)})},rl=oe=>{ae.props.onTouchEnd&&ae.props.onTouchEnd(oe),In(),yt.start(G,()=>{jn(oe)})};C.useEffect(()=>{if(!nt)return;function oe(De){(De.key==="Escape"||De.key==="Esc")&&jn(De)}return document.addEventListener("keydown",oe),()=>{document.removeEventListener("keydown",oe)}},[jn,nt]);const ol=Ue(ae.ref,tl,wt,n);!se&&se!==0&&(nt=!1);const Sr=C.useRef(),il=oe=>{const De=ae.props;De.onMouseMove&&De.onMouseMove(oe),sn={x:oe.clientX,y:oe.clientY},Sr.current&&Sr.current.update()},Zt={},Cr=typeof se=="string";P?(Zt.title=!nt&&Cr&&!$?se:null,Zt["aria-describedby"]=nt?yr:null):(Zt["aria-label"]=Cr?se:null,Zt["aria-labelledby"]=nt&&!Cr?yr:null);const ze=E({},Zt,_,ae.props,{className:Pe(_.className,ae.props.className),onTouchStart:Qo,ref:ol},te?{onMouseMove:il}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,C.useEffect(()=>{ye&&!ye.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[ye]));const Qt={};B||(ze.onTouchStart=nl,ze.onTouchEnd=rl),$||(ze.onMouseOver=Ln(ei,ze.onMouseOver),ze.onMouseLeave=Ln(ti,ze.onMouseLeave),tt||(Qt.onMouseOver=ei,Qt.onMouseLeave=ti)),I||(ze.onFocus=Ln(Zo,ze.onFocus),ze.onBlur=Ln(Jo,ze.onBlur),tt||(Qt.onFocus=Zo,Qt.onBlur=Jo)),process.env.NODE_ENV!=="production"&&ae.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));const sl=C.useMemo(()=>{var oe;let De=[{name:"arrow",enabled:!!_e,options:{element:_e,padding:4}}];return(oe=q.popperOptions)!=null&&oe.modifiers&&(De=De.concat(q.popperOptions.modifiers)),E({},q.popperOptions,{modifiers:De})},[_e,q]),en=E({},T,{isRtl:Ne,arrow:k,disableInteractive:tt,placement:W,PopperComponentProp:X,touch:Ae.current}),Er=jf(en),ni=(r=(o=Q.popper)!=null?o:F.Popper)!=null?r:Af,ri=(i=(s=(a=Q.transition)!=null?a:F.Transition)!=null?s:j)!=null?i:ro,oi=(u=(c=Q.tooltip)!=null?c:F.Tooltip)!=null?u:Df,ii=(p=(g=Q.arrow)!=null?g:F.Arrow)!=null?p:Ff,al=pn(ni,E({},q,(f=K.popper)!=null?f:V.popper,{className:Pe(Er.popper,q==null?void 0:q.className,(d=(h=K.popper)!=null?h:V.popper)==null?void 0:d.className)}),en),ll=pn(ri,E({},ee,(m=K.transition)!=null?m:V.transition),en),ul=pn(oi,E({},(v=K.tooltip)!=null?v:V.tooltip,{className:Pe(Er.tooltip,(y=(O=K.tooltip)!=null?O:V.tooltip)==null?void 0:y.className)}),en),cl=pn(ii,E({},(x=K.arrow)!=null?x:V.arrow,{className:Pe(Er.arrow,(S=(w=K.arrow)!=null?w:V.arrow)==null?void 0:S.className)}),en);return b.jsxs(C.Fragment,{children:[C.cloneElement(ae,ze),b.jsx(ni,E({as:X??ca,placement:W,anchorEl:te?{getBoundingClientRect:()=>({top:sn.y,left:sn.x,right:sn.x,bottom:sn.y,width:0,height:0})}:ye,popperRef:Sr,open:ye?nt:!1,id:yr,transition:!0},Qt,al,{popperOptions:sl,children:({TransitionProps:oe})=>b.jsx(ri,E({timeout:Ce.transitions.duration.shorter},oe,ll,{children:b.jsxs(oi,E({},ul,{children:[se,k?b.jsx(ii,E({},cl,{ref:et})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(pa.propTypes={arrow:l.bool,children:Tn.isRequired,classes:l.object,className:l.string,components:l.shape({Arrow:l.elementType,Popper:l.elementType,Tooltip:l.elementType,Transition:l.elementType}),componentsProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),describeChild:l.bool,disableFocusListener:l.bool,disableHoverListener:l.bool,disableInteractive:l.bool,disableTouchListener:l.bool,enterDelay:l.number,enterNextDelay:l.number,enterTouchDelay:l.number,followCursor:l.bool,id:l.string,leaveDelay:l.number,leaveTouchDelay:l.number,onClose:l.func,onOpen:l.func,open:l.bool,placement:l.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:l.elementType,PopperProps:l.object,slotProps:l.shape({arrow:l.object,popper:l.object,tooltip:l.object,transition:l.object}),slots:l.shape({arrow:l.elementType,popper:l.elementType,tooltip:l.elementType,transition:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),title:l.node,TransitionComponent:l.elementType,TransitionProps:l.object});const Vf=pa;var Io={},da={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(da);var Lf=da.exports,jr={};function Bf(e){return Qe("MuiSvgIcon",e)}ht("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const zf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Hf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return ut(o,Bf,r)},Gf=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,a,u,c,p,g,f,d,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((a=e.typography)==null||(u=a.pxToRem)==null?void 0:u.call(a,24))||"1.5rem",large:((c=e.typography)==null||(p=c.pxToRem)==null?void 0:p.call(c,35))||"2.1875rem"}[t.fontSize],color:(g=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?g:{action:(d=(e.vars||e).palette)==null||(d=d.action)==null?void 0:d.active,disabled:(h=(e.vars||e).palette)==null||(h=h.action)==null?void 0:h.disabled,inherit:void 0}[t.color]}}),jo=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:a="svg",fontSize:u="medium",htmlColor:c,inheritViewBox:p=!1,titleAccess:g,viewBox:f="0 0 24 24"}=r,d=fe(r,zf),h=C.isValidElement(o)&&o.type==="svg",m=E({},r,{color:s,component:a,fontSize:u,instanceFontSize:t.fontSize,inheritViewBox:p,viewBox:f,hasSvgAsChild:h}),v={};p||(v.viewBox=f);const y=Hf(m);return b.jsxs(Gf,E({as:a,className:Pe(y.root,i),focusable:"false",color:c,"aria-hidden":g?void 0:!0,role:g?"img":void 0,ref:n},v,d,h&&o.props,{ownerState:m,children:[h?o.props.children:o,g?b.jsx("title",{children:g}):null]}))});process.env.NODE_ENV!=="production"&&(jo.propTypes={children:l.node,classes:l.object,className:l.string,color:l.oneOfType([l.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),l.string]),component:l.elementType,fontSize:l.oneOfType([l.oneOf(["inherit","large","medium","small"]),l.string]),htmlColor:l.string,inheritViewBox:l.bool,shapeRendering:l.string,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),titleAccess:l.string,viewBox:l.string});jo.muiName="SvgIcon";const Ki=jo;function fa(e,t){function n(r,o){return b.jsx(Ki,E({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ki.muiName,C.memo(C.forwardRef(n))}const Uf={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ds.configure(e)}},qf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:Yr,createSvgIcon:fa,debounce:Os,deprecatedPropType:bu,isMuiElement:wu,ownerDocument:Oe,ownerWindow:zt,requirePropFactory:yu,setRef:Yn,unstable_ClassNameGenerator:Uf,unstable_useEnhancedEffect:Pt,unstable_useId:ks,unsupportedProp:Cu,useControlled:Ns,useEventCallback:yn,useForkRef:Ue,useIsFocusVisible:_s},Symbol.toStringTag,{value:"Module"})),Wf=Jl(qf);var Ji;function Xf(){return Ji||(Ji=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Wf}(jr)),jr}var Yf=Lf;Object.defineProperty(Io,"__esModule",{value:!0});var ga=Io.default=void 0,Kf=Yf(Xf()),Jf=b;ga=Io.default=(0,Kf.default)((0,Jf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Zi(e,t,n){return e?b.jsx(we.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:b.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Ao(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:a=!1,className:u,isDisabled:c=!1,isDense:p=!0,isSubMenuParent:g=!1,hasDisabledGutters:f=!1,hasDivider:d=!1,focusVisibleClassName:h,id:m,children:v}=e,y=b.jsx(we.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:u,disabled:c,dense:p,disableGutters:f,divider:d,focusVisibleClassName:h,onClick:t,id:m,children:n?b.jsxs(b.Fragment,{children:[Zi(i,n,!0),b.jsx(we.ListItemText,{primary:n,inset:!i&&o}),g?b.jsx(we.ListItemIcon,{className:"papi-menu-icon-trailing",children:b.jsx(ga,{})}):Zi(s,n,!1)]}):v});return r?b.jsx(Vf,{title:r,placement:"right",children:b.jsx("div",{children:y})}):y}function ma(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Zf(e){const[t,n]=N.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=c=>{n(c.currentTarget)},a=()=>{n(void 0)},u=()=>{let c=ma(i).filter(p=>"menuItem"in p.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return c=c.filter(p=>"menuItem"in p.group&&p.group.menuItem===r.id),b.jsx(Do,{...e,includedGroups:c})};return b.jsxs(b.Fragment,{children:[b.jsx(Ao,{onClick:s,...o,isSubMenuParent:!0}),b.jsx(we.Menu,{anchorEl:t,open:!!t,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:u()},r.id)]})}const Qf=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Do(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=N.useMemo(()=>{const p=o&&o.length>0?o:ma(t).filter(h=>!("menuItem"in h.group)),g=Object.values(p).sort((h,m)=>(h.group.order||0)-(m.group.order||0)),f=[];g.forEach(h=>{Qf(h.id,t.items).forEach(m=>f.push({item:m,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const d=f.some(h=>"iconPathBefore"in h.item&&h.item.iconPathBefore);return{items:f,allowForLeadingIcons:d}},[o,t]),a=({item:p,isLastItemInGroup:g})=>({className:"papi-menu-item",label:p.label,tooltip:p.tooltip,iconPathBefore:"iconPathBefore"in p?p.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in p?p.iconPathAfter:void 0,hasDivider:g,allowForLeadingIcons:s}),[u]=i;if(!u)return b.jsx("div",{});const c=u.item.group;return b.jsx("div",{role:"menu","aria-label":c,children:i.map((p,g)=>{const{item:f}=p,d=a(p);if("command"in f){const h=f.group+g;return b.jsx(Ao,{onClick:m=>{n==null||n(m),r(f)},...d},h)}return b.jsx(Zf,{parentMenuItem:f,parentItemProps:d,...e},c+f.id)})},c)}function eg(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,a])=>({id:s,group:a})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),b.jsx(Do,{...e,includedGroups:i})}function tg({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return b.jsxs(we.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[b.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),b.jsx(we.List,{id:n,dense:!0,className:i??"",children:b.jsx(eg,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function ha({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=N.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(a=>{if(a==="isExtensible")return;const u=a,c=o[u];typeof c=="object"&&typeof c.order=="number"&&!Number.isNaN(c.order)?s.set(c.order,{id:u,metadata:c}):console.warn(`Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((a,u)=>(a.metadata.order||0)-(u.metadata.order||0))},[o,r]);return b.jsx(we.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,a)=>b.jsx(tg,{commandHandler:e,menuDefinition:n,...s,className:t},a))})}const va=C.createContext({});process.env.NODE_ENV!=="production"&&(va.displayName="ListContext");const ng=va;function rg(e){return Qe("MuiList",e)}ht("MuiList",["root","padding","dense","subheader"]);const og=["children","className","component","dense","disablePadding","subheader"],ig=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ut({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},rg,t)},sg=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>E({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ba=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:a=!1,disablePadding:u=!1,subheader:c}=r,p=fe(r,og),g=C.useMemo(()=>({dense:a}),[a]),f=E({},r,{component:s,dense:a,disablePadding:u}),d=ig(f);return b.jsx(ng.Provider,{value:g,children:b.jsxs(sg,E({as:s,className:Pe(d.root,i),ref:n,ownerState:f},p,{children:[c,o]}))})});process.env.NODE_ENV!=="production"&&(ba.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,dense:l.bool,disablePadding:l.bool,subheader:l.node,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const ag=ba,lg=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Ar(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Qi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function wa(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function an(e,t,n,r,o,i){let s=!1,a=o(e,t,t?n:!1);for(;a;){if(a===e.firstChild){if(s)return!1;s=!0}const u=r?!1:a.disabled||a.getAttribute("aria-disabled")==="true";if(!a.hasAttribute("tabindex")||!wa(a,i)||u)a=o(e,a,n);else return a.focus(),!0}return!1}const ya=C.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:a,disabledItemsFocusable:u=!1,disableListWrap:c=!1,onKeyDown:p,variant:g="selectedMenu"}=t,f=fe(t,lg),d=C.useRef(null),h=C.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pt(()=>{o&&d.current.focus()},[o]),C.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,S)=>{const w=!d.current.style.width;if(x.clientHeight<d.current.clientHeight&&w){const T=`${$s(Oe(x))}px`;d.current.style[S.direction==="rtl"?"paddingLeft":"paddingRight"]=T,d.current.style.width=`calc(100% + ${T})`}return d.current}}),[]);const m=x=>{const S=d.current,w=x.key,T=Oe(S).activeElement;if(w==="ArrowDown")x.preventDefault(),an(S,T,c,u,Ar);else if(w==="ArrowUp")x.preventDefault(),an(S,T,c,u,Qi);else if(w==="Home")x.preventDefault(),an(S,null,c,u,Ar);else if(w==="End")x.preventDefault(),an(S,null,c,u,Qi);else if(w.length===1){const k=h.current,D=w.toLowerCase(),F=performance.now();k.keys.length>0&&(F-k.lastTime>500?(k.keys=[],k.repeating=!0,k.previousKeyMatched=!0):k.repeating&&D!==k.keys[0]&&(k.repeating=!1)),k.lastTime=F,k.keys.push(D);const V=T&&!k.repeating&&wa(T,k);k.previousKeyMatched&&(V||an(S,T,!1,u,Ar,k))?x.preventDefault():k.previousKeyMatched=!1}p&&p(x)},v=Ue(d,n);let y=-1;C.Children.forEach(s,(x,S)=>{if(!C.isValidElement(x)){y===S&&(y+=1,y>=s.length&&(y=-1));return}process.env.NODE_ENV!=="production"&&Xn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(g==="selectedMenu"&&x.props.selected||y===-1)&&(y=S),y===S&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(y+=1,y>=s.length&&(y=-1))});const O=C.Children.map(s,(x,S)=>{if(S===y){const w={};return i&&(w.autoFocus=!0),x.props.tabIndex===void 0&&g==="selectedMenu"&&(w.tabIndex=0),C.cloneElement(x,w)}return x});return b.jsx(ag,E({role:"menu",ref:v,className:a,onKeyDown:m,tabIndex:o?0:-1},f,{children:O}))});process.env.NODE_ENV!=="production"&&(ya.propTypes={autoFocus:l.bool,autoFocusItem:l.bool,children:l.node,className:l.string,disabledItemsFocusable:l.bool,disableListWrap:l.bool,onKeyDown:l.func,variant:l.oneOf(["menu","selectedMenu"])});const ug=ya,cg=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],pg={entering:{opacity:1},entered:{opacity:1}},xa=C.forwardRef(function(t,n){const r=$n(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:a,easing:u,in:c,onEnter:p,onEntered:g,onEntering:f,onExit:d,onExited:h,onExiting:m,style:v,timeout:y=o,TransitionComponent:O=aa}=t,x=fe(t,cg),S=C.useRef(null),w=Ue(S,a.ref,n),T=L=>B=>{if(L){const M=S.current;B===void 0?L(M):L(M,B)}},k=T(f),D=T((L,B)=>{la(L);const M=tr({style:v,timeout:y,easing:u},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",M),L.style.transition=r.transitions.create("opacity",M),p&&p(L,B)}),F=T(g),V=T(m),P=T(L=>{const B=tr({style:v,timeout:y,easing:u},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",B),L.style.transition=r.transitions.create("opacity",B),d&&d(L)}),I=T(h),$=L=>{i&&i(S.current,L)};return b.jsx(O,E({appear:s,in:c,nodeRef:S,onEnter:D,onEntered:F,onEntering:k,onExit:P,onExited:I,onExiting:V,addEndListener:$,timeout:y},x,{children:(L,B)=>C.cloneElement(a,E({style:E({opacity:0,visibility:L==="exited"&&!c?"hidden":void 0},pg[L],v,a.props.style),ref:w},B))}))});process.env.NODE_ENV!=="production"&&(xa.propTypes={addEndListener:l.func,appear:l.bool,children:Tn.isRequired,easing:l.oneOfType([l.shape({enter:l.string,exit:l.string}),l.string]),in:l.bool,onEnter:l.func,onEntered:l.func,onEntering:l.func,onExit:l.func,onExited:l.func,onExiting:l.func,style:l.object,timeout:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const dg=xa;function fg(e){return Qe("MuiBackdrop",e)}ht("MuiBackdrop",["root","invisible"]);const gg=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],mg=e=>{const{classes:t,invisible:n}=e;return ut({root:["root",n&&"invisible"]},fg,t)},hg=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>E({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Sa=C.forwardRef(function(t,n){var r,o,i;const s=ct({props:t,name:"MuiBackdrop"}),{children:a,className:u,component:c="div",components:p={},componentsProps:g={},invisible:f=!1,open:d,slotProps:h={},slots:m={},TransitionComponent:v=dg,transitionDuration:y}=s,O=fe(s,gg),x=E({},s,{component:c,invisible:f}),S=mg(x),w=(r=h.root)!=null?r:g.root;return b.jsx(v,E({in:d,timeout:y},O,{children:b.jsx(hg,E({"aria-hidden":!0},w,{as:(o=(i=m.root)!=null?i:p.Root)!=null?o:c,className:Pe(S.root,u,w==null?void 0:w.className),ownerState:E({},x,w==null?void 0:w.ownerState),classes:S,ref:n,children:a}))}))});process.env.NODE_ENV!=="production"&&(Sa.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,components:l.shape({Root:l.elementType}),componentsProps:l.shape({root:l.object}),invisible:l.bool,open:l.bool.isRequired,slotProps:l.shape({root:l.object}),slots:l.shape({root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})])});const vg=Sa;function bg(e){return Qe("MuiModal",e)}ht("MuiModal",["root","hidden","backdrop"]);const wg=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],yg=e=>{const{open:t,exited:n,classes:r}=e;return ut({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},bg,r)},xg=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>E({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Sg=ke(vg,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ca=C.forwardRef(function(t,n){var r,o,i,s,a,u;const c=ct({name:"MuiModal",props:t}),{BackdropComponent:p=Sg,BackdropProps:g,className:f,closeAfterTransition:d=!1,children:h,container:m,component:v,components:y={},componentsProps:O={},disableAutoFocus:x=!1,disableEnforceFocus:S=!1,disableEscapeKeyDown:w=!1,disablePortal:T=!1,disableRestoreFocus:k=!1,disableScrollLock:D=!1,hideBackdrop:F=!1,keepMounted:V=!1,onBackdropClick:P,open:I,slotProps:$,slots:L}=c,B=fe(c,wg),M=E({},c,{closeAfterTransition:d,disableAutoFocus:x,disableEnforceFocus:S,disableEscapeKeyDown:w,disablePortal:T,disableRestoreFocus:k,disableScrollLock:D,hideBackdrop:F,keepMounted:V}),{getRootProps:z,getBackdropProps:ne,getTransitionProps:te,portalRef:R,isTopModal:A,exited:G,hasTransition:Y}=cc(E({},M,{rootRef:n})),H=E({},M,{exited:G}),U=yg(H),W={};if(h.props.tabIndex===void 0&&(W.tabIndex="-1"),Y){const{onEnter:ee,onExited:_}=te();W.onEnter=ee,W.onExited=_}const X=(r=(o=L==null?void 0:L.root)!=null?o:y.Root)!=null?r:xg,q=(i=(s=L==null?void 0:L.backdrop)!=null?s:y.Backdrop)!=null?i:p,K=(a=$==null?void 0:$.root)!=null?a:O.root,Q=(u=$==null?void 0:$.backdrop)!=null?u:O.backdrop,se=Ot({elementType:X,externalSlotProps:K,externalForwardedProps:B,getSlotProps:z,additionalProps:{ref:n,as:v},ownerState:H,className:Pe(f,K==null?void 0:K.className,U==null?void 0:U.root,!H.open&&H.exited&&(U==null?void 0:U.hidden))}),j=Ot({elementType:q,externalSlotProps:Q,additionalProps:g,getSlotProps:ee=>ne(E({},ee,{onClick:_=>{P&&P(_),ee!=null&&ee.onClick&&ee.onClick(_)}})),className:Pe(Q==null?void 0:Q.className,g==null?void 0:g.className,U==null?void 0:U.backdrop),ownerState:H});return!V&&!I&&(!Y||G)?null:b.jsx(xn,{ref:R,container:m,disablePortal:T,children:b.jsxs(X,E({},se,{children:[!F&&p?b.jsx(q,E({},j)):null,b.jsx(Kn,{disableEnforceFocus:S,disableAutoFocus:x,disableRestoreFocus:k,isEnabled:A,open:I,children:C.cloneElement(h,W)})]}))})});process.env.NODE_ENV!=="production"&&(Ca.propTypes={BackdropComponent:l.elementType,BackdropProps:l.object,children:Tn.isRequired,classes:l.object,className:l.string,closeAfterTransition:l.bool,component:l.elementType,components:l.shape({Backdrop:l.elementType,Root:l.elementType}),componentsProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),container:l.oneOfType([st,l.func]),disableAutoFocus:l.bool,disableEnforceFocus:l.bool,disableEscapeKeyDown:l.bool,disablePortal:l.bool,disableRestoreFocus:l.bool,disableScrollLock:l.bool,hideBackdrop:l.bool,keepMounted:l.bool,onBackdropClick:l.func,onClose:l.func,onTransitionEnter:l.func,onTransitionExited:l.func,open:l.bool.isRequired,slotProps:l.shape({backdrop:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({backdrop:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object])});const Cg=Ca;function Eg(e){return Qe("MuiPaper",e)}ht("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Rg=["className","component","elevation","square","variant"],Tg=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ut(i,Eg,o)},Pg=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return E({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&E({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${er("#fff",Xi(t.elevation))}, ${er("#fff",Xi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Ea=C.forwardRef(function(t,n){const r=ct({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:a=!1,variant:u="elevation"}=r,c=fe(r,Rg),p=E({},r,{component:i,elevation:s,square:a,variant:u}),g=Tg(p);return process.env.NODE_ENV!=="production"&&$n().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),b.jsx(Pg,E({as:i,ownerState:p,className:Pe(g.root,o),ref:n},c))});process.env.NODE_ENV!=="production"&&(Ea.propTypes={children:l.node,classes:l.object,className:l.string,component:l.elementType,elevation:Yt(js,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:l.bool,sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),variant:l.oneOfType([l.oneOf(["elevation","outlined"]),l.string])});const Og=Ea;function kg(e){return Qe("MuiPopover",e)}ht("MuiPopover",["root","paper"]);const Ng=["onEntering"],_g=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],$g=["slotProps"];function es(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ts(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ns(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Wn(e){return typeof e=="function"?e():e}const Mg=e=>{const{classes:t}=e;return ut({root:["root"],paper:["paper"]},kg,t)},Ig=ke(Cg,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ra=ke(Og,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ta=C.forwardRef(function(t,n){var r,o,i;const s=ct({props:t,name:"MuiPopover"}),{action:a,anchorEl:u,anchorOrigin:c={vertical:"top",horizontal:"left"},anchorPosition:p,anchorReference:g="anchorEl",children:f,className:d,container:h,elevation:m=8,marginThreshold:v=16,open:y,PaperProps:O={},slots:x,slotProps:S,transformOrigin:w={vertical:"top",horizontal:"left"},TransitionComponent:T=ro,transitionDuration:k="auto",TransitionProps:{onEntering:D}={},disableScrollLock:F=!1}=s,V=fe(s.TransitionProps,Ng),P=fe(s,_g),I=(r=S==null?void 0:S.paper)!=null?r:O,$=C.useRef(),L=Ue($,I.ref),B=E({},s,{anchorOrigin:c,anchorReference:g,elevation:m,marginThreshold:v,externalPaperSlotProps:I,transformOrigin:w,TransitionComponent:T,transitionDuration:k,TransitionProps:V}),M=Mg(B),z=C.useCallback(()=>{if(g==="anchorPosition")return process.env.NODE_ENV!=="production"&&(p||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),p;const ee=Wn(u),_=ee&&ee.nodeType===1?ee:Oe($.current).body,ae=_.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const Ce=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Ce.top===0&&Ce.left===0&&Ce.right===0&&Ce.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ae.top+es(ae,c.vertical),left:ae.left+ts(ae,c.horizontal)}},[u,c.horizontal,c.vertical,p,g]),ne=C.useCallback(ee=>({vertical:es(ee,w.vertical),horizontal:ts(ee,w.horizontal)}),[w.horizontal,w.vertical]),te=C.useCallback(ee=>{const _={width:ee.offsetWidth,height:ee.offsetHeight},ae=ne(_);if(g==="none")return{top:null,left:null,transformOrigin:ns(ae)};const Ce=z();let Ne=Ce.top-ae.vertical,ye=Ce.left-ae.horizontal;const wt=Ne+_.height,_e=ye+_.width,et=zt(Wn(u)),Ae=et.innerHeight-v,tt=et.innerWidth-v;if(v!==null&&Ne<v){const Ee=Ne-v;Ne-=Ee,ae.vertical+=Ee}else if(v!==null&&wt>Ae){const Ee=wt-Ae;Ne-=Ee,ae.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&_.height>Ae&&_.height&&Ae&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${_.height-Ae}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),v!==null&&ye<v){const Ee=ye-v;ye-=Ee,ae.horizontal+=Ee}else if(_e>tt){const Ee=_e-tt;ye-=Ee,ae.horizontal+=Ee}return{top:`${Math.round(Ne)}px`,left:`${Math.round(ye)}px`,transformOrigin:ns(ae)}},[u,g,z,ne,v]),[R,A]=C.useState(y),G=C.useCallback(()=>{const ee=$.current;if(!ee)return;const _=te(ee);_.top!==null&&(ee.style.top=_.top),_.left!==null&&(ee.style.left=_.left),ee.style.transformOrigin=_.transformOrigin,A(!0)},[te]);C.useEffect(()=>(F&&window.addEventListener("scroll",G),()=>window.removeEventListener("scroll",G)),[u,F,G]);const Y=(ee,_)=>{D&&D(ee,_),G()},H=()=>{A(!1)};C.useEffect(()=>{y&&G()}),C.useImperativeHandle(a,()=>y?{updatePosition:()=>{G()}}:null,[y,G]),C.useEffect(()=>{if(!y)return;const ee=Os(()=>{G()}),_=zt(u);return _.addEventListener("resize",ee),()=>{ee.clear(),_.removeEventListener("resize",ee)}},[u,y,G]);let U=k;k==="auto"&&!T.muiSupportAuto&&(U=void 0);const W=h||(u?Oe(Wn(u)).body:void 0),X=(o=x==null?void 0:x.root)!=null?o:Ig,q=(i=x==null?void 0:x.paper)!=null?i:Ra,K=Ot({elementType:q,externalSlotProps:E({},I,{style:R?I.style:E({},I.style,{opacity:0})}),additionalProps:{elevation:m,ref:L},ownerState:B,className:Pe(M.paper,I==null?void 0:I.className)}),Q=Ot({elementType:X,externalSlotProps:(S==null?void 0:S.root)||{},externalForwardedProps:P,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:W,open:y},ownerState:B,className:Pe(M.root,d)}),{slotProps:se}=Q,j=fe(Q,$g);return b.jsx(X,E({},j,!Vs(X)&&{slotProps:se,disableScrollLock:F},{children:b.jsx(T,E({appear:!0,in:y,onEntering:Y,onExited:H,timeout:U},V,{children:b.jsx(q,E({},K,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(Ta.propTypes={action:vo,anchorEl:Yt(l.oneOfType([st,l.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Wn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),anchorPosition:l.shape({left:l.number.isRequired,top:l.number.isRequired}),anchorReference:l.oneOf(["anchorEl","anchorPosition","none"]),children:l.node,classes:l.object,className:l.string,container:l.oneOfType([st,l.func]),disableScrollLock:l.bool,elevation:js,marginThreshold:l.number,onClose:l.func,open:l.bool.isRequired,PaperProps:l.shape({component:cu}),slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transformOrigin:l.shape({horizontal:l.oneOfType([l.oneOf(["center","left","right"]),l.number]).isRequired,vertical:l.oneOfType([l.oneOf(["bottom","center","top"]),l.number]).isRequired}),TransitionComponent:l.elementType,transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object});const jg=Ta;function Ag(e){return Qe("MuiMenu",e)}ht("MuiMenu",["root","paper","list"]);const Dg=["onEntering"],Fg=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Vg={vertical:"top",horizontal:"right"},Lg={vertical:"top",horizontal:"left"},Bg=e=>{const{classes:t}=e;return ut({root:["root"],paper:["paper"],list:["list"]},Ag,t)},zg=ke(jg,{shouldForwardProp:e=>ia(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Hg=ke(Ra,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Gg=ke(ug,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Pa=C.forwardRef(function(t,n){var r,o;const i=ct({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:a,className:u,disableAutoFocusItem:c=!1,MenuListProps:p={},onClose:g,open:f,PaperProps:d={},PopoverClasses:h,transitionDuration:m="auto",TransitionProps:{onEntering:v}={},variant:y="selectedMenu",slots:O={},slotProps:x={}}=i,S=fe(i.TransitionProps,Dg),w=fe(i,Fg),T=$n(),k=T.direction==="rtl",D=E({},i,{autoFocus:s,disableAutoFocusItem:c,MenuListProps:p,onEntering:v,PaperProps:d,transitionDuration:m,TransitionProps:S,variant:y}),F=Bg(D),V=s&&!c&&f,P=C.useRef(null),I=(te,R)=>{P.current&&P.current.adjustStyleForScrollbar(te,T),v&&v(te,R)},$=te=>{te.key==="Tab"&&(te.preventDefault(),g&&g(te,"tabKeyDown"))};let L=-1;C.Children.map(a,(te,R)=>{C.isValidElement(te)&&(process.env.NODE_ENV!=="production"&&Xn.isFragment(te)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),te.props.disabled||(y==="selectedMenu"&&te.props.selected||L===-1)&&(L=R))});const B=(r=O.paper)!=null?r:Hg,M=(o=x.paper)!=null?o:d,z=Ot({elementType:O.root,externalSlotProps:x.root,ownerState:D,className:[F.root,u]}),ne=Ot({elementType:B,externalSlotProps:M,ownerState:D,className:F.paper});return b.jsx(zg,E({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:k?"right":"left"},transformOrigin:k?Vg:Lg,slots:{paper:B,root:O.root},slotProps:{root:z,paper:ne},open:f,ref:n,transitionDuration:m,TransitionProps:E({onEntering:I},S),ownerState:D},w,{classes:h,children:b.jsx(Gg,E({onKeyDown:$,actions:P,autoFocus:s&&(L===-1||c),autoFocusItem:V,variant:y},p,{className:Pe(F.list,p.className),children:a}))}))});process.env.NODE_ENV!=="production"&&(Pa.propTypes={anchorEl:l.oneOfType([st,l.func]),autoFocus:l.bool,children:l.node,classes:l.object,className:l.string,disableAutoFocusItem:l.bool,MenuListProps:l.object,onClose:l.func,open:l.bool.isRequired,PaperProps:l.object,PopoverClasses:l.object,slotProps:l.shape({paper:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object])}),slots:l.shape({paper:l.elementType,root:l.elementType}),sx:l.oneOfType([l.arrayOf(l.oneOfType([l.func,l.object,l.bool])),l.func,l.object]),transitionDuration:l.oneOfType([l.oneOf(["auto"]),l.number,l.shape({appear:l.number,enter:l.number,exit:l.number})]),TransitionProps:l.object,variant:l.oneOf(["menu","selectedMenu"])});const Ug=Pa;function qg({className:e,commandHandler:t,menuDefinition:n,children:r}){var c;const[o,i]=N.useState(void 0),s=N.useCallback(p=>{p.preventDefault(),i(o===void 0?{mouseX:p.clientX+2,mouseY:p.clientY-6}:void 0)},[o]),a=N.useCallback(()=>{i(void 0)},[]),u=N.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((c=n==null?void 0:n.items)==null?void 0:c.length)??0)===0||!r?r:b.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,b.jsx(Ug,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:a,anchorReference:"anchorPosition",anchorPosition:u,children:b.jsx(Do,{menuDefinition:n,commandHandler:t,onClick:a})})]})}const Wg=fa(b.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Xg(e){return{preserveValue:!0,...e}}const nr=(e,t,n={})=>{const r=N.useRef(t);r.current=t;const o=N.useRef(n);o.current=Xg(o.current);const[i,s]=N.useState(()=>r.current),[a,u]=N.useState(!0);return N.useEffect(()=>{let c=!0;return u(!!e),(async()=>{if(e){const p=await e();c&&(s(()=>p),u(!1))}})(),()=>{c=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,a]};function Oa({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:a}){const[u,c]=N.useState(!1),[p,g]=N.useState(!1),f=N.useCallback(()=>{u&&c(!1),g(!1)},[u]),d=N.useCallback(S=>{S.stopPropagation(),c(w=>{const T=!w;return T&&S.shiftKey?g(!0):T||g(!1),T})},[]),h=N.useCallback(S=>(f(),r(S)),[r,f]),[m,v]=N.useState({top:1,left:1});N.useEffect(()=>{if(u){const S=o==null?void 0:o.current;if(S){const w=S.getBoundingClientRect(),T=window.scrollY,k=window.scrollX,D=w.top+T+S.clientHeight,F=w.left+k;v({top:D,left:F})}}},[u,o]);const[y]=nr(N.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,u]),t),[O]=nr(N.useCallback(async()=>(e==null?void 0:e(!0))??n??y,[e,n,y,u]),n??y),x=p&&O?O:y;return b.jsxs(b.Fragment,{children:[b.jsx(we.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:d,children:a??b.jsx(Wg,{})}),b.jsx(we.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:u,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:x?b.jsx(ha,{className:i,id:`${s??""} main menu`,commandHandler:h,multiColumnMenu:x}):void 0})]})}function Yg({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:a,onClick:u,children:c}){return b.jsx(we.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${a??""}`,onClick:u,children:c})}const Kg=as.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),ka=N.forwardRef(({className:e,...t},n)=>b.jsx(ls.Root,{ref:n,className:re(Kg(),e),...t}));ka.displayName=ls.Root.displayName;function Na({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:a=!1,className:u,defaultValue:c,value:p,onChange:g,onFocus:f,onBlur:d}){return b.jsxs("div",{className:re("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[b.jsx(ka,{htmlFor:e,className:re({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${a?"*":""}`}),b.jsx(sr,{id:e,disabled:t,placeholder:s,required:a,className:re(u,{"pr-border-red-600":n}),defaultValue:c,value:p,onChange:g,onFocus:f,onBlur:d}),b.jsx("p",{className:re({"pr-hidden":!o}),children:o})]})}function Jg({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=N.useState(""),i=s=>{o(s),e(s)};return b.jsx(Na,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function Zg({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:a,value:u,valueLabelDisplay:c="off",className:p,onChange:g,onChangeCommitted:f}){return b.jsx(we.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:a,value:u,valueLabelDisplay:c,className:`papi-slider ${n} ${p??""}`,onChange:g,onChangeCommitted:f})}function Qg({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:a}){const u={action:(s==null?void 0:s.action)||a,message:s==null?void 0:s.message,className:r};return b.jsx(we.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:u})}function em({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return b.jsx(we.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function gt(e,t){return typeof e=="function"?e(t):e}function Be(e,t){return n=>{t.setState(r=>({...r,[e]:gt(n,r[e])}))}}function wr(e){return e instanceof Function}function tm(e){return Array.isArray(e)&&e.every(t=>typeof t=="number")}function nm(e,t){const n=[],r=o=>{o.forEach(i=>{n.push(i);const s=t(i);s!=null&&s.length&&r(s)})};return r(e),n}function J(e,t,n){let r=[],o;return i=>{let s;n.key&&n.debug&&(s=Date.now());const a=e(i);if(!(a.length!==r.length||a.some((p,g)=>r[g]!==p)))return o;r=a;let c;if(n.key&&n.debug&&(c=Date.now()),o=t(...a),n==null||n.onChange==null||n.onChange(o),n.key&&n.debug&&n!=null&&n.debug()){const p=Math.round((Date.now()-s)*100)/100,g=Math.round((Date.now()-c)*100)/100,f=g/16,d=(h,m)=>{for(h=String(h);h.length<m;)h=" "+h;return h};console.info(`%c⏱ ${d(g,5)} /${d(p,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*f,120))}deg 100% 31%);`,n==null?void 0:n.key)}return o}}function Z(e,t,n,r){return{debug:()=>{var o;return(o=e==null?void 0:e.debugAll)!=null?o:e[t]},key:process.env.NODE_ENV==="development"&&n,onChange:r}}function rm(e,t,n,r){const o=()=>{var s;return(s=i.getValue())!=null?s:e.options.renderFallbackValue},i={id:`${t.id}_${n.id}`,row:t,column:n,getValue:()=>t.getValue(r),renderValue:o,getContext:J(()=>[e,n,t,i],(s,a,u,c)=>({table:s,column:a,row:u,cell:c,getValue:c.getValue,renderValue:c.renderValue}),Z(e.options,"debugCells","cell.getContext"))};return e._features.forEach(s=>{s.createCell==null||s.createCell(i,n,t,e)},{}),i}function om(e,t,n,r){var o,i;const a={...e._getDefaultColumnDef(),...t},u=a.accessorKey;let c=(o=(i=a.id)!=null?i:u?u.replace(".","_"):void 0)!=null?o:typeof a.header=="string"?a.header:void 0,p;if(a.accessorFn?p=a.accessorFn:u&&(u.includes(".")?p=f=>{let d=f;for(const m of u.split(".")){var h;d=(h=d)==null?void 0:h[m],process.env.NODE_ENV!=="production"&&d===void 0&&console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`)}return d}:p=f=>f[a.accessorKey]),!c)throw process.env.NODE_ENV!=="production"?new Error(a.accessorFn?"Columns require an id when using an accessorFn":"Columns require an id when using a non-string header"):new Error;let g={id:`${String(c)}`,accessorFn:p,parent:r,depth:n,columnDef:a,columns:[],getFlatColumns:J(()=>[!0],()=>{var f;return[g,...(f=g.columns)==null?void 0:f.flatMap(d=>d.getFlatColumns())]},Z(e.options,"debugColumns","column.getFlatColumns")),getLeafColumns:J(()=>[e._getOrderColumnsFn()],f=>{var d;if((d=g.columns)!=null&&d.length){let h=g.columns.flatMap(m=>m.getLeafColumns());return f(h)}return[g]},Z(e.options,"debugColumns","column.getLeafColumns"))};for(const f of e._features)f.createColumn==null||f.createColumn(g,e);return g}const Re="debugHeaders";function rs(e,t,n){var r;let i={id:(r=n.id)!=null?r:t.id,column:t,index:n.index,isPlaceholder:!!n.isPlaceholder,placeholderId:n.placeholderId,depth:n.depth,subHeaders:[],colSpan:0,rowSpan:0,headerGroup:null,getLeafHeaders:()=>{const s=[],a=u=>{u.subHeaders&&u.subHeaders.length&&u.subHeaders.map(a),s.push(u)};return a(i),s},getContext:()=>({table:e,header:i,column:t})};return e._features.forEach(s=>{s.createHeader==null||s.createHeader(i,e)}),i}const im={createTable:e=>{e.getHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>{var i,s;const a=(i=r==null?void 0:r.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?i:[],u=(s=o==null?void 0:o.map(g=>n.find(f=>f.id===g)).filter(Boolean))!=null?s:[],c=n.filter(g=>!(r!=null&&r.includes(g.id))&&!(o!=null&&o.includes(g.id)));return Bn(t,[...a,...c,...u],e)},Z(e.options,Re,"getHeaderGroups")),e.getCenterHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r,o)=>(n=n.filter(i=>!(r!=null&&r.includes(i.id))&&!(o!=null&&o.includes(i.id))),Bn(t,n,e,"center")),Z(e.options,Re,"getCenterHeaderGroups")),e.getLeftHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.left],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Bn(t,i,e,"left")},Z(e.options,Re,"getLeftHeaderGroups")),e.getRightHeaderGroups=J(()=>[e.getAllColumns(),e.getVisibleLeafColumns(),e.getState().columnPinning.right],(t,n,r)=>{var o;const i=(o=r==null?void 0:r.map(s=>n.find(a=>a.id===s)).filter(Boolean))!=null?o:[];return Bn(t,i,e,"right")},Z(e.options,Re,"getRightHeaderGroups")),e.getFooterGroups=J(()=>[e.getHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getFooterGroups")),e.getLeftFooterGroups=J(()=>[e.getLeftHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getLeftFooterGroups")),e.getCenterFooterGroups=J(()=>[e.getCenterHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getCenterFooterGroups")),e.getRightFooterGroups=J(()=>[e.getRightHeaderGroups()],t=>[...t].reverse(),Z(e.options,Re,"getRightFooterGroups")),e.getFlatHeaders=J(()=>[e.getHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getFlatHeaders")),e.getLeftFlatHeaders=J(()=>[e.getLeftHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getLeftFlatHeaders")),e.getCenterFlatHeaders=J(()=>[e.getCenterHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getCenterFlatHeaders")),e.getRightFlatHeaders=J(()=>[e.getRightHeaderGroups()],t=>t.map(n=>n.headers).flat(),Z(e.options,Re,"getRightFlatHeaders")),e.getCenterLeafHeaders=J(()=>[e.getCenterFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getCenterLeafHeaders")),e.getLeftLeafHeaders=J(()=>[e.getLeftFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getLeftLeafHeaders")),e.getRightLeafHeaders=J(()=>[e.getRightFlatHeaders()],t=>t.filter(n=>{var r;return!((r=n.subHeaders)!=null&&r.length)}),Z(e.options,Re,"getRightLeafHeaders")),e.getLeafHeaders=J(()=>[e.getLeftHeaderGroups(),e.getCenterHeaderGroups(),e.getRightHeaderGroups()],(t,n,r)=>{var o,i,s,a,u,c;return[...(o=(i=t[0])==null?void 0:i.headers)!=null?o:[],...(s=(a=n[0])==null?void 0:a.headers)!=null?s:[],...(u=(c=r[0])==null?void 0:c.headers)!=null?u:[]].map(p=>p.getLeafHeaders()).flat()},Z(e.options,Re,"getLeafHeaders"))}};function Bn(e,t,n,r){var o,i;let s=0;const a=function(f,d){d===void 0&&(d=1),s=Math.max(s,d),f.filter(h=>h.getIsVisible()).forEach(h=>{var m;(m=h.columns)!=null&&m.length&&a(h.columns,d+1)},0)};a(e);let u=[];const c=(f,d)=>{const h={depth:d,id:[r,`${d}`].filter(Boolean).join("_"),headers:[]},m=[];f.forEach(v=>{const y=[...m].reverse()[0],O=v.column.depth===h.depth;let x,S=!1;if(O&&v.column.parent?x=v.column.parent:(x=v.column,S=!0),y&&(y==null?void 0:y.column)===x)y.subHeaders.push(v);else{const w=rs(n,x,{id:[r,d,x.id,v==null?void 0:v.id].filter(Boolean).join("_"),isPlaceholder:S,placeholderId:S?`${m.filter(T=>T.column===x).length}`:void 0,depth:d,index:m.length});w.subHeaders.push(v),m.push(w)}h.headers.push(v),v.headerGroup=h}),u.push(h),d>0&&c(m,d-1)},p=t.map((f,d)=>rs(n,f,{depth:s,index:d}));c(p,s-1),u.reverse();const g=f=>f.filter(h=>h.column.getIsVisible()).map(h=>{let m=0,v=0,y=[0];h.subHeaders&&h.subHeaders.length?(y=[],g(h.subHeaders).forEach(x=>{let{colSpan:S,rowSpan:w}=x;m+=S,y.push(w)})):m=1;const O=Math.min(...y);return v=v+O,h.colSpan=m,h.rowSpan=v,{colSpan:m,rowSpan:v}});return g((o=(i=u[0])==null?void 0:i.headers)!=null?o:[]),u}const Fo=(e,t,n,r,o,i,s)=>{let a={id:t,index:r,original:n,depth:o,parentId:s,_valuesCache:{},_uniqueValuesCache:{},getValue:u=>{if(a._valuesCache.hasOwnProperty(u))return a._valuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return a._valuesCache[u]=c.accessorFn(a.original,r),a._valuesCache[u]},getUniqueValues:u=>{if(a._uniqueValuesCache.hasOwnProperty(u))return a._uniqueValuesCache[u];const c=e.getColumn(u);if(c!=null&&c.accessorFn)return c.columnDef.getUniqueValues?(a._uniqueValuesCache[u]=c.columnDef.getUniqueValues(a.original,r),a._uniqueValuesCache[u]):(a._uniqueValuesCache[u]=[a.getValue(u)],a._uniqueValuesCache[u])},renderValue:u=>{var c;return(c=a.getValue(u))!=null?c:e.options.renderFallbackValue},subRows:i??[],getLeafRows:()=>nm(a.subRows,u=>u.subRows),getParentRow:()=>a.parentId?e.getRow(a.parentId,!0):void 0,getParentRows:()=>{let u=[],c=a;for(;;){const p=c.getParentRow();if(!p)break;u.push(p),c=p}return u.reverse()},getAllCells:J(()=>[e.getAllLeafColumns()],u=>u.map(c=>rm(e,a,c,c.id)),Z(e.options,"debugRows","getAllCells")),_getAllCellsByColumnId:J(()=>[a.getAllCells()],u=>u.reduce((c,p)=>(c[p.column.id]=p,c),{}),Z(e.options,"debugRows","getAllCellsByColumnId"))};for(let u=0;u<e._features.length;u++){const c=e._features[u];c==null||c.createRow==null||c.createRow(a,e)}return a},sm={createColumn:(e,t)=>{e._getFacetedRowModel=t.options.getFacetedRowModel&&t.options.getFacetedRowModel(t,e.id),e.getFacetedRowModel=()=>e._getFacetedRowModel?e._getFacetedRowModel():t.getPreFilteredRowModel(),e._getFacetedUniqueValues=t.options.getFacetedUniqueValues&&t.options.getFacetedUniqueValues(t,e.id),e.getFacetedUniqueValues=()=>e._getFacetedUniqueValues?e._getFacetedUniqueValues():new Map,e._getFacetedMinMaxValues=t.options.getFacetedMinMaxValues&&t.options.getFacetedMinMaxValues(t,e.id),e.getFacetedMinMaxValues=()=>{if(e._getFacetedMinMaxValues)return e._getFacetedMinMaxValues()}}},_a=(e,t,n)=>{var r;const o=n.toLowerCase();return!!(!((r=e.getValue(t))==null||(r=r.toString())==null||(r=r.toLowerCase())==null)&&r.includes(o))};_a.autoRemove=e=>Ye(e);const $a=(e,t,n)=>{var r;return!!(!((r=e.getValue(t))==null||(r=r.toString())==null)&&r.includes(n))};$a.autoRemove=e=>Ye(e);const Ma=(e,t,n)=>{var r;return((r=e.getValue(t))==null||(r=r.toString())==null?void 0:r.toLowerCase())===(n==null?void 0:n.toLowerCase())};Ma.autoRemove=e=>Ye(e);const Ia=(e,t,n)=>{var r;return(r=e.getValue(t))==null?void 0:r.includes(n)};Ia.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const ja=(e,t,n)=>!n.some(r=>{var o;return!((o=e.getValue(t))!=null&&o.includes(r))});ja.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const Aa=(e,t,n)=>n.some(r=>{var o;return(o=e.getValue(t))==null?void 0:o.includes(r)});Aa.autoRemove=e=>Ye(e)||!(e!=null&&e.length);const Da=(e,t,n)=>e.getValue(t)===n;Da.autoRemove=e=>Ye(e);const Fa=(e,t,n)=>e.getValue(t)==n;Fa.autoRemove=e=>Ye(e);const Vo=(e,t,n)=>{let[r,o]=n;const i=e.getValue(t);return i>=r&&i<=o};Vo.resolveFilterValue=e=>{let[t,n]=e,r=typeof t!="number"?parseFloat(t):t,o=typeof n!="number"?parseFloat(n):n,i=t===null||Number.isNaN(r)?-1/0:r,s=n===null||Number.isNaN(o)?1/0:o;if(i>s){const a=i;i=s,s=a}return[i,s]};Vo.autoRemove=e=>Ye(e)||Ye(e[0])&&Ye(e[1]);const rt={includesString:_a,includesStringSensitive:$a,equalsString:Ma,arrIncludes:Ia,arrIncludesAll:ja,arrIncludesSome:Aa,equals:Da,weakEquals:Fa,inNumberRange:Vo};function Ye(e){return e==null||e===""}const am={getDefaultColumnDef:()=>({filterFn:"auto"}),getInitialState:e=>({columnFilters:[],...e}),getDefaultOptions:e=>({onColumnFiltersChange:Be("columnFilters",e),filterFromLeafRows:!1,maxLeafRowFilterDepth:100}),createColumn:(e,t)=>{e.getAutoFilterFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);return typeof r=="string"?rt.includesString:typeof r=="number"?rt.inNumberRange:typeof r=="boolean"||r!==null&&typeof r=="object"?rt.equals:Array.isArray(r)?rt.arrIncludes:rt.weakEquals},e.getFilterFn=()=>{var n,r;return wr(e.columnDef.filterFn)?e.columnDef.filterFn:e.columnDef.filterFn==="auto"?e.getAutoFilterFn():(n=(r=t.options.filterFns)==null?void 0:r[e.columnDef.filterFn])!=null?n:rt[e.columnDef.filterFn]},e.getCanFilter=()=>{var n,r,o;return((n=e.columnDef.enableColumnFilter)!=null?n:!0)&&((r=t.options.enableColumnFilters)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&!!e.accessorFn},e.getIsFiltered=()=>e.getFilterIndex()>-1,e.getFilterValue=()=>{var n;return(n=t.getState().columnFilters)==null||(n=n.find(r=>r.id===e.id))==null?void 0:n.value},e.getFilterIndex=()=>{var n,r;return(n=(r=t.getState().columnFilters)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.setFilterValue=n=>{t.setColumnFilters(r=>{const o=e.getFilterFn(),i=r==null?void 0:r.find(p=>p.id===e.id),s=gt(n,i?i.value:void 0);if(os(o,s,e)){var a;return(a=r==null?void 0:r.filter(p=>p.id!==e.id))!=null?a:[]}const u={id:e.id,value:s};if(i){var c;return(c=r==null?void 0:r.map(p=>p.id===e.id?u:p))!=null?c:[]}return r!=null&&r.length?[...r,u]:[u]})}},createRow:(e,t)=>{e.columnFilters={},e.columnFiltersMeta={}},createTable:e=>{e.setColumnFilters=t=>{const n=e.getAllLeafColumns(),r=o=>{var i;return(i=gt(t,o))==null?void 0:i.filter(s=>{const a=n.find(u=>u.id===s.id);if(a){const u=a.getFilterFn();if(os(u,s.value,a))return!1}return!0})};e.options.onColumnFiltersChange==null||e.options.onColumnFiltersChange(r)},e.resetColumnFilters=t=>{var n,r;e.setColumnFilters(t?[]:(n=(r=e.initialState)==null?void 0:r.columnFilters)!=null?n:[])},e.getPreFilteredRowModel=()=>e.getCoreRowModel(),e.getFilteredRowModel=()=>(!e._getFilteredRowModel&&e.options.getFilteredRowModel&&(e._getFilteredRowModel=e.options.getFilteredRowModel(e)),e.options.manualFiltering||!e._getFilteredRowModel?e.getPreFilteredRowModel():e._getFilteredRowModel())}};function os(e,t,n){return(e&&e.autoRemove?e.autoRemove(t,n):!1)||typeof t>"u"||typeof t=="string"&&!t}const lm=(e,t,n)=>n.reduce((r,o)=>{const i=o.getValue(e);return r+(typeof i=="number"?i:0)},0),um=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r>i||r===void 0&&i>=i)&&(r=i)}),r},cm=(e,t,n)=>{let r;return n.forEach(o=>{const i=o.getValue(e);i!=null&&(r<i||r===void 0&&i>=i)&&(r=i)}),r},pm=(e,t,n)=>{let r,o;return n.forEach(i=>{const s=i.getValue(e);s!=null&&(r===void 0?s>=s&&(r=o=s):(r>s&&(r=s),o<s&&(o=s)))}),[r,o]},dm=(e,t)=>{let n=0,r=0;if(t.forEach(o=>{let i=o.getValue(e);i!=null&&(i=+i)>=i&&(++n,r+=i)}),n)return r/n},fm=(e,t)=>{if(!t.length)return;const n=t.map(i=>i.getValue(e));if(!tm(n))return;if(n.length===1)return n[0];const r=Math.floor(n.length/2),o=n.sort((i,s)=>i-s);return n.length%2!==0?o[r]:(o[r-1]+o[r])/2},gm=(e,t)=>Array.from(new Set(t.map(n=>n.getValue(e))).values()),mm=(e,t)=>new Set(t.map(n=>n.getValue(e))).size,hm=(e,t)=>t.length,Dr={sum:lm,min:um,max:cm,extent:pm,mean:dm,median:fm,unique:gm,uniqueCount:mm,count:hm},vm={getDefaultColumnDef:()=>({aggregatedCell:e=>{var t,n;return(t=(n=e.getValue())==null||n.toString==null?void 0:n.toString())!=null?t:null},aggregationFn:"auto"}),getInitialState:e=>({grouping:[],...e}),getDefaultOptions:e=>({onGroupingChange:Be("grouping",e),groupedColumnMode:"reorder"}),createColumn:(e,t)=>{e.toggleGrouping=()=>{t.setGrouping(n=>n!=null&&n.includes(e.id)?n.filter(r=>r!==e.id):[...n??[],e.id])},e.getCanGroup=()=>{var n,r;return((n=e.columnDef.enableGrouping)!=null?n:!0)&&((r=t.options.enableGrouping)!=null?r:!0)&&(!!e.accessorFn||!!e.columnDef.getGroupingValue)},e.getIsGrouped=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.includes(e.id)},e.getGroupedIndex=()=>{var n;return(n=t.getState().grouping)==null?void 0:n.indexOf(e.id)},e.getToggleGroupingHandler=()=>{const n=e.getCanGroup();return()=>{n&&e.toggleGrouping()}},e.getAutoAggregationFn=()=>{const n=t.getCoreRowModel().flatRows[0],r=n==null?void 0:n.getValue(e.id);if(typeof r=="number")return Dr.sum;if(Object.prototype.toString.call(r)==="[object Date]")return Dr.extent},e.getAggregationFn=()=>{var n,r;if(!e)throw new Error;return wr(e.columnDef.aggregationFn)?e.columnDef.aggregationFn:e.columnDef.aggregationFn==="auto"?e.getAutoAggregationFn():(n=(r=t.options.aggregationFns)==null?void 0:r[e.columnDef.aggregationFn])!=null?n:Dr[e.columnDef.aggregationFn]}},createTable:e=>{e.setGrouping=t=>e.options.onGroupingChange==null?void 0:e.options.onGroupingChange(t),e.resetGrouping=t=>{var n,r;e.setGrouping(t?[]:(n=(r=e.initialState)==null?void 0:r.grouping)!=null?n:[])},e.getPreGroupedRowModel=()=>e.getFilteredRowModel(),e.getGroupedRowModel=()=>(!e._getGroupedRowModel&&e.options.getGroupedRowModel&&(e._getGroupedRowModel=e.options.getGroupedRowModel(e)),e.options.manualGrouping||!e._getGroupedRowModel?e.getPreGroupedRowModel():e._getGroupedRowModel())},createRow:(e,t)=>{e.getIsGrouped=()=>!!e.groupingColumnId,e.getGroupingValue=n=>{if(e._groupingValuesCache.hasOwnProperty(n))return e._groupingValuesCache[n];const r=t.getColumn(n);return r!=null&&r.columnDef.getGroupingValue?(e._groupingValuesCache[n]=r.columnDef.getGroupingValue(e.original),e._groupingValuesCache[n]):e.getValue(n)},e._groupingValuesCache={}},createCell:(e,t,n,r)=>{e.getIsGrouped=()=>t.getIsGrouped()&&t.id===n.groupingColumnId,e.getIsPlaceholder=()=>!e.getIsGrouped()&&t.getIsGrouped(),e.getIsAggregated=()=>{var o;return!e.getIsGrouped()&&!e.getIsPlaceholder()&&!!((o=n.subRows)!=null&&o.length)}}};function bm(e,t,n){if(!(t!=null&&t.length)||!n)return e;const r=e.filter(i=>!t.includes(i.id));return n==="remove"?r:[...t.map(i=>e.find(s=>s.id===i)).filter(Boolean),...r]}const wm={getInitialState:e=>({columnOrder:[],...e}),getDefaultOptions:e=>({onColumnOrderChange:Be("columnOrder",e)}),createColumn:(e,t)=>{e.getIndex=J(n=>[bn(t,n)],n=>n.findIndex(r=>r.id===e.id),Z(t.options,"debugColumns","getIndex")),e.getIsFirstColumn=n=>{var r;return((r=bn(t,n)[0])==null?void 0:r.id)===e.id},e.getIsLastColumn=n=>{var r;const o=bn(t,n);return((r=o[o.length-1])==null?void 0:r.id)===e.id}},createTable:e=>{e.setColumnOrder=t=>e.options.onColumnOrderChange==null?void 0:e.options.onColumnOrderChange(t),e.resetColumnOrder=t=>{var n;e.setColumnOrder(t?[]:(n=e.initialState.columnOrder)!=null?n:[])},e._getOrderColumnsFn=J(()=>[e.getState().columnOrder,e.getState().grouping,e.options.groupedColumnMode],(t,n,r)=>o=>{let i=[];if(!(t!=null&&t.length))i=o;else{const s=[...t],a=[...o];for(;a.length&&s.length;){const u=s.shift(),c=a.findIndex(p=>p.id===u);c>-1&&i.push(a.splice(c,1)[0])}i=[...i,...a]}return bm(i,n,r)},Z(e.options,"debugTable","_getOrderColumnsFn"))}},Fr=()=>({left:[],right:[]}),ym={getInitialState:e=>({columnPinning:Fr(),...e}),getDefaultOptions:e=>({onColumnPinningChange:Be("columnPinning",e)}),createColumn:(e,t)=>{e.pin=n=>{const r=e.getLeafColumns().map(o=>o.id).filter(Boolean);t.setColumnPinning(o=>{var i,s;if(n==="right"){var a,u;return{left:((a=o==null?void 0:o.left)!=null?a:[]).filter(g=>!(r!=null&&r.includes(g))),right:[...((u=o==null?void 0:o.right)!=null?u:[]).filter(g=>!(r!=null&&r.includes(g))),...r]}}if(n==="left"){var c,p;return{left:[...((c=o==null?void 0:o.left)!=null?c:[]).filter(g=>!(r!=null&&r.includes(g))),...r],right:((p=o==null?void 0:o.right)!=null?p:[]).filter(g=>!(r!=null&&r.includes(g)))}}return{left:((i=o==null?void 0:o.left)!=null?i:[]).filter(g=>!(r!=null&&r.includes(g))),right:((s=o==null?void 0:o.right)!=null?s:[]).filter(g=>!(r!=null&&r.includes(g)))}})},e.getCanPin=()=>e.getLeafColumns().some(r=>{var o,i,s;return((o=r.columnDef.enablePinning)!=null?o:!0)&&((i=(s=t.options.enableColumnPinning)!=null?s:t.options.enablePinning)!=null?i:!0)}),e.getIsPinned=()=>{const n=e.getLeafColumns().map(a=>a.id),{left:r,right:o}=t.getState().columnPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"left":s?"right":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();return o?(n=(r=t.getState().columnPinning)==null||(r=r[o])==null?void 0:r.indexOf(e.id))!=null?n:-1:0}},createRow:(e,t)=>{e.getCenterVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left,t.getState().columnPinning.right],(n,r,o)=>{const i=[...r??[],...o??[]];return n.filter(s=>!i.includes(s.column.id))},Z(t.options,"debugRows","getCenterVisibleCells")),e.getLeftVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.left],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"left"})),Z(t.options,"debugRows","getLeftVisibleCells")),e.getRightVisibleCells=J(()=>[e._getAllVisibleCells(),t.getState().columnPinning.right],(n,r)=>(r??[]).map(i=>n.find(s=>s.column.id===i)).filter(Boolean).map(i=>({...i,position:"right"})),Z(t.options,"debugRows","getRightVisibleCells"))},createTable:e=>{e.setColumnPinning=t=>e.options.onColumnPinningChange==null?void 0:e.options.onColumnPinningChange(t),e.resetColumnPinning=t=>{var n,r;return e.setColumnPinning(t?Fr():(n=(r=e.initialState)==null?void 0:r.columnPinning)!=null?n:Fr())},e.getIsSomeColumnsPinned=t=>{var n;const r=e.getState().columnPinning;if(!t){var o,i;return!!((o=r.left)!=null&&o.length||(i=r.right)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e.getLeftLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getLeftLeafColumns")),e.getRightLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.right],(t,n)=>(n??[]).map(r=>t.find(o=>o.id===r)).filter(Boolean),Z(e.options,"debugColumns","getRightLeafColumns")),e.getCenterLeafColumns=J(()=>[e.getAllLeafColumns(),e.getState().columnPinning.left,e.getState().columnPinning.right],(t,n,r)=>{const o=[...n??[],...r??[]];return t.filter(i=>!o.includes(i.id))},Z(e.options,"debugColumns","getCenterLeafColumns"))}},zn={size:150,minSize:20,maxSize:Number.MAX_SAFE_INTEGER},Vr=()=>({startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,isResizingColumn:!1,columnSizingStart:[]}),xm={getDefaultColumnDef:()=>zn,getInitialState:e=>({columnSizing:{},columnSizingInfo:Vr(),...e}),getDefaultOptions:e=>({columnResizeMode:"onEnd",columnResizeDirection:"ltr",onColumnSizingChange:Be("columnSizing",e),onColumnSizingInfoChange:Be("columnSizingInfo",e)}),createColumn:(e,t)=>{e.getSize=()=>{var n,r,o;const i=t.getState().columnSizing[e.id];return Math.min(Math.max((n=e.columnDef.minSize)!=null?n:zn.minSize,(r=i??e.columnDef.size)!=null?r:zn.size),(o=e.columnDef.maxSize)!=null?o:zn.maxSize)},e.getStart=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(0,e.getIndex(n)).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getStart")),e.getAfter=J(n=>[n,bn(t,n),t.getState().columnSizing],(n,r)=>r.slice(e.getIndex(n)+1).reduce((o,i)=>o+i.getSize(),0),Z(t.options,"debugColumns","getAfter")),e.resetSize=()=>{t.setColumnSizing(n=>{let{[e.id]:r,...o}=n;return o})},e.getCanResize=()=>{var n,r;return((n=e.columnDef.enableResizing)!=null?n:!0)&&((r=t.options.enableColumnResizing)!=null?r:!0)},e.getIsResizing=()=>t.getState().columnSizingInfo.isResizingColumn===e.id},createHeader:(e,t)=>{e.getSize=()=>{let n=0;const r=o=>{if(o.subHeaders.length)o.subHeaders.forEach(r);else{var i;n+=(i=o.column.getSize())!=null?i:0}};return r(e),n},e.getStart=()=>{if(e.index>0){const n=e.headerGroup.headers[e.index-1];return n.getStart()+n.getSize()}return 0},e.getResizeHandler=n=>{const r=t.getColumn(e.column.id),o=r==null?void 0:r.getCanResize();return i=>{if(!r||!o||(i.persist==null||i.persist(),Lr(i)&&i.touches&&i.touches.length>1))return;const s=e.getSize(),a=e?e.getLeafHeaders().map(y=>[y.column.id,y.column.getSize()]):[[r.id,r.getSize()]],u=Lr(i)?Math.round(i.touches[0].clientX):i.clientX,c={},p=(y,O)=>{typeof O=="number"&&(t.setColumnSizingInfo(x=>{var S,w;const T=t.options.columnResizeDirection==="rtl"?-1:1,k=(O-((S=x==null?void 0:x.startOffset)!=null?S:0))*T,D=Math.max(k/((w=x==null?void 0:x.startSize)!=null?w:0),-.999999);return x.columnSizingStart.forEach(F=>{let[V,P]=F;c[V]=Math.round(Math.max(P+P*D,0)*100)/100}),{...x,deltaOffset:k,deltaPercentage:D}}),(t.options.columnResizeMode==="onChange"||y==="end")&&t.setColumnSizing(x=>({...x,...c})))},g=y=>p("move",y),f=y=>{p("end",y),t.setColumnSizingInfo(O=>({...O,isResizingColumn:!1,startOffset:null,startSize:null,deltaOffset:null,deltaPercentage:null,columnSizingStart:[]}))},d=n||typeof document<"u"?document:null,h={moveHandler:y=>g(y.clientX),upHandler:y=>{d==null||d.removeEventListener("mousemove",h.moveHandler),d==null||d.removeEventListener("mouseup",h.upHandler),f(y.clientX)}},m={moveHandler:y=>(y.cancelable&&(y.preventDefault(),y.stopPropagation()),g(y.touches[0].clientX),!1),upHandler:y=>{var O;d==null||d.removeEventListener("touchmove",m.moveHandler),d==null||d.removeEventListener("touchend",m.upHandler),y.cancelable&&(y.preventDefault(),y.stopPropagation()),f((O=y.touches[0])==null?void 0:O.clientX)}},v=Sm()?{passive:!1}:!1;Lr(i)?(d==null||d.addEventListener("touchmove",m.moveHandler,v),d==null||d.addEventListener("touchend",m.upHandler,v)):(d==null||d.addEventListener("mousemove",h.moveHandler,v),d==null||d.addEventListener("mouseup",h.upHandler,v)),t.setColumnSizingInfo(y=>({...y,startOffset:u,startSize:s,deltaOffset:0,deltaPercentage:0,columnSizingStart:a,isResizingColumn:r.id}))}}},createTable:e=>{e.setColumnSizing=t=>e.options.onColumnSizingChange==null?void 0:e.options.onColumnSizingChange(t),e.setColumnSizingInfo=t=>e.options.onColumnSizingInfoChange==null?void 0:e.options.onColumnSizingInfoChange(t),e.resetColumnSizing=t=>{var n;e.setColumnSizing(t?{}:(n=e.initialState.columnSizing)!=null?n:{})},e.resetHeaderSizeInfo=t=>{var n;e.setColumnSizingInfo(t?Vr():(n=e.initialState.columnSizingInfo)!=null?n:Vr())},e.getTotalSize=()=>{var t,n;return(t=(n=e.getHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getLeftTotalSize=()=>{var t,n;return(t=(n=e.getLeftHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getCenterTotalSize=()=>{var t,n;return(t=(n=e.getCenterHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0},e.getRightTotalSize=()=>{var t,n;return(t=(n=e.getRightHeaderGroups()[0])==null?void 0:n.headers.reduce((r,o)=>r+o.getSize(),0))!=null?t:0}}};let Hn=null;function Sm(){if(typeof Hn=="boolean")return Hn;let e=!1;try{const t={get passive(){return e=!0,!1}},n=()=>{};window.addEventListener("test",n,t),window.removeEventListener("test",n)}catch{e=!1}return Hn=e,Hn}function Lr(e){return e.type==="touchstart"}const Cm={getInitialState:e=>({columnVisibility:{},...e}),getDefaultOptions:e=>({onColumnVisibilityChange:Be("columnVisibility",e)}),createColumn:(e,t)=>{e.toggleVisibility=n=>{e.getCanHide()&&t.setColumnVisibility(r=>({...r,[e.id]:n??!e.getIsVisible()}))},e.getIsVisible=()=>{var n,r;const o=e.columns;return(n=o.length?o.some(i=>i.getIsVisible()):(r=t.getState().columnVisibility)==null?void 0:r[e.id])!=null?n:!0},e.getCanHide=()=>{var n,r;return((n=e.columnDef.enableHiding)!=null?n:!0)&&((r=t.options.enableHiding)!=null?r:!0)},e.getToggleVisibilityHandler=()=>n=>{e.toggleVisibility==null||e.toggleVisibility(n.target.checked)}},createRow:(e,t)=>{e._getAllVisibleCells=J(()=>[e.getAllCells(),t.getState().columnVisibility],n=>n.filter(r=>r.column.getIsVisible()),Z(t.options,"debugRows","_getAllVisibleCells")),e.getVisibleCells=J(()=>[e.getLeftVisibleCells(),e.getCenterVisibleCells(),e.getRightVisibleCells()],(n,r,o)=>[...n,...r,...o],Z(t.options,"debugRows","getVisibleCells"))},createTable:e=>{const t=(n,r)=>J(()=>[r(),r().filter(o=>o.getIsVisible()).map(o=>o.id).join("_")],o=>o.filter(i=>i.getIsVisible==null?void 0:i.getIsVisible()),Z(e.options,"debugColumns",n));e.getVisibleFlatColumns=t("getVisibleFlatColumns",()=>e.getAllFlatColumns()),e.getVisibleLeafColumns=t("getVisibleLeafColumns",()=>e.getAllLeafColumns()),e.getLeftVisibleLeafColumns=t("getLeftVisibleLeafColumns",()=>e.getLeftLeafColumns()),e.getRightVisibleLeafColumns=t("getRightVisibleLeafColumns",()=>e.getRightLeafColumns()),e.getCenterVisibleLeafColumns=t("getCenterVisibleLeafColumns",()=>e.getCenterLeafColumns()),e.setColumnVisibility=n=>e.options.onColumnVisibilityChange==null?void 0:e.options.onColumnVisibilityChange(n),e.resetColumnVisibility=n=>{var r;e.setColumnVisibility(n?{}:(r=e.initialState.columnVisibility)!=null?r:{})},e.toggleAllColumnsVisible=n=>{var r;n=(r=n)!=null?r:!e.getIsAllColumnsVisible(),e.setColumnVisibility(e.getAllLeafColumns().reduce((o,i)=>({...o,[i.id]:n||!(i.getCanHide!=null&&i.getCanHide())}),{}))},e.getIsAllColumnsVisible=()=>!e.getAllLeafColumns().some(n=>!(n.getIsVisible!=null&&n.getIsVisible())),e.getIsSomeColumnsVisible=()=>e.getAllLeafColumns().some(n=>n.getIsVisible==null?void 0:n.getIsVisible()),e.getToggleAllColumnsVisibilityHandler=()=>n=>{var r;e.toggleAllColumnsVisible((r=n.target)==null?void 0:r.checked)}}};function bn(e,t){return t?t==="center"?e.getCenterVisibleLeafColumns():t==="left"?e.getLeftVisibleLeafColumns():e.getRightVisibleLeafColumns():e.getVisibleLeafColumns()}const Em={createTable:e=>{e._getGlobalFacetedRowModel=e.options.getFacetedRowModel&&e.options.getFacetedRowModel(e,"__global__"),e.getGlobalFacetedRowModel=()=>e.options.manualFiltering||!e._getGlobalFacetedRowModel?e.getPreFilteredRowModel():e._getGlobalFacetedRowModel(),e._getGlobalFacetedUniqueValues=e.options.getFacetedUniqueValues&&e.options.getFacetedUniqueValues(e,"__global__"),e.getGlobalFacetedUniqueValues=()=>e._getGlobalFacetedUniqueValues?e._getGlobalFacetedUniqueValues():new Map,e._getGlobalFacetedMinMaxValues=e.options.getFacetedMinMaxValues&&e.options.getFacetedMinMaxValues(e,"__global__"),e.getGlobalFacetedMinMaxValues=()=>{if(e._getGlobalFacetedMinMaxValues)return e._getGlobalFacetedMinMaxValues()}}},Rm={getInitialState:e=>({globalFilter:void 0,...e}),getDefaultOptions:e=>({onGlobalFilterChange:Be("globalFilter",e),globalFilterFn:"auto",getColumnCanGlobalFilter:t=>{var n;const r=(n=e.getCoreRowModel().flatRows[0])==null||(n=n._getAllCellsByColumnId()[t.id])==null?void 0:n.getValue();return typeof r=="string"||typeof r=="number"}}),createColumn:(e,t)=>{e.getCanGlobalFilter=()=>{var n,r,o,i;return((n=e.columnDef.enableGlobalFilter)!=null?n:!0)&&((r=t.options.enableGlobalFilter)!=null?r:!0)&&((o=t.options.enableFilters)!=null?o:!0)&&((i=t.options.getColumnCanGlobalFilter==null?void 0:t.options.getColumnCanGlobalFilter(e))!=null?i:!0)&&!!e.accessorFn}},createTable:e=>{e.getGlobalAutoFilterFn=()=>rt.includesString,e.getGlobalFilterFn=()=>{var t,n;const{globalFilterFn:r}=e.options;return wr(r)?r:r==="auto"?e.getGlobalAutoFilterFn():(t=(n=e.options.filterFns)==null?void 0:n[r])!=null?t:rt[r]},e.setGlobalFilter=t=>{e.options.onGlobalFilterChange==null||e.options.onGlobalFilterChange(t)},e.resetGlobalFilter=t=>{e.setGlobalFilter(t?void 0:e.initialState.globalFilter)}}},Tm={getInitialState:e=>({expanded:{},...e}),getDefaultOptions:e=>({onExpandedChange:Be("expanded",e),paginateExpandedRows:!0}),createTable:e=>{let t=!1,n=!1;e._autoResetExpanded=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetExpanded)!=null?r:!e.options.manualExpanding){if(n)return;n=!0,e._queue(()=>{e.resetExpanded(),n=!1})}},e.setExpanded=r=>e.options.onExpandedChange==null?void 0:e.options.onExpandedChange(r),e.toggleAllRowsExpanded=r=>{r??!e.getIsAllRowsExpanded()?e.setExpanded(!0):e.setExpanded({})},e.resetExpanded=r=>{var o,i;e.setExpanded(r?{}:(o=(i=e.initialState)==null?void 0:i.expanded)!=null?o:{})},e.getCanSomeRowsExpand=()=>e.getPrePaginationRowModel().flatRows.some(r=>r.getCanExpand()),e.getToggleAllRowsExpandedHandler=()=>r=>{r.persist==null||r.persist(),e.toggleAllRowsExpanded()},e.getIsSomeRowsExpanded=()=>{const r=e.getState().expanded;return r===!0||Object.values(r).some(Boolean)},e.getIsAllRowsExpanded=()=>{const r=e.getState().expanded;return typeof r=="boolean"?r===!0:!(!Object.keys(r).length||e.getRowModel().flatRows.some(o=>!o.getIsExpanded()))},e.getExpandedDepth=()=>{let r=0;return(e.getState().expanded===!0?Object.keys(e.getRowModel().rowsById):Object.keys(e.getState().expanded)).forEach(i=>{const s=i.split(".");r=Math.max(r,s.length)}),r},e.getPreExpandedRowModel=()=>e.getSortedRowModel(),e.getExpandedRowModel=()=>(!e._getExpandedRowModel&&e.options.getExpandedRowModel&&(e._getExpandedRowModel=e.options.getExpandedRowModel(e)),e.options.manualExpanding||!e._getExpandedRowModel?e.getPreExpandedRowModel():e._getExpandedRowModel())},createRow:(e,t)=>{e.toggleExpanded=n=>{t.setExpanded(r=>{var o;const i=r===!0?!0:!!(r!=null&&r[e.id]);let s={};if(r===!0?Object.keys(t.getRowModel().rowsById).forEach(a=>{s[a]=!0}):s=r,n=(o=n)!=null?o:!i,!i&&n)return{...s,[e.id]:!0};if(i&&!n){const{[e.id]:a,...u}=s;return u}return r})},e.getIsExpanded=()=>{var n;const r=t.getState().expanded;return!!((n=t.options.getIsRowExpanded==null?void 0:t.options.getIsRowExpanded(e))!=null?n:r===!0||r!=null&&r[e.id])},e.getCanExpand=()=>{var n,r,o;return(n=t.options.getRowCanExpand==null?void 0:t.options.getRowCanExpand(e))!=null?n:((r=t.options.enableExpanding)!=null?r:!0)&&!!((o=e.subRows)!=null&&o.length)},e.getIsAllParentsExpanded=()=>{let n=!0,r=e;for(;n&&r.parentId;)r=t.getRow(r.parentId,!0),n=r.getIsExpanded();return n},e.getToggleExpandedHandler=()=>{const n=e.getCanExpand();return()=>{n&&e.toggleExpanded()}}}},oo=0,io=10,Br=()=>({pageIndex:oo,pageSize:io}),Pm={getInitialState:e=>({...e,pagination:{...Br(),...e==null?void 0:e.pagination}}),getDefaultOptions:e=>({onPaginationChange:Be("pagination",e)}),createTable:e=>{let t=!1,n=!1;e._autoResetPageIndex=()=>{var r,o;if(!t){e._queue(()=>{t=!0});return}if((r=(o=e.options.autoResetAll)!=null?o:e.options.autoResetPageIndex)!=null?r:!e.options.manualPagination){if(n)return;n=!0,e._queue(()=>{e.resetPageIndex(),n=!1})}},e.setPagination=r=>{const o=i=>gt(r,i);return e.options.onPaginationChange==null?void 0:e.options.onPaginationChange(o)},e.resetPagination=r=>{var o;e.setPagination(r?Br():(o=e.initialState.pagination)!=null?o:Br())},e.setPageIndex=r=>{e.setPagination(o=>{let i=gt(r,o.pageIndex);const s=typeof e.options.pageCount>"u"||e.options.pageCount===-1?Number.MAX_SAFE_INTEGER:e.options.pageCount-1;return i=Math.max(0,Math.min(i,s)),{...o,pageIndex:i}})},e.resetPageIndex=r=>{var o,i;e.setPageIndex(r?oo:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageIndex)!=null?o:oo)},e.resetPageSize=r=>{var o,i;e.setPageSize(r?io:(o=(i=e.initialState)==null||(i=i.pagination)==null?void 0:i.pageSize)!=null?o:io)},e.setPageSize=r=>{e.setPagination(o=>{const i=Math.max(1,gt(r,o.pageSize)),s=o.pageSize*o.pageIndex,a=Math.floor(s/i);return{...o,pageIndex:a,pageSize:i}})},e.setPageCount=r=>e.setPagination(o=>{var i;let s=gt(r,(i=e.options.pageCount)!=null?i:-1);return typeof s=="number"&&(s=Math.max(-1,s)),{...o,pageCount:s}}),e.getPageOptions=J(()=>[e.getPageCount()],r=>{let o=[];return r&&r>0&&(o=[...new Array(r)].fill(null).map((i,s)=>s)),o},Z(e.options,"debugTable","getPageOptions")),e.getCanPreviousPage=()=>e.getState().pagination.pageIndex>0,e.getCanNextPage=()=>{const{pageIndex:r}=e.getState().pagination,o=e.getPageCount();return o===-1?!0:o===0?!1:r<o-1},e.previousPage=()=>e.setPageIndex(r=>r-1),e.nextPage=()=>e.setPageIndex(r=>r+1),e.firstPage=()=>e.setPageIndex(0),e.lastPage=()=>e.setPageIndex(e.getPageCount()-1),e.getPrePaginationRowModel=()=>e.getExpandedRowModel(),e.getPaginationRowModel=()=>(!e._getPaginationRowModel&&e.options.getPaginationRowModel&&(e._getPaginationRowModel=e.options.getPaginationRowModel(e)),e.options.manualPagination||!e._getPaginationRowModel?e.getPrePaginationRowModel():e._getPaginationRowModel()),e.getPageCount=()=>{var r;return(r=e.options.pageCount)!=null?r:Math.ceil(e.getRowCount()/e.getState().pagination.pageSize)},e.getRowCount=()=>{var r;return(r=e.options.rowCount)!=null?r:e.getPrePaginationRowModel().rows.length}}},zr=()=>({top:[],bottom:[]}),Om={getInitialState:e=>({rowPinning:zr(),...e}),getDefaultOptions:e=>({onRowPinningChange:Be("rowPinning",e)}),createRow:(e,t)=>{e.pin=(n,r,o)=>{const i=r?e.getLeafRows().map(u=>{let{id:c}=u;return c}):[],s=o?e.getParentRows().map(u=>{let{id:c}=u;return c}):[],a=new Set([...s,e.id,...i]);t.setRowPinning(u=>{var c,p;if(n==="bottom"){var g,f;return{top:((g=u==null?void 0:u.top)!=null?g:[]).filter(m=>!(a!=null&&a.has(m))),bottom:[...((f=u==null?void 0:u.bottom)!=null?f:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)]}}if(n==="top"){var d,h;return{top:[...((d=u==null?void 0:u.top)!=null?d:[]).filter(m=>!(a!=null&&a.has(m))),...Array.from(a)],bottom:((h=u==null?void 0:u.bottom)!=null?h:[]).filter(m=>!(a!=null&&a.has(m)))}}return{top:((c=u==null?void 0:u.top)!=null?c:[]).filter(m=>!(a!=null&&a.has(m))),bottom:((p=u==null?void 0:u.bottom)!=null?p:[]).filter(m=>!(a!=null&&a.has(m)))}})},e.getCanPin=()=>{var n;const{enableRowPinning:r,enablePinning:o}=t.options;return typeof r=="function"?r(e):(n=r??o)!=null?n:!0},e.getIsPinned=()=>{const n=[e.id],{top:r,bottom:o}=t.getState().rowPinning,i=n.some(a=>r==null?void 0:r.includes(a)),s=n.some(a=>o==null?void 0:o.includes(a));return i?"top":s?"bottom":!1},e.getPinnedIndex=()=>{var n,r;const o=e.getIsPinned();if(!o)return-1;const i=(n=t._getPinnedRows(o))==null?void 0:n.map(s=>{let{id:a}=s;return a});return(r=i==null?void 0:i.indexOf(e.id))!=null?r:-1}},createTable:e=>{e.setRowPinning=t=>e.options.onRowPinningChange==null?void 0:e.options.onRowPinningChange(t),e.resetRowPinning=t=>{var n,r;return e.setRowPinning(t?zr():(n=(r=e.initialState)==null?void 0:r.rowPinning)!=null?n:zr())},e.getIsSomeRowsPinned=t=>{var n;const r=e.getState().rowPinning;if(!t){var o,i;return!!((o=r.top)!=null&&o.length||(i=r.bottom)!=null&&i.length)}return!!((n=r[t])!=null&&n.length)},e._getPinnedRows=J(t=>[e.getRowModel().rows,e.getState().rowPinning[t],t],(t,n,r)=>{var o;return((o=e.options.keepPinnedRows)==null||o?(n??[]).map(s=>{const a=e.getRow(s,!0);return a.getIsAllParentsExpanded()?a:null}):(n??[]).map(s=>t.find(a=>a.id===s))).filter(Boolean).map(s=>({...s,position:r}))},Z(e.options,"debugRows","_getPinnedRows")),e.getTopRows=()=>e._getPinnedRows("top"),e.getBottomRows=()=>e._getPinnedRows("bottom"),e.getCenterRows=J(()=>[e.getRowModel().rows,e.getState().rowPinning.top,e.getState().rowPinning.bottom],(t,n,r)=>{const o=new Set([...n??[],...r??[]]);return t.filter(i=>!o.has(i.id))},Z(e.options,"debugRows","getCenterRows"))}},km={getInitialState:e=>({rowSelection:{},...e}),getDefaultOptions:e=>({onRowSelectionChange:Be("rowSelection",e),enableRowSelection:!0,enableMultiRowSelection:!0,enableSubRowSelection:!0}),createTable:e=>{e.setRowSelection=t=>e.options.onRowSelectionChange==null?void 0:e.options.onRowSelectionChange(t),e.resetRowSelection=t=>{var n;return e.setRowSelection(t?{}:(n=e.initialState.rowSelection)!=null?n:{})},e.toggleAllRowsSelected=t=>{e.setRowSelection(n=>{t=typeof t<"u"?t:!e.getIsAllRowsSelected();const r={...n},o=e.getPreGroupedRowModel().flatRows;return t?o.forEach(i=>{i.getCanSelect()&&(r[i.id]=!0)}):o.forEach(i=>{delete r[i.id]}),r})},e.toggleAllPageRowsSelected=t=>e.setRowSelection(n=>{const r=typeof t<"u"?t:!e.getIsAllPageRowsSelected(),o={...n};return e.getRowModel().rows.forEach(i=>{so(o,i.id,r,!0,e)}),o}),e.getPreSelectedRowModel=()=>e.getCoreRowModel(),e.getSelectedRowModel=J(()=>[e.getState().rowSelection,e.getCoreRowModel()],(t,n)=>Object.keys(t).length?Hr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getSelectedRowModel")),e.getFilteredSelectedRowModel=J(()=>[e.getState().rowSelection,e.getFilteredRowModel()],(t,n)=>Object.keys(t).length?Hr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getFilteredSelectedRowModel")),e.getGroupedSelectedRowModel=J(()=>[e.getState().rowSelection,e.getSortedRowModel()],(t,n)=>Object.keys(t).length?Hr(e,n):{rows:[],flatRows:[],rowsById:{}},Z(e.options,"debugTable","getGroupedSelectedRowModel")),e.getIsAllRowsSelected=()=>{const t=e.getFilteredRowModel().flatRows,{rowSelection:n}=e.getState();let r=!!(t.length&&Object.keys(n).length);return r&&t.some(o=>o.getCanSelect()&&!n[o.id])&&(r=!1),r},e.getIsAllPageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows.filter(o=>o.getCanSelect()),{rowSelection:n}=e.getState();let r=!!t.length;return r&&t.some(o=>!n[o.id])&&(r=!1),r},e.getIsSomeRowsSelected=()=>{var t;const n=Object.keys((t=e.getState().rowSelection)!=null?t:{}).length;return n>0&&n<e.getFilteredRowModel().flatRows.length},e.getIsSomePageRowsSelected=()=>{const t=e.getPaginationRowModel().flatRows;return e.getIsAllPageRowsSelected()?!1:t.filter(n=>n.getCanSelect()).some(n=>n.getIsSelected()||n.getIsSomeSelected())},e.getToggleAllRowsSelectedHandler=()=>t=>{e.toggleAllRowsSelected(t.target.checked)},e.getToggleAllPageRowsSelectedHandler=()=>t=>{e.toggleAllPageRowsSelected(t.target.checked)}},createRow:(e,t)=>{e.toggleSelected=(n,r)=>{const o=e.getIsSelected();t.setRowSelection(i=>{var s;if(n=typeof n<"u"?n:!o,e.getCanSelect()&&o===n)return i;const a={...i};return so(a,e.id,n,(s=r==null?void 0:r.selectChildren)!=null?s:!0,t),a})},e.getIsSelected=()=>{const{rowSelection:n}=t.getState();return Lo(e,n)},e.getIsSomeSelected=()=>{const{rowSelection:n}=t.getState();return ao(e,n)==="some"},e.getIsAllSubRowsSelected=()=>{const{rowSelection:n}=t.getState();return ao(e,n)==="all"},e.getCanSelect=()=>{var n;return typeof t.options.enableRowSelection=="function"?t.options.enableRowSelection(e):(n=t.options.enableRowSelection)!=null?n:!0},e.getCanSelectSubRows=()=>{var n;return typeof t.options.enableSubRowSelection=="function"?t.options.enableSubRowSelection(e):(n=t.options.enableSubRowSelection)!=null?n:!0},e.getCanMultiSelect=()=>{var n;return typeof t.options.enableMultiRowSelection=="function"?t.options.enableMultiRowSelection(e):(n=t.options.enableMultiRowSelection)!=null?n:!0},e.getToggleSelectedHandler=()=>{const n=e.getCanSelect();return r=>{var o;n&&e.toggleSelected((o=r.target)==null?void 0:o.checked)}}}},so=(e,t,n,r,o)=>{var i;const s=o.getRow(t,!0);n?(s.getCanMultiSelect()||Object.keys(e).forEach(a=>delete e[a]),s.getCanSelect()&&(e[t]=!0)):delete e[t],r&&(i=s.subRows)!=null&&i.length&&s.getCanSelectSubRows()&&s.subRows.forEach(a=>so(e,a.id,n,r,o))};function Hr(e,t){const n=e.getState().rowSelection,r=[],o={},i=function(s,a){return s.map(u=>{var c;const p=Lo(u,n);if(p&&(r.push(u),o[u.id]=u),(c=u.subRows)!=null&&c.length&&(u={...u,subRows:i(u.subRows)}),p)return u}).filter(Boolean)};return{rows:i(t.rows),flatRows:r,rowsById:o}}function Lo(e,t){var n;return(n=t[e.id])!=null?n:!1}function ao(e,t,n){var r;if(!((r=e.subRows)!=null&&r.length))return!1;let o=!0,i=!1;return e.subRows.forEach(s=>{if(!(i&&!o)&&(s.getCanSelect()&&(Lo(s,t)?i=!0:o=!1),s.subRows&&s.subRows.length)){const a=ao(s,t);a==="all"?i=!0:(a==="some"&&(i=!0),o=!1)}}),o?"all":i?"some":!1}const lo=/([0-9]+)/gm,Nm=(e,t,n)=>Va(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),_m=(e,t,n)=>Va(mt(e.getValue(n)),mt(t.getValue(n))),$m=(e,t,n)=>Bo(mt(e.getValue(n)).toLowerCase(),mt(t.getValue(n)).toLowerCase()),Mm=(e,t,n)=>Bo(mt(e.getValue(n)),mt(t.getValue(n))),Im=(e,t,n)=>{const r=e.getValue(n),o=t.getValue(n);return r>o?1:r<o?-1:0},jm=(e,t,n)=>Bo(e.getValue(n),t.getValue(n));function Bo(e,t){return e===t?0:e>t?1:-1}function mt(e){return typeof e=="number"?isNaN(e)||e===1/0||e===-1/0?"":String(e):typeof e=="string"?e:""}function Va(e,t){const n=e.split(lo).filter(Boolean),r=t.split(lo).filter(Boolean);for(;n.length&&r.length;){const o=n.shift(),i=r.shift(),s=parseInt(o,10),a=parseInt(i,10),u=[s,a].sort();if(isNaN(u[0])){if(o>i)return 1;if(i>o)return-1;continue}if(isNaN(u[1]))return isNaN(s)?-1:1;if(s>a)return 1;if(a>s)return-1}return n.length-r.length}const ln={alphanumeric:Nm,alphanumericCaseSensitive:_m,text:$m,textCaseSensitive:Mm,datetime:Im,basic:jm},Am={getInitialState:e=>({sorting:[],...e}),getDefaultColumnDef:()=>({sortingFn:"auto",sortUndefined:1}),getDefaultOptions:e=>({onSortingChange:Be("sorting",e),isMultiSortEvent:t=>t.shiftKey}),createColumn:(e,t)=>{e.getAutoSortingFn=()=>{const n=t.getFilteredRowModel().flatRows.slice(10);let r=!1;for(const o of n){const i=o==null?void 0:o.getValue(e.id);if(Object.prototype.toString.call(i)==="[object Date]")return ln.datetime;if(typeof i=="string"&&(r=!0,i.split(lo).length>1))return ln.alphanumeric}return r?ln.text:ln.basic},e.getAutoSortDir=()=>{const n=t.getFilteredRowModel().flatRows[0];return typeof(n==null?void 0:n.getValue(e.id))=="string"?"asc":"desc"},e.getSortingFn=()=>{var n,r;if(!e)throw new Error;return wr(e.columnDef.sortingFn)?e.columnDef.sortingFn:e.columnDef.sortingFn==="auto"?e.getAutoSortingFn():(n=(r=t.options.sortingFns)==null?void 0:r[e.columnDef.sortingFn])!=null?n:ln[e.columnDef.sortingFn]},e.toggleSorting=(n,r)=>{const o=e.getNextSortingOrder(),i=typeof n<"u"&&n!==null;t.setSorting(s=>{const a=s==null?void 0:s.find(d=>d.id===e.id),u=s==null?void 0:s.findIndex(d=>d.id===e.id);let c=[],p,g=i?n:o==="desc";if(s!=null&&s.length&&e.getCanMultiSort()&&r?a?p="toggle":p="add":s!=null&&s.length&&u!==s.length-1?p="replace":a?p="toggle":p="replace",p==="toggle"&&(i||o||(p="remove")),p==="add"){var f;c=[...s,{id:e.id,desc:g}],c.splice(0,c.length-((f=t.options.maxMultiSortColCount)!=null?f:Number.MAX_SAFE_INTEGER))}else p==="toggle"?c=s.map(d=>d.id===e.id?{...d,desc:g}:d):p==="remove"?c=s.filter(d=>d.id!==e.id):c=[{id:e.id,desc:g}];return c})},e.getFirstSortDir=()=>{var n,r;return((n=(r=e.columnDef.sortDescFirst)!=null?r:t.options.sortDescFirst)!=null?n:e.getAutoSortDir()==="desc")?"desc":"asc"},e.getNextSortingOrder=n=>{var r,o;const i=e.getFirstSortDir(),s=e.getIsSorted();return s?s!==i&&((r=t.options.enableSortingRemoval)==null||r)&&(!(n&&(o=t.options.enableMultiRemove)!=null)||o)?!1:s==="desc"?"asc":"desc":i},e.getCanSort=()=>{var n,r;return((n=e.columnDef.enableSorting)!=null?n:!0)&&((r=t.options.enableSorting)!=null?r:!0)&&!!e.accessorFn},e.getCanMultiSort=()=>{var n,r;return(n=(r=e.columnDef.enableMultiSort)!=null?r:t.options.enableMultiSort)!=null?n:!!e.accessorFn},e.getIsSorted=()=>{var n;const r=(n=t.getState().sorting)==null?void 0:n.find(o=>o.id===e.id);return r?r.desc?"desc":"asc":!1},e.getSortIndex=()=>{var n,r;return(n=(r=t.getState().sorting)==null?void 0:r.findIndex(o=>o.id===e.id))!=null?n:-1},e.clearSorting=()=>{t.setSorting(n=>n!=null&&n.length?n.filter(r=>r.id!==e.id):[])},e.getToggleSortingHandler=()=>{const n=e.getCanSort();return r=>{n&&(r.persist==null||r.persist(),e.toggleSorting==null||e.toggleSorting(void 0,e.getCanMultiSort()?t.options.isMultiSortEvent==null?void 0:t.options.isMultiSortEvent(r):!1))}}},createTable:e=>{e.setSorting=t=>e.options.onSortingChange==null?void 0:e.options.onSortingChange(t),e.resetSorting=t=>{var n,r;e.setSorting(t?[]:(n=(r=e.initialState)==null?void 0:r.sorting)!=null?n:[])},e.getPreSortedRowModel=()=>e.getGroupedRowModel(),e.getSortedRowModel=()=>(!e._getSortedRowModel&&e.options.getSortedRowModel&&(e._getSortedRowModel=e.options.getSortedRowModel(e)),e.options.manualSorting||!e._getSortedRowModel?e.getPreSortedRowModel():e._getSortedRowModel())}},Dm=[im,Cm,wm,ym,sm,am,Em,Rm,Am,vm,Tm,Pm,Om,km,xm];function Fm(e){var t,n;process.env.NODE_ENV!=="production"&&(e.debugAll||e.debugTable)&&console.info("Creating Table Instance...");const r=[...Dm,...(t=e._features)!=null?t:[]];let o={_features:r};const i=o._features.reduce((f,d)=>Object.assign(f,d.getDefaultOptions==null?void 0:d.getDefaultOptions(o)),{}),s=f=>o.options.mergeOptions?o.options.mergeOptions(i,f):{...i,...f};let u={...{},...(n=e.initialState)!=null?n:{}};o._features.forEach(f=>{var d;u=(d=f.getInitialState==null?void 0:f.getInitialState(u))!=null?d:u});const c=[];let p=!1;const g={_features:r,options:{...i,...e},initialState:u,_queue:f=>{c.push(f),p||(p=!0,Promise.resolve().then(()=>{for(;c.length;)c.shift()();p=!1}).catch(d=>setTimeout(()=>{throw d})))},reset:()=>{o.setState(o.initialState)},setOptions:f=>{const d=gt(f,o.options);o.options=s(d)},getState:()=>o.options.state,setState:f=>{o.options.onStateChange==null||o.options.onStateChange(f)},_getRowId:(f,d,h)=>{var m;return(m=o.options.getRowId==null?void 0:o.options.getRowId(f,d,h))!=null?m:`${h?[h.id,d].join("."):d}`},getCoreRowModel:()=>(o._getCoreRowModel||(o._getCoreRowModel=o.options.getCoreRowModel(o)),o._getCoreRowModel()),getRowModel:()=>o.getPaginationRowModel(),getRow:(f,d)=>{let h=(d?o.getPrePaginationRowModel():o.getRowModel()).rowsById[f];if(!h&&(h=o.getCoreRowModel().rowsById[f],!h))throw process.env.NODE_ENV!=="production"?new Error(`getRow could not find row with ID: ${f}`):new Error;return h},_getDefaultColumnDef:J(()=>[o.options.defaultColumn],f=>{var d;return f=(d=f)!=null?d:{},{header:h=>{const m=h.header.column.columnDef;return m.accessorKey?m.accessorKey:m.accessorFn?m.id:null},cell:h=>{var m,v;return(m=(v=h.renderValue())==null||v.toString==null?void 0:v.toString())!=null?m:null},...o._features.reduce((h,m)=>Object.assign(h,m.getDefaultColumnDef==null?void 0:m.getDefaultColumnDef()),{}),...f}},Z(e,"debugColumns","_getDefaultColumnDef")),_getColumnDefs:()=>o.options.columns,getAllColumns:J(()=>[o._getColumnDefs()],f=>{const d=function(h,m,v){return v===void 0&&(v=0),h.map(y=>{const O=om(o,y,v,m),x=y;return O.columns=x.columns?d(x.columns,O,v+1):[],O})};return d(f)},Z(e,"debugColumns","getAllColumns")),getAllFlatColumns:J(()=>[o.getAllColumns()],f=>f.flatMap(d=>d.getFlatColumns()),Z(e,"debugColumns","getAllFlatColumns")),_getAllFlatColumnsById:J(()=>[o.getAllFlatColumns()],f=>f.reduce((d,h)=>(d[h.id]=h,d),{}),Z(e,"debugColumns","getAllFlatColumnsById")),getAllLeafColumns:J(()=>[o.getAllColumns(),o._getOrderColumnsFn()],(f,d)=>{let h=f.flatMap(m=>m.getLeafColumns());return d(h)},Z(e,"debugColumns","getAllLeafColumns")),getColumn:f=>{const d=o._getAllFlatColumnsById()[f];return process.env.NODE_ENV!=="production"&&!d&&console.error(`[Table] Column with id '${f}' does not exist.`),d}};Object.assign(o,g);for(let f=0;f<o._features.length;f++){const d=o._features[f];d==null||d.createTable==null||d.createTable(o)}return o}function Vm(){return e=>J(()=>[e.options.data],t=>{const n={rows:[],flatRows:[],rowsById:{}},r=function(o,i,s){i===void 0&&(i=0);const a=[];for(let c=0;c<o.length;c++){const p=Fo(e,e._getRowId(o[c],c,s),o[c],c,i,void 0,s==null?void 0:s.id);if(n.flatRows.push(p),n.rowsById[p.id]=p,a.push(p),e.options.getSubRows){var u;p.originalSubRows=e.options.getSubRows(o[c],c),(u=p.originalSubRows)!=null&&u.length&&(p.subRows=r(p.originalSubRows,i+1,p))}}return a};return n.rows=r(t),n},Z(e.options,"debugTable","getRowModel",()=>e._autoResetPageIndex()))}function Lm(e){const t=[],n=r=>{var o;t.push(r),(o=r.subRows)!=null&&o.length&&r.getIsExpanded()&&r.subRows.forEach(n)};return e.rows.forEach(n),{rows:t,flatRows:e.flatRows,rowsById:e.rowsById}}function Bm(e,t,n){return n.options.filterFromLeafRows?zm(e,t,n):Hm(e,t,n)}function zm(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(u,c){c===void 0&&(c=0);const p=[];for(let f=0;f<u.length;f++){var g;let d=u[f];const h=Fo(n,d.id,d.original,d.index,d.depth,void 0,d.parentId);if(h.columnFilters=d.columnFilters,(g=d.subRows)!=null&&g.length&&c<s){if(h.subRows=a(d.subRows,c+1),d=h,t(d)&&!h.subRows.length){p.push(d),i[d.id]=d,o.push(d);continue}if(t(d)||h.subRows.length){p.push(d),i[d.id]=d,o.push(d);continue}}else d=h,t(d)&&(p.push(d),i[d.id]=d,o.push(d))}return p};return{rows:a(e),flatRows:o,rowsById:i}}function Hm(e,t,n){var r;const o=[],i={},s=(r=n.options.maxLeafRowFilterDepth)!=null?r:100,a=function(u,c){c===void 0&&(c=0);const p=[];for(let f=0;f<u.length;f++){let d=u[f];if(t(d)){var g;if((g=d.subRows)!=null&&g.length&&c<s){const m=Fo(n,d.id,d.original,d.index,d.depth,void 0,d.parentId);m.subRows=a(d.subRows,c+1),d=m}p.push(d),o.push(d),i[d.id]=d}}return p};return{rows:a(e),flatRows:o,rowsById:i}}function Gm(){return e=>J(()=>[e.getPreFilteredRowModel(),e.getState().columnFilters,e.getState().globalFilter],(t,n,r)=>{if(!t.rows.length||!(n!=null&&n.length)&&!r){for(let f=0;f<t.flatRows.length;f++)t.flatRows[f].columnFilters={},t.flatRows[f].columnFiltersMeta={};return t}const o=[],i=[];(n??[]).forEach(f=>{var d;const h=e.getColumn(f.id);if(!h)return;const m=h.getFilterFn();if(!m){process.env.NODE_ENV!=="production"&&console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${h.id}.`);return}o.push({id:f.id,filterFn:m,resolvedValue:(d=m.resolveFilterValue==null?void 0:m.resolveFilterValue(f.value))!=null?d:f.value})});const s=n.map(f=>f.id),a=e.getGlobalFilterFn(),u=e.getAllLeafColumns().filter(f=>f.getCanGlobalFilter());r&&a&&u.length&&(s.push("__global__"),u.forEach(f=>{var d;i.push({id:f.id,filterFn:a,resolvedValue:(d=a.resolveFilterValue==null?void 0:a.resolveFilterValue(r))!=null?d:r})}));let c,p;for(let f=0;f<t.flatRows.length;f++){const d=t.flatRows[f];if(d.columnFilters={},o.length)for(let h=0;h<o.length;h++){c=o[h];const m=c.id;d.columnFilters[m]=c.filterFn(d,m,c.resolvedValue,v=>{d.columnFiltersMeta[m]=v})}if(i.length){for(let h=0;h<i.length;h++){p=i[h];const m=p.id;if(p.filterFn(d,m,p.resolvedValue,v=>{d.columnFiltersMeta[m]=v})){d.columnFilters.__global__=!0;break}}d.columnFilters.__global__!==!0&&(d.columnFilters.__global__=!1)}}const g=f=>{for(let d=0;d<s.length;d++)if(f.columnFilters[s[d]]===!1)return!1;return!0};return Bm(t.rows,g,e)},Z(e.options,"debugTable","getFilteredRowModel",()=>e._autoResetPageIndex()))}function Um(e){return t=>J(()=>[t.getState().pagination,t.getPrePaginationRowModel(),t.options.paginateExpandedRows?void 0:t.getState().expanded],(n,r)=>{if(!r.rows.length)return r;const{pageSize:o,pageIndex:i}=n;let{rows:s,flatRows:a,rowsById:u}=r;const c=o*i,p=c+o;s=s.slice(c,p);let g;t.options.paginateExpandedRows?g={rows:s,flatRows:a,rowsById:u}:g=Lm({rows:s,flatRows:a,rowsById:u}),g.flatRows=[];const f=d=>{g.flatRows.push(d),d.subRows.length&&d.subRows.forEach(f)};return g.rows.forEach(f),g},Z(t.options,"debugTable","getPaginationRowModel"))}function qm(){return e=>J(()=>[e.getState().sorting,e.getPreSortedRowModel()],(t,n)=>{if(!n.rows.length||!(t!=null&&t.length))return n;const r=e.getState().sorting,o=[],i=r.filter(u=>{var c;return(c=e.getColumn(u.id))==null?void 0:c.getCanSort()}),s={};i.forEach(u=>{const c=e.getColumn(u.id);c&&(s[u.id]={sortUndefined:c.columnDef.sortUndefined,invertSorting:c.columnDef.invertSorting,sortingFn:c.getSortingFn()})});const a=u=>{const c=u.map(p=>({...p}));return c.sort((p,g)=>{for(let d=0;d<i.length;d+=1){var f;const h=i[d],m=s[h.id],v=m.sortUndefined,y=(f=h==null?void 0:h.desc)!=null?f:!1;let O=0;if(v){const x=p.getValue(h.id),S=g.getValue(h.id),w=x===void 0,T=S===void 0;if(w||T){if(v==="first")return w?-1:1;if(v==="last")return w?1:-1;O=w&&T?0:w?v:-v}}if(O===0&&(O=m.sortingFn(p,g,h.id)),O!==0)return y&&(O*=-1),m.invertSorting&&(O*=-1),O}return p.index-g.index}),c.forEach(p=>{var g;o.push(p),(g=p.subRows)!=null&&g.length&&(p.subRows=a(p.subRows))}),c};return{rows:a(n.rows),flatRows:o,rowsById:n.rowsById}},Z(e.options,"debugTable","getSortedRowModel",()=>e._autoResetPageIndex()))}/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function is(e,t){return e?Wm(e)?C.createElement(e,t):e:null}function Wm(e){return Xm(e)||typeof e=="function"||Ym(e)}function Xm(e){return typeof e=="function"&&(()=>{const t=Object.getPrototypeOf(e);return t.prototype&&t.prototype.isReactComponent})()}function Ym(e){return typeof e=="object"&&typeof e.$$typeof=="symbol"&&["react.memo","react.forward_ref"].includes(e.$$typeof.description)}function Km(e){const t={state:{},onStateChange:()=>{},renderFallbackValue:null,...e},[n]=C.useState(()=>({current:Fm(t)})),[r,o]=C.useState(()=>n.current.initialState);return n.current.setOptions(i=>({...i,...e,state:{...r,...e.state},onStateChange:s=>{o(s),e.onStateChange==null||e.onStateChange(s)}})),n.current}const zo=N.forwardRef(({className:e,...t},n)=>b.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:b.jsx("table",{ref:n,className:re("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));zo.displayName="Table";const Ho=N.forwardRef(({className:e,...t},n)=>b.jsx("thead",{ref:n,className:re("[&_tr]:pr-border-b",e),...t}));Ho.displayName="TableHeader";const Go=N.forwardRef(({className:e,...t},n)=>b.jsx("tbody",{ref:n,className:re("[&_tr:last-child]:pr-border-0",e),...t}));Go.displayName="TableBody";const La=N.forwardRef(({className:e,...t},n)=>b.jsx("tfoot",{ref:n,className:re("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));La.displayName="TableFooter";const wn=N.forwardRef(({className:e,...t},n)=>b.jsx("tr",{ref:n,className:re("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));wn.displayName="TableRow";const Uo=N.forwardRef(({className:e,...t},n)=>b.jsx("th",{ref:n,className:re("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));Uo.displayName="TableHead";const rr=N.forwardRef(({className:e,...t},n)=>b.jsx("td",{ref:n,className:re("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));rr.displayName="TableCell";const Ba=N.forwardRef(({className:e,...t},n)=>b.jsx("caption",{ref:n,className:re("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ba.displayName="TableCaption";const Jm=xe.Root,Zm=xe.Value,za=C.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(xe.Trigger,{ref:r,className:re("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,b.jsx(xe.Icon,{asChild:!0,children:b.jsx(Te.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));za.displayName=xe.Trigger.displayName;const Ha=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.ScrollUpButton,{ref:n,className:re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(Te.ChevronUp,{className:"pr-h-4 pr-w-4"})}));Ha.displayName=xe.ScrollUpButton.displayName;const Ga=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.ScrollDownButton,{ref:n,className:re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:b.jsx(Te.ChevronDown,{className:"pr-h-4 pr-w-4"})}));Ga.displayName=xe.ScrollDownButton.displayName;const Ua=C.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>b.jsx(xe.Portal,{children:b.jsxs(xe.Content,{ref:o,className:re("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[b.jsx(Ha,{}),b.jsx(xe.Viewport,{className:re("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),b.jsx(Ga,{})]})}));Ua.displayName=xe.Content.displayName;const Qm=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.Label,{ref:n,className:re("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Qm.displayName=xe.Label.displayName;const qa=C.forwardRef(({className:e,children:t,...n},r)=>b.jsxs(xe.Item,{ref:r,className:re("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[b.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:b.jsx(xe.ItemIndicator,{children:b.jsx(Te.Check,{className:"pr-h-4 pr-w-4"})})}),b.jsx(xe.ItemText,{children:t})]}));qa.displayName=xe.Item.displayName;const eh=C.forwardRef(({className:e,...t},n)=>b.jsx(xe.Separator,{ref:n,className:re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));eh.displayName=xe.Separator.displayName;function th({table:e}){return b.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[b.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[b.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),b.jsxs(Jm,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[b.jsx(za,{className:"pr-h-8 pr-w-[70px]",children:b.jsx(Zm,{placeholder:e.getState().pagination.pageSize})}),b.jsx(Ua,{side:"top",children:[10,20,30,40,50].map(t=>b.jsx(qa,{value:`${t}`,children:t},t))})]})]}),b.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),b.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),b.jsx(Te.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),b.jsx(Te.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),b.jsx(Te.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),b.jsxs(ot,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[b.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),b.jsx(Te.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function nh({table:e}){return b.jsxs(fo,{children:[b.jsx(ss.DropdownMenuTrigger,{asChild:!0,children:b.jsxs(ot,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[b.jsx(Te.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),b.jsxs(or,{align:"end",className:"pr-w-[150px]",children:[b.jsx(Rn,{children:"Toggle columns"}),b.jsx(ir,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>b.jsx(mo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function rh({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:i=()=>{}}){var m;const[s,a]=N.useState([]),[u,c]=N.useState([]),[p,g]=N.useState({}),[f,d]=N.useState({}),h=Km({data:t,columns:e,getCoreRowModel:Vm(),...n&&{getPaginationRowModel:Um()},onSortingChange:a,getSortedRowModel:qm(),onColumnFiltersChange:c,getFilteredRowModel:Gm(),onColumnVisibilityChange:g,onRowSelectionChange:d,state:{sorting:s,columnFilters:u,columnVisibility:p,rowSelection:f}});return b.jsxs("div",{children:[o&&b.jsx(nh,{table:h}),b.jsx("div",{className:"pr-twp pr-font-sans",children:b.jsxs(zo,{children:[b.jsx(Ho,{children:h.getHeaderGroups().map(v=>b.jsx(wn,{children:v.headers.map(y=>b.jsx(Uo,{children:y.isPlaceholder?void 0:is(y.column.columnDef.header,y.getContext())},y.id))},v.id))}),b.jsx(Go,{children:(m=h.getRowModel().rows)!=null&&m.length?h.getRowModel().rows.map(v=>b.jsx(wn,{onClick:()=>i(v,h),"data-state":v.getIsSelected()&&"selected",children:v.getVisibleCells().map(y=>b.jsx(rr,{children:is(y.column.columnDef.cell,y.getContext())},y.id))},v.id)):b.jsx(wn,{children:b.jsx(rr,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&b.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[b.jsx(ot,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:"Previous"}),b.jsx(ot,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:"Next"})]}),n&&r&&b.jsx(th,{table:h})]})}function oh({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=N.useRef(void 0);return b.jsx("div",{ref:i,style:{position:"relative"},children:b.jsx(we.AppBar,{position:"static",id:r,children:b.jsxs(we.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?b.jsx(Oa,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?b.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const ih=(e,t)=>{N.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Gr=()=>!1,sh=(e,t)=>{const[n]=nr(N.useCallback(async()=>{if(!e)return Gr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Gr,{preserveValue:!1});N.useEffect(()=>()=>{n!==Gr&&n()},[n])},ah=je.Root,Wa=N.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:re("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Wa.displayName=je.List.displayName;const Xa=N.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,className:re("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Xa.displayName=je.Trigger.displayName;const Ya=N.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:re("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Ya.displayName=je.Content.displayName;const Ka=N.forwardRef(({className:e,...t},n)=>b.jsx(je.Root,{orientation:"vertical",ref:n,className:re("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Ka.displayName=je.List.displayName;const Ja=N.forwardRef(({className:e,...t},n)=>b.jsx(je.List,{ref:n,className:re("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Ja.displayName=je.List.displayName;const lh=N.forwardRef(({className:e,...t},n)=>b.jsx(je.Trigger,{ref:n,...t,className:re("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),Za=N.forwardRef(({className:e,...t},n)=>b.jsx(je.Content,{ref:n,className:re("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));Za.displayName=je.Content.displayName;exports.BookChapterControl=Ul;exports.Button=Wl;exports.ChapterRangeSelector=Xl;exports.Checkbox=ys;exports.Checklist=Yl;exports.ComboBox=qr;exports.ContextMenu=qg;exports.DataTable=rh;exports.DropdownMenu=fo;exports.DropdownMenuCheckboxItem=mo;exports.DropdownMenuContent=or;exports.DropdownMenuGroup=Nl;exports.DropdownMenuItem=go;exports.DropdownMenuLabel=Rn;exports.DropdownMenuPortal=_l;exports.DropdownMenuRadioGroup=Ml;exports.DropdownMenuRadioItem=bs;exports.DropdownMenuSeparator=ir;exports.DropdownMenuShortcut=ws;exports.DropdownMenuSub=$l;exports.DropdownMenuSubContent=vs;exports.DropdownMenuSubTrigger=hs;exports.DropdownMenuTrigger=ms;exports.GridMenu=ha;exports.HamburgerMenuButton=Oa;exports.IconButton=Yg;exports.Input=sr;exports.LabelPosition=Ct;exports.MenuItem=Ao;exports.SearchBar=Jg;exports.Slider=Zg;exports.Snackbar=Qg;exports.Switch=em;exports.Table=zo;exports.TableBody=Go;exports.TableCaption=Ba;exports.TableCell=rr;exports.TableFooter=La;exports.TableHead=Uo;exports.TableHeader=Ho;exports.TableRow=wn;exports.Tabs=ah;exports.TabsContent=Ya;exports.TabsList=Wa;exports.TabsTrigger=Xa;exports.TextField=Na;exports.Toolbar=oh;exports.VerticalTabs=Ka;exports.VerticalTabsContent=Za;exports.VerticalTabsList=Ja;exports.VerticalTabsTrigger=lh;exports.useEvent=ih;exports.useEventAsync=sh;exports.usePromise=nr;function uh(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}uh(`.papi-context-menu-target {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
  position: relative;
}
/*
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
.pr-fixed {
  position: fixed;
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
.pr-right-3 {
  right: 0.75rem;
}
.pr-right-4 {
  right: 1rem;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-mb-2 {
  margin-bottom: 0.5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-2 {
  margin-right: 0.5rem;
}
.pr-ms-5 {
  margin-inline-start: 1.25rem;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-4 {
  margin-top: 1rem;
}
.pr-box-border {
  box-sizing: border-box;
}
.pr-inline-block {
  display: inline-block;
}
.pr-flex {
  display: flex;
}
.pr-inline-flex {
  display: inline-flex;
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
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
}
.pr-w-10 {
  width: 2.5rem;
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
.pr-w-8 {
  width: 2rem;
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
.pr-w-\\[70px\\] {
  width: 70px;
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
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-pointer {
  cursor: pointer;
}
.pr-select-none {
  user-select: none;
}
.pr-flex-row {
  flex-direction: row;
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
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
}
.pr-break-words {
  overflow-wrap: break-word;
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
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-input {
  border-color: hsl(var(--input));
}
.pr-border-muted {
  border-color: hsl(var(--muted));
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
.pr-bg-destructive {
  background-color: hsl(var(--destructive));
}
.pr-bg-muted {
  background-color: hsl(var(--muted));
}
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-popover {
  background-color: hsl(var(--popover));
}
.pr-bg-primary {
  background-color: hsl(var(--primary));
}
.pr-bg-secondary {
  background-color: hsl(var(--secondary));
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
.pr-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pr-pb-3 {
  padding-bottom: 0.75rem;
}
.pr-pb-4 {
  padding-bottom: 1rem;
}
.pr-pl-4 {
  padding-left: 1rem;
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
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-left {
  text-align: left;
}
.pr-text-center {
  text-align: center;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.pr-leading-none {
  line-height: 1;
}
.pr-tracking-widest {
  letter-spacing: 0.1em;
}
.pr-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.pr-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.pr-text-current {
  color: currentColor;
}
.pr-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.pr-text-foreground {
  color: hsl(var(--foreground));
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
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
.pr-text-slate-700 {
  --tw-text-opacity: 1;
  color: rgb(51 65 85 / var(--tw-text-opacity));
}
.pr-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
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
.pr-opacity-50 {
  opacity: 0.5;
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
.pr-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.pr-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
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
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:pr-underline:hover {
  text-decoration-line: underline;
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
.disabled\\:pr-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:pr-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
  opacity: 0.5;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
  opacity: 0.7;
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
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
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
@media (min-width: 1024px) {

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
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
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
`,"top");
//# sourceMappingURL=index.cjs.map
