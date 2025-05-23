<<<<<<< HEAD
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),lr=require("clsx"),dr=require("tailwind-merge"),ft=require("class-variance-authority"),qe=require("@radix-ui/react-dropdown-menu"),N=require("lucide-react"),y=require("platform-bible-utils"),yt=require("@radix-ui/react-slot"),cr=require("@radix-ui/react-label"),pr=require("@radix-ui/react-radio-group"),ur=require("@radix-ui/react-popover"),Y=require("cmdk"),mr=require("@radix-ui/react-dialog"),q=require("@tanstack/react-table"),hr=require("@radix-ui/react-select"),gr=require("markdown-to-jsx"),fr=require("@radix-ui/react-checkbox"),br=require("@radix-ui/react-toggle-group"),xr=require("@radix-ui/react-toggle"),vr=require("@radix-ui/react-separator"),yr=require("@radix-ui/react-tooltip"),Nr=require("@radix-ui/react-tabs"),kr=require("@radix-ui/react-menubar"),jr=require("react-hotkeys-hook"),Sr=require("@radix-ui/react-avatar"),He=require("sonner"),Cr=require("@radix-ui/react-slider"),Rr=require("@radix-ui/react-switch");function X(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const D=X(qe),$e=X(cr),Mt=X(pr),Et=X(ur),et=X(mr),F=X(hr),we=X(fr),qt=X(br),Ye=X(xr),Ke=X(vr),Dt=X(yr),K=X(Nr),B=X(kr),Nt=X(Sr),zt=X(Cr),le=X(Rr),Tr=dr.extendTailwindMerge({prefix:"tw-"});function d(...t){return Tr(lr.clsx(t))}const bt=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));bt.displayName="Input";const _r=s.forwardRef(({handleSearch:t,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,...i},l)=>e.jsx("div",{className:"tw-relative",children:e.jsx(bt,{...i,type:"text",className:d("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:w=>t(w.target.value),onKeyDown:w=>{w.key==="Enter"?(a(),w.preventDefault()):n(w)},onClick:r,ref:l})})),ue=s.createContext(void 0);function Q(){const t=s.useContext(ue);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const rt=ft.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),zr="layoutDirection";function G(){const t=localStorage.getItem(zr);return t==="rtl"?t:"ltr"}const Ht=D.Trigger,me=D.Group,Ue=D.Portal,Je=D.Sub,Ir=D.RadioGroup;function Bt({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(ue.Provider,{value:r,children:e.jsx(D.Root,{...n})})}const he=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=Q();return e.jsxs(D.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,rt({variant:i.variant})),...a,children:[r,e.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});he.displayName=D.SubTrigger.displayName;const ge=s.forwardRef(({className:t,...n},r)=>e.jsx(D.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));ge.displayName=D.SubContent.displayName;const kt=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const i=G();return e.jsx(D.Portal,{children:e.jsx(D.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:i,children:r})})})});kt.displayName=D.Content.displayName;const $t=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=G(),i=Q();return e.jsx(D.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,rt({variant:i.variant})),...r,dir:o})});$t.displayName=D.Item.displayName;const Yt=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=Q();return e.jsxs(D.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,rt({variant:i.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(D.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Yt.displayName=D.CheckboxItem.displayName;const fe=s.forwardRef(({className:t,children:n,...r},a)=>{const o=Q();return e.jsxs(D.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,rt({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(D.ItemIndicator,{children:e.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});fe.displayName=D.RadioItem.displayName;const Vt=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(D.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Vt.displayName=D.Label.displayName;const jt=s.forwardRef(({className:t,...n},r)=>e.jsx(D.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));jt.displayName=D.Separator.displayName;function We({className:t,...n}){return e.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}We.displayName="DropdownMenuShortcut";var Mr=Object.defineProperty,Er=(t,n,r)=>n in t?Mr(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,R=(t,n,r)=>Er(t,typeof n!="symbol"?n+"":n,r);const ut=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],be=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ze=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Ae=Xr();function St(t,n=!0){return n&&(t=t.toUpperCase()),t in Ae?Ae[t]:0}function xe(t){return St(t)>0}function Dr(t){const n=typeof t=="string"?St(t):t;return n>=40&&n<=66}function Br(t){return(typeof t=="string"?St(t):t)<=39}function Qe(t){return t<=66}function Vr(t){const n=typeof t=="string"?St(t):t;return nn(n)&&!Qe(n)}function*Pr(){for(let t=1;t<=ut.length;t++)yield t}const Ar=1,tn=ut.length;function Or(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ve(t,n="***"){const r=t-1;return r<0||r>=ut.length?n:ut[r]}function en(t){return t<=0||t>tn?"******":Ze[t-1]}function Fr(t){return en(St(t))}function nn(t){const n=typeof t=="number"?ve(t):t;return xe(n)&&!be.includes(n)}function Gr(t){const n=typeof t=="number"?ve(t):t;return xe(n)&&be.includes(n)}function Lr(t){return Ze[t-1].includes("*obsolete*")}function Xr(){const t={};for(let n=0;n<ut.length;n++)t[ut[n]]=n+1;return t}const O={allBookIds:ut,nonCanonicalIds:be,bookIdToNumber:St,isBookIdValid:xe,isBookNT:Dr,isBookOT:Br,isBookOTNT:Qe,isBookDC:Vr,allBookNumbers:Pr,firstBook:Ar,lastBook:tn,extraBooks:Or,bookNumberToId:ve,bookNumberToEnglishName:en,bookIdToEnglishName:Fr,isCanonical:nn,isExtraMaterial:Gr,isObsolete:Lr};var tt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(tt||{});const J=class{constructor(n){if(R(this,"name"),R(this,"fullPath"),R(this,"isPresent"),R(this,"hasVerseSegments"),R(this,"isCustomized"),R(this,"baseVersification"),R(this,"scriptureBooks"),R(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=tt[n]):(this._type=n,this.name=tt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};R(J,"Original",new J(tt.Original)),R(J,"Septuagint",new J(tt.Septuagint)),R(J,"Vulgate",new J(tt.Vulgate)),R(J,"English",new J(tt.English)),R(J,"RussianProtestant",new J(tt.RussianProtestant)),R(J,"RussianOrthodox",new J(tt.RussianOrthodox));let ct=J;function Oe(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var rn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(rn||{});const $=class I{constructor(n,r,a,o){if(R(this,"firstChapter"),R(this,"lastChapter"),R(this,"lastVerse"),R(this,"hasSegmentsDefined"),R(this,"text"),R(this,"BBBCCCVVVS"),R(this,"longHashCode"),R(this,"versification"),R(this,"rtlMark","‏"),R(this,"_bookNum",0),R(this,"_chapterNum",0),R(this,"_verseNum",0),R(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,l=r!=null&&r instanceof ct?r:void 0;this.setEmpty(l),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof ct?r:void 0;this.setEmpty(i),this._verseNum=n%I.chapterDigitShifter,this._chapterNum=Math.floor(n%I.bookDigitShifter/I.chapterDigitShifter),this._bookNum=Math.floor(n/I.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof I){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof ct?n:I.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??I.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new I(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Rt)return r=new I,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%I.bcvMaxValue*I.bookDigitShifter+(r>=0?r%I.bcvMaxValue*I.chapterDigitShifter:0)+(a>=0?a%I.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:i,versificationStr:l}=n,w=i||o.toString();let c;return l&&(c=new ct(l)),r?new I(r,a.toString(),w,c):new I}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>I.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(I.verseRangeSeparator)||this._verse.includes(I.verseSequenceIndicator))}get book(){return O.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=O.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=I.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=I.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>O.lastBook)throw new Rt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new ct(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(I.verseRangeSeparators,I.verseSequenceIndicators)}get BBBCCC(){return I.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return I.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const l=+i[1].trim();this.versification=new ct(tt[l])}catch{throw new Rt("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Rt("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||O.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!I.isVerseParseable(a[1]))throw new Rt("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new I(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof I?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=I.verseRangeSeparators,a=I.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Oe(this._verse,a);for(const l of i.map(w=>Oe(w,r))){const w=this.clone();w.verse=l[0];const c=w.verseNum;if(o.push(w),l.length>1){const p=this.clone();if(p.verse=l[1],!n)for(let u=c+1;u<p.verseNum;u++){const g=new I(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(g)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const l=o.BBBCCCVVV;if(a>l)return 3;if(a===l)return 4;a=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>O.lastBook?2:(O.isCanonical(this._bookNum),0)}setEmpty(n=I.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=O.bookIdToNumber(n),this.chapter=r,this.verse=a}};R($,"defaultVersification",ct.English),R($,"verseRangeSeparator","-"),R($,"verseSequenceIndicator",","),R($,"verseRangeSeparators",[$.verseRangeSeparator]),R($,"verseSequenceIndicators",[$.verseSequenceIndicator]),R($,"chapterDigitShifter",1e3),R($,"bookDigitShifter",$.chapterDigitShifter*$.chapterDigitShifter),R($,"bcvMaxValue",$.chapterDigitShifter-1),R($,"ValidStatusType",rn);class Rt extends Error{}const qr=s.forwardRef(({bookId:t,handleSelectBook:n,isSelected:r,handleHighlightBook:a,handleKeyDown:o,bookType:i,children:l},w)=>e.jsxs($t,{ref:w,textValue:t,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[e.jsx("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":i.toLowerCase()==="ot","tw-border-s-purple-200":i.toLowerCase()==="nt","tw-border-s-indigo-200":i.toLowerCase()==="dc"}),children:O.bookIdToEnglishName(t)}),r&&e.jsx("div",{children:l})]},t));function Hr({handleSelectChapter:t,endChapter:n,activeChapter:r,highlightedChapter:a,handleHighlightedChapter:o}){const i=Array.from({length:n},(w,c)=>c+1),l=s.useCallback(w=>{o(w)},[o]);return e.jsx("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:i.map(w=>e.jsx("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":w===r,"tw-bg-amber-200":w===a}),onClick:c=>{c.preventDefault(),c.stopPropagation(),t(w)},role:"button",onKeyDown:c=>{c.key==="Enter"&&t(w)},tabIndex:0,onMouseMove:()=>l(w),children:w},w))})}const ye=O.allBookIds.filter(t=>!O.isObsolete(O.bookIdToNumber(t))),$r={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Fe=["OT","NT","DC"],Yr=96,Kr=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Tt=t=>y.getChaptersForBook(O.bookIdToNumber(t));function Ur(){return ye.map(n=>O.bookIdToEnglishName(n))}function Jr(t){return Ur().includes(t)}function Wr(t){const n=t.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Jr(n))return ye.find(a=>O.bookIdToEnglishName(a)===n)}function Zr({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=G(),[i,l]=s.useState(""),[w,c]=s.useState(t.book),[p,u]=s.useState(t.chapterNum??0),[g,h]=s.useState(t.book),[m,b]=s.useState(!1),[S,f]=s.useState(m),x=s.useRef(void 0),k=s.useRef(void 0),T=s.useRef(void 0),A=s.useCallback(C=>{const M=a?a():ye;return{OT:M.filter(P=>O.isBookOT(P)),NT:M.filter(P=>O.isBookNT(P)),DC:M.filter(P=>O.isBookDC(P))}[C].filter(P=>{const v=O.bookIdToEnglishName(P).toLowerCase(),z=i.replace(/[^a-zA-Z]/g,"").toLowerCase();return v.includes(z)||P.toLowerCase().includes(z)})},[i,a]),U=C=>{l(C)},wt=s.useRef(!1),lt=s.useCallback(C=>{if(wt.current){wt.current=!1;return}b(C)},[]),j=s.useCallback((C,M,P,v)=>{if(u(t.book!==C?1:t.chapterNum),M||Tt(C)===-1){n({book:C,chapterNum:P??1,verseNum:v??1}),b(!1),l("");return}c(w!==C?C:""),b(!M)},[n,t.book,t.chapterNum,w]),_=C=>{C<=0||C>Tt(w)||j(w,!0,C)},H=s.useCallback(()=>{Kr.forEach(C=>{const M=C.exec(i);if(M){const[P,v=void 0,z=void 0]=M.slice(1),Z=Wr(P);(O.isBookIdValid(P)||Z)&&j(Z??P,!0,v?parseInt(v,10):1,z?parseInt(z,10):1)}}),x.current.blur()},[j,i]),V=s.useCallback(C=>{m?(C.key==="ArrowDown"||C.key==="ArrowUp")&&(T!=null&&T.current?T.current.focus():k.current&&k.current.focus(),C.preventDefault()):b(!0)},[m]),ne=C=>{const{key:M}=C;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||x.current.dispatchEvent(new KeyboardEvent("keydown",{key:M}))},re=C=>{const{key:M}=C;if(g===w){if(M==="Enter"){C.preventDefault(),j(w,!0,p);return}const P=M==="ArrowRight"&&!o||M==="ArrowRight"&&o==="ltr"||M==="ArrowLeft"&&o==="rtl",v=M==="ArrowLeft"&&!o||M==="ArrowLeft"&&o==="ltr"||M==="ArrowRight"&&o==="rtl";let z=0;if(P)if(p<Tt(g))z=1;else{C.preventDefault();return}else if(v)if(p>1)z=-1;else{C.preventDefault();return}else M==="ArrowDown"?z=6:M==="ArrowUp"&&(z=-6);p+z<=0||p+z>Tt(g)?u(0):z!==0&&(u(p+z),C.preventDefault())}};return s.useEffect(()=>{w===g?w===t.book?u(t.chapterNum):u(1):u(0)},[g,t.book,t.chapterNum,w]),s.useLayoutEffect(()=>{f(m)},[m]),s.useLayoutEffect(()=>{const C=setTimeout(()=>{if(S&&k.current&&T.current&&!i){const P=T.current.offsetTop-Yr;k.current.scrollTo({top:P,behavior:"instant"})}},10);return()=>{clearTimeout(C)}},[S,i]),e.jsx("div",{className:"pr-twp tw-flex tw-bg-transparent",children:e.jsxs(Bt,{modal:!1,open:m,onOpenChange:lt,children:[e.jsx(Ht,{asChild:!0,children:e.jsx(_r,{ref:x,value:i,handleSearch:U,handleKeyDown:V,handleOnClick:()=>{c(t.book),h(t.book),u(t.chapterNum>0?t.chapterNum:0),b(!0),l(y.formatScrRef(t,"English")),x.current.focus()},onFocus:()=>{wt.current=!0},onBlur:()=>{l("")},handleSubmit:H,placeholder:y.formatScrRef(t,"English"),className:r})}),e.jsx(kt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:ne,align:o==="ltr"?"start":"end",ref:k,children:e.jsx("div",{className:"rtl:tw-ps-2",children:Fe.map((C,M)=>{const P=A(C);return P.length>0&&e.jsxs("div",{children:[e.jsx(Vt,{className:"tw-font-semibold tw-text-foreground/80",children:$r[C]}),P.map(v=>e.jsx("div",{children:e.jsx(qr,{bookId:v,handleSelectBook:()=>j(v,!1),isSelected:w===v,handleHighlightBook:()=>h(v),handleKeyDown:re,bookType:C,ref:z=>{w===v&&(T.current=z)},children:e.jsx(Hr,{handleSelectChapter:_,endChapter:Tt(v),activeChapter:t.book===v?t.chapterNum:0,highlightedChapter:p,handleHighlightedChapter:z=>{u(z)}})})},v)),Fe.length-1!==M?e.jsx(jt,{}):void 0]},C)})})})]})})}const an=ft.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),E=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},i)=>{const l=a?yt.Slot:"button";return e.jsx(l,{className:d(an({variant:n,size:r,className:t})),ref:i,...o})});E.displayName="Button";const Qr=ft.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),L=s.forwardRef(({className:t,...n},r)=>e.jsx($e.Root,{ref:r,className:d("pr-twp",Qr(),t),...n}));L.displayName=$e.Root.displayName;const Ne=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsx(Mt.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});Ne.displayName=Mt.Root.displayName;const Gt=s.forwardRef(({className:t,...n},r)=>e.jsx(Mt.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Mt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(N.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Gt.displayName=Mt.Item.displayName;const ke=Et.Root,je=Et.Trigger,Kt=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const i=G();return e.jsx(Et.Portal,{children:e.jsx(Et.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:i})})});Kt.displayName=Et.Content.displayName;const ta=et.Portal,on=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));on.displayName=et.Overlay.displayName;const ea=s.forwardRef(({className:t,children:n,...r},a)=>{const o=G();return e.jsxs(ta,{children:[e.jsx(on,{}),e.jsxs(et.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(et.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(N.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});ea.displayName=et.Content.displayName;const na=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));na.displayName=et.Title.displayName;const ra=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));ra.displayName=et.Description.displayName;const Se=s.forwardRef(({className:t,...n},r)=>e.jsx(Y.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));Se.displayName=Y.Command.displayName;const Ce=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(N.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(Y.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});Ce.displayName=Y.Command.Input.displayName;const Re=s.forwardRef(({className:t,...n},r)=>e.jsx(Y.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Re.displayName=Y.Command.List.displayName;const Te=s.forwardRef((t,n)=>e.jsx(Y.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Te.displayName=Y.Command.Empty.displayName;const sn=s.forwardRef(({className:t,...n},r)=>e.jsx(Y.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));sn.displayName=Y.Command.Group.displayName;const aa=s.forwardRef(({className:t,...n},r)=>e.jsx(Y.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...n}));aa.displayName=Y.Command.Separator.displayName;const _e=s.forwardRef(({className:t,...n},r)=>e.jsx(Y.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));_e.displayName=Y.Command.Item.displayName;function oa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Lt({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:i,onChange:l=()=>{},getOptionLabel:w=oa,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:u="",commandEmptyMessage:g="No option found",buttonVariant:h="outline",alignDropDown:m="start",isDisabled:b=!1,...S}){const[f,x]=s.useState(!1);return e.jsxs(ke,{open:f,onOpenChange:x,...S,children:[e.jsx(je,{asChild:!0,children:e.jsxs(E,{variant:h,role:"combobox","aria-expanded":f,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:b,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-pe-2",children:c}),e.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?w(i):p})]}),e.jsx(N.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Kt,{align:m,className:d("tw-w-[200px] tw-p-0",o),children:e.jsxs(Se,{children:[e.jsx(Ce,{placeholder:u,className:"tw-text-inherit"}),e.jsx(Te,{children:g}),e.jsx(Re,{children:n.map(k=>e.jsxs(_e,{value:w(k),onSelect:()=>{l(k),x(!1)},children:[e.jsx(N.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||w(i)!==w(k)})}),w(k)]},w(k)))})]})})]})}function wn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:i}){const l=s.useMemo(()=>Array.from({length:i},(p,u)=>u+1),[i]),w=p=>{r(p),p>n&&a(p)},c=p=>{a(p),p<t&&r(p)};return e.jsxs(e.Fragment,{children:[e.jsx(L,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(Lt,{isDisabled:o,onChange:w,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:t},"start chapter"),e.jsx(L,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(Lt,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:n},"end chapter")]})}var ln=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(ln||{});const sa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),ae=(t,n)=>t[n]??n;function ia({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:i,handleSelectEndChapter:l,startChapter:w,handleSelectStartChapter:c,localizedStrings:p}){const u=ae(p,"%webView_bookSelector_currentBook%"),g=ae(p,"%webView_bookSelector_choose%"),h=ae(p,"%webView_bookSelector_chooseBooks%"),[m,b]=s.useState("current book"),S=f=>{b(f),t(f)};return e.jsx(Ne,{className:"pr-twp tw-flex",value:m,onValueChange:f=>S(f),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Gt,{value:"current book"}),e.jsx(L,{className:"tw-ms-1",children:u})]}),e.jsx(L,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(wn,{isDisabled:m==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:l,chapterCount:o,startChapter:w,endChapter:i})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Gt,{value:"choose books"}),e.jsx(L,{className:"tw-ms-1",children:h})]}),e.jsx(L,{className:"tw-flex tw-items-center",children:a.map(f=>O.bookIdToEnglishName(f)).join(", ")}),e.jsx(E,{disabled:m==="current book",onClick:()=>r(),children:g})]})]})})}function wa({table:t}){return e.jsxs(Bt,{children:[e.jsx(qe.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(E,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(N.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(kt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(Vt,{children:"Toggle columns"}),e.jsx(jt,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Yt,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const mt=F.Root,dn=F.Group,ht=F.Value,st=s.forwardRef(({className:t,children:n,...r},a)=>{const o=G();return e.jsxs(F.Trigger,{ref:a,className:d("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",t),...r,dir:o,children:[n,e.jsx(F.Icon,{asChild:!0,children:e.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});st.displayName=F.Trigger.displayName;const ze=s.forwardRef(({className:t,...n},r)=>e.jsx(F.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(N.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ze.displayName=F.ScrollUpButton.displayName;const Ie=s.forwardRef(({className:t,...n},r)=>e.jsx(F.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Ie.displayName=F.ScrollDownButton.displayName;const it=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const i=G();return e.jsx(F.Portal,{children:e.jsxs(F.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(ze,{}),e.jsx(F.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:i,children:n})}),e.jsx(Ie,{})]})})});it.displayName=F.Content.displayName;const cn=s.forwardRef(({className:t,...n},r)=>e.jsx(F.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));cn.displayName=F.Label.displayName;const W=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(F.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(F.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(F.ItemText,{children:n})]}));W.displayName=F.Item.displayName;const pn=s.forwardRef(({className:t,...n},r)=>e.jsx(F.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));pn.displayName=F.Separator.displayName;function la({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(mt,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(st,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(ht,{placeholder:t.getState().pagination.pageSize})}),e.jsx(it,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(W,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(N.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(N.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(N.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(N.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const da=`
=======
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),hr=require("clsx"),gr=require("tailwind-merge"),xt=require("class-variance-authority"),Ke=require("@radix-ui/react-dropdown-menu"),k=require("lucide-react"),y=require("platform-bible-utils"),Nt=require("@radix-ui/react-slot"),fr=require("@radix-ui/react-label"),br=require("@radix-ui/react-radio-group"),xr=require("@radix-ui/react-popover"),K=require("cmdk"),vr=require("@radix-ui/react-dialog"),$=require("@tanstack/react-table"),yr=require("@radix-ui/react-select"),kr=require("markdown-to-jsx"),Nr=require("@radix-ui/react-checkbox"),jr=require("@radix-ui/react-toggle-group"),Sr=require("@radix-ui/react-toggle"),Cr=require("@radix-ui/react-separator"),Rr=require("@radix-ui/react-tooltip"),Tr=require("@radix-ui/react-tabs"),_r=require("@radix-ui/react-menubar"),zr=require("react-hotkeys-hook"),Mr=require("@radix-ui/react-avatar"),Ue=require("sonner"),Er=require("@radix-ui/react-slider"),Ir=require("@radix-ui/react-switch");function q(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const I=q(Ke),Je=q(fr),At=q(br),Pt=q(xr),nt=q(vr),P=q(yr),pe=q(Nr),Jt=q(jr),We=q(Sr),Ze=q(Cr),Ot=q(Rr),U=q(Tr),D=q(_r),jt=q(Mr),Bt=q(Er),ue=q(Ir),Dr=gr.extendTailwindMerge({prefix:"tw-"});function d(...t){return Dr(hr.clsx(t))}const vt=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));vt.displayName="Input";const Br=s.forwardRef(({handleSearch:t,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,...w},l)=>e.jsx("div",{className:"tw-relative",children:e.jsx(vt,{...w,type:"text",className:d("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:i=>t(i.target.value),onKeyDown:i=>{i.key==="Enter"?(a(),i.preventDefault()):n(i)},onClick:r,ref:l})})),be=s.createContext(void 0);function tt(){const t=s.useContext(be);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const st=xt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Vr="layoutDirection";function L(){const t=localStorage.getItem(Vr);return t==="rtl"?t:"ltr"}const Wt=I.Trigger,xe=I.Group,Qe=I.Portal,tn=I.Sub,Ar=I.RadioGroup;function Gt({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(be.Provider,{value:r,children:e.jsx(I.Root,{...n})})}const ve=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const w=tt();return e.jsxs(I.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,st({variant:w.variant})),...a,children:[r,e.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});ve.displayName=I.SubTrigger.displayName;const ye=s.forwardRef(({className:t,...n},r)=>e.jsx(I.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));ye.displayName=I.SubContent.displayName;const St=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const w=L();return e.jsx(I.Portal,{children:e.jsx(I.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:w,children:r})})})});St.displayName=I.Content.displayName;const Zt=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=L(),w=tt();return e.jsx(I.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,st({variant:w.variant})),...r,dir:o})});Zt.displayName=I.Item.displayName;const Qt=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const w=tt();return e.jsxs(I.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,st({variant:w.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(I.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Qt.displayName=I.CheckboxItem.displayName;const ke=s.forwardRef(({className:t,children:n,...r},a)=>{const o=tt();return e.jsxs(I.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,st({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(I.ItemIndicator,{children:e.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});ke.displayName=I.RadioItem.displayName;const Lt=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(I.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Lt.displayName=I.Label.displayName;const Ct=s.forwardRef(({className:t,...n},r)=>e.jsx(I.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Ct.displayName=I.Separator.displayName;function en({className:t,...n}){return e.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}en.displayName="DropdownMenuShortcut";var Pr=Object.defineProperty,Fr=(t,n,r)=>n in t?Pr(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,C=(t,n,r)=>Fr(t,typeof n!="symbol"?n+"":n,r);const ht=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ne=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],nn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Xe=Ur();function Rt(t,n=!0){return n&&(t=t.toUpperCase()),t in Xe?Xe[t]:0}function je(t){return Rt(t)>0}function Or(t){const n=typeof t=="string"?Rt(t):t;return n>=40&&n<=66}function Gr(t){return(typeof t=="string"?Rt(t):t)<=39}function rn(t){return t<=66}function Lr(t){const n=typeof t=="string"?Rt(t):t;return sn(n)&&!rn(n)}function*Xr(){for(let t=1;t<=ht.length;t++)yield t}const qr=1,an=ht.length;function $r(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Se(t,n="***"){const r=t-1;return r<0||r>=ht.length?n:ht[r]}function on(t){return t<=0||t>an?"******":nn[t-1]}function Yr(t){return on(Rt(t))}function sn(t){const n=typeof t=="number"?Se(t):t;return je(n)&&!Ne.includes(n)}function Hr(t){const n=typeof t=="number"?Se(t):t;return je(n)&&Ne.includes(n)}function Kr(t){return nn[t-1].includes("*obsolete*")}function Ur(){const t={};for(let n=0;n<ht.length;n++)t[ht[n]]=n+1;return t}const V={allBookIds:ht,nonCanonicalIds:Ne,bookIdToNumber:Rt,isBookIdValid:je,isBookNT:Or,isBookOT:Gr,isBookOTNT:rn,isBookDC:Lr,allBookNumbers:Xr,firstBook:qr,lastBook:an,extraBooks:$r,bookNumberToId:Se,bookNumberToEnglishName:on,bookIdToEnglishName:Yr,isCanonical:sn,isExtraMaterial:Hr,isObsolete:Kr};var et=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(et||{});const J=class{constructor(n){if(C(this,"name"),C(this,"fullPath"),C(this,"isPresent"),C(this,"hasVerseSegments"),C(this,"isCustomized"),C(this,"baseVersification"),C(this,"scriptureBooks"),C(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=et[n]):(this._type=n,this.name=et[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};C(J,"Original",new J(et.Original)),C(J,"Septuagint",new J(et.Septuagint)),C(J,"Vulgate",new J(et.Vulgate)),C(J,"English",new J(et.English)),C(J,"RussianProtestant",new J(et.RussianProtestant)),C(J,"RussianOrthodox",new J(et.RussianOrthodox));let ut=J;function qe(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var wn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(wn||{});const H=class T{constructor(n,r,a,o){if(C(this,"firstChapter"),C(this,"lastChapter"),C(this,"lastVerse"),C(this,"hasSegmentsDefined"),C(this,"text"),C(this,"BBBCCCVVVS"),C(this,"longHashCode"),C(this,"versification"),C(this,"rtlMark","‏"),C(this,"_bookNum",0),C(this,"_chapterNum",0),C(this,"_verseNum",0),C(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const w=n,l=r!=null&&r instanceof ut?r:void 0;this.setEmpty(l),this.parse(w)}else if(n!=null&&typeof n=="number"){const w=r!=null&&r instanceof ut?r:void 0;this.setEmpty(w),this._verseNum=n%T.chapterDigitShifter,this._chapterNum=Math.floor(n%T.bookDigitShifter/T.chapterDigitShifter),this._bookNum=Math.floor(n/T.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof T){const w=n;this._bookNum=w.bookNum,this._chapterNum=w.chapterNum,this._verseNum=w.verseNum,this._verse=w.verse,this.versification=w.versification}else{if(n==null)return;const w=n instanceof ut?n:T.defaultVersification;this.setEmpty(w)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??T.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new T(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Et)return r=new T,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%T.bcvMaxValue*T.bookDigitShifter+(r>=0?r%T.bcvMaxValue*T.chapterDigitShifter:0)+(a>=0?a%T.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:w,versificationStr:l}=n,i=w||o.toString();let c;return l&&(c=new ut(l)),r?new T(r,a.toString(),i,c):new T}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>T.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(T.verseRangeSeparator)||this._verse.includes(T.verseSequenceIndicator))}get book(){return V.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=V.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=T.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=T.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>V.lastBook)throw new Et("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new ut(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(T.verseRangeSeparators,T.verseSequenceIndicators)}get BBBCCC(){return T.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return T.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const w=n.split("/");if(n=w[0],w.length>1)try{const l=+w[1].trim();this.versification=new ut(et[l])}catch{throw new Et("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Et("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||V.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!T.isVerseParseable(a[1]))throw new Et("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new T(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof T?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=T.verseRangeSeparators,a=T.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],w=qe(this._verse,a);for(const l of w.map(i=>qe(i,r))){const i=this.clone();i.verse=l[0];const c=i.verseNum;if(o.push(i),l.length>1){const p=this.clone();if(p.verse=l[1],!n)for(let m=c+1;m<p.verseNum;m++){const g=new T(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(g)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const w=o.internalValid;if(w!==0)return w;const l=o.BBBCCCVVV;if(a>l)return 3;if(a===l)return 4;a=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>V.lastBook?2:(V.isCanonical(this._bookNum),0)}setEmpty(n=T.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=V.bookIdToNumber(n),this.chapter=r,this.verse=a}};C(H,"defaultVersification",ut.English),C(H,"verseRangeSeparator","-"),C(H,"verseSequenceIndicator",","),C(H,"verseRangeSeparators",[H.verseRangeSeparator]),C(H,"verseSequenceIndicators",[H.verseSequenceIndicator]),C(H,"chapterDigitShifter",1e3),C(H,"bookDigitShifter",H.chapterDigitShifter*H.chapterDigitShifter),C(H,"bcvMaxValue",H.chapterDigitShifter-1),C(H,"ValidStatusType",wn);class Et extends Error{}const Jr=s.forwardRef(({bookId:t,handleSelectBook:n,isSelected:r,handleHighlightBook:a,handleKeyDown:o,bookType:w,children:l},i)=>e.jsxs(Zt,{ref:i,textValue:t,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[e.jsx("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":w.toLowerCase()==="ot","tw-border-s-purple-200":w.toLowerCase()==="nt","tw-border-s-indigo-200":w.toLowerCase()==="dc"}),children:V.bookIdToEnglishName(t)}),r&&e.jsx("div",{children:l})]},t));function Wr({handleSelectChapter:t,endChapter:n,activeChapter:r,highlightedChapter:a,handleHighlightedChapter:o}){const w=Array.from({length:n},(i,c)=>c+1),l=s.useCallback(i=>{o(i)},[o]);return e.jsx("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:w.map(i=>e.jsx("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":i===r,"tw-bg-amber-200":i===a}),onClick:c=>{c.preventDefault(),c.stopPropagation(),t(i)},role:"button",onKeyDown:c=>{c.key==="Enter"&&t(i)},tabIndex:0,onMouseMove:()=>l(i),children:i},i))})}const Ce=V.allBookIds.filter(t=>!V.isObsolete(V.bookIdToNumber(t))),Zr={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},$e=["OT","NT","DC"],Qr=96,ta=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],It=t=>y.getChaptersForBook(V.bookIdToNumber(t));function ea(){return Ce.map(n=>V.bookIdToEnglishName(n))}function na(t){return ea().includes(t)}function ra(t){const n=t.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(na(n))return Ce.find(a=>V.bookIdToEnglishName(a)===n)}function aa({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=L(),[w,l]=s.useState(""),[i,c]=s.useState(t.book),[p,m]=s.useState(t.chapterNum??0),[g,h]=s.useState(t.book),[u,f]=s.useState(!1),[b,v]=s.useState(u),S=s.useRef(void 0),x=s.useRef(void 0),M=s.useRef(void 0),F=s.useCallback(j=>{const z=a?a():Ce;return{OT:z.filter(B=>V.isBookOT(B)),NT:z.filter(B=>V.isBookNT(B)),DC:z.filter(B=>V.isBookDC(B))}[j].filter(B=>{const G=V.bookIdToEnglishName(B).toLowerCase(),O=w.replace(/[^a-zA-Z]/g,"").toLowerCase();return G.includes(O)||B.toLowerCase().includes(O)})},[w,a]),Q=j=>{l(j)},rt=s.useRef(!1),_t=s.useCallback(j=>{if(rt.current){rt.current=!1;return}f(j)},[]),N=s.useCallback((j,z,B,G)=>{if(m(t.book!==j?1:t.chapterNum),z||It(j)===-1){n({book:j,chapterNum:B??1,verseNum:G??1}),f(!1),l("");return}c(i!==j?j:""),f(!z)},[n,t.book,t.chapterNum,i]),_=j=>{j<=0||j>It(i)||N(i,!0,j)},Z=s.useCallback(()=>{ta.forEach(j=>{const z=j.exec(w);if(z){const[B,G=void 0,O=void 0]=z.slice(1),Mt=ra(B);(V.isBookIdValid(B)||Mt)&&N(Mt??B,!0,G?parseInt(G,10):1,O?parseInt(O,10):1)}}),S.current.blur()},[N,w]),A=s.useCallback(j=>{u?(j.key==="ArrowDown"||j.key==="ArrowUp")&&(M!=null&&M.current?M.current.focus():x.current&&x.current.focus(),j.preventDefault()):f(!0)},[u]),zt=j=>{const{key:z}=j;z==="ArrowRight"||z==="ArrowLeft"||z==="ArrowDown"||z==="ArrowUp"||z==="Enter"||S.current.dispatchEvent(new KeyboardEvent("keydown",{key:z}))},ct=j=>{const{key:z}=j;if(g===i){if(z==="Enter"){j.preventDefault(),N(i,!0,p);return}const B=z==="ArrowRight"&&!o||z==="ArrowRight"&&o==="ltr"||z==="ArrowLeft"&&o==="rtl",G=z==="ArrowLeft"&&!o||z==="ArrowLeft"&&o==="ltr"||z==="ArrowRight"&&o==="rtl";let O=0;if(B)if(p<It(g))O=1;else{j.preventDefault();return}else if(G)if(p>1)O=-1;else{j.preventDefault();return}else z==="ArrowDown"?O=6:z==="ArrowUp"&&(O=-6);p+O<=0||p+O>It(g)?m(0):O!==0&&(m(p+O),j.preventDefault())}};return s.useEffect(()=>{i===g?i===t.book?m(t.chapterNum):m(1):m(0)},[g,t.book,t.chapterNum,i]),s.useLayoutEffect(()=>{v(u)},[u]),s.useLayoutEffect(()=>{const j=setTimeout(()=>{if(b&&x.current&&M.current&&!w){const B=M.current.offsetTop-Qr;x.current.scrollTo({top:B,behavior:"instant"})}},10);return()=>{clearTimeout(j)}},[b,w]),e.jsx("div",{className:"pr-twp tw-flex tw-bg-transparent",children:e.jsxs(Gt,{modal:!1,open:u,onOpenChange:_t,children:[e.jsx(Wt,{asChild:!0,children:e.jsx(Br,{ref:S,value:w,handleSearch:Q,handleKeyDown:A,handleOnClick:()=>{c(t.book),h(t.book),m(t.chapterNum>0?t.chapterNum:0),f(!0),l(y.formatScrRef(t,"English")),S.current.focus()},onFocus:()=>{rt.current=!0},onBlur:()=>{l("")},handleSubmit:Z,placeholder:y.formatScrRef(t,"English"),className:r})}),e.jsx(St,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:zt,align:o==="ltr"?"start":"end",ref:x,children:e.jsx("div",{className:"rtl:tw-ps-2",children:$e.map((j,z)=>{const B=F(j);return B.length>0&&e.jsxs("div",{children:[e.jsx(Lt,{className:"tw-font-semibold tw-text-foreground/80",children:Zr[j]}),B.map(G=>e.jsx("div",{children:e.jsx(Jr,{bookId:G,handleSelectBook:()=>N(G,!1),isSelected:i===G,handleHighlightBook:()=>h(G),handleKeyDown:ct,bookType:j,ref:O=>{i===G&&(M.current=O)},children:e.jsx(Wr,{handleSelectChapter:_,endChapter:It(G),activeChapter:t.book===G?t.chapterNum:0,highlightedChapter:p,handleHighlightedChapter:O=>{m(O)}})})},G)),$e.length-1!==z?e.jsx(Ct,{}):void 0]},j)})})})]})})}const ln=xt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),E=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},w)=>{const l=a?Nt.Slot:"button";return e.jsx(l,{className:d(ln({variant:n,size:r,className:t})),ref:w,...o})});E.displayName="Button";const oa=xt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),X=s.forwardRef(({className:t,...n},r)=>e.jsx(Je.Root,{ref:r,className:d("pr-twp",oa(),t),...n}));X.displayName=Je.Root.displayName;const Re=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(At.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});Re.displayName=At.Root.displayName;const Ht=s.forwardRef(({className:t,...n},r)=>e.jsx(At.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(At.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ht.displayName=At.Item.displayName;const Te=Pt.Root,_e=Pt.Trigger,te=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const w=L();return e.jsx(Pt.Portal,{children:e.jsx(Pt.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:w})})});te.displayName=Pt.Content.displayName;const sa=nt.Portal,dn=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));dn.displayName=nt.Overlay.displayName;const ia=s.forwardRef(({className:t,children:n,...r},a)=>{const o=L();return e.jsxs(sa,{children:[e.jsx(dn,{}),e.jsxs(nt.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(nt.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(k.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});ia.displayName=nt.Content.displayName;const wa=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));wa.displayName=nt.Title.displayName;const la=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));la.displayName=nt.Description.displayName;const ze=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));ze.displayName=K.Command.displayName;const Me=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(K.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});Me.displayName=K.Command.Input.displayName;const Ee=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Ee.displayName=K.Command.List.displayName;const Ie=s.forwardRef((t,n)=>e.jsx(K.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ie.displayName=K.Command.Empty.displayName;const cn=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));cn.displayName=K.Command.Group.displayName;const da=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...n}));da.displayName=K.Command.Separator.displayName;const De=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));De.displayName=K.Command.Item.displayName;function ca(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Kt({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:w,onChange:l=()=>{},getOptionLabel:i=ca,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:g="No option found",buttonVariant:h="outline",alignDropDown:u="start",isDisabled:f=!1,...b}){const[v,S]=s.useState(!1);return e.jsxs(Te,{open:v,onOpenChange:S,...b,children:[e.jsx(_e,{asChild:!0,children:e.jsxs(E,{variant:h,role:"combobox","aria-expanded":v,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:f,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-pe-2",children:c}),e.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:w?i(w):p})]}),e.jsx(k.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(te,{align:u,className:d("tw-w-[200px] tw-p-0",o),children:e.jsxs(ze,{children:[e.jsx(Me,{placeholder:m,className:"tw-text-inherit"}),e.jsx(Ie,{children:g}),e.jsx(Ee,{children:n.map(x=>e.jsxs(De,{value:i(x),onSelect:()=>{l(x),S(!1)},children:[e.jsx(k.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!w||i(w)!==i(x)})}),i(x)]},i(x)))})]})})]})}function pn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:w}){const l=s.useMemo(()=>Array.from({length:w},(p,m)=>m+1),[w]),i=p=>{r(p),p>n&&a(p)},c=p=>{a(p),p<t&&r(p)};return e.jsxs(e.Fragment,{children:[e.jsx(X,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(Kt,{isDisabled:o,onChange:i,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:t},"start chapter"),e.jsx(X,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(Kt,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:n},"end chapter")]})}var un=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(un||{});const pa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),we=(t,n)=>t[n]??n;function ua({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:w,handleSelectEndChapter:l,startChapter:i,handleSelectStartChapter:c,localizedStrings:p}){const m=we(p,"%webView_bookSelector_currentBook%"),g=we(p,"%webView_bookSelector_choose%"),h=we(p,"%webView_bookSelector_chooseBooks%"),[u,f]=s.useState("current book"),b=v=>{f(v),t(v)};return e.jsx(Re,{className:"pr-twp tw-flex",value:u,onValueChange:v=>b(v),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Ht,{value:"current book"}),e.jsx(X,{className:"tw-ms-1",children:m})]}),e.jsx(X,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(pn,{isDisabled:u==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:l,chapterCount:o,startChapter:i,endChapter:w})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Ht,{value:"choose books"}),e.jsx(X,{className:"tw-ms-1",children:h})]}),e.jsx(X,{className:"tw-flex tw-items-center",children:a.map(v=>V.bookIdToEnglishName(v)).join(", ")}),e.jsx(E,{disabled:u==="current book",onClick:()=>r(),children:g})]})]})})}function ma({table:t}){return e.jsxs(Gt,{children:[e.jsx(Ke.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(E,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(St,{align:"end",className:"tw-w-[150px]",children:[e.jsx(Lt,{children:"Toggle columns"}),e.jsx(Ct,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Qt,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const gt=P.Root,mn=P.Group,ft=P.Value,lt=s.forwardRef(({className:t,children:n,...r},a)=>{const o=L();return e.jsxs(P.Trigger,{ref:a,className:d("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",t),...r,dir:o,children:[n,e.jsx(P.Icon,{asChild:!0,children:e.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});lt.displayName=P.Trigger.displayName;const Be=s.forwardRef(({className:t,...n},r)=>e.jsx(P.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Be.displayName=P.ScrollUpButton.displayName;const Ve=s.forwardRef(({className:t,...n},r)=>e.jsx(P.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Ve.displayName=P.ScrollDownButton.displayName;const dt=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const w=L();return e.jsx(P.Portal,{children:e.jsxs(P.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(Be,{}),e.jsx(P.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:w,children:n})}),e.jsx(Ve,{})]})})});dt.displayName=P.Content.displayName;const hn=s.forwardRef(({className:t,...n},r)=>e.jsx(P.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));hn.displayName=P.Label.displayName;const W=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(P.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(P.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(P.ItemText,{children:n})]}));W.displayName=P.Item.displayName;const gn=s.forwardRef(({className:t,...n},r)=>e.jsx(P.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));gn.displayName=P.Separator.displayName;function ha({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(gt,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(lt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(ft,{placeholder:t.getState().pagination.pageSize})}),e.jsx(dt,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(W,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const ga=`
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
<<<<<<< HEAD
  [tabindex]:not([tabindex="-1"]),
  [contenteditable]
`;function ca(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ge(t){return Array.from(t.querySelectorAll(da)).filter(n=>!n.hasAttribute("disabled")&&!n.getAttribute("aria-hidden")&&ca(n))}function pa(t){var n;return(n=t==null?void 0:t.parentElement)==null?void 0:n.tagName.toLowerCase()}const Pt=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm",t),...r})}));Pt.displayName="Table";const At=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));At.displayName="TableHeader";const Ot=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...n}));Ot.displayName="TableBody";const un=s.forwardRef(({className:t,...n},r)=>{const a=o=>{if(o.key==="Tab"&&o.shiftKey){const i=document.activeElement,l=i==null?void 0:i.closest("table");if(!l)return;const w=l.querySelector("tfoot");if(!(w!=null&&w.contains(i)))return;o.preventDefault();const c=l.querySelector('tbody tr[tabindex="0"]:last-of-type');c instanceof HTMLElement&&c.focus()}};return e.jsx("tfoot",{ref:r,tabIndex:-1,role:"presentation",onKeyDown:a,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n})});un.displayName="TableFooter";const nt=s.forwardRef(({className:t,onKeyDown:n,onSelect:r,...a},o)=>{const i=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(i.current):o&&"current"in o&&(o.current=i.current)},[o]);const l=(u,g)=>{var S;const h=u.closest("table"),m=g.indexOf(u);let b=!1;for(let f=m+1;f<g.length;f++){const x=g[f];if(!(h!=null&&h.contains(x))){x.focus(),b=!0;break}}b||(S=g[0])==null||S.focus()},w=(u,g,h)=>{let m;return h==="down"&&g<u.length-1?m=u[g+1]:h==="up"&&g>0&&(m=u[g-1]),m?(m.focus(),!0):!1},c=(u,g,h,m,b)=>{var x,k,T;const S=pa(g),f=g.closest("table");if(u.shiftKey){if(u.preventDefault(),S==="tfoot"){const A=f==null?void 0:f.querySelector('tbody tr[tabindex="0"]:last-of-type');A instanceof HTMLElement&&A.focus();return}if(S==="tbody"){const A=f==null?void 0:f.querySelector('thead tr[tabindex="0"]');A instanceof HTMLElement&&A.focus();return}return}if(S==="tbody"){if(u.preventDefault(),m===h.length-1||h.length===0){const A=(k=(x=g.parentElement)==null?void 0:x.parentElement)==null?void 0:k.querySelector('tfoot tr[tabindex="0"]');A?A.focus():l(g,b)}(T=h[m+1])==null||T.focus()}},p=u=>{const{current:g}=i;if(!g||!g.parentElement)return;const h=Array.from(g.parentElement.querySelectorAll('tr[tabindex="0"]')),m=h.indexOf(g),b=Ge(document.body),S=Ge(g),f=S.indexOf(document.activeElement);u.key==="Tab"?c(u,g,S,f,b):u.key==="ArrowDown"?w(h,m,"down")&&u.preventDefault():u.key==="ArrowUp"?w(h,m,"up")&&u.preventDefault():u.key==="Enter"&&r&&(u.preventDefault(),r(u)),n==null||n(u)};return e.jsx("tr",{ref:i,tabIndex:0,onKeyDown:p,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});nt.displayName="TableRow";const vt=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));vt.displayName="TableHead";const gt=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));gt.displayName="TableCell";const mn=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));mn.displayName="TableCaption";function hn({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{}}){var f;const[w,c]=s.useState([]),[p,u]=s.useState([]),[g,h]=s.useState({}),[m,b]=s.useState({}),S=q.useReactTable({data:n,columns:t,getCoreRowModel:q.getCoreRowModel(),...r&&{getPaginationRowModel:q.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:q.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:q.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:b,state:{sorting:w,columnFilters:p,columnVisibility:g,rowSelection:m}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(wa,{table:S}),e.jsxs(Pt,{stickyHeader:i,children:[e.jsx(At,{stickyHeader:i,children:S.getHeaderGroups().map(x=>e.jsx(nt,{children:x.headers.map(k=>e.jsx(vt,{children:k.isPlaceholder?void 0:q.flexRender(k.column.columnDef.header,k.getContext())},k.id))},x.id))}),e.jsx(Ot,{children:(f=S.getRowModel().rows)!=null&&f.length?S.getRowModel().rows.map(x=>e.jsx(nt,{onClick:()=>l(x,S),"data-state":x.getIsSelected()&&"selected",children:x.getVisibleCells().map(k=>e.jsx(gt,{children:q.flexRender(k.column.columnDef.cell,k.getContext())},k.id))},x.id)):e.jsx(nt,{children:e.jsx(gt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(E,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),e.jsx(E,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(la,{table:S})]})}const Ct=s.forwardRef(({className:t,...n},r)=>e.jsx(N.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...n,ref:r}));Ct.displayName="Spinner";function ua({isInstalling:t,handleClick:n,buttonText:r,className:a,...o}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t,"tw-bg-blue-600":!t,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!r,"tw-w-20":r},a),onClick:n,...o,children:t?e.jsx(Ct,{size:15}):e.jsxs(e.Fragment,{children:[e.jsx(N.Download,{size:25,className:d("tw-h-4 tw-w-4",{"tw-mr-1":r})}),r]})})}function ma({isEnabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function ha({isDisabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function ga({isUpdating:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function fa({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:e.jsx(gr,{options:o,children:n})})}const gn=s.forwardRef((t,n)=>e.jsxs(E,{ref:n,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...t,children:[e.jsx(N.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",e.jsx(N.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var fn=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(fn||{});function ba({id:t,groups:n}){return e.jsx("div",{id:t,children:e.jsxs(Bt,{children:[e.jsx(Ht,{asChild:!0,children:e.jsx(gn,{})}),e.jsx(kt,{children:n.map(r=>e.jsxs("div",{children:[e.jsx(Vt,{children:r.label}),e.jsx(me,{children:r.items.map(a=>e.jsx("div",{children:a.itemType===0?e.jsx(Yt,{onClick:a.onClick,children:a.label}):e.jsx(fe,{onClick:a.onClick,value:a.label,children:a.label})},a.label))}),e.jsx(jt,{})]},r.label))})]})})}function xa({id:t,message:n}){return e.jsx("div",{id:t,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:e.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:e.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:n})})})}function va({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o}){const i=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((w,c)=>w+c,0)),l=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[e.jsx(N.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:i})]}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center",children:a.slice(0,3).map(w=>e.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:w.toUpperCase()},w))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>l(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",a.length-3," more languages"]})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[e.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",e.jsx(N.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),e.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",e.jsx(N.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function bn({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function i(w){const c=new Date(w),p=new Date(o.getTime()-c.getTime()),u=p.getUTCFullYear()-1970,g=p.getUTCMonth(),h=p.getUTCDate()-1;let m="";return u>0?m=`${u.toString()} year${u===1?"":"s"} ago`:g>0?m=`${g.toString()} month${g===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const l=Object.entries(n).sort((w,c)=>c[0].localeCompare(w[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(r?l:l.slice(0,5)).map(w=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-gray-600",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:w[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",w[0]]}),e.jsx("div",{children:i(w[1].date)})]})]},w[0]))}),l.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-gray-500 tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function ya({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const i=s.useMemo(()=>y.formatBytes(r),[r]),w=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>p.of(u))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-pb-4 tw-pt-4",children:e.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[e.jsx(bn,{versionHistory:o}),e.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),e.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:i})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}const xn=ft.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Me=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:d("pr-twp",xn({variant:n}),t),...r}));Me.displayName="Badge";function vn({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i="No entries found",customSelectedText:l,isDisabled:w=!1,sortSelected:c=!1,icon:p=void 0,className:u=void 0}){const[g,h]=s.useState(!1),m=s.useCallback(f=>{var k;const x=(k=t.find(T=>T.label===f))==null?void 0:k.value;x&&a(r.includes(x)?r.filter(T=>T!==x):[...r,x])},[t,r,a]),b=()=>l||o,S=s.useMemo(()=>{if(!c)return t;const f=t.filter(k=>k.starred).sort((k,T)=>k.label.localeCompare(T.label)),x=t.filter(k=>!k.starred).sort((k,T)=>{const A=r.includes(k.value),U=r.includes(T.value);return A&&!U?-1:!A&&U?1:k.label.localeCompare(T.label)});return[...f,...x]},[t,r,c]);return e.jsx("div",{className:u,children:e.jsxs(ke,{open:g,onOpenChange:h,children:[e.jsx(je,{asChild:!0,children:e.jsxs(E,{variant:"ghost",role:"combobox","aria-expanded":g,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:w,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),e.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:b()})})]}),e.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Kt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(Se,{children:[e.jsx(Ce,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(Re,{children:[e.jsx(Te,{children:i}),e.jsx(sn,{children:S.map(f=>{const x=n?n(f):void 0;return e.jsxs(_e,{value:f.label,onSelect:m,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(N.Check,{className:d("tw-h-4 tw-w-4",r.includes(f.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:f.starred&&e.jsx(N.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:f.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:x})]},f.label)})})]})]})})]})})}function Na({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:u,badgesPlaceholder:g}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(vn,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:u}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(h=>{var m;return e.jsxs(Me,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(E,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(b=>b!==h)),children:e.jsx(N.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(b=>b.value===h))==null?void 0:m.label]},h)})}):e.jsx(L,{children:g})]})}function ka({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const l=[];return t.forEach(w=>{l.some(c=>y.deepEqual(c,w))||l.push(w)}),l},[t]);return e.jsxs(Pt,{stickyHeader:!0,children:[e.jsx(At,{stickyHeader:!0,children:e.jsxs(nt,{children:[e.jsx(vt,{children:a}),e.jsx(vt,{children:o})]})}),e.jsx(Ot,{children:i.length>0&&i.map(l=>e.jsxs(nt,{onClick:()=>{n(l.reference)},children:[e.jsx(gt,{children:`${O.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),e.jsx(gt,{children:l.text})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const Ut=s.forwardRef(({className:t,...n},r)=>e.jsx(we.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(we.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}));Ut.displayName=we.Root.displayName;const yn=ft.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ja=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(Ye.Root,{ref:o,className:d(yn({variant:n,size:r,className:t})),...a}));ja.displayName=Ye.Root.displayName;const Nn=s.createContext({size:"default",variant:"default"}),Ee=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},i)=>{const l=G();return e.jsx(qt.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:l,children:e.jsx(Nn.Provider,{value:{variant:n,size:r},children:a})})});Ee.displayName=qt.Root.displayName;const It=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},i)=>{const l=s.useContext(Nn);return e.jsx(qt.Item,{ref:i,className:d(yn({variant:l.variant||r,size:l.size||a}),t),...o,children:n})});It.displayName=qt.Item.displayName;const Jt=t=>t==="asc"?e.jsx(N.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(N.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(N.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Sa=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Jt(n.getIsSorted())]})}),Ca=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(E,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Jt(r.getIsSorted())]})}),Ra=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Jt(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),oe=(t,n,r,a,o,i)=>{let l=[...r];t.forEach(c=>{n==="approved"?l.includes(c)||l.push(c):l=l.filter(p=>p!==c)}),a(l);let w=[...o];t.forEach(c=>{n==="unapproved"?w.includes(c)||w.push(c):w=w.filter(p=>p!==c)}),i(w)},Ta=(t,n,r,a,o)=>({accessorKey:"status",header:({column:i})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(E,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Jt(i.getIsSorted())]})}),cell:({row:i})=>{const l=i.getValue("status"),w=i.getValue("item");return e.jsxs(Ee,{value:l,variant:"outline",type:"single",children:[e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"approved",n,r,a,o)},value:"approved",children:e.jsx(N.CircleCheckIcon,{})}),e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(N.CircleXIcon,{})}),e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(N.CircleHelpIcon,{})})]})}}),_a=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),za=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},Ia=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},kn=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",Ma=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Ea=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Da=(t,n,r)=>{const a=[];return t.forEach(o=>{const i=a.find(l=>y.deepEqual(l.items,y.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const l={items:y.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:kn(y.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(l)}}),a},at=(t,n)=>t[n]??n;function Ba({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:i,scope:l,onScopeChange:w,columns:c}){const p=at(r,"%webView_inventory_all%"),u=at(r,"%webView_inventory_approved%"),g=at(r,"%webView_inventory_unapproved%"),h=at(r,"%webView_inventory_unknown%"),m=at(r,"%webView_inventory_scope_currentBook%"),b=at(r,"%webView_inventory_scope_chapter%"),S=at(r,"%webView_inventory_filter_text%"),f=at(r,"%webView_inventory_show_additional_items%"),[x,k]=s.useState(!1),[T,A]=s.useState("all"),[U,wt]=s.useState(""),[lt,j]=s.useState([]),_=s.useMemo(()=>t.length===0?[]:Da(t,o,i),[t,o,i]),H=s.useMemo(()=>{if(x)return _;const v=[];return _.forEach(z=>{const Z=z.items[0],dt=v.find(xt=>xt.items[0]===Z);dt?(dt.count+=z.count,dt.occurrences=dt.occurrences.concat(z.occurrences)):v.push({items:[Z],count:z.count,occurrences:z.occurrences,status:z.status})}),v},[x,_]),V=s.useMemo(()=>Ea(H,T,U),[H,T,U]),ne=s.useMemo(()=>{var Z,dt;if(!x)return c;const v=(Z=a==null?void 0:a.tableHeaders)==null?void 0:Z.length;if(!v)return c;const z=[];for(let xt=0;xt<v;xt++)z.push(Ca(((dt=a==null?void 0:a.tableHeaders)==null?void 0:dt[xt])||"Additional Item",xt+1));return[...z,...c]},[a==null?void 0:a.tableHeaders,c,x]);s.useEffect(()=>{V.length===0?j([]):V.length===1&&j(V[0].items)},[V]);const re=(v,z)=>{z.setRowSelection(()=>{const Z={};return Z[v.index]=!0,Z}),j(v.original.items)},C=v=>{if(v==="book"||v==="chapter")w(v);else throw new Error(`Invalid scope value: ${v}`)},M=v=>{if(v==="all"||v==="approved"||v==="unapproved"||v==="unknown")A(v);else throw new Error(`Invalid status filter value: ${v}`)},P=s.useMemo(()=>{if(H.length===0||lt.length===0)return[];const v=H.filter(z=>y.deepEqual(x?z.items:[z.items[0]],lt));if(v.length>1)throw new Error("Selected item is not unique");return v.length===0?[]:v[0].occurrences},[lt,x,H]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(mt,{onValueChange:v=>M(v),defaultValue:T,children:[e.jsx(st,{className:"tw-m-1",children:e.jsx(ht,{placeholder:"Select filter"})}),e.jsxs(it,{children:[e.jsx(W,{value:"all",children:p}),e.jsx(W,{value:"approved",children:u}),e.jsx(W,{value:"unapproved",children:g}),e.jsx(W,{value:"unknown",children:h})]})]}),e.jsxs(mt,{onValueChange:v=>C(v),defaultValue:l,children:[e.jsx(st,{className:"tw-m-1",children:e.jsx(ht,{placeholder:"Select scope"})}),e.jsxs(it,{children:[e.jsx(W,{value:"book",children:m}),e.jsx(W,{value:"chapter",children:b})]})]}),e.jsx(bt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:U,onChange:v=>{wt(v.target.value)}}),a&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ut,{className:"tw-m-1",checked:x,onCheckedChange:v=>{k(v)}}),e.jsx(L,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??f})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(hn,{columns:ne,data:V,onRowClickHandler:re,stickyHeader:!0})}),P.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ka,{occurrenceData:P,setScriptureReference:n,localizedStrings:r})})]})}const Wt=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(Ke.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));Wt.displayName=Ke.Root.displayName;function Le({className:t,...n}){return e.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const Zt=Dt.Provider,Qt=Dt.Root,te=Dt.Trigger,Ft=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(Dt.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));Ft.displayName=Dt.Content.displayName;const Va="16rem",Pa="3rem",jn=s.createContext(void 0);function ee(){const t=s.useContext(jn);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Sn=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:i,side:l="primary",...w},c)=>{const[p,u]=s.useState(t),g=n??p,h=s.useCallback(T=>{const A=typeof T=="function"?T(g):T;r?r(A):u(A)},[r,g]),m=s.useCallback(()=>h(T=>!T),[h]),b=g?"expanded":"collapsed",x=G()==="ltr"?l:l==="primary"?"secondary":"primary",k=s.useMemo(()=>({state:b,open:g,setOpen:h,toggleSidebar:m,side:x}),[b,g,h,m,x]);return e.jsx(jn.Provider,{value:k,children:e.jsx(Zt,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Va,"--sidebar-width-icon":Pa,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...w,children:i})})})});Sn.displayName="SidebarProvider";const Cn=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},i)=>{const l=ee();return n==="none"?e.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...o,children:a}):e.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":t,"data-side":l.side,children:[e.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});Cn.displayName="Sidebar";const Aa=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=ee();return e.jsxs(E,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{n==null||n(i),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(N.PanelLeft,{}):e.jsx(N.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Aa.displayName="SidebarTrigger";const Oa=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=ee();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});Oa.displayName="SidebarRail";const Rn=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));Rn.displayName="SidebarInset";const Fa=s.forwardRef(({className:t,...n},r)=>e.jsx(bt,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));Fa.displayName="SidebarInput";const Ga=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Ga.displayName="SidebarHeader";const La=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));La.displayName="SidebarFooter";const Xa=s.forwardRef(({className:t,...n},r)=>e.jsx(Wt,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));Xa.displayName="SidebarSeparator";const Tn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));Tn.displayName="SidebarContent";const de=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));de.displayName="SidebarGroup";const ce=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?yt.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ce.displayName="SidebarGroupLabel";const qa=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?yt.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});qa.displayName="SidebarGroupAction";const pe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...n}));pe.displayName="SidebarGroupContent";const _n=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));_n.displayName="SidebarMenu";const zn=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...n}));zn.displayName="SidebarMenuItem";const Ha=ft.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),In=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:i,...l},w)=>{const c=t?yt.Slot:"button",{state:p}=ee(),u=e.jsx(c,{ref:w,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(Ha({variant:r,size:a}),i),...l});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:u}),e.jsx(Ft,{side:"right",align:"center",hidden:p!=="collapsed",...o})]})):u});In.displayName="SidebarMenuButton";const $a=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const i=n?yt.Slot:"button";return e.jsx(i,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});$a.displayName="SidebarMenuAction";const Ya=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Ya.displayName="SidebarMenuBadge";const Ka=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Le,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Le,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Ka.displayName="SidebarMenuSkeleton";const Ua=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Ua.displayName="SidebarMenuSub";const Ja=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Ja.displayName="SidebarMenuSubItem";const Wa=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},i)=>{const l=t?yt.Slot:"a";return e.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});Wa.displayName="SidebarMenuSubButton";function Mn({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:w,className:c}){const p=s.useCallback((h,m)=>{a(h,m)},[a]),u=s.useCallback(h=>{const m=r.find(b=>b.projectId===h);return m?m.projectName:h},[r]),g=s.useCallback(h=>!o.projectId&&h===o.label,[o]);return e.jsx(Cn,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:e.jsxs(Tn,{children:[e.jsxs(de,{children:[e.jsx(ce,{className:"tw-text-sm",children:i}),e.jsx(pe,{children:e.jsx(_n,{children:Object.entries(n).map(([h,m])=>e.jsx(zn,{children:e.jsx(In,{onClick:()=>p(h),isActive:g(h),children:e.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),e.jsxs(de,{children:[e.jsx(ce,{className:"tw-text-sm",children:l}),e.jsx(pe,{className:"tw-pl-3",children:e.jsx(Lt,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:h=>u(h),buttonPlaceholder:w,onChange:h=>{const m=u(h);p(m,h)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(N.ScrollText,{})})})]})]})})}function De({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o}){const i=G();return e.jsxs("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[e.jsx(N.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":i==="rtl"},{"tw-left-3":i==="ltr"})}),e.jsx(bt,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:l=>n(l.target.value)}),t&&e.jsxs(E,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":i==="rtl"},{"tw-right-0":i==="ltr"}),onClick:()=>{n("")},children:[e.jsx(N.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}function Za({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:l,onSearch:w,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:u}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(De,{className:"tw-w-9/12",value:l,onSearch:w,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(Sn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(Mn,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:u}),e.jsx(Rn,{className:"tw-min-w-[215px]",children:a})]})]})}const ot="scrBook",Qa="scrRef",pt="source",to="details",eo="Scripture Reference",no="Scripture Book",En="Type",ro="Details";function ao(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:ot,header:(t==null?void 0:t.scriptureReferenceColumnName)??eo,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?O.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===ot?y.formatScrRef(o.start):void 0},getGroupingValue:a=>O.bookIdToNumber(a.start.book),sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>y.formatScrRef(a.start),id:Qa,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:y.formatScrRef(o.start)},sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:pt,header:r?(t==null?void 0:t.typeColumnName)??En:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:to,header:(t==null?void 0:t.detailsColumnName)??ro,cell:a=>a.getValue(),enableGrouping:!1}]}const oo=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${n}`:`${y.scrRefToBBBCCCVVV(t.start)}+${n}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},Xe=t=>`${oo({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function so({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:l,onRowSelected:w}){const[c,p]=s.useState([]),[u,g]=s.useState([{id:ot,desc:!1}]),[h,m]=s.useState({}),b=s.useMemo(()=>t.flatMap(j=>j.data.map(_=>({..._,source:j.source}))),[t]),S=s.useMemo(()=>ao({scriptureReferenceColumnName:a,typeColumnName:i,detailsColumnName:l},r),[a,i,l,r]);s.useEffect(()=>{c.includes(pt)?g([{id:pt,desc:!1},{id:ot,desc:!1}]):g([{id:ot,desc:!1}])},[c]);const f=q.useReactTable({data:b,columns:S,state:{grouping:c,sorting:u,rowSelection:h},onGroupingChange:p,onSortingChange:g,onRowSelectionChange:m,getExpandedRowModel:q.getExpandedRowModel(),getGroupedRowModel:q.getGroupedRowModel(),getCoreRowModel:q.getCoreRowModel(),getSortedRowModel:q.getSortedRowModel(),getRowId:Xe,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(w){const j=f.getSelectedRowModel().rowsById,_=Object.keys(j);if(_.length===1){const H=b.find(V=>Xe(V)===_[0])||void 0;H&&w(H)}}},[h,b,w,f]);const x=o??no,k=i??En,T=[{label:"No Grouping",value:[]},{label:`Group by ${x}`,value:[ot]},{label:`Group by ${k}`,value:[pt]},{label:`Group by ${x} and ${k}`,value:[ot,pt]},{label:`Group by ${k} and ${x}`,value:[pt,ot]}],A=j=>{p(JSON.parse(j))},U=(j,_)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(_)},wt=(j,_)=>j.getIsGrouped()?"":d("banded-row",_%2===0?"even":"odd"),lt=(j,_,H)=>{if(!((j==null?void 0:j.length)===0||_.depth<H.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(mt,{value:JSON.stringify(c),onValueChange:j=>{A(j)},children:[e.jsx(st,{className:"tw-mb-1 tw-mt-2",children:e.jsx(ht,{})}),e.jsx(it,{position:"item-aligned",children:e.jsx(dn,{children:T.map(j=>e.jsx(W,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),e.jsxs(Pt,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(At,{children:f.getHeaderGroups().map(j=>e.jsx(nt,{children:j.headers.filter(_=>_.column.columnDef.header).map(_=>e.jsx(vt,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:e.jsxs("div",{children:[_.column.getCanGroup()?e.jsx(E,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",q.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},j.id))}),e.jsx(Ot,{children:f.getRowModel().rows.map((j,_)=>{const H=G();return e.jsx(nt,{"data-state":j.getIsSelected()?"selected":"",className:d(wt(j,_)),onClick:V=>U(j,V),children:j.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==pt||!r)))return e.jsx(gt,{className:d(V.column.columnDef.id,"tw-p-[1px]",lt(c,j,V)),children:V.getIsGrouped()?e.jsxs(E,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&e.jsx(N.ChevronDown,{}),!j.getIsExpanded()&&(H==="ltr"?e.jsx(N.ChevronRight,{}):e.jsx(N.ChevronLeft,{}))," ",q.flexRender(V.column.columnDef.cell,V.getContext())," (",j.subRows.length,")"]}):q.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},j.id)})})]})]})}const se={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function io({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},className:o}){const i={...se,...Object.fromEntries(Object.entries(a).map(([w,c])=>[w,w===c&&w in se?se[w]:c]))},l=G();return e.jsxs(mt,{value:`${n}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[e.jsx(st,{className:d("pr-twp tw-w-auto",o),children:e.jsx(ht,{placeholder:i[y.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(it,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(w=>e.jsx(W,{value:`${w}`,children:i[y.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function wo({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function lo({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function co({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(Wt,{}):""]})}function Dn(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function Xt({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Bn=(t,n,r,a)=>r?Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>n.filter(w=>w.group===i).sort((w,c)=>w.order-c.order).map(w=>e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:"command"in w?e.jsxs($t,{onClick:()=>{a(w)},children:[w.iconPathBefore&&e.jsx(Xt,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&e.jsx(Xt,{icon:w.iconPathAfter,menuLabel:w.label})]},`dropdown-menu-item-${w.label}-${w.command}`):e.jsxs(Je,{children:[e.jsx(he,{children:w.label}),e.jsx(Ue,{children:e.jsx(ge,{children:Bn(t,n,Dn(t,w.id),a)})})]},`dropdown-menu-sub-${w.label}-${w.id}`)}),w.tooltip&&e.jsx(Ft,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`))):void 0;function po({commandHandler:t,menuData:n,tabLabel:r,icon:a,className:o,variant:i,id:l}){return e.jsxs(Bt,{variant:i,children:[e.jsx(Ht,{"aria-label":r,className:o,asChild:!0,id:l,children:e.jsx(E,{variant:"ghost",className:"tw-h-6 tw-p-1",children:a??e.jsx(N.MenuIcon,{})})}),e.jsx(kt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,c])=>typeof w=="boolean"||typeof c=="boolean"?0:w.order-c.order).map(([w],c,p)=>e.jsxs(s.Fragment,{children:[e.jsx(me,{children:e.jsx(Zt,{children:Bn(n.groups,n.items,w,t)})}),c<p.length-1&&e.jsx(jt,{})]},w))})]})}const Be=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsx(K.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});Be.displayName=K.List.displayName;const Ve=s.forwardRef(({className:t,...n},r)=>e.jsx(K.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Ve.displayName=K.List.displayName;const Vn=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Pe=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Pe.displayName=K.Content.displayName;function uo({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:i}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(De,{className:i,value:n,onSearch:r,placeholder:a})]}),e.jsxs(Be,{children:[e.jsx(Ve,{children:t.map(l=>e.jsx(Vn,{value:l.value,children:l.value},l.key))}),t.map(l=>e.jsx(Pe,{value:l.value,children:l.content},l.key))]})]})}function mo({...t}){return e.jsx(B.Menu,{...t})}function ho({...t}){return e.jsx(B.Sub,{"data-slot":"menubar-sub",...t})}const Pn=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx(ue.Provider,{value:o,children:e.jsx(B.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Pn.displayName=B.Root.displayName;const An=s.forwardRef(({className:t,...n},r)=>{const a=Q();return e.jsx(B.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",rt({variant:a.variant,className:t})),...n})});An.displayName=B.Trigger.displayName;const On=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=Q();return e.jsxs(B.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",rt({variant:i.variant,className:t}),t),...a,children:[r,e.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});On.displayName=B.SubTrigger.displayName;const Fn=s.forwardRef(({className:t,...n},r)=>{const a=Q();return e.jsx(B.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});Fn.displayName=B.SubContent.displayName;const Gn=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},i)=>{const l=Q();return e.jsx(B.Portal,{children:e.jsx(B.Content,{ref:i,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...o})})});Gn.displayName=B.Content.displayName;const Ln=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=Q();return e.jsx(B.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",rt({variant:o.variant,className:t}),t),...r})});Ln.displayName=B.Item.displayName;const go=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=Q();return e.jsxs(B.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",rt({variant:i.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});go.displayName=B.CheckboxItem.displayName;const fo=s.forwardRef(({className:t,children:n,...r},a)=>{const o=Q();return e.jsxs(B.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",rt({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});fo.displayName=B.RadioItem.displayName;const bo=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(B.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));bo.displayName=B.Label.displayName;const Xn=s.forwardRef(({className:t,...n},r)=>e.jsx(B.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Xn.displayName=B.Separator.displayName;const _t=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},qn=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return o.flatMap(([i],l)=>{const w=n.filter(p=>p.group===i).sort((p,u)=>p.order-u.order).map(p=>e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:"command"in p?e.jsxs(Ln,{onClick:()=>{a(p)},children:[p.iconPathBefore&&e.jsx(Xt,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0}),p.label,p.iconPathAfter&&e.jsx(Xt,{icon:p.iconPathAfter,menuLabel:p.label})]},`menubar-item-${p.label}-${p.command}`):e.jsxs(ho,{children:[e.jsx(On,{children:p.label}),e.jsx(Fn,{children:qn(t,n,Dn(t,p.id),a)})]},`menubar-sub-${p.label}-${p.id}`)}),p.tooltip&&e.jsx(Ft,{children:p.tooltip})]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`)),c=[...w];return w.length>0&&l<o.length-1&&c.push(e.jsx(Xn,{},`separator-${i}`)),c})};function xo({menuData:t,commandHandler:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),i=s.useRef(void 0),l=s.useRef(void 0),w=s.useRef(void 0),c=s.useRef(void 0),p=u=>{switch(u){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return w;case"platform.help":return c;default:return}};if(jr.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,g)=>{var b,S,f,x;u.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":_t(i,[h]);break;case"alt+p":(b=i.current)==null||b.focus(),_t(i,[h,m]);break;case"alt+l":(S=l.current)==null||S.focus(),_t(l,[h,m]);break;case"alt+n":(f=w.current)==null||f.focus(),_t(w,[h,m]);break;case"alt+h":(x=c.current)==null||x.focus(),_t(c,[h,m]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const u=new MutationObserver(m=>{m.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const S=b.target.getAttribute("data-state");r(S==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(m=>{u.observe(m,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return e.jsx(Pn,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,g])=>typeof u=="boolean"||typeof g=="boolean"?0:u.order-g.order).map(([u,g])=>e.jsxs(mo,{children:[e.jsx(An,{ref:p(u),children:typeof g=="object"&&"label"in g&&g.label}),e.jsx(Gn,{className:"tw-z-[250]",children:e.jsx(Zt,{children:qn(t.groups,t.items,u,n)})})]},u))})}function vo(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function yo({menuData:t,onOpenChange:n,commandHandler:r,className:a,id:o,children:i,appMenuAreaChildren:l,configAreaChildren:w,shouldUseAsAppDragArea:c,menubarVariant:p="default"}){const u=s.useRef(void 0);return e.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:u,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&e.jsx(xo,{menuData:t,onOpenChange:n,commandHandler:r,variant:p})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:w})})]})})}const No=(t,n)=>t[n]??n;function ko({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:l,className:w}){const c=No(l,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,u]=s.useState(!1),g=m=>{o&&o(m),a&&a([m,...r.filter(b=>b!==m)]),i&&r.find(b=>b===m)&&i([...r.filter(b=>b!==m)]),u(!1)},h=(m,b)=>{var f,x,k,T,A,U;const S=b!==m?((x=(f=t[m])==null?void 0:f.uiNames)==null?void 0:x[b])??((T=(k=t[m])==null?void 0:k.uiNames)==null?void 0:T.en):void 0;return S?`${(A=t[m])==null?void 0:A.autonym} (${S})`:(U=t[m])==null?void 0:U.autonym};return e.jsxs("div",{className:d("pr-twp tw-max-w-sm",w),children:[e.jsxs(mt,{name:"uiLanguage",value:n,onValueChange:g,open:p,onOpenChange:m=>u(m),children:[e.jsx(st,{children:e.jsx(ht,{})}),e.jsx(it,{className:"tw-z-[250]",children:Object.keys(t).map(m=>e.jsx(W,{value:m,children:h(m,n)},m))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(L,{className:"tw-ms-3",children:c}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(L,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(m=>h(m,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function jo({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(L,{children:n(t)}):r?e.jsx(L,{children:r(t)}):e.jsx(L,{children:t})}function So({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:i,createComplexLabel:l}){return e.jsx("div",{id:t,className:n,children:r.map(w=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Ut,{className:"tw-me-2 tw-align-middle",checked:a.includes(w),onCheckedChange:c=>o(w,c)}),e.jsx(jo,{item:w,createLabel:i,createComplexLabel:l})]},w))})}function Co({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:i,placeholder:l,isRequired:w=!1,className:c,defaultValue:p,value:u,onChange:g,onFocus:h,onBlur:m}){return e.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(L,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${w?"*":""}`}),e.jsx(bt,{id:t,disabled:n,placeholder:l,required:w,className:d(c,{"tw-border-red-600":r}),defaultValue:p,value:u,onChange:g,onFocus:h,onBlur:m}),e.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}const Ro=ft.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Hn=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:d(Ro({variant:n}),t),...r}));Hn.displayName="Alert";const $n=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));$n.displayName="AlertTitle";const Yn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Yn.displayName="AlertDescription";const Kn=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));Kn.displayName=Nt.Root.displayName;const Un=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Un.displayName=Nt.Image.displayName;const Jn=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));Jn.displayName=Nt.Fallback.displayName;const Wn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Wn.displayName="Card";const Zn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Zn.displayName="CardHeader";const Qn=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Qn.displayName="CardTitle";const tr=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));tr.displayName="CardDescription";const er=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...n}));er.displayName="CardContent";const nr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));nr.displayName="CardFooter";function To({...t}){return e.jsx(He.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const rr=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsxs(zt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(zt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(zt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(zt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});rr.displayName=zt.Root.displayName;const ar=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsx(le.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(le.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});ar.displayName=le.Root.displayName;const _o=K.Root,or=s.forwardRef(({className:t,...n},r)=>{const a=G();return e.jsx(K.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});or.displayName=K.List.displayName;const sr=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));sr.displayName=K.Trigger.displayName;const ir=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));ir.displayName=K.Content.displayName;const zo=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Io(t){return{preserveValue:!0,...t}}const wr=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=Io(o.current);const[i,l]=s.useState(()=>a.current),[w,c]=s.useState(!0);return s.useEffect(()=>{let p=!0;return c(!!t),(async()=>{if(t){const u=await t();p&&(l(()=>u),c(!1))}})(),()=>{p=!1,o.current.preserveValue||l(()=>a.current)}},[t]),[i,w]},ie=()=>!1,Mo=(t,n)=>{const[r]=wr(s.useCallback(async()=>{if(!t)return ie;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),ie,{preserveValue:!1});s.useEffect(()=>()=>{r!==ie&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>He.toast});exports.Alert=Hn;exports.AlertDescription=Yn;exports.AlertTitle=$n;exports.Avatar=Kn;exports.AvatarFallback=Jn;exports.AvatarImage=Un;exports.BOOK_SELECTOR_STRING_KEYS=sa;exports.Badge=Me;exports.BookChapterControl=Zr;exports.BookSelectionMode=ln;exports.BookSelector=ia;exports.Button=E;exports.Card=Wn;exports.CardContent=er;exports.CardDescription=tr;exports.CardFooter=nr;exports.CardHeader=Zn;exports.CardTitle=Qn;exports.ChapterRangeSelector=wn;exports.Checkbox=Ut;exports.Checklist=So;exports.ComboBox=Lt;exports.DataTable=hn;exports.DisableButton=ha;exports.DropdownMenu=Bt;exports.DropdownMenuCheckboxItem=Yt;exports.DropdownMenuContent=kt;exports.DropdownMenuGroup=me;exports.DropdownMenuItem=$t;exports.DropdownMenuItemType=fn;exports.DropdownMenuLabel=Vt;exports.DropdownMenuPortal=Ue;exports.DropdownMenuRadioGroup=Ir;exports.DropdownMenuRadioItem=fe;exports.DropdownMenuSeparator=jt;exports.DropdownMenuShortcut=We;exports.DropdownMenuSub=Je;exports.DropdownMenuSubContent=ge;exports.DropdownMenuSubTrigger=he;exports.DropdownMenuTrigger=Ht;exports.EnableButton=ma;exports.Filter=Na;exports.FilterButton=gn;exports.FilterDropdown=ba;exports.Footer=ya;exports.INVENTORY_STRING_KEYS=Ma;exports.Input=bt;exports.InstallButton=ua;exports.Inventory=Ba;exports.Label=L;exports.MarkdownRenderer=fa;exports.MoreInfo=va;exports.MultiSelectComboBox=vn;exports.NavigationContentSearch=uo;exports.NoExtensionsFound=xa;exports.Popover=ke;exports.PopoverContent=Kt;exports.PopoverTrigger=je;exports.RadioGroup=Ne;exports.RadioGroupItem=Gt;exports.ScriptureResultsViewer=so;exports.ScrollGroupSelector=io;exports.SearchBar=De;exports.Select=mt;exports.SelectContent=it;exports.SelectGroup=dn;exports.SelectItem=W;exports.SelectLabel=cn;exports.SelectScrollDownButton=Ie;exports.SelectScrollUpButton=ze;exports.SelectSeparator=pn;exports.SelectTrigger=st;exports.SelectValue=ht;exports.Separator=Wt;exports.SettingsList=wo;exports.SettingsListHeader=co;exports.SettingsListItem=lo;exports.SettingsSidebar=Mn;exports.SettingsSidebarContentSearch=Za;exports.Slider=rr;exports.Sonner=To;exports.Spinner=Ct;exports.Switch=ar;exports.TabDropdownMenu=po;exports.Table=Pt;exports.TableBody=Ot;exports.TableCaption=mn;exports.TableCell=gt;exports.TableFooter=un;exports.TableHead=vt;exports.TableHeader=At;exports.TableRow=nt;exports.Tabs=_o;exports.TabsContent=ir;exports.TabsList=or;exports.TabsTrigger=sr;exports.TextField=Co;exports.ToggleGroup=Ee;exports.ToggleGroupItem=It;exports.Toolbar=yo;exports.Tooltip=Qt;exports.TooltipContent=Ft;exports.TooltipProvider=Zt;exports.TooltipTrigger=te;exports.UiLanguageSelector=ko;exports.UpdateButton=ga;exports.VersionHistory=bn;exports.VerticalTabs=Be;exports.VerticalTabsContent=Pe;exports.VerticalTabsList=Ve;exports.VerticalTabsTrigger=Vn;exports.badgeVariants=xn;exports.buttonVariants=an;exports.cn=d;exports.getBookIdFromUSFM=Ia;exports.getLinesFromUSFM=_a;exports.getNumberFromUSFM=za;exports.getStatusForItem=kn;exports.getToolbarOSReservedSpaceClassName=vo;exports.inventoryCountColumn=Ra;exports.inventoryItemColumn=Sa;exports.inventoryStatusColumn=Ta;exports.useEvent=zo;exports.useEventAsync=Mo;exports.usePromise=wr;function Eo(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}Eo(`*, ::before, ::after {
=======
  [contenteditable],
  tr:not([disabled])
`;function fa(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ft(t){return Array.from(t.querySelectorAll(ga)).filter(n=>!n.hasAttribute("disabled")&&!n.getAttribute("aria-hidden")&&fa(n))}const Xt=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>{const o=s.useRef(null);s.useEffect(()=>{typeof a=="function"?a(o.current):a&&"current"in a&&(a.current=o.current)},[a]),s.useEffect(()=>{const l=o.current;if(!l)return;const i=()=>{Ft(l).forEach(m=>{m.setAttribute("tabindex","-1")})};i();const c=new MutationObserver(()=>{i()});return c.observe(l,{childList:!0,subtree:!0}),()=>{c.disconnect()}},[]);const w=l=>{const{current:i}=o;if(i){if(l.key==="ArrowDown"){l.preventDefault(),Ft(i)[0].focus();return}l.key===" "&&document.activeElement===i&&l.preventDefault()}};return e.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:w,ref:o,className:d("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Xt.displayName="Table";const qt=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));qt.displayName="TableHeader";const $t=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...n}));$t.displayName="TableBody";const fn=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));fn.displayName="TableFooter";function ba(t){s.useEffect(()=>{const n=t.current;if(!n)return;const r=a=>{if(n.contains(document.activeElement)){if(a.key==="ArrowRight"||a.key==="ArrowLeft"){a.preventDefault(),a.stopPropagation();const o=t.current?Ft(t.current):[],w=o.indexOf(document.activeElement),l=a.key==="ArrowRight"?w+1:w-1;l>=0&&l<o.length&&o[l].focus()}a.key==="Escape"&&(a.preventDefault(),n.focus()),(a.key==="ArrowDown"||a.key==="ArrowUp"||a.key==="Tab")&&a.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}const ot=s.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:a,...o},w)=>{const l=s.useRef(null);s.useEffect(()=>{typeof w=="function"?w(l.current):w&&"current"in w&&(w.current=l.current)},[w]),ba(l);const i=(h,u,f)=>{let b;return f==="ArrowDown"&&u<h.length-1?b=h[u+1]:f==="ArrowUp"&&u>0&&(b=h[u-1]),b?(requestAnimationFrame(()=>b.focus()),!0):!1},c=(h,u,f)=>{let b;return f==="ArrowLeft"&&u>0?b=h[u-1]:f==="ArrowRight"&&u<h.length-1&&(b=h[u+1]),b?(requestAnimationFrame(()=>b.focus()),!0):!1},p=s.useMemo(()=>l.current?Ft(l.current):[],[l]),m=h=>{const{current:u}=l;if(!u||!u.parentElement)return;const f=u.closest("table"),b=f?Ft(f).filter(x=>x.tagName==="TR"):[],v=b.indexOf(u),S=p.indexOf(document.activeElement);if(h.key==="ArrowDown"||h.key==="ArrowUp")h.preventDefault(),i(b,v,h.key);else if(h.key==="ArrowLeft"||h.key==="ArrowRight")h.preventDefault(),c(p,S,h.key);else if(h.key==="Escape"){h.preventDefault();const x=u.closest("table");x&&x.focus()}else if(h.key==="Tab"){h.preventDefault();return}n==null||n(h)},g=s.useCallback(h=>{a&&(r==null||r(h))},[a,r]);return e.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:m,onFocus:g,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});ot.displayName="TableRow";const kt=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));kt.displayName="TableHead";const bt=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));bt.displayName="TableCell";const bn=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));bn.displayName="TableCaption";function xn({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:w=!1,onRowClickHandler:l=()=>{}}){var v;const[i,c]=s.useState([]),[p,m]=s.useState([]),[g,h]=s.useState({}),[u,f]=s.useState({}),b=$.useReactTable({data:n,columns:t,getCoreRowModel:$.getCoreRowModel(),...r&&{getPaginationRowModel:$.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:$.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:$.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:f,state:{sorting:i,columnFilters:p,columnVisibility:g,rowSelection:u}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(ma,{table:b}),e.jsxs(Xt,{stickyHeader:w,children:[e.jsx(qt,{stickyHeader:w,children:b.getHeaderGroups().map(S=>e.jsx(ot,{children:S.headers.map(x=>e.jsx(kt,{children:x.isPlaceholder?void 0:$.flexRender(x.column.columnDef.header,x.getContext())},x.id))},S.id))}),e.jsx($t,{children:(v=b.getRowModel().rows)!=null&&v.length?b.getRowModel().rows.map(S=>e.jsx(ot,{onClick:()=>l(S,b),"data-state":S.getIsSelected()&&"selected",children:S.getVisibleCells().map(x=>e.jsx(bt,{children:$.flexRender(x.column.columnDef.cell,x.getContext())},x.id))},S.id)):e.jsx(ot,{children:e.jsx(bt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(E,{variant:"outline",size:"sm",onClick:()=>b.previousPage(),disabled:!b.getCanPreviousPage(),children:"Previous"}),e.jsx(E,{variant:"outline",size:"sm",onClick:()=>b.nextPage(),disabled:!b.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(ha,{table:b})]})}const Tt=s.forwardRef(({className:t,...n},r)=>e.jsx(k.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...n,ref:r}));Tt.displayName="Spinner";function xa({isInstalling:t,handleClick:n,buttonText:r,className:a,...o}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t,"tw-bg-blue-600":!t,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!r,"tw-w-20":r},a),onClick:n,...o,children:t?e.jsx(Tt,{size:15}):e.jsxs(e.Fragment,{children:[e.jsx(k.Download,{size:25,className:d("tw-h-4 tw-w-4",{"tw-mr-1":r})}),r]})})}function va({isEnabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Tt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function ya({isDisabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Tt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function ka({isUpdating:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Tt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function Na({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:e.jsx(kr,{options:o,children:n})})}const vn=s.forwardRef((t,n)=>e.jsxs(E,{ref:n,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...t,children:[e.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",e.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var yn=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(yn||{});function ja({id:t,groups:n}){return e.jsx("div",{id:t,children:e.jsxs(Gt,{children:[e.jsx(Wt,{asChild:!0,children:e.jsx(vn,{})}),e.jsx(St,{children:n.map(r=>e.jsxs("div",{children:[e.jsx(Lt,{children:r.label}),e.jsx(xe,{children:r.items.map(a=>e.jsx("div",{children:a.itemType===0?e.jsx(Qt,{onClick:a.onClick,children:a.label}):e.jsx(ke,{onClick:a.onClick,value:a.label,children:a.label})},a.label))}),e.jsx(Ct,{})]},r.label))})]})})}function Sa({id:t,message:n}){return e.jsx("div",{id:t,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:e.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:e.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:n})})})}function Ca({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((i,c)=>i+c,0)),l=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[e.jsx(k.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:w})]}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center",children:a.slice(0,3).map(i=>e.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:i.toUpperCase()},i))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>l(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",a.length-3," more languages"]})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[e.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",e.jsx(k.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),e.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",e.jsx(k.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function kn({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function w(i){const c=new Date(i),p=new Date(o.getTime()-c.getTime()),m=p.getUTCFullYear()-1970,g=p.getUTCMonth(),h=p.getUTCDate()-1;let u="";return m>0?u=`${m.toString()} year${m===1?"":"s"} ago`:g>0?u=`${g.toString()} month${g===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(n).sort((i,c)=>c[0].localeCompare(i[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(r?l:l.slice(0,5)).map(i=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-gray-600",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:i[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",i[0]]}),e.jsx("div",{children:w(i[1].date)})]})]},i[0]))}),l.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-gray-500 tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ra({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const w=s.useMemo(()=>y.formatBytes(r),[r]),i=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(m=>p.of(m))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-pb-4 tw-pt-4",children:e.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[e.jsx(kn,{versionHistory:o}),e.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),e.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:w})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:i.join(", ")})]})})]})]})]})})}const Nn=xt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Ae=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:d("pr-twp",Nn({variant:n}),t),...r}));Ae.displayName="Badge";function jn({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w="No entries found",customSelectedText:l,isDisabled:i=!1,sortSelected:c=!1,icon:p=void 0,className:m=void 0}){const[g,h]=s.useState(!1),u=s.useCallback(v=>{var x;const S=(x=t.find(M=>M.label===v))==null?void 0:x.value;S&&a(r.includes(S)?r.filter(M=>M!==S):[...r,S])},[t,r,a]),f=()=>l||o,b=s.useMemo(()=>{if(!c)return t;const v=t.filter(x=>x.starred).sort((x,M)=>x.label.localeCompare(M.label)),S=t.filter(x=>!x.starred).sort((x,M)=>{const F=r.includes(x.value),Q=r.includes(M.value);return F&&!Q?-1:!F&&Q?1:x.label.localeCompare(M.label)});return[...v,...S]},[t,r,c]);return e.jsx("div",{className:m,children:e.jsxs(Te,{open:g,onOpenChange:h,children:[e.jsx(_e,{asChild:!0,children:e.jsxs(E,{variant:"ghost",role:"combobox","aria-expanded":g,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:i,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),e.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:f()})})]}),e.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(te,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(ze,{children:[e.jsx(Me,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(Ee,{children:[e.jsx(Ie,{children:w}),e.jsx(cn,{children:b.map(v=>{const S=n?n(v):void 0;return e.jsxs(De,{value:v.label,onSelect:u,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(k.Check,{className:d("tw-h-4 tw-w-4",r.includes(v.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:v.starred&&e.jsx(k.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:v.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:S})]},v.label)})})]})]})})]})})}function Ta({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w,customSelectedText:l,isDisabled:i,sortSelected:c,icon:p,className:m,badgesPlaceholder:g}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(jn,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w,customSelectedText:l,isDisabled:i,sortSelected:c,icon:p,className:m}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(h=>{var u;return e.jsxs(Ae,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(E,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(f=>f!==h)),children:e.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(f=>f.value===h))==null?void 0:u.label]},h)})}):e.jsx(X,{children:g})]})}function _a({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],w=s.useMemo(()=>{const l=[];return t.forEach(i=>{l.some(c=>y.deepEqual(c,i))||l.push(i)}),l},[t]);return e.jsxs(Xt,{stickyHeader:!0,children:[e.jsx(qt,{stickyHeader:!0,children:e.jsxs(ot,{children:[e.jsx(kt,{children:a}),e.jsx(kt,{children:o})]})}),e.jsx($t,{children:w.length>0&&w.map(l=>e.jsxs(ot,{onClick:()=>{n(l.reference)},children:[e.jsx(bt,{children:`${V.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),e.jsx(bt,{children:l.text})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const ee=s.forwardRef(({className:t,...n},r)=>e.jsx(pe.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(pe.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));ee.displayName=pe.Root.displayName;const Sn=xt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),za=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(We.Root,{ref:o,className:d(Sn({variant:n,size:r,className:t})),...a}));za.displayName=We.Root.displayName;const Cn=s.createContext({size:"default",variant:"default"}),Pe=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},w)=>{const l=L();return e.jsx(Jt.Root,{ref:w,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:l,children:e.jsx(Cn.Provider,{value:{variant:n,size:r},children:a})})});Pe.displayName=Jt.Root.displayName;const Vt=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},w)=>{const l=s.useContext(Cn);return e.jsx(Jt.Item,{ref:w,className:d(Sn({variant:l.variant||r,size:l.size||a}),t),...o,children:n})});Vt.displayName=Jt.Item.displayName;const ne=t=>t==="asc"?e.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ma=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,ne(n.getIsSorted())]})}),Ea=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(E,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,ne(r.getIsSorted())]})}),Ia=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,ne(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),le=(t,n,r,a,o,w)=>{let l=[...r];t.forEach(c=>{n==="approved"?l.includes(c)||l.push(c):l=l.filter(p=>p!==c)}),a(l);let i=[...o];t.forEach(c=>{n==="unapproved"?i.includes(c)||i.push(c):i=i.filter(p=>p!==c)}),w(i)},Da=(t,n,r,a,o)=>({accessorKey:"status",header:({column:w})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(E,{variant:"ghost",onClick:()=>w.toggleSorting(void 0),children:[t,ne(w.getIsSorted())]})}),cell:({row:w})=>{const l=w.getValue("status"),i=w.getValue("item");return e.jsxs("div",{className:"tw-flex tw-justify-center",children:[e.jsxs(Pe,{value:l,variant:"outline",type:"single",children:[e.jsx(Vt,{onClick:c=>{c.stopPropagation(),le([i],"approved",n,r,a,o)},value:"approved",children:e.jsx(k.CircleCheckIcon,{})}),e.jsx(Vt,{onClick:c=>{c.stopPropagation(),le([i],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(k.CircleXIcon,{})}),e.jsx(Vt,{onClick:c=>{c.stopPropagation(),le([i],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(k.CircleHelpIcon,{})})]}),e.jsx(E,{variant:"ghost",children:"Hello World"})]})}}),Rn=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),me=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},Tn=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},_n=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",Ba=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Va=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Aa=(t,n,r,a,o)=>{if(!t)return[];const w=[];let l=n.book,i=n.chapterNum,c=n.verseNum;return Rn(t).forEach(m=>{m.startsWith("\\id")&&(l=Tn(m),i=0,c=0),m.startsWith("\\c")&&(i=me(m),c=0),m.startsWith("\\v")&&(c=me(m),i===0&&(i=n.chapterNum));let g=o.exec(m)??void 0;for(;g;){const h=[];g.forEach(v=>h.push(v));const u=g.index,f=w.find(v=>y.deepEqual(v.items,h)),b={reference:{book:l!==void 0?l:"",chapterNum:i!==void 0?i:-1,verseNum:c!==void 0?c:-1},text:y.substring(m,Math.max(0,u-25),Math.min(u+25,m.length))};if(f)f.count+=1,f.occurrences.push(b);else{const v={items:h,count:1,status:_n(h[0],r,a),occurrences:[b]};w.push(v)}g=o.exec(m)??void 0}}),w},at=(t,n)=>t[n]??n;function Pa({verseRef:t,setVerseRef:n,localizedStrings:r,extractItems:a,additionalItemsLabels:o,approvedItems:w,unapprovedItems:l,text:i,scope:c,onScopeChange:p,columns:m}){const g=at(r,"%webView_inventory_all%"),h=at(r,"%webView_inventory_approved%"),u=at(r,"%webView_inventory_unapproved%"),f=at(r,"%webView_inventory_unknown%"),b=at(r,"%webView_inventory_scope_currentBook%"),v=at(r,"%webView_inventory_scope_chapter%"),S=at(r,"%webView_inventory_scope_verse%"),x=at(r,"%webView_inventory_filter_text%"),M=at(r,"%webView_inventory_show_additional_items%"),[F,Q]=s.useState(!1),[rt,_t]=s.useState("all"),[N,_]=s.useState(""),[Z,A]=s.useState([]),zt=s.useMemo(()=>i?a instanceof RegExp?Aa(i,t,w,l,a):a(i,t,w,l):[],[i,a,t,w,l]),ct=s.useMemo(()=>{if(F)return zt;const R=[];return zt.forEach(Y=>{const it=Y.items[0],pt=R.find(yt=>yt.items[0]===it);pt?(pt.count+=Y.count,pt.occurrences=pt.occurrences.concat(Y.occurrences)):R.push({items:[it],count:Y.count,occurrences:Y.occurrences,status:Y.status})}),R},[F,zt]),j=s.useMemo(()=>Va(ct,rt,N),[ct,rt,N]),z=s.useMemo(()=>{var it,pt;if(!F)return m;const R=(it=o==null?void 0:o.tableHeaders)==null?void 0:it.length;if(!R)return m;const Y=[];for(let yt=0;yt<R;yt++)Y.push(Ea(((pt=o==null?void 0:o.tableHeaders)==null?void 0:pt[yt])||"Additional Item",yt+1));return[...Y,...m]},[o==null?void 0:o.tableHeaders,m,F]);s.useEffect(()=>{j.length===0?A([]):j.length===1&&A(j[0].items)},[j]);const B=(R,Y)=>{Y.setRowSelection(()=>{const it={};return it[R.index]=!0,it}),A(R.original.items)},G=R=>{if(R==="book"||R==="chapter"||R==="verse")p(R);else throw new Error(`Invalid scope value: ${R}`)},O=R=>{if(R==="all"||R==="approved"||R==="unapproved"||R==="unknown")_t(R);else throw new Error(`Invalid status filter value: ${R}`)},Mt=s.useMemo(()=>{if(ct.length===0||Z.length===0)return[];const R=ct.filter(Y=>y.deepEqual(F?Y.items:[Y.items[0]],Z));if(R.length>1)throw new Error("Selected item is not unique");return R.length===0?[]:R[0].occurrences},[Z,F,ct]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(gt,{onValueChange:R=>O(R),defaultValue:rt,children:[e.jsx(lt,{className:"tw-m-1",children:e.jsx(ft,{placeholder:"Select filter"})}),e.jsxs(dt,{children:[e.jsx(W,{value:"all",children:g}),e.jsx(W,{value:"approved",children:h}),e.jsx(W,{value:"unapproved",children:u}),e.jsx(W,{value:"unknown",children:f})]})]}),e.jsxs(gt,{onValueChange:R=>G(R),defaultValue:c,children:[e.jsx(lt,{className:"tw-m-1",children:e.jsx(ft,{placeholder:"Select scope"})}),e.jsxs(dt,{children:[e.jsx(W,{value:"book",children:b}),e.jsx(W,{value:"chapter",children:v}),e.jsx(W,{value:"verse",children:S})]})]}),e.jsx(vt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:x,value:N,onChange:R=>{_(R.target.value)}}),o&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(ee,{className:"tw-m-1",checked:F,onCheckedChange:R=>{Q(R)}}),e.jsx(X,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??M})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(xn,{columns:z,data:j,onRowClickHandler:B,stickyHeader:!0})}),Mt.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(_a,{occurrenceData:Mt,setScriptureReference:n,localizedStrings:r})})]})}const re=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(Ze.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));re.displayName=Ze.Root.displayName;function Ye({className:t,...n}){return e.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const ae=Ot.Provider,oe=Ot.Root,se=Ot.Trigger,Yt=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(Ot.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));Yt.displayName=Ot.Content.displayName;const Fa="16rem",Oa="3rem",zn=s.createContext(void 0);function ie(){const t=s.useContext(zn);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Mn=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:w,side:l="primary",...i},c)=>{const[p,m]=s.useState(t),g=n??p,h=s.useCallback(M=>{const F=typeof M=="function"?M(g):M;r?r(F):m(F)},[r,g]),u=s.useCallback(()=>h(M=>!M),[h]),f=g?"expanded":"collapsed",S=L()==="ltr"?l:l==="primary"?"secondary":"primary",x=s.useMemo(()=>({state:f,open:g,setOpen:h,toggleSidebar:u,side:S}),[f,g,h,u,S]);return e.jsx(zn.Provider,{value:x,children:e.jsx(ae,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Fa,"--sidebar-width-icon":Oa,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...i,children:w})})})});Mn.displayName="SidebarProvider";const En=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},w)=>{const l=ie();return n==="none"?e.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:w,...o,children:a}):e.jsxs("div",{ref:w,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":t,"data-side":l.side,children:[e.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});En.displayName="Sidebar";const Ga=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=ie();return e.jsxs(E,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:w=>{n==null||n(w),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(k.PanelLeft,{}):e.jsx(k.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ga.displayName="SidebarTrigger";const La=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=ie();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});La.displayName="SidebarRail";const In=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));In.displayName="SidebarInset";const Xa=s.forwardRef(({className:t,...n},r)=>e.jsx(vt,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));Xa.displayName="SidebarInput";const qa=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));qa.displayName="SidebarHeader";const $a=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));$a.displayName="SidebarFooter";const Ya=s.forwardRef(({className:t,...n},r)=>e.jsx(re,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));Ya.displayName="SidebarSeparator";const Dn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));Dn.displayName="SidebarContent";const he=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));he.displayName="SidebarGroup";const ge=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Nt.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ge.displayName="SidebarGroupLabel";const Ha=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Nt.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ha.displayName="SidebarGroupAction";const fe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...n}));fe.displayName="SidebarGroupContent";const Bn=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));Bn.displayName="SidebarMenu";const Vn=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...n}));Vn.displayName="SidebarMenuItem";const Ka=xt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),An=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:w,...l},i)=>{const c=t?Nt.Slot:"button",{state:p}=ie(),m=e.jsx(c,{ref:i,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(Ka({variant:r,size:a}),w),...l});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(oe,{children:[e.jsx(se,{asChild:!0,children:m}),e.jsx(Yt,{side:"right",align:"center",hidden:p!=="collapsed",...o})]})):m});An.displayName="SidebarMenuButton";const Ua=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const w=n?Nt.Slot:"button";return e.jsx(w,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});Ua.displayName="SidebarMenuAction";const Ja=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Ja.displayName="SidebarMenuBadge";const Wa=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Ye,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Ye,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Wa.displayName="SidebarMenuSkeleton";const Za=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Za.displayName="SidebarMenuSub";const Qa=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Qa.displayName="SidebarMenuSubItem";const to=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},w)=>{const l=t?Nt.Slot:"a";return e.jsx(l,{ref:w,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});to.displayName="SidebarMenuSubButton";function Pn({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:l,buttonPlaceholderText:i,className:c}){const p=s.useCallback((h,u)=>{a(h,u)},[a]),m=s.useCallback(h=>{const u=r.find(f=>f.projectId===h);return u?u.projectName:h},[r]),g=s.useCallback(h=>!o.projectId&&h===o.label,[o]);return e.jsx(En,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:e.jsxs(Dn,{children:[e.jsxs(he,{children:[e.jsx(ge,{className:"tw-text-sm",children:w}),e.jsx(fe,{children:e.jsx(Bn,{children:Object.entries(n).map(([h,u])=>e.jsx(Vn,{children:e.jsx(An,{onClick:()=>p(h),isActive:g(h),children:e.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),e.jsxs(he,{children:[e.jsx(ge,{className:"tw-text-sm",children:l}),e.jsx(fe,{className:"tw-pl-3",children:e.jsx(Kt,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:h=>m(h),buttonPlaceholder:i,onChange:h=>{const u=m(h);p(u,h)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(k.ScrollText,{})})})]})]})})}function Fe({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o}){const w=L();return e.jsxs("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[e.jsx(k.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),e.jsx(vt,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:l=>n(l.target.value)}),t&&e.jsxs(E,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{n("")},children:[e.jsx(k.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}function eo({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:w,searchValue:l,onSearch:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:m}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Fe,{className:"tw-w-9/12",value:l,onSearch:i,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(Mn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(Pn,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:w,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:m}),e.jsx(In,{className:"tw-min-w-[215px]",children:a})]})]})}const wt="scrBook",no="scrRef",mt="source",ro="details",ao="Scripture Reference",oo="Scripture Book",Fn="Type",so="Details";function io(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:wt,header:(t==null?void 0:t.scriptureReferenceColumnName)??ao,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?V.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===wt?y.formatScrRef(o.start):void 0},getGroupingValue:a=>V.bookIdToNumber(a.start.book),sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>y.formatScrRef(a.start),id:no,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:y.formatScrRef(o.start)},sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:mt,header:r?(t==null?void 0:t.typeColumnName)??Fn:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:ro,header:(t==null?void 0:t.detailsColumnName)??so,cell:a=>a.getValue(),enableGrouping:!1}]}const wo=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${n}`:`${y.scrRefToBBBCCCVVV(t.start)}+${n}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},He=t=>`${wo({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function lo({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:w,detailsColumnName:l,onRowSelected:i}){const[c,p]=s.useState([]),[m,g]=s.useState([{id:wt,desc:!1}]),[h,u]=s.useState({}),f=s.useMemo(()=>t.flatMap(N=>N.data.map(_=>({..._,source:N.source}))),[t]),b=s.useMemo(()=>io({scriptureReferenceColumnName:a,typeColumnName:w,detailsColumnName:l},r),[a,w,l,r]);s.useEffect(()=>{c.includes(mt)?g([{id:mt,desc:!1},{id:wt,desc:!1}]):g([{id:wt,desc:!1}])},[c]);const v=$.useReactTable({data:f,columns:b,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:p,onSortingChange:g,onRowSelectionChange:u,getExpandedRowModel:$.getExpandedRowModel(),getGroupedRowModel:$.getGroupedRowModel(),getCoreRowModel:$.getCoreRowModel(),getSortedRowModel:$.getSortedRowModel(),getRowId:He,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(i){const N=v.getSelectedRowModel().rowsById,_=Object.keys(N);if(_.length===1){const Z=f.find(A=>He(A)===_[0])||void 0;Z&&i(Z)}}},[h,f,i,v]);const S=o??oo,x=w??Fn,M=[{label:"No Grouping",value:[]},{label:`Group by ${S}`,value:[wt]},{label:`Group by ${x}`,value:[mt]},{label:`Group by ${S} and ${x}`,value:[wt,mt]},{label:`Group by ${x} and ${S}`,value:[mt,wt]}],F=N=>{p(JSON.parse(N))},Q=(N,_)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(_)},rt=(N,_)=>N.getIsGrouped()?"":d("banded-row",_%2===0?"even":"odd"),_t=(N,_,Z)=>{if(!((N==null?void 0:N.length)===0||_.depth<Z.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(gt,{value:JSON.stringify(c),onValueChange:N=>{F(N)},children:[e.jsx(lt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(ft,{})}),e.jsx(dt,{position:"item-aligned",children:e.jsx(mn,{children:M.map(N=>e.jsx(W,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),e.jsxs(Xt,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(qt,{children:v.getHeaderGroups().map(N=>e.jsx(ot,{children:N.headers.filter(_=>_.column.columnDef.header).map(_=>e.jsx(kt,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:e.jsxs("div",{children:[_.column.getCanGroup()?e.jsx(E,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",$.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},N.id))}),e.jsx($t,{children:v.getRowModel().rows.map((N,_)=>{const Z=L();return e.jsx(ot,{"data-state":N.getIsSelected()?"selected":"",className:d(rt(N,_)),onClick:A=>Q(N,A),children:N.getVisibleCells().map(A=>{if(!(A.getIsPlaceholder()||A.column.columnDef.enableGrouping&&!A.getIsGrouped()&&(A.column.columnDef.id!==mt||!r)))return e.jsx(bt,{className:d(A.column.columnDef.id,"tw-p-[1px]",_t(c,N,A)),children:A.getIsGrouped()?e.jsxs(E,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&e.jsx(k.ChevronDown,{}),!N.getIsExpanded()&&(Z==="ltr"?e.jsx(k.ChevronRight,{}):e.jsx(k.ChevronLeft,{}))," ",$.flexRender(A.column.columnDef.cell,A.getContext())," (",N.subRows.length,")"]}):$.flexRender(A.column.columnDef.cell,A.getContext())},A.id)})},N.id)})})]})]})}const de={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function co({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},className:o}){const w={...de,...Object.fromEntries(Object.entries(a).map(([i,c])=>[i,i===c&&i in de?de[i]:c]))},l=L();return e.jsxs(gt,{value:`${n}`,onValueChange:i=>r(i==="undefined"?void 0:parseInt(i,10)),children:[e.jsx(lt,{className:d("pr-twp tw-w-auto",o),children:e.jsx(ft,{placeholder:w[y.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(dt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(i=>e.jsx(W,{value:`${i}`,children:w[y.getLocalizeKeyForScrollGroupId(i)]},`${i}`))})]})}function po({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function uo({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function mo({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(re,{}):""]})}function On(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function Ut({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Gn=(t,n,r,a)=>r?Object.entries(t).filter(([w,l])=>"column"in l&&l.column===r||w===r).sort(([,w],[,l])=>w.order-l.order).flatMap(([w])=>n.filter(i=>i.group===w).sort((i,c)=>i.order-c.order).map(i=>e.jsxs(oe,{children:[e.jsx(se,{asChild:!0,children:"command"in i?e.jsxs(Zt,{onClick:()=>{a(i)},children:[i.iconPathBefore&&e.jsx(Ut,{icon:i.iconPathBefore,menuLabel:i.label,leading:!0}),i.label,i.iconPathAfter&&e.jsx(Ut,{icon:i.iconPathAfter,menuLabel:i.label})]},`dropdown-menu-item-${i.label}-${i.command}`):e.jsxs(tn,{children:[e.jsx(ve,{children:i.label}),e.jsx(Qe,{children:e.jsx(ye,{children:Gn(t,n,On(t,i.id),a)})})]},`dropdown-menu-sub-${i.label}-${i.id}`)}),i.tooltip&&e.jsx(Yt,{children:i.tooltip})]},`tooltip-${i.label}-${"command"in i?i.command:i.id}`))):void 0;function ho({commandHandler:t,menuData:n,tabLabel:r,icon:a,className:o,variant:w,id:l}){return e.jsxs(Gt,{variant:w,children:[e.jsx(Wt,{"aria-label":r,className:o,asChild:!0,id:l,children:e.jsx(E,{variant:"ghost",className:"tw-h-6 tw-p-1",children:a??e.jsx(k.MenuIcon,{})})}),e.jsx(St,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,i])=>typeof i=="object").sort(([,i],[,c])=>typeof i=="boolean"||typeof c=="boolean"?0:i.order-c.order).map(([i],c,p)=>e.jsxs(s.Fragment,{children:[e.jsx(xe,{children:e.jsx(ae,{children:Gn(n.groups,n.items,i,t)})}),c<p.length-1&&e.jsx(Ct,{})]},i))})]})}const Oe=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(U.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});Oe.displayName=U.List.displayName;const Ge=s.forwardRef(({className:t,...n},r)=>e.jsx(U.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Ge.displayName=U.List.displayName;const Ln=s.forwardRef(({className:t,...n},r)=>e.jsx(U.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Le=s.forwardRef(({className:t,...n},r)=>e.jsx(U.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Le.displayName=U.Content.displayName;function go({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:w}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(Fe,{className:w,value:n,onSearch:r,placeholder:a})]}),e.jsxs(Oe,{children:[e.jsx(Ge,{children:t.map(l=>e.jsx(Ln,{value:l.value,children:l.value},l.key))}),t.map(l=>e.jsx(Le,{value:l.value,children:l.content},l.key))]})]})}function fo({...t}){return e.jsx(D.Menu,{...t})}function bo({...t}){return e.jsx(D.Sub,{"data-slot":"menubar-sub",...t})}const Xn=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx(be.Provider,{value:o,children:e.jsx(D.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Xn.displayName=D.Root.displayName;const qn=s.forwardRef(({className:t,...n},r)=>{const a=tt();return e.jsx(D.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",st({variant:a.variant,className:t})),...n})});qn.displayName=D.Trigger.displayName;const $n=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const w=tt();return e.jsxs(D.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",st({variant:w.variant,className:t}),t),...a,children:[r,e.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});$n.displayName=D.SubTrigger.displayName;const Yn=s.forwardRef(({className:t,...n},r)=>{const a=tt();return e.jsx(D.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});Yn.displayName=D.SubContent.displayName;const Hn=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},w)=>{const l=tt();return e.jsx(D.Portal,{children:e.jsx(D.Content,{ref:w,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...o})})});Hn.displayName=D.Content.displayName;const Kn=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=tt();return e.jsx(D.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",st({variant:o.variant,className:t}),t),...r})});Kn.displayName=D.Item.displayName;const xo=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const w=tt();return e.jsxs(D.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",st({variant:w.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(D.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});xo.displayName=D.CheckboxItem.displayName;const vo=s.forwardRef(({className:t,children:n,...r},a)=>{const o=tt();return e.jsxs(D.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",st({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(D.ItemIndicator,{children:e.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});vo.displayName=D.RadioItem.displayName;const yo=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(D.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));yo.displayName=D.Label.displayName;const Un=s.forwardRef(({className:t,...n},r)=>e.jsx(D.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Un.displayName=D.Separator.displayName;const Dt=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Jn=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([w,l])=>"column"in l&&l.column===r||w===r).sort(([,w],[,l])=>w.order-l.order);return o.flatMap(([w],l)=>{const i=n.filter(p=>p.group===w).sort((p,m)=>p.order-m.order).map(p=>e.jsxs(oe,{children:[e.jsx(se,{asChild:!0,children:"command"in p?e.jsxs(Kn,{onClick:()=>{a(p)},children:[p.iconPathBefore&&e.jsx(Ut,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0}),p.label,p.iconPathAfter&&e.jsx(Ut,{icon:p.iconPathAfter,menuLabel:p.label})]},`menubar-item-${p.label}-${p.command}`):e.jsxs(bo,{children:[e.jsx($n,{children:p.label}),e.jsx(Yn,{children:Jn(t,n,On(t,p.id),a)})]},`menubar-sub-${p.label}-${p.id}`)}),p.tooltip&&e.jsx(Yt,{children:p.tooltip})]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`)),c=[...i];return i.length>0&&l<o.length-1&&c.push(e.jsx(Un,{},`separator-${w}`)),c})};function ko({menuData:t,commandHandler:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),i=s.useRef(void 0),c=s.useRef(void 0),p=m=>{switch(m){case"platform.app":return w;case"platform.window":return l;case"platform.layout":return i;case"platform.help":return c;default:return}};if(zr.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(m,g)=>{var f,b,v,S;m.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":Dt(w,[h]);break;case"alt+p":(f=w.current)==null||f.focus(),Dt(w,[h,u]);break;case"alt+l":(b=l.current)==null||b.focus(),Dt(l,[h,u]);break;case"alt+n":(v=i.current)==null||v.focus(),Dt(i,[h,u]);break;case"alt+h":(S=c.current)==null||S.focus(),Dt(c,[h,u]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const m=new MutationObserver(u=>{u.forEach(f=>{if(f.attributeName==="data-state"&&f.target instanceof HTMLElement){const b=f.target.getAttribute("data-state");r(b==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(u=>{m.observe(u,{attributes:!0})}),()=>m.disconnect()},[r]),!!t)return e.jsx(Xn,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,m])=>typeof m=="object").sort(([,m],[,g])=>typeof m=="boolean"||typeof g=="boolean"?0:m.order-g.order).map(([m,g])=>e.jsxs(fo,{children:[e.jsx(qn,{ref:p(m),children:typeof g=="object"&&"label"in g&&g.label}),e.jsx(Hn,{className:"tw-z-[250]",children:e.jsx(ae,{children:Jn(t.groups,t.items,m,n)})})]},m))})}function No(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function jo({menuData:t,onOpenChange:n,commandHandler:r,className:a,id:o,children:w,appMenuAreaChildren:l,configAreaChildren:i,shouldUseAsAppDragArea:c,menubarVariant:p="default"}){const m=s.useRef(void 0);return e.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:m,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&e.jsx(ko,{menuData:t,onOpenChange:n,commandHandler:r,variant:p})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:w}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i})})]})})}const So=(t,n)=>t[n]??n;function Co({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:w,localizedStrings:l,className:i}){const c=So(l,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,m]=s.useState(!1),g=u=>{o&&o(u),a&&a([u,...r.filter(f=>f!==u)]),w&&r.find(f=>f===u)&&w([...r.filter(f=>f!==u)]),m(!1)},h=(u,f)=>{var v,S,x,M,F,Q;const b=f!==u?((S=(v=t[u])==null?void 0:v.uiNames)==null?void 0:S[f])??((M=(x=t[u])==null?void 0:x.uiNames)==null?void 0:M.en):void 0;return b?`${(F=t[u])==null?void 0:F.autonym} (${b})`:(Q=t[u])==null?void 0:Q.autonym};return e.jsxs("div",{className:d("pr-twp tw-max-w-sm",i),children:[e.jsxs(gt,{name:"uiLanguage",value:n,onValueChange:g,open:p,onOpenChange:u=>m(u),children:[e.jsx(lt,{children:e.jsx(ft,{})}),e.jsx(dt,{className:"tw-z-[250]",children:Object.keys(t).map(u=>e.jsx(W,{value:u,children:h(u,n)},u))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(X,{className:"tw-ms-3",children:c}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(X,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(u=>h(u,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function Ro({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(X,{children:n(t)}):r?e.jsx(X,{children:r(t)}):e.jsx(X,{children:t})}function To({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:w,createComplexLabel:l}){return e.jsx("div",{id:t,className:n,children:r.map(i=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(ee,{className:"tw-me-2 tw-align-middle",checked:a.includes(i),onCheckedChange:c=>o(i,c)}),e.jsx(Ro,{item:i,createLabel:w,createComplexLabel:l})]},i))})}function _o({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:w,placeholder:l,isRequired:i=!1,className:c,defaultValue:p,value:m,onChange:g,onFocus:h,onBlur:u}){return e.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(X,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!w}),children:`${w}${i?"*":""}`}),e.jsx(vt,{id:t,disabled:n,placeholder:l,required:i,className:d(c,{"tw-border-red-600":r}),defaultValue:p,value:m,onChange:g,onFocus:h,onBlur:u}),e.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}const zo=xt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Wn=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:d(zo({variant:n}),t),...r}));Wn.displayName="Alert";const Zn=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Zn.displayName="AlertTitle";const Qn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Qn.displayName="AlertDescription";const tr=s.forwardRef(({className:t,...n},r)=>e.jsx(jt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));tr.displayName=jt.Root.displayName;const er=s.forwardRef(({className:t,...n},r)=>e.jsx(jt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));er.displayName=jt.Image.displayName;const nr=s.forwardRef(({className:t,...n},r)=>e.jsx(jt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));nr.displayName=jt.Fallback.displayName;const rr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));rr.displayName="Card";const ar=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));ar.displayName="CardHeader";const or=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));or.displayName="CardTitle";const sr=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));sr.displayName="CardDescription";const ir=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...n}));ir.displayName="CardContent";const wr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));wr.displayName="CardFooter";function Mo({...t}){return e.jsx(Ue.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const lr=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsxs(Bt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(Bt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(Bt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(Bt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});lr.displayName=Bt.Root.displayName;const dr=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(ue.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(ue.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});dr.displayName=ue.Root.displayName;const Eo=U.Root,cr=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(U.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});cr.displayName=U.List.displayName;const pr=s.forwardRef(({className:t,...n},r)=>e.jsx(U.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));pr.displayName=U.Trigger.displayName;const ur=s.forwardRef(({className:t,...n},r)=>e.jsx(U.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));ur.displayName=U.Content.displayName;const Io=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Do(t){return{preserveValue:!0,...t}}const mr=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=Do(o.current);const[w,l]=s.useState(()=>a.current),[i,c]=s.useState(!0);return s.useEffect(()=>{let p=!0;return c(!!t),(async()=>{if(t){const m=await t();p&&(l(()=>m),c(!1))}})(),()=>{p=!1,o.current.preserveValue||l(()=>a.current)}},[t]),[w,i]},ce=()=>!1,Bo=(t,n)=>{const[r]=mr(s.useCallback(async()=>{if(!t)return ce;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),ce,{preserveValue:!1});s.useEffect(()=>()=>{r!==ce&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Ue.toast});exports.Alert=Wn;exports.AlertDescription=Qn;exports.AlertTitle=Zn;exports.Avatar=tr;exports.AvatarFallback=nr;exports.AvatarImage=er;exports.BOOK_SELECTOR_STRING_KEYS=pa;exports.Badge=Ae;exports.BookChapterControl=aa;exports.BookSelectionMode=un;exports.BookSelector=ua;exports.Button=E;exports.Card=rr;exports.CardContent=ir;exports.CardDescription=sr;exports.CardFooter=wr;exports.CardHeader=ar;exports.CardTitle=or;exports.ChapterRangeSelector=pn;exports.Checkbox=ee;exports.Checklist=To;exports.ComboBox=Kt;exports.DataTable=xn;exports.DisableButton=ya;exports.DropdownMenu=Gt;exports.DropdownMenuCheckboxItem=Qt;exports.DropdownMenuContent=St;exports.DropdownMenuGroup=xe;exports.DropdownMenuItem=Zt;exports.DropdownMenuItemType=yn;exports.DropdownMenuLabel=Lt;exports.DropdownMenuPortal=Qe;exports.DropdownMenuRadioGroup=Ar;exports.DropdownMenuRadioItem=ke;exports.DropdownMenuSeparator=Ct;exports.DropdownMenuShortcut=en;exports.DropdownMenuSub=tn;exports.DropdownMenuSubContent=ye;exports.DropdownMenuSubTrigger=ve;exports.DropdownMenuTrigger=Wt;exports.EnableButton=va;exports.Filter=Ta;exports.FilterButton=vn;exports.FilterDropdown=ja;exports.Footer=Ra;exports.INVENTORY_STRING_KEYS=Ba;exports.Input=vt;exports.InstallButton=xa;exports.Inventory=Pa;exports.Label=X;exports.MarkdownRenderer=Na;exports.MoreInfo=Ca;exports.MultiSelectComboBox=jn;exports.NavigationContentSearch=go;exports.NoExtensionsFound=Sa;exports.Popover=Te;exports.PopoverContent=te;exports.PopoverTrigger=_e;exports.RadioGroup=Re;exports.RadioGroupItem=Ht;exports.ScriptureResultsViewer=lo;exports.ScrollGroupSelector=co;exports.SearchBar=Fe;exports.Select=gt;exports.SelectContent=dt;exports.SelectGroup=mn;exports.SelectItem=W;exports.SelectLabel=hn;exports.SelectScrollDownButton=Ve;exports.SelectScrollUpButton=Be;exports.SelectSeparator=gn;exports.SelectTrigger=lt;exports.SelectValue=ft;exports.Separator=re;exports.SettingsList=po;exports.SettingsListHeader=mo;exports.SettingsListItem=uo;exports.SettingsSidebar=Pn;exports.SettingsSidebarContentSearch=eo;exports.Slider=lr;exports.Sonner=Mo;exports.Spinner=Tt;exports.Switch=dr;exports.TabDropdownMenu=ho;exports.Table=Xt;exports.TableBody=$t;exports.TableCaption=bn;exports.TableCell=bt;exports.TableFooter=fn;exports.TableHead=kt;exports.TableHeader=qt;exports.TableRow=ot;exports.Tabs=Eo;exports.TabsContent=ur;exports.TabsList=cr;exports.TabsTrigger=pr;exports.TextField=_o;exports.ToggleGroup=Pe;exports.ToggleGroupItem=Vt;exports.Toolbar=jo;exports.Tooltip=oe;exports.TooltipContent=Yt;exports.TooltipProvider=ae;exports.TooltipTrigger=se;exports.UiLanguageSelector=Co;exports.UpdateButton=ka;exports.VersionHistory=kn;exports.VerticalTabs=Oe;exports.VerticalTabsContent=Le;exports.VerticalTabsList=Ge;exports.VerticalTabsTrigger=Ln;exports.badgeVariants=Nn;exports.buttonVariants=ln;exports.cn=d;exports.getBookIdFromUSFM=Tn;exports.getLinesFromUSFM=Rn;exports.getNumberFromUSFM=me;exports.getStatusForItem=_n;exports.getToolbarOSReservedSpaceClassName=No;exports.inventoryCountColumn=Ia;exports.inventoryItemColumn=Ma;exports.inventoryStatusColumn=Da;exports.useEvent=Io;exports.useEventAsync=Bo;exports.usePromise=mr;function Vo(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}Vo(`*, ::before, ::after {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%; /* white */
    --foreground: 0 0% 0%; /* black */
    --muted: 33.9 32.4% 86.1%; /* paratext light brown */
    --muted-foreground: 15.5 13.2% 53.9%; /*paratext brown */
    --popover: 40 20% 98%; /* popover paratext */
    --popover-foreground: 0 0% 0%; /* black */
    --card: 0 0% 100%; /* white */
    --card-foreground: 0 0% 0%; /* black */
    --border: 220 13% 91%; /* border */
    --input: 161.3 26.7% 88.2%; /* paratext light green */
    --primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --secondary: 161.3 26.7% 88.2%; /* paratext light green */
    --secondary-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --accent: 161.3 26.7% 88.2%; /* paratext light green */
    --accent-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 15.5 13.2% 53.9%; /*paratext brown */

    --sidebar-background: 40 20% 98%; /* popover paratext */
    --sidebar-foreground: 12 10.95% 26.86%; /* dark brown */
    --sidebar-primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --sidebar-primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --sidebar-accent: 33.9 32.4% 86.1%; /* paratext light brown */
    --sidebar-accent-foreground: 0 0% 0%; /* black */
    --sidebar-border: 220 13% 91%; /* border */
    --sidebar-ring: 15.5 13.2% 53.9%; /*paratext brown */
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

    --sidebar-background: 180 71.4% 5%;
    --sidebar-foreground: 33.9 32.4% 86.1%;
    --sidebar-primary: 161.3 26.7% 88.2%;
    --sidebar-primary-foreground: 173.4 82.1% 15.3%;
    --sidebar-accent: 15.5 13.2% 53.9%;
    --sidebar-accent-foreground: 33.9 32.4% 86.1%;
    --sidebar-border: 220 13% 20%;
    --sidebar-ring: 15.5 13.2% 53.9%;
  }
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
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
.tw-left-2 {
  left: 0.5rem;
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
.tw-max-h-5 {
  max-height: 1.25rem;
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
.tw-w-1\\/2 {
  width: 50%;
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
.tw-w-\\[46px\\] {
  width: 46px;
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
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-none {
  max-width: none;
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
.tw-basis-0 {
  flex-basis: 0px;
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
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
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
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
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
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
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
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
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
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
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
.tw-ps-3 {
  padding-inline-start: 0.75rem;
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
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
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
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
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

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
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
.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
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
.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
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
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
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
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
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
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
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
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
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
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
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
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
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
`,"after-all");
//# sourceMappingURL=index.cjs.map
