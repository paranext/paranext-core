"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),v=require("lucide-react"),ra=require("clsx"),aa=require("tailwind-merge"),kt=require("class-variance-authority"),Nn=require("@radix-ui/react-dropdown-menu"),x=require("platform-bible-utils"),Ft=require("@radix-ui/react-slot"),oa=require("@radix-ui/react-label"),sa=require("@radix-ui/react-radio-group"),ia=require("@radix-ui/react-popover"),tt=require("cmdk"),wa=require("@radix-ui/react-dialog"),W=require("@tanstack/react-table"),la=require("@radix-ui/react-select"),da=require("markdown-to-jsx"),ca=require("@radix-ui/react-checkbox"),pa=require("@radix-ui/react-toggle-group"),ua=require("@radix-ui/react-toggle"),ma=require("@radix-ui/react-separator"),ha=require("@radix-ui/react-tooltip"),ga=require("@radix-ui/react-tabs"),fa=require("@radix-ui/react-menubar"),ba=require("react-hotkeys-hook"),xa=require("@radix-ui/react-avatar"),wt=require("vaul"),va=require("@radix-ui/react-progress"),kn=require("sonner"),ya=require("@radix-ui/react-slider"),Na=require("@radix-ui/react-switch");function J(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const F=J(Nn),jn=J(oa),Ut=J(sa),Jt=J(ia),ct=J(wa),L=J(la),Ae=J(ca),be=J(pa),Cn=J(ua),Sn=J(ma),Qt=J(ha),et=J(ga),G=J(fa),Gt=J(xa),Fe=J(va),Ht=J(ya),Ge=J(Na),ka=aa.extendTailwindMerge({prefix:"tw-"});function d(...t){return ka(ra.clsx(t))}const It=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));It.displayName="Input";const ja=s.forwardRef(({handleSearch:t,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,hasTopMatch:i,hasNoMatches:w,hasInputChanged:l,...c},p)=>{const[g,b]=s.useState(!1);return e.jsxs("div",{className:"tw-relative tw-max-w-48",children:[e.jsx(It,{...c,type:"text",className:d("tw-relative tw-w-full tw-min-w-0 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-text-ellipsis tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 !tw-pe-10 tw-ps-4 tw-font-medium tw-text-foreground tw-shadow-none tw-outline-none",l&&(i?"focus-visible:tw-ring-green-600":w&&"focus-visible:tw-ring-destructive"),o),onChange:h=>t(h.target.value),onKeyDown:h=>{h.key==="Enter"?(a(),h.preventDefault()):n(h)},onClick:r,onFocus:h=>{var m;b(!0),(m=c.onFocus)==null||m.call(c,h)},onBlur:h=>{var m;b(!1),(m=c.onBlur)==null||m.call(c,h)},ref:p}),g&&l&&(i?e.jsx(v.Check,{className:"tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-green-600"}):w&&e.jsx(v.CircleSlash,{className:"tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-destructive"}))]})}),Ye=s.createContext(void 0);function lt(){const t=s.useContext(Ye);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ut=kt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ca="layoutDirection";function q(){const t=localStorage.getItem(Ca);return t==="rtl"?t:"ltr"}const xe=F.Trigger,qe=F.Group,_n=F.Portal,Tn=F.Sub,Sa=F.RadioGroup;function te({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(Ye.Provider,{value:r,children:e.jsx(F.Root,{...n})})}const Ue=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=lt();return e.jsxs(F.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,ut({variant:i.variant})),...a,children:[r,e.jsx(v.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ue.displayName=F.SubTrigger.displayName;const Je=s.forwardRef(({className:t,...n},r)=>e.jsx(F.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Je.displayName=F.SubContent.displayName;const Lt=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const i=q();return e.jsx(F.Portal,{children:e.jsx(F.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:i,children:r})})})});Lt.displayName=F.Content.displayName;const ee=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=q(),i=lt();return e.jsx(F.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,ut({variant:i.variant})),...r,dir:o})});ee.displayName=F.Item.displayName;const ve=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=lt();return e.jsxs(F.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ut({variant:i.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(F.ItemIndicator,{children:e.jsx(v.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});ve.displayName=F.CheckboxItem.displayName;const We=s.forwardRef(({className:t,children:n,...r},a)=>{const o=lt();return e.jsxs(F.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ut({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(F.ItemIndicator,{children:e.jsx(v.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});We.displayName=F.RadioItem.displayName;const ne=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(F.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));ne.displayName=F.Label.displayName;const Et=s.forwardRef(({className:t,...n},r)=>e.jsx(F.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Et.displayName=F.Separator.displayName;function Rn({className:t,...n}){return e.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}Rn.displayName="DropdownMenuShortcut";var _a=Object.defineProperty,Ta=(t,n,r)=>n in t?_a(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,E=(t,n,r)=>Ta(t,typeof n!="symbol"?n+"":n,r);const Dt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ze=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],En=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],un=Ba();function Xt(t,n=!0){return n&&(t=t.toUpperCase()),t in un?un[t]:0}function Qe(t){return Xt(t)>0}function Ra(t){const n=typeof t=="string"?Xt(t):t;return n>=40&&n<=66}function Ea(t){return(typeof t=="string"?Xt(t):t)<=39}function Dn(t){return t<=66}function Da(t){const n=typeof t=="string"?Xt(t):t;return On(n)&&!Dn(n)}function*Ma(){for(let t=1;t<=Dt.length;t++)yield t}const Va=1,Mn=Dt.length;function Oa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function tn(t,n="***"){const r=t-1;return r<0||r>=Dt.length?n:Dt[r]}function Vn(t){return t<=0||t>Mn?"******":En[t-1]}function Ia(t){return Vn(Xt(t))}function On(t){const n=typeof t=="number"?tn(t):t;return Qe(n)&&!Ze.includes(n)}function za(t){const n=typeof t=="number"?tn(t):t;return Qe(n)&&Ze.includes(n)}function Pa(t){return En[t-1].includes("*obsolete*")}function Ba(){const t={};for(let n=0;n<Dt.length;n++)t[Dt[n]]=n+1;return t}const O={allBookIds:Dt,nonCanonicalIds:Ze,bookIdToNumber:Xt,isBookIdValid:Qe,isBookNT:Ra,isBookOT:Ea,isBookOTNT:Dn,isBookDC:Da,allBookNumbers:Ma,firstBook:Va,lastBook:Mn,extraBooks:Oa,bookNumberToId:tn,bookNumberToEnglishName:Vn,bookIdToEnglishName:Ia,isCanonical:On,isExtraMaterial:za,isObsolete:Pa};var dt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(dt||{});const nt=class{constructor(n){if(E(this,"name"),E(this,"fullPath"),E(this,"isPresent"),E(this,"hasVerseSegments"),E(this,"isCustomized"),E(this,"baseVersification"),E(this,"scriptureBooks"),E(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=dt[n]):(this._type=n,this.name=dt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};E(nt,"Original",new nt(dt.Original)),E(nt,"Septuagint",new nt(dt.Septuagint)),E(nt,"Vulgate",new nt(dt.Vulgate)),E(nt,"English",new nt(dt.English)),E(nt,"RussianProtestant",new nt(dt.RussianProtestant)),E(nt,"RussianOrthodox",new nt(dt.RussianOrthodox));let Tt=nt;function mn(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var In=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(In||{});const Q=class V{constructor(n,r,a,o){if(E(this,"firstChapter"),E(this,"lastChapter"),E(this,"lastVerse"),E(this,"hasSegmentsDefined"),E(this,"text"),E(this,"BBBCCCVVVS"),E(this,"longHashCode"),E(this,"versification"),E(this,"rtlMark","‏"),E(this,"_bookNum",0),E(this,"_chapterNum",0),E(this,"_verseNum",0),E(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,w=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(w),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(i),this._verseNum=n%V.chapterDigitShifter,this._chapterNum=Math.floor(n%V.bookDigitShifter/V.chapterDigitShifter),this._bookNum=Math.floor(n/V.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof V){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof Tt?n:V.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??V.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new V(n),{success:!0,verseRef:r}}catch(a){if(a instanceof $t)return r=new V,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%V.bcvMaxValue*V.bookDigitShifter+(r>=0?r%V.bcvMaxValue*V.chapterDigitShifter:0)+(a>=0?a%V.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:i,versificationStr:w}=n,l=i||o.toString();let c;return w&&(c=new Tt(w)),r?new V(r,a.toString(),l,c):new V}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>V.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(V.verseRangeSeparator)||this._verse.includes(V.verseSequenceIndicator))}get book(){return O.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=O.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=V.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=V.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>O.lastBook)throw new $t("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Tt(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(V.verseRangeSeparators,V.verseSequenceIndicators)}get BBBCCC(){return V.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return V.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Tt(dt[w])}catch{throw new $t("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new $t("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||O.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!V.isVerseParseable(a[1]))throw new $t("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new V(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof V?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=V.verseRangeSeparators,a=V.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=mn(this._verse,a);for(const w of i.map(l=>mn(l,r))){const l=this.clone();l.verse=w[0];const c=l.verseNum;if(o.push(l),w.length>1){const p=this.clone();if(p.verse=w[1],!n)for(let g=c+1;g<p.verseNum;g++){const b=new V(this._bookNum,this._chapterNum,g,this.versification);this.isExcluded||o.push(b)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const w=o.BBBCCCVVV;if(a>w)return 3;if(a===w)return 4;a=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>O.lastBook?2:(O.isCanonical(this._bookNum),0)}setEmpty(n=V.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=O.bookIdToNumber(n),this.chapter=r,this.verse=a}};E(Q,"defaultVersification",Tt.English),E(Q,"verseRangeSeparator","-"),E(Q,"verseSequenceIndicator",","),E(Q,"verseRangeSeparators",[Q.verseRangeSeparator]),E(Q,"verseSequenceIndicators",[Q.verseSequenceIndicator]),E(Q,"chapterDigitShifter",1e3),E(Q,"bookDigitShifter",Q.chapterDigitShifter*Q.chapterDigitShifter),E(Q,"bcvMaxValue",Q.chapterDigitShifter-1),E(Q,"ValidStatusType",In);class $t extends Error{}const Aa=s.forwardRef(({bookId:t,handleSelectBook:n,shouldExpandChildren:r,handleHighlightBook:a,handleKeyDown:o,bookType:i,children:w},l)=>e.jsxs(ee,{ref:l,textValue:t,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[e.jsx("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":i.toLowerCase()==="ot","tw-border-s-purple-200":i.toLowerCase()==="nt","tw-border-s-indigo-200":i.toLowerCase()==="dc"}),children:O.bookIdToEnglishName(t)}),r&&e.jsx("div",{children:w})]},t));function Fa({handleSelectChapter:t,endChapter:n,selectedChapter:r,highlightedChapter:a,handleHighlightedChapter:o,matchingChapters:i}){const w=Array.from({length:n},(c,p)=>p+1),l=s.useCallback(c=>{o(c)},[o]);return e.jsx("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:w.map(c=>e.jsx("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":c===r,"tw-bg-amber-200":c===a,"tw-pointer-events-none tw-bg-accent tw-opacity-50":i&&!i.includes(c)}),onClick:p=>{p.preventDefault(),p.stopPropagation(),t(c)},role:"button",onKeyDown:p=>{p.key==="Enter"&&t(c)},tabIndex:0,onMouseMove:()=>l(c),children:c},c))})}const hn=6,en=O.allBookIds.filter(t=>!O.isObsolete(O.bookIdToNumber(t))),zn=Object.fromEntries(en.map(t=>[t,O.bookIdToEnglishName(t)])),Ga={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},La=["OT","NT","DC"],Xa=96,Yt={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i,EXTRACT_BOOK_FROM_REFERENCE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+\d+:\d+$/,EXTRACT_BOOK_CHAPTER_FROM_REFERENCE:/^([^:\s]+(?:\s+[^:\s]+)*\s+\d+):\d+$/},gn=[Yt.BOOK_ONLY,Yt.BOOK_CHAPTER,Yt.BOOK_CHAPTER_VERSE],fn=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"]),Pt=t=>x.getChaptersForBook(O.bookIdToNumber(t));function bn(t){const n=en.find(r=>zn[r].toLowerCase()===t.toLowerCase());if(n)return n}function $a({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=q(),[i,w]=s.useState(()=>x.formatScrRef(t,"English")),[l,c]=s.useState(""),[p,g]=s.useState(t.book),[b,h]=s.useState(t.chapterNum??0),[m,C]=s.useState(t.book),[T,k]=s.useState(!1),[y,_]=s.useState(T),[D,P]=s.useState(!1),[I,mt]=s.useState(),$=s.useRef(void 0),N=s.useRef(void 0),f=s.useRef(void 0),z=s.useRef(void 0),R=s.useCallback(u=>{if(u.trim())return gn.reduce((M,S)=>{if(M)return M;const K=S.exec(u);if(K){const[A,Ct=void 0,me=void 0]=K.slice(1),at=bn(A)??(O.isBookIdValid(A)?A.toLocaleUpperCase():void 0);if(at){const it=Ct?parseInt(Ct,10):void 0;if(it&&it>Pt(at))return;const ft=me?parseInt(me,10):void 0;return{book:at,chapterNum:it,verseNum:ft}}}},void 0)},[]),Y=s.useMemo(()=>{if(!(!I||!I.chapterNum))return I.verseNum?[I.chapterNum]:Array.from({length:Pt(m)},(u,M)=>M+1).filter(u=>{var M;return(I==null?void 0:I.chapterNum)&&u.toString().includes((M=I==null?void 0:I.chapterNum)==null?void 0:M.toString())})},[m,I]),st=s.useMemo(()=>{const u=R(i.trim());return u?u.book!==t.book||(u.chapterNum??0)!==t.chapterNum||(u.verseNum??0)!==t.verseNum:!0},[i,t,R]),ht=s.useMemo(()=>!!I&&st,[I,st]),jt=s.useCallback(u=>{const M=a?a():en;return{OT:M.filter(S=>O.isBookOT(S)),NT:M.filter(S=>O.isBookNT(S)),DC:M.filter(S=>O.isBookDC(S))}[u].filter(S=>{const K=zn[S].toLowerCase(),A=l.length>0&&/^\d/.test(l)?l.charAt(0)+l.slice(1).replace(/[^a-zA-Z]/g,"").toLowerCase():l.replace(/[^a-zA-Z]/g,"").toLowerCase();return ht?K===A||S.toLowerCase()===A:K.includes(A)||S.toLowerCase().includes(A)})},[a,ht,l]),U=s.useMemo(()=>La.map(u=>({bookType:u,books:jt(u)})).filter(u=>u.books.length>0),[jt]),j=s.useMemo(()=>U.reduce((u,M)=>u+M.books.length,0),[U]),X=s.useCallback(u=>{w(u),c(u),mt(R(u.trim()))},[R]),rt=s.useRef(!1),Z=s.useCallback(()=>{w(x.formatScrRef(t,"English")),c(""),g(t.book),C(t.book)},[t]),gt=s.useCallback(u=>{if(rt.current){rt.current=!1;return}k(u)},[]),zt=s.useCallback((u,M,S,K)=>{if(h(t.book!==u?1:t.chapterNum),M||Pt(u)===-1){n({book:u,chapterNum:S??1,verseNum:K??1}),k(!1),c("");return}g(p!==u?u:""),k(!M)},[n,t.book,t.chapterNum,p]),Zr=u=>{u<=0||u>Pt(p)||zt(p,!0,u)},pn=s.useCallback(()=>{gn.forEach(u=>{const M=u.exec(l);if(M){const[S,K=void 0,A=void 0]=M.slice(1),Ct=bn(S);(O.isBookIdValid(S)||Ct)&&zt(Ct??S,!0,K?parseInt(K,10):1,A?parseInt(A,10):1)}})},[zt,l]),Qr=s.useCallback(u=>{if(!T)u.key!=="Tab"&&u.key!=="Escape"&&k(!0);else if(u.key==="Tab"){u.preventDefault(),u.stopPropagation();return}else u.key==="ArrowDown"?(z!=null&&z.current?z.current.focus():f!=null&&f.current?f.current.focus():N.current&&N.current.focus(),u.preventDefault()):u.key==="Escape"&&document.activeElement===$.current&&(k(!1),u.preventDefault(),u.stopPropagation());if(document.activeElement===$.current){if(/^[a-zA-Z]$/.test(u.key)&&(X(st?l+u.key:u.key),P(!0),u.preventDefault()),/^\d$/.test(u.key)){const M=i;if(D)X(l+u.key);else{const S=M.match(Yt.EXTRACT_BOOK_FROM_REFERENCE);if(S){const A=`${S[1]} ${u.key}`;X(A),P(!0)}}u.preventDefault()}if(!D&&u.key===":"){const S=i.match(Yt.EXTRACT_BOOK_CHAPTER_FROM_REFERENCE);if(S){const K=S[1],A=K.endsWith(":")?`${K}`:`${K}:`;X(A),P(!0),u.preventDefault()}}x.MODIFIER_KEYS.has(u.key)||P(!0)}},[T,D,X,st,l,i]),ue=s.useCallback(u=>{x.MODIFIER_KEYS.has(u.key)||(u.key==="Tab"&&u.shiftKey&&($.current.focus(),u.preventDefault()),u.stopPropagation(),$.current.focus(),$.current.dispatchEvent(new KeyboardEvent("keydown",{...u,view:void 0})))},[]),ta=s.useCallback(u=>{const{key:M}=u;fn.has(M)||(ue(u),u.preventDefault())},[ue]),ea=s.useCallback(u=>{const{key:M}=u;M==="ArrowUp"&&(u.preventDefault(),$.current.focus())},[]),na=s.useCallback((u,M)=>{const{key:S}=u;if(fn.has(S)){if(m===p||j===1){const A=j===1?m:p;if(S==="Enter"){u.preventDefault(),zt(A,!0,b);return}const Ct=S==="ArrowRight"&&!o||S==="ArrowRight"&&o==="ltr"||S==="ArrowLeft"&&o==="rtl",me=S==="ArrowLeft"&&!o||S==="ArrowLeft"&&o==="ltr"||S==="ArrowRight"&&o==="rtl",Me=Array.from({length:Pt(m)},(he,St)=>St+1),at=p!==m||j===1?Y??Me:Me,it=at.indexOf(b);let ft=b;if(Ct)if(it>=0&&it<at.length-1)ft=at[it+1];else{u.preventDefault();return}else if(me)if(it>0)ft=at[it-1];else{u.preventDefault();return}else if(S==="ArrowDown"){const he=at[it]+hn,St=at.find(Ve=>Ve>=he);St!==void 0&&(ft=St)}else if(S==="ArrowUp"){const he=at[it]-hn,St=at.slice().reverse().find(Ve=>Ve<=he);St!==void 0&&(ft=St)}if(ft!==b){h(ft),u.preventDefault();return}}if(M===0&&S==="ArrowUp"&&!ht){u.preventDefault(),$.current.focus();return}return}ue(u),u.preventDefault(),u.stopPropagation()},[o,m,b,ht,ue,p,Y,j,zt]);return s.useEffect(()=>{j===1?h(1):p===m?p===t.book?h(t.chapterNum):h(1):h(0)},[m,t.book,t.chapterNum,p,j]),s.useEffect(()=>{if(!Y||j>1)return;Y.indexOf(b)===-1&&h(Y[0])},[m,b,p,Y,j]),s.useEffect(()=>{Z()},[Z]),s.useEffect(()=>{},[T,Z]),s.useLayoutEffect(()=>{_(T)},[T]),s.useLayoutEffect(()=>{const u=setTimeout(()=>{var M,S;if(y&&N.current&&f.current){const A=f.current.offsetTop-Xa;N.current.scrollTo({top:A,behavior:"instant"}),$.current.focus()}!y&&document.activeElement!==$.current&&!((M=$.current)!=null&&M.contains(document.activeElement))&&document.activeElement!==N.current&&!((S=N.current)!=null&&S.contains(document.activeElement))&&Z()},10);return()=>{clearTimeout(u)}},[y,Z]),e.jsxs(te,{modal:!1,open:T,onOpenChange:gt,children:[e.jsx(xe,{asChild:!0,children:e.jsx(ja,{ref:$,value:i,handleSearch:X,handleKeyDown:Qr,handleOnClick:()=>{g(t.book),C(t.book),h(t.chapterNum>0?t.chapterNum:0),$.current.focus()},onFocus:()=>{rt.current=!0,P(!1),mt(R(i))},onBlur:()=>{j===0&&Z()},handleSubmit:pn,placeholder:x.formatScrRef(t,"English"),className:r,hasTopMatch:!!I,hasNoMatches:j===0,hasInputChanged:st})}),j>0&&e.jsx(Lt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},align:o==="ltr"?"start":"end",ref:N,onKeyDown:ta,children:e.jsxs("div",{className:"rtl:tw-ps-2",children:[!!I&&st&&e.jsxs(e.Fragment,{children:[e.jsx(ee,{className:"tw-cursor-pointer tw-p-4 tw-font-semibold tw-text-foreground",onClick:pn,onKeyDown:u=>ea(u),"data-top-match":"true",ref:z,children:x.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1})}),e.jsx(Et,{})]}),U.map((u,M)=>e.jsxs("div",{children:[e.jsx(ne,{className:"tw-font-semibold tw-text-foreground/80",children:Ga[u.bookType]}),u.books.map((S,K)=>e.jsx("div",{children:e.jsx(Aa,{bookId:S,handleSelectBook:()=>zt(S,!1),shouldExpandChildren:p.toLowerCase()===S.toLowerCase()||j===1,handleHighlightBook:()=>C(S),handleKeyDown:A=>na(A,K),bookType:u.bookType,ref:A=>{p===S&&(f.current=A)},children:e.jsx(Fa,{handleSelectChapter:Zr,endChapter:Pt(S),selectedChapter:p===t.book?t.chapterNum:0,highlightedChapter:p===m||j===1?b:0,handleHighlightedChapter:A=>{h(A)},matchingChapters:st?Y:void 0})})},S)),M<U.length-1&&e.jsx(Et,{})]},u.bookType))]})})]})}const Pn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},i)=>{const w=a?Ft.Slot:"button";return e.jsx(w,{className:d(Pn({variant:n,size:r,className:t})),ref:i,...o})});B.displayName="Button";const Ka=kt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),H=s.forwardRef(({className:t,...n},r)=>e.jsx(jn.Root,{ref:r,className:d("pr-twp",Ka(),t),...n}));H.displayName=jn.Root.displayName;const ye=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(Ut.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});ye.displayName=Ut.Root.displayName;const Wt=s.forwardRef(({className:t,...n},r)=>e.jsx(Ut.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Ut.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(v.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Wt.displayName=Ut.Item.displayName;const Ne=Jt.Root,ke=Jt.Trigger,re=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const i=q();return e.jsx(Jt.Portal,{children:e.jsx(Jt.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:i})})});re.displayName=Jt.Content.displayName;const Ha=ct.Portal,Bn=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));Bn.displayName=ct.Overlay.displayName;const Ya=s.forwardRef(({className:t,children:n,...r},a)=>{const o=q();return e.jsxs(Ha,{children:[e.jsx(Bn,{}),e.jsxs(ct.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(ct.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(v.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ya.displayName=ct.Content.displayName;const qa=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));qa.displayName=ct.Title.displayName;const Ua=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));Ua.displayName=ct.Description.displayName;const ae=s.forwardRef(({className:t,...n},r)=>e.jsx(tt.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));ae.displayName=tt.Command.displayName;const oe=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(v.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(tt.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});oe.displayName=tt.Command.Input.displayName;const se=s.forwardRef(({className:t,...n},r)=>e.jsx(tt.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));se.displayName=tt.Command.List.displayName;const ie=s.forwardRef((t,n)=>e.jsx(tt.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ie.displayName=tt.Command.Empty.displayName;const je=s.forwardRef(({className:t,...n},r)=>e.jsx(tt.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));je.displayName=tt.Command.Group.displayName;const An=s.forwardRef(({className:t,...n},r)=>e.jsx(tt.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...n}));An.displayName=tt.Command.Separator.displayName;const we=s.forwardRef(({className:t,...n},r)=>e.jsx(tt.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));we.displayName=tt.Command.Item.displayName;function Ja(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function ge({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:i,onChange:w=()=>{},getOptionLabel:l=Ja,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:g="",commandEmptyMessage:b="No option found",buttonVariant:h="outline",alignDropDown:m="start",isDisabled:C=!1,...T}){const[k,y]=s.useState(!1);return e.jsxs(Ne,{open:k,onOpenChange:y,...T,children:[e.jsx(ke,{asChild:!0,children:e.jsxs(B,{variant:h,role:"combobox","aria-expanded":k,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:C,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-pe-2",children:c}),e.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):p})]}),e.jsx(v.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(re,{align:m,className:d("tw-w-[200px] tw-p-0",o),children:e.jsxs(ae,{children:[e.jsx(oe,{placeholder:g,className:"tw-text-inherit"}),e.jsx(ie,{children:b}),e.jsx(se,{children:n.map(_=>e.jsxs(we,{value:l(_),onSelect:()=>{w(_),y(!1)},children:[e.jsx(v.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(_)})}),l(_)]},l(_)))})]})})]})}function Fn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(p,g)=>g+1),[i]),l=p=>{r(p),p>n&&a(p)},c=p=>{a(p),p<t&&r(p)};return e.jsxs(e.Fragment,{children:[e.jsx(H,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(ge,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:p=>p.toString(),value:t},"start chapter"),e.jsx(H,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(ge,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:p=>p.toString(),value:n},"end chapter")]})}var Gn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Gn||{});const Wa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Oe=(t,n)=>t[n]??n;function Za({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:c,localizedStrings:p}){const g=Oe(p,"%webView_bookSelector_currentBook%"),b=Oe(p,"%webView_bookSelector_choose%"),h=Oe(p,"%webView_bookSelector_chooseBooks%"),[m,C]=s.useState("current book"),T=k=>{C(k),t(k)};return e.jsx(ye,{className:"pr-twp tw-flex",value:m,onValueChange:k=>T(k),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Wt,{value:"current book"}),e.jsx(H,{className:"tw-ms-1",children:g})]}),e.jsx(H,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(Fn,{isDisabled:m==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:w,chapterCount:o,startChapter:l,endChapter:i})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Wt,{value:"choose books"}),e.jsx(H,{className:"tw-ms-1",children:h})]}),e.jsx(H,{className:"tw-flex tw-items-center",children:a.map(k=>O.bookIdToEnglishName(k)).join(", ")}),e.jsx(B,{disabled:m==="current book",onClick:()=>r(),children:b})]})]})})}function Qa({table:t}){return e.jsxs(te,{children:[e.jsx(Nn.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(v.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(Lt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(ne,{children:"Toggle columns"}),e.jsx(Et,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(ve,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const Mt=L.Root,Ln=L.Group,Vt=L.Value,Xn=kt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),yt=s.forwardRef(({className:t,children:n,size:r,...a},o)=>{const i=q();return e.jsxs(L.Trigger,{className:d(Xn({size:r,className:t})),ref:o,...a,dir:i,children:[n,e.jsx(L.Icon,{asChild:!0,children:e.jsx(v.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});yt.displayName=L.Trigger.displayName;const nn=s.forwardRef(({className:t,...n},r)=>e.jsx(L.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(v.ChevronUp,{className:"tw-h-4 tw-w-4"})}));nn.displayName=L.ScrollUpButton.displayName;const rn=s.forwardRef(({className:t,...n},r)=>e.jsx(L.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(v.ChevronDown,{className:"tw-h-4 tw-w-4"})}));rn.displayName=L.ScrollDownButton.displayName;const Nt=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const i=q();return e.jsx(L.Portal,{children:e.jsxs(L.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(nn,{}),e.jsx(L.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:i,children:n})}),e.jsx(rn,{})]})})});Nt.displayName=L.Content.displayName;const $n=s.forwardRef(({className:t,...n},r)=>e.jsx(L.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));$n.displayName=L.Label.displayName;const ot=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(L.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(L.ItemIndicator,{children:e.jsx(v.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(L.ItemText,{children:n})]}));ot.displayName=L.Item.displayName;const Kn=s.forwardRef(({className:t,...n},r)=>e.jsx(L.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Kn.displayName=L.Separator.displayName;function to({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(Mt,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(yt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(Vt,{placeholder:t.getState().pagination.pageSize})}),e.jsx(Nt,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(ot,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(v.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(v.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(v.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(v.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const le=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!n}),children:e.jsx("table",{ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm",t),...r})}));le.displayName="Table";const de=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));de.displayName="TableHeader";const ce=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...n}));ce.displayName="TableBody";const Hn=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));Hn.displayName="TableFooter";const pt=s.forwardRef(({className:t,...n},r)=>e.jsx("tr",{ref:r,className:d("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",t),...n}));pt.displayName="TableRow";const At=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));At.displayName="TableHead";const Ot=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));Ot.displayName="TableCell";const Yn=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));Yn.displayName="TableCaption";function qn({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{}}){var k;const[l,c]=s.useState([]),[p,g]=s.useState([]),[b,h]=s.useState({}),[m,C]=s.useState({}),T=W.useReactTable({data:n,columns:t,getCoreRowModel:W.getCoreRowModel(),...r&&{getPaginationRowModel:W.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:W.getSortedRowModel(),onColumnFiltersChange:g,getFilteredRowModel:W.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:C,state:{sorting:l,columnFilters:p,columnVisibility:b,rowSelection:m}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(Qa,{table:T}),e.jsxs(le,{stickyHeader:i,children:[e.jsx(de,{stickyHeader:i,children:T.getHeaderGroups().map(y=>e.jsx(pt,{children:y.headers.map(_=>e.jsx(At,{children:_.isPlaceholder?void 0:W.flexRender(_.column.columnDef.header,_.getContext())},_.id))},y.id))}),e.jsx(ce,{children:(k=T.getRowModel().rows)!=null&&k.length?T.getRowModel().rows.map(y=>e.jsx(pt,{onClick:()=>w(y,T),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(_=>e.jsx(Ot,{children:W.flexRender(_.column.columnDef.cell,_.getContext())},_.id))},y.id)):e.jsx(pt,{children:e.jsx(Ot,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(B,{variant:"outline",size:"sm",onClick:()=>T.previousPage(),disabled:!T.getCanPreviousPage(),children:"Previous"}),e.jsx(B,{variant:"outline",size:"sm",onClick:()=>T.nextPage(),disabled:!T.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(to,{table:T})]})}function eo({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:e.jsx(da,{options:o,children:n})})}var Un=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Un||{});function no({id:t,label:n,groups:r}){return e.jsx("div",{id:t,children:e.jsxs(te,{children:[e.jsx(xe,{asChild:!0,children:e.jsxs(B,{variant:"default",children:[e.jsx(v.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(v.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(Lt,{children:r.map(a=>e.jsxs("div",{children:[e.jsx(ne,{children:a.label}),e.jsx(qe,{children:a.items.map(o=>e.jsx("div",{children:o.itemType===0?e.jsx(ve,{onClick:o.onClick,children:o.label}):e.jsx(We,{onClick:o.onClick,value:o.label,children:o.label})},o.label))}),e.jsx(Et,{})]},a.label))})]})})}function ro({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o}){const i=new x.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((l,c)=>l+c,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(v.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:i})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:a.slice(0,3).map(l=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:l.toUpperCase()},l))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",a.length-3," more languages"]})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Website"}),e.jsx(v.Link,{className:"tw-h-4 tw-w-4"})]}),e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Support"}),e.jsx(v.CircleHelp,{className:"tw-h-4 tw-w-4"})]})]})]})}function ao({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function i(l){const c=new Date(l),p=new Date(o.getTime()-c.getTime()),g=p.getUTCFullYear()-1970,b=p.getUTCMonth(),h=p.getUTCDate()-1;let m="";return g>0?m=`${g.toString()} year${g===1?"":"s"} ago`:b>0?m=`${b.toString()} month${b===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const w=Object.entries(n).sort((l,c)=>c[0].localeCompare(l[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:l[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",l[0]]}),e.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function oo({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const i=s.useMemo(()=>x.formatBytes(r),[r]),l=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(g=>p.of(g))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[e.jsx(ao,{versionHistory:o}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:i})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const Jn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Zt=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:d("pr-twp",Jn({variant:n}),t),...r}));Zt.displayName="Badge";function Wn({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i="No entries found",customSelectedText:w,isDisabled:l=!1,sortSelected:c=!1,icon:p=void 0,className:g=void 0}){const[b,h]=s.useState(!1),m=s.useCallback(k=>{var _;const y=(_=t.find(D=>D.label===k))==null?void 0:_.value;y&&a(r.includes(y)?r.filter(D=>D!==y):[...r,y])},[t,r,a]),C=()=>w||o,T=s.useMemo(()=>{if(!c)return t;const k=t.filter(_=>_.starred).sort((_,D)=>_.label.localeCompare(D.label)),y=t.filter(_=>!_.starred).sort((_,D)=>{const P=r.includes(_.value),I=r.includes(D.value);return P&&!I?-1:!P&&I?1:_.label.localeCompare(D.label)});return[...k,...y]},[t,r,c]);return e.jsx("div",{className:g,children:e.jsxs(Ne,{open:b,onOpenChange:h,children:[e.jsx(ke,{asChild:!0,children:e.jsxs(B,{variant:"ghost",role:"combobox","aria-expanded":b,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),e.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:C()})})]}),e.jsx(v.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(re,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(ae,{children:[e.jsx(oe,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(se,{children:[e.jsx(ie,{children:i}),e.jsx(je,{children:T.map(k=>{const y=n?n(k):void 0;return e.jsxs(we,{value:k.label,onSelect:m,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(v.Check,{className:d("tw-h-4 tw-w-4",r.includes(k.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:k.starred&&e.jsx(v.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:k.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:y})]},k.label)})})]})]})})]})})}function so({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:c,icon:p,className:g,badgesPlaceholder:b}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(Wn,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:c,icon:p,className:g}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(h=>{var m;return e.jsxs(Zt,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(C=>C!==h)),children:e.jsx(v.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(C=>C.value===h))==null?void 0:m.label]},h)})}):e.jsx(H,{children:b})]})}function io({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(c=>x.deepEqual(c,l))||w.push(l)}),w},[t]);return e.jsxs(le,{stickyHeader:!0,children:[e.jsx(de,{stickyHeader:!0,children:e.jsxs(pt,{children:[e.jsx(At,{children:a}),e.jsx(At,{children:o})]})}),e.jsx(ce,{children:i.length>0&&i.map(w=>e.jsxs(pt,{onClick:()=>{n(w.reference)},children:[e.jsx(Ot,{children:`${O.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),e.jsx(Ot,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Ce=s.forwardRef(({className:t,...n},r)=>e.jsx(Ae.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(Ae.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(v.Check,{className:"tw-h-4 tw-w-4"})})}));Ce.displayName=Ae.Root.displayName;const Zn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),wo=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(Cn.Root,{ref:o,className:d(Zn({variant:n,size:r,className:t})),...a}));wo.displayName=Cn.Root.displayName;const Qn=s.createContext({size:"default",variant:"default"}),an=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},i)=>{const w=q();return e.jsx(be.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:w,children:e.jsx(Qn.Provider,{value:{variant:n,size:r},children:a})})});an.displayName=be.Root.displayName;const qt=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},i)=>{const w=s.useContext(Qn);return e.jsx(be.Item,{ref:i,className:d(Zn({variant:w.variant||r,size:w.size||a}),t),...o,children:n})});qt.displayName=be.Item.displayName;const Se=t=>t==="asc"?e.jsx(v.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(v.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(v.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),lo=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(B,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Se(n.getIsSorted())]})}),co=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(B,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Se(r.getIsSorted())]})}),po=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(B,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Se(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),Ie=(t,n,r,a,o,i)=>{let w=[...r];t.forEach(c=>{n==="approved"?w.includes(c)||w.push(c):w=w.filter(p=>p!==c)}),a(w);let l=[...o];t.forEach(c=>{n==="unapproved"?l.includes(c)||l.push(c):l=l.filter(p=>p!==c)}),i(l)},uo=(t,n,r,a,o)=>({accessorKey:"status",header:({column:i})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(B,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Se(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return e.jsxs(an,{value:w,variant:"outline",type:"single",children:[e.jsx(qt,{onClick:c=>{c.stopPropagation(),Ie([l],"approved",n,r,a,o)},value:"approved",children:e.jsx(v.CircleCheckIcon,{})}),e.jsx(qt,{onClick:c=>{c.stopPropagation(),Ie([l],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(v.CircleXIcon,{})}),e.jsx(qt,{onClick:c=>{c.stopPropagation(),Ie([l],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(v.CircleHelpIcon,{})})]})}}),mo=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ho=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},go=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},tr=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",fo=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),bo=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},xo=(t,n,r)=>{const a=[];return t.forEach(o=>{const i=a.find(w=>x.deepEqual(w.items,x.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const w={items:x.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:tr(x.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(w)}}),a},bt=(t,n)=>t[n]??n;function vo({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:i,scope:w,onScopeChange:l,columns:c}){const p=bt(r,"%webView_inventory_all%"),g=bt(r,"%webView_inventory_approved%"),b=bt(r,"%webView_inventory_unapproved%"),h=bt(r,"%webView_inventory_unknown%"),m=bt(r,"%webView_inventory_scope_currentBook%"),C=bt(r,"%webView_inventory_scope_chapter%"),T=bt(r,"%webView_inventory_filter_text%"),k=bt(r,"%webView_inventory_show_additional_items%"),[y,_]=s.useState(!1),[D,P]=s.useState("all"),[I,mt]=s.useState(""),[$,N]=s.useState([]),f=s.useMemo(()=>t.length===0?[]:xo(t,o,i),[t,o,i]),z=s.useMemo(()=>{if(y)return f;const j=[];return f.forEach(X=>{const rt=X.items[0],Z=j.find(gt=>gt.items[0]===rt);Z?(Z.count+=X.count,Z.occurrences=Z.occurrences.concat(X.occurrences)):j.push({items:[rt],count:X.count,occurrences:X.occurrences,status:X.status})}),j},[y,f]),R=s.useMemo(()=>bo(z,D,I),[z,D,I]),Y=s.useMemo(()=>{var rt,Z;if(!y)return c;const j=(rt=a==null?void 0:a.tableHeaders)==null?void 0:rt.length;if(!j)return c;const X=[];for(let gt=0;gt<j;gt++)X.push(co(((Z=a==null?void 0:a.tableHeaders)==null?void 0:Z[gt])||"Additional Item",gt+1));return[...X,...c]},[a==null?void 0:a.tableHeaders,c,y]);s.useEffect(()=>{R.length===0?N([]):R.length===1&&N(R[0].items)},[R]);const st=(j,X)=>{X.setRowSelection(()=>{const rt={};return rt[j.index]=!0,rt}),N(j.original.items)},ht=j=>{if(j==="book"||j==="chapter")l(j);else throw new Error(`Invalid scope value: ${j}`)},jt=j=>{if(j==="all"||j==="approved"||j==="unapproved"||j==="unknown")P(j);else throw new Error(`Invalid status filter value: ${j}`)},U=s.useMemo(()=>{if(z.length===0||$.length===0)return[];const j=z.filter(X=>x.deepEqual(y?X.items:[X.items[0]],$));if(j.length>1)throw new Error("Selected item is not unique");return j.length===0?[]:j[0].occurrences},[$,y,z]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(Mt,{onValueChange:j=>jt(j),defaultValue:D,children:[e.jsx(yt,{className:"tw-m-1",children:e.jsx(Vt,{placeholder:"Select filter"})}),e.jsxs(Nt,{children:[e.jsx(ot,{value:"all",children:p}),e.jsx(ot,{value:"approved",children:g}),e.jsx(ot,{value:"unapproved",children:b}),e.jsx(ot,{value:"unknown",children:h})]})]}),e.jsxs(Mt,{onValueChange:j=>ht(j),defaultValue:w,children:[e.jsx(yt,{className:"tw-m-1",children:e.jsx(Vt,{placeholder:"Select scope"})}),e.jsxs(Nt,{children:[e.jsx(ot,{value:"book",children:m}),e.jsx(ot,{value:"chapter",children:C})]})]}),e.jsx(It,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:T,value:I,onChange:j=>{mt(j.target.value)}}),a&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ce,{className:"tw-m-1",checked:y,onCheckedChange:j=>{_(j)}}),e.jsx(H,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??k})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(qn,{columns:Y,data:R,onRowClickHandler:st,stickyHeader:!0})}),U.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(io,{occurrenceData:U,setScriptureReference:n,localizedStrings:r})})]})}const _e=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(Sn.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));_e.displayName=Sn.Root.displayName;function Le({className:t,...n}){return e.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const Te=Qt.Provider,Re=Qt.Root,Ee=Qt.Trigger,pe=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(Qt.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));pe.displayName=Qt.Content.displayName;const yo="16rem",No="3rem",er=s.createContext(void 0);function De(){const t=s.useContext(er);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const nr=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:i,side:w="primary",...l},c)=>{const[p,g]=s.useState(t),b=n??p,h=s.useCallback(D=>{const P=typeof D=="function"?D(b):D;r?r(P):g(P)},[r,b]),m=s.useCallback(()=>h(D=>!D),[h]),C=b?"expanded":"collapsed",y=q()==="ltr"?w:w==="primary"?"secondary":"primary",_=s.useMemo(()=>({state:C,open:b,setOpen:h,toggleSidebar:m,side:y}),[C,b,h,m,y]);return e.jsx(er.Provider,{value:_,children:e.jsx(Te,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":yo,"--sidebar-width-icon":No,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...l,children:i})})})});nr.displayName="SidebarProvider";const rr=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},i)=>{const w=De();return n==="none"?e.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...o,children:a}):e.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?n:"","data-variant":t,"data-side":w.side,children:[e.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});rr.displayName="Sidebar";const ko=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=De();return e.jsxs(B,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{n==null||n(i),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(v.PanelLeft,{}):e.jsx(v.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ko.displayName="SidebarTrigger";const jo=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=De();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});jo.displayName="SidebarRail";const ar=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));ar.displayName="SidebarInset";const Co=s.forwardRef(({className:t,...n},r)=>e.jsx(It,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));Co.displayName="SidebarInput";const So=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));So.displayName="SidebarHeader";const _o=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));_o.displayName="SidebarFooter";const To=s.forwardRef(({className:t,...n},r)=>e.jsx(_e,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));To.displayName="SidebarSeparator";const or=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));or.displayName="SidebarContent";const Xe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));Xe.displayName="SidebarGroup";const $e=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Ft.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});$e.displayName="SidebarGroupLabel";const Ro=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Ft.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ro.displayName="SidebarGroupAction";const Ke=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...n}));Ke.displayName="SidebarGroupContent";const sr=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));sr.displayName="SidebarMenu";const ir=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...n}));ir.displayName="SidebarMenuItem";const Eo=kt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),wr=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:i,...w},l)=>{const c=t?Ft.Slot:"button",{state:p}=De(),g=e.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(Eo({variant:r,size:a}),i),...w});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(Re,{children:[e.jsx(Ee,{asChild:!0,children:g}),e.jsx(pe,{side:"right",align:"center",hidden:p!=="collapsed",...o})]})):g});wr.displayName="SidebarMenuButton";const Do=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const i=n?Ft.Slot:"button";return e.jsx(i,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});Do.displayName="SidebarMenuAction";const Mo=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Mo.displayName="SidebarMenuBadge";const Vo=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Le,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Le,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Vo.displayName="SidebarMenuSkeleton";const Oo=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Oo.displayName="SidebarMenuSub";const Io=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Io.displayName="SidebarMenuSubItem";const zo=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},i)=>{const w=t?Ft.Slot:"a";return e.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});zo.displayName="SidebarMenuSubButton";function lr({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:c}){const p=s.useCallback((h,m)=>{a(h,m)},[a]),g=s.useCallback(h=>{const m=r.find(C=>C.projectId===h);return m?m.projectName:h},[r]),b=s.useCallback(h=>!o.projectId&&h===o.label,[o]);return e.jsx(rr,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:e.jsxs(or,{children:[e.jsxs(Xe,{children:[e.jsx($e,{className:"tw-text-sm",children:i}),e.jsx(Ke,{children:e.jsx(sr,{children:Object.entries(n).map(([h,m])=>e.jsx(ir,{children:e.jsx(wr,{onClick:()=>p(h),isActive:b(h),children:e.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),e.jsxs(Xe,{children:[e.jsx($e,{className:"tw-text-sm",children:w}),e.jsx(Ke,{className:"tw-pl-3",children:e.jsx(ge,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:g,buttonPlaceholder:l,onChange:h=>{const m=g(h);p(m,h)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(v.ScrollText,{})})})]})]})})}function on({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:i=!1}){const w=q();return e.jsxs("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[e.jsx(v.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),e.jsx(It,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:l=>n(l.target.value),disabled:i}),t&&e.jsxs(B,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{n("")},children:[e.jsx(v.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}function Po({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:g}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(on,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(nr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(lr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:g}),e.jsx(ar,{className:"tw-min-w-[215px]",children:a})]})]})}const xt="scrBook",Bo="scrRef",Rt="source",Ao="details",Fo="Scripture Reference",Go="Scripture Book",dr="Type",Lo="Details";function Xo(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:xt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Fo,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?O.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===xt?x.formatScrRef(o.start):void 0},getGroupingValue:a=>O.bookIdToNumber(a.start.book),sortingFn:(a,o)=>x.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>x.formatScrRef(a.start),id:Bo,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:x.formatScrRef(o.start)},sortingFn:(a,o)=>x.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:Rt,header:r?(t==null?void 0:t.typeColumnName)??dr:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:Ao,header:(t==null?void 0:t.detailsColumnName)??Lo,cell:a=>a.getValue(),enableGrouping:!1}]}const $o=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||x.compareScrRefs(t.start,t.end)===0?`${x.scrRefToBBBCCCVVV(t.start)}+${n}`:`${x.scrRefToBBBCCCVVV(t.start)}+${n}-${x.scrRefToBBBCCCVVV(t.end)}+${r}`},xn=t=>`${$o({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Ko({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:w,onRowSelected:l}){const[c,p]=s.useState([]),[g,b]=s.useState([{id:xt,desc:!1}]),[h,m]=s.useState({}),C=s.useMemo(()=>t.flatMap(N=>N.data.map(f=>({...f,source:N.source}))),[t]),T=s.useMemo(()=>Xo({scriptureReferenceColumnName:a,typeColumnName:i,detailsColumnName:w},r),[a,i,w,r]);s.useEffect(()=>{c.includes(Rt)?b([{id:Rt,desc:!1},{id:xt,desc:!1}]):b([{id:xt,desc:!1}])},[c]);const k=W.useReactTable({data:C,columns:T,state:{grouping:c,sorting:g,rowSelection:h},onGroupingChange:p,onSortingChange:b,onRowSelectionChange:m,getExpandedRowModel:W.getExpandedRowModel(),getGroupedRowModel:W.getGroupedRowModel(),getCoreRowModel:W.getCoreRowModel(),getSortedRowModel:W.getSortedRowModel(),getRowId:xn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const N=k.getSelectedRowModel().rowsById,f=Object.keys(N);if(f.length===1){const z=C.find(R=>xn(R)===f[0])||void 0;z&&l(z)}}},[h,C,l,k]);const y=o??Go,_=i??dr,D=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[xt]},{label:`Group by ${_}`,value:[Rt]},{label:`Group by ${y} and ${_}`,value:[xt,Rt]},{label:`Group by ${_} and ${y}`,value:[Rt,xt]}],P=N=>{p(JSON.parse(N))},I=(N,f)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(f)},mt=(N,f)=>N.getIsGrouped()?"":d("banded-row",f%2===0?"even":"odd"),$=(N,f,z)=>{if(!((N==null?void 0:N.length)===0||f.depth<z.column.getGroupedIndex())){if(f.getIsGrouped())switch(f.depth){case 1:return"tw-ps-4";default:return}switch(f.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(Mt,{value:JSON.stringify(c),onValueChange:N=>{P(N)},children:[e.jsx(yt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(Vt,{})}),e.jsx(Nt,{position:"item-aligned",children:e.jsx(Ln,{children:D.map(N=>e.jsx(ot,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),e.jsxs(le,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(de,{children:k.getHeaderGroups().map(N=>e.jsx(pt,{children:N.headers.filter(f=>f.column.columnDef.header).map(f=>e.jsx(At,{colSpan:f.colSpan,className:"top-0 tw-sticky",children:f.isPlaceholder?void 0:e.jsxs("div",{children:[f.column.getCanGroup()?e.jsx(B,{variant:"ghost",title:`Toggle grouping by ${f.column.columnDef.header}`,onClick:f.column.getToggleGroupingHandler(),type:"button",children:f.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",W.flexRender(f.column.columnDef.header,f.getContext())]})},f.id))},N.id))}),e.jsx(ce,{children:k.getRowModel().rows.map((N,f)=>{const z=q();return e.jsx(pt,{"data-state":N.getIsSelected()?"selected":"",className:d(mt(N,f)),onClick:R=>I(N,R),children:N.getVisibleCells().map(R=>{if(!(R.getIsPlaceholder()||R.column.columnDef.enableGrouping&&!R.getIsGrouped()&&(R.column.columnDef.id!==Rt||!r)))return e.jsx(Ot,{className:d(R.column.columnDef.id,"tw-p-[1px]",$(c,N,R)),children:R.getIsGrouped()?e.jsxs(B,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&e.jsx(v.ChevronDown,{}),!N.getIsExpanded()&&(z==="ltr"?e.jsx(v.ChevronRight,{}):e.jsx(v.ChevronLeft,{}))," ",W.flexRender(R.column.columnDef.cell,R.getContext())," (",N.subRows.length,")"]}):W.flexRender(R.column.columnDef.cell,R.getContext())},R.id)})},N.id)})})]})]})}var vt=(t=>(t.OT="OT",t.NT="NT",t.DC="DC",t.Extra="Extra",t))(vt||{});const Ho=(t,n,r,a,o)=>{switch(t){case"OT":return n??"Old Testament";case"NT":return r??"New Testament";case"DC":return a??"Deuterocanon";case"Extra":return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Yo=(t,n,r,a,o)=>{switch(t){case"OT":return n??"OT";case"NT":return r??"NT";case"DC":return a??"DC";case"Extra":return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}},Bt=t=>{if(O.isBookOT(t))return"OT";if(O.isBookNT(t))return"NT";if(O.isBookDC(t))return"DC";if(O.isExtraMaterial(t))return"Extra";throw new Error(`Unknown section for book: ${t}`)},sn=(t,n)=>t.filter(r=>{try{return Bt(r)===n}catch{return!1}}),cr=(t,n,r)=>sn(t,n).every(a=>r.includes(a));function qo({bookId:t,selectedBookIds:n,toggleBook:r,lastKeyEventShiftKey:a,localizedBookNames:o}){var l,c;const i=s.useRef(!1),w=s.useRef();return e.jsxs(we,{value:t,className:"tw-flex tw-items-center",onSelect:()=>{i.current||(r(t,a.current),a.current=!1),w.current&&clearTimeout(w.current),w.current=setTimeout(()=>{i.current=!1},100)},onMouseDown:p=>{p.preventDefault(),i.current=!0,r(t,p.shiftKey)},role:"option","aria-selected":n.includes(t),"aria-label":`${O.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,children:[e.jsx(v.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",n.includes(t)?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:d("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":Bt(t)===vt.OT,"tw-border-s-purple-200":Bt(t)===vt.NT,"tw-border-s-indigo-200":Bt(t)===vt.DC,"tw-border-s-yellow-200":Bt(t)===vt.Extra}),children:o&&((l=o.get(t))==null?void 0:l.localizedName)||O.bookIdToEnglishName(t)}),e.jsx("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:o&&((c=o.get(t))==null?void 0:c.localizedId)||t.toLocaleUpperCase()})]},t)}function Uo({section:t,availableBookIds:n,selectedBookIds:r,onToggle:a,localizedStrings:o}){const i=sn(n,t).length===0,w=o["%scripture_section_ot_short%"],l=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],p=o["%scripture_section_extra_short%"];return e.jsx(B,{variant:"outline",size:"sm",onClick:()=>a(t),className:d(cr(n,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Yo(t,w,l,c,p)})}const vn=5,ze=6;function Jo({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:a,localizedBookNames:o}){const i=a["%webView_book_selector_books_selected%"],w=a["%webView_book_selector_select_books%"],l=a["%webView_book_selector_search_books%"],c=a["%webView_book_selector_select_all%"],p=a["%webView_book_selector_clear_all%"],g=a["%webView_book_selector_no_book_found%"],b=a["%webView_book_selector_more%"],h=a["%scripture_section_ot_long%"],m=a["%scripture_section_nt_long%"],C=a["%scripture_section_dc_long%"],T=a["%scripture_section_extra_long%"],[k,y]=s.useState(!1),_=s.useRef(void 0),D=s.useRef(!1);if(t.length!==O.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const P=s.useMemo(()=>O.allBookIds.filter((f,z)=>t[z]==="1"&&!O.isObsolete(O.bookIdToNumber(f))),[t]),I=s.useCallback((f,z=!1)=>{if(!z||!_.current){r(n.includes(f)?n.filter(U=>U!==f):[...n,f]),_.current=f;return}const R=P.findIndex(U=>U===_.current),Y=P.findIndex(U=>U===f);if(R===-1||Y===-1)return;const[st,ht]=[Math.min(R,Y),Math.max(R,Y)],jt=P.slice(st,ht+1).map(U=>U);r(n.includes(f)?n.filter(U=>!jt.includes(U)):[...new Set([...n,...jt])])},[n,r,P]),mt=s.useCallback(f=>{const z=sn(P,f).map(R=>R);r(cr(P,f,n)?n.filter(R=>!z.includes(R)):[...new Set([...n,...z])])},[n,r,P]),$=()=>{r(P.map(f=>f))},N=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(vt).map(f=>e.jsx(Uo,{section:f,availableBookIds:P,selectedBookIds:n,onToggle:mt,localizedStrings:a},f))}),e.jsxs(Ne,{open:k,onOpenChange:y,children:[e.jsx(ke,{asChild:!0,children:e.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":k,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${i}: ${n.length}`:w,e.jsx(v.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(re,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(ae,{onKeyDown:f=>{f.key==="Enter"&&(D.current=f.shiftKey)},children:[e.jsx(oe,{placeholder:l}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(B,{variant:"ghost",size:"sm",onClick:$,children:c}),e.jsx(B,{variant:"ghost",size:"sm",onClick:N,children:p})]}),e.jsxs(se,{children:[e.jsx(ie,{children:g}),Object.values(vt).map((f,z)=>{const R=P.filter(Y=>Bt(Y)===f);if(R.length!==0)return e.jsxs(s.Fragment,{children:[e.jsx(je,{heading:Ho(f,h,m,C,T),children:R.map(Y=>e.jsx(qo,{bookId:Y,selectedBookIds:n,toggleBook:I,lastKeyEventShiftKey:D,localizedBookNames:o},Y))}),z<Object.values(vt).length-1&&e.jsx(An,{})]},f)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===ze?ze:vn).map(f=>{var z;return e.jsx(Zt,{className:"hover:tw-bg-secondary",variant:"secondary",children:o&&((z=o.get(f))==null?void 0:z.localizedName)||O.bookIdToEnglishName(f)||f},f)}),n.length>ze&&e.jsx(Zt,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-vn} ${b}`})]})]})}const Wo=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),_t=(t,n)=>t[n]??n;function Zo({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:a,selectedBookIds:o,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l}){const c=_t(w,"%webView_scope_selector_selected_text%"),p=_t(w,"%webView_scope_selector_current_verse%"),g=_t(w,"%webView_scope_selector_current_chapter%"),b=_t(w,"%webView_scope_selector_current_book%"),h=_t(w,"%webView_scope_selector_choose_books%"),m=_t(w,"%webView_scope_selector_scope%"),C=_t(w,"%webView_scope_selector_select_books%"),T=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:g,id:"scope-chapter"},{value:"book",label:b,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],k=n?T.filter(y=>n.includes(y.value)):T;return e.jsxs("div",{className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(H,{children:m}),e.jsx(ye,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:k.map(({value:y,label:_,id:D})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Wt,{className:"tw-me-2",value:y,id:D}),e.jsx(H,{htmlFor:D,children:_})]},D))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(H,{children:C}),e.jsx(Jo,{availableBookInfo:a,selectedBookIds:o,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Pe={[x.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[x.getLocalizeKeyForScrollGroupId(0)]:"A",[x.getLocalizeKeyForScrollGroupId(1)]:"B",[x.getLocalizeKeyForScrollGroupId(2)]:"C",[x.getLocalizeKeyForScrollGroupId(3)]:"D",[x.getLocalizeKeyForScrollGroupId(4)]:"E",[x.getLocalizeKeyForScrollGroupId(5)]:"F",[x.getLocalizeKeyForScrollGroupId(6)]:"G",[x.getLocalizeKeyForScrollGroupId(7)]:"H",[x.getLocalizeKeyForScrollGroupId(8)]:"I",[x.getLocalizeKeyForScrollGroupId(9)]:"J",[x.getLocalizeKeyForScrollGroupId(10)]:"K",[x.getLocalizeKeyForScrollGroupId(11)]:"L",[x.getLocalizeKeyForScrollGroupId(12)]:"M",[x.getLocalizeKeyForScrollGroupId(13)]:"N",[x.getLocalizeKeyForScrollGroupId(14)]:"O",[x.getLocalizeKeyForScrollGroupId(15)]:"P",[x.getLocalizeKeyForScrollGroupId(16)]:"Q",[x.getLocalizeKeyForScrollGroupId(17)]:"R",[x.getLocalizeKeyForScrollGroupId(18)]:"S",[x.getLocalizeKeyForScrollGroupId(19)]:"T",[x.getLocalizeKeyForScrollGroupId(20)]:"U",[x.getLocalizeKeyForScrollGroupId(21)]:"V",[x.getLocalizeKeyForScrollGroupId(22)]:"W",[x.getLocalizeKeyForScrollGroupId(23)]:"X",[x.getLocalizeKeyForScrollGroupId(24)]:"Y",[x.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Qo({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o,className:i}){const w={...Pe,...Object.fromEntries(Object.entries(a).map(([c,p])=>[c,c===p&&c in Pe?Pe[c]:p]))},l=q();return e.jsxs(Mt,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(yt,{size:o,className:d("pr-twp tw-w-auto",i),children:e.jsx(Vt,{placeholder:w[x.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(Nt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(ot,{value:`${c}`,children:w[x.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function ts({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function es({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function ns({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(_e,{}):""]})}function pr(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function fe({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const ur=(t,n,r,a)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>n.filter(l=>l.group===i).sort((l,c)=>l.order-c.order).map(l=>e.jsxs(Re,{children:[e.jsx(Ee,{asChild:!0,children:"command"in l?e.jsxs(ee,{onClick:()=>{a(l)},children:[l.iconPathBefore&&e.jsx(fe,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&e.jsx(fe,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):e.jsxs(Tn,{children:[e.jsx(Ue,{children:l.label}),e.jsx(_n,{children:e.jsx(Je,{children:ur(t,n,pr(t,l.id),a)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&e.jsx(pe,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function He({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:a,className:o,variant:i,id:w}){return e.jsxs(te,{variant:i,children:[e.jsx(xe,{"aria-label":r,className:o,asChild:!0,id:w,children:e.jsx(B,{variant:"ghost",size:"icon",children:a??e.jsx(v.MenuIcon,{})})}),e.jsx(Lt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,l])=>typeof l=="object").sort(([,l],[,c])=>typeof l=="boolean"||typeof c=="boolean"?0:l.order-c.order).map(([l],c,p)=>e.jsxs(s.Fragment,{children:[e.jsx(qe,{children:e.jsx(Te,{children:ur(n.groups,n.items,l,t)})}),c<p.length-1&&e.jsx(Et,{})]},l))})]})}function rs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:a,id:o,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:c}){return e.jsxs("div",{className:d("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",i),id:o,children:[r&&e.jsx(He,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:e.jsx(v.Menu,{}),className:"tw-h-full tw-w-8"}),e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&e.jsx(He,{onSelectMenuItem:n,menuData:a,tabLabel:"View Info",icon:e.jsx(v.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}const wn=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(et.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});wn.displayName=et.List.displayName;const ln=s.forwardRef(({className:t,...n},r)=>e.jsx(et.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));ln.displayName=et.List.displayName;const mr=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),dn=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));dn.displayName=et.Content.displayName;function as({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:i}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(on,{className:i,value:n,onSearch:r,placeholder:a})]}),e.jsxs(wn,{children:[e.jsx(ln,{children:t.map(w=>e.jsx(mr,{value:w.value,children:w.value},w.key))}),t.map(w=>e.jsx(dn,{value:w.value,children:w.content},w.key))]})]})}function os({...t}){return e.jsx(G.Menu,{...t})}function ss({...t}){return e.jsx(G.Sub,{"data-slot":"menubar-sub",...t})}const hr=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx(Ye.Provider,{value:o,children:e.jsx(G.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});hr.displayName=G.Root.displayName;const gr=s.forwardRef(({className:t,...n},r)=>{const a=lt();return e.jsx(G.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",ut({variant:a.variant,className:t})),...n})});gr.displayName=G.Trigger.displayName;const fr=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=lt();return e.jsxs(G.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",ut({variant:i.variant,className:t}),t),...a,children:[r,e.jsx(v.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});fr.displayName=G.SubTrigger.displayName;const br=s.forwardRef(({className:t,...n},r)=>{const a=lt();return e.jsx(G.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});br.displayName=G.SubContent.displayName;const xr=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},i)=>{const w=lt();return e.jsx(G.Portal,{children:e.jsx(G.Content,{ref:i,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...o})})});xr.displayName=G.Content.displayName;const vr=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=lt();return e.jsx(G.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",ut({variant:o.variant,className:t}),t),...r})});vr.displayName=G.Item.displayName;const is=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=lt();return e.jsxs(G.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ut({variant:i.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(G.ItemIndicator,{children:e.jsx(v.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});is.displayName=G.CheckboxItem.displayName;const ws=s.forwardRef(({className:t,children:n,...r},a)=>{const o=lt();return e.jsxs(G.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ut({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(G.ItemIndicator,{children:e.jsx(v.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});ws.displayName=G.RadioItem.displayName;const ls=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(G.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));ls.displayName=G.Label.displayName;const yr=s.forwardRef(({className:t,...n},r)=>e.jsx(G.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));yr.displayName=G.Separator.displayName;const Kt=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Nr=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return o.flatMap(([i],w)=>{const l=n.filter(p=>p.group===i).sort((p,g)=>p.order-g.order).map(p=>e.jsxs(Re,{children:[e.jsx(Ee,{asChild:!0,children:"command"in p?e.jsxs(vr,{onClick:()=>{a(p)},children:[p.iconPathBefore&&e.jsx(fe,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0}),p.label,p.iconPathAfter&&e.jsx(fe,{icon:p.iconPathAfter,menuLabel:p.label})]},`menubar-item-${p.label}-${p.command}`):e.jsxs(ss,{children:[e.jsx(fr,{children:p.label}),e.jsx(br,{children:Nr(t,n,pr(t,p.id),a)})]},`menubar-sub-${p.label}-${p.id}`)}),p.tooltip&&e.jsx(pe,{children:p.tooltip})]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`)),c=[...l];return l.length>0&&w<o.length-1&&c.push(e.jsx(yr,{},`separator-${i}`)),c})};function ds({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),c=s.useRef(void 0),p=g=>{switch(g){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return c;default:return}};if(ba.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(g,b)=>{var C,T,k,y;g.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(b.hotkey){case"alt":Kt(i,[h]);break;case"alt+p":(C=i.current)==null||C.focus(),Kt(i,[h,m]);break;case"alt+l":(T=w.current)==null||T.focus(),Kt(w,[h,m]);break;case"alt+n":(k=l.current)==null||k.focus(),Kt(l,[h,m]);break;case"alt+h":(y=c.current)==null||y.focus(),Kt(c,[h,m]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const g=new MutationObserver(m=>{m.forEach(C=>{if(C.attributeName==="data-state"&&C.target instanceof HTMLElement){const T=C.target.getAttribute("data-state");r(T==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(m=>{g.observe(m,{attributes:!0})}),()=>g.disconnect()},[r]),!!t)return e.jsx(hr,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,g])=>typeof g=="object").sort(([,g],[,b])=>typeof g=="boolean"||typeof b=="boolean"?0:g.order-b.order).map(([g,b])=>e.jsxs(os,{children:[e.jsx(gr,{ref:p(g),children:typeof b=="object"&&"label"in b&&b.label}),e.jsx(xr,{className:"tw-z-[250]",children:e.jsx(Te,{children:Nr(t.groups,t.items,g,n)})})]},g))})}function cs(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ps({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:a,id:o,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:c,menubarVariant:p="default"}){const g=s.useRef(void 0);return e.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:g,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&e.jsx(ds,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:p})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const us=(t,n)=>t[n]??n;function ms({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:w,className:l}){const c=us(w,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,g]=s.useState(!1),b=m=>{o&&o(m),a&&a([m,...r.filter(C=>C!==m)]),i&&r.find(C=>C===m)&&i([...r.filter(C=>C!==m)]),g(!1)},h=(m,C)=>{var k,y,_,D,P,I;const T=C!==m?((y=(k=t[m])==null?void 0:k.uiNames)==null?void 0:y[C])??((D=(_=t[m])==null?void 0:_.uiNames)==null?void 0:D.en):void 0;return T?`${(P=t[m])==null?void 0:P.autonym} (${T})`:(I=t[m])==null?void 0:I.autonym};return e.jsxs("div",{className:d("pr-twp tw-max-w-sm",l),children:[e.jsxs(Mt,{name:"uiLanguage",value:n,onValueChange:b,open:p,onOpenChange:m=>g(m),children:[e.jsx(yt,{children:e.jsx(Vt,{})}),e.jsx(Nt,{className:"tw-z-[250]",children:Object.keys(t).map(m=>e.jsx(ot,{value:m,children:h(m,n)},m))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(H,{className:"tw-ms-3",children:c}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(H,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(m=>h(m,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function hs({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(H,{children:n(t)}):r?e.jsx(H,{children:r(t)}):e.jsx(H,{children:t})}function gs({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:i,createComplexLabel:w}){return e.jsx("div",{id:t,className:n,children:r.map(l=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Ce,{className:"tw-me-2 tw-align-middle",checked:a.includes(l),onCheckedChange:c=>o(l,c)}),e.jsx(hs,{item:l,createLabel:i,createComplexLabel:w})]},l))})}const kr=s.forwardRef(({className:t,...n},r)=>e.jsx(v.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...n,ref:r}));kr.displayName="Spinner";function fs({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:i,placeholder:w,isRequired:l=!1,className:c,defaultValue:p,value:g,onChange:b,onFocus:h,onBlur:m}){return e.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(H,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),e.jsx(It,{id:t,disabled:n,placeholder:w,required:l,className:d(c,{"tw-border-red-600":r}),defaultValue:p,value:g,onChange:b,onFocus:h,onBlur:m}),e.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}const bs=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),yn=(t,n)=>t[n]??n;function xs({errorDetails:t,handleCopyNotify:n,localizedStrings:r}){const a=yn(r,"%webView_error_dump_header%"),o=yn(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:o})]}),e.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:e.jsx(v.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}const vs=kt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),jr=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:d(vs({variant:n}),t),...r}));jr.displayName="Alert";const Cr=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Cr.displayName="AlertTitle";const Sr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Sr.displayName="AlertDescription";const _r=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));_r.displayName=Gt.Root.displayName;const Tr=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Tr.displayName=Gt.Image.displayName;const Rr=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));Rr.displayName=Gt.Fallback.displayName;const Er=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Er.displayName="Card";const Dr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Dr.displayName="CardHeader";const Mr=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Mr.displayName="CardTitle";const Vr=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));Vr.displayName="CardDescription";const Or=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...n}));Or.displayName="CardContent";const Ir=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));Ir.displayName="CardFooter";const zr=s.createContext({direction:"bottom"});function Pr({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const a=s.useMemo(()=>({direction:n}),[n]);return e.jsx(zr.Provider,{value:a,children:e.jsx(wt.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}Pr.displayName="Drawer";const ys=wt.Drawer.Trigger,Br=wt.Drawer.Portal,Ns=wt.Drawer.Close,cn=s.forwardRef(({className:t,...n},r)=>e.jsx(wt.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));cn.displayName=wt.Drawer.Overlay.displayName;const Ar=s.forwardRef(({className:t,children:n,...r},a)=>{const{direction:o="bottom"}=s.useContext(zr),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},w={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(Br,{children:[e.jsx(cn,{}),e.jsxs(wt.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",o==="bottom"||o==="top"?"tw-flex-col":"tw-flex-row",i[o],t),...r,children:[(o==="bottom"||o==="right")&&e.jsx("div",{className:w[o]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),(o==="top"||o==="left")&&e.jsx("div",{className:w[o]})]})]})});Ar.displayName="DrawerContent";function Fr({className:t,...n}){return e.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}Fr.displayName="DrawerHeader";function Gr({className:t,...n}){return e.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}Gr.displayName="DrawerFooter";const Lr=s.forwardRef(({className:t,...n},r)=>e.jsx(wt.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));Lr.displayName=wt.Drawer.Title.displayName;const Xr=s.forwardRef(({className:t,...n},r)=>e.jsx(wt.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));Xr.displayName=wt.Drawer.Description.displayName;const $r=s.forwardRef(({className:t,value:n,...r},a)=>e.jsx(Fe.Root,{ref:a,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(Fe.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));$r.displayName=Fe.Root.displayName;function ks({...t}){return e.jsx(kn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Kr=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsxs(Ht.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(Ht.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(Ht.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(Ht.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Kr.displayName=Ht.Root.displayName;const Hr=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(Ge.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(Ge.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});Hr.displayName=Ge.Root.displayName;const js=et.Root,Yr=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(et.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});Yr.displayName=et.List.displayName;const qr=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));qr.displayName=et.Trigger.displayName;const Ur=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Ur.displayName=et.Content.displayName;const Jr=s.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));Jr.displayName="Textarea";const Cs=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Ss(t){return{preserveValue:!0,...t}}const Wr=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=Ss(o.current);const[i,w]=s.useState(()=>a.current),[l,c]=s.useState(!0);return s.useEffect(()=>{let p=!0;return c(!!t),(async()=>{if(t){const g=await t();p&&(w(()=>g),c(!1))}})(),()=>{p=!1,o.current.preserveValue||w(()=>a.current)}},[t]),[i,l]},Be=()=>!1,_s=(t,n)=>{const[r]=Wr(s.useCallback(async()=>{if(!t)return Be;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),Be,{preserveValue:!1});s.useEffect(()=>()=>{r!==Be&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>kn.toast});exports.Alert=jr;exports.AlertDescription=Sr;exports.AlertTitle=Cr;exports.Avatar=_r;exports.AvatarFallback=Rr;exports.AvatarImage=Tr;exports.BOOK_SELECTOR_STRING_KEYS=Wa;exports.Badge=Zt;exports.BookChapterControl=$a;exports.BookSelectionMode=Gn;exports.BookSelector=Za;exports.Button=B;exports.Card=Er;exports.CardContent=Or;exports.CardDescription=Vr;exports.CardFooter=Ir;exports.CardHeader=Dr;exports.CardTitle=Mr;exports.ChapterRangeSelector=Fn;exports.Checkbox=Ce;exports.Checklist=gs;exports.ComboBox=ge;exports.Command=ae;exports.CommandEmpty=ie;exports.CommandGroup=je;exports.CommandInput=oe;exports.CommandItem=we;exports.CommandList=se;exports.DataTable=qn;exports.Drawer=Pr;exports.DrawerClose=Ns;exports.DrawerContent=Ar;exports.DrawerDescription=Xr;exports.DrawerFooter=Gr;exports.DrawerHeader=Fr;exports.DrawerOverlay=cn;exports.DrawerPortal=Br;exports.DrawerTitle=Lr;exports.DrawerTrigger=ys;exports.DropdownMenu=te;exports.DropdownMenuCheckboxItem=ve;exports.DropdownMenuContent=Lt;exports.DropdownMenuGroup=qe;exports.DropdownMenuItem=ee;exports.DropdownMenuItemType=Un;exports.DropdownMenuLabel=ne;exports.DropdownMenuPortal=_n;exports.DropdownMenuRadioGroup=Sa;exports.DropdownMenuRadioItem=We;exports.DropdownMenuSeparator=Et;exports.DropdownMenuShortcut=Rn;exports.DropdownMenuSub=Tn;exports.DropdownMenuSubContent=Je;exports.DropdownMenuSubTrigger=Ue;exports.DropdownMenuTrigger=xe;exports.ERROR_DUMP_STRING_KEYS=bs;exports.ErrorDump=xs;exports.Filter=so;exports.FilterDropdown=no;exports.Footer=oo;exports.INVENTORY_STRING_KEYS=fo;exports.Input=It;exports.Inventory=vo;exports.Label=H;exports.MarkdownRenderer=eo;exports.MoreInfo=ro;exports.MultiSelectComboBox=Wn;exports.NavigationContentSearch=as;exports.Popover=Ne;exports.PopoverContent=re;exports.PopoverTrigger=ke;exports.Progress=$r;exports.RadioGroup=ye;exports.RadioGroupItem=Wt;exports.SCOPE_SELECTOR_STRING_KEYS=Wo;exports.ScopeSelector=Zo;exports.ScriptureResultsViewer=Ko;exports.ScrollGroupSelector=Qo;exports.SearchBar=on;exports.Select=Mt;exports.SelectContent=Nt;exports.SelectGroup=Ln;exports.SelectItem=ot;exports.SelectLabel=$n;exports.SelectScrollDownButton=rn;exports.SelectScrollUpButton=nn;exports.SelectSeparator=Kn;exports.SelectTrigger=yt;exports.SelectValue=Vt;exports.Separator=_e;exports.SettingsList=ts;exports.SettingsListHeader=ns;exports.SettingsListItem=es;exports.SettingsSidebar=lr;exports.SettingsSidebarContentSearch=Po;exports.Skeleton=Le;exports.Slider=Kr;exports.Sonner=ks;exports.Spinner=kr;exports.Switch=Hr;exports.TabDropdownMenu=He;exports.TabToolbar=rs;exports.Table=le;exports.TableBody=ce;exports.TableCaption=Yn;exports.TableCell=Ot;exports.TableFooter=Hn;exports.TableHead=At;exports.TableHeader=de;exports.TableRow=pt;exports.Tabs=js;exports.TabsContent=Ur;exports.TabsList=Yr;exports.TabsTrigger=qr;exports.TextField=fs;exports.Textarea=Jr;exports.ToggleGroup=an;exports.ToggleGroupItem=qt;exports.Toolbar=ps;exports.Tooltip=Re;exports.TooltipContent=pe;exports.TooltipProvider=Te;exports.TooltipTrigger=Ee;exports.UiLanguageSelector=ms;exports.VerticalTabs=wn;exports.VerticalTabsContent=dn;exports.VerticalTabsList=ln;exports.VerticalTabsTrigger=mr;exports.badgeVariants=Jn;exports.buttonVariants=Pn;exports.cn=d;exports.getBookIdFromUSFM=go;exports.getLinesFromUSFM=mo;exports.getNumberFromUSFM=ho;exports.getStatusForItem=tr;exports.getToolbarOSReservedSpaceClassName=cs;exports.inventoryCountColumn=po;exports.inventoryItemColumn=lo;exports.inventoryStatusColumn=uo;exports.selectTriggerVariants=Xn;exports.useEvent=Cs;exports.useEventAsync=_s;exports.usePromise=Wr;function Ts(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}Ts(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
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
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-0 {
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
.tw-right-2 {
  right: 0.5rem;
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
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-4 {
  margin-right: 1rem;
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
.tw-mt-24 {
  margin-top: 6rem;
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
.tw-h-\\[100px\\] {
  height: 100px;
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
.tw-h-auto {
  height: auto;
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
.tw-min-h-\\[80px\\] {
  min-height: 80px;
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
.tw-max-w-md {
  max-width: 28rem;
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
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
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
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
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
.\\!tw-pe-10 {
  padding-inline-end: 2.5rem !important;
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
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
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
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
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
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
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
.tw-duration-500 {
  transition-duration: 500ms;
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
.tw-duration-500 {
  animation-duration: 500ms;
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
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
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
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
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
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
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
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
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
.focus-visible\\:tw-ring-destructive:focus-visible {
  --tw-ring-color: hsl(var(--destructive));
}
.focus-visible\\:tw-ring-green-600:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(22 163 74 / var(--tw-ring-opacity, 1));
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

  .sm\\:tw-text-left {
    text-align: left;
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

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
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
`,"after-all");
//# sourceMappingURL=index.cjs.map
