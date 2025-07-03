"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("react/jsx-runtime"),s=require("react"),Lr=require("clsx"),Xr=require("tailwind-merge"),kt=require("class-variance-authority"),bn=require("@radix-ui/react-dropdown-menu"),x=require("lucide-react"),N=require("platform-bible-utils"),zt=require("@radix-ui/react-slot"),$r=require("@radix-ui/react-label"),Hr=require("@radix-ui/react-radio-group"),Yr=require("@radix-ui/react-popover"),rt=require("cmdk"),qr=require("@radix-ui/react-dialog"),Q=require("@tanstack/react-table"),Kr=require("@radix-ui/react-select"),Ur=require("markdown-to-jsx"),Jr=require("@radix-ui/react-checkbox"),Wr=require("@radix-ui/react-toggle-group"),Zr=require("@radix-ui/react-toggle"),Qr=require("@radix-ui/react-separator"),ta=require("@radix-ui/react-tooltip"),ea=require("@radix-ui/react-tabs"),na=require("@radix-ui/react-menubar"),ra=require("react-hotkeys-hook"),aa=require("@radix-ui/react-avatar"),wt=require("vaul"),oa=require("@radix-ui/react-progress"),xn=require("sonner"),sa=require("@radix-ui/react-slider"),ia=require("@radix-ui/react-switch");function J(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const X=J(bn),vn=J($r),qt=J(Hr),Kt=J(Yr),pt=J(qr),Y=J(Kr),De=J(Jr),ce=J(Wr),yn=J(Zr),Nn=J(Qr),Wt=J(ta),at=J(ea),$=J(na),It=J(aa),Ee=J(oa),Ht=J(sa),Me=J(ia),la=Xr.extendTailwindMerge({prefix:"tw-"});function d(...e){return la(Lr.clsx(e))}const Et=s.forwardRef(({className:e,type:n,...r},a)=>t.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:a,...r}));Et.displayName="Input";const wa=s.forwardRef(({handleSearch:e,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,...i},l)=>t.jsx(Et,{...i,type:"text",className:d("tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:w=>e(w.target.value),onKeyDown:w=>{w.key==="Enter"?(a(),w.preventDefault()):n(w)},onClick:r,ref:l})),Ae=s.createContext(void 0);function dt(){const e=s.useContext(Ae);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const bt=kt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),da="layoutDirection";function K(){const e=localStorage.getItem(da);return e==="rtl"?e:"ltr"}const Zt=X.Trigger,Fe=X.Group,jn=X.Portal,kn=X.Sub,ca=X.RadioGroup;function Ot({variant:e="default",...n}){const r=s.useMemo(()=>({variant:e}),[e]);return t.jsx(Ae.Provider,{value:r,children:t.jsx(X.Root,{...n})})}const Ge=s.forwardRef(({className:e,inset:n,children:r,...a},o)=>{const i=dt();return t.jsxs(X.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",e,bt({variant:i.variant})),...a,children:[r,t.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ge.displayName=X.SubTrigger.displayName;const Le=s.forwardRef(({className:e,...n},r)=>t.jsx(X.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Le.displayName=X.SubContent.displayName;const Mt=s.forwardRef(({className:e,sideOffset:n=4,children:r,...a},o)=>{const i=K();return t.jsx(X.Portal,{children:t.jsx(X.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...a,children:t.jsx("div",{dir:i,children:r})})})});Mt.displayName=X.Content.displayName;const Rt=s.forwardRef(({className:e,inset:n,...r},a)=>{const o=K(),i=dt();return t.jsx(X.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",e,bt({variant:i.variant})),...r,dir:o})});Rt.displayName=X.Item.displayName;const pe=s.forwardRef(({className:e,children:n,checked:r,...a},o)=>{const i=dt();return t.jsxs(X.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,bt({variant:i.variant})),checked:r,...a,children:[t.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:t.jsx(X.ItemIndicator,{children:t.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});pe.displayName=X.CheckboxItem.displayName;const Xe=s.forwardRef(({className:e,children:n,...r},a)=>{const o=dt();return t.jsxs(X.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,bt({variant:o.variant})),...r,children:[t.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:t.jsx(X.ItemIndicator,{children:t.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Xe.displayName=X.RadioItem.displayName;const Qt=s.forwardRef(({className:e,inset:n,...r},a)=>t.jsx(X.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",e),...r}));Qt.displayName=X.Label.displayName;const Bt=s.forwardRef(({className:e,...n},r)=>t.jsx(X.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n}));Bt.displayName=X.Separator.displayName;function Sn({className:e,...n}){return t.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...n})}Sn.displayName="DropdownMenuShortcut";var pa=Object.defineProperty,ua=(e,n,r)=>n in e?pa(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,I=(e,n,r)=>ua(e,typeof n!="symbol"?n+"":n,r);const Dt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],$e=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Cn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],cn=ja();function Pt(e,n=!0){return n&&(e=e.toUpperCase()),e in cn?cn[e]:0}function He(e){return Pt(e)>0}function ma(e){const n=typeof e=="string"?Pt(e):e;return n>=40&&n<=66}function ha(e){return(typeof e=="string"?Pt(e):e)<=39}function _n(e){return e<=66}function ga(e){const n=typeof e=="string"?Pt(e):e;return Dn(n)&&!_n(n)}function*fa(){for(let e=1;e<=Dt.length;e++)yield e}const ba=1,Tn=Dt.length;function xa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ye(e,n="***"){const r=e-1;return r<0||r>=Dt.length?n:Dt[r]}function Rn(e){return e<=0||e>Tn?"******":Cn[e-1]}function va(e){return Rn(Pt(e))}function Dn(e){const n=typeof e=="number"?Ye(e):e;return He(n)&&!$e.includes(n)}function ya(e){const n=typeof e=="number"?Ye(e):e;return He(n)&&$e.includes(n)}function Na(e){return Cn[e-1].includes("*obsolete*")}function ja(){const e={};for(let n=0;n<Dt.length;n++)e[Dt[n]]=n+1;return e}const P={allBookIds:Dt,nonCanonicalIds:$e,bookIdToNumber:Pt,isBookIdValid:He,isBookNT:ma,isBookOT:ha,isBookOTNT:_n,isBookDC:ga,allBookNumbers:fa,firstBook:ba,lastBook:Tn,extraBooks:xa,bookNumberToId:Ye,bookNumberToEnglishName:Rn,bookIdToEnglishName:va,isCanonical:Dn,isExtraMaterial:ya,isObsolete:Na};var ct=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(ct||{});const ot=class{constructor(n){if(I(this,"name"),I(this,"fullPath"),I(this,"isPresent"),I(this,"hasVerseSegments"),I(this,"isCustomized"),I(this,"baseVersification"),I(this,"scriptureBooks"),I(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=ct[n]):(this._type=n,this.name=ct[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};I(ot,"Original",new ot(ct.Original)),I(ot,"Septuagint",new ot(ct.Septuagint)),I(ot,"Vulgate",new ot(ct.Vulgate)),I(ot,"English",new ot(ct.English)),I(ot,"RussianProtestant",new ot(ct.RussianProtestant)),I(ot,"RussianOrthodox",new ot(ct.RussianOrthodox));let _t=ot;function pn(e,n){const r=n[0];for(let a=1;a<n.length;a++)e=e.split(n[a]).join(r);return e.split(r)}var En=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(En||{});const et=class A{constructor(n,r,a,o){if(I(this,"firstChapter"),I(this,"lastChapter"),I(this,"lastVerse"),I(this,"hasSegmentsDefined"),I(this,"text"),I(this,"BBBCCCVVVS"),I(this,"longHashCode"),I(this,"versification"),I(this,"rtlMark","‏"),I(this,"_bookNum",0),I(this,"_chapterNum",0),I(this,"_verseNum",0),I(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,l=r!=null&&r instanceof _t?r:void 0;this.setEmpty(l),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof _t?r:void 0;this.setEmpty(i),this._verseNum=n%A.chapterDigitShifter,this._chapterNum=Math.floor(n%A.bookDigitShifter/A.chapterDigitShifter),this._bookNum=Math.floor(n/A.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof A){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof _t?n:A.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??A.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new A(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Lt)return r=new A,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%A.bcvMaxValue*A.bookDigitShifter+(r>=0?r%A.bcvMaxValue*A.chapterDigitShifter:0)+(a>=0?a%A.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:i,versificationStr:l}=n,w=i||o.toString();let c;return l&&(c=new _t(l)),r?new A(r,a.toString(),w,c):new A}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>A.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(A.verseRangeSeparator)||this._verse.includes(A.verseSequenceIndicator))}get book(){return P.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=P.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=A.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=A.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>P.lastBook)throw new Lt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new _t(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(A.verseRangeSeparators,A.verseSequenceIndicators)}get BBBCCC(){return A.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return A.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const l=+i[1].trim();this.versification=new _t(ct[l])}catch{throw new Lt("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Lt("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||P.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!A.isVerseParseable(a[1]))throw new Lt("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new A(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof A?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=A.verseRangeSeparators,a=A.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=pn(this._verse,a);for(const l of i.map(w=>pn(w,r))){const w=this.clone();w.verse=l[0];const c=w.verseNum;if(o.push(w),l.length>1){const p=this.clone();if(p.verse=l[1],!n)for(let g=c+1;g<p.verseNum;g++){const b=new A(this._bookNum,this._chapterNum,g,this.versification);this.isExcluded||o.push(b)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const l=o.BBBCCCVVV;if(a>l)return 3;if(a===l)return 4;a=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>P.lastBook?2:(P.isCanonical(this._bookNum),0)}setEmpty(n=A.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=P.bookIdToNumber(n),this.chapter=r,this.verse=a}};I(et,"defaultVersification",_t.English),I(et,"verseRangeSeparator","-"),I(et,"verseSequenceIndicator",","),I(et,"verseRangeSeparators",[et.verseRangeSeparator]),I(et,"verseSequenceIndicators",[et.verseSequenceIndicator]),I(et,"chapterDigitShifter",1e3),I(et,"bookDigitShifter",et.chapterDigitShifter*et.chapterDigitShifter),I(et,"bcvMaxValue",et.chapterDigitShifter-1),I(et,"ValidStatusType",En);class Lt extends Error{}const ka=s.forwardRef(({bookId:e,handleSelectBook:n,isSelected:r,handleHighlightBook:a,handleKeyDown:o,bookType:i,children:l},w)=>t.jsxs(Rt,{ref:w,textValue:e,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[t.jsx("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":i.toLowerCase()==="ot","tw-border-s-purple-200":i.toLowerCase()==="nt","tw-border-s-indigo-200":i.toLowerCase()==="dc"}),children:P.bookIdToEnglishName(e)}),r&&t.jsx("div",{children:l})]},e));function Sa({handleSelectChapter:e,endChapter:n,activeChapter:r,highlightedChapter:a,handleHighlightedChapter:o}){const i=Array.from({length:n},(w,c)=>c+1),l=s.useCallback(w=>{o(w)},[o]);return t.jsx("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:i.map(w=>t.jsx("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":w===r,"tw-bg-amber-200":w===a}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(w)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(w)},tabIndex:0,onMouseMove:()=>l(w),children:w},w))})}const Ca=6,qe=P.allBookIds.filter(e=>!P.isObsolete(P.bookIdToNumber(e))),_a={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},un=["OT","NT","DC"],Ta=96,Ra=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],mn=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"]),Da='a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])',Xt=e=>N.getChaptersForBook(P.bookIdToNumber(e));function Ea(){return qe.map(n=>P.bookIdToEnglishName(n))}function Ma(e){return Ea().includes(e)}function Va(e){const n=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Ma(n))return qe.find(a=>P.bookIdToEnglishName(a)===n)}function za({scrRef:e,handleSubmit:n,className:r,getActiveBookIds:a}){const o=K(),[i,l]=s.useState(()=>N.formatScrRef(e,"English")),[w,c]=s.useState(""),[p,g]=s.useState(e.book),[b,u]=s.useState(e.chapterNum??0),[m,C]=s.useState(e.book),[D,j]=s.useState(!1),[y,T]=s.useState(D),R=s.useRef(void 0),z=s.useRef(void 0),H=s.useRef(void 0),ut=s.useCallback(h=>{const V=a?a():qe;return{OT:V.filter(k=>P.isBookOT(k)),NT:V.filter(k=>P.isBookNT(k)),DC:V.filter(k=>P.isBookDC(k))}[h].filter(k=>{const M=P.bookIdToEnglishName(k).toLowerCase(),W=w.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(W)||k.toLowerCase().includes(W)})},[w,a]),it=h=>{l(h),c(h)},_=s.useRef(!1),f=s.useCallback(()=>{l(N.formatScrRef(e,"English")),c(""),g(e.book),C(e.book)},[e]),F=s.useCallback(h=>{if(_.current){_.current=!1;return}j(h)},[]),E=s.useCallback((h,V,k,M)=>{if(u(e.book!==h?1:e.chapterNum),V||Xt(h)===-1){n({book:h,chapterNum:k??1,verseNum:M??1}),j(!1),c("");return}g(p!==h?h:""),j(!V)},[n,e.book,e.chapterNum,p]),tt=h=>{h<=0||h>Xt(p)||E(p,!0,h)},St=s.useCallback(()=>{Ra.forEach(h=>{const V=h.exec(w);if(V){const[k,M=void 0,W=void 0]=V.slice(1),G=Va(k);(P.isBookIdValid(k)||G)&&E(G??k,!0,M?parseInt(M,10):1,W?parseInt(W,10):1)}})},[E,w]),mt=s.useCallback(h=>{D?h.key==="ArrowDown"||h.key==="Tab"&&!h.shiftKey?(H!=null&&H.current?H.current.focus():z.current&&z.current.focus(),h.preventDefault()):h.key==="Escape"&&document.activeElement===R.current&&(j(!1),h.preventDefault(),h.stopPropagation()):h.key!=="Tab"&&j(!0)},[D]),Z=s.useCallback(h=>{if(!N.MODIFIER_KEYS.has(h.key)){if(h.key==="Tab"){if(h.shiftKey)R.current.focus();else{const V=[...document.querySelectorAll(Da)].filter(M=>{var W,G;return M instanceof HTMLElement&&((M.offsetWidth>0||M.offsetHeight>0)&&!((W=z.current)!=null&&W.contains(M))&&!((G=R.current)!=null&&G.contains(M))||M===h.target)}),k=h.target instanceof HTMLElement?V.indexOf(h.target):-1;k>=0?V[(k+1)%V.length].focus():R.current.focus()}h.preventDefault(),h.stopPropagation();return}h.stopPropagation(),R.current.focus(),R.current.dispatchEvent(new KeyboardEvent("keydown",{...h,view:void 0}))}},[]),U=s.useCallback(h=>{const{key:V}=h;mn.has(V)||(Z(h),h.preventDefault())},[Z]),S=s.useCallback((h,V)=>{const{key:k}=h;if(mn.has(k)){if(m===p){if(k==="Enter"){h.preventDefault(),E(p,!0,b);return}const M=k==="ArrowRight"&&!o||k==="ArrowRight"&&o==="ltr"||k==="ArrowLeft"&&o==="rtl",W=k==="ArrowLeft"&&!o||k==="ArrowLeft"&&o==="ltr"||k==="ArrowRight"&&o==="rtl";let G=0;if(M)if(b<Xt(m))G=1;else{h.preventDefault();return}else if(W)if(b>1)G=-1;else{h.preventDefault();return}else k==="ArrowDown"?G=Ca:k==="ArrowUp"&&(G=-6);if(b+G<=0||b+G>Xt(m))u(0);else if(G!==0){u(b+G),h.preventDefault();return}}if(V===0&&k==="ArrowUp"){h.preventDefault(),R.current.focus();return}return}Z(h)},[o,m,b,Z,p,E]);return s.useEffect(()=>{p===m?p===e.book?u(e.chapterNum):u(1):u(0)},[m,e.book,e.chapterNum,p]),s.useEffect(()=>{f()},[f]),s.useEffect(()=>{},[D,f]),s.useLayoutEffect(()=>{T(D)},[D]),s.useLayoutEffect(()=>{const h=setTimeout(()=>{var V,k;if(y&&z.current&&H.current){const W=H.current.offsetTop-Ta;z.current.scrollTo({top:W,behavior:"instant"}),R.current.focus()}!y&&document.activeElement!==R.current&&!((V=R.current)!=null&&V.contains(document.activeElement))&&document.activeElement!==z.current&&!((k=z.current)!=null&&k.contains(document.activeElement))&&f()},10);return()=>{clearTimeout(h)}},[y,f]),t.jsxs(Ot,{modal:!1,open:D,onOpenChange:F,children:[t.jsx(Zt,{asChild:!0,children:t.jsx(wa,{ref:R,value:i,handleSearch:it,handleKeyDown:mt,handleOnClick:()=>{g(e.book),C(e.book),u(e.chapterNum>0?e.chapterNum:0),j(!0),R.current.focus()},onFocus:()=>{_.current=!0},handleSubmit:St,placeholder:N.formatScrRef(e,"English"),className:r})}),t.jsx(Mt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},align:o==="ltr"?"start":"end",ref:z,onKeyDown:U,onFocus:h=>{var V,k;!((V=R.current)!=null&&V.contains(h.relatedTarget))&&!((k=z.current)!=null&&k.contains(h.relatedTarget))&&R.current.select()},children:t.jsx("div",{className:"rtl:tw-ps-2",children:un.map((h,V)=>{const k=ut(h);return k.length>0&&t.jsxs("div",{children:[t.jsx(Qt,{className:"tw-font-semibold tw-text-foreground/80",children:_a[h]}),k.map((M,W)=>t.jsx("div",{children:t.jsx(ka,{bookId:M,handleSelectBook:()=>E(M,!1),isSelected:p===M,handleHighlightBook:()=>C(M),handleKeyDown:G=>S(G,W),bookType:h,ref:G=>{p===M&&(H.current=G)},children:t.jsx(Sa,{handleSelectChapter:tt,endChapter:Xt(M),activeChapter:e.book===M?e.chapterNum:0,highlightedChapter:b,handleHighlightedChapter:G=>{u(G)}})})},M)),un.length-1!==V?t.jsx(Bt,{}):void 0]},h)})})})]})}const Mn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),O=s.forwardRef(({className:e,variant:n,size:r,asChild:a=!1,...o},i)=>{const l=a?zt.Slot:"button";return t.jsx(l,{className:d(Mn({variant:n,size:r,className:e})),ref:i,...o})});O.displayName="Button";const Ia=kt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),L=s.forwardRef(({className:e,...n},r)=>t.jsx(vn.Root,{ref:r,className:d("pr-twp",Ia(),e),...n}));L.displayName=vn.Root.displayName;const ue=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsx(qt.Root,{className:d("pr-twp tw-grid tw-gap-2",e),...n,ref:r,dir:a})});ue.displayName=qt.Root.displayName;const Ut=s.forwardRef(({className:e,...n},r)=>t.jsx(qt.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...n,children:t.jsx(qt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:t.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ut.displayName=qt.Item.displayName;const me=Kt.Root,he=Kt.Trigger,te=s.forwardRef(({className:e,align:n="center",sideOffset:r=4,...a},o)=>{const i=K();return t.jsx(Kt.Portal,{children:t.jsx(Kt.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...a,dir:i})})});te.displayName=Kt.Content.displayName;const Oa=pt.Portal,Vn=s.forwardRef(({className:e,...n},r)=>t.jsx(pt.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...n}));Vn.displayName=pt.Overlay.displayName;const Ba=s.forwardRef(({className:e,children:n,...r},a)=>{const o=K();return t.jsxs(Oa,{children:[t.jsx(Vn,{}),t.jsxs(pt.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...r,dir:o,children:[n,t.jsxs(pt.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[t.jsx(x.X,{className:"tw-h-4 tw-w-4"}),t.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ba.displayName=pt.Content.displayName;const Pa=s.forwardRef(({className:e,...n},r)=>t.jsx(pt.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...n}));Pa.displayName=pt.Title.displayName;const Aa=s.forwardRef(({className:e,...n},r)=>t.jsx(pt.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",e),...n}));Aa.displayName=pt.Description.displayName;const ee=s.forwardRef(({className:e,...n},r)=>t.jsx(rt.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...n}));ee.displayName=rt.Command.displayName;const ne=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[t.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),t.jsx(rt.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...n})]})});ne.displayName=rt.Command.Input.displayName;const re=s.forwardRef(({className:e,...n},r)=>t.jsx(rt.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...n}));re.displayName=rt.Command.List.displayName;const ae=s.forwardRef((e,n)=>t.jsx(rt.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...e}));ae.displayName=rt.Command.Empty.displayName;const ge=s.forwardRef(({className:e,...n},r)=>t.jsx(rt.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...n}));ge.displayName=rt.Command.Group.displayName;const zn=s.forwardRef(({className:e,...n},r)=>t.jsx(rt.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",e),...n}));zn.displayName=rt.Command.Separator.displayName;const oe=s.forwardRef(({className:e,...n},r)=>t.jsx(rt.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...n}));oe.displayName=rt.Command.Item.displayName;function Fa(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function ie({id:e,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:i,onChange:l=()=>{},getOptionLabel:w=Fa,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:g="",commandEmptyMessage:b="No option found",buttonVariant:u="outline",alignDropDown:m="start",isDisabled:C=!1,...D}){const[j,y]=s.useState(!1);return t.jsxs(me,{open:j,onOpenChange:y,...D,children:[t.jsx(he,{asChild:!0,children:t.jsxs(O,{variant:u,role:"combobox","aria-expanded":j,id:e,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:C,children:[t.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&t.jsx("div",{className:"tw-pe-2",children:c}),t.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?w(i):p})]}),t.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),t.jsx(te,{align:m,className:d("tw-w-[200px] tw-p-0",o),children:t.jsxs(ee,{children:[t.jsx(ne,{placeholder:g,className:"tw-text-inherit"}),t.jsx(ae,{children:b}),t.jsx(re,{children:n.map(T=>t.jsxs(oe,{value:w(T),onSelect:()=>{l(T),y(!1)},children:[t.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||w(i)!==w(T)})}),w(T)]},w(T)))})]})})]})}function In({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:i}){const l=s.useMemo(()=>Array.from({length:i},(p,g)=>g+1),[i]),w=p=>{r(p),p>n&&a(p)},c=p=>{a(p),p<e&&r(p)};return t.jsxs(t.Fragment,{children:[t.jsx(L,{htmlFor:"start-chapters-combobox",children:"Chapters"}),t.jsx(ie,{isDisabled:o,onChange:w,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:e},"start chapter"),t.jsx(L,{htmlFor:"end-chapters-combobox",children:"to"}),t.jsx(ie,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:p=>p.toString(),value:n},"end chapter")]})}var On=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(On||{});const Ga=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Se=(e,n)=>e[n]??n;function La({handleBookSelectionModeChange:e,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:i,handleSelectEndChapter:l,startChapter:w,handleSelectStartChapter:c,localizedStrings:p}){const g=Se(p,"%webView_bookSelector_currentBook%"),b=Se(p,"%webView_bookSelector_choose%"),u=Se(p,"%webView_bookSelector_chooseBooks%"),[m,C]=s.useState("current book"),D=j=>{C(j),e(j)};return t.jsx(ue,{className:"pr-twp tw-flex",value:m,onValueChange:j=>D(j),children:t.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[t.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[t.jsxs("div",{className:"tw-flex tw-items-center",children:[t.jsx(Ut,{value:"current book"}),t.jsx(L,{className:"tw-ms-1",children:g})]}),t.jsx(L,{className:"tw-flex tw-items-center",children:n}),t.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:t.jsx(In,{isDisabled:m==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:l,chapterCount:o,startChapter:w,endChapter:i})})]}),t.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[t.jsxs("div",{className:"tw-flex tw-items-center",children:[t.jsx(Ut,{value:"choose books"}),t.jsx(L,{className:"tw-ms-1",children:u})]}),t.jsx(L,{className:"tw-flex tw-items-center",children:a.map(j=>P.bookIdToEnglishName(j)).join(", ")}),t.jsx(O,{disabled:m==="current book",onClick:()=>r(),children:b})]})]})})}function Xa({table:e}){return t.jsxs(Ot,{children:[t.jsx(bn.DropdownMenuTrigger,{asChild:!0,children:t.jsxs(O,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[t.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),t.jsxs(Mt,{align:"end",className:"tw-w-[150px]",children:[t.jsx(Qt,{children:"Toggle columns"}),t.jsx(Bt,{}),e.getAllColumns().filter(n=>n.getCanHide()).map(n=>t.jsx(pe,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const Nt=Y.Root,Bn=Y.Group,jt=Y.Value,Pn=kt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),gt=s.forwardRef(({className:e,children:n,size:r,...a},o)=>{const i=K();return t.jsxs(Y.Trigger,{className:d(Pn({size:r,className:e})),ref:o,...a,dir:i,children:[n,t.jsx(Y.Icon,{asChild:!0,children:t.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});gt.displayName=Y.Trigger.displayName;const Ke=s.forwardRef(({className:e,...n},r)=>t.jsx(Y.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...n,children:t.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Ke.displayName=Y.ScrollUpButton.displayName;const Ue=s.forwardRef(({className:e,...n},r)=>t.jsx(Y.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...n,children:t.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Ue.displayName=Y.ScrollDownButton.displayName;const ft=s.forwardRef(({className:e,children:n,position:r="popper",...a},o)=>{const i=K();return t.jsx(Y.Portal,{children:t.jsxs(Y.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:r,...a,children:[t.jsx(Ke,{}),t.jsx(Y.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t.jsx("div",{dir:i,children:n})}),t.jsx(Ue,{})]})})});ft.displayName=Y.Content.displayName;const An=s.forwardRef(({className:e,...n},r)=>t.jsx(Y.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...n}));An.displayName=Y.Label.displayName;const nt=s.forwardRef(({className:e,children:n,...r},a)=>t.jsxs(Y.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[t.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsx(Y.ItemIndicator,{children:t.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),t.jsx(Y.ItemText,{children:n})]}));nt.displayName=Y.Item.displayName;const Fn=s.forwardRef(({className:e,...n},r)=>t.jsx(Y.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n}));Fn.displayName=Y.Separator.displayName;function $a({table:e}){return t.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:t.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[t.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),t.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),t.jsxs(Nt,{value:`${e.getState().pagination.pageSize}`,onValueChange:n=>{e.setPageSize(Number(n))},children:[t.jsx(gt,{className:"tw-h-8 tw-w-[70px]",children:t.jsx(jt,{placeholder:e.getState().pagination.pageSize})}),t.jsx(ft,{side:"top",children:[10,20,30,40,50].map(n=>t.jsx(nt,{value:`${n}`,children:n},n))})]})]}),t.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),t.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsxs(O,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[t.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),t.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),t.jsxs(O,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[t.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),t.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),t.jsxs(O,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[t.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),t.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),t.jsxs(O,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[t.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),t.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const At=s.forwardRef(({className:e,stickyHeader:n,...r},a)=>t.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!n}),children:t.jsx("table",{ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm",e),...r})}));At.displayName="Table";const Ft=s.forwardRef(({className:e,stickyHeader:n,...r},a)=>t.jsx("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",e),...r}));Ft.displayName="TableHeader";const Gt=s.forwardRef(({className:e,...n},r)=>t.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",e),...n}));Gt.displayName="TableBody";const Gn=s.forwardRef(({className:e,...n},r)=>t.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...n}));Gn.displayName="TableFooter";const lt=s.forwardRef(({className:e,...n},r)=>t.jsx("tr",{ref:r,className:d("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...n}));lt.displayName="TableRow";const ht=s.forwardRef(({className:e,...n},r)=>t.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...n}));ht.displayName="TableHead";const st=s.forwardRef(({className:e,...n},r)=>t.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...n}));st.displayName="TableCell";const Ln=s.forwardRef(({className:e,...n},r)=>t.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...n}));Ln.displayName="TableCaption";function Xn({columns:e,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{}}){var j;const[w,c]=s.useState([]),[p,g]=s.useState([]),[b,u]=s.useState({}),[m,C]=s.useState({}),D=Q.useReactTable({data:n,columns:e,getCoreRowModel:Q.getCoreRowModel(),...r&&{getPaginationRowModel:Q.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Q.getSortedRowModel(),onColumnFiltersChange:g,getFilteredRowModel:Q.getFilteredRowModel(),onColumnVisibilityChange:u,onRowSelectionChange:C,state:{sorting:w,columnFilters:p,columnVisibility:b,rowSelection:m}});return t.jsxs("div",{className:"pr-twp",children:[o&&t.jsx(Xa,{table:D}),t.jsxs(At,{stickyHeader:i,children:[t.jsx(Ft,{stickyHeader:i,children:D.getHeaderGroups().map(y=>t.jsx(lt,{children:y.headers.map(T=>t.jsx(ht,{children:T.isPlaceholder?void 0:Q.flexRender(T.column.columnDef.header,T.getContext())},T.id))},y.id))}),t.jsx(Gt,{children:(j=D.getRowModel().rows)!=null&&j.length?D.getRowModel().rows.map(y=>t.jsx(lt,{onClick:()=>l(y,D),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(T=>t.jsx(st,{children:Q.flexRender(T.column.columnDef.cell,T.getContext())},T.id))},y.id)):t.jsx(lt,{children:t.jsx(st,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&t.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[t.jsx(O,{variant:"outline",size:"sm",onClick:()=>D.previousPage(),disabled:!D.getCanPreviousPage(),children:"Previous"}),t.jsx(O,{variant:"outline",size:"sm",onClick:()=>D.nextPage(),disabled:!D.getCanNextPage(),children:"Next"})]}),r&&a&&t.jsx($a,{table:D})]})}function Ha({id:e,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return t.jsx("div",{id:e,className:d("pr-twp tw-prose",r),children:t.jsx(Ur,{options:o,children:n})})}var $n=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))($n||{});function Ya({id:e,label:n,groups:r}){return t.jsx("div",{id:e,children:t.jsxs(Ot,{children:[t.jsx(Zt,{asChild:!0,children:t.jsxs(O,{variant:"default",children:[t.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,t.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),t.jsx(Mt,{children:r.map(a=>t.jsxs("div",{children:[t.jsx(Qt,{children:a.label}),t.jsx(Fe,{children:a.items.map(o=>t.jsx("div",{children:o.itemType===0?t.jsx(pe,{onClick:o.onClick,children:o.label}):t.jsx(Xe,{onClick:o.onClick,value:o.label,children:o.label})},o.label))}),t.jsx(Bt,{})]},a.label))})]})})}function qa({id:e,category:n,downloads:r,languages:a,moreInfoUrl:o}){const i=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((w,c)=>w+c,0)),l=()=>{window.scrollTo(0,document.body.scrollHeight)};return t.jsxs("div",{id:e,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[t.jsx("div",{className:"tw-flex",children:t.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),t.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),t.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[t.jsxs("div",{className:"tw-flex tw-gap-1",children:[t.jsx(x.User,{className:"tw-h-4 tw-w-4"}),t.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:i})]}),t.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),t.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[t.jsx("div",{className:"tw-flex tw-gap-2",children:a.slice(0,3).map(w=>t.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w.toUpperCase()},w))}),a.length>3&&t.jsxs("button",{type:"button",onClick:()=>l(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",a.length-3," more languages"]})]}),t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[t.jsxs("div",{className:"tw-flex tw-gap-1",children:[t.jsx("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Website"}),t.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]}),t.jsxs("div",{className:"tw-flex tw-gap-1",children:[t.jsx("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Support"}),t.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})]})]})}function Ka({id:e,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function i(w){const c=new Date(w),p=new Date(o.getTime()-c.getTime()),g=p.getUTCFullYear()-1970,b=p.getUTCMonth(),u=p.getUTCDate()-1;let m="";return g>0?m=`${g.toString()} year${g===1?"":"s"} ago`:b>0?m=`${b.toString()} month${b===1?"":"s"} ago`:u===0?m="today":m=`${u.toString()} day${u===1?"":"s"} ago`,m}const l=Object.entries(n).sort((w,c)=>c[0].localeCompare(w[0]));return t.jsxs("div",{id:e,children:[t.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),t.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(w=>t.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[t.jsx("div",{className:"tw-text-foreground",children:t.jsx("li",{className:"tw-prose tw-text-xs",children:t.jsx("span",{children:w[1].description})})}),t.jsxs("div",{className:"tw-justify-end tw-text-right",children:[t.jsxs("div",{children:["Version ",w[0]]}),t.jsx("div",{children:i(w[1].date)})]})]},w[0]))}),l.length>5&&t.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ua({id:e,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const i=s.useMemo(()=>N.formatBytes(r),[r]),w=(c=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(g=>p.of(g))})(a);return t.jsx("div",{id:e,className:"tw-border-t tw-py-2",children:t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[t.jsx(Ka,{versionHistory:o}),t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[t.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),t.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[t.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[t.jsx("span",{children:"Publisher"}),t.jsx("span",{className:"tw-font-semibold",children:n}),t.jsx("span",{children:"Size"}),t.jsx("span",{className:"tw-font-semibold",children:i})]}),t.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:t.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[t.jsx("span",{children:"Languages"}),t.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}const Hn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Jt=s.forwardRef(({className:e,variant:n,...r},a)=>t.jsx("div",{ref:a,className:d("pr-twp",Hn({variant:n}),e),...r}));Jt.displayName="Badge";function Yn({entries:e,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i="No entries found",customSelectedText:l,isDisabled:w=!1,sortSelected:c=!1,icon:p=void 0,className:g=void 0}){const[b,u]=s.useState(!1),m=s.useCallback(j=>{var T;const y=(T=e.find(R=>R.label===j))==null?void 0:T.value;y&&a(r.includes(y)?r.filter(R=>R!==y):[...r,y])},[e,r,a]),C=()=>l||o,D=s.useMemo(()=>{if(!c)return e;const j=e.filter(T=>T.starred).sort((T,R)=>T.label.localeCompare(R.label)),y=e.filter(T=>!T.starred).sort((T,R)=>{const z=r.includes(T.value),H=r.includes(R.value);return z&&!H?-1:!z&&H?1:T.label.localeCompare(R.label)});return[...j,...y]},[e,r,c]);return t.jsx("div",{className:g,children:t.jsxs(me,{open:b,onOpenChange:u,children:[t.jsx(he,{asChild:!0,children:t.jsxs(O,{variant:"ghost",role:"combobox","aria-expanded":b,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<e.length&&"tw-border-primary","tw-group"),disabled:w,children:[t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[t.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:t.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),t.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===e.length}),children:t.jsx("div",{className:"tw-font-normal",children:C()})})]}),t.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),t.jsx(te,{align:"start",className:"tw-w-full tw-p-0",children:t.jsxs(ee,{children:[t.jsx(ne,{placeholder:`Search ${o.toLowerCase()}...`}),t.jsxs(re,{children:[t.jsx(ae,{children:i}),t.jsx(ge,{children:D.map(j=>{const y=n?n(j):void 0;return t.jsxs(oe,{value:j.label,onSelect:m,className:"tw-flex tw-items-center tw-gap-2",children:[t.jsx("div",{className:"w-4",children:t.jsx(x.Check,{className:d("tw-h-4 tw-w-4",r.includes(j.value)?"tw-opacity-100":"tw-opacity-0")})}),t.jsx("div",{className:"tw-w-4",children:j.starred&&t.jsx(x.Star,{className:"tw-h-4 tw-w-4"})}),t.jsx("div",{className:"tw-flex-grow",children:j.label}),n&&t.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:y})]},j.label)})})]})]})})]})})}function Ja({entries:e,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:g,badgesPlaceholder:b}){return t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[t.jsx(Yn,{entries:e,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:l,isDisabled:w,sortSelected:c,icon:p,className:g}),r.length>0?t.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(u=>{var m;return t.jsxs(Jt,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[t.jsx(O,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(C=>C!==u)),children:t.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(m=e.find(C=>C.value===u))==null?void 0:m.label]},u)})}):t.jsx(L,{children:b})]})}function Wa({occurrenceData:e,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const l=[];return e.forEach(w=>{l.some(c=>N.deepEqual(c,w))||l.push(w)}),l},[e]);return t.jsxs(At,{stickyHeader:!0,children:[t.jsx(Ft,{stickyHeader:!0,children:t.jsxs(lt,{children:[t.jsx(ht,{children:a}),t.jsx(ht,{children:o})]})}),t.jsx(Gt,{children:i.length>0&&i.map(l=>t.jsxs(lt,{onClick:()=>{n(l.reference)},children:[t.jsx(st,{children:`${P.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),t.jsx(st,{children:l.text})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const fe=s.forwardRef(({className:e,...n},r)=>t.jsx(De.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...n,children:t.jsx(De.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:t.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));fe.displayName=De.Root.displayName;const qn=kt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Za=s.forwardRef(({className:e,variant:n,size:r,...a},o)=>t.jsx(yn.Root,{ref:o,className:d(qn({variant:n,size:r,className:e})),...a}));Za.displayName=yn.Root.displayName;const Kn=s.createContext({size:"default",variant:"default"}),Je=s.forwardRef(({className:e,variant:n,size:r,children:a,...o},i)=>{const l=K();return t.jsx(ce.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,dir:l,children:t.jsx(Kn.Provider,{value:{variant:n,size:r},children:a})})});Je.displayName=ce.Root.displayName;const Yt=s.forwardRef(({className:e,children:n,variant:r,size:a,...o},i)=>{const l=s.useContext(Kn);return t.jsx(ce.Item,{ref:i,className:d(qn({variant:l.variant||r,size:l.size||a}),e),...o,children:n})});Yt.displayName=ce.Item.displayName;const be=e=>e==="asc"?t.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?t.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Qa=e=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>t.jsxs(O,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,be(n.getIsSorted())]})}),to=(e,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>t.jsxs(O,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,be(r.getIsSorted())]})}),eo=e=>({accessorKey:"count",header:({column:n})=>t.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:t.jsxs(O,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,be(n.getIsSorted())]})}),cell:({row:n})=>t.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),Ce=(e,n,r,a,o,i)=>{let l=[...r];e.forEach(c=>{n==="approved"?l.includes(c)||l.push(c):l=l.filter(p=>p!==c)}),a(l);let w=[...o];e.forEach(c=>{n==="unapproved"?w.includes(c)||w.push(c):w=w.filter(p=>p!==c)}),i(w)},no=(e,n,r,a,o)=>({accessorKey:"status",header:({column:i})=>t.jsx("div",{className:"tw-flex tw-justify-center",children:t.jsxs(O,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[e,be(i.getIsSorted())]})}),cell:({row:i})=>{const l=i.getValue("status"),w=i.getValue("item");return t.jsxs(Je,{value:l,variant:"outline",type:"single",children:[t.jsx(Yt,{onClick:c=>{c.stopPropagation(),Ce([w],"approved",n,r,a,o)},value:"approved",children:t.jsx(x.CircleCheckIcon,{})}),t.jsx(Yt,{onClick:c=>{c.stopPropagation(),Ce([w],"unapproved",n,r,a,o)},value:"unapproved",children:t.jsx(x.CircleXIcon,{})}),t.jsx(Yt,{onClick:c=>{c.stopPropagation(),Ce([w],"unknown",n,r,a,o)},value:"unknown",children:t.jsx(x.CircleHelpIcon,{})})]})}}),ro=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ao=e=>{const n=/^\\[vc]\s+(\d+)/,r=e.match(n);if(r)return+r[1]},oo=e=>{const n=e.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},Un=(e,n,r)=>r.includes(e)?"unapproved":n.includes(e)?"approved":"unknown",so=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),io=(e,n,r)=>{let a=e;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},lo=(e,n,r)=>{const a=[];return e.forEach(o=>{const i=a.find(l=>N.deepEqual(l.items,N.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const l={items:N.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:Un(N.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(l)}}),a},xt=(e,n)=>e[n]??n;function wo({inventoryItems:e,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:i,scope:l,onScopeChange:w,columns:c}){const p=xt(r,"%webView_inventory_all%"),g=xt(r,"%webView_inventory_approved%"),b=xt(r,"%webView_inventory_unapproved%"),u=xt(r,"%webView_inventory_unknown%"),m=xt(r,"%webView_inventory_scope_currentBook%"),C=xt(r,"%webView_inventory_scope_chapter%"),D=xt(r,"%webView_inventory_filter_text%"),j=xt(r,"%webView_inventory_show_additional_items%"),[y,T]=s.useState(!1),[R,z]=s.useState("all"),[H,ut]=s.useState(""),[it,_]=s.useState([]),f=s.useMemo(()=>e.length===0?[]:lo(e,o,i),[e,o,i]),F=s.useMemo(()=>{if(y)return f;const S=[];return f.forEach(h=>{const V=h.items[0],k=S.find(M=>M.items[0]===V);k?(k.count+=h.count,k.occurrences=k.occurrences.concat(h.occurrences)):S.push({items:[V],count:h.count,occurrences:h.occurrences,status:h.status})}),S},[y,f]),E=s.useMemo(()=>io(F,R,H),[F,R,H]),tt=s.useMemo(()=>{var V,k;if(!y)return c;const S=(V=a==null?void 0:a.tableHeaders)==null?void 0:V.length;if(!S)return c;const h=[];for(let M=0;M<S;M++)h.push(to(((k=a==null?void 0:a.tableHeaders)==null?void 0:k[M])||"Additional Item",M+1));return[...h,...c]},[a==null?void 0:a.tableHeaders,c,y]);s.useEffect(()=>{E.length===0?_([]):E.length===1&&_(E[0].items)},[E]);const St=(S,h)=>{h.setRowSelection(()=>{const V={};return V[S.index]=!0,V}),_(S.original.items)},mt=S=>{if(S==="book"||S==="chapter")w(S);else throw new Error(`Invalid scope value: ${S}`)},Z=S=>{if(S==="all"||S==="approved"||S==="unapproved"||S==="unknown")z(S);else throw new Error(`Invalid status filter value: ${S}`)},U=s.useMemo(()=>{if(F.length===0||it.length===0)return[];const S=F.filter(h=>N.deepEqual(y?h.items:[h.items[0]],it));if(S.length>1)throw new Error("Selected item is not unique");return S.length===0?[]:S[0].occurrences},[it,y,F]);return t.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[t.jsxs("div",{className:"tw-flex tw-items-stretch",children:[t.jsxs(Nt,{onValueChange:S=>Z(S),defaultValue:R,children:[t.jsx(gt,{className:"tw-m-1",children:t.jsx(jt,{placeholder:"Select filter"})}),t.jsxs(ft,{children:[t.jsx(nt,{value:"all",children:p}),t.jsx(nt,{value:"approved",children:g}),t.jsx(nt,{value:"unapproved",children:b}),t.jsx(nt,{value:"unknown",children:u})]})]}),t.jsxs(Nt,{onValueChange:S=>mt(S),defaultValue:l,children:[t.jsx(gt,{className:"tw-m-1",children:t.jsx(jt,{placeholder:"Select scope"})}),t.jsxs(ft,{children:[t.jsx(nt,{value:"book",children:m}),t.jsx(nt,{value:"chapter",children:C})]})]}),t.jsx(Et,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:D,value:H,onChange:S=>{ut(S.target.value)}}),a&&t.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[t.jsx(fe,{className:"tw-m-1",checked:y,onCheckedChange:S=>{T(S)}}),t.jsx(L,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??j})]})]}),t.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsx(Xn,{columns:tt,data:E,onRowClickHandler:St,stickyHeader:!0})}),U.length>0&&t.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsx(Wa,{occurrenceData:U,setScriptureReference:n,localizedStrings:r})})]})}const xe=s.forwardRef(({className:e,orientation:n="horizontal",decorative:r=!0,...a},o)=>t.jsx(Nn.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...a}));xe.displayName=Nn.Root.displayName;function Ve({className:e,...n}){return t.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...n})}const ve=Wt.Provider,ye=Wt.Root,Ne=Wt.Trigger,se=s.forwardRef(({className:e,sideOffset:n=4,...r},a)=>t.jsx(Wt.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r}));se.displayName=Wt.Content.displayName;const co="16rem",po="3rem",Jn=s.createContext(void 0);function je(){const e=s.useContext(Jn);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Wn=s.forwardRef(({defaultOpen:e=!0,open:n,onOpenChange:r,className:a,style:o,children:i,side:l="primary",...w},c)=>{const[p,g]=s.useState(e),b=n??p,u=s.useCallback(R=>{const z=typeof R=="function"?R(b):R;r?r(z):g(z)},[r,b]),m=s.useCallback(()=>u(R=>!R),[u]),C=b?"expanded":"collapsed",y=K()==="ltr"?l:l==="primary"?"secondary":"primary",T=s.useMemo(()=>({state:C,open:b,setOpen:u,toggleSidebar:m,side:y}),[C,b,u,m,y]);return t.jsx(Jn.Provider,{value:T,children:t.jsx(ve,{delayDuration:0,children:t.jsx("div",{style:{"--sidebar-width":co,"--sidebar-width-icon":po,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...w,children:i})})})});Wn.displayName="SidebarProvider";const Zn=s.forwardRef(({variant:e="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},i)=>{const l=je();return n==="none"?t.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...o,children:a}):t.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":e,"data-side":l.side,children:[t.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),t.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:t.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});Zn.displayName="Sidebar";const uo=s.forwardRef(({className:e,onClick:n,...r},a)=>{const o=je();return t.jsxs(O,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",e),onClick:i=>{n==null||n(i),o.toggleSidebar()},...r,children:[o.side==="primary"?t.jsx(x.PanelLeft,{}):t.jsx(x.PanelRight,{}),t.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});uo.displayName="SidebarTrigger";const mo=s.forwardRef(({className:e,...n},r)=>{const{toggleSidebar:a}=je();return t.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...n})});mo.displayName="SidebarRail";const Qn=s.forwardRef(({className:e,...n},r)=>t.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...n}));Qn.displayName="SidebarInset";const ho=s.forwardRef(({className:e,...n},r)=>t.jsx(Et,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...n}));ho.displayName="SidebarInput";const go=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...n}));go.displayName="SidebarHeader";const fo=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...n}));fo.displayName="SidebarFooter";const bo=s.forwardRef(({className:e,...n},r)=>t.jsx(xe,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...n}));bo.displayName="SidebarSeparator";const tr=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...n}));tr.displayName="SidebarContent";const ze=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...n}));ze.displayName="SidebarGroup";const Ie=s.forwardRef(({className:e,asChild:n=!1,...r},a)=>{const o=n?zt.Slot:"div";return t.jsx(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...r})});Ie.displayName="SidebarGroupLabel";const xo=s.forwardRef(({className:e,asChild:n=!1,...r},a)=>{const o=n?zt.Slot:"button";return t.jsx(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...r})});xo.displayName="SidebarGroupAction";const Oe=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",e),...n}));Oe.displayName="SidebarGroupContent";const er=s.forwardRef(({className:e,...n},r)=>t.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...n}));er.displayName="SidebarMenu";const nr=s.forwardRef(({className:e,...n},r)=>t.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",e),...n}));nr.displayName="SidebarMenuItem";const vo=kt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),rr=s.forwardRef(({asChild:e=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:i,...l},w)=>{const c=e?zt.Slot:"button",{state:p}=je(),g=t.jsx(c,{ref:w,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(vo({variant:r,size:a}),i),...l});return o?(typeof o=="string"&&(o={children:o}),t.jsxs(ye,{children:[t.jsx(Ne,{asChild:!0,children:g}),t.jsx(se,{side:"right",align:"center",hidden:p!=="collapsed",...o})]})):g});rr.displayName="SidebarMenuButton";const yo=s.forwardRef(({className:e,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const i=n?zt.Slot:"button";return t.jsx(i,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...a})});yo.displayName="SidebarMenuAction";const No=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...n}));No.displayName="SidebarMenuBadge";const jo=s.forwardRef(({className:e,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return t.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...r,children:[n&&t.jsx(Ve,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),t.jsx(Ve,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});jo.displayName="SidebarMenuSkeleton";const ko=s.forwardRef(({className:e,...n},r)=>t.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...n}));ko.displayName="SidebarMenuSub";const So=s.forwardRef(({...e},n)=>t.jsx("li",{ref:n,...e}));So.displayName="SidebarMenuSubItem";const Co=s.forwardRef(({asChild:e=!1,size:n="md",isActive:r,className:a,...o},i)=>{const l=e?zt.Slot:"a";return t.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});Co.displayName="SidebarMenuSubButton";function ar({id:e,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:w,className:c}){const p=s.useCallback((u,m)=>{a(u,m)},[a]),g=s.useCallback(u=>{const m=r.find(C=>C.projectId===u);return m?m.projectName:u},[r]),b=s.useCallback(u=>!o.projectId&&u===o.label,[o]);return t.jsx(Zn,{id:e,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:t.jsxs(tr,{children:[t.jsxs(ze,{children:[t.jsx(Ie,{className:"tw-text-sm",children:i}),t.jsx(Oe,{children:t.jsx(er,{children:Object.entries(n).map(([u,m])=>t.jsx(nr,{children:t.jsx(rr,{onClick:()=>p(u),isActive:b(u),children:t.jsx("span",{className:"tw-pl-3",children:m})})},u))})})]}),t.jsxs(ze,{children:[t.jsx(Ie,{className:"tw-text-sm",children:l}),t.jsx(Oe,{className:"tw-pl-3",children:t.jsx(ie,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(u=>u.projectId),getOptionLabel:u=>g(u),buttonPlaceholder:w,onChange:u=>{const m=g(u);p(m,u)},value:(o==null?void 0:o.projectId)??void 0,icon:t.jsx(x.ScrollText,{})})})]})]})})}function ke({value:e,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:i=!1}){const l=K();return t.jsxs("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[t.jsx(x.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),t.jsx(Et,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:e,onChange:w=>n(w.target.value),disabled:i}),e&&t.jsxs(O,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{n("")},children:[t.jsx(x.X,{className:"tw-h-4 tw-w-4"}),t.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}function _o({id:e,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:l,onSearch:w,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:g}){return t.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[t.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:t.jsx(ke,{className:"tw-w-9/12",value:l,onSearch:w,placeholder:"Search app settings, extension settings, and project settings"})}),t.jsxs(Wn,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[t.jsx(ar,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:p,buttonPlaceholderText:g}),t.jsx(Qn,{className:"tw-min-w-[215px]",children:a})]})]})}const vt="scrBook",To="scrRef",Tt="source",Ro="details",Do="Scripture Reference",Eo="Scripture Book",or="Type",Mo="Details";function Vo(e,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:vt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Do,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?P.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===vt?N.formatScrRef(o.start):void 0},getGroupingValue:a=>P.bookIdToNumber(a.start.book),sortingFn:(a,o)=>N.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>N.formatScrRef(a.start),id:To,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:N.formatScrRef(o.start)},sortingFn:(a,o)=>N.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:Tt,header:r?(e==null?void 0:e.typeColumnName)??or:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:Ro,header:(e==null?void 0:e.detailsColumnName)??Mo,cell:a=>a.getValue(),enableGrouping:!1}]}const zo=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:n}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||N.compareScrRefs(e.start,e.end)===0?`${N.scrRefToBBBCCCVVV(e.start)}+${n}`:`${N.scrRefToBBBCCCVVV(e.start)}+${n}-${N.scrRefToBBBCCCVVV(e.end)}+${r}`},hn=e=>`${zo({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Io({sources:e,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:l,onRowSelected:w}){const[c,p]=s.useState([]),[g,b]=s.useState([{id:vt,desc:!1}]),[u,m]=s.useState({}),C=s.useMemo(()=>e.flatMap(_=>_.data.map(f=>({...f,source:_.source}))),[e]),D=s.useMemo(()=>Vo({scriptureReferenceColumnName:a,typeColumnName:i,detailsColumnName:l},r),[a,i,l,r]);s.useEffect(()=>{c.includes(Tt)?b([{id:Tt,desc:!1},{id:vt,desc:!1}]):b([{id:vt,desc:!1}])},[c]);const j=Q.useReactTable({data:C,columns:D,state:{grouping:c,sorting:g,rowSelection:u},onGroupingChange:p,onSortingChange:b,onRowSelectionChange:m,getExpandedRowModel:Q.getExpandedRowModel(),getGroupedRowModel:Q.getGroupedRowModel(),getCoreRowModel:Q.getCoreRowModel(),getSortedRowModel:Q.getSortedRowModel(),getRowId:hn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(w){const _=j.getSelectedRowModel().rowsById,f=Object.keys(_);if(f.length===1){const F=C.find(E=>hn(E)===f[0])||void 0;F&&w(F)}}},[u,C,w,j]);const y=o??Eo,T=i??or,R=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[vt]},{label:`Group by ${T}`,value:[Tt]},{label:`Group by ${y} and ${T}`,value:[vt,Tt]},{label:`Group by ${T} and ${y}`,value:[Tt,vt]}],z=_=>{p(JSON.parse(_))},H=(_,f)=>{!_.getIsGrouped()&&!_.getIsSelected()&&_.getToggleSelectedHandler()(f)},ut=(_,f)=>_.getIsGrouped()?"":d("banded-row",f%2===0?"even":"odd"),it=(_,f,F)=>{if(!((_==null?void 0:_.length)===0||f.depth<F.column.getGroupedIndex())){if(f.getIsGrouped())switch(f.depth){case 1:return"tw-ps-4";default:return}switch(f.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return t.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&t.jsxs(Nt,{value:JSON.stringify(c),onValueChange:_=>{z(_)},children:[t.jsx(gt,{className:"tw-mb-1 tw-mt-2",children:t.jsx(jt,{})}),t.jsx(ft,{position:"item-aligned",children:t.jsx(Bn,{children:R.map(_=>t.jsx(nt,{value:JSON.stringify(_.value),children:_.label},_.label))})})]}),t.jsxs(At,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&t.jsx(Ft,{children:j.getHeaderGroups().map(_=>t.jsx(lt,{children:_.headers.filter(f=>f.column.columnDef.header).map(f=>t.jsx(ht,{colSpan:f.colSpan,className:"top-0 tw-sticky",children:f.isPlaceholder?void 0:t.jsxs("div",{children:[f.column.getCanGroup()?t.jsx(O,{variant:"ghost",title:`Toggle grouping by ${f.column.columnDef.header}`,onClick:f.column.getToggleGroupingHandler(),type:"button",children:f.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Q.flexRender(f.column.columnDef.header,f.getContext())]})},f.id))},_.id))}),t.jsx(Gt,{children:j.getRowModel().rows.map((_,f)=>{const F=K();return t.jsx(lt,{"data-state":_.getIsSelected()?"selected":"",className:d(ut(_,f)),onClick:E=>H(_,E),children:_.getVisibleCells().map(E=>{if(!(E.getIsPlaceholder()||E.column.columnDef.enableGrouping&&!E.getIsGrouped()&&(E.column.columnDef.id!==Tt||!r)))return t.jsx(st,{className:d(E.column.columnDef.id,"tw-p-[1px]",it(c,_,E)),children:E.getIsGrouped()?t.jsxs(O,{variant:"link",onClick:_.getToggleExpandedHandler(),type:"button",children:[_.getIsExpanded()&&t.jsx(x.ChevronDown,{}),!_.getIsExpanded()&&(F==="ltr"?t.jsx(x.ChevronRight,{}):t.jsx(x.ChevronLeft,{}))," ",Q.flexRender(E.column.columnDef.cell,E.getContext())," (",_.subRows.length,")"]}):Q.flexRender(E.column.columnDef.cell,E.getContext())},E.id)})},_.id)})})]})]})}var yt=(e=>(e.OT="OT",e.NT="NT",e.DC="DC",e.Extra="Extra",e))(yt||{});const Oo=(e,n,r,a,o)=>{switch(e){case"OT":return n??"Old Testament";case"NT":return r??"New Testament";case"DC":return a??"Deuterocanon";case"Extra":return o??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},Bo=(e,n,r,a,o)=>{switch(e){case"OT":return n??"OT";case"NT":return r??"NT";case"DC":return a??"DC";case"Extra":return o??"Extra";default:throw new Error(`Unknown section: ${e}`)}},Vt=e=>{if(P.isBookOT(e))return"OT";if(P.isBookNT(e))return"NT";if(P.isBookDC(e))return"DC";if(P.isExtraMaterial(e))return"Extra";throw new Error(`Unknown section for book: ${e}`)},We=(e,n)=>e.filter(r=>{try{return Vt(r)===n}catch{return!1}}),sr=(e,n,r)=>We(e,n).every(a=>r.includes(a));function Po({bookId:e,selectedBookIds:n,toggleBook:r,lastKeyEventShiftKey:a,localizedBookNames:o}){var w,c;const i=s.useRef(!1),l=s.useRef();return t.jsxs(oe,{value:e,className:"tw-flex tw-items-center",onSelect:()=>{i.current||(r(e,a.current),a.current=!1),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{i.current=!1},100)},onMouseDown:p=>{p.preventDefault(),i.current=!0,r(e,p.shiftKey)},role:"option","aria-selected":n.includes(e),"aria-label":`${P.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,children:[t.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",n.includes(e)?"tw-opacity-100":"tw-opacity-0")}),t.jsx("span",{className:d("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":Vt(e)===yt.OT,"tw-border-s-purple-200":Vt(e)===yt.NT,"tw-border-s-indigo-200":Vt(e)===yt.DC,"tw-border-s-yellow-200":Vt(e)===yt.Extra}),children:o&&((w=o.get(e))==null?void 0:w.localizedName)||P.bookIdToEnglishName(e)}),t.jsx("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:o&&((c=o.get(e))==null?void 0:c.localizedId)||e.toLocaleUpperCase()})]},e)}function Ao({section:e,availableBookIds:n,selectedBookIds:r,onToggle:a,localizedStrings:o}){const i=We(n,e).length===0,l=o["%scripture_section_ot_short%"],w=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],p=o["%scripture_section_extra_short%"];return t.jsx(O,{variant:"outline",size:"sm",onClick:()=>a(e),className:d(sr(n,e,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Bo(e,l,w,c,p)})}const gn=5,_e=6;function Fo({availableBookInfo:e,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:a,localizedBookNames:o}){const i=a["%webView_book_selector_books_selected%"],l=a["%webView_book_selector_select_books%"],w=a["%webView_book_selector_search_books%"],c=a["%webView_book_selector_select_all%"],p=a["%webView_book_selector_clear_all%"],g=a["%webView_book_selector_no_book_found%"],b=a["%webView_book_selector_more%"],u=a["%scripture_section_ot_long%"],m=a["%scripture_section_nt_long%"],C=a["%scripture_section_dc_long%"],D=a["%scripture_section_extra_long%"],[j,y]=s.useState(!1),T=s.useRef(void 0),R=s.useRef(!1);if(e.length!==P.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const z=s.useMemo(()=>P.allBookIds.filter((f,F)=>e[F]==="1"&&!P.isObsolete(P.bookIdToNumber(f))),[e]),H=s.useCallback((f,F=!1)=>{if(!F||!T.current){r(n.includes(f)?n.filter(U=>U!==f):[...n,f]),T.current=f;return}const E=z.findIndex(U=>U===T.current),tt=z.findIndex(U=>U===f);if(E===-1||tt===-1)return;const[St,mt]=[Math.min(E,tt),Math.max(E,tt)],Z=z.slice(St,mt+1).map(U=>U);r(n.includes(f)?n.filter(U=>!Z.includes(U)):[...new Set([...n,...Z])])},[n,r,z]),ut=s.useCallback(f=>{const F=We(z,f).map(E=>E);r(sr(z,f,n)?n.filter(E=>!F.includes(E)):[...new Set([...n,...F])])},[n,r,z]),it=()=>{r(z.map(f=>f))},_=()=>{r([])};return t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(yt).map(f=>t.jsx(Ao,{section:f,availableBookIds:z,selectedBookIds:n,onToggle:ut,localizedStrings:a},f))}),t.jsxs(me,{open:j,onOpenChange:y,children:[t.jsx(he,{asChild:!0,children:t.jsxs(O,{variant:"outline",role:"combobox","aria-expanded":j,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${i}: ${n.length}`:l,t.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),t.jsx(te,{className:"tw-w-full tw-p-0",align:"start",children:t.jsxs(ee,{onKeyDown:f=>{f.key==="Enter"&&(R.current=f.shiftKey)},children:[t.jsx(ne,{placeholder:w}),t.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[t.jsx(O,{variant:"ghost",size:"sm",onClick:it,children:c}),t.jsx(O,{variant:"ghost",size:"sm",onClick:_,children:p})]}),t.jsxs(re,{children:[t.jsx(ae,{children:g}),Object.values(yt).map((f,F)=>{const E=z.filter(tt=>Vt(tt)===f);if(E.length!==0)return t.jsxs(s.Fragment,{children:[t.jsx(ge,{heading:Oo(f,u,m,C,D),children:E.map(tt=>t.jsx(Po,{bookId:tt,selectedBookIds:n,toggleBook:H,lastKeyEventShiftKey:R,localizedBookNames:o},tt))}),F<Object.values(yt).length-1&&t.jsx(zn,{})]},f)})]})]})})]}),n.length>0&&t.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===_e?_e:gn).map(f=>{var F;return t.jsx(Jt,{className:"hover:tw-bg-secondary",variant:"secondary",children:o&&((F=o.get(f))==null?void 0:F.localizedName)||P.bookIdToEnglishName(f)||f},f)}),n.length>_e&&t.jsx(Jt,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-gn} ${b}`})]})]})}const Go=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Ct=(e,n)=>e[n]??n;function Lo({scope:e,availableScopes:n,onScopeChange:r,availableBookInfo:a,selectedBookIds:o,onSelectedBookIdsChange:i,localizedStrings:l,localizedBookNames:w}){const c=Ct(l,"%webView_scope_selector_selected_text%"),p=Ct(l,"%webView_scope_selector_current_verse%"),g=Ct(l,"%webView_scope_selector_current_chapter%"),b=Ct(l,"%webView_scope_selector_current_book%"),u=Ct(l,"%webView_scope_selector_choose_books%"),m=Ct(l,"%webView_scope_selector_scope%"),C=Ct(l,"%webView_scope_selector_select_books%"),D=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:g,id:"scope-chapter"},{value:"book",label:b,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],j=n?D.filter(y=>n.includes(y.value)):D;return t.jsxs("div",{className:"tw-grid tw-gap-4",children:[t.jsxs("div",{className:"tw-grid tw-gap-2",children:[t.jsx(L,{children:m}),t.jsx(ue,{value:e,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:y,label:T,id:R})=>t.jsxs("div",{className:"tw-flex tw-items-center",children:[t.jsx(Ut,{className:"tw-me-2",value:y,id:R}),t.jsx(L,{htmlFor:R,children:T})]},R))})]}),e==="selectedBooks"&&t.jsxs("div",{className:"tw-grid tw-gap-2",children:[t.jsx(L,{children:C}),t.jsx(Fo,{availableBookInfo:a,selectedBookIds:o,onChangeSelectedBookIds:i,localizedStrings:l,localizedBookNames:w})]})]})}const Te={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Xo({availableScrollGroupIds:e,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o,className:i}){const l={...Te,...Object.fromEntries(Object.entries(a).map(([c,p])=>[c,c===p&&c in Te?Te[c]:p]))},w=K();return t.jsxs(Nt,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[t.jsx(gt,{size:o,className:d("pr-twp tw-w-auto",i),children:t.jsx(jt,{placeholder:l[N.getLocalizeKeyForScrollGroupId(n)]??n})}),t.jsx(ft,{align:w==="rtl"?"end":"start",style:{zIndex:250},children:e.map(c=>t.jsx(nt,{value:`${c}`,children:l[N.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function $o({children:e}){return t.jsx("div",{className:"pr-twp tw-grid",children:e})}function Ho({primary:e,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return t.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[t.jsxs("div",{children:[t.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),t.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?t.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):t.jsx("div",{children:r})]})}function Yo({primary:e,secondary:n,includeSeparator:r=!1}){return t.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[t.jsxs("div",{children:[t.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),t.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?t.jsx(xe,{}):""]})}function ir(e,n){var r;return(r=Object.entries(e).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function le({icon:e,menuLabel:n,leading:r}){return e?t.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:e,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const lr=(e,n,r,a)=>r?Object.entries(e).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>n.filter(w=>w.group===i).sort((w,c)=>w.order-c.order).map(w=>t.jsxs(ye,{children:[t.jsx(Ne,{asChild:!0,children:"command"in w?t.jsxs(Rt,{onClick:()=>{a(w)},children:[w.iconPathBefore&&t.jsx(le,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&t.jsx(le,{icon:w.iconPathAfter,menuLabel:w.label})]},`dropdown-menu-item-${w.label}-${w.command}`):t.jsxs(kn,{children:[t.jsx(Ge,{children:w.label}),t.jsx(jn,{children:t.jsx(Le,{children:lr(e,n,ir(e,w.id),a)})})]},`dropdown-menu-sub-${w.label}-${w.id}`)}),w.tooltip&&t.jsx(se,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`))):void 0;function Be({onSelectMenuItem:e,menuData:n,tabLabel:r,icon:a,className:o,variant:i,id:l}){return t.jsxs(Ot,{variant:i,children:[t.jsx(Zt,{"aria-label":r,className:o,asChild:!0,id:l,children:t.jsx(O,{variant:"ghost",size:"icon",children:a??t.jsx(x.MenuIcon,{})})}),t.jsx(Mt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,c])=>typeof w=="boolean"||typeof c=="boolean"?0:w.order-c.order).map(([w],c,p)=>t.jsxs(s.Fragment,{children:[t.jsx(Fe,{children:t.jsx(ve,{children:lr(n.groups,n.items,w,e)})}),c<p.length-1&&t.jsx(Bt,{})]},w))})]})}function qo({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:a,id:o,className:i,startAreaChildren:l,centerAreaChildren:w,endAreaChildren:c}){return t.jsxs("div",{className:d("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",i),id:o,children:[r&&t.jsx(Be,{onSelectMenuItem:e,menuData:r,tabLabel:"Project",icon:t.jsx(x.Menu,{}),className:"tw-h-full tw-w-8"}),t.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),t.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:w}),t.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&t.jsx(Be,{onSelectMenuItem:n,menuData:a,tabLabel:"View Info",icon:t.jsx(x.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}const Ze=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsx(at.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...n,dir:a})});Ze.displayName=at.List.displayName;const Qe=s.forwardRef(({className:e,...n},r)=>t.jsx(at.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...n}));Qe.displayName=at.List.displayName;const wr=s.forwardRef(({className:e,...n},r)=>t.jsx(at.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),tn=s.forwardRef(({className:e,...n},r)=>t.jsx(at.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...n}));tn.displayName=at.Content.displayName;function Ko({tabList:e,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:i}){return t.jsxs("div",{className:"pr-twp",children:[t.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?t.jsx("h1",{children:o}):"",t.jsx(ke,{className:i,value:n,onSearch:r,placeholder:a})]}),t.jsxs(Ze,{children:[t.jsx(Qe,{children:e.map(l=>t.jsx(wr,{value:l.value,children:l.value},l.key))}),e.map(l=>t.jsx(tn,{value:l.value,children:l.content},l.key))]})]})}function Uo({...e}){return t.jsx($.Menu,{...e})}function Jo({...e}){return t.jsx($.Sub,{"data-slot":"menubar-sub",...e})}const dr=s.forwardRef(({className:e,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return t.jsx(Ae.Provider,{value:o,children:t.jsx($.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...r})})});dr.displayName=$.Root.displayName;const cr=s.forwardRef(({className:e,...n},r)=>{const a=dt();return t.jsx($.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",bt({variant:a.variant,className:e})),...n})});cr.displayName=$.Trigger.displayName;const pr=s.forwardRef(({className:e,inset:n,children:r,...a},o)=>{const i=dt();return t.jsxs($.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",bt({variant:i.variant,className:e}),e),...a,children:[r,t.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});pr.displayName=$.SubTrigger.displayName;const ur=s.forwardRef(({className:e,...n},r)=>{const a=dt();return t.jsx($.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},e),...n})});ur.displayName=$.SubContent.displayName;const mr=s.forwardRef(({className:e,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},i)=>{const l=dt();return t.jsx($.Portal,{children:t.jsx($.Content,{ref:i,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},e),...o})})});mr.displayName=$.Content.displayName;const hr=s.forwardRef(({className:e,inset:n,...r},a)=>{const o=dt();return t.jsx($.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",bt({variant:o.variant,className:e}),e),...r})});hr.displayName=$.Item.displayName;const Wo=s.forwardRef(({className:e,children:n,checked:r,...a},o)=>{const i=dt();return t.jsxs($.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",bt({variant:i.variant,className:e}),e),checked:r,...a,children:[t.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsx($.ItemIndicator,{children:t.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Wo.displayName=$.CheckboxItem.displayName;const Zo=s.forwardRef(({className:e,children:n,...r},a)=>{const o=dt();return t.jsxs($.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",bt({variant:o.variant,className:e}),e),...r,children:[t.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsx($.ItemIndicator,{children:t.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Zo.displayName=$.RadioItem.displayName;const Qo=s.forwardRef(({className:e,inset:n,...r},a)=>t.jsx($.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",e),...r}));Qo.displayName=$.Label.displayName;const gr=s.forwardRef(({className:e,...n},r)=>t.jsx($.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n}));gr.displayName=$.Separator.displayName;const $t=(e,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=e.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},fr=(e,n,r,a)=>{if(!r)return;const o=Object.entries(e).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return o.flatMap(([i],l)=>{const w=n.filter(p=>p.group===i).sort((p,g)=>p.order-g.order).map(p=>t.jsxs(ye,{children:[t.jsx(Ne,{asChild:!0,children:"command"in p?t.jsxs(hr,{onClick:()=>{a(p)},children:[p.iconPathBefore&&t.jsx(le,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0}),p.label,p.iconPathAfter&&t.jsx(le,{icon:p.iconPathAfter,menuLabel:p.label})]},`menubar-item-${p.label}-${p.command}`):t.jsxs(Jo,{children:[t.jsx(pr,{children:p.label}),t.jsx(ur,{children:fr(e,n,ir(e,p.id),a)})]},`menubar-sub-${p.label}-${p.id}`)}),p.tooltip&&t.jsx(se,{children:p.tooltip})]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`)),c=[...w];return w.length>0&&l<o.length-1&&c.push(t.jsx(gr,{},`separator-${i}`)),c})};function ts({menuData:e,onSelectMenuItem:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),i=s.useRef(void 0),l=s.useRef(void 0),w=s.useRef(void 0),c=s.useRef(void 0),p=g=>{switch(g){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return w;case"platform.help":return c;default:return}};if(ra.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(g,b)=>{var C,D,j,y;g.preventDefault();const u={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(b.hotkey){case"alt":$t(i,[u]);break;case"alt+p":(C=i.current)==null||C.focus(),$t(i,[u,m]);break;case"alt+l":(D=l.current)==null||D.focus(),$t(l,[u,m]);break;case"alt+n":(j=w.current)==null||j.focus(),$t(w,[u,m]);break;case"alt+h":(y=c.current)==null||y.focus(),$t(c,[u,m]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const g=new MutationObserver(m=>{m.forEach(C=>{if(C.attributeName==="data-state"&&C.target instanceof HTMLElement){const D=C.target.getAttribute("data-state");r(D==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(m=>{g.observe(m,{attributes:!0})}),()=>g.disconnect()},[r]),!!e)return t.jsx(dr,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(e.columns).filter(([,g])=>typeof g=="object").sort(([,g],[,b])=>typeof g=="boolean"||typeof b=="boolean"?0:g.order-b.order).map(([g,b])=>t.jsxs(Uo,{children:[t.jsx(cr,{ref:p(g),children:typeof b=="object"&&"label"in b&&b.label}),t.jsx(mr,{className:"tw-z-[250]",children:t.jsx(ve,{children:fr(e.groups,e.items,g,n)})})]},g))})}function es(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ns({menuData:e,onOpenChange:n,onSelectMenuItem:r,className:a,id:o,children:i,appMenuAreaChildren:l,configAreaChildren:w,shouldUseAsAppDragArea:c,menubarVariant:p="default"}){const g=s.useRef(void 0);return t.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:g,style:{position:"relative"},id:o,children:t.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[t.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[l,e&&t.jsx(ts,{menuData:e,onOpenChange:n,onSelectMenuItem:r,variant:p})]})}),t.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),t.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:t.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:w})})]})})}const rs=(e,n)=>e[n]??n;function as({knownUiLanguages:e,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:l,className:w}){const c=rs(l,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,g]=s.useState(!1),b=m=>{o&&o(m),a&&a([m,...r.filter(C=>C!==m)]),i&&r.find(C=>C===m)&&i([...r.filter(C=>C!==m)]),g(!1)},u=(m,C)=>{var j,y,T,R,z,H;const D=C!==m?((y=(j=e[m])==null?void 0:j.uiNames)==null?void 0:y[C])??((R=(T=e[m])==null?void 0:T.uiNames)==null?void 0:R.en):void 0;return D?`${(z=e[m])==null?void 0:z.autonym} (${D})`:(H=e[m])==null?void 0:H.autonym};return t.jsxs("div",{className:d("pr-twp tw-max-w-sm",w),children:[t.jsxs(Nt,{name:"uiLanguage",value:n,onValueChange:b,open:p,onOpenChange:m=>g(m),children:[t.jsx(gt,{children:t.jsx(jt,{})}),t.jsx(ft,{className:"tw-z-[250]",children:Object.keys(e).map(m=>t.jsx(nt,{value:m,children:u(m,n)},m))})]}),n!=="en"&&t.jsxs(t.Fragment,{children:[t.jsx(L,{className:"tw-ms-3",children:c}),t.jsx("div",{className:"tw-ms-3",children:t.jsxs(L,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(m=>u(m,n)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}function os({item:e,createLabel:n,createComplexLabel:r}){return n?t.jsx(L,{children:n(e)}):r?t.jsx(L,{children:r(e)}):t.jsx(L,{children:e})}function ss({id:e,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:i,createComplexLabel:l}){return t.jsx("div",{id:e,className:n,children:r.map(w=>t.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[t.jsx(fe,{className:"tw-me-2 tw-align-middle",checked:a.includes(w),onCheckedChange:c=>o(w,c)}),t.jsx(os,{item:w,createLabel:i,createComplexLabel:l})]},w))})}const we=s.forwardRef(({className:e,...n},r)=>t.jsx(x.LoaderCircle,{size:35,className:d("tw-animate-spin",e),...n,ref:r}));we.displayName="Spinner";function is({id:e,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:i,placeholder:l,isRequired:w=!1,className:c,defaultValue:p,value:g,onChange:b,onFocus:u,onBlur:m}){return t.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[t.jsx(L,{htmlFor:e,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${w?"*":""}`}),t.jsx(Et,{id:e,disabled:n,placeholder:l,required:w,className:d(c,{"tw-border-red-600":r}),defaultValue:p,value:g,onChange:b,onFocus:u,onBlur:m}),t.jsx("p",{className:d({"tw-hidden":!o}),children:o})]})}const ls=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),fn=(e,n)=>e[n]??n;function ws({errorDetails:e,handleCopyNotify:n,localizedStrings:r}){const a=fn(r,"%webView_error_dump_header%"),o=fn(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),n&&n()}return t.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[t.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[t.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[t.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),t.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:o})]}),t.jsx(O,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:t.jsx(x.Copy,{})})]}),t.jsx("div",{className:"tw-prose tw-w-full",children:t.jsx("pre",{className:"tw-text-xs",children:e})})]})}const ds=kt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),br=s.forwardRef(({className:e,variant:n,...r},a)=>t.jsx("div",{ref:a,role:"alert",className:d(ds({variant:n}),e),...r}));br.displayName="Alert";const xr=s.forwardRef(({className:e,...n},r)=>t.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...n,children:[n.children," "]}));xr.displayName="AlertTitle";const vr=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",e),...n}));vr.displayName="AlertDescription";const yr=s.forwardRef(({className:e,...n},r)=>t.jsx(It.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...n}));yr.displayName=It.Root.displayName;const Nr=s.forwardRef(({className:e,...n},r)=>t.jsx(It.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...n}));Nr.displayName=It.Image.displayName;const jr=s.forwardRef(({className:e,...n},r)=>t.jsx(It.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...n}));jr.displayName=It.Fallback.displayName;const en=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...n}));en.displayName="Card";const nn=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...n}));nn.displayName="CardHeader";const rn=s.forwardRef(({className:e,...n},r)=>t.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...n,children:n.children}));rn.displayName="CardTitle";const kr=s.forwardRef(({className:e,...n},r)=>t.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",e),...n}));kr.displayName="CardDescription";const de=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",e),...n}));de.displayName="CardContent";const an=s.forwardRef(({className:e,...n},r)=>t.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...n}));an.displayName="CardFooter";const Sr=s.createContext({direction:"bottom"});function Cr({shouldScaleBackground:e=!0,direction:n="bottom",...r}){const a=s.useMemo(()=>({direction:n}),[n]);return t.jsx(Sr.Provider,{value:a,children:t.jsx(wt.Drawer.Root,{shouldScaleBackground:e,direction:n,...r})})}Cr.displayName="Drawer";const cs=wt.Drawer.Trigger,_r=wt.Drawer.Portal,ps=wt.Drawer.Close,on=s.forwardRef(({className:e,...n},r)=>t.jsx(wt.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...n}));on.displayName=wt.Drawer.Overlay.displayName;const Tr=s.forwardRef(({className:e,children:n,...r},a)=>{const{direction:o="bottom"}=s.useContext(Sr),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return t.jsxs(_r,{children:[t.jsx(on,{}),t.jsxs(wt.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",o==="bottom"||o==="top"?"tw-flex-col":"tw-flex-row",i[o],e),...r,children:[(o==="bottom"||o==="right")&&t.jsx("div",{className:l[o]}),t.jsx("div",{className:"tw-flex tw-flex-col",children:n}),(o==="top"||o==="left")&&t.jsx("div",{className:l[o]})]})]})});Tr.displayName="DrawerContent";function Rr({className:e,...n}){return t.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...n})}Rr.displayName="DrawerHeader";function Dr({className:e,...n}){return t.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...n})}Dr.displayName="DrawerFooter";const Er=s.forwardRef(({className:e,...n},r)=>t.jsx(wt.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...n}));Er.displayName=wt.Drawer.Title.displayName;const Mr=s.forwardRef(({className:e,...n},r)=>t.jsx(wt.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",e),...n}));Mr.displayName=wt.Drawer.Description.displayName;const Vr=s.forwardRef(({className:e,value:n,...r},a)=>t.jsx(Ee.Root,{ref:a,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...r,children:t.jsx(Ee.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));Vr.displayName=Ee.Root.displayName;function us({...e}){return t.jsx(xn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const zr=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsxs(Ht.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...n,dir:a,children:[t.jsx(Ht.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:t.jsx(Ht.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),t.jsx(Ht.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});zr.displayName=Ht.Root.displayName;const Ir=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsx(Me.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...n,ref:r,children:t.jsx(Me.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});Ir.displayName=Me.Root.displayName;const ms=at.Root,Or=s.forwardRef(({className:e,...n},r)=>{const a=K();return t.jsx(at.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...n,dir:a})});Or.displayName=at.List.displayName;const Br=s.forwardRef(({className:e,...n},r)=>t.jsx(at.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...n}));Br.displayName=at.Trigger.displayName;const Pr=s.forwardRef(({className:e,...n},r)=>t.jsx(at.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...n}));Pr.displayName=at.Content.displayName;const Ar=s.forwardRef(({className:e,...n},r)=>t.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:r,...n}));Ar.displayName="Textarea";function hs({defaultValue:e,onChange:n,variant:r,types:a}){return t.jsxs(Nt,{defaultValue:e??"all",onValueChange:n,children:[t.jsx(gt,{className:d("tw-w-16 [&>svg]:tw-min-w-4",{"tw-border-none tw-bg-transparent hover:tw-bg-secondary hover:tw-text-secondary-foreground":r==="ghost"}),children:t.jsx(jt,{})}),t.jsxs(ft,{position:"popper",children:[t.jsx(nt,{value:"all",children:"All"}),a.map(o=>{const i=o.icon;return t.jsx(nt,{value:o.key,children:t.jsxs("div",{className:"tw-align-center tw-flex tw-justify-start tw-gap-2",children:[t.jsx("div",{children:t.jsx(i,{className:"tw-h-4 tw-pr-0"})}),t.jsx("div",{children:o.localizedName})]})},o.key)})]})]})}const Pe={project:{key:"project",localizedName:"Projects",icon:x.ScrollText,actions:[{buttonLabel:"Open",condition:()=>!0,action:()=>{},default:()=>!0},{buttonLabel:"Sync",condition:()=>!0,action:()=>{}},{buttonLabel:"Get",condition:()=>!0,action:()=>{}}]},resource:{key:"resource",localizedName:"Resources",icon:x.BookOpen,actions:[{buttonLabel:"Open",condition:()=>!0,action:()=>{},default:()=>!0},{buttonLabel:"Remove",condition:()=>!0,action:()=>{}}]},dictionary:{key:"dictionary",localizedName:"Dictionaries",icon:x.BookA,actions:[{buttonLabel:"Open",condition:()=>!0,action:()=>{},default:()=>!0},{buttonLabel:"Remove",condition:()=>!0,action:()=>{}}]},media:{key:"media",localizedName:"Media",icon:x.ImageIcon,actions:[{buttonLabel:"Open",condition:()=>!0,action:()=>{},default:()=>!0},{buttonLabel:"Remove",condition:()=>!0,action:()=>{}}]}};function gs({localizedStrings:e={},uiLocales:n=[],onOpenGetResources:r=()=>{},onOpenResourceOrProject:a=()=>{},onSendReceiveProject:o=()=>{},showGetResourcesButton:i=!0,isSendReceiveInProgress:l=!1,isLoadingLocalProjects:w=!1,isLoadingRemoteProjects:c=!1,localProjectResourceInfo:p=[],sharedProjectsInfo:g={},activeSendReceiveProjects:b=[]}){const u=v=>e[v]??v,m=u("%resources_action%"),C=u("%resources_activity%"),D=u("%resources_clearSearch%"),j=u("%home_dialog_title%"),y=u("%resources_filterInput%"),T=u("%resources_fullName%"),R=u("%resources_get%"),z=u("%resources_getResources%"),H=u("%resources_items%"),ut=u("%resources_language%"),it=u("%resources_loading%"),_=u("%resources_noProjects%"),f=u("%resources_noProjectsInstruction%"),F=u("%resources_noSearchResults%"),E=u("%resources_open%"),tt=u("%resources_searchedFor%"),St=u("%resources_sync%"),mt=s.useMemo(()=>{const v=[];return g&&Object.entries(g).forEach(([B,q])=>{v.push({id:B,name:q.name,fullName:q.fullName,language:q.language,isEditable:!0,isSendReceivable:!0,isLocallyAvailable:p==null?void 0:p.some(dn=>dn.id===B),editedStatus:q.editedStatus,lastSendReceiveDate:q.lastSendReceiveDate,type:"project"})}),p==null||p.forEach(B=>{v.some(q=>q.id===B.id)||v.push({id:B.id,name:B.name,fullName:B.fullName,language:B.language,isEditable:B.isEditable,isSendReceivable:!1,type:B.type})}),v},[p,g]),[Z,U]=s.useState(""),[S,h]=s.useState({key:"language",direction:"ascending"}),[V,k]=s.useState("all"),M=s.useMemo(()=>{if(!mt)return[];const v=mt.filter(B=>{const q=Z.toLowerCase();return(V==="all"||V===B.type)&&(B.fullName.toLowerCase().includes(q)||B.name.toLowerCase().includes(q)||B.language.toLowerCase().includes(q))});return v.length===0&&Z===""&&setTimeout(()=>{k("all")},2e3),v.sort((B,q)=>{switch(S.key){case"fullName":return B.fullName<q.fullName?S.direction==="ascending"?-1:1:B.fullName>q.fullName?S.direction==="ascending"?1:-1:0;case"language":return B.language<q.language?S.direction==="ascending"?-1:1:B.language>q.language?S.direction==="ascending"?1:-1:0;case"activity":return!B.lastSendReceiveDate||!q.lastSendReceiveDate?0:B.lastSendReceiveDate<q.lastSendReceiveDate?S.direction==="ascending"?-1:1:B.lastSendReceiveDate>q.lastSendReceiveDate?S.direction==="ascending"?1:-1:0;case"action":return 0;default:return 0}})},[mt,Z,S,V]),W=v=>{const B={key:v,direction:"ascending"};S.key===v&&S.direction==="ascending"&&(B.direction="descending"),h(B)},G=(v,B)=>t.jsx(ht,{onClick:()=>W(v),children:t.jsxs(O,{variant:"ghost",className:"tw-bg-transparent hover:tw-bg-transparent",children:[t.jsx("div",{className:"tw-font-normal",children:B}),S.key!==v&&t.jsx(x.ChevronsUpDown,{className:"tw-pl-1",size:16}),S.key===v&&(S.direction==="ascending"?t.jsx(x.ChevronUp,{className:"tw-pl-1",size:16}):t.jsx(x.ChevronDown,{className:"tw-pl-1",size:16}))]})}),Gr=s.useMemo(()=>new Intl.RelativeTimeFormat(n,{style:"long",numeric:"auto"}),[n]),sn=v=>l&&b.includes(v.id)?t.jsx(we,{className:"tw-h-5 tw-py-[1px]"}):v.isLocallyAvailable?St:R,ln=(v,B)=>B?t.jsx(Rt,{onClick:()=>o(v.id),children:t.jsx("span",{children:sn(v)})}):t.jsx(O,{disabled:l&&b.includes(v.id),onClick:()=>o(v.id),children:sn(v)}),wn=(v,B)=>B?t.jsx(Rt,{onClick:()=>a(v.id,v.isEditable),children:t.jsx("span",{children:E})}):t.jsx(O,{onClick:()=>a(v.id,v.isEditable),children:E});return t.jsx("div",{children:t.jsxs(en,{className:"tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0",children:[t.jsx(nn,{className:"tw-flex-shrink-0",children:t.jsxs("div",{className:"tw-flex tw-justify-between tw-gap-4",children:[t.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4 md:tw-flex-row",children:[t.jsxs("div",{className:"tw-flex tw-items-center tw-gap-4",children:[t.jsx(x.Home,{size:36}),t.jsx(rn,{children:j})]}),t.jsx(ke,{value:Z,className:"tw-min-w-72",onSearch:U,placeholder:y})]}),t.jsx("div",{className:"tw-flex tw-flex-wrap-reverse tw-gap-4 tw-self-end",children:i&&t.jsx(O,{onClick:r,className:"tw-bg-muted",variant:"ghost",children:`+ ${z}`})})]})}),w||c?t.jsxs(de,{className:"tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2",children:[t.jsx(L,{children:it}),t.jsx(we,{})]}):t.jsx(de,{className:"tw-flex-grow tw-overflow-auto",children:p?t.jsx("div",{className:"tw-h-full tw-flex-grow",children:M.length===0?t.jsxs("div",{className:"tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center",children:[t.jsx(L,{className:"tw-text-muted-foreground",children:F}),t.jsx(L,{className:"tw-font-normal tw-text-muted-foreground",children:`${tt} "${Z}".`}),t.jsxs("div",{className:"tw-mt-4 tw-flex tw-gap-1",children:[t.jsx(O,{variant:"ghost",onClick:()=>{U(""),k("all")},children:D}),i&&t.jsx(O,{onClick:r,variant:"ghost",className:"tw-bg-muted",children:`+ ${z}`})]})]}):t.jsxs(At,{stickyHeader:!0,children:[t.jsx(Ft,{className:"tw-bg-none",stickyHeader:!0,children:t.jsxs(lt,{children:[t.jsx(ht,{children:t.jsx(hs,{onChange:k,variant:"ghost",types:Object.values(Pe)})}),G("fullName",T),G("language",ut),M.some(v=>v.isSendReceivable)&&G("activity",C),G("action",m),t.jsx(ht,{})]})}),t.jsx(Gt,{children:M.map(v=>{const B=Pe[v.type].icon;return t.jsxs(lt,{className:"[&>td]:tw-p-2",onDoubleClick:()=>a(v.id,v.isEditable),children:[t.jsxs(st,{className:"tw-ms-4 tw-flex tw-items-center tw-gap-4",children:[t.jsx(B,{className:"tw-h-4 tw-pr-0"}),t.jsx("div",{className:"tw-py-4",children:v.name})]}),t.jsx(st,{className:"tw-font-medium",children:v.fullName}),t.jsx(st,{children:v.language}),M.some(q=>q.isSendReceivable)&&t.jsx(st,{children:v.lastSendReceiveDate&&N.formatTimeSpan(Gr,new Date(v.lastSendReceiveDate))}),t.jsx(st,{children:v.isSendReceivable&&(!v.isLocallyAvailable||v.editedStatus==="edited")?ln(v):wn(v)}),t.jsx(st,{children:v.isSendReceivable&&v.isLocallyAvailable&&t.jsxs(Ot,{children:[t.jsx(Zt,{asChild:!0,children:t.jsx(O,{variant:"ghost",children:t.jsx(x.Ellipsis,{className:"tw-w-4"})})}),t.jsx(Mt,{align:"start",children:t.jsx(Rt,{asChild:!0,children:v.editedStatus==="edited"?wn(v,!0):ln(v,!0)})})]})})]},v.id)})})]})}):t.jsxs("div",{className:"tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center",children:[t.jsx(L,{className:"tw-text-muted-foreground",children:_}),t.jsx(L,{className:"tw-font-normal tw-text-muted-foreground",children:f}),i&&t.jsx(O,{onClick:r,className:"tw-mt-4",children:`+ ${z}`})]})}),t.jsx(an,{className:"tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4",children:M.length>0&&t.jsx(L,{className:"tw-font-normal",children:`${M.length} ${H}`})})]})})}const fs=(e,n)=>{s.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function bs(e){return{preserveValue:!0,...e}}const Fr=(e,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=bs(o.current);const[i,l]=s.useState(()=>a.current),[w,c]=s.useState(!0);return s.useEffect(()=>{let p=!0;return c(!!e),(async()=>{if(e){const g=await e();p&&(l(()=>g),c(!1))}})(),()=>{p=!1,o.current.preserveValue||l(()=>a.current)}},[e]),[i,w]},Re=()=>!1,xs=(e,n)=>{const[r]=Fr(s.useCallback(async()=>{if(!e)return Re;const a=await Promise.resolve(e(n));return async()=>a()},[n,e]),Re,{preserveValue:!1});s.useEffect(()=>()=>{r!==Re&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>xn.toast});exports.Alert=br;exports.AlertDescription=vr;exports.AlertTitle=xr;exports.Avatar=yr;exports.AvatarFallback=jr;exports.AvatarImage=Nr;exports.BOOK_SELECTOR_STRING_KEYS=Ga;exports.Badge=Jt;exports.BookChapterControl=za;exports.BookSelectionMode=On;exports.BookSelector=La;exports.Button=O;exports.Card=en;exports.CardContent=de;exports.CardDescription=kr;exports.CardFooter=an;exports.CardHeader=nn;exports.CardTitle=rn;exports.ChapterRangeSelector=In;exports.Checkbox=fe;exports.Checklist=ss;exports.ComboBox=ie;exports.Command=ee;exports.CommandEmpty=ae;exports.CommandGroup=ge;exports.CommandInput=ne;exports.CommandItem=oe;exports.CommandList=re;exports.DataTable=Xn;exports.Drawer=Cr;exports.DrawerClose=ps;exports.DrawerContent=Tr;exports.DrawerDescription=Mr;exports.DrawerFooter=Dr;exports.DrawerHeader=Rr;exports.DrawerOverlay=on;exports.DrawerPortal=_r;exports.DrawerTitle=Er;exports.DrawerTrigger=cs;exports.DropdownMenu=Ot;exports.DropdownMenuCheckboxItem=pe;exports.DropdownMenuContent=Mt;exports.DropdownMenuGroup=Fe;exports.DropdownMenuItem=Rt;exports.DropdownMenuItemType=$n;exports.DropdownMenuLabel=Qt;exports.DropdownMenuPortal=jn;exports.DropdownMenuRadioGroup=ca;exports.DropdownMenuRadioItem=Xe;exports.DropdownMenuSeparator=Bt;exports.DropdownMenuShortcut=Sn;exports.DropdownMenuSub=kn;exports.DropdownMenuSubContent=Le;exports.DropdownMenuSubTrigger=Ge;exports.DropdownMenuTrigger=Zt;exports.ERROR_DUMP_STRING_KEYS=ls;exports.ErrorDump=ws;exports.Filter=Ja;exports.FilterDropdown=Ya;exports.Footer=Ua;exports.HomeDialog=gs;exports.INVENTORY_STRING_KEYS=so;exports.Input=Et;exports.Inventory=wo;exports.Label=L;exports.MarkdownRenderer=Ha;exports.MoreInfo=qa;exports.MultiSelectComboBox=Yn;exports.NavigationContentSearch=Ko;exports.Popover=me;exports.PopoverContent=te;exports.PopoverTrigger=he;exports.Progress=Vr;exports.ProjectTypes=Pe;exports.RadioGroup=ue;exports.RadioGroupItem=Ut;exports.SCOPE_SELECTOR_STRING_KEYS=Go;exports.ScopeSelector=Lo;exports.ScriptureResultsViewer=Io;exports.ScrollGroupSelector=Xo;exports.SearchBar=ke;exports.Select=Nt;exports.SelectContent=ft;exports.SelectGroup=Bn;exports.SelectItem=nt;exports.SelectLabel=An;exports.SelectScrollDownButton=Ue;exports.SelectScrollUpButton=Ke;exports.SelectSeparator=Fn;exports.SelectTrigger=gt;exports.SelectValue=jt;exports.Separator=xe;exports.SettingsList=$o;exports.SettingsListHeader=Yo;exports.SettingsListItem=Ho;exports.SettingsSidebar=ar;exports.SettingsSidebarContentSearch=_o;exports.Skeleton=Ve;exports.Slider=zr;exports.Sonner=us;exports.Spinner=we;exports.Switch=Ir;exports.TabDropdownMenu=Be;exports.TabToolbar=qo;exports.Table=At;exports.TableBody=Gt;exports.TableCaption=Ln;exports.TableCell=st;exports.TableFooter=Gn;exports.TableHead=ht;exports.TableHeader=Ft;exports.TableRow=lt;exports.Tabs=ms;exports.TabsContent=Pr;exports.TabsList=Or;exports.TabsTrigger=Br;exports.TextField=is;exports.Textarea=Ar;exports.ToggleGroup=Je;exports.ToggleGroupItem=Yt;exports.Toolbar=ns;exports.Tooltip=ye;exports.TooltipContent=se;exports.TooltipProvider=ve;exports.TooltipTrigger=Ne;exports.UiLanguageSelector=as;exports.VerticalTabs=Ze;exports.VerticalTabsContent=tn;exports.VerticalTabsList=Qe;exports.VerticalTabsTrigger=wr;exports.badgeVariants=Hn;exports.buttonVariants=Mn;exports.cn=d;exports.getBookIdFromUSFM=oo;exports.getLinesFromUSFM=ro;exports.getNumberFromUSFM=ao;exports.getStatusForItem=Un;exports.getToolbarOSReservedSpaceClassName=es;exports.inventoryCountColumn=eo;exports.inventoryItemColumn=Qa;exports.inventoryStatusColumn=no;exports.selectTriggerVariants=Pn;exports.useEvent=fs;exports.useEventAsync=xs;exports.usePromise=Fr;function vs(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}vs(`.banded-row:hover {
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
.tw-ms-4 {
  margin-inline-start: 1rem;
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
.tw-w-16 {
  width: 4rem;
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
.tw-flex-wrap-reverse {
  flex-wrap: wrap-reverse;
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
.tw-self-end {
  align-self: flex-end;
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
.tw-border-none {
  border-style: none;
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
.tw-border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
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
.hover\\:tw-text-secondary-foreground:hover {
  color: hsl(var(--secondary-foreground));
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

  .md\\:tw-flex-row {
    flex-direction: row;
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
.\\[\\&\\>svg\\]\\:tw-min-w-4>svg {
  min-width: 1rem;
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
.\\[\\&\\>td\\]\\:tw-p-2>td {
  padding: 0.5rem;
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
