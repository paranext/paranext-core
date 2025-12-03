"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react/jsx-runtime"),i=require("react"),st=require("cmdk"),y=require("lucide-react"),_a=require("clsx"),Ca=require("tailwind-merge"),Sa=require("@radix-ui/react-dialog"),v=require("platform-bible-utils"),ce=require("@radix-ui/react-slot"),Pt=require("class-variance-authority"),Ea=require("@radix-ui/react-popover"),Ta=require("@radix-ui/react-label"),Ra=require("@radix-ui/react-radio-group"),I=require("lexical"),or=require("@radix-ui/react-tooltip"),We=require("@lexical/rich-text"),Gn=require("react-dom"),Ma=require("@lexical/table"),Ia=require("@radix-ui/react-toggle-group"),Da=require("@radix-ui/react-toggle"),ar=require("@lexical/headless"),Oa=require("@radix-ui/react-separator"),Va=require("@radix-ui/react-avatar"),sr=require("@radix-ui/react-dropdown-menu"),rt=require("@tanstack/react-table"),La=require("@radix-ui/react-select"),Aa=require("markdown-to-jsx"),pt=require("@eten-tech-foundation/platform-editor"),Pa=require("@radix-ui/react-checkbox"),$a=require("@radix-ui/react-tabs"),za=require("@radix-ui/react-menubar"),Fa=require("react-hotkeys-hook"),Ba=require("@radix-ui/react-context-menu"),mt=require("vaul"),Ga=require("@radix-ui/react-progress"),Ha=require("react-resizable-panels"),ir=require("sonner"),Ka=require("@radix-ui/react-slider"),Xa=require("@radix-ui/react-switch");function Q(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return n.default=t,Object.freeze(n)}const He=Q(i),ut=Q(Sa),ie=Q(Ea),lr=Q(Ta),xe=Q(Ra),je=Q(or),Pe=Q(Ia),wr=Q(Da),cr=Q(Oa),de=Q(Va),U=Q(sr),W=Q(La),Ze=Q(Pa),it=Q($a),Y=Q(za),J=Q(Ba),Qe=Q(Ga),an=Q(Ha),be=Q(Ka),tn=Q(Xa),qa=Ca.extendTailwindMerge({prefix:"tw-"});function u(...t){return qa(_a.clsx(t))}const Ua="layoutDirection";function et(){const t=localStorage.getItem(Ua);return t==="rtl"?t:"ltr"}const Ya=ut.Root,Ja=ut.Portal,dr=i.forwardRef(({className:t,...n},r)=>e.jsx(ut.Overlay,{ref:r,className:u("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...n}));dr.displayName=ut.Overlay.displayName;const pr=i.forwardRef(({className:t,children:n,...r},o)=>{const a=et();return e.jsxs(Ja,{children:[e.jsx(dr,{}),e.jsxs(ut.Content,{ref:o,className:u("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[n,e.jsxs(ut.Close,{className:u("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[e.jsx(y.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});pr.displayName=ut.Content.displayName;function ur({className:t,...n}){return e.jsx("div",{className:u("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...n})}ur.displayName="DialogHeader";const mr=i.forwardRef(({className:t,...n},r)=>e.jsx(ut.Title,{ref:r,className:u("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));mr.displayName=ut.Title.displayName;const Wa=i.forwardRef(({className:t,...n},r)=>e.jsx(ut.Description,{ref:r,className:u("tw-text-sm tw-text-muted-foreground",t),...n}));Wa.displayName=ut.Description.displayName;const Zt=i.forwardRef(({className:t,...n},r)=>e.jsx(st.Command,{ref:r,className:u("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...n}));Zt.displayName=st.Command.displayName;const pe=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[e.jsx(y.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),e.jsx(st.Command.Input,{ref:r,className:u("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n})]})});pe.displayName=st.Command.Input.displayName;const Qt=i.forwardRef(({className:t,...n},r)=>e.jsx(st.Command.List,{ref:r,className:u("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...n}));Qt.displayName=st.Command.List.displayName;const ke=i.forwardRef((t,n)=>e.jsx(st.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ke.displayName=st.Command.Empty.displayName;const Tt=i.forwardRef(({className:t,...n},r)=>e.jsx(st.Command.Group,{ref:r,className:u("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...n}));Tt.displayName=st.Command.Group.displayName;const hr=i.forwardRef(({className:t,...n},r)=>e.jsx(st.Command.Separator,{ref:r,className:u("tw--mx-1 tw-h-px tw-bg-border",t),...n}));hr.displayName=st.Command.Separator.displayName;const $t=i.forwardRef(({className:t,...n},r)=>e.jsx(st.Command.Item,{ref:r,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...n}));$t.displayName=st.Command.Item.displayName;var Za=Object.defineProperty,Qa=(t,n,r)=>n in t?Za(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,z=(t,n,r)=>Qa(t,typeof n!="symbol"?n+"":n,r);const Ut=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],sn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],fr=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Hn=ws();function ue(t,n=!0){return n&&(t=t.toUpperCase()),t in Hn?Hn[t]:0}function ln(t){return ue(t)>0}function ts(t){const n=typeof t=="string"?ue(t):t;return n>=40&&n<=66}function es(t){return(typeof t=="string"?ue(t):t)<=39}function gr(t){return t<=66}function ns(t){const n=typeof t=="string"?ue(t):t;return vr(n)&&!gr(n)}function*rs(){for(let t=1;t<=Ut.length;t++)yield t}const os=1,br=Ut.length;function as(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wn(t,n="***"){const r=t-1;return r<0||r>=Ut.length?n:Ut[r]}function xr(t){return t<=0||t>br?"******":fr[t-1]}function ss(t){return xr(ue(t))}function vr(t){const n=typeof t=="number"?wn(t):t;return ln(n)&&!sn.includes(n)}function is(t){const n=typeof t=="number"?wn(t):t;return ln(n)&&sn.includes(n)}function ls(t){return fr[t-1].includes("*obsolete*")}function ws(){const t={};for(let n=0;n<Ut.length;n++)t[Ut[n]]=n+1;return t}const H={allBookIds:Ut,nonCanonicalIds:sn,bookIdToNumber:ue,isBookIdValid:ln,isBookNT:ts,isBookOT:es,isBookOTNT:gr,isBookDC:ns,allBookNumbers:rs,firstBook:os,lastBook:br,extraBooks:as,bookNumberToId:wn,bookNumberToEnglishName:xr,bookIdToEnglishName:ss,isCanonical:vr,isExtraMaterial:is,isObsolete:ls};var xt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(xt||{});const lt=class{constructor(n){if(z(this,"name"),z(this,"fullPath"),z(this,"isPresent"),z(this,"hasVerseSegments"),z(this,"isCustomized"),z(this,"baseVersification"),z(this,"scriptureBooks"),z(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=xt[n]):(this._type=n,this.name=xt[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};z(lt,"Original",new lt(xt.Original)),z(lt,"Septuagint",new lt(xt.Septuagint)),z(lt,"Vulgate",new lt(xt.Vulgate)),z(lt,"English",new lt(xt.English)),z(lt,"RussianProtestant",new lt(xt.RussianProtestant)),z(lt,"RussianOrthodox",new lt(xt.RussianOrthodox));let Ht=lt;function Kn(t,n){const r=n[0];for(let o=1;o<n.length;o++)t=t.split(n[o]).join(r);return t.split(r)}var yr=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(yr||{});const at=class B{constructor(n,r,o,a){if(z(this,"firstChapter"),z(this,"lastChapter"),z(this,"lastVerse"),z(this,"hasSegmentsDefined"),z(this,"text"),z(this,"BBBCCCVVVS"),z(this,"longHashCode"),z(this,"versification"),z(this,"rtlMark","‏"),z(this,"_bookNum",0),z(this,"_chapterNum",0),z(this,"_verseNum",0),z(this,"_verse"),o==null&&a==null)if(n!=null&&typeof n=="string"){const s=n,l=r!=null&&r instanceof Ht?r:void 0;this.setEmpty(l),this.parse(s)}else if(n!=null&&typeof n=="number"){const s=r!=null&&r instanceof Ht?r:void 0;this.setEmpty(s),this._verseNum=n%B.chapterDigitShifter,this._chapterNum=Math.floor(n%B.bookDigitShifter/B.chapterDigitShifter),this._bookNum=Math.floor(n/B.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof B){const s=n;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(n==null)return;const s=n instanceof Ht?n:B.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&o!=null)if(typeof n=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(n,r,o);else if(typeof n=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=o,this.versification=a??B.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new B(n),{success:!0,verseRef:r}}catch(o){if(o instanceof fe)return r=new B,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(n,r,o){return n%B.bcvMaxValue*B.bookDigitShifter+(r>=0?r%B.bcvMaxValue*B.chapterDigitShifter:0)+(o>=0?o%B.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:o,verseNum:a,verse:s,versificationStr:l}=n,w=s||a.toString();let p;return l&&(p=new Ht(l)),r?new B(r,o.toString(),w,p):new B}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<n.length;a++){if(o=n[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>B.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(B.verseRangeSeparator)||this._verse.includes(B.verseSequenceIndicator))}get book(){return H.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=H.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:o}=B.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=B.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>H.lastBook)throw new fe("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Ht(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(B.verseRangeSeparators,B.verseSequenceIndicators)}get BBBCCC(){return B.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return B.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const s=n.split("/");if(n=s[0],s.length>1)try{const l=+s[1].trim();this.versification=new Ht(xt[l])}catch{throw new fe("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new fe("Invalid reference : "+n);const o=r[1].split(":"),a=+o[0];if(o.length!==2||H.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!B.isVerseParseable(o[1]))throw new fe("Invalid reference : "+n);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new B(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof B?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=B.verseRangeSeparators,o=B.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],s=Kn(this._verse,o);for(const l of s.map(w=>Kn(w,r))){const w=this.clone();w.verse=l[0];const p=w.verseNum;if(a.push(w),l.length>1){const c=this.clone();if(c.verse=l[1],!n)for(let d=p+1;d<c.verseNum;d++){const f=new B(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||a.push(f)}a.push(c)}}return a}validateVerse(n,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,n,r)){const s=a.internalValid;if(s!==0)return s;const l=a.BBBCCCVVV;if(o>l)return 3;if(o===l)return 4;o=l}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>H.lastBook?2:(H.isCanonical(this._bookNum),0)}setEmpty(n=B.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,o){this.bookNum=H.bookIdToNumber(n),this.chapter=r,this.verse=o}};z(at,"defaultVersification",Ht.English),z(at,"verseRangeSeparator","-"),z(at,"verseSequenceIndicator",","),z(at,"verseRangeSeparators",[at.verseRangeSeparator]),z(at,"verseSequenceIndicators",[at.verseSequenceIndicator]),z(at,"chapterDigitShifter",1e3),z(at,"bookDigitShifter",at.chapterDigitShifter*at.chapterDigitShifter),z(at,"bcvMaxValue",at.chapterDigitShifter-1),z(at,"ValidStatusType",yr);let fe=class extends Error{};const Nr=(t,n,r,o,a)=>{switch(t){case v.Section.OT:return n??"Old Testament";case v.Section.NT:return r??"New Testament";case v.Section.DC:return o??"Deuterocanon";case v.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},cs=(t,n,r,o,a)=>{switch(t){case v.Section.OT:return n??"OT";case v.Section.NT:return r??"NT";case v.Section.DC:return o??"DC";case v.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ae(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedName)??H.bookIdToEnglishName(t)}function cn(t,n){var o;return((o=n==null?void 0:n.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const jr=H.allBookIds.filter(t=>!H.isObsolete(H.bookIdToNumber(t))),qt=Object.fromEntries(jr.map(t=>[t,H.bookIdToEnglishName(t)]));function dn(t,n,r){const o=n.trim().toLowerCase();if(!o)return!1;const a=H.bookIdToEnglishName(t),s=r==null?void 0:r.get(t);return!!(v.includes(a.toLowerCase(),o)||v.includes(t.toLowerCase(),o)||(s?v.includes(s.localizedName.toLowerCase(),o)||v.includes(s.localizedId.toLowerCase(),o):!1))}const kr=i.forwardRef(({bookId:t,isSelected:n,onSelect:r,onMouseDown:o,section:a,className:s,showCheck:l=!1,localizedBookNames:w,commandValue:p},c)=>{const d=i.useRef(!1),f=()=>{d.current||r==null||r(t),setTimeout(()=>{d.current=!1},100)},h=b=>{d.current=!0,o?o(b):r==null||r(t)},m=i.useMemo(()=>ae(t,w),[t,w]),g=i.useMemo(()=>cn(t,w),[t,w]);return e.jsx("div",{className:u("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===v.Section.OT,"tw-border-s-purple-200":a===v.Section.NT,"tw-border-s-indigo-200":a===v.Section.DC,"tw-border-s-amber-200":a===v.Section.Extra}),children:e.jsxs($t,{ref:c,value:p||`${t} ${H.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":n,"aria-label":`${H.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:s,children:[l&&e.jsx(y.Check,{className:u("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",n?"tw-opacity-100":"tw-opacity-0")}),e.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),e.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),_r=Pt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),P=i.forwardRef(({className:t,variant:n,size:r,asChild:o=!1,...a},s)=>{const l=o?ce.Slot:"button";return e.jsx(l,{className:u(_r({variant:n,size:r,className:t})),ref:s,...a})});P.displayName="Button";const te=ie.Root,ee=ie.Trigger,ds=ie.Anchor,zt=i.forwardRef(({className:t,align:n="center",sideOffset:r=4,...o},a)=>{const s=et();return e.jsx(ie.Portal,{children:e.jsx(ie.Content,{ref:a,align:n,sideOffset:r,className:u("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:s})})});zt.displayName=ie.Content.displayName;function en(t,n,r){return`${t} ${qt[t]}${n?` ${cn(t,n)} ${ae(t,n)}`:""}${r?` ${r}`:""}`}function Cr({recentSearches:t,onSearchItemSelect:n,renderItem:r=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:a="Show recent searches",groupHeading:s="Recent",id:l}){const[w,p]=i.useState(!1);if(t.length===0)return;const c=d=>{n(d),p(!1)};return e.jsxs(te,{open:w,onOpenChange:p,children:[e.jsx(ee,{asChild:!0,children:e.jsx(P,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:e.jsx(y.Clock,{className:"tw-h-4 tw-w-4"})})}),e.jsx(zt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:e.jsx(Zt,{children:e.jsx(Qt,{children:e.jsx(Tt,{heading:s,children:t.map(d=>e.jsxs($t,{onSelect:()=>c(d),className:"tw-flex tw-items-center",children:[e.jsx(y.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),e.jsx("span",{children:r(d)})]},o(d)))})})})})]})}function ps(t,n,r=(a,s)=>a===s,o=15){return a=>{const s=t.filter(w=>!r(w,a)),l=[a,...s.slice(0,o-1)];n(l)}}const Ke={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},us=[Ke.BOOK_ONLY,Ke.BOOK_CHAPTER,Ke.BOOK_CHAPTER_VERSE];function Xn(t){const n=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:n,isDigit:r}}function vt(t){return v.getChaptersForBook(H.bookIdToNumber(t))}function ms(t,n,r){if(!t.trim()||n.length===0)return;const o=us.reduce((a,s)=>{if(a)return a;const l=s.exec(t.trim());if(l){const[w,p=void 0,c=void 0]=l.slice(1);let d;const f=n.filter(h=>dn(h,w,r));if(f.length===1&&([d]=f),!d&&p){if(H.isBookIdValid(w)){const h=w.toUpperCase();n.includes(h)&&(d=h)}if(!d&&r){const h=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===w.toLowerCase());h&&n.includes(h[0])&&([d]=h)}}if(!d&&p){const m=(g=>Object.keys(qt).find(b=>qt[b].toLowerCase()===g.toLowerCase()))(w);if(m&&n.includes(m)&&(d=m),!d&&r){const g=Array.from(r.entries()).find(([,b])=>b.localizedName.toLowerCase()===w.toLowerCase());g&&n.includes(g[0])&&([d]=g)}}if(d){let h=p?parseInt(p,10):void 0;h&&h>vt(d)&&(h=Math.max(vt(d),1));const m=c?parseInt(c,10):void 0;return{book:d,chapterNum:h,verseNum:m}}}},void 0);if(o)return o}function hs(t,n,r,o){const a=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const p=n.indexOf(t.book);if(p>0){const c=n[p-1],d=Math.max(vt(c),1);o({book:c,chapterNum:d,verseNum:1})}}},[t,n,o]),s=i.useCallback(()=>{const p=vt(t.book);if(t.chapterNum<p)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const c=n.indexOf(t.book);if(c<n.length-1){const d=n[c+1];o({book:d,chapterNum:1,verseNum:1})}}},[t,n,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),w=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:a,disabled:n.length===0||t.chapterNum===1&&n.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?y.ChevronsLeft:y.ChevronsRight},{onClick:l,disabled:n.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?y.ChevronLeft:y.ChevronRight},{onClick:w,disabled:n.length===0,title:"Next verse",icon:r==="ltr"?y.ChevronRight:y.ChevronLeft},{onClick:s,disabled:n.length===0||(t.chapterNum===vt(t.book)||vt(t.book)===-1)&&n.indexOf(t.book)===n.length-1,title:"Next chapter",icon:r==="ltr"?y.ChevronsRight:y.ChevronsLeft}],[t,n,r,a,l,w,s])}function qn({bookId:t,scrRef:n,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:s}){if(t)return e.jsx(Tt,{children:e.jsx("div",{className:u("tw-grid tw-grid-cols-6 tw-gap-1",s),children:Array.from({length:vt(t)},(l,w)=>w+1).map(l=>e.jsx($t,{value:`${t} ${qt[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:u("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===n.book&&l===n.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(l))??!1}),children:l},l))})})}function fs({scrRef:t,handleSubmit:n,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:s,recentSearches:l,onAddRecentSearch:w,id:p}){const c=et(),[d,f]=i.useState(!1),[h,m]=i.useState(""),[g,b]=i.useState(""),[j,O]=i.useState("books"),[N,x]=i.useState(void 0),[_,L]=i.useState(!1),C=i.useRef(void 0),S=i.useRef(void 0),R=i.useRef(void 0),E=i.useRef(void 0),T=i.useRef({}),A=i.useCallback(M=>{n(M),w&&w(M)},[n,w]),$=i.useMemo(()=>o?o():jr,[o]),F=i.useMemo(()=>({[v.Section.OT]:$.filter(G=>H.isBookOT(G)),[v.Section.NT]:$.filter(G=>H.isBookNT(G)),[v.Section.DC]:$.filter(G=>H.isBookDC(G)),[v.Section.Extra]:$.filter(G=>H.extraBooks().includes(G))}),[$]),D=i.useMemo(()=>Object.values(F).flat(),[F]),X=i.useMemo(()=>{if(!g.trim())return F;const M={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return[v.Section.OT,v.Section.NT,v.Section.DC,v.Section.Extra].forEach(Z=>{M[Z]=F[Z].filter(nt=>dn(nt,g,a))}),M},[F,g,a]),V=i.useMemo(()=>ms(g,D,a),[g,D,a]),q=i.useCallback(()=>{V&&(A({book:V.book,chapterNum:V.chapterNum??1,verseNum:V.verseNum??1}),f(!1),b(""),m(""))},[A,V]),dt=i.useCallback(M=>{if(vt(M)<=1){A({book:M,chapterNum:1,verseNum:1}),f(!1),b("");return}x(M),O("chapters")},[A]),It=i.useCallback(M=>{const G=j==="chapters"?N:V==null?void 0:V.book;G&&(A({book:G,chapterNum:M,verseNum:1}),f(!1),O("books"),x(void 0),b(""))},[A,j,N,V]),ft=i.useCallback(M=>{A(M),f(!1),b("")},[A]),k=hs(t,D,c,n),K=i.useCallback(()=>{O("books"),x(void 0),setTimeout(()=>{S.current&&S.current.focus()},0)},[]),ct=i.useCallback(M=>{if(!M&&j==="chapters"){K();return}f(M),M&&(O("books"),x(void 0),b(""))},[j,K]),{otLong:gt,ntLong:_t,dcLong:$n,extraLong:zn}={otLong:s==null?void 0:s["%scripture_section_ot_long%"],ntLong:s==null?void 0:s["%scripture_section_nt_long%"],dcLong:s==null?void 0:s["%scripture_section_dc_long%"],extraLong:s==null?void 0:s["%scripture_section_extra_long%"]},xa=i.useCallback(M=>Nr(M,gt,_t,$n,zn),[gt,_t,$n,zn]),va=i.useCallback(M=>V?!!V.chapterNum&&!M.toString().includes(V.chapterNum.toString()):!1,[V]),ya=i.useMemo(()=>v.formatScrRef(t,a?ae(t.book,a):"English"),[t,a]),Fn=i.useCallback(M=>G=>{T.current[M]=G},[]),Na=i.useCallback(M=>{(M.key==="Home"||M.key==="End")&&M.stopPropagation()},[]),ja=i.useCallback(M=>{if(M.ctrlKey)return;const{isLetter:G,isDigit:Z}=Xn(M.key);if(j==="chapters"){if(M.key==="Backspace"){M.preventDefault(),M.stopPropagation(),K();return}if(G||Z){if(M.preventDefault(),M.stopPropagation(),O("books"),x(void 0),Z&&N){const nt=qt[N];b(`${nt} ${M.key}`)}else b(M.key);setTimeout(()=>{S.current&&S.current.focus()},0);return}}if((j==="chapters"||j==="books"&&V)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(M.key)){const nt=j==="chapters"?N:V==null?void 0:V.book;if(!nt)return;const ot=(()=>{if(!h)return 1;const he=h.match(/(\d+)$/);return he?parseInt(he[1],10):0})(),Bt=vt(nt);if(!Bt)return;let Ct=ot;const Bn=6;switch(M.key){case"ArrowLeft":ot!==0&&(Ct=ot>1?ot-1:Bt);break;case"ArrowRight":ot!==0&&(Ct=ot<Bt?ot+1:1);break;case"ArrowUp":Ct=ot===0?Bt:Math.max(1,ot-Bn);break;case"ArrowDown":Ct=ot===0?1:Math.min(Bt,ot+Bn);break;default:return}Ct!==ot&&(M.preventDefault(),M.stopPropagation(),m(en(nt,a,Ct)),setTimeout(()=>{const he=T.current[Ct];he&&he.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[j,V,K,N,h,a]),ka=i.useCallback(M=>{if(M.shiftKey||M.key==="Tab"||M.key===" ")return;const{isLetter:G,isDigit:Z}=Xn(M.key);(G||Z)&&(M.preventDefault(),b(nt=>nt+M.key),S.current.focus(),L(!1))},[]);return i.useLayoutEffect(()=>{const M=setTimeout(()=>{if(d&&j==="books"&&R.current&&E.current){const G=R.current,Z=E.current,nt=Z.offsetTop,ot=G.clientHeight,Bt=Z.clientHeight,Ct=nt-ot/2+Bt/2;G.scrollTo({top:Math.max(0,Ct),behavior:"smooth"}),m(en(t.book))}},0);return()=>{clearTimeout(M)}},[d,j,g,V,t.book]),i.useLayoutEffect(()=>{if(j==="chapters"&&N){const M=N===t.book;setTimeout(()=>{if(R.current)if(M){const G=T.current[t.chapterNum];G&&G.scrollIntoView({block:"center",behavior:"smooth"})}else R.current.scrollTo({top:0});C.current&&C.current.focus()},0)}},[j,N,V,t.book,t.chapterNum]),e.jsxs(te,{open:d,onOpenChange:ct,children:[e.jsx(ee,{asChild:!0,children:e.jsx(P,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":d,className:u("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:e.jsx("span",{className:"tw-truncate",children:ya})})}),e.jsx(zt,{id:p,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:e.jsxs(Zt,{ref:C,onKeyDown:ja,loop:!0,value:h,onValueChange:m,shouldFilter:!1,children:[j==="books"?e.jsxs("div",{className:"tw-flex tw-items-end",children:[e.jsxs("div",{className:"tw-relative tw-flex-1",children:[e.jsx(pe,{ref:S,value:g,onValueChange:b,onKeyDown:Na,onFocus:()=>L(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&e.jsx(Cr,{recentSearches:l,onSearchItemSelect:ft,renderItem:M=>v.formatScrRef(M,"English"),getItemKey:M=>`${M.book}-${M.chapterNum}-${M.verseNum}`,ariaLabel:s==null?void 0:s["%history_recentSearches_ariaLabel%"],groupHeading:s==null?void 0:s["%history_recent%"]})]}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:k.map(({onClick:M,disabled:G,title:Z,icon:nt})=>e.jsx(P,{variant:"ghost",size:"sm",onClick:()=>{L(!0),M()},disabled:G,className:"tw-h-10 tw-w-4 tw-p-0",title:Z,onKeyDown:ka,children:e.jsx(nt,{})},Z))})]}):e.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[e.jsx(P,{variant:"ghost",size:"sm",onClick:K,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:c==="ltr"?e.jsx(y.ArrowLeft,{className:"tw-h-4 tw-w-4"}):e.jsx(y.ArrowRight,{className:"tw-h-4 tw-w-4"})}),N&&e.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ae(N,a)})]}),!_&&e.jsxs(Qt,{ref:R,children:[j==="books"&&e.jsxs(e.Fragment,{children:[!V&&Object.entries(X).map(([M,G])=>{if(G.length!==0)return e.jsx(Tt,{heading:xa(M),children:G.map(Z=>e.jsx(kr,{bookId:Z,onSelect:nt=>dt(nt),section:v.getSectionForBook(Z),commandValue:`${Z} ${qt[Z]}`,ref:Z===t.book?E:void 0,localizedBookNames:a},Z))},M)}),V&&e.jsx(Tt,{children:e.jsx($t,{value:`${V.book} ${qt[V.book]} ${V.chapterNum||""}:${V.verseNum||""})}`,onSelect:q,className:"tw-font-semibold tw-text-primary",children:v.formatScrRef({book:V.book,chapterNum:V.chapterNum??1,verseNum:V.verseNum??1},a?cn(V.book,a):void 0)},"top-match")}),V&&vt(V.book)>1&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ae(V.book,a)}),e.jsx(qn,{bookId:V.book,scrRef:t,onChapterSelect:It,setChapterRef:Fn,isChapterDimmed:va,className:"tw-px-4 tw-pb-4"})]})]}),j==="chapters"&&N&&e.jsx(qn,{bookId:N,scrRef:t,onChapterSelect:It,setChapterRef:Fn,className:"tw-p-4"})]})]})})]})}const gs=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),bs=Pt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),tt=i.forwardRef(({className:t,...n},r)=>e.jsx(lr.Root,{ref:r,className:u("pr-twp",bs(),t),...n}));tt.displayName=lr.Root.displayName;const $e=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(xe.Root,{className:u("pr-twp tw-grid tw-gap-2",t),...n,ref:r,dir:o})});$e.displayName=xe.Root.displayName;const ve=i.forwardRef(({className:t,...n},r)=>e.jsx(xe.Item,{ref:r,className:u("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...n,children:e.jsx(xe.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:e.jsx(y.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ve.displayName=xe.Item.displayName;function xs(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Me({id:t,options:n=[],className:r,buttonClassName:o,popoverContentClassName:a,value:s,onChange:l=()=>{},getOptionLabel:w=xs,getButtonLabel:p,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:b=!1,ariaLabel:j,...O}){const[N,x]=i.useState(!1),_=p??w,L=S=>S.length>0&&typeof S[0]=="object"&&"options"in S[0],C=(S,R)=>{const E=w(S),T=typeof S=="object"&&"secondaryLabel"in S?S.secondaryLabel:void 0,A=`${R??""}${E}${T??""}`;return e.jsxs($t,{value:E,onSelect:()=>{l(S),x(!1)},className:"tw-flex tw-items-center",children:[e.jsx(y.Check,{className:u("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!s||w(s)!==E})}),e.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,T&&e.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},A)};return e.jsxs(te,{open:N,onOpenChange:x,...O,children:[e.jsx(ee,{asChild:!0,children:e.jsxs(P,{variant:m,role:"combobox","aria-expanded":N,"aria-label":j,id:t,className:u("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[e.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&e.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:c}),e.jsx("span",{className:u("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:s?_(s):d})]}),e.jsx(y.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(zt,{align:g,className:u("tw-w-[200px] tw-p-0",a),children:e.jsxs(Zt,{children:[e.jsx(pe,{placeholder:f,className:"tw-text-inherit"}),e.jsx(ke,{children:h}),e.jsx(Qt,{children:L(n)?n.map(S=>e.jsx(Tt,{heading:S.groupHeading,children:S.options.map(R=>C(R,S.groupHeading))},S.groupHeading)):n.map(S=>C(S))})]})})]})}function Sr({startChapter:t,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:s}){const l=i.useMemo(()=>Array.from({length:s},(c,d)=>d+1),[s]),w=c=>{r(c),c>n&&o(c)},p=c=>{o(c),c<t&&r(c)};return e.jsxs(e.Fragment,{children:[e.jsx(tt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),e.jsx(Me,{isDisabled:a,onChange:w,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:c=>c.toString(),value:t},"start chapter"),e.jsx(tt,{htmlFor:"end-chapters-combobox",children:"to"}),e.jsx(Me,{isDisabled:a,onChange:p,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:c=>c.toString(),value:n},"end chapter")]})}var Er=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Er||{});const vs=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Xe=(t,n)=>t[n]??n;function ys({handleBookSelectionModeChange:t,currentBookName:n,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:s,handleSelectEndChapter:l,startChapter:w,handleSelectStartChapter:p,localizedStrings:c}){const d=Xe(c,"%webView_bookSelector_currentBook%"),f=Xe(c,"%webView_bookSelector_choose%"),h=Xe(c,"%webView_bookSelector_chooseBooks%"),[m,g]=i.useState("current book"),b=j=>{g(j),t(j)};return e.jsx($e,{className:"pr-twp tw-flex",value:m,onValueChange:j=>b(j),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(ve,{value:"current book"}),e.jsx(tt,{className:"tw-ms-1",children:d})]}),e.jsx(tt,{className:"tw-flex tw-items-center",children:n}),e.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:e.jsx(Sr,{isDisabled:m==="choose books",handleSelectStartChapter:p,handleSelectEndChapter:l,chapterCount:a,startChapter:w,endChapter:s})})]}),e.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(ve,{value:"choose books"}),e.jsx(tt,{className:"tw-ms-1",children:h})]}),e.jsx(tt,{className:"tw-flex tw-items-center",children:o.map(j=>H.bookIdToEnglishName(j)).join(", ")}),e.jsx(P,{disabled:m==="current book",onClick:()=>r(),children:f})]})]})})}const Ns=["%comment_assigned_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],js=["input","select","textarea","button"],ks=["button","textbox"],Tr=({options:t,onFocusChange:n,onOptionSelect:r,onCharacterPress:o})=>{const a=i.useRef(null),[s,l]=i.useState(void 0),[w,p]=i.useState(void 0),c=i.useCallback(m=>{l(m);const g=t.find(j=>j.id===m);g&&(n==null||n(g));const b=document.getElementById(m);b&&(b.scrollIntoView({block:"center"}),b.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[n,t]),d=i.useCallback(m=>{const g=t.find(b=>b.id===m);g&&(p(b=>b===m?void 0:m),r==null||r(g))},[r,t]),f=m=>{if(!m)return!1;const g=m.tagName.toLowerCase();if(m.isContentEditable||js.includes(g))return!0;const b=m.getAttribute("role");if(b&&ks.includes(b))return!0;const j=m.getAttribute("tabindex");return j!==void 0&&j!=="-1"},h=i.useCallback(m=>{var S;const g=m.target,b=R=>R?document.getElementById(R):void 0,j=b(w),O=b(s);if(!!(j&&g&&j.contains(g)&&g!==j)&&f(g)){if(m.key==="Escape"||m.key==="ArrowLeft"&&!g.isContentEditable){if(w){m.preventDefault(),m.stopPropagation();const R=t.find(E=>E.id===w);R&&c(R.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!j)return;const R=Array.from(j.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(R.length===0)return;const E=R.findIndex(A=>A===g);if(E===-1)return;let T;m.key==="ArrowDown"?T=Math.min(E+1,R.length-1):T=Math.max(E-1,0),T!==E&&(m.preventDefault(),m.stopPropagation(),(S=R[T])==null||S.focus());return}return}const _=t.findIndex(R=>R.id===s);let L=_;switch(m.key){case"ArrowDown":L=Math.min(_+1,t.length-1),m.preventDefault();break;case"ArrowUp":L=Math.max(_-1,0),m.preventDefault();break;case"Home":L=0,m.preventDefault();break;case"End":L=t.length-1,m.preventDefault();break;case" ":case"Enter":s&&d(s),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const R=O;if(R){const E=R.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=R.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),A=E??T;if(A){m.preventDefault(),A.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(f(g)||(o==null||o(m.key),m.preventDefault()));return}const C=t[L];C&&c(C.id)},[t,c,s,w,d,o]);return{listboxRef:a,activeId:s,selectedId:w,handleKeyDown:h,focusOption:c}},Rr=i.createContext(null);function _s(t,n){return{getTheme:function(){return n??null}}}function kt(){const t=i.useContext(Rr);return t==null&&function(n,...r){const o=new URL("https://lexical.dev/docs/error"),a=new URLSearchParams;a.append("code",n);for(const s of r)a.append("v",s);throw o.search=a.toString(),Error(`Minified Lexical error #${n}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Mr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Cs=Mr?i.useLayoutEffect:i.useEffect,Te={tag:I.HISTORY_MERGE_TAG};function Ss({initialConfig:t,children:n}){const r=i.useMemo(()=>{const{theme:o,namespace:a,nodes:s,onError:l,editorState:w,html:p}=t,c=_s(null,o),d=I.createEditor({editable:t.editable,html:p,namespace:a,nodes:s,onError:f=>l(f,d),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const m=I.$getRoot();if(m.isEmpty()){const g=I.$createParagraphNode();m.append(g);const b=Mr?document.activeElement:null;(I.$getSelection()!==null||b!==null&&b===f.getRootElement())&&g.select()}},Te);else if(h!==null)switch(typeof h){case"string":{const m=f.parseEditorState(h);f.setEditorState(m,Te);break}case"object":f.setEditorState(h,Te);break;case"function":f.update(()=>{I.$getRoot().isEmpty()&&h(f)},Te)}}}(d,w),[d,c]},[]);return Cs(()=>{const o=t.editable,[a]=r;a.setEditable(o===void 0||o)},[]),e.jsx(Rr.Provider,{value:r,children:n})}const Es=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ts({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:n=!1,onChange:r}){const[o]=kt();return Es(()=>{if(r)return o.registerUpdateListener(({editorState:a,dirtyElements:s,dirtyLeaves:l,prevEditorState:w,tags:p})=>{n&&s.size===0&&l.size===0||t&&p.has(I.HISTORY_MERGE_TAG)||w.isEmpty()||r(a,o,p)})},[o,t,n,r]),null}const pn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Nt=je.Provider,St=je.Root,Ot=je.Trigger,jt=i.forwardRef(({className:t,sideOffset:n=4,...r},o)=>e.jsx(je.Content,{ref:o,sideOffset:n,className:u("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));jt.displayName=je.Content.displayName;const un=[We.HeadingNode,I.ParagraphNode,I.TextNode,We.QuoteNode];function nn(t,n){return nn=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},nn(t,n)}var Un={error:null},Rs=function(t){var n,r;function o(){for(var s,l=arguments.length,w=new Array(l),p=0;p<l;p++)w[p]=arguments[p];return(s=t.call.apply(t,[this].concat(w))||this).state=Un,s.resetErrorBoundary=function(){for(var c,d=arguments.length,f=new Array(d),h=0;h<d;h++)f[h]=arguments[h];s.props.onReset==null||(c=s.props).onReset.apply(c,f),s.reset()},s}r=t,(n=o).prototype=Object.create(r.prototype),n.prototype.constructor=n,nn(n,r),o.getDerivedStateFromError=function(s){return{error:s}};var a=o.prototype;return a.reset=function(){this.setState(Un)},a.componentDidCatch=function(s,l){var w,p;(w=(p=this.props).onError)==null||w.call(p,s,l)},a.componentDidUpdate=function(s,l){var w,p,c,d,f=this.state.error,h=this.props.resetKeys;f!==null&&l.error!==null&&((c=s.resetKeys)===void 0&&(c=[]),(d=h)===void 0&&(d=[]),c.length!==d.length||c.some(function(m,g){return!Object.is(m,d[g])}))&&((w=(p=this.props).onResetKeysChange)==null||w.call(p,s.resetKeys,h),this.reset())},a.render=function(){var s=this.state.error,l=this.props,w=l.fallbackRender,p=l.FallbackComponent,c=l.fallback;if(s!==null){var d={error:s,resetErrorBoundary:this.resetErrorBoundary};if(He.isValidElement(c))return c;if(typeof w=="function")return w(d);if(p)return He.createElement(p,d);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},o}(He.Component);function Ms({children:t,onError:n}){return e.jsx(Rs,{fallback:e.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:n,children:t})}const Is=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ds(t){return{initialValueFn:()=>t.isEditable(),subscribe:n=>t.registerEditableListener(n)}}function Os(){return function(t){const[n]=kt(),r=i.useMemo(()=>t(n),[n,t]),[o,a]=i.useState(()=>r.initialValueFn()),s=i.useRef(o);return Is(()=>{const{initialValueFn:l,subscribe:w}=r,p=l();return s.current!==p&&(s.current=p,a(p)),w(c=>{s.current=c,a(c)})},[r,t]),o}(Ds)}function Vs(){return I.$getRoot().getTextContent()}function Ls(t,n=!0){if(t)return!1;let r=Vs();return n&&(r=r.trim()),r===""}function As(t){if(!Ls(t,!1))return!1;const n=I.$getRoot().getChildren(),r=n.length;if(r>1)return!1;for(let o=0;o<r;o++){const a=n[o];if(I.$isDecoratorNode(a))return!1;if(I.$isElementNode(a)){if(!I.$isParagraphNode(a)||a.__indent!==0)return!1;const s=a.getChildren(),l=s.length;for(let w=0;w<l;w++){const p=s[o];if(!I.$isTextNode(p))return!1}}}return!0}function Ir(t){return()=>As(t)}function Ps(t,n){const r=t.getStartEndPoints();if(n.isSelected(t)&&!I.$isTokenOrSegmented(n)&&r!==null){const[o,a]=r,s=t.isBackward(),l=o.getNode(),w=a.getNode(),p=n.is(l),c=n.is(w);if(p||c){const[d,f]=I.$getCharacterOffsets(t),h=l.is(w),m=n.is(s?w:l),g=n.is(s?l:w);let b,j=0;h?(j=d>f?f:d,b=d>f?d:f):m?(j=s?f:d,b=void 0):g&&(j=0,b=s?d:f),n.__text=n.__text.slice(j,b)}}return n}const Dr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,$s=Dr&&"documentMode"in document?document.documentMode:null;!(!Dr||!("InputEvent"in window)||$s)&&"getTargetRanges"in new window.InputEvent("input");function mn(...t){return()=>{for(let n=t.length-1;n>=0;n--)t[n]();t.length=0}}function zs(t){const n=window.location.origin,r=o=>{if(o.origin!==n)return;const a=t.getRootElement();if(document.activeElement!==a)return;const s=o.data;if(typeof s=="string"){let l;try{l=JSON.parse(s)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const w=l.payload;if(w&&w.functionId==="makeChanges"){const p=w.args;if(p){const[c,d,f,h,m,g]=p;t.update(()=>{const b=I.$getSelection();if(I.$isRangeSelection(b)){const j=b.anchor;let O=j.getNode(),N=0,x=0;if(I.$isTextNode(O)&&c>=0&&d>=0&&(N=c,x=c+d,b.setTextNodeRange(O,N,O,x)),N===x&&f===""||(b.insertRawText(f),O=j.getNode()),I.$isTextNode(O)){N=h,x=h+m;const _=O.getTextContentSize();N=N>_?_:N,x=x>_?_:x,b.setTextNodeRange(O,N,O,x)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}const rn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Yn(t){return t.getEditorState().read(Ir(t.isComposing()))}function Fs({contentEditable:t,placeholder:n=null,ErrorBoundary:r}){const[o]=kt(),a=function(s,l){const[w,p]=i.useState(()=>s.getDecorators());return rn(()=>s.registerDecoratorListener(c=>{Gn.flushSync(()=>{p(c)})}),[s]),i.useEffect(()=>{p(s.getDecorators())},[s]),i.useMemo(()=>{const c=[],d=Object.keys(w);for(let f=0;f<d.length;f++){const h=d[f],m=e.jsx(l,{onError:b=>s._onError(b),children:e.jsx(i.Suspense,{fallback:null,children:w[h]})}),g=s.getElementByKey(h);g!==null&&c.push(Gn.createPortal(m,g,h))}return c},[l,w,s])}(o,r);return function(s){rn(()=>mn(We.registerRichText(s),zs(s)),[s])}(o),e.jsxs(e.Fragment,{children:[t,e.jsx(Bs,{content:n}),a]})}function Bs({content:t}){const[n]=kt(),r=function(a){const[s,l]=i.useState(()=>Yn(a));return rn(()=>{function w(){const p=Yn(a);l(p)}return w(),mn(a.registerUpdateListener(()=>{w()}),a.registerEditableListener(()=>{w()}))},[a]),s}(n),o=Os();return r?typeof t=="function"?t(o):t:null}function Gs({defaultSelection:t}){const[n]=kt();return i.useEffect(()=>{n.focus(()=>{const r=document.activeElement,o=n.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,n]),null}const Hs=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ks({onClear:t}){const[n]=kt();return Hs(()=>n.registerCommand(I.CLEAR_EDITOR_COMMAND,r=>(n.update(()=>{if(t==null){const o=I.$getRoot(),a=I.$getSelection(),s=I.$createParagraphNode();o.clear(),o.append(s),a!==null&&s.select(),I.$isRangeSelection(a)&&(a.format=0)}else t()}),!0),I.COMMAND_PRIORITY_EDITOR),[n,t]),null}const Or=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Xs({editor:t,ariaActiveDescendant:n,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:a,ariaErrorMessage:s,ariaExpanded:l,ariaInvalid:w,ariaLabel:p,ariaLabelledBy:c,ariaMultiline:d,ariaOwns:f,ariaRequired:h,autoCapitalize:m,className:g,id:b,role:j="textbox",spellCheck:O=!0,style:N,tabIndex:x,"data-testid":_,...L},C){const[S,R]=i.useState(t.isEditable()),E=i.useCallback(A=>{A&&A.ownerDocument&&A.ownerDocument.defaultView?t.setRootElement(A):t.setRootElement(null)},[t]),T=i.useMemo(()=>function(...A){return $=>{A.forEach(F=>{typeof F=="function"?F($):F!=null&&(F.current=$)})}}(C,E),[E,C]);return Or(()=>(R(t.isEditable()),t.registerEditableListener(A=>{R(A)})),[t]),e.jsx("div",{"aria-activedescendant":S?n:void 0,"aria-autocomplete":S?r:"none","aria-controls":S?o:void 0,"aria-describedby":a,...s!=null?{"aria-errormessage":s}:{},"aria-expanded":S&&j==="combobox"?!!l:void 0,...w!=null?{"aria-invalid":w}:{},"aria-label":p,"aria-labelledby":c,"aria-multiline":d,"aria-owns":S?f:void 0,"aria-readonly":!S||void 0,"aria-required":h,autoCapitalize:m,className:g,contentEditable:S,"data-testid":_,id:b,ref:T,role:j,spellCheck:O,style:N,tabIndex:x,...L})}const qs=i.forwardRef(Xs);function Jn(t){return t.getEditorState().read(Ir(t.isComposing()))}const Us=i.forwardRef(Ys);function Ys(t,n){const{placeholder:r,...o}=t,[a]=kt();return e.jsxs(e.Fragment,{children:[e.jsx(qs,{editor:a,...o,ref:n}),r!=null&&e.jsx(Js,{editor:a,content:r})]})}function Js({content:t,editor:n}){const r=function(l){const[w,p]=i.useState(()=>Jn(l));return Or(()=>{function c(){const d=Jn(l);p(d)}return c(),mn(l.registerUpdateListener(()=>{c()}),l.registerEditableListener(()=>{c()}))},[l]),w}(n),[o,a]=i.useState(n.isEditable());if(i.useLayoutEffect(()=>(a(n.isEditable()),n.registerEditableListener(l=>{a(l)})),[n]),!r)return null;let s=null;return typeof t=="function"?s=t(o):t!==null&&(s=t),s===null?null:e.jsx("div",{"aria-hidden":!0,children:s})}function Ws({placeholder:t,className:n,placeholderClassName:r}){return e.jsx(Us,{className:n??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:e.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Vr=i.createContext(void 0);function Zs({activeEditor:t,$updateToolbar:n,blockType:r,setBlockType:o,showModal:a,children:s}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:n,blockType:r,setBlockType:o,showModal:a}),[t,n,r,o,a]);return e.jsx(Vr.Provider,{value:l,children:s})}function Lr(){const t=i.useContext(Vr);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Qs(){const[t,n]=i.useState(void 0),r=i.useCallback(()=>{n(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:s,content:l}=t;return e.jsx(Ya,{open:!0,onOpenChange:r,children:e.jsxs(pr,{children:[e.jsx(ur,{children:e.jsx(mr,{children:s})}),l]})})},[t,r]),a=i.useCallback((s,l,w=!1)=>{n({closeOnClickOutside:w,content:l(r),title:s})},[r]);return[o,a]}function ti({children:t}){const[n]=kt(),[r,o]=i.useState(n),[a,s]=i.useState("paragraph"),[l,w]=Qs(),p=()=>{};return i.useEffect(()=>r.registerCommand(I.SELECTION_CHANGE_COMMAND,(c,d)=>(o(d),!1),I.COMMAND_PRIORITY_CRITICAL),[r]),e.jsxs(Zs,{activeEditor:r,$updateToolbar:p,blockType:a,setBlockType:s,showModal:w,children:[l,t({blockType:a})]})}function ei(t){const[n]=kt(),{activeEditor:r}=Lr();i.useEffect(()=>r.registerCommand(I.SELECTION_CHANGE_COMMAND,()=>{const o=I.$getSelection();return o&&t(o),!1},I.COMMAND_PRIORITY_CRITICAL),[n,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=I.$getSelection();o&&t(o)})},[r,t])}const Ar=Pt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),ni=i.forwardRef(({className:t,variant:n,size:r,...o},a)=>e.jsx(wr.Root,{ref:a,className:u(Ar({variant:n,size:r,className:t})),...o}));ni.displayName=wr.Root.displayName;const Pr=i.createContext({size:"default",variant:"default"}),ze=i.forwardRef(({className:t,variant:n,size:r,children:o,...a},s)=>{const l=et();return e.jsx(Pe.Root,{ref:s,className:u("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:l,children:e.jsx(Pr.Provider,{value:{variant:n,size:r},children:o})})});ze.displayName=Pe.Root.displayName;const se=i.forwardRef(({className:t,children:n,variant:r,size:o,...a},s)=>{const l=i.useContext(Pr);return e.jsx(Pe.Item,{ref:s,className:u(Ar({variant:l.variant||r,size:l.size||o}),t),...a,children:n})});se.displayName=Pe.Item.displayName;const Wn=[{format:"bold",icon:y.BoldIcon,label:"Bold"},{format:"italic",icon:y.ItalicIcon,label:"Italic"},{format:"underline",icon:y.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:y.StrikethroughIcon,label:"Strikethrough"}];function ri(){const{activeEditor:t}=Lr(),[n,r]=i.useState([]),o=i.useCallback(a=>{if(I.$isRangeSelection(a)||Ma.$isTableSelection(a)){const s=[];Wn.forEach(({format:l})=>{a.hasFormat(l)&&s.push(l)}),r(l=>l.length!==s.length||!s.every(w=>l.includes(w))?s:l)}},[]);return ei(o),e.jsx(ze,{type:"multiple",value:n,onValueChange:r,variant:"outline",size:"sm",children:Wn.map(({format:a,icon:s,label:l})=>e.jsx(se,{value:a,"aria-label":l,onClick:()=>{t.dispatchCommand(I.FORMAT_TEXT_COMMAND,a)},children:e.jsx(s,{className:"tw-h-4 tw-w-4"})},a))})}function oi({onClear:t}){const[n]=kt();i.useEffect(()=>{t&&t(()=>{n.dispatchCommand(I.CLEAR_EDITOR_COMMAND,void 0)})},[n,t])}function ai({placeholder:t="Start typing ...",autoFocus:n=!1,onClear:r}){const[,o]=i.useState(void 0),a=s=>{s!==void 0&&o(s)};return e.jsxs("div",{className:"tw-relative",children:[e.jsx(ti,{children:()=>e.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:e.jsx(ri,{})})}),e.jsxs("div",{className:"tw-relative",children:[e.jsx(Fs,{contentEditable:e.jsx("div",{ref:a,children:e.jsx(Ws,{placeholder:t})}),ErrorBoundary:Ms}),n&&e.jsx(Gs,{defaultSelection:"rootEnd"}),e.jsx(oi,{onClear:r}),e.jsx(Ks,{})]})]})}const si={namespace:"commentEditor",theme:pn,nodes:un,onError:t=>{console.error(t)}};function on({editorState:t,editorSerializedState:n,onChange:r,onSerializedChange:o,placeholder:a="Start typing…",autoFocus:s=!1,onClear:l}){return e.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:e.jsx(Ss,{initialConfig:{...si,...t?{editorState:t}:{},...n?{editorState:JSON.stringify(n)}:{}},children:e.jsxs(Nt,{children:[e.jsx(ai,{placeholder:a,autoFocus:s,onClear:l}),e.jsx(Ts,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function ii(t,n){const r=n.body?n.body.childNodes:[];let o=[];const a=[];for(let s=0;s<r.length;s++){const l=r[s];if(!zr.has(l.nodeName)){const w=Fr(l,t,a,!1);w!==null&&(o=o.concat(w))}}return function(s){for(const l of s)l.getNextSibling()instanceof I.ArtificialNode__DO_NOT_USE&&l.insertAfter(I.$createLineBreakNode());for(const l of s){const w=l.getChildren();for(const p of w)l.insertBefore(p);l.remove()}}(a),o}function li(t,n){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=I.$getRoot().getChildren();for(let a=0;a<o.length;a++)$r(t,o[a],r,n);return r.innerHTML}function $r(t,n,r,o=null){let a=o===null||n.isSelected(o);const s=I.$isElementNode(n)&&n.excludeFromCopy("html");let l=n;if(o!==null){let m=I.$cloneWithProperties(n);m=I.$isTextNode(m)&&o!==null?Ps(o,m):m,l=m}const w=I.$isElementNode(l)?l.getChildren():[],p=I.getRegisteredNode(t,l.getType());let c;c=p&&p.exportDOM!==void 0?p.exportDOM(t,l):l.exportDOM(t);const{element:d,after:f}=c;if(!d)return!1;const h=document.createDocumentFragment();for(let m=0;m<w.length;m++){const g=w[m],b=$r(t,g,h,o);!a&&I.$isElementNode(n)&&b&&n.extractWithChild(g,o,"html")&&(a=!0)}if(a&&!s){if((I.isHTMLElement(d)||I.isDocumentFragment(d))&&d.append(h),r.append(d),f){const m=f.call(l,d);m&&(I.isDocumentFragment(d)?d.replaceChildren(m):d.replaceWith(m))}}else r.append(h);return a}const zr=new Set(["STYLE","SCRIPT"]);function Fr(t,n,r,o,a=new Map,s){let l=[];if(zr.has(t.nodeName))return l;let w=null;const p=function(g,b){const{nodeName:j}=g,O=b._htmlConversions.get(j.toLowerCase());let N=null;if(O!==void 0)for(const x of O){const _=x(g);_!==null&&(N===null||(N.priority||0)<=(_.priority||0))&&(N=_)}return N!==null?N.conversion:null}(t,n),c=p?p(t):null;let d=null;if(c!==null){d=c.after;const g=c.node;if(w=Array.isArray(g)?g[g.length-1]:g,w!==null){for(const[,b]of a)if(w=b(w,s),!w)break;w&&l.push(...Array.isArray(g)?g:[w])}c.forChild!=null&&a.set(t.nodeName,c.forChild)}const f=t.childNodes;let h=[];const m=(w==null||!I.$isRootOrShadowRoot(w))&&(w!=null&&I.$isBlockElementNode(w)||o);for(let g=0;g<f.length;g++)h.push(...Fr(f[g],n,r,m,new Map(a),w));return d!=null&&(h=d(h)),I.isBlockDomNode(t)&&(h=wi(t,h,m?()=>{const g=new I.ArtificialNode__DO_NOT_USE;return r.push(g),g}:I.$createParagraphNode)),w==null?h.length>0?l=l.concat(h):I.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:I.isInlineDomNode(g.nextSibling)&&I.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(I.$createLineBreakNode())):I.$isElementNode(w)&&w.append(...h),l}function wi(t,n,r){const o=t.style.textAlign,a=[];let s=[];for(let l=0;l<n.length;l++){const w=n[l];if(I.$isBlockElementNode(w))o&&!w.getFormat()&&w.setFormat(o),a.push(w);else if(s.push(w),l===n.length-1||l<n.length-1&&I.$isBlockElementNode(n[l+1])){const p=r();p.setFormat(o),p.append(...s),a.push(p),s=[]}}return a}function ci(t){const n=t.querySelector('[contenteditable="true"]');if(!n)return!1;n.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(n),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Xt(t){var n;return(n=t==null?void 0:t.root)!=null&&n.children?t.root.children.some(r=>r!=null&&r.children?r.children.some(o=>(o==null?void 0:o.text)&&o.text.trim().length>0):!1):!1}function di(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const n=t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),r=ar.createHeadlessEditor({namespace:"EditorUtils",theme:pn,nodes:un,onError:a=>{console.error(a)}});let o;if(r.update(()=>{const s=new DOMParser().parseFromString(n,"text/html"),l=ii(r,s);I.$getRoot().clear(),I.$insertNodes(l)},{discrete:!0}),r.getEditorState().read(()=>{o=r.getEditorState().toJSON()}),!o)throw new Error("Failed to convert HTML to editor state");return o}function Br(t){const n=ar.createHeadlessEditor({namespace:"EditorUtils",theme:pn,nodes:un,onError:a=>{console.error(a)}}),r=n.parseEditorState(JSON.stringify(t));n.setEditorState(r);let o="";return n.getEditorState().read(()=>{o=li(n)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>"),o}function Gr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const Hr=Pt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),le=i.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,className:u("pr-twp",Hr({variant:n}),t),...r}));le.displayName="Badge";const hn=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...n}));hn.displayName="Card";const Kr=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...n}));Kr.displayName="CardHeader";const Xr=i.forwardRef(({className:t,...n},r)=>e.jsx("h3",{ref:r,className:u("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...n,children:n.children}));Xr.displayName="CardTitle";const qr=i.forwardRef(({className:t,...n},r)=>e.jsx("p",{ref:r,className:u("pr-twp tw-text-sm tw-text-muted-foreground",t),...n}));qr.displayName="CardDescription";const fn=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-p-6 tw-pt-0",t),...n}));fn.displayName="CardContent";const Ur=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...n}));Ur.displayName="CardFooter";const Yt=i.forwardRef(({className:t,orientation:n="horizontal",decorative:r=!0,...o},a)=>e.jsx(cr.Root,{ref:a,decorative:r,orientation:n,className:u("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Yt.displayName=cr.Root.displayName;const gn=i.forwardRef(({className:t,...n},r)=>e.jsx(de.Root,{ref:r,className:u("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...n}));gn.displayName=de.Root.displayName;const Yr=i.forwardRef(({className:t,...n},r)=>e.jsx(de.Image,{ref:r,className:u("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...n}));Yr.displayName=de.Image.displayName;const bn=i.forwardRef(({className:t,...n},r)=>e.jsx(de.Fallback,{ref:r,className:u("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...n}));bn.displayName=de.Fallback.displayName;const xn=i.createContext(void 0);function ht(){const t=i.useContext(xn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Rt=Pt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ne=U.Trigger,vn=U.Group,Jr=U.Portal,Wr=U.Sub,Zr=U.RadioGroup;function Ft({variant:t="default",...n}){const r=i.useMemo(()=>({variant:t}),[t]);return e.jsx(xn.Provider,{value:r,children:e.jsx(U.Root,{...n})})}const yn=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const s=ht();return e.jsxs(U.SubTrigger,{ref:a,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",t,Rt({variant:s.variant})),...o,children:[r,e.jsx(y.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});yn.displayName=U.SubTrigger.displayName;const Nn=i.forwardRef(({className:t,...n},r)=>e.jsx(U.SubContent,{ref:r,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Nn.displayName=U.SubContent.displayName;const Mt=i.forwardRef(({className:t,sideOffset:n=4,children:r,...o},a)=>{const s=et();return e.jsx(U.Portal,{children:e.jsx(U.Content,{ref:a,sideOffset:n,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:e.jsx("div",{dir:s,children:r})})})});Mt.displayName=U.Content.displayName;const ye=i.forwardRef(({className:t,inset:n,...r},o)=>{const a=et(),s=ht();return e.jsx(U.Item,{ref:o,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t,Rt({variant:s.variant})),...r,dir:a})});ye.displayName=U.Item.displayName;const Et=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const s=ht();return e.jsxs(U.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Rt({variant:s.variant})),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(U.ItemIndicator,{children:e.jsx(y.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});Et.displayName=U.CheckboxItem.displayName;const jn=i.forwardRef(({className:t,children:n,...r},o)=>{const a=ht();return e.jsxs(U.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Rt({variant:a.variant})),...r,children:[e.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:e.jsx(U.ItemIndicator,{children:e.jsx(y.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});jn.displayName=U.RadioItem.displayName;const me=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(U.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));me.displayName=U.Label.displayName;const re=i.forwardRef(({className:t,...n},r)=>e.jsx(U.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));re.displayName=U.Separator.displayName;function Qr({className:t,...n}){return e.jsx("span",{className:u("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...n})}Qr.displayName="DropdownMenuShortcut";function Zn({comment:t,isReply:n=!1,isEditable:r=!1,localizedStrings:o,isThreadExpanded:a=!1,threadStatus:s="Unspecified",handleResolveCommentThread:l=()=>{},handleUpdateComment:w,handleDeleteComment:p,onEditingChange:c}){const[d,f]=i.useState(!1),[h,m]=i.useState(),g=i.useRef(null);i.useEffect(()=>{if(!d)return;let C=!0;const S=g.current;if(!S)return;const R=setTimeout(()=>{C&&ci(S)},300);return()=>{C=!1,clearTimeout(R)}},[d]);const b=i.useCallback(()=>{f(!1),m(void 0),c==null||c(!1)},[c]),j=i.useCallback(async()=>{if(!h||!w)return;await w(t.id,Br(h))&&(f(!1),m(void 0),c==null||c(!1))},[h,w,t.id,c]),O=i.useMemo(()=>{const C=new Date(t.date),S=v.formatRelativeDate(C,o["%comment_date_today%"],o["%comment_date_yesterday%"]),R=C.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return v.formatReplacementString(o["%comment_dateAtTime%"],{date:S,time:R})},[t.date,o]),N=i.useMemo(()=>t.user,[t.user]),x=i.useMemo(()=>t.user.split(" ").map(C=>C[0]).join("").toUpperCase().slice(0,2),[t.user]),_=i.useMemo(()=>v.sanitizeHtml(v.parseParatextHtml(t.contents)),[t.contents]),L=i.useMemo(()=>{if(a&&r)return e.jsxs(e.Fragment,{children:[!v.hasCustomParatextTags(t.contents)&&e.jsxs(ye,{onClick:()=>{f(!0),m(di(v.parseParatextHtml(t.contents))),c==null||c(!0)},children:[e.jsx(y.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),o["%comment_editComment%"]]}),e.jsxs(ye,{onClick:async()=>{p&&await p(t.id)},children:[e.jsx(y.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),o["%comment_deleteComment%"]]})]})},[r,a,o,t.contents,t.id,p,c]);return e.jsxs("div",{className:u("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":n}),children:[e.jsx(gn,{className:"tw-h-8 tw-w-8",children:e.jsx(bn,{className:"tw-text-xs tw-font-medium",children:x})}),e.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[e.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[e.jsx("p",{className:"tw-text-sm tw-font-medium",children:N}),e.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:O})]}),d&&e.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:g,onKeyDownCapture:C=>{C.key==="Escape"?(C.preventDefault(),C.stopPropagation(),b()):C.key==="Enter"&&C.shiftKey&&(C.preventDefault(),C.stopPropagation(),Xt(h)&&j())},onKeyDown:C=>{Gr(C),(C.key==="Enter"||C.key===" ")&&C.stopPropagation()},children:[e.jsx(on,{editorSerializedState:h,onSerializedChange:C=>m(C)}),e.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[e.jsx(P,{size:"icon",onClick:b,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:e.jsx(y.X,{})}),e.jsx(P,{size:"icon",onClick:j,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Xt(h),children:e.jsx(y.ArrowUp,{})})]})]}),!d&&e.jsx("div",{className:u("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",{"tw-line-clamp-3":!a}),dangerouslySetInnerHTML:{__html:_}})]}),a&&!n&&s!=="Resolved"&&e.jsx(P,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:C=>{C.stopPropagation(),l(t.thread)},children:e.jsx(y.Check,{})}),L&&e.jsxs(Ft,{children:[e.jsx(ne,{asChild:!0,children:e.jsx(P,{variant:"ghost",size:"icon",children:e.jsx(y.MoreHorizontal,{})})}),e.jsx(Mt,{align:"end",children:L})]})]})}const Qn={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function pi({comments:t,localizedStrings:n,isSelected:r=!1,verseRef:o,assignedUser:a,currentUser:s,handleSelectThread:l,threadId:w,threadStatus:p,handleResolveCommentThread:c,handleAddComment:d,handleUpdateComment:f,handleDeleteComment:h}){const[m,g]=i.useState(Qn),[b,j]=i.useState(!1),[O,N]=i.useState(!1),[x,_]=i.useState(!1),[L,C]=i.useState(!1),S=i.useMemo(()=>t.filter(k=>!k.deleted),[t]),R=i.useMemo(()=>S[0],[S]),E=i.useRef(null),T=i.useRef(void 0);i.useEffect(()=>{const k=E.current;if(!k)return;const K=()=>{N(k.scrollWidth>k.clientWidth)};return K(),window.addEventListener("resize",K),()=>window.removeEventListener("resize",K)},[R==null?void 0:R.verse]),i.useEffect(()=>{_(!1)},[r]);const A=i.useMemo(()=>({singleReply:n["%comment_thread_single_reply%"],multipleReplies:n["%comment_thread_multiple_replies%"]}),[n]),$=i.useMemo(()=>a?v.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:a}):void 0,[a,n]),F=i.useMemo(()=>S.slice(1),[S]),D=i.useMemo(()=>F.length??0,[F.length]),X=i.useMemo(()=>D>0,[D]),V=i.useMemo(()=>x||D<=2?F:F.slice(-2),[F,D,x]),q=i.useMemo(()=>x||D<=2?0:D-2,[D,x]),dt=i.useMemo(()=>D===1?A.singleReply:v.formatReplacementString(A.multipleReplies,{count:D}),[D,A]),It=i.useMemo(()=>q===1?A.singleReply:v.formatReplacementString(A.multipleReplies,{count:q}),[q,A]),ft=i.useCallback(async()=>{var K;await d(w,Br(m))&&((K=T.current)==null||K.call(T),g(Qn))},[m,d,w]);return e.jsx(hn,{role:"option","aria-selected":r,id:w,className:u("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer tw-bg-primary-foreground hover:tw-shadow-md":!r},{"tw-bg-background":r}),onClick:()=>{l(w)},tabIndex:-1,children:e.jsxs(fn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[$&&e.jsx(le,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:$}),e.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[e.jsxs("p",{ref:E,className:u("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":b},{"tw-whitespace-nowrap":!b}),children:[o," ",R.verse]}),O&&e.jsx(P,{variant:"ghost",size:"icon",onClick:k=>{k.stopPropagation(),j(!b)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":b?"Collapse text":"Expand text",children:b?e.jsx(y.ChevronUp,{}):e.jsx(y.ChevronDown,{})})]}),e.jsx(Zn,{comment:R,localizedStrings:n,isThreadExpanded:r,threadStatus:p,isEditable:S.length===1&&(R==null?void 0:R.user)===s,handleResolveCommentThread:c,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:C})]}),e.jsxs(e.Fragment,{children:[X&&!r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[e.jsx("div",{className:"tw-w-8",children:e.jsx(Yt,{})}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:dt})]}),!r&&Xt(m)&&e.jsx(on,{editorSerializedState:m,onSerializedChange:k=>g(k),placeholder:n["%comment_replyOrAssign%"]}),r&&e.jsxs(e.Fragment,{children:[q>0&&e.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:k=>{k.stopPropagation(),_(!0)},role:"button",tabIndex:0,onKeyDown:k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),k.stopPropagation(),_(!0))},children:[e.jsx("div",{className:"tw-w-8",children:e.jsx(Yt,{})}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:It}),x?e.jsx(y.ChevronUp,{}):e.jsx(y.ChevronDown,{})]})]}),V.map(k=>{const ct=k.id===F[F.length-1].id&&k.user===s;return e.jsx("div",{children:e.jsx(Zn,{comment:k,localizedStrings:n,isReply:!0,isThreadExpanded:r,isEditable:ct,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:C})},k.id)}),(!L||Xt(m))&&e.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:k=>k.stopPropagation(),onKeyDownCapture:k=>{k.key==="Enter"&&k.shiftKey&&(k.preventDefault(),k.stopPropagation(),Xt(m)&&ft())},onKeyDown:k=>{Gr(k),(k.key==="Enter"||k.key===" ")&&k.stopPropagation()},children:[e.jsx(on,{editorSerializedState:m,onSerializedChange:k=>g(k),placeholder:n["%comment_replyOrAssign%"],autoFocus:!0,onClear:k=>{T.current=k}}),e.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[e.jsx(P,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Xt(m),children:e.jsx(y.AtSign,{})}),e.jsx(P,{size:"icon",onClick:ft,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Xt(m),children:e.jsx(y.ArrowUp,{})})]})]})]})]})]})})}const Re=t=>`thread-${t}`;function ui({className:t="",threads:n,currentUser:r,localizedStrings:o,handleAddComment:a,handleResolveCommentThread:s,handleUpdateComment:l,handleDeleteComment:w}){const[p,c]=i.useState(),d=n.filter(N=>N.comments.some(x=>!x.deleted)),f=d.map(N=>({id:Re(N.id)})),h=i.useCallback(N=>{c(N.id)},[]),m=i.useCallback(N=>{c(N)},[]),{listboxRef:g,activeId:b,handleKeyDown:j}=Tr({options:f,onOptionSelect:h}),O=i.useCallback(N=>{N.key==="Escape"?(c(void 0),N.preventDefault(),N.stopPropagation()):j(N)},[j]);return e.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:g,"aria-activedescendant":b??void 0,"aria-label":"Comments",className:u("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:O,children:d.map(N=>e.jsx("div",{children:e.jsx(pi,{comments:N.comments,localizedStrings:o,verseRef:N.verseRef,handleSelectThread:m,threadId:Re(N.id),isSelected:p===Re(N.id),currentUser:r,assignedUser:N.assignedUser,threadStatus:N.status,handleAddComment:a,handleResolveCommentThread:s,handleUpdateComment:l,handleDeleteComment:w})},Re(N.id)))})}function mi({table:t}){return e.jsxs(Ft,{children:[e.jsx(sr.DropdownMenuTrigger,{asChild:!0,children:e.jsxs(P,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[e.jsx(y.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),e.jsxs(Mt,{align:"end",className:"tw-w-[150px]",children:[e.jsx(me,{children:"Toggle columns"}),e.jsx(re,{}),t.getAllColumns().filter(n=>n.getCanHide()).map(n=>e.jsx(Et,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id))]})]})}const Jt=W.Root,to=W.Group,Wt=W.Value,eo=Pt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Lt=i.forwardRef(({className:t,children:n,size:r,...o},a)=>{const s=et();return e.jsxs(W.Trigger,{className:u(eo({size:r,className:t})),ref:a,...o,dir:s,children:[n,e.jsx(W.Icon,{asChild:!0,children:e.jsx(y.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Lt.displayName=W.Trigger.displayName;const kn=i.forwardRef(({className:t,...n},r)=>e.jsx(W.ScrollUpButton,{ref:r,className:u("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(y.ChevronUp,{className:"tw-h-4 tw-w-4"})}));kn.displayName=W.ScrollUpButton.displayName;const _n=i.forwardRef(({className:t,...n},r)=>e.jsx(W.ScrollDownButton,{ref:r,className:u("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...n,children:e.jsx(y.ChevronDown,{className:"tw-h-4 tw-w-4"})}));_n.displayName=W.ScrollDownButton.displayName;const At=i.forwardRef(({className:t,children:n,position:r="popper",...o},a)=>{const s=et();return e.jsx(W.Portal,{children:e.jsxs(W.Content,{ref:a,className:u("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[e.jsx(kn,{}),e.jsx(W.Viewport,{className:u("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:e.jsx("div",{dir:s,children:n})}),e.jsx(_n,{})]})})});At.displayName=W.Content.displayName;const no=i.forwardRef(({className:t,...n},r)=>e.jsx(W.Label,{ref:r,className:u("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...n}));no.displayName=W.Label.displayName;const wt=i.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(W.Item,{ref:o,className:u("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(W.ItemIndicator,{children:e.jsx(y.Check,{className:"tw-h-4 tw-w-4"})})}),e.jsx(W.ItemText,{children:n})]}));wt.displayName=W.Item.displayName;const ro=i.forwardRef(({className:t,...n},r)=>e.jsx(W.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));ro.displayName=W.Separator.displayName;function hi({table:t}){return e.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[e.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),e.jsxs(Jt,{value:`${t.getState().pagination.pageSize}`,onValueChange:n=>{t.setPageSize(Number(n))},children:[e.jsx(Lt,{className:"tw-h-8 tw-w-[70px]",children:e.jsx(Wt,{placeholder:t.getState().pagination.pageSize})}),e.jsx(At,{side:"top",children:[10,20,30,40,50].map(n=>e.jsx(wt,{value:`${n}`,children:n},n))})]})]}),e.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsxs(P,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),e.jsx(y.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(P,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),e.jsx(y.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(P,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),e.jsx(y.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),e.jsxs(P,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[e.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),e.jsx(y.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const tr=`
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
`;function fi(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ne(t,n){const r=n?`${tr}, ${n}`:tr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&fi(o))}const _e=i.forwardRef(({className:t,stickyHeader:n,...r},o)=>{const a=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),i.useEffect(()=>{const l=a.current;if(!l)return;const w=()=>{requestAnimationFrame(()=>{Ne(l,'[tabindex]:not([tabindex="-1"])').forEach(d=>{d.setAttribute("tabindex","-1")})})};w();const p=new MutationObserver(()=>{w()});return p.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{p.disconnect()}},[]);const s=l=>{const{current:w}=a;if(w){if(l.key==="ArrowDown"){l.preventDefault(),Ne(w)[0].focus();return}l.key===" "&&document.activeElement===w&&l.preventDefault()}};return e.jsx("div",{className:u("pr-twp tw-relative tw-w-full",{"tw-p-1":n}),children:e.jsx("table",{tabIndex:0,onKeyDown:s,ref:a,className:u("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});_e.displayName="Table";const Ce=i.forwardRef(({className:t,stickyHeader:n,...r},o)=>e.jsx("thead",{ref:o,className:u({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",t),...r}));Ce.displayName="TableHeader";const Se=i.forwardRef(({className:t,...n},r)=>e.jsx("tbody",{ref:r,className:u("[&_tr:last-child]:tw-border-0",t),...n}));Se.displayName="TableBody";const oo=i.forwardRef(({className:t,...n},r)=>e.jsx("tfoot",{ref:r,className:u("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...n}));oo.displayName="TableFooter";function gi(t){i.useEffect(()=>{const n=t.current;if(!n)return;const r=o=>{if(n.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?Ne(t.current):[],s=a.indexOf(document.activeElement),l=o.key==="ArrowRight"?s+1:s-1;l>=0&&l<a.length&&a[l].focus()}o.key==="Escape"&&(o.preventDefault(),n.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return n.addEventListener("keydown",r),()=>{n.removeEventListener("keydown",r)}},[t])}function bi(t,n,r){let o;return r==="ArrowLeft"&&n>0?o=t[n-1]:r==="ArrowRight"&&n<t.length-1&&(o=t[n+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function xi(t,n,r){let o;return r==="ArrowDown"&&n<t.length-1?o=t[n+1]:r==="ArrowUp"&&n>0&&(o=t[n-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const yt=i.forwardRef(({className:t,onKeyDown:n,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},s)=>{const l=i.useRef(null);i.useEffect(()=>{typeof s=="function"?s(l.current):s&&"current"in s&&(s.current=l.current)},[s]),gi(l);const w=i.useMemo(()=>l.current?Ne(l.current):[],[l]),p=i.useCallback(d=>{const{current:f}=l;if(!f||!f.parentElement)return;const h=f.closest("table"),m=h?Ne(h).filter(j=>j.tagName==="TR"):[],g=m.indexOf(f),b=w.indexOf(document.activeElement);if(d.key==="ArrowDown"||d.key==="ArrowUp")d.preventDefault(),xi(m,g,d.key);else if(d.key==="ArrowLeft"||d.key==="ArrowRight")d.preventDefault(),bi(w,b,d.key);else if(d.key==="Escape"){d.preventDefault();const j=f.closest("table");j&&j.focus()}n==null||n(d)},[l,w,n]),c=i.useCallback(d=>{o&&(r==null||r(d))},[o,r]);return e.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:p,onFocus:c,className:u("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...a})});yt.displayName="TableRow";const we=i.forwardRef(({className:t,...n},r)=>e.jsx("th",{ref:r,className:u("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...n}));we.displayName="TableHead";const Vt=i.forwardRef(({className:t,...n},r)=>e.jsx("td",{ref:r,className:u("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...n}));Vt.displayName="TableCell";const ao=i.forwardRef(({className:t,...n},r)=>e.jsx("caption",{ref:r,className:u("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...n}));ao.displayName="TableCaption";function Ie({className:t,...n}){return e.jsx("div",{className:u("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...n})}function so({columns:t,data:n,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:s=!1,onRowClickHandler:l=()=>{},id:w,isLoading:p=!1,noResultsMessage:c}){var C;const[d,f]=i.useState([]),[h,m]=i.useState([]),[g,b]=i.useState({}),[j,O]=i.useState({}),N=i.useMemo(()=>n??[],[n]),x=rt.useReactTable({data:N,columns:t,getCoreRowModel:rt.getCoreRowModel(),...r&&{getPaginationRowModel:rt.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:rt.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:rt.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:O,state:{sorting:d,columnFilters:h,columnVisibility:g,rowSelection:j}}),_=x.getVisibleFlatColumns();let L;return p?L=Array.from({length:10}).map((E,T)=>`skeleton-row-${T}`).map(E=>e.jsx(yt,{children:e.jsx(Vt,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:e.jsx("div",{className:"tw-w-full tw-py-2",children:e.jsx(Ie,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):((C=x.getRowModel().rows)==null?void 0:C.length)>0?L=x.getRowModel().rows.map(S=>e.jsx(yt,{onClick:()=>l(S,x),"data-state":S.getIsSelected()&&"selected",children:S.getVisibleCells().map(R=>e.jsx(Vt,{children:rt.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},S.id)):L=e.jsx(yt,{children:e.jsx(Vt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:c})}),e.jsxs("div",{className:"pr-twp",id:w,children:[a&&e.jsx(mi,{table:x}),e.jsxs(_e,{stickyHeader:s,children:[e.jsx(Ce,{stickyHeader:s,children:x.getHeaderGroups().map(S=>e.jsx(yt,{children:S.headers.map(R=>e.jsx(we,{children:R.isPlaceholder?void 0:rt.flexRender(R.column.columnDef.header,R.getContext())},R.id))},S.id))}),e.jsx(Se,{children:L})]}),r&&e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[e.jsx(P,{variant:"outline",size:"sm",onClick:()=>x.previousPage(),disabled:!x.getCanPreviousPage(),children:"Previous"}),e.jsx(P,{variant:"outline",size:"sm",onClick:()=>x.nextPage(),disabled:!x.getCanNextPage(),children:"Next"})]}),r&&o&&e.jsx(hi,{table:x})]})}function vi({id:t,markdown:n,className:r,anchorTarget:o,truncate:a}){const s=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return e.jsx("div",{id:t,className:u("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":a},r),children:e.jsx(Aa,{options:s,children:n})})}const io=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),er=(t,n)=>t[n]??n;function lo({errorDetails:t,handleCopyNotify:n,localizedStrings:r,id:o}){const a=er(r,"%webView_error_dump_header%"),s=er(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),n&&n()}return e.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[e.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[e.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[e.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),e.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:s})]}),e.jsx(P,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:e.jsx(y.Copy,{})})]}),e.jsx("div",{className:"tw-prose tw-w-full",children:e.jsx("pre",{className:"tw-text-xs",children:t})})]})}const yi=Object.freeze([...io,"%webView_error_dump_copied_message%"]);function Ni({errorDetails:t,handleCopyNotify:n,localizedStrings:r,children:o,className:a,id:s}){const[l,w]=i.useState(!1),p=()=>{w(!0),n&&n()},c=d=>{d||w(!1)};return e.jsxs(te,{onOpenChange:c,children:[e.jsx(ee,{asChild:!0,children:o}),e.jsxs(zt,{id:s,className:u("tw-min-w-80 tw-max-w-96",a),children:[l&&r["%webView_error_dump_copied_message%"]&&e.jsx(tt,{children:r["%webView_error_dump_copied_message%"]}),e.jsx(lo,{errorDetails:t,handleCopyNotify:p,localizedStrings:r})]})]})}var wo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(wo||{});function ji({id:t,label:n,groups:r}){const[o,a]=i.useState(Object.fromEntries(r.map((c,d)=>c.itemType===0?[d,[]]:void 0).filter(c=>!!c))),[s,l]=i.useState({}),w=(c,d)=>{const f=!o[c][d];a(m=>(m[c][d]=f,{...m}));const h=r[c].items[d];h.onUpdate(h.id,f)},p=(c,d)=>{l(h=>(h[c]=d,{...h}));const f=r[c].items.find(h=>h.id===d);f?f.onUpdate(d):console.error(`Could not find dropdown radio item with id '${d}'!`)};return e.jsx("div",{id:t,children:e.jsxs(Ft,{children:[e.jsx(ne,{asChild:!0,children:e.jsxs(P,{variant:"default",children:[e.jsx(y.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),n,e.jsx(y.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),e.jsx(Mt,{children:r.map((c,d)=>e.jsxs("div",{children:[e.jsx(me,{children:c.label}),e.jsx(vn,{children:c.itemType===0?e.jsx(e.Fragment,{children:c.items.map((f,h)=>e.jsx("div",{children:e.jsx(Et,{checked:o[d][h],onCheckedChange:()=>w(d,h),children:f.label})},f.id))}):e.jsx(Zr,{value:s[d],onValueChange:f=>p(d,f),children:c.items.map(f=>e.jsx("div",{children:e.jsx(jn,{value:f.id,children:f.label})},f.id))})}),e.jsx(re,{})]},c.label))})]})})}function ki({id:t,category:n,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:s,supportUrl:l,handleSupportLinkClick:w}){const p=new v.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((d,f)=>d+f,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return e.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[n&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[e.jsx("div",{className:"tw-flex",children:e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n})}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsxs("div",{className:"tw-flex tw-gap-1",children:[e.jsx(y.User,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p})]}),e.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[e.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(d=>e.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d.toUpperCase()},d))}),o.length>3&&e.jsxs("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||l)&&e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(P,{onClick:()=>s(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",e.jsx(y.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&e.jsx("div",{className:"tw-flex tw-gap-1",children:e.jsxs(P,{onClick:()=>w(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",e.jsx(y.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function _i({id:t,versionHistory:n}){const[r,o]=i.useState(!1),a=new Date;function s(w){const p=new Date(w),c=new Date(a.getTime()-p.getTime()),d=c.getUTCFullYear()-1970,f=c.getUTCMonth(),h=c.getUTCDate()-1;let m="";return d>0?m=`${d.toString()} year${d===1?"":"s"} ago`:f>0?m=`${f.toString()} month${f===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const l=Object.entries(n).sort((w,p)=>p[0].localeCompare(w[0]));return e.jsxs("div",{className:"pr-twp",id:t,children:[e.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),e.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(w=>e.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[e.jsx("div",{className:"tw-text-foreground",children:e.jsx("li",{className:"tw-prose tw-text-xs",children:e.jsx("span",{children:w[1].description})})}),e.jsxs("div",{className:"tw-justify-end tw-text-right",children:[e.jsxs("div",{children:["Version ",w[0]]}),e.jsx("div",{children:s(w[1].date)})]})]},w[0]))}),l.length>5&&e.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ci({id:t,publisherDisplayName:n,fileSize:r,locales:o,versionHistory:a,currentVersion:s}){const l=i.useMemo(()=>v.formatBytes(r),[r]),p=(c=>{const d=new Intl.DisplayNames(v.getCurrentLocale(),{type:"language"});return c.map(f=>d.of(f))})(o);return e.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&e.jsx(_i,{versionHistory:a}),e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[e.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),e.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Publisher"}),e.jsx("span",{className:"tw-font-semibold",children:n}),e.jsx("span",{children:"Size"}),e.jsx("span",{className:"tw-font-semibold",children:l})]}),e.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:e.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[e.jsx("span",{children:"Version"}),e.jsx("span",{className:"tw-font-semibold",children:s}),e.jsx("span",{children:"Languages"}),e.jsx("span",{className:"tw-font-semibold",children:p.join(", ")})]})})]})]})]})})}function co({entries:t,selected:n,onChange:r,placeholder:o,hasToggleAllFeature:a=!1,selectAllText:s="Select All",clearAllText:l="Clear All",commandEmptyMessage:w="No entries found",customSelectedText:p,isOpen:c=void 0,onOpenChange:d=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:m=void 0,className:g=void 0,variant:b="ghost",id:j}){const[O,N]=i.useState(!1),x=i.useCallback(T=>{var $;const A=($=t.find(F=>F.label===T))==null?void 0:$.value;A&&r(n.includes(A)?n.filter(F=>F!==A):[...n,A])},[t,n,r]),_=()=>p||o,L=i.useMemo(()=>{if(!h)return t;const T=t.filter($=>$.starred).sort(($,F)=>$.label.localeCompare(F.label)),A=t.filter($=>!$.starred).sort(($,F)=>{const D=n.includes($.value),X=n.includes(F.value);return D&&!X?-1:!D&&X?1:$.label.localeCompare(F.label)});return[...T,...A]},[t,n,h]),C=()=>{r(t.map(T=>T.value))},S=()=>{r([])},R=c??O,E=d??N;return e.jsx("div",{id:j,className:g,children:e.jsxs(te,{open:R,onOpenChange:E,children:[e.jsx(ee,{asChild:!0,children:e.jsxs(P,{variant:b,role:"combobox","aria-expanded":R,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[e.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[m&&e.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:e.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),e.jsx("span",{className:u("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),e.jsx(y.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(zt,{align:"start",className:"tw-w-full tw-p-0",children:e.jsxs(Zt,{children:[e.jsx(pe,{placeholder:`Search ${o.toLowerCase()}...`}),a&&e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(P,{variant:"ghost",size:"sm",onClick:C,children:s}),e.jsx(P,{variant:"ghost",size:"sm",onClick:S,children:l})]}),e.jsxs(Qt,{children:[e.jsx(ke,{children:w}),e.jsx(Tt,{children:L.map(T=>e.jsxs($t,{value:T.label,onSelect:x,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("div",{className:"w-4",children:e.jsx(y.Check,{className:u("tw-h-4 tw-w-4",n.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&e.jsx(y.Star,{className:"tw-h-4 tw-w-4"}),e.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&e.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function Si({entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:s,isDisabled:l,sortSelected:w,icon:p,className:c,badgesPlaceholder:d,id:f}){return e.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(co,{entries:t,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:s,isDisabled:l,sortSelected:w,icon:p,className:c}),n.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(h=>{var m;return e.jsxs(le,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(P,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(g=>g!==h)),children:e.jsx(y.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(g=>g.value===h))==null?void 0:m.label]},h)})}):e.jsx(tt,{children:d})]})}const oe=i.forwardRef(({className:t,type:n,...r},o)=>e.jsx("input",{type:n,className:u("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));oe.displayName="Input";const Ei=(t,n,r)=>t==="generated"?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"+"})," ",n["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"-"})," ",n["%footnoteEditor_callerDropdown_item_hidden%"]]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{children:r})," ",n["%footnoteEditor_callerDropdown_item_custom%"]]});function Ti({callerType:t,updateCallerType:n,customCaller:r,updateCustomCaller:o,localizedStrings:a}){const[s,l]=i.useState(t),[w,p]=i.useState(r);i.useEffect(()=>{l(t)},[t]),i.useEffect(()=>{w!==r&&p(r)},[r]);const c=d=>{d||(s!=="custom"||w?(n(s),o(w)):(l(t),p(r)))};return e.jsxs(Ft,{onOpenChange:c,children:[e.jsx(Nt,{children:e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:e.jsx(ne,{asChild:!0,children:e.jsx(P,{variant:"outline",className:"tw-h-6",children:Ei(t,a,r)})})}),e.jsx(jt,{children:a["%footnoteEditor_callerDropdown_tooltip%"]})]})}),e.jsxs(Mt,{className:"tw-z-[300]",children:[e.jsx(me,{children:a["%footnoteEditor_callerDropdown_label%"]}),e.jsx(re,{}),e.jsx(Et,{checked:s==="generated",onCheckedChange:()=>l("generated"),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_generated%"]}),e.jsx("span",{className:"tw-w-10 tw-text-center",children:pt.GENERATOR_NOTE_CALLER})]})}),e.jsx(Et,{checked:s==="hidden",onCheckedChange:()=>l("hidden"),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_hidden%"]}),e.jsx("span",{className:"tw-w-10 tw-text-center",children:pt.HIDDEN_NOTE_CALLER})]})}),e.jsx(Et,{checked:s==="custom",onCheckedChange:()=>l("custom"),onSelect:d=>d.preventDefault(),children:e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[e.jsx("span",{children:a["%footnoteEditor_callerDropdown_item_custom%"]}),e.jsx(oe,{className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:w,maxLength:1,onChange:d=>p(d.target.value)})]})})]})]})}const Ri=(t,n)=>t==="f"?e.jsxs(e.Fragment,{children:[e.jsx(y.FunctionSquare,{})," ",n["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?e.jsxs(e.Fragment,{children:[e.jsx(y.SquareSigma,{})," ",n["%footnoteEditor_noteType_endNote_label%"]]}):e.jsxs(e.Fragment,{children:[e.jsx(y.SquareX,{})," ",n["%footnoteEditor_noteType_crossReference_label%"]]}),Mi=(t,n)=>{if(t==="x")return n["%footnoteEditor_noteType_crossReference_label%"];let r=n["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=n["%footnoteEditor_noteType_footnote_label%"]),v.formatReplacementString(n["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Ii({noteType:t,handleNoteTypeChange:n,localizedStrings:r}){return e.jsxs(Ft,{children:[e.jsx(Nt,{children:e.jsxs(St,{children:[e.jsx(or.TooltipTrigger,{asChild:!0,children:e.jsx(ne,{asChild:!0,children:e.jsx(P,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:t==="x",children:Ri(t,r)})})}),e.jsx(jt,{children:e.jsx("p",{children:Mi(t,r)})})]})}),t!=="x"&&e.jsxs(Mt,{className:"tw-z-[300]",children:[e.jsx(me,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),e.jsx(re,{}),e.jsxs(Et,{checked:t==="f",onCheckedChange:()=>n("f"),className:"tw-gap-2",children:[e.jsx(y.FunctionSquare,{}),e.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),e.jsxs(Et,{checked:t==="fe",onCheckedChange:()=>n("fe"),className:"tw-gap-2",children:[e.jsx(y.SquareSigma,{}),e.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Di({noteOps:t,onSave:n,onClose:r,scrRef:o,noteKey:a,editorOptions:s,localizedStrings:l}){const w=i.useRef(null),p=i.createRef(),[c,d]=i.useState("generated"),[f,h]=i.useState("*"),[m,g]=i.useState("f"),b=i.useMemo(()=>({...s,markerMenuTrigger:s.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...s.view??pt.getDefaultViewOptions(),noteMode:"expanded"}}),[s]);i.useEffect(()=>{var x;(x=w.current)==null||x.focus()}),i.useEffect(()=>{var L,C;let x;const _=t==null?void 0:t.at(0);if(_&&pt.isInsertEmbedOpOfType("note",_)){const S=(L=_.insert.note)==null?void 0:L.caller;let R="custom";S===pt.GENERATOR_NOTE_CALLER?R="generated":S===pt.HIDDEN_NOTE_CALLER?R="hidden":S&&h(S),d(R),g(((C=_.insert.note)==null?void 0:C.style)??"f"),_.insert.note&&(_.insert.note.caller=""),x=setTimeout(()=>{var E;(E=w.current)==null||E.applyUpdate([{delete:1},_])},0)}return()=>{x&&clearTimeout(x)}},[t,a]);const j=i.useCallback(()=>{var _,L;const x=(L=(_=w.current)==null?void 0:_.getNoteOps(0))==null?void 0:L.at(0);x&&pt.isInsertEmbedOpOfType("note",x)&&(x.insert.note&&(c==="custom"?x.insert.note.caller=f:x.insert.note.caller=c==="generated"?pt.GENERATOR_NOTE_CALLER:pt.HIDDEN_NOTE_CALLER),n([x]))},[c,f,n]),O=()=>{var _;const x=(_=p.current)==null?void 0:_.getElementsByClassName("editor-input")[0];x!=null&&x.textContent&&navigator.clipboard.writeText(x.textContent)},N=x=>{var L,C,S;g(x);const _=(C=(L=w.current)==null?void 0:L.getNoteOps(0))==null?void 0:C.at(0);_&&pt.isInsertEmbedOpOfType("note",_)&&(_.insert.note&&(_.insert.note.style=x),(S=w.current)==null||S.applyUpdate([{delete:1},_]))};return e.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[e.jsxs("div",{className:"tw-flex",children:[e.jsxs("div",{className:"tw-flex tw-gap-4",children:[e.jsx(Ii,{noteType:m,handleNoteTypeChange:N,localizedStrings:l}),e.jsx(Ti,{callerType:c,updateCallerType:d,customCaller:f,updateCustomCaller:h,localizedStrings:l})]}),e.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[e.jsx(Nt,{children:e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:e.jsx(P,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:e.jsx(y.X,{})})}),e.jsx(jt,{children:e.jsx("p",{children:l["%footnoteEditor_cancelButton_tooltip%"]})})]})}),e.jsx(Nt,{children:e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:e.jsx(P,{onClick:j,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:e.jsx(y.Check,{})})}),e.jsx(jt,{children:l["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),e.jsxs("div",{ref:p,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[e.jsx(pt.Editorial,{options:b,onScrRefChange:()=>{},scrRef:o,ref:w}),e.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:e.jsx(Nt,{children:e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:e.jsx(P,{onClick:O,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(y.Copy,{})})}),e.jsx(jt,{children:e.jsx("p",{children:l["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Oi=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function po(t,n){if(!n||n.length===0)return t??"empty";const r=n.find(a=>typeof a=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof n[0]=="string"?"impossible":n[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Vi(t,n,r=!0,o=void 0){if(!n||n.length===0)return;const a=[],s=[];let l=[];return n.forEach(w=>{typeof w!="string"&&w.marker==="fp"?(l.length>0&&s.push(l),l=[w]):l.push(w)}),l.length>0&&s.push(l),s.map((w,p)=>{const c=p===s.length-1;return e.jsxs("p",{className:"tw-mb-2",children:[Cn(t,w,r,!0,a),c&&o]},po(t,w))})}function Cn(t,n,r=!0,o=!0,a=[]){if(!(!n||n.length===0))return n.map(s=>{if(typeof s=="string"){const l=`${t}-text-${s.slice(0,10)}`;if(o){const w=u(`usfm_${t}`);return e.jsx("span",{className:w,children:s},l)}return e.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[e.jsx(y.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),e.jsx("span",{children:s}),e.jsx(y.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Li(s,po(`${t}\\${s.marker}`,[s]),r,[...a,t??"unknown"])})}function Li(t,n,r,o=[]){const{marker:a}=t;return e.jsxs("span",{children:[a?r&&e.jsx("span",{className:"marker",children:`\\${a} `}):e.jsx(y.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Cn(a,t.content,r,!0,[...o,a??"unknown"])]},n)}function uo({footnote:t,layout:n="horizontal",formatCaller:r,showMarkers:o=!0}){const a=r?r(t.caller):t.caller,s=a!==t.caller;let l,w=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...w]=t.content);const p=o?e.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,c=o?e.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,d=a&&e.jsxs("span",{className:u("note-caller tw-inline-block",{formatted:s}),children:[a," "]}),f=l&&e.jsxs(e.Fragment,{children:[Cn(t.marker,[l],o,!1)," "]}),h=n==="horizontal"?"horizontal":"vertical",m=o?"marker-visible":"",g=n==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",b=u(h,m);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:u("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap tw-pr-2",b),children:[p,d]}),e.jsx("div",{className:u("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap tw-pr-2",b),children:f}),e.jsx("div",{className:u("textual-note-body tw-pr-0.5",g,b),children:w&&w.length>0&&e.jsx(e.Fragment,{children:Vi(t.marker,w,o,c)})})]})}const Ai=["%webView_footnoteList_header%"],Pi=(t,n)=>t[n]??n;function $i({className:t,classNameForItems:n,footnotes:r,layout:o="horizontal",listId:a,selectedFootnote:s,showMarkers:l=!0,suppressFormatting:w=!1,formatCaller:p,onFootnoteSelected:c,localizedStrings:d}){const f=d?Pi(d,"%webView_footnoteList_header%"):"Footnotes",h=p??v.getFormatCallerFunction(r,void 0),m=(x,_)=>{c==null||c(x,_,a)},g=s?r.findIndex(x=>x===s):0,[b,j]=i.useState(g),O=x=>{if(r.length)switch(x.key){case"ArrowDown":x.preventDefault(),j(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":x.preventDefault(),j(_=>Math.max(_-1,0));break;case"Enter":case" ":x.preventDefault(),c==null||c(r[b],b,a);break}},N=i.useRef([]);return i.useEffect(()=>{var x;b>=0&&b<N.current.length&&((x=N.current[b])==null||x.focus())},[b]),e.jsxs(e.Fragment,{children:[o==="vertical"&&e.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:f}),e.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:u("@container tw-h-full tw-overflow-y-auto",t),onKeyDown:O,children:e.jsx("ul",{className:u("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-3 tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-2 tw-grid-cols-[min-content_1fr]",!w&&"formatted-font"),children:r.map((x,_)=>{const L=x===s,C=`${a}-${_}`;return console.log(n),e.jsxs(e.Fragment,{children:[e.jsx("li",{ref:S=>{N.current[_]=S},role:"option","aria-selected":L,"data-marker":x.marker,"data-state":L?"selected":void 0,tabIndex:-1,className:u("data-[state=selected]:tw-bg-muted",c&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",n),onClick:()=>m(x,_),children:e.jsx(uo,{footnote:x,layout:o,formatCaller:()=>h(x.caller,_),showMarkers:l})},C),_<r.length-1&&o==="vertical"&&e.jsx(Yt,{className:"tw-col-span-2"})]})})})})]})}function zi(t){const n=[];let r=0;const o=/\\\\(.+?)\\\\/g;let a;for(;(a=o.exec(t))!==null;)a.index>r&&n.push(t.substring(r,a.index)),n.push(e.jsx("strong",{children:a[1]},a.index)),r=o.lastIndex;return r<t.length&&n.push(t.substring(r)),n.length>0?n:[t]}function Fi({occurrenceData:t,setScriptureReference:n,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],s=i.useMemo(()=>{const l=[],w=new Set;return t.forEach(p=>{const c=`${p.reference.book}:${p.reference.chapterNum}:${p.reference.verseNum}:${p.text}`;w.has(c)||(w.add(c),l.push(p))}),l},[t]);return e.jsxs(_e,{stickyHeader:!0,children:[e.jsx(Ce,{stickyHeader:!0,children:e.jsxs(yt,{children:[e.jsx(we,{children:o}),e.jsx(we,{children:a})]})}),e.jsx(Se,{children:s.length>0&&s.map(l=>e.jsxs(yt,{onClick:()=>{n(l.reference)},children:[e.jsx(Vt,{children:`${H.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}`}),e.jsx(Vt,{children:zi(l.text)})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}const Fe=i.forwardRef(({className:t,...n},r)=>e.jsx(Ze.Root,{ref:r,className:u("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...n,children:e.jsx(Ze.Indicator,{className:u("tw-flex tw-items-center tw-justify-center tw-text-current"),children:e.jsx(y.Check,{className:"tw-h-4 tw-w-4"})})}));Fe.displayName=Ze.Root.displayName;const Be=t=>t==="asc"?e.jsx(y.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?e.jsx(y.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e.jsx(y.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Bi=t=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>e.jsxs(P,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Be(n.getIsSorted())]})}),Gi=(t,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>e.jsxs(P,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,Be(r.getIsSorted())]})}),Hi=t=>({accessorKey:"count",header:({column:n})=>e.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.jsxs(P,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Be(n.getIsSorted())]})}),cell:({row:n})=>e.jsx("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")})}),qe=(t,n,r,o,a,s)=>{let l=[...r];t.forEach(p=>{n==="approved"?l.includes(p)||l.push(p):l=l.filter(c=>c!==p)}),o(l);let w=[...a];t.forEach(p=>{n==="unapproved"?w.includes(p)||w.push(p):w=w.filter(c=>c!==p)}),s(w)},Ki=(t,n,r,o,a)=>({accessorKey:"status",header:({column:s})=>e.jsx("div",{className:"tw-flex tw-justify-center",children:e.jsxs(P,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,Be(s.getIsSorted())]})}),cell:({row:s})=>{const l=s.getValue("status"),w=s.getValue("item");return e.jsxs(ze,{value:l,variant:"outline",type:"single",children:[e.jsx(se,{onClick:p=>{p.stopPropagation(),qe([w],"approved",n,r,o,a)},value:"approved",children:e.jsx(y.CircleCheckIcon,{})}),e.jsx(se,{onClick:p=>{p.stopPropagation(),qe([w],"unapproved",n,r,o,a)},value:"unapproved",children:e.jsx(y.CircleXIcon,{})}),e.jsx(se,{onClick:p=>{p.stopPropagation(),qe([w],"unknown",n,r,o,a)},value:"unknown",children:e.jsx(y.CircleHelpIcon,{})})]})}}),Xi=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),qi=t=>{const n=/^\\[vc]\s+(\d+)/,r=t.match(n);if(r)return+r[1]},Ui=t=>{const n=t.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},mo=(t,n,r)=>r.includes(t)?"unapproved":n.includes(t)?"approved":"unknown",Yi=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Ji=(t,n,r)=>{let o=t;return n!=="all"&&(o=o.filter(a=>n==="approved"&&a.status==="approved"||n==="unapproved"&&a.status==="unapproved"||n==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},Wi=(t,n,r)=>{const o=[];return t.forEach(a=>{const s=o.find(l=>v.deepEqual(l.items,v.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(s)s.count+=1,s.occurrences.push({reference:a.verseRef,text:a.verse});else{const l={items:v.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:mo(v.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],n,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(l)}}),o},bt=(t,n)=>t[n]??n;function Zi({inventoryItems:t,setVerseRef:n,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:s,scope:l,onScopeChange:w,columns:p,id:c,areInventoryItemsLoading:d=!1}){const f=bt(r,"%webView_inventory_all%"),h=bt(r,"%webView_inventory_approved%"),m=bt(r,"%webView_inventory_unapproved%"),g=bt(r,"%webView_inventory_unknown%"),b=bt(r,"%webView_inventory_scope_currentBook%"),j=bt(r,"%webView_inventory_scope_chapter%"),O=bt(r,"%webView_inventory_scope_verse%"),N=bt(r,"%webView_inventory_filter_text%"),x=bt(r,"%webView_inventory_show_additional_items%"),_=bt(r,"%webView_inventory_no_results%"),[L,C]=i.useState(!1),[S,R]=i.useState("all"),[E,T]=i.useState(""),[A,$]=i.useState([]),F=i.useMemo(()=>{const k=t??[];return k.length===0?[]:Wi(k,a,s)},[t,a,s]),D=i.useMemo(()=>{if(L)return F;const k=[];return F.forEach(K=>{const ct=K.items[0],gt=k.find(_t=>_t.items[0]===ct);gt?(gt.count+=K.count,gt.occurrences=gt.occurrences.concat(K.occurrences)):k.push({items:[ct],count:K.count,occurrences:K.occurrences,status:K.status})}),k},[L,F]),X=i.useMemo(()=>D.length===0?[]:Ji(D,S,E),[D,S,E]),V=i.useMemo(()=>{var ct,gt;if(!L)return p;const k=(ct=o==null?void 0:o.tableHeaders)==null?void 0:ct.length;if(!k)return p;const K=[];for(let _t=0;_t<k;_t++)K.push(Gi(((gt=o==null?void 0:o.tableHeaders)==null?void 0:gt[_t])||"Additional Item",_t+1));return[...K,...p]},[o==null?void 0:o.tableHeaders,p,L]);i.useEffect(()=>{X.length===0?$([]):X.length===1&&$(X[0].items)},[X]);const q=(k,K)=>{K.setRowSelection(()=>{const ct={};return ct[k.index]=!0,ct}),$(k.original.items)},dt=k=>{if(k==="book"||k==="chapter"||k==="verse")w(k);else throw new Error(`Invalid scope value: ${k}`)},It=k=>{if(k==="all"||k==="approved"||k==="unapproved"||k==="unknown")R(k);else throw new Error(`Invalid status filter value: ${k}`)},ft=i.useMemo(()=>{if(D.length===0||A.length===0)return[];const k=D.filter(K=>v.deepEqual(L?K.items:[K.items[0]],A));if(k.length>1)throw new Error("Selected item is not unique");return k.length===0?[]:k[0].occurrences},[A,L,D]);return e.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-items-stretch",children:[e.jsxs(Jt,{onValueChange:k=>It(k),defaultValue:S,children:[e.jsx(Lt,{className:"tw-m-1",children:e.jsx(Wt,{placeholder:"Select filter"})}),e.jsxs(At,{children:[e.jsx(wt,{value:"all",children:f}),e.jsx(wt,{value:"approved",children:h}),e.jsx(wt,{value:"unapproved",children:m}),e.jsx(wt,{value:"unknown",children:g})]})]}),e.jsxs(Jt,{onValueChange:k=>dt(k),defaultValue:l,children:[e.jsx(Lt,{className:"tw-m-1",children:e.jsx(Wt,{placeholder:"Select scope"})}),e.jsxs(At,{children:[e.jsx(wt,{value:"book",children:b}),e.jsx(wt,{value:"chapter",children:j}),e.jsx(wt,{value:"verse",children:O})]})]}),e.jsx(oe,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:N,value:E,onChange:k=>{T(k.target.value)}}),o&&e.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[e.jsx(Fe,{className:"tw-m-1",checked:L,onCheckedChange:k=>{C(k)}}),e.jsx(tt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??x})]})]}),e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(so,{columns:V,data:X,onRowClickHandler:q,stickyHeader:!0,isLoading:d,noResultsMessage:_})}),ft.length>0&&e.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:e.jsx(Fi,{occurrenceData:ft,setScriptureReference:n,localizedStrings:r})})]})}const Qi="16rem",tl="3rem",ho=i.createContext(void 0);function Ee(){const t=i.useContext(ho);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Sn=i.forwardRef(({defaultOpen:t=!0,open:n,onOpenChange:r,className:o,style:a,children:s,side:l="primary",...w},p)=>{const[c,d]=i.useState(t),f=n??c,h=i.useCallback(x=>{const _=typeof x=="function"?x(f):x;r?r(_):d(_)},[r,f]),m=i.useCallback(()=>h(x=>!x),[h]),g=f?"expanded":"collapsed",O=et()==="ltr"?l:l==="primary"?"secondary":"primary",N=i.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:m,side:O}),[g,f,h,m,O]);return e.jsx(ho.Provider,{value:N,children:e.jsx(Nt,{delayDuration:0,children:e.jsx("div",{style:{"--sidebar-width":Qi,"--sidebar-width-icon":tl,...a},className:u("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:p,...w,children:s})})})});Sn.displayName="SidebarProvider";const En=i.forwardRef(({variant:t="sidebar",collapsible:n="offcanvas",className:r,children:o,...a},s)=>{const l=Ee();return n==="none"?e.jsx("div",{className:u("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:s,...a,children:o}):e.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?n:"","data-variant":t,"data-side":l.side,children:[e.jsx("div",{className:u("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),e.jsx("div",{className:u("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:e.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});En.displayName="Sidebar";const fo=i.forwardRef(({className:t,onClick:n,...r},o)=>{const a=Ee();return e.jsxs(P,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:u("tw-h-7 tw-w-7",t),onClick:s=>{n==null||n(s),a.toggleSidebar()},...r,children:[a.side==="primary"?e.jsx(y.PanelLeft,{}):e.jsx(y.PanelRight,{}),e.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});fo.displayName="SidebarTrigger";const go=i.forwardRef(({className:t,...n},r)=>{const{toggleSidebar:o}=Ee();return e.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:u("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...n})});go.displayName="SidebarRail";const Tn=i.forwardRef(({className:t,...n},r)=>e.jsx("main",{ref:r,className:u("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...n}));Tn.displayName="SidebarInset";const bo=i.forwardRef(({className:t,...n},r)=>e.jsx(oe,{ref:r,"data-sidebar":"input",className:u("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...n}));bo.displayName="SidebarInput";const xo=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"header",className:u("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));xo.displayName="SidebarHeader";const vo=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"footer",className:u("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...n}));vo.displayName="SidebarFooter";const yo=i.forwardRef(({className:t,...n},r)=>e.jsx(Yt,{ref:r,"data-sidebar":"separator",className:u("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...n}));yo.displayName="SidebarSeparator";const Rn=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"content",className:u("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...n}));Rn.displayName="SidebarContent";const De=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group",className:u("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...n}));De.displayName="SidebarGroup";const Oe=i.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?ce.Slot:"div";return e.jsx(a,{ref:o,"data-sidebar":"group-label",className:u("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});Oe.displayName="SidebarGroupLabel";const No=i.forwardRef(({className:t,asChild:n=!1,...r},o)=>{const a=n?ce.Slot:"button";return e.jsx(a,{ref:o,"data-sidebar":"group-action",className:u("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});No.displayName="SidebarGroupAction";const Ve=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"group-content",className:u("tw-w-full tw-text-sm",t),...n}));Ve.displayName="SidebarGroupContent";const Mn=i.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu",className:u("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...n}));Mn.displayName="SidebarMenu";const In=i.forwardRef(({className:t,...n},r)=>e.jsx("li",{ref:r,"data-sidebar":"menu-item",className:u("tw-group/menu-item tw-relative",t),...n}));In.displayName="SidebarMenuItem";const el=Pt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Dn=i.forwardRef(({asChild:t=!1,isActive:n=!1,variant:r="default",size:o="default",tooltip:a,className:s,...l},w)=>{const p=t?ce.Slot:"button",{state:c}=Ee(),d=e.jsx(p,{ref:w,"data-sidebar":"menu-button","data-size":o,"data-active":n,className:u(el({variant:r,size:o}),s),...l});return a?(typeof a=="string"&&(a={children:a}),e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:d}),e.jsx(jt,{side:"right",align:"center",hidden:c!=="collapsed",...a})]})):d});Dn.displayName="SidebarMenuButton";const jo=i.forwardRef(({className:t,asChild:n=!1,showOnHover:r=!1,...o},a)=>{const s=n?ce.Slot:"button";return e.jsx(s,{ref:a,"data-sidebar":"menu-action",className:u("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});jo.displayName="SidebarMenuAction";const ko=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:u("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));ko.displayName="SidebarMenuBadge";const _o=i.forwardRef(({className:t,showIcon:n=!1,...r},o)=>{const a=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return e.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:u("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[n&&e.jsx(Ie,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),e.jsx(Ie,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});_o.displayName="SidebarMenuSkeleton";const Co=i.forwardRef(({className:t,...n},r)=>e.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:u("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...n}));Co.displayName="SidebarMenuSub";const So=i.forwardRef(({...t},n)=>e.jsx("li",{ref:n,...t}));So.displayName="SidebarMenuSubItem";const Eo=i.forwardRef(({asChild:t=!1,size:n="md",isActive:r,className:o,...a},s)=>{const l=t?ce.Slot:"a";return e.jsx(l,{ref:s,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:u("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Eo.displayName="SidebarMenuSubButton";function To({id:t,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:l,buttonPlaceholderText:w,className:p}){const c=i.useCallback((h,m)=>{o(h,m)},[o]),d=i.useCallback(h=>{const m=r.find(g=>g.projectId===h);return m?m.projectName:h},[r]),f=i.useCallback(h=>!a.projectId&&h===a.label,[a]);return e.jsx(En,{id:t,collapsible:"none",variant:"inset",className:u("tw-w-96 tw-gap-2 tw-overflow-y-auto",p),children:e.jsxs(Rn,{children:[e.jsxs(De,{children:[e.jsx(Oe,{className:"tw-text-sm",children:s}),e.jsx(Ve,{children:e.jsx(Mn,{children:Object.entries(n).map(([h,m])=>e.jsx(In,{children:e.jsx(Dn,{onClick:()=>c(h),isActive:f(h),children:e.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),e.jsxs(De,{children:[e.jsx(Oe,{className:"tw-text-sm",children:l}),e.jsx(Ve,{className:"tw-pl-3",children:e.jsx(Me,{buttonVariant:"ghost",buttonClassName:u("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:d,buttonPlaceholder:w,onChange:h=>{const m=d(h);c(m,h)},value:(a==null?void 0:a.projectId)??void 0,icon:e.jsx(y.ScrollText,{})})})]})]})})}const Ge=i.forwardRef(({value:t,onSearch:n,placeholder:r,isFullWidth:o,className:a,isDisabled:s=!1,id:l},w)=>{const p=et();return e.jsxs("div",{id:l,className:u("tw-relative",{"tw-w-full":o},a),children:[e.jsx(y.Search,{className:u("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":p==="rtl"},{"tw-left-3":p==="ltr"})}),e.jsx(oe,{ref:w,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:c=>n(c.target.value),disabled:s}),t&&e.jsxs(P,{variant:"ghost",size:"icon",className:u("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":p==="rtl"},{"tw-right-0":p==="ltr"}),onClick:()=>{n("")},children:[e.jsx(y.X,{className:"tw-h-4 tw-w-4"}),e.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ge.displayName="SearchBar";function nl({id:t,extensionLabels:n,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:s,searchValue:l,onSearch:w,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}){return e.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[e.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:e.jsx(Ge,{className:"tw-w-9/12",value:l,onSearch:w,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(Sn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[e.jsx(To,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:s,extensionsSidebarGroupLabel:p,projectsSidebarGroupLabel:c,buttonPlaceholderText:d}),e.jsx(Tn,{className:"tw-min-w-[215px]",children:o})]})]})}const Dt="scrBook",rl="scrRef",Kt="source",ol="details",al="Scripture Reference",sl="Scripture Book",Ro="Type",il="Details";function ll(t,n){const r=n??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Dt,header:(t==null?void 0:t.scriptureReferenceColumnName)??al,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?H.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===Dt?v.formatScrRef(a.start):void 0},getGroupingValue:o=>H.bookIdToNumber(o.start.book),sortingFn:(o,a)=>v.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>v.formatScrRef(o.start),id:rl,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:v.formatScrRef(a.start)},sortingFn:(o,a)=>v.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Kt,header:r?(t==null?void 0:t.typeColumnName)??Ro:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:ol,header:(t==null?void 0:t.detailsColumnName)??il,cell:o=>o.getValue(),enableGrouping:!1}]}const wl=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:n}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||v.compareScrRefs(t.start,t.end)===0?`${v.scrRefToBBBCCCVVV(t.start)}+${n}`:`${v.scrRefToBBBCCCVVV(t.start)}+${n}-${v.scrRefToBBBCCCVVV(t.end)}+${r}`},nr=t=>`${wl({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function cl({sources:t,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:s,detailsColumnName:l,onRowSelected:w,id:p}){const[c,d]=i.useState([]),[f,h]=i.useState([{id:Dt,desc:!1}]),[m,g]=i.useState({}),b=i.useMemo(()=>t.flatMap(E=>E.data.map(T=>({...T,source:E.source}))),[t]),j=i.useMemo(()=>ll({scriptureReferenceColumnName:o,typeColumnName:s,detailsColumnName:l},r),[o,s,l,r]);i.useEffect(()=>{c.includes(Kt)?h([{id:Kt,desc:!1},{id:Dt,desc:!1}]):h([{id:Dt,desc:!1}])},[c]);const O=rt.useReactTable({data:b,columns:j,state:{grouping:c,sorting:f,rowSelection:m},onGroupingChange:d,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:rt.getExpandedRowModel(),getGroupedRowModel:rt.getGroupedRowModel(),getCoreRowModel:rt.getCoreRowModel(),getSortedRowModel:rt.getSortedRowModel(),getRowId:nr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(w){const E=O.getSelectedRowModel().rowsById,T=Object.keys(E);if(T.length===1){const A=b.find($=>nr($)===T[0])||void 0;A&&w(A)}}},[m,b,w,O]);const N=a??sl,x=s??Ro,_=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[Dt]},{label:`Group by ${x}`,value:[Kt]},{label:`Group by ${N} and ${x}`,value:[Dt,Kt]},{label:`Group by ${x} and ${N}`,value:[Kt,Dt]}],L=E=>{d(JSON.parse(E))},C=(E,T)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(T)},S=(E,T)=>E.getIsGrouped()?"":u("banded-row",T%2===0?"even":"odd"),R=(E,T,A)=>{if(!((E==null?void 0:E.length)===0||T.depth<A.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return e.jsxs("div",{id:p,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&e.jsxs(Jt,{value:JSON.stringify(c),onValueChange:E=>{L(E)},children:[e.jsx(Lt,{className:"tw-mb-1 tw-mt-2",children:e.jsx(Wt,{})}),e.jsx(At,{position:"item-aligned",children:e.jsx(to,{children:_.map(E=>e.jsx(wt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),e.jsxs(_e,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&e.jsx(Ce,{children:O.getHeaderGroups().map(E=>e.jsx(yt,{children:E.headers.filter(T=>T.column.columnDef.header).map(T=>e.jsx(we,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:e.jsxs("div",{children:[T.column.getCanGroup()?e.jsx(P,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",rt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},E.id))}),e.jsx(Se,{children:O.getRowModel().rows.map((E,T)=>{const A=et();return e.jsx(yt,{"data-state":E.getIsSelected()?"selected":"",className:u(S(E,T)),onClick:$=>C(E,$),children:E.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==Kt||!r)))return e.jsx(Vt,{className:u($.column.columnDef.id,"tw-p-[1px]",R(c,E,$)),children:$.getIsGrouped()?e.jsxs(P,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&e.jsx(y.ChevronDown,{}),!E.getIsExpanded()&&(A==="ltr"?e.jsx(y.ChevronRight,{}):e.jsx(y.ChevronLeft,{}))," ",rt.flexRender($.column.columnDef.cell,$.getContext())," (",E.subRows.length,")"]}):rt.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},E.id)})})]})]})}const On=(t,n)=>t.filter(r=>{try{return v.getSectionForBook(r)===n}catch{return!1}}),Mo=(t,n,r)=>On(t,n).every(o=>r.includes(o));function dl({section:t,availableBookIds:n,selectedBookIds:r,onToggle:o,localizedStrings:a}){const s=On(n,t).length===0,l=a["%scripture_section_ot_short%"],w=a["%scripture_section_nt_short%"],p=a["%scripture_section_dc_short%"],c=a["%scripture_section_extra_short%"];return e.jsx(P,{variant:"outline",size:"sm",onClick:()=>o(t),className:u(Mo(n,t,r)&&!s&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:s,children:cs(t,l,w,p,c)})}const rr=5,Ue=6;function pl({availableBookInfo:t,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const s=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],w=o["%webView_book_selector_search_books%"],p=o["%webView_book_selector_select_all%"],c=o["%webView_book_selector_clear_all%"],d=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:m,dcLong:g,extraLong:b}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[j,O]=i.useState(!1),[N,x]=i.useState(""),_=i.useRef(void 0),L=i.useRef(!1);if(t.length!==H.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const C=i.useMemo(()=>H.allBookIds.filter((D,X)=>t[X]==="1"&&!H.isObsolete(H.bookIdToNumber(D))),[t]),S=i.useMemo(()=>{if(!N.trim()){const V={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return C.forEach(q=>{const dt=v.getSectionForBook(q);V[dt].push(q)}),V}const D=C.filter(V=>dn(V,N,a)),X={[v.Section.OT]:[],[v.Section.NT]:[],[v.Section.DC]:[],[v.Section.Extra]:[]};return D.forEach(V=>{const q=v.getSectionForBook(V);X[q].push(V)}),X},[C,N,a]),R=i.useCallback((D,X=!1)=>{if(!X||!_.current){r(n.includes(D)?n.filter(k=>k!==D):[...n,D]),_.current=D;return}const V=C.findIndex(k=>k===_.current),q=C.findIndex(k=>k===D);if(V===-1||q===-1)return;const[dt,It]=[Math.min(V,q),Math.max(V,q)],ft=C.slice(dt,It+1).map(k=>k);r(n.includes(D)?n.filter(k=>!ft.includes(k)):[...new Set([...n,...ft])])},[n,r,C]),E=D=>{R(D,L.current),L.current=!1},T=(D,X)=>{D.preventDefault(),R(X,D.shiftKey)},A=i.useCallback(D=>{const X=On(C,D).map(V=>V);r(Mo(C,D,n)?n.filter(V=>!X.includes(V)):[...new Set([...n,...X])])},[n,r,C]),$=()=>{r(C.map(D=>D))},F=()=>{r([])};return e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(v.Section).map(D=>e.jsx(dl,{section:D,availableBookIds:C,selectedBookIds:n,onToggle:A,localizedStrings:o},D))}),e.jsxs(te,{open:j,onOpenChange:D=>{O(D),D||x("")},children:[e.jsx(ee,{asChild:!0,children:e.jsxs(P,{variant:"outline",role:"combobox","aria-expanded":j,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${s}: ${n.length}`:l,e.jsx(y.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),e.jsx(zt,{className:"tw-w-full tw-p-0",align:"start",children:e.jsxs(Zt,{shouldFilter:!1,onKeyDown:D=>{D.key==="Enter"&&(L.current=D.shiftKey)},children:[e.jsx(pe,{placeholder:w,value:N,onValueChange:x}),e.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[e.jsx(P,{variant:"ghost",size:"sm",onClick:$,children:p}),e.jsx(P,{variant:"ghost",size:"sm",onClick:F,children:c})]}),e.jsxs(Qt,{children:[e.jsx(ke,{children:d}),Object.values(v.Section).map((D,X)=>{const V=S[D];if(V.length!==0)return e.jsxs(i.Fragment,{children:[e.jsx(Tt,{heading:Nr(D,h,m,g,b),children:V.map(q=>e.jsx(kr,{bookId:q,isSelected:n.includes(q),onSelect:()=>E(q),onMouseDown:dt=>T(dt,q),section:v.getSectionForBook(q),showCheck:!0,localizedBookNames:a,commandValue:en(q,a),className:"tw-flex tw-items-center"},q))}),X<Object.values(v.Section).length-1&&e.jsx(hr,{})]},D)})]})]})})]}),n.length>0&&e.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===Ue?Ue:rr).map(D=>e.jsx(le,{className:"hover:tw-bg-secondary",variant:"secondary",children:ae(D,a)},D)),n.length>Ue&&e.jsx(le,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${n.length-rr} ${f}`})]})]})}const ul=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Gt=(t,n)=>t[n]??n;function ml({scope:t,availableScopes:n,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:s,localizedStrings:l,localizedBookNames:w,id:p}){const c=Gt(l,"%webView_scope_selector_selected_text%"),d=Gt(l,"%webView_scope_selector_current_verse%"),f=Gt(l,"%webView_scope_selector_current_chapter%"),h=Gt(l,"%webView_scope_selector_current_book%"),m=Gt(l,"%webView_scope_selector_choose_books%"),g=Gt(l,"%webView_scope_selector_scope%"),b=Gt(l,"%webView_scope_selector_select_books%"),j=[{value:"selectedText",label:c,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],O=n?j.filter(N=>n.includes(N.value)):j;return e.jsxs("div",{id:p,className:"tw-grid tw-gap-4",children:[e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(tt,{children:g}),e.jsx($e,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:O.map(({value:N,label:x,id:_})=>e.jsxs("div",{className:"tw-flex tw-items-center",children:[e.jsx(ve,{className:"tw-me-2",value:N,id:_}),e.jsx(tt,{htmlFor:_,children:x})]},_))})]}),t==="selectedBooks"&&e.jsxs("div",{className:"tw-grid tw-gap-2",children:[e.jsx(tt,{children:b}),e.jsx(pl,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:s,localizedStrings:l,localizedBookNames:w})]})]})}const Ye={[v.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[v.getLocalizeKeyForScrollGroupId(0)]:"A",[v.getLocalizeKeyForScrollGroupId(1)]:"B",[v.getLocalizeKeyForScrollGroupId(2)]:"C",[v.getLocalizeKeyForScrollGroupId(3)]:"D",[v.getLocalizeKeyForScrollGroupId(4)]:"E",[v.getLocalizeKeyForScrollGroupId(5)]:"F",[v.getLocalizeKeyForScrollGroupId(6)]:"G",[v.getLocalizeKeyForScrollGroupId(7)]:"H",[v.getLocalizeKeyForScrollGroupId(8)]:"I",[v.getLocalizeKeyForScrollGroupId(9)]:"J",[v.getLocalizeKeyForScrollGroupId(10)]:"K",[v.getLocalizeKeyForScrollGroupId(11)]:"L",[v.getLocalizeKeyForScrollGroupId(12)]:"M",[v.getLocalizeKeyForScrollGroupId(13)]:"N",[v.getLocalizeKeyForScrollGroupId(14)]:"O",[v.getLocalizeKeyForScrollGroupId(15)]:"P",[v.getLocalizeKeyForScrollGroupId(16)]:"Q",[v.getLocalizeKeyForScrollGroupId(17)]:"R",[v.getLocalizeKeyForScrollGroupId(18)]:"S",[v.getLocalizeKeyForScrollGroupId(19)]:"T",[v.getLocalizeKeyForScrollGroupId(20)]:"U",[v.getLocalizeKeyForScrollGroupId(21)]:"V",[v.getLocalizeKeyForScrollGroupId(22)]:"W",[v.getLocalizeKeyForScrollGroupId(23)]:"X",[v.getLocalizeKeyForScrollGroupId(24)]:"Y",[v.getLocalizeKeyForScrollGroupId(25)]:"Z"};function hl({availableScrollGroupIds:t,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:s,id:l}){const w={...Ye,...Object.fromEntries(Object.entries(o).map(([c,d])=>[c,c===d&&c in Ye?Ye[c]:d]))},p=et();return e.jsxs(Jt,{value:`${n}`,onValueChange:c=>r(c==="undefined"?void 0:parseInt(c,10)),children:[e.jsx(Lt,{size:a,className:u("pr-twp tw-w-auto",s),children:e.jsx(Wt,{placeholder:w[v.getLocalizeKeyForScrollGroupId(n)]??n})}),e.jsx(At,{id:l,align:p==="rtl"?"end":"start",style:{zIndex:250},children:t.map(c=>e.jsx(wt,{value:`${c}`,children:w[v.getLocalizeKeyForScrollGroupId(c)]},`${c}`))})]})}function fl({children:t}){return e.jsx("div",{className:"pr-twp tw-grid",children:t})}function gl({primary:t,secondary:n,children:r,isLoading:o=!1,loadingMessage:a}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),e.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n})]}),o?e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):e.jsx("div",{children:r})]})}function bl({primary:t,secondary:n,includeSeparator:r=!1}){return e.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:n})]}),r?e.jsx(Yt,{}):""]})}function Io(t,n){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===n))==null?void 0:r[0]}function Le({icon:t,menuLabel:n,leading:r}){return t?e.jsx("img",{className:u("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${n}`}):void 0}const Do=(t,n,r,o)=>r?Object.entries(t).filter(([s,l])=>"column"in l&&l.column===r||s===r).sort(([,s],[,l])=>s.order-l.order).flatMap(([s])=>n.filter(w=>w.group===s).sort((w,p)=>w.order-p.order).map(w=>e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:"command"in w?e.jsxs(ye,{onClick:()=>{o(w)},children:[w.iconPathBefore&&e.jsx(Le,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&e.jsx(Le,{icon:w.iconPathAfter,menuLabel:w.label})]},`dropdown-menu-item-${w.label}-${w.command}`):e.jsxs(Wr,{children:[e.jsx(yn,{children:w.label}),e.jsx(Jr,{children:e.jsx(Nn,{children:Do(t,n,Io(t,w.id),o)})})]},`dropdown-menu-sub-${w.label}-${w.id}`)}),w.tooltip&&e.jsx(jt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`))):void 0;function Ae({onSelectMenuItem:t,menuData:n,tabLabel:r,icon:o,className:a,variant:s,buttonVariant:l="ghost",id:w}){return e.jsxs(Ft,{variant:s,children:[e.jsx(ne,{"aria-label":r,className:a,asChild:!0,id:w,children:e.jsx(P,{variant:l,size:"icon",children:o??e.jsx(y.MenuIcon,{})})}),e.jsx(Mt,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,c])=>typeof p=="boolean"||typeof c=="boolean"?0:p.order-c.order).map(([p],c,d)=>e.jsxs(i.Fragment,{children:[e.jsx(vn,{children:e.jsx(Nt,{children:Do(n.groups,n.items,p,t)})}),c<d.length-1&&e.jsx(re,{})]},p))})]})}const Oo=i.forwardRef(({id:t,className:n,children:r},o)=>e.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${n}`,id:t,children:r}));function xl({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:o,id:a,className:s,startAreaChildren:l,centerAreaChildren:w,endAreaChildren:p,menuButtonIcon:c}){return e.jsxs(Oo,{className:`tw-w-full tw-border ${s}`,id:a,children:[r&&e.jsx(Ae,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:c??e.jsx(y.Menu,{}),buttonVariant:"ghost"}),l&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),w&&e.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:w}),e.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&e.jsx(Ae,{onSelectMenuItem:n,menuData:o,tabLabel:"View Info",icon:e.jsx(y.EllipsisVertical,{}),className:"tw-h-full"}),p]})]})}function vl({onSelectProjectMenuItem:t,projectMenuData:n,id:r,className:o,menuButtonIcon:a}){return e.jsx(Oo,{className:"tw-pointer-events-none",id:r,children:n&&e.jsx(Ae,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Vn=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(it.Root,{orientation:"vertical",ref:r,className:u("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...n,dir:o})});Vn.displayName=it.List.displayName;const Ln=i.forwardRef(({className:t,...n},r)=>e.jsx(it.List,{ref:r,className:u("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n}));Ln.displayName=it.List.displayName;const Vo=i.forwardRef(({className:t,...n},r)=>e.jsx(it.Trigger,{ref:r,...n,className:u("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),An=i.forwardRef(({className:t,...n},r)=>e.jsx(it.Content,{ref:r,className:u("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));An.displayName=it.Content.displayName;function yl({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:s,id:l}){return e.jsxs("div",{id:l,className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?e.jsx("h1",{children:a}):"",e.jsx(Ge,{className:s,value:n,onSearch:r,placeholder:o})]}),e.jsxs(Vn,{children:[e.jsx(Ln,{children:t.map(w=>e.jsx(Vo,{value:w.value,children:w.value},w.key))}),t.map(w=>e.jsx(An,{value:w.value,children:w.content},w.key))]})]})}function Nl({...t}){return e.jsx(Y.Menu,{...t})}function jl({...t}){return e.jsx(Y.Sub,{"data-slot":"menubar-sub",...t})}const Lo=i.forwardRef(({className:t,variant:n="default",...r},o)=>{const a=i.useMemo(()=>({variant:n}),[n]);return e.jsx(xn.Provider,{value:a,children:e.jsx(Y.Root,{ref:o,className:u("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Lo.displayName=Y.Root.displayName;const Ao=i.forwardRef(({className:t,...n},r)=>{const o=ht();return e.jsx(Y.Trigger,{ref:r,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Rt({variant:o.variant,className:t})),...n})});Ao.displayName=Y.Trigger.displayName;const Po=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>{const s=ht();return e.jsxs(Y.SubTrigger,{ref:a,className:u("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",Rt({variant:s.variant,className:t}),t),...o,children:[r,e.jsx(y.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Po.displayName=Y.SubTrigger.displayName;const $o=i.forwardRef(({className:t,...n},r)=>{const o=ht();return e.jsx(Y.SubContent,{ref:r,className:u("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...n})});$o.displayName=Y.SubContent.displayName;const zo=i.forwardRef(({className:t,align:n="start",alignOffset:r=-4,sideOffset:o=8,...a},s)=>{const l=ht();return e.jsx(Y.Portal,{children:e.jsx(Y.Content,{ref:s,align:n,alignOffset:r,sideOffset:o,className:u("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...a})})});zo.displayName=Y.Content.displayName;const Fo=i.forwardRef(({className:t,inset:n,...r},o)=>{const a=ht();return e.jsx(Y.Item,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",Rt({variant:a.variant,className:t}),t),...r})});Fo.displayName=Y.Item.displayName;const kl=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>{const s=ht();return e.jsxs(Y.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Rt({variant:s.variant,className:t}),t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(Y.ItemIndicator,{children:e.jsx(y.Check,{className:"tw-h-4 tw-w-4"})})}),n]})});kl.displayName=Y.CheckboxItem.displayName;const _l=i.forwardRef(({className:t,children:n,...r},o)=>{const a=ht();return e.jsxs(Y.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Rt({variant:a.variant,className:t}),t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(Y.ItemIndicator,{children:e.jsx(y.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]})});_l.displayName=Y.RadioItem.displayName;const Cl=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(Y.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",t),...r}));Cl.displayName=Y.Label.displayName;const Bo=i.forwardRef(({className:t,...n},r)=>e.jsx(Y.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...n}));Bo.displayName=Y.Separator.displayName;const ge=(t,n)=>{setTimeout(()=>{n.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Go=(t,n,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([s,l])=>"column"in l&&l.column===r||s===r).sort(([,s],[,l])=>s.order-l.order);return a.flatMap(([s],l)=>{const w=n.filter(c=>c.group===s).sort((c,d)=>c.order-d.order).map(c=>e.jsxs(St,{children:[e.jsx(Ot,{asChild:!0,children:"command"in c?e.jsxs(Fo,{onClick:()=>{o(c)},children:[c.iconPathBefore&&e.jsx(Le,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&e.jsx(Le,{icon:c.iconPathAfter,menuLabel:c.label})]},`menubar-item-${c.label}-${c.command}`):e.jsxs(jl,{children:[e.jsx(Po,{children:c.label}),e.jsx($o,{children:Go(t,n,Io(t,c.id),o)})]},`menubar-sub-${c.label}-${c.id}`)}),c.tooltip&&e.jsx(jt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`)),p=[...w];return w.length>0&&l<a.length-1&&p.push(e.jsx(Bo,{},`separator-${s}`)),p})};function Sl({menuData:t,onSelectMenuItem:n,onOpenChange:r,variant:o}){const a=i.useRef(void 0),s=i.useRef(void 0),l=i.useRef(void 0),w=i.useRef(void 0),p=i.useRef(void 0),c=d=>{switch(d){case"platform.app":return s;case"platform.window":return l;case"platform.layout":return w;case"platform.help":return p;default:return}};if(Fa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(d,f)=>{var g,b,j,O;d.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":ge(s,[h]);break;case"alt+p":(g=s.current)==null||g.focus(),ge(s,[h,m]);break;case"alt+l":(b=l.current)==null||b.focus(),ge(l,[h,m]);break;case"alt+n":(j=w.current)==null||j.focus(),ge(w,[h,m]);break;case"alt+h":(O=p.current)==null||O.focus(),ge(p,[h,m]);break}}),i.useEffect(()=>{if(!r||!a.current)return;const d=new MutationObserver(m=>{m.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const b=g.target.getAttribute("data-state");r(b==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(m=>{d.observe(m,{attributes:!0})}),()=>d.disconnect()},[r]),!!t)return e.jsx(Lo,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,f])=>typeof d=="boolean"||typeof f=="boolean"?0:d.order-f.order).map(([d,f])=>e.jsxs(Nl,{children:[e.jsx(Ao,{ref:c(d),children:typeof f=="object"&&"label"in f&&f.label}),e.jsx(zo,{className:"tw-z-[250]",children:e.jsx(Nt,{children:Go(t.groups,t.items,d,n)})})]},d))})}function El(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Tl({menuData:t,onOpenChange:n,onSelectMenuItem:r,className:o,id:a,children:s,appMenuAreaChildren:l,configAreaChildren:w,shouldUseAsAppDragArea:p,menubarVariant:c="default"}){const d=i.useRef(void 0);return e.jsx("div",{className:u("tw-border tw-px-4 tw-text-foreground",o),ref:d,style:{position:"relative"},id:a,children:e.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:p?{WebkitAppRegion:"drag"}:void 0,children:[e.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&e.jsx(Sl,{menuData:t,onOpenChange:n,onSelectMenuItem:r,variant:c})]})}),e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:s}),e.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:e.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:p?{WebkitAppRegion:"no-drag"}:void 0,children:w})})]})})}const Rl=(t,n)=>t[n]??n;function Ml({knownUiLanguages:t,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:s,localizedStrings:l,className:w,id:p}){const c=Rl(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[d,f]=i.useState(!1),h=g=>{a&&a(g),o&&o([g,...r.filter(b=>b!==g)]),s&&r.find(b=>b===g)&&s([...r.filter(b=>b!==g)]),f(!1)},m=(g,b)=>{var O,N,x,_,L,C;const j=b!==g?((N=(O=t[g])==null?void 0:O.uiNames)==null?void 0:N[b])??((_=(x=t[g])==null?void 0:x.uiNames)==null?void 0:_.en):void 0;return j?`${(L=t[g])==null?void 0:L.autonym} (${j})`:(C=t[g])==null?void 0:C.autonym};return e.jsxs("div",{id:p,className:u("pr-twp tw-max-w-sm",w),children:[e.jsxs(Jt,{name:"uiLanguage",value:n,onValueChange:h,open:d,onOpenChange:g=>f(g),children:[e.jsx(Lt,{children:e.jsx(Wt,{})}),e.jsx(At,{className:"tw-z-[250]",children:Object.keys(t).map(g=>e.jsx(wt,{value:g,children:m(g,n)},g))})]}),n!=="en"&&e.jsx("div",{className:"tw-pt-3",children:e.jsx(tt,{className:"tw-font-normal tw-text-muted-foreground",children:v.formatReplacementString(c,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>m(g,n)).join(", "):t.en.autonym})})})]})}function Il({item:t,createLabel:n,createComplexLabel:r}){return n?e.jsx(tt,{children:n(t)}):r?e.jsx(tt,{children:r(t)}):e.jsx(tt,{children:t})}function Dl({id:t,className:n,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:s,createComplexLabel:l}){return e.jsx("div",{id:t,className:n,children:r.map(w=>e.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[e.jsx(Fe,{className:"tw-me-2 tw-align-middle",checked:o.includes(w),onCheckedChange:p=>a(w,p)}),e.jsx(Il,{item:w,createLabel:s,createComplexLabel:l})]},w))})}function Ol({cardKey:t,isSelected:n,onSelect:r,isDenied:o,isHidden:a=!1,className:s,children:l,dropdownContent:w,additionalSelectedContent:p,accentColor:c}){const d=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),r())};return e.jsxs("div",{hidden:a,onClick:r,onKeyDown:d,role:"button",tabIndex:0,"aria-pressed":n,className:u("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!n},{"tw-bg-accent":n},{"tw-bg-transparent":!n},s),children:[e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[e.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[e.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),n&&w&&e.jsxs(Ft,{children:[e.jsx(ne,{className:u(c&&"tw-me-1"),asChild:!0,children:e.jsx(P,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:e.jsx(y.MoreHorizontal,{})})}),e.jsx(Mt,{align:"end",children:w})]})]}),n&&p&&e.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),c&&e.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${c}`})]},t)}const Ho=i.forwardRef(({className:t,...n},r)=>e.jsx(y.LoaderCircle,{size:35,className:u("tw-animate-spin",t),...n,ref:r}));Ho.displayName="Spinner";function Vl({id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:s,placeholder:l,isRequired:w=!1,className:p,defaultValue:c,value:d,onChange:f,onFocus:h,onBlur:m}){return e.jsxs("div",{className:u("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[e.jsx(tt,{htmlFor:t,className:u({"tw-text-red-600":r,"tw-hidden":!s}),children:`${s}${w?"*":""}`}),e.jsx(oe,{id:t,disabled:n,placeholder:l,required:w,className:u(p,{"tw-border-red-600":r}),defaultValue:c,value:d,onChange:f,onFocus:h,onBlur:m}),e.jsx("p",{className:u({"tw-hidden":!a}),children:a})]})}const Ll=Pt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ko=i.forwardRef(({className:t,variant:n,...r},o)=>e.jsx("div",{ref:o,role:"alert",className:u("pr-twp",Ll({variant:n}),t),...r}));Ko.displayName="Alert";const Xo=i.forwardRef(({className:t,...n},r)=>e.jsxs("h5",{ref:r,className:u("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...n,children:[n.children," "]}));Xo.displayName="AlertTitle";const qo=i.forwardRef(({className:t,...n},r)=>e.jsx("div",{ref:r,className:u("tw-text-sm [&_p]:tw-leading-relaxed",t),...n}));qo.displayName="AlertDescription";const Al=J.Root,Pl=J.Trigger,$l=J.Group,zl=J.Portal,Fl=J.Sub,Bl=J.RadioGroup,Uo=i.forwardRef(({className:t,inset:n,children:r,...o},a)=>e.jsxs(J.SubTrigger,{ref:a,className:u("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",t),...o,children:[r,e.jsx(y.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Uo.displayName=J.SubTrigger.displayName;const Yo=i.forwardRef(({className:t,...n},r)=>e.jsx(J.SubContent,{ref:r,className:u("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Yo.displayName=J.SubContent.displayName;const Jo=i.forwardRef(({className:t,...n},r)=>e.jsx(J.Portal,{children:e.jsx(J.Content,{ref:r,className:u("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n})}));Jo.displayName=J.Content.displayName;const Wo=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(J.Item,{ref:o,className:u("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",t),...r}));Wo.displayName=J.Item.displayName;const Zo=i.forwardRef(({className:t,children:n,checked:r,...o},a)=>e.jsxs(J.CheckboxItem,{ref:a,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(J.ItemIndicator,{children:e.jsx(y.Check,{className:"tw-h-4 tw-w-4"})})}),n]}));Zo.displayName=J.CheckboxItem.displayName;const Qo=i.forwardRef(({className:t,children:n,...r},o)=>e.jsxs(J.RadioItem,{ref:o,className:u("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[e.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:e.jsx(J.ItemIndicator,{children:e.jsx(y.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),n]}));Qo.displayName=J.RadioItem.displayName;const ta=i.forwardRef(({className:t,inset:n,...r},o)=>e.jsx(J.Label,{ref:o,className:u("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",n&&"tw-pl-8",t),...r}));ta.displayName=J.Label.displayName;const ea=i.forwardRef(({className:t,...n},r)=>e.jsx(J.Separator,{ref:r,className:u("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...n}));ea.displayName=J.Separator.displayName;function na({className:t,...n}){return e.jsx("span",{className:u("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...n})}na.displayName="ContextMenuShortcut";const ra=i.createContext({direction:"bottom"});function oa({shouldScaleBackground:t=!0,direction:n="bottom",...r}){const o=i.useMemo(()=>({direction:n}),[n]);return e.jsx(ra.Provider,{value:o,children:e.jsx(mt.Drawer.Root,{shouldScaleBackground:t,direction:n,...r})})}oa.displayName="Drawer";const Gl=mt.Drawer.Trigger,aa=mt.Drawer.Portal,Hl=mt.Drawer.Close,Pn=i.forwardRef(({className:t,...n},r)=>e.jsx(mt.Drawer.Overlay,{ref:r,className:u("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...n}));Pn.displayName=mt.Drawer.Overlay.displayName;const sa=i.forwardRef(({className:t,children:n,hideDrawerHandle:r=!1,...o},a)=>{const{direction:s="bottom"}=i.useContext(ra),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},w={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return e.jsxs(aa,{children:[e.jsx(Pn,{}),e.jsxs(mt.Drawer.Content,{ref:a,className:u("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",s==="bottom"||s==="top"?"tw-flex-col":"tw-flex-row",l[s],t),...o,children:[!r&&(s==="bottom"||s==="right")&&e.jsx("div",{className:w[s]}),e.jsx("div",{className:"tw-flex tw-flex-col",children:n}),!r&&(s==="top"||s==="left")&&e.jsx("div",{className:w[s]})]})]})});sa.displayName="DrawerContent";function ia({className:t,...n}){return e.jsx("div",{className:u("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...n})}ia.displayName="DrawerHeader";function la({className:t,...n}){return e.jsx("div",{className:u("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...n})}la.displayName="DrawerFooter";const wa=i.forwardRef(({className:t,...n},r)=>e.jsx(mt.Drawer.Title,{ref:r,className:u("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...n}));wa.displayName=mt.Drawer.Title.displayName;const ca=i.forwardRef(({className:t,...n},r)=>e.jsx(mt.Drawer.Description,{ref:r,className:u("tw-text-sm tw-text-muted-foreground",t),...n}));ca.displayName=mt.Drawer.Description.displayName;const da=i.forwardRef(({className:t,value:n,...r},o)=>e.jsx(Qe.Root,{ref:o,className:u("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:e.jsx(Qe.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}})}));da.displayName=Qe.Root.displayName;function Kl({className:t,...n}){return e.jsx(an.PanelGroup,{className:u("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...n})}const Xl=an.Panel;function ql({withHandle:t,className:n,...r}){return e.jsx(an.PanelResizeHandle,{className:u("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",n),...r,children:t&&e.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:e.jsx(y.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Ul({...t}){return e.jsx(ir.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const pa=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsxs(be.Root,{ref:r,className:u("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...n,dir:o,children:[e.jsx(be.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:e.jsx(be.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),e.jsx(be.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});pa.displayName=be.Root.displayName;const ua=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(tn.Root,{className:u("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...n,ref:r,children:e.jsx(tn.Thumb,{className:u("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ua.displayName=tn.Root.displayName;const Yl=it.Root,ma=i.forwardRef(({className:t,...n},r)=>{const o=et();return e.jsx(it.List,{ref:r,className:u("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...n,dir:o})});ma.displayName=it.List.displayName;const ha=i.forwardRef(({className:t,...n},r)=>e.jsx(it.Trigger,{ref:r,className:u("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...n}));ha.displayName=it.Trigger.displayName;const fa=i.forwardRef(({className:t,...n},r)=>e.jsx(it.Content,{ref:r,className:u("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...n}));fa.displayName=it.Content.displayName;const ga=i.forwardRef(({className:t,...n},r)=>e.jsx("textarea",{className:u("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...n}));ga.displayName="Textarea";const Jl=(t,n)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(n);return()=>{r()}},[t,n])};function Wl(t){return{preserveValue:!0,...t}}const ba=(t,n,r={})=>{const o=i.useRef(n);o.current=n;const a=i.useRef(r);a.current=Wl(a.current);const[s,l]=i.useState(()=>o.current),[w,p]=i.useState(!0);return i.useEffect(()=>{let c=!0;return p(!!t),(async()=>{if(t){const d=await t();c&&(l(()=>d),p(!1))}})(),()=>{c=!1,a.current.preserveValue||l(()=>o.current)}},[t]),[s,w]},Je=()=>!1,Zl=(t,n)=>{const[r]=ba(i.useCallback(async()=>{if(!t)return Je;const o=await Promise.resolve(t(n));return async()=>o()},[n,t]),Je,{preserveValue:!1});i.useEffect(()=>()=>{r!==Je&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>ir.toast});exports.Alert=Ko;exports.AlertDescription=qo;exports.AlertTitle=Xo;exports.Avatar=gn;exports.AvatarFallback=bn;exports.AvatarImage=Yr;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=gs;exports.BOOK_SELECTOR_STRING_KEYS=vs;exports.Badge=le;exports.BookChapterControl=fs;exports.BookSelectionMode=Er;exports.BookSelector=ys;exports.Button=P;exports.COMMENT_LIST_STRING_KEYS=Ns;exports.Card=hn;exports.CardContent=fn;exports.CardDescription=qr;exports.CardFooter=Ur;exports.CardHeader=Kr;exports.CardTitle=Xr;exports.ChapterRangeSelector=Sr;exports.Checkbox=Fe;exports.Checklist=Dl;exports.ComboBox=Me;exports.Command=Zt;exports.CommandEmpty=ke;exports.CommandGroup=Tt;exports.CommandInput=pe;exports.CommandItem=$t;exports.CommandList=Qt;exports.CommentList=ui;exports.ContextMenu=Al;exports.ContextMenuCheckboxItem=Zo;exports.ContextMenuContent=Jo;exports.ContextMenuGroup=$l;exports.ContextMenuItem=Wo;exports.ContextMenuLabel=ta;exports.ContextMenuPortal=zl;exports.ContextMenuRadioGroup=Bl;exports.ContextMenuRadioItem=Qo;exports.ContextMenuSeparator=ea;exports.ContextMenuShortcut=na;exports.ContextMenuSub=Fl;exports.ContextMenuSubContent=Yo;exports.ContextMenuSubTrigger=Uo;exports.ContextMenuTrigger=Pl;exports.DataTable=so;exports.Drawer=oa;exports.DrawerClose=Hl;exports.DrawerContent=sa;exports.DrawerDescription=ca;exports.DrawerFooter=la;exports.DrawerHeader=ia;exports.DrawerOverlay=Pn;exports.DrawerPortal=aa;exports.DrawerTitle=wa;exports.DrawerTrigger=Gl;exports.DropdownMenu=Ft;exports.DropdownMenuCheckboxItem=Et;exports.DropdownMenuContent=Mt;exports.DropdownMenuGroup=vn;exports.DropdownMenuItem=ye;exports.DropdownMenuItemType=wo;exports.DropdownMenuLabel=me;exports.DropdownMenuPortal=Jr;exports.DropdownMenuRadioGroup=Zr;exports.DropdownMenuRadioItem=jn;exports.DropdownMenuSeparator=re;exports.DropdownMenuShortcut=Qr;exports.DropdownMenuSub=Wr;exports.DropdownMenuSubContent=Nn;exports.DropdownMenuSubTrigger=yn;exports.DropdownMenuTrigger=ne;exports.ERROR_DUMP_STRING_KEYS=io;exports.ERROR_POPOVER_STRING_KEYS=yi;exports.ErrorDump=lo;exports.ErrorPopover=Ni;exports.FOOTNOTE_EDITOR_STRING_KEYS=Oi;exports.FOOTNOTE_LIST_STRING_KEYS=Ai;exports.Filter=Si;exports.FilterDropdown=ji;exports.Footer=Ci;exports.FootnoteEditor=Di;exports.FootnoteItem=uo;exports.FootnoteList=$i;exports.INVENTORY_STRING_KEYS=Yi;exports.Input=oe;exports.Inventory=Zi;exports.Label=tt;exports.MarkdownRenderer=vi;exports.MoreInfo=ki;exports.MultiSelectComboBox=co;exports.NavigationContentSearch=yl;exports.Popover=te;exports.PopoverAnchor=ds;exports.PopoverContent=zt;exports.PopoverTrigger=ee;exports.Progress=da;exports.RadioGroup=$e;exports.RadioGroupItem=ve;exports.RecentSearches=Cr;exports.ResizableHandle=ql;exports.ResizablePanel=Xl;exports.ResizablePanelGroup=Kl;exports.ResultsCard=Ol;exports.SCOPE_SELECTOR_STRING_KEYS=ul;exports.ScopeSelector=ml;exports.ScriptureResultsViewer=cl;exports.ScrollGroupSelector=hl;exports.SearchBar=Ge;exports.Select=Jt;exports.SelectContent=At;exports.SelectGroup=to;exports.SelectItem=wt;exports.SelectLabel=no;exports.SelectScrollDownButton=_n;exports.SelectScrollUpButton=kn;exports.SelectSeparator=ro;exports.SelectTrigger=Lt;exports.SelectValue=Wt;exports.Separator=Yt;exports.SettingsList=fl;exports.SettingsListHeader=bl;exports.SettingsListItem=gl;exports.SettingsSidebar=To;exports.SettingsSidebarContentSearch=nl;exports.Sidebar=En;exports.SidebarContent=Rn;exports.SidebarFooter=vo;exports.SidebarGroup=De;exports.SidebarGroupAction=No;exports.SidebarGroupContent=Ve;exports.SidebarGroupLabel=Oe;exports.SidebarHeader=xo;exports.SidebarInput=bo;exports.SidebarInset=Tn;exports.SidebarMenu=Mn;exports.SidebarMenuAction=jo;exports.SidebarMenuBadge=ko;exports.SidebarMenuButton=Dn;exports.SidebarMenuItem=In;exports.SidebarMenuSkeleton=_o;exports.SidebarMenuSub=Co;exports.SidebarMenuSubButton=Eo;exports.SidebarMenuSubItem=So;exports.SidebarProvider=Sn;exports.SidebarRail=go;exports.SidebarSeparator=yo;exports.SidebarTrigger=fo;exports.Skeleton=Ie;exports.Slider=pa;exports.Sonner=Ul;exports.Spinner=Ho;exports.Switch=ua;exports.TabDropdownMenu=Ae;exports.TabFloatingMenu=vl;exports.TabToolbar=xl;exports.Table=_e;exports.TableBody=Se;exports.TableCaption=ao;exports.TableCell=Vt;exports.TableFooter=oo;exports.TableHead=we;exports.TableHeader=Ce;exports.TableRow=yt;exports.Tabs=Yl;exports.TabsContent=fa;exports.TabsList=ma;exports.TabsTrigger=ha;exports.TextField=Vl;exports.Textarea=ga;exports.ToggleGroup=ze;exports.ToggleGroupItem=se;exports.Toolbar=Tl;exports.Tooltip=St;exports.TooltipContent=jt;exports.TooltipProvider=Nt;exports.TooltipTrigger=Ot;exports.UiLanguageSelector=Ml;exports.VerticalTabs=Vn;exports.VerticalTabsContent=An;exports.VerticalTabsList=Ln;exports.VerticalTabsTrigger=Vo;exports.badgeVariants=Hr;exports.buttonVariants=_r;exports.cn=u;exports.getBookIdFromUSFM=Ui;exports.getLinesFromUSFM=Xi;exports.getNumberFromUSFM=qi;exports.getStatusForItem=mo;exports.getToolbarOSReservedSpaceClassName=El;exports.inventoryCountColumn=Hi;exports.inventoryItemColumn=Bi;exports.inventoryStatusColumn=Ki;exports.selectTriggerVariants=eo;exports.useEvent=Jl;exports.useEventAsync=Zl;exports.useListbox=Tr;exports.usePromise=ba;exports.useRecentSearches=ps;exports.useSidebar=Ee;function Ql(t,n="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),n==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}Ql(`*, ::before, ::after {
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
