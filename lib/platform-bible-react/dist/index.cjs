"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),g=require("react"),pt=require("clsx"),yl=require("tailwind-merge"),ps=require("@radix-ui/react-dropdown-menu"),Y=require("lucide-react"),Q=require("platform-bible-utils"),Wt=require("@radix-ui/react-slot"),Kt=require("class-variance-authority"),Nl=require("@radix-ui/react-label"),kl=require("@radix-ui/react-radio-group"),jl=require("@radix-ui/react-popover"),Ae=require("cmdk"),Sl=require("@radix-ui/react-dialog"),_e=require("@tanstack/react-table"),El=require("@radix-ui/react-select"),Tl=require("@radix-ui/react-checkbox"),Cl=require("@radix-ui/react-toggle-group"),Rl=require("@radix-ui/react-toggle"),Ol=require("@radix-ui/react-tabs"),_l=require("@radix-ui/react-separator"),Pl=require("@radix-ui/react-tooltip"),Hr=require("@mui/styled-engine"),Fe=require("@mui/material"),fn=require("react-dom"),ws=require("sonner"),Il=require("@radix-ui/react-slider"),Ml=require("@radix-ui/react-switch"),$l=require("markdown-to-jsx");function Re(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const A=Re(g),me=Re(ps),fs=Re(Nl),jn=Re(kl),Sn=Re(jl),et=Re(Sl),ve=Re(El),Xr=Re(Tl),sr=Re(Cl),ms=Re(Rl),De=Re(Ol),hs=Re(_l),_n=Re(Pl),Al=Re(fn),mn=Re(Il),Yr=Re(Ml);const Dl=yl.extendTailwindMerge({prefix:"tw-"});function k(...e){return Dl(pt.clsx(e))}const Pt=g.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:k("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));Pt.displayName="Input";const Bl=g.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>a.jsx("div",{className:"tw-relative",children:a.jsx(Pt,{...o,type:"text",className:k("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"),onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:s})})),Vl="layoutDirection";function Se(){const e=localStorage.getItem(Vl);return e==="rtl"?e:"ltr"}const Pn=me.Root,ir=me.Trigger,gs=me.Group,zl=me.Portal,Ll=me.Sub,Fl=me.RadioGroup,bs=g.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(me.SubTrigger,{ref:o,className:k("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(Y.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));bs.displayName=me.SubTrigger.displayName;const vs=g.forwardRef(({className:e,...t},n)=>a.jsx(me.SubContent,{ref:n,className:k("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));vs.displayName=me.SubContent.displayName;const Jt=g.forwardRef(({className:e,sideOffset:t=4,children:n,...r},o)=>{const s=Se();return a.jsx(me.Portal,{children:a.jsx(me.Content,{ref:o,sideOffset:t,className:k("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,children:a.jsx("div",{dir:s,children:n})})})});Jt.displayName=me.Content.displayName;const En=g.forwardRef(({className:e,inset:t,...n},r)=>{const o=Se();return a.jsx(me.Item,{ref:r,className:k("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n,dir:o})});En.displayName=me.Item.displayName;const lr=g.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(me.CheckboxItem,{ref:o,className:k("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(me.ItemIndicator,{children:a.jsx(Y.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));lr.displayName=me.CheckboxItem.displayName;const co=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(me.RadioItem,{ref:r,className:k("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(me.ItemIndicator,{children:a.jsx(Y.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));co.displayName=me.RadioItem.displayName;const In=g.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(me.Label,{ref:r,className:k("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));In.displayName=me.Label.displayName;const Zt=g.forwardRef(({className:e,...t},n)=>a.jsx(me.Separator,{ref:n,className:k("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Zt.displayName=me.Separator.displayName;function xs({className:e,...t}){return a.jsx("span",{className:k("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}xs.displayName="DropdownMenuShortcut";var Gl=Object.defineProperty,Ul=(e,t,n)=>t in e?Gl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,oe=(e,t,n)=>Ul(e,typeof t!="symbol"?t+"":t,n);const Et=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],uo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ys=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ha=ec();function Qt(e,t=!0){return t&&(e=e.toUpperCase()),e in ha?ha[e]:0}function po(e){return Qt(e)>0}function ql(e){const t=typeof e=="string"?Qt(e):e;return t>=40&&t<=66}function Hl(e){return(typeof e=="string"?Qt(e):e)<=39}function Ns(e){return e<=66}function Xl(e){const t=typeof e=="string"?Qt(e):e;return Ss(t)&&!Ns(t)}function*Yl(){for(let e=1;e<=Et.length;e++)yield e}const Wl=1,ks=Et.length;function Kl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wo(e,t="***"){const n=e-1;return n<0||n>=Et.length?t:Et[n]}function js(e){return e<=0||e>ks?"******":ys[e-1]}function Jl(e){return js(Qt(e))}function Ss(e){const t=typeof e=="number"?wo(e):e;return po(t)&&!uo.includes(t)}function Zl(e){const t=typeof e=="number"?wo(e):e;return po(t)&&uo.includes(t)}function Ql(e){return ys[e-1].includes("*obsolete*")}function ec(){const e={};for(let t=0;t<Et.length;t++)e[Et[t]]=t+1;return e}const ce={allBookIds:Et,nonCanonicalIds:uo,bookIdToNumber:Qt,isBookIdValid:po,isBookNT:ql,isBookOT:Hl,isBookOTNT:Ns,isBookDC:Xl,allBookNumbers:Yl,firstBook:Wl,lastBook:ks,extraBooks:Kl,bookNumberToId:wo,bookNumberToEnglishName:js,bookIdToEnglishName:Jl,isCanonical:Ss,isExtraMaterial:Zl,isObsolete:Ql};var Ze=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ze||{});const Ve=class{constructor(t){if(oe(this,"name"),oe(this,"fullPath"),oe(this,"isPresent"),oe(this,"hasVerseSegments"),oe(this,"isCustomized"),oe(this,"baseVersification"),oe(this,"scriptureBooks"),oe(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ze[t]):(this._type=t,this.name=Ze[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};oe(Ve,"Original",new Ve(Ze.Original)),oe(Ve,"Septuagint",new Ve(Ze.Septuagint)),oe(Ve,"Vulgate",new Ve(Ze.Vulgate)),oe(Ve,"English",new Ve(Ze.English)),oe(Ve,"RussianProtestant",new Ve(Ze.RussianProtestant)),oe(Ve,"RussianOrthodox",new Ve(Ze.RussianOrthodox));let xt=Ve;function ga(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Es=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Es||{});const Pe=class ie{constructor(t,n,r,o){if(oe(this,"firstChapter"),oe(this,"lastChapter"),oe(this,"lastVerse"),oe(this,"hasSegmentsDefined"),oe(this,"text"),oe(this,"BBBCCCVVVS"),oe(this,"longHashCode"),oe(this,"versification"),oe(this,"rtlMark","‏"),oe(this,"_bookNum",0),oe(this,"_chapterNum",0),oe(this,"_verseNum",0),oe(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof xt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof xt?n:void 0;this.setEmpty(s),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof xt?t:ie.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ie(t),{success:!0,verseRef:n}}catch(r){if(r instanceof cn)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new xt(i)),n?new ie(n,r.toString(),l,c):new ie}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return ce.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ce.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ce.lastBook)throw new cn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new xt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new xt(Ze[i])}catch{throw new cn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new cn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ce.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new cn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=ga(this._verse,r);for(const i of s.map(l=>ga(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const f=new ie(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ce.lastBook?2:(ce.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ce.bookIdToNumber(t),this.chapter=n,this.verse=r}};oe(Pe,"defaultVersification",xt.English),oe(Pe,"verseRangeSeparator","-"),oe(Pe,"verseSequenceIndicator",","),oe(Pe,"verseRangeSeparators",[Pe.verseRangeSeparator]),oe(Pe,"verseSequenceIndicators",[Pe.verseSequenceIndicator]),oe(Pe,"chapterDigitShifter",1e3),oe(Pe,"bookDigitShifter",Pe.chapterDigitShifter*Pe.chapterDigitShifter),oe(Pe,"bcvMaxValue",Pe.chapterDigitShifter-1),oe(Pe,"ValidStatusType",Es);class cn extends Error{}const tc=g.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(En,{ref:l,textValue:e,className:k("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:k("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:ce.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function nc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=g.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:k("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:k("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}const vn=ce.allBookIds,rc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ba=["OT","NT","DC"],oc=32+32+32,ac=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],sc=e=>({OT:vn.filter(n=>ce.isBookOT(n)),NT:vn.filter(n=>ce.isBookNT(n)),DC:vn.filter(n=>ce.isBookDC(n))})[e],dn=e=>Q.getChaptersForBook(ce.bookIdToNumber(e));function ic(){return vn.map(t=>ce.bookIdToEnglishName(t))}function lc(e){return ic().includes(e)}function cc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(lc(t))return vn.find(r=>ce.bookIdToEnglishName(r)===t)}function dc({scrRef:e,handleSubmit:t}){const n=Se(),[r,o]=g.useState(""),[s,i]=g.useState(ce.bookNumberToId(e.bookNum)),[l,c]=g.useState(e.chapterNum??0),[d,u]=g.useState(ce.bookNumberToId(e.bookNum)),[f,w]=g.useState(!1),[b,x]=g.useState(f),m=g.useRef(void 0),h=g.useRef(void 0),N=g.useRef(void 0),S=g.useCallback(I=>sc(I).filter(M=>{const H=ce.bookIdToEnglishName(M).toLowerCase(),F=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return H.includes(F)||M.toLowerCase().includes(F)}),[r]),E=I=>{o(I)},j=g.useRef(!1),v=g.useCallback(I=>{if(j.current){j.current=!1;return}w(I)},[]),O=g.useCallback((I,M,H,F)=>{if(c(ce.bookNumberToId(e.bookNum)!==I?1:e.chapterNum),M||dn(I)===-1){t({bookNum:ce.bookIdToNumber(I),chapterNum:H||1,verseNum:F||1}),w(!1),o("");return}i(s!==I?I:""),w(!M)},[t,e.bookNum,e.chapterNum,s]),z=I=>{I<=0||I>dn(s)||O(s,!0,I)},R=g.useCallback(()=>{ac.forEach(I=>{const M=r.match(I);if(M){const[H,F=void 0,B=void 0]=M.slice(1),te=cc(H);(ce.isBookIdValid(H)||te)&&O(te??H,!0,F?parseInt(F,10):1,B?parseInt(B,10):1)}})},[O,r]),_=g.useCallback(I=>{f?(I.key==="ArrowDown"||I.key==="ArrowUp")&&(typeof N<"u"&&N.current!==null?N.current.focus():typeof h<"u"&&h.current!==null&&h.current.focus(),I.preventDefault()):w(!0)},[f]),L=I=>{const{key:M}=I;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:M})),m.current.focus())},$=I=>{const{key:M}=I;if(d===s){if(M==="Enter"){I.preventDefault(),O(s,!0,l);return}const H=M==="ArrowRight"&&!n||M==="ArrowRight"&&n==="ltr"||M==="ArrowLeft"&&n==="rtl",F=M==="ArrowLeft"&&!n||M==="ArrowLeft"&&n==="ltr"||M==="ArrowRight"&&n==="rtl";let B=0;if(H)if(l<dn(d))B=1;else{I.preventDefault();return}else if(F)if(l>1)B=-1;else{I.preventDefault();return}else M==="ArrowDown"?B=6:M==="ArrowUp"&&(B=-6);l+B<=0||l+B>dn(d)?c(0):B!==0&&(c(l+B),I.preventDefault())}};return g.useEffect(()=>{s===d?s===ce.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[d,e.bookNum,e.chapterNum,s]),g.useLayoutEffect(()=>{x(f)},[f]),g.useLayoutEffect(()=>{const I=setTimeout(()=>{if(b&&h.current&&N.current){const H=N.current.offsetTop-oc;h.current.scrollTo({top:H,behavior:"instant"})}},10);return()=>{clearTimeout(I)}},[b]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(Pn,{modal:!1,open:f,onOpenChange:v,children:[a.jsx(ir,{asChild:!0,children:a.jsx(Bl,{ref:m,value:r,handleSearch:E,handleKeyDown:_,handleOnClick:()=>{i(ce.bookNumberToId(e.bookNum)),u(ce.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),w(!0),m.current.focus()},onFocus:()=>{j.current=!0},handleSubmit:R,placeholder:`${ce.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),a.jsx(Jt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:L,align:n==="ltr"?"start":"end",ref:h,children:a.jsx("div",{className:"rtl:tw-ps-2",children:ba.map((I,M)=>S(I).length>0&&a.jsxs("div",{children:[a.jsx(In,{className:"tw-font-semibold tw-text-foreground/80",children:rc[I]}),S(I).map(H=>a.jsx("div",{children:a.jsx(tc,{bookId:H,handleSelectBook:()=>O(H,!1),isSelected:s===H,handleHighlightBook:()=>u(H),handleKeyDown:$,bookType:I,ref:F=>{s===H&&(N.current=F)},children:a.jsx(nc,{handleSelectChapter:z,endChapter:dn(H),activeChapter:e.bookNum===ce.bookIdToNumber(H)?e.chapterNum:0,highlightedChapter:l,handleHighlightedChapter:F=>{c(F)}})})},H)),ba.length-1!==M?a.jsx(Zt,{}):void 0]},I))})})]})})}const Ts=Kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),fe=g.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Wt.Slot:"button";return a.jsx(i,{className:k(Ts({variant:t,size:n,className:e})),ref:s,...o})});fe.displayName="Button";const uc=Kt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),je=g.forwardRef(({className:e,...t},n)=>a.jsx(fs.Root,{ref:n,className:k("pr-twp",uc(),e),...t}));je.displayName=fs.Root.displayName;const fo=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsx(jn.Root,{className:k("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:r})});fo.displayName=jn.Root.displayName;const Jn=g.forwardRef(({className:e,...t},n)=>a.jsx(jn.Item,{ref:n,className:k("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(jn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(Y.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Jn.displayName=jn.Item.displayName;const Cs=Sn.Root,Rs=Sn.Trigger,mo=g.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>{const s=Se();return a.jsx(Sn.Portal,{children:a.jsx(Sn.Content,{ref:o,align:t,sideOffset:n,className:k("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,dir:s})})});mo.displayName=Sn.Content.displayName;const pc=et.Portal,Os=g.forwardRef(({className:e,...t},n)=>a.jsx(et.Overlay,{ref:n,className:k("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Os.displayName=et.Overlay.displayName;const wc=g.forwardRef(({className:e,children:t,...n},r)=>{const o=Se();return a.jsxs(pc,{children:[a.jsx(Os,{}),a.jsxs(et.Content,{ref:r,className:k("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:o,children:[t,a.jsxs(et.Close,{className:k("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[a.jsx(Y.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});wc.displayName=et.Content.displayName;const fc=g.forwardRef(({className:e,...t},n)=>a.jsx(et.Title,{ref:n,className:k("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));fc.displayName=et.Title.displayName;const mc=g.forwardRef(({className:e,...t},n)=>a.jsx(et.Description,{ref:n,className:k("tw-text-sm tw-text-muted-foreground",e),...t}));mc.displayName=et.Description.displayName;const ho=g.forwardRef(({className:e,...t},n)=>a.jsx(Ae.Command,{ref:n,className:k("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));ho.displayName=Ae.Command.displayName;const go=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[a.jsx(Y.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Ae.Command.Input,{ref:n,className:k("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});go.displayName=Ae.Command.Input.displayName;const bo=g.forwardRef(({className:e,...t},n)=>a.jsx(Ae.Command.List,{ref:n,className:k("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));bo.displayName=Ae.Command.List.displayName;const vo=g.forwardRef((e,t)=>a.jsx(Ae.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));vo.displayName=Ae.Command.Empty.displayName;const _s=g.forwardRef(({className:e,...t},n)=>a.jsx(Ae.Command.Group,{ref:n,className:k("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));_s.displayName=Ae.Command.Group.displayName;const hc=g.forwardRef(({className:e,...t},n)=>a.jsx(Ae.Command.Separator,{ref:n,className:k("tw--mx-1 tw-h-px tw-bg-border",e),...t}));hc.displayName=Ae.Command.Separator.displayName;const xo=g.forwardRef(({className:e,...t},n)=>a.jsx(Ae.Command.Item,{ref:n,className:k("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));xo.displayName=Ae.Command.Item.displayName;function gc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Zn({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=gc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:w="outline",alignDropDown:b="start",isDisabled:x=!1,...m}){const[h,N]=g.useState(!1);return a.jsxs(Cs,{open:h,onOpenChange:N,...m,children:[a.jsx(Rs,{asChild:!0,children:a.jsxs(fe,{variant:w,role:"combobox","aria-expanded":h,id:e,className:k("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pe-2",children:c}),a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),a.jsx(Y.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(mo,{align:b,className:k("tw-w-[200px] tw-p-0",o),children:a.jsxs(ho,{children:[a.jsx(go,{placeholder:u,className:"tw-text-inherit"}),a.jsx(vo,{children:f}),a.jsx(bo,{children:t.map(S=>a.jsxs(xo,{value:l(S),onSelect:()=>{i(S),N(!1)},children:[a.jsx(Y.Check,{className:k("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(S)})}),l(S)]},l(S)))})]})})]})}function Ps({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=g.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return a.jsxs(a.Fragment,{children:[a.jsx(je,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(Zn,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),a.jsx(je,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(Zn,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var Is=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Is||{});const bc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Pr=(e,t)=>e[t]??t;function vc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=Pr(d,"%webView_bookSelector_currentBook%"),f=Pr(d,"%webView_bookSelector_choose%"),w=Pr(d,"%webView_bookSelector_chooseBooks%"),[b,x]=g.useState("current book"),m=h=>{x(h),e(h)};return a.jsx(fo,{className:"pr-twp tw-flex",value:b,onValueChange:h=>m(h),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Jn,{value:"current book"}),a.jsx(je,{className:"tw-ms-1",children:u})]}),a.jsx(je,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Ps,{isDisabled:b==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Jn,{value:"choose books"}),a.jsx(je,{className:"tw-ms-1",children:w})]}),a.jsx(je,{className:"tw-flex tw-items-center",children:r.map(h=>ce.bookIdToEnglishName(h)).join(", ")}),a.jsx(fe,{disabled:b==="current book",onClick:()=>n(),children:f})]})]})})}function xc({table:e}){return a.jsxs(Pn,{children:[a.jsx(ps.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(fe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(Y.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(Jt,{align:"end",className:"tw-w-[150px]",children:[a.jsx(In,{children:"Toggle columns"}),a.jsx(Zt,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(lr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const Tt=ve.Root,Ms=ve.Group,Ct=ve.Value,ft=g.forwardRef(({className:e,children:t,...n},r)=>{const o=Se();return a.jsxs(ve.Trigger,{ref:r,className:k("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,dir:o,children:[t,a.jsx(ve.Icon,{asChild:!0,children:a.jsx(Y.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});ft.displayName=ve.Trigger.displayName;const yo=g.forwardRef(({className:e,...t},n)=>a.jsx(ve.ScrollUpButton,{ref:n,className:k("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(Y.ChevronUp,{className:"tw-h-4 tw-w-4"})}));yo.displayName=ve.ScrollUpButton.displayName;const No=g.forwardRef(({className:e,...t},n)=>a.jsx(ve.ScrollDownButton,{ref:n,className:k("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(Y.ChevronDown,{className:"tw-h-4 tw-w-4"})}));No.displayName=ve.ScrollDownButton.displayName;const mt=g.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>{const s=Se();return a.jsx(ve.Portal,{children:a.jsxs(ve.Content,{ref:o,className:k("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(yo,{}),a.jsx(ve.Viewport,{className:k("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:a.jsx("div",{dir:s,children:t})}),a.jsx(No,{})]})})});mt.displayName=ve.Content.displayName;const $s=g.forwardRef(({className:e,...t},n)=>a.jsx(ve.Label,{ref:n,className:k("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));$s.displayName=ve.Label.displayName;const ze=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ve.Item,{ref:r,className:k("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(ve.ItemIndicator,{children:a.jsx(Y.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(ve.ItemText,{children:t})]}));ze.displayName=ve.Item.displayName;const As=g.forwardRef(({className:e,...t},n)=>a.jsx(ve.Separator,{ref:n,className:k("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));As.displayName=ve.Separator.displayName;function yc({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(Tt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(ft,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Ct,{placeholder:e.getState().pagination.pageSize})}),a.jsx(mt,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx(ze,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(fe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(Y.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(fe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(Y.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(fe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(Y.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(fe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(Y.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const en=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:k("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:k("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));en.displayName="Table";const tn=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:k({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));tn.displayName="TableHeader";const nn=g.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:k("[&_tr:last-child]:tw-border-0",e),...t}));nn.displayName="TableBody";const Ds=g.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:k("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Ds.displayName="TableFooter";const Ke=g.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:k("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Ke.displayName="TableRow";const st=g.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:k("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));st.displayName="TableHead";const Ie=g.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:k("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ie.displayName="TableCell";const Bs=g.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:k("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Bs.displayName="TableCaption";function Vs({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var h;const[l,c]=g.useState([]),[d,u]=g.useState([]),[f,w]=g.useState({}),[b,x]=g.useState({}),m=_e.useReactTable({data:t,columns:e,getCoreRowModel:_e.getCoreRowModel(),...n&&{getPaginationRowModel:_e.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:_e.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:_e.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:f,rowSelection:b}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(xc,{table:m}),a.jsxs(en,{stickyHeader:s,children:[a.jsx(tn,{stickyHeader:s,children:m.getHeaderGroups().map(N=>a.jsx(Ke,{children:N.headers.map(S=>a.jsx(st,{children:S.isPlaceholder?void 0:_e.flexRender(S.column.columnDef.header,S.getContext())},S.id))},N.id))}),a.jsx(nn,{children:(h=m.getRowModel().rows)!=null&&h.length?m.getRowModel().rows.map(N=>a.jsx(Ke,{onClick:()=>i(N,m),"data-state":N.getIsSelected()&&"selected",children:N.getVisibleCells().map(S=>a.jsx(Ie,{children:_e.flexRender(S.column.columnDef.cell,S.getContext())},S.id))},N.id)):a.jsx(Ke,{children:a.jsx(Ie,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(fe,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),a.jsx(fe,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(yc,{table:m})]})}function Nc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=g.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>Q.deepEqual(c,l))||i.push(l)}),i},[e]);return a.jsxs(en,{stickyHeader:!0,children:[a.jsx(tn,{stickyHeader:!0,children:a.jsxs(Ke,{children:[a.jsx(st,{children:r}),a.jsx(st,{children:o})]})}),a.jsx(nn,{children:s.length>0&&s.map(i=>a.jsxs(Ke,{onClick:()=>{t(i.reference)},children:[a.jsx(Ie,{children:`${ce.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(Ie,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const cr=g.forwardRef(({className:e,...t},n)=>a.jsx(Xr.Root,{ref:n,className:k("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(Xr.Indicator,{className:k("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(Y.Check,{className:"tw-h-4 tw-w-4"})})}));cr.displayName=Xr.Root.displayName;const zs=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Wr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Ls=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?ce.bookIdToNumber(t[1]):0},Fs=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Gs=Kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),kc=g.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(ms.Root,{ref:o,className:k(Gs({variant:t,size:n,className:e})),...r}));kc.displayName=ms.Root.displayName;const Us=g.createContext({size:"default",variant:"default"}),ko=g.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>{const i=Se();return a.jsx(sr.Root,{ref:s,className:k("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,dir:i,children:a.jsx(Us.Provider,{value:{variant:t,size:n},children:r})})});ko.displayName=sr.Root.displayName;const xn=g.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=g.useContext(Us);return a.jsx(sr.Item,{ref:s,className:k(Gs({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});xn.displayName=sr.Item.displayName;const dr=e=>e==="asc"?a.jsx(Y.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(Y.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(Y.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),jc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>a.jsxs(fe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dr(t.getIsSorted())]})}),Sc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>a.jsxs(fe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,dr(n.getIsSorted())]})}),Ec=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(fe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dr(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Ir=(e,t,n,r,o,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Tc=(e,t,n,r,o)=>({accessorKey:"status",header:({column:s})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(fe,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[e,dr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return a.jsxs(ko,{value:i,variant:"outline",type:"single",children:[a.jsx(xn,{onClick:()=>Ir([l],"approved",t,n,r,o),value:"approved",children:a.jsx(Y.CircleCheckIcon,{})}),a.jsx(xn,{onClick:()=>Ir([l],"unapproved",t,n,r,o),value:"unapproved",children:a.jsx(Y.CircleXIcon,{})}),a.jsx(xn,{onClick:()=>Ir([l],"unknown",t,n,r,o),value:"unknown",children:a.jsx(Y.CircleHelpIcon,{})})]})}}),Cc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Rc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Oc=(e,t,n,r,o)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return zs(e).forEach(u=>{u.startsWith("\\id")&&(i=Ls(u),l=0,c=0),u.startsWith("\\c")&&(l=Wr(u),c=0),u.startsWith("\\v")&&(c=Wr(u),l===0&&(l=t.chapterNum));let f=o.exec(u)??void 0;for(;f;){const w=[];f.forEach(h=>w.push(h));const b=f.index,x=s.find(h=>Q.deepEqual(h.items,w)),m={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:Q.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(x)x.count+=1,x.occurrences.push(m);else{const h={items:w,count:1,status:Fs(w[0],n,r),occurrences:[m]};s.push(h)}f=o.exec(u)??void 0}}),s},at=(e,t)=>e[t]??t;function _c({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const f=at(n,"%webView_inventory_all%"),w=at(n,"%webView_inventory_approved%"),b=at(n,"%webView_inventory_unapproved%"),x=at(n,"%webView_inventory_unknown%"),m=at(n,"%webView_inventory_scope_currentBook%"),h=at(n,"%webView_inventory_scope_chapter%"),N=at(n,"%webView_inventory_scope_verse%"),S=at(n,"%webView_inventory_filter_text%"),E=at(n,"%webView_inventory_show_additional_items%"),[j,v]=g.useState(!1),[O,z]=g.useState("all"),[R,_]=g.useState(""),[L,$]=g.useState([]),I=g.useMemo(()=>l?r instanceof RegExp?Oc(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),M=g.useMemo(()=>{if(j)return I;const y=[];return I.forEach(T=>{const G=T.items[0],U=y.find(V=>V.items[0]===G);U?(U.count+=T.count,U.occurrences=U.occurrences.concat(T.occurrences)):y.push({items:[G],count:T.count,occurrences:T.occurrences,status:T.status})}),y},[j,I]),H=g.useMemo(()=>Rc(M,O,R),[M,O,R]),F=g.useMemo(()=>{var G,U;if(!j)return u;const y=(G=o==null?void 0:o.tableHeaders)==null?void 0:G.length;if(!y)return u;const T=[];for(let V=0;V<y;V++)T.push(Sc(((U=o==null?void 0:o.tableHeaders)==null?void 0:U[V])||"Additional Item",V+1));return[...T,...u]},[o==null?void 0:o.tableHeaders,u,j]);g.useEffect(()=>{$([])},[H]);const B=(y,T)=>{T.setRowSelection(()=>{const G={};return G[y.index]=!0,G}),$(y.original.items)},te=y=>{if(y==="book"||y==="chapter"||y==="verse")d(y);else throw new Error(`Invalid scope value: ${y}`)},ae=y=>{if(y==="all"||y==="approved"||y==="unapproved"||y==="unknown")z(y);else throw new Error(`Invalid status filter value: ${y}`)},se=g.useMemo(()=>{if(M.length===0||L.length===0)return[];const y=M.filter(T=>Q.deepEqual(j?T.items:[T.items[0]],L));if(y.length>1)throw new Error("Selected item is not unique");return y[0].occurrences},[L,j,M]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(Tt,{onValueChange:y=>ae(y),defaultValue:O,children:[a.jsx(ft,{className:"tw-m-1",children:a.jsx(Ct,{placeholder:"Select filter"})}),a.jsxs(mt,{children:[a.jsx(ze,{value:"all",children:f}),a.jsx(ze,{value:"approved",children:w}),a.jsx(ze,{value:"unapproved",children:b}),a.jsx(ze,{value:"unknown",children:x})]})]}),a.jsxs(Tt,{onValueChange:y=>te(y),defaultValue:c,children:[a.jsx(ft,{className:"tw-m-1",children:a.jsx(Ct,{placeholder:"Select scope"})}),a.jsxs(mt,{children:[a.jsx(ze,{value:"book",children:m}),a.jsx(ze,{value:"chapter",children:h}),a.jsx(ze,{value:"verse",children:N})]})]}),a.jsx(Pt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:R,onChange:y=>{_(y.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(cr,{className:"tw-m-1",checked:j,onCheckedChange:y=>{$([]),v(y)}}),a.jsx(je,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??E})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Vs,{columns:F,data:H,onRowClickHandler:B,stickyHeader:!0})}),se.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Nc,{occurrenceData:se,setScriptureReference:t,localizedStrings:n})})]})}function qs({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,f]=g.useState(!1),w=g.useCallback(m=>{var N;const h=(N=e.find(S=>S.label===m))==null?void 0:N.value;h&&r(n.includes(h)?n.filter(S=>S!==h):[...n,h])},[e,n,r]),b=()=>i||o,x=g.useMemo(()=>{if(!l)return e;const m=e.filter(N=>N.starred).sort((N,S)=>N.label.localeCompare(S.label)),h=e.filter(N=>!N.starred).sort((N,S)=>{const E=n.includes(N.value),j=n.includes(S.value);return E&&!j?-1:!E&&j?1:N.label.localeCompare(S.label)});return[...m,...h]},[e,n,l]);return a.jsx("div",{className:d,children:a.jsxs(Cs,{open:u,onOpenChange:f,children:[a.jsx(Rs,{asChild:!0,children:a.jsxs(fe,{variant:"ghost",role:"combobox","aria-expanded":u,className:k("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:k({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:a.jsx("div",{className:"tw-font-normal",children:b()})})]}),a.jsx(Y.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(mo,{align:"start",className:"tw-w-full tw-p-0",children:a.jsxs(ho,{children:[a.jsx(go,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(bo,{children:[a.jsx(vo,{children:s}),a.jsx(_s,{children:x.map(m=>{const h=t?t(m):void 0;return a.jsxs(xo,{value:m.label,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(Y.Check,{className:k("tw-h-4 tw-w-4",n.includes(m.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:m.starred&&a.jsx(Y.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:m.label}),t&&a.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:h})]},m.label)})})]})]})})]})})}function ur({onSearch:e,placeholder:t,isFullWidth:n,className:r}){const[o,s]=g.useState(""),i=c=>{s(c),e(c)},l=Se();return a.jsxs("div",{className:k("tw-relative",{"tw-w-full":n},r),children:[a.jsx(Y.Search,{className:k("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),a.jsx(Pt,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:t,value:o,onChange:c=>i(c.target.value)}),o&&a.jsxs(fe,{variant:"ghost",size:"icon",className:k("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{i("")},children:[a.jsx(Y.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const jo=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsx(De.Root,{orientation:"vertical",ref:n,className:k("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:r})});jo.displayName=De.List.displayName;const So=g.forwardRef(({className:e,...t},n)=>a.jsx(De.List,{ref:n,className:k("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));So.displayName=De.List.displayName;const Hs=g.forwardRef(({className:e,...t},n)=>a.jsx(De.Trigger,{ref:n,...t,className:k("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),Eo=g.forwardRef(({className:e,...t},n)=>a.jsx(De.Content,{ref:n,className:k("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Eo.displayName=De.Content.displayName;function Pc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,searchClassName:o}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?a.jsx("h1",{children:r}):"",a.jsx(ur,{className:o,onSearch:t,placeholder:n})]}),a.jsxs(jo,{children:[a.jsx(So,{children:e.map(s=>a.jsx(Hs,{value:s.value,children:s.value},s.key))}),e.map(s=>a.jsx(Eo,{value:s.value,children:s.content},s.key))]})]})}const pr=g.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(hs.Root,{ref:o,decorative:n,orientation:t,className:k("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));pr.displayName=hs.Root.displayName;function va({className:e,...t}){return a.jsx("div",{className:k("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const Ic=_n.Provider,Mc=_n.Root,$c=_n.Trigger,Xs=g.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(_n.Content,{ref:r,sideOffset:t,className:k("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Xs.displayName=_n.Content.displayName;const Ac="16rem",Dc="3rem",Ys=g.createContext(void 0);function wr(){const e=g.useContext(Ys);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Ws=g.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...l},c)=>{const[d,u]=g.useState(e),f=t??d,w=g.useCallback(E=>{const j=typeof E=="function"?E(f):E;n?n(j):u(j)},[n,f]),b=g.useCallback(()=>w(E=>!E),[w]),x=f?"expanded":"collapsed",N=Se()==="ltr"?i:i==="primary"?"secondary":"primary",S=g.useMemo(()=>({state:x,open:f,setOpen:w,toggleSidebar:b,side:N}),[x,f,w,b,N]);return a.jsx(Ys.Provider,{value:S,children:a.jsx(Ic,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Ac,"--sidebar-width-icon":Dc,...o},className:k("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});Ws.displayName="SidebarProvider";const Ks=g.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:r,...o},s)=>{const i=wr();return t==="none"?a.jsx("div",{className:k("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):a.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[a.jsx("div",{className:k("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:k("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Ks.displayName="Sidebar";const Bc=g.forwardRef(({className:e,onClick:t,...n},r)=>{const o=wr();return a.jsxs(fe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:k("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),o.toggleSidebar()},...n,children:[o.side==="primary"?a.jsx(Y.PanelLeft,{}):a.jsx(Y.PanelRight,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Bc.displayName="SidebarTrigger";const Vc=g.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=wr();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:k("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Vc.displayName="SidebarRail";const Js=g.forwardRef(({className:e,...t},n)=>a.jsx("main",{ref:n,className:k("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));Js.displayName="SidebarInset";const zc=g.forwardRef(({className:e,...t},n)=>a.jsx(Pt,{ref:n,"data-sidebar":"input",className:k("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));zc.displayName="SidebarInput";const Lc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:k("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Lc.displayName="SidebarHeader";const Fc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:k("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Fc.displayName="SidebarFooter";const Gc=g.forwardRef(({className:e,...t},n)=>a.jsx(pr,{ref:n,"data-sidebar":"separator",className:k("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));Gc.displayName="SidebarSeparator";const Zs=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:k("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));Zs.displayName="SidebarContent";const Kr=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:k("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));Kr.displayName="SidebarGroup";const Jr=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Wt.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:k("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});Jr.displayName="SidebarGroupLabel";const Uc=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Wt.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:k("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});Uc.displayName="SidebarGroupAction";const Zr=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:k("tw-w-full tw-text-sm",e),...t}));Zr.displayName="SidebarGroupContent";const Qs=g.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:k("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));Qs.displayName="SidebarMenu";const ei=g.forwardRef(({className:e,...t},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:k("tw-group/menu-item tw-relative",e),...t}));ei.displayName="SidebarMenuItem";const qc=Kt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),ti=g.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=e?Wt.Slot:"button",{state:d}=wr(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:k(qc({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(Mc,{children:[a.jsx($c,{asChild:!0,children:u}),a.jsx(Xs,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});ti.displayName="SidebarMenuButton";const Hc=g.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},o)=>{const s=t?Wt.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:k("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});Hc.displayName="SidebarMenuAction";const Xc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:k("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Xc.displayName="SidebarMenuBadge";const Yc=g.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const o=g.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:k("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&a.jsx(va,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(va,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Yc.displayName="SidebarMenuSkeleton";const Wc=g.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:k("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Wc.displayName="SidebarMenuSub";const Kc=g.forwardRef(({...e},t)=>a.jsx("li",{ref:t,...e}));Kc.displayName="SidebarMenuSubItem";const Jc=g.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...o},s)=>{const i=e?Wt.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:k("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});Jc.displayName="SidebarMenuSubButton";function ni({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=g.useCallback((f,w)=>{r(f,w)},[r]),d=g.useCallback(f=>{const w=n.find(b=>b.projectId===f);return w?w.projectName:f},[n]),u=g.useCallback(f=>!o.projectId&&f===o.label,[o]);return a.jsx(Ks,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:a.jsxs(Zs,{children:[a.jsxs(Kr,{children:[a.jsx(Jr,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(Zr,{children:a.jsx(Qs,{children:t.map(f=>a.jsx(ei,{children:a.jsx(ti,{className:k("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(f)}),onClick:()=>c(f),isActive:u(f),children:a.jsx("span",{className:"tw-pl-3",children:f})})},f))})})]}),a.jsxs(Kr,{children:[a.jsx(Jr,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(Zr,{className:"tw-pl-3",children:a.jsx(Zn,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:f=>d(f),buttonPlaceholder:l,onChange:f=>{const w=d(f);c(w,f)},value:(o==null?void 0:o.projectId)??void 0})})]})]})})}function Zc({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,onSearch:i,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(ur,{className:"tw-w-9/12",onSearch:i,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(Ws,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[a.jsx(ni,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}),a.jsx(Js,{className:"tw-overflow-y-auto",children:r})]})]})}const ut="scrBook",Qc="scrRef",yt="source",ed="details",td="Scripture Reference",nd="Scripture Book",ri="Type",rd="Details";function od(e,t){const n=t??!1;return[{accessorFn:r=>`${ce.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:ut,header:(e==null?void 0:e.scriptureReferenceColumnName)??td,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ce.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===ut?Q.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Q.formatScrRef(r.start),id:Qc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Q.formatScrRef(o.start)},sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:yt,header:n?(e==null?void 0:e.typeColumnName)??ri:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:ed,header:(e==null?void 0:e.detailsColumnName)??rd,cell:r=>r.getValue(),enableGrouping:!1}]}const ad=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||Q.compareScrRefs(e.start,e.end)===0?`${Q.scrRefToBBBCCCVVV(e.start)}+${t}`:`${Q.scrRefToBBBCCCVVV(e.start)}+${t}-${Q.scrRefToBBBCCCVVV(e.end)}+${n}`},xa=e=>`${ad({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function sd({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l}){const[c,d]=g.useState([]),[u,f]=g.useState([{id:ut,desc:!1}]),[w,b]=g.useState({}),x=g.useMemo(()=>e.flatMap(R=>R.data.map(_=>({..._,source:R.source}))),[e]),m=g.useMemo(()=>od({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);g.useEffect(()=>{c.includes(yt)?f([{id:yt,desc:!1},{id:ut,desc:!1}]):f([{id:ut,desc:!1}])},[c]);const h=_e.useReactTable({data:x,columns:m,state:{grouping:c,sorting:u,rowSelection:w},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:_e.getExpandedRowModel(),getGroupedRowModel:_e.getGroupedRowModel(),getCoreRowModel:_e.getCoreRowModel(),getSortedRowModel:_e.getSortedRowModel(),getRowId:xa,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});g.useEffect(()=>{if(l){const R=h.getSelectedRowModel().rowsById,_=Object.keys(R);if(_.length===1){const L=x.find($=>xa($)===_[0])||void 0;L&&l(L)}}},[w,x,l,h]);const N=o??nd,S=s??ri,E=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[ut]},{label:`Group by ${S}`,value:[yt]},{label:`Group by ${N} and ${S}`,value:[ut,yt]},{label:`Group by ${S} and ${N}`,value:[yt,ut]}],j=R=>{d(JSON.parse(R))},v=(R,_)=>{!R.getIsGrouped()&&!R.getIsSelected()&&R.getToggleSelectedHandler()(_)},O=(R,_)=>R.getIsGrouped()?"":k("banded-row",_%2===0?"even":"odd"),z=(R,_,L)=>{if(!((R==null?void 0:R.length)===0||_.depth<L.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(Tt,{value:JSON.stringify(c),onValueChange:R=>{j(R)},children:[a.jsx(ft,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Ct,{})}),a.jsx(mt,{position:"item-aligned",children:a.jsx(Ms,{children:E.map(R=>a.jsx(ze,{value:JSON.stringify(R.value),children:R.label},R.label))})})]}),a.jsxs(en,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(tn,{children:h.getHeaderGroups().map(R=>a.jsx(Ke,{children:R.headers.filter(_=>_.column.columnDef.header).map(_=>a.jsx(st,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:a.jsxs("div",{children:[_.column.getCanGroup()?a.jsx(fe,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",_e.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},R.id))}),a.jsx(nn,{children:h.getRowModel().rows.map((R,_)=>{const L=Se();return a.jsx(Ke,{"data-state":R.getIsSelected()?"selected":"",className:k(O(R,_)),onClick:$=>v(R,$),children:R.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==yt||!n)))return a.jsx(Ie,{className:k($.column.columnDef.id,"tw-p-[1px]",z(c,R,$)),children:(()=>$.getIsGrouped()?a.jsxs(fe,{variant:"link",onClick:R.getToggleExpandedHandler(),type:"button",children:[R.getIsExpanded()&&a.jsx(Y.ChevronDown,{}),!R.getIsExpanded()&&(L==="ltr"?a.jsx(Y.ChevronRight,{}):a.jsx(Y.ChevronLeft,{}))," ",_e.flexRender($.column.columnDef.cell,$.getContext())," (",R.subRows.length,")"]}):_e.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},R.id)})})]})]})}const Mr={[Q.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[Q.getLocalizeKeyForScrollGroupId(0)]:"A",[Q.getLocalizeKeyForScrollGroupId(1)]:"B",[Q.getLocalizeKeyForScrollGroupId(2)]:"C",[Q.getLocalizeKeyForScrollGroupId(3)]:"D",[Q.getLocalizeKeyForScrollGroupId(4)]:"E",[Q.getLocalizeKeyForScrollGroupId(5)]:"F",[Q.getLocalizeKeyForScrollGroupId(6)]:"G",[Q.getLocalizeKeyForScrollGroupId(7)]:"H",[Q.getLocalizeKeyForScrollGroupId(8)]:"I",[Q.getLocalizeKeyForScrollGroupId(9)]:"J",[Q.getLocalizeKeyForScrollGroupId(10)]:"K",[Q.getLocalizeKeyForScrollGroupId(11)]:"L",[Q.getLocalizeKeyForScrollGroupId(12)]:"M",[Q.getLocalizeKeyForScrollGroupId(13)]:"N",[Q.getLocalizeKeyForScrollGroupId(14)]:"O",[Q.getLocalizeKeyForScrollGroupId(15)]:"P",[Q.getLocalizeKeyForScrollGroupId(16)]:"Q",[Q.getLocalizeKeyForScrollGroupId(17)]:"R",[Q.getLocalizeKeyForScrollGroupId(18)]:"S",[Q.getLocalizeKeyForScrollGroupId(19)]:"T",[Q.getLocalizeKeyForScrollGroupId(20)]:"U",[Q.getLocalizeKeyForScrollGroupId(21)]:"V",[Q.getLocalizeKeyForScrollGroupId(22)]:"W",[Q.getLocalizeKeyForScrollGroupId(23)]:"X",[Q.getLocalizeKeyForScrollGroupId(24)]:"Y",[Q.getLocalizeKeyForScrollGroupId(25)]:"Z"};function id({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={...Mr,...Object.fromEntries(Object.entries(r).map(([i,l])=>[i,i===l&&i in Mr?Mr[i]:l]))},s=Se();return a.jsxs(Tt,{value:`${t}`,onValueChange:i=>n(i==="undefined"?void 0:parseInt(i,10)),children:[a.jsx(ft,{className:"pr-twp tw-w-auto",children:a.jsx(Ct,{placeholder:o[Q.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(mt,{align:s==="rtl"?"end":"start",style:{zIndex:250},children:e.map(i=>a.jsx(ze,{value:`${i}`,children:o[Q.getLocalizeKeyForScrollGroupId(i)]},`${i}`))})]})}function ld({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function cd({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function dd({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(pr,{}):""]})}function ud({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(cr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(je,{children:s?s(i):i})]},i))})}function pd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function wd(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var To={},oi={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(oi);var fd=oi.exports,$r={};function Co(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function jt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ai(e){if(!jt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ai(e[n])}),t}function it(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return jt(e)&&jt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(jt(t[o])&&o in e&&jt(e[o])?r[o]=it(e[o],t[o],n):n.clone?r[o]=jt(t[o])?ai(t[o]):t[o]:r[o]=t[o])}),r}var Qr={exports:{}},Gn={exports:{}},de={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ya;function md(){if(ya)return de;ya=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(v){if(typeof v=="object"&&v!==null){var O=v.$$typeof;switch(O){case t:switch(v=v.type,v){case c:case d:case r:case s:case o:case f:return v;default:switch(v=v&&v.$$typeof,v){case l:case u:case x:case b:case i:return v;default:return O}}case n:return O}}}function j(v){return E(v)===d}return de.AsyncMode=c,de.ConcurrentMode=d,de.ContextConsumer=l,de.ContextProvider=i,de.Element=t,de.ForwardRef=u,de.Fragment=r,de.Lazy=x,de.Memo=b,de.Portal=n,de.Profiler=s,de.StrictMode=o,de.Suspense=f,de.isAsyncMode=function(v){return j(v)||E(v)===c},de.isConcurrentMode=j,de.isContextConsumer=function(v){return E(v)===l},de.isContextProvider=function(v){return E(v)===i},de.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},de.isForwardRef=function(v){return E(v)===u},de.isFragment=function(v){return E(v)===r},de.isLazy=function(v){return E(v)===x},de.isMemo=function(v){return E(v)===b},de.isPortal=function(v){return E(v)===n},de.isProfiler=function(v){return E(v)===s},de.isStrictMode=function(v){return E(v)===o},de.isSuspense=function(v){return E(v)===f},de.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===d||v===s||v===o||v===f||v===w||typeof v=="object"&&v!==null&&(v.$$typeof===x||v.$$typeof===b||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===h||v.$$typeof===N||v.$$typeof===S||v.$$typeof===m)},de.typeOf=E,de}var ue={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Na;function hd(){return Na||(Na=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(C){return typeof C=="string"||typeof C=="function"||C===r||C===d||C===s||C===o||C===f||C===w||typeof C=="object"&&C!==null&&(C.$$typeof===x||C.$$typeof===b||C.$$typeof===i||C.$$typeof===l||C.$$typeof===u||C.$$typeof===h||C.$$typeof===N||C.$$typeof===S||C.$$typeof===m)}function j(C){if(typeof C=="object"&&C!==null){var ke=C.$$typeof;switch(ke){case t:var D=C.type;switch(D){case c:case d:case r:case s:case o:case f:return D;default:var xe=D&&D.$$typeof;switch(xe){case l:case u:case x:case b:case i:return xe;default:return ke}}case n:return ke}}}var v=c,O=d,z=l,R=i,_=t,L=u,$=r,I=x,M=b,H=n,F=s,B=o,te=f,ae=!1;function se(C){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),y(C)||j(C)===c}function y(C){return j(C)===d}function T(C){return j(C)===l}function G(C){return j(C)===i}function U(C){return typeof C=="object"&&C!==null&&C.$$typeof===t}function V(C){return j(C)===u}function W(C){return j(C)===r}function X(C){return j(C)===x}function K(C){return j(C)===b}function q(C){return j(C)===n}function Z(C){return j(C)===s}function ee(C){return j(C)===o}function le(C){return j(C)===f}ue.AsyncMode=v,ue.ConcurrentMode=O,ue.ContextConsumer=z,ue.ContextProvider=R,ue.Element=_,ue.ForwardRef=L,ue.Fragment=$,ue.Lazy=I,ue.Memo=M,ue.Portal=H,ue.Profiler=F,ue.StrictMode=B,ue.Suspense=te,ue.isAsyncMode=se,ue.isConcurrentMode=y,ue.isContextConsumer=T,ue.isContextProvider=G,ue.isElement=U,ue.isForwardRef=V,ue.isFragment=W,ue.isLazy=X,ue.isMemo=K,ue.isPortal=q,ue.isProfiler=Z,ue.isStrictMode=ee,ue.isSuspense=le,ue.isValidElementType=E,ue.typeOf=j}()),ue}var ka;function si(){return ka||(ka=1,process.env.NODE_ENV==="production"?Gn.exports=md():Gn.exports=hd()),Gn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Ar,ja;function gd(){if(ja)return Ar;ja=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Ar=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Ar}var Dr,Sa;function Ro(){if(Sa)return Dr;Sa=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Dr=e,Dr}var Br,Ea;function ii(){return Ea||(Ea=1,Br=Function.call.bind(Object.prototype.hasOwnProperty)),Br}var Vr,Ta;function bd(){if(Ta)return Vr;Ta=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Ro(),n={},r=ii();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var f;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}f=s[u](i,u,c,l,null,t)}catch(x){f=x}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Vr=o,Vr}var zr,Ca;function vd(){if(Ca)return zr;Ca=1;var e=si(),t=gd(),n=Ro(),r=ii(),o=bd(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return zr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(y){var T=y&&(d&&y[d]||y[u]);if(typeof T=="function")return T}var w="<<anonymous>>",b={array:N("array"),bigint:N("bigint"),bool:N("boolean"),func:N("function"),number:N("number"),object:N("object"),string:N("string"),symbol:N("symbol"),any:S(),arrayOf:E,element:j(),elementType:v(),instanceOf:O,node:L(),objectOf:R,oneOf:z,oneOfType:_,shape:I,exact:M};function x(y,T){return y===T?y!==0||1/y===1/T:y!==y&&T!==T}function m(y,T){this.message=y,this.data=T&&typeof T=="object"?T:{},this.stack=""}m.prototype=Error.prototype;function h(y){if(process.env.NODE_ENV!=="production")var T={},G=0;function U(W,X,K,q,Z,ee,le){if(q=q||w,ee=ee||K,le!==n){if(c){var C=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw C.name="Invariant Violation",C}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ke=q+":"+K;!T[ke]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+ee+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),T[ke]=!0,G++)}}return X[K]==null?W?X[K]===null?new m("The "+Z+" `"+ee+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new m("The "+Z+" `"+ee+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:y(X,K,q,Z,ee)}var V=U.bind(null,!1);return V.isRequired=U.bind(null,!0),V}function N(y){function T(G,U,V,W,X,K){var q=G[U],Z=B(q);if(Z!==y){var ee=te(q);return new m("Invalid "+W+" `"+X+"` of type "+("`"+ee+"` supplied to `"+V+"`, expected ")+("`"+y+"`."),{expectedType:y})}return null}return h(T)}function S(){return h(i)}function E(y){function T(G,U,V,W,X){if(typeof y!="function")return new m("Property `"+X+"` of component `"+V+"` has invalid PropType notation inside arrayOf.");var K=G[U];if(!Array.isArray(K)){var q=B(K);return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+V+"`, expected an array."))}for(var Z=0;Z<K.length;Z++){var ee=y(K,Z,V,W,X+"["+Z+"]",n);if(ee instanceof Error)return ee}return null}return h(T)}function j(){function y(T,G,U,V,W){var X=T[G];if(!l(X)){var K=B(X);return new m("Invalid "+V+" `"+W+"` of type "+("`"+K+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return h(y)}function v(){function y(T,G,U,V,W){var X=T[G];if(!e.isValidElementType(X)){var K=B(X);return new m("Invalid "+V+" `"+W+"` of type "+("`"+K+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return h(y)}function O(y){function T(G,U,V,W,X){if(!(G[U]instanceof y)){var K=y.name||w,q=se(G[U]);return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+V+"`, expected ")+("instance of `"+K+"`."))}return null}return h(T)}function z(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function T(G,U,V,W,X){for(var K=G[U],q=0;q<y.length;q++)if(x(K,y[q]))return null;var Z=JSON.stringify(y,function(le,C){var ke=te(C);return ke==="symbol"?String(C):C});return new m("Invalid "+W+" `"+X+"` of value `"+String(K)+"` "+("supplied to `"+V+"`, expected one of "+Z+"."))}return h(T)}function R(y){function T(G,U,V,W,X){if(typeof y!="function")return new m("Property `"+X+"` of component `"+V+"` has invalid PropType notation inside objectOf.");var K=G[U],q=B(K);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type "+("`"+q+"` supplied to `"+V+"`, expected an object."));for(var Z in K)if(r(K,Z)){var ee=y(K,Z,V,W,X+"."+Z,n);if(ee instanceof Error)return ee}return null}return h(T)}function _(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var T=0;T<y.length;T++){var G=y[T];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ae(G)+" at index "+T+"."),i}function U(V,W,X,K,q){for(var Z=[],ee=0;ee<y.length;ee++){var le=y[ee],C=le(V,W,X,K,q,n);if(C==null)return null;C.data&&r(C.data,"expectedType")&&Z.push(C.data.expectedType)}var ke=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new m("Invalid "+K+" `"+q+"` supplied to "+("`"+X+"`"+ke+"."))}return h(U)}function L(){function y(T,G,U,V,W){return H(T[G])?null:new m("Invalid "+V+" `"+W+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return h(y)}function $(y,T,G,U,V){return new m((y||"React class")+": "+T+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+V+"`.")}function I(y){function T(G,U,V,W,X){var K=G[U],q=B(K);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+q+"` "+("supplied to `"+V+"`, expected `object`."));for(var Z in y){var ee=y[Z];if(typeof ee!="function")return $(V,W,X,Z,te(ee));var le=ee(K,Z,V,W,X+"."+Z,n);if(le)return le}return null}return h(T)}function M(y){function T(G,U,V,W,X){var K=G[U],q=B(K);if(q!=="object")return new m("Invalid "+W+" `"+X+"` of type `"+q+"` "+("supplied to `"+V+"`, expected `object`."));var Z=t({},G[U],y);for(var ee in Z){var le=y[ee];if(r(y,ee)&&typeof le!="function")return $(V,W,X,ee,te(le));if(!le)return new m("Invalid "+W+" `"+X+"` key `"+ee+"` supplied to `"+V+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(y),null,"  "));var C=le(K,ee,V,W,X+"."+ee,n);if(C)return C}return null}return h(T)}function H(y){switch(typeof y){case"number":case"string":case"undefined":return!0;case"boolean":return!y;case"object":if(Array.isArray(y))return y.every(H);if(y===null||l(y))return!0;var T=f(y);if(T){var G=T.call(y),U;if(T!==y.entries){for(;!(U=G.next()).done;)if(!H(U.value))return!1}else for(;!(U=G.next()).done;){var V=U.value;if(V&&!H(V[1]))return!1}}else return!1;return!0;default:return!1}}function F(y,T){return y==="symbol"?!0:T?T["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&T instanceof Symbol:!1}function B(y){var T=typeof y;return Array.isArray(y)?"array":y instanceof RegExp?"object":F(T,y)?"symbol":T}function te(y){if(typeof y>"u"||y===null)return""+y;var T=B(y);if(T==="object"){if(y instanceof Date)return"date";if(y instanceof RegExp)return"regexp"}return T}function ae(y){var T=te(y);switch(T){case"array":case"object":return"an "+T;case"boolean":case"date":case"regexp":return"a "+T;default:return T}}function se(y){return!y.constructor||!y.constructor.name?w:y.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},zr}var Lr,Ra;function xd(){if(Ra)return Lr;Ra=1;var e=Ro();function t(){}function n(){}return n.resetWarningCache=t,Lr=function(){function r(i,l,c,d,u,f){if(f!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Lr}if(process.env.NODE_ENV!=="production"){var yd=si(),Nd=!0;Qr.exports=vd()(yd.isElement,Nd)}else Qr.exports=xd()();var kd=Qr.exports;const p=pd(kd);function jd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function li(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!jd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ci=Co(p.element,li);ci.isRequired=Co(p.element.isRequired,li);const di=ci,Sd="exact-prop: ​";function Ed(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Sd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Gt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var eo={exports:{}},pe={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa;function Td(){if(Oa)return pe;Oa=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function m(h){if(typeof h=="object"&&h!==null){var N=h.$$typeof;switch(N){case e:switch(h=h.type,h){case n:case o:case r:case d:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case i:case c:case w:case f:case s:return h;default:return N}}case t:return N}}}return pe.ContextConsumer=i,pe.ContextProvider=s,pe.Element=e,pe.ForwardRef=c,pe.Fragment=n,pe.Lazy=w,pe.Memo=f,pe.Portal=t,pe.Profiler=o,pe.StrictMode=r,pe.Suspense=d,pe.SuspenseList=u,pe.isAsyncMode=function(){return!1},pe.isConcurrentMode=function(){return!1},pe.isContextConsumer=function(h){return m(h)===i},pe.isContextProvider=function(h){return m(h)===s},pe.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},pe.isForwardRef=function(h){return m(h)===c},pe.isFragment=function(h){return m(h)===n},pe.isLazy=function(h){return m(h)===w},pe.isMemo=function(h){return m(h)===f},pe.isPortal=function(h){return m(h)===t},pe.isProfiler=function(h){return m(h)===o},pe.isStrictMode=function(h){return m(h)===r},pe.isSuspense=function(h){return m(h)===d},pe.isSuspenseList=function(h){return m(h)===u},pe.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===d||h===u||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===w||h.$$typeof===f||h.$$typeof===s||h.$$typeof===i||h.$$typeof===c||h.$$typeof===x||h.getModuleId!==void 0)},pe.typeOf=m,pe}var we={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a;function Cd(){return _a||(_a=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x=!1,m=!1,h=!1,N=!1,S=!1,E;E=Symbol.for("react.module.reference");function j(D){return!!(typeof D=="string"||typeof D=="function"||D===n||D===o||S||D===r||D===d||D===u||N||D===b||x||m||h||typeof D=="object"&&D!==null&&(D.$$typeof===w||D.$$typeof===f||D.$$typeof===s||D.$$typeof===i||D.$$typeof===c||D.$$typeof===E||D.getModuleId!==void 0))}function v(D){if(typeof D=="object"&&D!==null){var xe=D.$$typeof;switch(xe){case e:var Ee=D.type;switch(Ee){case n:case o:case r:case d:case u:return Ee;default:var rt=Ee&&Ee.$$typeof;switch(rt){case l:case i:case c:case w:case f:case s:return rt;default:return xe}}case t:return xe}}}var O=i,z=s,R=e,_=c,L=n,$=w,I=f,M=t,H=o,F=r,B=d,te=u,ae=!1,se=!1;function y(D){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function T(D){return se||(se=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(D){return v(D)===i}function U(D){return v(D)===s}function V(D){return typeof D=="object"&&D!==null&&D.$$typeof===e}function W(D){return v(D)===c}function X(D){return v(D)===n}function K(D){return v(D)===w}function q(D){return v(D)===f}function Z(D){return v(D)===t}function ee(D){return v(D)===o}function le(D){return v(D)===r}function C(D){return v(D)===d}function ke(D){return v(D)===u}we.ContextConsumer=O,we.ContextProvider=z,we.Element=R,we.ForwardRef=_,we.Fragment=L,we.Lazy=$,we.Memo=I,we.Portal=M,we.Profiler=H,we.StrictMode=F,we.Suspense=B,we.SuspenseList=te,we.isAsyncMode=y,we.isConcurrentMode=T,we.isContextConsumer=G,we.isContextProvider=U,we.isElement=V,we.isForwardRef=W,we.isFragment=X,we.isLazy=K,we.isMemo=q,we.isPortal=Z,we.isProfiler=ee,we.isStrictMode=le,we.isSuspense=C,we.isSuspenseList=ke,we.isValidElementType=j,we.typeOf=v}()),we}process.env.NODE_ENV==="production"?eo.exports=Td():eo.exports=Cd();var Pa=eo.exports;const Rd=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Od(e){const t=`${e}`.match(Rd);return t&&t[1]||""}function ui(e,t=""){return e.displayName||e.name||Od(e)||t}function Ia(e,t,n){const r=ui(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function _d(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ui(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Pa.ForwardRef:return Ia(e,e.render,"ForwardRef");case Pa.Memo:return Ia(e,e.type,"memo");default:return}}}function Tn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Pd=p.oneOfType([p.func,p.object]),pi=Pd;function tt(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Gt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Id(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Md(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function $d(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Ad(e,t){var n,r;return A.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Qn(e){return e&&e.ownerDocument||document}function Dd(e){return Qn(e).defaultView||window}function Bd(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const f=d||i,w=n==null?void 0:n[f];if(w){const b=w(s,i,l,c,d,...u);if(b)return b}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function er(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Vd=typeof window<"u"?A.useLayoutEffect:A.useEffect,Ut=Vd;let Ma=0;function zd(e){const[t,n]=A.useState(e),r=e||t;return A.useEffect(()=>{t==null&&(Ma+=1,n(`mui-${Ma}`))},[t]),r}const $a=A["useId".toString()];function wi(e){if($a!==void 0){const t=$a();return e??t}return zd(e)}function Ld(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function fi({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=A.useRef(e!==void 0),[s,i]=A.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){A.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=A.useRef(t);A.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=A.useCallback(d=>{o||i(d)},[]);return[l,c]}function to(e){const t=A.useRef(e);return Ut(()=>{t.current=e}),A.useRef((...n)=>(0,t.current)(...n)).current}function Rt(...e){return A.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{er(n,t)})},e)}const Aa={};function Fd(e,t){const n=A.useRef(Aa);return n.current===Aa&&(n.current=e(t)),n}const Gd=[];function Ud(e){A.useEffect(e,Gd)}class Mn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Mn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function hn(){const e=Fd(Mn.create).current;return Ud(e.disposeEffect),e}let fr=!0,no=!1;const qd=new Mn,Hd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Xd(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Hd[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Yd(e){e.metaKey||e.altKey||e.ctrlKey||(fr=!0)}function Fr(){fr=!1}function Wd(){this.visibilityState==="hidden"&&no&&(fr=!0)}function Kd(e){e.addEventListener("keydown",Yd,!0),e.addEventListener("mousedown",Fr,!0),e.addEventListener("pointerdown",Fr,!0),e.addEventListener("touchstart",Fr,!0),e.addEventListener("visibilitychange",Wd,!0)}function Jd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return fr||Xd(t)}function mi(){const e=A.useCallback(o=>{o!=null&&Kd(o.ownerDocument)},[]),t=A.useRef(!1);function n(){return t.current?(no=!0,qd.start(100,()=>{no=!1}),t.current=!1,!0):!1}function r(o){return Jd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function hi(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=P({},s),Object.keys(o).forEach(i=>{n[r][i]=hi(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Oo(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Da=e=>e,Zd=()=>{let e=Da;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Da}}},Qd=Zd(),gi=Qd,bi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function mr(e,t,n="Mui"){const r=bi[t];return r?`${n}-${r}`:`${gi.generate(e)}-${t}`}function vi(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=mr(e,o,n)}),r}function eu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Te(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const tu=["values","unit","step"],nu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function ru(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=Te(e,tu),s=nu(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,b){const x=i.indexOf(b);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:b)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function f(w){const b=i.indexOf(w);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return P({keys:i,values:s,up:l,down:c,between:d,only:u,not:f,unit:n},o)}const ou={borderRadius:4},au=ou,su=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},ht=su;function yn(e,t){return t?it(e,t,{clone:!1}):e}const _o={xs:0,sm:600,md:900,lg:1200,xl:1536},Ba={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${_o[e]}px)`};function lt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Ba;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Ba;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||_o).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function iu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function lu(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function hr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function tr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=hr(e,n)||r,t&&(o=t(o,r,e)),o}function Ne(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=hr(c,r)||{};return lt(i,l,f=>{let w=tr(d,o,f);return f===w&&typeof f=="string"&&(w=tr(d,o,`${t}${f==="default"?"":tt(f)}`,f)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:ht}:{},s.filterProps=[t],s}function cu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const du={m:"margin",p:"padding"},uu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Va={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},pu=cu(e=>{if(e.length>2)if(Va[e])e=Va[e];else return[e];const[t,n]=e.split(""),r=du[t],o=uu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),gr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],br=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],wu=[...gr,...br];function $n(e,t,n,r){var o;const s=(o=hr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function xi(e){return $n(e,"spacing",8,"spacing")}function An(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function fu(e,t){return n=>e.reduce((r,o)=>(r[o]=An(t,n),r),{})}function mu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=pu(n),s=fu(o,r),i=e[n];return lt(e,i,s)}function yi(e,t){const n=xi(e.theme);return Object.keys(e).map(r=>mu(e,t,r,n)).reduce(yn,{})}function ge(e){return yi(e,gr)}ge.propTypes=process.env.NODE_ENV!=="production"?gr.reduce((e,t)=>(e[t]=ht,e),{}):{};ge.filterProps=gr;function be(e){return yi(e,br)}be.propTypes=process.env.NODE_ENV!=="production"?br.reduce((e,t)=>(e[t]=ht,e),{}):{};be.filterProps=br;process.env.NODE_ENV!=="production"&&wu.reduce((e,t)=>(e[t]=ht,e),{});function hu(e=8){if(e.mui)return e;const t=xi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function vr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?yn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function qe(e){return typeof e!="number"?e:`${e}px solid`}function We(e,t){return Ne({prop:e,themeKey:"borders",transform:t})}const gu=We("border",qe),bu=We("borderTop",qe),vu=We("borderRight",qe),xu=We("borderBottom",qe),yu=We("borderLeft",qe),Nu=We("borderColor"),ku=We("borderTopColor"),ju=We("borderRightColor"),Su=We("borderBottomColor"),Eu=We("borderLeftColor"),Tu=We("outline",qe),Cu=We("outlineColor"),xr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=$n(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:An(t,r)});return lt(e,e.borderRadius,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ht}:{};xr.filterProps=["borderRadius"];vr(gu,bu,vu,xu,yu,Nu,ku,ju,Su,Eu,xr,Tu,Cu);const yr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=$n(e.theme,"spacing",8,"gap"),n=r=>({gap:An(t,r)});return lt(e,e.gap,n)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{gap:ht}:{};yr.filterProps=["gap"];const Nr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=$n(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:An(t,r)});return lt(e,e.columnGap,n)}return null};Nr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ht}:{};Nr.filterProps=["columnGap"];const kr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=$n(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:An(t,r)});return lt(e,e.rowGap,n)}return null};kr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ht}:{};kr.filterProps=["rowGap"];const Ru=Ne({prop:"gridColumn"}),Ou=Ne({prop:"gridRow"}),_u=Ne({prop:"gridAutoFlow"}),Pu=Ne({prop:"gridAutoColumns"}),Iu=Ne({prop:"gridAutoRows"}),Mu=Ne({prop:"gridTemplateColumns"}),$u=Ne({prop:"gridTemplateRows"}),Au=Ne({prop:"gridTemplateAreas"}),Du=Ne({prop:"gridArea"});vr(yr,Nr,kr,Ru,Ou,_u,Pu,Iu,Mu,$u,Au,Du);function Ft(e,t){return t==="grey"?t:e}const Bu=Ne({prop:"color",themeKey:"palette",transform:Ft}),Vu=Ne({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Ft}),zu=Ne({prop:"backgroundColor",themeKey:"palette",transform:Ft});vr(Bu,Vu,zu);function Le(e){return e<=1&&e!==0?`${e*100}%`:e}const Lu=Ne({prop:"width",transform:Le}),Po=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||_o[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Le(n)}};return lt(e,e.maxWidth,t)}return null};Po.filterProps=["maxWidth"];const Fu=Ne({prop:"minWidth",transform:Le}),Gu=Ne({prop:"height",transform:Le}),Uu=Ne({prop:"maxHeight",transform:Le}),qu=Ne({prop:"minHeight",transform:Le});Ne({prop:"size",cssProperty:"width",transform:Le});Ne({prop:"size",cssProperty:"height",transform:Le});const Hu=Ne({prop:"boxSizing"});vr(Lu,Po,Fu,Gu,Uu,qu,Hu);const Xu={border:{themeKey:"borders",transform:qe},borderTop:{themeKey:"borders",transform:qe},borderRight:{themeKey:"borders",transform:qe},borderBottom:{themeKey:"borders",transform:qe},borderLeft:{themeKey:"borders",transform:qe},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:qe},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:xr},color:{themeKey:"palette",transform:Ft},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Ft},backgroundColor:{themeKey:"palette",transform:Ft},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ge},mt:{style:ge},mr:{style:ge},mb:{style:ge},ml:{style:ge},mx:{style:ge},my:{style:ge},margin:{style:ge},marginTop:{style:ge},marginRight:{style:ge},marginBottom:{style:ge},marginLeft:{style:ge},marginX:{style:ge},marginY:{style:ge},marginInline:{style:ge},marginInlineStart:{style:ge},marginInlineEnd:{style:ge},marginBlock:{style:ge},marginBlockStart:{style:ge},marginBlockEnd:{style:ge},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:yr},rowGap:{style:kr},columnGap:{style:Nr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Le},maxWidth:{style:Po},minWidth:{transform:Le},height:{transform:Le},maxHeight:{transform:Le},minHeight:{transform:Le},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Io=Xu;function Yu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Wu(e,t){return typeof e=="function"?e(t):e}function Ku(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:f}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=hr(o,d)||{};return f?f(i):lt(i,r,x=>{let m=tr(w,u,x);return x===m&&typeof x=="string"&&(m=tr(w,u,`${n}${x==="default"?"":tt(x)}`,x)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:Io;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=iu(s.breakpoints),f=Object.keys(u);let w=u;return Object.keys(d).forEach(b=>{const x=Wu(d[b],s);if(x!=null)if(typeof x=="object")if(i[b])w=yn(w,e(b,x,s,i));else{const m=lt({theme:s},x,h=>({[b]:h}));Yu(m,x)?w[b]=t({sx:x,theme:s}):w=yn(w,m)}else w=yn(w,e(b,x,s,i))}),lu(f,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const Ni=Ku();Ni.filterProps=["sx"];const Mo=Ni;function Ju(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Zu=["breakpoints","palette","spacing","shape"];function $o(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=Te(e,Zu),l=ru(n),c=hu(o);let d=it({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:c,shape:P({},au,s)},i);return d.applyStyles=Ju,d=t.reduce((u,f)=>it(u,f),d),d.unstable_sxConfig=P({},Io,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Mo({sx:f,theme:this})},d}function Qu(e){return Object.keys(e).length===0}function ki(e=null){const t=A.useContext(Hr.ThemeContext);return!t||Qu(t)?e:t}const ep=$o();function ji(e=ep){return ki(e)}const tp=["ownerState"],np=["variants"],rp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function op(e){return Object.keys(e).length===0}function ap(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Yn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const sp=$o(),za=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Un({defaultTheme:e,theme:t,themeId:n}){return op(t)?e:t[n]||t}function ip(e){return e?(t,n)=>n[e]:null}function Wn(e,t){let{ownerState:n}=t,r=Te(t,tp);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Wn(s,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=Te(o,np);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(P({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(P({ownerState:n},r,n)):c.style))}),l}return o}function lp(e={}){const{themeId:t,defaultTheme:n=sp,rootShouldForwardProp:r=Yn,slotShouldForwardProp:o=Yn}=e,s=i=>Mo(P({},i,{theme:Un(P({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Hr.internal_processStyles(i,v=>v.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:f,overridesResolver:w=ip(za(d))}=l,b=Te(l,rp),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,m=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${za(d||"Root")}`);let N=Yn;d==="Root"||d==="root"?N=r:d?N=o:ap(i)&&(N=void 0);const S=Hr(i,P({shouldForwardProp:N,label:h},b)),E=v=>typeof v=="function"&&v.__emotion_real!==v||jt(v)?O=>Wn(v,P({},O,{theme:Un({theme:O.theme,defaultTheme:n,themeId:t})})):v,j=(v,...O)=>{let z=E(v);const R=O?O.map(E):[];c&&w&&R.push($=>{const I=Un(P({},$,{defaultTheme:n,themeId:t}));if(!I.components||!I.components[c]||!I.components[c].styleOverrides)return null;const M=I.components[c].styleOverrides,H={};return Object.entries(M).forEach(([F,B])=>{H[F]=Wn(B,P({},$,{theme:I}))}),w($,H)}),c&&!x&&R.push($=>{var I;const M=Un(P({},$,{defaultTheme:n,themeId:t})),H=M==null||(I=M.components)==null||(I=I[c])==null?void 0:I.variants;return Wn({variants:H},P({},$,{theme:M}))}),m||R.push(s);const _=R.length-O.length;if(Array.isArray(v)&&_>0){const $=new Array(_).fill("");z=[...v,...$],z.raw=[...v.raw,...$]}const L=S(z,...R);if(process.env.NODE_ENV!=="production"){let $;c&&($=`${c}${tt(d||"")}`),$===void 0&&($=`Styled(${_d(i)})`),L.displayName=$}return i.muiName&&(L.muiName=i.muiName),L};return S.withConfig&&(j.withConfig=S.withConfig),j}}function cp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:hi(t.components[n].defaultProps,r)}function dp({props:e,name:t,defaultTheme:n,themeId:r}){let o=ji(n);return r&&(o=o[r]||o),cp({theme:o,name:t,props:e})}function Ao(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),eu(e,t,n)}function up(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ot(e){if(e.type)return e;if(e.charAt(0)==="#")return Ot(up(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Gt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Gt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function jr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function pp(e){e=Ot(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),jr({type:l,values:c})}function La(e){e=Ot(e);let t=e.type==="hsl"||e.type==="hsla"?Ot(pp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Fa(e,t){const n=La(e),r=La(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Si(e,t){return e=Ot(e),t=Ao(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,jr(e)}function wp(e,t){if(e=Ot(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return jr(e)}function fp(e,t){if(e=Ot(e),t=Ao(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return jr(e)}function mp(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const hp={black:"#000",white:"#fff"},Cn=hp,gp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},bp=gp,vp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},$t=vp,xp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},At=xp,yp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},un=yp,Np={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Dt=Np,kp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Bt=kp,jp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Vt=jp,Sp=["mode","contrastThreshold","tonalOffset"],Ga={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Cn.white,default:Cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Gr={text:{primary:Cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ua(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=fp(e.main,o):t==="dark"&&(e.dark=wp(e.main,s)))}function Ep(e="light"){return e==="dark"?{main:Dt[200],light:Dt[50],dark:Dt[400]}:{main:Dt[700],light:Dt[400],dark:Dt[800]}}function Tp(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[500],light:$t[300],dark:$t[700]}}function Cp(e="light"){return e==="dark"?{main:At[500],light:At[300],dark:At[700]}:{main:At[700],light:At[400],dark:At[800]}}function Rp(e="light"){return e==="dark"?{main:Bt[400],light:Bt[300],dark:Bt[700]}:{main:Bt[700],light:Bt[500],dark:Bt[900]}}function Op(e="light"){return e==="dark"?{main:Vt[400],light:Vt[300],dark:Vt[700]}:{main:Vt[800],light:Vt[500],dark:Vt[900]}}function _p(e="light"){return e==="dark"?{main:un[400],light:un[300],dark:un[700]}:{main:"#ed6c02",light:un[500],dark:un[900]}}function Pp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=Te(e,Sp),s=e.primary||Ep(t),i=e.secondary||Tp(t),l=e.error||Cp(t),c=e.info||Rp(t),d=e.success||Op(t),u=e.warning||_p(t);function f(m){const h=Fa(m,Gr.text.primary)>=n?Gr.text.primary:Ga.text.primary;if(process.env.NODE_ENV!=="production"){const N=Fa(m,h);N<3&&console.error([`MUI: The contrast ratio of ${N}:1 for ${h} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const w=({color:m,name:h,mainShade:N=500,lightShade:S=300,darkShade:E=700})=>{if(m=P({},m),!m.main&&m[N]&&(m.main=m[N]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`:Gt(11,h?` (${h})`:"",N));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Gt(12,h?` (${h})`:"",JSON.stringify(m.main)));return Ua(m,"light",S,r),Ua(m,"dark",E,r),m.contrastText||(m.contrastText=f(m.main)),m},b={dark:Gr,light:Ga};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),it(P({common:P({},Cn),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:bp,contrastThreshold:n,getContrastText:f,augmentColor:w,tonalOffset:r},b[t]),o)}const Ip=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Mp(e){return Math.round(e*1e5)/1e5}const qa={textTransform:"uppercase"},Ha='"Roboto", "Helvetica", "Arial", sans-serif';function $p(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ha,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:f}=n,w=Te(n,Ip);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,x=f||(N=>`${N/d*b}rem`),m=(N,S,E,j,v)=>P({fontFamily:r,fontWeight:N,fontSize:x(S),lineHeight:E},r===Ha?{letterSpacing:`${Mp(j/S)}em`}:{},v,u),h={h1:m(s,96,1.167,-1.5),h2:m(s,60,1.2,-.5),h3:m(i,48,1.167,0),h4:m(i,34,1.235,.25),h5:m(i,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(i,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(i,16,1.5,.15),body2:m(i,14,1.43,.15),button:m(l,14,1.75,.4,qa),caption:m(i,12,1.66,.4),overline:m(i,12,2.66,1,qa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return it(P({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},h),w,{clone:!1})}const Ap=.2,Dp=.14,Bp=.12;function he(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ap})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Dp})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Bp})`].join(",")}const Vp=["none",he(0,2,1,-1,0,1,1,0,0,1,3,0),he(0,3,1,-2,0,2,2,0,0,1,5,0),he(0,3,3,-2,0,3,4,0,0,1,8,0),he(0,2,4,-1,0,4,5,0,0,1,10,0),he(0,3,5,-1,0,5,8,0,0,1,14,0),he(0,3,5,-1,0,6,10,0,0,1,18,0),he(0,4,5,-2,0,7,10,1,0,2,16,1),he(0,5,5,-3,0,8,10,1,0,3,14,2),he(0,5,6,-3,0,9,12,1,0,3,16,2),he(0,6,6,-3,0,10,14,1,0,4,18,3),he(0,6,7,-4,0,11,15,1,0,4,20,3),he(0,7,8,-4,0,12,17,2,0,5,22,4),he(0,7,8,-4,0,13,19,2,0,5,24,4),he(0,7,9,-4,0,14,21,2,0,5,26,4),he(0,8,9,-5,0,15,22,2,0,6,28,5),he(0,8,10,-5,0,16,24,2,0,6,30,5),he(0,8,11,-5,0,17,26,2,0,6,32,5),he(0,9,11,-5,0,18,28,2,0,7,34,6),he(0,9,12,-6,0,19,29,2,0,7,36,6),he(0,10,13,-6,0,20,31,3,0,8,38,7),he(0,10,13,-6,0,21,33,3,0,8,40,7),he(0,10,14,-6,0,22,35,3,0,8,42,7),he(0,11,14,-7,0,23,36,3,0,9,44,8),he(0,11,15,-7,0,24,38,3,0,9,46,8)],zp=Vp,Lp=["duration","easing","delay"],Fp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Gp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Xa(e){return`${Math.round(e)}ms`}function Up(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function qp(e){const t=P({},Fp,e.easing),n=P({},Gp,e.duration);return P({getAutoHeightDuration:Up,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=Te(s,Lp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",f=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:Xa(i)} ${l} ${typeof c=="string"?c:Xa(c)}`).join(",")}},e,{easing:t,duration:n})}const Hp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Xp=Hp,Yp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Wp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=Te(e,Yp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Gt(18));const l=Pp(r),c=$o(e);let d=it(c,{mixins:mp(c.breakpoints,n),palette:l,shadows:zp.slice(),typography:$p(l,s),transitions:qp(o),zIndex:P({},Xp)});if(d=it(d,i),d=t.reduce((u,f)=>it(u,f),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(w,b)=>{let x;for(x in w){const m=w[x];if(u.indexOf(x)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const h=mr("",x);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const b=d.components[w].styleOverrides;b&&w.indexOf("Mui")===0&&f(b,w)})}return d.unstable_sxConfig=P({},Io,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Mo({sx:f,theme:this})},d}const Kp=Wp(),Do=Kp,Bo="$$material";function Vo({props:e,name:t}){return dp({props:e,name:t,defaultTheme:Do,themeId:Bo})}const Jp=e=>Yn(e)&&e!=="classes",Zp=lp({themeId:Bo,defaultTheme:Do,rootShouldForwardProp:Jp}),Dn=Zp;function Qp(e){return mr("MuiSvgIcon",e)}vi("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ew=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],tw=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${tt(t)}`,`fontSize${tt(n)}`]};return Oo(o,Qp,r)},nw=Dn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${tt(n.color)}`],t[`fontSize${tt(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,u,f,w,b,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(f=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),zo=A.forwardRef(function(t,n){const r=Vo({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:f,viewBox:w="0 0 24 24"}=r,b=Te(r,ew),x=A.isValidElement(o)&&o.type==="svg",m=P({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),h={};u||(h.viewBox=w);const N=tw(m);return a.jsxs(nw,P({as:l,className:pt(N.root,s),focusable:"false",color:d,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,b,x&&o.props,{ownerState:m,children:[x?o.props.children:o,f?a.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(zo.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});zo.muiName="SvgIcon";const Ya=zo;function Ei(e,t){function n(r,o){return a.jsx(Ya,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ya.muiName,A.memo(A.forwardRef(n))}const rw={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),gi.configure(e)}},ow=Object.freeze(Object.defineProperty({__proto__:null,capitalize:tt,createChainedFunction:Id,createSvgIcon:Ei,debounce:Md,deprecatedPropType:$d,isMuiElement:Ad,ownerDocument:Qn,ownerWindow:Dd,requirePropFactory:Bd,setRef:er,unstable_ClassNameGenerator:rw,unstable_useEnhancedEffect:Ut,unstable_useId:wi,unsupportedProp:Ld,useControlled:fi,useEventCallback:to,useForkRef:Rt,useIsFocusVisible:mi},Symbol.toStringTag,{value:"Module"})),aw=wd(ow);var Wa;function sw(){return Wa||(Wa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=aw}($r)),$r}var iw=fd;Object.defineProperty(To,"__esModule",{value:!0});var Ti=To.default=void 0,lw=iw(sw()),cw=a;Ti=To.default=(0,lw.default)((0,cw.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function dw(e){return typeof e=="string"}function gn(e,t,n){return e===void 0||dw(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const uw={disableDefaultClasses:!1},pw=A.createContext(uw);function ww(e){const{disableDefaultClasses:t}=A.useContext(pw);return n=>t?"":e(n)}function fw(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function mw(e,t,n){return typeof e=="function"?e(t,n):e}function Ka(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function hw(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=pt(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),x=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=P({},n,o,r);return b.length>0&&(m.className=b),Object.keys(x).length>0&&(m.style=x),{props:m,internalRef:void 0}}const i=fw(P({},o,r)),l=Ka(r),c=Ka(o),d=t(i),u=pt(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),f=P({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=P({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(f).length>0&&(w.style=f),{props:w,internalRef:d.ref}}const gw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function bw(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=Te(e,gw),l=s?{}:mw(r,o),{props:c,internalRef:d}=hw(P({},i,{externalSlotProps:l})),u=Rt(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return gn(n,P({},c,{ref:u}),o)}const Ci="base";function vw(e){return`${Ci}--${e}`}function xw(e,t){return`${Ci}-${e}-${t}`}function Ri(e,t){const n=bi[t];return n?vw(n):xw(e,t)}function yw(e,t){const n={};return t.forEach(r=>{n[r]=Ri(e,r)}),n}function Nw(e){return typeof e=="function"?e():e}const nr=A.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=A.useState(null),c=Rt(A.isValidElement(r)?r.ref:null,n);if(Ut(()=>{s||l(Nw(o)||document.body)},[o,s]),Ut(()=>{if(i&&!s)return er(n,i),()=>{er(n,null)}},[n,i,s]),s){if(A.isValidElement(r)){const d={ref:c};return A.cloneElement(r,d)}return a.jsx(A.Fragment,{children:r})}return a.jsx(A.Fragment,{children:i&&Al.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(nr.propTypes={children:p.node,container:p.oneOfType([Tn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(nr["propTypes"]=Ed(nr.propTypes));var Me="top",Xe="bottom",Ye="right",$e="left",Lo="auto",Bn=[Me,Xe,Ye,$e],qt="start",Rn="end",kw="clippingParents",Oi="viewport",pn="popper",jw="reference",Ja=Bn.reduce(function(e,t){return e.concat([t+"-"+qt,t+"-"+Rn])},[]),_i=[].concat(Bn,[Lo]).reduce(function(e,t){return e.concat([t,t+"-"+qt,t+"-"+Rn])},[]),Sw="beforeRead",Ew="read",Tw="afterRead",Cw="beforeMain",Rw="main",Ow="afterMain",_w="beforeWrite",Pw="write",Iw="afterWrite",Mw=[Sw,Ew,Tw,Cw,Rw,Ow,_w,Pw,Iw];function nt(e){return e?(e.nodeName||"").toLowerCase():null}function Ge(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function _t(e){var t=Ge(e).Element;return e instanceof t||e instanceof Element}function He(e){var t=Ge(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Fo(e){if(typeof ShadowRoot>"u")return!1;var t=Ge(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function $w(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!He(s)||!nt(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Aw(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!He(o)||!nt(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Dw={name:"applyStyles",enabled:!0,phase:"write",fn:$w,effect:Aw,requires:["computeStyles"]};function Qe(e){return e.split("-")[0]}var St=Math.max,rr=Math.min,Ht=Math.round;function ro(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Pi(){return!/^((?!chrome|android).)*safari/i.test(ro())}function Xt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&He(e)&&(o=e.offsetWidth>0&&Ht(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ht(r.height)/e.offsetHeight||1);var i=_t(e)?Ge(e):window,l=i.visualViewport,c=!Pi()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,f=r.width/o,w=r.height/s;return{width:f,height:w,top:u,right:d+f,bottom:u+w,left:d,x:d,y:u}}function Go(e){var t=Xt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ii(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Fo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ct(e){return Ge(e).getComputedStyle(e)}function Bw(e){return["table","td","th"].indexOf(nt(e))>=0}function gt(e){return((_t(e)?e.ownerDocument:e.document)||window.document).documentElement}function Sr(e){return nt(e)==="html"?e:e.assignedSlot||e.parentNode||(Fo(e)?e.host:null)||gt(e)}function Za(e){return!He(e)||ct(e).position==="fixed"?null:e.offsetParent}function Vw(e){var t=/firefox/i.test(ro()),n=/Trident/i.test(ro());if(n&&He(e)){var r=ct(e);if(r.position==="fixed")return null}var o=Sr(e);for(Fo(o)&&(o=o.host);He(o)&&["html","body"].indexOf(nt(o))<0;){var s=ct(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Vn(e){for(var t=Ge(e),n=Za(e);n&&Bw(n)&&ct(n).position==="static";)n=Za(n);return n&&(nt(n)==="html"||nt(n)==="body"&&ct(n).position==="static")?t:n||Vw(e)||t}function Uo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Nn(e,t,n){return St(e,rr(t,n))}function zw(e,t,n){var r=Nn(e,t,n);return r>n?n:r}function Mi(){return{top:0,right:0,bottom:0,left:0}}function $i(e){return Object.assign({},Mi(),e)}function Ai(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Lw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,$i(typeof t!="number"?t:Ai(t,Bn))};function Fw(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Qe(n.placement),c=Uo(l),d=[$e,Ye].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=Lw(o.padding,n),w=Go(s),b=c==="y"?Me:$e,x=c==="y"?Xe:Ye,m=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],h=i[c]-n.rects.reference[c],N=Vn(s),S=N?c==="y"?N.clientHeight||0:N.clientWidth||0:0,E=m/2-h/2,j=f[b],v=S-w[u]-f[x],O=S/2-w[u]/2+E,z=Nn(j,O,v),R=c;n.modifiersData[r]=(t={},t[R]=z,t.centerOffset=z-O,t)}}function Gw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ii(t.elements.popper,o)&&(t.elements.arrow=o))}const Uw={name:"arrow",enabled:!0,phase:"main",fn:Fw,effect:Gw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yt(e){return e.split("-")[1]}var qw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Hw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ht(n*o)/o||0,y:Ht(r*o)/o||0}}function Qa(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,w=i.x,b=w===void 0?0:w,x=i.y,m=x===void 0?0:x,h=typeof u=="function"?u({x:b,y:m}):{x:b,y:m};b=h.x,m=h.y;var N=i.hasOwnProperty("x"),S=i.hasOwnProperty("y"),E=$e,j=Me,v=window;if(d){var O=Vn(n),z="clientHeight",R="clientWidth";if(O===Ge(n)&&(O=gt(n),ct(O).position!=="static"&&l==="absolute"&&(z="scrollHeight",R="scrollWidth")),O=O,o===Me||(o===$e||o===Ye)&&s===Rn){j=Xe;var _=f&&O===v&&v.visualViewport?v.visualViewport.height:O[z];m-=_-r.height,m*=c?1:-1}if(o===$e||(o===Me||o===Xe)&&s===Rn){E=Ye;var L=f&&O===v&&v.visualViewport?v.visualViewport.width:O[R];b-=L-r.width,b*=c?1:-1}}var $=Object.assign({position:l},d&&qw),I=u===!0?Hw({x:b,y:m},Ge(n)):{x:b,y:m};if(b=I.x,m=I.y,c){var M;return Object.assign({},$,(M={},M[j]=S?"0":"",M[E]=N?"0":"",M.transform=(v.devicePixelRatio||1)<=1?"translate("+b+"px, "+m+"px)":"translate3d("+b+"px, "+m+"px, 0)",M))}return Object.assign({},$,(t={},t[j]=S?m+"px":"",t[E]=N?b+"px":"",t.transform="",t))}function Xw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Qe(t.placement),variation:Yt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Qa(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Qa(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Yw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Xw,data:{}};var qn={passive:!0};function Ww(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Ge(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,qn)}),l&&c.addEventListener("resize",n.update,qn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,qn)}),l&&c.removeEventListener("resize",n.update,qn)}}const Kw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Ww,data:{}};var Jw={left:"right",right:"left",bottom:"top",top:"bottom"};function Kn(e){return e.replace(/left|right|bottom|top/g,function(t){return Jw[t]})}var Zw={start:"end",end:"start"};function es(e){return e.replace(/start|end/g,function(t){return Zw[t]})}function qo(e){var t=Ge(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Ho(e){return Xt(gt(e)).left+qo(e).scrollLeft}function Qw(e,t){var n=Ge(e),r=gt(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Pi();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+Ho(e),y:c}}function ef(e){var t,n=gt(e),r=qo(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=St(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=St(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Ho(e),c=-r.scrollTop;return ct(o||n).direction==="rtl"&&(l+=St(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function Xo(e){var t=ct(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Di(e){return["html","body","#document"].indexOf(nt(e))>=0?e.ownerDocument.body:He(e)&&Xo(e)?e:Di(Sr(e))}function kn(e,t){var n;t===void 0&&(t=[]);var r=Di(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Ge(r),i=o?[s].concat(s.visualViewport||[],Xo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(kn(Sr(i)))}function oo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function tf(e,t){var n=Xt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function ts(e,t,n){return t===Oi?oo(Qw(e,n)):_t(t)?tf(t,n):oo(ef(gt(e)))}function nf(e){var t=kn(Sr(e)),n=["absolute","fixed"].indexOf(ct(e).position)>=0,r=n&&He(e)?Vn(e):e;return _t(r)?t.filter(function(o){return _t(o)&&Ii(o,r)&&nt(o)!=="body"}):[]}function rf(e,t,n,r){var o=t==="clippingParents"?nf(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=ts(e,d,r);return c.top=St(u.top,c.top),c.right=rr(u.right,c.right),c.bottom=rr(u.bottom,c.bottom),c.left=St(u.left,c.left),c},ts(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Bi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Qe(r):null,s=r?Yt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Me:c={x:i,y:t.y-n.height};break;case Xe:c={x:i,y:t.y+t.height};break;case Ye:c={x:t.x+t.width,y:l};break;case $e:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Uo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case qt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case Rn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function On(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?kw:l,d=n.rootBoundary,u=d===void 0?Oi:d,f=n.elementContext,w=f===void 0?pn:f,b=n.altBoundary,x=b===void 0?!1:b,m=n.padding,h=m===void 0?0:m,N=$i(typeof h!="number"?h:Ai(h,Bn)),S=w===pn?jw:pn,E=e.rects.popper,j=e.elements[x?S:w],v=rf(_t(j)?j:j.contextElement||gt(e.elements.popper),c,u,i),O=Xt(e.elements.reference),z=Bi({reference:O,element:E,strategy:"absolute",placement:o}),R=oo(Object.assign({},E,z)),_=w===pn?R:O,L={top:v.top-_.top+N.top,bottom:_.bottom-v.bottom+N.bottom,left:v.left-_.left+N.left,right:_.right-v.right+N.right},$=e.modifiersData.offset;if(w===pn&&$){var I=$[o];Object.keys(L).forEach(function(M){var H=[Ye,Xe].indexOf(M)>=0?1:-1,F=[Me,Xe].indexOf(M)>=0?"y":"x";L[M]+=I[F]*H})}return L}function of(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?_i:c,u=Yt(r),f=u?l?Ja:Ja.filter(function(x){return Yt(x)===u}):Bn,w=f.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=f);var b=w.reduce(function(x,m){return x[m]=On(e,{placement:m,boundary:o,rootBoundary:s,padding:i})[Qe(m)],x},{});return Object.keys(b).sort(function(x,m){return b[x]-b[m]})}function af(e){if(Qe(e)===Lo)return[];var t=Kn(e);return[es(e),t,es(t)]}function sf(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,f=n.rootBoundary,w=n.altBoundary,b=n.flipVariations,x=b===void 0?!0:b,m=n.allowedAutoPlacements,h=t.options.placement,N=Qe(h),S=N===h,E=c||(S||!x?[Kn(h)]:af(h)),j=[h].concat(E).reduce(function(V,W){return V.concat(Qe(W)===Lo?of(t,{placement:W,boundary:u,rootBoundary:f,padding:d,flipVariations:x,allowedAutoPlacements:m}):W)},[]),v=t.rects.reference,O=t.rects.popper,z=new Map,R=!0,_=j[0],L=0;L<j.length;L++){var $=j[L],I=Qe($),M=Yt($)===qt,H=[Me,Xe].indexOf(I)>=0,F=H?"width":"height",B=On(t,{placement:$,boundary:u,rootBoundary:f,altBoundary:w,padding:d}),te=H?M?Ye:$e:M?Xe:Me;v[F]>O[F]&&(te=Kn(te));var ae=Kn(te),se=[];if(s&&se.push(B[I]<=0),l&&se.push(B[te]<=0,B[ae]<=0),se.every(function(V){return V})){_=$,R=!1;break}z.set($,se)}if(R)for(var y=x?3:1,T=function(W){var X=j.find(function(K){var q=z.get(K);if(q)return q.slice(0,W).every(function(Z){return Z})});if(X)return _=X,"break"},G=y;G>0;G--){var U=T(G);if(U==="break")break}t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}}const lf={name:"flip",enabled:!0,phase:"main",fn:sf,requiresIfExists:["offset"],data:{_skip:!1}};function ns(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function rs(e){return[Me,Ye,Xe,$e].some(function(t){return e[t]>=0})}function cf(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=On(t,{elementContext:"reference"}),l=On(t,{altBoundary:!0}),c=ns(i,r),d=ns(l,o,s),u=rs(c),f=rs(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const df={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:cf};function uf(e,t,n){var r=Qe(e),o=[$e,Me].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[$e,Ye].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function pf(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=_i.reduce(function(u,f){return u[f]=uf(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const wf={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:pf};function ff(e){var t=e.state,n=e.name;t.modifiersData[n]=Bi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const mf={name:"popperOffsets",enabled:!0,phase:"read",fn:ff,data:{}};function hf(e){return e==="x"?"y":"x"}function gf(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,f=n.padding,w=n.tether,b=w===void 0?!0:w,x=n.tetherOffset,m=x===void 0?0:x,h=On(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),N=Qe(t.placement),S=Yt(t.placement),E=!S,j=Uo(N),v=hf(j),O=t.modifiersData.popperOffsets,z=t.rects.reference,R=t.rects.popper,_=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,L=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,I={x:0,y:0};if(O){if(s){var M,H=j==="y"?Me:$e,F=j==="y"?Xe:Ye,B=j==="y"?"height":"width",te=O[j],ae=te+h[H],se=te-h[F],y=b?-R[B]/2:0,T=S===qt?z[B]:R[B],G=S===qt?-R[B]:-z[B],U=t.elements.arrow,V=b&&U?Go(U):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Mi(),X=W[H],K=W[F],q=Nn(0,z[B],V[B]),Z=E?z[B]/2-y-q-X-L.mainAxis:T-q-X-L.mainAxis,ee=E?-z[B]/2+y+q+K+L.mainAxis:G+q+K+L.mainAxis,le=t.elements.arrow&&Vn(t.elements.arrow),C=le?j==="y"?le.clientTop||0:le.clientLeft||0:0,ke=(M=$==null?void 0:$[j])!=null?M:0,D=te+Z-ke-C,xe=te+ee-ke,Ee=Nn(b?rr(ae,D):ae,te,b?St(se,xe):se);O[j]=Ee,I[j]=Ee-te}if(l){var rt,Ce=j==="x"?Me:$e,J=j==="x"?Xe:Ye,re=O[v],ye=v==="y"?"height":"width",Oe=re+h[Ce],Je=re-h[J],It=[Me,$e].indexOf(N)!==-1,Mt=(rt=$==null?void 0:$[v])!=null?rt:0,vt=It?Oe:re-z[ye]-R[ye]-Mt+L.altAxis,rn=It?re+z[ye]+R[ye]-Mt-L.altAxis:Je,zn=b&&It?zw(vt,re,rn):Nn(b?vt:Oe,re,b?rn:Je);O[v]=zn,I[v]=zn-re}t.modifiersData[r]=I}}const bf={name:"preventOverflow",enabled:!0,phase:"main",fn:gf,requiresIfExists:["offset"]};function vf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function xf(e){return e===Ge(e)||!He(e)?qo(e):vf(e)}function yf(e){var t=e.getBoundingClientRect(),n=Ht(t.width)/e.offsetWidth||1,r=Ht(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Nf(e,t,n){n===void 0&&(n=!1);var r=He(t),o=He(t)&&yf(t),s=gt(t),i=Xt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((nt(t)!=="body"||Xo(s))&&(l=xf(t)),He(t)?(c=Xt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Ho(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function kf(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function jf(e){var t=kf(e);return Mw.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Sf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Ef(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var os={placement:"bottom",modifiers:[],strategy:"absolute"};function as(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Tf(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?os:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},os,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],w=!1,b={state:u,setOptions:function(N){var S=typeof N=="function"?N(u.options):N;m(),u.options=Object.assign({},s,u.options,S),u.scrollParents={reference:_t(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var E=jf(Ef([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(j){return j.enabled}),x(),b.update()},forceUpdate:function(){if(!w){var N=u.elements,S=N.reference,E=N.popper;if(as(S,E)){u.rects={reference:Nf(S,Vn(E),u.options.strategy==="fixed"),popper:Go(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(L){return u.modifiersData[L.name]=Object.assign({},L.data)});for(var j=0;j<u.orderedModifiers.length;j++){if(u.reset===!0){u.reset=!1,j=-1;continue}var v=u.orderedModifiers[j],O=v.fn,z=v.options,R=z===void 0?{}:z,_=v.name;typeof O=="function"&&(u=O({state:u,options:R,name:_,instance:b})||u)}}}},update:Sf(function(){return new Promise(function(h){b.forceUpdate(),h(u)})}),destroy:function(){m(),w=!0}};if(!as(l,c))return b;b.setOptions(d).then(function(h){!w&&d.onFirstUpdate&&d.onFirstUpdate(h)});function x(){u.orderedModifiers.forEach(function(h){var N=h.name,S=h.options,E=S===void 0?{}:S,j=h.effect;if(typeof j=="function"){var v=j({state:u,name:N,instance:b,options:E}),O=function(){};f.push(v||O)}})}function m(){f.forEach(function(h){return h()}),f=[]}return b}}var Cf=[Kw,mf,Yw,Dw,wf,lf,bf,Uw,df],Rf=Tf({defaultModifiers:Cf});const Vi="Popper";function Of(e){return Ri(Vi,e)}yw(Vi,["root"]);const _f=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Pf=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function If(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function or(e){return typeof e=="function"?e():e}function Er(e){return e.nodeType!==void 0}function Mf(e){return!Er(e)}const $f=()=>Oo({root:["root"]},ww(Of)),Af={},Df=A.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:f,popperRef:w,slotProps:b={},slots:x={},TransitionProps:m}=t,h=Te(t,_f),N=A.useRef(null),S=Rt(N,n),E=A.useRef(null),j=Rt(E,w),v=A.useRef(j);Ut(()=>{v.current=j},[j]),A.useImperativeHandle(w,()=>E.current,[]);const O=If(u,i),[z,R]=A.useState(O),[_,L]=A.useState(or(o));A.useEffect(()=>{E.current&&E.current.forceUpdate()}),A.useEffect(()=>{o&&L(or(o))},[o]),Ut(()=>{if(!_||!d)return;const F=ae=>{R(ae.placement)};if(process.env.NODE_ENV!=="production"&&_&&Er(_)&&_.nodeType===1){const ae=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ae.top===0&&ae.left===0&&ae.right===0&&ae.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let B=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ae})=>{F(ae)}}];c!=null&&(B=B.concat(c)),f&&f.modifiers!=null&&(B=B.concat(f.modifiers));const te=Rf(_,N.current,P({placement:O},f,{modifiers:B}));return v.current(te),()=>{te.destroy(),v.current(null)}},[_,l,c,d,f,O]);const $={placement:z};m!==null&&($.TransitionProps=m);const I=$f(),M=(r=x.root)!=null?r:"div",H=bw({elementType:M,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:S},ownerState:t,className:I.root});return a.jsx(M,P({},H,{children:typeof s=="function"?s($):s}))}),zi=A.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:w=Af,popperRef:b,style:x,transition:m=!1,slotProps:h={},slots:N={}}=t,S=Te(t,Pf),[E,j]=A.useState(!0),v=()=>{j(!1)},O=()=>{j(!0)};if(!c&&!u&&(!m||E))return null;let z;if(s)z=s;else if(r){const L=or(r);z=L&&Er(L)?Qn(L).body:Qn(null).body}const R=!u&&c&&(!m||E)?"none":void 0,_=m?{in:u,onEnter:v,onExited:O}:void 0;return a.jsx(nr,{disablePortal:l,container:z,children:a.jsx(Df,P({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:m?!E:u,placement:f,popperOptions:w,popperRef:b,slotProps:h,slots:N},S,{style:P({position:"fixed",top:0,left:0,display:R},x),TransitionProps:_,children:o}))})});process.env.NODE_ENV!=="production"&&(zi.propTypes={anchorEl:Co(p.oneOfType([Tn,p.object,p.func]),e=>{if(e.open){const t=or(e.anchorEl);if(t&&Er(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Mf(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Tn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:pi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Li(){const e=ji(Do);return process.env.NODE_ENV!=="production"&&A.useDebugValue(e),e[Bo]||e}function ao(e,t){return ao=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ao(e,t)}function Bf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ao(e,t)}const ss={disabled:!1};var Vf=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Fi=g.createContext(null);var zf=function(t){return t.scrollTop},bn="unmounted",Nt="exited",kt="entering",Lt="entered",so="exiting",dt=function(e){Bf(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=Nt,s.appearStatus=kt):c=Lt:r.unmountOnExit||r.mountOnEnter?c=bn:c=Nt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===bn?{status:Nt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==kt&&i!==Lt&&(s=kt):(i===kt||i===Lt)&&(s=so)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===kt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this);i&&zf(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Nt&&this.setState({status:bn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[fn.findDOMNode(this),l],d=c[0],u=c[1],f=this.getTimeouts(),w=l?f.appear:f.enter;if(!o&&!i||ss.disabled){this.safeSetState({status:Lt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:kt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Lt},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:fn.findDOMNode(this);if(!s||ss.disabled){this.safeSetState({status:Nt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:so},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:Nt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===bn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=Te(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return g.createElement(Fi.Provider,{value:null},typeof i=="function"?i(o,l):g.cloneElement(g.Children.only(i),l))},t}(g.Component);dt.contextType=Fi;dt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Vf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function zt(){}dt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:zt,onEntering:zt,onEntered:zt,onExit:zt,onExiting:zt,onExited:zt};dt.UNMOUNTED=bn;dt.EXITED=Nt;dt.ENTERING=kt;dt.ENTERED=Lt;dt.EXITING=so;const Lf=dt,Ff=e=>e.scrollTop;function is(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const Gf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function io(e){return`scale(${e}, ${e**2})`}const Uf={entering:{opacity:1,transform:io(1)},entered:{opacity:1,transform:"none"}},Ur=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Yo=A.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:f,onExited:w,onExiting:b,style:x,timeout:m="auto",TransitionComponent:h=Lf}=t,N=Te(t,Gf),S=hn(),E=A.useRef(),j=Li(),v=A.useRef(null),O=Rt(v,s.ref,n),z=F=>B=>{if(F){const te=v.current;B===void 0?F(te):F(te,B)}},R=z(u),_=z((F,B)=>{Ff(F);const{duration:te,delay:ae,easing:se}=is({style:x,timeout:m,easing:i},{mode:"enter"});let y;m==="auto"?(y=j.transitions.getAutoHeightDuration(F.clientHeight),E.current=y):y=te,F.style.transition=[j.transitions.create("opacity",{duration:y,delay:ae}),j.transitions.create("transform",{duration:Ur?y:y*.666,delay:ae,easing:se})].join(","),c&&c(F,B)}),L=z(d),$=z(b),I=z(F=>{const{duration:B,delay:te,easing:ae}=is({style:x,timeout:m,easing:i},{mode:"exit"});let se;m==="auto"?(se=j.transitions.getAutoHeightDuration(F.clientHeight),E.current=se):se=B,F.style.transition=[j.transitions.create("opacity",{duration:se,delay:te}),j.transitions.create("transform",{duration:Ur?se:se*.666,delay:Ur?te:te||se*.333,easing:ae})].join(","),F.style.opacity=0,F.style.transform=io(.75),f&&f(F)}),M=z(w),H=F=>{m==="auto"&&S.start(E.current||0,F),r&&r(v.current,F)};return a.jsx(h,P({appear:o,in:l,nodeRef:v,onEnter:_,onEntered:L,onEntering:R,onExit:I,onExited:M,onExiting:$,addEndListener:H,timeout:m==="auto"?null:m},N,{children:(F,B)=>A.cloneElement(s,P({style:P({opacity:0,transform:io(.75),visibility:F==="exited"&&!l?"hidden":void 0},Uf[F],x,s.props.style),ref:O},B))}))});process.env.NODE_ENV!=="production"&&(Yo.propTypes={addEndListener:p.func,appear:p.bool,children:di.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Yo.muiSupportAuto=!0;const ls=Yo,qf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Hf=Dn(zi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Gi=A.forwardRef(function(t,n){var r;const o=ki(),s=Vo({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:h,popperRef:N,transition:S,slots:E,slotProps:j}=s,v=Te(s,qf),O=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,z=P({anchorEl:i,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:h,popperRef:N,transition:S},v);return a.jsx(Hf,P({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:j??d},z,{ref:n}))});process.env.NODE_ENV!=="production"&&(Gi.propTypes={anchorEl:p.oneOfType([Tn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Tn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:pi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const Ui=Gi;function Xf(e){return mr("MuiTooltip",e)}const Yf=vi("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),wt=Yf,Wf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Kf(e){return Math.round(e*1e5)/1e5}const Jf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${tt(s.split("-")[0])}`],arrow:["arrow"]};return Oo(i,Xf,t)},Zf=Dn(Ui,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${wt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${wt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${wt.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${wt.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Qf=Dn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${tt(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Si(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Kf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${wt.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${wt.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${wt.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${wt.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),em=Dn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Si(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Hn=!1;const cs=new Mn;let wn={x:0,y:0};function Xn(e,t){return n=>{t&&t(n),e(n)}}const qi=A.forwardRef(function(t,n){var r,o,s,i,l,c,d,u,f,w,b,x,m,h,N,S,E,j,v;const O=Vo({props:t,name:"MuiTooltip"}),{arrow:z=!1,children:R,components:_={},componentsProps:L={},describeChild:$=!1,disableFocusListener:I=!1,disableHoverListener:M=!1,disableInteractive:H=!1,disableTouchListener:F=!1,enterDelay:B=100,enterNextDelay:te=0,enterTouchDelay:ae=700,followCursor:se=!1,id:y,leaveDelay:T=0,leaveTouchDelay:G=1500,onClose:U,onOpen:V,open:W,placement:X="bottom",PopperComponent:K,PopperProps:q={},slotProps:Z={},slots:ee={},title:le,TransitionComponent:C=ls,TransitionProps:ke}=O,D=Te(O,Wf),xe=A.isValidElement(R)?R:a.jsx("span",{children:R}),Ee=Li(),rt=Ee.direction==="rtl",[Ce,J]=A.useState(),[re,ye]=A.useState(null),Oe=A.useRef(!1),Je=H||se,It=hn(),Mt=hn(),vt=hn(),rn=hn(),[zn,na]=fi({controlled:W,default:!1,name:"Tooltip",state:"open"});let ot=zn;if(process.env.NODE_ENV!=="production"){const{current:ne}=A.useRef(W!==void 0);A.useEffect(()=>{Ce&&Ce.disabled&&!ne&&le!==""&&Ce.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[le,Ce,ne])}const Tr=wi(y),on=A.useRef(),Ln=to(()=>{on.current!==void 0&&(document.body.style.WebkitUserSelect=on.current,on.current=void 0),rn.clear()});A.useEffect(()=>Ln,[Ln]);const ra=ne=>{cs.clear(),Hn=!0,na(!0),V&&!ot&&V(ne)},Fn=to(ne=>{cs.start(800+T,()=>{Hn=!1}),na(!1),U&&ot&&U(ne),It.start(Ee.transitions.duration.shortest,()=>{Oe.current=!1})}),Cr=ne=>{Oe.current&&ne.type!=="touchstart"||(Ce&&Ce.removeAttribute("title"),Mt.clear(),vt.clear(),B||Hn&&te?Mt.start(Hn?te:B,()=>{ra(ne)}):ra(ne))},oa=ne=>{Mt.clear(),vt.start(T,()=>{Fn(ne)})},{isFocusVisibleRef:aa,onBlur:cl,onFocus:dl,ref:ul}=mi(),[,sa]=A.useState(!1),ia=ne=>{cl(ne),aa.current===!1&&(sa(!1),oa(ne))},la=ne=>{Ce||J(ne.currentTarget),dl(ne),aa.current===!0&&(sa(!0),Cr(ne))},ca=ne=>{Oe.current=!0;const Be=xe.props;Be.onTouchStart&&Be.onTouchStart(ne)},da=Cr,ua=oa,pl=ne=>{ca(ne),vt.clear(),It.clear(),Ln(),on.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",rn.start(ae,()=>{document.body.style.WebkitUserSelect=on.current,Cr(ne)})},wl=ne=>{xe.props.onTouchEnd&&xe.props.onTouchEnd(ne),Ln(),vt.start(G,()=>{Fn(ne)})};A.useEffect(()=>{if(!ot)return;function ne(Be){(Be.key==="Escape"||Be.key==="Esc")&&Fn(Be)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Fn,ot]);const fl=Rt(xe.ref,ul,J,n);!le&&le!==0&&(ot=!1);const Rr=A.useRef(),ml=ne=>{const Be=xe.props;Be.onMouseMove&&Be.onMouseMove(ne),wn={x:ne.clientX,y:ne.clientY},Rr.current&&Rr.current.update()},an={},Or=typeof le=="string";$?(an.title=!ot&&Or&&!M?le:null,an["aria-describedby"]=ot?Tr:null):(an["aria-label"]=Or?le:null,an["aria-labelledby"]=ot&&!Or?Tr:null);const Ue=P({},an,D,xe.props,{className:pt(D.className,xe.props.className),onTouchStart:ca,ref:fl},se?{onMouseMove:ml}:{});process.env.NODE_ENV!=="production"&&(Ue["data-mui-internal-clone-element"]=!0,A.useEffect(()=>{Ce&&!Ce.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ce]));const sn={};F||(Ue.onTouchStart=pl,Ue.onTouchEnd=wl),M||(Ue.onMouseOver=Xn(da,Ue.onMouseOver),Ue.onMouseLeave=Xn(ua,Ue.onMouseLeave),Je||(sn.onMouseOver=da,sn.onMouseLeave=ua)),I||(Ue.onFocus=Xn(la,Ue.onFocus),Ue.onBlur=Xn(ia,Ue.onBlur),Je||(sn.onFocus=la,sn.onBlur=ia)),process.env.NODE_ENV!=="production"&&xe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));const hl=A.useMemo(()=>{var ne;let Be=[{name:"arrow",enabled:!!re,options:{element:re,padding:4}}];return(ne=q.popperOptions)!=null&&ne.modifiers&&(Be=Be.concat(q.popperOptions.modifiers)),P({},q.popperOptions,{modifiers:Be})},[re,q]),ln=P({},O,{isRtl:rt,arrow:z,disableInteractive:Je,placement:X,PopperComponentProp:K,touch:Oe.current}),_r=Jf(ln),pa=(r=(o=ee.popper)!=null?o:_.Popper)!=null?r:Zf,wa=(s=(i=(l=ee.transition)!=null?l:_.Transition)!=null?i:C)!=null?s:ls,fa=(c=(d=ee.tooltip)!=null?d:_.Tooltip)!=null?c:Qf,ma=(u=(f=ee.arrow)!=null?f:_.Arrow)!=null?u:em,gl=gn(pa,P({},q,(w=Z.popper)!=null?w:L.popper,{className:pt(_r.popper,q==null?void 0:q.className,(b=(x=Z.popper)!=null?x:L.popper)==null?void 0:b.className)}),ln),bl=gn(wa,P({},ke,(m=Z.transition)!=null?m:L.transition),ln),vl=gn(fa,P({},(h=Z.tooltip)!=null?h:L.tooltip,{className:pt(_r.tooltip,(N=(S=Z.tooltip)!=null?S:L.tooltip)==null?void 0:N.className)}),ln),xl=gn(ma,P({},(E=Z.arrow)!=null?E:L.arrow,{className:pt(_r.arrow,(j=(v=Z.arrow)!=null?v:L.arrow)==null?void 0:j.className)}),ln);return a.jsxs(A.Fragment,{children:[A.cloneElement(xe,Ue),a.jsx(pa,P({as:K??Ui,placement:X,anchorEl:se?{getBoundingClientRect:()=>({top:wn.y,left:wn.x,right:wn.x,bottom:wn.y,width:0,height:0})}:Ce,popperRef:Rr,open:Ce?ot:!1,id:Tr,transition:!0},sn,gl,{popperOptions:hl,children:({TransitionProps:ne})=>a.jsx(wa,P({timeout:Ee.transitions.duration.shorter},ne,bl,{children:a.jsxs(fa,P({},vl,{children:[le,z?a.jsx(ma,P({},xl,{ref:ye})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(qi.propTypes={arrow:p.bool,children:di.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const tm=qi;function ds(e,t,n){return e?a.jsx(Fe.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Wo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:w=!1,hasDivider:b=!1,focusVisibleClassName:x,id:m,children:h}=e,N=a.jsx(Fe.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:b,focusVisibleClassName:x,onClick:t,id:m,children:n?a.jsxs(a.Fragment,{children:[ds(s,n,!0),a.jsx(Fe.ListItemText,{primary:n,inset:!s&&o}),f?a.jsx(Fe.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(Ti,{})}):ds(i,n,!1)]}):h});return r?a.jsx(tm,{title:r,placement:"right",children:a.jsx("div",{children:N})}):N}function Hi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function nm(e){const[t,n]=g.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Hi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(Xi,{...e,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(Wo,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(Fe.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const rm=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Xi(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=g.useMemo(()=>{const u=o&&o.length>0?o:Hi(t).filter(x=>!("menuItem"in x.group)),f=Object.values(u).sort((x,m)=>(x.group.order||0)-(m.group.order||0)),w=[];f.forEach(x=>{rm(x.id,t.items).forEach(m=>w.push({item:m,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const b=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:b}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,f)=>{const{item:w}=u,b=l(u);if("command"in w){const x=w.group+f;return a.jsx(Wo,{onClick:m=>{n==null||n(m),r(w)},...b},x)}return a.jsx(nm,{parentMenuItem:w,parentItemProps:b,...e},d+w.id)})},d)}function om(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Xi,{...e,includedGroups:s})}function am({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(Fe.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(Fe.List,{id:n,dense:!0,className:s??"",children:a.jsx(om,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Yi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=g.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(Fe.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(am,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function sm(e){return{preserveValue:!0,...e}}const ar=(e,t,n={})=>{const r=g.useRef(t);r.current=t;const o=g.useRef(n);o.current=sm(o.current);const[s,i]=g.useState(()=>r.current),[l,c]=g.useState(!0);return g.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},im=Ei(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Wi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=g.useState(!1),[u,f]=g.useState(!1),w=g.useCallback(()=>{c&&d(!1),f(!1)},[c]),b=g.useCallback(j=>{j.stopPropagation(),d(v=>{const O=!v;return O&&j.shiftKey?f(!0):O||f(!1),O})},[]),x=g.useCallback(j=>(w(),r(j)),[r,w]),[m,h]=g.useState({top:1,left:1});g.useEffect(()=>{if(c){const j=o==null?void 0:o.current;if(j){const v=j.getBoundingClientRect(),O=window.scrollY,z=window.scrollX,R=v.top+O+j.clientHeight,_=v.left+z;h({top:R,left:_})}}},[c,o]);const[N]=ar(g.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[S]=ar(g.useCallback(async()=>(e==null?void 0:e(!0))??n??N,[e,n,N,c]),n??N),E=u&&S?S:N;return a.jsxs(a.Fragment,{children:[a.jsx(Fe.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??a.jsx(im,{})}),a.jsx(Fe.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:E?a.jsx(Yi,{className:s,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:E}):void 0})]})}function lm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(Fe.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const bt=g.forwardRef(({className:e,...t},n)=>a.jsx(Y.LoaderCircle,{size:35,className:k("tw-animate-spin",e),...t,ref:n}));bt.displayName="Spinner";function cm({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}){return a.jsxs("div",{className:k("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(je,{htmlFor:e,className:k({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(Pt,{id:e,disabled:t,placeholder:i,required:l,className:k(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}),a.jsx("p",{className:k({"tw-hidden":!o}),children:o})]})}function dm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=g.useRef(void 0);return a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx(Fe.AppBar,{position:"static",id:r,children:a.jsxs(Fe.Toolbar,{className:k("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?a.jsx(Wi,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?a.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const um=Kt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ki=g.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:k(um({variant:t}),e),...n}));Ki.displayName="Alert";const Ji=g.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:k("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Ji.displayName="AlertTitle";const Zi=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:k("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Zi.displayName="AlertDescription";const Qi=Kt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function el({className:e,variant:t,...n}){return a.jsx("div",{className:k("pr-twp",Qi({variant:t}),e),...n})}const Ko=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:k("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Ko.displayName="Card";const Jo=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:k("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Jo.displayName="CardHeader";const Zo=g.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:k("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Zo.displayName="CardTitle";const Qo=g.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:k("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Qo.displayName="CardDescription";const ea=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:k("pr-twp tw-p-6 tw-pt-0",e),...t}));ea.displayName="CardContent";const ta=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:k("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));ta.displayName="CardFooter";function pm({...e}){return a.jsx(ws.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const tl=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsxs(mn.Root,{ref:n,className:k("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:r,children:[a.jsx(mn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(mn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(mn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});tl.displayName=mn.Root.displayName;const nl=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsx(Yr.Root,{className:k("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:a.jsx(Yr.Thumb,{className:k("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});nl.displayName=Yr.Root.displayName;const wm=De.Root,rl=g.forwardRef(({className:e,...t},n)=>{const r=Se();return a.jsx(De.List,{ref:n,className:k("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:r})});rl.displayName=De.List.displayName;const ol=g.forwardRef(({className:e,...t},n)=>a.jsx(De.Trigger,{ref:n,className:k("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ol.displayName=De.Trigger.displayName;const al=g.forwardRef(({className:e,...t},n)=>a.jsx(De.Content,{ref:n,className:k("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));al.displayName=De.Content.displayName;function fm({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(fe,{className:k("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(bt,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(Y.Download,{size:25,className:k("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function mm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(fe,{className:k("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(bt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function hm({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(fe,{className:k("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(bt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function gm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(fe,{className:k("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(bt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function bm({id:e,markdown:t,className:n,anchorTarget:r}){const o=g.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:e,className:k("pr-twp tw-prose",n),children:a.jsx($l,{options:o,children:t})})}const sl=g.forwardRef((e,t)=>a.jsxs(fe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(Y.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(Y.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var il=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(il||{});function vm({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(Pn,{children:[a.jsx(ir,{asChild:!0,children:a.jsx(sl,{})}),a.jsx(Jt,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(In,{children:n.label}),a.jsx(gs,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(lr,{onClick:r.onClick,children:r.label}):a.jsx(co,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Zt,{})]},n.label))})]})})}function xm({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function ym({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new Q.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(Y.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(Y.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(Y.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function ll({id:e,versionHistory:t}){const[n,r]=g.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,f=d.getUTCMonth(),w=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:f>0?b=`${f.toString()} month${f===1?"":"s"} ago`:w===0?b="today":b=`${w.toString()} day${w===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Nm({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=g.useMemo(()=>Q.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(ll,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function lo({entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d,badgesPlaceholder:u}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx(qs,{entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0?a.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(f=>{var w;return a.jsxs(el,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[a.jsx(fe,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(b=>b!==f)),children:a.jsx(Y.X,{className:"tw-h-3 tw-w-3"})}),(w=e.find(b=>b.value===f))==null?void 0:w.label]},f)})}):a.jsx(je,{children:u})]})}const km=["%resources_action%","%resources_any%","%resources_dialog_subtitle%","%resources_dialog_title%","%resources_filterBy%","%resources_filterInput%","%resources_fullName%","%resources_get%","%resources_installed%","%resources_language%","%resources_languages%","%resources_loadingResources%","%resources_noResults%","%resources_open%","%resources_remove%","%resources_results%","%resources_showing%","%resources_size%","%resources_type%","%resources_types%","%resources_type_DBL%","%resources_type_ER%","%resources_type_SLR%","%resources_type_XR%","%resources_type_unknown%","%resources_update%"],jm=(e,t)=>{const n=Array.from(new Set(e.map(i=>i.bestLanguageName))),r=new Set(e.filter(i=>i.installed).map(i=>i.bestLanguageName)),o=new Set(t.concat(Array.from(r)));return n.sort((i,l)=>{const c=o.has(i),d=o.has(l);return c&&d?i.localeCompare(l):c?-1:d?1:i.localeCompare(l)}).map(i=>({label:i,value:i,starred:r.has(i)}))},us=(e,t,n)=>a.jsx(fe,{className:"tw-bg-muted",variant:"ghost",onClick:()=>n(e.dblEntryUid,"install"),children:t}),Sm=(e,t,n,r,o,s)=>t.includes(e.dblEntryUid)?a.jsx(fe,{className:"tw-bg-muted",variant:"ghost",children:a.jsx(bt,{className:"tw-h-5 tw-py-[1px]"})}):e.installed?e.updateAvailable?us(e,r,s):a.jsx(je,{className:"tw-my-2 tw-flex tw-h-6 tw-items-center",children:o}):us(e,n,s);function Em({localizedStrings:e,resources:t,isLoadingResources:n,selectedTypes:r,setSelectedTypes:o,selectedLanguages:s,setSelectedLanguages:i,openResource:l,installResource:c,uninstallResource:d,className:u}){const f=e["%resources_action%"],w=e["%resources_any%"],b=e["%resources_dialog_subtitle%"],x=e["%resources_dialog_title%"],m=e["%resources_filterInput%"],h=e["%resources_filterBy%"],N=e["%resources_fullName%"],S=e["%resources_get%"],E=e["%resources_installed%"],j=e["%resources_language%"],v=e["%resources_languages%"],O=e["%resources_loadingResources%"],z=e["%resources_noResults%"],R=e["%resources_open%"],_=e["%resources_remove%"],L=e["%resources_results%"],$=e["%resources_showing%"],I=e["%resources_size%"],M=e["%resources_type%"],H=e["%resources_types%"],F=e["%resources_type_DBL%"],B=e["%resources_type_ER%"],te=e["%resources_type_SLR%"],ae=e["%resources_type_XR%"],se=e["%resources_type_unknown%"],y=e["%resources_update%"],[T,G]=g.useState(!1);g.useEffect(()=>{if(!T){if(s.length>0){G(!0);return}t.length>0&&s.length===0&&(i(Array.from(new Set(t.filter(J=>J.installed===!0).map(J=>J.bestLanguageName)))),G(!0))}},[t,s.length,i,T,G]);const[U,V]=g.useState([]),W=(J,re)=>{if(!c||!d)return;const ye={dblEntryUid:J,action:re==="install"?"installing":"removing"};V(Je=>[...Je,ye]),(re==="install"?c:d)(J).catch(Je=>{console.debug(Q.getErrorMessage(Je))})};g.useEffect(()=>{V(J=>J.filter(re=>{const ye=t.find(Oe=>Oe.dblEntryUid===re.dblEntryUid);return ye?!(re.action==="installing"&&ye.installed||re.action==="removing"&&!ye.installed):!0}))},[t]);const[X,K]=g.useState(""),q=g.useMemo(()=>t.filter(J=>{const re=X.toLowerCase();return J.displayName.toLowerCase().includes(re)||J.fullName.toLowerCase().includes(re)||J.bestLanguageName.toLowerCase().includes(re)}),[t,X]),Z=g.useMemo(()=>[{value:"DBLResource",label:F},{value:"EnhancedResource",label:B},{value:"SourceLanguageResource",label:te},{value:"XmlResource",label:ae}],[F,B,te,ae]),ee=g.useMemo(()=>r.length===0?q:q.filter(J=>r.includes(J.type)),[q,r]),le=g.useMemo(()=>s.length===0?ee:ee.filter(J=>s.includes(J.bestLanguageName)),[s,ee]),[C,ke]=g.useState({key:"bestLanguageName",direction:"ascending"}),D=g.useMemo(()=>[...le].sort((J,re)=>{let ye,Oe;return C.key==="action"?(ye=(J.installed?10:0)+(J.updateAvailable?1:0),Oe=(re.installed?10:0)+(re.updateAvailable?1:0)):(ye=J[C.key],Oe=re[C.key]),ye<Oe?C.direction==="ascending"?-1:1:ye>Oe?C.direction==="ascending"?1:-1:0}),[C.direction,C.key,le]),xe=J=>{const re={key:J,direction:"ascending"};C.key===J&&C.direction==="ascending"&&(re.direction="descending"),ke(re)},Ee=(J,re)=>a.jsx(st,{onClick:()=>xe(J),children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx("div",{className:"tw-font-normal",children:re}),C.key!==J&&a.jsx(Y.ChevronsUpDown,{className:"tw-pl-1",size:16}),C.key===J&&(C.direction==="ascending"?a.jsx(Y.ChevronUp,{className:"tw-pl-1",size:16}):a.jsx(Y.ChevronDown,{className:"tw-pl-1",size:16}))]})}),rt=J=>t.filter(re=>re.type===J.value).length??0,Ce=J=>t.filter(re=>re.bestLanguageName===J.value).length??0;return a.jsx("div",{className:u,children:a.jsxs(Ko,{className:"tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0",children:[a.jsx(Jo,{className:"tw-flex-shrink-0",children:a.jsxs("div",{className:"tw-flex",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-pr-4",children:[a.jsx(Y.BookOpen,{size:36,className:"tw-me-4"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2",children:[a.jsx(Zo,{children:x}),a.jsx(Qo,{className:"tw-mt-1",children:b}),a.jsx(ur,{className:"tw-min-w-72",onSearch:K,placeholder:m})]})]}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1",children:[a.jsx(je,{className:"tw-mb-2 tw-text-muted-foreground",children:h}),a.jsx(lo,{entries:Z,getEntriesCount:rt,selected:r,onChange:o,placeholder:H,icon:a.jsx(Y.Shapes,{}),badgesPlaceholder:w}),a.jsx(lo,{entries:jm(t,s),getEntriesCount:Ce,selected:s,onChange:i,placeholder:v,sortSelected:!0,icon:a.jsx(Y.Globe,{}),badgesPlaceholder:w})]})]})}),a.jsx(ea,{className:"tw-flex-grow tw-overflow-auto",children:n||!t?a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-2",children:[a.jsx(je,{children:O}),a.jsx(bt,{})]}):a.jsx("div",{children:D.length===0?a.jsx("div",{className:"tw-m-4 tw-flex tw-justify-center",children:a.jsx(je,{children:z})}):a.jsxs(en,{stickyHeader:!0,children:[a.jsx(tn,{className:"tw-bg-none",stickyHeader:!0,children:a.jsxs(Ke,{children:[a.jsx(st,{}),a.jsx(st,{}),Ee("fullName",N),Ee("bestLanguageName",j),Ee("type",M),Ee("size",I),Ee("action",f)]})}),a.jsx(nn,{children:D.map(J=>{var re;return a.jsxs(Ke,{children:[a.jsx(Ie,{children:a.jsx(Y.BookOpen,{className:"tw-pr-0",size:18})}),a.jsx(Ie,{children:J.displayName}),a.jsx(Ie,{className:"tw-font-medium",children:J.fullName}),a.jsx(Ie,{children:J.bestLanguageName}),a.jsx(Ie,{children:((re=Z.find(ye=>ye.value===J.type))==null?void 0:re.label)??se}),a.jsx(Ie,{children:J.size}),a.jsx(Ie,{children:a.jsxs("div",{className:"tw-flex tw-justify-between",children:[Sm(J,U.map(ye=>ye.dblEntryUid),S,y,E,W),J.installed&&a.jsxs(Pn,{children:[a.jsx(ir,{asChild:!0,children:a.jsx(fe,{variant:"ghost",children:a.jsx(Y.Ellipsis,{className:"tw-w-4"})})}),a.jsxs(Jt,{align:"start",children:[a.jsx(En,{onClick:()=>l(J.projectId),children:a.jsx("span",{children:R})}),a.jsx(Zt,{}),a.jsx(En,{onClick:()=>W(J.dblEntryUid,"remove"),children:a.jsx("span",{children:_})})]})]})]})})]},J.displayName+J.fullName)})})]})})}),a.jsx(ta,{className:"tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4",children:D.length>0&&a.jsx(je,{className:"tw-font-normal",children:`${$} ${D.length} ${L}`})})]})})}const Tm=(e,t)=>e[t]??t;function Cm({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:l}){const c=Tm(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=g.useState(!1),f=b=>{o&&o(b),r&&r([b,...n.filter(x=>x!==b)]),s&&n.find(x=>x===b)&&s([...n.filter(x=>x!==b)]),u(!1)},w=(b,x)=>{var h,N,S,E,j,v;const m=x!==b?((N=(h=e[b])==null?void 0:h.uiNames)==null?void 0:N[x])??((E=(S=e[b])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return m?`${(j=e[b])==null?void 0:j.autonym} (${m})`:(v=e[b])==null?void 0:v.autonym};return a.jsxs("div",{className:k("pr-twp tw-max-w-sm",l),children:[a.jsxs(Tt,{name:"uiLanguage",value:t,onValueChange:f,open:d,onOpenChange:b=>u(b),children:[a.jsx(ft,{children:a.jsx(Ct,{})}),a.jsx(mt,{className:"tw-z-[250]",children:Object.keys(e).map(b=>a.jsx(ze,{value:b,children:w(b,t)},b))})]}),t!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(je,{className:"tw-ms-3",children:c}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(je,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(b=>w(b,t)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}const Rm=(e,t)=>{g.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},qr=()=>!1,Om=(e,t)=>{const[n]=ar(g.useCallback(async()=>{if(!e)return qr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),qr,{preserveValue:!1});g.useEffect(()=>()=>{n!==qr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>ws.toast});exports.Alert=Ki;exports.AlertDescription=Zi;exports.AlertTitle=Ji;exports.BOOK_SELECTOR_STRING_KEYS=bc;exports.Badge=el;exports.BookChapterControl=dc;exports.BookSelectionMode=Is;exports.BookSelector=vc;exports.Button=fe;exports.Card=Ko;exports.CardContent=ea;exports.CardDescription=Qo;exports.CardFooter=ta;exports.CardHeader=Jo;exports.CardTitle=Zo;exports.ChapterRangeSelector=Ps;exports.Checkbox=cr;exports.Checklist=ud;exports.ComboBox=Zn;exports.DataTable=Vs;exports.DisableButton=hm;exports.DropdownMenu=Pn;exports.DropdownMenuCheckboxItem=lr;exports.DropdownMenuContent=Jt;exports.DropdownMenuGroup=gs;exports.DropdownMenuItem=En;exports.DropdownMenuItemType=il;exports.DropdownMenuLabel=In;exports.DropdownMenuPortal=zl;exports.DropdownMenuRadioGroup=Fl;exports.DropdownMenuRadioItem=co;exports.DropdownMenuSeparator=Zt;exports.DropdownMenuShortcut=xs;exports.DropdownMenuSub=Ll;exports.DropdownMenuSubContent=vs;exports.DropdownMenuSubTrigger=bs;exports.DropdownMenuTrigger=ir;exports.EnableButton=mm;exports.FILTERABLE_RESOURCE_LIST_STRING_KEYS=km;exports.Filter=lo;exports.FilterButton=sl;exports.FilterDropdown=vm;exports.FilterableResourceList=Em;exports.Footer=Nm;exports.GridMenu=Yi;exports.HamburgerMenuButton=Wi;exports.INVENTORY_STRING_KEYS=Cc;exports.IconButton=lm;exports.Input=Pt;exports.InstallButton=fm;exports.Inventory=_c;exports.Label=je;exports.MarkdownRenderer=bm;exports.MenuItem=Wo;exports.MoreInfo=ym;exports.MultiSelectComboBox=qs;exports.NavigationContentSearch=Pc;exports.NoExtensionsFound=xm;exports.RadioGroup=fo;exports.RadioGroupItem=Jn;exports.ScriptureResultsViewer=sd;exports.ScrollGroupSelector=id;exports.SearchBar=ur;exports.Select=Tt;exports.SelectContent=mt;exports.SelectGroup=Ms;exports.SelectItem=ze;exports.SelectLabel=$s;exports.SelectScrollDownButton=No;exports.SelectScrollUpButton=yo;exports.SelectSeparator=As;exports.SelectTrigger=ft;exports.SelectValue=Ct;exports.Separator=pr;exports.SettingsList=ld;exports.SettingsListHeader=dd;exports.SettingsListItem=cd;exports.SettingsSidebar=ni;exports.SettingsSidebarContentSearch=Zc;exports.Slider=tl;exports.Sonner=pm;exports.Spinner=bt;exports.Switch=nl;exports.Table=en;exports.TableBody=nn;exports.TableCaption=Bs;exports.TableCell=Ie;exports.TableFooter=Ds;exports.TableHead=st;exports.TableHeader=tn;exports.TableRow=Ke;exports.Tabs=wm;exports.TabsContent=al;exports.TabsList=rl;exports.TabsTrigger=ol;exports.TextField=cm;exports.ToggleGroup=ko;exports.ToggleGroupItem=xn;exports.Toolbar=dm;exports.UiLanguageSelector=Cm;exports.UpdateButton=gm;exports.VersionHistory=ll;exports.VerticalTabs=jo;exports.VerticalTabsContent=Eo;exports.VerticalTabsList=So;exports.VerticalTabsTrigger=Hs;exports.badgeVariants=Qi;exports.buttonVariants=Ts;exports.cn=k;exports.getBookNumFromId=Ls;exports.getLinesFromUSFM=zs;exports.getNumberFromUSFM=Wr;exports.getStatusForItem=Fs;exports.inventoryCountColumn=Ec;exports.inventoryItemColumn=jc;exports.inventoryStatusColumn=Tc;exports.useEvent=Rm;exports.useEventAsync=Om;exports.usePromise=ar;function _m(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}_m(`*, ::before, ::after {
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
}/*
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
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 90%;
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
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
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
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-right-auto {
  right: auto;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-3 {
  margin-inline-start: 0.75rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-20 {
  margin-top: 5rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1\\/2 {
  height: 50%;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/3 {
  width: 33.333333%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-center {
  align-items: center;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0\\.5 {
  gap: 0.125rem;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pl-1 {
  padding-left: 0.25rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  transition-timing-function: linear;
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
}

.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}

.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}

.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}

.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}

.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}

.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}

.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}

.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}

.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}

.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}

.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}

.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}

.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}

.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}

.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}

.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}

.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}

.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}

.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}

.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}

.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}

.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}

.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}

.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}

.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}

.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}

.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}

@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}

@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}

@media (min-width: 1024px) {

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}

.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}

.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}

.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}

.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}

.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
}

@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}

.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}

.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}

.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}

.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}

.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}

.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}

.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}

.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}

.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}

.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}

.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}

[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}

[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}

[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
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
`,"top");
//# sourceMappingURL=index.cjs.map
