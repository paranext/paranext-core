"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),N=require("lucide-react"),va=require("clsx"),ya=require("tailwind-merge"),jt=require("class-variance-authority"),Dn=require("@radix-ui/react-dropdown-menu"),y=require("platform-bible-utils"),Ft=require("@radix-ui/react-slot"),Na=require("@radix-ui/react-label"),ka=require("@radix-ui/react-radio-group"),ja=require("@radix-ui/react-popover"),et=require("cmdk"),Sa=require("@radix-ui/react-dialog"),Q=require("@tanstack/react-table"),Ca=require("@radix-ui/react-select"),_a=require("markdown-to-jsx"),Ra=require("@radix-ui/react-checkbox"),Ta=require("@radix-ui/react-toggle-group"),Ea=require("@radix-ui/react-toggle"),Da=require("@radix-ui/react-separator"),Ma=require("@radix-ui/react-tooltip"),Va=require("@radix-ui/react-tabs"),Ia=require("@radix-ui/react-menubar"),Oa=require("react-hotkeys-hook"),za=require("@radix-ui/react-avatar"),lt=require("vaul"),Aa=require("@radix-ui/react-progress"),Mn=require("sonner"),Ba=require("@radix-ui/react-slider"),Pa=require("@radix-ui/react-switch");function U(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const F=U(Dn),Vn=U(Na),Jt=U(ka),Wt=U(ja),ut=U(Sa),X=U(Ca),$e=U(Ra),Se=U(Ta),In=U(Ea),On=U(Da),ee=U(Ma),nt=U(Va),G=U(Ia),Gt=U(za),Ke=U(Aa),Yt=U(Ba),He=U(Pa),Fa=ya.extendTailwindMerge({prefix:"tw-"});function p(...t){return Fa(va.clsx(t))}const zt=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:p("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));zt.displayName="Input";const Ga=s.forwardRef(({handleSearch:t,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,hasTopMatch:i,hasNoMatches:w,hasInputChanged:l,...c},d)=>{const[m,g]=s.useState(!1);return e.jsxs("div",{className:"tw-relative tw-max-w-48",children:[e.jsx(zt,{...c,type:"text",className:p("tw-relative tw-h-8 tw-w-full tw-min-w-0 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-text-ellipsis tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 !tw-pe-10 tw-ps-4 tw-font-medium tw-text-foreground tw-shadow-none tw-outline-none",l&&(i?"focus-visible:tw-ring-green-600":w&&"focus-visible:tw-ring-destructive"),o),onChange:u=>t(u.target.value),onKeyDown:u=>{u.key==="Enter"?(a(),u.preventDefault()):n(u)},onClick:r,onFocus:u=>{var h;g(!0),(h=c.onFocus)==null||h.call(c,u)},onBlur:u=>{var h;g(!1),(h=c.onBlur)==null||h.call(c,u)},ref:d}),m&&l&&(i?e.jsx(N.Check,{className:"tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-green-600"}):w&&e.jsx(N.CircleSlash,{className:"tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-destructive"}))]})}),Ue=s.createContext(void 0);function dt(){const t=s.useContext(Ue);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const gt=jt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),La="layoutDirection";function q(){const t=localStorage.getItem(La);return t==="rtl"?t:"ltr"}const Ce=F.Trigger,Je=F.Group,zn=F.Portal,An=F.Sub,Bn=F.RadioGroup;function ne({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(Ue.Provider,{value:r,children:e.jsx(F.Root,{...n})})}const We=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=dt();return e.jsxs(F.SubTrigger,{ref:o,className:p("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,gt({variant:i.variant})),...a,children:[r,e.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});We.displayName=F.SubTrigger.displayName;const Ze=s.forwardRef(({className:t,...n},r)=>e.jsx(F.SubContent,{ref:r,className:p("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Ze.displayName=F.SubContent.displayName;const Lt=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const i=q();return e.jsx(F.Portal,{children:e.jsx(F.Content,{ref:o,sideOffset:n,className:p("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:i,children:r})})})});Lt.displayName=F.Content.displayName;const re=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=q(),i=dt();return e.jsx(F.Item,{ref:a,className:p("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,gt({variant:i.variant})),...r,dir:o})});re.displayName=F.Item.displayName;const _e=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=dt();return e.jsxs(F.CheckboxItem,{ref:o,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,gt({variant:i.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(F.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});_e.displayName=F.CheckboxItem.displayName;const Qe=s.forwardRef(({className:t,children:n,...r},a)=>{const o=dt();return e.jsxs(F.RadioItem,{ref:a,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,gt({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(F.ItemIndicator,{children:e.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Qe.displayName=F.RadioItem.displayName;const ae=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(F.Label,{ref:a,className:p("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));ae.displayName=F.Label.displayName;const Dt=s.forwardRef(({className:t,...n},r)=>e.jsx(F.Separator,{ref:r,className:p("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Dt.displayName=F.Separator.displayName;function Pn({className:t,...n}){return e.jsx("span",{className:p("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}Pn.displayName="DropdownMenuShortcut";var Xa=Object.defineProperty,$a=(t,n,r)=>n in t?Xa(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,E=(t,n,r)=>$a(t,typeof n!="symbol"?n+"":n,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],tn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Fn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],yn=to();function Xt(t,n=!0){return n&&(t=t.toUpperCase()),t in yn?yn[t]:0}function en(t){return Xt(t)>0}function Ka(t){const n=typeof t=="string"?Xt(t):t;return n>=40&&n<=66}function Ha(t){return(typeof t=="string"?Xt(t):t)<=39}function Gn(t){return t<=66}function Ya(t){const n=typeof t=="string"?Xt(t):t;return $n(n)&&!Gn(n)}function*qa(){for(let t=1;t<=Mt.length;t++)yield t}const Ua=1,Ln=Mt.length;function Ja(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function nn(t,n="***"){const r=t-1;return r<0||r>=Mt.length?n:Mt[r]}function Xn(t){return t<=0||t>Ln?"******":Fn[t-1]}function Wa(t){return Xn(Xt(t))}function $n(t){const n=typeof t=="number"?nn(t):t;return en(n)&&!tn.includes(n)}function Za(t){const n=typeof t=="number"?nn(t):t;return en(n)&&tn.includes(n)}function Qa(t){return Fn[t-1].includes("*obsolete*")}function to(){const t={};for(let n=0;n<Mt.length;n++)t[Mt[n]]=n+1;return t}const V={allBookIds:Mt,nonCanonicalIds:tn,bookIdToNumber:Xt,isBookIdValid:en,isBookNT:Ka,isBookOT:Ha,isBookOTNT:Gn,isBookDC:Ya,allBookNumbers:qa,firstBook:Ua,lastBook:Ln,extraBooks:Ja,bookNumberToId:nn,bookNumberToEnglishName:Xn,bookIdToEnglishName:Wa,isCanonical:$n,isExtraMaterial:Za,isObsolete:Qa};var pt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(pt||{});const at=class{constructor(n){if(E(this,"name"),E(this,"fullPath"),E(this,"isPresent"),E(this,"hasVerseSegments"),E(this,"isCustomized"),E(this,"baseVersification"),E(this,"scriptureBooks"),E(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=pt[n]):(this._type=n,this.name=pt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};E(at,"Original",new at(pt.Original)),E(at,"Septuagint",new at(pt.Septuagint)),E(at,"Vulgate",new at(pt.Vulgate)),E(at,"English",new at(pt.English)),E(at,"RussianProtestant",new at(pt.RussianProtestant)),E(at,"RussianOrthodox",new at(pt.RussianOrthodox));let Tt=at;function Nn(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var Kn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Kn||{});const tt=class M{constructor(n,r,a,o){if(E(this,"firstChapter"),E(this,"lastChapter"),E(this,"lastVerse"),E(this,"hasSegmentsDefined"),E(this,"text"),E(this,"BBBCCCVVVS"),E(this,"longHashCode"),E(this,"versification"),E(this,"rtlMark","‏"),E(this,"_bookNum",0),E(this,"_chapterNum",0),E(this,"_verseNum",0),E(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,w=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(w),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof Tt?r:void 0;this.setEmpty(i),this._verseNum=n%M.chapterDigitShifter,this._chapterNum=Math.floor(n%M.bookDigitShifter/M.chapterDigitShifter),this._bookNum=Math.floor(n/M.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof M){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof Tt?n:M.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??M.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new M(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Kt)return r=new M,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%M.bcvMaxValue*M.bookDigitShifter+(r>=0?r%M.bcvMaxValue*M.chapterDigitShifter:0)+(a>=0?a%M.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:i,versificationStr:w}=n,l=i||o.toString();let c;return w&&(c=new Tt(w)),r?new M(r,a.toString(),l,c):new M}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>M.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(M.verseRangeSeparator)||this._verse.includes(M.verseSequenceIndicator))}get book(){return V.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=V.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=M.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=M.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>V.lastBook)throw new Kt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Tt(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(M.verseRangeSeparators,M.verseSequenceIndicators)}get BBBCCC(){return M.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return M.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Tt(pt[w])}catch{throw new Kt("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Kt("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||V.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!M.isVerseParseable(a[1]))throw new Kt("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new M(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof M?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=M.verseRangeSeparators,a=M.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Nn(this._verse,a);for(const w of i.map(l=>Nn(l,r))){const l=this.clone();l.verse=w[0];const c=l.verseNum;if(o.push(l),w.length>1){const d=this.clone();if(d.verse=w[1],!n)for(let m=c+1;m<d.verseNum;m++){const g=new M(this._bookNum,this._chapterNum,m,this.versification);this.isExcluded||o.push(g)}o.push(d)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const i=o.internalValid;if(i!==0)return i;const w=o.BBBCCCVVV;if(a>w)return 3;if(a===w)return 4;a=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>V.lastBook?2:(V.isCanonical(this._bookNum),0)}setEmpty(n=M.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=V.bookIdToNumber(n),this.chapter=r,this.verse=a}};E(tt,"defaultVersification",Tt.English),E(tt,"verseRangeSeparator","-"),E(tt,"verseSequenceIndicator",","),E(tt,"verseRangeSeparators",[tt.verseRangeSeparator]),E(tt,"verseSequenceIndicators",[tt.verseSequenceIndicator]),E(tt,"chapterDigitShifter",1e3),E(tt,"bookDigitShifter",tt.chapterDigitShifter*tt.chapterDigitShifter),E(tt,"bcvMaxValue",tt.chapterDigitShifter-1),E(tt,"ValidStatusType",Kn);class Kt extends Error{}const eo=s.forwardRef(({bookId:t,handleSelectBook:n,shouldExpandChildren:r,handleHighlightBook:a,handleKeyDown:o,bookType:i,children:w},l)=>e.jsxs(re,{ref:l,textValue:t,className:p("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:c=>{c.preventDefault(),n()},onKeyDown:c=>{o(c)},onFocus:a,onMouseMove:a,children:[e.jsx("span",{className:p("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":i.toLowerCase()==="ot","tw-border-s-purple-200":i.toLowerCase()==="nt","tw-border-s-indigo-200":i.toLowerCase()==="dc"}),children:V.bookIdToEnglishName(t)}),r&&e.jsx("div",{children:w})]},t));function no({handleSelectChapter:t,endChapter:n,selectedChapter:r,highlightedChapter:a,handleHighlightedChapter:o,matchingChapters:i}){const w=Array.from({length:n},(c,d)=>d+1),l=s.useCallback(c=>{o(c)},[o]);return e.jsx("div",{className:p("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:w.map(c=>e.jsx("div",{className:p("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":c===r,"tw-bg-amber-200":c===a,"tw-pointer-events-none tw-bg-accent tw-opacity-50":i&&!i.includes(c)}),onClick:d=>{d.preventDefault(),d.stopPropagation(),t(c)},role:"button",onKeyDown:d=>{d.key==="Enter"&&t(c)},tabIndex:0,onMouseMove:()=>l(c),children:c},c))})}const kn=6,rn=V.allBookIds.filter(t=>!V.isObsolete(V.bookIdToNumber(t))),Hn=Object.fromEntries(rn.map(t=>[t,V.bookIdToEnglishName(t)])),ro={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ao=["OT","NT","DC"],oo=96,qt={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i,EXTRACT_BOOK_FROM_REFERENCE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+\d+:\d+$/,EXTRACT_BOOK_CHAPTER_FROM_REFERENCE:/^([^:\s]+(?:\s+[^:\s]+)*\s+\d+):\d+$/},jn=[qt.BOOK_ONLY,qt.BOOK_CHAPTER,qt.BOOK_CHAPTER_VERSE],Sn=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"]),At=t=>y.getChaptersForBook(V.bookIdToNumber(t));function Cn(t){const n=rn.find(r=>Hn[r].toLowerCase()===t.toLowerCase());if(n)return n}function so({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=q(),[i,w]=s.useState(()=>y.formatScrRef(t,"English")),[l,c]=s.useState(""),[d,m]=s.useState(t.book),[g,u]=s.useState(t.chapterNum??0),[h,x]=s.useState(t.book),[S,v]=s.useState(!1),[_,k]=s.useState(S),[I,O]=s.useState(!1),[z,ct]=s.useState(),H=s.useRef(void 0),j=s.useRef(void 0),b=s.useRef(void 0),B=s.useRef(void 0),T=s.useCallback(f=>{if(f.trim())return jn.reduce((D,C)=>{if(D)return D;const $=C.exec(f);if($){const[P,Ct=void 0,be=void 0]=$.slice(1),st=Cn(P)??(V.isBookIdValid(P)?P.toLocaleUpperCase():void 0);if(st){const wt=Ct?parseInt(Ct,10):void 0;if(wt&&wt>At(st))return;const xt=be?parseInt(be,10):void 0;return{book:st,chapterNum:wt,verseNum:xt}}}},void 0)},[]),L=s.useMemo(()=>{if(!(!z||!z.chapterNum))return z.verseNum?[z.chapterNum]:Array.from({length:At(h)},(f,D)=>D+1).filter(f=>{var D;return(z==null?void 0:z.chapterNum)&&f.toString().includes((D=z==null?void 0:z.chapterNum)==null?void 0:D.toString())})},[h,z]),it=s.useMemo(()=>{const f=T(i.trim());return f?f.book!==t.book||(f.chapterNum??0)!==t.chapterNum||(f.verseNum??0)!==t.verseNum:!0},[i,t,T]),bt=s.useMemo(()=>!!z&&it,[z,it]),St=s.useCallback(f=>{const D=a?a():rn;return{OT:D.filter(C=>V.isBookOT(C)),NT:D.filter(C=>V.isBookNT(C)),DC:D.filter(C=>V.isBookDC(C))}[f].filter(C=>{const $=Hn[C].toLowerCase(),P=l.length>0&&/^\d/.test(l)?l.charAt(0)+l.slice(1).replace(/[^a-zA-Z]/g,"").toLowerCase():l.replace(/[^a-zA-Z]/g,"").toLowerCase();return bt?$===P||C.toLowerCase()===P:$.includes(P)||C.toLowerCase().includes(P)})},[a,bt,l]),J=s.useMemo(()=>ao.map(f=>({bookType:f,books:St(f)})).filter(f=>f.books.length>0),[St]),W=s.useMemo(()=>J.reduce((f,D)=>f+D.books.length,0),[J]),R=s.useCallback(f=>{w(f),c(f),ct(T(f.trim()))},[T]),Y=s.useRef(!1),Z=s.useCallback(()=>{w(y.formatScrRef(t,"English")),c(""),m(t.book),x(t.book)},[t]),mt=s.useCallback(f=>{if(Y.current){Y.current=!1;return}v(f)},[]),rt=s.useCallback((f,D,C,$)=>{if(u(t.book!==f?1:t.chapterNum),D||At(f)===-1){n({book:f,chapterNum:C??1,verseNum:$??1}),v(!1),c("");return}m(d!==f?f:""),v(!D)},[n,t.book,t.chapterNum,d]),ha=f=>{f<=0||f>At(d)||rt(d,!0,f)},vn=s.useCallback(()=>{jn.forEach(f=>{const D=f.exec(l);if(D){const[C,$=void 0,P=void 0]=D.slice(1),Ct=Cn(C);(V.isBookIdValid(C)||Ct)&&rt(Ct??C,!0,$?parseInt($,10):1,P?parseInt(P,10):1)}})},[rt,l]),fa=s.useCallback(f=>{if(!S)f.key!=="Tab"&&f.key!=="Escape"&&v(!0);else if(f.key==="Tab"){f.preventDefault(),f.stopPropagation();return}else f.key==="ArrowDown"?(B!=null&&B.current?B.current.focus():b!=null&&b.current?b.current.focus():j.current&&j.current.focus(),f.preventDefault()):f.key==="Escape"&&document.activeElement===H.current&&(v(!1),f.preventDefault(),f.stopPropagation());if(document.activeElement===H.current){if(/^[a-zA-Z]$/.test(f.key)&&(R(it?l+f.key:f.key),O(!0),f.preventDefault()),/^\d$/.test(f.key)){const D=i;if(I)R(l+f.key);else{const C=D.match(qt.EXTRACT_BOOK_FROM_REFERENCE);if(C){const P=`${C[1]} ${f.key}`;R(P),O(!0)}}f.preventDefault()}if(!I&&f.key===":"){const C=i.match(qt.EXTRACT_BOOK_CHAPTER_FROM_REFERENCE);if(C){const $=C[1],P=$.endsWith(":")?`${$}`:`${$}:`;R(P),O(!0),f.preventDefault()}}y.MODIFIER_KEYS.has(f.key)||O(!0)}},[S,I,R,it,l,i]),ge=s.useCallback(f=>{y.MODIFIER_KEYS.has(f.key)||(f.key==="Tab"&&f.shiftKey&&(H.current.focus(),f.preventDefault()),f.stopPropagation(),H.current.focus(),H.current.dispatchEvent(new KeyboardEvent("keydown",{...f,view:void 0})))},[]),ga=s.useCallback(f=>{const{key:D}=f;Sn.has(D)||(ge(f),f.preventDefault())},[ge]),ba=s.useCallback(f=>{const{key:D}=f;D==="ArrowUp"&&(f.preventDefault(),H.current.focus())},[]),xa=s.useCallback((f,D)=>{const{key:C}=f;if(Sn.has(C)){if(h===d||W===1){const P=W===1?h:d;if(C==="Enter"){f.preventDefault(),rt(P,!0,g);return}const Ct=C==="ArrowRight"&&!o||C==="ArrowRight"&&o==="ltr"||C==="ArrowLeft"&&o==="rtl",be=C==="ArrowLeft"&&!o||C==="ArrowLeft"&&o==="ltr"||C==="ArrowRight"&&o==="rtl",Ae=Array.from({length:At(h)},(xe,_t)=>_t+1),st=d!==h||W===1?L??Ae:Ae,wt=st.indexOf(g);let xt=g;if(Ct)if(wt>=0&&wt<st.length-1)xt=st[wt+1];else{f.preventDefault();return}else if(be)if(wt>0)xt=st[wt-1];else{f.preventDefault();return}else if(C==="ArrowDown"){const xe=st[wt]+kn,_t=st.find(Be=>Be>=xe);_t!==void 0&&(xt=_t)}else if(C==="ArrowUp"){const xe=st[wt]-kn,_t=st.slice().reverse().find(Be=>Be<=xe);_t!==void 0&&(xt=_t)}if(xt!==g){u(xt),f.preventDefault();return}}if(D===0&&C==="ArrowUp"&&!bt){f.preventDefault(),H.current.focus();return}return}ge(f),f.preventDefault(),f.stopPropagation()},[o,h,g,bt,ge,d,L,W,rt]);return s.useEffect(()=>{W===1?u(1):d===h?d===t.book?u(t.chapterNum):u(1):u(0)},[h,t.book,t.chapterNum,d,W]),s.useEffect(()=>{if(!L||W>1)return;L.indexOf(g)===-1&&u(L[0])},[h,g,d,L,W]),s.useEffect(()=>{Z()},[Z]),s.useEffect(()=>{},[S,Z]),s.useLayoutEffect(()=>{k(S)},[S]),s.useLayoutEffect(()=>{const f=setTimeout(()=>{var D,C;if(_&&j.current&&b.current){const P=b.current.offsetTop-oo;j.current.scrollTo({top:P,behavior:"instant"}),H.current.focus()}!_&&document.activeElement!==H.current&&!((D=H.current)!=null&&D.contains(document.activeElement))&&document.activeElement!==j.current&&!((C=j.current)!=null&&C.contains(document.activeElement))&&Z()},10);return()=>{clearTimeout(f)}},[_,Z]),e.jsxs(ne,{modal:!1,open:S,onOpenChange:mt,children:[e.jsx(Ce,{asChild:!0,children:e.jsx(Ga,{ref:H,value:i,handleSearch:R,handleKeyDown:fa,handleOnClick:()=>{m(t.book),x(t.book),u(t.chapterNum>0?t.chapterNum:0),H.current.focus()},onFocus:()=>{Y.current=!0,O(!1),ct(T(i))},onBlur:()=>{W===0&&Z()},handleSubmit:vn,placeholder:y.formatScrRef(t,"English"),className:r,hasTopMatch:!!z,hasNoMatches:W===0,hasInputChanged:it})}),W>0&&e.jsx(Lt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},align:o==="ltr"?"start":"end",ref:j,onKeyDown:ga,children:e.jsxs("div",{className:"rtl:tw-ps-2",children:[!!z&&it&&e.jsxs(e.Fragment,{children:[e.jsx(re,{className:"tw-cursor-pointer tw-p-4 tw-font-semibold tw-text-foreground",onClick:vn,onKeyDown:f=>ba(f),"data-top-match":"true",ref:B,children:y.formatScrRef({book:z.book,chapterNum:z.chapterNum??1,verseNum:z.verseNum??1})}),e.jsx(Dt,{})]}),J.map((f,D)=>e.jsxs("div",{children:[e.jsx(ae,{className:"tw-font-semibold tw-text-foreground/80",children:ro[f.bookType]}),f.books.map((C,$)=>e.jsx("div",{children:e.jsx(eo,{bookId:C,handleSelectBook:()=>rt(C,!1),shouldExpandChildren:d.toLowerCase()===C.toLowerCase()||W===1,handleHighlightBook:()=>x(C),handleKeyDown:P=>xa(P,$),bookType:f.bookType,ref:P=>{d===C&&(b.current=P)},children:e.jsx(no,{handleSelectChapter:ha,endChapter:At(C),selectedChapter:d===t.book?t.chapterNum:0,highlightedChapter:d===h||W===1?g:0,handleHighlightedChapter:P=>{u(P)},matchingChapters:it?L:void 0})})},C)),D<J.length-1&&e.jsx(Dt,{})]},f.bookType))]})})]})}const Yn=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),A=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},i)=>{const w=a?Ft.Slot:"button";return e.jsx(w,{className:p(Yn({variant:n,size:r,className:t})),ref:i,...o})});A.displayName="Button";const io=jt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),K=s.forwardRef(({className:t,...n},r)=>e.jsx(Vn.Root,{ref:r,className:p("pr-twp",io(),t),...n}));K.displayName=Vn.Root.displayName;const Re=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(Jt.Root,{className:p("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});Re.displayName=Jt.Root.displayName;const Zt=s.forwardRef(({className:t,...n},r)=>e.jsx(Jt.Item,{ref:r,className:p("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Jt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(N.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Zt.displayName=Jt.Item.displayName;const oe=Wt.Root,se=Wt.Trigger,$t=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const i=q();return e.jsx(Wt.Portal,{children:e.jsx(Wt.Content,{ref:o,align:n,sideOffset:r,className:p("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:i})})});$t.displayName=Wt.Content.displayName;const wo=ut.Portal,qn=s.forwardRef(({className:t,...n},r)=>e.jsx(ut.Overlay,{ref:r,className:p("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));qn.displayName=ut.Overlay.displayName;const lo=s.forwardRef(({className:t,children:n,...r},a)=>{const o=q();return e.jsxs(wo,{children:[e.jsx(qn,{}),e.jsxs(ut.Content,{ref:a,className:p("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(ut.Close,{className:p("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(N.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});lo.displayName=ut.Content.displayName;const co=s.forwardRef(({className:t,...n},r)=>e.jsx(ut.Title,{ref:r,className:p("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));co.displayName=ut.Title.displayName;const po=s.forwardRef(({className:t,...n},r)=>e.jsx(ut.Description,{ref:r,className:p("tw-text-sm tw-text-muted-foreground",t),...n}));po.displayName=ut.Description.displayName;const ie=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Command,{ref:r,className:p("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));ie.displayName=et.Command.displayName;const we=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(N.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(et.Command.Input,{ref:r,className:p("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});we.displayName=et.Command.Input.displayName;const le=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Command.List,{ref:r,className:p("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));le.displayName=et.Command.List.displayName;const de=s.forwardRef((t,n)=>e.jsx(et.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));de.displayName=et.Command.Empty.displayName;const Te=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Command.Group,{ref:r,className:p("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));Te.displayName=et.Command.Group.displayName;const Un=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Command.Separator,{ref:r,className:p("tw--mx-1 tw-h-px tw-bg-border",t),...n}));Un.displayName=et.Command.Separator.displayName;const ce=s.forwardRef(({className:t,...n},r)=>e.jsx(et.Command.Item,{ref:r,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));ce.displayName=et.Command.Item.displayName;function uo(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function ve({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:i,onChange:w=()=>{},getOptionLabel:l=uo,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:m="",commandEmptyMessage:g="No option found",buttonVariant:u="outline",alignDropDown:h="start",isDisabled:x=!1,...S}){const[v,_]=s.useState(!1);return e.jsxs(oe,{open:v,onOpenChange:_,...S,children:[e.jsx(se,{asChild:!0,children:e.jsxs(A,{variant:u,role:"combobox","aria-expanded":v,id:t,className:p("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:x,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-pe-2",children:c}),e.jsx("span",{className:p("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):d})]}),e.jsx(N.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx($t,{align:h,className:p("tw-w-[200px] tw-p-0",o),children:e.jsxs(ie,{children:[e.jsx(we,{placeholder:m,className:"tw-text-inherit"}),e.jsx(de,{children:g}),e.jsx(le,{children:n.map(k=>e.jsxs(ce,{value:l(k),onSelect:()=>{w(k),_(!1)},children:[e.jsx(N.Check,{className:p("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(k)})}),l(k)]},l(k)))})]})})]})}function Jn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(d,m)=>m+1),[i]),l=d=>{r(d),d>n&&a(d)},c=d=>{a(d),d<t&&r(d)};return e.jsxs(e.Fragment,{children:[e.jsx(K,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(ve,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:t},"start chapter"),e.jsx(K,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(ve,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:n},"end chapter")]})}var Wn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Wn||{});const mo=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Pe=(t,n)=>t[n]??n;function ho({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const m=Pe(d,"%webView_bookSelector_currentBook%"),g=Pe(d,"%webView_bookSelector_choose%"),u=Pe(d,"%webView_bookSelector_chooseBooks%"),[h,x]=s.useState("current book"),S=v=>{x(v),t(v)};return e.jsx(Re,{className:"pr-twp tw-flex",value:h,onValueChange:v=>S(v),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Zt,{value:"current book"}),e.jsx(K,{className:"tw-ms-1",children:m})]}),e.jsx(K,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(Jn,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:w,chapterCount:o,startChapter:l,endChapter:i})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Zt,{value:"choose books"}),e.jsx(K,{className:"tw-ms-1",children:u})]}),e.jsx(K,{className:"tw-flex tw-items-center",children:a.map(v=>V.bookIdToEnglishName(v)).join(", ")}),e.jsx(A,{disabled:h==="current book",onClick:()=>r(),children:g})]})]})})}function fo({table:t}){return e.jsxs(ne,{children:[e.jsx(Dn.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(A,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(N.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(Lt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(ae,{children:"Toggle columns"}),e.jsx(Dt,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(_e,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const Vt=X.Root,Zn=X.Group,It=X.Value,Qn=jt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Nt=s.forwardRef(({className:t,children:n,size:r,...a},o)=>{const i=q();return e.jsxs(X.Trigger,{className:p(Qn({size:r,className:t})),ref:o,...a,dir:i,children:[n,e.jsx(X.Icon,{asChild:!0,children:e.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Nt.displayName=X.Trigger.displayName;const an=s.forwardRef(({className:t,...n},r)=>e.jsx(X.ScrollUpButton,{ref:r,className:p("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(N.ChevronUp,{className:"tw-h-4 tw-w-4"})}));an.displayName=X.ScrollUpButton.displayName;const on=s.forwardRef(({className:t,...n},r)=>e.jsx(X.ScrollDownButton,{ref:r,className:p("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4"})}));on.displayName=X.ScrollDownButton.displayName;const kt=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const i=q();return e.jsx(X.Portal,{children:e.jsxs(X.Content,{ref:o,className:p("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(an,{}),e.jsx(X.Viewport,{className:p("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:i,children:n})}),e.jsx(on,{})]})})});kt.displayName=X.Content.displayName;const tr=s.forwardRef(({className:t,...n},r)=>e.jsx(X.Label,{ref:r,className:p("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));tr.displayName=X.Label.displayName;const ot=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(X.Item,{ref:a,className:p("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(X.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(X.ItemText,{children:n})]}));ot.displayName=X.Item.displayName;const er=s.forwardRef(({className:t,...n},r)=>e.jsx(X.Separator,{ref:r,className:p("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));er.displayName=X.Separator.displayName;function go({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(Vt,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(Nt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(It,{placeholder:t.getState().pagination.pageSize})}),e.jsx(kt,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(ot,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(A,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(N.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(A,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(N.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(A,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(N.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(A,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(N.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const _n=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;function bo(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Qt(t,n){const r=n?`${_n}, ${n}`:_n;return Array.from(t.querySelectorAll(r)).filter(a=>!a.hasAttribute("disabled")&&!a.getAttribute("aria-hidden")&&bo(a))}const pe=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>{const o=s.useRef(null);s.useEffect(()=>{typeof a=="function"?a(o.current):a&&"current"in a&&(a.current=o.current)},[a]),s.useEffect(()=>{const w=o.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{Qt(w,'[tabindex]:not([tabindex="-1"])').forEach(m=>{m.setAttribute("tabindex","-1")})})};l();const c=new MutationObserver(()=>{l()});return c.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{c.disconnect()}},[]);const i=w=>{const{current:l}=o;if(l){if(w.key==="ArrowDown"){w.preventDefault(),Qt(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return e.jsx("div",{className:p("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:i,ref:o,className:p("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});pe.displayName="Table";const ue=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:p({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));ue.displayName="TableHeader";const me=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:p("[&_tr:last-child]:tw-border-0",t),...n}));me.displayName="TableBody";const nr=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:p("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));nr.displayName="TableFooter";function xo(t){s.useEffect(()=>{const n=t.current;if(!n)return;const r=a=>{if(n.contains(document.activeElement)){if(a.key==="ArrowRight"||a.key==="ArrowLeft"){a.preventDefault(),a.stopPropagation();const o=t.current?Qt(t.current):[],i=o.indexOf(document.activeElement),w=a.key==="ArrowRight"?i+1:i-1;w>=0&&w<o.length&&o[w].focus()}a.key==="Escape"&&(a.preventDefault(),n.focus()),(a.key==="ArrowDown"||a.key==="ArrowUp")&&a.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}function vo(t,n,r){let a;return r==="ArrowLeft"&&n>0?a=t[n-1]:r==="ArrowRight"&&n<t.length-1&&(a=t[n+1]),a?(requestAnimationFrame(()=>a.focus()),!0):!1}function yo(t,n,r){let a;return r==="ArrowDown"&&n<t.length-1?a=t[n+1]:r==="ArrowUp"&&n>0&&(a=t[n-1]),a?(requestAnimationFrame(()=>a.focus()),!0):!1}const ft=s.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:a=!1,...o},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),xo(w);const l=s.useMemo(()=>w.current?Qt(w.current):[],[w]),c=s.useCallback(m=>{const{current:g}=w;if(!g||!g.parentElement)return;const u=g.closest("table"),h=u?Qt(u).filter(v=>v.tagName==="TR"):[],x=h.indexOf(g),S=l.indexOf(document.activeElement);if(m.key==="ArrowDown"||m.key==="ArrowUp")m.preventDefault(),yo(h,x,m.key);else if(m.key==="ArrowLeft"||m.key==="ArrowRight")m.preventDefault(),vo(l,S,m.key);else if(m.key==="Escape"){m.preventDefault();const v=g.closest("table");v&&v.focus()}n==null||n(m)},[w,l,n]),d=s.useCallback(m=>{a&&(r==null||r(m))},[a,r]);return e.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:c,onFocus:d,className:p("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});ft.displayName="TableRow";const Pt=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:p("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));Pt.displayName="TableHead";const Ot=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:p("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));Ot.displayName="TableCell";const rr=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:p("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));rr.displayName="TableCaption";function ar({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{}}){var v;const[l,c]=s.useState([]),[d,m]=s.useState([]),[g,u]=s.useState({}),[h,x]=s.useState({}),S=Q.useReactTable({data:n,columns:t,getCoreRowModel:Q.getCoreRowModel(),...r&&{getPaginationRowModel:Q.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Q.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:Q.getFilteredRowModel(),onColumnVisibilityChange:u,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:g,rowSelection:h}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(fo,{table:S}),e.jsxs(pe,{stickyHeader:i,children:[e.jsx(ue,{stickyHeader:i,children:S.getHeaderGroups().map(_=>e.jsx(ft,{children:_.headers.map(k=>e.jsx(Pt,{children:k.isPlaceholder?void 0:Q.flexRender(k.column.columnDef.header,k.getContext())},k.id))},_.id))}),e.jsx(me,{children:(v=S.getRowModel().rows)!=null&&v.length?S.getRowModel().rows.map(_=>e.jsx(ft,{onClick:()=>w(_,S),"data-state":_.getIsSelected()&&"selected",children:_.getVisibleCells().map(k=>e.jsx(Ot,{children:Q.flexRender(k.column.columnDef.cell,k.getContext())},k.id))},_.id)):e.jsx(ft,{children:e.jsx(Ot,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(A,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),e.jsx(A,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(go,{table:S})]})}function No({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:p("pr-twp tw-prose",r),children:e.jsx(_a,{options:o,children:n})})}const ko=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Rn=(t,n)=>t[n]??n;function or({errorDetails:t,handleCopyNotify:n,localizedStrings:r}){const a=Rn(r,"%webView_error_dump_header%"),o=Rn(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:o})]}),e.jsx(A,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:e.jsx(N.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}function jo({errorDetails:t,handleCopyNotify:n,localizedStrings:r,children:a,className:o}){return e.jsxs(oe,{children:[e.jsx(se,{children:a}),e.jsx($t,{className:p("tw-min-w-80 tw-max-w-96",o),children:e.jsx(or,{errorDetails:t,handleCopyNotify:n,localizedStrings:r})})]})}var sr=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(sr||{});function So({id:t,label:n,groups:r}){const[a,o]=s.useState(Object.fromEntries(r.map((d,m)=>d.itemType===0?[m,[]]:void 0).filter(d=>!!d))),[i,w]=s.useState({}),l=(d,m)=>{const g=!a[d][m];o(h=>(h[d][m]=g,{...h}));const u=r[d].items[m];u.onUpdate(u.id,g)},c=(d,m)=>{w(u=>(u[d]=m,{...u}));const g=r[d].items.find(u=>u.id===m);g?g.onUpdate(m):console.error(`Could not find dropdown radio item with id '${m}'!`)};return e.jsx("div",{id:t,children:e.jsxs(ne,{children:[e.jsx(Ce,{asChild:!0,children:e.jsxs(A,{variant:"default",children:[e.jsx(N.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(N.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(Lt,{children:r.map((d,m)=>e.jsxs("div",{children:[e.jsx(ae,{children:d.label}),e.jsx(Je,{children:d.itemType===0?e.jsx(e.Fragment,{children:d.items.map((g,u)=>e.jsx("div",{children:e.jsx(_e,{checked:a[m][u],onCheckedChange:()=>l(m,u),children:g.label})},g.id))}):e.jsx(Bn,{value:i[m],onValueChange:g=>c(m,g),children:d.items.map(g=>e.jsx("div",{children:e.jsx(Qe,{value:g.id,children:g.label})},g.id))})}),e.jsx(Dt,{})]},d.label))})]})})}function Co({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const c=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((m,g)=>m+g,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(N.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:c})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:a.slice(0,3).map(m=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:m.toUpperCase()},m))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",a.length-3," more languages"]})]}),(o||w)&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(A,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",e.jsx(N.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(A,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",e.jsx(N.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function _o({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function i(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),m=d.getUTCFullYear()-1970,g=d.getUTCMonth(),u=d.getUTCDate()-1;let h="";return m>0?h=`${m.toString()} year${m===1?"":"s"} ago`:g>0?h=`${g.toString()} month${g===1?"":"s"} ago`:u===0?h="today":h=`${u.toString()} day${u===1?"":"s"} ago`,h}const w=Object.entries(n).sort((l,c)=>c[0].localeCompare(l[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:l[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",l[0]]}),e.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ro({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const i=s.useMemo(()=>y.formatBytes(r),[r]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(m=>d.of(m))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[e.jsx(_o,{versionHistory:o}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:i})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const ir=jt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),te=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:p("pr-twp",ir({variant:n}),t),...r}));te.displayName="Badge";function wr({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i="No entries found",customSelectedText:w,isDisabled:l=!1,sortSelected:c=!1,icon:d=void 0,className:m=void 0}){const[g,u]=s.useState(!1),h=s.useCallback(v=>{var k;const _=(k=t.find(I=>I.label===v))==null?void 0:k.value;_&&a(r.includes(_)?r.filter(I=>I!==_):[...r,_])},[t,r,a]),x=()=>w||o,S=s.useMemo(()=>{if(!c)return t;const v=t.filter(k=>k.starred).sort((k,I)=>k.label.localeCompare(I.label)),_=t.filter(k=>!k.starred).sort((k,I)=>{const O=r.includes(k.value),z=r.includes(I.value);return O&&!z?-1:!O&&z?1:k.label.localeCompare(I.label)});return[...v,..._]},[t,r,c]);return e.jsx("div",{className:m,children:e.jsxs(oe,{open:g,onOpenChange:u,children:[e.jsx(se,{asChild:!0,children:e.jsxs(A,{variant:"ghost",role:"combobox","aria-expanded":g,className:p("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:d})}),e.jsx("div",{className:p({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:x()})})]}),e.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx($t,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(ie,{children:[e.jsx(we,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(le,{children:[e.jsx(de,{children:i}),e.jsx(Te,{children:S.map(v=>{const _=n?n(v):void 0;return e.jsxs(ce,{value:v.label,onSelect:h,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(N.Check,{className:p("tw-h-4 tw-w-4",r.includes(v.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:v.starred&&e.jsx(N.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:v.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:_})]},v.label)})})]})]})})]})})}function To({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:c,icon:d,className:m,badgesPlaceholder:g}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(wr,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:c,icon:d,className:m}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(u=>{var h;return e.jsxs(te,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(A,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(x=>x!==u)),children:e.jsx(N.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(x=>x.value===u))==null?void 0:h.label]},u)})}):e.jsx(K,{children:g})]})}function Eo({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(c=>y.deepEqual(c,l))||w.push(l)}),w},[t]);return e.jsxs(pe,{stickyHeader:!0,children:[e.jsx(ue,{stickyHeader:!0,children:e.jsxs(ft,{children:[e.jsx(Pt,{children:a}),e.jsx(Pt,{children:o})]})}),e.jsx(me,{children:i.length>0&&i.map(w=>e.jsxs(ft,{onClick:()=>{n(w.reference)},children:[e.jsx(Ot,{children:`${V.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),e.jsx(Ot,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Ee=s.forwardRef(({className:t,...n},r)=>e.jsx($e.Root,{ref:r,className:p("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx($e.Indicator,{className:p("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}));Ee.displayName=$e.Root.displayName;const lr=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Do=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(In.Root,{ref:o,className:p(lr({variant:n,size:r,className:t})),...a}));Do.displayName=In.Root.displayName;const dr=s.createContext({size:"default",variant:"default"}),sn=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},i)=>{const w=q();return e.jsx(Se.Root,{ref:i,className:p("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:w,children:e.jsx(dr.Provider,{value:{variant:n,size:r},children:a})})});sn.displayName=Se.Root.displayName;const Ut=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},i)=>{const w=s.useContext(dr);return e.jsx(Se.Item,{ref:i,className:p(lr({variant:w.variant||r,size:w.size||a}),t),...o,children:n})});Ut.displayName=Se.Item.displayName;const De=t=>t==="asc"?e.jsx(N.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(N.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(N.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Mo=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(A,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,De(n.getIsSorted())]})}),Vo=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(A,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,De(r.getIsSorted())]})}),Io=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(A,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,De(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),Fe=(t,n,r,a,o,i)=>{let w=[...r];t.forEach(c=>{n==="approved"?w.includes(c)||w.push(c):w=w.filter(d=>d!==c)}),a(w);let l=[...o];t.forEach(c=>{n==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),i(l)},Oo=(t,n,r,a,o)=>({accessorKey:"status",header:({column:i})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(A,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,De(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return e.jsxs(sn,{value:w,variant:"outline",type:"single",children:[e.jsx(Ut,{onClick:c=>{c.stopPropagation(),Fe([l],"approved",n,r,a,o)},value:"approved",children:e.jsx(N.CircleCheckIcon,{})}),e.jsx(Ut,{onClick:c=>{c.stopPropagation(),Fe([l],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(N.CircleXIcon,{})}),e.jsx(Ut,{onClick:c=>{c.stopPropagation(),Fe([l],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(N.CircleHelpIcon,{})})]})}}),zo=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ao=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},Bo=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},cr=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",Po=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Fo=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Go=(t,n,r)=>{const a=[];return t.forEach(o=>{const i=a.find(w=>y.deepEqual(w.items,y.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const w={items:y.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:cr(y.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(w)}}),a},ht=(t,n)=>t[n]??n;function Lo({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:i,scope:w,onScopeChange:l,columns:c}){const d=ht(r,"%webView_inventory_all%"),m=ht(r,"%webView_inventory_approved%"),g=ht(r,"%webView_inventory_unapproved%"),u=ht(r,"%webView_inventory_unknown%"),h=ht(r,"%webView_inventory_scope_currentBook%"),x=ht(r,"%webView_inventory_scope_chapter%"),S=ht(r,"%webView_inventory_scope_verse%"),v=ht(r,"%webView_inventory_filter_text%"),_=ht(r,"%webView_inventory_show_additional_items%"),[k,I]=s.useState(!1),[O,z]=s.useState("all"),[ct,H]=s.useState(""),[j,b]=s.useState([]),B=s.useMemo(()=>t.length===0?[]:Go(t,o,i),[t,o,i]),T=s.useMemo(()=>{if(k)return B;const R=[];return B.forEach(Y=>{const Z=Y.items[0],mt=R.find(rt=>rt.items[0]===Z);mt?(mt.count+=Y.count,mt.occurrences=mt.occurrences.concat(Y.occurrences)):R.push({items:[Z],count:Y.count,occurrences:Y.occurrences,status:Y.status})}),R},[k,B]),L=s.useMemo(()=>Fo(T,O,ct),[T,O,ct]),it=s.useMemo(()=>{var Z,mt;if(!k)return c;const R=(Z=a==null?void 0:a.tableHeaders)==null?void 0:Z.length;if(!R)return c;const Y=[];for(let rt=0;rt<R;rt++)Y.push(Vo(((mt=a==null?void 0:a.tableHeaders)==null?void 0:mt[rt])||"Additional Item",rt+1));return[...Y,...c]},[a==null?void 0:a.tableHeaders,c,k]);s.useEffect(()=>{L.length===0?b([]):L.length===1&&b(L[0].items)},[L]);const bt=(R,Y)=>{Y.setRowSelection(()=>{const Z={};return Z[R.index]=!0,Z}),b(R.original.items)},St=R=>{if(R==="book"||R==="chapter"||R==="verse")l(R);else throw new Error(`Invalid scope value: ${R}`)},J=R=>{if(R==="all"||R==="approved"||R==="unapproved"||R==="unknown")z(R);else throw new Error(`Invalid status filter value: ${R}`)},W=s.useMemo(()=>{if(T.length===0||j.length===0)return[];const R=T.filter(Y=>y.deepEqual(k?Y.items:[Y.items[0]],j));if(R.length>1)throw new Error("Selected item is not unique");return R.length===0?[]:R[0].occurrences},[j,k,T]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(Vt,{onValueChange:R=>J(R),defaultValue:O,children:[e.jsx(Nt,{className:"tw-m-1",children:e.jsx(It,{placeholder:"Select filter"})}),e.jsxs(kt,{children:[e.jsx(ot,{value:"all",children:d}),e.jsx(ot,{value:"approved",children:m}),e.jsx(ot,{value:"unapproved",children:g}),e.jsx(ot,{value:"unknown",children:u})]})]}),e.jsxs(Vt,{onValueChange:R=>St(R),defaultValue:w,children:[e.jsx(Nt,{className:"tw-m-1",children:e.jsx(It,{placeholder:"Select scope"})}),e.jsxs(kt,{children:[e.jsx(ot,{value:"book",children:h}),e.jsx(ot,{value:"chapter",children:x}),e.jsx(ot,{value:"verse",children:S})]})]}),e.jsx(zt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:v,value:ct,onChange:R=>{H(R.target.value)}}),a&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Ee,{className:"tw-m-1",checked:k,onCheckedChange:R=>{I(R)}}),e.jsx(K,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??_})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ar,{columns:it,data:L,onRowClickHandler:bt,stickyHeader:!0})}),W.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Eo,{occurrenceData:W,setScriptureReference:n,localizedStrings:r})})]})}const Me=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(On.Root,{ref:o,decorative:r,orientation:n,className:p("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));Me.displayName=On.Root.displayName;function Ye({className:t,...n}){return e.jsx("div",{className:p("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const Ve=ee.Provider,Ie=ee.Root,Oe=ee.Trigger,he=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(ee.Content,{ref:a,sideOffset:n,className:p("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));he.displayName=ee.Content.displayName;const Xo="16rem",$o="3rem",pr=s.createContext(void 0);function fe(){const t=s.useContext(pr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const wn=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:i,side:w="primary",...l},c)=>{const[d,m]=s.useState(t),g=n??d,u=s.useCallback(I=>{const O=typeof I=="function"?I(g):I;r?r(O):m(O)},[r,g]),h=s.useCallback(()=>u(I=>!I),[u]),x=g?"expanded":"collapsed",_=q()==="ltr"?w:w==="primary"?"secondary":"primary",k=s.useMemo(()=>({state:x,open:g,setOpen:u,toggleSidebar:h,side:_}),[x,g,u,h,_]);return e.jsx(pr.Provider,{value:k,children:e.jsx(Ve,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Xo,"--sidebar-width-icon":$o,...o},className:p("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:c,...l,children:i})})})});wn.displayName="SidebarProvider";const ln=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},i)=>{const w=fe();return n==="none"?e.jsx("div",{className:p("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...o,children:a}):e.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?n:"","data-variant":t,"data-side":w.side,children:[e.jsx("div",{className:p("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:p("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});ln.displayName="Sidebar";const ur=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=fe();return e.jsxs(A,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:p("tw-h-7 tw-w-7",t),onClick:i=>{n==null||n(i),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(N.PanelLeft,{}):e.jsx(N.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ur.displayName="SidebarTrigger";const mr=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=fe();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:p("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});mr.displayName="SidebarRail";const dn=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:p("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));dn.displayName="SidebarInset";const hr=s.forwardRef(({className:t,...n},r)=>e.jsx(zt,{ref:r,"data-sidebar":"input",className:p("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));hr.displayName="SidebarInput";const fr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:p("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));fr.displayName="SidebarHeader";const gr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:p("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));gr.displayName="SidebarFooter";const br=s.forwardRef(({className:t,...n},r)=>e.jsx(Me,{ref:r,"data-sidebar":"separator",className:p("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));br.displayName="SidebarSeparator";const cn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:p("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));cn.displayName="SidebarContent";const ye=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:p("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));ye.displayName="SidebarGroup";const Ne=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Ft.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:p("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});Ne.displayName="SidebarGroupLabel";const xr=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Ft.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:p("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});xr.displayName="SidebarGroupAction";const ke=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:p("tw-w-full tw-text-sm",t),...n}));ke.displayName="SidebarGroupContent";const pn=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:p("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));pn.displayName="SidebarMenu";const un=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:p("tw-group/menu-item tw-relative",t),...n}));un.displayName="SidebarMenuItem";const Ko=jt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),mn=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:i,...w},l)=>{const c=t?Ft.Slot:"button",{state:d}=fe(),m=e.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:p(Ko({variant:r,size:a}),i),...w});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(Ie,{children:[e.jsx(Oe,{asChild:!0,children:m}),e.jsx(he,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):m});mn.displayName="SidebarMenuButton";const vr=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const i=n?Ft.Slot:"button";return e.jsx(i,{ref:o,"data-sidebar":"menu-action",className:p("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});vr.displayName="SidebarMenuAction";const yr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:p("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));yr.displayName="SidebarMenuBadge";const Nr=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:p("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Ye,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Ye,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});Nr.displayName="SidebarMenuSkeleton";const kr=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:p("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));kr.displayName="SidebarMenuSub";const jr=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));jr.displayName="SidebarMenuSubItem";const Sr=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},i)=>{const w=t?Ft.Slot:"a";return e.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:p("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});Sr.displayName="SidebarMenuSubButton";function Cr({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:c}){const d=s.useCallback((u,h)=>{a(u,h)},[a]),m=s.useCallback(u=>{const h=r.find(x=>x.projectId===u);return h?h.projectName:u},[r]),g=s.useCallback(u=>!o.projectId&&u===o.label,[o]);return e.jsx(ln,{id:t,collapsible:"none",variant:"inset",className:p("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:e.jsxs(cn,{children:[e.jsxs(ye,{children:[e.jsx(Ne,{className:"tw-text-sm",children:i}),e.jsx(ke,{children:e.jsx(pn,{children:Object.entries(n).map(([u,h])=>e.jsx(un,{children:e.jsx(mn,{onClick:()=>d(u),isActive:g(u),children:e.jsx("span",{className:"tw-pl-3",children:h})})},u))})})]}),e.jsxs(ye,{children:[e.jsx(Ne,{className:"tw-text-sm",children:w}),e.jsx(ke,{className:"tw-pl-3",children:e.jsx(ve,{buttonVariant:"ghost",buttonClassName:p("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(u=>u.projectId),getOptionLabel:m,buttonPlaceholder:l,onChange:u=>{const h=m(u);d(h,u)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(N.ScrollText,{})})})]})]})})}const ze=s.forwardRef(({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:i=!1},w)=>{const l=q();return e.jsxs("div",{className:p("tw-relative",{"tw-w-full":a},o),children:[e.jsx(N.Search,{className:p("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),e.jsx(zt,{ref:w,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>n(c.target.value),disabled:i}),t&&e.jsxs(A,{variant:"ghost",size:"icon",className:p("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{n("")},children:[e.jsx(N.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});ze.displayName="SearchBar";function Ho({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:m}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(ze,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(wn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(Cr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:m}),e.jsx(dn,{className:"tw-min-w-[215px]",children:a})]})]})}const vt="scrBook",Yo="scrRef",Et="source",qo="details",Uo="Scripture Reference",Jo="Scripture Book",_r="Type",Wo="Details";function Zo(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:vt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Uo,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?V.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===vt?y.formatScrRef(o.start):void 0},getGroupingValue:a=>V.bookIdToNumber(a.start.book),sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>y.formatScrRef(a.start),id:Yo,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:y.formatScrRef(o.start)},sortingFn:(a,o)=>y.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:Et,header:r?(t==null?void 0:t.typeColumnName)??_r:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:qo,header:(t==null?void 0:t.detailsColumnName)??Wo,cell:a=>a.getValue(),enableGrouping:!1}]}const Qo=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${n}`:`${y.scrRefToBBBCCCVVV(t.start)}+${n}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},Tn=t=>`${Qo({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function ts({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:w,onRowSelected:l}){const[c,d]=s.useState([]),[m,g]=s.useState([{id:vt,desc:!1}]),[u,h]=s.useState({}),x=s.useMemo(()=>t.flatMap(j=>j.data.map(b=>({...b,source:j.source}))),[t]),S=s.useMemo(()=>Zo({scriptureReferenceColumnName:a,typeColumnName:i,detailsColumnName:w},r),[a,i,w,r]);s.useEffect(()=>{c.includes(Et)?g([{id:Et,desc:!1},{id:vt,desc:!1}]):g([{id:vt,desc:!1}])},[c]);const v=Q.useReactTable({data:x,columns:S,state:{grouping:c,sorting:m,rowSelection:u},onGroupingChange:d,onSortingChange:g,onRowSelectionChange:h,getExpandedRowModel:Q.getExpandedRowModel(),getGroupedRowModel:Q.getGroupedRowModel(),getCoreRowModel:Q.getCoreRowModel(),getSortedRowModel:Q.getSortedRowModel(),getRowId:Tn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const j=v.getSelectedRowModel().rowsById,b=Object.keys(j);if(b.length===1){const B=x.find(T=>Tn(T)===b[0])||void 0;B&&l(B)}}},[u,x,l,v]);const _=o??Jo,k=i??_r,I=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[vt]},{label:`Group by ${k}`,value:[Et]},{label:`Group by ${_} and ${k}`,value:[vt,Et]},{label:`Group by ${k} and ${_}`,value:[Et,vt]}],O=j=>{d(JSON.parse(j))},z=(j,b)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(b)},ct=(j,b)=>j.getIsGrouped()?"":p("banded-row",b%2===0?"even":"odd"),H=(j,b,B)=>{if(!((j==null?void 0:j.length)===0||b.depth<B.column.getGroupedIndex())){if(b.getIsGrouped())switch(b.depth){case 1:return"tw-ps-4";default:return}switch(b.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(Vt,{value:JSON.stringify(c),onValueChange:j=>{O(j)},children:[e.jsx(Nt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(It,{})}),e.jsx(kt,{position:"item-aligned",children:e.jsx(Zn,{children:I.map(j=>e.jsx(ot,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),e.jsxs(pe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(ue,{children:v.getHeaderGroups().map(j=>e.jsx(ft,{children:j.headers.filter(b=>b.column.columnDef.header).map(b=>e.jsx(Pt,{colSpan:b.colSpan,className:"top-0 tw-sticky",children:b.isPlaceholder?void 0:e.jsxs("div",{children:[b.column.getCanGroup()?e.jsx(A,{variant:"ghost",title:`Toggle grouping by ${b.column.columnDef.header}`,onClick:b.column.getToggleGroupingHandler(),type:"button",children:b.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Q.flexRender(b.column.columnDef.header,b.getContext())]})},b.id))},j.id))}),e.jsx(me,{children:v.getRowModel().rows.map((j,b)=>{const B=q();return e.jsx(ft,{"data-state":j.getIsSelected()?"selected":"",className:p(ct(j,b)),onClick:T=>z(j,T),children:j.getVisibleCells().map(T=>{if(!(T.getIsPlaceholder()||T.column.columnDef.enableGrouping&&!T.getIsGrouped()&&(T.column.columnDef.id!==Et||!r)))return e.jsx(Ot,{className:p(T.column.columnDef.id,"tw-p-[1px]",H(c,j,T)),children:T.getIsGrouped()?e.jsxs(A,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&e.jsx(N.ChevronDown,{}),!j.getIsExpanded()&&(B==="ltr"?e.jsx(N.ChevronRight,{}):e.jsx(N.ChevronLeft,{}))," ",Q.flexRender(T.column.columnDef.cell,T.getContext())," (",j.subRows.length,")"]}):Q.flexRender(T.column.columnDef.cell,T.getContext())},T.id)})},j.id)})})]})]})}var yt=(t=>(t.OT="OT",t.NT="NT",t.DC="DC",t.Extra="Extra",t))(yt||{});const es=(t,n,r,a,o)=>{switch(t){case"OT":return n??"Old Testament";case"NT":return r??"New Testament";case"DC":return a??"Deuterocanon";case"Extra":return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ns=(t,n,r,a,o)=>{switch(t){case"OT":return n??"OT";case"NT":return r??"NT";case"DC":return a??"DC";case"Extra":return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}},Bt=t=>{if(V.isBookOT(t))return"OT";if(V.isBookNT(t))return"NT";if(V.isBookDC(t))return"DC";if(V.isExtraMaterial(t))return"Extra";throw new Error(`Unknown section for book: ${t}`)},hn=(t,n)=>t.filter(r=>{try{return Bt(r)===n}catch{return!1}}),Rr=(t,n,r)=>hn(t,n).every(a=>r.includes(a));function rs({bookId:t,selectedBookIds:n,toggleBook:r,lastKeyEventShiftKey:a,localizedBookNames:o}){var l,c;const i=s.useRef(!1),w=s.useRef();return e.jsxs(ce,{value:t,className:"tw-flex tw-items-center",onSelect:()=>{i.current||(r(t,a.current),a.current=!1),w.current&&clearTimeout(w.current),w.current=setTimeout(()=>{i.current=!1},100)},onMouseDown:d=>{d.preventDefault(),i.current=!0,r(t,d.shiftKey)},role:"option","aria-selected":n.includes(t),"aria-label":`${V.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,children:[e.jsx(N.Check,{className:p("tw-me-2 tw-h-4 tw-w-4",n.includes(t)?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:p("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":Bt(t)===yt.OT,"tw-border-s-purple-200":Bt(t)===yt.NT,"tw-border-s-indigo-200":Bt(t)===yt.DC,"tw-border-s-yellow-200":Bt(t)===yt.Extra}),children:o&&((l=o.get(t))==null?void 0:l.localizedName)||V.bookIdToEnglishName(t)}),e.jsx("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:o&&((c=o.get(t))==null?void 0:c.localizedId)||t.toLocaleUpperCase()})]},t)}function as({section:t,availableBookIds:n,selectedBookIds:r,onToggle:a,localizedStrings:o}){const i=hn(n,t).length===0,w=o["%scripture_section_ot_short%"],l=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],d=o["%scripture_section_extra_short%"];return e.jsx(A,{variant:"outline",size:"sm",onClick:()=>a(t),className:p(Rr(n,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:ns(t,w,l,c,d)})}const En=5,Ge=6;function os({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:a,localizedBookNames:o}){const i=a["%webView_book_selector_books_selected%"],w=a["%webView_book_selector_select_books%"],l=a["%webView_book_selector_search_books%"],c=a["%webView_book_selector_select_all%"],d=a["%webView_book_selector_clear_all%"],m=a["%webView_book_selector_no_book_found%"],g=a["%webView_book_selector_more%"],u=a["%scripture_section_ot_long%"],h=a["%scripture_section_nt_long%"],x=a["%scripture_section_dc_long%"],S=a["%scripture_section_extra_long%"],[v,_]=s.useState(!1),k=s.useRef(void 0),I=s.useRef(!1);if(t.length!==V.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=s.useMemo(()=>V.allBookIds.filter((b,B)=>t[B]==="1"&&!V.isObsolete(V.bookIdToNumber(b))),[t]),z=s.useCallback((b,B=!1)=>{if(!B||!k.current){r(n.includes(b)?n.filter(J=>J!==b):[...n,b]),k.current=b;return}const T=O.findIndex(J=>J===k.current),L=O.findIndex(J=>J===b);if(T===-1||L===-1)return;const[it,bt]=[Math.min(T,L),Math.max(T,L)],St=O.slice(it,bt+1).map(J=>J);r(n.includes(b)?n.filter(J=>!St.includes(J)):[...new Set([...n,...St])])},[n,r,O]),ct=s.useCallback(b=>{const B=hn(O,b).map(T=>T);r(Rr(O,b,n)?n.filter(T=>!B.includes(T)):[...new Set([...n,...B])])},[n,r,O]),H=()=>{r(O.map(b=>b))},j=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(yt).map(b=>e.jsx(as,{section:b,availableBookIds:O,selectedBookIds:n,onToggle:ct,localizedStrings:a},b))}),e.jsxs(oe,{open:v,onOpenChange:_,children:[e.jsx(se,{asChild:!0,children:e.jsxs(A,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${i}: ${n.length}`:w,e.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx($t,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(ie,{onKeyDown:b=>{b.key==="Enter"&&(I.current=b.shiftKey)},children:[e.jsx(we,{placeholder:l}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(A,{variant:"ghost",size:"sm",onClick:H,children:c}),e.jsx(A,{variant:"ghost",size:"sm",onClick:j,children:d})]}),e.jsxs(le,{children:[e.jsx(de,{children:m}),Object.values(yt).map((b,B)=>{const T=O.filter(L=>Bt(L)===b);if(T.length!==0)return e.jsxs(s.Fragment,{children:[e.jsx(Te,{heading:es(b,u,h,x,S),children:T.map(L=>e.jsx(rs,{bookId:L,selectedBookIds:n,toggleBook:z,lastKeyEventShiftKey:I,localizedBookNames:o},L))}),B<Object.values(yt).length-1&&e.jsx(Un,{})]},b)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===Ge?Ge:En).map(b=>{var B;return e.jsx(te,{className:"hover:tw-bg-secondary",variant:"secondary",children:o&&((B=o.get(b))==null?void 0:B.localizedName)||V.bookIdToEnglishName(b)||b},b)}),n.length>Ge&&e.jsx(te,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-En} ${g}`})]})]})}const ss=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Rt=(t,n)=>t[n]??n;function is({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:a,selectedBookIds:o,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l}){const c=Rt(w,"%webView_scope_selector_selected_text%"),d=Rt(w,"%webView_scope_selector_current_verse%"),m=Rt(w,"%webView_scope_selector_current_chapter%"),g=Rt(w,"%webView_scope_selector_current_book%"),u=Rt(w,"%webView_scope_selector_choose_books%"),h=Rt(w,"%webView_scope_selector_scope%"),x=Rt(w,"%webView_scope_selector_select_books%"),S=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:g,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],v=n?S.filter(_=>n.includes(_.value)):S;return e.jsxs("div",{className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(K,{children:h}),e.jsx(Re,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:v.map(({value:_,label:k,id:I})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(Zt,{className:"tw-me-2",value:_,id:I}),e.jsx(K,{htmlFor:I,children:k})]},I))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(K,{children:x}),e.jsx(os,{availableBookInfo:a,selectedBookIds:o,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Le={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ws({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o="sm",className:i}){const w={...Le,...Object.fromEntries(Object.entries(a).map(([c,d])=>[c,c===d&&c in Le?Le[c]:d]))},l=q();return e.jsxs(Vt,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(Nt,{size:o,className:p("pr-twp tw-w-auto",i),children:e.jsx(It,{placeholder:w[y.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(kt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(ot,{value:`${c}`,children:w[y.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function ls({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function ds({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function cs({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(Me,{}):""]})}function Tr(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function je({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:p("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Er=(t,n,r,a)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>n.filter(l=>l.group===i).sort((l,c)=>l.order-c.order).map(l=>e.jsxs(Ie,{children:[e.jsx(Oe,{asChild:!0,children:"command"in l?e.jsxs(re,{onClick:()=>{a(l)},children:[l.iconPathBefore&&e.jsx(je,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&e.jsx(je,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):e.jsxs(An,{children:[e.jsx(We,{children:l.label}),e.jsx(zn,{children:e.jsx(Ze,{children:Er(t,n,Tr(t,l.id),a)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&e.jsx(he,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function qe({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:a,className:o,variant:i,id:w}){return e.jsxs(ne,{variant:i,children:[e.jsx(Ce,{"aria-label":r,className:o,asChild:!0,id:w,children:e.jsx(A,{variant:"ghost",size:"icon",children:a??e.jsx(N.MenuIcon,{})})}),e.jsx(Lt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,l])=>typeof l=="object").sort(([,l],[,c])=>typeof l=="boolean"||typeof c=="boolean"?0:l.order-c.order).map(([l],c,d)=>e.jsxs(s.Fragment,{children:[e.jsx(Je,{children:e.jsx(Ve,{children:Er(n.groups,n.items,l,t)})}),c<d.length-1&&e.jsx(Dt,{})]},l))})]})}function ps({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:a,id:o,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:c}){return e.jsxs("div",{className:p("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",i),id:o,children:[r&&e.jsx("div",{children:e.jsx(qe,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:e.jsx(N.Menu,{}),className:"tw-h-8 tw-w-8"})}),e.jsx("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),e.jsx("div",{className:"tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),e.jsxs("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&e.jsx("div",{children:e.jsx(qe,{onSelectMenuItem:n,menuData:a,tabLabel:"View Info",icon:e.jsx(N.EllipsisVertical,{}),className:"tw-h-8"})}),c]})]})}const fn=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(nt.Root,{orientation:"vertical",ref:r,className:p("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});fn.displayName=nt.List.displayName;const gn=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.List,{ref:r,className:p("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));gn.displayName=nt.List.displayName;const Dr=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Trigger,{ref:r,...n,className:p("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),bn=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Content,{ref:r,className:p("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));bn.displayName=nt.Content.displayName;function us({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:i}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(ze,{className:i,value:n,onSearch:r,placeholder:a})]}),e.jsxs(fn,{children:[e.jsx(gn,{children:t.map(w=>e.jsx(Dr,{value:w.value,children:w.value},w.key))}),t.map(w=>e.jsx(bn,{value:w.value,children:w.content},w.key))]})]})}function ms({...t}){return e.jsx(G.Menu,{...t})}function hs({...t}){return e.jsx(G.Sub,{"data-slot":"menubar-sub",...t})}const Mr=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx(Ue.Provider,{value:o,children:e.jsx(G.Root,{ref:a,className:p("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Mr.displayName=G.Root.displayName;const Vr=s.forwardRef(({className:t,...n},r)=>{const a=dt();return e.jsx(G.Trigger,{ref:r,className:p("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",gt({variant:a.variant,className:t})),...n})});Vr.displayName=G.Trigger.displayName;const Ir=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const i=dt();return e.jsxs(G.SubTrigger,{ref:o,className:p("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",gt({variant:i.variant,className:t}),t),...a,children:[r,e.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ir.displayName=G.SubTrigger.displayName;const Or=s.forwardRef(({className:t,...n},r)=>{const a=dt();return e.jsx(G.SubContent,{ref:r,className:p("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});Or.displayName=G.SubContent.displayName;const zr=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},i)=>{const w=dt();return e.jsx(G.Portal,{children:e.jsx(G.Content,{ref:i,align:n,alignOffset:r,sideOffset:a,className:p("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...o})})});zr.displayName=G.Content.displayName;const Ar=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=dt();return e.jsx(G.Item,{ref:a,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",gt({variant:o.variant,className:t}),t),...r})});Ar.displayName=G.Item.displayName;const fs=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const i=dt();return e.jsxs(G.CheckboxItem,{ref:o,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",gt({variant:i.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(G.ItemIndicator,{children:e.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});fs.displayName=G.CheckboxItem.displayName;const gs=s.forwardRef(({className:t,children:n,...r},a)=>{const o=dt();return e.jsxs(G.RadioItem,{ref:a,className:p("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",gt({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(G.ItemIndicator,{children:e.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});gs.displayName=G.RadioItem.displayName;const bs=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(G.Label,{ref:a,className:p("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));bs.displayName=G.Label.displayName;const Br=s.forwardRef(({className:t,...n},r)=>e.jsx(G.Separator,{ref:r,className:p("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Br.displayName=G.Separator.displayName;const Ht=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Pr=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return o.flatMap(([i],w)=>{const l=n.filter(d=>d.group===i).sort((d,m)=>d.order-m.order).map(d=>e.jsxs(Ie,{children:[e.jsx(Oe,{asChild:!0,children:"command"in d?e.jsxs(Ar,{onClick:()=>{a(d)},children:[d.iconPathBefore&&e.jsx(je,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&e.jsx(je,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):e.jsxs(hs,{children:[e.jsx(Ir,{children:d.label}),e.jsx(Or,{children:Pr(t,n,Tr(t,d.id),a)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&e.jsx(he,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),c=[...l];return l.length>0&&w<o.length-1&&c.push(e.jsx(Br,{},`separator-${i}`)),c})};function xs({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),c=s.useRef(void 0),d=m=>{switch(m){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return c;default:return}};if(Oa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(m,g)=>{var x,S,v,_;m.preventDefault();const u={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":Ht(i,[u]);break;case"alt+p":(x=i.current)==null||x.focus(),Ht(i,[u,h]);break;case"alt+l":(S=w.current)==null||S.focus(),Ht(w,[u,h]);break;case"alt+n":(v=l.current)==null||v.focus(),Ht(l,[u,h]);break;case"alt+h":(_=c.current)==null||_.focus(),Ht(c,[u,h]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const m=new MutationObserver(h=>{h.forEach(x=>{if(x.attributeName==="data-state"&&x.target instanceof HTMLElement){const S=x.target.getAttribute("data-state");r(S==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(h=>{m.observe(h,{attributes:!0})}),()=>m.disconnect()},[r]),!!t)return e.jsx(Mr,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,m])=>typeof m=="object").sort(([,m],[,g])=>typeof m=="boolean"||typeof g=="boolean"?0:m.order-g.order).map(([m,g])=>e.jsxs(ms,{children:[e.jsx(Vr,{ref:d(m),children:typeof g=="object"&&"label"in g&&g.label}),e.jsx(zr,{className:"tw-z-[250]",children:e.jsx(Ve,{children:Pr(t.groups,t.items,m,n)})})]},m))})}function vs(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ys({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:a,id:o,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:c,menubarVariant:d="default"}){const m=s.useRef(void 0);return e.jsx("div",{className:p("tw-border tw-px-4 tw-text-foreground",a),ref:m,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&e.jsx(xs,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:d})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const Ns=(t,n)=>t[n]??n;function ks({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:w,className:l}){const c=Ns(w,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,m]=s.useState(!1),g=h=>{o&&o(h),a&&a([h,...r.filter(x=>x!==h)]),i&&r.find(x=>x===h)&&i([...r.filter(x=>x!==h)]),m(!1)},u=(h,x)=>{var v,_,k,I,O,z;const S=x!==h?((_=(v=t[h])==null?void 0:v.uiNames)==null?void 0:_[x])??((I=(k=t[h])==null?void 0:k.uiNames)==null?void 0:I.en):void 0;return S?`${(O=t[h])==null?void 0:O.autonym} (${S})`:(z=t[h])==null?void 0:z.autonym};return e.jsxs("div",{className:p("pr-twp tw-max-w-sm",l),children:[e.jsxs(Vt,{name:"uiLanguage",value:n,onValueChange:g,open:d,onOpenChange:h=>m(h),children:[e.jsx(Nt,{children:e.jsx(It,{})}),e.jsx(kt,{className:"tw-z-[250]",children:Object.keys(t).map(h=>e.jsx(ot,{value:h,children:u(h,n)},h))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(K,{className:"tw-ms-3",children:c}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(K,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(h=>u(h,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function js({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(K,{children:n(t)}):r?e.jsx(K,{children:r(t)}):e.jsx(K,{children:t})}function Ss({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:i,createComplexLabel:w}){return e.jsx("div",{id:t,className:n,children:r.map(l=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Ee,{className:"tw-me-2 tw-align-middle",checked:a.includes(l),onCheckedChange:c=>o(l,c)}),e.jsx(js,{item:l,createLabel:i,createComplexLabel:w})]},l))})}const Fr=s.forwardRef(({className:t,...n},r)=>e.jsx(N.LoaderCircle,{size:35,className:p("tw-animate-spin",t),...n,ref:r}));Fr.displayName="Spinner";function Cs({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:i,placeholder:w,isRequired:l=!1,className:c,defaultValue:d,value:m,onChange:g,onFocus:u,onBlur:h}){return e.jsxs("div",{className:p("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(K,{htmlFor:t,className:p({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),e.jsx(zt,{id:t,disabled:n,placeholder:w,required:l,className:p(c,{"tw-border-red-600":r}),defaultValue:d,value:m,onChange:g,onFocus:u,onBlur:h}),e.jsx("p",{className:p({"tw-hidden":!o}),children:o})]})}const _s=jt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Gr=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:p(_s({variant:n}),t),...r}));Gr.displayName="Alert";const Lr=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:p("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Lr.displayName="AlertTitle";const Xr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:p("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Xr.displayName="AlertDescription";const $r=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Root,{ref:r,className:p("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));$r.displayName=Gt.Root.displayName;const Kr=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Image,{ref:r,className:p("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Kr.displayName=Gt.Image.displayName;const Hr=s.forwardRef(({className:t,...n},r)=>e.jsx(Gt.Fallback,{ref:r,className:p("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));Hr.displayName=Gt.Fallback.displayName;const Yr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:p("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Yr.displayName="Card";const qr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:p("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));qr.displayName="CardHeader";const Ur=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:p("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Ur.displayName="CardTitle";const Jr=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:p("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));Jr.displayName="CardDescription";const Wr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:p("pr-twp tw-p-6 tw-pt-0",t),...n}));Wr.displayName="CardContent";const Zr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:p("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));Zr.displayName="CardFooter";const Qr=s.createContext({direction:"bottom"});function ta({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const a=s.useMemo(()=>({direction:n}),[n]);return e.jsx(Qr.Provider,{value:a,children:e.jsx(lt.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}ta.displayName="Drawer";const Rs=lt.Drawer.Trigger,ea=lt.Drawer.Portal,Ts=lt.Drawer.Close,xn=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Overlay,{ref:r,className:p("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));xn.displayName=lt.Drawer.Overlay.displayName;const na=s.forwardRef(({className:t,children:n,hideDrawerHandle:r=!1,...a},o)=>{const{direction:i="bottom"}=s.useContext(Qr),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(ea,{children:[e.jsx(xn,{}),e.jsxs(lt.Drawer.Content,{ref:o,className:p("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...a,children:[!r&&(i==="bottom"||i==="right")&&e.jsx("div",{className:l[i]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),!r&&(i==="top"||i==="left")&&e.jsx("div",{className:l[i]})]})]})});na.displayName="DrawerContent";function ra({className:t,...n}){return e.jsx("div",{className:p("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}ra.displayName="DrawerHeader";function aa({className:t,...n}){return e.jsx("div",{className:p("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}aa.displayName="DrawerFooter";const oa=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Title,{ref:r,className:p("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));oa.displayName=lt.Drawer.Title.displayName;const sa=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Description,{ref:r,className:p("tw-text-sm tw-text-muted-foreground",t),...n}));sa.displayName=lt.Drawer.Description.displayName;const ia=s.forwardRef(({className:t,value:n,...r},a)=>e.jsx(Ke.Root,{ref:a,className:p("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(Ke.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));ia.displayName=Ke.Root.displayName;function Es({...t}){return e.jsx(Mn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const wa=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsxs(Yt.Root,{ref:r,className:p("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(Yt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(Yt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(Yt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});wa.displayName=Yt.Root.displayName;const la=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(He.Root,{className:p("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(He.Thumb,{className:p("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});la.displayName=He.Root.displayName;const Ds=nt.Root,da=s.forwardRef(({className:t,...n},r)=>{const a=q();return e.jsx(nt.List,{ref:r,className:p("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});da.displayName=nt.List.displayName;const ca=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Trigger,{ref:r,className:p("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));ca.displayName=nt.Trigger.displayName;const pa=s.forwardRef(({className:t,...n},r)=>e.jsx(nt.Content,{ref:r,className:p("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));pa.displayName=nt.Content.displayName;const ua=s.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:p("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));ua.displayName="Textarea";const Ms=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Vs(t){return{preserveValue:!0,...t}}const ma=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=Vs(o.current);const[i,w]=s.useState(()=>a.current),[l,c]=s.useState(!0);return s.useEffect(()=>{let d=!0;return c(!!t),(async()=>{if(t){const m=await t();d&&(w(()=>m),c(!1))}})(),()=>{d=!1,o.current.preserveValue||w(()=>a.current)}},[t]),[i,l]},Xe=()=>!1,Is=(t,n)=>{const[r]=ma(s.useCallback(async()=>{if(!t)return Xe;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),Xe,{preserveValue:!1});s.useEffect(()=>()=>{r!==Xe&&r()},[r])},Os=({options:t,onFocusChange:n,onOptionSelect:r,onCharacterPress:a})=>{const o=s.useRef(null),[i,w]=s.useState(void 0),[l,c]=s.useState(void 0),d=s.useCallback(u=>{w(u);const h=t.find(S=>S.id===u);h&&(n==null||n(h));const x=document.getElementById(u);x&&(x.scrollIntoView({block:"center"}),x.focus()),o.current&&o.current.setAttribute("aria-activedescendant",u)},[n,t]),m=s.useCallback(u=>{const h=t.find(x=>x.id===u);h&&(c(x=>x===u?void 0:u),r==null||r(h))},[r,t]),g=s.useCallback(u=>{const h=t.findIndex(v=>v.id===i);let x=h;switch(u.key){case"ArrowDown":x=Math.min(h+1,t.length-1),u.preventDefault();break;case"ArrowUp":x=Math.max(h-1,0),u.preventDefault();break;case"Home":x=0,u.preventDefault();break;case"End":x=t.length-1,u.preventDefault();break;case" ":case"Enter":i&&m(i),u.preventDefault(),u.stopPropagation();return;default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(a==null||a(u.key),u.preventDefault());return}const S=t[x];S&&d(S.id)},[t,d,i,m,a]);return{listboxRef:o,activeId:i,selectedId:l,handleKeyDown:g,focusOption:d}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Mn.toast});exports.Alert=Gr;exports.AlertDescription=Xr;exports.AlertTitle=Lr;exports.Avatar=$r;exports.AvatarFallback=Hr;exports.AvatarImage=Kr;exports.BOOK_SELECTOR_STRING_KEYS=mo;exports.Badge=te;exports.BookChapterControl=so;exports.BookSelectionMode=Wn;exports.BookSelector=ho;exports.Button=A;exports.Card=Yr;exports.CardContent=Wr;exports.CardDescription=Jr;exports.CardFooter=Zr;exports.CardHeader=qr;exports.CardTitle=Ur;exports.ChapterRangeSelector=Jn;exports.Checkbox=Ee;exports.Checklist=Ss;exports.ComboBox=ve;exports.Command=ie;exports.CommandEmpty=de;exports.CommandGroup=Te;exports.CommandInput=we;exports.CommandItem=ce;exports.CommandList=le;exports.DataTable=ar;exports.Drawer=ta;exports.DrawerClose=Ts;exports.DrawerContent=na;exports.DrawerDescription=sa;exports.DrawerFooter=aa;exports.DrawerHeader=ra;exports.DrawerOverlay=xn;exports.DrawerPortal=ea;exports.DrawerTitle=oa;exports.DrawerTrigger=Rs;exports.DropdownMenu=ne;exports.DropdownMenuCheckboxItem=_e;exports.DropdownMenuContent=Lt;exports.DropdownMenuGroup=Je;exports.DropdownMenuItem=re;exports.DropdownMenuItemType=sr;exports.DropdownMenuLabel=ae;exports.DropdownMenuPortal=zn;exports.DropdownMenuRadioGroup=Bn;exports.DropdownMenuRadioItem=Qe;exports.DropdownMenuSeparator=Dt;exports.DropdownMenuShortcut=Pn;exports.DropdownMenuSub=An;exports.DropdownMenuSubContent=Ze;exports.DropdownMenuSubTrigger=We;exports.DropdownMenuTrigger=Ce;exports.ERROR_DUMP_STRING_KEYS=ko;exports.ErrorDump=or;exports.ErrorPopover=jo;exports.Filter=To;exports.FilterDropdown=So;exports.Footer=Ro;exports.INVENTORY_STRING_KEYS=Po;exports.Input=zt;exports.Inventory=Lo;exports.Label=K;exports.MarkdownRenderer=No;exports.MoreInfo=Co;exports.MultiSelectComboBox=wr;exports.NavigationContentSearch=us;exports.Popover=oe;exports.PopoverContent=$t;exports.PopoverTrigger=se;exports.Progress=ia;exports.RadioGroup=Re;exports.RadioGroupItem=Zt;exports.SCOPE_SELECTOR_STRING_KEYS=ss;exports.ScopeSelector=is;exports.ScriptureResultsViewer=ts;exports.ScrollGroupSelector=ws;exports.SearchBar=ze;exports.Select=Vt;exports.SelectContent=kt;exports.SelectGroup=Zn;exports.SelectItem=ot;exports.SelectLabel=tr;exports.SelectScrollDownButton=on;exports.SelectScrollUpButton=an;exports.SelectSeparator=er;exports.SelectTrigger=Nt;exports.SelectValue=It;exports.Separator=Me;exports.SettingsList=ls;exports.SettingsListHeader=cs;exports.SettingsListItem=ds;exports.SettingsSidebar=Cr;exports.SettingsSidebarContentSearch=Ho;exports.Sidebar=ln;exports.SidebarContent=cn;exports.SidebarFooter=gr;exports.SidebarGroup=ye;exports.SidebarGroupAction=xr;exports.SidebarGroupContent=ke;exports.SidebarGroupLabel=Ne;exports.SidebarHeader=fr;exports.SidebarInput=hr;exports.SidebarInset=dn;exports.SidebarMenu=pn;exports.SidebarMenuAction=vr;exports.SidebarMenuBadge=yr;exports.SidebarMenuButton=mn;exports.SidebarMenuItem=un;exports.SidebarMenuSkeleton=Nr;exports.SidebarMenuSub=kr;exports.SidebarMenuSubButton=Sr;exports.SidebarMenuSubItem=jr;exports.SidebarProvider=wn;exports.SidebarRail=mr;exports.SidebarSeparator=br;exports.SidebarTrigger=ur;exports.Skeleton=Ye;exports.Slider=wa;exports.Sonner=Es;exports.Spinner=Fr;exports.Switch=la;exports.TabDropdownMenu=qe;exports.TabToolbar=ps;exports.Table=pe;exports.TableBody=me;exports.TableCaption=rr;exports.TableCell=Ot;exports.TableFooter=nr;exports.TableHead=Pt;exports.TableHeader=ue;exports.TableRow=ft;exports.Tabs=Ds;exports.TabsContent=pa;exports.TabsList=da;exports.TabsTrigger=ca;exports.TextField=Cs;exports.Textarea=ua;exports.ToggleGroup=sn;exports.ToggleGroupItem=Ut;exports.Toolbar=ys;exports.Tooltip=Ie;exports.TooltipContent=he;exports.TooltipProvider=Ve;exports.TooltipTrigger=Oe;exports.UiLanguageSelector=ks;exports.VerticalTabs=fn;exports.VerticalTabsContent=bn;exports.VerticalTabsList=gn;exports.VerticalTabsTrigger=Dr;exports.badgeVariants=ir;exports.buttonVariants=Yn;exports.cn=p;exports.getBookIdFromUSFM=Bo;exports.getLinesFromUSFM=zo;exports.getNumberFromUSFM=Ao;exports.getStatusForItem=cr;exports.getToolbarOSReservedSpaceClassName=vs;exports.inventoryCountColumn=Io;exports.inventoryItemColumn=Mo;exports.inventoryStatusColumn=Oo;exports.selectTriggerVariants=Qn;exports.useEvent=Ms;exports.useEventAsync=Is;exports.useListbox=Os;exports.usePromise=ma;exports.useSidebar=fe;function zs(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}zs(`.banded-row:hover {
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
.tw-min-w-80 {
  min-width: 20rem;
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
.tw-max-w-96 {
  max-width: 24rem;
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
.tw-border-border {
  border-color: hsl(var(--border));
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
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
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
.\\*\\:tw-p-2 > * {
  padding: 0.5rem;
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
