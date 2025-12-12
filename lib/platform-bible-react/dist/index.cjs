"use strict";var va=Object.defineProperty;var ya=(e,t,n)=>t in e?va(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var it=(e,t,n)=>ya(e,typeof t!="symbol"?t+"":t,n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("react/jsx-runtime"),l=require("react"),pt=require("cmdk"),k=require("lucide-react"),Na=require("clsx"),ja=require("tailwind-merge"),ka=require("@radix-ui/react-dialog"),y=require("platform-bible-utils"),ke=require("@radix-ui/react-slot"),Jt=require("class-variance-authority"),_a=require("@radix-ui/react-popover"),Ca=require("@radix-ui/react-label"),Sa=require("@radix-ui/react-radio-group"),b=require("lexical"),Xr=require("@radix-ui/react-tooltip"),Dn=require("@lexical/rich-text"),jr=require("react-dom"),Ea=require("@lexical/table"),Ta=require("@radix-ui/react-toggle-group"),Ra=require("@radix-ui/react-toggle"),Ur=require("@lexical/headless"),Ma=require("@radix-ui/react-separator"),Da=require("@radix-ui/react-avatar"),qr=require("@radix-ui/react-dropdown-menu"),ct=require("@tanstack/react-table"),Ia=require("@radix-ui/react-select"),Oa=require("markdown-to-jsx"),yt=require("@eten-tech-foundation/platform-editor"),Aa=require("@radix-ui/react-checkbox"),La=require("@radix-ui/react-tabs"),Va=require("@radix-ui/react-menubar"),Pa=require("react-hotkeys-hook"),$a=require("@radix-ui/react-context-menu"),jt=require("vaul"),Ba=require("@radix-ui/react-progress"),za=require("react-resizable-panels"),Yr=require("sonner"),Fa=require("@radix-ui/react-slider"),Ga=require("@radix-ui/react-switch");function nt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const Nt=nt(ka),ye=nt(_a),Jr=nt(Ca),Le=nt(Sa),ze=nt(Xr),ln=nt(Ta),Wr=nt(Ra),Zr=nt(Ma),_e=nt(Da),J=nt(qr),tt=nt(Ia),In=nt(Aa),ut=nt(La),W=nt(Va),Z=nt($a),On=nt(Ba),Fn=nt(za),Ie=nt(Fa),An=nt(Ga),Ka=ja.extendTailwindMerge({prefix:"tw-"});function m(...e){return Ka(Na.clsx(e))}const Ha="layoutDirection";function rt(){const e=localStorage.getItem(Ha);return e==="rtl"?e:"ltr"}const Xa=Nt.Root,Ua=Nt.Portal,Qr=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Overlay,{ref:n,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Qr.displayName=Nt.Overlay.displayName;const to=l.forwardRef(({className:e,children:t,...n},o)=>{const s=rt();return r.jsxs(Ua,{children:[r.jsx(Qr,{}),r.jsxs(Nt.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:s,children:[t,r.jsxs(Nt.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[r.jsx(k.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});to.displayName=Nt.Content.displayName;function eo({className:e,...t}){return r.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}eo.displayName="DialogHeader";const no=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Title,{ref:n,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));no.displayName=Nt.Title.displayName;const qa=l.forwardRef(({className:e,...t},n)=>r.jsx(Nt.Description,{ref:n,className:m("tw-text-sm tw-text-muted-foreground",e),...t}));qa.displayName=Nt.Description.displayName;const Wt=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command,{ref:n,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Wt.displayName=pt.Command.displayName;const Ce=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[r.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),r.jsx(pt.Command.Input,{ref:n,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});Ce.displayName=pt.Command.Input.displayName;const Zt=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.List,{ref:n,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Zt.displayName=pt.Command.List.displayName;const Fe=l.forwardRef((e,t)=>r.jsx(pt.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Fe.displayName=pt.Command.Empty.displayName;const At=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Group,{ref:n,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));At.displayName=pt.Command.Group.displayName;const ro=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Separator,{ref:n,className:m("tw--mx-1 tw-h-px tw-bg-border",e),...t}));ro.displayName=pt.Command.Separator.displayName;const Lt=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Item,{ref:n,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Lt.displayName=pt.Command.Item.displayName;var Ya=Object.defineProperty,Ja=(e,t,n)=>t in e?Ya(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,F=(e,t,n)=>Ja(e,typeof t!="symbol"?t+"":t,n);const le=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Gn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],oo=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],kr=ai();function Se(e,t=!0){return t&&(e=e.toUpperCase()),e in kr?kr[e]:0}function Kn(e){return Se(e)>0}function Wa(e){const t=typeof e=="string"?Se(e):e;return t>=40&&t<=66}function Za(e){return(typeof e=="string"?Se(e):e)<=39}function so(e){return e<=66}function Qa(e){const t=typeof e=="string"?Se(e):e;return lo(t)&&!so(t)}function*ti(){for(let e=1;e<=le.length;e++)yield e}const ei=1,ao=le.length;function ni(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Hn(e,t="***"){const n=e-1;return n<0||n>=le.length?t:le[n]}function io(e){return e<=0||e>ao?"******":oo[e-1]}function ri(e){return io(Se(e))}function lo(e){const t=typeof e=="number"?Hn(e):e;return Kn(t)&&!Gn.includes(t)}function oi(e){const t=typeof e=="number"?Hn(e):e;return Kn(t)&&Gn.includes(t)}function si(e){return oo[e-1].includes("*obsolete*")}function ai(){const e={};for(let t=0;t<le.length;t++)e[le[t]]=t+1;return e}const H={allBookIds:le,nonCanonicalIds:Gn,bookIdToNumber:Se,isBookIdValid:Kn,isBookNT:Wa,isBookOT:Za,isBookOTNT:so,isBookDC:Qa,allBookNumbers:ti,firstBook:ei,lastBook:ao,extraBooks:ni,bookNumberToId:Hn,bookNumberToEnglishName:io,bookIdToEnglishName:ri,isCanonical:lo,isExtraMaterial:oi,isObsolete:si};var Ct=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ct||{});const ft=class{constructor(t){if(F(this,"name"),F(this,"fullPath"),F(this,"isPresent"),F(this,"hasVerseSegments"),F(this,"isCustomized"),F(this,"baseVersification"),F(this,"scriptureBooks"),F(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ct[t]):(this._type=t,this.name=Ct[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};F(ft,"Original",new ft(Ct.Original)),F(ft,"Septuagint",new ft(Ct.Septuagint)),F(ft,"Vulgate",new ft(Ct.Vulgate)),F(ft,"English",new ft(Ct.English)),F(ft,"RussianProtestant",new ft(Ct.RussianProtestant)),F(ft,"RussianOrthodox",new ft(Ct.RussianOrthodox));let oe=ft;function _r(e,t){const n=t[0];for(let o=1;o<t.length;o++)e=e.split(t[o]).join(n);return e.split(n)}var co=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(co||{});const dt=class G{constructor(t,n,o,s){if(F(this,"firstChapter"),F(this,"lastChapter"),F(this,"lastVerse"),F(this,"hasSegmentsDefined"),F(this,"text"),F(this,"BBBCCCVVVS"),F(this,"longHashCode"),F(this,"versification"),F(this,"rtlMark","‏"),F(this,"_bookNum",0),F(this,"_chapterNum",0),F(this,"_verseNum",0),F(this,"_verse"),o==null&&s==null)if(t!=null&&typeof t=="string"){const a=t,i=n!=null&&n instanceof oe?n:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof oe?n:void 0;this.setEmpty(a),this._verseNum=t%G.chapterDigitShifter,this._chapterNum=Math.floor(t%G.bookDigitShifter/G.chapterDigitShifter),this._bookNum=Math.floor(t/G.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof G){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof oe?t:G.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&o!=null)if(typeof t=="string"&&typeof n=="string"&&typeof o=="string")this.setEmpty(s),this.updateInternal(t,n,o);else if(typeof t=="number"&&typeof n=="number"&&typeof o=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=o,this.versification=s??G.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new G(t),{success:!0,verseRef:n}}catch(o){if(o instanceof Re)return n=new G,{success:!1,verseRef:n};throw o}}static getBBBCCCVVV(t,n,o){return t%G.bcvMaxValue*G.bookDigitShifter+(n>=0?n%G.bcvMaxValue*G.chapterDigitShifter:0)+(o>=0?o%G.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:o,verseNum:s,verse:a,versificationStr:i}=t,c=a||s.toString();let d;return i&&(d=new oe(i)),n?new G(n,o.toString(),c,d):new G}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let o;for(let s=0;s<t.length;s++){if(o=t[s],o<"0"||o>"9")return s===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +o-0,n>G.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(G.verseRangeSeparator)||this._verse.includes(G.verseSequenceIndicator))}get book(){return H.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=H.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:o}=G.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=G.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>H.lastBook)throw new Re("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new oe(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(G.verseRangeSeparators,G.verseSequenceIndicators)}get BBBCCC(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new oe(Ct[i])}catch{throw new Re("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Re("Invalid reference : "+t);const o=n[1].split(":"),s=+o[0];if(o.length!==2||H.bookIdToNumber(n[0])===0||!Number.isInteger(s)||s<0||!G.isVerseParseable(o[1]))throw new Re("Invalid reference : "+t);this.updateInternal(n[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new G(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof G?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=G.verseRangeSeparators,o=G.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const s=[],a=_r(this._verse,o);for(const i of a.map(c=>_r(c,n))){const c=this.clone();c.verse=i[0];const d=c.verseNum;if(s.push(c),i.length>1){const w=this.clone();if(w.verse=i[1],!t)for(let p=d+1;p<w.verseNum;p++){const f=new G(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||s.push(f)}s.push(w)}}return s}validateVerse(t,n){if(!this.verse)return this.internalValid;let o=0;for(const s of this.allVerses(!0,t,n)){const a=s.internalValid;if(a!==0)return a;const i=s.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>H.lastBook?2:(H.isCanonical(this._bookNum),0)}setEmpty(t=G.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,o){this.bookNum=H.bookIdToNumber(t),this.chapter=n,this.verse=o}};F(dt,"defaultVersification",oe.English),F(dt,"verseRangeSeparator","-"),F(dt,"verseSequenceIndicator",","),F(dt,"verseRangeSeparators",[dt.verseRangeSeparator]),F(dt,"verseSequenceIndicators",[dt.verseSequenceIndicator]),F(dt,"chapterDigitShifter",1e3),F(dt,"bookDigitShifter",dt.chapterDigitShifter*dt.chapterDigitShifter),F(dt,"bcvMaxValue",dt.chapterDigitShifter-1),F(dt,"ValidStatusType",co);let Re=class extends Error{};const wo=(e,t,n,o,s)=>{switch(e){case y.Section.OT:return t??"Old Testament";case y.Section.NT:return n??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},ii=(e,t,n,o,s)=>{switch(e){case y.Section.OT:return t??"OT";case y.Section.NT:return n??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function be(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??H.bookIdToEnglishName(e)}function Xn(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const po=H.allBookIds.filter(e=>!H.isObsolete(H.bookIdToNumber(e))),ie=Object.fromEntries(po.map(e=>[e,H.bookIdToEnglishName(e)]));function Un(e,t,n){const o=t.trim().toLowerCase();if(!o)return!1;const s=H.bookIdToEnglishName(e),a=n==null?void 0:n.get(e);return!!(y.includes(s.toLowerCase(),o)||y.includes(e.toLowerCase(),o)||(a?y.includes(a.localizedName.toLowerCase(),o)||y.includes(a.localizedId.toLowerCase(),o):!1))}const uo=l.forwardRef(({bookId:e,isSelected:t,onSelect:n,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:d},w)=>{const p=l.useRef(!1),f=()=>{p.current||n==null||n(e),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):n==null||n(e)},u=l.useMemo(()=>be(e,c),[e,c]),g=l.useMemo(()=>Xn(e,c),[e,c]);return r.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:r.jsxs(Lt,{ref:w,value:d||`${e} ${H.bookIdToEnglishName(e)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":t,"aria-label":`${H.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:a,children:[i&&r.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),r.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),r.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),mo=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),P=l.forwardRef(({className:e,variant:t,size:n,asChild:o=!1,...s},a)=>{const i=o?ke.Slot:"button";return r.jsx(i,{className:m(mo({variant:t,size:n,className:e})),ref:a,...s})});P.displayName="Button";const Qt=ye.Root,te=ye.Trigger,li=ye.Anchor,Vt=l.forwardRef(({className:e,align:t="center",sideOffset:n=4,...o},s)=>{const a=rt();return r.jsx(ye.Portal,{children:r.jsx(ye.Content,{ref:s,align:t,sideOffset:n,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:a})})});Vt.displayName=ye.Content.displayName;function Ln(e,t,n){return`${e} ${ie[e]}${t?` ${Xn(e,t)} ${be(e,t)}`:""}${n?` ${n}`:""}`}function ho({recentSearches:e,onSearchItemSelect:t,renderItem:n=c=>String(c),getItemKey:o=c=>String(c),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i}){const[c,d]=l.useState(!1);if(e.length===0)return;const w=p=>{t(p),d(!1)};return r.jsxs(Qt,{open:c,onOpenChange:d,children:[r.jsx(te,{asChild:!0,children:r.jsx(P,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:r.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),r.jsx(Vt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:r.jsx(Wt,{children:r.jsx(Zt,{children:r.jsx(At,{heading:a,children:e.map(p=>r.jsxs(Lt,{onSelect:()=>w(p),className:"tw-flex tw-items-center",children:[r.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),r.jsx("span",{children:n(p)})]},o(p)))})})})})]})}function ci(e,t,n=(s,a)=>s===a,o=15){return s=>{const a=e.filter(c=>!n(c,s)),i=[s,...a.slice(0,o-1)];t(i)}}const yn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},wi=[yn.BOOK_ONLY,yn.BOOK_CHAPTER,yn.BOOK_CHAPTER_VERSE];function Cr(e){const t=/^[a-zA-Z]$/.test(e),n=/^[0-9]$/.test(e);return{isLetter:t,isDigit:n}}function St(e){return y.getChaptersForBook(H.bookIdToNumber(e))}function di(e,t,n){if(!e.trim()||t.length===0)return;const o=wi.reduce((s,a)=>{if(s)return s;const i=a.exec(e.trim());if(i){const[c,d=void 0,w=void 0]=i.slice(1);let p;const f=t.filter(h=>Un(h,c,n));if(f.length===1&&([p]=f),!p&&d){if(H.isBookIdValid(c)){const h=c.toUpperCase();t.includes(h)&&(p=h)}if(!p&&n){const h=Array.from(n.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&t.includes(h[0])&&([p]=h)}}if(!p&&d){const u=(g=>Object.keys(ie).find(v=>ie[v].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&n){const g=Array.from(n.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>St(p)&&(h=Math.max(St(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function pi(e,t,n,o){const s=l.useCallback(()=>{if(e.chapterNum>1)o({book:e.book,chapterNum:e.chapterNum-1,verseNum:1});else{const d=t.indexOf(e.book);if(d>0){const w=t[d-1],p=Math.max(St(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[e,t,o]),a=l.useCallback(()=>{const d=St(e.book);if(e.chapterNum<d)o({book:e.book,chapterNum:e.chapterNum+1,verseNum:1});else{const w=t.indexOf(e.book);if(w<t.length-1){const p=t[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[e,t,o]),i=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum>1?e.verseNum-1:0})},[e,o]),c=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum+1})},[e,o]);return l.useMemo(()=>[{onClick:s,disabled:t.length===0||e.chapterNum===1&&t.indexOf(e.book)===0,title:"Previous chapter",icon:n==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:i,disabled:t.length===0||e.verseNum===0,title:"Previous verse",icon:n==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:t.length===0,title:"Next verse",icon:n==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:t.length===0||(e.chapterNum===St(e.book)||St(e.book)===-1)&&t.indexOf(e.book)===t.length-1,title:"Next chapter",icon:n==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[e,t,n,s,i,c,a])}function Sr({bookId:e,scrRef:t,onChapterSelect:n,setChapterRef:o,isChapterDimmed:s,className:a}){if(e)return r.jsx(At,{children:r.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:St(e)},(i,c)=>c+1).map(i=>r.jsx(Lt,{value:`${e} ${ie[e]||""} ${i}`,onSelect:()=>n(i),ref:o(i),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":e===t.book&&i===t.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function ui({scrRef:e,handleSubmit:t,className:n,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:d}){const w=rt(),[p,f]=l.useState(!1),[h,u]=l.useState(""),[g,v]=l.useState(""),[_,S]=l.useState("books"),[C,N]=l.useState(void 0),[E,O]=l.useState(!1),M=l.useRef(void 0),T=l.useRef(void 0),D=l.useRef(void 0),j=l.useRef(void 0),R=l.useRef({}),L=l.useCallback(x=>{t(x),c&&c(x)},[t,c]),$=l.useMemo(()=>o?o():po,[o]),z=l.useMemo(()=>({[y.Section.OT]:$.filter(B=>H.isBookOT(B)),[y.Section.NT]:$.filter(B=>H.isBookNT(B)),[y.Section.DC]:$.filter(B=>H.isBookDC(B)),[y.Section.Extra]:$.filter(B=>H.extraBooks().includes(B))}),[$]),A=l.useMemo(()=>Object.values(z).flat(),[z]),U=l.useMemo(()=>{if(!g.trim())return z;const x={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach(q=>{x[q]=z[q].filter(st=>Un(st,g,s))}),x},[z,g,s]),I=l.useMemo(()=>di(g,A,s),[g,A,s]),Q=l.useCallback(()=>{I&&(L({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1}),f(!1),v(""),u(""))},[L,I]),xt=l.useCallback(x=>{if(St(x)<=1){L({book:x,chapterNum:1,verseNum:1}),f(!1),v("");return}N(x),S("chapters")},[L]),vt=l.useCallback(x=>{const B=_==="chapters"?C:I==null?void 0:I.book;B&&(L({book:B,chapterNum:x,verseNum:1}),f(!1),S("books"),N(void 0),v(""))},[L,_,C,I]),mt=l.useCallback(x=>{L(x),f(!1),v("")},[L]),V=pi(e,A,w,t),Y=l.useCallback(()=>{S("books"),N(void 0),setTimeout(()=>{T.current&&T.current.focus()},0)},[]),at=l.useCallback(x=>{if(!x&&_==="chapters"){Y();return}f(x),x&&(S("books"),N(void 0),v(""))},[_,Y]),{otLong:ot,ntLong:bt,dcLong:Bt,extraLong:ht}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},gn=l.useCallback(x=>wo(x,ot,bt,Bt,ht),[ot,bt,Bt,ht]),xn=l.useCallback(x=>I?!!I.chapterNum&&!x.toString().includes(I.chapterNum.toString()):!1,[I]),fe=l.useMemo(()=>y.formatScrRef(e,s?be(e.book,s):"English"),[e,s]),Ue=l.useCallback(x=>B=>{R.current[x]=B},[]),bn=l.useCallback(x=>{(x.key==="Home"||x.key==="End")&&x.stopPropagation()},[]),qe=l.useCallback(x=>{if(x.ctrlKey)return;const{isLetter:B,isDigit:q}=Cr(x.key);if(_==="chapters"){if(x.key==="Backspace"){x.preventDefault(),x.stopPropagation(),Y();return}if(B||q){if(x.preventDefault(),x.stopPropagation(),S("books"),N(void 0),q&&C){const st=ie[C];v(`${st} ${x.key}`)}else v(x.key);setTimeout(()=>{T.current&&T.current.focus()},0);return}}if((_==="chapters"||_==="books"&&I)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(x.key)){const st=_==="chapters"?C:I==null?void 0:I.book;if(!st)return;const wt=(()=>{if(!h)return 1;const Te=h.match(/(\d+)$/);return Te?parseInt(Te[1],10):0})(),ne=St(st);if(!ne)return;let Dt=wt;const Nr=6;switch(x.key){case"ArrowLeft":wt!==0&&(Dt=wt>1?wt-1:ne);break;case"ArrowRight":wt!==0&&(Dt=wt<ne?wt+1:1);break;case"ArrowUp":Dt=wt===0?ne:Math.max(1,wt-Nr);break;case"ArrowDown":Dt=wt===0?1:Math.min(ne,wt+Nr);break;default:return}Dt!==wt&&(x.preventDefault(),x.stopPropagation(),u(Ln(st,s,Dt)),setTimeout(()=>{const Te=R.current[Dt];Te&&Te.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[_,I,Y,C,h,s]),vn=l.useCallback(x=>{if(x.shiftKey||x.key==="Tab"||x.key===" ")return;const{isLetter:B,isDigit:q}=Cr(x.key);(B||q)&&(x.preventDefault(),v(st=>st+x.key),T.current.focus(),O(!1))},[]);return l.useLayoutEffect(()=>{const x=setTimeout(()=>{if(p&&_==="books"&&D.current&&j.current){const B=D.current,q=j.current,st=q.offsetTop,wt=B.clientHeight,ne=q.clientHeight,Dt=st-wt/2+ne/2;B.scrollTo({top:Math.max(0,Dt),behavior:"smooth"}),u(Ln(e.book))}},0);return()=>{clearTimeout(x)}},[p,_,g,I,e.book]),l.useLayoutEffect(()=>{if(_==="chapters"&&C){const x=C===e.book;setTimeout(()=>{if(D.current)if(x){const B=R.current[e.chapterNum];B&&B.scrollIntoView({block:"center",behavior:"smooth"})}else D.current.scrollTo({top:0});M.current&&M.current.focus()},0)}},[_,C,I,e.book,e.chapterNum]),r.jsxs(Qt,{open:p,onOpenChange:at,children:[r.jsx(te,{asChild:!0,children:r.jsx(P,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:r.jsx("span",{className:"tw-truncate",children:fe})})}),r.jsx(Vt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:r.jsxs(Wt,{ref:M,onKeyDown:qe,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[_==="books"?r.jsxs("div",{className:"tw-flex tw-items-end",children:[r.jsxs("div",{className:"tw-relative tw-flex-1",children:[r.jsx(Ce,{ref:T,value:g,onValueChange:v,onKeyDown:bn,onFocus:()=>O(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&r.jsx(ho,{recentSearches:i,onSearchItemSelect:mt,renderItem:x=>y.formatScrRef(x,"English"),getItemKey:x=>`${x.book}-${x.chapterNum}-${x.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:V.map(({onClick:x,disabled:B,title:q,icon:st})=>r.jsx(P,{variant:"ghost",size:"sm",onClick:()=>{O(!0),x()},disabled:B,className:"tw-h-10 tw-w-4 tw-p-0",title:q,onKeyDown:vn,children:r.jsx(st,{})},q))})]}):r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[r.jsx(P,{variant:"ghost",size:"sm",onClick:Y,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?r.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):r.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),C&&r.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:be(C,s)})]}),!E&&r.jsxs(Zt,{ref:D,children:[_==="books"&&r.jsxs(r.Fragment,{children:[!I&&Object.entries(U).map(([x,B])=>{if(B.length!==0)return r.jsx(At,{heading:gn(x),children:B.map(q=>r.jsx(uo,{bookId:q,onSelect:st=>xt(st),section:y.getSectionForBook(q),commandValue:`${q} ${ie[q]}`,ref:q===e.book?j:void 0,localizedBookNames:s},q))},x)}),I&&r.jsx(At,{children:r.jsx(Lt,{value:`${I.book} ${ie[I.book]} ${I.chapterNum||""}:${I.verseNum||""})}`,onSelect:Q,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1},s?Xn(I.book,s):void 0)},"top-match")}),I&&St(I.book)>1&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:be(I.book,s)}),r.jsx(Sr,{bookId:I.book,scrRef:e,onChapterSelect:vt,setChapterRef:Ue,isChapterDimmed:xn,className:"tw-px-4 tw-pb-4"})]})]}),_==="chapters"&&C&&r.jsx(Sr,{bookId:C,scrRef:e,onChapterSelect:vt,setChapterRef:Ue,className:"tw-p-4"})]})]})})]})}const mi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),hi=Jt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),et=l.forwardRef(({className:e,...t},n)=>r.jsx(Jr.Root,{ref:n,className:m("pr-twp",hi(),e),...t}));et.displayName=Jr.Root.displayName;const cn=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsx(Le.Root,{className:m("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:o})});cn.displayName=Le.Root.displayName;const Ve=l.forwardRef(({className:e,...t},n)=>r.jsx(Le.Item,{ref:n,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:r.jsx(Le.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:r.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ve.displayName=Le.Item.displayName;function fi(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function tn({id:e,options:t=[],className:n,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=fi,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:_,...S}){const[C,N]=l.useState(!1),E=d??c,O=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],M=(T,D)=>{const j=c(T),R=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,L=`${D??""}${j}${R??""}`;return r.jsxs(Lt,{value:j,onSelect:()=>{i(T),N(!1)},className:"tw-flex tw-items-center",children:[r.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==j})}),r.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[j,R&&r.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",R]})]})]},L)};return r.jsxs(Qt,{open:C,onOpenChange:N,...S,children:[r.jsx(te,{asChild:!0,children:r.jsxs(P,{variant:u,role:"combobox","aria-expanded":C,"aria-label":_,id:e,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??n),disabled:v,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&r.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),r.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?E(a):p})]}),r.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Vt,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:r.jsxs(Wt,{children:[r.jsx(Ce,{placeholder:f,className:"tw-text-inherit"}),r.jsx(Fe,{children:h}),r.jsx(Zt,{children:O(t)?t.map(T=>r.jsx(At,{heading:T.groupHeading,children:T.options.map(D=>M(D,T.groupHeading))},T.groupHeading)):t.map(T=>M(T))})]})})]})}function fo({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{n(w),w>t&&o(w)},d=w=>{o(w),w<e&&n(w)};return r.jsxs(r.Fragment,{children:[r.jsx(et,{htmlFor:"start-chapters-combobox",children:"Chapters"}),r.jsx(tn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:e},"start chapter"),r.jsx(et,{htmlFor:"end-chapters-combobox",children:"to"}),r.jsx(tn,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:t},"end chapter")]})}var go=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(go||{});const gi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Nn=(e,t)=>e[t]??t;function xi({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=Nn(w,"%webView_bookSelector_currentBook%"),f=Nn(w,"%webView_bookSelector_choose%"),h=Nn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),v=_=>{g(_),e(_)};return r.jsx(cn,{className:"pr-twp tw-flex",value:u,onValueChange:_=>v(_),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ve,{value:"current book"}),r.jsx(et,{className:"tw-ms-1",children:p})]}),r.jsx(et,{className:"tw-flex tw-items-center",children:t}),r.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:r.jsx(fo,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ve,{value:"choose books"}),r.jsx(et,{className:"tw-ms-1",children:h})]}),r.jsx(et,{className:"tw-flex tw-items-center",children:o.map(_=>H.bookIdToEnglishName(_)).join(", ")}),r.jsx(P,{disabled:u==="current book",onClick:()=>n(),children:f})]})]})})}const bi=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],vi=["input","select","textarea","button"],yi=["button","textbox"],xo=({options:e,onFocusChange:t,onOptionSelect:n,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,d]=l.useState(void 0),w=l.useCallback(u=>{i(u);const g=e.find(_=>_.id===u);g&&(t==null||t(g));const v=document.getElementById(u);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=l.useCallback(u=>{const g=e.find(v=>v.id===u);g&&(d(v=>v===u?void 0:u),n==null||n(g))},[n,e]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||vi.includes(g))return!0;const v=u.getAttribute("role");if(v&&yi.includes(v))return!0;const _=u.getAttribute("tabindex");return _!==void 0&&_!=="-1"},h=l.useCallback(u=>{var T;const g=u.target,v=D=>D?document.getElementById(D):void 0,_=v(c),S=v(a);if(!!(_&&g&&_.contains(g)&&g!==_)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const D=e.find(j=>j.id===c);D&&w(D.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!_)return;const D=Array.from(_.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(D.length===0)return;const j=D.findIndex(L=>L===g);if(j===-1)return;let R;u.key==="ArrowDown"?R=Math.min(j+1,D.length-1):R=Math.max(j-1,0),R!==j&&(u.preventDefault(),u.stopPropagation(),(T=D[R])==null||T.focus());return}return}const E=e.findIndex(D=>D.id===a);let O=E;switch(u.key){case"ArrowDown":O=Math.min(E+1,e.length-1),u.preventDefault();break;case"ArrowUp":O=Math.max(E-1,0),u.preventDefault();break;case"Home":O=0,u.preventDefault();break;case"End":O=e.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const D=S;if(D){const j=D.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=D.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),L=j??R;if(L){u.preventDefault(),L.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const M=e[O];M&&w(M.id)},[e,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:w}},bo=l.createContext(null);function Ni(e,t){return{getTheme:function(){return t??null}}}function Mt(){const e=l.useContext(bo);return e==null&&function(t,...n){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const a of n)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ji=vo?l.useLayoutEffect:l.useEffect,Ye={tag:b.HISTORY_MERGE_TAG};function ki({initialConfig:e,children:t}){const n=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:d}=e,w=Ni(null,o),p=b.createEditor({editable:e.editable,html:d,namespace:s,nodes:a,onError:f=>i(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const v=vo?document.activeElement:null;(b.$getSelection()!==null||v!==null&&v===f.getRootElement())&&g.select()}},Ye);else if(h!==null)switch(typeof h){case"string":{const u=f.parseEditorState(h);f.setEditorState(u,Ye);break}case"object":f.setEditorState(h,Ye);break;case"function":f.update(()=>{b.$getRoot().isEmpty()&&h(f)},Ye)}}}(p,c),[p,w]},[]);return ji(()=>{const o=e.editable,[s]=n;s.setEditable(o===void 0||o)},[]),r.jsx(bo.Provider,{value:n,children:t})}const _i=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ci({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:n}){const[o]=Mt();return _i(()=>{if(n)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:d})=>{t&&a.size===0&&i.size===0||e&&d.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||n(s,o,d)})},[o,e,t,n]),null}const qn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Tt=ze.Provider,It=ze.Root,Gt=ze.Trigger,Rt=l.forwardRef(({className:e,sideOffset:t=4,...n},o)=>r.jsx(ze.Content,{ref:o,sideOffset:t,className:m("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Rt.displayName=ze.Content.displayName;const Yn=[Dn.HeadingNode,b.ParagraphNode,b.TextNode,Dn.QuoteNode],Si=l.createContext(null),jn={didCatch:!1,error:null};class Ei extends l.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=jn}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var n,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(n=(o=this.props).onReset)===null||n===void 0||n.call(o,{args:a,reason:"imperative-api"}),this.setState(jn)}}componentDidCatch(t,n){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,n)}componentDidUpdate(t,n){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&n.error!==null&&Ti(t.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(jn)}}render(){const{children:t,fallbackRender:n,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=t;if(a){const d={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")c=n(d);else if(o)c=l.createElement(o,d);else if(s!==void 0)c=s;else throw i}return l.createElement(Si.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ti(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((n,o)=>!Object.is(n,t[o]))}function Ri({children:e,onError:t}){return r.jsx(Ei,{fallback:r.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const Mi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Di(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function Ii(){return function(e){const[t]=Mt(),n=l.useMemo(()=>e(t),[t,e]),[o,s]=l.useState(()=>n.initialValueFn()),a=l.useRef(o);return Mi(()=>{const{initialValueFn:i,subscribe:c}=n,d=i();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[n,e]),o}(Di)}function Oi(e,t,n="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!b.$isTokenOrSegmented(t)&&o!==null){const[s,a]=o,i=e.isBackward(),c=s.getNode(),d=a.getNode(),w=t.is(c),p=t.is(d);if(w||p){const[f,h]=b.$getCharacterOffsets(e),u=c.is(d),g=t.is(i?d:c),v=t.is(i?c:d);let _,S=0;u?(S=f>h?h:f,_=f>h?f:h):g?(S=i?h:f,_=void 0):v&&(S=0,_=i?f:h);const C=t.__text.slice(S,_);C!==t.__text&&(n==="clone"&&(t=b.$cloneWithPropertiesEphemeral(t)),t.__text=C)}}return t}function Ai(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const yo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Li=yo&&"documentMode"in document?document.documentMode:null;!(!yo||!("InputEvent"in window)||Li)&&"getTargetRanges"in new window.InputEvent("input");function No(...e){const t=[];for(const n of e)if(n&&typeof n=="string")for(const[o]of n.matchAll(/\S+/g))t.push(o);return t}function Xt(...e){return()=>{for(let t=e.length-1;t>=0;t--)e[t]();e.length=0}}function jo(e,...t){const n=No(...t);n.length>0&&e.classList.add(...n)}function Vi(e,...t){const n=No(...t);n.length>0&&e.classList.remove(...n)}function Er(e){const t=b.$findMatchingParent(e,n=>b.$isElementNode(n)&&!n.isInline());return b.$isElementNode(t)||Ai(4,e.__key),t}function Pi(e,t){const n=[];for(let o=0;o<e.length;o++){const s=t(e[o]);s!==null&&n.push(s)}return n}const $i=Symbol.for("preact-signals");function wn(){if(Kt>1)return void Kt--;let e,t=!1;for(;Oe!==void 0;){let n=Oe;for(Oe=void 0,Vn++;n!==void 0;){const o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&ko(n))try{n.c()}catch(s){t||(e=s,t=!0)}n=o}}if(Vn=0,Kt--,t)throw e}function Bi(e){if(Kt>0)return e();Kt++;try{return e()}finally{wn()}}let K,Oe;function Tr(e){const t=K;K=void 0;try{return e()}finally{K=t}}let Kt=0,Vn=0,Ze=0;function Rr(e){if(K===void 0)return;let t=e.n;return t===void 0||t.t!==K?(t={i:0,S:e,p:K.s,n:void 0,t:K,e:void 0,x:void 0,r:t},K.s!==void 0&&(K.s.n=t),K.s=t,e.n=t,32&K.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=K.s,t.n=void 0,K.s.n=t,K.s=t),t):void 0}function lt(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Pe(e,t){return new lt(e,t)}function ko(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Mr(e){for(let t=e.s;t!==void 0;t=t.n){const n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function _o(e){let t,n=e.s;for(;n!==void 0;){const o=n.p;n.i===-1?(n.S.U(n),o!==void 0&&(o.n=n.n),n.n!==void 0&&(n.n.p=o)):t=n,n.S.n=n.r,n.r!==void 0&&(n.r=void 0),n=o}e.s=t}function se(e,t){lt.call(this,void 0),this.x=e,this.s=void 0,this.g=Ze-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function zi(e,t){return new se(e,t)}function Co(e){const t=e.u;if(e.u=void 0,typeof t=="function"){Kt++;const n=K;K=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,Jn(e),o}finally{K=n,wn()}}}function Jn(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Co(e)}function Fi(e){if(K!==this)throw new Error("Out-of-order effect");_o(this),K=e,this.f&=-2,8&this.f&&Jn(this),wn()}function xe(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function Ut(e,t){const n=new xe(e,t);try{n.c()}catch(s){throw n.d(),s}const o=n.d.bind(n);return o[Symbol.dispose]=o,o}function dn(e,t={}){const n={};for(const o in e){const s=t[o],a=Pe(s===void 0?e[o]:s);n[o]=a}return n}lt.prototype.brand=$i,lt.prototype.h=function(){return!0},lt.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:Tr(()=>{var n;(n=this.W)==null||n.call(this)}))},lt.prototype.U=function(e){if(this.t!==void 0){const t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n,n===void 0&&Tr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},lt.prototype.subscribe=function(e){return Ut(()=>{const t=this.value,n=K;K=void 0;try{e(t)}finally{K=n}},{name:"sub"})},lt.prototype.valueOf=function(){return this.value},lt.prototype.toString=function(){return this.value+""},lt.prototype.toJSON=function(){return this.value},lt.prototype.peek=function(){const e=K;K=void 0;try{return this.value}finally{K=e}},Object.defineProperty(lt.prototype,"value",{get(){const e=Rr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(Vn>100)throw new Error("Cycle detected");this.v=e,this.i++,Ze++,Kt++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{wn()}}}}),se.prototype=new lt,se.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Ze))return!0;if(this.g=Ze,this.f|=1,this.i>0&&!ko(this))return this.f&=-2,!0;const e=K;try{Mr(this),K=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return K=e,_o(this),this.f&=-2,!0},se.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}lt.prototype.S.call(this,e)},se.prototype.U=function(e){if(this.t!==void 0&&(lt.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},se.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(se.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=Rr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),xe.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},xe.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Co(this),Mr(this),Kt++;const e=K;return K=this,Fi.bind(this,e)},xe.prototype.N=function(){2&this.f||(this.f|=2,this.o=Oe,Oe=this)},xe.prototype.d=function(){this.f|=8,1&this.f||Jn(this)},xe.prototype.dispose=function(){this.d()};b.defineExtension({build:(e,t,n)=>dn(t),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,n){const o=n.getOutput();return Ut(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function So(){const e=b.$getRoot(),t=b.$getSelection(),n=b.$createParagraphNode();e.clear(),e.append(n),t!==null&&n.select(),b.$isRangeSelection(t)&&(t.format=0)}function Eo(e,t=So){return e.registerCommand(b.CLEAR_EDITOR_COMMAND,n=>(e.update(t),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(e,t,n)=>dn(t),config:b.safeCast({$onClear:So}),name:"@lexical/extension/ClearEditor",register(e,t,n){const{$onClear:o}=n.getOutput();return Ut(()=>Eo(e,o.value))}});function Gi(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function To(e,t){let n;return Pe(e(),{unwatched(){n&&(n(),n=void 0)},watched(){this.value=e(),n=t(this)}})}const Pn=b.defineExtension({build:e=>To(()=>e.getEditorState(),t=>e.registerUpdateListener(n=>{t.value=n.editorState})),name:"@lexical/extension/EditorState"});function X(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Ro(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const n=e,o=t;for(const s in o)n[s]=Ro(n[s],o[s]);return e}return t}const Wn=0,$n=1,Mo=2,kn=3,Je=4,ge=5,_n=6,Me=7;function Cn(e){return e.id===Wn}function Do(e){return e.id===Mo}function Ki(e){return function(t){return t.id===$n}(e)||X(305,String(e.id),String($n)),Object.assign(e,{id:Mo})}const Hi=new Set;class Xi{constructor(t,n){it(this,"builder");it(this,"configs");it(this,"_dependency");it(this,"_peerNameSet");it(this,"extension");it(this,"state");it(this,"_signal");this.builder=t,this.extension=n,this.configs=new Set,this.state={id:Wn}}mergeConfigs(){let t=this.extension.config||{};const n=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)t=n(t,o);return t}init(t){const n=this.state;Do(n)||X(306,String(n.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:kn,registerState:w})}(n,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(t,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Je,initResult:d,registerState:w})}(a,i,s)}build(t){const n=this.state;let o;n.id!==Je&&X(307,String(n.id),String(ge)),this.extension.build&&(o=this.extension.build(t,n.config,n.registerState));const s={...n.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:ge,output:i,registerState:c})}(n,o,s)}register(t,n){this._signal=n;const o=this.state;o.id!==ge&&X(308,String(o.id),String(ge));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:_n})}(o),()=>{const a=this.state;a.id!==Me&&X(309,String(o.id),String(Me)),this.state=function(i){return Object.assign(i,{id:ge})}(a),s&&s()}}afterRegistration(t){const n=this.state;let o;return n.id!==_n&&X(310,String(n.id),String(_n)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,n.config,n.registerState)),this.state=function(s){return Object.assign(s,{id:Me})}(n),o}getSignal(){return this._signal===void 0&&X(311),this._signal}getInitResult(){this.extension.init===void 0&&X(312,this.extension.name);const t=this.state;return function(n){return n.id>=Je}(t)||X(313,String(t.id),String(Je)),t.initResult}getInitPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(n){return n.id>=kn}(t)||X(314,String(t.id),String(kn)),{config:t.config}}getPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionDependency():void 0}getInitDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&X(315,this.extension.name,t.name),n.getExtensionInitDependency()}getDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&X(315,this.extension.name,t.name),n.getExtensionDependency()}getState(){const t=this.state;return function(n){return n.id>=Me}(t)||X(316,String(t.id),String(Me)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Hi}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([n])=>n)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(n){return n.id>=ge})(t)||X(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const Dr={tag:b.HISTORY_MERGE_TAG};function Ui(){const e=b.$getRoot();e.isEmpty()&&e.append(b.$createParagraphNode())}const qi=b.defineExtension({config:b.safeCast({setOptions:Dr,updateOptions:Dr}),init:({$initialEditorState:e=Ui})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:n},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))e.setEditorState(a,n);else if(typeof a=="function")e.update(()=>{a(e)},t);else if(a&&(typeof a=="string"||typeof a=="object")){const i=e.parseEditorState(a);e.setEditorState(i,n)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),Ir=Symbol.for("@lexical/extension/LexicalBuilder");function Or(){}function Yi(e){throw e}function We(e){return Array.isArray(e)?e:[e]}const Sn="0.38.2+prod.esm";class Ae{constructor(t){it(this,"roots");it(this,"extensionNameMap");it(this,"outgoingConfigEdges");it(this,"incomingEdges");it(this,"conflicts");it(this,"_sortedExtensionReps");it(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Sn,this.roots=t;for(const n of t)this.addExtension(n)}static fromExtensions(t){const n=[We(qi)];for(const o of t)n.push(We(o));return new Ae(n)}static maybeFromEditor(t){const n=t[Ir];return n&&(n.PACKAGE_VERSION!==Sn&&X(292,n.PACKAGE_VERSION,Sn),n instanceof Ae||X(293)),n}static fromEditor(t){const n=Ae.maybeFromEditor(t);return n===void 0&&X(294),n}constructEditor(){const{$initialEditorState:t,onError:n,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...n?{onError:a=>{n(a,s)}}:{}}),{[Ir]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let t=Or;function n(){try{t()}finally{t=Or}}const o=Object.assign(this.constructEditor(),{dispose:n,[Symbol.dispose]:n});return t=Xt(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const n=this.extensionNameMap.get(t.name);if(n)return n.extension!==t&&X(295,t.name),n}addEdge(t,n,o){const s=this.outgoingConfigEdges.get(t);s?s.set(n,o):this.outgoingConfigEdges.set(t,new Map([[n,o]]));const a=this.incomingEdges.get(n);a?a.add(t):this.incomingEdges.set(n,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&X(296);const n=We(t),[o]=n;typeof o.name!="string"&&X(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&X(298,o.name),!s){s=new Xi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&X(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&X(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=We(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],n=(o,s)=>{let a=o.state;if(Do(a))return;const i=o.extension.name;var c;Cn(a)||X(300,i,s||"[unknown]"),Cn(c=a)||X(304,String(c.id),String(Wn)),a=Object.assign(c,{id:$n}),o.state=a;const d=this.outgoingConfigEdges.get(i);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&n(p,i)}a=Ki(a),o.state=a,t.push(o)};for(const o of this.extensionNameMap.values())Cn(o.state)&&n(o);for(const o of t)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&X(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const n=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of n){const c=i.register(t,a);c&&s.push(c)}for(const i of n){const c=i.afterRegistration(t);c&&s.push(c)}return Xt(...s)}buildCreateEditorArgs(){const t={},n=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(t.onError=f.onError),f.disableEvents!==void 0&&(t.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(t.parentEditor=f.parentEditor),f.editable!==void 0&&(t.editable=f.editable),f.namespace!==void 0&&(t.namespace=f.namespace),f.$initialEditorState!==void 0&&(t.$initialEditorState=f.$initialEditorState),f.nodes)for(const h of Gi(f)){if(typeof h!="function"){const u=o.get(h.replace);u&&X(302,f.name,h.replace.name,u.extension.name),o.set(h.replace,p)}n.add(h)}if(f.html){if(f.html.export)for(const[h,u]of f.html.export.entries())s.set(h,u);f.html.import&&Object.assign(a,f.html.import)}f.theme&&Ro(i,f.theme)}Object.keys(i).length>0&&(t.theme=i),n.size&&(t.nodes=[...n]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(t.html={},d&&(t.html.import=a),w&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=Yi),t}}const Ji=new Set,Ar=b.defineExtension({build(e,t,n){const o=n.getDependency(Pn).output,s=Pe({watchedNodeKeys:new Map}),a=To(()=>{},()=>Ut(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const h=b.$getNodeByKey(p),u=h&&h.isSelected()||!1;w=w||u!==(!!i&&i.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&i&&d.size===i.size||(a.value=d)}));return{watchNodeKey:function(i){const c=zi(()=>(a.value||Ji).has(i)),{watchedNodeKeys:d}=s.peek();let w=d.get(i);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(i,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[Pn],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Ne extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new Ne(t.__key)}static importJSON(t){return Io().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:Wi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const n=document.createElement("hr");return jo(n,t.theme.hr),n}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Wi(){return{node:Io()}}function Io(){return b.$create(Ne)}function Zi(e){return e instanceof Ne}b.defineExtension({dependencies:[Pn,Ar],name:"@lexical/extension/HorizontalRule",nodes:[Ne],register(e,t,n){const{watchNodeKey:o}=n.getDependency(Ar).output,s=Pe({nodeSelections:new Map}),a=e._config.theme.hrSelected??"selected";return Xt(e.registerCommand(b.CLICK_COMMAND,i=>{if(b.isDOMNode(i.target)){const c=b.$getNodeFromDOMNode(i.target);if(Zi(c))return function(d,w=!1){const p=b.$getSelection(),f=d.isSelected(),h=d.getKey();let u;w&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),f?u.delete(h):u.add(h)}(c,i.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),e.registerMutationListener(Ne,(i,c)=>{Bi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,f]of i.entries())if(f==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),u=e.getElementByKey(p);h?h.domNode.value=u:(d=!0,w.set(p,{domNode:Pe(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),Ut(()=>{const i=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())i.push(Ut(()=>{const w=c.value;w&&(d.value?jo(w,a):Vi(w,a))}));return Xt(...i)}))}});function Qi(e,t){return Xt(e.registerCommand(b.KEY_TAB_COMMAND,n=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;n.preventDefault();const s=function(a){const i=a.getNodes();if(Pi(i,h=>b.$isBlockElementNode(h)&&h.canIndent()?h:null).length>0)return!0;const c=a.anchor,d=a.focus,w=d.isBefore(c)?d:c,p=w.getNode(),f=Er(p);if(f.canIndent()){const h=f.getKey();let u=b.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(o)?n.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),e.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const n=typeof t=="number"?t:t?t.peek():null;if(n==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>Er(a).getIndent());return Math.max(...s)+1>=n},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(e,t,n)=>dn(t),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,n){const{disabled:o,maxIndent:s}=n.getOutput();return Ut(()=>{if(!o.value)return Qi(e,s)})}});const tl=b.defineExtension({name:"@lexical/react/ReactProvider"});function el(){return b.$getRoot().getTextContent()}function nl(e,t=!0){if(e)return!1;let n=el();return t&&(n=n.trim()),n===""}function rl(e){if(!nl(e,!1))return!1;const t=b.$getRoot().getChildren(),n=t.length;if(n>1)return!1;for(let o=0;o<n;o++){const s=t[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const d=a[o];if(!b.$isTextNode(d))return!1}}}return!0}function Oo(e){return()=>rl(e)}function Ao(e){const t=window.location.origin,n=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,f,h,u]=d;e.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const v=g.anchor;let _=v.getNode(),S=0,C=0;if(b.$isTextNode(_)&&w>=0&&p>=0&&(S=w,C=w+p,g.setTextNodeRange(_,S,_,C)),S===C&&f===""||(g.insertRawText(f),_=v.getNode()),b.$isTextNode(_)){S=h,C=h+u;const N=_.getTextContentSize();S=S>N?N:S,C=C>N?N:C,g.setTextNodeRange(_,S,_,C)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}b.defineExtension({build:(e,t,n)=>dn(t),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,n)=>Ut(()=>n.getOutput().disabled.value?void 0:Ao(e))});function ol(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Zn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function sl({editor:e,ErrorBoundary:t}){return function(n,o){const[s,a]=l.useState(()=>n.getDecorators());return Zn(()=>n.registerDecoratorListener(i=>{jr.flushSync(()=>{a(i)})}),[n]),l.useEffect(()=>{a(n.getDecorators())},[n]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=r.jsx(o,{onError:h=>n._onError(h),children:r.jsx(l.Suspense,{fallback:null,children:s[w]})}),f=n.getElementByKey(w);f!==null&&i.push(jr.createPortal(p,f,w))}return i},[o,s,n])}(e,t)}function al({editor:e,ErrorBoundary:t}){return function(n){const o=Ae.maybeFromEditor(n);if(o&&o.hasExtensionByName(tl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&ol(320,s);return!0}return!1}(e)?null:r.jsx(sl,{editor:e,ErrorBoundary:t})}function Lr(e){return e.getEditorState().read(Oo(e.isComposing()))}function il({contentEditable:e,placeholder:t=null,ErrorBoundary:n}){const[o]=Mt();return function(s){Zn(()=>Xt(Dn.registerRichText(s),Ao(s)),[s])}(o),r.jsxs(r.Fragment,{children:[e,r.jsx(ll,{content:t}),r.jsx(al,{editor:o,ErrorBoundary:n})]})}function ll({content:e}){const[t]=Mt(),n=function(s){const[a,i]=l.useState(()=>Lr(s));return Zn(()=>{function c(){const d=Lr(s);i(d)}return c(),Xt(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(t),o=Ii();return n?typeof e=="function"?e(o):e:null}function cl({defaultSelection:e}){const[t]=Mt();return l.useEffect(()=>{t.focus(()=>{const n=document.activeElement,o=t.getRootElement();o===null||n!==null&&o.contains(n)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const wl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function dl({onClear:e}){const[t]=Mt();return wl(()=>Eo(t,e),[t,e]),null}const Lo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function pl({editor:e,ariaActiveDescendant:t,ariaAutoComplete:n,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:u,className:g,id:v,role:_="textbox",spellCheck:S=!0,style:C,tabIndex:N,"data-testid":E,...O},M){const[T,D]=l.useState(e.isEditable()),j=l.useCallback(L=>{L&&L.ownerDocument&&L.ownerDocument.defaultView?e.setRootElement(L):e.setRootElement(null)},[e]),R=l.useMemo(()=>function(...L){return $=>{for(const z of L)typeof z=="function"?z($):z!=null&&(z.current=$)}}(M,j),[j,M]);return Lo(()=>(D(e.isEditable()),e.registerEditableListener(L=>{D(L)})),[e]),r.jsx("div",{"aria-activedescendant":T?t:void 0,"aria-autocomplete":T?n:"none","aria-controls":T?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":T&&_==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":T?f:void 0,"aria-readonly":!T||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:T,"data-testid":E,id:v,ref:R,role:_,spellCheck:S,style:C,tabIndex:N,...O})}const ul=l.forwardRef(pl);function Vr(e){return e.getEditorState().read(Oo(e.isComposing()))}const ml=l.forwardRef(hl);function hl(e,t){const{placeholder:n,...o}=e,[s]=Mt();return r.jsxs(r.Fragment,{children:[r.jsx(ul,{editor:s,...o,ref:t}),n!=null&&r.jsx(fl,{editor:s,content:n})]})}function fl({content:e,editor:t}){const n=function(i){const[c,d]=l.useState(()=>Vr(i));return Lo(()=>{function w(){const p=Vr(i);d(p)}return w(),Xt(i.registerUpdateListener(()=>{w()}),i.registerEditableListener(()=>{w()}))},[i]),c}(t),[o,s]=l.useState(t.isEditable());if(l.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(i=>{s(i)})),[t]),!n)return null;let a=null;return typeof e=="function"?a=e(o):e!==null&&(a=e),a===null?null:r.jsx("div",{"aria-hidden":!0,children:a})}function gl({placeholder:e,className:t,placeholderClassName:n}){return r.jsx(ml,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:r.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const Vo=l.createContext(void 0);function xl({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s}),[e,t,n,o,s]);return r.jsx(Vo.Provider,{value:i,children:a})}function Po(){const e=l.useContext(Vo);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function bl(){const[e,t]=l.useState(void 0),n=l.useCallback(()=>{t(void 0)},[]),o=l.useMemo(()=>{if(e===void 0)return;const{title:a,content:i}=e;return r.jsx(Xa,{open:!0,onOpenChange:n,children:r.jsxs(to,{children:[r.jsx(eo,{children:r.jsx(no,{children:a})}),i]})})},[e,n]),s=l.useCallback((a,i,c=!1)=>{t({closeOnClickOutside:c,content:i(n),title:a})},[n]);return[o,s]}function vl({children:e}){const[t]=Mt(),[n,o]=l.useState(t),[s,a]=l.useState("paragraph"),[i,c]=bl(),d=()=>{};return l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[n]),r.jsxs(xl,{activeEditor:n,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[i,e({blockType:s})]})}function yl(e){const[t]=Mt(),{activeEditor:n}=Po();l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&e(o),!1},b.COMMAND_PRIORITY_CRITICAL),[t,e]),l.useEffect(()=>{n.getEditorState().read(()=>{const o=b.$getSelection();o&&e(o)})},[n,e])}const $o=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Nl=l.forwardRef(({className:e,variant:t,size:n,...o},s)=>r.jsx(Wr.Root,{ref:s,className:m($o({variant:t,size:n,className:e})),...o}));Nl.displayName=Wr.Root.displayName;const Bo=l.createContext({size:"default",variant:"default"}),pn=l.forwardRef(({className:e,variant:t,size:n,children:o,...s},a)=>{const i=rt();return r.jsx(ln.Root,{ref:a,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:i,children:r.jsx(Bo.Provider,{value:{variant:t,size:n},children:o})})});pn.displayName=ln.Root.displayName;const ve=l.forwardRef(({className:e,children:t,variant:n,size:o,...s},a)=>{const i=l.useContext(Bo);return r.jsx(ln.Item,{ref:a,className:m($o({variant:i.variant||n,size:i.size||o}),e),...s,children:t})});ve.displayName=ln.Item.displayName;const Pr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function jl(){const{activeEditor:e}=Po(),[t,n]=l.useState([]),o=l.useCallback(s=>{if(b.$isRangeSelection(s)||Ea.$isTableSelection(s)){const a=[];Pr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),n(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return yl(o),r.jsx(pn,{type:"multiple",value:t,onValueChange:n,variant:"outline",size:"sm",children:Pr.map(({format:s,icon:a,label:i})=>r.jsx(ve,{value:s,"aria-label":i,onClick:()=>{e.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:r.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function kl({onClear:e}){const[t]=Mt();l.useEffect(()=>{e&&e(()=>{t.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function _l({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:n}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return r.jsxs("div",{className:"tw-relative",children:[r.jsx(vl,{children:()=>r.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:r.jsx(jl,{})})}),r.jsxs("div",{className:"tw-relative",children:[r.jsx(il,{contentEditable:r.jsx("div",{ref:s,children:r.jsx(gl,{placeholder:e})}),ErrorBoundary:Ri}),t&&r.jsx(cl,{defaultSelection:"rootEnd"}),r.jsx(kl,{onClear:n}),r.jsx(dl,{})]})]})}const Cl={namespace:"commentEditor",theme:qn,nodes:Yn,onError:e=>{console.error(e)}};function Bn({editorState:e,editorSerializedState:t,onChange:n,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i}){return r.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:r.jsx(ki,{initialConfig:{...Cl,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:r.jsxs(Tt,{children:[r.jsx(_l,{placeholder:s,autoFocus:a,onClear:i}),r.jsx(Ci,{ignoreSelectionChange:!0,onChange:c=>{n==null||n(c),o==null||o(c.toJSON())}})]})})})}function Sl(e,t){const n=b.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const a of n)if(!Fo.has(a.nodeName)){const i=Go(a,e,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&i.insertAfter(b.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const d of c)i.insertBefore(d);i.remove()}}(s),o}function El(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)zo(e,o[s],n,t);return n.innerHTML}function zo(e,t,n,o=null){let s=o===null||t.isSelected(o);const a=b.$isElementNode(t)&&t.excludeFromCopy("html");let i=t;o!==null&&b.$isTextNode(t)&&(i=Oi(o,t,"clone"));const c=b.$isElementNode(i)?i.getChildren():[],d=b.getRegisteredNode(e,i.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(e,i):i.exportDOM(e);const{element:p,after:f}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],v=zo(e,g,h,o);!s&&b.$isElementNode(t)&&v&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(h),n.append(p),f){const u=f.call(i,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else n.append(h);return s}const Fo=new Set(["STYLE","SCRIPT"]);function Go(e,t,n,o,s=new Map,a){let i=[];if(Fo.has(e.nodeName))return i;let c=null;const d=function(g,v){const{nodeName:_}=g,S=v._htmlConversions.get(_.toLowerCase());let C=null;if(S!==void 0)for(const N of S){const E=N(g);E!==null&&(C===null||(C.priority||0)<=(E.priority||0))&&(C=E)}return C!==null?C.conversion:null}(e,t),w=d?d(e):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(e.nodeName,w.forChild)}const f=e.childNodes;let h=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)h.push(...Go(f[g],t,n,u,new Map(s),c));return p!=null&&(h=p(h)),b.isBlockDomNode(e)&&(h=Tl(e,h,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return n.push(g),g}:b.$createParagraphNode)),c==null?h.length>0?i=i.concat(h):b.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(e)&&(i=i.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...h),i}function Tl(e,t,n){const o=e.style.textAlign,s=[];let a=[];for(let i=0;i<t.length;i++){const c=t[i];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===t.length-1||i<t.length-1&&b.$isBlockElementNode(t[i+1])){const d=n();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function Rl(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const n=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),n==null||n.removeAllRanges(),n==null||n.addRange(o),!0}function zt(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?e.root.children.some(n=>n!=null&&n.children?n.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function Ml(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),n=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:qn,nodes:Yn,onError:s=>{console.error(s)}});let o;if(n.update(()=>{const a=new DOMParser().parseFromString(t,"text/html"),i=Sl(n,a);b.$getRoot().clear(),b.$insertNodes(i)},{discrete:!0}),n.getEditorState().read(()=>{o=n.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function zn(e){const t=Ur.createHeadlessEditor({namespace:"EditorUtils",theme:qn,nodes:Yn,onError:s=>{console.error(s)}}),n=t.parseEditorState(JSON.stringify(e));t.setEditorState(n);let o="";return t.getEditorState().read(()=>{o=El(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Ko(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}const Ho=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ce=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,className:m("pr-twp",Ho({variant:t}),e),...n}));ce.displayName="Badge";const un=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));un.displayName="Card";const Xo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Xo.displayName="CardHeader";const Uo=l.forwardRef(({className:e,...t},n)=>r.jsx("h3",{ref:n,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Uo.displayName="CardTitle";const qo=l.forwardRef(({className:e,...t},n)=>r.jsx("p",{ref:n,className:m("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));qo.displayName="CardDescription";const Qn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-p-6 tw-pt-0",e),...t}));Qn.displayName="CardContent";const Yo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Yo.displayName="CardFooter";const we=l.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...o},s)=>r.jsx(Zr.Root,{ref:s,decorative:n,orientation:t,className:m("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));we.displayName=Zr.Root.displayName;const tr=l.forwardRef(({className:e,...t},n)=>r.jsx(_e.Root,{ref:n,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));tr.displayName=_e.Root.displayName;const Jo=l.forwardRef(({className:e,...t},n)=>r.jsx(_e.Image,{ref:n,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));Jo.displayName=_e.Image.displayName;const er=l.forwardRef(({className:e,...t},n)=>r.jsx(_e.Fallback,{ref:n,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));er.displayName=_e.Fallback.displayName;const nr=l.createContext(void 0);function kt(){const e=l.useContext(nr);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const Pt=Jt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ue=J.Trigger,rr=J.Group,Wo=J.Portal,Zo=J.Sub,Qo=J.RadioGroup;function ee({variant:e="default",...t}){const n=l.useMemo(()=>({variant:e}),[e]);return r.jsx(nr.Provider,{value:n,children:r.jsx(J.Root,{...t})})}const or=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=kt();return r.jsxs(J.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,Pt({variant:a.variant})),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});or.displayName=J.SubTrigger.displayName;const sr=l.forwardRef(({className:e,...t},n)=>r.jsx(J.SubContent,{ref:n,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));sr.displayName=J.SubContent.displayName;const $t=l.forwardRef(({className:e,sideOffset:t=4,children:n,...o},s)=>{const a=rt();return r.jsx(J.Portal,{children:r.jsx(J.Content,{ref:s,sideOffset:t,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:r.jsx("div",{dir:a,children:n})})})});$t.displayName=J.Content.displayName;const $e=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=rt(),a=kt();return r.jsx(J.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,Pt({variant:a.variant})),...n,dir:s})});$e.displayName=J.Item.displayName;const Ot=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=kt();return r.jsxs(J.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Pt({variant:a.variant})),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(J.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Ot.displayName=J.CheckboxItem.displayName;const ar=l.forwardRef(({className:e,children:t,...n},o)=>{const s=kt();return r.jsxs(J.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Pt({variant:s.variant})),...n,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(J.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});ar.displayName=J.RadioItem.displayName;const Ee=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(J.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Ee.displayName=J.Label.displayName;const me=l.forwardRef(({className:e,...t},n)=>r.jsx(J.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));me.displayName=J.Separator.displayName;function ts({className:e,...t}){return r.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ts.displayName="DropdownMenuShortcut";function Qe(e,t){return e===""?t["%comment_assign_unassigned%"]??"Unassigned":e==="Team"?t["%comment_assign_team%"]??"Team":e}function $r({comment:e,isReply:t=!1,localizedStrings:n,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,onEditingChange:d,canUserEditOrDeleteCommentCallback:w,canUserResolveThread:p=!1}){const[f,h]=l.useState(!1),[u,g]=l.useState(),[v,_]=l.useState(!1),S=l.useRef(null);l.useEffect(()=>{let j=!0;if(!o){_(!1);return}return(async()=>{const L=w?await w(e.id):!1;j&&_(L)})(),()=>{j=!1}},[w,e.id,o]),l.useEffect(()=>{if(!f)return;let j=!0;const R=S.current;if(!R)return;const L=setTimeout(()=>{j&&Rl(R)},300);return()=>{j=!1,clearTimeout(L)}},[f]);const C=l.useCallback(()=>{h(!1),g(void 0),d==null||d(!1)},[d]),N=l.useCallback(async()=>{if(!u||!i)return;await i(e.id,zn(u))&&(h(!1),g(void 0),d==null||d(!1))},[u,i,e.id,d]),E=l.useMemo(()=>{const j=new Date(e.date),R=y.formatRelativeDate(j,n["%comment_date_today%"],n["%comment_date_yesterday%"]),L=j.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(n["%comment_dateAtTime%"],{date:R,time:L})},[e.date,n]),O=l.useMemo(()=>e.user,[e.user]),M=l.useMemo(()=>e.user.split(" ").map(j=>j[0]).join("").toUpperCase().slice(0,2),[e.user]),T=l.useMemo(()=>y.sanitizeHtml(y.parseParatextHtml(e.contents)),[e.contents]),D=l.useMemo(()=>{if(o&&v)return r.jsxs(r.Fragment,{children:[!y.hasCustomParatextTags(e.contents)&&r.jsxs($e,{onClick:()=>{h(!0),g(Ml(y.parseParatextHtml(e.contents))),d==null||d(!0)},children:[r.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),n["%comment_editComment%"]]}),r.jsxs($e,{onClick:async()=>{c&&await c(e.id)},children:[r.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),n["%comment_deleteComment%"]]})]})},[v,o,n,e.contents,e.id,c,d]);return r.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[r.jsx(tr,{className:"tw-h-8 tw-w-8",children:r.jsx(er,{className:"tw-text-xs tw-font-medium",children:M})}),r.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[r.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[r.jsx("p",{className:"tw-text-sm tw-font-medium",children:O}),r.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:E}),r.jsx("div",{className:"tw-flex-1"}),t&&e.assignedUser!==void 0&&r.jsxs(ce,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Qe(e.assignedUser,n)]})]}),f&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:S,onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),C()):j.key==="Enter"&&j.shiftKey&&(j.preventDefault(),j.stopPropagation(),zt(u)&&N())},onKeyDown:j=>{Ko(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:[r.jsx(Bn,{editorSerializedState:u,onSerializedChange:j=>g(j)}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[r.jsx(P,{size:"icon",onClick:C,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:r.jsx(k.X,{})}),r.jsx(P,{size:"icon",onClick:N,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!zt(u),children:r.jsx(k.ArrowUp,{})})]})]}),!f&&r.jsxs(r.Fragment,{children:[e.status==="Resolved"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:n["%comment_status_resolved%"]}),e.status==="Todo"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:n["%comment_status_todo%"]}),r.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:T}})]})]}),o&&p&&!t&&s!=="Resolved"&&a&&r.jsx(P,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:j=>{j.stopPropagation(),a({threadId:e.thread,status:"Resolved"})},children:r.jsx(k.Check,{})}),D&&r.jsxs(ee,{children:[r.jsx(ue,{asChild:!0,children:r.jsx(P,{variant:"ghost",size:"icon",children:r.jsx(k.MoreHorizontal,{})})}),r.jsx($t,{align:"end",children:D})]})]})}const Br={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Dl({comments:e,localizedStrings:t,isSelected:n=!1,verseRef:o,assignedUser:s,currentUser:a,handleSelectThread:i,threadId:c,threadStatus:d,handleAddCommentToThread:w,handleUpdateComment:p,handleDeleteComment:f,assignableUsers:h,canUserAddCommentToThread:u,canUserAssignThreadCallback:g,canUserResolveThreadCallback:v,canUserEditOrDeleteCommentCallback:_}){const[S,C]=l.useState(Br),[N,E]=l.useState(!1),[O,M]=l.useState(!1),[T,D]=l.useState(!1),[j,R]=l.useState(!1),[L,$]=l.useState(!1),[z,A]=l.useState(void 0),[U,I]=l.useState(!1),[Q,xt]=l.useState(!1);l.useEffect(()=>{let x=!0;if(!n){I(!1),xt(!1);return}return(async()=>{const q=g?await g(c):!1;if(!x)return;const st=v?await v(c):!1;x&&(I(q),xt(st))})(),()=>{x=!1}},[n,c,g,v]);const vt=l.useMemo(()=>e.filter(x=>!x.deleted),[e]),mt=l.useMemo(()=>vt[0],[vt]),V=l.useRef(null),Y=l.useRef(void 0),at=l.useCallback(()=>{var x;(x=Y.current)==null||x.call(Y),C(Br)},[]);l.useEffect(()=>{const x=V.current;if(!x)return;const B=()=>{M(x.scrollWidth>x.clientWidth)};return B(),window.addEventListener("resize",B),()=>window.removeEventListener("resize",B)},[mt==null?void 0:mt.verse]),l.useEffect(()=>{D(!1)},[n]);const ot=l.useMemo(()=>({singleReply:t["%comment_thread_single_reply%"],multipleReplies:t["%comment_thread_multiple_replies%"]}),[t]),bt=l.useMemo(()=>{if(s===void 0)return;if(s==="")return t["%comment_assign_unassigned%"]??"Unassigned";const x=Qe(s,t);return y.formatReplacementString(t["%comment_assigned_to%"],{assignedUser:x})},[s,t]),Bt=l.useMemo(()=>vt.slice(1),[vt]),ht=l.useMemo(()=>Bt.length??0,[Bt.length]),gn=l.useMemo(()=>ht>0,[ht]),xn=l.useMemo(()=>T||ht<=2?Bt:Bt.slice(-2),[Bt,ht,T]),fe=l.useMemo(()=>T||ht<=2?0:ht-2,[ht,T]),Ue=l.useMemo(()=>ht===1?ot.singleReply:y.formatReplacementString(ot.multipleReplies,{count:ht}),[ht,ot]),bn=l.useMemo(()=>fe===1?ot.singleReply:y.formatReplacementString(ot.multipleReplies,{count:fe}),[fe,ot]),qe=l.useCallback(async()=>{const x=zt(S)?zn(S):void 0;if(z!==void 0){await w({threadId:c,contents:x,assignedUser:z})&&(A(void 0),x&&at());return}x&&await w({threadId:c,contents:x})&&at()},[at,S,w,z,c]),vn=l.useCallback(async x=>{const B=zt(S)?zn(S):void 0,q=await w({...x,contents:B,assignedUser:z??x.assignedUser});return q&&B&&at(),q&&z!==void 0&&A(void 0),q},[at,S,w,z]);return r.jsx(un,{role:"option","aria-selected":n,id:c,className:m("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!n},{"tw-bg-primary-foreground":!n&&d!=="Resolved","tw-bg-background":n&&d!=="Resolved","tw-bg-muted":d==="Resolved"}),onClick:()=>{i(c)},tabIndex:-1,children:r.jsxs(Qn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[r.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[bt&&r.jsx(ce,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:bt}),r.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[r.jsxs("p",{ref:V,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":N},{"tw-whitespace-nowrap":!N}),children:[o," ",mt.verse]}),O&&r.jsx(P,{variant:"ghost",size:"icon",onClick:x=>{x.stopPropagation(),E(!N)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":N?"Collapse text":"Expand text",children:N?r.jsx(k.ChevronUp,{}):r.jsx(k.ChevronDown,{})})]}),r.jsx($r,{comment:mt,localizedStrings:t,isThreadExpanded:n,threadStatus:d,handleAddCommentToThread:vn,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:R,canUserEditOrDeleteCommentCallback:_,canUserResolveThread:Q})]}),r.jsxs(r.Fragment,{children:[gn&&!n&&r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(we,{})}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ue})]}),!n&&zt(S)&&r.jsx(Bn,{editorSerializedState:S,onSerializedChange:x=>C(x),placeholder:t["%comment_replyOrAssign%"]}),n&&r.jsxs(r.Fragment,{children:[fe>0&&r.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:x=>{x.stopPropagation(),D(!0)},role:"button",tabIndex:0,onKeyDown:x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),x.stopPropagation(),D(!0))},children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(we,{})}),r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:bn}),T?r.jsx(k.ChevronUp,{}):r.jsx(k.ChevronDown,{})]})]}),xn.map(x=>r.jsx("div",{children:r.jsx($r,{comment:x,localizedStrings:t,isReply:!0,isThreadExpanded:n,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:R,canUserEditOrDeleteCommentCallback:_})},x.id)),u!==!1&&(!j||zt(S))&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:x=>x.stopPropagation(),onKeyDownCapture:x=>{x.key==="Enter"&&x.shiftKey&&(x.preventDefault(),x.stopPropagation(),(zt(S)||z!==void 0)&&qe())},onKeyDown:x=>{Ko(x),(x.key==="Enter"||x.key===" ")&&x.stopPropagation()},children:[r.jsx(Bn,{editorSerializedState:S,onSerializedChange:x=>C(x),placeholder:d==="Resolved"?t["%comment_reopenResolved%"]:t["%comment_replyOrAssign%"],autoFocus:!0,onClear:x=>{Y.current=x}}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[z!==void 0&&r.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(t["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Qe(z,t)})}),r.jsxs(Qt,{open:L,onOpenChange:$,children:[r.jsx(te,{asChild:!0,children:r.jsx(P,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!U||!h||h.length===0||!h.includes(a),"aria-label":"Assign user",children:r.jsx(k.AtSign,{})})}),r.jsx(Vt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:x=>{x.key==="Escape"&&(x.stopPropagation(),$(!1))},children:r.jsx(Wt,{children:r.jsx(Zt,{children:h==null?void 0:h.map(x=>r.jsx(Lt,{onSelect:()=>{A(x!==s?x:void 0),$(!1)},className:"tw-flex tw-items-center",children:r.jsx("span",{children:Qe(x,t)})},x||"unassigned"))})})})]}),r.jsx(P,{size:"icon",onClick:qe,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!zt(S)&&z===void 0,"aria-label":"Submit comment",children:r.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function Il({className:e="",threads:t,currentUser:n,localizedStrings:o,handleAddCommentToThread:s,handleUpdateComment:a,handleDeleteComment:i,assignableUsers:c,canUserAddCommentToThread:d,canUserAssignThreadCallback:w,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f}){const[h,u]=l.useState(),g=t.filter(M=>M.comments.some(T=>!T.deleted)),v=g.map(M=>({id:M.id})),_=l.useCallback(M=>{u(M.id)},[]),S=l.useCallback(M=>{u(M)},[]),{listboxRef:C,activeId:N,handleKeyDown:E}=xo({options:v,onOptionSelect:_}),O=l.useCallback(M=>{M.key==="Escape"?(u(void 0),M.preventDefault(),M.stopPropagation()):E(M)},[E]);return r.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:C,"aria-activedescendant":N??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:O,children:g.map(M=>r.jsx("div",{className:m({"tw-opacity-60":M.status==="Resolved"}),children:r.jsx(Dl,{comments:M.comments,localizedStrings:o,verseRef:M.verseRef,handleSelectThread:S,threadId:M.id,isSelected:h===M.id,currentUser:n,assignedUser:M.assignedUser,threadStatus:M.status,handleAddCommentToThread:s,handleUpdateComment:a,handleDeleteComment:i,assignableUsers:c,canUserAddCommentToThread:d,canUserAssignThreadCallback:w,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f})},M.id))})}function Ol({table:e}){return r.jsxs(ee,{children:[r.jsx(qr.DropdownMenuTrigger,{asChild:!0,children:r.jsxs(P,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[r.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),r.jsxs($t,{align:"end",className:"tw-w-[150px]",children:[r.jsx(Ee,{children:"Toggle columns"}),r.jsx(me,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>r.jsx(Ot,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const de=tt.Root,es=tt.Group,pe=tt.Value,ns=Jt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),qt=l.forwardRef(({className:e,children:t,size:n,...o},s)=>{const a=rt();return r.jsxs(tt.Trigger,{className:m(ns({size:n,className:e})),ref:s,...o,dir:a,children:[t,r.jsx(tt.Icon,{asChild:!0,children:r.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});qt.displayName=tt.Trigger.displayName;const ir=l.forwardRef(({className:e,...t},n)=>r.jsx(tt.ScrollUpButton,{ref:n,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ir.displayName=tt.ScrollUpButton.displayName;const lr=l.forwardRef(({className:e,...t},n)=>r.jsx(tt.ScrollDownButton,{ref:n,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));lr.displayName=tt.ScrollDownButton.displayName;const Yt=l.forwardRef(({className:e,children:t,position:n="popper",...o},s)=>{const a=rt();return r.jsx(tt.Portal,{children:r.jsxs(tt.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...o,children:[r.jsx(ir,{}),r.jsx(tt.Viewport,{className:m("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:r.jsx("div",{dir:a,children:t})}),r.jsx(lr,{})]})})});Yt.displayName=tt.Content.displayName;const rs=l.forwardRef(({className:e,...t},n)=>r.jsx(tt.Label,{ref:n,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));rs.displayName=tt.Label.displayName;const gt=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(tt.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(tt.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),r.jsx(tt.ItemText,{children:t})]}));gt.displayName=tt.Item.displayName;const os=l.forwardRef(({className:e,...t},n)=>r.jsx(tt.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));os.displayName=tt.Separator.displayName;function Al({table:e}){return r.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[r.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),r.jsxs(de,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[r.jsx(qt,{className:"tw-h-8 tw-w-[70px]",children:r.jsx(pe,{placeholder:e.getState().pagination.pageSize})}),r.jsx(Yt,{side:"top",children:[10,20,30,40,50].map(t=>r.jsx(gt,{value:`${t}`,children:t},t))})]})]}),r.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsxs(P,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),r.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(P,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),r.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(P,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),r.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs(P,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),r.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const zr=`
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
`;function Ll(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Be(e,t){const n=t?`${zr}, ${t}`:zr;return Array.from(e.querySelectorAll(n)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ll(o))}const Ge=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Be(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Be(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return r.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:r.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...n})})});Ge.displayName="Table";const Ke=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>r.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));Ke.displayName="TableHeader";const He=l.forwardRef(({className:e,...t},n)=>r.jsx("tbody",{ref:n,className:m("[&_tr:last-child]:tw-border-0",e),...t}));He.displayName="TableBody";const ss=l.forwardRef(({className:e,...t},n)=>r.jsx("tfoot",{ref:n,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));ss.displayName="TableFooter";function Vl(e){l.useEffect(()=>{const t=e.current;if(!t)return;const n=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?Be(e.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",n),()=>{t.removeEventListener("keydown",n)}},[e])}function Pl(e,t,n){let o;return n==="ArrowLeft"&&t>0?o=e[t-1]:n==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function $l(e,t,n){let o;return n==="ArrowDown"&&t<e.length-1?o=e[t+1]:n==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Et=l.forwardRef(({className:e,onKeyDown:t,onSelect:n,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Vl(i);const c=l.useMemo(()=>i.current?Be(i.current):[],[i]),d=l.useCallback(p=>{const{current:f}=i;if(!f||!f.parentElement)return;const h=f.closest("table"),u=h?Be(h).filter(_=>_.tagName==="TR"):[],g=u.indexOf(f),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),$l(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Pl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const _=f.closest("table");_&&_.focus()}t==null||t(p)},[i,c,t]),w=l.useCallback(p=>{o&&(n==null||n(p))},[o,n]);return r.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:d,onFocus:w,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Et.displayName="TableRow";const je=l.forwardRef(({className:e,...t},n)=>r.jsx("th",{ref:n,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));je.displayName="TableHead";const Ht=l.forwardRef(({className:e,...t},n)=>r.jsx("td",{ref:n,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ht.displayName="TableCell";const as=l.forwardRef(({className:e,...t},n)=>r.jsx("caption",{ref:n,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));as.displayName="TableCaption";function en({className:e,...t}){return r.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function is({columns:e,data:t,enablePagination:n=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var M;const[p,f]=l.useState([]),[h,u]=l.useState([]),[g,v]=l.useState({}),[_,S]=l.useState({}),C=l.useMemo(()=>t??[],[t]),N=ct.useReactTable({data:C,columns:e,getCoreRowModel:ct.getCoreRowModel(),...n&&{getPaginationRowModel:ct.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:ct.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:ct.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:S,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:_}}),E=N.getVisibleFlatColumns();let O;return d?O=Array.from({length:10}).map((j,R)=>`skeleton-row-${R}`).map(j=>r.jsx(Et,{children:r.jsx(Ht,{colSpan:E.length??e.length,className:"tw-border-0 tw-p-0",children:r.jsx("div",{className:"tw-w-full tw-py-2",children:r.jsx(en,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},j)):((M=N.getRowModel().rows)==null?void 0:M.length)>0?O=N.getRowModel().rows.map(T=>r.jsx(Et,{onClick:()=>i(T,N),"data-state":T.getIsSelected()&&"selected",children:T.getVisibleCells().map(D=>r.jsx(Ht,{children:ct.flexRender(D.column.columnDef.cell,D.getContext())},D.id))},T.id)):O=r.jsx(Et,{children:r.jsx(Ht,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:w})}),r.jsxs("div",{className:"pr-twp",id:c,children:[s&&r.jsx(Ol,{table:N}),r.jsxs(Ge,{stickyHeader:a,children:[r.jsx(Ke,{stickyHeader:a,children:N.getHeaderGroups().map(T=>r.jsx(Et,{children:T.headers.map(D=>r.jsx(je,{children:D.isPlaceholder?void 0:ct.flexRender(D.column.columnDef.header,D.getContext())},D.id))},T.id))}),r.jsx(He,{children:O})]}),n&&r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[r.jsx(P,{variant:"outline",size:"sm",onClick:()=>N.previousPage(),disabled:!N.getCanPreviousPage(),children:"Previous"}),r.jsx(P,{variant:"outline",size:"sm",onClick:()=>N.nextPage(),disabled:!N.getCanNextPage(),children:"Next"})]}),n&&o&&r.jsx(Al,{table:N})]})}function Bl({id:e,markdown:t,className:n,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return r.jsx("div",{id:e,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},n),children:r.jsx(Oa,{options:a,children:t})})}const ls=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Fr=(e,t)=>e[t]??t;function cs({errorDetails:e,handleCopyNotify:t,localizedStrings:n,id:o}){const s=Fr(n,"%webView_error_dump_header%"),a=Fr(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),t&&t()}return r.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[r.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[r.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[r.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),r.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),r.jsx(P,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:r.jsx(k.Copy,{})})]}),r.jsx("div",{className:"tw-prose tw-w-full",children:r.jsx("pre",{className:"tw-text-xs",children:e})})]})}const zl=Object.freeze([...ls,"%webView_error_dump_copied_message%"]);function Fl({errorDetails:e,handleCopyNotify:t,localizedStrings:n,children:o,className:s,id:a}){const[i,c]=l.useState(!1),d=()=>{c(!0),t&&t()},w=p=>{p||c(!1)};return r.jsxs(Qt,{onOpenChange:w,children:[r.jsx(te,{asChild:!0,children:o}),r.jsxs(Vt,{id:a,className:m("tw-min-w-80 tw-max-w-96",s),children:[i&&n["%webView_error_dump_copied_message%"]&&r.jsx(et,{children:n["%webView_error_dump_copied_message%"]}),r.jsx(cs,{errorDetails:e,handleCopyNotify:d,localizedStrings:n})]})]})}var ws=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(ws||{});function Gl({id:e,label:t,groups:n}){const[o,s]=l.useState(Object.fromEntries(n.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,i]=l.useState({}),c=(w,p)=>{const f=!o[w][p];s(u=>(u[w][p]=f,{...u}));const h=n[w].items[p];h.onUpdate(h.id,f)},d=(w,p)=>{i(h=>(h[w]=p,{...h}));const f=n[w].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return r.jsx("div",{id:e,children:r.jsxs(ee,{children:[r.jsx(ue,{asChild:!0,children:r.jsxs(P,{variant:"default",children:[r.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,r.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),r.jsx($t,{children:n.map((w,p)=>r.jsxs("div",{children:[r.jsx(Ee,{children:w.label}),r.jsx(rr,{children:w.itemType===0?r.jsx(r.Fragment,{children:w.items.map((f,h)=>r.jsx("div",{children:r.jsx(Ot,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:f.label})},f.id))}):r.jsx(Qo,{value:a[p],onValueChange:f=>d(p,f),children:w.items.map(f=>r.jsx("div",{children:r.jsx(ar,{value:f.id,children:f.label})},f.id))})}),r.jsx(me,{})]},w.label))})]})})}function Kl({id:e,category:t,downloads:n,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const d=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((p,f)=>p+f,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return r.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[r.jsx("div",{className:"tw-flex",children:r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsxs("div",{className:"tw-flex tw-gap-1",children:[r.jsx(k.User,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&r.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs(P,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",r.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs(P,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",r.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Hl({id:e,versionHistory:t}){const[n,o]=l.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,f=w.getUTCMonth(),h=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const i=Object.entries(t).sort((c,d)=>d[0].localeCompare(c[0]));return r.jsxs("div",{className:"pr-twp",id:e,children:[r.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),r.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(c=>r.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[r.jsx("div",{className:"tw-text-foreground",children:r.jsx("li",{className:"tw-prose tw-text-xs",children:r.jsx("span",{children:c[1].description})})}),r.jsxs("div",{className:"tw-justify-end tw-text-right",children:[r.jsxs("div",{children:["Version ",c[0]]}),r.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&r.jsx("button",{type:"button",onClick:()=>o(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Xl({id:e,publisherDisplayName:t,fileSize:n,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>y.formatBytes(n),[n]),d=(w=>{const p=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return w.map(f=>p.of(f))})(o);return r.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&r.jsx(Hl,{versionHistory:s}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[r.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),r.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Publisher"}),r.jsx("span",{className:"tw-font-semibold",children:t}),r.jsx("span",{children:"Size"}),r.jsx("span",{className:"tw-font-semibold",children:i})]}),r.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Version"}),r.jsx("span",{className:"tw-font-semibold",children:a}),r.jsx("span",{children:"Languages"}),r.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function ds({entries:e,selected:t,onChange:n,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:v="ghost",id:_}){const[S,C]=l.useState(!1),N=l.useCallback(R=>{var $;const L=($=e.find(z=>z.label===R))==null?void 0:$.value;L&&n(t.includes(L)?t.filter(z=>z!==L):[...t,L])},[e,t,n]),E=()=>d||o,O=l.useMemo(()=>{if(!h)return e;const R=e.filter($=>$.starred).sort(($,z)=>$.label.localeCompare(z.label)),L=e.filter($=>!$.starred).sort(($,z)=>{const A=t.includes($.value),U=t.includes(z.value);return A&&!U?-1:!A&&U?1:$.label.localeCompare(z.label)});return[...R,...L]},[e,t,h]),M=()=>{n(e.map(R=>R.value))},T=()=>{n([])},D=w??S,j=p??C;return r.jsx("div",{id:_,className:g,children:r.jsxs(Qt,{open:D,onOpenChange:j,children:[r.jsx(te,{asChild:!0,children:r.jsxs(P,{variant:v,role:"combobox","aria-expanded":D,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&r.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:r.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),r.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),r.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Vt,{align:"start",className:"tw-w-full tw-p-0",children:r.jsxs(Wt,{children:[r.jsx(Ce,{placeholder:`Search ${o.toLowerCase()}...`}),s&&r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx(P,{variant:"ghost",size:"sm",onClick:M,children:a}),r.jsx(P,{variant:"ghost",size:"sm",onClick:T,children:i})]}),r.jsxs(Zt,{children:[r.jsx(Fe,{children:c}),r.jsx(At,{children:O.map(R=>r.jsxs(Lt,{value:R.label,onSelect:N,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("div",{className:"w-4",children:r.jsx(k.Check,{className:m("tw-h-4 tw-w-4",t.includes(R.value)?"tw-opacity-100":"tw-opacity-0")})}),R.starred&&r.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),r.jsx("div",{className:"tw-flex-grow",children:R.label}),R.secondaryLabel&&r.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:R.secondaryLabel})]},R.label))})]})]})})]})})}function Ul({entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:f}){return r.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx(ds,{entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w}),t.length>0?r.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(h=>{var u;return r.jsxs(ce,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[r.jsx(P,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(t.filter(g=>g!==h)),children:r.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===h))==null?void 0:u.label]},h)})}):r.jsx(et,{children:p})]})}const he=l.forwardRef(({className:e,type:t,...n},o)=>r.jsx("input",{type:t,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...n}));he.displayName="Input";const ql=(e,t,n)=>e==="generated"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):r.jsxs(r.Fragment,{children:[r.jsx("p",{children:n})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function Yl({callerType:e,updateCallerType:t,customCaller:n,updateCustomCaller:o,localizedStrings:s}){const[a,i]=l.useState(e),[c,d]=l.useState(n);l.useEffect(()=>{i(e)},[e]),l.useEffect(()=>{c!==n&&d(n)},[n]);const w=p=>{p||(a!=="custom"||c?(t(a),o(c)):(i(e),d(n)))};return r.jsxs(ee,{onOpenChange:w,children:[r.jsx(Tt,{children:r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:r.jsx(ue,{asChild:!0,children:r.jsx(P,{variant:"outline",className:"tw-h-6",children:ql(e,s,n)})})}),r.jsx(Rt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),r.jsxs($t,{className:"tw-z-[300]",children:[r.jsx(Ee,{children:s["%footnoteEditor_callerDropdown_label%"]}),r.jsx(me,{}),r.jsx(Ot,{checked:a==="generated",onCheckedChange:()=>i("generated"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.GENERATOR_NOTE_CALLER})]})}),r.jsx(Ot,{checked:a==="hidden",onCheckedChange:()=>i("hidden"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.HIDDEN_NOTE_CALLER})]})}),r.jsx(Ot,{checked:a==="custom",onCheckedChange:()=>i("custom"),onSelect:p=>p.preventDefault(),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),r.jsx(he,{className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:c,maxLength:1,onChange:p=>d(p.target.value)})]})})]})]})}const Jl=(e,t)=>e==="f"?r.jsxs(r.Fragment,{children:[r.jsx(k.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?r.jsxs(r.Fragment,{children:[r.jsx(k.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):r.jsxs(r.Fragment,{children:[r.jsx(k.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),Wl=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let n=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(n=t["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:n})};function Zl({noteType:e,handleNoteTypeChange:t,localizedStrings:n}){return r.jsxs(ee,{children:[r.jsx(Tt,{children:r.jsxs(It,{children:[r.jsx(Xr.TooltipTrigger,{asChild:!0,children:r.jsx(ue,{asChild:!0,children:r.jsx(P,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:e==="x",children:Jl(e,n)})})}),r.jsx(Rt,{children:r.jsx("p",{children:Wl(e,n)})})]})}),e!=="x"&&r.jsxs($t,{className:"tw-z-[300]",children:[r.jsx(Ee,{children:n["%footnoteEditor_noteTypeDropdown_label%"]}),r.jsx(me,{}),r.jsxs(Ot,{checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[r.jsx(k.FunctionSquare,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_footnote_label%"]})]}),r.jsxs(Ot,{checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[r.jsx(k.SquareSigma,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Ql({noteOps:e,onSave:t,onClose:n,scrRef:o,noteKey:s,editorOptions:a,localizedStrings:i}){const c=l.useRef(null),d=l.createRef(),[w,p]=l.useState("generated"),[f,h]=l.useState("*"),[u,g]=l.useState("f"),v=l.useMemo(()=>({...a,markerMenuTrigger:a.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...a.view??yt.getDefaultViewOptions(),noteMode:"expanded"}}),[a]);l.useEffect(()=>{var N;(N=c.current)==null||N.focus()}),l.useEffect(()=>{var O,M;let N;const E=e==null?void 0:e.at(0);if(E&&yt.isInsertEmbedOpOfType("note",E)){const T=(O=E.insert.note)==null?void 0:O.caller;let D="custom";T===yt.GENERATOR_NOTE_CALLER?D="generated":T===yt.HIDDEN_NOTE_CALLER?D="hidden":T&&h(T),p(D),g(((M=E.insert.note)==null?void 0:M.style)??"f"),E.insert.note&&(E.insert.note.caller=""),N=setTimeout(()=>{var j;(j=c.current)==null||j.applyUpdate([{delete:1},E])},0)}return()=>{N&&clearTimeout(N)}},[e,s]);const _=l.useCallback(()=>{var E,O;const N=(O=(E=c.current)==null?void 0:E.getNoteOps(0))==null?void 0:O.at(0);N&&yt.isInsertEmbedOpOfType("note",N)&&(N.insert.note&&(w==="custom"?N.insert.note.caller=f:N.insert.note.caller=w==="generated"?yt.GENERATOR_NOTE_CALLER:yt.HIDDEN_NOTE_CALLER),t([N]))},[w,f,t]),S=()=>{var E;const N=(E=d.current)==null?void 0:E.getElementsByClassName("editor-input")[0];N!=null&&N.textContent&&navigator.clipboard.writeText(N.textContent)},C=N=>{var O,M,T;g(N);const E=(M=(O=c.current)==null?void 0:O.getNoteOps(0))==null?void 0:M.at(0);E&&yt.isInsertEmbedOpOfType("note",E)&&(E.insert.note&&(E.insert.note.style=N),(T=c.current)==null||T.applyUpdate([{delete:1},E]))};return r.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[r.jsxs("div",{className:"tw-flex",children:[r.jsxs("div",{className:"tw-flex tw-gap-4",children:[r.jsx(Zl,{noteType:u,handleNoteTypeChange:C,localizedStrings:i}),r.jsx(Yl,{callerType:w,updateCallerType:p,customCaller:f,updateCustomCaller:h,localizedStrings:i})]}),r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[r.jsx(Tt,{children:r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:r.jsx(P,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:r.jsx(k.X,{})})}),r.jsx(Rt,{children:r.jsx("p",{children:i["%footnoteEditor_cancelButton_tooltip%"]})})]})}),r.jsx(Tt,{children:r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:r.jsx(P,{onClick:_,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:r.jsx(k.Check,{})})}),r.jsx(Rt,{children:i["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),r.jsxs("div",{ref:d,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[r.jsx(yt.Editorial,{options:v,onScrRefChange:()=>{},scrRef:o,ref:c}),r.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:r.jsx(Tt,{children:r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:r.jsx(P,{onClick:S,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:r.jsx(k.Copy,{})})}),r.jsx(Rt,{children:r.jsx("p",{children:i["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const tc=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function ps(e,t){if(!t||t.length===0)return e??"empty";const n=t.find(s=>typeof s=="string");if(n)return`key-${e??"unknown"}-${n.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function ec(e,t,n=!0,o=void 0){if(!t||t.length===0)return;const s=[],a=[];let i=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,d)=>{const w=d===a.length-1;return r.jsxs("p",{className:"tw-mb-2",children:[cr(e,c,n,!0,s),w&&o]},ps(e,c))})}function cr(e,t,n=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(a=>{if(typeof a=="string"){const i=`${e}-text-${a.slice(0,10)}`;if(o){const c=m(`usfm_${e}`);return r.jsx("span",{className:c,children:a},i)}return r.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[r.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),r.jsx("span",{children:a}),r.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return nc(a,ps(`${e}\\${a.marker}`,[a]),n,[...s,e??"unknown"])})}function nc(e,t,n,o=[]){const{marker:s}=e;return r.jsxs("span",{children:[s?n&&r.jsx("span",{className:"marker",children:`\\${s} `}):r.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),cr(s,e.content,n,!0,[...o,s??"unknown"])]},t)}function us({footnote:e,layout:t="horizontal",formatCaller:n,showMarkers:o=!0}){const s=n?n(e.caller):e.caller,a=s!==e.caller;let i,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([i,...c]=e.content);const d=o?r.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,w=o?r.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=r.jsxs(r.Fragment,{children:[s&&r.jsxs("span",{className:m("note-caller",{formatted:a}),children:[s," "]}),i&&r.jsxs(r.Fragment,{children:[cr(e.marker,[i],o,!1)," "]})]}),u=m(t==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:m("textual-note-header tw-text-nowrap tw-pr-2",u),children:[d,p]}),r.jsx("div",{className:m("textual-note-body tw-pr-0.5",u),children:c&&c.length>0&&r.jsx(r.Fragment,{children:ec(e.marker,c,o,w)})})]})}const rc=["%webView_footnoteList_header%"],oc=(e,t)=>e[t]??t;function sc({className:e,classNameForItems:t,footnotes:n,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w,localizedStrings:p}){const f=p?oc(p,"%webView_footnoteList_header%"):"Footnotes",h=d??y.getFormatCallerFunction(n,void 0),u=(N,E)=>{w==null||w(N,E,s)},g=a?n.findIndex(N=>N===a):0,[v,_]=l.useState(g),S=N=>{if(n.length)switch(N.key){case"ArrowDown":N.preventDefault(),_(E=>Math.min(E+1,n.length-1));break;case"ArrowUp":N.preventDefault(),_(E=>Math.max(E-1,0));break;case"Enter":case" ":N.preventDefault(),w==null||w(n[v],v,s);break}},C=l.useRef([]);return l.useEffect(()=>{var N;v>=0&&v<C.current.length&&((N=C.current[v])==null||N.focus())},[v]),r.jsxs(r.Fragment,{children:[o==="vertical"&&r.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:f}),r.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:m("tw-h-full tw-overflow-y-auto",e),onKeyDown:S,children:r.jsx("div",{className:m("tw-p-0.5 tw-pt-1",o==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!c&&"formatted-font"),children:n.map((N,E)=>{const O=N===a,M=`${s}-${E}`;return r.jsxs(r.Fragment,{children:[r.jsx(un,{ref:T=>{C.current[E]=T},role:"option","aria-selected":O,"data-marker":N.marker,"data-state":O?"selected":void 0,tabIndex:-1,className:m("data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",o==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",t),onClick:()=>u(N,E),children:r.jsx(us,{footnote:N,layout:o,formatCaller:()=>h(N.caller,E),showMarkers:i})},M),E<n.length-1&&o==="vertical"&&r.jsx(we,{})]})})})})]})}function ac(e){const t=[];let n=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>n&&t.push(e.substring(n,s.index)),t.push(r.jsx("strong",{children:s[1]},s.index)),n=o.lastIndex;return n<e.length&&t.push(e.substring(n)),t.length>0?t:[e]}function ic({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const o=n["%webView_inventory_occurrences_table_header_reference%"],s=n["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const i=[],c=new Set;return e.forEach(d=>{const w=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;c.has(w)||(c.add(w),i.push(d))}),i},[e]);return r.jsxs(Ge,{stickyHeader:!0,children:[r.jsx(Ke,{stickyHeader:!0,children:r.jsxs(Et,{children:[r.jsx(je,{children:o}),r.jsx(je,{children:s})]})}),r.jsx(He,{children:a.length>0&&a.map(i=>r.jsxs(Et,{onClick:()=>{t(i.reference)},children:[r.jsx(Ht,{children:`${H.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),r.jsx(Ht,{children:ac(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const mn=l.forwardRef(({className:e,...t},n)=>r.jsx(In.Root,{ref:n,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:r.jsx(In.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));mn.displayName=In.Root.displayName;const hn=e=>e==="asc"?r.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?r.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):r.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),lc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>r.jsxs(P,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,hn(t.getIsSorted())]})}),cc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>r.jsxs(P,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,hn(n.getIsSorted())]})}),wc=e=>({accessorKey:"count",header:({column:t})=>r.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:r.jsxs(P,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,hn(t.getIsSorted())]})}),cell:({row:t})=>r.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),En=(e,t,n,o,s,a)=>{let i=[...n];e.forEach(d=>{t==="approved"?i.includes(d)||i.push(d):i=i.filter(w=>w!==d)}),o(i);let c=[...s];e.forEach(d=>{t==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},dc=(e,t,n,o,s)=>({accessorKey:"status",header:({column:a})=>r.jsx("div",{className:"tw-flex tw-justify-center",children:r.jsxs(P,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,hn(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return r.jsxs(pn,{value:i,variant:"outline",type:"single",children:[r.jsx(ve,{onClick:d=>{d.stopPropagation(),En([c],"approved",t,n,o,s)},value:"approved",children:r.jsx(k.CircleCheckIcon,{})}),r.jsx(ve,{onClick:d=>{d.stopPropagation(),En([c],"unapproved",t,n,o,s)},value:"unapproved",children:r.jsx(k.CircleXIcon,{})}),r.jsx(ve,{onClick:d=>{d.stopPropagation(),En([c],"unknown",t,n,o,s)},value:"unknown",children:r.jsx(k.CircleHelpIcon,{})})]})}}),pc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),uc=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},mc=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},ms=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",hc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),fc=(e,t,n)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),n!==""&&(o=o.filter(s=>s.items[0].includes(n))),o},gc=(e,t,n)=>{const o=[];return e.forEach(s=>{const a=o.find(i=>y.deepEqual(i.items,y.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:s.verseRef,text:s.verse});else{const i={items:y.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText,count:1,status:ms(y.isString(s.inventoryText)?s.inventoryText:s.inventoryText[0],t,n),occurrences:[{reference:s.verseRef,text:s.verse}]};o.push(i)}}),o},_t=(e,t)=>e[t]??t;function xc({inventoryItems:e,setVerseRef:t,localizedStrings:n,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1}){const f=_t(n,"%webView_inventory_all%"),h=_t(n,"%webView_inventory_approved%"),u=_t(n,"%webView_inventory_unapproved%"),g=_t(n,"%webView_inventory_unknown%"),v=_t(n,"%webView_inventory_scope_currentBook%"),_=_t(n,"%webView_inventory_scope_chapter%"),S=_t(n,"%webView_inventory_scope_verse%"),C=_t(n,"%webView_inventory_filter_text%"),N=_t(n,"%webView_inventory_show_additional_items%"),E=_t(n,"%webView_inventory_no_results%"),[O,M]=l.useState(!1),[T,D]=l.useState("all"),[j,R]=l.useState(""),[L,$]=l.useState([]),z=l.useMemo(()=>{const V=e??[];return V.length===0?[]:gc(V,s,a)},[e,s,a]),A=l.useMemo(()=>{if(O)return z;const V=[];return z.forEach(Y=>{const at=Y.items[0],ot=V.find(bt=>bt.items[0]===at);ot?(ot.count+=Y.count,ot.occurrences=ot.occurrences.concat(Y.occurrences)):V.push({items:[at],count:Y.count,occurrences:Y.occurrences,status:Y.status})}),V},[O,z]),U=l.useMemo(()=>A.length===0?[]:fc(A,T,j),[A,T,j]),I=l.useMemo(()=>{var at,ot;if(!O)return d;const V=(at=o==null?void 0:o.tableHeaders)==null?void 0:at.length;if(!V)return d;const Y=[];for(let bt=0;bt<V;bt++)Y.push(cc(((ot=o==null?void 0:o.tableHeaders)==null?void 0:ot[bt])||"Additional Item",bt+1));return[...Y,...d]},[o==null?void 0:o.tableHeaders,d,O]);l.useEffect(()=>{U.length===0?$([]):U.length===1&&$(U[0].items)},[U]);const Q=(V,Y)=>{Y.setRowSelection(()=>{const at={};return at[V.index]=!0,at}),$(V.original.items)},xt=V=>{if(V==="book"||V==="chapter"||V==="verse")c(V);else throw new Error(`Invalid scope value: ${V}`)},vt=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")D(V);else throw new Error(`Invalid status filter value: ${V}`)},mt=l.useMemo(()=>{if(A.length===0||L.length===0)return[];const V=A.filter(Y=>y.deepEqual(O?Y.items:[Y.items[0]],L));if(V.length>1)throw new Error("Selected item is not unique");return V.length===0?[]:V[0].occurrences},[L,O,A]);return r.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[r.jsxs("div",{className:"tw-flex tw-items-stretch",children:[r.jsxs(de,{onValueChange:V=>vt(V),defaultValue:T,children:[r.jsx(qt,{className:"tw-m-1",children:r.jsx(pe,{placeholder:"Select filter"})}),r.jsxs(Yt,{children:[r.jsx(gt,{value:"all",children:f}),r.jsx(gt,{value:"approved",children:h}),r.jsx(gt,{value:"unapproved",children:u}),r.jsx(gt,{value:"unknown",children:g})]})]}),r.jsxs(de,{onValueChange:V=>xt(V),defaultValue:i,children:[r.jsx(qt,{className:"tw-m-1",children:r.jsx(pe,{placeholder:"Select scope"})}),r.jsxs(Yt,{children:[r.jsx(gt,{value:"book",children:v}),r.jsx(gt,{value:"chapter",children:_}),r.jsx(gt,{value:"verse",children:S})]})]}),r.jsx(he,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:C,value:j,onChange:V=>{R(V.target.value)}}),o&&r.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[r.jsx(mn,{className:"tw-m-1",checked:O,onCheckedChange:V=>{M(V)}}),r.jsx(et,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??N})]})]}),r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(is,{columns:I,data:U,onRowClickHandler:Q,stickyHeader:!0,isLoading:p,noResultsMessage:E})}),mt.length>0&&r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(ic,{occurrenceData:mt,setScriptureReference:t,localizedStrings:n})})]})}const bc="16rem",vc="3rem",hs=l.createContext(void 0);function Xe(){const e=l.useContext(hs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const wr=l.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:o,style:s,children:a,side:i="primary",...c},d)=>{const[w,p]=l.useState(e),f=t??w,h=l.useCallback(N=>{const E=typeof N=="function"?N(f):N;n?n(E):p(E)},[n,f]),u=l.useCallback(()=>h(N=>!N),[h]),g=f?"expanded":"collapsed",S=rt()==="ltr"?i:i==="primary"?"secondary":"primary",C=l.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:u,side:S}),[g,f,h,u,S]);return r.jsx(hs.Provider,{value:C,children:r.jsx(Tt,{delayDuration:0,children:r.jsx("div",{style:{"--sidebar-width":bc,"--sidebar-width-icon":vc,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});wr.displayName="SidebarProvider";const dr=l.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:o,...s},a)=>{const i=Xe();return t==="none"?r.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:a,...s,children:o}):r.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[r.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),r.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...s,children:r.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});dr.displayName="Sidebar";const fs=l.forwardRef(({className:e,onClick:t,...n},o)=>{const s=Xe();return r.jsxs(P,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",e),onClick:a=>{t==null||t(a),s.toggleSidebar()},...n,children:[s.side==="primary"?r.jsx(k.PanelLeft,{}):r.jsx(k.PanelRight,{}),r.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});fs.displayName="SidebarTrigger";const gs=l.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:o}=Xe();return r.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});gs.displayName="SidebarRail";const pr=l.forwardRef(({className:e,...t},n)=>r.jsx("main",{ref:n,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));pr.displayName="SidebarInset";const xs=l.forwardRef(({className:e,...t},n)=>r.jsx(he,{ref:n,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));xs.displayName="SidebarInput";const bs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));bs.displayName="SidebarHeader";const vs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));vs.displayName="SidebarFooter";const ys=l.forwardRef(({className:e,...t},n)=>r.jsx(we,{ref:n,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));ys.displayName="SidebarSeparator";const ur=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));ur.displayName="SidebarContent";const nn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));nn.displayName="SidebarGroup";const rn=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?ke.Slot:"div";return r.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});rn.displayName="SidebarGroupLabel";const Ns=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?ke.Slot:"button";return r.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});Ns.displayName="SidebarGroupAction";const on=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",e),...t}));on.displayName="SidebarGroupContent";const mr=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));mr.displayName="SidebarMenu";const hr=l.forwardRef(({className:e,...t},n)=>r.jsx("li",{ref:n,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",e),...t}));hr.displayName="SidebarMenuItem";const yc=Jt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),fr=l.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:o="default",tooltip:s,className:a,...i},c)=>{const d=e?ke.Slot:"button",{state:w}=Xe(),p=r.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:m(yc({variant:n,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:p}),r.jsx(Rt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});fr.displayName="SidebarMenuButton";const js=l.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...o},s)=>{const a=t?ke.Slot:"button";return r.jsx(a,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});js.displayName="SidebarMenuAction";const ks=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));ks.displayName="SidebarMenuBadge";const _s=l.forwardRef(({className:e,showIcon:t=!1,...n},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return r.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&r.jsx(en,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),r.jsx(en,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});_s.displayName="SidebarMenuSkeleton";const Cs=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Cs.displayName="SidebarMenuSub";const Ss=l.forwardRef(({...e},t)=>r.jsx("li",{ref:t,...e}));Ss.displayName="SidebarMenuSubItem";const Es=l.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:o,...s},a)=>{const i=e?ke.Slot:"a";return r.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Es.displayName="SidebarMenuSubButton";function Ts({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:d}){const w=l.useCallback((h,u)=>{o(h,u)},[o]),p=l.useCallback(h=>{const u=n.find(g=>g.projectId===h);return u?u.projectName:h},[n]),f=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return r.jsx(dr,{id:e,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:r.jsxs(ur,{children:[r.jsxs(nn,{children:[r.jsx(rn,{className:"tw-text-sm",children:a}),r.jsx(on,{children:r.jsx(mr,{children:Object.entries(t).map(([h,u])=>r.jsx(hr,{children:r.jsx(fr,{onClick:()=>w(h),isActive:f(h),children:r.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),r.jsxs(nn,{children:[r.jsx(rn,{className:"tw-text-sm",children:i}),r.jsx(on,{className:"tw-pl-3",children:r.jsx(tn,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);w(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:r.jsx(k.ScrollText,{})})})]})]})})}const fn=l.forwardRef(({value:e,onSearch:t,placeholder:n,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const d=rt();return r.jsxs("div",{id:i,className:m("tw-relative",{"tw-w-full":o},s),children:[r.jsx(k.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),r.jsx(he,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:w=>t(w.target.value),disabled:a}),e&&r.jsxs(P,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{t("")},children:[r.jsx(k.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});fn.displayName="SearchBar";function Nc({id:e,extensionLabels:t,projectInfo:n,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return r.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[r.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:r.jsx(fn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),r.jsxs(wr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[r.jsx(Ts,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:n,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),r.jsx(pr,{className:"tw-min-w-[215px]",children:o})]})]})}const Ft="scrBook",jc="scrRef",ae="source",kc="details",_c="Scripture Reference",Cc="Scripture Book",Rs="Type",Sc="Details";function Ec(e,t){const n=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Ft,header:(e==null?void 0:e.scriptureReferenceColumnName)??_c,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?H.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Ft?y.formatScrRef(s.start):void 0},getGroupingValue:o=>H.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:jc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ae,header:n?(e==null?void 0:e.typeColumnName)??Rs:void 0,cell:o=>n||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:kc,header:(e==null?void 0:e.detailsColumnName)??Sc,cell:o=>o.getValue(),enableGrouping:!1}]}const Tc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||y.compareScrRefs(e.start,e.end)===0?`${y.scrRefToBBBCCCVVV(e.start)}+${t}`:`${y.scrRefToBBBCCCVVV(e.start)}+${t}-${y.scrRefToBBBCCCVVV(e.end)}+${n}`},Gr=e=>`${Tc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Rc({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:d}){const[w,p]=l.useState([]),[f,h]=l.useState([{id:Ft,desc:!1}]),[u,g]=l.useState({}),v=l.useMemo(()=>e.flatMap(j=>j.data.map(R=>({...R,source:j.source}))),[e]),_=l.useMemo(()=>Ec({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},n),[o,a,i,n]);l.useEffect(()=>{w.includes(ae)?h([{id:ae,desc:!1},{id:Ft,desc:!1}]):h([{id:Ft,desc:!1}])},[w]);const S=ct.useReactTable({data:v,columns:_,state:{grouping:w,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ct.getExpandedRowModel(),getGroupedRowModel:ct.getGroupedRowModel(),getCoreRowModel:ct.getCoreRowModel(),getSortedRowModel:ct.getSortedRowModel(),getRowId:Gr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const j=S.getSelectedRowModel().rowsById,R=Object.keys(j);if(R.length===1){const L=v.find($=>Gr($)===R[0])||void 0;L&&c(L)}}},[u,v,c,S]);const C=s??Cc,N=a??Rs,E=[{label:"No Grouping",value:[]},{label:`Group by ${C}`,value:[Ft]},{label:`Group by ${N}`,value:[ae]},{label:`Group by ${C} and ${N}`,value:[Ft,ae]},{label:`Group by ${N} and ${C}`,value:[ae,Ft]}],O=j=>{p(JSON.parse(j))},M=(j,R)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(R)},T=(j,R)=>j.getIsGrouped()?"":m("banded-row",R%2===0?"even":"odd"),D=(j,R,L)=>{if(!((j==null?void 0:j.length)===0||R.depth<L.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return r.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&r.jsxs(de,{value:JSON.stringify(w),onValueChange:j=>{O(j)},children:[r.jsx(qt,{className:"tw-mb-1 tw-mt-2",children:r.jsx(pe,{})}),r.jsx(Yt,{position:"item-aligned",children:r.jsx(es,{children:E.map(j=>r.jsx(gt,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),r.jsxs(Ge,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&r.jsx(Ke,{children:S.getHeaderGroups().map(j=>r.jsx(Et,{children:j.headers.filter(R=>R.column.columnDef.header).map(R=>r.jsx(je,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:r.jsxs("div",{children:[R.column.getCanGroup()?r.jsx(P,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ct.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},j.id))}),r.jsx(He,{children:S.getRowModel().rows.map((j,R)=>{const L=rt();return r.jsx(Et,{"data-state":j.getIsSelected()?"selected":"",className:m(T(j,R)),onClick:$=>M(j,$),children:j.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==ae||!n)))return r.jsx(Ht,{className:m($.column.columnDef.id,"tw-p-[1px]",D(w,j,$)),children:$.getIsGrouped()?r.jsxs(P,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&r.jsx(k.ChevronDown,{}),!j.getIsExpanded()&&(L==="ltr"?r.jsx(k.ChevronRight,{}):r.jsx(k.ChevronLeft,{}))," ",ct.flexRender($.column.columnDef.cell,$.getContext())," (",j.subRows.length,")"]}):ct.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},j.id)})})]})]})}const gr=(e,t)=>e.filter(n=>{try{return y.getSectionForBook(n)===t}catch{return!1}}),Ms=(e,t,n)=>gr(e,t).every(o=>n.includes(o));function Mc({section:e,availableBookIds:t,selectedBookIds:n,onToggle:o,localizedStrings:s}){const a=gr(t,e).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return r.jsx(P,{variant:"outline",size:"sm",onClick:()=>o(e),className:m(Ms(t,e,n)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:ii(e,i,c,d,w)})}const Kr=5,Tn=6;function Dc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:n,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[_,S]=l.useState(!1),[C,N]=l.useState(""),E=l.useRef(void 0),O=l.useRef(!1);if(e.length!==H.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const M=l.useMemo(()=>H.allBookIds.filter((A,U)=>e[U]==="1"&&!H.isObsolete(H.bookIdToNumber(A))),[e]),T=l.useMemo(()=>{if(!C.trim()){const I={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return M.forEach(Q=>{const xt=y.getSectionForBook(Q);I[xt].push(Q)}),I}const A=M.filter(I=>Un(I,C,s)),U={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return A.forEach(I=>{const Q=y.getSectionForBook(I);U[Q].push(I)}),U},[M,C,s]),D=l.useCallback((A,U=!1)=>{if(!U||!E.current){n(t.includes(A)?t.filter(V=>V!==A):[...t,A]),E.current=A;return}const I=M.findIndex(V=>V===E.current),Q=M.findIndex(V=>V===A);if(I===-1||Q===-1)return;const[xt,vt]=[Math.min(I,Q),Math.max(I,Q)],mt=M.slice(xt,vt+1).map(V=>V);n(t.includes(A)?t.filter(V=>!mt.includes(V)):[...new Set([...t,...mt])])},[t,n,M]),j=A=>{D(A,O.current),O.current=!1},R=(A,U)=>{A.preventDefault(),D(U,A.shiftKey)},L=l.useCallback(A=>{const U=gr(M,A).map(I=>I);n(Ms(M,A,t)?t.filter(I=>!U.includes(I)):[...new Set([...t,...U])])},[t,n,M]),$=()=>{n(M.map(A=>A))},z=()=>{n([])};return r.jsxs("div",{className:"tw-space-y-2",children:[r.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(A=>r.jsx(Mc,{section:A,availableBookIds:M,selectedBookIds:t,onToggle:L,localizedStrings:o},A))}),r.jsxs(Qt,{open:_,onOpenChange:A=>{S(A),A||N("")},children:[r.jsx(te,{asChild:!0,children:r.jsxs(P,{variant:"outline",role:"combobox","aria-expanded":_,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${a}: ${t.length}`:i,r.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(Vt,{className:"tw-w-full tw-p-0",align:"start",children:r.jsxs(Wt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(O.current=A.shiftKey)},children:[r.jsx(Ce,{placeholder:c,value:C,onValueChange:N}),r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx(P,{variant:"ghost",size:"sm",onClick:$,children:d}),r.jsx(P,{variant:"ghost",size:"sm",onClick:z,children:w})]}),r.jsxs(Zt,{children:[r.jsx(Fe,{children:p}),Object.values(y.Section).map((A,U)=>{const I=T[A];if(I.length!==0)return r.jsxs(l.Fragment,{children:[r.jsx(At,{heading:wo(A,h,u,g,v),children:I.map(Q=>r.jsx(uo,{bookId:Q,isSelected:t.includes(Q),onSelect:()=>j(Q),onMouseDown:xt=>R(xt,Q),section:y.getSectionForBook(Q),showCheck:!0,localizedBookNames:s,commandValue:Ln(Q,s),className:"tw-flex tw-items-center"},Q))}),U<Object.values(y.Section).length-1&&r.jsx(ro,{})]},A)})]})]})})]}),t.length>0&&r.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===Tn?Tn:Kr).map(A=>r.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:be(A,s)},A)),t.length>Tn&&r.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Kr} ${f}`})]})]})}const Ic=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),re=(e,t)=>e[t]??t;function Oc({scope:e,availableScopes:t,onScopeChange:n,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:d}){const w=re(i,"%webView_scope_selector_selected_text%"),p=re(i,"%webView_scope_selector_current_verse%"),f=re(i,"%webView_scope_selector_current_chapter%"),h=re(i,"%webView_scope_selector_current_book%"),u=re(i,"%webView_scope_selector_choose_books%"),g=re(i,"%webView_scope_selector_scope%"),v=re(i,"%webView_scope_selector_select_books%"),_=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],S=t?_.filter(C=>t.includes(C.value)):_;return r.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(et,{children:g}),r.jsx(cn,{value:e,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:S.map(({value:C,label:N,id:E})=>r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ve,{className:"tw-me-2",value:C,id:E}),r.jsx(et,{htmlFor:E,children:N})]},E))})]}),e==="selectedBooks"&&r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(et,{children:v}),r.jsx(Dc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const Rn={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Ac({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...Rn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Rn?Rn[w]:p]))},d=rt();return r.jsxs(de,{value:`${t}`,onValueChange:w=>n(w==="undefined"?void 0:parseInt(w,10)),children:[r.jsx(qt,{size:s,className:m("pr-twp tw-w-auto",a),children:r.jsx(pe,{placeholder:c[y.getLocalizeKeyForScrollGroupId(t)]??t})}),r.jsx(Yt,{id:i,align:d==="rtl"?"end":"start",style:{zIndex:250},children:e.map(w=>r.jsx(gt,{value:`${w}`,children:c[y.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Lc({children:e}){return r.jsx("div",{className:"pr-twp tw-grid",children:e})}function Vc({primary:e,secondary:t,children:n,isLoading:o=!1,loadingMessage:s}){return r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),r.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):r.jsx("div",{children:n})]})}function Pc({primary:e,secondary:t,includeSeparator:n=!1}){return r.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?r.jsx(we,{}):""]})}function Ds(e,t){var n;return(n=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:n[0]}function sn({icon:e,menuLabel:t,leading:n}){return e?r.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`}):void 0}const Is=(e,t,n,o)=>n?Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>t.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:"command"in c?r.jsxs($e,{onClick:()=>{o(c)},children:[c.iconPathBefore&&r.jsx(sn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&r.jsx(sn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):r.jsxs(Zo,{children:[r.jsx(or,{children:c.label}),r.jsx(Wo,{children:r.jsx(sr,{children:Is(e,t,Ds(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&r.jsx(Rt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function an({onSelectMenuItem:e,menuData:t,tabLabel:n,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return r.jsxs(ee,{variant:a,children:[r.jsx(ue,{"aria-label":n,className:s,asChild:!0,id:c,children:r.jsx(P,{variant:i,size:"icon",children:o??r.jsx(k.MenuIcon,{})})}),r.jsx($t,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>r.jsxs(l.Fragment,{children:[r.jsx(rr,{children:r.jsx(Tt,{children:Is(t.groups,t.items,d,e)})}),w<p.length-1&&r.jsx(me,{})]},d))})]})}const Os=l.forwardRef(({id:e,className:t,children:n},o)=>r.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:n}));function $c({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:n,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return r.jsxs(Os,{className:`tw-w-full tw-border ${a}`,id:s,children:[n&&r.jsx(an,{onSelectMenuItem:e,menuData:n,tabLabel:"Project",icon:w??r.jsx(k.Menu,{}),buttonVariant:"ghost"}),i&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),r.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&r.jsx(an,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:r.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function Bc({onSelectProjectMenuItem:e,projectMenuData:t,id:n,className:o,menuButtonIcon:s}){return r.jsx(Os,{className:"tw-pointer-events-none",id:n,children:t&&r.jsx(an,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const xr=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsx(ut.Root,{orientation:"vertical",ref:n,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});xr.displayName=ut.List.displayName;const br=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.List,{ref:n,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));br.displayName=ut.List.displayName;const As=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Trigger,{ref:n,...t,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),vr=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Content,{ref:n,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));vr.displayName=ut.Content.displayName;function zc({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return r.jsxs("div",{id:i,className:"pr-twp",children:[r.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?r.jsx("h1",{children:s}):"",r.jsx(fn,{className:a,value:t,onSearch:n,placeholder:o})]}),r.jsxs(xr,{children:[r.jsx(br,{children:e.map(c=>r.jsx(As,{value:c.value,children:c.value},c.key))}),e.map(c=>r.jsx(vr,{value:c.value,children:c.content},c.key))]})]})}function Fc({...e}){return r.jsx(W.Menu,{...e})}function Gc({...e}){return r.jsx(W.Sub,{"data-slot":"menubar-sub",...e})}const Ls=l.forwardRef(({className:e,variant:t="default",...n},o)=>{const s=l.useMemo(()=>({variant:t}),[t]);return r.jsx(nr.Provider,{value:s,children:r.jsx(W.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...n})})});Ls.displayName=W.Root.displayName;const Vs=l.forwardRef(({className:e,...t},n)=>{const o=kt();return r.jsx(W.Trigger,{ref:n,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Pt({variant:o.variant,className:e})),...t})});Vs.displayName=W.Trigger.displayName;const Ps=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=kt();return r.jsxs(W.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",Pt({variant:a.variant,className:e}),e),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ps.displayName=W.SubTrigger.displayName;const $s=l.forwardRef(({className:e,...t},n)=>{const o=kt();return r.jsx(W.SubContent,{ref:n,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});$s.displayName=W.SubContent.displayName;const Bs=l.forwardRef(({className:e,align:t="start",alignOffset:n=-4,sideOffset:o=8,...s},a)=>{const i=kt();return r.jsx(W.Portal,{children:r.jsx(W.Content,{ref:a,align:t,alignOffset:n,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...s})})});Bs.displayName=W.Content.displayName;const zs=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=kt();return r.jsx(W.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",Pt({variant:s.variant,className:e}),e),...n})});zs.displayName=W.Item.displayName;const Kc=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=kt();return r.jsxs(W.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Pt({variant:a.variant,className:e}),e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Kc.displayName=W.CheckboxItem.displayName;const Hc=l.forwardRef(({className:e,children:t,...n},o)=>{const s=kt();return r.jsxs(W.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Pt({variant:s.variant,className:e}),e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Hc.displayName=W.RadioItem.displayName;const Xc=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(W.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Xc.displayName=W.Label.displayName;const Fs=l.forwardRef(({className:e,...t},n)=>r.jsx(W.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Fs.displayName=W.Separator.displayName;const De=(e,t)=>{setTimeout(()=>{t.forEach(n=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},Gs=(e,t,n,o)=>{if(!n)return;const s=Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=t.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>r.jsxs(It,{children:[r.jsx(Gt,{asChild:!0,children:"command"in w?r.jsxs(zs,{onClick:()=>{o(w)},children:[w.iconPathBefore&&r.jsx(sn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&r.jsx(sn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):r.jsxs(Gc,{children:[r.jsx(Ps,{children:w.label}),r.jsx($s,{children:Gs(e,t,Ds(e,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&r.jsx(Rt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&i<s.length-1&&d.push(r.jsx(Fs,{},`separator-${a}`)),d})};function Uc({menuData:e,onSelectMenuItem:t,onOpenChange:n,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),d=l.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return d;default:return}};if(Pa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,v,_,S;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":De(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),De(a,[h,u]);break;case"alt+l":(v=i.current)==null||v.focus(),De(i,[h,u]);break;case"alt+n":(_=c.current)==null||_.focus(),De(c,[h,u]);break;case"alt+h":(S=d.current)==null||S.focus(),De(d,[h,u]);break}}),l.useEffect(()=>{if(!n||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");n(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[n]),!!e)return r.jsx(Ls,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>r.jsxs(Fc,{children:[r.jsx(Vs,{ref:w(p),children:typeof f=="object"&&"label"in f&&f.label}),r.jsx(Bs,{className:"tw-z-[250]",children:r.jsx(Tt,{children:Gs(e.groups,e.items,p,t)})})]},p))})}function qc(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Yc({menuData:e,onOpenChange:t,onSelectMenuItem:n,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=l.useRef(void 0);return r.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:r.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[r.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[i,e&&r.jsx(Uc,{menuData:e,onOpenChange:t,onSelectMenuItem:n,variant:w})]})}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),r.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:r.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Jc=(e,t)=>e[t]??t;function Wc({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:d}){const w=Jc(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...n.filter(v=>v!==g)]),a&&n.find(v=>v===g)&&a([...n.filter(v=>v!==g)]),f(!1)},u=(g,v)=>{var S,C,N,E,O,M;const _=v!==g?((C=(S=e[g])==null?void 0:S.uiNames)==null?void 0:C[v])??((E=(N=e[g])==null?void 0:N.uiNames)==null?void 0:E.en):void 0;return _?`${(O=e[g])==null?void 0:O.autonym} (${_})`:(M=e[g])==null?void 0:M.autonym};return r.jsxs("div",{id:d,className:m("pr-twp tw-max-w-sm",c),children:[r.jsxs(de,{name:"uiLanguage",value:t,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[r.jsx(qt,{children:r.jsx(pe,{})}),r.jsx(Yt,{className:"tw-z-[250]",children:Object.keys(e).map(g=>r.jsx(gt,{value:g,children:u(g,t)},g))})]}),t!=="en"&&r.jsx("div",{className:"tw-pt-3",children:r.jsx(et,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(w,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function Zc({item:e,createLabel:t,createComplexLabel:n}){return t?r.jsx(et,{children:t(e)}):n?r.jsx(et,{children:n(e)}):r.jsx(et,{children:e})}function Qc({id:e,className:t,listItems:n,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return r.jsx("div",{id:e,className:t,children:n.map(c=>r.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[r.jsx(mn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),r.jsx(Zc,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function Ks(e,t){var o;const n=(o=t==null?void 0:t.localizedBookNames)==null?void 0:o.get(e.book);return typeof n=="object"&&n!==void 0&&"localizedId"in n?n==null?void 0:n.localizedId:n}function tw(e,t){return y.formatScrRef(e,Ks(e,t),t==null?void 0:t.chapterVerseSeparator,t==null?void 0:t.bookChapterSeparator)}function ew(e,t,n){return y.formatScrRef(e,Ks(e,n),n==null?void 0:n.chapterVerseSeparator,n==null?void 0:n.bookChapterSeparator)}function Hr(e,t){if(e)return r.jsx("span",{className:m("tw-h-fit tw-truncate tw-whitespace-normal tw-text-start tw-text-xs tw-font-medium",t),children:e??""})}function nw({startRef:e,endRef:t,scriptureTextPart:n,className:o,onClick:s,scrRefFormattingProps:a,includeInLink:i="onlyScrRef"}){return r.jsxs("div",{className:m("tw-overflow-hidden tw-truncate tw-p-1 tw-text-start tw-leading-none"),children:[r.jsxs(P,{variant:"link","aria-label":"Submit reference change",onClick:s,className:m("tw-me-2 tw-inline tw-h-4 tw-p-0 tw-text-start",o),children:[r.jsx("span",{className:m({"tw-me-2":i==="allText"}),children:t?ew(e,t,a):tw(e,a)}),i==="allText"&&Hr(n,o)]}),i==="onlyScrRef"&&Hr(n,o)]})}function rw({cardKey:e,isSelected:t,onSelect:n,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:d,accentColor:w,onDoubleClick:p,linkedScrRef:f,badges:h}){const u=l.useRef(void 0),g=v=>{document.activeElement===(u==null?void 0:u.current)&&(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),n==null||n())};return r.jsxs("div",{hidden:s,onClick:n,onMouseDown:v=>{v.detail>1&&v.preventDefault()},onDoubleClick:p,onKeyDown:g,ref:u,role:"button",tabIndex:0,"aria-pressed":t,className:m("tw-relative tw-min-w-36 tw-cursor-default tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-muted":t},{"tw-bg-transparent":!t},a),children:[r.jsxs("div",{className:m("tw-flex tw-flex-col tw-px-4 tw-py-3",{"tw-pb-4":t}),children:[r.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[r.jsxs("div",{className:m("tw-flex tw-max-w-[calc(100%-0.5rem)] tw-flex-wrap tw-items-baseline tw-gap-x-2",{"tw-w-[calc(100%-3rem)]":t&&c}),children:[r.jsx(nw,{startRef:f==null?void 0:f.startRef,endRef:f==null?void 0:f.endRef,scriptureTextPart:f.scriptureTextPart,onClick:v=>{v==null||v.stopPropagation(),n(),p==null||p()},className:"tw-whitespace-normal tw-rounded-sm tw-text-xs tw-font-medium"}),h&&r.jsx("div",{className:"tw-flex tw-gap-2 tw-whitespace-normal tw-break-words",children:h}),i&&r.jsx("div",{className:m("tw-ms-1 tw-overflow-hidden tw-text-ellipsis tw-py-1 tw-text-xs tw-text-muted-foreground",{"tw-break-words":t}),children:i})]}),t&&c&&r.jsx("div",{className:"tw-p-1",children:r.jsxs(ee,{children:[r.jsx(ue,{className:w,asChild:!0,children:r.jsx(P,{className:"tw-h-6 tw-w-8",variant:"ghost",size:"icon",children:r.jsx(k.MoreHorizontal,{})})}),r.jsx($t,{align:"end",children:c})]})})]}),t&&d&&r.jsx("div",{className:"tw-ms-1 tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden tw-break-words",children:d})]}),w&&r.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},e)}const Hs=l.forwardRef(({className:e,...t},n)=>r.jsx(k.LoaderCircle,{size:35,className:m("tw-animate-spin",e),...t,ref:n}));Hs.displayName="Spinner";function ow({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}){return r.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[r.jsx(et,{htmlFor:e,className:m({"tw-text-red-600":n,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),r.jsx(he,{id:e,disabled:t,placeholder:i,required:c,className:m(d,{"tw-border-red-600":n}),defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}),r.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const sw=Jt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Xs=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,role:"alert",className:m("pr-twp",sw({variant:t}),e),...n}));Xs.displayName="Alert";const Us=l.forwardRef(({className:e,...t},n)=>r.jsxs("h5",{ref:n,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Us.displayName="AlertTitle";const qs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));qs.displayName="AlertDescription";const aw=Z.Root,iw=Z.Trigger,lw=Z.Group,cw=Z.Portal,ww=Z.Sub,dw=Z.RadioGroup,Ys=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>r.jsxs(Z.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[n,r.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ys.displayName=Z.SubTrigger.displayName;const Js=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.SubContent,{ref:n,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Js.displayName=Z.SubContent.displayName;const Ws=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.Portal,{children:r.jsx(Z.Content,{ref:n,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));Ws.displayName=Z.Content.displayName;const Zs=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(Z.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));Zs.displayName=Z.Item.displayName;const Qs=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>r.jsxs(Z.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Z.ItemIndicator,{children:r.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));Qs.displayName=Z.CheckboxItem.displayName;const ta=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(Z.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Z.ItemIndicator,{children:r.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));ta.displayName=Z.RadioItem.displayName;const ea=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(Z.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...n}));ea.displayName=Z.Label.displayName;const na=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));na.displayName=Z.Separator.displayName;function ra({className:e,...t}){return r.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}ra.displayName="ContextMenuShortcut";const oa=l.createContext({direction:"bottom"});function sa({shouldScaleBackground:e=!0,direction:t="bottom",...n}){const o=l.useMemo(()=>({direction:t}),[t]);return r.jsx(oa.Provider,{value:o,children:r.jsx(jt.Drawer.Root,{shouldScaleBackground:e,direction:t,...n})})}sa.displayName="Drawer";const pw=jt.Drawer.Trigger,aa=jt.Drawer.Portal,uw=jt.Drawer.Close,yr=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Overlay,{ref:n,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));yr.displayName=jt.Drawer.Overlay.displayName;const ia=l.forwardRef(({className:e,children:t,hideDrawerHandle:n=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(oa),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return r.jsxs(aa,{children:[r.jsx(yr,{}),r.jsxs(jt.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],e),...o,children:[!n&&(a==="bottom"||a==="right")&&r.jsx("div",{className:c[a]}),r.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!n&&(a==="top"||a==="left")&&r.jsx("div",{className:c[a]})]})]})});ia.displayName="DrawerContent";function la({className:e,...t}){return r.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}la.displayName="DrawerHeader";function ca({className:e,...t}){return r.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}ca.displayName="DrawerFooter";const wa=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Title,{ref:n,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));wa.displayName=jt.Drawer.Title.displayName;const da=l.forwardRef(({className:e,...t},n)=>r.jsx(jt.Drawer.Description,{ref:n,className:m("tw-text-sm tw-text-muted-foreground",e),...t}));da.displayName=jt.Drawer.Description.displayName;const pa=l.forwardRef(({className:e,value:t,...n},o)=>r.jsx(On.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...n,children:r.jsx(On.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));pa.displayName=On.Root.displayName;function mw({className:e,...t}){return r.jsx(Fn.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const hw=Fn.Panel;function fw({withHandle:e,className:t,...n}){return r.jsx(Fn.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...n,children:e&&r.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:r.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function gw({...e}){return r.jsx(Yr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const ua=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsxs(Ie.Root,{ref:n,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[r.jsx(Ie.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:r.jsx(Ie.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),r.jsx(Ie.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ua.displayName=Ie.Root.displayName;const ma=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsx(An.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:r.jsx(An.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ma.displayName=An.Root.displayName;const xw=ut.Root,ha=l.forwardRef(({className:e,...t},n)=>{const o=rt();return r.jsx(ut.List,{ref:n,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});ha.displayName=ut.List.displayName;const fa=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Trigger,{ref:n,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));fa.displayName=ut.Trigger.displayName;const ga=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Content,{ref:n,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));ga.displayName=ut.Content.displayName;const xa=l.forwardRef(({className:e,...t},n)=>r.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:n,...t}));xa.displayName="Textarea";const bw=(e,t)=>{l.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])};function vw(e){return{preserveValue:!0,...e}}const ba=(e,t,n={})=>{const o=l.useRef(t);o.current=t;const s=l.useRef(n);s.current=vw(s.current);const[a,i]=l.useState(()=>o.current),[c,d]=l.useState(!0);return l.useEffect(()=>{let w=!0;return d(!!e),(async()=>{if(e){const p=await e();w&&(i(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||i(()=>o.current)}},[e]),[a,c]},Mn=()=>!1,yw=(e,t)=>{const[n]=ba(l.useCallback(async()=>{if(!e)return Mn;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),Mn,{preserveValue:!1});l.useEffect(()=>()=>{n!==Mn&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Yr.toast});exports.Alert=Xs;exports.AlertDescription=qs;exports.AlertTitle=Us;exports.Avatar=tr;exports.AvatarFallback=er;exports.AvatarImage=Jo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=mi;exports.BOOK_SELECTOR_STRING_KEYS=gi;exports.Badge=ce;exports.BookChapterControl=ui;exports.BookSelectionMode=go;exports.BookSelector=xi;exports.Button=P;exports.COMMENT_LIST_STRING_KEYS=bi;exports.Card=un;exports.CardContent=Qn;exports.CardDescription=qo;exports.CardFooter=Yo;exports.CardHeader=Xo;exports.CardTitle=Uo;exports.ChapterRangeSelector=fo;exports.Checkbox=mn;exports.Checklist=Qc;exports.ComboBox=tn;exports.Command=Wt;exports.CommandEmpty=Fe;exports.CommandGroup=At;exports.CommandInput=Ce;exports.CommandItem=Lt;exports.CommandList=Zt;exports.CommentList=Il;exports.ContextMenu=aw;exports.ContextMenuCheckboxItem=Qs;exports.ContextMenuContent=Ws;exports.ContextMenuGroup=lw;exports.ContextMenuItem=Zs;exports.ContextMenuLabel=ea;exports.ContextMenuPortal=cw;exports.ContextMenuRadioGroup=dw;exports.ContextMenuRadioItem=ta;exports.ContextMenuSeparator=na;exports.ContextMenuShortcut=ra;exports.ContextMenuSub=ww;exports.ContextMenuSubContent=Js;exports.ContextMenuSubTrigger=Ys;exports.ContextMenuTrigger=iw;exports.DataTable=is;exports.Drawer=sa;exports.DrawerClose=uw;exports.DrawerContent=ia;exports.DrawerDescription=da;exports.DrawerFooter=ca;exports.DrawerHeader=la;exports.DrawerOverlay=yr;exports.DrawerPortal=aa;exports.DrawerTitle=wa;exports.DrawerTrigger=pw;exports.DropdownMenu=ee;exports.DropdownMenuCheckboxItem=Ot;exports.DropdownMenuContent=$t;exports.DropdownMenuGroup=rr;exports.DropdownMenuItem=$e;exports.DropdownMenuItemType=ws;exports.DropdownMenuLabel=Ee;exports.DropdownMenuPortal=Wo;exports.DropdownMenuRadioGroup=Qo;exports.DropdownMenuRadioItem=ar;exports.DropdownMenuSeparator=me;exports.DropdownMenuShortcut=ts;exports.DropdownMenuSub=Zo;exports.DropdownMenuSubContent=sr;exports.DropdownMenuSubTrigger=or;exports.DropdownMenuTrigger=ue;exports.ERROR_DUMP_STRING_KEYS=ls;exports.ERROR_POPOVER_STRING_KEYS=zl;exports.ErrorDump=cs;exports.ErrorPopover=Fl;exports.FOOTNOTE_EDITOR_STRING_KEYS=tc;exports.FOOTNOTE_LIST_STRING_KEYS=rc;exports.Filter=Ul;exports.FilterDropdown=Gl;exports.Footer=Xl;exports.FootnoteEditor=Ql;exports.FootnoteItem=us;exports.FootnoteList=sc;exports.INVENTORY_STRING_KEYS=hc;exports.Input=he;exports.Inventory=xc;exports.Label=et;exports.MarkdownRenderer=Bl;exports.MoreInfo=Kl;exports.MultiSelectComboBox=ds;exports.NavigationContentSearch=zc;exports.Popover=Qt;exports.PopoverAnchor=li;exports.PopoverContent=Vt;exports.PopoverTrigger=te;exports.Progress=pa;exports.RadioGroup=cn;exports.RadioGroupItem=Ve;exports.RecentSearches=ho;exports.ResizableHandle=fw;exports.ResizablePanel=hw;exports.ResizablePanelGroup=mw;exports.ResultsCard=rw;exports.SCOPE_SELECTOR_STRING_KEYS=Ic;exports.ScopeSelector=Oc;exports.ScriptureResultsViewer=Rc;exports.ScrollGroupSelector=Ac;exports.SearchBar=fn;exports.Select=de;exports.SelectContent=Yt;exports.SelectGroup=es;exports.SelectItem=gt;exports.SelectLabel=rs;exports.SelectScrollDownButton=lr;exports.SelectScrollUpButton=ir;exports.SelectSeparator=os;exports.SelectTrigger=qt;exports.SelectValue=pe;exports.Separator=we;exports.SettingsList=Lc;exports.SettingsListHeader=Pc;exports.SettingsListItem=Vc;exports.SettingsSidebar=Ts;exports.SettingsSidebarContentSearch=Nc;exports.Sidebar=dr;exports.SidebarContent=ur;exports.SidebarFooter=vs;exports.SidebarGroup=nn;exports.SidebarGroupAction=Ns;exports.SidebarGroupContent=on;exports.SidebarGroupLabel=rn;exports.SidebarHeader=bs;exports.SidebarInput=xs;exports.SidebarInset=pr;exports.SidebarMenu=mr;exports.SidebarMenuAction=js;exports.SidebarMenuBadge=ks;exports.SidebarMenuButton=fr;exports.SidebarMenuItem=hr;exports.SidebarMenuSkeleton=_s;exports.SidebarMenuSub=Cs;exports.SidebarMenuSubButton=Es;exports.SidebarMenuSubItem=Ss;exports.SidebarProvider=wr;exports.SidebarRail=gs;exports.SidebarSeparator=ys;exports.SidebarTrigger=fs;exports.Skeleton=en;exports.Slider=ua;exports.Sonner=gw;exports.Spinner=Hs;exports.Switch=ma;exports.TabDropdownMenu=an;exports.TabFloatingMenu=Bc;exports.TabToolbar=$c;exports.Table=Ge;exports.TableBody=He;exports.TableCaption=as;exports.TableCell=Ht;exports.TableFooter=ss;exports.TableHead=je;exports.TableHeader=Ke;exports.TableRow=Et;exports.Tabs=xw;exports.TabsContent=ga;exports.TabsList=ha;exports.TabsTrigger=fa;exports.TextField=ow;exports.Textarea=xa;exports.ToggleGroup=pn;exports.ToggleGroupItem=ve;exports.Toolbar=Yc;exports.Tooltip=It;exports.TooltipContent=Rt;exports.TooltipProvider=Tt;exports.TooltipTrigger=Gt;exports.UiLanguageSelector=Wc;exports.VerticalTabs=xr;exports.VerticalTabsContent=vr;exports.VerticalTabsList=br;exports.VerticalTabsTrigger=As;exports.badgeVariants=Ho;exports.buttonVariants=mo;exports.cn=m;exports.getBookIdFromUSFM=mc;exports.getLinesFromUSFM=pc;exports.getNumberFromUSFM=uc;exports.getStatusForItem=ms;exports.getToolbarOSReservedSpaceClassName=qc;exports.inventoryCountColumn=wc;exports.inventoryItemColumn=lc;exports.inventoryStatusColumn=dc;exports.selectTriggerVariants=ns;exports.useEvent=bw;exports.useEventAsync=yw;exports.useListbox=xo;exports.usePromise=ba;exports.useRecentSearches=ci;exports.useSidebar=Xe;function Nw(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),o=n.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?n.insertBefore(s,o):n.appendChild(s)}Nw(`*, ::before, ::after {
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
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
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
.tw-inline {
  display: inline;
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
.tw-h-fit {
  height: fit-content;
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
.tw-w-\\[calc\\(100\\%-3rem\\)\\] {
  width: calc(100% - 3rem);
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
.tw-min-w-full {
  min-width: 100%;
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
.tw-max-w-\\[calc\\(100\\%-0\\.5rem\\)\\] {
  max-width: calc(100% - 0.5rem);
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
.tw-pr-0\\.5 {
  padding-right: 0.125rem;
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
