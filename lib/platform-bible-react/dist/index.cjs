"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),Pt=require("@radix-ui/react-slot"),jt=require("class-variance-authority"),sa=require("clsx"),ia=require("tailwind-merge"),W=require("cmdk"),x=require("lucide-react"),wa=require("@radix-ui/react-dialog"),la=require("@radix-ui/react-popover"),j=require("platform-bible-utils"),da=require("@radix-ui/react-label"),ca=require("@radix-ui/react-radio-group"),Y=require("@tanstack/react-table"),Nn=require("@radix-ui/react-dropdown-menu"),pa=require("@radix-ui/react-select"),ua=require("markdown-to-jsx"),ma=require("@radix-ui/react-checkbox"),ha=require("@radix-ui/react-toggle-group"),fa=require("@radix-ui/react-toggle"),ga=require("@radix-ui/react-separator"),ba=require("@radix-ui/react-tooltip"),xa=require("@radix-ui/react-tabs"),va=require("@radix-ui/react-menubar"),ya=require("react-hotkeys-hook"),Na=require("@radix-ui/react-avatar"),ot=require("vaul"),ka=require("@radix-ui/react-progress"),kn=require("sonner"),ja=require("@radix-ui/react-slider"),Ca=require("@radix-ui/react-switch");function q(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const ct=q(wa),Zt=q(la),jn=q(da),Qt=q(ca),P=q(Nn),A=q(pa),Oe=q(ma),be=q(ha),Cn=q(fa),Sn=q(ga),re=q(ba),Z=q(xa),B=q(va),Bt=q(Na),Pe=q(ka),Jt=q(ja),Be=q(Ca),Sa=ia.extendTailwindMerge({prefix:"tw-"});function c(...t){return Sa(sa.clsx(t))}const _n=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=s.forwardRef(({className:t,variant:n,size:r,asChild:a=!1,...o},w)=>{const i=a?Pt.Slot:"button";return e.jsx(i,{className:c(_n({variant:n,size:r,className:t})),ref:w,...o})});V.displayName="Button";const _a="layoutDirection";function L(){const t=localStorage.getItem(_a);return t==="rtl"?t:"ltr"}const Ta=ct.Portal,Tn=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));Tn.displayName=ct.Overlay.displayName;const Ra=s.forwardRef(({className:t,children:n,...r},a)=>{const o=L();return e.jsxs(Ta,{children:[e.jsx(Tn,{}),e.jsxs(ct.Content,{ref:a,className:c("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:o,children:[n,e.jsxs(ct.Close,{className:c("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ra.displayName=ct.Content.displayName;const Ea=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));Ea.displayName=ct.Title.displayName;const Da=s.forwardRef(({className:t,...n},r)=>e.jsx(ct.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...n}));Da.displayName=ct.Description.displayName;const At=s.forwardRef(({className:t,...n},r)=>e.jsx(W.Command,{ref:r,className:c("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));At.displayName=W.Command.displayName;const Ft=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[e.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(W.Command.Input,{ref:r,className:c("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});Ft.displayName=W.Command.Input.displayName;const Gt=s.forwardRef(({className:t,...n},r)=>e.jsx(W.Command.List,{ref:r,className:c("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Gt.displayName=W.Command.List.displayName;const ae=s.forwardRef((t,n)=>e.jsx(W.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ae.displayName=W.Command.Empty.displayName;const Tt=s.forwardRef(({className:t,...n},r)=>e.jsx(W.Command.Group,{ref:r,className:c("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));Tt.displayName=W.Command.Group.displayName;const Rn=s.forwardRef(({className:t,...n},r)=>e.jsx(W.Command.Separator,{ref:r,className:c("tw--mx-1 tw-h-px tw-bg-border",t),...n}));Rn.displayName=W.Command.Separator.displayName;const yt=s.forwardRef(({className:t,...n},r)=>e.jsx(W.Command.Item,{ref:r,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));yt.displayName=W.Command.Item.displayName;const Lt=Zt.Root,Xt=Zt.Trigger,Vt=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...a},o)=>{const w=L();return e.jsx(Zt.Portal,{children:e.jsx(Zt.Content,{ref:o,align:n,sideOffset:r,className:c("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,dir:w})})});Vt.displayName=Zt.Content.displayName;var Ma=Object.defineProperty,Va=(t,n,r)=>n in t?Ma(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,R=(t,n,r)=>Va(t,typeof n!="symbol"?n+"":n,r);const Rt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ge=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],En=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],mn=Xa();function $t(t,n=!0){return n&&(t=t.toUpperCase()),t in mn?mn[t]:0}function Le(t){return $t(t)>0}function za(t){const n=typeof t=="string"?$t(t):t;return n>=40&&n<=66}function Ia(t){return(typeof t=="string"?$t(t):t)<=39}function Dn(t){return t<=66}function Oa(t){const n=typeof t=="string"?$t(t):t;return zn(n)&&!Dn(n)}function*Pa(){for(let t=1;t<=Rt.length;t++)yield t}const Ba=1,Mn=Rt.length;function Aa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Xe(t,n="***"){const r=t-1;return r<0||r>=Rt.length?n:Rt[r]}function Vn(t){return t<=0||t>Mn?"******":En[t-1]}function Fa(t){return Vn($t(t))}function zn(t){const n=typeof t=="number"?Xe(t):t;return Le(n)&&!Ge.includes(n)}function Ga(t){const n=typeof t=="number"?Xe(t):t;return Le(n)&&Ge.includes(n)}function La(t){return En[t-1].includes("*obsolete*")}function Xa(){const t={};for(let n=0;n<Rt.length;n++)t[Rt[n]]=n+1;return t}const z={allBookIds:Rt,nonCanonicalIds:Ge,bookIdToNumber:$t,isBookIdValid:Le,isBookNT:za,isBookOT:Ia,isBookOTNT:Dn,isBookDC:Oa,allBookNumbers:Pa,firstBook:Ba,lastBook:Mn,extraBooks:Aa,bookNumberToId:Xe,bookNumberToEnglishName:Vn,bookIdToEnglishName:Fa,isCanonical:zn,isExtraMaterial:Ga,isObsolete:La};var lt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(lt||{});const et=class{constructor(n){if(R(this,"name"),R(this,"fullPath"),R(this,"isPresent"),R(this,"hasVerseSegments"),R(this,"isCustomized"),R(this,"baseVersification"),R(this,"scriptureBooks"),R(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=lt[n]):(this._type=n,this.name=lt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};R(et,"Original",new et(lt.Original)),R(et,"Septuagint",new et(lt.Septuagint)),R(et,"Vulgate",new et(lt.Vulgate)),R(et,"English",new et(lt.English)),R(et,"RussianProtestant",new et(lt.RussianProtestant)),R(et,"RussianOrthodox",new et(lt.RussianOrthodox));let St=et;function hn(t,n){const r=n[0];for(let a=1;a<n.length;a++)t=t.split(n[a]).join(r);return t.split(r)}var In=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(In||{});const J=class M{constructor(n,r,a,o){if(R(this,"firstChapter"),R(this,"lastChapter"),R(this,"lastVerse"),R(this,"hasSegmentsDefined"),R(this,"text"),R(this,"BBBCCCVVVS"),R(this,"longHashCode"),R(this,"versification"),R(this,"rtlMark","‏"),R(this,"_bookNum",0),R(this,"_chapterNum",0),R(this,"_verseNum",0),R(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const w=n,i=r!=null&&r instanceof St?r:void 0;this.setEmpty(i),this.parse(w)}else if(n!=null&&typeof n=="number"){const w=r!=null&&r instanceof St?r:void 0;this.setEmpty(w),this._verseNum=n%M.chapterDigitShifter,this._chapterNum=Math.floor(n%M.bookDigitShifter/M.chapterDigitShifter),this._bookNum=Math.floor(n/M.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof M){const w=n;this._bookNum=w.bookNum,this._chapterNum=w.chapterNum,this._verseNum=w.verseNum,this._verse=w.verse,this.versification=w.versification}else{if(n==null)return;const w=n instanceof St?n:M.defaultVersification;this.setEmpty(w)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??M.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new M(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Yt)return r=new M,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%M.bcvMaxValue*M.bookDigitShifter+(r>=0?r%M.bcvMaxValue*M.chapterDigitShifter:0)+(a>=0?a%M.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:w,versificationStr:i}=n,l=w||o.toString();let p;return i&&(p=new St(i)),r?new M(r,a.toString(),l,p):new M}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>M.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(M.verseRangeSeparator)||this._verse.includes(M.verseSequenceIndicator))}get book(){return z.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=z.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=M.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=M.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>z.lastBook)throw new Yt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new St(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(M.verseRangeSeparators,M.verseSequenceIndicators)}get BBBCCC(){return M.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return M.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const w=n.split("/");if(n=w[0],w.length>1)try{const i=+w[1].trim();this.versification=new St(lt[i])}catch{throw new Yt("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Yt("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||z.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!M.isVerseParseable(a[1]))throw new Yt("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new M(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof M?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=M.verseRangeSeparators,a=M.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],w=hn(this._verse,a);for(const i of w.map(l=>hn(l,r))){const l=this.clone();l.verse=i[0];const p=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!n)for(let u=p+1;u<d.verseNum;u++){const h=new M(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(h)}o.push(d)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const w=o.internalValid;if(w!==0)return w;const i=o.BBBCCCVVV;if(a>i)return 3;if(a===i)return 4;a=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>z.lastBook?2:(z.isCanonical(this._bookNum),0)}setEmpty(n=M.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=z.bookIdToNumber(n),this.chapter=r,this.verse=a}};R(J,"defaultVersification",St.English),R(J,"verseRangeSeparator","-"),R(J,"verseSequenceIndicator",","),R(J,"verseRangeSeparators",[J.verseRangeSeparator]),R(J,"verseSequenceIndicators",[J.verseSequenceIndicator]),R(J,"chapterDigitShifter",1e3),R(J,"bookDigitShifter",J.chapterDigitShifter*J.chapterDigitShifter),R(J,"bcvMaxValue",J.chapterDigitShifter-1),R(J,"ValidStatusType",In);class Yt extends Error{}const On=z.allBookIds.filter(t=>!z.isObsolete(z.bookIdToNumber(t))),rt=Object.fromEntries(On.map(t=>[t,z.bookIdToEnglishName(t)])),$a={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon",Extra:"Extra"},Ee={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},qa=[Ee.BOOK_ONLY,Ee.BOOK_CHAPTER,Ee.BOOK_CHAPTER_VERSE];function dt(t){return j.getChaptersForBook(z.bookIdToNumber(t))}function Ha(t,n){if(!t.trim()||n.length===0)return;const r=qa.reduce((a,o)=>{if(a)return a;const w=o.exec(t.trim());if(w){const[i,l=void 0,p=void 0]=w.slice(1);let d;if(!d&&z.isBookIdValid(i)){const u=i.toUpperCase();n.includes(u)&&(d=u)}if(!d){const u=i.toLowerCase(),h=n.filter(m=>rt[m].toLowerCase().includes(u)||m.toLowerCase().includes(u));h.length===1&&([d]=h)}if(!d&&l){const h=(m=>Object.keys(rt).find(f=>rt[f].toLowerCase()===m.toLowerCase()))(i);h&&n.includes(h)&&(d=h)}if(d){let u=l?parseInt(l,10):void 0;u&&u>dt(d)&&(u=Math.max(dt(d),1));const h=p?parseInt(p,10):void 0;return{book:d,chapterNum:u,verseNum:h}}}},void 0);if(r)return r}function fn(t,n){return`${t} ${rt[t]}${n?` ${n}`:""}`}function Ka(t,n,r,a){const o=s.useCallback(()=>{if(t.chapterNum>1)a({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const p=n.indexOf(t.book);if(p>0){const d=n[p-1],u=Math.max(dt(d),1);a({book:d,chapterNum:u,verseNum:1})}}},[t,n,a]),w=s.useCallback(()=>{const p=dt(t.book);if(t.chapterNum<p)a({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=n.indexOf(t.book);if(d<n.length-1){const u=n[d+1];a({book:u,chapterNum:1,verseNum:1})}}},[t,n,a]),i=s.useCallback(()=>{a({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,a]),l=s.useCallback(()=>{a({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,a]);return s.useMemo(()=>[{onClick:o,disabled:n.length===0||t.chapterNum===1&&n.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?x.ChevronsLeft:x.ChevronsRight},{onClick:i,disabled:n.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?x.ChevronLeft:x.ChevronRight},{onClick:l,disabled:n.length===0,title:"Next verse",icon:r==="ltr"?x.ChevronRight:x.ChevronLeft},{onClick:w,disabled:n.length===0||(t.chapterNum===dt(t.book)||dt(t.book)===-1)&&n.indexOf(t.book)===n.length-1,title:"Next chapter",icon:r==="ltr"?x.ChevronsRight:x.ChevronsLeft}],[t,n,r,o,i,l,w])}function gn({bookId:t,scrRef:n,onChapterSelect:r,setChapterRef:a,isChapterDimmed:o,className:w}){if(t)return e.jsx(Tt,{children:e.jsx("div",{className:c("tw-grid tw-grid-cols-6 tw-gap-1",w),children:Array.from({length:dt(t)},(i,l)=>l+1).map(i=>e.jsx(yt,{value:`${t} ${rt[t]||""} ${i}`,onSelect:()=>r(i),ref:a(i),className:c("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===n.book&&i===n.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(o==null?void 0:o(i))??!1}),children:i},i))})})}function Ya({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:a}){const o=L(),[w,i]=s.useState(!1),[l,p]=s.useState(""),[d,u]=s.useState(""),[h,m]=s.useState("books"),[f,g]=s.useState(void 0),[_,k]=s.useState(!1),S=s.useRef(void 0),y=s.useRef(void 0),D=s.useRef(void 0),O=s.useRef(void 0),K=s.useRef({}),Q=s.useMemo(()=>a?a():On,[a]),at=s.useMemo(()=>({OT:Q.filter(I=>z.isBookOT(I)),NT:Q.filter(I=>z.isBookNT(I)),DC:Q.filter(I=>z.isBookDC(I)),Extra:Q.filter(I=>z.extraBooks().includes(I))}),[Q]),C=s.useMemo(()=>Object.values(at).flat(),[at]),b=s.useMemo(()=>{if(!d.trim())return at;const v=d.toLowerCase().trim(),I={OT:[],NT:[],DC:[],Extra:[]};return["OT","NT","DC","Extra"].forEach(U=>{I[U]=at[U].filter($=>rt[$].toLowerCase().includes(v)||$.toLowerCase().includes(v))}),I},[at,d]),N=s.useMemo(()=>Ha(d,C),[d,C]),E=s.useCallback(()=>{N&&(n({book:N.book,chapterNum:N.chapterNum??1,verseNum:N.verseNum??1}),i(!1),u(""),p(""))},[n,N]),H=s.useCallback(v=>{if(dt(v)<=1){n({book:v,chapterNum:1,verseNum:1}),i(!1),u("");return}g(v),m("chapters")},[n]),zt=s.useCallback(v=>{const I=h==="chapters"?f:N==null?void 0:N.book;I&&(n({book:I,chapterNum:v,verseNum:1}),i(!1),m("books"),g(void 0),u(""))},[n,h,f,N]),Ht=Ka(t,C,o,n),it=s.useCallback(()=>{m("books"),g(void 0),setTimeout(()=>{y.current&&y.current.focus()},0)},[]),tt=s.useCallback(v=>{if(!v&&h==="chapters"){it();return}i(v),v&&(m("books"),g(void 0),u(""))},[h,it]),pe=s.useCallback(v=>N?!!N.chapterNum&&!v.toString().includes(N.chapterNum.toString()):!1,[N]),T=s.useMemo(()=>j.formatScrRef(t,"English"),[t]),X=s.useCallback(v=>I=>{K.current[v]=I},[]),wt=s.useCallback(v=>{(v.key==="Home"||v.key==="End")&&v.stopPropagation()},[]),pt=s.useCallback(v=>{if(v.ctrlKey)return;const I=/^[a-zA-Z]$/.test(v.key),G=/^[0-9]$/.test(v.key);if(h==="chapters"){if(v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),it();return}if(I||G){if(v.preventDefault(),v.stopPropagation(),m("books"),g(void 0),G&&f){const U=rt[f];u(`${U} ${v.key}`)}else u(v.key);setTimeout(()=>{y.current&&y.current.focus()},0);return}}if((h==="chapters"||h==="books"&&N)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key)){const U=h==="chapters"?f:N==null?void 0:N.book;if(!U)return;const $=(()=>{if(!l)return 1;const Kt=l.match(/(\d+)$/);return Kt?parseInt(Kt[1],10):0})(),bt=dt(U);if(!bt)return;let ut=$;const un=6;switch(v.key){case"ArrowLeft":$!==0&&(ut=$>1?$-1:bt);break;case"ArrowRight":$!==0&&(ut=$<bt?$+1:1);break;case"ArrowUp":ut=$===0?bt:Math.max(1,$-un);break;case"ArrowDown":ut=$===0?1:Math.min(bt,$+un);break;default:return}ut!==$&&(v.preventDefault(),v.stopPropagation(),p(fn(U,ut)),setTimeout(()=>{const Kt=K.current[ut];Kt&&Kt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[h,N,it,f,l]),gt=s.useCallback(v=>{if(v.shiftKey||v.key==="Tab"||v.key===" ")return;const I=/^[a-zA-Z]$/.test(v.key),G=/^[0-9]$/.test(v.key);(I||G)&&(v.preventDefault(),u(U=>U+v.key),y.current.focus(),k(!1))},[]);return s.useLayoutEffect(()=>{const v=setTimeout(()=>{if(w&&h==="books"&&D.current&&O.current){const I=D.current,G=O.current,U=G.offsetTop,$=I.clientHeight,bt=G.clientHeight,ut=U-$/2+bt/2;I.scrollTo({top:Math.max(0,ut),behavior:"smooth"}),p(fn(t.book))}},0);return()=>{clearTimeout(v)}},[w,h,d,N,t.book]),s.useLayoutEffect(()=>{if(h==="chapters"&&f){const v=f===t.book;setTimeout(()=>{if(D.current)if(v){const I=K.current[t.chapterNum];I&&I.scrollIntoView({block:"center",behavior:"smooth"})}else D.current.scrollTo({top:0});S.current&&S.current.focus()},0)}},[h,f,N,t.book,t.chapterNum]),e.jsxs(Lt,{open:w,onOpenChange:tt,children:[e.jsx(Xt,{asChild:!0,children:e.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":w,className:c("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:e.jsx("span",{className:"tw-truncate",children:T})})}),e.jsx(Vt,{forceMount:!0,className:"tw-z-[250] tw-w-[280px] tw-p-0",align:"center",children:e.jsxs(At,{ref:S,onKeyDown:pt,loop:!0,value:l,onValueChange:p,shouldFilter:!1,children:[h==="books"?e.jsxs("div",{className:"tw-flex tw-items-end",children:[e.jsx(Ft,{ref:y,value:d,onValueChange:u,onKeyDown:wt,onFocus:()=>k(!1)}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:Ht.map(({onClick:v,disabled:I,title:G,icon:U})=>e.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{k(!0),v()},disabled:I,className:"tw-h-10 tw-w-4 tw-p-0",title:G,onKeyDown:gt,children:e.jsx(U,{})},G))})]}):e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[e.jsx(V,{variant:"ghost",size:"sm",onClick:it,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:o==="ltr"?e.jsx(x.ArrowLeft,{className:"tw-h-4 tw-w-4"}):e.jsx(x.ArrowRight,{className:"tw-h-4 tw-w-4"})}),e.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:rt[f||""]||""})]}),!_&&e.jsxs(Gt,{ref:D,children:[h==="books"&&e.jsxs(e.Fragment,{children:[!N&&Object.entries(b).map(([v,I])=>{if(I.length!==0)return e.jsx(Tt,{heading:$a[v],children:I.map(G=>e.jsx("div",{className:c("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":v.toLowerCase()==="ot","tw-border-s-purple-200":v.toLowerCase()==="nt","tw-border-s-indigo-200":v.toLowerCase()==="dc","tw-border-s-amber-200":v.toLowerCase()==="extra"}),children:e.jsx(yt,{value:`${G} ${rt[G]}`,onSelect:()=>H(G),ref:G===t.book?O:void 0,className:"tw-ms-1 tw-px-2",children:rt[G]})},G))},v)}),N&&e.jsx(Tt,{children:e.jsx(yt,{value:`${N.book} ${rt[N.book]} ${N.chapterNum||""}:${N.verseNum||""})}`,onSelect:E,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:N.book,chapterNum:N.chapterNum??1,verseNum:N.verseNum??1})},"top-match")}),N&&dt(N.book)>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:rt[N.book]}),e.jsx(gn,{bookId:N.book,scrRef:t,onChapterSelect:zt,setChapterRef:X,isChapterDimmed:pe,className:"tw-px-4 tw-pb-4"})]})]}),h==="chapters"&&f&&e.jsx(gn,{bookId:f,scrRef:t,onChapterSelect:zt,setChapterRef:X,className:"tw-p-4"})]})]})})]})}const Ua=jt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),F=s.forwardRef(({className:t,...n},r)=>e.jsx(jn.Root,{ref:r,className:c("pr-twp",Ua(),t),...n}));F.displayName=jn.Root.displayName;const xe=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(Qt.Root,{className:c("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:a})});xe.displayName=Qt.Root.displayName;const te=s.forwardRef(({className:t,...n},r)=>e.jsx(Qt.Item,{ref:r,className:c("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Qt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));te.displayName=Qt.Item.displayName;function Ja(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function ue({id:t,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:w,onChange:i=()=>{},getOptionLabel:l=Ja,icon:p=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:f="start",isDisabled:g=!1,..._}){const[k,S]=s.useState(!1);return e.jsxs(Lt,{open:k,onOpenChange:S,..._,children:[e.jsx(Xt,{asChild:!0,children:e.jsxs(V,{variant:m,role:"combobox","aria-expanded":k,id:t,className:c("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:g,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&e.jsx("div",{className:"tw-pe-2",children:p}),e.jsx("span",{className:c("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:w?l(w):d})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Vt,{align:f,className:c("tw-w-[200px] tw-p-0",o),children:e.jsxs(At,{children:[e.jsx(Ft,{placeholder:u,className:"tw-text-inherit"}),e.jsx(ae,{children:h}),e.jsx(Gt,{children:n.map(y=>e.jsxs(yt,{value:l(y),onSelect:()=>{i(y),S(!1)},children:[e.jsx(x.Check,{className:c("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!w||l(w)!==l(y)})}),l(y)]},l(y)))})]})})]})}function Pn({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:w}){const i=s.useMemo(()=>Array.from({length:w},(d,u)=>u+1),[w]),l=d=>{r(d),d>n&&a(d)},p=d=>{a(d),d<t&&r(d)};return e.jsxs(e.Fragment,{children:[e.jsx(F,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(ue,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"start chapter"),e.jsx(F,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(ue,{isDisabled:o,onChange:p,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:n},"end chapter")]})}var Bn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Bn||{});const Wa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),De=(t,n)=>t[n]??n;function Za({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:w,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:p,localizedStrings:d}){const u=De(d,"%webView_bookSelector_currentBook%"),h=De(d,"%webView_bookSelector_choose%"),m=De(d,"%webView_bookSelector_chooseBooks%"),[f,g]=s.useState("current book"),_=k=>{g(k),t(k)};return e.jsx(xe,{className:"pr-twp tw-flex",value:f,onValueChange:k=>_(k),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(te,{value:"current book"}),e.jsx(F,{className:"tw-ms-1",children:u})]}),e.jsx(F,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(Pn,{isDisabled:f==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:w})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(te,{value:"choose books"}),e.jsx(F,{className:"tw-ms-1",children:m})]}),e.jsx(F,{className:"tw-flex tw-items-center",children:a.map(k=>z.bookIdToEnglishName(k)).join(", ")}),e.jsx(V,{disabled:f==="current book",onClick:()=>r(),children:h})]})]})})}const $e=s.createContext(void 0);function st(){const t=s.useContext($e);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ft=jt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),qe=P.Trigger,He=P.Group,An=P.Portal,Fn=P.Sub,Gn=P.RadioGroup;function ve({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx($e.Provider,{value:r,children:e.jsx(P.Root,{...n})})}const Ke=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const w=st();return e.jsxs(P.SubTrigger,{ref:o,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,ft({variant:w.variant})),...a,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ke.displayName=P.SubTrigger.displayName;const Ye=s.forwardRef(({className:t,...n},r)=>e.jsx(P.SubContent,{ref:r,className:c("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Ye.displayName=P.SubContent.displayName;const oe=s.forwardRef(({className:t,sideOffset:n=4,children:r,...a},o)=>{const w=L();return e.jsx(P.Portal,{children:e.jsx(P.Content,{ref:o,sideOffset:n,className:c("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...a,children:e.jsx("div",{dir:w,children:r})})})});oe.displayName=P.Content.displayName;const Ue=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=L(),w=st();return e.jsx(P.Item,{ref:a,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,ft({variant:w.variant})),...r,dir:o})});Ue.displayName=P.Item.displayName;const ye=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const w=st();return e.jsxs(P.CheckboxItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ft({variant:w.variant})),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(P.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});ye.displayName=P.CheckboxItem.displayName;const Je=s.forwardRef(({className:t,children:n,...r},a)=>{const o=st();return e.jsxs(P.RadioItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ft({variant:o.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(P.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Je.displayName=P.RadioItem.displayName;const Ne=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(P.Label,{ref:a,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Ne.displayName=P.Label.displayName;const se=s.forwardRef(({className:t,...n},r)=>e.jsx(P.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));se.displayName=P.Separator.displayName;function Ln({className:t,...n}){return e.jsx("span",{className:c("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}Ln.displayName="DropdownMenuShortcut";function Qa({table:t}){return e.jsxs(ve,{children:[e.jsx(Nn.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(oe,{align:"end",className:"tw-w-[150px]",children:[e.jsx(Ne,{children:"Toggle columns"}),e.jsx(se,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(ye,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const Et=A.Root,Xn=A.Group,Dt=A.Value,$n=jt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Nt=s.forwardRef(({className:t,children:n,size:r,...a},o)=>{const w=L();return e.jsxs(A.Trigger,{className:c($n({size:r,className:t})),ref:o,...a,dir:w,children:[n,e.jsx(A.Icon,{asChild:!0,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Nt.displayName=A.Trigger.displayName;const We=s.forwardRef(({className:t,...n},r)=>e.jsx(A.ScrollUpButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));We.displayName=A.ScrollUpButton.displayName;const Ze=s.forwardRef(({className:t,...n},r)=>e.jsx(A.ScrollDownButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Ze.displayName=A.ScrollDownButton.displayName;const kt=s.forwardRef(({className:t,children:n,position:r="popper",...a},o)=>{const w=L();return e.jsx(A.Portal,{children:e.jsxs(A.Content,{ref:o,className:c("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...a,children:[e.jsx(We,{}),e.jsx(A.Viewport,{className:c("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:w,children:n})}),e.jsx(Ze,{})]})})});kt.displayName=A.Content.displayName;const qn=s.forwardRef(({className:t,...n},r)=>e.jsx(A.Label,{ref:r,className:c("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));qn.displayName=A.Label.displayName;const nt=s.forwardRef(({className:t,children:n,...r},a)=>e.jsxs(A.Item,{ref:a,className:c("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(A.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(A.ItemText,{children:n})]}));nt.displayName=A.Item.displayName;const Hn=s.forwardRef(({className:t,...n},r)=>e.jsx(A.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Hn.displayName=A.Separator.displayName;function to({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(Et,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(Nt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(Dt,{placeholder:t.getState().pagination.pageSize})}),e.jsx(kt,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(nt,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const bn=`
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
`;function eo(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function ee(t,n){const r=n?`${bn}, ${n}`:bn;return Array.from(t.querySelectorAll(r)).filter(a=>!a.hasAttribute("disabled")&&!a.getAttribute("aria-hidden")&&eo(a))}const ie=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>{const o=s.useRef(null);s.useEffect(()=>{typeof a=="function"?a(o.current):a&&"current"in a&&(a.current=o.current)},[a]),s.useEffect(()=>{const i=o.current;if(!i)return;const l=()=>{requestAnimationFrame(()=>{ee(i,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const p=new MutationObserver(()=>{l()});return p.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{p.disconnect()}},[]);const w=i=>{const{current:l}=o;if(l){if(i.key==="ArrowDown"){i.preventDefault(),ee(l)[0].focus();return}i.key===" "&&document.activeElement===l&&i.preventDefault()}};return e.jsx("div",{className:c("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:w,ref:o,className:c("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});ie.displayName="Table";const we=s.forwardRef(({className:t,stickyHeader:n,...r},a)=>e.jsx("thead",{ref:a,className:c({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));we.displayName="TableHeader";const le=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:c("[&_tr:last-child]:tw-border-0",t),...n}));le.displayName="TableBody";const Kn=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:c("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));Kn.displayName="TableFooter";function no(t){s.useEffect(()=>{const n=t.current;if(!n)return;const r=a=>{if(n.contains(document.activeElement)){if(a.key==="ArrowRight"||a.key==="ArrowLeft"){a.preventDefault(),a.stopPropagation();const o=t.current?ee(t.current):[],w=o.indexOf(document.activeElement),i=a.key==="ArrowRight"?w+1:w-1;i>=0&&i<o.length&&o[i].focus()}a.key==="Escape"&&(a.preventDefault(),n.focus()),(a.key==="ArrowDown"||a.key==="ArrowUp")&&a.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}function ro(t,n,r){let a;return r==="ArrowLeft"&&n>0?a=t[n-1]:r==="ArrowRight"&&n<t.length-1&&(a=t[n+1]),a?(requestAnimationFrame(()=>a.focus()),!0):!1}function ao(t,n,r){let a;return r==="ArrowDown"&&n<t.length-1?a=t[n+1]:r==="ArrowUp"&&n>0&&(a=t[n-1]),a?(requestAnimationFrame(()=>a.focus()),!0):!1}const ht=s.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:a=!1,...o},w)=>{const i=s.useRef(null);s.useEffect(()=>{typeof w=="function"?w(i.current):w&&"current"in w&&(w.current=i.current)},[w]),no(i);const l=s.useMemo(()=>i.current?ee(i.current):[],[i]),p=s.useCallback(u=>{const{current:h}=i;if(!h||!h.parentElement)return;const m=h.closest("table"),f=m?ee(m).filter(k=>k.tagName==="TR"):[],g=f.indexOf(h),_=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),ao(f,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),ro(l,_,u.key);else if(u.key==="Escape"){u.preventDefault();const k=h.closest("table");k&&k.focus()}n==null||n(u)},[i,l,n]),d=s.useCallback(u=>{a&&(r==null||r(u))},[a,r]);return e.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:p,onFocus:d,className:c("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});ht.displayName="TableRow";const Ot=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:c("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));Ot.displayName="TableHead";const Mt=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:c("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));Mt.displayName="TableCell";const Yn=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:c("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));Yn.displayName="TableCaption";function Un({columns:t,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:w=!1,onRowClickHandler:i=()=>{}}){var k;const[l,p]=s.useState([]),[d,u]=s.useState([]),[h,m]=s.useState({}),[f,g]=s.useState({}),_=Y.useReactTable({data:n,columns:t,getCoreRowModel:Y.getCoreRowModel(),...r&&{getPaginationRowModel:Y.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Y.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Y.getFilteredRowModel(),onColumnVisibilityChange:m,onRowSelectionChange:g,state:{sorting:l,columnFilters:d,columnVisibility:h,rowSelection:f}});return e.jsxs("div",{className:"pr-twp",children:[o&&e.jsx(Qa,{table:_}),e.jsxs(ie,{stickyHeader:w,children:[e.jsx(we,{stickyHeader:w,children:_.getHeaderGroups().map(S=>e.jsx(ht,{children:S.headers.map(y=>e.jsx(Ot,{children:y.isPlaceholder?void 0:Y.flexRender(y.column.columnDef.header,y.getContext())},y.id))},S.id))}),e.jsx(le,{children:(k=_.getRowModel().rows)!=null&&k.length?_.getRowModel().rows.map(S=>e.jsx(ht,{onClick:()=>i(S,_),"data-state":S.getIsSelected()&&"selected",children:S.getVisibleCells().map(y=>e.jsx(Mt,{children:Y.flexRender(y.column.columnDef.cell,y.getContext())},y.id))},S.id)):e.jsx(ht,{children:e.jsx(Mt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(V,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),e.jsx(V,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&a&&e.jsx(to,{table:_})]})}function oo({id:t,markdown:n,className:r,anchorTarget:a}){const o=s.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return e.jsx("div",{id:t,className:c("pr-twp tw-prose",r),children:e.jsx(ua,{options:o,children:n})})}const so=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),xn=(t,n)=>t[n]??n;function Jn({errorDetails:t,handleCopyNotify:n,localizedStrings:r}){const a=xn(r,"%webView_error_dump_header%"),o=xn(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:o})]}),e.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:e.jsx(x.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}function io({errorDetails:t,handleCopyNotify:n,localizedStrings:r,children:a,className:o}){return e.jsxs(Lt,{children:[e.jsx(Xt,{children:a}),e.jsx(Vt,{className:c("tw-min-w-80 tw-max-w-96",o),children:e.jsx(Jn,{errorDetails:t,handleCopyNotify:n,localizedStrings:r})})]})}var Wn=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Wn||{});function wo({id:t,label:n,groups:r}){const[a,o]=s.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[w,i]=s.useState({}),l=(d,u)=>{const h=!a[d][u];o(f=>(f[d][u]=h,{...f}));const m=r[d].items[u];m.onUpdate(m.id,h)},p=(d,u)=>{i(m=>(m[d]=u,{...m}));const h=r[d].items.find(m=>m.id===u);h?h.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return e.jsx("div",{id:t,children:e.jsxs(ve,{children:[e.jsx(qe,{asChild:!0,children:e.jsxs(V,{variant:"default",children:[e.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(oe,{children:r.map((d,u)=>e.jsxs("div",{children:[e.jsx(Ne,{children:d.label}),e.jsx(He,{children:d.itemType===0?e.jsx(e.Fragment,{children:d.items.map((h,m)=>e.jsx("div",{children:e.jsx(ye,{checked:a[u][m],onCheckedChange:()=>l(u,m),children:h.label})},h.id))}):e.jsx(Gn,{value:w[u],onValueChange:h=>p(u,h),children:d.items.map(h=>e.jsx("div",{children:e.jsx(Je,{value:h.id,children:h.label})},h.id))})}),e.jsx(se,{})]},d.label))})]})})}function lo({id:t,category:n,downloads:r,languages:a,moreInfoUrl:o,handleMoreInfoLinkClick:w,supportUrl:i,handleSupportLinkClick:l}){const p=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,h)=>u+h,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(x.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:a.slice(0,3).map(u=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),a.length>3&&e.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",a.length-3," more languages"]})]}),(o||i)&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(V,{onClick:()=>w(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",e.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(V,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",e.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function co({id:t,versionHistory:n}){const[r,a]=s.useState(!1),o=new Date;function w(l){const p=new Date(l),d=new Date(o.getTime()-p.getTime()),u=d.getUTCFullYear()-1970,h=d.getUTCMonth(),m=d.getUTCDate()-1;let f="";return u>0?f=`${u.toString()} year${u===1?"":"s"} ago`:h>0?f=`${h.toString()} month${h===1?"":"s"} ago`:m===0?f="today":f=`${m.toString()} day${m===1?"":"s"} ago`,f}const i=Object.entries(n).sort((l,p)=>p[0].localeCompare(l[0]));return e.jsxs("div",{id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(l=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:l[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",l[0]]}),e.jsx("div",{children:w(l[1].date)})]})]},l[0]))}),i.length>5&&e.jsx("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function po({id:t,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o,currentVersion:w}){const i=s.useMemo(()=>j.formatBytes(r),[r]),p=(d=>{const u=new Intl.DisplayNames(navigator.language,{type:"language"});return d.map(h=>u.of(h))})(a);return e.jsx("div",{id:t,className:"tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(o).length>0&&e.jsx(co,{versionHistory:o}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:i})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Version"}),e.jsx("span",{className:"tw-font-semibold",children:w}),e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:p.join(", ")})]})})]})]})]})})}const Zn=jt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ne=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,className:c("pr-twp",Zn({variant:n}),t),...r}));ne.displayName="Badge";function Qn({entries:t,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w="No entries found",customSelectedText:i,isDisabled:l=!1,sortSelected:p=!1,icon:d=void 0,className:u=void 0}){const[h,m]=s.useState(!1),f=s.useCallback(k=>{var y;const S=(y=t.find(D=>D.label===k))==null?void 0:y.value;S&&a(r.includes(S)?r.filter(D=>D!==S):[...r,S])},[t,r,a]),g=()=>i||o,_=s.useMemo(()=>{if(!p)return t;const k=t.filter(y=>y.starred).sort((y,D)=>y.label.localeCompare(D.label)),S=t.filter(y=>!y.starred).sort((y,D)=>{const O=r.includes(y.value),K=r.includes(D.value);return O&&!K?-1:!O&&K?1:y.label.localeCompare(D.label)});return[...k,...S]},[t,r,p]);return e.jsx("div",{className:u,children:e.jsxs(Lt,{open:h,onOpenChange:m,children:[e.jsx(Xt,{asChild:!0,children:e.jsxs(V,{variant:"ghost",role:"combobox","aria-expanded":h,className:c("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:d})}),e.jsx("div",{className:c({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:e.jsx("div",{className:"tw-font-normal",children:g()})})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Vt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(At,{children:[e.jsx(Ft,{placeholder:`Search ${o.toLowerCase()}...`}),e.jsxs(Gt,{children:[e.jsx(ae,{children:w}),e.jsx(Tt,{children:_.map(k=>{const S=n?n(k):void 0;return e.jsxs(yt,{value:k.label,onSelect:f,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(x.Check,{className:c("tw-h-4 tw-w-4",r.includes(k.value)?"tw-opacity-100":"tw-opacity-0")})}),e.jsx("div",{className:"tw-w-4",children:k.starred&&e.jsx(x.Star,{className:"tw-h-4 tw-w-4"})}),e.jsx("div",{className:"tw-flex-grow",children:k.label}),n&&e.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:S})]},k.label)})})]})]})})]})})}function uo({entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w,customSelectedText:i,isDisabled:l,sortSelected:p,icon:d,className:u,badgesPlaceholder:h}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(Qn,{entries:t,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:w,customSelectedText:i,isDisabled:l,sortSelected:p,icon:d,className:u}),r.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(m=>{var f;return e.jsxs(ne,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(g=>g!==m)),children:e.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(f=t.find(g=>g.value===m))==null?void 0:f.label]},m)})}):e.jsx(F,{children:h})]})}function mo({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],w=s.useMemo(()=>{const i=[];return t.forEach(l=>{i.some(p=>j.deepEqual(p,l))||i.push(l)}),i},[t]);return e.jsxs(ie,{stickyHeader:!0,children:[e.jsx(we,{stickyHeader:!0,children:e.jsxs(ht,{children:[e.jsx(Ot,{children:a}),e.jsx(Ot,{children:o})]})}),e.jsx(le,{children:w.length>0&&w.map(i=>e.jsxs(ht,{onClick:()=>{n(i.reference)},children:[e.jsx(Mt,{children:`${z.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),e.jsx(Mt,{children:i.text})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const ke=s.forwardRef(({className:t,...n},r)=>e.jsx(Oe.Root,{ref:r,className:c("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(Oe.Indicator,{className:c("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));ke.displayName=Oe.Root.displayName;const qt=s.forwardRef(({className:t,type:n,...r},a)=>e.jsx("input",{type:n,className:c("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:a,...r}));qt.displayName="Input";const tr=jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ho=s.forwardRef(({className:t,variant:n,size:r,...a},o)=>e.jsx(Cn.Root,{ref:o,className:c(tr({variant:n,size:r,className:t})),...a}));ho.displayName=Cn.Root.displayName;const er=s.createContext({size:"default",variant:"default"}),Qe=s.forwardRef(({className:t,variant:n,size:r,children:a,...o},w)=>{const i=L();return e.jsx(be.Root,{ref:w,className:c("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:i,children:e.jsx(er.Provider,{value:{variant:n,size:r},children:a})})});Qe.displayName=be.Root.displayName;const Wt=s.forwardRef(({className:t,children:n,variant:r,size:a,...o},w)=>{const i=s.useContext(er);return e.jsx(be.Item,{ref:w,className:c(tr({variant:i.variant||r,size:i.size||a}),t),...o,children:n})});Wt.displayName=be.Item.displayName;const je=t=>t==="asc"?e.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),fo=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(V,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,je(n.getIsSorted())]})}),go=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(V,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,je(r.getIsSorted())]})}),bo=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(V,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,je(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),Me=(t,n,r,a,o,w)=>{let i=[...r];t.forEach(p=>{n==="approved"?i.includes(p)||i.push(p):i=i.filter(d=>d!==p)}),a(i);let l=[...o];t.forEach(p=>{n==="unapproved"?l.includes(p)||l.push(p):l=l.filter(d=>d!==p)}),w(l)},xo=(t,n,r,a,o)=>({accessorKey:"status",header:({column:w})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(V,{variant:"ghost",onClick:()=>w.toggleSorting(void 0),children:[t,je(w.getIsSorted())]})}),cell:({row:w})=>{const i=w.getValue("status"),l=w.getValue("item");return e.jsxs(Qe,{value:i,variant:"outline",type:"single",children:[e.jsx(Wt,{onClick:p=>{p.stopPropagation(),Me([l],"approved",n,r,a,o)},value:"approved",children:e.jsx(x.CircleCheckIcon,{})}),e.jsx(Wt,{onClick:p=>{p.stopPropagation(),Me([l],"unapproved",n,r,a,o)},value:"unapproved",children:e.jsx(x.CircleXIcon,{})}),e.jsx(Wt,{onClick:p=>{p.stopPropagation(),Me([l],"unknown",n,r,a,o)},value:"unknown",children:e.jsx(x.CircleHelpIcon,{})})]})}}),vo=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),yo=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},No=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},nr=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",ko=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),jo=(t,n,r)=>{let a=t;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Co=(t,n,r)=>{const a=[];return t.forEach(o=>{const w=a.find(i=>j.deepEqual(i.items,j.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(w)w.count+=1,w.occurrences.push({reference:o.verseRef,text:o.verse});else{const i={items:j.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:nr(j.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(i)}}),a},mt=(t,n)=>t[n]??n;function So({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:w,scope:i,onScopeChange:l,columns:p}){const d=mt(r,"%webView_inventory_all%"),u=mt(r,"%webView_inventory_approved%"),h=mt(r,"%webView_inventory_unapproved%"),m=mt(r,"%webView_inventory_unknown%"),f=mt(r,"%webView_inventory_scope_currentBook%"),g=mt(r,"%webView_inventory_scope_chapter%"),_=mt(r,"%webView_inventory_scope_verse%"),k=mt(r,"%webView_inventory_filter_text%"),S=mt(r,"%webView_inventory_show_additional_items%"),[y,D]=s.useState(!1),[O,K]=s.useState("all"),[Q,at]=s.useState(""),[C,b]=s.useState([]),N=s.useMemo(()=>t.length===0?[]:Co(t,o,w),[t,o,w]),E=s.useMemo(()=>{if(y)return N;const T=[];return N.forEach(X=>{const wt=X.items[0],pt=T.find(gt=>gt.items[0]===wt);pt?(pt.count+=X.count,pt.occurrences=pt.occurrences.concat(X.occurrences)):T.push({items:[wt],count:X.count,occurrences:X.occurrences,status:X.status})}),T},[y,N]),H=s.useMemo(()=>jo(E,O,Q),[E,O,Q]),zt=s.useMemo(()=>{var wt,pt;if(!y)return p;const T=(wt=a==null?void 0:a.tableHeaders)==null?void 0:wt.length;if(!T)return p;const X=[];for(let gt=0;gt<T;gt++)X.push(go(((pt=a==null?void 0:a.tableHeaders)==null?void 0:pt[gt])||"Additional Item",gt+1));return[...X,...p]},[a==null?void 0:a.tableHeaders,p,y]);s.useEffect(()=>{H.length===0?b([]):H.length===1&&b(H[0].items)},[H]);const Ht=(T,X)=>{X.setRowSelection(()=>{const wt={};return wt[T.index]=!0,wt}),b(T.original.items)},it=T=>{if(T==="book"||T==="chapter"||T==="verse")l(T);else throw new Error(`Invalid scope value: ${T}`)},tt=T=>{if(T==="all"||T==="approved"||T==="unapproved"||T==="unknown")K(T);else throw new Error(`Invalid status filter value: ${T}`)},pe=s.useMemo(()=>{if(E.length===0||C.length===0)return[];const T=E.filter(X=>j.deepEqual(y?X.items:[X.items[0]],C));if(T.length>1)throw new Error("Selected item is not unique");return T.length===0?[]:T[0].occurrences},[C,y,E]);return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(Et,{onValueChange:T=>tt(T),defaultValue:O,children:[e.jsx(Nt,{className:"tw-m-1",children:e.jsx(Dt,{placeholder:"Select filter"})}),e.jsxs(kt,{children:[e.jsx(nt,{value:"all",children:d}),e.jsx(nt,{value:"approved",children:u}),e.jsx(nt,{value:"unapproved",children:h}),e.jsx(nt,{value:"unknown",children:m})]})]}),e.jsxs(Et,{onValueChange:T=>it(T),defaultValue:i,children:[e.jsx(Nt,{className:"tw-m-1",children:e.jsx(Dt,{placeholder:"Select scope"})}),e.jsxs(kt,{children:[e.jsx(nt,{value:"book",children:f}),e.jsx(nt,{value:"chapter",children:g}),e.jsx(nt,{value:"verse",children:_})]})]}),e.jsx(qt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:k,value:Q,onChange:T=>{at(T.target.value)}}),a&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(ke,{className:"tw-m-1",checked:y,onCheckedChange:T=>{D(T)}}),e.jsx(F,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??S})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Un,{columns:zt,data:H,onRowClickHandler:Ht,stickyHeader:!0})}),pe.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(mo,{occurrenceData:pe,setScriptureReference:n,localizedStrings:r})})]})}const Ce=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...a},o)=>e.jsx(Sn.Root,{ref:o,decorative:r,orientation:n,className:c("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...a}));Ce.displayName=Sn.Root.displayName;function Ae({className:t,...n}){return e.jsx("div",{className:c("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}const Se=re.Provider,_e=re.Root,Te=re.Trigger,de=s.forwardRef(({className:t,sideOffset:n=4,...r},a)=>e.jsx(re.Content,{ref:a,sideOffset:n,className:c("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));de.displayName=re.Content.displayName;const _o="16rem",To="3rem",rr=s.createContext(void 0);function ce(){const t=s.useContext(rr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const tn=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:a,style:o,children:w,side:i="primary",...l},p)=>{const[d,u]=s.useState(t),h=n??d,m=s.useCallback(D=>{const O=typeof D=="function"?D(h):D;r?r(O):u(O)},[r,h]),f=s.useCallback(()=>m(D=>!D),[m]),g=h?"expanded":"collapsed",S=L()==="ltr"?i:i==="primary"?"secondary":"primary",y=s.useMemo(()=>({state:g,open:h,setOpen:m,toggleSidebar:f,side:S}),[g,h,m,f,S]);return e.jsx(rr.Provider,{value:y,children:e.jsx(Se,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":_o,"--sidebar-width-icon":To,...o},className:c("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:p,...l,children:w})})})});tn.displayName="SidebarProvider";const en=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},w)=>{const i=ce();return n==="none"?e.jsx("div",{className:c("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:w,...o,children:a}):e.jsxs("div",{ref:w,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?n:"","data-variant":t,"data-side":i.side,children:[e.jsx("div",{className:c("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:c("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a})})]})});en.displayName="Sidebar";const ar=s.forwardRef(({className:t,onClick:n,...r},a)=>{const o=ce();return e.jsxs(V,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:c("tw-h-7 tw-w-7",t),onClick:w=>{n==null||n(w),o.toggleSidebar()},...r,children:[o.side==="primary"?e.jsx(x.PanelLeft,{}):e.jsx(x.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ar.displayName="SidebarTrigger";const or=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:a}=ce();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:c("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});or.displayName="SidebarRail";const nn=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:c("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));nn.displayName="SidebarInset";const sr=s.forwardRef(({className:t,...n},r)=>e.jsx(qt,{ref:r,"data-sidebar":"input",className:c("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));sr.displayName="SidebarInput";const ir=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));ir.displayName="SidebarHeader";const wr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));wr.displayName="SidebarFooter";const lr=s.forwardRef(({className:t,...n},r)=>e.jsx(Ce,{ref:r,"data-sidebar":"separator",className:c("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));lr.displayName="SidebarSeparator";const rn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:c("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));rn.displayName="SidebarContent";const me=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:c("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));me.displayName="SidebarGroup";const he=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Pt.Slot:"div";return e.jsx(o,{ref:a,"data-sidebar":"group-label",className:c("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});he.displayName="SidebarGroupLabel";const dr=s.forwardRef(({className:t,asChild:n=!1,...r},a)=>{const o=n?Pt.Slot:"button";return e.jsx(o,{ref:a,"data-sidebar":"group-action",className:c("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});dr.displayName="SidebarGroupAction";const fe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:c("tw-w-full tw-text-sm",t),...n}));fe.displayName="SidebarGroupContent";const an=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:c("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));an.displayName="SidebarMenu";const on=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:c("tw-group/menu-item tw-relative",t),...n}));on.displayName="SidebarMenuItem";const Ro=jt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),sn=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:w,...i},l)=>{const p=t?Pt.Slot:"button",{state:d}=ce(),u=e.jsx(p,{ref:l,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:c(Ro({variant:r,size:a}),w),...i});return o?(typeof o=="string"&&(o={children:o}),e.jsxs(_e,{children:[e.jsx(Te,{asChild:!0,children:u}),e.jsx(de,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});sn.displayName="SidebarMenuButton";const cr=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const w=n?Pt.Slot:"button";return e.jsx(w,{ref:o,"data-sidebar":"menu-action",className:c("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...a})});cr.displayName="SidebarMenuAction";const pr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:c("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));pr.displayName="SidebarMenuBadge";const ur=s.forwardRef(({className:t,showIcon:n=!1,...r},a)=>{const o=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:a,"data-sidebar":"menu-skeleton",className:c("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Ae,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Ae,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});ur.displayName="SidebarMenuSkeleton";const mr=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:c("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));mr.displayName="SidebarMenuSub";const hr=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));hr.displayName="SidebarMenuSubItem";const fr=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:a,...o},w)=>{const i=t?Pt.Slot:"a";return e.jsx(i,{ref:w,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:c("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o})});fr.displayName="SidebarMenuSubButton";function gr({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:i,buttonPlaceholderText:l,className:p}){const d=s.useCallback((m,f)=>{a(m,f)},[a]),u=s.useCallback(m=>{const f=r.find(g=>g.projectId===m);return f?f.projectName:m},[r]),h=s.useCallback(m=>!o.projectId&&m===o.label,[o]);return e.jsx(en,{id:t,collapsible:"none",variant:"inset",className:c("tw-w-96 tw-gap-2 tw-overflow-y-auto",p),children:e.jsxs(rn,{children:[e.jsxs(me,{children:[e.jsx(he,{className:"tw-text-sm",children:w}),e.jsx(fe,{children:e.jsx(an,{children:Object.entries(n).map(([m,f])=>e.jsx(on,{children:e.jsx(sn,{onClick:()=>d(m),isActive:h(m),children:e.jsx("span",{className:"tw-pl-3",children:f})})},m))})})]}),e.jsxs(me,{children:[e.jsx(he,{className:"tw-text-sm",children:i}),e.jsx(fe,{className:"tw-pl-3",children:e.jsx(ue,{buttonVariant:"ghost",buttonClassName:c("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:m=>{const f=u(m);d(f,m)},value:(o==null?void 0:o.projectId)??void 0,icon:e.jsx(x.ScrollText,{})})})]})]})})}const Re=s.forwardRef(({value:t,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:w=!1},i)=>{const l=L();return e.jsxs("div",{className:c("tw-relative",{"tw-w-full":a},o),children:[e.jsx(x.Search,{className:c("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),e.jsx(qt,{ref:i,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:p=>n(p.target.value),disabled:w}),t&&e.jsxs(V,{variant:"ghost",size:"icon",className:c("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{n("")},children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Re.displayName="SearchBar";function Eo({id:t,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:w,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Re,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(tn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(gr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:w,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),e.jsx(nn,{className:"tw-min-w-[215px]",children:a})]})]})}const xt="scrBook",Do="scrRef",_t="source",Mo="details",Vo="Scripture Reference",zo="Scripture Book",br="Type",Io="Details";function Oo(t,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:xt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Vo,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?z.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===xt?j.formatScrRef(o.start):void 0},getGroupingValue:a=>z.bookIdToNumber(a.start.book),sortingFn:(a,o)=>j.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>j.formatScrRef(a.start),id:Do,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:j.formatScrRef(o.start)},sortingFn:(a,o)=>j.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:_t,header:r?(t==null?void 0:t.typeColumnName)??br:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:Mo,header:(t==null?void 0:t.detailsColumnName)??Io,cell:a=>a.getValue(),enableGrouping:!1}]}const Po=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||j.compareScrRefs(t.start,t.end)===0?`${j.scrRefToBBBCCCVVV(t.start)}+${n}`:`${j.scrRefToBBBCCCVVV(t.start)}+${n}-${j.scrRefToBBBCCCVVV(t.end)}+${r}`},vn=t=>`${Po({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Bo({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:w,detailsColumnName:i,onRowSelected:l}){const[p,d]=s.useState([]),[u,h]=s.useState([{id:xt,desc:!1}]),[m,f]=s.useState({}),g=s.useMemo(()=>t.flatMap(C=>C.data.map(b=>({...b,source:C.source}))),[t]),_=s.useMemo(()=>Oo({scriptureReferenceColumnName:a,typeColumnName:w,detailsColumnName:i},r),[a,w,i,r]);s.useEffect(()=>{p.includes(_t)?h([{id:_t,desc:!1},{id:xt,desc:!1}]):h([{id:xt,desc:!1}])},[p]);const k=Y.useReactTable({data:g,columns:_,state:{grouping:p,sorting:u,rowSelection:m},onGroupingChange:d,onSortingChange:h,onRowSelectionChange:f,getExpandedRowModel:Y.getExpandedRowModel(),getGroupedRowModel:Y.getGroupedRowModel(),getCoreRowModel:Y.getCoreRowModel(),getSortedRowModel:Y.getSortedRowModel(),getRowId:vn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const C=k.getSelectedRowModel().rowsById,b=Object.keys(C);if(b.length===1){const N=g.find(E=>vn(E)===b[0])||void 0;N&&l(N)}}},[m,g,l,k]);const S=o??zo,y=w??br,D=[{label:"No Grouping",value:[]},{label:`Group by ${S}`,value:[xt]},{label:`Group by ${y}`,value:[_t]},{label:`Group by ${S} and ${y}`,value:[xt,_t]},{label:`Group by ${y} and ${S}`,value:[_t,xt]}],O=C=>{d(JSON.parse(C))},K=(C,b)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(b)},Q=(C,b)=>C.getIsGrouped()?"":c("banded-row",b%2===0?"even":"odd"),at=(C,b,N)=>{if(!((C==null?void 0:C.length)===0||b.depth<N.column.getGroupedIndex())){if(b.getIsGrouped())switch(b.depth){case 1:return"tw-ps-4";default:return}switch(b.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(Et,{value:JSON.stringify(p),onValueChange:C=>{O(C)},children:[e.jsx(Nt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(Dt,{})}),e.jsx(kt,{position:"item-aligned",children:e.jsx(Xn,{children:D.map(C=>e.jsx(nt,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),e.jsxs(ie,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(we,{children:k.getHeaderGroups().map(C=>e.jsx(ht,{children:C.headers.filter(b=>b.column.columnDef.header).map(b=>e.jsx(Ot,{colSpan:b.colSpan,className:"top-0 tw-sticky",children:b.isPlaceholder?void 0:e.jsxs("div",{children:[b.column.getCanGroup()?e.jsx(V,{variant:"ghost",title:`Toggle grouping by ${b.column.columnDef.header}`,onClick:b.column.getToggleGroupingHandler(),type:"button",children:b.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Y.flexRender(b.column.columnDef.header,b.getContext())]})},b.id))},C.id))}),e.jsx(le,{children:k.getRowModel().rows.map((C,b)=>{const N=L();return e.jsx(ht,{"data-state":C.getIsSelected()?"selected":"",className:c(Q(C,b)),onClick:E=>K(C,E),children:C.getVisibleCells().map(E=>{if(!(E.getIsPlaceholder()||E.column.columnDef.enableGrouping&&!E.getIsGrouped()&&(E.column.columnDef.id!==_t||!r)))return e.jsx(Mt,{className:c(E.column.columnDef.id,"tw-p-[1px]",at(p,C,E)),children:E.getIsGrouped()?e.jsxs(V,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&e.jsx(x.ChevronDown,{}),!C.getIsExpanded()&&(N==="ltr"?e.jsx(x.ChevronRight,{}):e.jsx(x.ChevronLeft,{}))," ",Y.flexRender(E.column.columnDef.cell,E.getContext())," (",C.subRows.length,")"]}):Y.flexRender(E.column.columnDef.cell,E.getContext())},E.id)})},C.id)})})]})]})}var vt=(t=>(t.OT="OT",t.NT="NT",t.DC="DC",t.Extra="Extra",t))(vt||{});const Ao=(t,n,r,a,o)=>{switch(t){case"OT":return n??"Old Testament";case"NT":return r??"New Testament";case"DC":return a??"Deuterocanon";case"Extra":return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Fo=(t,n,r,a,o)=>{switch(t){case"OT":return n??"OT";case"NT":return r??"NT";case"DC":return a??"DC";case"Extra":return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}},It=t=>{if(z.isBookOT(t))return"OT";if(z.isBookNT(t))return"NT";if(z.isBookDC(t))return"DC";if(z.isExtraMaterial(t))return"Extra";throw new Error(`Unknown section for book: ${t}`)},wn=(t,n)=>t.filter(r=>{try{return It(r)===n}catch{return!1}}),xr=(t,n,r)=>wn(t,n).every(a=>r.includes(a));function Go({bookId:t,selectedBookIds:n,toggleBook:r,lastKeyEventShiftKey:a,localizedBookNames:o}){var l,p;const w=s.useRef(!1),i=s.useRef();return e.jsxs(yt,{value:t,className:"tw-flex tw-items-center",onSelect:()=>{w.current||(r(t,a.current),a.current=!1),i.current&&clearTimeout(i.current),i.current=setTimeout(()=>{w.current=!1},100)},onMouseDown:d=>{d.preventDefault(),w.current=!0,r(t,d.shiftKey)},role:"option","aria-selected":n.includes(t),"aria-label":`${z.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,children:[e.jsx(x.Check,{className:c("tw-me-2 tw-h-4 tw-w-4",n.includes(t)?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:c("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":It(t)===vt.OT,"tw-border-s-purple-200":It(t)===vt.NT,"tw-border-s-indigo-200":It(t)===vt.DC,"tw-border-s-yellow-200":It(t)===vt.Extra}),children:o&&((l=o.get(t))==null?void 0:l.localizedName)||z.bookIdToEnglishName(t)}),e.jsx("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:o&&((p=o.get(t))==null?void 0:p.localizedId)||t.toLocaleUpperCase()})]},t)}function Lo({section:t,availableBookIds:n,selectedBookIds:r,onToggle:a,localizedStrings:o}){const w=wn(n,t).length===0,i=o["%scripture_section_ot_short%"],l=o["%scripture_section_nt_short%"],p=o["%scripture_section_dc_short%"],d=o["%scripture_section_extra_short%"];return e.jsx(V,{variant:"outline",size:"sm",onClick:()=>a(t),className:c(xr(n,t,r)&&!w&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:w,children:Fo(t,i,l,p,d)})}const yn=5,Ve=6;function Xo({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:a,localizedBookNames:o}){const w=a["%webView_book_selector_books_selected%"],i=a["%webView_book_selector_select_books%"],l=a["%webView_book_selector_search_books%"],p=a["%webView_book_selector_select_all%"],d=a["%webView_book_selector_clear_all%"],u=a["%webView_book_selector_no_book_found%"],h=a["%webView_book_selector_more%"],m=a["%scripture_section_ot_long%"],f=a["%scripture_section_nt_long%"],g=a["%scripture_section_dc_long%"],_=a["%scripture_section_extra_long%"],[k,S]=s.useState(!1),y=s.useRef(void 0),D=s.useRef(!1);if(t.length!==z.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=s.useMemo(()=>z.allBookIds.filter((b,N)=>t[N]==="1"&&!z.isObsolete(z.bookIdToNumber(b))),[t]),K=s.useCallback((b,N=!1)=>{if(!N||!y.current){r(n.includes(b)?n.filter(tt=>tt!==b):[...n,b]),y.current=b;return}const E=O.findIndex(tt=>tt===y.current),H=O.findIndex(tt=>tt===b);if(E===-1||H===-1)return;const[zt,Ht]=[Math.min(E,H),Math.max(E,H)],it=O.slice(zt,Ht+1).map(tt=>tt);r(n.includes(b)?n.filter(tt=>!it.includes(tt)):[...new Set([...n,...it])])},[n,r,O]),Q=s.useCallback(b=>{const N=wn(O,b).map(E=>E);r(xr(O,b,n)?n.filter(E=>!N.includes(E)):[...new Set([...n,...N])])},[n,r,O]),at=()=>{r(O.map(b=>b))},C=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(vt).map(b=>e.jsx(Lo,{section:b,availableBookIds:O,selectedBookIds:n,onToggle:Q,localizedStrings:a},b))}),e.jsxs(Lt,{open:k,onOpenChange:S,children:[e.jsx(Xt,{asChild:!0,children:e.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":k,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${w}: ${n.length}`:i,e.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Vt,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(At,{onKeyDown:b=>{b.key==="Enter"&&(D.current=b.shiftKey)},children:[e.jsx(Ft,{placeholder:l}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(V,{variant:"ghost",size:"sm",onClick:at,children:p}),e.jsx(V,{variant:"ghost",size:"sm",onClick:C,children:d})]}),e.jsxs(Gt,{children:[e.jsx(ae,{children:u}),Object.values(vt).map((b,N)=>{const E=O.filter(H=>It(H)===b);if(E.length!==0)return e.jsxs(s.Fragment,{children:[e.jsx(Tt,{heading:Ao(b,m,f,g,_),children:E.map(H=>e.jsx(Go,{bookId:H,selectedBookIds:n,toggleBook:K,lastKeyEventShiftKey:D,localizedBookNames:o},H))}),N<Object.values(vt).length-1&&e.jsx(Rn,{})]},b)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===Ve?Ve:yn).map(b=>{var N;return e.jsx(ne,{className:"hover:tw-bg-secondary",variant:"secondary",children:o&&((N=o.get(b))==null?void 0:N.localizedName)||z.bookIdToEnglishName(b)||b},b)}),n.length>Ve&&e.jsx(ne,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-yn} ${h}`})]})]})}const $o=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Ct=(t,n)=>t[n]??n;function qo({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:a,selectedBookIds:o,onSelectedBookIdsChange:w,localizedStrings:i,localizedBookNames:l}){const p=Ct(i,"%webView_scope_selector_selected_text%"),d=Ct(i,"%webView_scope_selector_current_verse%"),u=Ct(i,"%webView_scope_selector_current_chapter%"),h=Ct(i,"%webView_scope_selector_current_book%"),m=Ct(i,"%webView_scope_selector_choose_books%"),f=Ct(i,"%webView_scope_selector_scope%"),g=Ct(i,"%webView_scope_selector_select_books%"),_=[{value:"selectedText",label:p,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],k=n?_.filter(S=>n.includes(S.value)):_;return e.jsxs("div",{className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(F,{children:f}),e.jsx(xe,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:k.map(({value:S,label:y,id:D})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(te,{className:"tw-me-2",value:S,id:D}),e.jsx(F,{htmlFor:D,children:y})]},D))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(F,{children:g}),e.jsx(Xo,{availableBookInfo:a,selectedBookIds:o,onChangeSelectedBookIds:w,localizedStrings:i,localizedBookNames:l})]})]})}const ze={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Ho({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o="sm",className:w}){const i={...ze,...Object.fromEntries(Object.entries(a).map(([p,d])=>[p,p===d&&p in ze?ze[p]:d]))},l=L();return e.jsxs(Et,{value:`${n}`,onValueChange:p=>r(p==="undefined"?void 0:parseInt(p,10)),children:[e.jsx(Nt,{size:o,className:c("pr-twp tw-w-auto",w),children:e.jsx(Dt,{placeholder:i[j.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(kt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(p=>e.jsx(nt,{value:`${p}`,children:i[j.getLocalizeKeyForScrollGroupId(p)]},`${p}`))})]})}function Ko({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function Yo({primary:t,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),a?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):e.jsx("div",{children:r})]})}function Uo({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(Ce,{}):""]})}function vr(t,n){var r;return(r=Object.entries(t).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function ge({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:c("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const yr=(t,n,r,a)=>r?Object.entries(t).filter(([w,i])=>"column"in i&&i.column===r||w===r).sort(([,w],[,i])=>w.order-i.order).flatMap(([w])=>n.filter(l=>l.group===w).sort((l,p)=>l.order-p.order).map(l=>e.jsxs(_e,{children:[e.jsx(Te,{asChild:!0,children:"command"in l?e.jsxs(Ue,{onClick:()=>{a(l)},children:[l.iconPathBefore&&e.jsx(ge,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&e.jsx(ge,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):e.jsxs(Fn,{children:[e.jsx(Ke,{children:l.label}),e.jsx(An,{children:e.jsx(Ye,{children:yr(t,n,vr(t,l.id),a)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&e.jsx(de,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function Fe({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:a,className:o,variant:w,id:i}){return e.jsxs(ve,{variant:w,children:[e.jsx(qe,{"aria-label":r,className:o,asChild:!0,id:i,children:e.jsx(V,{variant:"ghost",size:"icon",children:a??e.jsx(x.MenuIcon,{})})}),e.jsx(oe,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,l])=>typeof l=="object").sort(([,l],[,p])=>typeof l=="boolean"||typeof p=="boolean"?0:l.order-p.order).map(([l],p,d)=>e.jsxs(s.Fragment,{children:[e.jsx(He,{children:e.jsx(Se,{children:yr(n.groups,n.items,l,t)})}),p<d.length-1&&e.jsx(se,{})]},l))})]})}function Jo({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:a,id:o,className:w,startAreaChildren:i,centerAreaChildren:l,endAreaChildren:p}){return e.jsxs("div",{className:c("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",w),id:o,children:[r&&e.jsx("div",{children:e.jsx(Fe,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:e.jsx(x.Menu,{}),className:"tw-h-8 tw-w-8"})}),i&&e.jsx("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),l&&e.jsx("div",{className:"tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),e.jsxs("div",{className:"tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&e.jsx("div",{children:e.jsx(Fe,{onSelectMenuItem:n,menuData:a,tabLabel:"View Info",icon:e.jsx(x.EllipsisVertical,{}),className:"tw-h-8"})}),p]})]})}const ln=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(Z.Root,{orientation:"vertical",ref:r,className:c("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:a})});ln.displayName=Z.List.displayName;const dn=s.forwardRef(({className:t,...n},r)=>e.jsx(Z.List,{ref:r,className:c("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));dn.displayName=Z.List.displayName;const Nr=s.forwardRef(({className:t,...n},r)=>e.jsx(Z.Trigger,{ref:r,...n,className:c("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),cn=s.forwardRef(({className:t,...n},r)=>e.jsx(Z.Content,{ref:r,className:c("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));cn.displayName=Z.Content.displayName;function Wo({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:w}){return e.jsxs("div",{className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?e.jsx("h1",{children:o}):"",e.jsx(Re,{className:w,value:n,onSearch:r,placeholder:a})]}),e.jsxs(ln,{children:[e.jsx(dn,{children:t.map(i=>e.jsx(Nr,{value:i.value,children:i.value},i.key))}),t.map(i=>e.jsx(cn,{value:i.value,children:i.content},i.key))]})]})}function Zo({...t}){return e.jsx(B.Menu,{...t})}function Qo({...t}){return e.jsx(B.Sub,{"data-slot":"menubar-sub",...t})}const kr=s.forwardRef(({className:t,variant:n="default",...r},a)=>{const o=s.useMemo(()=>({variant:n}),[n]);return e.jsx($e.Provider,{value:o,children:e.jsx(B.Root,{ref:a,className:c("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});kr.displayName=B.Root.displayName;const jr=s.forwardRef(({className:t,...n},r)=>{const a=st();return e.jsx(B.Trigger,{ref:r,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",ft({variant:a.variant,className:t})),...n})});jr.displayName=B.Trigger.displayName;const Cr=s.forwardRef(({className:t,inset:n,children:r,...a},o)=>{const w=st();return e.jsxs(B.SubTrigger,{ref:o,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",ft({variant:w.variant,className:t}),t),...a,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Cr.displayName=B.SubTrigger.displayName;const Sr=s.forwardRef(({className:t,...n},r)=>{const a=st();return e.jsx(B.SubContent,{ref:r,className:c("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},t),...n})});Sr.displayName=B.SubContent.displayName;const _r=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},w)=>{const i=st();return e.jsx(B.Portal,{children:e.jsx(B.Content,{ref:w,align:n,alignOffset:r,sideOffset:a,className:c("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...o})})});_r.displayName=B.Content.displayName;const Tr=s.forwardRef(({className:t,inset:n,...r},a)=>{const o=st();return e.jsx(B.Item,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",ft({variant:o.variant,className:t}),t),...r})});Tr.displayName=B.Item.displayName;const ts=s.forwardRef(({className:t,children:n,checked:r,...a},o)=>{const w=st();return e.jsxs(B.CheckboxItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ft({variant:w.variant,className:t}),t),checked:r,...a,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});ts.displayName=B.CheckboxItem.displayName;const es=s.forwardRef(({className:t,children:n,...r},a)=>{const o=st();return e.jsxs(B.RadioItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ft({variant:o.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(B.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});es.displayName=B.RadioItem.displayName;const ns=s.forwardRef(({className:t,inset:n,...r},a)=>e.jsx(B.Label,{ref:a,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));ns.displayName=B.Label.displayName;const Rr=s.forwardRef(({className:t,...n},r)=>e.jsx(B.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Rr.displayName=B.Separator.displayName;const Ut=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=t.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Er=(t,n,r,a)=>{if(!r)return;const o=Object.entries(t).filter(([w,i])=>"column"in i&&i.column===r||w===r).sort(([,w],[,i])=>w.order-i.order);return o.flatMap(([w],i)=>{const l=n.filter(d=>d.group===w).sort((d,u)=>d.order-u.order).map(d=>e.jsxs(_e,{children:[e.jsx(Te,{asChild:!0,children:"command"in d?e.jsxs(Tr,{onClick:()=>{a(d)},children:[d.iconPathBefore&&e.jsx(ge,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&e.jsx(ge,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):e.jsxs(Qo,{children:[e.jsx(Cr,{children:d.label}),e.jsx(Sr,{children:Er(t,n,vr(t,d.id),a)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&e.jsx(de,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),p=[...l];return l.length>0&&i<o.length-1&&p.push(e.jsx(Rr,{},`separator-${w}`)),p})};function rs({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:a}){const o=s.useRef(void 0),w=s.useRef(void 0),i=s.useRef(void 0),l=s.useRef(void 0),p=s.useRef(void 0),d=u=>{switch(u){case"platform.app":return w;case"platform.window":return i;case"platform.layout":return l;case"platform.help":return p;default:return}};if(ya.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,h)=>{var g,_,k,S;u.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(h.hotkey){case"alt":Ut(w,[m]);break;case"alt+p":(g=w.current)==null||g.focus(),Ut(w,[m,f]);break;case"alt+l":(_=i.current)==null||_.focus(),Ut(i,[m,f]);break;case"alt+n":(k=l.current)==null||k.focus(),Ut(l,[m,f]);break;case"alt+h":(S=p.current)==null||S.focus(),Ut(p,[m,f]);break}}),s.useEffect(()=>{if(!r||!o.current)return;const u=new MutationObserver(f=>{f.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const _=g.target.getAttribute("data-state");r(_==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(f=>{u.observe(f,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return e.jsx(kr,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,h])=>typeof u=="boolean"||typeof h=="boolean"?0:u.order-h.order).map(([u,h])=>e.jsxs(Zo,{children:[e.jsx(jr,{ref:d(u),children:typeof h=="object"&&"label"in h&&h.label}),e.jsx(_r,{className:"tw-z-[250]",children:e.jsx(Se,{children:Er(t.groups,t.items,u,n)})})]},u))})}function as(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function os({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:a,id:o,children:w,appMenuAreaChildren:i,configAreaChildren:l,shouldUseAsAppDragArea:p,menubarVariant:d="default"}){const u=s.useRef(void 0);return e.jsx("div",{className:c("tw-border tw-px-4 tw-text-foreground",a),ref:u,style:{position:"relative"},id:o,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:p?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&e.jsx(rs,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:d})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:w}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const ss=(t,n)=>t[n]??n;function is({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:w,localizedStrings:i,className:l}){const p=ss(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=s.useState(!1),h=f=>{o&&o(f),a&&a([f,...r.filter(g=>g!==f)]),w&&r.find(g=>g===f)&&w([...r.filter(g=>g!==f)]),u(!1)},m=(f,g)=>{var k,S,y,D,O,K;const _=g!==f?((S=(k=t[f])==null?void 0:k.uiNames)==null?void 0:S[g])??((D=(y=t[f])==null?void 0:y.uiNames)==null?void 0:D.en):void 0;return _?`${(O=t[f])==null?void 0:O.autonym} (${_})`:(K=t[f])==null?void 0:K.autonym};return e.jsxs("div",{className:c("pr-twp tw-max-w-sm",l),children:[e.jsxs(Et,{name:"uiLanguage",value:n,onValueChange:h,open:d,onOpenChange:f=>u(f),children:[e.jsx(Nt,{children:e.jsx(Dt,{})}),e.jsx(kt,{className:"tw-z-[250]",children:Object.keys(t).map(f=>e.jsx(nt,{value:f,children:m(f,n)},f))})]}),n!=="en"&&e.jsxs(e.Fragment,{children:[e.jsx(F,{className:"tw-ms-3",children:p}),e.jsx("div",{className:"tw-ms-3",children:e.jsxs(F,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(f=>m(f,n)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function ws({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(F,{children:n(t)}):r?e.jsx(F,{children:r(t)}):e.jsx(F,{children:t})}function ls({id:t,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:w,createComplexLabel:i}){return e.jsx("div",{id:t,className:n,children:r.map(l=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(ke,{className:"tw-me-2 tw-align-middle",checked:a.includes(l),onCheckedChange:p=>o(l,p)}),e.jsx(ws,{item:l,createLabel:w,createComplexLabel:i})]},l))})}const Dr=s.forwardRef(({className:t,...n},r)=>e.jsx(x.LoaderCircle,{size:35,className:c("tw-animate-spin",t),...n,ref:r}));Dr.displayName="Spinner";function ds({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:w,placeholder:i,isRequired:l=!1,className:p,defaultValue:d,value:u,onChange:h,onFocus:m,onBlur:f}){return e.jsxs("div",{className:c("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[e.jsx(F,{htmlFor:t,className:c({"tw-text-red-600":r,"tw-hidden":!w}),children:`${w}${l?"*":""}`}),e.jsx(qt,{id:t,disabled:n,placeholder:i,required:l,className:c(p,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:h,onFocus:m,onBlur:f}),e.jsx("p",{className:c({"tw-hidden":!o}),children:o})]})}const cs=jt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Mr=s.forwardRef(({className:t,variant:n,...r},a)=>e.jsx("div",{ref:a,role:"alert",className:c(cs({variant:n}),t),...r}));Mr.displayName="Alert";const Vr=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:c("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Vr.displayName="AlertTitle";const zr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:c("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));zr.displayName="AlertDescription";const Ir=s.forwardRef(({className:t,...n},r)=>e.jsx(Bt.Root,{ref:r,className:c("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));Ir.displayName=Bt.Root.displayName;const Or=s.forwardRef(({className:t,...n},r)=>e.jsx(Bt.Image,{ref:r,className:c("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Or.displayName=Bt.Image.displayName;const Pr=s.forwardRef(({className:t,...n},r)=>e.jsx(Bt.Fallback,{ref:r,className:c("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));Pr.displayName=Bt.Fallback.displayName;const Br=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:c("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Br.displayName="Card";const Ar=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:c("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Ar.displayName="CardHeader";const Fr=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:c("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Fr.displayName="CardTitle";const Gr=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:c("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));Gr.displayName="CardDescription";const Lr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:c("pr-twp tw-p-6 tw-pt-0",t),...n}));Lr.displayName="CardContent";const Xr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:c("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));Xr.displayName="CardFooter";const $r=s.createContext({direction:"bottom"});function qr({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const a=s.useMemo(()=>({direction:n}),[n]);return e.jsx($r.Provider,{value:a,children:e.jsx(ot.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}qr.displayName="Drawer";const ps=ot.Drawer.Trigger,Hr=ot.Drawer.Portal,us=ot.Drawer.Close,pn=s.forwardRef(({className:t,...n},r)=>e.jsx(ot.Drawer.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));pn.displayName=ot.Drawer.Overlay.displayName;const Kr=s.forwardRef(({className:t,children:n,hideDrawerHandle:r=!1,...a},o)=>{const{direction:w="bottom"}=s.useContext($r),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(Hr,{children:[e.jsx(pn,{}),e.jsxs(ot.Drawer.Content,{ref:o,className:c("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",w==="bottom"||w==="top"?"tw-flex-col":"tw-flex-row",i[w],t),...a,children:[!r&&(w==="bottom"||w==="right")&&e.jsx("div",{className:l[w]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),!r&&(w==="top"||w==="left")&&e.jsx("div",{className:l[w]})]})]})});Kr.displayName="DrawerContent";function Yr({className:t,...n}){return e.jsx("div",{className:c("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}Yr.displayName="DrawerHeader";function Ur({className:t,...n}){return e.jsx("div",{className:c("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}Ur.displayName="DrawerFooter";const Jr=s.forwardRef(({className:t,...n},r)=>e.jsx(ot.Drawer.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));Jr.displayName=ot.Drawer.Title.displayName;const Wr=s.forwardRef(({className:t,...n},r)=>e.jsx(ot.Drawer.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...n}));Wr.displayName=ot.Drawer.Description.displayName;const Zr=s.forwardRef(({className:t,value:n,...r},a)=>e.jsx(Pe.Root,{ref:a,className:c("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(Pe.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));Zr.displayName=Pe.Root.displayName;function ms({...t}){return e.jsx(kn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Qr=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsxs(Jt.Root,{ref:r,className:c("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:a,children:[e.jsx(Jt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(Jt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(Jt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Qr.displayName=Jt.Root.displayName;const ta=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(Be.Root,{className:c("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(Be.Thumb,{className:c("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})})})});ta.displayName=Be.Root.displayName;const hs=Z.Root,ea=s.forwardRef(({className:t,...n},r)=>{const a=L();return e.jsx(Z.List,{ref:r,className:c("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:a})});ea.displayName=Z.List.displayName;const na=s.forwardRef(({className:t,...n},r)=>e.jsx(Z.Trigger,{ref:r,className:c("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));na.displayName=Z.Trigger.displayName;const ra=s.forwardRef(({className:t,...n},r)=>e.jsx(Z.Content,{ref:r,className:c("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));ra.displayName=Z.Content.displayName;const aa=s.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:c("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));aa.displayName="Textarea";const fs=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function gs(t){return{preserveValue:!0,...t}}const oa=(t,n,r={})=>{const a=s.useRef(n);a.current=n;const o=s.useRef(r);o.current=gs(o.current);const[w,i]=s.useState(()=>a.current),[l,p]=s.useState(!0);return s.useEffect(()=>{let d=!0;return p(!!t),(async()=>{if(t){const u=await t();d&&(i(()=>u),p(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>a.current)}},[t]),[w,l]},Ie=()=>!1,bs=(t,n)=>{const[r]=oa(s.useCallback(async()=>{if(!t)return Ie;const a=await Promise.resolve(t(n));return async()=>a()},[n,t]),Ie,{preserveValue:!1});s.useEffect(()=>()=>{r!==Ie&&r()},[r])},xs=({options:t,onFocusChange:n,onOptionSelect:r,onCharacterPress:a})=>{const o=s.useRef(null),[w,i]=s.useState(void 0),[l,p]=s.useState(void 0),d=s.useCallback(m=>{i(m);const f=t.find(_=>_.id===m);f&&(n==null||n(f));const g=document.getElementById(m);g&&(g.scrollIntoView({block:"center"}),g.focus()),o.current&&o.current.setAttribute("aria-activedescendant",m)},[n,t]),u=s.useCallback(m=>{const f=t.find(g=>g.id===m);f&&(p(g=>g===m?void 0:m),r==null||r(f))},[r,t]),h=s.useCallback(m=>{const f=t.findIndex(k=>k.id===w);let g=f;switch(m.key){case"ArrowDown":g=Math.min(f+1,t.length-1),m.preventDefault();break;case"ArrowUp":g=Math.max(f-1,0),m.preventDefault();break;case"Home":g=0,m.preventDefault();break;case"End":g=t.length-1,m.preventDefault();break;case" ":case"Enter":w&&u(w),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(a==null||a(m.key),m.preventDefault());return}const _=t[g];_&&d(_.id)},[t,d,w,u,a]);return{listboxRef:o,activeId:w,selectedId:l,handleKeyDown:h,focusOption:d}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>kn.toast});exports.Alert=Mr;exports.AlertDescription=zr;exports.AlertTitle=Vr;exports.Avatar=Ir;exports.AvatarFallback=Pr;exports.AvatarImage=Or;exports.BOOK_SELECTOR_STRING_KEYS=Wa;exports.Badge=ne;exports.BookChapterControl=Ya;exports.BookSelectionMode=Bn;exports.BookSelector=Za;exports.Button=V;exports.Card=Br;exports.CardContent=Lr;exports.CardDescription=Gr;exports.CardFooter=Xr;exports.CardHeader=Ar;exports.CardTitle=Fr;exports.ChapterRangeSelector=Pn;exports.Checkbox=ke;exports.Checklist=ls;exports.ComboBox=ue;exports.Command=At;exports.CommandEmpty=ae;exports.CommandGroup=Tt;exports.CommandInput=Ft;exports.CommandItem=yt;exports.CommandList=Gt;exports.DataTable=Un;exports.Drawer=qr;exports.DrawerClose=us;exports.DrawerContent=Kr;exports.DrawerDescription=Wr;exports.DrawerFooter=Ur;exports.DrawerHeader=Yr;exports.DrawerOverlay=pn;exports.DrawerPortal=Hr;exports.DrawerTitle=Jr;exports.DrawerTrigger=ps;exports.DropdownMenu=ve;exports.DropdownMenuCheckboxItem=ye;exports.DropdownMenuContent=oe;exports.DropdownMenuGroup=He;exports.DropdownMenuItem=Ue;exports.DropdownMenuItemType=Wn;exports.DropdownMenuLabel=Ne;exports.DropdownMenuPortal=An;exports.DropdownMenuRadioGroup=Gn;exports.DropdownMenuRadioItem=Je;exports.DropdownMenuSeparator=se;exports.DropdownMenuShortcut=Ln;exports.DropdownMenuSub=Fn;exports.DropdownMenuSubContent=Ye;exports.DropdownMenuSubTrigger=Ke;exports.DropdownMenuTrigger=qe;exports.ERROR_DUMP_STRING_KEYS=so;exports.ErrorDump=Jn;exports.ErrorPopover=io;exports.Filter=uo;exports.FilterDropdown=wo;exports.Footer=po;exports.INVENTORY_STRING_KEYS=ko;exports.Input=qt;exports.Inventory=So;exports.Label=F;exports.MarkdownRenderer=oo;exports.MoreInfo=lo;exports.MultiSelectComboBox=Qn;exports.NavigationContentSearch=Wo;exports.Popover=Lt;exports.PopoverContent=Vt;exports.PopoverTrigger=Xt;exports.Progress=Zr;exports.RadioGroup=xe;exports.RadioGroupItem=te;exports.SCOPE_SELECTOR_STRING_KEYS=$o;exports.ScopeSelector=qo;exports.ScriptureResultsViewer=Bo;exports.ScrollGroupSelector=Ho;exports.SearchBar=Re;exports.Select=Et;exports.SelectContent=kt;exports.SelectGroup=Xn;exports.SelectItem=nt;exports.SelectLabel=qn;exports.SelectScrollDownButton=Ze;exports.SelectScrollUpButton=We;exports.SelectSeparator=Hn;exports.SelectTrigger=Nt;exports.SelectValue=Dt;exports.Separator=Ce;exports.SettingsList=Ko;exports.SettingsListHeader=Uo;exports.SettingsListItem=Yo;exports.SettingsSidebar=gr;exports.SettingsSidebarContentSearch=Eo;exports.Sidebar=en;exports.SidebarContent=rn;exports.SidebarFooter=wr;exports.SidebarGroup=me;exports.SidebarGroupAction=dr;exports.SidebarGroupContent=fe;exports.SidebarGroupLabel=he;exports.SidebarHeader=ir;exports.SidebarInput=sr;exports.SidebarInset=nn;exports.SidebarMenu=an;exports.SidebarMenuAction=cr;exports.SidebarMenuBadge=pr;exports.SidebarMenuButton=sn;exports.SidebarMenuItem=on;exports.SidebarMenuSkeleton=ur;exports.SidebarMenuSub=mr;exports.SidebarMenuSubButton=fr;exports.SidebarMenuSubItem=hr;exports.SidebarProvider=tn;exports.SidebarRail=or;exports.SidebarSeparator=lr;exports.SidebarTrigger=ar;exports.Skeleton=Ae;exports.Slider=Qr;exports.Sonner=ms;exports.Spinner=Dr;exports.Switch=ta;exports.TabDropdownMenu=Fe;exports.TabToolbar=Jo;exports.Table=ie;exports.TableBody=le;exports.TableCaption=Yn;exports.TableCell=Mt;exports.TableFooter=Kn;exports.TableHead=Ot;exports.TableHeader=we;exports.TableRow=ht;exports.Tabs=hs;exports.TabsContent=ra;exports.TabsList=ea;exports.TabsTrigger=na;exports.TextField=ds;exports.Textarea=aa;exports.ToggleGroup=Qe;exports.ToggleGroupItem=Wt;exports.Toolbar=os;exports.Tooltip=_e;exports.TooltipContent=de;exports.TooltipProvider=Se;exports.TooltipTrigger=Te;exports.UiLanguageSelector=is;exports.VerticalTabs=ln;exports.VerticalTabsContent=cn;exports.VerticalTabsList=dn;exports.VerticalTabsTrigger=Nr;exports.badgeVariants=Zn;exports.buttonVariants=_n;exports.cn=c;exports.getBookIdFromUSFM=No;exports.getLinesFromUSFM=vo;exports.getNumberFromUSFM=yo;exports.getStatusForItem=nr;exports.getToolbarOSReservedSpaceClassName=as;exports.inventoryCountColumn=bo;exports.inventoryItemColumn=fo;exports.inventoryStatusColumn=xo;exports.selectTriggerVariants=$n;exports.useEvent=fs;exports.useEventAsync=bs;exports.useListbox=xs;exports.usePromise=oa;exports.useSidebar=ce;function vs(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}vs(`.banded-row:hover {
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
.tw-w-\\[280px\\] {
  width: 280px;
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
.tw-min-w-16 {
  min-width: 4rem;
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
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
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
.tw-items-end {
  align-items: flex-end;
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
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.tw-rounded-xl {
  border-radius: 0.75rem;
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
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
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
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
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
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
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
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
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
