"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),s=require("react"),Bt=require("@radix-ui/react-slot"),Ct=require("class-variance-authority"),vo=require("clsx"),yo=require("tailwind-merge"),Z=require("cmdk"),b=require("lucide-react"),No=require("@radix-ui/react-dialog"),jo=require("@radix-ui/react-popover"),k=require("platform-bible-utils"),ko=require("@radix-ui/react-label"),Co=require("@radix-ui/react-radio-group"),Y=require("@tanstack/react-table"),kn=require("@radix-ui/react-dropdown-menu"),So=require("@radix-ui/react-select"),_o=require("markdown-to-jsx"),To=require("@radix-ui/react-checkbox"),Ro=require("@radix-ui/react-toggle-group"),Mo=require("@radix-ui/react-toggle"),Eo=require("@radix-ui/react-separator"),Do=require("@radix-ui/react-tooltip"),Vo=require("@radix-ui/react-tabs"),Io=require("@radix-ui/react-menubar"),zo=require("react-hotkeys-hook"),Oo=require("@radix-ui/react-avatar"),Po=require("@radix-ui/react-context-menu"),st=require("vaul"),Bo=require("@radix-ui/react-progress"),Cn=require("sonner"),Ao=require("@radix-ui/react-slider"),Go=require("@radix-ui/react-switch");function $(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const pt=$(No),Qt=$(jo),Sn=$(ko),te=$(Co),P=$(kn),G=$(So),Be=$(To),ve=$(Ro),_n=$(Mo),Tn=$(Eo),oe=$(Do),Q=$(Vo),B=$(Io),At=$(Oo),A=$(Po),Ae=$(Bo),Wt=$(Ao),Ge=$(Go),Fo=yo.extendTailwindMerge({prefix:"tw-"});function d(...t){return Fo(vo.clsx(t))}const Rn=Ct.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=s.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...a},w)=>{const i=o?Bt.Slot:"button";return n.jsx(i,{className:d(Rn({variant:e,size:r,className:t})),ref:w,...a})});V.displayName="Button";const Lo="layoutDirection";function X(){const t=localStorage.getItem(Lo);return t==="rtl"?t:"ltr"}const $o=pt.Portal,Mn=s.forwardRef(({className:t,...e},r)=>n.jsx(pt.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Mn.displayName=pt.Overlay.displayName;const Xo=s.forwardRef(({className:t,children:e,...r},o)=>{const a=X();return n.jsxs($o,{children:[n.jsx(Mn,{}),n.jsxs(pt.Content,{ref:o,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[e,n.jsxs(pt.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(b.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Xo.displayName=pt.Content.displayName;const qo=s.forwardRef(({className:t,...e},r)=>n.jsx(pt.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));qo.displayName=pt.Title.displayName;const Ho=s.forwardRef(({className:t,...e},r)=>n.jsx(pt.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));Ho.displayName=pt.Description.displayName;const Gt=s.forwardRef(({className:t,...e},r)=>n.jsx(Z.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Gt.displayName=Z.Command.displayName;const Ft=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(b.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Z.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Ft.displayName=Z.Command.Input.displayName;const Lt=s.forwardRef(({className:t,...e},r)=>n.jsx(Z.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Lt.displayName=Z.Command.List.displayName;const ae=s.forwardRef((t,e)=>n.jsx(Z.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ae.displayName=Z.Command.Empty.displayName;const Rt=s.forwardRef(({className:t,...e},r)=>n.jsx(Z.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Rt.displayName=Z.Command.Group.displayName;const En=s.forwardRef(({className:t,...e},r)=>n.jsx(Z.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...e}));En.displayName=Z.Command.Separator.displayName;const Nt=s.forwardRef(({className:t,...e},r)=>n.jsx(Z.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Nt.displayName=Z.Command.Item.displayName;const $t=Qt.Root,Xt=Qt.Trigger,It=s.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},a)=>{const w=X();return n.jsx(Qt.Portal,{children:n.jsx(Qt.Content,{ref:a,align:e,sideOffset:r,className:d("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:w})})});It.displayName=Qt.Content.displayName;var Ko=Object.defineProperty,Uo=(t,e,r)=>e in t?Ko(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,R=(t,e,r)=>Uo(t,typeof e!="symbol"?e+"":e,r);const Mt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Le=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Dn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],hn=oa();function qt(t,e=!0){return e&&(t=t.toUpperCase()),t in hn?hn[t]:0}function $e(t){return qt(t)>0}function Yo(t){const e=typeof t=="string"?qt(t):t;return e>=40&&e<=66}function Jo(t){return(typeof t=="string"?qt(t):t)<=39}function Vn(t){return t<=66}function Wo(t){const e=typeof t=="string"?qt(t):t;return On(e)&&!Vn(e)}function*Zo(){for(let t=1;t<=Mt.length;t++)yield t}const Qo=1,In=Mt.length;function ta(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Xe(t,e="***"){const r=t-1;return r<0||r>=Mt.length?e:Mt[r]}function zn(t){return t<=0||t>In?"******":Dn[t-1]}function ea(t){return zn(qt(t))}function On(t){const e=typeof t=="number"?Xe(t):t;return $e(e)&&!Le.includes(e)}function na(t){const e=typeof t=="number"?Xe(t):t;return $e(e)&&Le.includes(e)}function ra(t){return Dn[t-1].includes("*obsolete*")}function oa(){const t={};for(let e=0;e<Mt.length;e++)t[Mt[e]]=e+1;return t}const I={allBookIds:Mt,nonCanonicalIds:Le,bookIdToNumber:qt,isBookIdValid:$e,isBookNT:Yo,isBookOT:Jo,isBookOTNT:Vn,isBookDC:Wo,allBookNumbers:Zo,firstBook:Qo,lastBook:In,extraBooks:ta,bookNumberToId:Xe,bookNumberToEnglishName:zn,bookIdToEnglishName:ea,isCanonical:On,isExtraMaterial:na,isObsolete:ra};var ct=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(ct||{});const nt=class{constructor(e){if(R(this,"name"),R(this,"fullPath"),R(this,"isPresent"),R(this,"hasVerseSegments"),R(this,"isCustomized"),R(this,"baseVersification"),R(this,"scriptureBooks"),R(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=ct[e]):(this._type=e,this.name=ct[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};R(nt,"Original",new nt(ct.Original)),R(nt,"Septuagint",new nt(ct.Septuagint)),R(nt,"Vulgate",new nt(ct.Vulgate)),R(nt,"English",new nt(ct.English)),R(nt,"RussianProtestant",new nt(ct.RussianProtestant)),R(nt,"RussianOrthodox",new nt(ct.RussianOrthodox));let _t=nt;function fn(t,e){const r=e[0];for(let o=1;o<e.length;o++)t=t.split(e[o]).join(r);return t.split(r)}var Pn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Pn||{});const W=class D{constructor(e,r,o,a){if(R(this,"firstChapter"),R(this,"lastChapter"),R(this,"lastVerse"),R(this,"hasSegmentsDefined"),R(this,"text"),R(this,"BBBCCCVVVS"),R(this,"longHashCode"),R(this,"versification"),R(this,"rtlMark","‏"),R(this,"_bookNum",0),R(this,"_chapterNum",0),R(this,"_verseNum",0),R(this,"_verse"),o==null&&a==null)if(e!=null&&typeof e=="string"){const w=e,i=r!=null&&r instanceof _t?r:void 0;this.setEmpty(i),this.parse(w)}else if(e!=null&&typeof e=="number"){const w=r!=null&&r instanceof _t?r:void 0;this.setEmpty(w),this._verseNum=e%D.chapterDigitShifter,this._chapterNum=Math.floor(e%D.bookDigitShifter/D.chapterDigitShifter),this._bookNum=Math.floor(e/D.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof D){const w=e;this._bookNum=w.bookNum,this._chapterNum=w.chapterNum,this._verseNum=w.verseNum,this._verse=w.verse,this.versification=w.versification}else{if(e==null)return;const w=e instanceof _t?e:D.defaultVersification;this.setEmpty(w)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&o!=null)if(typeof e=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(e,r,o);else if(typeof e=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=o,this.versification=a??D.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=new D(e),{success:!0,verseRef:r}}catch(o){if(o instanceof Yt)return r=new D,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(e,r,o){return e%D.bcvMaxValue*D.bookDigitShifter+(r>=0?r%D.bcvMaxValue*D.chapterDigitShifter:0)+(o>=0?o%D.bcvMaxValue:0)}static fromJSON(e){const{book:r,chapterNum:o,verseNum:a,verse:w,versificationStr:i}=e,l=w||a.toString();let p;return i&&(p=new _t(i)),r?new D(r,o.toString(),l,p):new D}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<e.length;a++){if(o=e[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>D.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(D.verseRangeSeparator)||this._verse.includes(D.verseSequenceIndicator))}get book(){return I.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=I.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:o}=D.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=D.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>I.lastBook)throw new Yt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new _t(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(D.verseRangeSeparators,D.verseSequenceIndicators)}get BBBCCC(){return D.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return D.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const w=e.split("/");if(e=w[0],w.length>1)try{const i=+w[1].trim();this.versification=new _t(ct[i])}catch{throw new Yt("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new Yt("Invalid reference : "+e);const o=r[1].split(":"),a=+o[0];if(o.length!==2||I.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!D.isVerseParseable(o[1]))throw new Yt("Invalid reference : "+e);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new D(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete r.verse,r}equals(e){return e instanceof D?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,r=D.verseRangeSeparators,o=D.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],w=fn(this._verse,o);for(const i of w.map(l=>fn(l,r))){const l=this.clone();l.verse=i[0];const p=l.verseNum;if(a.push(l),i.length>1){const c=this.clone();if(c.verse=i[1],!e)for(let u=p+1;u<c.verseNum;u++){const f=new D(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||a.push(f)}a.push(c)}}return a}validateVerse(e,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,e,r)){const w=a.internalValid;if(w!==0)return w;const i=a.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>I.lastBook?2:(I.isCanonical(this._bookNum),0)}setEmpty(e=D.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,o){this.bookNum=I.bookIdToNumber(e),this.chapter=r,this.verse=o}};R(W,"defaultVersification",_t.English),R(W,"verseRangeSeparator","-"),R(W,"verseSequenceIndicator",","),R(W,"verseRangeSeparators",[W.verseRangeSeparator]),R(W,"verseSequenceIndicators",[W.verseSequenceIndicator]),R(W,"chapterDigitShifter",1e3),R(W,"bookDigitShifter",W.chapterDigitShifter*W.chapterDigitShifter),R(W,"bcvMaxValue",W.chapterDigitShifter-1),R(W,"ValidStatusType",Pn);class Yt extends Error{}const Bn=I.allBookIds.filter(t=>!I.isObsolete(I.bookIdToNumber(t))),ot=Object.fromEntries(Bn.map(t=>[t,I.bookIdToEnglishName(t)])),aa={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon",Extra:"Extra"},De={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},sa=[De.BOOK_ONLY,De.BOOK_CHAPTER,De.BOOK_CHAPTER_VERSE];function gn(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function dt(t){return k.getChaptersForBook(I.bookIdToNumber(t))}function ia(t,e){if(!t.trim()||e.length===0)return;const r=sa.reduce((o,a)=>{if(o)return o;const w=a.exec(t.trim());if(w){const[i,l=void 0,p=void 0]=w.slice(1);let c;const u=i.toLowerCase(),f=e.filter(m=>ot[m].toLowerCase().includes(u)||m.toLowerCase().includes(u));if(f.length===1&&([c]=f),!c&&l&&I.isBookIdValid(i)){const m=i.toUpperCase();e.includes(m)&&(c=m)}if(!c&&l){const h=(g=>Object.keys(ot).find(S=>ot[S].toLowerCase()===g.toLowerCase()))(i);h&&e.includes(h)&&(c=h)}if(c){let m=l?parseInt(l,10):void 0;m&&m>dt(c)&&(m=Math.max(dt(c),1));const h=p?parseInt(p,10):void 0;return{book:c,chapterNum:m,verseNum:h}}}},void 0);if(r)return r}function bn(t,e){return`${t} ${ot[t]}${e?` ${e}`:""}`}function wa(t,e,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const p=e.indexOf(t.book);if(p>0){const c=e[p-1],u=Math.max(dt(c),1);o({book:c,chapterNum:u,verseNum:1})}}},[t,e,o]),w=s.useCallback(()=>{const p=dt(t.book);if(t.chapterNum<p)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=e.indexOf(t.book);if(c<e.length-1){const u=e[c+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),i=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?b.ChevronsLeft:b.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?b.ChevronLeft:b.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?b.ChevronRight:b.ChevronLeft},{onClick:w,disabled:e.length===0||(t.chapterNum===dt(t.book)||dt(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?b.ChevronsRight:b.ChevronsLeft}],[t,e,r,a,i,l,w])}function xn({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:w}){if(t)return n.jsx(Rt,{children:n.jsx("div",{className:d("tw-grid tw-grid-cols-6 tw-gap-1",w),children:Array.from({length:dt(t)},(i,l)=>l+1).map(i=>n.jsx(Nt,{value:`${t} ${ot[t]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:d("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(i))??!1}),children:i},i))})})}function la({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o}){const a=X(),[w,i]=s.useState(!1),[l,p]=s.useState(""),[c,u]=s.useState(""),[f,m]=s.useState("books"),[h,g]=s.useState(void 0),[S,j]=s.useState(!1),_=s.useRef(void 0),v=s.useRef(void 0),E=s.useRef(void 0),O=s.useRef(void 0),U=s.useRef({}),tt=s.useMemo(()=>o?o():Bn,[o]),at=s.useMemo(()=>({OT:tt.filter(z=>I.isBookOT(z)),NT:tt.filter(z=>I.isBookNT(z)),DC:tt.filter(z=>I.isBookDC(z)),Extra:tt.filter(z=>I.extraBooks().includes(z))}),[tt]),C=s.useMemo(()=>Object.values(at).flat(),[at]),x=s.useMemo(()=>{if(!c.trim())return at;const N=c.toLowerCase().trim(),z={OT:[],NT:[],DC:[],Extra:[]};return["OT","NT","DC","Extra"].forEach(J=>{z[J]=at[J].filter(H=>ot[H].toLowerCase().includes(N)||H.toLowerCase().includes(N))}),z},[at,c]),y=s.useMemo(()=>ia(c,C),[c,C]),M=s.useCallback(()=>{y&&(e({book:y.book,chapterNum:y.chapterNum??1,verseNum:y.verseNum??1}),i(!1),u(""),p(""))},[e,y]),K=s.useCallback(N=>{if(dt(N)<=1){e({book:N,chapterNum:1,verseNum:1}),i(!1),u("");return}g(N),m("chapters")},[e]),zt=s.useCallback(N=>{const z=f==="chapters"?h:y==null?void 0:y.book;z&&(e({book:z,chapterNum:N,verseNum:1}),i(!1),m("books"),g(void 0),u(""))},[e,f,h,y]),Kt=wa(t,C,a,e),wt=s.useCallback(()=>{m("books"),g(void 0),setTimeout(()=>{v.current&&v.current.focus()},0)},[]),et=s.useCallback(N=>{if(!N&&f==="chapters"){wt();return}i(N),N&&(m("books"),g(void 0),u(""))},[f,wt]),ue=s.useCallback(N=>y?!!y.chapterNum&&!N.toString().includes(y.chapterNum.toString()):!1,[y]),T=s.useMemo(()=>k.formatScrRef(t,"English"),[t]),q=s.useCallback(N=>z=>{U.current[N]=z},[]),lt=s.useCallback(N=>{(N.key==="Home"||N.key==="End")&&N.stopPropagation()},[]),ut=s.useCallback(N=>{if(N.ctrlKey)return;const{isLetter:z,isDigit:L}=gn(N.key);if(f==="chapters"){if(N.key==="Backspace"){N.preventDefault(),N.stopPropagation(),wt();return}if(z||L){if(N.preventDefault(),N.stopPropagation(),m("books"),g(void 0),L&&h){const J=ot[h];u(`${J} ${N.key}`)}else u(N.key);setTimeout(()=>{v.current&&v.current.focus()},0);return}}if((f==="chapters"||f==="books"&&y)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(N.key)){const J=f==="chapters"?h:y==null?void 0:y.book;if(!J)return;const H=(()=>{if(!l)return 1;const Ut=l.match(/(\d+)$/);return Ut?parseInt(Ut[1],10):0})(),xt=dt(J);if(!xt)return;let mt=H;const mn=6;switch(N.key){case"ArrowLeft":H!==0&&(mt=H>1?H-1:xt);break;case"ArrowRight":H!==0&&(mt=H<xt?H+1:1);break;case"ArrowUp":mt=H===0?xt:Math.max(1,H-mn);break;case"ArrowDown":mt=H===0?1:Math.min(xt,H+mn);break;default:return}mt!==H&&(N.preventDefault(),N.stopPropagation(),p(bn(J,mt)),setTimeout(()=>{const Ut=U.current[mt];Ut&&Ut.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[f,y,wt,h,l]),bt=s.useCallback(N=>{if(N.shiftKey||N.key==="Tab"||N.key===" ")return;const{isLetter:z,isDigit:L}=gn(N.key);(z||L)&&(N.preventDefault(),u(J=>J+N.key),v.current.focus(),j(!1))},[]);return s.useLayoutEffect(()=>{const N=setTimeout(()=>{if(w&&f==="books"&&E.current&&O.current){const z=E.current,L=O.current,J=L.offsetTop,H=z.clientHeight,xt=L.clientHeight,mt=J-H/2+xt/2;z.scrollTo({top:Math.max(0,mt),behavior:"smooth"}),p(bn(t.book))}},0);return()=>{clearTimeout(N)}},[w,f,c,y,t.book]),s.useLayoutEffect(()=>{if(f==="chapters"&&h){const N=h===t.book;setTimeout(()=>{if(E.current)if(N){const z=U.current[t.chapterNum];z&&z.scrollIntoView({block:"center",behavior:"smooth"})}else E.current.scrollTo({top:0});_.current&&_.current.focus()},0)}},[f,h,y,t.book,t.chapterNum]),n.jsxs($t,{open:w,onOpenChange:et,children:[n.jsx(Xt,{asChild:!0,children:n.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":w,className:d("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:T})})}),n.jsx(It,{forceMount:!0,className:"tw-z-[250] tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Gt,{ref:_,onKeyDown:ut,loop:!0,value:l,onValueChange:p,shouldFilter:!1,children:[f==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsx(Ft,{ref:v,value:c,onValueChange:u,onKeyDown:lt,onFocus:()=>j(!1)}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:Kt.map(({onClick:N,disabled:z,title:L,icon:J})=>n.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{j(!0),N()},disabled:z,className:"tw-h-10 tw-w-4 tw-p-0",title:L,onKeyDown:bt,children:n.jsx(J,{})},L))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:wt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:a==="ltr"?n.jsx(b.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(b.ArrowRight,{className:"tw-h-4 tw-w-4"})}),n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ot[h||""]||""})]}),!S&&n.jsxs(Lt,{ref:E,children:[f==="books"&&n.jsxs(n.Fragment,{children:[!y&&Object.entries(x).map(([N,z])=>{if(z.length!==0)return n.jsx(Rt,{heading:aa[N],children:z.map(L=>n.jsx("div",{className:d("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":N.toLowerCase()==="ot","tw-border-s-purple-200":N.toLowerCase()==="nt","tw-border-s-indigo-200":N.toLowerCase()==="dc","tw-border-s-amber-200":N.toLowerCase()==="extra"}),children:n.jsx(Nt,{value:`${L} ${ot[L]}`,onSelect:()=>K(L),ref:L===t.book?O:void 0,className:"tw-ms-1 tw-px-2",children:ot[L]})},L))},N)}),y&&n.jsx(Rt,{children:n.jsx(Nt,{value:`${y.book} ${ot[y.book]} ${y.chapterNum||""}:${y.verseNum||""})}`,onSelect:M,className:"tw-font-semibold tw-text-primary",children:k.formatScrRef({book:y.book,chapterNum:y.chapterNum??1,verseNum:y.verseNum??1})},"top-match")}),y&&dt(y.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ot[y.book]}),n.jsx(xn,{bookId:y.book,scrRef:t,onChapterSelect:zt,setChapterRef:q,isChapterDimmed:ue,className:"tw-px-4 tw-pb-4"})]})]}),f==="chapters"&&h&&n.jsx(xn,{bookId:h,scrRef:t,onChapterSelect:zt,setChapterRef:q,className:"tw-p-4"})]})]})})]})}const ca=Ct.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),F=s.forwardRef(({className:t,...e},r)=>n.jsx(Sn.Root,{ref:r,className:d("pr-twp",ca(),t),...e}));F.displayName=Sn.Root.displayName;const ye=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsx(te.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});ye.displayName=te.Root.displayName;const ee=s.forwardRef(({className:t,...e},r)=>n.jsx(te.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(te.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(b.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ee.displayName=te.Item.displayName;function da(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function me({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:a,value:w,onChange:i=()=>{},getOptionLabel:l=da,icon:p=void 0,buttonPlaceholder:c="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:m="outline",alignDropDown:h="start",isDisabled:g=!1,...S}){const[j,_]=s.useState(!1);return n.jsxs($t,{open:j,onOpenChange:_,...S,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(V,{variant:m,role:"combobox","aria-expanded":j,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:g,children:[n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-pe-2",children:p}),n.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:w?l(w):c})]}),n.jsx(b.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(It,{align:h,className:d("tw-w-[200px] tw-p-0",a),children:n.jsxs(Gt,{children:[n.jsx(Ft,{placeholder:u,className:"tw-text-inherit"}),n.jsx(ae,{children:f}),n.jsx(Lt,{children:e.map(v=>n.jsxs(Nt,{value:l(v),onSelect:()=>{i(v),_(!1)},children:[n.jsx(b.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!w||l(w)!==l(v)})}),l(v)]},l(v)))})]})})]})}function An({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:w}){const i=s.useMemo(()=>Array.from({length:w},(c,u)=>u+1),[w]),l=c=>{r(c),c>e&&o(c)},p=c=>{o(c),c<t&&r(c)};return n.jsxs(n.Fragment,{children:[n.jsx(F,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(me,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:c=>c.toString(),value:t},"start chapter"),n.jsx(F,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(me,{isDisabled:a,onChange:p,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:c=>c.toString(),value:e},"end chapter")]})}var Gn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Gn||{});const pa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Ve=(t,e)=>t[e]??e;function ua({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:w,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:p,localizedStrings:c}){const u=Ve(c,"%webView_bookSelector_currentBook%"),f=Ve(c,"%webView_bookSelector_choose%"),m=Ve(c,"%webView_bookSelector_chooseBooks%"),[h,g]=s.useState("current book"),S=j=>{g(j),t(j)};return n.jsx(ye,{className:"pr-twp tw-flex",value:h,onValueChange:j=>S(j),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{value:"current book"}),n.jsx(F,{className:"tw-ms-1",children:u})]}),n.jsx(F,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(An,{isDisabled:h==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:i,chapterCount:a,startChapter:l,endChapter:w})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{value:"choose books"}),n.jsx(F,{className:"tw-ms-1",children:m})]}),n.jsx(F,{className:"tw-flex tw-items-center",children:o.map(j=>I.bookIdToEnglishName(j)).join(", ")}),n.jsx(V,{disabled:h==="current book",onClick:()=>r(),children:f})]})]})})}const qe=s.createContext(void 0);function it(){const t=s.useContext(qe);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const gt=Ct.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),He=P.Trigger,Ke=P.Group,Fn=P.Portal,Ln=P.Sub,$n=P.RadioGroup;function Ne({variant:t="default",...e}){const r=s.useMemo(()=>({variant:t}),[t]);return n.jsx(qe.Provider,{value:r,children:n.jsx(P.Root,{...e})})}const Ue=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const w=it();return n.jsxs(P.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,gt({variant:w.variant})),...o,children:[r,n.jsx(b.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ue.displayName=P.SubTrigger.displayName;const Ye=s.forwardRef(({className:t,...e},r)=>n.jsx(P.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Ye.displayName=P.SubContent.displayName;const se=s.forwardRef(({className:t,sideOffset:e=4,children:r,...o},a)=>{const w=X();return n.jsx(P.Portal,{children:n.jsx(P.Content,{ref:a,sideOffset:e,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:w,children:r})})})});se.displayName=P.Content.displayName;const Je=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=X(),w=it();return n.jsx(P.Item,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,gt({variant:w.variant})),...r,dir:a})});Je.displayName=P.Item.displayName;const je=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const w=it();return n.jsxs(P.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,gt({variant:w.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(P.ItemIndicator,{children:n.jsx(b.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});je.displayName=P.CheckboxItem.displayName;const We=s.forwardRef(({className:t,children:e,...r},o)=>{const a=it();return n.jsxs(P.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,gt({variant:a.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(P.ItemIndicator,{children:n.jsx(b.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});We.displayName=P.RadioItem.displayName;const ke=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(P.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));ke.displayName=P.Label.displayName;const ie=s.forwardRef(({className:t,...e},r)=>n.jsx(P.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ie.displayName=P.Separator.displayName;function Xn({className:t,...e}){return n.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Xn.displayName="DropdownMenuShortcut";function ma({table:t}){return n.jsxs(Ne,{children:[n.jsx(kn.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(b.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(se,{align:"end",className:"tw-w-[150px]",children:[n.jsx(ke,{children:"Toggle columns"}),n.jsx(ie,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(je,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const Et=G.Root,qn=G.Group,Dt=G.Value,Hn=Ct.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),jt=s.forwardRef(({className:t,children:e,size:r,...o},a)=>{const w=X();return n.jsxs(G.Trigger,{className:d(Hn({size:r,className:t})),ref:a,...o,dir:w,children:[e,n.jsx(G.Icon,{asChild:!0,children:n.jsx(b.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});jt.displayName=G.Trigger.displayName;const Ze=s.forwardRef(({className:t,...e},r)=>n.jsx(G.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(b.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Ze.displayName=G.ScrollUpButton.displayName;const Qe=s.forwardRef(({className:t,...e},r)=>n.jsx(G.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(b.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Qe.displayName=G.ScrollDownButton.displayName;const kt=s.forwardRef(({className:t,children:e,position:r="popper",...o},a)=>{const w=X();return n.jsx(G.Portal,{children:n.jsxs(G.Content,{ref:a,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(Ze,{}),n.jsx(G.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:w,children:e})}),n.jsx(Qe,{})]})})});kt.displayName=G.Content.displayName;const Kn=s.forwardRef(({className:t,...e},r)=>n.jsx(G.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Kn.displayName=G.Label.displayName;const rt=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(G.Item,{ref:o,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(G.ItemIndicator,{children:n.jsx(b.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(G.ItemText,{children:e})]}));rt.displayName=G.Item.displayName;const Un=s.forwardRef(({className:t,...e},r)=>n.jsx(G.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Un.displayName=G.Separator.displayName;function ha({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(Et,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(jt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Dt,{placeholder:t.getState().pagination.pageSize})}),n.jsx(kt,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(rt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(b.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(b.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(b.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(b.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const vn=`
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
`;function fa(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function ne(t,e){const r=e?`${vn}, ${e}`:vn;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&fa(o))}const we=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const i=a.current;if(!i)return;const l=()=>{requestAnimationFrame(()=>{ne(i,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const p=new MutationObserver(()=>{l()});return p.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{p.disconnect()}},[]);const w=i=>{const{current:l}=a;if(l){if(i.key==="ArrowDown"){i.preventDefault(),ne(l)[0].focus();return}i.key===" "&&document.activeElement===l&&i.preventDefault()}};return n.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:w,ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});we.displayName="Table";const le=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:d({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));le.displayName="TableHeader";const ce=s.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...e}));ce.displayName="TableBody";const Yn=s.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Yn.displayName="TableFooter";function ga(t){s.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?ne(t.current):[],w=a.indexOf(document.activeElement),i=o.key==="ArrowRight"?w+1:w-1;i>=0&&i<a.length&&a[i].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function ba(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function xa(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const ft=s.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},w)=>{const i=s.useRef(null);s.useEffect(()=>{typeof w=="function"?w(i.current):w&&"current"in w&&(w.current=i.current)},[w]),ga(i);const l=s.useMemo(()=>i.current?ne(i.current):[],[i]),p=s.useCallback(u=>{const{current:f}=i;if(!f||!f.parentElement)return;const m=f.closest("table"),h=m?ne(m).filter(j=>j.tagName==="TR"):[],g=h.indexOf(f),S=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),xa(h,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),ba(l,S,u.key);else if(u.key==="Escape"){u.preventDefault();const j=f.closest("table");j&&j.focus()}e==null||e(u)},[i,l,e]),c=s.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:p,onFocus:c,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});ft.displayName="TableRow";const Pt=s.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Pt.displayName="TableHead";const Vt=s.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Vt.displayName="TableCell";const Jn=s.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Jn.displayName="TableCaption";function Wn({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:w=!1,onRowClickHandler:i=()=>{}}){var j;const[l,p]=s.useState([]),[c,u]=s.useState([]),[f,m]=s.useState({}),[h,g]=s.useState({}),S=Y.useReactTable({data:e,columns:t,getCoreRowModel:Y.getCoreRowModel(),...r&&{getPaginationRowModel:Y.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Y.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Y.getFilteredRowModel(),onColumnVisibilityChange:m,onRowSelectionChange:g,state:{sorting:l,columnFilters:c,columnVisibility:f,rowSelection:h}});return n.jsxs("div",{className:"pr-twp",children:[a&&n.jsx(ma,{table:S}),n.jsxs(we,{stickyHeader:w,children:[n.jsx(le,{stickyHeader:w,children:S.getHeaderGroups().map(_=>n.jsx(ft,{children:_.headers.map(v=>n.jsx(Pt,{children:v.isPlaceholder?void 0:Y.flexRender(v.column.columnDef.header,v.getContext())},v.id))},_.id))}),n.jsx(ce,{children:(j=S.getRowModel().rows)!=null&&j.length?S.getRowModel().rows.map(_=>n.jsx(ft,{onClick:()=>i(_,S),"data-state":_.getIsSelected()&&"selected",children:_.getVisibleCells().map(v=>n.jsx(Vt,{children:Y.flexRender(v.column.columnDef.cell,v.getContext())},v.id))},_.id)):n.jsx(ft,{children:n.jsx(Vt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(V,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),n.jsx(V,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(ha,{table:S})]})}function va({id:t,markdown:e,className:r,anchorTarget:o}){const a=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:n.jsx(_o,{options:a,children:e})})}const Zn=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),yn=(t,e)=>t[e]??e;function Qn({errorDetails:t,handleCopyNotify:e,localizedStrings:r}){const o=yn(r,"%webView_error_dump_header%"),a=yn(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:n.jsx(b.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const ya=Object.freeze([...Zn,"%webView_error_dump_copied_message%"]);function Na({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:a}){const[w,i]=s.useState(!1),l=()=>{i(!0),e&&e()},p=c=>{c||i(!1)};return n.jsxs($t,{onOpenChange:p,children:[n.jsx(Xt,{asChild:!0,children:o}),n.jsxs(It,{className:d("tw-min-w-80 tw-max-w-96",a),children:[w&&r["%webView_error_dump_copied_message%"]&&n.jsx(F,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Qn,{errorDetails:t,handleCopyNotify:l,localizedStrings:r})]})]})}var tr=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(tr||{});function ja({id:t,label:e,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((c,u)=>c.itemType===0?[u,[]]:void 0).filter(c=>!!c))),[w,i]=s.useState({}),l=(c,u)=>{const f=!o[c][u];a(h=>(h[c][u]=f,{...h}));const m=r[c].items[u];m.onUpdate(m.id,f)},p=(c,u)=>{i(m=>(m[c]=u,{...m}));const f=r[c].items.find(m=>m.id===u);f?f.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Ne,{children:[n.jsx(He,{asChild:!0,children:n.jsxs(V,{variant:"default",children:[n.jsx(b.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(b.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(se,{children:r.map((c,u)=>n.jsxs("div",{children:[n.jsx(ke,{children:c.label}),n.jsx(Ke,{children:c.itemType===0?n.jsx(n.Fragment,{children:c.items.map((f,m)=>n.jsx("div",{children:n.jsx(je,{checked:o[u][m],onCheckedChange:()=>l(u,m),children:f.label})},f.id))}):n.jsx($n,{value:w[u],onValueChange:f=>p(u,f),children:c.items.map(f=>n.jsx("div",{children:n.jsx(We,{value:f.id,children:f.label})},f.id))})}),n.jsx(ie,{})]},c.label))})]})})}function ka({id:t,category:e,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:w,supportUrl:i,handleSupportLinkClick:l}){const p=new k.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,f)=>u+f,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(b.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>w(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(b.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(b.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Ca({id:t,versionHistory:e}){const[r,o]=s.useState(!1),a=new Date;function w(l){const p=new Date(l),c=new Date(a.getTime()-p.getTime()),u=c.getUTCFullYear()-1970,f=c.getUTCMonth(),m=c.getUTCDate()-1;let h="";return u>0?h=`${u.toString()} year${u===1?"":"s"} ago`:f>0?h=`${f.toString()} month${f===1?"":"s"} ago`:m===0?h="today":h=`${m.toString()} day${m===1?"":"s"} ago`,h}const i=Object.entries(e).sort((l,p)=>p[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:w(l[1].date)})]})]},l[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Sa({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:a,currentVersion:w}){const i=s.useMemo(()=>k.formatBytes(r),[r]),p=(c=>{const u=new Intl.DisplayNames(k.getCurrentLocale(),{type:"language"});return c.map(f=>u.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&n.jsx(Ca,{versionHistory:a}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:w}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:p.join(", ")})]})})]})]})]})})}const er=Ct.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),re=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:d("pr-twp",er({variant:e}),t),...r}));re.displayName="Badge";function nr({entries:t,getEntriesCount:e=void 0,selected:r,onChange:o,placeholder:a,commandEmptyMessage:w="No entries found",customSelectedText:i,isDisabled:l=!1,sortSelected:p=!1,icon:c=void 0,className:u=void 0}){const[f,m]=s.useState(!1),h=s.useCallback(j=>{var v;const _=(v=t.find(E=>E.label===j))==null?void 0:v.value;_&&o(r.includes(_)?r.filter(E=>E!==_):[...r,_])},[t,r,o]),g=()=>i||a,S=s.useMemo(()=>{if(!p)return t;const j=t.filter(v=>v.starred).sort((v,E)=>v.label.localeCompare(E.label)),_=t.filter(v=>!v.starred).sort((v,E)=>{const O=r.includes(v.value),U=r.includes(E.value);return O&&!U?-1:!O&&U?1:v.label.localeCompare(E.label)});return[...j,..._]},[t,r,p]);return n.jsx("div",{className:u,children:n.jsxs($t,{open:f,onOpenChange:m,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(V,{variant:"ghost",role:"combobox","aria-expanded":f,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),n.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:n.jsx("div",{className:"tw-font-normal",children:g()})})]}),n.jsx(b.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(It,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Gt,{children:[n.jsx(Ft,{placeholder:`Search ${a.toLowerCase()}...`}),n.jsxs(Lt,{children:[n.jsx(ae,{children:w}),n.jsx(Rt,{children:S.map(j=>{const _=e?e(j):void 0;return n.jsxs(Nt,{value:j.label,onSelect:h,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(b.Check,{className:d("tw-h-4 tw-w-4",r.includes(j.value)?"tw-opacity-100":"tw-opacity-0")})}),n.jsx("div",{className:"tw-w-4",children:j.starred&&n.jsx(b.Star,{className:"tw-h-4 tw-w-4"})}),n.jsx("div",{className:"tw-flex-grow",children:j.label}),e&&n.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:_})]},j.label)})})]})]})})]})})}function _a({entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:w,customSelectedText:i,isDisabled:l,sortSelected:p,icon:c,className:u,badgesPlaceholder:f}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(nr,{entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:w,customSelectedText:i,isDisabled:l,sortSelected:p,icon:c,className:u}),r.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(m=>{var h;return n.jsxs(re,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>o(r.filter(g=>g!==m)),children:n.jsx(b.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(g=>g.value===m))==null?void 0:h.label]},m)})}):n.jsx(F,{children:f})]})}function Ta({occurrenceData:t,setScriptureReference:e,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],w=s.useMemo(()=>{const i=[];return t.forEach(l=>{i.some(p=>k.deepEqual(p,l))||i.push(l)}),i},[t]);return n.jsxs(we,{stickyHeader:!0,children:[n.jsx(le,{stickyHeader:!0,children:n.jsxs(ft,{children:[n.jsx(Pt,{children:o}),n.jsx(Pt,{children:a})]})}),n.jsx(ce,{children:w.length>0&&w.map(i=>n.jsxs(ft,{onClick:()=>{e(i.reference)},children:[n.jsx(Vt,{children:`${I.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),n.jsx(Vt,{children:i.text})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Ce=s.forwardRef(({className:t,...e},r)=>n.jsx(Be.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Be.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(b.Check,{className:"tw-h-4 tw-w-4"})})}));Ce.displayName=Be.Root.displayName;const Ht=s.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ht.displayName="Input";const rr=Ct.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ra=s.forwardRef(({className:t,variant:e,size:r,...o},a)=>n.jsx(_n.Root,{ref:a,className:d(rr({variant:e,size:r,className:t})),...o}));Ra.displayName=_n.Root.displayName;const or=s.createContext({size:"default",variant:"default"}),tn=s.forwardRef(({className:t,variant:e,size:r,children:o,...a},w)=>{const i=X();return n.jsx(ve.Root,{ref:w,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:i,children:n.jsx(or.Provider,{value:{variant:e,size:r},children:o})})});tn.displayName=ve.Root.displayName;const Zt=s.forwardRef(({className:t,children:e,variant:r,size:o,...a},w)=>{const i=s.useContext(or);return n.jsx(ve.Item,{ref:w,className:d(rr({variant:i.variant||r,size:i.size||o}),t),...a,children:e})});Zt.displayName=ve.Item.displayName;const Se=t=>t==="asc"?n.jsx(b.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(b.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(b.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ma=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(V,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Se(e.getIsSorted())]})}),Ea=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(V,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Se(r.getIsSorted())]})}),Da=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(V,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Se(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Ie=(t,e,r,o,a,w)=>{let i=[...r];t.forEach(p=>{e==="approved"?i.includes(p)||i.push(p):i=i.filter(c=>c!==p)}),o(i);let l=[...a];t.forEach(p=>{e==="unapproved"?l.includes(p)||l.push(p):l=l.filter(c=>c!==p)}),w(l)},Va=(t,e,r,o,a)=>({accessorKey:"status",header:({column:w})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(V,{variant:"ghost",onClick:()=>w.toggleSorting(void 0),children:[t,Se(w.getIsSorted())]})}),cell:({row:w})=>{const i=w.getValue("status"),l=w.getValue("item");return n.jsxs(tn,{value:i,variant:"outline",type:"single",children:[n.jsx(Zt,{onClick:p=>{p.stopPropagation(),Ie([l],"approved",e,r,o,a)},value:"approved",children:n.jsx(b.CircleCheckIcon,{})}),n.jsx(Zt,{onClick:p=>{p.stopPropagation(),Ie([l],"unapproved",e,r,o,a)},value:"unapproved",children:n.jsx(b.CircleXIcon,{})}),n.jsx(Zt,{onClick:p=>{p.stopPropagation(),Ie([l],"unknown",e,r,o,a)},value:"unknown",children:n.jsx(b.CircleHelpIcon,{})})]})}}),Ia=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),za=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Oa=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ar=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Pa=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Ba=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(a=>e==="approved"&&a.status==="approved"||e==="unapproved"&&a.status==="unapproved"||e==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},Aa=(t,e,r)=>{const o=[];return t.forEach(a=>{const w=o.find(i=>k.deepEqual(i.items,k.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(w)w.count+=1,w.occurrences.push({reference:a.verseRef,text:a.verse});else{const i={items:k.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:ar(k.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],e,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(i)}}),o},ht=(t,e)=>t[e]??e;function Ga({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:w,scope:i,onScopeChange:l,columns:p}){const c=ht(r,"%webView_inventory_all%"),u=ht(r,"%webView_inventory_approved%"),f=ht(r,"%webView_inventory_unapproved%"),m=ht(r,"%webView_inventory_unknown%"),h=ht(r,"%webView_inventory_scope_currentBook%"),g=ht(r,"%webView_inventory_scope_chapter%"),S=ht(r,"%webView_inventory_scope_verse%"),j=ht(r,"%webView_inventory_filter_text%"),_=ht(r,"%webView_inventory_show_additional_items%"),[v,E]=s.useState(!1),[O,U]=s.useState("all"),[tt,at]=s.useState(""),[C,x]=s.useState([]),y=s.useMemo(()=>t.length===0?[]:Aa(t,a,w),[t,a,w]),M=s.useMemo(()=>{if(v)return y;const T=[];return y.forEach(q=>{const lt=q.items[0],ut=T.find(bt=>bt.items[0]===lt);ut?(ut.count+=q.count,ut.occurrences=ut.occurrences.concat(q.occurrences)):T.push({items:[lt],count:q.count,occurrences:q.occurrences,status:q.status})}),T},[v,y]),K=s.useMemo(()=>Ba(M,O,tt),[M,O,tt]),zt=s.useMemo(()=>{var lt,ut;if(!v)return p;const T=(lt=o==null?void 0:o.tableHeaders)==null?void 0:lt.length;if(!T)return p;const q=[];for(let bt=0;bt<T;bt++)q.push(Ea(((ut=o==null?void 0:o.tableHeaders)==null?void 0:ut[bt])||"Additional Item",bt+1));return[...q,...p]},[o==null?void 0:o.tableHeaders,p,v]);s.useEffect(()=>{K.length===0?x([]):K.length===1&&x(K[0].items)},[K]);const Kt=(T,q)=>{q.setRowSelection(()=>{const lt={};return lt[T.index]=!0,lt}),x(T.original.items)},wt=T=>{if(T==="book"||T==="chapter"||T==="verse")l(T);else throw new Error(`Invalid scope value: ${T}`)},et=T=>{if(T==="all"||T==="approved"||T==="unapproved"||T==="unknown")U(T);else throw new Error(`Invalid status filter value: ${T}`)},ue=s.useMemo(()=>{if(M.length===0||C.length===0)return[];const T=M.filter(q=>k.deepEqual(v?q.items:[q.items[0]],C));if(T.length>1)throw new Error("Selected item is not unique");return T.length===0?[]:T[0].occurrences},[C,v,M]);return n.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(Et,{onValueChange:T=>et(T),defaultValue:O,children:[n.jsx(jt,{className:"tw-m-1",children:n.jsx(Dt,{placeholder:"Select filter"})}),n.jsxs(kt,{children:[n.jsx(rt,{value:"all",children:c}),n.jsx(rt,{value:"approved",children:u}),n.jsx(rt,{value:"unapproved",children:f}),n.jsx(rt,{value:"unknown",children:m})]})]}),n.jsxs(Et,{onValueChange:T=>wt(T),defaultValue:i,children:[n.jsx(jt,{className:"tw-m-1",children:n.jsx(Dt,{placeholder:"Select scope"})}),n.jsxs(kt,{children:[n.jsx(rt,{value:"book",children:h}),n.jsx(rt,{value:"chapter",children:g}),n.jsx(rt,{value:"verse",children:S})]})]}),n.jsx(Ht,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:j,value:tt,onChange:T=>{at(T.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(Ce,{className:"tw-m-1",checked:v,onCheckedChange:T=>{E(T)}}),n.jsx(F,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??_})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Wn,{columns:zt,data:K,onRowClickHandler:Kt,stickyHeader:!0})}),ue.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Ta,{occurrenceData:ue,setScriptureReference:e,localizedStrings:r})})]})}const _e=s.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},a)=>n.jsx(Tn.Root,{ref:a,decorative:r,orientation:e,className:d("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));_e.displayName=Tn.Root.displayName;function Fe({className:t,...e}){return n.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}const Te=oe.Provider,Re=oe.Root,Me=oe.Trigger,de=s.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(oe.Content,{ref:o,sideOffset:e,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));de.displayName=oe.Content.displayName;const Fa="16rem",La="3rem",sr=s.createContext(void 0);function pe(){const t=s.useContext(sr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const en=s.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:a,children:w,side:i="primary",...l},p)=>{const[c,u]=s.useState(t),f=e??c,m=s.useCallback(E=>{const O=typeof E=="function"?E(f):E;r?r(O):u(O)},[r,f]),h=s.useCallback(()=>m(E=>!E),[m]),g=f?"expanded":"collapsed",_=X()==="ltr"?i:i==="primary"?"secondary":"primary",v=s.useMemo(()=>({state:g,open:f,setOpen:m,toggleSidebar:h,side:_}),[g,f,m,h,_]);return n.jsx(sr.Provider,{value:v,children:n.jsx(Te,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Fa,"--sidebar-width-icon":La,...a},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:p,...l,children:w})})})});en.displayName="SidebarProvider";const nn=s.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...a},w)=>{const i=pe();return e==="none"?n.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:w,...a,children:o}):n.jsxs("div",{ref:w,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[n.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});nn.displayName="Sidebar";const ir=s.forwardRef(({className:t,onClick:e,...r},o)=>{const a=pe();return n.jsxs(V,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:w=>{e==null||e(w),a.toggleSidebar()},...r,children:[a.side==="primary"?n.jsx(b.PanelLeft,{}):n.jsx(b.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ir.displayName="SidebarTrigger";const wr=s.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=pe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});wr.displayName="SidebarRail";const rn=s.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));rn.displayName="SidebarInset";const lr=s.forwardRef(({className:t,...e},r)=>n.jsx(Ht,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));lr.displayName="SidebarInput";const cr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));cr.displayName="SidebarHeader";const dr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));dr.displayName="SidebarFooter";const pr=s.forwardRef(({className:t,...e},r)=>n.jsx(_e,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));pr.displayName="SidebarSeparator";const on=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));on.displayName="SidebarContent";const he=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));he.displayName="SidebarGroup";const fe=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Bt.Slot:"div";return n.jsx(a,{ref:o,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});fe.displayName="SidebarGroupLabel";const ur=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Bt.Slot:"button";return n.jsx(a,{ref:o,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});ur.displayName="SidebarGroupAction";const ge=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...e}));ge.displayName="SidebarGroupContent";const an=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));an.displayName="SidebarMenu";const sn=s.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...e}));sn.displayName="SidebarMenuItem";const $a=Ct.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),wn=s.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:a,className:w,...i},l)=>{const p=t?Bt.Slot:"button",{state:c}=pe(),u=n.jsx(p,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:d($a({variant:r,size:o}),w),...i});return a?(typeof a=="string"&&(a={children:a}),n.jsxs(Re,{children:[n.jsx(Me,{asChild:!0,children:u}),n.jsx(de,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):u});wn.displayName="SidebarMenuButton";const mr=s.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},a)=>{const w=e?Bt.Slot:"button";return n.jsx(w,{ref:a,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});mr.displayName="SidebarMenuAction";const hr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));hr.displayName="SidebarMenuBadge";const fr=s.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Fe,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Fe,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});fr.displayName="SidebarMenuSkeleton";const gr=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));gr.displayName="SidebarMenuSub";const br=s.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));br.displayName="SidebarMenuSubItem";const xr=s.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...a},w)=>{const i=t?Bt.Slot:"a";return n.jsx(i,{ref:w,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});xr.displayName="SidebarMenuSubButton";function vr({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:i,buttonPlaceholderText:l,className:p}){const c=s.useCallback((m,h)=>{o(m,h)},[o]),u=s.useCallback(m=>{const h=r.find(g=>g.projectId===m);return h?h.projectName:m},[r]),f=s.useCallback(m=>!a.projectId&&m===a.label,[a]);return n.jsx(nn,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",p),children:n.jsxs(on,{children:[n.jsxs(he,{children:[n.jsx(fe,{className:"tw-text-sm",children:w}),n.jsx(ge,{children:n.jsx(an,{children:Object.entries(e).map(([m,h])=>n.jsx(sn,{children:n.jsx(wn,{onClick:()=>c(m),isActive:f(m),children:n.jsx("span",{className:"tw-pl-3",children:h})})},m))})})]}),n.jsxs(he,{children:[n.jsx(fe,{className:"tw-text-sm",children:i}),n.jsx(ge,{className:"tw-pl-3",children:n.jsx(me,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:m=>{const h=u(m);c(h,m)},value:(a==null?void 0:a.projectId)??void 0,icon:n.jsx(b.ScrollText,{})})})]})]})})}const Ee=s.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:a,isDisabled:w=!1},i)=>{const l=X();return n.jsxs("div",{className:d("tw-relative",{"tw-w-full":o},a),children:[n.jsx(b.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":l==="rtl"},{"tw-left-3":l==="ltr"})}),n.jsx(Ht,{ref:i,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:p=>e(p.target.value),disabled:w}),t&&n.jsxs(V,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":l==="rtl"},{"tw-right-0":l==="ltr"}),onClick:()=>{e("")},children:[n.jsx(b.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ee.displayName="SearchBar";function Xa({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:w,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Ee,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(en,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(vr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:w,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:u}),n.jsx(rn,{className:"tw-min-w-[215px]",children:o})]})]})}const vt="scrBook",qa="scrRef",Tt="source",Ha="details",Ka="Scripture Reference",Ua="Scripture Book",yr="Type",Ya="Details";function Ja(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:vt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Ka,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?I.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===vt?k.formatScrRef(a.start):void 0},getGroupingValue:o=>I.bookIdToNumber(o.start.book),sortingFn:(o,a)=>k.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>k.formatScrRef(o.start),id:qa,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:k.formatScrRef(a.start)},sortingFn:(o,a)=>k.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Tt,header:r?(t==null?void 0:t.typeColumnName)??yr:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Ha,header:(t==null?void 0:t.detailsColumnName)??Ya,cell:o=>o.getValue(),enableGrouping:!1}]}const Wa=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||k.compareScrRefs(t.start,t.end)===0?`${k.scrRefToBBBCCCVVV(t.start)}+${e}`:`${k.scrRefToBBBCCCVVV(t.start)}+${e}-${k.scrRefToBBBCCCVVV(t.end)}+${r}`},Nn=t=>`${Wa({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Za({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:w,detailsColumnName:i,onRowSelected:l}){const[p,c]=s.useState([]),[u,f]=s.useState([{id:vt,desc:!1}]),[m,h]=s.useState({}),g=s.useMemo(()=>t.flatMap(C=>C.data.map(x=>({...x,source:C.source}))),[t]),S=s.useMemo(()=>Ja({scriptureReferenceColumnName:o,typeColumnName:w,detailsColumnName:i},r),[o,w,i,r]);s.useEffect(()=>{p.includes(Tt)?f([{id:Tt,desc:!1},{id:vt,desc:!1}]):f([{id:vt,desc:!1}])},[p]);const j=Y.useReactTable({data:g,columns:S,state:{grouping:p,sorting:u,rowSelection:m},onGroupingChange:c,onSortingChange:f,onRowSelectionChange:h,getExpandedRowModel:Y.getExpandedRowModel(),getGroupedRowModel:Y.getGroupedRowModel(),getCoreRowModel:Y.getCoreRowModel(),getSortedRowModel:Y.getSortedRowModel(),getRowId:Nn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const C=j.getSelectedRowModel().rowsById,x=Object.keys(C);if(x.length===1){const y=g.find(M=>Nn(M)===x[0])||void 0;y&&l(y)}}},[m,g,l,j]);const _=a??Ua,v=w??yr,E=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[vt]},{label:`Group by ${v}`,value:[Tt]},{label:`Group by ${_} and ${v}`,value:[vt,Tt]},{label:`Group by ${v} and ${_}`,value:[Tt,vt]}],O=C=>{c(JSON.parse(C))},U=(C,x)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(x)},tt=(C,x)=>C.getIsGrouped()?"":d("banded-row",x%2===0?"even":"odd"),at=(C,x,y)=>{if(!((C==null?void 0:C.length)===0||x.depth<y.column.getGroupedIndex())){if(x.getIsGrouped())switch(x.depth){case 1:return"tw-ps-4";default:return}switch(x.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(Et,{value:JSON.stringify(p),onValueChange:C=>{O(C)},children:[n.jsx(jt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Dt,{})}),n.jsx(kt,{position:"item-aligned",children:n.jsx(qn,{children:E.map(C=>n.jsx(rt,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),n.jsxs(we,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(le,{children:j.getHeaderGroups().map(C=>n.jsx(ft,{children:C.headers.filter(x=>x.column.columnDef.header).map(x=>n.jsx(Pt,{colSpan:x.colSpan,className:"top-0 tw-sticky",children:x.isPlaceholder?void 0:n.jsxs("div",{children:[x.column.getCanGroup()?n.jsx(V,{variant:"ghost",title:`Toggle grouping by ${x.column.columnDef.header}`,onClick:x.column.getToggleGroupingHandler(),type:"button",children:x.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Y.flexRender(x.column.columnDef.header,x.getContext())]})},x.id))},C.id))}),n.jsx(ce,{children:j.getRowModel().rows.map((C,x)=>{const y=X();return n.jsx(ft,{"data-state":C.getIsSelected()?"selected":"",className:d(tt(C,x)),onClick:M=>U(C,M),children:C.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==Tt||!r)))return n.jsx(Vt,{className:d(M.column.columnDef.id,"tw-p-[1px]",at(p,C,M)),children:M.getIsGrouped()?n.jsxs(V,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&n.jsx(b.ChevronDown,{}),!C.getIsExpanded()&&(y==="ltr"?n.jsx(b.ChevronRight,{}):n.jsx(b.ChevronLeft,{}))," ",Y.flexRender(M.column.columnDef.cell,M.getContext())," (",C.subRows.length,")"]}):Y.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},C.id)})})]})]})}var yt=(t=>(t.OT="OT",t.NT="NT",t.DC="DC",t.Extra="Extra",t))(yt||{});const Qa=(t,e,r,o,a)=>{switch(t){case"OT":return e??"Old Testament";case"NT":return r??"New Testament";case"DC":return o??"Deuterocanon";case"Extra":return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ts=(t,e,r,o,a)=>{switch(t){case"OT":return e??"OT";case"NT":return r??"NT";case"DC":return o??"DC";case"Extra":return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}},Ot=t=>{if(I.isBookOT(t))return"OT";if(I.isBookNT(t))return"NT";if(I.isBookDC(t))return"DC";if(I.isExtraMaterial(t))return"Extra";throw new Error(`Unknown section for book: ${t}`)},ln=(t,e)=>t.filter(r=>{try{return Ot(r)===e}catch{return!1}}),Nr=(t,e,r)=>ln(t,e).every(o=>r.includes(o));function es({bookId:t,selectedBookIds:e,toggleBook:r,lastKeyEventShiftKey:o,localizedBookNames:a}){var l,p;const w=s.useRef(!1),i=s.useRef();return n.jsxs(Nt,{value:t,className:"tw-flex tw-items-center",onSelect:()=>{w.current||(r(t,o.current),o.current=!1),i.current&&clearTimeout(i.current),i.current=setTimeout(()=>{w.current=!1},100)},onMouseDown:c=>{c.preventDefault(),w.current=!0,r(t,c.shiftKey)},role:"option","aria-selected":e.includes(t),"aria-label":`${I.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,children:[n.jsx(b.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",e.includes(t)?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:d("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":Ot(t)===yt.OT,"tw-border-s-purple-200":Ot(t)===yt.NT,"tw-border-s-indigo-200":Ot(t)===yt.DC,"tw-border-s-yellow-200":Ot(t)===yt.Extra}),children:a&&((l=a.get(t))==null?void 0:l.localizedName)||I.bookIdToEnglishName(t)}),n.jsx("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:a&&((p=a.get(t))==null?void 0:p.localizedId)||t.toLocaleUpperCase()})]},t)}function ns({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:a}){const w=ln(e,t).length===0,i=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],p=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return n.jsx(V,{variant:"outline",size:"sm",onClick:()=>o(t),className:d(Nr(e,t,r)&&!w&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:w,children:ts(t,i,l,p,c)})}const jn=5,ze=6;function rs({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const w=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],p=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],m=o["%scripture_section_ot_long%"],h=o["%scripture_section_nt_long%"],g=o["%scripture_section_dc_long%"],S=o["%scripture_section_extra_long%"],[j,_]=s.useState(!1),v=s.useRef(void 0),E=s.useRef(!1);if(t.length!==I.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=s.useMemo(()=>I.allBookIds.filter((x,y)=>t[y]==="1"&&!I.isObsolete(I.bookIdToNumber(x))),[t]),U=s.useCallback((x,y=!1)=>{if(!y||!v.current){r(e.includes(x)?e.filter(et=>et!==x):[...e,x]),v.current=x;return}const M=O.findIndex(et=>et===v.current),K=O.findIndex(et=>et===x);if(M===-1||K===-1)return;const[zt,Kt]=[Math.min(M,K),Math.max(M,K)],wt=O.slice(zt,Kt+1).map(et=>et);r(e.includes(x)?e.filter(et=>!wt.includes(et)):[...new Set([...e,...wt])])},[e,r,O]),tt=s.useCallback(x=>{const y=ln(O,x).map(M=>M);r(Nr(O,x,e)?e.filter(M=>!y.includes(M)):[...new Set([...e,...y])])},[e,r,O]),at=()=>{r(O.map(x=>x))},C=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(yt).map(x=>n.jsx(ns,{section:x,availableBookIds:O,selectedBookIds:e,onToggle:tt,localizedStrings:o},x))}),n.jsxs($t,{open:j,onOpenChange:_,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":j,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${w}: ${e.length}`:i,n.jsx(b.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(It,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Gt,{onKeyDown:x=>{x.key==="Enter"&&(E.current=x.shiftKey)},children:[n.jsx(Ft,{placeholder:l}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:at,children:p}),n.jsx(V,{variant:"ghost",size:"sm",onClick:C,children:c})]}),n.jsxs(Lt,{children:[n.jsx(ae,{children:u}),Object.values(yt).map((x,y)=>{const M=O.filter(K=>Ot(K)===x);if(M.length!==0)return n.jsxs(s.Fragment,{children:[n.jsx(Rt,{heading:Qa(x,m,h,g,S),children:M.map(K=>n.jsx(es,{bookId:K,selectedBookIds:e,toggleBook:U,lastKeyEventShiftKey:E,localizedBookNames:a},K))}),y<Object.values(yt).length-1&&n.jsx(En,{})]},x)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===ze?ze:jn).map(x=>{var y;return n.jsx(re,{className:"hover:tw-bg-secondary",variant:"secondary",children:a&&((y=a.get(x))==null?void 0:y.localizedName)||I.bookIdToEnglishName(x)||x},x)}),e.length>ze&&n.jsx(re,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-jn} ${f}`})]})]})}const os=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),St=(t,e)=>t[e]??e;function as({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:w,localizedStrings:i,localizedBookNames:l}){const p=St(i,"%webView_scope_selector_selected_text%"),c=St(i,"%webView_scope_selector_current_verse%"),u=St(i,"%webView_scope_selector_current_chapter%"),f=St(i,"%webView_scope_selector_current_book%"),m=St(i,"%webView_scope_selector_choose_books%"),h=St(i,"%webView_scope_selector_scope%"),g=St(i,"%webView_scope_selector_select_books%"),S=[{value:"selectedText",label:p,id:"scope-selected-text"},{value:"verse",label:c,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],j=e?S.filter(_=>e.includes(_.value)):S;return n.jsxs("div",{className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(F,{children:h}),n.jsx(ye,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:_,label:v,id:E})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ee,{className:"tw-me-2",value:_,id:E}),n.jsx(F,{htmlFor:E,children:v})]},E))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(F,{children:g}),n.jsx(rs,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:w,localizedStrings:i,localizedBookNames:l})]})]})}const Oe={[k.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[k.getLocalizeKeyForScrollGroupId(0)]:"A",[k.getLocalizeKeyForScrollGroupId(1)]:"B",[k.getLocalizeKeyForScrollGroupId(2)]:"C",[k.getLocalizeKeyForScrollGroupId(3)]:"D",[k.getLocalizeKeyForScrollGroupId(4)]:"E",[k.getLocalizeKeyForScrollGroupId(5)]:"F",[k.getLocalizeKeyForScrollGroupId(6)]:"G",[k.getLocalizeKeyForScrollGroupId(7)]:"H",[k.getLocalizeKeyForScrollGroupId(8)]:"I",[k.getLocalizeKeyForScrollGroupId(9)]:"J",[k.getLocalizeKeyForScrollGroupId(10)]:"K",[k.getLocalizeKeyForScrollGroupId(11)]:"L",[k.getLocalizeKeyForScrollGroupId(12)]:"M",[k.getLocalizeKeyForScrollGroupId(13)]:"N",[k.getLocalizeKeyForScrollGroupId(14)]:"O",[k.getLocalizeKeyForScrollGroupId(15)]:"P",[k.getLocalizeKeyForScrollGroupId(16)]:"Q",[k.getLocalizeKeyForScrollGroupId(17)]:"R",[k.getLocalizeKeyForScrollGroupId(18)]:"S",[k.getLocalizeKeyForScrollGroupId(19)]:"T",[k.getLocalizeKeyForScrollGroupId(20)]:"U",[k.getLocalizeKeyForScrollGroupId(21)]:"V",[k.getLocalizeKeyForScrollGroupId(22)]:"W",[k.getLocalizeKeyForScrollGroupId(23)]:"X",[k.getLocalizeKeyForScrollGroupId(24)]:"Y",[k.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ss({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:w}){const i={...Oe,...Object.fromEntries(Object.entries(o).map(([p,c])=>[p,p===c&&p in Oe?Oe[p]:c]))},l=X();return n.jsxs(Et,{value:`${e}`,onValueChange:p=>r(p==="undefined"?void 0:parseInt(p,10)),children:[n.jsx(jt,{size:a,className:d("pr-twp tw-w-auto",w),children:n.jsx(Dt,{placeholder:i[k.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(kt,{align:l==="rtl"?"end":"start",style:{zIndex:250},children:t.map(p=>n.jsx(rt,{value:`${p}`,children:i[k.getLocalizeKeyForScrollGroupId(p)]},`${p}`))})]})}function is({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function ws({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:a}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):n.jsx("div",{children:r})]})}function ls({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(_e,{}):""]})}function jr(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function be({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const kr=(t,e,r,o)=>r?Object.entries(t).filter(([w,i])=>"column"in i&&i.column===r||w===r).sort(([,w],[,i])=>w.order-i.order).flatMap(([w])=>e.filter(l=>l.group===w).sort((l,p)=>l.order-p.order).map(l=>n.jsxs(Re,{children:[n.jsx(Me,{asChild:!0,children:"command"in l?n.jsxs(Je,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(be,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(be,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(Ln,{children:[n.jsx(Ue,{children:l.label}),n.jsx(Fn,{children:n.jsx(Ye,{children:kr(t,e,jr(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(de,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function xe({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:a,variant:w,buttonVariant:i="ghost",id:l}){return n.jsxs(Ne,{variant:w,children:[n.jsx(He,{"aria-label":r,className:a,asChild:!0,id:l,children:n.jsx(V,{variant:i,size:"icon",children:o??n.jsx(b.MenuIcon,{})})}),n.jsx(se,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,c])=>typeof p=="boolean"||typeof c=="boolean"?0:p.order-c.order).map(([p],c,u)=>n.jsxs(s.Fragment,{children:[n.jsx(Ke,{children:n.jsx(Te,{children:kr(e.groups,e.items,p,t)})}),c<u.length-1&&n.jsx(ie,{})]},p))})]})}const Cr=s.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function cs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:a,className:w,startAreaChildren:i,centerAreaChildren:l,endAreaChildren:p,menuButtonIcon:c}){return n.jsxs(Cr,{className:`tw-w-full tw-border tw-bg-background ${w}`,id:a,children:[r&&n.jsx(xe,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??n.jsx(b.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(xe,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(b.EllipsisVertical,{}),className:"tw-h-full"}),p]})]})}function ds({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:a}){return n.jsx(Cr,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(xe,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const cn=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsx(Q.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});cn.displayName=Q.List.displayName;const dn=s.forwardRef(({className:t,...e},r)=>n.jsx(Q.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));dn.displayName=Q.List.displayName;const Sr=s.forwardRef(({className:t,...e},r)=>n.jsx(Q.Trigger,{ref:r,...e,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),pn=s.forwardRef(({className:t,...e},r)=>n.jsx(Q.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));pn.displayName=Q.Content.displayName;function ps({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:w}){return n.jsxs("div",{className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?n.jsx("h1",{children:a}):"",n.jsx(Ee,{className:w,value:e,onSearch:r,placeholder:o})]}),n.jsxs(cn,{children:[n.jsx(dn,{children:t.map(i=>n.jsx(Sr,{value:i.value,children:i.value},i.key))}),t.map(i=>n.jsx(pn,{value:i.value,children:i.content},i.key))]})]})}function us({...t}){return n.jsx(B.Menu,{...t})}function ms({...t}){return n.jsx(B.Sub,{"data-slot":"menubar-sub",...t})}const _r=s.forwardRef(({className:t,variant:e="default",...r},o)=>{const a=s.useMemo(()=>({variant:e}),[e]);return n.jsx(qe.Provider,{value:a,children:n.jsx(B.Root,{ref:o,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});_r.displayName=B.Root.displayName;const Tr=s.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(B.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",gt({variant:o.variant,className:t})),...e})});Tr.displayName=B.Trigger.displayName;const Rr=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const w=it();return n.jsxs(B.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",gt({variant:w.variant,className:t}),t),...o,children:[r,n.jsx(b.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Rr.displayName=B.SubTrigger.displayName;const Mr=s.forwardRef(({className:t,...e},r)=>{const o=it();return n.jsx(B.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Mr.displayName=B.SubContent.displayName;const Er=s.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...a},w)=>{const i=it();return n.jsx(B.Portal,{children:n.jsx(B.Content,{ref:w,align:e,alignOffset:r,sideOffset:o,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...a})})});Er.displayName=B.Content.displayName;const Dr=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=it();return n.jsx(B.Item,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",gt({variant:a.variant,className:t}),t),...r})});Dr.displayName=B.Item.displayName;const hs=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const w=it();return n.jsxs(B.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",gt({variant:w.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(b.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});hs.displayName=B.CheckboxItem.displayName;const fs=s.forwardRef(({className:t,children:e,...r},o)=>{const a=it();return n.jsxs(B.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",gt({variant:a.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(b.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});fs.displayName=B.RadioItem.displayName;const gs=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(B.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));gs.displayName=B.Label.displayName;const Vr=s.forwardRef(({className:t,...e},r)=>n.jsx(B.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Vr.displayName=B.Separator.displayName;const Jt=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ir=(t,e,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([w,i])=>"column"in i&&i.column===r||w===r).sort(([,w],[,i])=>w.order-i.order);return a.flatMap(([w],i)=>{const l=e.filter(c=>c.group===w).sort((c,u)=>c.order-u.order).map(c=>n.jsxs(Re,{children:[n.jsx(Me,{asChild:!0,children:"command"in c?n.jsxs(Dr,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(be,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(be,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):n.jsxs(ms,{children:[n.jsx(Rr,{children:c.label}),n.jsx(Mr,{children:Ir(t,e,jr(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(de,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),p=[...l];return l.length>0&&i<a.length-1&&p.push(n.jsx(Vr,{},`separator-${w}`)),p})};function bs({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const a=s.useRef(void 0),w=s.useRef(void 0),i=s.useRef(void 0),l=s.useRef(void 0),p=s.useRef(void 0),c=u=>{switch(u){case"platform.app":return w;case"platform.window":return i;case"platform.layout":return l;case"platform.help":return p;default:return}};if(zo.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,f)=>{var g,S,j,_;u.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Jt(w,[m]);break;case"alt+p":(g=w.current)==null||g.focus(),Jt(w,[m,h]);break;case"alt+l":(S=i.current)==null||S.focus(),Jt(i,[m,h]);break;case"alt+n":(j=l.current)==null||j.focus(),Jt(l,[m,h]);break;case"alt+h":(_=p.current)==null||_.focus(),Jt(p,[m,h]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const u=new MutationObserver(h=>{h.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const S=g.target.getAttribute("data-state");r(S==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(h=>{u.observe(h,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(_r,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,f])=>typeof u=="boolean"||typeof f=="boolean"?0:u.order-f.order).map(([u,f])=>n.jsxs(us,{children:[n.jsx(Tr,{ref:c(u),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(Er,{className:"tw-z-[250]",children:n.jsx(Te,{children:Ir(t.groups,t.items,u,e)})})]},u))})}function xs(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function vs({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:a,children:w,appMenuAreaChildren:i,configAreaChildren:l,shouldUseAsAppDragArea:p,menubarVariant:c="default"}){const u=s.useRef(void 0);return n.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:a,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:p?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&n.jsx(bs,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:c})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:w}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const ys=(t,e)=>t[e]??e;function Ns({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:w,localizedStrings:i,className:l}){const p=ys(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[c,u]=s.useState(!1),f=h=>{a&&a(h),o&&o([h,...r.filter(g=>g!==h)]),w&&r.find(g=>g===h)&&w([...r.filter(g=>g!==h)]),u(!1)},m=(h,g)=>{var j,_,v,E,O,U;const S=g!==h?((_=(j=t[h])==null?void 0:j.uiNames)==null?void 0:_[g])??((E=(v=t[h])==null?void 0:v.uiNames)==null?void 0:E.en):void 0;return S?`${(O=t[h])==null?void 0:O.autonym} (${S})`:(U=t[h])==null?void 0:U.autonym};return n.jsxs("div",{className:d("pr-twp tw-max-w-sm",l),children:[n.jsxs(Et,{name:"uiLanguage",value:e,onValueChange:f,open:c,onOpenChange:h=>u(h),children:[n.jsx(jt,{children:n.jsx(Dt,{})}),n.jsx(kt,{className:"tw-z-[250]",children:Object.keys(t).map(h=>n.jsx(rt,{value:h,children:m(h,e)},h))})]}),e!=="en"&&n.jsxs(n.Fragment,{children:[n.jsx(F,{className:"tw-ms-3",children:p}),n.jsx("div",{className:"tw-ms-3",children:n.jsxs(F,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(h=>m(h,e)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function js({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(F,{children:e(t)}):r?n.jsx(F,{children:r(t)}):n.jsx(F,{children:t})}function ks({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:w,createComplexLabel:i}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Ce,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:p=>a(l,p)}),n.jsx(js,{item:l,createLabel:w,createComplexLabel:i})]},l))})}const zr=s.forwardRef(({className:t,...e},r)=>n.jsx(b.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...e,ref:r}));zr.displayName="Spinner";function Cs({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:w,placeholder:i,isRequired:l=!1,className:p,defaultValue:c,value:u,onChange:f,onFocus:m,onBlur:h}){return n.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(F,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!w}),children:`${w}${l?"*":""}`}),n.jsx(Ht,{id:t,disabled:e,placeholder:i,required:l,className:d(p,{"tw-border-red-600":r}),defaultValue:c,value:u,onChange:f,onFocus:m,onBlur:h}),n.jsx("p",{className:d({"tw-hidden":!a}),children:a})]})}const Ss=Ct.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Or=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:d("pr-twp",Ss({variant:e}),t),...r}));Or.displayName="Alert";const Pr=s.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Pr.displayName="AlertTitle";const Br=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Br.displayName="AlertDescription";const Ar=s.forwardRef(({className:t,...e},r)=>n.jsx(At.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Ar.displayName=At.Root.displayName;const Gr=s.forwardRef(({className:t,...e},r)=>n.jsx(At.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Gr.displayName=At.Image.displayName;const Fr=s.forwardRef(({className:t,...e},r)=>n.jsx(At.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Fr.displayName=At.Fallback.displayName;const Lr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Lr.displayName="Card";const $r=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));$r.displayName="CardHeader";const Xr=s.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Xr.displayName="CardTitle";const qr=s.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));qr.displayName="CardDescription";const Hr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...e}));Hr.displayName="CardContent";const Kr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Kr.displayName="CardFooter";const _s=A.Root,Ts=A.Trigger,Rs=A.Group,Ms=A.Portal,Es=A.Sub,Ds=A.RadioGroup,Ur=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>n.jsxs(A.SubTrigger,{ref:a,className:d("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(b.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ur.displayName=A.SubTrigger.displayName;const Yr=s.forwardRef(({className:t,...e},r)=>n.jsx(A.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Yr.displayName=A.SubContent.displayName;const Jr=s.forwardRef(({className:t,...e},r)=>n.jsx(A.Portal,{children:n.jsx(A.Content,{ref:r,className:d("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Jr.displayName=A.Content.displayName;const Wr=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(A.Item,{ref:o,className:d("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Wr.displayName=A.Item.displayName;const Zr=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>n.jsxs(A.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(A.ItemIndicator,{children:n.jsx(b.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Zr.displayName=A.CheckboxItem.displayName;const Qr=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(A.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(A.ItemIndicator,{children:n.jsx(b.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Qr.displayName=A.RadioItem.displayName;const to=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(A.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));to.displayName=A.Label.displayName;const eo=s.forwardRef(({className:t,...e},r)=>n.jsx(A.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));eo.displayName=A.Separator.displayName;function no({className:t,...e}){return n.jsx("span",{className:d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}no.displayName="ContextMenuShortcut";const ro=s.createContext({direction:"bottom"});function oo({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=s.useMemo(()=>({direction:e}),[e]);return n.jsx(ro.Provider,{value:o,children:n.jsx(st.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}oo.displayName="Drawer";const Vs=st.Drawer.Trigger,ao=st.Drawer.Portal,Is=st.Drawer.Close,un=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));un.displayName=st.Drawer.Overlay.displayName;const so=s.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},a)=>{const{direction:w="bottom"}=s.useContext(ro),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ao,{children:[n.jsx(un,{}),n.jsxs(st.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",w==="bottom"||w==="top"?"tw-flex-col":"tw-flex-row",i[w],t),...o,children:[!r&&(w==="bottom"||w==="right")&&n.jsx("div",{className:l[w]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(w==="top"||w==="left")&&n.jsx("div",{className:l[w]})]})]})});so.displayName="DrawerContent";function io({className:t,...e}){return n.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}io.displayName="DrawerHeader";function wo({className:t,...e}){return n.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}wo.displayName="DrawerFooter";const lo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));lo.displayName=st.Drawer.Title.displayName;const co=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));co.displayName=st.Drawer.Description.displayName;const po=s.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Ae.Root,{ref:o,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Ae.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));po.displayName=Ae.Root.displayName;function zs({...t}){return n.jsx(Cn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const uo=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsxs(Wt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Wt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Wt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Wt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});uo.displayName=Wt.Root.displayName;const mo=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsx(Ge.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Ge.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});mo.displayName=Ge.Root.displayName;const Os=Q.Root,ho=s.forwardRef(({className:t,...e},r)=>{const o=X();return n.jsx(Q.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ho.displayName=Q.List.displayName;const fo=s.forwardRef(({className:t,...e},r)=>n.jsx(Q.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));fo.displayName=Q.Trigger.displayName;const go=s.forwardRef(({className:t,...e},r)=>n.jsx(Q.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));go.displayName=Q.Content.displayName;const bo=s.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));bo.displayName="Textarea";const Ps=(t,e)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Bs(t){return{preserveValue:!0,...t}}const xo=(t,e,r={})=>{const o=s.useRef(e);o.current=e;const a=s.useRef(r);a.current=Bs(a.current);const[w,i]=s.useState(()=>o.current),[l,p]=s.useState(!0);return s.useEffect(()=>{let c=!0;return p(!!t),(async()=>{if(t){const u=await t();c&&(i(()=>u),p(!1))}})(),()=>{c=!1,a.current.preserveValue||i(()=>o.current)}},[t]),[w,l]},Pe=()=>!1,As=(t,e)=>{const[r]=xo(s.useCallback(async()=>{if(!t)return Pe;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Pe,{preserveValue:!1});s.useEffect(()=>()=>{r!==Pe&&r()},[r])},Gs=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[w,i]=s.useState(void 0),[l,p]=s.useState(void 0),c=s.useCallback(m=>{i(m);const h=t.find(S=>S.id===m);h&&(e==null||e(h));const g=document.getElementById(m);g&&(g.scrollIntoView({block:"center"}),g.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[e,t]),u=s.useCallback(m=>{const h=t.find(g=>g.id===m);h&&(p(g=>g===m?void 0:m),r==null||r(h))},[r,t]),f=s.useCallback(m=>{const h=t.findIndex(j=>j.id===w);let g=h;switch(m.key){case"ArrowDown":g=Math.min(h+1,t.length-1),m.preventDefault();break;case"ArrowUp":g=Math.max(h-1,0),m.preventDefault();break;case"Home":g=0,m.preventDefault();break;case"End":g=t.length-1,m.preventDefault();break;case" ":case"Enter":w&&u(w),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const S=t[g];S&&c(S.id)},[t,c,w,u,o]);return{listboxRef:a,activeId:w,selectedId:l,handleKeyDown:f,focusOption:c}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Cn.toast});exports.Alert=Or;exports.AlertDescription=Br;exports.AlertTitle=Pr;exports.Avatar=Ar;exports.AvatarFallback=Fr;exports.AvatarImage=Gr;exports.BOOK_SELECTOR_STRING_KEYS=pa;exports.Badge=re;exports.BookChapterControl=la;exports.BookSelectionMode=Gn;exports.BookSelector=ua;exports.Button=V;exports.Card=Lr;exports.CardContent=Hr;exports.CardDescription=qr;exports.CardFooter=Kr;exports.CardHeader=$r;exports.CardTitle=Xr;exports.ChapterRangeSelector=An;exports.Checkbox=Ce;exports.Checklist=ks;exports.ComboBox=me;exports.Command=Gt;exports.CommandEmpty=ae;exports.CommandGroup=Rt;exports.CommandInput=Ft;exports.CommandItem=Nt;exports.CommandList=Lt;exports.ContextMenu=_s;exports.ContextMenuCheckboxItem=Zr;exports.ContextMenuContent=Jr;exports.ContextMenuGroup=Rs;exports.ContextMenuItem=Wr;exports.ContextMenuLabel=to;exports.ContextMenuPortal=Ms;exports.ContextMenuRadioGroup=Ds;exports.ContextMenuRadioItem=Qr;exports.ContextMenuSeparator=eo;exports.ContextMenuShortcut=no;exports.ContextMenuSub=Es;exports.ContextMenuSubContent=Yr;exports.ContextMenuSubTrigger=Ur;exports.ContextMenuTrigger=Ts;exports.DataTable=Wn;exports.Drawer=oo;exports.DrawerClose=Is;exports.DrawerContent=so;exports.DrawerDescription=co;exports.DrawerFooter=wo;exports.DrawerHeader=io;exports.DrawerOverlay=un;exports.DrawerPortal=ao;exports.DrawerTitle=lo;exports.DrawerTrigger=Vs;exports.DropdownMenu=Ne;exports.DropdownMenuCheckboxItem=je;exports.DropdownMenuContent=se;exports.DropdownMenuGroup=Ke;exports.DropdownMenuItem=Je;exports.DropdownMenuItemType=tr;exports.DropdownMenuLabel=ke;exports.DropdownMenuPortal=Fn;exports.DropdownMenuRadioGroup=$n;exports.DropdownMenuRadioItem=We;exports.DropdownMenuSeparator=ie;exports.DropdownMenuShortcut=Xn;exports.DropdownMenuSub=Ln;exports.DropdownMenuSubContent=Ye;exports.DropdownMenuSubTrigger=Ue;exports.DropdownMenuTrigger=He;exports.ERROR_DUMP_STRING_KEYS=Zn;exports.ERROR_POPOVER_STRING_KEYS=ya;exports.ErrorDump=Qn;exports.ErrorPopover=Na;exports.Filter=_a;exports.FilterDropdown=ja;exports.Footer=Sa;exports.INVENTORY_STRING_KEYS=Pa;exports.Input=Ht;exports.Inventory=Ga;exports.Label=F;exports.MarkdownRenderer=va;exports.MoreInfo=ka;exports.MultiSelectComboBox=nr;exports.NavigationContentSearch=ps;exports.Popover=$t;exports.PopoverContent=It;exports.PopoverTrigger=Xt;exports.Progress=po;exports.RadioGroup=ye;exports.RadioGroupItem=ee;exports.SCOPE_SELECTOR_STRING_KEYS=os;exports.ScopeSelector=as;exports.ScriptureResultsViewer=Za;exports.ScrollGroupSelector=ss;exports.SearchBar=Ee;exports.Select=Et;exports.SelectContent=kt;exports.SelectGroup=qn;exports.SelectItem=rt;exports.SelectLabel=Kn;exports.SelectScrollDownButton=Qe;exports.SelectScrollUpButton=Ze;exports.SelectSeparator=Un;exports.SelectTrigger=jt;exports.SelectValue=Dt;exports.Separator=_e;exports.SettingsList=is;exports.SettingsListHeader=ls;exports.SettingsListItem=ws;exports.SettingsSidebar=vr;exports.SettingsSidebarContentSearch=Xa;exports.Sidebar=nn;exports.SidebarContent=on;exports.SidebarFooter=dr;exports.SidebarGroup=he;exports.SidebarGroupAction=ur;exports.SidebarGroupContent=ge;exports.SidebarGroupLabel=fe;exports.SidebarHeader=cr;exports.SidebarInput=lr;exports.SidebarInset=rn;exports.SidebarMenu=an;exports.SidebarMenuAction=mr;exports.SidebarMenuBadge=hr;exports.SidebarMenuButton=wn;exports.SidebarMenuItem=sn;exports.SidebarMenuSkeleton=fr;exports.SidebarMenuSub=gr;exports.SidebarMenuSubButton=xr;exports.SidebarMenuSubItem=br;exports.SidebarProvider=en;exports.SidebarRail=wr;exports.SidebarSeparator=pr;exports.SidebarTrigger=ir;exports.Skeleton=Fe;exports.Slider=uo;exports.Sonner=zs;exports.Spinner=zr;exports.Switch=mo;exports.TabDropdownMenu=xe;exports.TabFloatingMenu=ds;exports.TabToolbar=cs;exports.Table=we;exports.TableBody=ce;exports.TableCaption=Jn;exports.TableCell=Vt;exports.TableFooter=Yn;exports.TableHead=Pt;exports.TableHeader=le;exports.TableRow=ft;exports.Tabs=Os;exports.TabsContent=go;exports.TabsList=ho;exports.TabsTrigger=fo;exports.TextField=Cs;exports.Textarea=bo;exports.ToggleGroup=tn;exports.ToggleGroupItem=Zt;exports.Toolbar=vs;exports.Tooltip=Re;exports.TooltipContent=de;exports.TooltipProvider=Te;exports.TooltipTrigger=Me;exports.UiLanguageSelector=Ns;exports.VerticalTabs=cn;exports.VerticalTabsContent=pn;exports.VerticalTabsList=dn;exports.VerticalTabsTrigger=Sr;exports.badgeVariants=er;exports.buttonVariants=Rn;exports.cn=d;exports.getBookIdFromUSFM=Oa;exports.getLinesFromUSFM=Ia;exports.getNumberFromUSFM=za;exports.getStatusForItem=ar;exports.getToolbarOSReservedSpaceClassName=xs;exports.inventoryCountColumn=Da;exports.inventoryItemColumn=Ma;exports.inventoryStatusColumn=Va;exports.selectTriggerVariants=Hn;exports.useEvent=Ps;exports.useEventAsync=As;exports.useListbox=Gs;exports.usePromise=xo;exports.useSidebar=pe;function Fs(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}Fs(`.banded-row:hover {
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
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
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
.tw-pointer-events-auto {
  pointer-events: auto;
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
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
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
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
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
.tw-mr-1 {
  margin-right: 0.25rem;
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
.tw-mt-6 {
  margin-top: 1.5rem;
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
.tw-h-32 {
  height: 8rem;
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
.tw-h-64 {
  height: 16rem;
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
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
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
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
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
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
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
.tw-w-24 {
  width: 6rem;
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
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
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
.tw-w-80 {
  width: 20rem;
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
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
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
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
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
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
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
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
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
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
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
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
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
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.tw-border-l-4 {
  border-left-width: 4px;
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
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
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
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
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
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
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
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
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
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
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
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
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
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
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
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
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
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
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
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
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
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
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
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
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
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
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
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
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
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
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
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
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

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
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

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

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
