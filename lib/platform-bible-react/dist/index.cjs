"use strict";var ga=Object.defineProperty;var ba=(e,t,n)=>t in e?ga(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var it=(e,t,n)=>ba(e,typeof t!="symbol"?t+"":t,n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("react/jsx-runtime"),l=require("react"),pt=require("cmdk"),j=require("lucide-react"),xa=require("clsx"),va=require("tailwind-merge"),ya=require("@radix-ui/react-dialog"),v=require("platform-bible-utils"),ye=require("@radix-ui/react-slot"),Xt=require("class-variance-authority"),Na=require("@radix-ui/react-popover"),ja=require("@radix-ui/react-label"),ka=require("@radix-ui/react-radio-group"),b=require("lexical"),Vr=require("@radix-ui/react-tooltip"),jn=require("@lexical/rich-text"),gr=require("react-dom"),_a=require("@lexical/table"),Ca=require("@radix-ui/react-toggle-group"),Sa=require("@radix-ui/react-toggle"),$r=require("@lexical/headless"),Ea=require("@radix-ui/react-separator"),Ta=require("@radix-ui/react-avatar"),Br=require("@radix-ui/react-dropdown-menu"),ct=require("@tanstack/react-table"),Ra=require("@radix-ui/react-select"),Ma=require("markdown-to-jsx"),bt=require("@eten-tech-foundation/platform-editor"),Da=require("@radix-ui/react-checkbox"),Ia=require("@radix-ui/react-tabs"),Oa=require("@radix-ui/react-menubar"),Aa=require("react-hotkeys-hook"),La=require("@radix-ui/react-context-menu"),vt=require("vaul"),Pa=require("@radix-ui/react-progress"),Va=require("react-resizable-panels"),zr=require("sonner"),$a=require("@radix-ui/react-slider"),Ba=require("@radix-ui/react-switch");function rt(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const xt=rt(ya),ge=rt(Na),Fr=rt(ja),Oe=rt(ka),$e=rt(Vr),nn=rt(Ca),Gr=rt(Sa),Kr=rt(Ea),Ne=rt(Ta),J=rt(Br),Q=rt(Ra),kn=rt(Da),ut=rt(Ia),W=rt(Oa),Z=rt(La),_n=rt(Pa),In=rt(Va),Me=rt($a),Cn=rt(Ba),za=va.extendTailwindMerge({prefix:"tw-"});function m(...e){return za(xa.clsx(e))}const Fa="layoutDirection";function ot(){const e=localStorage.getItem(Fa);return e==="rtl"?e:"ltr"}const Ga=xt.Root,Ka=xt.Portal,Hr=l.forwardRef(({className:e,...t},n)=>r.jsx(xt.Overlay,{ref:n,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Hr.displayName=xt.Overlay.displayName;const Xr=l.forwardRef(({className:e,children:t,...n},o)=>{const s=ot();return r.jsxs(Ka,{children:[r.jsx(Hr,{}),r.jsxs(xt.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:s,children:[t,r.jsxs(xt.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[r.jsx(j.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Xr.displayName=xt.Content.displayName;function Ur({className:e,...t}){return r.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}Ur.displayName="DialogHeader";const qr=l.forwardRef(({className:e,...t},n)=>r.jsx(xt.Title,{ref:n,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));qr.displayName=xt.Title.displayName;const Ha=l.forwardRef(({className:e,...t},n)=>r.jsx(xt.Description,{ref:n,className:m("tw-text-sm tw-text-muted-foreground",e),...t}));Ha.displayName=xt.Description.displayName;const ae=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command,{ref:n,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));ae.displayName=pt.Command.displayName;const je=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[r.jsx(j.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),r.jsx(pt.Command.Input,{ref:n,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});je.displayName=pt.Command.Input.displayName;const ie=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.List,{ref:n,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));ie.displayName=pt.Command.List.displayName;const Be=l.forwardRef((e,t)=>r.jsx(pt.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Be.displayName=pt.Command.Empty.displayName;const It=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Group,{ref:n,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));It.displayName=pt.Command.Group.displayName;const Yr=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Separator,{ref:n,className:m("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Yr.displayName=pt.Command.Separator.displayName;const Ut=l.forwardRef(({className:e,...t},n)=>r.jsx(pt.Command.Item,{ref:n,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Ut.displayName=pt.Command.Item.displayName;var Xa=Object.defineProperty,Ua=(e,t,n)=>t in e?Xa(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,z=(e,t,n)=>Ua(e,typeof t!="symbol"?t+"":t,n);const ne=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],On=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Jr=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],br=ri();function ke(e,t=!0){return t&&(e=e.toUpperCase()),e in br?br[e]:0}function An(e){return ke(e)>0}function qa(e){const t=typeof e=="string"?ke(e):e;return t>=40&&t<=66}function Ya(e){return(typeof e=="string"?ke(e):e)<=39}function Wr(e){return e<=66}function Ja(e){const t=typeof e=="string"?ke(e):e;return to(t)&&!Wr(t)}function*Wa(){for(let e=1;e<=ne.length;e++)yield e}const Za=1,Zr=ne.length;function Qa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ln(e,t="***"){const n=e-1;return n<0||n>=ne.length?t:ne[n]}function Qr(e){return e<=0||e>Zr?"******":Jr[e-1]}function ti(e){return Qr(ke(e))}function to(e){const t=typeof e=="number"?Ln(e):e;return An(t)&&!On.includes(t)}function ei(e){const t=typeof e=="number"?Ln(e):e;return An(t)&&On.includes(t)}function ni(e){return Jr[e-1].includes("*obsolete*")}function ri(){const e={};for(let t=0;t<ne.length;t++)e[ne[t]]=t+1;return e}const X={allBookIds:ne,nonCanonicalIds:On,bookIdToNumber:ke,isBookIdValid:An,isBookNT:qa,isBookOT:Ya,isBookOTNT:Wr,isBookDC:Ja,allBookNumbers:Wa,firstBook:Za,lastBook:Zr,extraBooks:Qa,bookNumberToId:Ln,bookNumberToEnglishName:Qr,bookIdToEnglishName:ti,isCanonical:to,isExtraMaterial:ei,isObsolete:ni};var kt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(kt||{});const mt=class{constructor(t){if(z(this,"name"),z(this,"fullPath"),z(this,"isPresent"),z(this,"hasVerseSegments"),z(this,"isCustomized"),z(this,"baseVersification"),z(this,"scriptureBooks"),z(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=kt[t]):(this._type=t,this.name=kt[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};z(mt,"Original",new mt(kt.Original)),z(mt,"Septuagint",new mt(kt.Septuagint)),z(mt,"Vulgate",new mt(kt.Vulgate)),z(mt,"English",new mt(kt.English)),z(mt,"RussianProtestant",new mt(kt.RussianProtestant)),z(mt,"RussianOrthodox",new mt(kt.RussianOrthodox));let Zt=mt;function xr(e,t){const n=t[0];for(let o=1;o<t.length;o++)e=e.split(t[o]).join(n);return e.split(n)}var eo=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(eo||{});const dt=class G{constructor(t,n,o,s){if(z(this,"firstChapter"),z(this,"lastChapter"),z(this,"lastVerse"),z(this,"hasSegmentsDefined"),z(this,"text"),z(this,"BBBCCCVVVS"),z(this,"longHashCode"),z(this,"versification"),z(this,"rtlMark","‏"),z(this,"_bookNum",0),z(this,"_chapterNum",0),z(this,"_verseNum",0),z(this,"_verse"),o==null&&s==null)if(t!=null&&typeof t=="string"){const a=t,i=n!=null&&n instanceof Zt?n:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof Zt?n:void 0;this.setEmpty(a),this._verseNum=t%G.chapterDigitShifter,this._chapterNum=Math.floor(t%G.bookDigitShifter/G.chapterDigitShifter),this._bookNum=Math.floor(t/G.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof G){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof Zt?t:G.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&o!=null)if(typeof t=="string"&&typeof n=="string"&&typeof o=="string")this.setEmpty(s),this.updateInternal(t,n,o);else if(typeof t=="number"&&typeof n=="number"&&typeof o=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=o,this.versification=s??G.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new G(t),{success:!0,verseRef:n}}catch(o){if(o instanceof Ee)return n=new G,{success:!1,verseRef:n};throw o}}static getBBBCCCVVV(t,n,o){return t%G.bcvMaxValue*G.bookDigitShifter+(n>=0?n%G.bcvMaxValue*G.chapterDigitShifter:0)+(o>=0?o%G.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:o,verseNum:s,verse:a,versificationStr:i}=t,c=a||s.toString();let d;return i&&(d=new Zt(i)),n?new G(n,o.toString(),c,d):new G}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let o;for(let s=0;s<t.length;s++){if(o=t[s],o<"0"||o>"9")return s===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +o-0,n>G.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(G.verseRangeSeparator)||this._verse.includes(G.verseSequenceIndicator))}get book(){return X.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=X.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:o}=G.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=G.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>X.lastBook)throw new Ee("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Zt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(G.verseRangeSeparators,G.verseSequenceIndicators)}get BBBCCC(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new Zt(kt[i])}catch{throw new Ee("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Ee("Invalid reference : "+t);const o=n[1].split(":"),s=+o[0];if(o.length!==2||X.bookIdToNumber(n[0])===0||!Number.isInteger(s)||s<0||!G.isVerseParseable(o[1]))throw new Ee("Invalid reference : "+t);this.updateInternal(n[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new G(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof G?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=G.verseRangeSeparators,o=G.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const s=[],a=xr(this._verse,o);for(const i of a.map(c=>xr(c,n))){const c=this.clone();c.verse=i[0];const d=c.verseNum;if(s.push(c),i.length>1){const w=this.clone();if(w.verse=i[1],!t)for(let p=d+1;p<w.verseNum;p++){const f=new G(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||s.push(f)}s.push(w)}}return s}validateVerse(t,n){if(!this.verse)return this.internalValid;let o=0;for(const s of this.allVerses(!0,t,n)){const a=s.internalValid;if(a!==0)return a;const i=s.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>X.lastBook?2:(X.isCanonical(this._bookNum),0)}setEmpty(t=G.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,o){this.bookNum=X.bookIdToNumber(t),this.chapter=n,this.verse=o}};z(dt,"defaultVersification",Zt.English),z(dt,"verseRangeSeparator","-"),z(dt,"verseSequenceIndicator",","),z(dt,"verseRangeSeparators",[dt.verseRangeSeparator]),z(dt,"verseSequenceIndicators",[dt.verseSequenceIndicator]),z(dt,"chapterDigitShifter",1e3),z(dt,"bookDigitShifter",dt.chapterDigitShifter*dt.chapterDigitShifter),z(dt,"bcvMaxValue",dt.chapterDigitShifter-1),z(dt,"ValidStatusType",eo);let Ee=class extends Error{};const no=(e,t,n,o,s)=>{switch(e){case v.Section.OT:return t??"Old Testament";case v.Section.NT:return n??"New Testament";case v.Section.DC:return o??"Deuterocanon";case v.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},oi=(e,t,n,o,s)=>{switch(e){case v.Section.OT:return t??"OT";case v.Section.NT:return n??"NT";case v.Section.DC:return o??"DC";case v.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function he(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??X.bookIdToEnglishName(e)}function Pn(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const ro=X.allBookIds.filter(e=>!X.isObsolete(X.bookIdToNumber(e))),ee=Object.fromEntries(ro.map(e=>[e,X.bookIdToEnglishName(e)]));function Vn(e,t,n){const o=t.trim().toLowerCase();if(!o)return!1;const s=X.bookIdToEnglishName(e),a=n==null?void 0:n.get(e);return!!(v.includes(s.toLowerCase(),o)||v.includes(e.toLowerCase(),o)||(a?v.includes(a.localizedName.toLowerCase(),o)||v.includes(a.localizedId.toLowerCase(),o):!1))}const oo=l.forwardRef(({bookId:e,isSelected:t,onSelect:n,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:d},w)=>{const p=l.useRef(!1),f=()=>{p.current||n==null||n(e),setTimeout(()=>{p.current=!1},100)},h=N=>{p.current=!0,o?o(N):n==null||n(e)},u=l.useMemo(()=>he(e,c),[e,c]),g=l.useMemo(()=>Pn(e,c),[e,c]);return r.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===v.Section.OT,"tw-border-s-purple-200":s===v.Section.NT,"tw-border-s-indigo-200":s===v.Section.DC,"tw-border-s-amber-200":s===v.Section.Extra}),children:r.jsxs(Ut,{ref:w,value:d||`${e} ${X.bookIdToEnglishName(e)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":t,"aria-label":`${X.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:a,children:[i&&r.jsx(j.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),r.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),r.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),so=Xt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),$=l.forwardRef(({className:e,variant:t,size:n,asChild:o=!1,...s},a)=>{const i=o?ye.Slot:"button";return r.jsx(i,{className:m(so({variant:t,size:n,className:e})),ref:a,...s})});$.displayName="Button";const le=ge.Root,ce=ge.Trigger,si=ge.Anchor,qt=l.forwardRef(({className:e,align:t="center",sideOffset:n=4,...o},s)=>{const a=ot();return r.jsx(ge.Portal,{children:r.jsx(ge.Content,{ref:s,align:t,sideOffset:n,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:a})})});qt.displayName=ge.Content.displayName;function Sn(e,t,n){return`${e} ${ee[e]}${t?` ${Pn(e,t)} ${he(e,t)}`:""}${n?` ${n}`:""}`}function ao({recentSearches:e,onSearchItemSelect:t,renderItem:n=c=>String(c),getItemKey:o=c=>String(c),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i}){const[c,d]=l.useState(!1);if(e.length===0)return;const w=p=>{t(p),d(!1)};return r.jsxs(le,{open:c,onOpenChange:d,children:[r.jsx(ce,{asChild:!0,children:r.jsx($,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:r.jsx(j.Clock,{className:"tw-h-4 tw-w-4"})})}),r.jsx(qt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:r.jsx(ae,{children:r.jsx(ie,{children:r.jsx(It,{heading:a,children:e.map(p=>r.jsxs(Ut,{onSelect:()=>w(p),className:"tw-flex tw-items-center",children:[r.jsx(j.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),r.jsx("span",{children:n(p)})]},o(p)))})})})})]})}function ai(e,t,n=(s,a)=>s===a,o=15){return s=>{const a=e.filter(c=>!n(c,s)),i=[s,...a.slice(0,o-1)];t(i)}}const dn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ii=[dn.BOOK_ONLY,dn.BOOK_CHAPTER,dn.BOOK_CHAPTER_VERSE];function vr(e){const t=/^[a-zA-Z]$/.test(e),n=/^[0-9]$/.test(e);return{isLetter:t,isDigit:n}}function _t(e){return v.getChaptersForBook(X.bookIdToNumber(e))}function li(e,t,n){if(!e.trim()||t.length===0)return;const o=ii.reduce((s,a)=>{if(s)return s;const i=a.exec(e.trim());if(i){const[c,d=void 0,w=void 0]=i.slice(1);let p;const f=t.filter(h=>Vn(h,c,n));if(f.length===1&&([p]=f),!p&&d){if(X.isBookIdValid(c)){const h=c.toUpperCase();t.includes(h)&&(p=h)}if(!p&&n){const h=Array.from(n.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&t.includes(h[0])&&([p]=h)}}if(!p&&d){const u=(g=>Object.keys(ee).find(N=>ee[N].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&n){const g=Array.from(n.entries()).find(([,N])=>N.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>_t(p)&&(h=Math.max(_t(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function ci(e,t,n,o){const s=l.useCallback(()=>{if(e.chapterNum>1)o({book:e.book,chapterNum:e.chapterNum-1,verseNum:1});else{const d=t.indexOf(e.book);if(d>0){const w=t[d-1],p=Math.max(_t(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[e,t,o]),a=l.useCallback(()=>{const d=_t(e.book);if(e.chapterNum<d)o({book:e.book,chapterNum:e.chapterNum+1,verseNum:1});else{const w=t.indexOf(e.book);if(w<t.length-1){const p=t[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[e,t,o]),i=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum>1?e.verseNum-1:0})},[e,o]),c=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum+1})},[e,o]);return l.useMemo(()=>[{onClick:s,disabled:t.length===0||e.chapterNum===1&&t.indexOf(e.book)===0,title:"Previous chapter",icon:n==="ltr"?j.ChevronsLeft:j.ChevronsRight},{onClick:i,disabled:t.length===0||e.verseNum===0,title:"Previous verse",icon:n==="ltr"?j.ChevronLeft:j.ChevronRight},{onClick:c,disabled:t.length===0,title:"Next verse",icon:n==="ltr"?j.ChevronRight:j.ChevronLeft},{onClick:a,disabled:t.length===0||(e.chapterNum===_t(e.book)||_t(e.book)===-1)&&t.indexOf(e.book)===t.length-1,title:"Next chapter",icon:n==="ltr"?j.ChevronsRight:j.ChevronsLeft}],[e,t,n,s,i,c,a])}function yr({bookId:e,scrRef:t,onChapterSelect:n,setChapterRef:o,isChapterDimmed:s,className:a}){if(e)return r.jsx(It,{children:r.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:_t(e)},(i,c)=>c+1).map(i=>r.jsx(Ut,{value:`${e} ${ee[e]||""} ${i}`,onSelect:()=>n(i),ref:o(i),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":e===t.book&&i===t.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function wi({scrRef:e,handleSubmit:t,className:n,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:d}){const w=ot(),[p,f]=l.useState(!1),[h,u]=l.useState(""),[g,N]=l.useState(""),[k,M]=l.useState("books"),[x,y]=l.useState(void 0),[R,L]=l.useState(!1),_=l.useRef(void 0),S=l.useRef(void 0),T=l.useRef(void 0),C=l.useRef(void 0),E=l.useRef({}),P=l.useCallback(D=>{t(D),c&&c(D)},[t,c]),B=l.useMemo(()=>o?o():ro,[o]),F=l.useMemo(()=>({[v.Section.OT]:B.filter(H=>X.isBookOT(H)),[v.Section.NT]:B.filter(H=>X.isBookNT(H)),[v.Section.DC]:B.filter(H=>X.isBookDC(H)),[v.Section.Extra]:B.filter(H=>X.extraBooks().includes(H))}),[B]),I=l.useMemo(()=>Object.values(F).flat(),[F]),q=l.useMemo(()=>{if(!g.trim())return F;const D={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return[v.Section.OT,v.Section.NT,v.Section.DC,v.Section.Extra].forEach(et=>{D[et]=F[et].filter(at=>Vn(at,g,s))}),D},[F,g,s]),A=l.useMemo(()=>li(g,I,s),[g,I,s]),Y=l.useCallback(()=>{A&&(P({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1}),f(!1),N(""),u(""))},[P,A]),gt=l.useCallback(D=>{if(_t(D)<=1){P({book:D,chapterNum:1,verseNum:1}),f(!1),N("");return}y(D),M("chapters")},[P]),Lt=l.useCallback(D=>{const H=k==="chapters"?x:A==null?void 0:A.book;H&&(P({book:H,chapterNum:D,verseNum:1}),f(!1),M("books"),y(void 0),N(""))},[P,k,x,A]),Nt=l.useCallback(D=>{P(D),f(!1),N("")},[P]),V=ci(e,I,w,t),O=l.useCallback(()=>{M("books"),y(void 0),setTimeout(()=>{S.current&&S.current.focus()},0)},[]),tt=l.useCallback(D=>{if(!D&&k==="chapters"){O();return}f(D),D&&(M("books"),y(void 0),N(""))},[k,O]),{otLong:st,ntLong:ft,dcLong:Ce,extraLong:mr}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},da=l.useCallback(D=>no(D,st,ft,Ce,mr),[st,ft,Ce,mr]),pa=l.useCallback(D=>A?!!A.chapterNum&&!D.toString().includes(A.chapterNum.toString()):!1,[A]),ua=l.useMemo(()=>v.formatScrRef(e,s?he(e.book,s):"English"),[e,s]),hr=l.useCallback(D=>H=>{E.current[D]=H},[]),ma=l.useCallback(D=>{(D.key==="Home"||D.key==="End")&&D.stopPropagation()},[]),ha=l.useCallback(D=>{if(D.ctrlKey)return;const{isLetter:H,isDigit:et}=vr(D.key);if(k==="chapters"){if(D.key==="Backspace"){D.preventDefault(),D.stopPropagation(),O();return}if(H||et){if(D.preventDefault(),D.stopPropagation(),M("books"),y(void 0),et&&x){const at=ee[x];N(`${at} ${D.key}`)}else N(D.key);setTimeout(()=>{S.current&&S.current.focus()},0);return}}if((k==="chapters"||k==="books"&&A)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(D.key)){const at=k==="chapters"?x:A==null?void 0:A.book;if(!at)return;const wt=(()=>{if(!h)return 1;const Se=h.match(/(\d+)$/);return Se?parseInt(Se[1],10):0})(),Jt=_t(at);if(!Jt)return;let Rt=wt;const fr=6;switch(D.key){case"ArrowLeft":wt!==0&&(Rt=wt>1?wt-1:Jt);break;case"ArrowRight":wt!==0&&(Rt=wt<Jt?wt+1:1);break;case"ArrowUp":Rt=wt===0?Jt:Math.max(1,wt-fr);break;case"ArrowDown":Rt=wt===0?1:Math.min(Jt,wt+fr);break;default:return}Rt!==wt&&(D.preventDefault(),D.stopPropagation(),u(Sn(at,s,Rt)),setTimeout(()=>{const Se=E.current[Rt];Se&&Se.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[k,A,O,x,h,s]),fa=l.useCallback(D=>{if(D.shiftKey||D.key==="Tab"||D.key===" ")return;const{isLetter:H,isDigit:et}=vr(D.key);(H||et)&&(D.preventDefault(),N(at=>at+D.key),S.current.focus(),L(!1))},[]);return l.useLayoutEffect(()=>{const D=setTimeout(()=>{if(p&&k==="books"&&T.current&&C.current){const H=T.current,et=C.current,at=et.offsetTop,wt=H.clientHeight,Jt=et.clientHeight,Rt=at-wt/2+Jt/2;H.scrollTo({top:Math.max(0,Rt),behavior:"smooth"}),u(Sn(e.book))}},0);return()=>{clearTimeout(D)}},[p,k,g,A,e.book]),l.useLayoutEffect(()=>{if(k==="chapters"&&x){const D=x===e.book;setTimeout(()=>{if(T.current)if(D){const H=E.current[e.chapterNum];H&&H.scrollIntoView({block:"center",behavior:"smooth"})}else T.current.scrollTo({top:0});_.current&&_.current.focus()},0)}},[k,x,A,e.book,e.chapterNum]),r.jsxs(le,{open:p,onOpenChange:tt,children:[r.jsx(ce,{asChild:!0,children:r.jsx($,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:r.jsx("span",{className:"tw-truncate",children:ua})})}),r.jsx(qt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:r.jsxs(ae,{ref:_,onKeyDown:ha,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[k==="books"?r.jsxs("div",{className:"tw-flex tw-items-end",children:[r.jsxs("div",{className:"tw-relative tw-flex-1",children:[r.jsx(je,{ref:S,value:g,onValueChange:N,onKeyDown:ma,onFocus:()=>L(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&r.jsx(ao,{recentSearches:i,onSearchItemSelect:Nt,renderItem:D=>v.formatScrRef(D,"English"),getItemKey:D=>`${D.book}-${D.chapterNum}-${D.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:V.map(({onClick:D,disabled:H,title:et,icon:at})=>r.jsx($,{variant:"ghost",size:"sm",onClick:()=>{L(!0),D()},disabled:H,className:"tw-h-10 tw-w-4 tw-p-0",title:et,onKeyDown:fa,children:r.jsx(at,{})},et))})]}):r.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[r.jsx($,{variant:"ghost",size:"sm",onClick:O,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?r.jsx(j.ArrowLeft,{className:"tw-h-4 tw-w-4"}):r.jsx(j.ArrowRight,{className:"tw-h-4 tw-w-4"})}),x&&r.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:he(x,s)})]}),!R&&r.jsxs(ie,{ref:T,children:[k==="books"&&r.jsxs(r.Fragment,{children:[!A&&Object.entries(q).map(([D,H])=>{if(H.length!==0)return r.jsx(It,{heading:da(D),children:H.map(et=>r.jsx(oo,{bookId:et,onSelect:at=>gt(at),section:v.getSectionForBook(et),commandValue:`${et} ${ee[et]}`,ref:et===e.book?C:void 0,localizedBookNames:s},et))},D)}),A&&r.jsx(It,{children:r.jsx(Ut,{value:`${A.book} ${ee[A.book]} ${A.chapterNum||""}:${A.verseNum||""})}`,onSelect:Y,className:"tw-font-semibold tw-text-primary",children:v.formatScrRef({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1},s?Pn(A.book,s):void 0)},"top-match")}),A&&_t(A.book)>1&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:he(A.book,s)}),r.jsx(yr,{bookId:A.book,scrRef:e,onChapterSelect:Lt,setChapterRef:hr,isChapterDimmed:pa,className:"tw-px-4 tw-pb-4"})]})]}),k==="chapters"&&x&&r.jsx(yr,{bookId:x,scrRef:e,onChapterSelect:Lt,setChapterRef:hr,className:"tw-p-4"})]})]})})]})}const di=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),pi=Xt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),nt=l.forwardRef(({className:e,...t},n)=>r.jsx(Fr.Root,{ref:n,className:m("pr-twp",pi(),e),...t}));nt.displayName=Fr.Root.displayName;const rn=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsx(Oe.Root,{className:m("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:o})});rn.displayName=Oe.Root.displayName;const Ae=l.forwardRef(({className:e,...t},n)=>r.jsx(Oe.Item,{ref:n,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:r.jsx(Oe.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:r.jsx(j.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ae.displayName=Oe.Item.displayName;function ui(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Ye({id:e,options:t=[],className:n,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=ui,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:N=!1,ariaLabel:k,...M}){const[x,y]=l.useState(!1),R=d??c,L=S=>S.length>0&&typeof S[0]=="object"&&"options"in S[0],_=(S,T)=>{const C=c(S),E=typeof S=="object"&&"secondaryLabel"in S?S.secondaryLabel:void 0,P=`${T??""}${C}${E??""}`;return r.jsxs(Ut,{value:C,onSelect:()=>{i(S),y(!1)},className:"tw-flex tw-items-center",children:[r.jsx(j.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==C})}),r.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[C,E&&r.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",E]})]})]},P)};return r.jsxs(le,{open:x,onOpenChange:y,...M,children:[r.jsx(ce,{asChild:!0,children:r.jsxs($,{variant:u,role:"combobox","aria-expanded":x,"aria-label":k,id:e,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??n),disabled:N,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&r.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),r.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?R(a):p})]}),r.jsx(j.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(qt,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:r.jsxs(ae,{children:[r.jsx(je,{placeholder:f,className:"tw-text-inherit"}),r.jsx(Be,{children:h}),r.jsx(ie,{children:L(t)?t.map(S=>r.jsx(It,{heading:S.groupHeading,children:S.options.map(T=>_(T,S.groupHeading))},S.groupHeading)):t.map(S=>_(S))})]})})]})}function io({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{n(w),w>t&&o(w)},d=w=>{o(w),w<e&&n(w)};return r.jsxs(r.Fragment,{children:[r.jsx(nt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),r.jsx(Ye,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:e},"start chapter"),r.jsx(nt,{htmlFor:"end-chapters-combobox",children:"to"}),r.jsx(Ye,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:w=>w.toString(),value:t},"end chapter")]})}var lo=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(lo||{});const mi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),pn=(e,t)=>e[t]??t;function hi({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=pn(w,"%webView_bookSelector_currentBook%"),f=pn(w,"%webView_bookSelector_choose%"),h=pn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),N=k=>{g(k),e(k)};return r.jsx(rn,{className:"pr-twp tw-flex",value:u,onValueChange:k=>N(k),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ae,{value:"current book"}),r.jsx(nt,{className:"tw-ms-1",children:p})]}),r.jsx(nt,{className:"tw-flex tw-items-center",children:t}),r.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:r.jsx(io,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),r.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ae,{value:"choose books"}),r.jsx(nt,{className:"tw-ms-1",children:h})]}),r.jsx(nt,{className:"tw-flex tw-items-center",children:o.map(k=>X.bookIdToEnglishName(k)).join(", ")}),r.jsx($,{disabled:u==="current book",onClick:()=>n(),children:f})]})]})})}const fi=["%comment_assigned_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],gi=["input","select","textarea","button"],bi=["button","textbox"],co=({options:e,onFocusChange:t,onOptionSelect:n,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,d]=l.useState(void 0),w=l.useCallback(u=>{i(u);const g=e.find(k=>k.id===u);g&&(t==null||t(g));const N=document.getElementById(u);N&&(N.scrollIntoView({block:"center"}),N.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=l.useCallback(u=>{const g=e.find(N=>N.id===u);g&&(d(N=>N===u?void 0:u),n==null||n(g))},[n,e]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||gi.includes(g))return!0;const N=u.getAttribute("role");if(N&&bi.includes(N))return!0;const k=u.getAttribute("tabindex");return k!==void 0&&k!=="-1"},h=l.useCallback(u=>{var S;const g=u.target,N=T=>T?document.getElementById(T):void 0,k=N(c),M=N(a);if(!!(k&&g&&k.contains(g)&&g!==k)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const T=e.find(C=>C.id===c);T&&w(T.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!k)return;const T=Array.from(k.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(T.length===0)return;const C=T.findIndex(P=>P===g);if(C===-1)return;let E;u.key==="ArrowDown"?E=Math.min(C+1,T.length-1):E=Math.max(C-1,0),E!==C&&(u.preventDefault(),u.stopPropagation(),(S=T[E])==null||S.focus());return}return}const R=e.findIndex(T=>T.id===a);let L=R;switch(u.key){case"ArrowDown":L=Math.min(R+1,e.length-1),u.preventDefault();break;case"ArrowUp":L=Math.max(R-1,0),u.preventDefault();break;case"Home":L=0,u.preventDefault();break;case"End":L=e.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const T=M;if(T){const C=T.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),E=T.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=C??E;if(P){u.preventDefault(),P.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const _=e[L];_&&w(_.id)},[e,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:w}},wo=l.createContext(null);function xi(e,t){return{getTheme:function(){return t??null}}}function Tt(){const e=l.useContext(wo);return e==null&&function(t,...n){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const a of n)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const po=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,vi=po?l.useLayoutEffect:l.useEffect,He={tag:b.HISTORY_MERGE_TAG};function yi({initialConfig:e,children:t}){const n=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:d}=e,w=xi(null,o),p=b.createEditor({editable:e.editable,html:d,namespace:s,nodes:a,onError:f=>i(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const N=po?document.activeElement:null;(b.$getSelection()!==null||N!==null&&N===f.getRootElement())&&g.select()}},He);else if(h!==null)switch(typeof h){case"string":{const u=f.parseEditorState(h);f.setEditorState(u,He);break}case"object":f.setEditorState(h,He);break;case"function":f.update(()=>{b.$getRoot().isEmpty()&&h(f)},He)}}}(p,c),[p,w]},[]);return vi(()=>{const o=e.editable,[s]=n;s.setEditable(o===void 0||o)},[]),r.jsx(wo.Provider,{value:n,children:t})}const Ni=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ji({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:n}){const[o]=Tt();return Ni(()=>{if(n)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:d})=>{t&&a.size===0&&i.size===0||e&&d.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||n(s,o,d)})},[o,e,t,n]),null}const $n={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},St=$e.Provider,Mt=$e.Root,$t=$e.Trigger,Et=l.forwardRef(({className:e,sideOffset:t=4,...n},o)=>r.jsx($e.Content,{ref:o,sideOffset:t,className:m("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Et.displayName=$e.Content.displayName;const Bn=[jn.HeadingNode,b.ParagraphNode,b.TextNode,jn.QuoteNode],ki=l.createContext(null),un={didCatch:!1,error:null};class _i extends l.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=un}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var n,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(n=(o=this.props).onReset)===null||n===void 0||n.call(o,{args:a,reason:"imperative-api"}),this.setState(un)}}componentDidCatch(t,n){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,n)}componentDidUpdate(t,n){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&n.error!==null&&Ci(t.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(un)}}render(){const{children:t,fallbackRender:n,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=t;if(a){const d={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")c=n(d);else if(o)c=l.createElement(o,d);else if(s!==void 0)c=s;else throw i}return l.createElement(ki.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ci(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((n,o)=>!Object.is(n,t[o]))}function Si({children:e,onError:t}){return r.jsx(_i,{fallback:r.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const Ei=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ti(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function Ri(){return function(e){const[t]=Tt(),n=l.useMemo(()=>e(t),[t,e]),[o,s]=l.useState(()=>n.initialValueFn()),a=l.useRef(o);return Ei(()=>{const{initialValueFn:i,subscribe:c}=n,d=i();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[n,e]),o}(Ti)}function Mi(e,t,n="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!b.$isTokenOrSegmented(t)&&o!==null){const[s,a]=o,i=e.isBackward(),c=s.getNode(),d=a.getNode(),w=t.is(c),p=t.is(d);if(w||p){const[f,h]=b.$getCharacterOffsets(e),u=c.is(d),g=t.is(i?d:c),N=t.is(i?c:d);let k,M=0;u?(M=f>h?h:f,k=f>h?f:h):g?(M=i?h:f,k=void 0):N&&(M=0,k=i?f:h);const x=t.__text.slice(M,k);x!==t.__text&&(n==="clone"&&(t=b.$cloneWithPropertiesEphemeral(t)),t.__text=x)}}return t}function Di(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const uo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ii=uo&&"documentMode"in document?document.documentMode:null;!(!uo||!("InputEvent"in window)||Ii)&&"getTargetRanges"in new window.InputEvent("input");function mo(...e){const t=[];for(const n of e)if(n&&typeof n=="string")for(const[o]of n.matchAll(/\S+/g))t.push(o);return t}function Ft(...e){return()=>{for(let t=e.length-1;t>=0;t--)e[t]();e.length=0}}function ho(e,...t){const n=mo(...t);n.length>0&&e.classList.add(...n)}function Oi(e,...t){const n=mo(...t);n.length>0&&e.classList.remove(...n)}function Nr(e){const t=b.$findMatchingParent(e,n=>b.$isElementNode(n)&&!n.isInline());return b.$isElementNode(t)||Di(4,e.__key),t}function Ai(e,t){const n=[];for(let o=0;o<e.length;o++){const s=t(e[o]);s!==null&&n.push(s)}return n}const Li=Symbol.for("preact-signals");function on(){if(Bt>1)return void Bt--;let e,t=!1;for(;De!==void 0;){let n=De;for(De=void 0,En++;n!==void 0;){const o=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&fo(n))try{n.c()}catch(s){t||(e=s,t=!0)}n=o}}if(En=0,Bt--,t)throw e}function Pi(e){if(Bt>0)return e();Bt++;try{return e()}finally{on()}}let K,De;function jr(e){const t=K;K=void 0;try{return e()}finally{K=t}}let Bt=0,En=0,qe=0;function kr(e){if(K===void 0)return;let t=e.n;return t===void 0||t.t!==K?(t={i:0,S:e,p:K.s,n:void 0,t:K,e:void 0,x:void 0,r:t},K.s!==void 0&&(K.s.n=t),K.s=t,e.n=t,32&K.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=K.s,t.n=void 0,K.s.n=t,K.s=t),t):void 0}function lt(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Le(e,t){return new lt(e,t)}function fo(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function _r(e){for(let t=e.s;t!==void 0;t=t.n){const n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function go(e){let t,n=e.s;for(;n!==void 0;){const o=n.p;n.i===-1?(n.S.U(n),o!==void 0&&(o.n=n.n),n.n!==void 0&&(n.n.p=o)):t=n,n.S.n=n.r,n.r!==void 0&&(n.r=void 0),n=o}e.s=t}function Qt(e,t){lt.call(this,void 0),this.x=e,this.s=void 0,this.g=qe-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Vi(e,t){return new Qt(e,t)}function bo(e){const t=e.u;if(e.u=void 0,typeof t=="function"){Bt++;const n=K;K=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,zn(e),o}finally{K=n,on()}}}function zn(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,bo(e)}function $i(e){if(K!==this)throw new Error("Out-of-order effect");go(this),K=e,this.f&=-2,8&this.f&&zn(this),on()}function me(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function Gt(e,t){const n=new me(e,t);try{n.c()}catch(s){throw n.d(),s}const o=n.d.bind(n);return o[Symbol.dispose]=o,o}function sn(e,t={}){const n={};for(const o in e){const s=t[o],a=Le(s===void 0?e[o]:s);n[o]=a}return n}lt.prototype.brand=Li,lt.prototype.h=function(){return!0},lt.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:jr(()=>{var n;(n=this.W)==null||n.call(this)}))},lt.prototype.U=function(e){if(this.t!==void 0){const t=e.e,n=e.x;t!==void 0&&(t.x=n,e.e=void 0),n!==void 0&&(n.e=t,e.x=void 0),e===this.t&&(this.t=n,n===void 0&&jr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},lt.prototype.subscribe=function(e){return Gt(()=>{const t=this.value,n=K;K=void 0;try{e(t)}finally{K=n}},{name:"sub"})},lt.prototype.valueOf=function(){return this.value},lt.prototype.toString=function(){return this.value+""},lt.prototype.toJSON=function(){return this.value},lt.prototype.peek=function(){const e=K;K=void 0;try{return this.value}finally{K=e}},Object.defineProperty(lt.prototype,"value",{get(){const e=kr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(En>100)throw new Error("Cycle detected");this.v=e,this.i++,qe++,Bt++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{on()}}}}),Qt.prototype=new lt,Qt.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===qe))return!0;if(this.g=qe,this.f|=1,this.i>0&&!fo(this))return this.f&=-2,!0;const e=K;try{_r(this),K=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return K=e,go(this),this.f&=-2,!0},Qt.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}lt.prototype.S.call(this,e)},Qt.prototype.U=function(e){if(this.t!==void 0&&(lt.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},Qt.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(Qt.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=kr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),me.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},me.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,bo(this),_r(this),Bt++;const e=K;return K=this,$i.bind(this,e)},me.prototype.N=function(){2&this.f||(this.f|=2,this.o=De,De=this)},me.prototype.d=function(){this.f|=8,1&this.f||zn(this)},me.prototype.dispose=function(){this.d()};b.defineExtension({build:(e,t,n)=>sn(t),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,n){const o=n.getOutput();return Gt(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function xo(){const e=b.$getRoot(),t=b.$getSelection(),n=b.$createParagraphNode();e.clear(),e.append(n),t!==null&&n.select(),b.$isRangeSelection(t)&&(t.format=0)}function vo(e,t=xo){return e.registerCommand(b.CLEAR_EDITOR_COMMAND,n=>(e.update(t),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(e,t,n)=>sn(t),config:b.safeCast({$onClear:xo}),name:"@lexical/extension/ClearEditor",register(e,t,n){const{$onClear:o}=n.getOutput();return Gt(()=>vo(e,o.value))}});function Bi(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function yo(e,t){let n;return Le(e(),{unwatched(){n&&(n(),n=void 0)},watched(){this.value=e(),n=t(this)}})}const Tn=b.defineExtension({build:e=>yo(()=>e.getEditorState(),t=>e.registerUpdateListener(n=>{t.value=n.editorState})),name:"@lexical/extension/EditorState"});function U(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function No(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const n=e,o=t;for(const s in o)n[s]=No(n[s],o[s]);return e}return t}const Fn=0,Rn=1,jo=2,mn=3,Xe=4,ue=5,hn=6,Te=7;function fn(e){return e.id===Fn}function ko(e){return e.id===jo}function zi(e){return function(t){return t.id===Rn}(e)||U(305,String(e.id),String(Rn)),Object.assign(e,{id:jo})}const Fi=new Set;class Gi{constructor(t,n){it(this,"builder");it(this,"configs");it(this,"_dependency");it(this,"_peerNameSet");it(this,"extension");it(this,"state");it(this,"_signal");this.builder=t,this.extension=n,this.configs=new Set,this.state={id:Fn}}mergeConfigs(){let t=this.extension.config||{};const n=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)t=n(t,o);return t}init(t){const n=this.state;ko(n)||U(306,String(n.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:mn,registerState:w})}(n,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(t,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Xe,initResult:d,registerState:w})}(a,i,s)}build(t){const n=this.state;let o;n.id!==Xe&&U(307,String(n.id),String(ue)),this.extension.build&&(o=this.extension.build(t,n.config,n.registerState));const s={...n.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:ue,output:i,registerState:c})}(n,o,s)}register(t,n){this._signal=n;const o=this.state;o.id!==ue&&U(308,String(o.id),String(ue));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:hn})}(o),()=>{const a=this.state;a.id!==Te&&U(309,String(o.id),String(Te)),this.state=function(i){return Object.assign(i,{id:ue})}(a),s&&s()}}afterRegistration(t){const n=this.state;let o;return n.id!==hn&&U(310,String(n.id),String(hn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,n.config,n.registerState)),this.state=function(s){return Object.assign(s,{id:Te})}(n),o}getSignal(){return this._signal===void 0&&U(311),this._signal}getInitResult(){this.extension.init===void 0&&U(312,this.extension.name);const t=this.state;return function(n){return n.id>=Xe}(t)||U(313,String(t.id),String(Xe)),t.initResult}getInitPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(n){return n.id>=mn}(t)||U(314,String(t.id),String(mn)),{config:t.config}}getPeer(t){const n=this.builder.extensionNameMap.get(t);return n?n.getExtensionDependency():void 0}getInitDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&U(315,this.extension.name,t.name),n.getExtensionInitDependency()}getDependency(t){const n=this.builder.getExtensionRep(t);return n===void 0&&U(315,this.extension.name,t.name),n.getExtensionDependency()}getState(){const t=this.state;return function(n){return n.id>=Te}(t)||U(316,String(t.id),String(Te)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Fi}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([n])=>n)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(n){return n.id>=ue})(t)||U(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const Cr={tag:b.HISTORY_MERGE_TAG};function Ki(){const e=b.$getRoot();e.isEmpty()&&e.append(b.$createParagraphNode())}const Hi=b.defineExtension({config:b.safeCast({setOptions:Cr,updateOptions:Cr}),init:({$initialEditorState:e=Ki})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:n},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))e.setEditorState(a,n);else if(typeof a=="function")e.update(()=>{a(e)},t);else if(a&&(typeof a=="string"||typeof a=="object")){const i=e.parseEditorState(a);e.setEditorState(i,n)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),Sr=Symbol.for("@lexical/extension/LexicalBuilder");function Er(){}function Xi(e){throw e}function Ue(e){return Array.isArray(e)?e:[e]}const gn="0.38.2+prod.esm";class Ie{constructor(t){it(this,"roots");it(this,"extensionNameMap");it(this,"outgoingConfigEdges");it(this,"incomingEdges");it(this,"conflicts");it(this,"_sortedExtensionReps");it(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=gn,this.roots=t;for(const n of t)this.addExtension(n)}static fromExtensions(t){const n=[Ue(Hi)];for(const o of t)n.push(Ue(o));return new Ie(n)}static maybeFromEditor(t){const n=t[Sr];return n&&(n.PACKAGE_VERSION!==gn&&U(292,n.PACKAGE_VERSION,gn),n instanceof Ie||U(293)),n}static fromEditor(t){const n=Ie.maybeFromEditor(t);return n===void 0&&U(294),n}constructEditor(){const{$initialEditorState:t,onError:n,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...n?{onError:a=>{n(a,s)}}:{}}),{[Sr]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let t=Er;function n(){try{t()}finally{t=Er}}const o=Object.assign(this.constructEditor(),{dispose:n,[Symbol.dispose]:n});return t=Ft(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const n=this.extensionNameMap.get(t.name);if(n)return n.extension!==t&&U(295,t.name),n}addEdge(t,n,o){const s=this.outgoingConfigEdges.get(t);s?s.set(n,o):this.outgoingConfigEdges.set(t,new Map([[n,o]]));const a=this.incomingEdges.get(n);a?a.add(t):this.incomingEdges.set(n,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&U(296);const n=Ue(t),[o]=n;typeof o.name!="string"&&U(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&U(298,o.name),!s){s=new Gi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&U(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&U(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=Ue(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],n=(o,s)=>{let a=o.state;if(ko(a))return;const i=o.extension.name;var c;fn(a)||U(300,i,s||"[unknown]"),fn(c=a)||U(304,String(c.id),String(Fn)),a=Object.assign(c,{id:Rn}),o.state=a;const d=this.outgoingConfigEdges.get(i);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&n(p,i)}a=zi(a),o.state=a,t.push(o)};for(const o of this.extensionNameMap.values())fn(o.state)&&n(o);for(const o of t)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&U(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const n=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of n){const c=i.register(t,a);c&&s.push(c)}for(const i of n){const c=i.afterRegistration(t);c&&s.push(c)}return Ft(...s)}buildCreateEditorArgs(){const t={},n=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(t.onError=f.onError),f.disableEvents!==void 0&&(t.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(t.parentEditor=f.parentEditor),f.editable!==void 0&&(t.editable=f.editable),f.namespace!==void 0&&(t.namespace=f.namespace),f.$initialEditorState!==void 0&&(t.$initialEditorState=f.$initialEditorState),f.nodes)for(const h of Bi(f)){if(typeof h!="function"){const u=o.get(h.replace);u&&U(302,f.name,h.replace.name,u.extension.name),o.set(h.replace,p)}n.add(h)}if(f.html){if(f.html.export)for(const[h,u]of f.html.export.entries())s.set(h,u);f.html.import&&Object.assign(a,f.html.import)}f.theme&&No(i,f.theme)}Object.keys(i).length>0&&(t.theme=i),n.size&&(t.nodes=[...n]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(t.html={},d&&(t.html.import=a),w&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=Xi),t}}const Ui=new Set,Tr=b.defineExtension({build(e,t,n){const o=n.getDependency(Tn).output,s=Le({watchedNodeKeys:new Map}),a=yo(()=>{},()=>Gt(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const h=b.$getNodeByKey(p),u=h&&h.isSelected()||!1;w=w||u!==(!!i&&i.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&i&&d.size===i.size||(a.value=d)}));return{watchNodeKey:function(i){const c=Vi(()=>(a.value||Ui).has(i)),{watchedNodeKeys:d}=s.peek();let w=d.get(i);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(i,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[Tn],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class be extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new be(t.__key)}static importJSON(t){return _o().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:qi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const n=document.createElement("hr");return ho(n,t.theme.hr),n}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function qi(){return{node:_o()}}function _o(){return b.$create(be)}function Yi(e){return e instanceof be}b.defineExtension({dependencies:[Tn,Tr],name:"@lexical/extension/HorizontalRule",nodes:[be],register(e,t,n){const{watchNodeKey:o}=n.getDependency(Tr).output,s=Le({nodeSelections:new Map}),a=e._config.theme.hrSelected??"selected";return Ft(e.registerCommand(b.CLICK_COMMAND,i=>{if(b.isDOMNode(i.target)){const c=b.$getNodeFromDOMNode(i.target);if(Yi(c))return function(d,w=!1){const p=b.$getSelection(),f=d.isSelected(),h=d.getKey();let u;w&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),f?u.delete(h):u.add(h)}(c,i.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),e.registerMutationListener(be,(i,c)=>{Pi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,f]of i.entries())if(f==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),u=e.getElementByKey(p);h?h.domNode.value=u:(d=!0,w.set(p,{domNode:Le(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),Gt(()=>{const i=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())i.push(Gt(()=>{const w=c.value;w&&(d.value?ho(w,a):Oi(w,a))}));return Ft(...i)}))}});function Ji(e,t){return Ft(e.registerCommand(b.KEY_TAB_COMMAND,n=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;n.preventDefault();const s=function(a){const i=a.getNodes();if(Ai(i,h=>b.$isBlockElementNode(h)&&h.canIndent()?h:null).length>0)return!0;const c=a.anchor,d=a.focus,w=d.isBefore(c)?d:c,p=w.getNode(),f=Nr(p);if(f.canIndent()){const h=f.getKey();let u=b.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(o)?n.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),e.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const n=typeof t=="number"?t:t?t.peek():null;if(n==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>Nr(a).getIndent());return Math.max(...s)+1>=n},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(e,t,n)=>sn(t),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,n){const{disabled:o,maxIndent:s}=n.getOutput();return Gt(()=>{if(!o.value)return Ji(e,s)})}});const Wi=b.defineExtension({name:"@lexical/react/ReactProvider"});function Zi(){return b.$getRoot().getTextContent()}function Qi(e,t=!0){if(e)return!1;let n=Zi();return t&&(n=n.trim()),n===""}function tl(e){if(!Qi(e,!1))return!1;const t=b.$getRoot().getChildren(),n=t.length;if(n>1)return!1;for(let o=0;o<n;o++){const s=t[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const d=a[o];if(!b.$isTextNode(d))return!1}}}return!0}function Co(e){return()=>tl(e)}function So(e){const t=window.location.origin,n=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,f,h,u]=d;e.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const N=g.anchor;let k=N.getNode(),M=0,x=0;if(b.$isTextNode(k)&&w>=0&&p>=0&&(M=w,x=w+p,g.setTextNodeRange(k,M,k,x)),M===x&&f===""||(g.insertRawText(f),k=N.getNode()),b.$isTextNode(k)){M=h,x=h+u;const y=k.getTextContentSize();M=M>y?y:M,x=x>y?y:x,g.setTextNodeRange(k,M,k,x)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}b.defineExtension({build:(e,t,n)=>sn(t),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,n)=>Gt(()=>n.getOutput().disabled.value?void 0:So(e))});function el(e,...t){const n=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw n.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Gn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function nl({editor:e,ErrorBoundary:t}){return function(n,o){const[s,a]=l.useState(()=>n.getDecorators());return Gn(()=>n.registerDecoratorListener(i=>{gr.flushSync(()=>{a(i)})}),[n]),l.useEffect(()=>{a(n.getDecorators())},[n]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=r.jsx(o,{onError:h=>n._onError(h),children:r.jsx(l.Suspense,{fallback:null,children:s[w]})}),f=n.getElementByKey(w);f!==null&&i.push(gr.createPortal(p,f,w))}return i},[o,s,n])}(e,t)}function rl({editor:e,ErrorBoundary:t}){return function(n){const o=Ie.maybeFromEditor(n);if(o&&o.hasExtensionByName(Wi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&el(320,s);return!0}return!1}(e)?null:r.jsx(nl,{editor:e,ErrorBoundary:t})}function Rr(e){return e.getEditorState().read(Co(e.isComposing()))}function ol({contentEditable:e,placeholder:t=null,ErrorBoundary:n}){const[o]=Tt();return function(s){Gn(()=>Ft(jn.registerRichText(s),So(s)),[s])}(o),r.jsxs(r.Fragment,{children:[e,r.jsx(sl,{content:t}),r.jsx(rl,{editor:o,ErrorBoundary:n})]})}function sl({content:e}){const[t]=Tt(),n=function(s){const[a,i]=l.useState(()=>Rr(s));return Gn(()=>{function c(){const d=Rr(s);i(d)}return c(),Ft(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(t),o=Ri();return n?typeof e=="function"?e(o):e:null}function al({defaultSelection:e}){const[t]=Tt();return l.useEffect(()=>{t.focus(()=>{const n=document.activeElement,o=t.getRootElement();o===null||n!==null&&o.contains(n)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const il=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ll({onClear:e}){const[t]=Tt();return il(()=>vo(t,e),[t,e]),null}const Eo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function cl({editor:e,ariaActiveDescendant:t,ariaAutoComplete:n,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:u,className:g,id:N,role:k="textbox",spellCheck:M=!0,style:x,tabIndex:y,"data-testid":R,...L},_){const[S,T]=l.useState(e.isEditable()),C=l.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?e.setRootElement(P):e.setRootElement(null)},[e]),E=l.useMemo(()=>function(...P){return B=>{for(const F of P)typeof F=="function"?F(B):F!=null&&(F.current=B)}}(_,C),[C,_]);return Eo(()=>(T(e.isEditable()),e.registerEditableListener(P=>{T(P)})),[e]),r.jsx("div",{"aria-activedescendant":S?t:void 0,"aria-autocomplete":S?n:"none","aria-controls":S?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":S&&k==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":S?f:void 0,"aria-readonly":!S||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:S,"data-testid":R,id:N,ref:E,role:k,spellCheck:M,style:x,tabIndex:y,...L})}const wl=l.forwardRef(cl);function Mr(e){return e.getEditorState().read(Co(e.isComposing()))}const dl=l.forwardRef(pl);function pl(e,t){const{placeholder:n,...o}=e,[s]=Tt();return r.jsxs(r.Fragment,{children:[r.jsx(wl,{editor:s,...o,ref:t}),n!=null&&r.jsx(ul,{editor:s,content:n})]})}function ul({content:e,editor:t}){const n=function(i){const[c,d]=l.useState(()=>Mr(i));return Eo(()=>{function w(){const p=Mr(i);d(p)}return w(),Ft(i.registerUpdateListener(()=>{w()}),i.registerEditableListener(()=>{w()}))},[i]),c}(t),[o,s]=l.useState(t.isEditable());if(l.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(i=>{s(i)})),[t]),!n)return null;let a=null;return typeof e=="function"?a=e(o):e!==null&&(a=e),a===null?null:r.jsx("div",{"aria-hidden":!0,children:a})}function ml({placeholder:e,className:t,placeholderClassName:n}){return r.jsx(dl,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:r.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const To=l.createContext(void 0);function hl({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:n,setBlockType:o,showModal:s}),[e,t,n,o,s]);return r.jsx(To.Provider,{value:i,children:a})}function Ro(){const e=l.useContext(To);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function fl(){const[e,t]=l.useState(void 0),n=l.useCallback(()=>{t(void 0)},[]),o=l.useMemo(()=>{if(e===void 0)return;const{title:a,content:i}=e;return r.jsx(Ga,{open:!0,onOpenChange:n,children:r.jsxs(Xr,{children:[r.jsx(Ur,{children:r.jsx(qr,{children:a})}),i]})})},[e,n]),s=l.useCallback((a,i,c=!1)=>{t({closeOnClickOutside:c,content:i(n),title:a})},[n]);return[o,s]}function gl({children:e}){const[t]=Tt(),[n,o]=l.useState(t),[s,a]=l.useState("paragraph"),[i,c]=fl(),d=()=>{};return l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[n]),r.jsxs(hl,{activeEditor:n,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[i,e({blockType:s})]})}function bl(e){const[t]=Tt(),{activeEditor:n}=Ro();l.useEffect(()=>n.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&e(o),!1},b.COMMAND_PRIORITY_CRITICAL),[t,e]),l.useEffect(()=>{n.getEditorState().read(()=>{const o=b.$getSelection();o&&e(o)})},[n,e])}const Mo=Xt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),xl=l.forwardRef(({className:e,variant:t,size:n,...o},s)=>r.jsx(Gr.Root,{ref:s,className:m(Mo({variant:t,size:n,className:e})),...o}));xl.displayName=Gr.Root.displayName;const Do=l.createContext({size:"default",variant:"default"}),an=l.forwardRef(({className:e,variant:t,size:n,children:o,...s},a)=>{const i=ot();return r.jsx(nn.Root,{ref:a,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:i,children:r.jsx(Do.Provider,{value:{variant:t,size:n},children:o})})});an.displayName=nn.Root.displayName;const fe=l.forwardRef(({className:e,children:t,variant:n,size:o,...s},a)=>{const i=l.useContext(Do);return r.jsx(nn.Item,{ref:a,className:m(Mo({variant:i.variant||n,size:i.size||o}),e),...s,children:t})});fe.displayName=nn.Item.displayName;const Dr=[{format:"bold",icon:j.BoldIcon,label:"Bold"},{format:"italic",icon:j.ItalicIcon,label:"Italic"},{format:"underline",icon:j.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:j.StrikethroughIcon,label:"Strikethrough"}];function vl(){const{activeEditor:e}=Ro(),[t,n]=l.useState([]),o=l.useCallback(s=>{if(b.$isRangeSelection(s)||_a.$isTableSelection(s)){const a=[];Dr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),n(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return bl(o),r.jsx(an,{type:"multiple",value:t,onValueChange:n,variant:"outline",size:"sm",children:Dr.map(({format:s,icon:a,label:i})=>r.jsx(fe,{value:s,"aria-label":i,onClick:()=>{e.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:r.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function yl({onClear:e}){const[t]=Tt();l.useEffect(()=>{e&&e(()=>{t.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function Nl({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:n}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return r.jsxs("div",{className:"tw-relative",children:[r.jsx(gl,{children:()=>r.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:r.jsx(vl,{})})}),r.jsxs("div",{className:"tw-relative",children:[r.jsx(ol,{contentEditable:r.jsx("div",{ref:s,children:r.jsx(ml,{placeholder:e})}),ErrorBoundary:Si}),t&&r.jsx(al,{defaultSelection:"rootEnd"}),r.jsx(yl,{onClear:n}),r.jsx(ll,{})]})]})}const jl={namespace:"commentEditor",theme:$n,nodes:Bn,onError:e=>{console.error(e)}};function Mn({editorState:e,editorSerializedState:t,onChange:n,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i}){return r.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:r.jsx(yi,{initialConfig:{...jl,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:r.jsxs(St,{children:[r.jsx(Nl,{placeholder:s,autoFocus:a,onClear:i}),r.jsx(ji,{ignoreSelectionChange:!0,onChange:c=>{n==null||n(c),o==null||o(c.toJSON())}})]})})})}function kl(e,t){const n=b.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const a of n)if(!Oo.has(a.nodeName)){const i=Ao(a,e,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&i.insertAfter(b.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const d of c)i.insertBefore(d);i.remove()}}(s),o}function _l(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)Io(e,o[s],n,t);return n.innerHTML}function Io(e,t,n,o=null){let s=o===null||t.isSelected(o);const a=b.$isElementNode(t)&&t.excludeFromCopy("html");let i=t;o!==null&&b.$isTextNode(t)&&(i=Mi(o,t,"clone"));const c=b.$isElementNode(i)?i.getChildren():[],d=b.getRegisteredNode(e,i.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(e,i):i.exportDOM(e);const{element:p,after:f}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],N=Io(e,g,h,o);!s&&b.$isElementNode(t)&&N&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(h),n.append(p),f){const u=f.call(i,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else n.append(h);return s}const Oo=new Set(["STYLE","SCRIPT"]);function Ao(e,t,n,o,s=new Map,a){let i=[];if(Oo.has(e.nodeName))return i;let c=null;const d=function(g,N){const{nodeName:k}=g,M=N._htmlConversions.get(k.toLowerCase());let x=null;if(M!==void 0)for(const y of M){const R=y(g);R!==null&&(x===null||(x.priority||0)<=(R.priority||0))&&(x=R)}return x!==null?x.conversion:null}(e,t),w=d?d(e):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,N]of s)if(c=N(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(e.nodeName,w.forChild)}const f=e.childNodes;let h=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)h.push(...Ao(f[g],t,n,u,new Map(s),c));return p!=null&&(h=p(h)),b.isBlockDomNode(e)&&(h=Cl(e,h,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return n.push(g),g}:b.$createParagraphNode)),c==null?h.length>0?i=i.concat(h):b.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(e)&&(i=i.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...h),i}function Cl(e,t,n){const o=e.style.textAlign,s=[];let a=[];for(let i=0;i<t.length;i++){const c=t[i];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===t.length-1||i<t.length-1&&b.$isBlockElementNode(t[i+1])){const d=n();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function Sl(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const n=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),n==null||n.removeAllRanges(),n==null||n.addRange(o),!0}function Pt(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?e.root.children.some(n=>n!=null&&n.children?n.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function El(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),n=$r.createHeadlessEditor({namespace:"EditorUtils",theme:$n,nodes:Bn,onError:s=>{console.error(s)}});let o;if(n.update(()=>{const a=new DOMParser().parseFromString(t,"text/html"),i=kl(n,a);b.$getRoot().clear(),b.$insertNodes(i)},{discrete:!0}),n.getEditorState().read(()=>{o=n.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function Dn(e){const t=$r.createHeadlessEditor({namespace:"EditorUtils",theme:$n,nodes:Bn,onError:s=>{console.error(s)}}),n=t.parseEditorState(JSON.stringify(e));t.setEditorState(n);let o="";return t.getEditorState().read(()=>{o=_l(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Lo(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}const Po=Xt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),xe=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,className:m("pr-twp",Po({variant:t}),e),...n}));xe.displayName="Badge";const Kn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Kn.displayName="Card";const Vo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Vo.displayName="CardHeader";const $o=l.forwardRef(({className:e,...t},n)=>r.jsx("h3",{ref:n,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));$o.displayName="CardTitle";const Bo=l.forwardRef(({className:e,...t},n)=>r.jsx("p",{ref:n,className:m("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Bo.displayName="CardDescription";const Hn=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-p-6 tw-pt-0",e),...t}));Hn.displayName="CardContent";const zo=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));zo.displayName="CardFooter";const re=l.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...o},s)=>r.jsx(Kr.Root,{ref:s,decorative:n,orientation:t,className:m("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));re.displayName=Kr.Root.displayName;const Xn=l.forwardRef(({className:e,...t},n)=>r.jsx(Ne.Root,{ref:n,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));Xn.displayName=Ne.Root.displayName;const Fo=l.forwardRef(({className:e,...t},n)=>r.jsx(Ne.Image,{ref:n,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));Fo.displayName=Ne.Image.displayName;const Un=l.forwardRef(({className:e,...t},n)=>r.jsx(Ne.Fallback,{ref:n,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));Un.displayName=Ne.Fallback.displayName;const qn=l.createContext(void 0);function yt(){const e=l.useContext(qn);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const Ot=Xt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),we=J.Trigger,Yn=J.Group,Go=J.Portal,Ko=J.Sub,Ho=J.RadioGroup;function Yt({variant:e="default",...t}){const n=l.useMemo(()=>({variant:e}),[e]);return r.jsx(qn.Provider,{value:n,children:r.jsx(J.Root,{...t})})}const Jn=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=yt();return r.jsxs(J.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,Ot({variant:a.variant})),...o,children:[n,r.jsx(j.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Jn.displayName=J.SubTrigger.displayName;const Wn=l.forwardRef(({className:e,...t},n)=>r.jsx(J.SubContent,{ref:n,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Wn.displayName=J.SubContent.displayName;const At=l.forwardRef(({className:e,sideOffset:t=4,children:n,...o},s)=>{const a=ot();return r.jsx(J.Portal,{children:r.jsx(J.Content,{ref:s,sideOffset:t,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:r.jsx("div",{dir:a,children:n})})})});At.displayName=J.Content.displayName;const Pe=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=ot(),a=yt();return r.jsx(J.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,Ot({variant:a.variant})),...n,dir:s})});Pe.displayName=J.Item.displayName;const Dt=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=yt();return r.jsxs(J.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ot({variant:a.variant})),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(J.ItemIndicator,{children:r.jsx(j.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Dt.displayName=J.CheckboxItem.displayName;const Zn=l.forwardRef(({className:e,children:t,...n},o)=>{const s=yt();return r.jsxs(J.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ot({variant:s.variant})),...n,children:[r.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:r.jsx(J.ItemIndicator,{children:r.jsx(j.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Zn.displayName=J.RadioItem.displayName;const _e=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(J.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));_e.displayName=J.Label.displayName;const de=l.forwardRef(({className:e,...t},n)=>r.jsx(J.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));de.displayName=J.Separator.displayName;function Xo({className:e,...t}){return r.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}Xo.displayName="DropdownMenuShortcut";function Ir({comment:e,isReply:t=!1,isEditable:n=!1,localizedStrings:o,isThreadExpanded:s=!1,threadStatus:a="Unspecified",handleResolveCommentThread:i,handleUpdateComment:c,handleDeleteComment:d,onEditingChange:w}){const[p,f]=l.useState(!1),[h,u]=l.useState(),g=l.useRef(null);l.useEffect(()=>{if(!p)return;let _=!0;const S=g.current;if(!S)return;const T=setTimeout(()=>{_&&Sl(S)},300);return()=>{_=!1,clearTimeout(T)}},[p]);const N=l.useCallback(()=>{f(!1),u(void 0),w==null||w(!1)},[w]),k=l.useCallback(async()=>{if(!h||!c)return;await c(e.id,Dn(h))&&(f(!1),u(void 0),w==null||w(!1))},[h,c,e.id,w]),M=l.useMemo(()=>{const _=new Date(e.date),S=v.formatRelativeDate(_,o["%comment_date_today%"],o["%comment_date_yesterday%"]),T=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return v.formatReplacementString(o["%comment_dateAtTime%"],{date:S,time:T})},[e.date,o]),x=l.useMemo(()=>e.user,[e.user]),y=l.useMemo(()=>e.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[e.user]),R=l.useMemo(()=>v.sanitizeHtml(v.parseParatextHtml(e.contents)),[e.contents]),L=l.useMemo(()=>{if(s&&n)return r.jsxs(r.Fragment,{children:[!v.hasCustomParatextTags(e.contents)&&r.jsxs(Pe,{onClick:()=>{f(!0),u(El(v.parseParatextHtml(e.contents))),w==null||w(!0)},children:[r.jsx(j.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),o["%comment_editComment%"]]}),r.jsxs(Pe,{onClick:async()=>{d&&await d(e.id)},children:[r.jsx(j.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),o["%comment_deleteComment%"]]})]})},[n,s,o,e.contents,e.id,d,w]);return r.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[r.jsx(Xn,{className:"tw-h-8 tw-w-8",children:r.jsx(Un,{className:"tw-text-xs tw-font-medium",children:y})}),r.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[r.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[r.jsx("p",{className:"tw-text-sm tw-font-medium",children:x}),r.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:M})]}),p&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:g,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),N()):_.key==="Enter"&&_.shiftKey&&(_.preventDefault(),_.stopPropagation(),Pt(h)&&k())},onKeyDown:_=>{Lo(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},children:[r.jsx(Mn,{editorSerializedState:h,onSerializedChange:_=>u(_)}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[r.jsx($,{size:"icon",onClick:N,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:r.jsx(j.X,{})}),r.jsx($,{size:"icon",onClick:k,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(h),children:r.jsx(j.ArrowUp,{})})]})]}),!p&&r.jsxs(r.Fragment,{children:[e.status==="Resolved"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:o["%comment_status_resolved%"]}),e.status==="Todo"&&r.jsx("div",{className:"tw-text-sm tw-italic",children:o["%comment_status_todo%"]}),r.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!s}),dangerouslySetInnerHTML:{__html:R}})]})]}),s&&!t&&a!=="Resolved"&&i&&r.jsx($,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:_=>{_.stopPropagation(),i(e.thread,!0)},children:r.jsx(j.Check,{})}),L&&r.jsxs(Yt,{children:[r.jsx(we,{asChild:!0,children:r.jsx($,{variant:"ghost",size:"icon",children:r.jsx(j.MoreHorizontal,{})})}),r.jsx(At,{align:"end",children:L})]})]})}const bn={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Tl({comments:e,localizedStrings:t,isSelected:n=!1,verseRef:o,assignedUser:s,currentUser:a,handleSelectThread:i,threadId:c,threadStatus:d,handleResolveCommentThread:w,handleAddComment:p,handleUpdateComment:f,handleDeleteComment:h}){const[u,g]=l.useState(bn),[N,k]=l.useState(!1),[M,x]=l.useState(!1),[y,R]=l.useState(!1),[L,_]=l.useState(!1),S=l.useMemo(()=>e.filter(O=>!O.deleted),[e]),T=l.useMemo(()=>S[0],[S]),C=l.useRef(null),E=l.useRef(void 0);l.useEffect(()=>{const O=C.current;if(!O)return;const tt=()=>{x(O.scrollWidth>O.clientWidth)};return tt(),window.addEventListener("resize",tt),()=>window.removeEventListener("resize",tt)},[T==null?void 0:T.verse]),l.useEffect(()=>{R(!1)},[n]);const P=l.useMemo(()=>({singleReply:t["%comment_thread_single_reply%"],multipleReplies:t["%comment_thread_multiple_replies%"]}),[t]),B=l.useMemo(()=>s?v.formatReplacementString(t["%comment_assigned_to%"],{assignedUser:s}):void 0,[s,t]),F=l.useMemo(()=>S.slice(1),[S]),I=l.useMemo(()=>F.length??0,[F.length]),q=l.useMemo(()=>I>0,[I]),A=l.useMemo(()=>y||I<=2?F:F.slice(-2),[F,I,y]),Y=l.useMemo(()=>y||I<=2?0:I-2,[I,y]),gt=l.useMemo(()=>I===1?P.singleReply:v.formatReplacementString(P.multipleReplies,{count:I}),[I,P]),Lt=l.useMemo(()=>Y===1?P.singleReply:v.formatReplacementString(P.multipleReplies,{count:Y}),[Y,P]),Nt=l.useCallback(async()=>{var tt;await p(c,Dn(u))&&((tt=E.current)==null||tt.call(E),g(bn))},[u,p,c]),V=l.useCallback(async(O,tt)=>{var Ce;if(!w)return!1;const st=Pt(u)?Dn(u):void 0,ft=await w(O,tt,st);return ft&&st&&((Ce=E.current)==null||Ce.call(E),g(bn)),ft},[u,w]);return r.jsx(Kn,{role:"option","aria-selected":n,id:c,className:m("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!n},{"tw-bg-primary-foreground":!n&&d!=="Resolved","tw-bg-background":n&&d!=="Resolved","tw-bg-muted":d==="Resolved"}),onClick:()=>{i(c)},tabIndex:-1,children:r.jsxs(Hn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[r.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[B&&r.jsx(xe,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:B}),r.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[r.jsxs("p",{ref:C,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":N},{"tw-whitespace-nowrap":!N}),children:[o," ",T.verse]}),M&&r.jsx($,{variant:"ghost",size:"icon",onClick:O=>{O.stopPropagation(),k(!N)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":N?"Collapse text":"Expand text",children:N?r.jsx(j.ChevronUp,{}):r.jsx(j.ChevronDown,{})})]}),r.jsx(Ir,{comment:T,localizedStrings:t,isThreadExpanded:n,threadStatus:d,isEditable:S.length===1&&(T==null?void 0:T.user)===a,handleResolveCommentThread:V,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:_})]}),r.jsxs(r.Fragment,{children:[q&&!n&&r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(re,{})}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:gt})]}),!n&&Pt(u)&&r.jsx(Mn,{editorSerializedState:u,onSerializedChange:O=>g(O),placeholder:t["%comment_replyOrAssign%"]}),n&&r.jsxs(r.Fragment,{children:[Y>0&&r.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:O=>{O.stopPropagation(),R(!0)},role:"button",tabIndex:0,onKeyDown:O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),O.stopPropagation(),R(!0))},children:[r.jsx("div",{className:"tw-w-8",children:r.jsx(re,{})}),r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Lt}),y?r.jsx(j.ChevronUp,{}):r.jsx(j.ChevronDown,{})]})]}),A.map(O=>{const st=O.id===F[F.length-1].id&&O.user===a;return r.jsx("div",{children:r.jsx(Ir,{comment:O,localizedStrings:t,isReply:!0,isThreadExpanded:n,isEditable:st,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:_})},O.id)}),(!L||Pt(u))&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:O=>O.stopPropagation(),onKeyDownCapture:O=>{O.key==="Enter"&&O.shiftKey&&(O.preventDefault(),O.stopPropagation(),Pt(u)&&Nt())},onKeyDown:O=>{Lo(O),(O.key==="Enter"||O.key===" ")&&O.stopPropagation()},children:[r.jsx(Mn,{editorSerializedState:u,onSerializedChange:O=>g(O),placeholder:d==="Resolved"?t["%comment_reopenResolved%"]:t["%comment_replyOrAssign%"],autoFocus:!0,onClear:O=>{E.current=O}}),r.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[r.jsx($,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(u),children:r.jsx(j.AtSign,{})}),r.jsx($,{size:"icon",onClick:Nt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(u),children:r.jsx(j.ArrowUp,{})})]})]})]})]})]})})}function Rl({className:e="",threads:t,currentUser:n,localizedStrings:o,handleAddComment:s,handleResolveCommentThread:a,handleUpdateComment:i,handleDeleteComment:c}){const[d,w]=l.useState(),p=t.filter(x=>x.comments.some(y=>!y.deleted)),f=p.map(x=>({id:x.id})),h=l.useCallback(x=>{w(x.id)},[]),u=l.useCallback(x=>{w(x)},[]),{listboxRef:g,activeId:N,handleKeyDown:k}=co({options:f,onOptionSelect:h}),M=l.useCallback(x=>{x.key==="Escape"?(w(void 0),x.preventDefault(),x.stopPropagation()):k(x)},[k]);return r.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:g,"aria-activedescendant":N??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:M,children:p.map(x=>r.jsx("div",{className:m({"tw-opacity-60":x.status==="Resolved"}),children:r.jsx(Tl,{comments:x.comments,localizedStrings:o,verseRef:x.verseRef,handleSelectThread:u,threadId:x.id,isSelected:d===x.id,currentUser:n,assignedUser:x.assignedUser,threadStatus:x.status,handleAddComment:s,handleResolveCommentThread:a,handleUpdateComment:i,handleDeleteComment:c})},x.id))})}function Ml({table:e}){return r.jsxs(Yt,{children:[r.jsx(Br.DropdownMenuTrigger,{asChild:!0,children:r.jsxs($,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[r.jsx(j.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),r.jsxs(At,{align:"end",className:"tw-w-[150px]",children:[r.jsx(_e,{children:"Toggle columns"}),r.jsx(de,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>r.jsx(Dt,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const oe=Q.Root,Uo=Q.Group,se=Q.Value,qo=Xt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Kt=l.forwardRef(({className:e,children:t,size:n,...o},s)=>{const a=ot();return r.jsxs(Q.Trigger,{className:m(qo({size:n,className:e})),ref:s,...o,dir:a,children:[t,r.jsx(Q.Icon,{asChild:!0,children:r.jsx(j.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Kt.displayName=Q.Trigger.displayName;const Qn=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.ScrollUpButton,{ref:n,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(j.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Qn.displayName=Q.ScrollUpButton.displayName;const tr=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.ScrollDownButton,{ref:n,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:r.jsx(j.ChevronDown,{className:"tw-h-4 tw-w-4"})}));tr.displayName=Q.ScrollDownButton.displayName;const Ht=l.forwardRef(({className:e,children:t,position:n="popper",...o},s)=>{const a=ot();return r.jsx(Q.Portal,{children:r.jsxs(Q.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...o,children:[r.jsx(Qn,{}),r.jsx(Q.Viewport,{className:m("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:r.jsx("div",{dir:a,children:t})}),r.jsx(tr,{})]})})});Ht.displayName=Q.Content.displayName;const Yo=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.Label,{ref:n,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Yo.displayName=Q.Label.displayName;const ht=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(Q.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Q.ItemIndicator,{children:r.jsx(j.Check,{className:"tw-h-4 tw-w-4"})})}),r.jsx(Q.ItemText,{children:t})]}));ht.displayName=Q.Item.displayName;const Jo=l.forwardRef(({className:e,...t},n)=>r.jsx(Q.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Jo.displayName=Q.Separator.displayName;function Dl({table:e}){return r.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[r.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),r.jsxs(oe,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[r.jsx(Kt,{className:"tw-h-8 tw-w-[70px]",children:r.jsx(se,{placeholder:e.getState().pagination.pageSize})}),r.jsx(Ht,{side:"top",children:[10,20,30,40,50].map(t=>r.jsx(ht,{value:`${t}`,children:t},t))})]})]}),r.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),r.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[r.jsxs($,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),r.jsx(j.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs($,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),r.jsx(j.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs($,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),r.jsx(j.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),r.jsxs($,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[r.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),r.jsx(j.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Or=`
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
`;function Il(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Ve(e,t){const n=t?`${Or}, ${t}`:Or;return Array.from(e.querySelectorAll(n)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Il(o))}const ze=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Ve(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Ve(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return r.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:r.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...n})})});ze.displayName="Table";const Fe=l.forwardRef(({className:e,stickyHeader:t,...n},o)=>r.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));Fe.displayName="TableHeader";const Ge=l.forwardRef(({className:e,...t},n)=>r.jsx("tbody",{ref:n,className:m("[&_tr:last-child]:tw-border-0",e),...t}));Ge.displayName="TableBody";const Wo=l.forwardRef(({className:e,...t},n)=>r.jsx("tfoot",{ref:n,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Wo.displayName="TableFooter";function Ol(e){l.useEffect(()=>{const t=e.current;if(!t)return;const n=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?Ve(e.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",n),()=>{t.removeEventListener("keydown",n)}},[e])}function Al(e,t,n){let o;return n==="ArrowLeft"&&t>0?o=e[t-1]:n==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ll(e,t,n){let o;return n==="ArrowDown"&&t<e.length-1?o=e[t+1]:n==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Ct=l.forwardRef(({className:e,onKeyDown:t,onSelect:n,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Ol(i);const c=l.useMemo(()=>i.current?Ve(i.current):[],[i]),d=l.useCallback(p=>{const{current:f}=i;if(!f||!f.parentElement)return;const h=f.closest("table"),u=h?Ve(h).filter(k=>k.tagName==="TR"):[],g=u.indexOf(f),N=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Ll(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Al(c,N,p.key);else if(p.key==="Escape"){p.preventDefault();const k=f.closest("table");k&&k.focus()}t==null||t(p)},[i,c,t]),w=l.useCallback(p=>{o&&(n==null||n(p))},[o,n]);return r.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:d,onFocus:w,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Ct.displayName="TableRow";const ve=l.forwardRef(({className:e,...t},n)=>r.jsx("th",{ref:n,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));ve.displayName="TableHead";const zt=l.forwardRef(({className:e,...t},n)=>r.jsx("td",{ref:n,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));zt.displayName="TableCell";const Zo=l.forwardRef(({className:e,...t},n)=>r.jsx("caption",{ref:n,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Zo.displayName="TableCaption";function Je({className:e,...t}){return r.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function Qo({columns:e,data:t,enablePagination:n=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var _;const[p,f]=l.useState([]),[h,u]=l.useState([]),[g,N]=l.useState({}),[k,M]=l.useState({}),x=l.useMemo(()=>t??[],[t]),y=ct.useReactTable({data:x,columns:e,getCoreRowModel:ct.getCoreRowModel(),...n&&{getPaginationRowModel:ct.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:ct.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:ct.getFilteredRowModel(),onColumnVisibilityChange:N,onRowSelectionChange:M,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:k}}),R=y.getVisibleFlatColumns();let L;return d?L=Array.from({length:10}).map((C,E)=>`skeleton-row-${E}`).map(C=>r.jsx(Ct,{children:r.jsx(zt,{colSpan:R.length??e.length,className:"tw-border-0 tw-p-0",children:r.jsx("div",{className:"tw-w-full tw-py-2",children:r.jsx(Je,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},C)):((_=y.getRowModel().rows)==null?void 0:_.length)>0?L=y.getRowModel().rows.map(S=>r.jsx(Ct,{onClick:()=>i(S,y),"data-state":S.getIsSelected()&&"selected",children:S.getVisibleCells().map(T=>r.jsx(zt,{children:ct.flexRender(T.column.columnDef.cell,T.getContext())},T.id))},S.id)):L=r.jsx(Ct,{children:r.jsx(zt,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:w})}),r.jsxs("div",{className:"pr-twp",id:c,children:[s&&r.jsx(Ml,{table:y}),r.jsxs(ze,{stickyHeader:a,children:[r.jsx(Fe,{stickyHeader:a,children:y.getHeaderGroups().map(S=>r.jsx(Ct,{children:S.headers.map(T=>r.jsx(ve,{children:T.isPlaceholder?void 0:ct.flexRender(T.column.columnDef.header,T.getContext())},T.id))},S.id))}),r.jsx(Ge,{children:L})]}),n&&r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[r.jsx($,{variant:"outline",size:"sm",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:"Previous"}),r.jsx($,{variant:"outline",size:"sm",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:"Next"})]}),n&&o&&r.jsx(Dl,{table:y})]})}function Pl({id:e,markdown:t,className:n,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return r.jsx("div",{id:e,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},n),children:r.jsx(Ma,{options:a,children:t})})}const ts=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Ar=(e,t)=>e[t]??t;function es({errorDetails:e,handleCopyNotify:t,localizedStrings:n,id:o}){const s=Ar(n,"%webView_error_dump_header%"),a=Ar(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),t&&t()}return r.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[r.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[r.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[r.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),r.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),r.jsx($,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:r.jsx(j.Copy,{})})]}),r.jsx("div",{className:"tw-prose tw-w-full",children:r.jsx("pre",{className:"tw-text-xs",children:e})})]})}const Vl=Object.freeze([...ts,"%webView_error_dump_copied_message%"]);function $l({errorDetails:e,handleCopyNotify:t,localizedStrings:n,children:o,className:s,id:a}){const[i,c]=l.useState(!1),d=()=>{c(!0),t&&t()},w=p=>{p||c(!1)};return r.jsxs(le,{onOpenChange:w,children:[r.jsx(ce,{asChild:!0,children:o}),r.jsxs(qt,{id:a,className:m("tw-min-w-80 tw-max-w-96",s),children:[i&&n["%webView_error_dump_copied_message%"]&&r.jsx(nt,{children:n["%webView_error_dump_copied_message%"]}),r.jsx(es,{errorDetails:e,handleCopyNotify:d,localizedStrings:n})]})]})}var ns=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(ns||{});function Bl({id:e,label:t,groups:n}){const[o,s]=l.useState(Object.fromEntries(n.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,i]=l.useState({}),c=(w,p)=>{const f=!o[w][p];s(u=>(u[w][p]=f,{...u}));const h=n[w].items[p];h.onUpdate(h.id,f)},d=(w,p)=>{i(h=>(h[w]=p,{...h}));const f=n[w].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return r.jsx("div",{id:e,children:r.jsxs(Yt,{children:[r.jsx(we,{asChild:!0,children:r.jsxs($,{variant:"default",children:[r.jsx(j.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,r.jsx(j.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),r.jsx(At,{children:n.map((w,p)=>r.jsxs("div",{children:[r.jsx(_e,{children:w.label}),r.jsx(Yn,{children:w.itemType===0?r.jsx(r.Fragment,{children:w.items.map((f,h)=>r.jsx("div",{children:r.jsx(Dt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:f.label})},f.id))}):r.jsx(Ho,{value:a[p],onValueChange:f=>d(p,f),children:w.items.map(f=>r.jsx("div",{children:r.jsx(Zn,{value:f.id,children:f.label})},f.id))})}),r.jsx(de,{})]},w.label))})]})})}function zl({id:e,category:t,downloads:n,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const d=new v.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((p,f)=>p+f,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return r.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[r.jsx("div",{className:"tw-flex",children:r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsxs("div",{className:"tw-flex tw-gap-1",children:[r.jsx(j.User,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),r.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[r.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>r.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&r.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs($,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",r.jsx(j.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&r.jsx("div",{className:"tw-flex tw-gap-1",children:r.jsxs($,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",r.jsx(j.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Fl({id:e,versionHistory:t}){const[n,o]=l.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,f=w.getUTCMonth(),h=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const i=Object.entries(t).sort((c,d)=>d[0].localeCompare(c[0]));return r.jsxs("div",{className:"pr-twp",id:e,children:[r.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),r.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(c=>r.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[r.jsx("div",{className:"tw-text-foreground",children:r.jsx("li",{className:"tw-prose tw-text-xs",children:r.jsx("span",{children:c[1].description})})}),r.jsxs("div",{className:"tw-justify-end tw-text-right",children:[r.jsxs("div",{children:["Version ",c[0]]}),r.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&r.jsx("button",{type:"button",onClick:()=>o(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Gl({id:e,publisherDisplayName:t,fileSize:n,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>v.formatBytes(n),[n]),d=(w=>{const p=new Intl.DisplayNames(v.getCurrentLocale(),{type:"language"});return w.map(f=>p.of(f))})(o);return r.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&r.jsx(Fl,{versionHistory:s}),r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[r.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),r.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Publisher"}),r.jsx("span",{className:"tw-font-semibold",children:t}),r.jsx("span",{children:"Size"}),r.jsx("span",{className:"tw-font-semibold",children:i})]}),r.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:r.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[r.jsx("span",{children:"Version"}),r.jsx("span",{className:"tw-font-semibold",children:a}),r.jsx("span",{children:"Languages"}),r.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function rs({entries:e,selected:t,onChange:n,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:N="ghost",id:k}){const[M,x]=l.useState(!1),y=l.useCallback(E=>{var B;const P=(B=e.find(F=>F.label===E))==null?void 0:B.value;P&&n(t.includes(P)?t.filter(F=>F!==P):[...t,P])},[e,t,n]),R=()=>d||o,L=l.useMemo(()=>{if(!h)return e;const E=e.filter(B=>B.starred).sort((B,F)=>B.label.localeCompare(F.label)),P=e.filter(B=>!B.starred).sort((B,F)=>{const I=t.includes(B.value),q=t.includes(F.value);return I&&!q?-1:!I&&q?1:B.label.localeCompare(F.label)});return[...E,...P]},[e,t,h]),_=()=>{n(e.map(E=>E.value))},S=()=>{n([])},T=w??M,C=p??x;return r.jsx("div",{id:k,className:g,children:r.jsxs(le,{open:T,onOpenChange:C,children:[r.jsx(ce,{asChild:!0,children:r.jsxs($,{variant:N,role:"combobox","aria-expanded":T,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[r.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&r.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:r.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),r.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:R()})]}),r.jsx(j.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(qt,{align:"start",className:"tw-w-full tw-p-0",children:r.jsxs(ae,{children:[r.jsx(je,{placeholder:`Search ${o.toLowerCase()}...`}),s&&r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx($,{variant:"ghost",size:"sm",onClick:_,children:a}),r.jsx($,{variant:"ghost",size:"sm",onClick:S,children:i})]}),r.jsxs(ie,{children:[r.jsx(Be,{children:c}),r.jsx(It,{children:L.map(E=>r.jsxs(Ut,{value:E.label,onSelect:y,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx("div",{className:"w-4",children:r.jsx(j.Check,{className:m("tw-h-4 tw-w-4",t.includes(E.value)?"tw-opacity-100":"tw-opacity-0")})}),E.starred&&r.jsx(j.Star,{className:"tw-h-4 tw-w-4"}),r.jsx("div",{className:"tw-flex-grow",children:E.label}),E.secondaryLabel&&r.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:E.secondaryLabel})]},E.label))})]})]})})]})})}function Kl({entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:f}){return r.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[r.jsx(rs,{entries:e,selected:t,onChange:n,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:d,className:w}),t.length>0?r.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(h=>{var u;return r.jsxs(xe,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[r.jsx($,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(t.filter(g=>g!==h)),children:r.jsx(j.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===h))==null?void 0:u.label]},h)})}):r.jsx(nt,{children:p})]})}const pe=l.forwardRef(({className:e,type:t,...n},o)=>r.jsx("input",{type:t,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...n}));pe.displayName="Input";const Hl=(e,t,n)=>e==="generated"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?r.jsxs(r.Fragment,{children:[r.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):r.jsxs(r.Fragment,{children:[r.jsx("p",{children:n})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function Xl({callerType:e,updateCallerType:t,customCaller:n,updateCustomCaller:o,localizedStrings:s}){const[a,i]=l.useState(e),[c,d]=l.useState(n);l.useEffect(()=>{i(e)},[e]),l.useEffect(()=>{c!==n&&d(n)},[n]);const w=p=>{p||(a!=="custom"||c?(t(a),o(c)):(i(e),d(n)))};return r.jsxs(Yt,{onOpenChange:w,children:[r.jsx(St,{children:r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:r.jsx(we,{asChild:!0,children:r.jsx($,{variant:"outline",className:"tw-h-6",children:Hl(e,s,n)})})}),r.jsx(Et,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),r.jsxs(At,{className:"tw-z-[300]",children:[r.jsx(_e,{children:s["%footnoteEditor_callerDropdown_label%"]}),r.jsx(de,{}),r.jsx(Dt,{checked:a==="generated",onCheckedChange:()=>i("generated"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:bt.GENERATOR_NOTE_CALLER})]})}),r.jsx(Dt,{checked:a==="hidden",onCheckedChange:()=>i("hidden"),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),r.jsx("span",{className:"tw-w-10 tw-text-center",children:bt.HIDDEN_NOTE_CALLER})]})}),r.jsx(Dt,{checked:a==="custom",onCheckedChange:()=>i("custom"),onSelect:p=>p.preventDefault(),children:r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[r.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),r.jsx(pe,{className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:c,maxLength:1,onChange:p=>d(p.target.value)})]})})]})]})}const Ul=(e,t)=>e==="f"?r.jsxs(r.Fragment,{children:[r.jsx(j.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?r.jsxs(r.Fragment,{children:[r.jsx(j.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):r.jsxs(r.Fragment,{children:[r.jsx(j.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),ql=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let n=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(n=t["%footnoteEditor_noteType_footnote_label%"]),v.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:n})};function Yl({noteType:e,handleNoteTypeChange:t,localizedStrings:n}){return r.jsxs(Yt,{children:[r.jsx(St,{children:r.jsxs(Mt,{children:[r.jsx(Vr.TooltipTrigger,{asChild:!0,children:r.jsx(we,{asChild:!0,children:r.jsx($,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:e==="x",children:Ul(e,n)})})}),r.jsx(Et,{children:r.jsx("p",{children:ql(e,n)})})]})}),e!=="x"&&r.jsxs(At,{className:"tw-z-[300]",children:[r.jsx(_e,{children:n["%footnoteEditor_noteTypeDropdown_label%"]}),r.jsx(de,{}),r.jsxs(Dt,{checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[r.jsx(j.FunctionSquare,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_footnote_label%"]})]}),r.jsxs(Dt,{checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[r.jsx(j.SquareSigma,{}),r.jsx("span",{children:n["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Jl({noteOps:e,onSave:t,onClose:n,scrRef:o,noteKey:s,editorOptions:a,localizedStrings:i}){const c=l.useRef(null),d=l.createRef(),[w,p]=l.useState("generated"),[f,h]=l.useState("*"),[u,g]=l.useState("f"),N=l.useMemo(()=>({...a,markerMenuTrigger:a.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...a.view??bt.getDefaultViewOptions(),noteMode:"expanded"}}),[a]);l.useEffect(()=>{var y;(y=c.current)==null||y.focus()}),l.useEffect(()=>{var L,_;let y;const R=e==null?void 0:e.at(0);if(R&&bt.isInsertEmbedOpOfType("note",R)){const S=(L=R.insert.note)==null?void 0:L.caller;let T="custom";S===bt.GENERATOR_NOTE_CALLER?T="generated":S===bt.HIDDEN_NOTE_CALLER?T="hidden":S&&h(S),p(T),g(((_=R.insert.note)==null?void 0:_.style)??"f"),R.insert.note&&(R.insert.note.caller=""),y=setTimeout(()=>{var C;(C=c.current)==null||C.applyUpdate([{delete:1},R])},0)}return()=>{y&&clearTimeout(y)}},[e,s]);const k=l.useCallback(()=>{var R,L;const y=(L=(R=c.current)==null?void 0:R.getNoteOps(0))==null?void 0:L.at(0);y&&bt.isInsertEmbedOpOfType("note",y)&&(y.insert.note&&(w==="custom"?y.insert.note.caller=f:y.insert.note.caller=w==="generated"?bt.GENERATOR_NOTE_CALLER:bt.HIDDEN_NOTE_CALLER),t([y]))},[w,f,t]),M=()=>{var R;const y=(R=d.current)==null?void 0:R.getElementsByClassName("editor-input")[0];y!=null&&y.textContent&&navigator.clipboard.writeText(y.textContent)},x=y=>{var L,_,S;g(y);const R=(_=(L=c.current)==null?void 0:L.getNoteOps(0))==null?void 0:_.at(0);R&&bt.isInsertEmbedOpOfType("note",R)&&(R.insert.note&&(R.insert.note.style=y),(S=c.current)==null||S.applyUpdate([{delete:1},R]))};return r.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[r.jsxs("div",{className:"tw-flex",children:[r.jsxs("div",{className:"tw-flex tw-gap-4",children:[r.jsx(Yl,{noteType:u,handleNoteTypeChange:x,localizedStrings:i}),r.jsx(Xl,{callerType:w,updateCallerType:p,customCaller:f,updateCustomCaller:h,localizedStrings:i})]}),r.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[r.jsx(St,{children:r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:r.jsx($,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:r.jsx(j.X,{})})}),r.jsx(Et,{children:r.jsx("p",{children:i["%footnoteEditor_cancelButton_tooltip%"]})})]})}),r.jsx(St,{children:r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:r.jsx($,{onClick:k,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:r.jsx(j.Check,{})})}),r.jsx(Et,{children:i["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),r.jsxs("div",{ref:d,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[r.jsx(bt.Editorial,{options:N,onScrRefChange:()=>{},scrRef:o,ref:c}),r.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:r.jsx(St,{children:r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:r.jsx($,{onClick:M,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:r.jsx(j.Copy,{})})}),r.jsx(Et,{children:r.jsx("p",{children:i["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Wl=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function os(e,t){if(!t||t.length===0)return e??"empty";const n=t.find(s=>typeof s=="string");if(n)return`key-${e??"unknown"}-${n.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function Zl(e,t,n=!0,o=void 0){if(!t||t.length===0)return;const s=[],a=[];let i=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,d)=>{const w=d===a.length-1;return r.jsxs("p",{children:[er(e,c,n,!0,s),w&&o]},os(e,c))})}function er(e,t,n=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(a=>{if(typeof a=="string"){const i=`${e}-text-${a.slice(0,10)}`;if(o){const c=m(`usfm_${e}`);return r.jsx("span",{className:c,children:a},i)}return r.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[r.jsx(j.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),r.jsx("span",{children:a}),r.jsx(j.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return Ql(a,os(`${e}\\${a.marker}`,[a]),n,[...s,e??"unknown"])})}function Ql(e,t,n,o=[]){const{marker:s}=e;return r.jsxs("span",{children:[s?n&&r.jsx("span",{className:"marker",children:`\\${s} `}):r.jsx(j.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),er(s,e.content,n,!0,[...o,s??"unknown"])]},t)}function ss({footnote:e,layout:t="horizontal",formatCaller:n,showMarkers:o=!0}){const s=n?n(e.caller):e.caller,a=s!==e.caller;let i,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([i,...c]=e.content);const d=o?r.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,w=o?r.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=s&&r.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),f=i&&r.jsxs(r.Fragment,{children:[er(e.marker,[i],o,!1)," "]}),h=t==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=t==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",N=m(h,u);return r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",N),children:[d,p]}),r.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",N),children:f}),r.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,N),children:c&&c.length>0&&r.jsx(r.Fragment,{children:Zl(e.marker,c,o,w)})})]})}function tc({className:e,classNameForItems:t,footnotes:n,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??v.getFormatCallerFunction(n,void 0),f=(x,y)=>{w==null||w(x,y,s)},h=a?n.findIndex(x=>x===a):0,[u,g]=l.useState(h),N=(x,y,R)=>{if(n.length)switch(x.key){case"Enter":case" ":x.preventDefault(),w==null||w(y,R,s);break}},k=x=>{if(n.length)switch(x.key){case"ArrowDown":x.preventDefault(),g(y=>Math.min(y+1,n.length-1));break;case"ArrowUp":x.preventDefault(),g(y=>Math.max(y-1,0));break}},M=l.useRef([]);return l.useEffect(()=>{var x;u>=0&&u<M.current.length&&((x=M.current[u])==null||x.focus())},[u]),r.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:m("tw-h-full tw-overflow-y-auto",e),onKeyDown:k,children:r.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:n.map((x,y)=>{const R=x===a,L=`${s}-${y}`;return r.jsxs(r.Fragment,{children:[r.jsx("li",{ref:_=>{M.current[y]=_},role:"option","aria-selected":R,"data-marker":x.marker,"data-state":R?"selected":void 0,tabIndex:y===u?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",t),onClick:()=>f(x,y),onKeyDown:_=>N(_,x,y),children:r.jsx(ss,{footnote:x,layout:o,formatCaller:()=>p(x.caller,y),showMarkers:i})},L),y<n.length-1&&o==="vertical"&&r.jsx(re,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function ec(e){const t=[];let n=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>n&&t.push(e.substring(n,s.index)),t.push(r.jsx("strong",{children:s[1]},s.index)),n=o.lastIndex;return n<e.length&&t.push(e.substring(n)),t.length>0?t:[e]}function nc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const o=n["%webView_inventory_occurrences_table_header_reference%"],s=n["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const i=[],c=new Set;return e.forEach(d=>{const w=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;c.has(w)||(c.add(w),i.push(d))}),i},[e]);return r.jsxs(ze,{stickyHeader:!0,children:[r.jsx(Fe,{stickyHeader:!0,children:r.jsxs(Ct,{children:[r.jsx(ve,{children:o}),r.jsx(ve,{children:s})]})}),r.jsx(Ge,{children:a.length>0&&a.map(i=>r.jsxs(Ct,{onClick:()=>{t(i.reference)},children:[r.jsx(zt,{children:`${X.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),r.jsx(zt,{children:ec(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const ln=l.forwardRef(({className:e,...t},n)=>r.jsx(kn.Root,{ref:n,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:r.jsx(kn.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:r.jsx(j.Check,{className:"tw-h-4 tw-w-4"})})}));ln.displayName=kn.Root.displayName;const cn=e=>e==="asc"?r.jsx(j.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?r.jsx(j.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):r.jsx(j.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),rc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>r.jsxs($,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cn(t.getIsSorted())]})}),oc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>r.jsxs($,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,cn(n.getIsSorted())]})}),sc=e=>({accessorKey:"count",header:({column:t})=>r.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:r.jsxs($,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,cn(t.getIsSorted())]})}),cell:({row:t})=>r.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),xn=(e,t,n,o,s,a)=>{let i=[...n];e.forEach(d=>{t==="approved"?i.includes(d)||i.push(d):i=i.filter(w=>w!==d)}),o(i);let c=[...s];e.forEach(d=>{t==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},ac=(e,t,n,o,s)=>({accessorKey:"status",header:({column:a})=>r.jsx("div",{className:"tw-flex tw-justify-center",children:r.jsxs($,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,cn(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return r.jsxs(an,{value:i,variant:"outline",type:"single",children:[r.jsx(fe,{onClick:d=>{d.stopPropagation(),xn([c],"approved",t,n,o,s)},value:"approved",children:r.jsx(j.CircleCheckIcon,{})}),r.jsx(fe,{onClick:d=>{d.stopPropagation(),xn([c],"unapproved",t,n,o,s)},value:"unapproved",children:r.jsx(j.CircleXIcon,{})}),r.jsx(fe,{onClick:d=>{d.stopPropagation(),xn([c],"unknown",t,n,o,s)},value:"unknown",children:r.jsx(j.CircleHelpIcon,{})})]})}}),ic=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),lc=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},cc=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},as=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",wc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),dc=(e,t,n)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),n!==""&&(o=o.filter(s=>s.items[0].includes(n))),o},pc=(e,t,n)=>{const o=[];return e.forEach(s=>{const a=o.find(i=>v.deepEqual(i.items,v.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:s.verseRef,text:s.verse});else{const i={items:v.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText,count:1,status:as(v.isString(s.inventoryText)?s.inventoryText:s.inventoryText[0],t,n),occurrences:[{reference:s.verseRef,text:s.verse}]};o.push(i)}}),o},jt=(e,t)=>e[t]??t;function uc({inventoryItems:e,setVerseRef:t,localizedStrings:n,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1}){const f=jt(n,"%webView_inventory_all%"),h=jt(n,"%webView_inventory_approved%"),u=jt(n,"%webView_inventory_unapproved%"),g=jt(n,"%webView_inventory_unknown%"),N=jt(n,"%webView_inventory_scope_currentBook%"),k=jt(n,"%webView_inventory_scope_chapter%"),M=jt(n,"%webView_inventory_scope_verse%"),x=jt(n,"%webView_inventory_filter_text%"),y=jt(n,"%webView_inventory_show_additional_items%"),R=jt(n,"%webView_inventory_no_results%"),[L,_]=l.useState(!1),[S,T]=l.useState("all"),[C,E]=l.useState(""),[P,B]=l.useState([]),F=l.useMemo(()=>{const V=e??[];return V.length===0?[]:pc(V,s,a)},[e,s,a]),I=l.useMemo(()=>{if(L)return F;const V=[];return F.forEach(O=>{const tt=O.items[0],st=V.find(ft=>ft.items[0]===tt);st?(st.count+=O.count,st.occurrences=st.occurrences.concat(O.occurrences)):V.push({items:[tt],count:O.count,occurrences:O.occurrences,status:O.status})}),V},[L,F]),q=l.useMemo(()=>I.length===0?[]:dc(I,S,C),[I,S,C]),A=l.useMemo(()=>{var tt,st;if(!L)return d;const V=(tt=o==null?void 0:o.tableHeaders)==null?void 0:tt.length;if(!V)return d;const O=[];for(let ft=0;ft<V;ft++)O.push(oc(((st=o==null?void 0:o.tableHeaders)==null?void 0:st[ft])||"Additional Item",ft+1));return[...O,...d]},[o==null?void 0:o.tableHeaders,d,L]);l.useEffect(()=>{q.length===0?B([]):q.length===1&&B(q[0].items)},[q]);const Y=(V,O)=>{O.setRowSelection(()=>{const tt={};return tt[V.index]=!0,tt}),B(V.original.items)},gt=V=>{if(V==="book"||V==="chapter"||V==="verse")c(V);else throw new Error(`Invalid scope value: ${V}`)},Lt=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")T(V);else throw new Error(`Invalid status filter value: ${V}`)},Nt=l.useMemo(()=>{if(I.length===0||P.length===0)return[];const V=I.filter(O=>v.deepEqual(L?O.items:[O.items[0]],P));if(V.length>1)throw new Error("Selected item is not unique");return V.length===0?[]:V[0].occurrences},[P,L,I]);return r.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[r.jsxs("div",{className:"tw-flex tw-items-stretch",children:[r.jsxs(oe,{onValueChange:V=>Lt(V),defaultValue:S,children:[r.jsx(Kt,{className:"tw-m-1",children:r.jsx(se,{placeholder:"Select filter"})}),r.jsxs(Ht,{children:[r.jsx(ht,{value:"all",children:f}),r.jsx(ht,{value:"approved",children:h}),r.jsx(ht,{value:"unapproved",children:u}),r.jsx(ht,{value:"unknown",children:g})]})]}),r.jsxs(oe,{onValueChange:V=>gt(V),defaultValue:i,children:[r.jsx(Kt,{className:"tw-m-1",children:r.jsx(se,{placeholder:"Select scope"})}),r.jsxs(Ht,{children:[r.jsx(ht,{value:"book",children:N}),r.jsx(ht,{value:"chapter",children:k}),r.jsx(ht,{value:"verse",children:M})]})]}),r.jsx(pe,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:x,value:C,onChange:V=>{E(V.target.value)}}),o&&r.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[r.jsx(ln,{className:"tw-m-1",checked:L,onCheckedChange:V=>{_(V)}}),r.jsx(nt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??y})]})]}),r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(Qo,{columns:A,data:q,onRowClickHandler:Y,stickyHeader:!0,isLoading:p,noResultsMessage:R})}),Nt.length>0&&r.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:r.jsx(nc,{occurrenceData:Nt,setScriptureReference:t,localizedStrings:n})})]})}const mc="16rem",hc="3rem",is=l.createContext(void 0);function Ke(){const e=l.useContext(is);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const nr=l.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:o,style:s,children:a,side:i="primary",...c},d)=>{const[w,p]=l.useState(e),f=t??w,h=l.useCallback(y=>{const R=typeof y=="function"?y(f):y;n?n(R):p(R)},[n,f]),u=l.useCallback(()=>h(y=>!y),[h]),g=f?"expanded":"collapsed",M=ot()==="ltr"?i:i==="primary"?"secondary":"primary",x=l.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:u,side:M}),[g,f,h,u,M]);return r.jsx(is.Provider,{value:x,children:r.jsx(St,{delayDuration:0,children:r.jsx("div",{style:{"--sidebar-width":mc,"--sidebar-width-icon":hc,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});nr.displayName="SidebarProvider";const rr=l.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:o,...s},a)=>{const i=Ke();return t==="none"?r.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:a,...s,children:o}):r.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[r.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),r.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...s,children:r.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});rr.displayName="Sidebar";const ls=l.forwardRef(({className:e,onClick:t,...n},o)=>{const s=Ke();return r.jsxs($,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",e),onClick:a=>{t==null||t(a),s.toggleSidebar()},...n,children:[s.side==="primary"?r.jsx(j.PanelLeft,{}):r.jsx(j.PanelRight,{}),r.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ls.displayName="SidebarTrigger";const cs=l.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:o}=Ke();return r.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});cs.displayName="SidebarRail";const or=l.forwardRef(({className:e,...t},n)=>r.jsx("main",{ref:n,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));or.displayName="SidebarInset";const ws=l.forwardRef(({className:e,...t},n)=>r.jsx(pe,{ref:n,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));ws.displayName="SidebarInput";const ds=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ds.displayName="SidebarHeader";const ps=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ps.displayName="SidebarFooter";const us=l.forwardRef(({className:e,...t},n)=>r.jsx(re,{ref:n,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));us.displayName="SidebarSeparator";const sr=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));sr.displayName="SidebarContent";const We=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));We.displayName="SidebarGroup";const Ze=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?ye.Slot:"div";return r.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});Ze.displayName="SidebarGroupLabel";const ms=l.forwardRef(({className:e,asChild:t=!1,...n},o)=>{const s=t?ye.Slot:"button";return r.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});ms.displayName="SidebarGroupAction";const Qe=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",e),...t}));Qe.displayName="SidebarGroupContent";const ar=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));ar.displayName="SidebarMenu";const ir=l.forwardRef(({className:e,...t},n)=>r.jsx("li",{ref:n,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",e),...t}));ir.displayName="SidebarMenuItem";const fc=Xt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),lr=l.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:o="default",tooltip:s,className:a,...i},c)=>{const d=e?ye.Slot:"button",{state:w}=Ke(),p=r.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:m(fc({variant:n,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:p}),r.jsx(Et,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});lr.displayName="SidebarMenuButton";const hs=l.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...o},s)=>{const a=t?ye.Slot:"button";return r.jsx(a,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});hs.displayName="SidebarMenuAction";const fs=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));fs.displayName="SidebarMenuBadge";const gs=l.forwardRef(({className:e,showIcon:t=!1,...n},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return r.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&r.jsx(Je,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),r.jsx(Je,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});gs.displayName="SidebarMenuSkeleton";const bs=l.forwardRef(({className:e,...t},n)=>r.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));bs.displayName="SidebarMenuSub";const xs=l.forwardRef(({...e},t)=>r.jsx("li",{ref:t,...e}));xs.displayName="SidebarMenuSubItem";const vs=l.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:o,...s},a)=>{const i=e?ye.Slot:"a";return r.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});vs.displayName="SidebarMenuSubButton";function ys({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:d}){const w=l.useCallback((h,u)=>{o(h,u)},[o]),p=l.useCallback(h=>{const u=n.find(g=>g.projectId===h);return u?u.projectName:h},[n]),f=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return r.jsx(rr,{id:e,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:r.jsxs(sr,{children:[r.jsxs(We,{children:[r.jsx(Ze,{className:"tw-text-sm",children:a}),r.jsx(Qe,{children:r.jsx(ar,{children:Object.entries(t).map(([h,u])=>r.jsx(ir,{children:r.jsx(lr,{onClick:()=>w(h),isActive:f(h),children:r.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),r.jsxs(We,{children:[r.jsx(Ze,{className:"tw-text-sm",children:i}),r.jsx(Qe,{className:"tw-pl-3",children:r.jsx(Ye,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);w(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:r.jsx(j.ScrollText,{})})})]})]})})}const wn=l.forwardRef(({value:e,onSearch:t,placeholder:n,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const d=ot();return r.jsxs("div",{id:i,className:m("tw-relative",{"tw-w-full":o},s),children:[r.jsx(j.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),r.jsx(pe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:w=>t(w.target.value),disabled:a}),e&&r.jsxs($,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{t("")},children:[r.jsx(j.X,{className:"tw-h-4 tw-w-4"}),r.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});wn.displayName="SearchBar";function gc({id:e,extensionLabels:t,projectInfo:n,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return r.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[r.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:r.jsx(wn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),r.jsxs(nr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[r.jsx(ys,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:n,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),r.jsx(or,{className:"tw-min-w-[215px]",children:o})]})]})}const Vt="scrBook",bc="scrRef",te="source",xc="details",vc="Scripture Reference",yc="Scripture Book",Ns="Type",Nc="Details";function jc(e,t){const n=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Vt,header:(e==null?void 0:e.scriptureReferenceColumnName)??vc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?X.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Vt?v.formatScrRef(s.start):void 0},getGroupingValue:o=>X.bookIdToNumber(o.start.book),sortingFn:(o,s)=>v.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>v.formatScrRef(o.start),id:bc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:v.formatScrRef(s.start)},sortingFn:(o,s)=>v.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:te,header:n?(e==null?void 0:e.typeColumnName)??Ns:void 0,cell:o=>n||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:xc,header:(e==null?void 0:e.detailsColumnName)??Nc,cell:o=>o.getValue(),enableGrouping:!1}]}const kc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||v.compareScrRefs(e.start,e.end)===0?`${v.scrRefToBBBCCCVVV(e.start)}+${t}`:`${v.scrRefToBBBCCCVVV(e.start)}+${t}-${v.scrRefToBBBCCCVVV(e.end)}+${n}`},Lr=e=>`${kc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function _c({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:d}){const[w,p]=l.useState([]),[f,h]=l.useState([{id:Vt,desc:!1}]),[u,g]=l.useState({}),N=l.useMemo(()=>e.flatMap(C=>C.data.map(E=>({...E,source:C.source}))),[e]),k=l.useMemo(()=>jc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},n),[o,a,i,n]);l.useEffect(()=>{w.includes(te)?h([{id:te,desc:!1},{id:Vt,desc:!1}]):h([{id:Vt,desc:!1}])},[w]);const M=ct.useReactTable({data:N,columns:k,state:{grouping:w,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ct.getExpandedRowModel(),getGroupedRowModel:ct.getGroupedRowModel(),getCoreRowModel:ct.getCoreRowModel(),getSortedRowModel:ct.getSortedRowModel(),getRowId:Lr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const C=M.getSelectedRowModel().rowsById,E=Object.keys(C);if(E.length===1){const P=N.find(B=>Lr(B)===E[0])||void 0;P&&c(P)}}},[u,N,c,M]);const x=s??yc,y=a??Ns,R=[{label:"No Grouping",value:[]},{label:`Group by ${x}`,value:[Vt]},{label:`Group by ${y}`,value:[te]},{label:`Group by ${x} and ${y}`,value:[Vt,te]},{label:`Group by ${y} and ${x}`,value:[te,Vt]}],L=C=>{p(JSON.parse(C))},_=(C,E)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(E)},S=(C,E)=>C.getIsGrouped()?"":m("banded-row",E%2===0?"even":"odd"),T=(C,E,P)=>{if(!((C==null?void 0:C.length)===0||E.depth<P.column.getGroupedIndex())){if(E.getIsGrouped())switch(E.depth){case 1:return"tw-ps-4";default:return}switch(E.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return r.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&r.jsxs(oe,{value:JSON.stringify(w),onValueChange:C=>{L(C)},children:[r.jsx(Kt,{className:"tw-mb-1 tw-mt-2",children:r.jsx(se,{})}),r.jsx(Ht,{position:"item-aligned",children:r.jsx(Uo,{children:R.map(C=>r.jsx(ht,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),r.jsxs(ze,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&r.jsx(Fe,{children:M.getHeaderGroups().map(C=>r.jsx(Ct,{children:C.headers.filter(E=>E.column.columnDef.header).map(E=>r.jsx(ve,{colSpan:E.colSpan,className:"top-0 tw-sticky",children:E.isPlaceholder?void 0:r.jsxs("div",{children:[E.column.getCanGroup()?r.jsx($,{variant:"ghost",title:`Toggle grouping by ${E.column.columnDef.header}`,onClick:E.column.getToggleGroupingHandler(),type:"button",children:E.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ct.flexRender(E.column.columnDef.header,E.getContext())]})},E.id))},C.id))}),r.jsx(Ge,{children:M.getRowModel().rows.map((C,E)=>{const P=ot();return r.jsx(Ct,{"data-state":C.getIsSelected()?"selected":"",className:m(S(C,E)),onClick:B=>_(C,B),children:C.getVisibleCells().map(B=>{if(!(B.getIsPlaceholder()||B.column.columnDef.enableGrouping&&!B.getIsGrouped()&&(B.column.columnDef.id!==te||!n)))return r.jsx(zt,{className:m(B.column.columnDef.id,"tw-p-[1px]",T(w,C,B)),children:B.getIsGrouped()?r.jsxs($,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&r.jsx(j.ChevronDown,{}),!C.getIsExpanded()&&(P==="ltr"?r.jsx(j.ChevronRight,{}):r.jsx(j.ChevronLeft,{}))," ",ct.flexRender(B.column.columnDef.cell,B.getContext())," (",C.subRows.length,")"]}):ct.flexRender(B.column.columnDef.cell,B.getContext())},B.id)})},C.id)})})]})]})}const cr=(e,t)=>e.filter(n=>{try{return v.getSectionForBook(n)===t}catch{return!1}}),js=(e,t,n)=>cr(e,t).every(o=>n.includes(o));function Cc({section:e,availableBookIds:t,selectedBookIds:n,onToggle:o,localizedStrings:s}){const a=cr(t,e).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return r.jsx($,{variant:"outline",size:"sm",onClick:()=>o(e),className:m(js(t,e,n)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:oi(e,i,c,d,w)})}const Pr=5,vn=6;function Sc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:n,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:N}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[k,M]=l.useState(!1),[x,y]=l.useState(""),R=l.useRef(void 0),L=l.useRef(!1);if(e.length!==X.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const _=l.useMemo(()=>X.allBookIds.filter((I,q)=>e[q]==="1"&&!X.isObsolete(X.bookIdToNumber(I))),[e]),S=l.useMemo(()=>{if(!x.trim()){const A={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return _.forEach(Y=>{const gt=v.getSectionForBook(Y);A[gt].push(Y)}),A}const I=_.filter(A=>Vn(A,x,s)),q={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return I.forEach(A=>{const Y=v.getSectionForBook(A);q[Y].push(A)}),q},[_,x,s]),T=l.useCallback((I,q=!1)=>{if(!q||!R.current){n(t.includes(I)?t.filter(V=>V!==I):[...t,I]),R.current=I;return}const A=_.findIndex(V=>V===R.current),Y=_.findIndex(V=>V===I);if(A===-1||Y===-1)return;const[gt,Lt]=[Math.min(A,Y),Math.max(A,Y)],Nt=_.slice(gt,Lt+1).map(V=>V);n(t.includes(I)?t.filter(V=>!Nt.includes(V)):[...new Set([...t,...Nt])])},[t,n,_]),C=I=>{T(I,L.current),L.current=!1},E=(I,q)=>{I.preventDefault(),T(q,I.shiftKey)},P=l.useCallback(I=>{const q=cr(_,I).map(A=>A);n(js(_,I,t)?t.filter(A=>!q.includes(A)):[...new Set([...t,...q])])},[t,n,_]),B=()=>{n(_.map(I=>I))},F=()=>{n([])};return r.jsxs("div",{className:"tw-space-y-2",children:[r.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(v.Section).map(I=>r.jsx(Cc,{section:I,availableBookIds:_,selectedBookIds:t,onToggle:P,localizedStrings:o},I))}),r.jsxs(le,{open:k,onOpenChange:I=>{M(I),I||y("")},children:[r.jsx(ce,{asChild:!0,children:r.jsxs($,{variant:"outline",role:"combobox","aria-expanded":k,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${a}: ${t.length}`:i,r.jsx(j.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),r.jsx(qt,{className:"tw-w-full tw-p-0",align:"start",children:r.jsxs(ae,{shouldFilter:!1,onKeyDown:I=>{I.key==="Enter"&&(L.current=I.shiftKey)},children:[r.jsx(je,{placeholder:c,value:x,onValueChange:y}),r.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[r.jsx($,{variant:"ghost",size:"sm",onClick:B,children:d}),r.jsx($,{variant:"ghost",size:"sm",onClick:F,children:w})]}),r.jsxs(ie,{children:[r.jsx(Be,{children:p}),Object.values(v.Section).map((I,q)=>{const A=S[I];if(A.length!==0)return r.jsxs(l.Fragment,{children:[r.jsx(It,{heading:no(I,h,u,g,N),children:A.map(Y=>r.jsx(oo,{bookId:Y,isSelected:t.includes(Y),onSelect:()=>C(Y),onMouseDown:gt=>E(gt,Y),section:v.getSectionForBook(Y),showCheck:!0,localizedBookNames:s,commandValue:Sn(Y,s),className:"tw-flex tw-items-center"},Y))}),q<Object.values(v.Section).length-1&&r.jsx(Yr,{})]},I)})]})]})})]}),t.length>0&&r.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===vn?vn:Pr).map(I=>r.jsx(xe,{className:"hover:tw-bg-secondary",variant:"secondary",children:he(I,s)},I)),t.length>vn&&r.jsx(xe,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Pr} ${f}`})]})]})}const Ec=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Wt=(e,t)=>e[t]??t;function Tc({scope:e,availableScopes:t,onScopeChange:n,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:d}){const w=Wt(i,"%webView_scope_selector_selected_text%"),p=Wt(i,"%webView_scope_selector_current_verse%"),f=Wt(i,"%webView_scope_selector_current_chapter%"),h=Wt(i,"%webView_scope_selector_current_book%"),u=Wt(i,"%webView_scope_selector_choose_books%"),g=Wt(i,"%webView_scope_selector_scope%"),N=Wt(i,"%webView_scope_selector_select_books%"),k=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],M=t?k.filter(x=>t.includes(x.value)):k;return r.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(nt,{children:g}),r.jsx(rn,{value:e,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:M.map(({value:x,label:y,id:R})=>r.jsxs("div",{className:"tw-flex tw-items-center",children:[r.jsx(Ae,{className:"tw-me-2",value:x,id:R}),r.jsx(nt,{htmlFor:R,children:y})]},R))})]}),e==="selectedBooks"&&r.jsxs("div",{className:"tw-grid tw-gap-2",children:[r.jsx(nt,{children:N}),r.jsx(Sc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const yn={[v.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[v.getLocalizeKeyForScrollGroupId(0)]:"A",[v.getLocalizeKeyForScrollGroupId(1)]:"B",[v.getLocalizeKeyForScrollGroupId(2)]:"C",[v.getLocalizeKeyForScrollGroupId(3)]:"D",[v.getLocalizeKeyForScrollGroupId(4)]:"E",[v.getLocalizeKeyForScrollGroupId(5)]:"F",[v.getLocalizeKeyForScrollGroupId(6)]:"G",[v.getLocalizeKeyForScrollGroupId(7)]:"H",[v.getLocalizeKeyForScrollGroupId(8)]:"I",[v.getLocalizeKeyForScrollGroupId(9)]:"J",[v.getLocalizeKeyForScrollGroupId(10)]:"K",[v.getLocalizeKeyForScrollGroupId(11)]:"L",[v.getLocalizeKeyForScrollGroupId(12)]:"M",[v.getLocalizeKeyForScrollGroupId(13)]:"N",[v.getLocalizeKeyForScrollGroupId(14)]:"O",[v.getLocalizeKeyForScrollGroupId(15)]:"P",[v.getLocalizeKeyForScrollGroupId(16)]:"Q",[v.getLocalizeKeyForScrollGroupId(17)]:"R",[v.getLocalizeKeyForScrollGroupId(18)]:"S",[v.getLocalizeKeyForScrollGroupId(19)]:"T",[v.getLocalizeKeyForScrollGroupId(20)]:"U",[v.getLocalizeKeyForScrollGroupId(21)]:"V",[v.getLocalizeKeyForScrollGroupId(22)]:"W",[v.getLocalizeKeyForScrollGroupId(23)]:"X",[v.getLocalizeKeyForScrollGroupId(24)]:"Y",[v.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Rc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...yn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in yn?yn[w]:p]))},d=ot();return r.jsxs(oe,{value:`${t}`,onValueChange:w=>n(w==="undefined"?void 0:parseInt(w,10)),children:[r.jsx(Kt,{size:s,className:m("pr-twp tw-w-auto",a),children:r.jsx(se,{placeholder:c[v.getLocalizeKeyForScrollGroupId(t)]??t})}),r.jsx(Ht,{id:i,align:d==="rtl"?"end":"start",style:{zIndex:250},children:e.map(w=>r.jsx(ht,{value:`${w}`,children:c[v.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Mc({children:e}){return r.jsx("div",{className:"pr-twp tw-grid",children:e})}function Dc({primary:e,secondary:t,children:n,isLoading:o=!1,loadingMessage:s}){return r.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),r.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):r.jsx("div",{children:n})]})}function Ic({primary:e,secondary:t,includeSeparator:n=!1}){return r.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),r.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?r.jsx(re,{}):""]})}function ks(e,t){var n;return(n=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:n[0]}function tn({icon:e,menuLabel:t,leading:n}){return e?r.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`}):void 0}const _s=(e,t,n,o)=>n?Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>t.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:"command"in c?r.jsxs(Pe,{onClick:()=>{o(c)},children:[c.iconPathBefore&&r.jsx(tn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&r.jsx(tn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):r.jsxs(Ko,{children:[r.jsx(Jn,{children:c.label}),r.jsx(Go,{children:r.jsx(Wn,{children:_s(e,t,ks(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&r.jsx(Et,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function en({onSelectMenuItem:e,menuData:t,tabLabel:n,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return r.jsxs(Yt,{variant:a,children:[r.jsx(we,{"aria-label":n,className:s,asChild:!0,id:c,children:r.jsx($,{variant:i,size:"icon",children:o??r.jsx(j.MenuIcon,{})})}),r.jsx(At,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>r.jsxs(l.Fragment,{children:[r.jsx(Yn,{children:r.jsx(St,{children:_s(t.groups,t.items,d,e)})}),w<p.length-1&&r.jsx(de,{})]},d))})]})}const Cs=l.forwardRef(({id:e,className:t,children:n},o)=>r.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:n}));function Oc({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:n,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return r.jsxs(Cs,{className:`tw-w-full tw-border ${a}`,id:s,children:[n&&r.jsx(en,{onSelectMenuItem:e,menuData:n,tabLabel:"Project",icon:w??r.jsx(j.Menu,{}),buttonVariant:"ghost"}),i&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&r.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),r.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&r.jsx(en,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:r.jsx(j.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function Ac({onSelectProjectMenuItem:e,projectMenuData:t,id:n,className:o,menuButtonIcon:s}){return r.jsx(Cs,{className:"tw-pointer-events-none",id:n,children:t&&r.jsx(en,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const wr=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsx(ut.Root,{orientation:"vertical",ref:n,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});wr.displayName=ut.List.displayName;const dr=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.List,{ref:n,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));dr.displayName=ut.List.displayName;const Ss=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Trigger,{ref:n,...t,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),pr=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Content,{ref:n,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));pr.displayName=ut.Content.displayName;function Lc({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return r.jsxs("div",{id:i,className:"pr-twp",children:[r.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?r.jsx("h1",{children:s}):"",r.jsx(wn,{className:a,value:t,onSearch:n,placeholder:o})]}),r.jsxs(wr,{children:[r.jsx(dr,{children:e.map(c=>r.jsx(Ss,{value:c.value,children:c.value},c.key))}),e.map(c=>r.jsx(pr,{value:c.value,children:c.content},c.key))]})]})}function Pc({...e}){return r.jsx(W.Menu,{...e})}function Vc({...e}){return r.jsx(W.Sub,{"data-slot":"menubar-sub",...e})}const Es=l.forwardRef(({className:e,variant:t="default",...n},o)=>{const s=l.useMemo(()=>({variant:t}),[t]);return r.jsx(qn.Provider,{value:s,children:r.jsx(W.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...n})})});Es.displayName=W.Root.displayName;const Ts=l.forwardRef(({className:e,...t},n)=>{const o=yt();return r.jsx(W.Trigger,{ref:n,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Ot({variant:o.variant,className:e})),...t})});Ts.displayName=W.Trigger.displayName;const Rs=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>{const a=yt();return r.jsxs(W.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",Ot({variant:a.variant,className:e}),e),...o,children:[n,r.jsx(j.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Rs.displayName=W.SubTrigger.displayName;const Ms=l.forwardRef(({className:e,...t},n)=>{const o=yt();return r.jsx(W.SubContent,{ref:n,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});Ms.displayName=W.SubContent.displayName;const Ds=l.forwardRef(({className:e,align:t="start",alignOffset:n=-4,sideOffset:o=8,...s},a)=>{const i=yt();return r.jsx(W.Portal,{children:r.jsx(W.Content,{ref:a,align:t,alignOffset:n,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...s})})});Ds.displayName=W.Content.displayName;const Is=l.forwardRef(({className:e,inset:t,...n},o)=>{const s=yt();return r.jsx(W.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",Ot({variant:s.variant,className:e}),e),...n})});Is.displayName=W.Item.displayName;const $c=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>{const a=yt();return r.jsxs(W.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ot({variant:a.variant,className:e}),e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(j.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});$c.displayName=W.CheckboxItem.displayName;const Bc=l.forwardRef(({className:e,children:t,...n},o)=>{const s=yt();return r.jsxs(W.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ot({variant:s.variant,className:e}),e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(W.ItemIndicator,{children:r.jsx(j.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Bc.displayName=W.RadioItem.displayName;const zc=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(W.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));zc.displayName=W.Label.displayName;const Os=l.forwardRef(({className:e,...t},n)=>r.jsx(W.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Os.displayName=W.Separator.displayName;const Re=(e,t)=>{setTimeout(()=>{t.forEach(n=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},As=(e,t,n,o)=>{if(!n)return;const s=Object.entries(e).filter(([a,i])=>"column"in i&&i.column===n||a===n).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=t.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>r.jsxs(Mt,{children:[r.jsx($t,{asChild:!0,children:"command"in w?r.jsxs(Is,{onClick:()=>{o(w)},children:[w.iconPathBefore&&r.jsx(tn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&r.jsx(tn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):r.jsxs(Vc,{children:[r.jsx(Rs,{children:w.label}),r.jsx(Ms,{children:As(e,t,ks(e,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&r.jsx(Et,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&i<s.length-1&&d.push(r.jsx(Os,{},`separator-${a}`)),d})};function Fc({menuData:e,onSelectMenuItem:t,onOpenChange:n,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),d=l.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return d;default:return}};if(Aa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,N,k,M;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Re(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Re(a,[h,u]);break;case"alt+l":(N=i.current)==null||N.focus(),Re(i,[h,u]);break;case"alt+n":(k=c.current)==null||k.focus(),Re(c,[h,u]);break;case"alt+h":(M=d.current)==null||M.focus(),Re(d,[h,u]);break}}),l.useEffect(()=>{if(!n||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const N=g.target.getAttribute("data-state");n(N==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[n]),!!e)return r.jsx(Es,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>r.jsxs(Pc,{children:[r.jsx(Ts,{ref:w(p),children:typeof f=="object"&&"label"in f&&f.label}),r.jsx(Ds,{className:"tw-z-[250]",children:r.jsx(St,{children:As(e.groups,e.items,p,t)})})]},p))})}function Gc(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Kc({menuData:e,onOpenChange:t,onSelectMenuItem:n,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=l.useRef(void 0);return r.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:r.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[r.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:r.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[i,e&&r.jsx(Fc,{menuData:e,onOpenChange:t,onSelectMenuItem:n,variant:w})]})}),r.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),r.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:r.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Hc=(e,t)=>e[t]??t;function Xc({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:d}){const w=Hc(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...n.filter(N=>N!==g)]),a&&n.find(N=>N===g)&&a([...n.filter(N=>N!==g)]),f(!1)},u=(g,N)=>{var M,x,y,R,L,_;const k=N!==g?((x=(M=e[g])==null?void 0:M.uiNames)==null?void 0:x[N])??((R=(y=e[g])==null?void 0:y.uiNames)==null?void 0:R.en):void 0;return k?`${(L=e[g])==null?void 0:L.autonym} (${k})`:(_=e[g])==null?void 0:_.autonym};return r.jsxs("div",{id:d,className:m("pr-twp tw-max-w-sm",c),children:[r.jsxs(oe,{name:"uiLanguage",value:t,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[r.jsx(Kt,{children:r.jsx(se,{})}),r.jsx(Ht,{className:"tw-z-[250]",children:Object.keys(e).map(g=>r.jsx(ht,{value:g,children:u(g,t)},g))})]}),t!=="en"&&r.jsx("div",{className:"tw-pt-3",children:r.jsx(nt,{className:"tw-font-normal tw-text-muted-foreground",children:v.formatReplacementString(w,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function Uc({item:e,createLabel:t,createComplexLabel:n}){return t?r.jsx(nt,{children:t(e)}):n?r.jsx(nt,{children:n(e)}):r.jsx(nt,{children:e})}function qc({id:e,className:t,listItems:n,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return r.jsx("div",{id:e,className:t,children:n.map(c=>r.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[r.jsx(ln,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),r.jsx(Uc,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function Yc({cardKey:e,isSelected:t,onSelect:n,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:d,accentColor:w}){const p=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),n())};return r.jsxs("div",{hidden:s,onClick:n,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":t,className:m("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-accent":t},{"tw-bg-transparent":!t},a),children:[r.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[r.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[r.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),t&&c&&r.jsxs(Yt,{children:[r.jsx(we,{className:m(w&&"tw-me-1"),asChild:!0,children:r.jsx($,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:r.jsx(j.MoreHorizontal,{})})}),r.jsx(At,{align:"end",children:c})]})]}),t&&d&&r.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),w&&r.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},e)}const Ls=l.forwardRef(({className:e,...t},n)=>r.jsx(j.LoaderCircle,{size:35,className:m("tw-animate-spin",e),...t,ref:n}));Ls.displayName="Spinner";function Jc({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}){return r.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[r.jsx(nt,{htmlFor:e,className:m({"tw-text-red-600":n,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),r.jsx(pe,{id:e,disabled:t,placeholder:i,required:c,className:m(d,{"tw-border-red-600":n}),defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}),r.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Wc=Xt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ps=l.forwardRef(({className:e,variant:t,...n},o)=>r.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Wc({variant:t}),e),...n}));Ps.displayName="Alert";const Vs=l.forwardRef(({className:e,...t},n)=>r.jsxs("h5",{ref:n,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Vs.displayName="AlertTitle";const $s=l.forwardRef(({className:e,...t},n)=>r.jsx("div",{ref:n,className:m("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));$s.displayName="AlertDescription";const Zc=Z.Root,Qc=Z.Trigger,tw=Z.Group,ew=Z.Portal,nw=Z.Sub,rw=Z.RadioGroup,Bs=l.forwardRef(({className:e,inset:t,children:n,...o},s)=>r.jsxs(Z.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[n,r.jsx(j.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Bs.displayName=Z.SubTrigger.displayName;const zs=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.SubContent,{ref:n,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));zs.displayName=Z.SubContent.displayName;const Fs=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.Portal,{children:r.jsx(Z.Content,{ref:n,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));Fs.displayName=Z.Content.displayName;const Gs=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(Z.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));Gs.displayName=Z.Item.displayName;const Ks=l.forwardRef(({className:e,children:t,checked:n,...o},s)=>r.jsxs(Z.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...o,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Z.ItemIndicator,{children:r.jsx(j.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));Ks.displayName=Z.CheckboxItem.displayName;const Hs=l.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(Z.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[r.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:r.jsx(Z.ItemIndicator,{children:r.jsx(j.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));Hs.displayName=Z.RadioItem.displayName;const Xs=l.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(Z.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...n}));Xs.displayName=Z.Label.displayName;const Us=l.forwardRef(({className:e,...t},n)=>r.jsx(Z.Separator,{ref:n,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));Us.displayName=Z.Separator.displayName;function qs({className:e,...t}){return r.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}qs.displayName="ContextMenuShortcut";const Ys=l.createContext({direction:"bottom"});function Js({shouldScaleBackground:e=!0,direction:t="bottom",...n}){const o=l.useMemo(()=>({direction:t}),[t]);return r.jsx(Ys.Provider,{value:o,children:r.jsx(vt.Drawer.Root,{shouldScaleBackground:e,direction:t,...n})})}Js.displayName="Drawer";const ow=vt.Drawer.Trigger,Ws=vt.Drawer.Portal,sw=vt.Drawer.Close,ur=l.forwardRef(({className:e,...t},n)=>r.jsx(vt.Drawer.Overlay,{ref:n,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));ur.displayName=vt.Drawer.Overlay.displayName;const Zs=l.forwardRef(({className:e,children:t,hideDrawerHandle:n=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(Ys),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return r.jsxs(Ws,{children:[r.jsx(ur,{}),r.jsxs(vt.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],e),...o,children:[!n&&(a==="bottom"||a==="right")&&r.jsx("div",{className:c[a]}),r.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!n&&(a==="top"||a==="left")&&r.jsx("div",{className:c[a]})]})]})});Zs.displayName="DrawerContent";function Qs({className:e,...t}){return r.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}Qs.displayName="DrawerHeader";function ta({className:e,...t}){return r.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}ta.displayName="DrawerFooter";const ea=l.forwardRef(({className:e,...t},n)=>r.jsx(vt.Drawer.Title,{ref:n,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));ea.displayName=vt.Drawer.Title.displayName;const na=l.forwardRef(({className:e,...t},n)=>r.jsx(vt.Drawer.Description,{ref:n,className:m("tw-text-sm tw-text-muted-foreground",e),...t}));na.displayName=vt.Drawer.Description.displayName;const ra=l.forwardRef(({className:e,value:t,...n},o)=>r.jsx(_n.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...n,children:r.jsx(_n.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));ra.displayName=_n.Root.displayName;function aw({className:e,...t}){return r.jsx(In.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const iw=In.Panel;function lw({withHandle:e,className:t,...n}){return r.jsx(In.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...n,children:e&&r.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:r.jsx(j.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function cw({...e}){return r.jsx(zr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const oa=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsxs(Me.Root,{ref:n,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[r.jsx(Me.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:r.jsx(Me.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),r.jsx(Me.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});oa.displayName=Me.Root.displayName;const sa=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsx(Cn.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:r.jsx(Cn.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});sa.displayName=Cn.Root.displayName;const ww=ut.Root,aa=l.forwardRef(({className:e,...t},n)=>{const o=ot();return r.jsx(ut.List,{ref:n,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});aa.displayName=ut.List.displayName;const ia=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Trigger,{ref:n,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ia.displayName=ut.Trigger.displayName;const la=l.forwardRef(({className:e,...t},n)=>r.jsx(ut.Content,{ref:n,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));la.displayName=ut.Content.displayName;const ca=l.forwardRef(({className:e,...t},n)=>r.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:n,...t}));ca.displayName="Textarea";const dw=(e,t)=>{l.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])};function pw(e){return{preserveValue:!0,...e}}const wa=(e,t,n={})=>{const o=l.useRef(t);o.current=t;const s=l.useRef(n);s.current=pw(s.current);const[a,i]=l.useState(()=>o.current),[c,d]=l.useState(!0);return l.useEffect(()=>{let w=!0;return d(!!e),(async()=>{if(e){const p=await e();w&&(i(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||i(()=>o.current)}},[e]),[a,c]},Nn=()=>!1,uw=(e,t)=>{const[n]=wa(l.useCallback(async()=>{if(!e)return Nn;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),Nn,{preserveValue:!1});l.useEffect(()=>()=>{n!==Nn&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>zr.toast});exports.Alert=Ps;exports.AlertDescription=$s;exports.AlertTitle=Vs;exports.Avatar=Xn;exports.AvatarFallback=Un;exports.AvatarImage=Fo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=di;exports.BOOK_SELECTOR_STRING_KEYS=mi;exports.Badge=xe;exports.BookChapterControl=wi;exports.BookSelectionMode=lo;exports.BookSelector=hi;exports.Button=$;exports.COMMENT_LIST_STRING_KEYS=fi;exports.Card=Kn;exports.CardContent=Hn;exports.CardDescription=Bo;exports.CardFooter=zo;exports.CardHeader=Vo;exports.CardTitle=$o;exports.ChapterRangeSelector=io;exports.Checkbox=ln;exports.Checklist=qc;exports.ComboBox=Ye;exports.Command=ae;exports.CommandEmpty=Be;exports.CommandGroup=It;exports.CommandInput=je;exports.CommandItem=Ut;exports.CommandList=ie;exports.CommentList=Rl;exports.ContextMenu=Zc;exports.ContextMenuCheckboxItem=Ks;exports.ContextMenuContent=Fs;exports.ContextMenuGroup=tw;exports.ContextMenuItem=Gs;exports.ContextMenuLabel=Xs;exports.ContextMenuPortal=ew;exports.ContextMenuRadioGroup=rw;exports.ContextMenuRadioItem=Hs;exports.ContextMenuSeparator=Us;exports.ContextMenuShortcut=qs;exports.ContextMenuSub=nw;exports.ContextMenuSubContent=zs;exports.ContextMenuSubTrigger=Bs;exports.ContextMenuTrigger=Qc;exports.DataTable=Qo;exports.Drawer=Js;exports.DrawerClose=sw;exports.DrawerContent=Zs;exports.DrawerDescription=na;exports.DrawerFooter=ta;exports.DrawerHeader=Qs;exports.DrawerOverlay=ur;exports.DrawerPortal=Ws;exports.DrawerTitle=ea;exports.DrawerTrigger=ow;exports.DropdownMenu=Yt;exports.DropdownMenuCheckboxItem=Dt;exports.DropdownMenuContent=At;exports.DropdownMenuGroup=Yn;exports.DropdownMenuItem=Pe;exports.DropdownMenuItemType=ns;exports.DropdownMenuLabel=_e;exports.DropdownMenuPortal=Go;exports.DropdownMenuRadioGroup=Ho;exports.DropdownMenuRadioItem=Zn;exports.DropdownMenuSeparator=de;exports.DropdownMenuShortcut=Xo;exports.DropdownMenuSub=Ko;exports.DropdownMenuSubContent=Wn;exports.DropdownMenuSubTrigger=Jn;exports.DropdownMenuTrigger=we;exports.ERROR_DUMP_STRING_KEYS=ts;exports.ERROR_POPOVER_STRING_KEYS=Vl;exports.ErrorDump=es;exports.ErrorPopover=$l;exports.FOOTNOTE_EDITOR_STRING_KEYS=Wl;exports.Filter=Kl;exports.FilterDropdown=Bl;exports.Footer=Gl;exports.FootnoteEditor=Jl;exports.FootnoteItem=ss;exports.FootnoteList=tc;exports.INVENTORY_STRING_KEYS=wc;exports.Input=pe;exports.Inventory=uc;exports.Label=nt;exports.MarkdownRenderer=Pl;exports.MoreInfo=zl;exports.MultiSelectComboBox=rs;exports.NavigationContentSearch=Lc;exports.Popover=le;exports.PopoverAnchor=si;exports.PopoverContent=qt;exports.PopoverTrigger=ce;exports.Progress=ra;exports.RadioGroup=rn;exports.RadioGroupItem=Ae;exports.RecentSearches=ao;exports.ResizableHandle=lw;exports.ResizablePanel=iw;exports.ResizablePanelGroup=aw;exports.ResultsCard=Yc;exports.SCOPE_SELECTOR_STRING_KEYS=Ec;exports.ScopeSelector=Tc;exports.ScriptureResultsViewer=_c;exports.ScrollGroupSelector=Rc;exports.SearchBar=wn;exports.Select=oe;exports.SelectContent=Ht;exports.SelectGroup=Uo;exports.SelectItem=ht;exports.SelectLabel=Yo;exports.SelectScrollDownButton=tr;exports.SelectScrollUpButton=Qn;exports.SelectSeparator=Jo;exports.SelectTrigger=Kt;exports.SelectValue=se;exports.Separator=re;exports.SettingsList=Mc;exports.SettingsListHeader=Ic;exports.SettingsListItem=Dc;exports.SettingsSidebar=ys;exports.SettingsSidebarContentSearch=gc;exports.Sidebar=rr;exports.SidebarContent=sr;exports.SidebarFooter=ps;exports.SidebarGroup=We;exports.SidebarGroupAction=ms;exports.SidebarGroupContent=Qe;exports.SidebarGroupLabel=Ze;exports.SidebarHeader=ds;exports.SidebarInput=ws;exports.SidebarInset=or;exports.SidebarMenu=ar;exports.SidebarMenuAction=hs;exports.SidebarMenuBadge=fs;exports.SidebarMenuButton=lr;exports.SidebarMenuItem=ir;exports.SidebarMenuSkeleton=gs;exports.SidebarMenuSub=bs;exports.SidebarMenuSubButton=vs;exports.SidebarMenuSubItem=xs;exports.SidebarProvider=nr;exports.SidebarRail=cs;exports.SidebarSeparator=us;exports.SidebarTrigger=ls;exports.Skeleton=Je;exports.Slider=oa;exports.Sonner=cw;exports.Spinner=Ls;exports.Switch=sa;exports.TabDropdownMenu=en;exports.TabFloatingMenu=Ac;exports.TabToolbar=Oc;exports.Table=ze;exports.TableBody=Ge;exports.TableCaption=Zo;exports.TableCell=zt;exports.TableFooter=Wo;exports.TableHead=ve;exports.TableHeader=Fe;exports.TableRow=Ct;exports.Tabs=ww;exports.TabsContent=la;exports.TabsList=aa;exports.TabsTrigger=ia;exports.TextField=Jc;exports.Textarea=ca;exports.ToggleGroup=an;exports.ToggleGroupItem=fe;exports.Toolbar=Kc;exports.Tooltip=Mt;exports.TooltipContent=Et;exports.TooltipProvider=St;exports.TooltipTrigger=$t;exports.UiLanguageSelector=Xc;exports.VerticalTabs=wr;exports.VerticalTabsContent=pr;exports.VerticalTabsList=dr;exports.VerticalTabsTrigger=Ss;exports.badgeVariants=Po;exports.buttonVariants=so;exports.cn=m;exports.getBookIdFromUSFM=cc;exports.getLinesFromUSFM=ic;exports.getNumberFromUSFM=lc;exports.getStatusForItem=as;exports.getToolbarOSReservedSpaceClassName=Gc;exports.inventoryCountColumn=sc;exports.inventoryItemColumn=rc;exports.inventoryStatusColumn=ac;exports.selectTriggerVariants=qo;exports.useEvent=dw;exports.useEventAsync=uw;exports.useListbox=co;exports.usePromise=wa;exports.useRecentSearches=ai;exports.useSidebar=Ke;function mw(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),o=n.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?n.insertBefore(s,o):n.appendChild(s)}mw(`*, ::before, ::after {
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
