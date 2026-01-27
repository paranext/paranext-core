"use strict";var Ra=Object.defineProperty;var Ta=(e,t,r)=>t in e?Ra(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ct=(e,t,r)=>Ta(e,typeof t!="symbol"?t+"":t,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),ft=require("cmdk"),k=require("lucide-react"),Ma=require("clsx"),Da=require("tailwind-merge"),Ia=require("@radix-ui/react-dialog"),j=require("platform-bible-utils"),Ie=require("@radix-ui/react-slot"),se=require("class-variance-authority"),Oa=require("@radix-ui/react-popover"),Aa=require("@radix-ui/react-label"),Pa=require("@radix-ui/react-radio-group"),b=require("lexical"),Zr=require("@radix-ui/react-tooltip"),$n=require("@lexical/rich-text"),Tr=require("react-dom"),La=require("@lexical/table"),Va=require("@radix-ui/react-toggle-group"),$a=require("@radix-ui/react-toggle"),Qr=require("@lexical/headless"),Ba=require("@radix-ui/react-separator"),Fa=require("@radix-ui/react-avatar"),to=require("@radix-ui/react-dropdown-menu"),wt=require("@tanstack/react-table"),za=require("@radix-ui/react-select"),Ga=require("markdown-to-jsx"),yt=require("@eten-tech-foundation/platform-editor"),Ka=require("@radix-ui/react-checkbox"),Ha=require("@radix-ui/react-tabs"),Ua=require("@radix-ui/react-menubar"),Xa=require("react-hotkeys-hook"),qa=require("@radix-ui/react-context-menu"),Rt=require("vaul"),Ya=require("@radix-ui/react-progress"),Ja=require("react-resizable-panels"),eo=require("sonner"),Wa=require("@radix-ui/react-slider"),Za=require("@radix-ui/react-switch");function at(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const Et=at(Ia),Te=at(Oa),no=at(Aa),He=at(Pa),Je=at(Zr),bn=at(Va),ro=at($a),oo=at(Ba),Oe=at(Fa),Z=at(to),nt=at(za),Bn=at(Ka),ht=at(Ha),Q=at(Ua),tt=at(qa),Fn=at(Ya),Xn=at(Ja),ze=at(Wa),zn=at(Za),Qa=Da.extendTailwindMerge({prefix:"tw-"});function f(...e){return Qa(Ma.clsx(e))}const ti="layoutDirection";function it(){const e=localStorage.getItem(ti);return e==="rtl"?e:"ltr"}const ei=Et.Root,ni=Et.Portal,so=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));so.displayName=Et.Overlay.displayName;const ao=l.forwardRef(({className:e,children:t,...r},o)=>{const s=it();return n.jsxs(ni,{children:[n.jsx(so,{}),n.jsxs(Et.Content,{ref:o,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...r,dir:s,children:[t,n.jsxs(Et.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});ao.displayName=Et.Content.displayName;function io({className:e,...t}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}io.displayName="DialogHeader";const lo=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));lo.displayName=Et.Title.displayName;const ri=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",e),...t}));ri.displayName=Et.Description.displayName;const Bt=l.forwardRef(({className:e,...t},r)=>n.jsx(ft.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Bt.displayName=ft.Command.displayName;const ye=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(ft.Command.Input,{ref:r,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});ye.displayName=ft.Command.Input.displayName;const Ft=l.forwardRef(({className:e,...t},r)=>n.jsx(ft.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Ft.displayName=ft.Command.List.displayName;const Ae=l.forwardRef((e,t)=>n.jsx(ft.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Ae.displayName=ft.Command.Empty.displayName;const $t=l.forwardRef(({className:e,...t},r)=>n.jsx(ft.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));$t.displayName=ft.Command.Group.displayName;const co=l.forwardRef(({className:e,...t},r)=>n.jsx(ft.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",e),...t}));co.displayName=ft.Command.Separator.displayName;const Tt=l.forwardRef(({className:e,...t},r)=>n.jsx(ft.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Tt.displayName=ft.Command.Item.displayName;function wo({className:e,...t}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}wo.displayName="CommandShortcut";var oi=Object.defineProperty,si=(e,t,r)=>t in e?oi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,H=(e,t,r)=>si(e,typeof t!="symbol"?t+"":t,r);const he=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],qn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],po=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Mr=fi();function Pe(e,t=!0){return t&&(e=e.toUpperCase()),e in Mr?Mr[e]:0}function Yn(e){return Pe(e)>0}function ai(e){const t=typeof e=="string"?Pe(e):e;return t>=40&&t<=66}function ii(e){return(typeof e=="string"?Pe(e):e)<=39}function uo(e){return e<=66}function li(e){const t=typeof e=="string"?Pe(e):e;return ho(t)&&!uo(t)}function*ci(){for(let e=1;e<=he.length;e++)yield e}const di=1,mo=he.length;function wi(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Jn(e,t="***"){const r=e-1;return r<0||r>=he.length?t:he[r]}function fo(e){return e<=0||e>mo?"******":po[e-1]}function pi(e){return fo(Pe(e))}function ho(e){const t=typeof e=="number"?Jn(e):e;return Yn(t)&&!qn.includes(t)}function ui(e){const t=typeof e=="number"?Jn(e):e;return Yn(t)&&qn.includes(t)}function mi(e){return po[e-1].includes("*obsolete*")}function fi(){const e={};for(let t=0;t<he.length;t++)e[he[t]]=t+1;return e}const q={allBookIds:he,nonCanonicalIds:qn,bookIdToNumber:Pe,isBookIdValid:Yn,isBookNT:ai,isBookOT:ii,isBookOTNT:uo,isBookDC:li,allBookNumbers:ci,firstBook:di,lastBook:mo,extraBooks:wi,bookNumberToId:Jn,bookNumberToEnglishName:fo,bookIdToEnglishName:pi,isCanonical:ho,isExtraMaterial:ui,isObsolete:mi};var Ot=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ot||{});const xt=class{constructor(t){if(H(this,"name"),H(this,"fullPath"),H(this,"isPresent"),H(this,"hasVerseSegments"),H(this,"isCustomized"),H(this,"baseVersification"),H(this,"scriptureBooks"),H(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ot[t]):(this._type=t,this.name=Ot[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};H(xt,"Original",new xt(Ot.Original)),H(xt,"Septuagint",new xt(Ot.Septuagint)),H(xt,"Vulgate",new xt(Ot.Vulgate)),H(xt,"English",new xt(Ot.English)),H(xt,"RussianProtestant",new xt(Ot.RussianProtestant)),H(xt,"RussianOrthodox",new xt(Ot.RussianOrthodox));let pe=xt;function Dr(e,t){const r=t[0];for(let o=1;o<t.length;o++)e=e.split(t[o]).join(r);return e.split(r)}var go=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(go||{});const mt=class U{constructor(t,r,o,s){if(H(this,"firstChapter"),H(this,"lastChapter"),H(this,"lastVerse"),H(this,"hasSegmentsDefined"),H(this,"text"),H(this,"BBBCCCVVVS"),H(this,"longHashCode"),H(this,"versification"),H(this,"rtlMark","‏"),H(this,"_bookNum",0),H(this,"_chapterNum",0),H(this,"_verseNum",0),H(this,"_verse"),o==null&&s==null)if(t!=null&&typeof t=="string"){const a=t,i=r!=null&&r instanceof pe?r:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof pe?r:void 0;this.setEmpty(a),this._verseNum=t%U.chapterDigitShifter,this._chapterNum=Math.floor(t%U.bookDigitShifter/U.chapterDigitShifter),this._bookNum=Math.floor(t/U.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof U){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof pe?t:U.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&o!=null)if(typeof t=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(s),this.updateInternal(t,r,o);else if(typeof t=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=o,this.versification=s??U.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new U(t),{success:!0,verseRef:r}}catch(o){if(o instanceof $e)return r=new U,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(t,r,o){return t%U.bcvMaxValue*U.bookDigitShifter+(r>=0?r%U.bcvMaxValue*U.chapterDigitShifter:0)+(o>=0?o%U.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:o,verseNum:s,verse:a,versificationStr:i}=t,c=a||s.toString();let w;return i&&(w=new pe(i)),r?new U(r,o.toString(),c,w):new U}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let o;for(let s=0;s<t.length;s++){if(o=t[s],o<"0"||o>"9")return s===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>U.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(U.verseRangeSeparator)||this._verse.includes(U.verseSequenceIndicator))}get book(){return q.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=q.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:o}=U.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=U.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>q.lastBook)throw new $e("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new pe(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(U.verseRangeSeparators,U.verseSequenceIndicators)}get BBBCCC(){return U.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return U.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new pe(Ot[i])}catch{throw new $e("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new $e("Invalid reference : "+t);const o=r[1].split(":"),s=+o[0];if(o.length!==2||q.bookIdToNumber(r[0])===0||!Number.isInteger(s)||s<0||!U.isVerseParseable(o[1]))throw new $e("Invalid reference : "+t);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new U(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof U?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=U.verseRangeSeparators,o=U.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const s=[],a=Dr(this._verse,o);for(const i of a.map(c=>Dr(c,r))){const c=this.clone();c.verse=i[0];const w=c.verseNum;if(s.push(c),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let p=w+1;p<d.verseNum;p++){const m=new U(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||s.push(m)}s.push(d)}}return s}validateVerse(t,r){if(!this.verse)return this.internalValid;let o=0;for(const s of this.allVerses(!0,t,r)){const a=s.internalValid;if(a!==0)return a;const i=s.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>q.lastBook?2:(q.isCanonical(this._bookNum),0)}setEmpty(t=U.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,o){this.bookNum=q.bookIdToNumber(t),this.chapter=r,this.verse=o}};H(mt,"defaultVersification",pe.English),H(mt,"verseRangeSeparator","-"),H(mt,"verseSequenceIndicator",","),H(mt,"verseRangeSeparators",[mt.verseRangeSeparator]),H(mt,"verseSequenceIndicators",[mt.verseSequenceIndicator]),H(mt,"chapterDigitShifter",1e3),H(mt,"bookDigitShifter",mt.chapterDigitShifter*mt.chapterDigitShifter),H(mt,"bcvMaxValue",mt.chapterDigitShifter-1),H(mt,"ValidStatusType",go);let $e=class extends Error{};const xo=(e,t,r,o,s)=>{switch(e){case j.Section.OT:return t??"Old Testament";case j.Section.NT:return r??"New Testament";case j.Section.DC:return o??"Deuterocanon";case j.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},hi=(e,t,r,o,s)=>{switch(e){case j.Section.OT:return t??"OT";case j.Section.NT:return r??"NT";case j.Section.DC:return o??"DC";case j.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function Ee(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??q.bookIdToEnglishName(e)}function Wn(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const bo=q.allBookIds.filter(e=>!q.isObsolete(q.bookIdToNumber(e))),fe=Object.fromEntries(bo.map(e=>[e,q.bookIdToEnglishName(e)]));function Zn(e,t,r){const o=t.trim().toLowerCase();if(!o)return!1;const s=q.bookIdToEnglishName(e),a=r==null?void 0:r.get(e);return!!(j.includes(s.toLowerCase(),o)||j.includes(e.toLowerCase(),o)||(a?j.includes(a.localizedName.toLowerCase(),o)||j.includes(a.localizedId.toLowerCase(),o):!1))}const vo=l.forwardRef(({bookId:e,isSelected:t,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),m=()=>{p.current||r==null||r(e),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(e)},u=l.useMemo(()=>Ee(e,c),[e,c]),g=l.useMemo(()=>Wn(e,c),[e,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===j.Section.OT,"tw-border-s-purple-200":s===j.Section.NT,"tw-border-s-indigo-200":s===j.Section.DC,"tw-border-s-amber-200":s===j.Section.Extra}),children:n.jsxs(Tt,{ref:d,value:w||`${e} ${q.bookIdToEnglishName(e)}`,onSelect:m,onMouseDown:h,role:"option","aria-selected":t,"aria-label":`${q.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:a,children:[i&&n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),yo=se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),L=l.forwardRef(({className:e,variant:t,size:r,asChild:o=!1,...s},a)=>{const i=o?Ie.Slot:"button";return n.jsx(i,{className:f(yo({variant:t,size:r,className:e})),ref:a,...s})});L.displayName="Button";const Ut=Te.Root,Xt=Te.Trigger,gi=Te.Anchor,zt=l.forwardRef(({className:e,align:t="center",sideOffset:r=4,...o},s)=>{const a=it();return n.jsx(Te.Portal,{children:n.jsx(Te.Content,{ref:s,align:t,sideOffset:r,className:f("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:a})})});zt.displayName=Te.Content.displayName;function Gn(e,t,r){return`${e} ${fe[e]}${t?` ${Wn(e,t)} ${Ee(e,t)}`:""}${r?` ${r}`:""}`}function No({recentSearches:e,onSearchItemSelect:t,renderItem:r=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c}){const[w,d]=l.useState(!1);if(e.length===0)return;const p=m=>{t(m),d(!1)};return n.jsxs(Ut,{open:w,onOpenChange:d,children:[n.jsx(Xt,{asChild:!0,children:n.jsx(L,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(zt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Bt,{children:n.jsx(Ft,{children:n.jsx($t,{heading:a,children:e.map(m=>n.jsxs(Tt,{onSelect:()=>p(m),className:f("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(m)})]},o(m)))})})})})]})}function xi(e,t,r=(s,a)=>s===a,o=15){return s=>{const a=e.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];t(i)}}const Sn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},bi=[Sn.BOOK_ONLY,Sn.BOOK_CHAPTER,Sn.BOOK_CHAPTER_VERSE];function Ir(e){const t=/^[a-zA-Z]$/.test(e),r=/^[0-9]$/.test(e);return{isLetter:t,isDigit:r}}function At(e){return j.getChaptersForBook(q.bookIdToNumber(e))}function vi(e,t,r){if(!e.trim()||t.length===0)return;const o=bi.reduce((s,a)=>{if(s)return s;const i=a.exec(e.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let p;const m=t.filter(h=>Zn(h,c,r));if(m.length===1&&([p]=m),!p&&w){if(q.isBookIdValid(c)){const h=c.toUpperCase();t.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&t.includes(h[0])&&([p]=h)}}if(!p&&w){const u=(g=>Object.keys(fe).find(v=>fe[v].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>At(p)&&(h=Math.max(At(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function yi(e,t,r,o){const s=l.useCallback(()=>{if(e.chapterNum>1)o({book:e.book,chapterNum:e.chapterNum-1,verseNum:1});else{const w=t.indexOf(e.book);if(w>0){const d=t[w-1],p=Math.max(At(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[e,t,o]),a=l.useCallback(()=>{const w=At(e.book);if(e.chapterNum<w)o({book:e.book,chapterNum:e.chapterNum+1,verseNum:1});else{const d=t.indexOf(e.book);if(d<t.length-1){const p=t[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[e,t,o]),i=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum>1?e.verseNum-1:0})},[e,o]),c=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum+1})},[e,o]);return l.useMemo(()=>[{onClick:s,disabled:t.length===0||e.chapterNum===1&&t.indexOf(e.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:i,disabled:t.length===0||e.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:t.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:t.length===0||(e.chapterNum===At(e.book)||At(e.book)===-1)&&t.indexOf(e.book)===t.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[e,t,r,s,i,c,a])}function Or({bookId:e,scrRef:t,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(e)return n.jsx($t,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:At(e)},(i,c)=>c+1).map(i=>n.jsx(Tt,{value:`${e} ${fe[e]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":e===t.book&&i===t.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function Ni({scrRef:e,handleSubmit:t,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w}){const d=it(),[p,m]=l.useState(!1),[h,u]=l.useState(""),[g,v]=l.useState(""),[x,N]=l.useState("books"),[_,R]=l.useState(void 0),[V,$]=l.useState(!1),P=l.useRef(void 0),y=l.useRef(void 0),S=l.useRef(void 0),C=l.useRef(void 0),T=l.useRef({}),E=l.useCallback(I=>{t(I),c&&c(I)},[t,c]),A=l.useMemo(()=>o?o():bo,[o]),G=l.useMemo(()=>({[j.Section.OT]:A.filter(K=>q.isBookOT(K)),[j.Section.NT]:A.filter(K=>q.isBookNT(K)),[j.Section.DC]:A.filter(K=>q.isBookDC(K)),[j.Section.Extra]:A.filter(K=>q.extraBooks().includes(K))}),[A]),O=l.useMemo(()=>Object.values(G).flat(),[G]),z=l.useMemo(()=>{if(!g.trim())return G;const I={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return[j.Section.OT,j.Section.NT,j.Section.DC,j.Section.Extra].forEach(et=>{I[et]=G[et].filter(rt=>Zn(rt,g,s))}),I},[G,g,s]),D=l.useMemo(()=>vi(g,O,s),[g,O,s]),F=l.useCallback(()=>{D&&(E({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),m(!1),v(""),u(""))},[E,D]),ot=l.useCallback(I=>{if(At(I)<=1){E({book:I,chapterNum:1,verseNum:1}),m(!1),v("");return}R(I),N("chapters")},[E]),pt=l.useCallback(I=>{const K=x==="chapters"?_:D==null?void 0:D.book;K&&(E({book:K,chapterNum:I,verseNum:1}),m(!1),N("books"),R(void 0),v(""))},[E,x,_,D]),Kt=l.useCallback(I=>{E(I),m(!1),v("")},[E]),lt=yi(e,O,d,t),B=l.useCallback(()=>{N("books"),R(void 0),setTimeout(()=>{y.current&&y.current.focus()},0)},[]),J=l.useCallback(I=>{if(!I&&x==="chapters"){B();return}m(I),I&&(N("books"),R(void 0),v(""))},[x,B]),{otLong:ut,ntLong:gt,dcLong:vt,extraLong:ie}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},en=l.useCallback(I=>xo(I,ut,gt,vt,ie),[ut,gt,vt,ie]),Ve=l.useCallback(I=>D?!!D.chapterNum&&!I.toString().includes(D.chapterNum.toString()):!1,[D]),Jt=l.useMemo(()=>j.formatScrRef(e,s?Ee(e.book,s):"English"),[e,s]),kt=l.useCallback(I=>K=>{T.current[I]=K},[]),nn=l.useCallback(I=>{(I.key==="Home"||I.key==="End")&&I.stopPropagation()},[]),_e=l.useCallback(I=>{if(I.ctrlKey)return;const{isLetter:K,isDigit:et}=Ir(I.key);if(x==="chapters"){if(I.key==="Backspace"){I.preventDefault(),I.stopPropagation(),B();return}if(K||et){if(I.preventDefault(),I.stopPropagation(),N("books"),R(void 0),et&&_){const rt=fe[_];v(`${rt} ${I.key}`)}else v(I.key);setTimeout(()=>{y.current&&y.current.focus()},0);return}}if((x==="chapters"||x==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(I.key)){const rt=x==="chapters"?_:D==null?void 0:D.book;if(!rt)return;const W=(()=>{if(!h)return 1;const de=h.match(/(\d+)$/);return de?parseInt(de[1],10):0})(),Ht=At(rt);if(!Ht)return;let _t=W;const ce=6;switch(I.key){case"ArrowLeft":W!==0&&(_t=W>1?W-1:Ht);break;case"ArrowRight":W!==0&&(_t=W<Ht?W+1:1);break;case"ArrowUp":_t=W===0?Ht:Math.max(1,W-ce);break;case"ArrowDown":_t=W===0?1:Math.min(Ht,W+ce);break;default:return}_t!==W&&(I.preventDefault(),I.stopPropagation(),u(Gn(rt,s,_t)),setTimeout(()=>{const de=T.current[_t];de&&de.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,D,B,_,h,s]),le=l.useCallback(I=>{if(I.shiftKey||I.key==="Tab"||I.key===" ")return;const{isLetter:K,isDigit:et}=Ir(I.key);(K||et)&&(I.preventDefault(),v(rt=>rt+I.key),y.current.focus(),$(!1))},[]);return l.useLayoutEffect(()=>{const I=setTimeout(()=>{if(p&&x==="books"&&S.current&&C.current){const K=S.current,et=C.current,rt=et.offsetTop,W=K.clientHeight,Ht=et.clientHeight,_t=rt-W/2+Ht/2;K.scrollTo({top:Math.max(0,_t),behavior:"smooth"}),u(Gn(e.book))}},0);return()=>{clearTimeout(I)}},[p,x,g,D,e.book]),l.useLayoutEffect(()=>{if(x==="chapters"&&_){const I=_===e.book;setTimeout(()=>{if(S.current)if(I){const K=T.current[e.chapterNum];K&&K.scrollIntoView({block:"center",behavior:"smooth"})}else S.current.scrollTo({top:0});P.current&&P.current.focus()},0)}},[x,_,D,e.book,e.chapterNum]),n.jsxs(Ut,{open:p,onOpenChange:J,children:[n.jsx(Xt,{asChild:!0,children:n.jsx(L,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Jt})})}),n.jsx(zt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Bt,{ref:P,onKeyDown:_e,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[x==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(ye,{ref:y,value:g,onValueChange:v,onKeyDown:nn,onFocus:()=>$(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(No,{recentSearches:i,onSearchItemSelect:Kt,renderItem:I=>j.formatScrRef(I,"English"),getItemKey:I=>`${I.book}-${I.chapterNum}-${I.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:lt.map(({onClick:I,disabled:K,title:et,icon:rt})=>n.jsx(L,{variant:"ghost",size:"sm",onClick:()=>{$(!0),I()},disabled:K,className:"tw-h-10 tw-w-4 tw-p-0",title:et,onKeyDown:le,children:n.jsx(rt,{})},et))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(L,{variant:"ghost",size:"sm",onClick:B,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),_&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ee(_,s)})]}),!V&&n.jsxs(Ft,{ref:S,children:[x==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(z).map(([I,K])=>{if(K.length!==0)return n.jsx($t,{heading:en(I),children:K.map(et=>n.jsx(vo,{bookId:et,onSelect:rt=>ot(rt),section:j.getSectionForBook(et),commandValue:`${et} ${fe[et]}`,ref:et===e.book?C:void 0,localizedBookNames:s},et))},I)}),D&&n.jsx($t,{children:n.jsx(Tt,{value:`${D.book} ${fe[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:F,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?Wn(D.book,s):void 0)},"top-match")}),D&&At(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ee(D.book,s)}),n.jsx(Or,{bookId:D.book,scrRef:e,onChapterSelect:pt,setChapterRef:kt,isChapterDimmed:Ve,className:"tw-px-4 tw-pb-4"})]})]}),x==="chapters"&&_&&n.jsx(Or,{bookId:_,scrRef:e,onChapterSelect:pt,setChapterRef:kt,className:"tw-p-4"})]})]})})]})}const ji=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),ki=se.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),st=l.forwardRef(({className:e,...t},r)=>n.jsx(no.Root,{ref:r,className:f("pr-twp",ki(),e),...t}));st.displayName=no.Root.displayName;const vn=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsx(He.Root,{className:f("pr-twp tw-grid tw-gap-2",e),...t,ref:r,dir:o})});vn.displayName=He.Root.displayName;const Ue=l.forwardRef(({className:e,...t},r)=>n.jsx(He.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:n.jsx(He.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ue.displayName=He.Item.displayName;function _i(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function dn({id:e,options:t=[],className:r,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=_i,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:m="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:x,...N}){const[_,R]=l.useState(!1),V=w??c,$=y=>y.length>0&&typeof y[0]=="object"&&"options"in y[0],P=(y,S)=>{const C=c(y),T=typeof y=="object"&&"secondaryLabel"in y?y.secondaryLabel:void 0,E=`${S??""}${C}${T??""}`;return n.jsxs(Tt,{value:C,onSelect:()=>{i(y),R(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==C})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[C,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},E)};return n.jsxs(Ut,{open:_,onOpenChange:R,...N,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(L,{variant:u,role:"combobox","aria-expanded":_,"aria-label":x,id:e,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?V(a):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(zt,{align:g,className:f("tw-w-[200px] tw-p-0",s),children:n.jsxs(Bt,{children:[n.jsx(ye,{placeholder:m,className:"tw-text-inherit"}),n.jsx(Ae,{children:h}),n.jsx(Ft,{children:$(t)?t.map(y=>n.jsx($t,{heading:y.groupHeading,children:y.options.map(S=>P(S,y.groupHeading))},y.groupHeading)):t.map(y=>P(y))})]})})]})}function jo({startChapter:e,endChapter:t,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,p)=>p+1),[a]),c=d=>{r(d),d>t&&o(d)},w=d=>{o(d),d<e&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(st,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(dn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),n.jsx(st,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(dn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var ko=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(ko||{});const Ci=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),En=(e,t)=>e[t]??t;function Si({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=En(d,"%webView_bookSelector_currentBook%"),m=En(d,"%webView_bookSelector_choose%"),h=En(d,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),v=x=>{g(x),e(x)};return n.jsx(vn,{className:"pr-twp tw-flex",value:u,onValueChange:x=>v(x),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ue,{value:"current book"}),n.jsx(st,{className:"tw-ms-1",children:p})]}),n.jsx(st,{className:"tw-flex tw-items-center",children:t}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(jo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ue,{value:"choose books"}),n.jsx(st,{className:"tw-ms-1",children:h})]}),n.jsx(st,{className:"tw-flex tw-items-center",children:o.map(x=>q.bookIdToEnglishName(x)).join(", ")}),n.jsx(L,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}const _o=l.createContext(null);function Ei(e,t){return{getTheme:function(){return t??null}}}function Gt(){const e=l.useContext(_o);return e==null&&function(t,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const Co=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ri=Co?l.useLayoutEffect:l.useEffect,on={tag:b.HISTORY_MERGE_TAG};function Ti({initialConfig:e,children:t}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=e,d=Ei(null,o),p=b.createEditor({editable:e.editable,html:w,namespace:s,nodes:a,onError:m=>i(m,p),theme:o});return function(m,h){if(h!==null){if(h===void 0)m.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const v=Co?document.activeElement:null;(b.$getSelection()!==null||v!==null&&v===m.getRootElement())&&g.select()}},on);else if(h!==null)switch(typeof h){case"string":{const u=m.parseEditorState(h);m.setEditorState(u,on);break}case"object":m.setEditorState(h,on);break;case"function":m.update(()=>{b.$getRoot().isEmpty()&&h(m)},on)}}}(p,c),[p,d]},[]);return Ri(()=>{const o=e.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(_o.Provider,{value:r,children:t})}const Mi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Di({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:r}){const[o]=Gt();return Mi(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{t&&a.size===0&&i.size===0||e&&w.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,e,t,r]),null}const Qn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Nt=Je.Provider,St=Je.Root,Lt=Je.Trigger,jt=l.forwardRef(({className:e,sideOffset:t=4,...r},o)=>n.jsx(Je.Content,{ref:o,sideOffset:t,className:f("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r}));jt.displayName=Je.Content.displayName;const tr=[$n.HeadingNode,b.ParagraphNode,b.TextNode,$n.QuoteNode],Ii=l.createContext(null),Rn={didCatch:!1,error:null};class Oi extends l.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Rn}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(Rn)}}componentDidCatch(t,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,r)}componentDidUpdate(t,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Ai(t.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(Rn)}}render(){const{children:t,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=t;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(Ii.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ai(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((r,o)=>!Object.is(r,t[o]))}function Pi({children:e,onError:t}){return n.jsx(Oi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const Li=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Vi(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function $i(){return function(e){const[t]=Gt(),r=l.useMemo(()=>e(t),[t,e]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return Li(()=>{const{initialValueFn:i,subscribe:c}=r,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,e]),o}(Vi)}function Bi(e,t,r="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!b.$isTokenOrSegmented(t)&&o!==null){const[s,a]=o,i=e.isBackward(),c=s.getNode(),w=a.getNode(),d=t.is(c),p=t.is(w);if(d||p){const[m,h]=b.$getCharacterOffsets(e),u=c.is(w),g=t.is(i?w:c),v=t.is(i?c:w);let x,N=0;u?(N=m>h?h:m,x=m>h?m:h):g?(N=i?h:m,x=void 0):v&&(N=0,x=i?m:h);const _=t.__text.slice(N,x);_!==t.__text&&(r==="clone"&&(t=b.$cloneWithPropertiesEphemeral(t)),t.__text=_)}}return t}function Fi(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const So=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,zi=So&&"documentMode"in document?document.documentMode:null;!(!So||!("InputEvent"in window)||zi)&&"getTargetRanges"in new window.InputEvent("input");function Eo(...e){const t=[];for(const r of e)if(r&&typeof r=="string")for(const[o]of r.matchAll(/\S+/g))t.push(o);return t}function ee(...e){return()=>{for(let t=e.length-1;t>=0;t--)e[t]();e.length=0}}function Ro(e,...t){const r=Eo(...t);r.length>0&&e.classList.add(...r)}function Gi(e,...t){const r=Eo(...t);r.length>0&&e.classList.remove(...r)}function Ar(e){const t=b.$findMatchingParent(e,r=>b.$isElementNode(r)&&!r.isInline());return b.$isElementNode(t)||Fi(4,e.__key),t}function Ki(e,t){const r=[];for(let o=0;o<e.length;o++){const s=t(e[o]);s!==null&&r.push(s)}return r}const Hi=Symbol.for("preact-signals");function yn(){if(Qt>1)return void Qt--;let e,t=!1;for(;Ge!==void 0;){let r=Ge;for(Ge=void 0,Kn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&To(r))try{r.c()}catch(s){t||(e=s,t=!0)}r=o}}if(Kn=0,Qt--,t)throw e}function Ui(e){if(Qt>0)return e();Qt++;try{return e()}finally{yn()}}let X,Ge;function Pr(e){const t=X;X=void 0;try{return e()}finally{X=t}}let Qt=0,Kn=0,ln=0;function Lr(e){if(X===void 0)return;let t=e.n;return t===void 0||t.t!==X?(t={i:0,S:e,p:X.s,n:void 0,t:X,e:void 0,x:void 0,r:t},X.s!==void 0&&(X.s.n=t),X.s=t,e.n=t,32&X.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=X.s,t.n=void 0,X.s.n=t,X.s=t),t):void 0}function dt(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Xe(e,t){return new dt(e,t)}function To(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Vr(e){for(let t=e.s;t!==void 0;t=t.n){const r=t.S.n;if(r!==void 0&&(t.r=r),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Mo(e){let t,r=e.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):t=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}e.s=t}function ue(e,t){dt.call(this,void 0),this.x=e,this.s=void 0,this.g=ln-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Xi(e,t){return new ue(e,t)}function Do(e){const t=e.u;if(e.u=void 0,typeof t=="function"){Qt++;const r=X;X=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,er(e),o}finally{X=r,yn()}}}function er(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Do(e)}function qi(e){if(X!==this)throw new Error("Out-of-order effect");Mo(this),X=e,this.f&=-2,8&this.f&&er(this),yn()}function Se(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function ne(e,t){const r=new Se(e,t);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function Nn(e,t={}){const r={};for(const o in e){const s=t[o],a=Xe(s===void 0?e[o]:s);r[o]=a}return r}dt.prototype.brand=Hi,dt.prototype.h=function(){return!0},dt.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:Pr(()=>{var r;(r=this.W)==null||r.call(this)}))},dt.prototype.U=function(e){if(this.t!==void 0){const t=e.e,r=e.x;t!==void 0&&(t.x=r,e.e=void 0),r!==void 0&&(r.e=t,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Pr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},dt.prototype.subscribe=function(e){return ne(()=>{const t=this.value,r=X;X=void 0;try{e(t)}finally{X=r}},{name:"sub"})},dt.prototype.valueOf=function(){return this.value},dt.prototype.toString=function(){return this.value+""},dt.prototype.toJSON=function(){return this.value},dt.prototype.peek=function(){const e=X;X=void 0;try{return this.value}finally{X=e}},Object.defineProperty(dt.prototype,"value",{get(){const e=Lr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(Kn>100)throw new Error("Cycle detected");this.v=e,this.i++,ln++,Qt++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{yn()}}}}),ue.prototype=new dt,ue.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ln))return!0;if(this.g=ln,this.f|=1,this.i>0&&!To(this))return this.f&=-2,!0;const e=X;try{Vr(this),X=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return X=e,Mo(this),this.f&=-2,!0},ue.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}dt.prototype.S.call(this,e)},ue.prototype.U=function(e){if(this.t!==void 0&&(dt.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},ue.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(ue.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=Lr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),Se.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},Se.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Do(this),Vr(this),Qt++;const e=X;return X=this,qi.bind(this,e)},Se.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ge,Ge=this)},Se.prototype.d=function(){this.f|=8,1&this.f||er(this)},Se.prototype.dispose=function(){this.d()};b.defineExtension({build:(e,t,r)=>Nn(t),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,r){const o=r.getOutput();return ne(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Io(){const e=b.$getRoot(),t=b.$getSelection(),r=b.$createParagraphNode();e.clear(),e.append(r),t!==null&&r.select(),b.$isRangeSelection(t)&&(t.format=0)}function Oo(e,t=Io){return e.registerCommand(b.CLEAR_EDITOR_COMMAND,r=>(e.update(t),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(e,t,r)=>Nn(t),config:b.safeCast({$onClear:Io}),name:"@lexical/extension/ClearEditor",register(e,t,r){const{$onClear:o}=r.getOutput();return ne(()=>Oo(e,o.value))}});function Yi(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function Ao(e,t){let r;return Xe(e(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=e(),r=t(this)}})}const Hn=b.defineExtension({build:e=>Ao(()=>e.getEditorState(),t=>e.registerUpdateListener(r=>{t.value=r.editorState})),name:"@lexical/extension/EditorState"});function Y(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Po(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const r=e,o=t;for(const s in o)r[s]=Po(r[s],o[s]);return e}return t}const nr=0,Un=1,Lo=2,Tn=3,sn=4,Ce=5,Mn=6,Be=7;function Dn(e){return e.id===nr}function Vo(e){return e.id===Lo}function Ji(e){return function(t){return t.id===Un}(e)||Y(305,String(e.id),String(Un)),Object.assign(e,{id:Lo})}const Wi=new Set;class Zi{constructor(t,r){ct(this,"builder");ct(this,"configs");ct(this,"_dependency");ct(this,"_peerNameSet");ct(this,"extension");ct(this,"state");ct(this,"_signal");this.builder=t,this.extension=r,this.configs=new Set,this.state={id:nr}}mergeConfigs(){let t=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)t=r(t,o);return t}init(t){const r=this.state;Vo(r)||Y(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:Tn,registerState:d})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(t,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:sn,initResult:w,registerState:d})}(a,i,s)}build(t){const r=this.state;let o;r.id!==sn&&Y(307,String(r.id),String(Ce)),this.extension.build&&(o=this.extension.build(t,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:Ce,output:i,registerState:c})}(r,o,s)}register(t,r){this._signal=r;const o=this.state;o.id!==Ce&&Y(308,String(o.id),String(Ce));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:Mn})}(o),()=>{const a=this.state;a.id!==Be&&Y(309,String(o.id),String(Be)),this.state=function(i){return Object.assign(i,{id:Ce})}(a),s&&s()}}afterRegistration(t){const r=this.state;let o;return r.id!==Mn&&Y(310,String(r.id),String(Mn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Be})}(r),o}getSignal(){return this._signal===void 0&&Y(311),this._signal}getInitResult(){this.extension.init===void 0&&Y(312,this.extension.name);const t=this.state;return function(r){return r.id>=sn}(t)||Y(313,String(t.id),String(sn)),t.initResult}getInitPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(r){return r.id>=Tn}(t)||Y(314,String(t.id),String(Tn)),{config:t.config}}getPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionDependency():void 0}getInitDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&Y(315,this.extension.name,t.name),r.getExtensionInitDependency()}getDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&Y(315,this.extension.name,t.name),r.getExtensionDependency()}getState(){const t=this.state;return function(r){return r.id>=Be}(t)||Y(316,String(t.id),String(Be)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Wi}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(r){return r.id>=Ce})(t)||Y(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const $r={tag:b.HISTORY_MERGE_TAG};function Qi(){const e=b.$getRoot();e.isEmpty()&&e.append(b.$createParagraphNode())}const tl=b.defineExtension({config:b.safeCast({setOptions:$r,updateOptions:$r}),init:({$initialEditorState:e=Qi})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))e.setEditorState(a,r);else if(typeof a=="function")e.update(()=>{a(e)},t);else if(a&&(typeof a=="string"||typeof a=="object")){const i=e.parseEditorState(a);e.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),Br=Symbol.for("@lexical/extension/LexicalBuilder");function Fr(){}function el(e){throw e}function an(e){return Array.isArray(e)?e:[e]}const In="0.38.2+prod.esm";class Ke{constructor(t){ct(this,"roots");ct(this,"extensionNameMap");ct(this,"outgoingConfigEdges");ct(this,"incomingEdges");ct(this,"conflicts");ct(this,"_sortedExtensionReps");ct(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=In,this.roots=t;for(const r of t)this.addExtension(r)}static fromExtensions(t){const r=[an(tl)];for(const o of t)r.push(an(o));return new Ke(r)}static maybeFromEditor(t){const r=t[Br];return r&&(r.PACKAGE_VERSION!==In&&Y(292,r.PACKAGE_VERSION,In),r instanceof Ke||Y(293)),r}static fromEditor(t){const r=Ke.maybeFromEditor(t);return r===void 0&&Y(294),r}constructEditor(){const{$initialEditorState:t,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Br]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let t=Fr;function r(){try{t()}finally{t=Fr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return t=ee(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const r=this.extensionNameMap.get(t.name);if(r)return r.extension!==t&&Y(295,t.name),r}addEdge(t,r,o){const s=this.outgoingConfigEdges.get(t);s?s.set(r,o):this.outgoingConfigEdges.set(t,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(t):this.incomingEdges.set(r,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&Y(296);const r=an(t),[o]=r;typeof o.name!="string"&&Y(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&Y(298,o.name),!s){s=new Zi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&Y(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&Y(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=an(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],r=(o,s)=>{let a=o.state;if(Vo(a))return;const i=o.extension.name;var c;Dn(a)||Y(300,i,s||"[unknown]"),Dn(c=a)||Y(304,String(c.id),String(nr)),a=Object.assign(c,{id:Un}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,i)}a=Ji(a),o.state=a,t.push(o)};for(const o of this.extensionNameMap.values())Dn(o.state)&&r(o);for(const o of t)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&Y(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(t,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(t);c&&s.push(c)}return ee(...s)}buildCreateEditorArgs(){const t={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(t.onError=m.onError),m.disableEvents!==void 0&&(t.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(t.parentEditor=m.parentEditor),m.editable!==void 0&&(t.editable=m.editable),m.namespace!==void 0&&(t.namespace=m.namespace),m.$initialEditorState!==void 0&&(t.$initialEditorState=m.$initialEditorState),m.nodes)for(const h of Yi(m)){if(typeof h!="function"){const u=o.get(h.replace);u&&Y(302,m.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(m.html){if(m.html.export)for(const[h,u]of m.html.export.entries())s.set(h,u);m.html.import&&Object.assign(a,m.html.import)}m.theme&&Po(i,m.theme)}Object.keys(i).length>0&&(t.theme=i),r.size&&(t.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(t.html={},w&&(t.html.import=a),d&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=el),t}}const nl=new Set,zr=b.defineExtension({build(e,t,r){const o=r.getDependency(Hn).output,s=Xe({watchedNodeKeys:new Map}),a=Ao(()=>{},()=>ne(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const h=b.$getNodeByKey(p),u=h&&h.isSelected()||!1;d=d||u!==(!!i&&i.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=Xi(()=>(a.value||nl).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Hn],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Me extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new Me(t.__key)}static importJSON(t){return $o().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:rl,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const r=document.createElement("hr");return Ro(r,t.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function rl(){return{node:$o()}}function $o(){return b.$create(Me)}function ol(e){return e instanceof Me}b.defineExtension({dependencies:[Hn,zr],name:"@lexical/extension/HorizontalRule",nodes:[Me],register(e,t,r){const{watchNodeKey:o}=r.getDependency(zr).output,s=Xe({nodeSelections:new Map}),a=e._config.theme.hrSelected??"selected";return ee(e.registerCommand(b.CLICK_COMMAND,i=>{if(b.isDOMNode(i.target)){const c=b.$getNodeFromDOMNode(i.target);if(ol(c))return function(w,d=!1){const p=b.$getSelection(),m=w.isSelected(),h=w.getKey();let u;d&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),m?u.delete(h):u.add(h)}(c,i.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),e.registerMutationListener(Me,(i,c)=>{Ui(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,m]of i.entries())if(m==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),u=e.getElementByKey(p);h?h.domNode.value=u:(w=!0,d.set(p,{domNode:Xe(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),ne(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(ne(()=>{const d=c.value;d&&(w.value?Ro(d,a):Gi(d,a))}));return ee(...i)}))}});function sl(e,t){return ee(e.registerCommand(b.KEY_TAB_COMMAND,r=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;r.preventDefault();const s=function(a){const i=a.getNodes();if(Ki(i,h=>b.$isBlockElementNode(h)&&h.canIndent()?h:null).length>0)return!0;const c=a.anchor,w=a.focus,d=w.isBefore(c)?w:c,p=d.getNode(),m=Ar(p);if(m.canIndent()){const h=m.getKey();let u=b.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(o)?r.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),e.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const r=typeof t=="number"?t:t?t.peek():null;if(r==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>Ar(a).getIndent());return Math.max(...s)+1>=r},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(e,t,r)=>Nn(t),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,r){const{disabled:o,maxIndent:s}=r.getOutput();return ne(()=>{if(!o.value)return sl(e,s)})}});const al=b.defineExtension({name:"@lexical/react/ReactProvider"});function il(){return b.$getRoot().getTextContent()}function ll(e,t=!0){if(e)return!1;let r=il();return t&&(r=r.trim()),r===""}function cl(e){if(!ll(e,!1))return!1;const t=b.$getRoot().getChildren(),r=t.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=t[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!b.$isTextNode(w))return!1}}}return!0}function Bo(e){return()=>cl(e)}function Fo(e){const t=window.location.origin,r=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,m,h,u]=w;e.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const v=g.anchor;let x=v.getNode(),N=0,_=0;if(b.$isTextNode(x)&&d>=0&&p>=0&&(N=d,_=d+p,g.setTextNodeRange(x,N,x,_)),N===_&&m===""||(g.insertRawText(m),x=v.getNode()),b.$isTextNode(x)){N=h,_=h+u;const R=x.getTextContentSize();N=N>R?R:N,_=_>R?R:_,g.setTextNodeRange(x,N,x,_)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}b.defineExtension({build:(e,t,r)=>Nn(t),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,r)=>ne(()=>r.getOutput().disabled.value?void 0:Fo(e))});function dl(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const rr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function wl({editor:e,ErrorBoundary:t}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return rr(()=>r.registerDecoratorListener(i=>{Tr.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&i.push(Tr.createPortal(p,m,d))}return i},[o,s,r])}(e,t)}function pl({editor:e,ErrorBoundary:t}){return function(r){const o=Ke.maybeFromEditor(r);if(o&&o.hasExtensionByName(al.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&dl(320,s);return!0}return!1}(e)?null:n.jsx(wl,{editor:e,ErrorBoundary:t})}function Gr(e){return e.getEditorState().read(Bo(e.isComposing()))}function ul({contentEditable:e,placeholder:t=null,ErrorBoundary:r}){const[o]=Gt();return function(s){rr(()=>ee($n.registerRichText(s),Fo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[e,n.jsx(ml,{content:t}),n.jsx(pl,{editor:o,ErrorBoundary:r})]})}function ml({content:e}){const[t]=Gt(),r=function(s){const[a,i]=l.useState(()=>Gr(s));return rr(()=>{function c(){const w=Gr(s);i(w)}return c(),ee(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(t),o=$i();return r?typeof e=="function"?e(o):e:null}function fl({defaultSelection:e}){const[t]=Gt();return l.useEffect(()=>{t.focus(()=>{const r=document.activeElement,o=t.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const hl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function gl({onClear:e}){const[t]=Gt();return hl(()=>Oo(t,e),[t,e]),null}const zo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function xl({editor:e,ariaActiveDescendant:t,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:m,ariaRequired:h,autoCapitalize:u,className:g,id:v,role:x="textbox",spellCheck:N=!0,style:_,tabIndex:R,"data-testid":V,...$},P){const[y,S]=l.useState(e.isEditable()),C=l.useCallback(E=>{E&&E.ownerDocument&&E.ownerDocument.defaultView?e.setRootElement(E):e.setRootElement(null)},[e]),T=l.useMemo(()=>function(...E){return A=>{for(const G of E)typeof G=="function"?G(A):G!=null&&(G.current=A)}}(P,C),[C,P]);return zo(()=>(S(e.isEditable()),e.registerEditableListener(E=>{S(E)})),[e]),n.jsx("div",{"aria-activedescendant":y?t:void 0,"aria-autocomplete":y?r:"none","aria-controls":y?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":y&&x==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":y?m:void 0,"aria-readonly":!y||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:y,"data-testid":V,id:v,ref:T,role:x,spellCheck:N,style:_,tabIndex:R,...$})}const bl=l.forwardRef(xl);function Kr(e){return e.getEditorState().read(Bo(e.isComposing()))}const vl=l.forwardRef(yl);function yl(e,t){const{placeholder:r,...o}=e,[s]=Gt();return n.jsxs(n.Fragment,{children:[n.jsx(bl,{editor:s,...o,ref:t}),r!=null&&n.jsx(Nl,{editor:s,content:r})]})}function Nl({content:e,editor:t}){const r=function(i){const[c,w]=l.useState(()=>Kr(i));return zo(()=>{function d(){const p=Kr(i);w(p)}return d(),ee(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(t),[o,s]=l.useState(t.isEditable());if(l.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(i=>{s(i)})),[t]),!r)return null;let a=null;return typeof e=="function"?a=e(o):e!==null&&(a=e),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function jl({placeholder:e,className:t,placeholderClassName:r}){return n.jsx(vl,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const Go=l.createContext(void 0);function kl({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s}),[e,t,r,o,s]);return n.jsx(Go.Provider,{value:i,children:a})}function Ko(){const e=l.useContext(Go);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function _l(){const[e,t]=l.useState(void 0),r=l.useCallback(()=>{t(void 0)},[]),o=l.useMemo(()=>{if(e===void 0)return;const{title:a,content:i}=e;return n.jsx(ei,{open:!0,onOpenChange:r,children:n.jsxs(ao,{children:[n.jsx(io,{children:n.jsx(lo,{children:a})}),i]})})},[e,r]),s=l.useCallback((a,i,c=!1)=>{t({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function Cl({children:e}){const[t]=Gt(),[r,o]=l.useState(t),[s,a]=l.useState("paragraph"),[i,c]=_l(),w=()=>{};return l.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(kl,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,e({blockType:s})]})}function Sl(e){const[t]=Gt(),{activeEditor:r}=Ko();l.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&e(o),!1},b.COMMAND_PRIORITY_CRITICAL),[t,e]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=b.$getSelection();o&&e(o)})},[r,e])}const Ho=se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),El=l.forwardRef(({className:e,variant:t,size:r,...o},s)=>n.jsx(ro.Root,{ref:s,className:f(Ho({variant:t,size:r,className:e})),...o}));El.displayName=ro.Root.displayName;const Uo=l.createContext({size:"default",variant:"default"}),jn=l.forwardRef(({className:e,variant:t,size:r,children:o,...s},a)=>{const i=it();return n.jsx(bn.Root,{ref:a,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:i,children:n.jsx(Uo.Provider,{value:{variant:t,size:r},children:o})})});jn.displayName=bn.Root.displayName;const Re=l.forwardRef(({className:e,children:t,variant:r,size:o,...s},a)=>{const i=l.useContext(Uo);return n.jsx(bn.Item,{ref:a,className:f(Ho({variant:i.variant||r,size:i.size||o}),e),...s,children:t})});Re.displayName=bn.Item.displayName;const Hr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function Rl(){const{activeEditor:e}=Ko(),[t,r]=l.useState([]),o=l.useCallback(s=>{if(b.$isRangeSelection(s)||La.$isTableSelection(s)){const a=[];Hr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return Sl(o),n.jsx(jn,{type:"multiple",value:t,onValueChange:r,variant:"outline",size:"sm",children:Hr.map(({format:s,icon:a,label:i})=>n.jsx(Re,{value:s,"aria-label":i,onClick:()=>{e.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Tl({onClear:e}){const[t]=Gt();l.useEffect(()=>{e&&e(()=>{t.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function Ml({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Cl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Rl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(ul,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(jl,{placeholder:e})}),ErrorBoundary:Pi}),t&&n.jsx(fl,{defaultSelection:"rootEnd"}),n.jsx(Tl,{onClear:r}),n.jsx(gl,{})]})]})}const Dl={namespace:"commentEditor",theme:Qn,nodes:tr,onError:e=>{console.error(e)}};function wn({editorState:e,editorSerializedState:t,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i}){return n.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:n.jsx(Ti,{initialConfig:{...Dl,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:n.jsxs(Nt,{children:[n.jsx(Ml,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(Di,{ignoreSelectionChange:!0,onChange:c=>{r==null||r(c),o==null||o(c.toJSON())}})]})})})}function Il(e,t){const r=b.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const a of r)if(!qo.has(a.nodeName)){const i=Yo(a,e,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&i.insertAfter(b.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function Ol(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)Xo(e,o[s],r,t);return r.innerHTML}function Xo(e,t,r,o=null){let s=o===null||t.isSelected(o);const a=b.$isElementNode(t)&&t.excludeFromCopy("html");let i=t;o!==null&&b.$isTextNode(t)&&(i=Bi(o,t,"clone"));const c=b.$isElementNode(i)?i.getChildren():[],w=b.getRegisteredNode(e,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(e,i):i.exportDOM(e);const{element:p,after:m}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],v=Xo(e,g,h,o);!s&&b.$isElementNode(t)&&v&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(h),r.append(p),m){const u=m.call(i,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const qo=new Set(["STYLE","SCRIPT"]);function Yo(e,t,r,o,s=new Map,a){let i=[];if(qo.has(e.nodeName))return i;let c=null;const w=function(g,v){const{nodeName:x}=g,N=v._htmlConversions.get(x.toLowerCase());let _=null;if(N!==void 0)for(const R of N){const V=R(g);V!==null&&(_===null||(_.priority||0)<=(V.priority||0))&&(_=V)}return _!==null?_.conversion:null}(e,t),d=w?w(e):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(e.nodeName,d.forChild)}const m=e.childNodes;let h=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<m.length;g++)h.push(...Yo(m[g],t,r,u,new Map(s),c));return p!=null&&(h=p(h)),b.isBlockDomNode(e)&&(h=Al(e,h,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return r.push(g),g}:b.$createParagraphNode)),c==null?h.length>0?i=i.concat(h):b.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(e)&&(i=i.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...h),i}function Al(e,t,r){const o=e.style.textAlign,s=[];let a=[];for(let i=0;i<t.length;i++){const c=t[i];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===t.length-1||i<t.length-1&&b.$isBlockElementNode(t[i+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function Jo(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Ct(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?e.root.children.some(r=>r!=null&&r.children?r.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function Pl(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),r=Qr.createHeadlessEditor({namespace:"EditorUtils",theme:Qn,nodes:tr,onError:s=>{console.error(s)}});let o;if(r.update(()=>{const a=new DOMParser().parseFromString(t,"text/html"),i=Il(r,a);b.$getRoot().clear(),b.$insertNodes(i)},{discrete:!0}),r.getEditorState().read(()=>{o=r.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function pn(e){const t=Qr.createHeadlessEditor({namespace:"EditorUtils",theme:Qn,nodes:tr,onError:s=>{console.error(s)}}),r=t.parseEditorState(JSON.stringify(e));t.setEditorState(r);let o="";return t.getEditorState().read(()=>{o=Ol(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function or(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}const Ll={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function On(e,t){return e===""?t["%commentEditor_unassigned%"]??"Unassigned":e==="Team"?t["%commentEditor_team%"]??"Team":e}function Vl({assignableUsers:e,onSave:t,onClose:r,localizedStrings:o}){const[s,a]=l.useState(Ll),[i,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),m=l.useRef(null);l.useEffect(()=>{let N=!0;const _=m.current;if(!_)return;const R=setTimeout(()=>{N&&Jo(_)},300);return()=>{N=!1,clearTimeout(R)}},[]);const h=l.useCallback(()=>{if(!Ct(s))return;const N=pn(s);t(N,i)},[s,t,i]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",x=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:x}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(L,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(jt,{children:n.jsx("p",{children:v})})]})}),n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(L,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Ct(s),children:n.jsx(k.Check,{})})}),n.jsx(jt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Ut,{open:w,onOpenChange:d,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(L,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:e.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:On(i!==void 0?i:"",o)})]})}),n.jsx(zt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:N=>{N.key==="Escape"&&(N.stopPropagation(),d(!1))},children:n.jsx(Bt,{children:n.jsx(Ft,{children:e.map(N=>n.jsx(Tt,{onSelect:()=>{c(N===""?void 0:N),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:On(N,o)})},N||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:N=>{N.key==="Escape"?(N.preventDefault(),N.stopPropagation(),r()):N.key==="Enter"&&N.shiftKey&&(N.preventDefault(),N.stopPropagation(),Ct(s)&&h())},onKeyDown:N=>{or(N),(N.key==="Enter"||N.key===" ")&&N.stopPropagation()},children:n.jsx(wn,{editorSerializedState:s,onSerializedChange:N=>a(N),placeholder:u,onClear:N=>{p.current=N}})})]})}const $l=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Bl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],Fl=["input","select","textarea","button"],zl=["button","textbox"],Wo=({options:e,onFocusChange:t,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(u=>{i(u);const g=e.find(x=>x.id===u);g&&(t==null||t(g));const v=document.getElementById(u);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=l.useCallback(u=>{const g=e.find(v=>v.id===u);g&&(w(v=>v===u?void 0:u),r==null||r(g))},[r,e]),m=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||Fl.includes(g))return!0;const v=u.getAttribute("role");if(v&&zl.includes(v))return!0;const x=u.getAttribute("tabindex");return x!==void 0&&x!=="-1"},h=l.useCallback(u=>{var y;const g=u.target,v=S=>S?document.getElementById(S):void 0,x=v(c),N=v(a);if(!!(x&&g&&x.contains(g)&&g!==x)&&m(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const S=e.find(C=>C.id===c);S&&d(S.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!x)return;const S=Array.from(x.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(S.length===0)return;const C=S.findIndex(E=>E===g);if(C===-1)return;let T;u.key==="ArrowDown"?T=Math.min(C+1,S.length-1):T=Math.max(C-1,0),T!==C&&(u.preventDefault(),u.stopPropagation(),(y=S[T])==null||y.focus());return}return}const V=e.findIndex(S=>S.id===a);let $=V;switch(u.key){case"ArrowDown":$=Math.min(V+1,e.length-1),u.preventDefault();break;case"ArrowUp":$=Math.max(V-1,0),u.preventDefault();break;case"Home":$=0,u.preventDefault();break;case"End":$=e.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const S=N;if(S){const C=S.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=S.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),E=C??T;if(E){u.preventDefault(),E.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(g)||(o==null||o(u.key),u.preventDefault()));return}const P=e[$];P&&d(P.id)},[e,d,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:d}},Zo=se.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ge=l.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Zo({variant:t}),e),...r}));ge.displayName="Badge";const sr=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));sr.displayName="Card";const Qo=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Qo.displayName="CardHeader";const ts=l.forwardRef(({className:e,...t},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));ts.displayName="CardTitle";const es=l.forwardRef(({className:e,...t},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));es.displayName="CardDescription";const ar=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",e),...t}));ar.displayName="CardContent";const ns=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));ns.displayName="CardFooter";const xe=l.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...o},s)=>n.jsx(oo.Root,{ref:s,decorative:r,orientation:t,className:f("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));xe.displayName=oo.Root.displayName;const ir=l.forwardRef(({className:e,...t},r)=>n.jsx(Oe.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));ir.displayName=Oe.Root.displayName;const rs=l.forwardRef(({className:e,...t},r)=>n.jsx(Oe.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));rs.displayName=Oe.Image.displayName;const lr=l.forwardRef(({className:e,...t},r)=>n.jsx(Oe.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));lr.displayName=Oe.Fallback.displayName;const cr=l.createContext(void 0);function Mt(){const e=l.useContext(cr);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const qt=se.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ne=Z.Trigger,dr=Z.Group,os=Z.Portal,ss=Z.Sub,as=Z.RadioGroup;function ae({variant:e="default",...t}){const r=l.useMemo(()=>({variant:e}),[e]);return n.jsx(cr.Provider,{value:r,children:n.jsx(Z.Root,{...t})})}const wr=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const a=Mt();return n.jsxs(Z.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,qt({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});wr.displayName=Z.SubTrigger.displayName;const pr=l.forwardRef(({className:e,...t},r)=>n.jsx(Z.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));pr.displayName=Z.SubContent.displayName;const Yt=l.forwardRef(({className:e,sideOffset:t=4,children:r,...o},s)=>{const a=it();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:s,sideOffset:t,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:n.jsx("div",{dir:a,children:r})})})});Yt.displayName=Z.Content.displayName;const qe=l.forwardRef(({className:e,inset:t,...r},o)=>{const s=it(),a=Mt();return n.jsx(Z.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,qt({variant:a.variant})),...r,dir:s})});qe.displayName=Z.Item.displayName;const Vt=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const a=Mt();return n.jsxs(Z.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,qt({variant:a.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Vt.displayName=Z.CheckboxItem.displayName;const ur=l.forwardRef(({className:e,children:t,...r},o)=>{const s=Mt();return n.jsxs(Z.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,qt({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});ur.displayName=Z.RadioItem.displayName;const Le=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Z.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));Le.displayName=Z.Label.displayName;const je=l.forwardRef(({className:e,...t},r)=>n.jsx(Z.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));je.displayName=Z.Separator.displayName;function is({className:e,...t}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}is.displayName="DropdownMenuShortcut";function cn(e,t){return e===""?t["%comment_assign_unassigned%"]??"Unassigned":e==="Team"?t["%comment_assign_team%"]??"Team":e}function Ur({comment:e,isReply:t=!1,localizedStrings:r,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,onEditingChange:w,canEditOrDelete:d=!1,canUserResolveThread:p=!1}){const[m,h]=l.useState(!1),[u,g]=l.useState(),v=l.useRef(null);l.useEffect(()=>{if(!m)return;let y=!0;const S=v.current;if(!S)return;const C=setTimeout(()=>{y&&Jo(S)},300);return()=>{y=!1,clearTimeout(C)}},[m]);const x=l.useCallback(()=>{h(!1),g(void 0),w==null||w(!1)},[w]),N=l.useCallback(async()=>{if(!u||!i)return;await i(e.id,pn(u))&&(h(!1),g(void 0),w==null||w(!1))},[u,i,e.id,w]),_=l.useMemo(()=>{const y=new Date(e.date),S=j.formatRelativeDate(y,r["%comment_date_today%"],r["%comment_date_yesterday%"]),C=y.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return j.formatReplacementString(r["%comment_dateAtTime%"],{date:S,time:C})},[e.date,r]),R=l.useMemo(()=>e.user,[e.user]),V=l.useMemo(()=>e.user.split(" ").map(y=>y[0]).join("").toUpperCase().slice(0,2),[e.user]),$=l.useMemo(()=>j.sanitizeHtml(j.parseParatextHtml(e.contents)),[e.contents]),P=l.useMemo(()=>{if(o&&d)return n.jsxs(n.Fragment,{children:[!j.hasCustomParatextTags(e.contents)&&n.jsxs(qe,{onClick:()=>{h(!0),g(Pl(j.parseParatextHtml(e.contents))),w==null||w(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(qe,{onClick:async()=>{c&&await c(e.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[d,o,r,e.contents,e.id,c,w]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[n.jsx(ir,{className:"tw-h-8 tw-w-8",children:n.jsx(lr,{className:"tw-text-xs tw-font-medium",children:V})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:R}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:_}),n.jsx("div",{className:"tw-flex-1"}),t&&e.assignedUser!==void 0&&n.jsxs(ge,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",cn(e.assignedUser,r)]})]}),m&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:v,onKeyDownCapture:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),x()):y.key==="Enter"&&y.shiftKey&&(y.preventDefault(),y.stopPropagation(),Ct(u)&&N())},onKeyDown:y=>{or(y),(y.key==="Enter"||y.key===" ")&&y.stopPropagation()},children:[n.jsx(wn,{editorSerializedState:u,onSerializedChange:y=>g(y)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(L,{size:"icon",onClick:x,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(L,{size:"icon",onClick:N,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ct(u),children:n.jsx(k.ArrowUp,{})})]})]}),!m&&n.jsxs(n.Fragment,{children:[e.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),e.status==="Todo"&&t&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:$}})]})]}),o&&p&&!t&&s!=="Resolved"&&a&&n.jsx(L,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:y=>{y.stopPropagation(),a({threadId:e.thread,status:"Resolved"})},children:n.jsx(k.Check,{})}),P&&n.jsxs(ae,{children:[n.jsx(Ne,{asChild:!0,children:n.jsx(L,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:P})]})]})}const Xr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Gl({classNameForVerseText:e,comments:t,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:w,threadStatus:d,handleAddCommentToThread:p,handleUpdateComment:m,handleDeleteComment:h,handleReadStatusChange:u,assignableUsers:g,canUserAddCommentToThread:v,canUserAssignThreadCallback:x,canUserResolveThreadCallback:N,canUserEditOrDeleteCommentCallback:_,isRead:R=!1,autoReadDelay:V=5}){const[$,P]=l.useState(Xr),[y,S]=l.useState(!1),[C,T]=l.useState(!1),[E,A]=l.useState(!1),[G,O]=l.useState(!1),[z,D]=l.useState(!1),[F,ot]=l.useState(void 0),[pt,Kt]=l.useState(!1),[lt,B]=l.useState(!1),[J,ut]=l.useState(R),[gt,vt]=l.useState(!1),ie=l.useRef(void 0),[en,Ve]=l.useState(new Map);l.useEffect(()=>{let M=!0;if(!o){Kt(!1),B(!1),Ve(new Map);return}return(async()=>{const Wt=x?await x(w):!1;if(!M)return;const rn=N?await N(w):!1;M&&(Kt(Wt),B(rn))})(),()=>{M=!1}},[o,w,x,N]);const Jt=l.useMemo(()=>t.filter(M=>!M.deleted),[t]);l.useEffect(()=>{let M=!0;if(!o||!_){Ve(new Map);return}return(async()=>{const Wt=new Map;await Promise.all(Jt.map(async rn=>{const Ea=await _(rn.id);M&&Wt.set(rn.id,Ea)})),M&&Ve(Wt)})(),()=>{M=!1}},[o,Jt,_]);const kt=l.useMemo(()=>Jt[0],[Jt]),nn=l.useRef(null),_e=l.useRef(void 0),le=l.useCallback(()=>{var M;(M=_e.current)==null||M.call(_e),P(Xr)},[]),I=l.useCallback(()=>{const M=!J;ut(M),vt(!M),u==null||u(w,M)},[J,u,w]);l.useEffect(()=>{const M=nn.current;if(!M)return;const Dt=()=>{T(M.scrollWidth>M.clientWidth)};return Dt(),window.addEventListener("resize",Dt),()=>window.removeEventListener("resize",Dt)},[kt==null?void 0:kt.verse]),l.useEffect(()=>{A(!1)},[o]),l.useEffect(()=>{if(o&&!J&&!gt){const M=setTimeout(()=>{ut(!0),u==null||u(w,!0)},V*1e3);return ie.current=M,()=>clearTimeout(M)}ie.current&&(clearTimeout(ie.current),ie.current=void 0)},[o,J,gt,V,w,u]);const K=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),et=l.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const M=cn(a,r);return j.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:M})},[a,r]),rt=l.useMemo(()=>Jt.slice(1),[Jt]),W=l.useMemo(()=>rt.length??0,[rt.length]),Ht=l.useMemo(()=>W>0,[W]),_t=l.useMemo(()=>E||W<=2?rt:rt.slice(-2),[rt,W,E]),ce=l.useMemo(()=>E||W<=2?0:W-2,[W,E]),de=l.useMemo(()=>W===1?K.singleReply:j.formatReplacementString(K.multipleReplies,{count:W}),[W,K]),Ca=l.useMemo(()=>ce===1?K.singleReply:j.formatReplacementString(K.multipleReplies,{count:ce}),[ce,K]),Rr=l.useCallback(async()=>{const M=Ct($)?pn($):void 0;if(F!==void 0){await p({threadId:w,contents:M,assignedUser:F})&&(ot(void 0),M&&le());return}M&&await p({threadId:w,contents:M})&&le()},[le,$,p,F,w]),Sa=l.useCallback(async M=>{const Dt=Ct($)?pn($):void 0,Wt=await p({...M,contents:Dt,assignedUser:F??M.assignedUser});return Wt&&Dt&&le(),Wt&&F!==void 0&&ot(void 0),Wt},[le,$,p,F]);return n.jsx(sr,{role:"option","aria-selected":o,id:w,className:f("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&d!=="Resolved"&&J,"tw-bg-background":o&&d!=="Resolved"&&J,"tw-bg-muted":d==="Resolved","tw-bg-blue-50":!J&&!o&&d!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(ar,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(L,{variant:"ghost",size:"icon",onClick:M=>{M.stopPropagation(),I()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":J?"Mark as unread":"Mark as read",children:J?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),et&&n.jsx(ge,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:et})]}),n.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[n.jsxs("p",{ref:nn,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":y},{"tw-whitespace-nowrap":!y}),children:[s,n.jsxs("span",{className:e,children:[kt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:kt.selectedText}),kt.contextAfter]})]}),C&&n.jsx(L,{variant:"ghost",size:"icon",onClick:M=>{M.stopPropagation(),S(!y)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":y?"Collapse text":"Expand text",children:y?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})})]}),n.jsx(Ur,{comment:kt,localizedStrings:r,isThreadExpanded:o,threadStatus:d,handleAddCommentToThread:Sa,handleUpdateComment:m,handleDeleteComment:h,onEditingChange:O,canEditOrDelete:en.get(kt.id)??!1,canUserResolveThread:lt})]}),n.jsxs(n.Fragment,{children:[Ht&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(xe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:de})]}),!o&&Ct($)&&n.jsx(wn,{editorSerializedState:$,onSerializedChange:M=>P(M),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[ce>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:M=>{M.stopPropagation(),A(!0)},role:"button",tabIndex:0,onKeyDown:M=>{(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),M.stopPropagation(),A(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(xe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ca}),E?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),_t.map(M=>n.jsx("div",{children:n.jsx(Ur,{comment:M,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:m,handleDeleteComment:h,onEditingChange:O,canEditOrDelete:en.get(M.id)??!1})},M.id)),v!==!1&&(!G||Ct($))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:M=>M.stopPropagation(),onKeyDownCapture:M=>{M.key==="Enter"&&M.shiftKey&&(M.preventDefault(),M.stopPropagation(),(Ct($)||F!==void 0)&&Rr())},onKeyDown:M=>{or(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(wn,{editorSerializedState:$,onSerializedChange:M=>P(M),placeholder:d==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:M=>{_e.current=M}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[F!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:j.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:cn(F,r)})}),n.jsxs(Ut,{open:z,onOpenChange:D,children:[n.jsx(Xt,{asChild:!0,children:n.jsx(L,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!pt||!g||g.length===0||!g.includes(i),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(zt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:M=>{M.key==="Escape"&&(M.stopPropagation(),D(!1))},children:n.jsx(Bt,{children:n.jsx(Ft,{children:g==null?void 0:g.map(M=>n.jsx(Tt,{onSelect:()=>{ot(M!==a?M:void 0),D(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:cn(M,r)})},M||"unassigned"))})})})]}),n.jsx(L,{size:"icon",onClick:Rr,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ct($)&&F===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function Kl({className:e="",classNameForVerseText:t,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:v}){const[x,N]=l.useState(void 0),_=g??x;l.useEffect(()=>{g!==void 0&&N(g)},[g]);const R=r.filter(E=>E.comments.some(A=>!A.deleted)),V=R.map(E=>({id:E.id})),$=l.useCallback(E=>{N(E.id),v==null||v(E.id)},[v]),P=l.useCallback(E=>{N(E),v==null||v(E)},[v]),{listboxRef:y,activeId:S,handleKeyDown:C}=Wo({options:V,onOptionSelect:$}),T=l.useCallback(E=>{E.key==="Escape"?(N(void 0),v==null||v(void 0),E.preventDefault(),E.stopPropagation()):C(E)},[C,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:y,"aria-activedescendant":S??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:T,children:R.map(E=>n.jsx("div",{id:E.id,className:f({"tw-opacity-60":E.status==="Resolved"}),children:n.jsx(Gl,{classNameForVerseText:t,comments:E.comments,localizedStrings:s,verseRef:E.verseRef,handleSelectThread:P,threadId:E.id,isRead:E.isRead,isSelected:_===E.id,currentUser:o,assignedUser:E.assignedUser,threadStatus:E.status,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u})},E.id))})}function Hl({table:e}){return n.jsxs(ae,{children:[n.jsx(to.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(L,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Yt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Le,{children:"Toggle columns"}),n.jsx(je,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>n.jsx(Vt,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const be=nt.Root,ls=nt.Group,ve=nt.Value,cs=se.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),re=l.forwardRef(({className:e,children:t,size:r,...o},s)=>{const a=it();return n.jsxs(nt.Trigger,{className:f(cs({size:r,className:e})),ref:s,...o,dir:a,children:[t,n.jsx(nt.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});re.displayName=nt.Trigger.displayName;const mr=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));mr.displayName=nt.ScrollUpButton.displayName;const fr=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));fr.displayName=nt.ScrollDownButton.displayName;const oe=l.forwardRef(({className:e,children:t,position:r="popper",...o},s)=>{const a=it();return n.jsx(nt.Portal,{children:n.jsxs(nt.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:r,...o,children:[n.jsx(mr,{}),n.jsx(nt.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:t})}),n.jsx(fr,{})]})})});oe.displayName=nt.Content.displayName;const ds=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));ds.displayName=nt.Label.displayName;const bt=l.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(nt.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(nt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(nt.ItemText,{children:t})]}));bt.displayName=nt.Item.displayName;const ws=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));ws.displayName=nt.Separator.displayName;function Ul({table:e}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(be,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[n.jsx(re,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ve,{placeholder:e.getState().pagination.pageSize})}),n.jsx(oe,{side:"top",children:[10,20,30,40,50].map(t=>n.jsx(bt,{value:`${t}`,children:t},t))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(L,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(L,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(L,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(L,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const qr=`
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
`;function Xl(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Ye(e,t){const r=t?`${qr}, ${t}`:qr;return Array.from(e.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Xl(o))}const We=l.forwardRef(({className:e,stickyHeader:t,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Ye(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Ye(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...r})})});We.displayName="Table";const Ze=l.forwardRef(({className:e,stickyHeader:t,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...r}));Ze.displayName="TableHeader";const Qe=l.forwardRef(({className:e,...t},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",e),...t}));Qe.displayName="TableBody";const ps=l.forwardRef(({className:e,...t},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));ps.displayName="TableFooter";function ql(e){l.useEffect(()=>{const t=e.current;if(!t)return;const r=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?Ye(e.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",r),()=>{t.removeEventListener("keydown",r)}},[e])}function Yl(e,t,r){let o;return r==="ArrowLeft"&&t>0?o=e[t-1]:r==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Jl(e,t,r){let o;return r==="ArrowDown"&&t<e.length-1?o=e[t+1]:r==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Pt=l.forwardRef(({className:e,onKeyDown:t,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),ql(i);const c=l.useMemo(()=>i.current?Ye(i.current):[],[i]),w=l.useCallback(p=>{const{current:m}=i;if(!m||!m.parentElement)return;const h=m.closest("table"),u=h?Ye(h).filter(x=>x.tagName==="TR"):[],g=u.indexOf(m),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Jl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Yl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const x=m.closest("table");x&&x.focus()}t==null||t(p)},[i,c,t]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Pt.displayName="TableRow";const De=l.forwardRef(({className:e,...t},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));De.displayName="TableHead";const te=l.forwardRef(({className:e,...t},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));te.displayName="TableCell";const us=l.forwardRef(({className:e,...t},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));us.displayName="TableCaption";function un({className:e,...t}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function ms({columns:e,data:t,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var P;const[p,m]=l.useState([]),[h,u]=l.useState([]),[g,v]=l.useState({}),[x,N]=l.useState({}),_=l.useMemo(()=>t??[],[t]),R=wt.useReactTable({data:_,columns:e,getCoreRowModel:wt.getCoreRowModel(),...r&&{getPaginationRowModel:wt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:wt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:wt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:N,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:x}}),V=R.getVisibleFlatColumns();let $;return w?$=Array.from({length:10}).map((C,T)=>`skeleton-row-${T}`).map(C=>n.jsx(Pt,{children:n.jsx(te,{colSpan:V.length??e.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(un,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},C)):((P=R.getRowModel().rows)==null?void 0:P.length)>0?$=R.getRowModel().rows.map(y=>n.jsx(Pt,{onClick:()=>i(y,R),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(S=>n.jsx(te,{children:wt.flexRender(S.column.columnDef.cell,S.getContext())},S.id))},y.id)):$=n.jsx(Pt,{children:n.jsx(te,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Hl,{table:R}),n.jsxs(We,{stickyHeader:a,children:[n.jsx(Ze,{stickyHeader:a,children:R.getHeaderGroups().map(y=>n.jsx(Pt,{children:y.headers.map(S=>n.jsx(De,{children:S.isPlaceholder?void 0:wt.flexRender(S.column.columnDef.header,S.getContext())},S.id))},y.id))}),n.jsx(Qe,{children:$})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(L,{variant:"outline",size:"sm",onClick:()=>R.previousPage(),disabled:!R.getCanPreviousPage(),children:"Previous"}),n.jsx(L,{variant:"outline",size:"sm",onClick:()=>R.nextPage(),disabled:!R.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Ul,{table:R})]})}function Wl({id:e,markdown:t,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:e,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Ga,{options:a,children:t})})}const fs=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Yr=(e,t)=>e[t]??t;function hs({errorDetails:e,handleCopyNotify:t,localizedStrings:r,id:o}){const s=Yr(r,"%webView_error_dump_header%"),a=Yr(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),t&&t()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(L,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:e})})]})}const Zl=Object.freeze([...fs,"%webView_error_dump_copied_message%"]);function Ql({errorDetails:e,handleCopyNotify:t,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),t&&t()},d=p=>{p||c(!1)};return n.jsxs(Ut,{onOpenChange:d,children:[n.jsx(Xt,{asChild:!0,children:o}),n.jsxs(zt,{id:a,className:f("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(st,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(hs,{errorDetails:e,handleCopyNotify:w,localizedStrings:r})]})]})}var gs=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(gs||{});function tc({id:e,label:t,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,p)=>{const m=!o[d][p];s(u=>(u[d][p]=m,{...u}));const h=r[d].items[p];h.onUpdate(h.id,m)},w=(d,p)=>{i(h=>(h[d]=p,{...h}));const m=r[d].items.find(h=>h.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:e,children:n.jsxs(ae,{children:[n.jsx(Ne,{asChild:!0,children:n.jsxs(L,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Yt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Le,{children:d.label}),n.jsx(dr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,h)=>n.jsx("div",{children:n.jsx(Vt,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:m.label})},m.id))}):n.jsx(as,{value:a[p],onValueChange:m=>w(p,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(ur,{value:m.id,children:m.label})},m.id))})}),n.jsx(je,{})]},d.label))})]})})}function ec({id:e,category:t,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(L,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(L,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function nc({id:e,versionHistory:t}){const[r,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,m=d.getUTCMonth(),h=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const i=Object.entries(t).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:e,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function rc({id:e,publisherDisplayName:t,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>j.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(j.getCurrentLocale(),{type:"language"});return d.map(m=>p.of(m))})(o);return n.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(nc,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:t}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function xs({entries:e,selected:t,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:v="ghost",id:x}){const[N,_]=l.useState(!1),R=l.useCallback(T=>{var A;const E=(A=e.find(G=>G.label===T))==null?void 0:A.value;E&&r(t.includes(E)?t.filter(G=>G!==E):[...t,E])},[e,t,r]),V=()=>w||o,$=l.useMemo(()=>{if(!h)return e;const T=e.filter(A=>A.starred).sort((A,G)=>A.label.localeCompare(G.label)),E=e.filter(A=>!A.starred).sort((A,G)=>{const O=t.includes(A.value),z=t.includes(G.value);return O&&!z?-1:!O&&z?1:A.label.localeCompare(G.label)});return[...T,...E]},[e,t,h]),P=()=>{r(e.map(T=>T.value))},y=()=>{r([])},S=d??N,C=p??_;return n.jsx("div",{id:x,className:g,children:n.jsxs(Ut,{open:S,onOpenChange:C,children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(L,{variant:v,role:"combobox","aria-expanded":S,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:V()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(zt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Bt,{children:[n.jsx(ye,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(L,{variant:"ghost",size:"sm",onClick:P,children:a}),n.jsx(L,{variant:"ghost",size:"sm",onClick:y,children:i})]}),n.jsxs(Ft,{children:[n.jsx(Ae,{children:c}),n.jsx($t,{children:$.map(T=>n.jsxs(Tt,{value:T.label,onSelect:R,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:f("tw-h-4 tw-w-4",t.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function oc({entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(xs,{entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),t.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(h=>{var u;return n.jsxs(ge,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(L,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(t.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(st,{children:p})]})}const ke=l.forwardRef(({className:e,type:t,...r},o)=>n.jsx("input",{type:t,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...r}));ke.displayName="Input";const sc=(e,t,r)=>e==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function ac({callerType:e,updateCallerType:t,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(e),[p,m]=l.useState(r),[h,u]=l.useState(!1);l.useEffect(()=>{d(e)},[e]),l.useEffect(()=>{p!==r&&m(r)},[r]);const g=x=>{c.current=!1,u(x),x||(w!=="custom"||p?(t(w),o(p)):(d(e),m(r)))},v=x=>{var N,_,R,V;x.stopPropagation(),document.activeElement===i.current&&x.key==="ArrowDown"||x.key==="ArrowRight"?((N=a.current)==null||N.focus(),c.current=!0):document.activeElement===a.current&&x.key==="ArrowUp"?((_=i.current)==null||_.focus(),c.current=!1):document.activeElement===a.current&&x.key==="ArrowLeft"&&((R=a.current)==null?void 0:R.selectionStart)===0&&((V=i.current)==null||V.focus(),c.current=!1),w==="custom"&&x.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(ae,{open:h,onOpenChange:g,children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(Ne,{asChild:!0,children:n.jsx(L,{variant:"outline",className:"tw-h-6",children:sc(e,s,r)})})}),n.jsx(jt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Yt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var x;c.current&&((x=a.current)==null||x.focus())},children:[n.jsx(Le,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(je,{}),n.jsx(Vt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Vt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Vt,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:x=>{var N;x.stopPropagation(),c.current=!0,(N=a.current)==null||N.focus()},onSelect:x=>x.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ke,{tabIndex:0,onMouseDown:x=>{x.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:x=>{x.key==="Enter"||x.key==="ArrowUp"||x.key==="ArrowDown"||x.key==="ArrowLeft"||x.key==="ArrowRight"||x.stopPropagation()},maxLength:1,onChange:x=>m(x.target.value)})]})})]})]})}const ic=(e,t)=>e==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),lc=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let r=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(r=t["%footnoteEditor_noteType_footnote_label%"]),j.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function cc({noteType:e,handleNoteTypeChange:t,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ae,{children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Zr.TooltipTrigger,{asChild:!0,children:n.jsx(Ne,{asChild:!0,children:n.jsx(L,{variant:"outline",className:"tw-h-6",children:ic(e,r)})})}),n.jsx(jt,{children:n.jsx("p",{children:lc(e,r)})})]})}),n.jsxs(Yt,{className:"tw-z-[300]",children:[n.jsx(Le,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(je,{}),n.jsxs(Vt,{disabled:e!=="x"&&!o,checked:e==="x",onCheckedChange:()=>t("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Vt,{disabled:e==="x"&&!o,checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Vt,{disabled:e==="x"&&!o,checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function dc(e){var r;const t=(r=e.attributes)==null?void 0:r.char;t.style&&(t.style==="ft"&&(t.style="xt"),t.style==="fr"&&(t.style="xo"),t.style==="fq"&&(t.style="xq"))}function wc(e){var r;const t=(r=e.attributes)==null?void 0:r.char;t.style&&(t.style==="xt"&&(t.style="ft"),t.style==="xo"&&(t.style="fr"),t.style==="xq"&&(t.style="fq"))}const pc={type:"USJ",version:"3.1",content:[{type:"para"}]};function uc({classNameForEditor:e,noteOps:t,onSave:r,onClose:o,scrRef:s,noteKey:a,editorOptions:i,localizedStrings:c}){const w=l.useRef(null),d=l.createRef(),[p,m]=l.useState("generated"),[h,u]=l.useState("*"),[g,v]=l.useState("f"),[x,N]=l.useState(!1),_=l.useMemo(()=>({...i,markerMenuTrigger:i.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...i.view??yt.getDefaultViewOptions(),noteMode:"expanded"}}),[i]);l.useEffect(()=>{var y;(y=w.current)==null||y.focus()}),l.useEffect(()=>{var C,T;let y;const S=t==null?void 0:t.at(0);if(S&&yt.isInsertEmbedOpOfType("note",S)){const E=(C=S.insert.note)==null?void 0:C.caller;let A="custom";E===yt.GENERATOR_NOTE_CALLER?A="generated":E===yt.HIDDEN_NOTE_CALLER?A="hidden":E&&u(E),m(A),v(((T=S.insert.note)==null?void 0:T.style)??"f"),y=setTimeout(()=>{var G;(G=w.current)==null||G.applyUpdate([S])},0)}return()=>{y&&clearTimeout(y)}},[t,a]);const R=l.useCallback(()=>{var S,C;const y=(C=(S=w.current)==null?void 0:S.getNoteOps(0))==null?void 0:C.at(0);y&&yt.isInsertEmbedOpOfType("note",y)&&(y.insert.note&&(p==="custom"?y.insert.note.caller=h:y.insert.note.caller=p==="generated"?yt.GENERATOR_NOTE_CALLER:yt.HIDDEN_NOTE_CALLER),r([y]))},[p,h,r]),V=()=>{var S;const y=(S=d.current)==null?void 0:S.getElementsByClassName("editor-input")[0];y!=null&&y.textContent&&navigator.clipboard.writeText(y.textContent)},$=y=>{var C,T,E,A,G;v(y);const S=(T=(C=w.current)==null?void 0:C.getNoteOps(0))==null?void 0:T.at(0);if(S&&yt.isInsertEmbedOpOfType("note",S)){S.insert.note&&(S.insert.note.style=y);const O=(A=(E=S.insert.note)==null?void 0:E.contents)==null?void 0:A.ops;g!=="x"&&y==="x"?O==null||O.forEach(z=>dc(z)):g==="x"&&y!=="x"&&(O==null||O.forEach(z=>wc(z))),(G=w.current)==null||G.applyUpdate([S,{delete:1}])}},P=y=>{var C,T,E,A,G;const S=(T=(C=w.current)==null?void 0:C.getNoteOps(0))==null?void 0:T.at(0);if(S&&yt.isInsertEmbedOpOfType("note",S)){y.content.length>1&&setTimeout(()=>{var D;(D=w.current)==null||D.applyUpdate([{retain:2},{delete:1}])},0);const O=(E=S.insert.note)==null?void 0:E.style,z=(G=(A=S.insert.note)==null?void 0:A.contents)==null?void 0:G.ops;O||N(!1),N(O==="x"?!!(z!=null&&z.every(D=>{var ot,pt;if(!((ot=D.attributes)!=null&&ot.char))return!0;const F=((pt=D.attributes)==null?void 0:pt.char).style;return F==="xt"||F==="xo"||F==="xq"})):!!(z!=null&&z.every(D=>{var ot,pt;if(!((ot=D.attributes)!=null&&ot.char))return!0;const F=((pt=D.attributes)==null?void 0:pt.char).style;return F==="ft"||F==="fr"||F==="fq"})))}else N(!1)};return n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(cc,{isTypeSwitchable:x,noteType:g,handleNoteTypeChange:$,localizedStrings:c}),n.jsx(ac,{callerType:p,updateCallerType:m,customCaller:h,updateCustomCaller:u,localizedStrings:c})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(L,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(jt,{children:n.jsx("p",{children:c["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(L,{onClick:R,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(k.Check,{})})}),n.jsx(jt,{children:c["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:d,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:e,children:n.jsx(yt.Editorial,{options:_,onUsjChange:P,defaultUsj:pc,onScrRefChange:()=>{},scrRef:s,ref:w})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:n.jsx(L,{onClick:V,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(jt,{children:n.jsx("p",{children:c["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const mc=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function bs(e,t){if(!t||t.length===0)return e??"empty";const r=t.find(s=>typeof s=="string");if(r)return`key-${e??"unknown"}-${r.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function fc(e,t,r=!0,o=void 0){if(!t||t.length===0)return;const s=[],a=[];let i=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[hr(e,c,r,!0,s),d&&o]},bs(e,c))})}function hr(e,t,r=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(a=>{if(typeof a=="string"){const i=`${e}-text-${a.slice(0,10)}`;if(o){const c=f(`usfm_${e}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return hc(a,bs(`${e}\\${a.marker}`,[a]),r,[...s,e??"unknown"])})}function hc(e,t,r,o=[]){const{marker:s}=e;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),hr(s,e.content,r,!0,[...o,s??"unknown"])]},t)}function vs({footnote:e,layout:t="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(e.caller):e.caller,a=s!==e.caller;let i,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([i,...c]=e.content);const w=o?n.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=i&&n.jsxs(n.Fragment,{children:[hr(e.marker,[i],o,!1)," "]}),h=t==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=t==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=f(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[w,p]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:m}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:fc(e.marker,c,o,d)})})]})}function gc({className:e,classNameForItems:t,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??j.getFormatCallerFunction(r,void 0),m=(_,R)=>{d==null||d(_,R,s)},h=a?r.findIndex(_=>_===a):-1,[u,g]=l.useState(h),v=(_,R,V)=>{if(r.length)switch(_.key){case"Enter":case" ":_.preventDefault(),d==null||d(R,V,s);break}},x=_=>{if(r.length)switch(_.key){case"ArrowDown":_.preventDefault(),g(R=>Math.min(R+1,r.length-1));break;case"ArrowUp":_.preventDefault(),g(R=>Math.max(R-1,0));break}},N=l.useRef([]);return l.useEffect(()=>{var _;u>=0&&u<N.current.length&&((_=N.current[u])==null||_.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",e),onKeyDown:x,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((_,R)=>{const V=_===a,$=`${s}-${R}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:P=>{N.current[R]=P},role:"option","aria-selected":V,"data-marker":_.marker,"data-state":V?"selected":void 0,tabIndex:R===u?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",t),onClick:()=>m(_,R),onKeyDown:P=>v(P,_,R),children:n.jsx(vs,{footnote:_,layout:o,formatCaller:()=>p(_.caller,R),showMarkers:i})},$),R<r.length-1&&o==="vertical"&&n.jsx(xe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function xc(e){const t=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>r&&t.push(e.substring(r,s.index)),t.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<e.length&&t.push(e.substring(r)),t.length>0?t:[e]}function bc({occurrenceData:e,setScriptureReference:t,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],w=new Set;return e.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[e]);return n.jsxs(We,{stickyHeader:!0,children:[n.jsx(Ze,{stickyHeader:!0,children:n.jsxs(Pt,{children:[n.jsx(De,{children:s}),n.jsx(De,{children:a})]})}),n.jsx(Qe,{children:i.length>0&&i.map(c=>n.jsxs(Pt,{onClick:()=>{t(c.reference)},children:[n.jsx(te,{children:j.formatScrRef(c.reference,"English")}),n.jsx(te,{className:o,children:xc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const kn=l.forwardRef(({className:e,...t},r)=>n.jsx(Bn.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:n.jsx(Bn.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));kn.displayName=Bn.Root.displayName;const _n=e=>e==="asc"?n.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?n.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),vc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>n.jsxs(L,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,_n(t.getIsSorted())]})}),yc=(e,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>n.jsxs(L,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,_n(r.getIsSorted())]})}),Nc=e=>({accessorKey:"count",header:({column:t})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(L,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,_n(t.getIsSorted())]})}),cell:({row:t})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),An=(e,t,r,o,s,a)=>{let i=[...r];e.forEach(w=>{t==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];e.forEach(w=>{t==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},jc=(e,t,r,o,s)=>({accessorKey:"status",header:({column:a})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(L,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,_n(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(jn,{value:i,variant:"outline",type:"single",children:[n.jsx(Re,{onClick:w=>{w.stopPropagation(),An([c],"approved",t,r,o,s)},value:"approved",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(Re,{onClick:w=>{w.stopPropagation(),An([c],"unapproved",t,r,o,s)},value:"unapproved",children:n.jsx(k.CircleXIcon,{})}),n.jsx(Re,{onClick:w=>{w.stopPropagation(),An([c],"unknown",t,r,o,s)},value:"unknown",children:n.jsx(k.CircleHelpIcon,{})})]})}}),kc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),_c=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},Cc=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},ys=(e,t,r)=>r.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Sc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Ec=(e,t,r)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Rc=(e,t,r)=>{const o=[];return e.forEach(s=>{const a=o.find(i=>j.deepEqual(i.items,j.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:s.verseRef,text:s.verse});else{const i={items:j.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText,count:1,status:ys(j.isString(s.inventoryText)?s.inventoryText:s.inventoryText[0],t,r),occurrences:[{reference:s.verseRef,text:s.verse}]};o.push(i)}}),o},It=(e,t)=>e[t]??t;function Tc({inventoryItems:e,setVerseRef:t,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:m}){const h=It(r,"%webView_inventory_all%"),u=It(r,"%webView_inventory_approved%"),g=It(r,"%webView_inventory_unapproved%"),v=It(r,"%webView_inventory_unknown%"),x=It(r,"%webView_inventory_scope_currentBook%"),N=It(r,"%webView_inventory_scope_chapter%"),_=It(r,"%webView_inventory_scope_verse%"),R=It(r,"%webView_inventory_filter_text%"),V=It(r,"%webView_inventory_show_additional_items%"),$=It(r,"%webView_inventory_no_results%"),[P,y]=l.useState(!1),[S,C]=l.useState("all"),[T,E]=l.useState(""),[A,G]=l.useState([]),O=l.useMemo(()=>{const B=e??[];return B.length===0?[]:Rc(B,s,a)},[e,s,a]),z=l.useMemo(()=>{if(P)return O;const B=[];return O.forEach(J=>{const ut=J.items[0],gt=B.find(vt=>vt.items[0]===ut);gt?(gt.count+=J.count,gt.occurrences=gt.occurrences.concat(J.occurrences)):B.push({items:[ut],count:J.count,occurrences:J.occurrences,status:J.status})}),B},[P,O]),D=l.useMemo(()=>z.length===0?[]:Ec(z,S,T),[z,S,T]),F=l.useMemo(()=>{var ut,gt;if(!P)return w;const B=(ut=o==null?void 0:o.tableHeaders)==null?void 0:ut.length;if(!B)return w;const J=[];for(let vt=0;vt<B;vt++)J.push(yc(((gt=o==null?void 0:o.tableHeaders)==null?void 0:gt[vt])||"Additional Item",vt+1));return[...J,...w]},[o==null?void 0:o.tableHeaders,w,P]);l.useEffect(()=>{D.length===0?G([]):D.length===1&&G(D[0].items)},[D]);const ot=(B,J)=>{J.setRowSelection(()=>{const ut={};return ut[B.index]=!0,ut}),G(B.original.items)},pt=B=>{if(B==="book"||B==="chapter"||B==="verse")c(B);else throw new Error(`Invalid scope value: ${B}`)},Kt=B=>{if(B==="all"||B==="approved"||B==="unapproved"||B==="unknown")C(B);else throw new Error(`Invalid status filter value: ${B}`)},lt=l.useMemo(()=>{if(z.length===0||A.length===0)return[];const B=z.filter(J=>j.deepEqual(P?J.items:[J.items[0]],A));if(B.length>1)throw new Error("Selected item is not unique");return B.length===0?[]:B[0].occurrences},[A,P,z]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(be,{onValueChange:B=>Kt(B),defaultValue:S,children:[n.jsx(re,{className:"tw-m-1",children:n.jsx(ve,{placeholder:"Select filter"})}),n.jsxs(oe,{children:[n.jsx(bt,{value:"all",children:h}),n.jsx(bt,{value:"approved",children:u}),n.jsx(bt,{value:"unapproved",children:g}),n.jsx(bt,{value:"unknown",children:v})]})]}),n.jsxs(be,{onValueChange:B=>pt(B),defaultValue:i,children:[n.jsx(re,{className:"tw-m-1",children:n.jsx(ve,{placeholder:"Select scope"})}),n.jsxs(oe,{children:[n.jsx(bt,{value:"book",children:x}),n.jsx(bt,{value:"chapter",children:N}),n.jsx(bt,{value:"verse",children:_})]})]}),n.jsx(ke,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:R,value:T,onChange:B=>{E(B.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(kn,{className:"tw-m-1",checked:P,onCheckedChange:B=>{y(B)}}),n.jsx(st,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??V})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(ms,{columns:F,data:D,onRowClickHandler:ot,stickyHeader:!0,isLoading:p,noResultsMessage:$})}),lt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(bc,{classNameForText:m,occurrenceData:lt,setScriptureReference:t,localizedStrings:r})})]})}const Mc=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Dc({localizedStrings:e,markerMenuItems:t}){const[r,o]=l.useState(""),s=l.useMemo(()=>{const a=r.trim().toLowerCase();return a?t.filter(i=>{var c;return((c=i.marker)==null?void 0:c.toLowerCase().includes(a))||i.title.toLowerCase().includes(a)}):t},[r,t]);return n.jsxs(Bt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ye,{value:r,onValueChange:a=>o(a),placeholder:e["%markerMenu_searchPlaceholder%"]}),n.jsxs(Ft,{children:[n.jsx(Ae,{children:e["%markerMenu_noResults%"]}),n.jsx($t,{children:s.map(a=>n.jsxs(Tt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-6",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:a.icon})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(wo,{className:"tw-font-sans",children:a.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]},`item-${a.title}`))})]})]})}const Ic="16rem",Oc="3rem",Ns=l.createContext(void 0);function tn(){const e=l.useContext(Ns);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const gr=l.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,p]=l.useState(e),m=t??d,h=l.useCallback(R=>{const V=typeof R=="function"?R(m):R;r?r(V):p(V)},[r,m]),u=l.useCallback(()=>h(R=>!R),[h]),g=m?"expanded":"collapsed",N=it()==="ltr"?i:i==="primary"?"secondary":"primary",_=l.useMemo(()=>({state:g,open:m,setOpen:h,toggleSidebar:u,side:N}),[g,m,h,u,N]);return n.jsx(Ns.Provider,{value:_,children:n.jsx(Nt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Ic,"--sidebar-width-icon":Oc,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});gr.displayName="SidebarProvider";const xr=l.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:r,children:o,...s},a)=>{const i=tn();return t==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});xr.displayName="Sidebar";const js=l.forwardRef(({className:e,onClick:t,...r},o)=>{const s=tn();return n.jsxs(L,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",e),onClick:a=>{t==null||t(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});js.displayName="SidebarTrigger";const ks=l.forwardRef(({className:e,...t},r)=>{const{toggleSidebar:o}=tn();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});ks.displayName="SidebarRail";const br=l.forwardRef(({className:e,...t},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));br.displayName="SidebarInset";const _s=l.forwardRef(({className:e,...t},r)=>n.jsx(ke,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));_s.displayName="SidebarInput";const Cs=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Cs.displayName="SidebarHeader";const Ss=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Ss.displayName="SidebarFooter";const Es=l.forwardRef(({className:e,...t},r)=>n.jsx(xe,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));Es.displayName="SidebarSeparator";const vr=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));vr.displayName="SidebarContent";const mn=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));mn.displayName="SidebarGroup";const fn=l.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Ie.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...r})});fn.displayName="SidebarGroupLabel";const Rs=l.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Ie.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...r})});Rs.displayName="SidebarGroupAction";const hn=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",e),...t}));hn.displayName="SidebarGroupContent";const yr=l.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));yr.displayName="SidebarMenu";const Nr=l.forwardRef(({className:e,...t},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",e),...t}));Nr.displayName="SidebarMenuItem";const Ac=se.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),jr=l.forwardRef(({asChild:e=!1,isActive:t=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=e?Ie.Slot:"button",{state:d}=tn(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:f(Ac({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:p}),n.jsx(jt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});jr.displayName="SidebarMenuButton";const Ts=l.forwardRef(({className:e,asChild:t=!1,showOnHover:r=!1,...o},s)=>{const a=t?Ie.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});Ts.displayName="SidebarMenuAction";const Ms=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Ms.displayName="SidebarMenuBadge";const Ds=l.forwardRef(({className:e,showIcon:t=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...r,children:[t&&n.jsx(un,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(un,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Ds.displayName="SidebarMenuSkeleton";const Is=l.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Is.displayName="SidebarMenuSub";const Os=l.forwardRef(({...e},t)=>n.jsx("li",{ref:t,...e}));Os.displayName="SidebarMenuSubItem";const As=l.forwardRef(({asChild:e=!1,size:t="md",isActive:r,className:o,...s},a)=>{const i=e?Ie.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":t,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});As.displayName="SidebarMenuSubButton";function Ps({id:e,extensionLabels:t,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((h,u)=>{o(h,u)},[o]),p=l.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),m=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(xr,{id:e,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(vr,{children:[n.jsxs(mn,{children:[n.jsx(fn,{className:"tw-text-sm",children:a}),n.jsx(hn,{children:n.jsx(yr,{children:Object.entries(t).map(([h,u])=>n.jsx(Nr,{children:n.jsx(jr,{onClick:()=>d(h),isActive:m(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(mn,{children:[n.jsx(fn,{className:"tw-text-sm",children:i}),n.jsx(hn,{className:"tw-pl-3",children:n.jsx(dn,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);d(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const Cn=l.forwardRef(({value:e,onSearch:t,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=it();return n.jsxs("div",{id:i,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(ke,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:e,onChange:d=>t(d.target.value),disabled:a}),e&&n.jsxs(L,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{t("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Cn.displayName="SearchBar";function Pc({id:e,extensionLabels:t,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Cn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(gr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ps,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(br,{className:"tw-min-w-[215px]",children:o})]})]})}const Zt="scrBook",Lc="scrRef",me="source",Vc="details",$c="Scripture Reference",Bc="Scripture Book",Ls="Type",Fc="Details";function zc(e,t){const r=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Zt,header:(e==null?void 0:e.scriptureReferenceColumnName)??$c,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?q.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Zt?j.formatScrRef(s.start):void 0},getGroupingValue:o=>q.bookIdToNumber(o.start.book),sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>j.formatScrRef(o.start),id:Lc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:j.formatScrRef(s.start)},sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:me,header:r?(e==null?void 0:e.typeColumnName)??Ls:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Vc,header:(e==null?void 0:e.detailsColumnName)??Fc,cell:o=>o.getValue(),enableGrouping:!1}]}const Gc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||j.compareScrRefs(e.start,e.end)===0?`${j.scrRefToBBBCCCVVV(e.start)}+${t}`:`${j.scrRefToBBBCCCVVV(e.start)}+${t}-${j.scrRefToBBBCCCVVV(e.end)}+${r}`},Jr=e=>`${Gc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Kc({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[m,h]=l.useState([{id:Zt,desc:!1}]),[u,g]=l.useState({}),v=l.useMemo(()=>e.flatMap(C=>C.data.map(T=>({...T,source:C.source}))),[e]),x=l.useMemo(()=>zc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{d.includes(me)?h([{id:me,desc:!1},{id:Zt,desc:!1}]):h([{id:Zt,desc:!1}])},[d]);const N=wt.useReactTable({data:v,columns:x,state:{grouping:d,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:wt.getExpandedRowModel(),getGroupedRowModel:wt.getGroupedRowModel(),getCoreRowModel:wt.getCoreRowModel(),getSortedRowModel:wt.getSortedRowModel(),getRowId:Jr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const C=N.getSelectedRowModel().rowsById,T=Object.keys(C);if(T.length===1){const E=v.find(A=>Jr(A)===T[0])||void 0;E&&c(E)}}},[u,v,c,N]);const _=s??Bc,R=a??Ls,V=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[Zt]},{label:`Group by ${R}`,value:[me]},{label:`Group by ${_} and ${R}`,value:[Zt,me]},{label:`Group by ${R} and ${_}`,value:[me,Zt]}],$=C=>{p(JSON.parse(C))},P=(C,T)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(T)},y=(C,T)=>C.getIsGrouped()?"":f("banded-row",T%2===0?"even":"odd"),S=(C,T,E)=>{if(!((C==null?void 0:C.length)===0||T.depth<E.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&n.jsxs(be,{value:JSON.stringify(d),onValueChange:C=>{$(C)},children:[n.jsx(re,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ve,{})}),n.jsx(oe,{position:"item-aligned",children:n.jsx(ls,{children:V.map(C=>n.jsx(bt,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),n.jsxs(We,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&n.jsx(Ze,{children:N.getHeaderGroups().map(C=>n.jsx(Pt,{children:C.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(De,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(L,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",wt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},C.id))}),n.jsx(Qe,{children:N.getRowModel().rows.map((C,T)=>{const E=it();return n.jsx(Pt,{"data-state":C.getIsSelected()?"selected":"",className:f(y(C,T)),onClick:A=>P(C,A),children:C.getVisibleCells().map(A=>{if(!(A.getIsPlaceholder()||A.column.columnDef.enableGrouping&&!A.getIsGrouped()&&(A.column.columnDef.id!==me||!r)))return n.jsx(te,{className:f(A.column.columnDef.id,"tw-p-[1px]",S(d,C,A)),children:A.getIsGrouped()?n.jsxs(L,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!C.getIsExpanded()&&(E==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",wt.flexRender(A.column.columnDef.cell,A.getContext())," (",C.subRows.length,")"]}):wt.flexRender(A.column.columnDef.cell,A.getContext())},A.id)})},C.id)})})]})]})}const kr=(e,t)=>e.filter(r=>{try{return j.getSectionForBook(r)===t}catch{return!1}}),Vs=(e,t,r)=>kr(e,t).every(o=>r.includes(o));function Hc({section:e,availableBookIds:t,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=kr(t,e).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(L,{variant:"outline",size:"sm",onClick:()=>o(e),className:f(Vs(t,e,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:hi(e,i,c,w,d)})}const Wr=5,Pn=6;function Uc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[x,N]=l.useState(!1),[_,R]=l.useState(""),V=l.useRef(void 0),$=l.useRef(!1);if(e.length!==q.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const P=l.useMemo(()=>q.allBookIds.filter((O,z)=>e[z]==="1"&&!q.isObsolete(q.bookIdToNumber(O))),[e]),y=l.useMemo(()=>{if(!_.trim()){const D={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return P.forEach(F=>{const ot=j.getSectionForBook(F);D[ot].push(F)}),D}const O=P.filter(D=>Zn(D,_,s)),z={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return O.forEach(D=>{const F=j.getSectionForBook(D);z[F].push(D)}),z},[P,_,s]),S=l.useCallback((O,z=!1)=>{if(!z||!V.current){r(t.includes(O)?t.filter(lt=>lt!==O):[...t,O]),V.current=O;return}const D=P.findIndex(lt=>lt===V.current),F=P.findIndex(lt=>lt===O);if(D===-1||F===-1)return;const[ot,pt]=[Math.min(D,F),Math.max(D,F)],Kt=P.slice(ot,pt+1).map(lt=>lt);r(t.includes(O)?t.filter(lt=>!Kt.includes(lt)):[...new Set([...t,...Kt])])},[t,r,P]),C=O=>{S(O,$.current),$.current=!1},T=(O,z)=>{O.preventDefault(),S(z,O.shiftKey)},E=l.useCallback(O=>{const z=kr(P,O).map(D=>D);r(Vs(P,O,t)?t.filter(D=>!z.includes(D)):[...new Set([...t,...z])])},[t,r,P]),A=()=>{r(P.map(O=>O))},G=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(j.Section).map(O=>n.jsx(Hc,{section:O,availableBookIds:P,selectedBookIds:t,onToggle:E,localizedStrings:o},O))}),n.jsxs(Ut,{open:x,onOpenChange:O=>{N(O),O||R("")},children:[n.jsx(Xt,{asChild:!0,children:n.jsxs(L,{variant:"outline",role:"combobox","aria-expanded":x,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${a}: ${t.length}`:i,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(zt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Bt,{shouldFilter:!1,onKeyDown:O=>{O.key==="Enter"&&($.current=O.shiftKey)},children:[n.jsx(ye,{placeholder:c,value:_,onValueChange:R}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(L,{variant:"ghost",size:"sm",onClick:A,children:w}),n.jsx(L,{variant:"ghost",size:"sm",onClick:G,children:d})]}),n.jsxs(Ft,{children:[n.jsx(Ae,{children:p}),Object.values(j.Section).map((O,z)=>{const D=y[O];if(D.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx($t,{heading:xo(O,h,u,g,v),children:D.map(F=>n.jsx(vo,{bookId:F,isSelected:t.includes(F),onSelect:()=>C(F),onMouseDown:ot=>T(ot,F),section:j.getSectionForBook(F),showCheck:!0,localizedBookNames:s,commandValue:Gn(F,s),className:"tw-flex tw-items-center"},F))}),z<Object.values(j.Section).length-1&&n.jsx(co,{})]},O)})]})]})})]}),t.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===Pn?Pn:Wr).map(O=>n.jsx(ge,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ee(O,s)},O)),t.length>Pn&&n.jsx(ge,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Wr} ${m}`})]})]})}const Xc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),we=(e,t)=>e[t]??t;function qc({scope:e,availableScopes:t,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w}){const d=we(i,"%webView_scope_selector_selected_text%"),p=we(i,"%webView_scope_selector_current_verse%"),m=we(i,"%webView_scope_selector_current_chapter%"),h=we(i,"%webView_scope_selector_current_book%"),u=we(i,"%webView_scope_selector_choose_books%"),g=we(i,"%webView_scope_selector_scope%"),v=we(i,"%webView_scope_selector_select_books%"),x=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],N=t?x.filter(_=>t.includes(_.value)):x;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(st,{children:g}),n.jsx(vn,{value:e,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:N.map(({value:_,label:R,id:V})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Ue,{className:"tw-me-2",value:_,id:V}),n.jsx(st,{htmlFor:V,children:R})]},V))})]}),e==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(st,{children:v}),n.jsx(Uc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const Ln={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Yc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...Ln,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in Ln?Ln[d]:p]))},w=it();return n.jsxs(be,{value:`${t}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(re,{size:s,className:f("pr-twp tw-w-auto",a),children:n.jsx(ve,{placeholder:c[j.getLocalizeKeyForScrollGroupId(t)]??t})}),n.jsx(oe,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:250},children:e.map(d=>n.jsx(bt,{value:`${d}`,children:c[j.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Jc({children:e}){return n.jsx("div",{className:"pr-twp tw-grid",children:e})}function Wc({primary:e,secondary:t,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Zc({primary:e,secondary:t,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),r?n.jsx(xe,{}):""]})}function $s(e,t){var r;return(r=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:r[0]}function gn({icon:e,menuLabel:t,leading:r}){return e?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`}):void 0}const Bs=(e,t,r,o)=>r?Object.entries(e).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>t.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:"command"in c?n.jsxs(qe,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(gn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(gn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(ss,{children:[n.jsx(wr,{children:c.label}),n.jsx(os,{children:n.jsx(pr,{children:Bs(e,t,$s(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(jt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function xn({onSelectMenuItem:e,menuData:t,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(ae,{variant:a,children:[n.jsx(Ne,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(L,{variant:i,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Yt,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(dr,{children:n.jsx(Nt,{children:Bs(t.groups,t.items,w,e)})}),d<p.length-1&&n.jsx(je,{})]},w))})]})}const Fs=l.forwardRef(({id:e,className:t,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:r}));function Qc({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Fs,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(xn,{onSelectMenuItem:e,menuData:r,tabLabel:"Project",icon:d??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(xn,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function td({onSelectProjectMenuItem:e,projectMenuData:t,id:r,className:o,menuButtonIcon:s}){return n.jsx(Fs,{className:"tw-pointer-events-none",id:r,children:t&&n.jsx(xn,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const _r=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsx(ht.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});_r.displayName=ht.List.displayName;const Cr=l.forwardRef(({className:e,...t},r)=>n.jsx(ht.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Cr.displayName=ht.List.displayName;const zs=l.forwardRef(({className:e,...t},r)=>n.jsx(ht.Trigger,{ref:r,...t,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),Sr=l.forwardRef(({className:e,...t},r)=>n.jsx(ht.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Sr.displayName=ht.Content.displayName;function ed({tabList:e,searchValue:t,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Cn,{className:a,value:t,onSearch:r,placeholder:o})]}),n.jsxs(_r,{children:[n.jsx(Cr,{children:e.map(c=>n.jsx(zs,{value:c.value,children:c.value},c.key))}),e.map(c=>n.jsx(Sr,{value:c.value,children:c.content},c.key))]})]})}function nd({...e}){return n.jsx(Q.Menu,{...e})}function rd({...e}){return n.jsx(Q.Sub,{"data-slot":"menubar-sub",...e})}const Gs=l.forwardRef(({className:e,variant:t="default",...r},o)=>{const s=l.useMemo(()=>({variant:t}),[t]);return n.jsx(cr.Provider,{value:s,children:n.jsx(Q.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...r})})});Gs.displayName=Q.Root.displayName;const Ks=l.forwardRef(({className:e,...t},r)=>{const o=Mt();return n.jsx(Q.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",qt({variant:o.variant,className:e})),...t})});Ks.displayName=Q.Trigger.displayName;const Hs=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const a=Mt();return n.jsxs(Q.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",qt({variant:a.variant,className:e}),e),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Hs.displayName=Q.SubTrigger.displayName;const Us=l.forwardRef(({className:e,...t},r)=>{const o=Mt();return n.jsx(Q.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});Us.displayName=Q.SubContent.displayName;const Xs=l.forwardRef(({className:e,align:t="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=Mt();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:a,align:t,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...s})})});Xs.displayName=Q.Content.displayName;const qs=l.forwardRef(({className:e,inset:t,...r},o)=>{const s=Mt();return n.jsx(Q.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",qt({variant:s.variant,className:e}),e),...r})});qs.displayName=Q.Item.displayName;const od=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const a=Mt();return n.jsxs(Q.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",qt({variant:a.variant,className:e}),e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});od.displayName=Q.CheckboxItem.displayName;const sd=l.forwardRef(({className:e,children:t,...r},o)=>{const s=Mt();return n.jsxs(Q.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",qt({variant:s.variant,className:e}),e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});sd.displayName=Q.RadioItem.displayName;const ad=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Q.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));ad.displayName=Q.Label.displayName;const Ys=l.forwardRef(({className:e,...t},r)=>n.jsx(Q.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Ys.displayName=Q.Separator.displayName;const Fe=(e,t)=>{setTimeout(()=>{t.forEach(r=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Js=(e,t,r,o)=>{if(!r)return;const s=Object.entries(e).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=t.filter(d=>d.group===a).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(St,{children:[n.jsx(Lt,{asChild:!0,children:"command"in d?n.jsxs(qs,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(gn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(gn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(rd,{children:[n.jsx(Hs,{children:d.label}),n.jsx(Us,{children:Js(e,t,$s(e,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(jt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(n.jsx(Ys,{},`separator-${a}`)),w})};function id({menuData:e,onSelectMenuItem:t,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Xa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var g,v,x,N;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Fe(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Fe(a,[h,u]);break;case"alt+l":(v=i.current)==null||v.focus(),Fe(i,[h,u]);break;case"alt+n":(x=c.current)==null||x.focus(),Fe(c,[h,u]);break;case"alt+h":(N=w.current)==null||N.focus(),Fe(w,[h,u]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!e)return n.jsx(Gs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(nd,{children:[n.jsx(Ks,{ref:d(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Xs,{className:"tw-z-[250]",children:n.jsx(Nt,{children:Js(e.groups,e.items,p,t)})})]},p))})}function ld(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function cd({menuData:e,onOpenChange:t,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,e&&n.jsx(id,{menuData:e,onOpenChange:t,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const dd=(e,t)=>e[t]??t;function wd({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=dd(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),a&&r.find(v=>v===g)&&a([...r.filter(v=>v!==g)]),m(!1)},u=(g,v)=>{var N,_,R,V,$,P;const x=v!==g?((_=(N=e[g])==null?void 0:N.uiNames)==null?void 0:_[v])??((V=(R=e[g])==null?void 0:R.uiNames)==null?void 0:V.en):void 0;return x?`${($=e[g])==null?void 0:$.autonym} (${x})`:(P=e[g])==null?void 0:P.autonym};return n.jsxs("div",{id:w,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(be,{name:"uiLanguage",value:t,onValueChange:h,open:p,onOpenChange:g=>m(g),children:[n.jsx(re,{children:n.jsx(ve,{})}),n.jsx(oe,{className:"tw-z-[250]",children:Object.keys(e).map(g=>n.jsx(bt,{value:g,children:u(g,t)},g))})]}),t!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(st,{className:"tw-font-normal tw-text-muted-foreground",children:j.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function pd({item:e,createLabel:t,createComplexLabel:r}){return t?n.jsx(st,{children:t(e)}):r?n.jsx(st,{children:r(e)}):n.jsx(st,{children:e})}function ud({id:e,className:t,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:e,className:t,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(kn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(pd,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function md({cardKey:e,isSelected:t,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:w,accentColor:d}){const p=m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":t,className:f("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-accent":t},{"tw-bg-transparent":!t},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),t&&c&&n.jsxs(ae,{children:[n.jsx(Ne,{className:f(d&&"tw-me-1"),asChild:!0,children:n.jsx(L,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:c})]})]}),t&&w&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:w})]}),d&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},e)}const Ws=l.forwardRef(({className:e,...t},r)=>n.jsx(k.LoaderCircle,{size:35,className:f("tw-animate-spin",e),...t,ref:r}));Ws.displayName="Spinner";function fd({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:m,onFocus:h,onBlur:u}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(st,{htmlFor:e,className:f({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(ke,{id:e,disabled:t,placeholder:i,required:c,className:f(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:m,onFocus:h,onBlur:u}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const hd=se.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Zs=l.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",hd({variant:t}),e),...r}));Zs.displayName="Alert";const Qs=l.forwardRef(({className:e,...t},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Qs.displayName="AlertTitle";const ta=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));ta.displayName="AlertDescription";const gd=tt.Root,xd=tt.Trigger,bd=tt.Group,vd=tt.Portal,yd=tt.Sub,Nd=tt.RadioGroup,ea=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>n.jsxs(tt.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ea.displayName=tt.SubTrigger.displayName;const na=l.forwardRef(({className:e,...t},r)=>n.jsx(tt.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));na.displayName=tt.SubContent.displayName;const ra=l.forwardRef(({className:e,...t},r)=>n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));ra.displayName=tt.Content.displayName;const oa=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(tt.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...r}));oa.displayName=tt.Item.displayName;const sa=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>n.jsxs(tt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));sa.displayName=tt.CheckboxItem.displayName;const aa=l.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(tt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));aa.displayName=tt.RadioItem.displayName;const ia=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(tt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...r}));ia.displayName=tt.Label.displayName;const la=l.forwardRef(({className:e,...t},r)=>n.jsx(tt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));la.displayName=tt.Separator.displayName;function ca({className:e,...t}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}ca.displayName="ContextMenuShortcut";const da=l.createContext({direction:"bottom"});function wa({shouldScaleBackground:e=!0,direction:t="bottom",...r}){const o=l.useMemo(()=>({direction:t}),[t]);return n.jsx(da.Provider,{value:o,children:n.jsx(Rt.Drawer.Root,{shouldScaleBackground:e,direction:t,...r})})}wa.displayName="Drawer";const jd=Rt.Drawer.Trigger,pa=Rt.Drawer.Portal,kd=Rt.Drawer.Close,Er=l.forwardRef(({className:e,...t},r)=>n.jsx(Rt.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));Er.displayName=Rt.Drawer.Overlay.displayName;const ua=l.forwardRef(({className:e,children:t,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(da),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(pa,{children:[n.jsx(Er,{}),n.jsxs(Rt.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],e),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ua.displayName="DrawerContent";function ma({className:e,...t}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}ma.displayName="DrawerHeader";function fa({className:e,...t}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}fa.displayName="DrawerFooter";const ha=l.forwardRef(({className:e,...t},r)=>n.jsx(Rt.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));ha.displayName=Rt.Drawer.Title.displayName;const ga=l.forwardRef(({className:e,...t},r)=>n.jsx(Rt.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",e),...t}));ga.displayName=Rt.Drawer.Description.displayName;const xa=l.forwardRef(({className:e,value:t,...r},o)=>n.jsx(Fn.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...r,children:n.jsx(Fn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));xa.displayName=Fn.Root.displayName;function _d({className:e,...t}){return n.jsx(Xn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const Cd=Xn.Panel;function Sd({withHandle:e,className:t,...r}){return n.jsx(Xn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...r,children:e&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Ed({...e}){return n.jsx(eo.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const ba=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsxs(ze.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[n.jsx(ze.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(ze.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(ze.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ba.displayName=ze.Root.displayName;const va=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsx(zn.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:r,children:n.jsx(zn.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});va.displayName=zn.Root.displayName;const Rd=ht.Root,ya=l.forwardRef(({className:e,...t},r)=>{const o=it();return n.jsx(ht.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});ya.displayName=ht.List.displayName;const Na=l.forwardRef(({className:e,...t},r)=>n.jsx(ht.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));Na.displayName=ht.Trigger.displayName;const ja=l.forwardRef(({className:e,...t},r)=>n.jsx(ht.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));ja.displayName=ht.Content.displayName;const ka=l.forwardRef(({className:e,...t},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:r,...t}));ka.displayName="Textarea";const Td=(e,t)=>{l.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])};function Md(e){return{preserveValue:!0,...e}}const _a=(e,t,r={})=>{const o=l.useRef(t);o.current=t;const s=l.useRef(r);s.current=Md(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!e),(async()=>{if(e){const p=await e();d&&(i(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[e]),[a,c]},Vn=()=>!1,Dd=(e,t)=>{const[r]=_a(l.useCallback(async()=>{if(!e)return Vn;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),Vn,{preserveValue:!1});l.useEffect(()=>()=>{r!==Vn&&r()},[r])};function Id(e){l.useEffect(()=>{let t;return e&&(t=document.createElement("style"),t.appendChild(document.createTextNode(e)),document.head.appendChild(t)),()=>{t&&document.head.removeChild(t)}},[e])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>eo.toast});exports.Alert=Zs;exports.AlertDescription=ta;exports.AlertTitle=Qs;exports.Avatar=ir;exports.AvatarFallback=lr;exports.AvatarImage=rs;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ji;exports.BOOK_SELECTOR_STRING_KEYS=Ci;exports.Badge=ge;exports.BookChapterControl=Ni;exports.BookSelectionMode=ko;exports.BookSelector=Si;exports.Button=L;exports.COMMENT_EDITOR_STRING_KEYS=$l;exports.COMMENT_LIST_STRING_KEYS=Bl;exports.Card=sr;exports.CardContent=ar;exports.CardDescription=es;exports.CardFooter=ns;exports.CardHeader=Qo;exports.CardTitle=ts;exports.ChapterRangeSelector=jo;exports.Checkbox=kn;exports.Checklist=ud;exports.ComboBox=dn;exports.Command=Bt;exports.CommandEmpty=Ae;exports.CommandGroup=$t;exports.CommandInput=ye;exports.CommandItem=Tt;exports.CommandList=Ft;exports.CommentEditor=Vl;exports.CommentList=Kl;exports.ContextMenu=gd;exports.ContextMenuCheckboxItem=sa;exports.ContextMenuContent=ra;exports.ContextMenuGroup=bd;exports.ContextMenuItem=oa;exports.ContextMenuLabel=ia;exports.ContextMenuPortal=vd;exports.ContextMenuRadioGroup=Nd;exports.ContextMenuRadioItem=aa;exports.ContextMenuSeparator=la;exports.ContextMenuShortcut=ca;exports.ContextMenuSub=yd;exports.ContextMenuSubContent=na;exports.ContextMenuSubTrigger=ea;exports.ContextMenuTrigger=xd;exports.DataTable=ms;exports.Drawer=wa;exports.DrawerClose=kd;exports.DrawerContent=ua;exports.DrawerDescription=ga;exports.DrawerFooter=fa;exports.DrawerHeader=ma;exports.DrawerOverlay=Er;exports.DrawerPortal=pa;exports.DrawerTitle=ha;exports.DrawerTrigger=jd;exports.DropdownMenu=ae;exports.DropdownMenuCheckboxItem=Vt;exports.DropdownMenuContent=Yt;exports.DropdownMenuGroup=dr;exports.DropdownMenuItem=qe;exports.DropdownMenuItemType=gs;exports.DropdownMenuLabel=Le;exports.DropdownMenuPortal=os;exports.DropdownMenuRadioGroup=as;exports.DropdownMenuRadioItem=ur;exports.DropdownMenuSeparator=je;exports.DropdownMenuShortcut=is;exports.DropdownMenuSub=ss;exports.DropdownMenuSubContent=pr;exports.DropdownMenuSubTrigger=wr;exports.DropdownMenuTrigger=Ne;exports.ERROR_DUMP_STRING_KEYS=fs;exports.ERROR_POPOVER_STRING_KEYS=Zl;exports.ErrorDump=hs;exports.ErrorPopover=Ql;exports.FOOTNOTE_EDITOR_STRING_KEYS=mc;exports.Filter=oc;exports.FilterDropdown=tc;exports.Footer=rc;exports.FootnoteEditor=uc;exports.FootnoteItem=vs;exports.FootnoteList=gc;exports.INVENTORY_STRING_KEYS=Sc;exports.Input=ke;exports.Inventory=Tc;exports.Label=st;exports.MARKER_MENU_STRING_KEYS=Mc;exports.MarkdownRenderer=Wl;exports.MarkerMenu=Dc;exports.MoreInfo=ec;exports.MultiSelectComboBox=xs;exports.NavigationContentSearch=ed;exports.Popover=Ut;exports.PopoverAnchor=gi;exports.PopoverContent=zt;exports.PopoverTrigger=Xt;exports.Progress=xa;exports.RadioGroup=vn;exports.RadioGroupItem=Ue;exports.RecentSearches=No;exports.ResizableHandle=Sd;exports.ResizablePanel=Cd;exports.ResizablePanelGroup=_d;exports.ResultsCard=md;exports.SCOPE_SELECTOR_STRING_KEYS=Xc;exports.ScopeSelector=qc;exports.ScriptureResultsViewer=Kc;exports.ScrollGroupSelector=Yc;exports.SearchBar=Cn;exports.Select=be;exports.SelectContent=oe;exports.SelectGroup=ls;exports.SelectItem=bt;exports.SelectLabel=ds;exports.SelectScrollDownButton=fr;exports.SelectScrollUpButton=mr;exports.SelectSeparator=ws;exports.SelectTrigger=re;exports.SelectValue=ve;exports.Separator=xe;exports.SettingsList=Jc;exports.SettingsListHeader=Zc;exports.SettingsListItem=Wc;exports.SettingsSidebar=Ps;exports.SettingsSidebarContentSearch=Pc;exports.Sidebar=xr;exports.SidebarContent=vr;exports.SidebarFooter=Ss;exports.SidebarGroup=mn;exports.SidebarGroupAction=Rs;exports.SidebarGroupContent=hn;exports.SidebarGroupLabel=fn;exports.SidebarHeader=Cs;exports.SidebarInput=_s;exports.SidebarInset=br;exports.SidebarMenu=yr;exports.SidebarMenuAction=Ts;exports.SidebarMenuBadge=Ms;exports.SidebarMenuButton=jr;exports.SidebarMenuItem=Nr;exports.SidebarMenuSkeleton=Ds;exports.SidebarMenuSub=Is;exports.SidebarMenuSubButton=As;exports.SidebarMenuSubItem=Os;exports.SidebarProvider=gr;exports.SidebarRail=ks;exports.SidebarSeparator=Es;exports.SidebarTrigger=js;exports.Skeleton=un;exports.Slider=ba;exports.Sonner=Ed;exports.Spinner=Ws;exports.Switch=va;exports.TabDropdownMenu=xn;exports.TabFloatingMenu=td;exports.TabToolbar=Qc;exports.Table=We;exports.TableBody=Qe;exports.TableCaption=us;exports.TableCell=te;exports.TableFooter=ps;exports.TableHead=De;exports.TableHeader=Ze;exports.TableRow=Pt;exports.Tabs=Rd;exports.TabsContent=ja;exports.TabsList=ya;exports.TabsTrigger=Na;exports.TextField=fd;exports.Textarea=ka;exports.ToggleGroup=jn;exports.ToggleGroupItem=Re;exports.Toolbar=cd;exports.Tooltip=St;exports.TooltipContent=jt;exports.TooltipProvider=Nt;exports.TooltipTrigger=Lt;exports.UiLanguageSelector=wd;exports.VerticalTabs=_r;exports.VerticalTabsContent=Sr;exports.VerticalTabsList=Cr;exports.VerticalTabsTrigger=zs;exports.badgeVariants=Zo;exports.buttonVariants=yo;exports.cn=f;exports.getBookIdFromUSFM=Cc;exports.getLinesFromUSFM=kc;exports.getNumberFromUSFM=_c;exports.getStatusForItem=ys;exports.getToolbarOSReservedSpaceClassName=ld;exports.inventoryCountColumn=Nc;exports.inventoryItemColumn=vc;exports.inventoryStatusColumn=jc;exports.selectTriggerVariants=cs;exports.useEvent=Td;exports.useEventAsync=Dd;exports.useListbox=Wo;exports.usePromise=_a;exports.useRecentSearches=xi;exports.useSidebar=tn;exports.useStylesheet=Id;function Od(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Od(`*, ::before, ::after {
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

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .usfm_p {
  text-indent: 0 !important;
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
