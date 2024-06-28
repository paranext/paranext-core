"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=require("react/jsx-runtime"),I=require("react"),qe=require("platform-bible-utils"),Ts=require("@radix-ui/react-dropdown-menu"),He=require("lucide-react"),Ee=require("clsx"),Os=require("tailwind-merge"),Cs=require("@radix-ui/react-slot"),Ri=require("class-variance-authority"),ye=require("@mui/material"),Ss=require("@radix-ui/react-popover"),Re=require("cmdk"),Ns=require("@radix-ui/react-dialog"),Sr=require("@mui/styled-engine"),tn=require("react-dom"),Ps=require("@radix-ui/react-label"),jo=require("react-data-grid"),Rs=require("@radix-ui/react-tabs");function Ot(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Ot(I),fe=Ot(Ts),un=Ot(Ss),Ge=Ot(Ns),js=Ot(tn),ji=Ot(Ps),je=Ot(Rs);var Ms=Object.defineProperty,$s=(e,t,n)=>t in e?Ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>($s(e,typeof t!="symbol"?t+"":t,n),n);const wt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Lr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Mi=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Mo=Us();function zt(e,t=!0){return t&&(e=e.toUpperCase()),e in Mo?Mo[e]:0}function Fr(e){return zt(e)>0}function _s(e){const t=typeof e=="string"?zt(e):e;return t>=40&&t<=66}function Is(e){return(typeof e=="string"?zt(e):e)<=39}function $i(e){return e<=66}function As(e){const t=typeof e=="string"?zt(e):e;return Ai(t)&&!$i(t)}function*Ds(){for(let e=1;e<=wt.length;e++)yield e}const Bs=1,_i=wt.length;function Ls(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Vr(e,t="***"){const n=e-1;return n<0||n>=wt.length?t:wt[n]}function Ii(e){return e<=0||e>_i?"******":Mi[e-1]}function Fs(e){return Ii(zt(e))}function Ai(e){const t=typeof e=="number"?Vr(e):e;return Fr(t)&&!Lr.includes(t)}function Vs(e){const t=typeof e=="number"?Vr(e):e;return Fr(t)&&Lr.includes(t)}function zs(e){return Mi[e-1].includes("*obsolete*")}function Us(){const e={};for(let t=0;t<wt.length;t++)e[wt[t]]=t+1;return e}const ue={allBookIds:wt,nonCanonicalIds:Lr,bookIdToNumber:zt,isBookIdValid:Fr,isBookNT:_s,isBookOT:Is,isBookOTNT:$i,isBookDC:As,allBookNumbers:Ds,firstBook:Bs,lastBook:_i,extraBooks:Ls,bookNumberToId:Vr,bookNumberToEnglishName:Ii,bookIdToEnglishName:Fs,isCanonical:Ai,isExtraMaterial:Vs,isObsolete:zs};var st=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(st||{});const _e=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(_e,"Original",new _e(st.Original)),re(_e,"Septuagint",new _e(st.Septuagint)),re(_e,"Vulgate",new _e(st.Vulgate)),re(_e,"English",new _e(st.English)),re(_e,"RussianProtestant",new _e(st.RussianProtestant)),re(_e,"RussianOrthodox",new _e(st.RussianOrthodox));let $t=_e;function $o(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Di=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Di||{});const Se=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,s=n!=null&&n instanceof $t?n:void 0;this.setEmpty(s),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof $t?n:void 0;this.setEmpty(i),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof $t?t:ae.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ae.defaultVersification){const r=new ae(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ae.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Yt)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return ue.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ue.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ue.lastBook)throw new Yt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new $t(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new $t(st[s])}catch{throw new Yt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Yt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ue.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new Yt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=$o(this._verse,r);for(const s of i.map(l=>$o(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const p=this.clone();if(p.verse=s[1],!t)for(let u=c+1;u<p.verseNum;u++){const f=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(p)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ue.lastBook?2:(ue.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ue.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Se,"defaultVersification",$t.English),re(Se,"verseRangeSeparator","-"),re(Se,"verseSequenceIndicator",","),re(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),re(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),re(Se,"chapterDigitShifter",1e3),re(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),re(Se,"bcvMaxValue",Se.chapterDigitShifter-1),re(Se,"ValidStatusType",Di);class Yt extends Error{}function te(...e){return Os.twMerge(Ee.clsx(e))}const Bi=fe.Root,Li=fe.Trigger,qs=fe.Group,Hs=fe.Portal,Ws=fe.Sub,Gs=fe.RadioGroup,Fi=I.forwardRef(({className:e,inset:t,children:n,...r},o)=>m.jsxs(fe.SubTrigger,{ref:o,className:te("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,m.jsx(He.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Fi.displayName=fe.SubTrigger.displayName;const Vi=I.forwardRef(({className:e,...t},n)=>m.jsx(fe.SubContent,{ref:n,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Vi.displayName=fe.SubContent.displayName;const zr=I.forwardRef(({className:e,sideOffset:t=4,...n},r)=>m.jsx(fe.Portal,{children:m.jsx(fe.Content,{ref:r,sideOffset:t,className:te("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));zr.displayName=fe.Content.displayName;const Ur=I.forwardRef(({className:e,inset:t,...n},r)=>m.jsx(fe.Item,{ref:r,className:te("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Ur.displayName=fe.Item.displayName;const zi=I.forwardRef(({className:e,children:t,checked:n,...r},o)=>m.jsxs(fe.CheckboxItem,{ref:o,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[m.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:m.jsx(fe.ItemIndicator,{children:m.jsx(He.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));zi.displayName=fe.CheckboxItem.displayName;const Ui=I.forwardRef(({className:e,children:t,...n},r)=>m.jsxs(fe.RadioItem,{ref:r,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[m.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:m.jsx(fe.ItemIndicator,{children:m.jsx(He.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Ui.displayName=fe.RadioItem.displayName;const Gn=I.forwardRef(({className:e,inset:t,...n},r)=>m.jsx(fe.Label,{ref:r,className:te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Gn.displayName=fe.Label.displayName;const qr=I.forwardRef(({className:e,...t},n)=>m.jsx(fe.Separator,{ref:n,className:te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));qr.displayName=fe.Separator.displayName;function qi({className:e,...t}){return m.jsx("span",{className:te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}qi.displayName="DropdownMenuShortcut";const Xn=I.forwardRef(({className:e,type:t,...n},r)=>m.jsx("input",{type:t,className:te("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Xn.displayName="Input";const Xs=I.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},i)=>m.jsxs("div",{className:"pr-relative",children:[m.jsx(Xn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:i}),m.jsx(He.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function Ys({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const i=Array.from({length:t},(l,c)=>c+1),s=I.useCallback(l=>{o(l)},[o]);return m.jsx("div",{className:te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:i.map(l=>m.jsx("div",{className:te("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const Ks=I.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:i,children:s},l)=>m.jsxs(Ur,{ref:l,textValue:e,className:te("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[m.jsx("span",{className:te("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":i.toLowerCase()==="ot","pr-border-l-purple-200":i.toLowerCase()==="nt","pr-border-l-indigo-200":i.toLowerCase()==="dc"}),children:ue.bookIdToEnglishName(e)}),n&&m.jsx("div",{children:s})]},e));function Js({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return m.jsxs(Gn,{className:"pr-flex pr-justify-between",children:[m.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),m.jsxs("div",{className:"pr-flex pr-items-center",children:[m.jsx(He.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),m.jsx(He.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),m.jsx(He.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const an=ue.allBookIds,Zs={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},_o=["OT","NT","DC"],Qs=32+32+32,el=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],tl=e=>({OT:an.filter(n=>ue.isBookOT(n)),NT:an.filter(n=>ue.isBookNT(n)),DC:an.filter(n=>ue.isBookDC(n))})[e],Kt=e=>qe.getChaptersForBook(ue.bookIdToNumber(e));function nl(){return an.map(t=>ue.bookIdToEnglishName(t))}function rl(e){return nl().includes(e)}function ol(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(rl(t))return an.find(r=>ue.bookIdToEnglishName(r)===t)}function il({scrRef:e,handleSubmit:t}){const[n,r]=I.useState(""),[o,i]=I.useState(ue.bookNumberToId(e.bookNum)),[s,l]=I.useState(e.chapterNum??0),[c,p]=I.useState(ue.bookNumberToId(e.bookNum)),[u,f]=I.useState(!1),[d,v]=I.useState(u),y=I.useRef(void 0),b=I.useRef(void 0),h=I.useRef(void 0),k=I.useCallback(S=>tl(S).filter(j=>{const R=ue.bookIdToEnglishName(j).toLowerCase(),B=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return R.includes(B)||j.toLowerCase().includes(B)}),[n]),$=S=>{r(S)},w=I.useRef(!1),x=I.useCallback(S=>{if(w.current){w.current=!1;return}f(S)},[]),g=I.useCallback((S,j,R,B)=>{if(l(ue.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),j||Kt(S)===-1){t({bookNum:ue.bookIdToNumber(S),chapterNum:R||1,verseNum:B||1}),f(!1),r("");return}i(o!==S?S:""),f(!j)},[t,e.bookNum,e.chapterNum,o]),C=S=>{S<=0||S>Kt(o)||g(o,!0,S)},N=I.useCallback(()=>{el.forEach(S=>{const j=n.match(S);if(j){const[R,B=void 0,D=void 0]=j.slice(1),M=ol(R);(ue.isBookIdValid(R)||M)&&g(M??R,!0,B?parseInt(B,10):1,D?parseInt(D,10):1)}})},[g,n]),F=I.useCallback(S=>{u?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof b<"u"&&b.current!==null&&b.current.focus(),S.preventDefault()):f(!0)},[u]),L=S=>{const{key:j}=S;j==="ArrowRight"||j==="ArrowLeft"||j==="ArrowDown"||j==="ArrowUp"||j==="Enter"||(y.current.dispatchEvent(new KeyboardEvent("keydown",{key:j})),y.current.focus())},V=S=>{const{key:j}=S;if(c===o){if(j==="Enter"){S.preventDefault(),g(o,!0,s);return}let R=0;if(j==="ArrowRight")if(s<Kt(c))R=1;else{S.preventDefault();return}else if(j==="ArrowLeft")if(s>1)R=-1;else{S.preventDefault();return}else j==="ArrowDown"?R=6:j==="ArrowUp"&&(R=-6);s+R<=0||s+R>Kt(c)?l(0):R!==0&&(l(s+R),S.preventDefault())}};return I.useEffect(()=>{o===c?o===ue.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),I.useLayoutEffect(()=>{v(u)},[u]),I.useLayoutEffect(()=>{const S=setTimeout(()=>{if(d&&b.current&&h.current){const R=h.current.offsetTop-Qs;b.current.scrollTo({top:R,behavior:"instant"})}},10);return()=>{clearTimeout(S)}},[d]),m.jsx("div",{className:"pr-flex",children:m.jsxs(Bi,{modal:!1,open:u,onOpenChange:x,children:[m.jsx(Li,{asChild:!0,children:m.jsx(Xs,{ref:y,value:n,handleSearch:$,handleKeyDown:F,handleOnClick:()=>{i(ue.bookNumberToId(e.bookNum)),p(ue.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),f(!0),y.current.focus()},onFocus:()=>{w.current=!0},handleSubmit:N,placeholder:`${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),m.jsxs(zr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:L,align:"start",ref:b,children:[m.jsx(Js,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),_o.map((S,j)=>k(S).length>0&&m.jsxs("div",{children:[m.jsx(Gn,{className:"pr-font-semibold pr-text-slate-700",children:Zs[S]}),k(S).map(R=>m.jsx("div",{children:m.jsx(Ks,{bookId:R,handleSelectBook:()=>g(R,!1),isSelected:o===R,handleHighlightBook:()=>p(R),handleKeyDown:V,bookType:S,ref:B=>{o===R&&(h.current=B)},children:m.jsx(Ys,{handleSelectChapter:C,endChapter:Kt(R),activeChapter:e.bookNum===ue.bookIdToNumber(R)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:B=>{l(B)}})})},R)),_o.length-1!==j?m.jsx(qr,{}):void 0]},S))]})]})})}const al=Ri.cva("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Hr=I.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},i)=>{const s=r?Cs.Slot:"button";return m.jsx(s,{className:te(al({variant:t,size:n,className:e})),ref:i,...o})});Hr.displayName="Button";function mt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return m.jsx(Hr,{id:e,disabled:t,className:te("papi-button",n),onClick:r,onContextMenu:o,children:i})}const sl=un.Root,ll=un.Trigger,Hi=E.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>m.jsx(un.Portal,{children:m.jsx(un.Content,{ref:o,align:t,sideOffset:n,className:te("pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...r})}));Hi.displayName=un.Content.displayName;const cl=Ge.Portal,Wi=E.forwardRef(({className:e,...t},n)=>m.jsx(Ge.Overlay,{ref:n,className:te("pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",e),...t}));Wi.displayName=Ge.Overlay.displayName;const pl=E.forwardRef(({className:e,children:t,...n},r)=>m.jsxs(cl,{children:[m.jsx(Wi,{}),m.jsxs(Ge.Content,{ref:r,className:te("pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",e),...n,children:[t,m.jsxs(Ge.Close,{className:"pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground",children:[m.jsx(He.X,{className:"pr-h-4 pr-w-4"}),m.jsx("span",{className:"pr-sr-only",children:"Close"})]})]})]}));pl.displayName=Ge.Content.displayName;const ul=E.forwardRef(({className:e,...t},n)=>m.jsx(Ge.Title,{ref:n,className:te("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight",e),...t}));ul.displayName=Ge.Title.displayName;const dl=E.forwardRef(({className:e,...t},n)=>m.jsx(Ge.Description,{ref:n,className:te("pr-text-sm pr-text-muted-foreground",e),...t}));dl.displayName=Ge.Description.displayName;const Gi=E.forwardRef(({className:e,...t},n)=>m.jsx(Re.Command,{ref:n,className:te("pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",e),...t}));Gi.displayName=Re.Command.displayName;const Xi=E.forwardRef(({className:e,...t},n)=>m.jsxs("div",{className:"pr-flex pr-items-center pr-border-b pr-px-3","cmdk-input-wrapper":"",children:[m.jsx(He.Search,{className:"pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"}),m.jsx(Re.Command.Input,{ref:n,className:te("pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),...t})]}));Xi.displayName=Re.Command.Input.displayName;const Yi=E.forwardRef(({className:e,...t},n)=>m.jsx(Re.Command.List,{ref:n,className:te("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden",e),...t}));Yi.displayName=Re.Command.List.displayName;const Ki=E.forwardRef((e,t)=>m.jsx(Re.Command.Empty,{ref:t,className:"pr-py-6 pr-text-center pr-text-sm",...e}));Ki.displayName=Re.Command.Empty.displayName;const fl=E.forwardRef(({className:e,...t},n)=>m.jsx(Re.Command.Group,{ref:n,className:te("pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",e),...t}));fl.displayName=Re.Command.Group.displayName;const ml=E.forwardRef(({className:e,...t},n)=>m.jsx(Re.Command.Separator,{ref:n,className:te("pr--mx-1 pr-h-px pr-bg-border",e),...t}));ml.displayName=Re.Command.Separator.displayName;const Ji=E.forwardRef(({className:e,...t},n)=>m.jsx(Re.Command.Item,{ref:n,className:te("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",e),...t}));Ji.displayName=Re.Command.Item.displayName;function hl(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Dn({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:i=hl,buttonPlaceholder:s="",textPlaceholder:l="",commandEmptyMessage:c="No option found",buttonVariant:p="outline"}){const[u,f]=I.useState(!1);return m.jsxs(sl,{open:u,onOpenChange:f,children:[m.jsx(ll,{asChild:!0,children:m.jsxs(Hr,{variant:p,role:"combobox","aria-expanded":u,id:e,className:te("pr-w-[200px] pr-justify-between",n),children:[r?i(r):s,m.jsx(He.ChevronsUpDown,{className:"pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50"})]})}),m.jsx(Hi,{className:"pr-w-[200px] pr-p-0",children:m.jsxs(Gi,{children:[m.jsx(Xi,{placeholder:l,className:"pr-text-inherit"}),m.jsx(Ki,{children:c}),m.jsx(Yi,{children:t.map(d=>m.jsxs(Ji,{value:i(d),onSelect:()=>{o(d),f(!1)},children:[m.jsx(He.Check,{className:te("pr-mr-2 pr-h-4 pr-w-4",{"pr-opacity-0":r&&i(r)!==i(d)})}),i(d)]},i(d)))})]})})]})}function gl({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,i]=I.useState(1),[s,l]=I.useState(r),[c,p]=I.useState(Array.from({length:r},(d,v)=>v+1));I.useEffect(()=>{i(1),e(1),l(r),t(r),p(Array.from({length:r},(d,v)=>v+1))},[r,t,e]);const u=d=>{i(d),e(d),d>s&&(l(d),t(d))},f=d=>{l(d),t(d),d<o&&(i(d),e(d))};return m.jsxs(m.Fragment,{children:[m.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:m.jsx(Dn,{onChange:u,className:"book-selection-chapter",options:c,getOptionLabel:d=>d.toString(),value:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),m.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:m.jsx(Dn,{onChange:f,className:"book-selection-chapter",options:c,getOptionLabel:d=>d.toString(),value:s},"end chapter"),label:"to",labelPlacement:"start"})]})}var bt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(bt||{});function Wr({id:e,isChecked:t,labelText:n="",labelPosition:r=bt.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:l=!1,className:c,onChange:p}){const u=m.jsx(ye.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:p});let f;if(n){const d=r===bt.Before||r===bt.Above,v=m.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),y=r===bt.Before||r===bt.After,b=y?v:m.jsx("div",{children:v}),h=y?u:m.jsx("div",{children:u});f=m.jsxs(ye.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[d&&b,h,!d&&b]})}else f=u;return f}function bl({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:i,createLabel:s}){return m.jsxs("fieldset",{id:e,className:t,children:[n&&m.jsx("legend",{children:n}),r.map(l=>m.jsx(Wr,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>i(l)},l))]})}function de(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function vl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function yl(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Nr={exports:{}},Nn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io;function wl(){if(Io)return se;Io=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function w(g){if(typeof g=="object"&&g!==null){var C=g.$$typeof;switch(C){case t:switch(g=g.type,g){case c:case p:case r:case i:case o:case f:return g;default:switch(g=g&&g.$$typeof,g){case l:case u:case y:case v:case s:return g;default:return C}}case n:return C}}}function x(g){return w(g)===p}return se.AsyncMode=c,se.ConcurrentMode=p,se.ContextConsumer=l,se.ContextProvider=s,se.Element=t,se.ForwardRef=u,se.Fragment=r,se.Lazy=y,se.Memo=v,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(g){return x(g)||w(g)===c},se.isConcurrentMode=x,se.isContextConsumer=function(g){return w(g)===l},se.isContextProvider=function(g){return w(g)===s},se.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},se.isForwardRef=function(g){return w(g)===u},se.isFragment=function(g){return w(g)===r},se.isLazy=function(g){return w(g)===y},se.isMemo=function(g){return w(g)===v},se.isPortal=function(g){return w(g)===n},se.isProfiler=function(g){return w(g)===i},se.isStrictMode=function(g){return w(g)===o},se.isSuspense=function(g){return w(g)===f},se.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===p||g===i||g===o||g===f||g===d||typeof g=="object"&&g!==null&&(g.$$typeof===y||g.$$typeof===v||g.$$typeof===s||g.$$typeof===l||g.$$typeof===u||g.$$typeof===h||g.$$typeof===k||g.$$typeof===$||g.$$typeof===b)},se.typeOf=w,se}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ao;function xl(){return Ao||(Ao=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,d=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function w(_){return typeof _=="string"||typeof _=="function"||_===r||_===p||_===i||_===o||_===f||_===d||typeof _=="object"&&_!==null&&(_.$$typeof===y||_.$$typeof===v||_.$$typeof===s||_.$$typeof===l||_.$$typeof===u||_.$$typeof===h||_.$$typeof===k||_.$$typeof===$||_.$$typeof===b)}function x(_){if(typeof _=="object"&&_!==null){var Z=_.$$typeof;switch(Z){case t:var P=_.type;switch(P){case c:case p:case r:case i:case o:case f:return P;default:var ie=P&&P.$$typeof;switch(ie){case l:case u:case y:case v:case s:return ie;default:return Z}}case n:return Z}}}var g=c,C=p,N=l,F=s,L=t,V=u,S=r,j=y,R=v,B=n,D=i,M=o,z=f,ee=!1;function Q(_){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(_)||x(_)===c}function O(_){return x(_)===p}function A(_){return x(_)===l}function q(_){return x(_)===s}function Y(_){return typeof _=="object"&&_!==null&&_.$$typeof===t}function U(_){return x(_)===u}function H(_){return x(_)===r}function G(_){return x(_)===y}function X(_){return x(_)===v}function W(_){return x(_)===n}function K(_){return x(_)===i}function J(_){return x(_)===o}function oe(_){return x(_)===f}le.AsyncMode=g,le.ConcurrentMode=C,le.ContextConsumer=N,le.ContextProvider=F,le.Element=L,le.ForwardRef=V,le.Fragment=S,le.Lazy=j,le.Memo=R,le.Portal=B,le.Profiler=D,le.StrictMode=M,le.Suspense=z,le.isAsyncMode=Q,le.isConcurrentMode=O,le.isContextConsumer=A,le.isContextProvider=q,le.isElement=Y,le.isForwardRef=U,le.isFragment=H,le.isLazy=G,le.isMemo=X,le.isPortal=W,le.isProfiler=K,le.isStrictMode=J,le.isSuspense=oe,le.isValidElementType=w,le.typeOf=x}()),le}var Do;function Zi(){return Do||(Do=1,process.env.NODE_ENV==="production"?Nn.exports=wl():Nn.exports=xl()),Nn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var dr,Bo;function El(){if(Bo)return dr;Bo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(u){return s[u]});if(c.join("")!=="0123456789")return!1;var p={};return"abcdefghijklmnopqrst".split("").forEach(function(u){p[u]=u}),Object.keys(Object.assign({},p)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return dr=o()?Object.assign:function(i,s){for(var l,c=r(i),p,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){p=e(l);for(var d=0;d<p.length;d++)n.call(l,p[d])&&(c[p[d]]=l[p[d]])}}return c},dr}var fr,Lo;function Gr(){if(Lo)return fr;Lo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return fr=e,fr}var mr,Fo;function Qi(){return Fo||(Fo=1,mr=Function.call.bind(Object.prototype.hasOwnProperty)),mr}var hr,Vo;function kl(){if(Vo)return hr;Vo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Gr(),n={},r=Qi();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,l,c,p){if(process.env.NODE_ENV!=="production"){for(var u in i)if(r(i,u)){var f;try{if(typeof i[u]!="function"){var d=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw d.name="Invariant Violation",d}f=i[u](s,u,c,l,null,t)}catch(y){f=y}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var v=p?p():"";e("Failed "+l+" type: "+f.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},hr=o,hr}var gr,zo;function Tl(){if(zo)return gr;zo=1;var e=Zi(),t=El(),n=Gr(),r=Qi(),o=kl(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return gr=function(l,c){var p=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(O){var A=O&&(p&&O[p]||O[u]);if(typeof A=="function")return A}var d="<<anonymous>>",v={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:$(),arrayOf:w,element:x(),elementType:g(),instanceOf:C,node:V(),objectOf:F,oneOf:N,oneOfType:L,shape:j,exact:R};function y(O,A){return O===A?O!==0||1/O===1/A:O!==O&&A!==A}function b(O,A){this.message=O,this.data=A&&typeof A=="object"?A:{},this.stack=""}b.prototype=Error.prototype;function h(O){if(process.env.NODE_ENV!=="production")var A={},q=0;function Y(H,G,X,W,K,J,oe){if(W=W||d,J=J||X,oe!==n){if(c){var _=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw _.name="Invariant Violation",_}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var Z=W+":"+X;!A[Z]&&q<3&&(i("You are manually calling a React.PropTypes validation function for the `"+J+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),A[Z]=!0,q++)}}return G[X]==null?H?G[X]===null?new b("The "+K+" `"+J+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new b("The "+K+" `"+J+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:O(G,X,W,K,J)}var U=Y.bind(null,!1);return U.isRequired=Y.bind(null,!0),U}function k(O){function A(q,Y,U,H,G,X){var W=q[Y],K=M(W);if(K!==O){var J=z(W);return new b("Invalid "+H+" `"+G+"` of type "+("`"+J+"` supplied to `"+U+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return h(A)}function $(){return h(s)}function w(O){function A(q,Y,U,H,G){if(typeof O!="function")return new b("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside arrayOf.");var X=q[Y];if(!Array.isArray(X)){var W=M(X);return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an array."))}for(var K=0;K<X.length;K++){var J=O(X,K,U,H,G+"["+K+"]",n);if(J instanceof Error)return J}return null}return h(A)}function x(){function O(A,q,Y,U,H){var G=A[q];if(!l(G)){var X=M(G);return new b("Invalid "+U+" `"+H+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement."))}return null}return h(O)}function g(){function O(A,q,Y,U,H){var G=A[q];if(!e.isValidElementType(G)){var X=M(G);return new b("Invalid "+U+" `"+H+"` of type "+("`"+X+"` supplied to `"+Y+"`, expected a single ReactElement type."))}return null}return h(O)}function C(O){function A(q,Y,U,H,G){if(!(q[Y]instanceof O)){var X=O.name||d,W=Q(q[Y]);return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected ")+("instance of `"+X+"`."))}return null}return h(A)}function N(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function A(q,Y,U,H,G){for(var X=q[Y],W=0;W<O.length;W++)if(y(X,O[W]))return null;var K=JSON.stringify(O,function(oe,_){var Z=z(_);return Z==="symbol"?String(_):_});return new b("Invalid "+H+" `"+G+"` of value `"+String(X)+"` "+("supplied to `"+U+"`, expected one of "+K+"."))}return h(A)}function F(O){function A(q,Y,U,H,G){if(typeof O!="function")return new b("Property `"+G+"` of component `"+U+"` has invalid PropType notation inside objectOf.");var X=q[Y],W=M(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type "+("`"+W+"` supplied to `"+U+"`, expected an object."));for(var K in X)if(r(X,K)){var J=O(X,K,U,H,G+"."+K,n);if(J instanceof Error)return J}return null}return h(A)}function L(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var A=0;A<O.length;A++){var q=O[A];if(typeof q!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(q)+" at index "+A+"."),s}function Y(U,H,G,X,W){for(var K=[],J=0;J<O.length;J++){var oe=O[J],_=oe(U,H,G,X,W,n);if(_==null)return null;_.data&&r(_.data,"expectedType")&&K.push(_.data.expectedType)}var Z=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new b("Invalid "+X+" `"+W+"` supplied to "+("`"+G+"`"+Z+"."))}return h(Y)}function V(){function O(A,q,Y,U,H){return B(A[q])?null:new b("Invalid "+U+" `"+H+"` supplied to "+("`"+Y+"`, expected a ReactNode."))}return h(O)}function S(O,A,q,Y,U){return new b((O||"React class")+": "+A+" type `"+q+"."+Y+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+U+"`.")}function j(O){function A(q,Y,U,H,G){var X=q[Y],W=M(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));for(var K in O){var J=O[K];if(typeof J!="function")return S(U,H,G,K,z(J));var oe=J(X,K,U,H,G+"."+K,n);if(oe)return oe}return null}return h(A)}function R(O){function A(q,Y,U,H,G){var X=q[Y],W=M(X);if(W!=="object")return new b("Invalid "+H+" `"+G+"` of type `"+W+"` "+("supplied to `"+U+"`, expected `object`."));var K=t({},q[Y],O);for(var J in K){var oe=O[J];if(r(O,J)&&typeof oe!="function")return S(U,H,G,J,z(oe));if(!oe)return new b("Invalid "+H+" `"+G+"` key `"+J+"` supplied to `"+U+"`.\nBad object: "+JSON.stringify(q[Y],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var _=oe(X,J,U,H,G+"."+J,n);if(_)return _}return null}return h(A)}function B(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(B);if(O===null||l(O))return!0;var A=f(O);if(A){var q=A.call(O),Y;if(A!==O.entries){for(;!(Y=q.next()).done;)if(!B(Y.value))return!1}else for(;!(Y=q.next()).done;){var U=Y.value;if(U&&!B(U[1]))return!1}}else return!1;return!0;default:return!1}}function D(O,A){return O==="symbol"?!0:A?A["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&A instanceof Symbol:!1}function M(O){var A=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":D(A,O)?"symbol":A}function z(O){if(typeof O>"u"||O===null)return""+O;var A=M(O);if(A==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return A}function ee(O){var A=z(O);switch(A){case"array":case"object":return"an "+A;case"boolean":case"date":case"regexp":return"a "+A;default:return A}}function Q(O){return!O.constructor||!O.constructor.name?d:O.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},gr}var br,Uo;function Ol(){if(Uo)return br;Uo=1;var e=Gr();function t(){}function n(){}return n.resetWarningCache=t,br=function(){function r(s,l,c,p,u,f){if(f!==e){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},br}if(process.env.NODE_ENV!=="production"){var Cl=Zi(),Sl=!0;Nr.exports=Tl()(Cl.isElement,Sl)}else Nr.exports=Ol()();var Nl=Nr.exports;const a=vl(Nl);function Ut(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function vt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ea(e){if(!vt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ea(e[n])}),t}function et(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return vt(e)&&vt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(vt(t[o])&&o in e&&vt(e[o])?r[o]=et(e[o],t[o],n):n.clone?r[o]=vt(t[o])?ea(t[o]):t[o]:r[o]=t[o])}),r}function Pl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ta(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Pl(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const na=Ut(a.element,ta);na.isRequired=Ut(a.element.isRequired,ta);const vn=na;function Rl(e){const{prototype:t={}}=e;return!!t.isReactComponent}function jl(e,t,n,r,o){const i=e[t],s=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!Rl(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ml=Ut(a.elementType,jl),$l="exact-prop: ​";function ra(e){return process.env.NODE_ENV==="production"?e:T({},e,{[$l]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function At(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Pr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qo;function _l(){if(qo)return ce;qo=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function b(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case n:case o:case r:case p:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case s:case c:case d:case f:case i:return h;default:return k}}case t:return k}}}return ce.ContextConsumer=s,ce.ContextProvider=i,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=d,ce.Memo=f,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=p,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return b(h)===s},ce.isContextProvider=function(h){return b(h)===i},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return b(h)===c},ce.isFragment=function(h){return b(h)===n},ce.isLazy=function(h){return b(h)===d},ce.isMemo=function(h){return b(h)===f},ce.isPortal=function(h){return b(h)===t},ce.isProfiler=function(h){return b(h)===o},ce.isStrictMode=function(h){return b(h)===r},ce.isSuspense=function(h){return b(h)===p},ce.isSuspenseList=function(h){return b(h)===u},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===p||h===u||h===v||typeof h=="object"&&h!==null&&(h.$$typeof===d||h.$$typeof===f||h.$$typeof===i||h.$$typeof===s||h.$$typeof===c||h.$$typeof===y||h.getModuleId!==void 0)},ce.typeOf=b,ce}var pe={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ho;function Il(){return Ho||(Ho=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),d=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),y=!1,b=!1,h=!1,k=!1,$=!1,w;w=Symbol.for("react.module.reference");function x(P){return!!(typeof P=="string"||typeof P=="function"||P===n||P===o||$||P===r||P===p||P===u||k||P===v||y||b||h||typeof P=="object"&&P!==null&&(P.$$typeof===d||P.$$typeof===f||P.$$typeof===i||P.$$typeof===s||P.$$typeof===c||P.$$typeof===w||P.getModuleId!==void 0))}function g(P){if(typeof P=="object"&&P!==null){var ie=P.$$typeof;switch(ie){case e:var we=P.type;switch(we){case n:case o:case r:case p:case u:return we;default:var Oe=we&&we.$$typeof;switch(Oe){case l:case s:case c:case d:case f:case i:return Oe;default:return ie}}case t:return ie}}}var C=s,N=i,F=e,L=c,V=n,S=d,j=f,R=t,B=o,D=r,M=p,z=u,ee=!1,Q=!1;function O(P){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(P){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function q(P){return g(P)===s}function Y(P){return g(P)===i}function U(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function H(P){return g(P)===c}function G(P){return g(P)===n}function X(P){return g(P)===d}function W(P){return g(P)===f}function K(P){return g(P)===t}function J(P){return g(P)===o}function oe(P){return g(P)===r}function _(P){return g(P)===p}function Z(P){return g(P)===u}pe.ContextConsumer=C,pe.ContextProvider=N,pe.Element=F,pe.ForwardRef=L,pe.Fragment=V,pe.Lazy=S,pe.Memo=j,pe.Portal=R,pe.Profiler=B,pe.StrictMode=D,pe.Suspense=M,pe.SuspenseList=z,pe.isAsyncMode=O,pe.isConcurrentMode=A,pe.isContextConsumer=q,pe.isContextProvider=Y,pe.isElement=U,pe.isForwardRef=H,pe.isFragment=G,pe.isLazy=X,pe.isMemo=W,pe.isPortal=K,pe.isProfiler=J,pe.isStrictMode=oe,pe.isSuspense=_,pe.isSuspenseList=Z,pe.isValidElementType=x,pe.typeOf=g}()),pe}process.env.NODE_ENV==="production"?Pr.exports=_l():Pr.exports=Il();var Bn=Pr.exports;const Al=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Dl(e){const t=`${e}`.match(Al);return t&&t[1]||""}function oa(e,t=""){return e.displayName||e.name||Dl(e)||t}function Wo(e,t,n){const r=oa(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Bl(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return oa(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Bn.ForwardRef:return Wo(e,e.render,"ForwardRef");case Bn.Memo:return Wo(e,e.type,"memo");default:return}}}function tt(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],s=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ll=a.oneOfType([a.func,a.object]),Xr=Ll;function Xe(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":At(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Rr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function ia(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Fl(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Vl(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ke(e){return e&&e.ownerDocument||document}function Dt(e){return ke(e).defaultView||window}function zl(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,s,l,c,p,...u)=>{const f=p||s,d=n==null?void 0:n[f];if(d){const v=d(i,s,l,c,p,...u);if(v)return v}return typeof i[s]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Ln(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ul=typeof window<"u"?E.useLayoutEffect:E.useEffect,xt=Ul;let Go=0;function ql(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(Go+=1,n(`mui-${Go}`))},[t]),r}const Xo=E["useId".toString()];function aa(e){if(Xo!==void 0){const t=Xo();return e??t}return ql(e)}function Hl(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function sa({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,s]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:p}=E.useRef(t);E.useEffect(()=>{!o&&p!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(p=>{o||s(p)},[]);return[l,c]}function dn(e){const t=E.useRef(e);return xt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Fe(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Ln(n,t)})},e)}const Yo={};function Wl(e,t){const n=E.useRef(Yo);return n.current===Yo&&(n.current=e(t)),n}const Gl=[];function Xl(e){E.useEffect(e,Gl)}class yn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new yn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function nn(){const e=Wl(yn.create).current;return Xl(e.disposeEffect),e}let Yn=!0,jr=!1;const Yl=new yn,Kl={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Jl(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Kl[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Zl(e){e.metaKey||e.altKey||e.ctrlKey||(Yn=!0)}function vr(){Yn=!1}function Ql(){this.visibilityState==="hidden"&&jr&&(Yn=!0)}function ec(e){e.addEventListener("keydown",Zl,!0),e.addEventListener("mousedown",vr,!0),e.addEventListener("pointerdown",vr,!0),e.addEventListener("touchstart",vr,!0),e.addEventListener("visibilitychange",Ql,!0)}function tc(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Yn||Jl(t)}function la(){const e=E.useCallback(o=>{o!=null&&ec(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(jr=!0,Yl.start(100,()=>{jr=!1}),t.current=!1,!0):!1}function r(o){return tc(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ca(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function nc(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function rc(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const oc=Number.isInteger||rc;function pa(e,t,n,r){const o=e[t];if(o==null||!oc(o)){const i=nc(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function ua(e,t,...n){return e[t]===void 0?null:pa(e,t,...n)}function Mr(){return null}ua.isRequired=pa;Mr.isRequired=Mr;const da=process.env.NODE_ENV==="production"?Mr:ua;function fa(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(s=>{n[r][s]=fa(o[s],i[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function ot(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const l=t(s);l!==""&&i.push(l),n&&n[s]&&i.push(n[s])}return i},[]).join(" ")}),r}const Ko=e=>e,ic=()=>{let e=Ko;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ko}}},ac=ic(),ma=ac,ha={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ke(e,t,n="Mui"){const r=ha[t];return r?`${n}-${r}`:`${ma.generate(e)}-${t}`}function ct(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ke(e,o,n)}),r}function sc(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ga(e){return typeof e=="string"}function rn(e,t,n){return e===void 0||ga(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const lc={disableDefaultClasses:!1},cc=E.createContext(lc);function pc(e){const{disableDefaultClasses:t}=E.useContext(cc);return n=>t?"":e(n)}function ba(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function uc(e,t,n){return typeof e=="function"?e(t,n):e}function Jo(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function dc(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const v=Ee(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),y=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=T({},n,o,r);return v.length>0&&(b.className=v),Object.keys(y).length>0&&(b.style=y),{props:b,internalRef:void 0}}const s=ba(T({},o,r)),l=Jo(r),c=Jo(o),p=t(s),u=Ee(p==null?void 0:p.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=T({},p==null?void 0:p.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),d=T({},p,n,c,l);return u.length>0&&(d.className=u),Object.keys(f).length>0&&(d.style=f),{props:d,internalRef:p.ref}}const fc=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Et(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=de(e,fc),l=i?{}:uc(r,o),{props:c,internalRef:p}=dc(T({},s,{externalSlotProps:l})),u=Fe(p,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return rn(n,T({},c,{ref:u}),o)}const va="base";function mc(e){return`${va}--${e}`}function hc(e,t){return`${va}-${e}-${t}`}function ya(e,t){const n=ha[t];return n?mc(n):hc(e,t)}function gc(e,t){const n={};return t.forEach(r=>{n[r]=ya(e,r)}),n}const bc=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function vc(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function yc(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function wc(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||yc(e))}function xc(e){const t=[],n=[];return Array.from(e.querySelectorAll(bc)).forEach((r,o)=>{const i=vc(r);i===-1||!wc(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Ec(){return!0}function Fn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=xc,isEnabled:s=Ec,open:l}=e,c=E.useRef(!1),p=E.useRef(null),u=E.useRef(null),f=E.useRef(null),d=E.useRef(null),v=E.useRef(!1),y=E.useRef(null),b=Fe(t.ref,y),h=E.useRef(null);E.useEffect(()=>{!l||!y.current||(v.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current);return y.current.contains(w.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),v.current&&y.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!y.current)return;const w=ke(y.current),x=N=>{h.current=N,!(r||!s()||N.key!=="Tab")&&w.activeElement===y.current&&N.shiftKey&&(c.current=!0,u.current&&u.current.focus())},g=()=>{const N=y.current;if(N===null)return;if(!w.hasFocus()||!s()||c.current){c.current=!1;return}if(N.contains(w.activeElement)||r&&w.activeElement!==p.current&&w.activeElement!==u.current)return;if(w.activeElement!==d.current)d.current=null;else if(d.current!==null)return;if(!v.current)return;let F=[];if((w.activeElement===p.current||w.activeElement===u.current)&&(F=i(y.current)),F.length>0){var L,V;const S=!!((L=h.current)!=null&&L.shiftKey&&((V=h.current)==null?void 0:V.key)==="Tab"),j=F[0],R=F[F.length-1];typeof j!="string"&&typeof R!="string"&&(S?R.focus():j.focus())}else N.focus()};w.addEventListener("focusin",g),w.addEventListener("keydown",x,!0);const C=setInterval(()=>{w.activeElement&&w.activeElement.tagName==="BODY"&&g()},50);return()=>{clearInterval(C),w.removeEventListener("focusin",g),w.removeEventListener("keydown",x,!0)}},[n,r,o,s,l,i]);const k=w=>{f.current===null&&(f.current=w.relatedTarget),v.current=!0,d.current=w.target;const x=t.props.onFocus;x&&x(w)},$=w=>{f.current===null&&(f.current=w.relatedTarget),v.current=!0};return m.jsxs(E.Fragment,{children:[m.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:p,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:b,onFocus:k}),m.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Fn.propTypes={children:vn,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(Fn["propTypes"]=ra(Fn.propTypes));function kc(e){return typeof e=="function"?e():e}const fn=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[s,l]=E.useState(null),c=Fe(E.isValidElement(r)?r.ref:null,n);if(xt(()=>{i||l(kc(o)||document.body)},[o,i]),xt(()=>{if(s&&!i)return Ln(n,s),()=>{Ln(n,null)}},[n,s,i]),i){if(E.isValidElement(r)){const p={ref:c};return E.cloneElement(r,p)}return m.jsx(E.Fragment,{children:r})}return m.jsx(E.Fragment,{children:s&&js.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(fn.propTypes={children:a.node,container:a.oneOfType([tt,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&(fn["propTypes"]=ra(fn.propTypes));function Tc(e){const t=ke(e);return t.body===e?Dt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function sn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Zo(e){return parseInt(Dt(e).getComputedStyle(e).paddingRight,10)||0}function Oc(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Qo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,s=>{const l=i.indexOf(s)===-1,c=!Oc(s);l&&c&&sn(s,o)})}function yr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Cc(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Tc(r)){const s=ca(ke(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Zo(r)+s}px`;const l=ke(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Zo(c)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ke(r).body;else{const s=r.parentElement,l=Dt(r);i=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:s,property:l})=>{i?s.style.setProperty(l,i):s.style.removeProperty(l)})}}function Sc(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Nc{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&sn(t.modalRef,!1);const o=Sc(n);Qo(n,t.mount,t.modalRef,o,!0);const i=yr(this.containers,s=>s.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=yr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Cc(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=yr(this.containers,s=>s.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&sn(t.modalRef,n),Qo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&sn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Pc(e){return typeof e=="function"?e():e}function Rc(e){return e?e.props.hasOwnProperty("in"):!1}const jc=new Nc;function Mc(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=jc,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:p,open:u,rootRef:f}=e,d=E.useRef({}),v=E.useRef(null),y=E.useRef(null),b=Fe(y,f),[h,k]=E.useState(!u),$=Rc(c);let w=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(w=!1);const x=()=>ke(v.current),g=()=>(d.current.modalRef=y.current,d.current.mount=v.current,d.current),C=()=>{o.mount(g(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},N=dn(()=>{const M=Pc(t)||x().body;o.add(g(),M),y.current&&C()}),F=E.useCallback(()=>o.isTopModal(g()),[o]),L=dn(M=>{v.current=M,M&&(u&&F()?C():y.current&&sn(y.current,w))}),V=E.useCallback(()=>{o.remove(g(),w)},[w,o]);E.useEffect(()=>()=>{V()},[V]),E.useEffect(()=>{u?N():(!$||!i)&&V()},[u,V,$,i,N]);const S=M=>z=>{var ee;(ee=M.onKeyDown)==null||ee.call(M,z),!(z.key!=="Escape"||z.which===229||!F())&&(n||(z.stopPropagation(),p&&p(z,"escapeKeyDown")))},j=M=>z=>{var ee;(ee=M.onClick)==null||ee.call(M,z),z.target===z.currentTarget&&p&&p(z,"backdropClick")};return{getRootProps:(M={})=>{const z=ba(e);delete z.onTransitionEnter,delete z.onTransitionExited;const ee=T({},z,M);return T({role:"presentation"},ee,{onKeyDown:S(ee),ref:b})},getBackdropProps:(M={})=>{const z=M;return T({"aria-hidden":!0},z,{onClick:j(z),open:u})},getTransitionProps:()=>{const M=()=>{k(!1),s&&s()},z=()=>{k(!0),l&&l(),i&&V()};return{onEnter:Rr(M,c==null?void 0:c.props.onEnter),onExited:Rr(z,c==null?void 0:c.props.onExited)}},rootRef:b,portalRef:L,isTopModal:F,exited:h,hasTransition:$}}var Ne="top",Ve="bottom",ze="right",Pe="left",Yr="auto",wn=[Ne,Ve,ze,Pe],Bt="start",mn="end",$c="clippingParents",wa="viewport",Jt="popper",_c="reference",ei=wn.reduce(function(e,t){return e.concat([t+"-"+Bt,t+"-"+mn])},[]),xa=[].concat(wn,[Yr]).reduce(function(e,t){return e.concat([t,t+"-"+Bt,t+"-"+mn])},[]),Ic="beforeRead",Ac="read",Dc="afterRead",Bc="beforeMain",Lc="main",Fc="afterMain",Vc="beforeWrite",zc="write",Uc="afterWrite",qc=[Ic,Ac,Dc,Bc,Lc,Fc,Vc,zc,Uc];function Ye(e){return e?(e.nodeName||"").toLowerCase():null}function Ae(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function kt(e){var t=Ae(e).Element;return e instanceof t||e instanceof Element}function Le(e){var t=Ae(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Kr(e){if(typeof ShadowRoot>"u")return!1;var t=Ae(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Hc(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Le(i)||!Ye(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?i.removeAttribute(s):i.setAttribute(s,l===!0?"":l)}))})}function Wc(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,p){return c[p]="",c},{});!Le(o)||!Ye(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const Gc={name:"applyStyles",enabled:!0,phase:"write",fn:Hc,effect:Wc,requires:["computeStyles"]};function We(e){return e.split("-")[0]}var yt=Math.max,Vn=Math.min,Lt=Math.round;function $r(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ea(){return!/^((?!chrome|android).)*safari/i.test($r())}function Ft(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Le(e)&&(o=e.offsetWidth>0&&Lt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Lt(r.height)/e.offsetHeight||1);var s=kt(e)?Ae(e):window,l=s.visualViewport,c=!Ea()&&n,p=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,d=r.height/i;return{width:f,height:d,top:u,right:p+f,bottom:u+d,left:p,x:p,y:u}}function Jr(e){var t=Ft(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ka(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Kr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function nt(e){return Ae(e).getComputedStyle(e)}function Xc(e){return["table","td","th"].indexOf(Ye(e))>=0}function pt(e){return((kt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Kn(e){return Ye(e)==="html"?e:e.assignedSlot||e.parentNode||(Kr(e)?e.host:null)||pt(e)}function ti(e){return!Le(e)||nt(e).position==="fixed"?null:e.offsetParent}function Yc(e){var t=/firefox/i.test($r()),n=/Trident/i.test($r());if(n&&Le(e)){var r=nt(e);if(r.position==="fixed")return null}var o=Kn(e);for(Kr(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ye(o))<0;){var i=nt(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function xn(e){for(var t=Ae(e),n=ti(e);n&&Xc(n)&&nt(n).position==="static";)n=ti(n);return n&&(Ye(n)==="html"||Ye(n)==="body"&&nt(n).position==="static")?t:n||Yc(e)||t}function Zr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ln(e,t,n){return yt(e,Vn(t,n))}function Kc(e,t,n){var r=ln(e,t,n);return r>n?n:r}function Ta(){return{top:0,right:0,bottom:0,left:0}}function Oa(e){return Object.assign({},Ta(),e)}function Ca(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Jc=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Oa(typeof t!="number"?t:Ca(t,wn))};function Zc(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,s=n.modifiersData.popperOffsets,l=We(n.placement),c=Zr(l),p=[Pe,ze].indexOf(l)>=0,u=p?"height":"width";if(!(!i||!s)){var f=Jc(o.padding,n),d=Jr(i),v=c==="y"?Ne:Pe,y=c==="y"?Ve:ze,b=n.rects.reference[u]+n.rects.reference[c]-s[c]-n.rects.popper[u],h=s[c]-n.rects.reference[c],k=xn(i),$=k?c==="y"?k.clientHeight||0:k.clientWidth||0:0,w=b/2-h/2,x=f[v],g=$-d[u]-f[y],C=$/2-d[u]/2+w,N=ln(x,C,g),F=c;n.modifiersData[r]=(t={},t[F]=N,t.centerOffset=N-C,t)}}function Qc(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ka(t.elements.popper,o)&&(t.elements.arrow=o))}const ep={name:"arrow",enabled:!0,phase:"main",fn:Zc,effect:Qc,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Vt(e){return e.split("-")[1]}var tp={top:"auto",right:"auto",bottom:"auto",left:"auto"};function np(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Lt(n*o)/o||0,y:Lt(r*o)/o||0}}function ni(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,p=e.adaptive,u=e.roundOffsets,f=e.isFixed,d=s.x,v=d===void 0?0:d,y=s.y,b=y===void 0?0:y,h=typeof u=="function"?u({x:v,y:b}):{x:v,y:b};v=h.x,b=h.y;var k=s.hasOwnProperty("x"),$=s.hasOwnProperty("y"),w=Pe,x=Ne,g=window;if(p){var C=xn(n),N="clientHeight",F="clientWidth";if(C===Ae(n)&&(C=pt(n),nt(C).position!=="static"&&l==="absolute"&&(N="scrollHeight",F="scrollWidth")),C=C,o===Ne||(o===Pe||o===ze)&&i===mn){x=Ve;var L=f&&C===g&&g.visualViewport?g.visualViewport.height:C[N];b-=L-r.height,b*=c?1:-1}if(o===Pe||(o===Ne||o===Ve)&&i===mn){w=ze;var V=f&&C===g&&g.visualViewport?g.visualViewport.width:C[F];v-=V-r.width,v*=c?1:-1}}var S=Object.assign({position:l},p&&tp),j=u===!0?np({x:v,y:b},Ae(n)):{x:v,y:b};if(v=j.x,b=j.y,c){var R;return Object.assign({},S,(R={},R[x]=$?"0":"",R[w]=k?"0":"",R.transform=(g.devicePixelRatio||1)<=1?"translate("+v+"px, "+b+"px)":"translate3d("+v+"px, "+b+"px, 0)",R))}return Object.assign({},S,(t={},t[x]=$?b+"px":"",t[w]=k?v+"px":"",t.transform="",t))}function rp(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,s=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,p={placement:We(t.placement),variation:Vt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,ni(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,ni(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const op={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:rp,data:{}};var Pn={passive:!0};function ip(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Ae(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach(function(u){u.addEventListener("scroll",n.update,Pn)}),l&&c.addEventListener("resize",n.update,Pn),function(){i&&p.forEach(function(u){u.removeEventListener("scroll",n.update,Pn)}),l&&c.removeEventListener("resize",n.update,Pn)}}const ap={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:ip,data:{}};var sp={left:"right",right:"left",bottom:"top",top:"bottom"};function $n(e){return e.replace(/left|right|bottom|top/g,function(t){return sp[t]})}var lp={start:"end",end:"start"};function ri(e){return e.replace(/start|end/g,function(t){return lp[t]})}function Qr(e){var t=Ae(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function eo(e){return Ft(pt(e)).left+Qr(e).scrollLeft}function cp(e,t){var n=Ae(e),r=pt(e),o=n.visualViewport,i=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){i=o.width,s=o.height;var p=Ea();(p||!p&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:s,x:l+eo(e),y:c}}function pp(e){var t,n=pt(e),r=Qr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=yt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=yt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+eo(e),c=-r.scrollTop;return nt(o||n).direction==="rtl"&&(l+=yt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:s,x:l,y:c}}function to(e){var t=nt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Sa(e){return["html","body","#document"].indexOf(Ye(e))>=0?e.ownerDocument.body:Le(e)&&to(e)?e:Sa(Kn(e))}function cn(e,t){var n;t===void 0&&(t=[]);var r=Sa(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Ae(r),s=o?[i].concat(i.visualViewport||[],to(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(cn(Kn(s)))}function _r(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function up(e,t){var n=Ft(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function oi(e,t,n){return t===wa?_r(cp(e,n)):kt(t)?up(t,n):_r(pp(pt(e)))}function dp(e){var t=cn(Kn(e)),n=["absolute","fixed"].indexOf(nt(e).position)>=0,r=n&&Le(e)?xn(e):e;return kt(r)?t.filter(function(o){return kt(o)&&ka(o,r)&&Ye(o)!=="body"}):[]}function fp(e,t,n,r){var o=t==="clippingParents"?dp(e):[].concat(t),i=[].concat(o,[n]),s=i[0],l=i.reduce(function(c,p){var u=oi(e,p,r);return c.top=yt(u.top,c.top),c.right=Vn(u.right,c.right),c.bottom=Vn(u.bottom,c.bottom),c.left=yt(u.left,c.left),c},oi(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Na(e){var t=e.reference,n=e.element,r=e.placement,o=r?We(r):null,i=r?Vt(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ne:c={x:s,y:t.y-n.height};break;case Ve:c={x:s,y:t.y+t.height};break;case ze:c={x:t.x+t.width,y:l};break;case Pe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var p=o?Zr(o):null;if(p!=null){var u=p==="y"?"height":"width";switch(i){case Bt:c[p]=c[p]-(t[u]/2-n[u]/2);break;case mn:c[p]=c[p]+(t[u]/2-n[u]/2);break}}return c}function hn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,s=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?$c:l,p=n.rootBoundary,u=p===void 0?wa:p,f=n.elementContext,d=f===void 0?Jt:f,v=n.altBoundary,y=v===void 0?!1:v,b=n.padding,h=b===void 0?0:b,k=Oa(typeof h!="number"?h:Ca(h,wn)),$=d===Jt?_c:Jt,w=e.rects.popper,x=e.elements[y?$:d],g=fp(kt(x)?x:x.contextElement||pt(e.elements.popper),c,u,s),C=Ft(e.elements.reference),N=Na({reference:C,element:w,strategy:"absolute",placement:o}),F=_r(Object.assign({},w,N)),L=d===Jt?F:C,V={top:g.top-L.top+k.top,bottom:L.bottom-g.bottom+k.bottom,left:g.left-L.left+k.left,right:L.right-g.right+k.right},S=e.modifiersData.offset;if(d===Jt&&S){var j=S[o];Object.keys(V).forEach(function(R){var B=[ze,Ve].indexOf(R)>=0?1:-1,D=[Ne,Ve].indexOf(R)>=0?"y":"x";V[R]+=j[D]*B})}return V}function mp(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,p=c===void 0?xa:c,u=Vt(r),f=u?l?ei:ei.filter(function(y){return Vt(y)===u}):wn,d=f.filter(function(y){return p.indexOf(y)>=0});d.length===0&&(d=f);var v=d.reduce(function(y,b){return y[b]=hn(e,{placement:b,boundary:o,rootBoundary:i,padding:s})[We(b)],y},{});return Object.keys(v).sort(function(y,b){return v[y]-v[b]})}function hp(e){if(We(e)===Yr)return[];var t=$n(e);return[ri(e),t,ri(t)]}function gp(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,p=n.padding,u=n.boundary,f=n.rootBoundary,d=n.altBoundary,v=n.flipVariations,y=v===void 0?!0:v,b=n.allowedAutoPlacements,h=t.options.placement,k=We(h),$=k===h,w=c||($||!y?[$n(h)]:hp(h)),x=[h].concat(w).reduce(function(U,H){return U.concat(We(H)===Yr?mp(t,{placement:H,boundary:u,rootBoundary:f,padding:p,flipVariations:y,allowedAutoPlacements:b}):H)},[]),g=t.rects.reference,C=t.rects.popper,N=new Map,F=!0,L=x[0],V=0;V<x.length;V++){var S=x[V],j=We(S),R=Vt(S)===Bt,B=[Ne,Ve].indexOf(j)>=0,D=B?"width":"height",M=hn(t,{placement:S,boundary:u,rootBoundary:f,altBoundary:d,padding:p}),z=B?R?ze:Pe:R?Ve:Ne;g[D]>C[D]&&(z=$n(z));var ee=$n(z),Q=[];if(i&&Q.push(M[j]<=0),l&&Q.push(M[z]<=0,M[ee]<=0),Q.every(function(U){return U})){L=S,F=!1;break}N.set(S,Q)}if(F)for(var O=y?3:1,A=function(H){var G=x.find(function(X){var W=N.get(X);if(W)return W.slice(0,H).every(function(K){return K})});if(G)return L=G,"break"},q=O;q>0;q--){var Y=A(q);if(Y==="break")break}t.placement!==L&&(t.modifiersData[r]._skip=!0,t.placement=L,t.reset=!0)}}const bp={name:"flip",enabled:!0,phase:"main",fn:gp,requiresIfExists:["offset"],data:{_skip:!1}};function ii(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ai(e){return[Ne,ze,Ve,Pe].some(function(t){return e[t]>=0})}function vp(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,s=hn(t,{elementContext:"reference"}),l=hn(t,{altBoundary:!0}),c=ii(s,r),p=ii(l,o,i),u=ai(c),f=ai(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const yp={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:vp};function wp(e,t,n){var r=We(e),o=[Pe,Ne].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=i[0],l=i[1];return s=s||0,l=(l||0)*o,[Pe,ze].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function xp(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,s=xa.reduce(function(u,f){return u[f]=wp(f,t.rects,i),u},{}),l=s[t.placement],c=l.x,p=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=s}const Ep={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:xp};function kp(e){var t=e.state,n=e.name;t.modifiersData[n]=Na({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Tp={name:"popperOffsets",enabled:!0,phase:"read",fn:kp,data:{}};function Op(e){return e==="x"?"y":"x"}function Cp(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,p=n.rootBoundary,u=n.altBoundary,f=n.padding,d=n.tether,v=d===void 0?!0:d,y=n.tetherOffset,b=y===void 0?0:y,h=hn(t,{boundary:c,rootBoundary:p,padding:f,altBoundary:u}),k=We(t.placement),$=Vt(t.placement),w=!$,x=Zr(k),g=Op(x),C=t.modifiersData.popperOffsets,N=t.rects.reference,F=t.rects.popper,L=typeof b=="function"?b(Object.assign({},t.rects,{placement:t.placement})):b,V=typeof L=="number"?{mainAxis:L,altAxis:L}:Object.assign({mainAxis:0,altAxis:0},L),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,j={x:0,y:0};if(C){if(i){var R,B=x==="y"?Ne:Pe,D=x==="y"?Ve:ze,M=x==="y"?"height":"width",z=C[x],ee=z+h[B],Q=z-h[D],O=v?-F[M]/2:0,A=$===Bt?N[M]:F[M],q=$===Bt?-F[M]:-N[M],Y=t.elements.arrow,U=v&&Y?Jr(Y):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ta(),G=H[B],X=H[D],W=ln(0,N[M],U[M]),K=w?N[M]/2-O-W-G-V.mainAxis:A-W-G-V.mainAxis,J=w?-N[M]/2+O+W+X+V.mainAxis:q+W+X+V.mainAxis,oe=t.elements.arrow&&xn(t.elements.arrow),_=oe?x==="y"?oe.clientTop||0:oe.clientLeft||0:0,Z=(R=S==null?void 0:S[x])!=null?R:0,P=z+K-Z-_,ie=z+J-Z,we=ln(v?Vn(ee,P):ee,z,v?yt(Q,ie):Q);C[x]=we,j[x]=we-z}if(l){var Oe,be=x==="x"?Ne:Pe,dt=x==="x"?Ve:ze,Ce=C[g],Je=g==="y"?"height":"width",Me=Ce+h[be],Ze=Ce-h[dt],xe=[Ne,Pe].indexOf(k)!==-1,Ct=(Oe=S==null?void 0:S[g])!=null?Oe:0,ft=xe?Me:Ce-N[Je]-F[Je]-Ct+V.altAxis,qt=xe?Ce+N[Je]+F[Je]-Ct-V.altAxis:Ze,On=v&&xe?Kc(ft,Ce,qt):ln(v?ft:Me,Ce,v?qt:Ze);C[g]=On,j[g]=On-Ce}t.modifiersData[r]=j}}const Sp={name:"preventOverflow",enabled:!0,phase:"main",fn:Cp,requiresIfExists:["offset"]};function Np(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Pp(e){return e===Ae(e)||!Le(e)?Qr(e):Np(e)}function Rp(e){var t=e.getBoundingClientRect(),n=Lt(t.width)/e.offsetWidth||1,r=Lt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function jp(e,t,n){n===void 0&&(n=!1);var r=Le(t),o=Le(t)&&Rp(t),i=pt(t),s=Ft(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ye(t)!=="body"||to(i))&&(l=Pp(t)),Le(t)?(c=Ft(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=eo(i))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Mp(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function $p(e){var t=Mp(e);return qc.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function _p(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Ip(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var si={placement:"bottom",modifiers:[],strategy:"absolute"};function li(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Ap(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?si:o;return function(l,c,p){p===void 0&&(p=i);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},si,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],d=!1,v={state:u,setOptions:function(k){var $=typeof k=="function"?k(u.options):k;b(),u.options=Object.assign({},i,u.options,$),u.scrollParents={reference:kt(l)?cn(l):l.contextElement?cn(l.contextElement):[],popper:cn(c)};var w=$p(Ip([].concat(r,u.options.modifiers)));return u.orderedModifiers=w.filter(function(x){return x.enabled}),y(),v.update()},forceUpdate:function(){if(!d){var k=u.elements,$=k.reference,w=k.popper;if(li($,w)){u.rects={reference:jp($,xn(w),u.options.strategy==="fixed"),popper:Jr(w)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(V){return u.modifiersData[V.name]=Object.assign({},V.data)});for(var x=0;x<u.orderedModifiers.length;x++){if(u.reset===!0){u.reset=!1,x=-1;continue}var g=u.orderedModifiers[x],C=g.fn,N=g.options,F=N===void 0?{}:N,L=g.name;typeof C=="function"&&(u=C({state:u,options:F,name:L,instance:v})||u)}}}},update:_p(function(){return new Promise(function(h){v.forceUpdate(),h(u)})}),destroy:function(){b(),d=!0}};if(!li(l,c))return v;v.setOptions(p).then(function(h){!d&&p.onFirstUpdate&&p.onFirstUpdate(h)});function y(){u.orderedModifiers.forEach(function(h){var k=h.name,$=h.options,w=$===void 0?{}:$,x=h.effect;if(typeof x=="function"){var g=x({state:u,name:k,instance:v,options:w}),C=function(){};f.push(g||C)}})}function b(){f.forEach(function(h){return h()}),f=[]}return v}}var Dp=[ap,Tp,op,Gc,Ep,bp,Sp,ep,yp],Bp=Ap({defaultModifiers:Dp});const Pa="Popper";function Lp(e){return ya(Pa,e)}gc(Pa,["root"]);const Fp=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Vp=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function zp(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function zn(e){return typeof e=="function"?e():e}function Jn(e){return e.nodeType!==void 0}function Up(e){return!Jn(e)}const qp=()=>ot({root:["root"]},pc(Lp)),Hp={},Wp=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:s,disablePortal:l,modifiers:c,open:p,placement:u,popperOptions:f,popperRef:d,slotProps:v={},slots:y={},TransitionProps:b}=t,h=de(t,Fp),k=E.useRef(null),$=Fe(k,n),w=E.useRef(null),x=Fe(w,d),g=E.useRef(x);xt(()=>{g.current=x},[x]),E.useImperativeHandle(d,()=>w.current,[]);const C=zp(u,s),[N,F]=E.useState(C),[L,V]=E.useState(zn(o));E.useEffect(()=>{w.current&&w.current.forceUpdate()}),E.useEffect(()=>{o&&V(zn(o))},[o]),xt(()=>{if(!L||!p)return;const D=ee=>{F(ee.placement)};if(process.env.NODE_ENV!=="production"&&L&&Jn(L)&&L.nodeType===1){const ee=L.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{D(ee)}}];c!=null&&(M=M.concat(c)),f&&f.modifiers!=null&&(M=M.concat(f.modifiers));const z=Bp(L,k.current,T({placement:C},f,{modifiers:M}));return g.current(z),()=>{z.destroy(),g.current(null)}},[L,l,c,p,f,C]);const S={placement:N};b!==null&&(S.TransitionProps=b);const j=qp(),R=(r=y.root)!=null?r:"div",B=Et({elementType:R,externalSlotProps:v.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:j.root});return m.jsx(R,T({},B,{children:typeof i=="function"?i(S):i}))}),Ra=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:p,open:u,placement:f="bottom",popperOptions:d=Hp,popperRef:v,style:y,transition:b=!1,slotProps:h={},slots:k={}}=t,$=de(t,Vp),[w,x]=E.useState(!0),g=()=>{x(!1)},C=()=>{x(!0)};if(!c&&!u&&(!b||w))return null;let N;if(i)N=i;else if(r){const V=zn(r);N=V&&Jn(V)?ke(V).body:ke(null).body}const F=!u&&c&&(!b||w)?"none":void 0,L=b?{in:u,onEnter:g,onExited:C}:void 0;return m.jsx(fn,{disablePortal:l,container:N,children:m.jsx(Wp,T({anchorEl:r,direction:s,disablePortal:l,modifiers:p,ref:n,open:b?!w:u,placement:f,popperOptions:d,popperRef:v,slotProps:h,slots:k},$,{style:T({position:"fixed",top:0,left:0,display:F},y),TransitionProps:L,children:o}))})});process.env.NODE_ENV!=="production"&&(Ra.propTypes={anchorEl:Ut(a.oneOfType([tt,a.object,a.func]),e=>{if(e.open){const t=zn(e.anchorEl);if(t&&Jn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Up(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:a.oneOfType([a.node,a.func]),container:a.oneOfType([tt,a.func]),direction:a.oneOf(["ltr","rtl"]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:Xr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),transition:a.bool});const Gp=["values","unit","step"],Xp=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function Yp(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=de(e,Gp),i=Xp(t),s=Object.keys(i);function l(d){return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n})`}function c(d){return`@media (max-width:${(typeof t[d]=="number"?t[d]:d)-r/100}${n})`}function p(d,v){const y=s.indexOf(v);return`@media (min-width:${typeof t[d]=="number"?t[d]:d}${n}) and (max-width:${(y!==-1&&typeof t[s[y]]=="number"?t[s[y]]:v)-r/100}${n})`}function u(d){return s.indexOf(d)+1<s.length?p(d,s[s.indexOf(d)+1]):l(d)}function f(d){const v=s.indexOf(d);return v===0?l(s[1]):v===s.length-1?c(s[v]):p(d,s[s.indexOf(d)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:l,down:c,between:p,only:u,not:f,unit:n},o)}const Kp={borderRadius:4},Jp=Kp,Zp=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},ut=Zp;function pn(e,t){return t?et(e,t,{clone:!1}):e}const no={xs:0,sm:600,md:900,lg:1200,xl:1536},ci={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${no[e]}px)`};function rt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||ci;return t.reduce((s,l,c)=>(s[i.up(i.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const i=r.breakpoints||ci;return Object.keys(t).reduce((s,l)=>{if(Object.keys(i.values||no).indexOf(l)!==-1){const c=i.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function Qp(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function eu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Zn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Un(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Zn(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,p=Zn(c,r)||{};return rt(s,l,f=>{let d=Un(p,o,f);return f===d&&typeof f=="string"&&(d=Un(p,o,`${t}${f==="default"?"":Xe(f)}`,f)),n===!1?d:{[n]:d}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:ut}:{},i.filterProps=[t],i}function tu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const nu={m:"margin",p:"padding"},ru={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},pi={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ou=tu(e=>{if(e.length>2)if(pi[e])e=pi[e];else return[e];const[t,n]=e.split(""),r=nu[t],o=ru[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Qn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],er=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],iu=[...Qn,...er];function En(e,t,n,r){var o;const i=(o=Zn(e,t,!1))!=null?o:n;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ja(e){return En(e,"spacing",8,"spacing")}function kn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function au(e,t){return n=>e.reduce((r,o)=>(r[o]=kn(t,n),r),{})}function su(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ou(n),i=au(o,r),s=e[n];return rt(e,s,i)}function Ma(e,t){const n=ja(e.theme);return Object.keys(e).map(r=>su(e,t,r,n)).reduce(pn,{})}function he(e){return Ma(e,Qn)}he.propTypes=process.env.NODE_ENV!=="production"?Qn.reduce((e,t)=>(e[t]=ut,e),{}):{};he.filterProps=Qn;function ge(e){return Ma(e,er)}ge.propTypes=process.env.NODE_ENV!=="production"?er.reduce((e,t)=>(e[t]=ut,e),{}):{};ge.filterProps=er;process.env.NODE_ENV!=="production"&&iu.reduce((e,t)=>(e[t]=ut,e),{});function lu(e=8){if(e.mui)return e;const t=ja({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function tr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?pn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Be(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const cu=Ue("border",Be),pu=Ue("borderTop",Be),uu=Ue("borderRight",Be),du=Ue("borderBottom",Be),fu=Ue("borderLeft",Be),mu=Ue("borderColor"),hu=Ue("borderTopColor"),gu=Ue("borderRightColor"),bu=Ue("borderBottomColor"),vu=Ue("borderLeftColor"),yu=Ue("outline",Be),wu=Ue("outlineColor"),nr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=En(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:kn(t,r)});return rt(e,e.borderRadius,n)}return null};nr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ut}:{};nr.filterProps=["borderRadius"];tr(cu,pu,uu,du,fu,mu,hu,gu,bu,vu,nr,yu,wu);const rr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=En(e.theme,"spacing",8,"gap"),n=r=>({gap:kn(t,r)});return rt(e,e.gap,n)}return null};rr.propTypes=process.env.NODE_ENV!=="production"?{gap:ut}:{};rr.filterProps=["gap"];const or=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=En(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:kn(t,r)});return rt(e,e.columnGap,n)}return null};or.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ut}:{};or.filterProps=["columnGap"];const ir=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=En(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:kn(t,r)});return rt(e,e.rowGap,n)}return null};ir.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ut}:{};ir.filterProps=["rowGap"];const xu=ve({prop:"gridColumn"}),Eu=ve({prop:"gridRow"}),ku=ve({prop:"gridAutoFlow"}),Tu=ve({prop:"gridAutoColumns"}),Ou=ve({prop:"gridAutoRows"}),Cu=ve({prop:"gridTemplateColumns"}),Su=ve({prop:"gridTemplateRows"}),Nu=ve({prop:"gridTemplateAreas"}),Pu=ve({prop:"gridArea"});tr(rr,or,ir,xu,Eu,ku,Tu,Ou,Cu,Su,Nu,Pu);function It(e,t){return t==="grey"?t:e}const Ru=ve({prop:"color",themeKey:"palette",transform:It}),ju=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:It}),Mu=ve({prop:"backgroundColor",themeKey:"palette",transform:It});tr(Ru,ju,Mu);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const $u=ve({prop:"width",transform:Ie}),ro=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||no[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ie(n)}};return rt(e,e.maxWidth,t)}return null};ro.filterProps=["maxWidth"];const _u=ve({prop:"minWidth",transform:Ie}),Iu=ve({prop:"height",transform:Ie}),Au=ve({prop:"maxHeight",transform:Ie}),Du=ve({prop:"minHeight",transform:Ie});ve({prop:"size",cssProperty:"width",transform:Ie});ve({prop:"size",cssProperty:"height",transform:Ie});const Bu=ve({prop:"boxSizing"});tr($u,ro,_u,Iu,Au,Du,Bu);const Lu={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:nr},color:{themeKey:"palette",transform:It},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:It},backgroundColor:{themeKey:"palette",transform:It},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:rr},rowGap:{style:ir},columnGap:{style:or},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:ro},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},oo=Lu;function Fu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Vu(e,t){return typeof e=="function"?e(t):e}function zu(){function e(n,r,o,i){const s={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:p,transform:u,style:f}=l;if(r==null)return null;if(p==="typography"&&r==="inherit")return{[n]:r};const d=Zn(o,p)||{};return f?f(s):rt(s,r,y=>{let b=Un(d,u,y);return y===b&&typeof y=="string"&&(b=Un(d,u,`${n}${y==="default"?"":Xe(y)}`,y)),c===!1?b:{[c]:b}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:oo;function l(c){let p=c;if(typeof c=="function")p=c(i);else if(typeof c!="object")return c;if(!p)return null;const u=Qp(i.breakpoints),f=Object.keys(u);let d=u;return Object.keys(p).forEach(v=>{const y=Vu(p[v],i);if(y!=null)if(typeof y=="object")if(s[v])d=pn(d,e(v,y,i,s));else{const b=rt({theme:i},y,h=>({[v]:h}));Fu(b,y)?d[v]=t({sx:y,theme:i}):d=pn(d,b)}else d=pn(d,e(v,y,i,s))}),eu(f,d)}return Array.isArray(o)?o.map(l):l(o)}return t}const $a=zu();$a.filterProps=["sx"];const io=$a;function Uu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const qu=["breakpoints","palette","spacing","shape"];function ao(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,s=de(e,qu),l=Yp(n),c=lu(o);let p=et({breakpoints:l,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:c,shape:T({},Jp,i)},s);return p.applyStyles=Uu,p=t.reduce((u,f)=>et(u,f),p),p.unstable_sxConfig=T({},oo,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(f){return io({sx:f,theme:this})},p}function Hu(e){return Object.keys(e).length===0}function _a(e=null){const t=E.useContext(Sr.ThemeContext);return!t||Hu(t)?e:t}const Wu=ao();function Ia(e=Wu){return _a(e)}const Gu=["ownerState"],Xu=["variants"],Yu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Ku(e){return Object.keys(e).length===0}function Ju(e){return typeof e=="string"&&e.charCodeAt(0)>96}function _n(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Zu=ao(),ui=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Rn({defaultTheme:e,theme:t,themeId:n}){return Ku(t)?e:t[n]||t}function Qu(e){return e?(t,n)=>n[e]:null}function In(e,t){let{ownerState:n}=t,r=de(t,Gu);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>In(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=de(o,Xu);return i.forEach(c=>{let p=!0;typeof c.props=="function"?p=c.props(T({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(p=!1)}),p&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(T({ownerState:n},r,n)):c.style))}),l}return o}function ed(e={}){const{themeId:t,defaultTheme:n=Zu,rootShouldForwardProp:r=_n,slotShouldForwardProp:o=_n}=e,i=s=>io(T({},s,{theme:Rn(T({},s,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(s,l={})=>{Sr.internal_processStyles(s,g=>g.filter(C=>!(C!=null&&C.__mui_systemSx)));const{name:c,slot:p,skipVariantsResolver:u,skipSx:f,overridesResolver:d=Qu(ui(p))}=l,v=de(l,Yu),y=u!==void 0?u:p&&p!=="Root"&&p!=="root"||!1,b=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${ui(p||"Root")}`);let k=_n;p==="Root"||p==="root"?k=r:p?k=o:Ju(s)&&(k=void 0);const $=Sr(s,T({shouldForwardProp:k,label:h},v)),w=g=>typeof g=="function"&&g.__emotion_real!==g||vt(g)?C=>In(g,T({},C,{theme:Rn({theme:C.theme,defaultTheme:n,themeId:t})})):g,x=(g,...C)=>{let N=w(g);const F=C?C.map(w):[];c&&d&&F.push(S=>{const j=Rn(T({},S,{defaultTheme:n,themeId:t}));if(!j.components||!j.components[c]||!j.components[c].styleOverrides)return null;const R=j.components[c].styleOverrides,B={};return Object.entries(R).forEach(([D,M])=>{B[D]=In(M,T({},S,{theme:j}))}),d(S,B)}),c&&!y&&F.push(S=>{var j;const R=Rn(T({},S,{defaultTheme:n,themeId:t})),B=R==null||(j=R.components)==null||(j=j[c])==null?void 0:j.variants;return In({variants:B},T({},S,{theme:R}))}),b||F.push(i);const L=F.length-C.length;if(Array.isArray(g)&&L>0){const S=new Array(L).fill("");N=[...g,...S],N.raw=[...g.raw,...S]}const V=$(N,...F);if(process.env.NODE_ENV!=="production"){let S;c&&(S=`${c}${Xe(p||"")}`),S===void 0&&(S=`Styled(${Bl(s)})`),V.displayName=S}return s.muiName&&(V.muiName=s.muiName),V};return $.withConfig&&(x.withConfig=$.withConfig),x}}function td(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:fa(t.components[n].defaultProps,r)}function nd({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ia(n);return r&&(o=o[r]||o),td({theme:o,name:t,props:e})}function so(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),sc(e,t,n)}function rd(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Tt(e){if(e.type)return e;if(e.charAt(0)==="#")return Tt(rd(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:At(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:At(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function ar(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function od(e){e=Tt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),s=(p,u=(p+n/30)%12)=>o-i*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),ar({type:l,values:c})}function di(e){e=Tt(e);let t=e.type==="hsl"||e.type==="hsla"?Tt(od(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function fi(e,t){const n=di(e),r=di(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function qn(e,t){return e=Tt(e),t=so(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,ar(e)}function id(e,t){if(e=Tt(e),t=so(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return ar(e)}function ad(e,t){if(e=Tt(e),t=so(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return ar(e)}function sd(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ld={black:"#000",white:"#fff"},gn=ld,cd={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},pd=cd,ud={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},St=ud,dd={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Nt=dd,fd={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Zt=fd,md={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Pt=md,hd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Rt=hd,gd={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},jt=gd,bd=["mode","contrastThreshold","tonalOffset"],mi={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:gn.white,default:gn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},wr={text:{primary:gn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:gn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function hi(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=ad(e.main,o):t==="dark"&&(e.dark=id(e.main,i)))}function vd(e="light"){return e==="dark"?{main:Pt[200],light:Pt[50],dark:Pt[400]}:{main:Pt[700],light:Pt[400],dark:Pt[800]}}function yd(e="light"){return e==="dark"?{main:St[200],light:St[50],dark:St[400]}:{main:St[500],light:St[300],dark:St[700]}}function wd(e="light"){return e==="dark"?{main:Nt[500],light:Nt[300],dark:Nt[700]}:{main:Nt[700],light:Nt[400],dark:Nt[800]}}function xd(e="light"){return e==="dark"?{main:Rt[400],light:Rt[300],dark:Rt[700]}:{main:Rt[700],light:Rt[500],dark:Rt[900]}}function Ed(e="light"){return e==="dark"?{main:jt[400],light:jt[300],dark:jt[700]}:{main:jt[800],light:jt[500],dark:jt[900]}}function kd(e="light"){return e==="dark"?{main:Zt[400],light:Zt[300],dark:Zt[700]}:{main:"#ed6c02",light:Zt[500],dark:Zt[900]}}function Td(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=de(e,bd),i=e.primary||vd(t),s=e.secondary||yd(t),l=e.error||wd(t),c=e.info||xd(t),p=e.success||Ed(t),u=e.warning||kd(t);function f(b){const h=fi(b,wr.text.primary)>=n?wr.text.primary:mi.text.primary;if(process.env.NODE_ENV!=="production"){const k=fi(b,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${b}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const d=({color:b,name:h,mainShade:k=500,lightShade:$=300,darkShade:w=700})=>{if(b=T({},b),!b.main&&b[k]&&(b.main=b[k]),!b.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:At(11,h?` (${h})`:"",k));if(typeof b.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:At(12,h?` (${h})`:"",JSON.stringify(b.main)));return hi(b,"light",$,r),hi(b,"dark",w,r),b.contrastText||(b.contrastText=f(b.main)),b},v={dark:wr,light:mi};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),et(T({common:T({},gn),mode:t,primary:d({color:i,name:"primary"}),secondary:d({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:d({color:l,name:"error"}),warning:d({color:u,name:"warning"}),info:d({color:c,name:"info"}),success:d({color:p,name:"success"}),grey:pd,contrastThreshold:n,getContrastText:f,augmentColor:d,tonalOffset:r},v[t]),o)}const Od=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Cd(e){return Math.round(e*1e5)/1e5}const gi={textTransform:"uppercase"},bi='"Roboto", "Helvetica", "Arial", sans-serif';function Sd(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=bi,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:p=16,allVariants:u,pxToRem:f}=n,d=de(n,Od);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof p!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,y=f||(k=>`${k/p*v}rem`),b=(k,$,w,x,g)=>T({fontFamily:r,fontWeight:k,fontSize:y($),lineHeight:w},r===bi?{letterSpacing:`${Cd(x/$)}em`}:{},g,u),h={h1:b(i,96,1.167,-1.5),h2:b(i,60,1.2,-.5),h3:b(s,48,1.167,0),h4:b(s,34,1.235,.25),h5:b(s,24,1.334,0),h6:b(l,20,1.6,.15),subtitle1:b(s,16,1.75,.15),subtitle2:b(l,14,1.57,.1),body1:b(s,16,1.5,.15),body2:b(s,14,1.43,.15),button:b(l,14,1.75,.4,gi),caption:b(s,12,1.66,.4),overline:b(s,12,2.66,1,gi),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return et(T({htmlFontSize:p,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},h),d,{clone:!1})}const Nd=.2,Pd=.14,Rd=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Nd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Pd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Rd})`].join(",")}const jd=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Md=jd,$d=["duration","easing","delay"],_d={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Id={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function vi(e){return`${Math.round(e)}ms`}function Ad(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Dd(e){const t=T({},_d,e.easing),n=T({},Id,e.duration);return T({getAutoHeightDuration:Ad,create:(o=["all"],i={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=i,p=de(i,$d);if(process.env.NODE_ENV!=="production"){const u=d=>typeof d=="string",f=d=>!isNaN(parseFloat(d));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(s)&&!u(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(p).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof s=="string"?s:vi(s)} ${l} ${typeof c=="string"?c:vi(c)}`).join(",")}},e,{easing:t,duration:n})}const Bd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Ld=Bd,Fd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Vd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,s=de(e,Fd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":At(18));const l=Td(r),c=ao(e);let p=et(c,{mixins:sd(c.breakpoints,n),palette:l,shadows:Md.slice(),typography:Sd(l,i),transitions:Dd(o),zIndex:T({},Ld)});if(p=et(p,s),p=t.reduce((u,f)=>et(u,f),p),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(d,v)=>{let y;for(y in d){const b=d[y];if(u.indexOf(y)!==-1&&Object.keys(b).length>0){if(process.env.NODE_ENV!=="production"){const h=Ke("",y);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(d,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:b}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}d[y]={}}}};Object.keys(p.components).forEach(d=>{const v=p.components[d].styleOverrides;v&&d.indexOf("Mui")===0&&f(v,d)})}return p.unstable_sxConfig=T({},oo,s==null?void 0:s.unstable_sxConfig),p.unstable_sx=function(f){return io({sx:f,theme:this})},p}const zd=Vd(),lo=zd,co="$$material",Aa=e=>_n(e)&&e!=="classes",Ud=ed({themeId:co,defaultTheme:lo,rootShouldForwardProp:Aa}),Te=Ud;function Tn(){const e=Ia(lo);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[co]||e}function it({props:e,name:t}){return nd({props:e,name:t,defaultTheme:lo,themeId:co})}function Ir(e,t){return Ir=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Ir(e,t)}function qd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ir(e,t)}const yi={disabled:!1};var Hd=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const Da=I.createContext(null);var Wd=function(t){return t.scrollTop},on="unmounted",ht="exited",gt="entering",_t="entered",Ar="exiting",at=function(e){qd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=ht,i.appearStatus=gt):c=_t:r.unmountOnExit||r.mountOnEnter?c=on:c=ht,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===on?{status:ht}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==gt&&s!==_t&&(i=gt):(s===gt||s===_t)&&(i=Ar)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,s,l;return i=s=l=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===gt){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:tn.findDOMNode(this);s&&Wd(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===ht&&this.setState({status:on})},n.performEnter=function(o){var i=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[tn.findDOMNode(this),l],p=c[0],u=c[1],f=this.getTimeouts(),d=l?f.appear:f.enter;if(!o&&!s||yi.disabled){this.safeSetState({status:_t},function(){i.props.onEntered(p)});return}this.props.onEnter(p,u),this.safeSetState({status:gt},function(){i.props.onEntering(p,u),i.onTransitionEnd(d,function(){i.safeSetState({status:_t},function(){i.props.onEntered(p,u)})})})},n.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:tn.findDOMNode(this);if(!i||yi.disabled){this.safeSetState({status:ht},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Ar},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:ht},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:tn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],p=c[0],u=c[1];this.props.addEndListener(p,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===on)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=de(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return I.createElement(Da.Provider,{value:null},typeof s=="function"?s(o,l):I.cloneElement(I.Children.only(s),l))},t}(I.Component);at.contextType=Da;at.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,t,n,r,o,i){var s=e[t];return a.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(t){var n=Hd;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function Mt(){}at.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Mt,onEntering:Mt,onEntered:Mt,onExit:Mt,onExiting:Mt,onExited:Mt};at.UNMOUNTED=on;at.EXITED=ht;at.ENTERING=gt;at.ENTERED=_t;at.EXITING=Ar;const Ba=at,La=e=>e.scrollTop;function Hn(e,t){var n,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:s.transitionDelay}}const Gd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Dr(e){return`scale(${e}, ${e**2})`}const Xd={entering:{opacity:1,transform:Dr(1)},entered:{opacity:1,transform:"none"}},xr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),po=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:l,onEnter:c,onEntered:p,onEntering:u,onExit:f,onExited:d,onExiting:v,style:y,timeout:b="auto",TransitionComponent:h=Ba}=t,k=de(t,Gd),$=nn(),w=E.useRef(),x=Tn(),g=E.useRef(null),C=Fe(g,i.ref,n),N=D=>M=>{if(D){const z=g.current;M===void 0?D(z):D(z,M)}},F=N(u),L=N((D,M)=>{La(D);const{duration:z,delay:ee,easing:Q}=Hn({style:y,timeout:b,easing:s},{mode:"enter"});let O;b==="auto"?(O=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=O):O=z,D.style.transition=[x.transitions.create("opacity",{duration:O,delay:ee}),x.transitions.create("transform",{duration:xr?O:O*.666,delay:ee,easing:Q})].join(","),c&&c(D,M)}),V=N(p),S=N(v),j=N(D=>{const{duration:M,delay:z,easing:ee}=Hn({style:y,timeout:b,easing:s},{mode:"exit"});let Q;b==="auto"?(Q=x.transitions.getAutoHeightDuration(D.clientHeight),w.current=Q):Q=M,D.style.transition=[x.transitions.create("opacity",{duration:Q,delay:z}),x.transitions.create("transform",{duration:xr?Q:Q*.666,delay:xr?z:z||Q*.333,easing:ee})].join(","),D.style.opacity=0,D.style.transform=Dr(.75),f&&f(D)}),R=N(d),B=D=>{b==="auto"&&$.start(w.current||0,D),r&&r(g.current,D)};return m.jsx(h,T({appear:o,in:l,nodeRef:g,onEnter:L,onEntered:V,onEntering:F,onExit:j,onExited:R,onExiting:S,addEndListener:B,timeout:b==="auto"?null:b},k,{children:(D,M)=>E.cloneElement(i,T({style:T({opacity:0,transform:Dr(.75),visibility:D==="exited"&&!l?"hidden":void 0},Xd[D],y,i.props.style),ref:C},M))}))});process.env.NODE_ENV!=="production"&&(po.propTypes={addEndListener:a.func,appear:a.bool,children:vn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});po.muiSupportAuto=!0;const Br=po,Yd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},wi=Yd,Kd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Jd=Te(Ra,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Fa=E.forwardRef(function(t,n){var r;const o=_a(),i=it({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:p,container:u,disablePortal:f,keepMounted:d,modifiers:v,open:y,placement:b,popperOptions:h,popperRef:k,transition:$,slots:w,slotProps:x}=i,g=de(i,Kd),C=(r=w==null?void 0:w.root)!=null?r:c==null?void 0:c.Root,N=T({anchorEl:s,container:u,disablePortal:f,keepMounted:d,modifiers:v,open:y,placement:b,popperOptions:h,popperRef:k,transition:$},g);return m.jsx(Jd,T({as:l,direction:o==null?void 0:o.direction,slots:{root:C},slotProps:x??p},N,{ref:n}))});process.env.NODE_ENV!=="production"&&(Fa.propTypes={anchorEl:a.oneOfType([tt,a.object,a.func]),children:a.oneOfType([a.node,a.func]),component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([tt,a.func]),disablePortal:a.bool,keepMounted:a.bool,modifiers:a.arrayOf(a.shape({data:a.object,effect:a.func,enabled:a.bool,fn:a.func,name:a.any,options:a.object,phase:a.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:a.arrayOf(a.string),requiresIfExists:a.arrayOf(a.string)})),open:a.bool.isRequired,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:a.shape({modifiers:a.array,onFirstUpdate:a.func,placement:a.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:a.oneOf(["absolute","fixed"])}),popperRef:Xr,slotProps:a.shape({root:a.oneOfType([a.func,a.object])}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transition:a.bool});const Va=Fa;function Zd(e){return Ke("MuiTooltip",e)}const Qd=ct("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),lt=Qd,ef=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function tf(e){return Math.round(e*1e5)/1e5}const nf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Xe(i.split("-")[0])}`],arrow:["arrow"]};return ot(s,Zd,t)},rf=Te(Va,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${lt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${lt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${lt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${lt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),of=Te("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Xe(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:qn(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${tf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${lt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${lt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${lt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${lt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),af=Te("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:qn(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let jn=!1;const xi=new yn;let Qt={x:0,y:0};function Mn(e,t){return n=>{t&&t(n),e(n)}}const za=E.forwardRef(function(t,n){var r,o,i,s,l,c,p,u,f,d,v,y,b,h,k,$,w,x,g;const C=it({props:t,name:"MuiTooltip"}),{arrow:N=!1,children:F,components:L={},componentsProps:V={},describeChild:S=!1,disableFocusListener:j=!1,disableHoverListener:R=!1,disableInteractive:B=!1,disableTouchListener:D=!1,enterDelay:M=100,enterNextDelay:z=0,enterTouchDelay:ee=700,followCursor:Q=!1,id:O,leaveDelay:A=0,leaveTouchDelay:q=1500,onClose:Y,onOpen:U,open:H,placement:G="bottom",PopperComponent:X,PopperProps:W={},slotProps:K={},slots:J={},title:oe,TransitionComponent:_=Br,TransitionProps:Z}=C,P=de(C,ef),ie=E.isValidElement(F)?F:m.jsx("span",{children:F}),we=Tn(),Oe=we.direction==="rtl",[be,dt]=E.useState(),[Ce,Je]=E.useState(null),Me=E.useRef(!1),Ze=B||Q,xe=nn(),Ct=nn(),ft=nn(),qt=nn(),[On,bo]=sa({controlled:H,default:!1,name:"Tooltip",state:"open"});let Qe=On;if(process.env.NODE_ENV!=="production"){const{current:ne}=E.useRef(H!==void 0);E.useEffect(()=>{be&&be.disabled&&!ne&&oe!==""&&be.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[oe,be,ne])}const sr=aa(O),Ht=E.useRef(),Cn=dn(()=>{Ht.current!==void 0&&(document.body.style.WebkitUserSelect=Ht.current,Ht.current=void 0),qt.clear()});E.useEffect(()=>Cn,[Cn]);const vo=ne=>{xi.clear(),jn=!0,bo(!0),U&&!Qe&&U(ne)},Sn=dn(ne=>{xi.start(800+A,()=>{jn=!1}),bo(!1),Y&&Qe&&Y(ne),xe.start(we.transitions.duration.shortest,()=>{Me.current=!1})}),lr=ne=>{Me.current&&ne.type!=="touchstart"||(be&&be.removeAttribute("title"),Ct.clear(),ft.clear(),M||jn&&z?Ct.start(jn?z:M,()=>{vo(ne)}):vo(ne))},yo=ne=>{Ct.clear(),ft.start(A,()=>{Sn(ne)})},{isFocusVisibleRef:wo,onBlur:ds,onFocus:fs,ref:ms}=la(),[,xo]=E.useState(!1),Eo=ne=>{ds(ne),wo.current===!1&&(xo(!1),yo(ne))},ko=ne=>{be||dt(ne.currentTarget),fs(ne),wo.current===!0&&(xo(!0),lr(ne))},To=ne=>{Me.current=!0;const $e=ie.props;$e.onTouchStart&&$e.onTouchStart(ne)},Oo=lr,Co=yo,hs=ne=>{To(ne),ft.clear(),xe.clear(),Cn(),Ht.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",qt.start(ee,()=>{document.body.style.WebkitUserSelect=Ht.current,lr(ne)})},gs=ne=>{ie.props.onTouchEnd&&ie.props.onTouchEnd(ne),Cn(),ft.start(q,()=>{Sn(ne)})};E.useEffect(()=>{if(!Qe)return;function ne($e){($e.key==="Escape"||$e.key==="Esc")&&Sn($e)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Sn,Qe]);const bs=Fe(ie.ref,ms,dt,n);!oe&&oe!==0&&(Qe=!1);const cr=E.useRef(),vs=ne=>{const $e=ie.props;$e.onMouseMove&&$e.onMouseMove(ne),Qt={x:ne.clientX,y:ne.clientY},cr.current&&cr.current.update()},Wt={},pr=typeof oe=="string";S?(Wt.title=!Qe&&pr&&!R?oe:null,Wt["aria-describedby"]=Qe?sr:null):(Wt["aria-label"]=pr?oe:null,Wt["aria-labelledby"]=Qe&&!pr?sr:null);const De=T({},Wt,P,ie.props,{className:Ee(P.className,ie.props.className),onTouchStart:To,ref:bs},Q?{onMouseMove:vs}:{});process.env.NODE_ENV!=="production"&&(De["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{be&&!be.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[be]));const Gt={};D||(De.onTouchStart=hs,De.onTouchEnd=gs),R||(De.onMouseOver=Mn(Oo,De.onMouseOver),De.onMouseLeave=Mn(Co,De.onMouseLeave),Ze||(Gt.onMouseOver=Oo,Gt.onMouseLeave=Co)),j||(De.onFocus=Mn(ko,De.onFocus),De.onBlur=Mn(Eo,De.onBlur),Ze||(Gt.onFocus=ko,Gt.onBlur=Eo)),process.env.NODE_ENV!=="production"&&ie.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));const ys=E.useMemo(()=>{var ne;let $e=[{name:"arrow",enabled:!!Ce,options:{element:Ce,padding:4}}];return(ne=W.popperOptions)!=null&&ne.modifiers&&($e=$e.concat(W.popperOptions.modifiers)),T({},W.popperOptions,{modifiers:$e})},[Ce,W]),Xt=T({},C,{isRtl:Oe,arrow:N,disableInteractive:Ze,placement:G,PopperComponentProp:X,touch:Me.current}),ur=nf(Xt),So=(r=(o=J.popper)!=null?o:L.Popper)!=null?r:rf,No=(i=(s=(l=J.transition)!=null?l:L.Transition)!=null?s:_)!=null?i:Br,Po=(c=(p=J.tooltip)!=null?p:L.Tooltip)!=null?c:of,Ro=(u=(f=J.arrow)!=null?f:L.Arrow)!=null?u:af,ws=rn(So,T({},W,(d=K.popper)!=null?d:V.popper,{className:Ee(ur.popper,W==null?void 0:W.className,(v=(y=K.popper)!=null?y:V.popper)==null?void 0:v.className)}),Xt),xs=rn(No,T({},Z,(b=K.transition)!=null?b:V.transition),Xt),Es=rn(Po,T({},(h=K.tooltip)!=null?h:V.tooltip,{className:Ee(ur.tooltip,(k=($=K.tooltip)!=null?$:V.tooltip)==null?void 0:k.className)}),Xt),ks=rn(Ro,T({},(w=K.arrow)!=null?w:V.arrow,{className:Ee(ur.arrow,(x=(g=K.arrow)!=null?g:V.arrow)==null?void 0:x.className)}),Xt);return m.jsxs(E.Fragment,{children:[E.cloneElement(ie,De),m.jsx(So,T({as:X??Va,placement:G,anchorEl:Q?{getBoundingClientRect:()=>({top:Qt.y,left:Qt.x,right:Qt.x,bottom:Qt.y,width:0,height:0})}:be,popperRef:cr,open:be?Qe:!1,id:sr,transition:!0},Gt,ws,{popperOptions:ys,children:({TransitionProps:ne})=>m.jsx(No,T({timeout:we.transitions.duration.shorter},ne,xs,{children:m.jsxs(Po,T({},Es,{children:[oe,N?m.jsx(Ro,T({},ks,{ref:Je})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(za.propTypes={arrow:a.bool,children:vn.isRequired,classes:a.object,className:a.string,components:a.shape({Arrow:a.elementType,Popper:a.elementType,Tooltip:a.elementType,Transition:a.elementType}),componentsProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),describeChild:a.bool,disableFocusListener:a.bool,disableHoverListener:a.bool,disableInteractive:a.bool,disableTouchListener:a.bool,enterDelay:a.number,enterNextDelay:a.number,enterTouchDelay:a.number,followCursor:a.bool,id:a.string,leaveDelay:a.number,leaveTouchDelay:a.number,onClose:a.func,onOpen:a.func,open:a.bool,placement:a.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:a.elementType,PopperProps:a.object,slotProps:a.shape({arrow:a.object,popper:a.object,tooltip:a.object,transition:a.object}),slots:a.shape({arrow:a.elementType,popper:a.elementType,tooltip:a.elementType,transition:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),title:a.node,TransitionComponent:a.elementType,TransitionProps:a.object});const sf=za;var uo={},Ua={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Ua);var lf=Ua.exports,Er={};function cf(e){return Ke("MuiSvgIcon",e)}ct("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const pf=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],uf=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Xe(t)}`,`fontSize${Xe(n)}`]};return ot(o,cf,r)},df=Te("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Xe(n.color)}`],t[`fontSize${Xe(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,s,l,c,p,u,f,d,v,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((p=e.typography)==null||(u=p.pxToRem)==null?void 0:u.call(p,35))||"2.1875rem"}[t.fontSize],color:(f=(d=(e.vars||e).palette)==null||(d=d[t.color])==null?void 0:d.main)!=null?f:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[t.color]}}),fo=E.forwardRef(function(t,n){const r=it({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:p,inheritViewBox:u=!1,titleAccess:f,viewBox:d="0 0 24 24"}=r,v=de(r,pf),y=E.isValidElement(o)&&o.type==="svg",b=T({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:d,hasSvgAsChild:y}),h={};u||(h.viewBox=d);const k=uf(b);return m.jsxs(df,T({as:l,className:Ee(k.root,i),focusable:"false",color:p,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,v,y&&o.props,{ownerState:b,children:[y?o.props.children:o,f?m.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(fo.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});fo.muiName="SvgIcon";const Ei=fo;function qa(e,t){function n(r,o){return m.jsx(Ei,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ei.muiName,E.memo(E.forwardRef(n))}const ff={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),ma.configure(e)}},mf=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Xe,createChainedFunction:Rr,createSvgIcon:qa,debounce:ia,deprecatedPropType:Fl,isMuiElement:Vl,ownerDocument:ke,ownerWindow:Dt,requirePropFactory:zl,setRef:Ln,unstable_ClassNameGenerator:ff,unstable_useEnhancedEffect:xt,unstable_useId:aa,unsupportedProp:Hl,useControlled:sa,useEventCallback:dn,useForkRef:Fe,useIsFocusVisible:la},Symbol.toStringTag,{value:"Module"})),hf=yl(mf);var ki;function gf(){return ki||(ki=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=hf}(Er)),Er}var bf=lf;Object.defineProperty(uo,"__esModule",{value:!0});var Ha=uo.default=void 0,vf=bf(gf()),yf=m;Ha=uo.default=(0,vf.default)((0,yf.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ti(e,t,n){return e?m.jsx(ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:m.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function mo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:p=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:d=!1,hasDivider:v=!1,focusVisibleClassName:y,id:b,children:h}=e,k=m.jsx(ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:p,dense:u,disableGutters:d,divider:v,focusVisibleClassName:y,onClick:t,id:b,children:n?m.jsxs(m.Fragment,{children:[Ti(i,n,!0),m.jsx(ye.ListItemText,{primary:n,inset:!i&&o}),f?m.jsx(ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:m.jsx(Ha,{})}):Ti(s,n,!1)]}):h});return r?m.jsx(sf,{title:r,placement:"right",children:m.jsx("div",{children:k})}):k}function Wa(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function wf(e){const[t,n]=I.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,s=p=>{n(p.currentTarget)},l=()=>{n(void 0)},c=()=>{let p=Wa(i).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return p=p.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),m.jsx(ho,{...e,includedGroups:p})};return m.jsxs(m.Fragment,{children:[m.jsx(mo,{onClick:s,...o,isSubMenuParent:!0}),m.jsx(ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const xf=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function ho(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:s}=I.useMemo(()=>{const u=o&&o.length>0?o:Wa(t).filter(y=>!("menuItem"in y.group)),f=Object.values(u).sort((y,b)=>(y.group.order||0)-(b.group.order||0)),d=[];f.forEach(y=>{xf(y.id,t.items).forEach(b=>d.push({item:b,isLastItemInGroup:!1})),d.length>0&&(d[d.length-1].isLastItemInGroup=!0)}),d.length>0&&(d[d.length-1].isLastItemInGroup=!1);const v=d.some(y=>"iconPathBefore"in y.item&&y.item.iconPathBefore);return{items:d,allowForLeadingIcons:v}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:s}),[c]=i;if(!c)return m.jsx("div",{});const p=c.item.group;return m.jsx("div",{role:"menu","aria-label":p,children:i.map((u,f)=>{const{item:d}=u,v=l(u);if("command"in d){const y=d.group+f;return m.jsx(mo,{onClick:b=>{n==null||n(b),r(d)},...v},y)}return m.jsx(wf,{parentMenuItem:d,parentItemProps:v,...e},p+d.id)})},p)}function Ef(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(s=>"column"in s.group&&s.group.column===n)),m.jsx(ho,{...e,includedGroups:i})}function kf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return m.jsxs(ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[m.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),m.jsx(ye.List,{id:n,dense:!0,className:i??"",children:m.jsx(Ef,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ga({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=I.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,p=o[c];typeof p=="object"&&typeof p.order=="number"&&!Number.isNaN(p.order)?s.set(p.order,{id:c,metadata:p}):console.warn(`Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return m.jsx(ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((s,l)=>m.jsx(kf,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Xa=E.createContext({});process.env.NODE_ENV!=="production"&&(Xa.displayName="ListContext");const Tf=Xa;function Of(e){return Ke("MuiList",e)}ct("MuiList",["root","padding","dense","subheader"]);const Cf=["children","className","component","dense","disablePadding","subheader"],Sf=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return ot({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Of,t)},Nf=Te("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ya=E.forwardRef(function(t,n){const r=it({props:t,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:p}=r,u=de(r,Cf),f=E.useMemo(()=>({dense:l}),[l]),d=T({},r,{component:s,dense:l,disablePadding:c}),v=Sf(d);return m.jsx(Tf.Provider,{value:f,children:m.jsxs(Nf,T({as:s,className:Ee(v.root,i),ref:n,ownerState:d},u,{children:[p,o]}))})});process.env.NODE_ENV!=="production"&&(Ya.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Pf=Ya,Rf=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function kr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Oi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Ka(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function en(e,t,n,r,o,i){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Ka(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Ja=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:p=!1,onKeyDown:u,variant:f="selectedMenu"}=t,d=de(t,Rf),v=E.useRef(null),y=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});xt(()=>{o&&v.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(w,x)=>{const g=!v.current.style.width;if(w.clientHeight<v.current.clientHeight&&g){const C=`${ca(ke(w))}px`;v.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=C,v.current.style.width=`calc(100% + ${C})`}return v.current}}),[]);const b=w=>{const x=v.current,g=w.key,C=ke(x).activeElement;if(g==="ArrowDown")w.preventDefault(),en(x,C,p,c,kr);else if(g==="ArrowUp")w.preventDefault(),en(x,C,p,c,Oi);else if(g==="Home")w.preventDefault(),en(x,null,p,c,kr);else if(g==="End")w.preventDefault(),en(x,null,p,c,Oi);else if(g.length===1){const N=y.current,F=g.toLowerCase(),L=performance.now();N.keys.length>0&&(L-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&F!==N.keys[0]&&(N.repeating=!1)),N.lastTime=L,N.keys.push(F);const V=C&&!N.repeating&&Ka(C,N);N.previousKeyMatched&&(V||en(x,C,!1,c,kr,N))?w.preventDefault():N.previousKeyMatched=!1}u&&u(w)},h=Fe(v,n);let k=-1;E.Children.forEach(s,(w,x)=>{if(!E.isValidElement(w)){k===x&&(k+=1,k>=s.length&&(k=-1));return}process.env.NODE_ENV!=="production"&&Bn.isFragment(w)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),w.props.disabled||(f==="selectedMenu"&&w.props.selected||k===-1)&&(k=x),k===x&&(w.props.disabled||w.props.muiSkipListHighlight||w.type.muiSkipListHighlight)&&(k+=1,k>=s.length&&(k=-1))});const $=E.Children.map(s,(w,x)=>{if(x===k){const g={};return i&&(g.autoFocus=!0),w.props.tabIndex===void 0&&f==="selectedMenu"&&(g.tabIndex=0),E.cloneElement(w,g)}return w});return m.jsx(Pf,T({role:"menu",ref:h,className:l,onKeyDown:b,tabIndex:o?0:-1},d,{children:$}))});process.env.NODE_ENV!=="production"&&(Ja.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const jf=Ja,Mf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],$f={entering:{opacity:1},entered:{opacity:1}},Za=E.forwardRef(function(t,n){const r=Tn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:l,easing:c,in:p,onEnter:u,onEntered:f,onEntering:d,onExit:v,onExited:y,onExiting:b,style:h,timeout:k=o,TransitionComponent:$=Ba}=t,w=de(t,Mf),x=E.useRef(null),g=Fe(x,l.ref,n),C=B=>D=>{if(B){const M=x.current;D===void 0?B(M):B(M,D)}},N=C(d),F=C((B,D)=>{La(B);const M=Hn({style:h,timeout:k,easing:c},{mode:"enter"});B.style.webkitTransition=r.transitions.create("opacity",M),B.style.transition=r.transitions.create("opacity",M),u&&u(B,D)}),L=C(f),V=C(b),S=C(B=>{const D=Hn({style:h,timeout:k,easing:c},{mode:"exit"});B.style.webkitTransition=r.transitions.create("opacity",D),B.style.transition=r.transitions.create("opacity",D),v&&v(B)}),j=C(y),R=B=>{i&&i(x.current,B)};return m.jsx($,T({appear:s,in:p,nodeRef:x,onEnter:F,onEntered:L,onEntering:N,onExit:S,onExited:j,onExiting:V,addEndListener:R,timeout:k},w,{children:(B,D)=>E.cloneElement(l,T({style:T({opacity:0,visibility:B==="exited"&&!p?"hidden":void 0},$f[B],h,l.props.style),ref:g},D))}))});process.env.NODE_ENV!=="production"&&(Za.propTypes={addEndListener:a.func,appear:a.bool,children:vn.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const _f=Za;function If(e){return Ke("MuiBackdrop",e)}ct("MuiBackdrop",["root","invisible"]);const Af=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Df=e=>{const{classes:t,invisible:n}=e;return ot({root:["root",n&&"invisible"]},If,t)},Bf=Te("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),Qa=E.forwardRef(function(t,n){var r,o,i;const s=it({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:p="div",components:u={},componentsProps:f={},invisible:d=!1,open:v,slotProps:y={},slots:b={},TransitionComponent:h=_f,transitionDuration:k}=s,$=de(s,Af),w=T({},s,{component:p,invisible:d}),x=Df(w),g=(r=y.root)!=null?r:f.root;return m.jsx(h,T({in:v,timeout:k},$,{children:m.jsx(Bf,T({"aria-hidden":!0},g,{as:(o=(i=b.root)!=null?i:u.Root)!=null?o:p,className:Ee(x.root,c,g==null?void 0:g.className),ownerState:T({},w,g==null?void 0:g.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(Qa.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Lf=Qa;function Ff(e){return Ke("MuiModal",e)}ct("MuiModal",["root","hidden","backdrop"]);const Vf=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],zf=e=>{const{open:t,exited:n,classes:r}=e;return ot({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Ff,r)},Uf=Te("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),qf=Te(Lf,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),es=E.forwardRef(function(t,n){var r,o,i,s,l,c;const p=it({name:"MuiModal",props:t}),{BackdropComponent:u=qf,BackdropProps:f,className:d,closeAfterTransition:v=!1,children:y,container:b,component:h,components:k={},componentsProps:$={},disableAutoFocus:w=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:g=!1,disablePortal:C=!1,disableRestoreFocus:N=!1,disableScrollLock:F=!1,hideBackdrop:L=!1,keepMounted:V=!1,onBackdropClick:S,open:j,slotProps:R,slots:B}=p,D=de(p,Vf),M=T({},p,{closeAfterTransition:v,disableAutoFocus:w,disableEnforceFocus:x,disableEscapeKeyDown:g,disablePortal:C,disableRestoreFocus:N,disableScrollLock:F,hideBackdrop:L,keepMounted:V}),{getRootProps:z,getBackdropProps:ee,getTransitionProps:Q,portalRef:O,isTopModal:A,exited:q,hasTransition:Y}=Mc(T({},M,{rootRef:n})),U=T({},M,{exited:q}),H=zf(U),G={};if(y.props.tabIndex===void 0&&(G.tabIndex="-1"),Y){const{onEnter:Z,onExited:P}=Q();G.onEnter=Z,G.onExited=P}const X=(r=(o=B==null?void 0:B.root)!=null?o:k.Root)!=null?r:Uf,W=(i=(s=B==null?void 0:B.backdrop)!=null?s:k.Backdrop)!=null?i:u,K=(l=R==null?void 0:R.root)!=null?l:$.root,J=(c=R==null?void 0:R.backdrop)!=null?c:$.backdrop,oe=Et({elementType:X,externalSlotProps:K,externalForwardedProps:D,getSlotProps:z,additionalProps:{ref:n,as:h},ownerState:U,className:Ee(d,K==null?void 0:K.className,H==null?void 0:H.root,!U.open&&U.exited&&(H==null?void 0:H.hidden))}),_=Et({elementType:W,externalSlotProps:J,additionalProps:f,getSlotProps:Z=>ee(T({},Z,{onClick:P=>{S&&S(P),Z!=null&&Z.onClick&&Z.onClick(P)}})),className:Ee(J==null?void 0:J.className,f==null?void 0:f.className,H==null?void 0:H.backdrop),ownerState:U});return!V&&!j&&(!Y||q)?null:m.jsx(fn,{ref:O,container:b,disablePortal:C,children:m.jsxs(X,T({},oe,{children:[!L&&u?m.jsx(W,T({},_)):null,m.jsx(Fn,{disableEnforceFocus:x,disableAutoFocus:w,disableRestoreFocus:N,isEnabled:A,open:j,children:E.cloneElement(y,G)})]}))})});process.env.NODE_ENV!=="production"&&(es.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:vn.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([tt,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Hf=es;function Wf(e){return Ke("MuiPaper",e)}ct("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Gf=["className","component","elevation","square","variant"],Xf=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return ot(i,Wf,o)},Yf=Te("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${qn("#fff",wi(t.elevation))}, ${qn("#fff",wi(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),ts=E.forwardRef(function(t,n){const r=it({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,p=de(r,Gf),u=T({},r,{component:i,elevation:s,square:l,variant:c}),f=Xf(u);return process.env.NODE_ENV!=="production"&&Tn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),m.jsx(Yf,T({as:i,ownerState:u,className:Ee(f.root,o),ref:n},p))});process.env.NODE_ENV!=="production"&&(ts.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:Ut(da,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const Kf=ts;function Jf(e){return Ke("MuiPopover",e)}ct("MuiPopover",["root","paper"]);const Zf=["onEntering"],Qf=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],em=["slotProps"];function Ci(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Si(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function Ni(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function An(e){return typeof e=="function"?e():e}const tm=e=>{const{classes:t}=e;return ot({root:["root"],paper:["paper"]},Jf,t)},nm=Te(Hf,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ns=Te(Kf,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),rs=E.forwardRef(function(t,n){var r,o,i;const s=it({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:p={vertical:"top",horizontal:"left"},anchorPosition:u,anchorReference:f="anchorEl",children:d,className:v,container:y,elevation:b=8,marginThreshold:h=16,open:k,PaperProps:$={},slots:w,slotProps:x,transformOrigin:g={vertical:"top",horizontal:"left"},TransitionComponent:C=Br,transitionDuration:N="auto",TransitionProps:{onEntering:F}={},disableScrollLock:L=!1}=s,V=de(s.TransitionProps,Zf),S=de(s,Qf),j=(r=x==null?void 0:x.paper)!=null?r:$,R=E.useRef(),B=Fe(R,j.ref),D=T({},s,{anchorOrigin:p,anchorReference:f,elevation:b,marginThreshold:h,externalPaperSlotProps:j,transformOrigin:g,TransitionComponent:C,transitionDuration:N,TransitionProps:V}),M=tm(D),z=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(u||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),u;const Z=An(c),P=Z&&Z.nodeType===1?Z:ke(R.current).body,ie=P.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const we=P.getBoundingClientRect();process.env.NODE_ENV!=="test"&&we.top===0&&we.left===0&&we.right===0&&we.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:ie.top+Ci(ie,p.vertical),left:ie.left+Si(ie,p.horizontal)}},[c,p.horizontal,p.vertical,u,f]),ee=E.useCallback(Z=>({vertical:Ci(Z,g.vertical),horizontal:Si(Z,g.horizontal)}),[g.horizontal,g.vertical]),Q=E.useCallback(Z=>{const P={width:Z.offsetWidth,height:Z.offsetHeight},ie=ee(P);if(f==="none")return{top:null,left:null,transformOrigin:Ni(ie)};const we=z();let Oe=we.top-ie.vertical,be=we.left-ie.horizontal;const dt=Oe+P.height,Ce=be+P.width,Je=Dt(An(c)),Me=Je.innerHeight-h,Ze=Je.innerWidth-h;if(h!==null&&Oe<h){const xe=Oe-h;Oe-=xe,ie.vertical+=xe}else if(h!==null&&dt>Me){const xe=dt-Me;Oe-=xe,ie.vertical+=xe}if(process.env.NODE_ENV!=="production"&&P.height>Me&&P.height&&Me&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${P.height-Me}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&be<h){const xe=be-h;be-=xe,ie.horizontal+=xe}else if(Ce>Ze){const xe=Ce-Ze;be-=xe,ie.horizontal+=xe}return{top:`${Math.round(Oe)}px`,left:`${Math.round(be)}px`,transformOrigin:Ni(ie)}},[c,f,z,ee,h]),[O,A]=E.useState(k),q=E.useCallback(()=>{const Z=R.current;if(!Z)return;const P=Q(Z);P.top!==null&&(Z.style.top=P.top),P.left!==null&&(Z.style.left=P.left),Z.style.transformOrigin=P.transformOrigin,A(!0)},[Q]);E.useEffect(()=>(L&&window.addEventListener("scroll",q),()=>window.removeEventListener("scroll",q)),[c,L,q]);const Y=(Z,P)=>{F&&F(Z,P),q()},U=()=>{A(!1)};E.useEffect(()=>{k&&q()}),E.useImperativeHandle(l,()=>k?{updatePosition:()=>{q()}}:null,[k,q]),E.useEffect(()=>{if(!k)return;const Z=ia(()=>{q()}),P=Dt(c);return P.addEventListener("resize",Z),()=>{Z.clear(),P.removeEventListener("resize",Z)}},[c,k,q]);let H=N;N==="auto"&&!C.muiSupportAuto&&(H=void 0);const G=y||(c?ke(An(c)).body:void 0),X=(o=w==null?void 0:w.root)!=null?o:nm,W=(i=w==null?void 0:w.paper)!=null?i:ns,K=Et({elementType:W,externalSlotProps:T({},j,{style:O?j.style:T({},j.style,{opacity:0})}),additionalProps:{elevation:b,ref:B},ownerState:D,className:Ee(M.paper,j==null?void 0:j.className)}),J=Et({elementType:X,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:S,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:G,open:k},ownerState:D,className:Ee(M.root,v)}),{slotProps:oe}=J,_=de(J,em);return m.jsx(X,T({},_,!ga(X)&&{slotProps:oe,disableScrollLock:L},{children:m.jsx(C,T({appear:!0,in:k,onEntering:Y,onExited:U,timeout:H},V,{children:m.jsx(W,T({},K,{children:d}))}))}))});process.env.NODE_ENV!=="production"&&(rs.propTypes={action:Xr,anchorEl:Ut(a.oneOfType([tt,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=An(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([tt,a.func]),disableScrollLock:a.bool,elevation:da,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:Ml}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const rm=rs;function om(e){return Ke("MuiMenu",e)}ct("MuiMenu",["root","paper","list"]);const im=["onEntering"],am=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],sm={vertical:"top",horizontal:"right"},lm={vertical:"top",horizontal:"left"},cm=e=>{const{classes:t}=e;return ot({root:["root"],paper:["paper"],list:["list"]},om,t)},pm=Te(rm,{shouldForwardProp:e=>Aa(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),um=Te(ns,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),dm=Te(jf,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),os=E.forwardRef(function(t,n){var r,o;const i=it({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:p=!1,MenuListProps:u={},onClose:f,open:d,PaperProps:v={},PopoverClasses:y,transitionDuration:b="auto",TransitionProps:{onEntering:h}={},variant:k="selectedMenu",slots:$={},slotProps:w={}}=i,x=de(i.TransitionProps,im),g=de(i,am),C=Tn(),N=C.direction==="rtl",F=T({},i,{autoFocus:s,disableAutoFocusItem:p,MenuListProps:u,onEntering:h,PaperProps:v,transitionDuration:b,TransitionProps:x,variant:k}),L=cm(F),V=s&&!p&&d,S=E.useRef(null),j=(Q,O)=>{S.current&&S.current.adjustStyleForScrollbar(Q,C),h&&h(Q,O)},R=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let B=-1;E.Children.map(l,(Q,O)=>{E.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&Bn.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(k==="selectedMenu"&&Q.props.selected||B===-1)&&(B=O))});const D=(r=$.paper)!=null?r:um,M=(o=w.paper)!=null?o:v,z=Et({elementType:$.root,externalSlotProps:w.root,ownerState:F,className:[L.root,c]}),ee=Et({elementType:D,externalSlotProps:M,ownerState:F,className:L.paper});return m.jsx(pm,T({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?sm:lm,slots:{paper:D,root:$.root},slotProps:{root:z,paper:ee},open:d,ref:n,transitionDuration:b,TransitionProps:T({onEntering:j},x),ownerState:F},g,{classes:y,children:m.jsx(dm,T({onKeyDown:R,actions:S,autoFocus:s&&(B===-1||p),autoFocusItem:V,variant:k},u,{className:Ee(L.list,u.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(os.propTypes={anchorEl:a.oneOfType([tt,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const fm=os;function mm({className:e,commandHandler:t,menuDefinition:n,children:r}){var p;const[o,i]=I.useState(void 0),s=I.useCallback(u=>{u.preventDefault(),i(o===void 0?{mouseX:u.clientX+2,mouseY:u.clientY-6}:void 0)},[o]),l=I.useCallback(()=>{i(void 0)},[]),c=I.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((p=n==null?void 0:n.items)==null?void 0:p.length)??0)===0||!r?r:m.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,m.jsx(fm,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:m.jsx(ho,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const hm=qa(m.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function gm(e){return{preserveValue:!0,...e}}const Wn=(e,t,n={})=>{const r=I.useRef(t);r.current=t;const o=I.useRef(n);o.current=gm(o.current);const[i,s]=I.useState(()=>r.current),[l,c]=I.useState(!0);return I.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const u=await e();p&&(s(()=>u),c(!1))}})(),()=>{p=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,l]};function is({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:s,children:l}){const[c,p]=I.useState(!1),[u,f]=I.useState(!1),d=I.useCallback(()=>{c&&p(!1),f(!1)},[c]),v=I.useCallback(x=>{x.stopPropagation(),p(g=>{const C=!g;return C&&x.shiftKey?f(!0):C||f(!1),C})},[]),y=I.useCallback(x=>(d(),r(x)),[r,d]),[b,h]=I.useState({top:1,left:1});I.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const g=x.getBoundingClientRect(),C=window.scrollY,N=window.scrollX,F=g.top+C+x.clientHeight,L=g.left+N;h({top:F,left:L})}}},[c,o]);const[k]=Wn(I.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=Wn(I.useCallback(async()=>(e==null?void 0:e(!0))??n??k,[e,n,k,c]),n??k),w=u&&$?$:k;return m.jsxs(m.Fragment,{children:[m.jsx(ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:v,children:l??m.jsx(hm,{})}),m.jsx(ye.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:b.top,left:b.left}},children:w?m.jsx(Ga,{className:i,id:`${s??""} main menu`,commandHandler:y,multiColumnMenu:w}):void 0})]})}function bm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:l,onClick:c,children:p}){return m.jsx(ye.IconButton,{id:e,disabled:n,edge:i,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:p})}const vm=Ri.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),go=I.forwardRef(({className:e,...t},n)=>m.jsx(ji.Root,{ref:n,className:te(vm(),e),...t}));go.displayName=ji.Root.displayName;function bn({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:l=!1,className:c,defaultValue:p,value:u,onChange:f,onFocus:d,onBlur:v}){return m.jsxs("div",{className:te("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[m.jsx(go,{htmlFor:e,className:te({"pr-text-red-600":n,"pr-hidden":!i}),children:`${i}${l?"*":""}`}),m.jsx(Xn,{id:e,disabled:t,placeholder:s,required:l,className:te(c,{"pr-border-red-600":n}),defaultValue:p,value:u,onChange:f,onFocus:d,onBlur:v}),m.jsx("p",{className:te({"pr-hidden":!o}),children:o})]})}let Tr;const Or=()=>(Tr||(Tr=ue.allBookIds.map(e=>({bookId:e,label:ue.bookIdToEnglishName(e)}))),Tr);function ym({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=c=>{const u={bookNum:ue.bookIdToNumber(c.bookId),chapterNum:1,verseNum:1};r(u)},i=c=>{t({...e,chapterNum:+c.target.value})},s=c=>{t({...e,verseNum:+c.target.value})},l=I.useMemo(()=>Or()[e.bookNum-1],[e.bookNum]);return m.jsxs("span",{id:n,className:"pr-flex pr-place-items-center",children:[m.jsxs("div",{className:"pr-inline-grid pr-items-center pr-gap-1.5",children:[m.jsx(go,{children:"Book"}),m.jsx(Dn,{value:l,options:Or(),onChange:o})]}),m.jsx(mt,{onClick:()=>r(qe.offsetBook(e,-1)),isDisabled:e.bookNum<=qe.FIRST_SCR_BOOK_NUM,children:"<"}),m.jsx(mt,{onClick:()=>r(qe.offsetBook(e,1)),isDisabled:e.bookNum>=Or().length,children:">"}),m.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),m.jsx(mt,{onClick:()=>t(qe.offsetChapter(e,-1)),isDisabled:e.chapterNum<=qe.FIRST_SCR_CHAPTER_NUM,children:"<"}),m.jsx(mt,{onClick:()=>t(qe.offsetChapter(e,1)),isDisabled:e.chapterNum>=qe.getChaptersForBook(e.bookNum),children:">"}),m.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),m.jsx(mt,{onClick:()=>t(qe.offsetVerse(e,-1)),isDisabled:e.verseNum<=qe.FIRST_SCR_VERSE_NUM,children:"<"}),m.jsx(mt,{onClick:()=>t(qe.offsetVerse(e,1)),children:">"})]})}function wm({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=I.useState(""),i=s=>{o(s),e(s)};return m.jsx(bn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>i(s.target.value)})}function xm({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:p="off",className:u,onChange:f,onChangeCommitted:d}){return m.jsx(ye.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:s,defaultValue:l,value:c,valueLabelDisplay:p,className:`papi-slider ${n} ${u??""}`,onChange:f,onChangeCommitted:d})}function Em({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return m.jsx(ye.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function km({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return m.jsx(ye.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function Pi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return m.jsx(bn,{defaultValue:t[n.key],onChange:r})}const Tm=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return m.jsx(Wr,{...r,isChecked:n,isDisabled:t,onChange:o})};function Om({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:p,enableSelectColumn:u,selectColumnWidth:f=50,rowKeyGetter:d,rowHeight:v=35,headerRowHeight:y=35,selectedRows:b,onSelectedRowsChange:h,onRowsChange:k,onCellClick:$,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:g,direction:C="ltr",enableVirtualization:N=!0,onCopy:F,onPaste:L,onScroll:V,className:S,"data-testid":j}){const R=I.useMemo(()=>{const B=e.map(D=>typeof D.editable=="function"?{...D,editable:z=>!!D.editable(z),renderEditCell:D.renderEditCell||Pi}:D.editable&&!D.renderEditCell?{...D,renderEditCell:Pi}:D.renderEditCell&&!D.editable?{...D,editable:!1}:D);return u?[{...jo.SelectColumn,minWidth:f},...B]:B},[e,u,f]);return m.jsx(jo,{columns:R,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:p,rowKeyGetter:d,rowHeight:v,headerRowHeight:y,selectedRows:b,onSelectedRowsChange:h,onRowsChange:k,onCellClick:$,onCellDoubleClick:w,onCellContextMenu:x,onCellKeyDown:g,direction:C,enableVirtualization:N,onCopy:F,onPaste:L,onScroll:V,renderers:{renderCheckbox:Tm},className:`papi-table ${S??"rdg-light"}`,"data-testid":j})}function Cm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=I.useRef(void 0);return m.jsx("div",{ref:i,style:{position:"relative"},children:m.jsx(ye.AppBar,{position:"static",id:r,children:m.jsxs(ye.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?m.jsx(is,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?m.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Sm=(e,t)=>{I.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Cr=()=>!1,Nm=(e,t)=>{const[n]=Wn(I.useCallback(async()=>{if(!e)return Cr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Cr,{preserveValue:!1});I.useEffect(()=>()=>{n!==Cr&&n()},[n])},Pm=je.Root,as=I.forwardRef(({className:e,...t},n)=>m.jsx(je.List,{ref:n,className:te("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));as.displayName=je.List.displayName;const ss=I.forwardRef(({className:e,...t},n)=>m.jsx(je.Trigger,{ref:n,className:te("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));ss.displayName=je.Trigger.displayName;const ls=I.forwardRef(({className:e,...t},n)=>m.jsx(je.Content,{ref:n,className:te("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));ls.displayName=je.Content.displayName;const cs=I.forwardRef(({className:e,...t},n)=>m.jsx(je.Root,{orientation:"vertical",ref:n,className:te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));cs.displayName=je.List.displayName;const ps=I.forwardRef(({className:e,...t},n)=>m.jsx(je.List,{ref:n,className:te("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));ps.displayName=je.List.displayName;const Rm=I.forwardRef(({className:e,...t},n)=>m.jsx(je.Trigger,{ref:n,...t,className:te("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),us=I.forwardRef(({className:e,...t},n)=>m.jsx(je.Content,{ref:n,className:te("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));us.displayName=je.Content.displayName;exports.BookChapterControl=il;exports.Button=mt;exports.ChapterRangeSelector=gl;exports.Checkbox=Wr;exports.Checklist=bl;exports.ComboBox=Dn;exports.ContextMenu=mm;exports.DropdownMenu=Bi;exports.DropdownMenuCheckboxItem=zi;exports.DropdownMenuContent=zr;exports.DropdownMenuGroup=qs;exports.DropdownMenuItem=Ur;exports.DropdownMenuLabel=Gn;exports.DropdownMenuPortal=Hs;exports.DropdownMenuRadioGroup=Gs;exports.DropdownMenuRadioItem=Ui;exports.DropdownMenuSeparator=qr;exports.DropdownMenuShortcut=qi;exports.DropdownMenuSub=Ws;exports.DropdownMenuSubContent=Vi;exports.DropdownMenuSubTrigger=Fi;exports.DropdownMenuTrigger=Li;exports.GridMenu=Ga;exports.HamburgerMenuButton=is;exports.IconButton=bm;exports.Input=Xn;exports.LabelPosition=bt;exports.MenuItem=mo;exports.RefSelector=ym;exports.SearchBar=wm;exports.Slider=xm;exports.Snackbar=Em;exports.Switch=km;exports.Table=Om;exports.Tabs=Pm;exports.TabsContent=ls;exports.TabsList=as;exports.TabsTrigger=ss;exports.TextField=bn;exports.Toolbar=Cm;exports.VerticalTabs=cs;exports.VerticalTabsContent=us;exports.VerticalTabsList=ps;exports.VerticalTabsTrigger=Rm;exports.useEvent=Sm;exports.useEventAsync=Nm;exports.usePromise=Wn;function jm(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}jm(`.papi-button {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.pr-inset-0 {
  inset: 0px;
}
.pr-left-2 {
  left: 0.5rem;
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
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
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
.pr-ml-2 {
  margin-left: 0.5rem;
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
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-\\[300px\\] {
  max-height: 300px;
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
.pr-w-72 {
  width: 18rem;
}
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-max-w-lg {
  max-width: 32rem;
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
.pr-flex-col {
  flex-direction: column;
}
.pr-flex-col-reverse {
  flex-direction: column-reverse;
}
.pr-flex-wrap {
  flex-wrap: wrap;
}
.pr-place-items-center {
  place-items: center;
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
.pr-gap-4 {
  gap: 1rem;
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-whitespace-nowrap {
  white-space: nowrap;
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
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.pr-bg-border {
  background-color: hsl(var(--border));
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
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
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
.pr-leading-none {
  line-height: 1;
}
.pr-tracking-tight {
  letter-spacing: -0.025em;
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
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-200 {
  transition-duration: 200ms;
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
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
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
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
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

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-text-left {
    text-align: left;
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
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
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
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`,"top");
//# sourceMappingURL=index.cjs.map
