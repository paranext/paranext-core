"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),s=require("react"),at=require("cmdk"),x=require("lucide-react"),Go=require("clsx"),Fo=require("tailwind-merge"),Bo=require("@radix-ui/react-dialog"),h=require("platform-bible-utils"),Ht=require("@radix-ui/react-slot"),_t=require("class-variance-authority"),$o=require("@radix-ui/react-popover"),Xo=require("@radix-ui/react-label"),Ko=require("@radix-ui/react-radio-group"),nt=require("@tanstack/react-table"),Vn=require("@radix-ui/react-dropdown-menu"),Ho=require("@radix-ui/react-select"),qo=require("markdown-to-jsx"),Yo=require("@radix-ui/react-checkbox"),Uo=require("@radix-ui/react-toggle-group"),Jo=require("@radix-ui/react-toggle"),Wo=require("@radix-ui/react-separator"),Zo=require("@radix-ui/react-tooltip"),Qo=require("@radix-ui/react-tabs"),ta=require("@radix-ui/react-menubar"),ea=require("react-hotkeys-hook"),na=require("@radix-ui/react-avatar"),ra=require("@radix-ui/react-context-menu"),lt=require("vaul"),oa=require("@radix-ui/react-progress"),aa=require("react-resizable-panels"),On=require("sonner"),sa=require("@radix-ui/react-slider"),ia=require("@radix-ui/react-switch");function Q(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const gt=Q(Bo),re=Q($o),Pn=Q(Xo),oe=Q(Ko),B=Q(Vn),q=Q(Ho),Be=Q(Yo),ke=Q(Uo),Ln=Q(Jo),An=Q(Wo),we=Q(Zo),st=Q(Qo),$=Q(ta),qt=Q(na),X=Q(ra),$e=Q(oa),He=Q(aa),ee=Q(sa),Xe=Q(ia),wa=Fo.extendTailwindMerge({prefix:"tw-"});function d(...t){return wa(Go.clsx(t))}const la="layoutDirection";function tt(){const t=localStorage.getItem(la);return t==="rtl"?t:"ltr"}const ca=gt.Portal,zn=s.forwardRef(({className:t,...e},r)=>n.jsx(gt.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));zn.displayName=gt.Overlay.displayName;const da=s.forwardRef(({className:t,children:e,...r},o)=>{const a=tt();return n.jsxs(ca,{children:[n.jsx(zn,{}),n.jsxs(gt.Content,{ref:o,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[e,n.jsxs(gt.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});da.displayName=gt.Content.displayName;const pa=s.forwardRef(({className:t,...e},r)=>n.jsx(gt.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));pa.displayName=gt.Title.displayName;const ua=s.forwardRef(({className:t,...e},r)=>n.jsx(gt.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));ua.displayName=gt.Description.displayName;const zt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));zt.displayName=at.Command.displayName;const Yt=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(at.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Yt.displayName=at.Command.Input.displayName;const Gt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Gt.displayName=at.Command.List.displayName;const le=s.forwardRef((t,e)=>n.jsx(at.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));le.displayName=at.Command.Empty.displayName;const kt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));kt.displayName=at.Command.Group.displayName;const Gn=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Gn.displayName=at.Command.Separator.displayName;const Rt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Rt.displayName=at.Command.Item.displayName;var ma=Object.defineProperty,ha=(t,e,r)=>e in t?ma(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,I=(t,e,r)=>ha(t,typeof e!="symbol"?e+"":e,r);const Pt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],qe=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Fn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Sn=Ca();function Ut(t,e=!0){return e&&(t=t.toUpperCase()),t in Sn?Sn[t]:0}function Ye(t){return Ut(t)>0}function fa(t){const e=typeof t=="string"?Ut(t):t;return e>=40&&e<=66}function ga(t){return(typeof t=="string"?Ut(t):t)<=39}function Bn(t){return t<=66}function ba(t){const e=typeof t=="string"?Ut(t):t;return Kn(e)&&!Bn(e)}function*xa(){for(let t=1;t<=Pt.length;t++)yield t}const va=1,$n=Pt.length;function ya(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ue(t,e="***"){const r=t-1;return r<0||r>=Pt.length?e:Pt[r]}function Xn(t){return t<=0||t>$n?"******":Fn[t-1]}function Na(t){return Xn(Ut(t))}function Kn(t){const e=typeof t=="number"?Ue(t):t;return Ye(e)&&!qe.includes(e)}function ja(t){const e=typeof t=="number"?Ue(t):t;return Ye(e)&&qe.includes(e)}function ka(t){return Fn[t-1].includes("*obsolete*")}function Ca(){const t={};for(let e=0;e<Pt.length;e++)t[Pt[e]]=e+1;return t}const P={allBookIds:Pt,nonCanonicalIds:qe,bookIdToNumber:Ut,isBookIdValid:Ye,isBookNT:fa,isBookOT:ga,isBookOTNT:Bn,isBookDC:ba,allBookNumbers:xa,firstBook:va,lastBook:$n,extraBooks:ya,bookNumberToId:Ue,bookNumberToEnglishName:Xn,bookIdToEnglishName:Na,isCanonical:Kn,isExtraMaterial:ja,isObsolete:ka};var mt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(mt||{});const it=class{constructor(e){if(I(this,"name"),I(this,"fullPath"),I(this,"isPresent"),I(this,"hasVerseSegments"),I(this,"isCustomized"),I(this,"baseVersification"),I(this,"scriptureBooks"),I(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=mt[e]):(this._type=e,this.name=mt[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};I(it,"Original",new it(mt.Original)),I(it,"Septuagint",new it(mt.Septuagint)),I(it,"Vulgate",new it(mt.Vulgate)),I(it,"English",new it(mt.English)),I(it,"RussianProtestant",new it(mt.RussianProtestant)),I(it,"RussianOrthodox",new it(mt.RussianOrthodox));let Dt=it;function _n(t,e){const r=e[0];for(let o=1;o<e.length;o++)t=t.split(e[o]).join(r);return t.split(r)}var Hn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Hn||{});const ot=class D{constructor(e,r,o,a){if(I(this,"firstChapter"),I(this,"lastChapter"),I(this,"lastVerse"),I(this,"hasSegmentsDefined"),I(this,"text"),I(this,"BBBCCCVVVS"),I(this,"longHashCode"),I(this,"versification"),I(this,"rtlMark","‏"),I(this,"_bookNum",0),I(this,"_chapterNum",0),I(this,"_verseNum",0),I(this,"_verse"),o==null&&a==null)if(e!=null&&typeof e=="string"){const i=e,w=r!=null&&r instanceof Dt?r:void 0;this.setEmpty(w),this.parse(i)}else if(e!=null&&typeof e=="number"){const i=r!=null&&r instanceof Dt?r:void 0;this.setEmpty(i),this._verseNum=e%D.chapterDigitShifter,this._chapterNum=Math.floor(e%D.bookDigitShifter/D.chapterDigitShifter),this._bookNum=Math.floor(e/D.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof D){const i=e;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(e==null)return;const i=e instanceof Dt?e:D.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&o!=null)if(typeof e=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(e,r,o);else if(typeof e=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=o,this.versification=a??D.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=new D(e),{success:!0,verseRef:r}}catch(o){if(o instanceof Qt)return r=new D,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(e,r,o){return e%D.bcvMaxValue*D.bookDigitShifter+(r>=0?r%D.bcvMaxValue*D.chapterDigitShifter:0)+(o>=0?o%D.bcvMaxValue:0)}static fromJSON(e){const{book:r,chapterNum:o,verseNum:a,verse:i,versificationStr:w}=e,l=i||a.toString();let u;return w&&(u=new Dt(w)),r?new D(r,o.toString(),l,u):new D}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<e.length;a++){if(o=e[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>D.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(D.verseRangeSeparator)||this._verse.includes(D.verseSequenceIndicator))}get book(){return P.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=P.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:o}=D.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=D.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>P.lastBook)throw new Qt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new Dt(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(D.verseRangeSeparators,D.verseSequenceIndicators)}get BBBCCC(){return D.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return D.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const i=e.split("/");if(e=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Dt(mt[w])}catch{throw new Qt("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new Qt("Invalid reference : "+e);const o=r[1].split(":"),a=+o[0];if(o.length!==2||P.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!D.isVerseParseable(o[1]))throw new Qt("Invalid reference : "+e);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new D(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete r.verse,r}equals(e){return e instanceof D?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,r=D.verseRangeSeparators,o=D.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],i=_n(this._verse,o);for(const w of i.map(l=>_n(l,r))){const l=this.clone();l.verse=w[0];const u=l.verseNum;if(a.push(l),w.length>1){const c=this.clone();if(c.verse=w[1],!e)for(let p=u+1;p<c.verseNum;p++){const g=new D(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||a.push(g)}a.push(c)}}return a}validateVerse(e,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,e,r)){const i=a.internalValid;if(i!==0)return i;const w=a.BBBCCCVVV;if(o>w)return 3;if(o===w)return 4;o=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>P.lastBook?2:(P.isCanonical(this._bookNum),0)}setEmpty(e=D.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,o){this.bookNum=P.bookIdToNumber(e),this.chapter=r,this.verse=o}};I(ot,"defaultVersification",Dt.English),I(ot,"verseRangeSeparator","-"),I(ot,"verseSequenceIndicator",","),I(ot,"verseRangeSeparators",[ot.verseRangeSeparator]),I(ot,"verseSequenceIndicators",[ot.verseSequenceIndicator]),I(ot,"chapterDigitShifter",1e3),I(ot,"bookDigitShifter",ot.chapterDigitShifter*ot.chapterDigitShifter),I(ot,"bcvMaxValue",ot.chapterDigitShifter-1),I(ot,"ValidStatusType",Hn);class Qt extends Error{}const qn=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"Old Testament";case h.Section.NT:return r??"New Testament";case h.Section.DC:return o??"Deuterocanon";case h.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Sa=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"OT";case h.Section.NT:return r??"NT";case h.Section.DC:return o??"DC";case h.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Xt(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??P.bookIdToEnglishName(t)}function Je(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Yn=P.allBookIds.filter(t=>!P.isObsolete(P.bookIdToNumber(t))),Ot=Object.fromEntries(Yn.map(t=>[t,P.bookIdToEnglishName(t)]));function We(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const a=P.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(h.includes(a.toLowerCase(),o)||h.includes(t.toLowerCase(),o)||(i?h.includes(i.localizedName.toLowerCase(),o)||h.includes(i.localizedId.toLowerCase(),o):!1))}const Un=s.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:a,className:i,showCheck:w=!1,localizedBookNames:l,commandValue:u},c)=>{const p=s.useRef(!1),g=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},m=y=>{p.current=!0,o?o(y):r==null||r(t)},f=s.useMemo(()=>Xt(t,l),[t,l]),b=s.useMemo(()=>Je(t,l),[t,l]);return n.jsx("div",{className:d("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===h.Section.OT,"tw-border-s-purple-200":a===h.Section.NT,"tw-border-s-indigo-200":a===h.Section.DC,"tw-border-s-amber-200":a===h.Section.Extra}),children:n.jsxs(Rt,{ref:c,value:u||`${t} ${P.bookIdToEnglishName(t)}`,onSelect:g,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${P.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[w&&n.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:f}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),Jn=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),E=s.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...a},i)=>{const w=o?Ht.Slot:"button";return n.jsx(w,{className:d(Jn({variant:e,size:r,className:t})),ref:i,...a})});E.displayName="Button";const Ft=re.Root,Bt=re.Trigger,Tt=s.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},a)=>{const i=tt();return n.jsx(re.Portal,{children:n.jsx(re.Content,{ref:a,align:e,sideOffset:r,className:d("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Tt.displayName=re.Content.displayName;function Ke(t,e,r){return`${t} ${Ot[t]}${e?` ${Je(t,e)} ${Xt(t,e)}`:""}${r?` ${r}`:""}`}function Wn({recentSearches:t,onSearchItemSelect:e,renderItem:r=l=>String(l),getItemKey:o=l=>String(l),ariaLabel:a="Show recent searches",groupHeading:i="Recent",id:w}){const[l,u]=s.useState(!1);if(t.length===0)return;const c=p=>{e(p),u(!1)};return n.jsxs(Ft,{open:l,onOpenChange:u,children:[n.jsx(Bt,{asChild:!0,children:n.jsx(E,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:n.jsx(x.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Tt,{id:w,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(zt,{children:n.jsx(Gt,{children:n.jsx(kt,{heading:i,children:t.map(p=>n.jsxs(Rt,{onSelect:()=>c(p),className:"tw-flex tw-items-center",children:[n.jsx(x.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function _a(t,e,r=(a,i)=>a===i,o=15){return a=>{const i=t.filter(l=>!r(l,a)),w=[a,...i.slice(0,o-1)];e(w)}}const Pe={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ra=[Pe.BOOK_ONLY,Pe.BOOK_CHAPTER,Pe.BOOK_CHAPTER_VERSE];function Rn(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function ht(t){return h.getChaptersForBook(P.bookIdToNumber(t))}function Ta(t,e,r){if(!t.trim()||e.length===0)return;const o=Ra.reduce((a,i)=>{if(a)return a;const w=i.exec(t.trim());if(w){const[l,u=void 0,c=void 0]=w.slice(1);let p;const g=e.filter(m=>We(m,l,r));if(g.length===1&&([p]=g),!p&&u){if(P.isBookIdValid(l)){const m=l.toUpperCase();e.includes(m)&&(p=m)}if(!p&&r){const m=Array.from(r.entries()).find(([,f])=>f.localizedId.toLowerCase()===l.toLowerCase());m&&e.includes(m[0])&&([p]=m)}}if(!p&&u){const f=(b=>Object.keys(Ot).find(y=>Ot[y].toLowerCase()===b.toLowerCase()))(l);if(f&&e.includes(f)&&(p=f),!p&&r){const b=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===l.toLowerCase());b&&e.includes(b[0])&&([p]=b)}}if(p){let m=u?parseInt(u,10):void 0;m&&m>ht(p)&&(m=Math.max(ht(p),1));const f=c?parseInt(c,10):void 0;return{book:p,chapterNum:m,verseNum:f}}}},void 0);if(o)return o}function Ma(t,e,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const u=e.indexOf(t.book);if(u>0){const c=e[u-1],p=Math.max(ht(c),1);o({book:c,chapterNum:p,verseNum:1})}}},[t,e,o]),i=s.useCallback(()=>{const u=ht(t.book);if(t.chapterNum<u)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=e.indexOf(t.book);if(c<e.length-1){const p=e[c+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),w=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?x.ChevronsLeft:x.ChevronsRight},{onClick:w,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?x.ChevronLeft:x.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?x.ChevronRight:x.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===ht(t.book)||ht(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?x.ChevronsRight:x.ChevronsLeft}],[t,e,r,a,w,l,i])}function Tn({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:i}){if(t)return n.jsx(kt,{children:n.jsx("div",{className:d("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:ht(t)},(w,l)=>l+1).map(w=>n.jsx(Rt,{value:`${t} ${Ot[t]||""} ${w}`,onSelect:()=>r(w),ref:o(w),className:d("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&w===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(w))??!1}),children:w},w))})})}function Ea({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:i,recentSearches:w,onAddRecentSearch:l,id:u}){const c=tt(),[p,g]=s.useState(!1),[m,f]=s.useState(""),[b,y]=s.useState(""),[N,V]=s.useState("books"),[R,M]=s.useState(void 0),[H,z]=s.useState(!1),L=s.useRef(void 0),G=s.useRef(void 0),F=s.useRef(void 0),k=s.useRef(void 0),C=s.useRef({}),A=s.useCallback(v=>{e(v),l&&l(v)},[e,l]),T=s.useMemo(()=>o?o():Yn,[o]),Y=s.useMemo(()=>({[h.Section.OT]:T.filter(O=>P.isBookOT(O)),[h.Section.NT]:T.filter(O=>P.isBookNT(O)),[h.Section.DC]:T.filter(O=>P.isBookDC(O)),[h.Section.Extra]:T.filter(O=>P.extraBooks().includes(O))}),[T]),S=s.useMemo(()=>Object.values(Y).flat(),[Y]),K=s.useMemo(()=>{if(!b.trim())return Y;const v={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return[h.Section.OT,h.Section.NT,h.Section.DC,h.Section.Extra].forEach(W=>{v[W]=Y[W].filter(et=>We(et,b,a))}),v},[Y,b,a]),j=s.useMemo(()=>Ta(b,S,a),[b,S,a]),U=s.useCallback(()=>{j&&(A({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1}),g(!1),y(""),f(""))},[A,j]),bt=s.useCallback(v=>{if(ht(v)<=1){A({book:v,chapterNum:1,verseNum:1}),g(!1),y("");return}M(v),V("chapters")},[A]),$t=s.useCallback(v=>{const O=N==="chapters"?R:j==null?void 0:j.book;O&&(A({book:O,chapterNum:v,verseNum:1}),g(!1),V("books"),M(void 0),y(""))},[A,N,R,j]),Mt=s.useCallback(v=>{A(v),g(!1),y("")},[A]),_=Ma(t,S,c,e),J=s.useCallback(()=>{V("books"),M(void 0),setTimeout(()=>{G.current&&G.current.focus()},0)},[]),dt=s.useCallback(v=>{if(!v&&N==="chapters"){J();return}g(v),v&&(V("books"),M(void 0),y(""))},[N,J]),{otLong:pt,ntLong:xt,dcLong:Nn,extraLong:jn}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Vo=s.useCallback(v=>qn(v,pt,xt,Nn,jn),[pt,xt,Nn,jn]),Oo=s.useCallback(v=>j?!!j.chapterNum&&!v.toString().includes(j.chapterNum.toString()):!1,[j]),Po=s.useMemo(()=>h.formatScrRef(t,a?Xt(t.book,a):"English"),[t,a]),kn=s.useCallback(v=>O=>{C.current[v]=O},[]),Lo=s.useCallback(v=>{(v.key==="Home"||v.key==="End")&&v.stopPropagation()},[]),Ao=s.useCallback(v=>{if(v.ctrlKey)return;const{isLetter:O,isDigit:W}=Rn(v.key);if(N==="chapters"){if(v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),J();return}if(O||W){if(v.preventDefault(),v.stopPropagation(),V("books"),M(void 0),W&&R){const et=Ot[R];y(`${et} ${v.key}`)}else y(v.key);setTimeout(()=>{G.current&&G.current.focus()},0);return}}if((N==="chapters"||N==="books"&&j)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key)){const et=N==="chapters"?R:j==null?void 0:j.book;if(!et)return;const rt=(()=>{if(!m)return 1;const Zt=m.match(/(\d+)$/);return Zt?parseInt(Zt[1],10):0})(),Et=ht(et);if(!Et)return;let vt=rt;const Cn=6;switch(v.key){case"ArrowLeft":rt!==0&&(vt=rt>1?rt-1:Et);break;case"ArrowRight":rt!==0&&(vt=rt<Et?rt+1:1);break;case"ArrowUp":vt=rt===0?Et:Math.max(1,rt-Cn);break;case"ArrowDown":vt=rt===0?1:Math.min(Et,rt+Cn);break;default:return}vt!==rt&&(v.preventDefault(),v.stopPropagation(),f(Ke(et,a,vt)),setTimeout(()=>{const Zt=C.current[vt];Zt&&Zt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[N,j,J,R,m,a]),zo=s.useCallback(v=>{if(v.shiftKey||v.key==="Tab"||v.key===" ")return;const{isLetter:O,isDigit:W}=Rn(v.key);(O||W)&&(v.preventDefault(),y(et=>et+v.key),G.current.focus(),z(!1))},[]);return s.useLayoutEffect(()=>{const v=setTimeout(()=>{if(p&&N==="books"&&F.current&&k.current){const O=F.current,W=k.current,et=W.offsetTop,rt=O.clientHeight,Et=W.clientHeight,vt=et-rt/2+Et/2;O.scrollTo({top:Math.max(0,vt),behavior:"smooth"}),f(Ke(t.book))}},0);return()=>{clearTimeout(v)}},[p,N,b,j,t.book]),s.useLayoutEffect(()=>{if(N==="chapters"&&R){const v=R===t.book;setTimeout(()=>{if(F.current)if(v){const O=C.current[t.chapterNum];O&&O.scrollIntoView({block:"center",behavior:"smooth"})}else F.current.scrollTo({top:0});L.current&&L.current.focus()},0)}},[N,R,j,t.book,t.chapterNum]),n.jsxs(Ft,{open:p,onOpenChange:dt,children:[n.jsx(Bt,{asChild:!0,children:n.jsx(E,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:d("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Po})})}),n.jsx(Tt,{id:u,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(zt,{ref:L,onKeyDown:Ao,loop:!0,value:m,onValueChange:f,shouldFilter:!1,children:[N==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Yt,{ref:G,value:b,onValueChange:y,onKeyDown:Lo,onFocus:()=>z(!1),className:w&&w.length>0?"!tw-pr-10":""}),w&&w.length>0&&n.jsx(Wn,{recentSearches:w,onSearchItemSelect:Mt,renderItem:v=>h.formatScrRef(v,"English"),getItemKey:v=>`${v.book}-${v.chapterNum}-${v.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:_.map(({onClick:v,disabled:O,title:W,icon:et})=>n.jsx(E,{variant:"ghost",size:"sm",onClick:()=>{z(!0),v()},disabled:O,className:"tw-h-10 tw-w-4 tw-p-0",title:W,onKeyDown:zo,children:n.jsx(et,{})},W))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:J,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:c==="ltr"?n.jsx(x.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(x.ArrowRight,{className:"tw-h-4 tw-w-4"})}),R&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Xt(R,a)})]}),!H&&n.jsxs(Gt,{ref:F,children:[N==="books"&&n.jsxs(n.Fragment,{children:[!j&&Object.entries(K).map(([v,O])=>{if(O.length!==0)return n.jsx(kt,{heading:Vo(v),children:O.map(W=>n.jsx(Un,{bookId:W,onSelect:et=>bt(et),section:h.getSectionForBook(W),commandValue:`${W} ${Ot[W]}`,ref:W===t.book?k:void 0,localizedBookNames:a},W))},v)}),j&&n.jsx(kt,{children:n.jsx(Rt,{value:`${j.book} ${Ot[j.book]} ${j.chapterNum||""}:${j.verseNum||""})}`,onSelect:U,className:"tw-font-semibold tw-text-primary",children:h.formatScrRef({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1},a?Je(j.book,a):void 0)},"top-match")}),j&&ht(j.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Xt(j.book,a)}),n.jsx(Tn,{bookId:j.book,scrRef:t,onChapterSelect:$t,setChapterRef:kn,isChapterDimmed:Oo,className:"tw-px-4 tw-pb-4"})]})]}),N==="chapters"&&R&&n.jsx(Tn,{bookId:R,scrRef:t,onChapterSelect:$t,setChapterRef:kn,className:"tw-p-4"})]})]})})]})}const Ia=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Da=_t.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Z=s.forwardRef(({className:t,...e},r)=>n.jsx(Pn.Root,{ref:r,className:d("pr-twp",Da(),t),...e}));Z.displayName=Pn.Root.displayName;const Ce=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(oe.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});Ce.displayName=oe.Root.displayName;const ae=s.forwardRef(({className:t,...e},r)=>n.jsx(oe.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(oe.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ae.displayName=oe.Item.displayName;function Va(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function ge({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:a,value:i,onChange:w=()=>{},getOptionLabel:l=Va,icon:u=void 0,buttonPlaceholder:c="",textPlaceholder:p="",commandEmptyMessage:g="No option found",buttonVariant:m="outline",alignDropDown:f="start",isDisabled:b=!1,...y}){const[N,V]=s.useState(!1);return n.jsxs(Ft,{open:N,onOpenChange:V,...y,children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(E,{variant:m,role:"combobox","aria-expanded":N,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-pe-2",children:u}),n.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):c})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Tt,{align:f,className:d("tw-w-[200px] tw-p-0",a),children:n.jsxs(zt,{children:[n.jsx(Yt,{placeholder:p,className:"tw-text-inherit"}),n.jsx(le,{children:g}),n.jsx(Gt,{children:e.map(R=>n.jsxs(Rt,{value:l(R),onSelect:()=>{w(R),V(!1)},children:[n.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(R)})}),l(R)]},l(R)))})]})})]})}function Zn({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(c,p)=>p+1),[i]),l=c=>{r(c),c>e&&o(c)},u=c=>{o(c),c<t&&r(c)};return n.jsxs(n.Fragment,{children:[n.jsx(Z,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(ge,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:t},"start chapter"),n.jsx(Z,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(ge,{isDisabled:a,onChange:u,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:e},"end chapter")]})}var Qn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Qn||{});const Oa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Le=(t,e)=>t[e]??e;function Pa({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:u,localizedStrings:c}){const p=Le(c,"%webView_bookSelector_currentBook%"),g=Le(c,"%webView_bookSelector_choose%"),m=Le(c,"%webView_bookSelector_chooseBooks%"),[f,b]=s.useState("current book"),y=N=>{b(N),t(N)};return n.jsx(Ce,{className:"pr-twp tw-flex",value:f,onValueChange:N=>y(N),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ae,{value:"current book"}),n.jsx(Z,{className:"tw-ms-1",children:p})]}),n.jsx(Z,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Zn,{isDisabled:f==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:w,chapterCount:a,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ae,{value:"choose books"}),n.jsx(Z,{className:"tw-ms-1",children:m})]}),n.jsx(Z,{className:"tw-flex tw-items-center",children:o.map(N=>P.bookIdToEnglishName(N)).join(", ")}),n.jsx(E,{disabled:f==="current book",onClick:()=>r(),children:g})]})]})})}const Ze=s.createContext(void 0);function ct(){const t=s.useContext(Ze);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const yt=_t.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Se=B.Trigger,Qe=B.Group,tr=B.Portal,er=B.Sub,nr=B.RadioGroup;function ce({variant:t="default",...e}){const r=s.useMemo(()=>({variant:t}),[t]);return n.jsx(Ze.Provider,{value:r,children:n.jsx(B.Root,{...e})})}const tn=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=ct();return n.jsxs(B.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,yt({variant:i.variant})),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});tn.displayName=B.SubTrigger.displayName;const en=s.forwardRef(({className:t,...e},r)=>n.jsx(B.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));en.displayName=B.SubContent.displayName;const Jt=s.forwardRef(({className:t,sideOffset:e=4,children:r,...o},a)=>{const i=tt();return n.jsx(B.Portal,{children:n.jsx(B.Content,{ref:a,sideOffset:e,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Jt.displayName=B.Content.displayName;const nn=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=tt(),i=ct();return n.jsx(B.Item,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,yt({variant:i.variant})),...r,dir:a})});nn.displayName=B.Item.displayName;const _e=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=ct();return n.jsxs(B.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,yt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});_e.displayName=B.CheckboxItem.displayName;const rn=s.forwardRef(({className:t,children:e,...r},o)=>{const a=ct();return n.jsxs(B.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,yt({variant:a.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});rn.displayName=B.RadioItem.displayName;const Re=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(B.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Re.displayName=B.Label.displayName;const de=s.forwardRef(({className:t,...e},r)=>n.jsx(B.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));de.displayName=B.Separator.displayName;function rr({className:t,...e}){return n.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}rr.displayName="DropdownMenuShortcut";function La({table:t}){return n.jsxs(ce,{children:[n.jsx(Vn.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(E,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Jt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Re,{children:"Toggle columns"}),n.jsx(de,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(_e,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const Lt=q.Root,or=q.Group,At=q.Value,ar=_t.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Ct=s.forwardRef(({className:t,children:e,size:r,...o},a)=>{const i=tt();return n.jsxs(q.Trigger,{className:d(ar({size:r,className:t})),ref:a,...o,dir:i,children:[e,n.jsx(q.Icon,{asChild:!0,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Ct.displayName=q.Trigger.displayName;const on=s.forwardRef(({className:t,...e},r)=>n.jsx(q.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));on.displayName=q.ScrollUpButton.displayName;const an=s.forwardRef(({className:t,...e},r)=>n.jsx(q.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));an.displayName=q.ScrollDownButton.displayName;const St=s.forwardRef(({className:t,children:e,position:r="popper",...o},a)=>{const i=tt();return n.jsx(q.Portal,{children:n.jsxs(q.Content,{ref:a,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(on,{}),n.jsx(q.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(an,{})]})})});St.displayName=q.Content.displayName;const sr=s.forwardRef(({className:t,...e},r)=>n.jsx(q.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));sr.displayName=q.Label.displayName;const wt=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(q.Item,{ref:o,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(q.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(q.ItemText,{children:e})]}));wt.displayName=q.Item.displayName;const ir=s.forwardRef(({className:t,...e},r)=>n.jsx(q.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ir.displayName=q.Separator.displayName;function Aa({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(Lt,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Ct,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(At,{placeholder:t.getState().pagination.pageSize})}),n.jsx(St,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(wt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Mn=`
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
`;function za(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function se(t,e){const r=e?`${Mn}, ${e}`:Mn;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&za(o))}const pe=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const w=a.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{se(w,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};l();const u=new MutationObserver(()=>{l()});return u.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{u.disconnect()}},[]);const i=w=>{const{current:l}=a;if(l){if(w.key==="ArrowDown"){w.preventDefault(),se(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return n.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});pe.displayName="Table";const ue=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:d({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));ue.displayName="TableHeader";const me=s.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...e}));me.displayName="TableBody";const wr=s.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));wr.displayName="TableFooter";function Ga(t){s.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?se(t.current):[],i=a.indexOf(document.activeElement),w=o.key==="ArrowRight"?i+1:i-1;w>=0&&w<a.length&&a[w].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Fa(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ba(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const ft=s.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),Ga(w);const l=s.useMemo(()=>w.current?se(w.current):[],[w]),u=s.useCallback(p=>{const{current:g}=w;if(!g||!g.parentElement)return;const m=g.closest("table"),f=m?se(m).filter(N=>N.tagName==="TR"):[],b=f.indexOf(g),y=l.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Ba(f,b,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Fa(l,y,p.key);else if(p.key==="Escape"){p.preventDefault();const N=g.closest("table");N&&N.focus()}e==null||e(p)},[w,l,e]),c=s.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:u,onFocus:c,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});ft.displayName="TableRow";const Kt=s.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Kt.displayName="TableHead";const jt=s.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));jt.displayName="TableCell";const lr=s.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));lr.displayName="TableCaption";function be({className:t,...e}){return n.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function cr({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{},id:l,isLoading:u=!1,noResultsMessage:c}){var L;const[p,g]=s.useState([]),[m,f]=s.useState([]),[b,y]=s.useState({}),[N,V]=s.useState({}),R=s.useMemo(()=>e??[],[e]),M=nt.useReactTable({data:R,columns:t,getCoreRowModel:nt.getCoreRowModel(),...r&&{getPaginationRowModel:nt.getPaginationRowModel()},onSortingChange:g,getSortedRowModel:nt.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:nt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:V,state:{sorting:p,columnFilters:m,columnVisibility:b,rowSelection:N}}),H=M.getVisibleFlatColumns();let z;return u?z=Array.from({length:10}).map((k,C)=>`skeleton-row-${C}`).map(k=>n.jsx(ft,{children:n.jsx(jt,{colSpan:H.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(be,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},k)):((L=M.getRowModel().rows)==null?void 0:L.length)>0?z=M.getRowModel().rows.map(G=>n.jsx(ft,{onClick:()=>w(G,M),"data-state":G.getIsSelected()&&"selected",children:G.getVisibleCells().map(F=>n.jsx(jt,{children:nt.flexRender(F.column.columnDef.cell,F.getContext())},F.id))},G.id)):z=n.jsx(ft,{children:n.jsx(jt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:c})}),n.jsxs("div",{className:"pr-twp",id:l,children:[a&&n.jsx(La,{table:M}),n.jsxs(pe,{stickyHeader:i,children:[n.jsx(ue,{stickyHeader:i,children:M.getHeaderGroups().map(G=>n.jsx(ft,{children:G.headers.map(F=>n.jsx(Kt,{children:F.isPlaceholder?void 0:nt.flexRender(F.column.columnDef.header,F.getContext())},F.id))},G.id))}),n.jsx(me,{children:z})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(E,{variant:"outline",size:"sm",onClick:()=>M.previousPage(),disabled:!M.getCanPreviousPage(),children:"Previous"}),n.jsx(E,{variant:"outline",size:"sm",onClick:()=>M.nextPage(),disabled:!M.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Aa,{table:M})]})}function $a({id:t,markdown:e,className:r,anchorTarget:o}){const a=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:n.jsx(qo,{options:a,children:e})})}const dr=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),En=(t,e)=>t[e]??e;function pr({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const a=En(r,"%webView_error_dump_header%"),i=En(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(E,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:n.jsx(x.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Xa=Object.freeze([...dr,"%webView_error_dump_copied_message%"]);function Ka({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:a,id:i}){const[w,l]=s.useState(!1),u=()=>{l(!0),e&&e()},c=p=>{p||l(!1)};return n.jsxs(Ft,{onOpenChange:c,children:[n.jsx(Bt,{asChild:!0,children:o}),n.jsxs(Tt,{id:i,className:d("tw-min-w-80 tw-max-w-96",a),children:[w&&r["%webView_error_dump_copied_message%"]&&n.jsx(Z,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(pr,{errorDetails:t,handleCopyNotify:u,localizedStrings:r})]})]})}var ur=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(ur||{});function Ha({id:t,label:e,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((c,p)=>c.itemType===0?[p,[]]:void 0).filter(c=>!!c))),[i,w]=s.useState({}),l=(c,p)=>{const g=!o[c][p];a(f=>(f[c][p]=g,{...f}));const m=r[c].items[p];m.onUpdate(m.id,g)},u=(c,p)=>{w(m=>(m[c]=p,{...m}));const g=r[c].items.find(m=>m.id===p);g?g.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ce,{children:[n.jsx(Se,{asChild:!0,children:n.jsxs(E,{variant:"default",children:[n.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Jt,{children:r.map((c,p)=>n.jsxs("div",{children:[n.jsx(Re,{children:c.label}),n.jsx(Qe,{children:c.itemType===0?n.jsx(n.Fragment,{children:c.items.map((g,m)=>n.jsx("div",{children:n.jsx(_e,{checked:o[p][m],onCheckedChange:()=>l(p,m),children:g.label})},g.id))}):n.jsx(nr,{value:i[p],onValueChange:g=>u(p,g),children:c.items.map(g=>n.jsx("div",{children:n.jsx(rn,{value:g.id,children:g.label})},g.id))})}),n.jsx(de,{})]},c.label))})]})})}function qa({id:t,category:e,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const u=new h.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,g)=>p+g,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(x.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||w)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(E,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(E,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Ya({id:t,versionHistory:e}){const[r,o]=s.useState(!1),a=new Date;function i(l){const u=new Date(l),c=new Date(a.getTime()-u.getTime()),p=c.getUTCFullYear()-1970,g=c.getUTCMonth(),m=c.getUTCDate()-1;let f="";return p>0?f=`${p.toString()} year${p===1?"":"s"} ago`:g>0?f=`${g.toString()} month${g===1?"":"s"} ago`:m===0?f="today":f=`${m.toString()} day${m===1?"":"s"} ago`,f}const w=Object.entries(e).sort((l,u)=>u[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What’s new"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ua({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:a,currentVersion:i}){const w=s.useMemo(()=>h.formatBytes(r),[r]),u=(c=>{const p=new Intl.DisplayNames(h.getCurrentLocale(),{type:"language"});return c.map(g=>p.of(g))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&n.jsx(Ya,{versionHistory:a}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:w})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:u.join(", ")})]})})]})]})]})})}const mr=_t.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ie=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:d("pr-twp",mr({variant:e}),t),...r}));ie.displayName="Badge";function hr({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:a=!1,selectAllText:i="Select All",clearAllText:w="Clear All",commandEmptyMessage:l="No entries found",customSelectedText:u,isOpen:c=void 0,onOpenChange:p=void 0,isDisabled:g=!1,sortSelected:m=!1,icon:f=void 0,className:b=void 0,variant:y="ghost",id:N}){const[V,R]=s.useState(!1),M=s.useCallback(C=>{var T;const A=(T=t.find(Y=>Y.label===C))==null?void 0:T.value;A&&r(e.includes(A)?e.filter(Y=>Y!==A):[...e,A])},[t,e,r]),H=()=>u||o,z=s.useMemo(()=>{if(!m)return t;const C=t.filter(T=>T.starred).sort((T,Y)=>T.label.localeCompare(Y.label)),A=t.filter(T=>!T.starred).sort((T,Y)=>{const S=e.includes(T.value),K=e.includes(Y.value);return S&&!K?-1:!S&&K?1:T.label.localeCompare(Y.label)});return[...C,...A]},[t,e,m]),L=()=>{r(t.map(C=>C.value))},G=()=>{r([])},F=c??V,k=p??R;return n.jsx("div",{id:N,className:b,children:n.jsxs(Ft,{open:F,onOpenChange:k,children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(E,{variant:y,role:"combobox","aria-expanded":F,className:"tw-group tw-w-full tw-justify-between",disabled:g,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[f&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:f})}),n.jsx("div",{className:"tw-font-normal",children:H()})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Tt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(zt,{children:[n.jsx(Yt,{placeholder:`Search ${o.toLowerCase()}...`}),a&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:L,children:i}),n.jsx(E,{variant:"ghost",size:"sm",onClick:G,children:w})]}),n.jsxs(Gt,{children:[n.jsx(le,{children:l}),n.jsx(kt,{children:z.map(C=>n.jsxs(Rt,{value:C.label,onSelect:M,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(x.Check,{className:d("tw-h-4 tw-w-4",e.includes(C.value)?"tw-opacity-100":"tw-opacity-0")})}),C.starred&&n.jsx(x.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:C.label}),C.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:C.secondaryLabel})]},C.label))})]})]})})]})})}function Ja({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:u,className:c,badgesPlaceholder:p,id:g}){return n.jsxs("div",{id:g,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(hr,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:u,className:c}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(m=>{var f;return n.jsxs(ie,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(E,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(b=>b!==m)),children:n.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(f=t.find(b=>b.value===m))==null?void 0:f.label]},m)})}):n.jsx(Z,{children:p})]})}function fr(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(a=>typeof a=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Wa(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const a=[],i=[];let w=[];return e.forEach(l=>{typeof l!="string"&&l.marker==="fp"?(w.length>0&&i.push(w),w=[l]):w.push(l)}),w.length>0&&i.push(w),i.map((l,u)=>{const c=u===i.length-1;return n.jsxs("p",{className:"tw-mb-2",children:[sn(t,l,r,!0,a),c&&o]},fr(t,l))})}function sn(t,e,r=!0,o=!0,a=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const w=`${t}-text-${i.slice(0,10)}`;if(o){const l=d(`usfm_${t}`);return n.jsx("span",{className:l,children:i},w)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(x.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(x.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},w)}return Za(i,fr(`${t}\\${i.marker}`,[i]),r,[...a,t??"unknown"])})}function Za(t,e,r,o=[]){const{marker:a}=t;return n.jsxs("span",{children:[a?r&&n.jsx("span",{className:"marker",children:`\\${a} `}):n.jsx(x.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),sn(a,t.content,r,!0,[...o,a??"unknown"])]},e)}function gr({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const a=r?r(t.caller):t.caller,i=a!==t.caller;let w,l=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([w,...l]=t.content);const u=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,c=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=n.jsxs(n.Fragment,{children:[a&&n.jsxs("span",{className:d("note-caller",{formatted:i}),children:[a," "]}),w&&n.jsxs(n.Fragment,{children:[sn(t.marker,[w],o,!1)," "]})]}),f=d(e==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:d("textual-note-header tw-text-nowrap tw-pr-2",f),children:[u,p]}),n.jsx("div",{className:d("textual-note-body",f),children:l&&l.length>0&&n.jsx(n.Fragment,{children:Wa(t.marker,l,o,c)})})]})}const wn=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));wn.displayName="Card";const br=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));br.displayName="CardHeader";const xr=s.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));xr.displayName="CardTitle";const vr=s.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));vr.displayName="CardDescription";const yr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...e}));yr.displayName="CardContent";const Nr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Nr.displayName="CardFooter";const Qa=(t,e)=>t[e]??e;function ts({className:t,footnotes:e,layout:r="horizontal",listId:o,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:w=!1,formatCaller:l,onFootnoteSelected:u,localizedStrings:c}){const p=c?Qa(c,"%webView_footnoteList_header%"):"Footnotes",g=l??h.getFormatCallerFunction(e,void 0),m=f=>{u&&u(f)};return n.jsxs(n.Fragment,{children:[r==="vertical"&&n.jsx("div",{className:"tw-mb-2 tw-font-semibold",children:p}),n.jsx("div",{role:"listbox","aria-label":"Footnotes",className:d(r==="horizontal"?"tw-table tw-border-collapse":"tw-flex tw-flex-col tw-gap-1",!w&&"formatted-font",t),children:e.map((f,b)=>{const y=f===a,N=`${o}-${b}`;return n.jsx(wn,{role:"option","aria-selected":y,"data-marker":f.marker,className:d(u&&"tw-cursor-pointer","tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none",y&&"tw-bg-muted/70",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-px-1 tw-py-0 tw-text-sm"),onClick:()=>m(f),children:n.jsx(gr,{footnote:f,layout:r,formatCaller:()=>g(f.caller,b),showMarkers:i})},N)})})]})}function es({occurrenceData:t,setScriptureReference:e,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(u=>h.deepEqual(u,l))||w.push(l)}),w},[t]);return n.jsxs(pe,{stickyHeader:!0,children:[n.jsx(ue,{stickyHeader:!0,children:n.jsxs(ft,{children:[n.jsx(Kt,{children:o}),n.jsx(Kt,{children:a})]})}),n.jsx(me,{children:i.length>0&&i.map(w=>n.jsxs(ft,{onClick:()=>{e(w.reference)},children:[n.jsx(jt,{children:`${P.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),n.jsx(jt,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Te=s.forwardRef(({className:t,...e},r)=>n.jsx(Be.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Be.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));Te.displayName=Be.Root.displayName;const Wt=s.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Wt.displayName="Input";const jr=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ns=s.forwardRef(({className:t,variant:e,size:r,...o},a)=>n.jsx(Ln.Root,{ref:a,className:d(jr({variant:e,size:r,className:t})),...o}));ns.displayName=Ln.Root.displayName;const kr=s.createContext({size:"default",variant:"default"}),ln=s.forwardRef(({className:t,variant:e,size:r,children:o,...a},i)=>{const w=tt();return n.jsx(ke.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:w,children:n.jsx(kr.Provider,{value:{variant:e,size:r},children:o})})});ln.displayName=ke.Root.displayName;const ne=s.forwardRef(({className:t,children:e,variant:r,size:o,...a},i)=>{const w=s.useContext(kr);return n.jsx(ke.Item,{ref:i,className:d(jr({variant:w.variant||r,size:w.size||o}),t),...a,children:e})});ne.displayName=ke.Item.displayName;const Me=t=>t==="asc"?n.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),rs=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(E,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Me(e.getIsSorted())]})}),os=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(E,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Me(r.getIsSorted())]})}),as=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(E,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Me(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Ae=(t,e,r,o,a,i)=>{let w=[...r];t.forEach(u=>{e==="approved"?w.includes(u)||w.push(u):w=w.filter(c=>c!==u)}),o(w);let l=[...a];t.forEach(u=>{e==="unapproved"?l.includes(u)||l.push(u):l=l.filter(c=>c!==u)}),i(l)},ss=(t,e,r,o,a)=>({accessorKey:"status",header:({column:i})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(E,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Me(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return n.jsxs(ln,{value:w,variant:"outline",type:"single",children:[n.jsx(ne,{onClick:u=>{u.stopPropagation(),Ae([l],"approved",e,r,o,a)},value:"approved",children:n.jsx(x.CircleCheckIcon,{})}),n.jsx(ne,{onClick:u=>{u.stopPropagation(),Ae([l],"unapproved",e,r,o,a)},value:"unapproved",children:n.jsx(x.CircleXIcon,{})}),n.jsx(ne,{onClick:u=>{u.stopPropagation(),Ae([l],"unknown",e,r,o,a)},value:"unknown",children:n.jsx(x.CircleHelpIcon,{})})]})}}),is=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ws=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},ls=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Cr=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",cs=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),ds=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(a=>e==="approved"&&a.status==="approved"||e==="unapproved"&&a.status==="unapproved"||e==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},ps=(t,e,r)=>{const o=[];return t.forEach(a=>{const i=o.find(w=>h.deepEqual(w.items,h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:a.verseRef,text:a.verse});else{const w={items:h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:Cr(h.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],e,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(w)}}),o},ut=(t,e)=>t[e]??e;function us({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,scope:w,onScopeChange:l,columns:u,id:c,areInventoryItemsLoading:p=!1}){const g=ut(r,"%webView_inventory_all%"),m=ut(r,"%webView_inventory_approved%"),f=ut(r,"%webView_inventory_unapproved%"),b=ut(r,"%webView_inventory_unknown%"),y=ut(r,"%webView_inventory_scope_currentBook%"),N=ut(r,"%webView_inventory_scope_chapter%"),V=ut(r,"%webView_inventory_scope_verse%"),R=ut(r,"%webView_inventory_filter_text%"),M=ut(r,"%webView_inventory_show_additional_items%"),H=ut(r,"%webView_inventory_no_results%"),[z,L]=s.useState(!1),[G,F]=s.useState("all"),[k,C]=s.useState(""),[A,T]=s.useState([]),Y=s.useMemo(()=>{const _=t??[];return _.length===0?[]:ps(_,a,i)},[t,a,i]),S=s.useMemo(()=>{if(z)return Y;const _=[];return Y.forEach(J=>{const dt=J.items[0],pt=_.find(xt=>xt.items[0]===dt);pt?(pt.count+=J.count,pt.occurrences=pt.occurrences.concat(J.occurrences)):_.push({items:[dt],count:J.count,occurrences:J.occurrences,status:J.status})}),_},[z,Y]),K=s.useMemo(()=>S.length===0?[]:ds(S,G,k),[S,G,k]),j=s.useMemo(()=>{var dt,pt;if(!z)return u;const _=(dt=o==null?void 0:o.tableHeaders)==null?void 0:dt.length;if(!_)return u;const J=[];for(let xt=0;xt<_;xt++)J.push(os(((pt=o==null?void 0:o.tableHeaders)==null?void 0:pt[xt])||"Additional Item",xt+1));return[...J,...u]},[o==null?void 0:o.tableHeaders,u,z]);s.useEffect(()=>{K.length===0?T([]):K.length===1&&T(K[0].items)},[K]);const U=(_,J)=>{J.setRowSelection(()=>{const dt={};return dt[_.index]=!0,dt}),T(_.original.items)},bt=_=>{if(_==="book"||_==="chapter"||_==="verse")l(_);else throw new Error(`Invalid scope value: ${_}`)},$t=_=>{if(_==="all"||_==="approved"||_==="unapproved"||_==="unknown")F(_);else throw new Error(`Invalid status filter value: ${_}`)},Mt=s.useMemo(()=>{if(S.length===0||A.length===0)return[];const _=S.filter(J=>h.deepEqual(z?J.items:[J.items[0]],A));if(_.length>1)throw new Error("Selected item is not unique");return _.length===0?[]:_[0].occurrences},[A,z,S]);return n.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(Lt,{onValueChange:_=>$t(_),defaultValue:G,children:[n.jsx(Ct,{className:"tw-m-1",children:n.jsx(At,{placeholder:"Select filter"})}),n.jsxs(St,{children:[n.jsx(wt,{value:"all",children:g}),n.jsx(wt,{value:"approved",children:m}),n.jsx(wt,{value:"unapproved",children:f}),n.jsx(wt,{value:"unknown",children:b})]})]}),n.jsxs(Lt,{onValueChange:_=>bt(_),defaultValue:w,children:[n.jsx(Ct,{className:"tw-m-1",children:n.jsx(At,{placeholder:"Select scope"})}),n.jsxs(St,{children:[n.jsx(wt,{value:"book",children:y}),n.jsx(wt,{value:"chapter",children:N}),n.jsx(wt,{value:"verse",children:V})]})]}),n.jsx(Wt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:R,value:k,onChange:_=>{C(_.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(Te,{className:"tw-m-1",checked:z,onCheckedChange:_=>{L(_)}}),n.jsx(Z,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??M})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(cr,{columns:j,data:K,onRowClickHandler:U,stickyHeader:!0,isLoading:p,noResultsMessage:H})}),Mt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(es,{occurrenceData:Mt,setScriptureReference:e,localizedStrings:r})})]})}const Ee=s.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},a)=>n.jsx(An.Root,{ref:a,decorative:r,orientation:e,className:d("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Ee.displayName=An.Root.displayName;const Ie=we.Provider,De=we.Root,Ve=we.Trigger,he=s.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(we.Content,{ref:o,sideOffset:e,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));he.displayName=we.Content.displayName;const ms="16rem",hs="3rem",Sr=s.createContext(void 0);function fe(){const t=s.useContext(Sr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const cn=s.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:a,children:i,side:w="primary",...l},u)=>{const[c,p]=s.useState(t),g=e??c,m=s.useCallback(M=>{const H=typeof M=="function"?M(g):M;r?r(H):p(H)},[r,g]),f=s.useCallback(()=>m(M=>!M),[m]),b=g?"expanded":"collapsed",V=tt()==="ltr"?w:w==="primary"?"secondary":"primary",R=s.useMemo(()=>({state:b,open:g,setOpen:m,toggleSidebar:f,side:V}),[b,g,m,f,V]);return n.jsx(Sr.Provider,{value:R,children:n.jsx(Ie,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":ms,"--sidebar-width-icon":hs,...a},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:u,...l,children:i})})})});cn.displayName="SidebarProvider";const dn=s.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...a},i)=>{const w=fe();return e==="none"?n.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...a,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?e:"","data-variant":t,"data-side":w.side,children:[n.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});dn.displayName="Sidebar";const _r=s.forwardRef(({className:t,onClick:e,...r},o)=>{const a=fe();return n.jsxs(E,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),a.toggleSidebar()},...r,children:[a.side==="primary"?n.jsx(x.PanelLeft,{}):n.jsx(x.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});_r.displayName="SidebarTrigger";const Rr=s.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=fe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Rr.displayName="SidebarRail";const pn=s.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));pn.displayName="SidebarInset";const Tr=s.forwardRef(({className:t,...e},r)=>n.jsx(Wt,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));Tr.displayName="SidebarInput";const Mr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Mr.displayName="SidebarHeader";const Er=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Er.displayName="SidebarFooter";const Ir=s.forwardRef(({className:t,...e},r)=>n.jsx(Ee,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ir.displayName="SidebarSeparator";const un=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));un.displayName="SidebarContent";const xe=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));xe.displayName="SidebarGroup";const ve=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Ht.Slot:"div";return n.jsx(a,{ref:o,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ve.displayName="SidebarGroupLabel";const Dr=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Ht.Slot:"button";return n.jsx(a,{ref:o,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Dr.displayName="SidebarGroupAction";const ye=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...e}));ye.displayName="SidebarGroupContent";const mn=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));mn.displayName="SidebarMenu";const hn=s.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...e}));hn.displayName="SidebarMenuItem";const fs=_t.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),fn=s.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:a,className:i,...w},l)=>{const u=t?Ht.Slot:"button",{state:c}=fe(),p=n.jsx(u,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:d(fs({variant:r,size:o}),i),...w});return a?(typeof a=="string"&&(a={children:a}),n.jsxs(De,{children:[n.jsx(Ve,{asChild:!0,children:p}),n.jsx(he,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):p});fn.displayName="SidebarMenuButton";const Vr=s.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},a)=>{const i=e?Ht.Slot:"button";return n.jsx(i,{ref:a,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Vr.displayName="SidebarMenuAction";const Or=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Or.displayName="SidebarMenuBadge";const Pr=s.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(be,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(be,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});Pr.displayName="SidebarMenuSkeleton";const Lr=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Lr.displayName="SidebarMenuSub";const Ar=s.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Ar.displayName="SidebarMenuSubItem";const zr=s.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...a},i)=>{const w=t?Ht.Slot:"a";return n.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});zr.displayName="SidebarMenuSubButton";function Gr({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:u}){const c=s.useCallback((m,f)=>{o(m,f)},[o]),p=s.useCallback(m=>{const f=r.find(b=>b.projectId===m);return f?f.projectName:m},[r]),g=s.useCallback(m=>!a.projectId&&m===a.label,[a]);return n.jsx(dn,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",u),children:n.jsxs(un,{children:[n.jsxs(xe,{children:[n.jsx(ve,{className:"tw-text-sm",children:i}),n.jsx(ye,{children:n.jsx(mn,{children:Object.entries(e).map(([m,f])=>n.jsx(hn,{children:n.jsx(fn,{onClick:()=>c(m),isActive:g(m),children:n.jsx("span",{className:"tw-pl-3",children:f})})},m))})})]}),n.jsxs(xe,{children:[n.jsx(ve,{className:"tw-text-sm",children:w}),n.jsx(ye,{className:"tw-pl-3",children:n.jsx(ge,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:p,buttonPlaceholder:l,onChange:m=>{const f=p(m);c(f,m)},value:(a==null?void 0:a.projectId)??void 0,icon:n.jsx(x.ScrollText,{})})})]})]})})}const Oe=s.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:a,isDisabled:i=!1,id:w},l)=>{const u=tt();return n.jsxs("div",{id:w,className:d("tw-relative",{"tw-w-full":o},a),children:[n.jsx(x.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":u==="rtl"},{"tw-left-3":u==="ltr"})}),n.jsx(Wt,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>e(c.target.value),disabled:i}),t&&n.jsxs(E,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":u==="rtl"},{"tw-right-0":u==="ltr"}),onClick:()=>{e("")},children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Oe.displayName="SearchBar";function gs({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Oe,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(cn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Gr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:i,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}),n.jsx(pn,{className:"tw-min-w-[215px]",children:o})]})]})}const Nt="scrBook",bs="scrRef",Vt="source",xs="details",vs="Scripture Reference",ys="Scripture Book",Fr="Type",Ns="Details";function js(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Nt,header:(t==null?void 0:t.scriptureReferenceColumnName)??vs,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?P.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===Nt?h.formatScrRef(a.start):void 0},getGroupingValue:o=>P.bookIdToNumber(o.start.book),sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>h.formatScrRef(o.start),id:bs,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:h.formatScrRef(a.start)},sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Vt,header:r?(t==null?void 0:t.typeColumnName)??Fr:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:xs,header:(t==null?void 0:t.detailsColumnName)??Ns,cell:o=>o.getValue(),enableGrouping:!1}]}const ks=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||h.compareScrRefs(t.start,t.end)===0?`${h.scrRefToBBBCCCVVV(t.start)}+${e}`:`${h.scrRefToBBBCCCVVV(t.start)}+${e}-${h.scrRefToBBBCCCVVV(t.end)}+${r}`},In=t=>`${ks({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Cs({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:i,detailsColumnName:w,onRowSelected:l,id:u}){const[c,p]=s.useState([]),[g,m]=s.useState([{id:Nt,desc:!1}]),[f,b]=s.useState({}),y=s.useMemo(()=>t.flatMap(k=>k.data.map(C=>({...C,source:k.source}))),[t]),N=s.useMemo(()=>js({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:w},r),[o,i,w,r]);s.useEffect(()=>{c.includes(Vt)?m([{id:Vt,desc:!1},{id:Nt,desc:!1}]):m([{id:Nt,desc:!1}])},[c]);const V=nt.useReactTable({data:y,columns:N,state:{grouping:c,sorting:g,rowSelection:f},onGroupingChange:p,onSortingChange:m,onRowSelectionChange:b,getExpandedRowModel:nt.getExpandedRowModel(),getGroupedRowModel:nt.getGroupedRowModel(),getCoreRowModel:nt.getCoreRowModel(),getSortedRowModel:nt.getSortedRowModel(),getRowId:In,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const k=V.getSelectedRowModel().rowsById,C=Object.keys(k);if(C.length===1){const A=y.find(T=>In(T)===C[0])||void 0;A&&l(A)}}},[f,y,l,V]);const R=a??ys,M=i??Fr,H=[{label:"No Grouping",value:[]},{label:`Group by ${R}`,value:[Nt]},{label:`Group by ${M}`,value:[Vt]},{label:`Group by ${R} and ${M}`,value:[Nt,Vt]},{label:`Group by ${M} and ${R}`,value:[Vt,Nt]}],z=k=>{p(JSON.parse(k))},L=(k,C)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(C)},G=(k,C)=>k.getIsGrouped()?"":d("banded-row",C%2===0?"even":"odd"),F=(k,C,A)=>{if(!((k==null?void 0:k.length)===0||C.depth<A.column.getGroupedIndex())){if(C.getIsGrouped())switch(C.depth){case 1:return"tw-ps-4";default:return}switch(C.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(Lt,{value:JSON.stringify(c),onValueChange:k=>{z(k)},children:[n.jsx(Ct,{className:"tw-mb-1 tw-mt-2",children:n.jsx(At,{})}),n.jsx(St,{position:"item-aligned",children:n.jsx(or,{children:H.map(k=>n.jsx(wt,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),n.jsxs(pe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(ue,{children:V.getHeaderGroups().map(k=>n.jsx(ft,{children:k.headers.filter(C=>C.column.columnDef.header).map(C=>n.jsx(Kt,{colSpan:C.colSpan,className:"top-0 tw-sticky",children:C.isPlaceholder?void 0:n.jsxs("div",{children:[C.column.getCanGroup()?n.jsx(E,{variant:"ghost",title:`Toggle grouping by ${C.column.columnDef.header}`,onClick:C.column.getToggleGroupingHandler(),type:"button",children:C.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",nt.flexRender(C.column.columnDef.header,C.getContext())]})},C.id))},k.id))}),n.jsx(me,{children:V.getRowModel().rows.map((k,C)=>{const A=tt();return n.jsx(ft,{"data-state":k.getIsSelected()?"selected":"",className:d(G(k,C)),onClick:T=>L(k,T),children:k.getVisibleCells().map(T=>{if(!(T.getIsPlaceholder()||T.column.columnDef.enableGrouping&&!T.getIsGrouped()&&(T.column.columnDef.id!==Vt||!r)))return n.jsx(jt,{className:d(T.column.columnDef.id,"tw-p-[1px]",F(c,k,T)),children:T.getIsGrouped()?n.jsxs(E,{variant:"link",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()&&n.jsx(x.ChevronDown,{}),!k.getIsExpanded()&&(A==="ltr"?n.jsx(x.ChevronRight,{}):n.jsx(x.ChevronLeft,{}))," ",nt.flexRender(T.column.columnDef.cell,T.getContext())," (",k.subRows.length,")"]}):nt.flexRender(T.column.columnDef.cell,T.getContext())},T.id)})},k.id)})})]})]})}const gn=(t,e)=>t.filter(r=>{try{return h.getSectionForBook(r)===e}catch{return!1}}),Br=(t,e,r)=>gn(t,e).every(o=>r.includes(o));function Ss({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:a}){const i=gn(e,t).length===0,w=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],u=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return n.jsx(E,{variant:"outline",size:"sm",onClick:()=>o(t),className:d(Br(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Sa(t,w,l,u,c)})}const Dn=5,ze=6;function _s({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const i=o["%webView_book_selector_books_selected%"],w=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],u=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],g=o["%webView_book_selector_more%"],{otLong:m,ntLong:f,dcLong:b,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[N,V]=s.useState(!1),[R,M]=s.useState(""),H=s.useRef(void 0),z=s.useRef(!1);if(t.length!==P.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const L=s.useMemo(()=>P.allBookIds.filter((S,K)=>t[K]==="1"&&!P.isObsolete(P.bookIdToNumber(S))),[t]),G=s.useMemo(()=>{if(!R.trim()){const j={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return L.forEach(U=>{const bt=h.getSectionForBook(U);j[bt].push(U)}),j}const S=L.filter(j=>We(j,R,a)),K={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return S.forEach(j=>{const U=h.getSectionForBook(j);K[U].push(j)}),K},[L,R,a]),F=s.useCallback((S,K=!1)=>{if(!K||!H.current){r(e.includes(S)?e.filter(_=>_!==S):[...e,S]),H.current=S;return}const j=L.findIndex(_=>_===H.current),U=L.findIndex(_=>_===S);if(j===-1||U===-1)return;const[bt,$t]=[Math.min(j,U),Math.max(j,U)],Mt=L.slice(bt,$t+1).map(_=>_);r(e.includes(S)?e.filter(_=>!Mt.includes(_)):[...new Set([...e,...Mt])])},[e,r,L]),k=S=>{F(S,z.current),z.current=!1},C=(S,K)=>{S.preventDefault(),F(K,S.shiftKey)},A=s.useCallback(S=>{const K=gn(L,S).map(j=>j);r(Br(L,S,e)?e.filter(j=>!K.includes(j)):[...new Set([...e,...K])])},[e,r,L]),T=()=>{r(L.map(S=>S))},Y=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(h.Section).map(S=>n.jsx(Ss,{section:S,availableBookIds:L,selectedBookIds:e,onToggle:A,localizedStrings:o},S))}),n.jsxs(Ft,{open:N,onOpenChange:S=>{V(S),S||M("")},children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(E,{variant:"outline",role:"combobox","aria-expanded":N,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:w,n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Tt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(zt,{shouldFilter:!1,onKeyDown:S=>{S.key==="Enter"&&(z.current=S.shiftKey)},children:[n.jsx(Yt,{placeholder:l,value:R,onValueChange:M}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:T,children:u}),n.jsx(E,{variant:"ghost",size:"sm",onClick:Y,children:c})]}),n.jsxs(Gt,{children:[n.jsx(le,{children:p}),Object.values(h.Section).map((S,K)=>{const j=G[S];if(j.length!==0)return n.jsxs(s.Fragment,{children:[n.jsx(kt,{heading:qn(S,m,f,b,y),children:j.map(U=>n.jsx(Un,{bookId:U,isSelected:e.includes(U),onSelect:()=>k(U),onMouseDown:bt=>C(bt,U),section:h.getSectionForBook(U),showCheck:!0,localizedBookNames:a,commandValue:Ke(U,a),className:"tw-flex tw-items-center"},U))}),K<Object.values(h.Section).length-1&&n.jsx(Gn,{})]},S)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===ze?ze:Dn).map(S=>n.jsx(ie,{className:"hover:tw-bg-secondary",variant:"secondary",children:Xt(S,a)},S)),e.length>ze&&n.jsx(ie,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Dn} ${g}`})]})]})}const Rs=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),It=(t,e)=>t[e]??e;function Ts({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l,id:u}){const c=It(w,"%webView_scope_selector_selected_text%"),p=It(w,"%webView_scope_selector_current_verse%"),g=It(w,"%webView_scope_selector_current_chapter%"),m=It(w,"%webView_scope_selector_current_book%"),f=It(w,"%webView_scope_selector_choose_books%"),b=It(w,"%webView_scope_selector_scope%"),y=It(w,"%webView_scope_selector_select_books%"),N=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:g,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:f,id:"scope-selected"}],V=e?N.filter(R=>e.includes(R.value)):N;return n.jsxs("div",{id:u,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(Z,{children:b}),n.jsx(Ce,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:V.map(({value:R,label:M,id:H})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ae,{className:"tw-me-2",value:R,id:H}),n.jsx(Z,{htmlFor:H,children:M})]},H))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(Z,{children:y}),n.jsx(_s,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Ge={[h.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[h.getLocalizeKeyForScrollGroupId(0)]:"A",[h.getLocalizeKeyForScrollGroupId(1)]:"B",[h.getLocalizeKeyForScrollGroupId(2)]:"C",[h.getLocalizeKeyForScrollGroupId(3)]:"D",[h.getLocalizeKeyForScrollGroupId(4)]:"E",[h.getLocalizeKeyForScrollGroupId(5)]:"F",[h.getLocalizeKeyForScrollGroupId(6)]:"G",[h.getLocalizeKeyForScrollGroupId(7)]:"H",[h.getLocalizeKeyForScrollGroupId(8)]:"I",[h.getLocalizeKeyForScrollGroupId(9)]:"J",[h.getLocalizeKeyForScrollGroupId(10)]:"K",[h.getLocalizeKeyForScrollGroupId(11)]:"L",[h.getLocalizeKeyForScrollGroupId(12)]:"M",[h.getLocalizeKeyForScrollGroupId(13)]:"N",[h.getLocalizeKeyForScrollGroupId(14)]:"O",[h.getLocalizeKeyForScrollGroupId(15)]:"P",[h.getLocalizeKeyForScrollGroupId(16)]:"Q",[h.getLocalizeKeyForScrollGroupId(17)]:"R",[h.getLocalizeKeyForScrollGroupId(18)]:"S",[h.getLocalizeKeyForScrollGroupId(19)]:"T",[h.getLocalizeKeyForScrollGroupId(20)]:"U",[h.getLocalizeKeyForScrollGroupId(21)]:"V",[h.getLocalizeKeyForScrollGroupId(22)]:"W",[h.getLocalizeKeyForScrollGroupId(23)]:"X",[h.getLocalizeKeyForScrollGroupId(24)]:"Y",[h.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Ms({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:i,id:w}){const l={...Ge,...Object.fromEntries(Object.entries(o).map(([c,p])=>[c,c===p&&c in Ge?Ge[c]:p]))},u=tt();return n.jsxs(Lt,{value:`${e}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[n.jsx(Ct,{size:a,className:d("pr-twp tw-w-auto",i),children:n.jsx(At,{placeholder:l[h.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(St,{id:w,align:u==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>n.jsx(wt,{value:`${c}`,children:l[h.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function Es({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function Is({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:a}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):n.jsx("div",{children:r})]})}function Ds({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Ee,{}):""]})}function $r(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function Ne({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Xr=(t,e,r,o)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,u)=>l.order-u.order).map(l=>n.jsxs(De,{children:[n.jsx(Ve,{asChild:!0,children:"command"in l?n.jsxs(nn,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(Ne,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(Ne,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(er,{children:[n.jsx(tn,{children:l.label}),n.jsx(tr,{children:n.jsx(en,{children:Xr(t,e,$r(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(he,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function je({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:a,variant:i,buttonVariant:w="ghost",id:l}){return n.jsxs(ce,{variant:i,children:[n.jsx(Se,{"aria-label":r,className:a,asChild:!0,id:l,children:n.jsx(E,{variant:w,size:"icon",children:o??n.jsx(x.MenuIcon,{})})}),n.jsx(Jt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,c])=>typeof u=="boolean"||typeof c=="boolean"?0:u.order-c.order).map(([u],c,p)=>n.jsxs(s.Fragment,{children:[n.jsx(Qe,{children:n.jsx(Ie,{children:Xr(e.groups,e.items,u,t)})}),c<p.length-1&&n.jsx(de,{})]},u))})]})}const Kr=s.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Vs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:a,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:u,menuButtonIcon:c}){return n.jsxs(Kr,{className:`tw-w-full tw-border ${i}`,id:a,children:[r&&n.jsx(je,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??n.jsx(x.Menu,{}),buttonVariant:"ghost"}),w&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(je,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(x.EllipsisVertical,{}),className:"tw-h-full"}),u]})]})}function Os({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:a}){return n.jsx(Kr,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(je,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const bn=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(st.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});bn.displayName=st.List.displayName;const xn=s.forwardRef(({className:t,...e},r)=>n.jsx(st.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));xn.displayName=st.List.displayName;const Hr=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,...e,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),vn=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));vn.displayName=st.Content.displayName;function Ps({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:i,id:w}){return n.jsxs("div",{id:w,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?n.jsx("h1",{children:a}):"",n.jsx(Oe,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(bn,{children:[n.jsx(xn,{children:t.map(l=>n.jsx(Hr,{value:l.value,children:l.value},l.key))}),t.map(l=>n.jsx(vn,{value:l.value,children:l.content},l.key))]})]})}function Ls({...t}){return n.jsx($.Menu,{...t})}function As({...t}){return n.jsx($.Sub,{"data-slot":"menubar-sub",...t})}const qr=s.forwardRef(({className:t,variant:e="default",...r},o)=>{const a=s.useMemo(()=>({variant:e}),[e]);return n.jsx(Ze.Provider,{value:a,children:n.jsx($.Root,{ref:o,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});qr.displayName=$.Root.displayName;const Yr=s.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx($.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",yt({variant:o.variant,className:t})),...e})});Yr.displayName=$.Trigger.displayName;const Ur=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=ct();return n.jsxs($.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",yt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ur.displayName=$.SubTrigger.displayName;const Jr=s.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx($.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Jr.displayName=$.SubContent.displayName;const Wr=s.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...a},i)=>{const w=ct();return n.jsx($.Portal,{children:n.jsx($.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...a})})});Wr.displayName=$.Content.displayName;const Zr=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=ct();return n.jsx($.Item,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",yt({variant:a.variant,className:t}),t),...r})});Zr.displayName=$.Item.displayName;const zs=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=ct();return n.jsxs($.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",yt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx($.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});zs.displayName=$.CheckboxItem.displayName;const Gs=s.forwardRef(({className:t,children:e,...r},o)=>{const a=ct();return n.jsxs($.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",yt({variant:a.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx($.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Gs.displayName=$.RadioItem.displayName;const Fs=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx($.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Fs.displayName=$.Label.displayName;const Qr=s.forwardRef(({className:t,...e},r)=>n.jsx($.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Qr.displayName=$.Separator.displayName;const te=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},to=(t,e,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return a.flatMap(([i],w)=>{const l=e.filter(c=>c.group===i).sort((c,p)=>c.order-p.order).map(c=>n.jsxs(De,{children:[n.jsx(Ve,{asChild:!0,children:"command"in c?n.jsxs(Zr,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(Ne,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(Ne,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):n.jsxs(As,{children:[n.jsx(Ur,{children:c.label}),n.jsx(Jr,{children:to(t,e,$r(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(he,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),u=[...l];return l.length>0&&w<a.length-1&&u.push(n.jsx(Qr,{},`separator-${i}`)),u})};function Bs({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const a=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),u=s.useRef(void 0),c=p=>{switch(p){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return u;default:return}};if(ea.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,g)=>{var b,y,N,V;p.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":te(i,[m]);break;case"alt+p":(b=i.current)==null||b.focus(),te(i,[m,f]);break;case"alt+l":(y=w.current)==null||y.focus(),te(w,[m,f]);break;case"alt+n":(N=l.current)==null||N.focus(),te(l,[m,f]);break;case"alt+h":(V=u.current)==null||V.focus(),te(u,[m,f]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const p=new MutationObserver(f=>{f.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const y=b.target.getAttribute("data-state");r(y==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(f=>{p.observe(f,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(qr,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,g])=>typeof p=="boolean"||typeof g=="boolean"?0:p.order-g.order).map(([p,g])=>n.jsxs(Ls,{children:[n.jsx(Yr,{ref:c(p),children:typeof g=="object"&&"label"in g&&g.label}),n.jsx(Wr,{className:"tw-z-[250]",children:n.jsx(Ie,{children:to(t.groups,t.items,p,e)})})]},p))})}function $s(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Xs({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:a,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:u,menubarVariant:c="default"}){const p=s.useRef(void 0);return n.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:a,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:u?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&n.jsx(Bs,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:c})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const Ks=(t,e)=>t[e]??e;function Hs({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:i,localizedStrings:w,className:l,id:u}){const c=Ks(w,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,g]=s.useState(!1),m=b=>{a&&a(b),o&&o([b,...r.filter(y=>y!==b)]),i&&r.find(y=>y===b)&&i([...r.filter(y=>y!==b)]),g(!1)},f=(b,y)=>{var V,R,M,H,z,L;const N=y!==b?((R=(V=t[b])==null?void 0:V.uiNames)==null?void 0:R[y])??((H=(M=t[b])==null?void 0:M.uiNames)==null?void 0:H.en):void 0;return N?`${(z=t[b])==null?void 0:z.autonym} (${N})`:(L=t[b])==null?void 0:L.autonym};return n.jsxs("div",{id:u,className:d("pr-twp tw-max-w-sm",l),children:[n.jsxs(Lt,{name:"uiLanguage",value:e,onValueChange:m,open:p,onOpenChange:b=>g(b),children:[n.jsx(Ct,{children:n.jsx(At,{})}),n.jsx(St,{className:"tw-z-[250]",children:Object.keys(t).map(b=>n.jsx(wt,{value:b,children:f(b,e)},b))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(Z,{className:"tw-font-normal tw-text-muted-foreground",children:h.formatReplacementString(c,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(b=>f(b,e)).join(", "):t.en.autonym})})})]})}function qs({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(Z,{children:e(t)}):r?n.jsx(Z,{children:r(t)}):n.jsx(Z,{children:t})}function Ys({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:i,createComplexLabel:w}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Te,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:u=>a(l,u)}),n.jsx(qs,{item:l,createLabel:i,createComplexLabel:w})]},l))})}function Us({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:a=!1,className:i,children:w,dropdownContent:l,additionalSelectedContent:u,accentColor:c}){const p=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:a,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:d("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:w}),e&&l&&n.jsxs(ce,{children:[n.jsx(Se,{className:d(c&&"tw-me-1"),asChild:!0,children:n.jsx(E,{className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(x.MoreHorizontal,{})})}),n.jsx(Jt,{align:"end",children:l})]})]}),e&&u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),c&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`})]},t)}const eo=s.forwardRef(({className:t,...e},r)=>n.jsx(x.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...e,ref:r}));eo.displayName="Spinner";function Js({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:w,isRequired:l=!1,className:u,defaultValue:c,value:p,onChange:g,onFocus:m,onBlur:f}){return n.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(Z,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(Wt,{id:t,disabled:e,placeholder:w,required:l,className:d(u,{"tw-border-red-600":r}),defaultValue:c,value:p,onChange:g,onFocus:m,onBlur:f}),n.jsx("p",{className:d({"tw-hidden":!a}),children:a})]})}const Ws=_t.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),no=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:d("pr-twp",Ws({variant:e}),t),...r}));no.displayName="Alert";const ro=s.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));ro.displayName="AlertTitle";const oo=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));oo.displayName="AlertDescription";const ao=s.forwardRef(({className:t,...e},r)=>n.jsx(qt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));ao.displayName=qt.Root.displayName;const so=s.forwardRef(({className:t,...e},r)=>n.jsx(qt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));so.displayName=qt.Image.displayName;const io=s.forwardRef(({className:t,...e},r)=>n.jsx(qt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));io.displayName=qt.Fallback.displayName;const Zs=X.Root,Qs=X.Trigger,ti=X.Group,ei=X.Portal,ni=X.Sub,ri=X.RadioGroup,wo=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>n.jsxs(X.SubTrigger,{ref:a,className:d("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));wo.displayName=X.SubTrigger.displayName;const lo=s.forwardRef(({className:t,...e},r)=>n.jsx(X.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));lo.displayName=X.SubContent.displayName;const co=s.forwardRef(({className:t,...e},r)=>n.jsx(X.Portal,{children:n.jsx(X.Content,{ref:r,className:d("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));co.displayName=X.Content.displayName;const po=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Item,{ref:o,className:d("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));po.displayName=X.Item.displayName;const uo=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>n.jsxs(X.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));uo.displayName=X.CheckboxItem.displayName;const mo=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(X.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));mo.displayName=X.RadioItem.displayName;const ho=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ho.displayName=X.Label.displayName;const fo=s.forwardRef(({className:t,...e},r)=>n.jsx(X.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));fo.displayName=X.Separator.displayName;function go({className:t,...e}){return n.jsx("span",{className:d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}go.displayName="ContextMenuShortcut";const bo=s.createContext({direction:"bottom"});function xo({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=s.useMemo(()=>({direction:e}),[e]);return n.jsx(bo.Provider,{value:o,children:n.jsx(lt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}xo.displayName="Drawer";const oi=lt.Drawer.Trigger,vo=lt.Drawer.Portal,ai=lt.Drawer.Close,yn=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));yn.displayName=lt.Drawer.Overlay.displayName;const yo=s.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},a)=>{const{direction:i="bottom"}=s.useContext(bo),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(vo,{children:[n.jsx(yn,{}),n.jsxs(lt.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})});yo.displayName="DrawerContent";function No({className:t,...e}){return n.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}No.displayName="DrawerHeader";function jo({className:t,...e}){return n.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}jo.displayName="DrawerFooter";const ko=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ko.displayName=lt.Drawer.Title.displayName;const Co=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));Co.displayName=lt.Drawer.Description.displayName;const So=s.forwardRef(({className:t,value:e,...r},o)=>n.jsx($e.Root,{ref:o,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx($e.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));So.displayName=$e.Root.displayName;function si({className:t,...e}){return n.jsx(He.PanelGroup,{className:d("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const ii=He.Panel;function wi({withHandle:t,className:e,...r}){return n.jsx(He.PanelResizeHandle,{className:d("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(x.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function li({...t}){return n.jsx(On.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const _o=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsxs(ee.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(ee.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(ee.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(ee.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});_o.displayName=ee.Root.displayName;const Ro=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(Xe.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Xe.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Ro.displayName=Xe.Root.displayName;const ci=st.Root,To=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(st.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});To.displayName=st.List.displayName;const Mo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));Mo.displayName=st.Trigger.displayName;const Eo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Eo.displayName=st.Content.displayName;const Io=s.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Io.displayName="Textarea";const di=(t,e)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function pi(t){return{preserveValue:!0,...t}}const Do=(t,e,r={})=>{const o=s.useRef(e);o.current=e;const a=s.useRef(r);a.current=pi(a.current);const[i,w]=s.useState(()=>o.current),[l,u]=s.useState(!0);return s.useEffect(()=>{let c=!0;return u(!!t),(async()=>{if(t){const p=await t();c&&(w(()=>p),u(!1))}})(),()=>{c=!1,a.current.preserveValue||w(()=>o.current)}},[t]),[i,l]},Fe=()=>!1,ui=(t,e)=>{const[r]=Do(s.useCallback(async()=>{if(!t)return Fe;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Fe,{preserveValue:!1});s.useEffect(()=>()=>{r!==Fe&&r()},[r])},mi=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[i,w]=s.useState(void 0),[l,u]=s.useState(void 0),c=s.useCallback(m=>{w(m);const f=t.find(y=>y.id===m);f&&(e==null||e(f));const b=document.getElementById(m);b&&(b.scrollIntoView({block:"center"}),b.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[e,t]),p=s.useCallback(m=>{const f=t.find(b=>b.id===m);f&&(u(b=>b===m?void 0:m),r==null||r(f))},[r,t]),g=s.useCallback(m=>{const f=t.findIndex(N=>N.id===i);let b=f;switch(m.key){case"ArrowDown":b=Math.min(f+1,t.length-1),m.preventDefault();break;case"ArrowUp":b=Math.max(f-1,0),m.preventDefault();break;case"Home":b=0,m.preventDefault();break;case"End":b=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&p(i),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const y=t[b];y&&c(y.id)},[t,c,i,p,o]);return{listboxRef:a,activeId:i,selectedId:l,handleKeyDown:g,focusOption:c}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>On.toast});exports.Alert=no;exports.AlertDescription=oo;exports.AlertTitle=ro;exports.Avatar=ao;exports.AvatarFallback=io;exports.AvatarImage=so;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ia;exports.BOOK_SELECTOR_STRING_KEYS=Oa;exports.Badge=ie;exports.BookChapterControl=Ea;exports.BookSelectionMode=Qn;exports.BookSelector=Pa;exports.Button=E;exports.Card=wn;exports.CardContent=yr;exports.CardDescription=vr;exports.CardFooter=Nr;exports.CardHeader=br;exports.CardTitle=xr;exports.ChapterRangeSelector=Zn;exports.Checkbox=Te;exports.Checklist=Ys;exports.ComboBox=ge;exports.Command=zt;exports.CommandEmpty=le;exports.CommandGroup=kt;exports.CommandInput=Yt;exports.CommandItem=Rt;exports.CommandList=Gt;exports.ContextMenu=Zs;exports.ContextMenuCheckboxItem=uo;exports.ContextMenuContent=co;exports.ContextMenuGroup=ti;exports.ContextMenuItem=po;exports.ContextMenuLabel=ho;exports.ContextMenuPortal=ei;exports.ContextMenuRadioGroup=ri;exports.ContextMenuRadioItem=mo;exports.ContextMenuSeparator=fo;exports.ContextMenuShortcut=go;exports.ContextMenuSub=ni;exports.ContextMenuSubContent=lo;exports.ContextMenuSubTrigger=wo;exports.ContextMenuTrigger=Qs;exports.DataTable=cr;exports.Drawer=xo;exports.DrawerClose=ai;exports.DrawerContent=yo;exports.DrawerDescription=Co;exports.DrawerFooter=jo;exports.DrawerHeader=No;exports.DrawerOverlay=yn;exports.DrawerPortal=vo;exports.DrawerTitle=ko;exports.DrawerTrigger=oi;exports.DropdownMenu=ce;exports.DropdownMenuCheckboxItem=_e;exports.DropdownMenuContent=Jt;exports.DropdownMenuGroup=Qe;exports.DropdownMenuItem=nn;exports.DropdownMenuItemType=ur;exports.DropdownMenuLabel=Re;exports.DropdownMenuPortal=tr;exports.DropdownMenuRadioGroup=nr;exports.DropdownMenuRadioItem=rn;exports.DropdownMenuSeparator=de;exports.DropdownMenuShortcut=rr;exports.DropdownMenuSub=er;exports.DropdownMenuSubContent=en;exports.DropdownMenuSubTrigger=tn;exports.DropdownMenuTrigger=Se;exports.ERROR_DUMP_STRING_KEYS=dr;exports.ERROR_POPOVER_STRING_KEYS=Xa;exports.ErrorDump=pr;exports.ErrorPopover=Ka;exports.Filter=Ja;exports.FilterDropdown=Ha;exports.Footer=Ua;exports.FootnoteItem=gr;exports.FootnoteList=ts;exports.INVENTORY_STRING_KEYS=cs;exports.Input=Wt;exports.Inventory=us;exports.Label=Z;exports.MarkdownRenderer=$a;exports.MoreInfo=qa;exports.MultiSelectComboBox=hr;exports.NavigationContentSearch=Ps;exports.Popover=Ft;exports.PopoverContent=Tt;exports.PopoverTrigger=Bt;exports.Progress=So;exports.RadioGroup=Ce;exports.RadioGroupItem=ae;exports.RecentSearches=Wn;exports.ResizableHandle=wi;exports.ResizablePanel=ii;exports.ResizablePanelGroup=si;exports.ResultsCard=Us;exports.SCOPE_SELECTOR_STRING_KEYS=Rs;exports.ScopeSelector=Ts;exports.ScriptureResultsViewer=Cs;exports.ScrollGroupSelector=Ms;exports.SearchBar=Oe;exports.Select=Lt;exports.SelectContent=St;exports.SelectGroup=or;exports.SelectItem=wt;exports.SelectLabel=sr;exports.SelectScrollDownButton=an;exports.SelectScrollUpButton=on;exports.SelectSeparator=ir;exports.SelectTrigger=Ct;exports.SelectValue=At;exports.Separator=Ee;exports.SettingsList=Es;exports.SettingsListHeader=Ds;exports.SettingsListItem=Is;exports.SettingsSidebar=Gr;exports.SettingsSidebarContentSearch=gs;exports.Sidebar=dn;exports.SidebarContent=un;exports.SidebarFooter=Er;exports.SidebarGroup=xe;exports.SidebarGroupAction=Dr;exports.SidebarGroupContent=ye;exports.SidebarGroupLabel=ve;exports.SidebarHeader=Mr;exports.SidebarInput=Tr;exports.SidebarInset=pn;exports.SidebarMenu=mn;exports.SidebarMenuAction=Vr;exports.SidebarMenuBadge=Or;exports.SidebarMenuButton=fn;exports.SidebarMenuItem=hn;exports.SidebarMenuSkeleton=Pr;exports.SidebarMenuSub=Lr;exports.SidebarMenuSubButton=zr;exports.SidebarMenuSubItem=Ar;exports.SidebarProvider=cn;exports.SidebarRail=Rr;exports.SidebarSeparator=Ir;exports.SidebarTrigger=_r;exports.Skeleton=be;exports.Slider=_o;exports.Sonner=li;exports.Spinner=eo;exports.Switch=Ro;exports.TabDropdownMenu=je;exports.TabFloatingMenu=Os;exports.TabToolbar=Vs;exports.Table=pe;exports.TableBody=me;exports.TableCaption=lr;exports.TableCell=jt;exports.TableFooter=wr;exports.TableHead=Kt;exports.TableHeader=ue;exports.TableRow=ft;exports.Tabs=ci;exports.TabsContent=Eo;exports.TabsList=To;exports.TabsTrigger=Mo;exports.TextField=Js;exports.Textarea=Io;exports.ToggleGroup=ln;exports.ToggleGroupItem=ne;exports.Toolbar=Xs;exports.Tooltip=De;exports.TooltipContent=he;exports.TooltipProvider=Ie;exports.TooltipTrigger=Ve;exports.UiLanguageSelector=Hs;exports.VerticalTabs=bn;exports.VerticalTabsContent=vn;exports.VerticalTabsList=xn;exports.VerticalTabsTrigger=Hr;exports.badgeVariants=mr;exports.buttonVariants=Jn;exports.cn=d;exports.getBookIdFromUSFM=ls;exports.getLinesFromUSFM=is;exports.getNumberFromUSFM=ws;exports.getStatusForItem=Cr;exports.getToolbarOSReservedSpaceClassName=$s;exports.inventoryCountColumn=as;exports.inventoryItemColumn=rs;exports.inventoryStatusColumn=ss;exports.selectTriggerVariants=ar;exports.useEvent=di;exports.useEventAsync=ui;exports.useListbox=mi;exports.usePromise=Do;exports.useRecentSearches=_a;exports.useSidebar=fe;function hi(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}hi(`*, ::before, ::after {
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
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
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

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
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
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-table {
  display: table;
}
.tw-table-cell {
  display: table-cell;
}
.tw-table-row {
  display: table-row;
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
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
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
.tw-max-w-full {
  max-width: 100%;
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
.tw-border-collapse {
  border-collapse: collapse;
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
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
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
.tw-bg-accent {
  background-color: hsl(var(--accent));
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
.tw-bg-muted\\/70 {
  background-color: hsl(var(--muted) / 0.7);
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
.tw-fill-destructive {
  fill: hsl(var(--destructive));
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
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
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
.tw-pt-2 {
  padding-top: 0.5rem;
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
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
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
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
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
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
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
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
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
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
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
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
