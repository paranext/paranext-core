"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),s=require("react"),ot=require("cmdk"),x=require("lucide-react"),Po=require("clsx"),Lo=require("tailwind-merge"),Ao=require("@radix-ui/react-dialog"),h=require("platform-bible-utils"),Xt=require("@radix-ui/react-slot"),St=require("class-variance-authority"),Go=require("@radix-ui/react-popover"),zo=require("@radix-ui/react-label"),Bo=require("@radix-ui/react-radio-group"),tt=require("@tanstack/react-table"),En=require("@radix-ui/react-dropdown-menu"),Fo=require("@radix-ui/react-select"),$o=require("markdown-to-jsx"),Xo=require("@radix-ui/react-checkbox"),Ko=require("@radix-ui/react-toggle-group"),Ho=require("@radix-ui/react-toggle"),qo=require("@radix-ui/react-separator"),Uo=require("@radix-ui/react-tooltip"),Yo=require("@radix-ui/react-tabs"),Jo=require("@radix-ui/react-menubar"),Wo=require("react-hotkeys-hook"),Zo=require("@radix-ui/react-avatar"),Qo=require("@radix-ui/react-context-menu"),dt=require("vaul"),ta=require("@radix-ui/react-progress"),Dn=require("sonner"),ea=require("@radix-ui/react-slider"),na=require("@radix-ui/react-switch");function J(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const ft=J(Ao),te=J(Go),In=J(zo),ee=J(Bo),G=J(En),F=J(Fo),Ae=J(Xo),ve=J(Ko),Vn=J(Ho),On=J(qo),ae=J(Uo),at=J(Yo),z=J(Jo),Kt=J(Zo),B=J(Qo),Ge=J(ta),Zt=J(ea),ze=J(na),ra=Lo.extendTailwindMerge({prefix:"tw-"});function d(...t){return ra(Po.clsx(t))}const oa="layoutDirection";function W(){const t=localStorage.getItem(oa);return t==="rtl"?t:"ltr"}const aa=ft.Portal,Pn=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Pn.displayName=ft.Overlay.displayName;const sa=s.forwardRef(({className:t,children:e,...r},o)=>{const a=W();return n.jsxs(aa,{children:[n.jsx(Pn,{}),n.jsxs(ft.Content,{ref:o,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[e,n.jsxs(ft.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});sa.displayName=ft.Content.displayName;const ia=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ia.displayName=ft.Title.displayName;const wa=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));wa.displayName=ft.Description.displayName;const At=s.forwardRef(({className:t,...e},r)=>n.jsx(ot.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));At.displayName=ot.Command.displayName;const Ht=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(x.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(ot.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Ht.displayName=ot.Command.Input.displayName;const Gt=s.forwardRef(({className:t,...e},r)=>n.jsx(ot.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Gt.displayName=ot.Command.List.displayName;const se=s.forwardRef((t,e)=>n.jsx(ot.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));se.displayName=ot.Command.Empty.displayName;const jt=s.forwardRef(({className:t,...e},r)=>n.jsx(ot.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));jt.displayName=ot.Command.Group.displayName;const Ln=s.forwardRef(({className:t,...e},r)=>n.jsx(ot.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Ln.displayName=ot.Command.Separator.displayName;const _t=s.forwardRef(({className:t,...e},r)=>n.jsx(ot.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));_t.displayName=ot.Command.Item.displayName;var la=Object.defineProperty,ca=(t,e,r)=>e in t?la(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,E=(t,e,r)=>ca(t,typeof e!="symbol"?e+"":e,r);const Vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],$e=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],An=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],jn=va();function qt(t,e=!0){return e&&(t=t.toUpperCase()),t in jn?jn[t]:0}function Xe(t){return qt(t)>0}function da(t){const e=typeof t=="string"?qt(t):t;return e>=40&&e<=66}function pa(t){return(typeof t=="string"?qt(t):t)<=39}function Gn(t){return t<=66}function ua(t){const e=typeof t=="string"?qt(t):t;return Fn(e)&&!Gn(e)}function*ma(){for(let t=1;t<=Vt.length;t++)yield t}const ha=1,zn=Vt.length;function fa(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ke(t,e="***"){const r=t-1;return r<0||r>=Vt.length?e:Vt[r]}function Bn(t){return t<=0||t>zn?"******":An[t-1]}function ga(t){return Bn(qt(t))}function Fn(t){const e=typeof t=="number"?Ke(t):t;return Xe(e)&&!$e.includes(e)}function ba(t){const e=typeof t=="number"?Ke(t):t;return Xe(e)&&$e.includes(e)}function xa(t){return An[t-1].includes("*obsolete*")}function va(){const t={};for(let e=0;e<Vt.length;e++)t[Vt[e]]=e+1;return t}const P={allBookIds:Vt,nonCanonicalIds:$e,bookIdToNumber:qt,isBookIdValid:Xe,isBookNT:da,isBookOT:pa,isBookOTNT:Gn,isBookDC:ua,allBookNumbers:ma,firstBook:ha,lastBook:zn,extraBooks:fa,bookNumberToId:Ke,bookNumberToEnglishName:Bn,bookIdToEnglishName:ga,isCanonical:Fn,isExtraMaterial:ba,isObsolete:xa};var mt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(mt||{});const wt=class{constructor(e){if(E(this,"name"),E(this,"fullPath"),E(this,"isPresent"),E(this,"hasVerseSegments"),E(this,"isCustomized"),E(this,"baseVersification"),E(this,"scriptureBooks"),E(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=mt[e]):(this._type=e,this.name=mt[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};E(wt,"Original",new wt(mt.Original)),E(wt,"Septuagint",new wt(mt.Septuagint)),E(wt,"Vulgate",new wt(mt.Vulgate)),E(wt,"English",new wt(mt.English)),E(wt,"RussianProtestant",new wt(mt.RussianProtestant)),E(wt,"RussianOrthodox",new wt(mt.RussianOrthodox));let Et=wt;function kn(t,e){const r=e[0];for(let o=1;o<e.length;o++)t=t.split(e[o]).join(r);return t.split(r)}var $n=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))($n||{});const rt=class I{constructor(e,r,o,a){if(E(this,"firstChapter"),E(this,"lastChapter"),E(this,"lastVerse"),E(this,"hasSegmentsDefined"),E(this,"text"),E(this,"BBBCCCVVVS"),E(this,"longHashCode"),E(this,"versification"),E(this,"rtlMark","‏"),E(this,"_bookNum",0),E(this,"_chapterNum",0),E(this,"_verseNum",0),E(this,"_verse"),o==null&&a==null)if(e!=null&&typeof e=="string"){const i=e,w=r!=null&&r instanceof Et?r:void 0;this.setEmpty(w),this.parse(i)}else if(e!=null&&typeof e=="number"){const i=r!=null&&r instanceof Et?r:void 0;this.setEmpty(i),this._verseNum=e%I.chapterDigitShifter,this._chapterNum=Math.floor(e%I.bookDigitShifter/I.chapterDigitShifter),this._bookNum=Math.floor(e/I.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof I){const i=e;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(e==null)return;const i=e instanceof Et?e:I.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&o!=null)if(typeof e=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(e,r,o);else if(typeof e=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=o,this.versification=a??I.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=new I(e),{success:!0,verseRef:r}}catch(o){if(o instanceof Jt)return r=new I,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(e,r,o){return e%I.bcvMaxValue*I.bookDigitShifter+(r>=0?r%I.bcvMaxValue*I.chapterDigitShifter:0)+(o>=0?o%I.bcvMaxValue:0)}static fromJSON(e){const{book:r,chapterNum:o,verseNum:a,verse:i,versificationStr:w}=e,l=i||a.toString();let u;return w&&(u=new Et(w)),r?new I(r,o.toString(),l,u):new I}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<e.length;a++){if(o=e[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>I.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(I.verseRangeSeparator)||this._verse.includes(I.verseSequenceIndicator))}get book(){return P.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=P.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:o}=I.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=I.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>P.lastBook)throw new Jt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new Et(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(I.verseRangeSeparators,I.verseSequenceIndicators)}get BBBCCC(){return I.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return I.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const i=e.split("/");if(e=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Et(mt[w])}catch{throw new Jt("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new Jt("Invalid reference : "+e);const o=r[1].split(":"),a=+o[0];if(o.length!==2||P.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!I.isVerseParseable(o[1]))throw new Jt("Invalid reference : "+e);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new I(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete r.verse,r}equals(e){return e instanceof I?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,r=I.verseRangeSeparators,o=I.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],i=kn(this._verse,o);for(const w of i.map(l=>kn(l,r))){const l=this.clone();l.verse=w[0];const u=l.verseNum;if(a.push(l),w.length>1){const c=this.clone();if(c.verse=w[1],!e)for(let p=u+1;p<c.verseNum;p++){const g=new I(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||a.push(g)}a.push(c)}}return a}validateVerse(e,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,e,r)){const i=a.internalValid;if(i!==0)return i;const w=a.BBBCCCVVV;if(o>w)return 3;if(o===w)return 4;o=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>P.lastBook?2:(P.isCanonical(this._bookNum),0)}setEmpty(e=I.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,o){this.bookNum=P.bookIdToNumber(e),this.chapter=r,this.verse=o}};E(rt,"defaultVersification",Et.English),E(rt,"verseRangeSeparator","-"),E(rt,"verseSequenceIndicator",","),E(rt,"verseRangeSeparators",[rt.verseRangeSeparator]),E(rt,"verseSequenceIndicators",[rt.verseSequenceIndicator]),E(rt,"chapterDigitShifter",1e3),E(rt,"bookDigitShifter",rt.chapterDigitShifter*rt.chapterDigitShifter),E(rt,"bcvMaxValue",rt.chapterDigitShifter-1),E(rt,"ValidStatusType",$n);class Jt extends Error{}const Xn=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"Old Testament";case h.Section.NT:return r??"New Testament";case h.Section.DC:return o??"Deuterocanon";case h.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ya=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"OT";case h.Section.NT:return r??"NT";case h.Section.DC:return o??"DC";case h.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ft(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??P.bookIdToEnglishName(t)}function He(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Kn=P.allBookIds.filter(t=>!P.isObsolete(P.bookIdToNumber(t))),It=Object.fromEntries(Kn.map(t=>[t,P.bookIdToEnglishName(t)]));function qe(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const a=P.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(h.includes(a.toLowerCase(),o)||h.includes(t.toLowerCase(),o)||(i?h.includes(i.localizedName.toLowerCase(),o)||h.includes(i.localizedId.toLowerCase(),o):!1))}const Hn=s.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:a,className:i,showCheck:w=!1,localizedBookNames:l,commandValue:u},c)=>{const p=s.useRef(!1),g=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},m=N=>{p.current=!0,o?o(N):r==null||r(t)},f=s.useMemo(()=>Ft(t,l),[t,l]),b=s.useMemo(()=>He(t,l),[t,l]);return n.jsx("div",{className:d("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===h.Section.OT,"tw-border-s-purple-200":a===h.Section.NT,"tw-border-s-indigo-200":a===h.Section.DC,"tw-border-s-amber-200":a===h.Section.Extra}),children:n.jsxs(_t,{ref:c,value:u||`${t} ${P.bookIdToEnglishName(t)}`,onSelect:g,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${P.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[w&&n.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:f}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),qn=St.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),D=s.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...a},i)=>{const w=o?Xt.Slot:"button";return n.jsx(w,{className:d(qn({variant:e,size:r,className:t})),ref:i,...a})});D.displayName="Button";const zt=te.Root,Bt=te.Trigger,Rt=s.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},a)=>{const i=W();return n.jsx(te.Portal,{children:n.jsx(te.Content,{ref:a,align:e,sideOffset:r,className:d("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Rt.displayName=te.Content.displayName;function Be(t,e,r){return`${t} ${It[t]}${e?` ${He(t,e)} ${Ft(t,e)}`:""}${r?` ${r}`:""}`}function Un({recentSearches:t,onSearchItemSelect:e,renderItem:r=l=>String(l),getItemKey:o=l=>String(l),ariaLabel:a="Show recent searches",groupHeading:i="Recent",id:w}){const[l,u]=s.useState(!1);if(t.length===0)return;const c=p=>{e(p),u(!1)};return n.jsxs(zt,{open:l,onOpenChange:u,children:[n.jsx(Bt,{asChild:!0,children:n.jsx(D,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:n.jsx(x.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Rt,{id:w,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(At,{children:n.jsx(Gt,{children:n.jsx(jt,{heading:i,children:t.map(p=>n.jsxs(_t,{onSelect:()=>c(p),className:"tw-flex tw-items-center",children:[n.jsx(x.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function Na(t,e,r=(a,i)=>a===i,o=15){return a=>{const i=t.filter(l=>!r(l,a)),w=[a,...i.slice(0,o-1)];e(w)}}const De={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ja=[De.BOOK_ONLY,De.BOOK_CHAPTER,De.BOOK_CHAPTER_VERSE];function Cn(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function ht(t){return h.getChaptersForBook(P.bookIdToNumber(t))}function ka(t,e,r){if(!t.trim()||e.length===0)return;const o=ja.reduce((a,i)=>{if(a)return a;const w=i.exec(t.trim());if(w){const[l,u=void 0,c=void 0]=w.slice(1);let p;const g=e.filter(m=>qe(m,l,r));if(g.length===1&&([p]=g),!p&&u){if(P.isBookIdValid(l)){const m=l.toUpperCase();e.includes(m)&&(p=m)}if(!p&&r){const m=Array.from(r.entries()).find(([,f])=>f.localizedId.toLowerCase()===l.toLowerCase());m&&e.includes(m[0])&&([p]=m)}}if(!p&&u){const f=(b=>Object.keys(It).find(N=>It[N].toLowerCase()===b.toLowerCase()))(l);if(f&&e.includes(f)&&(p=f),!p&&r){const b=Array.from(r.entries()).find(([,N])=>N.localizedName.toLowerCase()===l.toLowerCase());b&&e.includes(b[0])&&([p]=b)}}if(p){let m=u?parseInt(u,10):void 0;m&&m>ht(p)&&(m=Math.max(ht(p),1));const f=c?parseInt(c,10):void 0;return{book:p,chapterNum:m,verseNum:f}}}},void 0);if(o)return o}function Ca(t,e,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const u=e.indexOf(t.book);if(u>0){const c=e[u-1],p=Math.max(ht(c),1);o({book:c,chapterNum:p,verseNum:1})}}},[t,e,o]),i=s.useCallback(()=>{const u=ht(t.book);if(t.chapterNum<u)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=e.indexOf(t.book);if(c<e.length-1){const p=e[c+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),w=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?x.ChevronsLeft:x.ChevronsRight},{onClick:w,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?x.ChevronLeft:x.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?x.ChevronRight:x.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===ht(t.book)||ht(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?x.ChevronsRight:x.ChevronsLeft}],[t,e,r,a,w,l,i])}function Sn({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:i}){if(t)return n.jsx(jt,{children:n.jsx("div",{className:d("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:ht(t)},(w,l)=>l+1).map(w=>n.jsx(_t,{value:`${t} ${It[t]||""} ${w}`,onSelect:()=>r(w),ref:o(w),className:d("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&w===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(w))??!1}),children:w},w))})})}function Sa({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:i,recentSearches:w,onAddRecentSearch:l,id:u}){const c=W(),[p,g]=s.useState(!1),[m,f]=s.useState(""),[b,N]=s.useState(""),[y,_]=s.useState("books"),[j,C]=s.useState(void 0),[L,U]=s.useState(!1),A=s.useRef(void 0),et=s.useRef(void 0),ct=s.useRef(void 0),S=s.useRef(void 0),M=s.useRef({}),$=s.useCallback(v=>{e(v),l&&l(v)},[e,l]),V=s.useMemo(()=>o?o():Kn,[o]),st=s.useMemo(()=>({[h.Section.OT]:V.filter(O=>P.isBookOT(O)),[h.Section.NT]:V.filter(O=>P.isBookNT(O)),[h.Section.DC]:V.filter(O=>P.isBookDC(O)),[h.Section.Extra]:V.filter(O=>P.extraBooks().includes(O))}),[V]),R=s.useMemo(()=>Object.values(st).flat(),[st]),Z=s.useMemo(()=>{if(!b.trim())return st;const v={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return[h.Section.OT,h.Section.NT,h.Section.DC,h.Section.Extra].forEach(H=>{v[H]=st[H].filter(Q=>qe(Q,b,a))}),v},[st,b,a]),k=s.useMemo(()=>ka(b,R,a),[b,R,a]),X=s.useCallback(()=>{k&&($({book:k.book,chapterNum:k.chapterNum??1,verseNum:k.verseNum??1}),g(!1),N(""),f(""))},[$,k]),ut=s.useCallback(v=>{if(ht(v)<=1){$({book:v,chapterNum:1,verseNum:1}),g(!1),N("");return}C(v),_("chapters")},[$]),T=s.useCallback(v=>{const O=y==="chapters"?j:k==null?void 0:k.book;O&&($({book:O,chapterNum:v,verseNum:1}),g(!1),_("books"),C(void 0),N(""))},[$,y,j,k]),Y=s.useCallback(v=>{$(v),g(!1),N("")},[$]),K=Ca(t,R,c,e),it=s.useCallback(()=>{_("books"),C(void 0),setTimeout(()=>{et.current&&et.current.focus()},0)},[]),yt=s.useCallback(v=>{if(!v&&y==="chapters"){it();return}g(v),v&&(_("books"),C(void 0),N(""))},[y,it]),{otLong:gn,ntLong:bn,dcLong:xn,extraLong:vn}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Mo=s.useCallback(v=>Xn(v,gn,bn,xn,vn),[gn,bn,xn,vn]),Eo=s.useCallback(v=>k?!!k.chapterNum&&!v.toString().includes(k.chapterNum.toString()):!1,[k]),Do=s.useMemo(()=>h.formatScrRef(t,a?Ft(t.book,a):"English"),[t,a]),yn=s.useCallback(v=>O=>{M.current[v]=O},[]),Io=s.useCallback(v=>{(v.key==="Home"||v.key==="End")&&v.stopPropagation()},[]),Vo=s.useCallback(v=>{if(v.ctrlKey)return;const{isLetter:O,isDigit:H}=Cn(v.key);if(y==="chapters"){if(v.key==="Backspace"){v.preventDefault(),v.stopPropagation(),it();return}if(O||H){if(v.preventDefault(),v.stopPropagation(),_("books"),C(void 0),H&&j){const Q=It[j];N(`${Q} ${v.key}`)}else N(v.key);setTimeout(()=>{et.current&&et.current.focus()},0);return}}if((y==="chapters"||y==="books"&&k)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(v.key)){const Q=y==="chapters"?j:k==null?void 0:k.book;if(!Q)return;const nt=(()=>{if(!m)return 1;const Yt=m.match(/(\d+)$/);return Yt?parseInt(Yt[1],10):0})(),Tt=ht(Q);if(!Tt)return;let gt=nt;const Nn=6;switch(v.key){case"ArrowLeft":nt!==0&&(gt=nt>1?nt-1:Tt);break;case"ArrowRight":nt!==0&&(gt=nt<Tt?nt+1:1);break;case"ArrowUp":gt=nt===0?Tt:Math.max(1,nt-Nn);break;case"ArrowDown":gt=nt===0?1:Math.min(Tt,nt+Nn);break;default:return}gt!==nt&&(v.preventDefault(),v.stopPropagation(),f(Be(Q,a,gt)),setTimeout(()=>{const Yt=M.current[gt];Yt&&Yt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[y,k,it,j,m,a]),Oo=s.useCallback(v=>{if(v.shiftKey||v.key==="Tab"||v.key===" ")return;const{isLetter:O,isDigit:H}=Cn(v.key);(O||H)&&(v.preventDefault(),N(Q=>Q+v.key),et.current.focus(),U(!1))},[]);return s.useLayoutEffect(()=>{const v=setTimeout(()=>{if(p&&y==="books"&&ct.current&&S.current){const O=ct.current,H=S.current,Q=H.offsetTop,nt=O.clientHeight,Tt=H.clientHeight,gt=Q-nt/2+Tt/2;O.scrollTo({top:Math.max(0,gt),behavior:"smooth"}),f(Be(t.book))}},0);return()=>{clearTimeout(v)}},[p,y,b,k,t.book]),s.useLayoutEffect(()=>{if(y==="chapters"&&j){const v=j===t.book;setTimeout(()=>{if(ct.current)if(v){const O=M.current[t.chapterNum];O&&O.scrollIntoView({block:"center",behavior:"smooth"})}else ct.current.scrollTo({top:0});A.current&&A.current.focus()},0)}},[y,j,k,t.book,t.chapterNum]),n.jsxs(zt,{open:p,onOpenChange:yt,children:[n.jsx(Bt,{asChild:!0,children:n.jsx(D,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:d("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Do})})}),n.jsx(Rt,{id:u,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(At,{ref:A,onKeyDown:Vo,loop:!0,value:m,onValueChange:f,shouldFilter:!1,children:[y==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Ht,{ref:et,value:b,onValueChange:N,onKeyDown:Io,onFocus:()=>U(!1),className:w&&w.length>0?"!tw-pr-10":""}),w&&w.length>0&&n.jsx(Un,{recentSearches:w,onSearchItemSelect:Y,renderItem:v=>h.formatScrRef(v,"English"),getItemKey:v=>`${v.book}-${v.chapterNum}-${v.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:K.map(({onClick:v,disabled:O,title:H,icon:Q})=>n.jsx(D,{variant:"ghost",size:"sm",onClick:()=>{U(!0),v()},disabled:O,className:"tw-h-10 tw-w-4 tw-p-0",title:H,onKeyDown:Oo,children:n.jsx(Q,{})},H))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(D,{variant:"ghost",size:"sm",onClick:it,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:c==="ltr"?n.jsx(x.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(x.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ft(j,a)})]}),!L&&n.jsxs(Gt,{ref:ct,children:[y==="books"&&n.jsxs(n.Fragment,{children:[!k&&Object.entries(Z).map(([v,O])=>{if(O.length!==0)return n.jsx(jt,{heading:Mo(v),children:O.map(H=>n.jsx(Hn,{bookId:H,onSelect:Q=>ut(Q),section:h.getSectionForBook(H),commandValue:`${H} ${It[H]}`,ref:H===t.book?S:void 0,localizedBookNames:a},H))},v)}),k&&n.jsx(jt,{children:n.jsx(_t,{value:`${k.book} ${It[k.book]} ${k.chapterNum||""}:${k.verseNum||""})}`,onSelect:X,className:"tw-font-semibold tw-text-primary",children:h.formatScrRef({book:k.book,chapterNum:k.chapterNum??1,verseNum:k.verseNum??1},a?He(k.book,a):void 0)},"top-match")}),k&&ht(k.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ft(k.book,a)}),n.jsx(Sn,{bookId:k.book,scrRef:t,onChapterSelect:T,setChapterRef:yn,isChapterDimmed:Eo,className:"tw-px-4 tw-pb-4"})]})]}),y==="chapters"&&j&&n.jsx(Sn,{bookId:j,scrRef:t,onChapterSelect:T,setChapterRef:yn,className:"tw-p-4"})]})]})})]})}const _a=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ra=St.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),q=s.forwardRef(({className:t,...e},r)=>n.jsx(In.Root,{ref:r,className:d("pr-twp",Ra(),t),...e}));q.displayName=In.Root.displayName;const ye=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsx(ee.Root,{className:d("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});ye.displayName=ee.Root.displayName;const ne=s.forwardRef(({className:t,...e},r)=>n.jsx(ee.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(ee.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(x.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ne.displayName=ee.Item.displayName;function Ta(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function me({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:a,value:i,onChange:w=()=>{},getOptionLabel:l=Ta,icon:u=void 0,buttonPlaceholder:c="",textPlaceholder:p="",commandEmptyMessage:g="No option found",buttonVariant:m="outline",alignDropDown:f="start",isDisabled:b=!1,...N}){const[y,_]=s.useState(!1);return n.jsxs(zt,{open:y,onOpenChange:_,...N,children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(D,{variant:m,role:"combobox","aria-expanded":y,id:t,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-pe-2",children:u}),n.jsx("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):c})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Rt,{align:f,className:d("tw-w-[200px] tw-p-0",a),children:n.jsxs(At,{children:[n.jsx(Ht,{placeholder:p,className:"tw-text-inherit"}),n.jsx(se,{children:g}),n.jsx(Gt,{children:e.map(j=>n.jsxs(_t,{value:l(j),onSelect:()=>{w(j),_(!1)},children:[n.jsx(x.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(j)})}),l(j)]},l(j)))})]})})]})}function Yn({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(c,p)=>p+1),[i]),l=c=>{r(c),c>e&&o(c)},u=c=>{o(c),c<t&&r(c)};return n.jsxs(n.Fragment,{children:[n.jsx(q,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(me,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:t},"start chapter"),n.jsx(q,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(me,{isDisabled:a,onChange:u,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:c=>c.toString(),value:e},"end chapter")]})}var Jn=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Jn||{});const Ma=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Ie=(t,e)=>t[e]??e;function Ea({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:u,localizedStrings:c}){const p=Ie(c,"%webView_bookSelector_currentBook%"),g=Ie(c,"%webView_bookSelector_choose%"),m=Ie(c,"%webView_bookSelector_chooseBooks%"),[f,b]=s.useState("current book"),N=y=>{b(y),t(y)};return n.jsx(ye,{className:"pr-twp tw-flex",value:f,onValueChange:y=>N(y),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ne,{value:"current book"}),n.jsx(q,{className:"tw-ms-1",children:p})]}),n.jsx(q,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Yn,{isDisabled:f==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:w,chapterCount:a,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ne,{value:"choose books"}),n.jsx(q,{className:"tw-ms-1",children:m})]}),n.jsx(q,{className:"tw-flex tw-items-center",children:o.map(y=>P.bookIdToEnglishName(y)).join(", ")}),n.jsx(D,{disabled:f==="current book",onClick:()=>r(),children:g})]})]})})}const Ue=s.createContext(void 0);function pt(){const t=s.useContext(Ue);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const vt=St.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ye=G.Trigger,Je=G.Group,Wn=G.Portal,Zn=G.Sub,Qn=G.RadioGroup;function Ne({variant:t="default",...e}){const r=s.useMemo(()=>({variant:t}),[t]);return n.jsx(Ue.Provider,{value:r,children:n.jsx(G.Root,{...e})})}const We=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=pt();return n.jsxs(G.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,vt({variant:i.variant})),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});We.displayName=G.SubTrigger.displayName;const Ze=s.forwardRef(({className:t,...e},r)=>n.jsx(G.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Ze.displayName=G.SubContent.displayName;const ie=s.forwardRef(({className:t,sideOffset:e=4,children:r,...o},a)=>{const i=W();return n.jsx(G.Portal,{children:n.jsx(G.Content,{ref:a,sideOffset:e,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});ie.displayName=G.Content.displayName;const Qe=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=W(),i=pt();return n.jsx(G.Item,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,vt({variant:i.variant})),...r,dir:a})});Qe.displayName=G.Item.displayName;const je=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=pt();return n.jsxs(G.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,vt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(G.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});je.displayName=G.CheckboxItem.displayName;const tn=s.forwardRef(({className:t,children:e,...r},o)=>{const a=pt();return n.jsxs(G.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,vt({variant:a.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(G.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});tn.displayName=G.RadioItem.displayName;const ke=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(G.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));ke.displayName=G.Label.displayName;const we=s.forwardRef(({className:t,...e},r)=>n.jsx(G.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));we.displayName=G.Separator.displayName;function tr({className:t,...e}){return n.jsx("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}tr.displayName="DropdownMenuShortcut";function Da({table:t}){return n.jsxs(Ne,{children:[n.jsx(En.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(D,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(x.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(ie,{align:"end",className:"tw-w-[150px]",children:[n.jsx(ke,{children:"Toggle columns"}),n.jsx(we,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(je,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const Ot=F.Root,er=F.Group,Pt=F.Value,nr=St.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),kt=s.forwardRef(({className:t,children:e,size:r,...o},a)=>{const i=W();return n.jsxs(F.Trigger,{className:d(nr({size:r,className:t})),ref:a,...o,dir:i,children:[e,n.jsx(F.Icon,{asChild:!0,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});kt.displayName=F.Trigger.displayName;const en=s.forwardRef(({className:t,...e},r)=>n.jsx(F.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronUp,{className:"tw-h-4 tw-w-4"})}));en.displayName=F.ScrollUpButton.displayName;const nn=s.forwardRef(({className:t,...e},r)=>n.jsx(F.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(x.ChevronDown,{className:"tw-h-4 tw-w-4"})}));nn.displayName=F.ScrollDownButton.displayName;const Ct=s.forwardRef(({className:t,children:e,position:r="popper",...o},a)=>{const i=W();return n.jsx(F.Portal,{children:n.jsxs(F.Content,{ref:a,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(en,{}),n.jsx(F.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(nn,{})]})})});Ct.displayName=F.Content.displayName;const rr=s.forwardRef(({className:t,...e},r)=>n.jsx(F.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));rr.displayName=F.Label.displayName;const lt=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(F.Item,{ref:o,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(F.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(F.ItemText,{children:e})]}));lt.displayName=F.Item.displayName;const or=s.forwardRef(({className:t,...e},r)=>n.jsx(F.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));or.displayName=F.Separator.displayName;function Ia({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(Ot,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(kt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Pt,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Ct,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(lt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(D,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(x.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(x.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(x.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(D,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(x.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const _n=`
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
`;function Va(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function re(t,e){const r=e?`${_n}, ${e}`:_n;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Va(o))}const le=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const w=a.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{re(w,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};l();const u=new MutationObserver(()=>{l()});return u.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{u.disconnect()}},[]);const i=w=>{const{current:l}=a;if(l){if(w.key==="ArrowDown"){w.preventDefault(),re(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return n.jsx("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});le.displayName="Table";const ce=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:d({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));ce.displayName="TableHeader";const de=s.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",t),...e}));de.displayName="TableBody";const ar=s.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));ar.displayName="TableFooter";function Oa(t){s.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?re(t.current):[],i=a.indexOf(document.activeElement),w=o.key==="ArrowRight"?i+1:i-1;w>=0&&w<a.length&&a[w].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Pa(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function La(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const xt=s.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),Oa(w);const l=s.useMemo(()=>w.current?re(w.current):[],[w]),u=s.useCallback(p=>{const{current:g}=w;if(!g||!g.parentElement)return;const m=g.closest("table"),f=m?re(m).filter(y=>y.tagName==="TR"):[],b=f.indexOf(g),N=l.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),La(f,b,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Pa(l,N,p.key);else if(p.key==="Escape"){p.preventDefault();const y=g.closest("table");y&&y.focus()}e==null||e(p)},[w,l,e]),c=s.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:u,onFocus:c,className:d("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});xt.displayName="TableRow";const $t=s.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));$t.displayName="TableHead";const Lt=s.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Lt.displayName="TableCell";const sr=s.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));sr.displayName="TableCaption";function ir({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{},id:l}){var _;const[u,c]=s.useState([]),[p,g]=s.useState([]),[m,f]=s.useState({}),[b,N]=s.useState({}),y=tt.useReactTable({data:e,columns:t,getCoreRowModel:tt.getCoreRowModel(),...r&&{getPaginationRowModel:tt.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:tt.getSortedRowModel(),onColumnFiltersChange:g,getFilteredRowModel:tt.getFilteredRowModel(),onColumnVisibilityChange:f,onRowSelectionChange:N,state:{sorting:u,columnFilters:p,columnVisibility:m,rowSelection:b}});return n.jsxs("div",{className:"pr-twp",id:l,children:[a&&n.jsx(Da,{table:y}),n.jsxs(le,{stickyHeader:i,children:[n.jsx(ce,{stickyHeader:i,children:y.getHeaderGroups().map(j=>n.jsx(xt,{children:j.headers.map(C=>n.jsx($t,{children:C.isPlaceholder?void 0:tt.flexRender(C.column.columnDef.header,C.getContext())},C.id))},j.id))}),n.jsx(de,{children:(_=y.getRowModel().rows)!=null&&_.length?y.getRowModel().rows.map(j=>n.jsx(xt,{onClick:()=>w(j,y),"data-state":j.getIsSelected()&&"selected",children:j.getVisibleCells().map(C=>n.jsx(Lt,{children:tt.flexRender(C.column.columnDef.cell,C.getContext())},C.id))},j.id)):n.jsx(xt,{children:n.jsx(Lt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(D,{variant:"outline",size:"sm",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:"Previous"}),n.jsx(D,{variant:"outline",size:"sm",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Ia,{table:y})]})}function Aa({id:t,markdown:e,className:r,anchorTarget:o}){const a=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:d("pr-twp tw-prose",r),children:n.jsx($o,{options:a,children:e})})}const wr=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Rn=(t,e)=>t[e]??e;function lr({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const a=Rn(r,"%webView_error_dump_header%"),i=Rn(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(D,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:n.jsx(x.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Ga=Object.freeze([...wr,"%webView_error_dump_copied_message%"]);function za({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:a,id:i}){const[w,l]=s.useState(!1),u=()=>{l(!0),e&&e()},c=p=>{p||l(!1)};return n.jsxs(zt,{onOpenChange:c,children:[n.jsx(Bt,{asChild:!0,children:o}),n.jsxs(Rt,{id:i,className:d("tw-min-w-80 tw-max-w-96",a),children:[w&&r["%webView_error_dump_copied_message%"]&&n.jsx(q,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(lr,{errorDetails:t,handleCopyNotify:u,localizedStrings:r})]})]})}var cr=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(cr||{});function Ba({id:t,label:e,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((c,p)=>c.itemType===0?[p,[]]:void 0).filter(c=>!!c))),[i,w]=s.useState({}),l=(c,p)=>{const g=!o[c][p];a(f=>(f[c][p]=g,{...f}));const m=r[c].items[p];m.onUpdate(m.id,g)},u=(c,p)=>{w(m=>(m[c]=p,{...m}));const g=r[c].items.find(m=>m.id===p);g?g.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Ne,{children:[n.jsx(Ye,{asChild:!0,children:n.jsxs(D,{variant:"default",children:[n.jsx(x.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(x.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(ie,{children:r.map((c,p)=>n.jsxs("div",{children:[n.jsx(ke,{children:c.label}),n.jsx(Je,{children:c.itemType===0?n.jsx(n.Fragment,{children:c.items.map((g,m)=>n.jsx("div",{children:n.jsx(je,{checked:o[p][m],onCheckedChange:()=>l(p,m),children:g.label})},g.id))}):n.jsx(Qn,{value:i[p],onValueChange:g=>u(p,g),children:c.items.map(g=>n.jsx("div",{children:n.jsx(tn,{value:g.id,children:g.label})},g.id))})}),n.jsx(we,{})]},c.label))})]})})}function Fa({id:t,category:e,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const u=new h.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,g)=>p+g,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(x.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||w)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(D,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(x.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(D,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(x.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function $a({id:t,versionHistory:e}){const[r,o]=s.useState(!1),a=new Date;function i(l){const u=new Date(l),c=new Date(a.getTime()-u.getTime()),p=c.getUTCFullYear()-1970,g=c.getUTCMonth(),m=c.getUTCDate()-1;let f="";return p>0?f=`${p.toString()} year${p===1?"":"s"} ago`:g>0?f=`${g.toString()} month${g===1?"":"s"} ago`:m===0?f="today":f=`${m.toString()} day${m===1?"":"s"} ago`,f}const w=Object.entries(e).sort((l,u)=>u[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Xa({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:a,currentVersion:i}){const w=s.useMemo(()=>h.formatBytes(r),[r]),u=(c=>{const p=new Intl.DisplayNames(h.getCurrentLocale(),{type:"language"});return c.map(g=>p.of(g))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&n.jsx($a,{versionHistory:a}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:w})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:u.join(", ")})]})})]})]})]})})}const dr=St.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),oe=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:d("pr-twp",dr({variant:e}),t),...r}));oe.displayName="Badge";function pr({entries:t,getEntriesCount:e=void 0,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i="No entries found",customSelectedText:w,isDisabled:l=!1,sortSelected:u=!1,icon:c=void 0,className:p=void 0,id:g}){const[m,f]=s.useState(!1),b=s.useCallback(_=>{var C;const j=(C=t.find(L=>L.label===_))==null?void 0:C.value;j&&o(r.includes(j)?r.filter(L=>L!==j):[...r,j])},[t,r,o]),N=()=>w||a,y=s.useMemo(()=>{if(!u)return t;const _=t.filter(C=>C.starred).sort((C,L)=>C.label.localeCompare(L.label)),j=t.filter(C=>!C.starred).sort((C,L)=>{const U=r.includes(C.value),A=r.includes(L.value);return U&&!A?-1:!U&&A?1:C.label.localeCompare(L.label)});return[..._,...j]},[t,r,u]);return n.jsx("div",{id:g,className:p,children:n.jsxs(zt,{open:m,onOpenChange:f,children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(D,{variant:"ghost",role:"combobox","aria-expanded":m,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<t.length&&"tw-border-primary","tw-group"),disabled:l,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),n.jsx("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===t.length}),children:n.jsx("div",{className:"tw-font-normal",children:N()})})]}),n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Rt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(At,{children:[n.jsx(Ht,{placeholder:`Search ${a.toLowerCase()}...`}),n.jsxs(Gt,{children:[n.jsx(se,{children:i}),n.jsx(jt,{children:y.map(_=>{const j=e?e(_):void 0;return n.jsxs(_t,{value:_.label,onSelect:b,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(x.Check,{className:d("tw-h-4 tw-w-4",r.includes(_.value)?"tw-opacity-100":"tw-opacity-0")})}),n.jsx("div",{className:"tw-w-4",children:_.starred&&n.jsx(x.Star,{className:"tw-h-4 tw-w-4"})}),n.jsx("div",{className:"tw-flex-grow",children:_.label}),e&&n.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:j})]},_.label)})})]})]})})]})})}function Ka({entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:u,icon:c,className:p,badgesPlaceholder:g,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(pr,{entries:t,getEntriesCount:e,selected:r,onChange:o,placeholder:a,commandEmptyMessage:i,customSelectedText:w,isDisabled:l,sortSelected:u,icon:c,className:p}),r.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(f=>{var b;return n.jsxs(oe,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(D,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>o(r.filter(N=>N!==f)),children:n.jsx(x.X,{className:"tw-h-3 tw-w-3"})}),(b=t.find(N=>N.value===f))==null?void 0:b.label]},f)})}):n.jsx(q,{children:g})]})}function Ha({occurrenceData:t,setScriptureReference:e,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(u=>h.deepEqual(u,l))||w.push(l)}),w},[t]);return n.jsxs(le,{stickyHeader:!0,children:[n.jsx(ce,{stickyHeader:!0,children:n.jsxs(xt,{children:[n.jsx($t,{children:o}),n.jsx($t,{children:a})]})}),n.jsx(de,{children:i.length>0&&i.map(w=>n.jsxs(xt,{onClick:()=>{e(w.reference)},children:[n.jsx(Lt,{children:`${P.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),n.jsx(Lt,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Ce=s.forwardRef(({className:t,...e},r)=>n.jsx(Ae.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Ae.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}));Ce.displayName=Ae.Root.displayName;const Ut=s.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ut.displayName="Input";const ur=St.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),qa=s.forwardRef(({className:t,variant:e,size:r,...o},a)=>n.jsx(Vn.Root,{ref:a,className:d(ur({variant:e,size:r,className:t})),...o}));qa.displayName=Vn.Root.displayName;const mr=s.createContext({size:"default",variant:"default"}),rn=s.forwardRef(({className:t,variant:e,size:r,children:o,...a},i)=>{const w=W();return n.jsx(ve.Root,{ref:i,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:w,children:n.jsx(mr.Provider,{value:{variant:e,size:r},children:o})})});rn.displayName=ve.Root.displayName;const Qt=s.forwardRef(({className:t,children:e,variant:r,size:o,...a},i)=>{const w=s.useContext(mr);return n.jsx(ve.Item,{ref:i,className:d(ur({variant:w.variant||r,size:w.size||o}),t),...a,children:e})});Qt.displayName=ve.Item.displayName;const Se=t=>t==="asc"?n.jsx(x.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(x.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(x.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Ua=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(D,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Se(e.getIsSorted())]})}),Ya=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(D,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Se(r.getIsSorted())]})}),Ja=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(D,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Se(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Ve=(t,e,r,o,a,i)=>{let w=[...r];t.forEach(u=>{e==="approved"?w.includes(u)||w.push(u):w=w.filter(c=>c!==u)}),o(w);let l=[...a];t.forEach(u=>{e==="unapproved"?l.includes(u)||l.push(u):l=l.filter(c=>c!==u)}),i(l)},Wa=(t,e,r,o,a)=>({accessorKey:"status",header:({column:i})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(D,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,Se(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return n.jsxs(rn,{value:w,variant:"outline",type:"single",children:[n.jsx(Qt,{onClick:u=>{u.stopPropagation(),Ve([l],"approved",e,r,o,a)},value:"approved",children:n.jsx(x.CircleCheckIcon,{})}),n.jsx(Qt,{onClick:u=>{u.stopPropagation(),Ve([l],"unapproved",e,r,o,a)},value:"unapproved",children:n.jsx(x.CircleXIcon,{})}),n.jsx(Qt,{onClick:u=>{u.stopPropagation(),Ve([l],"unknown",e,r,o,a)},value:"unknown",children:n.jsx(x.CircleHelpIcon,{})})]})}}),Za=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Qa=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},ts=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},hr=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",es=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),ns=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(a=>e==="approved"&&a.status==="approved"||e==="unapproved"&&a.status==="unapproved"||e==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},rs=(t,e,r)=>{const o=[];return t.forEach(a=>{const i=o.find(w=>h.deepEqual(w.items,h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:a.verseRef,text:a.verse});else{const w={items:h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:hr(h.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],e,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(w)}}),o},bt=(t,e)=>t[e]??e;function os({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,scope:w,onScopeChange:l,columns:u,id:c}){const p=bt(r,"%webView_inventory_all%"),g=bt(r,"%webView_inventory_approved%"),m=bt(r,"%webView_inventory_unapproved%"),f=bt(r,"%webView_inventory_unknown%"),b=bt(r,"%webView_inventory_scope_currentBook%"),N=bt(r,"%webView_inventory_scope_chapter%"),y=bt(r,"%webView_inventory_scope_verse%"),_=bt(r,"%webView_inventory_filter_text%"),j=bt(r,"%webView_inventory_show_additional_items%"),[C,L]=s.useState(!1),[U,A]=s.useState("all"),[et,ct]=s.useState(""),[S,M]=s.useState([]),$=s.useMemo(()=>t.length===0?[]:rs(t,a,i),[t,a,i]),V=s.useMemo(()=>{if(C)return $;const T=[];return $.forEach(Y=>{const K=Y.items[0],it=T.find(yt=>yt.items[0]===K);it?(it.count+=Y.count,it.occurrences=it.occurrences.concat(Y.occurrences)):T.push({items:[K],count:Y.count,occurrences:Y.occurrences,status:Y.status})}),T},[C,$]),st=s.useMemo(()=>ns(V,U,et),[V,U,et]),R=s.useMemo(()=>{var K,it;if(!C)return u;const T=(K=o==null?void 0:o.tableHeaders)==null?void 0:K.length;if(!T)return u;const Y=[];for(let yt=0;yt<T;yt++)Y.push(Ya(((it=o==null?void 0:o.tableHeaders)==null?void 0:it[yt])||"Additional Item",yt+1));return[...Y,...u]},[o==null?void 0:o.tableHeaders,u,C]);s.useEffect(()=>{st.length===0?M([]):st.length===1&&M(st[0].items)},[st]);const Z=(T,Y)=>{Y.setRowSelection(()=>{const K={};return K[T.index]=!0,K}),M(T.original.items)},k=T=>{if(T==="book"||T==="chapter"||T==="verse")l(T);else throw new Error(`Invalid scope value: ${T}`)},X=T=>{if(T==="all"||T==="approved"||T==="unapproved"||T==="unknown")A(T);else throw new Error(`Invalid status filter value: ${T}`)},ut=s.useMemo(()=>{if(V.length===0||S.length===0)return[];const T=V.filter(Y=>h.deepEqual(C?Y.items:[Y.items[0]],S));if(T.length>1)throw new Error("Selected item is not unique");return T.length===0?[]:T[0].occurrences},[S,C,V]);return n.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(Ot,{onValueChange:T=>X(T),defaultValue:U,children:[n.jsx(kt,{className:"tw-m-1",children:n.jsx(Pt,{placeholder:"Select filter"})}),n.jsxs(Ct,{children:[n.jsx(lt,{value:"all",children:p}),n.jsx(lt,{value:"approved",children:g}),n.jsx(lt,{value:"unapproved",children:m}),n.jsx(lt,{value:"unknown",children:f})]})]}),n.jsxs(Ot,{onValueChange:T=>k(T),defaultValue:w,children:[n.jsx(kt,{className:"tw-m-1",children:n.jsx(Pt,{placeholder:"Select scope"})}),n.jsxs(Ct,{children:[n.jsx(lt,{value:"book",children:b}),n.jsx(lt,{value:"chapter",children:N}),n.jsx(lt,{value:"verse",children:y})]})]}),n.jsx(Ut,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:et,onChange:T=>{ct(T.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(Ce,{className:"tw-m-1",checked:C,onCheckedChange:T=>{L(T)}}),n.jsx(q,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??j})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(ir,{columns:R,data:st,onRowClickHandler:Z,stickyHeader:!0})}),ut.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Ha,{occurrenceData:ut,setScriptureReference:e,localizedStrings:r})})]})}const _e=s.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},a)=>n.jsx(On.Root,{ref:a,decorative:r,orientation:e,className:d("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));_e.displayName=On.Root.displayName;function Fe({className:t,...e}){return n.jsx("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}const Re=ae.Provider,Te=ae.Root,Me=ae.Trigger,pe=s.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(ae.Content,{ref:o,sideOffset:e,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));pe.displayName=ae.Content.displayName;const as="16rem",ss="3rem",fr=s.createContext(void 0);function ue(){const t=s.useContext(fr);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const on=s.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:a,children:i,side:w="primary",...l},u)=>{const[c,p]=s.useState(t),g=e??c,m=s.useCallback(C=>{const L=typeof C=="function"?C(g):C;r?r(L):p(L)},[r,g]),f=s.useCallback(()=>m(C=>!C),[m]),b=g?"expanded":"collapsed",_=W()==="ltr"?w:w==="primary"?"secondary":"primary",j=s.useMemo(()=>({state:b,open:g,setOpen:m,toggleSidebar:f,side:_}),[b,g,m,f,_]);return n.jsx(fr.Provider,{value:j,children:n.jsx(Re,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":as,"--sidebar-width-icon":ss,...a},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:u,...l,children:i})})})});on.displayName="SidebarProvider";const an=s.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...a},i)=>{const w=ue();return e==="none"?n.jsx("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...a,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?e:"","data-variant":t,"data-side":w.side,children:[n.jsx("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});an.displayName="Sidebar";const gr=s.forwardRef(({className:t,onClick:e,...r},o)=>{const a=ue();return n.jsxs(D,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),a.toggleSidebar()},...r,children:[a.side==="primary"?n.jsx(x.PanelLeft,{}):n.jsx(x.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});gr.displayName="SidebarTrigger";const br=s.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=ue();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});br.displayName="SidebarRail";const sn=s.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));sn.displayName="SidebarInset";const xr=s.forwardRef(({className:t,...e},r)=>n.jsx(Ut,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));xr.displayName="SidebarInput";const vr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));vr.displayName="SidebarHeader";const yr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));yr.displayName="SidebarFooter";const Nr=s.forwardRef(({className:t,...e},r)=>n.jsx(_e,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Nr.displayName="SidebarSeparator";const wn=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));wn.displayName="SidebarContent";const he=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));he.displayName="SidebarGroup";const fe=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Xt.Slot:"div";return n.jsx(a,{ref:o,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});fe.displayName="SidebarGroupLabel";const jr=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Xt.Slot:"button";return n.jsx(a,{ref:o,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});jr.displayName="SidebarGroupAction";const ge=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",t),...e}));ge.displayName="SidebarGroupContent";const ln=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));ln.displayName="SidebarMenu";const cn=s.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",t),...e}));cn.displayName="SidebarMenuItem";const is=St.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),dn=s.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:a,className:i,...w},l)=>{const u=t?Xt.Slot:"button",{state:c}=ue(),p=n.jsx(u,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:d(is({variant:r,size:o}),i),...w});return a?(typeof a=="string"&&(a={children:a}),n.jsxs(Te,{children:[n.jsx(Me,{asChild:!0,children:p}),n.jsx(pe,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):p});dn.displayName="SidebarMenuButton";const kr=s.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},a)=>{const i=e?Xt.Slot:"button";return n.jsx(i,{ref:a,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});kr.displayName="SidebarMenuAction";const Cr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Cr.displayName="SidebarMenuBadge";const Sr=s.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Fe,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Fe,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});Sr.displayName="SidebarMenuSkeleton";const _r=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));_r.displayName="SidebarMenuSub";const Rr=s.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Rr.displayName="SidebarMenuSubItem";const Tr=s.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...a},i)=>{const w=t?Xt.Slot:"a";return n.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Tr.displayName="SidebarMenuSubButton";function Mr({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:u}){const c=s.useCallback((m,f)=>{o(m,f)},[o]),p=s.useCallback(m=>{const f=r.find(b=>b.projectId===m);return f?f.projectName:m},[r]),g=s.useCallback(m=>!a.projectId&&m===a.label,[a]);return n.jsx(an,{id:t,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",u),children:n.jsxs(wn,{children:[n.jsxs(he,{children:[n.jsx(fe,{className:"tw-text-sm",children:i}),n.jsx(ge,{children:n.jsx(ln,{children:Object.entries(e).map(([m,f])=>n.jsx(cn,{children:n.jsx(dn,{onClick:()=>c(m),isActive:g(m),children:n.jsx("span",{className:"tw-pl-3",children:f})})},m))})})]}),n.jsxs(he,{children:[n.jsx(fe,{className:"tw-text-sm",children:w}),n.jsx(ge,{className:"tw-pl-3",children:n.jsx(me,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:p,buttonPlaceholder:l,onChange:m=>{const f=p(m);c(f,m)},value:(a==null?void 0:a.projectId)??void 0,icon:n.jsx(x.ScrollText,{})})})]})]})})}const Ee=s.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:a,isDisabled:i=!1,id:w},l)=>{const u=W();return n.jsxs("div",{id:w,className:d("tw-relative",{"tw-w-full":o},a),children:[n.jsx(x.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":u==="rtl"},{"tw-left-3":u==="ltr"})}),n.jsx(Ut,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>e(c.target.value),disabled:i}),t&&n.jsxs(D,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":u==="rtl"},{"tw-right-0":u==="ltr"}),onClick:()=>{e("")},children:[n.jsx(x.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ee.displayName="SearchBar";function ws({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Ee,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(on,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Mr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:i,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:c,buttonPlaceholderText:p}),n.jsx(sn,{className:"tw-min-w-[215px]",children:o})]})]})}const Nt="scrBook",ls="scrRef",Dt="source",cs="details",ds="Scripture Reference",ps="Scripture Book",Er="Type",us="Details";function ms(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Nt,header:(t==null?void 0:t.scriptureReferenceColumnName)??ds,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?P.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===Nt?h.formatScrRef(a.start):void 0},getGroupingValue:o=>P.bookIdToNumber(o.start.book),sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>h.formatScrRef(o.start),id:ls,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:h.formatScrRef(a.start)},sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Dt,header:r?(t==null?void 0:t.typeColumnName)??Er:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:cs,header:(t==null?void 0:t.detailsColumnName)??us,cell:o=>o.getValue(),enableGrouping:!1}]}const hs=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||h.compareScrRefs(t.start,t.end)===0?`${h.scrRefToBBBCCCVVV(t.start)}+${e}`:`${h.scrRefToBBBCCCVVV(t.start)}+${e}-${h.scrRefToBBBCCCVVV(t.end)}+${r}`},Tn=t=>`${hs({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function fs({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:i,detailsColumnName:w,onRowSelected:l,id:u}){const[c,p]=s.useState([]),[g,m]=s.useState([{id:Nt,desc:!1}]),[f,b]=s.useState({}),N=s.useMemo(()=>t.flatMap(S=>S.data.map(M=>({...M,source:S.source}))),[t]),y=s.useMemo(()=>ms({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:w},r),[o,i,w,r]);s.useEffect(()=>{c.includes(Dt)?m([{id:Dt,desc:!1},{id:Nt,desc:!1}]):m([{id:Nt,desc:!1}])},[c]);const _=tt.useReactTable({data:N,columns:y,state:{grouping:c,sorting:g,rowSelection:f},onGroupingChange:p,onSortingChange:m,onRowSelectionChange:b,getExpandedRowModel:tt.getExpandedRowModel(),getGroupedRowModel:tt.getGroupedRowModel(),getCoreRowModel:tt.getCoreRowModel(),getSortedRowModel:tt.getSortedRowModel(),getRowId:Tn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const S=_.getSelectedRowModel().rowsById,M=Object.keys(S);if(M.length===1){const $=N.find(V=>Tn(V)===M[0])||void 0;$&&l($)}}},[f,N,l,_]);const j=a??ps,C=i??Er,L=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[Nt]},{label:`Group by ${C}`,value:[Dt]},{label:`Group by ${j} and ${C}`,value:[Nt,Dt]},{label:`Group by ${C} and ${j}`,value:[Dt,Nt]}],U=S=>{p(JSON.parse(S))},A=(S,M)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(M)},et=(S,M)=>S.getIsGrouped()?"":d("banded-row",M%2===0?"even":"odd"),ct=(S,M,$)=>{if(!((S==null?void 0:S.length)===0||M.depth<$.column.getGroupedIndex())){if(M.getIsGrouped())switch(M.depth){case 1:return"tw-ps-4";default:return}switch(M.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(Ot,{value:JSON.stringify(c),onValueChange:S=>{U(S)},children:[n.jsx(kt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Pt,{})}),n.jsx(Ct,{position:"item-aligned",children:n.jsx(er,{children:L.map(S=>n.jsx(lt,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),n.jsxs(le,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(ce,{children:_.getHeaderGroups().map(S=>n.jsx(xt,{children:S.headers.filter(M=>M.column.columnDef.header).map(M=>n.jsx($t,{colSpan:M.colSpan,className:"top-0 tw-sticky",children:M.isPlaceholder?void 0:n.jsxs("div",{children:[M.column.getCanGroup()?n.jsx(D,{variant:"ghost",title:`Toggle grouping by ${M.column.columnDef.header}`,onClick:M.column.getToggleGroupingHandler(),type:"button",children:M.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",tt.flexRender(M.column.columnDef.header,M.getContext())]})},M.id))},S.id))}),n.jsx(de,{children:_.getRowModel().rows.map((S,M)=>{const $=W();return n.jsx(xt,{"data-state":S.getIsSelected()?"selected":"",className:d(et(S,M)),onClick:V=>A(S,V),children:S.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==Dt||!r)))return n.jsx(Lt,{className:d(V.column.columnDef.id,"tw-p-[1px]",ct(c,S,V)),children:V.getIsGrouped()?n.jsxs(D,{variant:"link",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()&&n.jsx(x.ChevronDown,{}),!S.getIsExpanded()&&($==="ltr"?n.jsx(x.ChevronRight,{}):n.jsx(x.ChevronLeft,{}))," ",tt.flexRender(V.column.columnDef.cell,V.getContext())," (",S.subRows.length,")"]}):tt.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},S.id)})})]})]})}const pn=(t,e)=>t.filter(r=>{try{return h.getSectionForBook(r)===e}catch{return!1}}),Dr=(t,e,r)=>pn(t,e).every(o=>r.includes(o));function gs({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:a}){const i=pn(e,t).length===0,w=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],u=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return n.jsx(D,{variant:"outline",size:"sm",onClick:()=>o(t),className:d(Dr(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:ya(t,w,l,u,c)})}const Mn=5,Oe=6;function bs({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const i=o["%webView_book_selector_books_selected%"],w=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],u=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],g=o["%webView_book_selector_more%"],{otLong:m,ntLong:f,dcLong:b,extraLong:N}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[y,_]=s.useState(!1),[j,C]=s.useState(""),L=s.useRef(void 0),U=s.useRef(!1);if(t.length!==P.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const A=s.useMemo(()=>P.allBookIds.filter((R,Z)=>t[Z]==="1"&&!P.isObsolete(P.bookIdToNumber(R))),[t]),et=s.useMemo(()=>{if(!j.trim()){const k={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return A.forEach(X=>{const ut=h.getSectionForBook(X);k[ut].push(X)}),k}const R=A.filter(k=>qe(k,j,a)),Z={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return R.forEach(k=>{const X=h.getSectionForBook(k);Z[X].push(k)}),Z},[A,j,a]),ct=s.useCallback((R,Z=!1)=>{if(!Z||!L.current){r(e.includes(R)?e.filter(K=>K!==R):[...e,R]),L.current=R;return}const k=A.findIndex(K=>K===L.current),X=A.findIndex(K=>K===R);if(k===-1||X===-1)return;const[ut,T]=[Math.min(k,X),Math.max(k,X)],Y=A.slice(ut,T+1).map(K=>K);r(e.includes(R)?e.filter(K=>!Y.includes(K)):[...new Set([...e,...Y])])},[e,r,A]),S=R=>{ct(R,U.current),U.current=!1},M=(R,Z)=>{R.preventDefault(),ct(Z,R.shiftKey)},$=s.useCallback(R=>{const Z=pn(A,R).map(k=>k);r(Dr(A,R,e)?e.filter(k=>!Z.includes(k)):[...new Set([...e,...Z])])},[e,r,A]),V=()=>{r(A.map(R=>R))},st=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(h.Section).map(R=>n.jsx(gs,{section:R,availableBookIds:A,selectedBookIds:e,onToggle:$,localizedStrings:o},R))}),n.jsxs(zt,{open:y,onOpenChange:R=>{_(R),R||C("")},children:[n.jsx(Bt,{asChild:!0,children:n.jsxs(D,{variant:"outline",role:"combobox","aria-expanded":y,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:w,n.jsx(x.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Rt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(At,{shouldFilter:!1,onKeyDown:R=>{R.key==="Enter"&&(U.current=R.shiftKey)},children:[n.jsx(Ht,{placeholder:l,value:j,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(D,{variant:"ghost",size:"sm",onClick:V,children:u}),n.jsx(D,{variant:"ghost",size:"sm",onClick:st,children:c})]}),n.jsxs(Gt,{children:[n.jsx(se,{children:p}),Object.values(h.Section).map((R,Z)=>{const k=et[R];if(k.length!==0)return n.jsxs(s.Fragment,{children:[n.jsx(jt,{heading:Xn(R,m,f,b,N),children:k.map(X=>n.jsx(Hn,{bookId:X,isSelected:e.includes(X),onSelect:()=>S(X),onMouseDown:ut=>M(ut,X),section:h.getSectionForBook(X),showCheck:!0,localizedBookNames:a,commandValue:Be(X,a),className:"tw-flex tw-items-center"},X))}),Z<Object.values(h.Section).length-1&&n.jsx(Ln,{})]},R)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Oe?Oe:Mn).map(R=>n.jsx(oe,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ft(R,a)},R)),e.length>Oe&&n.jsx(oe,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Mn} ${g}`})]})]})}const xs=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Mt=(t,e)=>t[e]??e;function vs({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l,id:u}){const c=Mt(w,"%webView_scope_selector_selected_text%"),p=Mt(w,"%webView_scope_selector_current_verse%"),g=Mt(w,"%webView_scope_selector_current_chapter%"),m=Mt(w,"%webView_scope_selector_current_book%"),f=Mt(w,"%webView_scope_selector_choose_books%"),b=Mt(w,"%webView_scope_selector_scope%"),N=Mt(w,"%webView_scope_selector_select_books%"),y=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:g,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:f,id:"scope-selected"}],_=e?y.filter(j=>e.includes(j.value)):y;return n.jsxs("div",{id:u,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(q,{children:b}),n.jsx(ye,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:_.map(({value:j,label:C,id:L})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ne,{className:"tw-me-2",value:j,id:L}),n.jsx(q,{htmlFor:L,children:C})]},L))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(q,{children:N}),n.jsx(bs,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const Pe={[h.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[h.getLocalizeKeyForScrollGroupId(0)]:"A",[h.getLocalizeKeyForScrollGroupId(1)]:"B",[h.getLocalizeKeyForScrollGroupId(2)]:"C",[h.getLocalizeKeyForScrollGroupId(3)]:"D",[h.getLocalizeKeyForScrollGroupId(4)]:"E",[h.getLocalizeKeyForScrollGroupId(5)]:"F",[h.getLocalizeKeyForScrollGroupId(6)]:"G",[h.getLocalizeKeyForScrollGroupId(7)]:"H",[h.getLocalizeKeyForScrollGroupId(8)]:"I",[h.getLocalizeKeyForScrollGroupId(9)]:"J",[h.getLocalizeKeyForScrollGroupId(10)]:"K",[h.getLocalizeKeyForScrollGroupId(11)]:"L",[h.getLocalizeKeyForScrollGroupId(12)]:"M",[h.getLocalizeKeyForScrollGroupId(13)]:"N",[h.getLocalizeKeyForScrollGroupId(14)]:"O",[h.getLocalizeKeyForScrollGroupId(15)]:"P",[h.getLocalizeKeyForScrollGroupId(16)]:"Q",[h.getLocalizeKeyForScrollGroupId(17)]:"R",[h.getLocalizeKeyForScrollGroupId(18)]:"S",[h.getLocalizeKeyForScrollGroupId(19)]:"T",[h.getLocalizeKeyForScrollGroupId(20)]:"U",[h.getLocalizeKeyForScrollGroupId(21)]:"V",[h.getLocalizeKeyForScrollGroupId(22)]:"W",[h.getLocalizeKeyForScrollGroupId(23)]:"X",[h.getLocalizeKeyForScrollGroupId(24)]:"Y",[h.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ys({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:i,id:w}){const l={...Pe,...Object.fromEntries(Object.entries(o).map(([c,p])=>[c,c===p&&c in Pe?Pe[c]:p]))},u=W();return n.jsxs(Ot,{value:`${e}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[n.jsx(kt,{size:a,className:d("pr-twp tw-w-auto",i),children:n.jsx(Pt,{placeholder:l[h.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Ct,{id:w,align:u==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>n.jsx(lt,{value:`${c}`,children:l[h.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function Ns({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function js({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:a}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):n.jsx("div",{children:r})]})}function ks({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(_e,{}):""]})}function Ir(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function be({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Vr=(t,e,r,o)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,u)=>l.order-u.order).map(l=>n.jsxs(Te,{children:[n.jsx(Me,{asChild:!0,children:"command"in l?n.jsxs(Qe,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(be,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(be,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(Zn,{children:[n.jsx(We,{children:l.label}),n.jsx(Wn,{children:n.jsx(Ze,{children:Vr(t,e,Ir(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(pe,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function xe({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:a,variant:i,buttonVariant:w="ghost",id:l}){return n.jsxs(Ne,{variant:i,children:[n.jsx(Ye,{"aria-label":r,className:a,asChild:!0,id:l,children:n.jsx(D,{variant:w,size:"icon",children:o??n.jsx(x.MenuIcon,{})})}),n.jsx(ie,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,c])=>typeof u=="boolean"||typeof c=="boolean"?0:u.order-c.order).map(([u],c,p)=>n.jsxs(s.Fragment,{children:[n.jsx(Je,{children:n.jsx(Re,{children:Vr(e.groups,e.items,u,t)})}),c<p.length-1&&n.jsx(we,{})]},u))})]})}const Or=s.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Cs({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:a,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:u,menuButtonIcon:c}){return n.jsxs(Or,{className:`tw-w-full tw-border ${i}`,id:a,children:[r&&n.jsx(xe,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??n.jsx(x.Menu,{}),buttonVariant:"ghost"}),w&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:w}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(xe,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(x.EllipsisVertical,{}),className:"tw-h-full"}),u]})]})}function Ss({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:a}){return n.jsx(Or,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(xe,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const un=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsx(at.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});un.displayName=at.List.displayName;const mn=s.forwardRef(({className:t,...e},r)=>n.jsx(at.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));mn.displayName=at.List.displayName;const Pr=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Trigger,{ref:r,...e,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),hn=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));hn.displayName=at.Content.displayName;function _s({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:i,id:w}){return n.jsxs("div",{id:w,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?n.jsx("h1",{children:a}):"",n.jsx(Ee,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(un,{children:[n.jsx(mn,{children:t.map(l=>n.jsx(Pr,{value:l.value,children:l.value},l.key))}),t.map(l=>n.jsx(hn,{value:l.value,children:l.content},l.key))]})]})}function Rs({...t}){return n.jsx(z.Menu,{...t})}function Ts({...t}){return n.jsx(z.Sub,{"data-slot":"menubar-sub",...t})}const Lr=s.forwardRef(({className:t,variant:e="default",...r},o)=>{const a=s.useMemo(()=>({variant:e}),[e]);return n.jsx(Ue.Provider,{value:a,children:n.jsx(z.Root,{ref:o,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Lr.displayName=z.Root.displayName;const Ar=s.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(z.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",vt({variant:o.variant,className:t})),...e})});Ar.displayName=z.Trigger.displayName;const Gr=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=pt();return n.jsxs(z.SubTrigger,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",vt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Gr.displayName=z.SubTrigger.displayName;const zr=s.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(z.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});zr.displayName=z.SubContent.displayName;const Br=s.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...a},i)=>{const w=pt();return n.jsx(z.Portal,{children:n.jsx(z.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":w.variant==="muted"},t),...a})})});Br.displayName=z.Content.displayName;const Fr=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=pt();return n.jsx(z.Item,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",vt({variant:a.variant,className:t}),t),...r})});Fr.displayName=z.Item.displayName;const Ms=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=pt();return n.jsxs(z.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",vt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(z.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Ms.displayName=z.CheckboxItem.displayName;const Es=s.forwardRef(({className:t,children:e,...r},o)=>{const a=pt();return n.jsxs(z.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",vt({variant:a.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(z.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Es.displayName=z.RadioItem.displayName;const Ds=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(z.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ds.displayName=z.Label.displayName;const $r=s.forwardRef(({className:t,...e},r)=>n.jsx(z.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));$r.displayName=z.Separator.displayName;const Wt=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Xr=(t,e,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return a.flatMap(([i],w)=>{const l=e.filter(c=>c.group===i).sort((c,p)=>c.order-p.order).map(c=>n.jsxs(Te,{children:[n.jsx(Me,{asChild:!0,children:"command"in c?n.jsxs(Fr,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(be,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(be,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):n.jsxs(Ts,{children:[n.jsx(Gr,{children:c.label}),n.jsx(zr,{children:Xr(t,e,Ir(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(pe,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),u=[...l];return l.length>0&&w<a.length-1&&u.push(n.jsx($r,{},`separator-${i}`)),u})};function Is({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const a=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),u=s.useRef(void 0),c=p=>{switch(p){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return u;default:return}};if(Wo.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,g)=>{var b,N,y,_;p.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(g.hotkey){case"alt":Wt(i,[m]);break;case"alt+p":(b=i.current)==null||b.focus(),Wt(i,[m,f]);break;case"alt+l":(N=w.current)==null||N.focus(),Wt(w,[m,f]);break;case"alt+n":(y=l.current)==null||y.focus(),Wt(l,[m,f]);break;case"alt+h":(_=u.current)==null||_.focus(),Wt(u,[m,f]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const p=new MutationObserver(f=>{f.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const N=b.target.getAttribute("data-state");r(N==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(f=>{p.observe(f,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Lr,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,g])=>typeof p=="boolean"||typeof g=="boolean"?0:p.order-g.order).map(([p,g])=>n.jsxs(Rs,{children:[n.jsx(Ar,{ref:c(p),children:typeof g=="object"&&"label"in g&&g.label}),n.jsx(Br,{className:"tw-z-[250]",children:n.jsx(Re,{children:Xr(t.groups,t.items,p,e)})})]},p))})}function Vs(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Os({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:a,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:u,menubarVariant:c="default"}){const p=s.useRef(void 0);return n.jsx("div",{className:d("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:a,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:u?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&n.jsx(Is,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:c})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const Ps=(t,e)=>t[e]??e;function Ls({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:i,localizedStrings:w,className:l,id:u}){const c=Ps(w,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,g]=s.useState(!1),m=b=>{a&&a(b),o&&o([b,...r.filter(N=>N!==b)]),i&&r.find(N=>N===b)&&i([...r.filter(N=>N!==b)]),g(!1)},f=(b,N)=>{var _,j,C,L,U,A;const y=N!==b?((j=(_=t[b])==null?void 0:_.uiNames)==null?void 0:j[N])??((L=(C=t[b])==null?void 0:C.uiNames)==null?void 0:L.en):void 0;return y?`${(U=t[b])==null?void 0:U.autonym} (${y})`:(A=t[b])==null?void 0:A.autonym};return n.jsxs("div",{id:u,className:d("pr-twp tw-max-w-sm",l),children:[n.jsxs(Ot,{name:"uiLanguage",value:e,onValueChange:m,open:p,onOpenChange:b=>g(b),children:[n.jsx(kt,{children:n.jsx(Pt,{})}),n.jsx(Ct,{className:"tw-z-[250]",children:Object.keys(t).map(b=>n.jsx(lt,{value:b,children:f(b,e)},b))})]}),e!=="en"&&n.jsxs(n.Fragment,{children:[n.jsx(q,{className:"tw-ms-3",children:c}),n.jsx("div",{className:"tw-ms-3",children:n.jsxs(q,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(b=>f(b,e)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}function As({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(q,{children:e(t)}):r?n.jsx(q,{children:r(t)}):n.jsx(q,{children:t})}function Gs({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:i,createComplexLabel:w}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Ce,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:u=>a(l,u)}),n.jsx(As,{item:l,createLabel:i,createComplexLabel:w})]},l))})}const Kr=s.forwardRef(({className:t,...e},r)=>n.jsx(x.LoaderCircle,{size:35,className:d("tw-animate-spin",t),...e,ref:r}));Kr.displayName="Spinner";function zs({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:w,isRequired:l=!1,className:u,defaultValue:c,value:p,onChange:g,onFocus:m,onBlur:f}){return n.jsxs("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(q,{htmlFor:t,className:d({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(Ut,{id:t,disabled:e,placeholder:w,required:l,className:d(u,{"tw-border-red-600":r}),defaultValue:c,value:p,onChange:g,onFocus:m,onBlur:f}),n.jsx("p",{className:d({"tw-hidden":!a}),children:a})]})}const Bs=St.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Hr=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:d("pr-twp",Bs({variant:e}),t),...r}));Hr.displayName="Alert";const qr=s.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));qr.displayName="AlertTitle";const Ur=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Ur.displayName="AlertDescription";const Yr=s.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Yr.displayName=Kt.Root.displayName;const Jr=s.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Jr.displayName=Kt.Image.displayName;const Wr=s.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Wr.displayName=Kt.Fallback.displayName;const Zr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Zr.displayName="Card";const Qr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Qr.displayName="CardHeader";const to=s.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));to.displayName="CardTitle";const eo=s.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));eo.displayName="CardDescription";const no=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",t),...e}));no.displayName="CardContent";const ro=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));ro.displayName="CardFooter";const Fs=B.Root,$s=B.Trigger,Xs=B.Group,Ks=B.Portal,Hs=B.Sub,qs=B.RadioGroup,oo=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>n.jsxs(B.SubTrigger,{ref:a,className:d("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(x.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));oo.displayName=B.SubTrigger.displayName;const ao=s.forwardRef(({className:t,...e},r)=>n.jsx(B.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));ao.displayName=B.SubContent.displayName;const so=s.forwardRef(({className:t,...e},r)=>n.jsx(B.Portal,{children:n.jsx(B.Content,{ref:r,className:d("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));so.displayName=B.Content.displayName;const io=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(B.Item,{ref:o,className:d("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));io.displayName=B.Item.displayName;const wo=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>n.jsxs(B.CheckboxItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));wo.displayName=B.CheckboxItem.displayName;const lo=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(B.RadioItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(B.ItemIndicator,{children:n.jsx(x.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));lo.displayName=B.RadioItem.displayName;const co=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(B.Label,{ref:o,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));co.displayName=B.Label.displayName;const po=s.forwardRef(({className:t,...e},r)=>n.jsx(B.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));po.displayName=B.Separator.displayName;function uo({className:t,...e}){return n.jsx("span",{className:d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}uo.displayName="ContextMenuShortcut";const mo=s.createContext({direction:"bottom"});function ho({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=s.useMemo(()=>({direction:e}),[e]);return n.jsx(mo.Provider,{value:o,children:n.jsx(dt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ho.displayName="Drawer";const Us=dt.Drawer.Trigger,fo=dt.Drawer.Portal,Ys=dt.Drawer.Close,fn=s.forwardRef(({className:t,...e},r)=>n.jsx(dt.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));fn.displayName=dt.Drawer.Overlay.displayName;const go=s.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},a)=>{const{direction:i="bottom"}=s.useContext(mo),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(fo,{children:[n.jsx(fn,{}),n.jsxs(dt.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})});go.displayName="DrawerContent";function bo({className:t,...e}){return n.jsx("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}bo.displayName="DrawerHeader";function xo({className:t,...e}){return n.jsx("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}xo.displayName="DrawerFooter";const vo=s.forwardRef(({className:t,...e},r)=>n.jsx(dt.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));vo.displayName=dt.Drawer.Title.displayName;const yo=s.forwardRef(({className:t,...e},r)=>n.jsx(dt.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",t),...e}));yo.displayName=dt.Drawer.Description.displayName;const No=s.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Ge.Root,{ref:o,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Ge.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));No.displayName=Ge.Root.displayName;function Js({...t}){return n.jsx(Dn.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const jo=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsxs(Zt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Zt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Zt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Zt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});jo.displayName=Zt.Root.displayName;const ko=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsx(ze.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(ze.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ko.displayName=ze.Root.displayName;const Ws=at.Root,Co=s.forwardRef(({className:t,...e},r)=>{const o=W();return n.jsx(at.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Co.displayName=at.List.displayName;const So=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));So.displayName=at.Trigger.displayName;const _o=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));_o.displayName=at.Content.displayName;const Ro=s.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:d("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Ro.displayName="Textarea";const Zs=(t,e)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Qs(t){return{preserveValue:!0,...t}}const To=(t,e,r={})=>{const o=s.useRef(e);o.current=e;const a=s.useRef(r);a.current=Qs(a.current);const[i,w]=s.useState(()=>o.current),[l,u]=s.useState(!0);return s.useEffect(()=>{let c=!0;return u(!!t),(async()=>{if(t){const p=await t();c&&(w(()=>p),u(!1))}})(),()=>{c=!1,a.current.preserveValue||w(()=>o.current)}},[t]),[i,l]},Le=()=>!1,ti=(t,e)=>{const[r]=To(s.useCallback(async()=>{if(!t)return Le;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Le,{preserveValue:!1});s.useEffect(()=>()=>{r!==Le&&r()},[r])},ei=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[i,w]=s.useState(void 0),[l,u]=s.useState(void 0),c=s.useCallback(m=>{w(m);const f=t.find(N=>N.id===m);f&&(e==null||e(f));const b=document.getElementById(m);b&&(b.scrollIntoView({block:"center"}),b.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[e,t]),p=s.useCallback(m=>{const f=t.find(b=>b.id===m);f&&(u(b=>b===m?void 0:m),r==null||r(f))},[r,t]),g=s.useCallback(m=>{const f=t.findIndex(y=>y.id===i);let b=f;switch(m.key){case"ArrowDown":b=Math.min(f+1,t.length-1),m.preventDefault();break;case"ArrowUp":b=Math.max(f-1,0),m.preventDefault();break;case"Home":b=0,m.preventDefault();break;case"End":b=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&p(i),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const N=t[b];N&&c(N.id)},[t,c,i,p,o]);return{listboxRef:a,activeId:i,selectedId:l,handleKeyDown:g,focusOption:c}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Dn.toast});exports.Alert=Hr;exports.AlertDescription=Ur;exports.AlertTitle=qr;exports.Avatar=Yr;exports.AvatarFallback=Wr;exports.AvatarImage=Jr;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=_a;exports.BOOK_SELECTOR_STRING_KEYS=Ma;exports.Badge=oe;exports.BookChapterControl=Sa;exports.BookSelectionMode=Jn;exports.BookSelector=Ea;exports.Button=D;exports.Card=Zr;exports.CardContent=no;exports.CardDescription=eo;exports.CardFooter=ro;exports.CardHeader=Qr;exports.CardTitle=to;exports.ChapterRangeSelector=Yn;exports.Checkbox=Ce;exports.Checklist=Gs;exports.ComboBox=me;exports.Command=At;exports.CommandEmpty=se;exports.CommandGroup=jt;exports.CommandInput=Ht;exports.CommandItem=_t;exports.CommandList=Gt;exports.ContextMenu=Fs;exports.ContextMenuCheckboxItem=wo;exports.ContextMenuContent=so;exports.ContextMenuGroup=Xs;exports.ContextMenuItem=io;exports.ContextMenuLabel=co;exports.ContextMenuPortal=Ks;exports.ContextMenuRadioGroup=qs;exports.ContextMenuRadioItem=lo;exports.ContextMenuSeparator=po;exports.ContextMenuShortcut=uo;exports.ContextMenuSub=Hs;exports.ContextMenuSubContent=ao;exports.ContextMenuSubTrigger=oo;exports.ContextMenuTrigger=$s;exports.DataTable=ir;exports.Drawer=ho;exports.DrawerClose=Ys;exports.DrawerContent=go;exports.DrawerDescription=yo;exports.DrawerFooter=xo;exports.DrawerHeader=bo;exports.DrawerOverlay=fn;exports.DrawerPortal=fo;exports.DrawerTitle=vo;exports.DrawerTrigger=Us;exports.DropdownMenu=Ne;exports.DropdownMenuCheckboxItem=je;exports.DropdownMenuContent=ie;exports.DropdownMenuGroup=Je;exports.DropdownMenuItem=Qe;exports.DropdownMenuItemType=cr;exports.DropdownMenuLabel=ke;exports.DropdownMenuPortal=Wn;exports.DropdownMenuRadioGroup=Qn;exports.DropdownMenuRadioItem=tn;exports.DropdownMenuSeparator=we;exports.DropdownMenuShortcut=tr;exports.DropdownMenuSub=Zn;exports.DropdownMenuSubContent=Ze;exports.DropdownMenuSubTrigger=We;exports.DropdownMenuTrigger=Ye;exports.ERROR_DUMP_STRING_KEYS=wr;exports.ERROR_POPOVER_STRING_KEYS=Ga;exports.ErrorDump=lr;exports.ErrorPopover=za;exports.Filter=Ka;exports.FilterDropdown=Ba;exports.Footer=Xa;exports.INVENTORY_STRING_KEYS=es;exports.Input=Ut;exports.Inventory=os;exports.Label=q;exports.MarkdownRenderer=Aa;exports.MoreInfo=Fa;exports.MultiSelectComboBox=pr;exports.NavigationContentSearch=_s;exports.Popover=zt;exports.PopoverContent=Rt;exports.PopoverTrigger=Bt;exports.Progress=No;exports.RadioGroup=ye;exports.RadioGroupItem=ne;exports.RecentSearches=Un;exports.SCOPE_SELECTOR_STRING_KEYS=xs;exports.ScopeSelector=vs;exports.ScriptureResultsViewer=fs;exports.ScrollGroupSelector=ys;exports.SearchBar=Ee;exports.Select=Ot;exports.SelectContent=Ct;exports.SelectGroup=er;exports.SelectItem=lt;exports.SelectLabel=rr;exports.SelectScrollDownButton=nn;exports.SelectScrollUpButton=en;exports.SelectSeparator=or;exports.SelectTrigger=kt;exports.SelectValue=Pt;exports.Separator=_e;exports.SettingsList=Ns;exports.SettingsListHeader=ks;exports.SettingsListItem=js;exports.SettingsSidebar=Mr;exports.SettingsSidebarContentSearch=ws;exports.Sidebar=an;exports.SidebarContent=wn;exports.SidebarFooter=yr;exports.SidebarGroup=he;exports.SidebarGroupAction=jr;exports.SidebarGroupContent=ge;exports.SidebarGroupLabel=fe;exports.SidebarHeader=vr;exports.SidebarInput=xr;exports.SidebarInset=sn;exports.SidebarMenu=ln;exports.SidebarMenuAction=kr;exports.SidebarMenuBadge=Cr;exports.SidebarMenuButton=dn;exports.SidebarMenuItem=cn;exports.SidebarMenuSkeleton=Sr;exports.SidebarMenuSub=_r;exports.SidebarMenuSubButton=Tr;exports.SidebarMenuSubItem=Rr;exports.SidebarProvider=on;exports.SidebarRail=br;exports.SidebarSeparator=Nr;exports.SidebarTrigger=gr;exports.Skeleton=Fe;exports.Slider=jo;exports.Sonner=Js;exports.Spinner=Kr;exports.Switch=ko;exports.TabDropdownMenu=xe;exports.TabFloatingMenu=Ss;exports.TabToolbar=Cs;exports.Table=le;exports.TableBody=de;exports.TableCaption=sr;exports.TableCell=Lt;exports.TableFooter=ar;exports.TableHead=$t;exports.TableHeader=ce;exports.TableRow=xt;exports.Tabs=Ws;exports.TabsContent=_o;exports.TabsList=Co;exports.TabsTrigger=So;exports.TextField=zs;exports.Textarea=Ro;exports.ToggleGroup=rn;exports.ToggleGroupItem=Qt;exports.Toolbar=Os;exports.Tooltip=Te;exports.TooltipContent=pe;exports.TooltipProvider=Re;exports.TooltipTrigger=Me;exports.UiLanguageSelector=Ls;exports.VerticalTabs=un;exports.VerticalTabsContent=hn;exports.VerticalTabsList=mn;exports.VerticalTabsTrigger=Pr;exports.badgeVariants=dr;exports.buttonVariants=qn;exports.cn=d;exports.getBookIdFromUSFM=ts;exports.getLinesFromUSFM=Za;exports.getNumberFromUSFM=Qa;exports.getStatusForItem=hr;exports.getToolbarOSReservedSpaceClassName=Vs;exports.inventoryCountColumn=Ja;exports.inventoryItemColumn=Ua;exports.inventoryStatusColumn=Wa;exports.selectTriggerVariants=nr;exports.useEvent=Zs;exports.useEventAsync=ti;exports.useListbox=ei;exports.usePromise=To;exports.useRecentSearches=Na;exports.useSidebar=ue;function ni(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}ni(`*, ::before, ::after {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`,"after-all");
//# sourceMappingURL=index.cjs.map
