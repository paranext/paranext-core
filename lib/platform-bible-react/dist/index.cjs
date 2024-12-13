"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),h=require("react"),W=require("lucide-react"),st=require("clsx"),gl=require("tailwind-merge"),cs=require("@radix-ui/react-dropdown-menu"),ee=require("platform-bible-utils"),Wt=require("@radix-ui/react-slot"),Kt=require("class-variance-authority"),bl=require("@radix-ui/react-label"),vl=require("@radix-ui/react-radio-group"),xl=require("@radix-ui/react-popover"),Oe=require("cmdk"),yl=require("@radix-ui/react-dialog"),ke=require("@tanstack/react-table"),Nl=require("@radix-ui/react-select"),kl=require("@radix-ui/react-checkbox"),jl=require("@radix-ui/react-toggle-group"),Sl=require("@radix-ui/react-toggle"),El=require("@radix-ui/react-tabs"),Cl=require("@radix-ui/react-separator"),Tl=require("@radix-ui/react-tooltip"),Ur=require("@mui/styled-engine"),Ae=require("@mui/material"),fn=require("react-dom"),ds=require("sonner"),Rl=require("@radix-ui/react-slider"),Ol=require("@radix-ui/react-switch"),_l=require("markdown-to-jsx");function Ne(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const D=Ne(h),fe=Ne(cs),us=Ne(bl),jn=Ne(vl),Sn=Ne(xl),Ke=Ne(yl),be=Ne(Nl),qr=Ne(kl),ir=Ne(jl),ps=Ne(Sl),_e=Ne(El),ws=Ne(Cl),In=Ne(Tl),Pl=Ne(fn),mn=Ne(Rl),Hr=Ne(Ol);const Il=gl.extendTailwindMerge({prefix:"tw-"});function N(...e){return Il(st.clsx(e))}const lt=h.forwardRef(({className:e,type:t,...n},r)=>a.jsx("input",{type:t,className:N("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));lt.displayName="Input";const Ml=h.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,direction:o="ltr",...s},i)=>a.jsxs("div",{className:"tw-relative",children:[a.jsx(lt,{...s,type:"text",className:N("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"),onChange:l=>e(l.target.value),onKeyDown:l=>{l.key==="Enter"&&r(),t(l)},onClick:n,ref:i}),a.jsx(W.History,{className:N("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",{"tw-right-3":o==="ltr"},{"tw-left-3 tw-right-auto":o==="rtl"}),onClick:()=>{console.log("back in history")}})]}));var $l=Object.defineProperty,Al=(e,t,n)=>t in e?$l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>Al(e,typeof t!="symbol"?t+"":t,n);const yt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],so=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],fs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],wa=Hl();function Jt(e,t=!0){return t&&(e=e.toUpperCase()),e in wa?wa[e]:0}function io(e){return Jt(e)>0}function Dl(e){const t=typeof e=="string"?Jt(e):e;return t>=40&&t<=66}function Bl(e){return(typeof e=="string"?Jt(e):e)<=39}function ms(e){return e<=66}function Vl(e){const t=typeof e=="string"?Jt(e):e;return bs(t)&&!ms(t)}function*Ll(){for(let e=1;e<=yt.length;e++)yield e}const zl=1,hs=yt.length;function Fl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function lo(e,t="***"){const n=e-1;return n<0||n>=yt.length?t:yt[n]}function gs(e){return e<=0||e>hs?"******":fs[e-1]}function Gl(e){return gs(Jt(e))}function bs(e){const t=typeof e=="number"?lo(e):e;return io(t)&&!so.includes(t)}function Ul(e){const t=typeof e=="number"?lo(e):e;return io(t)&&so.includes(t)}function ql(e){return fs[e-1].includes("*obsolete*")}function Hl(){const e={};for(let t=0;t<yt.length;t++)e[yt[t]]=t+1;return e}const ie={allBookIds:yt,nonCanonicalIds:so,bookIdToNumber:Jt,isBookIdValid:io,isBookNT:Dl,isBookOT:Bl,isBookOTNT:ms,isBookDC:Vl,allBookNumbers:Ll,firstBook:zl,lastBook:hs,extraBooks:Fl,bookNumberToId:lo,bookNumberToEnglishName:gs,bookIdToEnglishName:Gl,isCanonical:bs,isExtraMaterial:Ul,isObsolete:ql};var Ye=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ye||{});const Ie=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ye[t]):(this._type=t,this.name=Ye[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Ie,"Original",new Ie(Ye.Original)),re(Ie,"Septuagint",new Ie(Ye.Septuagint)),re(Ie,"Vulgate",new Ie(Ye.Vulgate)),re(Ie,"English",new Ie(Ye.English)),re(Ie,"RussianProtestant",new Ie(Ye.RussianProtestant)),re(Ie,"RussianOrthodox",new Ie(Ye.RussianOrthodox));let mt=Ie;function fa(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var vs=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(vs||{});const Se=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof mt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof mt?n:void 0;this.setEmpty(s),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof mt?t:ae.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ae(t),{success:!0,verseRef:n}}catch(r){if(r instanceof cn)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=t,l=s||o.toString();let c;return i&&(c=new mt(i)),n?new ae(n,r.toString(),l,c):new ae}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return ie.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ie.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ie.lastBook)throw new cn("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new mt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new mt(Ye[i])}catch{throw new cn("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new cn("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ie.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new cn("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=fa(this._verse,r);for(const i of s.map(l=>fa(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const f=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(f)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ie.lastBook?2:(ie.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ie.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(Se,"defaultVersification",mt.English),re(Se,"verseRangeSeparator","-"),re(Se,"verseSequenceIndicator",","),re(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),re(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),re(Se,"chapterDigitShifter",1e3),re(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),re(Se,"bcvMaxValue",Se.chapterDigitShifter-1),re(Se,"ValidStatusType",vs);class cn extends Error{}const Lt=fe.Root,En=fe.Trigger,xs=fe.Group,Xl=fe.Portal,Yl=fe.Sub,Wl=fe.RadioGroup,ys=h.forwardRef(({className:e,inset:t,children:n,...r},o)=>a.jsxs(fe.SubTrigger,{ref:o,className:N("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,a.jsx(W.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ys.displayName=fe.SubTrigger.displayName;const Ns=h.forwardRef(({className:e,...t},n)=>a.jsx(fe.SubContent,{ref:n,className:N("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Ns.displayName=fe.SubContent.displayName;const Nt=h.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(fe.Portal,{children:a.jsx(fe.Content,{ref:r,sideOffset:t,className:N("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n})}));Nt.displayName=fe.Content.displayName;const Cn=h.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(fe.Item,{ref:r,className:N("tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));Cn.displayName=fe.Item.displayName;const Mn=h.forwardRef(({className:e,children:t,checked:n,...r},o)=>a.jsxs(fe.CheckboxItem,{ref:o,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(fe.ItemIndicator,{children:a.jsx(W.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));Mn.displayName=fe.CheckboxItem.displayName;const co=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(fe.RadioItem,{ref:r,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(fe.ItemIndicator,{children:a.jsx(W.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));co.displayName=fe.RadioItem.displayName;const Zt=h.forwardRef(({className:e,inset:t,...n},r)=>a.jsx(fe.Label,{ref:r,className:N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Zt.displayName=fe.Label.displayName;const Qt=h.forwardRef(({className:e,...t},n)=>a.jsx(fe.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Qt.displayName=fe.Separator.displayName;function ks({className:e,...t}){return a.jsx("span",{className:N("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ks.displayName="DropdownMenuShortcut";const Kl=h.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i,direction:l},c)=>a.jsxs(Cn,{ref:c,textValue:e,className:N("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:d=>{d.preventDefault(),t()},onKeyDown:d=>{o(d)},onFocus:r,onMouseMove:r,dir:l,children:[a.jsx("span",{className:N("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:ie.bookIdToEnglishName(e)}),n&&a.jsx("div",{children:i})]},e));function Jl({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:t},(l,c)=>c+1),i=h.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:N("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:N("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function Zl({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return a.jsxs(Zt,{className:"tw-flex tw-justify-between",children:[a.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(W.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(W.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),a.jsx(W.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const vn=ie.allBookIds,Ql={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ma=["OT","NT","DC"],ec=32+32+32,tc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],nc=e=>({OT:vn.filter(n=>ie.isBookOT(n)),NT:vn.filter(n=>ie.isBookNT(n)),DC:vn.filter(n=>ie.isBookDC(n))})[e],dn=e=>ee.getChaptersForBook(ie.bookIdToNumber(e));function rc(){return vn.map(t=>ie.bookIdToEnglishName(t))}function oc(e){return rc().includes(e)}function ac(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(oc(t))return vn.find(r=>ie.bookIdToEnglishName(r)===t)}function sc({scrRef:e,handleSubmit:t,direction:n}){const[r,o]=h.useState(""),[s,i]=h.useState(ie.bookNumberToId(e.bookNum)),[l,c]=h.useState(e.chapterNum??0),[d,u]=h.useState(ie.bookNumberToId(e.bookNum)),[f,w]=h.useState(!1),[b,x]=h.useState(f),m=h.useRef(void 0),g=h.useRef(void 0),y=h.useRef(void 0),_=h.useCallback(O=>nc(O).filter(A=>{const X=ie.bookIdToEnglishName(A).toLowerCase(),q=r.replace(/[^a-zA-Z]/g,"").toLowerCase();return X.includes(q)||A.toLowerCase().includes(q)}),[r]),R=O=>{o(O)},S=h.useRef(!1),v=h.useCallback(O=>{if(S.current){S.current=!1;return}w(O)},[]),P=h.useCallback((O,A,X,q)=>{if(c(ie.bookNumberToId(e.bookNum)!==O?1:e.chapterNum),A||dn(O)===-1){t({bookNum:ie.bookIdToNumber(O),chapterNum:X||1,verseNum:q||1}),w(!1),o("");return}i(s!==O?O:""),w(!A)},[t,e.bookNum,e.chapterNum,s]),z=O=>{O<=0||O>dn(s)||P(s,!0,O)},J=h.useCallback(()=>{tc.forEach(O=>{const A=r.match(O);if(A){const[X,q=void 0,V=void 0]=A.slice(1),te=ac(X);(ie.isBookIdValid(X)||te)&&P(te??X,!0,q?parseInt(q,10):1,V?parseInt(V,10):1)}})},[P,r]),C=h.useCallback(O=>{f?(O.key==="ArrowDown"||O.key==="ArrowUp")&&(typeof y<"u"&&y.current!==null?y.current.focus():typeof g<"u"&&g.current!==null&&g.current.focus(),O.preventDefault()):w(!0)},[f]),I=O=>{const{key:A}=O;A==="ArrowRight"||A==="ArrowLeft"||A==="ArrowDown"||A==="ArrowUp"||A==="Enter"||(m.current.dispatchEvent(new KeyboardEvent("keydown",{key:A})),m.current.focus())},$=O=>{const{key:A}=O;if(d===s){if(A==="Enter"){O.preventDefault(),P(s,!0,l);return}const X=A==="ArrowRight"&&!n||A==="ArrowRight"&&n==="ltr"||A==="ArrowLeft"&&n==="rtl",q=A==="ArrowLeft"&&!n||A==="ArrowLeft"&&n==="ltr"||A==="ArrowRight"&&n==="rtl";let V=0;if(X)if(l<dn(d))V=1;else{O.preventDefault();return}else if(q)if(l>1)V=-1;else{O.preventDefault();return}else A==="ArrowDown"?V=6:A==="ArrowUp"&&(V=-6);l+V<=0||l+V>dn(d)?c(0):V!==0&&(c(l+V),O.preventDefault())}};return h.useEffect(()=>{s===d?s===ie.bookNumberToId(e.bookNum)?c(e.chapterNum):c(1):c(0)},[d,e.bookNum,e.chapterNum,s]),h.useLayoutEffect(()=>{x(f)},[f]),h.useLayoutEffect(()=>{const O=setTimeout(()=>{if(b&&g.current&&y.current){const X=y.current.offsetTop-ec;g.current.scrollTo({top:X,behavior:"instant"})}},10);return()=>{clearTimeout(O)}},[b]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(Lt,{modal:!1,open:f,onOpenChange:v,children:[a.jsx(En,{asChild:!0,children:a.jsx(Ml,{ref:m,value:r,handleSearch:R,handleKeyDown:C,handleOnClick:()=>{i(ie.bookNumberToId(e.bookNum)),u(ie.bookNumberToId(e.bookNum)),c(e.chapterNum>0?e.chapterNum:0),w(!0),m.current.focus()},onFocus:()=>{S.current=!0},handleSubmit:J,placeholder:`${ie.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`,direction:n})}),a.jsx(Nt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:I,align:n==="ltr"?"start":"end",ref:g,children:a.jsxs("div",{dir:n,className:N({"tw-ps-2":n==="rtl"}),children:[a.jsx(Zl,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ma.map((O,A)=>_(O).length>0&&a.jsxs("div",{children:[a.jsx(Zt,{className:"tw-font-semibold tw-text-foreground/80",children:Ql[O]}),_(O).map(X=>a.jsx("div",{children:a.jsx(Kl,{bookId:X,handleSelectBook:()=>P(X,!1),isSelected:s===X,handleHighlightBook:()=>u(X),handleKeyDown:$,bookType:O,ref:q=>{s===X&&(y.current=q)},direction:n,children:a.jsx(Jl,{handleSelectChapter:z,endChapter:dn(X),activeChapter:e.bookNum===ie.bookIdToNumber(X)?e.chapterNum:0,highlightedChapter:l,handleHighlightedChapter:q=>{c(q)}})})},X)),ma.length-1!==A?a.jsx(Qt,{}):void 0]},O))]})})]})})}const js=Kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=h.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},s)=>{const i=r?Wt.Slot:"button";return a.jsx(i,{className:N(js({variant:t,size:n,className:e})),ref:s,...o})});pe.displayName="Button";const ic=Kt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Ce=h.forwardRef(({className:e,...t},n)=>a.jsx(us.Root,{ref:n,className:N("pr-twp",ic(),e),...t}));Ce.displayName=us.Root.displayName;const uo=h.forwardRef(({className:e,...t},n)=>a.jsx(jn.Root,{className:N("pr-twp tw-grid tw-gap-2",e),...t,ref:n}));uo.displayName=jn.Root.displayName;const Qn=h.forwardRef(({className:e,...t},n)=>a.jsx(jn.Item,{ref:n,className:N("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:a.jsx(jn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(W.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Qn.displayName=jn.Item.displayName;const Ss=Sn.Root,Es=Sn.Trigger,po=h.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>a.jsx(Sn.Portal,{children:a.jsx(Sn.Content,{ref:o,align:t,sideOffset:n,className:N("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));po.displayName=Sn.Content.displayName;const lc=Ke.Portal,Cs=h.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Overlay,{ref:n,className:N("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Cs.displayName=Ke.Overlay.displayName;const cc=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(lc,{children:[a.jsx(Cs,{}),a.jsxs(Ke.Content,{ref:r,className:N("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,children:[t,a.jsxs(Ke.Close,{className:"tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",children:[a.jsx(W.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]}));cc.displayName=Ke.Content.displayName;const dc=h.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Title,{ref:n,className:N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));dc.displayName=Ke.Title.displayName;const uc=h.forwardRef(({className:e,...t},n)=>a.jsx(Ke.Description,{ref:n,className:N("tw-text-sm tw-text-muted-foreground",e),...t}));uc.displayName=Ke.Description.displayName;const wo=h.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command,{ref:n,className:N("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));wo.displayName=Oe.Command.displayName;const fo=h.forwardRef(({className:e,...t},n)=>a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",children:[a.jsx(W.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Oe.Command.Input,{ref:n,className:N("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]}));fo.displayName=Oe.Command.Input.displayName;const mo=h.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.List,{ref:n,className:N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));mo.displayName=Oe.Command.List.displayName;const ho=h.forwardRef((e,t)=>a.jsx(Oe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));ho.displayName=Oe.Command.Empty.displayName;const Ts=h.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Group,{ref:n,className:N("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Ts.displayName=Oe.Command.Group.displayName;const pc=h.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Separator,{ref:n,className:N("tw--mx-1 tw-h-px tw-bg-border",e),...t}));pc.displayName=Oe.Command.Separator.displayName;const go=h.forwardRef(({className:e,...t},n)=>a.jsx(Oe.Command.Item,{ref:n,className:N("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));go.displayName=Oe.Command.Item.displayName;function wc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Tn({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=wc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:w="outline",alignDropDown:b="start",dir:x="ltr",isDisabled:m=!1,...g}){const[y,_]=h.useState(!1);return a.jsxs(Ss,{open:y,onOpenChange:_,...g,children:[a.jsx(Es,{asChild:!0,children:a.jsxs(pe,{variant:w,role:"combobox","aria-expanded":y,id:e,className:N("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:m,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pe-2",children:c}),a.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),a.jsx(W.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(po,{align:b,className:N("tw-w-[200px] tw-p-0",o),dir:x,children:a.jsxs(wo,{children:[a.jsx(fo,{dir:x,placeholder:u,className:"tw-text-inherit"}),a.jsx(ho,{children:f}),a.jsx(mo,{children:t.map(R=>a.jsxs(go,{value:l(R),onSelect:()=>{i(R),_(!1)},children:[a.jsx(W.Check,{className:N("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(R)})}),l(R)]},l(R)))})]})})]})}function Rs({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s,direction:i="ltr"}){const l=h.useMemo(()=>Array.from({length:s},(u,f)=>f+1),[s]),c=u=>{n(u),u>t&&r(u)},d=u=>{r(u),u<e&&n(u)};return a.jsxs(a.Fragment,{children:[a.jsx(Ce,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(Tn,{isDisabled:o,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:u=>u.toString(),value:e,dir:i},"start chapter"),a.jsx(Ce,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(Tn,{isDisabled:o,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:u=>u.toString(),value:t,dir:i},"end chapter")]})}var Os=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Os||{});const fc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Or=(e,t)=>e[t]??t;function mc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d,direction:u}){const f=Or(d,"%webView_bookSelector_currentBook%"),w=Or(d,"%webView_bookSelector_choose%"),b=Or(d,"%webView_bookSelector_chooseBooks%"),[x,m]=h.useState("current book"),g=y=>{m(y),e(y)};return a.jsx(uo,{className:"pr-twp tw-flex",value:x,onValueChange:y=>g(y),dir:u,children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Qn,{value:"current book"}),a.jsx(Ce,{className:"tw-ms-1",children:f})]}),a.jsx(Ce,{className:"tw-flex tw-items-center",children:t}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Rs,{isDisabled:x==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s,direction:u})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(Qn,{value:"choose books"}),a.jsx(Ce,{className:"tw-ms-1",children:b})]}),a.jsx(Ce,{className:"tw-flex tw-items-center",children:r.map(y=>ie.bookIdToEnglishName(y)).join(", ")}),a.jsx(pe,{disabled:x==="current book",onClick:()=>n(),children:w})]})]})})}function hc({table:e}){return a.jsxs(Lt,{children:[a.jsx(cs.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(W.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(Nt,{align:"end",className:"tw-w-[150px]",children:[a.jsx(Zt,{children:"Toggle columns"}),a.jsx(Qt,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>a.jsx(Mn,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const zt=be.Root,_s=be.Group,Ft=be.Value,kt=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(be.Trigger,{ref:r,className:N("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,children:[t,a.jsx(be.Icon,{asChild:!0,children:a.jsx(W.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]}));kt.displayName=be.Trigger.displayName;const bo=h.forwardRef(({className:e,...t},n)=>a.jsx(be.ScrollUpButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(W.ChevronUp,{className:"tw-h-4 tw-w-4"})}));bo.displayName=be.ScrollUpButton.displayName;const vo=h.forwardRef(({className:e,...t},n)=>a.jsx(be.ScrollDownButton,{ref:n,className:N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:a.jsx(W.ChevronDown,{className:"tw-h-4 tw-w-4"})}));vo.displayName=be.ScrollDownButton.displayName;const jt=h.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>a.jsx(be.Portal,{children:a.jsxs(be.Content,{ref:o,className:N("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[a.jsx(bo,{}),a.jsx(be.Viewport,{className:N("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t}),a.jsx(vo,{})]})}));jt.displayName=be.Content.displayName;const Ps=h.forwardRef(({className:e,...t},n)=>a.jsx(be.Label,{ref:n,className:N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Ps.displayName=be.Label.displayName;const Ve=h.forwardRef(({className:e,children:t,...n},r)=>a.jsxs(be.Item,{ref:r,className:N("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(be.ItemIndicator,{children:a.jsx(W.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(be.ItemText,{children:t})]}));Ve.displayName=be.Item.displayName;const Is=h.forwardRef(({className:e,...t},n)=>a.jsx(be.Separator,{ref:n,className:N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Is.displayName=be.Separator.displayName;function gc({table:e}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(zt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[a.jsx(kt,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Ft,{placeholder:e.getState().pagination.pageSize})}),a.jsx(jt,{side:"top",children:[10,20,30,40,50].map(t=>a.jsx(Ve,{value:`${t}`,children:t},t))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(W.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(W.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(W.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(W.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const en=h.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("div",{className:N("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:a.jsx("table",{ref:r,className:N("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));en.displayName="Table";const tn=h.forwardRef(({className:e,stickyHeader:t,...n},r)=>a.jsx("thead",{ref:r,className:N({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));tn.displayName="TableHeader";const nn=h.forwardRef(({className:e,...t},n)=>a.jsx("tbody",{ref:n,className:N("[&_tr:last-child]:tw-border-0",e),...t}));nn.displayName="TableBody";const Ms=h.forwardRef(({className:e,...t},n)=>a.jsx("tfoot",{ref:n,className:N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Ms.displayName="TableFooter";const Xe=h.forwardRef(({className:e,...t},n)=>a.jsx("tr",{ref:n,className:N("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Xe.displayName="TableRow";const Me=h.forwardRef(({className:e,...t},n)=>a.jsx("th",{ref:n,className:N("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Me.displayName="TableHead";const Ee=h.forwardRef(({className:e,...t},n)=>a.jsx("td",{ref:n,className:N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ee.displayName="TableCell";const $s=h.forwardRef(({className:e,...t},n)=>a.jsx("caption",{ref:n,className:N("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));$s.displayName="TableCaption";function As({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var g;const[l,c]=h.useState([]),[d,u]=h.useState([]),[f,w]=h.useState({}),[b,x]=h.useState({}),m=ke.useReactTable({data:t,columns:e,getCoreRowModel:ke.getCoreRowModel(),...n&&{getPaginationRowModel:ke.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:ke.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:ke.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:f,rowSelection:b}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(hc,{table:m}),a.jsxs(en,{stickyHeader:s,children:[a.jsx(tn,{stickyHeader:s,children:m.getHeaderGroups().map(y=>a.jsx(Xe,{children:y.headers.map(_=>a.jsx(Me,{children:_.isPlaceholder?void 0:ke.flexRender(_.column.columnDef.header,_.getContext())},_.id))},y.id))}),a.jsx(nn,{children:(g=m.getRowModel().rows)!=null&&g.length?m.getRowModel().rows.map(y=>a.jsx(Xe,{onClick:()=>i(y,m),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(_=>a.jsx(Ee,{children:ke.flexRender(_.column.columnDef.cell,_.getContext())},_.id))},y.id)):a.jsx(Xe,{children:a.jsx(Ee,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),a.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx(gc,{table:m})]})}function bc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=h.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>ee.deepEqual(c,l))||i.push(l)}),i},[e]);return a.jsxs(en,{stickyHeader:!0,children:[a.jsx(tn,{stickyHeader:!0,children:a.jsxs(Xe,{children:[a.jsx(Me,{children:r}),a.jsx(Me,{children:o})]})}),a.jsx(nn,{children:s.length>0&&s.map(i=>a.jsxs(Xe,{onClick:()=>{t(i.reference)},children:[a.jsx(Ee,{children:`${ie.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(Ee,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const lr=h.forwardRef(({className:e,...t},n)=>a.jsx(qr.Root,{ref:n,className:N("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:a.jsx(qr.Indicator,{className:N("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(W.Check,{className:"tw-h-4 tw-w-4"})})}));lr.displayName=qr.Root.displayName;const Ds=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Xr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Bs=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?ie.bookIdToNumber(t[1]):0},Vs=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Ls=Kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),vc=h.forwardRef(({className:e,variant:t,size:n,...r},o)=>a.jsx(ps.Root,{ref:o,className:N(Ls({variant:t,size:n,className:e})),...r}));vc.displayName=ps.Root.displayName;const zs=h.createContext({size:"default",variant:"default"}),xo=h.forwardRef(({className:e,variant:t,size:n,children:r,...o},s)=>a.jsx(ir.Root,{ref:s,className:N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,children:a.jsx(zs.Provider,{value:{variant:t,size:n},children:r})}));xo.displayName=ir.Root.displayName;const xn=h.forwardRef(({className:e,children:t,variant:n,size:r,...o},s)=>{const i=h.useContext(zs);return a.jsx(ir.Item,{ref:s,className:N(Ls({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});xn.displayName=ir.Item.displayName;const cr=e=>e==="asc"?a.jsx(W.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?a.jsx(W.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(W.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),xc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cr(t.getIsSorted())]})}),yc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>a.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,cr(n.getIsSorted())]})}),Nc=e=>({accessorKey:"count",header:({column:t})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cr(t.getIsSorted())]})}),cell:({row:t})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),_r=(e,t,n,r,o,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},kc=(e,t,n,r,o,s="ltr")=>({accessorKey:"status",header:({column:i})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(pe,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[e,cr(i.getIsSorted())]})}),cell:({row:i})=>{const l=i.getValue("status"),c=i.getValue("item");return a.jsxs(xo,{value:l,variant:"outline",type:"single",dir:s,children:[a.jsx(xn,{onClick:()=>_r([c],"approved",t,n,r,o),value:"approved",children:a.jsx(W.CircleCheckIcon,{})}),a.jsx(xn,{onClick:()=>_r([c],"unapproved",t,n,r,o),value:"unapproved",children:a.jsx(W.CircleXIcon,{})}),a.jsx(xn,{onClick:()=>_r([c],"unknown",t,n,r,o),value:"unknown",children:a.jsx(W.CircleHelpIcon,{})})]})}}),jc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Sc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Ec=(e,t,n,r,o)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Ds(e).forEach(u=>{u.startsWith("\\id")&&(i=Bs(u),l=0,c=0),u.startsWith("\\c")&&(l=Xr(u),c=0),u.startsWith("\\v")&&(c=Xr(u),l===0&&(l=t.chapterNum));let f=o.exec(u)??void 0;for(;f;){const w=[];f.forEach(g=>w.push(g));const b=f.index,x=s.find(g=>ee.deepEqual(g.items,w)),m={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:ee.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(x)x.count+=1,x.occurrences.push(m);else{const g={items:w,count:1,status:Vs(w[0],n,r),occurrences:[m]};s.push(g)}f=o.exec(u)??void 0}}),s},et=(e,t)=>e[t]??t;function Cc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u,direction:f}){const w=et(n,"%webView_inventory_all%"),b=et(n,"%webView_inventory_approved%"),x=et(n,"%webView_inventory_unapproved%"),m=et(n,"%webView_inventory_unknown%"),g=et(n,"%webView_inventory_scope_currentBook%"),y=et(n,"%webView_inventory_scope_chapter%"),_=et(n,"%webView_inventory_scope_verse%"),R=et(n,"%webView_inventory_filter_text%"),S=et(n,"%webView_inventory_show_additional_items%"),[v,P]=h.useState(!1),[z,J]=h.useState("all"),[C,I]=h.useState(""),[$,O]=h.useState([]),A=h.useMemo(()=>l?r instanceof RegExp?Ec(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),X=h.useMemo(()=>{if(v)return A;const j=[];return A.forEach(F=>{const H=F.items[0],G=j.find(Y=>Y.items[0]===H);G?(G.count+=F.count,G.occurrences=G.occurrences.concat(F.occurrences)):j.push({items:[H],count:F.count,occurrences:F.occurrences,status:F.status})}),j},[v,A]),q=h.useMemo(()=>Sc(X,z,C),[X,z,C]),V=h.useMemo(()=>{var H,G;if(!v)return u;const j=(H=o==null?void 0:o.tableHeaders)==null?void 0:H.length;if(!j)return u;const F=[];for(let Y=0;Y<j;Y++)F.push(yc(((G=o==null?void 0:o.tableHeaders)==null?void 0:G[Y])||"Additional Item",Y+1));return[...F,...u]},[o==null?void 0:o.tableHeaders,u,v]);h.useEffect(()=>{O([])},[q]);const te=(j,F)=>{F.setRowSelection(()=>{const H={};return H[j.index]=!0,H}),O(j.original.items)},oe=j=>{if(j==="book"||j==="chapter"||j==="verse")d(j);else throw new Error(`Invalid scope value: ${j}`)},se=j=>{if(j==="all"||j==="approved"||j==="unapproved"||j==="unknown")J(j);else throw new Error(`Invalid status filter value: ${j}`)},k=h.useMemo(()=>{if(X.length===0||$.length===0)return[];const j=X.filter(F=>ee.deepEqual(v?F.items:[F.items[0]],$));if(j.length>1)throw new Error("Selected item is not unique");return j[0].occurrences},[$,v,X]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(zt,{onValueChange:j=>se(j),defaultValue:z,dir:f,children:[a.jsx(kt,{className:"tw-m-1",children:a.jsx(Ft,{placeholder:"Select filter"})}),a.jsxs(jt,{children:[a.jsx(Ve,{value:"all",children:w}),a.jsx(Ve,{value:"approved",children:b}),a.jsx(Ve,{value:"unapproved",children:x}),a.jsx(Ve,{value:"unknown",children:m})]})]}),a.jsxs(zt,{onValueChange:j=>oe(j),defaultValue:c,dir:f,children:[a.jsx(kt,{className:"tw-m-1",children:a.jsx(Ft,{placeholder:"Select scope"})}),a.jsxs(jt,{children:[a.jsx(Ve,{value:"book",children:g}),a.jsx(Ve,{value:"chapter",children:y}),a.jsx(Ve,{value:"verse",children:_})]})]}),a.jsx(lt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:R,value:C,onChange:j=>{I(j.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(lr,{className:"tw-m-1",checked:v,onCheckedChange:j=>{O([]),P(j)}}),a.jsx(Ce,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??S})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(As,{columns:V,data:q,onRowClickHandler:te,stickyHeader:!0})}),k.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(bc,{occurrenceData:k,setScriptureReference:t,localizedStrings:n})})]})}function Tc({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,direction:d="ltr"}){const[u,f]=h.useState(!1),w=h.useCallback(m=>{r(n.includes(m)?n.filter(g=>g!==m):[...n,m])},[n,r]),b=()=>{var m;return n.length===1?((m=e.find(g=>g.value===n[0]))==null?void 0:m.label)??o:i||o},x=h.useMemo(()=>{if(!l)return e;const m=e.filter(y=>y.starred).sort((y,_)=>y.label.localeCompare(_.label)),g=e.filter(y=>!y.starred).sort((y,_)=>{const R=n.includes(y.value),S=n.includes(_.value);return R&&!S?-1:!R&&S?1:y.label.localeCompare(_.label)});return[...m,...g]},[e,n,l]);return a.jsxs(Ss,{open:u,onOpenChange:f,children:[a.jsx(Es,{asChild:!0,children:a.jsxs(pe,{variant:"outline",role:"combobox","aria-expanded":u,className:N("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:N({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:b()})]}),a.jsx(W.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(po,{align:"start",className:"tw-w-full tw-p-0",dir:d,children:a.jsxs(wo,{children:[a.jsx(fo,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(mo,{children:[a.jsx(ho,{children:s}),a.jsx(Ts,{children:x.map(m=>{const g=t?t(m):void 0;return a.jsxs(go,{value:m.value,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(W.Check,{className:N("tw-h-4 tw-w-4",n.includes(m.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:m.starred&&a.jsx(W.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:m.label}),t&&a.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:g})]},m.value)})})]})]})})]})}function yo({onSearch:e,placeholder:t,isFullWidth:n,className:r,direction:o="ltr"}){const[s,i]=h.useState(""),l=c=>{i(c),e(c)};return a.jsxs("div",{className:"tw-relative",children:[a.jsx(W.Search,{className:N("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":o==="rtl"},{"tw-left-3":o==="ltr"})}),a.jsx(lt,{className:N("tw-text-ellipsis tw-pe-9 tw-ps-9",{"tw-w-full":n},r),placeholder:t,value:s,onChange:c=>l(c.target.value)}),s&&a.jsxs(pe,{variant:"ghost",size:"icon",className:N("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":o==="rtl"},{"tw-right-0":o==="ltr"}),children:[a.jsx(W.X,{className:"tw-h-4 tw-w-4",onClick:()=>{l("")}}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const No=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.Root,{orientation:"vertical",ref:n,className:N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t}));No.displayName=_e.List.displayName;const ko=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.List,{ref:n,className:N("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));ko.displayName=_e.List.displayName;const Fs=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,...t,className:N("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),jo=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));jo.displayName=_e.Content.displayName;function Rc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1,direction:s="ltr"}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?a.jsx("h1",{children:r}):"",a.jsx(yo,{isFullWidth:o,onSearch:t,placeholder:n,direction:s})]}),a.jsxs(No,{dir:s,children:[a.jsx(ko,{children:e.map(i=>a.jsx(Fs,{value:i.value,children:i.value},i.key))}),e.map(i=>a.jsx(jo,{value:i.value,children:i.content},i.key))]})]})}const dr=h.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>a.jsx(ws.Root,{ref:o,decorative:n,orientation:t,className:N("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));dr.displayName=ws.Root.displayName;function ha({className:e,...t}){return a.jsx("div",{className:N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const Oc=In.Provider,_c=In.Root,Pc=In.Trigger,Gs=h.forwardRef(({className:e,sideOffset:t=4,...n},r)=>a.jsx(In.Content,{ref:r,sideOffset:t,className:N("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Gs.displayName=In.Content.displayName;const Ic="16rem",Mc="3rem",Us=h.createContext(void 0);function ur(){const e=h.useContext(Us);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const qs=h.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:o,children:s,side:i="left",...l},c)=>{const[d,u]=h.useState(e),f=t??d,w=h.useCallback(g=>{const y=typeof g=="function"?g(f):g;n?n(y):u(y)},[n,f]),b=h.useCallback(()=>w(g=>!g),[w]),x=f?"expanded":"collapsed",m=h.useMemo(()=>({state:x,open:f,setOpen:w,toggleSidebar:b,side:i}),[x,f,w,b,i]);return a.jsx(Us.Provider,{value:m,children:a.jsx(Oc,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Ic,"--sidebar-width-icon":Mc,...o},className:N("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});qs.displayName="SidebarProvider";const Hs=h.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:r,...o},s)=>{const i=ur();return t==="none"?a.jsx("div",{className:N("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):a.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[a.jsx("div",{className:N("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=right]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:N("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="left"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=left]:tw-border-r group-data-[side=right]:tw-border-l",n),...o,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Hs.displayName="Sidebar";const $c=h.forwardRef(({className:e,onClick:t,...n},r)=>{const o=ur();return a.jsxs(pe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:N("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),o.toggleSidebar()},...n,children:[o.side==="left"?a.jsx(W.PanelLeft,{}):a.jsx(W.PanelRight,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});$c.displayName="SidebarTrigger";const Ac=h.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=ur();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:N("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=left]:tw--right-4 group-data-[side=right]:tw-left-0 sm:tw-flex","[[data-side=left]_&]:tw-cursor-w-resize [[data-side=right]_&]:tw-cursor-e-resize","[[data-side=left][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=left][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=right][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Ac.displayName="SidebarRail";const Xs=h.forwardRef(({className:e,...t},n)=>a.jsx("main",{ref:n,className:N("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));Xs.displayName="SidebarInset";const Dc=h.forwardRef(({className:e,...t},n)=>a.jsx(lt,{ref:n,"data-sidebar":"input",className:N("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));Dc.displayName="SidebarInput";const Bc=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Bc.displayName="SidebarHeader";const Vc=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:N("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Vc.displayName="SidebarFooter";const Lc=h.forwardRef(({className:e,...t},n)=>a.jsx(dr,{ref:n,"data-sidebar":"separator",className:N("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));Lc.displayName="SidebarSeparator";const Ys=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:N("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));Ys.displayName="SidebarContent";const Yr=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));Yr.displayName="SidebarGroup";const Wr=h.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Wt.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:N("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});Wr.displayName="SidebarGroupLabel";const zc=h.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const o=t?Wt.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:N("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});zc.displayName="SidebarGroupAction";const Kr=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:N("tw-w-full tw-text-sm",e),...t}));Kr.displayName="SidebarGroupContent";const Ws=h.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));Ws.displayName="SidebarMenu";const Ks=h.forwardRef(({className:e,...t},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:N("tw-group/menu-item tw-relative",e),...t}));Ks.displayName="SidebarMenuItem";const Fc=Kt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Js=h.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=e?Wt.Slot:"button",{state:d}=ur(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:N(Fc({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(_c,{children:[a.jsx(Pc,{asChild:!0,children:u}),a.jsx(Gs,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});Js.displayName="SidebarMenuButton";const Gc=h.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},o)=>{const s=t?Wt.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:N("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});Gc.displayName="SidebarMenuAction";const Uc=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:N("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Uc.displayName="SidebarMenuBadge";const qc=h.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const o=h.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&a.jsx(ha,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(ha,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});qc.displayName="SidebarMenuSkeleton";const Hc=h.forwardRef(({className:e,...t},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:N("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Hc.displayName="SidebarMenuSub";const Xc=h.forwardRef(({...e},t)=>a.jsx("li",{ref:t,...e}));Xc.displayName="SidebarMenuSubItem";const Yc=h.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...o},s)=>{const i=e?Wt.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:N("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});Yc.displayName="SidebarMenuSubButton";function Zs({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=h.useCallback((f,w)=>{r(f,w)},[r]),d=h.useCallback(f=>{const w=n.find(b=>b.projectId===f);return w?w.projectName:f},[n]),u=h.useCallback(f=>!o.projectId&&f===o.label,[o]);return a.jsx(Hs,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:a.jsxs(Ys,{children:[a.jsxs(Yr,{children:[a.jsx(Wr,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(Kr,{children:a.jsx(Ws,{children:t.map(f=>a.jsx(Ks,{children:a.jsx(Js,{className:N("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(f)}),onClick:()=>c(f),isActive:u(f),children:a.jsx("span",{className:"tw-pl-3",children:f})})},f))})})]}),a.jsxs(Yr,{children:[a.jsx(Wr,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(Kr,{className:"tw-pl-3",children:a.jsx(Tn,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:f=>d(f),buttonPlaceholder:l,onChange:f=>{const w=d(f);c(w,f)},value:(o==null?void 0:o.projectId)??void 0})})]})]})})}function Wc({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,onSearch:i,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(yo,{className:"tw-w-9/12",onSearch:i,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(qs,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[a.jsx(Zs,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}),a.jsx(Xs,{className:"tw-overflow-y-auto",children:r})]})]})}const at="scrBook",Kc="scrRef",ht="source",Jc="details",Zc="Scripture Reference",Qc="Scripture Book",Qs="Type",ed="Details";function td(e,t){const n=t??!1;return[{accessorFn:r=>`${ie.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:at,header:(e==null?void 0:e.scriptureReferenceColumnName)??Zc,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ie.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===at?ee.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>ee.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>ee.formatScrRef(r.start),id:Kc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:ee.formatScrRef(o.start)},sortingFn:(r,o)=>ee.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:ht,header:n?(e==null?void 0:e.typeColumnName)??Qs:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:Jc,header:(e==null?void 0:e.detailsColumnName)??ed,cell:r=>r.getValue(),enableGrouping:!1}]}const nd=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||ee.compareScrRefs(e.start,e.end)===0?`${ee.scrRefToBBBCCCVVV(e.start)}+${t}`:`${ee.scrRefToBBBCCCVVV(e.start)}+${t}-${ee.scrRefToBBBCCCVVV(e.end)}+${n}`},ga=e=>`${nd({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function rd({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[d,u]=h.useState([]),[f,w]=h.useState([{id:at,desc:!1}]),[b,x]=h.useState({}),m=h.useMemo(()=>e.flatMap(C=>C.data.map(I=>({...I,source:C.source}))),[e]),g=h.useMemo(()=>td({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);h.useEffect(()=>{d.includes(ht)?w([{id:ht,desc:!1},{id:at,desc:!1}]):w([{id:at,desc:!1}])},[d]);const y=ke.useReactTable({data:m,columns:g,state:{grouping:d,sorting:f,rowSelection:b},onGroupingChange:u,onSortingChange:w,onRowSelectionChange:x,getExpandedRowModel:ke.getExpandedRowModel(),getGroupedRowModel:ke.getGroupedRowModel(),getCoreRowModel:ke.getCoreRowModel(),getSortedRowModel:ke.getSortedRowModel(),getRowId:ga,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});h.useEffect(()=>{if(l){const C=y.getSelectedRowModel().rowsById,I=Object.keys(C);if(I.length===1){const $=m.find(O=>ga(O)===I[0])||void 0;$&&l($)}}},[b,m,l,y]);const _=o??Qc,R=s??Qs,S=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[at]},{label:`Group by ${R}`,value:[ht]},{label:`Group by ${_} and ${R}`,value:[at,ht]},{label:`Group by ${R} and ${_}`,value:[ht,at]}],v=C=>{u(JSON.parse(C))},P=(C,I)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(I)},z=(C,I)=>C.getIsGrouped()?"":N("banded-row",I%2===0?"even":"odd"),J=(C,I,$)=>{if(!((C==null?void 0:C.length)===0||I.depth<$.column.getGroupedIndex())){if(I.getIsGrouped())switch(I.depth){case 1:return"tw-ps-4";default:return}switch(I.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&a.jsxs(zt,{value:JSON.stringify(d),onValueChange:C=>{v(C)},dir:c,children:[a.jsx(kt,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Ft,{})}),a.jsx(jt,{position:"item-aligned",children:a.jsx(_s,{children:S.map(C=>a.jsx(Ve,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),a.jsxs(en,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&a.jsx(tn,{children:y.getHeaderGroups().map(C=>a.jsx(Xe,{children:C.headers.filter(I=>I.column.columnDef.header).map(I=>a.jsx(Me,{colSpan:I.colSpan,className:"top-0 tw-sticky",children:I.isPlaceholder?void 0:a.jsxs("div",{children:[I.column.getCanGroup()?a.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${I.column.columnDef.header}`,onClick:I.column.getToggleGroupingHandler(),type:"button",children:I.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ke.flexRender(I.column.columnDef.header,I.getContext())]})},I.id))},C.id))}),a.jsx(nn,{children:y.getRowModel().rows.map((C,I)=>a.jsx(Xe,{"data-state":C.getIsSelected()?"selected":"",className:N(z(C,I)),onClick:$=>P(C,$),children:C.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==ht||!n)))return a.jsx(Ee,{className:N($.column.columnDef.id,"tw-p-[1px]",J(d,C,$)),children:(()=>$.getIsGrouped()?a.jsxs(pe,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&a.jsx(W.ChevronDown,{}),!C.getIsExpanded()&&(c==="ltr"?a.jsx(W.ChevronRight,{}):a.jsx(W.ChevronLeft,{}))," ",ke.flexRender($.column.columnDef.cell,$.getContext())," (",C.subRows.length,")"]}):ke.flexRender($.column.columnDef.cell,$.getContext()))()},$.id)})},C.id))})]})]})}const Pr={[ee.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ee.getLocalizeKeyForScrollGroupId(0)]:"A",[ee.getLocalizeKeyForScrollGroupId(1)]:"B",[ee.getLocalizeKeyForScrollGroupId(2)]:"C",[ee.getLocalizeKeyForScrollGroupId(3)]:"D",[ee.getLocalizeKeyForScrollGroupId(4)]:"E",[ee.getLocalizeKeyForScrollGroupId(5)]:"F",[ee.getLocalizeKeyForScrollGroupId(6)]:"G",[ee.getLocalizeKeyForScrollGroupId(7)]:"H",[ee.getLocalizeKeyForScrollGroupId(8)]:"I",[ee.getLocalizeKeyForScrollGroupId(9)]:"J",[ee.getLocalizeKeyForScrollGroupId(10)]:"K",[ee.getLocalizeKeyForScrollGroupId(11)]:"L",[ee.getLocalizeKeyForScrollGroupId(12)]:"M",[ee.getLocalizeKeyForScrollGroupId(13)]:"N",[ee.getLocalizeKeyForScrollGroupId(14)]:"O",[ee.getLocalizeKeyForScrollGroupId(15)]:"P",[ee.getLocalizeKeyForScrollGroupId(16)]:"Q",[ee.getLocalizeKeyForScrollGroupId(17)]:"R",[ee.getLocalizeKeyForScrollGroupId(18)]:"S",[ee.getLocalizeKeyForScrollGroupId(19)]:"T",[ee.getLocalizeKeyForScrollGroupId(20)]:"U",[ee.getLocalizeKeyForScrollGroupId(21)]:"V",[ee.getLocalizeKeyForScrollGroupId(22)]:"W",[ee.getLocalizeKeyForScrollGroupId(23)]:"X",[ee.getLocalizeKeyForScrollGroupId(24)]:"Y",[ee.getLocalizeKeyForScrollGroupId(25)]:"Z"};function od({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={},direction:o="ltr"}){const s={...Pr,...Object.fromEntries(Object.entries(r).map(([i,l])=>[i,i===l&&i in Pr?Pr[i]:l]))};return a.jsxs(zt,{value:`${t}`,onValueChange:i=>n(i==="undefined"?void 0:parseInt(i,10)),dir:o,children:[a.jsx(kt,{className:"pr-twp tw-w-auto",children:a.jsx(Ft,{placeholder:s[ee.getLocalizeKeyForScrollGroupId(t)]??t})}),a.jsx(jt,{style:{zIndex:250},children:e.map(i=>a.jsx(Ve,{value:`${i}`,children:s[ee.getLocalizeKeyForScrollGroupId(i)]},`${i}`))})]})}function ad({children:e}){return a.jsx("div",{className:"pr-twp tw-grid",children:e})}function sd({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function id({primary:e,secondary:t,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?a.jsx(dr,{}):""]})}function ld({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:e,className:t,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(lr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(Ce,{children:s?s(i):i})]},i))})}function cd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function dd(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var So={},ei={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(ei);var ud=ei.exports,Ir={};function Eo(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},M.apply(this,arguments)}function vt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ti(e){if(!vt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ti(e[n])}),t}function tt(e,t,n={clone:!0}){const r=n.clone?M({},e):e;return vt(e)&&vt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(vt(t[o])&&o in e&&vt(e[o])?r[o]=tt(e[o],t[o],n):n.clone?r[o]=vt(t[o])?ti(t[o]):t[o]:r[o]=t[o])}),r}var Jr={exports:{}},qn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ba;function pd(){if(ba)return le;ba=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function R(v){if(typeof v=="object"&&v!==null){var P=v.$$typeof;switch(P){case t:switch(v=v.type,v){case c:case d:case r:case s:case o:case f:return v;default:switch(v=v&&v.$$typeof,v){case l:case u:case x:case b:case i:return v;default:return P}}case n:return P}}}function S(v){return R(v)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=i,le.Element=t,le.ForwardRef=u,le.Fragment=r,le.Lazy=x,le.Memo=b,le.Portal=n,le.Profiler=s,le.StrictMode=o,le.Suspense=f,le.isAsyncMode=function(v){return S(v)||R(v)===c},le.isConcurrentMode=S,le.isContextConsumer=function(v){return R(v)===l},le.isContextProvider=function(v){return R(v)===i},le.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},le.isForwardRef=function(v){return R(v)===u},le.isFragment=function(v){return R(v)===r},le.isLazy=function(v){return R(v)===x},le.isMemo=function(v){return R(v)===b},le.isPortal=function(v){return R(v)===n},le.isProfiler=function(v){return R(v)===s},le.isStrictMode=function(v){return R(v)===o},le.isSuspense=function(v){return R(v)===f},le.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===d||v===s||v===o||v===f||v===w||typeof v=="object"&&v!==null&&(v.$$typeof===x||v.$$typeof===b||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===g||v.$$typeof===y||v.$$typeof===_||v.$$typeof===m)},le.typeOf=R,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var va;function wd(){return va||(va=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,g=e?Symbol.for("react.fundamental"):60117,y=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function R(E){return typeof E=="string"||typeof E=="function"||E===r||E===d||E===s||E===o||E===f||E===w||typeof E=="object"&&E!==null&&(E.$$typeof===x||E.$$typeof===b||E.$$typeof===i||E.$$typeof===l||E.$$typeof===u||E.$$typeof===g||E.$$typeof===y||E.$$typeof===_||E.$$typeof===m)}function S(E){if(typeof E=="object"&&E!==null){var we=E.$$typeof;switch(we){case t:var B=E.type;switch(B){case c:case d:case r:case s:case o:case f:return B;default:var xe=B&&B.$$typeof;switch(xe){case l:case u:case x:case b:case i:return xe;default:return we}}case n:return we}}}var v=c,P=d,z=l,J=i,C=t,I=u,$=r,O=x,A=b,X=n,q=s,V=o,te=f,oe=!1;function se(E){return oe||(oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),k(E)||S(E)===c}function k(E){return S(E)===d}function j(E){return S(E)===l}function F(E){return S(E)===i}function H(E){return typeof E=="object"&&E!==null&&E.$$typeof===t}function G(E){return S(E)===u}function Y(E){return S(E)===r}function L(E){return S(E)===x}function Z(E){return S(E)===b}function K(E){return S(E)===n}function Q(E){return S(E)===s}function T(E){return S(E)===o}function U(E){return S(E)===f}ce.AsyncMode=v,ce.ConcurrentMode=P,ce.ContextConsumer=z,ce.ContextProvider=J,ce.Element=C,ce.ForwardRef=I,ce.Fragment=$,ce.Lazy=O,ce.Memo=A,ce.Portal=X,ce.Profiler=q,ce.StrictMode=V,ce.Suspense=te,ce.isAsyncMode=se,ce.isConcurrentMode=k,ce.isContextConsumer=j,ce.isContextProvider=F,ce.isElement=H,ce.isForwardRef=G,ce.isFragment=Y,ce.isLazy=L,ce.isMemo=Z,ce.isPortal=K,ce.isProfiler=Q,ce.isStrictMode=T,ce.isSuspense=U,ce.isValidElementType=R,ce.typeOf=S}()),ce}var xa;function ni(){return xa||(xa=1,process.env.NODE_ENV==="production"?qn.exports=pd():qn.exports=wd()),qn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Mr,ya;function fd(){if(ya)return Mr;ya=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Mr=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Mr}var $r,Na;function Co(){if(Na)return $r;Na=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $r=e,$r}var Ar,ka;function ri(){return ka||(ka=1,Ar=Function.call.bind(Object.prototype.hasOwnProperty)),Ar}var Dr,ja;function md(){if(ja)return Dr;ja=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Co(),n={},r=ri();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var f;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}f=s[u](i,u,c,l,null,t)}catch(x){f=x}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Dr=o,Dr}var Br,Sa;function hd(){if(Sa)return Br;Sa=1;var e=ni(),t=fd(),n=Co(),r=ri(),o=md(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Br=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(k){var j=k&&(d&&k[d]||k[u]);if(typeof j=="function")return j}var w="<<anonymous>>",b={array:y("array"),bigint:y("bigint"),bool:y("boolean"),func:y("function"),number:y("number"),object:y("object"),string:y("string"),symbol:y("symbol"),any:_(),arrayOf:R,element:S(),elementType:v(),instanceOf:P,node:I(),objectOf:J,oneOf:z,oneOfType:C,shape:O,exact:A};function x(k,j){return k===j?k!==0||1/k===1/j:k!==k&&j!==j}function m(k,j){this.message=k,this.data=j&&typeof j=="object"?j:{},this.stack=""}m.prototype=Error.prototype;function g(k){if(process.env.NODE_ENV!=="production")var j={},F=0;function H(Y,L,Z,K,Q,T,U){if(K=K||w,T=T||Z,U!==n){if(c){var E=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw E.name="Invariant Violation",E}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var we=K+":"+Z;!j[we]&&F<3&&(s("You are manually calling a React.PropTypes validation function for the `"+T+"` prop on `"+K+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),j[we]=!0,F++)}}return L[Z]==null?Y?L[Z]===null?new m("The "+Q+" `"+T+"` is marked as required "+("in `"+K+"`, but its value is `null`.")):new m("The "+Q+" `"+T+"` is marked as required in "+("`"+K+"`, but its value is `undefined`.")):null:k(L,Z,K,Q,T)}var G=H.bind(null,!1);return G.isRequired=H.bind(null,!0),G}function y(k){function j(F,H,G,Y,L,Z){var K=F[H],Q=V(K);if(Q!==k){var T=te(K);return new m("Invalid "+Y+" `"+L+"` of type "+("`"+T+"` supplied to `"+G+"`, expected ")+("`"+k+"`."),{expectedType:k})}return null}return g(j)}function _(){return g(i)}function R(k){function j(F,H,G,Y,L){if(typeof k!="function")return new m("Property `"+L+"` of component `"+G+"` has invalid PropType notation inside arrayOf.");var Z=F[H];if(!Array.isArray(Z)){var K=V(Z);return new m("Invalid "+Y+" `"+L+"` of type "+("`"+K+"` supplied to `"+G+"`, expected an array."))}for(var Q=0;Q<Z.length;Q++){var T=k(Z,Q,G,Y,L+"["+Q+"]",n);if(T instanceof Error)return T}return null}return g(j)}function S(){function k(j,F,H,G,Y){var L=j[F];if(!l(L)){var Z=V(L);return new m("Invalid "+G+" `"+Y+"` of type "+("`"+Z+"` supplied to `"+H+"`, expected a single ReactElement."))}return null}return g(k)}function v(){function k(j,F,H,G,Y){var L=j[F];if(!e.isValidElementType(L)){var Z=V(L);return new m("Invalid "+G+" `"+Y+"` of type "+("`"+Z+"` supplied to `"+H+"`, expected a single ReactElement type."))}return null}return g(k)}function P(k){function j(F,H,G,Y,L){if(!(F[H]instanceof k)){var Z=k.name||w,K=se(F[H]);return new m("Invalid "+Y+" `"+L+"` of type "+("`"+K+"` supplied to `"+G+"`, expected ")+("instance of `"+Z+"`."))}return null}return g(j)}function z(k){if(!Array.isArray(k))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function j(F,H,G,Y,L){for(var Z=F[H],K=0;K<k.length;K++)if(x(Z,k[K]))return null;var Q=JSON.stringify(k,function(U,E){var we=te(E);return we==="symbol"?String(E):E});return new m("Invalid "+Y+" `"+L+"` of value `"+String(Z)+"` "+("supplied to `"+G+"`, expected one of "+Q+"."))}return g(j)}function J(k){function j(F,H,G,Y,L){if(typeof k!="function")return new m("Property `"+L+"` of component `"+G+"` has invalid PropType notation inside objectOf.");var Z=F[H],K=V(Z);if(K!=="object")return new m("Invalid "+Y+" `"+L+"` of type "+("`"+K+"` supplied to `"+G+"`, expected an object."));for(var Q in Z)if(r(Z,Q)){var T=k(Z,Q,G,Y,L+"."+Q,n);if(T instanceof Error)return T}return null}return g(j)}function C(k){if(!Array.isArray(k))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var j=0;j<k.length;j++){var F=k[j];if(typeof F!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+oe(F)+" at index "+j+"."),i}function H(G,Y,L,Z,K){for(var Q=[],T=0;T<k.length;T++){var U=k[T],E=U(G,Y,L,Z,K,n);if(E==null)return null;E.data&&r(E.data,"expectedType")&&Q.push(E.data.expectedType)}var we=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new m("Invalid "+Z+" `"+K+"` supplied to "+("`"+L+"`"+we+"."))}return g(H)}function I(){function k(j,F,H,G,Y){return X(j[F])?null:new m("Invalid "+G+" `"+Y+"` supplied to "+("`"+H+"`, expected a ReactNode."))}return g(k)}function $(k,j,F,H,G){return new m((k||"React class")+": "+j+" type `"+F+"."+H+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+G+"`.")}function O(k){function j(F,H,G,Y,L){var Z=F[H],K=V(Z);if(K!=="object")return new m("Invalid "+Y+" `"+L+"` of type `"+K+"` "+("supplied to `"+G+"`, expected `object`."));for(var Q in k){var T=k[Q];if(typeof T!="function")return $(G,Y,L,Q,te(T));var U=T(Z,Q,G,Y,L+"."+Q,n);if(U)return U}return null}return g(j)}function A(k){function j(F,H,G,Y,L){var Z=F[H],K=V(Z);if(K!=="object")return new m("Invalid "+Y+" `"+L+"` of type `"+K+"` "+("supplied to `"+G+"`, expected `object`."));var Q=t({},F[H],k);for(var T in Q){var U=k[T];if(r(k,T)&&typeof U!="function")return $(G,Y,L,T,te(U));if(!U)return new m("Invalid "+Y+" `"+L+"` key `"+T+"` supplied to `"+G+"`.\nBad object: "+JSON.stringify(F[H],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(k),null,"  "));var E=U(Z,T,G,Y,L+"."+T,n);if(E)return E}return null}return g(j)}function X(k){switch(typeof k){case"number":case"string":case"undefined":return!0;case"boolean":return!k;case"object":if(Array.isArray(k))return k.every(X);if(k===null||l(k))return!0;var j=f(k);if(j){var F=j.call(k),H;if(j!==k.entries){for(;!(H=F.next()).done;)if(!X(H.value))return!1}else for(;!(H=F.next()).done;){var G=H.value;if(G&&!X(G[1]))return!1}}else return!1;return!0;default:return!1}}function q(k,j){return k==="symbol"?!0:j?j["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&j instanceof Symbol:!1}function V(k){var j=typeof k;return Array.isArray(k)?"array":k instanceof RegExp?"object":q(j,k)?"symbol":j}function te(k){if(typeof k>"u"||k===null)return""+k;var j=V(k);if(j==="object"){if(k instanceof Date)return"date";if(k instanceof RegExp)return"regexp"}return j}function oe(k){var j=te(k);switch(j){case"array":case"object":return"an "+j;case"boolean":case"date":case"regexp":return"a "+j;default:return j}}function se(k){return!k.constructor||!k.constructor.name?w:k.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Br}var Vr,Ea;function gd(){if(Ea)return Vr;Ea=1;var e=Co();function t(){}function n(){}return n.resetWarningCache=t,Vr=function(){function r(i,l,c,d,u,f){if(f!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Vr}if(process.env.NODE_ENV!=="production"){var bd=ni(),vd=!0;Jr.exports=hd()(bd.isElement,vd)}else Jr.exports=gd()();var xd=Jr.exports;const p=cd(xd);function yd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function oi(e,t,n,r,o){const s=e[t],i=o||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!yd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const ai=Eo(p.element,oi);ai.isRequired=Eo(p.element.isRequired,oi);const si=ai,Nd="exact-prop: ​";function kd(e){return process.env.NODE_ENV==="production"?e:M({},e,{[Nd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Gt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Zr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function jd(){if(Ca)return de;Ca=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function m(g){if(typeof g=="object"&&g!==null){var y=g.$$typeof;switch(y){case e:switch(g=g.type,g){case n:case o:case r:case d:case u:return g;default:switch(g=g&&g.$$typeof,g){case l:case i:case c:case w:case f:case s:return g;default:return y}}case t:return y}}}return de.ContextConsumer=i,de.ContextProvider=s,de.Element=e,de.ForwardRef=c,de.Fragment=n,de.Lazy=w,de.Memo=f,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=d,de.SuspenseList=u,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(g){return m(g)===i},de.isContextProvider=function(g){return m(g)===s},de.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===e},de.isForwardRef=function(g){return m(g)===c},de.isFragment=function(g){return m(g)===n},de.isLazy=function(g){return m(g)===w},de.isMemo=function(g){return m(g)===f},de.isPortal=function(g){return m(g)===t},de.isProfiler=function(g){return m(g)===o},de.isStrictMode=function(g){return m(g)===r},de.isSuspense=function(g){return m(g)===d},de.isSuspenseList=function(g){return m(g)===u},de.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===n||g===o||g===r||g===d||g===u||g===b||typeof g=="object"&&g!==null&&(g.$$typeof===w||g.$$typeof===f||g.$$typeof===s||g.$$typeof===i||g.$$typeof===c||g.$$typeof===x||g.getModuleId!==void 0)},de.typeOf=m,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function Sd(){return Ta||(Ta=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x=!1,m=!1,g=!1,y=!1,_=!1,R;R=Symbol.for("react.module.reference");function S(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||_||B===r||B===d||B===u||y||B===b||x||m||g||typeof B=="object"&&B!==null&&(B.$$typeof===w||B.$$typeof===f||B.$$typeof===s||B.$$typeof===i||B.$$typeof===c||B.$$typeof===R||B.getModuleId!==void 0))}function v(B){if(typeof B=="object"&&B!==null){var xe=B.$$typeof;switch(xe){case e:var qe=B.type;switch(qe){case n:case o:case r:case d:case u:return qe;default:var pt=qe&&qe.$$typeof;switch(pt){case l:case i:case c:case w:case f:case s:return pt;default:return xe}}case t:return xe}}}var P=i,z=s,J=e,C=c,I=n,$=w,O=f,A=t,X=o,q=r,V=d,te=u,oe=!1,se=!1;function k(B){return oe||(oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function j(B){return se||(se=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function F(B){return v(B)===i}function H(B){return v(B)===s}function G(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function Y(B){return v(B)===c}function L(B){return v(B)===n}function Z(B){return v(B)===w}function K(B){return v(B)===f}function Q(B){return v(B)===t}function T(B){return v(B)===o}function U(B){return v(B)===r}function E(B){return v(B)===d}function we(B){return v(B)===u}ue.ContextConsumer=P,ue.ContextProvider=z,ue.Element=J,ue.ForwardRef=C,ue.Fragment=I,ue.Lazy=$,ue.Memo=O,ue.Portal=A,ue.Profiler=X,ue.StrictMode=q,ue.Suspense=V,ue.SuspenseList=te,ue.isAsyncMode=k,ue.isConcurrentMode=j,ue.isContextConsumer=F,ue.isContextProvider=H,ue.isElement=G,ue.isForwardRef=Y,ue.isFragment=L,ue.isLazy=Z,ue.isMemo=K,ue.isPortal=Q,ue.isProfiler=T,ue.isStrictMode=U,ue.isSuspense=E,ue.isSuspenseList=we,ue.isValidElementType=S,ue.typeOf=v}()),ue}process.env.NODE_ENV==="production"?Zr.exports=jd():Zr.exports=Sd();var Ra=Zr.exports;const Ed=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Cd(e){const t=`${e}`.match(Ed);return t&&t[1]||""}function ii(e,t=""){return e.displayName||e.name||Cd(e)||t}function Oa(e,t,n){const r=ii(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Td(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ii(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ra.ForwardRef:return Oa(e,e.render,"ForwardRef");case Ra.Memo:return Oa(e,e.type,"memo");default:return}}}function Rn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=o||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Rd=p.oneOfType([p.func,p.object]),li=Rd;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Gt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Od(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function _d(e,t=166){let n;function r(...o){const s=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Pd(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Id(e,t){var n,r;return D.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function er(e){return e&&e.ownerDocument||document}function Md(e){return er(e).defaultView||window}function $d(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?M({},t.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const f=d||i,w=n==null?void 0:n[f];if(w){const b=w(s,i,l,c,d,...u);if(b)return b}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function tr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Ad=typeof window<"u"?D.useLayoutEffect:D.useEffect,Ut=Ad;let _a=0;function Dd(e){const[t,n]=D.useState(e),r=e||t;return D.useEffect(()=>{t==null&&(_a+=1,n(`mui-${_a}`))},[t]),r}const Pa=D["useId".toString()];function ci(e){if(Pa!==void 0){const t=Pa();return e??t}return Dd(e)}function Bd(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function di({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=D.useRef(e!==void 0),[s,i]=D.useState(t),l=o?e:s;if(process.env.NODE_ENV!=="production"){D.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=D.useRef(t);D.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=D.useCallback(d=>{o||i(d)},[]);return[l,c]}function Qr(e){const t=D.useRef(e);return Ut(()=>{t.current=e}),D.useRef((...n)=>(0,t.current)(...n)).current}function St(...e){return D.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{tr(n,t)})},e)}const Ia={};function Vd(e,t){const n=D.useRef(Ia);return n.current===Ia&&(n.current=e(t)),n}const Ld=[];function zd(e){D.useEffect(e,Ld)}class $n{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new $n}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function hn(){const e=Vd($n.create).current;return zd(e.disposeEffect),e}let pr=!0,eo=!1;const Fd=new $n,Gd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ud(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Gd[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function qd(e){e.metaKey||e.altKey||e.ctrlKey||(pr=!0)}function Lr(){pr=!1}function Hd(){this.visibilityState==="hidden"&&eo&&(pr=!0)}function Xd(e){e.addEventListener("keydown",qd,!0),e.addEventListener("mousedown",Lr,!0),e.addEventListener("pointerdown",Lr,!0),e.addEventListener("touchstart",Lr,!0),e.addEventListener("visibilitychange",Hd,!0)}function Yd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return pr||Ud(t)}function ui(){const e=D.useCallback(o=>{o!=null&&Xd(o.ownerDocument)},[]),t=D.useRef(!1);function n(){return t.current?(eo=!0,Fd.start(100,()=>{eo=!1}),t.current=!1,!0):!1}function r(o){return Yd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function pi(e,t){const n=M({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=M({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=M({},s),Object.keys(o).forEach(i=>{n[r][i]=pi(o[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function To(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Ma=e=>e,Wd=()=>{let e=Ma;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ma}}},Kd=Wd(),wi=Kd,fi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function wr(e,t,n="Mui"){const r=fi[t];return r?`${n}-${r}`:`${wi.generate(e)}-${t}`}function mi(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=wr(e,o,n)}),r}function Jd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ye(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const Zd=["values","unit","step"],Qd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>M({},n,{[r.key]:r.val}),{})};function eu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ye(e,Zd),s=Qd(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,b){const x=i.indexOf(b);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:b)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function f(w){const b=i.indexOf(w);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return M({keys:i,values:s,up:l,down:c,between:d,only:u,not:f,unit:n},o)}const tu={borderRadius:4},nu=tu,ru=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},ct=ru;function yn(e,t){return t?tt(e,t,{clone:!1}):e}const Ro={xs:0,sm:600,md:900,lg:1200,xl:1536},$a={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ro[e]}px)`};function nt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||$a;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||$a;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Ro).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function ou(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const s=e.up(o);return r[s]={},r},{}))||{}}function au(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function fr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function nr(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=fr(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=fr(c,r)||{};return nt(i,l,f=>{let w=nr(d,o,f);return f===w&&typeof f=="string"&&(w=nr(d,o,`${t}${f==="default"?"":Je(f)}`,f)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:ct}:{},s.filterProps=[t],s}function su(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const iu={m:"margin",p:"padding"},lu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Aa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},cu=su(e=>{if(e.length>2)if(Aa[e])e=Aa[e];else return[e];const[t,n]=e.split(""),r=iu[t],o=lu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),mr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],hr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],du=[...mr,...hr];function An(e,t,n,r){var o;const s=(o=fr(e,t,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function hi(e){return An(e,"spacing",8,"spacing")}function Dn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function uu(e,t){return n=>e.reduce((r,o)=>(r[o]=Dn(t,n),r),{})}function pu(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=cu(n),s=uu(o,r),i=e[n];return nt(e,i,s)}function gi(e,t){const n=hi(e.theme);return Object.keys(e).map(r=>pu(e,t,r,n)).reduce(yn,{})}function he(e){return gi(e,mr)}he.propTypes=process.env.NODE_ENV!=="production"?mr.reduce((e,t)=>(e[t]=ct,e),{}):{};he.filterProps=mr;function ge(e){return gi(e,hr)}ge.propTypes=process.env.NODE_ENV!=="production"?hr.reduce((e,t)=>(e[t]=ct,e),{}):{};ge.filterProps=hr;process.env.NODE_ENV!=="production"&&du.reduce((e,t)=>(e[t]=ct,e),{});function wu(e=8){if(e.mui)return e;const t=hi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function gr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>t[s]?yn(o,t[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Le(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const fu=Ue("border",Le),mu=Ue("borderTop",Le),hu=Ue("borderRight",Le),gu=Ue("borderBottom",Le),bu=Ue("borderLeft",Le),vu=Ue("borderColor"),xu=Ue("borderTopColor"),yu=Ue("borderRightColor"),Nu=Ue("borderBottomColor"),ku=Ue("borderLeftColor"),ju=Ue("outline",Le),Su=Ue("outlineColor"),br=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=An(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Dn(t,r)});return nt(e,e.borderRadius,n)}return null};br.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:ct}:{};br.filterProps=["borderRadius"];gr(fu,mu,hu,gu,bu,vu,xu,yu,Nu,ku,br,ju,Su);const vr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=An(e.theme,"spacing",8,"gap"),n=r=>({gap:Dn(t,r)});return nt(e,e.gap,n)}return null};vr.propTypes=process.env.NODE_ENV!=="production"?{gap:ct}:{};vr.filterProps=["gap"];const xr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=An(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Dn(t,r)});return nt(e,e.columnGap,n)}return null};xr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:ct}:{};xr.filterProps=["columnGap"];const yr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=An(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Dn(t,r)});return nt(e,e.rowGap,n)}return null};yr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:ct}:{};yr.filterProps=["rowGap"];const Eu=ve({prop:"gridColumn"}),Cu=ve({prop:"gridRow"}),Tu=ve({prop:"gridAutoFlow"}),Ru=ve({prop:"gridAutoColumns"}),Ou=ve({prop:"gridAutoRows"}),_u=ve({prop:"gridTemplateColumns"}),Pu=ve({prop:"gridTemplateRows"}),Iu=ve({prop:"gridTemplateAreas"}),Mu=ve({prop:"gridArea"});gr(vr,xr,yr,Eu,Cu,Tu,Ru,Ou,_u,Pu,Iu,Mu);function Vt(e,t){return t==="grey"?t:e}const $u=ve({prop:"color",themeKey:"palette",transform:Vt}),Au=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Vt}),Du=ve({prop:"backgroundColor",themeKey:"palette",transform:Vt});gr($u,Au,Du);function $e(e){return e<=1&&e!==0?`${e*100}%`:e}const Bu=ve({prop:"width",transform:$e}),Oo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Ro[n];return s?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:$e(n)}};return nt(e,e.maxWidth,t)}return null};Oo.filterProps=["maxWidth"];const Vu=ve({prop:"minWidth",transform:$e}),Lu=ve({prop:"height",transform:$e}),zu=ve({prop:"maxHeight",transform:$e}),Fu=ve({prop:"minHeight",transform:$e});ve({prop:"size",cssProperty:"width",transform:$e});ve({prop:"size",cssProperty:"height",transform:$e});const Gu=ve({prop:"boxSizing"});gr(Bu,Oo,Vu,Lu,zu,Fu,Gu);const Uu={border:{themeKey:"borders",transform:Le},borderTop:{themeKey:"borders",transform:Le},borderRight:{themeKey:"borders",transform:Le},borderBottom:{themeKey:"borders",transform:Le},borderLeft:{themeKey:"borders",transform:Le},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Le},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:br},color:{themeKey:"palette",transform:Vt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Vt},backgroundColor:{themeKey:"palette",transform:Vt},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:vr},rowGap:{style:yr},columnGap:{style:xr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:$e},maxWidth:{style:Oo},minWidth:{transform:$e},height:{transform:$e},maxHeight:{transform:$e},minHeight:{transform:$e},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},_o=Uu;function qu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Hu(e,t){return typeof e=="function"?e(t):e}function Xu(){function e(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:f}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=fr(o,d)||{};return f?f(i):nt(i,r,x=>{let m=nr(w,u,x);return x===m&&typeof x=="string"&&(m=nr(w,u,`${n}${x==="default"?"":Je(x)}`,x)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:_o;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=ou(s.breakpoints),f=Object.keys(u);let w=u;return Object.keys(d).forEach(b=>{const x=Hu(d[b],s);if(x!=null)if(typeof x=="object")if(i[b])w=yn(w,e(b,x,s,i));else{const m=nt({theme:s},x,g=>({[b]:g}));qu(m,x)?w[b]=t({sx:x,theme:s}):w=yn(w,m)}else w=yn(w,e(b,x,s,i))}),au(f,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const bi=Xu();bi.filterProps=["sx"];const Po=bi;function Yu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Wu=["breakpoints","palette","spacing","shape"];function Io(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=e,i=ye(e,Wu),l=eu(n),c=wu(o);let d=tt({breakpoints:l,direction:"ltr",components:{},palette:M({mode:"light"},r),spacing:c,shape:M({},nu,s)},i);return d.applyStyles=Yu,d=t.reduce((u,f)=>tt(u,f),d),d.unstable_sxConfig=M({},_o,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Po({sx:f,theme:this})},d}function Ku(e){return Object.keys(e).length===0}function vi(e=null){const t=D.useContext(Ur.ThemeContext);return!t||Ku(t)?e:t}const Ju=Io();function xi(e=Ju){return vi(e)}const Zu=["ownerState"],Qu=["variants"],ep=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function tp(e){return Object.keys(e).length===0}function np(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Kn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const rp=Io(),Da=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Hn({defaultTheme:e,theme:t,themeId:n}){return tp(t)?e:t[n]||t}function op(e){return e?(t,n)=>n[e]:null}function Jn(e,t){let{ownerState:n}=t,r=ye(t,Zu);const o=typeof e=="function"?e(M({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(s=>Jn(s,M({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=ye(o,Qu);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(M({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(M({ownerState:n},r,n)):c.style))}),l}return o}function ap(e={}){const{themeId:t,defaultTheme:n=rp,rootShouldForwardProp:r=Kn,slotShouldForwardProp:o=Kn}=e,s=i=>Po(M({},i,{theme:Hn(M({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Ur.internal_processStyles(i,v=>v.filter(P=>!(P!=null&&P.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:f,overridesResolver:w=op(Da(d))}=l,b=ye(l,ep),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,m=f||!1;let g;process.env.NODE_ENV!=="production"&&c&&(g=`${c}-${Da(d||"Root")}`);let y=Kn;d==="Root"||d==="root"?y=r:d?y=o:np(i)&&(y=void 0);const _=Ur(i,M({shouldForwardProp:y,label:g},b)),R=v=>typeof v=="function"&&v.__emotion_real!==v||vt(v)?P=>Jn(v,M({},P,{theme:Hn({theme:P.theme,defaultTheme:n,themeId:t})})):v,S=(v,...P)=>{let z=R(v);const J=P?P.map(R):[];c&&w&&J.push($=>{const O=Hn(M({},$,{defaultTheme:n,themeId:t}));if(!O.components||!O.components[c]||!O.components[c].styleOverrides)return null;const A=O.components[c].styleOverrides,X={};return Object.entries(A).forEach(([q,V])=>{X[q]=Jn(V,M({},$,{theme:O}))}),w($,X)}),c&&!x&&J.push($=>{var O;const A=Hn(M({},$,{defaultTheme:n,themeId:t})),X=A==null||(O=A.components)==null||(O=O[c])==null?void 0:O.variants;return Jn({variants:X},M({},$,{theme:A}))}),m||J.push(s);const C=J.length-P.length;if(Array.isArray(v)&&C>0){const $=new Array(C).fill("");z=[...v,...$],z.raw=[...v.raw,...$]}const I=_(z,...J);if(process.env.NODE_ENV!=="production"){let $;c&&($=`${c}${Je(d||"")}`),$===void 0&&($=`Styled(${Td(i)})`),I.displayName=$}return i.muiName&&(I.muiName=i.muiName),I};return _.withConfig&&(S.withConfig=_.withConfig),S}}function sp(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:pi(t.components[n].defaultProps,r)}function ip({props:e,name:t,defaultTheme:n,themeId:r}){let o=xi(n);return r&&(o=o[r]||o),sp({theme:o,name:t,props:e})}function Mo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Jd(e,t,n)}function lp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Et(e){if(e.type)return e;if(e.charAt(0)==="#")return Et(lp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Gt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Gt(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Nr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function cp(e){e=Et(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Nr({type:l,values:c})}function Ba(e){e=Et(e);let t=e.type==="hsl"||e.type==="hsla"?Et(cp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Va(e,t){const n=Ba(e),r=Ba(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function yi(e,t){return e=Et(e),t=Mo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Nr(e)}function dp(e,t){if(e=Et(e),t=Mo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Nr(e)}function up(e,t){if(e=Et(e),t=Mo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Nr(e)}function pp(e,t){return M({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const wp={black:"#000",white:"#fff"},On=wp,fp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},mp=fp,hp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Pt=hp,gp={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=gp,bp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},un=bp,vp={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Mt=vp,xp={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},$t=xp,yp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},At=yp,Np=["mode","contrastThreshold","tonalOffset"],La={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:On.white,default:On.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},zr={text:{primary:On.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:On.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function za(e,t,n,r){const o=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=up(e.main,o):t==="dark"&&(e.dark=dp(e.main,s)))}function kp(e="light"){return e==="dark"?{main:Mt[200],light:Mt[50],dark:Mt[400]}:{main:Mt[700],light:Mt[400],dark:Mt[800]}}function jp(e="light"){return e==="dark"?{main:Pt[200],light:Pt[50],dark:Pt[400]}:{main:Pt[500],light:Pt[300],dark:Pt[700]}}function Sp(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Ep(e="light"){return e==="dark"?{main:$t[400],light:$t[300],dark:$t[700]}:{main:$t[700],light:$t[500],dark:$t[900]}}function Cp(e="light"){return e==="dark"?{main:At[400],light:At[300],dark:At[700]}:{main:At[800],light:At[500],dark:At[900]}}function Tp(e="light"){return e==="dark"?{main:un[400],light:un[300],dark:un[700]}:{main:"#ed6c02",light:un[500],dark:un[900]}}function Rp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ye(e,Np),s=e.primary||kp(t),i=e.secondary||jp(t),l=e.error||Sp(t),c=e.info||Ep(t),d=e.success||Cp(t),u=e.warning||Tp(t);function f(m){const g=Va(m,zr.text.primary)>=n?zr.text.primary:La.text.primary;if(process.env.NODE_ENV!=="production"){const y=Va(m,g);y<3&&console.error([`MUI: The contrast ratio of ${y}:1 for ${g} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return g}const w=({color:m,name:g,mainShade:y=500,lightShade:_=300,darkShade:R=700})=>{if(m=M({},m),!m.main&&m[y]&&(m.main=m[y]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.`:Gt(11,g?` (${g})`:"",y));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${g?` (${g})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Gt(12,g?` (${g})`:"",JSON.stringify(m.main)));return za(m,"light",_,r),za(m,"dark",R,r),m.contrastText||(m.contrastText=f(m.main)),m},b={dark:zr,light:La};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),tt(M({common:M({},On),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:mp,contrastThreshold:n,getContrastText:f,augmentColor:w,tonalOffset:r},b[t]),o)}const Op=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function _p(e){return Math.round(e*1e5)/1e5}const Fa={textTransform:"uppercase"},Ga='"Roboto", "Helvetica", "Arial", sans-serif';function Pp(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ga,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:f}=n,w=ye(n,Op);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,x=f||(y=>`${y/d*b}rem`),m=(y,_,R,S,v)=>M({fontFamily:r,fontWeight:y,fontSize:x(_),lineHeight:R},r===Ga?{letterSpacing:`${_p(S/_)}em`}:{},v,u),g={h1:m(s,96,1.167,-1.5),h2:m(s,60,1.2,-.5),h3:m(i,48,1.167,0),h4:m(i,34,1.235,.25),h5:m(i,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(i,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(i,16,1.5,.15),body2:m(i,14,1.43,.15),button:m(l,14,1.75,.4,Fa),caption:m(i,12,1.66,.4),overline:m(i,12,2.66,1,Fa),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return tt(M({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},g),w,{clone:!1})}const Ip=.2,Mp=.14,$p=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ip})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Mp})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$p})`].join(",")}const Ap=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Dp=Ap,Bp=["duration","easing","delay"],Vp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Lp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ua(e){return`${Math.round(e)}ms`}function zp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Fp(e){const t=M({},Vp,e.easing),n=M({},Lp,e.duration);return M({getAutoHeightDuration:zp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=ye(s,Bp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",f=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:Ua(i)} ${l} ${typeof c=="string"?c:Ua(c)}`).join(",")}},e,{easing:t,duration:n})}const Gp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Up=Gp,qp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Hp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=e,i=ye(e,qp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Gt(18));const l=Rp(r),c=Io(e);let d=tt(c,{mixins:pp(c.breakpoints,n),palette:l,shadows:Dp.slice(),typography:Pp(l,s),transitions:Fp(o),zIndex:M({},Up)});if(d=tt(d,i),d=t.reduce((u,f)=>tt(u,f),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(w,b)=>{let x;for(x in w){const m=w[x];if(u.indexOf(x)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const g=wr("",x);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${g}' syntax:`,JSON.stringify({root:{[`&.${g}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const b=d.components[w].styleOverrides;b&&w.indexOf("Mui")===0&&f(b,w)})}return d.unstable_sxConfig=M({},_o,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Po({sx:f,theme:this})},d}const Xp=Hp(),$o=Xp,Ao="$$material";function Do({props:e,name:t}){return ip({props:e,name:t,defaultTheme:$o,themeId:Ao})}const Yp=e=>Kn(e)&&e!=="classes",Wp=ap({themeId:Ao,defaultTheme:$o,rootShouldForwardProp:Yp}),Bn=Wp;function Kp(e){return wr("MuiSvgIcon",e)}mi("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Jp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Zp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return To(o,Kp,r)},Qp=Bn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,s,i,l,c,d,u,f,w,b,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(f=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),Bo=D.forwardRef(function(t,n){const r=Do({props:t,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:f,viewBox:w="0 0 24 24"}=r,b=ye(r,Jp),x=D.isValidElement(o)&&o.type==="svg",m=M({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),g={};u||(g.viewBox=w);const y=Zp(m);return a.jsxs(Qp,M({as:l,className:st(y.root,s),focusable:"false",color:d,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},g,b,x&&o.props,{ownerState:m,children:[x?o.props.children:o,f?a.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Bo.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});Bo.muiName="SvgIcon";const qa=Bo;function Ni(e,t){function n(r,o){return a.jsx(qa,M({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=qa.muiName,D.memo(D.forwardRef(n))}const ew={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),wi.configure(e)}},tw=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:Od,createSvgIcon:Ni,debounce:_d,deprecatedPropType:Pd,isMuiElement:Id,ownerDocument:er,ownerWindow:Md,requirePropFactory:$d,setRef:tr,unstable_ClassNameGenerator:ew,unstable_useEnhancedEffect:Ut,unstable_useId:ci,unsupportedProp:Bd,useControlled:di,useEventCallback:Qr,useForkRef:St,useIsFocusVisible:ui},Symbol.toStringTag,{value:"Module"})),nw=dd(tw);var Ha;function rw(){return Ha||(Ha=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=nw}(Ir)),Ir}var ow=ud;Object.defineProperty(So,"__esModule",{value:!0});var ki=So.default=void 0,aw=ow(rw()),sw=a;ki=So.default=(0,aw.default)((0,sw.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function iw(e){return typeof e=="string"}function gn(e,t,n){return e===void 0||iw(e)?t:M({},t,{ownerState:M({},t.ownerState,n)})}const lw={disableDefaultClasses:!1},cw=D.createContext(lw);function dw(e){const{disableDefaultClasses:t}=D.useContext(cw);return n=>t?"":e(n)}function uw(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function pw(e,t,n){return typeof e=="function"?e(t,n):e}function Xa(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ww(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=e;if(!t){const b=st(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),x=M({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),m=M({},n,o,r);return b.length>0&&(m.className=b),Object.keys(x).length>0&&(m.style=x),{props:m,internalRef:void 0}}const i=uw(M({},o,r)),l=Xa(r),c=Xa(o),d=t(i),u=st(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),f=M({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=M({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(f).length>0&&(w.style=f),{props:w,internalRef:d.ref}}const fw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function mw(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=ye(e,fw),l=s?{}:pw(r,o),{props:c,internalRef:d}=ww(M({},i,{externalSlotProps:l})),u=St(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return gn(n,M({},c,{ref:u}),o)}const ji="base";function hw(e){return`${ji}--${e}`}function gw(e,t){return`${ji}-${e}-${t}`}function Si(e,t){const n=fi[t];return n?hw(n):gw(e,t)}function bw(e,t){const n={};return t.forEach(r=>{n[r]=Si(e,r)}),n}function vw(e){return typeof e=="function"?e():e}const rr=D.forwardRef(function(t,n){const{children:r,container:o,disablePortal:s=!1}=t,[i,l]=D.useState(null),c=St(D.isValidElement(r)?r.ref:null,n);if(Ut(()=>{s||l(vw(o)||document.body)},[o,s]),Ut(()=>{if(i&&!s)return tr(n,i),()=>{tr(n,null)}},[n,i,s]),s){if(D.isValidElement(r)){const d={ref:c};return D.cloneElement(r,d)}return a.jsx(D.Fragment,{children:r})}return a.jsx(D.Fragment,{children:i&&Pl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(rr.propTypes={children:p.node,container:p.oneOfType([Rn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(rr["propTypes"]=kd(rr.propTypes));var Te="top",Fe="bottom",Ge="right",Re="left",Vo="auto",Vn=[Te,Fe,Ge,Re],qt="start",_n="end",xw="clippingParents",Ei="viewport",pn="popper",yw="reference",Ya=Vn.reduce(function(e,t){return e.concat([t+"-"+qt,t+"-"+_n])},[]),Ci=[].concat(Vn,[Vo]).reduce(function(e,t){return e.concat([t,t+"-"+qt,t+"-"+_n])},[]),Nw="beforeRead",kw="read",jw="afterRead",Sw="beforeMain",Ew="main",Cw="afterMain",Tw="beforeWrite",Rw="write",Ow="afterWrite",_w=[Nw,kw,jw,Sw,Ew,Cw,Tw,Rw,Ow];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function De(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ct(e){var t=De(e).Element;return e instanceof t||e instanceof Element}function ze(e){var t=De(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Lo(e){if(typeof ShadowRoot>"u")return!1;var t=De(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Pw(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},s=t.elements[n];!ze(s)||!Ze(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Iw(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!ze(o)||!Ze(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Mw={name:"applyStyles",enabled:!0,phase:"write",fn:Pw,effect:Iw,requires:["computeStyles"]};function We(e){return e.split("-")[0]}var xt=Math.max,or=Math.min,Ht=Math.round;function to(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ti(){return!/^((?!chrome|android).)*safari/i.test(to())}function Xt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,s=1;t&&ze(e)&&(o=e.offsetWidth>0&&Ht(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ht(r.height)/e.offsetHeight||1);var i=Ct(e)?De(e):window,l=i.visualViewport,c=!Ti()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,f=r.width/o,w=r.height/s;return{width:f,height:w,top:u,right:d+f,bottom:u+w,left:d,x:d,y:u}}function zo(e){var t=Xt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ri(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Lo(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rt(e){return De(e).getComputedStyle(e)}function $w(e){return["table","td","th"].indexOf(Ze(e))>=0}function dt(e){return((Ct(e)?e.ownerDocument:e.document)||window.document).documentElement}function kr(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(Lo(e)?e.host:null)||dt(e)}function Wa(e){return!ze(e)||rt(e).position==="fixed"?null:e.offsetParent}function Aw(e){var t=/firefox/i.test(to()),n=/Trident/i.test(to());if(n&&ze(e)){var r=rt(e);if(r.position==="fixed")return null}var o=kr(e);for(Lo(o)&&(o=o.host);ze(o)&&["html","body"].indexOf(Ze(o))<0;){var s=rt(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Ln(e){for(var t=De(e),n=Wa(e);n&&$w(n)&&rt(n).position==="static";)n=Wa(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&rt(n).position==="static")?t:n||Aw(e)||t}function Fo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Nn(e,t,n){return xt(e,or(t,n))}function Dw(e,t,n){var r=Nn(e,t,n);return r>n?n:r}function Oi(){return{top:0,right:0,bottom:0,left:0}}function _i(e){return Object.assign({},Oi(),e)}function Pi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Bw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,_i(typeof t!="number"?t:Pi(t,Vn))};function Vw(e){var t,n=e.state,r=e.name,o=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=We(n.placement),c=Fo(l),d=[Re,Ge].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=Bw(o.padding,n),w=zo(s),b=c==="y"?Te:Re,x=c==="y"?Fe:Ge,m=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],g=i[c]-n.rects.reference[c],y=Ln(s),_=y?c==="y"?y.clientHeight||0:y.clientWidth||0:0,R=m/2-g/2,S=f[b],v=_-w[u]-f[x],P=_/2-w[u]/2+R,z=Nn(S,P,v),J=c;n.modifiersData[r]=(t={},t[J]=z,t.centerOffset=z-P,t)}}function Lw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ri(t.elements.popper,o)&&(t.elements.arrow=o))}const zw={name:"arrow",enabled:!0,phase:"main",fn:Vw,effect:Lw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yt(e){return e.split("-")[1]}var Fw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Gw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ht(n*o)/o||0,y:Ht(r*o)/o||0}}function Ka(e){var t,n=e.popper,r=e.popperRect,o=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,w=i.x,b=w===void 0?0:w,x=i.y,m=x===void 0?0:x,g=typeof u=="function"?u({x:b,y:m}):{x:b,y:m};b=g.x,m=g.y;var y=i.hasOwnProperty("x"),_=i.hasOwnProperty("y"),R=Re,S=Te,v=window;if(d){var P=Ln(n),z="clientHeight",J="clientWidth";if(P===De(n)&&(P=dt(n),rt(P).position!=="static"&&l==="absolute"&&(z="scrollHeight",J="scrollWidth")),P=P,o===Te||(o===Re||o===Ge)&&s===_n){S=Fe;var C=f&&P===v&&v.visualViewport?v.visualViewport.height:P[z];m-=C-r.height,m*=c?1:-1}if(o===Re||(o===Te||o===Fe)&&s===_n){R=Ge;var I=f&&P===v&&v.visualViewport?v.visualViewport.width:P[J];b-=I-r.width,b*=c?1:-1}}var $=Object.assign({position:l},d&&Fw),O=u===!0?Gw({x:b,y:m},De(n)):{x:b,y:m};if(b=O.x,m=O.y,c){var A;return Object.assign({},$,(A={},A[S]=_?"0":"",A[R]=y?"0":"",A.transform=(v.devicePixelRatio||1)<=1?"translate("+b+"px, "+m+"px)":"translate3d("+b+"px, "+m+"px, 0)",A))}return Object.assign({},$,(t={},t[S]=_?m+"px":"",t[R]=y?b+"px":"",t.transform="",t))}function Uw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:We(t.placement),variation:Yt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ka(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ka(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const qw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Uw,data:{}};var Xn={passive:!0};function Hw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=De(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Xn)}),l&&c.addEventListener("resize",n.update,Xn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Xn)}),l&&c.removeEventListener("resize",n.update,Xn)}}const Xw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Hw,data:{}};var Yw={left:"right",right:"left",bottom:"top",top:"bottom"};function Zn(e){return e.replace(/left|right|bottom|top/g,function(t){return Yw[t]})}var Ww={start:"end",end:"start"};function Ja(e){return e.replace(/start|end/g,function(t){return Ww[t]})}function Go(e){var t=De(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Uo(e){return Xt(dt(e)).left+Go(e).scrollLeft}function Kw(e,t){var n=De(e),r=dt(e),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Ti();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+Uo(e),y:c}}function Jw(e){var t,n=dt(e),r=Go(e),o=(t=e.ownerDocument)==null?void 0:t.body,s=xt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=xt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Uo(e),c=-r.scrollTop;return rt(o||n).direction==="rtl"&&(l+=xt(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function qo(e){var t=rt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ii(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:ze(e)&&qo(e)?e:Ii(kr(e))}function kn(e,t){var n;t===void 0&&(t=[]);var r=Ii(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),s=De(r),i=o?[s].concat(s.visualViewport||[],qo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(kn(kr(i)))}function no(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Zw(e,t){var n=Xt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Za(e,t,n){return t===Ei?no(Kw(e,n)):Ct(t)?Zw(t,n):no(Jw(dt(e)))}function Qw(e){var t=kn(kr(e)),n=["absolute","fixed"].indexOf(rt(e).position)>=0,r=n&&ze(e)?Ln(e):e;return Ct(r)?t.filter(function(o){return Ct(o)&&Ri(o,r)&&Ze(o)!=="body"}):[]}function ef(e,t,n,r){var o=t==="clippingParents"?Qw(e):[].concat(t),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=Za(e,d,r);return c.top=xt(u.top,c.top),c.right=or(u.right,c.right),c.bottom=or(u.bottom,c.bottom),c.left=xt(u.left,c.left),c},Za(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Mi(e){var t=e.reference,n=e.element,r=e.placement,o=r?We(r):null,s=r?Yt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Te:c={x:i,y:t.y-n.height};break;case Fe:c={x:i,y:t.y+t.height};break;case Ge:c={x:t.x+t.width,y:l};break;case Re:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Fo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case qt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case _n:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function Pn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?xw:l,d=n.rootBoundary,u=d===void 0?Ei:d,f=n.elementContext,w=f===void 0?pn:f,b=n.altBoundary,x=b===void 0?!1:b,m=n.padding,g=m===void 0?0:m,y=_i(typeof g!="number"?g:Pi(g,Vn)),_=w===pn?yw:pn,R=e.rects.popper,S=e.elements[x?_:w],v=ef(Ct(S)?S:S.contextElement||dt(e.elements.popper),c,u,i),P=Xt(e.elements.reference),z=Mi({reference:P,element:R,strategy:"absolute",placement:o}),J=no(Object.assign({},R,z)),C=w===pn?J:P,I={top:v.top-C.top+y.top,bottom:C.bottom-v.bottom+y.bottom,left:v.left-C.left+y.left,right:C.right-v.right+y.right},$=e.modifiersData.offset;if(w===pn&&$){var O=$[o];Object.keys(I).forEach(function(A){var X=[Ge,Fe].indexOf(A)>=0?1:-1,q=[Te,Fe].indexOf(A)>=0?"y":"x";I[A]+=O[q]*X})}return I}function tf(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Ci:c,u=Yt(r),f=u?l?Ya:Ya.filter(function(x){return Yt(x)===u}):Vn,w=f.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=f);var b=w.reduce(function(x,m){return x[m]=Pn(e,{placement:m,boundary:o,rootBoundary:s,padding:i})[We(m)],x},{});return Object.keys(b).sort(function(x,m){return b[x]-b[m]})}function nf(e){if(We(e)===Vo)return[];var t=Zn(e);return[Ja(e),t,Ja(t)]}function rf(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,f=n.rootBoundary,w=n.altBoundary,b=n.flipVariations,x=b===void 0?!0:b,m=n.allowedAutoPlacements,g=t.options.placement,y=We(g),_=y===g,R=c||(_||!x?[Zn(g)]:nf(g)),S=[g].concat(R).reduce(function(G,Y){return G.concat(We(Y)===Vo?tf(t,{placement:Y,boundary:u,rootBoundary:f,padding:d,flipVariations:x,allowedAutoPlacements:m}):Y)},[]),v=t.rects.reference,P=t.rects.popper,z=new Map,J=!0,C=S[0],I=0;I<S.length;I++){var $=S[I],O=We($),A=Yt($)===qt,X=[Te,Fe].indexOf(O)>=0,q=X?"width":"height",V=Pn(t,{placement:$,boundary:u,rootBoundary:f,altBoundary:w,padding:d}),te=X?A?Ge:Re:A?Fe:Te;v[q]>P[q]&&(te=Zn(te));var oe=Zn(te),se=[];if(s&&se.push(V[O]<=0),l&&se.push(V[te]<=0,V[oe]<=0),se.every(function(G){return G})){C=$,J=!1;break}z.set($,se)}if(J)for(var k=x?3:1,j=function(Y){var L=S.find(function(Z){var K=z.get(Z);if(K)return K.slice(0,Y).every(function(Q){return Q})});if(L)return C=L,"break"},F=k;F>0;F--){var H=j(F);if(H==="break")break}t.placement!==C&&(t.modifiersData[r]._skip=!0,t.placement=C,t.reset=!0)}}const of={name:"flip",enabled:!0,phase:"main",fn:rf,requiresIfExists:["offset"],data:{_skip:!1}};function Qa(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function es(e){return[Te,Ge,Fe,Re].some(function(t){return e[t]>=0})}function af(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,s=t.modifiersData.preventOverflow,i=Pn(t,{elementContext:"reference"}),l=Pn(t,{altBoundary:!0}),c=Qa(i,r),d=Qa(l,o,s),u=es(c),f=es(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const sf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:af};function lf(e,t,n){var r=We(e),o=[Re,Te].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[Re,Ge].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function cf(e){var t=e.state,n=e.options,r=e.name,o=n.offset,s=o===void 0?[0,0]:o,i=Ci.reduce(function(u,f){return u[f]=lf(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const df={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:cf};function uf(e){var t=e.state,n=e.name;t.modifiersData[n]=Mi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const pf={name:"popperOffsets",enabled:!0,phase:"read",fn:uf,data:{}};function wf(e){return e==="x"?"y":"x"}function ff(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,f=n.padding,w=n.tether,b=w===void 0?!0:w,x=n.tetherOffset,m=x===void 0?0:x,g=Pn(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),y=We(t.placement),_=Yt(t.placement),R=!_,S=Fo(y),v=wf(S),P=t.modifiersData.popperOffsets,z=t.rects.reference,J=t.rects.popper,C=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,I=typeof C=="number"?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),$=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,O={x:0,y:0};if(P){if(s){var A,X=S==="y"?Te:Re,q=S==="y"?Fe:Ge,V=S==="y"?"height":"width",te=P[S],oe=te+g[X],se=te-g[q],k=b?-J[V]/2:0,j=_===qt?z[V]:J[V],F=_===qt?-J[V]:-z[V],H=t.elements.arrow,G=b&&H?zo(H):{width:0,height:0},Y=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Oi(),L=Y[X],Z=Y[q],K=Nn(0,z[V],G[V]),Q=R?z[V]/2-k-K-L-I.mainAxis:j-K-L-I.mainAxis,T=R?-z[V]/2+k+K+Z+I.mainAxis:F+K+Z+I.mainAxis,U=t.elements.arrow&&Ln(t.elements.arrow),E=U?S==="y"?U.clientTop||0:U.clientLeft||0:0,we=(A=$==null?void 0:$[S])!=null?A:0,B=te+Q-we-E,xe=te+T-we,qe=Nn(b?or(oe,B):oe,te,b?xt(se,xe):se);P[S]=qe,O[S]=qe-te}if(l){var pt,je=S==="x"?Te:Re,zn=S==="x"?Fe:Ge,He=P[v],Tt=v==="y"?"height":"width",wt=He+g[je],Rt=He-g[zn],Ot=[Te,Re].indexOf(y)!==-1,_t=(pt=$==null?void 0:$[v])!=null?pt:0,ft=Ot?wt:He-z[Tt]-J[Tt]-_t+I.altAxis,rn=Ot?He+z[Tt]+J[Tt]-_t-I.altAxis:Rt,Fn=b&&Ot?Dw(ft,He,rn):Nn(b?ft:wt,He,b?rn:Rt);P[v]=Fn,O[v]=Fn-He}t.modifiersData[r]=O}}const mf={name:"preventOverflow",enabled:!0,phase:"main",fn:ff,requiresIfExists:["offset"]};function hf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function gf(e){return e===De(e)||!ze(e)?Go(e):hf(e)}function bf(e){var t=e.getBoundingClientRect(),n=Ht(t.width)/e.offsetWidth||1,r=Ht(t.height)/e.offsetHeight||1;return n!==1||r!==1}function vf(e,t,n){n===void 0&&(n=!1);var r=ze(t),o=ze(t)&&bf(t),s=dt(t),i=Xt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||qo(s))&&(l=gf(t)),ze(t)?(c=Xt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=Uo(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function xf(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||o(s)}),r}function yf(e){var t=xf(e);return _w.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Nf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function kf(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ts={placement:"bottom",modifiers:[],strategy:"absolute"};function ns(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function jf(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,s=o===void 0?ts:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ts,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],w=!1,b={state:u,setOptions:function(y){var _=typeof y=="function"?y(u.options):y;m(),u.options=Object.assign({},s,u.options,_),u.scrollParents={reference:Ct(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var R=yf(kf([].concat(r,u.options.modifiers)));return u.orderedModifiers=R.filter(function(S){return S.enabled}),x(),b.update()},forceUpdate:function(){if(!w){var y=u.elements,_=y.reference,R=y.popper;if(ns(_,R)){u.rects={reference:vf(_,Ln(R),u.options.strategy==="fixed"),popper:zo(R)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(I){return u.modifiersData[I.name]=Object.assign({},I.data)});for(var S=0;S<u.orderedModifiers.length;S++){if(u.reset===!0){u.reset=!1,S=-1;continue}var v=u.orderedModifiers[S],P=v.fn,z=v.options,J=z===void 0?{}:z,C=v.name;typeof P=="function"&&(u=P({state:u,options:J,name:C,instance:b})||u)}}}},update:Nf(function(){return new Promise(function(g){b.forceUpdate(),g(u)})}),destroy:function(){m(),w=!0}};if(!ns(l,c))return b;b.setOptions(d).then(function(g){!w&&d.onFirstUpdate&&d.onFirstUpdate(g)});function x(){u.orderedModifiers.forEach(function(g){var y=g.name,_=g.options,R=_===void 0?{}:_,S=g.effect;if(typeof S=="function"){var v=S({state:u,name:y,instance:b,options:R}),P=function(){};f.push(v||P)}})}function m(){f.forEach(function(g){return g()}),f=[]}return b}}var Sf=[Xw,pf,qw,Mw,df,of,mf,zw,sf],Ef=jf({defaultModifiers:Sf});const $i="Popper";function Cf(e){return Si($i,e)}bw($i,["root"]);const Tf=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Rf=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Of(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function ar(e){return typeof e=="function"?e():e}function jr(e){return e.nodeType!==void 0}function _f(e){return!jr(e)}const Pf=()=>To({root:["root"]},dw(Cf)),If={},Mf=D.forwardRef(function(t,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:f,popperRef:w,slotProps:b={},slots:x={},TransitionProps:m}=t,g=ye(t,Tf),y=D.useRef(null),_=St(y,n),R=D.useRef(null),S=St(R,w),v=D.useRef(S);Ut(()=>{v.current=S},[S]),D.useImperativeHandle(w,()=>R.current,[]);const P=Of(u,i),[z,J]=D.useState(P),[C,I]=D.useState(ar(o));D.useEffect(()=>{R.current&&R.current.forceUpdate()}),D.useEffect(()=>{o&&I(ar(o))},[o]),Ut(()=>{if(!C||!d)return;const q=oe=>{J(oe.placement)};if(process.env.NODE_ENV!=="production"&&C&&jr(C)&&C.nodeType===1){const oe=C.getBoundingClientRect();process.env.NODE_ENV!=="test"&&oe.top===0&&oe.left===0&&oe.right===0&&oe.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let V=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:oe})=>{q(oe)}}];c!=null&&(V=V.concat(c)),f&&f.modifiers!=null&&(V=V.concat(f.modifiers));const te=Ef(C,y.current,M({placement:P},f,{modifiers:V}));return v.current(te),()=>{te.destroy(),v.current(null)}},[C,l,c,d,f,P]);const $={placement:z};m!==null&&($.TransitionProps=m);const O=Pf(),A=(r=x.root)!=null?r:"div",X=mw({elementType:A,externalSlotProps:b.root,externalForwardedProps:g,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:O.root});return a.jsx(A,M({},X,{children:typeof s=="function"?s($):s}))}),Ai=D.forwardRef(function(t,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:w=If,popperRef:b,style:x,transition:m=!1,slotProps:g={},slots:y={}}=t,_=ye(t,Rf),[R,S]=D.useState(!0),v=()=>{S(!1)},P=()=>{S(!0)};if(!c&&!u&&(!m||R))return null;let z;if(s)z=s;else if(r){const I=ar(r);z=I&&jr(I)?er(I).body:er(null).body}const J=!u&&c&&(!m||R)?"none":void 0,C=m?{in:u,onEnter:v,onExited:P}:void 0;return a.jsx(rr,{disablePortal:l,container:z,children:a.jsx(Mf,M({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:m?!R:u,placement:f,popperOptions:w,popperRef:b,slotProps:g,slots:y},_,{style:M({position:"fixed",top:0,left:0,display:J},x),TransitionProps:C,children:o}))})});process.env.NODE_ENV!=="production"&&(Ai.propTypes={anchorEl:Eo(p.oneOfType([Rn,p.object,p.func]),e=>{if(e.open){const t=ar(e.anchorEl);if(t&&jr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||_f(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Rn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:li,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Di(){const e=xi($o);return process.env.NODE_ENV!=="production"&&D.useDebugValue(e),e[Ao]||e}function ro(e,t){return ro=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ro(e,t)}function $f(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ro(e,t)}const rs={disabled:!1};var Af=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Bi=h.createContext(null);var Df=function(t){return t.scrollTop},bn="unmounted",gt="exited",bt="entering",Bt="entered",oo="exiting",ot=function(e){$f(t,e);function t(r,o){var s;s=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=gt,s.appearStatus=bt):c=Bt:r.unmountOnExit||r.mountOnEnter?c=bn:c=gt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===bn?{status:gt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==bt&&i!==Bt&&(s=bt):(i===bt||i===Bt)&&(s=oo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===bt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this);i&&Df(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===gt&&this.setState({status:bn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[fn.findDOMNode(this),l],d=c[0],u=c[1],f=this.getTimeouts(),w=l?f.appear:f.enter;if(!o&&!i||rs.disabled){this.safeSetState({status:Bt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:bt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Bt},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:fn.findDOMNode(this);if(!s||rs.disabled){this.safeSetState({status:gt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:oo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:gt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===bn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ye(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(Bi.Provider,{value:null},typeof i=="function"?i(o,l):h.cloneElement(h.Children.only(i),l))},t}(h.Component);ot.contextType=Bi;ot.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Af;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Dt(){}ot.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Dt,onEntering:Dt,onEntered:Dt,onExit:Dt,onExiting:Dt,onExited:Dt};ot.UNMOUNTED=bn;ot.EXITED=gt;ot.ENTERING=bt;ot.ENTERED=Bt;ot.EXITING=oo;const Bf=ot,Vf=e=>e.scrollTop;function os(e,t){var n,r;const{timeout:o,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const Lf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ao(e){return`scale(${e}, ${e**2})`}const zf={entering:{opacity:1,transform:ao(1)},entered:{opacity:1,transform:"none"}},Fr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Ho=D.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:f,onExited:w,onExiting:b,style:x,timeout:m="auto",TransitionComponent:g=Bf}=t,y=ye(t,Lf),_=hn(),R=D.useRef(),S=Di(),v=D.useRef(null),P=St(v,s.ref,n),z=q=>V=>{if(q){const te=v.current;V===void 0?q(te):q(te,V)}},J=z(u),C=z((q,V)=>{Vf(q);const{duration:te,delay:oe,easing:se}=os({style:x,timeout:m,easing:i},{mode:"enter"});let k;m==="auto"?(k=S.transitions.getAutoHeightDuration(q.clientHeight),R.current=k):k=te,q.style.transition=[S.transitions.create("opacity",{duration:k,delay:oe}),S.transitions.create("transform",{duration:Fr?k:k*.666,delay:oe,easing:se})].join(","),c&&c(q,V)}),I=z(d),$=z(b),O=z(q=>{const{duration:V,delay:te,easing:oe}=os({style:x,timeout:m,easing:i},{mode:"exit"});let se;m==="auto"?(se=S.transitions.getAutoHeightDuration(q.clientHeight),R.current=se):se=V,q.style.transition=[S.transitions.create("opacity",{duration:se,delay:te}),S.transitions.create("transform",{duration:Fr?se:se*.666,delay:Fr?te:te||se*.333,easing:oe})].join(","),q.style.opacity=0,q.style.transform=ao(.75),f&&f(q)}),A=z(w),X=q=>{m==="auto"&&_.start(R.current||0,q),r&&r(v.current,q)};return a.jsx(g,M({appear:o,in:l,nodeRef:v,onEnter:C,onEntered:I,onEntering:J,onExit:O,onExited:A,onExiting:$,addEndListener:X,timeout:m==="auto"?null:m},y,{children:(q,V)=>D.cloneElement(s,M({style:M({opacity:0,transform:ao(.75),visibility:q==="exited"&&!l?"hidden":void 0},zf[q],x,s.props.style),ref:P},V))}))});process.env.NODE_ENV!=="production"&&(Ho.propTypes={addEndListener:p.func,appear:p.bool,children:si.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Ho.muiSupportAuto=!0;const as=Ho,Ff=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Gf=Bn(Ai,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Vi=D.forwardRef(function(t,n){var r;const o=vi(),s=Do({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:g,popperRef:y,transition:_,slots:R,slotProps:S}=s,v=ye(s,Ff),P=(r=R==null?void 0:R.root)!=null?r:c==null?void 0:c.Root,z=M({anchorEl:i,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:g,popperRef:y,transition:_},v);return a.jsx(Gf,M({as:l,direction:o==null?void 0:o.direction,slots:{root:P},slotProps:S??d},z,{ref:n}))});process.env.NODE_ENV!=="production"&&(Vi.propTypes={anchorEl:p.oneOfType([Rn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Rn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:li,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const Li=Vi;function Uf(e){return wr("MuiTooltip",e)}const qf=mi("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=qf,Hf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Xf(e){return Math.round(e*1e5)/1e5}const Yf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(s.split("-")[0])}`],arrow:["arrow"]};return To(i,Uf,t)},Wf=Bn(Li,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>M({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:M({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:M({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Kf=Bn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>M({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:yi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Xf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:M({transformOrigin:"right center"},t.isRtl?M({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):M({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:M({transformOrigin:"left center"},t.isRtl?M({marginRight:"14px"},t.touch&&{marginRight:"24px"}):M({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:M({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:M({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Jf=Bn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:yi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Yn=!1;const ss=new $n;let wn={x:0,y:0};function Wn(e,t){return n=>{t&&t(n),e(n)}}const zi=D.forwardRef(function(t,n){var r,o,s,i,l,c,d,u,f,w,b,x,m,g,y,_,R,S,v;const P=Do({props:t,name:"MuiTooltip"}),{arrow:z=!1,children:J,components:C={},componentsProps:I={},describeChild:$=!1,disableFocusListener:O=!1,disableHoverListener:A=!1,disableInteractive:X=!1,disableTouchListener:q=!1,enterDelay:V=100,enterNextDelay:te=0,enterTouchDelay:oe=700,followCursor:se=!1,id:k,leaveDelay:j=0,leaveTouchDelay:F=1500,onClose:H,onOpen:G,open:Y,placement:L="bottom",PopperComponent:Z,PopperProps:K={},slotProps:Q={},slots:T={},title:U,TransitionComponent:E=as,TransitionProps:we}=P,B=ye(P,Hf),xe=D.isValidElement(J)?J:a.jsx("span",{children:J}),qe=Di(),pt=qe.direction==="rtl",[je,zn]=D.useState(),[He,Tt]=D.useState(null),wt=D.useRef(!1),Rt=X||se,Ot=hn(),_t=hn(),ft=hn(),rn=hn(),[Fn,Qo]=di({controlled:Y,default:!1,name:"Tooltip",state:"open"});let Qe=Fn;if(process.env.NODE_ENV!=="production"){const{current:ne}=D.useRef(Y!==void 0);D.useEffect(()=>{je&&je.disabled&&!ne&&U!==""&&je.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[U,je,ne])}const Sr=ci(k),on=D.useRef(),Gn=Qr(()=>{on.current!==void 0&&(document.body.style.WebkitUserSelect=on.current,on.current=void 0),rn.clear()});D.useEffect(()=>Gn,[Gn]);const ea=ne=>{ss.clear(),Yn=!0,Qo(!0),G&&!Qe&&G(ne)},Un=Qr(ne=>{ss.start(800+j,()=>{Yn=!1}),Qo(!1),H&&Qe&&H(ne),Ot.start(qe.transitions.duration.shortest,()=>{wt.current=!1})}),Er=ne=>{wt.current&&ne.type!=="touchstart"||(je&&je.removeAttribute("title"),_t.clear(),ft.clear(),V||Yn&&te?_t.start(Yn?te:V,()=>{ea(ne)}):ea(ne))},ta=ne=>{_t.clear(),ft.start(j,()=>{Un(ne)})},{isFocusVisibleRef:na,onBlur:al,onFocus:sl,ref:il}=ui(),[,ra]=D.useState(!1),oa=ne=>{al(ne),na.current===!1&&(ra(!1),ta(ne))},aa=ne=>{je||zn(ne.currentTarget),sl(ne),na.current===!0&&(ra(!0),Er(ne))},sa=ne=>{wt.current=!0;const Pe=xe.props;Pe.onTouchStart&&Pe.onTouchStart(ne)},ia=Er,la=ta,ll=ne=>{sa(ne),ft.clear(),Ot.clear(),Gn(),on.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",rn.start(oe,()=>{document.body.style.WebkitUserSelect=on.current,Er(ne)})},cl=ne=>{xe.props.onTouchEnd&&xe.props.onTouchEnd(ne),Gn(),ft.start(F,()=>{Un(ne)})};D.useEffect(()=>{if(!Qe)return;function ne(Pe){(Pe.key==="Escape"||Pe.key==="Esc")&&Un(Pe)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Un,Qe]);const dl=St(xe.ref,il,zn,n);!U&&U!==0&&(Qe=!1);const Cr=D.useRef(),ul=ne=>{const Pe=xe.props;Pe.onMouseMove&&Pe.onMouseMove(ne),wn={x:ne.clientX,y:ne.clientY},Cr.current&&Cr.current.update()},an={},Tr=typeof U=="string";$?(an.title=!Qe&&Tr&&!A?U:null,an["aria-describedby"]=Qe?Sr:null):(an["aria-label"]=Tr?U:null,an["aria-labelledby"]=Qe&&!Tr?Sr:null);const Be=M({},an,B,xe.props,{className:st(B.className,xe.props.className),onTouchStart:sa,ref:dl},se?{onMouseMove:ul}:{});process.env.NODE_ENV!=="production"&&(Be["data-mui-internal-clone-element"]=!0,D.useEffect(()=>{je&&!je.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[je]));const sn={};q||(Be.onTouchStart=ll,Be.onTouchEnd=cl),A||(Be.onMouseOver=Wn(ia,Be.onMouseOver),Be.onMouseLeave=Wn(la,Be.onMouseLeave),Rt||(sn.onMouseOver=ia,sn.onMouseLeave=la)),O||(Be.onFocus=Wn(aa,Be.onFocus),Be.onBlur=Wn(oa,Be.onBlur),Rt||(sn.onFocus=aa,sn.onBlur=oa)),process.env.NODE_ENV!=="production"&&xe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));const pl=D.useMemo(()=>{var ne;let Pe=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ne=K.popperOptions)!=null&&ne.modifiers&&(Pe=Pe.concat(K.popperOptions.modifiers)),M({},K.popperOptions,{modifiers:Pe})},[He,K]),ln=M({},P,{isRtl:pt,arrow:z,disableInteractive:Rt,placement:L,PopperComponentProp:Z,touch:wt.current}),Rr=Yf(ln),ca=(r=(o=T.popper)!=null?o:C.Popper)!=null?r:Wf,da=(s=(i=(l=T.transition)!=null?l:C.Transition)!=null?i:E)!=null?s:as,ua=(c=(d=T.tooltip)!=null?d:C.Tooltip)!=null?c:Kf,pa=(u=(f=T.arrow)!=null?f:C.Arrow)!=null?u:Jf,wl=gn(ca,M({},K,(w=Q.popper)!=null?w:I.popper,{className:st(Rr.popper,K==null?void 0:K.className,(b=(x=Q.popper)!=null?x:I.popper)==null?void 0:b.className)}),ln),fl=gn(da,M({},we,(m=Q.transition)!=null?m:I.transition),ln),ml=gn(ua,M({},(g=Q.tooltip)!=null?g:I.tooltip,{className:st(Rr.tooltip,(y=(_=Q.tooltip)!=null?_:I.tooltip)==null?void 0:y.className)}),ln),hl=gn(pa,M({},(R=Q.arrow)!=null?R:I.arrow,{className:st(Rr.arrow,(S=(v=Q.arrow)!=null?v:I.arrow)==null?void 0:S.className)}),ln);return a.jsxs(D.Fragment,{children:[D.cloneElement(xe,Be),a.jsx(ca,M({as:Z??Li,placement:L,anchorEl:se?{getBoundingClientRect:()=>({top:wn.y,left:wn.x,right:wn.x,bottom:wn.y,width:0,height:0})}:je,popperRef:Cr,open:je?Qe:!1,id:Sr,transition:!0},sn,wl,{popperOptions:pl,children:({TransitionProps:ne})=>a.jsx(da,M({timeout:qe.transitions.duration.shorter},ne,fl,{children:a.jsxs(ua,M({},ml,{children:[U,z?a.jsx(pa,M({},hl,{ref:Tt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(zi.propTypes={arrow:p.bool,children:si.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const Zf=zi;function is(e,t,n){return e?a.jsx(Ae.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Xo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:w=!1,hasDivider:b=!1,focusVisibleClassName:x,id:m,children:g}=e,y=a.jsx(Ae.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:b,focusVisibleClassName:x,onClick:t,id:m,children:n?a.jsxs(a.Fragment,{children:[is(s,n,!0),a.jsx(Ae.ListItemText,{primary:n,inset:!s&&o}),f?a.jsx(Ae.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(ki,{})}):is(i,n,!1)]}):g});return r?a.jsx(Zf,{title:r,placement:"right",children:a.jsx("div",{children:y})}):y}function Fi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Qf(e){const[t,n]=h.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Fi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(Gi,{...e,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(Xo,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(Ae.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const em=(e,t)=>t.filter(o=>o.group===e).sort((o,s)=>(o.order||0)-(s.order||0));function Gi(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:s,allowForLeadingIcons:i}=h.useMemo(()=>{const u=o&&o.length>0?o:Fi(t).filter(x=>!("menuItem"in x.group)),f=Object.values(u).sort((x,m)=>(x.group.order||0)-(m.group.order||0)),w=[];f.forEach(x=>{em(x.id,t.items).forEach(m=>w.push({item:m,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const b=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:b}},[o,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,f)=>{const{item:w}=u,b=l(u);if("command"in w){const x=w.group+f;return a.jsx(Xo,{onClick:m=>{n==null||n(m),r(w)},...b},x)}return a.jsx(Qf,{parentMenuItem:w,parentItemProps:b,...e},d+w.id)})},d)}function tm(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Gi,{...e,includedGroups:s})}function nm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(Ae.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(Ae.List,{id:n,dense:!0,className:s??"",children:a.jsx(tm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ui({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,s=h.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(Ae.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(nm,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function rm(e){return{preserveValue:!0,...e}}const sr=(e,t,n={})=>{const r=h.useRef(t);r.current=t;const o=h.useRef(n);o.current=rm(o.current);const[s,i]=h.useState(()=>r.current),[l,c]=h.useState(!0);return h.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},om=Ni(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function qi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=h.useState(!1),[u,f]=h.useState(!1),w=h.useCallback(()=>{c&&d(!1),f(!1)},[c]),b=h.useCallback(S=>{S.stopPropagation(),d(v=>{const P=!v;return P&&S.shiftKey?f(!0):P||f(!1),P})},[]),x=h.useCallback(S=>(w(),r(S)),[r,w]),[m,g]=h.useState({top:1,left:1});h.useEffect(()=>{if(c){const S=o==null?void 0:o.current;if(S){const v=S.getBoundingClientRect(),P=window.scrollY,z=window.scrollX,J=v.top+P+S.clientHeight,C=v.left+z;g({top:J,left:C})}}},[c,o]);const[y]=sr(h.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=sr(h.useCallback(async()=>(e==null?void 0:e(!0))??n??y,[e,n,y,c]),n??y),R=u&&_?_:y;return a.jsxs(a.Fragment,{children:[a.jsx(Ae.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??a.jsx(om,{})}),a.jsx(Ae.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:R?a.jsx(Ui,{className:s,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:R}):void 0})]})}function am({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(Ae.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const ut=h.forwardRef(({className:e,direction:t,...n},r)=>a.jsx(W.LoaderCircle,{size:35,className:N("tw-animate-spin",{"tw-direction-reverse":t==="rtl"},e),...n,ref:r}));ut.displayName="Spinner";function sm({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}){return a.jsxs("div",{className:N("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(Ce,{htmlFor:e,className:N({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(lt,{id:e,disabled:t,placeholder:i,required:l,className:N(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}),a.jsx("p",{className:N({"tw-hidden":!o}),children:o})]})}function im({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const s=h.useRef(void 0);return a.jsx("div",{ref:s,style:{position:"relative"},children:a.jsx(Ae.AppBar,{position:"static",id:r,children:a.jsxs(Ae.Toolbar,{className:N("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?a.jsx(qi,{commandHandler:t,containerRef:s,menuProvider:e}):void 0,o?a.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const lm=Kt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Hi=h.forwardRef(({className:e,variant:t,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:N(lm({variant:t}),e),...n}));Hi.displayName="Alert";const Xi=h.forwardRef(({className:e,...t},n)=>a.jsxs("h5",{ref:n,className:N("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Xi.displayName="AlertTitle";const Yi=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Yi.displayName="AlertDescription";const Wi=Kt.cva("tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-text-foreground"}},defaultVariants:{variant:"default"}});function cm({className:e,variant:t,...n}){return a.jsx("div",{className:N("pr-twp",Wi({variant:t}),e),...n})}const Yo=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Yo.displayName="Card";const Wo=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Wo.displayName="CardHeader";const Ko=h.forwardRef(({className:e,...t},n)=>a.jsx("h3",{ref:n,className:N("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Ko.displayName="CardTitle";const Jo=h.forwardRef(({className:e,...t},n)=>a.jsx("p",{ref:n,className:N("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Jo.displayName="CardDescription";const Zo=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-p-6 tw-pt-0",e),...t}));Zo.displayName="CardContent";const Ki=h.forwardRef(({className:e,...t},n)=>a.jsx("div",{ref:n,className:N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Ki.displayName="CardFooter";function dm({...e}){return a.jsx(ds.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Ji=h.forwardRef(({className:e,...t},n)=>a.jsxs(mn.Root,{ref:n,className:N("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,children:[a.jsx(mn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(mn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(mn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]}));Ji.displayName=mn.Root.displayName;const Zi=h.forwardRef(({className:e,direction:t,...n},r)=>a.jsx(Hr.Root,{className:N("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...n,ref:r,children:a.jsx(Hr.Thumb,{className:N("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":t==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":t==="rtl"})})}));Zi.displayName=Hr.Root.displayName;const um=_e.Root,Qi=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.List,{ref:n,className:N("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Qi.displayName=_e.List.displayName;const el=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.Trigger,{ref:n,className:N("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));el.displayName=_e.Trigger.displayName;const tl=h.forwardRef(({className:e,...t},n)=>a.jsx(_e.Content,{ref:n,className:N("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));tl.displayName=_e.Content.displayName;function pm({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?a.jsx(ut,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(W.Download,{size:25,className:N("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function wm({isEnabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(ut,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function fm({isDisabling:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(ut,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function mm({isUpdating:e,handleClick:t,className:n,...r}){return a.jsx(pe,{className:N("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?a.jsxs(a.Fragment,{children:[a.jsx(ut,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function hm({id:e,markdown:t,className:n,anchorTarget:r}){const o=h.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:e,className:N("pr-twp tw-prose",n),children:a.jsx(_l,{options:o,children:t})})}const nl=h.forwardRef((e,t)=>a.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[a.jsx(W.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(W.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var rl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(rl||{});function gm({id:e,groups:t}){return a.jsx("div",{id:e,children:a.jsxs(Lt,{children:[a.jsx(En,{asChild:!0,children:a.jsx(nl,{})}),a.jsx(Nt,{children:t.map(n=>a.jsxs("div",{children:[a.jsx(Zt,{children:n.label}),a.jsx(xs,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(Mn,{onClick:r.onClick,children:r.label}):a.jsx(co,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Qt,{})]},n.label))})]})})}function bm({id:e,message:t}){return a.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function vm({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const s=new ee.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(W.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(W.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(W.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function ol({id:e,versionHistory:t}){const[n,r]=h.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,f=d.getUTCMonth(),w=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:f>0?b=`${f.toString()} month${f===1?"":"s"} ago`:w===0?b="today":b=`${w.toString()} day${w===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:e,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function xm({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const s=h.useMemo(()=>ee.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(ol,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:t}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const ym=["%resources_action%","%resources_dialog_subtitle%","%resources_dialog_title%","%resources_filterInput%","%resources_fullName%","%resources_get%","%resources_installed%","%resources_language%","%resources_languageFilter%","%resources_loadingResources%","%resources_noResults%","%resources_open%","%resources_remove%","%resources_size%","%resources_type%","%resources_type_DBL%","%resources_type_ER%","%resources_type_SLR%","%resources_type_XR%","%resources_type_unknown%","%resources_update%"],Nm=(e,t)=>{const n=Array.from(new Set(e.map(o=>o.bestLanguageName))),r=new Set(t.concat(e.filter(o=>o.installed).map(o=>o.bestLanguageName)));return n.sort((o,s)=>{const i=r.has(o),l=r.has(s);return i&&l?o.localeCompare(s):i?-1:l?1:o.localeCompare(s)})},ls=(e,t,n)=>a.jsx(pe,{variant:"outline",onClick:()=>n(e.dblEntryUid,"install"),children:t}),km=(e,t,n,r,o,s)=>t.includes(e.dblEntryUid)?a.jsx(pe,{variant:"outline",children:a.jsx(ut,{className:"tw-h-5 tw-py-[1px]"})}):e.installed?e.updateAvailable?ls(e,r,s):a.jsx(Ce,{className:"tw-my-2 tw-flex tw-h-6 tw-items-center",children:o}):ls(e,n,s);function jm({localizedStrings:e,dblResources:t,isLoadingDblResources:n,typeFilter:r,setTypeFilter:o,languageFilter:s,setLanguageFilter:i,openResource:l,installResource:c,uninstallResource:d}){const u=e["%resources_action%"],f=e["%resources_dialog_subtitle%"],w=e["%resources_dialog_title%"],b=e["%resources_filterInput%"],x=e["%resources_fullName%"],m=e["%resources_get%"],g=e["%resources_installed%"],y=e["%resources_language%"],_=e["%resources_languageFilter%"],R=e["%resources_loadingResources%"],S=e["%resources_noResults%"],v=e["%resources_open%"],P=e["%resources_remove%"],z=e["%resources_size%"],J=e["%resources_type%"],C=e["%resources_type_DBL%"],I=e["%resources_type_ER%"],$=e["%resources_type_SLR%"],O=e["%resources_type_XR%"],A=e["%resources_type_unknown%"],X=e["%resources_update%"],[q,V]=h.useState([]),te=(T,U)=>{if(!c||!d)return;const E={dblEntryUid:T,action:U==="install"?"installing":"removing"};V(B=>[...B,E]),(U==="install"?c:d)(T).catch(B=>{console.debug(ee.getErrorMessage(B))})};h.useEffect(()=>{V(T=>T.filter(U=>{const E=t.find(we=>we.dblEntryUid===U.dblEntryUid);return E?!(U.action==="installing"&&E.installed||U.action==="removing"&&!E.installed):!0}))},[t]);const[oe,se]=h.useState(""),k=h.useMemo(()=>t.filter(T=>{const U=oe.toLowerCase();return T.displayName.toLowerCase().includes(U)||T.fullName.toLowerCase().includes(U)||T.bestLanguageName.toLowerCase().includes(U)}),[t,oe]),j=h.useMemo(()=>[{type:"DBLResource",localizedValue:C},{type:"EnhancedResource",localizedValue:I},{type:"SourceLanguageResource",localizedValue:$},{type:"XmlResource",localizedValue:O}],[C,I,$,O]),F=T=>{const U=[...r];let E=[];!U||U.length===0?E=[T]:E=U.includes(T)?U.filter(we=>we!==T):[...U,T],o(E)},H=h.useMemo(()=>k.filter(T=>r.includes(T.type)),[k,r]);h.useEffect(()=>{s.length===0&&i(t.filter(T=>T.installed===!0).map(T=>T.bestLanguageName))},[t,s.length,i]);const G=T=>{const U=[...s];let E=[];!U||U.length===0?E=[T]:E=U.includes(T)?U.filter(we=>we!==T):[...U,T],i(E)},Y=h.useMemo(()=>H.filter(T=>s.includes(T.bestLanguageName)),[s,H]),[L,Z]=h.useState({key:"bestLanguageName",direction:"ascending"}),K=h.useMemo(()=>[...Y].sort((T,U)=>{const E=T[L.key],we=U[L.key];return E<we?L.direction==="ascending"?-1:1:E>we?L.direction==="ascending"?1:-1:0}),[L.direction,L.key,Y]),Q=T=>{const U={key:T,direction:"ascending"};L.key===T&&L.direction==="ascending"&&(U.direction="descending"),Z(U)};return a.jsxs(Yo,{className:"tw-rounded-none tw-border-0",children:[a.jsx(Wo,{children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(W.BookOpen,{size:36,className:"tw-mr-2"}),a.jsxs("div",{children:[a.jsx(Ko,{children:w}),a.jsx(Jo,{className:"tw-mt-1",children:f})]})]})}),a.jsx(Zo,{children:n||!t?a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-2",children:[a.jsx(Ce,{children:R}),a.jsx(ut,{})]}):a.jsxs("div",{children:[a.jsxs("div",{className:"tw-mb-1 tw-flex tw-gap-1",children:[a.jsxs("div",{className:"tw-relative",children:[a.jsx(lt,{type:"text",className:"tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none",onChange:T=>se(T.target.value),value:oe,placeholder:b}),a.jsx(W.Search,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground"})]}),a.jsxs(Lt,{children:[a.jsx(En,{asChild:!0,children:a.jsxs(pe,{variant:"outline",children:[a.jsx(W.Loader,{className:"tw-mr-2 tw-w-4"}),J]})}),a.jsx(Nt,{align:"start",children:j.map(T=>a.jsx(Mn,{checked:r.includes(T.type),onClick:U=>{U.preventDefault(),F(T.type)},children:a.jsx("span",{children:T.localizedValue})}))})]}),a.jsx(Tn,{className:"tw-w-auto tw-min-w-10 tw-flex-shrink",buttonPlaceholder:y,textPlaceholder:_,value:s[0],options:Nm(t,s),onChange:G})]}),K.length===0?a.jsx("div",{className:"tw-m-4 tw-flex tw-w-full tw-justify-center",children:a.jsx(Ce,{children:S})}):a.jsxs(en,{stickyHeader:!0,children:[a.jsx(tn,{className:"tw-bg-none",stickyHeader:!0,children:a.jsxs(Xe,{children:[a.jsx(Me,{}),a.jsx(Me,{}),a.jsx(Me,{onClick:()=>Q("fullName"),children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[x,L.key!=="fullName"&&a.jsx(W.ChevronsUpDown,{className:"tw-pl-1",size:16}),L.key==="fullName"&&(L.direction==="ascending"?a.jsx(W.ChevronUp,{className:"tw-pl-1",size:16}):a.jsx(W.ChevronDown,{className:"tw-pl-1",size:16}))]})}),a.jsx(Me,{onClick:()=>Q("bestLanguageName"),children:a.jsxs("div",{className:"tw-flex tw-items-center",children:[y,L.key!=="bestLanguageName"&&a.jsx(W.ChevronsUpDown,{className:"tw-pl-1",size:16}),L.key==="bestLanguageName"&&(L.direction==="ascending"?a.jsx(W.ChevronUp,{className:"tw-pl-1",size:16}):a.jsx(W.ChevronDown,{className:"tw-pl-1",size:16}))]})}),a.jsx(Me,{children:J}),a.jsx(Me,{children:z}),a.jsx(Me,{children:u})]})}),a.jsx(nn,{children:K.map(T=>{var U;return a.jsxs(Xe,{children:[a.jsx(Ee,{children:a.jsx(W.BookOpen,{className:"tw-pr-0",size:18})}),a.jsx(Ee,{children:T.displayName}),a.jsx(Ee,{className:"tw-font-medium",children:T.fullName}),a.jsx(Ee,{children:T.bestLanguageName}),a.jsx(Ee,{children:((U=j.find(E=>E.type===T.type))==null?void 0:U.localizedValue)??A}),a.jsx(Ee,{children:T.size}),a.jsx(Ee,{children:a.jsxs("div",{className:"tw-flex tw-justify-between",children:[km(T,q.map(E=>E.dblEntryUid),m,X,g,te),T.installed&&a.jsxs(Lt,{children:[a.jsx(En,{asChild:!0,children:a.jsx(pe,{variant:"ghost",children:a.jsx(W.Ellipsis,{className:"tw-w-4"})})}),a.jsxs(Nt,{align:"start",children:[a.jsx(Cn,{onClick:()=>l(T.projectId),children:a.jsx("span",{children:v})}),a.jsx(Qt,{}),a.jsx(Cn,{onClick:()=>te(T.dblEntryUid,"remove"),children:a.jsx("span",{children:P})})]})]})]})})]},T.displayName+T.fullName)})})]})]})})]})}const Sm=(e,t)=>{h.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Gr=()=>!1,Em=(e,t)=>{const[n]=sr(h.useCallback(async()=>{if(!e)return Gr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Gr,{preserveValue:!1});h.useEffect(()=>()=>{n!==Gr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>ds.toast});exports.Alert=Hi;exports.AlertDescription=Yi;exports.AlertTitle=Xi;exports.BOOK_SELECTOR_STRING_KEYS=fc;exports.Badge=cm;exports.BookChapterControl=sc;exports.BookSelectionMode=Os;exports.BookSelector=mc;exports.Button=pe;exports.Card=Yo;exports.CardContent=Zo;exports.CardDescription=Jo;exports.CardFooter=Ki;exports.CardHeader=Wo;exports.CardTitle=Ko;exports.ChapterRangeSelector=Rs;exports.Checkbox=lr;exports.Checklist=ld;exports.ComboBox=Tn;exports.DataTable=As;exports.DisableButton=fm;exports.DropdownMenu=Lt;exports.DropdownMenuCheckboxItem=Mn;exports.DropdownMenuContent=Nt;exports.DropdownMenuGroup=xs;exports.DropdownMenuItem=Cn;exports.DropdownMenuItemType=rl;exports.DropdownMenuLabel=Zt;exports.DropdownMenuPortal=Xl;exports.DropdownMenuRadioGroup=Wl;exports.DropdownMenuRadioItem=co;exports.DropdownMenuSeparator=Qt;exports.DropdownMenuShortcut=ks;exports.DropdownMenuSub=Yl;exports.DropdownMenuSubContent=Ns;exports.DropdownMenuSubTrigger=ys;exports.DropdownMenuTrigger=En;exports.EnableButton=wm;exports.FILTERABLE_RESOURCE_LIST_STRING_KEYS=ym;exports.FilterButton=nl;exports.FilterDropdown=gm;exports.FilterableResourceList=jm;exports.Footer=xm;exports.GridMenu=Ui;exports.HamburgerMenuButton=qi;exports.INVENTORY_STRING_KEYS=jc;exports.IconButton=am;exports.Input=lt;exports.InstallButton=pm;exports.Inventory=Cc;exports.Label=Ce;exports.MarkdownRenderer=hm;exports.MenuItem=Xo;exports.MoreInfo=vm;exports.MultiSelectComboBox=Tc;exports.NavigationContentSearch=Rc;exports.NoExtensionsFound=bm;exports.RadioGroup=uo;exports.RadioGroupItem=Qn;exports.ScriptureResultsViewer=rd;exports.ScrollGroupSelector=od;exports.SearchBar=yo;exports.Select=zt;exports.SelectContent=jt;exports.SelectGroup=_s;exports.SelectItem=Ve;exports.SelectLabel=Ps;exports.SelectScrollDownButton=vo;exports.SelectScrollUpButton=bo;exports.SelectSeparator=Is;exports.SelectTrigger=kt;exports.SelectValue=Ft;exports.Separator=dr;exports.SettingsList=ad;exports.SettingsListHeader=id;exports.SettingsListItem=sd;exports.SettingsSidebar=Zs;exports.SettingsSidebarContentSearch=Wc;exports.Slider=Ji;exports.Sonner=dm;exports.Spinner=ut;exports.Switch=Zi;exports.Table=en;exports.TableBody=nn;exports.TableCaption=$s;exports.TableCell=Ee;exports.TableFooter=Ms;exports.TableHead=Me;exports.TableHeader=tn;exports.TableRow=Xe;exports.Tabs=um;exports.TabsContent=tl;exports.TabsList=Qi;exports.TabsTrigger=el;exports.TextField=sm;exports.ToggleGroup=xo;exports.ToggleGroupItem=xn;exports.Toolbar=im;exports.UpdateButton=mm;exports.VersionHistory=ol;exports.VerticalTabs=No;exports.VerticalTabsContent=jo;exports.VerticalTabsList=ko;exports.VerticalTabsTrigger=Fs;exports.badgeVariants=Wi;exports.buttonVariants=js;exports.cn=N;exports.getBookNumFromId=Bs;exports.getLinesFromUSFM=Ds;exports.getNumberFromUSFM=Xr;exports.getStatusForItem=Vs;exports.inventoryCountColumn=Nc;exports.inventoryItemColumn=xc;exports.inventoryStatusColumn=kc;exports.useEvent=Sm;exports.useEventAsync=Em;exports.usePromise=sr;function Cm(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Cm(`*, ::before, ::after {
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
.tw-right-auto {
  right: auto;
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
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
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
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity));
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
.tw-ps-2 {
  padding-inline-start: 0.5rem;
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
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-direction-reverse {
  animation-direction: reverse;
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
`,"top");
//# sourceMappingURL=index.cjs.map
