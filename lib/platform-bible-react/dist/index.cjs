"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),s=require("react"),at=require("cmdk"),x=require("lucide-react"),$o=require("clsx"),Xo=require("tailwind-merge"),Ko=require("@radix-ui/react-dialog"),g=require("platform-bible-utils"),Ut=require("@radix-ui/react-slot"),_t=require("class-variance-authority"),qo=require("@radix-ui/react-popover"),Ho=require("@radix-ui/react-label"),Uo=require("@radix-ui/react-radio-group"),Yo=require("@radix-ui/react-separator"),Jo=require("markdown-to-jsx"),Wo=require("@radix-ui/react-avatar"),nt=require("@tanstack/react-table"),Ln=require("@radix-ui/react-dropdown-menu"),Zo=require("@radix-ui/react-select"),Qo=require("@radix-ui/react-checkbox"),ta=require("@radix-ui/react-toggle-group"),ea=require("@radix-ui/react-toggle"),na=require("@radix-ui/react-tooltip"),ra=require("@radix-ui/react-tabs"),oa=require("@radix-ui/react-menubar"),aa=require("react-hotkeys-hook"),sa=require("@radix-ui/react-context-menu"),lt=require("vaul"),ia=require("@radix-ui/react-progress"),wa=require("react-resizable-panels"),zn=require("sonner"),la=require("@radix-ui/react-slider"),ca=require("@radix-ui/react-switch");function Q(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const gt=Q(Ko),oe=Q(qo),Fn=Q(Ho),ae=Q(Uo),Gn=Q(Yo),Yt=Q(Wo),$=Q(Ln),H=Q(Zo),$e=Q(Qo),Ce=Q(ta),Bn=Q(ea),we=Q(na),st=Q(ra),X=Q(oa),K=Q(sa),Xe=Q(ia),He=Q(wa),ne=Q(la),Ke=Q(ca),da=Xo.extendTailwindMerge({prefix:"tw-"});function d(...t){return da($o.clsx(t))}const pa="layoutDirection";function tt(){const t=localStorage.getItem(pa);return t==="rtl"?t:"ltr"}const ua=gt.Portal,$n=s.forwardRef(({className:t,...n},r)=>e.jsx(gt.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));$n.displayName=gt.Overlay.displayName;const ma=s.forwardRef(({className:t,children:n,...r},o)=>{const a=tt();return e.jsxs(ua,{children:[e.jsx($n,{}),e.jsxs(gt.Content,{ref:o,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[n,e.jsxs(gt.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});ma.displayName=gt.Content.displayName;const ha=s.forwardRef(({className:t,...n},r)=>e.jsx(gt.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));ha.displayName=gt.Title.displayName;const fa=s.forwardRef(({className:t,...n},r)=>e.jsx(gt.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));fa.displayName=gt.Description.displayName;const zt=s.forwardRef(({className:t,...n},r)=>e.jsx(at.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));zt.displayName=at.Command.displayName;const Jt=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[e.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(at.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});Jt.displayName=at.Command.Input.displayName;const Ft=s.forwardRef(({className:t,...n},r)=>e.jsx(at.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Ft.displayName=at.Command.List.displayName;const le=s.forwardRef((t,n)=>e.jsx(at.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));le.displayName=at.Command.Empty.displayName;const kt=s.forwardRef(({className:t,...n},r)=>e.jsx(at.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));kt.displayName=at.Command.Group.displayName;const Xn=s.forwardRef(({className:t,...n},r)=>e.jsx(at.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...n}));Xn.displayName=at.Command.Separator.displayName;const Rt=s.forwardRef(({className:t,...n},r)=>e.jsx(at.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));Rt.displayName=at.Command.Item.displayName;var ga=Object.defineProperty,ba=(t,n,r)=>n in t?ga(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,O=(t,n,r)=>ba(t,typeof n!="symbol"?n+"":n,r);const Pt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ue=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Kn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Tn=Ra();function Wt(t,n=!0){return n&&(t=t.toUpperCase()),t in Tn?Tn[t]:0}function Ye(t){return Wt(t)>0}function xa(t){const n=typeof t=="string"?Wt(t):t;return n>=40&&n<=66}function va(t){return(typeof t=="string"?Wt(t):t)<=39}function qn(t){return t<=66}function ya(t){const n=typeof t=="string"?Wt(t):t;return Yn(n)&&!qn(n)}function*Na(){for(let t=1;t<=Pt.length;t++)yield t}const ja=1,Hn=Pt.length;function ka(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Je(t,n="***"){const r=t-1;return r<0||r>=Pt.length?n:Pt[r]}function Un(t){return t<=0||t>Hn?"******":Kn[t-1]}function Ca(t){return Un(Wt(t))}function Yn(t){const n=typeof t=="number"?Je(t):t;return Ye(n)&&!Ue.includes(n)}function Sa(t){const n=typeof t=="number"?Je(t):t;return Ye(n)&&Ue.includes(n)}function _a(t){return Kn[t-1].includes("*obsolete*")}function Ra(){const t={};for(let n=0;n<Pt.length;n++)t[Pt[n]]=n+1;return t}const B={allBookIds:Pt,nonCanonicalIds:Ue,bookIdToNumber:Wt,isBookIdValid:Ye,isBookNT:xa,isBookOT:va,isBookOTNT:qn,isBookDC:ya,allBookNumbers:Na,firstBook:ja,lastBook:Hn,extraBooks:ka,bookNumberToId:Je,bookNumberToEnglishName:Un,bookIdToEnglishName:Ca,isCanonical:Yn,isExtraMaterial:Sa,isObsolete:_a};var mt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(mt||{});const it=class{constructor(n){if(O(this,"name"),O(this,"fullPath"),O(this,"isPresent"),O(this,"hasVerseSegments"),O(this,"isCustomized"),O(this,"baseVersification"),O(this,"scriptureBooks"),O(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=mt[n]):(this._type=n,this.name=mt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};O(it,"Original",new it(mt.Original)),O(it,"Septuagint",new it(mt.Septuagint)),O(it,"Vulgate",new it(mt.Vulgate)),O(it,"English",new it(mt.English)),O(it,"RussianProtestant",new it(mt.RussianProtestant)),O(it,"RussianOrthodox",new it(mt.RussianOrthodox));let Dt=it;function En(t,n){const r=n[0];for(let o=1;o<n.length;o++)t=t.split(n[o]).join(r);return t.split(r)}var Jn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Jn||{});const ot=class L{constructor(n,r,o,a){if(O(this,"firstChapter"),O(this,"lastChapter"),O(this,"lastVerse"),O(this,"hasSegmentsDefined"),O(this,"text"),O(this,"BBBCCCVVVS"),O(this,"longHashCode"),O(this,"versification"),O(this,"rtlMark","‏"),O(this,"_bookNum",0),O(this,"_chapterNum",0),O(this,"_verseNum",0),O(this,"_verse"),o==null&&a==null)if(n!=null&&typeof n=="string"){const i=n,w=r!=null&&r instanceof Dt?r:void 0;this.setEmpty(w),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=r!=null&&r instanceof Dt?r:void 0;this.setEmpty(i),this._verseNum=n%L.chapterDigitShifter,this._chapterNum=Math.floor(n%L.bookDigitShifter/L.chapterDigitShifter),this._bookNum=Math.floor(n/L.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof L){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof Dt?n:L.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&o!=null)if(typeof n=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(n,r,o);else if(typeof n=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=o,this.versification=a??L.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new L(n),{success:!0,verseRef:r}}catch(o){if(o instanceof te)return r=new L,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(n,r,o){return n%L.bcvMaxValue*L.bookDigitShifter+(r>=0?r%L.bcvMaxValue*L.chapterDigitShifter:0)+(o>=0?o%L.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:o,verseNum:a,verse:i,versificationStr:w}=n,l=i||a.toString();let p;return w&&(p=new Dt(w)),r?new L(r,o.toString(),l,p):new L}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<n.length;a++){if(o=n[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>L.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(L.verseRangeSeparator)||this._verse.includes(L.verseSequenceIndicator))}get book(){return B.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=B.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:o}=L.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=L.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>B.lastBook)throw new te("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Dt(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(L.verseRangeSeparators,L.verseSequenceIndicators)}get BBBCCC(){return L.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return L.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Dt(mt[w])}catch{throw new te("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new te("Invalid reference : "+n);const o=r[1].split(":"),a=+o[0];if(o.length!==2||B.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!L.isVerseParseable(o[1]))throw new te("Invalid reference : "+n);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new L(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof L?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=L.verseRangeSeparators,o=L.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],i=En(this._verse,o);for(const w of i.map(l=>En(l,r))){const l=this.clone();l.verse=w[0];const p=l.verseNum;if(a.push(l),w.length>1){const c=this.clone();if(c.verse=w[1],!n)for(let u=p+1;u<c.verseNum;u++){const h=new L(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||a.push(h)}a.push(c)}}return a}validateVerse(n,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,n,r)){const i=a.internalValid;if(i!==0)return i;const w=a.BBBCCCVVV;if(o>w)return 3;if(o===w)return 4;o=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>B.lastBook?2:(B.isCanonical(this._bookNum),0)}setEmpty(n=L.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,o){this.bookNum=B.bookIdToNumber(n),this.chapter=r,this.verse=o}};O(ot,"defaultVersification",Dt.English),O(ot,"verseRangeSeparator","-"),O(ot,"verseSequenceIndicator",","),O(ot,"verseRangeSeparators",[ot.verseRangeSeparator]),O(ot,"verseSequenceIndicators",[ot.verseSequenceIndicator]),O(ot,"chapterDigitShifter",1e3),O(ot,"bookDigitShifter",ot.chapterDigitShifter*ot.chapterDigitShifter),O(ot,"bcvMaxValue",ot.chapterDigitShifter-1),O(ot,"ValidStatusType",Jn);class te extends Error{}const Wn=(t,n,r,o,a)=>{switch(t){case g.Section.OT:return n??"Old Testament";case g.Section.NT:return r??"New Testament";case g.Section.DC:return o??"Deuterocanon";case g.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Ta=(t,n,r,o,a)=>{switch(t){case g.Section.OT:return n??"OT";case g.Section.NT:return r??"NT";case g.Section.DC:return o??"DC";case g.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Kt(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedName)??B.bookIdToEnglishName(t)}function We(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Zn=B.allBookIds.filter(t=>!B.isObsolete(B.bookIdToNumber(t))),Ot=Object.fromEntries(Zn.map(t=>[t,B.bookIdToEnglishName(t)]));function Ze(t,n,r){const o=n.trim().toLowerCase();if(!o)return!1;const a=B.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(g.includes(a.toLowerCase(),o)||g.includes(t.toLowerCase(),o)||(i?g.includes(i.localizedName.toLowerCase(),o)||g.includes(i.localizedId.toLowerCase(),o):!1))}const Qn=s.forwardRef(({bookId:t,isSelected:n,onSelect:r,onMouseDown:o,section:a,className:i,showCheck:w=!1,localizedBookNames:l,commandValue:p},c)=>{const u=s.useRef(!1),h=()=>{u.current||r==null||r(t),setTimeout(()=>{u.current=!1},100)},f=v=>{u.current=!0,o?o(v):r==null||r(t)},m=s.useMemo(()=>Kt(t,l),[t,l]),b=s.useMemo(()=>We(t,l),[t,l]);return e.jsx("div",{className:d("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===g.Section.OT,"tw-border-s-purple-200":a===g.Section.NT,"tw-border-s-indigo-200":a===g.Section.DC,"tw-border-s-amber-200":a===g.Section.Extra}),children:e.jsxs(Rt,{ref:c,value:p||`${t} ${B.bookIdToEnglishName(t)}`,onSelect:h,onMouseDown:f,role:"option","aria-selected":n,"aria-label":`${B.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[w&&e.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",n?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),e.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),tr=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),M=s.forwardRef(({className:t,variant:n,size:r,asChild:o=!1,...a},i)=>{const w=o?Ut.Slot:"button";return e.jsx(w,{className:d(tr({variant:n,size:r,className:t})),ref:i,...a})});M.displayName="Button";const Gt=oe.Root,Bt=oe.Trigger,Tt=s.forwardRef(({className:t,align:n="center",sideOffset:r=4,...o},a)=>{const i=tt();return e.jsx(oe.Portal,{children:e.jsx(oe.Content,{ref:a,align:n,sideOffset:r,className:d("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Tt.displayName=oe.Content.displayName;function qe(t,n,r){return`${t} ${Ot[t]}${n?` ${We(t,n)} ${Kt(t,n)}`:""}${r?` ${r}`:""}`}function er({recentSearches:t,onSearchItemSelect:n,renderItem:r=l=>String(l),getItemKey:o=l=>String(l),ariaLabel:a="Show recent searches",groupHeading:i="Recent",id:w}){const[l,p]=s.useState(!1);if(t.length===0)return;const c=u=>{n(u),p(!1)};return e.jsxs(Gt,{open:l,onOpenChange:p,children:[e.jsx(Bt,{asChild:!0,children:e.jsx(M,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:e.jsx(x.Clock,{className:"tw-h-4 tw-w-4"})})}),e.jsx(Tt,{id:w,className:"tw-w-[300px] tw-p-0",align:"start",children:e.jsx(zt,{children:e.jsx(Ft,{children:e.jsx(kt,{heading:i,children:t.map(u=>e.jsxs(Rt,{onSelect:()=>c(u),className:"tw-flex tw-items-center",children:[e.jsx(x.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),e.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function Ea(t,n,r=(a,i)=>a===i,o=15){return a=>{const i=t.filter(l=>!r(l,a)),w=[a,...i.slice(0,o-1)];n(w)}}const Ae={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ma=[Ae.BOOK_ONLY,Ae.BOOK_CHAPTER,Ae.BOOK_CHAPTER_VERSE];function Mn(t){const n=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:n,isDigit:r}}function ht(t){return g.getChaptersForBook(B.bookIdToNumber(t))}function Ia(t,n,r){if(!t.trim()||n.length===0)return;const o=Ma.reduce((a,i)=>{if(a)return a;const w=i.exec(t.trim());if(w){const[l,p=void 0,c=void 0]=w.slice(1);let u;const h=n.filter(f=>Ze(f,l,r));if(h.length===1&&([u]=h),!u&&p){if(B.isBookIdValid(l)){const f=l.toUpperCase();n.includes(f)&&(u=f)}if(!u&&r){const f=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===l.toLowerCase());f&&n.includes(f[0])&&([u]=f)}}if(!u&&p){const m=(b=>Object.keys(Ot).find(v=>Ot[v].toLowerCase()===b.toLowerCase()))(l);if(m&&n.includes(m)&&(u=m),!u&&r){const b=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===l.toLowerCase());b&&n.includes(b[0])&&([u]=b)}}if(u){let f=p?parseInt(p,10):void 0;f&&f>ht(u)&&(f=Math.max(ht(u),1));const m=c?parseInt(c,10):void 0;return{book:u,chapterNum:f,verseNum:m}}}},void 0);if(o)return o}function Da(t,n,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const p=n.indexOf(t.book);if(p>0){const c=n[p-1],u=Math.max(ht(c),1);o({book:c,chapterNum:u,verseNum:1})}}},[t,n,o]),i=s.useCallback(()=>{const p=ht(t.book);if(t.chapterNum<p)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=n.indexOf(t.book);if(c<n.length-1){const u=n[c+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,n,o]),w=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:n.length===0||t.chapterNum===1&&n.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?x.ChevronsLeft:x.ChevronsRight},{onClick:w,disabled:n.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?x.ChevronLeft:x.ChevronRight},{onClick:l,disabled:n.length===0,title:"Next verse",icon:r==="ltr"?x.ChevronRight:x.ChevronLeft},{onClick:i,disabled:n.length===0||(t.chapterNum===ht(t.book)||ht(t.book)===-1)&&n.indexOf(t.book)===n.length-1,title:"Next chapter",icon:r==="ltr"?x.ChevronsRight:x.ChevronsLeft}],[t,n,r,a,w,l,i])}function In({bookId:t,scrRef:n,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:i}){if(t)return e.jsx(kt,{children:e.jsx("div",{className:d("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:ht(t)},(w,l)=>l+1).map(w=>e.jsx(Rt,{value:`${t} ${Ot[t]||""} ${w}`,onSelect:()=>r(w),ref:o(w),className:d("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===n.book&&w===n.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(w))??!1}),children:w},w))})})}function Va({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:i,recentSearches:w,onAddRecentSearch:l,id:p}){const c=tt(),[u,h]=s.useState(!1),[f,m]=s.useState(""),[b,v]=s.useState(""),[y,I]=s.useState("books"),[N,_]=s.useState(void 0),[z,V]=s.useState(!1),P=s.useRef(void 0),F=s.useRef(void 0),C=s.useRef(void 0),j=s.useRef(void 0),S=s.useRef({}),A=s.useCallback(k=>{n(k),l&&l(k)},[n,l]),D=s.useMemo(()=>o?o():Zn,[o]),U=s.useMemo(()=>({[g.Section.OT]:D.filter(G=>B.isBookOT(G)),[g.Section.NT]:D.filter(G=>B.isBookNT(G)),[g.Section.DC]:D.filter(G=>B.isBookDC(G)),[g.Section.Extra]:D.filter(G=>B.extraBooks().includes(G))}),[D]),T=s.useMemo(()=>Object.values(U).flat(),[U]),q=s.useMemo(()=>{if(!b.trim())return U;const k={[g.Section.OT]:[],[g.Section.NT]:[],[g.Section.DC]:[],[g.Section.Extra]:[]};return[g.Section.OT,g.Section.NT,g.Section.DC,g.Section.Extra].forEach(W=>{k[W]=U[W].filter(et=>Ze(et,b,a))}),k},[U,b,a]),R=s.useMemo(()=>Ia(b,T,a),[b,T,a]),Y=s.useCallback(()=>{R&&(A({book:R.book,chapterNum:R.chapterNum??1,verseNum:R.verseNum??1}),h(!1),v(""),m(""))},[A,R]),bt=s.useCallback(k=>{if(ht(k)<=1){A({book:k,chapterNum:1,verseNum:1}),h(!1),v("");return}_(k),I("chapters")},[A]),Xt=s.useCallback(k=>{const G=y==="chapters"?N:R==null?void 0:R.book;G&&(A({book:G,chapterNum:k,verseNum:1}),h(!1),I("books"),_(void 0),v(""))},[A,y,N,R]),Et=s.useCallback(k=>{A(k),h(!1),v("")},[A]),E=Da(t,T,c,n),J=s.useCallback(()=>{I("books"),_(void 0),setTimeout(()=>{F.current&&F.current.focus()},0)},[]),dt=s.useCallback(k=>{if(!k&&y==="chapters"){J();return}h(k),k&&(I("books"),_(void 0),v(""))},[y,J]),{otLong:pt,ntLong:xt,dcLong:Cn,extraLong:Sn}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Ao=s.useCallback(k=>Wn(k,pt,xt,Cn,Sn),[pt,xt,Cn,Sn]),Lo=s.useCallback(k=>R?!!R.chapterNum&&!k.toString().includes(R.chapterNum.toString()):!1,[R]),zo=s.useMemo(()=>g.formatScrRef(t,a?Kt(t.book,a):"English"),[t,a]),_n=s.useCallback(k=>G=>{S.current[k]=G},[]),Fo=s.useCallback(k=>{(k.key==="Home"||k.key==="End")&&k.stopPropagation()},[]),Go=s.useCallback(k=>{if(k.ctrlKey)return;const{isLetter:G,isDigit:W}=Mn(k.key);if(y==="chapters"){if(k.key==="Backspace"){k.preventDefault(),k.stopPropagation(),J();return}if(G||W){if(k.preventDefault(),k.stopPropagation(),I("books"),_(void 0),W&&N){const et=Ot[N];v(`${et} ${k.key}`)}else v(k.key);setTimeout(()=>{F.current&&F.current.focus()},0);return}}if((y==="chapters"||y==="books"&&R)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(k.key)){const et=y==="chapters"?N:R==null?void 0:R.book;if(!et)return;const rt=(()=>{if(!f)return 1;const Qt=f.match(/(\d+)$/);return Qt?parseInt(Qt[1],10):0})(),Mt=ht(et);if(!Mt)return;let vt=rt;const Rn=6;switch(k.key){case"ArrowLeft":rt!==0&&(vt=rt>1?rt-1:Mt);break;case"ArrowRight":rt!==0&&(vt=rt<Mt?rt+1:1);break;case"ArrowUp":vt=rt===0?Mt:Math.max(1,rt-Rn);break;case"ArrowDown":vt=rt===0?1:Math.min(Mt,rt+Rn);break;default:return}vt!==rt&&(k.preventDefault(),k.stopPropagation(),m(qe(et,a,vt)),setTimeout(()=>{const Qt=S.current[vt];Qt&&Qt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[y,R,J,N,f,a]),Bo=s.useCallback(k=>{if(k.shiftKey||k.key==="Tab"||k.key===" ")return;const{isLetter:G,isDigit:W}=Mn(k.key);(G||W)&&(k.preventDefault(),v(et=>et+k.key),F.current.focus(),V(!1))},[]);return s.useLayoutEffect(()=>{const k=setTimeout(()=>{if(u&&y==="books"&&C.current&&j.current){const G=C.current,W=j.current,et=W.offsetTop,rt=G.clientHeight,Mt=W.clientHeight,vt=et-rt/2+Mt/2;G.scrollTo({top:Math.max(0,vt),behavior:"smooth"}),m(qe(t.book))}},0);return()=>{clearTimeout(k)}},[u,y,b,R,t.book]),s.useLayoutEffect(()=>{if(y==="chapters"&&N){const k=N===t.book;setTimeout(()=>{if(C.current)if(k){const G=S.current[t.chapterNum];G&&G.scrollIntoView({block:"center",behavior:"smooth"})}else C.current.scrollTo({top:0});P.current&&P.current.focus()},0)}},[y,N,R,t.book,t.chapterNum]),e.jsxs(Gt,{open:u,onOpenChange:dt,children:[e.jsx(Bt,{asChild:!0,children:e.jsx(M,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":u,className:d("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:e.jsx("span",{className:"tw-truncate",children:zo})})}),e.jsx(Tt,{id:p,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:e.jsxs(zt,{ref:P,onKeyDown:Go,loop:!0,value:f,onValueChange:m,shouldFilter:!1,children:[y==="books"?e.jsxs("div",{className:"tw-flex tw-items-end",children:[e.jsxs("div",{className:"tw-relative tw-flex-1",children:[e.jsx(Jt,{ref:F,value:b,onValueChange:v,onKeyDown:Fo,onFocus:()=>V(!1),className:w&&w.length>0?"!tw-pr-10":""}),w&&w.length>0&&e.jsx(er,{recentSearches:w,onSearchItemSelect:Et,renderItem:k=>g.formatScrRef(k,"English"),getItemKey:k=>`${k.book}-${k.chapterNum}-${k.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:E.map(({onClick:k,disabled:G,title:W,icon:et})=>e.jsx(M,{variant:"ghost",size:"sm",onClick:()=>{V(!0),k()},disabled:G,className:"tw-h-10 tw-w-4 tw-p-0",title:W,onKeyDown:Bo,children:e.jsx(et,{})},W))})]}):e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[e.jsx(M,{variant:"ghost",size:"sm",onClick:J,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:c==="ltr"?e.jsx(x.ArrowLeft,{className:"tw-h-4 tw-w-4"}):e.jsx(x.ArrowRight,{className:"tw-h-4 tw-w-4"})}),N&&e.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Kt(N,a)})]}),!z&&e.jsxs(Ft,{ref:C,children:[y==="books"&&e.jsxs(e.Fragment,{children:[!R&&Object.entries(q).map(([k,G])=>{if(G.length!==0)return e.jsx(kt,{heading:Ao(k),children:G.map(W=>e.jsx(Qn,{bookId:W,onSelect:et=>bt(et),section:g.getSectionForBook(W),commandValue:`${W} ${Ot[W]}`,ref:W===t.book?j:void 0,localizedBookNames:a},W))},k)}),R&&e.jsx(kt,{children:e.jsx(Rt,{value:`${R.book} ${Ot[R.book]} ${R.chapterNum||""}:${R.verseNum||""})}`,onSelect:Y,className:"tw-font-semibold tw-text-primary",children:g.formatScrRef({book:R.book,chapterNum:R.chapterNum??1,verseNum:R.verseNum??1},a?We(R.book,a):void 0)},"top-match")}),R&&ht(R.book)>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Kt(R.book,a)}),e.jsx(In,{bookId:R.book,scrRef:t,onChapterSelect:Xt,setChapterRef:_n,isChapterDimmed:Lo,className:"tw-px-4 tw-pb-4"})]})]}),y==="chapters"&&N&&e.jsx(In,{bookId:N,scrRef:t,onChapterSelect:Xt,setChapterRef:_n,className:"tw-p-4"})]})]})})]})}const Oa=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Pa=_t.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Z=s.forwardRef(({className:t,...n},r)=>e.jsx(Fn.Root,{ref:r,className:d("pr-twp",Pa(),t),...n}));Z.displayName=Fn.Root.displayName;const Se=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsx(ae.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:o})});Se.displayName=ae.Root.displayName;const se=s.forwardRef(({className:t,...n},r)=>e.jsx(ae.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(ae.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));se.displayName=ae.Item.displayName;function Aa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function be({id:t,options:n=[],className:r,buttonClassName:o,popoverContentClassName:a,value:i,onChange:w=()=>{},getOptionLabel:l=Aa,icon:p=void 0,buttonPlaceholder:c="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:f="outline",alignDropDown:m="start",isDisabled:b=!1,...v}){const[y,I]=s.useState(!1);return e.jsxs(Gt,{open:y,onOpenChange:I,...v,children:[e.jsx(Bt,{asChild:!0,children:e.jsxs(M,{variant:f,role:"combobox","aria-expanded":y,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[e.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&e.jsx("div",{className:"tw-pe-2",children:p}),e.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):c})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Tt,{align:m,className:d("tw-w-[200px] tw-p-0",a),children:e.jsxs(zt,{children:[e.jsx(Jt,{placeholder:u,className:"tw-text-inherit"}),e.jsx(le,{children:h}),e.jsx(Ft,{children:n.map(N=>e.jsxs(Rt,{value:l(N),onSelect:()=>{w(N),I(!1)},children:[e.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(N)})}),l(N)]},l(N)))})]})})]})}function nr({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(c,u)=>u+1),[i]),l=c=>{r(c),c>n&&o(c)},p=c=>{o(c),c<t&&r(c)};return e.jsxs(e.Fragment,{children:[e.jsx(Z,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(be,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:t},"start chapter"),e.jsx(Z,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(be,{isDisabled:a,onChange:p,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:n},"end chapter")]})}var rr=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(rr||{});const La=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Le=(t,n)=>t[n]??n;function za({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:p,localizedStrings:c}){const u=Le(c,"%webView_bookSelector_currentBook%"),h=Le(c,"%webView_bookSelector_choose%"),f=Le(c,"%webView_bookSelector_chooseBooks%"),[m,b]=s.useState("current book"),v=y=>{b(y),t(y)};return e.jsx(Se,{className:"pr-twp tw-flex",value:m,onValueChange:y=>v(y),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(se,{value:"current book"}),e.jsx(Z,{className:"tw-ms-1",children:u})]}),e.jsx(Z,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(nr,{isDisabled:m==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:w,chapterCount:a,startChapter:l,endChapter:i})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(se,{value:"choose books"}),e.jsx(Z,{className:"tw-ms-1",children:f})]}),e.jsx(Z,{className:"tw-flex tw-items-center",children:o.map(y=>B.bookIdToEnglishName(y)).join(", ")}),e.jsx(M,{disabled:m==="current book",onClick:()=>r(),children:h})]})]})})}const Fa=["input","select","textarea","button"],Ga=["button","textbox"],or=({options:t,onFocusChange:n,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[i,w]=s.useState(void 0),[l,p]=s.useState(void 0),c=s.useCallback(m=>{w(m);const b=t.find(y=>y.id===m);b&&(n==null||n(b));const v=document.getElementById(m);v&&(v.scrollIntoView({block:"center"}),v.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[n,t]),u=s.useCallback(m=>{const b=t.find(v=>v.id===m);b&&(p(v=>v===m?void 0:m),r==null||r(b))},[r,t]),h=m=>{if(!m)return!1;const b=m.tagName.toLowerCase();if(m.isContentEditable||Fa.includes(b))return!0;const v=m.getAttribute("role");if(v&&Ga.includes(v))return!0;const y=m.getAttribute("tabindex");return y!==void 0&&y!=="-1"},f=s.useCallback(m=>{var F;const b=m.target,v=C=>C?document.getElementById(C):void 0,y=v(l),I=v(i);if(!!(y&&b&&y.contains(b)&&b!==y)&&h(b)){if(m.key==="Escape"||m.key==="ArrowLeft"){if(l){m.preventDefault(),m.stopPropagation();const C=t.find(j=>j.id===l);C&&c(C.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!y)return;const C=Array.from(y.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(C.length===0)return;const j=C.findIndex(A=>A===b);if(j===-1)return;let S;m.key==="ArrowDown"?S=Math.min(j+1,C.length-1):S=Math.max(j-1,0),S!==j&&(m.preventDefault(),m.stopPropagation(),(F=C[S])==null||F.focus());return}return}const z=t.findIndex(C=>C.id===i);let V=z;switch(m.key){case"ArrowDown":V=Math.min(z+1,t.length-1),m.preventDefault();break;case"ArrowUp":V=Math.max(z-1,0),m.preventDefault();break;case"Home":V=0,m.preventDefault();break;case"End":V=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&u(i),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const C=I;if(C){const j=C.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),S=C.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),A=j??S;if(A){m.preventDefault(),A.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const P=t[V];P&&c(P.id)},[t,c,i,l,u,o]);return{listboxRef:a,activeId:i,selectedId:l,handleKeyDown:f,focusOption:c}},_e=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));_e.displayName="Card";const ar=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));ar.displayName="CardHeader";const sr=s.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));sr.displayName="CardTitle";const ir=s.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));ir.displayName="CardDescription";const Qe=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...n}));Qe.displayName="CardContent";const wr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));wr.displayName="CardFooter";const ce=s.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...o},a)=>e.jsx(Gn.Root,{ref:a,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ce.displayName=Gn.Root.displayName;const lr=_t.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),qt=s.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,className:d("pr-twp",lr({variant:n}),t),...r}));qt.displayName="Badge";const $t=s.forwardRef(({className:t,type:n,...r},o)=>e.jsx("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));$t.displayName="Input";function cr({id:t,markdown:n,className:r,anchorTarget:o,truncate:a}){const i=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return e.jsx("div",{id:t,className:d("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":a},r),children:e.jsx(Jo,{options:i,children:n})})}const tn=s.forwardRef(({className:t,...n},r)=>e.jsx(Yt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));tn.displayName=Yt.Root.displayName;const dr=s.forwardRef(({className:t,...n},r)=>e.jsx(Yt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));dr.displayName=Yt.Image.displayName;const en=s.forwardRef(({className:t,...n},r)=>e.jsx(Yt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));en.displayName=Yt.Fallback.displayName;function Ba(t,n,r,o,a={year:"numeric",month:"short",day:"numeric"}){const i=new Date,w=new Date(i);w.setDate(w.getDate()-1);const l=t.getDate()===i.getDate()&&t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear(),p=t.getDate()===w.getDate()&&t.getMonth()===w.getMonth()&&t.getFullYear()===w.getFullYear();return l?n:p?r:t.toLocaleString(o,a)}function Dn({comment:t,isReply:n=!1,localizedStrings:r,isThreadExpanded:o=!1}){const a=s.useMemo(()=>{const l=new Date(t.date),p=Ba(l,r["%comment_date_today%"],r["%comment_date_yesterday%"]),c=l.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${p} at ${c}`},[t.date,r]),i=s.useMemo(()=>!n&&t.assignedUser?g.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:t.assignedUser}):t.user,[n,t.assignedUser,t.user,r]),w=s.useMemo(()=>t.user.split(" ").map(l=>l[0]).join("").toUpperCase().slice(0,2),[t.user]);return e.jsx("div",{className:d("tw-space-y-3",n&&"tw-text-sm"),children:e.jsxs("div",{className:"tw-flex tw-flex-row tw-gap-3",children:[e.jsx(tn,{className:d("tw-h-8 tw-w-8"),children:e.jsx(en,{className:"tw-text-xs tw-font-medium",children:w})}),e.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[e.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[e.jsx("p",{className:"tw-text-sm tw-font-medium",children:i}),e.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:a})]}),e.jsx("div",{className:"tw-flex tw-flex-row tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",onClick:l=>l.stopPropagation(),onMouseDown:l=>l.stopPropagation(),children:e.jsx(cr,{className:d("tw-text-sm tw-font-normal tw-text-primary"),markdown:t.contents,truncate:!o})})]})]})})}function $a({comments:t,localizedStrings:n,isSelected:r=!1,verseRef:o,verse:a,assignedUser:i,handleSelectThread:w,threadId:l}){const[p,c]=s.useState(""),[u,h]=s.useState(!1),[f,m]=s.useState(!1),b=s.useRef(null);s.useEffect(()=>{const C=b.current;if(!C)return;const j=()=>{m(C.scrollWidth>C.clientWidth)};return j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)},[a]);const v=s.useMemo(()=>({singleReply:n["%comment_thread_single_reply%"],multipleReplies:n["%comment_thread_multiple_replies%"]}),[n]),y=s.useMemo(()=>i?g.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:i}):void 0,[i,n]),I=s.useMemo(()=>t[0],[t]),N=s.useMemo(()=>t.slice(1),[t]),_=s.useMemo(()=>N.length??0,[N.length]),z=s.useMemo(()=>_>0,[_]),V=s.useMemo(()=>_===1?v.singleReply:g.formatReplacementString(v.multipleReplies,{count:_}),[_,v.singleReply,v.multipleReplies]),P=s.useCallback(()=>{console.log("Submit comment:",p),c("")},[p]),F=s.useCallback(()=>{console.log("Resolve comment thread")},[]);return e.jsx(_e,{role:"option","aria-selected":r,id:l,className:d("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-bg-slate-50 hover:tw-shadow-md":!r},{"tw-bg-background":r}),onClick:()=>{w(l)},tabIndex:-1,children:e.jsxs(Qe,{className:"tw-space-y-4 tw-p-0",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[y&&e.jsx(qt,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:y}),e.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[e.jsxs("p",{ref:b,className:`tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground ${u?"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":"tw-whitespace-nowrap"} tw-flex-1`,children:[o," ",a]}),f&&e.jsx(M,{variant:"ghost",size:"icon",onClick:C=>{C.stopPropagation(),h(!u)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":u?"Collapse text":"Expand text",children:u?e.jsx(x.ChevronUp,{}):e.jsx(x.ChevronDown,{})})]}),e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3",children:[e.jsx("div",{className:"tw-flex-1",children:e.jsx(Dn,{comment:I,localizedStrings:n,isThreadExpanded:r})}),r&&e.jsx(M,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:C=>{C.stopPropagation(),F()},children:e.jsx(x.Check,{})})]})]}),e.jsxs(e.Fragment,{children:[z&&!r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[e.jsx("div",{className:"tw-w-8",children:e.jsx(ce,{})}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:V})]}),r&&e.jsxs(e.Fragment,{children:[N.map(C=>e.jsx("div",{children:e.jsx(Dn,{comment:C,localizedStrings:n,isReply:!0,isThreadExpanded:r})},C.id)),e.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:C=>C.stopPropagation(),onKeyDown:C=>{(C.key==="Enter"||C.key===" ")&&C.stopPropagation()},children:[e.jsx($t,{className:"tw-w-full",placeholder:n["%comment_replyOrAssign%"],value:p,onChange:C=>c(C.target.value)}),e.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[e.jsx(M,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!p,children:e.jsx(x.AtSign,{})}),e.jsx(M,{size:"icon",onClick:P,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!p,children:e.jsx(x.ArrowUp,{})})]})]})]})]})]})})}function Xa({className:t="",threads:n,localizedStrings:r}){const[o,a]=s.useState(),i=n.map(h=>({id:`thread-${h.id}`})),w=s.useCallback(h=>{a(f=>f===h.id?void 0:h.id)},[]),l=s.useCallback(h=>{a(f=>f===h?void 0:h)},[]),{listboxRef:p,activeId:c,handleKeyDown:u}=or({options:i,onOptionSelect:w});return s.useEffect(()=>{if(!o)return;const h=document.getElementById(o);if(!h)return;const f=requestAnimationFrame(()=>{const m=requestAnimationFrame(()=>{const b=h.querySelector('input:not([disabled]):not([type="hidden"])'),v=h.querySelector("textarea:not([disabled]), select:not([disabled]), button:not([disabled])"),y=b??v;y==null||y.focus()});return()=>cancelAnimationFrame(m)});return()=>cancelAnimationFrame(f)},[o]),e.jsx("div",{id:"comment-thread-list",role:"listbox",tabIndex:0,ref:p,"aria-activedescendant":c??void 0,"aria-label":"Comments",className:d("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:u,children:n.map(h=>e.jsx("div",{children:e.jsx($a,{comments:h.comments,localizedStrings:r,verseRef:h.verseRef,verse:h.verse,handleSelectThread:l,threadId:`thread-${h.id}`,isSelected:o===`thread-${h.id}`,assignedUser:h.assignedUser})},`thread-${h.id}`))})}const nn=s.createContext(void 0);function ct(){const t=s.useContext(nn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const yt=_t.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Re=$.Trigger,rn=$.Group,pr=$.Portal,ur=$.Sub,mr=$.RadioGroup;function de({variant:t="default",...n}){const r=s.useMemo(()=>({variant:t}),[t]);return e.jsx(nn.Provider,{value:r,children:e.jsx($.Root,{...n})})}const on=s.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const i=ct();return e.jsxs($.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,yt({variant:i.variant})),...o,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});on.displayName=$.SubTrigger.displayName;const an=s.forwardRef(({className:t,...n},r)=>e.jsx($.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));an.displayName=$.SubContent.displayName;const Zt=s.forwardRef(({className:t,sideOffset:n=4,children:r,...o},a)=>{const i=tt();return e.jsx($.Portal,{children:e.jsx($.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:e.jsx("div",{dir:i,children:r})})})});Zt.displayName=$.Content.displayName;const sn=s.forwardRef(({className:t,inset:n,...r},o)=>{const a=tt(),i=ct();return e.jsx($.Item,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,yt({variant:i.variant})),...r,dir:a})});sn.displayName=$.Item.displayName;const Te=s.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const i=ct();return e.jsxs($.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,yt({variant:i.variant})),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx($.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Te.displayName=$.CheckboxItem.displayName;const wn=s.forwardRef(({className:t,children:n,...r},o)=>{const a=ct();return e.jsxs($.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,yt({variant:a.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx($.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});wn.displayName=$.RadioItem.displayName;const Ee=s.forwardRef(({className:t,inset:n,...r},o)=>e.jsx($.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Ee.displayName=$.Label.displayName;const pe=s.forwardRef(({className:t,...n},r)=>e.jsx($.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));pe.displayName=$.Separator.displayName;function hr({className:t,...n}){return e.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}hr.displayName="DropdownMenuShortcut";function Ka({table:t}){return e.jsxs(de,{children:[e.jsx(Ln.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(M,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(Zt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(Ee,{children:"Toggle columns"}),e.jsx(pe,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Te,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const At=H.Root,fr=H.Group,Lt=H.Value,gr=_t.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Ct=s.forwardRef(({className:t,children:n,size:r,...o},a)=>{const i=tt();return e.jsxs(H.Trigger,{className:d(gr({size:r,className:t})),ref:a,...o,dir:i,children:[n,e.jsx(H.Icon,{asChild:!0,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Ct.displayName=H.Trigger.displayName;const ln=s.forwardRef(({className:t,...n},r)=>e.jsx(H.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));ln.displayName=H.ScrollUpButton.displayName;const cn=s.forwardRef(({className:t,...n},r)=>e.jsx(H.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));cn.displayName=H.ScrollDownButton.displayName;const St=s.forwardRef(({className:t,children:n,position:r="popper",...o},a)=>{const i=tt();return e.jsx(H.Portal,{children:e.jsxs(H.Content,{ref:a,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[e.jsx(ln,{}),e.jsx(H.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:i,children:n})}),e.jsx(cn,{})]})})});St.displayName=H.Content.displayName;const br=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));br.displayName=H.Label.displayName;const wt=s.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(H.Item,{ref:o,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(H.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(H.ItemText,{children:n})]}));wt.displayName=H.Item.displayName;const xr=s.forwardRef(({className:t,...n},r)=>e.jsx(H.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));xr.displayName=H.Separator.displayName;function qa({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(At,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(Ct,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(Lt,{placeholder:t.getState().pagination.pageSize})}),e.jsx(St,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(wt,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(M,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(M,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(M,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(M,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Vn=`
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
`;function Ha(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function ie(t,n){const r=n?`${Vn}, ${n}`:Vn;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ha(o))}const ue=s.forwardRef(({className:t,stickyHeader:n,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const w=a.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{ie(w,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const p=new MutationObserver(()=>{l()});return p.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{p.disconnect()}},[]);const i=w=>{const{current:l}=a;if(l){if(w.key==="ArrowDown"){w.preventDefault(),ie(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return e.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:i,ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});ue.displayName="Table";const me=s.forwardRef(({className:t,stickyHeader:n,...r},o)=>e.jsx("thead",{ref:o,className:d({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));me.displayName="TableHeader";const he=s.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...n}));he.displayName="TableBody";const vr=s.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));vr.displayName="TableFooter";function Ua(t){s.useEffect(()=>{const n=t.current;if(!n)return;const r=o=>{if(n.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?ie(t.current):[],i=a.indexOf(document.activeElement),w=o.key==="ArrowRight"?i+1:i-1;w>=0&&w<a.length&&a[w].focus()}o.key==="Escape"&&(o.preventDefault(),n.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}function Ya(t,n,r){let o;return r==="ArrowLeft"&&n>0?o=t[n-1]:r==="ArrowRight"&&n<t.length-1&&(o=t[n+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ja(t,n,r){let o;return r==="ArrowDown"&&n<t.length-1?o=t[n+1]:r==="ArrowUp"&&n>0&&(o=t[n-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const ft=s.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),Ua(w);const l=s.useMemo(()=>w.current?ie(w.current):[],[w]),p=s.useCallback(u=>{const{current:h}=w;if(!h||!h.parentElement)return;const f=h.closest("table"),m=f?ie(f).filter(y=>y.tagName==="TR"):[],b=m.indexOf(h),v=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Ja(m,b,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Ya(l,v,u.key);else if(u.key==="Escape"){u.preventDefault();const y=h.closest("table");y&&y.focus()}n==null||n(u)},[w,l,n]),c=s.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return e.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:p,onFocus:c,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});ft.displayName="TableRow";const Ht=s.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));Ht.displayName="TableHead";const jt=s.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));jt.displayName="TableCell";const yr=s.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));yr.displayName="TableCaption";function xe({className:t,...n}){return e.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}function Nr({columns:t,data:n,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{},id:l,isLoading:p=!1,noResultsMessage:c}){var P;const[u,h]=s.useState([]),[f,m]=s.useState([]),[b,v]=s.useState({}),[y,I]=s.useState({}),N=s.useMemo(()=>n??[],[n]),_=nt.useReactTable({data:N,columns:t,getCoreRowModel:nt.getCoreRowModel(),...r&&{getPaginationRowModel:nt.getPaginationRowModel()},onSortingChange:h,getSortedRowModel:nt.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:nt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:I,state:{sorting:u,columnFilters:f,columnVisibility:b,rowSelection:y}}),z=_.getVisibleFlatColumns();let V;return p?V=Array.from({length:10}).map((j,S)=>`skeleton-row-${S}`).map(j=>e.jsx(ft,{children:e.jsx(jt,{colSpan:z.length??t.length,className:"tw-border-0 tw-p-0",children:e.jsx("div",{className:"tw-w-full tw-py-2",children:e.jsx(xe,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},j)):((P=_.getRowModel().rows)==null?void 0:P.length)>0?V=_.getRowModel().rows.map(F=>e.jsx(ft,{onClick:()=>w(F,_),"data-state":F.getIsSelected()&&"selected",children:F.getVisibleCells().map(C=>e.jsx(jt,{children:nt.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},F.id)):V=e.jsx(ft,{children:e.jsx(jt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:c})}),e.jsxs("div",{className:"pr-twp",id:l,children:[a&&e.jsx(Ka,{table:_}),e.jsxs(ue,{stickyHeader:i,children:[e.jsx(me,{stickyHeader:i,children:_.getHeaderGroups().map(F=>e.jsx(ft,{children:F.headers.map(C=>e.jsx(Ht,{children:C.isPlaceholder?void 0:nt.flexRender(C.column.columnDef.header,C.getContext())},C.id))},F.id))}),e.jsx(he,{children:V})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(M,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),e.jsx(M,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&e.jsx(qa,{table:_})]})}const jr=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),On=(t,n)=>t[n]??n;function kr({errorDetails:t,handleCopyNotify:n,localizedStrings:r,id:o}){const a=On(r,"%webView_error_dump_header%"),i=On(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),e.jsx(M,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:e.jsx(x.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Wa=Object.freeze([...jr,"%webView_error_dump_copied_message%"]);function Za({errorDetails:t,handleCopyNotify:n,localizedStrings:r,children:o,className:a,id:i}){const[w,l]=s.useState(!1),p=()=>{l(!0),n&&n()},c=u=>{u||l(!1)};return e.jsxs(Gt,{onOpenChange:c,children:[e.jsx(Bt,{asChild:!0,children:o}),e.jsxs(Tt,{id:i,className:d("tw-min-w-80 tw-max-w-96",a),children:[w&&r["%webView_error_dump_copied_message%"]&&e.jsx(Z,{children:r["%webView_error_dump_copied_message%"]}),e.jsx(kr,{errorDetails:t,handleCopyNotify:p,localizedStrings:r})]})]})}var Cr=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Cr||{});function Qa({id:t,label:n,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((c,u)=>c.itemType===0?[u,[]]:void 0).filter(c=>!!c))),[i,w]=s.useState({}),l=(c,u)=>{const h=!o[c][u];a(m=>(m[c][u]=h,{...m}));const f=r[c].items[u];f.onUpdate(f.id,h)},p=(c,u)=>{w(f=>(f[c]=u,{...f}));const h=r[c].items.find(f=>f.id===u);h?h.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return e.jsx("div",{id:t,children:e.jsxs(de,{children:[e.jsx(Re,{asChild:!0,children:e.jsxs(M,{variant:"default",children:[e.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(Zt,{children:r.map((c,u)=>e.jsxs("div",{children:[e.jsx(Ee,{children:c.label}),e.jsx(rn,{children:c.itemType===0?e.jsx(e.Fragment,{children:c.items.map((h,f)=>e.jsx("div",{children:e.jsx(Te,{checked:o[u][f],onCheckedChange:()=>l(u,f),children:h.label})},h.id))}):e.jsx(mr,{value:i[u],onValueChange:h=>p(u,h),children:c.items.map(h=>e.jsx("div",{children:e.jsx(wn,{value:h.id,children:h.label})},h.id))})}),e.jsx(pe,{})]},c.label))})]})})}function ts({id:t,category:n,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const p=new g.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,h)=>u+h,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[n&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(x.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&e.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||w)&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(M,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",e.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(M,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",e.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function es({id:t,versionHistory:n}){const[r,o]=s.useState(!1),a=new Date;function i(l){const p=new Date(l),c=new Date(a.getTime()-p.getTime()),u=c.getUTCFullYear()-1970,h=c.getUTCMonth(),f=c.getUTCDate()-1;let m="";return u>0?m=`${u.toString()} year${u===1?"":"s"} ago`:h>0?m=`${h.toString()} month${h===1?"":"s"} ago`:f===0?m="today":m=`${f.toString()} day${f===1?"":"s"} ago`,m}const w=Object.entries(n).sort((l,p)=>p[0].localeCompare(l[0]));return e.jsxs("div",{className:"pr-twp",id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:l[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",l[0]]}),e.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&e.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function ns({id:t,publisherDisplayName:n,fileSize:r,locales:o,versionHistory:a,currentVersion:i}){const w=s.useMemo(()=>g.formatBytes(r),[r]),p=(c=>{const u=new Intl.DisplayNames(g.getCurrentLocale(),{type:"language"});return c.map(h=>u.of(h))})(o);return e.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&e.jsx(es,{versionHistory:a}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:w})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Version"}),e.jsx("span",{className:"tw-font-semibold",children:i}),e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:p.join(", ")})]})})]})]})]})})}function Sr({entries:t,selected:n,onChange:r,placeholder:o,hasToggleAllFeature:a=!1,selectAllText:i="Select All",clearAllText:w="Clear All",commandEmptyMessage:l="No entries found",customSelectedText:p,isOpen:c=void 0,onOpenChange:u=void 0,isDisabled:h=!1,sortSelected:f=!1,icon:m=void 0,className:b=void 0,variant:v="ghost",id:y}){const[I,N]=s.useState(!1),_=s.useCallback(S=>{var D;const A=(D=t.find(U=>U.label===S))==null?void 0:D.value;A&&r(n.includes(A)?n.filter(U=>U!==A):[...n,A])},[t,n,r]),z=()=>p||o,V=s.useMemo(()=>{if(!f)return t;const S=t.filter(D=>D.starred).sort((D,U)=>D.label.localeCompare(U.label)),A=t.filter(D=>!D.starred).sort((D,U)=>{const T=n.includes(D.value),q=n.includes(U.value);return T&&!q?-1:!T&&q?1:D.label.localeCompare(U.label)});return[...S,...A]},[t,n,f]),P=()=>{r(t.map(S=>S.value))},F=()=>{r([])},C=c??I,j=u??N;return e.jsx("div",{id:y,className:b,children:e.jsxs(Gt,{open:C,onOpenChange:j,children:[e.jsx(Bt,{asChild:!0,children:e.jsxs(M,{variant:v,role:"combobox","aria-expanded":C,className:"tw-group tw-w-full tw-justify-between",disabled:h,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[m&&e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),e.jsx("div",{className:"tw-font-normal",children:z()})]}),e.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Tt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(zt,{children:[e.jsx(Jt,{placeholder:`Search ${o.toLowerCase()}...`}),a&&e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(M,{variant:"ghost",size:"sm",onClick:P,children:i}),e.jsx(M,{variant:"ghost",size:"sm",onClick:F,children:w})]}),e.jsxs(Ft,{children:[e.jsx(le,{children:l}),e.jsx(kt,{children:V.map(S=>e.jsxs(Rt,{value:S.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(x.Check,{className:d("tw-h-4 tw-w-4",n.includes(S.value)?"tw-opacity-100":"tw-opacity-0")})}),S.starred&&e.jsx(x.Star,{className:"tw-h-4 tw-w-4"}),e.jsx("div",{className:"tw-flex-grow",children:S.label}),S.secondaryLabel&&e.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:S.secondaryLabel})]},S.label))})]})]})})]})})}function rs({entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:p,className:c,badgesPlaceholder:u,id:h}){return e.jsxs("div",{id:h,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(Sr,{entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:p,className:c}),n.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(f=>{var m;return e.jsxs(qt,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(M,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(b=>b!==f)),children:e.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(b=>b.value===f))==null?void 0:m.label]},f)})}):e.jsx(Z,{children:u})]})}function _r(t,n){if(!n||n.length===0)return t??"empty";const r=n.find(a=>typeof a=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof n[0]=="string"?"impossible":n[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function os(t,n,r=!0,o=void 0){if(!n||n.length===0)return;const a=[],i=[];let w=[];return n.forEach(l=>{typeof l!="string"&&l.marker==="fp"?(w.length>0&&i.push(w),w=[l]):w.push(l)}),w.length>0&&i.push(w),i.map((l,p)=>{const c=p===i.length-1;return e.jsxs("p",{className:"tw-mb-2",children:[dn(t,l,r,!0,a),c&&o]},_r(t,l))})}function dn(t,n,r=!0,o=!0,a=[]){if(!(!n||n.length===0))return n.map(i=>{if(typeof i=="string"){const w=`${t}-text-${i.slice(0,10)}`;if(o){const l=d(`usfm_${t}`);return e.jsx("span",{className:l,children:i},w)}return e.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[e.jsx(x.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),e.jsx("span",{children:i}),e.jsx(x.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},w)}return as(i,_r(`${t}\\${i.marker}`,[i]),r,[...a,t??"unknown"])})}function as(t,n,r,o=[]){const{marker:a}=t;return e.jsxs("span",{children:[a?r&&e.jsx("span",{className:"marker",children:`\\${a} `}):e.jsx(x.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),dn(a,t.content,r,!0,[...o,a??"unknown"])]},n)}function Rr({footnote:t,layout:n="horizontal",formatCaller:r,showMarkers:o=!0}){const a=r?r(t.caller):t.caller,i=a!==t.caller;let w,l=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([w,...l]=t.content);const p=o?e.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,c=o?e.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=e.jsxs(e.Fragment,{children:[a&&e.jsxs("span",{className:d("note-caller",{formatted:i}),children:[a," "]}),w&&e.jsxs(e.Fragment,{children:[dn(t.marker,[w],o,!1)," "]})]}),m=d(n==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:d("textual-note-header tw-text-nowrap tw-pr-2",m),children:[p,u]}),e.jsx("div",{className:d("textual-note-body",m),children:l&&l.length>0&&e.jsx(e.Fragment,{children:os(t.marker,l,o,c)})})]})}const ss=(t,n)=>t[n]??n;function is({className:t,footnotes:n,layout:r="horizontal",listId:o,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:w=!1,formatCaller:l,onFootnoteSelected:p,localizedStrings:c}){const u=c?ss(c,"%webView_footnoteList_header%"):"Footnotes",h=l??g.getFormatCallerFunction(n,void 0),f=(N,_)=>{p==null||p(N,_,o)},m=a?n.findIndex(N=>N===a):0,[b,v]=s.useState(m),y=N=>{if(n.length)switch(N.key){case"ArrowDown":N.preventDefault(),v(_=>Math.min(_+1,n.length-1));break;case"ArrowUp":N.preventDefault(),v(_=>Math.max(_-1,0));break;case"Enter":case" ":N.preventDefault(),p==null||p(n[b],b,o);break}},I=s.useRef([]);return s.useEffect(()=>{var N;b>=0&&b<I.current.length&&((N=I.current[b])==null||N.focus())},[b]),e.jsxs(e.Fragment,{children:[r==="vertical"&&e.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:u}),e.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:d("tw-h-full tw-overflow-y-auto",t),onKeyDown:y,children:e.jsx("div",{className:d("tw-p-0.5",r==="horizontal"?"tw-table":"tw-flex tw-flex-col tw-gap-1",!w&&"formatted-font"),children:n.map((N,_)=>{const z=N===a,V=`${o}-${_}`;return e.jsx(_e,{ref:P=>{I.current[_]=P},role:"option","aria-selected":z,"data-marker":N.marker,"data-state":z?"selected":void 0,tabIndex:-1,className:d("data-[state=selected]:tw-bg-muted",p&&"tw-cursor-pointer hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-py-0 tw-shadow-none",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm"),onClick:()=>f(N,_),children:e.jsx(Rr,{footnote:N,layout:r,formatCaller:()=>h(N.caller,_),showMarkers:i})},V)})})})]})}function ws({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(p=>g.deepEqual(p,l))||w.push(l)}),w},[t]);return e.jsxs(ue,{stickyHeader:!0,children:[e.jsx(me,{stickyHeader:!0,children:e.jsxs(ft,{children:[e.jsx(Ht,{children:o}),e.jsx(Ht,{children:a})]})}),e.jsx(he,{children:i.length>0&&i.map(w=>e.jsxs(ft,{onClick:()=>{n(w.reference)},children:[e.jsx(jt,{children:`${B.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),e.jsx(jt,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Me=s.forwardRef(({className:t,...n},r)=>e.jsx($e.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx($e.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));Me.displayName=$e.Root.displayName;const Tr=_t.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ls=s.forwardRef(({className:t,variant:n,size:r,...o},a)=>e.jsx(Bn.Root,{ref:a,className:d(Tr({variant:n,size:r,className:t})),...o}));ls.displayName=Bn.Root.displayName;const Er=s.createContext({size:"default",variant:"default"}),pn=s.forwardRef(({className:t,variant:n,size:r,children:o,...a},i)=>{const w=tt();return e.jsx(Ce.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:w,children:e.jsx(Er.Provider,{value:{variant:n,size:r},children:o})})});pn.displayName=Ce.Root.displayName;const re=s.forwardRef(({className:t,children:n,variant:r,size:o,...a},i)=>{const w=s.useContext(Er);return e.jsx(Ce.Item,{ref:i,className:d(Tr({variant:w.variant||r,size:w.size||o}),t),...a,children:n})});re.displayName=Ce.Item.displayName;const Ie=t=>t==="asc"?e.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),cs=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(M,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Ie(n.getIsSorted())]})}),ds=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(M,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Ie(r.getIsSorted())]})}),ps=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(M,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Ie(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),ze=(t,n,r,o,a,i)=>{let w=[...r];t.forEach(p=>{n==="approved"?w.includes(p)||w.push(p):w=w.filter(c=>c!==p)}),o(w);let l=[...a];t.forEach(p=>{n==="unapproved"?l.includes(p)||l.push(p):l=l.filter(c=>c!==p)}),i(l)},us=(t,n,r,o,a)=>({accessorKey:"status",header:({column:i})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(M,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Ie(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return e.jsxs(pn,{value:w,variant:"outline",type:"single",children:[e.jsx(re,{onClick:p=>{p.stopPropagation(),ze([l],"approved",n,r,o,a)},value:"approved",children:e.jsx(x.CircleCheckIcon,{})}),e.jsx(re,{onClick:p=>{p.stopPropagation(),ze([l],"unapproved",n,r,o,a)},value:"unapproved",children:e.jsx(x.CircleXIcon,{})}),e.jsx(re,{onClick:p=>{p.stopPropagation(),ze([l],"unknown",n,r,o,a)},value:"unknown",children:e.jsx(x.CircleHelpIcon,{})})]})}}),ms=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),hs=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},fs=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},Mr=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",gs=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),bs=(t,n,r)=>{let o=t;return n!=="all"&&(o=o.filter(a=>n==="approved"&&a.status==="approved"||n==="unapproved"&&a.status==="unapproved"||n==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},xs=(t,n,r)=>{const o=[];return t.forEach(a=>{const i=o.find(w=>g.deepEqual(w.items,g.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:a.verseRef,text:a.verse});else{const w={items:g.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:Mr(g.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],n,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(w)}}),o},ut=(t,n)=>t[n]??n;function vs({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,scope:w,onScopeChange:l,columns:p,id:c,areInventoryItemsLoading:u=!1}){const h=ut(r,"%webView_inventory_all%"),f=ut(r,"%webView_inventory_approved%"),m=ut(r,"%webView_inventory_unapproved%"),b=ut(r,"%webView_inventory_unknown%"),v=ut(r,"%webView_inventory_scope_currentBook%"),y=ut(r,"%webView_inventory_scope_chapter%"),I=ut(r,"%webView_inventory_scope_verse%"),N=ut(r,"%webView_inventory_filter_text%"),_=ut(r,"%webView_inventory_show_additional_items%"),z=ut(r,"%webView_inventory_no_results%"),[V,P]=s.useState(!1),[F,C]=s.useState("all"),[j,S]=s.useState(""),[A,D]=s.useState([]),U=s.useMemo(()=>{const E=t??[];return E.length===0?[]:xs(E,a,i)},[t,a,i]),T=s.useMemo(()=>{if(V)return U;const E=[];return U.forEach(J=>{const dt=J.items[0],pt=E.find(xt=>xt.items[0]===dt);pt?(pt.count+=J.count,pt.occurrences=pt.occurrences.concat(J.occurrences)):E.push({items:[dt],count:J.count,occurrences:J.occurrences,status:J.status})}),E},[V,U]),q=s.useMemo(()=>T.length===0?[]:bs(T,F,j),[T,F,j]),R=s.useMemo(()=>{var dt,pt;if(!V)return p;const E=(dt=o==null?void 0:o.tableHeaders)==null?void 0:dt.length;if(!E)return p;const J=[];for(let xt=0;xt<E;xt++)J.push(ds(((pt=o==null?void 0:o.tableHeaders)==null?void 0:pt[xt])||"Additional Item",xt+1));return[...J,...p]},[o==null?void 0:o.tableHeaders,p,V]);s.useEffect(()=>{q.length===0?D([]):q.length===1&&D(q[0].items)},[q]);const Y=(E,J)=>{J.setRowSelection(()=>{const dt={};return dt[E.index]=!0,dt}),D(E.original.items)},bt=E=>{if(E==="book"||E==="chapter"||E==="verse")l(E);else throw new Error(`Invalid scope value: ${E}`)},Xt=E=>{if(E==="all"||E==="approved"||E==="unapproved"||E==="unknown")C(E);else throw new Error(`Invalid status filter value: ${E}`)},Et=s.useMemo(()=>{if(T.length===0||A.length===0)return[];const E=T.filter(J=>g.deepEqual(V?J.items:[J.items[0]],A));if(E.length>1)throw new Error("Selected item is not unique");return E.length===0?[]:E[0].occurrences},[A,V,T]);return e.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(At,{onValueChange:E=>Xt(E),defaultValue:F,children:[e.jsx(Ct,{className:"tw-m-1",children:e.jsx(Lt,{placeholder:"Select filter"})}),e.jsxs(St,{children:[e.jsx(wt,{value:"all",children:h}),e.jsx(wt,{value:"approved",children:f}),e.jsx(wt,{value:"unapproved",children:m}),e.jsx(wt,{value:"unknown",children:b})]})]}),e.jsxs(At,{onValueChange:E=>bt(E),defaultValue:w,children:[e.jsx(Ct,{className:"tw-m-1",children:e.jsx(Lt,{placeholder:"Select scope"})}),e.jsxs(St,{children:[e.jsx(wt,{value:"book",children:v}),e.jsx(wt,{value:"chapter",children:y}),e.jsx(wt,{value:"verse",children:I})]})]}),e.jsx($t,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:N,value:j,onChange:E=>{S(E.target.value)}}),o&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Me,{className:"tw-m-1",checked:V,onCheckedChange:E=>{P(E)}}),e.jsx(Z,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??_})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Nr,{columns:R,data:q,onRowClickHandler:Y,stickyHeader:!0,isLoading:u,noResultsMessage:z})}),Et.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(ws,{occurrenceData:Et,setScriptureReference:n,localizedStrings:r})})]})}const De=we.Provider,Ve=we.Root,Oe=we.Trigger,fe=s.forwardRef(({className:t,sideOffset:n=4,...r},o)=>e.jsx(we.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));fe.displayName=we.Content.displayName;const ys="16rem",Ns="3rem",Ir=s.createContext(void 0);function ge(){const t=s.useContext(Ir);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const un=s.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:o,style:a,children:i,side:w="primary",...l},p)=>{const[c,u]=s.useState(t),h=n??c,f=s.useCallback(_=>{const z=typeof _=="function"?_(h):_;r?r(z):u(z)},[r,h]),m=s.useCallback(()=>f(_=>!_),[f]),b=h?"expanded":"collapsed",I=tt()==="ltr"?w:w==="primary"?"secondary":"primary",N=s.useMemo(()=>({state:b,open:h,setOpen:f,toggleSidebar:m,side:I}),[b,h,f,m,I]);return e.jsx(Ir.Provider,{value:N,children:e.jsx(De,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":ys,"--sidebar-width-icon":Ns,...a},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:p,...l,children:i})})})});un.displayName="SidebarProvider";const mn=s.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:o,...a},i)=>{const w=ge();return n==="none"?e.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...a,children:o}):e.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?n:"","data-variant":t,"data-side":w.side,children:[e.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});mn.displayName="Sidebar";const Dr=s.forwardRef(({className:t,onClick:n,...r},o)=>{const a=ge();return e.jsxs(M,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{n==null||n(i),a.toggleSidebar()},...r,children:[a.side==="primary"?e.jsx(x.PanelLeft,{}):e.jsx(x.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Dr.displayName="SidebarTrigger";const Vr=s.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:o}=ge();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});Vr.displayName="SidebarRail";const hn=s.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));hn.displayName="SidebarInset";const Or=s.forwardRef(({className:t,...n},r)=>e.jsx($t,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));Or.displayName="SidebarInput";const Pr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Pr.displayName="SidebarHeader";const Ar=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));Ar.displayName="SidebarFooter";const Lr=s.forwardRef(({className:t,...n},r)=>e.jsx(ce,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));Lr.displayName="SidebarSeparator";const fn=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));fn.displayName="SidebarContent";const ve=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));ve.displayName="SidebarGroup";const ye=s.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?Ut.Slot:"div";return e.jsx(a,{ref:o,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ye.displayName="SidebarGroupLabel";const zr=s.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?Ut.Slot:"button";return e.jsx(a,{ref:o,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});zr.displayName="SidebarGroupAction";const Ne=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...n}));Ne.displayName="SidebarGroupContent";const gn=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));gn.displayName="SidebarMenu";const bn=s.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...n}));bn.displayName="SidebarMenuItem";const js=_t.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),xn=s.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:o="default",tooltip:a,className:i,...w},l)=>{const p=t?Ut.Slot:"button",{state:c}=ge(),u=e.jsx(p,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":n,className:d(js({variant:r,size:o}),i),...w});return a?(typeof a=="string"&&(a={children:a}),e.jsxs(Ve,{children:[e.jsx(Oe,{asChild:!0,children:u}),e.jsx(fe,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):u});xn.displayName="SidebarMenuButton";const Fr=s.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...o},a)=>{const i=n?Ut.Slot:"button";return e.jsx(i,{ref:a,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Fr.displayName="SidebarMenuAction";const Gr=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Gr.displayName="SidebarMenuBadge";const Br=s.forwardRef(({className:t,showIcon:n=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(xe,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(xe,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});Br.displayName="SidebarMenuSkeleton";const $r=s.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));$r.displayName="SidebarMenuSub";const Xr=s.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));Xr.displayName="SidebarMenuSubItem";const Kr=s.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:o,...a},i)=>{const w=t?Ut.Slot:"a";return e.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Kr.displayName="SidebarMenuSubButton";function qr({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:p}){const c=s.useCallback((f,m)=>{o(f,m)},[o]),u=s.useCallback(f=>{const m=r.find(b=>b.projectId===f);return m?m.projectName:f},[r]),h=s.useCallback(f=>!a.projectId&&f===a.label,[a]);return e.jsx(mn,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",p),children:e.jsxs(fn,{children:[e.jsxs(ve,{children:[e.jsx(ye,{className:"tw-text-sm",children:i}),e.jsx(Ne,{children:e.jsx(gn,{children:Object.entries(n).map(([f,m])=>e.jsx(bn,{children:e.jsx(xn,{onClick:()=>c(f),isActive:h(f),children:e.jsx("span",{className:"tw-pl-3",children:m})})},f))})})]}),e.jsxs(ve,{children:[e.jsx(ye,{className:"tw-text-sm",children:w}),e.jsx(Ne,{className:"tw-pl-3",children:e.jsx(be,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(f=>f.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:f=>{const m=u(f);c(m,f)},value:(a==null?void 0:a.projectId)??void 0,icon:e.jsx(x.ScrollText,{})})})]})]})})}const Pe=s.forwardRef(({value:t,onSearch:n,placeholder:r,isFullWidth:o,className:a,isDisabled:i=!1,id:w},l)=>{const p=tt();return e.jsxs("div",{id:w,className:d("tw-relative",{"tw-w-full":o},a),children:[e.jsx(x.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":p==="rtl"},{"tw-left-3":p==="ltr"})}),e.jsx($t,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>n(c.target.value),disabled:i}),t&&e.jsxs(M,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":p==="rtl"},{"tw-right-0":p==="ltr"}),onClick:()=>{n("")},children:[e.jsx(x.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Pe.displayName="SearchBar";function ks({id:t,extensionLabels:n,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:u}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Pe,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(un,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(qr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:i,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:u}),e.jsx(hn,{className:"tw-min-w-[215px]",children:o})]})]})}const Nt="scrBook",Cs="scrRef",Vt="source",Ss="details",_s="Scripture Reference",Rs="Scripture Book",Hr="Type",Ts="Details";function Es(t,n){const r=n??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Nt,header:(t==null?void 0:t.scriptureReferenceColumnName)??_s,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?B.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===Nt?g.formatScrRef(a.start):void 0},getGroupingValue:o=>B.bookIdToNumber(o.start.book),sortingFn:(o,a)=>g.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>g.formatScrRef(o.start),id:Cs,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:g.formatScrRef(a.start)},sortingFn:(o,a)=>g.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Vt,header:r?(t==null?void 0:t.typeColumnName)??Hr:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Ss,header:(t==null?void 0:t.detailsColumnName)??Ts,cell:o=>o.getValue(),enableGrouping:!1}]}const Ms=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||g.compareScrRefs(t.start,t.end)===0?`${g.scrRefToBBBCCCVVV(t.start)}+${n}`:`${g.scrRefToBBBCCCVVV(t.start)}+${n}-${g.scrRefToBBBCCCVVV(t.end)}+${r}`},Pn=t=>`${Ms({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Is({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:i,detailsColumnName:w,onRowSelected:l,id:p}){const[c,u]=s.useState([]),[h,f]=s.useState([{id:Nt,desc:!1}]),[m,b]=s.useState({}),v=s.useMemo(()=>t.flatMap(j=>j.data.map(S=>({...S,source:j.source}))),[t]),y=s.useMemo(()=>Es({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:w},r),[o,i,w,r]);s.useEffect(()=>{c.includes(Vt)?f([{id:Vt,desc:!1},{id:Nt,desc:!1}]):f([{id:Nt,desc:!1}])},[c]);const I=nt.useReactTable({data:v,columns:y,state:{grouping:c,sorting:h,rowSelection:m},onGroupingChange:u,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:nt.getExpandedRowModel(),getGroupedRowModel:nt.getGroupedRowModel(),getCoreRowModel:nt.getCoreRowModel(),getSortedRowModel:nt.getSortedRowModel(),getRowId:Pn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const j=I.getSelectedRowModel().rowsById,S=Object.keys(j);if(S.length===1){const A=v.find(D=>Pn(D)===S[0])||void 0;A&&l(A)}}},[m,v,l,I]);const N=a??Rs,_=i??Hr,z=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[Nt]},{label:`Group by ${_}`,value:[Vt]},{label:`Group by ${N} and ${_}`,value:[Nt,Vt]},{label:`Group by ${_} and ${N}`,value:[Vt,Nt]}],V=j=>{u(JSON.parse(j))},P=(j,S)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(S)},F=(j,S)=>j.getIsGrouped()?"":d("banded-row",S%2===0?"even":"odd"),C=(j,S,A)=>{if(!((j==null?void 0:j.length)===0||S.depth<A.column.getGroupedIndex())){if(S.getIsGrouped())switch(S.depth){case 1:return"tw-ps-4";default:return}switch(S.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{id:p,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(At,{value:JSON.stringify(c),onValueChange:j=>{V(j)},children:[e.jsx(Ct,{className:"tw-mb-1 tw-mt-2",children:e.jsx(Lt,{})}),e.jsx(St,{position:"item-aligned",children:e.jsx(fr,{children:z.map(j=>e.jsx(wt,{value:JSON.stringify(j.value),children:j.label},j.label))})})]}),e.jsxs(ue,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(me,{children:I.getHeaderGroups().map(j=>e.jsx(ft,{children:j.headers.filter(S=>S.column.columnDef.header).map(S=>e.jsx(Ht,{colSpan:S.colSpan,className:"top-0 tw-sticky",children:S.isPlaceholder?void 0:e.jsxs("div",{children:[S.column.getCanGroup()?e.jsx(M,{variant:"ghost",title:`Toggle grouping by ${S.column.columnDef.header}`,onClick:S.column.getToggleGroupingHandler(),type:"button",children:S.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",nt.flexRender(S.column.columnDef.header,S.getContext())]})},S.id))},j.id))}),e.jsx(he,{children:I.getRowModel().rows.map((j,S)=>{const A=tt();return e.jsx(ft,{"data-state":j.getIsSelected()?"selected":"",className:d(F(j,S)),onClick:D=>P(j,D),children:j.getVisibleCells().map(D=>{if(!(D.getIsPlaceholder()||D.column.columnDef.enableGrouping&&!D.getIsGrouped()&&(D.column.columnDef.id!==Vt||!r)))return e.jsx(jt,{className:d(D.column.columnDef.id,"tw-p-[1px]",C(c,j,D)),children:D.getIsGrouped()?e.jsxs(M,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&e.jsx(x.ChevronDown,{}),!j.getIsExpanded()&&(A==="ltr"?e.jsx(x.ChevronRight,{}):e.jsx(x.ChevronLeft,{}))," ",nt.flexRender(D.column.columnDef.cell,D.getContext())," (",j.subRows.length,")"]}):nt.flexRender(D.column.columnDef.cell,D.getContext())},D.id)})},j.id)})})]})]})}const vn=(t,n)=>t.filter(r=>{try{return g.getSectionForBook(r)===n}catch{return!1}}),Ur=(t,n,r)=>vn(t,n).every(o=>r.includes(o));function Ds({section:t,availableBookIds:n,selectedBookIds:r,onToggle:o,localizedStrings:a}){const i=vn(n,t).length===0,w=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],p=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return e.jsx(M,{variant:"outline",size:"sm",onClick:()=>o(t),className:d(Ur(n,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Ta(t,w,l,p,c)})}const An=5,Fe=6;function Vs({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const i=o["%webView_book_selector_books_selected%"],w=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],p=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],h=o["%webView_book_selector_more%"],{otLong:f,ntLong:m,dcLong:b,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[y,I]=s.useState(!1),[N,_]=s.useState(""),z=s.useRef(void 0),V=s.useRef(!1);if(t.length!==B.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const P=s.useMemo(()=>B.allBookIds.filter((T,q)=>t[q]==="1"&&!B.isObsolete(B.bookIdToNumber(T))),[t]),F=s.useMemo(()=>{if(!N.trim()){const R={[g.Section.OT]:[],[g.Section.NT]:[],[g.Section.DC]:[],[g.Section.Extra]:[]};return P.forEach(Y=>{const bt=g.getSectionForBook(Y);R[bt].push(Y)}),R}const T=P.filter(R=>Ze(R,N,a)),q={[g.Section.OT]:[],[g.Section.NT]:[],[g.Section.DC]:[],[g.Section.Extra]:[]};return T.forEach(R=>{const Y=g.getSectionForBook(R);q[Y].push(R)}),q},[P,N,a]),C=s.useCallback((T,q=!1)=>{if(!q||!z.current){r(n.includes(T)?n.filter(E=>E!==T):[...n,T]),z.current=T;return}const R=P.findIndex(E=>E===z.current),Y=P.findIndex(E=>E===T);if(R===-1||Y===-1)return;const[bt,Xt]=[Math.min(R,Y),Math.max(R,Y)],Et=P.slice(bt,Xt+1).map(E=>E);r(n.includes(T)?n.filter(E=>!Et.includes(E)):[...new Set([...n,...Et])])},[n,r,P]),j=T=>{C(T,V.current),V.current=!1},S=(T,q)=>{T.preventDefault(),C(q,T.shiftKey)},A=s.useCallback(T=>{const q=vn(P,T).map(R=>R);r(Ur(P,T,n)?n.filter(R=>!q.includes(R)):[...new Set([...n,...q])])},[n,r,P]),D=()=>{r(P.map(T=>T))},U=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(g.Section).map(T=>e.jsx(Ds,{section:T,availableBookIds:P,selectedBookIds:n,onToggle:A,localizedStrings:o},T))}),e.jsxs(Gt,{open:y,onOpenChange:T=>{I(T),T||_("")},children:[e.jsx(Bt,{asChild:!0,children:e.jsxs(M,{variant:"outline",role:"combobox","aria-expanded":y,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${i}: ${n.length}`:w,e.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(Tt,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(zt,{shouldFilter:!1,onKeyDown:T=>{T.key==="Enter"&&(V.current=T.shiftKey)},children:[e.jsx(Jt,{placeholder:l,value:N,onValueChange:_}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(M,{variant:"ghost",size:"sm",onClick:D,children:p}),e.jsx(M,{variant:"ghost",size:"sm",onClick:U,children:c})]}),e.jsxs(Ft,{children:[e.jsx(le,{children:u}),Object.values(g.Section).map((T,q)=>{const R=F[T];if(R.length!==0)return e.jsxs(s.Fragment,{children:[e.jsx(kt,{heading:Wn(T,f,m,b,v),children:R.map(Y=>e.jsx(Qn,{bookId:Y,isSelected:n.includes(Y),onSelect:()=>j(Y),onMouseDown:bt=>S(bt,Y),section:g.getSectionForBook(Y),showCheck:!0,localizedBookNames:a,commandValue:qe(Y,a),className:"tw-flex tw-items-center"},Y))}),q<Object.values(g.Section).length-1&&e.jsx(Xn,{})]},T)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===Fe?Fe:An).map(T=>e.jsx(qt,{className:"hover:tw-bg-secondary",variant:"secondary",children:Kt(T,a)},T)),n.length>Fe&&e.jsx(qt,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-An} ${h}`})]})]})}const Os=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),It=(t,n)=>t[n]??n;function Ps({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l,id:p}){const c=It(w,"%webView_scope_selector_selected_text%"),u=It(w,"%webView_scope_selector_current_verse%"),h=It(w,"%webView_scope_selector_current_chapter%"),f=It(w,"%webView_scope_selector_current_book%"),m=It(w,"%webView_scope_selector_choose_books%"),b=It(w,"%webView_scope_selector_scope%"),v=It(w,"%webView_scope_selector_select_books%"),y=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:u,id:"scope-verse"},{value:"chapter",label:h,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],I=n?y.filter(N=>n.includes(N.value)):y;return e.jsxs("div",{id:p,className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(Z,{children:b}),e.jsx(Se,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:I.map(({value:N,label:_,id:z})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(se,{className:"tw-me-2",value:N,id:z}),e.jsx(Z,{htmlFor:z,children:_})]},z))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(Z,{children:v}),e.jsx(Vs,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Ge={[g.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[g.getLocalizeKeyForScrollGroupId(0)]:"A",[g.getLocalizeKeyForScrollGroupId(1)]:"B",[g.getLocalizeKeyForScrollGroupId(2)]:"C",[g.getLocalizeKeyForScrollGroupId(3)]:"D",[g.getLocalizeKeyForScrollGroupId(4)]:"E",[g.getLocalizeKeyForScrollGroupId(5)]:"F",[g.getLocalizeKeyForScrollGroupId(6)]:"G",[g.getLocalizeKeyForScrollGroupId(7)]:"H",[g.getLocalizeKeyForScrollGroupId(8)]:"I",[g.getLocalizeKeyForScrollGroupId(9)]:"J",[g.getLocalizeKeyForScrollGroupId(10)]:"K",[g.getLocalizeKeyForScrollGroupId(11)]:"L",[g.getLocalizeKeyForScrollGroupId(12)]:"M",[g.getLocalizeKeyForScrollGroupId(13)]:"N",[g.getLocalizeKeyForScrollGroupId(14)]:"O",[g.getLocalizeKeyForScrollGroupId(15)]:"P",[g.getLocalizeKeyForScrollGroupId(16)]:"Q",[g.getLocalizeKeyForScrollGroupId(17)]:"R",[g.getLocalizeKeyForScrollGroupId(18)]:"S",[g.getLocalizeKeyForScrollGroupId(19)]:"T",[g.getLocalizeKeyForScrollGroupId(20)]:"U",[g.getLocalizeKeyForScrollGroupId(21)]:"V",[g.getLocalizeKeyForScrollGroupId(22)]:"W",[g.getLocalizeKeyForScrollGroupId(23)]:"X",[g.getLocalizeKeyForScrollGroupId(24)]:"Y",[g.getLocalizeKeyForScrollGroupId(25)]:"Z"};function As({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:i,id:w}){const l={...Ge,...Object.fromEntries(Object.entries(o).map(([c,u])=>[c,c===u&&c in Ge?Ge[c]:u]))},p=tt();return e.jsxs(At,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(Ct,{size:a,className:d("pr-twp tw-w-auto",i),children:e.jsx(Lt,{placeholder:l[g.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(St,{id:w,align:p==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(wt,{value:`${c}`,children:l[g.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function Ls({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function zs({primary:t,secondary:n,children:r,isLoading:o=!1,loadingMessage:a}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),o?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):e.jsx("div",{children:r})]})}function Fs({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(ce,{}):""]})}function Yr(t,n){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===n))==null?void 0:r[0]}function je({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Jr=(t,n,r,o)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>n.filter(l=>l.group===i).sort((l,p)=>l.order-p.order).map(l=>e.jsxs(Ve,{children:[e.jsx(Oe,{asChild:!0,children:"command"in l?e.jsxs(sn,{onClick:()=>{o(l)},children:[l.iconPathBefore&&e.jsx(je,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&e.jsx(je,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):e.jsxs(ur,{children:[e.jsx(on,{children:l.label}),e.jsx(pr,{children:e.jsx(an,{children:Jr(t,n,Yr(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&e.jsx(fe,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function ke({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:o,className:a,variant:i,buttonVariant:w="ghost",id:l}){return e.jsxs(de,{variant:i,children:[e.jsx(Re,{"aria-label":r,className:a,asChild:!0,id:l,children:e.jsx(M,{variant:w,size:"icon",children:o??e.jsx(x.MenuIcon,{})})}),e.jsx(Zt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,c])=>typeof p=="boolean"||typeof c=="boolean"?0:p.order-c.order).map(([p],c,u)=>e.jsxs(s.Fragment,{children:[e.jsx(rn,{children:e.jsx(De,{children:Jr(n.groups,n.items,p,t)})}),c<u.length-1&&e.jsx(pe,{})]},p))})]})}const Wr=s.forwardRef(({id:t,className:n,children:r},o)=>e.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${n}`,id:t,children:r}));function Gs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:o,id:a,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:p,menuButtonIcon:c}){return e.jsxs(Wr,{className:`tw-w-full tw-border ${i}`,id:a,children:[r&&e.jsx(ke,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??e.jsx(x.Menu,{}),buttonVariant:"ghost"}),w&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),l&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&e.jsx(ke,{onSelectMenuItem:n,menuData:o,tabLabel:"View Info",icon:e.jsx(x.EllipsisVertical,{}),className:"tw-h-full"}),p]})]})}function Bs({onSelectProjectMenuItem:t,projectMenuData:n,id:r,className:o,menuButtonIcon:a}){return e.jsx(Wr,{className:"tw-pointer-events-none",id:r,children:n&&e.jsx(ke,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const yn=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsx(st.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:o})});yn.displayName=st.List.displayName;const Nn=s.forwardRef(({className:t,...n},r)=>e.jsx(st.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Nn.displayName=st.List.displayName;const Zr=s.forwardRef(({className:t,...n},r)=>e.jsx(st.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),jn=s.forwardRef(({className:t,...n},r)=>e.jsx(st.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));jn.displayName=st.Content.displayName;function $s({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:i,id:w}){return e.jsxs("div",{id:w,className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?e.jsx("h1",{children:a}):"",e.jsx(Pe,{className:i,value:n,onSearch:r,placeholder:o})]}),e.jsxs(yn,{children:[e.jsx(Nn,{children:t.map(l=>e.jsx(Zr,{value:l.value,children:l.value},l.key))}),t.map(l=>e.jsx(jn,{value:l.value,children:l.content},l.key))]})]})}function Xs({...t}){return e.jsx(X.Menu,{...t})}function Ks({...t}){return e.jsx(X.Sub,{"data-slot":"menubar-sub",...t})}const Qr=s.forwardRef(({className:t,variant:n="default",...r},o)=>{const a=s.useMemo(()=>({variant:n}),[n]);return e.jsx(nn.Provider,{value:a,children:e.jsx(X.Root,{ref:o,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Qr.displayName=X.Root.displayName;const to=s.forwardRef(({className:t,...n},r)=>{const o=ct();return e.jsx(X.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",yt({variant:o.variant,className:t})),...n})});to.displayName=X.Trigger.displayName;const eo=s.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const i=ct();return e.jsxs(X.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",yt({variant:i.variant,className:t}),t),...o,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});eo.displayName=X.SubTrigger.displayName;const no=s.forwardRef(({className:t,...n},r)=>{const o=ct();return e.jsx(X.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...n})});no.displayName=X.SubContent.displayName;const ro=s.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:o=8,...a},i)=>{const w=ct();return e.jsx(X.Portal,{children:e.jsx(X.Content,{ref:i,align:n,alignOffset:r,sideOffset:o,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...a})})});ro.displayName=X.Content.displayName;const oo=s.forwardRef(({className:t,inset:n,...r},o)=>{const a=ct();return e.jsx(X.Item,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",yt({variant:a.variant,className:t}),t),...r})});oo.displayName=X.Item.displayName;const qs=s.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const i=ct();return e.jsxs(X.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",yt({variant:i.variant,className:t}),t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(X.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});qs.displayName=X.CheckboxItem.displayName;const Hs=s.forwardRef(({className:t,children:n,...r},o)=>{const a=ct();return e.jsxs(X.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",yt({variant:a.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(X.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});Hs.displayName=X.RadioItem.displayName;const Us=s.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(X.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Us.displayName=X.Label.displayName;const ao=s.forwardRef(({className:t,...n},r)=>e.jsx(X.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));ao.displayName=X.Separator.displayName;const ee=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},so=(t,n,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return a.flatMap(([i],w)=>{const l=n.filter(c=>c.group===i).sort((c,u)=>c.order-u.order).map(c=>e.jsxs(Ve,{children:[e.jsx(Oe,{asChild:!0,children:"command"in c?e.jsxs(oo,{onClick:()=>{o(c)},children:[c.iconPathBefore&&e.jsx(je,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&e.jsx(je,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):e.jsxs(Ks,{children:[e.jsx(eo,{children:c.label}),e.jsx(no,{children:so(t,n,Yr(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&e.jsx(fe,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),p=[...l];return l.length>0&&w<a.length-1&&p.push(e.jsx(ao,{},`separator-${i}`)),p})};function Ys({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:o}){const a=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),p=s.useRef(void 0),c=u=>{switch(u){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return p;default:return}};if(aa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,h)=>{var b,v,y,I;u.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(h.hotkey){case"alt":ee(i,[f]);break;case"alt+p":(b=i.current)==null||b.focus(),ee(i,[f,m]);break;case"alt+l":(v=w.current)==null||v.focus(),ee(w,[f,m]);break;case"alt+n":(y=l.current)==null||y.focus(),ee(l,[f,m]);break;case"alt+h":(I=p.current)==null||I.focus(),ee(p,[f,m]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const u=new MutationObserver(m=>{m.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const v=b.target.getAttribute("data-state");r(v==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(m=>{u.observe(m,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return e.jsx(Qr,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,h])=>typeof u=="boolean"||typeof h=="boolean"?0:u.order-h.order).map(([u,h])=>e.jsxs(Xs,{children:[e.jsx(to,{ref:c(u),children:typeof h=="object"&&"label"in h&&h.label}),e.jsx(ro,{className:"tw-z-[250]",children:e.jsx(De,{children:so(t.groups,t.items,u,n)})})]},u))})}function Js(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Ws({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:o,id:a,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:p,menubarVariant:c="default"}){const u=s.useRef(void 0);return e.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:a,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:p?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&e.jsx(Ys,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:c})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:i}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const Zs=(t,n)=>t[n]??n;function Qs({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:i,localizedStrings:w,className:l,id:p}){const c=Zs(w,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,h]=s.useState(!1),f=b=>{a&&a(b),o&&o([b,...r.filter(v=>v!==b)]),i&&r.find(v=>v===b)&&i([...r.filter(v=>v!==b)]),h(!1)},m=(b,v)=>{var I,N,_,z,V,P;const y=v!==b?((N=(I=t[b])==null?void 0:I.uiNames)==null?void 0:N[v])??((z=(_=t[b])==null?void 0:_.uiNames)==null?void 0:z.en):void 0;return y?`${(V=t[b])==null?void 0:V.autonym} (${y})`:(P=t[b])==null?void 0:P.autonym};return e.jsxs("div",{id:p,className:d("pr-twp tw-max-w-sm",l),children:[e.jsxs(At,{name:"uiLanguage",value:n,onValueChange:f,open:u,onOpenChange:b=>h(b),children:[e.jsx(Ct,{children:e.jsx(Lt,{})}),e.jsx(St,{className:"tw-z-[250]",children:Object.keys(t).map(b=>e.jsx(wt,{value:b,children:m(b,n)},b))})]}),n!=="en"&&e.jsx("div",{className:"tw-pt-3",children:e.jsx(Z,{className:"tw-font-normal tw-text-muted-foreground",children:g.formatReplacementString(c,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(b=>m(b,n)).join(", "):t.en.autonym})})})]})}function ti({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(Z,{children:n(t)}):r?e.jsx(Z,{children:r(t)}):e.jsx(Z,{children:t})}function ei({id:t,className:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:i,createComplexLabel:w}){return e.jsx("div",{id:t,className:n,children:r.map(l=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Me,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:p=>a(l,p)}),e.jsx(ti,{item:l,createLabel:i,createComplexLabel:w})]},l))})}function ni({cardKey:t,isSelected:n,onSelect:r,isDenied:o,isHidden:a=!1,className:i,children:w,dropdownContent:l,additionalSelectedContent:p,accentColor:c}){const u=h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),r())};return e.jsxs("div",{hidden:a,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":n,className:d("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!n},{"tw-bg-accent":n},{"tw-bg-transparent":!n},i),children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[e.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:w}),n&&l&&e.jsxs(de,{children:[e.jsx(Re,{className:d(c&&"tw-me-1"),asChild:!0,children:e.jsx(M,{className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(x.MoreHorizontal,{})})}),e.jsx(Zt,{align:"end",children:l})]})]}),n&&p&&e.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),c&&e.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`})]},t)}const io=s.forwardRef(({className:t,...n},r)=>e.jsx(x.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...n,ref:r}));io.displayName="Spinner";function ri({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:w,isRequired:l=!1,className:p,defaultValue:c,value:u,onChange:h,onFocus:f,onBlur:m}){return e.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[e.jsx(Z,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),e.jsx($t,{id:t,disabled:n,placeholder:w,required:l,className:d(p,{"tw-border-red-600":r}),defaultValue:c,value:u,onChange:h,onFocus:f,onBlur:m}),e.jsx("p",{className:d({"tw-hidden":!a}),children:a})]})}const oi=_t.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),wo=s.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,role:"alert",className:d("pr-twp",oi({variant:n}),t),...r}));wo.displayName="Alert";const lo=s.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));lo.displayName="AlertTitle";const co=s.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));co.displayName="AlertDescription";const ai=K.Root,si=K.Trigger,ii=K.Group,wi=K.Portal,li=K.Sub,ci=K.RadioGroup,po=s.forwardRef(({className:t,inset:n,children:r,...o},a)=>e.jsxs(K.SubTrigger,{ref:a,className:d("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",t),...o,children:[r,e.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));po.displayName=K.SubTrigger.displayName;const uo=s.forwardRef(({className:t,...n},r)=>e.jsx(K.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));uo.displayName=K.SubContent.displayName;const mo=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Portal,{children:e.jsx(K.Content,{ref:r,className:d("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n})}));mo.displayName=K.Content.displayName;const ho=s.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(K.Item,{ref:o,className:d("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t),...r}));ho.displayName=K.Item.displayName;const fo=s.forwardRef(({className:t,children:n,checked:r,...o},a)=>e.jsxs(K.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(K.ItemIndicator,{children:e.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n]}));fo.displayName=K.CheckboxItem.displayName;const go=s.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(K.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(K.ItemIndicator,{children:e.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]}));go.displayName=K.RadioItem.displayName;const bo=s.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(K.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",n&&"tw-pl-8",t),...r}));bo.displayName=K.Label.displayName;const xo=s.forwardRef(({className:t,...n},r)=>e.jsx(K.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...n}));xo.displayName=K.Separator.displayName;function vo({className:t,...n}){return e.jsx("span",{className:d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...n})}vo.displayName="ContextMenuShortcut";const yo=s.createContext({direction:"bottom"});function No({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const o=s.useMemo(()=>({direction:n}),[n]);return e.jsx(yo.Provider,{value:o,children:e.jsx(lt.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}No.displayName="Drawer";const di=lt.Drawer.Trigger,jo=lt.Drawer.Portal,pi=lt.Drawer.Close,kn=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));kn.displayName=lt.Drawer.Overlay.displayName;const ko=s.forwardRef(({className:t,children:n,hideDrawerHandle:r=!1,...o},a)=>{const{direction:i="bottom"}=s.useContext(yo),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(jo,{children:[e.jsx(kn,{}),e.jsxs(lt.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&e.jsx("div",{className:l[i]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),!r&&(i==="top"||i==="left")&&e.jsx("div",{className:l[i]})]})]})});ko.displayName="DrawerContent";function Co({className:t,...n}){return e.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}Co.displayName="DrawerHeader";function So({className:t,...n}){return e.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}So.displayName="DrawerFooter";const _o=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));_o.displayName=lt.Drawer.Title.displayName;const Ro=s.forwardRef(({className:t,...n},r)=>e.jsx(lt.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...n}));Ro.displayName=lt.Drawer.Description.displayName;const To=s.forwardRef(({className:t,value:n,...r},o)=>e.jsx(Xe.Root,{ref:o,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(Xe.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));To.displayName=Xe.Root.displayName;function ui({className:t,...n}){return e.jsx(He.PanelGroup,{className:d("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...n})}const mi=He.Panel;function hi({withHandle:t,className:n,...r}){return e.jsx(He.PanelResizeHandle,{className:d("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",n),...r,children:t&&e.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:e.jsx(x.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function fi({...t}){return e.jsx(zn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Eo=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsxs(ne.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:o,children:[e.jsx(ne.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(ne.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(ne.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Eo.displayName=ne.Root.displayName;const Mo=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsx(Ke.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(Ke.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Mo.displayName=Ke.Root.displayName;const gi=st.Root,Io=s.forwardRef(({className:t,...n},r)=>{const o=tt();return e.jsx(st.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:o})});Io.displayName=st.List.displayName;const Do=s.forwardRef(({className:t,...n},r)=>e.jsx(st.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));Do.displayName=st.Trigger.displayName;const Vo=s.forwardRef(({className:t,...n},r)=>e.jsx(st.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));Vo.displayName=st.Content.displayName;const Oo=s.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));Oo.displayName="Textarea";const bi=(t,n)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function xi(t){return{preserveValue:!0,...t}}const Po=(t,n,r={})=>{const o=s.useRef(n);o.current=n;const a=s.useRef(r);a.current=xi(a.current);const[i,w]=s.useState(()=>o.current),[l,p]=s.useState(!0);return s.useEffect(()=>{let c=!0;return p(!!t),(async()=>{if(t){const u=await t();c&&(w(()=>u),p(!1))}})(),()=>{c=!1,a.current.preserveValue||w(()=>o.current)}},[t]),[i,l]},Be=()=>!1,vi=(t,n)=>{const[r]=Po(s.useCallback(async()=>{if(!t)return Be;const o=await Promise.resolve(t(n));return async()=>o()},[n,t]),Be,{preserveValue:!1});s.useEffect(()=>()=>{r!==Be&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>zn.toast});exports.Alert=wo;exports.AlertDescription=co;exports.AlertTitle=lo;exports.Avatar=tn;exports.AvatarFallback=en;exports.AvatarImage=dr;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Oa;exports.BOOK_SELECTOR_STRING_KEYS=La;exports.Badge=qt;exports.BookChapterControl=Va;exports.BookSelectionMode=rr;exports.BookSelector=za;exports.Button=M;exports.Card=_e;exports.CardContent=Qe;exports.CardDescription=ir;exports.CardFooter=wr;exports.CardHeader=ar;exports.CardTitle=sr;exports.ChapterRangeSelector=nr;exports.Checkbox=Me;exports.Checklist=ei;exports.ComboBox=be;exports.Command=zt;exports.CommandEmpty=le;exports.CommandGroup=kt;exports.CommandInput=Jt;exports.CommandItem=Rt;exports.CommandList=Ft;exports.CommentList=Xa;exports.ContextMenu=ai;exports.ContextMenuCheckboxItem=fo;exports.ContextMenuContent=mo;exports.ContextMenuGroup=ii;exports.ContextMenuItem=ho;exports.ContextMenuLabel=bo;exports.ContextMenuPortal=wi;exports.ContextMenuRadioGroup=ci;exports.ContextMenuRadioItem=go;exports.ContextMenuSeparator=xo;exports.ContextMenuShortcut=vo;exports.ContextMenuSub=li;exports.ContextMenuSubContent=uo;exports.ContextMenuSubTrigger=po;exports.ContextMenuTrigger=si;exports.DataTable=Nr;exports.Drawer=No;exports.DrawerClose=pi;exports.DrawerContent=ko;exports.DrawerDescription=Ro;exports.DrawerFooter=So;exports.DrawerHeader=Co;exports.DrawerOverlay=kn;exports.DrawerPortal=jo;exports.DrawerTitle=_o;exports.DrawerTrigger=di;exports.DropdownMenu=de;exports.DropdownMenuCheckboxItem=Te;exports.DropdownMenuContent=Zt;exports.DropdownMenuGroup=rn;exports.DropdownMenuItem=sn;exports.DropdownMenuItemType=Cr;exports.DropdownMenuLabel=Ee;exports.DropdownMenuPortal=pr;exports.DropdownMenuRadioGroup=mr;exports.DropdownMenuRadioItem=wn;exports.DropdownMenuSeparator=pe;exports.DropdownMenuShortcut=hr;exports.DropdownMenuSub=ur;exports.DropdownMenuSubContent=an;exports.DropdownMenuSubTrigger=on;exports.DropdownMenuTrigger=Re;exports.ERROR_DUMP_STRING_KEYS=jr;exports.ERROR_POPOVER_STRING_KEYS=Wa;exports.ErrorDump=kr;exports.ErrorPopover=Za;exports.Filter=rs;exports.FilterDropdown=Qa;exports.Footer=ns;exports.FootnoteItem=Rr;exports.FootnoteList=is;exports.INVENTORY_STRING_KEYS=gs;exports.Input=$t;exports.Inventory=vs;exports.Label=Z;exports.MarkdownRenderer=cr;exports.MoreInfo=ts;exports.MultiSelectComboBox=Sr;exports.NavigationContentSearch=$s;exports.Popover=Gt;exports.PopoverContent=Tt;exports.PopoverTrigger=Bt;exports.Progress=To;exports.RadioGroup=Se;exports.RadioGroupItem=se;exports.RecentSearches=er;exports.ResizableHandle=hi;exports.ResizablePanel=mi;exports.ResizablePanelGroup=ui;exports.ResultsCard=ni;exports.SCOPE_SELECTOR_STRING_KEYS=Os;exports.ScopeSelector=Ps;exports.ScriptureResultsViewer=Is;exports.ScrollGroupSelector=As;exports.SearchBar=Pe;exports.Select=At;exports.SelectContent=St;exports.SelectGroup=fr;exports.SelectItem=wt;exports.SelectLabel=br;exports.SelectScrollDownButton=cn;exports.SelectScrollUpButton=ln;exports.SelectSeparator=xr;exports.SelectTrigger=Ct;exports.SelectValue=Lt;exports.Separator=ce;exports.SettingsList=Ls;exports.SettingsListHeader=Fs;exports.SettingsListItem=zs;exports.SettingsSidebar=qr;exports.SettingsSidebarContentSearch=ks;exports.Sidebar=mn;exports.SidebarContent=fn;exports.SidebarFooter=Ar;exports.SidebarGroup=ve;exports.SidebarGroupAction=zr;exports.SidebarGroupContent=Ne;exports.SidebarGroupLabel=ye;exports.SidebarHeader=Pr;exports.SidebarInput=Or;exports.SidebarInset=hn;exports.SidebarMenu=gn;exports.SidebarMenuAction=Fr;exports.SidebarMenuBadge=Gr;exports.SidebarMenuButton=xn;exports.SidebarMenuItem=bn;exports.SidebarMenuSkeleton=Br;exports.SidebarMenuSub=$r;exports.SidebarMenuSubButton=Kr;exports.SidebarMenuSubItem=Xr;exports.SidebarProvider=un;exports.SidebarRail=Vr;exports.SidebarSeparator=Lr;exports.SidebarTrigger=Dr;exports.Skeleton=xe;exports.Slider=Eo;exports.Sonner=fi;exports.Spinner=io;exports.Switch=Mo;exports.TabDropdownMenu=ke;exports.TabFloatingMenu=Bs;exports.TabToolbar=Gs;exports.Table=ue;exports.TableBody=he;exports.TableCaption=yr;exports.TableCell=jt;exports.TableFooter=vr;exports.TableHead=Ht;exports.TableHeader=me;exports.TableRow=ft;exports.Tabs=gi;exports.TabsContent=Vo;exports.TabsList=Io;exports.TabsTrigger=Do;exports.TextField=ri;exports.Textarea=Oo;exports.ToggleGroup=pn;exports.ToggleGroupItem=re;exports.Toolbar=Ws;exports.Tooltip=Ve;exports.TooltipContent=fe;exports.TooltipProvider=De;exports.TooltipTrigger=Oe;exports.UiLanguageSelector=Qs;exports.VerticalTabs=yn;exports.VerticalTabsContent=jn;exports.VerticalTabsList=Nn;exports.VerticalTabsTrigger=Zr;exports.badgeVariants=lr;exports.buttonVariants=tr;exports.cn=d;exports.getBookIdFromUSFM=fs;exports.getLinesFromUSFM=ms;exports.getNumberFromUSFM=hs;exports.getStatusForItem=Mr;exports.getToolbarOSReservedSpaceClassName=Js;exports.inventoryCountColumn=ps;exports.inventoryItemColumn=cs;exports.inventoryStatusColumn=us;exports.selectTriggerVariants=gr;exports.useEvent=bi;exports.useEventAsync=vi;exports.useListbox=or;exports.usePromise=Po;exports.useRecentSearches=Ea;exports.useSidebar=ge;function yi(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),n==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}yi(`*, ::before, ::after {
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
.tw-max-w-screen-md {
  max-width: 768px;
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
.tw-bg-slate-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(248 250 252 / var(--tw-bg-opacity, 1));
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
