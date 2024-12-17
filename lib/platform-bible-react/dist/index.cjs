"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),g=require("react"),q=require("lucide-react"),st=require("clsx"),vl=require("tailwind-merge"),ds=require("@radix-ui/react-dropdown-menu"),Z=require("platform-bible-utils"),Xt=require("@radix-ui/react-slot"),Yt=require("class-variance-authority"),xl=require("@radix-ui/react-label"),yl=require("@radix-ui/react-radio-group"),Nl=require("@radix-ui/react-popover"),Oe=require("cmdk"),kl=require("@radix-ui/react-dialog"),je=require("@tanstack/react-table"),jl=require("@radix-ui/react-select"),Sl=require("@radix-ui/react-checkbox"),El=require("@radix-ui/react-toggle-group"),Cl=require("@radix-ui/react-toggle"),Tl=require("@radix-ui/react-tabs"),Rl=require("@radix-ui/react-separator"),Ol=require("@radix-ui/react-tooltip"),qr=require("@mui/styled-engine"),De=require("@mui/material"),wn=require("react-dom"),us=require("sonner"),_l=require("@radix-ui/react-slider"),Pl=require("@radix-ui/react-switch"),Il=require("markdown-to-jsx");function ke(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const D=ke(g),we=ke(ds),ps=ke(xl),kn=ke(yl),jn=ke(Nl),Ke=ke(kl),ge=ke(jl),Hr=ke(Sl),sr=ke(El),ws=ke(Cl),_e=ke(Tl),fs=ke(Rl),On=ke(Ol),Ml=ke(wn),fn=ke(_l),Xr=ke(Pl);const $l=vl.extendTailwindMerge({prefix:"tw-"});function N(...e){return $l(st.clsx(e))}const dt=g.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:N("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));dt.displayName="Input";const Al=g.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},s)=>a.jsxs("div",{className:"tw-relative",children:[a.jsx(dt,{...o,type:"text",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:s}),a.jsx(q.History,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var Dl=Object.defineProperty,Bl=(e,t,n)=>t in e?Dl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Bl(e,typeof t!="symbol"?t+"":t,n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],io=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ms=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],fa=Yl();function Wt(e,t=!0){return t&&(e=e.toUpperCase()),e in fa?fa[e]:0}function lo(e){return Wt(e)>0}function Vl(e){const t=typeof e=="string"?Wt(e):e;return t>=40&&t<=66}function zl(e){return(typeof e=="string"?Wt(e):e)<=39}function hs(e){return e<=66}function Ll(e){const t=typeof e=="string"?Wt(e):e;return vs(t)&&!hs(t)}function*Fl(){for(let e=1;e<=kt.length;e++)yield e}const Gl=1,gs=kt.length;function Ul(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function co(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function bs(e){return e<=0||e>gs?"******":ms[e-1]}function ql(e){return bs(Wt(e))}function vs(e){const t=typeof e=="number"?co(e):e;return lo(t)&&!io.includes(t)}function Hl(e){const t=typeof e=="number"?co(e):e;return lo(t)&&io.includes(t)}function Xl(e){return ms[e-1].includes("*obsolete*")}function Yl(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const ie={allBookIds:kt,nonCanonicalIds:io,bookIdToNumber:Wt,isBookIdValid:lo,isBookNT:Vl,isBookOT:zl,isBookOTNT:hs,isBookDC:Ll,allBookNumbers:Fl,firstBook:Gl,lastBook:gs,extraBooks:Ul,bookNumberToId:co,bookNumberToEnglishName:bs,bookIdToEnglishName:ql,isCanonical:vs,isExtraMaterial:Hl,isObsolete:Xl};var Ye=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ye||{});const Ie=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ye[t]):(this._type=t,this.name=Ye[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Ie,"Original",new Ie(Ye.Original)),re(Ie,"Septuagint",new Ie(Ye.Septuagint)),re(Ie,"Vulgate",new Ie(Ye.Vulgate)),re(Ie,"English",new Ie(Ye.English)),re(Ie,"RussianProtestant",new Ie(Ye.RussianProtestant)),re(Ie,"RussianOrthodox",new Ie(Ye.RussianOrthodox));let gt=Ie;function ma(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var xs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(xs||{});const Ee=class se{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof gt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof gt?n:void 0;this.setEmpty(s),this._verseNum=t%se.chapterDigitShifter,this._chapterNum=Math.floor(t%se.bookDigitShifter/se.chapterDigitShifter),this._bookNum=Math.floor(t/se.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof se){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof gt?t:se.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??se.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new se(t),{success:!0,verseRef:n}}catch(r){if(r instanceof ln)return n=new se,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%se.bcvMaxValue*se.bookDigitShifter+(n>=0?n%se.bcvMaxValue*se.chapterDigitShifter:0)+(r>=0?r%se.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new gt(i)),n?new se(n,r.toString(),l,c):new se}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>se.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(se.verseRangeSeparator)||this._verse.includes(se.verseSequenceIndicator))}get book(){return ie.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ie.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=se.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=se.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ie.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new gt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(se.verseRangeSeparators,se.verseSequenceIndicators)}get BBBCCC(){return se.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return se.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new gt(Ye[i])}catch{throw new ln("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ie.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!se.isVerseParseable(r[1]))throw new ln("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new se(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof se?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=se.verseRangeSeparators,r=se.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=ma(this._verse,r);for(const i of s.map(l=>ma(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const m=new se(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(m)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ie.lastBook?2:(ie.isCanonical(this._bookNum),0)}setEmpty(t=se.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ie.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Ee,"defaultVersification",gt.English),re(Ee,"verseRangeSeparator","-"),re(Ee,"verseSequenceIndicator",","),re(Ee,"verseRangeSeparators",[Ee.verseRangeSeparator]),re(Ee,"verseSequenceIndicators",[Ee.verseSequenceIndicator]),re(Ee,"chapterDigitShifter",1e3),re(Ee,"bookDigitShifter",Ee.chapterDigitShifter*Ee.chapterDigitShifter),re(Ee,"bcvMaxValue",Ee.chapterDigitShifter-1),re(Ee,"ValidStatusType",xs);class ln extends Error{}const _n=we.Root,ir=we.Trigger,ys=we.Group,Wl=we.Portal,Kl=we.Sub,Jl=we.RadioGroup,Ns=g.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(we.SubTrigger,{ref:o,className:N("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(q.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ns.displayName=we.SubTrigger.displayName;const ks=g.forwardRef(({className:e,...t},n)=>a.jsx(we.SubContent,{ref:n,className:N("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));ks.displayName=we.SubContent.displayName;const Kt=g.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(we.Portal,{children:a.jsx(we.Content,{ref:r,sideOffset:t,className:N("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n})}));Kt.displayName=we.Content.displayName;const Sn=g.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(we.Item,{ref:r,className:N("tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));Sn.displayName=we.Item.displayName;const lr=g.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(we.CheckboxItem,{ref:o,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(we.ItemIndicator,{children:a.jsx(q.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));lr.displayName=we.CheckboxItem.displayName;const uo=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(we.RadioItem,{ref:r,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(we.ItemIndicator,{children:a.jsx(q.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));uo.displayName=we.RadioItem.displayName;const Jt=g.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(we.Label,{ref:r,className:N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Jt.displayName=we.Label.displayName;const Zt=g.forwardRef(({className:e,...t},n)=>a.jsx(we.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Zt.displayName=we.Separator.displayName;function js({className:e,...t}){return a.jsx("span",{className:N("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}js.displayName="DropdownMenuShortcut";const Zl=g.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(Sn,{ref:l,textValue:e,className:N("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:N("tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-l-red-200":s.toLowerCase()==="ot","tw-border-l-purple-200":s.toLowerCase()==="nt","tw-border-l-indigo-200":s.toLowerCase()==="dc"}),children:ie.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function Ql({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=g.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:N("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:N("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function ec({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return a.jsxs(Jt,{className:"tw-flex tw-justify-between",children:[a.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(q.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(q.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(q.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const bn=ie.allBookIds,tc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ha=["OT","NT","DC"],nc=32+32+32,rc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],oc=e=>({OT:bn.filter(n=>ie.isBookOT(n)),NT:bn.filter(n=>ie.isBookNT(n)),DC:bn.filter(n=>ie.isBookDC(n))})[e],cn=e=>Z.getChaptersForBook(ie.bookIdToNumber(e));function ac(){return bn.map(t=>ie.bookIdToEnglishName(t))}function sc(e){return ac().includes(e)}function ic(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(sc(t))return bn.find(r=>ie.bookIdToEnglishName(r)===t)}function lc({scrRef:e,handleSubmit:t}){const[n,r]=g.useState(""),[o,s]=g.useState(ie.bookNumberToId(e.bookNum)),[i,l]=g.useState(e.chapterNum??0),[c,d]=g.useState(ie.bookNumberToId(e.bookNum)),[u,m]=g.useState(!1),[w,b]=g.useState(u),v=g.useRef(void 0),f=g.useRef(void 0),h=g.useRef(void 0),k=g.useCallback(S=>oc(S).filter(A=>{const $=ie.bookIdToEnglishName(A).toLowerCase(),Q=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(Q)||A.toLowerCase().includes(Q)}),[n]),R=S=>{r(S)},E=g.useRef(!1),j=g.useCallback(S=>{if(E.current){E.current=!1;return}m(S)},[]),x=g.useCallback((S,A,$,Q)=>{if(l(ie.bookNumberToId(e.bookNum)!==S?1:e.chapterNum),A||cn(S)===-1){t({bookNum:ie.bookIdToNumber(S),chapterNum:$||1,verseNum:Q||1}),m(!1),r("");return}s(o!==S?S:""),m(!A)},[t,e.bookNum,e.chapterNum,o]),_=S=>{S<=0||S>cn(o)||x(o,!0,S)},z=g.useCallback(()=>{rc.forEach(S=>{const A=n.match(S);if(A){const[$,Q=void 0,J=void 0]=A.slice(1),H=ic($);(ie.isBookIdValid($)||H)&&x(H??$,!0,Q?parseInt(Q,10):1,J?parseInt(J,10):1)}})},[x,n]),Y=g.useCallback(S=>{u?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(typeof h<"u"&&h.current!==null?h.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),S.preventDefault()):m(!0)},[u]),C=S=>{const{key:A}=S;A==="ArrowRight"||A==="ArrowLeft"||A==="ArrowDown"||A==="ArrowUp"||A==="Enter"||(v.current.dispatchEvent(new KeyboardEvent("keydown",{key:A})),v.current.focus())},O=S=>{const{key:A}=S;if(c===o){if(A==="Enter"){S.preventDefault(),x(o,!0,i);return}let $=0;if(A==="ArrowRight")if(i<cn(c))$=1;else{S.preventDefault();return}else if(A==="ArrowLeft")if(i>1)$=-1;else{S.preventDefault();return}else A==="ArrowDown"?$=6:A==="ArrowUp"&&($=-6);i+$<=0||i+$>cn(c)?l(0):$!==0&&(l(i+$),S.preventDefault())}};return g.useEffect(()=>{o===c?o===ie.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),g.useLayoutEffect(()=>{b(u)},[u]),g.useLayoutEffect(()=>{const S=setTimeout(()=>{if(w&&f.current&&h.current){const $=h.current.offsetTop-nc;f.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(S)}},[w]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(_n,{modal:!1,open:u,onOpenChange:j,children:[a.jsx(ir,{asChild:!0,children:a.jsx(Al,{ref:v,value:n,handleSearch:R,handleKeyDown:Y,handleOnClick:()=>{s(ie.bookNumberToId(e.bookNum)),d(ie.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),m(!0),v.current.focus()},onFocus:()=>{E.current=!0},handleSubmit:z,placeholder:`${ie.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),a.jsxs(Kt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:C,align:"start",ref:f,children:[a.jsx(ec,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ha.map((S,A)=>k(S).length>0&&a.jsxs("div",{children:[a.jsx(Jt,{className:"tw-font-semibold tw-text-foreground/80",children:tc[S]}),k(S).map($=>a.jsx("div",{children:a.jsx(Zl,{bookId:$,handleSelectBook:()=>x($,!1),isSelected:o===$,handleHighlightBook:()=>d($),handleKeyDown:O,bookType:S,ref:Q=>{o===$&&(h.current=Q)},children:a.jsx(Ql,{handleSelectChapter:_,endChapter:cn($),activeChapter:e.bookNum===ie.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:Q=>{l(Q)}})})},$)),ha.length-1!==A?a.jsx(Zt,{}):void 0]},S))]})]})})}const Ss=Yt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=g.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Xt.Slot:"button";return a.jsx(i,{className:N(Ss({variant:t,size:n,className:e})),ref:s,...o})});pe.displayName="Button";const cc=Yt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Ne=g.forwardRef(({className:e,...t},n)=>a.jsx(ps.Root,{ref:n,className:N("pr-twp",cc(),e),...t}));Ne.displayName=ps.Root.displayName;const po=g.forwardRef(({className:e,...t},n)=>a.jsx(kn.Root,{className:N("pr-twp tw-grid tw-gap-2",e),...t,ref:n}));po.displayName=kn.Root.displayName;const Kn=g.forwardRef(({className:e,...t},n)=>a.jsx(kn.Item,{ref:n,className:N("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(kn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(q.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Kn.displayName=kn.Item.displayName;const Es=jn.Root,Cs=jn.Trigger,wo=g.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>a.jsx(jn.Portal,{children:a.jsx(jn.Content,{ref:o,align:t,sideOffset:n,className:N("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));wo.displayName=jn.Content.displayName;const dc=Ke.Portal,Ts=g.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Overlay,{ref:n,className:N("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Ts.displayName=Ke.Overlay.displayName;const uc=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(dc,{children:[a.jsx(Ts,{}),a.jsxs(Ke.Content,{ref:r,className:N("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,children:[t,a.jsxs(Ke.Close,{className:"tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",children:[a.jsx(q.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]}));uc.displayName=Ke.Content.displayName;const pc=g.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Title,{ref:n,className:N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));pc.displayName=Ke.Title.displayName;const wc=g.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Description,{ref:n,className:N("tw-text-sm tw-text-muted-foreground",e),...t}));wc.displayName=Ke.Description.displayName;const fo=g.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command,{ref:n,className:N("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));fo.displayName=Oe.Command.displayName;const mo=g.forwardRef(({className:e,...t},n)=>a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",children:[a.jsx(q.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Oe.Command.Input,{ref:n,className:N("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]}));mo.displayName=Oe.Command.Input.displayName;const ho=g.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.List,{ref:n,className:N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));ho.displayName=Oe.Command.List.displayName;const go=g.forwardRef((e,t)=>a.jsx(Oe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));go.displayName=Oe.Command.Empty.displayName;const Rs=g.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Group,{ref:n,className:N("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Rs.displayName=Oe.Command.Group.displayName;const fc=g.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Separator,{ref:n,className:N("tw--mx-1 tw-h-px tw-bg-border",e),...t}));fc.displayName=Oe.Command.Separator.displayName;const bo=g.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Item,{ref:n,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));bo.displayName=Oe.Command.Item.displayName;function mc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Jn({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=mc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:m="No option found",buttonVariant:w="outline",alignDropDown:b="start",dir:v="ltr",isDisabled:f=!1,...h}){const[k,R]=g.useState(!1);return a.jsxs(Es,{open:k,onOpenChange:R,...h,children:[a.jsx(Cs,{asChild:!0,children:a.jsxs(pe,{variant:w,role:"combobox","aria-expanded":k,id:e,className:N("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:f,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pr-2",children:c}),a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),a.jsx(q.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(wo,{align:b,className:N("tw-w-[200px] tw-p-0",o),dir:v,children:a.jsxs(fo,{children:[a.jsx(mo,{dir:v,placeholder:u,className:"tw-text-inherit"}),a.jsx(go,{children:m}),a.jsx(ho,{children:t.map(E=>a.jsxs(bo,{value:l(E),onSelect:()=>{i(E),R(!1)},children:[a.jsx(q.Check,{className:N("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(E)})}),l(E)]},l(E)))})]})})]})}function Os({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=g.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return a.jsxs(a.Fragment,{children:[a.jsx(Ne,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(Jn,{isDisabled:o,onChange:l,buttonClassName:"tw-ml-2 tw-mr-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),a.jsx(Ne,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(Jn,{isDisabled:o,onChange:c,buttonClassName:"tw-ml-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var _s=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(_s||{});const hc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),_r=(e,t)=>e[t]??t;function gc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=_r(d,"%webView_bookSelector_currentBook%"),m=_r(d,"%webView_bookSelector_choose%"),w=_r(d,"%webView_bookSelector_chooseBooks%"),[b,v]=g.useState("current book"),f=h=>{v(h),e(h)};return a.jsx(po,{className:"pr-twp tw-flex",value:b,onValueChange:h=>f(h),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Kn,{value:"current book"}),a.jsx(Ne,{className:"tw-ml-1",children:u})]}),a.jsx(Ne,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Os,{isDisabled:b==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Kn,{value:"choose books"}),a.jsx(Ne,{className:"tw-ml-1",children:w})]}),a.jsx(Ne,{className:"tw-flex tw-items-center",children:r.map(h=>ie.bookIdToEnglishName(h)).join(", ")}),a.jsx(pe,{disabled:b==="current book",onClick:()=>n(),children:m})]})]})})}function bc({table:e}){return a.jsxs(_n,{children:[a.jsx(ds.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(q.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(Kt,{align:"end",className:"tw-w-[150px]",children:[a.jsx(Jt,{children:"Toggle columns"}),a.jsx(Zt,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(lr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const jt=ge.Root,Ps=ge.Group,St=ge.Value,lt=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ge.Trigger,{ref:r,className:N("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,children:[t,a.jsx(ge.Icon,{asChild:!0,children:a.jsx(q.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]}));lt.displayName=ge.Trigger.displayName;const vo=g.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollUpButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(q.ChevronUp,{className:"tw-h-4 tw-w-4"})}));vo.displayName=ge.ScrollUpButton.displayName;const xo=g.forwardRef(({className:e,...t},n)=>a.jsx(ge.ScrollDownButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(q.ChevronDown,{className:"tw-h-4 tw-w-4"})}));xo.displayName=ge.ScrollDownButton.displayName;const ct=g.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>a.jsx(ge.Portal,{children:a.jsxs(ge.Content,{ref:o,className:N("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(vo,{}),a.jsx(ge.Viewport,{className:N("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t}),a.jsx(xo,{})]})}));ct.displayName=ge.Content.displayName;const Is=g.forwardRef(({className:e,...t},n)=>a.jsx(ge.Label,{ref:n,className:N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Is.displayName=ge.Label.displayName;const Me=g.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(ge.Item,{ref:r,className:N("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(ge.ItemIndicator,{children:a.jsx(q.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(ge.ItemText,{children:t})]}));Me.displayName=ge.Item.displayName;const Ms=g.forwardRef(({className:e,...t},n)=>a.jsx(ge.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Ms.displayName=ge.Separator.displayName;function vc({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(jt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(lt,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(St,{placeholder:e.getState().pagination.pageSize})}),a.jsx(ct,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx(Me,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(q.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(q.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(q.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(q.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Qt=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:N("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:N("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));Qt.displayName="Table";const en=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:N({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));en.displayName="TableHeader";const tn=g.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:N("[&_tr:last-child]:tw-border-0",e),...t}));tn.displayName="TableBody";const $s=g.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));$s.displayName="TableFooter";const Xe=g.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:N("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Xe.displayName="TableRow";const $e=g.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:N("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));$e.displayName="TableHead";const Ce=g.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ce.displayName="TableCell";const As=g.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:N("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));As.displayName="TableCaption";function Ds({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var h;const[l,c]=g.useState([]),[d,u]=g.useState([]),[m,w]=g.useState({}),[b,v]=g.useState({}),f=je.useReactTable({data:t,columns:e,getCoreRowModel:je.getCoreRowModel(),...n&&{getPaginationRowModel:je.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:je.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:je.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:v,state:{sorting:l,columnFilters:d,columnVisibility:m,rowSelection:b}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(bc,{table:f}),a.jsxs(Qt,{stickyHeader:s,children:[a.jsx(en,{stickyHeader:s,children:f.getHeaderGroups().map(k=>a.jsx(Xe,{children:k.headers.map(R=>a.jsx($e,{children:R.isPlaceholder?void 0:je.flexRender(R.column.columnDef.header,R.getContext())},R.id))},k.id))}),a.jsx(tn,{children:(h=f.getRowModel().rows)!=null&&h.length?f.getRowModel().rows.map(k=>a.jsx(Xe,{onClick:()=>i(k,f),"data-state":k.getIsSelected()&&"selected",children:k.getVisibleCells().map(R=>a.jsx(Ce,{children:je.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},k.id)):a.jsx(Xe,{children:a.jsx(Ce,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>f.previousPage(),disabled:!f.getCanPreviousPage(),children:"Previous"}),a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>f.nextPage(),disabled:!f.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(vc,{table:f})]})}function xc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=g.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>Z.deepEqual(c,l))||i.push(l)}),i},[e]);return a.jsxs(Qt,{stickyHeader:!0,children:[a.jsx(en,{stickyHeader:!0,children:a.jsxs(Xe,{children:[a.jsx($e,{children:r}),a.jsx($e,{children:o})]})}),a.jsx(tn,{children:s.length>0&&s.map(i=>a.jsxs(Xe,{onClick:()=>{t(i.reference)},children:[a.jsx(Ce,{children:`${ie.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(Ce,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const cr=g.forwardRef(({className:e,...t},n)=>a.jsx(Hr.Root,{ref:n,className:N("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(Hr.Indicator,{className:N("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(q.Check,{className:"tw-h-4 tw-w-4"})})}));cr.displayName=Hr.Root.displayName;const Bs=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Yr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Vs=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?ie.bookIdToNumber(t[1]):0},zs=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Ls=Yt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),yc=g.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(ws.Root,{ref:o,className:N(Ls({variant:t,size:n,className:e})),...r}));yc.displayName=ws.Root.displayName;const Fs=g.createContext({size:"default",variant:"default"}),yo=g.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>a.jsx(sr.Root,{ref:s,className:N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,children:a.jsx(Fs.Provider,{value:{variant:t,size:n},children:r})}));yo.displayName=sr.Root.displayName;const vn=g.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=g.useContext(Fs);return a.jsx(sr.Item,{ref:s,className:N(Ls({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});vn.displayName=sr.Item.displayName;const dr=e=>e==="asc"?a.jsx(q.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(q.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(q.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Nc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dr(t.getIsSorted())]})}),kc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>a.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,dr(n.getIsSorted())]})}),jc=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,dr(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Pr=(e,t,n,r,o,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Sc=(e,t,n,r,o)=>({accessorKey:"status",header:({column:s})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(pe,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[e,dr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return a.jsxs(yo,{value:i,variant:"outline",type:"single",children:[a.jsx(vn,{onClick:()=>Pr([l],"approved",t,n,r,o),value:"approved",children:a.jsx(q.CircleCheckIcon,{})}),a.jsx(vn,{onClick:()=>Pr([l],"unapproved",t,n,r,o),value:"unapproved",children:a.jsx(q.CircleXIcon,{})}),a.jsx(vn,{onClick:()=>Pr([l],"unknown",t,n,r,o),value:"unknown",children:a.jsx(q.CircleHelpIcon,{})})]})}}),Ec=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Cc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Tc=(e,t,n,r,o)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Bs(e).forEach(u=>{u.startsWith("\\id")&&(i=Vs(u),l=0,c=0),u.startsWith("\\c")&&(l=Yr(u),c=0),u.startsWith("\\v")&&(c=Yr(u),l===0&&(l=t.chapterNum));let m=o.exec(u)??void 0;for(;m;){const w=[];m.forEach(h=>w.push(h));const b=m.index,v=s.find(h=>Z.deepEqual(h.items,w)),f={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:Z.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(v)v.count+=1,v.occurrences.push(f);else{const h={items:w,count:1,status:zs(w[0],n,r),occurrences:[f]};s.push(h)}m=o.exec(u)??void 0}}),s},et=(e,t)=>e[t]??t;function Rc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const m=et(n,"%webView_inventory_all%"),w=et(n,"%webView_inventory_approved%"),b=et(n,"%webView_inventory_unapproved%"),v=et(n,"%webView_inventory_unknown%"),f=et(n,"%webView_inventory_scope_currentBook%"),h=et(n,"%webView_inventory_scope_chapter%"),k=et(n,"%webView_inventory_scope_verse%"),R=et(n,"%webView_inventory_filter_text%"),E=et(n,"%webView_inventory_show_additional_items%"),[j,x]=g.useState(!1),[_,z]=g.useState("all"),[Y,C]=g.useState(""),[O,S]=g.useState([]),A=g.useMemo(()=>l?r instanceof RegExp?Tc(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),$=g.useMemo(()=>{if(j)return A;const y=[];return A.forEach(T=>{const G=T.items[0],U=y.find(B=>B.items[0]===G);U?(U.count+=T.count,U.occurrences=U.occurrences.concat(T.occurrences)):y.push({items:[G],count:T.count,occurrences:T.occurrences,status:T.status})}),y},[j,A]),Q=g.useMemo(()=>Cc($,_,Y),[$,_,Y]),J=g.useMemo(()=>{var G,U;if(!j)return u;const y=(G=o==null?void 0:o.tableHeaders)==null?void 0:G.length;if(!y)return u;const T=[];for(let B=0;B<y;B++)T.push(kc(((U=o==null?void 0:o.tableHeaders)==null?void 0:U[B])||"Additional Item",B+1));return[...T,...u]},[o==null?void 0:o.tableHeaders,u,j]);g.useEffect(()=>{S([])},[Q]);const H=(y,T)=>{T.setRowSelection(()=>{const G={};return G[y.index]=!0,G}),S(y.original.items)},te=y=>{if(y==="book"||y==="chapter"||y==="verse")d(y);else throw new Error(`Invalid scope value: ${y}`)},ae=y=>{if(y==="all"||y==="approved"||y==="unapproved"||y==="unknown")z(y);else throw new Error(`Invalid status filter value: ${y}`)},oe=g.useMemo(()=>{if($.length===0||O.length===0)return[];const y=$.filter(T=>Z.deepEqual(j?T.items:[T.items[0]],O));if(y.length>1)throw new Error("Selected item is not unique");return y[0].occurrences},[O,j,$]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(jt,{onValueChange:y=>ae(y),defaultValue:_,children:[a.jsx(lt,{className:"tw-m-1",children:a.jsx(St,{placeholder:"Select filter"})}),a.jsxs(ct,{children:[a.jsx(Me,{value:"all",children:m}),a.jsx(Me,{value:"approved",children:w}),a.jsx(Me,{value:"unapproved",children:b}),a.jsx(Me,{value:"unknown",children:v})]})]}),a.jsxs(jt,{onValueChange:y=>te(y),defaultValue:c,children:[a.jsx(lt,{className:"tw-m-1",children:a.jsx(St,{placeholder:"Select scope"})}),a.jsxs(ct,{children:[a.jsx(Me,{value:"book",children:f}),a.jsx(Me,{value:"chapter",children:h}),a.jsx(Me,{value:"verse",children:k})]})]}),a.jsx(dt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:R,value:Y,onChange:y=>{C(y.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(cr,{className:"tw-m-1",checked:j,onCheckedChange:y=>{S([]),x(y)}}),a.jsx(Ne,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??E})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Ds,{columns:J,data:Q,onRowClickHandler:H,stickyHeader:!0})}),oe.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(xc,{occurrenceData:oe,setScriptureReference:t,localizedStrings:n})})]})}function Zn({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,m]=g.useState(!1),w=g.useCallback(f=>{r(n.includes(f)?n.filter(h=>h!==f):[...n,f])},[n,r]),b=()=>i||o,v=g.useMemo(()=>{if(!l)return e;const f=e.filter(k=>k.starred).sort((k,R)=>k.label.localeCompare(R.label)),h=e.filter(k=>!k.starred).sort((k,R)=>{const E=n.includes(k.value),j=n.includes(R.value);return E&&!j?-1:!E&&j?1:k.label.localeCompare(R.label)});return[...f,...h]},[e,n,l]);return a.jsx("div",{className:d,children:a.jsxs(Es,{open:u,onOpenChange:m,children:[a.jsx(Cs,{asChild:!0,children:a.jsxs(pe,{variant:"outline",role:"combobox","aria-expanded":u,className:N("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:N({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:b()})]}),a.jsx(q.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(wo,{align:"start",className:"tw-w-full tw-p-0",children:a.jsxs(fo,{children:[a.jsx(mo,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(ho,{children:[a.jsx(go,{children:s}),a.jsx(Rs,{children:v.map(f=>{const h=t?t(f):void 0;return a.jsxs(bo,{value:f.value,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(q.Check,{className:N("tw-h-4 tw-w-4",n.includes(f.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:f.starred&&a.jsx(q.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:f.label}),t&&a.jsx("div",{className:"tw-w-10 tw-text-right tw-text-muted-foreground",children:h})]},f.value)})})]})]})})]})})}function No({onSearch:e,placeholder:t,isFullWidth:n,className:r}){const[o,s]=g.useState(""),i=l=>{s(l),e(l)};return a.jsxs("div",{className:"tw-relative",children:[a.jsx(q.Search,{className:"tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50"}),a.jsx(dt,{className:N("tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",{"tw-w-full":n},{"tw-pe-9":o},r),placeholder:t,value:o,onChange:l=>i(l.target.value)}),o&&a.jsxs(pe,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",children:[a.jsx(q.X,{className:"tw-h-4 tw-w-4",onClick:()=>{i("")}}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const ko=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.Root,{orientation:"vertical",ref:n,className:N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t}));ko.displayName=_e.List.displayName;const jo=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.List,{ref:n,className:N("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));jo.displayName=_e.List.displayName;const Gs=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,...t,className:N("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),So=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));So.displayName=_e.Content.displayName;function Oc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1,direction:s="ltr"}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?a.jsx("h1",{children:r}):"",a.jsx(No,{isFullWidth:o,onSearch:t,placeholder:n})]}),a.jsxs(ko,{dir:s,children:[a.jsx(jo,{children:e.map(i=>a.jsx(Gs,{value:i.value,children:i.value},i.key))}),e.map(i=>a.jsx(So,{value:i.value,children:i.content},i.key))]})]})}const ur=g.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(fs.Root,{ref:o,decorative:n,orientation:t,className:N("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));ur.displayName=fs.Root.displayName;function ga({className:e,...t}){return a.jsx("div",{className:N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const _c=On.Provider,Pc=On.Root,Ic=On.Trigger,Us=g.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(On.Content,{ref:r,sideOffset:t,className:N("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Us.displayName=On.Content.displayName;const Mc="16rem",$c="3rem",qs=g.createContext(void 0);function pr(){const e=g.useContext(qs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Hs=g.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:s,...i},l)=>{const[c,d]=g.useState(e),u=t??c,m=g.useCallback(f=>{const h=typeof f=="function"?f(u):f;n?n(h):d(h)},[n,u]),w=g.useCallback(()=>m(f=>!f),[m]),b=u?"expanded":"collapsed",v=g.useMemo(()=>({state:b,open:u,setOpen:m,toggleSidebar:w}),[b,u,m,w]);return a.jsx(qs.Provider,{value:v,children:a.jsx(_c,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Mc,"--sidebar-width-icon":$c,...o},className:N("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:l,...i,children:s})})})});Hs.displayName="SidebarProvider";const Xs=g.forwardRef(({side:e="left",variant:t="sidebar",collapsible:n="offcanvas",className:r,children:o,...s},i)=>{const{state:l}=pr();return n==="none"?a.jsx("div",{className:N("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):a.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l,"data-collapsible":l==="collapsed"?n:"","data-variant":t,"data-side":e,children:[a.jsx("div",{className:N("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=right]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:N("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",e==="left"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=left]:tw-border-r group-data-[side=right]:tw-border-l",r),...s,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});Xs.displayName="Sidebar";const Ac=g.forwardRef(({className:e,onClick:t,...n},r)=>{const{toggleSidebar:o}=pr();return a.jsxs(pe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:N("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),o()},...n,children:[a.jsx(q.PanelLeft,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ac.displayName="SidebarTrigger";const Dc=g.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=pr();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:N("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=left]:tw--right-4 group-data-[side=right]:tw-left-0 sm:tw-flex","[[data-side=left]_&]:tw-cursor-w-resize [[data-side=right]_&]:tw-cursor-e-resize","[[data-side=left][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=left][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=right][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Dc.displayName="SidebarRail";const Ys=g.forwardRef(({className:e,...t},n)=>a.jsx("main",{ref:n,className:N("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));Ys.displayName="SidebarInset";const Bc=g.forwardRef(({className:e,...t},n)=>a.jsx(dt,{ref:n,"data-sidebar":"input",className:N("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));Bc.displayName="SidebarInput";const Vc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Vc.displayName="SidebarHeader";const zc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));zc.displayName="SidebarFooter";const Lc=g.forwardRef(({className:e,...t},n)=>a.jsx(ur,{ref:n,"data-sidebar":"separator",className:N("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));Lc.displayName="SidebarSeparator";const Ws=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:N("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));Ws.displayName="SidebarContent";const Wr=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));Wr.displayName="SidebarGroup";const Kr=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Xt.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:N("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});Kr.displayName="SidebarGroupLabel";const Fc=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Xt.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:N("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});Fc.displayName="SidebarGroupAction";const Jr=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:N("tw-w-full tw-text-sm",e),...t}));Jr.displayName="SidebarGroupContent";const Ks=g.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));Ks.displayName="SidebarMenu";const Js=g.forwardRef(({className:e,...t},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:N("tw-group/menu-item tw-relative",e),...t}));Js.displayName="SidebarMenuItem";const Gc=Yt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Zs=g.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=e?Xt.Slot:"button",{state:d}=pr(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:N(Gc({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(Pc,{children:[a.jsx(Ic,{asChild:!0,children:u}),a.jsx(Us,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});Zs.displayName="SidebarMenuButton";const Uc=g.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},o)=>{const s=t?Xt.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:N("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});Uc.displayName="SidebarMenuAction";const qc=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:N("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));qc.displayName="SidebarMenuBadge";const Hc=g.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const o=g.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&a.jsx(ga,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(ga,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Hc.displayName="SidebarMenuSkeleton";const Xc=g.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:N("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Xc.displayName="SidebarMenuSub";const Yc=g.forwardRef(({...e},t)=>a.jsx("li",{ref:t,...e}));Yc.displayName="SidebarMenuSubItem";const Wc=g.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...o},s)=>{const i=e?Xt.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:N("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});Wc.displayName="SidebarMenuSubButton";function Qs({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=g.useCallback((m,w)=>{r(m,w)},[r]),d=g.useCallback(m=>{const w=n.find(b=>b.projectId===m);return w?w.projectName:m},[n]),u=g.useCallback(m=>!o.projectId&&m===o.label,[o]);return a.jsx(Xs,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:a.jsxs(Ws,{children:[a.jsxs(Wr,{children:[a.jsx(Kr,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(Jr,{children:a.jsx(Ks,{children:t.map(m=>a.jsx(Js,{children:a.jsx(Zs,{className:N("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(m)}),onClick:()=>c(m),isActive:u(m),children:a.jsx("span",{className:"tw-pl-3",children:m})})},m))})})]}),a.jsxs(Wr,{children:[a.jsx(Kr,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(Jr,{className:"tw-pl-3",children:a.jsx(Jn,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(m=>m.projectId),getOptionLabel:m=>d(m),buttonPlaceholder:l,onChange:m=>{const w=d(m);c(w,m)},value:(o==null?void 0:o.projectId)??void 0})})]})]})})}function Kc({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,onSearch:i,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(No,{className:"tw-w-9/12",onSearch:i,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(Hs,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[a.jsx(Qs,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}),a.jsx(Ys,{className:"tw-overflow-y-auto",children:r})]})]})}const at="scrBook",Jc="scrRef",bt="source",Zc="details",Qc="Scripture Reference",ed="Scripture Book",ei="Type",td="Details";function nd(e,t){const n=t??!1;return[{accessorFn:r=>`${ie.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:at,header:(e==null?void 0:e.scriptureReferenceColumnName)??Qc,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ie.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===at?Z.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Z.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Z.formatScrRef(r.start),id:Jc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Z.formatScrRef(o.start)},sortingFn:(r,o)=>Z.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:bt,header:n?(e==null?void 0:e.typeColumnName)??ei:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Zc,header:(e==null?void 0:e.detailsColumnName)??td,cell:r=>r.getValue(),enableGrouping:!1}]}const rd=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||Z.compareScrRefs(e.start,e.end)===0?`${Z.scrRefToBBBCCCVVV(e.start)}+${t}`:`${Z.scrRefToBBBCCCVVV(e.start)}+${t}-${Z.scrRefToBBBCCCVVV(e.end)}+${n}`},ba=e=>`${rd({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function od({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[d,u]=g.useState([]),[m,w]=g.useState([{id:at,desc:!1}]),[b,v]=g.useState({}),f=g.useMemo(()=>e.flatMap(C=>C.data.map(O=>({...O,source:C.source}))),[e]),h=g.useMemo(()=>nd({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);g.useEffect(()=>{d.includes(bt)?w([{id:bt,desc:!1},{id:at,desc:!1}]):w([{id:at,desc:!1}])},[d]);const k=je.useReactTable({data:f,columns:h,state:{grouping:d,sorting:m,rowSelection:b},onGroupingChange:u,onSortingChange:w,onRowSelectionChange:v,getExpandedRowModel:je.getExpandedRowModel(),getGroupedRowModel:je.getGroupedRowModel(),getCoreRowModel:je.getCoreRowModel(),getSortedRowModel:je.getSortedRowModel(),getRowId:ba,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});g.useEffect(()=>{if(l){const C=k.getSelectedRowModel().rowsById,O=Object.keys(C);if(O.length===1){const S=f.find(A=>ba(A)===O[0])||void 0;S&&l(S)}}},[b,f,l,k]);const R=o??ed,E=s??ei,j=[{label:"No Grouping",value:[]},{label:`Group by ${R}`,value:[at]},{label:`Group by ${E}`,value:[bt]},{label:`Group by ${R} and ${E}`,value:[at,bt]},{label:`Group by ${E} and ${R}`,value:[bt,at]}],x=C=>{u(JSON.parse(C))},_=(C,O)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(O)},z=(C,O)=>C.getIsGrouped()?"":N("banded-row",O%2===0?"even":"odd"),Y=(C,O,S)=>{if(!((C==null?void 0:C.length)===0||O.depth<S.column.getGroupedIndex())){if(O.getIsGrouped())switch(O.depth){case 1:return"tw-ps-4";default:return}switch(O.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(jt,{value:JSON.stringify(d),onValueChange:C=>{x(C)},children:[a.jsx(lt,{className:"tw-mb-1 tw-mt-2",children:a.jsx(St,{})}),a.jsx(ct,{position:"item-aligned",children:a.jsx(Ps,{children:j.map(C=>a.jsx(Me,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),a.jsxs(Qt,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(en,{children:k.getHeaderGroups().map(C=>a.jsx(Xe,{children:C.headers.filter(O=>O.column.columnDef.header).map(O=>a.jsx($e,{colSpan:O.colSpan,className:"top-0 tw-sticky",children:O.isPlaceholder?void 0:a.jsxs("div",{children:[O.column.getCanGroup()?a.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${O.column.columnDef.header}`,onClick:O.column.getToggleGroupingHandler(),type:"button",children:O.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",je.flexRender(O.column.columnDef.header,O.getContext())]})},O.id))},C.id))}),a.jsx(tn,{children:k.getRowModel().rows.map((C,O)=>a.jsx(Xe,{"data-state":C.getIsSelected()?"selected":"",className:N(z(C,O)),onClick:S=>_(C,S),children:C.getVisibleCells().map(S=>{if(!(S.getIsPlaceholder()||S.column.columnDef.enableGrouping&&!S.getIsGrouped()&&(S.column.columnDef.id!==bt||!n)))return a.jsx(Ce,{className:N(S.column.columnDef.id,"tw-p-[1px]",Y(d,C,S)),children:(()=>S.getIsGrouped()?a.jsxs(pe,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&a.jsx(q.ChevronDown,{}),!C.getIsExpanded()&&(c==="ltr"?a.jsx(q.ChevronRight,{}):a.jsx(q.ChevronLeft,{}))," ",je.flexRender(S.column.columnDef.cell,S.getContext())," (",C.subRows.length,")"]}):je.flexRender(S.column.columnDef.cell,S.getContext()))()},S.id)})},C.id))})]})]})}const Ir={[Z.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[Z.getLocalizeKeyForScrollGroupId(0)]:"A",[Z.getLocalizeKeyForScrollGroupId(1)]:"B",[Z.getLocalizeKeyForScrollGroupId(2)]:"C",[Z.getLocalizeKeyForScrollGroupId(3)]:"D",[Z.getLocalizeKeyForScrollGroupId(4)]:"E",[Z.getLocalizeKeyForScrollGroupId(5)]:"F",[Z.getLocalizeKeyForScrollGroupId(6)]:"G",[Z.getLocalizeKeyForScrollGroupId(7)]:"H",[Z.getLocalizeKeyForScrollGroupId(8)]:"I",[Z.getLocalizeKeyForScrollGroupId(9)]:"J",[Z.getLocalizeKeyForScrollGroupId(10)]:"K",[Z.getLocalizeKeyForScrollGroupId(11)]:"L",[Z.getLocalizeKeyForScrollGroupId(12)]:"M",[Z.getLocalizeKeyForScrollGroupId(13)]:"N",[Z.getLocalizeKeyForScrollGroupId(14)]:"O",[Z.getLocalizeKeyForScrollGroupId(15)]:"P",[Z.getLocalizeKeyForScrollGroupId(16)]:"Q",[Z.getLocalizeKeyForScrollGroupId(17)]:"R",[Z.getLocalizeKeyForScrollGroupId(18)]:"S",[Z.getLocalizeKeyForScrollGroupId(19)]:"T",[Z.getLocalizeKeyForScrollGroupId(20)]:"U",[Z.getLocalizeKeyForScrollGroupId(21)]:"V",[Z.getLocalizeKeyForScrollGroupId(22)]:"W",[Z.getLocalizeKeyForScrollGroupId(23)]:"X",[Z.getLocalizeKeyForScrollGroupId(24)]:"Y",[Z.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ad({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={...Ir,...Object.fromEntries(Object.entries(r).map(([s,i])=>[s,s===i&&s in Ir?Ir[s]:i]))};return a.jsxs(jt,{value:`${t}`,onValueChange:s=>n(s==="undefined"?void 0:parseInt(s,10)),children:[a.jsx(lt,{className:"pr-twp tw-w-auto",children:a.jsx(St,{placeholder:o[Z.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(ct,{style:{zIndex:250},children:e.map(s=>a.jsx(Me,{value:`${s}`,children:o[Z.getLocalizeKeyForScrollGroupId(s)]},`${s}`))})]})}function sd({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function id({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function ld({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(ur,{}):""]})}function cd({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(cr,{className:"tw-mr-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(Ne,{children:s?s(i):i})]},i))})}function dd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ud(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var Eo={},ti={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ti);var pd=ti.exports,Mr={};function Co(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},I.apply(this,arguments)}function yt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ni(e){if(!yt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ni(e[n])}),t}function tt(e,t,n={clone:!0}){const r=n.clone?I({},e):e;return yt(e)&&yt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(yt(t[o])&&o in e&&yt(e[o])?r[o]=tt(e[o],t[o],n):n.clone?r[o]=yt(t[o])?ni(t[o]):t[o]:r[o]=t[o])}),r}var Zr={exports:{}},Fn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var va;function wd(){if(va)return le;va=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function E(x){if(typeof x=="object"&&x!==null){var _=x.$$typeof;switch(_){case t:switch(x=x.type,x){case c:case d:case r:case s:case o:case m:return x;default:switch(x=x&&x.$$typeof,x){case l:case u:case v:case b:case i:return x;default:return _}}case n:return _}}}function j(x){return E(x)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=i,le.Element=t,le.ForwardRef=u,le.Fragment=r,le.Lazy=v,le.Memo=b,le.Portal=n,le.Profiler=s,le.StrictMode=o,le.Suspense=m,le.isAsyncMode=function(x){return j(x)||E(x)===c},le.isConcurrentMode=j,le.isContextConsumer=function(x){return E(x)===l},le.isContextProvider=function(x){return E(x)===i},le.isElement=function(x){return typeof x=="object"&&x!==null&&x.$$typeof===t},le.isForwardRef=function(x){return E(x)===u},le.isFragment=function(x){return E(x)===r},le.isLazy=function(x){return E(x)===v},le.isMemo=function(x){return E(x)===b},le.isPortal=function(x){return E(x)===n},le.isProfiler=function(x){return E(x)===s},le.isStrictMode=function(x){return E(x)===o},le.isSuspense=function(x){return E(x)===m},le.isValidElementType=function(x){return typeof x=="string"||typeof x=="function"||x===r||x===d||x===s||x===o||x===m||x===w||typeof x=="object"&&x!==null&&(x.$$typeof===v||x.$$typeof===b||x.$$typeof===i||x.$$typeof===l||x.$$typeof===u||x.$$typeof===h||x.$$typeof===k||x.$$typeof===R||x.$$typeof===f)},le.typeOf=E,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xa;function fd(){return xa||(xa=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,m=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,R=e?Symbol.for("react.scope"):60119;function E(P){return typeof P=="string"||typeof P=="function"||P===r||P===d||P===s||P===o||P===m||P===w||typeof P=="object"&&P!==null&&(P.$$typeof===v||P.$$typeof===b||P.$$typeof===i||P.$$typeof===l||P.$$typeof===u||P.$$typeof===h||P.$$typeof===k||P.$$typeof===R||P.$$typeof===f)}function j(P){if(typeof P=="object"&&P!==null){var be=P.$$typeof;switch(be){case t:var F=P.type;switch(F){case c:case d:case r:case s:case o:case m:return F;default:var xe=F&&F.$$typeof;switch(xe){case l:case u:case v:case b:case i:return xe;default:return be}}case n:return be}}}var x=c,_=d,z=l,Y=i,C=t,O=u,S=r,A=v,$=b,Q=n,J=s,H=o,te=m,ae=!1;function oe(P){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),y(P)||j(P)===c}function y(P){return j(P)===d}function T(P){return j(P)===l}function G(P){return j(P)===i}function U(P){return typeof P=="object"&&P!==null&&P.$$typeof===t}function B(P){return j(P)===u}function V(P){return j(P)===r}function W(P){return j(P)===v}function K(P){return j(P)===b}function X(P){return j(P)===n}function M(P){return j(P)===s}function L(P){return j(P)===o}function ee(P){return j(P)===m}ce.AsyncMode=x,ce.ConcurrentMode=_,ce.ContextConsumer=z,ce.ContextProvider=Y,ce.Element=C,ce.ForwardRef=O,ce.Fragment=S,ce.Lazy=A,ce.Memo=$,ce.Portal=Q,ce.Profiler=J,ce.StrictMode=H,ce.Suspense=te,ce.isAsyncMode=oe,ce.isConcurrentMode=y,ce.isContextConsumer=T,ce.isContextProvider=G,ce.isElement=U,ce.isForwardRef=B,ce.isFragment=V,ce.isLazy=W,ce.isMemo=K,ce.isPortal=X,ce.isProfiler=M,ce.isStrictMode=L,ce.isSuspense=ee,ce.isValidElementType=E,ce.typeOf=j}()),ce}var ya;function ri(){return ya||(ya=1,process.env.NODE_ENV==="production"?Fn.exports=wd():Fn.exports=fd()),Fn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var $r,Na;function md(){if(Na)return $r;Na=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return $r=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var m in l)t.call(l,m)&&(c[m]=l[m]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},$r}var Ar,ka;function To(){if(ka)return Ar;ka=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ar=e,Ar}var Dr,ja;function oi(){return ja||(ja=1,Dr=Function.call.bind(Object.prototype.hasOwnProperty)),Dr}var Br,Sa;function hd(){if(Sa)return Br;Sa=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=To(),n={},r=oi();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var m;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}m=s[u](i,u,c,l,null,t)}catch(v){m=v}if(m&&!(m instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof m+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),m instanceof Error&&!(m.message in n)){n[m.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+m.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Br=o,Br}var Vr,Ea;function gd(){if(Ea)return Vr;Ea=1;var e=ri(),t=md(),n=To(),r=oi(),o=hd(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Vr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function m(y){var T=y&&(d&&y[d]||y[u]);if(typeof T=="function")return T}var w="<<anonymous>>",b={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:R(),arrayOf:E,element:j(),elementType:x(),instanceOf:_,node:O(),objectOf:Y,oneOf:z,oneOfType:C,shape:A,exact:$};function v(y,T){return y===T?y!==0||1/y===1/T:y!==y&&T!==T}function f(y,T){this.message=y,this.data=T&&typeof T=="object"?T:{},this.stack=""}f.prototype=Error.prototype;function h(y){if(process.env.NODE_ENV!=="production")var T={},G=0;function U(V,W,K,X,M,L,ee){if(X=X||w,L=L||K,ee!==n){if(c){var P=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw P.name="Invariant Violation",P}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var be=X+":"+K;!T[be]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+L+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),T[be]=!0,G++)}}return W[K]==null?V?W[K]===null?new f("The "+M+" `"+L+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new f("The "+M+" `"+L+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:y(W,K,X,M,L)}var B=U.bind(null,!1);return B.isRequired=U.bind(null,!0),B}function k(y){function T(G,U,B,V,W,K){var X=G[U],M=H(X);if(M!==y){var L=te(X);return new f("Invalid "+V+" `"+W+"` of type "+("`"+L+"` supplied to `"+B+"`, expected ")+("`"+y+"`."),{expectedType:y})}return null}return h(T)}function R(){return h(i)}function E(y){function T(G,U,B,V,W){if(typeof y!="function")return new f("Property `"+W+"` of component `"+B+"` has invalid PropType notation inside arrayOf.");var K=G[U];if(!Array.isArray(K)){var X=H(K);return new f("Invalid "+V+" `"+W+"` of type "+("`"+X+"` supplied to `"+B+"`, expected an array."))}for(var M=0;M<K.length;M++){var L=y(K,M,B,V,W+"["+M+"]",n);if(L instanceof Error)return L}return null}return h(T)}function j(){function y(T,G,U,B,V){var W=T[G];if(!l(W)){var K=H(W);return new f("Invalid "+B+" `"+V+"` of type "+("`"+K+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return h(y)}function x(){function y(T,G,U,B,V){var W=T[G];if(!e.isValidElementType(W)){var K=H(W);return new f("Invalid "+B+" `"+V+"` of type "+("`"+K+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return h(y)}function _(y){function T(G,U,B,V,W){if(!(G[U]instanceof y)){var K=y.name||w,X=oe(G[U]);return new f("Invalid "+V+" `"+W+"` of type "+("`"+X+"` supplied to `"+B+"`, expected ")+("instance of `"+K+"`."))}return null}return h(T)}function z(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function T(G,U,B,V,W){for(var K=G[U],X=0;X<y.length;X++)if(v(K,y[X]))return null;var M=JSON.stringify(y,function(ee,P){var be=te(P);return be==="symbol"?String(P):P});return new f("Invalid "+V+" `"+W+"` of value `"+String(K)+"` "+("supplied to `"+B+"`, expected one of "+M+"."))}return h(T)}function Y(y){function T(G,U,B,V,W){if(typeof y!="function")return new f("Property `"+W+"` of component `"+B+"` has invalid PropType notation inside objectOf.");var K=G[U],X=H(K);if(X!=="object")return new f("Invalid "+V+" `"+W+"` of type "+("`"+X+"` supplied to `"+B+"`, expected an object."));for(var M in K)if(r(K,M)){var L=y(K,M,B,V,W+"."+M,n);if(L instanceof Error)return L}return null}return h(T)}function C(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var T=0;T<y.length;T++){var G=y[T];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ae(G)+" at index "+T+"."),i}function U(B,V,W,K,X){for(var M=[],L=0;L<y.length;L++){var ee=y[L],P=ee(B,V,W,K,X,n);if(P==null)return null;P.data&&r(P.data,"expectedType")&&M.push(P.data.expectedType)}var be=M.length>0?", expected one of type ["+M.join(", ")+"]":"";return new f("Invalid "+K+" `"+X+"` supplied to "+("`"+W+"`"+be+"."))}return h(U)}function O(){function y(T,G,U,B,V){return Q(T[G])?null:new f("Invalid "+B+" `"+V+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return h(y)}function S(y,T,G,U,B){return new f((y||"React class")+": "+T+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+B+"`.")}function A(y){function T(G,U,B,V,W){var K=G[U],X=H(K);if(X!=="object")return new f("Invalid "+V+" `"+W+"` of type `"+X+"` "+("supplied to `"+B+"`, expected `object`."));for(var M in y){var L=y[M];if(typeof L!="function")return S(B,V,W,M,te(L));var ee=L(K,M,B,V,W+"."+M,n);if(ee)return ee}return null}return h(T)}function $(y){function T(G,U,B,V,W){var K=G[U],X=H(K);if(X!=="object")return new f("Invalid "+V+" `"+W+"` of type `"+X+"` "+("supplied to `"+B+"`, expected `object`."));var M=t({},G[U],y);for(var L in M){var ee=y[L];if(r(y,L)&&typeof ee!="function")return S(B,V,W,L,te(ee));if(!ee)return new f("Invalid "+V+" `"+W+"` key `"+L+"` supplied to `"+B+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(y),null,"  "));var P=ee(K,L,B,V,W+"."+L,n);if(P)return P}return null}return h(T)}function Q(y){switch(typeof y){case"number":case"string":case"undefined":return!0;case"boolean":return!y;case"object":if(Array.isArray(y))return y.every(Q);if(y===null||l(y))return!0;var T=m(y);if(T){var G=T.call(y),U;if(T!==y.entries){for(;!(U=G.next()).done;)if(!Q(U.value))return!1}else for(;!(U=G.next()).done;){var B=U.value;if(B&&!Q(B[1]))return!1}}else return!1;return!0;default:return!1}}function J(y,T){return y==="symbol"?!0:T?T["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&T instanceof Symbol:!1}function H(y){var T=typeof y;return Array.isArray(y)?"array":y instanceof RegExp?"object":J(T,y)?"symbol":T}function te(y){if(typeof y>"u"||y===null)return""+y;var T=H(y);if(T==="object"){if(y instanceof Date)return"date";if(y instanceof RegExp)return"regexp"}return T}function ae(y){var T=te(y);switch(T){case"array":case"object":return"an "+T;case"boolean":case"date":case"regexp":return"a "+T;default:return T}}function oe(y){return!y.constructor||!y.constructor.name?w:y.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Vr}var zr,Ca;function bd(){if(Ca)return zr;Ca=1;var e=To();function t(){}function n(){}return n.resetWarningCache=t,zr=function(){function r(i,l,c,d,u,m){if(m!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},zr}if(process.env.NODE_ENV!=="production"){var vd=ri(),xd=!0;Zr.exports=gd()(vd.isElement,xd)}else Zr.exports=bd()();var yd=Zr.exports;const p=dd(yd);function Nd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ai(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Nd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const si=Co(p.element,ai);si.isRequired=Co(p.element.isRequired,ai);const ii=si,kd="exact-prop: ​";function jd(e){return process.env.NODE_ENV==="production"?e:I({},e,{[kd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Lt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Qr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function Sd(){if(Ta)return de;Ta=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function f(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case n:case o:case r:case d:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case i:case c:case w:case m:case s:return h;default:return k}}case t:return k}}}return de.ContextConsumer=i,de.ContextProvider=s,de.Element=e,de.ForwardRef=c,de.Fragment=n,de.Lazy=w,de.Memo=m,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=d,de.SuspenseList=u,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(h){return f(h)===i},de.isContextProvider=function(h){return f(h)===s},de.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},de.isForwardRef=function(h){return f(h)===c},de.isFragment=function(h){return f(h)===n},de.isLazy=function(h){return f(h)===w},de.isMemo=function(h){return f(h)===m},de.isPortal=function(h){return f(h)===t},de.isProfiler=function(h){return f(h)===o},de.isStrictMode=function(h){return f(h)===r},de.isSuspense=function(h){return f(h)===d},de.isSuspenseList=function(h){return f(h)===u},de.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===o||h===r||h===d||h===u||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===w||h.$$typeof===m||h.$$typeof===s||h.$$typeof===i||h.$$typeof===c||h.$$typeof===v||h.getModuleId!==void 0)},de.typeOf=f,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ra;function Ed(){return Ra||(Ra=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,f=!1,h=!1,k=!1,R=!1,E;E=Symbol.for("react.module.reference");function j(F){return!!(typeof F=="string"||typeof F=="function"||F===n||F===o||R||F===r||F===d||F===u||k||F===b||v||f||h||typeof F=="object"&&F!==null&&(F.$$typeof===w||F.$$typeof===m||F.$$typeof===s||F.$$typeof===i||F.$$typeof===c||F.$$typeof===E||F.getModuleId!==void 0))}function x(F){if(typeof F=="object"&&F!==null){var xe=F.$$typeof;switch(xe){case e:var qe=F.type;switch(qe){case n:case o:case r:case d:case u:return qe;default:var ft=qe&&qe.$$typeof;switch(ft){case l:case i:case c:case w:case m:case s:return ft;default:return xe}}case t:return xe}}}var _=i,z=s,Y=e,C=c,O=n,S=w,A=m,$=t,Q=o,J=r,H=d,te=u,ae=!1,oe=!1;function y(F){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function T(F){return oe||(oe=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(F){return x(F)===i}function U(F){return x(F)===s}function B(F){return typeof F=="object"&&F!==null&&F.$$typeof===e}function V(F){return x(F)===c}function W(F){return x(F)===n}function K(F){return x(F)===w}function X(F){return x(F)===m}function M(F){return x(F)===t}function L(F){return x(F)===o}function ee(F){return x(F)===r}function P(F){return x(F)===d}function be(F){return x(F)===u}ue.ContextConsumer=_,ue.ContextProvider=z,ue.Element=Y,ue.ForwardRef=C,ue.Fragment=O,ue.Lazy=S,ue.Memo=A,ue.Portal=$,ue.Profiler=Q,ue.StrictMode=J,ue.Suspense=H,ue.SuspenseList=te,ue.isAsyncMode=y,ue.isConcurrentMode=T,ue.isContextConsumer=G,ue.isContextProvider=U,ue.isElement=B,ue.isForwardRef=V,ue.isFragment=W,ue.isLazy=K,ue.isMemo=X,ue.isPortal=M,ue.isProfiler=L,ue.isStrictMode=ee,ue.isSuspense=P,ue.isSuspenseList=be,ue.isValidElementType=j,ue.typeOf=x}()),ue}process.env.NODE_ENV==="production"?Qr.exports=Sd():Qr.exports=Ed();var Oa=Qr.exports;const Cd=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Td(e){const t=`${e}`.match(Cd);return t&&t[1]||""}function li(e,t=""){return e.displayName||e.name||Td(e)||t}function _a(e,t,n){const r=li(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Rd(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return li(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Oa.ForwardRef:return _a(e,e.render,"ForwardRef");case Oa.Memo:return _a(e,e.type,"memo");default:return}}}function En(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Od=p.oneOfType([p.func,p.object]),ci=Od;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Lt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function _d(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Pd(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Id(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Md(e,t){var n,r;return D.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Qn(e){return e&&e.ownerDocument||document}function $d(e){return Qn(e).defaultView||window}function Ad(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?I({},t.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const m=d||i,w=n==null?void 0:n[m];if(w){const b=w(s,i,l,c,d,...u);if(b)return b}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${m}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function er(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Dd=typeof window<"u"?D.useLayoutEffect:D.useEffect,Ft=Dd;let Pa=0;function Bd(e){const[t,n]=D.useState(e),r=e||t;return D.useEffect(()=>{t==null&&(Pa+=1,n(`mui-${Pa}`))},[t]),r}const Ia=D["useId".toString()];function di(e){if(Ia!==void 0){const t=Ia();return e??t}return Bd(e)}function Vd(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function ui({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=D.useRef(e!==void 0),[s,i]=D.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){D.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=D.useRef(t);D.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=D.useCallback(d=>{o||i(d)},[]);return[l,c]}function eo(e){const t=D.useRef(e);return Ft(()=>{t.current=e}),D.useRef((...n)=>(0,t.current)(...n)).current}function Et(...e){return D.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{er(n,t)})},e)}const Ma={};function zd(e,t){const n=D.useRef(Ma);return n.current===Ma&&(n.current=e(t)),n}const Ld=[];function Fd(e){D.useEffect(e,Ld)}class Pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function mn(){const e=zd(Pn.create).current;return Fd(e.disposeEffect),e}let wr=!0,to=!1;const Gd=new Pn,Ud={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function qd(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Ud[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Hd(e){e.metaKey||e.altKey||e.ctrlKey||(wr=!0)}function Lr(){wr=!1}function Xd(){this.visibilityState==="hidden"&&to&&(wr=!0)}function Yd(e){e.addEventListener("keydown",Hd,!0),e.addEventListener("mousedown",Lr,!0),e.addEventListener("pointerdown",Lr,!0),e.addEventListener("touchstart",Lr,!0),e.addEventListener("visibilitychange",Xd,!0)}function Wd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return wr||qd(t)}function pi(){const e=D.useCallback(o=>{o!=null&&Yd(o.ownerDocument)},[]),t=D.useRef(!1);function n(){return t.current?(to=!0,Gd.start(100,()=>{to=!1}),t.current=!1,!0):!1}function r(o){return Wd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function wi(e,t){const n=I({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=I({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=I({},s),Object.keys(o).forEach(i=>{n[r][i]=wi(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Ro(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const $a=e=>e,Kd=()=>{let e=$a;return{configure(t){e=t},generate(t){return e(t)},reset(){e=$a}}},Jd=Kd(),fi=Jd,mi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function fr(e,t,n="Mui"){const r=mi[t];return r?`${n}-${r}`:`${fi.generate(e)}-${t}`}function hi(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=fr(e,o,n)}),r}function Zd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ye(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Qd=["values","unit","step"],eu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>I({},n,{[r.key]:r.val}),{})};function tu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ye(e,Qd),s=eu(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,b){const v=i.indexOf(b);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(v!==-1&&typeof t[i[v]]=="number"?t[i[v]]:b)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function m(w){const b=i.indexOf(w);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return I({keys:i,values:s,up:l,down:c,between:d,only:u,not:m,unit:n},o)}const nu={borderRadius:4},ru=nu,ou=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},ut=ou;function xn(e,t){return t?tt(e,t,{clone:!1}):e}const Oo={xs:0,sm:600,md:900,lg:1200,xl:1536},Aa={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Oo[e]}px)`};function nt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Aa;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Aa;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Oo).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function au(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function su(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function mr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function tr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=mr(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=mr(c,r)||{};return nt(i,l,m=>{let w=tr(d,o,m);return m===w&&typeof m=="string"&&(w=tr(d,o,`${t}${m==="default"?"":Je(m)}`,m)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:ut}:{},s.filterProps=[t],s}function iu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const lu={m:"margin",p:"padding"},cu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Da={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},du=iu(e=>{if(e.length>2)if(Da[e])e=Da[e];else return[e];const[t,n]=e.split(""),r=lu[t],o=cu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),hr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],gr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],uu=[...hr,...gr];function In(e,t,n,r){var o;const s=(o=mr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function gi(e){return In(e,"spacing",8,"spacing")}function Mn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function pu(e,t){return n=>e.reduce((r,o)=>(r[o]=Mn(t,n),r),{})}function wu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=du(n),s=pu(o,r),i=e[n];return nt(e,i,s)}function bi(e,t){const n=gi(e.theme);return Object.keys(e).map(r=>wu(e,t,r,n)).reduce(xn,{})}function me(e){return bi(e,hr)}me.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,t)=>(e[t]=ut,e),{}):{};me.filterProps=hr;function he(e){return bi(e,gr)}he.propTypes=process.env.NODE_ENV!=="production"?gr.reduce((e,t)=>(e[t]=ut,e),{}):{};he.filterProps=gr;process.env.NODE_ENV!=="production"&&uu.reduce((e,t)=>(e[t]=ut,e),{});function fu(e=8){if(e.mui)return e;const t=gi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function br(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?xn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function ze(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const mu=Ue("border",ze),hu=Ue("borderTop",ze),gu=Ue("borderRight",ze),bu=Ue("borderBottom",ze),vu=Ue("borderLeft",ze),xu=Ue("borderColor"),yu=Ue("borderTopColor"),Nu=Ue("borderRightColor"),ku=Ue("borderBottomColor"),ju=Ue("borderLeftColor"),Su=Ue("outline",ze),Eu=Ue("outlineColor"),vr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=In(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Mn(t,r)});return nt(e,e.borderRadius,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ut}:{};vr.filterProps=["borderRadius"];br(mu,hu,gu,bu,vu,xu,yu,Nu,ku,ju,vr,Su,Eu);const xr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=In(e.theme,"spacing",8,"gap"),n=r=>({gap:Mn(t,r)});return nt(e,e.gap,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{gap:ut}:{};xr.filterProps=["gap"];const yr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=In(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Mn(t,r)});return nt(e,e.columnGap,n)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ut}:{};yr.filterProps=["columnGap"];const Nr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=In(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Mn(t,r)});return nt(e,e.rowGap,n)}return null};Nr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ut}:{};Nr.filterProps=["rowGap"];const Cu=ve({prop:"gridColumn"}),Tu=ve({prop:"gridRow"}),Ru=ve({prop:"gridAutoFlow"}),Ou=ve({prop:"gridAutoColumns"}),_u=ve({prop:"gridAutoRows"}),Pu=ve({prop:"gridTemplateColumns"}),Iu=ve({prop:"gridTemplateRows"}),Mu=ve({prop:"gridTemplateAreas"}),$u=ve({prop:"gridArea"});br(xr,yr,Nr,Cu,Tu,Ru,Ou,_u,Pu,Iu,Mu,$u);function zt(e,t){return t==="grey"?t:e}const Au=ve({prop:"color",themeKey:"palette",transform:zt}),Du=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:zt}),Bu=ve({prop:"backgroundColor",themeKey:"palette",transform:zt});br(Au,Du,Bu);function Ae(e){return e<=1&&e!==0?`${e*100}%`:e}const Vu=ve({prop:"width",transform:Ae}),_o=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Oo[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:Ae(n)}};return nt(e,e.maxWidth,t)}return null};_o.filterProps=["maxWidth"];const zu=ve({prop:"minWidth",transform:Ae}),Lu=ve({prop:"height",transform:Ae}),Fu=ve({prop:"maxHeight",transform:Ae}),Gu=ve({prop:"minHeight",transform:Ae});ve({prop:"size",cssProperty:"width",transform:Ae});ve({prop:"size",cssProperty:"height",transform:Ae});const Uu=ve({prop:"boxSizing"});br(Vu,_o,zu,Lu,Fu,Gu,Uu);const qu={border:{themeKey:"borders",transform:ze},borderTop:{themeKey:"borders",transform:ze},borderRight:{themeKey:"borders",transform:ze},borderBottom:{themeKey:"borders",transform:ze},borderLeft:{themeKey:"borders",transform:ze},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ze},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:vr},color:{themeKey:"palette",transform:zt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:zt},backgroundColor:{themeKey:"palette",transform:zt},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:xr},rowGap:{style:Nr},columnGap:{style:yr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ae},maxWidth:{style:_o},minWidth:{transform:Ae},height:{transform:Ae},maxHeight:{transform:Ae},minHeight:{transform:Ae},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Po=qu;function Hu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Xu(e,t){return typeof e=="function"?e(t):e}function Yu(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:m}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=mr(o,d)||{};return m?m(i):nt(i,r,v=>{let f=tr(w,u,v);return v===f&&typeof v=="string"&&(f=tr(w,u,`${n}${v==="default"?"":Je(v)}`,v)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:Po;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=au(s.breakpoints),m=Object.keys(u);let w=u;return Object.keys(d).forEach(b=>{const v=Xu(d[b],s);if(v!=null)if(typeof v=="object")if(i[b])w=xn(w,e(b,v,s,i));else{const f=nt({theme:s},v,h=>({[b]:h}));Hu(f,v)?w[b]=t({sx:v,theme:s}):w=xn(w,f)}else w=xn(w,e(b,v,s,i))}),su(m,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const vi=Yu();vi.filterProps=["sx"];const Io=vi;function Wu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Ku=["breakpoints","palette","spacing","shape"];function Mo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=ye(e,Ku),l=tu(n),c=fu(o);let d=tt({breakpoints:l,direction:"ltr",components:{},palette:I({mode:"light"},r),spacing:c,shape:I({},ru,s)},i);return d.applyStyles=Wu,d=t.reduce((u,m)=>tt(u,m),d),d.unstable_sxConfig=I({},Po,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(m){return Io({sx:m,theme:this})},d}function Ju(e){return Object.keys(e).length===0}function xi(e=null){const t=D.useContext(qr.ThemeContext);return!t||Ju(t)?e:t}const Zu=Mo();function yi(e=Zu){return xi(e)}const Qu=["ownerState"],ep=["variants"],tp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function np(e){return Object.keys(e).length===0}function rp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Xn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const op=Mo(),Ba=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Gn({defaultTheme:e,theme:t,themeId:n}){return np(t)?e:t[n]||t}function ap(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=ye(t,Qu);const o=typeof e=="function"?e(I({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Yn(s,I({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ye(o,ep);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(I({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(I({ownerState:n},r,n)):c.style))}),l}return o}function sp(e={}){const{themeId:t,defaultTheme:n=op,rootShouldForwardProp:r=Xn,slotShouldForwardProp:o=Xn}=e,s=i=>Io(I({},i,{theme:Gn(I({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{qr.internal_processStyles(i,x=>x.filter(_=>!(_!=null&&_.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:m,overridesResolver:w=ap(Ba(d))}=l,b=ye(l,tp),v=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,f=m||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${Ba(d||"Root")}`);let k=Xn;d==="Root"||d==="root"?k=r:d?k=o:rp(i)&&(k=void 0);const R=qr(i,I({shouldForwardProp:k,label:h},b)),E=x=>typeof x=="function"&&x.__emotion_real!==x||yt(x)?_=>Yn(x,I({},_,{theme:Gn({theme:_.theme,defaultTheme:n,themeId:t})})):x,j=(x,..._)=>{let z=E(x);const Y=_?_.map(E):[];c&&w&&Y.push(S=>{const A=Gn(I({},S,{defaultTheme:n,themeId:t}));if(!A.components||!A.components[c]||!A.components[c].styleOverrides)return null;const $=A.components[c].styleOverrides,Q={};return Object.entries($).forEach(([J,H])=>{Q[J]=Yn(H,I({},S,{theme:A}))}),w(S,Q)}),c&&!v&&Y.push(S=>{var A;const $=Gn(I({},S,{defaultTheme:n,themeId:t})),Q=$==null||(A=$.components)==null||(A=A[c])==null?void 0:A.variants;return Yn({variants:Q},I({},S,{theme:$}))}),f||Y.push(s);const C=Y.length-_.length;if(Array.isArray(x)&&C>0){const S=new Array(C).fill("");z=[...x,...S],z.raw=[...x.raw,...S]}const O=R(z,...Y);if(process.env.NODE_ENV!=="production"){let S;c&&(S=`${c}${Je(d||"")}`),S===void 0&&(S=`Styled(${Rd(i)})`),O.displayName=S}return i.muiName&&(O.muiName=i.muiName),O};return R.withConfig&&(j.withConfig=R.withConfig),j}}function ip(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:wi(t.components[n].defaultProps,r)}function lp({props:e,name:t,defaultTheme:n,themeId:r}){let o=yi(n);return r&&(o=o[r]||o),ip({theme:o,name:t,props:e})}function $o(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Zd(e,t,n)}function cp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ct(e){if(e.type)return e;if(e.charAt(0)==="#")return Ct(cp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Lt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Lt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function kr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function dp(e){e=Ct(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),kr({type:l,values:c})}function Va(e){e=Ct(e);let t=e.type==="hsl"||e.type==="hsla"?Ct(dp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function za(e,t){const n=Va(e),r=Va(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Ni(e,t){return e=Ct(e),t=$o(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,kr(e)}function up(e,t){if(e=Ct(e),t=$o(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return kr(e)}function pp(e,t){if(e=Ct(e),t=$o(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return kr(e)}function wp(e,t){return I({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const fp={black:"#000",white:"#fff"},Cn=fp,mp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},hp=mp,gp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},It=gp,bp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Mt=bp,vp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},dn=vp,xp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},$t=xp,yp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},At=yp,Np={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dt=Np,kp=["mode","contrastThreshold","tonalOffset"],La={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Cn.white,default:Cn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Fr={text:{primary:Cn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Cn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Fa(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=pp(e.main,o):t==="dark"&&(e.dark=up(e.main,s)))}function jp(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[700],light:$t[400],dark:$t[800]}}function Sp(e="light"){return e==="dark"?{main:It[200],light:It[50],dark:It[400]}:{main:It[500],light:It[300],dark:It[700]}}function Ep(e="light"){return e==="dark"?{main:Mt[500],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function Cp(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[700],light:At[500],dark:At[900]}}function Tp(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[800],light:Dt[500],dark:Dt[900]}}function Rp(e="light"){return e==="dark"?{main:dn[400],light:dn[300],dark:dn[700]}:{main:"#ed6c02",light:dn[500],dark:dn[900]}}function Op(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ye(e,kp),s=e.primary||jp(t),i=e.secondary||Sp(t),l=e.error||Ep(t),c=e.info||Cp(t),d=e.success||Tp(t),u=e.warning||Rp(t);function m(f){const h=za(f,Fr.text.primary)>=n?Fr.text.primary:La.text.primary;if(process.env.NODE_ENV!=="production"){const k=za(f,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const w=({color:f,name:h,mainShade:k=500,lightShade:R=300,darkShade:E=700})=>{if(f=I({},f),!f.main&&f[k]&&(f.main=f[k]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:Lt(11,h?` (${h})`:"",k));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Lt(12,h?` (${h})`:"",JSON.stringify(f.main)));return Fa(f,"light",R,r),Fa(f,"dark",E,r),f.contrastText||(f.contrastText=m(f.main)),f},b={dark:Fr,light:La};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),tt(I({common:I({},Cn),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:hp,contrastThreshold:n,getContrastText:m,augmentColor:w,tonalOffset:r},b[t]),o)}const _p=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Pp(e){return Math.round(e*1e5)/1e5}const Ga={textTransform:"uppercase"},Ua='"Roboto", "Helvetica", "Arial", sans-serif';function Ip(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ua,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:m}=n,w=ye(n,_p);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=m||(k=>`${k/d*b}rem`),f=(k,R,E,j,x)=>I({fontFamily:r,fontWeight:k,fontSize:v(R),lineHeight:E},r===Ua?{letterSpacing:`${Pp(j/R)}em`}:{},x,u),h={h1:f(s,96,1.167,-1.5),h2:f(s,60,1.2,-.5),h3:f(i,48,1.167,0),h4:f(i,34,1.235,.25),h5:f(i,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(i,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(i,16,1.5,.15),body2:f(i,14,1.43,.15),button:f(l,14,1.75,.4,Ga),caption:f(i,12,1.66,.4),overline:f(i,12,2.66,1,Ga),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return tt(I({htmlFontSize:d,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},h),w,{clone:!1})}const Mp=.2,$p=.14,Ap=.12;function fe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Mp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$p})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ap})`].join(",")}const Dp=["none",fe(0,2,1,-1,0,1,1,0,0,1,3,0),fe(0,3,1,-2,0,2,2,0,0,1,5,0),fe(0,3,3,-2,0,3,4,0,0,1,8,0),fe(0,2,4,-1,0,4,5,0,0,1,10,0),fe(0,3,5,-1,0,5,8,0,0,1,14,0),fe(0,3,5,-1,0,6,10,0,0,1,18,0),fe(0,4,5,-2,0,7,10,1,0,2,16,1),fe(0,5,5,-3,0,8,10,1,0,3,14,2),fe(0,5,6,-3,0,9,12,1,0,3,16,2),fe(0,6,6,-3,0,10,14,1,0,4,18,3),fe(0,6,7,-4,0,11,15,1,0,4,20,3),fe(0,7,8,-4,0,12,17,2,0,5,22,4),fe(0,7,8,-4,0,13,19,2,0,5,24,4),fe(0,7,9,-4,0,14,21,2,0,5,26,4),fe(0,8,9,-5,0,15,22,2,0,6,28,5),fe(0,8,10,-5,0,16,24,2,0,6,30,5),fe(0,8,11,-5,0,17,26,2,0,6,32,5),fe(0,9,11,-5,0,18,28,2,0,7,34,6),fe(0,9,12,-6,0,19,29,2,0,7,36,6),fe(0,10,13,-6,0,20,31,3,0,8,38,7),fe(0,10,13,-6,0,21,33,3,0,8,40,7),fe(0,10,14,-6,0,22,35,3,0,8,42,7),fe(0,11,14,-7,0,23,36,3,0,9,44,8),fe(0,11,15,-7,0,24,38,3,0,9,46,8)],Bp=Dp,Vp=["duration","easing","delay"],zp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Lp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function qa(e){return`${Math.round(e)}ms`}function Fp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Gp(e){const t=I({},zp,e.easing),n=I({},Lp,e.duration);return I({getAutoHeightDuration:Fp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=ye(s,Vp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",m=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!m(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!m(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:qa(i)} ${l} ${typeof c=="string"?c:qa(c)}`).join(",")}},e,{easing:t,duration:n})}const Up={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},qp=Up,Hp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Xp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=ye(e,Hp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Lt(18));const l=Op(r),c=Mo(e);let d=tt(c,{mixins:wp(c.breakpoints,n),palette:l,shadows:Bp.slice(),typography:Ip(l,s),transitions:Gp(o),zIndex:I({},qp)});if(d=tt(d,i),d=t.reduce((u,m)=>tt(u,m),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],m=(w,b)=>{let v;for(v in w){const f=w[v];if(u.indexOf(v)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const h=fr("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[v]={}}}};Object.keys(d.components).forEach(w=>{const b=d.components[w].styleOverrides;b&&w.indexOf("Mui")===0&&m(b,w)})}return d.unstable_sxConfig=I({},Po,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(m){return Io({sx:m,theme:this})},d}const Yp=Xp(),Ao=Yp,Do="$$material";function Bo({props:e,name:t}){return lp({props:e,name:t,defaultTheme:Ao,themeId:Do})}const Wp=e=>Xn(e)&&e!=="classes",Kp=sp({themeId:Do,defaultTheme:Ao,rootShouldForwardProp:Wp}),$n=Kp;function Jp(e){return fr("MuiSvgIcon",e)}hi("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Zp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Qp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return Ro(o,Jp,r)},ew=$n("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,u,m,w,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(m=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?m:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),Vo=D.forwardRef(function(t,n){const r=Bo({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:m,viewBox:w="0 0 24 24"}=r,b=ye(r,Zp),v=D.isValidElement(o)&&o.type==="svg",f=I({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:v}),h={};u||(h.viewBox=w);const k=Qp(f);return a.jsxs(ew,I({as:l,className:st(k.root,s),focusable:"false",color:d,"aria-hidden":m?void 0:!0,role:m?"img":void 0,ref:n},h,b,v&&o.props,{ownerState:f,children:[v?o.props.children:o,m?a.jsx("title",{children:m}):null]}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});Vo.muiName="SvgIcon";const Ha=Vo;function ki(e,t){function n(r,o){return a.jsx(Ha,I({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=Ha.muiName,D.memo(D.forwardRef(n))}const tw={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),fi.configure(e)}},nw=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:_d,createSvgIcon:ki,debounce:Pd,deprecatedPropType:Id,isMuiElement:Md,ownerDocument:Qn,ownerWindow:$d,requirePropFactory:Ad,setRef:er,unstable_ClassNameGenerator:tw,unstable_useEnhancedEffect:Ft,unstable_useId:di,unsupportedProp:Vd,useControlled:ui,useEventCallback:eo,useForkRef:Et,useIsFocusVisible:pi},Symbol.toStringTag,{value:"Module"})),rw=ud(nw);var Xa;function ow(){return Xa||(Xa=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=rw}(Mr)),Mr}var aw=pd;Object.defineProperty(Eo,"__esModule",{value:!0});var ji=Eo.default=void 0,sw=aw(ow()),iw=a;ji=Eo.default=(0,sw.default)((0,iw.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function lw(e){return typeof e=="string"}function hn(e,t,n){return e===void 0||lw(e)?t:I({},t,{ownerState:I({},t.ownerState,n)})}const cw={disableDefaultClasses:!1},dw=D.createContext(cw);function uw(e){const{disableDefaultClasses:t}=D.useContext(dw);return n=>t?"":e(n)}function pw(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function ww(e,t,n){return typeof e=="function"?e(t,n):e}function Ya(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function fw(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=st(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),v=I({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=I({},n,o,r);return b.length>0&&(f.className=b),Object.keys(v).length>0&&(f.style=v),{props:f,internalRef:void 0}}const i=pw(I({},o,r)),l=Ya(r),c=Ya(o),d=t(i),u=st(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),m=I({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=I({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(m).length>0&&(w.style=m),{props:w,internalRef:d.ref}}const mw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function hw(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=ye(e,mw),l=s?{}:ww(r,o),{props:c,internalRef:d}=fw(I({},i,{externalSlotProps:l})),u=Et(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return hn(n,I({},c,{ref:u}),o)}const Si="base";function gw(e){return`${Si}--${e}`}function bw(e,t){return`${Si}-${e}-${t}`}function Ei(e,t){const n=mi[t];return n?gw(n):bw(e,t)}function vw(e,t){const n={};return t.forEach(r=>{n[r]=Ei(e,r)}),n}function xw(e){return typeof e=="function"?e():e}const nr=D.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=D.useState(null),c=Et(D.isValidElement(r)?r.ref:null,n);if(Ft(()=>{s||l(xw(o)||document.body)},[o,s]),Ft(()=>{if(i&&!s)return er(n,i),()=>{er(n,null)}},[n,i,s]),s){if(D.isValidElement(r)){const d={ref:c};return D.cloneElement(r,d)}return a.jsx(D.Fragment,{children:r})}return a.jsx(D.Fragment,{children:i&&Ml.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(nr.propTypes={children:p.node,container:p.oneOfType([En,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(nr["propTypes"]=jd(nr.propTypes));var Te="top",Fe="bottom",Ge="right",Re="left",zo="auto",An=[Te,Fe,Ge,Re],Gt="start",Tn="end",yw="clippingParents",Ci="viewport",un="popper",Nw="reference",Wa=An.reduce(function(e,t){return e.concat([t+"-"+Gt,t+"-"+Tn])},[]),Ti=[].concat(An,[zo]).reduce(function(e,t){return e.concat([t,t+"-"+Gt,t+"-"+Tn])},[]),kw="beforeRead",jw="read",Sw="afterRead",Ew="beforeMain",Cw="main",Tw="afterMain",Rw="beforeWrite",Ow="write",_w="afterWrite",Pw=[kw,jw,Sw,Ew,Cw,Tw,Rw,Ow,_w];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function Be(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Tt(e){var t=Be(e).Element;return e instanceof t||e instanceof Element}function Le(e){var t=Be(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Lo(e){if(typeof ShadowRoot>"u")return!1;var t=Be(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Iw(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!Le(s)||!Ze(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Mw(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Le(o)||!Ze(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const $w={name:"applyStyles",enabled:!0,phase:"write",fn:Iw,effect:Mw,requires:["computeStyles"]};function We(e){return e.split("-")[0]}var Nt=Math.max,rr=Math.min,Ut=Math.round;function no(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ri(){return!/^((?!chrome|android).)*safari/i.test(no())}function qt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&Le(e)&&(o=e.offsetWidth>0&&Ut(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ut(r.height)/e.offsetHeight||1);var i=Tt(e)?Be(e):window,l=i.visualViewport,c=!Ri()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,m=r.width/o,w=r.height/s;return{width:m,height:w,top:u,right:d+m,bottom:u+w,left:d,x:d,y:u}}function Fo(e){var t=qt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Oi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Lo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rt(e){return Be(e).getComputedStyle(e)}function Aw(e){return["table","td","th"].indexOf(Ze(e))>=0}function pt(e){return((Tt(e)?e.ownerDocument:e.document)||window.document).documentElement}function jr(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(Lo(e)?e.host:null)||pt(e)}function Ka(e){return!Le(e)||rt(e).position==="fixed"?null:e.offsetParent}function Dw(e){var t=/firefox/i.test(no()),n=/Trident/i.test(no());if(n&&Le(e)){var r=rt(e);if(r.position==="fixed")return null}var o=jr(e);for(Lo(o)&&(o=o.host);Le(o)&&["html","body"].indexOf(Ze(o))<0;){var s=rt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Dn(e){for(var t=Be(e),n=Ka(e);n&&Aw(n)&&rt(n).position==="static";)n=Ka(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&rt(n).position==="static")?t:n||Dw(e)||t}function Go(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function yn(e,t,n){return Nt(e,rr(t,n))}function Bw(e,t,n){var r=yn(e,t,n);return r>n?n:r}function _i(){return{top:0,right:0,bottom:0,left:0}}function Pi(e){return Object.assign({},_i(),e)}function Ii(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Vw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Pi(typeof t!="number"?t:Ii(t,An))};function zw(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=We(n.placement),c=Go(l),d=[Re,Ge].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var m=Vw(o.padding,n),w=Fo(s),b=c==="y"?Te:Re,v=c==="y"?Fe:Ge,f=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],h=i[c]-n.rects.reference[c],k=Dn(s),R=k?c==="y"?k.clientHeight||0:k.clientWidth||0:0,E=f/2-h/2,j=m[b],x=R-w[u]-m[v],_=R/2-w[u]/2+E,z=yn(j,_,x),Y=c;n.modifiersData[r]=(t={},t[Y]=z,t.centerOffset=z-_,t)}}function Lw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Oi(t.elements.popper,o)&&(t.elements.arrow=o))}const Fw={name:"arrow",enabled:!0,phase:"main",fn:zw,effect:Lw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ht(e){return e.split("-")[1]}var Gw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Uw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ut(n*o)/o||0,y:Ut(r*o)/o||0}}function Ja(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,m=e.isFixed,w=i.x,b=w===void 0?0:w,v=i.y,f=v===void 0?0:v,h=typeof u=="function"?u({x:b,y:f}):{x:b,y:f};b=h.x,f=h.y;var k=i.hasOwnProperty("x"),R=i.hasOwnProperty("y"),E=Re,j=Te,x=window;if(d){var _=Dn(n),z="clientHeight",Y="clientWidth";if(_===Be(n)&&(_=pt(n),rt(_).position!=="static"&&l==="absolute"&&(z="scrollHeight",Y="scrollWidth")),_=_,o===Te||(o===Re||o===Ge)&&s===Tn){j=Fe;var C=m&&_===x&&x.visualViewport?x.visualViewport.height:_[z];f-=C-r.height,f*=c?1:-1}if(o===Re||(o===Te||o===Fe)&&s===Tn){E=Ge;var O=m&&_===x&&x.visualViewport?x.visualViewport.width:_[Y];b-=O-r.width,b*=c?1:-1}}var S=Object.assign({position:l},d&&Gw),A=u===!0?Uw({x:b,y:f},Be(n)):{x:b,y:f};if(b=A.x,f=A.y,c){var $;return Object.assign({},S,($={},$[j]=R?"0":"",$[E]=k?"0":"",$.transform=(x.devicePixelRatio||1)<=1?"translate("+b+"px, "+f+"px)":"translate3d("+b+"px, "+f+"px, 0)",$))}return Object.assign({},S,(t={},t[j]=R?f+"px":"",t[E]=k?b+"px":"",t.transform="",t))}function qw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:We(t.placement),variation:Ht(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ja(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ja(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Hw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:qw,data:{}};var Un={passive:!0};function Xw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Be(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Un)}),l&&c.addEventListener("resize",n.update,Un),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Un)}),l&&c.removeEventListener("resize",n.update,Un)}}const Yw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Xw,data:{}};var Ww={left:"right",right:"left",bottom:"top",top:"bottom"};function Wn(e){return e.replace(/left|right|bottom|top/g,function(t){return Ww[t]})}var Kw={start:"end",end:"start"};function Za(e){return e.replace(/start|end/g,function(t){return Kw[t]})}function Uo(e){var t=Be(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function qo(e){return qt(pt(e)).left+Uo(e).scrollLeft}function Jw(e,t){var n=Be(e),r=pt(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Ri();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+qo(e),y:c}}function Zw(e){var t,n=pt(e),r=Uo(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=Nt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=Nt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+qo(e),c=-r.scrollTop;return rt(o||n).direction==="rtl"&&(l+=Nt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function Ho(e){var t=rt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Mi(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:Le(e)&&Ho(e)?e:Mi(jr(e))}function Nn(e,t){var n;t===void 0&&(t=[]);var r=Mi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=Be(r),i=o?[s].concat(s.visualViewport||[],Ho(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(Nn(jr(i)))}function ro(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Qw(e,t){var n=qt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Qa(e,t,n){return t===Ci?ro(Jw(e,n)):Tt(t)?Qw(t,n):ro(Zw(pt(e)))}function ef(e){var t=Nn(jr(e)),n=["absolute","fixed"].indexOf(rt(e).position)>=0,r=n&&Le(e)?Dn(e):e;return Tt(r)?t.filter(function(o){return Tt(o)&&Oi(o,r)&&Ze(o)!=="body"}):[]}function tf(e,t,n,r){var o=t==="clippingParents"?ef(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=Qa(e,d,r);return c.top=Nt(u.top,c.top),c.right=rr(u.right,c.right),c.bottom=rr(u.bottom,c.bottom),c.left=Nt(u.left,c.left),c},Qa(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function $i(e){var t=e.reference,n=e.element,r=e.placement,o=r?We(r):null,s=r?Ht(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Te:c={x:i,y:t.y-n.height};break;case Fe:c={x:i,y:t.y+t.height};break;case Ge:c={x:t.x+t.width,y:l};break;case Re:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Go(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case Gt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case Tn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function Rn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?yw:l,d=n.rootBoundary,u=d===void 0?Ci:d,m=n.elementContext,w=m===void 0?un:m,b=n.altBoundary,v=b===void 0?!1:b,f=n.padding,h=f===void 0?0:f,k=Pi(typeof h!="number"?h:Ii(h,An)),R=w===un?Nw:un,E=e.rects.popper,j=e.elements[v?R:w],x=tf(Tt(j)?j:j.contextElement||pt(e.elements.popper),c,u,i),_=qt(e.elements.reference),z=$i({reference:_,element:E,strategy:"absolute",placement:o}),Y=ro(Object.assign({},E,z)),C=w===un?Y:_,O={top:x.top-C.top+k.top,bottom:C.bottom-x.bottom+k.bottom,left:x.left-C.left+k.left,right:C.right-x.right+k.right},S=e.modifiersData.offset;if(w===un&&S){var A=S[o];Object.keys(O).forEach(function($){var Q=[Ge,Fe].indexOf($)>=0?1:-1,J=[Te,Fe].indexOf($)>=0?"y":"x";O[$]+=A[J]*Q})}return O}function nf(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Ti:c,u=Ht(r),m=u?l?Wa:Wa.filter(function(v){return Ht(v)===u}):An,w=m.filter(function(v){return d.indexOf(v)>=0});w.length===0&&(w=m);var b=w.reduce(function(v,f){return v[f]=Rn(e,{placement:f,boundary:o,rootBoundary:s,padding:i})[We(f)],v},{});return Object.keys(b).sort(function(v,f){return b[v]-b[f]})}function rf(e){if(We(e)===zo)return[];var t=Wn(e);return[Za(e),t,Za(t)]}function of(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,m=n.rootBoundary,w=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,f=n.allowedAutoPlacements,h=t.options.placement,k=We(h),R=k===h,E=c||(R||!v?[Wn(h)]:rf(h)),j=[h].concat(E).reduce(function(B,V){return B.concat(We(V)===zo?nf(t,{placement:V,boundary:u,rootBoundary:m,padding:d,flipVariations:v,allowedAutoPlacements:f}):V)},[]),x=t.rects.reference,_=t.rects.popper,z=new Map,Y=!0,C=j[0],O=0;O<j.length;O++){var S=j[O],A=We(S),$=Ht(S)===Gt,Q=[Te,Fe].indexOf(A)>=0,J=Q?"width":"height",H=Rn(t,{placement:S,boundary:u,rootBoundary:m,altBoundary:w,padding:d}),te=Q?$?Ge:Re:$?Fe:Te;x[J]>_[J]&&(te=Wn(te));var ae=Wn(te),oe=[];if(s&&oe.push(H[A]<=0),l&&oe.push(H[te]<=0,H[ae]<=0),oe.every(function(B){return B})){C=S,Y=!1;break}z.set(S,oe)}if(Y)for(var y=v?3:1,T=function(V){var W=j.find(function(K){var X=z.get(K);if(X)return X.slice(0,V).every(function(M){return M})});if(W)return C=W,"break"},G=y;G>0;G--){var U=T(G);if(U==="break")break}t.placement!==C&&(t.modifiersData[r]._skip=!0,t.placement=C,t.reset=!0)}}const af={name:"flip",enabled:!0,phase:"main",fn:of,requiresIfExists:["offset"],data:{_skip:!1}};function es(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ts(e){return[Te,Ge,Fe,Re].some(function(t){return e[t]>=0})}function sf(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=Rn(t,{elementContext:"reference"}),l=Rn(t,{altBoundary:!0}),c=es(i,r),d=es(l,o,s),u=ts(c),m=ts(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:m},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":m})}const lf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:sf};function cf(e,t,n){var r=We(e),o=[Re,Te].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[Re,Ge].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function df(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=Ti.reduce(function(u,m){return u[m]=cf(m,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const uf={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:df};function pf(e){var t=e.state,n=e.name;t.modifiersData[n]=$i({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const wf={name:"popperOffsets",enabled:!0,phase:"read",fn:pf,data:{}};function ff(e){return e==="x"?"y":"x"}function mf(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,m=n.padding,w=n.tether,b=w===void 0?!0:w,v=n.tetherOffset,f=v===void 0?0:v,h=Rn(t,{boundary:c,rootBoundary:d,padding:m,altBoundary:u}),k=We(t.placement),R=Ht(t.placement),E=!R,j=Go(k),x=ff(j),_=t.modifiersData.popperOffsets,z=t.rects.reference,Y=t.rects.popper,C=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,O=typeof C=="number"?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,A={x:0,y:0};if(_){if(s){var $,Q=j==="y"?Te:Re,J=j==="y"?Fe:Ge,H=j==="y"?"height":"width",te=_[j],ae=te+h[Q],oe=te-h[J],y=b?-Y[H]/2:0,T=R===Gt?z[H]:Y[H],G=R===Gt?-Y[H]:-z[H],U=t.elements.arrow,B=b&&U?Fo(U):{width:0,height:0},V=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:_i(),W=V[Q],K=V[J],X=yn(0,z[H],B[H]),M=E?z[H]/2-y-X-W-O.mainAxis:T-X-W-O.mainAxis,L=E?-z[H]/2+y+X+K+O.mainAxis:G+X+K+O.mainAxis,ee=t.elements.arrow&&Dn(t.elements.arrow),P=ee?j==="y"?ee.clientTop||0:ee.clientLeft||0:0,be=($=S==null?void 0:S[j])!=null?$:0,F=te+M-be-P,xe=te+L-be,qe=yn(b?rr(ae,F):ae,te,b?Nt(oe,xe):oe);_[j]=qe,A[j]=qe-te}if(l){var ft,Se=j==="x"?Te:Re,Bn=j==="x"?Fe:Ge,He=_[x],Rt=x==="y"?"height":"width",mt=He+h[Se],Ot=He-h[Bn],_t=[Te,Re].indexOf(k)!==-1,Pt=(ft=S==null?void 0:S[x])!=null?ft:0,ht=_t?mt:He-z[Rt]-Y[Rt]-Pt+O.altAxis,nn=_t?He+z[Rt]+Y[Rt]-Pt-O.altAxis:Ot,Vn=b&&_t?Bw(ht,He,nn):yn(b?ht:mt,He,b?nn:Ot);_[x]=Vn,A[x]=Vn-He}t.modifiersData[r]=A}}const hf={name:"preventOverflow",enabled:!0,phase:"main",fn:mf,requiresIfExists:["offset"]};function gf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function bf(e){return e===Be(e)||!Le(e)?Uo(e):gf(e)}function vf(e){var t=e.getBoundingClientRect(),n=Ut(t.width)/e.offsetWidth||1,r=Ut(t.height)/e.offsetHeight||1;return n!==1||r!==1}function xf(e,t,n){n===void 0&&(n=!1);var r=Le(t),o=Le(t)&&vf(t),s=pt(t),i=qt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||Ho(s))&&(l=bf(t)),Le(t)?(c=qt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=qo(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function yf(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function Nf(e){var t=yf(e);return Pw.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function kf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function jf(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ns={placement:"bottom",modifiers:[],strategy:"absolute"};function rs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Sf(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?ns:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ns,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},m=[],w=!1,b={state:u,setOptions:function(k){var R=typeof k=="function"?k(u.options):k;f(),u.options=Object.assign({},s,u.options,R),u.scrollParents={reference:Tt(l)?Nn(l):l.contextElement?Nn(l.contextElement):[],popper:Nn(c)};var E=Nf(jf([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(j){return j.enabled}),v(),b.update()},forceUpdate:function(){if(!w){var k=u.elements,R=k.reference,E=k.popper;if(rs(R,E)){u.rects={reference:xf(R,Dn(E),u.options.strategy==="fixed"),popper:Fo(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(O){return u.modifiersData[O.name]=Object.assign({},O.data)});for(var j=0;j<u.orderedModifiers.length;j++){if(u.reset===!0){u.reset=!1,j=-1;continue}var x=u.orderedModifiers[j],_=x.fn,z=x.options,Y=z===void 0?{}:z,C=x.name;typeof _=="function"&&(u=_({state:u,options:Y,name:C,instance:b})||u)}}}},update:kf(function(){return new Promise(function(h){b.forceUpdate(),h(u)})}),destroy:function(){f(),w=!0}};if(!rs(l,c))return b;b.setOptions(d).then(function(h){!w&&d.onFirstUpdate&&d.onFirstUpdate(h)});function v(){u.orderedModifiers.forEach(function(h){var k=h.name,R=h.options,E=R===void 0?{}:R,j=h.effect;if(typeof j=="function"){var x=j({state:u,name:k,instance:b,options:E}),_=function(){};m.push(x||_)}})}function f(){m.forEach(function(h){return h()}),m=[]}return b}}var Ef=[Yw,wf,Hw,$w,uf,af,hf,Fw,lf],Cf=Sf({defaultModifiers:Ef});const Ai="Popper";function Tf(e){return Ei(Ai,e)}vw(Ai,["root"]);const Rf=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Of=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function _f(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function or(e){return typeof e=="function"?e():e}function Sr(e){return e.nodeType!==void 0}function Pf(e){return!Sr(e)}const If=()=>Ro({root:["root"]},uw(Tf)),Mf={},$f=D.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:m,popperRef:w,slotProps:b={},slots:v={},TransitionProps:f}=t,h=ye(t,Rf),k=D.useRef(null),R=Et(k,n),E=D.useRef(null),j=Et(E,w),x=D.useRef(j);Ft(()=>{x.current=j},[j]),D.useImperativeHandle(w,()=>E.current,[]);const _=_f(u,i),[z,Y]=D.useState(_),[C,O]=D.useState(or(o));D.useEffect(()=>{E.current&&E.current.forceUpdate()}),D.useEffect(()=>{o&&O(or(o))},[o]),Ft(()=>{if(!C||!d)return;const J=ae=>{Y(ae.placement)};if(process.env.NODE_ENV!=="production"&&C&&Sr(C)&&C.nodeType===1){const ae=C.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ae.top===0&&ae.left===0&&ae.right===0&&ae.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let H=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ae})=>{J(ae)}}];c!=null&&(H=H.concat(c)),m&&m.modifiers!=null&&(H=H.concat(m.modifiers));const te=Cf(C,k.current,I({placement:_},m,{modifiers:H}));return x.current(te),()=>{te.destroy(),x.current(null)}},[C,l,c,d,m,_]);const S={placement:z};f!==null&&(S.TransitionProps=f);const A=If(),$=(r=v.root)!=null?r:"div",Q=hw({elementType:$,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:R},ownerState:t,className:A.root});return a.jsx($,I({},Q,{children:typeof s=="function"?s(S):s}))}),Di=D.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:m="bottom",popperOptions:w=Mf,popperRef:b,style:v,transition:f=!1,slotProps:h={},slots:k={}}=t,R=ye(t,Of),[E,j]=D.useState(!0),x=()=>{j(!1)},_=()=>{j(!0)};if(!c&&!u&&(!f||E))return null;let z;if(s)z=s;else if(r){const O=or(r);z=O&&Sr(O)?Qn(O).body:Qn(null).body}const Y=!u&&c&&(!f||E)?"none":void 0,C=f?{in:u,onEnter:x,onExited:_}:void 0;return a.jsx(nr,{disablePortal:l,container:z,children:a.jsx($f,I({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:f?!E:u,placement:m,popperOptions:w,popperRef:b,slotProps:h,slots:k},R,{style:I({position:"fixed",top:0,left:0,display:Y},v),TransitionProps:C,children:o}))})});process.env.NODE_ENV!=="production"&&(Di.propTypes={anchorEl:Co(p.oneOfType([En,p.object,p.func]),e=>{if(e.open){const t=or(e.anchorEl);if(t&&Sr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Pf(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([En,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:ci,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Bi(){const e=yi(Ao);return process.env.NODE_ENV!=="production"&&D.useDebugValue(e),e[Do]||e}function oo(e,t){return oo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},oo(e,t)}function Af(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,oo(e,t)}const os={disabled:!1};var Df=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Vi=g.createContext(null);var Bf=function(t){return t.scrollTop},gn="unmounted",vt="exited",xt="entering",Vt="entered",ao="exiting",ot=function(e){Af(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=vt,s.appearStatus=xt):c=Vt:r.unmountOnExit||r.mountOnEnter?c=gn:c=vt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===gn?{status:vt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==xt&&i!==Vt&&(s=xt):(i===xt||i===Vt)&&(s=ao)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===xt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this);i&&Bf(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===vt&&this.setState({status:gn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[wn.findDOMNode(this),l],d=c[0],u=c[1],m=this.getTimeouts(),w=l?m.appear:m.enter;if(!o&&!i||os.disabled){this.safeSetState({status:Vt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:xt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Vt},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:wn.findDOMNode(this);if(!s||os.disabled){this.safeSetState({status:vt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:ao},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:vt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===gn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ye(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return g.createElement(Vi.Provider,{value:null},typeof i=="function"?i(o,l):g.cloneElement(g.Children.only(i),l))},t}(g.Component);ot.contextType=Vi;ot.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Df;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Bt(){}ot.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Bt,onEntering:Bt,onEntered:Bt,onExit:Bt,onExiting:Bt,onExited:Bt};ot.UNMOUNTED=gn;ot.EXITED=vt;ot.ENTERING=xt;ot.ENTERED=Vt;ot.EXITING=ao;const Vf=ot,zf=e=>e.scrollTop;function as(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const Lf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function so(e){return`scale(${e}, ${e**2})`}const Ff={entering:{opacity:1,transform:so(1)},entered:{opacity:1,transform:"none"}},Gr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Xo=D.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:m,onExited:w,onExiting:b,style:v,timeout:f="auto",TransitionComponent:h=Vf}=t,k=ye(t,Lf),R=mn(),E=D.useRef(),j=Bi(),x=D.useRef(null),_=Et(x,s.ref,n),z=J=>H=>{if(J){const te=x.current;H===void 0?J(te):J(te,H)}},Y=z(u),C=z((J,H)=>{zf(J);const{duration:te,delay:ae,easing:oe}=as({style:v,timeout:f,easing:i},{mode:"enter"});let y;f==="auto"?(y=j.transitions.getAutoHeightDuration(J.clientHeight),E.current=y):y=te,J.style.transition=[j.transitions.create("opacity",{duration:y,delay:ae}),j.transitions.create("transform",{duration:Gr?y:y*.666,delay:ae,easing:oe})].join(","),c&&c(J,H)}),O=z(d),S=z(b),A=z(J=>{const{duration:H,delay:te,easing:ae}=as({style:v,timeout:f,easing:i},{mode:"exit"});let oe;f==="auto"?(oe=j.transitions.getAutoHeightDuration(J.clientHeight),E.current=oe):oe=H,J.style.transition=[j.transitions.create("opacity",{duration:oe,delay:te}),j.transitions.create("transform",{duration:Gr?oe:oe*.666,delay:Gr?te:te||oe*.333,easing:ae})].join(","),J.style.opacity=0,J.style.transform=so(.75),m&&m(J)}),$=z(w),Q=J=>{f==="auto"&&R.start(E.current||0,J),r&&r(x.current,J)};return a.jsx(h,I({appear:o,in:l,nodeRef:x,onEnter:C,onEntered:O,onEntering:Y,onExit:A,onExited:$,onExiting:S,addEndListener:Q,timeout:f==="auto"?null:f},k,{children:(J,H)=>D.cloneElement(s,I({style:I({opacity:0,transform:so(.75),visibility:J==="exited"&&!l?"hidden":void 0},Ff[J],v,s.props.style),ref:_},H))}))});process.env.NODE_ENV!=="production"&&(Xo.propTypes={addEndListener:p.func,appear:p.bool,children:ii.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Xo.muiSupportAuto=!0;const ss=Xo,Gf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Uf=$n(Di,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),zi=D.forwardRef(function(t,n){var r;const o=xi(),s=Bo({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:m,keepMounted:w,modifiers:b,open:v,placement:f,popperOptions:h,popperRef:k,transition:R,slots:E,slotProps:j}=s,x=ye(s,Gf),_=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,z=I({anchorEl:i,container:u,disablePortal:m,keepMounted:w,modifiers:b,open:v,placement:f,popperOptions:h,popperRef:k,transition:R},x);return a.jsx(Uf,I({as:l,direction:o==null?void 0:o.direction,slots:{root:_},slotProps:j??d},z,{ref:n}))});process.env.NODE_ENV!=="production"&&(zi.propTypes={anchorEl:p.oneOfType([En,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([En,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:ci,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const Li=zi;function qf(e){return fr("MuiTooltip",e)}const Hf=hi("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=Hf,Xf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Yf(e){return Math.round(e*1e5)/1e5}const Wf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(s.split("-")[0])}`],arrow:["arrow"]};return Ro(i,qf,t)},Kf=$n(Li,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>I({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:I({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:I({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Jf=$n("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>I({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ni(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Yf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:I({transformOrigin:"right center"},t.isRtl?I({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):I({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:I({transformOrigin:"left center"},t.isRtl?I({marginRight:"14px"},t.touch&&{marginRight:"24px"}):I({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:I({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:I({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Zf=$n("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ni(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let qn=!1;const is=new Pn;let pn={x:0,y:0};function Hn(e,t){return n=>{t&&t(n),e(n)}}const Fi=D.forwardRef(function(t,n){var r,o,s,i,l,c,d,u,m,w,b,v,f,h,k,R,E,j,x;const _=Bo({props:t,name:"MuiTooltip"}),{arrow:z=!1,children:Y,components:C={},componentsProps:O={},describeChild:S=!1,disableFocusListener:A=!1,disableHoverListener:$=!1,disableInteractive:Q=!1,disableTouchListener:J=!1,enterDelay:H=100,enterNextDelay:te=0,enterTouchDelay:ae=700,followCursor:oe=!1,id:y,leaveDelay:T=0,leaveTouchDelay:G=1500,onClose:U,onOpen:B,open:V,placement:W="bottom",PopperComponent:K,PopperProps:X={},slotProps:M={},slots:L={},title:ee,TransitionComponent:P=ss,TransitionProps:be}=_,F=ye(_,Xf),xe=D.isValidElement(Y)?Y:a.jsx("span",{children:Y}),qe=Bi(),ft=qe.direction==="rtl",[Se,Bn]=D.useState(),[He,Rt]=D.useState(null),mt=D.useRef(!1),Ot=Q||oe,_t=mn(),Pt=mn(),ht=mn(),nn=mn(),[Vn,ea]=ui({controlled:V,default:!1,name:"Tooltip",state:"open"});let Qe=Vn;if(process.env.NODE_ENV!=="production"){const{current:ne}=D.useRef(V!==void 0);D.useEffect(()=>{Se&&Se.disabled&&!ne&&ee!==""&&Se.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ee,Se,ne])}const Er=di(y),rn=D.useRef(),zn=eo(()=>{rn.current!==void 0&&(document.body.style.WebkitUserSelect=rn.current,rn.current=void 0),nn.clear()});D.useEffect(()=>zn,[zn]);const ta=ne=>{is.clear(),qn=!0,ea(!0),B&&!Qe&&B(ne)},Ln=eo(ne=>{is.start(800+T,()=>{qn=!1}),ea(!1),U&&Qe&&U(ne),_t.start(qe.transitions.duration.shortest,()=>{mt.current=!1})}),Cr=ne=>{mt.current&&ne.type!=="touchstart"||(Se&&Se.removeAttribute("title"),Pt.clear(),ht.clear(),H||qn&&te?Pt.start(qn?te:H,()=>{ta(ne)}):ta(ne))},na=ne=>{Pt.clear(),ht.start(T,()=>{Ln(ne)})},{isFocusVisibleRef:ra,onBlur:il,onFocus:ll,ref:cl}=pi(),[,oa]=D.useState(!1),aa=ne=>{il(ne),ra.current===!1&&(oa(!1),na(ne))},sa=ne=>{Se||Bn(ne.currentTarget),ll(ne),ra.current===!0&&(oa(!0),Cr(ne))},ia=ne=>{mt.current=!0;const Pe=xe.props;Pe.onTouchStart&&Pe.onTouchStart(ne)},la=Cr,ca=na,dl=ne=>{ia(ne),ht.clear(),_t.clear(),zn(),rn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",nn.start(ae,()=>{document.body.style.WebkitUserSelect=rn.current,Cr(ne)})},ul=ne=>{xe.props.onTouchEnd&&xe.props.onTouchEnd(ne),zn(),ht.start(G,()=>{Ln(ne)})};D.useEffect(()=>{if(!Qe)return;function ne(Pe){(Pe.key==="Escape"||Pe.key==="Esc")&&Ln(Pe)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Ln,Qe]);const pl=Et(xe.ref,cl,Bn,n);!ee&&ee!==0&&(Qe=!1);const Tr=D.useRef(),wl=ne=>{const Pe=xe.props;Pe.onMouseMove&&Pe.onMouseMove(ne),pn={x:ne.clientX,y:ne.clientY},Tr.current&&Tr.current.update()},on={},Rr=typeof ee=="string";S?(on.title=!Qe&&Rr&&!$?ee:null,on["aria-describedby"]=Qe?Er:null):(on["aria-label"]=Rr?ee:null,on["aria-labelledby"]=Qe&&!Rr?Er:null);const Ve=I({},on,F,xe.props,{className:st(F.className,xe.props.className),onTouchStart:ia,ref:pl},oe?{onMouseMove:wl}:{});process.env.NODE_ENV!=="production"&&(Ve["data-mui-internal-clone-element"]=!0,D.useEffect(()=>{Se&&!Se.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Se]));const an={};J||(Ve.onTouchStart=dl,Ve.onTouchEnd=ul),$||(Ve.onMouseOver=Hn(la,Ve.onMouseOver),Ve.onMouseLeave=Hn(ca,Ve.onMouseLeave),Ot||(an.onMouseOver=la,an.onMouseLeave=ca)),A||(Ve.onFocus=Hn(sa,Ve.onFocus),Ve.onBlur=Hn(aa,Ve.onBlur),Ot||(an.onFocus=sa,an.onBlur=aa)),process.env.NODE_ENV!=="production"&&xe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));const fl=D.useMemo(()=>{var ne;let Pe=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ne=X.popperOptions)!=null&&ne.modifiers&&(Pe=Pe.concat(X.popperOptions.modifiers)),I({},X.popperOptions,{modifiers:Pe})},[He,X]),sn=I({},_,{isRtl:ft,arrow:z,disableInteractive:Ot,placement:W,PopperComponentProp:K,touch:mt.current}),Or=Wf(sn),da=(r=(o=L.popper)!=null?o:C.Popper)!=null?r:Kf,ua=(s=(i=(l=L.transition)!=null?l:C.Transition)!=null?i:P)!=null?s:ss,pa=(c=(d=L.tooltip)!=null?d:C.Tooltip)!=null?c:Jf,wa=(u=(m=L.arrow)!=null?m:C.Arrow)!=null?u:Zf,ml=hn(da,I({},X,(w=M.popper)!=null?w:O.popper,{className:st(Or.popper,X==null?void 0:X.className,(b=(v=M.popper)!=null?v:O.popper)==null?void 0:b.className)}),sn),hl=hn(ua,I({},be,(f=M.transition)!=null?f:O.transition),sn),gl=hn(pa,I({},(h=M.tooltip)!=null?h:O.tooltip,{className:st(Or.tooltip,(k=(R=M.tooltip)!=null?R:O.tooltip)==null?void 0:k.className)}),sn),bl=hn(wa,I({},(E=M.arrow)!=null?E:O.arrow,{className:st(Or.arrow,(j=(x=M.arrow)!=null?x:O.arrow)==null?void 0:j.className)}),sn);return a.jsxs(D.Fragment,{children:[D.cloneElement(xe,Ve),a.jsx(da,I({as:K??Li,placement:W,anchorEl:oe?{getBoundingClientRect:()=>({top:pn.y,left:pn.x,right:pn.x,bottom:pn.y,width:0,height:0})}:Se,popperRef:Tr,open:Se?Qe:!1,id:Er,transition:!0},an,ml,{popperOptions:fl,children:({TransitionProps:ne})=>a.jsx(ua,I({timeout:qe.transitions.duration.shorter},ne,hl,{children:a.jsxs(pa,I({},gl,{children:[ee,z?a.jsx(wa,I({},bl,{ref:Rt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Fi.propTypes={arrow:p.bool,children:ii.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const Qf=Fi;function ls(e,t,n){return e?a.jsx(De.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Yo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:m=!1,hasDisabledGutters:w=!1,hasDivider:b=!1,focusVisibleClassName:v,id:f,children:h}=e,k=a.jsx(De.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:b,focusVisibleClassName:v,onClick:t,id:f,children:n?a.jsxs(a.Fragment,{children:[ls(s,n,!0),a.jsx(De.ListItemText,{primary:n,inset:!s&&o}),m?a.jsx(De.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(ji,{})}):ls(i,n,!1)]}):h});return r?a.jsx(Qf,{title:r,placement:"right",children:a.jsx("div",{children:k})}):k}function Gi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function em(e){const[t,n]=g.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Gi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(Ui,{...e,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(Yo,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(De.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const tm=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Ui(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=g.useMemo(()=>{const u=o&&o.length>0?o:Gi(t).filter(v=>!("menuItem"in v.group)),m=Object.values(u).sort((v,f)=>(v.group.order||0)-(f.group.order||0)),w=[];m.forEach(v=>{tm(v.id,t.items).forEach(f=>w.push({item:f,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const b=w.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:w,allowForLeadingIcons:b}},[o,t]),l=({item:u,isLastItemInGroup:m})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:m,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,m)=>{const{item:w}=u,b=l(u);if("command"in w){const v=w.group+m;return a.jsx(Yo,{onClick:f=>{n==null||n(f),r(w)},...b},v)}return a.jsx(em,{parentMenuItem:w,parentItemProps:b,...e},d+w.id)})},d)}function nm(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Ui,{...e,includedGroups:s})}function rm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(De.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(De.List,{id:n,dense:!0,className:s??"",children:a.jsx(nm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function qi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=g.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(De.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(rm,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function om(e){return{preserveValue:!0,...e}}const ar=(e,t,n={})=>{const r=g.useRef(t);r.current=t;const o=g.useRef(n);o.current=om(o.current);const[s,i]=g.useState(()=>r.current),[l,c]=g.useState(!0);return g.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},am=ki(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Hi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=g.useState(!1),[u,m]=g.useState(!1),w=g.useCallback(()=>{c&&d(!1),m(!1)},[c]),b=g.useCallback(j=>{j.stopPropagation(),d(x=>{const _=!x;return _&&j.shiftKey?m(!0):_||m(!1),_})},[]),v=g.useCallback(j=>(w(),r(j)),[r,w]),[f,h]=g.useState({top:1,left:1});g.useEffect(()=>{if(c){const j=o==null?void 0:o.current;if(j){const x=j.getBoundingClientRect(),_=window.scrollY,z=window.scrollX,Y=x.top+_+j.clientHeight,C=x.left+z;h({top:Y,left:C})}}},[c,o]);const[k]=ar(g.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[R]=ar(g.useCallback(async()=>(e==null?void 0:e(!0))??n??k,[e,n,k,c]),n??k),E=u&&R?R:k;return a.jsxs(a.Fragment,{children:[a.jsx(De.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??a.jsx(am,{})}),a.jsx(De.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:E?a.jsx(qi,{className:s,id:`${i??""} main menu`,commandHandler:v,multiColumnMenu:E}):void 0})]})}function sm({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(De.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const wt=g.forwardRef(({className:e,...t},n)=>a.jsx(q.LoaderCircle,{size:35,className:N("tw-animate-spin",e),...t,ref:n}));wt.displayName="Spinner";function im({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:m,onFocus:w,onBlur:b}){return a.jsxs("div",{className:N("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(Ne,{htmlFor:e,className:N({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(dt,{id:e,disabled:t,placeholder:i,required:l,className:N(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:m,onFocus:w,onBlur:b}),a.jsx("p",{className:N({"tw-hidden":!o}),children:o})]})}function lm({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=g.useRef(void 0);return a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx(De.AppBar,{position:"static",id:r,children:a.jsxs(De.Toolbar,{className:N("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?a.jsx(Hi,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?a.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const cm=Yt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Xi=g.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:N(cm({variant:t}),e),...n}));Xi.displayName="Alert";const Yi=g.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:N("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Yi.displayName="AlertTitle";const Wi=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Wi.displayName="AlertDescription";const Ki=Yt.cva("tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-text-foreground"}},defaultVariants:{variant:"default"}});function Ji({className:e,variant:t,...n}){return a.jsx("div",{className:N("pr-twp",Ki({variant:t}),e),...n})}const Wo=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Wo.displayName="Card";const Ko=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Ko.displayName="CardHeader";const Jo=g.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:N("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Jo.displayName="CardTitle";const Zo=g.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:N("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Zo.displayName="CardDescription";const Qo=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-p-6 tw-pt-0",e),...t}));Qo.displayName="CardContent";const Zi=g.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Zi.displayName="CardFooter";function dm({...e}){return a.jsx(us.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Qi=g.forwardRef(({className:e,...t},n)=>a.jsxs(fn.Root,{ref:n,className:N("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,children:[a.jsx(fn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(fn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(fn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]}));Qi.displayName=fn.Root.displayName;const el=g.forwardRef(({className:e,...t},n)=>a.jsx(Xr.Root,{className:N("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:a.jsx(Xr.Thumb,{className:N("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0")})}));el.displayName=Xr.Root.displayName;const um=_e.Root,tl=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.List,{ref:n,className:N("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));tl.displayName=_e.List.displayName;const nl=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,className:N("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));nl.displayName=_e.Trigger.displayName;const rl=g.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));rl.displayName=_e.Content.displayName;function pm({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(wt,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(q.Download,{size:25,className:N("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function wm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(wt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function fm({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(wt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function mm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(wt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function hm({id:e,markdown:t,className:n,anchorTarget:r}){const o=g.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:e,className:N("pr-twp tw-prose",n),children:a.jsx(Il,{options:o,children:t})})}const ol=g.forwardRef((e,t)=>a.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(q.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(q.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var al=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(al||{});function gm({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(_n,{children:[a.jsx(ir,{asChild:!0,children:a.jsx(ol,{})}),a.jsx(Kt,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(Jt,{children:n.label}),a.jsx(ys,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(lr,{onClick:r.onClick,children:r.label}):a.jsx(uo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Zt,{})]},n.label))})]})})}function bm({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function vm({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new Z.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(q.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(q.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(q.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function sl({id:e,versionHistory:t}){const[n,r]=g.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),w=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:m>0?b=`${m.toString()} month${m===1?"":"s"} ago`:w===0?b="today":b=`${w.toString()} day${w===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function xm({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=g.useMemo(()=>Z.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(sl,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function ym({entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}){const u=m=>{n.length!==1&&r(n.filter(w=>w!==m))};return a.jsxs("div",{className:"tw-flex",children:[a.jsx(Zn,{entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0&&a.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(m=>{var w;return a.jsxs(Ji,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[a.jsx(pe,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>u(m),children:a.jsx(q.X,{className:"tw-h-3 tw-w-3"})}),(w=e.find(b=>b.value===m))==null?void 0:w.label]},m)})})]})}const Nm=["%resources_action%","%resources_dialog_subtitle%","%resources_dialog_title%","%resources_filterInput%","%resources_fullName%","%resources_get%","%resources_installed%","%resources_language%","%resources_languages%","%resources_loadingResources%","%resources_noResults%","%resources_open%","%resources_remove%","%resources_size%","%resources_type%","%resources_types%","%resources_type_DBL%","%resources_type_ER%","%resources_type_SLR%","%resources_type_XR%","%resources_type_unknown%","%resources_update%"],km=(e,t)=>{const n=Array.from(new Set(e.map(i=>i.bestLanguageName))),r=new Set(e.filter(i=>i.installed).map(i=>i.bestLanguageName)),o=new Set(t.concat(Array.from(r)));return n.sort((i,l)=>{const c=o.has(i),d=o.has(l);return c&&d?i.localeCompare(l):c?-1:d?1:i.localeCompare(l)}).map(i=>({label:i,value:i,starred:r.has(i)}))},cs=(e,t,n)=>a.jsx(pe,{variant:"outline",onClick:()=>n(e.dblEntryUid,"install"),children:t}),jm=(e,t,n,r,o,s)=>t.includes(e.dblEntryUid)?a.jsx(pe,{variant:"outline",children:a.jsx(wt,{className:"tw-h-5 tw-py-[1px]"})}):e.installed?e.updateAvailable?cs(e,r,s):a.jsx(Ne,{className:"tw-my-2 tw-flex tw-h-6 tw-items-center",children:o}):cs(e,n,s);function Sm({localizedStrings:e,resources:t,isLoadingResources:n,selectedTypes:r,setSelectedTypes:o,selectedLanguages:s,setSelectedLanguages:i,openResource:l,installResource:c,uninstallResource:d}){const u=e["%resources_action%"],m=e["%resources_dialog_subtitle%"],w=e["%resources_dialog_title%"],b=e["%resources_filterInput%"],v=e["%resources_fullName%"],f=e["%resources_get%"],h=e["%resources_installed%"],k=e["%resources_language%"],R=e["%resources_languages%"],E=e["%resources_loadingResources%"],j=e["%resources_noResults%"],x=e["%resources_open%"],_=e["%resources_remove%"],z=e["%resources_size%"],Y=e["%resources_type%"],C=e["%resources_types%"],O=e["%resources_type_DBL%"],S=e["%resources_type_ER%"],A=e["%resources_type_SLR%"],$=e["%resources_type_XR%"],Q=e["%resources_type_unknown%"],J=e["%resources_update%"],[H,te]=g.useState([]),ae=(M,L)=>{if(!c||!d)return;const ee={dblEntryUid:M,action:L==="install"?"installing":"removing"};te(be=>[...be,ee]),(L==="install"?c:d)(M).catch(be=>{console.debug(Z.getErrorMessage(be))})};g.useEffect(()=>{te(M=>M.filter(L=>{const ee=t.find(P=>P.dblEntryUid===L.dblEntryUid);return ee?!(L.action==="installing"&&ee.installed||L.action==="removing"&&!ee.installed):!0}))},[t]);const[oe,y]=g.useState(""),T=g.useMemo(()=>t.filter(M=>{const L=oe.toLowerCase();return M.displayName.toLowerCase().includes(L)||M.fullName.toLowerCase().includes(L)||M.bestLanguageName.toLowerCase().includes(L)}),[t,oe]),G=g.useMemo(()=>[{value:"DBLResource",label:O},{value:"EnhancedResource",label:S},{value:"SourceLanguageResource",label:A},{value:"XmlResource",label:$}],[O,S,A,$]),U=g.useMemo(()=>T.filter(M=>r.includes(M.type)),[T,r]);g.useEffect(()=>{s.length===0&&i(Array.from(new Set(t.filter(M=>M.installed===!0).map(M=>M.bestLanguageName))))},[t,s.length,i]);const B=g.useMemo(()=>U.filter(M=>s.includes(M.bestLanguageName)),[s,U]),[V,W]=g.useState({key:"bestLanguageName",direction:"ascending"}),K=g.useMemo(()=>[...B].sort((M,L)=>{const ee=M[V.key],P=L[V.key];return ee<P?V.direction==="ascending"?-1:1:ee>P?V.direction==="ascending"?1:-1:0}),[V.direction,V.key,B]),X=M=>{const L={key:M,direction:"ascending"};V.key===M&&V.direction==="ascending"&&(L.direction="descending"),W(L)};return a.jsxs(Wo,{className:"tw-rounded-none tw-border-0",children:[a.jsx(Ko,{children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(q.BookOpen,{size:36,className:"tw-mr-2"}),a.jsxs("div",{children:[a.jsx(Jo,{children:w}),a.jsx(Zo,{className:"tw-mt-1",children:m})]})]})}),a.jsx(Qo,{children:n||!t?a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-2",children:[a.jsx(Ne,{children:E}),a.jsx(wt,{})]}):a.jsxs("div",{children:[a.jsxs("div",{className:"tw-mb-1 tw-flex tw-gap-1",children:[a.jsxs("div",{className:"tw-relative",children:[a.jsx(dt,{type:"text",className:"tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none",onChange:M=>y(M.target.value),value:oe,placeholder:b}),a.jsx(q.Search,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground"})]}),a.jsx(Zn,{entries:G,selected:r,onChange:o,placeholder:C,icon:a.jsx(q.Shapes,{})}),a.jsx(Zn,{entries:km(t,s),selected:s,onChange:i,placeholder:R,sortSelected:!0,icon:a.jsx(q.Globe,{})})]}),K.length===0?a.jsx("div",{className:"tw-m-4 tw-flex tw-w-full tw-justify-center",children:a.jsx(Ne,{children:j})}):a.jsxs(Qt,{stickyHeader:!0,children:[a.jsx(en,{className:"tw-bg-none",stickyHeader:!0,children:a.jsxs(Xe,{children:[a.jsx($e,{}),a.jsx($e,{}),a.jsx($e,{onClick:()=>X("fullName"),children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[v,V.key!=="fullName"&&a.jsx(q.ChevronsUpDown,{className:"tw-pl-1",size:16}),V.key==="fullName"&&(V.direction==="ascending"?a.jsx(q.ChevronUp,{className:"tw-pl-1",size:16}):a.jsx(q.ChevronDown,{className:"tw-pl-1",size:16}))]})}),a.jsx($e,{onClick:()=>X("bestLanguageName"),children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[k,V.key!=="bestLanguageName"&&a.jsx(q.ChevronsUpDown,{className:"tw-pl-1",size:16}),V.key==="bestLanguageName"&&(V.direction==="ascending"?a.jsx(q.ChevronUp,{className:"tw-pl-1",size:16}):a.jsx(q.ChevronDown,{className:"tw-pl-1",size:16}))]})}),a.jsx($e,{children:Y}),a.jsx($e,{children:z}),a.jsx($e,{children:u})]})}),a.jsx(tn,{children:K.map(M=>{var L;return a.jsxs(Xe,{children:[a.jsx(Ce,{children:a.jsx(q.BookOpen,{className:"tw-pr-0",size:18})}),a.jsx(Ce,{children:M.displayName}),a.jsx(Ce,{className:"tw-font-medium",children:M.fullName}),a.jsx(Ce,{children:M.bestLanguageName}),a.jsx(Ce,{children:((L=G.find(ee=>ee.value===M.type))==null?void 0:L.label)??Q}),a.jsx(Ce,{children:M.size}),a.jsx(Ce,{children:a.jsxs("div",{className:"tw-flex tw-justify-between",children:[jm(M,H.map(ee=>ee.dblEntryUid),f,J,h,ae),M.installed&&a.jsxs(_n,{children:[a.jsx(ir,{asChild:!0,children:a.jsx(pe,{variant:"ghost",children:a.jsx(q.Ellipsis,{className:"tw-w-4"})})}),a.jsxs(Kt,{align:"start",children:[a.jsx(Sn,{onClick:()=>l(M.projectId),children:a.jsx("span",{children:x})}),a.jsx(Zt,{}),a.jsx(Sn,{onClick:()=>ae(M.dblEntryUid,"remove"),children:a.jsx("span",{children:_})})]})]})]})})]},M.displayName+M.fullName)})})]})]})})]})}const Em=(e,t)=>e[t]??t;function Cm({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:l,direction:c="ltr"}){const d=Em(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[u,m]=g.useState(!1),w=v=>{o&&o(v),r&&r([v,...n.filter(f=>f!==v)]),s&&n.find(f=>f===v)&&s([...n.filter(f=>f!==v)]),m(!1)},b=(v,f)=>{var k,R,E,j,x,_;const h=f!==v?((R=(k=e[v])==null?void 0:k.uiNames)==null?void 0:R[f])??((j=(E=e[v])==null?void 0:E.uiNames)==null?void 0:j.en):void 0;return h?`${(x=e[v])==null?void 0:x.autonym} (${h})`:(_=e[v])==null?void 0:_.autonym};return a.jsxs("div",{className:N("pr-twp tw-max-w-sm",l),children:[a.jsxs(jt,{name:"uiLanguage",value:t,onValueChange:w,open:u,onOpenChange:v=>m(v),dir:c,children:[a.jsx(lt,{children:a.jsx(St,{})}),a.jsx(ct,{className:"tw-z-[250]",dir:c,children:Object.keys(e).map(v=>a.jsx(Me,{value:v,children:b(v,t)},v))})]}),t!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(Ne,{className:"tw-ms-3",children:d}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(Ne,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(v=>b(v,t)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}const Tm=(e,t)=>{g.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Ur=()=>!1,Rm=(e,t)=>{const[n]=ar(g.useCallback(async()=>{if(!e)return Ur;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Ur,{preserveValue:!1});g.useEffect(()=>()=>{n!==Ur&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>us.toast});exports.Alert=Xi;exports.AlertDescription=Wi;exports.AlertTitle=Yi;exports.BOOK_SELECTOR_STRING_KEYS=hc;exports.Badge=Ji;exports.BookChapterControl=lc;exports.BookSelectionMode=_s;exports.BookSelector=gc;exports.Button=pe;exports.Card=Wo;exports.CardContent=Qo;exports.CardDescription=Zo;exports.CardFooter=Zi;exports.CardHeader=Ko;exports.CardTitle=Jo;exports.ChapterRangeSelector=Os;exports.Checkbox=cr;exports.Checklist=cd;exports.ComboBox=Jn;exports.DataTable=Ds;exports.DisableButton=fm;exports.DropdownMenu=_n;exports.DropdownMenuCheckboxItem=lr;exports.DropdownMenuContent=Kt;exports.DropdownMenuGroup=ys;exports.DropdownMenuItem=Sn;exports.DropdownMenuItemType=al;exports.DropdownMenuLabel=Jt;exports.DropdownMenuPortal=Wl;exports.DropdownMenuRadioGroup=Jl;exports.DropdownMenuRadioItem=uo;exports.DropdownMenuSeparator=Zt;exports.DropdownMenuShortcut=js;exports.DropdownMenuSub=Kl;exports.DropdownMenuSubContent=ks;exports.DropdownMenuSubTrigger=Ns;exports.DropdownMenuTrigger=ir;exports.EnableButton=wm;exports.FILTERABLE_RESOURCE_LIST_STRING_KEYS=Nm;exports.Filter=ym;exports.FilterButton=ol;exports.FilterDropdown=gm;exports.FilterableResourceList=Sm;exports.Footer=xm;exports.GridMenu=qi;exports.HamburgerMenuButton=Hi;exports.INVENTORY_STRING_KEYS=Ec;exports.IconButton=sm;exports.Input=dt;exports.InstallButton=pm;exports.Inventory=Rc;exports.Label=Ne;exports.MarkdownRenderer=hm;exports.MenuItem=Yo;exports.MoreInfo=vm;exports.MultiSelectComboBox=Zn;exports.NavigationContentSearch=Oc;exports.NoExtensionsFound=bm;exports.RadioGroup=po;exports.RadioGroupItem=Kn;exports.ScriptureResultsViewer=od;exports.ScrollGroupSelector=ad;exports.SearchBar=No;exports.Select=jt;exports.SelectContent=ct;exports.SelectGroup=Ps;exports.SelectItem=Me;exports.SelectLabel=Is;exports.SelectScrollDownButton=xo;exports.SelectScrollUpButton=vo;exports.SelectSeparator=Ms;exports.SelectTrigger=lt;exports.SelectValue=St;exports.Separator=ur;exports.SettingsList=sd;exports.SettingsListHeader=ld;exports.SettingsListItem=id;exports.SettingsSidebar=Qs;exports.SettingsSidebarContentSearch=Kc;exports.Slider=Qi;exports.Sonner=dm;exports.Spinner=wt;exports.Switch=el;exports.Table=Qt;exports.TableBody=tn;exports.TableCaption=As;exports.TableCell=Ce;exports.TableFooter=$s;exports.TableHead=$e;exports.TableHeader=en;exports.TableRow=Xe;exports.Tabs=um;exports.TabsContent=rl;exports.TabsList=tl;exports.TabsTrigger=nl;exports.TextField=im;exports.ToggleGroup=yo;exports.ToggleGroupItem=vn;exports.Toolbar=lm;exports.UiLanguageSelector=Cm;exports.UpdateButton=mm;exports.VersionHistory=sl;exports.VerticalTabs=ko;exports.VerticalTabsContent=So;exports.VerticalTabsList=jo;exports.VerticalTabsTrigger=Gs;exports.badgeVariants=Ki;exports.buttonVariants=Ss;exports.cn=N;exports.getBookNumFromId=Vs;exports.getLinesFromUSFM=Bs;exports.getNumberFromUSFM=Yr;exports.getStatusForItem=zs;exports.inventoryCountColumn=jc;exports.inventoryItemColumn=Nc;exports.inventoryStatusColumn=Sc;exports.useEvent=Tm;exports.useEventAsync=Rm;exports.usePromise=ar;function Om(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Om(`*, ::before, ::after {
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
[hidden]:where(.pr-twp,.pr-twp *) {
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
.tw-left-1\\/2 {
  left: 50%;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-2\\.5 {
  left: 0.625rem;
}
.tw-left-3 {
  left: 0.75rem;
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
.tw-top-48 {
  top: 12rem;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.tw-mb-6 {
  margin-bottom: 1.5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
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
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
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
.tw-w-\\[30px\\] {
  width: 30px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
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
.tw-min-w-10 {
  min-width: 2.5rem;
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
.tw-max-w-4xl {
  max-width: 56rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
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
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-r-0 {
  border-right-width: 0px;
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
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
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
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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
.tw-pe-3 {
  padding-inline-end: 0.75rem;
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
.tw-pr-8 {
  padding-right: 2rem;
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
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
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
  color: rgb(156 163 175 / var(--tw-text-opacity));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
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
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
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
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
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
.tw-fade-in {
  --tw-enter-opacity: 0;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-slide-in-from-bottom-4 {
  --tw-enter-translate-y: 1rem;
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
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-primary:hover {
  color: hsl(var(--primary));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
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
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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

.tw-group[data-side="left"] .group-data-\\[side\\=left\\]\\:tw--right-4 {
  right: -1rem;
}

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-left-0 {
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

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-rotate-180 {
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

.tw-group[data-side="left"] .group-data-\\[side\\=left\\]\\:tw-border-r {
  border-right-width: 1px;
}

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-border-l {
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

  .sm\\:tw-text-left {
    text-align: left;
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

  .md\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}

[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=left] .\\[\\[data-side\\=left\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}

[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=right] .\\[\\[data-side\\=right\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
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

.banded-row[data-state='selected']:hover {
  cursor: default;
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
