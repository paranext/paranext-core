"use strict";var ya=Object.defineProperty;var Na=(e,t,r)=>t in e?ya(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var lt=(e,t,r)=>Na(e,typeof t!="symbol"?t+"":t,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),pt=require("cmdk"),C=require("lucide-react"),ja=require("clsx"),ka=require("tailwind-merge"),_a=require("@radix-ui/react-dialog"),N=require("platform-bible-utils"),Ce=require("@radix-ui/react-slot"),ee=require("class-variance-authority"),Ca=require("@radix-ui/react-popover"),Sa=require("@radix-ui/react-label"),Ea=require("@radix-ui/react-radio-group"),b=require("lexical"),Xr=require("@radix-ui/react-tooltip"),An=require("@lexical/rich-text"),_r=require("react-dom"),Ra=require("@lexical/table"),Ta=require("@radix-ui/react-toggle-group"),Ma=require("@radix-ui/react-toggle"),qr=require("@lexical/headless"),Da=require("@radix-ui/react-separator"),Ia=require("@radix-ui/react-avatar"),Yr=require("@radix-ui/react-dropdown-menu"),dt=require("@tanstack/react-table"),Oa=require("@radix-ui/react-select"),Aa=require("markdown-to-jsx"),kt=require("@eten-tech-foundation/platform-editor"),Pa=require("@radix-ui/react-checkbox"),La=require("@radix-ui/react-tabs"),Va=require("@radix-ui/react-menubar"),$a=require("react-hotkeys-hook"),Ba=require("@radix-ui/react-context-menu"),Et=require("vaul"),Fa=require("@radix-ui/react-progress"),za=require("react-resizable-panels"),Jr=require("sonner"),Ga=require("@radix-ui/react-slider"),Ka=require("@radix-ui/react-switch");function ot(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:()=>e[r]})}}return t.default=e,Object.freeze(t)}const St=ot(_a),je=ot(Ca),Wr=ot(Sa),$e=ot(Ea),Ke=ot(Xr),wn=ot(Ta),Zr=ot(Ma),Qr=ot(Da),Se=ot(Ia),W=ot(Yr),nt=ot(Oa),Pn=ot(Pa),ut=ot(La),Z=ot(Va),Q=ot(Ba),Ln=ot(Fa),Gn=ot(za),Pe=ot(Ga),Vn=ot(Ka),Ha=ka.extendTailwindMerge({prefix:"tw-"});function h(...e){return Ha(ja.clsx(e))}const Ua="layoutDirection";function st(){const e=localStorage.getItem(Ua);return e==="rtl"?e:"ltr"}const Xa=St.Root,qa=St.Portal,to=l.forwardRef(({className:e,...t},r)=>n.jsx(St.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));to.displayName=St.Overlay.displayName;const eo=l.forwardRef(({className:e,children:t,...r},o)=>{const s=st();return n.jsxs(qa,{children:[n.jsx(to,{}),n.jsxs(St.Content,{ref:o,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...r,dir:s,children:[t,n.jsxs(St.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(C.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});eo.displayName=St.Content.displayName;function no({className:e,...t}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",e),...t})}no.displayName="DialogHeader";const ro=l.forwardRef(({className:e,...t},r)=>n.jsx(St.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));ro.displayName=St.Title.displayName;const Ya=l.forwardRef(({className:e,...t},r)=>n.jsx(St.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));Ya.displayName=St.Description.displayName;const Lt=l.forwardRef(({className:e,...t},r)=>n.jsx(pt.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Lt.displayName=pt.Command.displayName;const me=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(C.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(pt.Command.Input,{ref:r,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});me.displayName=pt.Command.Input.displayName;const Vt=l.forwardRef(({className:e,...t},r)=>n.jsx(pt.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Vt.displayName=pt.Command.List.displayName;const Ee=l.forwardRef((e,t)=>n.jsx(pt.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Ee.displayName=pt.Command.Empty.displayName;const Pt=l.forwardRef(({className:e,...t},r)=>n.jsx(pt.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));Pt.displayName=pt.Command.Group.displayName;const oo=l.forwardRef(({className:e,...t},r)=>n.jsx(pt.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",e),...t}));oo.displayName=pt.Command.Separator.displayName;const Rt=l.forwardRef(({className:e,...t},r)=>n.jsx(pt.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));Rt.displayName=pt.Command.Item.displayName;function so({className:e,...t}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}so.displayName="CommandShortcut";var Ja=Object.defineProperty,Wa=(e,t,r)=>t in e?Ja(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,z=(e,t,r)=>Wa(e,typeof t!="symbol"?t+"":t,r);const ce=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Kn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ao=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Cr=ii();function Re(e,t=!0){return t&&(e=e.toUpperCase()),e in Cr?Cr[e]:0}function Hn(e){return Re(e)>0}function Za(e){const t=typeof e=="string"?Re(e):e;return t>=40&&t<=66}function Qa(e){return(typeof e=="string"?Re(e):e)<=39}function io(e){return e<=66}function ti(e){const t=typeof e=="string"?Re(e):e;return wo(t)&&!io(t)}function*ei(){for(let e=1;e<=ce.length;e++)yield e}const ni=1,lo=ce.length;function ri(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Un(e,t="***"){const r=e-1;return r<0||r>=ce.length?t:ce[r]}function co(e){return e<=0||e>lo?"******":ao[e-1]}function oi(e){return co(Re(e))}function wo(e){const t=typeof e=="number"?Un(e):e;return Hn(t)&&!Kn.includes(t)}function si(e){const t=typeof e=="number"?Un(e):e;return Hn(t)&&Kn.includes(t)}function ai(e){return ao[e-1].includes("*obsolete*")}function ii(){const e={};for(let t=0;t<ce.length;t++)e[ce[t]]=t+1;return e}const X={allBookIds:ce,nonCanonicalIds:Kn,bookIdToNumber:Re,isBookIdValid:Hn,isBookNT:Za,isBookOT:Qa,isBookOTNT:io,isBookDC:ti,allBookNumbers:ei,firstBook:ni,lastBook:lo,extraBooks:ri,bookNumberToId:Un,bookNumberToEnglishName:co,bookIdToEnglishName:oi,isCanonical:wo,isExtraMaterial:si,isObsolete:ai};var Dt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Dt||{});const ht=class{constructor(t){if(z(this,"name"),z(this,"fullPath"),z(this,"isPresent"),z(this,"hasVerseSegments"),z(this,"isCustomized"),z(this,"baseVersification"),z(this,"scriptureBooks"),z(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Dt[t]):(this._type=t,this.name=Dt[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};z(ht,"Original",new ht(Dt.Original)),z(ht,"Septuagint",new ht(Dt.Septuagint)),z(ht,"Vulgate",new ht(Dt.Vulgate)),z(ht,"English",new ht(Dt.English)),z(ht,"RussianProtestant",new ht(Dt.RussianProtestant)),z(ht,"RussianOrthodox",new ht(Dt.RussianOrthodox));let se=ht;function Sr(e,t){const r=t[0];for(let o=1;o<t.length;o++)e=e.split(t[o]).join(r);return e.split(r)}var po=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(po||{});const wt=class G{constructor(t,r,o,s){if(z(this,"firstChapter"),z(this,"lastChapter"),z(this,"lastVerse"),z(this,"hasSegmentsDefined"),z(this,"text"),z(this,"BBBCCCVVVS"),z(this,"longHashCode"),z(this,"versification"),z(this,"rtlMark","‏"),z(this,"_bookNum",0),z(this,"_chapterNum",0),z(this,"_verseNum",0),z(this,"_verse"),o==null&&s==null)if(t!=null&&typeof t=="string"){const a=t,i=r!=null&&r instanceof se?r:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=r!=null&&r instanceof se?r:void 0;this.setEmpty(a),this._verseNum=t%G.chapterDigitShifter,this._chapterNum=Math.floor(t%G.bookDigitShifter/G.chapterDigitShifter),this._bookNum=Math.floor(t/G.bookDigitShifter)}else if(r==null)if(t!=null&&t instanceof G){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof se?t:G.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&r!=null&&o!=null)if(typeof t=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(s),this.updateInternal(t,r,o);else if(typeof t=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=t,this._chapterNum=r,this._verseNum=o,this.versification=s??G.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let r;try{return r=new G(t),{success:!0,verseRef:r}}catch(o){if(o instanceof Ie)return r=new G,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(t,r,o){return t%G.bcvMaxValue*G.bookDigitShifter+(r>=0?r%G.bcvMaxValue*G.chapterDigitShifter:0)+(o>=0?o%G.bcvMaxValue:0)}static fromJSON(t){const{book:r,chapterNum:o,verseNum:s,verse:a,versificationStr:i}=t,c=a||s.toString();let w;return i&&(w=new se(i)),r?new G(r,o.toString(),c,w):new G}static tryGetVerseNum(t){let r;if(!t)return r=-1,{success:!0,vNum:r};r=0;let o;for(let s=0;s<t.length;s++){if(o=t[s],o<"0"||o>"9")return s===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>G.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(G.verseRangeSeparator)||this._verse.includes(G.verseSequenceIndicator))}get book(){return X.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=X.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const r=+t;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:r,vNum:o}=G.tryGetVerseNum(t);this._verse=r?void 0:t.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=G.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>X.lastBook)throw new Ie("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new se(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(G.verseRangeSeparators,G.verseSequenceIndicators)}get BBBCCC(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return G.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new se(Dt[i])}catch{throw new Ie("Invalid reference : "+t)}}const r=t.trim().split(" ");if(r.length!==2)throw new Ie("Invalid reference : "+t);const o=r[1].split(":"),s=+o[0];if(o.length!==2||X.bookIdToNumber(r[0])===0||!Number.isInteger(s)||s<0||!G.isVerseParseable(o[1]))throw new Ie("Invalid reference : "+t);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new G(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete r.verse,r}equals(t){return t instanceof G?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,r=G.verseRangeSeparators,o=G.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const s=[],a=Sr(this._verse,o);for(const i of a.map(c=>Sr(c,r))){const c=this.clone();c.verse=i[0];const w=c.verseNum;if(s.push(c),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let p=w+1;p<d.verseNum;p++){const f=new G(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||s.push(f)}s.push(d)}}return s}validateVerse(t,r){if(!this.verse)return this.internalValid;let o=0;for(const s of this.allVerses(!0,t,r)){const a=s.internalValid;if(a!==0)return a;const i=s.BBBCCCVVV;if(o>i)return 3;if(o===i)return 4;o=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>X.lastBook?2:(X.isCanonical(this._bookNum),0)}setEmpty(t=G.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,r,o){this.bookNum=X.bookIdToNumber(t),this.chapter=r,this.verse=o}};z(wt,"defaultVersification",se.English),z(wt,"verseRangeSeparator","-"),z(wt,"verseSequenceIndicator",","),z(wt,"verseRangeSeparators",[wt.verseRangeSeparator]),z(wt,"verseSequenceIndicators",[wt.verseSequenceIndicator]),z(wt,"chapterDigitShifter",1e3),z(wt,"bookDigitShifter",wt.chapterDigitShifter*wt.chapterDigitShifter),z(wt,"bcvMaxValue",wt.chapterDigitShifter-1),z(wt,"ValidStatusType",po);let Ie=class extends Error{};const uo=(e,t,r,o,s)=>{switch(e){case N.Section.OT:return t??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},li=(e,t,r,o,s)=>{switch(e){case N.Section.OT:return t??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${e}`)}};function ye(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedName)??X.bookIdToEnglishName(e)}function Xn(e,t){var o;return((o=t==null?void 0:t.get(e))==null?void 0:o.localizedId)??e.toUpperCase()}const mo=X.allBookIds.filter(e=>!X.isObsolete(X.bookIdToNumber(e))),le=Object.fromEntries(mo.map(e=>[e,X.bookIdToEnglishName(e)]));function qn(e,t,r){const o=t.trim().toLowerCase();if(!o)return!1;const s=X.bookIdToEnglishName(e),a=r==null?void 0:r.get(e);return!!(N.includes(s.toLowerCase(),o)||N.includes(e.toLowerCase(),o)||(a?N.includes(a.localizedName.toLowerCase(),o)||N.includes(a.localizedId.toLowerCase(),o):!1))}const ho=l.forwardRef(({bookId:e,isSelected:t,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),f=()=>{p.current||r==null||r(e),setTimeout(()=>{p.current=!1},100)},m=j=>{p.current=!0,o?o(j):r==null||r(e)},u=l.useMemo(()=>ye(e,c),[e,c]),g=l.useMemo(()=>Xn(e,c),[e,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(Rt,{ref:d,value:w||`${e} ${X.bookIdToEnglishName(e)}`,onSelect:f,onMouseDown:m,role:"option","aria-selected":t,"aria-label":`${X.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,className:a,children:[i&&n.jsx(C.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",t?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),fo=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=l.forwardRef(({className:e,variant:t,size:r,asChild:o=!1,...s},a)=>{const i=o?Ce.Slot:"button";return n.jsx(i,{className:h(fo({variant:t,size:r,className:e})),ref:a,...s})});V.displayName="Button";const Kt=je.Root,Ht=je.Trigger,ci=je.Anchor,$t=l.forwardRef(({className:e,align:t="center",sideOffset:r=4,...o},s)=>{const a=st();return n.jsx(je.Portal,{children:n.jsx(je.Content,{ref:s,align:t,sideOffset:r,className:h("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,dir:a})})});$t.displayName=je.Content.displayName;function $n(e,t,r){return`${e} ${le[e]}${t?` ${Xn(e,t)} ${ye(e,t)}`:""}${r?` ${r}`:""}`}function go({recentSearches:e,onSearchItemSelect:t,renderItem:r=c=>String(c),getItemKey:o=c=>String(c),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i}){const[c,w]=l.useState(!1);if(e.length===0)return;const d=p=>{t(p),w(!1)};return n.jsxs(Kt,{open:c,onOpenChange:w,children:[n.jsx(Ht,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(C.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx($t,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Lt,{children:n.jsx(Vt,{children:n.jsx(Pt,{heading:a,children:e.map(p=>n.jsxs(Rt,{onSelect:()=>d(p),className:"tw-flex tw-items-center",children:[n.jsx(C.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function di(e,t,r=(s,a)=>s===a,o=15){return s=>{const a=e.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];t(i)}}const jn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},wi=[jn.BOOK_ONLY,jn.BOOK_CHAPTER,jn.BOOK_CHAPTER_VERSE];function Er(e){const t=/^[a-zA-Z]$/.test(e),r=/^[0-9]$/.test(e);return{isLetter:t,isDigit:r}}function It(e){return N.getChaptersForBook(X.bookIdToNumber(e))}function pi(e,t,r){if(!e.trim()||t.length===0)return;const o=wi.reduce((s,a)=>{if(s)return s;const i=a.exec(e.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let p;const f=t.filter(m=>qn(m,c,r));if(f.length===1&&([p]=f),!p&&w){if(X.isBookIdValid(c)){const m=c.toUpperCase();t.includes(m)&&(p=m)}if(!p&&r){const m=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());m&&t.includes(m[0])&&([p]=m)}}if(!p&&w){const u=(g=>Object.keys(le).find(j=>le[j].toLowerCase()===g.toLowerCase()))(c);if(u&&t.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,j])=>j.localizedName.toLowerCase()===c.toLowerCase());g&&t.includes(g[0])&&([p]=g)}}if(p){let m=w?parseInt(w,10):void 0;m&&m>It(p)&&(m=Math.max(It(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:m,verseNum:u}}}},void 0);if(o)return o}function ui(e,t,r,o){const s=l.useCallback(()=>{if(e.chapterNum>1)o({book:e.book,chapterNum:e.chapterNum-1,verseNum:1});else{const w=t.indexOf(e.book);if(w>0){const d=t[w-1],p=Math.max(It(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[e,t,o]),a=l.useCallback(()=>{const w=It(e.book);if(e.chapterNum<w)o({book:e.book,chapterNum:e.chapterNum+1,verseNum:1});else{const d=t.indexOf(e.book);if(d<t.length-1){const p=t[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[e,t,o]),i=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum>1?e.verseNum-1:0})},[e,o]),c=l.useCallback(()=>{o({book:e.book,chapterNum:e.chapterNum,verseNum:e.verseNum+1})},[e,o]);return l.useMemo(()=>[{onClick:s,disabled:t.length===0||e.chapterNum===1&&t.indexOf(e.book)===0,title:"Previous chapter",icon:r==="ltr"?C.ChevronsLeft:C.ChevronsRight},{onClick:i,disabled:t.length===0||e.verseNum===0,title:"Previous verse",icon:r==="ltr"?C.ChevronLeft:C.ChevronRight},{onClick:c,disabled:t.length===0,title:"Next verse",icon:r==="ltr"?C.ChevronRight:C.ChevronLeft},{onClick:a,disabled:t.length===0||(e.chapterNum===It(e.book)||It(e.book)===-1)&&t.indexOf(e.book)===t.length-1,title:"Next chapter",icon:r==="ltr"?C.ChevronsRight:C.ChevronsLeft}],[e,t,r,s,i,c,a])}function Rr({bookId:e,scrRef:t,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(e)return n.jsx(Pt,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:It(e)},(i,c)=>c+1).map(i=>n.jsx(Rt,{value:`${e} ${le[e]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":e===t.book&&i===t.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function mi({scrRef:e,handleSubmit:t,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w}){const d=st(),[p,f]=l.useState(!1),[m,u]=l.useState(""),[g,j]=l.useState(""),[x,v]=l.useState("books"),[E,y]=l.useState(void 0),[R,A]=l.useState(!1),L=l.useRef(void 0),_=l.useRef(void 0),D=l.useRef(void 0),k=l.useRef(void 0),T=l.useRef({}),B=l.useCallback(M=>{t(M),c&&c(M)},[t,c]),$=l.useMemo(()=>o?o():mo,[o]),F=l.useMemo(()=>({[N.Section.OT]:$.filter(K=>X.isBookOT(K)),[N.Section.NT]:$.filter(K=>X.isBookNT(K)),[N.Section.DC]:$.filter(K=>X.isBookDC(K)),[N.Section.Extra]:$.filter(K=>X.extraBooks().includes(K))}),[$]),P=l.useMemo(()=>Object.values(F).flat(),[F]),Y=l.useMemo(()=>{if(!g.trim())return F;const M={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(S=>{M[S]=F[S].filter(J=>qn(J,g,s))}),M},[F,g,s]),I=l.useMemo(()=>pi(g,P,s),[g,P,s]),et=l.useCallback(()=>{I&&(B({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1}),f(!1),j(""),u(""))},[B,I]),gt=l.useCallback(M=>{if(It(M)<=1){B({book:M,chapterNum:1,verseNum:1}),f(!1),j("");return}y(M),v("chapters")},[B]),Ft=l.useCallback(M=>{const K=x==="chapters"?E:I==null?void 0:I.book;K&&(B({book:K,chapterNum:M,verseNum:1}),f(!1),v("books"),y(void 0),j(""))},[B,x,E,I]),Nt=l.useCallback(M=>{B(M),f(!1),j("")},[B]),O=ui(e,P,d,t),U=l.useCallback(()=>{v("books"),y(void 0),setTimeout(()=>{_.current&&_.current.focus()},0)},[]),mt=l.useCallback(M=>{if(!M&&x==="chapters"){U();return}f(M),M&&(v("books"),y(void 0),j(""))},[x,U]),{otLong:at,ntLong:it,dcLong:zt,extraLong:Me}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},re=l.useCallback(M=>uo(M,at,it,zt,Me),[at,it,zt,Me]),xt=l.useCallback(M=>I?!!I.chapterNum&&!M.toString().includes(I.chapterNum.toString()):!1,[I]),vn=l.useMemo(()=>N.formatScrRef(e,s?ye(e.book,s):"English"),[e,s]),Ye=l.useCallback(M=>K=>{T.current[M]=K},[]),xe=l.useCallback(M=>{(M.key==="Home"||M.key==="End")&&M.stopPropagation()},[]),yn=l.useCallback(M=>{if(M.ctrlKey)return;const{isLetter:K,isDigit:S}=Er(M.key);if(x==="chapters"){if(M.key==="Backspace"){M.preventDefault(),M.stopPropagation(),U();return}if(K||S){if(M.preventDefault(),M.stopPropagation(),v("books"),y(void 0),S&&E){const J=le[E];j(`${J} ${M.key}`)}else j(M.key);setTimeout(()=>{_.current&&_.current.focus()},0);return}}if((x==="chapters"||x==="books"&&I)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(M.key)){const J=x==="chapters"?E:I==null?void 0:I.book;if(!J)return;const tt=(()=>{if(!m)return 1;const De=m.match(/(\d+)$/);return De?parseInt(De[1],10):0})(),bt=It(J);if(!bt)return;let jt=tt;const kr=6;switch(M.key){case"ArrowLeft":tt!==0&&(jt=tt>1?tt-1:bt);break;case"ArrowRight":tt!==0&&(jt=tt<bt?tt+1:1);break;case"ArrowUp":jt=tt===0?bt:Math.max(1,tt-kr);break;case"ArrowDown":jt=tt===0?1:Math.min(bt,tt+kr);break;default:return}jt!==tt&&(M.preventDefault(),M.stopPropagation(),u($n(J,s,jt)),setTimeout(()=>{const De=T.current[jt];De&&De.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,I,U,E,m,s]),Nn=l.useCallback(M=>{if(M.shiftKey||M.key==="Tab"||M.key===" ")return;const{isLetter:K,isDigit:S}=Er(M.key);(K||S)&&(M.preventDefault(),j(J=>J+M.key),_.current.focus(),A(!1))},[]);return l.useLayoutEffect(()=>{const M=setTimeout(()=>{if(p&&x==="books"&&D.current&&k.current){const K=D.current,S=k.current,J=S.offsetTop,tt=K.clientHeight,bt=S.clientHeight,jt=J-tt/2+bt/2;K.scrollTo({top:Math.max(0,jt),behavior:"smooth"}),u($n(e.book))}},0);return()=>{clearTimeout(M)}},[p,x,g,I,e.book]),l.useLayoutEffect(()=>{if(x==="chapters"&&E){const M=E===e.book;setTimeout(()=>{if(D.current)if(M){const K=T.current[e.chapterNum];K&&K.scrollIntoView({block:"center",behavior:"smooth"})}else D.current.scrollTo({top:0});L.current&&L.current.focus()},0)}},[x,E,I,e.book,e.chapterNum]),n.jsxs(Kt,{open:p,onOpenChange:mt,children:[n.jsx(Ht,{asChild:!0,children:n.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:vn})})}),n.jsx($t,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Lt,{ref:L,onKeyDown:yn,loop:!0,value:m,onValueChange:u,shouldFilter:!1,children:[x==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(me,{ref:_,value:g,onValueChange:j,onKeyDown:xe,onFocus:()=>A(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(go,{recentSearches:i,onSearchItemSelect:Nt,renderItem:M=>N.formatScrRef(M,"English"),getItemKey:M=>`${M.book}-${M.chapterNum}-${M.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:O.map(({onClick:M,disabled:K,title:S,icon:J})=>n.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{A(!0),M()},disabled:K,className:"tw-h-10 tw-w-4 tw-p-0",title:S,onKeyDown:Nn,children:n.jsx(J,{})},S))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:U,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(C.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(C.ArrowRight,{className:"tw-h-4 tw-w-4"})}),E&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ye(E,s)})]}),!R&&n.jsxs(Vt,{ref:D,children:[x==="books"&&n.jsxs(n.Fragment,{children:[!I&&Object.entries(Y).map(([M,K])=>{if(K.length!==0)return n.jsx(Pt,{heading:re(M),children:K.map(S=>n.jsx(ho,{bookId:S,onSelect:J=>gt(J),section:N.getSectionForBook(S),commandValue:`${S} ${le[S]}`,ref:S===e.book?k:void 0,localizedBookNames:s},S))},M)}),I&&n.jsx(Pt,{children:n.jsx(Rt,{value:`${I.book} ${le[I.book]} ${I.chapterNum||""}:${I.verseNum||""})}`,onSelect:et,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1},s?Xn(I.book,s):void 0)},"top-match")}),I&&It(I.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ye(I.book,s)}),n.jsx(Rr,{bookId:I.book,scrRef:e,onChapterSelect:Ft,setChapterRef:Ye,isChapterDimmed:xt,className:"tw-px-4 tw-pb-4"})]})]}),x==="chapters"&&E&&n.jsx(Rr,{bookId:E,scrRef:e,onChapterSelect:Ft,setChapterRef:Ye,className:"tw-p-4"})]})]})})]})}const hi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),fi=ee.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),rt=l.forwardRef(({className:e,...t},r)=>n.jsx(Wr.Root,{ref:r,className:h("pr-twp",fi(),e),...t}));rt.displayName=Wr.Root.displayName;const pn=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsx($e.Root,{className:h("pr-twp tw-grid tw-gap-2",e),...t,ref:r,dir:o})});pn.displayName=$e.Root.displayName;const Be=l.forwardRef(({className:e,...t},r)=>n.jsx($e.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:n.jsx($e.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(C.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Be.displayName=$e.Item.displayName;function gi(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function en({id:e,options:t=[],className:r,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=gi,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:m="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:j=!1,ariaLabel:x,...v}){const[E,y]=l.useState(!1),R=w??c,A=_=>_.length>0&&typeof _[0]=="object"&&"options"in _[0],L=(_,D)=>{const k=c(_),T=typeof _=="object"&&"secondaryLabel"in _?_.secondaryLabel:void 0,B=`${D??""}${k}${T??""}`;return n.jsxs(Rt,{value:k,onSelect:()=>{i(_),y(!1)},className:"tw-flex tw-items-center",children:[n.jsx(C.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==k})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[k,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},B)};return n.jsxs(Kt,{open:E,onOpenChange:y,...v,children:[n.jsx(Ht,{asChild:!0,children:n.jsxs(V,{variant:u,role:"combobox","aria-expanded":E,"aria-label":x,id:e,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:j,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?R(a):p})]}),n.jsx(C.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:g,className:h("tw-w-[200px] tw-p-0",s),children:n.jsxs(Lt,{children:[n.jsx(me,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Ee,{children:m}),n.jsx(Vt,{children:A(t)?t.map(_=>n.jsx(Pt,{heading:_.groupHeading,children:_.options.map(D=>L(D,_.groupHeading))},_.groupHeading)):t.map(_=>L(_))})]})})]})}function xo({startChapter:e,endChapter:t,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,p)=>p+1),[a]),c=d=>{r(d),d>t&&o(d)},w=d=>{o(d),d<e&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(rt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(en,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),n.jsx(rt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(en,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var bo=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(bo||{});const xi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),kn=(e,t)=>e[t]??t;function bi({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=kn(d,"%webView_bookSelector_currentBook%"),f=kn(d,"%webView_bookSelector_choose%"),m=kn(d,"%webView_bookSelector_chooseBooks%"),[u,g]=l.useState("current book"),j=x=>{g(x),e(x)};return n.jsx(pn,{className:"pr-twp tw-flex",value:u,onValueChange:x=>j(x),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{value:"current book"}),n.jsx(rt,{className:"tw-ms-1",children:p})]}),n.jsx(rt,{className:"tw-flex tw-items-center",children:t}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(xo,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{value:"choose books"}),n.jsx(rt,{className:"tw-ms-1",children:m})]}),n.jsx(rt,{className:"tw-flex tw-items-center",children:o.map(x=>X.bookIdToEnglishName(x)).join(", ")}),n.jsx(V,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}const vi=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],yi=["input","select","textarea","button"],Ni=["button","textbox"],vo=({options:e,onFocusChange:t,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(u=>{i(u);const g=e.find(x=>x.id===u);g&&(t==null||t(g));const j=document.getElementById(u);j&&(j.scrollIntoView({block:"center"}),j.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[t,e]),p=l.useCallback(u=>{const g=e.find(j=>j.id===u);g&&(w(j=>j===u?void 0:u),r==null||r(g))},[r,e]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||yi.includes(g))return!0;const j=u.getAttribute("role");if(j&&Ni.includes(j))return!0;const x=u.getAttribute("tabindex");return x!==void 0&&x!=="-1"},m=l.useCallback(u=>{var _;const g=u.target,j=D=>D?document.getElementById(D):void 0,x=j(c),v=j(a);if(!!(x&&g&&x.contains(g)&&g!==x)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const D=e.find(k=>k.id===c);D&&d(D.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!x)return;const D=Array.from(x.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(D.length===0)return;const k=D.findIndex(B=>B===g);if(k===-1)return;let T;u.key==="ArrowDown"?T=Math.min(k+1,D.length-1):T=Math.max(k-1,0),T!==k&&(u.preventDefault(),u.stopPropagation(),(_=D[T])==null||_.focus());return}return}const R=e.findIndex(D=>D.id===a);let A=R;switch(u.key){case"ArrowDown":A=Math.min(R+1,e.length-1),u.preventDefault();break;case"ArrowUp":A=Math.max(R-1,0),u.preventDefault();break;case"Home":A=0,u.preventDefault();break;case"End":A=e.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const D=v;if(D){const k=D.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=D.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),B=k??T;if(B){u.preventDefault(),B.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const L=e[A];L&&d(L.id)},[e,d,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:m,focusOption:d}},yo=l.createContext(null);function ji(e,t){return{getTheme:function(){return t??null}}}function Bt(){const e=l.useContext(yo);return e==null&&function(t,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",t);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),e}const No=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ki=No?l.useLayoutEffect:l.useEffect,Je={tag:b.HISTORY_MERGE_TAG};function _i({initialConfig:e,children:t}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=e,d=ji(null,o),p=b.createEditor({editable:e.editable,html:w,namespace:s,nodes:a,onError:f=>i(f,p),theme:o});return function(f,m){if(m!==null){if(m===void 0)f.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const j=No?document.activeElement:null;(b.$getSelection()!==null||j!==null&&j===f.getRootElement())&&g.select()}},Je);else if(m!==null)switch(typeof m){case"string":{const u=f.parseEditorState(m);f.setEditorState(u,Je);break}case"object":f.setEditorState(m,Je);break;case"function":f.update(()=>{b.$getRoot().isEmpty()&&m(f)},Je)}}}(p,c),[p,d]},[]);return ki(()=>{const o=e.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(yo.Provider,{value:r,children:t})}const Ci=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Si({ignoreHistoryMergeTagChange:e=!0,ignoreSelectionChange:t=!1,onChange:r}){const[o]=Bt();return Ci(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{t&&a.size===0&&i.size===0||e&&w.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,e,t,r]),null}const Yn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},vt=Ke.Provider,Ct=Ke.Root,At=Ke.Trigger,yt=l.forwardRef(({className:e,sideOffset:t=4,...r},o)=>n.jsx(Ke.Content,{ref:o,sideOffset:t,className:h("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r}));yt.displayName=Ke.Content.displayName;const Jn=[An.HeadingNode,b.ParagraphNode,b.TextNode,An.QuoteNode],Ei=l.createContext(null),_n={didCatch:!1,error:null};class Ri extends l.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=_n}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(_n)}}componentDidCatch(t,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,t,r)}componentDidUpdate(t,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Ti(t.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:t.resetKeys,reason:"keys"}),this.setState(_n)}}render(){const{children:t,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=t;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(Ei.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Ti(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((r,o)=>!Object.is(r,t[o]))}function Mi({children:e,onError:t}){return n.jsx(Ri,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:t,children:e})}const Di=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ii(e){return{initialValueFn:()=>e.isEditable(),subscribe:t=>e.registerEditableListener(t)}}function Oi(){return function(e){const[t]=Bt(),r=l.useMemo(()=>e(t),[t,e]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return Di(()=>{const{initialValueFn:i,subscribe:c}=r,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,e]),o}(Ii)}function Ai(e,t,r="self"){const o=e.getStartEndPoints();if(t.isSelected(e)&&!b.$isTokenOrSegmented(t)&&o!==null){const[s,a]=o,i=e.isBackward(),c=s.getNode(),w=a.getNode(),d=t.is(c),p=t.is(w);if(d||p){const[f,m]=b.$getCharacterOffsets(e),u=c.is(w),g=t.is(i?w:c),j=t.is(i?c:w);let x,v=0;u?(v=f>m?m:f,x=f>m?f:m):g?(v=i?m:f,x=void 0):j&&(v=0,x=i?f:m);const E=t.__text.slice(v,x);E!==t.__text&&(r==="clone"&&(t=b.$cloneWithPropertiesEphemeral(t)),t.__text=E)}}return t}function Pi(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const jo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Li=jo&&"documentMode"in document?document.documentMode:null;!(!jo||!("InputEvent"in window)||Li)&&"getTargetRanges"in new window.InputEvent("input");function ko(...e){const t=[];for(const r of e)if(r&&typeof r=="string")for(const[o]of r.matchAll(/\S+/g))t.push(o);return t}function Wt(...e){return()=>{for(let t=e.length-1;t>=0;t--)e[t]();e.length=0}}function _o(e,...t){const r=ko(...t);r.length>0&&e.classList.add(...r)}function Vi(e,...t){const r=ko(...t);r.length>0&&e.classList.remove(...r)}function Tr(e){const t=b.$findMatchingParent(e,r=>b.$isElementNode(r)&&!r.isInline());return b.$isElementNode(t)||Pi(4,e.__key),t}function $i(e,t){const r=[];for(let o=0;o<e.length;o++){const s=t(e[o]);s!==null&&r.push(s)}return r}const Bi=Symbol.for("preact-signals");function un(){if(Yt>1)return void Yt--;let e,t=!1;for(;Le!==void 0;){let r=Le;for(Le=void 0,Bn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&Co(r))try{r.c()}catch(s){t||(e=s,t=!0)}r=o}}if(Bn=0,Yt--,t)throw e}function Fi(e){if(Yt>0)return e();Yt++;try{return e()}finally{un()}}let H,Le;function Mr(e){const t=H;H=void 0;try{return e()}finally{H=t}}let Yt=0,Bn=0,Qe=0;function Dr(e){if(H===void 0)return;let t=e.n;return t===void 0||t.t!==H?(t={i:0,S:e,p:H.s,n:void 0,t:H,e:void 0,x:void 0,r:t},H.s!==void 0&&(H.s.n=t),H.s=t,e.n=t,32&H.f&&e.S(t),t):t.i===-1?(t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=H.s,t.n=void 0,H.s.n=t,H.s=t),t):void 0}function ct(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function Fe(e,t){return new ct(e,t)}function Co(e){for(let t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Ir(e){for(let t=e.s;t!==void 0;t=t.n){const r=t.S.n;if(r!==void 0&&(t.r=r),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function So(e){let t,r=e.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):t=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}e.s=t}function ae(e,t){ct.call(this,void 0),this.x=e,this.s=void 0,this.g=Qe-1,this.f=4,this.W=t==null?void 0:t.watched,this.Z=t==null?void 0:t.unwatched,this.name=t==null?void 0:t.name}function zi(e,t){return new ae(e,t)}function Eo(e){const t=e.u;if(e.u=void 0,typeof t=="function"){Yt++;const r=H;H=void 0;try{t()}catch(o){throw e.f&=-2,e.f|=8,Wn(e),o}finally{H=r,un()}}}function Wn(e){for(let t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,Eo(e)}function Gi(e){if(H!==this)throw new Error("Out-of-order effect");So(this),H=e,this.f&=-2,8&this.f&&Wn(this),un()}function ve(e,t){this.x=e,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=t==null?void 0:t.name}function Zt(e,t){const r=new ve(e,t);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function mn(e,t={}){const r={};for(const o in e){const s=t[o],a=Fe(s===void 0?e[o]:s);r[o]=a}return r}ct.prototype.brand=Bi,ct.prototype.h=function(){return!0},ct.prototype.S=function(e){const t=this.t;t!==e&&e.e===void 0&&(e.x=t,this.t=e,t!==void 0?t.e=e:Mr(()=>{var r;(r=this.W)==null||r.call(this)}))},ct.prototype.U=function(e){if(this.t!==void 0){const t=e.e,r=e.x;t!==void 0&&(t.x=r,e.e=void 0),r!==void 0&&(r.e=t,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Mr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},ct.prototype.subscribe=function(e){return Zt(()=>{const t=this.value,r=H;H=void 0;try{e(t)}finally{H=r}},{name:"sub"})},ct.prototype.valueOf=function(){return this.value},ct.prototype.toString=function(){return this.value+""},ct.prototype.toJSON=function(){return this.value},ct.prototype.peek=function(){const e=H;H=void 0;try{return this.value}finally{H=e}},Object.defineProperty(ct.prototype,"value",{get(){const e=Dr(this);return e!==void 0&&(e.i=this.i),this.v},set(e){if(e!==this.v){if(Bn>100)throw new Error("Cycle detected");this.v=e,this.i++,Qe++,Yt++;try{for(let t=this.t;t!==void 0;t=t.x)t.t.N()}finally{un()}}}}),ae.prototype=new ct,ae.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Qe))return!0;if(this.g=Qe,this.f|=1,this.i>0&&!Co(this))return this.f&=-2,!0;const e=H;try{Ir(this),H=this;const t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(t){this.v=t,this.f|=16,this.i++}return H=e,So(this),this.f&=-2,!0},ae.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(let t=this.s;t!==void 0;t=t.n)t.S.S(t)}ct.prototype.S.call(this,e)},ae.prototype.U=function(e){if(this.t!==void 0&&(ct.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(let t=this.s;t!==void 0;t=t.n)t.S.U(t)}},ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(ae.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const e=Dr(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}}),ve.prototype.c=function(){const e=this.S();try{if(8&this.f||this.x===void 0)return;const t=this.x();typeof t=="function"&&(this.u=t)}finally{e()}},ve.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Eo(this),Ir(this),Yt++;const e=H;return H=this,Gi.bind(this,e)},ve.prototype.N=function(){2&this.f||(this.f|=2,this.o=Le,Le=this)},ve.prototype.d=function(){this.f|=8,1&this.f||Wn(this)},ve.prototype.dispose=function(){this.d()};b.defineExtension({build:(e,t,r)=>mn(t),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(e,t,r){const o=r.getOutput();return Zt(()=>o.disabled.value?void 0:e.registerRootListener(s=>{e.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Ro(){const e=b.$getRoot(),t=b.$getSelection(),r=b.$createParagraphNode();e.clear(),e.append(r),t!==null&&r.select(),b.$isRangeSelection(t)&&(t.format=0)}function To(e,t=Ro){return e.registerCommand(b.CLEAR_EDITOR_COMMAND,r=>(e.update(t),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(e,t,r)=>mn(t),config:b.safeCast({$onClear:Ro}),name:"@lexical/extension/ClearEditor",register(e,t,r){const{$onClear:o}=r.getOutput();return Zt(()=>To(e,o.value))}});function Ki(e){return(typeof e.nodes=="function"?e.nodes():e.nodes)||[]}function Mo(e,t){let r;return Fe(e(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=e(),r=t(this)}})}const Fn=b.defineExtension({build:e=>Mo(()=>e.getEditorState(),t=>e.registerUpdateListener(r=>{t.value=r.editorState})),name:"@lexical/extension/EditorState"});function q(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Do(e,t){if(e&&t&&!Array.isArray(t)&&typeof e=="object"&&typeof t=="object"){const r=e,o=t;for(const s in o)r[s]=Do(r[s],o[s]);return e}return t}const Zn=0,zn=1,Io=2,Cn=3,We=4,be=5,Sn=6,Oe=7;function En(e){return e.id===Zn}function Oo(e){return e.id===Io}function Hi(e){return function(t){return t.id===zn}(e)||q(305,String(e.id),String(zn)),Object.assign(e,{id:Io})}const Ui=new Set;class Xi{constructor(t,r){lt(this,"builder");lt(this,"configs");lt(this,"_dependency");lt(this,"_peerNameSet");lt(this,"extension");lt(this,"state");lt(this,"_signal");this.builder=t,this.extension=r,this.configs=new Set,this.state={id:Zn}}mergeConfigs(){let t=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)t=r(t,o);return t}init(t){const r=this.state;Oo(r)||q(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:Cn,registerState:d})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(t,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:We,initResult:w,registerState:d})}(a,i,s)}build(t){const r=this.state;let o;r.id!==We&&q(307,String(r.id),String(be)),this.extension.build&&(o=this.extension.build(t,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:be,output:i,registerState:c})}(r,o,s)}register(t,r){this._signal=r;const o=this.state;o.id!==be&&q(308,String(o.id),String(be));const s=this.extension.register&&this.extension.register(t,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:Sn})}(o),()=>{const a=this.state;a.id!==Oe&&q(309,String(o.id),String(Oe)),this.state=function(i){return Object.assign(i,{id:be})}(a),s&&s()}}afterRegistration(t){const r=this.state;let o;return r.id!==Sn&&q(310,String(r.id),String(Sn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(t,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Oe})}(r),o}getSignal(){return this._signal===void 0&&q(311),this._signal}getInitResult(){this.extension.init===void 0&&q(312,this.extension.name);const t=this.state;return function(r){return r.id>=We}(t)||q(313,String(t.id),String(We)),t.initResult}getInitPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const t=this.state;return function(r){return r.id>=Cn}(t)||q(314,String(t.id),String(Cn)),{config:t.config}}getPeer(t){const r=this.builder.extensionNameMap.get(t);return r?r.getExtensionDependency():void 0}getInitDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&q(315,this.extension.name,t.name),r.getExtensionInitDependency()}getDependency(t){const r=this.builder.getExtensionRep(t);return r===void 0&&q(315,this.extension.name,t.name),r.getExtensionDependency()}getState(){const t=this.state;return function(r){return r.id>=Oe}(t)||q(316,String(t.id),String(Oe)),t}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Ui}getPeerNameSet(){let t=this._peerNameSet;return t||(t=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=t),t}getExtensionDependency(){if(!this._dependency){const t=this.state;(function(r){return r.id>=be})(t)||q(317,this.extension.name),this._dependency={config:t.config,init:t.initResult,output:t.output}}return this._dependency}}const Or={tag:b.HISTORY_MERGE_TAG};function qi(){const e=b.$getRoot();e.isEmpty()&&e.append(b.$createParagraphNode())}const Yi=b.defineExtension({config:b.safeCast({setOptions:Or,updateOptions:Or}),init:({$initialEditorState:e=qi})=>({$initialEditorState:e,initialized:!1}),afterRegistration(e,{updateOptions:t,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))e.setEditorState(a,r);else if(typeof a=="function")e.update(()=>{a(e)},t);else if(a&&(typeof a=="string"||typeof a=="object")){const i=e.parseEditorState(a);e.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),Ar=Symbol.for("@lexical/extension/LexicalBuilder");function Pr(){}function Ji(e){throw e}function Ze(e){return Array.isArray(e)?e:[e]}const Rn="0.38.2+prod.esm";class Ve{constructor(t){lt(this,"roots");lt(this,"extensionNameMap");lt(this,"outgoingConfigEdges");lt(this,"incomingEdges");lt(this,"conflicts");lt(this,"_sortedExtensionReps");lt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Rn,this.roots=t;for(const r of t)this.addExtension(r)}static fromExtensions(t){const r=[Ze(Yi)];for(const o of t)r.push(Ze(o));return new Ve(r)}static maybeFromEditor(t){const r=t[Ar];return r&&(r.PACKAGE_VERSION!==Rn&&q(292,r.PACKAGE_VERSION,Rn),r instanceof Ve||q(293)),r}static fromEditor(t){const r=Ve.maybeFromEditor(t);return r===void 0&&q(294),r}constructEditor(){const{$initialEditorState:t,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Ar]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let t=Pr;function r(){try{t()}finally{t=Pr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return t=Wt(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(t){return this.extensionNameMap.has(t)}getExtensionRep(t){const r=this.extensionNameMap.get(t.name);if(r)return r.extension!==t&&q(295,t.name),r}addEdge(t,r,o){const s=this.outgoingConfigEdges.get(t);s?s.set(r,o):this.outgoingConfigEdges.set(t,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(t):this.incomingEdges.set(r,new Set([t]))}addExtension(t){this._sortedExtensionReps!==void 0&&q(296);const r=Ze(t),[o]=r;typeof o.name!="string"&&q(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&q(298,o.name),!s){s=new Xi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&q(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&q(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=Ze(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const t=[],r=(o,s)=>{let a=o.state;if(Oo(a))return;const i=o.extension.name;var c;En(a)||q(300,i,s||"[unknown]"),En(c=a)||q(304,String(c.id),String(Zn)),a=Object.assign(c,{id:zn}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,i)}a=Hi(a),o.state=a,t.push(o)};for(const o of this.extensionNameMap.values())En(o.state)&&r(o);for(const o of t)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&q(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=t,this._sortedExtensionReps}registerEditor(t){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(t,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(t);c&&s.push(c)}return Wt(...s)}buildCreateEditorArgs(){const t={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(t.onError=f.onError),f.disableEvents!==void 0&&(t.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(t.parentEditor=f.parentEditor),f.editable!==void 0&&(t.editable=f.editable),f.namespace!==void 0&&(t.namespace=f.namespace),f.$initialEditorState!==void 0&&(t.$initialEditorState=f.$initialEditorState),f.nodes)for(const m of Ki(f)){if(typeof m!="function"){const u=o.get(m.replace);u&&q(302,f.name,m.replace.name,u.extension.name),o.set(m.replace,p)}r.add(m)}if(f.html){if(f.html.export)for(const[m,u]of f.html.export.entries())s.set(m,u);f.html.import&&Object.assign(a,f.html.import)}f.theme&&Do(i,f.theme)}Object.keys(i).length>0&&(t.theme=i),r.size&&(t.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(t.html={},w&&(t.html.import=a),d&&(t.html.export=s));for(const p of c)p.init(t);return t.onError||(t.onError=Ji),t}}const Wi=new Set,Lr=b.defineExtension({build(e,t,r){const o=r.getDependency(Fn).output,s=Fe({watchedNodeKeys:new Map}),a=Mo(()=>{},()=>Zt(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const m=b.$getNodeByKey(p),u=m&&m.isSelected()||!1;d=d||u!==(!!i&&i.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=zi(()=>(a.value||Wi).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Fn],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class ke extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(t){return new ke(t.__key)}static importJSON(t){return Ao().updateFromJSON(t)}static importDOM(){return{hr:()=>({conversion:Zi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(t){const r=document.createElement("hr");return _o(r,t.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Zi(){return{node:Ao()}}function Ao(){return b.$create(ke)}function Qi(e){return e instanceof ke}b.defineExtension({dependencies:[Fn,Lr],name:"@lexical/extension/HorizontalRule",nodes:[ke],register(e,t,r){const{watchNodeKey:o}=r.getDependency(Lr).output,s=Fe({nodeSelections:new Map}),a=e._config.theme.hrSelected??"selected";return Wt(e.registerCommand(b.CLICK_COMMAND,i=>{if(b.isDOMNode(i.target)){const c=b.$getNodeFromDOMNode(i.target);if(Qi(c))return function(w,d=!1){const p=b.$getSelection(),f=w.isSelected(),m=w.getKey();let u;d&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),f?u.delete(m):u.add(m)}(c,i.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),e.registerMutationListener(ke,(i,c)=>{Fi(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,f]of i.entries())if(f==="destroyed")d.delete(p),w=!0;else{const m=d.get(p),u=e.getElementByKey(p);m?m.domNode.value=u:(w=!0,d.set(p,{domNode:Fe(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),Zt(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(Zt(()=>{const d=c.value;d&&(w.value?_o(d,a):Vi(d,a))}));return Wt(...i)}))}});function tl(e,t){return Wt(e.registerCommand(b.KEY_TAB_COMMAND,r=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;r.preventDefault();const s=function(a){const i=a.getNodes();if($i(i,m=>b.$isBlockElementNode(m)&&m.canIndent()?m:null).length>0)return!0;const c=a.anchor,w=a.focus,d=w.isBefore(c)?w:c,p=d.getNode(),f=Tr(p);if(f.canIndent()){const m=f.getKey();let u=b.$createRangeSelection();if(u.anchor.set(m,0,"element"),u.focus.set(m,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(o)?r.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return e.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),e.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const r=typeof t=="number"?t:t?t.peek():null;if(r==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>Tr(a).getIndent());return Math.max(...s)+1>=r},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(e,t,r)=>mn(t),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(e,t,r){const{disabled:o,maxIndent:s}=r.getOutput();return Zt(()=>{if(!o.value)return tl(e,s)})}});const el=b.defineExtension({name:"@lexical/react/ReactProvider"});function nl(){return b.$getRoot().getTextContent()}function rl(e,t=!0){if(e)return!1;let r=nl();return t&&(r=r.trim()),r===""}function ol(e){if(!rl(e,!1))return!1;const t=b.$getRoot().getChildren(),r=t.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=t[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!b.$isTextNode(w))return!1}}}return!0}function Po(e){return()=>ol(e)}function Lo(e){const t=window.location.origin,r=o=>{if(o.origin!==t)return;const s=e.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,f,m,u]=w;e.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const j=g.anchor;let x=j.getNode(),v=0,E=0;if(b.$isTextNode(x)&&d>=0&&p>=0&&(v=d,E=d+p,g.setTextNodeRange(x,v,x,E)),v===E&&f===""||(g.insertRawText(f),x=j.getNode()),b.$isTextNode(x)){v=m,E=m+u;const y=x.getTextContentSize();v=v>y?y:v,E=E>y?y:E,g.setTextNodeRange(x,v,x,E)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}b.defineExtension({build:(e,t,r)=>mn(t),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(e,t,r)=>Zt(()=>r.getOutput().disabled.value?void 0:Lo(e))});function sl(e,...t){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of t)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Qn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function al({editor:e,ErrorBoundary:t}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return Qn(()=>r.registerDecoratorListener(i=>{_r.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:m=>r._onError(m),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),f=r.getElementByKey(d);f!==null&&i.push(_r.createPortal(p,f,d))}return i},[o,s,r])}(e,t)}function il({editor:e,ErrorBoundary:t}){return function(r){const o=Ve.maybeFromEditor(r);if(o&&o.hasExtensionByName(el.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&sl(320,s);return!0}return!1}(e)?null:n.jsx(al,{editor:e,ErrorBoundary:t})}function Vr(e){return e.getEditorState().read(Po(e.isComposing()))}function ll({contentEditable:e,placeholder:t=null,ErrorBoundary:r}){const[o]=Bt();return function(s){Qn(()=>Wt(An.registerRichText(s),Lo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[e,n.jsx(cl,{content:t}),n.jsx(il,{editor:o,ErrorBoundary:r})]})}function cl({content:e}){const[t]=Bt(),r=function(s){const[a,i]=l.useState(()=>Vr(s));return Qn(()=>{function c(){const w=Vr(s);i(w)}return c(),Wt(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(t),o=Oi();return r?typeof e=="function"?e(o):e:null}function dl({defaultSelection:e}){const[t]=Bt();return l.useEffect(()=>{t.focus(()=>{const r=document.activeElement,o=t.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:e})},[e,t]),null}const wl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function pl({onClear:e}){const[t]=Bt();return wl(()=>To(t,e),[t,e]),null}const Vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ul({editor:e,ariaActiveDescendant:t,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:f,ariaRequired:m,autoCapitalize:u,className:g,id:j,role:x="textbox",spellCheck:v=!0,style:E,tabIndex:y,"data-testid":R,...A},L){const[_,D]=l.useState(e.isEditable()),k=l.useCallback(B=>{B&&B.ownerDocument&&B.ownerDocument.defaultView?e.setRootElement(B):e.setRootElement(null)},[e]),T=l.useMemo(()=>function(...B){return $=>{for(const F of B)typeof F=="function"?F($):F!=null&&(F.current=$)}}(L,k),[k,L]);return Vo(()=>(D(e.isEditable()),e.registerEditableListener(B=>{D(B)})),[e]),n.jsx("div",{"aria-activedescendant":_?t:void 0,"aria-autocomplete":_?r:"none","aria-controls":_?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":_&&x==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":_?f:void 0,"aria-readonly":!_||void 0,"aria-required":m,autoCapitalize:u,className:g,contentEditable:_,"data-testid":R,id:j,ref:T,role:x,spellCheck:v,style:E,tabIndex:y,...A})}const ml=l.forwardRef(ul);function $r(e){return e.getEditorState().read(Po(e.isComposing()))}const hl=l.forwardRef(fl);function fl(e,t){const{placeholder:r,...o}=e,[s]=Bt();return n.jsxs(n.Fragment,{children:[n.jsx(ml,{editor:s,...o,ref:t}),r!=null&&n.jsx(gl,{editor:s,content:r})]})}function gl({content:e,editor:t}){const r=function(i){const[c,w]=l.useState(()=>$r(i));return Vo(()=>{function d(){const p=$r(i);w(p)}return d(),Wt(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(t),[o,s]=l.useState(t.isEditable());if(l.useLayoutEffect(()=>(s(t.isEditable()),t.registerEditableListener(i=>{s(i)})),[t]),!r)return null;let a=null;return typeof e=="function"?a=e(o):e!==null&&(a=e),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function xl({placeholder:e,className:t,placeholderClassName:r}){return n.jsx(hl,{className:t??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":e,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:e})})}const $o=l.createContext(void 0);function bl({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:e,$updateToolbar:t,blockType:r,setBlockType:o,showModal:s}),[e,t,r,o,s]);return n.jsx($o.Provider,{value:i,children:a})}function Bo(){const e=l.useContext($o);if(!e)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return e}function vl(){const[e,t]=l.useState(void 0),r=l.useCallback(()=>{t(void 0)},[]),o=l.useMemo(()=>{if(e===void 0)return;const{title:a,content:i}=e;return n.jsx(Xa,{open:!0,onOpenChange:r,children:n.jsxs(eo,{children:[n.jsx(no,{children:n.jsx(ro,{children:a})}),i]})})},[e,r]),s=l.useCallback((a,i,c=!1)=>{t({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function yl({children:e}){const[t]=Bt(),[r,o]=l.useState(t),[s,a]=l.useState("paragraph"),[i,c]=vl(),w=()=>{};return l.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(bl,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,e({blockType:s})]})}function Nl(e){const[t]=Bt(),{activeEditor:r}=Bo();l.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&e(o),!1},b.COMMAND_PRIORITY_CRITICAL),[t,e]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=b.$getSelection();o&&e(o)})},[r,e])}const Fo=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),jl=l.forwardRef(({className:e,variant:t,size:r,...o},s)=>n.jsx(Zr.Root,{ref:s,className:h(Fo({variant:t,size:r,className:e})),...o}));jl.displayName=Zr.Root.displayName;const zo=l.createContext({size:"default",variant:"default"}),hn=l.forwardRef(({className:e,variant:t,size:r,children:o,...s},a)=>{const i=st();return n.jsx(wn.Root,{ref:a,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...s,dir:i,children:n.jsx(zo.Provider,{value:{variant:t,size:r},children:o})})});hn.displayName=wn.Root.displayName;const Ne=l.forwardRef(({className:e,children:t,variant:r,size:o,...s},a)=>{const i=l.useContext(zo);return n.jsx(wn.Item,{ref:a,className:h(Fo({variant:i.variant||r,size:i.size||o}),e),...s,children:t})});Ne.displayName=wn.Item.displayName;const Br=[{format:"bold",icon:C.BoldIcon,label:"Bold"},{format:"italic",icon:C.ItalicIcon,label:"Italic"},{format:"underline",icon:C.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:C.StrikethroughIcon,label:"Strikethrough"}];function kl(){const{activeEditor:e}=Bo(),[t,r]=l.useState([]),o=l.useCallback(s=>{if(b.$isRangeSelection(s)||Ra.$isTableSelection(s)){const a=[];Br.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return Nl(o),n.jsx(hn,{type:"multiple",value:t,onValueChange:r,variant:"outline",size:"sm",children:Br.map(({format:s,icon:a,label:i})=>n.jsx(Ne,{value:s,"aria-label":i,onClick:()=>{e.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function _l({onClear:e}){const[t]=Bt();l.useEffect(()=>{e&&e(()=>{t.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[t,e])}function Cl({placeholder:e="Start typing ...",autoFocus:t=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(yl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(kl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(ll,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(xl,{placeholder:e})}),ErrorBoundary:Mi}),t&&n.jsx(dl,{defaultSelection:"rootEnd"}),n.jsx(_l,{onClear:r}),n.jsx(pl,{})]})]})}const Sl={namespace:"commentEditor",theme:Yn,nodes:Jn,onError:e=>{console.error(e)}};function nn({editorState:e,editorSerializedState:t,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i}){return n.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:n.jsx(_i,{initialConfig:{...Sl,...e?{editorState:e}:{},...t?{editorState:JSON.stringify(t)}:{}},children:n.jsxs(vt,{children:[n.jsx(Cl,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(Si,{ignoreSelectionChange:!0,onChange:c=>{r==null||r(c),o==null||o(c.toJSON())}})]})})})}function El(e,t){const r=b.isDOMDocumentNode(t)?t.body.childNodes:t.childNodes;let o=[];const s=[];for(const a of r)if(!Ko.has(a.nodeName)){const i=Ho(a,e,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&i.insertAfter(b.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function Rl(e,t){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)Go(e,o[s],r,t);return r.innerHTML}function Go(e,t,r,o=null){let s=o===null||t.isSelected(o);const a=b.$isElementNode(t)&&t.excludeFromCopy("html");let i=t;o!==null&&b.$isTextNode(t)&&(i=Ai(o,t,"clone"));const c=b.$isElementNode(i)?i.getChildren():[],w=b.getRegisteredNode(e,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(e,i):i.exportDOM(e);const{element:p,after:f}=d;if(!p)return!1;const m=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],j=Go(e,g,m,o);!s&&b.$isElementNode(t)&&j&&t.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(m),r.append(p),f){const u=f.call(i,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(m);return s}const Ko=new Set(["STYLE","SCRIPT"]);function Ho(e,t,r,o,s=new Map,a){let i=[];if(Ko.has(e.nodeName))return i;let c=null;const w=function(g,j){const{nodeName:x}=g,v=j._htmlConversions.get(x.toLowerCase());let E=null;if(v!==void 0)for(const y of v){const R=y(g);R!==null&&(E===null||(E.priority||0)<=(R.priority||0))&&(E=R)}return E!==null?E.conversion:null}(e,t),d=w?w(e):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,j]of s)if(c=j(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(e.nodeName,d.forChild)}const f=e.childNodes;let m=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)m.push(...Ho(f[g],t,r,u,new Map(s),c));return p!=null&&(m=p(m)),b.isBlockDomNode(e)&&(m=Tl(e,m,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return r.push(g),g}:b.$createParagraphNode)),c==null?m.length>0?i=i.concat(m):b.isBlockDomNode(e)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(e)&&(i=i.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...m),i}function Tl(e,t,r){const o=e.style.textAlign,s=[];let a=[];for(let i=0;i<t.length;i++){const c=t[i];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===t.length-1||i<t.length-1&&b.$isBlockElementNode(t[i+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function Uo(e){const t=e.querySelector('[contenteditable="true"]');if(!t)return!1;t.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(t),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function _t(e){var t;return(t=e==null?void 0:e.root)!=null&&t.children?e.root.children.some(r=>r!=null&&r.children?r.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function Ml(e){if(!e||e.trim()==="")throw new Error("Input HTML is empty");const t=e.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),r=qr.createHeadlessEditor({namespace:"EditorUtils",theme:Yn,nodes:Jn,onError:s=>{console.error(s)}});let o;if(r.update(()=>{const a=new DOMParser().parseFromString(t,"text/html"),i=El(r,a);b.$getRoot().clear(),b.$insertNodes(i)},{discrete:!0}),r.getEditorState().read(()=>{o=r.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function rn(e){const t=qr.createHeadlessEditor({namespace:"EditorUtils",theme:Yn,nodes:Jn,onError:s=>{console.error(s)}}),r=t.parseEditorState(JSON.stringify(e));t.setEditorState(r);let o="";return t.getEditorState().read(()=>{o=Rl(t)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>").replace(/<br\s*\/?>/gi,"<br/>"),o}function tr(e){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(e.key)?(e.stopPropagation(),!0):!1}const Xo=ee.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),de=l.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",Xo({variant:t}),e),...r}));de.displayName="Badge";const fn=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));fn.displayName="Card";const qo=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));qo.displayName="CardHeader";const Yo=l.forwardRef(({className:e,...t},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Yo.displayName="CardTitle";const Jo=l.forwardRef(({className:e,...t},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Jo.displayName="CardDescription";const er=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",e),...t}));er.displayName="CardContent";const Wo=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Wo.displayName="CardFooter";const we=l.forwardRef(({className:e,orientation:t="horizontal",decorative:r=!0,...o},s)=>n.jsx(Qr.Root,{ref:s,decorative:r,orientation:t,className:h("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...o}));we.displayName=Qr.Root.displayName;const nr=l.forwardRef(({className:e,...t},r)=>n.jsx(Se.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));nr.displayName=Se.Root.displayName;const Zo=l.forwardRef(({className:e,...t},r)=>n.jsx(Se.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));Zo.displayName=Se.Image.displayName;const rr=l.forwardRef(({className:e,...t},r)=>n.jsx(Se.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));rr.displayName=Se.Fallback.displayName;const or=l.createContext(void 0);function Tt(){const e=l.useContext(or);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const Ut=ee.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),he=W.Trigger,sr=W.Group,Qo=W.Portal,ts=W.Sub,es=W.RadioGroup;function ne({variant:e="default",...t}){const r=l.useMemo(()=>({variant:e}),[e]);return n.jsx(or.Provider,{value:r,children:n.jsx(W.Root,{...t})})}const ar=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const a=Tt();return n.jsxs(W.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e,Ut({variant:a.variant})),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});ar.displayName=W.SubTrigger.displayName;const ir=l.forwardRef(({className:e,...t},r)=>n.jsx(W.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));ir.displayName=W.SubContent.displayName;const Xt=l.forwardRef(({className:e,sideOffset:t=4,children:r,...o},s)=>{const a=st();return n.jsx(W.Portal,{children:n.jsx(W.Content,{ref:s,sideOffset:t,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...o,children:n.jsx("div",{dir:a,children:r})})})});Xt.displayName=W.Content.displayName;const ze=l.forwardRef(({className:e,inset:t,...r},o)=>{const s=st(),a=Tt();return n.jsx(W.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e,Ut({variant:a.variant})),...r,dir:s})});ze.displayName=W.Item.displayName;const Gt=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const a=Tt();return n.jsxs(W.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ut({variant:a.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(W.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Gt.displayName=W.CheckboxItem.displayName;const lr=l.forwardRef(({className:e,children:t,...r},o)=>{const s=Tt();return n.jsxs(W.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ut({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(W.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});lr.displayName=W.RadioItem.displayName;const Te=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(W.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));Te.displayName=W.Label.displayName;const fe=l.forwardRef(({className:e,...t},r)=>n.jsx(W.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));fe.displayName=W.Separator.displayName;function ns({className:e,...t}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ns.displayName="DropdownMenuShortcut";function tn(e,t){return e===""?t["%comment_assign_unassigned%"]??"Unassigned":e==="Team"?t["%comment_assign_team%"]??"Team":e}function Fr({comment:e,isReply:t=!1,localizedStrings:r,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,onEditingChange:w,canEditOrDelete:d=!1,canUserResolveThread:p=!1}){const[f,m]=l.useState(!1),[u,g]=l.useState(),j=l.useRef(null);l.useEffect(()=>{if(!f)return;let _=!0;const D=j.current;if(!D)return;const k=setTimeout(()=>{_&&Uo(D)},300);return()=>{_=!1,clearTimeout(k)}},[f]);const x=l.useCallback(()=>{m(!1),g(void 0),w==null||w(!1)},[w]),v=l.useCallback(async()=>{if(!u||!i)return;await i(e.id,rn(u))&&(m(!1),g(void 0),w==null||w(!1))},[u,i,e.id,w]),E=l.useMemo(()=>{const _=new Date(e.date),D=N.formatRelativeDate(_,r["%comment_date_today%"],r["%comment_date_yesterday%"]),k=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:D,time:k})},[e.date,r]),y=l.useMemo(()=>e.user,[e.user]),R=l.useMemo(()=>e.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[e.user]),A=l.useMemo(()=>N.sanitizeHtml(N.parseParatextHtml(e.contents)),[e.contents]),L=l.useMemo(()=>{if(o&&d)return n.jsxs(n.Fragment,{children:[!N.hasCustomParatextTags(e.contents)&&n.jsxs(ze,{onClick:()=>{m(!0),g(Ml(N.parseParatextHtml(e.contents))),w==null||w(!0)},children:[n.jsx(C.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(ze,{onClick:async()=>{c&&await c(e.id)},children:[n.jsx(C.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[d,o,r,e.contents,e.id,c,w]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":t}),children:[n.jsx(nr,{className:"tw-h-8 tw-w-8",children:n.jsx(rr,{className:"tw-text-xs tw-font-medium",children:R})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:y}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:E}),n.jsx("div",{className:"tw-flex-1"}),t&&e.assignedUser!==void 0&&n.jsxs(de,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",tn(e.assignedUser,r)]})]}),f&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:j,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),x()):_.key==="Enter"&&_.shiftKey&&(_.preventDefault(),_.stopPropagation(),_t(u)&&v())},onKeyDown:_=>{tr(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},children:[n.jsx(nn,{editorSerializedState:u,onSerializedChange:_=>g(_)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(V,{size:"icon",onClick:x,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(C.X,{})}),n.jsx(V,{size:"icon",onClick:v,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!_t(u),children:n.jsx(C.ArrowUp,{})})]})]}),!f&&n.jsxs(n.Fragment,{children:[e.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),e.status==="Todo"&&t&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:A}})]})]}),o&&p&&!t&&s!=="Resolved"&&a&&n.jsx(V,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:_=>{_.stopPropagation(),a({threadId:e.thread,status:"Resolved"})},children:n.jsx(C.Check,{})}),L&&n.jsxs(ne,{children:[n.jsx(he,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",children:n.jsx(C.MoreHorizontal,{})})}),n.jsx(Xt,{align:"end",children:L})]})]})}const zr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Dl({comments:e,localizedStrings:t,isSelected:r=!1,verseRef:o,assignedUser:s,currentUser:a,handleSelectThread:i,threadId:c,threadStatus:w,handleAddCommentToThread:d,handleUpdateComment:p,handleDeleteComment:f,assignableUsers:m,canUserAddCommentToThread:u,canUserAssignThreadCallback:g,canUserResolveThreadCallback:j,canUserEditOrDeleteCommentCallback:x}){const[v,E]=l.useState(zr),[y,R]=l.useState(!1),[A,L]=l.useState(!1),[_,D]=l.useState(!1),[k,T]=l.useState(!1),[B,$]=l.useState(!1),[F,P]=l.useState(void 0),[Y,I]=l.useState(!1),[et,gt]=l.useState(!1),[Ft,Nt]=l.useState(new Map);l.useEffect(()=>{let S=!0;if(!r){I(!1),gt(!1),Nt(new Map);return}return(async()=>{const tt=g?await g(c):!1;if(!S)return;const bt=j?await j(c):!1;S&&(I(tt),gt(bt))})(),()=>{S=!1}},[r,c,g,j]);const O=l.useMemo(()=>e.filter(S=>!S.deleted),[e]);l.useEffect(()=>{let S=!0;if(!r||!x){Nt(new Map);return}return(async()=>{const tt=new Map;await Promise.all(O.map(async bt=>{const jt=await x(bt.id);S&&tt.set(bt.id,jt)})),S&&Nt(tt)})(),()=>{S=!1}},[r,O,x]);const U=l.useMemo(()=>O[0],[O]),mt=l.useRef(null),at=l.useRef(void 0),it=l.useCallback(()=>{var S;(S=at.current)==null||S.call(at),E(zr)},[]);l.useEffect(()=>{const S=mt.current;if(!S)return;const J=()=>{L(S.scrollWidth>S.clientWidth)};return J(),window.addEventListener("resize",J),()=>window.removeEventListener("resize",J)},[U==null?void 0:U.verse]),l.useEffect(()=>{D(!1)},[r]);const zt=l.useMemo(()=>({singleReply:t["%comment_thread_single_reply%"],multipleReplies:t["%comment_thread_multiple_replies%"]}),[t]),Me=l.useMemo(()=>{if(s===void 0)return;if(s==="")return t["%comment_assign_unassigned%"]??"Unassigned";const S=tn(s,t);return N.formatReplacementString(t["%comment_assigned_to%"],{assignedUser:S})},[s,t]),re=l.useMemo(()=>O.slice(1),[O]),xt=l.useMemo(()=>re.length??0,[re.length]),vn=l.useMemo(()=>xt>0,[xt]),Ye=l.useMemo(()=>_||xt<=2?re:re.slice(-2),[re,xt,_]),xe=l.useMemo(()=>_||xt<=2?0:xt-2,[xt,_]),yn=l.useMemo(()=>xt===1?zt.singleReply:N.formatReplacementString(zt.multipleReplies,{count:xt}),[xt,zt]),Nn=l.useMemo(()=>xe===1?zt.singleReply:N.formatReplacementString(zt.multipleReplies,{count:xe}),[xe,zt]),M=l.useCallback(async()=>{const S=_t(v)?rn(v):void 0;if(F!==void 0){await d({threadId:c,contents:S,assignedUser:F})&&(P(void 0),S&&it());return}S&&await d({threadId:c,contents:S})&&it()},[it,v,d,F,c]),K=l.useCallback(async S=>{const J=_t(v)?rn(v):void 0,tt=await d({...S,contents:J,assignedUser:F??S.assignedUser});return tt&&J&&it(),tt&&F!==void 0&&P(void 0),tt},[it,v,d,F]);return n.jsx(fn,{role:"option","aria-selected":r,id:c,className:h("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!r},{"tw-bg-primary-foreground":!r&&w!=="Resolved","tw-bg-background":r&&w!=="Resolved","tw-bg-muted":w==="Resolved"}),onClick:()=>{i(c)},tabIndex:-1,children:n.jsxs(er,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[Me&&n.jsx(de,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:Me}),n.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[n.jsxs("p",{ref:mt,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":y},{"tw-whitespace-nowrap":!y}),children:[o," ",U.contextBefore,n.jsx("span",{className:"tw-font-bold",children:U.selectedText}),U.contextAfter]}),A&&n.jsx(V,{variant:"ghost",size:"icon",onClick:S=>{S.stopPropagation(),R(!y)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":y?"Collapse text":"Expand text",children:y?n.jsx(C.ChevronUp,{}):n.jsx(C.ChevronDown,{})})]}),n.jsx(Fr,{comment:U,localizedStrings:t,isThreadExpanded:r,threadStatus:w,handleAddCommentToThread:K,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:T,canEditOrDelete:Ft.get(U.id)??!1,canUserResolveThread:et})]}),n.jsxs(n.Fragment,{children:[vn&&!r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:yn})]}),!r&&_t(v)&&n.jsx(nn,{editorSerializedState:v,onSerializedChange:S=>E(S),placeholder:t["%comment_replyOrAssign%"]}),r&&n.jsxs(n.Fragment,{children:[xe>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:S=>{S.stopPropagation(),D(!0)},role:"button",tabIndex:0,onKeyDown:S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),S.stopPropagation(),D(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Nn}),_?n.jsx(C.ChevronUp,{}):n.jsx(C.ChevronDown,{})]})]}),Ye.map(S=>n.jsx("div",{children:n.jsx(Fr,{comment:S,localizedStrings:t,isReply:!0,isThreadExpanded:r,handleUpdateComment:p,handleDeleteComment:f,onEditingChange:T,canEditOrDelete:Ft.get(S.id)??!1})},S.id)),u!==!1&&(!k||_t(v))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:S=>S.stopPropagation(),onKeyDownCapture:S=>{S.key==="Enter"&&S.shiftKey&&(S.preventDefault(),S.stopPropagation(),(_t(v)||F!==void 0)&&M())},onKeyDown:S=>{tr(S),(S.key==="Enter"||S.key===" ")&&S.stopPropagation()},children:[n.jsx(nn,{editorSerializedState:v,onSerializedChange:S=>E(S),placeholder:w==="Resolved"?t["%comment_reopenResolved%"]:t["%comment_replyOrAssign%"],autoFocus:!0,onClear:S=>{at.current=S}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[F!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(t["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:tn(F,t)})}),n.jsxs(Kt,{open:B,onOpenChange:$,children:[n.jsx(Ht,{asChild:!0,children:n.jsx(V,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Y||!m||m.length===0||!m.includes(a),"aria-label":"Assign user",children:n.jsx(C.AtSign,{})})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:S=>{S.key==="Escape"&&(S.stopPropagation(),$(!1))},children:n.jsx(Lt,{children:n.jsx(Vt,{children:m==null?void 0:m.map(S=>n.jsx(Rt,{onSelect:()=>{P(S!==s?S:void 0),$(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:tn(S,t)})},S||"unassigned"))})})})]}),n.jsx(V,{size:"icon",onClick:M,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!_t(v)&&F===void 0,"aria-label":"Submit comment",children:n.jsx(C.ArrowUp,{})})]})]})]})]})]})})}function Il({className:e="",threads:t,currentUser:r,localizedStrings:o,handleAddCommentToThread:s,handleUpdateComment:a,handleDeleteComment:i,assignableUsers:c,canUserAddCommentToThread:w,canUserAssignThreadCallback:d,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f,selectedThreadId:m,onSelectedThreadChange:u}){const[g,j]=l.useState(void 0),x=m??g;l.useEffect(()=>{m!==void 0&&j(m)},[m]);const v=t.filter(k=>k.comments.some(T=>!T.deleted)),E=v.map(k=>({id:k.id})),y=l.useCallback(k=>{j(k.id),u==null||u(k.id)},[u]),R=l.useCallback(k=>{j(k),u==null||u(k)},[u]),{listboxRef:A,activeId:L,handleKeyDown:_}=vo({options:E,onOptionSelect:y}),D=l.useCallback(k=>{k.key==="Escape"?(j(void 0),u==null||u(void 0),k.preventDefault(),k.stopPropagation()):_(k)},[_,u]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:A,"aria-activedescendant":L??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),onKeyDown:D,children:v.map(k=>n.jsx("div",{id:k.id,className:h({"tw-opacity-60":k.status==="Resolved"}),children:n.jsx(Dl,{comments:k.comments,localizedStrings:o,verseRef:k.verseRef,handleSelectThread:R,threadId:k.id,isSelected:x===k.id,currentUser:r,assignedUser:k.assignedUser,threadStatus:k.status,handleAddCommentToThread:s,handleUpdateComment:a,handleDeleteComment:i,assignableUsers:c,canUserAddCommentToThread:w,canUserAssignThreadCallback:d,canUserResolveThreadCallback:p,canUserEditOrDeleteCommentCallback:f})},k.id))})}function Ol({table:e}){return n.jsxs(ne,{children:[n.jsx(Yr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(C.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Xt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Te,{children:"Toggle columns"}),n.jsx(fe,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>n.jsx(Gt,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:r=>t.toggleVisibility(!!r),children:t.id},t.id))]})]})}const pe=nt.Root,rs=nt.Group,ue=nt.Value,os=ee.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Qt=l.forwardRef(({className:e,children:t,size:r,...o},s)=>{const a=st();return n.jsxs(nt.Trigger,{className:h(os({size:r,className:e})),ref:s,...o,dir:a,children:[t,n.jsx(nt.Icon,{asChild:!0,children:n.jsx(C.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Qt.displayName=nt.Trigger.displayName;const cr=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(C.ChevronUp,{className:"tw-h-4 tw-w-4"})}));cr.displayName=nt.ScrollUpButton.displayName;const dr=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:n.jsx(C.ChevronDown,{className:"tw-h-4 tw-w-4"})}));dr.displayName=nt.ScrollDownButton.displayName;const te=l.forwardRef(({className:e,children:t,position:r="popper",...o},s)=>{const a=st();return n.jsx(nt.Portal,{children:n.jsxs(nt.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:r,...o,children:[n.jsx(cr,{}),n.jsx(nt.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:t})}),n.jsx(dr,{})]})})});te.displayName=nt.Content.displayName;const ss=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));ss.displayName=nt.Label.displayName;const ft=l.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(nt.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(nt.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(nt.ItemText,{children:t})]}));ft.displayName=nt.Item.displayName;const as=l.forwardRef(({className:e,...t},r)=>n.jsx(nt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));as.displayName=nt.Separator.displayName;function Al({table:e}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(pe,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[n.jsx(Qt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ue,{placeholder:e.getState().pagination.pageSize})}),n.jsx(te,{side:"top",children:[10,20,30,40,50].map(t=>n.jsx(ft,{value:`${t}`,children:t},t))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(C.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(C.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(C.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(C.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Gr=`
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
`;function Pl(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Ge(e,t){const r=t?`${Gr}, ${t}`:Gr;return Array.from(e.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Pl(o))}const He=l.forwardRef(({className:e,stickyHeader:t,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Ge(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Ge(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":t}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",e),"aria-label":"Table","aria-labelledby":"table-label",...r})})});He.displayName="Table";const Ue=l.forwardRef(({className:e,stickyHeader:t,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...r}));Ue.displayName="TableHeader";const Xe=l.forwardRef(({className:e,...t},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",e),...t}));Xe.displayName="TableBody";const is=l.forwardRef(({className:e,...t},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));is.displayName="TableFooter";function Ll(e){l.useEffect(()=>{const t=e.current;if(!t)return;const r=o=>{if(t.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=e.current?Ge(e.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),t.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return t.addEventListener("keydown",r),()=>{t.removeEventListener("keydown",r)}},[e])}function Vl(e,t,r){let o;return r==="ArrowLeft"&&t>0?o=e[t-1]:r==="ArrowRight"&&t<e.length-1&&(o=e[t+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function $l(e,t,r){let o;return r==="ArrowDown"&&t<e.length-1?o=e[t+1]:r==="ArrowUp"&&t>0&&(o=e[t-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Ot=l.forwardRef(({className:e,onKeyDown:t,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Ll(i);const c=l.useMemo(()=>i.current?Ge(i.current):[],[i]),w=l.useCallback(p=>{const{current:f}=i;if(!f||!f.parentElement)return;const m=f.closest("table"),u=m?Ge(m).filter(x=>x.tagName==="TR"):[],g=u.indexOf(f),j=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),$l(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Vl(c,j,p.key);else if(p.key==="Escape"){p.preventDefault();const x=f.closest("table");x&&x.focus()}t==null||t(p)},[i,c,t]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",e),...s})});Ot.displayName="TableRow";const _e=l.forwardRef(({className:e,...t},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));_e.displayName="TableHead";const Jt=l.forwardRef(({className:e,...t},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Jt.displayName="TableCell";const ls=l.forwardRef(({className:e,...t},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));ls.displayName="TableCaption";function on({className:e,...t}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}function cs({columns:e,data:t,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var L;const[p,f]=l.useState([]),[m,u]=l.useState([]),[g,j]=l.useState({}),[x,v]=l.useState({}),E=l.useMemo(()=>t??[],[t]),y=dt.useReactTable({data:E,columns:e,getCoreRowModel:dt.getCoreRowModel(),...r&&{getPaginationRowModel:dt.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:dt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:dt.getFilteredRowModel(),onColumnVisibilityChange:j,onRowSelectionChange:v,state:{sorting:p,columnFilters:m,columnVisibility:g,rowSelection:x}}),R=y.getVisibleFlatColumns();let A;return w?A=Array.from({length:10}).map((k,T)=>`skeleton-row-${T}`).map(k=>n.jsx(Ot,{children:n.jsx(Jt,{colSpan:R.length??e.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(on,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},k)):((L=y.getRowModel().rows)==null?void 0:L.length)>0?A=y.getRowModel().rows.map(_=>n.jsx(Ot,{onClick:()=>i(_,y),"data-state":_.getIsSelected()&&"selected",children:_.getVisibleCells().map(D=>n.jsx(Jt,{children:dt.flexRender(D.column.columnDef.cell,D.getContext())},D.id))},_.id)):A=n.jsx(Ot,{children:n.jsx(Jt,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Ol,{table:y}),n.jsxs(He,{stickyHeader:a,children:[n.jsx(Ue,{stickyHeader:a,children:y.getHeaderGroups().map(_=>n.jsx(Ot,{children:_.headers.map(D=>n.jsx(_e,{children:D.isPlaceholder?void 0:dt.flexRender(D.column.columnDef.header,D.getContext())},D.id))},_.id))}),n.jsx(Xe,{children:A})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(V,{variant:"outline",size:"sm",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:"Previous"}),n.jsx(V,{variant:"outline",size:"sm",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Al,{table:y})]})}function Bl({id:e,markdown:t,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:e,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Aa,{options:a,children:t})})}const ds=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Kr=(e,t)=>e[t]??t;function ws({errorDetails:e,handleCopyNotify:t,localizedStrings:r,id:o}){const s=Kr(r,"%webView_error_dump_header%"),a=Kr(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(e),t&&t()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(C.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:e})})]})}const Fl=Object.freeze([...ds,"%webView_error_dump_copied_message%"]);function zl({errorDetails:e,handleCopyNotify:t,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),t&&t()},d=p=>{p||c(!1)};return n.jsxs(Kt,{onOpenChange:d,children:[n.jsx(Ht,{asChild:!0,children:o}),n.jsxs($t,{id:a,className:h("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(rt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(ws,{errorDetails:e,handleCopyNotify:w,localizedStrings:r})]})]})}var ps=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(ps||{});function Gl({id:e,label:t,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,p)=>{const f=!o[d][p];s(u=>(u[d][p]=f,{...u}));const m=r[d].items[p];m.onUpdate(m.id,f)},w=(d,p)=>{i(m=>(m[d]=p,{...m}));const f=r[d].items.find(m=>m.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:e,children:n.jsxs(ne,{children:[n.jsx(he,{asChild:!0,children:n.jsxs(V,{variant:"default",children:[n.jsx(C.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),t,n.jsx(C.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Xt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Te,{children:d.label}),n.jsx(sr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((f,m)=>n.jsx("div",{children:n.jsx(Gt,{checked:o[p][m],onCheckedChange:()=>c(p,m),children:f.label})},f.id))}):n.jsx(es,{value:a[p],onValueChange:f=>w(p,f),children:d.items.map(f=>n.jsx("div",{children:n.jsx(lr,{value:f.id,children:f.label})},f.id))})}),n.jsx(fe,{})]},d.label))})]})})}function Kl({id:e,category:t,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:e,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:t})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(C.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(C.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(C.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Hl({id:e,versionHistory:t}){const[r,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,f=d.getUTCMonth(),m=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:m===0?u="today":u=`${m.toString()} day${m===1?"":"s"} ago`,u}const i=Object.entries(t).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:e,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ul({id:e,publisherDisplayName:t,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>N.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return d.map(f=>p.of(f))})(o);return n.jsx("div",{id:e,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Hl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:t}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function us({entries:e,selected:t,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:m=!1,icon:u=void 0,className:g=void 0,variant:j="ghost",id:x}){const[v,E]=l.useState(!1),y=l.useCallback(T=>{var $;const B=($=e.find(F=>F.label===T))==null?void 0:$.value;B&&r(t.includes(B)?t.filter(F=>F!==B):[...t,B])},[e,t,r]),R=()=>w||o,A=l.useMemo(()=>{if(!m)return e;const T=e.filter($=>$.starred).sort(($,F)=>$.label.localeCompare(F.label)),B=e.filter($=>!$.starred).sort(($,F)=>{const P=t.includes($.value),Y=t.includes(F.value);return P&&!Y?-1:!P&&Y?1:$.label.localeCompare(F.label)});return[...T,...B]},[e,t,m]),L=()=>{r(e.map(T=>T.value))},_=()=>{r([])},D=d??v,k=p??E;return n.jsx("div",{id:x,className:g,children:n.jsxs(Kt,{open:D,onOpenChange:k,children:[n.jsx(Ht,{asChild:!0,children:n.jsxs(V,{variant:j,role:"combobox","aria-expanded":D,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:R()})]}),n.jsx(C.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Lt,{children:[n.jsx(me,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:L,children:a}),n.jsx(V,{variant:"ghost",size:"sm",onClick:_,children:i})]}),n.jsxs(Vt,{children:[n.jsx(Ee,{children:c}),n.jsx(Pt,{children:A.map(T=>n.jsxs(Rt,{value:T.label,onSelect:y,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(C.Check,{className:h("tw-h-4 tw-w-4",t.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(C.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function Xl({entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(us,{entries:e,selected:t,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),t.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:t.map(m=>{var u;return n.jsxs(de,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(t.filter(g=>g!==m)),children:n.jsx(C.X,{className:"tw-h-3 tw-w-3"})}),(u=e.find(g=>g.value===m))==null?void 0:u.label]},m)})}):n.jsx(rt,{children:p})]})}const ge=l.forwardRef(({className:e,type:t,...r},o)=>n.jsx("input",{type:t,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:o,...r}));ge.displayName="Input";const ql=(e,t,r)=>e==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",t["%footnoteEditor_callerDropdown_item_generated%"]]}):e==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",t["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",t["%footnoteEditor_callerDropdown_item_custom%"]]});function Yl({callerType:e,updateCallerType:t,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(e),[p,f]=l.useState(r),[m,u]=l.useState(!1);l.useEffect(()=>{d(e)},[e]),l.useEffect(()=>{p!==r&&f(r)},[r]);const g=x=>{c.current=!1,u(x),x||(w!=="custom"||p?(t(w),o(p)):(d(e),f(r)))},j=x=>{var v,E,y,R;x.stopPropagation(),document.activeElement===i.current&&x.key==="ArrowDown"||x.key==="ArrowRight"?((v=a.current)==null||v.focus(),c.current=!0):document.activeElement===a.current&&x.key==="ArrowUp"?((E=i.current)==null||E.focus(),c.current=!1):document.activeElement===a.current&&x.key==="ArrowLeft"&&((y=a.current)==null?void 0:y.selectionStart)===0&&((R=i.current)==null||R.focus(),c.current=!1),w==="custom"&&x.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(ne,{open:m,onOpenChange:g,children:[n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(he,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6",children:ql(e,s,r)})})}),n.jsx(yt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Xt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:j,onMouseMove:()=>{var x;c.current&&((x=a.current)==null||x.focus())},children:[n.jsx(Te,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(fe,{}),n.jsx(Gt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:kt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Gt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:kt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Gt,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:x=>{var v;x.stopPropagation(),c.current=!0,(v=a.current)==null||v.focus()},onSelect:x=>x.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ge,{tabIndex:0,onMouseDown:x=>{x.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:x=>{x.key==="Enter"||x.key==="ArrowUp"||x.key==="ArrowDown"||x.key==="ArrowLeft"||x.key==="ArrowRight"||x.stopPropagation()},maxLength:1,onChange:x=>f(x.target.value)})]})})]})]})}const Jl=(e,t)=>e==="f"?n.jsxs(n.Fragment,{children:[n.jsx(C.FunctionSquare,{})," ",t["%footnoteEditor_noteType_footnote_label%"]]}):e==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(C.SquareSigma,{})," ",t["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(C.SquareX,{})," ",t["%footnoteEditor_noteType_crossReference_label%"]]}),Wl=(e,t)=>{if(e==="x")return t["%footnoteEditor_noteType_crossReference_label%"];let r=t["%footnoteEditor_noteType_endNote_label%"];return e==="f"&&(r=t["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(t["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Zl({noteType:e,handleNoteTypeChange:t,localizedStrings:r}){return n.jsxs(ne,{children:[n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(Xr.TooltipTrigger,{asChild:!0,children:n.jsx(he,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:e==="x",children:Jl(e,r)})})}),n.jsx(yt,{children:n.jsx("p",{children:Wl(e,r)})})]})}),e!=="x"&&n.jsxs(Xt,{className:"tw-z-[300]",children:[n.jsx(Te,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(fe,{}),n.jsxs(Gt,{checked:e==="f",onCheckedChange:()=>t("f"),className:"tw-gap-2",children:[n.jsx(C.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Gt,{checked:e==="fe",onCheckedChange:()=>t("fe"),className:"tw-gap-2",children:[n.jsx(C.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Ql({noteOps:e,onSave:t,onClose:r,scrRef:o,noteKey:s,editorOptions:a,localizedStrings:i}){const c=l.useRef(null),w=l.createRef(),[d,p]=l.useState("generated"),[f,m]=l.useState("*"),[u,g]=l.useState("f"),j=l.useMemo(()=>({...a,markerMenuTrigger:a.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...a.view??kt.getDefaultViewOptions(),noteMode:"expanded"}}),[a]);l.useEffect(()=>{var y;(y=c.current)==null||y.focus()}),l.useEffect(()=>{var A,L;let y;const R=e==null?void 0:e.at(0);if(R&&kt.isInsertEmbedOpOfType("note",R)){const _=(A=R.insert.note)==null?void 0:A.caller;let D="custom";_===kt.GENERATOR_NOTE_CALLER?D="generated":_===kt.HIDDEN_NOTE_CALLER?D="hidden":_&&m(_),p(D),g(((L=R.insert.note)==null?void 0:L.style)??"f"),R.insert.note&&(R.insert.note.caller=""),y=setTimeout(()=>{var k;(k=c.current)==null||k.applyUpdate([{delete:1},R])},0)}return()=>{y&&clearTimeout(y)}},[e,s]);const x=l.useCallback(()=>{var R,A;const y=(A=(R=c.current)==null?void 0:R.getNoteOps(0))==null?void 0:A.at(0);y&&kt.isInsertEmbedOpOfType("note",y)&&(y.insert.note&&(d==="custom"?y.insert.note.caller=f:y.insert.note.caller=d==="generated"?kt.GENERATOR_NOTE_CALLER:kt.HIDDEN_NOTE_CALLER),t([y]))},[d,f,t]),v=()=>{var R;const y=(R=w.current)==null?void 0:R.getElementsByClassName("editor-input")[0];y!=null&&y.textContent&&navigator.clipboard.writeText(y.textContent)},E=y=>{var A,L,_;g(y);const R=(L=(A=c.current)==null?void 0:A.getNoteOps(0))==null?void 0:L.at(0);R&&kt.isInsertEmbedOpOfType("note",R)&&(R.insert.note&&(R.insert.note.style=y),(_=c.current)==null||_.applyUpdate([{delete:1},R]))};return n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Zl,{noteType:u,handleNoteTypeChange:E,localizedStrings:i}),n.jsx(Yl,{callerType:d,updateCallerType:p,customCaller:f,updateCustomCaller:m,localizedStrings:i})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(V,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(C.X,{})})}),n.jsx(yt,{children:n.jsx("p",{children:i["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(V,{onClick:x,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(C.Check,{})})}),n.jsx(yt,{children:i["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:w,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx(kt.Editorial,{options:j,onScrRefChange:()=>{},scrRef:o,ref:c}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(V,{onClick:v,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(C.Copy,{})})}),n.jsx(yt,{children:n.jsx("p",{children:i["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const tc=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function ms(e,t){if(!t||t.length===0)return e??"empty";const r=t.find(s=>typeof s=="string");if(r)return`key-${e??"unknown"}-${r.slice(0,10)}`;const o=typeof t[0]=="string"?"impossible":t[0].marker??"unknown";return`key-${e??"unknown"}-${o}`}function ec(e,t,r=!0,o=void 0){if(!t||t.length===0)return;const s=[],a=[];let i=[];return t.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{className:"tw-mb-2",children:[wr(e,c,r,!0,s),d&&o]},ms(e,c))})}function wr(e,t,r=!0,o=!0,s=[]){if(!(!t||t.length===0))return t.map(a=>{if(typeof a=="string"){const i=`${e}-text-${a.slice(0,10)}`;if(o){const c=h(`usfm_${e}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(C.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(C.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return nc(a,ms(`${e}\\${a.marker}`,[a]),r,[...s,e??"unknown"])})}function nc(e,t,r,o=[]){const{marker:s}=e;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(C.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),wr(s,e.content,r,!0,[...o,s??"unknown"])]},t)}function hs({footnote:e,layout:t="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(e.caller):e.caller,a=s!==e.caller;let i,c=e.content;Array.isArray(e.content)&&e.content.length>0&&typeof e.content[0]!="string"&&(e.content[0].marker==="fr"||e.content[0].marker==="xo")&&([i,...c]=e.content);const w=o?n.jsx("span",{className:"marker",children:`\\${e.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${e.marker}*`}):void 0,p=n.jsxs(n.Fragment,{children:[s&&n.jsxs("span",{className:h("note-caller",{formatted:a}),children:[s," "]}),i&&n.jsxs(n.Fragment,{children:[wr(e.marker,[i],o,!1)," "]})]}),u=h(t==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-text-nowrap tw-pr-2",u),children:[w,p]}),n.jsx("div",{className:h("textual-note-body tw-pr-0.5",u),children:c&&c.length>0&&n.jsx(n.Fragment,{children:ec(e.marker,c,o,d)})})]})}const rc=["%webView_footnoteList_header%"],oc=(e,t)=>e[t]??t;function sc({className:e,classNameForItems:t,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d,localizedStrings:p}){const f=p?oc(p,"%webView_footnoteList_header%"):"Footnotes",m=w??N.getFormatCallerFunction(r,void 0),u=(y,R)=>{d==null||d(y,R,s)},g=a?r.findIndex(y=>y===a):0,[j,x]=l.useState(g),v=y=>{if(r.length)switch(y.key){case"ArrowDown":y.preventDefault(),x(R=>Math.min(R+1,r.length-1));break;case"ArrowUp":y.preventDefault(),x(R=>Math.max(R-1,0));break;case"Enter":case" ":y.preventDefault(),d==null||d(r[j],j,s);break}},E=l.useRef([]);return l.useEffect(()=>{var y;j>=0&&j<E.current.length&&((y=E.current[j])==null||y.focus())},[j]),n.jsxs(n.Fragment,{children:[o==="vertical"&&n.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:f}),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:h("tw-h-full tw-overflow-y-auto",e),onKeyDown:v,children:n.jsx("div",{className:h("tw-p-0.5 tw-pt-1",o==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!c&&"formatted-font"),children:r.map((y,R)=>{const A=y===a,L=`${s}-${R}`;return n.jsxs(n.Fragment,{children:[n.jsx(fn,{ref:_=>{E.current[R]=_},role:"option","aria-selected":A,"data-marker":y.marker,"data-state":A?"selected":void 0,tabIndex:-1,className:h("data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",o==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",t),onClick:()=>u(y,R),children:n.jsx(hs,{footnote:y,layout:o,formatCaller:()=>m(y.caller,R),showMarkers:i})},L),R<r.length-1&&o==="vertical"&&n.jsx(we,{})]})})})})]})}const ac={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Tn(e,t){return e===""?t["%commentEditor_unassigned%"]??"Unassigned":e==="Team"?t["%commentEditor_team%"]??"Team":e}function ic({assignableUsers:e,onSave:t,onClose:r,localizedStrings:o}){const[s,a]=l.useState(ac),[i,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),f=l.useRef(null);l.useEffect(()=>{let v=!0;const E=f.current;if(!E)return;const y=setTimeout(()=>{v&&Uo(E)},300);return()=>{v=!1,clearTimeout(y)}},[]);const m=l.useCallback(()=>{if(!_t(s))return;const v=rn(s);t(v,i)},[s,t,i]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",j=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",x=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:x}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(V,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(C.X,{})})}),n.jsx(yt,{children:n.jsx("p",{children:j})})]})}),n.jsx(vt,{children:n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:n.jsx(V,{onClick:m,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!_t(s),children:n.jsx(C.Check,{})})}),n.jsx(yt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Kt,{open:w,onOpenChange:d,children:[n.jsx(Ht,{asChild:!0,children:n.jsxs(V,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:e.length===0,children:[n.jsx(C.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Tn(i!==void 0?i:"",o)})]})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:v=>{v.key==="Escape"&&(v.stopPropagation(),d(!1))},children:n.jsx(Lt,{children:n.jsx(Vt,{children:e.map(v=>n.jsx(Rt,{onSelect:()=>{c(v===""?void 0:v),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Tn(v,o)})},v||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:v=>{v.key==="Escape"?(v.preventDefault(),v.stopPropagation(),r()):v.key==="Enter"&&v.shiftKey&&(v.preventDefault(),v.stopPropagation(),_t(s)&&m())},onKeyDown:v=>{tr(v),(v.key==="Enter"||v.key===" ")&&v.stopPropagation()},children:n.jsx(nn,{editorSerializedState:s,onSerializedChange:v=>a(v),placeholder:u,onClear:v=>{p.current=v}})})]})}const lc=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]);function cc(e){const t=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(e))!==null;)s.index>r&&t.push(e.substring(r,s.index)),t.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<e.length&&t.push(e.substring(r)),t.length>0?t:[e]}function dc({occurrenceData:e,setScriptureReference:t,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],s=r["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const i=[],c=new Set;return e.forEach(w=>{const d=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;c.has(d)||(c.add(d),i.push(w))}),i},[e]);return n.jsxs(He,{stickyHeader:!0,children:[n.jsx(Ue,{stickyHeader:!0,children:n.jsxs(Ot,{children:[n.jsx(_e,{children:o}),n.jsx(_e,{children:s})]})}),n.jsx(Xe,{children:a.length>0&&a.map(i=>n.jsxs(Ot,{onClick:()=>{t(i.reference)},children:[n.jsx(Jt,{children:`${X.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),n.jsx(Jt,{children:cc(i.text)})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const gn=l.forwardRef(({className:e,...t},r)=>n.jsx(Pn.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:n.jsx(Pn.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}));gn.displayName=Pn.Root.displayName;const xn=e=>e==="asc"?n.jsx(C.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?n.jsx(C.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(C.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),wc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>n.jsxs(V,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,xn(t.getIsSorted())]})}),pc=(e,t)=>({accessorKey:`item${t}`,accessorFn:r=>r.items[t],header:({column:r})=>n.jsxs(V,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,xn(r.getIsSorted())]})}),uc=e=>({accessorKey:"count",header:({column:t})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(V,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,xn(t.getIsSorted())]})}),cell:({row:t})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Mn=(e,t,r,o,s,a)=>{let i=[...r];e.forEach(w=>{t==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];e.forEach(w=>{t==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},mc=(e,t,r,o,s)=>({accessorKey:"status",header:({column:a})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(V,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,xn(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(hn,{value:i,variant:"outline",type:"single",children:[n.jsx(Ne,{onClick:w=>{w.stopPropagation(),Mn([c],"approved",t,r,o,s)},value:"approved",children:n.jsx(C.CircleCheckIcon,{})}),n.jsx(Ne,{onClick:w=>{w.stopPropagation(),Mn([c],"unapproved",t,r,o,s)},value:"unapproved",children:n.jsx(C.CircleXIcon,{})}),n.jsx(Ne,{onClick:w=>{w.stopPropagation(),Mn([c],"unknown",t,r,o,s)},value:"unknown",children:n.jsx(C.CircleHelpIcon,{})})]})}}),hc=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),fc=e=>{const t=/^\\[vc]\s+(\d+)/,r=e.match(t);if(r)return+r[1]},gc=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?t[1]:""},fs=(e,t,r)=>r.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",xc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),bc=(e,t,r)=>{let o=e;return t!=="all"&&(o=o.filter(s=>t==="approved"&&s.status==="approved"||t==="unapproved"&&s.status==="unapproved"||t==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},vc=(e,t,r)=>{const o=[];return e.forEach(s=>{const a=o.find(i=>N.deepEqual(i.items,N.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText));if(a)a.count+=1,a.occurrences.push({reference:s.verseRef,text:s.verse});else{const i={items:N.isString(s.inventoryText)?[s.inventoryText]:s.inventoryText,count:1,status:fs(N.isString(s.inventoryText)?s.inventoryText:s.inventoryText[0],t,r),occurrences:[{reference:s.verseRef,text:s.verse}]};o.push(i)}}),o},Mt=(e,t)=>e[t]??t;function yc({inventoryItems:e,setVerseRef:t,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1}){const f=Mt(r,"%webView_inventory_all%"),m=Mt(r,"%webView_inventory_approved%"),u=Mt(r,"%webView_inventory_unapproved%"),g=Mt(r,"%webView_inventory_unknown%"),j=Mt(r,"%webView_inventory_scope_currentBook%"),x=Mt(r,"%webView_inventory_scope_chapter%"),v=Mt(r,"%webView_inventory_scope_verse%"),E=Mt(r,"%webView_inventory_filter_text%"),y=Mt(r,"%webView_inventory_show_additional_items%"),R=Mt(r,"%webView_inventory_no_results%"),[A,L]=l.useState(!1),[_,D]=l.useState("all"),[k,T]=l.useState(""),[B,$]=l.useState([]),F=l.useMemo(()=>{const O=e??[];return O.length===0?[]:vc(O,s,a)},[e,s,a]),P=l.useMemo(()=>{if(A)return F;const O=[];return F.forEach(U=>{const mt=U.items[0],at=O.find(it=>it.items[0]===mt);at?(at.count+=U.count,at.occurrences=at.occurrences.concat(U.occurrences)):O.push({items:[mt],count:U.count,occurrences:U.occurrences,status:U.status})}),O},[A,F]),Y=l.useMemo(()=>P.length===0?[]:bc(P,_,k),[P,_,k]),I=l.useMemo(()=>{var mt,at;if(!A)return w;const O=(mt=o==null?void 0:o.tableHeaders)==null?void 0:mt.length;if(!O)return w;const U=[];for(let it=0;it<O;it++)U.push(pc(((at=o==null?void 0:o.tableHeaders)==null?void 0:at[it])||"Additional Item",it+1));return[...U,...w]},[o==null?void 0:o.tableHeaders,w,A]);l.useEffect(()=>{Y.length===0?$([]):Y.length===1&&$(Y[0].items)},[Y]);const et=(O,U)=>{U.setRowSelection(()=>{const mt={};return mt[O.index]=!0,mt}),$(O.original.items)},gt=O=>{if(O==="book"||O==="chapter"||O==="verse")c(O);else throw new Error(`Invalid scope value: ${O}`)},Ft=O=>{if(O==="all"||O==="approved"||O==="unapproved"||O==="unknown")D(O);else throw new Error(`Invalid status filter value: ${O}`)},Nt=l.useMemo(()=>{if(P.length===0||B.length===0)return[];const O=P.filter(U=>N.deepEqual(A?U.items:[U.items[0]],B));if(O.length>1)throw new Error("Selected item is not unique");return O.length===0?[]:O[0].occurrences},[B,A,P]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(pe,{onValueChange:O=>Ft(O),defaultValue:_,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(ue,{placeholder:"Select filter"})}),n.jsxs(te,{children:[n.jsx(ft,{value:"all",children:f}),n.jsx(ft,{value:"approved",children:m}),n.jsx(ft,{value:"unapproved",children:u}),n.jsx(ft,{value:"unknown",children:g})]})]}),n.jsxs(pe,{onValueChange:O=>gt(O),defaultValue:i,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(ue,{placeholder:"Select scope"})}),n.jsxs(te,{children:[n.jsx(ft,{value:"book",children:j}),n.jsx(ft,{value:"chapter",children:x}),n.jsx(ft,{value:"verse",children:v})]})]}),n.jsx(ge,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:E,value:k,onChange:O=>{T(O.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(gn,{className:"tw-m-1",checked:A,onCheckedChange:O=>{L(O)}}),n.jsx(rt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??y})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(cs,{columns:I,data:Y,onRowClickHandler:et,stickyHeader:!0,isLoading:p,noResultsMessage:R})}),Nt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(dc,{occurrenceData:Nt,setScriptureReference:t,localizedStrings:r})})]})}const Nc=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function jc({localizedStrings:e,markerMenuItems:t}){const[r,o]=l.useState(""),s=l.useMemo(()=>{const a=r.trim().toLowerCase();return a?t.filter(i=>{var c;return((c=i.marker)==null?void 0:c.toLowerCase().includes(a))||i.title.toLowerCase().includes(a)}):t},[r,t]);return n.jsxs(Lt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(me,{value:r,onValueChange:a=>o(a),placeholder:e["%markerMenu_searchPlaceholder%"]}),n.jsxs(Vt,{children:[n.jsx(Ee,{children:e["%markerMenu_noResults%"]}),n.jsx(Pt,{children:s.map(a=>n.jsxs(Rt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-6",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:a.icon})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(so,{className:"tw-font-sans",children:a.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]},`item-${a.title}`))})]})]})}const kc="16rem",_c="3rem",gs=l.createContext(void 0);function qe(){const e=l.useContext(gs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const pr=l.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,p]=l.useState(e),f=t??d,m=l.useCallback(y=>{const R=typeof y=="function"?y(f):y;r?r(R):p(R)},[r,f]),u=l.useCallback(()=>m(y=>!y),[m]),g=f?"expanded":"collapsed",v=st()==="ltr"?i:i==="primary"?"secondary":"primary",E=l.useMemo(()=>({state:g,open:f,setOpen:m,toggleSidebar:u,side:v}),[g,f,m,u,v]);return n.jsx(gs.Provider,{value:E,children:n.jsx(vt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":kc,"--sidebar-width-icon":_c,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});pr.displayName="SidebarProvider";const ur=l.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:r,children:o,...s},a)=>{const i=qe();return t==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});ur.displayName="Sidebar";const xs=l.forwardRef(({className:e,onClick:t,...r},o)=>{const s=qe();return n.jsxs(V,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",e),onClick:a=>{t==null||t(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(C.PanelLeft,{}):n.jsx(C.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});xs.displayName="SidebarTrigger";const bs=l.forwardRef(({className:e,...t},r)=>{const{toggleSidebar:o}=qe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});bs.displayName="SidebarRail";const mr=l.forwardRef(({className:e,...t},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));mr.displayName="SidebarInset";const vs=l.forwardRef(({className:e,...t},r)=>n.jsx(ge,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));vs.displayName="SidebarInput";const ys=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ys.displayName="SidebarHeader";const Ns=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));Ns.displayName="SidebarFooter";const js=l.forwardRef(({className:e,...t},r)=>n.jsx(we,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));js.displayName="SidebarSeparator";const hr=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));hr.displayName="SidebarContent";const sn=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));sn.displayName="SidebarGroup";const an=l.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Ce.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...r})});an.displayName="SidebarGroupLabel";const ks=l.forwardRef(({className:e,asChild:t=!1,...r},o)=>{const s=t?Ce.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...r})});ks.displayName="SidebarGroupAction";const ln=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",e),...t}));ln.displayName="SidebarGroupContent";const fr=l.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));fr.displayName="SidebarMenu";const gr=l.forwardRef(({className:e,...t},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",e),...t}));gr.displayName="SidebarMenuItem";const Cc=ee.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),xr=l.forwardRef(({asChild:e=!1,isActive:t=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=e?Ce.Slot:"button",{state:d}=qe(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":t,className:h(Cc({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:p}),n.jsx(yt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});xr.displayName="SidebarMenuButton";const _s=l.forwardRef(({className:e,asChild:t=!1,showOnHover:r=!1,...o},s)=>{const a=t?Ce.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...o})});_s.displayName="SidebarMenuAction";const Cs=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Cs.displayName="SidebarMenuBadge";const Ss=l.forwardRef(({className:e,showIcon:t=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...r,children:[t&&n.jsx(on,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(on,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Ss.displayName="SidebarMenuSkeleton";const Es=l.forwardRef(({className:e,...t},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));Es.displayName="SidebarMenuSub";const Rs=l.forwardRef(({...e},t)=>n.jsx("li",{ref:t,...e}));Rs.displayName="SidebarMenuSubItem";const Ts=l.forwardRef(({asChild:e=!1,size:t="md",isActive:r,className:o,...s},a)=>{const i=e?Ce.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":t,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Ts.displayName="SidebarMenuSubButton";function Ms({id:e,extensionLabels:t,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((m,u)=>{o(m,u)},[o]),p=l.useCallback(m=>{const u=r.find(g=>g.projectId===m);return u?u.projectName:m},[r]),f=l.useCallback(m=>!s.projectId&&m===s.label,[s]);return n.jsx(ur,{id:e,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(hr,{children:[n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:a}),n.jsx(ln,{children:n.jsx(fr,{children:Object.entries(t).map(([m,u])=>n.jsx(gr,{children:n.jsx(xr,{onClick:()=>d(m),isActive:f(m),children:n.jsx("span",{className:"tw-pl-3",children:u})})},m))})})]}),n.jsxs(sn,{children:[n.jsx(an,{className:"tw-text-sm",children:i}),n.jsx(ln,{className:"tw-pl-3",children:n.jsx(en,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:m=>{const u=p(m);d(u,m)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(C.ScrollText,{})})})]})]})})}const bn=l.forwardRef(({value:e,onSearch:t,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=st();return n.jsxs("div",{id:i,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(C.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(ge,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:e,onChange:d=>t(d.target.value),disabled:a}),e&&n.jsxs(V,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{t("")},children:[n.jsx(C.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});bn.displayName="SearchBar";function Sc({id:e,extensionLabels:t,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(bn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(pr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ms,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:t,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(mr,{className:"tw-min-w-[215px]",children:o})]})]})}const qt="scrBook",Ec="scrRef",ie="source",Rc="details",Tc="Scripture Reference",Mc="Scripture Book",Ds="Type",Dc="Details";function Ic(e,t){const r=t??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:qt,header:(e==null?void 0:e.scriptureReferenceColumnName)??Tc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?X.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===qt?N.formatScrRef(s.start):void 0},getGroupingValue:o=>X.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:Ec,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ie,header:r?(e==null?void 0:e.typeColumnName)??Ds:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Rc,header:(e==null?void 0:e.detailsColumnName)??Dc,cell:o=>o.getValue(),enableGrouping:!1}]}const Oc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||N.compareScrRefs(e.start,e.end)===0?`${N.scrRefToBBBCCCVVV(e.start)}+${t}`:`${N.scrRefToBBBCCCVVV(e.start)}+${t}-${N.scrRefToBBBCCCVVV(e.end)}+${r}`},Hr=e=>`${Oc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Ac({sources:e,showColumnHeaders:t=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[f,m]=l.useState([{id:qt,desc:!1}]),[u,g]=l.useState({}),j=l.useMemo(()=>e.flatMap(k=>k.data.map(T=>({...T,source:k.source}))),[e]),x=l.useMemo(()=>Ic({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{d.includes(ie)?m([{id:ie,desc:!1},{id:qt,desc:!1}]):m([{id:qt,desc:!1}])},[d]);const v=dt.useReactTable({data:j,columns:x,state:{grouping:d,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:m,onRowSelectionChange:g,getExpandedRowModel:dt.getExpandedRowModel(),getGroupedRowModel:dt.getGroupedRowModel(),getCoreRowModel:dt.getCoreRowModel(),getSortedRowModel:dt.getSortedRowModel(),getRowId:Hr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const k=v.getSelectedRowModel().rowsById,T=Object.keys(k);if(T.length===1){const B=j.find($=>Hr($)===T[0])||void 0;B&&c(B)}}},[u,j,c,v]);const E=s??Mc,y=a??Ds,R=[{label:"No Grouping",value:[]},{label:`Group by ${E}`,value:[qt]},{label:`Group by ${y}`,value:[ie]},{label:`Group by ${E} and ${y}`,value:[qt,ie]},{label:`Group by ${y} and ${E}`,value:[ie,qt]}],A=k=>{p(JSON.parse(k))},L=(k,T)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(T)},_=(k,T)=>k.getIsGrouped()?"":h("banded-row",T%2===0?"even":"odd"),D=(k,T,B)=>{if(!((k==null?void 0:k.length)===0||T.depth<B.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&n.jsxs(pe,{value:JSON.stringify(d),onValueChange:k=>{A(k)},children:[n.jsx(Qt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ue,{})}),n.jsx(te,{position:"item-aligned",children:n.jsx(rs,{children:R.map(k=>n.jsx(ft,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),n.jsxs(He,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&n.jsx(Ue,{children:v.getHeaderGroups().map(k=>n.jsx(Ot,{children:k.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(_e,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(V,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",dt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},k.id))}),n.jsx(Xe,{children:v.getRowModel().rows.map((k,T)=>{const B=st();return n.jsx(Ot,{"data-state":k.getIsSelected()?"selected":"",className:h(_(k,T)),onClick:$=>L(k,$),children:k.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==ie||!r)))return n.jsx(Jt,{className:h($.column.columnDef.id,"tw-p-[1px]",D(d,k,$)),children:$.getIsGrouped()?n.jsxs(V,{variant:"link",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()&&n.jsx(C.ChevronDown,{}),!k.getIsExpanded()&&(B==="ltr"?n.jsx(C.ChevronRight,{}):n.jsx(C.ChevronLeft,{}))," ",dt.flexRender($.column.columnDef.cell,$.getContext())," (",k.subRows.length,")"]}):dt.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},k.id)})})]})]})}const br=(e,t)=>e.filter(r=>{try{return N.getSectionForBook(r)===t}catch{return!1}}),Is=(e,t,r)=>br(e,t).every(o=>r.includes(o));function Pc({section:e,availableBookIds:t,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=br(t,e).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(V,{variant:"outline",size:"sm",onClick:()=>o(e),className:h(Is(t,e,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:li(e,i,c,w,d)})}const Ur=5,Dn=6;function Lc({availableBookInfo:e,selectedBookIds:t,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:m,ntLong:u,dcLong:g,extraLong:j}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[x,v]=l.useState(!1),[E,y]=l.useState(""),R=l.useRef(void 0),A=l.useRef(!1);if(e.length!==X.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const L=l.useMemo(()=>X.allBookIds.filter((P,Y)=>e[Y]==="1"&&!X.isObsolete(X.bookIdToNumber(P))),[e]),_=l.useMemo(()=>{if(!E.trim()){const I={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return L.forEach(et=>{const gt=N.getSectionForBook(et);I[gt].push(et)}),I}const P=L.filter(I=>qn(I,E,s)),Y={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return P.forEach(I=>{const et=N.getSectionForBook(I);Y[et].push(I)}),Y},[L,E,s]),D=l.useCallback((P,Y=!1)=>{if(!Y||!R.current){r(t.includes(P)?t.filter(O=>O!==P):[...t,P]),R.current=P;return}const I=L.findIndex(O=>O===R.current),et=L.findIndex(O=>O===P);if(I===-1||et===-1)return;const[gt,Ft]=[Math.min(I,et),Math.max(I,et)],Nt=L.slice(gt,Ft+1).map(O=>O);r(t.includes(P)?t.filter(O=>!Nt.includes(O)):[...new Set([...t,...Nt])])},[t,r,L]),k=P=>{D(P,A.current),A.current=!1},T=(P,Y)=>{P.preventDefault(),D(Y,P.shiftKey)},B=l.useCallback(P=>{const Y=br(L,P).map(I=>I);r(Is(L,P,t)?t.filter(I=>!Y.includes(I)):[...new Set([...t,...Y])])},[t,r,L]),$=()=>{r(L.map(P=>P))},F=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(P=>n.jsx(Pc,{section:P,availableBookIds:L,selectedBookIds:t,onToggle:B,localizedStrings:o},P))}),n.jsxs(Kt,{open:x,onOpenChange:P=>{v(P),P||y("")},children:[n.jsx(Ht,{asChild:!0,children:n.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":x,className:"tw-max-w-64 tw-justify-between",children:[t.length>0?`${a}: ${t.length}`:i,n.jsx(C.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Lt,{shouldFilter:!1,onKeyDown:P=>{P.key==="Enter"&&(A.current=P.shiftKey)},children:[n.jsx(me,{placeholder:c,value:E,onValueChange:y}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:$,children:w}),n.jsx(V,{variant:"ghost",size:"sm",onClick:F,children:d})]}),n.jsxs(Vt,{children:[n.jsx(Ee,{children:p}),Object.values(N.Section).map((P,Y)=>{const I=_[P];if(I.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Pt,{heading:uo(P,m,u,g,j),children:I.map(et=>n.jsx(ho,{bookId:et,isSelected:t.includes(et),onSelect:()=>k(et),onMouseDown:gt=>T(gt,et),section:N.getSectionForBook(et),showCheck:!0,localizedBookNames:s,commandValue:$n(et,s),className:"tw-flex tw-items-center"},et))}),Y<Object.values(N.Section).length-1&&n.jsx(oo,{})]},P)})]})]})})]}),t.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[t.slice(0,t.length===Dn?Dn:Ur).map(P=>n.jsx(de,{className:"hover:tw-bg-secondary",variant:"secondary",children:ye(P,s)},P)),t.length>Dn&&n.jsx(de,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${t.length-Ur} ${f}`})]})]})}const Vc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),oe=(e,t)=>e[t]??t;function $c({scope:e,availableScopes:t,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w}){const d=oe(i,"%webView_scope_selector_selected_text%"),p=oe(i,"%webView_scope_selector_current_verse%"),f=oe(i,"%webView_scope_selector_current_chapter%"),m=oe(i,"%webView_scope_selector_current_book%"),u=oe(i,"%webView_scope_selector_choose_books%"),g=oe(i,"%webView_scope_selector_scope%"),j=oe(i,"%webView_scope_selector_select_books%"),x=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],v=t?x.filter(E=>t.includes(E.value)):x;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(rt,{children:g}),n.jsx(pn,{value:e,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:v.map(({value:E,label:y,id:R})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{className:"tw-me-2",value:E,id:R}),n.jsx(rt,{htmlFor:R,children:y})]},R))})]}),e==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(rt,{children:j}),n.jsx(Lc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const In={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Bc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...In,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in In?In[d]:p]))},w=st();return n.jsxs(pe,{value:`${t}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Qt,{size:s,className:h("pr-twp tw-w-auto",a),children:n.jsx(ue,{placeholder:c[N.getLocalizeKeyForScrollGroupId(t)]??t})}),n.jsx(te,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:250},children:e.map(d=>n.jsx(ft,{value:`${d}`,children:c[N.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Fc({children:e}){return n.jsx("div",{className:"pr-twp tw-grid",children:e})}function zc({primary:e,secondary:t,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Gc({primary:e,secondary:t,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),r?n.jsx(we,{}):""]})}function Os(e,t){var r;return(r=Object.entries(e).find(([,o])=>"menuItem"in o&&o.menuItem===t))==null?void 0:r[0]}function cn({icon:e,menuLabel:t,leading:r}){return e?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:e,alt:`${r?"Leading":"Trailing"} icon for ${t}`}):void 0}const As=(e,t,r,o)=>r?Object.entries(e).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>t.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:"command"in c?n.jsxs(ze,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(cn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(cn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(ts,{children:[n.jsx(ar,{children:c.label}),n.jsx(Qo,{children:n.jsx(ir,{children:As(e,t,Os(e,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(yt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function dn({onSelectMenuItem:e,menuData:t,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(ne,{variant:a,children:[n.jsx(he,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(V,{variant:i,size:"icon",children:o??n.jsx(C.MenuIcon,{})})}),n.jsx(Xt,{align:"start",className:"tw-z-[250]",children:Object.entries(t.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(sr,{children:n.jsx(vt,{children:As(t.groups,t.items,w,e)})}),d<p.length-1&&n.jsx(fe,{})]},w))})]})}const Ps=l.forwardRef(({id:e,className:t,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,id:e,children:r}));function Kc({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:t,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Ps,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(dn,{onSelectMenuItem:e,menuData:r,tabLabel:"Project",icon:d??n.jsx(C.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(dn,{onSelectMenuItem:t,menuData:o,tabLabel:"View Info",icon:n.jsx(C.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function Hc({onSelectProjectMenuItem:e,projectMenuData:t,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ps,{className:"tw-pointer-events-none",id:r,children:t&&n.jsx(dn,{onSelectMenuItem:e,menuData:t,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const vr=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsx(ut.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:o})});vr.displayName=ut.List.displayName;const yr=l.forwardRef(({className:e,...t},r)=>n.jsx(ut.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));yr.displayName=ut.List.displayName;const Ls=l.forwardRef(({className:e,...t},r)=>n.jsx(ut.Trigger,{ref:r,...t,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),Nr=l.forwardRef(({className:e,...t},r)=>n.jsx(ut.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Nr.displayName=ut.Content.displayName;function Uc({tabList:e,searchValue:t,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(bn,{className:a,value:t,onSearch:r,placeholder:o})]}),n.jsxs(vr,{children:[n.jsx(yr,{children:e.map(c=>n.jsx(Ls,{value:c.value,children:c.value},c.key))}),e.map(c=>n.jsx(Nr,{value:c.value,children:c.content},c.key))]})]})}function Xc({...e}){return n.jsx(Z.Menu,{...e})}function qc({...e}){return n.jsx(Z.Sub,{"data-slot":"menubar-sub",...e})}const Vs=l.forwardRef(({className:e,variant:t="default",...r},o)=>{const s=l.useMemo(()=>({variant:t}),[t]);return n.jsx(or.Provider,{value:s,children:n.jsx(Z.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...r})})});Vs.displayName=Z.Root.displayName;const $s=l.forwardRef(({className:e,...t},r)=>{const o=Tt();return n.jsx(Z.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Ut({variant:o.variant,className:e})),...t})});$s.displayName=Z.Trigger.displayName;const Bs=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>{const a=Tt();return n.jsxs(Z.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",Ut({variant:a.variant,className:e}),e),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Bs.displayName=Z.SubTrigger.displayName;const Fs=l.forwardRef(({className:e,...t},r)=>{const o=Tt();return n.jsx(Z.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},e),...t})});Fs.displayName=Z.SubContent.displayName;const zs=l.forwardRef(({className:e,align:t="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=Tt();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:a,align:t,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},e),...s})})});zs.displayName=Z.Content.displayName;const Gs=l.forwardRef(({className:e,inset:t,...r},o)=>{const s=Tt();return n.jsx(Z.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",Ut({variant:s.variant,className:e}),e),...r})});Gs.displayName=Z.Item.displayName;const Yc=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>{const a=Tt();return n.jsxs(Z.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ut({variant:a.variant,className:e}),e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),t]})});Yc.displayName=Z.CheckboxItem.displayName;const Jc=l.forwardRef(({className:e,children:t,...r},o)=>{const s=Tt();return n.jsxs(Z.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ut({variant:s.variant,className:e}),e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]})});Jc.displayName=Z.RadioItem.displayName;const Wc=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Z.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...r}));Wc.displayName=Z.Label.displayName;const Ks=l.forwardRef(({className:e,...t},r)=>n.jsx(Z.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Ks.displayName=Z.Separator.displayName;const Ae=(e,t)=>{setTimeout(()=>{t.forEach(r=>{var o;(o=e.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Hs=(e,t,r,o)=>{if(!r)return;const s=Object.entries(e).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=t.filter(d=>d.group===a).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Ct,{children:[n.jsx(At,{asChild:!0,children:"command"in d?n.jsxs(Gs,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(cn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(cn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(qc,{children:[n.jsx(Bs,{children:d.label}),n.jsx(Fs,{children:Hs(e,t,Os(e,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(yt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(n.jsx(Ks,{},`separator-${a}`)),w})};function Zc({menuData:e,onSelectMenuItem:t,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if($a.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,j,x,v;p.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Ae(a,[m]);break;case"alt+p":(g=a.current)==null||g.focus(),Ae(a,[m,u]);break;case"alt+l":(j=i.current)==null||j.focus(),Ae(i,[m,u]);break;case"alt+n":(x=c.current)==null||x.focus(),Ae(c,[m,u]);break;case"alt+h":(v=w.current)==null||v.focus(),Ae(w,[m,u]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const j=g.target.getAttribute("data-state");r(j==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!e)return n.jsx(Vs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(e.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(Xc,{children:[n.jsx($s,{ref:d(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(zs,{className:"tw-z-[250]",children:n.jsx(vt,{children:Hs(e.groups,e.items,p,t)})})]},p))})}function Qc(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function td({menuData:e,onOpenChange:t,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,e&&n.jsx(Zc,{menuData:e,onOpenChange:t,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const ed=(e,t)=>e[t]??t;function nd({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=ed(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=l.useState(!1),m=g=>{s&&s(g),o&&o([g,...r.filter(j=>j!==g)]),a&&r.find(j=>j===g)&&a([...r.filter(j=>j!==g)]),f(!1)},u=(g,j)=>{var v,E,y,R,A,L;const x=j!==g?((E=(v=e[g])==null?void 0:v.uiNames)==null?void 0:E[j])??((R=(y=e[g])==null?void 0:y.uiNames)==null?void 0:R.en):void 0;return x?`${(A=e[g])==null?void 0:A.autonym} (${x})`:(L=e[g])==null?void 0:L.autonym};return n.jsxs("div",{id:w,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(pe,{name:"uiLanguage",value:t,onValueChange:m,open:p,onOpenChange:g=>f(g),children:[n.jsx(Qt,{children:n.jsx(ue,{})}),n.jsx(te,{className:"tw-z-[250]",children:Object.keys(e).map(g=>n.jsx(ft,{value:g,children:u(g,t)},g))})]}),t!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(rt,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,t)).join(", "):e.en.autonym})})})]})}function rd({item:e,createLabel:t,createComplexLabel:r}){return t?n.jsx(rt,{children:t(e)}):r?n.jsx(rt,{children:r(e)}):n.jsx(rt,{children:e})}function od({id:e,className:t,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:e,className:t,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(gn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(rd,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function sd({cardKey:e,isSelected:t,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:w,accentColor:d}){const p=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":t,className:h("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!t},{"tw-bg-accent":t},{"tw-bg-transparent":!t},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),t&&c&&n.jsxs(ne,{children:[n.jsx(he,{className:h(d&&"tw-me-1"),asChild:!0,children:n.jsx(V,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(C.MoreHorizontal,{})})}),n.jsx(Xt,{align:"end",children:c})]})]}),t&&w&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:w})]}),d&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},e)}const Us=l.forwardRef(({className:e,...t},r)=>n.jsx(C.LoaderCircle,{size:35,className:h("tw-animate-spin",e),...t,ref:r}));Us.displayName="Spinner";function ad({id:e,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:f,onFocus:m,onBlur:u}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(rt,{htmlFor:e,className:h({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(ge,{id:e,disabled:t,placeholder:i,required:c,className:h(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:f,onFocus:m,onBlur:u}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const id=ee.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Xs=l.forwardRef(({className:e,variant:t,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",id({variant:t}),e),...r}));Xs.displayName="Alert";const qs=l.forwardRef(({className:e,...t},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));qs.displayName="AlertTitle";const Ys=l.forwardRef(({className:e,...t},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Ys.displayName="AlertDescription";const ld=Q.Root,cd=Q.Trigger,dd=Q.Group,wd=Q.Portal,pd=Q.Sub,ud=Q.RadioGroup,Js=l.forwardRef(({className:e,inset:t,children:r,...o},s)=>n.jsxs(Q.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...o,children:[r,n.jsx(C.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Js.displayName=Q.SubTrigger.displayName;const Ws=l.forwardRef(({className:e,...t},r)=>n.jsx(Q.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Ws.displayName=Q.SubContent.displayName;const Zs=l.forwardRef(({className:e,...t},r)=>n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t})}));Zs.displayName=Q.Content.displayName;const Qs=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Q.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...r}));Qs.displayName=Q.Item.displayName;const ta=l.forwardRef(({className:e,children:t,checked:r,...o},s)=>n.jsxs(Q.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(C.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));ta.displayName=Q.CheckboxItem.displayName;const ea=l.forwardRef(({className:e,children:t,...r},o)=>n.jsxs(Q.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(C.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));ea.displayName=Q.RadioItem.displayName;const na=l.forwardRef(({className:e,inset:t,...r},o)=>n.jsx(Q.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",t&&"tw-pl-8",e),...r}));na.displayName=Q.Label.displayName;const ra=l.forwardRef(({className:e,...t},r)=>n.jsx(Q.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",e),...t}));ra.displayName=Q.Separator.displayName;function oa({className:e,...t}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}oa.displayName="ContextMenuShortcut";const sa=l.createContext({direction:"bottom"});function aa({shouldScaleBackground:e=!0,direction:t="bottom",...r}){const o=l.useMemo(()=>({direction:t}),[t]);return n.jsx(sa.Provider,{value:o,children:n.jsx(Et.Drawer.Root,{shouldScaleBackground:e,direction:t,...r})})}aa.displayName="Drawer";const md=Et.Drawer.Trigger,ia=Et.Drawer.Portal,hd=Et.Drawer.Close,jr=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...t}));jr.displayName=Et.Drawer.Overlay.displayName;const la=l.forwardRef(({className:e,children:t,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(sa),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ia,{children:[n.jsx(jr,{}),n.jsxs(Et.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],e),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:t}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});la.displayName="DrawerContent";function ca({className:e,...t}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...t})}ca.displayName="DrawerHeader";function da({className:e,...t}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...t})}da.displayName="DrawerFooter";const wa=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));wa.displayName=Et.Drawer.Title.displayName;const pa=l.forwardRef(({className:e,...t},r)=>n.jsx(Et.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",e),...t}));pa.displayName=Et.Drawer.Description.displayName;const ua=l.forwardRef(({className:e,value:t,...r},o)=>n.jsx(Ln.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...r,children:n.jsx(Ln.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(t||0)}%)`}})}));ua.displayName=Ln.Root.displayName;function fd({className:e,...t}){return n.jsx(Gn.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",e),...t})}const gd=Gn.Panel;function xd({withHandle:e,className:t,...r}){return n.jsx(Gn.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",t),...r,children:e&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(C.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function bd({...e}){return n.jsx(Jr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const ma=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsxs(Pe.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:o,children:[n.jsx(Pe.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Pe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Pe.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ma.displayName=Pe.Root.displayName;const ha=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsx(Vn.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:r,children:n.jsx(Vn.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ha.displayName=Vn.Root.displayName;const vd=ut.Root,fa=l.forwardRef(({className:e,...t},r)=>{const o=st();return n.jsx(ut.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:o})});fa.displayName=ut.List.displayName;const ga=l.forwardRef(({className:e,...t},r)=>n.jsx(ut.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ga.displayName=ut.Trigger.displayName;const xa=l.forwardRef(({className:e,...t},r)=>n.jsx(ut.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));xa.displayName=ut.Content.displayName;const ba=l.forwardRef(({className:e,...t},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",e),ref:r,...t}));ba.displayName="Textarea";const yd=(e,t)=>{l.useEffect(()=>{if(!e)return()=>{};const r=e(t);return()=>{r()}},[e,t])};function Nd(e){return{preserveValue:!0,...e}}const va=(e,t,r={})=>{const o=l.useRef(t);o.current=t;const s=l.useRef(r);s.current=Nd(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!e),(async()=>{if(e){const p=await e();d&&(i(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[e]),[a,c]},On=()=>!1,jd=(e,t)=>{const[r]=va(l.useCallback(async()=>{if(!e)return On;const o=await Promise.resolve(e(t));return async()=>o()},[t,e]),On,{preserveValue:!1});l.useEffect(()=>()=>{r!==On&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Jr.toast});exports.Alert=Xs;exports.AlertDescription=Ys;exports.AlertTitle=qs;exports.Avatar=nr;exports.AvatarFallback=rr;exports.AvatarImage=Zo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=hi;exports.BOOK_SELECTOR_STRING_KEYS=xi;exports.Badge=de;exports.BookChapterControl=mi;exports.BookSelectionMode=bo;exports.BookSelector=bi;exports.Button=V;exports.COMMENT_EDITOR_STRING_KEYS=lc;exports.COMMENT_LIST_STRING_KEYS=vi;exports.Card=fn;exports.CardContent=er;exports.CardDescription=Jo;exports.CardFooter=Wo;exports.CardHeader=qo;exports.CardTitle=Yo;exports.ChapterRangeSelector=xo;exports.Checkbox=gn;exports.Checklist=od;exports.ComboBox=en;exports.Command=Lt;exports.CommandEmpty=Ee;exports.CommandGroup=Pt;exports.CommandInput=me;exports.CommandItem=Rt;exports.CommandList=Vt;exports.CommentEditor=ic;exports.CommentList=Il;exports.ContextMenu=ld;exports.ContextMenuCheckboxItem=ta;exports.ContextMenuContent=Zs;exports.ContextMenuGroup=dd;exports.ContextMenuItem=Qs;exports.ContextMenuLabel=na;exports.ContextMenuPortal=wd;exports.ContextMenuRadioGroup=ud;exports.ContextMenuRadioItem=ea;exports.ContextMenuSeparator=ra;exports.ContextMenuShortcut=oa;exports.ContextMenuSub=pd;exports.ContextMenuSubContent=Ws;exports.ContextMenuSubTrigger=Js;exports.ContextMenuTrigger=cd;exports.DataTable=cs;exports.Drawer=aa;exports.DrawerClose=hd;exports.DrawerContent=la;exports.DrawerDescription=pa;exports.DrawerFooter=da;exports.DrawerHeader=ca;exports.DrawerOverlay=jr;exports.DrawerPortal=ia;exports.DrawerTitle=wa;exports.DrawerTrigger=md;exports.DropdownMenu=ne;exports.DropdownMenuCheckboxItem=Gt;exports.DropdownMenuContent=Xt;exports.DropdownMenuGroup=sr;exports.DropdownMenuItem=ze;exports.DropdownMenuItemType=ps;exports.DropdownMenuLabel=Te;exports.DropdownMenuPortal=Qo;exports.DropdownMenuRadioGroup=es;exports.DropdownMenuRadioItem=lr;exports.DropdownMenuSeparator=fe;exports.DropdownMenuShortcut=ns;exports.DropdownMenuSub=ts;exports.DropdownMenuSubContent=ir;exports.DropdownMenuSubTrigger=ar;exports.DropdownMenuTrigger=he;exports.ERROR_DUMP_STRING_KEYS=ds;exports.ERROR_POPOVER_STRING_KEYS=Fl;exports.ErrorDump=ws;exports.ErrorPopover=zl;exports.FOOTNOTE_EDITOR_STRING_KEYS=tc;exports.FOOTNOTE_LIST_STRING_KEYS=rc;exports.Filter=Xl;exports.FilterDropdown=Gl;exports.Footer=Ul;exports.FootnoteEditor=Ql;exports.FootnoteItem=hs;exports.FootnoteList=sc;exports.INVENTORY_STRING_KEYS=xc;exports.Input=ge;exports.Inventory=yc;exports.Label=rt;exports.MARKER_MENU_STRING_KEYS=Nc;exports.MarkdownRenderer=Bl;exports.MarkerMenu=jc;exports.MoreInfo=Kl;exports.MultiSelectComboBox=us;exports.NavigationContentSearch=Uc;exports.Popover=Kt;exports.PopoverAnchor=ci;exports.PopoverContent=$t;exports.PopoverTrigger=Ht;exports.Progress=ua;exports.RadioGroup=pn;exports.RadioGroupItem=Be;exports.RecentSearches=go;exports.ResizableHandle=xd;exports.ResizablePanel=gd;exports.ResizablePanelGroup=fd;exports.ResultsCard=sd;exports.SCOPE_SELECTOR_STRING_KEYS=Vc;exports.ScopeSelector=$c;exports.ScriptureResultsViewer=Ac;exports.ScrollGroupSelector=Bc;exports.SearchBar=bn;exports.Select=pe;exports.SelectContent=te;exports.SelectGroup=rs;exports.SelectItem=ft;exports.SelectLabel=ss;exports.SelectScrollDownButton=dr;exports.SelectScrollUpButton=cr;exports.SelectSeparator=as;exports.SelectTrigger=Qt;exports.SelectValue=ue;exports.Separator=we;exports.SettingsList=Fc;exports.SettingsListHeader=Gc;exports.SettingsListItem=zc;exports.SettingsSidebar=Ms;exports.SettingsSidebarContentSearch=Sc;exports.Sidebar=ur;exports.SidebarContent=hr;exports.SidebarFooter=Ns;exports.SidebarGroup=sn;exports.SidebarGroupAction=ks;exports.SidebarGroupContent=ln;exports.SidebarGroupLabel=an;exports.SidebarHeader=ys;exports.SidebarInput=vs;exports.SidebarInset=mr;exports.SidebarMenu=fr;exports.SidebarMenuAction=_s;exports.SidebarMenuBadge=Cs;exports.SidebarMenuButton=xr;exports.SidebarMenuItem=gr;exports.SidebarMenuSkeleton=Ss;exports.SidebarMenuSub=Es;exports.SidebarMenuSubButton=Ts;exports.SidebarMenuSubItem=Rs;exports.SidebarProvider=pr;exports.SidebarRail=bs;exports.SidebarSeparator=js;exports.SidebarTrigger=xs;exports.Skeleton=on;exports.Slider=ma;exports.Sonner=bd;exports.Spinner=Us;exports.Switch=ha;exports.TabDropdownMenu=dn;exports.TabFloatingMenu=Hc;exports.TabToolbar=Kc;exports.Table=He;exports.TableBody=Xe;exports.TableCaption=ls;exports.TableCell=Jt;exports.TableFooter=is;exports.TableHead=_e;exports.TableHeader=Ue;exports.TableRow=Ot;exports.Tabs=vd;exports.TabsContent=xa;exports.TabsList=fa;exports.TabsTrigger=ga;exports.TextField=ad;exports.Textarea=ba;exports.ToggleGroup=hn;exports.ToggleGroupItem=Ne;exports.Toolbar=td;exports.Tooltip=Ct;exports.TooltipContent=yt;exports.TooltipProvider=vt;exports.TooltipTrigger=At;exports.UiLanguageSelector=nd;exports.VerticalTabs=vr;exports.VerticalTabsContent=Nr;exports.VerticalTabsList=yr;exports.VerticalTabsTrigger=Ls;exports.badgeVariants=Xo;exports.buttonVariants=fo;exports.cn=h;exports.getBookIdFromUSFM=gc;exports.getLinesFromUSFM=hc;exports.getNumberFromUSFM=fc;exports.getStatusForItem=fs;exports.getToolbarOSReservedSpaceClassName=Qc;exports.inventoryCountColumn=uc;exports.inventoryItemColumn=wc;exports.inventoryStatusColumn=mc;exports.selectTriggerVariants=os;exports.useEvent=yd;exports.useEventAsync=jd;exports.useListbox=vo;exports.usePromise=va;exports.useRecentSearches=di;exports.useSidebar=qe;function kd(e,t="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(e)),t==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}kd(`*, ::before, ::after {
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
