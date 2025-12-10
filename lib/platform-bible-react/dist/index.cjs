"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),i=require("react"),lt=require("cmdk"),k=require("lucide-react"),_a=require("clsx"),Ca=require("tailwind-merge"),Sa=require("@radix-ui/react-dialog"),N=require("platform-bible-utils"),ue=require("@radix-ui/react-slot"),Gt=require("class-variance-authority"),Ea=require("@radix-ui/react-popover"),Ta=require("@radix-ui/react-label"),Ra=require("@radix-ui/react-radio-group"),M=require("lexical"),dr=require("@radix-ui/react-tooltip"),ln=require("@lexical/rich-text"),Jn=require("react-dom"),Ma=require("@lexical/table"),Ia=require("@radix-ui/react-toggle-group"),Da=require("@radix-ui/react-toggle"),pr=require("@lexical/headless"),Oa=require("@radix-ui/react-separator"),Aa=require("@radix-ui/react-avatar"),ur=require("@radix-ui/react-dropdown-menu"),at=require("@tanstack/react-table"),Pa=require("@radix-ui/react-select"),Va=require("markdown-to-jsx"),gt=require("@eten-tech-foundation/platform-editor"),La=require("@radix-ui/react-checkbox"),$a=require("@radix-ui/react-tabs"),Fa=require("@radix-ui/react-menubar"),za=require("react-hotkeys-hook"),Ba=require("@radix-ui/react-context-menu"),xt=require("vaul"),Ga=require("@radix-ui/react-progress"),Ha=require("react-resizable-panels"),mr=require("sonner"),Ka=require("@radix-ui/react-slider"),Xa=require("@radix-ui/react-switch");function Q(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const tn=Q(i),bt=Q(Sa),de=Q(Ea),hr=Q(Ta),Ne=Q(Ra),Ce=Q(dr),Ge=Q(Ia),fr=Q(Da),gr=Q(Oa),me=Q(Aa),U=Q(ur),Z=Q(Pa),wn=Q(La),wt=Q($a),Y=Q(Fa),J=Q(Ba),cn=Q(Ga),gn=Q(Ha),ye=Q(Ka),dn=Q(Xa),qa=Ca.extendTailwindMerge({prefix:"tw-"});function u(...t){return qa(_a.clsx(t))}const Ua="layoutDirection";function et(){const t=localStorage.getItem(Ua);return t==="rtl"?t:"ltr"}const Ya=bt.Root,Ja=bt.Portal,br=i.forwardRef(({className:t,...n},r)=>e.jsx(bt.Overlay,{ref:r,className:u("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));br.displayName=bt.Overlay.displayName;const xr=i.forwardRef(({className:t,children:n,...r},o)=>{const a=et();return e.jsxs(Ja,{children:[e.jsx(br,{}),e.jsxs(bt.Content,{ref:o,className:u("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[n,e.jsxs(bt.Close,{className:u("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[e.jsx(k.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});xr.displayName=bt.Content.displayName;function vr({className:t,...n}){return e.jsx("div",{className:u("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...n})}vr.displayName="DialogHeader";const yr=i.forwardRef(({className:t,...n},r)=>e.jsx(bt.Title,{ref:r,className:u("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));yr.displayName=bt.Title.displayName;const Wa=i.forwardRef(({className:t,...n},r)=>e.jsx(bt.Description,{ref:r,className:u("tw-text-sm tw-text-muted-foreground",t),...n}));Wa.displayName=bt.Description.displayName;const Ht=i.forwardRef(({className:t,...n},r)=>e.jsx(lt.Command,{ref:r,className:u("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));Ht.displayName=lt.Command.displayName;const he=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[e.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(lt.Command.Input,{ref:r,className:u("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});he.displayName=lt.Command.Input.displayName;const Kt=i.forwardRef(({className:t,...n},r)=>e.jsx(lt.Command.List,{ref:r,className:u("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Kt.displayName=lt.Command.List.displayName;const Se=i.forwardRef((t,n)=>e.jsx(lt.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Se.displayName=lt.Command.Empty.displayName;const Mt=i.forwardRef(({className:t,...n},r)=>e.jsx(lt.Command.Group,{ref:r,className:u("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));Mt.displayName=lt.Command.Group.displayName;const Nr=i.forwardRef(({className:t,...n},r)=>e.jsx(lt.Command.Separator,{ref:r,className:u("tw--mx-1 tw-h-px tw-bg-border",t),...n}));Nr.displayName=lt.Command.Separator.displayName;const It=i.forwardRef(({className:t,...n},r)=>e.jsx(lt.Command.Item,{ref:r,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));It.displayName=lt.Command.Item.displayName;var Za=Object.defineProperty,Qa=(t,n,r)=>n in t?Za(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,B=(t,n,r)=>Qa(t,typeof n!="symbol"?n+"":n,r);const te=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],bn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],jr=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Wn=ws();function fe(t,n=!0){return n&&(t=t.toUpperCase()),t in Wn?Wn[t]:0}function xn(t){return fe(t)>0}function ts(t){const n=typeof t=="string"?fe(t):t;return n>=40&&n<=66}function es(t){return(typeof t=="string"?fe(t):t)<=39}function kr(t){return t<=66}function ns(t){const n=typeof t=="string"?fe(t):t;return Sr(n)&&!kr(n)}function*rs(){for(let t=1;t<=te.length;t++)yield t}const os=1,_r=te.length;function as(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function vn(t,n="***"){const r=t-1;return r<0||r>=te.length?n:te[r]}function Cr(t){return t<=0||t>_r?"******":jr[t-1]}function ss(t){return Cr(fe(t))}function Sr(t){const n=typeof t=="number"?vn(t):t;return xn(n)&&!bn.includes(n)}function is(t){const n=typeof t=="number"?vn(t):t;return xn(n)&&bn.includes(n)}function ls(t){return jr[t-1].includes("*obsolete*")}function ws(){const t={};for(let n=0;n<te.length;n++)t[te[n]]=n+1;return t}const H={allBookIds:te,nonCanonicalIds:bn,bookIdToNumber:fe,isBookIdValid:xn,isBookNT:ts,isBookOT:es,isBookOTNT:kr,isBookDC:ns,allBookNumbers:rs,firstBook:os,lastBook:_r,extraBooks:as,bookNumberToId:vn,bookNumberToEnglishName:Cr,bookIdToEnglishName:ss,isCanonical:Sr,isExtraMaterial:is,isObsolete:ls};var Nt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Nt||{});const pt=class{constructor(n){if(B(this,"name"),B(this,"fullPath"),B(this,"isPresent"),B(this,"hasVerseSegments"),B(this,"isCustomized"),B(this,"baseVersification"),B(this,"scriptureBooks"),B(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=Nt[n]):(this._type=n,this.name=Nt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};B(pt,"Original",new pt(Nt.Original)),B(pt,"Septuagint",new pt(Nt.Septuagint)),B(pt,"Vulgate",new pt(Nt.Vulgate)),B(pt,"English",new pt(Nt.English)),B(pt,"RussianProtestant",new pt(Nt.RussianProtestant)),B(pt,"RussianOrthodox",new pt(Nt.RussianOrthodox));let Wt=pt;function Zn(t,n){const r=n[0];for(let o=1;o<n.length;o++)t=t.split(n[o]).join(r);return t.split(r)}var Er=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Er||{});const it=class G{constructor(n,r,o,a){if(B(this,"firstChapter"),B(this,"lastChapter"),B(this,"lastVerse"),B(this,"hasSegmentsDefined"),B(this,"text"),B(this,"BBBCCCVVVS"),B(this,"longHashCode"),B(this,"versification"),B(this,"rtlMark","‏"),B(this,"_bookNum",0),B(this,"_chapterNum",0),B(this,"_verseNum",0),B(this,"_verse"),o==null&&a==null)if(n!=null&&typeof n=="string"){const s=n,l=r!=null&&r instanceof Wt?r:void 0;this.setEmpty(l),this.parse(s)}else if(n!=null&&typeof n=="number"){const s=r!=null&&r instanceof Wt?r:void 0;this.setEmpty(s),this._verseNum=n%G.chapterDigitShifter,this._chapterNum=Math.floor(n%G.bookDigitShifter/G.chapterDigitShifter),this._bookNum=Math.floor(n/G.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof G){const s=n;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(n==null)return;const s=n instanceof Wt?n:G.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&o!=null)if(typeof n=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(n,r,o);else if(typeof n=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=o,this.versification=a??G.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new G(n),{success:!0,verseRef:r}}catch(o){if(o instanceof xe)return r=new G,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(n,r,o){return n%G.bcvMaxValue*G.bookDigitShifter+(r>=0?r%G.bcvMaxValue*G.chapterDigitShifter:0)+(o>=0?o%G.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:o,verseNum:a,verse:s,versificationStr:l}=n,w=s||a.toString();let d;return l&&(d=new Wt(l)),r?new G(r,o.toString(),w,d):new G}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<n.length;a++){if(o=n[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>G.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(G.verseRangeSeparator)||this._verse.includes(G.verseSequenceIndicator))}get book(){return H.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=H.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:o}=G.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=G.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>H.lastBook)throw new xe("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Wt(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(G.verseRangeSeparators,G.verseSequenceIndicators)}get BBBCCC(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const s=n.split("/");if(n=s[0],s.length>1)try{const l=+s[1].trim();this.versification=new Wt(Nt[l])}catch{throw new xe("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new xe("Invalid reference : "+n);const o=r[1].split(":"),a=+o[0];if(o.length!==2||H.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!G.isVerseParseable(o[1]))throw new xe("Invalid reference : "+n);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new G(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof G?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=G.verseRangeSeparators,o=G.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],s=Zn(this._verse,o);for(const l of s.map(w=>Zn(w,r))){const w=this.clone();w.verse=l[0];const d=w.verseNum;if(a.push(w),l.length>1){const c=this.clone();if(c.verse=l[1],!n)for(let p=d+1;p<c.verseNum;p++){const f=new G(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||a.push(f)}a.push(c)}}return a}validateVerse(n,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,n,r)){const s=a.internalValid;if(s!==0)return s;const l=a.BBBCCCVVV;if(o>l)return 3;if(o===l)return 4;o=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>H.lastBook?2:(H.isCanonical(this._bookNum),0)}setEmpty(n=G.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,o){this.bookNum=H.bookIdToNumber(n),this.chapter=r,this.verse=o}};B(it,"defaultVersification",Wt.English),B(it,"verseRangeSeparator","-"),B(it,"verseSequenceIndicator",","),B(it,"verseRangeSeparators",[it.verseRangeSeparator]),B(it,"verseSequenceIndicators",[it.verseSequenceIndicator]),B(it,"chapterDigitShifter",1e3),B(it,"bookDigitShifter",it.chapterDigitShifter*it.chapterDigitShifter),B(it,"bcvMaxValue",it.chapterDigitShifter-1),B(it,"ValidStatusType",Er);let xe=class extends Error{};const Tr=(t,n,r,o,a)=>{switch(t){case N.Section.OT:return n??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},cs=(t,n,r,o,a)=>{switch(t){case N.Section.OT:return n??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function we(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedName)??H.bookIdToEnglishName(t)}function yn(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Rr=H.allBookIds.filter(t=>!H.isObsolete(H.bookIdToNumber(t))),Qt=Object.fromEntries(Rr.map(t=>[t,H.bookIdToEnglishName(t)]));function Nn(t,n,r){const o=n.trim().toLowerCase();if(!o)return!1;const a=H.bookIdToEnglishName(t),s=r==null?void 0:r.get(t);return!!(N.includes(a.toLowerCase(),o)||N.includes(t.toLowerCase(),o)||(s?N.includes(s.localizedName.toLowerCase(),o)||N.includes(s.localizedId.toLowerCase(),o):!1))}const Mr=i.forwardRef(({bookId:t,isSelected:n,onSelect:r,onMouseDown:o,section:a,className:s,showCheck:l=!1,localizedBookNames:w,commandValue:d},c)=>{const p=i.useRef(!1),f=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=y=>{p.current=!0,o?o(y):r==null||r(t)},m=i.useMemo(()=>we(t,w),[t,w]),g=i.useMemo(()=>yn(t,w),[t,w]);return e.jsx("div",{className:u("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===N.Section.OT,"tw-border-s-purple-200":a===N.Section.NT,"tw-border-s-indigo-200":a===N.Section.DC,"tw-border-s-amber-200":a===N.Section.Extra}),children:e.jsxs(It,{ref:c,value:d||`${t} ${H.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":n,"aria-label":`${H.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:s,children:[l&&e.jsx(k.Check,{className:u("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",n?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),e.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Ir=Gt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),L=i.forwardRef(({className:t,variant:n,size:r,asChild:o=!1,...a},s)=>{const l=o?ue.Slot:"button";return e.jsx(l,{className:u(Ir({variant:n,size:r,className:t})),ref:s,...a})});L.displayName="Button";const Xt=de.Root,qt=de.Trigger,ds=de.Anchor,Dt=i.forwardRef(({className:t,align:n="center",sideOffset:r=4,...o},a)=>{const s=et();return e.jsx(de.Portal,{children:e.jsx(de.Content,{ref:a,align:n,sideOffset:r,className:u("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:s})})});Dt.displayName=de.Content.displayName;function pn(t,n,r){return`${t} ${Qt[t]}${n?` ${yn(t,n)} ${we(t,n)}`:""}${r?` ${r}`:""}`}function Dr({recentSearches:t,onSearchItemSelect:n,renderItem:r=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:a="Show recent searches",groupHeading:s="Recent",id:l}){const[w,d]=i.useState(!1);if(t.length===0)return;const c=p=>{n(p),d(!1)};return e.jsxs(Xt,{open:w,onOpenChange:d,children:[e.jsx(qt,{asChild:!0,children:e.jsx(L,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:e.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),e.jsx(Dt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:e.jsx(Ht,{children:e.jsx(Kt,{children:e.jsx(Mt,{heading:s,children:t.map(p=>e.jsxs(It,{onSelect:()=>c(p),className:"tw-flex tw-items-center",children:[e.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),e.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function ps(t,n,r=(a,s)=>a===s,o=15){return a=>{const s=t.filter(w=>!r(w,a)),l=[a,...s.slice(0,o-1)];n(l)}}const en={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},us=[en.BOOK_ONLY,en.BOOK_CHAPTER,en.BOOK_CHAPTER_VERSE];function Qn(t){const n=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:n,isDigit:r}}function jt(t){return N.getChaptersForBook(H.bookIdToNumber(t))}function ms(t,n,r){if(!t.trim()||n.length===0)return;const o=us.reduce((a,s)=>{if(a)return a;const l=s.exec(t.trim());if(l){const[w,d=void 0,c=void 0]=l.slice(1);let p;const f=n.filter(h=>Nn(h,w,r));if(f.length===1&&([p]=f),!p&&d){if(H.isBookIdValid(w)){const h=w.toUpperCase();n.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===w.toLowerCase());h&&n.includes(h[0])&&([p]=h)}}if(!p&&d){const m=(g=>Object.keys(Qt).find(y=>Qt[y].toLowerCase()===g.toLowerCase()))(w);if(m&&n.includes(m)&&(p=m),!p&&r){const g=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===w.toLowerCase());g&&n.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>jt(p)&&(h=Math.max(jt(p),1));const m=c?parseInt(c,10):void 0;return{book:p,chapterNum:h,verseNum:m}}}},void 0);if(o)return o}function hs(t,n,r,o){const a=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=n.indexOf(t.book);if(d>0){const c=n[d-1],p=Math.max(jt(c),1);o({book:c,chapterNum:p,verseNum:1})}}},[t,n,o]),s=i.useCallback(()=>{const d=jt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=n.indexOf(t.book);if(c<n.length-1){const p=n[c+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,n,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),w=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:a,disabled:n.length===0||t.chapterNum===1&&n.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:l,disabled:n.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:w,disabled:n.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:s,disabled:n.length===0||(t.chapterNum===jt(t.book)||jt(t.book)===-1)&&n.indexOf(t.book)===n.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,n,r,a,l,w,s])}function tr({bookId:t,scrRef:n,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:s}){if(t)return e.jsx(Mt,{children:e.jsx("div",{className:u("tw-grid tw-grid-cols-6 tw-gap-1",s),children:Array.from({length:jt(t)},(l,w)=>w+1).map(l=>e.jsx(It,{value:`${t} ${Qt[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:u("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===n.book&&l===n.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(l))??!1}),children:l},l))})})}function fs({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:s,recentSearches:l,onAddRecentSearch:w,id:d}){const c=et(),[p,f]=i.useState(!1),[h,m]=i.useState(""),[g,y]=i.useState(""),[x,C]=i.useState("books"),[S,v]=i.useState(void 0),[_,D]=i.useState(!1),E=i.useRef(void 0),T=i.useRef(void 0),I=i.useRef(void 0),j=i.useRef(void 0),R=i.useRef({}),P=i.useCallback(b=>{n(b),w&&w(b)},[n,w]),$=i.useMemo(()=>o?o():Rr,[o]),z=i.useMemo(()=>({[N.Section.OT]:$.filter(F=>H.isBookOT(F)),[N.Section.NT]:$.filter(F=>H.isBookNT(F)),[N.Section.DC]:$.filter(F=>H.isBookDC(F)),[N.Section.Extra]:$.filter(F=>H.extraBooks().includes(F))}),[$]),A=i.useMemo(()=>Object.values(z).flat(),[z]),K=i.useMemo(()=>{if(!g.trim())return z;const b={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(X=>{b[X]=z[X].filter(rt=>Nn(rt,g,a))}),b},[z,g,a]),O=i.useMemo(()=>ms(g,A,a),[g,A,a]),W=i.useCallback(()=>{O&&(P({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1}),f(!1),y(""),m(""))},[P,O]),mt=i.useCallback(b=>{if(jt(b)<=1){P({book:b,chapterNum:1,verseNum:1}),f(!1),y("");return}v(b),C("chapters")},[P]),ft=i.useCallback(b=>{const F=x==="chapters"?S:O==null?void 0:O.book;F&&(P({book:F,chapterNum:b,verseNum:1}),f(!1),C("books"),v(void 0),y(""))},[P,x,S,O]),ct=i.useCallback(b=>{P(b),f(!1),y("")},[P]),V=hs(t,A,c,n),q=i.useCallback(()=>{C("books"),v(void 0),setTimeout(()=>{T.current&&T.current.focus()},0)},[]),ot=i.useCallback(b=>{if(!b&&x==="chapters"){q();return}f(b),b&&(C("books"),v(void 0),y(""))},[x,q]),{otLong:nt,ntLong:ht,dcLong:Pt,extraLong:dt}={otLong:s==null?void 0:s["%scripture_section_ot_long%"],ntLong:s==null?void 0:s["%scripture_section_nt_long%"],dcLong:s==null?void 0:s["%scripture_section_dc_long%"],extraLong:s==null?void 0:s["%scripture_section_extra_long%"]},Je=i.useCallback(b=>Tr(b,nt,ht,Pt,dt),[nt,ht,Pt,dt]),We=i.useCallback(b=>O?!!O.chapterNum&&!b.toString().includes(O.chapterNum.toString()):!1,[O]),le=i.useMemo(()=>N.formatScrRef(t,a?we(t.book,a):"English"),[t,a]),Ie=i.useCallback(b=>F=>{R.current[b]=F},[]),Ze=i.useCallback(b=>{(b.key==="Home"||b.key==="End")&&b.stopPropagation()},[]),De=i.useCallback(b=>{if(b.ctrlKey)return;const{isLetter:F,isDigit:X}=Qn(b.key);if(x==="chapters"){if(b.key==="Backspace"){b.preventDefault(),b.stopPropagation(),q();return}if(F||X){if(b.preventDefault(),b.stopPropagation(),C("books"),v(void 0),X&&S){const rt=Qt[S];y(`${rt} ${b.key}`)}else y(b.key);setTimeout(()=>{T.current&&T.current.focus()},0);return}}if((x==="chapters"||x==="books"&&O)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(b.key)){const rt=x==="chapters"?S:O==null?void 0:O.book;if(!rt)return;const st=(()=>{if(!h)return 1;const be=h.match(/(\d+)$/);return be?parseInt(be[1],10):0})(),Yt=jt(rt);if(!Yt)return;let Et=st;const Yn=6;switch(b.key){case"ArrowLeft":st!==0&&(Et=st>1?st-1:Yt);break;case"ArrowRight":st!==0&&(Et=st<Yt?st+1:1);break;case"ArrowUp":Et=st===0?Yt:Math.max(1,st-Yn);break;case"ArrowDown":Et=st===0?1:Math.min(Yt,st+Yn);break;default:return}Et!==st&&(b.preventDefault(),b.stopPropagation(),m(pn(rt,a,Et)),setTimeout(()=>{const be=R.current[Et];be&&be.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,O,q,S,h,a]),Qe=i.useCallback(b=>{if(b.shiftKey||b.key==="Tab"||b.key===" ")return;const{isLetter:F,isDigit:X}=Qn(b.key);(F||X)&&(b.preventDefault(),y(rt=>rt+b.key),T.current.focus(),D(!1))},[]);return i.useLayoutEffect(()=>{const b=setTimeout(()=>{if(p&&x==="books"&&I.current&&j.current){const F=I.current,X=j.current,rt=X.offsetTop,st=F.clientHeight,Yt=X.clientHeight,Et=rt-st/2+Yt/2;F.scrollTo({top:Math.max(0,Et),behavior:"smooth"}),m(pn(t.book))}},0);return()=>{clearTimeout(b)}},[p,x,g,O,t.book]),i.useLayoutEffect(()=>{if(x==="chapters"&&S){const b=S===t.book;setTimeout(()=>{if(I.current)if(b){const F=R.current[t.chapterNum];F&&F.scrollIntoView({block:"center",behavior:"smooth"})}else I.current.scrollTo({top:0});E.current&&E.current.focus()},0)}},[x,S,O,t.book,t.chapterNum]),e.jsxs(Xt,{open:p,onOpenChange:ot,children:[e.jsx(qt,{asChild:!0,children:e.jsx(L,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:u("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:e.jsx("span",{className:"tw-truncate",children:le})})}),e.jsx(Dt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:e.jsxs(Ht,{ref:E,onKeyDown:De,loop:!0,value:h,onValueChange:m,shouldFilter:!1,children:[x==="books"?e.jsxs("div",{className:"tw-flex tw-items-end",children:[e.jsxs("div",{className:"tw-relative tw-flex-1",children:[e.jsx(he,{ref:T,value:g,onValueChange:y,onKeyDown:Ze,onFocus:()=>D(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&e.jsx(Dr,{recentSearches:l,onSearchItemSelect:ct,renderItem:b=>N.formatScrRef(b,"English"),getItemKey:b=>`${b.book}-${b.chapterNum}-${b.verseNum}`,ariaLabel:s==null?void 0:s["%history_recentSearches_ariaLabel%"],groupHeading:s==null?void 0:s["%history_recent%"]})]}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:V.map(({onClick:b,disabled:F,title:X,icon:rt})=>e.jsx(L,{variant:"ghost",size:"sm",onClick:()=>{D(!0),b()},disabled:F,className:"tw-h-10 tw-w-4 tw-p-0",title:X,onKeyDown:Qe,children:e.jsx(rt,{})},X))})]}):e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[e.jsx(L,{variant:"ghost",size:"sm",onClick:q,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:c==="ltr"?e.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):e.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),S&&e.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:we(S,a)})]}),!_&&e.jsxs(Kt,{ref:I,children:[x==="books"&&e.jsxs(e.Fragment,{children:[!O&&Object.entries(K).map(([b,F])=>{if(F.length!==0)return e.jsx(Mt,{heading:Je(b),children:F.map(X=>e.jsx(Mr,{bookId:X,onSelect:rt=>mt(rt),section:N.getSectionForBook(X),commandValue:`${X} ${Qt[X]}`,ref:X===t.book?j:void 0,localizedBookNames:a},X))},b)}),O&&e.jsx(Mt,{children:e.jsx(It,{value:`${O.book} ${Qt[O.book]} ${O.chapterNum||""}:${O.verseNum||""})}`,onSelect:W,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1},a?yn(O.book,a):void 0)},"top-match")}),O&&jt(O.book)>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:we(O.book,a)}),e.jsx(tr,{bookId:O.book,scrRef:t,onChapterSelect:ft,setChapterRef:Ie,isChapterDimmed:We,className:"tw-px-4 tw-pb-4"})]})]}),x==="chapters"&&S&&e.jsx(tr,{bookId:S,scrRef:t,onChapterSelect:ft,setChapterRef:Ie,className:"tw-p-4"})]})]})})]})}const gs=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),bs=Gt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),tt=i.forwardRef(({className:t,...n},r)=>e.jsx(hr.Root,{ref:r,className:u("pr-twp",bs(),t),...n}));tt.displayName=hr.Root.displayName;const He=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(Ne.Root,{className:u("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:o})});He.displayName=Ne.Root.displayName;const je=i.forwardRef(({className:t,...n},r)=>e.jsx(Ne.Item,{ref:r,className:u("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(Ne.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));je.displayName=Ne.Item.displayName;function xs(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Pe({id:t,options:n=[],className:r,buttonClassName:o,popoverContentClassName:a,value:s,onChange:l=()=>{},getOptionLabel:w=xs,getButtonLabel:d,icon:c=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:y=!1,ariaLabel:x,...C}){const[S,v]=i.useState(!1),_=d??w,D=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],E=(T,I)=>{const j=w(T),R=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,P=`${I??""}${j}${R??""}`;return e.jsxs(It,{value:j,onSelect:()=>{l(T),v(!1)},className:"tw-flex tw-items-center",children:[e.jsx(k.Check,{className:u("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!s||w(s)!==j})}),e.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[j,R&&e.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",R]})]})]},P)};return e.jsxs(Xt,{open:S,onOpenChange:v,...C,children:[e.jsx(qt,{asChild:!0,children:e.jsxs(L,{variant:m,role:"combobox","aria-expanded":S,"aria-label":x,id:t,className:u("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:y,children:[e.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:c}),e.jsx("span",{className:u("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:s?_(s):p})]}),e.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Dt,{align:g,className:u("tw-w-[200px] tw-p-0",a),children:e.jsxs(Ht,{children:[e.jsx(he,{placeholder:f,className:"tw-text-inherit"}),e.jsx(Se,{children:h}),e.jsx(Kt,{children:D(n)?n.map(T=>e.jsx(Mt,{heading:T.groupHeading,children:T.options.map(I=>E(I,T.groupHeading))},T.groupHeading)):n.map(T=>E(T))})]})})]})}function Or({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:s}){const l=i.useMemo(()=>Array.from({length:s},(c,p)=>p+1),[s]),w=c=>{r(c),c>n&&o(c)},d=c=>{o(c),c<t&&r(c)};return e.jsxs(e.Fragment,{children:[e.jsx(tt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(Pe,{isDisabled:a,onChange:w,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:c=>c.toString(),value:t},"start chapter"),e.jsx(tt,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(Pe,{isDisabled:a,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:c=>c.toString(),value:n},"end chapter")]})}var Ar=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Ar||{});const vs=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),nn=(t,n)=>t[n]??n;function ys({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:s,handleSelectEndChapter:l,startChapter:w,handleSelectStartChapter:d,localizedStrings:c}){const p=nn(c,"%webView_bookSelector_currentBook%"),f=nn(c,"%webView_bookSelector_choose%"),h=nn(c,"%webView_bookSelector_chooseBooks%"),[m,g]=i.useState("current book"),y=x=>{g(x),t(x)};return e.jsx(He,{className:"pr-twp tw-flex",value:m,onValueChange:x=>y(x),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(je,{value:"current book"}),e.jsx(tt,{className:"tw-ms-1",children:p})]}),e.jsx(tt,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(Or,{isDisabled:m==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:a,startChapter:w,endChapter:s})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(je,{value:"choose books"}),e.jsx(tt,{className:"tw-ms-1",children:h})]}),e.jsx(tt,{className:"tw-flex tw-items-center",children:o.map(x=>H.bookIdToEnglishName(x)).join(", ")}),e.jsx(L,{disabled:m==="current book",onClick:()=>r(),children:f})]})]})})}const Ns=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],js=["input","select","textarea","button"],ks=["button","textbox"],Pr=({options:t,onFocusChange:n,onOptionSelect:r,onCharacterPress:o})=>{const a=i.useRef(null),[s,l]=i.useState(void 0),[w,d]=i.useState(void 0),c=i.useCallback(m=>{l(m);const g=t.find(x=>x.id===m);g&&(n==null||n(g));const y=document.getElementById(m);y&&(y.scrollIntoView({block:"center"}),y.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[n,t]),p=i.useCallback(m=>{const g=t.find(y=>y.id===m);g&&(d(y=>y===m?void 0:m),r==null||r(g))},[r,t]),f=m=>{if(!m)return!1;const g=m.tagName.toLowerCase();if(m.isContentEditable||js.includes(g))return!0;const y=m.getAttribute("role");if(y&&ks.includes(y))return!0;const x=m.getAttribute("tabindex");return x!==void 0&&x!=="-1"},h=i.useCallback(m=>{var T;const g=m.target,y=I=>I?document.getElementById(I):void 0,x=y(w),C=y(s);if(!!(x&&g&&x.contains(g)&&g!==x)&&f(g)){if(m.key==="Escape"||m.key==="ArrowLeft"&&!g.isContentEditable){if(w){m.preventDefault(),m.stopPropagation();const I=t.find(j=>j.id===w);I&&c(I.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!x)return;const I=Array.from(x.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(I.length===0)return;const j=I.findIndex(P=>P===g);if(j===-1)return;let R;m.key==="ArrowDown"?R=Math.min(j+1,I.length-1):R=Math.max(j-1,0),R!==j&&(m.preventDefault(),m.stopPropagation(),(T=I[R])==null||T.focus());return}return}const _=t.findIndex(I=>I.id===s);let D=_;switch(m.key){case"ArrowDown":D=Math.min(_+1,t.length-1),m.preventDefault();break;case"ArrowUp":D=Math.max(_-1,0),m.preventDefault();break;case"Home":D=0,m.preventDefault();break;case"End":D=t.length-1,m.preventDefault();break;case" ":case"Enter":s&&p(s),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const I=C;if(I){const j=I.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=I.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=j??R;if(P){m.preventDefault(),P.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(f(g)||(o==null||o(m.key),m.preventDefault()));return}const E=t[D];E&&c(E.id)},[t,c,s,w,p,o]);return{listboxRef:a,activeId:s,selectedId:w,handleKeyDown:h,focusOption:c}},Vr=i.createContext(null);function _s(t,n){return{getTheme:function(){return n??null}}}function St(){const t=i.useContext(Vr);return t==null&&function(n,...r){const o=new URL("https://lexical.dev/docs/error"),a=new URLSearchParams;a.append("code",n);for(const s of r)a.append("v",s);throw o.search=a.toString(),Error(`Minified Lexical error #${n}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Lr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Cs=Lr?i.useLayoutEffect:i.useEffect,Oe={tag:M.HISTORY_MERGE_TAG};function Ss({initialConfig:t,children:n}){const r=i.useMemo(()=>{const{theme:o,namespace:a,nodes:s,onError:l,editorState:w,html:d}=t,c=_s(null,o),p=M.createEditor({editable:t.editable,html:d,namespace:a,nodes:s,onError:f=>l(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const m=M.$getRoot();if(m.isEmpty()){const g=M.$createParagraphNode();m.append(g);const y=Lr?document.activeElement:null;(M.$getSelection()!==null||y!==null&&y===f.getRootElement())&&g.select()}},Oe);else if(h!==null)switch(typeof h){case"string":{const m=f.parseEditorState(h);f.setEditorState(m,Oe);break}case"object":f.setEditorState(h,Oe);break;case"function":f.update(()=>{M.$getRoot().isEmpty()&&h(f)},Oe)}}}(p,w),[p,c]},[]);return Cs(()=>{const o=t.editable,[a]=r;a.setEditable(o===void 0||o)},[]),e.jsx(Vr.Provider,{value:r,children:n})}const Es=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ts({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:n=!1,onChange:r}){const[o]=St();return Es(()=>{if(r)return o.registerUpdateListener(({editorState:a,dirtyElements:s,dirtyLeaves:l,prevEditorState:w,tags:d})=>{n&&s.size===0&&l.size===0||t&&d.has(M.HISTORY_MERGE_TAG)||w.isEmpty()||r(a,o,d)})},[o,t,n,r]),null}const jn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},_t=Ce.Provider,Tt=Ce.Root,$t=Ce.Trigger,Ct=i.forwardRef(({className:t,sideOffset:n=4,...r},o)=>e.jsx(Ce.Content,{ref:o,sideOffset:n,className:u("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));Ct.displayName=Ce.Content.displayName;const kn=[ln.HeadingNode,M.ParagraphNode,M.TextNode,ln.QuoteNode];function un(t,n){return un=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},un(t,n)}var er={error:null},Rs=function(t){var n,r;function o(){for(var s,l=arguments.length,w=new Array(l),d=0;d<l;d++)w[d]=arguments[d];return(s=t.call.apply(t,[this].concat(w))||this).state=er,s.resetErrorBoundary=function(){for(var c,p=arguments.length,f=new Array(p),h=0;h<p;h++)f[h]=arguments[h];s.props.onReset==null||(c=s.props).onReset.apply(c,f),s.reset()},s}r=t,(n=o).prototype=Object.create(r.prototype),n.prototype.constructor=n,un(n,r),o.getDerivedStateFromError=function(s){return{error:s}};var a=o.prototype;return a.reset=function(){this.setState(er)},a.componentDidCatch=function(s,l){var w,d;(w=(d=this.props).onError)==null||w.call(d,s,l)},a.componentDidUpdate=function(s,l){var w,d,c,p,f=this.state.error,h=this.props.resetKeys;f!==null&&l.error!==null&&((c=s.resetKeys)===void 0&&(c=[]),(p=h)===void 0&&(p=[]),c.length!==p.length||c.some(function(m,g){return!Object.is(m,p[g])}))&&((w=(d=this.props).onResetKeysChange)==null||w.call(d,s.resetKeys,h),this.reset())},a.render=function(){var s=this.state.error,l=this.props,w=l.fallbackRender,d=l.FallbackComponent,c=l.fallback;if(s!==null){var p={error:s,resetErrorBoundary:this.resetErrorBoundary};if(tn.isValidElement(c))return c;if(typeof w=="function")return w(p);if(d)return tn.createElement(d,p);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},o}(tn.Component);function Ms({children:t,onError:n}){return e.jsx(Rs,{fallback:e.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:n,children:t})}const Is=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ds(t){return{initialValueFn:()=>t.isEditable(),subscribe:n=>t.registerEditableListener(n)}}function Os(){return function(t){const[n]=St(),r=i.useMemo(()=>t(n),[n,t]),[o,a]=i.useState(()=>r.initialValueFn()),s=i.useRef(o);return Is(()=>{const{initialValueFn:l,subscribe:w}=r,d=l();return s.current!==d&&(s.current=d,a(d)),w(c=>{s.current=c,a(c)})},[r,t]),o}(Ds)}function As(){return M.$getRoot().getTextContent()}function Ps(t,n=!0){if(t)return!1;let r=As();return n&&(r=r.trim()),r===""}function Vs(t){if(!Ps(t,!1))return!1;const n=M.$getRoot().getChildren(),r=n.length;if(r>1)return!1;for(let o=0;o<r;o++){const a=n[o];if(M.$isDecoratorNode(a))return!1;if(M.$isElementNode(a)){if(!M.$isParagraphNode(a)||a.__indent!==0)return!1;const s=a.getChildren(),l=s.length;for(let w=0;w<l;w++){const d=s[o];if(!M.$isTextNode(d))return!1}}}return!0}function $r(t){return()=>Vs(t)}function Ls(t,n){const r=t.getStartEndPoints();if(n.isSelected(t)&&!M.$isTokenOrSegmented(n)&&r!==null){const[o,a]=r,s=t.isBackward(),l=o.getNode(),w=a.getNode(),d=n.is(l),c=n.is(w);if(d||c){const[p,f]=M.$getCharacterOffsets(t),h=l.is(w),m=n.is(s?w:l),g=n.is(s?l:w);let y,x=0;h?(x=p>f?f:p,y=p>f?p:f):m?(x=s?f:p,y=void 0):g&&(x=0,y=s?p:f),n.__text=n.__text.slice(x,y)}}return n}const Fr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,$s=Fr&&"documentMode"in document?document.documentMode:null;!(!Fr||!("InputEvent"in window)||$s)&&"getTargetRanges"in new window.InputEvent("input");function _n(...t){return()=>{for(let n=t.length-1;n>=0;n--)t[n]();t.length=0}}function Fs(t){const n=window.location.origin,r=o=>{if(o.origin!==n)return;const a=t.getRootElement();if(document.activeElement!==a)return;const s=o.data;if(typeof s=="string"){let l;try{l=JSON.parse(s)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const w=l.payload;if(w&&w.functionId==="makeChanges"){const d=w.args;if(d){const[c,p,f,h,m,g]=d;t.update(()=>{const y=M.$getSelection();if(M.$isRangeSelection(y)){const x=y.anchor;let C=x.getNode(),S=0,v=0;if(M.$isTextNode(C)&&c>=0&&p>=0&&(S=c,v=c+p,y.setTextNodeRange(C,S,C,v)),S===v&&f===""||(y.insertRawText(f),C=x.getNode()),M.$isTextNode(C)){S=h,v=h+m;const _=C.getTextContentSize();S=S>_?_:S,v=v>_?_:v,y.setTextNodeRange(C,S,C,v)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}const mn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function nr(t){return t.getEditorState().read($r(t.isComposing()))}function zs({contentEditable:t,placeholder:n=null,ErrorBoundary:r}){const[o]=St(),a=function(s,l){const[w,d]=i.useState(()=>s.getDecorators());return mn(()=>s.registerDecoratorListener(c=>{Jn.flushSync(()=>{d(c)})}),[s]),i.useEffect(()=>{d(s.getDecorators())},[s]),i.useMemo(()=>{const c=[],p=Object.keys(w);for(let f=0;f<p.length;f++){const h=p[f],m=e.jsx(l,{onError:y=>s._onError(y),children:e.jsx(i.Suspense,{fallback:null,children:w[h]})}),g=s.getElementByKey(h);g!==null&&c.push(Jn.createPortal(m,g,h))}return c},[l,w,s])}(o,r);return function(s){mn(()=>_n(ln.registerRichText(s),Fs(s)),[s])}(o),e.jsxs(e.Fragment,{children:[t,e.jsx(Bs,{content:n}),a]})}function Bs({content:t}){const[n]=St(),r=function(a){const[s,l]=i.useState(()=>nr(a));return mn(()=>{function w(){const d=nr(a);l(d)}return w(),_n(a.registerUpdateListener(()=>{w()}),a.registerEditableListener(()=>{w()}))},[a]),s}(n),o=Os();return r?typeof t=="function"?t(o):t:null}function Gs({defaultSelection:t}){const[n]=St();return i.useEffect(()=>{n.focus(()=>{const r=document.activeElement,o=n.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,n]),null}const Hs=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ks({onClear:t}){const[n]=St();return Hs(()=>n.registerCommand(M.CLEAR_EDITOR_COMMAND,r=>(n.update(()=>{if(t==null){const o=M.$getRoot(),a=M.$getSelection(),s=M.$createParagraphNode();o.clear(),o.append(s),a!==null&&s.select(),M.$isRangeSelection(a)&&(a.format=0)}else t()}),!0),M.COMMAND_PRIORITY_EDITOR),[n,t]),null}const zr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Xs({editor:t,ariaActiveDescendant:n,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:a,ariaErrorMessage:s,ariaExpanded:l,ariaInvalid:w,ariaLabel:d,ariaLabelledBy:c,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:m,className:g,id:y,role:x="textbox",spellCheck:C=!0,style:S,tabIndex:v,"data-testid":_,...D},E){const[T,I]=i.useState(t.isEditable()),j=i.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),R=i.useMemo(()=>function(...P){return $=>{P.forEach(z=>{typeof z=="function"?z($):z!=null&&(z.current=$)})}}(E,j),[j,E]);return zr(()=>(I(t.isEditable()),t.registerEditableListener(P=>{I(P)})),[t]),e.jsx("div",{"aria-activedescendant":T?n:void 0,"aria-autocomplete":T?r:"none","aria-controls":T?o:void 0,"aria-describedby":a,...s!=null?{"aria-errormessage":s}:{},"aria-expanded":T&&x==="combobox"?!!l:void 0,...w!=null?{"aria-invalid":w}:{},"aria-label":d,"aria-labelledby":c,"aria-multiline":p,"aria-owns":T?f:void 0,"aria-readonly":!T||void 0,"aria-required":h,autoCapitalize:m,className:g,contentEditable:T,"data-testid":_,id:y,ref:R,role:x,spellCheck:C,style:S,tabIndex:v,...D})}const qs=i.forwardRef(Xs);function rr(t){return t.getEditorState().read($r(t.isComposing()))}const Us=i.forwardRef(Ys);function Ys(t,n){const{placeholder:r,...o}=t,[a]=St();return e.jsxs(e.Fragment,{children:[e.jsx(qs,{editor:a,...o,ref:n}),r!=null&&e.jsx(Js,{editor:a,content:r})]})}function Js({content:t,editor:n}){const r=function(l){const[w,d]=i.useState(()=>rr(l));return zr(()=>{function c(){const p=rr(l);d(p)}return c(),_n(l.registerUpdateListener(()=>{c()}),l.registerEditableListener(()=>{c()}))},[l]),w}(n),[o,a]=i.useState(n.isEditable());if(i.useLayoutEffect(()=>(a(n.isEditable()),n.registerEditableListener(l=>{a(l)})),[n]),!r)return null;let s=null;return typeof t=="function"?s=t(o):t!==null&&(s=t),s===null?null:e.jsx("div",{"aria-hidden":!0,children:s})}function Ws({placeholder:t,className:n,placeholderClassName:r}){return e.jsx(Us,{className:n??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:e.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Br=i.createContext(void 0);function Zs({activeEditor:t,$updateToolbar:n,blockType:r,setBlockType:o,showModal:a,children:s}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:n,blockType:r,setBlockType:o,showModal:a}),[t,n,r,o,a]);return e.jsx(Br.Provider,{value:l,children:s})}function Gr(){const t=i.useContext(Br);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Qs(){const[t,n]=i.useState(void 0),r=i.useCallback(()=>{n(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:s,content:l}=t;return e.jsx(Ya,{open:!0,onOpenChange:r,children:e.jsxs(xr,{children:[e.jsx(vr,{children:e.jsx(yr,{children:s})}),l]})})},[t,r]),a=i.useCallback((s,l,w=!1)=>{n({closeOnClickOutside:w,content:l(r),title:s})},[r]);return[o,a]}function ti({children:t}){const[n]=St(),[r,o]=i.useState(n),[a,s]=i.useState("paragraph"),[l,w]=Qs(),d=()=>{};return i.useEffect(()=>r.registerCommand(M.SELECTION_CHANGE_COMMAND,(c,p)=>(o(p),!1),M.COMMAND_PRIORITY_CRITICAL),[r]),e.jsxs(Zs,{activeEditor:r,$updateToolbar:d,blockType:a,setBlockType:s,showModal:w,children:[l,t({blockType:a})]})}function ei(t){const[n]=St(),{activeEditor:r}=Gr();i.useEffect(()=>r.registerCommand(M.SELECTION_CHANGE_COMMAND,()=>{const o=M.$getSelection();return o&&t(o),!1},M.COMMAND_PRIORITY_CRITICAL),[n,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=M.$getSelection();o&&t(o)})},[r,t])}const Hr=Gt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ni=i.forwardRef(({className:t,variant:n,size:r,...o},a)=>e.jsx(fr.Root,{ref:a,className:u(Hr({variant:n,size:r,className:t})),...o}));ni.displayName=fr.Root.displayName;const Kr=i.createContext({size:"default",variant:"default"}),Ke=i.forwardRef(({className:t,variant:n,size:r,children:o,...a},s)=>{const l=et();return e.jsx(Ge.Root,{ref:s,className:u("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:l,children:e.jsx(Kr.Provider,{value:{variant:n,size:r},children:o})})});Ke.displayName=Ge.Root.displayName;const ce=i.forwardRef(({className:t,children:n,variant:r,size:o,...a},s)=>{const l=i.useContext(Kr);return e.jsx(Ge.Item,{ref:s,className:u(Hr({variant:l.variant||r,size:l.size||o}),t),...a,children:n})});ce.displayName=Ge.Item.displayName;const or=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function ri(){const{activeEditor:t}=Gr(),[n,r]=i.useState([]),o=i.useCallback(a=>{if(M.$isRangeSelection(a)||Ma.$isTableSelection(a)){const s=[];or.forEach(({format:l})=>{a.hasFormat(l)&&s.push(l)}),r(l=>l.length!==s.length||!s.every(w=>l.includes(w))?s:l)}},[]);return ei(o),e.jsx(Ke,{type:"multiple",value:n,onValueChange:r,variant:"outline",size:"sm",children:or.map(({format:a,icon:s,label:l})=>e.jsx(ce,{value:a,"aria-label":l,onClick:()=>{t.dispatchCommand(M.FORMAT_TEXT_COMMAND,a)},children:e.jsx(s,{className:"tw-h-4 tw-w-4"})},a))})}function oi({onClear:t}){const[n]=St();i.useEffect(()=>{t&&t(()=>{n.dispatchCommand(M.CLEAR_EDITOR_COMMAND,void 0)})},[n,t])}function ai({placeholder:t="Start typing ...",autoFocus:n=!1,onClear:r}){const[,o]=i.useState(void 0),a=s=>{s!==void 0&&o(s)};return e.jsxs("div",{className:"tw-relative",children:[e.jsx(ti,{children:()=>e.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:e.jsx(ri,{})})}),e.jsxs("div",{className:"tw-relative",children:[e.jsx(zs,{contentEditable:e.jsx("div",{ref:a,children:e.jsx(Ws,{placeholder:t})}),ErrorBoundary:Ms}),n&&e.jsx(Gs,{defaultSelection:"rootEnd"}),e.jsx(oi,{onClear:r}),e.jsx(Ks,{})]})]})}const si={namespace:"commentEditor",theme:jn,nodes:kn,onError:t=>{console.error(t)}};function hn({editorState:t,editorSerializedState:n,onChange:r,onSerializedChange:o,placeholder:a="Start typing…",autoFocus:s=!1,onClear:l}){return e.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:e.jsx(Ss,{initialConfig:{...si,...t?{editorState:t}:{},...n?{editorState:JSON.stringify(n)}:{}},children:e.jsxs(_t,{children:[e.jsx(ai,{placeholder:a,autoFocus:s,onClear:l}),e.jsx(Ts,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function ii(t,n){const r=n.body?n.body.childNodes:[];let o=[];const a=[];for(let s=0;s<r.length;s++){const l=r[s];if(!qr.has(l.nodeName)){const w=Ur(l,t,a,!1);w!==null&&(o=o.concat(w))}}return function(s){for(const l of s)l.getNextSibling()instanceof M.ArtificialNode__DO_NOT_USE&&l.insertAfter(M.$createLineBreakNode());for(const l of s){const w=l.getChildren();for(const d of w)l.insertBefore(d);l.remove()}}(a),o}function li(t,n){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=M.$getRoot().getChildren();for(let a=0;a<o.length;a++)Xr(t,o[a],r,n);return r.innerHTML}function Xr(t,n,r,o=null){let a=o===null||n.isSelected(o);const s=M.$isElementNode(n)&&n.excludeFromCopy("html");let l=n;if(o!==null){let m=M.$cloneWithProperties(n);m=M.$isTextNode(m)&&o!==null?Ls(o,m):m,l=m}const w=M.$isElementNode(l)?l.getChildren():[],d=M.getRegisteredNode(t,l.getType());let c;c=d&&d.exportDOM!==void 0?d.exportDOM(t,l):l.exportDOM(t);const{element:p,after:f}=c;if(!p)return!1;const h=document.createDocumentFragment();for(let m=0;m<w.length;m++){const g=w[m],y=Xr(t,g,h,o);!a&&M.$isElementNode(n)&&y&&n.extractWithChild(g,o,"html")&&(a=!0)}if(a&&!s){if((M.isHTMLElement(p)||M.isDocumentFragment(p))&&p.append(h),r.append(p),f){const m=f.call(l,p);m&&(M.isDocumentFragment(p)?p.replaceChildren(m):p.replaceWith(m))}}else r.append(h);return a}const qr=new Set(["STYLE","SCRIPT"]);function Ur(t,n,r,o,a=new Map,s){let l=[];if(qr.has(t.nodeName))return l;let w=null;const d=function(g,y){const{nodeName:x}=g,C=y._htmlConversions.get(x.toLowerCase());let S=null;if(C!==void 0)for(const v of C){const _=v(g);_!==null&&(S===null||(S.priority||0)<=(_.priority||0))&&(S=_)}return S!==null?S.conversion:null}(t,n),c=d?d(t):null;let p=null;if(c!==null){p=c.after;const g=c.node;if(w=Array.isArray(g)?g[g.length-1]:g,w!==null){for(const[,y]of a)if(w=y(w,s),!w)break;w&&l.push(...Array.isArray(g)?g:[w])}c.forChild!=null&&a.set(t.nodeName,c.forChild)}const f=t.childNodes;let h=[];const m=(w==null||!M.$isRootOrShadowRoot(w))&&(w!=null&&M.$isBlockElementNode(w)||o);for(let g=0;g<f.length;g++)h.push(...Ur(f[g],n,r,m,new Map(a),w));return p!=null&&(h=p(h)),M.isBlockDomNode(t)&&(h=wi(t,h,m?()=>{const g=new M.ArtificialNode__DO_NOT_USE;return r.push(g),g}:M.$createParagraphNode)),w==null?h.length>0?l=l.concat(h):M.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:M.isInlineDomNode(g.nextSibling)&&M.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(M.$createLineBreakNode())):M.$isElementNode(w)&&w.append(...h),l}function wi(t,n,r){const o=t.style.textAlign,a=[];let s=[];for(let l=0;l<n.length;l++){const w=n[l];if(M.$isBlockElementNode(w))o&&!w.getFormat()&&w.setFormat(o),a.push(w);else if(s.push(w),l===n.length-1||l<n.length-1&&M.$isBlockElementNode(n[l+1])){const d=r();d.setFormat(o),d.append(...s),a.push(d),s=[]}}return a}function ci(t){const n=t.querySelector('[contenteditable="true"]');if(!n)return!1;n.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(n),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Vt(t){var n;return(n=t==null?void 0:t.root)!=null&&n.children?t.root.children.some(r=>r!=null&&r.children?r.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function di(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const n=t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),r=pr.createHeadlessEditor({namespace:"EditorUtils",theme:jn,nodes:kn,onError:a=>{console.error(a)}});let o;if(r.update(()=>{const s=new DOMParser().parseFromString(n,"text/html"),l=ii(r,s);M.$getRoot().clear(),M.$insertNodes(l)},{discrete:!0}),r.getEditorState().read(()=>{o=r.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function fn(t){const n=pr.createHeadlessEditor({namespace:"EditorUtils",theme:jn,nodes:kn,onError:a=>{console.error(a)}}),r=n.parseEditorState(JSON.stringify(t));n.setEditorState(r);let o="";return n.getEditorState().read(()=>{o=li(n)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Yr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const Jr=Gt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ee=i.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,className:u("pr-twp",Jr({variant:n}),t),...r}));ee.displayName="Badge";const Xe=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));Xe.displayName="Card";const Wr=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Wr.displayName="CardHeader";const Zr=i.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:u("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Zr.displayName="CardTitle";const Qr=i.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:u("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));Qr.displayName="CardDescription";const Cn=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-p-6 tw-pt-0",t),...n}));Cn.displayName="CardContent";const to=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));to.displayName="CardFooter";const ne=i.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...o},a)=>e.jsx(gr.Root,{ref:a,decorative:r,orientation:n,className:u("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ne.displayName=gr.Root.displayName;const Sn=i.forwardRef(({className:t,...n},r)=>e.jsx(me.Root,{ref:r,className:u("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));Sn.displayName=me.Root.displayName;const eo=i.forwardRef(({className:t,...n},r)=>e.jsx(me.Image,{ref:r,className:u("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));eo.displayName=me.Image.displayName;const En=i.forwardRef(({className:t,...n},r)=>e.jsx(me.Fallback,{ref:r,className:u("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));En.displayName=me.Fallback.displayName;const Tn=i.createContext(void 0);function vt(){const t=i.useContext(Tn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Ot=Gt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ae=U.Trigger,Rn=U.Group,no=U.Portal,ro=U.Sub,oo=U.RadioGroup;function Ut({variant:t="default",...n}){const r=i.useMemo(()=>({variant:t}),[t]);return e.jsx(Tn.Provider,{value:r,children:e.jsx(U.Root,{...n})})}const Mn=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const s=vt();return e.jsxs(U.SubTrigger,{ref:a,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,Ot({variant:s.variant})),...o,children:[r,e.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Mn.displayName=U.SubTrigger.displayName;const In=i.forwardRef(({className:t,...n},r)=>e.jsx(U.SubContent,{ref:r,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));In.displayName=U.SubContent.displayName;const At=i.forwardRef(({className:t,sideOffset:n=4,children:r,...o},a)=>{const s=et();return e.jsx(U.Portal,{children:e.jsx(U.Content,{ref:a,sideOffset:n,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:e.jsx("div",{dir:s,children:r})})})});At.displayName=U.Content.displayName;const ke=i.forwardRef(({className:t,inset:n,...r},o)=>{const a=et(),s=vt();return e.jsx(U.Item,{ref:o,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,Ot({variant:s.variant})),...r,dir:a})});ke.displayName=U.Item.displayName;const Rt=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const s=vt();return e.jsxs(U.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Ot({variant:s.variant})),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(U.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Rt.displayName=U.CheckboxItem.displayName;const Dn=i.forwardRef(({className:t,children:n,...r},o)=>{const a=vt();return e.jsxs(U.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Ot({variant:a.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(U.ItemIndicator,{children:e.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Dn.displayName=U.RadioItem.displayName;const ge=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(U.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));ge.displayName=U.Label.displayName;const se=i.forwardRef(({className:t,...n},r)=>e.jsx(U.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));se.displayName=U.Separator.displayName;function ao({className:t,...n}){return e.jsx("span",{className:u("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}ao.displayName="DropdownMenuShortcut";function Ae(t,n){return t===""?n["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?n["%comment_assign_team%"]??"Team":t}function ar({comment:t,isReply:n=!1,localizedStrings:r,isThreadExpanded:o=!1,threadStatus:a="Unspecified",handleAddCommentToThread:s,handleUpdateComment:l,handleDeleteComment:w,onEditingChange:d,canUserEditOrDeleteCommentCallback:c,canUserResolveThread:p=!1}){const[f,h]=i.useState(!1),[m,g]=i.useState(),[y,x]=i.useState(!1),C=i.useRef(null);i.useEffect(()=>{let j=!0;if(!o){x(!1);return}return(async()=>{const P=c?await c(t.id):!1;j&&x(P)})(),()=>{j=!1}},[c,t.id,o]),i.useEffect(()=>{if(!f)return;let j=!0;const R=C.current;if(!R)return;const P=setTimeout(()=>{j&&ci(R)},300);return()=>{j=!1,clearTimeout(P)}},[f]);const S=i.useCallback(()=>{h(!1),g(void 0),d==null||d(!1)},[d]),v=i.useCallback(async()=>{if(!m||!l)return;await l(t.id,fn(m))&&(h(!1),g(void 0),d==null||d(!1))},[m,l,t.id,d]),_=i.useMemo(()=>{const j=new Date(t.date),R=N.formatRelativeDate(j,r["%comment_date_today%"],r["%comment_date_yesterday%"]),P=j.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:R,time:P})},[t.date,r]),D=i.useMemo(()=>t.user,[t.user]),E=i.useMemo(()=>t.user.split(" ").map(j=>j[0]).join("").toUpperCase().slice(0,2),[t.user]),T=i.useMemo(()=>N.sanitizeHtml(N.parseParatextHtml(t.contents)),[t.contents]),I=i.useMemo(()=>{if(o&&y)return e.jsxs(e.Fragment,{children:[!N.hasCustomParatextTags(t.contents)&&e.jsxs(ke,{onClick:()=>{h(!0),g(di(N.parseParatextHtml(t.contents))),d==null||d(!0)},children:[e.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),e.jsxs(ke,{onClick:async()=>{w&&await w(t.id)},children:[e.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[y,o,r,t.contents,t.id,w,d]);return e.jsxs("div",{className:u("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":n}),children:[e.jsx(Sn,{className:"tw-h-8 tw-w-8",children:e.jsx(En,{className:"tw-text-xs tw-font-medium",children:E})}),e.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[e.jsx("p",{className:"tw-text-sm tw-font-medium",children:D}),e.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:_}),e.jsx("div",{className:"tw-flex-1"}),n&&t.assignedUser!==void 0&&e.jsxs(ee,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Ae(t.assignedUser,r)]})]}),f&&e.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:C,onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),S()):j.key==="Enter"&&j.shiftKey&&(j.preventDefault(),j.stopPropagation(),Vt(m)&&v())},onKeyDown:j=>{Yr(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:[e.jsx(hn,{editorSerializedState:m,onSerializedChange:j=>g(j)}),e.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[e.jsx(L,{size:"icon",onClick:S,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:e.jsx(k.X,{})}),e.jsx(L,{size:"icon",onClick:v,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Vt(m),children:e.jsx(k.ArrowUp,{})})]})]}),!f&&e.jsxs(e.Fragment,{children:[t.status==="Resolved"&&e.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),e.jsx("div",{className:u("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:T}})]})]}),o&&p&&!n&&a!=="Resolved"&&s&&e.jsx(L,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:j=>{j.stopPropagation(),s({threadId:t.thread,status:"Resolved"})},children:e.jsx(k.Check,{})}),I&&e.jsxs(Ut,{children:[e.jsx(ae,{asChild:!0,children:e.jsx(L,{variant:"ghost",size:"icon",children:e.jsx(k.MoreHorizontal,{})})}),e.jsx(At,{align:"end",children:I})]})]})}const sr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function pi({comments:t,localizedStrings:n,isSelected:r=!1,verseRef:o,assignedUser:a,currentUser:s,handleSelectThread:l,threadId:w,threadStatus:d,handleAddCommentToThread:c,handleUpdateComment:p,handleDeleteComment:f,assignableUsers:h,canUserAddCommentToThread:m,canUserAssignThreadCallback:g,canUserResolveThreadCallback:y,canUserEditOrDeleteCommentCallback:x}){const[C,S]=i.useState(sr),[v,_]=i.useState(!1),[D,E]=i.useState(!1),[T,I]=i.useState(!1),[j,R]=i.useState(!1),[P,$]=i.useState(!1),[z,A]=i.useState(void 0),[K,O]=i.useState(!1),[W,mt]=i.useState(!1);i.useEffect(()=>{let b=!0;if(!r){O(!1),mt(!1);return}return(async()=>{const X=g?await g(w):!1;if(!b)return;const rt=y?await y(w):!1;b&&(O(X),mt(rt))})(),()=>{b=!1}},[r,w,g,y]);const ft=i.useMemo(()=>t.filter(b=>!b.deleted),[t]),ct=i.useMemo(()=>ft[0],[ft]),V=i.useRef(null),q=i.useRef(void 0),ot=i.useCallback(()=>{var b;(b=q.current)==null||b.call(q),S(sr)},[]);i.useEffect(()=>{const b=V.current;if(!b)return;const F=()=>{E(b.scrollWidth>b.clientWidth)};return F(),window.addEventListener("resize",F),()=>window.removeEventListener("resize",F)},[ct==null?void 0:ct.verse]),i.useEffect(()=>{I(!1)},[r]);const nt=i.useMemo(()=>({singleReply:n["%comment_thread_single_reply%"],multipleReplies:n["%comment_thread_multiple_replies%"]}),[n]),ht=i.useMemo(()=>{if(a===void 0)return;if(a==="")return n["%comment_assign_unassigned%"]??"Unassigned";const b=Ae(a,n);return N.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:b})},[a,n]),Pt=i.useMemo(()=>ft.slice(1),[ft]),dt=i.useMemo(()=>Pt.length??0,[Pt.length]),Je=i.useMemo(()=>dt>0,[dt]),We=i.useMemo(()=>T||dt<=2?Pt:Pt.slice(-2),[Pt,dt,T]),le=i.useMemo(()=>T||dt<=2?0:dt-2,[dt,T]),Ie=i.useMemo(()=>dt===1?nt.singleReply:N.formatReplacementString(nt.multipleReplies,{count:dt}),[dt,nt]),Ze=i.useMemo(()=>le===1?nt.singleReply:N.formatReplacementString(nt.multipleReplies,{count:le}),[le,nt]),De=i.useCallback(async()=>{const b=Vt(C)?fn(C):void 0;if(z!==void 0){await c({threadId:w,contents:b,assignedUser:z})&&(A(void 0),b&&ot());return}b&&await c({threadId:w,contents:b})&&ot()},[ot,C,c,z,w]),Qe=i.useCallback(async b=>{const F=Vt(C)?fn(C):void 0,X=await c({...b,contents:F,assignedUser:z??b.assignedUser});return X&&F&&ot(),X&&z!==void 0&&A(void 0),X},[ot,C,c,z]);return e.jsx(Xe,{role:"option","aria-selected":r,id:w,className:u("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!r},{"tw-bg-primary-foreground":!r&&d!=="Resolved","tw-bg-background":r&&d!=="Resolved","tw-bg-muted":d==="Resolved"}),onClick:()=>{l(w)},tabIndex:-1,children:e.jsxs(Cn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[ht&&e.jsx(ee,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:ht}),e.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[e.jsxs("p",{ref:V,className:u("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":v},{"tw-whitespace-nowrap":!v}),children:[o," ",ct.verse]}),D&&e.jsx(L,{variant:"ghost",size:"icon",onClick:b=>{b.stopPropagation(),_(!v)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":v?"Collapse text":"Expand text",children:v?e.jsx(k.ChevronUp,{}):e.jsx(k.ChevronDown,{})})]}),e.jsx(ar,{comment:ct,localizedStrings:n,isThreadExpanded:r,threadStatus:d,handleAddCommentToThread:Qe,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:R,canUserEditOrDeleteCommentCallback:x,canUserResolveThread:W})]}),e.jsxs(e.Fragment,{children:[Je&&!r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[e.jsx("div",{className:"tw-w-8",children:e.jsx(ne,{})}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ie})]}),!r&&Vt(C)&&e.jsx(hn,{editorSerializedState:C,onSerializedChange:b=>S(b),placeholder:n["%comment_replyOrAssign%"]}),r&&e.jsxs(e.Fragment,{children:[le>0&&e.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:b=>{b.stopPropagation(),I(!0)},role:"button",tabIndex:0,onKeyDown:b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),b.stopPropagation(),I(!0))},children:[e.jsx("div",{className:"tw-w-8",children:e.jsx(ne,{})}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ze}),T?e.jsx(k.ChevronUp,{}):e.jsx(k.ChevronDown,{})]})]}),We.map(b=>e.jsx("div",{children:e.jsx(ar,{comment:b,localizedStrings:n,isReply:!0,isThreadExpanded:r,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:R,canUserEditOrDeleteCommentCallback:x})},b.id)),m!==!1&&(!j||Vt(C))&&e.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:b=>b.stopPropagation(),onKeyDownCapture:b=>{b.key==="Enter"&&b.shiftKey&&(b.preventDefault(),b.stopPropagation(),(Vt(C)||z!==void 0)&&De())},onKeyDown:b=>{Yr(b),(b.key==="Enter"||b.key===" ")&&b.stopPropagation()},children:[e.jsx(hn,{editorSerializedState:C,onSerializedChange:b=>S(b),placeholder:d==="Resolved"?n["%comment_reopenResolved%"]:n["%comment_replyOrAssign%"],autoFocus:!0,onClear:b=>{q.current=b}}),e.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[z!==void 0&&e.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(n["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Ae(z,n)})}),e.jsxs(Xt,{open:P,onOpenChange:$,children:[e.jsx(qt,{asChild:!0,children:e.jsx(L,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!K||!h||h.length===0||!h.includes(s),"aria-label":"Assign user",children:e.jsx(k.AtSign,{})})}),e.jsx(Dt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:b=>{b.key==="Escape"&&(b.stopPropagation(),$(!1))},children:e.jsx(Ht,{children:e.jsx(Kt,{children:h==null?void 0:h.map(b=>e.jsx(It,{onSelect:()=>{A(b!==a?b:void 0),$(!1)},className:"tw-flex tw-items-center",children:e.jsx("span",{children:Ae(b,n)})},b||"unassigned"))})})})]}),e.jsx(L,{size:"icon",onClick:De,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Vt(C)&&z===void 0,"aria-label":"Submit comment",children:e.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function ui({className:t="",threads:n,currentUser:r,localizedStrings:o,handleAddCommentToThread:a,handleUpdateComment:s,handleDeleteComment:l,assignableUsers:w,canUserAddCommentToThread:d,canUserAssignThreadCallback:c,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f}){const[h,m]=i.useState(),g=n.filter(E=>E.comments.some(T=>!T.deleted)),y=g.map(E=>({id:E.id})),x=i.useCallback(E=>{m(E.id)},[]),C=i.useCallback(E=>{m(E)},[]),{listboxRef:S,activeId:v,handleKeyDown:_}=Pr({options:y,onOptionSelect:x}),D=i.useCallback(E=>{E.key==="Escape"?(m(void 0),E.preventDefault(),E.stopPropagation()):_(E)},[_]);return e.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":v??void 0,"aria-label":"Comments",className:u("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:D,children:g.map(E=>e.jsx("div",{className:u({"tw-opacity-60":E.status==="Resolved"}),children:e.jsx(pi,{comments:E.comments,localizedStrings:o,verseRef:E.verseRef,handleSelectThread:C,threadId:E.id,isSelected:h===E.id,currentUser:r,assignedUser:E.assignedUser,threadStatus:E.status,handleAddCommentToThread:a,handleUpdateComment:s,handleDeleteComment:l,assignableUsers:w,canUserAddCommentToThread:d,canUserAssignThreadCallback:c,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f})},E.id))})}function mi({table:t}){return e.jsxs(Ut,{children:[e.jsx(ur.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(L,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(At,{align:"end",className:"tw-w-[150px]",children:[e.jsx(ge,{children:"Toggle columns"}),e.jsx(se,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Rt,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const re=Z.Root,so=Z.Group,oe=Z.Value,io=Gt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),zt=i.forwardRef(({className:t,children:n,size:r,...o},a)=>{const s=et();return e.jsxs(Z.Trigger,{className:u(io({size:r,className:t})),ref:a,...o,dir:s,children:[n,e.jsx(Z.Icon,{asChild:!0,children:e.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});zt.displayName=Z.Trigger.displayName;const On=i.forwardRef(({className:t,...n},r)=>e.jsx(Z.ScrollUpButton,{ref:r,className:u("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));On.displayName=Z.ScrollUpButton.displayName;const An=i.forwardRef(({className:t,...n},r)=>e.jsx(Z.ScrollDownButton,{ref:r,className:u("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));An.displayName=Z.ScrollDownButton.displayName;const Bt=i.forwardRef(({className:t,children:n,position:r="popper",...o},a)=>{const s=et();return e.jsx(Z.Portal,{children:e.jsxs(Z.Content,{ref:a,className:u("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[e.jsx(On,{}),e.jsx(Z.Viewport,{className:u("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:s,children:n})}),e.jsx(An,{})]})})});Bt.displayName=Z.Content.displayName;const lo=i.forwardRef(({className:t,...n},r)=>e.jsx(Z.Label,{ref:r,className:u("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));lo.displayName=Z.Label.displayName;const ut=i.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(Z.Item,{ref:o,className:u("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(Z.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(Z.ItemText,{children:n})]}));ut.displayName=Z.Item.displayName;const wo=i.forwardRef(({className:t,...n},r)=>e.jsx(Z.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));wo.displayName=Z.Separator.displayName;function hi({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(re,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(zt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(oe,{placeholder:t.getState().pagination.pageSize})}),e.jsx(Bt,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(ut,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(L,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(L,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(L,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(L,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const ir=`
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
`;function fi(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function _e(t,n){const r=n?`${ir}, ${n}`:ir;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&fi(o))}const Ee=i.forwardRef(({className:t,stickyHeader:n,...r},o)=>{const a=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),i.useEffect(()=>{const l=a.current;if(!l)return;const w=()=>{requestAnimationFrame(()=>{_e(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};w();const d=new MutationObserver(()=>{w()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const s=l=>{const{current:w}=a;if(w){if(l.key==="ArrowDown"){l.preventDefault(),_e(w)[0].focus();return}l.key===" "&&document.activeElement===w&&l.preventDefault()}};return e.jsx("div",{className:u("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:s,ref:a,className:u("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ee.displayName="Table";const Te=i.forwardRef(({className:t,stickyHeader:n,...r},o)=>e.jsx("thead",{ref:o,className:u({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));Te.displayName="TableHeader";const Re=i.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:u("[&_tr:last-child]:tw-border-0",t),...n}));Re.displayName="TableBody";const co=i.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:u("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));co.displayName="TableFooter";function gi(t){i.useEffect(()=>{const n=t.current;if(!n)return;const r=o=>{if(n.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?_e(t.current):[],s=a.indexOf(document.activeElement),l=o.key==="ArrowRight"?s+1:s-1;l>=0&&l<a.length&&a[l].focus()}o.key==="Escape"&&(o.preventDefault(),n.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}function bi(t,n,r){let o;return r==="ArrowLeft"&&n>0?o=t[n-1]:r==="ArrowRight"&&n<t.length-1&&(o=t[n+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function xi(t,n,r){let o;return r==="ArrowDown"&&n<t.length-1?o=t[n+1]:r==="ArrowUp"&&n>0&&(o=t[n-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const kt=i.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},s)=>{const l=i.useRef(null);i.useEffect(()=>{typeof s=="function"?s(l.current):s&&"current"in s&&(s.current=l.current)},[s]),gi(l);const w=i.useMemo(()=>l.current?_e(l.current):[],[l]),d=i.useCallback(p=>{const{current:f}=l;if(!f||!f.parentElement)return;const h=f.closest("table"),m=h?_e(h).filter(x=>x.tagName==="TR"):[],g=m.indexOf(f),y=w.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),xi(m,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),bi(w,y,p.key);else if(p.key==="Escape"){p.preventDefault();const x=f.closest("table");x&&x.focus()}n==null||n(p)},[l,w,n]),c=i.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return e.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:c,className:u("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});kt.displayName="TableRow";const pe=i.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:u("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));pe.displayName="TableHead";const Ft=i.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:u("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));Ft.displayName="TableCell";const po=i.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:u("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));po.displayName="TableCaption";function Ve({className:t,...n}){return e.jsx("div",{className:u("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}function uo({columns:t,data:n,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:s=!1,onRowClickHandler:l=()=>{},id:w,isLoading:d=!1,noResultsMessage:c}){var E;const[p,f]=i.useState([]),[h,m]=i.useState([]),[g,y]=i.useState({}),[x,C]=i.useState({}),S=i.useMemo(()=>n??[],[n]),v=at.useReactTable({data:S,columns:t,getCoreRowModel:at.getCoreRowModel(),...r&&{getPaginationRowModel:at.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:at.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:at.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:C,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:x}}),_=v.getVisibleFlatColumns();let D;return d?D=Array.from({length:10}).map((j,R)=>`skeleton-row-${R}`).map(j=>e.jsx(kt,{children:e.jsx(Ft,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:e.jsx("div",{className:"tw-w-full tw-py-2",children:e.jsx(Ve,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},j)):((E=v.getRowModel().rows)==null?void 0:E.length)>0?D=v.getRowModel().rows.map(T=>e.jsx(kt,{onClick:()=>l(T,v),"data-state":T.getIsSelected()&&"selected",children:T.getVisibleCells().map(I=>e.jsx(Ft,{children:at.flexRender(I.column.columnDef.cell,I.getContext())},I.id))},T.id)):D=e.jsx(kt,{children:e.jsx(Ft,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:c})}),e.jsxs("div",{className:"pr-twp",id:w,children:[a&&e.jsx(mi,{table:v}),e.jsxs(Ee,{stickyHeader:s,children:[e.jsx(Te,{stickyHeader:s,children:v.getHeaderGroups().map(T=>e.jsx(kt,{children:T.headers.map(I=>e.jsx(pe,{children:I.isPlaceholder?void 0:at.flexRender(I.column.columnDef.header,I.getContext())},I.id))},T.id))}),e.jsx(Re,{children:D})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(L,{variant:"outline",size:"sm",onClick:()=>v.previousPage(),disabled:!v.getCanPreviousPage(),children:"Previous"}),e.jsx(L,{variant:"outline",size:"sm",onClick:()=>v.nextPage(),disabled:!v.getCanNextPage(),children:"Next"})]}),r&&o&&e.jsx(hi,{table:v})]})}function vi({id:t,markdown:n,className:r,anchorTarget:o,truncate:a}){const s=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return e.jsx("div",{id:t,className:u("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":a},r),children:e.jsx(Va,{options:s,children:n})})}const mo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),lr=(t,n)=>t[n]??n;function ho({errorDetails:t,handleCopyNotify:n,localizedStrings:r,id:o}){const a=lr(r,"%webView_error_dump_header%"),s=lr(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:s})]}),e.jsx(L,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:e.jsx(k.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}const yi=Object.freeze([...mo,"%webView_error_dump_copied_message%"]);function Ni({errorDetails:t,handleCopyNotify:n,localizedStrings:r,children:o,className:a,id:s}){const[l,w]=i.useState(!1),d=()=>{w(!0),n&&n()},c=p=>{p||w(!1)};return e.jsxs(Xt,{onOpenChange:c,children:[e.jsx(qt,{asChild:!0,children:o}),e.jsxs(Dt,{id:s,className:u("tw-min-w-80 tw-max-w-96",a),children:[l&&r["%webView_error_dump_copied_message%"]&&e.jsx(tt,{children:r["%webView_error_dump_copied_message%"]}),e.jsx(ho,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var fo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(fo||{});function ji({id:t,label:n,groups:r}){const[o,a]=i.useState(Object.fromEntries(r.map((c,p)=>c.itemType===0?[p,[]]:void 0).filter(c=>!!c))),[s,l]=i.useState({}),w=(c,p)=>{const f=!o[c][p];a(m=>(m[c][p]=f,{...m}));const h=r[c].items[p];h.onUpdate(h.id,f)},d=(c,p)=>{l(h=>(h[c]=p,{...h}));const f=r[c].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return e.jsx("div",{id:t,children:e.jsxs(Ut,{children:[e.jsx(ae,{asChild:!0,children:e.jsxs(L,{variant:"default",children:[e.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(At,{children:r.map((c,p)=>e.jsxs("div",{children:[e.jsx(ge,{children:c.label}),e.jsx(Rn,{children:c.itemType===0?e.jsx(e.Fragment,{children:c.items.map((f,h)=>e.jsx("div",{children:e.jsx(Rt,{checked:o[p][h],onCheckedChange:()=>w(p,h),children:f.label})},f.id))}):e.jsx(oo,{value:s[p],onValueChange:f=>d(p,f),children:c.items.map(f=>e.jsx("div",{children:e.jsx(Dn,{value:f.id,children:f.label})},f.id))})}),e.jsx(se,{})]},c.label))})]})})}function ki({id:t,category:n,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:s,supportUrl:l,handleSupportLinkClick:w}){const d=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[n&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(k.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&e.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||l)&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(L,{onClick:()=>s(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",e.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(L,{onClick:()=>w(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",e.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function _i({id:t,versionHistory:n}){const[r,o]=i.useState(!1),a=new Date;function s(w){const d=new Date(w),c=new Date(a.getTime()-d.getTime()),p=c.getUTCFullYear()-1970,f=c.getUTCMonth(),h=c.getUTCDate()-1;let m="";return p>0?m=`${p.toString()} year${p===1?"":"s"} ago`:f>0?m=`${f.toString()} month${f===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const l=Object.entries(n).sort((w,d)=>d[0].localeCompare(w[0]));return e.jsxs("div",{className:"pr-twp",id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(w=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:w[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",w[0]]}),e.jsx("div",{children:s(w[1].date)})]})]},w[0]))}),l.length>5&&e.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ci({id:t,publisherDisplayName:n,fileSize:r,locales:o,versionHistory:a,currentVersion:s}){const l=i.useMemo(()=>N.formatBytes(r),[r]),d=(c=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return c.map(f=>p.of(f))})(o);return e.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&e.jsx(_i,{versionHistory:a}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:l})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Version"}),e.jsx("span",{className:"tw-font-semibold",children:s}),e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function go({entries:t,selected:n,onChange:r,placeholder:o,hasToggleAllFeature:a=!1,selectAllText:s="Select All",clearAllText:l="Clear All",commandEmptyMessage:w="No entries found",customSelectedText:d,isOpen:c=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:m=void 0,className:g=void 0,variant:y="ghost",id:x}){const[C,S]=i.useState(!1),v=i.useCallback(R=>{var $;const P=($=t.find(z=>z.label===R))==null?void 0:$.value;P&&r(n.includes(P)?n.filter(z=>z!==P):[...n,P])},[t,n,r]),_=()=>d||o,D=i.useMemo(()=>{if(!h)return t;const R=t.filter($=>$.starred).sort(($,z)=>$.label.localeCompare(z.label)),P=t.filter($=>!$.starred).sort(($,z)=>{const A=n.includes($.value),K=n.includes(z.value);return A&&!K?-1:!A&&K?1:$.label.localeCompare(z.label)});return[...R,...P]},[t,n,h]),E=()=>{r(t.map(R=>R.value))},T=()=>{r([])},I=c??C,j=p??S;return e.jsx("div",{id:x,className:g,children:e.jsxs(Xt,{open:I,onOpenChange:j,children:[e.jsx(qt,{asChild:!0,children:e.jsxs(L,{variant:y,role:"combobox","aria-expanded":I,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[e.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[m&&e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),e.jsx("span",{className:u("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),e.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Dt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(Ht,{children:[e.jsx(he,{placeholder:`Search ${o.toLowerCase()}...`}),a&&e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(L,{variant:"ghost",size:"sm",onClick:E,children:s}),e.jsx(L,{variant:"ghost",size:"sm",onClick:T,children:l})]}),e.jsxs(Kt,{children:[e.jsx(Se,{children:w}),e.jsx(Mt,{children:D.map(R=>e.jsxs(It,{value:R.label,onSelect:v,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(k.Check,{className:u("tw-h-4 tw-w-4",n.includes(R.value)?"tw-opacity-100":"tw-opacity-0")})}),R.starred&&e.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),e.jsx("div",{className:"tw-flex-grow",children:R.label}),R.secondaryLabel&&e.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:R.secondaryLabel})]},R.label))})]})]})})]})})}function Si({entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:s,isDisabled:l,sortSelected:w,icon:d,className:c,badgesPlaceholder:p,id:f}){return e.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(go,{entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:s,isDisabled:l,sortSelected:w,icon:d,className:c}),n.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(h=>{var m;return e.jsxs(ee,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(L,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(g=>g!==h)),children:e.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(g=>g.value===h))==null?void 0:m.label]},h)})}):e.jsx(tt,{children:p})]})}const ie=i.forwardRef(({className:t,type:n,...r},o)=>e.jsx("input",{type:n,className:u("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ie.displayName="Input";const Ei=(t,n,r)=>t==="generated"?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"+"})," ",n["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"-"})," ",n["%footnoteEditor_callerDropdown_item_hidden%"]]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{children:r})," ",n["%footnoteEditor_callerDropdown_item_custom%"]]});function Ti({callerType:t,updateCallerType:n,customCaller:r,updateCustomCaller:o,localizedStrings:a}){const s=i.useRef(null),l=i.useRef(null),w=i.useRef(!1),[d,c]=i.useState(t),[p,f]=i.useState(r),[h,m]=i.useState(!1);i.useEffect(()=>{c(t)},[t]),i.useEffect(()=>{p!==r&&f(r)},[r]);const g=x=>{w.current=!1,m(x),x||(d!=="custom"||p?(n(d),o(p)):(c(t),f(r)))},y=x=>{var S,v,_,D,E;const C=((S=l.current)==null?void 0:S.dir)!=="ltr";x.key==="ArrowDown"||C&&x.key==="ArrowRight"||!C&&x.key==="ArrowLeft"?((v=s.current)==null||v.focus(),w.current=!0):x.key==="ArrowUp"?((_=l.current)==null||_.focus(),w.current=!1):(C&&x.key==="ArrowLeft"||!C&&x.key==="ArrowRight")&&((D=s.current)==null?void 0:D.selectionStart)===0&&((E=l.current)==null||E.focus(),w.current=!1),d==="custom"&&x.key==="Enter"&&(document.activeElement===s.current||document.activeElement===l.current)&&g(!1)};return e.jsxs(Ut,{open:h,onOpenChange:g,children:[e.jsx(_t,{children:e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:e.jsx(ae,{asChild:!0,children:e.jsx(L,{variant:"outline",className:"tw-h-6",children:Ei(t,a,r)})})}),e.jsx(Ct,{children:a["%footnoteEditor_callerDropdown_tooltip%"]})]})}),e.jsxs(At,{className:"tw-z-[300]",onClick:()=>{w.current&&(w.current=!1)},onKeyDown:y,onMouseMove:()=>{var x;w.current&&((x=s.current)==null||x.focus())},children:[e.jsx(ge,{children:a["%footnoteEditor_callerDropdown_label%"]}),e.jsx(se,{}),e.jsx(Rt,{checked:d==="generated",onCheckedChange:()=>c("generated"),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_generated%"]}),e.jsx("span",{className:"tw-w-10 tw-text-center",children:gt.GENERATOR_NOTE_CALLER})]})}),e.jsx(Rt,{checked:d==="hidden",onCheckedChange:()=>c("hidden"),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_hidden%"]}),e.jsx("span",{className:"tw-w-10 tw-text-center",children:gt.HIDDEN_NOTE_CALLER})]})}),e.jsx(Rt,{ref:l,checked:d==="custom",onCheckedChange:()=>c("custom"),onClick:x=>{var C;x.stopPropagation(),w.current=!0,(C=s.current)==null||C.focus()},onSelect:x=>x.preventDefault(),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_custom%"]}),e.jsx(ie,{tabIndex:0,onClick:x=>{x.stopPropagation(),c("custom"),w.current=!0},ref:s,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:x=>x.stopPropagation(),maxLength:1,onChange:x=>f(x.target.value)})]})})]})]})}const Ri=(t,n)=>t==="f"?e.jsxs(e.Fragment,{children:[e.jsx(k.FunctionSquare,{})," ",n["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?e.jsxs(e.Fragment,{children:[e.jsx(k.SquareSigma,{})," ",n["%footnoteEditor_noteType_endNote_label%"]]}):e.jsxs(e.Fragment,{children:[e.jsx(k.SquareX,{})," ",n["%footnoteEditor_noteType_crossReference_label%"]]}),Mi=(t,n)=>{if(t==="x")return n["%footnoteEditor_noteType_crossReference_label%"];let r=n["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=n["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(n["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Ii({noteType:t,handleNoteTypeChange:n,localizedStrings:r}){return e.jsxs(Ut,{children:[e.jsx(_t,{children:e.jsxs(Tt,{children:[e.jsx(dr.TooltipTrigger,{asChild:!0,children:e.jsx(ae,{asChild:!0,children:e.jsx(L,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:t==="x",children:Ri(t,r)})})}),e.jsx(Ct,{children:e.jsx("p",{children:Mi(t,r)})})]})}),t!=="x"&&e.jsxs(At,{className:"tw-z-[300]",children:[e.jsx(ge,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),e.jsx(se,{}),e.jsxs(Rt,{checked:t==="f",onCheckedChange:()=>n("f"),className:"tw-gap-2",children:[e.jsx(k.FunctionSquare,{}),e.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),e.jsxs(Rt,{checked:t==="fe",onCheckedChange:()=>n("fe"),className:"tw-gap-2",children:[e.jsx(k.SquareSigma,{}),e.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Di({noteOps:t,onSave:n,onClose:r,scrRef:o,noteKey:a,editorOptions:s,localizedStrings:l}){const w=i.useRef(null),d=i.createRef(),[c,p]=i.useState("generated"),[f,h]=i.useState("*"),[m,g]=i.useState("f"),y=i.useMemo(()=>({...s,markerMenuTrigger:s.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...s.view??gt.getDefaultViewOptions(),noteMode:"expanded"}}),[s]);i.useEffect(()=>{var v;(v=w.current)==null||v.focus()}),i.useEffect(()=>{var D,E;let v;const _=t==null?void 0:t.at(0);if(_&&gt.isInsertEmbedOpOfType("note",_)){const T=(D=_.insert.note)==null?void 0:D.caller;let I="custom";T===gt.GENERATOR_NOTE_CALLER?I="generated":T===gt.HIDDEN_NOTE_CALLER?I="hidden":T&&h(T),p(I),g(((E=_.insert.note)==null?void 0:E.style)??"f"),_.insert.note&&(_.insert.note.caller=""),v=setTimeout(()=>{var j;(j=w.current)==null||j.applyUpdate([{delete:1},_])},0)}return()=>{v&&clearTimeout(v)}},[t,a]);const x=i.useCallback(()=>{var _,D;const v=(D=(_=w.current)==null?void 0:_.getNoteOps(0))==null?void 0:D.at(0);v&&gt.isInsertEmbedOpOfType("note",v)&&(v.insert.note&&(c==="custom"?v.insert.note.caller=f:v.insert.note.caller=c==="generated"?gt.GENERATOR_NOTE_CALLER:gt.HIDDEN_NOTE_CALLER),n([v]))},[c,f,n]),C=()=>{var _;const v=(_=d.current)==null?void 0:_.getElementsByClassName("editor-input")[0];v!=null&&v.textContent&&navigator.clipboard.writeText(v.textContent)},S=v=>{var D,E,T;g(v);const _=(E=(D=w.current)==null?void 0:D.getNoteOps(0))==null?void 0:E.at(0);_&&gt.isInsertEmbedOpOfType("note",_)&&(_.insert.note&&(_.insert.note.style=v),(T=w.current)==null||T.applyUpdate([{delete:1},_]))};return e.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[e.jsxs("div",{className:"tw-flex",children:[e.jsxs("div",{className:"tw-flex tw-gap-4",children:[e.jsx(Ii,{noteType:m,handleNoteTypeChange:S,localizedStrings:l}),e.jsx(Ti,{callerType:c,updateCallerType:p,customCaller:f,updateCustomCaller:h,localizedStrings:l})]}),e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[e.jsx(_t,{children:e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:e.jsx(L,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:e.jsx(k.X,{})})}),e.jsx(Ct,{children:e.jsx("p",{children:l["%footnoteEditor_cancelButton_tooltip%"]})})]})}),e.jsx(_t,{children:e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:e.jsx(L,{onClick:x,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:e.jsx(k.Check,{})})}),e.jsx(Ct,{children:l["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),e.jsxs("div",{ref:d,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[e.jsx(gt.Editorial,{options:y,onScrRefChange:()=>{},scrRef:o,ref:w}),e.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:e.jsx(_t,{children:e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:e.jsx(L,{onClick:C,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(k.Copy,{})})}),e.jsx(Ct,{children:e.jsx("p",{children:l["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Oi=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function bo(t,n){if(!n||n.length===0)return t??"empty";const r=n.find(a=>typeof a=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof n[0]=="string"?"impossible":n[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Ai(t,n,r=!0,o=void 0){if(!n||n.length===0)return;const a=[],s=[];let l=[];return n.forEach(w=>{typeof w!="string"&&w.marker==="fp"?(l.length>0&&s.push(l),l=[w]):l.push(w)}),l.length>0&&s.push(l),s.map((w,d)=>{const c=d===s.length-1;return e.jsxs("p",{className:"tw-mb-2",children:[Pn(t,w,r,!0,a),c&&o]},bo(t,w))})}function Pn(t,n,r=!0,o=!0,a=[]){if(!(!n||n.length===0))return n.map(s=>{if(typeof s=="string"){const l=`${t}-text-${s.slice(0,10)}`;if(o){const w=u(`usfm_${t}`);return e.jsx("span",{className:w,children:s},l)}return e.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[e.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),e.jsx("span",{children:s}),e.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Pi(s,bo(`${t}\\${s.marker}`,[s]),r,[...a,t??"unknown"])})}function Pi(t,n,r,o=[]){const{marker:a}=t;return e.jsxs("span",{children:[a?r&&e.jsx("span",{className:"marker",children:`\\${a} `}):e.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Pn(a,t.content,r,!0,[...o,a??"unknown"])]},n)}function xo({footnote:t,layout:n="horizontal",formatCaller:r,showMarkers:o=!0}){const a=r?r(t.caller):t.caller,s=a!==t.caller;let l,w=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...w]=t.content);const d=o?e.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,c=o?e.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=e.jsxs(e.Fragment,{children:[a&&e.jsxs("span",{className:u("note-caller",{formatted:s}),children:[a," "]}),l&&e.jsxs(e.Fragment,{children:[Pn(t.marker,[l],o,!1)," "]})]}),m=u(n==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:u("textual-note-header tw-text-nowrap tw-pr-2",m),children:[d,p]}),e.jsx("div",{className:u("textual-note-body tw-pr-0.5",m),children:w&&w.length>0&&e.jsx(e.Fragment,{children:Ai(t.marker,w,o,c)})})]})}const Vi=["%webView_footnoteList_header%"],Li=(t,n)=>t[n]??n;function $i({className:t,classNameForItems:n,footnotes:r,layout:o="horizontal",listId:a,selectedFootnote:s,showMarkers:l=!0,suppressFormatting:w=!1,formatCaller:d,onFootnoteSelected:c,localizedStrings:p}){const f=p?Li(p,"%webView_footnoteList_header%"):"Footnotes",h=d??N.getFormatCallerFunction(r,void 0),m=(v,_)=>{c==null||c(v,_,a)},g=s?r.findIndex(v=>v===s):0,[y,x]=i.useState(g),C=v=>{if(r.length)switch(v.key){case"ArrowDown":v.preventDefault(),x(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":v.preventDefault(),x(_=>Math.max(_-1,0));break;case"Enter":case" ":v.preventDefault(),c==null||c(r[y],y,a);break}},S=i.useRef([]);return i.useEffect(()=>{var v;y>=0&&y<S.current.length&&((v=S.current[y])==null||v.focus())},[y]),e.jsxs(e.Fragment,{children:[o==="vertical"&&e.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:f}),e.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:u("tw-h-full tw-overflow-y-auto",t),onKeyDown:C,children:e.jsx("div",{className:u("tw-p-0.5 tw-pt-1",o==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!w&&"formatted-font"),children:r.map((v,_)=>{const D=v===s,E=`${a}-${_}`;return e.jsxs(e.Fragment,{children:[e.jsx(Xe,{ref:T=>{S.current[_]=T},role:"option","aria-selected":D,"data-marker":v.marker,"data-state":D?"selected":void 0,tabIndex:-1,className:u("data-[state=selected]:tw-bg-muted",c&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",o==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",n),onClick:()=>m(v,_),children:e.jsx(xo,{footnote:v,layout:o,formatCaller:()=>h(v.caller,_),showMarkers:l})},E),_<r.length-1&&o==="vertical"&&e.jsx(ne,{})]})})})})]})}function Fi(t){const n=[];let r=0;const o=/\\\\(.+?)\\\\/g;let a;for(;(a=o.exec(t))!==null;)a.index>r&&n.push(t.substring(r,a.index)),n.push(e.jsx("strong",{children:a[1]},a.index)),r=o.lastIndex;return r<t.length&&n.push(t.substring(r)),n.length>0?n:[t]}function zi({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],s=i.useMemo(()=>{const l=[],w=new Set;return t.forEach(d=>{const c=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(c)||(w.add(c),l.push(d))}),l},[t]);return e.jsxs(Ee,{stickyHeader:!0,children:[e.jsx(Te,{stickyHeader:!0,children:e.jsxs(kt,{children:[e.jsx(pe,{children:o}),e.jsx(pe,{children:a})]})}),e.jsx(Re,{children:s.length>0&&s.map(l=>e.jsxs(kt,{onClick:()=>{n(l.reference)},children:[e.jsx(Ft,{children:`${H.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),e.jsx(Ft,{children:Fi(l.text)})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const qe=i.forwardRef(({className:t,...n},r)=>e.jsx(wn.Root,{ref:r,className:u("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(wn.Indicator,{className:u("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));qe.displayName=wn.Root.displayName;const Ue=t=>t==="asc"?e.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Bi=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(L,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Ue(n.getIsSorted())]})}),Gi=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(L,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Ue(r.getIsSorted())]})}),Hi=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(L,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Ue(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),rn=(t,n,r,o,a,s)=>{let l=[...r];t.forEach(d=>{n==="approved"?l.includes(d)||l.push(d):l=l.filter(c=>c!==d)}),o(l);let w=[...a];t.forEach(d=>{n==="unapproved"?w.includes(d)||w.push(d):w=w.filter(c=>c!==d)}),s(w)},Ki=(t,n,r,o,a)=>({accessorKey:"status",header:({column:s})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(L,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,Ue(s.getIsSorted())]})}),cell:({row:s})=>{const l=s.getValue("status"),w=s.getValue("item");return e.jsxs(Ke,{value:l,variant:"outline",type:"single",children:[e.jsx(ce,{onClick:d=>{d.stopPropagation(),rn([w],"approved",n,r,o,a)},value:"approved",children:e.jsx(k.CircleCheckIcon,{})}),e.jsx(ce,{onClick:d=>{d.stopPropagation(),rn([w],"unapproved",n,r,o,a)},value:"unapproved",children:e.jsx(k.CircleXIcon,{})}),e.jsx(ce,{onClick:d=>{d.stopPropagation(),rn([w],"unknown",n,r,o,a)},value:"unknown",children:e.jsx(k.CircleHelpIcon,{})})]})}}),Xi=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),qi=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},Ui=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},vo=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",Yi=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Ji=(t,n,r)=>{let o=t;return n!=="all"&&(o=o.filter(a=>n==="approved"&&a.status==="approved"||n==="unapproved"&&a.status==="unapproved"||n==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},Wi=(t,n,r)=>{const o=[];return t.forEach(a=>{const s=o.find(l=>N.deepEqual(l.items,N.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(s)s.count+=1,s.occurrences.push({reference:a.verseRef,text:a.verse});else{const l={items:N.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:vo(N.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],n,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(l)}}),o},yt=(t,n)=>t[n]??n;function Zi({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:s,scope:l,onScopeChange:w,columns:d,id:c,areInventoryItemsLoading:p=!1}){const f=yt(r,"%webView_inventory_all%"),h=yt(r,"%webView_inventory_approved%"),m=yt(r,"%webView_inventory_unapproved%"),g=yt(r,"%webView_inventory_unknown%"),y=yt(r,"%webView_inventory_scope_currentBook%"),x=yt(r,"%webView_inventory_scope_chapter%"),C=yt(r,"%webView_inventory_scope_verse%"),S=yt(r,"%webView_inventory_filter_text%"),v=yt(r,"%webView_inventory_show_additional_items%"),_=yt(r,"%webView_inventory_no_results%"),[D,E]=i.useState(!1),[T,I]=i.useState("all"),[j,R]=i.useState(""),[P,$]=i.useState([]),z=i.useMemo(()=>{const V=t??[];return V.length===0?[]:Wi(V,a,s)},[t,a,s]),A=i.useMemo(()=>{if(D)return z;const V=[];return z.forEach(q=>{const ot=q.items[0],nt=V.find(ht=>ht.items[0]===ot);nt?(nt.count+=q.count,nt.occurrences=nt.occurrences.concat(q.occurrences)):V.push({items:[ot],count:q.count,occurrences:q.occurrences,status:q.status})}),V},[D,z]),K=i.useMemo(()=>A.length===0?[]:Ji(A,T,j),[A,T,j]),O=i.useMemo(()=>{var ot,nt;if(!D)return d;const V=(ot=o==null?void 0:o.tableHeaders)==null?void 0:ot.length;if(!V)return d;const q=[];for(let ht=0;ht<V;ht++)q.push(Gi(((nt=o==null?void 0:o.tableHeaders)==null?void 0:nt[ht])||"Additional Item",ht+1));return[...q,...d]},[o==null?void 0:o.tableHeaders,d,D]);i.useEffect(()=>{K.length===0?$([]):K.length===1&&$(K[0].items)},[K]);const W=(V,q)=>{q.setRowSelection(()=>{const ot={};return ot[V.index]=!0,ot}),$(V.original.items)},mt=V=>{if(V==="book"||V==="chapter"||V==="verse")w(V);else throw new Error(`Invalid scope value: ${V}`)},ft=V=>{if(V==="all"||V==="approved"||V==="unapproved"||V==="unknown")I(V);else throw new Error(`Invalid status filter value: ${V}`)},ct=i.useMemo(()=>{if(A.length===0||P.length===0)return[];const V=A.filter(q=>N.deepEqual(D?q.items:[q.items[0]],P));if(V.length>1)throw new Error("Selected item is not unique");return V.length===0?[]:V[0].occurrences},[P,D,A]);return e.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(re,{onValueChange:V=>ft(V),defaultValue:T,children:[e.jsx(zt,{className:"tw-m-1",children:e.jsx(oe,{placeholder:"Select filter"})}),e.jsxs(Bt,{children:[e.jsx(ut,{value:"all",children:f}),e.jsx(ut,{value:"approved",children:h}),e.jsx(ut,{value:"unapproved",children:m}),e.jsx(ut,{value:"unknown",children:g})]})]}),e.jsxs(re,{onValueChange:V=>mt(V),defaultValue:l,children:[e.jsx(zt,{className:"tw-m-1",children:e.jsx(oe,{placeholder:"Select scope"})}),e.jsxs(Bt,{children:[e.jsx(ut,{value:"book",children:y}),e.jsx(ut,{value:"chapter",children:x}),e.jsx(ut,{value:"verse",children:C})]})]}),e.jsx(ie,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:j,onChange:V=>{R(V.target.value)}}),o&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(qe,{className:"tw-m-1",checked:D,onCheckedChange:V=>{E(V)}}),e.jsx(tt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??v})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(uo,{columns:O,data:K,onRowClickHandler:W,stickyHeader:!0,isLoading:p,noResultsMessage:_})}),ct.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(zi,{occurrenceData:ct,setScriptureReference:n,localizedStrings:r})})]})}const Qi="16rem",tl="3rem",yo=i.createContext(void 0);function Me(){const t=i.useContext(yo);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Vn=i.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:o,style:a,children:s,side:l="primary",...w},d)=>{const[c,p]=i.useState(t),f=n??c,h=i.useCallback(v=>{const _=typeof v=="function"?v(f):v;r?r(_):p(_)},[r,f]),m=i.useCallback(()=>h(v=>!v),[h]),g=f?"expanded":"collapsed",C=et()==="ltr"?l:l==="primary"?"secondary":"primary",S=i.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:m,side:C}),[g,f,h,m,C]);return e.jsx(yo.Provider,{value:S,children:e.jsx(_t,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Qi,"--sidebar-width-icon":tl,...a},className:u("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...w,children:s})})})});Vn.displayName="SidebarProvider";const Ln=i.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:o,...a},s)=>{const l=Me();return n==="none"?e.jsx("div",{className:u("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:s,...a,children:o}):e.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":t,"data-side":l.side,children:[e.jsx("div",{className:u("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:u("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});Ln.displayName="Sidebar";const No=i.forwardRef(({className:t,onClick:n,...r},o)=>{const a=Me();return e.jsxs(L,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:u("tw-h-7 tw-w-7",t),onClick:s=>{n==null||n(s),a.toggleSidebar()},...r,children:[a.side==="primary"?e.jsx(k.PanelLeft,{}):e.jsx(k.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});No.displayName="SidebarTrigger";const jo=i.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:o}=Me();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:u("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});jo.displayName="SidebarRail";const $n=i.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:u("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));$n.displayName="SidebarInset";const ko=i.forwardRef(({className:t,...n},r)=>e.jsx(ie,{ref:r,"data-sidebar":"input",className:u("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));ko.displayName="SidebarInput";const _o=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:u("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));_o.displayName="SidebarHeader";const Co=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:u("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Co.displayName="SidebarFooter";const So=i.forwardRef(({className:t,...n},r)=>e.jsx(ne,{ref:r,"data-sidebar":"separator",className:u("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));So.displayName="SidebarSeparator";const Fn=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:u("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));Fn.displayName="SidebarContent";const Le=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:u("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));Le.displayName="SidebarGroup";const $e=i.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?ue.Slot:"div";return e.jsx(a,{ref:o,"data-sidebar":"group-label",className:u("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});$e.displayName="SidebarGroupLabel";const Eo=i.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?ue.Slot:"button";return e.jsx(a,{ref:o,"data-sidebar":"group-action",className:u("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Eo.displayName="SidebarGroupAction";const Fe=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:u("tw-w-full tw-text-sm",t),...n}));Fe.displayName="SidebarGroupContent";const zn=i.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:u("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));zn.displayName="SidebarMenu";const Bn=i.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:u("tw-group/menu-item tw-relative",t),...n}));Bn.displayName="SidebarMenuItem";const el=Gt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Gn=i.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:o="default",tooltip:a,className:s,...l},w)=>{const d=t?ue.Slot:"button",{state:c}=Me(),p=e.jsx(d,{ref:w,"data-sidebar":"menu-button","data-size":o,"data-active":n,className:u(el({variant:r,size:o}),s),...l});return a?(typeof a=="string"&&(a={children:a}),e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:p}),e.jsx(Ct,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):p});Gn.displayName="SidebarMenuButton";const To=i.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...o},a)=>{const s=n?ue.Slot:"button";return e.jsx(s,{ref:a,"data-sidebar":"menu-action",className:u("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});To.displayName="SidebarMenuAction";const Ro=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:u("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Ro.displayName="SidebarMenuBadge";const Mo=i.forwardRef(({className:t,showIcon:n=!1,...r},o)=>{const a=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:u("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Ve,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Ve,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});Mo.displayName="SidebarMenuSkeleton";const Io=i.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:u("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Io.displayName="SidebarMenuSub";const Do=i.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Do.displayName="SidebarMenuSubItem";const Oo=i.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:o,...a},s)=>{const l=t?ue.Slot:"a";return e.jsx(l,{ref:s,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:u("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Oo.displayName="SidebarMenuSubButton";function Ao({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:l,buttonPlaceholderText:w,className:d}){const c=i.useCallback((h,m)=>{o(h,m)},[o]),p=i.useCallback(h=>{const m=r.find(g=>g.projectId===h);return m?m.projectName:h},[r]),f=i.useCallback(h=>!a.projectId&&h===a.label,[a]);return e.jsx(Ln,{id:t,collapsible:"none",variant:"inset",className:u("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:e.jsxs(Fn,{children:[e.jsxs(Le,{children:[e.jsx($e,{className:"tw-text-sm",children:s}),e.jsx(Fe,{children:e.jsx(zn,{children:Object.entries(n).map(([h,m])=>e.jsx(Bn,{children:e.jsx(Gn,{onClick:()=>c(h),isActive:f(h),children:e.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),e.jsxs(Le,{children:[e.jsx($e,{className:"tw-text-sm",children:l}),e.jsx(Fe,{className:"tw-pl-3",children:e.jsx(Pe,{buttonVariant:"ghost",buttonClassName:u("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:w,onChange:h=>{const m=p(h);c(m,h)},value:(a==null?void 0:a.projectId)??void 0,icon:e.jsx(k.ScrollText,{})})})]})]})})}const Ye=i.forwardRef(({value:t,onSearch:n,placeholder:r,isFullWidth:o,className:a,isDisabled:s=!1,id:l},w)=>{const d=et();return e.jsxs("div",{id:l,className:u("tw-relative",{"tw-w-full":o},a),children:[e.jsx(k.Search,{className:u("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),e.jsx(ie,{ref:w,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>n(c.target.value),disabled:s}),t&&e.jsxs(L,{variant:"ghost",size:"icon",className:u("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{n("")},children:[e.jsx(k.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ye.displayName="SearchBar";function nl({id:t,extensionLabels:n,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:s,searchValue:l,onSearch:w,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Ye,{className:"tw-w-9/12",value:l,onSearch:w,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(Vn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(Ao,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:s,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}),e.jsx($n,{className:"tw-min-w-[215px]",children:o})]})]})}const Lt="scrBook",rl="scrRef",Zt="source",ol="details",al="Scripture Reference",sl="Scripture Book",Po="Type",il="Details";function ll(t,n){const r=n??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Lt,header:(t==null?void 0:t.scriptureReferenceColumnName)??al,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?H.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===Lt?N.formatScrRef(a.start):void 0},getGroupingValue:o=>H.bookIdToNumber(o.start.book),sortingFn:(o,a)=>N.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:rl,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(a.start)},sortingFn:(o,a)=>N.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Zt,header:r?(t==null?void 0:t.typeColumnName)??Po:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:ol,header:(t==null?void 0:t.detailsColumnName)??il,cell:o=>o.getValue(),enableGrouping:!1}]}const wl=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||N.compareScrRefs(t.start,t.end)===0?`${N.scrRefToBBBCCCVVV(t.start)}+${n}`:`${N.scrRefToBBBCCCVVV(t.start)}+${n}-${N.scrRefToBBBCCCVVV(t.end)}+${r}`},wr=t=>`${wl({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function cl({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:s,detailsColumnName:l,onRowSelected:w,id:d}){const[c,p]=i.useState([]),[f,h]=i.useState([{id:Lt,desc:!1}]),[m,g]=i.useState({}),y=i.useMemo(()=>t.flatMap(j=>j.data.map(R=>({...R,source:j.source}))),[t]),x=i.useMemo(()=>ll({scriptureReferenceColumnName:o,typeColumnName:s,detailsColumnName:l},r),[o,s,l,r]);i.useEffect(()=>{c.includes(Zt)?h([{id:Zt,desc:!1},{id:Lt,desc:!1}]):h([{id:Lt,desc:!1}])},[c]);const C=at.useReactTable({data:y,columns:x,state:{grouping:c,sorting:f,rowSelection:m},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:at.getExpandedRowModel(),getGroupedRowModel:at.getGroupedRowModel(),getCoreRowModel:at.getCoreRowModel(),getSortedRowModel:at.getSortedRowModel(),getRowId:wr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(w){const j=C.getSelectedRowModel().rowsById,R=Object.keys(j);if(R.length===1){const P=y.find($=>wr($)===R[0])||void 0;P&&w(P)}}},[m,y,w,C]);const S=a??sl,v=s??Po,_=[{label:"No Grouping",value:[]},{label:`Group by ${S}`,value:[Lt]},{label:`Group by ${v}`,value:[Zt]},{label:`Group by ${S} and ${v}`,value:[Lt,Zt]},{label:`Group by ${v} and ${S}`,value:[Zt,Lt]}],D=j=>{p(JSON.parse(j))},E=(j,R)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(R)},T=(j,R)=>j.getIsGrouped()?"":u("banded-row",R%2===0?"even":"odd"),I=(j,R,P)=>{if(!((j==null?void 0:j.length)===0||R.depth<P.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(re,{value:JSON.stringify(c),onValueChange:j=>{D(j)},children:[e.jsx(zt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(oe,{})}),e.jsx(Bt,{position:"item-aligned",children:e.jsx(so,{children:_.map(j=>e.jsx(ut,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),e.jsxs(Ee,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(Te,{children:C.getHeaderGroups().map(j=>e.jsx(kt,{children:j.headers.filter(R=>R.column.columnDef.header).map(R=>e.jsx(pe,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:e.jsxs("div",{children:[R.column.getCanGroup()?e.jsx(L,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",at.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},j.id))}),e.jsx(Re,{children:C.getRowModel().rows.map((j,R)=>{const P=et();return e.jsx(kt,{"data-state":j.getIsSelected()?"selected":"",className:u(T(j,R)),onClick:$=>E(j,$),children:j.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Zt||!r)))return e.jsx(Ft,{className:u($.column.columnDef.id,"tw-p-[1px]",I(c,j,$)),children:$.getIsGrouped()?e.jsxs(L,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&e.jsx(k.ChevronDown,{}),!j.getIsExpanded()&&(P==="ltr"?e.jsx(k.ChevronRight,{}):e.jsx(k.ChevronLeft,{}))," ",at.flexRender($.column.columnDef.cell,$.getContext())," (",j.subRows.length,")"]}):at.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},j.id)})})]})]})}const Hn=(t,n)=>t.filter(r=>{try{return N.getSectionForBook(r)===n}catch{return!1}}),Vo=(t,n,r)=>Hn(t,n).every(o=>r.includes(o));function dl({section:t,availableBookIds:n,selectedBookIds:r,onToggle:o,localizedStrings:a}){const s=Hn(n,t).length===0,l=a["%scripture_section_ot_short%"],w=a["%scripture_section_nt_short%"],d=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return e.jsx(L,{variant:"outline",size:"sm",onClick:()=>o(t),className:u(Vo(n,t,r)&&!s&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:s,children:cs(t,l,w,d,c)})}const cr=5,on=6;function pl({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const s=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],w=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:m,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[x,C]=i.useState(!1),[S,v]=i.useState(""),_=i.useRef(void 0),D=i.useRef(!1);if(t.length!==H.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const E=i.useMemo(()=>H.allBookIds.filter((A,K)=>t[K]==="1"&&!H.isObsolete(H.bookIdToNumber(A))),[t]),T=i.useMemo(()=>{if(!S.trim()){const O={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return E.forEach(W=>{const mt=N.getSectionForBook(W);O[mt].push(W)}),O}const A=E.filter(O=>Nn(O,S,a)),K={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return A.forEach(O=>{const W=N.getSectionForBook(O);K[W].push(O)}),K},[E,S,a]),I=i.useCallback((A,K=!1)=>{if(!K||!_.current){r(n.includes(A)?n.filter(V=>V!==A):[...n,A]),_.current=A;return}const O=E.findIndex(V=>V===_.current),W=E.findIndex(V=>V===A);if(O===-1||W===-1)return;const[mt,ft]=[Math.min(O,W),Math.max(O,W)],ct=E.slice(mt,ft+1).map(V=>V);r(n.includes(A)?n.filter(V=>!ct.includes(V)):[...new Set([...n,...ct])])},[n,r,E]),j=A=>{I(A,D.current),D.current=!1},R=(A,K)=>{A.preventDefault(),I(K,A.shiftKey)},P=i.useCallback(A=>{const K=Hn(E,A).map(O=>O);r(Vo(E,A,n)?n.filter(O=>!K.includes(O)):[...new Set([...n,...K])])},[n,r,E]),$=()=>{r(E.map(A=>A))},z=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(A=>e.jsx(dl,{section:A,availableBookIds:E,selectedBookIds:n,onToggle:P,localizedStrings:o},A))}),e.jsxs(Xt,{open:x,onOpenChange:A=>{C(A),A||v("")},children:[e.jsx(qt,{asChild:!0,children:e.jsxs(L,{variant:"outline",role:"combobox","aria-expanded":x,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${s}: ${n.length}`:l,e.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Dt,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(Ht,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(D.current=A.shiftKey)},children:[e.jsx(he,{placeholder:w,value:S,onValueChange:v}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(L,{variant:"ghost",size:"sm",onClick:$,children:d}),e.jsx(L,{variant:"ghost",size:"sm",onClick:z,children:c})]}),e.jsxs(Kt,{children:[e.jsx(Se,{children:p}),Object.values(N.Section).map((A,K)=>{const O=T[A];if(O.length!==0)return e.jsxs(i.Fragment,{children:[e.jsx(Mt,{heading:Tr(A,h,m,g,y),children:O.map(W=>e.jsx(Mr,{bookId:W,isSelected:n.includes(W),onSelect:()=>j(W),onMouseDown:mt=>R(mt,W),section:N.getSectionForBook(W),showCheck:!0,localizedBookNames:a,commandValue:pn(W,a),className:"tw-flex tw-items-center"},W))}),K<Object.values(N.Section).length-1&&e.jsx(Nr,{})]},A)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===on?on:cr).map(A=>e.jsx(ee,{className:"hover:tw-bg-secondary",variant:"secondary",children:we(A,a)},A)),n.length>on&&e.jsx(ee,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-cr} ${f}`})]})]})}const ul=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Jt=(t,n)=>t[n]??n;function ml({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:s,localizedStrings:l,localizedBookNames:w,id:d}){const c=Jt(l,"%webView_scope_selector_selected_text%"),p=Jt(l,"%webView_scope_selector_current_verse%"),f=Jt(l,"%webView_scope_selector_current_chapter%"),h=Jt(l,"%webView_scope_selector_current_book%"),m=Jt(l,"%webView_scope_selector_choose_books%"),g=Jt(l,"%webView_scope_selector_scope%"),y=Jt(l,"%webView_scope_selector_select_books%"),x=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],C=n?x.filter(S=>n.includes(S.value)):x;return e.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(tt,{children:g}),e.jsx(He,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:C.map(({value:S,label:v,id:_})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(je,{className:"tw-me-2",value:S,id:_}),e.jsx(tt,{htmlFor:_,children:v})]},_))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(tt,{children:y}),e.jsx(pl,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:s,localizedStrings:l,localizedBookNames:w})]})]})}const an={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function hl({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:s,id:l}){const w={...an,...Object.fromEntries(Object.entries(o).map(([c,p])=>[c,c===p&&c in an?an[c]:p]))},d=et();return e.jsxs(re,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(zt,{size:a,className:u("pr-twp tw-w-auto",s),children:e.jsx(oe,{placeholder:w[N.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(Bt,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(ut,{value:`${c}`,children:w[N.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function fl({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function gl({primary:t,secondary:n,children:r,isLoading:o=!1,loadingMessage:a}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),o?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):e.jsx("div",{children:r})]})}function bl({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(ne,{}):""]})}function Lo(t,n){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===n))==null?void 0:r[0]}function ze({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:u("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const $o=(t,n,r,o)=>r?Object.entries(t).filter(([s,l])=>"column"in l&&l.column===r||s===r).sort(([,s],[,l])=>s.order-l.order).flatMap(([s])=>n.filter(w=>w.group===s).sort((w,d)=>w.order-d.order).map(w=>e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:"command"in w?e.jsxs(ke,{onClick:()=>{o(w)},children:[w.iconPathBefore&&e.jsx(ze,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&e.jsx(ze,{icon:w.iconPathAfter,menuLabel:w.label})]},`dropdown-menu-item-${w.label}-${w.command}`):e.jsxs(ro,{children:[e.jsx(Mn,{children:w.label}),e.jsx(no,{children:e.jsx(In,{children:$o(t,n,Lo(t,w.id),o)})})]},`dropdown-menu-sub-${w.label}-${w.id}`)}),w.tooltip&&e.jsx(Ct,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`))):void 0;function Be({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:o,className:a,variant:s,buttonVariant:l="ghost",id:w}){return e.jsxs(Ut,{variant:s,children:[e.jsx(ae,{"aria-label":r,className:a,asChild:!0,id:w,children:e.jsx(L,{variant:l,size:"icon",children:o??e.jsx(k.MenuIcon,{})})}),e.jsx(At,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,c])=>typeof d=="boolean"||typeof c=="boolean"?0:d.order-c.order).map(([d],c,p)=>e.jsxs(i.Fragment,{children:[e.jsx(Rn,{children:e.jsx(_t,{children:$o(n.groups,n.items,d,t)})}),c<p.length-1&&e.jsx(se,{})]},d))})]})}const Fo=i.forwardRef(({id:t,className:n,children:r},o)=>e.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${n}`,id:t,children:r}));function xl({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:o,id:a,className:s,startAreaChildren:l,centerAreaChildren:w,endAreaChildren:d,menuButtonIcon:c}){return e.jsxs(Fo,{className:`tw-w-full tw-border ${s}`,id:a,children:[r&&e.jsx(Be,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??e.jsx(k.Menu,{}),buttonVariant:"ghost"}),l&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),w&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:w}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&e.jsx(Be,{onSelectMenuItem:n,menuData:o,tabLabel:"View Info",icon:e.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function vl({onSelectProjectMenuItem:t,projectMenuData:n,id:r,className:o,menuButtonIcon:a}){return e.jsx(Fo,{className:"tw-pointer-events-none",id:r,children:n&&e.jsx(Be,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Kn=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(wt.Root,{orientation:"vertical",ref:r,className:u("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:o})});Kn.displayName=wt.List.displayName;const Xn=i.forwardRef(({className:t,...n},r)=>e.jsx(wt.List,{ref:r,className:u("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Xn.displayName=wt.List.displayName;const zo=i.forwardRef(({className:t,...n},r)=>e.jsx(wt.Trigger,{ref:r,...n,className:u("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),qn=i.forwardRef(({className:t,...n},r)=>e.jsx(wt.Content,{ref:r,className:u("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));qn.displayName=wt.Content.displayName;function yl({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:s,id:l}){return e.jsxs("div",{id:l,className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?e.jsx("h1",{children:a}):"",e.jsx(Ye,{className:s,value:n,onSearch:r,placeholder:o})]}),e.jsxs(Kn,{children:[e.jsx(Xn,{children:t.map(w=>e.jsx(zo,{value:w.value,children:w.value},w.key))}),t.map(w=>e.jsx(qn,{value:w.value,children:w.content},w.key))]})]})}function Nl({...t}){return e.jsx(Y.Menu,{...t})}function jl({...t}){return e.jsx(Y.Sub,{"data-slot":"menubar-sub",...t})}const Bo=i.forwardRef(({className:t,variant:n="default",...r},o)=>{const a=i.useMemo(()=>({variant:n}),[n]);return e.jsx(Tn.Provider,{value:a,children:e.jsx(Y.Root,{ref:o,className:u("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Bo.displayName=Y.Root.displayName;const Go=i.forwardRef(({className:t,...n},r)=>{const o=vt();return e.jsx(Y.Trigger,{ref:r,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Ot({variant:o.variant,className:t})),...n})});Go.displayName=Y.Trigger.displayName;const Ho=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const s=vt();return e.jsxs(Y.SubTrigger,{ref:a,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",Ot({variant:s.variant,className:t}),t),...o,children:[r,e.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ho.displayName=Y.SubTrigger.displayName;const Ko=i.forwardRef(({className:t,...n},r)=>{const o=vt();return e.jsx(Y.SubContent,{ref:r,className:u("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...n})});Ko.displayName=Y.SubContent.displayName;const Xo=i.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:o=8,...a},s)=>{const l=vt();return e.jsx(Y.Portal,{children:e.jsx(Y.Content,{ref:s,align:n,alignOffset:r,sideOffset:o,className:u("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...a})})});Xo.displayName=Y.Content.displayName;const qo=i.forwardRef(({className:t,inset:n,...r},o)=>{const a=vt();return e.jsx(Y.Item,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",Ot({variant:a.variant,className:t}),t),...r})});qo.displayName=Y.Item.displayName;const kl=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const s=vt();return e.jsxs(Y.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ot({variant:s.variant,className:t}),t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(Y.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});kl.displayName=Y.CheckboxItem.displayName;const _l=i.forwardRef(({className:t,children:n,...r},o)=>{const a=vt();return e.jsxs(Y.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ot({variant:a.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(Y.ItemIndicator,{children:e.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});_l.displayName=Y.RadioItem.displayName;const Cl=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(Y.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Cl.displayName=Y.Label.displayName;const Uo=i.forwardRef(({className:t,...n},r)=>e.jsx(Y.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Uo.displayName=Y.Separator.displayName;const ve=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Yo=(t,n,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([s,l])=>"column"in l&&l.column===r||s===r).sort(([,s],[,l])=>s.order-l.order);return a.flatMap(([s],l)=>{const w=n.filter(c=>c.group===s).sort((c,p)=>c.order-p.order).map(c=>e.jsxs(Tt,{children:[e.jsx($t,{asChild:!0,children:"command"in c?e.jsxs(qo,{onClick:()=>{o(c)},children:[c.iconPathBefore&&e.jsx(ze,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&e.jsx(ze,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):e.jsxs(jl,{children:[e.jsx(Ho,{children:c.label}),e.jsx(Ko,{children:Yo(t,n,Lo(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&e.jsx(Ct,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),d=[...w];return w.length>0&&l<a.length-1&&d.push(e.jsx(Uo,{},`separator-${s}`)),d})};function Sl({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:o}){const a=i.useRef(void 0),s=i.useRef(void 0),l=i.useRef(void 0),w=i.useRef(void 0),d=i.useRef(void 0),c=p=>{switch(p){case"platform.app":return s;case"platform.window":return l;case"platform.layout":return w;case"platform.help":return d;default:return}};if(za.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,y,x,C;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":ve(s,[h]);break;case"alt+p":(g=s.current)==null||g.focus(),ve(s,[h,m]);break;case"alt+l":(y=l.current)==null||y.focus(),ve(l,[h,m]);break;case"alt+n":(x=w.current)==null||x.focus(),ve(w,[h,m]);break;case"alt+h":(C=d.current)==null||C.focus(),ve(d,[h,m]);break}}),i.useEffect(()=>{if(!r||!a.current)return;const p=new MutationObserver(m=>{m.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(m=>{p.observe(m,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return e.jsx(Bo,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>e.jsxs(Nl,{children:[e.jsx(Go,{ref:c(p),children:typeof f=="object"&&"label"in f&&f.label}),e.jsx(Xo,{className:"tw-z-[250]",children:e.jsx(_t,{children:Yo(t.groups,t.items,p,n)})})]},p))})}function El(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Tl({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:o,id:a,children:s,appMenuAreaChildren:l,configAreaChildren:w,shouldUseAsAppDragArea:d,menubarVariant:c="default"}){const p=i.useRef(void 0);return e.jsx("div",{className:u("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:a,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&e.jsx(Sl,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:c})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:s}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:w})})]})})}const Rl=(t,n)=>t[n]??n;function Ml({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:s,localizedStrings:l,className:w,id:d}){const c=Rl(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=i.useState(!1),h=g=>{a&&a(g),o&&o([g,...r.filter(y=>y!==g)]),s&&r.find(y=>y===g)&&s([...r.filter(y=>y!==g)]),f(!1)},m=(g,y)=>{var C,S,v,_,D,E;const x=y!==g?((S=(C=t[g])==null?void 0:C.uiNames)==null?void 0:S[y])??((_=(v=t[g])==null?void 0:v.uiNames)==null?void 0:_.en):void 0;return x?`${(D=t[g])==null?void 0:D.autonym} (${x})`:(E=t[g])==null?void 0:E.autonym};return e.jsxs("div",{id:d,className:u("pr-twp tw-max-w-sm",w),children:[e.jsxs(re,{name:"uiLanguage",value:n,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[e.jsx(zt,{children:e.jsx(oe,{})}),e.jsx(Bt,{className:"tw-z-[250]",children:Object.keys(t).map(g=>e.jsx(ut,{value:g,children:m(g,n)},g))})]}),n!=="en"&&e.jsx("div",{className:"tw-pt-3",children:e.jsx(tt,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(c,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>m(g,n)).join(", "):t.en.autonym})})})]})}function Il({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(tt,{children:n(t)}):r?e.jsx(tt,{children:r(t)}):e.jsx(tt,{children:t})}function Dl({id:t,className:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s,createComplexLabel:l}){return e.jsx("div",{id:t,className:n,children:r.map(w=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(qe,{className:"tw-me-2 tw-align-middle",checked:o.includes(w),onCheckedChange:d=>a(w,d)}),e.jsx(Il,{item:w,createLabel:s,createComplexLabel:l})]},w))})}function Ol({cardKey:t,isSelected:n,onSelect:r,isDenied:o,isHidden:a=!1,className:s,children:l,dropdownContent:w,additionalSelectedContent:d,accentColor:c}){const p=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),r())};return e.jsxs("div",{hidden:a,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":n,className:u("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!n},{"tw-bg-accent":n},{"tw-bg-transparent":!n},s),children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[e.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),n&&w&&e.jsxs(Ut,{children:[e.jsx(ae,{className:u(c&&"tw-me-1"),asChild:!0,children:e.jsx(L,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(k.MoreHorizontal,{})})}),e.jsx(At,{align:"end",children:w})]})]}),n&&d&&e.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),c&&e.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`})]},t)}const Jo=i.forwardRef(({className:t,...n},r)=>e.jsx(k.LoaderCircle,{size:35,className:u("tw-animate-spin",t),...n,ref:r}));Jo.displayName="Spinner";function Al({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:s,placeholder:l,isRequired:w=!1,className:d,defaultValue:c,value:p,onChange:f,onFocus:h,onBlur:m}){return e.jsxs("div",{className:u("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[e.jsx(tt,{htmlFor:t,className:u({"tw-text-red-600":r,"tw-hidden":!s}),children:`${s}${w?"*":""}`}),e.jsx(ie,{id:t,disabled:n,placeholder:l,required:w,className:u(d,{"tw-border-red-600":r}),defaultValue:c,value:p,onChange:f,onFocus:h,onBlur:m}),e.jsx("p",{className:u({"tw-hidden":!a}),children:a})]})}const Pl=Gt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Wo=i.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,role:"alert",className:u("pr-twp",Pl({variant:n}),t),...r}));Wo.displayName="Alert";const Zo=i.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:u("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Zo.displayName="AlertTitle";const Qo=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));Qo.displayName="AlertDescription";const Vl=J.Root,Ll=J.Trigger,$l=J.Group,Fl=J.Portal,zl=J.Sub,Bl=J.RadioGroup,ta=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>e.jsxs(J.SubTrigger,{ref:a,className:u("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",t),...o,children:[r,e.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ta.displayName=J.SubTrigger.displayName;const ea=i.forwardRef(({className:t,...n},r)=>e.jsx(J.SubContent,{ref:r,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));ea.displayName=J.SubContent.displayName;const na=i.forwardRef(({className:t,...n},r)=>e.jsx(J.Portal,{children:e.jsx(J.Content,{ref:r,className:u("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n})}));na.displayName=J.Content.displayName;const ra=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(J.Item,{ref:o,className:u("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t),...r}));ra.displayName=J.Item.displayName;const oa=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>e.jsxs(J.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(J.ItemIndicator,{children:e.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n]}));oa.displayName=J.CheckboxItem.displayName;const aa=i.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(J.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(J.ItemIndicator,{children:e.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]}));aa.displayName=J.RadioItem.displayName;const sa=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(J.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",n&&"tw-pl-8",t),...r}));sa.displayName=J.Label.displayName;const ia=i.forwardRef(({className:t,...n},r)=>e.jsx(J.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...n}));ia.displayName=J.Separator.displayName;function la({className:t,...n}){return e.jsx("span",{className:u("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...n})}la.displayName="ContextMenuShortcut";const wa=i.createContext({direction:"bottom"});function ca({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const o=i.useMemo(()=>({direction:n}),[n]);return e.jsx(wa.Provider,{value:o,children:e.jsx(xt.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}ca.displayName="Drawer";const Gl=xt.Drawer.Trigger,da=xt.Drawer.Portal,Hl=xt.Drawer.Close,Un=i.forwardRef(({className:t,...n},r)=>e.jsx(xt.Drawer.Overlay,{ref:r,className:u("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));Un.displayName=xt.Drawer.Overlay.displayName;const pa=i.forwardRef(({className:t,children:n,hideDrawerHandle:r=!1,...o},a)=>{const{direction:s="bottom"}=i.useContext(wa),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},w={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(da,{children:[e.jsx(Un,{}),e.jsxs(xt.Drawer.Content,{ref:a,className:u("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",s==="bottom"||s==="top"?"tw-flex-col":"tw-flex-row",l[s],t),...o,children:[!r&&(s==="bottom"||s==="right")&&e.jsx("div",{className:w[s]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),!r&&(s==="top"||s==="left")&&e.jsx("div",{className:w[s]})]})]})});pa.displayName="DrawerContent";function ua({className:t,...n}){return e.jsx("div",{className:u("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}ua.displayName="DrawerHeader";function ma({className:t,...n}){return e.jsx("div",{className:u("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}ma.displayName="DrawerFooter";const ha=i.forwardRef(({className:t,...n},r)=>e.jsx(xt.Drawer.Title,{ref:r,className:u("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));ha.displayName=xt.Drawer.Title.displayName;const fa=i.forwardRef(({className:t,...n},r)=>e.jsx(xt.Drawer.Description,{ref:r,className:u("tw-text-sm tw-text-muted-foreground",t),...n}));fa.displayName=xt.Drawer.Description.displayName;const ga=i.forwardRef(({className:t,value:n,...r},o)=>e.jsx(cn.Root,{ref:o,className:u("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(cn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));ga.displayName=cn.Root.displayName;function Kl({className:t,...n}){return e.jsx(gn.PanelGroup,{className:u("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...n})}const Xl=gn.Panel;function ql({withHandle:t,className:n,...r}){return e.jsx(gn.PanelResizeHandle,{className:u("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",n),...r,children:t&&e.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:e.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Ul({...t}){return e.jsx(mr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ba=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsxs(ye.Root,{ref:r,className:u("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:o,children:[e.jsx(ye.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(ye.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(ye.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ba.displayName=ye.Root.displayName;const xa=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(dn.Root,{className:u("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(dn.Thumb,{className:u("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});xa.displayName=dn.Root.displayName;const Yl=wt.Root,va=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(wt.List,{ref:r,className:u("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:o})});va.displayName=wt.List.displayName;const ya=i.forwardRef(({className:t,...n},r)=>e.jsx(wt.Trigger,{ref:r,className:u("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));ya.displayName=wt.Trigger.displayName;const Na=i.forwardRef(({className:t,...n},r)=>e.jsx(wt.Content,{ref:r,className:u("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Na.displayName=wt.Content.displayName;const ja=i.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:u("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));ja.displayName="Textarea";const Jl=(t,n)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Wl(t){return{preserveValue:!0,...t}}const ka=(t,n,r={})=>{const o=i.useRef(n);o.current=n;const a=i.useRef(r);a.current=Wl(a.current);const[s,l]=i.useState(()=>o.current),[w,d]=i.useState(!0);return i.useEffect(()=>{let c=!0;return d(!!t),(async()=>{if(t){const p=await t();c&&(l(()=>p),d(!1))}})(),()=>{c=!1,a.current.preserveValue||l(()=>o.current)}},[t]),[s,w]},sn=()=>!1,Zl=(t,n)=>{const[r]=ka(i.useCallback(async()=>{if(!t)return sn;const o=await Promise.resolve(t(n));return async()=>o()},[n,t]),sn,{preserveValue:!1});i.useEffect(()=>()=>{r!==sn&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>mr.toast});exports.Alert=Wo;exports.AlertDescription=Qo;exports.AlertTitle=Zo;exports.Avatar=Sn;exports.AvatarFallback=En;exports.AvatarImage=eo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=gs;exports.BOOK_SELECTOR_STRING_KEYS=vs;exports.Badge=ee;exports.BookChapterControl=fs;exports.BookSelectionMode=Ar;exports.BookSelector=ys;exports.Button=L;exports.COMMENT_LIST_STRING_KEYS=Ns;exports.Card=Xe;exports.CardContent=Cn;exports.CardDescription=Qr;exports.CardFooter=to;exports.CardHeader=Wr;exports.CardTitle=Zr;exports.ChapterRangeSelector=Or;exports.Checkbox=qe;exports.Checklist=Dl;exports.ComboBox=Pe;exports.Command=Ht;exports.CommandEmpty=Se;exports.CommandGroup=Mt;exports.CommandInput=he;exports.CommandItem=It;exports.CommandList=Kt;exports.CommentList=ui;exports.ContextMenu=Vl;exports.ContextMenuCheckboxItem=oa;exports.ContextMenuContent=na;exports.ContextMenuGroup=$l;exports.ContextMenuItem=ra;exports.ContextMenuLabel=sa;exports.ContextMenuPortal=Fl;exports.ContextMenuRadioGroup=Bl;exports.ContextMenuRadioItem=aa;exports.ContextMenuSeparator=ia;exports.ContextMenuShortcut=la;exports.ContextMenuSub=zl;exports.ContextMenuSubContent=ea;exports.ContextMenuSubTrigger=ta;exports.ContextMenuTrigger=Ll;exports.DataTable=uo;exports.Drawer=ca;exports.DrawerClose=Hl;exports.DrawerContent=pa;exports.DrawerDescription=fa;exports.DrawerFooter=ma;exports.DrawerHeader=ua;exports.DrawerOverlay=Un;exports.DrawerPortal=da;exports.DrawerTitle=ha;exports.DrawerTrigger=Gl;exports.DropdownMenu=Ut;exports.DropdownMenuCheckboxItem=Rt;exports.DropdownMenuContent=At;exports.DropdownMenuGroup=Rn;exports.DropdownMenuItem=ke;exports.DropdownMenuItemType=fo;exports.DropdownMenuLabel=ge;exports.DropdownMenuPortal=no;exports.DropdownMenuRadioGroup=oo;exports.DropdownMenuRadioItem=Dn;exports.DropdownMenuSeparator=se;exports.DropdownMenuShortcut=ao;exports.DropdownMenuSub=ro;exports.DropdownMenuSubContent=In;exports.DropdownMenuSubTrigger=Mn;exports.DropdownMenuTrigger=ae;exports.ERROR_DUMP_STRING_KEYS=mo;exports.ERROR_POPOVER_STRING_KEYS=yi;exports.ErrorDump=ho;exports.ErrorPopover=Ni;exports.FOOTNOTE_EDITOR_STRING_KEYS=Oi;exports.FOOTNOTE_LIST_STRING_KEYS=Vi;exports.Filter=Si;exports.FilterDropdown=ji;exports.Footer=Ci;exports.FootnoteEditor=Di;exports.FootnoteItem=xo;exports.FootnoteList=$i;exports.INVENTORY_STRING_KEYS=Yi;exports.Input=ie;exports.Inventory=Zi;exports.Label=tt;exports.MarkdownRenderer=vi;exports.MoreInfo=ki;exports.MultiSelectComboBox=go;exports.NavigationContentSearch=yl;exports.Popover=Xt;exports.PopoverAnchor=ds;exports.PopoverContent=Dt;exports.PopoverTrigger=qt;exports.Progress=ga;exports.RadioGroup=He;exports.RadioGroupItem=je;exports.RecentSearches=Dr;exports.ResizableHandle=ql;exports.ResizablePanel=Xl;exports.ResizablePanelGroup=Kl;exports.ResultsCard=Ol;exports.SCOPE_SELECTOR_STRING_KEYS=ul;exports.ScopeSelector=ml;exports.ScriptureResultsViewer=cl;exports.ScrollGroupSelector=hl;exports.SearchBar=Ye;exports.Select=re;exports.SelectContent=Bt;exports.SelectGroup=so;exports.SelectItem=ut;exports.SelectLabel=lo;exports.SelectScrollDownButton=An;exports.SelectScrollUpButton=On;exports.SelectSeparator=wo;exports.SelectTrigger=zt;exports.SelectValue=oe;exports.Separator=ne;exports.SettingsList=fl;exports.SettingsListHeader=bl;exports.SettingsListItem=gl;exports.SettingsSidebar=Ao;exports.SettingsSidebarContentSearch=nl;exports.Sidebar=Ln;exports.SidebarContent=Fn;exports.SidebarFooter=Co;exports.SidebarGroup=Le;exports.SidebarGroupAction=Eo;exports.SidebarGroupContent=Fe;exports.SidebarGroupLabel=$e;exports.SidebarHeader=_o;exports.SidebarInput=ko;exports.SidebarInset=$n;exports.SidebarMenu=zn;exports.SidebarMenuAction=To;exports.SidebarMenuBadge=Ro;exports.SidebarMenuButton=Gn;exports.SidebarMenuItem=Bn;exports.SidebarMenuSkeleton=Mo;exports.SidebarMenuSub=Io;exports.SidebarMenuSubButton=Oo;exports.SidebarMenuSubItem=Do;exports.SidebarProvider=Vn;exports.SidebarRail=jo;exports.SidebarSeparator=So;exports.SidebarTrigger=No;exports.Skeleton=Ve;exports.Slider=ba;exports.Sonner=Ul;exports.Spinner=Jo;exports.Switch=xa;exports.TabDropdownMenu=Be;exports.TabFloatingMenu=vl;exports.TabToolbar=xl;exports.Table=Ee;exports.TableBody=Re;exports.TableCaption=po;exports.TableCell=Ft;exports.TableFooter=co;exports.TableHead=pe;exports.TableHeader=Te;exports.TableRow=kt;exports.Tabs=Yl;exports.TabsContent=Na;exports.TabsList=va;exports.TabsTrigger=ya;exports.TextField=Al;exports.Textarea=ja;exports.ToggleGroup=Ke;exports.ToggleGroupItem=ce;exports.Toolbar=Tl;exports.Tooltip=Tt;exports.TooltipContent=Ct;exports.TooltipProvider=_t;exports.TooltipTrigger=$t;exports.UiLanguageSelector=Ml;exports.VerticalTabs=Kn;exports.VerticalTabsContent=qn;exports.VerticalTabsList=Xn;exports.VerticalTabsTrigger=zo;exports.badgeVariants=Jr;exports.buttonVariants=Ir;exports.cn=u;exports.getBookIdFromUSFM=Ui;exports.getLinesFromUSFM=Xi;exports.getNumberFromUSFM=qi;exports.getStatusForItem=vo;exports.getToolbarOSReservedSpaceClassName=El;exports.inventoryCountColumn=Hi;exports.inventoryItemColumn=Bi;exports.inventoryStatusColumn=Ki;exports.selectTriggerVariants=io;exports.useEvent=Jl;exports.useEventAsync=Zl;exports.useListbox=Pr;exports.usePromise=ka;exports.useRecentSearches=ps;exports.useSidebar=Me;function Ql(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),n==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}Ql(`*, ::before, ::after {
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
