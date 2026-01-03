"use strict";var ba=Object.defineProperty;var va=(e,t,n)=>t in e?ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ct=(e,t,n)=>va(e,typeof t!="symbol"?t+"":t,n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("react/jsx-runtime"),l=require("react"),ut=require("cmdk"),k=require("lucide-react"),ya=require("clsx"),Na=require("tailwind-merge"),ja=require("@radix-ui/react-dialog"),v=require("platform-bible-utils"),Ce=require("@radix-ui/react-slot"),Qt=require("class-variance-authority"),ka=require("@radix-ui/react-popover"),_a=require("@radix-ui/react-label"),Ca=require("@radix-ui/react-radio-group"),b=require("lexical"),Hr=require("@radix-ui/react-tooltip"),Mn=require("@lexical/rich-text"),jr=require("react-dom"),Sa=require("@lexical/table"),Ea=require("@radix-ui/react-toggle-group"),Ra=require("@radix-ui/react-toggle"),Ur=require("@lexical/headless"),Ta=require("@radix-ui/react-separator"),Ma=require("@radix-ui/react-avatar"),Xr=require("@radix-ui/react-dropdown-menu"),wt=require("@tanstack/react-table"),Da=require("@radix-ui/react-select"),Ia=require("markdown-to-jsx"),yt=require("@eten-tech-foundation/platform-editor"),Oa=require("@radix-ui/react-checkbox"),Aa=require("@radix-ui/react-tabs"),Pa=require("@radix-ui/react-menubar"),La=require("react-hotkeys-hook"),Va=require("@radix-ui/react-context-menu"),jt=require("vaul"),$a=require("@radix-ui/react-progress"),Ba=require("react-resizable-panels"),qr=require("sonner"),Fa=require("@radix-ui/react-slider"),za=require("@radix-ui/react-switch");function ot(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const Nt=ot(ja),je=ot(ka),Yr=ot(_a),Ve=ot(Ca),Ge=ot(Hr),ln=ot(Ea),Jr=ot(Ra),Wr=ot(Ta),Se=ot(Ma),Y=ot(Xr),Q=ot(Da),Dn=ot(Oa),mt=ot(Aa),J=ot(Pa),W=ot(Va),In=ot($a),Fn=ot(Ba),Ae=ot(Fa),On=ot(za),Ga=Na.extendTailwindMerge({prefix:"tw-"});function h(...e){return Ga(ya.clsx(e))}const Ka="layoutDirection";function st(){const e=localStorage.getItem(Ka);return e==="rtl"?e:"ltr"}const Ha=Nt.Root,Ua=Nt.Portal,Zr=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Overlay,{ref:n,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Zr.displayName=Nt.Overlay.displayName;const Qr=l.forwardRef(({className:e,children:t,...n},o)=>{const s=st();return r.jsxs(Ua,{children:[r.jsx(Zr,{}),r.jsxs(Nt.Content,{ref:o,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:s,children:[t,r.jsxs(Nt.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[r.jsx(k.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Qr.displayName=Nt.Content.displayName;function to({className:e,...t}){return r.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}to.displayName="DialogHeader";const eo=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Title,{ref:n,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));eo.displayName=Nt.Title.displayName;const Xa=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Description,{ref:n,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));Xa.displayName=Nt.Description.displayName;const Vt=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Command,{ref:n,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Vt.displayName=ut.Command.displayName;const he=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[r.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),r.jsx(ut.Command.Input,{ref:n,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});he.displayName=ut.Command.Input.displayName;const $t=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Command.List,{ref:n,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));$t.displayName=ut.Command.List.displayName;const Ee=l.forwardRef((e,t)=>r.jsx(ut.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Ee.displayName=ut.Command.Empty.displayName;const Mt=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Command.Group,{ref:n,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Mt.displayName=ut.Command.Group.displayName;const no=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Command.Separator,{ref:n,className:h("tw--mx-1 tw-h-px tw-bg-border",e),...t}));no.displayName=ut.Command.Separator.displayName;const Dt=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Command.Item,{ref:n,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Dt.displayName=ut.Command.Item.displayName;function ro({className:e,...t}){return r.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}ro.displayName="CommandShortcut";var qa=Object.defineProperty,Ya=(e,t,n)=>t in e?qa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t,n)=>Ya(e,typeof t!="symbol"?t+"":t,n);const de=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],zn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],oo=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],kr=si();function Re(e,t=!0){return t&&(e=e.toUpperCase()),e in kr?kr[e]:0}function Gn(e){return Re(e)>0}function Ja(e){const t=typeof e=="string"?Re(e):e;return t>=40&&t<=66}function Wa(e){return(typeof e=="string"?Re(e):e)<=39}function so(e){return e<=66}function Za(e){const t=typeof e=="string"?Re(e):e;return lo(t)&&!so(t)}function*Qa(){for(let e=1;e<=de.length;e++)yield e}const ti=1,ao=de.length;function ei(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Kn(e,t="***"){const n=e-1;return n<0||n>=de.length?t:de[n]}function io(e){return e<=0||e>ao?"******":oo[e-1]}function ni(e){return io(Re(e))}function lo(e){const t=typeof e=="number"?Kn(e):e;return Gn(t)&&!zn.includes(t)}function ri(e){const t=typeof e=="number"?Kn(e):e;return Gn(t)&&zn.includes(t)}function oi(e){return oo[e-1].includes("*obsolete*")}function si(){const e={};for(let t=0;t<de.length;t++)e[de[t]]=t+1;return e}const X={allBookIds:de,nonCanonicalIds:zn,bookIdToNumber:Re,isBookIdValid:Gn,isBookNT:Ja,isBookOT:Wa,isBookOTNT:so,isBookDC:Za,allBookNumbers:Qa,firstBook:ti,lastBook:ao,extraBooks:ei,bookNumberToId:Kn,bookNumberToEnglishName:io,bookIdToEnglishName:ni,isCanonical:lo,isExtraMaterial:ri,isObsolete:oi};var Ct=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ct||{});const ht=class{constructor(t){if(F(this,"name"),F(this,"fullPath"),F(this,"isPresent"),F(this,"hasVerseSegments"),F(this,"isCustomized"),F(this,"baseVersification"),F(this,"scriptureBooks"),F(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ct[t]):(this._type=t,this.name=Ct[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};F(ht,"Original",new ht(Ct.Original)),F(ht,"Septuagint",new ht(Ct.Septuagint)),F(ht,"Vulgate",new ht(Ct.Vulgate)),F(ht,"English",new ht(Ct.English)),F(ht,"RussianProtestant",new ht(Ct.RussianProtestant)),F(ht,"RussianOrthodox",new ht(Ct.RussianOrthodox));let ae=ht;function _r(e,t){const n=t[0];for(let o=1;o<t.length;o++)e=e.split(t[o]).join(n);return e.split(n)}var co=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(co||{});const pt=class z{constructor(t,n,o,s){if(F(this,"firstChapter"),F(this,"lastChapter"),F(this,"lastVerse"),F(this,"hasSegmentsDefined"),F(this,"text"),F(this,"BBBCCCVVVS"),F(this,"longHashCode"),F(this,"versification"),F(this,"rtlMark","‏"),F(this,"_bookNum",0),F(this,"_chapterNum",0),F(this,"_verseNum",0),F(this,"_verse"),o==null&&s==null)if(t!=null&&typeof t=="string"){const a=t,i=n!=null&&n instanceof ae?n:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof ae?n:void 0;this.setEmpty(a),this._verseNum=t%z.chapterDigitShifter,this._chapterNum=Math.floor(t%z.bookDigitShifter/z.chapterDigitShifter),this._bookNum=Math.floor(t/z.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof z){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof ae?t:z.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&o!=null)if(typeof t=="string"&&typeof n=="string"&&typeof o=="string")this.setEmpty(s),this.updateInternal(t,n,o);else if(typeof t=="number"&&typeof n=="number"&&typeof o=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=o,this.versification=s??z.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new z(t),{success:!0,verseRef:n}}catch(o){if(o instanceof De)return n=new z,{success:!1,verseRef:n};throw o}}static getBBBCCCVVV(t,n,o){return t%z.bcvMaxValue*z.bookDigitShifter+(n>=0?n%z.bcvMaxValue*z.chapterDigitShifter:0)+(o>=0?o%z.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:o,verseNum:s,verse:a,versificationStr:i}=t,c=a||s.toString();let w;return i&&(w=new ae(i)),n?new z(n,o.toString(),c,w):new z}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let o;for(let s=0;s<t.length;s++){if(o=t[s],o<"0"||o>"9")return s===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +o-0,n>z.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(z.verseRangeSeparator)||this._verse.includes(z.verseSequenceIndicator))}get book(){return X.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=X.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:o}=z.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=z.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>X.lastBook)throw new De("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new ae(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(z.verseRangeSeparators,z.verseSequenceIndicators)}get BBBCCC(){return z.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return z.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new ae(Ct[i])}catch{throw new De("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new De("Invalid reference : "+t);const o=n[1].split(":"),s=+o[0];if(o.length!==2||X.bookIdToNumber(n[0])===0||!Number.isInteger(s)||s<0||!z.isVerseParseable(o[1]))throw new De("Invalid reference : "+t);this.updateInternal(n[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new z(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof z?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=z.verseRangeSeparators,o=z.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const s=[],a=_r(this._verse,o);for(const i of a.map(c=>_r(c,n))){const c=this.clone();c.verse=i[0];const w=c.verseNum;if(s.push(c),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let p=w+1;p<d.verseNum;p++){const m=new z(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||s.push(m)}s.push(d)}}return s}validateVerse(t,n){if(!this.verse)return this.internalValid;let o=0;for(const s of this.allVerses(!0,t,n)){const a=s.internalValid;if(a!==0)return a;const i=s.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>X.lastBook?2:(X.isCanonical(this._bookNum),0)}setEmpty(t=z.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,o){this.bookNum=X.bookIdToNumber(t),this.chapter=n,this.verse=o}};F(pt,"defaultVersification",ae.English),F(pt,"verseRangeSeparator","-"),F(pt,"verseSequenceIndicator",","),F(pt,"verseRangeSeparators",[pt.verseRangeSeparator]),F(pt,"verseSequenceIndicators",[pt.verseSequenceIndicator]),F(pt,"chapterDigitShifter",1e3),F(pt,"bookDigitShifter",pt.chapterDigitShifter*pt.chapterDigitShifter),F(pt,"bcvMaxValue",pt.chapterDigitShifter-1),F(pt,"ValidStatusType",co);let De=class extends Error{};const wo=(e,t,n,o,s)=>{switch(e){case v.Section.OT:return t??"Old Testament";case v.Section.NT:return n??"New Testament";case v.Section.DC:return o??"Deuterocanon";case v.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},ai=(e,t,n,o,s)=>{switch(e){case v.Section.OT:return t??"OT";case v.Section.NT:return n??"NT";case v.Section.DC:return o??"DC";case v.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function ye(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??X.bookIdToEnglishName(e)}function Hn(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const po=X.allBookIds.filter(e=>!X.isObsolete(X.bookIdToNumber(e))),ce=Object.fromEntries(po.map(e=>[e,X.bookIdToEnglishName(e)]));function Un(e,t,n){const o=t.trim().toLowerCase();if(!o)return!1;const s=X.bookIdToEnglishName(e),a=n==null?void 0:n.get(e);return!!(v.includes(s.toLowerCase(),o)||v.includes(e.toLowerCase(),o)||(a?v.includes(a.localizedName.toLowerCase(),o)||v.includes(a.localizedId.toLowerCase(),o):!1))}const uo=l.forwardRef(({bookId:e,isSelected:t,onSelect:n,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),m=()=>{p.current||n==null||n(e),setTimeout(()=>{p.current=!1},100)},f=j=>{p.current=!0,o?o(j):n==null||n(e)},u=l.useMemo(()=>ye(e,c),[e,c]),g=l.useMemo(()=>Hn(e,c),[e,c]);return r.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===v.Section.OT,"tw-border-s-purple-200":s===v.Section.NT,"tw-border-s-indigo-200":s===v.Section.DC,"tw-border-s-amber-200":s===v.Section.Extra}),children:r.jsxs(Dt,{ref:d,value:w||`${e} ${X.bookIdToEnglishName(e)}`,onSelect:m,onMouseDown:f,role:"option","aria-selected":t,"aria-label":`${X.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:a,children:[i&&r.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),r.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),r.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),mo=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=l.forwardRef(({className:e,variant:t,size:n,asChild:o=!1,...s},a)=>{const i=o?Ce.Slot:"button";return r.jsx(i,{className:h(mo({variant:t,size:n,className:e})),ref:a,...s})});V.displayName="Button";const te=je.Root,ee=je.Trigger,ii=je.Anchor,Bt=l.forwardRef(({className:e,align:t="center",sideOffset:n=4,...o},s)=>{const a=st();return r.jsx(je.Portal,{children:r.jsx(je.Content,{ref:s,align:t,sideOffset:n,className:h("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:a})})});Bt.displayName=je.Content.displayName;function An(e,t,n){return`${e} ${ce[e]}${t?` ${Hn(e,t)} ${ye(e,t)}`:""}${n?` ${n}`:""}`}function ho({recentSearches:e,onSearchItemSelect:t,renderItem:n=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c}){const[w,d]=l.useState(!1);if(e.length===0)return;const p=m=>{t(m),d(!1)};return r.jsxs(te,{open:w,onOpenChange:d,children:[r.jsx(ee,{asChild:!0,children:r.jsx(V,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:r.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),r.jsx(Bt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:r.jsx(Vt,{children:r.jsx($t,{children:r.jsx(Mt,{heading:a,children:e.map(m=>r.jsxs(Dt,{onSelect:()=>p(m),className:h("tw-flex tw-items-center",c),children:[r.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),r.jsx("span",{children:n(m)})]},o(m)))})})})})]})}function li(e,t,n=(s,a)=>s===a,o=15){return s=>{const a=e.filter(c=>!n(c,s)),i=[s,...a.slice(0,o-1)];t(i)}}const vn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ci=[vn.BOOK_ONLY,vn.BOOK_CHAPTER,vn.BOOK_CHAPTER_VERSE];function Cr(e){const t=/^[a-zA-Z]$/.test(e),n=/^[0-9]$/.test(e);return{isLetter:t,isDigit:n}}function St(e){return v.getChaptersForBook(X.bookIdToNumber(e))}function di(e,t,n){if(!e.trim()||t.length===0)return;const o=ci.reduce((s,a)=>{if(s)return s;const i=a.exec(e.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let p;const m=t.filter(f=>Un(f,c,n));if(m.length===1&&([p]=m),!p&&w){if(X.isBookIdValid(c)){const f=c.toUpperCase();t.includes(f)&&(p=f)}if(!p&&n){const f=Array.from(n.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());f&&t.includes(f[0])&&([p]=f)}}if(!p&&w){const u=(g=>Object.keys(ce).find(j=>ce[j].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&n){const g=Array.from(n.entries()).find(([,j])=>j.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let f=w?parseInt(w,10):void 0;f&&f>St(p)&&(f=Math.max(St(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:f,verseNum:u}}}},void 0);if(o)return o}function wi(e,t,n,o){const s=l.useCallback(()=>{if(e.chapterNum>1)o({book:e.book,chapterNum:e.chapterNum-1,verseNum:1});else{const w=t.indexOf(e.book);if(w>0){const d=t[w-1],p=Math.max(St(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[e,t,o]),a=l.useCallback(()=>{const w=St(e.book);if(e.chapterNum<w)o({book:e.book,chapterNum:e.chapterNum+1,verseNum:1});else{const d=t.indexOf(e.book);if(d<t.length-1){const p=t[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[e,t,o]),i=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum>1?e.verseNum-1:0})},[e,o]),c=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum+1})},[e,o]);return l.useMemo(()=>[{onClick:s,disabled:t.length===0||e.chapterNum===1&&t.indexOf(e.book)===0,title:"Previous chapter",icon:n==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:i,disabled:t.length===0||e.verseNum===0,title:"Previous verse",icon:n==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:t.length===0,title:"Next verse",icon:n==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:t.length===0||(e.chapterNum===St(e.book)||St(e.book)===-1)&&t.indexOf(e.book)===t.length-1,title:"Next chapter",icon:n==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[e,t,n,s,i,c,a])}function Sr({bookId:e,scrRef:t,onChapterSelect:n,setChapterRef:o,isChapterDimmed:s,className:a}){if(e)return r.jsx(Mt,{children:r.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:St(e)},(i,c)=>c+1).map(i=>r.jsx(Dt,{value:`${e} ${ce[e]||""} ${i}`,onSelect:()=>n(i),ref:o(i),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":e===t.book&&i===t.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function pi({scrRef:e,handleSubmit:t,className:n,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w}){const d=st(),[p,m]=l.useState(!1),[f,u]=l.useState(""),[g,j]=l.useState(""),[x,T]=l.useState("books"),[y,S]=l.useState(void 0),[R,A]=l.useState(!1),I=l.useRef(void 0),C=l.useRef(void 0),M=l.useRef(void 0),N=l.useRef(void 0),E=l.useRef({}),L=l.useCallback(D=>{t(D),c&&c(D)},[t,c]),B=l.useMemo(()=>o?o():po,[o]),U=l.useMemo(()=>({[v.Section.OT]:B.filter(_=>X.isBookOT(_)),[v.Section.NT]:B.filter(_=>X.isBookNT(_)),[v.Section.DC]:B.filter(_=>X.isBookDC(_)),[v.Section.Extra]:B.filter(_=>X.extraBooks().includes(_))}),[B]),P=l.useMemo(()=>Object.values(U).flat(),[U]),G=l.useMemo(()=>{if(!g.trim())return U;const D={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return[v.Section.OT,v.Section.NT,v.Section.DC,v.Section.Extra].forEach(K=>{D[K]=U[K].filter(et=>Un(et,g,s))}),D},[U,g,s]),O=l.useMemo(()=>di(g,P,s),[g,P,s]),Z=l.useCallback(()=>{O&&(L({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1}),m(!1),j(""),u(""))},[L,O]),bt=l.useCallback(D=>{if(St(D)<=1){L({book:D,chapterNum:1,verseNum:1}),m(!1),j("");return}S(D),T("chapters")},[L]),Ot=l.useCallback(D=>{const _=x==="chapters"?y:O==null?void 0:O.book;_&&(L({book:_,chapterNum:D,verseNum:1}),m(!1),T("books"),S(void 0),j(""))},[L,x,y,O]),vt=l.useCallback(D=>{L(D),m(!1),j("")},[L]),nt=wi(e,P,d,t),$=l.useCallback(()=>{T("books"),S(void 0),setTimeout(()=>{C.current&&C.current.focus()},0)},[]),tt=l.useCallback(D=>{if(!D&&x==="chapters"){$();return}m(D),D&&(T("books"),S(void 0),j(""))},[x,$]),{otLong:at,ntLong:it,dcLong:gt,extraLong:Gt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},xt=l.useCallback(D=>wo(D,at,it,gt,Gt),[at,it,gt,Gt]),fn=l.useCallback(D=>O?!!O.chapterNum&&!D.toString().includes(O.chapterNum.toString()):!1,[O]),gn=l.useMemo(()=>v.formatScrRef(e,s?ye(e.book,s):"English"),[e,s]),re=l.useCallback(D=>_=>{E.current[D]=_},[]),xn=l.useCallback(D=>{(D.key==="Home"||D.key==="End")&&D.stopPropagation()},[]),bn=l.useCallback(D=>{if(D.ctrlKey)return;const{isLetter:_,isDigit:K}=Cr(D.key);if(x==="chapters"){if(D.key==="Backspace"){D.preventDefault(),D.stopPropagation(),$();return}if(_||K){if(D.preventDefault(),D.stopPropagation(),T("books"),S(void 0),K&&y){const et=ce[y];j(`${et} ${D.key}`)}else j(D.key);setTimeout(()=>{C.current&&C.current.focus()},0);return}}if((x==="chapters"||x==="books"&&O)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(D.key)){const et=x==="chapters"?y:O==null?void 0:O.book;if(!et)return;const lt=(()=>{if(!f)return 1;const Me=f.match(/(\d+)$/);return Me?parseInt(Me[1],10):0})(),oe=St(et);if(!oe)return;let At=lt;const Nr=6;switch(D.key){case"ArrowLeft":lt!==0&&(At=lt>1?lt-1:oe);break;case"ArrowRight":lt!==0&&(At=lt<oe?lt+1:1);break;case"ArrowUp":At=lt===0?oe:Math.max(1,lt-Nr);break;case"ArrowDown":At=lt===0?1:Math.min(oe,lt+Nr);break;default:return}At!==lt&&(D.preventDefault(),D.stopPropagation(),u(An(et,s,At)),setTimeout(()=>{const Me=E.current[At];Me&&Me.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,O,$,y,f,s]),qe=l.useCallback(D=>{if(D.shiftKey||D.key==="Tab"||D.key===" ")return;const{isLetter:_,isDigit:K}=Cr(D.key);(_||K)&&(D.preventDefault(),j(et=>et+D.key),C.current.focus(),A(!1))},[]);return l.useLayoutEffect(()=>{const D=setTimeout(()=>{if(p&&x==="books"&&M.current&&N.current){const _=M.current,K=N.current,et=K.offsetTop,lt=_.clientHeight,oe=K.clientHeight,At=et-lt/2+oe/2;_.scrollTo({top:Math.max(0,At),behavior:"smooth"}),u(An(e.book))}},0);return()=>{clearTimeout(D)}},[p,x,g,O,e.book]),l.useLayoutEffect(()=>{if(x==="chapters"&&y){const D=y===e.book;setTimeout(()=>{if(M.current)if(D){const _=E.current[e.chapterNum];_&&_.scrollIntoView({block:"center",behavior:"smooth"})}else M.current.scrollTo({top:0});I.current&&I.current.focus()},0)}},[x,y,O,e.book,e.chapterNum]),r.jsxs(te,{open:p,onOpenChange:tt,children:[r.jsx(ee,{asChild:!0,children:r.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:r.jsx("span",{className:"tw-truncate",children:gn})})}),r.jsx(Bt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:r.jsxs(Vt,{ref:I,onKeyDown:bn,loop:!0,value:f,onValueChange:u,shouldFilter:!1,children:[x==="books"?r.jsxs("div",{className:"tw-flex tw-items-end",children:[r.jsxs("div",{className:"tw-relative tw-flex-1",children:[r.jsx(he,{ref:C,value:g,onValueChange:j,onKeyDown:xn,onFocus:()=>A(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&r.jsx(ho,{recentSearches:i,onSearchItemSelect:vt,renderItem:D=>v.formatScrRef(D,"English"),getItemKey:D=>`${D.book}-${D.chapterNum}-${D.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:nt.map(({onClick:D,disabled:_,title:K,icon:et})=>r.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{A(!0),D()},disabled:_,className:"tw-h-10 tw-w-4 tw-p-0",title:K,onKeyDown:qe,children:r.jsx(et,{})},K))})]}):r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[r.jsx(V,{variant:"ghost",size:"sm",onClick:$,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?r.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):r.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),y&&r.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ye(y,s)})]}),!R&&r.jsxs($t,{ref:M,children:[x==="books"&&r.jsxs(r.Fragment,{children:[!O&&Object.entries(G).map(([D,_])=>{if(_.length!==0)return r.jsx(Mt,{heading:xt(D),children:_.map(K=>r.jsx(uo,{bookId:K,onSelect:et=>bt(et),section:v.getSectionForBook(K),commandValue:`${K} ${ce[K]}`,ref:K===e.book?N:void 0,localizedBookNames:s},K))},D)}),O&&r.jsx(Mt,{children:r.jsx(Dt,{value:`${O.book} ${ce[O.book]} ${O.chapterNum||""}:${O.verseNum||""})}`,onSelect:Z,className:"tw-font-semibold tw-text-primary",children:v.formatScrRef({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1},s?Hn(O.book,s):void 0)},"top-match")}),O&&St(O.book)>1&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ye(O.book,s)}),r.jsx(Sr,{bookId:O.book,scrRef:e,onChapterSelect:Ot,setChapterRef:re,isChapterDimmed:fn,className:"tw-px-4 tw-pb-4"})]})]}),x==="chapters"&&y&&r.jsx(Sr,{bookId:y,scrRef:e,onChapterSelect:Ot,setChapterRef:re,className:"tw-p-4"})]})]})})]})}const ui=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),mi=Qt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),rt=l.forwardRef(({className:e,...t},n)=>r.jsx(Yr.Root,{ref:n,className:h("pr-twp",mi(),e),...t}));rt.displayName=Yr.Root.displayName;const cn=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsx(Ve.Root,{className:h("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:o})});cn.displayName=Ve.Root.displayName;const $e=l.forwardRef(({className:e,...t},n)=>r.jsx(Ve.Item,{ref:n,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:r.jsx(Ve.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:r.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));$e.displayName=Ve.Item.displayName;function hi(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function tn({id:e,options:t=[],className:n,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=hi,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:f="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:j=!1,ariaLabel:x,...T}){const[y,S]=l.useState(!1),R=w??c,A=C=>C.length>0&&typeof C[0]=="object"&&"options"in C[0],I=(C,M)=>{const N=c(C),E=typeof C=="object"&&"secondaryLabel"in C?C.secondaryLabel:void 0,L=`${M??""}${N}${E??""}`;return r.jsxs(Dt,{value:N,onSelect:()=>{i(C),S(!1)},className:"tw-flex tw-items-center",children:[r.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==N})}),r.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[N,E&&r.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",E]})]})]},L)};return r.jsxs(te,{open:y,onOpenChange:S,...T,children:[r.jsx(ee,{asChild:!0,children:r.jsxs(V,{variant:u,role:"combobox","aria-expanded":y,"aria-label":x,id:e,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??n),disabled:j,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&r.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),r.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?R(a):p})]}),r.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Bt,{align:g,className:h("tw-w-[200px] tw-p-0",s),children:r.jsxs(Vt,{children:[r.jsx(he,{placeholder:m,className:"tw-text-inherit"}),r.jsx(Ee,{children:f}),r.jsx($t,{children:A(t)?t.map(C=>r.jsx(Mt,{heading:C.groupHeading,children:C.options.map(M=>I(M,C.groupHeading))},C.groupHeading)):t.map(C=>I(C))})]})})]})}function fo({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,p)=>p+1),[a]),c=d=>{n(d),d>t&&o(d)},w=d=>{o(d),d<e&&n(d)};return r.jsxs(r.Fragment,{children:[r.jsx(rt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),r.jsx(tn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),r.jsx(rt,{htmlFor:"end-chapters-combobox",children:"to"}),r.jsx(tn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var go=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(go||{});const fi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),yn=(e,t)=>e[t]??t;function gi({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=yn(d,"%webView_bookSelector_currentBook%"),m=yn(d,"%webView_bookSelector_choose%"),f=yn(d,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),j=x=>{g(x),e(x)};return r.jsx(cn,{className:"pr-twp tw-flex",value:u,onValueChange:x=>j(x),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx($e,{value:"current book"}),r.jsx(rt,{className:"tw-ms-1",children:p})]}),r.jsx(rt,{className:"tw-flex tw-items-center",children:t}),r.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:r.jsx(fo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx($e,{value:"choose books"}),r.jsx(rt,{className:"tw-ms-1",children:f})]}),r.jsx(rt,{className:"tw-flex tw-items-center",children:o.map(x=>X.bookIdToEnglishName(x)).join(", ")}),r.jsx(V,{disabled:u==="current book",onClick:()=>n(),children:m})]})]})})}const xi=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],bi=["input","select","textarea","button"],vi=["button","textbox"],xo=({options:e,onFocusChange:t,onOptionSelect:n,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(u=>{i(u);const g=e.find(x=>x.id===u);g&&(t==null||t(g));const j=document.getElementById(u);j&&(j.scrollIntoView({block:"center"}),j.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=l.useCallback(u=>{const g=e.find(j=>j.id===u);g&&(w(j=>j===u?void 0:u),n==null||n(g))},[n,e]),m=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||bi.includes(g))return!0;const j=u.getAttribute("role");if(j&&vi.includes(j))return!0;const x=u.getAttribute("tabindex");return x!==void 0&&x!=="-1"},f=l.useCallback(u=>{var C;const g=u.target,j=M=>M?document.getElementById(M):void 0,x=j(c),T=j(a);if(!!(x&&g&&x.contains(g)&&g!==x)&&m(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const M=e.find(N=>N.id===c);M&&d(M.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!x)return;const M=Array.from(x.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(M.length===0)return;const N=M.findIndex(L=>L===g);if(N===-1)return;let E;u.key==="ArrowDown"?E=Math.min(N+1,M.length-1):E=Math.max(N-1,0),E!==N&&(u.preventDefault(),u.stopPropagation(),(C=M[E])==null||C.focus());return}return}const R=e.findIndex(M=>M.id===a);let A=R;switch(u.key){case"ArrowDown":A=Math.min(R+1,e.length-1),u.preventDefault();break;case"ArrowUp":A=Math.max(R-1,0),u.preventDefault();break;case"Home":A=0,u.preventDefault();break;case"End":A=e.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const M=T;if(M){const N=M.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),E=M.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),L=N??E;if(L){u.preventDefault(),L.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(g)||(o==null||o(u.key),u.preventDefault()));return}const I=e[A];I&&d(I.id)},[e,d,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:f,focusOption:d}},bo=l.createContext(null);function yi(e,t){return{getTheme:function(){return t??null}}}function It(){const e=l.useContext(bo);return e==null&&function(t,...n){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const a of n)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ni=vo?l.useLayoutEffect:l.useEffect,Ye={tag:b.HISTORY_MERGE_TAG};function ji({initialConfig:e,children:t}){const n=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=e,d=yi(null,o),p=b.createEditor({editable:e.editable,html:w,namespace:s,nodes:a,onError:m=>i(m,p),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const j=vo?document.activeElement:null;(b.$getSelection()!==null||j!==null&&j===m.getRootElement())&&g.select()}},Ye);else if(f!==null)switch(typeof f){case"string":{const u=m.parseEditorState(f);m.setEditorState(u,Ye);break}case"object":m.setEditorState(f,Ye);break;case"function":m.update(()=>{b.$getRoot().isEmpty()&&f(m)},Ye)}}}(p,c),[p,d]},[]);return Ni(()=>{const o=e.editable,[s]=n;s.setEditable(o===void 0||o)},[]),r.jsx(bo.Provider,{value:n,children:t})}const ki=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function _i({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:n}){const[o]=It();return ki(()=>{if(n)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{t&&a.size===0&&i.size===0||e&&w.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||n(s,o,w)})},[o,e,t,n]),null}const Xn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Rt=Ge.Provider,Pt=Ge.Root,Ut=Ge.Trigger,Tt=l.forwardRef(({className:e,sideOffset:t=4,...n},o)=>r.jsx(Ge.Content,{ref:o,sideOffset:t,className:h("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Tt.displayName=Ge.Content.displayName;const qn=[Mn.HeadingNode,b.ParagraphNode,b.TextNode,Mn.QuoteNode],Ci=l.createContext(null),Nn={didCatch:!1,error:null};class Si extends l.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Nn}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var n,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(n=(o=this.props).onReset)===null||n===void 0||n.call(o,{args:a,reason:"imperative-api"}),this.setState(Nn)}}componentDidCatch(t,n){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,n)}componentDidUpdate(t,n){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&n.error!==null&&Ei(t.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(Nn)}}render(){const{children:t,fallbackRender:n,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=t;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")c=n(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(Ci.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ei(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((n,o)=>!Object.is(n,t[o]))}function Ri({children:e,onError:t}){return r.jsx(Si,{fallback:r.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const Ti=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Mi(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function Di(){return function(e){const[t]=It(),n=l.useMemo(()=>e(t),[t,e]),[o,s]=l.useState(()=>n.initialValueFn()),a=l.useRef(o);return Ti(()=>{const{initialValueFn:i,subscribe:c}=n,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[n,e]),o}(Mi)}function Ii(e,t,n="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!b.$isTokenOrSegmented(t)&&o!==null){const[s,a]=o,i=e.isBackward(),c=s.getNode(),w=a.getNode(),d=t.is(c),p=t.is(w);if(d||p){const[m,f]=b.$getCharacterOffsets(e),u=c.is(w),g=t.is(i?w:c),j=t.is(i?c:w);let x,T=0;u?(T=m>f?f:m,x=m>f?m:f):g?(T=i?f:m,x=void 0):j&&(T=0,x=i?m:f);const y=t.__text.slice(T,x);y!==t.__text&&(n==="clone"&&(t=b.$cloneWithPropertiesEphemeral(t)),t.__text=y)}}return t}function Oi(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const yo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ai=yo&&"documentMode"in document?document.documentMode:null;!(!yo||!("InputEvent"in window)||Ai)&&"getTargetRanges"in new window.InputEvent("input");function No(...e){const t=[];for(const n of e)if(n&&typeof n=="string")for(const[o]of n.matchAll(/\S+/g))t.push(o);return t}function Yt(...e){return()=>{for(let t=e.length-1;t>=0;t--)e[t]();e.length=0}}function jo(e,...t){const n=No(...t);n.length>0&&e.classList.add(...n)}function Pi(e,...t){const n=No(...t);n.length>0&&e.classList.remove(...n)}function Er(e){const t=b.$findMatchingParent(e,n=>b.$isElementNode(n)&&!n.isInline());return b.$isElementNode(t)||Oi(4,e.__key),t}function Li(e,t){const n=[];for(let o=0;o<e.length;o++){const s=t(e[o]);s!==null&&n.push(s)}return n}const Vi=Symbol.for("preact-signals");function dn(){if(Xt>1)return void Xt--;let e,t=!1;for(;Pe!==void 0;){let n=Pe;for(Pe=void 0,Pn++;n!==void 0;){const o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&ko(n))try{n.c()}catch(s){t||(e=s,t=!0)}n=o}}if(Pn=0,Xt--,t)throw e}function $i(e){if(Xt>0)return e();Xt++;try{return e()}finally{dn()}}let H,Pe;function Rr(e){const t=H;H=void 0;try{return e()}finally{H=t}}let Xt=0,Pn=0,Ze=0;function Tr(e){if(H===void 0)return;let t=e.n;return t===void 0||t.t!==H?(t={i:0,S:e,p:H.s,n:void 0,t:H,e:void 0,x:void 0,r:t},H.s!==void 0&&(H.s.n=t),H.s=t,e.n=t,32&H.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=H.s,t.n=void 0,H.s.n=t,H.s=t),t):void 0}function dt(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Be(e,t){return new dt(e,t)}function ko(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Mr(e){for(let t=e.s;t!==void 0;t=t.n){const n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function _o(e){let t,n=e.s;for(;n!==void 0;){const o=n.p;n.i===-1?(n.S.U(n),o!==void 0&&(o.n=n.n),n.n!==void 0&&(n.n.p=o)):t=n,n.S.n=n.r,n.r!==void 0&&(n.r=void 0),n=o}e.s=t}function ie(e,t){dt.call(this,void 0),this.x=e,this.s=void 0,this.g=Ze-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Bi(e,t){return new ie(e,t)}function Co(e){const t=e.u;if(e.u=void 0,typeof t=="function"){Xt++;const n=H;H=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,Yn(e),o}finally{H=n,dn()}}}function Yn(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Co(e)}function Fi(e){if(H!==this)throw new Error("Out-of-order effect");_o(this),H=e,this.f&=-2,8&this.f&&Yn(this),dn()}function ve(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function Jt(e,t){const n=new ve(e,t);try{n.c()}catch(s){throw n.d(),s}const o=n.d.bind(n);return o[Symbol.dispose]=o,o}function wn(e,t={}){const n={};for(const o in e){const s=t[o],a=Be(s===void 0?e[o]:s);n[o]=a}return n}dt.prototype.brand=Vi,dt.prototype.h=function(){return!0},dt.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:Rr(()=>{var n;(n=this.W)==null||n.call(this)}))},dt.prototype.U=function(e){if(this.t!==void 0){const t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n,n===void 0&&Rr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},dt.prototype.subscribe=function(e){return Jt(()=>{const t=this.value,n=H;H=void 0;try{e(t)}finally{H=n}},{name:"sub"})},dt.prototype.valueOf=function(){return this.value},dt.prototype.toString=function(){return this.value+""},dt.prototype.toJSON=function(){return this.value},dt.prototype.peek=function(){const e=H;H=void 0;try{return this.value}finally{H=e}},Object.defineProperty(dt.prototype,"value",{get(){const e=Tr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(Pn>100)throw new Error("Cycle detected");this.v=e,this.i++,Ze++,Xt++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{dn()}}}}),ie.prototype=new dt,ie.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Ze))return!0;if(this.g=Ze,this.f|=1,this.i>0&&!ko(this))return this.f&=-2,!0;const e=H;try{Mr(this),H=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return H=e,_o(this),this.f&=-2,!0},ie.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}dt.prototype.S.call(this,e)},ie.prototype.U=function(e){if(this.t!==void 0&&(dt.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},ie.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(ie.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=Tr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),ve.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},ve.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Co(this),Mr(this),Xt++;const e=H;return H=this,Fi.bind(this,e)},ve.prototype.N=function(){2&this.f||(this.f|=2,this.o=Pe,Pe=this)},ve.prototype.d=function(){this.f|=8,1&this.f||Yn(this)},ve.prototype.dispose=function(){this.d()};b.defineExtension({build:(e,t,n)=>wn(t),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,n){const o=n.getOutput();return Jt(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function So(){const e=b.$getRoot(),t=b.$getSelection(),n=b.$createParagraphNode();e.clear(),e.append(n),t!==null&&n.select(),b.$isRangeSelection(t)&&(t.format=0)}function Eo(e,t=So){return e.registerCommand(b.CLEAR_EDITOR_COMMAND,n=>(e.update(t),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(e,t,n)=>wn(t),config:b.safeCast({$onClear:So}),name:"@lexical/extension/ClearEditor",register(e,t,n){const{$onClear:o}=n.getOutput();return Jt(()=>Eo(e,o.value))}});function zi(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function Ro(e,t){let n;return Be(e(),{unwatched(){n&&(n(),n=void 0)},watched(){this.value=e(),n=t(this)}})}const Ln=b.defineExtension({build:e=>Ro(()=>e.getEditorState(),t=>e.registerUpdateListener(n=>{t.value=n.editorState})),name:"@lexical/extension/EditorState"});function q(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function To(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const n=e,o=t;for(const s in o)n[s]=To(n[s],o[s]);return e}return t}const Jn=0,Vn=1,Mo=2,jn=3,Je=4,be=5,kn=6,Ie=7;function _n(e){return e.id===Jn}function Do(e){return e.id===Mo}function Gi(e){return function(t){return t.id===Vn}(e)||q(305,String(e.id),String(Vn)),Object.assign(e,{id:Mo})}const Ki=new Set;class Hi{constructor(t,n){ct(this,"builder");ct(this,"configs");ct(this,"_dependency");ct(this,"_peerNameSet");ct(this,"extension");ct(this,"state");ct(this,"_signal");this.builder=t,this.extension=n,this.configs=new Set,this.state={id:Jn}}mergeConfigs(){let t=this.extension.config||{};const n=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)t=n(t,o);return t}init(t){const n=this.state;Do(n)||q(306,String(n.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:jn,registerState:d})}(n,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(t,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Je,initResult:w,registerState:d})}(a,i,s)}build(t){const n=this.state;let o;n.id!==Je&&q(307,String(n.id),String(be)),this.extension.build&&(o=this.extension.build(t,n.config,n.registerState));const s={...n.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:be,output:i,registerState:c})}(n,o,s)}register(t,n){this._signal=n;const o=this.state;o.id!==be&&q(308,String(o.id),String(be));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:kn})}(o),()=>{const a=this.state;a.id!==Ie&&q(309,String(o.id),String(Ie)),this.state=function(i){return Object.assign(i,{id:be})}(a),s&&s()}}afterRegistration(t){const n=this.state;let o;return n.id!==kn&&q(310,String(n.id),String(kn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,n.config,n.registerState)),this.state=function(s){return Object.assign(s,{id:Ie})}(n),o}getSignal(){return this._signal===void 0&&q(311),this._signal}getInitResult(){this.extension.init===void 0&&q(312,this.extension.name);const t=this.state;return function(n){return n.id>=Je}(t)||q(313,String(t.id),String(Je)),t.initResult}getInitPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(n){return n.id>=jn}(t)||q(314,String(t.id),String(jn)),{config:t.config}}getPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionDependency():void 0}getInitDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&q(315,this.extension.name,t.name),n.getExtensionInitDependency()}getDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&q(315,this.extension.name,t.name),n.getExtensionDependency()}getState(){const t=this.state;return function(n){return n.id>=Ie}(t)||q(316,String(t.id),String(Ie)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Ki}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([n])=>n)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(n){return n.id>=be})(t)||q(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const Dr={tag:b.HISTORY_MERGE_TAG};function Ui(){const e=b.$getRoot();e.isEmpty()&&e.append(b.$createParagraphNode())}const Xi=b.defineExtension({config:b.safeCast({setOptions:Dr,updateOptions:Dr}),init:({$initialEditorState:e=Ui})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:n},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))e.setEditorState(a,n);else if(typeof a=="function")e.update(()=>{a(e)},t);else if(a&&(typeof a=="string"||typeof a=="object")){const i=e.parseEditorState(a);e.setEditorState(i,n)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),Ir=Symbol.for("@lexical/extension/LexicalBuilder");function Or(){}function qi(e){throw e}function We(e){return Array.isArray(e)?e:[e]}const Cn="0.38.2+prod.esm";class Le{constructor(t){ct(this,"roots");ct(this,"extensionNameMap");ct(this,"outgoingConfigEdges");ct(this,"incomingEdges");ct(this,"conflicts");ct(this,"_sortedExtensionReps");ct(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Cn,this.roots=t;for(const n of t)this.addExtension(n)}static fromExtensions(t){const n=[We(Xi)];for(const o of t)n.push(We(o));return new Le(n)}static maybeFromEditor(t){const n=t[Ir];return n&&(n.PACKAGE_VERSION!==Cn&&q(292,n.PACKAGE_VERSION,Cn),n instanceof Le||q(293)),n}static fromEditor(t){const n=Le.maybeFromEditor(t);return n===void 0&&q(294),n}constructEditor(){const{$initialEditorState:t,onError:n,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...n?{onError:a=>{n(a,s)}}:{}}),{[Ir]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let t=Or;function n(){try{t()}finally{t=Or}}const o=Object.assign(this.constructEditor(),{dispose:n,[Symbol.dispose]:n});return t=Yt(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const n=this.extensionNameMap.get(t.name);if(n)return n.extension!==t&&q(295,t.name),n}addEdge(t,n,o){const s=this.outgoingConfigEdges.get(t);s?s.set(n,o):this.outgoingConfigEdges.set(t,new Map([[n,o]]));const a=this.incomingEdges.get(n);a?a.add(t):this.incomingEdges.set(n,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&q(296);const n=We(t),[o]=n;typeof o.name!="string"&&q(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&q(298,o.name),!s){s=new Hi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&q(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&q(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=We(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],n=(o,s)=>{let a=o.state;if(Do(a))return;const i=o.extension.name;var c;_n(a)||q(300,i,s||"[unknown]"),_n(c=a)||q(304,String(c.id),String(Jn)),a=Object.assign(c,{id:Vn}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&n(p,i)}a=Gi(a),o.state=a,t.push(o)};for(const o of this.extensionNameMap.values())_n(o.state)&&n(o);for(const o of t)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&q(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const n=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of n){const c=i.register(t,a);c&&s.push(c)}for(const i of n){const c=i.afterRegistration(t);c&&s.push(c)}return Yt(...s)}buildCreateEditorArgs(){const t={},n=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(t.onError=m.onError),m.disableEvents!==void 0&&(t.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(t.parentEditor=m.parentEditor),m.editable!==void 0&&(t.editable=m.editable),m.namespace!==void 0&&(t.namespace=m.namespace),m.$initialEditorState!==void 0&&(t.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of zi(m)){if(typeof f!="function"){const u=o.get(f.replace);u&&q(302,m.name,f.replace.name,u.extension.name),o.set(f.replace,p)}n.add(f)}if(m.html){if(m.html.export)for(const[f,u]of m.html.export.entries())s.set(f,u);m.html.import&&Object.assign(a,m.html.import)}m.theme&&To(i,m.theme)}Object.keys(i).length>0&&(t.theme=i),n.size&&(t.nodes=[...n]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(t.html={},w&&(t.html.import=a),d&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=qi),t}}const Yi=new Set,Ar=b.defineExtension({build(e,t,n){const o=n.getDependency(Ln).output,s=Be({watchedNodeKeys:new Map}),a=Ro(()=>{},()=>Jt(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const f=b.$getNodeByKey(p),u=f&&f.isSelected()||!1;d=d||u!==(!!i&&i.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=Bi(()=>(a.value||Yi).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Ln],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class ke extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new ke(t.__key)}static importJSON(t){return Io().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:Ji,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const n=document.createElement("hr");return jo(n,t.theme.hr),n}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Ji(){return{node:Io()}}function Io(){return b.$create(ke)}function Wi(e){return e instanceof ke}b.defineExtension({dependencies:[Ln,Ar],name:"@lexical/extension/HorizontalRule",nodes:[ke],register(e,t,n){const{watchNodeKey:o}=n.getDependency(Ar).output,s=Be({nodeSelections:new Map}),a=e._config.theme.hrSelected??"selected";return Yt(e.registerCommand(b.CLICK_COMMAND,i=>{if(b.isDOMNode(i.target)){const c=b.$getNodeFromDOMNode(i.target);if(Wi(c))return function(w,d=!1){const p=b.$getSelection(),m=w.isSelected(),f=w.getKey();let u;d&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),m?u.delete(f):u.add(f)}(c,i.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),e.registerMutationListener(ke,(i,c)=>{$i(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,m]of i.entries())if(m==="destroyed")d.delete(p),w=!0;else{const f=d.get(p),u=e.getElementByKey(p);f?f.domNode.value=u:(w=!0,d.set(p,{domNode:Be(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),Jt(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(Jt(()=>{const d=c.value;d&&(w.value?jo(d,a):Pi(d,a))}));return Yt(...i)}))}});function Zi(e,t){return Yt(e.registerCommand(b.KEY_TAB_COMMAND,n=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;n.preventDefault();const s=function(a){const i=a.getNodes();if(Li(i,f=>b.$isBlockElementNode(f)&&f.canIndent()?f:null).length>0)return!0;const c=a.anchor,w=a.focus,d=w.isBefore(c)?w:c,p=d.getNode(),m=Er(p);if(m.canIndent()){const f=m.getKey();let u=b.$createRangeSelection();if(u.anchor.set(f,0,"element"),u.focus.set(f,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(o)?n.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),e.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const n=typeof t=="number"?t:t?t.peek():null;if(n==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>Er(a).getIndent());return Math.max(...s)+1>=n},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(e,t,n)=>wn(t),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,n){const{disabled:o,maxIndent:s}=n.getOutput();return Jt(()=>{if(!o.value)return Zi(e,s)})}});const Qi=b.defineExtension({name:"@lexical/react/ReactProvider"});function tl(){return b.$getRoot().getTextContent()}function el(e,t=!0){if(e)return!1;let n=tl();return t&&(n=n.trim()),n===""}function nl(e){if(!el(e,!1))return!1;const t=b.$getRoot().getChildren(),n=t.length;if(n>1)return!1;for(let o=0;o<n;o++){const s=t[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!b.$isTextNode(w))return!1}}}return!0}function Oo(e){return()=>nl(e)}function Ao(e){const t=window.location.origin,n=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,m,f,u]=w;e.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const j=g.anchor;let x=j.getNode(),T=0,y=0;if(b.$isTextNode(x)&&d>=0&&p>=0&&(T=d,y=d+p,g.setTextNodeRange(x,T,x,y)),T===y&&m===""||(g.insertRawText(m),x=j.getNode()),b.$isTextNode(x)){T=f,y=f+u;const S=x.getTextContentSize();T=T>S?S:T,y=y>S?S:y,g.setTextNodeRange(x,T,x,y)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}b.defineExtension({build:(e,t,n)=>wn(t),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,n)=>Jt(()=>n.getOutput().disabled.value?void 0:Ao(e))});function rl(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Wn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ol({editor:e,ErrorBoundary:t}){return function(n,o){const[s,a]=l.useState(()=>n.getDecorators());return Wn(()=>n.registerDecoratorListener(i=>{jr.flushSync(()=>{a(i)})}),[n]),l.useEffect(()=>{a(n.getDecorators())},[n]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=r.jsx(o,{onError:f=>n._onError(f),children:r.jsx(l.Suspense,{fallback:null,children:s[d]})}),m=n.getElementByKey(d);m!==null&&i.push(jr.createPortal(p,m,d))}return i},[o,s,n])}(e,t)}function sl({editor:e,ErrorBoundary:t}){return function(n){const o=Le.maybeFromEditor(n);if(o&&o.hasExtensionByName(Qi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&rl(320,s);return!0}return!1}(e)?null:r.jsx(ol,{editor:e,ErrorBoundary:t})}function Pr(e){return e.getEditorState().read(Oo(e.isComposing()))}function al({contentEditable:e,placeholder:t=null,ErrorBoundary:n}){const[o]=It();return function(s){Wn(()=>Yt(Mn.registerRichText(s),Ao(s)),[s])}(o),r.jsxs(r.Fragment,{children:[e,r.jsx(il,{content:t}),r.jsx(sl,{editor:o,ErrorBoundary:n})]})}function il({content:e}){const[t]=It(),n=function(s){const[a,i]=l.useState(()=>Pr(s));return Wn(()=>{function c(){const w=Pr(s);i(w)}return c(),Yt(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(t),o=Di();return n?typeof e=="function"?e(o):e:null}function ll({defaultSelection:e}){const[t]=It();return l.useEffect(()=>{t.focus(()=>{const n=document.activeElement,o=t.getRootElement();o===null||n!==null&&o.contains(n)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const cl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function dl({onClear:e}){const[t]=It();return cl(()=>Eo(t,e),[t,e]),null}const Po=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function wl({editor:e,ariaActiveDescendant:t,ariaAutoComplete:n,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:m,ariaRequired:f,autoCapitalize:u,className:g,id:j,role:x="textbox",spellCheck:T=!0,style:y,tabIndex:S,"data-testid":R,...A},I){const[C,M]=l.useState(e.isEditable()),N=l.useCallback(L=>{L&&L.ownerDocument&&L.ownerDocument.defaultView?e.setRootElement(L):e.setRootElement(null)},[e]),E=l.useMemo(()=>function(...L){return B=>{for(const U of L)typeof U=="function"?U(B):U!=null&&(U.current=B)}}(I,N),[N,I]);return Po(()=>(M(e.isEditable()),e.registerEditableListener(L=>{M(L)})),[e]),r.jsx("div",{"aria-activedescendant":C?t:void 0,"aria-autocomplete":C?n:"none","aria-controls":C?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":C&&x==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":C?m:void 0,"aria-readonly":!C||void 0,"aria-required":f,autoCapitalize:u,className:g,contentEditable:C,"data-testid":R,id:j,ref:E,role:x,spellCheck:T,style:y,tabIndex:S,...A})}const pl=l.forwardRef(wl);function Lr(e){return e.getEditorState().read(Oo(e.isComposing()))}const ul=l.forwardRef(ml);function ml(e,t){const{placeholder:n,...o}=e,[s]=It();return r.jsxs(r.Fragment,{children:[r.jsx(pl,{editor:s,...o,ref:t}),n!=null&&r.jsx(hl,{editor:s,content:n})]})}function hl({content:e,editor:t}){const n=function(i){const[c,w]=l.useState(()=>Lr(i));return Po(()=>{function d(){const p=Lr(i);w(p)}return d(),Yt(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(t),[o,s]=l.useState(t.isEditable());if(l.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(i=>{s(i)})),[t]),!n)return null;let a=null;return typeof e=="function"?a=e(o):e!==null&&(a=e),a===null?null:r.jsx("div",{"aria-hidden":!0,children:a})}function fl({placeholder:e,className:t,placeholderClassName:n}){return r.jsx(ul,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:r.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const Lo=l.createContext(void 0);function gl({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s}),[e,t,n,o,s]);return r.jsx(Lo.Provider,{value:i,children:a})}function Vo(){const e=l.useContext(Lo);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function xl(){const[e,t]=l.useState(void 0),n=l.useCallback(()=>{t(void 0)},[]),o=l.useMemo(()=>{if(e===void 0)return;const{title:a,content:i}=e;return r.jsx(Ha,{open:!0,onOpenChange:n,children:r.jsxs(Qr,{children:[r.jsx(to,{children:r.jsx(eo,{children:a})}),i]})})},[e,n]),s=l.useCallback((a,i,c=!1)=>{t({closeOnClickOutside:c,content:i(n),title:a})},[n]);return[o,s]}function bl({children:e}){const[t]=It(),[n,o]=l.useState(t),[s,a]=l.useState("paragraph"),[i,c]=xl(),w=()=>{};return l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[n]),r.jsxs(gl,{activeEditor:n,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,e({blockType:s})]})}function vl(e){const[t]=It(),{activeEditor:n}=Vo();l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&e(o),!1},b.COMMAND_PRIORITY_CRITICAL),[t,e]),l.useEffect(()=>{n.getEditorState().read(()=>{const o=b.$getSelection();o&&e(o)})},[n,e])}const $o=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),yl=l.forwardRef(({className:e,variant:t,size:n,...o},s)=>r.jsx(Jr.Root,{ref:s,className:h($o({variant:t,size:n,className:e})),...o}));yl.displayName=Jr.Root.displayName;const Bo=l.createContext({size:"default",variant:"default"}),pn=l.forwardRef(({className:e,variant:t,size:n,children:o,...s},a)=>{const i=st();return r.jsx(ln.Root,{ref:a,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:i,children:r.jsx(Bo.Provider,{value:{variant:t,size:n},children:o})})});pn.displayName=ln.Root.displayName;const Ne=l.forwardRef(({className:e,children:t,variant:n,size:o,...s},a)=>{const i=l.useContext(Bo);return r.jsx(ln.Item,{ref:a,className:h($o({variant:i.variant||n,size:i.size||o}),e),...s,children:t})});Ne.displayName=ln.Item.displayName;const Vr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function Nl(){const{activeEditor:e}=Vo(),[t,n]=l.useState([]),o=l.useCallback(s=>{if(b.$isRangeSelection(s)||Sa.$isTableSelection(s)){const a=[];Vr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),n(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return vl(o),r.jsx(pn,{type:"multiple",value:t,onValueChange:n,variant:"outline",size:"sm",children:Vr.map(({format:s,icon:a,label:i})=>r.jsx(Ne,{value:s,"aria-label":i,onClick:()=>{e.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:r.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function jl({onClear:e}){const[t]=It();l.useEffect(()=>{e&&e(()=>{t.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function kl({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:n}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return r.jsxs("div",{className:"tw-relative",children:[r.jsx(bl,{children:()=>r.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:r.jsx(Nl,{})})}),r.jsxs("div",{className:"tw-relative",children:[r.jsx(al,{contentEditable:r.jsx("div",{ref:s,children:r.jsx(fl,{placeholder:e})}),ErrorBoundary:Ri}),t&&r.jsx(ll,{defaultSelection:"rootEnd"}),r.jsx(jl,{onClear:n}),r.jsx(dl,{})]})]})}const _l={namespace:"commentEditor",theme:Xn,nodes:qn,onError:e=>{console.error(e)}};function $n({editorState:e,editorSerializedState:t,onChange:n,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i}){return r.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:r.jsx(ji,{initialConfig:{..._l,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:r.jsxs(Rt,{children:[r.jsx(kl,{placeholder:s,autoFocus:a,onClear:i}),r.jsx(_i,{ignoreSelectionChange:!0,onChange:c=>{n==null||n(c),o==null||o(c.toJSON())}})]})})})}function Cl(e,t){const n=b.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const a of n)if(!zo.has(a.nodeName)){const i=Go(a,e,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&i.insertAfter(b.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function Sl(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)Fo(e,o[s],n,t);return n.innerHTML}function Fo(e,t,n,o=null){let s=o===null||t.isSelected(o);const a=b.$isElementNode(t)&&t.excludeFromCopy("html");let i=t;o!==null&&b.$isTextNode(t)&&(i=Ii(o,t,"clone"));const c=b.$isElementNode(i)?i.getChildren():[],w=b.getRegisteredNode(e,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(e,i):i.exportDOM(e);const{element:p,after:m}=d;if(!p)return!1;const f=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],j=Fo(e,g,f,o);!s&&b.$isElementNode(t)&&j&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(f),n.append(p),m){const u=m.call(i,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else n.append(f);return s}const zo=new Set(["STYLE","SCRIPT"]);function Go(e,t,n,o,s=new Map,a){let i=[];if(zo.has(e.nodeName))return i;let c=null;const w=function(g,j){const{nodeName:x}=g,T=j._htmlConversions.get(x.toLowerCase());let y=null;if(T!==void 0)for(const S of T){const R=S(g);R!==null&&(y===null||(y.priority||0)<=(R.priority||0))&&(y=R)}return y!==null?y.conversion:null}(e,t),d=w?w(e):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,j]of s)if(c=j(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(e.nodeName,d.forChild)}const m=e.childNodes;let f=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)f.push(...Go(m[g],t,n,u,new Map(s),c));return p!=null&&(f=p(f)),b.isBlockDomNode(e)&&(f=El(e,f,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return n.push(g),g}:b.$createParagraphNode)),c==null?f.length>0?i=i.concat(f):b.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(e)&&(i=i.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...f),i}function El(e,t,n){const o=e.style.textAlign,s=[];let a=[];for(let i=0;i<t.length;i++){const c=t[i];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===t.length-1||i<t.length-1&&b.$isBlockElementNode(t[i+1])){const w=n();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function Rl(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const n=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),n==null||n.removeAllRanges(),n==null||n.addRange(o),!0}function Kt(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?e.root.children.some(n=>n!=null&&n.children?n.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function Tl(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),n=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:Xn,nodes:qn,onError:s=>{console.error(s)}});let o;if(n.update(()=>{const a=new DOMParser().parseFromString(t,"text/html"),i=Cl(n,a);b.$getRoot().clear(),b.$insertNodes(i)},{discrete:!0}),n.getEditorState().read(()=>{o=n.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function Bn(e){const t=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:Xn,nodes:qn,onError:s=>{console.error(s)}}),n=t.parseEditorState(JSON.stringify(e));t.setEditorState(n);let o="";return t.getEditorState().read(()=>{o=Sl(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Ko(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}const Ho=Qt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),we=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,className:h("pr-twp",Ho({variant:t}),e),...n}));we.displayName="Badge";const Zn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Zn.displayName="Card";const Uo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Uo.displayName="CardHeader";const Xo=l.forwardRef(({className:e,...t},n)=>r.jsx("h3",{ref:n,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Xo.displayName="CardTitle";const qo=l.forwardRef(({className:e,...t},n)=>r.jsx("p",{ref:n,className:h("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));qo.displayName="CardDescription";const Qn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:h("pr-twp tw-p-6 tw-pt-0",e),...t}));Qn.displayName="CardContent";const Yo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Yo.displayName="CardFooter";const pe=l.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...o},s)=>r.jsx(Wr.Root,{ref:s,decorative:n,orientation:t,className:h("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));pe.displayName=Wr.Root.displayName;const tr=l.forwardRef(({className:e,...t},n)=>r.jsx(Se.Root,{ref:n,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));tr.displayName=Se.Root.displayName;const Jo=l.forwardRef(({className:e,...t},n)=>r.jsx(Se.Image,{ref:n,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));Jo.displayName=Se.Image.displayName;const er=l.forwardRef(({className:e,...t},n)=>r.jsx(Se.Fallback,{ref:n,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));er.displayName=Se.Fallback.displayName;const nr=l.createContext(void 0);function kt(){const e=l.useContext(nr);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const Ft=Qt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),fe=Y.Trigger,rr=Y.Group,Wo=Y.Portal,Zo=Y.Sub,Qo=Y.RadioGroup;function ne({variant:e="default",...t}){const n=l.useMemo(()=>({variant:e}),[e]);return r.jsx(nr.Provider,{value:n,children:r.jsx(Y.Root,{...t})})}const or=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=kt();return r.jsxs(Y.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,Ft({variant:a.variant})),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});or.displayName=Y.SubTrigger.displayName;const sr=l.forwardRef(({className:e,...t},n)=>r.jsx(Y.SubContent,{ref:n,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));sr.displayName=Y.SubContent.displayName;const zt=l.forwardRef(({className:e,sideOffset:t=4,children:n,...o},s)=>{const a=st();return r.jsx(Y.Portal,{children:r.jsx(Y.Content,{ref:s,sideOffset:t,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:r.jsx("div",{dir:a,children:n})})})});zt.displayName=Y.Content.displayName;const Fe=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=st(),a=kt();return r.jsx(Y.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,Ft({variant:a.variant})),...n,dir:s})});Fe.displayName=Y.Item.displayName;const Lt=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=kt();return r.jsxs(Y.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ft({variant:a.variant})),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(Y.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Lt.displayName=Y.CheckboxItem.displayName;const ar=l.forwardRef(({className:e,children:t,...n},o)=>{const s=kt();return r.jsxs(Y.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ft({variant:s.variant})),...n,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(Y.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});ar.displayName=Y.RadioItem.displayName;const Te=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(Y.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Te.displayName=Y.Label.displayName;const ge=l.forwardRef(({className:e,...t},n)=>r.jsx(Y.Separator,{ref:n,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));ge.displayName=Y.Separator.displayName;function ts({className:e,...t}){return r.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ts.displayName="DropdownMenuShortcut";function Qe(e,t){return e===""?t["%comment_assign_unassigned%"]??"Unassigned":e==="Team"?t["%comment_assign_team%"]??"Team":e}function $r({comment:e,isReply:t=!1,localizedStrings:n,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,onEditingChange:w,canUserEditOrDeleteCommentCallback:d,canUserResolveThread:p=!1}){const[m,f]=l.useState(!1),[u,g]=l.useState(),[j,x]=l.useState(!1),T=l.useRef(null);l.useEffect(()=>{let N=!0;if(!o){x(!1);return}return(async()=>{const L=d?await d(e.id):!1;N&&x(L)})(),()=>{N=!1}},[d,e.id,o]),l.useEffect(()=>{if(!m)return;let N=!0;const E=T.current;if(!E)return;const L=setTimeout(()=>{N&&Rl(E)},300);return()=>{N=!1,clearTimeout(L)}},[m]);const y=l.useCallback(()=>{f(!1),g(void 0),w==null||w(!1)},[w]),S=l.useCallback(async()=>{if(!u||!i)return;await i(e.id,Bn(u))&&(f(!1),g(void 0),w==null||w(!1))},[u,i,e.id,w]),R=l.useMemo(()=>{const N=new Date(e.date),E=v.formatRelativeDate(N,n["%comment_date_today%"],n["%comment_date_yesterday%"]),L=N.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return v.formatReplacementString(n["%comment_dateAtTime%"],{date:E,time:L})},[e.date,n]),A=l.useMemo(()=>e.user,[e.user]),I=l.useMemo(()=>e.user.split(" ").map(N=>N[0]).join("").toUpperCase().slice(0,2),[e.user]),C=l.useMemo(()=>v.sanitizeHtml(v.parseParatextHtml(e.contents)),[e.contents]),M=l.useMemo(()=>{if(o&&j)return r.jsxs(r.Fragment,{children:[!v.hasCustomParatextTags(e.contents)&&r.jsxs(Fe,{onClick:()=>{f(!0),g(Tl(v.parseParatextHtml(e.contents))),w==null||w(!0)},children:[r.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),n["%comment_editComment%"]]}),r.jsxs(Fe,{onClick:async()=>{c&&await c(e.id)},children:[r.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),n["%comment_deleteComment%"]]})]})},[j,o,n,e.contents,e.id,c,w]);return r.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[r.jsx(tr,{className:"tw-h-8 tw-w-8",children:r.jsx(er,{className:"tw-text-xs tw-font-medium",children:I})}),r.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[r.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[r.jsx("p",{className:"tw-text-sm tw-font-medium",children:A}),r.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:R}),r.jsx("div",{className:"tw-flex-1"}),t&&e.assignedUser!==void 0&&r.jsxs(we,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Qe(e.assignedUser,n)]})]}),m&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:T,onKeyDownCapture:N=>{N.key==="Escape"?(N.preventDefault(),N.stopPropagation(),y()):N.key==="Enter"&&N.shiftKey&&(N.preventDefault(),N.stopPropagation(),Kt(u)&&S())},onKeyDown:N=>{Ko(N),(N.key==="Enter"||N.key===" ")&&N.stopPropagation()},children:[r.jsx($n,{editorSerializedState:u,onSerializedChange:N=>g(N)}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[r.jsx(V,{size:"icon",onClick:y,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:r.jsx(k.X,{})}),r.jsx(V,{size:"icon",onClick:S,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Kt(u),children:r.jsx(k.ArrowUp,{})})]})]}),!m&&r.jsxs(r.Fragment,{children:[e.status==="Resolved"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:n["%comment_status_resolved%"]}),e.status==="Todo"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:n["%comment_status_todo%"]}),r.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:C}})]})]}),o&&p&&!t&&s!=="Resolved"&&a&&r.jsx(V,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:N=>{N.stopPropagation(),a({threadId:e.thread,status:"Resolved"})},children:r.jsx(k.Check,{})}),M&&r.jsxs(ne,{children:[r.jsx(fe,{asChild:!0,children:r.jsx(V,{variant:"ghost",size:"icon",children:r.jsx(k.MoreHorizontal,{})})}),r.jsx(zt,{align:"end",children:M})]})]})}const Br={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Ml({classNameForVerseText:e,comments:t,localizedStrings:n,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:w,threadStatus:d,handleAddCommentToThread:p,handleUpdateComment:m,handleDeleteComment:f,assignableUsers:u,canUserAddCommentToThread:g,canUserAssignThreadCallback:j,canUserResolveThreadCallback:x,canUserEditOrDeleteCommentCallback:T}){const[y,S]=l.useState(Br),[R,A]=l.useState(!1),[I,C]=l.useState(!1),[M,N]=l.useState(!1),[E,L]=l.useState(!1),[B,U]=l.useState(!1),[P,G]=l.useState(void 0),[O,Z]=l.useState(!1),[bt,Ot]=l.useState(!1);l.useEffect(()=>{let _=!0;if(!o){Z(!1),Ot(!1);return}return(async()=>{const et=j?await j(w):!1;if(!_)return;const lt=x?await x(w):!1;_&&(Z(et),Ot(lt))})(),()=>{_=!1}},[o,w,j,x]);const vt=l.useMemo(()=>t.filter(_=>!_.deleted),[t]),nt=l.useMemo(()=>vt[0],[vt]),$=l.useRef(null),tt=l.useRef(void 0),at=l.useCallback(()=>{var _;(_=tt.current)==null||_.call(tt),S(Br)},[]);l.useEffect(()=>{const _=$.current;if(!_)return;const K=()=>{C(_.scrollWidth>_.clientWidth)};return K(),window.addEventListener("resize",K),()=>window.removeEventListener("resize",K)},[nt==null?void 0:nt.verse]),l.useEffect(()=>{N(!1)},[o]);const it=l.useMemo(()=>({singleReply:n["%comment_thread_single_reply%"],multipleReplies:n["%comment_thread_multiple_replies%"]}),[n]),gt=l.useMemo(()=>{if(a===void 0)return;if(a==="")return n["%comment_assign_unassigned%"]??"Unassigned";const _=Qe(a,n);return v.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:_})},[a,n]),Gt=l.useMemo(()=>vt.slice(1),[vt]),xt=l.useMemo(()=>Gt.length??0,[Gt.length]),fn=l.useMemo(()=>xt>0,[xt]),gn=l.useMemo(()=>M||xt<=2?Gt:Gt.slice(-2),[Gt,xt,M]),re=l.useMemo(()=>M||xt<=2?0:xt-2,[xt,M]),xn=l.useMemo(()=>xt===1?it.singleReply:v.formatReplacementString(it.multipleReplies,{count:xt}),[xt,it]),bn=l.useMemo(()=>re===1?it.singleReply:v.formatReplacementString(it.multipleReplies,{count:re}),[re,it]),qe=l.useCallback(async()=>{const _=Kt(y)?Bn(y):void 0;if(P!==void 0){await p({threadId:w,contents:_,assignedUser:P})&&(G(void 0),_&&at());return}_&&await p({threadId:w,contents:_})&&at()},[at,y,p,P,w]),D=l.useCallback(async _=>{const K=Kt(y)?Bn(y):void 0,et=await p({..._,contents:K,assignedUser:P??_.assignedUser});return et&&K&&at(),et&&P!==void 0&&G(void 0),et},[at,y,p,P]);return r.jsx(Zn,{role:"option","aria-selected":o,id:w,className:h("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&d!=="Resolved","tw-bg-background":o&&d!=="Resolved","tw-bg-muted":d==="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:r.jsxs(Qn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[r.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[gt&&r.jsx(we,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:gt}),r.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[r.jsxs("p",{ref:$,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":R},{"tw-whitespace-nowrap":!R}),children:[s," ",r.jsx("span",{className:e,children:nt.verse})]}),I&&r.jsx(V,{variant:"ghost",size:"icon",onClick:_=>{_.stopPropagation(),A(!R)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":R?"Collapse text":"Expand text",children:R?r.jsx(k.ChevronUp,{}):r.jsx(k.ChevronDown,{})})]}),r.jsx($r,{comment:nt,localizedStrings:n,isThreadExpanded:o,threadStatus:d,handleAddCommentToThread:D,handleUpdateComment:m,handleDeleteComment:f,onEditingChange:L,canUserEditOrDeleteCommentCallback:T,canUserResolveThread:bt})]}),r.jsxs(r.Fragment,{children:[fn&&!o&&r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(pe,{})}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:xn})]}),!o&&Kt(y)&&r.jsx($n,{editorSerializedState:y,onSerializedChange:_=>S(_),placeholder:n["%comment_replyOrAssign%"]}),o&&r.jsxs(r.Fragment,{children:[re>0&&r.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:_=>{_.stopPropagation(),N(!0)},role:"button",tabIndex:0,onKeyDown:_=>{(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),_.stopPropagation(),N(!0))},children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(pe,{})}),r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:bn}),M?r.jsx(k.ChevronUp,{}):r.jsx(k.ChevronDown,{})]})]}),gn.map(_=>r.jsx("div",{children:r.jsx($r,{comment:_,localizedStrings:n,isReply:!0,isThreadExpanded:o,handleUpdateComment:m,handleDeleteComment:f,onEditingChange:L,canUserEditOrDeleteCommentCallback:T})},_.id)),g!==!1&&(!E||Kt(y))&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:_=>_.stopPropagation(),onKeyDownCapture:_=>{_.key==="Enter"&&_.shiftKey&&(_.preventDefault(),_.stopPropagation(),(Kt(y)||P!==void 0)&&qe())},onKeyDown:_=>{Ko(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},children:[r.jsx($n,{editorSerializedState:y,onSerializedChange:_=>S(_),placeholder:d==="Resolved"?n["%comment_reopenResolved%"]:n["%comment_replyOrAssign%"],autoFocus:!0,onClear:_=>{tt.current=_}}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[P!==void 0&&r.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:v.formatReplacementString(n["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Qe(P,n)})}),r.jsxs(te,{open:B,onOpenChange:U,children:[r.jsx(ee,{asChild:!0,children:r.jsx(V,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!O||!u||u.length===0||!u.includes(i),"aria-label":"Assign user",children:r.jsx(k.AtSign,{})})}),r.jsx(Bt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:_=>{_.key==="Escape"&&(_.stopPropagation(),U(!1))},children:r.jsx(Vt,{children:r.jsx($t,{children:u==null?void 0:u.map(_=>r.jsx(Dt,{onSelect:()=>{G(_!==a?_:void 0),U(!1)},className:"tw-flex tw-items-center",children:r.jsx("span",{children:Qe(_,n)})},_||"unassigned"))})})})]}),r.jsx(V,{size:"icon",onClick:qe,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Kt(y)&&P===void 0,"aria-label":"Submit comment",children:r.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function Dl({className:e="",classNameForVerseText:t,threads:n,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,assignableUsers:w,canUserAddCommentToThread:d,canUserAssignThreadCallback:p,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:f}){const[u,g]=l.useState(),j=n.filter(C=>C.comments.some(M=>!M.deleted)),x=j.map(C=>({id:C.id})),T=l.useCallback(C=>{g(C.id)},[]),y=l.useCallback(C=>{g(C)},[]),{listboxRef:S,activeId:R,handleKeyDown:A}=xo({options:x,onOptionSelect:T}),I=l.useCallback(C=>{C.key==="Escape"?(g(void 0),C.preventDefault(),C.stopPropagation()):A(C)},[A]);return r.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":R??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:I,children:j.map(C=>r.jsx("div",{className:h({"tw-opacity-60":C.status==="Resolved"}),children:r.jsx(Ml,{classNameForVerseText:t,comments:C.comments,localizedStrings:s,verseRef:C.verseRef,handleSelectThread:y,threadId:C.id,isSelected:u===C.id,currentUser:o,assignedUser:C.assignedUser,threadStatus:C.status,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,assignableUsers:w,canUserAddCommentToThread:d,canUserAssignThreadCallback:p,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:f})},C.id))})}function Il({table:e}){return r.jsxs(ne,{children:[r.jsx(Xr.DropdownMenuTrigger,{asChild:!0,children:r.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[r.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),r.jsxs(zt,{align:"end",className:"tw-w-[150px]",children:[r.jsx(Te,{children:"Toggle columns"}),r.jsx(ge,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>r.jsx(Lt,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const ue=Q.Root,es=Q.Group,me=Q.Value,ns=Qt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Wt=l.forwardRef(({className:e,children:t,size:n,...o},s)=>{const a=st();return r.jsxs(Q.Trigger,{className:h(ns({size:n,className:e})),ref:s,...o,dir:a,children:[t,r.jsx(Q.Icon,{asChild:!0,children:r.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Wt.displayName=Q.Trigger.displayName;const ir=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.ScrollUpButton,{ref:n,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ir.displayName=Q.ScrollUpButton.displayName;const lr=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.ScrollDownButton,{ref:n,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));lr.displayName=Q.ScrollDownButton.displayName;const Zt=l.forwardRef(({className:e,children:t,position:n="popper",...o},s)=>{const a=st();return r.jsx(Q.Portal,{children:r.jsxs(Q.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...o,children:[r.jsx(ir,{}),r.jsx(Q.Viewport,{className:h("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:r.jsx("div",{dir:a,children:t})}),r.jsx(lr,{})]})})});Zt.displayName=Q.Content.displayName;const rs=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.Label,{ref:n,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));rs.displayName=Q.Label.displayName;const ft=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(Q.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Q.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),r.jsx(Q.ItemText,{children:t})]}));ft.displayName=Q.Item.displayName;const os=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.Separator,{ref:n,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));os.displayName=Q.Separator.displayName;function Ol({table:e}){return r.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[r.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),r.jsxs(ue,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[r.jsx(Wt,{className:"tw-h-8 tw-w-[70px]",children:r.jsx(me,{placeholder:e.getState().pagination.pageSize})}),r.jsx(Zt,{side:"top",children:[10,20,30,40,50].map(t=>r.jsx(ft,{value:`${t}`,children:t},t))})]})]}),r.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),r.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),r.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),r.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),r.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Fr=`
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
`;function Al(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ze(e,t){const n=t?`${Fr}, ${t}`:Fr;return Array.from(e.querySelectorAll(n)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Al(o))}const Ke=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{ze(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),ze(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return r.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:r.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...n})})});Ke.displayName="Table";const He=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>r.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));He.displayName="TableHeader";const Ue=l.forwardRef(({className:e,...t},n)=>r.jsx("tbody",{ref:n,className:h("[&_tr:last-child]:tw-border-0",e),...t}));Ue.displayName="TableBody";const ss=l.forwardRef(({className:e,...t},n)=>r.jsx("tfoot",{ref:n,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));ss.displayName="TableFooter";function Pl(e){l.useEffect(()=>{const t=e.current;if(!t)return;const n=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?ze(e.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",n),()=>{t.removeEventListener("keydown",n)}},[e])}function Ll(e,t,n){let o;return n==="ArrowLeft"&&t>0?o=e[t-1]:n==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Vl(e,t,n){let o;return n==="ArrowDown"&&t<e.length-1?o=e[t+1]:n==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Et=l.forwardRef(({className:e,onKeyDown:t,onSelect:n,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Pl(i);const c=l.useMemo(()=>i.current?ze(i.current):[],[i]),w=l.useCallback(p=>{const{current:m}=i;if(!m||!m.parentElement)return;const f=m.closest("table"),u=f?ze(f).filter(x=>x.tagName==="TR"):[],g=u.indexOf(m),j=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Vl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Ll(c,j,p.key);else if(p.key==="Escape"){p.preventDefault();const x=m.closest("table");x&&x.focus()}t==null||t(p)},[i,c,t]),d=l.useCallback(p=>{o&&(n==null||n(p))},[o,n]);return r.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Et.displayName="TableRow";const _e=l.forwardRef(({className:e,...t},n)=>r.jsx("th",{ref:n,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));_e.displayName="TableHead";const qt=l.forwardRef(({className:e,...t},n)=>r.jsx("td",{ref:n,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));qt.displayName="TableCell";const as=l.forwardRef(({className:e,...t},n)=>r.jsx("caption",{ref:n,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));as.displayName="TableCaption";function en({className:e,...t}){return r.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function is({columns:e,data:t,enablePagination:n=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var I;const[p,m]=l.useState([]),[f,u]=l.useState([]),[g,j]=l.useState({}),[x,T]=l.useState({}),y=l.useMemo(()=>t??[],[t]),S=wt.useReactTable({data:y,columns:e,getCoreRowModel:wt.getCoreRowModel(),...n&&{getPaginationRowModel:wt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:wt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:wt.getFilteredRowModel(),onColumnVisibilityChange:j,onRowSelectionChange:T,state:{sorting:p,columnFilters:f,columnVisibility:g,rowSelection:x}}),R=S.getVisibleFlatColumns();let A;return w?A=Array.from({length:10}).map((N,E)=>`skeleton-row-${E}`).map(N=>r.jsx(Et,{children:r.jsx(qt,{colSpan:R.length??e.length,className:"tw-border-0 tw-p-0",children:r.jsx("div",{className:"tw-w-full tw-py-2",children:r.jsx(en,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},N)):((I=S.getRowModel().rows)==null?void 0:I.length)>0?A=S.getRowModel().rows.map(C=>r.jsx(Et,{onClick:()=>i(C,S),"data-state":C.getIsSelected()&&"selected",children:C.getVisibleCells().map(M=>r.jsx(qt,{children:wt.flexRender(M.column.columnDef.cell,M.getContext())},M.id))},C.id)):A=r.jsx(Et,{children:r.jsx(qt,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:d})}),r.jsxs("div",{className:"pr-twp",id:c,children:[s&&r.jsx(Il,{table:S}),r.jsxs(Ke,{stickyHeader:a,children:[r.jsx(He,{stickyHeader:a,children:S.getHeaderGroups().map(C=>r.jsx(Et,{children:C.headers.map(M=>r.jsx(_e,{children:M.isPlaceholder?void 0:wt.flexRender(M.column.columnDef.header,M.getContext())},M.id))},C.id))}),r.jsx(Ue,{children:A})]}),n&&r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[r.jsx(V,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),r.jsx(V,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),n&&o&&r.jsx(Ol,{table:S})]})}function $l({id:e,markdown:t,className:n,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return r.jsx("div",{id:e,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},n),children:r.jsx(Ia,{options:a,children:t})})}const ls=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),zr=(e,t)=>e[t]??t;function cs({errorDetails:e,handleCopyNotify:t,localizedStrings:n,id:o}){const s=zr(n,"%webView_error_dump_header%"),a=zr(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),t&&t()}return r.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[r.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[r.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[r.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),r.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),r.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:r.jsx(k.Copy,{})})]}),r.jsx("div",{className:"tw-prose tw-w-full",children:r.jsx("pre",{className:"tw-text-xs",children:e})})]})}const Bl=Object.freeze([...ls,"%webView_error_dump_copied_message%"]);function Fl({errorDetails:e,handleCopyNotify:t,localizedStrings:n,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),t&&t()},d=p=>{p||c(!1)};return r.jsxs(te,{onOpenChange:d,children:[r.jsx(ee,{asChild:!0,children:o}),r.jsxs(Bt,{id:a,className:h("tw-min-w-80 tw-max-w-96",s),children:[i&&n["%webView_error_dump_copied_message%"]&&r.jsx(rt,{children:n["%webView_error_dump_copied_message%"]}),r.jsx(cs,{errorDetails:e,handleCopyNotify:w,localizedStrings:n})]})]})}var ds=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(ds||{});function zl({id:e,label:t,groups:n}){const[o,s]=l.useState(Object.fromEntries(n.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,p)=>{const m=!o[d][p];s(u=>(u[d][p]=m,{...u}));const f=n[d].items[p];f.onUpdate(f.id,m)},w=(d,p)=>{i(f=>(f[d]=p,{...f}));const m=n[d].items.find(f=>f.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return r.jsx("div",{id:e,children:r.jsxs(ne,{children:[r.jsx(fe,{asChild:!0,children:r.jsxs(V,{variant:"default",children:[r.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,r.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),r.jsx(zt,{children:n.map((d,p)=>r.jsxs("div",{children:[r.jsx(Te,{children:d.label}),r.jsx(rr,{children:d.itemType===0?r.jsx(r.Fragment,{children:d.items.map((m,f)=>r.jsx("div",{children:r.jsx(Lt,{checked:o[p][f],onCheckedChange:()=>c(p,f),children:m.label})},m.id))}):r.jsx(Qo,{value:a[p],onValueChange:m=>w(p,m),children:d.items.map(m=>r.jsx("div",{children:r.jsx(ar,{value:m.id,children:m.label})},m.id))})}),r.jsx(ge,{})]},d.label))})]})})}function Gl({id:e,category:t,downloads:n,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new v.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((p,m)=>p+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return r.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[r.jsx("div",{className:"tw-flex",children:r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsxs("div",{className:"tw-flex tw-gap-1",children:[r.jsx(k.User,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&r.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs(V,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",r.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs(V,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",r.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Kl({id:e,versionHistory:t}){const[n,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,m=d.getUTCMonth(),f=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:f===0?u="today":u=`${f.toString()} day${f===1?"":"s"} ago`,u}const i=Object.entries(t).sort((c,w)=>w[0].localeCompare(c[0]));return r.jsxs("div",{className:"pr-twp",id:e,children:[r.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),r.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(c=>r.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[r.jsx("div",{className:"tw-text-foreground",children:r.jsx("li",{className:"tw-prose tw-text-xs",children:r.jsx("span",{children:c[1].description})})}),r.jsxs("div",{className:"tw-justify-end tw-text-right",children:[r.jsxs("div",{children:["Version ",c[0]]}),r.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&r.jsx("button",{type:"button",onClick:()=>o(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Hl({id:e,publisherDisplayName:t,fileSize:n,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>v.formatBytes(n),[n]),w=(d=>{const p=new Intl.DisplayNames(v.getCurrentLocale(),{type:"language"});return d.map(m=>p.of(m))})(o);return r.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&r.jsx(Kl,{versionHistory:s}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[r.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),r.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Publisher"}),r.jsx("span",{className:"tw-font-semibold",children:t}),r.jsx("span",{children:"Size"}),r.jsx("span",{className:"tw-font-semibold",children:i})]}),r.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Version"}),r.jsx("span",{className:"tw-font-semibold",children:a}),r.jsx("span",{children:"Languages"}),r.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function ws({entries:e,selected:t,onChange:n,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:u=void 0,className:g=void 0,variant:j="ghost",id:x}){const[T,y]=l.useState(!1),S=l.useCallback(E=>{var B;const L=(B=e.find(U=>U.label===E))==null?void 0:B.value;L&&n(t.includes(L)?t.filter(U=>U!==L):[...t,L])},[e,t,n]),R=()=>w||o,A=l.useMemo(()=>{if(!f)return e;const E=e.filter(B=>B.starred).sort((B,U)=>B.label.localeCompare(U.label)),L=e.filter(B=>!B.starred).sort((B,U)=>{const P=t.includes(B.value),G=t.includes(U.value);return P&&!G?-1:!P&&G?1:B.label.localeCompare(U.label)});return[...E,...L]},[e,t,f]),I=()=>{n(e.map(E=>E.value))},C=()=>{n([])},M=d??T,N=p??y;return r.jsx("div",{id:x,className:g,children:r.jsxs(te,{open:M,onOpenChange:N,children:[r.jsx(ee,{asChild:!0,children:r.jsxs(V,{variant:j,role:"combobox","aria-expanded":M,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&r.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:r.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),r.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:R()})]}),r.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Bt,{align:"start",className:"tw-w-full tw-p-0",children:r.jsxs(Vt,{children:[r.jsx(he,{placeholder:`Search ${o.toLowerCase()}...`}),s&&r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx(V,{variant:"ghost",size:"sm",onClick:I,children:a}),r.jsx(V,{variant:"ghost",size:"sm",onClick:C,children:i})]}),r.jsxs($t,{children:[r.jsx(Ee,{children:c}),r.jsx(Mt,{children:A.map(E=>r.jsxs(Dt,{value:E.label,onSelect:S,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("div",{className:"w-4",children:r.jsx(k.Check,{className:h("tw-h-4 tw-w-4",t.includes(E.value)?"tw-opacity-100":"tw-opacity-0")})}),E.starred&&r.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),r.jsx("div",{className:"tw-flex-grow",children:E.label}),E.secondaryLabel&&r.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:E.secondaryLabel})]},E.label))})]})]})})]})})}function Ul({entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:m}){return r.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx(ws,{entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),t.length>0?r.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(f=>{var u;return r.jsxs(we,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[r.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(t.filter(g=>g!==f)),children:r.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===f))==null?void 0:u.label]},f)})}):r.jsx(rt,{children:p})]})}const xe=l.forwardRef(({className:e,type:t,...n},o)=>r.jsx("input",{type:t,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...n}));xe.displayName="Input";const Xl=(e,t,n)=>e==="generated"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):r.jsxs(r.Fragment,{children:[r.jsx("p",{children:n})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function ql({callerType:e,updateCallerType:t,customCaller:n,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(e),[p,m]=l.useState(n),[f,u]=l.useState(!1);l.useEffect(()=>{d(e)},[e]),l.useEffect(()=>{p!==n&&m(n)},[n]);const g=x=>{c.current=!1,u(x),x||(w!=="custom"||p?(t(w),o(p)):(d(e),m(n)))},j=x=>{var T,y,S,R;x.stopPropagation(),document.activeElement===i.current&&x.key==="ArrowDown"||x.key==="ArrowRight"?((T=a.current)==null||T.focus(),c.current=!0):document.activeElement===a.current&&x.key==="ArrowUp"?((y=i.current)==null||y.focus(),c.current=!1):document.activeElement===a.current&&x.key==="ArrowLeft"&&((S=a.current)==null?void 0:S.selectionStart)===0&&((R=i.current)==null||R.focus(),c.current=!1),w==="custom"&&x.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&g(!1)};return r.jsxs(ne,{open:f,onOpenChange:g,children:[r.jsx(Rt,{children:r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:r.jsx(fe,{asChild:!0,children:r.jsx(V,{variant:"outline",className:"tw-h-6",children:Xl(e,s,n)})})}),r.jsx(Tt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),r.jsxs(zt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:j,onMouseMove:()=>{var x;c.current&&((x=a.current)==null||x.focus())},children:[r.jsx(Te,{children:s["%footnoteEditor_callerDropdown_label%"]}),r.jsx(ge,{}),r.jsx(Lt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.GENERATOR_NOTE_CALLER})]})}),r.jsx(Lt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.HIDDEN_NOTE_CALLER})]})}),r.jsx(Lt,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:x=>{var T;x.stopPropagation(),c.current=!0,(T=a.current)==null||T.focus()},onSelect:x=>x.preventDefault(),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),r.jsx(xe,{tabIndex:0,onMouseDown:x=>{x.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:x=>{x.key==="Enter"||x.key==="ArrowUp"||x.key==="ArrowDown"||x.key==="ArrowLeft"||x.key==="ArrowRight"||x.stopPropagation()},maxLength:1,onChange:x=>m(x.target.value)})]})})]})]})}const Yl=(e,t)=>e==="f"?r.jsxs(r.Fragment,{children:[r.jsx(k.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?r.jsxs(r.Fragment,{children:[r.jsx(k.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):r.jsxs(r.Fragment,{children:[r.jsx(k.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),Jl=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let n=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(n=t["%footnoteEditor_noteType_footnote_label%"]),v.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:n})};function Wl({noteType:e,handleNoteTypeChange:t,localizedStrings:n}){return r.jsxs(ne,{children:[r.jsx(Rt,{children:r.jsxs(Pt,{children:[r.jsx(Hr.TooltipTrigger,{asChild:!0,children:r.jsx(fe,{asChild:!0,children:r.jsx(V,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:e==="x",children:Yl(e,n)})})}),r.jsx(Tt,{children:r.jsx("p",{children:Jl(e,n)})})]})}),e!=="x"&&r.jsxs(zt,{className:"tw-z-[300]",children:[r.jsx(Te,{children:n["%footnoteEditor_noteTypeDropdown_label%"]}),r.jsx(ge,{}),r.jsxs(Lt,{checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[r.jsx(k.FunctionSquare,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_footnote_label%"]})]}),r.jsxs(Lt,{checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[r.jsx(k.SquareSigma,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Zl({classNameForEditor:e,noteOps:t,onSave:n,onClose:o,scrRef:s,noteKey:a,editorOptions:i,localizedStrings:c}){const w=l.useRef(null),d=l.createRef(),[p,m]=l.useState("generated"),[f,u]=l.useState("*"),[g,j]=l.useState("f"),x=l.useMemo(()=>({...i,markerMenuTrigger:i.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...i.view??yt.getDefaultViewOptions(),noteMode:"expanded"}}),[i]);l.useEffect(()=>{var R;(R=w.current)==null||R.focus()}),l.useEffect(()=>{var I,C;let R;const A=t==null?void 0:t.at(0);if(A&&yt.isInsertEmbedOpOfType("note",A)){const M=(I=A.insert.note)==null?void 0:I.caller;let N="custom";M===yt.GENERATOR_NOTE_CALLER?N="generated":M===yt.HIDDEN_NOTE_CALLER?N="hidden":M&&u(M),m(N),j(((C=A.insert.note)==null?void 0:C.style)??"f"),A.insert.note&&(A.insert.note.caller=""),R=setTimeout(()=>{var E;(E=w.current)==null||E.applyUpdate([{delete:1},A])},0)}return()=>{R&&clearTimeout(R)}},[t,a]);const T=l.useCallback(()=>{var A,I;const R=(I=(A=w.current)==null?void 0:A.getNoteOps(0))==null?void 0:I.at(0);R&&yt.isInsertEmbedOpOfType("note",R)&&(R.insert.note&&(p==="custom"?R.insert.note.caller=f:R.insert.note.caller=p==="generated"?yt.GENERATOR_NOTE_CALLER:yt.HIDDEN_NOTE_CALLER),n([R]))},[p,f,n]),y=()=>{var A;const R=(A=d.current)==null?void 0:A.getElementsByClassName("editor-input")[0];R!=null&&R.textContent&&navigator.clipboard.writeText(R.textContent)},S=R=>{var I,C,M;j(R);const A=(C=(I=w.current)==null?void 0:I.getNoteOps(0))==null?void 0:C.at(0);A&&yt.isInsertEmbedOpOfType("note",A)&&(A.insert.note&&(A.insert.note.style=R),(M=w.current)==null||M.applyUpdate([{delete:1},A]))};return r.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[r.jsxs("div",{className:"tw-flex",children:[r.jsxs("div",{className:"tw-flex tw-gap-4",children:[r.jsx(Wl,{noteType:g,handleNoteTypeChange:S,localizedStrings:c}),r.jsx(ql,{callerType:p,updateCallerType:m,customCaller:f,updateCustomCaller:u,localizedStrings:c})]}),r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[r.jsx(Rt,{children:r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:r.jsx(V,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:r.jsx(k.X,{})})}),r.jsx(Tt,{children:r.jsx("p",{children:c["%footnoteEditor_cancelButton_tooltip%"]})})]})}),r.jsx(Rt,{children:r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:r.jsx(V,{onClick:T,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:r.jsx(k.Check,{})})}),r.jsx(Tt,{children:c["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),r.jsxs("div",{ref:d,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[r.jsx("div",{className:e,children:r.jsx(yt.Editorial,{options:x,onScrRefChange:()=>{},scrRef:s,ref:w})}),r.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:r.jsx(Rt,{children:r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:r.jsx(V,{onClick:y,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:r.jsx(k.Copy,{})})}),r.jsx(Tt,{children:r.jsx("p",{children:c["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Ql=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function ps(e,t){if(!t||t.length===0)return e??"empty";const n=t.find(s=>typeof s=="string");if(n)return`key-${e??"unknown"}-${n.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function tc(e,t,n=!0,o=void 0){if(!t||t.length===0)return;const s=[],a=[];let i=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return r.jsxs("p",{children:[cr(e,c,n,!0,s),d&&o]},ps(e,c))})}function cr(e,t,n=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(a=>{if(typeof a=="string"){const i=`${e}-text-${a.slice(0,10)}`;if(o){const c=h(`usfm_${e}`);return r.jsx("span",{className:c,children:a},i)}return r.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[r.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),r.jsx("span",{children:a}),r.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return ec(a,ps(`${e}\\${a.marker}`,[a]),n,[...s,e??"unknown"])})}function ec(e,t,n,o=[]){const{marker:s}=e;return r.jsxs("span",{children:[s?n&&r.jsx("span",{className:"marker",children:`\\${s} `}):r.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),cr(s,e.content,n,!0,[...o,s??"unknown"])]},t)}function us({footnote:e,layout:t="horizontal",formatCaller:n,showMarkers:o=!0}){const s=n?n(e.caller):e.caller,a=s!==e.caller;let i,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([i,...c]=e.content);const w=o?r.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,d=o?r.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=s&&r.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=i&&r.jsxs(r.Fragment,{children:[cr(e.marker,[i],o,!1)," "]}),f=t==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=t==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",j=h(f,u);return r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",j),children:[w,p]}),r.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",j),children:m}),r.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",g,j),children:c&&c.length>0&&r.jsx(r.Fragment,{children:tc(e.marker,c,o,d)})})]})}function nc({className:e,classNameForItems:t,footnotes:n,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??v.getFormatCallerFunction(n,void 0),m=(y,S)=>{d==null||d(y,S,s)},f=a?n.findIndex(y=>y===a):-1,[u,g]=l.useState(f),j=(y,S,R)=>{if(n.length)switch(y.key){case"Enter":case" ":y.preventDefault(),d==null||d(S,R,s);break}},x=y=>{if(n.length)switch(y.key){case"ArrowDown":y.preventDefault(),g(S=>Math.min(S+1,n.length-1));break;case"ArrowUp":y.preventDefault(),g(S=>Math.max(S-1,0));break}},T=l.useRef([]);return l.useEffect(()=>{var y;u>=0&&u<T.current.length&&((y=T.current[u])==null||y.focus())},[u]),r.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",e),onKeyDown:x,children:r.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:n.map((y,S)=>{const R=y===a,A=`${s}-${S}`;return r.jsxs(r.Fragment,{children:[r.jsx("li",{ref:I=>{T.current[S]=I},role:"option","aria-selected":R,"data-marker":y.marker,"data-state":R?"selected":void 0,tabIndex:S===u?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",t),onClick:()=>m(y,S),onKeyDown:I=>j(I,y,S),children:r.jsx(us,{footnote:y,layout:o,formatCaller:()=>p(y.caller,S),showMarkers:i})},A),S<n.length-1&&o==="vertical"&&r.jsx(pe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function rc(e){const t=[];let n=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>n&&t.push(e.substring(n,s.index)),t.push(r.jsx("strong",{children:s[1]},s.index)),n=o.lastIndex;return n<e.length&&t.push(e.substring(n)),t.length>0?t:[e]}function oc({occurrenceData:e,setScriptureReference:t,localizedStrings:n,classNameForText:o}){const s=n["%webView_inventory_occurrences_table_header_reference%"],a=n["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],w=new Set;return e.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[e]);return r.jsxs(Ke,{stickyHeader:!0,children:[r.jsx(He,{stickyHeader:!0,children:r.jsxs(Et,{children:[r.jsx(_e,{children:s}),r.jsx(_e,{children:a})]})}),r.jsx(Ue,{children:i.length>0&&i.map(c=>r.jsxs(Et,{onClick:()=>{t(c.reference)},children:[r.jsx(qt,{children:v.formatScrRef(c.reference,"English")}),r.jsx(qt,{className:o,children:rc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const un=l.forwardRef(({className:e,...t},n)=>r.jsx(Dn.Root,{ref:n,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:r.jsx(Dn.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));un.displayName=Dn.Root.displayName;const mn=e=>e==="asc"?r.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?r.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):r.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),sc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>r.jsxs(V,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,mn(t.getIsSorted())]})}),ac=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>r.jsxs(V,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,mn(n.getIsSorted())]})}),ic=e=>({accessorKey:"count",header:({column:t})=>r.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:r.jsxs(V,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,mn(t.getIsSorted())]})}),cell:({row:t})=>r.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Sn=(e,t,n,o,s,a)=>{let i=[...n];e.forEach(w=>{t==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];e.forEach(w=>{t==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},lc=(e,t,n,o,s)=>({accessorKey:"status",header:({column:a})=>r.jsx("div",{className:"tw-flex tw-justify-center",children:r.jsxs(V,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,mn(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return r.jsxs(pn,{value:i,variant:"outline",type:"single",children:[r.jsx(Ne,{onClick:w=>{w.stopPropagation(),Sn([c],"approved",t,n,o,s)},value:"approved",children:r.jsx(k.CircleCheckIcon,{})}),r.jsx(Ne,{onClick:w=>{w.stopPropagation(),Sn([c],"unapproved",t,n,o,s)},value:"unapproved",children:r.jsx(k.CircleXIcon,{})}),r.jsx(Ne,{onClick:w=>{w.stopPropagation(),Sn([c],"unknown",t,n,o,s)},value:"unknown",children:r.jsx(k.CircleHelpIcon,{})})]})}}),cc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),dc=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},wc=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},ms=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",pc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),uc=(e,t,n)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),n!==""&&(o=o.filter(s=>s.items[0].includes(n))),o},mc=(e,t,n)=>{const o=[];return e.forEach(s=>{const a=o.find(i=>v.deepEqual(i.items,v.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:s.verseRef,text:s.verse});else{const i={items:v.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText,count:1,status:ms(v.isString(s.inventoryText)?s.inventoryText:s.inventoryText[0],t,n),occurrences:[{reference:s.verseRef,text:s.verse}]};o.push(i)}}),o},_t=(e,t)=>e[t]??t;function hc({inventoryItems:e,setVerseRef:t,localizedStrings:n,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:m}){const f=_t(n,"%webView_inventory_all%"),u=_t(n,"%webView_inventory_approved%"),g=_t(n,"%webView_inventory_unapproved%"),j=_t(n,"%webView_inventory_unknown%"),x=_t(n,"%webView_inventory_scope_currentBook%"),T=_t(n,"%webView_inventory_scope_chapter%"),y=_t(n,"%webView_inventory_scope_verse%"),S=_t(n,"%webView_inventory_filter_text%"),R=_t(n,"%webView_inventory_show_additional_items%"),A=_t(n,"%webView_inventory_no_results%"),[I,C]=l.useState(!1),[M,N]=l.useState("all"),[E,L]=l.useState(""),[B,U]=l.useState([]),P=l.useMemo(()=>{const $=e??[];return $.length===0?[]:mc($,s,a)},[e,s,a]),G=l.useMemo(()=>{if(I)return P;const $=[];return P.forEach(tt=>{const at=tt.items[0],it=$.find(gt=>gt.items[0]===at);it?(it.count+=tt.count,it.occurrences=it.occurrences.concat(tt.occurrences)):$.push({items:[at],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),$},[I,P]),O=l.useMemo(()=>G.length===0?[]:uc(G,M,E),[G,M,E]),Z=l.useMemo(()=>{var at,it;if(!I)return w;const $=(at=o==null?void 0:o.tableHeaders)==null?void 0:at.length;if(!$)return w;const tt=[];for(let gt=0;gt<$;gt++)tt.push(ac(((it=o==null?void 0:o.tableHeaders)==null?void 0:it[gt])||"Additional Item",gt+1));return[...tt,...w]},[o==null?void 0:o.tableHeaders,w,I]);l.useEffect(()=>{O.length===0?U([]):O.length===1&&U(O[0].items)},[O]);const bt=($,tt)=>{tt.setRowSelection(()=>{const at={};return at[$.index]=!0,at}),U($.original.items)},Ot=$=>{if($==="book"||$==="chapter"||$==="verse")c($);else throw new Error(`Invalid scope value: ${$}`)},vt=$=>{if($==="all"||$==="approved"||$==="unapproved"||$==="unknown")N($);else throw new Error(`Invalid status filter value: ${$}`)},nt=l.useMemo(()=>{if(G.length===0||B.length===0)return[];const $=G.filter(tt=>v.deepEqual(I?tt.items:[tt.items[0]],B));if($.length>1)throw new Error("Selected item is not unique");return $.length===0?[]:$[0].occurrences},[B,I,G]);return r.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[r.jsxs("div",{className:"tw-flex tw-items-stretch",children:[r.jsxs(ue,{onValueChange:$=>vt($),defaultValue:M,children:[r.jsx(Wt,{className:"tw-m-1",children:r.jsx(me,{placeholder:"Select filter"})}),r.jsxs(Zt,{children:[r.jsx(ft,{value:"all",children:f}),r.jsx(ft,{value:"approved",children:u}),r.jsx(ft,{value:"unapproved",children:g}),r.jsx(ft,{value:"unknown",children:j})]})]}),r.jsxs(ue,{onValueChange:$=>Ot($),defaultValue:i,children:[r.jsx(Wt,{className:"tw-m-1",children:r.jsx(me,{placeholder:"Select scope"})}),r.jsxs(Zt,{children:[r.jsx(ft,{value:"book",children:x}),r.jsx(ft,{value:"chapter",children:T}),r.jsx(ft,{value:"verse",children:y})]})]}),r.jsx(xe,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:E,onChange:$=>{L($.target.value)}}),o&&r.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[r.jsx(un,{className:"tw-m-1",checked:I,onCheckedChange:$=>{C($)}}),r.jsx(rt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??R})]})]}),r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(is,{columns:Z,data:O,onRowClickHandler:bt,stickyHeader:!0,isLoading:p,noResultsMessage:A})}),nt.length>0&&r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(oc,{classNameForText:m,occurrenceData:nt,setScriptureReference:t,localizedStrings:n})})]})}const fc=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function gc({localizedStrings:e,markerMenuItems:t}){const[n,o]=l.useState(""),s=l.useMemo(()=>{const a=n.trim().toLowerCase();return a?t.filter(i=>{var c;return((c=i.marker)==null?void 0:c.toLowerCase().includes(a))||i.title.toLowerCase().includes(a)}):t},[n,t]);return r.jsxs(Vt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[r.jsx(he,{value:n,onValueChange:a=>o(a),placeholder:e["%markerMenu_searchPlaceholder%"]}),r.jsxs($t,{children:[r.jsx(Ee,{children:e["%markerMenu_noResults%"]}),r.jsx(Mt,{children:s.map(a=>r.jsxs(Dt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[r.jsx("div",{className:"tw-w-6",children:a.marker?r.jsx("span",{className:"tw-text-xs",children:a.marker}):r.jsx("div",{children:a.icon})}),r.jsxs("div",{children:[r.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&r.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&r.jsx(ro,{className:"tw-font-sans",children:a.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]},`item-${a.title}`))})]})]})}const xc="16rem",bc="3rem",hs=l.createContext(void 0);function Xe(){const e=l.useContext(hs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const dr=l.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,p]=l.useState(e),m=t??d,f=l.useCallback(S=>{const R=typeof S=="function"?S(m):S;n?n(R):p(R)},[n,m]),u=l.useCallback(()=>f(S=>!S),[f]),g=m?"expanded":"collapsed",T=st()==="ltr"?i:i==="primary"?"secondary":"primary",y=l.useMemo(()=>({state:g,open:m,setOpen:f,toggleSidebar:u,side:T}),[g,m,f,u,T]);return r.jsx(hs.Provider,{value:y,children:r.jsx(Rt,{delayDuration:0,children:r.jsx("div",{style:{"--sidebar-width":xc,"--sidebar-width-icon":bc,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});dr.displayName="SidebarProvider";const wr=l.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:o,...s},a)=>{const i=Xe();return t==="none"?r.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:a,...s,children:o}):r.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[r.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),r.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...s,children:r.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});wr.displayName="Sidebar";const fs=l.forwardRef(({className:e,onClick:t,...n},o)=>{const s=Xe();return r.jsxs(V,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",e),onClick:a=>{t==null||t(a),s.toggleSidebar()},...n,children:[s.side==="primary"?r.jsx(k.PanelLeft,{}):r.jsx(k.PanelRight,{}),r.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});fs.displayName="SidebarTrigger";const gs=l.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:o}=Xe();return r.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});gs.displayName="SidebarRail";const pr=l.forwardRef(({className:e,...t},n)=>r.jsx("main",{ref:n,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));pr.displayName="SidebarInset";const xs=l.forwardRef(({className:e,...t},n)=>r.jsx(xe,{ref:n,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));xs.displayName="SidebarInput";const bs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));bs.displayName="SidebarHeader";const vs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));vs.displayName="SidebarFooter";const ys=l.forwardRef(({className:e,...t},n)=>r.jsx(pe,{ref:n,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));ys.displayName="SidebarSeparator";const ur=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));ur.displayName="SidebarContent";const nn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));nn.displayName="SidebarGroup";const rn=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?Ce.Slot:"div";return r.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});rn.displayName="SidebarGroupLabel";const Ns=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?Ce.Slot:"button";return r.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});Ns.displayName="SidebarGroupAction";const on=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",e),...t}));on.displayName="SidebarGroupContent";const mr=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));mr.displayName="SidebarMenu";const hr=l.forwardRef(({className:e,...t},n)=>r.jsx("li",{ref:n,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",e),...t}));hr.displayName="SidebarMenuItem";const vc=Qt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),fr=l.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=e?Ce.Slot:"button",{state:d}=Xe(),p=r.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:h(vc({variant:n,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:p}),r.jsx(Tt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});fr.displayName="SidebarMenuButton";const js=l.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...o},s)=>{const a=t?Ce.Slot:"button";return r.jsx(a,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});js.displayName="SidebarMenuAction";const ks=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));ks.displayName="SidebarMenuBadge";const _s=l.forwardRef(({className:e,showIcon:t=!1,...n},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return r.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&r.jsx(en,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),r.jsx(en,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});_s.displayName="SidebarMenuSkeleton";const Cs=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Cs.displayName="SidebarMenuSub";const Ss=l.forwardRef(({...e},t)=>r.jsx("li",{ref:t,...e}));Ss.displayName="SidebarMenuSubItem";const Es=l.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:o,...s},a)=>{const i=e?Ce.Slot:"a";return r.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Es.displayName="SidebarMenuSubButton";function Rs({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((f,u)=>{o(f,u)},[o]),p=l.useCallback(f=>{const u=n.find(g=>g.projectId===f);return u?u.projectName:f},[n]),m=l.useCallback(f=>!s.projectId&&f===s.label,[s]);return r.jsx(wr,{id:e,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:r.jsxs(ur,{children:[r.jsxs(nn,{children:[r.jsx(rn,{className:"tw-text-sm",children:a}),r.jsx(on,{children:r.jsx(mr,{children:Object.entries(t).map(([f,u])=>r.jsx(hr,{children:r.jsx(fr,{onClick:()=>d(f),isActive:m(f),children:r.jsx("span",{className:"tw-pl-3",children:u})})},f))})})]}),r.jsxs(nn,{children:[r.jsx(rn,{className:"tw-text-sm",children:i}),r.jsx(on,{className:"tw-pl-3",children:r.jsx(tn,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:f=>{const u=p(f);d(u,f)},value:(s==null?void 0:s.projectId)??void 0,icon:r.jsx(k.ScrollText,{})})})]})]})})}const hn=l.forwardRef(({value:e,onSearch:t,placeholder:n,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=st();return r.jsxs("div",{id:i,className:h("tw-relative",{"tw-w-full":o},s),children:[r.jsx(k.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),r.jsx(xe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:d=>t(d.target.value),disabled:a}),e&&r.jsxs(V,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{t("")},children:[r.jsx(k.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});hn.displayName="SearchBar";function yc({id:e,extensionLabels:t,projectInfo:n,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return r.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[r.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:r.jsx(hn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),r.jsxs(dr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[r.jsx(Rs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:n,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),r.jsx(pr,{className:"tw-min-w-[215px]",children:o})]})]})}const Ht="scrBook",Nc="scrRef",le="source",jc="details",kc="Scripture Reference",_c="Scripture Book",Ts="Type",Cc="Details";function Sc(e,t){const n=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Ht,header:(e==null?void 0:e.scriptureReferenceColumnName)??kc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?X.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Ht?v.formatScrRef(s.start):void 0},getGroupingValue:o=>X.bookIdToNumber(o.start.book),sortingFn:(o,s)=>v.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>v.formatScrRef(o.start),id:Nc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:v.formatScrRef(s.start)},sortingFn:(o,s)=>v.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:le,header:n?(e==null?void 0:e.typeColumnName)??Ts:void 0,cell:o=>n||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:jc,header:(e==null?void 0:e.detailsColumnName)??Cc,cell:o=>o.getValue(),enableGrouping:!1}]}const Ec=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||v.compareScrRefs(e.start,e.end)===0?`${v.scrRefToBBBCCCVVV(e.start)}+${t}`:`${v.scrRefToBBBCCCVVV(e.start)}+${t}-${v.scrRefToBBBCCCVVV(e.end)}+${n}`},Gr=e=>`${Ec({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Rc({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[m,f]=l.useState([{id:Ht,desc:!1}]),[u,g]=l.useState({}),j=l.useMemo(()=>e.flatMap(N=>N.data.map(E=>({...E,source:N.source}))),[e]),x=l.useMemo(()=>Sc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},n),[o,a,i,n]);l.useEffect(()=>{d.includes(le)?f([{id:le,desc:!1},{id:Ht,desc:!1}]):f([{id:Ht,desc:!1}])},[d]);const T=wt.useReactTable({data:j,columns:x,state:{grouping:d,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:wt.getExpandedRowModel(),getGroupedRowModel:wt.getGroupedRowModel(),getCoreRowModel:wt.getCoreRowModel(),getSortedRowModel:wt.getSortedRowModel(),getRowId:Gr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const N=T.getSelectedRowModel().rowsById,E=Object.keys(N);if(E.length===1){const L=j.find(B=>Gr(B)===E[0])||void 0;L&&c(L)}}},[u,j,c,T]);const y=s??_c,S=a??Ts,R=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[Ht]},{label:`Group by ${S}`,value:[le]},{label:`Group by ${y} and ${S}`,value:[Ht,le]},{label:`Group by ${S} and ${y}`,value:[le,Ht]}],A=N=>{p(JSON.parse(N))},I=(N,E)=>{!N.getIsGrouped()&&!N.getIsSelected()&&N.getToggleSelectedHandler()(E)},C=(N,E)=>N.getIsGrouped()?"":h("banded-row",E%2===0?"even":"odd"),M=(N,E,L)=>{if(!((N==null?void 0:N.length)===0||E.depth<L.column.getGroupedIndex())){if(E.getIsGrouped())switch(E.depth){case 1:return"tw-ps-4";default:return}switch(E.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return r.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&r.jsxs(ue,{value:JSON.stringify(d),onValueChange:N=>{A(N)},children:[r.jsx(Wt,{className:"tw-mb-1 tw-mt-2",children:r.jsx(me,{})}),r.jsx(Zt,{position:"item-aligned",children:r.jsx(es,{children:R.map(N=>r.jsx(ft,{value:JSON.stringify(N.value),children:N.label},N.label))})})]}),r.jsxs(Ke,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&r.jsx(He,{children:T.getHeaderGroups().map(N=>r.jsx(Et,{children:N.headers.filter(E=>E.column.columnDef.header).map(E=>r.jsx(_e,{colSpan:E.colSpan,className:"top-0 tw-sticky",children:E.isPlaceholder?void 0:r.jsxs("div",{children:[E.column.getCanGroup()?r.jsx(V,{variant:"ghost",title:`Toggle grouping by ${E.column.columnDef.header}`,onClick:E.column.getToggleGroupingHandler(),type:"button",children:E.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",wt.flexRender(E.column.columnDef.header,E.getContext())]})},E.id))},N.id))}),r.jsx(Ue,{children:T.getRowModel().rows.map((N,E)=>{const L=st();return r.jsx(Et,{"data-state":N.getIsSelected()?"selected":"",className:h(C(N,E)),onClick:B=>I(N,B),children:N.getVisibleCells().map(B=>{if(!(B.getIsPlaceholder()||B.column.columnDef.enableGrouping&&!B.getIsGrouped()&&(B.column.columnDef.id!==le||!n)))return r.jsx(qt,{className:h(B.column.columnDef.id,"tw-p-[1px]",M(d,N,B)),children:B.getIsGrouped()?r.jsxs(V,{variant:"link",onClick:N.getToggleExpandedHandler(),type:"button",children:[N.getIsExpanded()&&r.jsx(k.ChevronDown,{}),!N.getIsExpanded()&&(L==="ltr"?r.jsx(k.ChevronRight,{}):r.jsx(k.ChevronLeft,{}))," ",wt.flexRender(B.column.columnDef.cell,B.getContext())," (",N.subRows.length,")"]}):wt.flexRender(B.column.columnDef.cell,B.getContext())},B.id)})},N.id)})})]})]})}const gr=(e,t)=>e.filter(n=>{try{return v.getSectionForBook(n)===t}catch{return!1}}),Ms=(e,t,n)=>gr(e,t).every(o=>n.includes(o));function Tc({section:e,availableBookIds:t,selectedBookIds:n,onToggle:o,localizedStrings:s}){const a=gr(t,e).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return r.jsx(V,{variant:"outline",size:"sm",onClick:()=>o(e),className:h(Ms(t,e,n)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:ai(e,i,c,w,d)})}const Kr=5,En=6;function Mc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:n,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:u,dcLong:g,extraLong:j}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[x,T]=l.useState(!1),[y,S]=l.useState(""),R=l.useRef(void 0),A=l.useRef(!1);if(e.length!==X.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const I=l.useMemo(()=>X.allBookIds.filter((P,G)=>e[G]==="1"&&!X.isObsolete(X.bookIdToNumber(P))),[e]),C=l.useMemo(()=>{if(!y.trim()){const O={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return I.forEach(Z=>{const bt=v.getSectionForBook(Z);O[bt].push(Z)}),O}const P=I.filter(O=>Un(O,y,s)),G={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return P.forEach(O=>{const Z=v.getSectionForBook(O);G[Z].push(O)}),G},[I,y,s]),M=l.useCallback((P,G=!1)=>{if(!G||!R.current){n(t.includes(P)?t.filter(nt=>nt!==P):[...t,P]),R.current=P;return}const O=I.findIndex(nt=>nt===R.current),Z=I.findIndex(nt=>nt===P);if(O===-1||Z===-1)return;const[bt,Ot]=[Math.min(O,Z),Math.max(O,Z)],vt=I.slice(bt,Ot+1).map(nt=>nt);n(t.includes(P)?t.filter(nt=>!vt.includes(nt)):[...new Set([...t,...vt])])},[t,n,I]),N=P=>{M(P,A.current),A.current=!1},E=(P,G)=>{P.preventDefault(),M(G,P.shiftKey)},L=l.useCallback(P=>{const G=gr(I,P).map(O=>O);n(Ms(I,P,t)?t.filter(O=>!G.includes(O)):[...new Set([...t,...G])])},[t,n,I]),B=()=>{n(I.map(P=>P))},U=()=>{n([])};return r.jsxs("div",{className:"tw-space-y-2",children:[r.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(v.Section).map(P=>r.jsx(Tc,{section:P,availableBookIds:I,selectedBookIds:t,onToggle:L,localizedStrings:o},P))}),r.jsxs(te,{open:x,onOpenChange:P=>{T(P),P||S("")},children:[r.jsx(ee,{asChild:!0,children:r.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":x,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${a}: ${t.length}`:i,r.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Bt,{className:"tw-w-full tw-p-0",align:"start",children:r.jsxs(Vt,{shouldFilter:!1,onKeyDown:P=>{P.key==="Enter"&&(A.current=P.shiftKey)},children:[r.jsx(he,{placeholder:c,value:y,onValueChange:S}),r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx(V,{variant:"ghost",size:"sm",onClick:B,children:w}),r.jsx(V,{variant:"ghost",size:"sm",onClick:U,children:d})]}),r.jsxs($t,{children:[r.jsx(Ee,{children:p}),Object.values(v.Section).map((P,G)=>{const O=C[P];if(O.length!==0)return r.jsxs(l.Fragment,{children:[r.jsx(Mt,{heading:wo(P,f,u,g,j),children:O.map(Z=>r.jsx(uo,{bookId:Z,isSelected:t.includes(Z),onSelect:()=>N(Z),onMouseDown:bt=>E(bt,Z),section:v.getSectionForBook(Z),showCheck:!0,localizedBookNames:s,commandValue:An(Z,s),className:"tw-flex tw-items-center"},Z))}),G<Object.values(v.Section).length-1&&r.jsx(no,{})]},P)})]})]})})]}),t.length>0&&r.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===En?En:Kr).map(P=>r.jsx(we,{className:"hover:tw-bg-secondary",variant:"secondary",children:ye(P,s)},P)),t.length>En&&r.jsx(we,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Kr} ${m}`})]})]})}const Dc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),se=(e,t)=>e[t]??t;function Ic({scope:e,availableScopes:t,onScopeChange:n,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w}){const d=se(i,"%webView_scope_selector_selected_text%"),p=se(i,"%webView_scope_selector_current_verse%"),m=se(i,"%webView_scope_selector_current_chapter%"),f=se(i,"%webView_scope_selector_current_book%"),u=se(i,"%webView_scope_selector_choose_books%"),g=se(i,"%webView_scope_selector_scope%"),j=se(i,"%webView_scope_selector_select_books%"),x=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],T=t?x.filter(y=>t.includes(y.value)):x;return r.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(rt,{children:g}),r.jsx(cn,{value:e,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:T.map(({value:y,label:S,id:R})=>r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx($e,{className:"tw-me-2",value:y,id:R}),r.jsx(rt,{htmlFor:R,children:S})]},R))})]}),e==="selectedBooks"&&r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(rt,{children:j}),r.jsx(Mc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const Rn={[v.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[v.getLocalizeKeyForScrollGroupId(0)]:"A",[v.getLocalizeKeyForScrollGroupId(1)]:"B",[v.getLocalizeKeyForScrollGroupId(2)]:"C",[v.getLocalizeKeyForScrollGroupId(3)]:"D",[v.getLocalizeKeyForScrollGroupId(4)]:"E",[v.getLocalizeKeyForScrollGroupId(5)]:"F",[v.getLocalizeKeyForScrollGroupId(6)]:"G",[v.getLocalizeKeyForScrollGroupId(7)]:"H",[v.getLocalizeKeyForScrollGroupId(8)]:"I",[v.getLocalizeKeyForScrollGroupId(9)]:"J",[v.getLocalizeKeyForScrollGroupId(10)]:"K",[v.getLocalizeKeyForScrollGroupId(11)]:"L",[v.getLocalizeKeyForScrollGroupId(12)]:"M",[v.getLocalizeKeyForScrollGroupId(13)]:"N",[v.getLocalizeKeyForScrollGroupId(14)]:"O",[v.getLocalizeKeyForScrollGroupId(15)]:"P",[v.getLocalizeKeyForScrollGroupId(16)]:"Q",[v.getLocalizeKeyForScrollGroupId(17)]:"R",[v.getLocalizeKeyForScrollGroupId(18)]:"S",[v.getLocalizeKeyForScrollGroupId(19)]:"T",[v.getLocalizeKeyForScrollGroupId(20)]:"U",[v.getLocalizeKeyForScrollGroupId(21)]:"V",[v.getLocalizeKeyForScrollGroupId(22)]:"W",[v.getLocalizeKeyForScrollGroupId(23)]:"X",[v.getLocalizeKeyForScrollGroupId(24)]:"Y",[v.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Oc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...Rn,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in Rn?Rn[d]:p]))},w=st();return r.jsxs(ue,{value:`${t}`,onValueChange:d=>n(d==="undefined"?void 0:parseInt(d,10)),children:[r.jsx(Wt,{size:s,className:h("pr-twp tw-w-auto",a),children:r.jsx(me,{placeholder:c[v.getLocalizeKeyForScrollGroupId(t)]??t})}),r.jsx(Zt,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:250},children:e.map(d=>r.jsx(ft,{value:`${d}`,children:c[v.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Ac({children:e}){return r.jsx("div",{className:"pr-twp tw-grid",children:e})}function Pc({primary:e,secondary:t,children:n,isLoading:o=!1,loadingMessage:s}){return r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),r.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):r.jsx("div",{children:n})]})}function Lc({primary:e,secondary:t,includeSeparator:n=!1}){return r.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?r.jsx(pe,{}):""]})}function Ds(e,t){var n;return(n=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:n[0]}function sn({icon:e,menuLabel:t,leading:n}){return e?r.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`}):void 0}const Is=(e,t,n,o)=>n?Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>t.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:"command"in c?r.jsxs(Fe,{onClick:()=>{o(c)},children:[c.iconPathBefore&&r.jsx(sn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&r.jsx(sn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):r.jsxs(Zo,{children:[r.jsx(or,{children:c.label}),r.jsx(Wo,{children:r.jsx(sr,{children:Is(e,t,Ds(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&r.jsx(Tt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function an({onSelectMenuItem:e,menuData:t,tabLabel:n,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return r.jsxs(ne,{variant:a,children:[r.jsx(fe,{"aria-label":n,className:s,asChild:!0,id:c,children:r.jsx(V,{variant:i,size:"icon",children:o??r.jsx(k.MenuIcon,{})})}),r.jsx(zt,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>r.jsxs(l.Fragment,{children:[r.jsx(rr,{children:r.jsx(Rt,{children:Is(t.groups,t.items,w,e)})}),d<p.length-1&&r.jsx(ge,{})]},w))})]})}const Os=l.forwardRef(({id:e,className:t,children:n},o)=>r.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:n}));function Vc({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:n,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return r.jsxs(Os,{className:`tw-w-full tw-border ${a}`,id:s,children:[n&&r.jsx(an,{onSelectMenuItem:e,menuData:n,tabLabel:"Project",icon:d??r.jsx(k.Menu,{}),buttonVariant:"ghost"}),i&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),r.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&r.jsx(an,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:r.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function $c({onSelectProjectMenuItem:e,projectMenuData:t,id:n,className:o,menuButtonIcon:s}){return r.jsx(Os,{className:"tw-pointer-events-none",id:n,children:t&&r.jsx(an,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const xr=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsx(mt.Root,{orientation:"vertical",ref:n,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});xr.displayName=mt.List.displayName;const br=l.forwardRef(({className:e,...t},n)=>r.jsx(mt.List,{ref:n,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));br.displayName=mt.List.displayName;const As=l.forwardRef(({className:e,...t},n)=>r.jsx(mt.Trigger,{ref:n,...t,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),vr=l.forwardRef(({className:e,...t},n)=>r.jsx(mt.Content,{ref:n,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));vr.displayName=mt.Content.displayName;function Bc({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return r.jsxs("div",{id:i,className:"pr-twp",children:[r.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?r.jsx("h1",{children:s}):"",r.jsx(hn,{className:a,value:t,onSearch:n,placeholder:o})]}),r.jsxs(xr,{children:[r.jsx(br,{children:e.map(c=>r.jsx(As,{value:c.value,children:c.value},c.key))}),e.map(c=>r.jsx(vr,{value:c.value,children:c.content},c.key))]})]})}function Fc({...e}){return r.jsx(J.Menu,{...e})}function zc({...e}){return r.jsx(J.Sub,{"data-slot":"menubar-sub",...e})}const Ps=l.forwardRef(({className:e,variant:t="default",...n},o)=>{const s=l.useMemo(()=>({variant:t}),[t]);return r.jsx(nr.Provider,{value:s,children:r.jsx(J.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...n})})});Ps.displayName=J.Root.displayName;const Ls=l.forwardRef(({className:e,...t},n)=>{const o=kt();return r.jsx(J.Trigger,{ref:n,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Ft({variant:o.variant,className:e})),...t})});Ls.displayName=J.Trigger.displayName;const Vs=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=kt();return r.jsxs(J.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",Ft({variant:a.variant,className:e}),e),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Vs.displayName=J.SubTrigger.displayName;const $s=l.forwardRef(({className:e,...t},n)=>{const o=kt();return r.jsx(J.SubContent,{ref:n,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});$s.displayName=J.SubContent.displayName;const Bs=l.forwardRef(({className:e,align:t="start",alignOffset:n=-4,sideOffset:o=8,...s},a)=>{const i=kt();return r.jsx(J.Portal,{children:r.jsx(J.Content,{ref:a,align:t,alignOffset:n,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...s})})});Bs.displayName=J.Content.displayName;const Fs=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=kt();return r.jsx(J.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",Ft({variant:s.variant,className:e}),e),...n})});Fs.displayName=J.Item.displayName;const Gc=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=kt();return r.jsxs(J.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ft({variant:a.variant,className:e}),e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(J.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Gc.displayName=J.CheckboxItem.displayName;const Kc=l.forwardRef(({className:e,children:t,...n},o)=>{const s=kt();return r.jsxs(J.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ft({variant:s.variant,className:e}),e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(J.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Kc.displayName=J.RadioItem.displayName;const Hc=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(J.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Hc.displayName=J.Label.displayName;const zs=l.forwardRef(({className:e,...t},n)=>r.jsx(J.Separator,{ref:n,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));zs.displayName=J.Separator.displayName;const Oe=(e,t)=>{setTimeout(()=>{t.forEach(n=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},Gs=(e,t,n,o)=>{if(!n)return;const s=Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=t.filter(d=>d.group===a).sort((d,p)=>d.order-p.order).map(d=>r.jsxs(Pt,{children:[r.jsx(Ut,{asChild:!0,children:"command"in d?r.jsxs(Fs,{onClick:()=>{o(d)},children:[d.iconPathBefore&&r.jsx(sn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&r.jsx(sn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):r.jsxs(zc,{children:[r.jsx(Vs,{children:d.label}),r.jsx($s,{children:Gs(e,t,Ds(e,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&r.jsx(Tt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(r.jsx(zs,{},`separator-${a}`)),w})};function Uc({menuData:e,onSelectMenuItem:t,onOpenChange:n,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if(La.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var g,j,x,T;p.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Oe(a,[f]);break;case"alt+p":(g=a.current)==null||g.focus(),Oe(a,[f,u]);break;case"alt+l":(j=i.current)==null||j.focus(),Oe(i,[f,u]);break;case"alt+n":(x=c.current)==null||x.focus(),Oe(c,[f,u]);break;case"alt+h":(T=w.current)==null||T.focus(),Oe(w,[f,u]);break}}),l.useEffect(()=>{if(!n||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const j=g.target.getAttribute("data-state");n(j==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[n]),!!e)return r.jsx(Ps,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>r.jsxs(Fc,{children:[r.jsx(Ls,{ref:d(p),children:typeof m=="object"&&"label"in m&&m.label}),r.jsx(Bs,{className:"tw-z-[250]",children:r.jsx(Rt,{children:Gs(e.groups,e.items,p,t)})})]},p))})}function Xc(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function qc({menuData:e,onOpenChange:t,onSelectMenuItem:n,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return r.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:r.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[r.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,e&&r.jsx(Uc,{menuData:e,onOpenChange:t,onSelectMenuItem:n,variant:d})]})}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),r.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:r.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Yc=(e,t)=>e[t]??t;function Jc({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=Yc(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=l.useState(!1),f=g=>{s&&s(g),o&&o([g,...n.filter(j=>j!==g)]),a&&n.find(j=>j===g)&&a([...n.filter(j=>j!==g)]),m(!1)},u=(g,j)=>{var T,y,S,R,A,I;const x=j!==g?((y=(T=e[g])==null?void 0:T.uiNames)==null?void 0:y[j])??((R=(S=e[g])==null?void 0:S.uiNames)==null?void 0:R.en):void 0;return x?`${(A=e[g])==null?void 0:A.autonym} (${x})`:(I=e[g])==null?void 0:I.autonym};return r.jsxs("div",{id:w,className:h("pr-twp tw-max-w-sm",c),children:[r.jsxs(ue,{name:"uiLanguage",value:t,onValueChange:f,open:p,onOpenChange:g=>m(g),children:[r.jsx(Wt,{children:r.jsx(me,{})}),r.jsx(Zt,{className:"tw-z-[250]",children:Object.keys(e).map(g=>r.jsx(ft,{value:g,children:u(g,t)},g))})]}),t!=="en"&&r.jsx("div",{className:"tw-pt-3",children:r.jsx(rt,{className:"tw-font-normal tw-text-muted-foreground",children:v.formatReplacementString(d,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function Wc({item:e,createLabel:t,createComplexLabel:n}){return t?r.jsx(rt,{children:t(e)}):n?r.jsx(rt,{children:n(e)}):r.jsx(rt,{children:e})}function Zc({id:e,className:t,listItems:n,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return r.jsx("div",{id:e,className:t,children:n.map(c=>r.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[r.jsx(un,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),r.jsx(Wc,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function Qc({cardKey:e,isSelected:t,onSelect:n,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:w,accentColor:d}){const p=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),n())};return r.jsxs("div",{hidden:s,onClick:n,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":t,className:h("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-accent":t},{"tw-bg-transparent":!t},a),children:[r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[r.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[r.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),t&&c&&r.jsxs(ne,{children:[r.jsx(fe,{className:h(d&&"tw-me-1"),asChild:!0,children:r.jsx(V,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:r.jsx(k.MoreHorizontal,{})})}),r.jsx(zt,{align:"end",children:c})]})]}),t&&w&&r.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:w})]}),d&&r.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},e)}const Ks=l.forwardRef(({className:e,...t},n)=>r.jsx(k.LoaderCircle,{size:35,className:h("tw-animate-spin",e),...t,ref:n}));Ks.displayName="Spinner";function td({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:m,onFocus:f,onBlur:u}){return r.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[r.jsx(rt,{htmlFor:e,className:h({"tw-text-red-600":n,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),r.jsx(xe,{id:e,disabled:t,placeholder:i,required:c,className:h(w,{"tw-border-red-600":n}),defaultValue:d,value:p,onChange:m,onFocus:f,onBlur:u}),r.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const ed=Qt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Hs=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,role:"alert",className:h("pr-twp",ed({variant:t}),e),...n}));Hs.displayName="Alert";const Us=l.forwardRef(({className:e,...t},n)=>r.jsxs("h5",{ref:n,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Us.displayName="AlertTitle";const Xs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:h("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Xs.displayName="AlertDescription";const nd=W.Root,rd=W.Trigger,od=W.Group,sd=W.Portal,ad=W.Sub,id=W.RadioGroup,qs=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>r.jsxs(W.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));qs.displayName=W.SubTrigger.displayName;const Ys=l.forwardRef(({className:e,...t},n)=>r.jsx(W.SubContent,{ref:n,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Ys.displayName=W.SubContent.displayName;const Js=l.forwardRef(({className:e,...t},n)=>r.jsx(W.Portal,{children:r.jsx(W.Content,{ref:n,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));Js.displayName=W.Content.displayName;const Ws=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(W.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));Ws.displayName=W.Item.displayName;const Zs=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>r.jsxs(W.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));Zs.displayName=W.CheckboxItem.displayName;const Qs=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(W.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));Qs.displayName=W.RadioItem.displayName;const ta=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(W.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...n}));ta.displayName=W.Label.displayName;const ea=l.forwardRef(({className:e,...t},n)=>r.jsx(W.Separator,{ref:n,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));ea.displayName=W.Separator.displayName;function na({className:e,...t}){return r.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}na.displayName="ContextMenuShortcut";const ra=l.createContext({direction:"bottom"});function oa({shouldScaleBackground:e=!0,direction:t="bottom",...n}){const o=l.useMemo(()=>({direction:t}),[t]);return r.jsx(ra.Provider,{value:o,children:r.jsx(jt.Drawer.Root,{shouldScaleBackground:e,direction:t,...n})})}oa.displayName="Drawer";const ld=jt.Drawer.Trigger,sa=jt.Drawer.Portal,cd=jt.Drawer.Close,yr=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Overlay,{ref:n,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));yr.displayName=jt.Drawer.Overlay.displayName;const aa=l.forwardRef(({className:e,children:t,hideDrawerHandle:n=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(ra),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return r.jsxs(sa,{children:[r.jsx(yr,{}),r.jsxs(jt.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],e),...o,children:[!n&&(a==="bottom"||a==="right")&&r.jsx("div",{className:c[a]}),r.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!n&&(a==="top"||a==="left")&&r.jsx("div",{className:c[a]})]})]})});aa.displayName="DrawerContent";function ia({className:e,...t}){return r.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}ia.displayName="DrawerHeader";function la({className:e,...t}){return r.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}la.displayName="DrawerFooter";const ca=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Title,{ref:n,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));ca.displayName=jt.Drawer.Title.displayName;const da=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Description,{ref:n,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));da.displayName=jt.Drawer.Description.displayName;const wa=l.forwardRef(({className:e,value:t,...n},o)=>r.jsx(In.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...n,children:r.jsx(In.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));wa.displayName=In.Root.displayName;function dd({className:e,...t}){return r.jsx(Fn.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const wd=Fn.Panel;function pd({withHandle:e,className:t,...n}){return r.jsx(Fn.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...n,children:e&&r.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:r.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function ud({...e}){return r.jsx(qr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const pa=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsxs(Ae.Root,{ref:n,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[r.jsx(Ae.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:r.jsx(Ae.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),r.jsx(Ae.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});pa.displayName=Ae.Root.displayName;const ua=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsx(On.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:r.jsx(On.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ua.displayName=On.Root.displayName;const md=mt.Root,ma=l.forwardRef(({className:e,...t},n)=>{const o=st();return r.jsx(mt.List,{ref:n,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});ma.displayName=mt.List.displayName;const ha=l.forwardRef(({className:e,...t},n)=>r.jsx(mt.Trigger,{ref:n,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ha.displayName=mt.Trigger.displayName;const fa=l.forwardRef(({className:e,...t},n)=>r.jsx(mt.Content,{ref:n,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));fa.displayName=mt.Content.displayName;const ga=l.forwardRef(({className:e,...t},n)=>r.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:n,...t}));ga.displayName="Textarea";const hd=(e,t)=>{l.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])};function fd(e){return{preserveValue:!0,...e}}const xa=(e,t,n={})=>{const o=l.useRef(t);o.current=t;const s=l.useRef(n);s.current=fd(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!e),(async()=>{if(e){const p=await e();d&&(i(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[e]),[a,c]},Tn=()=>!1,gd=(e,t)=>{const[n]=xa(l.useCallback(async()=>{if(!e)return Tn;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),Tn,{preserveValue:!1});l.useEffect(()=>()=>{n!==Tn&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>qr.toast});exports.Alert=Hs;exports.AlertDescription=Xs;exports.AlertTitle=Us;exports.Avatar=tr;exports.AvatarFallback=er;exports.AvatarImage=Jo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ui;exports.BOOK_SELECTOR_STRING_KEYS=fi;exports.Badge=we;exports.BookChapterControl=pi;exports.BookSelectionMode=go;exports.BookSelector=gi;exports.Button=V;exports.COMMENT_LIST_STRING_KEYS=xi;exports.Card=Zn;exports.CardContent=Qn;exports.CardDescription=qo;exports.CardFooter=Yo;exports.CardHeader=Uo;exports.CardTitle=Xo;exports.ChapterRangeSelector=fo;exports.Checkbox=un;exports.Checklist=Zc;exports.ComboBox=tn;exports.Command=Vt;exports.CommandEmpty=Ee;exports.CommandGroup=Mt;exports.CommandInput=he;exports.CommandItem=Dt;exports.CommandList=$t;exports.CommentList=Dl;exports.ContextMenu=nd;exports.ContextMenuCheckboxItem=Zs;exports.ContextMenuContent=Js;exports.ContextMenuGroup=od;exports.ContextMenuItem=Ws;exports.ContextMenuLabel=ta;exports.ContextMenuPortal=sd;exports.ContextMenuRadioGroup=id;exports.ContextMenuRadioItem=Qs;exports.ContextMenuSeparator=ea;exports.ContextMenuShortcut=na;exports.ContextMenuSub=ad;exports.ContextMenuSubContent=Ys;exports.ContextMenuSubTrigger=qs;exports.ContextMenuTrigger=rd;exports.DataTable=is;exports.Drawer=oa;exports.DrawerClose=cd;exports.DrawerContent=aa;exports.DrawerDescription=da;exports.DrawerFooter=la;exports.DrawerHeader=ia;exports.DrawerOverlay=yr;exports.DrawerPortal=sa;exports.DrawerTitle=ca;exports.DrawerTrigger=ld;exports.DropdownMenu=ne;exports.DropdownMenuCheckboxItem=Lt;exports.DropdownMenuContent=zt;exports.DropdownMenuGroup=rr;exports.DropdownMenuItem=Fe;exports.DropdownMenuItemType=ds;exports.DropdownMenuLabel=Te;exports.DropdownMenuPortal=Wo;exports.DropdownMenuRadioGroup=Qo;exports.DropdownMenuRadioItem=ar;exports.DropdownMenuSeparator=ge;exports.DropdownMenuShortcut=ts;exports.DropdownMenuSub=Zo;exports.DropdownMenuSubContent=sr;exports.DropdownMenuSubTrigger=or;exports.DropdownMenuTrigger=fe;exports.ERROR_DUMP_STRING_KEYS=ls;exports.ERROR_POPOVER_STRING_KEYS=Bl;exports.ErrorDump=cs;exports.ErrorPopover=Fl;exports.FOOTNOTE_EDITOR_STRING_KEYS=Ql;exports.Filter=Ul;exports.FilterDropdown=zl;exports.Footer=Hl;exports.FootnoteEditor=Zl;exports.FootnoteItem=us;exports.FootnoteList=nc;exports.INVENTORY_STRING_KEYS=pc;exports.Input=xe;exports.Inventory=hc;exports.Label=rt;exports.MARKER_MENU_STRING_KEYS=fc;exports.MarkdownRenderer=$l;exports.MarkerMenu=gc;exports.MoreInfo=Gl;exports.MultiSelectComboBox=ws;exports.NavigationContentSearch=Bc;exports.Popover=te;exports.PopoverAnchor=ii;exports.PopoverContent=Bt;exports.PopoverTrigger=ee;exports.Progress=wa;exports.RadioGroup=cn;exports.RadioGroupItem=$e;exports.RecentSearches=ho;exports.ResizableHandle=pd;exports.ResizablePanel=wd;exports.ResizablePanelGroup=dd;exports.ResultsCard=Qc;exports.SCOPE_SELECTOR_STRING_KEYS=Dc;exports.ScopeSelector=Ic;exports.ScriptureResultsViewer=Rc;exports.ScrollGroupSelector=Oc;exports.SearchBar=hn;exports.Select=ue;exports.SelectContent=Zt;exports.SelectGroup=es;exports.SelectItem=ft;exports.SelectLabel=rs;exports.SelectScrollDownButton=lr;exports.SelectScrollUpButton=ir;exports.SelectSeparator=os;exports.SelectTrigger=Wt;exports.SelectValue=me;exports.Separator=pe;exports.SettingsList=Ac;exports.SettingsListHeader=Lc;exports.SettingsListItem=Pc;exports.SettingsSidebar=Rs;exports.SettingsSidebarContentSearch=yc;exports.Sidebar=wr;exports.SidebarContent=ur;exports.SidebarFooter=vs;exports.SidebarGroup=nn;exports.SidebarGroupAction=Ns;exports.SidebarGroupContent=on;exports.SidebarGroupLabel=rn;exports.SidebarHeader=bs;exports.SidebarInput=xs;exports.SidebarInset=pr;exports.SidebarMenu=mr;exports.SidebarMenuAction=js;exports.SidebarMenuBadge=ks;exports.SidebarMenuButton=fr;exports.SidebarMenuItem=hr;exports.SidebarMenuSkeleton=_s;exports.SidebarMenuSub=Cs;exports.SidebarMenuSubButton=Es;exports.SidebarMenuSubItem=Ss;exports.SidebarProvider=dr;exports.SidebarRail=gs;exports.SidebarSeparator=ys;exports.SidebarTrigger=fs;exports.Skeleton=en;exports.Slider=pa;exports.Sonner=ud;exports.Spinner=Ks;exports.Switch=ua;exports.TabDropdownMenu=an;exports.TabFloatingMenu=$c;exports.TabToolbar=Vc;exports.Table=Ke;exports.TableBody=Ue;exports.TableCaption=as;exports.TableCell=qt;exports.TableFooter=ss;exports.TableHead=_e;exports.TableHeader=He;exports.TableRow=Et;exports.Tabs=md;exports.TabsContent=fa;exports.TabsList=ma;exports.TabsTrigger=ha;exports.TextField=td;exports.Textarea=ga;exports.ToggleGroup=pn;exports.ToggleGroupItem=Ne;exports.Toolbar=qc;exports.Tooltip=Pt;exports.TooltipContent=Tt;exports.TooltipProvider=Rt;exports.TooltipTrigger=Ut;exports.UiLanguageSelector=Jc;exports.VerticalTabs=xr;exports.VerticalTabsContent=vr;exports.VerticalTabsList=br;exports.VerticalTabsTrigger=As;exports.badgeVariants=Ho;exports.buttonVariants=mo;exports.cn=h;exports.getBookIdFromUSFM=wc;exports.getLinesFromUSFM=cc;exports.getNumberFromUSFM=dc;exports.getStatusForItem=ms;exports.getToolbarOSReservedSpaceClassName=Xc;exports.inventoryCountColumn=ic;exports.inventoryItemColumn=sc;exports.inventoryStatusColumn=lc;exports.selectTriggerVariants=ns;exports.useEvent=hd;exports.useEventAsync=gd;exports.useListbox=xo;exports.usePromise=xa;exports.useRecentSearches=li;exports.useSidebar=Xe;function xd(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),o=n.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?n.insertBefore(s,o):n.appendChild(s)}xd(`*, ::before, ::after {
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
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
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
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
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
.tw-z-\\[300\\] {
  z-index: 300;
}
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
}
.tw-m-0 {
  margin: 0px;
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
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
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
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
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
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
.tw-h-1 {
  height: 0.25rem;
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
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
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
.tw-max-h-10 {
  max-height: 2.5rem;
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
.tw-min-h-11 {
  min-height: 2.75rem;
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
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
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
.tw-cursor-ew-resize {
  cursor: ew-resize;
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
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-flow-col {
  grid-auto-flow: column;
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
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
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
.tw-content-center {
  align-content: center;
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
.tw-items-baseline {
  align-items: baseline;
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
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
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
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
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
.tw-text-clip {
  text-overflow: clip;
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
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
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
.tw-border-l-2 {
  border-left-width: 2px;
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
.tw-border-none {
  border-style: none;
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
.tw-border-border {
  border-color: hsl(var(--border));
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
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
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
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
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
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
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
.tw-bg-input {
  background-color: hsl(var(--input));
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
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
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
.tw-p-0\\.5 {
  padding: 0.125rem;
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
.tw-p-\\[10px\\] {
  padding: 10px;
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
.tw-pb-0 {
  padding-bottom: 0px;
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
.tw-pl-2 {
  padding-left: 0.5rem;
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
.tw-pl-6 {
  padding-left: 1.5rem;
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
.tw-pt-1 {
  padding-top: 0.25rem;
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
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
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
.tw-font-extrabold {
  font-weight: 800;
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
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
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
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
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
.tw-line-through {
  text-decoration-line: line-through;
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
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
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
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
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
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
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
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
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
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
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
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
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
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
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
.disabled\\:tw-pointer-events-auto:disabled {
  pointer-events: auto;
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
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
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
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
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

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
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
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
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
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
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
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
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
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
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
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
`,"after-all");
//# sourceMappingURL=index.cjs.map
