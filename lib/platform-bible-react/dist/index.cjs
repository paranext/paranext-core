"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react/jsx-runtime"),S=require("react"),cs=require("platform-bible-utils"),ps=require("@radix-ui/react-dropdown-menu"),de=require("lucide-react"),Ne=require("clsx"),_l=require("tailwind-merge"),yt=require("@tanstack/react-table"),Il=require("@radix-ui/react-slot"),po=require("class-variance-authority"),Al=require("@radix-ui/react-select"),ye=require("@mui/material"),Gr=require("@mui/styled-engine"),un=require("react-dom"),Dl=require("@radix-ui/react-label"),Bl=require("@radix-ui/react-tabs"),Ll=require("@radix-ui/react-slider"),Fl=require("@radix-ui/react-switch");function ft(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const k=ft(S),me=ft(ps),we=ft(Al),Vl=ft(un),us=ft(Dl),_e=ft(Bl),dn=ft(Ll),Yr=ft(Fl);var zl=Object.defineProperty,Ul=(e,t,n)=>t in e?zl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Ul(e,typeof t!="symbol"?t+"":t,n);const Ot=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],uo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ds=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],oa=Ql();function Kt(e,t=!0){return t&&(e=e.toUpperCase()),e in oa?oa[e]:0}function fo(e){return Kt(e)>0}function Hl(e){const t=typeof e=="string"?Kt(e):e;return t>=40&&t<=66}function ql(e){return(typeof e=="string"?Kt(e):e)<=39}function fs(e){return e<=66}function Wl(e){const t=typeof e=="string"?Kt(e):e;return gs(t)&&!fs(t)}function*Xl(){for(let e=1;e<=Ot.length;e++)yield e}const Gl=1,hs=Ot.length;function Yl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ho(e,t="***"){const n=e-1;return n<0||n>=Ot.length?t:Ot[n]}function ms(e){return e<=0||e>hs?"******":ds[e-1]}function Kl(e){return ms(Kt(e))}function gs(e){const t=typeof e=="number"?ho(e):e;return fo(t)&&!uo.includes(t)}function Jl(e){const t=typeof e=="number"?ho(e):e;return fo(t)&&uo.includes(t)}function Zl(e){return ds[e-1].includes("*obsolete*")}function Ql(){const e={};for(let t=0;t<Ot.length;t++)e[Ot[t]]=t+1;return e}const he={allBookIds:Ot,nonCanonicalIds:uo,bookIdToNumber:Kt,isBookIdValid:fo,isBookNT:Hl,isBookOT:ql,isBookOTNT:fs,isBookDC:Wl,allBookNumbers:Xl,firstBook:Gl,lastBook:hs,extraBooks:Yl,bookNumberToId:ho,bookNumberToEnglishName:ms,bookIdToEnglishName:Kl,isCanonical:gs,isExtraMaterial:Jl,isObsolete:Zl};var Ge=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ge||{});const De=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ge[t]):(this._type=t,this.name=Ge[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(De,"Original",new De(Ge.Original)),re(De,"Septuagint",new De(Ge.Septuagint)),re(De,"Vulgate",new De(Ge.Vulgate)),re(De,"English",new De(Ge.English)),re(De,"RussianProtestant",new De(Ge.RussianProtestant)),re(De,"RussianOrthodox",new De(Ge.RussianOrthodox));let wt=De;function aa(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var bs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(bs||{});const je=class ie{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,s=n!=null&&n instanceof wt?n:void 0;this.setEmpty(s),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof wt?n:void 0;this.setEmpty(a),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof wt?t:ie.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof rn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:s}=t,l=a||o.toString();let c;return s&&(c=new wt(s)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return he.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=he.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>he.lastBook)throw new rn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new wt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const s=+a[1].trim();this.versification=new wt(Ge[s])}catch{throw new rn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new rn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||he.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new rn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;return(t===""||t===this.verseNum.toString())&&(t=void 0),{book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr}}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=aa(this._verse,r);for(const s of a.map(l=>aa(l,n))){const l=this.clone();l.verse=s[0];const c=l.verseNum;if(o.push(l),s.length>1){const d=this.clone();if(d.verse=s[1],!t)for(let h=c+1;h<d.verseNum;h++){const v=new ie(this._bookNum,this._chapterNum,h,this.versification);this.isExcluded||o.push(v)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>he.lastBook?2:(he.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=he.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(je,"defaultVersification",wt.English),re(je,"verseRangeSeparator","-"),re(je,"verseSequenceIndicator",","),re(je,"verseRangeSeparators",[je.verseRangeSeparator]),re(je,"verseSequenceIndicators",[je.verseSequenceIndicator]),re(je,"chapterDigitShifter",1e3),re(je,"bookDigitShifter",je.chapterDigitShifter*je.chapterDigitShifter),re(je,"bcvMaxValue",je.chapterDigitShifter-1),re(je,"ValidStatusType",bs);let rn=class extends Error{};const ec=_l.extendTailwindMerge({prefix:"pr-"});function q(...e){return ec(Ne.clsx(e))}const mo=me.Root,vs=me.Trigger,tc=me.Group,nc=me.Portal,rc=me.Sub,oc=me.RadioGroup,ys=S.forwardRef(({className:e,inset:t,children:n,...r},o)=>u.jsxs(me.SubTrigger,{ref:o,className:q("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,u.jsx(de.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));ys.displayName=me.SubTrigger.displayName;const ws=S.forwardRef(({className:e,...t},n)=>u.jsx(me.SubContent,{ref:n,className:q("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));ws.displayName=me.SubContent.displayName;const cr=S.forwardRef(({className:e,sideOffset:t=4,...n},r)=>u.jsx(me.Portal,{children:u.jsx(me.Content,{ref:r,sideOffset:t,className:q("pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));cr.displayName=me.Content.displayName;const go=S.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(me.Item,{ref:r,className:q("pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));go.displayName=me.Item.displayName;const bo=S.forwardRef(({className:e,children:t,checked:n,...r},o)=>u.jsxs(me.CheckboxItem,{ref:o,className:q("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(me.ItemIndicator,{children:u.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));bo.displayName=me.CheckboxItem.displayName;const xs=S.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(me.RadioItem,{ref:r,className:q("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(me.ItemIndicator,{children:u.jsx(de.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));xs.displayName=me.RadioItem.displayName;const Pn=S.forwardRef(({className:e,inset:t,...n},r)=>u.jsx(me.Label,{ref:r,className:q("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));Pn.displayName=me.Label.displayName;const pr=S.forwardRef(({className:e,...t},n)=>u.jsx(me.Separator,{ref:n,className:q("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));pr.displayName=me.Separator.displayName;function Es({className:e,...t}){return u.jsx("span",{className:q("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60",e),...t})}Es.displayName="DropdownMenuShortcut";const Rn=S.forwardRef(({className:e,type:t,...n},r)=>u.jsx("input",{type:t,className:q("pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));Rn.displayName="Input";const ac=S.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>u.jsxs("div",{className:"pr-relative",children:[u.jsx(Rn,{...o,type:"text",className:"pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",onChange:s=>e(s.target.value),onKeyDown:s=>{s.key==="Enter"&&r(),t(s)},onClick:n,ref:a}),u.jsx(de.History,{className:"pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",onClick:()=>{console.log("back in history")}})]}));function sc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),s=S.useCallback(l=>{o(l)},[o]);return u.jsx("div",{className:q("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"),children:a.map(l=>u.jsx("div",{className:q("pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",{"pr-font-semibold pr-text-amber-900":l===n,"pr-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>s(l),children:l},l))})}const ic=S.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:s},l)=>u.jsxs(go,{ref:l,textValue:e,className:q("pr-font-normal pr-text-slate-700",{"pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[u.jsx("span",{className:q("pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",{"pr-font-bold":n,"pr-border-l-red-200":a.toLowerCase()==="ot","pr-border-l-purple-200":a.toLowerCase()==="nt","pr-border-l-indigo-200":a.toLowerCase()==="dc"}),children:he.bookIdToEnglishName(e)}),n&&u.jsx("div",{children:s})]},e));function lc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return u.jsxs(Pn,{className:"pr-flex pr-justify-between",children:[u.jsx("p",{className:"pr-inline-block pr-align-middle",children:"Go To"}),u.jsxs("div",{className:"pr-flex pr-items-center",children:[u.jsx(de.ArrowDownWideNarrow,{onClick:e,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(de.Clock,{onClick:t,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"}),u.jsx(de.Bookmark,{onClick:n,className:"pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"})]})]})}const gn=he.allBookIds,cc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},sa=["OT","NT","DC"],pc=32+32+32,uc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],dc=e=>({OT:gn.filter(n=>he.isBookOT(n)),NT:gn.filter(n=>he.isBookNT(n)),DC:gn.filter(n=>he.isBookDC(n))})[e],on=e=>cs.getChaptersForBook(he.bookIdToNumber(e));function fc(){return gn.map(t=>he.bookIdToEnglishName(t))}function hc(e){return fc().includes(e)}function mc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(hc(t))return gn.find(r=>he.bookIdToEnglishName(r)===t)}function gc({scrRef:e,handleSubmit:t}){const[n,r]=S.useState(""),[o,a]=S.useState(he.bookNumberToId(e.bookNum)),[s,l]=S.useState(e.chapterNum??0),[c,d]=S.useState(he.bookNumberToId(e.bookNum)),[h,v]=S.useState(!1),[b,p]=S.useState(h),m=S.useRef(void 0),f=S.useRef(void 0),g=S.useRef(void 0),w=S.useCallback(R=>dc(R).filter(I=>{const A=he.bookIdToEnglishName(I).toLowerCase(),V=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return A.includes(V)||I.toLowerCase().includes(V)}),[n]),P=R=>{r(R)},x=S.useRef(!1),E=S.useCallback(R=>{if(x.current){x.current=!1;return}v(R)},[]),y=S.useCallback((R,I,A,V)=>{if(l(he.bookNumberToId(e.bookNum)!==R?1:e.chapterNum),I||on(R)===-1){t({bookNum:he.bookIdToNumber(R),chapterNum:A||1,verseNum:V||1}),v(!1),r("");return}a(o!==R?R:""),v(!I)},[t,e.bookNum,e.chapterNum,o]),N=R=>{R<=0||R>on(o)||y(o,!0,R)},T=S.useCallback(()=>{uc.forEach(R=>{const I=n.match(R);if(I){const[A,V=void 0,U=void 0]=I.slice(1),j=mc(A);(he.isBookIdValid(A)||j)&&y(j??A,!0,V?parseInt(V,10):1,U?parseInt(U,10):1)}})},[y,n]),M=S.useCallback(R=>{h?(R.key==="ArrowDown"||R.key==="ArrowUp")&&(typeof g<"u"&&g.current!==null?g.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),R.preventDefault()):v(!0)},[h]),D=R=>{const{key:I}=R;I==="ArrowRight"||I==="ArrowLeft"||I==="ArrowDown"||I==="ArrowUp"||I==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:I})),m.current.focus())},L=R=>{const{key:I}=R;if(c===o){if(I==="Enter"){R.preventDefault(),y(o,!0,s);return}let A=0;if(I==="ArrowRight")if(s<on(c))A=1;else{R.preventDefault();return}else if(I==="ArrowLeft")if(s>1)A=-1;else{R.preventDefault();return}else I==="ArrowDown"?A=6:I==="ArrowUp"&&(A=-6);s+A<=0||s+A>on(c)?l(0):A!==0&&(l(s+A),R.preventDefault())}};return S.useEffect(()=>{o===c?o===he.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),S.useLayoutEffect(()=>{p(h)},[h]),S.useLayoutEffect(()=>{const R=setTimeout(()=>{if(b&&f.current&&g.current){const A=g.current.offsetTop-pc;f.current.scrollTo({top:A,behavior:"instant"})}},10);return()=>{clearTimeout(R)}},[b]),u.jsx("div",{className:"pr-flex",children:u.jsxs(mo,{modal:!1,open:h,onOpenChange:E,children:[u.jsx(vs,{asChild:!0,children:u.jsx(ac,{ref:m,value:n,handleSearch:P,handleKeyDown:M,handleOnClick:()=>{a(he.bookNumberToId(e.bookNum)),d(he.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),v(!0),m.current.focus()},onFocus:()=>{x.current=!0},handleSubmit:T,placeholder:`${he.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),u.jsxs(cr,{className:"pr-overflow-y-auto pr-font-normal pr-text-slate-700",style:{width:"233px",maxHeight:"500px"},onKeyDown:D,align:"start",ref:f,children:[u.jsx(lc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),sa.map((R,I)=>w(R).length>0&&u.jsxs("div",{children:[u.jsx(Pn,{className:"pr-font-semibold pr-text-slate-700",children:cc[R]}),w(R).map(A=>u.jsx("div",{children:u.jsx(ic,{bookId:A,handleSelectBook:()=>y(A,!1),isSelected:o===A,handleHighlightBook:()=>d(A),handleKeyDown:L,bookType:R,ref:V=>{o===A&&(g.current=V)},children:u.jsx(sc,{handleSelectChapter:N,endChapter:on(A),activeChapter:e.bookNum===he.bookIdToNumber(A)?e.chapterNum:0,highlightedChapter:s,handleHighlightedChapter:V=>{l(V)}})})},A)),sa.length-1!==I?u.jsx(pr,{}):void 0]},R))]})]})})}const ur=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{className:"pr-relative pr-w-full pr-overflow-auto",children:u.jsx("table",{ref:n,className:q("pr-w-full pr-caption-bottom pr-text-sm",e),...t})}));ur.displayName="Table";const dr=S.forwardRef(({className:e,...t},n)=>u.jsx("thead",{ref:n,className:q("[&_tr]:pr-border-b",e),...t}));dr.displayName="TableHeader";const fr=S.forwardRef(({className:e,...t},n)=>u.jsx("tbody",{ref:n,className:q("[&_tr:last-child]:pr-border-0",e),...t}));fr.displayName="TableBody";const ks=S.forwardRef(({className:e,...t},n)=>u.jsx("tfoot",{ref:n,className:q("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",e),...t}));ks.displayName="TableFooter";const Nt=S.forwardRef(({className:e,...t},n)=>u.jsx("tr",{ref:n,className:q("pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",e),...t}));Nt.displayName="TableRow";const xn=S.forwardRef(({className:e,...t},n)=>u.jsx("th",{ref:n,className:q("pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",e),...t}));xn.displayName="TableHead";const Ut=S.forwardRef(({className:e,...t},n)=>u.jsx("td",{ref:n,className:q("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0",e),...t}));Ut.displayName="TableCell";const Ts=S.forwardRef(({className:e,...t},n)=>u.jsx("caption",{ref:n,className:q("pr-mt-4 pr-text-sm pr-text-muted-foreground",e),...t}));Ts.displayName="TableCaption";const Ss=po.cva("pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",{variants:{variant:{default:"pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",destructive:"pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",outline:"pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",secondary:"pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",ghost:"hover:pr-bg-accent hover:pr-text-accent-foreground",link:"pr-text-primary pr-underline-offset-4 hover:pr-underline"},size:{default:"pr-h-10 pr-px-4 pr-py-2",sm:"pr-h-9 pr-rounded-md pr-px-3",lg:"pr-h-11 pr-rounded-md pr-px-8",icon:"pr-h-10 pr-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Te=S.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const s=r?Il.Slot:"button";return u.jsx(s,{className:q(Ss({variant:t,size:n,className:e})),ref:a,...o})});Te.displayName="Button";const Zn=we.Root,bc=we.Group,Qn=we.Value,En=S.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Trigger,{ref:r,className:q("pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",e),...n,children:[t,u.jsx(we.Icon,{asChild:!0,children:u.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4 pr-opacity-50"})})]}));En.displayName=we.Trigger.displayName;const vo=S.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollUpButton,{ref:n,className:q("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(de.ChevronUp,{className:"pr-h-4 pr-w-4"})}));vo.displayName=we.ScrollUpButton.displayName;const yo=S.forwardRef(({className:e,...t},n)=>u.jsx(we.ScrollDownButton,{ref:n,className:q("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1",e),...t,children:u.jsx(de.ChevronDown,{className:"pr-h-4 pr-w-4"})}));yo.displayName=we.ScrollDownButton.displayName;const kn=S.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>u.jsx(we.Portal,{children:u.jsxs(we.Content,{ref:o,className:q("pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",e),position:n,...r,children:[u.jsx(vo,{}),u.jsx(we.Viewport,{className:q("pr-p-1",n==="popper"&&"pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"),children:t}),u.jsx(yo,{})]})}));kn.displayName=we.Content.displayName;const Ns=S.forwardRef(({className:e,...t},n)=>u.jsx(we.Label,{ref:n,className:q("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold",e),...t}));Ns.displayName=we.Label.displayName;const Xe=S.forwardRef(({className:e,children:t,...n},r)=>u.jsxs(we.Item,{ref:r,className:q("pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[u.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:u.jsx(we.ItemIndicator,{children:u.jsx(de.Check,{className:"pr-h-4 pr-w-4"})})}),u.jsx(we.ItemText,{children:t})]}));Xe.displayName=we.Item.displayName;const Cs=S.forwardRef(({className:e,...t},n)=>u.jsx(we.Separator,{ref:n,className:q("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));Cs.displayName=we.Separator.displayName;function vc({table:e}){return u.jsx("div",{className:"pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3",children:u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8",children:[u.jsxs("div",{className:"pr-flex-1 pr-text-sm pr-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsx("p",{className:"pr-text-nowrap pr-text-sm pr-font-medium",children:"Rows per page"}),u.jsxs(Zn,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[u.jsx(En,{className:"pr-h-8 pr-w-[70px]",children:u.jsx(Qn,{placeholder:e.getState().pagination.pageSize})}),u.jsx(kn,{side:"top",children:[10,20,30,40,50].map(t=>u.jsx(Xe,{value:`${t}`,children:t},t))})]})]}),u.jsxs("div",{className:"pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),u.jsxs("div",{className:"pr-flex pr-items-center pr-space-x-2",children:[u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to first page"}),u.jsx(de.ArrowLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to previous page"}),u.jsx(de.ChevronLeftIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-h-8 pr-w-8 pr-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to next page"}),u.jsx(de.ChevronRightIcon,{className:"pr-h-4 pr-w-4"})]}),u.jsxs(Te,{variant:"outline",size:"icon",className:"pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[u.jsx("span",{className:"pr-sr-only",children:"Go to last page"}),u.jsx(de.ArrowRightIcon,{className:"pr-h-4 pr-w-4"})]})]})]})})}function yc({table:e}){return u.jsxs(mo,{children:[u.jsx(ps.DropdownMenuTrigger,{asChild:!0,children:u.jsxs(Te,{variant:"outline",size:"sm",className:"pr-ml-auto pr-hidden pr-h-8 lg:pr-flex",children:[u.jsx(de.FilterIcon,{className:"pr-mr-2 pr-h-4 pr-w-4"}),"View"]})}),u.jsxs(cr,{align:"end",className:"pr-w-[150px]",children:[u.jsx(Pn,{children:"Toggle columns"}),u.jsx(pr,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>u.jsx(bo,{className:"pr-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}function Os({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,onRowClickHandler:a=()=>{}}){var f;const[s,l]=S.useState([]),[c,d]=S.useState([]),[h,v]=S.useState({}),[b,p]=S.useState({}),m=yt.useReactTable({data:t,columns:e,getCoreRowModel:yt.getCoreRowModel(),...n&&{getPaginationRowModel:yt.getPaginationRowModel()},onSortingChange:l,getSortedRowModel:yt.getSortedRowModel(),onColumnFiltersChange:d,getFilteredRowModel:yt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:p,state:{sorting:s,columnFilters:c,columnVisibility:h,rowSelection:b}});return u.jsxs("div",{children:[o&&u.jsx(yc,{table:m}),u.jsx("div",{className:"pr-twp pr-font-sans",children:u.jsxs(ur,{children:[u.jsx(dr,{children:m.getHeaderGroups().map(g=>u.jsx(Nt,{children:g.headers.map(w=>u.jsx(xn,{children:w.isPlaceholder?void 0:yt.flexRender(w.column.columnDef.header,w.getContext())},w.id))},g.id))}),u.jsx(fr,{children:(f=m.getRowModel().rows)!=null&&f.length?m.getRowModel().rows.map(g=>u.jsx(Nt,{onClick:()=>a(g,m),"data-state":g.getIsSelected()&&"selected",children:g.getVisibleCells().map(w=>u.jsx(Ut,{children:yt.flexRender(w.column.columnDef.cell,w.getContext())},w.id))},g.id)):u.jsx(Nt,{children:u.jsx(Ut,{colSpan:e.length,className:"pr-h-24 pr-text-center",children:"No results."})})})]})}),n&&u.jsxs("div",{className:"pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4",children:[u.jsx(Te,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),u.jsx(Te,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&u.jsx(vc,{table:m})]})}function Kr({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:a=!1,width:s,options:l=[],className:c,value:d,onChange:h,onFocus:v,onBlur:b,getOptionLabel:p}){return u.jsx(ye.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:a,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:d,onChange:h,onFocus:v,onBlur:b,getOptionLabel:p,renderInput:m=>u.jsx(ye.TextField,{...m,error:o,fullWidth:a,disabled:n,label:t,style:{width:s}})})}function wc({handleSelectStartChapter:e,handleSelectEndChapter:t,isDisabled:n=!1,chapterCount:r}){const[o,a]=S.useState(1),[s,l]=S.useState(r),[c,d]=S.useState(Array.from({length:r},(b,p)=>p+1));S.useEffect(()=>{a(1),e(1),l(r),t(r),d(Array.from({length:r},(b,p)=>p+1))},[r,t,e]);const h=(b,p)=>{a(p),e(p),p>s&&(l(p),t(p))},v=(b,p)=>{l(p),t(p),p<o&&(a(p),e(p))};return u.jsxs(u.Fragment,{children:[u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:n,control:u.jsx(Kr,{onChange:(b,p)=>h(b,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:b=>b.toString(),value:o,isDisabled:n},"start chapter"),label:"Chapters",labelPlacement:"start"}),u.jsx(ye.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:n,control:u.jsx(Kr,{onChange:(b,p)=>v(b,p),className:"book-selection-chapter",isClearable:!1,options:c,getOptionLabel:b=>b.toString(),value:s,isDisabled:n},"end chapter"),label:"to",labelPlacement:"start"})]})}var kt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(kt||{});function Ps({id:e,isChecked:t,labelText:n="",labelPosition:r=kt.After,isIndeterminate:o=!1,isDefaultChecked:a,isDisabled:s=!1,hasError:l=!1,className:c,onChange:d}){const h=u.jsx(ye.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:a,disabled:s,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:d});let v;if(n){const b=r===kt.Before||r===kt.Above,p=u.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),m=r===kt.Before||r===kt.After,f=m?p:u.jsx("div",{children:p}),g=m?h:u.jsx("div",{children:h});v=u.jsxs(ye.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:l,children:[b&&f,g,!b&&f]})}else v=h;return v}function xc({id:e,className:t,legend:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s}){return u.jsxs("fieldset",{id:e,className:t,children:[n&&u.jsx("legend",{children:n}),r.map(l=>u.jsx(Ps,{className:"check-item",isChecked:o.includes(l),labelText:s?s(l):l,onChange:()=>a(l)},l))]})}function fe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}function Ec(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function kc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Jr={exports:{}},Vn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ia;function Tc(){if(ia)return le;ia=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,h=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(y){if(typeof y=="object"&&y!==null){var N=y.$$typeof;switch(N){case t:switch(y=y.type,y){case c:case d:case r:case a:case o:case v:return y;default:switch(y=y&&y.$$typeof,y){case l:case h:case m:case p:case s:return y;default:return N}}case n:return N}}}function E(y){return x(y)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=s,le.Element=t,le.ForwardRef=h,le.Fragment=r,le.Lazy=m,le.Memo=p,le.Portal=n,le.Profiler=a,le.StrictMode=o,le.Suspense=v,le.isAsyncMode=function(y){return E(y)||x(y)===c},le.isConcurrentMode=E,le.isContextConsumer=function(y){return x(y)===l},le.isContextProvider=function(y){return x(y)===s},le.isElement=function(y){return typeof y=="object"&&y!==null&&y.$$typeof===t},le.isForwardRef=function(y){return x(y)===h},le.isFragment=function(y){return x(y)===r},le.isLazy=function(y){return x(y)===m},le.isMemo=function(y){return x(y)===p},le.isPortal=function(y){return x(y)===n},le.isProfiler=function(y){return x(y)===a},le.isStrictMode=function(y){return x(y)===o},le.isSuspense=function(y){return x(y)===v},le.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===r||y===d||y===a||y===o||y===v||y===b||typeof y=="object"&&y!==null&&(y.$$typeof===m||y.$$typeof===p||y.$$typeof===s||y.$$typeof===l||y.$$typeof===h||y.$$typeof===g||y.$$typeof===w||y.$$typeof===P||y.$$typeof===f)},le.typeOf=x,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var la;function Sc(){return la||(la=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,h=e?Symbol.for("react.forward_ref"):60112,v=e?Symbol.for("react.suspense"):60113,b=e?Symbol.for("react.suspense_list"):60120,p=e?Symbol.for("react.memo"):60115,m=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,w=e?Symbol.for("react.responder"):60118,P=e?Symbol.for("react.scope"):60119;function x(B){return typeof B=="string"||typeof B=="function"||B===r||B===d||B===a||B===o||B===v||B===b||typeof B=="object"&&B!==null&&(B.$$typeof===m||B.$$typeof===p||B.$$typeof===s||B.$$typeof===l||B.$$typeof===h||B.$$typeof===g||B.$$typeof===w||B.$$typeof===P||B.$$typeof===f)}function E(B){if(typeof B=="object"&&B!==null){var te=B.$$typeof;switch(te){case t:var _=B.type;switch(_){case c:case d:case r:case a:case o:case v:return _;default:var se=_&&_.$$typeof;switch(se){case l:case h:case m:case p:case s:return se;default:return te}}case n:return te}}}var y=c,N=d,T=l,M=s,D=t,L=h,R=r,I=m,A=p,V=n,U=a,j=o,F=v,ee=!1;function Z(B){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),C(B)||E(B)===c}function C(B){return E(B)===d}function $(B){return E(B)===l}function z(B){return E(B)===s}function G(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function H(B){return E(B)===h}function W(B){return E(B)===r}function Y(B){return E(B)===m}function K(B){return E(B)===p}function X(B){return E(B)===n}function J(B){return E(B)===a}function Q(B){return E(B)===o}function ae(B){return E(B)===v}ce.AsyncMode=y,ce.ConcurrentMode=N,ce.ContextConsumer=T,ce.ContextProvider=M,ce.Element=D,ce.ForwardRef=L,ce.Fragment=R,ce.Lazy=I,ce.Memo=A,ce.Portal=V,ce.Profiler=U,ce.StrictMode=j,ce.Suspense=F,ce.isAsyncMode=Z,ce.isConcurrentMode=C,ce.isContextConsumer=$,ce.isContextProvider=z,ce.isElement=G,ce.isForwardRef=H,ce.isFragment=W,ce.isLazy=Y,ce.isMemo=K,ce.isPortal=X,ce.isProfiler=J,ce.isStrictMode=Q,ce.isSuspense=ae,ce.isValidElementType=x,ce.typeOf=E}()),ce}var ca;function Rs(){return ca||(ca=1,process.env.NODE_ENV==="production"?Vn.exports=Tc():Vn.exports=Sc()),Vn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var jr,pa;function Nc(){if(pa)return jr;pa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var s={},l=0;l<10;l++)s["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(s).map(function(h){return s[h]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(h){d[h]=h}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return jr=o()?Object.assign:function(a,s){for(var l,c=r(a),d,h=1;h<arguments.length;h++){l=Object(arguments[h]);for(var v in l)t.call(l,v)&&(c[v]=l[v]);if(e){d=e(l);for(var b=0;b<d.length;b++)n.call(l,d[b])&&(c[d[b]]=l[d[b]])}}return c},jr}var $r,ua;function wo(){if(ua)return $r;ua=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $r=e,$r}var Mr,da;function js(){return da||(da=1,Mr=Function.call.bind(Object.prototype.hasOwnProperty)),Mr}var _r,fa;function Cc(){if(fa)return _r;fa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=wo(),n={},r=js();e=function(a){var s="Warning: "+a;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(a,s,l,c,d){if(process.env.NODE_ENV!=="production"){for(var h in a)if(r(a,h)){var v;try{if(typeof a[h]!="function"){var b=Error((c||"React class")+": "+l+" type `"+h+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[h]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw b.name="Invariant Violation",b}v=a[h](s,h,c,l,null,t)}catch(m){v=m}if(v&&!(v instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+h+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof v+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),v instanceof Error&&!(v.message in n)){n[v.message]=!0;var p=d?d():"";e("Failed "+l+" type: "+v.message+(p??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},_r=o,_r}var Ir,ha;function Oc(){if(ha)return Ir;ha=1;var e=Rs(),t=Nc(),n=wo(),r=js(),o=Cc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function s(){return null}return Ir=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,h="@@iterator";function v(C){var $=C&&(d&&C[d]||C[h]);if(typeof $=="function")return $}var b="<<anonymous>>",p={array:w("array"),bigint:w("bigint"),bool:w("boolean"),func:w("function"),number:w("number"),object:w("object"),string:w("string"),symbol:w("symbol"),any:P(),arrayOf:x,element:E(),elementType:y(),instanceOf:N,node:L(),objectOf:M,oneOf:T,oneOfType:D,shape:I,exact:A};function m(C,$){return C===$?C!==0||1/C===1/$:C!==C&&$!==$}function f(C,$){this.message=C,this.data=$&&typeof $=="object"?$:{},this.stack=""}f.prototype=Error.prototype;function g(C){if(process.env.NODE_ENV!=="production")var $={},z=0;function G(W,Y,K,X,J,Q,ae){if(X=X||b,Q=Q||K,ae!==n){if(c){var B=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw B.name="Invariant Violation",B}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var te=X+":"+K;!$[te]&&z<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),$[te]=!0,z++)}}return Y[K]==null?W?Y[K]===null?new f("The "+J+" `"+Q+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new f("The "+J+" `"+Q+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:C(Y,K,X,J,Q)}var H=G.bind(null,!1);return H.isRequired=G.bind(null,!0),H}function w(C){function $(z,G,H,W,Y,K){var X=z[G],J=j(X);if(J!==C){var Q=F(X);return new f("Invalid "+W+" `"+Y+"` of type "+("`"+Q+"` supplied to `"+H+"`, expected ")+("`"+C+"`."),{expectedType:C})}return null}return g($)}function P(){return g(s)}function x(C){function $(z,G,H,W,Y){if(typeof C!="function")return new f("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside arrayOf.");var K=z[G];if(!Array.isArray(K)){var X=j(K);return new f("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an array."))}for(var J=0;J<K.length;J++){var Q=C(K,J,H,W,Y+"["+J+"]",n);if(Q instanceof Error)return Q}return null}return g($)}function E(){function C($,z,G,H,W){var Y=$[z];if(!l(Y)){var K=j(Y);return new f("Invalid "+H+" `"+W+"` of type "+("`"+K+"` supplied to `"+G+"`, expected a single ReactElement."))}return null}return g(C)}function y(){function C($,z,G,H,W){var Y=$[z];if(!e.isValidElementType(Y)){var K=j(Y);return new f("Invalid "+H+" `"+W+"` of type "+("`"+K+"` supplied to `"+G+"`, expected a single ReactElement type."))}return null}return g(C)}function N(C){function $(z,G,H,W,Y){if(!(z[G]instanceof C)){var K=C.name||b,X=Z(z[G]);return new f("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected ")+("instance of `"+K+"`."))}return null}return g($)}function T(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),s;function $(z,G,H,W,Y){for(var K=z[G],X=0;X<C.length;X++)if(m(K,C[X]))return null;var J=JSON.stringify(C,function(ae,B){var te=F(B);return te==="symbol"?String(B):B});return new f("Invalid "+W+" `"+Y+"` of value `"+String(K)+"` "+("supplied to `"+H+"`, expected one of "+J+"."))}return g($)}function M(C){function $(z,G,H,W,Y){if(typeof C!="function")return new f("Property `"+Y+"` of component `"+H+"` has invalid PropType notation inside objectOf.");var K=z[G],X=j(K);if(X!=="object")return new f("Invalid "+W+" `"+Y+"` of type "+("`"+X+"` supplied to `"+H+"`, expected an object."));for(var J in K)if(r(K,J)){var Q=C(K,J,H,W,Y+"."+J,n);if(Q instanceof Error)return Q}return null}return g($)}function D(C){if(!Array.isArray(C))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var $=0;$<C.length;$++){var z=C[$];if(typeof z!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ee(z)+" at index "+$+"."),s}function G(H,W,Y,K,X){for(var J=[],Q=0;Q<C.length;Q++){var ae=C[Q],B=ae(H,W,Y,K,X,n);if(B==null)return null;B.data&&r(B.data,"expectedType")&&J.push(B.data.expectedType)}var te=J.length>0?", expected one of type ["+J.join(", ")+"]":"";return new f("Invalid "+K+" `"+X+"` supplied to "+("`"+Y+"`"+te+"."))}return g(G)}function L(){function C($,z,G,H,W){return V($[z])?null:new f("Invalid "+H+" `"+W+"` supplied to "+("`"+G+"`, expected a ReactNode."))}return g(C)}function R(C,$,z,G,H){return new f((C||"React class")+": "+$+" type `"+z+"."+G+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+H+"`.")}function I(C){function $(z,G,H,W,Y){var K=z[G],X=j(K);if(X!=="object")return new f("Invalid "+W+" `"+Y+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));for(var J in C){var Q=C[J];if(typeof Q!="function")return R(H,W,Y,J,F(Q));var ae=Q(K,J,H,W,Y+"."+J,n);if(ae)return ae}return null}return g($)}function A(C){function $(z,G,H,W,Y){var K=z[G],X=j(K);if(X!=="object")return new f("Invalid "+W+" `"+Y+"` of type `"+X+"` "+("supplied to `"+H+"`, expected `object`."));var J=t({},z[G],C);for(var Q in J){var ae=C[Q];if(r(C,Q)&&typeof ae!="function")return R(H,W,Y,Q,F(ae));if(!ae)return new f("Invalid "+W+" `"+Y+"` key `"+Q+"` supplied to `"+H+"`.\nBad object: "+JSON.stringify(z[G],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(C),null,"  "));var B=ae(K,Q,H,W,Y+"."+Q,n);if(B)return B}return null}return g($)}function V(C){switch(typeof C){case"number":case"string":case"undefined":return!0;case"boolean":return!C;case"object":if(Array.isArray(C))return C.every(V);if(C===null||l(C))return!0;var $=v(C);if($){var z=$.call(C),G;if($!==C.entries){for(;!(G=z.next()).done;)if(!V(G.value))return!1}else for(;!(G=z.next()).done;){var H=G.value;if(H&&!V(H[1]))return!1}}else return!1;return!0;default:return!1}}function U(C,$){return C==="symbol"?!0:$?$["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&$ instanceof Symbol:!1}function j(C){var $=typeof C;return Array.isArray(C)?"array":C instanceof RegExp?"object":U($,C)?"symbol":$}function F(C){if(typeof C>"u"||C===null)return""+C;var $=j(C);if($==="object"){if(C instanceof Date)return"date";if(C instanceof RegExp)return"regexp"}return $}function ee(C){var $=F(C);switch($){case"array":case"object":return"an "+$;case"boolean":case"date":case"regexp":return"a "+$;default:return $}}function Z(C){return!C.constructor||!C.constructor.name?b:C.constructor.name}return p.checkPropTypes=o,p.resetWarningCache=o.resetWarningCache,p.PropTypes=p,p},Ir}var Ar,ma;function Pc(){if(ma)return Ar;ma=1;var e=wo();function t(){}function n(){}return n.resetWarningCache=t,Ar=function(){function r(s,l,c,d,h,v){if(v!==e){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Ar}if(process.env.NODE_ENV!=="production"){var Rc=Rs(),jc=!0;Jr.exports=Oc()(Rc.isElement,jc)}else Jr.exports=Pc()();var $c=Jr.exports;const i=Ec($c);function Jt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function Tt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function $s(e){if(!Tt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=$s(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?O({},e):e;return Tt(e)&&Tt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(Tt(t[o])&&o in e&&Tt(e[o])?r[o]=rt(e[o],t[o],n):n.clone?r[o]=Tt(t[o])?$s(t[o]):t[o]:r[o]=t[o])}),r}function Mc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ms(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!Mc(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const _s=Jt(i.element,Ms);_s.isRequired=Jt(i.element.isRequired,Ms);const jn=_s;function _c(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ic(e,t,n,r,o){const a=e[t],s=o||t;if(a==null||typeof window>"u")return null;let l;return typeof a=="function"&&!_c(a)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ac=Jt(i.elementType,Ic),Dc="exact-prop: ​";function Is(e){return process.env.NODE_ENV==="production"?e:O({},e,{[Dc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Ht(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ga;function Bc(){if(ga)return pe;ga=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m;m=Symbol.for("react.module.reference");function f(g){if(typeof g=="object"&&g!==null){var w=g.$$typeof;switch(w){case e:switch(g=g.type,g){case n:case o:case r:case d:case h:return g;default:switch(g=g&&g.$$typeof,g){case l:case s:case c:case b:case v:case a:return g;default:return w}}case t:return w}}}return pe.ContextConsumer=s,pe.ContextProvider=a,pe.Element=e,pe.ForwardRef=c,pe.Fragment=n,pe.Lazy=b,pe.Memo=v,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=d,pe.SuspenseList=h,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(g){return f(g)===s},pe.isContextProvider=function(g){return f(g)===a},pe.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},pe.isForwardRef=function(g){return f(g)===c},pe.isFragment=function(g){return f(g)===n},pe.isLazy=function(g){return f(g)===b},pe.isMemo=function(g){return f(g)===v},pe.isPortal=function(g){return f(g)===t},pe.isProfiler=function(g){return f(g)===o},pe.isStrictMode=function(g){return f(g)===r},pe.isSuspense=function(g){return f(g)===d},pe.isSuspenseList=function(g){return f(g)===h},pe.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===n||g===o||g===r||g===d||g===h||g===p||typeof g=="object"&&g!==null&&(g.$$typeof===b||g.$$typeof===v||g.$$typeof===a||g.$$typeof===s||g.$$typeof===c||g.$$typeof===m||g.getModuleId!==void 0)},pe.typeOf=f,pe}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function Lc(){return ba||(ba=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),s=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),h=Symbol.for("react.suspense_list"),v=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),p=Symbol.for("react.offscreen"),m=!1,f=!1,g=!1,w=!1,P=!1,x;x=Symbol.for("react.module.reference");function E(_){return!!(typeof _=="string"||typeof _=="function"||_===n||_===o||P||_===r||_===d||_===h||w||_===p||m||f||g||typeof _=="object"&&_!==null&&(_.$$typeof===b||_.$$typeof===v||_.$$typeof===a||_.$$typeof===s||_.$$typeof===c||_.$$typeof===x||_.getModuleId!==void 0))}function y(_){if(typeof _=="object"&&_!==null){var se=_.$$typeof;switch(se){case e:var ke=_.type;switch(ke){case n:case o:case r:case d:case h:return ke;default:var Pe=ke&&ke.$$typeof;switch(Pe){case l:case s:case c:case b:case v:case a:return Pe;default:return se}}case t:return se}}}var N=s,T=a,M=e,D=c,L=n,R=b,I=v,A=t,V=o,U=r,j=d,F=h,ee=!1,Z=!1;function C(_){return ee||(ee=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function $(_){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function z(_){return y(_)===s}function G(_){return y(_)===a}function H(_){return typeof _=="object"&&_!==null&&_.$$typeof===e}function W(_){return y(_)===c}function Y(_){return y(_)===n}function K(_){return y(_)===b}function X(_){return y(_)===v}function J(_){return y(_)===t}function Q(_){return y(_)===o}function ae(_){return y(_)===r}function B(_){return y(_)===d}function te(_){return y(_)===h}ue.ContextConsumer=N,ue.ContextProvider=T,ue.Element=M,ue.ForwardRef=D,ue.Fragment=L,ue.Lazy=R,ue.Memo=I,ue.Portal=A,ue.Profiler=V,ue.StrictMode=U,ue.Suspense=j,ue.SuspenseList=F,ue.isAsyncMode=C,ue.isConcurrentMode=$,ue.isContextConsumer=z,ue.isContextProvider=G,ue.isElement=H,ue.isForwardRef=W,ue.isFragment=Y,ue.isLazy=K,ue.isMemo=X,ue.isPortal=J,ue.isProfiler=Q,ue.isStrictMode=ae,ue.isSuspense=B,ue.isSuspenseList=te,ue.isValidElementType=E,ue.typeOf=y}()),ue}process.env.NODE_ENV==="production"?Zr.exports=Bc():Zr.exports=Lc();var er=Zr.exports;const Fc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vc(e){const t=`${e}`.match(Fc);return t&&t[1]||""}function As(e,t=""){return e.displayName||e.name||Vc(e)||t}function va(e,t,n){const r=As(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function zc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return As(e,"Component");if(typeof e=="object")switch(e.$$typeof){case er.ForwardRef:return va(e,e.render,"ForwardRef");case er.Memo:return va(e,e.type,"memo");default:return}}}function ot(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],s=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Uc=i.oneOfType([i.func,i.object]),xo=Uc;function Ke(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Ht(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Qr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ds(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Hc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,s)=>{const l=o||"<<anonymous>>",c=s||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function qc(e,t){var n,r;return k.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Ce(e){return e&&e.ownerDocument||document}function qt(e){return Ce(e).defaultView||window}function Wc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?O({},t.propTypes):null;return o=>(a,s,l,c,d,...h)=>{const v=d||s,b=n==null?void 0:n[v];if(b){const p=b(a,s,l,c,d,...h);if(p)return p}return typeof a[s]<"u"&&!a[o]?new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function tr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Xc=typeof window<"u"?k.useLayoutEffect:k.useEffect,Pt=Xc;let ya=0;function Gc(e){const[t,n]=k.useState(e),r=e||t;return k.useEffect(()=>{t==null&&(ya+=1,n(`mui-${ya}`))},[t]),r}const wa=k["useId".toString()];function Bs(e){if(wa!==void 0){const t=wa();return e??t}return Gc(e)}function Yc(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function Ls({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=k.useRef(e!==void 0),[a,s]=k.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){k.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=k.useRef(t);k.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=k.useCallback(d=>{o||s(d)},[]);return[l,c]}function Tn(e){const t=k.useRef(e);return Pt(()=>{t.current=e}),k.useRef((...n)=>(0,t.current)(...n)).current}function Ue(...e){return k.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{tr(n,t)})},e)}const xa={};function Kc(e,t){const n=k.useRef(xa);return n.current===xa&&(n.current=e(t)),n}const Jc=[];function Zc(e){k.useEffect(e,Jc)}class $n{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new $n}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function fn(){const e=Kc($n.create).current;return Zc(e.disposeEffect),e}let hr=!0,eo=!1;const Qc=new $n,ep={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function tp(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&ep[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function np(e){e.metaKey||e.altKey||e.ctrlKey||(hr=!0)}function Dr(){hr=!1}function rp(){this.visibilityState==="hidden"&&eo&&(hr=!0)}function op(e){e.addEventListener("keydown",np,!0),e.addEventListener("mousedown",Dr,!0),e.addEventListener("pointerdown",Dr,!0),e.addEventListener("touchstart",Dr,!0),e.addEventListener("visibilitychange",rp,!0)}function ap(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return hr||tp(t)}function Fs(){const e=k.useCallback(o=>{o!=null&&op(o.ownerDocument)},[]),t=k.useRef(!1);function n(){return t.current?(eo=!0,Qc.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return ap(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Vs(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function sp(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function ip(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const lp=Number.isInteger||ip;function zs(e,t,n,r){const o=e[t];if(o==null||!lp(o)){const a=sp(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Us(e,t,...n){return e[t]===void 0?null:zs(e,t,...n)}function to(){return null}Us.isRequired=zs;to.isRequired=to;const Hs=process.env.NODE_ENV==="production"?to:Us;function qs(e,t){const n=O({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=O({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=O({},a),Object.keys(o).forEach(s=>{n[r][s]=qs(o[s],a[s])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function it(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,s)=>{if(s){const l=t(s);l!==""&&a.push(l),n&&n[s]&&a.push(n[s])}return a},[]).join(" ")}),r}const Ea=e=>e,cp=()=>{let e=Ea;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ea}}},pp=cp(),Ws=pp,Xs={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ze(e,t,n="Mui"){const r=Xs[t];return r?`${n}-${r}`:`${Ws.generate(e)}-${t}`}function ht(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=Ze(e,o,n)}),r}function up(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Gs(e){return typeof e=="string"}function hn(e,t,n){return e===void 0||Gs(e)?t:O({},t,{ownerState:O({},t.ownerState,n)})}const dp={disableDefaultClasses:!1},fp=k.createContext(dp);function hp(e){const{disableDefaultClasses:t}=k.useContext(fp);return n=>t?"":e(n)}function Ys(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function mp(e,t,n){return typeof e=="function"?e(t,n):e}function ka(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function gp(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const p=Ne(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),m=O({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=O({},n,o,r);return p.length>0&&(f.className=p),Object.keys(m).length>0&&(f.style=m),{props:f,internalRef:void 0}}const s=Ys(O({},o,r)),l=ka(r),c=ka(o),d=t(s),h=Ne(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=O({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),b=O({},d,n,c,l);return h.length>0&&(b.className=h),Object.keys(v).length>0&&(b.style=v),{props:b,internalRef:d.ref}}const bp=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Rt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,s=fe(e,bp),l=a?{}:mp(r,o),{props:c,internalRef:d}=gp(O({},s,{externalSlotProps:l})),h=Ue(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return hn(n,O({},c,{ref:h}),o)}const Ks="base";function vp(e){return`${Ks}--${e}`}function yp(e,t){return`${Ks}-${e}-${t}`}function Js(e,t){const n=Xs[t];return n?vp(n):yp(e,t)}function wp(e,t){const n={};return t.forEach(r=>{n[r]=Js(e,r)}),n}const xp=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ep(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function kp(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Tp(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||kp(e))}function Sp(e){const t=[],n=[];return Array.from(e.querySelectorAll(xp)).forEach((r,o)=>{const a=Ep(r);a===-1||!Tp(r)||(a===0?t.push(r):n.push({documentOrder:o,tabIndex:a,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Np(){return!0}function nr(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:a=Sp,isEnabled:s=Np,open:l}=e,c=k.useRef(!1),d=k.useRef(null),h=k.useRef(null),v=k.useRef(null),b=k.useRef(null),p=k.useRef(!1),m=k.useRef(null),f=Ue(t.ref,m),g=k.useRef(null);k.useEffect(()=>{!l||!m.current||(p.current=!n)},[n,l]),k.useEffect(()=>{if(!l||!m.current)return;const x=Ce(m.current);return m.current.contains(x.activeElement)||(m.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),m.current.setAttribute("tabIndex","-1")),p.current&&m.current.focus()),()=>{o||(v.current&&v.current.focus&&(c.current=!0,v.current.focus()),v.current=null)}},[l]),k.useEffect(()=>{if(!l||!m.current)return;const x=Ce(m.current),E=T=>{g.current=T,!(r||!s()||T.key!=="Tab")&&x.activeElement===m.current&&T.shiftKey&&(c.current=!0,h.current&&h.current.focus())},y=()=>{const T=m.current;if(T===null)return;if(!x.hasFocus()||!s()||c.current){c.current=!1;return}if(T.contains(x.activeElement)||r&&x.activeElement!==d.current&&x.activeElement!==h.current)return;if(x.activeElement!==b.current)b.current=null;else if(b.current!==null)return;if(!p.current)return;let M=[];if((x.activeElement===d.current||x.activeElement===h.current)&&(M=a(m.current)),M.length>0){var D,L;const R=!!((D=g.current)!=null&&D.shiftKey&&((L=g.current)==null?void 0:L.key)==="Tab"),I=M[0],A=M[M.length-1];typeof I!="string"&&typeof A!="string"&&(R?A.focus():I.focus())}else T.focus()};x.addEventListener("focusin",y),x.addEventListener("keydown",E,!0);const N=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(N),x.removeEventListener("focusin",y),x.removeEventListener("keydown",E,!0)}},[n,r,o,s,l,a]);const w=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0,b.current=x.target;const E=t.props.onFocus;E&&E(x)},P=x=>{v.current===null&&(v.current=x.relatedTarget),p.current=!0};return u.jsxs(k.Fragment,{children:[u.jsx("div",{tabIndex:l?0:-1,onFocus:P,ref:d,"data-testid":"sentinelStart"}),k.cloneElement(t,{ref:f,onFocus:w}),u.jsx("div",{tabIndex:l?0:-1,onFocus:P,ref:h,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(nr.propTypes={children:jn,disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableRestoreFocus:i.bool,getTabbable:i.func,isEnabled:i.func,open:i.bool.isRequired});process.env.NODE_ENV!=="production"&&(nr["propTypes"]=Is(nr.propTypes));function Cp(e){return typeof e=="function"?e():e}const Sn=k.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[s,l]=k.useState(null),c=Ue(k.isValidElement(r)?r.ref:null,n);if(Pt(()=>{a||l(Cp(o)||document.body)},[o,a]),Pt(()=>{if(s&&!a)return tr(n,s),()=>{tr(n,null)}},[n,s,a]),a){if(k.isValidElement(r)){const d={ref:c};return k.cloneElement(r,d)}return u.jsx(k.Fragment,{children:r})}return u.jsx(k.Fragment,{children:s&&Vl.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&(Sn.propTypes={children:i.node,container:i.oneOfType([ot,i.func]),disablePortal:i.bool});process.env.NODE_ENV!=="production"&&(Sn["propTypes"]=Is(Sn.propTypes));function Op(e){const t=Ce(e);return t.body===e?qt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function bn(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function Ta(e){return parseInt(qt(e).getComputedStyle(e).paddingRight,10)||0}function Pp(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Sa(e,t,n,r,o){const a=[t,n,...r];[].forEach.call(e.children,s=>{const l=a.indexOf(s)===-1,c=!Pp(s);l&&c&&bn(s,o)})}function Br(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Rp(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Op(r)){const s=Vs(Ce(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${Ta(r)+s}px`;const l=Ce(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${Ta(c)+s}px`})}let a;if(r.parentNode instanceof DocumentFragment)a=Ce(r).body;else{const s=r.parentElement,l=qt(r);a=(s==null?void 0:s.nodeName)==="HTML"&&l.getComputedStyle(s).overflowY==="scroll"?s:r}n.push({value:a.style.overflow,property:"overflow",el:a},{value:a.style.overflowX,property:"overflow-x",el:a},{value:a.style.overflowY,property:"overflow-y",el:a}),a.style.overflow="hidden"}return()=>{n.forEach(({value:a,el:s,property:l})=>{a?s.style.setProperty(l,a):s.style.removeProperty(l)})}}function jp(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class $p{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&bn(t.modalRef,!1);const o=jp(n);Sa(n,t.mount,t.modalRef,o,!0);const a=Br(this.containers,s=>s.container===n);return a!==-1?(this.containers[a].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=Br(this.containers,a=>a.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Rp(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=Br(this.containers,s=>s.modals.indexOf(t)!==-1),a=this.containers[o];if(a.modals.splice(a.modals.indexOf(t),1),this.modals.splice(r,1),a.modals.length===0)a.restore&&a.restore(),t.modalRef&&bn(t.modalRef,n),Sa(a.container,t.mount,t.modalRef,a.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=a.modals[a.modals.length-1];s.modalRef&&bn(s.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Mp(e){return typeof e=="function"?e():e}function _p(e){return e?e.props.hasOwnProperty("in"):!1}const Ip=new $p;function Ap(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=Ip,closeAfterTransition:a=!1,onTransitionEnter:s,onTransitionExited:l,children:c,onClose:d,open:h,rootRef:v}=e,b=k.useRef({}),p=k.useRef(null),m=k.useRef(null),f=Ue(m,v),[g,w]=k.useState(!h),P=_p(c);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const E=()=>Ce(p.current),y=()=>(b.current.modalRef=m.current,b.current.mount=p.current,b.current),N=()=>{o.mount(y(),{disableScrollLock:r}),m.current&&(m.current.scrollTop=0)},T=Tn(()=>{const j=Mp(t)||E().body;o.add(y(),j),m.current&&N()}),M=k.useCallback(()=>o.isTopModal(y()),[o]),D=Tn(j=>{p.current=j,j&&(h&&M()?N():m.current&&bn(m.current,x))}),L=k.useCallback(()=>{o.remove(y(),x)},[x,o]);k.useEffect(()=>()=>{L()},[L]),k.useEffect(()=>{h?T():(!P||!a)&&L()},[h,L,P,a,T]);const R=j=>F=>{var ee;(ee=j.onKeyDown)==null||ee.call(j,F),!(F.key!=="Escape"||F.which===229||!M())&&(n||(F.stopPropagation(),d&&d(F,"escapeKeyDown")))},I=j=>F=>{var ee;(ee=j.onClick)==null||ee.call(j,F),F.target===F.currentTarget&&d&&d(F,"backdropClick")};return{getRootProps:(j={})=>{const F=Ys(e);delete F.onTransitionEnter,delete F.onTransitionExited;const ee=O({},F,j);return O({role:"presentation"},ee,{onKeyDown:R(ee),ref:f})},getBackdropProps:(j={})=>{const F=j;return O({"aria-hidden":!0},F,{onClick:I(F),open:h})},getTransitionProps:()=>{const j=()=>{w(!1),s&&s()},F=()=>{w(!0),l&&l(),a&&L()};return{onEnter:Qr(j,c==null?void 0:c.props.onEnter),onExited:Qr(F,c==null?void 0:c.props.onExited)}},rootRef:f,portalRef:D,isTopModal:M,exited:g,hasTransition:P}}var $e="top",He="bottom",qe="right",Me="left",Eo="auto",Mn=[$e,He,qe,Me],Wt="start",Nn="end",Dp="clippingParents",Zs="viewport",an="popper",Bp="reference",Na=Mn.reduce(function(e,t){return e.concat([t+"-"+Wt,t+"-"+Nn])},[]),Qs=[].concat(Mn,[Eo]).reduce(function(e,t){return e.concat([t,t+"-"+Wt,t+"-"+Nn])},[]),Lp="beforeRead",Fp="read",Vp="afterRead",zp="beforeMain",Up="main",Hp="afterMain",qp="beforeWrite",Wp="write",Xp="afterWrite",Gp=[Lp,Fp,Vp,zp,Up,Hp,qp,Wp,Xp];function Je(e){return e?(e.nodeName||"").toLowerCase():null}function Le(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function jt(e){var t=Le(e).Element;return e instanceof t||e instanceof Element}function ze(e){var t=Le(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function ko(e){if(typeof ShadowRoot>"u")return!1;var t=Le(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Yp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!ze(a)||!Je(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(s){var l=o[s];l===!1?a.removeAttribute(s):a.setAttribute(s,l===!0?"":l)}))})}function Kp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},s=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=s.reduce(function(c,d){return c[d]="",c},{});!ze(o)||!Je(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Jp={name:"applyStyles",enabled:!0,phase:"write",fn:Yp,effect:Kp,requires:["computeStyles"]};function Ye(e){return e.split("-")[0]}var Ct=Math.max,rr=Math.min,Xt=Math.round;function no(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ei(){return!/^((?!chrome|android).)*safari/i.test(no())}function Gt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&ze(e)&&(o=e.offsetWidth>0&&Xt(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Xt(r.height)/e.offsetHeight||1);var s=jt(e)?Le(e):window,l=s.visualViewport,c=!ei()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,h=(r.top+(c&&l?l.offsetTop:0))/a,v=r.width/o,b=r.height/a;return{width:v,height:b,top:h,right:d+v,bottom:h+b,left:d,x:d,y:h}}function To(e){var t=Gt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ti(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&ko(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Le(e).getComputedStyle(e)}function Zp(e){return["table","td","th"].indexOf(Je(e))>=0}function mt(e){return((jt(e)?e.ownerDocument:e.document)||window.document).documentElement}function mr(e){return Je(e)==="html"?e:e.assignedSlot||e.parentNode||(ko(e)?e.host:null)||mt(e)}function Ca(e){return!ze(e)||at(e).position==="fixed"?null:e.offsetParent}function Qp(e){var t=/firefox/i.test(no()),n=/Trident/i.test(no());if(n&&ze(e)){var r=at(e);if(r.position==="fixed")return null}var o=mr(e);for(ko(o)&&(o=o.host);ze(o)&&["html","body"].indexOf(Je(o))<0;){var a=at(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function _n(e){for(var t=Le(e),n=Ca(e);n&&Zp(n)&&at(n).position==="static";)n=Ca(n);return n&&(Je(n)==="html"||Je(n)==="body"&&at(n).position==="static")?t:n||Qp(e)||t}function So(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function vn(e,t,n){return Ct(e,rr(t,n))}function eu(e,t,n){var r=vn(e,t,n);return r>n?n:r}function ni(){return{top:0,right:0,bottom:0,left:0}}function ri(e){return Object.assign({},ni(),e)}function oi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var tu=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,ri(typeof t!="number"?t:oi(t,Mn))};function nu(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,s=n.modifiersData.popperOffsets,l=Ye(n.placement),c=So(l),d=[Me,qe].indexOf(l)>=0,h=d?"height":"width";if(!(!a||!s)){var v=tu(o.padding,n),b=To(a),p=c==="y"?$e:Me,m=c==="y"?He:qe,f=n.rects.reference[h]+n.rects.reference[c]-s[c]-n.rects.popper[h],g=s[c]-n.rects.reference[c],w=_n(a),P=w?c==="y"?w.clientHeight||0:w.clientWidth||0:0,x=f/2-g/2,E=v[p],y=P-b[h]-v[m],N=P/2-b[h]/2+x,T=vn(E,N,y),M=c;n.modifiersData[r]=(t={},t[M]=T,t.centerOffset=T-N,t)}}function ru(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ti(t.elements.popper,o)&&(t.elements.arrow=o))}const ou={name:"arrow",enabled:!0,phase:"main",fn:nu,effect:ru,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yt(e){return e.split("-")[1]}var au={top:"auto",right:"auto",bottom:"auto",left:"auto"};function su(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Xt(n*o)/o||0,y:Xt(r*o)/o||0}}function Oa(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,h=e.roundOffsets,v=e.isFixed,b=s.x,p=b===void 0?0:b,m=s.y,f=m===void 0?0:m,g=typeof h=="function"?h({x:p,y:f}):{x:p,y:f};p=g.x,f=g.y;var w=s.hasOwnProperty("x"),P=s.hasOwnProperty("y"),x=Me,E=$e,y=window;if(d){var N=_n(n),T="clientHeight",M="clientWidth";if(N===Le(n)&&(N=mt(n),at(N).position!=="static"&&l==="absolute"&&(T="scrollHeight",M="scrollWidth")),N=N,o===$e||(o===Me||o===qe)&&a===Nn){E=He;var D=v&&N===y&&y.visualViewport?y.visualViewport.height:N[T];f-=D-r.height,f*=c?1:-1}if(o===Me||(o===$e||o===He)&&a===Nn){x=qe;var L=v&&N===y&&y.visualViewport?y.visualViewport.width:N[M];p-=L-r.width,p*=c?1:-1}}var R=Object.assign({position:l},d&&au),I=h===!0?su({x:p,y:f},Le(n)):{x:p,y:f};if(p=I.x,f=I.y,c){var A;return Object.assign({},R,(A={},A[E]=P?"0":"",A[x]=w?"0":"",A.transform=(y.devicePixelRatio||1)<=1?"translate("+p+"px, "+f+"px)":"translate3d("+p+"px, "+f+"px, 0)",A))}return Object.assign({},R,(t={},t[E]=P?f+"px":"",t[x]=w?p+"px":"",t.transform="",t))}function iu(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,s=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ye(t.placement),variation:Yt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Oa(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Oa(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const lu={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:iu,data:{}};var zn={passive:!0};function cu(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,s=r.resize,l=s===void 0?!0:s,c=Le(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(h){h.addEventListener("scroll",n.update,zn)}),l&&c.addEventListener("resize",n.update,zn),function(){a&&d.forEach(function(h){h.removeEventListener("scroll",n.update,zn)}),l&&c.removeEventListener("resize",n.update,zn)}}const pu={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cu,data:{}};var uu={left:"right",right:"left",bottom:"top",top:"bottom"};function Xn(e){return e.replace(/left|right|bottom|top/g,function(t){return uu[t]})}var du={start:"end",end:"start"};function Pa(e){return e.replace(/start|end/g,function(t){return du[t]})}function No(e){var t=Le(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Co(e){return Gt(mt(e)).left+No(e).scrollLeft}function fu(e,t){var n=Le(e),r=mt(e),o=n.visualViewport,a=r.clientWidth,s=r.clientHeight,l=0,c=0;if(o){a=o.width,s=o.height;var d=ei();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:l+Co(e),y:c}}function hu(e){var t,n=mt(e),r=No(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=Ct(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=Ct(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Co(e),c=-r.scrollTop;return at(o||n).direction==="rtl"&&(l+=Ct(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:l,y:c}}function Oo(e){var t=at(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function ai(e){return["html","body","#document"].indexOf(Je(e))>=0?e.ownerDocument.body:ze(e)&&Oo(e)?e:ai(mr(e))}function yn(e,t){var n;t===void 0&&(t=[]);var r=ai(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Le(r),s=o?[a].concat(a.visualViewport||[],Oo(r)?r:[]):r,l=t.concat(s);return o?l:l.concat(yn(mr(s)))}function ro(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function mu(e,t){var n=Gt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Ra(e,t,n){return t===Zs?ro(fu(e,n)):jt(t)?mu(t,n):ro(hu(mt(e)))}function gu(e){var t=yn(mr(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&ze(e)?_n(e):e;return jt(r)?t.filter(function(o){return jt(o)&&ti(o,r)&&Je(o)!=="body"}):[]}function bu(e,t,n,r){var o=t==="clippingParents"?gu(e):[].concat(t),a=[].concat(o,[n]),s=a[0],l=a.reduce(function(c,d){var h=Ra(e,d,r);return c.top=Ct(h.top,c.top),c.right=rr(h.right,c.right),c.bottom=rr(h.bottom,c.bottom),c.left=Ct(h.left,c.left),c},Ra(e,s,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function si(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ye(r):null,a=r?Yt(r):null,s=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case $e:c={x:s,y:t.y-n.height};break;case He:c={x:s,y:t.y+t.height};break;case qe:c={x:t.x+t.width,y:l};break;case Me:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?So(o):null;if(d!=null){var h=d==="y"?"height":"width";switch(a){case Wt:c[d]=c[d]-(t[h]/2-n[h]/2);break;case Nn:c[d]=c[d]+(t[h]/2-n[h]/2);break}}return c}function Cn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,s=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Dp:l,d=n.rootBoundary,h=d===void 0?Zs:d,v=n.elementContext,b=v===void 0?an:v,p=n.altBoundary,m=p===void 0?!1:p,f=n.padding,g=f===void 0?0:f,w=ri(typeof g!="number"?g:oi(g,Mn)),P=b===an?Bp:an,x=e.rects.popper,E=e.elements[m?P:b],y=bu(jt(E)?E:E.contextElement||mt(e.elements.popper),c,h,s),N=Gt(e.elements.reference),T=si({reference:N,element:x,strategy:"absolute",placement:o}),M=ro(Object.assign({},x,T)),D=b===an?M:N,L={top:y.top-D.top+w.top,bottom:D.bottom-y.bottom+w.bottom,left:y.left-D.left+w.left,right:D.right-y.right+w.right},R=e.modifiersData.offset;if(b===an&&R){var I=R[o];Object.keys(L).forEach(function(A){var V=[qe,He].indexOf(A)>=0?1:-1,U=[$e,He].indexOf(A)>=0?"y":"x";L[A]+=I[U]*V})}return L}function vu(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Qs:c,h=Yt(r),v=h?l?Na:Na.filter(function(m){return Yt(m)===h}):Mn,b=v.filter(function(m){return d.indexOf(m)>=0});b.length===0&&(b=v);var p=b.reduce(function(m,f){return m[f]=Cn(e,{placement:f,boundary:o,rootBoundary:a,padding:s})[Ye(f)],m},{});return Object.keys(p).sort(function(m,f){return p[m]-p[f]})}function yu(e){if(Ye(e)===Eo)return[];var t=Xn(e);return[Pa(e),t,Pa(t)]}function wu(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!0:s,c=n.fallbackPlacements,d=n.padding,h=n.boundary,v=n.rootBoundary,b=n.altBoundary,p=n.flipVariations,m=p===void 0?!0:p,f=n.allowedAutoPlacements,g=t.options.placement,w=Ye(g),P=w===g,x=c||(P||!m?[Xn(g)]:yu(g)),E=[g].concat(x).reduce(function(H,W){return H.concat(Ye(W)===Eo?vu(t,{placement:W,boundary:h,rootBoundary:v,padding:d,flipVariations:m,allowedAutoPlacements:f}):W)},[]),y=t.rects.reference,N=t.rects.popper,T=new Map,M=!0,D=E[0],L=0;L<E.length;L++){var R=E[L],I=Ye(R),A=Yt(R)===Wt,V=[$e,He].indexOf(I)>=0,U=V?"width":"height",j=Cn(t,{placement:R,boundary:h,rootBoundary:v,altBoundary:b,padding:d}),F=V?A?qe:Me:A?He:$e;y[U]>N[U]&&(F=Xn(F));var ee=Xn(F),Z=[];if(a&&Z.push(j[I]<=0),l&&Z.push(j[F]<=0,j[ee]<=0),Z.every(function(H){return H})){D=R,M=!1;break}T.set(R,Z)}if(M)for(var C=m?3:1,$=function(W){var Y=E.find(function(K){var X=T.get(K);if(X)return X.slice(0,W).every(function(J){return J})});if(Y)return D=Y,"break"},z=C;z>0;z--){var G=$(z);if(G==="break")break}t.placement!==D&&(t.modifiersData[r]._skip=!0,t.placement=D,t.reset=!0)}}const xu={name:"flip",enabled:!0,phase:"main",fn:wu,requiresIfExists:["offset"],data:{_skip:!1}};function ja(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function $a(e){return[$e,qe,He,Me].some(function(t){return e[t]>=0})}function Eu(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=Cn(t,{elementContext:"reference"}),l=Cn(t,{altBoundary:!0}),c=ja(s,r),d=ja(l,o,a),h=$a(c),v=$a(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:h,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":v})}const ku={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Eu};function Tu(e,t,n){var r=Ye(e),o=[Me,$e].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,s=a[0],l=a[1];return s=s||0,l=(l||0)*o,[Me,qe].indexOf(r)>=0?{x:l,y:s}:{x:s,y:l}}function Su(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,s=Qs.reduce(function(h,v){return h[v]=Tu(v,t.rects,a),h},{}),l=s[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=s}const Nu={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Su};function Cu(e){var t=e.state,n=e.name;t.modifiersData[n]=si({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Ou={name:"popperOffsets",enabled:!0,phase:"read",fn:Cu,data:{}};function Pu(e){return e==="x"?"y":"x"}function Ru(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,s=n.altAxis,l=s===void 0?!1:s,c=n.boundary,d=n.rootBoundary,h=n.altBoundary,v=n.padding,b=n.tether,p=b===void 0?!0:b,m=n.tetherOffset,f=m===void 0?0:m,g=Cn(t,{boundary:c,rootBoundary:d,padding:v,altBoundary:h}),w=Ye(t.placement),P=Yt(t.placement),x=!P,E=So(w),y=Pu(E),N=t.modifiersData.popperOffsets,T=t.rects.reference,M=t.rects.popper,D=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,L=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),R=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0};if(N){if(a){var A,V=E==="y"?$e:Me,U=E==="y"?He:qe,j=E==="y"?"height":"width",F=N[E],ee=F+g[V],Z=F-g[U],C=p?-M[j]/2:0,$=P===Wt?T[j]:M[j],z=P===Wt?-M[j]:-T[j],G=t.elements.arrow,H=p&&G?To(G):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ni(),Y=W[V],K=W[U],X=vn(0,T[j],H[j]),J=x?T[j]/2-C-X-Y-L.mainAxis:$-X-Y-L.mainAxis,Q=x?-T[j]/2+C+X+K+L.mainAxis:z+X+K+L.mainAxis,ae=t.elements.arrow&&_n(t.elements.arrow),B=ae?E==="y"?ae.clientTop||0:ae.clientLeft||0:0,te=(A=R==null?void 0:R[E])!=null?A:0,_=F+J-te-B,se=F+Q-te,ke=vn(p?rr(ee,_):ee,F,p?Ct(Z,se):Z);N[E]=ke,I[E]=ke-F}if(l){var Pe,xe=E==="x"?$e:Me,bt=E==="x"?He:qe,Re=N[y],Qe=y==="y"?"height":"width",Ie=Re+g[xe],et=Re-g[bt],Se=[$e,Me].indexOf(w)!==-1,Mt=(Pe=R==null?void 0:R[y])!=null?Pe:0,vt=Se?Ie:Re-T[Qe]-M[Qe]-Mt+L.altAxis,Zt=Se?Re+T[Qe]+M[Qe]-Mt-L.altAxis:et,Bn=p&&Se?eu(vt,Re,Zt):vn(p?vt:Ie,Re,p?Zt:et);N[y]=Bn,I[y]=Bn-Re}t.modifiersData[r]=I}}const ju={name:"preventOverflow",enabled:!0,phase:"main",fn:Ru,requiresIfExists:["offset"]};function $u(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Mu(e){return e===Le(e)||!ze(e)?No(e):$u(e)}function _u(e){var t=e.getBoundingClientRect(),n=Xt(t.width)/e.offsetWidth||1,r=Xt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Iu(e,t,n){n===void 0&&(n=!1);var r=ze(t),o=ze(t)&&_u(t),a=mt(t),s=Gt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Je(t)!=="body"||Oo(a))&&(l=Mu(t)),ze(t)?(c=Gt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Co(a))),{x:s.left+l.scrollLeft-c.x,y:s.top+l.scrollTop-c.y,width:s.width,height:s.height}}function Au(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Du(e){var t=Au(e);return Gp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Bu(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Lu(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Ma={placement:"bottom",modifiers:[],strategy:"absolute"};function _a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Fu(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?Ma:o;return function(l,c,d){d===void 0&&(d=a);var h={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ma,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},v=[],b=!1,p={state:h,setOptions:function(w){var P=typeof w=="function"?w(h.options):w;f(),h.options=Object.assign({},a,h.options,P),h.scrollParents={reference:jt(l)?yn(l):l.contextElement?yn(l.contextElement):[],popper:yn(c)};var x=Du(Lu([].concat(r,h.options.modifiers)));return h.orderedModifiers=x.filter(function(E){return E.enabled}),m(),p.update()},forceUpdate:function(){if(!b){var w=h.elements,P=w.reference,x=w.popper;if(_a(P,x)){h.rects={reference:Iu(P,_n(x),h.options.strategy==="fixed"),popper:To(x)},h.reset=!1,h.placement=h.options.placement,h.orderedModifiers.forEach(function(L){return h.modifiersData[L.name]=Object.assign({},L.data)});for(var E=0;E<h.orderedModifiers.length;E++){if(h.reset===!0){h.reset=!1,E=-1;continue}var y=h.orderedModifiers[E],N=y.fn,T=y.options,M=T===void 0?{}:T,D=y.name;typeof N=="function"&&(h=N({state:h,options:M,name:D,instance:p})||h)}}}},update:Bu(function(){return new Promise(function(g){p.forceUpdate(),g(h)})}),destroy:function(){f(),b=!0}};if(!_a(l,c))return p;p.setOptions(d).then(function(g){!b&&d.onFirstUpdate&&d.onFirstUpdate(g)});function m(){h.orderedModifiers.forEach(function(g){var w=g.name,P=g.options,x=P===void 0?{}:P,E=g.effect;if(typeof E=="function"){var y=E({state:h,name:w,instance:p,options:x}),N=function(){};v.push(y||N)}})}function f(){v.forEach(function(g){return g()}),v=[]}return p}}var Vu=[pu,Ou,lu,Jp,Nu,xu,ju,ou,ku],zu=Fu({defaultModifiers:Vu});const ii="Popper";function Uu(e){return Js(ii,e)}wp(ii,["root"]);const Hu=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qu=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Wu(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function or(e){return typeof e=="function"?e():e}function gr(e){return e.nodeType!==void 0}function Xu(e){return!gr(e)}const Gu=()=>it({root:["root"]},hp(Uu)),Yu={},Ku=k.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:s,disablePortal:l,modifiers:c,open:d,placement:h,popperOptions:v,popperRef:b,slotProps:p={},slots:m={},TransitionProps:f}=t,g=fe(t,Hu),w=k.useRef(null),P=Ue(w,n),x=k.useRef(null),E=Ue(x,b),y=k.useRef(E);Pt(()=>{y.current=E},[E]),k.useImperativeHandle(b,()=>x.current,[]);const N=Wu(h,s),[T,M]=k.useState(N),[D,L]=k.useState(or(o));k.useEffect(()=>{x.current&&x.current.forceUpdate()}),k.useEffect(()=>{o&&L(or(o))},[o]),Pt(()=>{if(!D||!d)return;const U=ee=>{M(ee.placement)};if(process.env.NODE_ENV!=="production"&&D&&gr(D)&&D.nodeType===1){const ee=D.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ee.top===0&&ee.left===0&&ee.right===0&&ee.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let j=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ee})=>{U(ee)}}];c!=null&&(j=j.concat(c)),v&&v.modifiers!=null&&(j=j.concat(v.modifiers));const F=zu(D,w.current,O({placement:N},v,{modifiers:j}));return y.current(F),()=>{F.destroy(),y.current(null)}},[D,l,c,d,v,N]);const R={placement:T};f!==null&&(R.TransitionProps=f);const I=Gu(),A=(r=m.root)!=null?r:"div",V=Rt({elementType:A,externalSlotProps:p.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:P},ownerState:t,className:I.root});return u.jsx(A,O({},V,{children:typeof a=="function"?a(R):a}))}),li=k.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:s="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:h,placement:v="bottom",popperOptions:b=Yu,popperRef:p,style:m,transition:f=!1,slotProps:g={},slots:w={}}=t,P=fe(t,qu),[x,E]=k.useState(!0),y=()=>{E(!1)},N=()=>{E(!0)};if(!c&&!h&&(!f||x))return null;let T;if(a)T=a;else if(r){const L=or(r);T=L&&gr(L)?Ce(L).body:Ce(null).body}const M=!h&&c&&(!f||x)?"none":void 0,D=f?{in:h,onEnter:y,onExited:N}:void 0;return u.jsx(Sn,{disablePortal:l,container:T,children:u.jsx(Ku,O({anchorEl:r,direction:s,disablePortal:l,modifiers:d,ref:n,open:f?!x:h,placement:v,popperOptions:b,popperRef:p,slotProps:g,slots:w},P,{style:O({position:"fixed",top:0,left:0,display:M},m),TransitionProps:D,children:o}))})});process.env.NODE_ENV!=="production"&&(li.propTypes={anchorEl:Jt(i.oneOfType([ot,i.object,i.func]),e=>{if(e.open){const t=or(e.anchorEl);if(t&&gr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Xu(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:i.oneOfType([i.node,i.func]),container:i.oneOfType([ot,i.func]),direction:i.oneOf(["ltr","rtl"]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),transition:i.bool});const Ju=["values","unit","step"],Zu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>O({},n,{[r.key]:r.val}),{})};function Qu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=fe(e,Ju),a=Zu(t),s=Object.keys(a);function l(b){return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${n})`}function c(b){return`@media (max-width:${(typeof t[b]=="number"?t[b]:b)-r/100}${n})`}function d(b,p){const m=s.indexOf(p);return`@media (min-width:${typeof t[b]=="number"?t[b]:b}${n}) and (max-width:${(m!==-1&&typeof t[s[m]]=="number"?t[s[m]]:p)-r/100}${n})`}function h(b){return s.indexOf(b)+1<s.length?d(b,s[s.indexOf(b)+1]):l(b)}function v(b){const p=s.indexOf(b);return p===0?l(s[1]):p===s.length-1?c(s[p]):d(b,s[s.indexOf(b)+1]).replace("@media","@media not all and")}return O({keys:s,values:a,up:l,down:c,between:d,only:h,not:v,unit:n},o)}const ed={borderRadius:4},td=ed,nd=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.string,i.object,i.array]):{},gt=nd;function wn(e,t){return t?rt(e,t,{clone:!1}):e}const Po={xs:0,sm:600,md:900,lg:1200,xl:1536},Ia={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Po[e]}px)`};function st(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ia;return t.reduce((s,l,c)=>(s[a.up(a.keys[c])]=n(t[c]),s),{})}if(typeof t=="object"){const a=r.breakpoints||Ia;return Object.keys(t).reduce((s,l)=>{if(Object.keys(a.values||Po).indexOf(l)!==-1){const c=a.up(l);s[c]=n(t[l],l)}else{const c=l;s[c]=t[c]}return s},{})}return n(t)}function rd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function od(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function br(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function ar(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=br(e,n)||r,t&&(o=t(o,r,e)),o}function Ee(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=s=>{if(s[t]==null)return null;const l=s[t],c=s.theme,d=br(c,r)||{};return st(s,l,v=>{let b=ar(d,o,v);return v===b&&typeof v=="string"&&(b=ar(d,o,`${t}${v==="default"?"":Ke(v)}`,v)),n===!1?b:{[n]:b}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:gt}:{},a.filterProps=[t],a}function ad(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const sd={m:"margin",p:"padding"},id={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Aa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},ld=ad(e=>{if(e.length>2)if(Aa[e])e=Aa[e];else return[e];const[t,n]=e.split(""),r=sd[t],o=id[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),vr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],yr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],cd=[...vr,...yr];function In(e,t,n,r){var o;const a=(o=br(e,t,!1))!=null?o:n;return typeof a=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),a*s):Array.isArray(a)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>a.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${s} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[s]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ci(e){return In(e,"spacing",8,"spacing")}function An(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function pd(e,t){return n=>e.reduce((r,o)=>(r[o]=An(t,n),r),{})}function ud(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=ld(n),a=pd(o,r),s=e[n];return st(e,s,a)}function pi(e,t){const n=ci(e.theme);return Object.keys(e).map(r=>ud(e,t,r,n)).reduce(wn,{})}function be(e){return pi(e,vr)}be.propTypes=process.env.NODE_ENV!=="production"?vr.reduce((e,t)=>(e[t]=gt,e),{}):{};be.filterProps=vr;function ve(e){return pi(e,yr)}ve.propTypes=process.env.NODE_ENV!=="production"?yr.reduce((e,t)=>(e[t]=gt,e),{}):{};ve.filterProps=yr;process.env.NODE_ENV!=="production"&&cd.reduce((e,t)=>(e[t]=gt,e),{});function dd(e=8){if(e.mui)return e;const t=ci({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const s=t(a);return typeof s=="number"?`${s}px`:s}).join(" "));return n.mui=!0,n}function wr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?wn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return Ee({prop:e,themeKey:"borders",transform:t})}const fd=We("border",Ve),hd=We("borderTop",Ve),md=We("borderRight",Ve),gd=We("borderBottom",Ve),bd=We("borderLeft",Ve),vd=We("borderColor"),yd=We("borderTopColor"),wd=We("borderRightColor"),xd=We("borderBottomColor"),Ed=We("borderLeftColor"),kd=We("outline",Ve),Td=We("outlineColor"),xr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=In(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:An(t,r)});return st(e,e.borderRadius,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:gt}:{};xr.filterProps=["borderRadius"];wr(fd,hd,md,gd,bd,vd,yd,wd,xd,Ed,xr,kd,Td);const Er=e=>{if(e.gap!==void 0&&e.gap!==null){const t=In(e.theme,"spacing",8,"gap"),n=r=>({gap:An(t,r)});return st(e,e.gap,n)}return null};Er.propTypes=process.env.NODE_ENV!=="production"?{gap:gt}:{};Er.filterProps=["gap"];const kr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=In(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:An(t,r)});return st(e,e.columnGap,n)}return null};kr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:gt}:{};kr.filterProps=["columnGap"];const Tr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=In(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:An(t,r)});return st(e,e.rowGap,n)}return null};Tr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:gt}:{};Tr.filterProps=["rowGap"];const Sd=Ee({prop:"gridColumn"}),Nd=Ee({prop:"gridRow"}),Cd=Ee({prop:"gridAutoFlow"}),Od=Ee({prop:"gridAutoColumns"}),Pd=Ee({prop:"gridAutoRows"}),Rd=Ee({prop:"gridTemplateColumns"}),jd=Ee({prop:"gridTemplateRows"}),$d=Ee({prop:"gridTemplateAreas"}),Md=Ee({prop:"gridArea"});wr(Er,kr,Tr,Sd,Nd,Cd,Od,Pd,Rd,jd,$d,Md);function zt(e,t){return t==="grey"?t:e}const _d=Ee({prop:"color",themeKey:"palette",transform:zt}),Id=Ee({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),Ad=Ee({prop:"backgroundColor",themeKey:"palette",transform:zt});wr(_d,Id,Ad);function Be(e){return e<=1&&e!==0?`${e*100}%`:e}const Dd=Ee({prop:"width",transform:Be}),Ro=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Po[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Be(n)}};return st(e,e.maxWidth,t)}return null};Ro.filterProps=["maxWidth"];const Bd=Ee({prop:"minWidth",transform:Be}),Ld=Ee({prop:"height",transform:Be}),Fd=Ee({prop:"maxHeight",transform:Be}),Vd=Ee({prop:"minHeight",transform:Be});Ee({prop:"size",cssProperty:"width",transform:Be});Ee({prop:"size",cssProperty:"height",transform:Be});const zd=Ee({prop:"boxSizing"});wr(Dd,Ro,Bd,Ld,Fd,Vd,zd);const Ud={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:xr},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:ve},pt:{style:ve},pr:{style:ve},pb:{style:ve},pl:{style:ve},px:{style:ve},py:{style:ve},padding:{style:ve},paddingTop:{style:ve},paddingRight:{style:ve},paddingBottom:{style:ve},paddingLeft:{style:ve},paddingX:{style:ve},paddingY:{style:ve},paddingInline:{style:ve},paddingInlineStart:{style:ve},paddingInlineEnd:{style:ve},paddingBlock:{style:ve},paddingBlockStart:{style:ve},paddingBlockEnd:{style:ve},m:{style:be},mt:{style:be},mr:{style:be},mb:{style:be},ml:{style:be},mx:{style:be},my:{style:be},margin:{style:be},marginTop:{style:be},marginRight:{style:be},marginBottom:{style:be},marginLeft:{style:be},marginX:{style:be},marginY:{style:be},marginInline:{style:be},marginInlineStart:{style:be},marginInlineEnd:{style:be},marginBlock:{style:be},marginBlockStart:{style:be},marginBlockEnd:{style:be},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Er},rowGap:{style:Tr},columnGap:{style:kr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Be},maxWidth:{style:Ro},minWidth:{transform:Be},height:{transform:Be},maxHeight:{transform:Be},minHeight:{transform:Be},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},jo=Ud;function Hd(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function qd(e,t){return typeof e=="function"?e(t):e}function Wd(){function e(n,r,o,a){const s={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:h,style:v}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const b=br(o,d)||{};return v?v(s):st(s,r,m=>{let f=ar(b,h,m);return m===f&&typeof m=="string"&&(f=ar(b,h,`${n}${m==="default"?"":Ke(m)}`,m)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const s=(r=a.unstable_sxConfig)!=null?r:jo;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const h=rd(a.breakpoints),v=Object.keys(h);let b=h;return Object.keys(d).forEach(p=>{const m=qd(d[p],a);if(m!=null)if(typeof m=="object")if(s[p])b=wn(b,e(p,m,a,s));else{const f=st({theme:a},m,g=>({[p]:g}));Hd(f,m)?b[p]=t({sx:m,theme:a}):b=wn(b,f)}else b=wn(b,e(p,m,a,s))}),od(v,b)}return Array.isArray(o)?o.map(l):l(o)}return t}const ui=Wd();ui.filterProps=["sx"];const $o=ui;function Xd(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Gd=["breakpoints","palette","spacing","shape"];function Mo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,s=fe(e,Gd),l=Qu(n),c=dd(o);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:O({mode:"light"},r),spacing:c,shape:O({},td,a)},s);return d.applyStyles=Xd,d=t.reduce((h,v)=>rt(h,v),d),d.unstable_sxConfig=O({},jo,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}function Yd(e){return Object.keys(e).length===0}function di(e=null){const t=k.useContext(Gr.ThemeContext);return!t||Yd(t)?e:t}const Kd=Mo();function fi(e=Kd){return di(e)}const Jd=["ownerState"],Zd=["variants"],Qd=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ef(e){return Object.keys(e).length===0}function tf(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const nf=Mo(),Da=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Un({defaultTheme:e,theme:t,themeId:n}){return ef(t)?e:t[n]||t}function rf(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=fe(t,Jd);const o=typeof e=="function"?e(O({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>Yn(a,O({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=fe(o,Zd);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(O({ownerState:n},r,n)):Object.keys(c.props).forEach(h=>{(n==null?void 0:n[h])!==c.props[h]&&r[h]!==c.props[h]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(O({ownerState:n},r,n)):c.style))}),l}return o}function of(e={}){const{themeId:t,defaultTheme:n=nf,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,a=s=>$o(O({},s,{theme:Un(O({},s,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(s,l={})=>{Gr.internal_processStyles(s,y=>y.filter(N=>!(N!=null&&N.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:h,skipSx:v,overridesResolver:b=rf(Da(d))}=l,p=fe(l,Qd),m=h!==void 0?h:d&&d!=="Root"&&d!=="root"||!1,f=v||!1;let g;process.env.NODE_ENV!=="production"&&c&&(g=`${c}-${Da(d||"Root")}`);let w=Gn;d==="Root"||d==="root"?w=r:d?w=o:tf(s)&&(w=void 0);const P=Gr(s,O({shouldForwardProp:w,label:g},p)),x=y=>typeof y=="function"&&y.__emotion_real!==y||Tt(y)?N=>Yn(y,O({},N,{theme:Un({theme:N.theme,defaultTheme:n,themeId:t})})):y,E=(y,...N)=>{let T=x(y);const M=N?N.map(x):[];c&&b&&M.push(R=>{const I=Un(O({},R,{defaultTheme:n,themeId:t}));if(!I.components||!I.components[c]||!I.components[c].styleOverrides)return null;const A=I.components[c].styleOverrides,V={};return Object.entries(A).forEach(([U,j])=>{V[U]=Yn(j,O({},R,{theme:I}))}),b(R,V)}),c&&!m&&M.push(R=>{var I;const A=Un(O({},R,{defaultTheme:n,themeId:t})),V=A==null||(I=A.components)==null||(I=I[c])==null?void 0:I.variants;return Yn({variants:V},O({},R,{theme:A}))}),f||M.push(a);const D=M.length-N.length;if(Array.isArray(y)&&D>0){const R=new Array(D).fill("");T=[...y,...R],T.raw=[...y.raw,...R]}const L=P(T,...M);if(process.env.NODE_ENV!=="production"){let R;c&&(R=`${c}${Ke(d||"")}`),R===void 0&&(R=`Styled(${zc(s)})`),L.displayName=R}return s.muiName&&(L.muiName=s.muiName),L};return P.withConfig&&(E.withConfig=P.withConfig),E}}function af(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:qs(t.components[n].defaultProps,r)}function sf({props:e,name:t,defaultTheme:n,themeId:r}){let o=fi(n);return r&&(o=o[r]||o),af({theme:o,name:t,props:e})}function _o(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),up(e,t,n)}function lf(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function $t(e){if(e.type)return e;if(e.charAt(0)==="#")return $t(lf(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Ht(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Ht(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function Sr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function cf(e){e=$t(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),s=(d,h=(d+n/30)%12)=>o-a*Math.max(Math.min(h-3,9-h,1),-1);let l="rgb";const c=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Sr({type:l,values:c})}function Ba(e){e=$t(e);let t=e.type==="hsl"||e.type==="hsla"?$t(cf(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function La(e,t){const n=Ba(e),r=Ba(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function sr(e,t){return e=$t(e),t=_o(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Sr(e)}function pf(e,t){if(e=$t(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Sr(e)}function uf(e,t){if(e=$t(e),t=_o(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Sr(e)}function df(e,t){return O({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const ff={black:"#000",white:"#fff"},On=ff,hf={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},mf=hf,gf={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},_t=gf,bf={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=bf,vf={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},sn=vf,yf={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},At=yf,wf={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Dt=wf,xf={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Bt=xf,Ef=["mode","contrastThreshold","tonalOffset"],Fa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:On.white,default:On.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Lr={text:{primary:On.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:On.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Va(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=uf(e.main,o):t==="dark"&&(e.dark=pf(e.main,a)))}function kf(e="light"){return e==="dark"?{main:At[200],light:At[50],dark:At[400]}:{main:At[700],light:At[400],dark:At[800]}}function Tf(e="light"){return e==="dark"?{main:_t[200],light:_t[50],dark:_t[400]}:{main:_t[500],light:_t[300],dark:_t[700]}}function Sf(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Nf(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[700],light:Dt[500],dark:Dt[900]}}function Cf(e="light"){return e==="dark"?{main:Bt[400],light:Bt[300],dark:Bt[700]}:{main:Bt[800],light:Bt[500],dark:Bt[900]}}function Of(e="light"){return e==="dark"?{main:sn[400],light:sn[300],dark:sn[700]}:{main:"#ed6c02",light:sn[500],dark:sn[900]}}function Pf(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=fe(e,Ef),a=e.primary||kf(t),s=e.secondary||Tf(t),l=e.error||Sf(t),c=e.info||Nf(t),d=e.success||Cf(t),h=e.warning||Of(t);function v(f){const g=La(f,Lr.text.primary)>=n?Lr.text.primary:Fa.text.primary;if(process.env.NODE_ENV!=="production"){const w=La(f,g);w<3&&console.error([`MUI: The contrast ratio of ${w}:1 for ${g} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const b=({color:f,name:g,mainShade:w=500,lightShade:P=300,darkShade:x=700})=>{if(f=O({},f),!f.main&&f[w]&&(f.main=f[w]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.`:Ht(11,g?` (${g})`:"",w));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Ht(12,g?` (${g})`:"",JSON.stringify(f.main)));return Va(f,"light",P,r),Va(f,"dark",x,r),f.contrastText||(f.contrastText=v(f.main)),f},p={dark:Lr,light:Fa};return process.env.NODE_ENV!=="production"&&(p[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(O({common:O({},On),mode:t,primary:b({color:a,name:"primary"}),secondary:b({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:b({color:l,name:"error"}),warning:b({color:h,name:"warning"}),info:b({color:c,name:"info"}),success:b({color:d,name:"success"}),grey:mf,contrastThreshold:n,getContrastText:v,augmentColor:b,tonalOffset:r},p[t]),o)}const Rf=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function jf(e){return Math.round(e*1e5)/1e5}const za={textTransform:"uppercase"},Ua='"Roboto", "Helvetica", "Arial", sans-serif';function $f(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ua,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:h,pxToRem:v}=n,b=fe(n,Rf);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const p=o/14,m=v||(w=>`${w/d*p}rem`),f=(w,P,x,E,y)=>O({fontFamily:r,fontWeight:w,fontSize:m(P),lineHeight:x},r===Ua?{letterSpacing:`${jf(E/P)}em`}:{},y,h),g={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(s,48,1.167,0),h4:f(s,34,1.235,.25),h5:f(s,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(s,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(s,16,1.5,.15),body2:f(s,14,1.43,.15),button:f(l,14,1.75,.4,za),caption:f(s,12,1.66,.4),overline:f(s,12,2.66,1,za),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(O({htmlFontSize:d,pxToRem:m,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:c},g),b,{clone:!1})}const Mf=.2,_f=.14,If=.12;function ge(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Mf})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_f})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${If})`].join(",")}const Af=["none",ge(0,2,1,-1,0,1,1,0,0,1,3,0),ge(0,3,1,-2,0,2,2,0,0,1,5,0),ge(0,3,3,-2,0,3,4,0,0,1,8,0),ge(0,2,4,-1,0,4,5,0,0,1,10,0),ge(0,3,5,-1,0,5,8,0,0,1,14,0),ge(0,3,5,-1,0,6,10,0,0,1,18,0),ge(0,4,5,-2,0,7,10,1,0,2,16,1),ge(0,5,5,-3,0,8,10,1,0,3,14,2),ge(0,5,6,-3,0,9,12,1,0,3,16,2),ge(0,6,6,-3,0,10,14,1,0,4,18,3),ge(0,6,7,-4,0,11,15,1,0,4,20,3),ge(0,7,8,-4,0,12,17,2,0,5,22,4),ge(0,7,8,-4,0,13,19,2,0,5,24,4),ge(0,7,9,-4,0,14,21,2,0,5,26,4),ge(0,8,9,-5,0,15,22,2,0,6,28,5),ge(0,8,10,-5,0,16,24,2,0,6,30,5),ge(0,8,11,-5,0,17,26,2,0,6,32,5),ge(0,9,11,-5,0,18,28,2,0,7,34,6),ge(0,9,12,-6,0,19,29,2,0,7,36,6),ge(0,10,13,-6,0,20,31,3,0,8,38,7),ge(0,10,13,-6,0,21,33,3,0,8,40,7),ge(0,10,14,-6,0,22,35,3,0,8,42,7),ge(0,11,14,-7,0,23,36,3,0,9,44,8),ge(0,11,15,-7,0,24,38,3,0,9,46,8)],Df=Af,Bf=["duration","easing","delay"],Lf={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ff={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ha(e){return`${Math.round(e)}ms`}function Vf(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function zf(e){const t=O({},Lf,e.easing),n=O({},Ff,e.duration);return O({getAutoHeightDuration:Vf,create:(o=["all"],a={})=>{const{duration:s=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=fe(a,Bf);if(process.env.NODE_ENV!=="production"){const h=b=>typeof b=="string",v=b=>!isNaN(parseFloat(b));!h(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!v(s)&&!h(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),h(l)||console.error('MUI: Argument "easing" must be a string.'),!v(c)&&!h(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(h=>`${h} ${typeof s=="string"?s:Ha(s)} ${l} ${typeof c=="string"?c:Ha(c)}`).join(",")}},e,{easing:t,duration:n})}const Uf={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Hf=Uf,qf=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Wf(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,s=fe(e,qf);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Ht(18));const l=Pf(r),c=Mo(e);let d=rt(c,{mixins:df(c.breakpoints,n),palette:l,shadows:Df.slice(),typography:$f(l,a),transitions:zf(o),zIndex:O({},Hf)});if(d=rt(d,s),d=t.reduce((h,v)=>rt(h,v),d),process.env.NODE_ENV!=="production"){const h=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],v=(b,p)=>{let m;for(m in b){const f=b[m];if(h.indexOf(m)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const g=Ze("",m);console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`,"You can not override it like this: ",JSON.stringify(b,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}b[m]={}}}};Object.keys(d.components).forEach(b=>{const p=d.components[b].styleOverrides;p&&b.indexOf("Mui")===0&&v(p,b)})}return d.unstable_sxConfig=O({},jo,s==null?void 0:s.unstable_sxConfig),d.unstable_sx=function(v){return $o({sx:v,theme:this})},d}const Xf=Wf(),Io=Xf,Ao="$$material",hi=e=>Gn(e)&&e!=="classes",Gf=of({themeId:Ao,defaultTheme:Io,rootShouldForwardProp:hi}),Oe=Gf;function Dn(){const e=fi(Io);return process.env.NODE_ENV!=="production"&&k.useDebugValue(e),e[Ao]||e}function lt({props:e,name:t}){return sf({props:e,name:t,defaultTheme:Io,themeId:Ao})}function oo(e,t){return oo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},oo(e,t)}function Yf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,oo(e,t)}const qa={disabled:!1};var Kf=process.env.NODE_ENV!=="production"?i.oneOfType([i.number,i.shape({enter:i.number,exit:i.number,appear:i.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&i.oneOfType([i.string,i.shape({enter:i.string,exit:i.string,active:i.string}),i.shape({enter:i.string,enterDone:i.string,enterActive:i.string,exit:i.string,exitDone:i.string,exitActive:i.string})]);const mi=S.createContext(null);var Jf=function(t){return t.scrollTop},mn="unmounted",xt="exited",Et="entering",Vt="entered",ao="exiting",ct=function(e){Yf(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var s=o,l=s&&!s.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=xt,a.appearStatus=Et):c=Vt:r.unmountOnExit||r.mountOnEnter?c=mn:c=xt,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var s=o.in;return s&&a.status===mn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Et&&s!==Vt&&(a=Et):(s===Et||s===Vt)&&(a=ao)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,s,l;return a=s=l=o,o!=null&&typeof o!="number"&&(a=o.exit,s=o.enter,l=o.appear!==void 0?o.appear:s),{exit:a,enter:s,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===Et){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);s&&Jf(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:mn})},n.performEnter=function(o){var a=this,s=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[un.findDOMNode(this),l],d=c[0],h=c[1],v=this.getTimeouts(),b=l?v.appear:v.enter;if(!o&&!s||qa.disabled){this.safeSetState({status:Vt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,h),this.safeSetState({status:Et},function(){a.props.onEntering(d,h),a.onTransitionEnd(b,function(){a.safeSetState({status:Vt},function(){a.props.onEntered(d,h)})})})},n.performExit=function(){var o=this,a=this.props.exit,s=this.getTimeouts(),l=this.props.nodeRef?void 0:un.findDOMNode(this);if(!a||qa.disabled){this.safeSetState({status:xt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:ao},function(){o.props.onExiting(l),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:xt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,s=!0;return this.nextCallback=function(l){s&&(s=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!s||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],d=c[0],h=c[1];this.props.addEndListener(d,h)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===mn)return null;var a=this.props,s=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=fe(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return S.createElement(mi.Provider,{value:null},typeof s=="function"?s(o,l):S.cloneElement(S.Children.only(s),l))},t}(S.Component);ct.contextType=mi;ct.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:i.shape({current:typeof Element>"u"?i.any:function(e,t,n,r,o,a){var s=e[t];return i.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:i.oneOfType([i.func.isRequired,i.element.isRequired]).isRequired,in:i.bool,mountOnEnter:i.bool,unmountOnExit:i.bool,appear:i.bool,enter:i.bool,exit:i.bool,timeout:function(t){var n=Kf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:i.func,onEnter:i.func,onEntering:i.func,onEntered:i.func,onExit:i.func,onExiting:i.func,onExited:i.func}:{};function Lt(){}ct.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Lt,onEntering:Lt,onEntered:Lt,onExit:Lt,onExiting:Lt,onExited:Lt};ct.UNMOUNTED=mn;ct.EXITED=xt;ct.ENTERING=Et;ct.ENTERED=Vt;ct.EXITING=ao;const gi=ct,bi=e=>e.scrollTop;function ir(e,t){var n,r;const{timeout:o,easing:a,style:s={}}=e;return{duration:(n=s.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:s.transitionDelay}}const Zf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function so(e){return`scale(${e}, ${e**2})`}const Qf={entering:{opacity:1,transform:so(1)},entered:{opacity:1,transform:"none"}},Fr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Do=k.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:s,in:l,onEnter:c,onEntered:d,onEntering:h,onExit:v,onExited:b,onExiting:p,style:m,timeout:f="auto",TransitionComponent:g=gi}=t,w=fe(t,Zf),P=fn(),x=k.useRef(),E=Dn(),y=k.useRef(null),N=Ue(y,a.ref,n),T=U=>j=>{if(U){const F=y.current;j===void 0?U(F):U(F,j)}},M=T(h),D=T((U,j)=>{bi(U);const{duration:F,delay:ee,easing:Z}=ir({style:m,timeout:f,easing:s},{mode:"enter"});let C;f==="auto"?(C=E.transitions.getAutoHeightDuration(U.clientHeight),x.current=C):C=F,U.style.transition=[E.transitions.create("opacity",{duration:C,delay:ee}),E.transitions.create("transform",{duration:Fr?C:C*.666,delay:ee,easing:Z})].join(","),c&&c(U,j)}),L=T(d),R=T(p),I=T(U=>{const{duration:j,delay:F,easing:ee}=ir({style:m,timeout:f,easing:s},{mode:"exit"});let Z;f==="auto"?(Z=E.transitions.getAutoHeightDuration(U.clientHeight),x.current=Z):Z=j,U.style.transition=[E.transitions.create("opacity",{duration:Z,delay:F}),E.transitions.create("transform",{duration:Fr?Z:Z*.666,delay:Fr?F:F||Z*.333,easing:ee})].join(","),U.style.opacity=0,U.style.transform=so(.75),v&&v(U)}),A=T(b),V=U=>{f==="auto"&&P.start(x.current||0,U),r&&r(y.current,U)};return u.jsx(g,O({appear:o,in:l,nodeRef:y,onEnter:D,onEntered:L,onEntering:M,onExit:I,onExited:A,onExiting:R,addEndListener:V,timeout:f==="auto"?null:f},w,{children:(U,j)=>k.cloneElement(a,O({style:O({opacity:0,transform:so(.75),visibility:U==="exited"&&!l?"hidden":void 0},Qf[U],m,a.props.style),ref:N},j))}))});process.env.NODE_ENV!=="production"&&(Do.propTypes={addEndListener:i.func,appear:i.bool,children:jn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});Do.muiSupportAuto=!0;const io=Do,eh=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Wa=eh,th=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],nh=Oe(li,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),vi=k.forwardRef(function(t,n){var r;const o=di(),a=lt({props:t,name:"MuiPopper"}),{anchorEl:s,component:l,components:c,componentsProps:d,container:h,disablePortal:v,keepMounted:b,modifiers:p,open:m,placement:f,popperOptions:g,popperRef:w,transition:P,slots:x,slotProps:E}=a,y=fe(a,th),N=(r=x==null?void 0:x.root)!=null?r:c==null?void 0:c.Root,T=O({anchorEl:s,container:h,disablePortal:v,keepMounted:b,modifiers:p,open:m,placement:f,popperOptions:g,popperRef:w,transition:P},y);return u.jsx(nh,O({as:l,direction:o==null?void 0:o.direction,slots:{root:N},slotProps:E??d},T,{ref:n}))});process.env.NODE_ENV!=="production"&&(vi.propTypes={anchorEl:i.oneOfType([ot,i.object,i.func]),children:i.oneOfType([i.node,i.func]),component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([ot,i.func]),disablePortal:i.bool,keepMounted:i.bool,modifiers:i.arrayOf(i.shape({data:i.object,effect:i.func,enabled:i.bool,fn:i.func,name:i.any,options:i.object,phase:i.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:i.arrayOf(i.string),requiresIfExists:i.arrayOf(i.string)})),open:i.bool.isRequired,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:i.shape({modifiers:i.array,onFirstUpdate:i.func,placement:i.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:i.oneOf(["absolute","fixed"])}),popperRef:xo,slotProps:i.shape({root:i.oneOfType([i.func,i.object])}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transition:i.bool});const yi=vi;function rh(e){return Ze("MuiTooltip",e)}const oh=ht("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=oh,ah=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function sh(e){return Math.round(e*1e5)/1e5}const ih=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,s={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ke(a.split("-")[0])}`],arrow:["arrow"]};return it(s,rh,t)},lh=Oe(yi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>O({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:O({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:O({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ch=Oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>O({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:sr(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${sh(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:O({transformOrigin:"right center"},t.isRtl?O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):O({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:O({transformOrigin:"left center"},t.isRtl?O({marginRight:"14px"},t.touch&&{marginRight:"24px"}):O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:O({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:O({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),ph=Oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:sr(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Hn=!1;const Xa=new $n;let ln={x:0,y:0};function qn(e,t){return n=>{t&&t(n),e(n)}}const wi=k.forwardRef(function(t,n){var r,o,a,s,l,c,d,h,v,b,p,m,f,g,w,P,x,E,y;const N=lt({props:t,name:"MuiTooltip"}),{arrow:T=!1,children:M,components:D={},componentsProps:L={},describeChild:R=!1,disableFocusListener:I=!1,disableHoverListener:A=!1,disableInteractive:V=!1,disableTouchListener:U=!1,enterDelay:j=100,enterNextDelay:F=0,enterTouchDelay:ee=700,followCursor:Z=!1,id:C,leaveDelay:$=0,leaveTouchDelay:z=1500,onClose:G,onOpen:H,open:W,placement:Y="bottom",PopperComponent:K,PopperProps:X={},slotProps:J={},slots:Q={},title:ae,TransitionComponent:B=io,TransitionProps:te}=N,_=fe(N,ah),se=k.isValidElement(M)?M:u.jsx("span",{children:M}),ke=Dn(),Pe=ke.direction==="rtl",[xe,bt]=k.useState(),[Re,Qe]=k.useState(null),Ie=k.useRef(!1),et=V||Z,Se=fn(),Mt=fn(),vt=fn(),Zt=fn(),[Bn,Ho]=Ls({controlled:W,default:!1,name:"Tooltip",state:"open"});let tt=Bn;if(process.env.NODE_ENV!=="production"){const{current:ne}=k.useRef(W!==void 0);k.useEffect(()=>{xe&&xe.disabled&&!ne&&ae!==""&&xe.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ae,xe,ne])}const Nr=Bs(C),Qt=k.useRef(),Ln=Tn(()=>{Qt.current!==void 0&&(document.body.style.WebkitUserSelect=Qt.current,Qt.current=void 0),Zt.clear()});k.useEffect(()=>Ln,[Ln]);const qo=ne=>{Xa.clear(),Hn=!0,Ho(!0),H&&!tt&&H(ne)},Fn=Tn(ne=>{Xa.start(800+$,()=>{Hn=!1}),Ho(!1),G&&tt&&G(ne),Se.start(ke.transitions.duration.shortest,()=>{Ie.current=!1})}),Cr=ne=>{Ie.current&&ne.type!=="touchstart"||(xe&&xe.removeAttribute("title"),Mt.clear(),vt.clear(),j||Hn&&F?Mt.start(Hn?F:j,()=>{qo(ne)}):qo(ne))},Wo=ne=>{Mt.clear(),vt.start($,()=>{Fn(ne)})},{isFocusVisibleRef:Xo,onBlur:El,onFocus:kl,ref:Tl}=Fs(),[,Go]=k.useState(!1),Yo=ne=>{El(ne),Xo.current===!1&&(Go(!1),Wo(ne))},Ko=ne=>{xe||bt(ne.currentTarget),kl(ne),Xo.current===!0&&(Go(!0),Cr(ne))},Jo=ne=>{Ie.current=!0;const Ae=se.props;Ae.onTouchStart&&Ae.onTouchStart(ne)},Zo=Cr,Qo=Wo,Sl=ne=>{Jo(ne),vt.clear(),Se.clear(),Ln(),Qt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Zt.start(ee,()=>{document.body.style.WebkitUserSelect=Qt.current,Cr(ne)})},Nl=ne=>{se.props.onTouchEnd&&se.props.onTouchEnd(ne),Ln(),vt.start(z,()=>{Fn(ne)})};k.useEffect(()=>{if(!tt)return;function ne(Ae){(Ae.key==="Escape"||Ae.key==="Esc")&&Fn(Ae)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Fn,tt]);const Cl=Ue(se.ref,Tl,bt,n);!ae&&ae!==0&&(tt=!1);const Or=k.useRef(),Ol=ne=>{const Ae=se.props;Ae.onMouseMove&&Ae.onMouseMove(ne),ln={x:ne.clientX,y:ne.clientY},Or.current&&Or.current.update()},en={},Pr=typeof ae=="string";R?(en.title=!tt&&Pr&&!A?ae:null,en["aria-describedby"]=tt?Nr:null):(en["aria-label"]=Pr?ae:null,en["aria-labelledby"]=tt&&!Pr?Nr:null);const Fe=O({},en,_,se.props,{className:Ne(_.className,se.props.className),onTouchStart:Jo,ref:Cl},Z?{onMouseMove:Ol}:{});process.env.NODE_ENV!=="production"&&(Fe["data-mui-internal-clone-element"]=!0,k.useEffect(()=>{xe&&!xe.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[xe]));const tn={};U||(Fe.onTouchStart=Sl,Fe.onTouchEnd=Nl),A||(Fe.onMouseOver=qn(Zo,Fe.onMouseOver),Fe.onMouseLeave=qn(Qo,Fe.onMouseLeave),et||(tn.onMouseOver=Zo,tn.onMouseLeave=Qo)),I||(Fe.onFocus=qn(Ko,Fe.onFocus),Fe.onBlur=qn(Yo,Fe.onBlur),et||(tn.onFocus=Ko,tn.onBlur=Yo)),process.env.NODE_ENV!=="production"&&se.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));const Pl=k.useMemo(()=>{var ne;let Ae=[{name:"arrow",enabled:!!Re,options:{element:Re,padding:4}}];return(ne=X.popperOptions)!=null&&ne.modifiers&&(Ae=Ae.concat(X.popperOptions.modifiers)),O({},X.popperOptions,{modifiers:Ae})},[Re,X]),nn=O({},N,{isRtl:Pe,arrow:T,disableInteractive:et,placement:Y,PopperComponentProp:K,touch:Ie.current}),Rr=ih(nn),ea=(r=(o=Q.popper)!=null?o:D.Popper)!=null?r:lh,ta=(a=(s=(l=Q.transition)!=null?l:D.Transition)!=null?s:B)!=null?a:io,na=(c=(d=Q.tooltip)!=null?d:D.Tooltip)!=null?c:ch,ra=(h=(v=Q.arrow)!=null?v:D.Arrow)!=null?h:ph,Rl=hn(ea,O({},X,(b=J.popper)!=null?b:L.popper,{className:Ne(Rr.popper,X==null?void 0:X.className,(p=(m=J.popper)!=null?m:L.popper)==null?void 0:p.className)}),nn),jl=hn(ta,O({},te,(f=J.transition)!=null?f:L.transition),nn),$l=hn(na,O({},(g=J.tooltip)!=null?g:L.tooltip,{className:Ne(Rr.tooltip,(w=(P=J.tooltip)!=null?P:L.tooltip)==null?void 0:w.className)}),nn),Ml=hn(ra,O({},(x=J.arrow)!=null?x:L.arrow,{className:Ne(Rr.arrow,(E=(y=J.arrow)!=null?y:L.arrow)==null?void 0:E.className)}),nn);return u.jsxs(k.Fragment,{children:[k.cloneElement(se,Fe),u.jsx(ea,O({as:K??yi,placement:Y,anchorEl:Z?{getBoundingClientRect:()=>({top:ln.y,left:ln.x,right:ln.x,bottom:ln.y,width:0,height:0})}:xe,popperRef:Or,open:xe?tt:!1,id:Nr,transition:!0},tn,Rl,{popperOptions:Pl,children:({TransitionProps:ne})=>u.jsx(ta,O({timeout:ke.transitions.duration.shorter},ne,jl,{children:u.jsxs(na,O({},$l,{children:[ae,T?u.jsx(ra,O({},Ml,{ref:Qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(wi.propTypes={arrow:i.bool,children:jn.isRequired,classes:i.object,className:i.string,components:i.shape({Arrow:i.elementType,Popper:i.elementType,Tooltip:i.elementType,Transition:i.elementType}),componentsProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),describeChild:i.bool,disableFocusListener:i.bool,disableHoverListener:i.bool,disableInteractive:i.bool,disableTouchListener:i.bool,enterDelay:i.number,enterNextDelay:i.number,enterTouchDelay:i.number,followCursor:i.bool,id:i.string,leaveDelay:i.number,leaveTouchDelay:i.number,onClose:i.func,onOpen:i.func,open:i.bool,placement:i.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:i.elementType,PopperProps:i.object,slotProps:i.shape({arrow:i.object,popper:i.object,tooltip:i.object,transition:i.object}),slots:i.shape({arrow:i.elementType,popper:i.elementType,tooltip:i.elementType,transition:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),title:i.node,TransitionComponent:i.elementType,TransitionProps:i.object});const uh=wi;var Bo={},xi={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(xi);var dh=xi.exports,Vr={};function fh(e){return Ze("MuiSvgIcon",e)}ht("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const hh=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],mh=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ke(t)}`,`fontSize${Ke(n)}`]};return it(o,fh,r)},gh=Oe("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ke(n.color)}`],t[`fontSize${Ke(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,s,l,c,d,h,v,b,p,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(s=a.pxToRem)==null?void 0:s.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(h=d.pxToRem)==null?void 0:h.call(d,35))||"2.1875rem"}[t.fontSize],color:(v=(b=(e.vars||e).palette)==null||(b=b[t.color])==null?void 0:b.main)!=null?v:{action:(p=(e.vars||e).palette)==null||(p=p.action)==null?void 0:p.active,disabled:(m=(e.vars||e).palette)==null||(m=m.action)==null?void 0:m.disabled,inherit:void 0}[t.color]}}),Lo=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:s="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:h=!1,titleAccess:v,viewBox:b="0 0 24 24"}=r,p=fe(r,hh),m=k.isValidElement(o)&&o.type==="svg",f=O({},r,{color:s,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:h,viewBox:b,hasSvgAsChild:m}),g={};h||(g.viewBox=b);const w=mh(f);return u.jsxs(gh,O({as:l,className:Ne(w.root,a),focusable:"false",color:d,"aria-hidden":v?void 0:!0,role:v?"img":void 0,ref:n},g,p,m&&o.props,{ownerState:f,children:[m?o.props.children:o,v?u.jsx("title",{children:v}):null]}))});process.env.NODE_ENV!=="production"&&(Lo.propTypes={children:i.node,classes:i.object,className:i.string,color:i.oneOfType([i.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),i.string]),component:i.elementType,fontSize:i.oneOfType([i.oneOf(["inherit","large","medium","small"]),i.string]),htmlColor:i.string,inheritViewBox:i.bool,shapeRendering:i.string,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),titleAccess:i.string,viewBox:i.string});Lo.muiName="SvgIcon";const Ga=Lo;function Ei(e,t){function n(r,o){return u.jsx(Ga,O({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ga.muiName,k.memo(k.forwardRef(n))}const bh={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ws.configure(e)}},vh=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ke,createChainedFunction:Qr,createSvgIcon:Ei,debounce:Ds,deprecatedPropType:Hc,isMuiElement:qc,ownerDocument:Ce,ownerWindow:qt,requirePropFactory:Wc,setRef:tr,unstable_ClassNameGenerator:bh,unstable_useEnhancedEffect:Pt,unstable_useId:Bs,unsupportedProp:Yc,useControlled:Ls,useEventCallback:Tn,useForkRef:Ue,useIsFocusVisible:Fs},Symbol.toStringTag,{value:"Module"})),yh=kc(vh);var Ya;function wh(){return Ya||(Ya=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=yh}(Vr)),Vr}var xh=dh;Object.defineProperty(Bo,"__esModule",{value:!0});var ki=Bo.default=void 0,Eh=xh(wh()),kh=u;ki=Bo.default=(0,Eh.default)((0,kh.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ka(e,t,n){return e?u.jsx(ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:u.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Fo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:s=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:h=!0,isSubMenuParent:v=!1,hasDisabledGutters:b=!1,hasDivider:p=!1,focusVisibleClassName:m,id:f,children:g}=e,w=u.jsx(ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:h,disableGutters:b,divider:p,focusVisibleClassName:m,onClick:t,id:f,children:n?u.jsxs(u.Fragment,{children:[Ka(a,n,!0),u.jsx(ye.ListItemText,{primary:n,inset:!a&&o}),v?u.jsx(ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:u.jsx(ki,{})}):Ka(s,n,!1)]}):g});return r?u.jsx(uh,{title:r,placement:"right",children:u.jsx("div",{children:w})}):w}function Ti(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Th(e){const[t,n]=S.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,s=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Ti(a).filter(h=>"menuItem"in h.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(h=>"menuItem"in h.group&&h.group.menuItem===r.id),u.jsx(Vo,{...e,includedGroups:d})};return u.jsxs(u.Fragment,{children:[u.jsx(Fo,{onClick:s,...o,isSubMenuParent:!0}),u.jsx(ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Sh=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Vo(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:s}=S.useMemo(()=>{const h=o&&o.length>0?o:Ti(t).filter(m=>!("menuItem"in m.group)),v=Object.values(h).sort((m,f)=>(m.group.order||0)-(f.group.order||0)),b=[];v.forEach(m=>{Sh(m.id,t.items).forEach(f=>b.push({item:f,isLastItemInGroup:!1})),b.length>0&&(b[b.length-1].isLastItemInGroup=!0)}),b.length>0&&(b[b.length-1].isLastItemInGroup=!1);const p=b.some(m=>"iconPathBefore"in m.item&&m.item.iconPathBefore);return{items:b,allowForLeadingIcons:p}},[o,t]),l=({item:h,isLastItemInGroup:v})=>({className:"papi-menu-item",label:h.label,tooltip:h.tooltip,iconPathBefore:"iconPathBefore"in h?h.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in h?h.iconPathAfter:void 0,hasDivider:v,allowForLeadingIcons:s}),[c]=a;if(!c)return u.jsx("div",{});const d=c.item.group;return u.jsx("div",{role:"menu","aria-label":d,children:a.map((h,v)=>{const{item:b}=h,p=l(h);if("command"in b){const m=b.group+v;return u.jsx(Fo,{onClick:f=>{n==null||n(f),r(b)},...p},m)}return u.jsx(Th,{parentMenuItem:b,parentItemProps:p,...e},d+b.id)})},d)}function Nh(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([s,l])=>({id:s,group:l})).filter(s=>"column"in s.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(s=>"column"in s.group&&s.group.column===n)),u.jsx(Vo,{...e,includedGroups:a})}function Ch({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return u.jsxs(ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[u.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),u.jsx(ye.List,{id:n,dense:!0,className:a??"",children:u.jsx(Nh,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Si({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=S.useMemo(()=>{const s=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?s.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(s.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return u.jsx(ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((s,l)=>u.jsx(Ch,{commandHandler:e,menuDefinition:n,...s,className:t},l))})}const Ni=k.createContext({});process.env.NODE_ENV!=="production"&&(Ni.displayName="ListContext");const Oh=Ni;function Ph(e){return Ze("MuiList",e)}ht("MuiList",["root","padding","dense","subheader"]);const Rh=["children","className","component","dense","disablePadding","subheader"],jh=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return it({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Ph,t)},$h=Oe("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>O({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Ci=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiList"}),{children:o,className:a,component:s="ul",dense:l=!1,disablePadding:c=!1,subheader:d}=r,h=fe(r,Rh),v=k.useMemo(()=>({dense:l}),[l]),b=O({},r,{component:s,dense:l,disablePadding:c}),p=jh(b);return u.jsx(Oh.Provider,{value:v,children:u.jsxs($h,O({as:s,className:Ne(p.root,a),ref:n,ownerState:b},h,{children:[d,o]}))})});process.env.NODE_ENV!=="production"&&(Ci.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,dense:i.bool,disablePadding:i.bool,subheader:i.node,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Mh=Ci,_h=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function zr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function Ja(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function Oi(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function cn(e,t,n,r,o,a){let s=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(s)return!1;s=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!Oi(l,a)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const Pi=k.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:a=!1,children:s,className:l,disabledItemsFocusable:c=!1,disableListWrap:d=!1,onKeyDown:h,variant:v="selectedMenu"}=t,b=fe(t,_h),p=k.useRef(null),m=k.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pt(()=>{o&&p.current.focus()},[o]),k.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,E)=>{const y=!p.current.style.width;if(x.clientHeight<p.current.clientHeight&&y){const N=`${Vs(Ce(x))}px`;p.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=N,p.current.style.width=`calc(100% + ${N})`}return p.current}}),[]);const f=x=>{const E=p.current,y=x.key,N=Ce(E).activeElement;if(y==="ArrowDown")x.preventDefault(),cn(E,N,d,c,zr);else if(y==="ArrowUp")x.preventDefault(),cn(E,N,d,c,Ja);else if(y==="Home")x.preventDefault(),cn(E,null,d,c,zr);else if(y==="End")x.preventDefault(),cn(E,null,d,c,Ja);else if(y.length===1){const T=m.current,M=y.toLowerCase(),D=performance.now();T.keys.length>0&&(D-T.lastTime>500?(T.keys=[],T.repeating=!0,T.previousKeyMatched=!0):T.repeating&&M!==T.keys[0]&&(T.repeating=!1)),T.lastTime=D,T.keys.push(M);const L=N&&!T.repeating&&Oi(N,T);T.previousKeyMatched&&(L||cn(E,N,!1,c,zr,T))?x.preventDefault():T.previousKeyMatched=!1}h&&h(x)},g=Ue(p,n);let w=-1;k.Children.forEach(s,(x,E)=>{if(!k.isValidElement(x)){w===E&&(w+=1,w>=s.length&&(w=-1));return}process.env.NODE_ENV!=="production"&&er.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(v==="selectedMenu"&&x.props.selected||w===-1)&&(w=E),w===E&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(w+=1,w>=s.length&&(w=-1))});const P=k.Children.map(s,(x,E)=>{if(E===w){const y={};return a&&(y.autoFocus=!0),x.props.tabIndex===void 0&&v==="selectedMenu"&&(y.tabIndex=0),k.cloneElement(x,y)}return x});return u.jsx(Mh,O({role:"menu",ref:g,className:l,onKeyDown:f,tabIndex:o?0:-1},b,{children:P}))});process.env.NODE_ENV!=="production"&&(Pi.propTypes={autoFocus:i.bool,autoFocusItem:i.bool,children:i.node,className:i.string,disabledItemsFocusable:i.bool,disableListWrap:i.bool,onKeyDown:i.func,variant:i.oneOf(["menu","selectedMenu"])});const Ih=Pi,Ah=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Dh={entering:{opacity:1},entered:{opacity:1}},Ri=k.forwardRef(function(t,n){const r=Dn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:a,appear:s=!0,children:l,easing:c,in:d,onEnter:h,onEntered:v,onEntering:b,onExit:p,onExited:m,onExiting:f,style:g,timeout:w=o,TransitionComponent:P=gi}=t,x=fe(t,Ah),E=k.useRef(null),y=Ue(E,l.ref,n),N=V=>U=>{if(V){const j=E.current;U===void 0?V(j):V(j,U)}},T=N(b),M=N((V,U)=>{bi(V);const j=ir({style:g,timeout:w,easing:c},{mode:"enter"});V.style.webkitTransition=r.transitions.create("opacity",j),V.style.transition=r.transitions.create("opacity",j),h&&h(V,U)}),D=N(v),L=N(f),R=N(V=>{const U=ir({style:g,timeout:w,easing:c},{mode:"exit"});V.style.webkitTransition=r.transitions.create("opacity",U),V.style.transition=r.transitions.create("opacity",U),p&&p(V)}),I=N(m),A=V=>{a&&a(E.current,V)};return u.jsx(P,O({appear:s,in:d,nodeRef:E,onEnter:M,onEntered:D,onEntering:T,onExit:R,onExited:I,onExiting:L,addEndListener:A,timeout:w},x,{children:(V,U)=>k.cloneElement(l,O({style:O({opacity:0,visibility:V==="exited"&&!d?"hidden":void 0},Dh[V],g,l.props.style),ref:y},U))}))});process.env.NODE_ENV!=="production"&&(Ri.propTypes={addEndListener:i.func,appear:i.bool,children:jn.isRequired,easing:i.oneOfType([i.shape({enter:i.string,exit:i.string}),i.string]),in:i.bool,onEnter:i.func,onEntered:i.func,onEntering:i.func,onExit:i.func,onExited:i.func,onExiting:i.func,style:i.object,timeout:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Bh=Ri;function Lh(e){return Ze("MuiBackdrop",e)}ht("MuiBackdrop",["root","invisible"]);const Fh=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Vh=e=>{const{classes:t,invisible:n}=e;return it({root:["root",n&&"invisible"]},Lh,t)},zh=Oe("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>O({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ji=k.forwardRef(function(t,n){var r,o,a;const s=lt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:d="div",components:h={},componentsProps:v={},invisible:b=!1,open:p,slotProps:m={},slots:f={},TransitionComponent:g=Bh,transitionDuration:w}=s,P=fe(s,Fh),x=O({},s,{component:d,invisible:b}),E=Vh(x),y=(r=m.root)!=null?r:v.root;return u.jsx(g,O({in:p,timeout:w},P,{children:u.jsx(zh,O({"aria-hidden":!0},y,{as:(o=(a=f.root)!=null?a:h.Root)!=null?o:d,className:Ne(E.root,c,y==null?void 0:y.className),ownerState:O({},x,y==null?void 0:y.ownerState),classes:E,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ji.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,components:i.shape({Root:i.elementType}),componentsProps:i.shape({root:i.object}),invisible:i.bool,open:i.bool.isRequired,slotProps:i.shape({root:i.object}),slots:i.shape({root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})])});const Uh=ji;function Hh(e){return Ze("MuiModal",e)}ht("MuiModal",["root","hidden","backdrop"]);const qh=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Wh=e=>{const{open:t,exited:n,classes:r}=e;return it({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Hh,r)},Xh=Oe("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>O({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),Gh=Oe(Uh,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),$i=k.forwardRef(function(t,n){var r,o,a,s,l,c;const d=lt({name:"MuiModal",props:t}),{BackdropComponent:h=Gh,BackdropProps:v,className:b,closeAfterTransition:p=!1,children:m,container:f,component:g,components:w={},componentsProps:P={},disableAutoFocus:x=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:y=!1,disablePortal:N=!1,disableRestoreFocus:T=!1,disableScrollLock:M=!1,hideBackdrop:D=!1,keepMounted:L=!1,onBackdropClick:R,open:I,slotProps:A,slots:V}=d,U=fe(d,qh),j=O({},d,{closeAfterTransition:p,disableAutoFocus:x,disableEnforceFocus:E,disableEscapeKeyDown:y,disablePortal:N,disableRestoreFocus:T,disableScrollLock:M,hideBackdrop:D,keepMounted:L}),{getRootProps:F,getBackdropProps:ee,getTransitionProps:Z,portalRef:C,isTopModal:$,exited:z,hasTransition:G}=Ap(O({},j,{rootRef:n})),H=O({},j,{exited:z}),W=Wh(H),Y={};if(m.props.tabIndex===void 0&&(Y.tabIndex="-1"),G){const{onEnter:te,onExited:_}=Z();Y.onEnter=te,Y.onExited=_}const K=(r=(o=V==null?void 0:V.root)!=null?o:w.Root)!=null?r:Xh,X=(a=(s=V==null?void 0:V.backdrop)!=null?s:w.Backdrop)!=null?a:h,J=(l=A==null?void 0:A.root)!=null?l:P.root,Q=(c=A==null?void 0:A.backdrop)!=null?c:P.backdrop,ae=Rt({elementType:K,externalSlotProps:J,externalForwardedProps:U,getSlotProps:F,additionalProps:{ref:n,as:g},ownerState:H,className:Ne(b,J==null?void 0:J.className,W==null?void 0:W.root,!H.open&&H.exited&&(W==null?void 0:W.hidden))}),B=Rt({elementType:X,externalSlotProps:Q,additionalProps:v,getSlotProps:te=>ee(O({},te,{onClick:_=>{R&&R(_),te!=null&&te.onClick&&te.onClick(_)}})),className:Ne(Q==null?void 0:Q.className,v==null?void 0:v.className,W==null?void 0:W.backdrop),ownerState:H});return!L&&!I&&(!G||z)?null:u.jsx(Sn,{ref:C,container:f,disablePortal:N,children:u.jsxs(K,O({},ae,{children:[!D&&h?u.jsx(X,O({},B)):null,u.jsx(nr,{disableEnforceFocus:E,disableAutoFocus:x,disableRestoreFocus:T,isEnabled:$,open:I,children:k.cloneElement(m,Y)})]}))})});process.env.NODE_ENV!=="production"&&($i.propTypes={BackdropComponent:i.elementType,BackdropProps:i.object,children:jn.isRequired,classes:i.object,className:i.string,closeAfterTransition:i.bool,component:i.elementType,components:i.shape({Backdrop:i.elementType,Root:i.elementType}),componentsProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),container:i.oneOfType([ot,i.func]),disableAutoFocus:i.bool,disableEnforceFocus:i.bool,disableEscapeKeyDown:i.bool,disablePortal:i.bool,disableRestoreFocus:i.bool,disableScrollLock:i.bool,hideBackdrop:i.bool,keepMounted:i.bool,onBackdropClick:i.func,onClose:i.func,onTransitionEnter:i.func,onTransitionExited:i.func,open:i.bool.isRequired,slotProps:i.shape({backdrop:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({backdrop:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object])});const Yh=$i;function Kh(e){return Ze("MuiPaper",e)}ht("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Jh=["className","component","elevation","square","variant"],Zh=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,a={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return it(a,Kh,o)},Qh=Oe("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return O({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&O({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${sr("#fff",Wa(t.elevation))}, ${sr("#fff",Wa(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),Mi=k.forwardRef(function(t,n){const r=lt({props:t,name:"MuiPaper"}),{className:o,component:a="div",elevation:s=1,square:l=!1,variant:c="elevation"}=r,d=fe(r,Jh),h=O({},r,{component:a,elevation:s,square:l,variant:c}),v=Zh(h);return process.env.NODE_ENV!=="production"&&Dn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),u.jsx(Qh,O({as:a,ownerState:h,className:Ne(v.root,o),ref:n},d))});process.env.NODE_ENV!=="production"&&(Mi.propTypes={children:i.node,classes:i.object,className:i.string,component:i.elementType,elevation:Jt(Hs,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:i.bool,sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),variant:i.oneOfType([i.oneOf(["elevation","outlined"]),i.string])});const em=Mi;function tm(e){return Ze("MuiPopover",e)}ht("MuiPopover",["root","paper"]);const nm=["onEntering"],rm=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],om=["slotProps"];function Za(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function Qa(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function es(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Kn(e){return typeof e=="function"?e():e}const am=e=>{const{classes:t}=e;return it({root:["root"],paper:["paper"]},tm,t)},sm=Oe(Yh,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),_i=Oe(em,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ii=k.forwardRef(function(t,n){var r,o,a;const s=lt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:d={vertical:"top",horizontal:"left"},anchorPosition:h,anchorReference:v="anchorEl",children:b,className:p,container:m,elevation:f=8,marginThreshold:g=16,open:w,PaperProps:P={},slots:x,slotProps:E,transformOrigin:y={vertical:"top",horizontal:"left"},TransitionComponent:N=io,transitionDuration:T="auto",TransitionProps:{onEntering:M}={},disableScrollLock:D=!1}=s,L=fe(s.TransitionProps,nm),R=fe(s,rm),I=(r=E==null?void 0:E.paper)!=null?r:P,A=k.useRef(),V=Ue(A,I.ref),U=O({},s,{anchorOrigin:d,anchorReference:v,elevation:f,marginThreshold:g,externalPaperSlotProps:I,transformOrigin:y,TransitionComponent:N,transitionDuration:T,TransitionProps:L}),j=am(U),F=k.useCallback(()=>{if(v==="anchorPosition")return process.env.NODE_ENV!=="production"&&(h||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),h;const te=Kn(c),_=te&&te.nodeType===1?te:Ce(A.current).body,se=_.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ke=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ke.top===0&&ke.left===0&&ke.right===0&&ke.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:se.top+Za(se,d.vertical),left:se.left+Qa(se,d.horizontal)}},[c,d.horizontal,d.vertical,h,v]),ee=k.useCallback(te=>({vertical:Za(te,y.vertical),horizontal:Qa(te,y.horizontal)}),[y.horizontal,y.vertical]),Z=k.useCallback(te=>{const _={width:te.offsetWidth,height:te.offsetHeight},se=ee(_);if(v==="none")return{top:null,left:null,transformOrigin:es(se)};const ke=F();let Pe=ke.top-se.vertical,xe=ke.left-se.horizontal;const bt=Pe+_.height,Re=xe+_.width,Qe=qt(Kn(c)),Ie=Qe.innerHeight-g,et=Qe.innerWidth-g;if(g!==null&&Pe<g){const Se=Pe-g;Pe-=Se,se.vertical+=Se}else if(g!==null&&bt>Ie){const Se=bt-Ie;Pe-=Se,se.vertical+=Se}if(process.env.NODE_ENV!=="production"&&_.height>Ie&&_.height&&Ie&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${_.height-Ie}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),g!==null&&xe<g){const Se=xe-g;xe-=Se,se.horizontal+=Se}else if(Re>et){const Se=Re-et;xe-=Se,se.horizontal+=Se}return{top:`${Math.round(Pe)}px`,left:`${Math.round(xe)}px`,transformOrigin:es(se)}},[c,v,F,ee,g]),[C,$]=k.useState(w),z=k.useCallback(()=>{const te=A.current;if(!te)return;const _=Z(te);_.top!==null&&(te.style.top=_.top),_.left!==null&&(te.style.left=_.left),te.style.transformOrigin=_.transformOrigin,$(!0)},[Z]);k.useEffect(()=>(D&&window.addEventListener("scroll",z),()=>window.removeEventListener("scroll",z)),[c,D,z]);const G=(te,_)=>{M&&M(te,_),z()},H=()=>{$(!1)};k.useEffect(()=>{w&&z()}),k.useImperativeHandle(l,()=>w?{updatePosition:()=>{z()}}:null,[w,z]),k.useEffect(()=>{if(!w)return;const te=Ds(()=>{z()}),_=qt(c);return _.addEventListener("resize",te),()=>{te.clear(),_.removeEventListener("resize",te)}},[c,w,z]);let W=T;T==="auto"&&!N.muiSupportAuto&&(W=void 0);const Y=m||(c?Ce(Kn(c)).body:void 0),K=(o=x==null?void 0:x.root)!=null?o:sm,X=(a=x==null?void 0:x.paper)!=null?a:_i,J=Rt({elementType:X,externalSlotProps:O({},I,{style:C?I.style:O({},I.style,{opacity:0})}),additionalProps:{elevation:f,ref:V},ownerState:U,className:Ne(j.paper,I==null?void 0:I.className)}),Q=Rt({elementType:K,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:R,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:Y,open:w},ownerState:U,className:Ne(j.root,p)}),{slotProps:ae}=Q,B=fe(Q,om);return u.jsx(K,O({},B,!Gs(K)&&{slotProps:ae,disableScrollLock:D},{children:u.jsx(N,O({appear:!0,in:w,onEntering:G,onExited:H,timeout:W},L,{children:u.jsx(X,O({},J,{children:b}))}))}))});process.env.NODE_ENV!=="production"&&(Ii.propTypes={action:xo,anchorEl:Jt(i.oneOfType([ot,i.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Kn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),anchorPosition:i.shape({left:i.number.isRequired,top:i.number.isRequired}),anchorReference:i.oneOf(["anchorEl","anchorPosition","none"]),children:i.node,classes:i.object,className:i.string,container:i.oneOfType([ot,i.func]),disableScrollLock:i.bool,elevation:Hs,marginThreshold:i.number,onClose:i.func,open:i.bool.isRequired,PaperProps:i.shape({component:Ac}),slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transformOrigin:i.shape({horizontal:i.oneOfType([i.oneOf(["center","left","right"]),i.number]).isRequired,vertical:i.oneOfType([i.oneOf(["bottom","center","top"]),i.number]).isRequired}),TransitionComponent:i.elementType,transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object});const im=Ii;function lm(e){return Ze("MuiMenu",e)}ht("MuiMenu",["root","paper","list"]);const cm=["onEntering"],pm=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],um={vertical:"top",horizontal:"right"},dm={vertical:"top",horizontal:"left"},fm=e=>{const{classes:t}=e;return it({root:["root"],paper:["paper"],list:["list"]},lm,t)},hm=Oe(im,{shouldForwardProp:e=>hi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),mm=Oe(_i,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),gm=Oe(Ih,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),Ai=k.forwardRef(function(t,n){var r,o;const a=lt({props:t,name:"MuiMenu"}),{autoFocus:s=!0,children:l,className:c,disableAutoFocusItem:d=!1,MenuListProps:h={},onClose:v,open:b,PaperProps:p={},PopoverClasses:m,transitionDuration:f="auto",TransitionProps:{onEntering:g}={},variant:w="selectedMenu",slots:P={},slotProps:x={}}=a,E=fe(a.TransitionProps,cm),y=fe(a,pm),N=Dn(),T=N.direction==="rtl",M=O({},a,{autoFocus:s,disableAutoFocusItem:d,MenuListProps:h,onEntering:g,PaperProps:p,transitionDuration:f,TransitionProps:E,variant:w}),D=fm(M),L=s&&!d&&b,R=k.useRef(null),I=(Z,C)=>{R.current&&R.current.adjustStyleForScrollbar(Z,N),g&&g(Z,C)},A=Z=>{Z.key==="Tab"&&(Z.preventDefault(),v&&v(Z,"tabKeyDown"))};let V=-1;k.Children.map(l,(Z,C)=>{k.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&er.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(w==="selectedMenu"&&Z.props.selected||V===-1)&&(V=C))});const U=(r=P.paper)!=null?r:mm,j=(o=x.paper)!=null?o:p,F=Rt({elementType:P.root,externalSlotProps:x.root,ownerState:M,className:[D.root,c]}),ee=Rt({elementType:U,externalSlotProps:j,ownerState:M,className:D.paper});return u.jsx(hm,O({onClose:v,anchorOrigin:{vertical:"bottom",horizontal:T?"right":"left"},transformOrigin:T?um:dm,slots:{paper:U,root:P.root},slotProps:{root:F,paper:ee},open:b,ref:n,transitionDuration:f,TransitionProps:O({onEntering:I},E),ownerState:M},y,{classes:m,children:u.jsx(gm,O({onKeyDown:A,actions:R,autoFocus:s&&(V===-1||d),autoFocusItem:L,variant:w},h,{className:Ne(D.list,h.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(Ai.propTypes={anchorEl:i.oneOfType([ot,i.func]),autoFocus:i.bool,children:i.node,classes:i.object,className:i.string,disableAutoFocusItem:i.bool,MenuListProps:i.object,onClose:i.func,open:i.bool.isRequired,PaperProps:i.object,PopoverClasses:i.object,slotProps:i.shape({paper:i.oneOfType([i.func,i.object]),root:i.oneOfType([i.func,i.object])}),slots:i.shape({paper:i.elementType,root:i.elementType}),sx:i.oneOfType([i.arrayOf(i.oneOfType([i.func,i.object,i.bool])),i.func,i.object]),transitionDuration:i.oneOfType([i.oneOf(["auto"]),i.number,i.shape({appear:i.number,enter:i.number,exit:i.number})]),TransitionProps:i.object,variant:i.oneOf(["menu","selectedMenu"])});const bm=Ai;function vm({className:e,commandHandler:t,menuDefinition:n,children:r}){var d;const[o,a]=S.useState(void 0),s=S.useCallback(h=>{h.preventDefault(),a(o===void 0?{mouseX:h.clientX+2,mouseY:h.clientY-6}:void 0)},[o]),l=S.useCallback(()=>{a(void 0)},[]),c=S.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((d=n==null?void 0:n.items)==null?void 0:d.length)??0)===0||!r?r:u.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:s,children:[r,u.jsx(bm,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:u.jsx(Vo,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const ym=Ei(u.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function wm(e){return{preserveValue:!0,...e}}const lr=(e,t,n={})=>{const r=S.useRef(t);r.current=t;const o=S.useRef(n);o.current=wm(o.current);const[a,s]=S.useState(()=>r.current),[l,c]=S.useState(!0);return S.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const h=await e();d&&(s(()=>h),c(!1))}})(),()=>{d=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[a,l]};function Di({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:s,children:l}){const[c,d]=S.useState(!1),[h,v]=S.useState(!1),b=S.useCallback(()=>{c&&d(!1),v(!1)},[c]),p=S.useCallback(E=>{E.stopPropagation(),d(y=>{const N=!y;return N&&E.shiftKey?v(!0):N||v(!1),N})},[]),m=S.useCallback(E=>(b(),r(E)),[r,b]),[f,g]=S.useState({top:1,left:1});S.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const y=E.getBoundingClientRect(),N=window.scrollY,T=window.scrollX,M=y.top+N+E.clientHeight,D=y.left+T;g({top:M,left:D})}}},[c,o]);const[w]=lr(S.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[P]=lr(S.useCallback(async()=>(e==null?void 0:e(!0))??n??w,[e,n,w,c]),n??w),x=h&&P?P:w;return u.jsxs(u.Fragment,{children:[u.jsx(ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${s??""} menu button`,onClick:p,children:l??u.jsx(ym,{})}),u.jsx(ye.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:b,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:x?u.jsx(Si,{className:a,id:`${s??""} main menu`,commandHandler:m,multiColumnMenu:x}):void 0})]})}function xm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:s="medium",className:l,onClick:c,children:d}){return u.jsx(ye.IconButton,{id:e,disabled:n,edge:a,size:s,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Em=po.cva("pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"),Bi=S.forwardRef(({className:e,...t},n)=>u.jsx(us.Root,{ref:n,className:q(Em(),e),...t}));Bi.displayName=us.Root.displayName;function Li({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:s,isRequired:l=!1,className:c,defaultValue:d,value:h,onChange:v,onFocus:b,onBlur:p}){return u.jsxs("div",{className:q("pr-inline-grid pr-items-center pr-gap-1.5",{"pr-w-full":r}),children:[u.jsx(Bi,{htmlFor:e,className:q({"pr-text-red-600":n,"pr-hidden":!a}),children:`${a}${l?"*":""}`}),u.jsx(Rn,{id:e,disabled:t,placeholder:s,required:l,className:q(c,{"pr-border-red-600":n}),defaultValue:d,value:h,onChange:v,onFocus:b,onBlur:p}),u.jsx("p",{className:q({"pr-hidden":!o}),children:o})]})}function km({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=S.useState(""),a=s=>{o(s),e(s)};return u.jsx(Li,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:s=>a(s.target.value)})}function Tm({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:a=1,showMarks:s=!1,defaultValue:l,value:c,valueLabelDisplay:d="off",className:h,onChange:v,onChangeCommitted:b}){return u.jsx(ye.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:a,marks:s,defaultValue:l,value:c,valueLabelDisplay:d,className:`papi-slider ${n} ${h??""}`,onChange:v,onChangeCommitted:b})}function Sm({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:a={vertical:"bottom",horizontal:"left"},ContentProps:s,children:l}){const c={action:(s==null?void 0:s.action)||l,message:s==null?void 0:s.message,className:r};return u.jsx(ye.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:a,id:t,ContentProps:c})}function Nm({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:a}){return u.jsx(ye.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:a})}function Cm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=S.useRef(void 0);return u.jsx("div",{ref:a,style:{position:"relative"},children:u.jsx(ye.AppBar,{position:"static",id:r,children:u.jsxs(ye.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?u.jsx(Di,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?u.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Om=_e.Root,Fi=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:q("pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Fi.displayName=_e.List.displayName;const Vi=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,className:q("pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e),...t}));Vi.displayName=_e.Trigger.displayName;const zi=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:q("pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));zi.displayName=_e.Content.displayName;const Ui=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.Root,{orientation:"vertical",ref:n,className:q("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground",e),...t}));Ui.displayName=_e.List.displayName;const Hi=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.List,{ref:n,className:q("pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",e),...t}));Hi.displayName=_e.List.displayName;const Pm=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.Trigger,{ref:n,...t,className:q("overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",e)})),qi=S.forwardRef(({className:e,...t},n)=>u.jsx(_e.Content,{ref:n,className:q("mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",e),...t}));qi.displayName=_e.Content.displayName;const Wn=e=>e==="asc"?u.jsx(de.ArrowUpIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):e==="desc"?u.jsx(de.ArrowDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}):u.jsx(de.ArrowUpDownIcon,{className:"pr-ml-2 pr-h-4 pr-w-4"}),Rm=(e,t,n,r,o)=>[{accessorKey:"character",header:({column:a})=>u.jsxs(Te,{onClick:()=>a.toggleSorting(void 0),children:[e,Wn(a.getIsSorted())]})},{accessorKey:"unicodeValue",header:({column:a})=>u.jsxs(Te,{onClick:()=>a.toggleSorting(void 0),children:[t,Wn(a.getIsSorted())]}),cell:({row:a})=>a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")},{accessorKey:"count",header:({column:a})=>u.jsxs(Te,{onClick:()=>a.toggleSorting(void 0),children:[n,Wn(a.getIsSorted())]})},{accessorKey:"status",header:({column:a,table:s})=>{const l=s.getSelectedRowModel().rows,c=[];return l.forEach(d=>{c.push(d.getValue("character"))}),u.jsxs("div",{children:[u.jsx("div",{className:"pr-flex pr-justify-center",children:u.jsxs(Te,{onClick:()=>a.toggleSorting(void 0),children:[r,Wn(a.getIsSorted())]})}),u.jsxs("div",{className:"pr-flex pr-justify-center",children:[u.jsx(Te,{children:u.jsx(de.CircleCheckIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!0)}})}),u.jsx(Te,{children:u.jsx(de.CircleXIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,!1)}})}),u.jsx(Te,{children:u.jsx(de.CircleHelpIcon,{className:"pr-h-5 pr-w-5",onClick:()=>{o(c,void 0)}})})]})]})},cell:({row:a})=>{const s=a.getValue("status");return s===!0?u.jsx(de.CircleCheckIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):s===!1?u.jsx(de.CircleXIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"}):u.jsx(de.CircleHelpIcon,{className:"pr-ml-2 pr-h-5 pr-w-5"})}}];function jm({tableData:e,onStatusChange:t,onSelectCharacter:n,localizedStrings:r}){const o=r["%webView_inventory_table_header_character%"],a=r["%webView_inventory_table_header_unicode_value%"],s=r["%webView_inventory_table_header_count%"],l=r["%webView_inventory_table_header_status%"],c=(d,h)=>{h.toggleAllRowsSelected(!1),d.toggleSelected(void 0),n(d.getValue("character"))};return u.jsx("div",{className:"pr-overflow-y-auto",children:u.jsx(Os,{columns:Rm(o,a,s,l,t),data:e,onRowClickHandler:c})})}const ts=(e,t,n)=>{if(!e||e===""||t==="")return[];const r=[],o=e.split(`
`);let a="0",s="0",l=0;return o.forEach(c=>{const d=c.split(/\s+/);c.startsWith("\\c")&&([,a]=d,s="0"),c.startsWith("\\v")&&([,s]=d,a==="0"&&(a=n.chapterNum.toString()));for(let h=0;h<d.length;h++)if(d[h].includes(t)){const v=Math.max(0,h-2),b=Math.min(d.length,h+3),p=d.slice(v,b).join(" "),m={reference:{...n,chapterNum:+a,verseNum:+s},snippet:p,key:l};l+=1,r.push(m)}}),r};function $m({selectedCharacter:e,text:t,scriptureReference:n,setScriptureReference:r,localizedStrings:o}){const a=o["%webView_inventory_occurrences_table_header_reference%"],s=o["%webView_inventory_occurrences_table_header_occurrence%"],[l,c]=S.useState(ts(t,e,n));return S.useEffect(()=>c(ts(t,e,n)),[t,e,n]),u.jsxs(ur,{children:[u.jsx(dr,{children:u.jsxs(Nt,{children:[u.jsx(xn,{children:a}),u.jsx(xn,{children:s})]})}),u.jsx(fr,{children:l.map(d=>u.jsxs(Nt,{onClick:()=>{r(d.reference)},children:[u.jsx(Ut,{children:`${he.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}`}),u.jsx(Ut,{children:d.snippet})]},d.key))})]})}const Mm=async(e,t,n,r,o)=>{const a=[];return cs.split(e,"").forEach(s=>{if(n!==""&&!s.includes(n))return;const l=a.find(c=>c.character===s);if(l)l.count+=1;else{let c;if(r.includes(s)&&(c=!0),o.includes(s)&&(c=!1),t==="all"||t==="approved"&&c===!0||t==="unapproved"&&c===!1||t==="unknown"&&c===void 0){const d={character:s,count:1,status:c};a.push(d)}}}),a};function _m({scriptureReference:e,setScriptureReference:t,localizedStrings:n,projectId:r,getSetting:o,setSetting:a,getText:s}){const l=n["%webView_characterInventory_characters_all%"],c=n["%webView_characterInventory_characters_approved%"],d=n["%webView_characterInventory_characters_unapproved%"],h=n["%webView_characterInventory_characters_unknown%"],v=n["%webView_inventory_scope_book%"],b=n["%webView_inventory_scope_chapter%"],p=n["%webView_inventory_scope_verse%"],m=n["%webView_inventory_filter_text%"],[f,g]=S.useState([]),[w,P]=S.useState([]),[x,E]=S.useState(void 0),[y,N]=S.useState("book"),[T,M]=S.useState("all"),[D,L]=S.useState(""),[R,I]=S.useState([]),[A,V]=S.useState(""),U=(j,F)=>{I(ee=>{let Z=[];return j.forEach(C=>{Z=ee.map($=>$.character===C&&$.status!==F?{...$,status:F}:$)}),g(C=>{let $=[...C];return j.forEach(z=>{F===!0?$.includes(z)||$.push(z):$=$.filter(G=>G!==z)}),a("validCharacters",r,$),$}),P(C=>{let $=[...C];return j.forEach(z=>{F===!1?$.includes(z)||$.push(z):$=$.filter(G=>G!==z)}),a("invalidCharacters",r,$),$}),Z})};return S.useEffect(()=>{(async()=>{try{g(await o("validCharacters",r)),P(await o("invalidCharacters",r))}catch{throw new Error("Failed to fetch characters from project settings")}})()},[r,o]),S.useEffect(()=>{(async()=>{try{const F=await s(r,e,y);E(F)}catch{throw new Error("Failed getting scripture text")}})()},[r,e,y,s]),S.useEffect(()=>{if(!x){I([]);return}(async()=>{try{I(await Mm(x,T,D,f,w))}catch{throw new Error("Failed building table data")}})()},[f,w,x,T,D]),u.jsxs("div",{className:"pr-twp",children:[u.jsxs("div",{className:"pr-flex",children:[u.jsxs(Zn,{onValueChange:j=>M(j),defaultValue:T,children:[u.jsx(En,{children:u.jsx(Qn,{placeholder:"Select filter"})}),u.jsxs(kn,{children:[u.jsx(Xe,{value:"all",children:l}),u.jsx(Xe,{value:"approved",children:c}),u.jsx(Xe,{value:"unapproved",children:d}),u.jsx(Xe,{value:"unknown",children:h})]})]}),u.jsxs(Zn,{onValueChange:j=>N(j),defaultValue:y,children:[u.jsx(En,{children:u.jsx(Qn,{placeholder:"Select scope"})}),u.jsxs(kn,{children:[u.jsx(Xe,{value:"book",children:v}),u.jsx(Xe,{value:"chapter",children:b}),u.jsx(Xe,{value:"verse",children:p})]})]}),u.jsx(Rn,{className:"pr-rounded-md pr-border",placeholder:m,value:D,onChange:j=>{L(j.target.value)}})]}),u.jsx("div",{className:`pr-overflow-y-auto pr-rounded-md pr-border ${A!==""&&"pr-max-h-96"}`,children:u.jsx(jm,{tableData:R,onStatusChange:U,onSelectCharacter:j=>{V(j)},localizedStrings:n})}),A!==""&&u.jsx("div",{className:"pr-mt-4 pr-rounded-md pr-border",children:u.jsx($m,{selectedCharacter:A,text:x,scriptureReference:e,setScriptureReference:j=>t(j),localizedStrings:n})})]})}function Im({isDownloading:e,handleClick:t,buttonText:n}){return u.jsx(Te,{className:q("pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",{"pr-cursor-not-allowed pr-bg-blue-700":e,"pr-bg-blue-600":!e,"pr-bg-white pr-text-blue-600":!n,"pr-w-20":n}),onClick:t,children:e?u.jsx(de.LoaderCircle,{size:15,className:"pr-animate-spin"}):u.jsxs(u.Fragment,{children:[u.jsx(de.Download,{size:25,className:"pr-h-4 pr-w-4"}),n]})})}function Am({isRemoving:e,handleClick:t}){return u.jsx(Te,{className:q("pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-gray-400":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-black"}),"Removing..."]}):"Remove"})}function Dm({isUpdating:e,handleClick:t}){return u.jsx(Te,{className:q("pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",{"pr-cursor-not-allowed pr-bg-blue-700":e}),onClick:t,children:e?u.jsxs(u.Fragment,{children:[u.jsx(de.LoaderCircle,{size:15,className:"pr-mr-1 pr-animate-spin pr-text-white"}),"Updating..."]}):"Update"})}function St(){return St=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},St.apply(this,arguments)}const Bm=["children","options"],ns=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((e,t)=>(e[t.toLowerCase()]=t,e),{for:"htmlFor"}),rs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},Lm=["style","script"],Fm=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,Vm=/mailto:/i,zm=/\n{2,}$/,Wi=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,Um=/^ *> ?/gm,Hm=/^ {2,}\n/,qm=/^(?:( *[-*_])){3,} *(?:\n *)+\n/,Xi=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,Gi=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,Wm=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,Xm=/^(?:\n *)*\n/,Gm=/\r\n?/g,Ym=/^\[\^([^\]]+)](:.*)\n/,Km=/^\[\^([^\]]+)]/,Jm=/\f/g,Zm=/^\s*?\[(x|\s)\]/,Yi=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ki=/^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,Ji=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,lo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Qm=/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,Zi=/^<!--[\s\S]*?(?:-->)/,eg=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,co=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,tg=/^\{.*\}$/,ng=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,rg=/^<([^ >]+@[^ >]+)>/,og=/^<([^ >]+:\/[^ >]+)>/,ag=/-([a-z])?/gi,Qi=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,sg=/^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,ig=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,lg=/^\[([^\]]*)\] ?\[([^\]]*)\]/,cg=/(\[|\])/g,pg=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,ug=/\t/g,dg=/^ *\| */,fg=/(^ *\||\| *$)/g,hg=/ *$/,mg=/^ *:-+: *$/,gg=/^ *:-+ *$/,bg=/^ *-+: *$/,vg=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,yg=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,wg=/^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,xg=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Eg=/^\\([^0-9A-Za-z\s])/,kg=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Tg=/^\n+/,Sg=/^([ \t]*)/,Ng=/\\([^\\])/g,os=/ *\n+$/,Cg=/(?:^|\n)( *)$/,zo="(?:\\d+\\.)",Uo="(?:[*+-])";function el(e){return"( *)("+(e===1?zo:Uo)+") +"}const tl=el(1),nl=el(2);function rl(e){return new RegExp("^"+(e===1?tl:nl))}const Og=rl(1),Pg=rl(2);function ol(e){return new RegExp("^"+(e===1?tl:nl)+"[^\\n]*(?:\\n(?!\\1"+(e===1?zo:Uo)+" )[^\\n]*)*(\\n|$)","gm")}const al=ol(1),sl=ol(2);function il(e){const t=e===1?zo:Uo;return new RegExp("^( *)("+t+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+t+" (?!"+t+" ))\\n*|\\s*\\n*$)")}const ll=il(1),cl=il(2);function as(e,t){const n=t===1,r=n?ll:cl,o=n?al:sl,a=n?Og:Pg;return{t(s,l,c){const d=Cg.exec(c);return d&&(l.o||!l._&&!l.u)?r.exec(s=d[1]+s):null},i:oe.HIGH,l(s,l,c){const d=n?+s[2]:void 0,h=s[0].replace(zm,`
`).match(o);let v=!1;return{p:h.map(function(b,p){const m=a.exec(b)[0].length,f=new RegExp("^ {1,"+m+"}","gm"),g=b.replace(f,"").replace(a,""),w=p===h.length-1,P=g.indexOf(`

`)!==-1||w&&v;v=P;const x=c._,E=c.o;let y;c.o=!0,P?(c._=!1,y=g.replace(os,`

`)):(c._=!0,y=g.replace(os,""));const N=l(y,c);return c._=x,c.o=E,N}),m:n,g:d}},h:(s,l,c)=>e(s.m?"ol":"ul",{key:c.k,start:s.g},s.p.map(function(d,h){return e("li",{key:h},l(d,c))}))}}const Rg=/^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,jg=/^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,pl=[Wi,Xi,Gi,Yi,Ji,Ki,Zi,Qi,al,ll,sl,cl],$g=[...pl,/^[^\n]+(?:  \n|\n{2,})/,lo,co];function Mg(e){return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function _g(e){return bg.test(e)?"right":mg.test(e)?"center":gg.test(e)?"left":null}function ss(e,t,n){const r=n.$;n.$=!0;const o=t(e.trim(),n);n.$=r;let a=[[]];return o.forEach(function(s,l){s.type==="tableSeparator"?l!==0&&l!==o.length-1&&a.push([]):(s.type!=="text"||o[l+1]!=null&&o[l+1].type!=="tableSeparator"||(s.v=s.v.replace(hg,"")),a[a.length-1].push(s))}),a}function Ig(e,t,n){n._=!0;const r=ss(e[1],t,n),o=e[2].replace(fg,"").split("|").map(_g),a=function(s,l,c){return s.trim().split(`
`).map(function(d){return ss(d,l,c)})}(e[3],t,n);return n._=!1,{S:o,A:a,L:r,type:"table"}}function is(e,t){return e.S[t]==null?{}:{textAlign:e.S[t]}}function pt(e){return function(t,n){return n._?e.exec(t):null}}function ut(e){return function(t,n){return n._||n.u?e.exec(t):null}}function nt(e){return function(t,n){return n._||n.u?null:e.exec(t)}}function pn(e){return function(t){return e.exec(t)}}function Ag(e,t,n){if(t._||t.u||n&&!n.endsWith(`
`))return null;let r="";e.split(`
`).every(a=>!pl.some(s=>s.test(a))&&(r+=a+`
`,a.trim()));const o=r.trimEnd();return o==""?null:[r,o]}function Ft(e){try{if(decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data(?!:image)):/i))return}catch{return null}return e}function ls(e){return e.replace(Ng,"$1")}function Jn(e,t,n){const r=n._||!1,o=n.u||!1;n._=!0,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Dg(e,t,n){const r=n._||!1,o=n.u||!1;n._=!1,n.u=!0;const a=e(t,n);return n._=r,n.u=o,a}function Bg(e,t,n){return n._=!1,e(t,n)}const Ur=(e,t,n)=>({v:Jn(t,e[1],n)});function Hr(){return{}}function qr(){return null}function Lg(...e){return e.filter(Boolean).join(" ")}function Wr(e,t,n){let r=e;const o=t.split(".");for(;o.length&&(r=r[o[0]],r!==void 0);)o.shift();return r||n}var oe;function Fg(e,t={}){t.overrides=t.overrides||{},t.slugify=t.slugify||Mg,t.namedCodesToUnicode=t.namedCodesToUnicode?St({},rs,t.namedCodesToUnicode):rs;const n=t.createElement||k.createElement;function r(p,m,...f){const g=Wr(t.overrides,`${p}.props`,{});return n(function(w,P){const x=Wr(P,w);return x?typeof x=="function"||typeof x=="object"&&"render"in x?x:Wr(P,`${w}.component`,w):w}(p,t.overrides),St({},m,g,{className:Lg(m==null?void 0:m.className,g.className)||void 0}),...f)}function o(p){let m=!1;t.forceInline?m=!0:t.forceBlock||(m=pg.test(p)===!1);const f=h(d(m?p:`${p.trimEnd().replace(Tg,"")}

`,{_:m}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(t.wrapper===null)return f;const g=t.wrapper||(m?"span":"div");let w;if(f.length>1||t.forceWrapper)w=f;else{if(f.length===1)return w=f[0],typeof w=="string"?r("span",{key:"outer"},w):w;w=null}return k.createElement(g,{key:"outer"},w)}function a(p){const m=p.match(Fm);return m?m.reduce(function(f,g,w){const P=g.indexOf("=");if(P!==-1){const x=function(T){return T.indexOf("-")!==-1&&T.match(eg)===null&&(T=T.replace(ag,function(M,D){return D.toUpperCase()})),T}(g.slice(0,P)).trim(),E=function(T){const M=T[0];return(M==='"'||M==="'")&&T.length>=2&&T[T.length-1]===M?T.slice(1,-1):T}(g.slice(P+1).trim()),y=ns[x]||x,N=f[y]=function(T,M){return T==="style"?M.split(/;\s?/).reduce(function(D,L){const R=L.slice(0,L.indexOf(":"));return D[R.replace(/(-[a-z])/g,I=>I[1].toUpperCase())]=L.slice(R.length+1).trim(),D},{}):T==="href"?Ft(M):(M.match(tg)&&(M=M.slice(1,M.length-1)),M==="true"||M!=="false"&&M)}(x,E);typeof N=="string"&&(lo.test(N)||co.test(N))&&(f[y]=k.cloneElement(o(N.trim()),{key:w}))}else g!=="style"&&(f[ns[g]||g]=!0);return f},{}):null}const s=[],l={},c={blockQuote:{t:nt(Wi),i:oe.HIGH,l:(p,m,f)=>({v:m(p[0].replace(Um,""),f)}),h:(p,m,f)=>r("blockquote",{key:f.k},m(p.v,f))},breakLine:{t:pn(Hm),i:oe.HIGH,l:Hr,h:(p,m,f)=>r("br",{key:f.k})},breakThematic:{t:nt(qm),i:oe.HIGH,l:Hr,h:(p,m,f)=>r("hr",{key:f.k})},codeBlock:{t:nt(Gi),i:oe.MAX,l:p=>({v:p[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),M:void 0}),h:(p,m,f)=>r("pre",{key:f.k},r("code",St({},p.O,{className:p.M?`lang-${p.M}`:""}),p.v))},codeFenced:{t:nt(Xi),i:oe.MAX,l:p=>({O:a(p[3]||""),v:p[4],M:p[2]||void 0,type:"codeBlock"})},codeInline:{t:ut(Wm),i:oe.LOW,l:p=>({v:p[2]}),h:(p,m,f)=>r("code",{key:f.k},p.v)},footnote:{t:nt(Ym),i:oe.MAX,l:p=>(s.push({I:p[2],j:p[1]}),{}),h:qr},footnoteReference:{t:pt(Km),i:oe.HIGH,l:p=>({v:p[1],B:`#${t.slugify(p[1])}`}),h:(p,m,f)=>r("a",{key:f.k,href:Ft(p.B)},r("sup",{key:f.k},p.v))},gfmTask:{t:pt(Zm),i:oe.HIGH,l:p=>({R:p[1].toLowerCase()==="x"}),h:(p,m,f)=>r("input",{checked:p.R,key:f.k,readOnly:!0,type:"checkbox"})},heading:{t:nt(t.enforceAtxHeadings?Ki:Yi),i:oe.HIGH,l:(p,m,f)=>({v:Jn(m,p[2],f),T:t.slugify(p[2]),C:p[1].length}),h:(p,m,f)=>r(`h${p.C}`,{id:p.T,key:f.k},m(p.v,f))},headingSetext:{t:nt(Ji),i:oe.MAX,l:(p,m,f)=>({v:Jn(m,p[1],f),C:p[2]==="="?1:2,type:"heading"})},htmlComment:{t:pn(Zi),i:oe.HIGH,l:()=>({}),h:qr},image:{t:ut(jg),i:oe.HIGH,l:p=>({D:p[1],B:ls(p[2]),F:p[3]}),h:(p,m,f)=>r("img",{key:f.k,alt:p.D||void 0,title:p.F||void 0,src:Ft(p.B)})},link:{t:pt(Rg),i:oe.LOW,l:(p,m,f)=>({v:Dg(m,p[1],f),B:ls(p[2]),F:p[3]}),h:(p,m,f)=>r("a",{key:f.k,href:Ft(p.B),title:p.F},m(p.v,f))},linkAngleBraceStyleDetector:{t:pt(og),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],type:"link"})},linkBareUrlDetector:{t:(p,m)=>m.N?null:pt(ng)(p,m),i:oe.MAX,l:p=>({v:[{v:p[1],type:"text"}],B:p[1],F:void 0,type:"link"})},linkMailtoDetector:{t:pt(rg),i:oe.MAX,l(p){let m=p[1],f=p[1];return Vm.test(f)||(f="mailto:"+f),{v:[{v:m.replace("mailto:",""),type:"text"}],B:f,type:"link"}}},orderedList:as(r,1),unorderedList:as(r,2),newlineCoalescer:{t:nt(Xm),i:oe.LOW,l:Hr,h:()=>`
`},paragraph:{t:Ag,i:oe.LOW,l:Ur,h:(p,m,f)=>r("p",{key:f.k},m(p.v,f))},ref:{t:pt(sg),i:oe.MAX,l:p=>(l[p[1]]={B:p[2],F:p[4]},{}),h:qr},refImage:{t:ut(ig),i:oe.MAX,l:p=>({D:p[1]||void 0,P:p[2]}),h:(p,m,f)=>r("img",{key:f.k,alt:p.D,src:Ft(l[p.P].B),title:l[p.P].F})},refLink:{t:pt(lg),i:oe.MAX,l:(p,m,f)=>({v:m(p[1],f),Z:m(p[0].replace(cg,"\\$1"),f),P:p[2]}),h:(p,m,f)=>l[p.P]?r("a",{key:f.k,href:Ft(l[p.P].B),title:l[p.P].F},m(p.v,f)):r("span",{key:f.k},m(p.Z,f))},table:{t:nt(Qi),i:oe.HIGH,l:Ig,h:(p,m,f)=>r("table",{key:f.k},r("thead",null,r("tr",null,p.L.map(function(g,w){return r("th",{key:w,style:is(p,w)},m(g,f))}))),r("tbody",null,p.A.map(function(g,w){return r("tr",{key:w},g.map(function(P,x){return r("td",{key:x,style:is(p,x)},m(P,f))}))})))},tableSeparator:{t:function(p,m){return m.$?(m._=!0,dg.exec(p)):null},i:oe.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:pn(kg),i:oe.MIN,l:p=>({v:p[0].replace(Qm,(m,f)=>t.namedCodesToUnicode[f]?t.namedCodesToUnicode[f]:m)}),h:p=>p.v},textBolded:{t:ut(vg),i:oe.MED,l:(p,m,f)=>({v:m(p[2],f)}),h:(p,m,f)=>r("strong",{key:f.k},m(p.v,f))},textEmphasized:{t:ut(yg),i:oe.LOW,l:(p,m,f)=>({v:m(p[2],f)}),h:(p,m,f)=>r("em",{key:f.k},m(p.v,f))},textEscaped:{t:ut(Eg),i:oe.HIGH,l:p=>({v:p[1],type:"text"})},textMarked:{t:ut(wg),i:oe.LOW,l:Ur,h:(p,m,f)=>r("mark",{key:f.k},m(p.v,f))},textStrikethroughed:{t:ut(xg),i:oe.LOW,l:Ur,h:(p,m,f)=>r("del",{key:f.k},m(p.v,f))}};t.disableParsingRawHTML!==!0&&(c.htmlBlock={t:pn(lo),i:oe.HIGH,l(p,m,f){const[,g]=p[3].match(Sg),w=new RegExp(`^${g}`,"gm"),P=p[3].replace(w,""),x=(E=P,$g.some(M=>M.test(E))?Bg:Jn);var E;const y=p[1].toLowerCase(),N=Lm.indexOf(y)!==-1;f.N=f.N||y==="a";const T=N?p[3]:x(m,P,f);return f.N=!1,{O:a(p[2]),v:T,G:N,H:N?y:p[1]}},h:(p,m,f)=>r(p.H,St({key:f.k},p.O),p.G?p.v:m(p.v,f))},c.htmlSelfClosing={t:pn(co),i:oe.HIGH,l:p=>({O:a(p[2]||""),H:p[1]}),h:(p,m,f)=>r(p.H,St({},p.O,{key:f.k}))});const d=function(p){let m=Object.keys(p);function f(g,w){let P=[],x="";for(;g;){let E=0;for(;E<m.length;){const y=m[E],N=p[y],T=N.t(g,w,x);if(T){const M=T[0];g=g.substring(M.length);const D=N.l(T,f,w);D.type==null&&(D.type=y),P.push(D),x=M;break}E++}}return P}return m.sort(function(g,w){let P=p[g].i,x=p[w].i;return P!==x?P-x:g<w?-1:1}),function(g,w){return f(function(P){return P.replace(Gm,`
`).replace(Jm,"").replace(ug,"    ")}(g),w)}}(c),h=(v=function(p){return function(m,f,g){return p[m.type].h(m,f,g)}}(c),function p(m,f={}){if(Array.isArray(m)){const g=f.k,w=[];let P=!1;for(let x=0;x<m.length;x++){f.k=x;const E=p(m[x],f),y=typeof E=="string";y&&P?w[w.length-1]+=E:E!==null&&w.push(E),P=y}return f.k=g,w}return v(m,p,f)});var v;const b=o(e);return s.length?r("div",null,b,r("footer",{key:"footer"},s.map(function(p){return r("div",{id:t.slugify(p.j),key:p.j},p.j,h(d(p.I,{_:!0})))}))):b}(function(e){e[e.MAX=0]="MAX",e[e.HIGH=1]="HIGH",e[e.MED=2]="MED",e[e.LOW=3]="LOW",e[e.MIN=4]="MIN"})(oe||(oe={}));const Vg=e=>{let{children:t,options:n}=e,r=function(o,a){if(o==null)return{};var s,l,c={},d=Object.keys(o);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(c[s]=o[s]);return c}(e,Bm);return k.cloneElement(Fg(t,n),r)};function zg({markdown:e}){return u.jsx("div",{className:"pr-prose",children:u.jsx(Vg,{children:e})})}const Ug=(e,t)=>{S.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Xr=()=>!1,Hg=(e,t)=>{const[n]=lr(S.useCallback(async()=>{if(!e)return Xr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Xr,{preserveValue:!1});S.useEffect(()=>()=>{n!==Xr&&n()},[n])},ul=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:q("pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",e),...t}));ul.displayName="Card";const dl=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:q("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6",e),...t}));dl.displayName="CardHeader";const fl=S.forwardRef(({className:e,...t},n)=>u.jsx("h3",{ref:n,className:q("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",e),...t,children:t.children}));fl.displayName="CardTitle";const hl=S.forwardRef(({className:e,...t},n)=>u.jsx("p",{ref:n,className:q("pr-text-sm pr-text-muted-foreground",e),...t}));hl.displayName="CardDescription";const ml=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:q("pr-p-6 pr-pt-0",e),...t}));ml.displayName="CardContent";const gl=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:q("pr-flex pr-items-center pr-p-6 pr-pt-0",e),...t}));gl.displayName="CardFooter";const qg=po.cva("pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",{variants:{variant:{default:"pr-bg-background pr-text-foreground",destructive:"pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"}},defaultVariants:{variant:"default"}}),bl=S.forwardRef(({className:e,variant:t,...n},r)=>u.jsx("div",{ref:r,role:"alert",className:q(qg({variant:t}),e),...n}));bl.displayName="Alert";const vl=S.forwardRef(({className:e,...t},n)=>u.jsxs("h5",{ref:n,className:q("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight",e),...t,children:[t.children," "]}));vl.displayName="AlertTitle";const yl=S.forwardRef(({className:e,...t},n)=>u.jsx("div",{ref:n,className:q("pr-text-sm [&_p]:pr-leading-relaxed",e),...t}));yl.displayName="AlertDescription";const wl=S.forwardRef(({className:e,...t},n)=>u.jsxs(dn.Root,{ref:n,className:q("pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",e),...t,children:[u.jsx(dn.Track,{className:"pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary",children:u.jsx(dn.Range,{className:"pr-absolute pr-h-full pr-bg-primary"})}),u.jsx(dn.Thumb,{className:"pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50"})]}));wl.displayName=dn.Root.displayName;const xl=S.forwardRef(({className:e,...t},n)=>u.jsx(Yr.Root,{className:q("pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",e),...t,ref:n,children:u.jsx(Yr.Thumb,{className:q("pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0")})}));xl.displayName=Yr.Root.displayName;exports.Alert=bl;exports.AlertDescription=yl;exports.AlertTitle=vl;exports.BookChapterControl=gc;exports.Button=Te;exports.Card=ul;exports.CardContent=ml;exports.CardDescription=hl;exports.CardFooter=gl;exports.CardHeader=dl;exports.CardTitle=fl;exports.ChapterRangeSelector=wc;exports.CharacterInventory=_m;exports.Checkbox=Ps;exports.Checklist=xc;exports.ComboBox=Kr;exports.ContextMenu=vm;exports.DataTable=Os;exports.DownloadButton=Im;exports.DropdownMenu=mo;exports.DropdownMenuCheckboxItem=bo;exports.DropdownMenuContent=cr;exports.DropdownMenuGroup=tc;exports.DropdownMenuItem=go;exports.DropdownMenuLabel=Pn;exports.DropdownMenuPortal=nc;exports.DropdownMenuRadioGroup=oc;exports.DropdownMenuRadioItem=xs;exports.DropdownMenuSeparator=pr;exports.DropdownMenuShortcut=Es;exports.DropdownMenuSub=rc;exports.DropdownMenuSubContent=ws;exports.DropdownMenuSubTrigger=ys;exports.DropdownMenuTrigger=vs;exports.GridMenu=Si;exports.HamburgerMenuButton=Di;exports.IconButton=xm;exports.Input=Rn;exports.LabelPosition=kt;exports.MarkdownRenderer=zg;exports.MenuItem=Fo;exports.RemoveButton=Am;exports.SearchBar=km;exports.Select=Zn;exports.SelectContent=kn;exports.SelectGroup=bc;exports.SelectItem=Xe;exports.SelectLabel=Ns;exports.SelectScrollDownButton=yo;exports.SelectScrollUpButton=vo;exports.SelectSeparator=Cs;exports.SelectTrigger=En;exports.SelectValue=Qn;exports.ShadCnSlider=wl;exports.ShadCnSwitch=xl;exports.Slider=Tm;exports.Snackbar=Sm;exports.Switch=Nm;exports.Table=ur;exports.TableBody=fr;exports.TableCaption=Ts;exports.TableCell=Ut;exports.TableFooter=ks;exports.TableHead=xn;exports.TableHeader=dr;exports.TableRow=Nt;exports.Tabs=Om;exports.TabsContent=zi;exports.TabsList=Fi;exports.TabsTrigger=Vi;exports.TextField=Li;exports.Toolbar=Cm;exports.UpdateButton=Dm;exports.VerticalTabs=Ui;exports.VerticalTabsContent=qi;exports.VerticalTabsList=Hi;exports.VerticalTabsTrigger=Pm;exports.buttonVariants=Ss;exports.useEvent=Ug;exports.useEventAsync=Hg;exports.usePromise=lr;function Wg(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Wg(`/*
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
  }

  .paratext-dark {
    --background: 0, 0%, 0%;
    --foreground: 0, 0%, 100%;
    --muted: 15.5, 13.2%, 53.9%;
    --muted-foreground: 33.9, 32.4%, 86.1%;
    --popover: 180, 71.4%, 5%;
    --popover-foreground: 0, 0%, 100%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
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
.pr-m-2 {
  margin: 0.5rem;
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
.pr-me-2 {
  margin-inline-end: 0.5rem;
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
.pr-block {
  display: block;
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
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
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
.pr-w-0 {
  width: 0px;
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
.pr-w-4 {
  width: 1rem;
}
.pr-w-5 {
  width: 1.25rem;
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
.pr-max-w-64 {
  max-width: 16rem;
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
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
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
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
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
.pr-rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.pr-rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
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
.pr-border-border {
  border-color: hsl(var(--border));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
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
.pr-pt-0 {
  padding-top: 0px;
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
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
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
.pr-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.pr-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
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
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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

  .dark\\:pr-border-destructive {
    border-color: hsl(var(--destructive));
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
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
`,"top");
//# sourceMappingURL=index.cjs.map
