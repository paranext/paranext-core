"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),dr=require("clsx"),cr=require("tailwind-merge"),wt=require("class-variance-authority"),qe=require("@radix-ui/react-dropdown-menu"),x=require("lucide-react"),b=require("platform-bible-utils"),yt=require("@radix-ui/react-slot"),pr=require("@radix-ui/react-label"),ur=require("@radix-ui/react-radio-group"),mr=require("@radix-ui/react-popover"),H=require("cmdk"),hr=require("@radix-ui/react-dialog"),X=require("@tanstack/react-table"),gr=require("@radix-ui/react-select"),fr=require("markdown-to-jsx"),br=require("@radix-ui/react-checkbox"),xr=require("@radix-ui/react-toggle-group"),vr=require("@radix-ui/react-toggle"),yr=require("@radix-ui/react-separator"),Nr=require("@radix-ui/react-tooltip"),kr=require("@radix-ui/react-tabs"),jr=require("@radix-ui/react-menubar"),Sr=require("react-hotkeys-hook"),Cr=require("@radix-ui/react-avatar"),$e=require("sonner"),Rr=require("@radix-ui/react-slider"),Tr=require("@radix-ui/react-switch");function L(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const D=L(qe),Ye=L(pr),Mt=L(ur),Et=L(mr),et=L(hr),O=L(gr),we=L(br),qt=L(xr),He=L(vr),Ke=L(yr),Dt=L(Nr),K=L(kr),B=L(jr),Nt=L(Cr),zt=L(Rr),le=L(Tr),_r=cr.extendTailwindMerge({prefix:"tw-"});function d(...t){return _r(dr.clsx(t))}const bt=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));bt.displayName="Input";const zr=s.forwardRef(({handleSearch:t,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,...i},l)=>e.jsx(bt,{...i,type:"text",className:d("tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:w=>t(w.target.value),onKeyDown:w=>{w.key==="Enter"?(a(),w.preventDefault()):n(w)},onClick:r,ref:l})),me=s.createContext(void 0);function Q(){const t=s.useContext(me);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const rt=wt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ir="layoutDirection";function A(){const t=localStorage.getItem(Ir);return t==="rtl"?t:"ltr"}const $t=D.Trigger,he=D.Group,Ue=D.Portal,Je=D.Sub,Mr=D.RadioGroup;function Bt({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(me.Provider,{value:r,children:e.jsx(D.Root,{...n})})}const ge=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=Q();return e.jsxs(D.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,rt({variant:i.variant})),...a,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});ge.displayName=D.SubTrigger.displayName;const fe=s.forwardRef(({className:t,...n},r)=>e.jsx(D.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));fe.displayName=D.SubContent.displayName;const kt=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const i=A();return e.jsx(D.Portal,{children:e.jsx(D.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:i,children:r})})})});kt.displayName=D.Content.displayName;const Yt=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=A(),i=Q();return e.jsx(D.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,rt({variant:i.variant})),...r,dir:o})});Yt.displayName=D.Item.displayName;const Ht=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=Q();return e.jsxs(D.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,rt({variant:i.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(D.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Ht.displayName=D.CheckboxItem.displayName;const be=s.forwardRef(({className:t,children:n,...r},a)=>{const o=Q();return e.jsxs(D.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,rt({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(D.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});be.displayName=D.RadioItem.displayName;const Vt=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(D.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Vt.displayName=D.Label.displayName;const jt=s.forwardRef(({className:t,...n},r)=>e.jsx(D.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));jt.displayName=D.Separator.displayName;function We({className:t,...n}){return e.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}We.displayName="DropdownMenuShortcut";var Er=Object.defineProperty,Dr=(t,n,r)=>n in t?Er(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,C=(t,n,r)=>Dr(t,typeof n!="symbol"?n+"":n,r);const mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],xe=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ze=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Oe=qr();function St(t,n=!0){return n&&(t=t.toUpperCase()),t in Oe?Oe[t]:0}function ve(t){return St(t)>0}function Br(t){const n=typeof t=="string"?St(t):t;return n>=40&&n<=66}function Vr(t){return(typeof t=="string"?St(t):t)<=39}function Qe(t){return t<=66}function Pr(t){const n=typeof t=="string"?St(t):t;return nn(n)&&!Qe(n)}function*Fr(){for(let t=1;t<=mt.length;t++)yield t}const Or=1,tn=mt.length;function Ar(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function ye(t,n="***"){const r=t-1;return r<0||r>=mt.length?n:mt[r]}function en(t){return t<=0||t>tn?"******":Ze[t-1]}function Gr(t){return en(St(t))}function nn(t){const n=typeof t=="number"?ye(t):t;return ve(n)&&!xe.includes(n)}function Lr(t){const n=typeof t=="number"?ye(t):t;return ve(n)&&xe.includes(n)}function Xr(t){return Ze[t-1].includes("*obsolete*")}function qr(){const t={};for(let n=0;n<mt.length;n++)t[mt[n]]=n+1;return t}const F={allBookIds:mt,nonCanonicalIds:xe,bookIdToNumber:St,isBookIdValid:ve,isBookNT:Br,isBookOT:Vr,isBookOTNT:Qe,isBookDC:Pr,allBookNumbers:Fr,firstBook:Or,lastBook:tn,extraBooks:Ar,bookNumberToId:ye,bookNumberToEnglishName:en,bookIdToEnglishName:Gr,isCanonical:nn,isExtraMaterial:Lr,isObsolete:Xr};var tt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(tt||{});const J=class{constructor(n){if(C(this,"name"),C(this,"fullPath"),C(this,"isPresent"),C(this,"hasVerseSegments"),C(this,"isCustomized"),C(this,"baseVersification"),C(this,"scriptureBooks"),C(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=tt[n]):(this._type=n,this.name=tt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};C(J,"Original",new J(tt.Original)),C(J,"Septuagint",new J(tt.Septuagint)),C(J,"Vulgate",new J(tt.Vulgate)),C(J,"English",new J(tt.English)),C(J,"RussianProtestant",new J(tt.RussianProtestant)),C(J,"RussianOrthodox",new J(tt.RussianOrthodox));let pt=J;function Ae(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var rn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(rn||{});const Y=class _{constructor(n,r,a,o){if(C(this,"firstChapter"),C(this,"lastChapter"),C(this,"lastVerse"),C(this,"hasSegmentsDefined"),C(this,"text"),C(this,"BBBCCCVVVS"),C(this,"longHashCode"),C(this,"versification"),C(this,"rtlMark","‏"),C(this,"_bookNum",0),C(this,"_chapterNum",0),C(this,"_verseNum",0),C(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,l=r!=null&&r instanceof pt?r:void 0;this.setEmpty(l),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof pt?r:void 0;this.setEmpty(i),this._verseNum=n%_.chapterDigitShifter,this._chapterNum=Math.floor(n%_.bookDigitShifter/_.chapterDigitShifter),this._bookNum=Math.floor(n/_.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof _){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof pt?n:_.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??_.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new _(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Rt)return r=new _,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%_.bcvMaxValue*_.bookDigitShifter+(r>=0?r%_.bcvMaxValue*_.chapterDigitShifter:0)+(a>=0?a%_.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:i,versificationStr:l}=n,w=i||o.toString();let c;return l&&(c=new pt(l)),r?new _(r,a.toString(),w,c):new _}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>_.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(_.verseRangeSeparator)||this._verse.includes(_.verseSequenceIndicator))}get book(){return F.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=F.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=_.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=_.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>F.lastBook)throw new Rt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new pt(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(_.verseRangeSeparators,_.verseSequenceIndicators)}get BBBCCC(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return _.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const l=+i[1].trim();this.versification=new pt(tt[l])}catch{throw new Rt("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Rt("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||F.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!_.isVerseParseable(a[1]))throw new Rt("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new _(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof _?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=_.verseRangeSeparators,a=_.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Ae(this._verse,a);for(const l of i.map(w=>Ae(w,r))){const w=this.clone();w.verse=l[0];const c=w.verseNum;if(o.push(w),l.length>1){const p=this.clone();if(p.verse=l[1],!n)for(let m=c+1;m<p.verseNum;m++){const f=new _(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(f)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const l=o.BBBCCCVVV;if(a>l)return 3;if(a===l)return 4;a=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>F.lastBook?2:(F.isCanonical(this._bookNum),0)}setEmpty(n=_.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=F.bookIdToNumber(n),this.chapter=r,this.verse=a}};C(Y,"defaultVersification",pt.English),C(Y,"verseRangeSeparator","-"),C(Y,"verseSequenceIndicator",","),C(Y,"verseRangeSeparators",[Y.verseRangeSeparator]),C(Y,"verseSequenceIndicators",[Y.verseSequenceIndicator]),C(Y,"chapterDigitShifter",1e3),C(Y,"bookDigitShifter",Y.chapterDigitShifter*Y.chapterDigitShifter),C(Y,"bcvMaxValue",Y.chapterDigitShifter-1),C(Y,"ValidStatusType",rn);class Rt extends Error{}const $r=s.forwardRef(({bookId:t,handleSelectBook:n,isSelected:r,handleHighlightBook:a,handleKeyDown:o,bookType:i,children:l},w)=>e.jsxs(Yt,{ref:w,textValue:t,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[e.jsx("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":i.toLowerCase()==="ot","tw-border-s-purple-200":i.toLowerCase()==="nt","tw-border-s-indigo-200":i.toLowerCase()==="dc"}),children:F.bookIdToEnglishName(t)}),r&&e.jsx("div",{children:l})]},t));function Yr({handleSelectChapter:t,endChapter:n,activeChapter:r,highlightedChapter:a,handleHighlightedChapter:o}){const i=Array.from({length:n},(w,c)=>c+1),l=s.useCallback(w=>{o(w)},[o]);return e.jsx("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:i.map(w=>e.jsx("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":w===r,"tw-bg-amber-200":w===a}),onClick:c=>{c.preventDefault(),c.stopPropagation(),t(w)},role:"button",onKeyDown:c=>{c.key==="Enter"&&t(w)},tabIndex:0,onMouseMove:()=>l(w),children:w},w))})}const Ne=F.allBookIds.filter(t=>!F.isObsolete(F.bookIdToNumber(t))),Hr={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Ge=["OT","NT","DC"],Kr=96,Ur=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Tt=t=>b.getChaptersForBook(F.bookIdToNumber(t));function Jr(){return Ne.map(n=>F.bookIdToEnglishName(n))}function Wr(t){return Jr().includes(t)}function Zr(t){const n=t.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Wr(n))return Ne.find(a=>F.bookIdToEnglishName(a)===n)}function Qr({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=A(),[i,l]=s.useState(""),[w,c]=s.useState(t.book),[p,m]=s.useState(t.chapterNum??0),[f,h]=s.useState(t.book),[u,N]=s.useState(!1),[z,j]=s.useState(u),y=s.useRef(void 0),k=s.useRef(void 0),I=s.useRef(void 0),q=s.useCallback(S=>{const M=a?a():Ne;return{OT:M.filter(P=>F.isBookOT(P)),NT:M.filter(P=>F.isBookNT(P)),DC:M.filter(P=>F.isBookDC(P))}[S].filter(P=>{const g=F.bookIdToEnglishName(P).toLowerCase(),T=i.replace(/[^a-zA-Z]/g,"").toLowerCase();return g.includes(T)||P.toLowerCase().includes(T)})},[i,a]),U=S=>{l(S)},lt=s.useRef(!1),dt=s.useCallback(S=>{if(lt.current){lt.current=!1;return}N(S)},[]),v=s.useCallback((S,M,P,g)=>{if(m(t.book!==S?1:t.chapterNum),M||Tt(S)===-1){n({book:S,chapterNum:P??1,verseNum:g??1}),N(!1),l("");return}c(w!==S?S:""),N(!M)},[n,t.book,t.chapterNum,w]),R=S=>{S<=0||S>Tt(w)||v(w,!0,S)},$=s.useCallback(()=>{Ur.forEach(S=>{const M=S.exec(i);if(M){const[P,g=void 0,T=void 0]=M.slice(1),Z=Zr(P);(F.isBookIdValid(P)||Z)&&v(Z??P,!0,g?parseInt(g,10):1,T?parseInt(T,10):1)}}),y.current.blur()},[v,i]),V=s.useCallback(S=>{u?(S.key==="ArrowDown"||S.key==="ArrowUp")&&(I!=null&&I.current?I.current.focus():k.current&&k.current.focus(),S.preventDefault()):N(!0)},[u]),ne=S=>{const{key:M}=S;M==="ArrowRight"||M==="ArrowLeft"||M==="ArrowDown"||M==="ArrowUp"||M==="Enter"||y.current.dispatchEvent(new KeyboardEvent("keydown",{key:M}))},re=S=>{const{key:M}=S;if(f===w){if(M==="Enter"){S.preventDefault(),v(w,!0,p);return}const P=M==="ArrowRight"&&!o||M==="ArrowRight"&&o==="ltr"||M==="ArrowLeft"&&o==="rtl",g=M==="ArrowLeft"&&!o||M==="ArrowLeft"&&o==="ltr"||M==="ArrowRight"&&o==="rtl";let T=0;if(P)if(p<Tt(f))T=1;else{S.preventDefault();return}else if(g)if(p>1)T=-1;else{S.preventDefault();return}else M==="ArrowDown"?T=6:M==="ArrowUp"&&(T=-6);p+T<=0||p+T>Tt(f)?m(0):T!==0&&(m(p+T),S.preventDefault())}};return s.useEffect(()=>{w===f?w===t.book?m(t.chapterNum):m(1):m(0)},[f,t.book,t.chapterNum,w]),s.useLayoutEffect(()=>{j(u)},[u]),s.useLayoutEffect(()=>{const S=setTimeout(()=>{if(z&&k.current&&I.current&&!i){const P=I.current.offsetTop-Kr;k.current.scrollTo({top:P,behavior:"instant"})}},10);return()=>{clearTimeout(S)}},[z,i]),e.jsxs(Bt,{modal:!1,open:u,onOpenChange:dt,children:[e.jsx($t,{asChild:!0,children:e.jsx(zr,{ref:y,value:i,handleSearch:U,handleKeyDown:V,handleOnClick:()=>{c(t.book),h(t.book),m(t.chapterNum>0?t.chapterNum:0),N(!0),l(b.formatScrRef(t,"English")),y.current.focus()},onFocus:()=>{lt.current=!0},onBlur:()=>{l("")},handleSubmit:$,placeholder:b.formatScrRef(t,"English"),className:r})}),e.jsx(kt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:ne,align:o==="ltr"?"start":"end",ref:k,children:e.jsx("div",{className:"rtl:tw-ps-2",children:Ge.map((S,M)=>{const P=q(S);return P.length>0&&e.jsxs("div",{children:[e.jsx(Vt,{className:"tw-font-semibold tw-text-foreground/80",children:Hr[S]}),P.map(g=>e.jsx("div",{children:e.jsx($r,{bookId:g,handleSelectBook:()=>v(g,!1),isSelected:w===g,handleHighlightBook:()=>h(g),handleKeyDown:re,bookType:S,ref:T=>{w===g&&(I.current=T)},children:e.jsx(Yr,{handleSelectChapter:R,endChapter:Tt(g),activeChapter:t.book===g?t.chapterNum:0,highlightedChapter:p,handleHighlightedChapter:T=>{m(T)}})})},g)),Ge.length-1!==M?e.jsx(jt,{}):void 0]},S)})})})]})}const an=wt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),E=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},i)=>{const l=a?yt.Slot:"button";return e.jsx(l,{className:d(an({variant:n,size:r,className:t})),ref:i,...o})});E.displayName="Button";const ta=wt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),G=s.forwardRef(({className:t,...n},r)=>e.jsx(Ye.Root,{ref:r,className:d("pr-twp",ta(),t),...n}));G.displayName=Ye.Root.displayName;const ke=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsx(Mt.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});ke.displayName=Mt.Root.displayName;const Gt=s.forwardRef(({className:t,...n},r)=>e.jsx(Mt.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Mt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Gt.displayName=Mt.Item.displayName;const je=Et.Root,Se=Et.Trigger,Kt=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const i=A();return e.jsx(Et.Portal,{children:e.jsx(Et.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:i})})});Kt.displayName=Et.Content.displayName;const ea=et.Portal,on=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));on.displayName=et.Overlay.displayName;const na=s.forwardRef(({className:t,children:n,...r},a)=>{const o=A();return e.jsxs(ea,{children:[e.jsx(on,{}),e.jsxs(et.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(et.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});na.displayName=et.Content.displayName;const ra=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));ra.displayName=et.Title.displayName;const aa=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));aa.displayName=et.Description.displayName;const Ce=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));Ce.displayName=H.Command.displayName;const Re=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(H.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});Re.displayName=H.Command.Input.displayName;const Te=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Te.displayName=H.Command.List.displayName;const _e=s.forwardRef((t,n)=>e.jsx(H.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));_e.displayName=H.Command.Empty.displayName;const sn=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));sn.displayName=H.Command.Group.displayName;const oa=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...n}));oa.displayName=H.Command.Separator.displayName;const ze=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));ze.displayName=H.Command.Item.displayName;function sa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Lt({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:i,onChange:l=()=>{},getOptionLabel:w=sa,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:f="No option found",buttonVariant:h="outline",alignDropDown:u="start",isDisabled:N=!1,...z}){const[j,y]=s.useState(!1);return e.jsxs(je,{open:j,onOpenChange:y,...z,children:[e.jsx(Se,{asChild:!0,children:e.jsxs(E,{variant:h,role:"combobox","aria-expanded":j,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:N,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-pe-2",children:c}),e.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?w(i):p})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Kt,{align:u,className:d("tw-w-[200px] tw-p-0",o),children:e.jsxs(Ce,{children:[e.jsx(Re,{placeholder:m,className:"tw-text-inherit"}),e.jsx(_e,{children:f}),e.jsx(Te,{children:n.map(k=>e.jsxs(ze,{value:w(k),onSelect:()=>{l(k),y(!1)},children:[e.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||w(i)!==w(k)})}),w(k)]},w(k)))})]})})]})}function wn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:i}){const l=s.useMemo(()=>Array.from({length:i},(p,m)=>m+1),[i]),w=p=>{r(p),p>n&&a(p)},c=p=>{a(p),p<t&&r(p)};return e.jsxs(e.Fragment,{children:[e.jsx(G,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(Lt,{isDisabled:o,onChange:w,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:t},"start chapter"),e.jsx(G,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(Lt,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:n},"end chapter")]})}var ln=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(ln||{});const ia=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),ae=(t,n)=>t[n]??n;function wa({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:i,handleSelectEndChapter:l,startChapter:w,handleSelectStartChapter:c,localizedStrings:p}){const m=ae(p,"%webView_bookSelector_currentBook%"),f=ae(p,"%webView_bookSelector_choose%"),h=ae(p,"%webView_bookSelector_chooseBooks%"),[u,N]=s.useState("current book"),z=j=>{N(j),t(j)};return e.jsx(ke,{className:"pr-twp tw-flex",value:u,onValueChange:j=>z(j),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Gt,{value:"current book"}),e.jsx(G,{className:"tw-ms-1",children:m})]}),e.jsx(G,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(wn,{isDisabled:u==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:l,chapterCount:o,startChapter:w,endChapter:i})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Gt,{value:"choose books"}),e.jsx(G,{className:"tw-ms-1",children:h})]}),e.jsx(G,{className:"tw-flex tw-items-center",children:a.map(j=>F.bookIdToEnglishName(j)).join(", ")}),e.jsx(E,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}function la({table:t}){return e.jsxs(Bt,{children:[e.jsx(qe.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(E,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(kt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(Vt,{children:"Toggle columns"}),e.jsx(jt,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Ht,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const ht=O.Root,dn=O.Group,gt=O.Value,cn=wt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),st=s.forwardRef(({className:t,children:n,size:r,...a},o)=>{const i=A();return e.jsxs(O.Trigger,{className:d(cn({size:r,className:t})),ref:o,...a,dir:i,children:[n,e.jsx(O.Icon,{asChild:!0,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});st.displayName=O.Trigger.displayName;const Ie=s.forwardRef(({className:t,...n},r)=>e.jsx(O.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Ie.displayName=O.ScrollUpButton.displayName;const Me=s.forwardRef(({className:t,...n},r)=>e.jsx(O.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Me.displayName=O.ScrollDownButton.displayName;const it=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const i=A();return e.jsx(O.Portal,{children:e.jsxs(O.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(Ie,{}),e.jsx(O.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:i,children:n})}),e.jsx(Me,{})]})})});it.displayName=O.Content.displayName;const pn=s.forwardRef(({className:t,...n},r)=>e.jsx(O.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));pn.displayName=O.Label.displayName;const W=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(O.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(O.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(O.ItemText,{children:n})]}));W.displayName=O.Item.displayName;const un=s.forwardRef(({className:t,...n},r)=>e.jsx(O.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));un.displayName=O.Separator.displayName;function da({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(ht,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(st,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(gt,{placeholder:t.getState().pagination.pageSize})}),e.jsx(it,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(W,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Pt=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!n}),children:e.jsx("table",{ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm",t),...r})}));Pt.displayName="Table";const Ft=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));Ft.displayName="TableHeader";const Ot=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...n}));Ot.displayName="TableBody";const mn=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));mn.displayName="TableFooter";const nt=s.forwardRef(({className:t,...n},r)=>e.jsx("tr",{ref:r,className:d("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",t),...n}));nt.displayName="TableRow";const vt=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));vt.displayName="TableHead";const ft=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));ft.displayName="TableCell";const hn=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));hn.displayName="TableCaption";function gn({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{}}){var j;const[w,c]=s.useState([]),[p,m]=s.useState([]),[f,h]=s.useState({}),[u,N]=s.useState({}),z=X.useReactTable({data:n,columns:t,getCoreRowModel:X.getCoreRowModel(),...r&&{getPaginationRowModel:X.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:X.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:X.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:N,state:{sorting:w,columnFilters:p,columnVisibility:f,rowSelection:u}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(la,{table:z}),e.jsxs(Pt,{stickyHeader:i,children:[e.jsx(Ft,{stickyHeader:i,children:z.getHeaderGroups().map(y=>e.jsx(nt,{children:y.headers.map(k=>e.jsx(vt,{children:k.isPlaceholder?void 0:X.flexRender(k.column.columnDef.header,k.getContext())},k.id))},y.id))}),e.jsx(Ot,{children:(j=z.getRowModel().rows)!=null&&j.length?z.getRowModel().rows.map(y=>e.jsx(nt,{onClick:()=>l(y,z),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(k=>e.jsx(ft,{children:X.flexRender(k.column.columnDef.cell,k.getContext())},k.id))},y.id)):e.jsx(nt,{children:e.jsx(ft,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(E,{variant:"outline",size:"sm",onClick:()=>z.previousPage(),disabled:!z.getCanPreviousPage(),children:"Previous"}),e.jsx(E,{variant:"outline",size:"sm",onClick:()=>z.nextPage(),disabled:!z.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(da,{table:z})]})}const Ct=s.forwardRef(({className:t,...n},r)=>e.jsx(x.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...n,ref:r}));Ct.displayName="Spinner";function ca({isInstalling:t,handleClick:n,buttonText:r,className:a,...o}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t,"tw-bg-blue-600":!t,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!r,"tw-w-20":r},a),onClick:n,...o,children:t?e.jsx(Ct,{size:15}):e.jsxs(e.Fragment,{children:[e.jsx(x.Download,{size:25,className:d("tw-h-4 tw-w-4",{"tw-mr-1":r})}),r]})})}function pa({isEnabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function ua({isDisabling:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function ma({isUpdating:t,handleClick:n,className:r,...a}){return e.jsx(E,{className:d("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":t},r),onClick:n,...a,children:t?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function ha({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:e.jsx(fr,{options:o,children:n})})}const fn=s.forwardRef((t,n)=>e.jsxs(E,{ref:n,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...t,children:[e.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",e.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var bn=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(bn||{});function ga({id:t,groups:n}){return e.jsx("div",{id:t,children:e.jsxs(Bt,{children:[e.jsx($t,{asChild:!0,children:e.jsx(fn,{})}),e.jsx(kt,{children:n.map(r=>e.jsxs("div",{children:[e.jsx(Vt,{children:r.label}),e.jsx(he,{children:r.items.map(a=>e.jsx("div",{children:a.itemType===0?e.jsx(Ht,{onClick:a.onClick,children:a.label}):e.jsx(be,{onClick:a.onClick,value:a.label,children:a.label})},a.label))}),e.jsx(jt,{})]},r.label))})]})})}function fa({id:t,message:n}){return e.jsx("div",{id:t,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:e.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:e.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:n})})})}function ba({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o}){const i=new b.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((w,c)=>w+c,0)),l=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[e.jsx(x.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:i})]}),e.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[e.jsx("div",{className:"tw-flex tw-items-center",children:a.slice(0,3).map(w=>e.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:w.toUpperCase()},w))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>l(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",a.length-3," more languages"]})]}),e.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),e.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[e.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",e.jsx(x.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),e.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",e.jsx(x.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function xn({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function i(w){const c=new Date(w),p=new Date(o.getTime()-c.getTime()),m=p.getUTCFullYear()-1970,f=p.getUTCMonth(),h=p.getUTCDate()-1;let u="";return m>0?u=`${m.toString()} year${m===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(n).sort((w,c)=>c[0].localeCompare(w[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(r?l:l.slice(0,5)).map(w=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-gray-600",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:w[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",w[0]]}),e.jsx("div",{children:i(w[1].date)})]})]},w[0]))}),l.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-gray-500 tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function xa({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const i=s.useMemo(()=>b.formatBytes(r),[r]),w=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(m=>p.of(m))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-pb-4 tw-pt-4",children:e.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[e.jsx(xn,{versionHistory:o}),e.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),e.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:i})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[e.jsx("span",{className:"tw-mb-2",children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}const vn=wt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Ee=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:d("pr-twp",vn({variant:n}),t),...r}));Ee.displayName="Badge";function yn({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i="No entries found",customSelectedText:l,isDisabled:w=!1,sortSelected:c=!1,icon:p=void 0,className:m=void 0}){const[f,h]=s.useState(!1),u=s.useCallback(j=>{var k;const y=(k=t.find(I=>I.label===j))==null?void 0:k.value;y&&a(r.includes(y)?r.filter(I=>I!==y):[...r,y])},[t,r,a]),N=()=>l||o,z=s.useMemo(()=>{if(!c)return t;const j=t.filter(k=>k.starred).sort((k,I)=>k.label.localeCompare(I.label)),y=t.filter(k=>!k.starred).sort((k,I)=>{const q=r.includes(k.value),U=r.includes(I.value);return q&&!U?-1:!q&&U?1:k.label.localeCompare(I.label)});return[...j,...y]},[t,r,c]);return e.jsx("div",{className:m,children:e.jsxs(je,{open:f,onOpenChange:h,children:[e.jsx(Se,{asChild:!0,children:e.jsxs(E,{variant:"ghost",role:"combobox","aria-expanded":f,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:w,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),e.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:N()})})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Kt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(Ce,{children:[e.jsx(Re,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(Te,{children:[e.jsx(_e,{children:i}),e.jsx(sn,{children:z.map(j=>{const y=n?n(j):void 0;return e.jsxs(ze,{value:j.label,onSelect:u,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(x.Check,{className:d("tw-h-4 tw-w-4",r.includes(j.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:j.starred&&e.jsx(x.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:j.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:y})]},j.label)})})]})]})})]})})}function va({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:m,badgesPlaceholder:f}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(yn,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:m}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(h=>{var u;return e.jsxs(Ee,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(E,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(N=>N!==h)),children:e.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(N=>N.value===h))==null?void 0:u.label]},h)})}):e.jsx(G,{children:f})]})}function ya({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const l=[];return t.forEach(w=>{l.some(c=>b.deepEqual(c,w))||l.push(w)}),l},[t]);return e.jsxs(Pt,{stickyHeader:!0,children:[e.jsx(Ft,{stickyHeader:!0,children:e.jsxs(nt,{children:[e.jsx(vt,{children:a}),e.jsx(vt,{children:o})]})}),e.jsx(Ot,{children:i.length>0&&i.map(l=>e.jsxs(nt,{onClick:()=>{n(l.reference)},children:[e.jsx(ft,{children:`${F.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),e.jsx(ft,{children:l.text})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const Ut=s.forwardRef(({className:t,...n},r)=>e.jsx(we.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(we.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));Ut.displayName=we.Root.displayName;const Nn=wt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Na=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(He.Root,{ref:o,className:d(Nn({variant:n,size:r,className:t})),...a}));Na.displayName=He.Root.displayName;const kn=s.createContext({size:"default",variant:"default"}),De=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},i)=>{const l=A();return e.jsx(qt.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:l,children:e.jsx(kn.Provider,{value:{variant:n,size:r},children:a})})});De.displayName=qt.Root.displayName;const It=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},i)=>{const l=s.useContext(kn);return e.jsx(qt.Item,{ref:i,className:d(Nn({variant:l.variant||r,size:l.size||a}),t),...o,children:n})});It.displayName=qt.Item.displayName;const Jt=t=>t==="asc"?e.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),ka=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Jt(n.getIsSorted())]})}),ja=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(E,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Jt(r.getIsSorted())]})}),Sa=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(E,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Jt(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),oe=(t,n,r,a,o,i)=>{let l=[...r];t.forEach(c=>{n==="approved"?l.includes(c)||l.push(c):l=l.filter(p=>p!==c)}),a(l);let w=[...o];t.forEach(c=>{n==="unapproved"?w.includes(c)||w.push(c):w=w.filter(p=>p!==c)}),i(w)},Ca=(t,n,r,a,o)=>({accessorKey:"status",header:({column:i})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(E,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Jt(i.getIsSorted())]})}),cell:({row:i})=>{const l=i.getValue("status"),w=i.getValue("item");return e.jsxs(De,{value:l,variant:"outline",type:"single",children:[e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"approved",n,r,a,o)},value:"approved",children:e.jsx(x.CircleCheckIcon,{})}),e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(x.CircleXIcon,{})}),e.jsx(It,{onClick:c=>{c.stopPropagation(),oe([w],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(x.CircleHelpIcon,{})})]})}}),Ra=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ta=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},_a=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},jn=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",za=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Ia=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Ma=(t,n,r)=>{const a=[];return t.forEach(o=>{const i=a.find(l=>b.deepEqual(l.items,b.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const l={items:b.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:jn(b.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(l)}}),a},at=(t,n)=>t[n]??n;function Ea({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:i,scope:l,onScopeChange:w,columns:c}){const p=at(r,"%webView_inventory_all%"),m=at(r,"%webView_inventory_approved%"),f=at(r,"%webView_inventory_unapproved%"),h=at(r,"%webView_inventory_unknown%"),u=at(r,"%webView_inventory_scope_currentBook%"),N=at(r,"%webView_inventory_scope_chapter%"),z=at(r,"%webView_inventory_filter_text%"),j=at(r,"%webView_inventory_show_additional_items%"),[y,k]=s.useState(!1),[I,q]=s.useState("all"),[U,lt]=s.useState(""),[dt,v]=s.useState([]),R=s.useMemo(()=>t.length===0?[]:Ma(t,o,i),[t,o,i]),$=s.useMemo(()=>{if(y)return R;const g=[];return R.forEach(T=>{const Z=T.items[0],ct=g.find(xt=>xt.items[0]===Z);ct?(ct.count+=T.count,ct.occurrences=ct.occurrences.concat(T.occurrences)):g.push({items:[Z],count:T.count,occurrences:T.occurrences,status:T.status})}),g},[y,R]),V=s.useMemo(()=>Ia($,I,U),[$,I,U]),ne=s.useMemo(()=>{var Z,ct;if(!y)return c;const g=(Z=a==null?void 0:a.tableHeaders)==null?void 0:Z.length;if(!g)return c;const T=[];for(let xt=0;xt<g;xt++)T.push(ja(((ct=a==null?void 0:a.tableHeaders)==null?void 0:ct[xt])||"Additional Item",xt+1));return[...T,...c]},[a==null?void 0:a.tableHeaders,c,y]);s.useEffect(()=>{V.length===0?v([]):V.length===1&&v(V[0].items)},[V]);const re=(g,T)=>{T.setRowSelection(()=>{const Z={};return Z[g.index]=!0,Z}),v(g.original.items)},S=g=>{if(g==="book"||g==="chapter")w(g);else throw new Error(`Invalid scope value: ${g}`)},M=g=>{if(g==="all"||g==="approved"||g==="unapproved"||g==="unknown")q(g);else throw new Error(`Invalid status filter value: ${g}`)},P=s.useMemo(()=>{if($.length===0||dt.length===0)return[];const g=$.filter(T=>b.deepEqual(y?T.items:[T.items[0]],dt));if(g.length>1)throw new Error("Selected item is not unique");return g.length===0?[]:g[0].occurrences},[dt,y,$]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(ht,{onValueChange:g=>M(g),defaultValue:I,children:[e.jsx(st,{className:"tw-m-1",children:e.jsx(gt,{placeholder:"Select filter"})}),e.jsxs(it,{children:[e.jsx(W,{value:"all",children:p}),e.jsx(W,{value:"approved",children:m}),e.jsx(W,{value:"unapproved",children:f}),e.jsx(W,{value:"unknown",children:h})]})]}),e.jsxs(ht,{onValueChange:g=>S(g),defaultValue:l,children:[e.jsx(st,{className:"tw-m-1",children:e.jsx(gt,{placeholder:"Select scope"})}),e.jsxs(it,{children:[e.jsx(W,{value:"book",children:u}),e.jsx(W,{value:"chapter",children:N})]})]}),e.jsx(bt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:z,value:U,onChange:g=>{lt(g.target.value)}}),a&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ut,{className:"tw-m-1",checked:y,onCheckedChange:g=>{k(g)}}),e.jsx(G,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??j})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(gn,{columns:ne,data:V,onRowClickHandler:re,stickyHeader:!0})}),P.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ya,{occurrenceData:P,setScriptureReference:n,localizedStrings:r})})]})}const Wt=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(Ke.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));Wt.displayName=Ke.Root.displayName;function Le({className:t,...n}){return e.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const Zt=Dt.Provider,Qt=Dt.Root,te=Dt.Trigger,At=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(Dt.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));At.displayName=Dt.Content.displayName;const Da="16rem",Ba="3rem",Sn=s.createContext(void 0);function ee(){const t=s.useContext(Sn);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Cn=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:i,side:l="primary",...w},c)=>{const[p,m]=s.useState(t),f=n??p,h=s.useCallback(I=>{const q=typeof I=="function"?I(f):I;r?r(q):m(q)},[r,f]),u=s.useCallback(()=>h(I=>!I),[h]),N=f?"expanded":"collapsed",y=A()==="ltr"?l:l==="primary"?"secondary":"primary",k=s.useMemo(()=>({state:N,open:f,setOpen:h,toggleSidebar:u,side:y}),[N,f,h,u,y]);return e.jsx(Sn.Provider,{value:k,children:e.jsx(Zt,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Da,"--sidebar-width-icon":Ba,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...w,children:i})})})});Cn.displayName="SidebarProvider";const Rn=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},i)=>{const l=ee();return n==="none"?e.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...o,children:a}):e.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":t,"data-side":l.side,children:[e.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});Rn.displayName="Sidebar";const Va=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=ee();return e.jsxs(E,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{n==null||n(i),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(x.PanelLeft,{}):e.jsx(x.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Va.displayName="SidebarTrigger";const Pa=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=ee();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});Pa.displayName="SidebarRail";const Tn=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));Tn.displayName="SidebarInset";const Fa=s.forwardRef(({className:t,...n},r)=>e.jsx(bt,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));Fa.displayName="SidebarInput";const Oa=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Oa.displayName="SidebarHeader";const Aa=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Aa.displayName="SidebarFooter";const Ga=s.forwardRef(({className:t,...n},r)=>e.jsx(Wt,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));Ga.displayName="SidebarSeparator";const _n=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));_n.displayName="SidebarContent";const de=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));de.displayName="SidebarGroup";const ce=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?yt.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ce.displayName="SidebarGroupLabel";const La=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?yt.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});La.displayName="SidebarGroupAction";const pe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...n}));pe.displayName="SidebarGroupContent";const zn=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));zn.displayName="SidebarMenu";const In=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...n}));In.displayName="SidebarMenuItem";const Xa=wt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Mn=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:i,...l},w)=>{const c=t?yt.Slot:"button",{state:p}=ee(),m=e.jsx(c,{ref:w,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(Xa({variant:r,size:a}),i),...l});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:m}),e.jsx(At,{side:"right",align:"center",hidden:p!=="collapsed",...o})]})):m});Mn.displayName="SidebarMenuButton";const qa=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const i=n?yt.Slot:"button";return e.jsx(i,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});qa.displayName="SidebarMenuAction";const $a=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));$a.displayName="SidebarMenuBadge";const Ya=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Le,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Le,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Ya.displayName="SidebarMenuSkeleton";const Ha=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Ha.displayName="SidebarMenuSub";const Ka=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Ka.displayName="SidebarMenuSubItem";const Ua=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},i)=>{const l=t?yt.Slot:"a";return e.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});Ua.displayName="SidebarMenuSubButton";function En({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:w,className:c}){const p=s.useCallback((h,u)=>{a(h,u)},[a]),m=s.useCallback(h=>{const u=r.find(N=>N.projectId===h);return u?u.projectName:h},[r]),f=s.useCallback(h=>!o.projectId&&h===o.label,[o]);return e.jsx(Rn,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:e.jsxs(_n,{children:[e.jsxs(de,{children:[e.jsx(ce,{className:"tw-text-sm",children:i}),e.jsx(pe,{children:e.jsx(zn,{children:Object.entries(n).map(([h,u])=>e.jsx(In,{children:e.jsx(Mn,{onClick:()=>p(h),isActive:f(h),children:e.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),e.jsxs(de,{children:[e.jsx(ce,{className:"tw-text-sm",children:l}),e.jsx(pe,{className:"tw-pl-3",children:e.jsx(Lt,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:h=>m(h),buttonPlaceholder:w,onChange:h=>{const u=m(h);p(u,h)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(x.ScrollText,{})})})]})]})})}function Be({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:i=!1}){const l=A();return e.jsxs("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[e.jsx(x.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),e.jsx(bt,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>n(w.target.value),disabled:i}),t&&e.jsxs(E,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{n("")},children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}function Ja({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:l,onSearch:w,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:m}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Be,{className:"tw-w-9/12",value:l,onSearch:w,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(Cn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(En,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:m}),e.jsx(Tn,{className:"tw-min-w-[215px]",children:a})]})]})}const ot="scrBook",Wa="scrRef",ut="source",Za="details",Qa="Scripture Reference",to="Scripture Book",Dn="Type",eo="Details";function no(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:ot,header:(t==null?void 0:t.scriptureReferenceColumnName)??Qa,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?F.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===ot?b.formatScrRef(o.start):void 0},getGroupingValue:a=>F.bookIdToNumber(a.start.book),sortingFn:(a,o)=>b.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>b.formatScrRef(a.start),id:Wa,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:b.formatScrRef(o.start)},sortingFn:(a,o)=>b.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:ut,header:r?(t==null?void 0:t.typeColumnName)??Dn:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:Za,header:(t==null?void 0:t.detailsColumnName)??eo,cell:a=>a.getValue(),enableGrouping:!1}]}const ro=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||b.compareScrRefs(t.start,t.end)===0?`${b.scrRefToBBBCCCVVV(t.start)}+${n}`:`${b.scrRefToBBBCCCVVV(t.start)}+${n}-${b.scrRefToBBBCCCVVV(t.end)}+${r}`},Xe=t=>`${ro({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function ao({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:l,onRowSelected:w}){const[c,p]=s.useState([]),[m,f]=s.useState([{id:ot,desc:!1}]),[h,u]=s.useState({}),N=s.useMemo(()=>t.flatMap(v=>v.data.map(R=>({...R,source:v.source}))),[t]),z=s.useMemo(()=>no({scriptureReferenceColumnName:a,typeColumnName:i,detailsColumnName:l},r),[a,i,l,r]);s.useEffect(()=>{c.includes(ut)?f([{id:ut,desc:!1},{id:ot,desc:!1}]):f([{id:ot,desc:!1}])},[c]);const j=X.useReactTable({data:N,columns:z,state:{grouping:c,sorting:m,rowSelection:h},onGroupingChange:p,onSortingChange:f,onRowSelectionChange:u,getExpandedRowModel:X.getExpandedRowModel(),getGroupedRowModel:X.getGroupedRowModel(),getCoreRowModel:X.getCoreRowModel(),getSortedRowModel:X.getSortedRowModel(),getRowId:Xe,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(w){const v=j.getSelectedRowModel().rowsById,R=Object.keys(v);if(R.length===1){const $=N.find(V=>Xe(V)===R[0])||void 0;$&&w($)}}},[h,N,w,j]);const y=o??to,k=i??Dn,I=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[ot]},{label:`Group by ${k}`,value:[ut]},{label:`Group by ${y} and ${k}`,value:[ot,ut]},{label:`Group by ${k} and ${y}`,value:[ut,ot]}],q=v=>{p(JSON.parse(v))},U=(v,R)=>{!v.getIsGrouped()&&!v.getIsSelected()&&v.getToggleSelectedHandler()(R)},lt=(v,R)=>v.getIsGrouped()?"":d("banded-row",R%2===0?"even":"odd"),dt=(v,R,$)=>{if(!((v==null?void 0:v.length)===0||R.depth<$.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(ht,{value:JSON.stringify(c),onValueChange:v=>{q(v)},children:[e.jsx(st,{className:"tw-mb-1 tw-mt-2",children:e.jsx(gt,{})}),e.jsx(it,{position:"item-aligned",children:e.jsx(dn,{children:I.map(v=>e.jsx(W,{value:JSON.stringify(v.value),children:v.label},v.label))})})]}),e.jsxs(Pt,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(Ft,{children:j.getHeaderGroups().map(v=>e.jsx(nt,{children:v.headers.filter(R=>R.column.columnDef.header).map(R=>e.jsx(vt,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:e.jsxs("div",{children:[R.column.getCanGroup()?e.jsx(E,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",X.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},v.id))}),e.jsx(Ot,{children:j.getRowModel().rows.map((v,R)=>{const $=A();return e.jsx(nt,{"data-state":v.getIsSelected()?"selected":"",className:d(lt(v,R)),onClick:V=>U(v,V),children:v.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==ut||!r)))return e.jsx(ft,{className:d(V.column.columnDef.id,"tw-p-[1px]",dt(c,v,V)),children:V.getIsGrouped()?e.jsxs(E,{variant:"link",onClick:v.getToggleExpandedHandler(),type:"button",children:[v.getIsExpanded()&&e.jsx(x.ChevronDown,{}),!v.getIsExpanded()&&($==="ltr"?e.jsx(x.ChevronRight,{}):e.jsx(x.ChevronLeft,{}))," ",X.flexRender(V.column.columnDef.cell,V.getContext())," (",v.subRows.length,")"]}):X.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},v.id)})})]})]})}const se={[b.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[b.getLocalizeKeyForScrollGroupId(0)]:"A",[b.getLocalizeKeyForScrollGroupId(1)]:"B",[b.getLocalizeKeyForScrollGroupId(2)]:"C",[b.getLocalizeKeyForScrollGroupId(3)]:"D",[b.getLocalizeKeyForScrollGroupId(4)]:"E",[b.getLocalizeKeyForScrollGroupId(5)]:"F",[b.getLocalizeKeyForScrollGroupId(6)]:"G",[b.getLocalizeKeyForScrollGroupId(7)]:"H",[b.getLocalizeKeyForScrollGroupId(8)]:"I",[b.getLocalizeKeyForScrollGroupId(9)]:"J",[b.getLocalizeKeyForScrollGroupId(10)]:"K",[b.getLocalizeKeyForScrollGroupId(11)]:"L",[b.getLocalizeKeyForScrollGroupId(12)]:"M",[b.getLocalizeKeyForScrollGroupId(13)]:"N",[b.getLocalizeKeyForScrollGroupId(14)]:"O",[b.getLocalizeKeyForScrollGroupId(15)]:"P",[b.getLocalizeKeyForScrollGroupId(16)]:"Q",[b.getLocalizeKeyForScrollGroupId(17)]:"R",[b.getLocalizeKeyForScrollGroupId(18)]:"S",[b.getLocalizeKeyForScrollGroupId(19)]:"T",[b.getLocalizeKeyForScrollGroupId(20)]:"U",[b.getLocalizeKeyForScrollGroupId(21)]:"V",[b.getLocalizeKeyForScrollGroupId(22)]:"W",[b.getLocalizeKeyForScrollGroupId(23)]:"X",[b.getLocalizeKeyForScrollGroupId(24)]:"Y",[b.getLocalizeKeyForScrollGroupId(25)]:"Z"};function oo({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o,className:i}){const l={...se,...Object.fromEntries(Object.entries(a).map(([c,p])=>[c,c===p&&c in se?se[c]:p]))},w=A();return e.jsxs(ht,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(st,{size:o,className:d("pr-twp tw-w-auto",i),children:e.jsx(gt,{placeholder:l[b.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(it,{align:w==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(W,{value:`${c}`,children:l[b.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function so({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function io({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function wo({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(Wt,{}):""]})}function Bn(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function Xt({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Vn=(t,n,r,a)=>r?Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>n.filter(w=>w.group===i).sort((w,c)=>w.order-c.order).map(w=>e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:"command"in w?e.jsxs(Yt,{onClick:()=>{a(w)},children:[w.iconPathBefore&&e.jsx(Xt,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&e.jsx(Xt,{icon:w.iconPathAfter,menuLabel:w.label})]},`dropdown-menu-item-${w.label}-${w.command}`):e.jsxs(Je,{children:[e.jsx(ge,{children:w.label}),e.jsx(Ue,{children:e.jsx(fe,{children:Vn(t,n,Bn(t,w.id),a)})})]},`dropdown-menu-sub-${w.label}-${w.id}`)}),w.tooltip&&e.jsx(At,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`))):void 0;function ue({commandHandler:t,menuData:n,tabLabel:r,icon:a,className:o,variant:i,id:l}){return e.jsxs(Bt,{variant:i,children:[e.jsx($t,{"aria-label":r,className:o,asChild:!0,id:l,children:e.jsx(E,{variant:"ghost",size:"icon",children:a??e.jsx(x.MenuIcon,{})})}),e.jsx(kt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,c])=>typeof w=="boolean"||typeof c=="boolean"?0:w.order-c.order).map(([w],c,p)=>e.jsxs(s.Fragment,{children:[e.jsx(he,{children:e.jsx(Zt,{children:Vn(n.groups,n.items,w,t)})}),c<p.length-1&&e.jsx(jt,{})]},w))})]})}function lo({projectMenuCommandHandler:t,viewInfoMenuCommandHandler:n,projectMenuData:r,tabViewMenuData:a,id:o,className:i,startAreaChildren:l,centerAreaChildren:w,endAreaChildren:c}){return e.jsxs("div",{className:d("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",i),id:o,children:[r&&e.jsx(ue,{commandHandler:t,menuData:r,tabLabel:"Project",icon:e.jsx(x.Menu,{}),className:"tw-h-full tw-w-8"}),e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:w}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&e.jsx(ue,{commandHandler:n,menuData:a,tabLabel:"View Info",icon:e.jsx(x.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}const Ve=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsx(K.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});Ve.displayName=K.List.displayName;const Pe=s.forwardRef(({className:t,...n},r)=>e.jsx(K.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Pe.displayName=K.List.displayName;const Pn=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Fe=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Fe.displayName=K.Content.displayName;function co({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:i}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(Be,{className:i,value:n,onSearch:r,placeholder:a})]}),e.jsxs(Ve,{children:[e.jsx(Pe,{children:t.map(l=>e.jsx(Pn,{value:l.value,children:l.value},l.key))}),t.map(l=>e.jsx(Fe,{value:l.value,children:l.content},l.key))]})]})}function po({...t}){return e.jsx(B.Menu,{...t})}function uo({...t}){return e.jsx(B.Sub,{"data-slot":"menubar-sub",...t})}const Fn=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx(me.Provider,{value:o,children:e.jsx(B.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Fn.displayName=B.Root.displayName;const On=s.forwardRef(({className:t,...n},r)=>{const a=Q();return e.jsx(B.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",rt({variant:a.variant,className:t})),...n})});On.displayName=B.Trigger.displayName;const An=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=Q();return e.jsxs(B.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",rt({variant:i.variant,className:t}),t),...a,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});An.displayName=B.SubTrigger.displayName;const Gn=s.forwardRef(({className:t,...n},r)=>{const a=Q();return e.jsx(B.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});Gn.displayName=B.SubContent.displayName;const Ln=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},i)=>{const l=Q();return e.jsx(B.Portal,{children:e.jsx(B.Content,{ref:i,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...o})})});Ln.displayName=B.Content.displayName;const Xn=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=Q();return e.jsx(B.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",rt({variant:o.variant,className:t}),t),...r})});Xn.displayName=B.Item.displayName;const mo=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=Q();return e.jsxs(B.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",rt({variant:i.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});mo.displayName=B.CheckboxItem.displayName;const ho=s.forwardRef(({className:t,children:n,...r},a)=>{const o=Q();return e.jsxs(B.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",rt({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});ho.displayName=B.RadioItem.displayName;const go=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(B.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));go.displayName=B.Label.displayName;const qn=s.forwardRef(({className:t,...n},r)=>e.jsx(B.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));qn.displayName=B.Separator.displayName;const _t=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},$n=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return o.flatMap(([i],l)=>{const w=n.filter(p=>p.group===i).sort((p,m)=>p.order-m.order).map(p=>e.jsxs(Qt,{children:[e.jsx(te,{asChild:!0,children:"command"in p?e.jsxs(Xn,{onClick:()=>{a(p)},children:[p.iconPathBefore&&e.jsx(Xt,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0}),p.label,p.iconPathAfter&&e.jsx(Xt,{icon:p.iconPathAfter,menuLabel:p.label})]},`menubar-item-${p.label}-${p.command}`):e.jsxs(uo,{children:[e.jsx(An,{children:p.label}),e.jsx(Gn,{children:$n(t,n,Bn(t,p.id),a)})]},`menubar-sub-${p.label}-${p.id}`)}),p.tooltip&&e.jsx(At,{children:p.tooltip})]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`)),c=[...w];return w.length>0&&l<o.length-1&&c.push(e.jsx(qn,{},`separator-${i}`)),c})};function fo({menuData:t,commandHandler:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),i=s.useRef(void 0),l=s.useRef(void 0),w=s.useRef(void 0),c=s.useRef(void 0),p=m=>{switch(m){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return w;case"platform.help":return c;default:return}};if(Sr.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(m,f)=>{var N,z,j,y;m.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":_t(i,[h]);break;case"alt+p":(N=i.current)==null||N.focus(),_t(i,[h,u]);break;case"alt+l":(z=l.current)==null||z.focus(),_t(l,[h,u]);break;case"alt+n":(j=w.current)==null||j.focus(),_t(w,[h,u]);break;case"alt+h":(y=c.current)==null||y.focus(),_t(c,[h,u]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const m=new MutationObserver(u=>{u.forEach(N=>{if(N.attributeName==="data-state"&&N.target instanceof HTMLElement){const z=N.target.getAttribute("data-state");r(z==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(u=>{m.observe(u,{attributes:!0})}),()=>m.disconnect()},[r]),!!t)return e.jsx(Fn,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,m])=>typeof m=="object").sort(([,m],[,f])=>typeof m=="boolean"||typeof f=="boolean"?0:m.order-f.order).map(([m,f])=>e.jsxs(po,{children:[e.jsx(On,{ref:p(m),children:typeof f=="object"&&"label"in f&&f.label}),e.jsx(Ln,{className:"tw-z-[250]",children:e.jsx(Zt,{children:$n(t.groups,t.items,m,n)})})]},m))})}function bo(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function xo({menuData:t,onOpenChange:n,commandHandler:r,className:a,id:o,children:i,appMenuAreaChildren:l,configAreaChildren:w,shouldUseAsAppDragArea:c,menubarVariant:p="default"}){const m=s.useRef(void 0);return e.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:m,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&e.jsx(fo,{menuData:t,onOpenChange:n,commandHandler:r,variant:p})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:w})})]})})}const vo=(t,n)=>t[n]??n;function yo({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:l,className:w}){const c=vo(l,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,m]=s.useState(!1),f=u=>{o&&o(u),a&&a([u,...r.filter(N=>N!==u)]),i&&r.find(N=>N===u)&&i([...r.filter(N=>N!==u)]),m(!1)},h=(u,N)=>{var j,y,k,I,q,U;const z=N!==u?((y=(j=t[u])==null?void 0:j.uiNames)==null?void 0:y[N])??((I=(k=t[u])==null?void 0:k.uiNames)==null?void 0:I.en):void 0;return z?`${(q=t[u])==null?void 0:q.autonym} (${z})`:(U=t[u])==null?void 0:U.autonym};return e.jsxs("div",{className:d("pr-twp tw-max-w-sm",w),children:[e.jsxs(ht,{name:"uiLanguage",value:n,onValueChange:f,open:p,onOpenChange:u=>m(u),children:[e.jsx(st,{children:e.jsx(gt,{})}),e.jsx(it,{className:"tw-z-[250]",children:Object.keys(t).map(u=>e.jsx(W,{value:u,children:h(u,n)},u))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(G,{className:"tw-ms-3",children:c}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(G,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(u=>h(u,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function No({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(G,{children:n(t)}):r?e.jsx(G,{children:r(t)}):e.jsx(G,{children:t})}function ko({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:i,createComplexLabel:l}){return e.jsx("div",{id:t,className:n,children:r.map(w=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Ut,{className:"tw-me-2 tw-align-middle",checked:a.includes(w),onCheckedChange:c=>o(w,c)}),e.jsx(No,{item:w,createLabel:i,createComplexLabel:l})]},w))})}function jo({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:i,placeholder:l,isRequired:w=!1,className:c,defaultValue:p,value:m,onChange:f,onFocus:h,onBlur:u}){return e.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(G,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${w?"*":""}`}),e.jsx(bt,{id:t,disabled:n,placeholder:l,required:w,className:d(c,{"tw-border-red-600":r}),defaultValue:p,value:m,onChange:f,onFocus:h,onBlur:u}),e.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}const So=wt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Yn=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:d(So({variant:n}),t),...r}));Yn.displayName="Alert";const Hn=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Hn.displayName="AlertTitle";const Kn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Kn.displayName="AlertDescription";const Un=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));Un.displayName=Nt.Root.displayName;const Jn=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Jn.displayName=Nt.Image.displayName;const Wn=s.forwardRef(({className:t,...n},r)=>e.jsx(Nt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));Wn.displayName=Nt.Fallback.displayName;const Zn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Zn.displayName="Card";const Qn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Qn.displayName="CardHeader";const tr=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));tr.displayName="CardTitle";const er=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));er.displayName="CardDescription";const nr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...n}));nr.displayName="CardContent";const rr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));rr.displayName="CardFooter";function Co({...t}){return e.jsx($e.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ar=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsxs(zt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(zt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(zt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(zt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ar.displayName=zt.Root.displayName;const or=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsx(le.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(le.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});or.displayName=le.Root.displayName;const Ro=K.Root,sr=s.forwardRef(({className:t,...n},r)=>{const a=A();return e.jsx(K.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});sr.displayName=K.List.displayName;const ir=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));ir.displayName=K.Trigger.displayName;const wr=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));wr.displayName=K.Content.displayName;const To=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function _o(t){return{preserveValue:!0,...t}}const lr=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=_o(o.current);const[i,l]=s.useState(()=>a.current),[w,c]=s.useState(!0);return s.useEffect(()=>{let p=!0;return c(!!t),(async()=>{if(t){const m=await t();p&&(l(()=>m),c(!1))}})(),()=>{p=!1,o.current.preserveValue||l(()=>a.current)}},[t]),[i,w]},ie=()=>!1,zo=(t,n)=>{const[r]=lr(s.useCallback(async()=>{if(!t)return ie;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),ie,{preserveValue:!1});s.useEffect(()=>()=>{r!==ie&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>$e.toast});exports.Alert=Yn;exports.AlertDescription=Kn;exports.AlertTitle=Hn;exports.Avatar=Un;exports.AvatarFallback=Wn;exports.AvatarImage=Jn;exports.BOOK_SELECTOR_STRING_KEYS=ia;exports.Badge=Ee;exports.BookChapterControl=Qr;exports.BookSelectionMode=ln;exports.BookSelector=wa;exports.Button=E;exports.Card=Zn;exports.CardContent=nr;exports.CardDescription=er;exports.CardFooter=rr;exports.CardHeader=Qn;exports.CardTitle=tr;exports.ChapterRangeSelector=wn;exports.Checkbox=Ut;exports.Checklist=ko;exports.ComboBox=Lt;exports.DataTable=gn;exports.DisableButton=ua;exports.DropdownMenu=Bt;exports.DropdownMenuCheckboxItem=Ht;exports.DropdownMenuContent=kt;exports.DropdownMenuGroup=he;exports.DropdownMenuItem=Yt;exports.DropdownMenuItemType=bn;exports.DropdownMenuLabel=Vt;exports.DropdownMenuPortal=Ue;exports.DropdownMenuRadioGroup=Mr;exports.DropdownMenuRadioItem=be;exports.DropdownMenuSeparator=jt;exports.DropdownMenuShortcut=We;exports.DropdownMenuSub=Je;exports.DropdownMenuSubContent=fe;exports.DropdownMenuSubTrigger=ge;exports.DropdownMenuTrigger=$t;exports.EnableButton=pa;exports.Filter=va;exports.FilterButton=fn;exports.FilterDropdown=ga;exports.Footer=xa;exports.INVENTORY_STRING_KEYS=za;exports.Input=bt;exports.InstallButton=ca;exports.Inventory=Ea;exports.Label=G;exports.MarkdownRenderer=ha;exports.MoreInfo=ba;exports.MultiSelectComboBox=yn;exports.NavigationContentSearch=co;exports.NoExtensionsFound=fa;exports.Popover=je;exports.PopoverContent=Kt;exports.PopoverTrigger=Se;exports.RadioGroup=ke;exports.RadioGroupItem=Gt;exports.ScriptureResultsViewer=ao;exports.ScrollGroupSelector=oo;exports.SearchBar=Be;exports.Select=ht;exports.SelectContent=it;exports.SelectGroup=dn;exports.SelectItem=W;exports.SelectLabel=pn;exports.SelectScrollDownButton=Me;exports.SelectScrollUpButton=Ie;exports.SelectSeparator=un;exports.SelectTrigger=st;exports.SelectValue=gt;exports.Separator=Wt;exports.SettingsList=so;exports.SettingsListHeader=wo;exports.SettingsListItem=io;exports.SettingsSidebar=En;exports.SettingsSidebarContentSearch=Ja;exports.Slider=ar;exports.Sonner=Co;exports.Spinner=Ct;exports.Switch=or;exports.TabDropdownMenu=ue;exports.TabToolbar=lo;exports.Table=Pt;exports.TableBody=Ot;exports.TableCaption=hn;exports.TableCell=ft;exports.TableFooter=mn;exports.TableHead=vt;exports.TableHeader=Ft;exports.TableRow=nt;exports.Tabs=Ro;exports.TabsContent=wr;exports.TabsList=sr;exports.TabsTrigger=ir;exports.TextField=jo;exports.ToggleGroup=De;exports.ToggleGroupItem=It;exports.Toolbar=xo;exports.Tooltip=Qt;exports.TooltipContent=At;exports.TooltipProvider=Zt;exports.TooltipTrigger=te;exports.UiLanguageSelector=yo;exports.UpdateButton=ma;exports.VersionHistory=xn;exports.VerticalTabs=Ve;exports.VerticalTabsContent=Fe;exports.VerticalTabsList=Pe;exports.VerticalTabsTrigger=Pn;exports.badgeVariants=vn;exports.buttonVariants=an;exports.cn=d;exports.getBookIdFromUSFM=_a;exports.getLinesFromUSFM=Ra;exports.getNumberFromUSFM=Ta;exports.getStatusForItem=jn;exports.getToolbarOSReservedSpaceClassName=bo;exports.inventoryCountColumn=Sa;exports.inventoryItemColumn=ka;exports.inventoryStatusColumn=Ca;exports.selectTriggerVariants=cn;exports.useEvent=To;exports.useEventAsync=zo;exports.usePromise=lr;function Io(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}Io(`*, ::before, ::after {
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
.tw-max-w-48 {
  max-width: 12rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-basis-32 {
  flex-basis: 8rem;
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
.tw-flex-row-reverse {
  flex-direction: row-reverse;
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
.tw-gap-8 {
  gap: 2rem;
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
.tw-overflow-clip {
  overflow: clip;
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
.tw-border-s-yellow-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
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
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
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
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
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
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
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
