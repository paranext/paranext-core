"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),w=require("react"),Wt=require("cmdk"),se=require("lucide-react"),db=require("clsx"),pb=require("tailwind-merge"),fb=require("@radix-ui/react-dialog"),ne=require("platform-bible-utils"),ls=require("@radix-ui/react-slot"),Fr=require("class-variance-authority"),hb=require("@radix-ui/react-popover"),wb=require("@radix-ui/react-label"),mb=require("@radix-ui/react-radio-group"),g=require("lexical"),wf=require("@radix-ui/react-tooltip"),$l=require("@lexical/rich-text"),fn=require("react-dom"),mf=require("@lexical/table"),gb=require("@radix-ui/react-toggle-group"),bb=require("@radix-ui/react-toggle"),gf=require("@lexical/headless"),vb=require("@radix-ui/react-separator"),xb=require("@radix-ui/react-avatar"),bf=require("@radix-ui/react-dropdown-menu"),Ft=require("@tanstack/react-table"),yb=require("@radix-ui/react-select"),_b=require("markdown-to-jsx"),Cb=require("@radix-ui/react-checkbox"),Eb=require("@radix-ui/react-tabs"),kb=require("@radix-ui/react-menubar"),Nb=require("react-hotkeys-hook"),Tb=require("@radix-ui/react-context-menu"),Rn=require("vaul"),Sb=require("@radix-ui/react-progress"),Ab=require("react-resizable-panels"),vf=require("sonner"),Db=require("@radix-ui/react-slider"),Mb=require("@radix-ui/react-switch");function st(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const n in t)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:()=>t[n]})}}return e.default=t,Object.freeze(e)}const qo=st(w),Sn=st(fb),Ko=st(hb),xf=st(wb),$s=st(mb),ri=st(wf),Rb=st(fn),Ea=st(gb),yf=st(bb),_f=st(vb),cs=st(xb),Ge=st(bf),rt=st(yb),Fl=st(Cb),Jt=st(Eb),Ke=st(kb),Ye=st(Tb),Bl=st(Sb),kc=st(Ab),Rs=st(Db),ql=st(Mb),Ob=pb.extendTailwindMerge({prefix:"tw-"});function K(...t){return Ob(db.clsx(t))}const jb="layoutDirection";function Ct(){const t=localStorage.getItem(jb);return t==="rtl"?t:"ltr"}const Ib=Sn.Root,Lb=Sn.Portal,Cf=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Overlay,{ref:n,className:K("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Cf.displayName=Sn.Overlay.displayName;const Ef=w.forwardRef(({className:t,children:e,...n},r)=>{const o=Ct();return l.jsxs(Lb,{children:[l.jsx(Cf,{}),l.jsxs(Sn.Content,{ref:r,className:K("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...n,dir:o,children:[e,l.jsxs(Sn.Close,{className:K("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ef.displayName=Sn.Content.displayName;function kf({className:t,...e}){return l.jsx("div",{className:K("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}kf.displayName="DialogHeader";const Nf=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Title,{ref:n,className:K("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Nf.displayName=Sn.Title.displayName;const Pb=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Description,{ref:n,className:K("tw-text-sm tw-text-muted-foreground",t),...e}));Pb.displayName=Sn.Description.displayName;const _o=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command,{ref:n,className:K("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));_o.displayName=Wt.Command.displayName;const us=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[l.jsx(se.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),l.jsx(Wt.Command.Input,{ref:n,className:K("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});us.displayName=Wt.Command.Input.displayName;const Co=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.List,{ref:n,className:K("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Co.displayName=Wt.Command.List.displayName;const oi=w.forwardRef((t,e)=>l.jsx(Wt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));oi.displayName=Wt.Command.Empty.displayName;const ur=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Group,{ref:n,className:K("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));ur.displayName=Wt.Command.Group.displayName;const Tf=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Separator,{ref:n,className:K("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Tf.displayName=Wt.Command.Separator.displayName;const Br=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Item,{ref:n,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Br.displayName=Wt.Command.Item.displayName;var $b=Object.defineProperty,Fb=(t,e,n)=>e in t?$b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Te=(t,e,n)=>Fb(t,typeof e!="symbol"?e+"":e,n);const lo=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Nc=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Sf=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Yu=Wb();function ds(t,e=!0){return e&&(t=t.toUpperCase()),t in Yu?Yu[t]:0}function Tc(t){return ds(t)>0}function Bb(t){const e=typeof t=="string"?ds(t):t;return e>=40&&e<=66}function qb(t){return(typeof t=="string"?ds(t):t)<=39}function Af(t){return t<=66}function Ub(t){const e=typeof t=="string"?ds(t):t;return Rf(e)&&!Af(e)}function*Vb(){for(let t=1;t<=lo.length;t++)yield t}const Hb=1,Df=lo.length;function zb(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Sc(t,e="***"){const n=t-1;return n<0||n>=lo.length?e:lo[n]}function Mf(t){return t<=0||t>Df?"******":Sf[t-1]}function Gb(t){return Mf(ds(t))}function Rf(t){const e=typeof t=="number"?Sc(t):t;return Tc(e)&&!Nc.includes(e)}function Kb(t){const e=typeof t=="number"?Sc(t):t;return Tc(e)&&Nc.includes(e)}function Yb(t){return Sf[t-1].includes("*obsolete*")}function Wb(){const t={};for(let e=0;e<lo.length;e++)t[lo[e]]=e+1;return t}const Fe={allBookIds:lo,nonCanonicalIds:Nc,bookIdToNumber:ds,isBookIdValid:Tc,isBookNT:Bb,isBookOT:qb,isBookOTNT:Af,isBookDC:Ub,allBookNumbers:Vb,firstBook:Hb,lastBook:Df,extraBooks:zb,bookNumberToId:Sc,bookNumberToEnglishName:Mf,bookIdToEnglishName:Gb,isCanonical:Rf,isExtraMaterial:Kb,isObsolete:Yb};var Un=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Un||{});const an=class{constructor(e){if(Te(this,"name"),Te(this,"fullPath"),Te(this,"isPresent"),Te(this,"hasVerseSegments"),Te(this,"isCustomized"),Te(this,"baseVersification"),Te(this,"scriptureBooks"),Te(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=Un[e]):(this._type=e,this.name=Un[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};Te(an,"Original",new an(Un.Original)),Te(an,"Septuagint",new an(Un.Septuagint)),Te(an,"Vulgate",new an(Un.Vulgate)),Te(an,"English",new an(Un.English)),Te(an,"RussianProtestant",new an(Un.RussianProtestant)),Te(an,"RussianOrthodox",new an(Un.RussianOrthodox));let to=an;function Wu(t,e){const n=e[0];for(let r=1;r<e.length;r++)t=t.split(e[r]).join(n);return t.split(n)}var Of=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Of||{});const Gt=class Oe{constructor(e,n,r,o){if(Te(this,"firstChapter"),Te(this,"lastChapter"),Te(this,"lastVerse"),Te(this,"hasSegmentsDefined"),Te(this,"text"),Te(this,"BBBCCCVVVS"),Te(this,"longHashCode"),Te(this,"versification"),Te(this,"rtlMark","‏"),Te(this,"_bookNum",0),Te(this,"_chapterNum",0),Te(this,"_verseNum",0),Te(this,"_verse"),r==null&&o==null)if(e!=null&&typeof e=="string"){const s=e,i=n!=null&&n instanceof to?n:void 0;this.setEmpty(i),this.parse(s)}else if(e!=null&&typeof e=="number"){const s=n!=null&&n instanceof to?n:void 0;this.setEmpty(s),this._verseNum=e%Oe.chapterDigitShifter,this._chapterNum=Math.floor(e%Oe.bookDigitShifter/Oe.chapterDigitShifter),this._bookNum=Math.floor(e/Oe.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Oe){const s=e;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(e==null)return;const s=e instanceof to?e:Oe.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=o??Oe.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=new Oe(e),{success:!0,verseRef:n}}catch(r){if(r instanceof Ts)return n=new Oe,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%Oe.bcvMaxValue*Oe.bookDigitShifter+(n>=0?n%Oe.bcvMaxValue*Oe.chapterDigitShifter:0)+(r>=0?r%Oe.bcvMaxValue:0)}static fromJSON(e){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=e,a=s||o.toString();let c;return i&&(c=new to(i)),n?new Oe(n,r.toString(),a,c):new Oe}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<e.length;o++){if(r=e[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>Oe.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Oe.verseRangeSeparator)||this._verse.includes(Oe.verseSequenceIndicator))}get book(){return Fe.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Fe.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=Oe.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=Oe.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Fe.lastBook)throw new Ts("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new to(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Oe.verseRangeSeparators,Oe.verseSequenceIndicators)}get BBBCCC(){return Oe.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Oe.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const s=e.split("/");if(e=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new to(Un[i])}catch{throw new Ts("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new Ts("Invalid reference : "+e);const r=n[1].split(":"),o=+r[0];if(r.length!==2||Fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!Oe.isVerseParseable(r[1]))throw new Ts("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new Oe(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete n.verse,n}equals(e){return e instanceof Oe?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,n=Oe.verseRangeSeparators,r=Oe.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Wu(this._verse,r);for(const i of s.map(a=>Wu(a,n))){const a=this.clone();a.verse=i[0];const c=a.verseNum;if(o.push(a),i.length>1){const u=this.clone();if(u.verse=i[1],!e)for(let d=c+1;d<u.verseNum;d++){const p=new Oe(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(p)}o.push(u)}}return o}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,e,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Fe.lastBook?2:(Fe.isCanonical(this._bookNum),0)}setEmpty(e=Oe.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=Fe.bookIdToNumber(e),this.chapter=n,this.verse=r}};Te(Gt,"defaultVersification",to.English),Te(Gt,"verseRangeSeparator","-"),Te(Gt,"verseSequenceIndicator",","),Te(Gt,"verseRangeSeparators",[Gt.verseRangeSeparator]),Te(Gt,"verseSequenceIndicators",[Gt.verseSequenceIndicator]),Te(Gt,"chapterDigitShifter",1e3),Te(Gt,"bookDigitShifter",Gt.chapterDigitShifter*Gt.chapterDigitShifter),Te(Gt,"bcvMaxValue",Gt.chapterDigitShifter-1),Te(Gt,"ValidStatusType",Of);let Ts=class extends Error{};const jf=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"Old Testament";case ne.Section.NT:return n??"New Testament";case ne.Section.DC:return r??"Deuterocanon";case ne.Section.Extra:return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Jb=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"OT";case ne.Section.NT:return n??"NT";case ne.Section.DC:return r??"DC";case ne.Section.Extra:return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Uo(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedName)??Fe.bookIdToEnglishName(t)}function Ac(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedId)??t.toUpperCase()}const If=Fe.allBookIds.filter(t=>!Fe.isObsolete(Fe.bookIdToNumber(t))),so=Object.fromEntries(If.map(t=>[t,Fe.bookIdToEnglishName(t)]));function Dc(t,e,n){const r=e.trim().toLowerCase();if(!r)return!1;const o=Fe.bookIdToEnglishName(t),s=n==null?void 0:n.get(t);return!!(ne.includes(o.toLowerCase(),r)||ne.includes(t.toLowerCase(),r)||(s?ne.includes(s.localizedName.toLowerCase(),r)||ne.includes(s.localizedId.toLowerCase(),r):!1))}const Lf=w.forwardRef(({bookId:t,isSelected:e,onSelect:n,onMouseDown:r,section:o,className:s,showCheck:i=!1,localizedBookNames:a,commandValue:c},u)=>{const d=w.useRef(!1),p=()=>{d.current||n==null||n(t),setTimeout(()=>{d.current=!1},100)},f=x=>{d.current=!0,r?r(x):n==null||n(t)},h=w.useMemo(()=>Uo(t,a),[t,a]),b=w.useMemo(()=>Ac(t,a),[t,a]);return l.jsx("div",{className:K("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":o===ne.Section.OT,"tw-border-s-purple-200":o===ne.Section.NT,"tw-border-s-indigo-200":o===ne.Section.DC,"tw-border-s-amber-200":o===ne.Section.Extra}),children:l.jsxs(Br,{ref:u,value:c||`${t} ${Fe.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${Fe.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:s,children:[i&&l.jsx(se.Check,{className:K("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),l.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:h}),l.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),Pf=Fr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ge=w.forwardRef(({className:t,variant:e,size:n,asChild:r=!1,...o},s)=>{const i=r?ls.Slot:"button";return l.jsx(i,{className:K(Pf({variant:e,size:n,className:t})),ref:s,...o})});ge.displayName="Button";const Eo=Ko.Root,ko=Ko.Trigger,Xb=Ko.Anchor,qr=w.forwardRef(({className:t,align:e="center",sideOffset:n=4,...r},o)=>{const s=Ct();return l.jsx(Ko.Portal,{children:l.jsx(Ko.Content,{ref:o,align:e,sideOffset:n,className:K("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,dir:s})})});qr.displayName=Ko.Content.displayName;function Ul(t,e,n){return`${t} ${so[t]}${e?` ${Ac(t,e)} ${Uo(t,e)}`:""}${n?` ${n}`:""}`}function $f({recentSearches:t,onSearchItemSelect:e,renderItem:n=a=>String(a),getItemKey:r=a=>String(a),ariaLabel:o="Show recent searches",groupHeading:s="Recent",id:i}){const[a,c]=w.useState(!1);if(t.length===0)return;const u=d=>{e(d),c(!1)};return l.jsxs(Eo,{open:a,onOpenChange:c,children:[l.jsx(ko,{asChild:!0,children:l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":o,children:l.jsx(se.Clock,{className:"tw-h-4 tw-w-4"})})}),l.jsx(qr,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:l.jsx(_o,{children:l.jsx(Co,{children:l.jsx(ur,{heading:s,children:t.map(d=>l.jsxs(Br,{onSelect:()=>u(d),className:"tw-flex tw-items-center",children:[l.jsx(se.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),l.jsx("span",{children:n(d)})]},r(d)))})})})})]})}function Qb(t,e,n=(o,s)=>o===s,r=15){return o=>{const s=t.filter(a=>!n(a,o)),i=[o,...s.slice(0,r-1)];e(i)}}const dl={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Zb=[dl.BOOK_ONLY,dl.BOOK_CHAPTER,dl.BOOK_CHAPTER_VERSE];function Ju(t){const e=/^[a-zA-Z]$/.test(t),n=/^[0-9]$/.test(t);return{isLetter:e,isDigit:n}}function zn(t){return ne.getChaptersForBook(Fe.bookIdToNumber(t))}function e0(t,e,n){if(!t.trim()||e.length===0)return;const r=Zb.reduce((o,s)=>{if(o)return o;const i=s.exec(t.trim());if(i){const[a,c=void 0,u=void 0]=i.slice(1);let d;const p=e.filter(f=>Dc(f,a,n));if(p.length===1&&([d]=p),!d&&c){if(Fe.isBookIdValid(a)){const f=a.toUpperCase();e.includes(f)&&(d=f)}if(!d&&n){const f=Array.from(n.entries()).find(([,h])=>h.localizedId.toLowerCase()===a.toLowerCase());f&&e.includes(f[0])&&([d]=f)}}if(!d&&c){const h=(b=>Object.keys(so).find(x=>so[x].toLowerCase()===b.toLowerCase()))(a);if(h&&e.includes(h)&&(d=h),!d&&n){const b=Array.from(n.entries()).find(([,x])=>x.localizedName.toLowerCase()===a.toLowerCase());b&&e.includes(b[0])&&([d]=b)}}if(d){let f=c?parseInt(c,10):void 0;f&&f>zn(d)&&(f=Math.max(zn(d),1));const h=u?parseInt(u,10):void 0;return{book:d,chapterNum:f,verseNum:h}}}},void 0);if(r)return r}function t0(t,e,n,r){const o=w.useCallback(()=>{if(t.chapterNum>1)r({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const c=e.indexOf(t.book);if(c>0){const u=e[c-1],d=Math.max(zn(u),1);r({book:u,chapterNum:d,verseNum:1})}}},[t,e,r]),s=w.useCallback(()=>{const c=zn(t.book);if(t.chapterNum<c)r({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const u=e.indexOf(t.book);if(u<e.length-1){const d=e[u+1];r({book:d,chapterNum:1,verseNum:1})}}},[t,e,r]),i=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,r]),a=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,r]);return w.useMemo(()=>[{onClick:o,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:n==="ltr"?se.ChevronsLeft:se.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:n==="ltr"?se.ChevronLeft:se.ChevronRight},{onClick:a,disabled:e.length===0,title:"Next verse",icon:n==="ltr"?se.ChevronRight:se.ChevronLeft},{onClick:s,disabled:e.length===0||(t.chapterNum===zn(t.book)||zn(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:n==="ltr"?se.ChevronsRight:se.ChevronsLeft}],[t,e,n,o,i,a,s])}function Xu({bookId:t,scrRef:e,onChapterSelect:n,setChapterRef:r,isChapterDimmed:o,className:s}){if(t)return l.jsx(ur,{children:l.jsx("div",{className:K("tw-grid tw-grid-cols-6 tw-gap-1",s),children:Array.from({length:zn(t)},(i,a)=>a+1).map(i=>l.jsx(Br,{value:`${t} ${so[t]||""} ${i}`,onSelect:()=>n(i),ref:r(i),className:K("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(o==null?void 0:o(i))??!1}),children:i},i))})})}function n0({scrRef:t,handleSubmit:e,className:n,getActiveBookIds:r,localizedBookNames:o,localizedStrings:s,recentSearches:i,onAddRecentSearch:a,id:c}){const u=Ct(),[d,p]=w.useState(!1),[f,h]=w.useState(""),[b,x]=w.useState(""),[C,E]=w.useState("books"),[_,S]=w.useState(void 0),[j,P]=w.useState(!1),O=w.useRef(void 0),F=w.useRef(void 0),q=w.useRef(void 0),B=w.useRef(void 0),W=w.useRef({}),N=w.useCallback(oe=>{e(oe),a&&a(oe)},[e,a]),M=w.useMemo(()=>r?r():If,[r]),T=w.useMemo(()=>({[ne.Section.OT]:M.filter(be=>Fe.isBookOT(be)),[ne.Section.NT]:M.filter(be=>Fe.isBookNT(be)),[ne.Section.DC]:M.filter(be=>Fe.isBookDC(be)),[ne.Section.Extra]:M.filter(be=>Fe.extraBooks().includes(be))}),[M]),L=w.useMemo(()=>Object.values(T).flat(),[T]),A=w.useMemo(()=>{if(!b.trim())return T;const oe={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return[ne.Section.OT,ne.Section.NT,ne.Section.DC,ne.Section.Extra].forEach(Ne=>{oe[Ne]=T[Ne].filter(je=>Dc(je,b,o))}),oe},[T,b,o]),D=w.useMemo(()=>e0(b,L,o),[b,L,o]),$=w.useCallback(()=>{D&&(N({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),p(!1),x(""),h(""))},[N,D]),z=w.useCallback(oe=>{if(zn(oe)<=1){N({book:oe,chapterNum:1,verseNum:1}),p(!1),x("");return}S(oe),E("chapters")},[N]),U=w.useCallback(oe=>{const be=C==="chapters"?_:D==null?void 0:D.book;be&&(N({book:be,chapterNum:oe,verseNum:1}),p(!1),E("books"),S(void 0),x(""))},[N,C,_,D]),G=w.useCallback(oe=>{N(oe),p(!1),x("")},[N]),J=t0(t,L,u,e),ee=w.useCallback(()=>{E("books"),S(void 0),setTimeout(()=>{F.current&&F.current.focus()},0)},[]),te=w.useCallback(oe=>{if(!oe&&C==="chapters"){ee();return}p(oe),oe&&(E("books"),S(void 0),x(""))},[C,ee]),{otLong:Z,ntLong:X,dcLong:le,extraLong:ce}={otLong:s==null?void 0:s["%scripture_section_ot_long%"],ntLong:s==null?void 0:s["%scripture_section_nt_long%"],dcLong:s==null?void 0:s["%scripture_section_dc_long%"],extraLong:s==null?void 0:s["%scripture_section_extra_long%"]},ue=w.useCallback(oe=>jf(oe,Z,X,le,ce),[Z,X,le,ce]),me=w.useCallback(oe=>D?!!D.chapterNum&&!oe.toString().includes(D.chapterNum.toString()):!1,[D]),he=w.useMemo(()=>ne.formatScrRef(t,o?Uo(t.book,o):"English"),[t,o]),we=w.useCallback(oe=>be=>{W.current[oe]=be},[]),ie=w.useCallback(oe=>{(oe.key==="Home"||oe.key==="End")&&oe.stopPropagation()},[]),Ce=w.useCallback(oe=>{if(oe.ctrlKey)return;const{isLetter:be,isDigit:Ne}=Ju(oe.key);if(C==="chapters"){if(oe.key==="Backspace"){oe.preventDefault(),oe.stopPropagation(),ee();return}if(be||Ne){if(oe.preventDefault(),oe.stopPropagation(),E("books"),S(void 0),Ne&&_){const je=so[_];x(`${je} ${oe.key}`)}else x(oe.key);setTimeout(()=>{F.current&&F.current.focus()},0);return}}if((C==="chapters"||C==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(oe.key)){const je=C==="chapters"?_:D==null?void 0:D.book;if(!je)return;const qe=(()=>{if(!f)return 1;const Ee=f.match(/(\d+)$/);return Ee?parseInt(Ee[1],10):0})(),Ze=zn(je);if(!Ze)return;let Je=qe;const ot=6;switch(oe.key){case"ArrowLeft":qe!==0&&(Je=qe>1?qe-1:Ze);break;case"ArrowRight":qe!==0&&(Je=qe<Ze?qe+1:1);break;case"ArrowUp":Je=qe===0?Ze:Math.max(1,qe-ot);break;case"ArrowDown":Je=qe===0?1:Math.min(Ze,qe+ot);break;default:return}Je!==qe&&(oe.preventDefault(),oe.stopPropagation(),h(Ul(je,o,Je)),setTimeout(()=>{const Ee=W.current[Je];Ee&&Ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[C,D,ee,_,f,o]),Me=w.useCallback(oe=>{if(oe.shiftKey||oe.key==="Tab"||oe.key===" ")return;const{isLetter:be,isDigit:Ne}=Ju(oe.key);(be||Ne)&&(oe.preventDefault(),x(je=>je+oe.key),F.current.focus(),P(!1))},[]);return w.useLayoutEffect(()=>{const oe=setTimeout(()=>{if(d&&C==="books"&&q.current&&B.current){const be=q.current,Ne=B.current,je=Ne.offsetTop,qe=be.clientHeight,Ze=Ne.clientHeight,Je=je-qe/2+Ze/2;be.scrollTo({top:Math.max(0,Je),behavior:"smooth"}),h(Ul(t.book))}},0);return()=>{clearTimeout(oe)}},[d,C,b,D,t.book]),w.useLayoutEffect(()=>{if(C==="chapters"&&_){const oe=_===t.book;setTimeout(()=>{if(q.current)if(oe){const be=W.current[t.chapterNum];be&&be.scrollIntoView({block:"center",behavior:"smooth"})}else q.current.scrollTo({top:0});O.current&&O.current.focus()},0)}},[C,_,D,t.book,t.chapterNum]),l.jsxs(Eo,{open:d,onOpenChange:te,children:[l.jsx(ko,{asChild:!0,children:l.jsx(ge,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":d,className:K("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:l.jsx("span",{className:"tw-truncate",children:he})})}),l.jsx(qr,{id:c,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:l.jsxs(_o,{ref:O,onKeyDown:Ce,loop:!0,value:f,onValueChange:h,shouldFilter:!1,children:[C==="books"?l.jsxs("div",{className:"tw-flex tw-items-end",children:[l.jsxs("div",{className:"tw-relative tw-flex-1",children:[l.jsx(us,{ref:F,value:b,onValueChange:x,onKeyDown:ie,onFocus:()=>P(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&l.jsx($f,{recentSearches:i,onSearchItemSelect:G,renderItem:oe=>ne.formatScrRef(oe,"English"),getItemKey:oe=>`${oe.book}-${oe.chapterNum}-${oe.verseNum}`,ariaLabel:s==null?void 0:s["%history_recentSearches_ariaLabel%"],groupHeading:s==null?void 0:s["%history_recent%"]})]}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:J.map(({onClick:oe,disabled:be,title:Ne,icon:je})=>l.jsx(ge,{variant:"ghost",size:"sm",onClick:()=>{P(!0),oe()},disabled:be,className:"tw-h-10 tw-w-4 tw-p-0",title:Ne,onKeyDown:Me,children:l.jsx(je,{})},Ne))})]}):l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:ee,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:u==="ltr"?l.jsx(se.ArrowLeft,{className:"tw-h-4 tw-w-4"}):l.jsx(se.ArrowRight,{className:"tw-h-4 tw-w-4"})}),_&&l.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Uo(_,o)})]}),!j&&l.jsxs(Co,{ref:q,children:[C==="books"&&l.jsxs(l.Fragment,{children:[!D&&Object.entries(A).map(([oe,be])=>{if(be.length!==0)return l.jsx(ur,{heading:ue(oe),children:be.map(Ne=>l.jsx(Lf,{bookId:Ne,onSelect:je=>z(je),section:ne.getSectionForBook(Ne),commandValue:`${Ne} ${so[Ne]}`,ref:Ne===t.book?B:void 0,localizedBookNames:o},Ne))},oe)}),D&&l.jsx(ur,{children:l.jsx(Br,{value:`${D.book} ${so[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:$,className:"tw-font-semibold tw-text-primary",children:ne.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},o?Ac(D.book,o):void 0)},"top-match")}),D&&zn(D.book)>1&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Uo(D.book,o)}),l.jsx(Xu,{bookId:D.book,scrRef:t,onChapterSelect:U,setChapterRef:we,isChapterDimmed:me,className:"tw-px-4 tw-pb-4"})]})]}),C==="chapters"&&_&&l.jsx(Xu,{bookId:_,scrRef:t,onChapterSelect:U,setChapterRef:we,className:"tw-p-4"})]})]})})]})}const r0=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),o0=Fr.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ht=w.forwardRef(({className:t,...e},n)=>l.jsx(xf.Root,{ref:n,className:K("pr-twp",o0(),t),...e}));ht.displayName=xf.Root.displayName;const ka=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsx($s.Root,{className:K("pr-twp tw-grid tw-gap-2",t),...e,ref:n,dir:r})});ka.displayName=$s.Root.displayName;const Fs=w.forwardRef(({className:t,...e},n)=>l.jsx($s.Item,{ref:n,className:K("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:l.jsx($s.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:l.jsx(se.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Fs.displayName=$s.Item.displayName;function s0(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Qi({id:t,options:e=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:a=s0,getButtonLabel:c,icon:u=void 0,buttonPlaceholder:d="",textPlaceholder:p="",commandEmptyMessage:f="No option found",buttonVariant:h="outline",alignDropDown:b="start",isDisabled:x=!1,ariaLabel:C,...E}){const[_,S]=w.useState(!1),j=c??a,P=F=>F.length>0&&typeof F[0]=="object"&&"options"in F[0],O=(F,q)=>{const B=a(F),W=typeof F=="object"&&"secondaryLabel"in F?F.secondaryLabel:void 0,N=`${q??""}${B}${W??""}`;return l.jsxs(Br,{value:B,onSelect:()=>{i(F),S(!1)},className:"tw-flex tw-items-center",children:[l.jsx(se.Check,{className:K("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!s||a(s)!==B})}),l.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[B,W&&l.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",W]})]})]},N)};return l.jsxs(Eo,{open:_,onOpenChange:S,...E,children:[l.jsx(ko,{asChild:!0,children:l.jsxs(ge,{variant:h,role:"combobox","aria-expanded":_,"aria-label":C,id:t,className:K("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&l.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),l.jsx("span",{className:K("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:s?j(s):d})]}),l.jsx(se.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(qr,{align:b,className:K("tw-w-[200px] tw-p-0",o),children:l.jsxs(_o,{children:[l.jsx(us,{placeholder:p,className:"tw-text-inherit"}),l.jsx(oi,{children:f}),l.jsx(Co,{children:P(e)?e.map(F=>l.jsx(ur,{heading:F.groupHeading,children:F.options.map(q=>O(q,F.groupHeading))},F.groupHeading)):e.map(F=>O(F))})]})})]})}function Ff({startChapter:t,endChapter:e,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=w.useMemo(()=>Array.from({length:s},(u,d)=>d+1),[s]),a=u=>{n(u),u>e&&r(u)},c=u=>{r(u),u<t&&n(u)};return l.jsxs(l.Fragment,{children:[l.jsx(ht,{htmlFor:"start-chapters-combobox",children:"Chapters"}),l.jsx(Qi,{isDisabled:o,onChange:a,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:t},"start chapter"),l.jsx(ht,{htmlFor:"end-chapters-combobox",children:"to"}),l.jsx(Qi,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:e},"end chapter")]})}var Bf=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Bf||{});const i0=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),pl=(t,e)=>t[e]??e;function a0({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:a,handleSelectStartChapter:c,localizedStrings:u}){const d=pl(u,"%webView_bookSelector_currentBook%"),p=pl(u,"%webView_bookSelector_choose%"),f=pl(u,"%webView_bookSelector_chooseBooks%"),[h,b]=w.useState("current book"),x=C=>{b(C),t(C)};return l.jsx(ka,{className:"pr-twp tw-flex",value:h,onValueChange:C=>x(C),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Fs,{value:"current book"}),l.jsx(ht,{className:"tw-ms-1",children:d})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:e}),l.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:l.jsx(Ff,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:a,endChapter:s})})]}),l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Fs,{value:"choose books"}),l.jsx(ht,{className:"tw-ms-1",children:f})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:r.map(C=>Fe.bookIdToEnglishName(C)).join(", ")}),l.jsx(ge,{disabled:h==="current book",onClick:()=>n(),children:p})]})]})})}const l0=["%comment_assigned_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_editComment%","%comment_replyOrAssign%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],c0=["input","select","textarea","button"],u0=["button","textbox"],qf=({options:t,onFocusChange:e,onOptionSelect:n,onCharacterPress:r})=>{const o=w.useRef(null),[s,i]=w.useState(void 0),[a,c]=w.useState(void 0),u=w.useCallback(h=>{i(h);const b=t.find(C=>C.id===h);b&&(e==null||e(b));const x=document.getElementById(h);x&&(x.scrollIntoView({block:"center"}),x.focus()),o.current&&o.current.setAttribute("aria-activedescendant",h)},[e,t]),d=w.useCallback(h=>{const b=t.find(x=>x.id===h);b&&(c(x=>x===h?void 0:h),n==null||n(b))},[n,t]),p=h=>{if(!h)return!1;const b=h.tagName.toLowerCase();if(h.isContentEditable||c0.includes(b))return!0;const x=h.getAttribute("role");if(x&&u0.includes(x))return!0;const C=h.getAttribute("tabindex");return C!==void 0&&C!=="-1"},f=w.useCallback(h=>{var F;const b=h.target,x=q=>q?document.getElementById(q):void 0,C=x(a),E=x(s);if(!!(C&&b&&C.contains(b)&&b!==C)&&p(b)){if(h.key==="Escape"||h.key==="ArrowLeft"&&!b.isContentEditable){if(a){h.preventDefault(),h.stopPropagation();const q=t.find(B=>B.id===a);q&&u(q.id)}return}if(h.key==="ArrowDown"||h.key==="ArrowUp"){if(!C)return;const q=Array.from(C.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(q.length===0)return;const B=q.findIndex(N=>N===b);if(B===-1)return;let W;h.key==="ArrowDown"?W=Math.min(B+1,q.length-1):W=Math.max(B-1,0),W!==B&&(h.preventDefault(),h.stopPropagation(),(F=q[W])==null||F.focus());return}return}const j=t.findIndex(q=>q.id===s);let P=j;switch(h.key){case"ArrowDown":P=Math.min(j+1,t.length-1),h.preventDefault();break;case"ArrowUp":P=Math.max(j-1,0),h.preventDefault();break;case"Home":P=0,h.preventDefault();break;case"End":P=t.length-1,h.preventDefault();break;case" ":case"Enter":s&&d(s),h.preventDefault(),h.stopPropagation();return;case"ArrowRight":{const q=E;if(q){const B=q.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),W=q.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),N=B??W;if(N){h.preventDefault(),N.focus();return}}break}default:h.key.length===1&&!h.metaKey&&!h.ctrlKey&&!h.altKey&&(p(b)||(r==null||r(h.key),h.preventDefault()));return}const O=t[P];O&&u(O.id)},[t,u,s,a,d,r]);return{listboxRef:o,activeId:s,selectedId:a,handleKeyDown:f,focusOption:u}},Uf=w.createContext(null);function d0(t,e){return{getTheme:function(){return e??null}}}function ye(){const t=w.useContext(Uf);return t==null&&function(e,...n){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of n)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Vf=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,p0=Vf?w.useLayoutEffect:w.useEffect,Di={tag:g.HISTORY_MERGE_TAG};function Mc({initialConfig:t,children:e}){const n=w.useMemo(()=>{const{theme:r,namespace:o,nodes:s,onError:i,editorState:a,html:c}=t,u=d0(null,r),d=g.createEditor({editable:t.editable,html:c,namespace:o,nodes:s,onError:p=>i(p,d),theme:r});return function(p,f){if(f!==null){if(f===void 0)p.update(()=>{const h=g.$getRoot();if(h.isEmpty()){const b=g.$createParagraphNode();h.append(b);const x=Vf?document.activeElement:null;(g.$getSelection()!==null||x!==null&&x===p.getRootElement())&&b.select()}},Di);else if(f!==null)switch(typeof f){case"string":{const h=p.parseEditorState(f);p.setEditorState(h,Di);break}case"object":p.setEditorState(f,Di);break;case"function":p.update(()=>{g.$getRoot().isEmpty()&&f(p)},Di)}}}(d,a),[d,u]},[]);return p0(()=>{const r=t.editable,[o]=n;o.setEditable(r===void 0||r)},[]),l.jsx(Uf.Provider,{value:n,children:e})}const f0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function Hf({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=ye();return f0(()=>{if(n)return r.registerUpdateListener(({editorState:o,dirtyElements:s,dirtyLeaves:i,prevEditorState:a,tags:c})=>{e&&s.size===0&&i.size===0||t&&c.has(g.HISTORY_MERGE_TAG)||a.isEmpty()||n(o,r,c)})},[r,t,e,n]),null}const Rc={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Kn=ri.Provider,lr=ri.Root,Ar=ri.Trigger,Yn=w.forwardRef(({className:t,sideOffset:e=4,...n},r)=>l.jsx(ri.Content,{ref:r,sideOffset:e,className:K("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Yn.displayName=ri.Content.displayName;const Oc=[$l.HeadingNode,g.ParagraphNode,g.TextNode,$l.QuoteNode];function Vl(t,e){return Vl=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},Vl(t,e)}var Qu={error:null},h0=function(t){var e,n;function r(){for(var s,i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];return(s=t.call.apply(t,[this].concat(a))||this).state=Qu,s.resetErrorBoundary=function(){for(var u,d=arguments.length,p=new Array(d),f=0;f<d;f++)p[f]=arguments[f];s.props.onReset==null||(u=s.props).onReset.apply(u,p),s.reset()},s}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,Vl(e,n),r.getDerivedStateFromError=function(s){return{error:s}};var o=r.prototype;return o.reset=function(){this.setState(Qu)},o.componentDidCatch=function(s,i){var a,c;(a=(c=this.props).onError)==null||a.call(c,s,i)},o.componentDidUpdate=function(s,i){var a,c,u,d,p=this.state.error,f=this.props.resetKeys;p!==null&&i.error!==null&&((u=s.resetKeys)===void 0&&(u=[]),(d=f)===void 0&&(d=[]),u.length!==d.length||u.some(function(h,b){return!Object.is(h,d[b])}))&&((a=(c=this.props).onResetKeysChange)==null||a.call(c,s.resetKeys,f),this.reset())},o.render=function(){var s=this.state.error,i=this.props,a=i.fallbackRender,c=i.FallbackComponent,u=i.fallback;if(s!==null){var d={error:s,resetErrorBoundary:this.resetErrorBoundary};if(qo.isValidElement(u))return u;if(typeof a=="function")return a(d);if(c)return qo.createElement(c,d);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},r}(qo.Component);function jc({children:t,onError:e}){return l.jsx(h0,{fallback:l.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const w0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function m0(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function zf(){return function(t){const[e]=ye(),n=w.useMemo(()=>t(e),[e,t]),[r,o]=w.useState(()=>n.initialValueFn()),s=w.useRef(r);return w0(()=>{const{initialValueFn:i,subscribe:a}=n,c=i();return s.current!==c&&(s.current=c,o(c)),a(u=>{s.current=u,o(u)})},[n,t]),r}(m0)}function Gf(){return g.$getRoot().getTextContent()}function Kf(t,e=!0){if(t)return!1;let n=Gf();return e&&(n=n.trim()),n===""}function g0(t){if(!Kf(t,!1))return!1;const e=g.$getRoot().getChildren(),n=e.length;if(n>1)return!1;for(let r=0;r<n;r++){const o=e[r];if(g.$isDecoratorNode(o))return!1;if(g.$isElementNode(o)){if(!g.$isParagraphNode(o)||o.__indent!==0)return!1;const s=o.getChildren(),i=s.length;for(let a=0;a<i;a++){const c=s[r];if(!g.$isTextNode(c))return!1}}}return!0}function Ic(t){return()=>g0(t)}function Zu(t){let e=t;for(;e!=null;){if(e.nodeType===Node.TEXT_NODE)return e;e=e.firstChild}return null}function ed(t){const e=t.parentNode;if(e==null)throw new Error("Should never happen");return[e,Array.from(e.childNodes).indexOf(t)]}function b0(t,e,n,r,o){const s=e.getKey(),i=r.getKey(),a=document.createRange();let c=t.getElementByKey(s),u=t.getElementByKey(i),d=n,p=o;if(g.$isTextNode(e)&&(c=Zu(c)),g.$isTextNode(r)&&(u=Zu(u)),e===void 0||r===void 0||c===null||u===null)return null;c.nodeName==="BR"&&([c,d]=ed(c)),u.nodeName==="BR"&&([u,p]=ed(u));const f=c.firstChild;c===u&&f!=null&&f.nodeName==="BR"&&d===0&&p===0&&(p=1);try{a.setStart(c,d),a.setEnd(u,p)}catch{return null}return!a.collapsed||d===p&&s===i||(a.setStart(u,p),a.setEnd(c,d)),a}function v0(t,e){const n=t.getRootElement();if(n===null)return[];const r=n.getBoundingClientRect(),o=getComputedStyle(n),s=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),i=Array.from(e.getClientRects());let a,c=i.length;i.sort((u,d)=>{const p=u.top-d.top;return Math.abs(p)<=3?u.left-d.left:p});for(let u=0;u<c;u++){const d=i[u],p=a&&a.top<=d.top&&a.top+a.height>d.top&&a.left+a.width>d.left,f=d.width+s===r.width;p||f?(i.splice(u--,1),c--):a=d}return i}function x0(t,e){const n=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&n!==null){const[r,o]=n,s=t.isBackward(),i=r.getNode(),a=o.getNode(),c=e.is(i),u=e.is(a);if(c||u){const[d,p]=g.$getCharacterOffsets(t),f=i.is(a),h=e.is(s?a:i),b=e.is(s?i:a);let x,C=0;f?(C=d>p?p:d,x=d>p?d:p):h?(C=s?p:d,x=void 0):b&&(C=0,x=s?d:p),e.__text=e.__text.slice(C,x)}}return e}function y0(t,e){const n=t.getFormatType(),r=t.getIndent();n!==e.getFormatType()&&e.setFormat(n),r!==e.getIndent()&&e.setIndent(r)}function _0(t,e,n=y0){if(t===null)return;const r=t.getStartEndPoints(),o=new Map;let s=null;if(r){const[i,a]=r;s=g.$createRangeSelection(),s.anchor.set(i.key,i.offset,i.type),s.focus.set(a.key,a.offset,a.type);const c=fl(i.getNode(),g.INTERNAL_$isBlock),u=fl(a.getNode(),g.INTERNAL_$isBlock);g.$isElementNode(c)&&o.set(c.getKey(),c),g.$isElementNode(u)&&o.set(u.getKey(),u)}for(const i of t.getNodes())if(g.$isElementNode(i)&&g.INTERNAL_$isBlock(i))o.set(i.getKey(),i);else if(r===null){const a=fl(i,g.INTERNAL_$isBlock);g.$isElementNode(a)&&o.set(a.getKey(),a)}for(const[i,a]of o){const c=e();n(a,c),a.replace(c,!0),s&&(i===s.anchor.key&&s.anchor.set(c.getKey(),s.anchor.offset,s.anchor.type),i===s.focus.key&&s.focus.set(c.getKey(),s.focus.offset,s.focus.type))}s&&t.is(g.$getSelection())&&g.$setSelection(s)}function Yf(t){const e=t.anchor.getNode(),n=g.$isRootNode(e)?e:e.getParentOrThrow(),r=g.$getEditor().getElementByKey(n.getKey());if(r===null)return!1;const o=r.ownerDocument.defaultView;return o===null?!1:o.getComputedStyle(r).writingMode==="vertical-rl"}function td(t,e){let n=Yf(t)?!e:e;Wf(t)&&(n=!n);const r=g.$caretFromPoint(t.focus,n?"previous":"next");if(g.$isExtendableTextPointCaret(r))return!1;for(const o of g.$extendCaretToRange(r)){if(g.$isChildCaret(o))return!o.origin.isInline();if(!g.$isElementNode(o.origin)){if(g.$isDecoratorNode(o.origin))return!0;break}}return!1}function C0(t,e,n,r){t.modify(e?"extend":"move",n,r)}function Wf(t){const e=t.anchor.getNode();return(g.$isRootNode(e)?e:e.getParentOrThrow()).getDirection()==="rtl"}function nd(t,e,n){const r=Wf(t);let o;o=Yf(t)||r?!n:n,C0(t,e,o,"character")}function fl(t,e){let n=t;for(;n!==null&&n.getParent()!==null&&!e(n);)n=n.getParentOrThrow();return e(n)?n:null}const si=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,E0=si&&"documentMode"in document?document.documentMode:null,k0=si&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),N0=si&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);!(!si||!("InputEvent"in window)||E0)&&"getTargetRanges"in new window.InputEvent("input");function Jf(...t){const e=[];for(const n of t)if(n&&typeof n=="string")for(const[r]of n.matchAll(/\S+/g))e.push(r);return e}function vt(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}const T0=si,Hl=k0,S0=N0;function kr(t,...e){const n=Jf(...e);n.length>0&&t.classList.add(...n)}function zl(t,...e){const n=Jf(...e);n.length>0&&t.classList.remove(...n)}function ii(t,e){return Array.from(A0(t))}function A0(t,e){return D0("next",t)}function D0(t,e,n){const r=g.$getRoot(),o=e||r,s=g.$isElementNode(o)?g.$getChildCaret(o,t):g.$getSiblingCaret(o,t),i=M0(o),a=function(u,d){const p=od(g.$getSiblingCaret(u,d));return p&&p[0]}(o,t);let c=i;return g.makeStepwiseIterator({hasNext:u=>u!==null,initial:s,map:u=>({depth:c,node:u.origin}),step:u=>{if(u.isSameNodeCaret(a))return null;g.$isChildCaret(u)&&c++;const d=od(u);return!d||d[0].isSameNodeCaret(a)?null:(c+=d[1],d[0])}})}function M0(t){let e=-1;for(let n=t;n!==null;n=n.getParent())e++;return e}const Bs=(t,e)=>{let n=t;for(;n!==g.$getRoot()&&n!=null;){if(e(n))return n;n=n.getParent()}return null};function Xf(t,e,n,r){const o=s=>s instanceof e;return t.registerNodeTransform(e,s=>{const i=(a=>{const c=a.getChildren();for(let p=0;p<c.length;p++){const f=c[p];if(o(f))return null}let u=a,d=a;for(;u!==null;)if(d=u,u=u.getParent(),o(u))return{child:d,parent:u};return null})(s);if(i!==null){const{child:a,parent:c}=i;if(a.is(s)){r(c,s);const u=a.getNextSiblings(),d=u.length;if(c.insertAfter(a),d!==0){const p=n(c);a.insertAfter(p);for(let f=0;f<d;f++)p.append(u[f])}c.canBeEmpty()||c.getChildrenSize()!==0||c.remove()}}})}function Qf(t,e){return t!==null&&Object.getPrototypeOf(t).constructor.name===e.name}let hl=!(S0||!T0)&&void 0;function R0(t){let e=1;if(function(){if(hl===void 0){const n=document.createElement("div");n.style.cssText="position: absolute; opacity: 0; width: 100px; left: -1000px;",document.body.appendChild(n);const r=n.getBoundingClientRect();n.style.setProperty("zoom","2"),hl=n.getBoundingClientRect().width===r.width,document.body.removeChild(n)}return hl}())for(;t;)e*=Number(window.getComputedStyle(t).getPropertyValue("zoom")),t=t.parentElement;return e}function rd(t){g.$rewindSiblingCaret(g.$getSiblingCaret(t,"next")).splice(1,t.getChildren())}function od(t,e="root"){let n=0,r=t,o=g.$getAdjacentChildCaret(r);for(;o===null;){if(n--,o=r.getParentCaret(e),!o)return null;r=o,o=g.$getAdjacentChildCaret(r)}return o&&[o,n]}function Zf(t){const e=window.location.origin,n=r=>{if(r.origin!==e)return;const o=t.getRootElement();if(document.activeElement!==o)return;const s=r.data;if(typeof s=="string"){let i;try{i=JSON.parse(s)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const a=i.payload;if(a&&a.functionId==="makeChanges"){const c=a.args;if(c){const[u,d,p,f,h,b]=c;t.update(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){const C=x.anchor;let E=C.getNode(),_=0,S=0;if(g.$isTextNode(E)&&u>=0&&d>=0&&(_=u,S=u+d,x.setTextNodeRange(E,_,E,S)),_===S&&p===""||(x.insertRawText(p),E=C.getNode()),g.$isTextNode(E)){_=f,S=f+h;const j=E.getTextContentSize();_=_>j?j:_,S=S>j?j:S,x.setTextNodeRange(E,_,E,S)}r.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}const Gl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function sd(t){return t.getEditorState().read(Ic(t.isComposing()))}function eh({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=ye(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return Gl(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=s.getElementByKey(f);b!==null&&u.push(fn.createPortal(h,b,f))}return u},[i,a,s])}(r,n);return function(s){Gl(()=>vt($l.registerRichText(s),Zf(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(O0,{content:e}),o]})}function O0({content:t}){const[e]=ye(),n=function(o){const[s,i]=w.useState(()=>sd(o));return Gl(()=>{function a(){const c=sd(o);i(c)}return a(),vt(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=zf();return n?typeof t=="function"?t(r):t:null}function th({defaultSelection:t}){const[e]=ye();return w.useEffect(()=>{e.focus(()=>{const n=document.activeElement,r=e.getRootElement();r===null||n!==null&&r.contains(n)||r.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const j0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function nh({onClear:t}){const[e]=ye();return j0(()=>e.registerCommand(g.CLEAR_EDITOR_COMMAND,n=>(e.update(()=>{if(t==null){const r=g.$getRoot(),o=g.$getSelection(),s=g.$createParagraphNode();r.clear(),r.append(s),o!==null&&s.select(),g.$isRangeSelection(o)&&(o.format=0)}else t()}),!0),g.COMMAND_PRIORITY_EDITOR),[e,t]),null}const rh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function I0({editor:t,ariaActiveDescendant:e,ariaAutoComplete:n,ariaControls:r,ariaDescribedBy:o,ariaErrorMessage:s,ariaExpanded:i,ariaInvalid:a,ariaLabel:c,ariaLabelledBy:u,ariaMultiline:d,ariaOwns:p,ariaRequired:f,autoCapitalize:h,className:b,id:x,role:C="textbox",spellCheck:E=!0,style:_,tabIndex:S,"data-testid":j,...P},O){const[F,q]=w.useState(t.isEditable()),B=w.useCallback(N=>{N&&N.ownerDocument&&N.ownerDocument.defaultView?t.setRootElement(N):t.setRootElement(null)},[t]),W=w.useMemo(()=>function(...N){return M=>{N.forEach(T=>{typeof T=="function"?T(M):T!=null&&(T.current=M)})}}(O,B),[B,O]);return rh(()=>(q(t.isEditable()),t.registerEditableListener(N=>{q(N)})),[t]),l.jsx("div",{"aria-activedescendant":F?e:void 0,"aria-autocomplete":F?n:"none","aria-controls":F?r:void 0,"aria-describedby":o,...s!=null?{"aria-errormessage":s}:{},"aria-expanded":F&&C==="combobox"?!!i:void 0,...a!=null?{"aria-invalid":a}:{},"aria-label":c,"aria-labelledby":u,"aria-multiline":d,"aria-owns":F?p:void 0,"aria-readonly":!F||void 0,"aria-required":f,autoCapitalize:h,className:b,contentEditable:F,"data-testid":j,id:x,ref:W,role:C,spellCheck:E,style:_,tabIndex:S,...P})}const L0=w.forwardRef(I0);function id(t){return t.getEditorState().read(Ic(t.isComposing()))}const Lc=w.forwardRef(P0);function P0(t,e){const{placeholder:n,...r}=t,[o]=ye();return l.jsxs(l.Fragment,{children:[l.jsx(L0,{editor:o,...r,ref:e}),n!=null&&l.jsx($0,{editor:o,content:n})]})}function $0({content:t,editor:e}){const n=function(i){const[a,c]=w.useState(()=>id(i));return rh(()=>{function u(){const d=id(i);c(d)}return u(),vt(i.registerUpdateListener(()=>{u()}),i.registerEditableListener(()=>{u()}))},[i]),a}(e),[r,o]=w.useState(e.isEditable());if(w.useLayoutEffect(()=>(o(e.isEditable()),e.registerEditableListener(i=>{o(i)})),[e]),!n)return null;let s=null;return typeof t=="function"?s=t(r):t!==null&&(s=t),s===null?null:l.jsx("div",{"aria-hidden":!0,children:s})}function F0({placeholder:t,className:e,placeholderClassName:n}){return l.jsx(Lc,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:l.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const oh=w.createContext(void 0);function B0({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o,children:s}){const i=w.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o}),[t,e,n,r,o]);return l.jsx(oh.Provider,{value:i,children:s})}function sh(){const t=w.useContext(oh);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function q0(){const[t,e]=w.useState(void 0),n=w.useCallback(()=>{e(void 0)},[]),r=w.useMemo(()=>{if(t===void 0)return;const{title:s,content:i}=t;return l.jsx(Ib,{open:!0,onOpenChange:n,children:l.jsxs(Ef,{children:[l.jsx(kf,{children:l.jsx(Nf,{children:s})}),i]})})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}function U0({children:t}){const[e]=ye(),[n,r]=w.useState(e),[o,s]=w.useState("paragraph"),[i,a]=q0(),c=()=>{};return w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,(u,d)=>(r(d),!1),g.COMMAND_PRIORITY_CRITICAL),[n]),l.jsxs(B0,{activeEditor:n,$updateToolbar:c,blockType:o,setBlockType:s,showModal:a,children:[i,t({blockType:o})]})}function V0(t){const[e]=ye(),{activeEditor:n}=sh();w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const r=g.$getSelection();return r&&t(r),!1},g.COMMAND_PRIORITY_CRITICAL),[e,t]),w.useEffect(()=>{n.getEditorState().read(()=>{const r=g.$getSelection();r&&t(r)})},[n,t])}const ih=Fr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),H0=w.forwardRef(({className:t,variant:e,size:n,...r},o)=>l.jsx(yf.Root,{ref:o,className:K(ih({variant:e,size:n,className:t})),...r}));H0.displayName=yf.Root.displayName;const ah=w.createContext({size:"default",variant:"default"}),Na=w.forwardRef(({className:t,variant:e,size:n,children:r,...o},s)=>{const i=Ct();return l.jsx(Ea.Root,{ref:s,className:K("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:i,children:l.jsx(ah.Provider,{value:{variant:e,size:n},children:r})})});Na.displayName=Ea.Root.displayName;const Vo=w.forwardRef(({className:t,children:e,variant:n,size:r,...o},s)=>{const i=w.useContext(ah);return l.jsx(Ea.Item,{ref:s,className:K(ih({variant:i.variant||n,size:i.size||r}),t),...o,children:e})});Vo.displayName=Ea.Item.displayName;const ad=[{format:"bold",icon:se.BoldIcon,label:"Bold"},{format:"italic",icon:se.ItalicIcon,label:"Italic"},{format:"underline",icon:se.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:se.StrikethroughIcon,label:"Strikethrough"}];function z0(){const{activeEditor:t}=sh(),[e,n]=w.useState([]),r=w.useCallback(o=>{if(g.$isRangeSelection(o)||mf.$isTableSelection(o)){const s=[];ad.forEach(({format:i})=>{o.hasFormat(i)&&s.push(i)}),n(i=>i.length!==s.length||!s.every(a=>i.includes(a))?s:i)}},[]);return V0(r),l.jsx(Na,{type:"multiple",value:e,onValueChange:n,variant:"outline",size:"sm",children:ad.map(({format:o,icon:s,label:i})=>l.jsx(Vo,{value:o,"aria-label":i,onClick:()=>{t.dispatchCommand(g.FORMAT_TEXT_COMMAND,o)},children:l.jsx(s,{className:"tw-h-4 tw-w-4"})},o))})}function G0({onClear:t}){const[e]=ye();w.useEffect(()=>{t&&t(()=>{e.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function K0({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:n}){const[,r]=w.useState(void 0),o=s=>{s!==void 0&&r(s)};return l.jsxs("div",{className:"tw-relative",children:[l.jsx(U0,{children:()=>l.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:l.jsx(z0,{})})}),l.jsxs("div",{className:"tw-relative",children:[l.jsx(eh,{contentEditable:l.jsx("div",{ref:o,children:l.jsx(F0,{placeholder:t})}),ErrorBoundary:jc}),e&&l.jsx(th,{defaultSelection:"rootEnd"}),l.jsx(G0,{onClear:n}),l.jsx(nh,{})]})]})}const Y0={namespace:"commentEditor",theme:Rc,nodes:Oc,onError:t=>{console.error(t)}};function Kl({editorState:t,editorSerializedState:e,onChange:n,onSerializedChange:r,placeholder:o="Start typing…",autoFocus:s=!1,onClear:i}){return l.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:l.jsx(Mc,{initialConfig:{...Y0,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:l.jsxs(Kn,{children:[l.jsx(K0,{placeholder:o,autoFocus:s,onClear:i}),l.jsx(Hf,{ignoreSelectionChange:!0,onChange:a=>{n==null||n(a),r==null||r(a.toJSON())}})]})})})}function W0(t,e){const n=e.body?e.body.childNodes:[];let r=[];const o=[];for(let s=0;s<n.length;s++){const i=n[s];if(!ch.has(i.nodeName)){const a=uh(i,t,o,!1);a!==null&&(r=r.concat(a))}}return function(s){for(const i of s)i.getNextSibling()instanceof g.ArtificialNode__DO_NOT_USE&&i.insertAfter(g.$createLineBreakNode());for(const i of s){const a=i.getChildren();for(const c of a)i.insertBefore(c);i.remove()}}(o),r}function Pc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),r=g.$getRoot().getChildren();for(let o=0;o<r.length;o++)lh(t,r[o],n,e);return n.innerHTML}function lh(t,e,n,r=null){let o=r===null||e.isSelected(r);const s=g.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;if(r!==null){let h=g.$cloneWithProperties(e);h=g.$isTextNode(h)&&r!==null?x0(r,h):h,i=h}const a=g.$isElementNode(i)?i.getChildren():[],c=g.getRegisteredNode(t,i.getType());let u;u=c&&c.exportDOM!==void 0?c.exportDOM(t,i):i.exportDOM(t);const{element:d,after:p}=u;if(!d)return!1;const f=document.createDocumentFragment();for(let h=0;h<a.length;h++){const b=a[h],x=lh(t,b,f,r);!o&&g.$isElementNode(e)&&x&&e.extractWithChild(b,r,"html")&&(o=!0)}if(o&&!s){if((g.isHTMLElement(d)||g.isDocumentFragment(d))&&d.append(f),n.append(d),p){const h=p.call(i,d);h&&(g.isDocumentFragment(d)?d.replaceChildren(h):d.replaceWith(h))}}else n.append(f);return o}const ch=new Set(["STYLE","SCRIPT"]);function uh(t,e,n,r,o=new Map,s){let i=[];if(ch.has(t.nodeName))return i;let a=null;const c=function(b,x){const{nodeName:C}=b,E=x._htmlConversions.get(C.toLowerCase());let _=null;if(E!==void 0)for(const S of E){const j=S(b);j!==null&&(_===null||(_.priority||0)<=(j.priority||0))&&(_=j)}return _!==null?_.conversion:null}(t,e),u=c?c(t):null;let d=null;if(u!==null){d=u.after;const b=u.node;if(a=Array.isArray(b)?b[b.length-1]:b,a!==null){for(const[,x]of o)if(a=x(a,s),!a)break;a&&i.push(...Array.isArray(b)?b:[a])}u.forChild!=null&&o.set(t.nodeName,u.forChild)}const p=t.childNodes;let f=[];const h=(a==null||!g.$isRootOrShadowRoot(a))&&(a!=null&&g.$isBlockElementNode(a)||r);for(let b=0;b<p.length;b++)f.push(...uh(p[b],e,n,h,new Map(o),a));return d!=null&&(f=d(f)),g.isBlockDomNode(t)&&(f=J0(t,f,h?()=>{const b=new g.ArtificialNode__DO_NOT_USE;return n.push(b),b}:g.$createParagraphNode)),a==null?f.length>0?i=i.concat(f):g.isBlockDomNode(t)&&function(b){return b.nextSibling==null||b.previousSibling==null?!1:g.isInlineDomNode(b.nextSibling)&&g.isInlineDomNode(b.previousSibling)}(t)&&(i=i.concat(g.$createLineBreakNode())):g.$isElementNode(a)&&a.append(...f),i}function J0(t,e,n){const r=t.style.textAlign,o=[];let s=[];for(let i=0;i<e.length;i++){const a=e[i];if(g.$isBlockElementNode(a))r&&!a.getFormat()&&a.setFormat(r),o.push(a);else if(s.push(a),i===e.length-1||i<e.length-1&&g.$isBlockElementNode(e[i+1])){const c=n();c.setFormat(r),c.append(...s),o.push(c),s=[]}}return o}function X0(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const n=window.getSelection(),r=document.createRange();return r.selectNodeContents(e),r.collapse(!1),n==null||n.removeAllRanges(),n==null||n.addRange(r),!0}function ro(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?t.root.children.some(n=>n!=null&&n.children?n.children.some(r=>(r==null?void 0:r.text)&&r.text.trim().length>0):!1):!1}function Q0(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),n=gf.createHeadlessEditor({namespace:"EditorUtils",theme:Rc,nodes:Oc,onError:o=>{console.error(o)}});let r;if(n.update(()=>{const s=new DOMParser().parseFromString(e,"text/html"),i=W0(n,s);g.$getRoot().clear(),g.$insertNodes(i)},{discrete:!0}),n.getEditorState().read(()=>{r=n.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function dh(t){const e=gf.createHeadlessEditor({namespace:"EditorUtils",theme:Rc,nodes:Oc,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r="";return e.getEditorState().read(()=>{r=Pc(e)}),r=r.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>"),r}function ph(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const fh=Fr.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Yo=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,className:K("pr-twp",fh({variant:e}),t),...n}));Yo.displayName="Badge";const Ta=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Ta.displayName="Card";const hh=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));hh.displayName="CardHeader";const wh=w.forwardRef(({className:t,...e},n)=>l.jsx("h3",{ref:n,className:K("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));wh.displayName="CardTitle";const mh=w.forwardRef(({className:t,...e},n)=>l.jsx("p",{ref:n,className:K("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));mh.displayName="CardDescription";const $c=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-p-6 tw-pt-0",t),...e}));$c.displayName="CardContent";const gh=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));gh.displayName="CardFooter";const co=w.forwardRef(({className:t,orientation:e="horizontal",decorative:n=!0,...r},o)=>l.jsx(_f.Root,{ref:o,decorative:n,orientation:e,className:K("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...r}));co.displayName=_f.Root.displayName;const Fc=w.forwardRef(({className:t,...e},n)=>l.jsx(cs.Root,{ref:n,className:K("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Fc.displayName=cs.Root.displayName;const bh=w.forwardRef(({className:t,...e},n)=>l.jsx(cs.Image,{ref:n,className:K("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));bh.displayName=cs.Image.displayName;const Bc=w.forwardRef(({className:t,...e},n)=>l.jsx(cs.Fallback,{ref:n,className:K("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Bc.displayName=cs.Fallback.displayName;const qc=w.createContext(void 0);function On(){const t=w.useContext(qc);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const hr=Fr.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),No=Ge.Trigger,Uc=Ge.Group,vh=Ge.Portal,xh=Ge.Sub,yh=Ge.RadioGroup;function Ur({variant:t="default",...e}){const n=w.useMemo(()=>({variant:t}),[t]);return l.jsx(qc.Provider,{value:n,children:l.jsx(Ge.Root,{...e})})}const Vc=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ge.SubTrigger,{ref:o,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,hr({variant:s.variant})),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Vc.displayName=Ge.SubTrigger.displayName;const Hc=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.SubContent,{ref:n,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Hc.displayName=Ge.SubContent.displayName;const wr=w.forwardRef(({className:t,sideOffset:e=4,children:n,...r},o)=>{const s=Ct();return l.jsx(Ge.Portal,{children:l.jsx(Ge.Content,{ref:o,sideOffset:e,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:l.jsx("div",{dir:s,children:n})})})});wr.displayName=Ge.Content.displayName;const Sa=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=Ct(),s=On();return l.jsx(Ge.Item,{ref:r,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,hr({variant:s.variant})),...n,dir:o})});Sa.displayName=Ge.Item.displayName;const cr=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ge.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,hr({variant:s.variant})),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});cr.displayName=Ge.CheckboxItem.displayName;const zc=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ge.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,hr({variant:o.variant})),...n,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});zc.displayName=Ge.RadioItem.displayName;const ps=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ge.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));ps.displayName=Ge.Label.displayName;const To=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));To.displayName=Ge.Separator.displayName;function _h({className:t,...e}){return l.jsx("span",{className:K("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}_h.displayName="DropdownMenuShortcut";function ld({comment:t,isReply:e=!1,isEditable:n=!1,localizedStrings:r,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleResolveCommentThread:i=()=>{},handleUpdateComment:a,onEditingChange:c}){const[u,d]=w.useState(!1),[p,f]=w.useState(),h=w.useRef(null);w.useEffect(()=>{if(!u)return;let P=!0;const O=h.current;if(!O)return;const F=setTimeout(()=>{P&&X0(O)},300);return()=>{P=!1,clearTimeout(F)}},[u]);const b=w.useCallback(()=>{d(!1),f(void 0),c==null||c(!1)},[c]),x=w.useCallback(async()=>{if(!p||!a)return;await a(t.id,dh(p))&&(d(!1),f(void 0),c==null||c(!1))},[p,a,t.id,c]),C=w.useMemo(()=>{const P=new Date(t.date),O=ne.formatRelativeDate(P,r["%comment_date_today%"],r["%comment_date_yesterday%"]),F=P.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return ne.formatReplacementString(r["%comment_dateAtTime%"],{date:O,time:F})},[t.date,r]),E=w.useMemo(()=>!e&&t.assignedUser?ne.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:t.assignedUser}):t.user,[e,t.assignedUser,t.user,r]),_=w.useMemo(()=>t.user.split(" ").map(P=>P[0]).join("").toUpperCase().slice(0,2),[t.user]),S=w.useMemo(()=>ne.sanitizeHtml(ne.parseParatextHtml(t.contents)),[t.contents]),j=w.useMemo(()=>{if(o&&n&&!ne.hasCustomParatextTags(t.contents))return l.jsxs(Sa,{onClick:()=>{d(!0),f(Q0(ne.parseParatextHtml(t.contents))),c==null||c(!0)},children:[l.jsx(se.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]})},[n,o,r,t.contents,c]);return l.jsxs("div",{className:K("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[l.jsx(Fc,{className:"tw-h-8 tw-w-8",children:l.jsx(Bc,{className:"tw-text-xs tw-font-medium",children:_})}),l.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[l.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[l.jsx("p",{className:"tw-text-sm tw-font-medium",children:E}),l.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:C})]}),u&&l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:P=>{P.key==="Escape"?(P.preventDefault(),P.stopPropagation(),b()):P.key==="Enter"&&P.shiftKey&&(P.preventDefault(),P.stopPropagation(),ro(p)&&x())},onKeyDown:P=>{ph(P),(P.key==="Enter"||P.key===" ")&&P.stopPropagation()},children:[l.jsx(Kl,{editorSerializedState:p,onSerializedChange:P=>f(P)}),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ge,{size:"icon",onClick:b,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:l.jsx(se.X,{})}),l.jsx(ge,{size:"icon",onClick:x,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ro(p),children:l.jsx(se.ArrowUp,{})})]})]}),!u&&l.jsx("div",{className:K("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:S}})]}),o&&!e&&s!=="Resolved"&&l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:P=>{P.stopPropagation(),i(t.thread)},children:l.jsx(se.Check,{})}),j&&l.jsxs(Ur,{children:[l.jsx(No,{asChild:!0,children:l.jsx(ge,{variant:"ghost",size:"icon",children:l.jsx(se.MoreHorizontal,{})})}),l.jsx(wr,{align:"end",children:j})]})]})}const cd={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Z0({comments:t,localizedStrings:e,isSelected:n=!1,verseRef:r,assignedUser:o,currentUser:s,handleSelectThread:i,threadId:a,threadStatus:c,handleResolveCommentThread:u,handleAddComment:d,handleUpdateComment:p}){const[f,h]=w.useState(cd),[b,x]=w.useState(!1),[C,E]=w.useState(!1),[_,S]=w.useState(!1),[j,P]=w.useState(!1),O=w.useMemo(()=>t[0],[t]),F=w.useRef(null),q=w.useRef(void 0);w.useEffect(()=>{const U=F.current;if(!U)return;const G=()=>{E(U.scrollWidth>U.clientWidth)};return G(),window.addEventListener("resize",G),()=>window.removeEventListener("resize",G)},[O.verse]),w.useEffect(()=>{S(!1)},[n]);const B=w.useMemo(()=>({singleReply:e["%comment_thread_single_reply%"],multipleReplies:e["%comment_thread_multiple_replies%"]}),[e]),W=w.useMemo(()=>o?ne.formatReplacementString(e["%comment_assigned_to%"],{assignedUser:o}):void 0,[o,e]),N=w.useMemo(()=>t.slice(1),[t]),M=w.useMemo(()=>N.length??0,[N.length]),T=w.useMemo(()=>M>0,[M]),L=w.useMemo(()=>_||M<=2?N:N.slice(-2),[N,M,_]),A=w.useMemo(()=>_||M<=2?0:M-2,[M,_]),D=w.useMemo(()=>M===1?B.singleReply:ne.formatReplacementString(B.multipleReplies,{count:M}),[M,B]),$=w.useMemo(()=>A===1?B.singleReply:ne.formatReplacementString(B.multipleReplies,{count:A}),[A,B]),z=w.useCallback(async()=>{var G;await d(a,dh(f))&&((G=q.current)==null||G.call(q),h(cd))},[f,d,a]);return l.jsx(Ta,{role:"option","aria-selected":n,id:a,className:K("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer tw-bg-slate-50 hover:tw-shadow-md":!n},{"tw-bg-background":n}),onClick:()=>{i(a)},tabIndex:-1,children:l.jsxs($c,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[W&&l.jsx(Yo,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:W}),l.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[l.jsxs("p",{ref:F,className:K("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":b},{"tw-whitespace-nowrap":!b}),children:[r," ",O.verse]}),C&&l.jsx(ge,{variant:"ghost",size:"icon",onClick:U=>{U.stopPropagation(),x(!b)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":b?"Collapse text":"Expand text",children:b?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})})]}),l.jsx(ld,{comment:O,localizedStrings:e,isThreadExpanded:n,threadStatus:c,isEditable:t.length===1&&O.user===s,handleResolveCommentThread:u,handleUpdateComment:p,onEditingChange:P})]}),l.jsxs(l.Fragment,{children:[T&&!n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(co,{})}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:D})]}),!n&&ro(f)&&l.jsx(Kl,{editorSerializedState:f,onSerializedChange:U=>h(U),placeholder:e["%comment_replyOrAssign%"]}),n&&l.jsxs(l.Fragment,{children:[A>0&&l.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:U=>{U.stopPropagation(),S(!0)},role:"button",tabIndex:0,onKeyDown:U=>{(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),U.stopPropagation(),S(!0))},children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(co,{})}),l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:$}),_?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})]})]}),L.map(U=>{const J=U.id===N[N.length-1].id&&U.user===s;return l.jsx("div",{children:l.jsx(ld,{comment:U,localizedStrings:e,isReply:!0,isThreadExpanded:n,isEditable:J,handleUpdateComment:p,onEditingChange:P})},U.id)}),(!j||ro(f))&&l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:U=>U.stopPropagation(),onKeyDownCapture:U=>{U.key==="Enter"&&U.shiftKey&&(U.preventDefault(),U.stopPropagation(),ro(f)&&z())},onKeyDown:U=>{ph(U),(U.key==="Enter"||U.key===" ")&&U.stopPropagation()},children:[l.jsx(Kl,{editorSerializedState:f,onSerializedChange:U=>h(U),placeholder:e["%comment_replyOrAssign%"],autoFocus:!0,onClear:U=>{q.current=U}}),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ge,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ro(f),children:l.jsx(se.AtSign,{})}),l.jsx(ge,{size:"icon",onClick:z,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!ro(f),children:l.jsx(se.ArrowUp,{})})]})]})]})]})]})})}const Mi=t=>`thread-${t}`;function ev({className:t="",threads:e,currentUser:n,localizedStrings:r,handleAddComment:o,handleResolveCommentThread:s,handleUpdateComment:i}){const[a,c]=w.useState(),u=e.map(C=>({id:Mi(C.id)})),d=w.useCallback(C=>{c(C.id)},[]),p=w.useCallback(C=>{c(C)},[]),{listboxRef:f,activeId:h,handleKeyDown:b}=qf({options:u,onOptionSelect:d}),x=w.useCallback(C=>{C.key==="Escape"?(c(void 0),C.preventDefault(),C.stopPropagation()):b(C)},[b]);return l.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:f,"aria-activedescendant":h??void 0,"aria-label":"Comments",className:K("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:x,children:e.map(C=>l.jsx("div",{children:l.jsx(Z0,{comments:C.comments,localizedStrings:r,verseRef:C.verseRef,handleSelectThread:p,threadId:Mi(C.id),isSelected:a===Mi(C.id),currentUser:n,assignedUser:C.assignedUser,threadStatus:C.status,handleAddComment:o,handleResolveCommentThread:s,handleUpdateComment:i})},Mi(C.id)))})}function tv({table:t}){return l.jsxs(Ur,{children:[l.jsx(bf.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ge,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[l.jsx(se.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),l.jsxs(wr,{align:"end",className:"tw-w-[150px]",children:[l.jsx(ps,{children:"Toggle columns"}),l.jsx(To,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>l.jsx(cr,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:n=>e.toggleVisibility(!!n),children:e.id},e.id))]})]})}const uo=rt.Root,Ch=rt.Group,po=rt.Value,Eh=Fr.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Mr=w.forwardRef(({className:t,children:e,size:n,...r},o)=>{const s=Ct();return l.jsxs(rt.Trigger,{className:K(Eh({size:n,className:t})),ref:o,...r,dir:s,children:[e,l.jsx(rt.Icon,{asChild:!0,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Mr.displayName=rt.Trigger.displayName;const Gc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollUpButton,{ref:n,className:K("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Gc.displayName=rt.ScrollUpButton.displayName;const Kc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollDownButton,{ref:n,className:K("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Kc.displayName=rt.ScrollDownButton.displayName;const Rr=w.forwardRef(({className:t,children:e,position:n="popper",...r},o)=>{const s=Ct();return l.jsx(rt.Portal,{children:l.jsxs(rt.Content,{ref:o,className:K("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:n,...r,children:[l.jsx(Gc,{}),l.jsx(rt.Viewport,{className:K("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:l.jsx("div",{dir:s,children:e})}),l.jsx(Kc,{})]})})});Rr.displayName=rt.Content.displayName;const kh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Label,{ref:n,className:K("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));kh.displayName=rt.Label.displayName;const cn=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(rt.Item,{ref:r,className:K("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(rt.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),l.jsx(rt.ItemText,{children:e})]}));cn.displayName=rt.Item.displayName;const Nh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Nh.displayName=rt.Separator.displayName;function nv({table:t}){return l.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[l.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),l.jsxs(uo,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[l.jsx(Mr,{className:"tw-h-8 tw-w-[70px]",children:l.jsx(po,{placeholder:t.getState().pagination.pageSize})}),l.jsx(Rr,{side:"top",children:[10,20,30,40,50].map(e=>l.jsx(cn,{value:`${e}`,children:e},e))})]})]}),l.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),l.jsx(se.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),l.jsx(se.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),l.jsx(se.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),l.jsx(se.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const ud=`
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
`;function rv(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function qs(t,e){const n=e?`${ud}, ${e}`:ud;return Array.from(t.querySelectorAll(n)).filter(r=>!r.hasAttribute("disabled")&&!r.getAttribute("aria-hidden")&&rv(r))}const ai=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>{const o=w.useRef(null);w.useEffect(()=>{typeof r=="function"?r(o.current):r&&"current"in r&&(r.current=o.current)},[r]),w.useEffect(()=>{const i=o.current;if(!i)return;const a=()=>{requestAnimationFrame(()=>{qs(i,'[tabindex]:not([tabindex="-1"])').forEach(d=>{d.setAttribute("tabindex","-1")})})};a();const c=new MutationObserver(()=>{a()});return c.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{c.disconnect()}},[]);const s=i=>{const{current:a}=o;if(a){if(i.key==="ArrowDown"){i.preventDefault(),qs(a)[0].focus();return}i.key===" "&&document.activeElement===a&&i.preventDefault()}};return l.jsx("div",{className:K("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:l.jsx("table",{tabIndex:0,onKeyDown:s,ref:o,className:K("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...n})})});ai.displayName="Table";const li=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>l.jsx("thead",{ref:r,className:K({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...n}));li.displayName="TableHeader";const ci=w.forwardRef(({className:t,...e},n)=>l.jsx("tbody",{ref:n,className:K("[&_tr:last-child]:tw-border-0",t),...e}));ci.displayName="TableBody";const Th=w.forwardRef(({className:t,...e},n)=>l.jsx("tfoot",{ref:n,className:K("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Th.displayName="TableFooter";function ov(t){w.useEffect(()=>{const e=t.current;if(!e)return;const n=r=>{if(e.contains(document.activeElement)){if(r.key==="ArrowRight"||r.key==="ArrowLeft"){r.preventDefault(),r.stopPropagation();const o=t.current?qs(t.current):[],s=o.indexOf(document.activeElement),i=r.key==="ArrowRight"?s+1:s-1;i>=0&&i<o.length&&o[i].focus()}r.key==="Escape"&&(r.preventDefault(),e.focus()),(r.key==="ArrowDown"||r.key==="ArrowUp")&&r.preventDefault()}};return e.addEventListener("keydown",n),()=>{e.removeEventListener("keydown",n)}},[t])}function sv(t,e,n){let r;return n==="ArrowLeft"&&e>0?r=t[e-1]:n==="ArrowRight"&&e<t.length-1&&(r=t[e+1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}function iv(t,e,n){let r;return n==="ArrowDown"&&e<t.length-1?r=t[e+1]:n==="ArrowUp"&&e>0&&(r=t[e-1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}const Gn=w.forwardRef(({className:t,onKeyDown:e,onSelect:n,setFocusAlsoRunsSelect:r=!1,...o},s)=>{const i=w.useRef(null);w.useEffect(()=>{typeof s=="function"?s(i.current):s&&"current"in s&&(s.current=i.current)},[s]),ov(i);const a=w.useMemo(()=>i.current?qs(i.current):[],[i]),c=w.useCallback(d=>{const{current:p}=i;if(!p||!p.parentElement)return;const f=p.closest("table"),h=f?qs(f).filter(C=>C.tagName==="TR"):[],b=h.indexOf(p),x=a.indexOf(document.activeElement);if(d.key==="ArrowDown"||d.key==="ArrowUp")d.preventDefault(),iv(h,b,d.key);else if(d.key==="ArrowLeft"||d.key==="ArrowRight")d.preventDefault(),sv(a,x,d.key);else if(d.key==="Escape"){d.preventDefault();const C=p.closest("table");C&&C.focus()}e==null||e(d)},[i,a,e]),u=w.useCallback(d=>{r&&(n==null||n(d))},[r,n]);return l.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:c,onFocus:u,className:K("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});Gn.displayName="TableRow";const Wo=w.forwardRef(({className:t,...e},n)=>l.jsx("th",{ref:n,className:K("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Wo.displayName="TableHead";const Dr=w.forwardRef(({className:t,...e},n)=>l.jsx("td",{ref:n,className:K("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Dr.displayName="TableCell";const Sh=w.forwardRef(({className:t,...e},n)=>l.jsx("caption",{ref:n,className:K("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Sh.displayName="TableCaption";function Zi({className:t,...e}){return l.jsx("div",{className:K("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Ah({columns:t,data:e,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{},id:a,isLoading:c=!1,noResultsMessage:u}){var O;const[d,p]=w.useState([]),[f,h]=w.useState([]),[b,x]=w.useState({}),[C,E]=w.useState({}),_=w.useMemo(()=>e??[],[e]),S=Ft.useReactTable({data:_,columns:t,getCoreRowModel:Ft.getCoreRowModel(),...n&&{getPaginationRowModel:Ft.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ft.getSortedRowModel(),onColumnFiltersChange:h,getFilteredRowModel:Ft.getFilteredRowModel(),onColumnVisibilityChange:x,onRowSelectionChange:E,state:{sorting:d,columnFilters:f,columnVisibility:b,rowSelection:C}}),j=S.getVisibleFlatColumns();let P;return c?P=Array.from({length:10}).map((B,W)=>`skeleton-row-${W}`).map(B=>l.jsx(Gn,{children:l.jsx(Dr,{colSpan:j.length??t.length,className:"tw-border-0 tw-p-0",children:l.jsx("div",{className:"tw-w-full tw-py-2",children:l.jsx(Zi,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},B)):((O=S.getRowModel().rows)==null?void 0:O.length)>0?P=S.getRowModel().rows.map(F=>l.jsx(Gn,{onClick:()=>i(F,S),"data-state":F.getIsSelected()&&"selected",children:F.getVisibleCells().map(q=>l.jsx(Dr,{children:Ft.flexRender(q.column.columnDef.cell,q.getContext())},q.id))},F.id)):P=l.jsx(Gn,{children:l.jsx(Dr,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:u})}),l.jsxs("div",{className:"pr-twp",id:a,children:[o&&l.jsx(tv,{table:S}),l.jsxs(ai,{stickyHeader:s,children:[l.jsx(li,{stickyHeader:s,children:S.getHeaderGroups().map(F=>l.jsx(Gn,{children:F.headers.map(q=>l.jsx(Wo,{children:q.isPlaceholder?void 0:Ft.flexRender(q.column.columnDef.header,q.getContext())},q.id))},F.id))}),l.jsx(ci,{children:P})]}),n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(nv,{table:S})]})}function av({id:t,markdown:e,className:n,anchorTarget:r,truncate:o}){const s=w.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return l.jsx("div",{id:t,className:K("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":o},n),children:l.jsx(_b,{options:s,children:e})})}const Dh=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),dd=(t,e)=>t[e]??e;function Mh({errorDetails:t,handleCopyNotify:e,localizedStrings:n,id:r}){const o=dd(n,"%webView_error_dump_header%"),s=dd(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return l.jsxs("div",{id:r,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[l.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[l.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[l.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),l.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:s})]}),l.jsx(ge,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:l.jsx(se.Copy,{})})]}),l.jsx("div",{className:"tw-prose tw-w-full",children:l.jsx("pre",{className:"tw-text-xs",children:t})})]})}const lv=Object.freeze([...Dh,"%webView_error_dump_copied_message%"]);function cv({errorDetails:t,handleCopyNotify:e,localizedStrings:n,children:r,className:o,id:s}){const[i,a]=w.useState(!1),c=()=>{a(!0),e&&e()},u=d=>{d||a(!1)};return l.jsxs(Eo,{onOpenChange:u,children:[l.jsx(ko,{asChild:!0,children:r}),l.jsxs(qr,{id:s,className:K("tw-min-w-80 tw-max-w-96",o),children:[i&&n["%webView_error_dump_copied_message%"]&&l.jsx(ht,{children:n["%webView_error_dump_copied_message%"]}),l.jsx(Mh,{errorDetails:t,handleCopyNotify:c,localizedStrings:n})]})]})}var Rh=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Rh||{});function uv({id:t,label:e,groups:n}){const[r,o]=w.useState(Object.fromEntries(n.map((u,d)=>u.itemType===0?[d,[]]:void 0).filter(u=>!!u))),[s,i]=w.useState({}),a=(u,d)=>{const p=!r[u][d];o(h=>(h[u][d]=p,{...h}));const f=n[u].items[d];f.onUpdate(f.id,p)},c=(u,d)=>{i(f=>(f[u]=d,{...f}));const p=n[u].items.find(f=>f.id===d);p?p.onUpdate(d):console.error(`Could not find dropdown radio item with id '${d}'!`)};return l.jsx("div",{id:t,children:l.jsxs(Ur,{children:[l.jsx(No,{asChild:!0,children:l.jsxs(ge,{variant:"default",children:[l.jsx(se.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,l.jsx(se.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),l.jsx(wr,{children:n.map((u,d)=>l.jsxs("div",{children:[l.jsx(ps,{children:u.label}),l.jsx(Uc,{children:u.itemType===0?l.jsx(l.Fragment,{children:u.items.map((p,f)=>l.jsx("div",{children:l.jsx(cr,{checked:r[d][f],onCheckedChange:()=>a(d,f),children:p.label})},p.id))}):l.jsx(yh,{value:s[d],onValueChange:p=>c(d,p),children:u.items.map(p=>l.jsx("div",{children:l.jsx(zc,{value:p.id,children:p.label})},p.id))})}),l.jsx(To,{})]},u.label))})]})})}function dv({id:t,category:e,downloads:n,languages:r,moreInfoUrl:o,handleMoreInfoLinkClick:s,supportUrl:i,handleSupportLinkClick:a}){const c=new ne.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((d,p)=>d+p,0)),u=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[l.jsx("div",{className:"tw-flex",children:l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsxs("div",{className:"tw-flex tw-gap-1",children:[l.jsx(se.User,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:c})]}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsx("div",{className:"tw-flex tw-gap-2",children:r.slice(0,3).map(d=>l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d.toUpperCase()},d))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>u(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",r.length-3," more languages"]})]}),(o||i)&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ge,{onClick:()=>s(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",l.jsx(se.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ge,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",l.jsx(se.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function pv({id:t,versionHistory:e}){const[n,r]=w.useState(!1),o=new Date;function s(a){const c=new Date(a),u=new Date(o.getTime()-c.getTime()),d=u.getUTCFullYear()-1970,p=u.getUTCMonth(),f=u.getUTCDate()-1;let h="";return d>0?h=`${d.toString()} year${d===1?"":"s"} ago`:p>0?h=`${p.toString()} month${p===1?"":"s"} ago`:f===0?h="today":h=`${f.toString()} day${f===1?"":"s"} ago`,h}const i=Object.entries(e).sort((a,c)=>c[0].localeCompare(a[0]));return l.jsxs("div",{className:"pr-twp",id:t,children:[l.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(a=>l.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[l.jsx("div",{className:"tw-text-foreground",children:l.jsx("li",{className:"tw-prose tw-text-xs",children:l.jsx("span",{children:a[1].description})})}),l.jsxs("div",{className:"tw-justify-end tw-text-right",children:[l.jsxs("div",{children:["Version ",a[0]]}),l.jsx("div",{children:s(a[1].date)})]})]},a[0]))}),i.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function fv({id:t,publisherDisplayName:e,fileSize:n,locales:r,versionHistory:o,currentVersion:s}){const i=w.useMemo(()=>ne.formatBytes(n),[n]),c=(u=>{const d=new Intl.DisplayNames(ne.getCurrentLocale(),{type:"language"});return u.map(p=>d.of(p))})(r);return l.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(o).length>0&&l.jsx(pv,{versionHistory:o}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[l.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),l.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Publisher"}),l.jsx("span",{className:"tw-font-semibold",children:e}),l.jsx("span",{children:"Size"}),l.jsx("span",{className:"tw-font-semibold",children:i})]}),l.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Version"}),l.jsx("span",{className:"tw-font-semibold",children:s}),l.jsx("span",{children:"Languages"}),l.jsx("span",{className:"tw-font-semibold",children:c.join(", ")})]})})]})]})]})})}function Oh({entries:t,selected:e,onChange:n,placeholder:r,hasToggleAllFeature:o=!1,selectAllText:s="Select All",clearAllText:i="Clear All",commandEmptyMessage:a="No entries found",customSelectedText:c,isOpen:u=void 0,onOpenChange:d=void 0,isDisabled:p=!1,sortSelected:f=!1,icon:h=void 0,className:b=void 0,variant:x="ghost",id:C}){const[E,_]=w.useState(!1),S=w.useCallback(W=>{var M;const N=(M=t.find(T=>T.label===W))==null?void 0:M.value;N&&n(e.includes(N)?e.filter(T=>T!==N):[...e,N])},[t,e,n]),j=()=>c||r,P=w.useMemo(()=>{if(!f)return t;const W=t.filter(M=>M.starred).sort((M,T)=>M.label.localeCompare(T.label)),N=t.filter(M=>!M.starred).sort((M,T)=>{const L=e.includes(M.value),A=e.includes(T.value);return L&&!A?-1:!L&&A?1:M.label.localeCompare(T.label)});return[...W,...N]},[t,e,f]),O=()=>{n(t.map(W=>W.value))},F=()=>{n([])},q=u??E,B=d??_;return l.jsx("div",{id:C,className:b,children:l.jsxs(Eo,{open:q,onOpenChange:B,children:[l.jsx(ko,{asChild:!0,children:l.jsxs(ge,{variant:x,role:"combobox","aria-expanded":q,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[h&&l.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:l.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:h})}),l.jsx("span",{className:K("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:j()})]}),l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(qr,{align:"start",className:"tw-w-full tw-p-0",children:l.jsxs(_o,{children:[l.jsx(us,{placeholder:`Search ${r.toLowerCase()}...`}),o&&l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:O,children:s}),l.jsx(ge,{variant:"ghost",size:"sm",onClick:F,children:i})]}),l.jsxs(Co,{children:[l.jsx(oi,{children:a}),l.jsx(ur,{children:P.map(W=>l.jsxs(Br,{value:W.label,onSelect:S,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("div",{className:"w-4",children:l.jsx(se.Check,{className:K("tw-h-4 tw-w-4",e.includes(W.value)?"tw-opacity-100":"tw-opacity-0")})}),W.starred&&l.jsx(se.Star,{className:"tw-h-4 tw-w-4"}),l.jsx("div",{className:"tw-flex-grow",children:W.label}),W.secondaryLabel&&l.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:W.secondaryLabel})]},W.label))})]})]})})]})})}function hv({entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u,badgesPlaceholder:d,id:p}){return l.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx(Oh,{entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u}),e.length>0?l.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var h;return l.jsxs(Yo,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(e.filter(b=>b!==f)),children:l.jsx(se.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(b=>b.value===f))==null?void 0:h.label]},f)})}):l.jsx(ht,{children:d})]})}var Nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function wv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var De={},gt={},pd;function fs(){if(pd)return gt;pd=1;function t(E,_,S){if(S===void 0&&(S=Array.prototype),E&&typeof S.find=="function")return S.find.call(E,_);for(var j=0;j<E.length;j++)if(n(E,j)){var P=E[j];if(_.call(void 0,P,j,E))return P}}function e(E,_){return _===void 0&&(_=Object),_&&typeof _.getOwnPropertyDescriptors=="function"&&(E=_.create(null,_.getOwnPropertyDescriptors(E))),_&&typeof _.freeze=="function"?_.freeze(E):E}function n(E,_){return Object.prototype.hasOwnProperty.call(E,_)}function r(E,_){if(E===null||typeof E!="object")throw new TypeError("target is not an object");for(var S in _)n(_,S)&&(E[S]=_[S]);return E}var o=e({allowfullscreen:!0,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,default:!0,defer:!0,disabled:!0,formnovalidate:!0,hidden:!0,ismap:!0,itemscope:!0,loop:!0,multiple:!0,muted:!0,nomodule:!0,novalidate:!0,open:!0,playsinline:!0,readonly:!0,required:!0,reversed:!0,selected:!0});function s(E){return n(o,E.toLowerCase())}var i=e({area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function a(E){return n(i,E.toLowerCase())}var c=e({script:!1,style:!1,textarea:!0,title:!0});function u(E){var _=E.toLowerCase();return n(c,_)&&!c[_]}function d(E){var _=E.toLowerCase();return n(c,_)&&c[_]}function p(E){return E===h.HTML}function f(E){return p(E)||E===h.XML_XHTML_APPLICATION}var h=e({HTML:"text/html",XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),b=Object.keys(h).map(function(E){return h[E]});function x(E){return b.indexOf(E)>-1}var C=e({HTML:"http://www.w3.org/1999/xhtml",SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});return gt.assign=r,gt.find=t,gt.freeze=e,gt.HTML_BOOLEAN_ATTRIBUTES=o,gt.HTML_RAW_TEXT_ELEMENTS=c,gt.HTML_VOID_ELEMENTS=i,gt.hasDefaultHTMLNamespace=f,gt.hasOwn=n,gt.isHTMLBooleanAttribute=s,gt.isHTMLRawTextElement=u,gt.isHTMLEscapableRawTextElement=d,gt.isHTMLMimeType=p,gt.isHTMLVoidElement=a,gt.isValidMimeType=x,gt.MIME_TYPE=h,gt.NAMESPACE=C,gt}var $o={},fd;function Aa(){if(fd)return $o;fd=1;var t=fs();function e(f,h){f.prototype=Object.create(Error.prototype,{constructor:{value:f},name:{value:f.name,enumerable:!0,writable:h}})}var n=t.freeze({Error:"Error",IndexSizeError:"IndexSizeError",DomstringSizeError:"DomstringSizeError",HierarchyRequestError:"HierarchyRequestError",WrongDocumentError:"WrongDocumentError",InvalidCharacterError:"InvalidCharacterError",NoDataAllowedError:"NoDataAllowedError",NoModificationAllowedError:"NoModificationAllowedError",NotFoundError:"NotFoundError",NotSupportedError:"NotSupportedError",InUseAttributeError:"InUseAttributeError",InvalidStateError:"InvalidStateError",SyntaxError:"SyntaxError",InvalidModificationError:"InvalidModificationError",NamespaceError:"NamespaceError",InvalidAccessError:"InvalidAccessError",ValidationError:"ValidationError",TypeMismatchError:"TypeMismatchError",SecurityError:"SecurityError",NetworkError:"NetworkError",AbortError:"AbortError",URLMismatchError:"URLMismatchError",QuotaExceededError:"QuotaExceededError",TimeoutError:"TimeoutError",InvalidNodeTypeError:"InvalidNodeTypeError",DataCloneError:"DataCloneError",EncodingError:"EncodingError",NotReadableError:"NotReadableError",UnknownError:"UnknownError",ConstraintError:"ConstraintError",DataError:"DataError",TransactionInactiveError:"TransactionInactiveError",ReadOnlyError:"ReadOnlyError",VersionError:"VersionError",OperationError:"OperationError",NotAllowedError:"NotAllowedError",OptOutError:"OptOutError"}),r=Object.keys(n);function o(f){return typeof f=="number"&&f>=1&&f<=25}function s(f){return typeof f=="string"&&f.substring(f.length-n.Error.length)===n.Error}function i(f,h){o(f)?(this.name=r[f],this.message=h||""):(this.message=f,this.name=s(h)?h:n.Error),Error.captureStackTrace&&Error.captureStackTrace(this,i)}e(i,!0),Object.defineProperties(i.prototype,{code:{enumerable:!0,get:function(){var f=r.indexOf(this.name);return o(f)?f:0}}});for(var a={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25},c=Object.entries(a),u=0;u<c.length;u++){var d=c[u][0];i[d]=c[u][1]}function p(f,h){this.message=f,this.locator=h,Error.captureStackTrace&&Error.captureStackTrace(this,p)}return e(p),$o.DOMException=i,$o.DOMExceptionName=n,$o.ExceptionCode=a,$o.ParseError=p,$o}var tt={},_e={},hd;function jh(){if(hd)return _e;hd=1;function t($e){try{typeof $e!="function"&&($e=RegExp);var Xe=new $e("𝌆","u").exec("𝌆");return!!Xe&&Xe[0].length===2}catch{}return!1}var e=t();function n($e){if($e.source[0]!=="[")throw new Error($e+" can not be used with chars");return $e.source.slice(1,$e.source.lastIndexOf("]"))}function r($e,Xe){if($e.source[0]!=="[")throw new Error("/"+$e.source+"/ can not be used with chars_without");if(!Xe||typeof Xe!="string")throw new Error(JSON.stringify(Xe)+" is not a valid search");if($e.source.indexOf(Xe)===-1)throw new Error('"'+Xe+'" is not is /'+$e.source+"/");if(Xe==="-"&&$e.source.indexOf(Xe)!==1)throw new Error('"'+Xe+'" is not at the first postion of /'+$e.source+"/");return new RegExp($e.source.replace(Xe,""),e?"u":"")}function o($e){var Xe=this;return new RegExp(Array.prototype.slice.call(arguments).map(function(Lt){var Pt=typeof Lt=="string";if(Pt&&Xe===void 0&&Lt==="|")throw new Error("use regg instead of reg to wrap expressions with `|`!");return Pt?Lt:Lt.source}).join(""),e?"mu":"m")}function s($e){if(arguments.length===0)throw new Error("no parameters provided");return o.apply(s,["(?:"].concat(Array.prototype.slice.call(arguments),[")"]))}var i="�",a=/[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;e&&(a=o("[",n(a),"\\u{10000}-\\u{10FFFF}","]"));var c=/[\x20\x09\x0D\x0A]/,u=n(c),d=o(c,"+"),p=o(c,"*"),f=/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;e&&(f=o("[",n(f),"\\u{10000}-\\u{10FFFF}","]"));var h=n(f),b=o("[",h,n(/[-.0-9\xB7]/),n(/[\u0300-\u036F\u203F-\u2040]/),"]"),x=o(f,b,"*"),C=o(b,"+"),E=o("&",x,";"),_=s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/),S=s(E,"|",_),j=o("%",x,";"),P=s(o('"',s(/[^%&"]/,"|",j,"|",S),"*",'"'),"|",o("'",s(/[^%&']/,"|",j,"|",S),"*","'")),O=s('"',s(/[^<&"]/,"|",S),"*",'"',"|","'",s(/[^<&']/,"|",S),"*","'"),F=r(f,":"),q=r(b,":"),B=o(F,q,"*"),W=o(B,s(":",B),"?"),N=o("^",W,"$"),M=o("(",W,")"),T=s(/"[^"]*"|'[^']*'/),L=o(/^<\?/,"(",x,")",s(d,"(",a,"*?)"),"?",/\?>/),A=/[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/,D=s('"',A,'*"',"|","'",r(A,"'"),"*'"),$="<!--",z="-->",U=o($,s(r(a,"-"),"|",o("-",r(a,"-"))),"*",z),G="#PCDATA",J=s(o(/\(/,p,G,s(p,/\|/,p,W),"*",p,/\)\*/),"|",o(/\(/,p,G,p,/\)/)),ee=/[?*+]?/,te=o(/\([^>]+\)/,ee),Z=s("EMPTY","|","ANY","|",J,"|",te),X="<!ELEMENT",le=o(X,d,s(W,"|",j),d,s(Z,"|",j),p,">"),ce=o("NOTATION",d,/\(/,p,x,s(p,/\|/,p,x),"*",p,/\)/),ue=o(/\(/,p,C,s(p,/\|/,p,C),"*",p,/\)/),me=s(ce,"|",ue),he=s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/,"|",me),we=s(/#REQUIRED|#IMPLIED/,"|",s(s("#FIXED",d),"?",O)),ie=s(d,x,d,he,d,we),Ce="<!ATTLIST",Me=o(Ce,d,x,ie,"*",p,">"),oe="about:legacy-compat",be=s('"'+oe+'"',"|","'"+oe+"'"),Ne="SYSTEM",je="PUBLIC",qe=s(s(Ne,d,T),"|",s(je,d,D,d,T)),Ze=o("^",s(s(Ne,d,"(?<SystemLiteralOnly>",T,")"),"|",s(je,d,"(?<PubidLiteral>",D,")",d,"(?<SystemLiteral>",T,")"))),Je=s(d,"NDATA",d,x),ot=s(P,"|",s(qe,Je,"?")),Ee="<!ENTITY",ut=o(Ee,d,x,d,ot,p,">"),Ve=s(P,"|",qe),bn=o(Ee,d,"%",d,x,d,Ve,p,">"),Xt=s(ut,"|",bn),Ut=o(je,d,D),Qt=o("<!NOTATION",d,x,d,s(qe,"|",Ut),p,">"),fe=o(p,"=",p),Pe=/1[.]\d+/,dt=o(d,"version",fe,s("'",Pe,"'","|",'"',Pe,'"')),mt=/[A-Za-z][-A-Za-z0-9._]*/,Zt=s(d,"encoding",fe,s('"',mt,'"',"|","'",mt,"'")),en=s(d,"standalone",fe,s("'",s("yes","|","no"),"'","|",'"',s("yes","|","no"),'"')),vn=o(/^<\?xml/,dt,Zt,"?",en,"?",p,/\?>/),tn="<!DOCTYPE",nn="<![CDATA[",Et="]]>",rn=/<!\[CDATA\[/,on=/\]\]>/,Vt=o(a,"*?",on),In=o(rn,Vt);return _e.chars=n,_e.chars_without=r,_e.detectUnicodeSupport=t,_e.reg=o,_e.regg=s,_e.ABOUT_LEGACY_COMPAT=oe,_e.ABOUT_LEGACY_COMPAT_SystemLiteral=be,_e.AttlistDecl=Me,_e.CDATA_START=nn,_e.CDATA_END=Et,_e.CDSect=In,_e.Char=a,_e.Comment=U,_e.COMMENT_START=$,_e.COMMENT_END=z,_e.DOCTYPE_DECL_START=tn,_e.elementdecl=le,_e.EntityDecl=Xt,_e.EntityValue=P,_e.ExternalID=qe,_e.ExternalID_match=Ze,_e.Name=x,_e.NotationDecl=Qt,_e.Reference=S,_e.PEReference=j,_e.PI=L,_e.PUBLIC=je,_e.PubidLiteral=D,_e.QName=W,_e.QName_exact=N,_e.QName_group=M,_e.S=d,_e.SChar_s=u,_e.S_OPT=p,_e.SYSTEM=Ne,_e.SystemLiteral=T,_e.UNICODE_REPLACEMENT_CHARACTER=i,_e.UNICODE_SUPPORT=e,_e.XMLDecl=vn,_e}var wd;function Ih(){if(wd)return tt;wd=1;var t=fs(),e=t.find,n=t.hasDefaultHTMLNamespace,r=t.hasOwn,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.isHTMLVoidElement,a=t.MIME_TYPE,c=t.NAMESPACE,u=Symbol(),d=Aa(),p=d.DOMException,f=d.DOMExceptionName,h=jh();function b(v){if(v!==u)throw new TypeError("Illegal constructor")}function x(v){return v!==""}function C(v){return v?v.split(/[\t\n\f\r ]+/).filter(x):[]}function E(v,y){return r(v,y)||(v[y]=!0),v}function _(v){if(!v)return[];var y=C(v);return Object.keys(y.reduce(E,{}))}function S(v){return function(y){return v&&v.indexOf(y)!==-1}}function j(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in qualified name "'+v+'"')}function P(v,y){j(y),v=v||null;var R=null,Y=y;if(y.indexOf(":")>=0){var re=y.split(":");R=re[0],Y=re[1]}if(R!==null&&v===null)throw new p(p.NAMESPACE_ERR,"prefix is non-null and namespace is null");if(R==="xml"&&v!==t.NAMESPACE.XML)throw new p(p.NAMESPACE_ERR,'prefix is "xml" and namespace is not the XML namespace');if((R==="xmlns"||y==="xmlns")&&v!==t.NAMESPACE.XMLNS)throw new p(p.NAMESPACE_ERR,'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');if(v===t.NAMESPACE.XMLNS&&R!=="xmlns"&&y!=="xmlns")throw new p(p.NAMESPACE_ERR,'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');return[v,R,Y]}function O(v,y){for(var R in v)r(v,R)&&(y[R]=v[R])}function F(v,y){var R=v.prototype;if(!(R instanceof y)){let Y=function(){};Y.prototype=y.prototype,Y=new Y,O(R,Y),v.prototype=R=Y}R.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),R.constructor=v)}var q={},B=q.ELEMENT_NODE=1,W=q.ATTRIBUTE_NODE=2,N=q.TEXT_NODE=3,M=q.CDATA_SECTION_NODE=4,T=q.ENTITY_REFERENCE_NODE=5,L=q.ENTITY_NODE=6,A=q.PROCESSING_INSTRUCTION_NODE=7,D=q.COMMENT_NODE=8,$=q.DOCUMENT_NODE=9,z=q.DOCUMENT_TYPE_NODE=10,U=q.DOCUMENT_FRAGMENT_NODE=11,G=q.NOTATION_NODE=12,J=t.freeze({DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:2,DOCUMENT_POSITION_FOLLOWING:4,DOCUMENT_POSITION_CONTAINS:8,DOCUMENT_POSITION_CONTAINED_BY:16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32});function ee(v,y){if(y.length<v.length)return ee(y,v);var R=null;for(var Y in v){if(v[Y]!==y[Y])return R;R=v[Y]}return R}function te(v){return v.guid||(v.guid=Math.random()),v.guid}function Z(){}Z.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v){for(var y=[],R=0;R<this.length;R++)Pt(this[R],y,v);return y.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}},Z.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function X(v,y){this._node=v,this._refresh=y,le(this)}function le(v){var y=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==y){var R=v._refresh(v._node);if(dn(v,"length",R.length),!v.$$length||R.length<v.$$length)for(var Y=R.length;Y in v;Y++)r(v,Y)&&delete v[Y];O(R,v),v._inc=y}}X.prototype.item=function(v){return le(this),this[v]||null},F(X,Z);function ce(){}function ue(v,y){for(var R=0;R<v.length;){if(v[R]===y)return R;R++}}function me(v,y,R,Y){if(Y?y[ue(y,Y)]=R:(y[y.length]=R,y.length++),v){R.ownerElement=v;var re=v.ownerDocument;re&&(Y&&Ne(re,v,Y),be(re,v,R))}}function he(v,y,R){var Y=ue(y,R);if(Y>=0){for(var re=y.length-1;Y<=re;)y[Y]=y[++Y];if(y.length=re,v){var ae=v.ownerDocument;ae&&Ne(ae,v,R),R.ownerElement=null}}}ce.prototype={length:0,item:Z.prototype.item,getNamedItem:function(v){this._ownerElement&&this._ownerElement._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());for(var y=0;y<this.length;){var R=this[y];if(R.nodeName===v)return R;y++}return null},setNamedItem:function(v){var y=v.ownerElement;if(y&&y!==this._ownerElement)throw new p(p.INUSE_ATTRIBUTE_ERR);var R=this.getNamedItemNS(v.namespaceURI,v.localName);return R===v?v:(me(this._ownerElement,this,v,R),R)},setNamedItemNS:function(v){return this.setNamedItem(v)},removeNamedItem:function(v){var y=this.getNamedItem(v);if(!y)throw new p(p.NOT_FOUND_ERR,v);return he(this._ownerElement,this,y),y},removeNamedItemNS:function(v,y){var R=this.getNamedItemNS(v,y);if(!R)throw new p(p.NOT_FOUND_ERR,v?v+" : "+y:y);return he(this._ownerElement,this,R),R},getNamedItemNS:function(v,y){v||(v=null);for(var R=0;R<this.length;){var Y=this[R];if(Y.localName===y&&Y.namespaceURI===v)return Y;R++}return null}},ce.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function we(){}we.prototype={hasFeature:function(v,y){return!0},createDocument:function(v,y,R){var Y=a.XML_APPLICATION;v===c.HTML?Y=a.XML_XHTML_APPLICATION:v===c.SVG&&(Y=a.XML_SVG_IMAGE);var re=new oe(u,{contentType:Y});if(re.implementation=this,re.childNodes=new Z,re.doctype=R||null,R&&re.appendChild(R),y){var ae=re.createElementNS(v,y);re.appendChild(ae)}return re},createDocumentType:function(v,y,R,Y){j(v);var re=new tn(u);return re.name=v,re.nodeName=v,re.publicId=y||"",re.systemId=R||"",re.internalSubset=Y||"",re.childNodes=new Z,re},createHTMLDocument:function(v){var y=new oe(u,{contentType:a.HTML});if(y.implementation=this,y.childNodes=new Z,v!==!1){y.doctype=this.createDocumentType("html"),y.doctype.ownerDocument=y,y.appendChild(y.doctype);var R=y.createElement("html");y.appendChild(R);var Y=y.createElement("head");if(R.appendChild(Y),typeof v=="string"){var re=y.createElement("title");re.appendChild(y.createTextNode(v)),Y.appendChild(re)}R.appendChild(y.createElement("body"))}return y}};function ie(v){b(v)}ie.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,parentNode:null,get parentElement(){return this.parentNode&&this.parentNode.nodeType===this.ELEMENT_NODE?this.parentNode:null},childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,baseURI:"about:blank",get isConnected(){var v=this.getRootNode();return v&&v.nodeType===v.DOCUMENT_NODE},contains:function(v){if(!v)return!1;var y=v;do{if(this===y)return!0;y=v.parentNode}while(y);return!1},getRootNode:function(v){var y=this;do{if(!y.parentNode)return y;y=y.parentNode}while(y)},isEqualNode:function(v){if(!v||this.nodeType!==v.nodeType)return!1;switch(this.nodeType){case this.DOCUMENT_TYPE_NODE:if(this.name!==v.name||this.publicId!==v.publicId||this.systemId!==v.systemId)return!1;break;case this.ELEMENT_NODE:if(this.namespaceURI!==v.namespaceURI||this.prefix!==v.prefix||this.localName!==v.localName||this.attributes.length!==v.attributes.length)return!1;for(var y=0;y<this.attributes.length;y++){var R=this.attributes.item(y);if(!R.isEqualNode(v.getAttributeNodeNS(R.namespaceURI,R.localName)))return!1}break;case this.ATTRIBUTE_NODE:if(this.namespaceURI!==v.namespaceURI||this.localName!==v.localName||this.value!==v.value)return!1;break;case this.PROCESSING_INSTRUCTION_NODE:if(this.target!==v.target||this.data!==v.data)return!1;break;case this.TEXT_NODE:case this.COMMENT_NODE:if(this.data!==v.data)return!1;break}if(this.childNodes.length!==v.childNodes.length)return!1;for(var y=0;y<this.childNodes.length;y++)if(!this.childNodes[y].isEqualNode(v.childNodes[y]))return!1;return!0},isSameNode:function(v){return this===v},insertBefore:function(v,y){return fe(this,v,y)},replaceChild:function(v,y){fe(this,v,y,Qt),y&&this.removeChild(y)},removeChild:function(v){return qe(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return vr(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var y=v.nextSibling;y&&y.nodeType==N&&v.nodeType==N?(this.removeChild(y),v.appendData(y.data)):(v.normalize(),v=y)}},isSupported:function(v,y){return this.ownerDocument.implementation.hasFeature(v,y)},lookupPrefix:function(v){for(var y=this;y;){var R=y._nsMap;if(R){for(var Y in R)if(r(R,Y)&&R[Y]===v)return Y}y=y.nodeType==W?y.ownerDocument:y.parentNode}return null},lookupNamespaceURI:function(v){for(var y=this;y;){var R=y._nsMap;if(R&&r(R,v))return R[v];y=y.nodeType==W?y.ownerDocument:y.parentNode}return null},isDefaultNamespace:function(v){var y=this.lookupPrefix(v);return y==null},compareDocumentPosition:function(v){if(this===v)return 0;var y=v,R=this,Y=null,re=null;if(y instanceof dt&&(Y=y,y=Y.ownerElement),R instanceof dt&&(re=R,R=re.ownerElement,Y&&y&&R===y))for(var ae=0,ke;ke=R.attributes[ae];ae++){if(ke===Y)return J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+J.DOCUMENT_POSITION_PRECEDING;if(ke===re)return J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+J.DOCUMENT_POSITION_FOLLOWING}if(!y||!R||R.ownerDocument!==y.ownerDocument)return J.DOCUMENT_POSITION_DISCONNECTED+J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+(te(R.ownerDocument)>te(y.ownerDocument)?J.DOCUMENT_POSITION_FOLLOWING:J.DOCUMENT_POSITION_PRECEDING);if(re&&y===R)return J.DOCUMENT_POSITION_CONTAINS+J.DOCUMENT_POSITION_PRECEDING;if(Y&&y===R)return J.DOCUMENT_POSITION_CONTAINED_BY+J.DOCUMENT_POSITION_FOLLOWING;for(var et=[],it=y.parentNode;it;){if(!re&&it===R)return J.DOCUMENT_POSITION_CONTAINED_BY+J.DOCUMENT_POSITION_FOLLOWING;et.push(it),it=it.parentNode}et.reverse();for(var kt=[],pt=R.parentNode;pt;){if(!Y&&pt===y)return J.DOCUMENT_POSITION_CONTAINS+J.DOCUMENT_POSITION_PRECEDING;kt.push(pt),pt=pt.parentNode}kt.reverse();var We=ee(et,kt);for(var sn in We.childNodes){var Dt=We.childNodes[sn];if(Dt===R)return J.DOCUMENT_POSITION_FOLLOWING;if(Dt===y)return J.DOCUMENT_POSITION_PRECEDING;if(kt.indexOf(Dt)>=0)return J.DOCUMENT_POSITION_FOLLOWING;if(et.indexOf(Dt)>=0)return J.DOCUMENT_POSITION_PRECEDING}return 0}};function Ce(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}O(q,ie),O(q,ie.prototype),O(J,ie),O(J,ie.prototype);function Me(v,y){if(y(v))return!0;if(v=v.firstChild)do if(Me(v,y))return!0;while(v=v.nextSibling)}function oe(v,y){b(v);var R=y||{};this.ownerDocument=this,this.contentType=R.contentType||a.XML_APPLICATION,this.type=o(this.contentType)?"html":"xml"}function be(v,y,R){v&&v._inc++;var Y=R.namespaceURI;Y===c.XMLNS&&(y._nsMap[R.prefix?R.localName:""]=R.value)}function Ne(v,y,R,Y){v&&v._inc++;var re=R.namespaceURI;re===c.XMLNS&&delete y._nsMap[R.prefix?R.localName:""]}function je(v,y,R){if(v&&v._inc){v._inc++;var Y=y.childNodes;if(R&&!R.nextSibling)Y[Y.length++]=R;else{for(var re=y.firstChild,ae=0;re;)Y[ae++]=re,re=re.nextSibling;Y.length=ae,delete Y[Y.length]}}}function qe(v,y){if(v!==y.parentNode)throw new p(p.NOT_FOUND_ERR,"child's parent is not parent");var R=y.previousSibling,Y=y.nextSibling;return R?R.nextSibling=Y:v.firstChild=Y,Y?Y.previousSibling=R:v.lastChild=R,je(v.ownerDocument,v),y.parentNode=null,y.previousSibling=null,y.nextSibling=null,y}function Ze(v){return v&&(v.nodeType===ie.DOCUMENT_NODE||v.nodeType===ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===ie.ELEMENT_NODE)}function Je(v){return v&&(v.nodeType===ie.CDATA_SECTION_NODE||v.nodeType===ie.COMMENT_NODE||v.nodeType===ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===ie.DOCUMENT_TYPE_NODE||v.nodeType===ie.ELEMENT_NODE||v.nodeType===ie.PROCESSING_INSTRUCTION_NODE||v.nodeType===ie.TEXT_NODE)}function ot(v){return v&&v.nodeType===ie.DOCUMENT_TYPE_NODE}function Ee(v){return v&&v.nodeType===ie.ELEMENT_NODE}function ut(v){return v&&v.nodeType===ie.TEXT_NODE}function Ve(v,y){var R=v.childNodes||[];if(e(R,Ee)||ot(y))return!1;var Y=e(R,ot);return!(y&&Y&&R.indexOf(Y)>R.indexOf(y))}function bn(v,y){var R=v.childNodes||[];function Y(ae){return Ee(ae)&&ae!==y}if(e(R,Y))return!1;var re=e(R,ot);return!(y&&re&&R.indexOf(re)>R.indexOf(y))}function Xt(v,y,R){if(!Ze(v))throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected parent node type "+v.nodeType);if(R&&R.parentNode!==v)throw new p(p.NOT_FOUND_ERR,"child not in parent");if(!Je(y)||ot(y)&&v.nodeType!==ie.DOCUMENT_NODE)throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected node type "+y.nodeType+" for parent node type "+v.nodeType)}function Ut(v,y,R){var Y=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!Ve(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!Ve(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(Y,ot))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(Y,Ee);if(R&&Y.indexOf(ke)<Y.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element");if(!R&&ke)throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can not be appended since element is present")}}function Qt(v,y,R){var Y=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!bn(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!bn(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(Y,function(it){return ot(it)&&it!==R}))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(Y,Ee);if(R&&Y.indexOf(ke)<Y.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element")}}function fe(v,y,R,Y){Xt(v,y,R),v.nodeType===ie.DOCUMENT_NODE&&(Y||Ut)(v,y,R);var re=y.parentNode;if(re&&re.removeChild(y),y.nodeType===U){var ae=y.firstChild;if(ae==null)return y;var ke=y.lastChild}else ae=ke=y;var et=R?R.previousSibling:v.lastChild;ae.previousSibling=et,ke.nextSibling=R,et?et.nextSibling=ae:v.firstChild=ae,R==null?v.lastChild=ke:R.previousSibling=ke;do ae.parentNode=v;while(ae!==ke&&(ae=ae.nextSibling));return je(v.ownerDocument||v,v,y),y.nodeType==U&&(y.firstChild=y.lastChild=null),y}oe.prototype={implementation:null,nodeName:"#document",nodeType:$,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,y){if(v.nodeType===U){for(var R=v.firstChild;R;){var Y=R.nextSibling;this.insertBefore(R,y),R=Y}return v}return fe(this,v,y),v.ownerDocument=this,this.documentElement===null&&v.nodeType===B&&(this.documentElement=v),v},removeChild:function(v){var y=qe(this,v);return y===this.documentElement&&(this.documentElement=null),y},replaceChild:function(v,y){fe(this,v,y,Qt),v.ownerDocument=this,y&&this.removeChild(y),Ee(v)&&(this.documentElement=v)},importNode:function(v,y){return xn(this,v,y)},getElementById:function(v){var y=null;return Me(this.documentElement,function(R){if(R.nodeType==B&&R.getAttribute("id")==v)return y=R,!0}),y},createElement:function(v){var y=new Pe(u);y.ownerDocument=this,this.type==="html"&&(v=v.toLowerCase()),n(this.contentType)&&(y.namespaceURI=c.HTML),y.nodeName=v,y.tagName=v,y.localName=v,y.childNodes=new Z;var R=y.attributes=new ce;return R._ownerElement=y,y},createDocumentFragment:function(){var v=new on(u);return v.ownerDocument=this,v.childNodes=new Z,v},createTextNode:function(v){var y=new Zt(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createComment:function(v){var y=new en(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createCDATASection:function(v){var y=new vn(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createProcessingInstruction:function(v,y){var R=new Vt(u);return R.ownerDocument=this,R.childNodes=new Z,R.nodeName=R.target=v,R.nodeValue=R.data=y,R},createAttribute:function(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in name "'+v+'"');return this.type==="html"&&(v=v.toLowerCase()),this._createAttribute(v)},_createAttribute:function(v){var y=new dt(u);return y.ownerDocument=this,y.childNodes=new Z,y.name=v,y.nodeName=v,y.localName=v,y.specified=!0,y},createEntityReference:function(v){if(!h.Name.test(v))throw new p(p.INVALID_CHARACTER_ERR,'not a valid xml name "'+v+'"');if(this.type==="html")throw new p("document is an html document",f.NotSupportedError);var y=new rn(u);return y.ownerDocument=this,y.childNodes=new Z,y.nodeName=v,y},createElementNS:function(v,y){var R=P(v,y),Y=new Pe(u),re=Y.attributes=new ce;return Y.childNodes=new Z,Y.ownerDocument=this,Y.nodeName=y,Y.tagName=y,Y.namespaceURI=R[0],Y.prefix=R[1],Y.localName=R[2],re._ownerElement=Y,Y},createAttributeNS:function(v,y){var R=P(v,y),Y=new dt(u);return Y.ownerDocument=this,Y.childNodes=new Z,Y.nodeName=y,Y.name=y,Y.specified=!0,Y.namespaceURI=R[0],Y.prefix=R[1],Y.localName=R[2],Y}},F(oe,ie);function Pe(v){b(v),this._nsMap=Object.create(null)}Pe.prototype={nodeType:B,attributes:null,getQualifiedName:function(){return this.prefix?this.prefix+":"+this.localName:this.localName},_isInHTMLDocumentAndNamespace:function(){return this.ownerDocument.type==="html"&&this.namespaceURI===c.HTML},hasAttributes:function(){return!!(this.attributes&&this.attributes.length)},hasAttribute:function(v){return!!this.getAttributeNode(v)},getAttribute:function(v){var y=this.getAttributeNode(v);return y?y.value:null},getAttributeNode:function(v){return this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase()),this.attributes.getNamedItem(v)},setAttribute:function(v,y){this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());var R=this.getAttributeNode(v);R?R.value=R.nodeValue=""+y:(R=this.ownerDocument._createAttribute(v),R.value=R.nodeValue=""+y,this.setAttributeNode(R))},removeAttribute:function(v){var y=this.getAttributeNode(v);y&&this.removeAttributeNode(y)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);R&&this.removeAttributeNode(R)},hasAttributeNS:function(v,y){return this.getAttributeNodeNS(v,y)!=null},getAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);return R?R.value:null},setAttributeNS:function(v,y,R){var Y=P(v,y),re=Y[2],ae=this.getAttributeNodeNS(v,re);ae?ae.value=ae.nodeValue=""+R:(ae=this.ownerDocument.createAttributeNS(v,y),ae.value=ae.nodeValue=""+R,this.setAttributeNode(ae))},getAttributeNodeNS:function(v,y){return this.attributes.getNamedItemNS(v,y)},getElementsByClassName:function(v){var y=_(v);return new X(this,function(R){var Y=[];return y.length>0&&Me(R,function(re){if(re!==R&&re.nodeType===B){var ae=re.getAttribute("class");if(ae){var ke=v===ae;if(!ke){var et=_(ae);ke=y.every(S(et))}ke&&Y.push(re)}}}),Y})},getElementsByTagName:function(v){var y=(this.nodeType===$?this:this.ownerDocument).type==="html",R=v.toLowerCase();return new X(this,function(Y){var re=[];return Me(Y,function(ae){if(!(ae===Y||ae.nodeType!==B))if(v==="*")re.push(ae);else{var ke=ae.getQualifiedName(),et=y&&ae.namespaceURI===c.HTML?R:v;ke===et&&re.push(ae)}}),re})},getElementsByTagNameNS:function(v,y){return new X(this,function(R){var Y=[];return Me(R,function(re){re!==R&&re.nodeType===B&&(v==="*"||re.namespaceURI===v)&&(y==="*"||re.localName==y)&&Y.push(re)}),Y})}},oe.prototype.getElementsByClassName=Pe.prototype.getElementsByClassName,oe.prototype.getElementsByTagName=Pe.prototype.getElementsByTagName,oe.prototype.getElementsByTagNameNS=Pe.prototype.getElementsByTagNameNS,F(Pe,ie);function dt(v){b(v),this.namespaceURI=null,this.prefix=null,this.ownerElement=null}dt.prototype.nodeType=W,F(dt,ie);function mt(v){b(v)}mt.prototype={data:"",substringData:function(v,y){return this.data.substring(v,v+y)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,y){this.replaceData(v,0,y)},deleteData:function(v,y){this.replaceData(v,y,"")},replaceData:function(v,y,R){var Y=this.data.substring(0,v),re=this.data.substring(v+y);R=Y+R+re,this.nodeValue=this.data=R,this.length=R.length}},F(mt,ie);function Zt(v){b(v)}Zt.prototype={nodeName:"#text",nodeType:N,splitText:function(v){var y=this.data,R=y.substring(v);y=y.substring(0,v),this.data=this.nodeValue=y,this.length=y.length;var Y=this.ownerDocument.createTextNode(R);return this.parentNode&&this.parentNode.insertBefore(Y,this.nextSibling),Y}},F(Zt,mt);function en(v){b(v)}en.prototype={nodeName:"#comment",nodeType:D},F(en,mt);function vn(v){b(v)}vn.prototype={nodeName:"#cdata-section",nodeType:M},F(vn,Zt);function tn(v){b(v)}tn.prototype.nodeType=z,F(tn,ie);function nn(v){b(v)}nn.prototype.nodeType=G,F(nn,ie);function Et(v){b(v)}Et.prototype.nodeType=L,F(Et,ie);function rn(v){b(v)}rn.prototype.nodeType=T,F(rn,ie);function on(v){b(v)}on.prototype.nodeName="#document-fragment",on.prototype.nodeType=U,F(on,ie);function Vt(v){b(v)}Vt.prototype.nodeType=A,F(Vt,mt);function In(){}In.prototype.serializeToString=function(v,y){return $e.call(v,y)},ie.prototype.toString=$e;function $e(v){var y=[],R=this.nodeType===$&&this.documentElement||this,Y=R.prefix,re=R.namespaceURI;if(re&&Y==null){var Y=R.lookupPrefix(re);if(Y==null)var ae=[{namespace:re,prefix:null}]}return Pt(this,y,v,ae),y.join("")}function Xe(v,y,R){var Y=v.prefix||"",re=v.namespaceURI;if(!re||Y==="xml"&&re===c.XML||re===c.XMLNS)return!1;for(var ae=R.length;ae--;){var ke=R[ae];if(ke.prefix===Y)return ke.namespace!==re}return!0}function Lt(v,y,R){v.push(" ",y,'="',R.replace(/[<>&"\t\n\r]/g,Ce),'"')}function Pt(v,y,R,Y){Y||(Y=[]);var re=v.nodeType===$?v:v.ownerDocument,ae=re.type==="html";if(R)if(v=R(v),v){if(typeof v=="string"){y.push(v);return}}else return;switch(v.nodeType){case B:var ke=v.attributes,et=ke.length,lt=v.firstChild,it=v.tagName,kt=it;if(!ae&&!v.prefix&&v.namespaceURI){for(var pt,We=0;We<ke.length;We++)if(ke.item(We).name==="xmlns"){pt=ke.item(We).value;break}if(!pt)for(var sn=Y.length-1;sn>=0;sn--){var Dt=Y[sn];if(Dt.prefix===""&&Dt.namespace===v.namespaceURI){pt=Dt.namespace;break}}if(pt!==v.namespaceURI)for(var sn=Y.length-1;sn>=0;sn--){var Dt=Y[sn];if(Dt.namespace===v.namespaceURI){Dt.prefix&&(kt=Dt.prefix+":"+it);break}}}y.push("<",kt);for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);Ht.prefix=="xmlns"?Y.push({prefix:Ht.localName,namespace:Ht.value}):Ht.nodeName=="xmlns"&&Y.push({prefix:"",namespace:Ht.value})}for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);if(Xe(Ht,ae,Y)){var _n=Ht.prefix||"",at=Ht.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),Y.push({prefix:_n,namespace:at})}Pt(Ht,y,R,Y)}if(it===kt&&Xe(v,ae,Y)){var _n=v.prefix||"",at=v.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),Y.push({prefix:_n,namespace:at})}var Yr=!lt;if(Yr&&(ae||v.namespaceURI===c.HTML)&&(Yr=i(it)),Yr)y.push("/>");else{if(y.push(">"),ae&&s(it))for(;lt;)lt.data?y.push(lt.data):Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;else for(;lt;)Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;y.push("</",kt,">")}return;case $:case U:for(var lt=v.firstChild;lt;)Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;return;case W:return Lt(y,v.name,v.value);case N:return y.push(v.data.replace(/[<&>]/g,Ce));case M:return y.push(h.CDATA_START,v.data,h.CDATA_END);case D:return y.push(h.COMMENT_START,v.data,h.COMMENT_END);case z:var Ro=v.publicId,Ln=v.systemId;y.push(h.DOCTYPE_DECL_START," ",v.name),Ro?(y.push(" ",h.PUBLIC," ",Ro),Ln&&Ln!=="."&&y.push(" ",Ln)):Ln&&Ln!=="."&&y.push(" ",h.SYSTEM," ",Ln),v.internalSubset&&y.push(" [",v.internalSubset,"]"),y.push(">");return;case A:return y.push("<?",v.target," ",v.data,"?>");case T:return y.push("&",v.nodeName,";");default:y.push("??",v.nodeName)}}function xn(v,y,R){var Y;switch(y.nodeType){case B:Y=y.cloneNode(!1),Y.ownerDocument=v;case U:break;case W:R=!0;break}if(Y||(Y=y.cloneNode(!1)),Y.ownerDocument=v,Y.parentNode=null,R)for(var re=y.firstChild;re;)Y.appendChild(xn(v,re,R)),re=re.nextSibling;return Y}function vr(v,y,R){var Y=new y.constructor(u);for(var re in y)if(r(y,re)){var ae=y[re];typeof ae!="object"&&ae!=Y[re]&&(Y[re]=ae)}switch(y.childNodes&&(Y.childNodes=new Z),Y.ownerDocument=v,Y.nodeType){case B:var ke=y.attributes,et=Y.attributes=new ce,it=ke.length;et._ownerElement=Y;for(var kt=0;kt<it;kt++)Y.setAttributeNode(vr(v,ke.item(kt),!0));break;case W:R=!0}if(R)for(var pt=y.firstChild;pt;)Y.appendChild(vr(v,pt,R)),pt=pt.nextSibling;return Y}function dn(v,y,R){v[y]=R}try{if(Object.defineProperty){let v=function(y){switch(y.nodeType){case B:case U:var R=[];for(y=y.firstChild;y;)y.nodeType!==7&&y.nodeType!==8&&R.push(v(y)),y=y.nextSibling;return R.join("");default:return y.nodeValue}};Object.defineProperty(X.prototype,"length",{get:function(){return le(this),this.$$length}}),Object.defineProperty(ie.prototype,"textContent",{get:function(){return v(this)},set:function(y){switch(this.nodeType){case B:case U:for(;this.firstChild;)this.removeChild(this.firstChild);(y||String(y))&&this.appendChild(this.ownerDocument.createTextNode(y));break;default:this.data=y,this.value=y,this.nodeValue=y}}}),dn=function(y,R,Y){y["$$"+R]=Y}}}catch{}return tt._updateLiveList=le,tt.Attr=dt,tt.CDATASection=vn,tt.CharacterData=mt,tt.Comment=en,tt.Document=oe,tt.DocumentFragment=on,tt.DocumentType=tn,tt.DOMImplementation=we,tt.Element=Pe,tt.Entity=Et,tt.EntityReference=rn,tt.LiveNodeList=X,tt.NamedNodeMap=ce,tt.Node=ie,tt.NodeList=Z,tt.Notation=nn,tt.Text=Zt,tt.ProcessingInstruction=Vt,tt.XMLSerializer=In,tt}var Qr={},wl={},md;function mv(){return md||(md=1,function(t){var e=fs().freeze;t.XML_ENTITIES=e({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),t.HTML_ENTITIES=e({Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",Gt:"≫",GT:">",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬",int:"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",Lt:"≪",LT:"<",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}),t.entityMap=t.HTML_ENTITIES}(wl)),wl}var Ss={},gd;function gv(){if(gd)return Ss;gd=1;var t=fs(),e=jh(),n=Aa(),r=t.isHTMLEscapableRawTextElement,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.hasOwn,a=t.NAMESPACE,c=n.ParseError,u=n.DOMException,d=0,p=1,f=2,h=3,b=4,x=5,C=6,E=7;function _(){}_.prototype={parse:function(A,D,$){var z=this.domBuilder;z.startDocument(),B(D,D=Object.create(null)),j(A,D,$,z,this.errorHandler),z.endDocument()}};var S=/&#?\w+;?/g;function j(A,D,$,z,U){var G=o(z.mimeType);A.indexOf(e.UNICODE_REPLACEMENT_CHARACTER)>=0&&U.warning("Unicode replacement character detected, source encoding issues?");function J(fe){if(fe>65535){fe-=65536;var Pe=55296+(fe>>10),dt=56320+(fe&1023);return String.fromCharCode(Pe,dt)}else return String.fromCharCode(fe)}function ee(fe){var Pe=fe[fe.length-1]===";"?fe:fe+";";if(!G&&Pe!==fe)return U.error("EntityRef: expecting ;"),fe;var dt=e.Reference.exec(Pe);if(!dt||dt[0].length!==Pe.length)return U.error("entity not matching Reference production: "+fe),fe;var mt=Pe.slice(1,-1);return i($,mt)?$[mt]:mt.charAt(0)==="#"?J(parseInt(mt.substring(1).replace("x","0x"))):(U.error("entity not found:"+fe),fe)}function te(fe){if(fe>we){var Pe=A.substring(we,fe).replace(S,ee);ce&&ue(we),z.characters(Pe,0,fe-we),we=fe}}var Z=0,X=0,le=/\r\n?|\n|$/g,ce=z.locator;function ue(fe,Pe){for(;fe>=X&&(Pe=le.exec(A));)Z=X,X=Pe.index+Pe[0].length,ce.lineNumber++;ce.columnNumber=fe-Z+1}for(var me=[{currentNSMap:D}],he=[],we=0;;){try{var ie=A.indexOf("<",we);if(ie<0){if(!G&&he.length>0)return U.fatalError("unclosed xml tag(s): "+he.join(", "));if(!A.substring(we).match(/^\s*$/)){var Ce=z.doc,Me=Ce.createTextNode(A.substring(we));if(Ce.documentElement)return U.error("Extra content at the end of the document");Ce.appendChild(Me),z.currentElement=Me}return}if(ie>we){var oe=A.substring(we,ie);!G&&he.length===0&&(oe=oe.replace(new RegExp(e.S_OPT.source,"g"),""),oe&&U.error("Unexpected content outside root element: '"+oe+"'")),te(ie)}switch(A.charAt(ie+1)){case"/":var Ve=A.indexOf(">",ie+2),be=A.substring(ie+2,Ve>0?Ve:void 0);if(!be)return U.fatalError("end tag name missing");var Ne=Ve>0&&e.reg("^",e.QName_group,e.S_OPT,"$").exec(be);if(!Ne)return U.fatalError('end tag name contains invalid characters: "'+be+'"');if(!z.currentElement&&!z.doc.documentElement)return;var je=he[he.length-1]||z.currentElement.tagName||z.doc.documentElement.tagName||"";if(je!==Ne[1]){var qe=Ne[1].toLowerCase();if(!G||je.toLowerCase()!==qe)return U.fatalError('Opening and ending tag mismatch: "'+je+'" != "'+be+'"')}var Ze=me.pop();he.pop();var Je=Ze.localNSMap;if(z.endElement(Ze.uri,Ze.localName,je),Je)for(var ot in Je)i(Je,ot)&&z.endPrefixMapping(ot);Ve++;break;case"?":ce&&ue(ie),Ve=T(A,ie,z,U);break;case"!":ce&&ue(ie),Ve=M(A,ie,z,U,G);break;default:ce&&ue(ie);var Ee=new L,ut=me[me.length-1].currentNSMap,Ve=O(A,ie,Ee,ut,ee,U,G),bn=Ee.length;if(Ee.closed||(G&&t.isHTMLVoidElement(Ee.tagName)?Ee.closed=!0:he.push(Ee.tagName)),ce&&bn){for(var Xt=P(ce,{}),Ut=0;Ut<bn;Ut++){var Qt=Ee[Ut];ue(Qt.offset),Qt.locator=P(ce,{})}z.locator=Xt,F(Ee,z,ut)&&me.push(Ee),z.locator=ce}else F(Ee,z,ut)&&me.push(Ee);G&&!Ee.closed?Ve=q(A,Ve,Ee.tagName,ee,z):Ve++}}catch(fe){if(fe instanceof c)throw fe;if(fe instanceof u)throw new c(fe.name+": "+fe.message,z.locator,fe);U.error("element parse error: "+fe),Ve=-1}Ve>we?we=Ve:te(Math.max(ie,we)+1)}}function P(A,D){return D.lineNumber=A.lineNumber,D.columnNumber=A.columnNumber,D}function O(A,D,$,z,U,G,J){function ee(ue,me,he){if(i($.attributeNames,ue))return G.fatalError("Attribute "+ue+" redefined");if(!J&&me.indexOf("<")>=0)return G.fatalError("Unescaped '<' not allowed in attributes values");$.addValue(ue,me.replace(/[\t\n\r]/g," ").replace(S,U),he)}for(var te,Z,X=++D,le=d;;){var ce=A.charAt(X);switch(ce){case"=":if(le===p)te=A.slice(D,X),le=h;else if(le===f)le=h;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(le===h||le===p)if(le===p&&(G.warning('attribute value must after "="'),te=A.slice(D,X)),D=X+1,X=A.indexOf(ce,D),X>0)Z=A.slice(D,X),ee(te,Z,D-1),le=x;else throw new Error("attribute value no end '"+ce+"' match");else if(le==b)Z=A.slice(D,X),ee(te,Z,D),G.warning('attribute "'+te+'" missed start quot('+ce+")!!"),D=X+1,le=x;else throw new Error('attribute value must after "="');break;case"/":switch(le){case d:$.setTagName(A.slice(D,X));case x:case C:case E:le=E,$.closed=!0;case b:case p:break;case f:$.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return G.error("unexpected end of input"),le==d&&$.setTagName(A.slice(D,X)),X;case">":switch(le){case d:$.setTagName(A.slice(D,X));case x:case C:case E:break;case b:case p:Z=A.slice(D,X),Z.slice(-1)==="/"&&($.closed=!0,Z=Z.slice(0,-1));case f:le===f&&(Z=te),le==b?(G.warning('attribute "'+Z+'" missed quot(")!'),ee(te,Z,D)):(J||G.warning('attribute "'+Z+'" missed value!! "'+Z+'" instead!!'),ee(Z,Z,D));break;case h:if(!J)return G.fatalError(`AttValue: ' or " expected`)}return X;case"":ce=" ";default:if(ce<=" ")switch(le){case d:$.setTagName(A.slice(D,X)),le=C;break;case p:te=A.slice(D,X),le=f;break;case b:var Z=A.slice(D,X);G.warning('attribute "'+Z+'" missed quot(")!!'),ee(te,Z,D);case x:le=C;break}else switch(le){case f:J||G.warning('attribute "'+te+'" missed value!! "'+te+'" instead2!!'),ee(te,te,D),D=X,le=p;break;case x:G.warning('attribute space is required"'+te+'"!!');case C:le=p,D=X;break;case h:le=b,D=X;break;case E:throw new Error("elements closed character '/' and '>' must be connected to")}}X++}}function F(A,D,$){for(var z=A.tagName,U=null,le=A.length;le--;){var G=A[le],J=G.qName,ee=G.value,ce=J.indexOf(":");if(ce>0)var te=G.prefix=J.slice(0,ce),Z=J.slice(ce+1),X=te==="xmlns"&&Z;else Z=J,te=null,X=J==="xmlns"&&"";G.localName=Z,X!==!1&&(U==null&&(U=Object.create(null),B($,$=Object.create(null))),$[X]=U[X]=ee,G.uri=a.XMLNS,D.startPrefixMapping(X,ee))}for(var le=A.length;le--;)G=A[le],G.prefix&&(G.prefix==="xml"&&(G.uri=a.XML),G.prefix!=="xmlns"&&(G.uri=$[G.prefix]));var ce=z.indexOf(":");ce>0?(te=A.prefix=z.slice(0,ce),Z=A.localName=z.slice(ce+1)):(te=null,Z=A.localName=z);var ue=A.uri=$[te||""];if(D.startElement(ue,Z,z,A),A.closed){if(D.endElement(ue,Z,z),U)for(te in U)i(U,te)&&D.endPrefixMapping(te)}else return A.currentNSMap=$,A.localNSMap=U,!0}function q(A,D,$,z,U){var G=r($);if(G||s($)){var J=A.indexOf("</"+$+">",D),ee=A.substring(D+1,J);return G&&(ee=ee.replace(S,z)),U.characters(ee,0,ee.length),J}return D+1}function B(A,D){for(var $ in A)i(A,$)&&(D[$]=A[$])}function W(A,D){var $=D;function z(X){return X=X||0,A.charAt($+X)}function U(X){X=X||1,$+=X}function G(){for(var X=0;$<A.length;){var le=z();if(le!==" "&&le!==`
`&&le!=="	"&&le!=="\r")return X;X++,U()}return-1}function J(){return A.substring($)}function ee(X){return A.substring($,$+X.length)===X}function te(X){return A.substring($,$+X.length).toUpperCase()===X.toUpperCase()}function Z(X){var le=e.reg("^",X),ce=le.exec(J());return ce?(U(ce[0].length),ce[0]):null}return{char:z,getIndex:function(){return $},getMatch:Z,getSource:function(){return A},skip:U,skipBlanks:G,substringFromIndex:J,substringStartsWith:ee,substringStartsWithCaseInsensitive:te}}function N(A,D){function $(ee,te){var Z=e.PI.exec(ee.substringFromIndex());return Z?Z[1].toLowerCase()==="xml"?te.fatalError("xml declaration is only allowed at the start of the document, but found at position "+ee.getIndex()):(ee.skip(Z[0].length),Z[0]):te.fatalError("processing instruction is not well-formed at position "+ee.getIndex())}var z=A.getSource();if(A.char()==="["){A.skip(1);for(var U=A.getIndex();A.getIndex()<z.length;){if(A.skipBlanks(),A.char()==="]"){var G=z.substring(U,A.getIndex());return A.skip(1),G}var J=null;if(A.char()==="<"&&A.char(1)==="!")switch(A.char(2)){case"E":A.char(3)==="L"?J=A.getMatch(e.elementdecl):A.char(3)==="N"&&(J=A.getMatch(e.EntityDecl));break;case"A":J=A.getMatch(e.AttlistDecl);break;case"N":J=A.getMatch(e.NotationDecl);break;case"-":J=A.getMatch(e.Comment);break}else if(A.char()==="<"&&A.char(1)==="?")J=$(A,D);else if(A.char()==="%")J=A.getMatch(e.PEReference);else return D.fatalError("Error detected in Markup declaration");if(!J)return D.fatalError("Error in internal subset at position "+A.getIndex())}return D.fatalError("doctype internal subset is not well-formed, missing ]")}}function M(A,D,$,z,U){var G=W(A,D);switch(U?G.char(2).toUpperCase():G.char(2)){case"-":var J=G.getMatch(e.Comment);return J?($.comment(J,e.COMMENT_START.length,J.length-e.COMMENT_START.length-e.COMMENT_END.length),G.getIndex()):z.fatalError("comment is not well-formed at position "+G.getIndex());case"[":var ee=G.getMatch(e.CDSect);return ee?!U&&!$.currentElement?z.fatalError("CDATA outside of element"):($.startCDATA(),$.characters(ee,e.CDATA_START.length,ee.length-e.CDATA_START.length-e.CDATA_END.length),$.endCDATA(),G.getIndex()):z.fatalError("Invalid CDATA starting at position "+D);case"D":{if($.doc&&$.doc.documentElement)return z.fatalError("Doctype not allowed inside or after documentElement at position "+G.getIndex());if(U?!G.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START):!G.substringStartsWith(e.DOCTYPE_DECL_START))return z.fatalError("Expected "+e.DOCTYPE_DECL_START+" at position "+G.getIndex());if(G.skip(e.DOCTYPE_DECL_START.length),G.skipBlanks()<1)return z.fatalError("Expected whitespace after "+e.DOCTYPE_DECL_START+" at position "+G.getIndex());var te={name:void 0,publicId:void 0,systemId:void 0,internalSubset:void 0};if(te.name=G.getMatch(e.Name),!te.name)return z.fatalError("doctype name missing or contains unexpected characters at position "+G.getIndex());if(U&&te.name.toLowerCase()!=="html"&&z.warning("Unexpected DOCTYPE in HTML document at position "+G.getIndex()),G.skipBlanks(),G.substringStartsWith(e.PUBLIC)||G.substringStartsWith(e.SYSTEM)){var Z=e.ExternalID_match.exec(G.substringFromIndex());if(!Z)return z.fatalError("doctype external id is not well-formed at position "+G.getIndex());Z.groups.SystemLiteralOnly!==void 0?te.systemId=Z.groups.SystemLiteralOnly:(te.systemId=Z.groups.SystemLiteral,te.publicId=Z.groups.PubidLiteral),G.skip(Z[0].length)}else if(U&&G.substringStartsWithCaseInsensitive(e.SYSTEM)){if(G.skip(e.SYSTEM.length),G.skipBlanks()<1)return z.fatalError("Expected whitespace after "+e.SYSTEM+" at position "+G.getIndex());if(te.systemId=G.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral),!te.systemId)return z.fatalError("Expected "+e.ABOUT_LEGACY_COMPAT+" in single or double quotes after "+e.SYSTEM+" at position "+G.getIndex())}return U&&te.systemId&&!e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(te.systemId)&&z.warning("Unexpected doctype.systemId in HTML document at position "+G.getIndex()),U||(G.skipBlanks(),te.internalSubset=N(G,z)),G.skipBlanks(),G.char()!==">"?z.fatalError("doctype not terminated with > at position "+G.getIndex()):(G.skip(1),$.startDTD(te.name,te.publicId,te.systemId,te.internalSubset),$.endDTD(),G.getIndex())}default:return z.fatalError('Not well-formed XML starting with "<!" at position '+D)}}function T(A,D,$,z){var U=A.substring(D).match(e.PI);if(!U)return z.fatalError("Invalid processing instruction starting at position "+D);if(U[1].toLowerCase()==="xml"){if(D>0)return z.fatalError("processing instruction at position "+D+" is an xml declaration which is only at the start of the document");if(!e.XMLDecl.test(A.substring(D)))return z.fatalError("xml declaration is not well-formed")}return $.processingInstruction(U[1],U[2]),D+U[0].length}function L(){this.attributeNames=Object.create(null)}return L.prototype={setTagName:function(A){if(!e.QName_exact.test(A))throw new Error("invalid tagName:"+A);this.tagName=A},addValue:function(A,D,$){if(!e.QName_exact.test(A))throw new Error("invalid attribute:"+A);this.attributeNames[A]=this.length,this[this.length++]={qName:A,value:D,offset:$}},length:0,getLocalName:function(A){return this[A].localName},getLocator:function(A){return this[A].locator},getQName:function(A){return this[A].qName},getURI:function(A){return this[A].uri},getValue:function(A){return this[A].value}},Ss.XMLReader=_,Ss.parseUtils=W,Ss.parseDoctypeCommentOrCData=M,Ss}var bd;function bv(){if(bd)return Qr;bd=1;var t=fs(),e=Ih(),n=Aa(),r=mv(),o=gv(),s=e.DOMImplementation,i=t.hasDefaultHTMLNamespace,a=t.isHTMLMimeType,c=t.isValidMimeType,u=t.MIME_TYPE,d=t.NAMESPACE,p=n.ParseError,f=o.XMLReader;function h(O){return O.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028\u2029]/g,`
`)}function b(O){if(O=O||{},O.locator===void 0&&(O.locator=!0),this.assign=O.assign||t.assign,this.domHandler=O.domHandler||x,this.onError=O.onError||O.errorHandler,O.errorHandler&&typeof O.errorHandler!="function")throw new TypeError("errorHandler object is no longer supported, switch to onError!");O.errorHandler&&O.errorHandler("warning","The `errorHandler` option has been deprecated, use `onError` instead!",this),this.normalizeLineEndings=O.normalizeLineEndings||h,this.locator=!!O.locator,this.xmlns=this.assign(Object.create(null),O.xmlns)}b.prototype.parseFromString=function(O,F){if(!c(F))throw new TypeError('DOMParser.parseFromString: the provided mimeType "'+F+'" is not valid.');var q=this.assign(Object.create(null),this.xmlns),B=r.XML_ENTITIES,W=q[""]||null;i(F)?(B=r.HTML_ENTITIES,W=d.HTML):F===u.XML_SVG_IMAGE&&(W=d.SVG),q[""]=W,q.xml=q.xml||d.XML;var N=new this.domHandler({mimeType:F,defaultNamespace:W,onError:this.onError}),M=this.locator?{}:void 0;this.locator&&N.setDocumentLocator(M);var T=new f;T.errorHandler=N,T.domBuilder=N;var L=!t.isHTMLMimeType(F);return L&&typeof O!="string"&&T.errorHandler.fatalError("source is not a string"),T.parse(this.normalizeLineEndings(String(O)),q,B),N.doc.documentElement||T.errorHandler.fatalError("missing root element"),N.doc};function x(O){var F=O||{};this.mimeType=F.mimeType||u.XML_APPLICATION,this.defaultNamespace=F.defaultNamespace||null,this.cdata=!1,this.currentElement=void 0,this.doc=void 0,this.locator=void 0,this.onError=F.onError}function C(O,F){F.lineNumber=O.lineNumber,F.columnNumber=O.columnNumber}x.prototype={startDocument:function(){var O=new s;this.doc=a(this.mimeType)?O.createHTMLDocument(!1):O.createDocument(this.defaultNamespace,"")},startElement:function(O,F,q,B){var W=this.doc,N=W.createElementNS(O,q||F),M=B.length;S(this,N),this.currentElement=N,this.locator&&C(this.locator,N);for(var T=0;T<M;T++){var O=B.getURI(T),L=B.getValue(T),q=B.getQName(T),A=W.createAttributeNS(O,q);this.locator&&C(B.getLocator(T),A),A.value=A.nodeValue=L,N.setAttributeNode(A)}},endElement:function(O,F,q){this.currentElement=this.currentElement.parentNode},startPrefixMapping:function(O,F){},endPrefixMapping:function(O){},processingInstruction:function(O,F){var q=this.doc.createProcessingInstruction(O,F);this.locator&&C(this.locator,q),S(this,q)},ignorableWhitespace:function(O,F,q){},characters:function(O,F,q){if(O=_.apply(this,arguments),O){if(this.cdata)var B=this.doc.createCDATASection(O);else var B=this.doc.createTextNode(O);this.currentElement?this.currentElement.appendChild(B):/^\s*$/.test(O)&&this.doc.appendChild(B),this.locator&&C(this.locator,B)}},skippedEntity:function(O){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(O){O&&(O.lineNumber=0),this.locator=O},comment:function(O,F,q){O=_.apply(this,arguments);var B=this.doc.createComment(O);this.locator&&C(this.locator,B),S(this,B)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(O,F,q,B){var W=this.doc.implementation;if(W&&W.createDocumentType){var N=W.createDocumentType(O,F,q,B);this.locator&&C(this.locator,N),S(this,N),this.doc.doctype=N}},reportError:function(O,F){if(typeof this.onError=="function")try{this.onError(O,F,this)}catch(q){throw new p("Reporting "+O+' "'+F+'" caused '+q,this.locator)}else console.error("[xmldom "+O+"]	"+F,E(this.locator))},warning:function(O){this.reportError("warning",O)},error:function(O){this.reportError("error",O)},fatalError:function(O){throw this.reportError("fatalError",O),new p(O,this.locator)}};function E(O){if(O)return`
@#[line:`+O.lineNumber+",col:"+O.columnNumber+"]"}function _(O,F,q){return typeof O=="string"?O.substr(F,q):O.length>=F+q||F?new java.lang.String(O,F,q)+"":O}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(O){x.prototype[O]=function(){return null}});function S(O,F){O.currentElement?O.currentElement.appendChild(F):O.doc.appendChild(F)}function j(O){if(O==="error")throw"onErrorStopParsing"}function P(){throw"onWarningStopParsing"}return Qr.__DOMHandler=x,Qr.DOMParser=b,Qr.normalizeLineEndings=h,Qr.onErrorStopParsing=j,Qr.onWarningStopParsing=P,Qr}var vd;function vv(){if(vd)return De;vd=1;var t=fs();De.assign=t.assign,De.hasDefaultHTMLNamespace=t.hasDefaultHTMLNamespace,De.isHTMLMimeType=t.isHTMLMimeType,De.isValidMimeType=t.isValidMimeType,De.MIME_TYPE=t.MIME_TYPE,De.NAMESPACE=t.NAMESPACE;var e=Aa();De.DOMException=e.DOMException,De.DOMExceptionName=e.DOMExceptionName,De.ExceptionCode=e.ExceptionCode,De.ParseError=e.ParseError;var n=Ih();De.Attr=n.Attr,De.CDATASection=n.CDATASection,De.CharacterData=n.CharacterData,De.Comment=n.Comment,De.Document=n.Document,De.DocumentFragment=n.DocumentFragment,De.DocumentType=n.DocumentType,De.DOMImplementation=n.DOMImplementation,De.Element=n.Element,De.Entity=n.Entity,De.EntityReference=n.EntityReference,De.LiveNodeList=n.LiveNodeList,De.NamedNodeMap=n.NamedNodeMap,De.Node=n.Node,De.NodeList=n.NodeList,De.Notation=n.Notation,De.ProcessingInstruction=n.ProcessingInstruction,De.Text=n.Text,De.XMLSerializer=n.XMLSerializer;var r=bv();return De.DOMParser=r.DOMParser,De.normalizeLineEndings=r.normalizeLineEndings,De.onErrorStopParsing=r.onErrorStopParsing,De.onWarningStopParsing=r.onWarningStopParsing,De}vv();const Us="USJ",Vs="3.1",Lh=Object.freeze({type:Us,version:Vs,content:[]}),xv=["type","marker","content","sid","eid","number","code","altnumber","pubnumber","caller","align","category"];function yv(t){return _v.includes(t)}const _v=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","EZA","5EZ","6EZ","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX","XXA","XXB","XXC","XXD","XXE","XXF","XXG"],Yl="$",Ph=".content[";function Cv(t){const e=t.split(Ph);if(e.shift()!==Yl)throw new Error(`indexesFromJsonPath: jsonPath didn't start with '${Yl}'`);return e.map(n=>parseInt(n,10))}function Ev(t){return t.reduce((e,n)=>`${e}${Ph}${n}]`,Yl)}var Ri={exports:{}},ml,xd;function kv(){if(xd)return ml;xd=1;var t=-1,e=1,n=0;function r(N,M,T,L,A){if(N===M)return N?[[n,N]]:[];if(T!=null){var D=B(N,M,T);if(D)return D}var $=a(N,M),z=N.substring(0,$);N=N.substring($),M=M.substring($),$=u(N,M);var U=N.substring(N.length-$);N=N.substring(0,N.length-$),M=M.substring(0,M.length-$);var G=o(N,M);return z&&G.unshift([n,z]),U&&G.push([n,U]),_(G,A),L&&p(G),G}function o(N,M){var T;if(!N)return[[e,M]];if(!M)return[[t,N]];var L=N.length>M.length?N:M,A=N.length>M.length?M:N,D=L.indexOf(A);if(D!==-1)return T=[[e,L.substring(0,D)],[n,A],[e,L.substring(D+A.length)]],N.length>M.length&&(T[0][0]=T[2][0]=t),T;if(A.length===1)return[[t,N],[e,M]];var $=d(N,M);if($){var z=$[0],U=$[1],G=$[2],J=$[3],ee=$[4],te=r(z,G),Z=r(U,J);return te.concat([[n,ee]],Z)}return s(N,M)}function s(N,M){for(var T=N.length,L=M.length,A=Math.ceil((T+L)/2),D=A,$=2*A,z=new Array($),U=new Array($),G=0;G<$;G++)z[G]=-1,U[G]=-1;z[D+1]=0,U[D+1]=0;for(var J=T-L,ee=J%2!==0,te=0,Z=0,X=0,le=0,ce=0;ce<A;ce++){for(var ue=-ce+te;ue<=ce-Z;ue+=2){var me=D+ue,he;ue===-ce||ue!==ce&&z[me-1]<z[me+1]?he=z[me+1]:he=z[me-1]+1;for(var we=he-ue;he<T&&we<L&&N.charAt(he)===M.charAt(we);)he++,we++;if(z[me]=he,he>T)Z+=2;else if(we>L)te+=2;else if(ee){var ie=D+J-ue;if(ie>=0&&ie<$&&U[ie]!==-1){var Ce=T-U[ie];if(he>=Ce)return i(N,M,he,we)}}}for(var Me=-ce+X;Me<=ce-le;Me+=2){var ie=D+Me,Ce;Me===-ce||Me!==ce&&U[ie-1]<U[ie+1]?Ce=U[ie+1]:Ce=U[ie-1]+1;for(var oe=Ce-Me;Ce<T&&oe<L&&N.charAt(T-Ce-1)===M.charAt(L-oe-1);)Ce++,oe++;if(U[ie]=Ce,Ce>T)le+=2;else if(oe>L)X+=2;else if(!ee){var me=D+J-Me;if(me>=0&&me<$&&z[me]!==-1){var he=z[me],we=D+he-me;if(Ce=T-Ce,he>=Ce)return i(N,M,he,we)}}}}return[[t,N],[e,M]]}function i(N,M,T,L){var A=N.substring(0,T),D=M.substring(0,L),$=N.substring(T),z=M.substring(L),U=r(A,D),G=r($,z);return U.concat(G)}function a(N,M){if(!N||!M||N.charAt(0)!==M.charAt(0))return 0;for(var T=0,L=Math.min(N.length,M.length),A=L,D=0;T<A;)N.substring(D,A)==M.substring(D,A)?(T=A,D=T):L=A,A=Math.floor((L-T)/2+T);return S(N.charCodeAt(A-1))&&A--,A}function c(N,M){var T=N.length,L=M.length;if(T==0||L==0)return 0;T>L?N=N.substring(T-L):T<L&&(M=M.substring(0,T));var A=Math.min(T,L);if(N==M)return A;for(var D=0,$=1;;){var z=N.substring(A-$),U=M.indexOf(z);if(U==-1)return D;$+=U,(U==0||N.substring(A-$)==M.substring(0,$))&&(D=$,$++)}}function u(N,M){if(!N||!M||N.slice(-1)!==M.slice(-1))return 0;for(var T=0,L=Math.min(N.length,M.length),A=L,D=0;T<A;)N.substring(N.length-A,N.length-D)==M.substring(M.length-A,M.length-D)?(T=A,D=T):L=A,A=Math.floor((L-T)/2+T);return j(N.charCodeAt(N.length-A))&&A--,A}function d(N,M){var T=N.length>M.length?N:M,L=N.length>M.length?M:N;if(T.length<4||L.length*2<T.length)return null;function A(Z,X,le){for(var ce=Z.substring(le,le+Math.floor(Z.length/4)),ue=-1,me="",he,we,ie,Ce;(ue=X.indexOf(ce,ue+1))!==-1;){var Me=a(Z.substring(le),X.substring(ue)),oe=u(Z.substring(0,le),X.substring(0,ue));me.length<oe+Me&&(me=X.substring(ue-oe,ue)+X.substring(ue,ue+Me),he=Z.substring(0,le-oe),we=Z.substring(le+Me),ie=X.substring(0,ue-oe),Ce=X.substring(ue+Me))}return me.length*2>=Z.length?[he,we,ie,Ce,me]:null}var D=A(T,L,Math.ceil(T.length/4)),$=A(T,L,Math.ceil(T.length/2)),z;if(!D&&!$)return null;$?D?z=D[4].length>$[4].length?D:$:z=$:z=D;var U,G,J,ee;N.length>M.length?(U=z[0],G=z[1],J=z[2],ee=z[3]):(J=z[0],ee=z[1],U=z[2],G=z[3]);var te=z[4];return[U,G,J,ee,te]}function p(N){for(var M=!1,T=[],L=0,A=null,D=0,$=0,z=0,U=0,G=0;D<N.length;)N[D][0]==n?(T[L++]=D,$=U,z=G,U=0,G=0,A=N[D][1]):(N[D][0]==e?U+=N[D][1].length:G+=N[D][1].length,A&&A.length<=Math.max($,z)&&A.length<=Math.max(U,G)&&(N.splice(T[L-1],0,[t,A]),N[T[L-1]+1][0]=e,L--,L--,D=L>0?T[L-1]:-1,$=0,z=0,U=0,G=0,A=null,M=!0)),D++;for(M&&_(N),E(N),D=1;D<N.length;){if(N[D-1][0]==t&&N[D][0]==e){var J=N[D-1][1],ee=N[D][1],te=c(J,ee),Z=c(ee,J);te>=Z?(te>=J.length/2||te>=ee.length/2)&&(N.splice(D,0,[n,ee.substring(0,te)]),N[D-1][1]=J.substring(0,J.length-te),N[D+1][1]=ee.substring(te),D++):(Z>=J.length/2||Z>=ee.length/2)&&(N.splice(D,0,[n,J.substring(0,Z)]),N[D-1][0]=e,N[D-1][1]=ee.substring(0,ee.length-Z),N[D+1][0]=t,N[D+1][1]=J.substring(Z),D++),D++}D++}}var f=/[^a-zA-Z0-9]/,h=/\s/,b=/[\r\n]/,x=/\n\r?\n$/,C=/^\r?\n\r?\n/;function E(N){function M(Z,X){if(!Z||!X)return 6;var le=Z.charAt(Z.length-1),ce=X.charAt(0),ue=le.match(f),me=ce.match(f),he=ue&&le.match(h),we=me&&ce.match(h),ie=he&&le.match(b),Ce=we&&ce.match(b),Me=ie&&Z.match(x),oe=Ce&&X.match(C);return Me||oe?5:ie||Ce?4:ue&&!he&&we?3:he||we?2:ue||me?1:0}for(var T=1;T<N.length-1;){if(N[T-1][0]==n&&N[T+1][0]==n){var L=N[T-1][1],A=N[T][1],D=N[T+1][1],$=u(L,A);if($){var z=A.substring(A.length-$);L=L.substring(0,L.length-$),A=z+A.substring(0,A.length-$),D=z+D}for(var U=L,G=A,J=D,ee=M(L,A)+M(A,D);A.charAt(0)===D.charAt(0);){L+=A.charAt(0),A=A.substring(1)+D.charAt(0),D=D.substring(1);var te=M(L,A)+M(A,D);te>=ee&&(ee=te,U=L,G=A,J=D)}N[T-1][1]!=U&&(U?N[T-1][1]=U:(N.splice(T-1,1),T--),N[T][1]=G,J?N[T+1][1]=J:(N.splice(T+1,1),T--))}T++}}function _(N,M){N.push([n,""]);for(var T=0,L=0,A=0,D="",$="",z;T<N.length;){if(T<N.length-1&&!N[T][1]){N.splice(T,1);continue}switch(N[T][0]){case e:A++,$+=N[T][1],T++;break;case t:L++,D+=N[T][1],T++;break;case n:var U=T-A-L-1;if(M){if(U>=0&&O(N[U][1])){var G=N[U][1].slice(-1);if(N[U][1]=N[U][1].slice(0,-1),D=G+D,$=G+$,!N[U][1]){N.splice(U,1),T--;var J=U-1;N[J]&&N[J][0]===e&&(A++,$=N[J][1]+$,J--),N[J]&&N[J][0]===t&&(L++,D=N[J][1]+D,J--),U=J}}if(P(N[T][1])){var G=N[T][1].charAt(0);N[T][1]=N[T][1].slice(1),D+=G,$+=G}}if(T<N.length-1&&!N[T][1]){N.splice(T,1);break}if(D.length>0||$.length>0){D.length>0&&$.length>0&&(z=a($,D),z!==0&&(U>=0?N[U][1]+=$.substring(0,z):(N.splice(0,0,[n,$.substring(0,z)]),T++),$=$.substring(z),D=D.substring(z)),z=u($,D),z!==0&&(N[T][1]=$.substring($.length-z)+N[T][1],$=$.substring(0,$.length-z),D=D.substring(0,D.length-z)));var ee=A+L;D.length===0&&$.length===0?(N.splice(T-ee,ee),T=T-ee):D.length===0?(N.splice(T-ee,ee,[e,$]),T=T-ee+1):$.length===0?(N.splice(T-ee,ee,[t,D]),T=T-ee+1):(N.splice(T-ee,ee,[t,D],[e,$]),T=T-ee+2)}T!==0&&N[T-1][0]===n?(N[T-1][1]+=N[T][1],N.splice(T,1)):T++,A=0,L=0,D="",$="";break}}N[N.length-1][1]===""&&N.pop();var te=!1;for(T=1;T<N.length-1;)N[T-1][0]===n&&N[T+1][0]===n&&(N[T][1].substring(N[T][1].length-N[T-1][1].length)===N[T-1][1]?(N[T][1]=N[T-1][1]+N[T][1].substring(0,N[T][1].length-N[T-1][1].length),N[T+1][1]=N[T-1][1]+N[T+1][1],N.splice(T-1,1),te=!0):N[T][1].substring(0,N[T+1][1].length)==N[T+1][1]&&(N[T-1][1]+=N[T+1][1],N[T][1]=N[T][1].substring(N[T+1][1].length)+N[T+1][1],N.splice(T+1,1),te=!0)),T++;te&&_(N,M)}function S(N){return N>=55296&&N<=56319}function j(N){return N>=56320&&N<=57343}function P(N){return j(N.charCodeAt(0))}function O(N){return S(N.charCodeAt(N.length-1))}function F(N){for(var M=[],T=0;T<N.length;T++)N[T][1].length>0&&M.push(N[T]);return M}function q(N,M,T,L){return O(N)||P(L)?null:F([[n,N],[t,M],[e,T],[n,L]])}function B(N,M,T){var L=typeof T=="number"?{index:T,length:0}:T.oldRange,A=typeof T=="number"?null:T.newRange,D=N.length,$=M.length;if(L.length===0&&(A===null||A.length===0)){var z=L.index,U=N.slice(0,z),G=N.slice(z),J=A?A.index:null;e:{var ee=z+$-D;if(J!==null&&J!==ee||ee<0||ee>$)break e;var te=M.slice(0,ee),Z=M.slice(ee);if(Z!==G)break e;var X=Math.min(z,ee),le=U.slice(0,X),ce=te.slice(0,X);if(le!==ce)break e;var ue=U.slice(X),me=te.slice(X);return q(le,ue,me,G)}e:{if(J!==null&&J!==z)break e;var he=z,te=M.slice(0,he),Z=M.slice(he);if(te!==U)break e;var we=Math.min(D-he,$-he),ie=G.slice(G.length-we),Ce=Z.slice(Z.length-we);if(ie!==Ce)break e;var ue=G.slice(0,G.length-we),me=Z.slice(0,Z.length-we);return q(U,ue,me,ie)}}if(L.length>0&&A&&A.length===0)e:{var le=N.slice(0,L.index),ie=N.slice(L.index+L.length),X=le.length,we=ie.length;if($<X+we)break e;var ce=M.slice(0,X),Ce=M.slice($-we);if(le!==ce||ie!==Ce)break e;var ue=N.slice(X,D-we),me=M.slice(X,$-we);return q(le,ue,me,ie)}return null}function W(N,M,T,L){return r(N,M,T,L,!0)}return W.INSERT=e,W.DELETE=t,W.EQUAL=n,ml=W,ml}var Os={exports:{}};Os.exports;var yd;function $h(){return yd||(yd=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=9007199254740991,s="[object Arguments]",i="[object Array]",a="[object Boolean]",c="[object Date]",u="[object Error]",d="[object Function]",p="[object GeneratorFunction]",f="[object Map]",h="[object Number]",b="[object Object]",x="[object Promise]",C="[object RegExp]",E="[object Set]",_="[object String]",S="[object Symbol]",j="[object WeakMap]",P="[object ArrayBuffer]",O="[object DataView]",F="[object Float32Array]",q="[object Float64Array]",B="[object Int8Array]",W="[object Int16Array]",N="[object Int32Array]",M="[object Uint8Array]",T="[object Uint8ClampedArray]",L="[object Uint16Array]",A="[object Uint32Array]",D=/[\\^$.*+?()[\]{}|]/g,$=/\w*$/,z=/^\[object .+?Constructor\]$/,U=/^(?:0|[1-9]\d*)$/,G={};G[s]=G[i]=G[P]=G[O]=G[a]=G[c]=G[F]=G[q]=G[B]=G[W]=G[N]=G[f]=G[h]=G[b]=G[C]=G[E]=G[_]=G[S]=G[M]=G[T]=G[L]=G[A]=!0,G[u]=G[d]=G[j]=!1;var J=typeof Nr=="object"&&Nr&&Nr.Object===Object&&Nr,ee=typeof self=="object"&&self&&self.Object===Object&&self,te=J||ee||Function("return this")(),Z=e&&!e.nodeType&&e,X=Z&&!0&&t&&!t.nodeType&&t,le=X&&X.exports===Z;function ce(m,k){return m.set(k[0],k[1]),m}function ue(m,k){return m.add(k),m}function me(m,k){for(var I=-1,Q=m?m.length:0;++I<Q&&k(m[I],I,m)!==!1;);return m}function he(m,k){for(var I=-1,Q=k.length,xe=m.length;++I<Q;)m[xe+I]=k[I];return m}function we(m,k,I,Q){for(var xe=-1,pe=m?m.length:0;++xe<pe;)I=k(I,m[xe],xe,m);return I}function ie(m,k){for(var I=-1,Q=Array(m);++I<m;)Q[I]=k(I);return Q}function Ce(m,k){return m==null?void 0:m[k]}function Me(m){var k=!1;if(m!=null&&typeof m.toString!="function")try{k=!!(m+"")}catch{}return k}function oe(m){var k=-1,I=Array(m.size);return m.forEach(function(Q,xe){I[++k]=[xe,Q]}),I}function be(m,k){return function(I){return m(k(I))}}function Ne(m){var k=-1,I=Array(m.size);return m.forEach(function(Q){I[++k]=Q}),I}var je=Array.prototype,qe=Function.prototype,Ze=Object.prototype,Je=te["__core-js_shared__"],ot=function(){var m=/[^.]+$/.exec(Je&&Je.keys&&Je.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),Ee=qe.toString,ut=Ze.hasOwnProperty,Ve=Ze.toString,bn=RegExp("^"+Ee.call(ut).replace(D,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Xt=le?te.Buffer:void 0,Ut=te.Symbol,Qt=te.Uint8Array,fe=be(Object.getPrototypeOf,Object),Pe=Object.create,dt=Ze.propertyIsEnumerable,mt=je.splice,Zt=Object.getOwnPropertySymbols,en=Xt?Xt.isBuffer:void 0,vn=be(Object.keys,Object),tn=Cn(te,"DataView"),nn=Cn(te,"Map"),Et=Cn(te,"Promise"),rn=Cn(te,"Set"),on=Cn(te,"WeakMap"),Vt=Cn(Object,"create"),In=$t(tn),$e=$t(nn),Xe=$t(Et),Lt=$t(rn),Pt=$t(on),xn=Ut?Ut.prototype:void 0,vr=xn?xn.valueOf:void 0;function dn(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function v(){this.__data__=Vt?Vt(null):{}}function y(m){return this.has(m)&&delete this.__data__[m]}function R(m){var k=this.__data__;if(Vt){var I=k[m];return I===r?void 0:I}return ut.call(k,m)?k[m]:void 0}function Y(m){var k=this.__data__;return Vt?k[m]!==void 0:ut.call(k,m)}function re(m,k){var I=this.__data__;return I[m]=Vt&&k===void 0?r:k,this}dn.prototype.clear=v,dn.prototype.delete=y,dn.prototype.get=R,dn.prototype.has=Y,dn.prototype.set=re;function ae(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=[]}function et(m){var k=this.__data__,I=jo(k,m);if(I<0)return!1;var Q=k.length-1;return I==Q?k.pop():mt.call(k,I,1),!0}function it(m){var k=this.__data__,I=jo(k,m);return I<0?void 0:k[I][1]}function kt(m){return jo(this.__data__,m)>-1}function pt(m,k){var I=this.__data__,Q=jo(I,m);return Q<0?I.push([m,k]):I[Q][1]=k,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=kt,ae.prototype.set=pt;function We(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function sn(){this.__data__={hash:new dn,map:new(nn||ae),string:new dn}}function Dt(m){return Jr(this,m).delete(m)}function yn(m){return Jr(this,m).get(m)}function Ht(m){return Jr(this,m).has(m)}function _n(m,k){return Jr(this,m).set(m,k),this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(m){this.__data__=new ae(m)}function Yr(){this.__data__=new ae}function lt(m){return this.__data__.delete(m)}function Ro(m){return this.__data__.get(m)}function Ln(m){return this.__data__.has(m)}function za(m,k){var I=this.__data__;if(I instanceof ae){var Q=I.__data__;if(!nn||Q.length<n-1)return Q.push([m,k]),this;I=this.__data__=new We(Q)}return I.set(m,k),this}at.prototype.clear=Yr,at.prototype.delete=lt,at.prototype.get=Ro,at.prototype.has=Ln,at.prototype.set=za;function Oo(m,k){var I=Es(m)||Lo(m)?ie(m.length,String):[],Q=I.length,xe=!!Q;for(var pe in m)ut.call(m,pe)&&!(xe&&(pe=="length"||sl(pe,Q)))&&I.push(pe);return I}function vi(m,k,I){var Q=m[k];(!(ut.call(m,k)&&Ei(Q,I))||I===void 0&&!(k in m))&&(m[k]=I)}function jo(m,k){for(var I=m.length;I--;)if(Ei(m[I][0],k))return I;return-1}function Pn(m,k){return m&&Cs(k,Ns(k),m)}function ys(m,k,I,Q,xe,pe,Ie){var Re;if(Q&&(Re=pe?Q(m,xe,pe,Ie):Q(m)),Re!==void 0)return Re;if(!Fn(m))return m;var ct=Es(m);if(ct){if(Re=rl(m),!k)return el(m,Re)}else{var Le=rr(m),Mt=Le==d||Le==p;if(ki(m))return Io(m,k);if(Le==b||Le==s||Mt&&!pe){if(Me(m))return pe?m:{};if(Re=$n(Mt?{}:m),!k)return tl(m,Pn(Re,m))}else{if(!G[Le])return pe?m:{};Re=ol(m,Le,ys,k)}}Ie||(Ie=new at);var zt=Ie.get(m);if(zt)return zt;if(Ie.set(m,Re),!ct)var ft=I?nl(m):Ns(m);return me(ft||m,function(Rt,Nt){ft&&(Nt=Rt,Rt=m[Nt]),vi(Re,Nt,ys(Rt,k,I,Q,Nt,m,Ie))}),Re}function Ga(m){return Fn(m)?Pe(m):{}}function Ka(m,k,I){var Q=k(m);return Es(m)?Q:he(Q,I(m))}function Ya(m){return Ve.call(m)}function Wa(m){if(!Fn(m)||al(m))return!1;var k=ks(m)||Me(m)?bn:z;return k.test($t(m))}function Ja(m){if(!_i(m))return vn(m);var k=[];for(var I in Object(m))ut.call(m,I)&&I!="constructor"&&k.push(I);return k}function Io(m,k){if(k)return m.slice();var I=new m.constructor(m.length);return m.copy(I),I}function _s(m){var k=new m.constructor(m.byteLength);return new Qt(k).set(new Qt(m)),k}function Wr(m,k){var I=k?_s(m.buffer):m.buffer;return new m.constructor(I,m.byteOffset,m.byteLength)}function xi(m,k,I){var Q=k?I(oe(m),!0):oe(m);return we(Q,ce,new m.constructor)}function yi(m){var k=new m.constructor(m.source,$.exec(m));return k.lastIndex=m.lastIndex,k}function Xa(m,k,I){var Q=k?I(Ne(m),!0):Ne(m);return we(Q,ue,new m.constructor)}function Qa(m){return vr?Object(vr.call(m)):{}}function Za(m,k){var I=k?_s(m.buffer):m.buffer;return new m.constructor(I,m.byteOffset,m.length)}function el(m,k){var I=-1,Q=m.length;for(k||(k=Array(Q));++I<Q;)k[I]=m[I];return k}function Cs(m,k,I,Q){I||(I={});for(var xe=-1,pe=k.length;++xe<pe;){var Ie=k[xe],Re=void 0;vi(I,Ie,Re===void 0?m[Ie]:Re)}return I}function tl(m,k){return Cs(m,nr(m),k)}function nl(m){return Ka(m,Ns,nr)}function Jr(m,k){var I=m.__data__;return il(k)?I[typeof k=="string"?"string":"hash"]:I.map}function Cn(m,k){var I=Ce(m,k);return Wa(I)?I:void 0}var nr=Zt?be(Zt,Object):cl,rr=Ya;(tn&&rr(new tn(new ArrayBuffer(1)))!=O||nn&&rr(new nn)!=f||Et&&rr(Et.resolve())!=x||rn&&rr(new rn)!=E||on&&rr(new on)!=j)&&(rr=function(m){var k=Ve.call(m),I=k==b?m.constructor:void 0,Q=I?$t(I):void 0;if(Q)switch(Q){case In:return O;case $e:return f;case Xe:return x;case Lt:return E;case Pt:return j}return k});function rl(m){var k=m.length,I=m.constructor(k);return k&&typeof m[0]=="string"&&ut.call(m,"index")&&(I.index=m.index,I.input=m.input),I}function $n(m){return typeof m.constructor=="function"&&!_i(m)?Ga(fe(m)):{}}function ol(m,k,I,Q){var xe=m.constructor;switch(k){case P:return _s(m);case a:case c:return new xe(+m);case O:return Wr(m,Q);case F:case q:case B:case W:case N:case M:case T:case L:case A:return Za(m,Q);case f:return xi(m,Q,I);case h:case _:return new xe(m);case C:return yi(m);case E:return Xa(m,Q,I);case S:return Qa(m)}}function sl(m,k){return k=k??o,!!k&&(typeof m=="number"||U.test(m))&&m>-1&&m%1==0&&m<k}function il(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function al(m){return!!ot&&ot in m}function _i(m){var k=m&&m.constructor,I=typeof k=="function"&&k.prototype||Ze;return m===I}function $t(m){if(m!=null){try{return Ee.call(m)}catch{}try{return m+""}catch{}}return""}function Ci(m){return ys(m,!0,!0)}function Ei(m,k){return m===k||m!==m&&k!==k}function Lo(m){return ll(m)&&ut.call(m,"callee")&&(!dt.call(m,"callee")||Ve.call(m)==s)}var Es=Array.isArray;function Po(m){return m!=null&&Ni(m.length)&&!ks(m)}function ll(m){return Ti(m)&&Po(m)}var ki=en||ul;function ks(m){var k=Fn(m)?Ve.call(m):"";return k==d||k==p}function Ni(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=o}function Fn(m){var k=typeof m;return!!m&&(k=="object"||k=="function")}function Ti(m){return!!m&&typeof m=="object"}function Ns(m){return Po(m)?Oo(m):Ja(m)}function cl(){return[]}function ul(){return!1}t.exports=Ci}(Os,Os.exports)),Os.exports}var js={exports:{}};js.exports;var _d;function Fh(){return _d||(_d=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=1,s=2,i=9007199254740991,a="[object Arguments]",c="[object Array]",u="[object AsyncFunction]",d="[object Boolean]",p="[object Date]",f="[object Error]",h="[object Function]",b="[object GeneratorFunction]",x="[object Map]",C="[object Number]",E="[object Null]",_="[object Object]",S="[object Promise]",j="[object Proxy]",P="[object RegExp]",O="[object Set]",F="[object String]",q="[object Symbol]",B="[object Undefined]",W="[object WeakMap]",N="[object ArrayBuffer]",M="[object DataView]",T="[object Float32Array]",L="[object Float64Array]",A="[object Int8Array]",D="[object Int16Array]",$="[object Int32Array]",z="[object Uint8Array]",U="[object Uint8ClampedArray]",G="[object Uint16Array]",J="[object Uint32Array]",ee=/[\\^$.*+?()[\]{}|]/g,te=/^\[object .+?Constructor\]$/,Z=/^(?:0|[1-9]\d*)$/,X={};X[T]=X[L]=X[A]=X[D]=X[$]=X[z]=X[U]=X[G]=X[J]=!0,X[a]=X[c]=X[N]=X[d]=X[M]=X[p]=X[f]=X[h]=X[x]=X[C]=X[_]=X[P]=X[O]=X[F]=X[W]=!1;var le=typeof Nr=="object"&&Nr&&Nr.Object===Object&&Nr,ce=typeof self=="object"&&self&&self.Object===Object&&self,ue=le||ce||Function("return this")(),me=e&&!e.nodeType&&e,he=me&&!0&&t&&!t.nodeType&&t,we=he&&he.exports===me,ie=we&&le.process,Ce=function(){try{return ie&&ie.binding&&ie.binding("util")}catch{}}(),Me=Ce&&Ce.isTypedArray;function oe(m,k){for(var I=-1,Q=m==null?0:m.length,xe=0,pe=[];++I<Q;){var Ie=m[I];k(Ie,I,m)&&(pe[xe++]=Ie)}return pe}function be(m,k){for(var I=-1,Q=k.length,xe=m.length;++I<Q;)m[xe+I]=k[I];return m}function Ne(m,k){for(var I=-1,Q=m==null?0:m.length;++I<Q;)if(k(m[I],I,m))return!0;return!1}function je(m,k){for(var I=-1,Q=Array(m);++I<m;)Q[I]=k(I);return Q}function qe(m){return function(k){return m(k)}}function Ze(m,k){return m.has(k)}function Je(m,k){return m==null?void 0:m[k]}function ot(m){var k=-1,I=Array(m.size);return m.forEach(function(Q,xe){I[++k]=[xe,Q]}),I}function Ee(m,k){return function(I){return m(k(I))}}function ut(m){var k=-1,I=Array(m.size);return m.forEach(function(Q){I[++k]=Q}),I}var Ve=Array.prototype,bn=Function.prototype,Xt=Object.prototype,Ut=ue["__core-js_shared__"],Qt=bn.toString,fe=Xt.hasOwnProperty,Pe=function(){var m=/[^.]+$/.exec(Ut&&Ut.keys&&Ut.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),dt=Xt.toString,mt=RegExp("^"+Qt.call(fe).replace(ee,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Zt=we?ue.Buffer:void 0,en=ue.Symbol,vn=ue.Uint8Array,tn=Xt.propertyIsEnumerable,nn=Ve.splice,Et=en?en.toStringTag:void 0,rn=Object.getOwnPropertySymbols,on=Zt?Zt.isBuffer:void 0,Vt=Ee(Object.keys,Object),In=nr(ue,"DataView"),$e=nr(ue,"Map"),Xe=nr(ue,"Promise"),Lt=nr(ue,"Set"),Pt=nr(ue,"WeakMap"),xn=nr(Object,"create"),vr=$t(In),dn=$t($e),v=$t(Xe),y=$t(Lt),R=$t(Pt),Y=en?en.prototype:void 0,re=Y?Y.valueOf:void 0;function ae(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=xn?xn(null):{},this.size=0}function et(m){var k=this.has(m)&&delete this.__data__[m];return this.size-=k?1:0,k}function it(m){var k=this.__data__;if(xn){var I=k[m];return I===r?void 0:I}return fe.call(k,m)?k[m]:void 0}function kt(m){var k=this.__data__;return xn?k[m]!==void 0:fe.call(k,m)}function pt(m,k){var I=this.__data__;return this.size+=this.has(m)?0:1,I[m]=xn&&k===void 0?r:k,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=kt,ae.prototype.set=pt;function We(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function sn(){this.__data__=[],this.size=0}function Dt(m){var k=this.__data__,I=Io(k,m);if(I<0)return!1;var Q=k.length-1;return I==Q?k.pop():nn.call(k,I,1),--this.size,!0}function yn(m){var k=this.__data__,I=Io(k,m);return I<0?void 0:k[I][1]}function Ht(m){return Io(this.__data__,m)>-1}function _n(m,k){var I=this.__data__,Q=Io(I,m);return Q<0?(++this.size,I.push([m,k])):I[Q][1]=k,this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function Yr(){this.size=0,this.__data__={hash:new ae,map:new($e||We),string:new ae}}function lt(m){var k=Cn(this,m).delete(m);return this.size-=k?1:0,k}function Ro(m){return Cn(this,m).get(m)}function Ln(m){return Cn(this,m).has(m)}function za(m,k){var I=Cn(this,m),Q=I.size;return I.set(m,k),this.size+=I.size==Q?0:1,this}at.prototype.clear=Yr,at.prototype.delete=lt,at.prototype.get=Ro,at.prototype.has=Ln,at.prototype.set=za;function Oo(m){var k=-1,I=m==null?0:m.length;for(this.__data__=new at;++k<I;)this.add(m[k])}function vi(m){return this.__data__.set(m,r),this}function jo(m){return this.__data__.has(m)}Oo.prototype.add=Oo.prototype.push=vi,Oo.prototype.has=jo;function Pn(m){var k=this.__data__=new We(m);this.size=k.size}function ys(){this.__data__=new We,this.size=0}function Ga(m){var k=this.__data__,I=k.delete(m);return this.size=k.size,I}function Ka(m){return this.__data__.get(m)}function Ya(m){return this.__data__.has(m)}function Wa(m,k){var I=this.__data__;if(I instanceof We){var Q=I.__data__;if(!$e||Q.length<n-1)return Q.push([m,k]),this.size=++I.size,this;I=this.__data__=new at(Q)}return I.set(m,k),this.size=I.size,this}Pn.prototype.clear=ys,Pn.prototype.delete=Ga,Pn.prototype.get=Ka,Pn.prototype.has=Ya,Pn.prototype.set=Wa;function Ja(m,k){var I=Lo(m),Q=!I&&Ei(m),xe=!I&&!Q&&Po(m),pe=!I&&!Q&&!xe&&Ti(m),Ie=I||Q||xe||pe,Re=Ie?je(m.length,String):[],ct=Re.length;for(var Le in m)fe.call(m,Le)&&!(Ie&&(Le=="length"||xe&&(Le=="offset"||Le=="parent")||pe&&(Le=="buffer"||Le=="byteLength"||Le=="byteOffset")||ol(Le,ct)))&&Re.push(Le);return Re}function Io(m,k){for(var I=m.length;I--;)if(Ci(m[I][0],k))return I;return-1}function _s(m,k,I){var Q=k(m);return Lo(m)?Q:be(Q,I(m))}function Wr(m){return m==null?m===void 0?B:E:Et&&Et in Object(m)?rr(m):_i(m)}function xi(m){return Fn(m)&&Wr(m)==a}function yi(m,k,I,Q,xe){return m===k?!0:m==null||k==null||!Fn(m)&&!Fn(k)?m!==m&&k!==k:Xa(m,k,I,Q,yi,xe)}function Xa(m,k,I,Q,xe,pe){var Ie=Lo(m),Re=Lo(k),ct=Ie?c:$n(m),Le=Re?c:$n(k);ct=ct==a?_:ct,Le=Le==a?_:Le;var Mt=ct==_,zt=Le==_,ft=ct==Le;if(ft&&Po(m)){if(!Po(k))return!1;Ie=!0,Mt=!1}if(ft&&!Mt)return pe||(pe=new Pn),Ie||Ti(m)?Cs(m,k,I,Q,xe,pe):tl(m,k,ct,I,Q,xe,pe);if(!(I&o)){var Rt=Mt&&fe.call(m,"__wrapped__"),Nt=zt&&fe.call(k,"__wrapped__");if(Rt||Nt){var xr=Rt?m.value():m,or=Nt?k.value():k;return pe||(pe=new Pn),xe(xr,or,I,Q,pe)}}return ft?(pe||(pe=new Pn),nl(m,k,I,Q,xe,pe)):!1}function Qa(m){if(!Ni(m)||il(m))return!1;var k=ki(m)?mt:te;return k.test($t(m))}function Za(m){return Fn(m)&&ks(m.length)&&!!X[Wr(m)]}function el(m){if(!al(m))return Vt(m);var k=[];for(var I in Object(m))fe.call(m,I)&&I!="constructor"&&k.push(I);return k}function Cs(m,k,I,Q,xe,pe){var Ie=I&o,Re=m.length,ct=k.length;if(Re!=ct&&!(Ie&&ct>Re))return!1;var Le=pe.get(m);if(Le&&pe.get(k))return Le==k;var Mt=-1,zt=!0,ft=I&s?new Oo:void 0;for(pe.set(m,k),pe.set(k,m);++Mt<Re;){var Rt=m[Mt],Nt=k[Mt];if(Q)var xr=Ie?Q(Nt,Rt,Mt,k,m,pe):Q(Rt,Nt,Mt,m,k,pe);if(xr!==void 0){if(xr)continue;zt=!1;break}if(ft){if(!Ne(k,function(or,Xr){if(!Ze(ft,Xr)&&(Rt===or||xe(Rt,or,I,Q,pe)))return ft.push(Xr)})){zt=!1;break}}else if(!(Rt===Nt||xe(Rt,Nt,I,Q,pe))){zt=!1;break}}return pe.delete(m),pe.delete(k),zt}function tl(m,k,I,Q,xe,pe,Ie){switch(I){case M:if(m.byteLength!=k.byteLength||m.byteOffset!=k.byteOffset)return!1;m=m.buffer,k=k.buffer;case N:return!(m.byteLength!=k.byteLength||!pe(new vn(m),new vn(k)));case d:case p:case C:return Ci(+m,+k);case f:return m.name==k.name&&m.message==k.message;case P:case F:return m==k+"";case x:var Re=ot;case O:var ct=Q&o;if(Re||(Re=ut),m.size!=k.size&&!ct)return!1;var Le=Ie.get(m);if(Le)return Le==k;Q|=s,Ie.set(m,k);var Mt=Cs(Re(m),Re(k),Q,xe,pe,Ie);return Ie.delete(m),Mt;case q:if(re)return re.call(m)==re.call(k)}return!1}function nl(m,k,I,Q,xe,pe){var Ie=I&o,Re=Jr(m),ct=Re.length,Le=Jr(k),Mt=Le.length;if(ct!=Mt&&!Ie)return!1;for(var zt=ct;zt--;){var ft=Re[zt];if(!(Ie?ft in k:fe.call(k,ft)))return!1}var Rt=pe.get(m);if(Rt&&pe.get(k))return Rt==k;var Nt=!0;pe.set(m,k),pe.set(k,m);for(var xr=Ie;++zt<ct;){ft=Re[zt];var or=m[ft],Xr=k[ft];if(Q)var Ku=Ie?Q(Xr,or,ft,k,m,pe):Q(or,Xr,ft,m,k,pe);if(!(Ku===void 0?or===Xr||xe(or,Xr,I,Q,pe):Ku)){Nt=!1;break}xr||(xr=ft=="constructor")}if(Nt&&!xr){var Si=m.constructor,Ai=k.constructor;Si!=Ai&&"constructor"in m&&"constructor"in k&&!(typeof Si=="function"&&Si instanceof Si&&typeof Ai=="function"&&Ai instanceof Ai)&&(Nt=!1)}return pe.delete(m),pe.delete(k),Nt}function Jr(m){return _s(m,Ns,rl)}function Cn(m,k){var I=m.__data__;return sl(k)?I[typeof k=="string"?"string":"hash"]:I.map}function nr(m,k){var I=Je(m,k);return Qa(I)?I:void 0}function rr(m){var k=fe.call(m,Et),I=m[Et];try{m[Et]=void 0;var Q=!0}catch{}var xe=dt.call(m);return Q&&(k?m[Et]=I:delete m[Et]),xe}var rl=rn?function(m){return m==null?[]:(m=Object(m),oe(rn(m),function(k){return tn.call(m,k)}))}:cl,$n=Wr;(In&&$n(new In(new ArrayBuffer(1)))!=M||$e&&$n(new $e)!=x||Xe&&$n(Xe.resolve())!=S||Lt&&$n(new Lt)!=O||Pt&&$n(new Pt)!=W)&&($n=function(m){var k=Wr(m),I=k==_?m.constructor:void 0,Q=I?$t(I):"";if(Q)switch(Q){case vr:return M;case dn:return x;case v:return S;case y:return O;case R:return W}return k});function ol(m,k){return k=k??i,!!k&&(typeof m=="number"||Z.test(m))&&m>-1&&m%1==0&&m<k}function sl(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function il(m){return!!Pe&&Pe in m}function al(m){var k=m&&m.constructor,I=typeof k=="function"&&k.prototype||Xt;return m===I}function _i(m){return dt.call(m)}function $t(m){if(m!=null){try{return Qt.call(m)}catch{}try{return m+""}catch{}}return""}function Ci(m,k){return m===k||m!==m&&k!==k}var Ei=xi(function(){return arguments}())?xi:function(m){return Fn(m)&&fe.call(m,"callee")&&!tn.call(m,"callee")},Lo=Array.isArray;function Es(m){return m!=null&&ks(m.length)&&!ki(m)}var Po=on||ul;function ll(m,k){return yi(m,k)}function ki(m){if(!Ni(m))return!1;var k=Wr(m);return k==h||k==b||k==u||k==j}function ks(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=i}function Ni(m){var k=typeof m;return m!=null&&(k=="object"||k=="function")}function Fn(m){return m!=null&&typeof m=="object"}var Ti=Me?qe(Me):Za;function Ns(m){return Es(m)?Ja(m):el(m)}function cl(){return[]}function ul(){return!1}t.exports=ll}(js,js.exports)),js.exports}var Oi={},Cd;function Nv(){if(Cd)return Oi;Cd=1,Object.defineProperty(Oi,"__esModule",{value:!0});const t=$h(),e=Fh();var n;return function(r){function o(c={},u={},d=!1){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});let p=t(u);d||(p=Object.keys(p).reduce((f,h)=>(p[h]!=null&&(f[h]=p[h]),f),{}));for(const f in c)c[f]!==void 0&&u[f]===void 0&&(p[f]=c[f]);return Object.keys(p).length>0?p:void 0}r.compose=o;function s(c={},u={}){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});const d=Object.keys(c).concat(Object.keys(u)).reduce((p,f)=>(e(c[f],u[f])||(p[f]=u[f]===void 0?null:u[f]),p),{});return Object.keys(d).length>0?d:void 0}r.diff=s;function i(c={},u={}){c=c||{};const d=Object.keys(u).reduce((p,f)=>(u[f]!==c[f]&&c[f]!==void 0&&(p[f]=u[f]),p),{});return Object.keys(c).reduce((p,f)=>(c[f]!==u[f]&&u[f]===void 0&&(p[f]=null),p),d)}r.invert=i;function a(c,u,d=!1){if(typeof c!="object")return u;if(typeof u!="object")return;if(!d)return u;const p=Object.keys(u).reduce((f,h)=>(c[h]===void 0&&(f[h]=u[h]),f),{});return Object.keys(p).length>0?p:void 0}r.transform=a}(n||(n={})),Oi.default=n,Oi}var ji={},Ed;function Bh(){if(Ed)return ji;Ed=1,Object.defineProperty(ji,"__esModule",{value:!0});var t;return function(e){function n(r){return typeof r.delete=="number"?r.delete:typeof r.retain=="number"?r.retain:typeof r.retain=="object"&&r.retain!==null?1:typeof r.insert=="string"?r.insert.length:1}e.length=n}(t||(t={})),ji.default=t,ji}var Ii={},kd;function Tv(){if(kd)return Ii;kd=1,Object.defineProperty(Ii,"__esModule",{value:!0});const t=Bh();class e{constructor(r){this.ops=r,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(r){r||(r=1/0);const o=this.ops[this.index];if(o){const s=this.offset,i=t.default.length(o);if(r>=i-s?(r=i-s,this.index+=1,this.offset=0):this.offset+=r,typeof o.delete=="number")return{delete:r};{const a={};return o.attributes&&(a.attributes=o.attributes),typeof o.retain=="number"?a.retain=r:typeof o.retain=="object"&&o.retain!==null?a.retain=o.retain:typeof o.insert=="string"?a.insert=o.insert.substr(s,r):a.insert=o.insert,a}}else return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?t.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const r=this.ops[this.index];return r?typeof r.delete=="number"?"delete":typeof r.retain=="number"||typeof r.retain=="object"&&r.retain!==null?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(this.offset===0)return this.ops.slice(this.index);{const r=this.offset,o=this.index,s=this.next(),i=this.ops.slice(this.index);return this.offset=r,this.index=o,[s].concat(i)}}else return[]}}return Ii.default=e,Ii}var Nd;function Sv(){return Nd||(Nd=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const n=kv(),r=$h(),o=Fh(),s=Nv();e.AttributeMap=s.default;const i=Bh();e.Op=i.default;const a=Tv();e.OpIterator=a.default;const c="\0",u=(p,f)=>{if(typeof p!="object"||p===null)throw new Error(`cannot retain a ${typeof p}`);if(typeof f!="object"||f===null)throw new Error(`cannot retain a ${typeof f}`);const h=Object.keys(p)[0];if(!h||h!==Object.keys(f)[0])throw new Error(`embed types not matched: ${h} != ${Object.keys(f)[0]}`);return[h,p[h],f[h]]};class d{constructor(f){Array.isArray(f)?this.ops=f:f!=null&&Array.isArray(f.ops)?this.ops=f.ops:this.ops=[]}static registerEmbed(f,h){this.handlers[f]=h}static unregisterEmbed(f){delete this.handlers[f]}static getHandler(f){const h=this.handlers[f];if(!h)throw new Error(`no handlers for embed type "${f}"`);return h}insert(f,h){const b={};return typeof f=="string"&&f.length===0?this:(b.insert=f,h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b))}delete(f){return f<=0?this:this.push({delete:f})}retain(f,h){if(typeof f=="number"&&f<=0)return this;const b={retain:f};return h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b)}push(f){let h=this.ops.length,b=this.ops[h-1];if(f=r(f),typeof b=="object"){if(typeof f.delete=="number"&&typeof b.delete=="number")return this.ops[h-1]={delete:b.delete+f.delete},this;if(typeof b.delete=="number"&&f.insert!=null&&(h-=1,b=this.ops[h-1],typeof b!="object"))return this.ops.unshift(f),this;if(o(f.attributes,b.attributes)){if(typeof f.insert=="string"&&typeof b.insert=="string")return this.ops[h-1]={insert:b.insert+f.insert},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this;if(typeof f.retain=="number"&&typeof b.retain=="number")return this.ops[h-1]={retain:b.retain+f.retain},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this}}return h===this.ops.length?this.ops.push(f):this.ops.splice(h,0,f),this}chop(){const f=this.ops[this.ops.length-1];return f&&typeof f.retain=="number"&&!f.attributes&&this.ops.pop(),this}filter(f){return this.ops.filter(f)}forEach(f){this.ops.forEach(f)}map(f){return this.ops.map(f)}partition(f){const h=[],b=[];return this.forEach(x=>{(f(x)?h:b).push(x)}),[h,b]}reduce(f,h){return this.ops.reduce(f,h)}changeLength(){return this.reduce((f,h)=>h.insert?f+i.default.length(h):h.delete?f-h.delete:f,0)}length(){return this.reduce((f,h)=>f+i.default.length(h),0)}slice(f=0,h=1/0){const b=[],x=new a.default(this.ops);let C=0;for(;C<h&&x.hasNext();){let E;C<f?E=x.next(f-C):(E=x.next(h-C),b.push(E)),C+=i.default.length(E)}return new d(b)}compose(f){const h=new a.default(this.ops),b=new a.default(f.ops),x=[],C=b.peek();if(C!=null&&typeof C.retain=="number"&&C.attributes==null){let _=C.retain;for(;h.peekType()==="insert"&&h.peekLength()<=_;)_-=h.peekLength(),x.push(h.next());C.retain-_>0&&b.next(C.retain-_)}const E=new d(x);for(;h.hasNext()||b.hasNext();)if(b.peekType()==="insert")E.push(b.next());else if(h.peekType()==="delete")E.push(h.next());else{const _=Math.min(h.peekLength(),b.peekLength()),S=h.next(_),j=b.next(_);if(j.retain){const P={};if(typeof S.retain=="number")P.retain=typeof j.retain=="number"?_:j.retain;else if(typeof j.retain=="number")S.retain==null?P.insert=S.insert:P.retain=S.retain;else{const F=S.retain==null?"insert":"retain",[q,B,W]=u(S[F],j.retain),N=d.getHandler(q);P[F]={[q]:N.compose(B,W,F==="retain")}}const O=s.default.compose(S.attributes,j.attributes,typeof S.retain=="number");if(O&&(P.attributes=O),E.push(P),!b.hasNext()&&o(E.ops[E.ops.length-1],P)){const F=new d(h.rest());return E.concat(F).chop()}}else typeof j.delete=="number"&&(typeof S.retain=="number"||typeof S.retain=="object"&&S.retain!==null)&&E.push(j)}return E.chop()}concat(f){const h=new d(this.ops.slice());return f.ops.length>0&&(h.push(f.ops[0]),h.ops=h.ops.concat(f.ops.slice(1))),h}diff(f,h){if(this.ops===f.ops)return new d;const b=[this,f].map(S=>S.map(j=>{if(j.insert!=null)return typeof j.insert=="string"?j.insert:c;const P=S===f?"on":"with";throw new Error("diff() called "+P+" non-document")}).join("")),x=new d,C=n(b[0],b[1],h,!0),E=new a.default(this.ops),_=new a.default(f.ops);return C.forEach(S=>{let j=S[1].length;for(;j>0;){let P=0;switch(S[0]){case n.INSERT:P=Math.min(_.peekLength(),j),x.push(_.next(P));break;case n.DELETE:P=Math.min(j,E.peekLength()),E.next(P),x.delete(P);break;case n.EQUAL:P=Math.min(E.peekLength(),_.peekLength(),j);const O=E.next(P),F=_.next(P);o(O.insert,F.insert)?x.retain(P,s.default.diff(O.attributes,F.attributes)):x.push(F).delete(P);break}j-=P}}),x.chop()}eachLine(f,h=`
`){const b=new a.default(this.ops);let x=new d,C=0;for(;b.hasNext();){if(b.peekType()!=="insert")return;const E=b.peek(),_=i.default.length(E)-b.peekLength(),S=typeof E.insert=="string"?E.insert.indexOf(h,_)-_:-1;if(S<0)x.push(b.next());else if(S>0)x.push(b.next(S));else{if(f(x,b.next(1).attributes||{},C)===!1)return;C+=1,x=new d}}x.length()>0&&f(x,{},C)}invert(f){const h=new d;return this.reduce((b,x)=>{if(x.insert)h.delete(i.default.length(x));else{if(typeof x.retain=="number"&&x.attributes==null)return h.retain(x.retain),b+x.retain;if(x.delete||typeof x.retain=="number"){const C=x.delete||x.retain;return f.slice(b,b+C).forEach(_=>{x.delete?h.push(_):x.retain&&x.attributes&&h.retain(i.default.length(_),s.default.invert(x.attributes,_.attributes))}),b+C}else if(typeof x.retain=="object"&&x.retain!==null){const C=f.slice(b,b+1),E=new a.default(C.ops).next(),[_,S,j]=u(x.retain,E.insert),P=d.getHandler(_);return h.retain({[_]:P.invert(S,j)},s.default.invert(x.attributes,E.attributes)),b+1}}return b},0),h.chop()}transform(f,h=!1){if(h=!!h,typeof f=="number")return this.transformPosition(f,h);const b=f,x=new a.default(this.ops),C=new a.default(b.ops),E=new d;for(;x.hasNext()||C.hasNext();)if(x.peekType()==="insert"&&(h||C.peekType()!=="insert"))E.retain(i.default.length(x.next()));else if(C.peekType()==="insert")E.push(C.next());else{const _=Math.min(x.peekLength(),C.peekLength()),S=x.next(_),j=C.next(_);if(S.delete)continue;if(j.delete)E.push(j);else{const P=S.retain,O=j.retain;let F=typeof O=="object"&&O!==null?O:_;if(typeof P=="object"&&P!==null&&typeof O=="object"&&O!==null){const q=Object.keys(P)[0];if(q===Object.keys(O)[0]){const B=d.getHandler(q);B&&(F={[q]:B.transform(P[q],O[q],h)})}}E.retain(F,s.default.transform(S.attributes,j.attributes,h))}}return E.chop()}transformPosition(f,h=!1){h=!!h;const b=new a.default(this.ops);let x=0;for(;b.hasNext()&&x<=f;){const C=b.peekLength(),E=b.peekType();if(b.next(),E==="delete"){f-=Math.min(C,f-x);continue}else E==="insert"&&(x<f||!h)&&(f+=C);x+=C}return f}}d.Op=i.default,d.OpIterator=a.default,d.AttributeMap=s.default,d.handlers={},e.default=d,t.exports=d,t.exports.default=d}(Ri,Ri.exports)),Ri.exports}var Av=Sv();const Is=wv(Av);var Dv=Object.getOwnPropertyNames,Mv=Object.getOwnPropertySymbols,Rv=Object.prototype.hasOwnProperty;function Td(t,e){return function(r,o,s){return t(r,o,s)&&e(r,o,s)}}function Li(t){return function(n,r,o){if(!n||!r||typeof n!="object"||typeof r!="object")return t(n,r,o);var s=o.cache,i=s.get(n),a=s.get(r);if(i&&a)return i===r&&a===n;s.set(n,r),s.set(r,n);var c=t(n,r,o);return s.delete(n),s.delete(r),c}}function Sd(t){return Dv(t).concat(Mv(t))}var Ov=Object.hasOwn||function(t,e){return Rv.call(t,e)};function So(t,e){return t===e||!t&&!e&&t!==t&&e!==e}var jv="__v",Iv="__o",Lv="_owner",Ad=Object.getOwnPropertyDescriptor,Dd=Object.keys;function Pv(t,e,n){var r=t.length;if(e.length!==r)return!1;for(;r-- >0;)if(!n.equals(t[r],e[r],r,r,t,e,n))return!1;return!0}function $v(t,e){return So(t.getTime(),e.getTime())}function Fv(t,e){return t.name===e.name&&t.message===e.message&&t.cause===e.cause&&t.stack===e.stack}function Bv(t,e){return t===e}function Md(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.entries(),i,a,c=0;(i=s.next())&&!i.done;){for(var u=e.entries(),d=!1,p=0;(a=u.next())&&!a.done;){if(o[p]){p++;continue}var f=i.value,h=a.value;if(n.equals(f[0],h[0],c,p,t,e,n)&&n.equals(f[1],h[1],f[0],h[0],t,e,n)){d=o[p]=!0;break}p++}if(!d)return!1;c++}return!0}var qv=So;function Uv(t,e,n){var r=Dd(t),o=r.length;if(Dd(e).length!==o)return!1;for(;o-- >0;)if(!qh(t,e,n,r[o]))return!1;return!0}function As(t,e,n){var r=Sd(t),o=r.length;if(Sd(e).length!==o)return!1;for(var s,i,a;o-- >0;)if(s=r[o],!qh(t,e,n,s)||(i=Ad(t,s),a=Ad(e,s),(i||a)&&(!i||!a||i.configurable!==a.configurable||i.enumerable!==a.enumerable||i.writable!==a.writable)))return!1;return!0}function Vv(t,e){return So(t.valueOf(),e.valueOf())}function Hv(t,e){return t.source===e.source&&t.flags===e.flags}function Rd(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.values(),i,a;(i=s.next())&&!i.done;){for(var c=e.values(),u=!1,d=0;(a=c.next())&&!a.done;){if(!o[d]&&n.equals(i.value,a.value,i.value,a.value,t,e,n)){u=o[d]=!0;break}d++}if(!u)return!1}return!0}function zv(t,e){var n=t.length;if(e.length!==n)return!1;for(;n-- >0;)if(t[n]!==e[n])return!1;return!0}function Gv(t,e){return t.hostname===e.hostname&&t.pathname===e.pathname&&t.protocol===e.protocol&&t.port===e.port&&t.hash===e.hash&&t.username===e.username&&t.password===e.password}function qh(t,e,n,r){return(r===Lv||r===Iv||r===jv)&&(t.$$typeof||e.$$typeof)?!0:Ov(e,r)&&n.equals(t[r],e[r],r,r,t,e,n)}var Kv="[object Arguments]",Yv="[object Boolean]",Wv="[object Date]",Jv="[object Error]",Xv="[object Map]",Qv="[object Number]",Zv="[object Object]",ex="[object RegExp]",tx="[object Set]",nx="[object String]",rx="[object URL]",ox=Array.isArray,Od=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,jd=Object.assign,sx=Object.prototype.toString.call.bind(Object.prototype.toString);function ix(t){var e=t.areArraysEqual,n=t.areDatesEqual,r=t.areErrorsEqual,o=t.areFunctionsEqual,s=t.areMapsEqual,i=t.areNumbersEqual,a=t.areObjectsEqual,c=t.arePrimitiveWrappersEqual,u=t.areRegExpsEqual,d=t.areSetsEqual,p=t.areTypedArraysEqual,f=t.areUrlsEqual;return function(b,x,C){if(b===x)return!0;if(b==null||x==null)return!1;var E=typeof b;if(E!==typeof x)return!1;if(E!=="object")return E==="number"?i(b,x,C):E==="function"?o(b,x,C):!1;var _=b.constructor;if(_!==x.constructor)return!1;if(_===Object)return a(b,x,C);if(ox(b))return e(b,x,C);if(Od!=null&&Od(b))return p(b,x,C);if(_===Date)return n(b,x,C);if(_===RegExp)return u(b,x,C);if(_===Map)return s(b,x,C);if(_===Set)return d(b,x,C);var S=sx(b);return S===Wv?n(b,x,C):S===ex?u(b,x,C):S===Xv?s(b,x,C):S===tx?d(b,x,C):S===Zv?typeof b.then!="function"&&typeof x.then!="function"&&a(b,x,C):S===rx?f(b,x,C):S===Jv?r(b,x,C):S===Kv?a(b,x,C):S===Yv||S===Qv||S===nx?c(b,x,C):!1}}function ax(t){var e=t.circular,n=t.createCustomConfig,r=t.strict,o={areArraysEqual:r?As:Pv,areDatesEqual:$v,areErrorsEqual:Fv,areFunctionsEqual:Bv,areMapsEqual:r?Td(Md,As):Md,areNumbersEqual:qv,areObjectsEqual:r?As:Uv,arePrimitiveWrappersEqual:Vv,areRegExpsEqual:Hv,areSetsEqual:r?Td(Rd,As):Rd,areTypedArraysEqual:r?As:zv,areUrlsEqual:Gv};if(n&&(o=jd({},o,n(o))),e){var s=Li(o.areArraysEqual),i=Li(o.areMapsEqual),a=Li(o.areObjectsEqual),c=Li(o.areSetsEqual);o=jd({},o,{areArraysEqual:s,areMapsEqual:i,areObjectsEqual:a,areSetsEqual:c})}return o}function lx(t){return function(e,n,r,o,s,i,a){return t(e,n,a)}}function cx(t){var e=t.circular,n=t.comparator,r=t.createState,o=t.equals,s=t.strict;if(r)return function(c,u){var d=r(),p=d.cache,f=p===void 0?e?new WeakMap:void 0:p,h=d.meta;return n(c,u,{cache:f,equals:o,meta:h,strict:s})};if(e)return function(c,u){return n(c,u,{cache:new WeakMap,equals:o,meta:void 0,strict:s})};var i={cache:void 0,equals:o,meta:void 0,strict:s};return function(c,u){return n(c,u,i)}}var ir=Vr();Vr({strict:!0});Vr({circular:!0});Vr({circular:!0,strict:!0});Vr({createInternalComparator:function(){return So}});Vr({strict:!0,createInternalComparator:function(){return So}});Vr({circular:!0,createInternalComparator:function(){return So}});Vr({circular:!0,createInternalComparator:function(){return So},strict:!0});function Vr(t){t===void 0&&(t={});var e=t.circular,n=e===void 0?!1:e,r=t.createInternalComparator,o=t.createState,s=t.strict,i=s===void 0?!1:s,a=ax(t),c=ix(a),u=r?r(c):lx(c);return cx({circular:n,comparator:c,createState:o,equals:u,strict:i})}const ux=new Set(["http:","https:","mailto:","sms:","tel:"]);let Uh=class Vh extends g.ElementNode{static getType(){return"link"}static clone(e){return new Vh(e.__url,{rel:e.__rel,target:e.__target,title:e.__title},e.__key)}constructor(e="",n={},r){super(r);const{target:o=null,rel:s=null,title:i=null}=n;this.__url=e,this.__target=o,this.__rel=s,this.__title=i}createDOM(e){const n=document.createElement("a");return this.updateLinkDOM(null,n,e),kr(n,e.theme.link),n}updateLinkDOM(e,n,r){if(g.isHTMLAnchorElement(n)){e&&e.__url===this.__url||(n.href=this.sanitizeUrl(this.__url));for(const o of["target","rel","title"]){const s=`__${o}`,i=this[s];e&&e[s]===i||(i?n[o]=i:n.removeAttribute(o))}}}updateDOM(e,n,r){return this.updateLinkDOM(e,n,r),!1}static importDOM(){return{a:e=>({conversion:dx,priority:1})}}static importJSON(e){return Wl().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setURL(e.url).setRel(e.rel||null).setTarget(e.target||null).setTitle(e.title||null)}sanitizeUrl(e){e=Id(e);try{const n=new URL(Id(e));if(!ux.has(n.protocol))return"about:blank"}catch{return e}return e}exportJSON(){return{...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),url:this.getURL()}}getURL(){return this.getLatest().__url}setURL(e){const n=this.getWritable();return n.__url=e,n}getTarget(){return this.getLatest().__target}setTarget(e){const n=this.getWritable();return n.__target=e,n}getRel(){return this.getLatest().__rel}setRel(e){const n=this.getWritable();return n.__rel=e,n}getTitle(){return this.getLatest().__title}setTitle(e){const n=this.getWritable();return n.__title=e,n}insertNewAfter(e,n=!0){const r=Wl(this.__url,{rel:this.__rel,target:this.__target,title:this.__title});return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n))return!1;const o=n.anchor.getNode(),s=n.focus.getNode();return this.isParentOf(o)&&this.isParentOf(s)&&n.getTextContent().length>0}isEmailURI(){return this.__url.startsWith("mailto:")}isWebSiteURI(){return this.__url.startsWith("https://")||this.__url.startsWith("http://")}};function dx(t){let e=null;if(g.isHTMLAnchorElement(t)){const n=t.textContent;(n!==null&&n!==""||t.children.length>0)&&(e=Wl(t.getAttribute("href")||"",{rel:t.getAttribute("rel"),target:t.getAttribute("target"),title:t.getAttribute("title")}))}return{node:e}}function Wl(t="",e){return g.$applyNodeReplacement(new Uh(t,e))}function px(t){return t instanceof Uh}g.createCommand("TOGGLE_LINK_COMMAND");const fx=/^\+?[0-9\s()-]{5,}$/;function Id(t){return t.match(/^[a-z][a-z0-9+.-]*:/i)||t.match(/^[/#.]/)?t:t.includes("@")?`mailto:${t}`:fx.test(t)?`tel:${t}`:`https://${t}`}const Hh=[];let zh=class Gh extends g.ElementNode{static getType(){return"mark"}static clone(e){return new Gh(e.__ids,e.__key)}static importDOM(){return null}static importJSON(e){return Ld().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setIDs(e.ids)}exportJSON(){return{...super.exportJSON(),ids:this.getIDs()}}constructor(e=Hh,n){super(n),this.__ids=e}createDOM(e){const n=document.createElement("mark");return kr(n,e.theme.mark),this.__ids.length>1&&kr(n,e.theme.markOverlap),n}updateDOM(e,n,r){const o=e.__ids,s=this.__ids,i=o.length,a=s.length,c=r.theme.markOverlap;return i!==a&&(i===1?a===2&&kr(n,c):a===1&&zl(n,c)),!1}hasID(e){return this.getIDs().includes(e)}getIDs(){return Array.from(this.getLatest().__ids)}setIDs(e){const n=this.getWritable();return n.__ids=e,n}addID(e){const n=this.getWritable();return n.__ids.includes(e)?n:n.setIDs([...n.__ids,e])}deleteID(e){const n=this.getWritable(),r=n.__ids.indexOf(e);if(r===-1)return n;const o=Array.from(n.__ids);return o.splice(r,1),n.setIDs(o)}insertNewAfter(e,n=!0){const r=Ld(this.__ids);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}};function Ld(t=Hh){return g.$applyNodeReplacement(new zh(t))}function hx(t){return t instanceof zh}const Kh=Object.freeze({"	":"\\t","\n":"\\n"}),Pd=new RegExp(Object.keys(Kh).join("|"),"g"),Vn=Object.freeze({ancestorHasNextSibling:"|",ancestorIsLastChild:" ",hasNextSibling:"├",isLastChild:"└",selectedChar:"^",selectedLine:">"}),wx=[t=>t.hasFormat("bold")&&"Bold",t=>t.hasFormat("code")&&"Code",t=>t.hasFormat("italic")&&"Italic",t=>t.hasFormat("strikethrough")&&"Strikethrough",t=>t.hasFormat("subscript")&&"Subscript",t=>t.hasFormat("superscript")&&"Superscript",t=>t.hasFormat("underline")&&"Underline",t=>t.hasFormat("highlight")&&"Highlight"],mx=[t=>t.hasTextFormat("bold")&&"Bold",t=>t.hasTextFormat("code")&&"Code",t=>t.hasTextFormat("italic")&&"Italic",t=>t.hasTextFormat("strikethrough")&&"Strikethrough",t=>t.hasTextFormat("subscript")&&"Subscript",t=>t.hasTextFormat("superscript")&&"Superscript",t=>t.hasTextFormat("underline")&&"Underline",t=>t.hasTextFormat("highlight")&&"Highlight"],gx=[t=>t.isDirectionless()&&"Directionless",t=>t.isUnmergeable()&&"Unmergeable"],bx=[t=>t.isToken()&&"Token",t=>t.isSegmented()&&"Segmented"];function vx(t,e,n,r,o=!1){const s=t.getEditorState(),i=t._config,a=t._compositionKey,c=t._editable;if(n){let f="";return s.read(()=>{f=function(h){const b=document.createElement("div");return b.innerHTML=h.trim(),Wh(b,0).innerHTML}(Pc(t))}),f}let u=` root
`;const d=s.read(()=>{const f=g.$getSelection();return Yh(g.$getRoot(),(h,b)=>{const x=`(${h.getKey()})`,C=h.getType()||"",E=h.isSelected();u+=`${E?Vn.selectedLine:" "} ${b.join(" ")} ${x} ${C} ${function(_,S,j=!1){const P=S?S(_,j):void 0;if(P!==void 0&&P.length>0)return P;if(g.$isTextNode(_)){const O=_.getTextContent(),F=O.length===0?"(empty)":`"${$d(O,j)}"`,q=function(B){return[Fd(B),xx(B),yx(B),Bd(B)].filter(Boolean).join(", ")}(_);return[F,q.length!==0?`{ ${q} }`:null].filter(Boolean).join(" ").trim()}if(px(_)){const O=_.getURL(),F=O.length===0?"(empty)":`"${$d(O,j)}"`,q=function(B){return[_x(B),Cx(B),Ex(B),Bd(B)].filter(Boolean).join(", ")}(_);return[F,q.length!==0?`{ ${q} }`:null].filter(Boolean).join(" ").trim()}if(hx(_))return`ids: [ ${_.getIDs().join(", ")} ]`;if(g.$isParagraphNode(_)){const O=function(q){let B=mx.map(W=>W(q)).filter(Boolean).join(", ").toLocaleLowerCase();return B!==""&&(B="format: "+B),B}(_);let F=O!==""?`{ ${O} }`:"";return F+=_.__style?`(${_.__style})`:"",F}return""}(h,r,o)}
`,u+=function({indent:_,isSelected:S,node:j,nodeKeyDisplay:P,selection:O,typeDisplay:F}){if(!g.$isTextNode(j)||!g.$isRangeSelection(O)||!S||g.$isElementNode(j))return"";const q=O.anchor,B=O.focus;if(j.getTextContent()===""||q.getNode()===O.focus.getNode()&&q.offset===B.offset)return"";const[W,N]=function(z,U){const G=U.getStartEndPoints();if(g.$isNodeSelection(U)||G===null)return[-1,-1];const[J,ee]=G,te=z.getTextContent(),Z=te.length;let X=-1,le=-1;if(J.type==="text"&&ee.type==="text"){const me=J.getNode(),he=ee.getNode();me===he&&z===me&&J.offset!==ee.offset?[X,le]=J.offset<ee.offset?[J.offset,ee.offset]:[ee.offset,J.offset]:[X,le]=z===me?me.isBefore(he)?[J.offset,Z]:[0,J.offset]:z===he?he.isBefore(me)?[ee.offset,Z]:[0,ee.offset]:[0,Z]}const ce=(te.slice(0,X).match(Pd)||[]).length,ue=(te.slice(X,le).match(Pd)||[]).length;return[X+ce,le+ce+ue]}(j,O);if(W===N)return"";const M=_[_.length-1]===Vn.hasNextSibling?Vn.ancestorHasNextSibling:Vn.ancestorIsLastChild,T=[..._.slice(0,_.length-1),M],L=Array(W+1).fill(" "),A=Array(N-W).fill(Vn.selectedChar),D=F.length+2,$=Array(P.length+D).fill(" ");return[Vn.selectedLine,T.join(" "),[...$,...L,...A].join("")].join(" ")+`
`}({indent:b,isSelected:E,node:h,nodeKeyDisplay:x,selection:f,typeDisplay:C})}),f===null?": null":g.$isRangeSelection(f)?function(h){let b="";const x=Fd(h);b+=`: range ${x!==""?`{ ${x} }`:""} ${h.style!==""?`{ style: ${h.style} } `:""}`;const C=h.anchor,E=h.focus,_=C.offset,S=E.offset;return b+=`
  ├ anchor { key: ${C.key}, offset: ${_===null?"null":_}, type: ${C.type} }`,b+=`
  └ focus { key: ${E.key}, offset: ${S===null?"null":S}, type: ${E.type} }`,b}(f):mf.$isTableSelection(f)?function(h){return`: table
  └ { table: ${h.tableKey}, anchorCell: ${h.anchor.key}, focusCell: ${h.focus.key} }`}(f):function(h){return g.$isNodeSelection(h)?`: node
  └ [${Array.from(h._nodes).join(", ")}]`:""}(f)});if(u+=`
 selection`+d,u+=`

 commands:`,e.length)for(const{index:f,type:h,payload:b}of e)u+=`
  └ ${f}. { type: ${h}, payload: ${b instanceof Event?b.constructor.name:b} }`;else u+=`
  └ None dispatched.`;const{version:p}=t.constructor;return u+=`

 editor${p?` (v${p})`:""}:`,u+=`
  └ namespace ${i.namespace}`,a!==null&&(u+=`
  └ compositionKey ${a}`),u+=`
  └ editable ${String(c)}`,u}function Yh(t,e,n=[]){const r=t.getChildren(),o=r.length;r.forEach((s,i)=>{e(s,n.concat(i===o-1?Vn.isLastChild:Vn.hasNextSibling)),g.$isElementNode(s)&&Yh(s,e,n.concat(i===o-1?Vn.ancestorIsLastChild:Vn.ancestorHasNextSibling))})}function $d(t,e=!1){const n=Object.entries(Kh).reduce((r,[o,s])=>r.replace(new RegExp(o,"g"),String(s)),t);return e?n.replace(/[^\s]/g,"*"):n}function xx(t){let e=gx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="detail: "+e),e}function yx(t){let e=bx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="mode: "+e),e}function Fd(t){let e=wx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="format: "+e),e}function _x(t){let e=t.getTarget();return e!=null&&(e="target: "+e),e}function Cx(t){let e=t.getRel();return e!=null&&(e="rel: "+e),e}function Ex(t){let e=t.getTitle();return e!=null&&(e="title: "+e),e}function Bd(t){if(!t.__state)return!1;const e=[];for(const[r,o]of t.__state.knownState.entries()){if(r.isEqual(o,r.defaultValue))continue;const s=JSON.stringify(r.unparse(o));e.push(`[${r.key}: ${s}]`)}let n=e.join(",");return n!==""&&(n="state: "+n),n}function Wh(t,e){const n=new Array(1+e++).join("  "),r=new Array(e-1).join("  ");let o;for(let s=0;s<t.children.length;s++)o=document.createTextNode(`
`+n),t.insertBefore(o,t.children[s]),Wh(t.children[s],e),t.lastElementChild===t.children[s]&&(o=document.createTextNode(`
`+r),t.appendChild(o));return t}const kx=w.forwardRef(function({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:o,timeTravelPanelClassName:s,editorState:i,setEditorState:a,setEditorReadOnly:c,generateContent:u,commandsLog:d=[]},p){const[f,h]=w.useState([]),[b,x]=w.useState(""),[C,E]=w.useState(!1),[_,S]=w.useState(!1),j=w.useRef(0),P=w.useRef(null),[O,F]=w.useState(!1),[q,B]=w.useState(!1),[W,N]=w.useState(!1),M=w.useRef(),T=w.useRef([]),L=w.useRef(0),A=w.useCallback($=>{const z=++L.current;u($).then(U=>{z===L.current&&x(U)}).catch(U=>{z===L.current&&x(`Error rendering tree: ${U.message}

Stack:
${U.stack}`)})},[u]);w.useEffect(()=>{if(!(!W&&i._nodeMap.size>1e3&&(B(!0),!W))&&(M.current!==i||T.current!==d)){const $=M.current!==i;M.current=i,T.current=d,A(_),!C&&$&&h(z=>[...z,[Date.now(),i]])}},[i,A,_,W,C,d]);const D=f.length;return w.useEffect(()=>{if(O){let $;const z=()=>{const U=j.current;if(U===D-1)return void F(!1);const G=f[U][0],J=f[U+1][0];$=setTimeout(()=>{j.current++;const ee=j.current,te=P.current;te!==null&&(te.value=String(ee)),a(f[ee][1]),z()},J-G)};return z(),()=>{clearTimeout($)}}},[f,O,D,a]),l.jsxs("div",{className:o,children:[!W&&q?l.jsxs("div",{style:{padding:20},children:[l.jsx("span",{style:{marginRight:20},children:"Detected large EditorState, this can impact debugging performance."}),l.jsx("button",{onClick:()=>{N(!0)},style:{background:"transparent",border:"1px solid white",color:"white",cursor:"pointer",padding:5},children:"Show full tree"})]}):null,W?null:l.jsx("button",{onClick:()=>(A(!_),void S(!_)),className:t,type:"button",children:_?"Tree":"Export DOM"}),!C&&(W||!q)&&D>2&&l.jsx("button",{onClick:()=>{c(!0),j.current=D-1,E(!0)},className:e,type:"button",children:"Time Travel"}),(W||!q)&&l.jsx("pre",{ref:p,children:b}),C&&(W||!q)&&l.jsxs("div",{className:s,children:[l.jsx("button",{className:r,onClick:()=>{j.current===D-1&&(j.current=1),F(!O)},type:"button",children:O?"Pause":"Play"}),l.jsx("input",{className:n,ref:P,onChange:$=>{const z=Number($.target.value),U=f[z];U&&(j.current=z,a(U[1]))},type:"range",min:"1",max:D-1}),l.jsx("button",{className:r,onClick:()=>{c(!1);const $=f.length-1,z=f[$];a(z[1]);const U=P.current;U!==null&&(U.value=String($)),E(!1),F(!1)},type:"button",children:"Exit"})]})]})});function Nx(t,e){const n=new Set;let r=0;for(const[o]of t._commands)n.add(t.registerCommand(o,s=>(e(i=>{r+=1;const a=[...i];return a.push({index:r,payload:s,type:o.type?o.type:"UNKNOWN"}),a.length>10&&a.shift(),a}),!1),g.COMMAND_PRIORITY_CRITICAL));return()=>n.forEach(o=>o())}function Tx(t){const[e,n]=w.useState([]);return w.useEffect(()=>Nx(t,n),[t]),w.useMemo(()=>e,[e])}function Sx({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,timeTravelPanelClassName:o,viewClassName:s,editor:i,customPrintNode:a}){const c=qo.createRef(),[u,d]=w.useState(i.getEditorState()),p=Tx(i);return w.useEffect(()=>vt(i.registerUpdateListener(({editorState:f})=>{d(f)}),i.registerEditableListener(()=>{d(i.getEditorState())})),[i]),w.useEffect(()=>{const f=c.current;if(f!==null)return f.__lexicalEditor=i,()=>{f.__lexicalEditor=null}},[i,c]),l.jsx(kx,{treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:s,timeTravelPanelClassName:o,setEditorReadOnly:f=>{const h=i.getRootElement();h!=null&&(h.contentEditable=f?"false":"true")},editorState:u,setEditorState:f=>i.setEditorState(f),generateContent:async function(f){return vx(i,p,f,a)},ref:c,commandsLog:p})}function Jh({editorRef:t}){const[e]=ye();return qo.useEffect(()=>{typeof t=="function"?t(e):typeof t=="object"&&(t.current=e)},[e]),null}const Pi=0,Jl=1,Xl=2,En=0,Ax=1,qd=2,Dx=3,Mx=4;function Rx(t,e,n,r,o){if(t===null||n.size===0&&r.size===0&&!o)return En;const s=e._selection,i=t._selection;if(o)return Ax;if(!(g.$isRangeSelection(s)&&g.$isRangeSelection(i)&&i.isCollapsed()&&s.isCollapsed()))return En;const a=function(E,_,S){const j=E._nodeMap,P=[];for(const O of _){const F=j.get(O);F!==void 0&&P.push(F)}for(const[O,F]of S){if(!F)continue;const q=j.get(O);q===void 0||g.$isRootNode(q)||P.push(q)}return P}(e,n,r);if(a.length===0)return En;if(a.length>1){const E=e._nodeMap,_=E.get(s.anchor.key),S=E.get(i.anchor.key);return _&&S&&!t._nodeMap.has(_.__key)&&g.$isTextNode(_)&&_.__text.length===1&&s.anchor.offset===1?qd:En}const c=a[0],u=t._nodeMap.get(c.__key);if(!g.$isTextNode(u)||!g.$isTextNode(c)||u.__mode!==c.__mode)return En;const d=u.__text,p=c.__text;if(d===p)return En;const f=s.anchor,h=i.anchor;if(f.key!==h.key||f.type!=="text")return En;const b=f.offset,x=h.offset,C=p.length-d.length;return C===1&&x===b-1?qd:C===-1&&x===b+1?Dx:C===-1&&x===b?Mx:En}function Ox(t,e){let n=Date.now(),r=En;return(o,s,i,a,c,u)=>{const d=Date.now();if(u.has(g.HISTORIC_TAG))return r=En,n=d,Xl;const p=Rx(o,s,a,c,t.isComposing()),f=(()=>{const h=i===null||i.editor===t,b=u.has(g.HISTORY_PUSH_TAG);if(!b&&h&&u.has(g.HISTORY_MERGE_TAG))return Pi;if(o===null)return Jl;const x=s._selection;return a.size>0||c.size>0?b===!1&&p!==En&&p===r&&d<n+e&&h||a.size===1&&function(C,E,_){const S=E._nodeMap.get(C),j=_._nodeMap.get(C),P=E._selection,O=_._selection;return!(g.$isRangeSelection(P)&&g.$isRangeSelection(O)&&P.anchor.type==="element"&&P.focus.type==="element"&&O.anchor.type==="text"&&O.focus.type==="text"||!g.$isTextNode(S)||!g.$isTextNode(j)||S.__parent!==j.__parent)&&JSON.stringify(E.read(()=>S.exportJSON()))===JSON.stringify(_.read(()=>j.exportJSON()))}(Array.from(a)[0],o,s)?Pi:Jl:x!==null?Pi:Xl})();return n=d,r=p,f}}function Ud(t){t.undoStack=[],t.redoStack=[],t.current=null}function jx(t,e,n){const r=Ox(t,n);return vt(t.registerCommand(g.UNDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(c.length!==0){const u=i.current,d=c.pop();u!==null&&(a.push(u),s.dispatchCommand(g.CAN_REDO_COMMAND,!0)),c.length===0&&s.dispatchCommand(g.CAN_UNDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(a.length!==0){const u=i.current;u!==null&&(c.push(u),s.dispatchCommand(g.CAN_UNDO_COMMAND,!0));const d=a.pop();a.length===0&&s.dispatchCommand(g.CAN_REDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_EDITOR_COMMAND,()=>(Ud(e),!1),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_HISTORY_COMMAND,()=>(Ud(e),t.dispatchCommand(g.CAN_REDO_COMMAND,!1),t.dispatchCommand(g.CAN_UNDO_COMMAND,!1),!0),g.COMMAND_PRIORITY_EDITOR),t.registerUpdateListener(({editorState:s,prevEditorState:i,dirtyLeaves:a,dirtyElements:c,tags:u})=>{const d=e.current,p=e.redoStack,f=e.undoStack,h=d===null?null:d.editorState;if(d!==null&&s===h)return;const b=r(i,s,d,a,c,u);if(b===Jl)p.length!==0&&(e.redoStack=[],t.dispatchCommand(g.CAN_REDO_COMMAND,!1)),d!==null&&(f.push({...d}),t.dispatchCommand(g.CAN_UNDO_COMMAND,!0));else if(b===Xl)return;e.current={editor:t,editorState:s}}))}function Ix(){return{current:null,redoStack:[],undoStack:[]}}function Xh({delay:t,externalHistoryState:e}){const[n]=ye();return function(r,o,s=1e3){const i=w.useMemo(()=>o||Ix(),[o]);w.useEffect(()=>jx(r,i,s),[s,r,i])}(n,e,t),null}const ea=Math.min,io=Math.max,ta=Math.round,$i=Math.floor,Wn=t=>({x:t,y:t}),Lx={left:"right",right:"left",bottom:"top",top:"bottom"},Px={start:"end",end:"start"};function Vd(t,e,n){return io(t,ea(e,n))}function Yc(t,e){return typeof t=="function"?t(e):t}function Jo(t){return t.split("-")[0]}function Wc(t){return t.split("-")[1]}function Qh(t){return t==="x"?"y":"x"}function Zh(t){return t==="y"?"height":"width"}const $x=new Set(["top","bottom"]);function oo(t){return $x.has(Jo(t))?"y":"x"}function ew(t){return Qh(oo(t))}function Fx(t,e,n){n===void 0&&(n=!1);const r=Wc(t),o=ew(t),s=Zh(o);let i=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(i=na(i)),[i,na(i)]}function Bx(t){const e=na(t);return[Ql(t),e,Ql(e)]}function Ql(t){return t.replace(/start|end/g,e=>Px[e])}const Hd=["left","right"],zd=["right","left"],qx=["top","bottom"],Ux=["bottom","top"];function Vx(t,e,n){switch(t){case"top":case"bottom":return n?e?zd:Hd:e?Hd:zd;case"left":case"right":return e?qx:Ux;default:return[]}}function Hx(t,e,n,r){const o=Wc(t);let s=Vx(Jo(t),n==="start",r);return o&&(s=s.map(i=>i+"-"+o),e&&(s=s.concat(s.map(Ql)))),s}function na(t){return t.replace(/left|right|bottom|top/g,e=>Lx[e])}function zx(t){return{top:0,right:0,bottom:0,left:0,...t}}function Gx(t){return typeof t!="number"?zx(t):{top:t,right:t,bottom:t,left:t}}function ra(t){const{x:e,y:n,width:r,height:o}=t;return{width:r,height:o,top:n,left:e,right:e+r,bottom:n+o,x:e,y:n}}function Gd(t,e,n){let{reference:r,floating:o}=t;const s=oo(e),i=ew(e),a=Zh(i),c=Jo(e),u=s==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,f=r[a]/2-o[a]/2;let h;switch(c){case"top":h={x:d,y:r.y-o.height};break;case"bottom":h={x:d,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-o.width,y:p};break;default:h={x:r.x,y:r.y}}switch(Wc(e)){case"start":h[i]-=f*(n&&u?-1:1);break;case"end":h[i]+=f*(n&&u?-1:1);break}return h}const Kx=async(t,e,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:i}=n,a=s.filter(Boolean),c=await(i.isRTL==null?void 0:i.isRTL(e));let u=await i.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Gd(u,r,c),f=r,h={},b=0;for(let x=0;x<a.length;x++){const{name:C,fn:E}=a[x],{x:_,y:S,data:j,reset:P}=await E({x:d,y:p,initialPlacement:r,placement:f,strategy:o,middlewareData:h,rects:u,platform:i,elements:{reference:t,floating:e}});d=_??d,p=S??p,h={...h,[C]:{...h[C],...j}},P&&b<=50&&(b++,typeof P=="object"&&(P.placement&&(f=P.placement),P.rects&&(u=P.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:o}):P.rects),{x:d,y:p}=Gd(u,f,c)),x=-1)}return{x:d,y:p,placement:f,strategy:o,middlewareData:h}};async function tw(t,e){var n;e===void 0&&(e={});const{x:r,y:o,platform:s,rects:i,elements:a,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:f=!1,padding:h=0}=Yc(e,t),b=Gx(h),C=a[f?p==="floating"?"reference":"floating":p],E=ra(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(C)))==null||n?C:C.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:u,rootBoundary:d,strategy:c})),_=p==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,S=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),j=await(s.isElement==null?void 0:s.isElement(S))?await(s.getScale==null?void 0:s.getScale(S))||{x:1,y:1}:{x:1,y:1},P=ra(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:_,offsetParent:S,strategy:c}):_);return{top:(E.top-P.top+b.top)/j.y,bottom:(P.bottom-E.bottom+b.bottom)/j.y,left:(E.left-P.left+b.left)/j.x,right:(P.right-E.right+b.right)/j.x}}const Yx=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,r;const{placement:o,middlewareData:s,rects:i,initialPlacement:a,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=!0,...C}=Yc(t,e);if((n=s.arrow)!=null&&n.alignmentOffset)return{};const E=Jo(o),_=oo(a),S=Jo(a)===a,j=await(c.isRTL==null?void 0:c.isRTL(u.floating)),P=f||(S||!x?[na(a)]:Bx(a)),O=b!=="none";!f&&O&&P.push(...Hx(a,x,b,j));const F=[a,...P],q=await tw(e,C),B=[];let W=((r=s.flip)==null?void 0:r.overflows)||[];if(d&&B.push(q[E]),p){const L=Fx(o,i,j);B.push(q[L[0]],q[L[1]])}if(W=[...W,{placement:o,overflows:B}],!B.every(L=>L<=0)){var N,M;const L=(((N=s.flip)==null?void 0:N.index)||0)+1,A=F[L];if(A&&(!(p==="alignment"?_!==oo(A):!1)||W.every(z=>oo(z.placement)===_?z.overflows[0]>0:!0)))return{data:{index:L,overflows:W},reset:{placement:A}};let D=(M=W.filter($=>$.overflows[0]<=0).sort(($,z)=>$.overflows[1]-z.overflows[1])[0])==null?void 0:M.placement;if(!D)switch(h){case"bestFit":{var T;const $=(T=W.filter(z=>{if(O){const U=oo(z.placement);return U===_||U==="y"}return!0}).map(z=>[z.placement,z.overflows.filter(U=>U>0).reduce((U,G)=>U+G,0)]).sort((z,U)=>z[1]-U[1])[0])==null?void 0:T[0];$&&(D=$);break}case"initialPlacement":D=a;break}if(o!==D)return{reset:{placement:D}}}return{}}}},Wx=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:o}=e,{mainAxis:s=!0,crossAxis:i=!1,limiter:a={fn:C=>{let{x:E,y:_}=C;return{x:E,y:_}}},...c}=Yc(t,e),u={x:n,y:r},d=await tw(e,c),p=oo(Jo(o)),f=Qh(p);let h=u[f],b=u[p];if(s){const C=f==="y"?"top":"left",E=f==="y"?"bottom":"right",_=h+d[C],S=h-d[E];h=Vd(_,h,S)}if(i){const C=p==="y"?"top":"left",E=p==="y"?"bottom":"right",_=b+d[C],S=b-d[E];b=Vd(_,b,S)}const x=a.fn({...e,[f]:h,[p]:b});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:s,[p]:i}}}}}};function Da(){return typeof window<"u"}function hs(t){return nw(t)?(t.nodeName||"").toLowerCase():"#document"}function un(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function tr(t){var e;return(e=(nw(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function nw(t){return Da()?t instanceof Node||t instanceof un(t).Node:!1}function An(t){return Da()?t instanceof Element||t instanceof un(t).Element:!1}function Zn(t){return Da()?t instanceof HTMLElement||t instanceof un(t).HTMLElement:!1}function Kd(t){return!Da()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof un(t).ShadowRoot}const Jx=new Set(["inline","contents"]);function ui(t){const{overflow:e,overflowX:n,overflowY:r,display:o}=Dn(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+n)&&!Jx.has(o)}const Xx=new Set(["table","td","th"]);function Qx(t){return Xx.has(hs(t))}const Zx=[":popover-open",":modal"];function Ma(t){return Zx.some(e=>{try{return t.matches(e)}catch{return!1}})}const ey=["transform","translate","scale","rotate","perspective"],ty=["transform","translate","scale","rotate","perspective","filter"],ny=["paint","layout","strict","content"];function Jc(t){const e=Xc(),n=An(t)?Dn(t):t;return ey.some(r=>n[r]?n[r]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||ty.some(r=>(n.willChange||"").includes(r))||ny.some(r=>(n.contain||"").includes(r))}function ry(t){let e=Or(t);for(;Zn(e)&&!Xo(e);){if(Jc(e))return e;if(Ma(e))return null;e=Or(e)}return null}function Xc(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const oy=new Set(["html","body","#document"]);function Xo(t){return oy.has(hs(t))}function Dn(t){return un(t).getComputedStyle(t)}function Ra(t){return An(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Or(t){if(hs(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Kd(t)&&t.host||tr(t);return Kd(e)?e.host:e}function rw(t){const e=Or(t);return Xo(e)?t.ownerDocument?t.ownerDocument.body:t.body:Zn(e)&&ui(e)?e:rw(e)}function Hs(t,e,n){var r;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=rw(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),i=un(o);if(s){const a=Zl(i);return e.concat(i,i.visualViewport||[],ui(o)?o:[],a&&n?Hs(a):[])}return e.concat(o,Hs(o,[],n))}function Zl(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function ow(t){const e=Dn(t);let n=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const o=Zn(t),s=o?t.offsetWidth:n,i=o?t.offsetHeight:r,a=ta(n)!==s||ta(r)!==i;return a&&(n=s,r=i),{width:n,height:r,$:a}}function Qc(t){return An(t)?t:t.contextElement}function Ho(t){const e=Qc(t);if(!Zn(e))return Wn(1);const n=e.getBoundingClientRect(),{width:r,height:o,$:s}=ow(e);let i=(s?ta(n.width):n.width)/r,a=(s?ta(n.height):n.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!a||!Number.isFinite(a))&&(a=1),{x:i,y:a}}const sy=Wn(0);function sw(t){const e=un(t);return!Xc()||!e.visualViewport?sy:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function iy(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==un(t)?!1:e}function fo(t,e,n,r){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),s=Qc(t);let i=Wn(1);e&&(r?An(r)&&(i=Ho(r)):i=Ho(t));const a=iy(s,n,r)?sw(s):Wn(0);let c=(o.left+a.x)/i.x,u=(o.top+a.y)/i.y,d=o.width/i.x,p=o.height/i.y;if(s){const f=un(s),h=r&&An(r)?un(r):r;let b=f,x=Zl(b);for(;x&&r&&h!==b;){const C=Ho(x),E=x.getBoundingClientRect(),_=Dn(x),S=E.left+(x.clientLeft+parseFloat(_.paddingLeft))*C.x,j=E.top+(x.clientTop+parseFloat(_.paddingTop))*C.y;c*=C.x,u*=C.y,d*=C.x,p*=C.y,c+=S,u+=j,b=un(x),x=Zl(b)}}return ra({width:d,height:p,x:c,y:u})}function Oa(t,e){const n=Ra(t).scrollLeft;return e?e.left+n:fo(tr(t)).left+n}function iw(t,e){const n=t.getBoundingClientRect(),r=n.left+e.scrollLeft-Oa(t,n),o=n.top+e.scrollTop;return{x:r,y:o}}function ay(t){let{elements:e,rect:n,offsetParent:r,strategy:o}=t;const s=o==="fixed",i=tr(r),a=e?Ma(e.floating):!1;if(r===i||a&&s)return n;let c={scrollLeft:0,scrollTop:0},u=Wn(1);const d=Wn(0),p=Zn(r);if((p||!p&&!s)&&((hs(r)!=="body"||ui(i))&&(c=Ra(r)),Zn(r))){const h=fo(r);u=Ho(r),d.x=h.x+r.clientLeft,d.y=h.y+r.clientTop}const f=i&&!p&&!s?iw(i,c):Wn(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+f.x,y:n.y*u.y-c.scrollTop*u.y+d.y+f.y}}function ly(t){return Array.from(t.getClientRects())}function cy(t){const e=tr(t),n=Ra(t),r=t.ownerDocument.body,o=io(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=io(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+Oa(t);const a=-n.scrollTop;return Dn(r).direction==="rtl"&&(i+=io(e.clientWidth,r.clientWidth)-o),{width:o,height:s,x:i,y:a}}const Yd=25;function uy(t,e){const n=un(t),r=tr(t),o=n.visualViewport;let s=r.clientWidth,i=r.clientHeight,a=0,c=0;if(o){s=o.width,i=o.height;const d=Xc();(!d||d&&e==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}const u=Oa(r);if(u<=0){const d=r.ownerDocument,p=d.body,f=getComputedStyle(p),h=d.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(r.clientWidth-p.clientWidth-h);b<=Yd&&(s-=b)}else u<=Yd&&(s+=u);return{width:s,height:i,x:a,y:c}}const dy=new Set(["absolute","fixed"]);function py(t,e){const n=fo(t,!0,e==="fixed"),r=n.top+t.clientTop,o=n.left+t.clientLeft,s=Zn(t)?Ho(t):Wn(1),i=t.clientWidth*s.x,a=t.clientHeight*s.y,c=o*s.x,u=r*s.y;return{width:i,height:a,x:c,y:u}}function Wd(t,e,n){let r;if(e==="viewport")r=uy(t,n);else if(e==="document")r=cy(tr(t));else if(An(e))r=py(e,n);else{const o=sw(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return ra(r)}function aw(t,e){const n=Or(t);return n===e||!An(n)||Xo(n)?!1:Dn(n).position==="fixed"||aw(n,e)}function fy(t,e){const n=e.get(t);if(n)return n;let r=Hs(t,[],!1).filter(a=>An(a)&&hs(a)!=="body"),o=null;const s=Dn(t).position==="fixed";let i=s?Or(t):t;for(;An(i)&&!Xo(i);){const a=Dn(i),c=Jc(i);!c&&a.position==="fixed"&&(o=null),(s?!c&&!o:!c&&a.position==="static"&&!!o&&dy.has(o.position)||ui(i)&&!c&&aw(t,i))?r=r.filter(d=>d!==i):o=a,i=Or(i)}return e.set(t,r),r}function hy(t){let{element:e,boundary:n,rootBoundary:r,strategy:o}=t;const i=[...n==="clippingAncestors"?Ma(e)?[]:fy(e,this._c):[].concat(n),r],a=i[0],c=i.reduce((u,d)=>{const p=Wd(e,d,o);return u.top=io(p.top,u.top),u.right=ea(p.right,u.right),u.bottom=ea(p.bottom,u.bottom),u.left=io(p.left,u.left),u},Wd(e,a,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function wy(t){const{width:e,height:n}=ow(t);return{width:e,height:n}}function my(t,e,n){const r=Zn(e),o=tr(e),s=n==="fixed",i=fo(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=Wn(0);function u(){c.x=Oa(o)}if(r||!r&&!s)if((hs(e)!=="body"||ui(o))&&(a=Ra(e)),r){const h=fo(e,!0,s,e);c.x=h.x+e.clientLeft,c.y=h.y+e.clientTop}else o&&u();s&&!r&&o&&u();const d=o&&!r&&!s?iw(o,a):Wn(0),p=i.left+a.scrollLeft-c.x-d.x,f=i.top+a.scrollTop-c.y-d.y;return{x:p,y:f,width:i.width,height:i.height}}function gl(t){return Dn(t).position==="static"}function Jd(t,e){if(!Zn(t)||Dn(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return tr(t)===n&&(n=n.ownerDocument.body),n}function lw(t,e){const n=un(t);if(Ma(t))return n;if(!Zn(t)){let o=Or(t);for(;o&&!Xo(o);){if(An(o)&&!gl(o))return o;o=Or(o)}return n}let r=Jd(t,e);for(;r&&Qx(r)&&gl(r);)r=Jd(r,e);return r&&Xo(r)&&gl(r)&&!Jc(r)?n:r||ry(t)||n}const gy=async function(t){const e=this.getOffsetParent||lw,n=this.getDimensions,r=await n(t.floating);return{reference:my(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function by(t){return Dn(t).direction==="rtl"}const vy={convertOffsetParentRelativeRectToViewportRelativeRect:ay,getDocumentElement:tr,getClippingRect:hy,getOffsetParent:lw,getElementRects:gy,getClientRects:ly,getDimensions:wy,getScale:Ho,isElement:An,isRTL:by};function cw(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function xy(t,e){let n=null,r;const o=tr(t);function s(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function i(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),s();const u=t.getBoundingClientRect(),{left:d,top:p,width:f,height:h}=u;if(a||e(),!f||!h)return;const b=$i(p),x=$i(o.clientWidth-(d+f)),C=$i(o.clientHeight-(p+h)),E=$i(d),S={rootMargin:-b+"px "+-x+"px "+-C+"px "+-E+"px",threshold:io(0,ea(1,c))||1};let j=!0;function P(O){const F=O[0].intersectionRatio;if(F!==c){if(!j)return i();F?i(!1,F):r=setTimeout(()=>{i(!1,1e-7)},1e3)}F===1&&!cw(u,t.getBoundingClientRect())&&i(),j=!1}try{n=new IntersectionObserver(P,{...S,root:o.ownerDocument})}catch{n=new IntersectionObserver(P,S)}n.observe(t)}return i(!0),s}function yy(t,e,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,u=Qc(t),d=o||s?[...u?Hs(u):[],...Hs(e)]:[];d.forEach(E=>{o&&E.addEventListener("scroll",n,{passive:!0}),s&&E.addEventListener("resize",n)});const p=u&&a?xy(u,n):null;let f=-1,h=null;i&&(h=new ResizeObserver(E=>{let[_]=E;_&&_.target===u&&h&&(h.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var S;(S=h)==null||S.observe(e)})),n()}),u&&!c&&h.observe(u),h.observe(e));let b,x=c?fo(t):null;c&&C();function C(){const E=fo(t);x&&!cw(x,E)&&n(),x=E,b=requestAnimationFrame(C)}return n(),()=>{var E;d.forEach(_=>{o&&_.removeEventListener("scroll",n),s&&_.removeEventListener("resize",n)}),p==null||p(),(E=h)==null||E.disconnect(),h=null,c&&cancelAnimationFrame(b)}}const _y=Wx,Cy=Yx,Ey=(t,e,n)=>{const r=new Map,o={platform:vy,...n},s={...o.platform,_c:r};return Kx(t,e,{...o,platform:s})},ec=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ky=ec?w.useLayoutEffect:w.useEffect;let Ny=class{constructor(e){this.key=e,this.ref={current:null},this.setRefElement=this.setRefElement.bind(this)}setRefElement(e){this.ref={current:e}}};const Xd=t=>{const e=document.getElementById("typeahead-menu");if(!e)return;const n=e.getBoundingClientRect();n.top+n.height>window.innerHeight&&e.scrollIntoView({block:"center"}),n.top<0&&e.scrollIntoView({block:"center"}),t.scrollIntoView({block:"nearest"})};function Qd(t,e){const n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top>r.top&&n.top<r.bottom}function Ty(t,e,n,r){const[o]=ye();w.useEffect(()=>{if(e!=null&&t!=null){const s=o.getRootElement(),i=s!=null?function(p,f){let h=getComputedStyle(p);const b=h.position==="absolute",x=/(auto|scroll)/;if(h.position==="fixed")return document.body;for(let C=p;C=C.parentElement;)if(h=getComputedStyle(C),(!b||h.position!=="static")&&x.test(h.overflow+h.overflowY+h.overflowX))return C;return document.body}(s):document.body;let a=!1,c=Qd(e,i);const u=function(){a||(window.requestAnimationFrame(function(){n(),a=!1}),a=!0);const p=Qd(e,i);p!==c&&(c=p,r!=null&&r(p))},d=new ResizeObserver(n);return window.addEventListener("resize",n),document.addEventListener("scroll",u,{capture:!0,passive:!0}),d.observe(e),()=>{d.unobserve(e),window.removeEventListener("resize",n),document.removeEventListener("scroll",u,!0)}}},[e,o,r,n,t])}const Zd=g.createCommand("SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND");function Sy({close:t,editor:e,anchorElementRef:n,resolution:r,options:o,menuRenderFn:s,onSelectOption:i,shouldSplitNodeWithQuery:a=!1,commandPriority:c=g.COMMAND_PRIORITY_LOW,preselectFirstItem:u=!0}){const[d,p]=w.useState(null),f=r.match&&r.match.matchingString;w.useEffect(()=>{u&&p(0)},[f,u]);const h=w.useCallback(x=>{e.update(()=>{const C=r.match!=null&&a?function(E){const _=g.$getSelection();if(!g.$isRangeSelection(_)||!_.isCollapsed())return null;const S=_.anchor;if(S.type!=="text")return null;const j=S.getNode();if(!j.isSimpleText())return null;const P=S.offset,O=j.getTextContent().slice(0,P),F=E.replaceableString.length,q=P-function(W,N,M){let T=M;for(let L=T;L<=N.length;L++)W.slice(-L)===N.substring(0,L)&&(T=L);return T}(O,E.matchingString,F);if(q<0)return null;let B;return q===0?[B]=j.splitText(P):[,B]=j.splitText(q,P),B}(r.match):null;i(x,C,t,r.match?r.match.matchingString:"")})},[e,a,r.match,i,t]),b=w.useCallback(x=>{const C=e.getRootElement();C!==null&&(C.setAttribute("aria-activedescendant","typeahead-item-"+x),p(x))},[e]);return w.useEffect(()=>()=>{const x=e.getRootElement();x!==null&&x.removeAttribute("aria-activedescendant")},[e]),ky(()=>{o===null?p(null):d===null&&u&&b(0)},[o,d,b,u]),w.useEffect(()=>vt(e.registerCommand(Zd,({option:x})=>!(!x.ref||x.ref.current==null)&&(Xd(x.ref.current),!0),c)),[e,b,c]),w.useEffect(()=>vt(e.registerCommand(g.KEY_ARROW_DOWN_COMMAND,x=>{const C=x;if(o!==null&&o.length){const E=d===null?0:d!==o.length-1?d+1:0;b(E);const _=o[E];_.ref!=null&&_.ref.current&&e.dispatchCommand(Zd,{index:E,option:_}),C.preventDefault(),C.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ARROW_UP_COMMAND,x=>{const C=x;if(o!==null&&o.length){const E=d===null?o.length-1:d!==0?d-1:o.length-1;b(E);const _=o[E];_.ref!=null&&_.ref.current&&Xd(_.ref.current),C.preventDefault(),C.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ESCAPE_COMMAND,x=>{const C=x;return C.preventDefault(),C.stopImmediatePropagation(),t(),!0},c),e.registerCommand(g.KEY_TAB_COMMAND,x=>{const C=x;return o!==null&&d!==null&&o[d]!=null&&(C.preventDefault(),C.stopImmediatePropagation(),h(o[d]),!0)},c),e.registerCommand(g.KEY_ENTER_COMMAND,x=>o!==null&&d!==null&&o[d]!=null&&(x!==null&&(x.preventDefault(),x.stopImmediatePropagation()),h(o[d]),!0),c)),[h,t,e,o,d,b,c]),s(n,w.useMemo(()=>({options:o,selectOptionAndCleanUp:h,selectedIndex:d,setHighlightedIndex:p}),[h,d,o]),r.match?r.match.matchingString:"")}function ep(t,e){e!=null&&(t.className=e),t.setAttribute("aria-label","Typeahead menu"),t.setAttribute("role","listbox"),t.style.display="block",t.style.position="absolute"}function Ay({options:t,onWillOpen:e,onClose:n,onOpen:r,onSelectOption:o,menuRenderFn:s,anchorClassName:i,commandPriority:a=g.COMMAND_PRIORITY_LOW,parent:c}){const[u]=ye(),[d,p]=w.useState(null),f=qo.useRef(null),h=function(_,S,j,P=ec?document.body:void 0,O=!0){const[F]=ye(),q=ec?document.createElement("div"):null,B=w.useRef(q),W=w.useCallback(()=>{if(B.current===null||P===void 0)return;B.current.style.top=B.current.style.bottom;const M=F.getRootElement(),T=B.current,L=T.firstChild;if(M!==null&&_!==null){const{left:A,top:D,width:$,height:z}=_.getRect(),U=B.current.offsetHeight;if(T.style.top=`${D+U+3+(O?window.pageYOffset:0)}px`,T.style.left=`${A+window.pageXOffset}px`,T.style.height=`${z}px`,T.style.width=`${$}px`,L!==null){L.style.top=`${D}`;const G=L.getBoundingClientRect(),J=G.height,ee=G.width,te=M.getBoundingClientRect();A+ee>te.right&&(T.style.left=`${te.right-ee+window.pageXOffset}px`),(D+J>window.innerHeight||D+J>te.bottom)&&D-te.top>J+z&&(T.style.top=`${D-J-z+(O?window.pageYOffset:0)}px`)}T.isConnected||(ep(T,j),P.append(T)),T.setAttribute("id","typeahead-menu"),M.setAttribute("aria-controls","typeahead-menu")}},[F,_,O,j,P]);w.useEffect(()=>{const M=F.getRootElement();return _!==null&&W(),()=>{M!==null&&M.removeAttribute("aria-controls");const T=B.current;T!==null&&T.isConnected&&(T.remove(),T.removeAttribute("id"))}},[F,W,_]);const N=w.useCallback(M=>{_!==null&&(M||S(null))},[_,S]);return Ty(_,B.current,W,N),q!=null&&q===B.current&&(ep(q,j),P!=null&&P.append(q)),B}(d,p,i,c),b=w.useCallback(()=>{p(null),n!=null&&d!==null&&n()},[n,d]),x=w.useCallback(_=>{p(_),r!=null&&d===null&&r(_)},[r,d]),C=w.useCallback(_=>{_.preventDefault(),e!=null&&e(_);const S=R0(_.target);x({getRect:()=>new DOMRect(_.clientX/S,_.clientY/S,1,1)})},[x,e]),E=w.useCallback(_=>{d!==null&&f.current!=null&&_.target!=null&&g.isDOMNode(_.target)&&!f.current.contains(_.target)&&b()},[b,d]);return w.useEffect(()=>{const _=u.getRootElement();if(_)return _.addEventListener("contextmenu",C),()=>_.removeEventListener("contextmenu",C)},[u,C]),w.useEffect(()=>(document.addEventListener("click",E),()=>document.removeEventListener("click",E)),[u,E]),h.current===null||d===null||u===null?null:l.jsx(Sy,{close:b,resolution:d,editor:u,anchorElementRef:h,options:t,menuRenderFn:(_,S)=>s(_,S,{setMenuRef:j=>{f.current=j}}),onSelectOption:o,commandPriority:a})}const tp=[["Cat","rgb(125, 50, 0)"],["Dog","rgb(100, 0, 0)"],["Rabbit","rgb(150, 0, 0)"],["Frog","rgb(200, 0, 0)"],["Fox","rgb(200, 75, 0)"],["Hedgehog","rgb(0, 75, 0)"],["Pigeon","rgb(0, 125, 0)"],["Squirrel","rgb(75, 100, 0)"],["Bear","rgb(125, 100, 0)"],["Tiger","rgb(0, 0, 150)"],["Leopard","rgb(0, 0, 200)"],["Zebra","rgb(0, 0, 250)"],["Wolf","rgb(0, 100, 150)"],["Owl","rgb(0, 100, 100)"],["Gull","rgb(100, 0, 100)"],["Squid","rgb(150, 0, 150)"]],np=tp[Math.floor(Math.random()*tp.length)],Dy=w.createContext({clientID:0,color:np[1],isCollabActive:!1,name:np[0],yjsDocMap:new Map});function uw(t,e){return w.useContext(Dy)}function My(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Ry(t,e=g.$getSelection()){return e==null&&My(166),g.$isRangeSelection(e)&&e.isCollapsed()||e.getNodes().length===0?"":Pc(t,e)}function rp(t,e){const n=t.getData("text/plain")||t.getData("text/uri-list");n!=null&&e.insertRawText(n)}const ws=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Oy=ws&&"documentMode"in document?document.documentMode:null,jy=!(!ws||!("InputEvent"in window)||Oy)&&"getTargetRanges"in new window.InputEvent("input"),Iy=ws&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),op=ws&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Ly=ws&&/^(?=.*Chrome).*/i.test(navigator.userAgent),Py=ws&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!Ly;function sp(t,e){e.update(()=>{if(t!==null){const n=Qf(t,KeyboardEvent)?null:t.clipboardData,r=g.$getSelection();if(r!==null&&n!=null){t.preventDefault();const o=Ry(e);o!==null&&n.setData("text/html",o),n.setData("text/plain",r.getTextContent())}}})}function $y(t){return vt(t.registerCommand(g.DELETE_CHARACTER_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteCharacter(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_WORD_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteWord(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_LINE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteLine(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CONTROLLED_TEXT_INSERTION_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(typeof e=="string")n.insertText(e);else{const r=e.dataTransfer;if(r!=null)rp(r,n);else{const o=e.data;o&&n.insertText(o)}}return!0},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REMOVE_TEXT_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.removeText(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_LINE_BREAK_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.insertLineBreak(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_PARAGRAPH_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.insertLineBreak(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_LEFT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!0)&&(r.preventDefault(),nd(n,o,!0),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_RIGHT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!1)&&(r.preventDefault(),nd(n,o,!1),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_BACKSPACE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(!op||navigator.language!=="ko-KR")&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!0))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_DELETE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!1))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ENTER_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(e!==null){if((op||Iy||Py)&&jy)return!1;e.preventDefault()}return t.dispatchCommand(g.INSERT_LINE_BREAK_COMMAND,!1)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.SELECT_ALL_COMMAND,()=>(g.$selectAll(),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.COPY_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(sp(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CUT_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){sp(r,o),o.update(()=>{const s=g.$getSelection();g.$isRangeSelection(s)&&s.removeText()})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.PASTE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){r.preventDefault(),o.update(()=>{const s=g.$getSelection(),i=Qf(r,ClipboardEvent)?r.clipboardData:null;i!=null&&g.$isRangeSelection(s)&&rp(i,s)},{tag:g.PASTE_TAG})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DROP_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DRAGSTART_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR))}const tc=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function ip(t){return t.getEditorState().read(Ic(t.isComposing()))}function Fy({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=ye(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return tc(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=s.getElementByKey(f);b!==null&&u.push(fn.createPortal(h,b,f))}return u},[i,a,s])}(r,n);return function(s){tc(()=>vt($y(s),Zf(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(By,{content:e}),o]})}function By({content:t}){const[e]=ye(),n=function(o){const[s,i]=w.useState(()=>ip(o));return tc(()=>{function a(){const c=ip(o);i(c)}return a(),vt(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=zf();return n?typeof t=="function"?t(r):t:null}const Jn=()=>new Map,nc=t=>{const e=Jn();return t.forEach((n,r)=>{e.set(r,n)}),e},ms=(t,e,n)=>{let r=t.get(e);return r===void 0&&t.set(e,r=n()),r},qy=(t,e)=>{const n=[];for(const[r,o]of t)n.push(e(o,r));return n},Uy=(t,e)=>{for(const[n,r]of t)if(e(r,n))return!0;return!1},Qo=()=>new Set,bl=t=>t[t.length-1],Zo=Array.from,Vy=Array.isArray;class Hy{constructor(){this._observers=Jn()}on(e,n){return ms(this._observers,e,Qo).add(n),n}once(e,n){const r=(...o)=>{this.off(e,r),n(...o)};this.on(e,r)}off(e,n){const r=this._observers.get(e);r!==void 0&&(r.delete(n),r.size===0&&this._observers.delete(e))}emit(e,n){return Zo((this._observers.get(e)||Jn()).values()).forEach(r=>r(...n))}destroy(){this._observers=Jn()}}const ho=Math.floor,zi=Math.abs,dw=(t,e)=>t<e?t:e,gs=(t,e)=>t>e?t:e,zy=t=>t!==0?t<0:1/t<0,ap=1,lp=2,vl=4,xl=8,Gy=32,pw=64,oa=128,Ky=31,cp=63,Ps=127,Yy=2147483647,Wy=Number.isInteger||(t=>typeof t=="number"&&isFinite(t)&&ho(t)===t),Jy=t=>t.toLowerCase(),Xy=/^\s*/g,Qy=t=>t.replace(Xy,""),Zy=/([A-Z])/g,up=(t,e)=>Qy(t.replace(Zy,n=>`${e}${Jy(n)}`)),e2=t=>{const e=unescape(encodeURIComponent(t)),n=e.length,r=new Uint8Array(n);for(let o=0;o<n;o++)r[o]=e.codePointAt(o);return r},zs=typeof TextEncoder<"u"?new TextEncoder:null,t2=t=>zs.encode(t),n2=zs?t2:e2;let yl=typeof TextDecoder>"u"?null:new TextDecoder("utf-8",{fatal:!0,ignoreBOM:!0});yl&&yl.decode(new Uint8Array).length===1&&(yl=null);class di{constructor(){this.cpos=0,this.cbuf=new Uint8Array(100),this.bufs=[]}}const Zc=()=>new di,r2=t=>{let e=t.cpos;for(let n=0;n<t.bufs.length;n++)e+=t.bufs[n].length;return e},ar=t=>{const e=new Uint8Array(r2(t));let n=0;for(let r=0;r<t.bufs.length;r++){const o=t.bufs[r];e.set(o,n),n+=o.length}return e.set(new Uint8Array(t.cbuf.buffer,0,t.cpos),n),e},o2=(t,e)=>{const n=t.cbuf.length;n-t.cpos<e&&(t.bufs.push(new Uint8Array(t.cbuf.buffer,0,t.cpos)),t.cbuf=new Uint8Array(gs(n,e)*2),t.cpos=0)},bt=(t,e)=>{const n=t.cbuf.length;t.cpos===n&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(n*2),t.cpos=0),t.cbuf[t.cpos++]=e},rc=bt,Ue=(t,e)=>{for(;e>Ps;)bt(t,oa|Ps&e),e=ho(e/128);bt(t,Ps&e)},eu=(t,e)=>{const n=zy(e);for(n&&(e=-e),bt(t,(e>cp?oa:0)|(n?pw:0)|cp&e),e=ho(e/64);e>0;)bt(t,(e>Ps?oa:0)|Ps&e),e=ho(e/128)},oc=new Uint8Array(3e4),s2=oc.length/3,i2=(t,e)=>{if(e.length<s2){const n=zs.encodeInto(e,oc).written||0;Ue(t,n);for(let r=0;r<n;r++)bt(t,oc[r])}else ln(t,n2(e))},a2=(t,e)=>{const n=unescape(encodeURIComponent(e)),r=n.length;Ue(t,r);for(let o=0;o<r;o++)bt(t,n.codePointAt(o))},zo=zs&&zs.encodeInto?i2:a2,tu=(t,e)=>{const n=t.cbuf.length,r=t.cpos,o=dw(n-r,e.length),s=e.length-o;t.cbuf.set(e.subarray(0,o),r),t.cpos+=o,s>0&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(gs(n*2,s)),t.cbuf.set(e.subarray(o)),t.cpos=s)},ln=(t,e)=>{Ue(t,e.byteLength),tu(t,e)},nu=(t,e)=>{o2(t,e);const n=new DataView(t.cbuf.buffer,t.cpos,e);return t.cpos+=e,n},l2=(t,e)=>nu(t,4).setFloat32(0,e,!1),c2=(t,e)=>nu(t,8).setFloat64(0,e,!1),u2=(t,e)=>nu(t,8).setBigInt64(0,e,!1),dp=new DataView(new ArrayBuffer(4)),d2=t=>(dp.setFloat32(0,t),dp.getFloat32(0)===t),Gs=(t,e)=>{switch(typeof e){case"string":bt(t,119),zo(t,e);break;case"number":Wy(e)&&zi(e)<=Yy?(bt(t,125),eu(t,e)):d2(e)?(bt(t,124),l2(t,e)):(bt(t,123),c2(t,e));break;case"bigint":bt(t,122),u2(t,e);break;case"object":if(e===null)bt(t,126);else if(Vy(e)){bt(t,117),Ue(t,e.length);for(let n=0;n<e.length;n++)Gs(t,e[n])}else if(e instanceof Uint8Array)bt(t,116),ln(t,e);else{bt(t,118);const n=Object.keys(e);Ue(t,n.length);for(let r=0;r<n.length;r++){const o=n[r];zo(t,o),Gs(t,e[o])}}break;case"boolean":bt(t,e?120:121);break;default:bt(t,127)}};class pp extends di{constructor(e){super(),this.w=e,this.s=null,this.count=0}write(e){this.s===e?this.count++:(this.count>0&&Ue(this,this.count-1),this.count=1,this.w(this,e),this.s=e)}}const fp=t=>{t.count>0&&(eu(t.encoder,t.count===1?t.s:-t.s),t.count>1&&Ue(t.encoder,t.count-2))};class Gi{constructor(){this.encoder=new di,this.s=0,this.count=0}write(e){this.s===e?this.count++:(fp(this),this.count=1,this.s=e)}toUint8Array(){return fp(this),ar(this.encoder)}}const hp=t=>{if(t.count>0){const e=t.diff*2+(t.count===1?0:1);eu(t.encoder,e),t.count>1&&Ue(t.encoder,t.count-2)}};class _l{constructor(){this.encoder=new di,this.s=0,this.count=0,this.diff=0}write(e){this.diff===e-this.s?(this.s=e,this.count++):(hp(this),this.count=1,this.diff=e-this.s,this.s=e)}toUint8Array(){return hp(this),ar(this.encoder)}}class p2{constructor(){this.sarr=[],this.s="",this.lensE=new Gi}write(e){this.s+=e,this.s.length>19&&(this.sarr.push(this.s),this.s=""),this.lensE.write(e.length)}toUint8Array(){const e=new di;return this.sarr.push(this.s),this.s="",zo(e,this.sarr.join("")),tu(e,this.lensE.toUint8Array()),ar(e)}}const es=t=>new Error(t),Xn=()=>{throw es("Method unimplemented")},wo=()=>{throw es("Unexpected case")},f2=crypto.getRandomValues.bind(crypto),fw=()=>f2(new Uint32Array(1))[0],h2="10000000-1000-4000-8000"+-1e11,w2=()=>h2.replace(/[018]/g,t=>(t^fw()&15>>t/4).toString(16)),wp=t=>new Promise(t);Promise.all.bind(Promise);const mp=t=>t===void 0?null:t;class m2{constructor(){this.map=new Map}setItem(e,n){this.map.set(e,n)}getItem(e){return this.map.get(e)}}let hw=new m2,g2=!0;try{typeof localStorage<"u"&&localStorage&&(hw=localStorage,g2=!1)}catch{}const b2=hw,v2=Object.assign,x2=Object.keys,y2=(t,e)=>{for(const n in t)e(t[n],n)},gp=t=>x2(t).length,_2=t=>{for(const e in t)return!1;return!0},C2=(t,e)=>{for(const n in t)if(!e(t[n],n))return!1;return!0},E2=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),k2=(t,e)=>t===e||gp(t)===gp(e)&&C2(t,(n,r)=>(n!==void 0||E2(e,r))&&e[r]===n),N2=Object.freeze,ww=t=>{for(const e in t){const n=t[e];(typeof n=="object"||typeof n=="function")&&ww(t[e])}return N2(t)},ru=(t,e,n=0)=>{try{for(;n<t.length;n++)t[n](...e)}finally{n<t.length&&ru(t,e,n+1)}},T2=(t,e)=>e.includes(t),Ks=typeof process<"u"&&process.release&&/node|io\.js/.test(process.release.name)&&Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]";let Bn;const S2=()=>{if(Bn===void 0)if(Ks){Bn=Jn();const t=process.argv;let e=null;for(let n=0;n<t.length;n++){const r=t[n];r[0]==="-"?(e!==null&&Bn.set(e,""),e=r):e!==null&&(Bn.set(e,r),e=null)}e!==null&&Bn.set(e,"")}else typeof location=="object"?(Bn=Jn(),(location.search||"?").slice(1).split("&").forEach(t=>{if(t.length!==0){const[e,n]=t.split("=");Bn.set(`--${up(e,"-")}`,n),Bn.set(`-${up(e,"-")}`,n)}})):Bn=Jn();return Bn},sc=t=>S2().has(t),sa=t=>mp(Ks?process.env[t.toUpperCase().replaceAll("-","_")]:b2.getItem(t)),mw=t=>sc("--"+t)||sa(t)!==null;mw("production");const A2=Ks&&T2(process.env.FORCE_COLOR,["true","1","2"]),D2=A2||!sc("--no-colors")&&!mw("no-color")&&(!Ks||process.stdout.isTTY)&&(!Ks||sc("--color")||sa("COLORTERM")!==null||(sa("TERM")||"").includes("color"));class M2{constructor(e,n){this.left=e,this.right=n}}const sr=(t,e)=>new M2(t,e);typeof DOMParser<"u"&&new DOMParser;const R2=t=>qy(t,(e,n)=>`${n}:${e};`).join(""),mr=Symbol,gw=mr(),bw=mr(),O2=mr(),j2=mr(),I2=mr(),vw=mr(),L2=mr(),ou=mr(),P2=mr(),$2=t=>{var o;t.length===1&&((o=t[0])==null?void 0:o.constructor)===Function&&(t=t[0]());const e=[],n=[];let r=0;for(;r<t.length;r++){const s=t[r];if(s===void 0)break;if(s.constructor===String||s.constructor===Number)e.push(s);else if(s.constructor===Object)break}for(r>0&&n.push(e.join(""));r<t.length;r++){const s=t[r];s instanceof Symbol||n.push(s)}return n},F2={[gw]:sr("font-weight","bold"),[bw]:sr("font-weight","normal"),[O2]:sr("color","blue"),[I2]:sr("color","green"),[j2]:sr("color","grey"),[vw]:sr("color","red"),[L2]:sr("color","purple"),[ou]:sr("color","orange"),[P2]:sr("color","black")},B2=t=>{var i;t.length===1&&((i=t[0])==null?void 0:i.constructor)===Function&&(t=t[0]());const e=[],n=[],r=Jn();let o=[],s=0;for(;s<t.length;s++){const a=t[s],c=F2[a];if(c!==void 0)r.set(c.left,c.right);else{if(a===void 0)break;if(a.constructor===String||a.constructor===Number){const u=R2(r);s>0||u.length>0?(e.push("%c"+a),n.push(u)):e.push(a)}else break}}for(s>0&&(o=n,o.unshift(e.join("")));s<t.length;s++){const a=t[s];a instanceof Symbol||o.push(a)}return o},xw=D2?B2:$2,q2=(...t)=>{console.log(...xw(t)),yw.forEach(e=>e.print(t))},U2=(...t)=>{console.warn(...xw(t)),t.unshift(ou),yw.forEach(e=>e.print(t))},yw=Qo(),_w=t=>({[Symbol.iterator](){return this},next:t}),V2=(t,e)=>_w(()=>{let n;do n=t.next();while(!n.done&&!e(n.value));return n}),Cl=(t,e)=>_w(()=>{const{done:n,value:r}=t.next();return{done:n,value:n?void 0:e(r)}});class H2{constructor(e,n){this.clock=e,this.len=n}}class z2{constructor(){this.clients=new Map}}const Cw=(t,e,n)=>e.clients.forEach((r,o)=>{const s=t.doc.store.clients.get(o);if(s!=null){const i=s[s.length-1],a=i.id.clock+i.length;for(let c=0,u=r[c];c<r.length&&u.clock<a;u=r[++c])Dw(t,s,u.clock,u.len,n)}}),G2=(t,e)=>{let n=0,r=t.length-1;for(;n<=r;){const o=ho((n+r)/2),s=t[o],i=s.clock;if(i<=e){if(e<i+s.len)return o;n=o+1}else r=o-1}return null},Ew=(t,e)=>{const n=t.clients.get(e.client);return n!==void 0&&G2(n,e.clock)!==null},kw=t=>{t.clients.forEach(e=>{e.sort((o,s)=>o.clock-s.clock);let n,r;for(n=1,r=1;n<e.length;n++){const o=e[r-1],s=e[n];o.clock+o.len>=s.clock?o.len=gs(o.len,s.clock+s.len-o.clock):(r<n&&(e[r]=s),r++)}e.length=r})},Nw=(t,e,n,r)=>{ms(t.clients,e,()=>[]).push(new H2(n,r))},K2=(t,e)=>{Ue(t.restEncoder,e.clients.size),Zo(e.clients.entries()).sort((n,r)=>r[0]-n[0]).forEach(([n,r])=>{t.resetDsCurVal(),Ue(t.restEncoder,n);const o=r.length;Ue(t.restEncoder,o);for(let s=0;s<o;s++){const i=r[s];t.writeDsClock(i.clock),t.writeDsLen(i.len)}})},Tw=fw;class pi extends Hy{constructor({guid:e=w2(),collectionid:n=null,gc:r=!0,gcFilter:o=()=>!0,meta:s=null,autoLoad:i=!1,shouldLoad:a=!0}={}){super(),this.gc=r,this.gcFilter=o,this.clientID=Tw(),this.guid=e,this.collectionid=n,this.share=new Map,this.store=new r_,this._transaction=null,this._transactionCleanups=[],this.subdocs=new Set,this._item=null,this.shouldLoad=a,this.autoLoad=i,this.meta=s,this.isLoaded=!1,this.isSynced=!1,this.isDestroyed=!1,this.whenLoaded=wp(u=>{this.on("load",()=>{this.isLoaded=!0,u(this)})});const c=()=>wp(u=>{const d=p=>{(p===void 0||p===!0)&&(this.off("sync",d),u())};this.on("sync",d)});this.on("sync",u=>{u===!1&&this.isSynced&&(this.whenSynced=c()),this.isSynced=u===void 0||u===!0,this.isSynced&&!this.isLoaded&&this.emit("load",[this])}),this.whenSynced=c()}load(){const e=this._item;e!==null&&!this.shouldLoad&&He(e.parent.doc,n=>{n.subdocsLoaded.add(this)},null,!0),this.shouldLoad=!0}getSubdocs(){return this.subdocs}getSubdocGuids(){return new Set(Zo(this.subdocs).map(e=>e.guid))}transact(e,n=null){return He(this,e,n)}get(e,n=St){const r=ms(this.share,e,()=>{const s=new n;return s._integrate(this,null),s}),o=r.constructor;if(n!==St&&o!==n)if(o===St){const s=new n;s._map=r._map,r._map.forEach(i=>{for(;i!==null;i=i.left)i.parent=s}),s._start=r._start;for(let i=s._start;i!==null;i=i.right)i.parent=s;return s._length=r._length,this.share.set(e,s),s._integrate(this,null),s}else throw new Error(`Type with the name ${e} has already been defined with a different constructor`);return r}getArray(e=""){return this.get(e,ao)}getText(e=""){return this.get(e,la)}getMap(e=""){return this.get(e,ts)}getXmlElement(e=""){return this.get(e,Js)}getXmlFragment(e=""){return this.get(e,ns)}toJSON(){const e={};return this.share.forEach((n,r)=>{e[r]=n.toJSON()}),e}destroy(){this.isDestroyed=!0,Zo(this.subdocs).forEach(n=>n.destroy());const e=this._item;if(e!==null){this._item=null;const n=e.content;n.doc=new pi({guid:this.guid,...n.opts,shouldLoad:!1}),n.doc._item=e,He(e.parent.doc,r=>{const o=n.doc;e.deleted||r.subdocsAdded.add(o),r.subdocsRemoved.add(this)},null,!0)}this.emit("destroyed",[!0]),this.emit("destroy",[this]),super.destroy()}}class Y2{constructor(){this.restEncoder=Zc()}toUint8Array(){return ar(this.restEncoder)}resetDsCurVal(){}writeDsClock(e){Ue(this.restEncoder,e)}writeDsLen(e){Ue(this.restEncoder,e)}}class W2 extends Y2{writeLeftID(e){Ue(this.restEncoder,e.client),Ue(this.restEncoder,e.clock)}writeRightID(e){Ue(this.restEncoder,e.client),Ue(this.restEncoder,e.clock)}writeClient(e){Ue(this.restEncoder,e)}writeInfo(e){rc(this.restEncoder,e)}writeString(e){zo(this.restEncoder,e)}writeParentInfo(e){Ue(this.restEncoder,e?1:0)}writeTypeRef(e){Ue(this.restEncoder,e)}writeLen(e){Ue(this.restEncoder,e)}writeAny(e){Gs(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){zo(this.restEncoder,JSON.stringify(e))}writeKey(e){zo(this.restEncoder,e)}}class J2{constructor(){this.restEncoder=Zc(),this.dsCurrVal=0}toUint8Array(){return ar(this.restEncoder)}resetDsCurVal(){this.dsCurrVal=0}writeDsClock(e){const n=e-this.dsCurrVal;this.dsCurrVal=e,Ue(this.restEncoder,n)}writeDsLen(e){e===0&&wo(),Ue(this.restEncoder,e-1),this.dsCurrVal+=e}}class X2 extends J2{constructor(){super(),this.keyMap=new Map,this.keyClock=0,this.keyClockEncoder=new _l,this.clientEncoder=new Gi,this.leftClockEncoder=new _l,this.rightClockEncoder=new _l,this.infoEncoder=new pp(rc),this.stringEncoder=new p2,this.parentInfoEncoder=new pp(rc),this.typeRefEncoder=new Gi,this.lenEncoder=new Gi}toUint8Array(){const e=Zc();return Ue(e,0),ln(e,this.keyClockEncoder.toUint8Array()),ln(e,this.clientEncoder.toUint8Array()),ln(e,this.leftClockEncoder.toUint8Array()),ln(e,this.rightClockEncoder.toUint8Array()),ln(e,ar(this.infoEncoder)),ln(e,this.stringEncoder.toUint8Array()),ln(e,ar(this.parentInfoEncoder)),ln(e,this.typeRefEncoder.toUint8Array()),ln(e,this.lenEncoder.toUint8Array()),tu(e,ar(this.restEncoder)),ar(e)}writeLeftID(e){this.clientEncoder.write(e.client),this.leftClockEncoder.write(e.clock)}writeRightID(e){this.clientEncoder.write(e.client),this.rightClockEncoder.write(e.clock)}writeClient(e){this.clientEncoder.write(e)}writeInfo(e){this.infoEncoder.write(e)}writeString(e){this.stringEncoder.write(e)}writeParentInfo(e){this.parentInfoEncoder.write(e?1:0)}writeTypeRef(e){this.typeRefEncoder.write(e)}writeLen(e){this.lenEncoder.write(e)}writeAny(e){Gs(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){Gs(this.restEncoder,e)}writeKey(e){const n=this.keyMap.get(e);n===void 0?(this.keyClockEncoder.write(this.keyClock++),this.stringEncoder.write(e)):this.keyClockEncoder.write(n)}}const Q2=(t,e,n,r)=>{r=gs(r,e[0].id.clock);const o=dr(e,r);Ue(t.restEncoder,e.length-o),t.writeClient(n),Ue(t.restEncoder,r);const s=e[o];s.write(t,r-s.id.clock);for(let i=o+1;i<e.length;i++)e[i].write(t,0)},Z2=(t,e,n)=>{const r=new Map;n.forEach((o,s)=>{Kt(e,s)>o&&r.set(s,o)}),su(e).forEach((o,s)=>{n.has(s)||r.set(s,0)}),Ue(t.restEncoder,r.size),Zo(r.entries()).sort((o,s)=>s[0]-o[0]).forEach(([o,s])=>{Q2(t,e.clients.get(o),o,s)})},e_=(t,e)=>Z2(t,e.doc.store,e.beforeState);class t_{constructor(){this.l=[]}}const bp=()=>new t_,vp=(t,e)=>t.l.push(e),xp=(t,e)=>{const n=t.l,r=n.length;t.l=n.filter(o=>e!==o),r===t.l.length&&console.error("[yjs] Tried to remove event handler that doesn't exist.")},Sw=(t,e,n)=>ru(t.l,[e,n]);class Ki{constructor(e,n){this.client=e,this.clock=n}}const Fi=(t,e)=>t===e||t!==null&&e!==null&&t.client===e.client&&t.clock===e.clock,nt=(t,e)=>new Ki(t,e),n_=t=>{for(const[e,n]of t.doc.share.entries())if(n===t)return e;throw wo()},Fo=(t,e)=>e===void 0?!t.deleted:e.sv.has(t.id.client)&&(e.sv.get(t.id.client)||0)>t.id.clock&&!Ew(e.ds,t.id),ic=(t,e)=>{const n=ms(t.meta,ic,Qo),r=t.doc.store;n.has(e)||(e.sv.forEach((o,s)=>{o<Kt(r,s)&&jr(t,nt(s,o))}),Cw(t,e.ds,o=>{}),n.add(e))};class r_{constructor(){this.clients=new Map,this.pendingStructs=null,this.pendingDs=null}}const su=t=>{const e=new Map;return t.clients.forEach((n,r)=>{const o=n[n.length-1];e.set(r,o.id.clock+o.length)}),e},Kt=(t,e)=>{const n=t.clients.get(e);if(n===void 0)return 0;const r=n[n.length-1];return r.id.clock+r.length},Aw=(t,e)=>{let n=t.clients.get(e.id.client);if(n===void 0)n=[],t.clients.set(e.id.client,n);else{const r=n[n.length-1];if(r.id.clock+r.length!==e.id.clock)throw wo()}n.push(e)},dr=(t,e)=>{let n=0,r=t.length-1,o=t[r],s=o.id.clock;if(s===e)return r;let i=ho(e/(s+o.length-1)*r);for(;n<=r;){if(o=t[i],s=o.id.clock,s<=e){if(e<s+o.length)return i;n=i+1}else r=i-1;i=ho((n+r)/2)}throw wo()},o_=(t,e)=>{const n=t.clients.get(e.client);return n[dr(n,e.clock)]},El=o_,ac=(t,e,n)=>{const r=dr(e,n),o=e[r];return o.id.clock<n&&o instanceof Ot?(e.splice(r+1,0,Ww(t,o,n-o.id.clock)),r+1):r},jr=(t,e)=>{const n=t.doc.store.clients.get(e.client);return n[ac(t,n,e.clock)]},yp=(t,e,n)=>{const r=e.clients.get(n.client),o=dr(r,n.clock),s=r[o];return n.clock!==s.id.clock+s.length-1&&s.constructor!==Cr&&r.splice(o+1,0,Ww(t,s,n.clock-s.id.clock+1)),s},s_=(t,e,n)=>{const r=t.clients.get(e.id.client);r[dr(r,e.id.clock)]=n},Dw=(t,e,n,r,o)=>{if(r===0)return;const s=n+r;let i=ac(t,e,n),a;do a=e[i++],s<a.id.clock+a.length&&ac(t,e,s),o(a);while(i<e.length&&e[i].id.clock<s)};class i_{constructor(e,n,r){this.doc=e,this.deleteSet=new z2,this.beforeState=su(e.store),this.afterState=new Map,this.changed=new Map,this.changedParentTypes=new Map,this._mergeStructs=[],this.origin=n,this.meta=new Map,this.local=r,this.subdocsAdded=new Set,this.subdocsRemoved=new Set,this.subdocsLoaded=new Set,this._needFormattingCleanup=!1}}const _p=(t,e)=>e.deleteSet.clients.size===0&&!Uy(e.afterState,(n,r)=>e.beforeState.get(r)!==n)?!1:(kw(e.deleteSet),e_(t,e),K2(t,e.deleteSet),!0),Cp=(t,e,n)=>{const r=e._item;(r===null||r.id.clock<(t.beforeState.get(r.id.client)||0)&&!r.deleted)&&ms(t.changed,e,Qo).add(n)},Yi=(t,e)=>{let n=t[e],r=t[e-1],o=e;for(;o>0;n=r,r=t[--o-1]){if(r.deleted===n.deleted&&r.constructor===n.constructor&&r.mergeWith(n)){n instanceof Ot&&n.parentSub!==null&&n.parent._map.get(n.parentSub)===n&&n.parent._map.set(n.parentSub,r);continue}break}const s=e-o;return s&&t.splice(e+1-s,s),s},a_=(t,e,n)=>{for(const[r,o]of t.clients.entries()){const s=e.clients.get(r);for(let i=o.length-1;i>=0;i--){const a=o[i],c=a.clock+a.len;for(let u=dr(s,a.clock),d=s[u];u<s.length&&d.id.clock<c;d=s[++u]){const p=s[u];if(a.clock+a.len<=p.id.clock)break;p instanceof Ot&&p.deleted&&!p.keep&&n(p)&&p.gc(e,!1)}}}},l_=(t,e)=>{t.clients.forEach((n,r)=>{const o=e.clients.get(r);for(let s=n.length-1;s>=0;s--){const i=n[s],a=dw(o.length-1,1+dr(o,i.clock+i.len-1));for(let c=a,u=o[c];c>0&&u.id.clock>=i.clock;u=o[c])c-=1+Yi(o,c)}})},Mw=(t,e)=>{if(e<t.length){const n=t[e],r=n.doc,o=r.store,s=n.deleteSet,i=n._mergeStructs;try{kw(s),n.afterState=su(n.doc.store),r.emit("beforeObserverCalls",[n,r]);const a=[];n.changed.forEach((c,u)=>a.push(()=>{(u._item===null||!u._item.deleted)&&u._callObserver(n,c)})),a.push(()=>{n.changedParentTypes.forEach((c,u)=>{u._dEH.l.length>0&&(u._item===null||!u._item.deleted)&&(c=c.filter(d=>d.target._item===null||!d.target._item.deleted),c.forEach(d=>{d.currentTarget=u,d._path=null}),c.sort((d,p)=>d.path.length-p.path.length),Sw(u._dEH,c,n))})}),a.push(()=>r.emit("afterTransaction",[n,r])),ru(a,[]),n._needFormattingCleanup&&v_(n)}finally{r.gc&&a_(s,o,r.gcFilter),l_(s,o),n.afterState.forEach((d,p)=>{const f=n.beforeState.get(p)||0;if(f!==d){const h=o.clients.get(p),b=gs(dr(h,f),1);for(let x=h.length-1;x>=b;)x-=1+Yi(h,x)}});for(let d=i.length-1;d>=0;d--){const{client:p,clock:f}=i[d].id,h=o.clients.get(p),b=dr(h,f);b+1<h.length&&Yi(h,b+1)>1||b>0&&Yi(h,b)}if(!n.local&&n.afterState.get(r.clientID)!==n.beforeState.get(r.clientID)&&(q2(ou,gw,"[yjs] ",bw,vw,"Changed the client-id because another client seems to be using it."),r.clientID=Tw()),r.emit("afterTransactionCleanup",[n,r]),r._observers.has("update")){const d=new W2;_p(d,n)&&r.emit("update",[d.toUint8Array(),n.origin,r,n])}if(r._observers.has("updateV2")){const d=new X2;_p(d,n)&&r.emit("updateV2",[d.toUint8Array(),n.origin,r,n])}const{subdocsAdded:a,subdocsLoaded:c,subdocsRemoved:u}=n;(a.size>0||u.size>0||c.size>0)&&(a.forEach(d=>{d.clientID=r.clientID,d.collectionid==null&&(d.collectionid=r.collectionid),r.subdocs.add(d)}),u.forEach(d=>r.subdocs.delete(d)),r.emit("subdocs",[{loaded:c,added:a,removed:u},r,n]),u.forEach(d=>d.destroy())),t.length<=e+1?(r._transactionCleanups=[],r.emit("afterAllTransactions",[r,t])):Mw(t,e+1)}}},He=(t,e,n=null,r=!0)=>{const o=t._transactionCleanups;let s=!1,i=null;t._transaction===null&&(s=!0,t._transaction=new i_(t,n,r),o.push(t._transaction),o.length===1&&t.emit("beforeAllTransactions",[t]),t.emit("beforeTransaction",[t._transaction,t]));try{i=e(t._transaction)}finally{if(s){const a=t._transaction===o[0];t._transaction=null,a&&Mw(o,0)}}return i},Ep="You must not compute changes after the event-handler fired.";class ja{constructor(e,n){this.target=e,this.currentTarget=e,this.transaction=n,this._changes=null,this._keys=null,this._delta=null,this._path=null}get path(){return this._path||(this._path=c_(this.currentTarget,this.target))}deletes(e){return Ew(this.transaction.deleteSet,e.id)}get keys(){if(this._keys===null){if(this.transaction.doc._transactionCleanups.length===0)throw es(Ep);const e=new Map,n=this.target;this.transaction.changed.get(n).forEach(o=>{if(o!==null){const s=n._map.get(o);let i,a;if(this.adds(s)){let c=s.left;for(;c!==null&&this.adds(c);)c=c.left;if(this.deletes(s))if(c!==null&&this.deletes(c))i="delete",a=bl(c.content.getContent());else return;else c!==null&&this.deletes(c)?(i="update",a=bl(c.content.getContent())):(i="add",a=void 0)}else if(this.deletes(s))i="delete",a=bl(s.content.getContent());else return;e.set(o,{action:i,oldValue:a})}}),this._keys=e}return this._keys}get delta(){return this.changes.delta}adds(e){return e.id.clock>=(this.transaction.beforeState.get(e.id.client)||0)}get changes(){let e=this._changes;if(e===null){if(this.transaction.doc._transactionCleanups.length===0)throw es(Ep);const n=this.target,r=Qo(),o=Qo(),s=[];if(e={added:r,deleted:o,delta:s,keys:this.keys},this.transaction.changed.get(n).has(null)){let a=null;const c=()=>{a&&s.push(a)};for(let u=n._start;u!==null;u=u.right)u.deleted?this.deletes(u)&&!this.adds(u)&&((a===null||a.delete===void 0)&&(c(),a={delete:0}),a.delete+=u.length,o.add(u)):this.adds(u)?((a===null||a.insert===void 0)&&(c(),a={insert:[]}),a.insert=a.insert.concat(u.content.getContent()),r.add(u)):((a===null||a.retain===void 0)&&(c(),a={retain:0}),a.retain+=u.length);a!==null&&a.retain===void 0&&c()}this._changes=e}return e}}const c_=(t,e)=>{const n=[];for(;e._item!==null&&e!==t;){if(e._item.parentSub!==null)n.unshift(e._item.parentSub);else{let r=0,o=e._item.parent._start;for(;o!==e._item&&o!==null;)!o.deleted&&o.countable&&(r+=o.length),o=o.right;n.unshift(r)}e=e._item.parent}return n},It=()=>{U2("Invalid access: Add Yjs type to a document before reading data.")},Rw=80;let iu=0;class u_{constructor(e,n){e.marker=!0,this.p=e,this.index=n,this.timestamp=iu++}}const d_=t=>{t.timestamp=iu++},Ow=(t,e,n)=>{t.p.marker=!1,t.p=e,e.marker=!0,t.index=n,t.timestamp=iu++},p_=(t,e,n)=>{if(t.length>=Rw){const r=t.reduce((o,s)=>o.timestamp<s.timestamp?o:s);return Ow(r,e,n),r}else{const r=new u_(e,n);return t.push(r),r}},Ia=(t,e)=>{if(t._start===null||e===0||t._searchMarker===null)return null;const n=t._searchMarker.length===0?null:t._searchMarker.reduce((s,i)=>zi(e-s.index)<zi(e-i.index)?s:i);let r=t._start,o=0;for(n!==null&&(r=n.p,o=n.index,d_(n));r.right!==null&&o<e;){if(!r.deleted&&r.countable){if(e<o+r.length)break;o+=r.length}r=r.right}for(;r.left!==null&&o>e;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);for(;r.left!==null&&r.left.id.client===r.id.client&&r.left.id.clock+r.left.length===r.id.clock;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);return n!==null&&zi(n.index-o)<r.parent.length/Rw?(Ow(n,r,o),n):p_(t._searchMarker,r,o)},Ys=(t,e,n)=>{for(let r=t.length-1;r>=0;r--){const o=t[r];if(n>0){let s=o.p;for(s.marker=!1;s&&(s.deleted||!s.countable);)s=s.left,s&&!s.deleted&&s.countable&&(o.index-=s.length);if(s===null||s.marker===!0){t.splice(r,1);continue}o.p=s,s.marker=!0}(e<o.index||n>0&&e===o.index)&&(o.index=gs(e,o.index+n))}},La=(t,e,n)=>{const r=t,o=e.changedParentTypes;for(;ms(o,t,()=>[]).push(n),t._item!==null;)t=t._item.parent;Sw(r._eH,n,e)};class St{constructor(){this._item=null,this._map=new Map,this._start=null,this.doc=null,this._length=0,this._eH=bp(),this._dEH=bp(),this._searchMarker=null}get parent(){return this._item?this._item.parent:null}_integrate(e,n){this.doc=e,this._item=n}_copy(){throw Xn()}clone(){throw Xn()}_write(e){}get _first(){let e=this._start;for(;e!==null&&e.deleted;)e=e.right;return e}_callObserver(e,n){!e.local&&this._searchMarker&&(this._searchMarker.length=0)}observe(e){vp(this._eH,e)}observeDeep(e){vp(this._dEH,e)}unobserve(e){xp(this._eH,e)}unobserveDeep(e){xp(this._dEH,e)}toJSON(){}}const jw=(t,e,n)=>{t.doc??It(),e<0&&(e=t._length+e),n<0&&(n=t._length+n);let r=n-e;const o=[];let s=t._start;for(;s!==null&&r>0;){if(s.countable&&!s.deleted){const i=s.content.getContent();if(i.length<=e)e-=i.length;else{for(let a=e;a<i.length&&r>0;a++)o.push(i[a]),r--;e=0}}s=s.right}return o},Iw=t=>{t.doc??It();const e=[];let n=t._start;for(;n!==null;){if(n.countable&&!n.deleted){const r=n.content.getContent();for(let o=0;o<r.length;o++)e.push(r[o])}n=n.right}return e},Ws=(t,e)=>{let n=0,r=t._start;for(t.doc??It();r!==null;){if(r.countable&&!r.deleted){const o=r.content.getContent();for(let s=0;s<o.length;s++)e(o[s],n++,t)}r=r.right}},Lw=(t,e)=>{const n=[];return Ws(t,(r,o)=>{n.push(e(r,o,t))}),n},f_=t=>{let e=t._start,n=null,r=0;return{[Symbol.iterator](){return this},next:()=>{if(n===null){for(;e!==null&&e.deleted;)e=e.right;if(e===null)return{done:!0,value:void 0};n=e.content.getContent(),r=0,e=e.right}const o=n[r++];return n.length<=r&&(n=null),{done:!1,value:o}}}},Pw=(t,e)=>{t.doc??It();const n=Ia(t,e);let r=t._start;for(n!==null&&(r=n.p,e-=n.index);r!==null;r=r.right)if(!r.deleted&&r.countable){if(e<r.length)return r.content.getContent()[e];e-=r.length}},ia=(t,e,n,r)=>{let o=n;const s=t.doc,i=s.clientID,a=s.store,c=n===null?e._start:n.right;let u=[];const d=()=>{u.length>0&&(o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new rs(u)),o.integrate(t,0),u=[])};r.forEach(p=>{if(p===null)u.push(p);else switch(p.constructor){case Number:case Object:case Boolean:case Array:case String:u.push(p);break;default:switch(d(),p.constructor){case Uint8Array:case ArrayBuffer:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new Pa(new Uint8Array(p))),o.integrate(t,0);break;case pi:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new $a(p)),o.integrate(t,0);break;default:if(p instanceof St)o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new Hr(p)),o.integrate(t,0);else throw new Error("Unexpected content type in insert operation")}}}),d()},$w=()=>es("Length exceeded!"),Fw=(t,e,n,r)=>{if(n>e._length)throw $w();if(n===0)return e._searchMarker&&Ys(e._searchMarker,n,r.length),ia(t,e,null,r);const o=n,s=Ia(e,n);let i=e._start;for(s!==null&&(i=s.p,n-=s.index,n===0&&(i=i.prev,n+=i&&i.countable&&!i.deleted?i.length:0));i!==null;i=i.right)if(!i.deleted&&i.countable){if(n<=i.length){n<i.length&&jr(t,nt(i.id.client,i.id.clock+n));break}n-=i.length}return e._searchMarker&&Ys(e._searchMarker,o,r.length),ia(t,e,i,r)},h_=(t,e,n)=>{let o=(e._searchMarker||[]).reduce((s,i)=>i.index>s.index?i:s,{index:0,p:e._start}).p;if(o)for(;o.right;)o=o.right;return ia(t,e,o,n)},Bw=(t,e,n,r)=>{if(r===0)return;const o=n,s=r,i=Ia(e,n);let a=e._start;for(i!==null&&(a=i.p,n-=i.index);a!==null&&n>0;a=a.right)!a.deleted&&a.countable&&(n<a.length&&jr(t,nt(a.id.client,a.id.clock+n)),n-=a.length);for(;r>0&&a!==null;)a.deleted||(r<a.length&&jr(t,nt(a.id.client,a.id.clock+r)),a.delete(t),r-=a.length),a=a.right;if(r>0)throw $w();e._searchMarker&&Ys(e._searchMarker,o,-s+r)},aa=(t,e,n)=>{const r=e._map.get(n);r!==void 0&&r.delete(t)},au=(t,e,n,r)=>{const o=e._map.get(n)||null,s=t.doc,i=s.clientID;let a;if(r==null)a=new rs([r]);else switch(r.constructor){case Number:case Object:case Boolean:case Array:case String:case Date:case BigInt:a=new rs([r]);break;case Uint8Array:a=new Pa(r);break;case pi:a=new $a(r);break;default:if(r instanceof St)a=new Hr(r);else throw new Error("Unexpected content type")}new Ot(nt(i,Kt(s.store,i)),o,o&&o.lastId,null,null,e,n,a).integrate(t,0)},lu=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted?n.content.getContent()[n.length-1]:void 0},qw=t=>{const e={};return t.doc??It(),t._map.forEach((n,r)=>{n.deleted||(e[r]=n.content.getContent()[n.length-1])}),e},Uw=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted},w_=(t,e)=>{const n={};return t._map.forEach((r,o)=>{let s=r;for(;s!==null&&(!e.sv.has(s.id.client)||s.id.clock>=(e.sv.get(s.id.client)||0));)s=s.left;s!==null&&Fo(s,e)&&(n[o]=s.content.getContent()[s.length-1])}),n},Bi=t=>(t.doc??It(),V2(t._map.entries(),e=>!e[1].deleted));class Vw extends ja{}class ao extends St{constructor(){super(),this._prelimContent=[],this._searchMarker=[]}static from(e){const n=new ao;return n.push(e),n}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new ao}clone(){const e=new ao;return e.insert(0,this.toArray().map(n=>n instanceof St?n.clone():n)),e}get length(){return this.doc??It(),this._length}_callObserver(e,n){super._callObserver(e,n),La(this,e,new Vw(this,e))}insert(e,n){this.doc!==null?He(this.doc,r=>{Fw(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}push(e){this.doc!==null?He(this.doc,n=>{h_(n,this,e)}):this._prelimContent.push(...e)}unshift(e){this.insert(0,e)}delete(e,n=1){this.doc!==null?He(this.doc,r=>{Bw(r,this,e,n)}):this._prelimContent.splice(e,n)}get(e){return Pw(this,e)}toArray(){return Iw(this)}slice(e=0,n=this.length){return jw(this,e,n)}toJSON(){return this.map(e=>e instanceof St?e.toJSON():e)}map(e){return Lw(this,e)}forEach(e){Ws(this,e)}[Symbol.iterator](){return f_(this)}_write(e){e.writeTypeRef(k_)}}class m_ extends ja{constructor(e,n,r){super(e,n),this.keysChanged=r}}class ts extends St{constructor(e){super(),this._prelimContent=null,e===void 0?this._prelimContent=new Map:this._prelimContent=new Map(e)}_integrate(e,n){super._integrate(e,n),this._prelimContent.forEach((r,o)=>{this.set(o,r)}),this._prelimContent=null}_copy(){return new ts}clone(){const e=new ts;return this.forEach((n,r)=>{e.set(r,n instanceof St?n.clone():n)}),e}_callObserver(e,n){La(this,e,new m_(this,e,n))}toJSON(){this.doc??It();const e={};return this._map.forEach((n,r)=>{if(!n.deleted){const o=n.content.getContent()[n.length-1];e[r]=o instanceof St?o.toJSON():o}}),e}get size(){return[...Bi(this)].length}keys(){return Cl(Bi(this),e=>e[0])}values(){return Cl(Bi(this),e=>e[1].content.getContent()[e[1].length-1])}entries(){return Cl(Bi(this),e=>[e[0],e[1].content.getContent()[e[1].length-1]])}forEach(e){this.doc??It(),this._map.forEach((n,r)=>{n.deleted||e(n.content.getContent()[n.length-1],r,this)})}[Symbol.iterator](){return this.entries()}delete(e){this.doc!==null?He(this.doc,n=>{aa(n,this,e)}):this._prelimContent.delete(e)}set(e,n){return this.doc!==null?He(this.doc,r=>{au(r,this,e,n)}):this._prelimContent.set(e,n),n}get(e){return lu(this,e)}has(e){return Uw(this,e)}clear(){this.doc!==null?He(this.doc,e=>{this.forEach(function(n,r,o){aa(e,o,r)})}):this._prelimContent.clear()}_write(e){e.writeTypeRef(N_)}}const Tr=(t,e)=>t===e||typeof t=="object"&&typeof e=="object"&&t&&e&&k2(t,e);class lc{constructor(e,n,r,o){this.left=e,this.right=n,this.index=r,this.currentAttributes=o}forward(){switch(this.right===null&&wo(),this.right.content.constructor){case xt:this.right.deleted||bs(this.currentAttributes,this.right.content);break;default:this.right.deleted||(this.index+=this.right.length);break}this.left=this.right,this.right=this.right.right}}const kp=(t,e,n)=>{for(;e.right!==null&&n>0;){switch(e.right.content.constructor){case xt:e.right.deleted||bs(e.currentAttributes,e.right.content);break;default:e.right.deleted||(n<e.right.length&&jr(t,nt(e.right.id.client,e.right.id.clock+n)),e.index+=e.right.length,n-=e.right.length);break}e.left=e.right,e.right=e.right.right}return e},qi=(t,e,n,r)=>{const o=new Map,s=r?Ia(e,n):null;if(s){const i=new lc(s.p.left,s.p,s.index,o);return kp(t,i,n-s.index)}else{const i=new lc(null,e._start,0,o);return kp(t,i,n)}},Hw=(t,e,n,r)=>{for(;n.right!==null&&(n.right.deleted===!0||n.right.content.constructor===xt&&Tr(r.get(n.right.content.key),n.right.content.value));)n.right.deleted||r.delete(n.right.content.key),n.forward();const o=t.doc,s=o.clientID;r.forEach((i,a)=>{const c=n.left,u=n.right,d=new Ot(nt(s,Kt(o.store,s)),c,c&&c.lastId,u,u&&u.id,e,null,new xt(a,i));d.integrate(t,0),n.right=d,n.forward()})},bs=(t,e)=>{const{key:n,value:r}=e;r===null?t.delete(n):t.set(n,r)},zw=(t,e)=>{for(;t.right!==null;){if(!(t.right.deleted||t.right.content.constructor===xt&&Tr(e[t.right.content.key]??null,t.right.content.value)))break;t.forward()}},Gw=(t,e,n,r)=>{const o=t.doc,s=o.clientID,i=new Map;for(const a in r){const c=r[a],u=n.currentAttributes.get(a)??null;if(!Tr(u,c)){i.set(a,u);const{left:d,right:p}=n;n.right=new Ot(nt(s,Kt(o.store,s)),d,d&&d.lastId,p,p&&p.id,e,null,new xt(a,c)),n.right.integrate(t,0),n.forward()}}return i},kl=(t,e,n,r,o)=>{n.currentAttributes.forEach((f,h)=>{o[h]===void 0&&(o[h]=null)});const s=t.doc,i=s.clientID;zw(n,o);const a=Gw(t,e,n,o),c=r.constructor===String?new pr(r):r instanceof St?new Hr(r):new vs(r);let{left:u,right:d,index:p}=n;e._searchMarker&&Ys(e._searchMarker,n.index,c.getLength()),d=new Ot(nt(i,Kt(s.store,i)),u,u&&u.lastId,d,d&&d.id,e,null,c),d.integrate(t,0),n.right=d,n.index=p,n.forward(),Hw(t,e,n,a)},Np=(t,e,n,r,o)=>{const s=t.doc,i=s.clientID;zw(n,o);const a=Gw(t,e,n,o);e:for(;n.right!==null&&(r>0||a.size>0&&(n.right.deleted||n.right.content.constructor===xt));){if(!n.right.deleted)switch(n.right.content.constructor){case xt:{const{key:c,value:u}=n.right.content,d=o[c];if(d!==void 0){if(Tr(d,u))a.delete(c);else{if(r===0)break e;a.set(c,u)}n.right.delete(t)}else n.currentAttributes.set(c,u);break}default:r<n.right.length&&jr(t,nt(n.right.id.client,n.right.id.clock+r)),r-=n.right.length;break}n.forward()}if(r>0){let c="";for(;r>0;r--)c+=`
`;n.right=new Ot(nt(i,Kt(s.store,i)),n.left,n.left&&n.left.lastId,n.right,n.right&&n.right.id,e,null,new pr(c)),n.right.integrate(t,0),n.forward()}Hw(t,e,n,a)},Kw=(t,e,n,r,o)=>{let s=e;const i=Jn();for(;s&&(!s.countable||s.deleted);){if(!s.deleted&&s.content.constructor===xt){const u=s.content;i.set(u.key,u)}s=s.right}let a=0,c=!1;for(;e!==s;){if(n===e&&(c=!0),!e.deleted){const u=e.content;switch(u.constructor){case xt:{const{key:d,value:p}=u,f=r.get(d)??null;(i.get(d)!==u||f===p)&&(e.delete(t),a++,!c&&(o.get(d)??null)===p&&f!==p&&(f===null?o.delete(d):o.set(d,f))),!c&&!e.deleted&&bs(o,u);break}}}e=e.right}return a},g_=(t,e)=>{for(;e&&e.right&&(e.right.deleted||!e.right.countable);)e=e.right;const n=new Set;for(;e&&(e.deleted||!e.countable);){if(!e.deleted&&e.content.constructor===xt){const r=e.content.key;n.has(r)?e.delete(t):n.add(r)}e=e.left}},b_=t=>{let e=0;return He(t.doc,n=>{let r=t._start,o=t._start,s=Jn();const i=nc(s);for(;o;){if(o.deleted===!1)switch(o.content.constructor){case xt:bs(i,o.content);break;default:e+=Kw(n,r,o,s,i),s=nc(i),r=o;break}o=o.right}}),e},v_=t=>{const e=new Set,n=t.doc;for(const[r,o]of t.afterState.entries()){const s=t.beforeState.get(r)||0;o!==s&&Dw(t,n.store.clients.get(r),s,o,i=>{!i.deleted&&i.content.constructor===xt&&i.constructor!==Cr&&e.add(i.parent)})}He(n,r=>{Cw(t,t.deleteSet,o=>{if(o instanceof Cr||!o.parent._hasFormatting||e.has(o.parent))return;const s=o.parent;o.content.constructor===xt?e.add(s):g_(r,o)});for(const o of e)b_(o)})},Tp=(t,e,n)=>{const r=n,o=nc(e.currentAttributes),s=e.right;for(;n>0&&e.right!==null;){if(e.right.deleted===!1)switch(e.right.content.constructor){case Hr:case vs:case pr:n<e.right.length&&jr(t,nt(e.right.id.client,e.right.id.clock+n)),n-=e.right.length,e.right.delete(t);break}e.forward()}s&&Kw(t,s,e.right,o,e.currentAttributes);const i=(e.left||e.right).parent;return i._searchMarker&&Ys(i._searchMarker,e.index,-r+n),e};class x_ extends ja{constructor(e,n,r){super(e,n),this.childListChanged=!1,this.keysChanged=new Set,r.forEach(o=>{o===null?this.childListChanged=!0:this.keysChanged.add(o)})}get changes(){if(this._changes===null){const e={keys:this.keys,delta:this.delta,added:new Set,deleted:new Set};this._changes=e}return this._changes}get delta(){if(this._delta===null){const e=this.target.doc,n=[];He(e,r=>{const o=new Map,s=new Map;let i=this.target._start,a=null;const c={};let u="",d=0,p=0;const f=()=>{if(a!==null){let h=null;switch(a){case"delete":p>0&&(h={delete:p}),p=0;break;case"insert":(typeof u=="object"||u.length>0)&&(h={insert:u},o.size>0&&(h.attributes={},o.forEach((b,x)=>{b!==null&&(h.attributes[x]=b)}))),u="";break;case"retain":d>0&&(h={retain:d},_2(c)||(h.attributes=v2({},c))),d=0;break}h&&n.push(h),a=null}};for(;i!==null;){switch(i.content.constructor){case Hr:case vs:this.adds(i)?this.deletes(i)||(f(),a="insert",u=i.content.getContent()[0],f()):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=1):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=1);break;case pr:this.adds(i)?this.deletes(i)||(a!=="insert"&&(f(),a="insert"),u+=i.content.str):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=i.length):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=i.length);break;case xt:{const{key:h,value:b}=i.content;if(this.adds(i)){if(!this.deletes(i)){const x=o.get(h)??null;Tr(x,b)?b!==null&&i.delete(r):(a==="retain"&&f(),Tr(b,s.get(h)??null)?delete c[h]:c[h]=b)}}else if(this.deletes(i)){s.set(h,b);const x=o.get(h)??null;Tr(x,b)||(a==="retain"&&f(),c[h]=x)}else if(!i.deleted){s.set(h,b);const x=c[h];x!==void 0&&(Tr(x,b)?x!==null&&i.delete(r):(a==="retain"&&f(),b===null?delete c[h]:c[h]=b))}i.deleted||(a==="insert"&&f(),bs(o,i.content));break}}i=i.right}for(f();n.length>0;){const h=n[n.length-1];if(h.retain!==void 0&&h.attributes===void 0)n.pop();else break}}),this._delta=n}return this._delta}}class la extends St{constructor(e){super(),this._pending=e!==void 0?[()=>this.insert(0,e)]:[],this._searchMarker=[],this._hasFormatting=!1}get length(){return this.doc??It(),this._length}_integrate(e,n){super._integrate(e,n);try{this._pending.forEach(r=>r())}catch(r){console.error(r)}this._pending=null}_copy(){return new la}clone(){const e=new la;return e.applyDelta(this.toDelta()),e}_callObserver(e,n){super._callObserver(e,n);const r=new x_(this,e,n);La(this,e,r),!e.local&&this._hasFormatting&&(e._needFormattingCleanup=!0)}toString(){this.doc??It();let e="",n=this._start;for(;n!==null;)!n.deleted&&n.countable&&n.content.constructor===pr&&(e+=n.content.str),n=n.right;return e}toJSON(){return this.toString()}applyDelta(e,{sanitize:n=!0}={}){this.doc!==null?He(this.doc,r=>{const o=new lc(null,this._start,0,new Map);for(let s=0;s<e.length;s++){const i=e[s];if(i.insert!==void 0){const a=!n&&typeof i.insert=="string"&&s===e.length-1&&o.right===null&&i.insert.slice(-1)===`
`?i.insert.slice(0,-1):i.insert;(typeof a!="string"||a.length>0)&&kl(r,this,o,a,i.attributes||{})}else i.retain!==void 0?Np(r,this,o,i.retain,i.attributes||{}):i.delete!==void 0&&Tp(r,o,i.delete)}}):this._pending.push(()=>this.applyDelta(e))}toDelta(e,n,r){this.doc??It();const o=[],s=new Map,i=this.doc;let a="",c=this._start;function u(){if(a.length>0){const p={};let f=!1;s.forEach((b,x)=>{f=!0,p[x]=b});const h={insert:a};f&&(h.attributes=p),o.push(h),a=""}}const d=()=>{for(;c!==null;){if(Fo(c,e)||n!==void 0&&Fo(c,n))switch(c.content.constructor){case pr:{const p=s.get("ychange");e!==void 0&&!Fo(c,e)?(p===void 0||p.user!==c.id.client||p.type!=="removed")&&(u(),s.set("ychange",r?r("removed",c.id):{type:"removed"})):n!==void 0&&!Fo(c,n)?(p===void 0||p.user!==c.id.client||p.type!=="added")&&(u(),s.set("ychange",r?r("added",c.id):{type:"added"})):p!==void 0&&(u(),s.delete("ychange")),a+=c.content.str;break}case Hr:case vs:{u();const p={insert:c.content.getContent()[0]};if(s.size>0){const f={};p.attributes=f,s.forEach((h,b)=>{f[b]=h})}o.push(p);break}case xt:Fo(c,e)&&(u(),bs(s,c.content));break}c=c.right}u()};return e||n?He(i,p=>{e&&ic(p,e),n&&ic(p,n),d()},"cleanup"):d(),o}insert(e,n,r){if(n.length<=0)return;const o=this.doc;o!==null?He(o,s=>{const i=qi(s,this,e,!r);r||(r={},i.currentAttributes.forEach((a,c)=>{r[c]=a})),kl(s,this,i,n,r)}):this._pending.push(()=>this.insert(e,n,r))}insertEmbed(e,n,r){const o=this.doc;o!==null?He(o,s=>{const i=qi(s,this,e,!r);kl(s,this,i,n,r||{})}):this._pending.push(()=>this.insertEmbed(e,n,r||{}))}delete(e,n){if(n===0)return;const r=this.doc;r!==null?He(r,o=>{Tp(o,qi(o,this,e,!0),n)}):this._pending.push(()=>this.delete(e,n))}format(e,n,r){if(n===0)return;const o=this.doc;o!==null?He(o,s=>{const i=qi(s,this,e,!1);i.right!==null&&Np(s,this,i,n,r)}):this._pending.push(()=>this.format(e,n,r))}removeAttribute(e){this.doc!==null?He(this.doc,n=>{aa(n,this,e)}):this._pending.push(()=>this.removeAttribute(e))}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{au(r,this,e,n)}):this._pending.push(()=>this.setAttribute(e,n))}getAttribute(e){return lu(this,e)}getAttributes(){return qw(this)}_write(e){e.writeTypeRef(T_)}}class Nl{constructor(e,n=()=>!0){this._filter=n,this._root=e,this._currentNode=e._start,this._firstCall=!0,e.doc??It()}[Symbol.iterator](){return this}next(){let e=this._currentNode,n=e&&e.content&&e.content.type;if(e!==null&&(!this._firstCall||e.deleted||!this._filter(n)))do if(n=e.content.type,!e.deleted&&(n.constructor===Js||n.constructor===ns)&&n._start!==null)e=n._start;else for(;e!==null;){const r=e.next;if(r!==null){e=r;break}else e.parent===this._root?e=null:e=e.parent._item}while(e!==null&&(e.deleted||!this._filter(e.content.type)));return this._firstCall=!1,e===null?{value:void 0,done:!0}:(this._currentNode=e,{value:e.content.type,done:!1})}}class ns extends St{constructor(){super(),this._prelimContent=[]}get firstChild(){const e=this._first;return e?e.content.getContent()[0]:null}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new ns}clone(){const e=new ns;return e.insert(0,this.toArray().map(n=>n instanceof St?n.clone():n)),e}get length(){return this.doc??It(),this._prelimContent===null?this._length:this._prelimContent.length}createTreeWalker(e){return new Nl(this,e)}querySelector(e){e=e.toUpperCase();const r=new Nl(this,o=>o.nodeName&&o.nodeName.toUpperCase()===e).next();return r.done?null:r.value}querySelectorAll(e){return e=e.toUpperCase(),Zo(new Nl(this,n=>n.nodeName&&n.nodeName.toUpperCase()===e))}_callObserver(e,n){La(this,e,new y_(this,n,e))}toString(){return Lw(this,e=>e.toString()).join("")}toJSON(){return this.toString()}toDOM(e=document,n={},r){const o=e.createDocumentFragment();return r!==void 0&&r._createAssociation(o,this),Ws(this,s=>{o.insertBefore(s.toDOM(e,n,r),null)}),o}insert(e,n){this.doc!==null?He(this.doc,r=>{Fw(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}insertAfter(e,n){if(this.doc!==null)He(this.doc,r=>{const o=e&&e instanceof St?e._item:e;ia(r,this,o,n)});else{const r=this._prelimContent,o=e===null?0:r.findIndex(s=>s===e)+1;if(o===0&&e!==null)throw es("Reference item not found");r.splice(o,0,...n)}}delete(e,n=1){this.doc!==null?He(this.doc,r=>{Bw(r,this,e,n)}):this._prelimContent.splice(e,n)}toArray(){return Iw(this)}push(e){this.insert(this.length,e)}unshift(e){this.insert(0,e)}get(e){return Pw(this,e)}slice(e=0,n=this.length){return jw(this,e,n)}forEach(e){Ws(this,e)}_write(e){e.writeTypeRef(A_)}}class Js extends ns{constructor(e="UNDEFINED"){super(),this.nodeName=e,this._prelimAttrs=new Map}get nextSibling(){const e=this._item?this._item.next:null;return e?e.content.type:null}get prevSibling(){const e=this._item?this._item.prev:null;return e?e.content.type:null}_integrate(e,n){super._integrate(e,n),this._prelimAttrs.forEach((r,o)=>{this.setAttribute(o,r)}),this._prelimAttrs=null}_copy(){return new Js(this.nodeName)}clone(){const e=new Js(this.nodeName),n=this.getAttributes();return y2(n,(r,o)=>{typeof r=="string"&&e.setAttribute(o,r)}),e.insert(0,this.toArray().map(r=>r instanceof St?r.clone():r)),e}toString(){const e=this.getAttributes(),n=[],r=[];for(const a in e)r.push(a);r.sort();const o=r.length;for(let a=0;a<o;a++){const c=r[a];n.push(c+'="'+e[c]+'"')}const s=this.nodeName.toLocaleLowerCase(),i=n.length>0?" "+n.join(" "):"";return`<${s}${i}>${super.toString()}</${s}>`}removeAttribute(e){this.doc!==null?He(this.doc,n=>{aa(n,this,e)}):this._prelimAttrs.delete(e)}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{au(r,this,e,n)}):this._prelimAttrs.set(e,n)}getAttribute(e){return lu(this,e)}hasAttribute(e){return Uw(this,e)}getAttributes(e){return e?w_(this,e):qw(this)}toDOM(e=document,n={},r){const o=e.createElement(this.nodeName),s=this.getAttributes();for(const i in s){const a=s[i];typeof a=="string"&&o.setAttribute(i,a)}return Ws(this,i=>{o.appendChild(i.toDOM(e,n,r))}),r!==void 0&&r._createAssociation(o,this),o}_write(e){e.writeTypeRef(S_),e.writeKey(this.nodeName)}}class y_ extends ja{constructor(e,n,r){super(e,r),this.childListChanged=!1,this.attributesChanged=new Set,n.forEach(o=>{o===null?this.childListChanged=!0:this.attributesChanged.add(o)})}}class Yw{constructor(e,n){this.id=e,this.length=n}get deleted(){throw Xn()}mergeWith(e){return!1}write(e,n,r){throw Xn()}integrate(e,n){throw Xn()}}const __=0;class Cr extends Yw{get deleted(){return!0}delete(){}mergeWith(e){return this.constructor!==e.constructor?!1:(this.length+=e.length,!0)}integrate(e,n){n>0&&(this.id.clock+=n,this.length-=n),Aw(e.doc.store,this)}write(e,n){e.writeInfo(__),e.writeLen(this.length-n)}getMissing(e,n){return null}}class Pa{constructor(e){this.content=e}getLength(){return 1}getContent(){return[this.content]}isCountable(){return!0}copy(){return new Pa(this.content)}splice(e){throw Xn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeBuf(this.content)}getRef(){return 3}}class ca{constructor(e){this.len=e}getLength(){return this.len}getContent(){return[]}isCountable(){return!1}copy(){return new ca(this.len)}splice(e){const n=new ca(this.len-e);return this.len=e,n}mergeWith(e){return this.len+=e.len,!0}integrate(e,n){Nw(e.deleteSet,n.id.client,n.id.clock,this.len),n.markDeleted()}delete(e){}gc(e){}write(e,n){e.writeLen(this.len-n)}getRef(){return 1}}const C_=(t,e)=>new pi({guid:t,...e,shouldLoad:e.shouldLoad||e.autoLoad||!1});class $a{constructor(e){e._item&&console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."),this.doc=e;const n={};this.opts=n,e.gc||(n.gc=!1),e.autoLoad&&(n.autoLoad=!0),e.meta!==null&&(n.meta=e.meta)}getLength(){return 1}getContent(){return[this.doc]}isCountable(){return!0}copy(){return new $a(C_(this.doc.guid,this.opts))}splice(e){throw Xn()}mergeWith(e){return!1}integrate(e,n){this.doc._item=n,e.subdocsAdded.add(this.doc),this.doc.shouldLoad&&e.subdocsLoaded.add(this.doc)}delete(e){e.subdocsAdded.has(this.doc)?e.subdocsAdded.delete(this.doc):e.subdocsRemoved.add(this.doc)}gc(e){}write(e,n){e.writeString(this.doc.guid),e.writeAny(this.opts)}getRef(){return 9}}class vs{constructor(e){this.embed=e}getLength(){return 1}getContent(){return[this.embed]}isCountable(){return!0}copy(){return new vs(this.embed)}splice(e){throw Xn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeJSON(this.embed)}getRef(){return 5}}class xt{constructor(e,n){this.key=e,this.value=n}getLength(){return 1}getContent(){return[]}isCountable(){return!1}copy(){return new xt(this.key,this.value)}splice(e){throw Xn()}mergeWith(e){return!1}integrate(e,n){const r=n.parent;r._searchMarker=null,r._hasFormatting=!0}delete(e){}gc(e){}write(e,n){e.writeKey(this.key),e.writeJSON(this.value)}getRef(){return 6}}const E_=sa("node_env")==="development";class rs{constructor(e){this.arr=e,E_&&ww(e)}getLength(){return this.arr.length}getContent(){return this.arr}isCountable(){return!0}copy(){return new rs(this.arr)}splice(e){const n=new rs(this.arr.slice(e));return this.arr=this.arr.slice(0,e),n}mergeWith(e){return this.arr=this.arr.concat(e.arr),!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){const r=this.arr.length;e.writeLen(r-n);for(let o=n;o<r;o++){const s=this.arr[o];e.writeAny(s)}}getRef(){return 8}}class pr{constructor(e){this.str=e}getLength(){return this.str.length}getContent(){return this.str.split("")}isCountable(){return!0}copy(){return new pr(this.str)}splice(e){const n=new pr(this.str.slice(e));this.str=this.str.slice(0,e);const r=this.str.charCodeAt(e-1);return r>=55296&&r<=56319&&(this.str=this.str.slice(0,e-1)+"�",n.str="�"+n.str.slice(1)),n}mergeWith(e){return this.str+=e.str,!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeString(n===0?this.str:this.str.slice(n))}getRef(){return 4}}const k_=0,N_=1,T_=2,S_=3,A_=4;class Hr{constructor(e){this.type=e}getLength(){return 1}getContent(){return[this.type]}isCountable(){return!0}copy(){return new Hr(this.type._copy())}splice(e){throw Xn()}mergeWith(e){return!1}integrate(e,n){this.type._integrate(e.doc,n)}delete(e){let n=this.type._start;for(;n!==null;)n.deleted?n.id.clock<(e.beforeState.get(n.id.client)||0)&&e._mergeStructs.push(n):n.delete(e),n=n.right;this.type._map.forEach(r=>{r.deleted?r.id.clock<(e.beforeState.get(r.id.client)||0)&&e._mergeStructs.push(r):r.delete(e)}),e.changed.delete(this.type)}gc(e){let n=this.type._start;for(;n!==null;)n.gc(e,!0),n=n.right;this.type._start=null,this.type._map.forEach(r=>{for(;r!==null;)r.gc(e,!0),r=r.left}),this.type._map=new Map}write(e,n){this.type._write(e)}getRef(){return 7}}const Ww=(t,e,n)=>{const{client:r,clock:o}=e.id,s=new Ot(nt(r,o+n),e,nt(r,o+n-1),e.right,e.rightOrigin,e.parent,e.parentSub,e.content.splice(n));return e.deleted&&s.markDeleted(),e.keep&&(s.keep=!0),e.redone!==null&&(s.redone=nt(e.redone.client,e.redone.clock+n)),e.right=s,s.right!==null&&(s.right.left=s),t._mergeStructs.push(s),s.parentSub!==null&&s.right===null&&s.parent._map.set(s.parentSub,s),e.length=n,s};class Ot extends Yw{constructor(e,n,r,o,s,i,a,c){super(e,c.getLength()),this.origin=r,this.left=n,this.right=o,this.rightOrigin=s,this.parent=i,this.parentSub=a,this.redone=null,this.content=c,this.info=this.content.isCountable()?lp:0}set marker(e){(this.info&xl)>0!==e&&(this.info^=xl)}get marker(){return(this.info&xl)>0}get keep(){return(this.info&ap)>0}set keep(e){this.keep!==e&&(this.info^=ap)}get countable(){return(this.info&lp)>0}get deleted(){return(this.info&vl)>0}set deleted(e){this.deleted!==e&&(this.info^=vl)}markDeleted(){this.info|=vl}getMissing(e,n){if(this.origin&&this.origin.client!==this.id.client&&this.origin.clock>=Kt(n,this.origin.client))return this.origin.client;if(this.rightOrigin&&this.rightOrigin.client!==this.id.client&&this.rightOrigin.clock>=Kt(n,this.rightOrigin.client))return this.rightOrigin.client;if(this.parent&&this.parent.constructor===Ki&&this.id.client!==this.parent.client&&this.parent.clock>=Kt(n,this.parent.client))return this.parent.client;if(this.origin&&(this.left=yp(e,n,this.origin),this.origin=this.left.lastId),this.rightOrigin&&(this.right=jr(e,this.rightOrigin),this.rightOrigin=this.right.id),this.left&&this.left.constructor===Cr||this.right&&this.right.constructor===Cr)this.parent=null;else if(!this.parent)this.left&&this.left.constructor===Ot?(this.parent=this.left.parent,this.parentSub=this.left.parentSub):this.right&&this.right.constructor===Ot&&(this.parent=this.right.parent,this.parentSub=this.right.parentSub);else if(this.parent.constructor===Ki){const r=El(n,this.parent);r.constructor===Cr?this.parent=null:this.parent=r.content.type}return null}integrate(e,n){if(n>0&&(this.id.clock+=n,this.left=yp(e,e.doc.store,nt(this.id.client,this.id.clock-1)),this.origin=this.left.lastId,this.content=this.content.splice(n),this.length-=n),this.parent){if(!this.left&&(!this.right||this.right.left!==null)||this.left&&this.left.right!==this.right){let r=this.left,o;if(r!==null)o=r.right;else if(this.parentSub!==null)for(o=this.parent._map.get(this.parentSub)||null;o!==null&&o.left!==null;)o=o.left;else o=this.parent._start;const s=new Set,i=new Set;for(;o!==null&&o!==this.right;){if(i.add(o),s.add(o),Fi(this.origin,o.origin)){if(o.id.client<this.id.client)r=o,s.clear();else if(Fi(this.rightOrigin,o.rightOrigin))break}else if(o.origin!==null&&i.has(El(e.doc.store,o.origin)))s.has(El(e.doc.store,o.origin))||(r=o,s.clear());else break;o=o.right}this.left=r}if(this.left!==null){const r=this.left.right;this.right=r,this.left.right=this}else{let r;if(this.parentSub!==null)for(r=this.parent._map.get(this.parentSub)||null;r!==null&&r.left!==null;)r=r.left;else r=this.parent._start,this.parent._start=this;this.right=r}this.right!==null?this.right.left=this:this.parentSub!==null&&(this.parent._map.set(this.parentSub,this),this.left!==null&&this.left.delete(e)),this.parentSub===null&&this.countable&&!this.deleted&&(this.parent._length+=this.length),Aw(e.doc.store,this),this.content.integrate(e,this),Cp(e,this.parent,this.parentSub),(this.parent._item!==null&&this.parent._item.deleted||this.parentSub!==null&&this.right!==null)&&this.delete(e)}else new Cr(this.id,this.length).integrate(e,0)}get next(){let e=this.right;for(;e!==null&&e.deleted;)e=e.right;return e}get prev(){let e=this.left;for(;e!==null&&e.deleted;)e=e.left;return e}get lastId(){return this.length===1?this.id:nt(this.id.client,this.id.clock+this.length-1)}mergeWith(e){if(this.constructor===e.constructor&&Fi(e.origin,this.lastId)&&this.right===e&&Fi(this.rightOrigin,e.rightOrigin)&&this.id.client===e.id.client&&this.id.clock+this.length===e.id.clock&&this.deleted===e.deleted&&this.redone===null&&e.redone===null&&this.content.constructor===e.content.constructor&&this.content.mergeWith(e.content)){const n=this.parent._searchMarker;return n&&n.forEach(r=>{r.p===e&&(r.p=this,!this.deleted&&this.countable&&(r.index-=this.length))}),e.keep&&(this.keep=!0),this.right=e.right,this.right!==null&&(this.right.left=this),this.length+=e.length,!0}return!1}delete(e){if(!this.deleted){const n=this.parent;this.countable&&this.parentSub===null&&(n._length-=this.length),this.markDeleted(),Nw(e.deleteSet,this.id.client,this.id.clock,this.length),Cp(e,n,this.parentSub),this.content.delete(e)}}gc(e,n){if(!this.deleted)throw wo();this.content.gc(e),n?s_(e,this,new Cr(this.id,this.length)):this.content=new ca(this.length)}write(e,n){const r=n>0?nt(this.id.client,this.id.clock+n-1):this.origin,o=this.rightOrigin,s=this.parentSub,i=this.content.getRef()&Ky|(r===null?0:oa)|(o===null?0:pw)|(s===null?0:Gy);if(e.writeInfo(i),r!==null&&e.writeLeftID(r),o!==null&&e.writeRightID(o),r===null&&o===null){const a=this.parent;if(a._item!==void 0){const c=a._item;if(c===null){const u=n_(a);e.writeParentInfo(!0),e.writeString(u)}else e.writeParentInfo(!1),e.writeLeftID(c.id)}else a.constructor===String?(e.writeParentInfo(!0),e.writeString(a)):a.constructor===Ki?(e.writeParentInfo(!1),e.writeLeftID(a)):wo();s!==null&&e.writeString(s)}this.content.write(e,n)}}const Jw=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:{},Xw="__ $YJS$ __";Jw[Xw]===!0&&console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");Jw[Xw]=!0;g.createCommand("CONNECTED_COMMAND");const D_=g.createCommand("TOGGLE_CONNECT_COMMAND");var M_=Object.defineProperty,R_=(t,e,n)=>e in t?M_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>R_(t,typeof e!="symbol"?e+"":e,n);const Tl=t=>g.$applyNodeReplacement(g.$parseSerializedNode(t)),mo=g.createState("cid",{parse:t=>typeof t=="string"?t:void 0}),go=g.createState("segment",{parse:t=>typeof t=="string"?t:void 0}),cc="unknown",Qw=1;class Ao extends g.ElementNode{constructor(e="",n,r,o){super(o),de(this,"__tag"),de(this,"__marker"),de(this,"__unknownAttributes"),this.__tag=e,this.__marker=n,this.__unknownAttributes=r}static getType(){return"unknown"}static clone(e){const{__tag:n,__marker:r,__unknownAttributes:o,__key:s}=e;return new Ao(n,r,o,s)}static importDOM(){return{[cc]:e=>j_(e)?{conversion:O_,priority:1}:null}}static importJSON(e){return Zw().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTag(e.tag).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setTag(e){if(this.__tag===e)return this;const n=this.getWritable();return n.__tag=e,n}getTag(){return this.getLatest().__tag}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(cc);return e.style.display="none",e}updateDOM(){return!1}exportDOM(){return{element:null}}exportJSON(){return{...super.exportJSON(),type:this.getType(),tag:this.getTag(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:Qw}}canBeEmpty(){return!0}isInline(){return!0}extractWithChild(){return!1}excludeFromCopy(e){return e!=="clone"}}function O_(t){const e=t.getAttribute("data-tag")??"",n=t.getAttribute("data-marker")??"";return{node:Zw(e,n)}}function Zw(t,e,n){return g.$applyNodeReplacement(new Ao(t,e,n))}function j_(t){return(t==null?void 0:t.tagName)===cc}function fi(t){return t instanceof Ao}const Xs="id",em=1;class mn extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker",Xs),de(this,"__code"),de(this,"__unknownAttributes"),this.__code=e,this.__unknownAttributes=n}static getType(){return"book"}static clone(e){const{__code:n,__unknownAttributes:r,__key:o}=e;return new mn(n,r,o)}static importJSON(e){const{code:n}=e;return tm(n).updateFromJSON(e)}static isValidBookCode(e){return yv(e)}updateFromJSON(e){return super.updateFromJSON(e).setCode(e.code).setUnknownAttributes(e.unknownAttributes)}getMarker(){return this.getLatest().__marker}setCode(e){if(this.__code===e)return this;const n=this.getWritable();return n.__code=e,n}getCode(){return this.getLatest().__code}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e.setAttribute("data-code",this.__code),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),code:this.getCode(),unknownAttributes:this.getUnknownAttributes(),version:em}}}function tm(t,e){return g.$applyNodeReplacement(new mn(t,e))}function Qn(t){return t instanceof mn}function I_(t){return(t==null?void 0:t.type)===mn.getType()}const Ae=" ",uc="​",cu=`${Ae}|`,Fa="p",Ir="+",Qs="-",ua="chapter",dc="verse",Sp="invalid",L_="text-spacing",P_="formatted-font",$_="marker-",uu="external-usj-mutation",nm="selection-change",pc="cursor-change",fc="annotation-change",hc="delta-change",F_=[uu,nm,pc,fc,hc],da="c",rm=1;class jn extends g.ElementNode{constructor(e="",n,r,o,s,i){super(i),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=da,this.__number=e,this.__sid=n,this.__altnumber=r,this.__pubnumber=o,this.__unknownAttributes=s}static getType(){return"chapter"}static clone(e){const{__number:n,__sid:r,__altnumber:o,__pubnumber:s,__unknownAttributes:i,__key:a}=e;return new jn(n,r,o,s,i,a)}static importJSON(e){return om().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(ua,`usfm_${this.__marker}`),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:rm}}}function om(t,e,n,r,o){return g.$applyNodeReplacement(new jn(t,e,n,r,o))}function du(t){return t instanceof jn}function B_(t){return(t==null?void 0:t.type)===jn.getType()}const sm=["fr","fq","fqa","fk","ft","fl","fw","fp","fv","fdc","fm"],im=["xo","xop","xk","xq","xt","xta","xot","xnt","xdc"],q_=["ca","cp","va","vp","add","bk","dc","em","jmp","k","nd","ord","pn","png","qt","rb","rq","sig","sls","tl","w","wa","wg","wh","wj","bd","it","bdit","no","sc","sup","ior","iqt","qac","qs","litl","lik","liv","liv1","liv2","liv3","liv4","liv5",...sm,...im],am=1;class Qe extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"char"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Qe(n,r,o)}static isValidMarker(e){return e!==void 0&&q_.includes(e)}static isValidFootnoteMarker(e){return e!==void 0&&sm.includes(e)}static isValidCrossReferenceMarker(e){return e!==void 0&&im.includes(e)}static importDOM(){return{span:e=>V_(e)?{conversion:U_,priority:1}:null}}static importJSON(e){return Hn().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.setAttribute("title",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:am}}insertNewAfter(e,n){const r=Hn(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}canBeEmpty(){return!1}isInline(){return!0}}function U_(t){const e=t.getAttribute("data-marker")??"f";return{node:Hn(e)}}function Hn(t,e){return g.$applyNodeReplacement(new Qe(t,e))}function V_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return Qe.isValidMarker(e)&&t.classList.contains(Qe.getType())}function Be(t){return t instanceof Qe}function H_(t){return(t==null?void 0:t.type)===Qe.getType()}const lm=1,z_="c",cm="span";class gr extends g.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=z_,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-chapter"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new gr(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>um(e)?{conversion:G_,priority:1}:null}}static importJSON(e){return pu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(cm);return e.setAttribute("data-marker",this.__marker),e.classList.add(ua,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(ua,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return this.getShowMarker()?wi(this.getMarker(),this.getNumber()):this.getNumber()}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:lm}}isInline(){return!1}isKeyboardSelectable(){return!1}}function G_(t){const e=t.getAttribute("data-number")??"0";return{node:pu(e)}}function pu(t,e,n,r,o,s){return g.$applyNodeReplacement(new gr(t,e,n,r,o,s))}function um(t){return t?t.classList.contains(ua)&&t.tagName.toLowerCase()===cm:!1}function hi(t){return t instanceof gr}function K_(t){return(t==null?void 0:t.type)===gr.getType()}const dm=1;class Lr extends g.ParagraphNode{static getType(){return"implied-para"}static clone(e){return new Lr(e.__key)}static importJSON(e){return Nn().updateFromJSON(e)}getMarker(){return Fa}exportJSON(){return{...super.exportJSON(),type:this.getType(),version:dm}}insertNewAfter(e,n){const r=Nn();return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function Nn(){return g.$applyNodeReplacement(new Lr)}function fr(t){return t instanceof Lr}function fu(t){return(t==null?void 0:t.type)===Lr.getType()}const bo="zmsc-s",Go="zmsc-e",Y_=[bo,Go],W_=["ts-s","ts-e","t-s","t-e","ts","qt1-s","qt1-e","qt2-s","qt2-e","qt3-s","qt3-e","qt4-s","qt4-e","qt5-s","qt5-e","qt-s","qt-e",bo,Go],pm=1;class er extends g.DecoratorNode{constructor(e="",n,r,o,s){super(s),de(this,"__marker"),de(this,"__sid"),de(this,"__eid"),de(this,"__unknownAttributes"),this.__marker=e,this.__sid=n,this.__eid=r,this.__unknownAttributes=o}static getType(){return"ms"}static clone(e){const{__marker:n,__sid:r,__eid:o,__unknownAttributes:s,__key:i}=e;return new er(n,r,o,s,i)}static importJSON(e){return fm().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&(W_.includes(e)||e.startsWith("z"))}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setSid(e.sid).setEid(e.eid).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setEid(e){if(this.__eid===e)return this;const n=this.getWritable();return n.__eid=e,n}getEid(){return this.getLatest().__eid}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}decorate(){return""}exportJSON(){return{type:this.getType(),marker:this.getMarker(),sid:this.getSid(),eid:this.getEid(),unknownAttributes:this.getUnknownAttributes(),version:pm}}isKeyboardSelectable(){return!1}}function J_(t){return Y_.includes(t)}function fm(t,e,n,r){return g.$applyNodeReplacement(new er(t,e,n,r))}function Ba(t){return t instanceof er}const hu="f",X_=[hu,"fe","ef","efe","x","ex"],hm=1;class yt extends g.ElementNode{constructor(e=hu,n,r=!0,o,s,i){super(i),de(this,"__marker"),de(this,"__caller"),de(this,"__isCollapsed"),de(this,"__category"),de(this,"__unknownAttributes"),this.__marker=e,this.__caller=n??(e==="x"||e==="ex"?Qs:Ir),this.__isCollapsed=r,this.__category=o,this.__unknownAttributes=s}static getType(){return"note"}static clone(e){const{__marker:n,__caller:r,__isCollapsed:o,__category:s,__unknownAttributes:i,__key:a}=e;return new yt(n,r,o,s,i,a)}static importDOM(){return{span:e=>Z_(e)?{conversion:Q_,priority:1}:null}}static importJSON(e){return wu().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&X_.includes(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setCaller(e.caller).setIsCollapsed(e.isCollapsed).setCategory(e.category).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setIsCollapsed(e){if(this.__isCollapsed===e)return this;const n=this.getWritable();return n.__isCollapsed=e,n}toggleIsCollapsed(){const e=this.getWritable();return e.__isCollapsed=!e.__isCollapsed,e}getIsCollapsed(){return this.getLatest().__isCollapsed}setCategory(e){if(this.__category===e)return this;const n=this.getWritable();return n.__category=e,n}getCategory(){return this.getLatest().__category}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`,this.__isCollapsed?"collapsed":"expanded"),e.setAttribute("data-caller",this.__caller),e}updateDOM(e){return e.__isCollapsed!==this.__isCollapsed}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`,this.getIsCollapsed()?"collapsed":"expanded"),n.setAttribute("data-caller",this.getCaller())),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),caller:this.getCaller(),isCollapsed:this.getIsCollapsed(),category:this.getCategory(),unknownAttributes:this.getUnknownAttributes(),version:hm}}canBeEmpty(){return!1}isInline(){return!0}}function Q_(t){const e=t.getAttribute("data-marker")??"f",n=t.getAttribute("data-caller")??"",r=t.classList.contains("collapsed");return{node:wu(e,n,r)}}function wu(t,e,n,r,o){return g.$applyNodeReplacement(new yt(t,e,n,r,o))}function Z_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return yt.isValidMarker(e)&&t.classList.contains(yt.getType())}function Se(t){return t instanceof yt}const eC=["ide","sts","rem","h","toc1","toc2","toc3","toca1","toca2","toca3","imt","imt1","imt2","imt3","imt4","is","is1","is2","ip","ipi","im","imi","ipq","imq","ipr","iq","iq1","iq2","iq3","ili","ili1","ili2","ib","iot","io","io1","io2","io3","io4","iex","imte","imte1","imte2","ie","mt","mt1","mt2","mt3","mt4","mte","mte1","mte2","cl","cd","ms","ms1","ms2","ms3","mr","s","s1","s2","s3","s4","sr","r","d","sp","sd","sd1","sd2","sd3","sd4",Fa,"m","po","cls","pr","pc","pm","pmo","pmc","pmr","pi","pi1","pi2","pi3","mi","lit","nb","q","q1","q2","q3","q4","qr","qc","qa","qm","qm1","qm2","qm3","qd","b","lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4","pb"],wm=1;class Yt extends g.ParagraphNode{constructor(e=Fa,n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"para"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Yt(n,r,o)}static isValidMarker(e){return e!==void 0&&eC.includes(e)}static importDOM(){return{p:()=>({conversion:tC,priority:1})}}static importJSON(e){return Zs().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:wm}}insertNewAfter(e,n){const r=Zs(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function tC(t){const e=t.getAttribute("data-marker")??void 0,n=Zs(e);if(t.style){n.setFormat(t.style.textAlign);const r=parseInt(t.style.textIndent,10)/20;r>0&&n.setIndent(r)}return{node:n}}function Zs(t,e){return g.$applyNodeReplacement(new Yt(t,e))}function jt(t){return t instanceof Yt}function nC(t){return(t==null?void 0:t.type)===Yt.getType()}const pa="v",mm=1;class Bt extends g.TextNode{constructor(e="",n,r,o,s,i,a){super(n??e,a),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=pa,this.__number=e,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"verse"}static clone(e){const{__number:n,__text:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new Bt(n,r,o,s,i,a,c)}static importJSON(e){return gm().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(dc,`usfm_${this.__marker}`),n.setAttribute("data-number",this.__number),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:mm}}}function gm(t,e,n,r,o,s){return g.$applyNodeReplacement(new Bt(t,e,n,r,o,s))}function mu(t){return t instanceof Bt}function rC(t){return(t==null?void 0:t.type)===Bt.getType()}function oC(t){return B_(t)||K_(t)}function hn(t){return du(t)||hi(t)}function sC(t,e){return t.find(n=>hn(n)&&n.getNumber()===e.toString())}function iC(t,e=!1){return t.find((n,r)=>(!e||r>0)&&hn(n))}function gu(t){var e;if(!t)return;if(hn(t))return t;let n=(e=t.getTopLevelElement())==null?void 0:e.getPreviousSibling();for(;n&&!hn(n);)n=n.getPreviousSibling();if(n&&hn(n))return n}function bm(t){let e=t;for(;e!==null;){if(Se(e))return e;e=e.getParent()}}function aC(t){return Qn(t)||du(t)||Be(t)||hi(t)||fr(t)||Ba(t)||jt(t)||Se(t)||mu(t)||fi(t)}function lC(t){var e;if(t.anchor.type==="element"){const r=t.anchor.getNode(),o=t.anchor.offset;if(o<r.getChildrenSize())return r.getChildAtIndex(o)}const n=t.anchor.getNode();return n.getNextSibling()??((e=n.getParent())==null?void 0:e.getNextSibling())??null}function cC(t){var e;const n=t.anchor.offset;if(t.anchor.type==="element"&&n>0)return t.anchor.getNode().getChildAtIndex(n-1);const r=t.anchor.getNode();return r.getPreviousSibling()??((e=r.getParent())==null?void 0:e.getPreviousSibling())??null}function kn(t){return jt(t)||fr(t)}function uC(t,e){let n=t.getParent();for(;n;){if(n.getKey()===e)return!0;n=n.getParent()}return!1}function vo(t,e){const n=g.$getState(e,mo),r=!!(t.cid&&n),o=!t.cid&&!n;return t.style===e.getMarker()&&(o||r&&t.cid===n)}function dC(t,e){const n=g.$isElementNode(t)?t:t.getParent(),r=g.$isElementNode(e)?e:e.getParent(),o=n&&r?g.$getCommonAncestor(n,r):void 0;return o?o.commonAncestor:void 0}function pC(t){const e=t.getStartEndPoints();if(!e)return;const[n,r]=e,o=t.isBackward()?n:r;t.focus.set(o.key,o.offset,o.type),t.anchor.set(o.key,o.offset,o.type)}function bu(t){return(t==null?void 0:t.type)===g.TextNode.getType()}function fC(t,e){if(!e)return;const n=t.findIndex(r=>r===e);n&&(t.length=n)}function hC(t,e){if(!e)return t;const n=e.getIndexWithinParent();return t.splice(n+1,t.length-n-1)}function br(t){return`\\${t}`}function os(t){return`\\${t}*`}function vm(t,e,n){const r=br(t);if(e!=null&&e.startsWith(r)){const o=parseInt(e.slice(r.length),10);isNaN(o)||(n=o.toString())}return n}function wi(t,e){let n=br(t);return e&&(n+=`${Ae}${e}`),n+=" ",n}function xm(t){return bu(t)&&t.text!==Ae?t.text:H_(t)?t.children.map(e=>xm(e)).join(""):""}function wC(t){return t.map(e=>xm(e)).filter(e=>e.length>0).join(" ").trim()}function vu(t){return Ae+t+" "}function xu(t){const e=[];for(const n of t){if(!Be(n))continue;const r=n.getTextContent();r!==Ae&&r.length>0&&e.push(r)}return e.join(" ").trim()}function _t(t,e=xv){const n={...t};return e.forEach(r=>{Reflect.deleteProperty(n,r)}),Object.keys(n).length===0?void 0:n}function mC(t,e){const n=e.getElementByKey(t.getKey());return n?n.tagName.toLowerCase():void 0}function wt(t){return Object.fromEntries(Object.entries(t).filter(([,e])=>e!==void 0))}function ym(t){if(!t)return;const e=t.getNodes();if(e.length>0)return t.isBackward()?e[e.length-1]:e[0]}function wc(t,e){if(!e)return(t+1).toString();const n=e.split("-");if(n.length===2)return parseInt(n[1])?`${parseInt(n[1])+1}`:`${parseInt(n[0])+1}`;const r=RegExp(/^(\d+)([a-yA-Y]{1,3})$/).exec(e);if(!r)return(parseInt(e)+1).toString();const o=String.fromCharCode(r[2].charCodeAt(0)+1);return`${r[1]}${o}`}function yu(t,e){if(!e)return!1;const n=e.split("-").map(r=>parseInt(r));if(n.length<1||n.length>2||n[0]>n[1])throw new Error("isVerseInRange: invalid range");return n.length===1?t===n[0]:n.length===2&&isNaN(n[1])?t>=n[0]:(n.length===2&&isNaN(n[0])||t>=n[0])&&t<=n[1]}function gC(t){return!!t&&t.includes("-")}const bC=1;class Do extends g.TextNode{constructor(e="",n="opening",r){super(Sl(e,n),r),de(this,"__marker"),de(this,"__markerSyntax"),this.__marker=e,this.__markerSyntax=n}static getType(){return"marker"}static clone(e){return new Do(e.__marker,e.__markerSyntax,e.__key)}static importJSON(e){return ss().updateFromJSON(e)}updateFromJSON(e){const{marker:n,markerSyntax:r="opening"}=e;return super.updateFromJSON(e).setMarker(n).setMarkerSyntax(r)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n.__text=Sl(e,n.__markerSyntax),n}getMarker(){return this.getLatest().__marker}setMarkerSyntax(e){if(this.__markerSyntax===e)return this;const n=this.getWritable();return n.__markerSyntax=e,n.__text=Sl(n.__marker,e),n}getMarkerSyntax(){return this.getLatest().__markerSyntax}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(this.__markerSyntax),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),text:this.getTextContent(),marker:this.getMarker(),markerSyntax:this.getMarkerSyntax(),version:bC}}}function ss(t,e){return g.$applyNodeReplacement(new Do(t,e))}function mi(t){return t instanceof Do}function Sl(t,e){return e==="closing"?os(t):e==="selfClosing"?os(""):br(t)}const Sr="internal-comment",vC=[Sr],xC={},yC=1;class Tt extends g.ElementNode{constructor(e=xC,n){super(n),de(this,"__typedIDs"),this.__typedIDs=e}static getType(){return"typed-mark"}static clone(e){const n=JSON.parse(JSON.stringify(e.__typedIDs));return new Tt(n,e.__key)}static isReservedType(e){return vC.includes(e)}static importDOM(){return null}static importJSON(e){return ei().updateFromJSON(e)}exportJSON(){return{...super.exportJSON(),type:this.getType(),typedIDs:this.getTypedIDs(),version:yC}}createDOM(e){const n=document.createElement("mark");for(const[r,o]of Object.entries(this.__typedIDs))kr(n,Ui(e.theme.typedMark,r)),o.length>1&&kr(n,Ui(e.theme.typedMarkOverlap,r));return n}updateDOM(e,n,r){for(const[o,s]of Object.entries(this.__typedIDs)){const i=e.__typedIDs[o].length,a=s.length,c=Ui(r.theme.typedMark,o),u=Ui(r.theme.typedMarkOverlap,o);i!==a&&(i===0?a===1&&kr(n,c):a===0&&zl(n,c),i===1?a===2&&kr(n,u):a===1&&zl(n,u))}return!1}updateFromJSON(e){return super.updateFromJSON(e).setTypedIDs(e.typedIDs)}hasID(e,n){const r=this.getTypedIDs()[e];if(!r)return!1;for(const o of r)if(n===o)return!0;return!1}getTypedIDs(){const e=this.getLatest();return At(e)?e.__typedIDs:{}}setTypedIDs(e){const n=this.getWritable();return n.__typedIDs=e,n}addID(e,n){const r=this.getWritable();if(!At(r))return;const o=r.__typedIDs[e]??[];r.__typedIDs[e]=o;for(const s of o)if(n===s)return;o.push(n)}deleteID(e,n){const r=this.getWritable();if(!At(r))return;const o=r.__typedIDs[e];for(let s=0;s<o.length;s++)if(n===o[s]){o.splice(s,1);return}}hasNoIDsForEveryType(){return Object.values(this.getTypedIDs()).every(e=>e===void 0||e.length===0)}insertNewAfter(e,n=!0){const r=ei(this.__typedIDs);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}}function Ui(t,e){return`${t}-${e}`}function ei(t){return g.$applyNodeReplacement(new Tt(t))}function At(t){return t instanceof Tt}function _C(t){return(t==null?void 0:t.type)===Tt.getType()}function _m(t){const e=t.getChildren();let n=null;for(const r of e)n===null?t.insertBefore(r):n.insertAfter(r),n=r;t.remove()}function Cm(t,e,n,r){const o=t.getNodes(),s=t.anchor.offset,i=t.focus.offset,a=o.length,c=t.isBackward(),u=c?i:s,d=c?s:i;let p,f;for(let h=0;h<a;h++){const b=o[h];if(g.$isElementNode(f)&&f.isParentOf(b))continue;const x=h===0,C=h===a-1;let E=null;if(g.$isTextNode(b)){const _=b.getTextContentSize(),S=x?u:0,j=C?d:_;if(S===0&&j===0)continue;const P=b.splitText(S,j);E=P.length>1&&(P.length===3||x&&!C||j===_)?P[1]:P[0]}else{if(At(b))continue;g.$isElementNode(b)&&b.isInline()&&(E=b)}if(E!==null){if(E&&E.is(p))continue;const _=E.getParent();(_==null||!_.is(p))&&(f=void 0),p=_,f===void 0&&(f=ei({[e]:[n]}),E.insertBefore(f)),f.append(E)}else p=void 0,f=void 0}e===Sr&&g.$isElementNode(f)&&(c?f.selectStart():f.selectEnd())}function CC(t,e,n){let r=t;for(;r!==null;){if(At(r))return r.getTypedIDs()[e];if(g.$isTextNode(r)&&n===r.getTextContentSize()){const o=r.getNextSibling();if(At(o))return o.getTypedIDs()[e]}r=r.getParent()}}function Ap(t){return`external-${t}`}const Em=1;class zr extends g.DecoratorNode{constructor(e="",n="",r){super(r),de(this,"__textType"),de(this,"__text"),this.__textType=e,this.__text=n}static getType(){return"immutable-typed-text"}static clone(e){const{__textType:n,__text:r,__key:o}=e;return new zr(n,r,o)}static importDOM(){return{span:e=>kC(e)?{conversion:EC,priority:1}:null}}static importJSON(e){return is().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTextType(e.textType).setTextContent(e.text)}setTextType(e){if(this.__textType===e)return this;const n=this.getWritable();return n.__textType=e,n}getTextType(){return this.getLatest().__textType}setTextContent(e){if(this.__text===e)return this;const n=this.getWritable();return n.__text=e,n}getTextContent(){return this.getLatest().__text}createDOM(){const e=document.createElement("span");return e.setAttribute("data-text-type",this.__textType),e.classList.add(this.__textType),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&n.setAttribute("data-text-type",this.getTextType()),{element:n}}decorate(){return this.getTextContent()}exportJSON(){return{type:this.getType(),textType:this.getTextType(),text:this.getTextContent(),version:Em}}isKeyboardSelectable(){return!1}}function EC(t){const e=t.getAttribute("data-text-type")??"",n=t.textContent??"";return{node:is(e,n)}}function is(t,e){return g.$applyNodeReplacement(new zr(t,e))}function kC(t){return(t==null?void 0:t.tagName)==="span"}function fa(t){return t instanceof zr}function NC(t){return(t==null?void 0:t.type)===zr.getType()}const ha="unmatched",km=1;class Gr extends g.DecoratorNode{constructor(e="",n){super(n),de(this,"__marker"),this.__marker=e}static getType(){return"unmatched"}static clone(e){const{__marker:n,__key:r}=e;return new Gr(n,r)}static importDOM(){return{[ha]:e=>SC(e)?{conversion:TC,priority:1}:null}}static importJSON(e){return _u().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}createDOM(){const e=document.createElement(ha);e.setAttribute("data-marker",this.__marker),e.classList.add(Sp);const n=this.__marker.endsWith("*");return e.title=n?"This closing marker has no matching opening marker!":"This opening marker has no matching closing marker!",e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(Sp)),{element:n}}decorate(){return`\\${this.getMarker()}${uc}`}exportJSON(){return{type:this.getType(),marker:this.getMarker(),version:km}}isKeyboardSelectable(){return!1}}function TC(t){const e=t.getAttribute("data-marker")??"";return{node:_u(e)}}function _u(t){return g.$applyNodeReplacement(new Gr(t))}function SC(t){return(t==null?void 0:t.tagName)===ha}function Nm(t){return t instanceof Gr}const AC=[mn,gr,jn,Bt,Qe,yt,er,Do,Ao,zr,Gr,Yt,Lr,{replace:g.ParagraphNode,with:()=>Nn(),withKlass:Lr}];var H;(function(t){t.FileIdentification="FileIdentification",t.Headers="Headers",t.Remarks="Remarks",t.Introduction="Introduction",t.DivisionMarks="DivisionMarks",t.Paragraphs="Paragraphs",t.Poetry="Poetry",t.TitlesHeadings="TitlesHeadings",t.Tables="Tables",t.CenterTables="CenterTables",t.RightTables="RightTables",t.Lists="Lists",t.Footnotes="Footnotes",t.CrossReferences="CrossReferences",t.SpecialText="SpecialText",t.CharacterStyling="CharacterStyling",t.Breaks="Breaks",t.SpecialFeatures="SpecialFeatures",t.PeripheralReferences="PeripheralReferences",t.PeripheralMaterials="PeripheralMaterials",t.Uncategorized="Uncategorized"})(H||(H={}));var V;(function(t){t.Paragraph="Paragraph",t.Character="Character",t.Note="Note",t.Unknown="Unknown"})(V||(V={}));const DC={id:{category:H.FileIdentification,type:V.Paragraph,description:"File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)",hasEndMarker:!1,children:{FileIdentification:["usfm","ide"],Headers:["h","h1","h2","h3","toc1","toc2","toc3"],Remarks:["rem","sts","restore"],Introduction:["imt","imt1","imt2","imt3","imt4","imte","imte1","imte2","is","is1","is2","iot","io","io1","io2","io3","io4","ior","ip","im","ipi","imi","ili","ili1","ili2","ipq","imq","ipr","ib","iq","iq1","iq2","iq3","iex","ie"],DivisionMarks:["c","cl"],TitlesHeadings:["mt","mt1","mt2","mt3","mt4"]}},usfm:{category:H.FileIdentification,type:V.Paragraph,description:"File markup version information",hasEndMarker:!1,children:void 0},ide:{category:H.FileIdentification,type:V.Paragraph,description:"File encoding information",hasEndMarker:!1,children:{Remarks:["rem","sts"]}},h:{category:H.Headers,type:V.Paragraph,description:"Running header text for a book (basic)",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h1:{category:H.Headers,type:V.Paragraph,description:"Running header text",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h2:{category:H.Headers,type:V.Paragraph,description:"Running header text, left side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h3:{category:H.Headers,type:V.Paragraph,description:"Running header text, right side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},toc1:{category:H.Headers,type:V.Paragraph,description:"Long table of contents text",hasEndMarker:!1,children:void 0},toc2:{category:H.Headers,type:V.Paragraph,description:"Short table of contents text",hasEndMarker:!1,children:void 0},toc3:{category:H.Headers,type:V.Paragraph,description:"Book Abbreviation",hasEndMarker:!1,children:void 0},toca1:{category:H.Headers,type:V.Paragraph,description:"Alternative language long table of contents text",hasEndMarker:!1,children:void 0},toca2:{category:H.Headers,type:V.Paragraph,description:"Alternative language short table of contents text",hasEndMarker:!1,children:void 0},toca3:{category:H.Headers,type:V.Paragraph,description:"Alternative language book Abbreviation",hasEndMarker:!1,children:void 0},rem:{category:H.Remarks,type:V.Paragraph,description:"Comments and remarks",hasEndMarker:!1,children:void 0},sts:{category:H.Remarks,type:V.Paragraph,description:"Status of this file",hasEndMarker:!1,children:void 0},restore:{category:H.Remarks,type:V.Paragraph,description:"Project restore information",hasEndMarker:!1,children:void 0},imt:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt1:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt2:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt3:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt4:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title, level 4 (usually within parenthesis)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title at introduction end, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte1:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title at introduction end, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte2:{category:H.Introduction,type:V.Paragraph,description:"Introduction major title at introduction end, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is:{category:H.Introduction,type:V.Paragraph,description:"Introduction section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"],CharacterStyling:["no"]}},is1:{category:H.Introduction,type:V.Paragraph,description:"Introduction section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is2:{category:H.Introduction,type:V.Paragraph,description:"Introduction section heading, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},iot:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline title (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},io:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},io1:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline text, level 1 (if multiple levels) (basic)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io2:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline text, level 2",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io3:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline text, level 3",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io4:{category:H.Introduction,type:V.Paragraph,description:"Introduction outline text, level 4",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ior:{category:H.Introduction,type:V.Character,description:"Introduction references range for outline entry; for marking references separately",hasEndMarker:!0,children:void 0},ip:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],Footnotes:["f","fe","fm"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},im:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph, with no first line indent (may occur after poetry)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipi:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph, indented, with first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imi:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph text, indented, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili:{category:H.Introduction,type:V.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili1:{category:H.Introduction,type:V.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili2:{category:H.Introduction,type:V.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipq:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph, quote from the body text",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imq:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph, quote from the body text, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipr:{category:H.Introduction,type:V.Paragraph,description:"Introduction prose paragraph, right aligned",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ib:{category:H.Introduction,type:V.Paragraph,description:"Introduction blank line",hasEndMarker:!1,children:{Introduction:["iqt"]}},iq:{category:H.Introduction,type:V.Paragraph,description:"Introduction poetry text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},iq1:{category:H.Introduction,type:V.Paragraph,description:"Introduction poetry text, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq2:{category:H.Introduction,type:V.Paragraph,description:"Introduction poetry text, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq3:{category:H.Introduction,type:V.Paragraph,description:"Introduction poetry text, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iex:{category:H.Introduction,type:V.Paragraph,description:"Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},iqt:{category:H.Introduction,type:V.Character,description:"For quoted scripture text appearing in the introduction",hasEndMarker:!0,children:void 0},ie:{category:H.Introduction,type:V.Paragraph,description:"Introduction ending marker",hasEndMarker:!1,children:void 0},c:{category:H.DivisionMarks,type:V.Paragraph,description:"Chapter number",hasEndMarker:!1,children:{DivisionMarks:["ca","cp","cl","cd"],Paragraphs:["p","m","po","pr","cls","pi","pi1","pi2","pi3","pc","mi","nb"],Poetry:["q","q1","q2","q3","q4","qc","qr","qa","qd","b"],TitlesHeadings:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],Lists:["lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4"],Footnotes:["f","fe"],SpecialText:["lit"],Breaks:["pb"]}},ca:{category:H.DivisionMarks,type:V.Character,description:"Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)",hasEndMarker:!0,children:void 0},cp:{category:H.DivisionMarks,type:V.Paragraph,description:"Published chapter number (chapter string that should appear in the published text)",hasEndMarker:!1,children:{Footnotes:["f"]}},cl:{category:H.DivisionMarks,type:V.Paragraph,description:"Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",hasEndMarker:!1,children:void 0},cd:{category:H.DivisionMarks,type:V.Paragraph,description:"Chapter Description (Publishing option D, e.g. in Russian Bibles)",hasEndMarker:!1,children:{DivisionMarks:["vp"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},v:{category:H.DivisionMarks,type:V.Character,description:"A verse number",hasEndMarker:!1,children:void 0},va:{category:H.DivisionMarks,type:V.Character,description:"Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)",hasEndMarker:!0,children:void 0},vp:{category:H.DivisionMarks,type:V.Character,description:"Published verse marker (verse string that should appear in the published text)",hasEndMarker:!0,children:void 0},p:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, with first line indent (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},m:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, with no first line indent (may occur after poetry) (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},po:{category:H.Paragraphs,type:V.Paragraph,description:"Letter opening",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pr:{category:H.Paragraphs,type:V.Paragraph,description:"Text refrain (paragraph text, right aligned)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},cls:{category:H.Paragraphs,type:V.Paragraph,description:"Letter Closing",hasEndMarker:!1,children:{SpecialText:["tl","sig","pn","png","addpn","add"]}},pmo:{category:H.Paragraphs,type:V.Paragraph,description:"Embedded text opening",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pm:{category:H.Paragraphs,type:V.Paragraph,description:"Embedded text paragraph",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmc:{category:H.Paragraphs,type:V.Paragraph,description:"Embedded text closing",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmr:{category:H.Paragraphs,type:V.Paragraph,description:"Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi1:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi2:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, level 2 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi3:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, level 3 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pc:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, centered (for Inscription)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},mi:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, indented, with no first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},nb:{category:H.Paragraphs,type:V.Paragraph,description:"Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, level 1 indent (if single level)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q1:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, level 1 indent (if multiple levels) (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q2:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, level 2 indent (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q3:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, level 3 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q4:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, level 4 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qc:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, centered",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qr:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, Right Aligned",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qs:{category:H.Poetry,type:V.Character,description:"Poetry text, Selah",hasEndMarker:!0,children:{Footnotes:["f"],CrossReferences:["x"]}},qa:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, Acrostic marker/heading",hasEndMarker:!1,children:void 0},qac:{category:H.Poetry,type:V.Character,description:"Poetry text, Acrostic markup of the first character of a line of acrostic poetry",hasEndMarker:!0,children:void 0},qm:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, embedded, level 1 indent (if single level)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm1:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, embedded, level 1 indent (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm2:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, embedded, level 2 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm3:{category:H.Poetry,type:V.Paragraph,description:"Poetry text, embedded, level 3 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qd:{category:H.Poetry,type:V.Paragraph,description:"A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},b:{category:H.Poetry,type:V.Paragraph,description:"Poetry text stanza break (e.g. stanza break) (basic)",hasEndMarker:!1,children:void 0},mt:{category:H.TitlesHeadings,type:V.Paragraph,description:"The main title of the book (if single level)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt1:{category:H.TitlesHeadings,type:V.Paragraph,description:"The main title of the book (if multiple levels) (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt2:{category:H.TitlesHeadings,type:V.Paragraph,description:"A secondary title usually occurring before the main title (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt3:{category:H.TitlesHeadings,type:V.Paragraph,description:"A secondary title occurring after the main title",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt4:{category:H.TitlesHeadings,type:V.Paragraph,description:"A small secondary title sometimes occurring within parentheses",hasEndMarker:!1,children:void 0},mte:{category:H.TitlesHeadings,type:V.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if single level)",hasEndMarker:!1,children:void 0},mte1:{category:H.TitlesHeadings,type:V.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte2"]}},mte2:{category:H.TitlesHeadings,type:V.Paragraph,description:"A secondary title occurring before or after the 'ending' main title",hasEndMarker:!1,children:void 0},ms:{category:H.TitlesHeadings,type:V.Paragraph,description:"A major section division heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms1:{category:H.TitlesHeadings,type:V.Paragraph,description:"A major section division heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms2:{category:H.TitlesHeadings,type:V.Paragraph,description:"A major section division heading, level 2",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms3:{category:H.TitlesHeadings,type:V.Paragraph,description:"A major section division heading, level 3",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe"]}},mr:{category:H.TitlesHeadings,type:V.Paragraph,description:"A major section division references range heading (basic)",hasEndMarker:!1,children:void 0},s:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s1:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s2:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section heading, level 2 (e.g. Proverbs 22-24)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s3:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section heading, level 3 (e.g. Genesis 'The First Day')",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s4:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section heading, level 4",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sr:{category:H.TitlesHeadings,type:V.Paragraph,description:"A section division references range heading",hasEndMarker:!1,children:void 0},r:{category:H.TitlesHeadings,type:V.Paragraph,description:"Parallel reference(s) (basic)",hasEndMarker:!1,children:void 0},sp:{category:H.TitlesHeadings,type:V.Paragraph,description:"A heading, to identify the speaker (e.g. Job)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},d:{category:H.TitlesHeadings,type:V.Paragraph,description:"A Hebrew text heading, to provide description (e.g. Psalms)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sd:{category:H.TitlesHeadings,type:V.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if single level)",hasEndMarker:!1,children:void 0},sd1:{category:H.TitlesHeadings,type:V.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if multiple levels)",hasEndMarker:!1,children:void 0},sd2:{category:H.TitlesHeadings,type:V.Paragraph,description:"Vertical space used to divide the text into sections, level 2",hasEndMarker:!1,children:void 0},sd3:{category:H.TitlesHeadings,type:V.Paragraph,description:"Vertical space used to divide the text into sections, level 3",hasEndMarker:!1,children:void 0},sd4:{category:H.TitlesHeadings,type:V.Paragraph,description:"Vertical space used to divide the text into sections, level 4",hasEndMarker:!1,children:void 0},lh:{category:H.Lists,type:V.Paragraph,description:"List header (introductory remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li:{category:H.Lists,type:V.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li1:{category:H.Lists,type:V.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li2:{category:H.Lists,type:V.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li3:{category:H.Lists,type:V.Paragraph,description:"A list entry, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li4:{category:H.Lists,type:V.Paragraph,description:"A list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lf:{category:H.Lists,type:V.Paragraph,description:"List footer (concluding remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim:{category:H.Lists,type:V.Paragraph,description:"An embedded list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim1:{category:H.Lists,type:V.Paragraph,description:"An embedded list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim2:{category:H.Lists,type:V.Paragraph,description:"An embedded list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim3:{category:H.Lists,type:V.Paragraph,description:"An embedded list item, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim4:{category:H.Lists,type:V.Paragraph,description:"An embedded list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},litl:{category:H.Lists,type:V.Character,description:"List entry total text",hasEndMarker:!0,children:void 0},lik:{category:H.Lists,type:V.Character,description:"Structured list entry key text",hasEndMarker:!0,children:void 0},liv:{category:H.Lists,type:V.Character,description:"Structured list entry value 1 content (if single value)",hasEndMarker:!0,children:void 0},liv1:{category:H.Lists,type:V.Character,description:"Structured list entry value 1 content (if multiple values)",hasEndMarker:!0,children:void 0},liv2:{category:H.Lists,type:V.Character,description:"Structured list entry value 2 content",hasEndMarker:!0,children:void 0},liv3:{category:H.Lists,type:V.Character,description:"Structured list entry value 3 content",hasEndMarker:!0,children:void 0},liv4:{category:H.Lists,type:V.Character,description:"Structured list entry value 4 content",hasEndMarker:!0,children:void 0},liv5:{category:H.Lists,type:V.Character,description:"Structured list entry value 5 content",hasEndMarker:!0,children:void 0},f:{category:H.Footnotes,type:V.Note,description:"A Footnote text item (basic)",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fe:{category:H.Footnotes,type:V.Note,description:"An Endnote text item",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fr:{category:H.Footnotes,type:V.Character,description:"The origin reference for the footnote (basic)",hasEndMarker:!0,children:void 0},ft:{category:H.Footnotes,type:V.Character,description:"Footnote text, Protocanon (basic)",hasEndMarker:!0,children:void 0},fk:{category:H.Footnotes,type:V.Character,description:"A footnote keyword (basic)",hasEndMarker:!0,children:void 0},fq:{category:H.Footnotes,type:V.Character,description:"A footnote scripture quote or alternate rendering (basic)",hasEndMarker:!0,children:void 0},fqa:{category:H.Footnotes,type:V.Character,description:"A footnote alternate rendering for a portion of scripture text",hasEndMarker:!0,children:void 0},fl:{category:H.Footnotes,type:V.Character,description:"A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",hasEndMarker:!0,children:void 0},fw:{category:H.Footnotes,type:V.Character,description:"A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",hasEndMarker:!0,children:void 0},fp:{category:H.Footnotes,type:V.Character,description:"A Footnote additional paragraph marker",hasEndMarker:!0,children:void 0},fv:{category:H.Footnotes,type:V.Character,description:"A verse number within the footnote text",hasEndMarker:!0,children:void 0},fdc:{category:H.Footnotes,type:V.Character,description:"Footnote text, applies to Deuterocanon only",hasEndMarker:!0,children:void 0},fm:{category:H.Footnotes,type:V.Character,description:"An additional footnote marker location for a previous footnote",hasEndMarker:!0,children:void 0},x:{category:H.CrossReferences,type:V.Note,description:"A list of cross references (basic)",hasEndMarker:!0,children:{CrossReferences:["xo","xop","xt","xta","xk","xq","xot","xnt","xdc"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},xo:{category:H.CrossReferences,type:V.Character,description:"The cross reference origin reference (basic)",hasEndMarker:!0,children:void 0},xop:{category:H.CrossReferences,type:V.Character,description:"Published cross reference origin reference (origin reference that should appear in the published text)",hasEndMarker:!0,children:void 0},xt:{category:H.CrossReferences,type:V.Character,description:"The cross reference target reference(s), protocanon only (basic)",hasEndMarker:!0,children:void 0},xta:{category:H.CrossReferences,type:V.Character,description:"Cross reference target references added text",hasEndMarker:!0,children:void 0},xk:{category:H.CrossReferences,type:V.Character,description:"A cross reference keyword",hasEndMarker:!0,children:void 0},xq:{category:H.CrossReferences,type:V.Character,description:"A cross-reference quotation from the scripture text",hasEndMarker:!0,children:void 0},xot:{category:H.CrossReferences,type:V.Character,description:"Cross-reference target reference(s), Old Testament only",hasEndMarker:!0,children:void 0},xnt:{category:H.CrossReferences,type:V.Character,description:"Cross-reference target reference(s), New Testament only",hasEndMarker:!0,children:void 0},xdc:{category:H.CrossReferences,type:V.Character,description:"Cross-reference target reference(s), Deuterocanon only",hasEndMarker:!0,children:void 0},rq:{category:H.CrossReferences,type:V.Character,description:"A cross-reference indicating the source text for the preceding quotation.",hasEndMarker:!0,children:void 0},qt:{category:H.SpecialText,type:V.Character,description:"For Old Testament quoted text appearing in the New Testament (basic)",hasEndMarker:!0,children:void 0},nd:{category:H.SpecialText,type:V.Character,description:"For name of deity (basic)",hasEndMarker:!0,children:void 0},tl:{category:H.SpecialText,type:V.Character,description:"For transliterated words",hasEndMarker:!0,children:void 0},dc:{category:H.SpecialText,type:V.Character,description:"Deuterocanonical/LXX additions or insertions in the Protocanonical text",hasEndMarker:!0,children:void 0},bk:{category:H.SpecialText,type:V.Character,description:"For the quoted name of a book",hasEndMarker:!0,children:void 0},sig:{category:H.SpecialText,type:V.Character,description:"For the signature of the author of an Epistle",hasEndMarker:!0,children:void 0},pn:{category:H.SpecialText,type:V.Character,description:"For a proper name",hasEndMarker:!0,children:void 0},png:{category:H.SpecialText,type:V.Character,description:"For a geographic proper name",hasEndMarker:!0,children:void 0},addpn:{category:H.SpecialText,type:V.Character,description:"For chinese words to be dot underline & underline",hasEndMarker:!0,children:void 0},wj:{category:H.SpecialText,type:V.Character,description:"For marking the words of Jesus",hasEndMarker:!0,children:void 0},k:{category:H.SpecialText,type:V.Character,description:"For a keyword",hasEndMarker:!0,children:void 0},sls:{category:H.SpecialText,type:V.Character,description:"To represent where the original text is in a secondary language or from an alternate text source",hasEndMarker:!0,children:void 0},ord:{category:H.SpecialText,type:V.Character,description:"For the text portion of an ordinal number",hasEndMarker:!0,children:void 0},add:{category:H.SpecialText,type:V.Character,description:"For a translational addition to the text",hasEndMarker:!0,children:void 0},lit:{category:H.SpecialText,type:V.Paragraph,description:"For a comment or note inserted for liturgical use",hasEndMarker:!1,children:void 0},no:{category:H.CharacterStyling,type:V.Character,description:"A character style, use normal text",hasEndMarker:!0,children:void 0},it:{category:H.CharacterStyling,type:V.Character,description:"A character style, use italic text",hasEndMarker:!0,children:void 0},bd:{category:H.CharacterStyling,type:V.Character,description:"A character style, use bold text",hasEndMarker:!0,children:void 0},bdit:{category:H.CharacterStyling,type:V.Character,description:"A character style, use bold + italic text",hasEndMarker:!0,children:void 0},em:{category:H.CharacterStyling,type:V.Character,description:"A character style, use emphasized text style",hasEndMarker:!0,children:void 0},sc:{category:H.CharacterStyling,type:V.Character,description:"A character style, for small capitalization text",hasEndMarker:!0,children:void 0},sup:{category:H.CharacterStyling,type:V.Character,description:"A character style, for superscript text. Typically for use in critical edition footnotes.",hasEndMarker:!0,children:void 0},pb:{category:H.Breaks,type:V.Paragraph,description:"Page Break used for new reader portions and children's bibles where content is controlled by the page",hasEndMarker:!1,children:void 0}},Zr={DivisionMarks:{add:["v","c"],remove:[]},Paragraphs:{add:["p"],remove:[]},Poetry:{add:["q","q1","q2","q3","q4","b"],remove:[]},TitlesHeadings:{add:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],remove:[]}},MC={p:{children:Zr},q:{children:Zr},q1:{children:Zr},q2:{children:Zr},q3:{children:Zr},q4:{children:Zr},b:{children:Zr},qm:{children:{Paragraphs:{add:["p"],remove:[]}}},c:{type:V.Paragraph,children:null},v:{children:null}};function Dp(t){const e=DC[t],n=MC[t];if(!e)return;if(!n)return e;let r=e.children?{...e.children}:void 0;if(n.children===null&&(r=void 0),n.children){r=r||{};for(const[o,s]of Object.entries(n.children)){const i=o;if(s===null)Reflect.deleteProperty(r,i);else{let a=r[i]||[];s.remove&&(a=a.filter(c=>!s.remove.includes(c))),s.add&&(a=[...new Set([...a,...s.add])]),a.length>0?r[i]=a:Reflect.deleteProperty(r,i)}}Object.keys(r).length===0&&(r=void 0)}return{...e,...n,children:r}}function Mp(t,e,n){const r={type:Us,version:Vs,content:t},o=e.serializeEditorState(r,n);return fu(o.root.children[0])?o.root.children[0].children[0]:o.root.children[0]}function mc(t,e){if(!t||!g.$isTextNode(t))return[void 0,void 0];const n=t.getTextContent();if(e>=0&&e<n.length)return[t,e];let r=t.getNextSibling();if(!r){const s=t.getParent();At(s)&&(r=s.getNextSibling())}if(!r||!At(r)&&!g.$isTextNode(r))return[void 0,void 0];const o=e-n.length;return r&&g.$isTextNode(r)?mc(r,o):mc(r.getFirstChild()??void 0,o)}function Rp(t){const e=Cv(t.jsonPath);let n=g.$getRoot();for(const r of e){if(!n||!g.$isElementNode(n))return[void 0,void 0];n=n.getChildAtIndex(r)??void 0}return mc(n,t.offset)}function Op(t){return g.$isElementNode(t)?"element":"text"}function Cu(t){const{start:e}=t;let{end:n}=t;n===void 0&&(n=e);const[r,o]=Rp(e),[s,i]=Rp(n);if(!r||!s||o===void 0||i===void 0)return;const a=g.$createRangeSelection();return a.anchor=g.$createPoint(r.getKey(),o,Op(r)),a.focus=g.$createPoint(s.getKey(),i,Op(s)),a}function jp(t,e){const n=[];let r=t;for(;r!=null&&r.getParent();){const o=r.getParent();if(o){const s=o==null?void 0:o.getChildren().indexOf(r);s>=0&&n.unshift(s)}r=o}return{jsonPath:Ev(n),offset:e}}function Tm(){const t=g.$getSelection();if(!t||!g.$isRangeSelection(t))return;const e=t.isBackward()?t.focus.getNode():t.anchor.getNode(),n=t.isBackward()?t.focus.offset:t.anchor.offset,r=jp(e,n);if(t.isCollapsed())return{start:r};const o=t.isBackward()?t.anchor.getNode():t.focus.getNode(),s=t.isBackward()?t.anchor.offset:t.focus.offset,i=jp(o,s);return{start:r,end:i}}const Sm="v",Am=1;class qt extends g.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=Sm,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-verse"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new qt(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>OC(e)?{conversion:RC,priority:1}:null}}static importJSON(e){return Eu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(dc,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(dc,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return l.jsx("span",{children:this.getShowMarker()?wi(this.getMarker(),this.getNumber()):uc+this.getNumber()+uc})}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:Am}}isKeyboardSelectable(){return!1}}function RC(t){const e=t.getAttribute("data-number")??"0";return{node:Eu(e)}}function Eu(t,e,n,r,o,s){return g.$applyNodeReplacement(new qt(t,e,n,r,o,s))}function OC(t){return((t==null?void 0:t.getAttribute("data-marker"))??void 0)===Sm}function xs(t){return t instanceof qt}function jC(t){return(t==null?void 0:t.type)===qt.getType()}function wn(t){return mu(t)||xs(t)}function IC(t){return rC(t)||jC(t)}function LC(t,e,n,r,o,s,i){if(!yt.isValidMarker(t))throw new Error(`$insertNote: Invalid note marker '${t}'`);const a=n?Cu(n):g.$getSelection();if(!g.$isRangeSelection(a))return;const c=PC(a,t,r,i);if(c===void 0)return;const u=Mm(t,e,c,o,s);return Dm(u,a,o),u}function Dm(t,e,n){const r=(n==null?void 0:n.noteMode)==="collapsed";if(t.setIsCollapsed(r),e.isCollapsed()||pC(e),e.insertNodes([t]),!r){const o=t.getChildren().reverse().find(Be);o==null||o.selectEnd()}}function PC(t,e,n,r){const o=[],{chapterNum:s,verseNum:i}=n??{};switch(e){case"f":case"fe":case"ef":case"efe":if(s!==void 0&&i!==void 0&&o.push(Hn("fr").append(g.$createTextNode(`${s}:${i}`))),!t.isCollapsed()){const a=t.getTextContent().trim();if(a.length>0){const c=Hn("fq");c.append(g.$createTextNode(a)),o.push(c)}}o.push(Hn("ft").append(g.$createTextNode(Ae)));break;case"x":case"ex":s!==void 0&&i!==void 0&&o.push(Hn("xo").append(g.$createTextNode(`${s}:${i}`))),o.push(Hn("xt").append(g.$createTextNode(Ae)));break;default:r==null||r.warn(`$createNoteChildren: Unsupported note marker '${e}'`);return}return o}function Mm(t,e,n,r,o,s){const i=(r==null?void 0:r.noteMode)!=="expanded",a=wu(t,e,i);s&&g.$setState(a,go,()=>s);let c,u;(r==null?void 0:r.markerMode)==="editable"?(c=ss(t),u=ss(t,"closing")):(r==null?void 0:r.markerMode)==="visible"&&(c=is("marker",br(t)+Ae),u=is("marker",os(t)+Ae));let d;if(c&&a.append(c),(r==null?void 0:r.markerMode)==="editable")e===""?a.append(...n):(d=g.$createTextNode(vu(a.__caller)),a.append(d,...n));else{const p=()=>g.$createTextNode(Ae),f=n.flatMap(FC(p));if(e==="")a.append(...f);else{const h=xu(n);let b=()=>{};o!=null&&o.noteCallerOnClick&&(b=o.noteCallerOnClick),d=Su(a.__caller,h,b),a.append(d,p(),...f)}}return u&&a.append(u),a}function Ip(t){var e;if(typeof t=="string"){const o=g.$getNodeByKey(t);return Se(o)?o:void 0}const n=ii();if(n.length<=0)return;const r=(e=n.filter(o=>Se(o.node))[t])==null?void 0:e.node;if(Se(r))return r}function $C(t,e){const n=(e==null?void 0:e.noteMode)==="collapsed";if(t.setIsCollapsed(n),n){const r=t.getPreviousSibling();if(xs(r)||!r){const o=t.getParent();if(o){const s=t.getIndexWithinParent();o.select(s,s)}}else r.selectEnd()}else{const r=t.getChildren().reverse().find(Be);r==null||r.selectEnd()}}function FC(t){return e=>fa(e)?[e]:[e,t()]}function BC(t){return t.find(e=>jt(e))}function qC(t,e){return g.$isElementNode(t)?t.getChildren().find(n=>wn(n)&&yu(e,n.getNumber())):void 0}function UC(t,e){return e===0?BC(t):t.map(n=>qC(n,e)).filter(n=>n)[0]}function Lp(t){return!t||!g.$isElementNode(t)?void 0:t.getChildren().findLast(e=>wn(e))}function Rm(t){var e,n;if(!t||hn(t))return;if(wn(t))return t;let r=At(t.getParent())?(e=t.getParent())==null?void 0:e.getPreviousSibling():t.getPreviousSibling();for(;r&&!wn(r)&&!hn(r);)r=r.getPreviousSibling();if(r&&wn(r))return r;let o=(n=t.getTopLevelElement())==null?void 0:n.getPreviousSibling(),s=Lp(o),i=s;for(;o&&!s&&!hn(o);)s=i,o=o.getPreviousSibling(),i=Lp(o);if(!(!s&&hn(o)))return s}function VC(t){return aC(t)||xs(t)}function ku(t){if(g.$isTextNode(t)){const e=t.getTextContent();!e.endsWith(" ")&&!e.endsWith(Ae)&&t.setTextContent(`${e} `)}}function Om(t){if(g.$isTextNode(t)){const e=t.getTextContent();e.startsWith(" ")&&t.setTextContent(e.trimStart())}}function Nu(t,e){return t.getEditorState().read(()=>!g.$getNodeByKey(e))}const HC=["style"],zC=["style","code"],wa=["style","cid"],GC=["style","number","sid","altnumber","pubnumber"],KC=["style","number","sid","altnumber","pubnumber"],YC=["style","sid","eid"],WC=["style","caller","category","contents"],JC=["chapter","immutable-chapter","verse","immutable-verse","ms","note","unmatched"],ti=`
`;function XC(t,e){const n=g.$getNodeByKey(t);if(!Mn(n))return;const r=jm(n);return r===void 0?void 0:[{retain:r},...e,{delete:1}]}function jm(t){if(!t)return;const e=ii();let n=0;const r=[];let o,s;const i=t.getKey();let a;for(const c of e){const u=c.node;for(let d=r.length-1;d>=0;d--)if(ni(r[d],c)){const p=r[d];if(r.splice(d,1),n+=1,a&&p.getKey()===a.getKey())return n-1}if(o&&ni(o,c)&&(o=void 0,s=void 0),o){if(u.getKey()===i)return s;continue}if(u.getKey()===i){if(g.$isTextNode(u)||Mn(u))return n;gn(u)&&(a=u)}if(gn(u)&&(r.includes(u)||r.push(u)),Se(u)){o=u,s=n,n+=1;continue}n+=Im(u)}if(a)return n}function Pp(t,e){if(t.length<2||!e1(t[0])||!ZC(t[1]))return;const n=t[0].retain;return e.read(()=>{const r=QC(n);return r==null?void 0:r.getKey()})}function QC(t){const e=ii();let n=0;const r=[];let o,s;for(const i of e){const a=i.node;for(let u=r.length-1;u>=0;u--)if(ni(r[u],i)){const d=r[u];if(r.splice(u,1),n===t)return d;n+=1}if(o&&ni(o,i)&&(o=void 0,s=void 0),o){if(s===t)return o;continue}if(gn(a)&&(r.includes(a)||r.push(a)),Se(a)){if(o=a,s=n,n===t)return a;n+=1;continue}const c=Im(a);if(g.$isTextNode(a)&&c>0&&t>=n&&t<n+c||Mn(a)&&n===t)return a;n+=c}for(const i of r){if(n===t)return i;n+=1}}function ni(t,e){return t?e?!uC(e.node,t.getKey()):!0:!1}function Mn(t){return hn(t)||wn(t)||Ba(t)||Se(t)||Nm(t)}function gn(t){return kn(t)||Qn(t)}function Er(t,e){return e.insert!=null&&typeof e.insert=="object"&&t in e.insert}function ZC(t){if(t.insert==null||typeof t.insert!="object")return!1;const e=Object.keys(t.insert)[0];return t.insert!=null&&typeof t.insert=="object"&&e in t.insert&&JC.includes(e)}function e1(t){return t.retain!=null&&typeof t.retain=="number"}function Im(t){return g.$isTextNode(t)?t.getTextContentSize():Mn(t)?1:0}function gc(t,e){const n={insert:t.__text},r=g.$getState(t,go);if(r&&(n.attributes={segment:r}),e&&e.length>0){const o=Lm(e);o&&(n.attributes={...n.attributes,char:o})}return n}function $p(t){const e=new Is;return t.isEmpty()||t.read(()=>{const n=g.$getRoot();if(!n||n.isEmpty())return;const r=n.getChildren();if(r.length===1&&fr(r[0])&&(!r[0].getChildren()||r[0].getChildrenSize()===0))return;const o=t1();for(const s of o)e.push(s)}),e}function Tu(t,e){const n=[],r=ii(t),o=[],s=[],i={children:[],contentsOps:[]},a=new Set;for(let c=0;c<r.length;c++){const u=r[c].node;n.push(...Fp(u,c,r,o,s,i,a))}for(const c of o)n.push(...Fp(c,r.length,r,o,s,i,a));return n}function t1(){return Tu()}function Fp(t,e,n,r,o,s,i){if(!t)return[];const a=[];return n1(t,a,r),r1(t,a,o,s,i),o1(t,e,n,o,i,s,a),hn(t)&&a.push(a1(t)),wn(t)&&a.push(c1(t)),Ba(t)&&a.push(u1(t)),Nm(t)&&a.push(d1(t)),s1(t,a,s),a}function n1(t,e,n){if(!t.isInline()){const r=n.pop();Qn(r)?e.push(i1(r)):jt(r)?e.push(l1(r)):fr(r)&&e.push({insert:ti})}gn(t)&&(n.includes(t)||n.push(t))}function r1(t,e,n,r,o){var s;if(!g.$isTextNode(t))return;const i=t.getParent();if(Se(i)&&i.getFirstChild()===t)return;const a=t.getTextContent(),c=a.startsWith(cu),u=Be(i)?i:void 0,d=!!u&&a===Ae&&u.getChildrenSize()===1,p=gc(t,n);if(r.children.includes(t)){if(!a||a===Ae||c)return;(s=r.contentsOps)==null||s.push(p)}else d||c&&u||e.push(p);const f=a!==""&&!d&&!(c&&u);if(n.length>0&&f)for(const h of n)o.add(h)}function o1(t,e,n,r,o,s,i){var a;Be(t)&&!r.includes(t)&&r.push(t);const c=n[e+1];for(const u of r.toReversed())if(ni(u,c)){if(r.pop(),!o.has(u)){const d=f1(u);s.children.includes(u)?(a=s.contentsOps)==null||a.push(d):i.push(d)}o.delete(u)}}function s1(t,e,n){var r,o;if(!Se(t))return;ii(t).forEach(i=>n.children.push(i.node));const s=p1(t);n.contentsOps=(o=(r=s.insert.note)==null?void 0:r.contents)==null?void 0:o.ops,e.push(s)}function i1(t){const e={style:Xs,code:t.__code};return{insert:ti,attributes:{book:e}}}function a1(t){const e={style:da,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{chapter:e}}}function l1(t){const e={style:t.__marker};return{insert:ti,attributes:{para:e}}}function c1(t){const e={style:pa,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{verse:e}}}function u1(t){const e={style:t.__marker};return t.__sid&&(e.sid=t.__sid),t.__eid&&(e.eid=t.__eid),{insert:{milestone:e}}}function d1(t){return{insert:{unmatched:{marker:t.__marker}}}}function p1(t){const e={style:t.__marker,caller:t.__caller};t.__category&&(e.category=t.__category),t.getChildrenSize()>1&&(e.contents={ops:[]});const n={insert:{note:e}},r=g.$getState(t,go);return r&&(n.attributes={segment:r}),n}function f1(t){const e={insert:""},n=Lm([t]);return n&&(e.attributes={char:n}),e}function Lm(t){if(t.length===0)return;const e=t.map(h1);return e.length===1?e[0]:e}function h1(t){const e={style:t.__marker},n=g.$getState(t,mo);n&&(e.cid=n);const r=t.getUnknownAttributes();return r&&Object.keys(r).length>0&&Object.assign(e,r),e}const Pm=1;class Tn extends g.DecoratorNode{constructor(e=Ir,n="",r,o){super(o),de(this,"__caller"),de(this,"__previewText"),de(this,"__onClick"),this.__caller=e,this.__previewText=n,this.__onClick=r??(()=>{})}static getType(){return"immutable-note-caller"}static clone(e){const{__caller:n,__previewText:r,__onClick:o,__key:s}=e;return new Tn(n,r,o,s)}static importDOM(){return{span:e=>m1(e)?{conversion:w1,priority:1}:null}}static importJSON(e){return Su().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setCaller(e.caller).setPreviewText(e.previewText).setOnClick(e.onClick)}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setPreviewText(e){if(this.__previewText===e)return this;const n=this.getWritable();return n.__previewText=e,n}getPreviewText(){return this.getLatest().__previewText}setOnClick(e){if(this.__onClick===e)return this;const n=this.getWritable();return n.__onClick=e,n}getOnClick(){return this.getLatest().__onClick}createDOM(){const e=document.createElement("span");return e.classList.add(this.__type),e.setAttribute("data-caller",this.__caller),e.setAttribute("data-preview-text",this.__previewText),e}updateDOM(e){return e.__caller!==this.__caller}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.classList.add(this.getType()),n.setAttribute("data-caller",this.getCaller()),n.setAttribute("data-preview-text",this.getPreviewText())),{element:n}}decorate(e){const n=this.getParent();if(!n)return null;const r=n.getKey(),o=n.getIsCollapsed(),s=this.__key,i=c=>{var u;return(u=this.__onClick)==null?void 0:u.call(this,c,r,o,()=>g1(e,r),d=>b1(e,r,s,d),()=>v1(e,r))},a=`${this.__caller}_${this.__previewText}}`.replace(/\s+/g,"").substring(0,25);return l.jsx("button",{onClick:i,title:this.__previewText,"data-caller-id":a,children:this.__caller===Ir&&o?"":this.__caller})}exportJSON(){return{type:this.getType(),caller:this.getCaller(),previewText:this.getPreviewText(),onClick:this.getOnClick(),version:Pm}}isKeyboardSelectable(){return!1}}function w1(t){const e=t.getAttribute("data-caller")??"",n=t.getAttribute("data-preview-text")??"";return{node:Su(e,n)}}function Su(t,e,n){return g.$applyNodeReplacement(new Tn(t,e,n))}function m1(t){return t?t.classList.contains(Tn.getType()):!1}function Kr(t){return t instanceof Tn}function g1(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteCaller: Note node not found: ${e}`);return n.getCaller()})}function b1(t,e,n,r){t.update(()=>{const o=g.$getNodeByKey(e);if(!Se(o))throw new Error(`setNoteCaller: Note node not found: ${e}`);o.setCaller(r);const s=g.$getNodeByKey(n);if(!Kr(s))throw new Error(`setNoteCaller: Caller node not found: ${n}`);s.setCaller(r)})}function v1(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteOps: Note node not found: ${e}`);return Tu(n)})}const x1=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],y1=[Tn,qt,...AC],_1=w.forwardRef((t,e)=>{const{coords:n,children:r,style:o,...s}=t,i=n!==void 0;return l.jsx("div",{ref:e,className:"floating-box","aria-hidden":!i,style:{...o,position:"absolute",zIndex:1e3,top:n==null?void 0:n.y,left:n==null?void 0:n.x,visibility:i?"visible":"hidden",opacity:i?1:0},...s,children:r})});function C1(){const[t,e]=w.useState(void 0),[n,r]=w.useState(),o=w.useRef(null),s=w.useCallback((a,c)=>{o.current&&o.current();const u=a.commonAncestorContainer.nodeType===a.commonAncestorContainer.TEXT_NODE?a:a.commonAncestorContainer;o.current=yy(u,c,()=>{Ey(u,c,{placement:"bottom-start",middleware:[_y(),Cy()]}).then(d=>{r(d.placement),e(p=>(p==null?void 0:p.x)===d.x&&(p==null?void 0:p.y)===d.y?p:{x:d.x,y:d.y})}).catch(()=>{e(void 0)})})},[]),i=w.useCallback(()=>{o.current&&(e(void 0),o.current(),o.current=null)},[]);return w.useEffect(()=>i,[i]),{coords:t,placement:n,updatePosition:s,cleanup:i}}function E1({isOpen:t,floatingBoxRef:e}){const{coords:n,updatePosition:r,cleanup:o,placement:s}=C1();return w.useEffect(()=>{var i;if(!t||!e.current){o();return}const a=(i=window.getSelection())==null?void 0:i.getRangeAt(0);if(!a){o();return}return r(a,e.current),o},[o,t,e,r]),{coords:n,placement:s}}const k1=document.body,N1=w.memo(_1);function T1({isOpen:t=!1,children:e}){const n=w.useRef(null),{coords:r,placement:o}=E1({isOpen:t,floatingBoxRef:n}),s=w.useMemo(()=>r?typeof e=="function"?e:()=>e:()=>null,[e,r]);return fn.createPortal(l.jsx(N1,{ref:n,coords:r,style:r?void 0:{display:"none"},children:s({isOpen:t,placement:o})}),k1)}const $m=w.createContext(void 0);function Au(){const t=w.useContext($m);if(!t)throw new Error("useMenuContext must be used within a MenuProvider");return t}function S1(t,e){const[n,r]=w.useState(0),[o,s]=w.useState(-1),i=w.useMemo(()=>t??[],[t]),a={menuItems:i,activeIndex:n,selectedIndex:o,onSelectOption:e??(()=>{})},c=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p-1+f)%f:0})},[i.length]),u=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p+1)%f:0})},[i.length]),d=w.useCallback(()=>{const p=i.length;if(n>=0&&n<p){const f=i[n];e==null||e(f),s(n)}},[n,i,e]);return{state:a,moveUp:c,moveDown:u,select:d,setActiveIndex:r,setSelectedIndex:s}}function A1({children:t,menuItems:e,onSelectOption:n,...r}){const o=S1(e,n);return l.jsx($m.Provider,{value:o,children:l.jsx("div",{...r,children:t})})}const Fm=w.forwardRef(({index:t,children:e,onMouseEnter:n,onClick:r,...o},s)=>{const{state:{activeIndex:i},setActiveIndex:a,setSelectedIndex:c,select:u}=Au(),d=w.useCallback(f=>{u(),c(-1),r==null||r(f)},[r,u,c]),p=w.useCallback(f=>{a(t),n==null||n(f)},[t,a,n]);return l.jsx("button",{ref:s,role:"menuitem",...o,onClick:d,onMouseEnter:p,"aria-selected":t!==void 0&&i===t?"true":void 0,tabIndex:-1,children:e})});function D1({children:t,autoIndex:e=!0,...n}){const r=w.useRef(null),{state:{activeIndex:o,menuItems:s}}=Au(),i=w.useMemo(()=>s?typeof t=="function"?t:()=>t:()=>null,[t,s]),a=w.useMemo(()=>{const c=i(s);return e?w.Children.map(c,(u,d)=>w.isValidElement(u)&&u.type===Fm&&u.props.index===void 0?w.cloneElement(u,{index:d}):u):c},[i,e,s]);return w.useEffect(()=>{if(r.current){const c=r.current,u=c.children[o];if(u){const d=c.getBoundingClientRect(),p=u.getBoundingClientRect();p.bottom>d.bottom?c.scrollTop+=p.bottom-d.bottom:p.top<d.top&&(c.scrollTop-=d.top-p.top)}}},[o]),l.jsx("div",{ref:r,role:"menu",...n,children:a})}const Al={Root:A1,Options:D1,Option:Fm},M1=(t,e,n)=>Wi(t,n).toLowerCase().includes(e.toLowerCase()),Bp=t=>Object.keys(t).find(e=>typeof t[e]=="string")||"",Wi=(t,e)=>{const n=t[e];return typeof n=="string"?n:String(n)};function R1(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t,{caseSensitive:a=!1,priorityOrder:c=["exact","startsWith","contains"]}=i||{},u=a?e:e.toLowerCase();let d,p;o?(p=o,d=n.length>0?Bp(n[0]):""):(d=r||(n.length>0?Bp(n[0]):""),p=(b,x)=>M1(b,x,d));const f=s||d,h=new Map;return n.filter(b=>{try{return p(b,e)}catch(x){return console.warn("Error filtering item:",b,x),!1}}).sort((b,x)=>{const C=S=>(h.has(S)||h.set(S,Wi(S,f).toLowerCase()),h.get(S)??""),E=a?Wi(b,f):C(b),_=a?Wi(x,f):C(x);for(const S of c)switch(S){case"exact":if(E===u&&_!==u)return-1;if(_===u&&E!==u)return 1;break;case"startsWith":if(E.startsWith(u)&&!_.startsWith(u))return-1;if(_.startsWith(u)&&!E.startsWith(u))return 1;break;case"contains":{const j=E.indexOf(u),P=_.indexOf(u);if(j!==-1&&P===-1)return-1;if(P!==-1&&j===-1)return 1;if(j!==-1&&P!==-1)return j-P;break}}return E.localeCompare(_)})}function O1(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t;return w.useMemo(()=>R1({query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}),[e,n,r,o,s,i])}function j1(){const{moveUp:t,moveDown:e,select:n}=Au();return w.useMemo(()=>({moveUp:t,moveDown:e,select:n}),[t,e,n])}const I1=()=>{const t=j1(),[e]=ye();w.useEffect(()=>{const n=r=>{const o={ArrowDown:()=>t==null?void 0:t.moveDown(),ArrowUp:()=>t==null?void 0:t.moveUp(),Enter:()=>t==null?void 0:t.select(),Tab:()=>t==null?void 0:t.select()}[r.key];return o?(o(),r.preventDefault(),r.stopPropagation(),!0):!1};return e.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[e,t])};function L1(){return I1(),null}function P1(t){const{options:e,onSelectOption:n,onClose:r,inverse:o,query:s,menuOpenKey:i}=t,[a]=ye(),c=s!==void 0,[u,d]=w.useState(""),p=c?s??"":u,f=O1({query:p,items:e,filterBy:"name"}),h=b=>{r==null||r(),n?n(b):b.action(a)};return w.useEffect(()=>a.registerCommand(g.KEY_DOWN_COMMAND,b=>{if(c)return!1;const x={Escape:()=>r==null?void 0:r(),Backspace:()=>{p.length===0?r==null||r():d(C=>C.slice(0,-1))}}[b.key];return x?(b.stopPropagation(),b.preventDefault(),x(),!0):b.key.length===1?(b.stopPropagation(),b.preventDefault(),b.key!==i&&d(C=>C+b.key),!0):!1},g.COMMAND_PRIORITY_HIGH),[a,c,p,i,r]),l.jsxs(Al.Root,{className:`autocomplete-menu-container ${o?"inverse":""}`,menuItems:f,onSelectOption:b=>h(b),children:[!c&&l.jsx("input",{value:p,type:"text",disabled:!0}),l.jsx(L1,{}),l.jsx(Al.Options,{className:"autocomplete-menu-options",autoIndex:!1,children:b=>b.map((x,C)=>l.jsxs(Al.Option,{index:C,children:[l.jsx("span",{className:"label",children:x.label??x.name}),l.jsx("span",{className:"description",children:x.description})]},x.name))})]})}function $1({trigger:t,items:e}){const[n]=ye(),[r,o]=w.useState(!1),s=w.useCallback(i=>{i.key==="Escape"&&r?(o(!1),n.focus()):i.key===t&&!r&&(i.preventDefault(),o(!0))},[n,t,r]);return w.useEffect(()=>n.registerRootListener(i=>{if(i)return i.addEventListener("keydown",s),()=>{i.removeEventListener("keydown",s)}}),[n,s]),w.useEffect(()=>n.registerUpdateListener(({prevEditorState:i,editorState:a})=>{const c=i.read(()=>{const u=g.$getSelection();if(g.$isRangeSelection(u))return u});a.read(()=>{const u=g.$getSelection();!g.$isRangeSelection(u)||c!=null&&c.is(u)||o(!1)})}),[n]),e&&l.jsx(T1,{isOpen:r,children:({placement:i})=>l.jsx(P1,{options:e,onClose:()=>o(!1),inverse:i==="top-start",menuOpenKey:t})})}function F1({scriptureReference:t,contextMarker:e,getMarkerAction:n}){return{markersMenuItems:w.useMemo(()=>{if(!e||!t)return;const r=Dp(e);if(r!=null&&r.children)return Object.values(r.children).flatMap(o=>o.map(s=>{const i=Dp(s),{action:a}=n(s,i);return{name:s,label:s,description:(i==null?void 0:i.description)??"",action:c=>{a({editor:c,reference:t})}}}))},[e,n,t])}}function Ji(t,e){return`${t}:${e}`}function B1(t,e){w.useEffect(()=>{if(!t.hasNodes([Tt]))throw new Error("AnnotationPlugin: TypedMarkNode not registered on editor!");const n=new Map;return vt(Xf(t,Tt,r=>ei(r.getTypedIDs()),(r,o)=>{for(const[s,i]of Object.entries(r.getTypedIDs()))i.forEach(a=>{o.addID(s,a)})}),t.registerMutationListener(Tt,r=>{t.getEditorState().read(()=>{for(const[o,s]of r){const i=g.$getNodeByKey(o);let a={};s==="destroyed"?a=n.get(o)??{}:At(i)&&(a=i.getTypedIDs());for(const[c,u]of Object.entries(a))if(!Tt.isReservedType(c))for(const d of u){let p=e.get(Ji(c,d));a[c]=u,n.set(o,a),s==="destroyed"?p!==void 0&&(p.delete(o),p.size===0&&e.delete(Ji(c,d))):(p===void 0&&(p=new Set,e.set(Ji(c,d),p)),p.has(o)||p.add(o))}}})},{skipInitialization:!0}))},[t,e])}const q1=w.forwardRef(function({logger:t},e){const[n]=ye(),r=w.useMemo(()=>new Map,[]);return B1(n,r),w.useImperativeHandle(e,()=>({addAnnotation(o,s,i){if(Tt.isReservedType(s))throw new Error(`addAnnotation: Can't directly add this reserved annotation type '${s}'. Use the appropriate plugin instead.`);n.update(()=>{const a=Cu(o);if(a===void 0){t==null||t.error("Failed to find start or end node of the annotation.");return}Cm(a,s,i)},{tag:fc})},removeAnnotation(o,s){if(Tt.isReservedType(o))throw new Error(`removeAnnotation: Can't directly remove this reserved annotation type '${o}'. Use the appropriate plugin instead.`);const i=r.get(Ji(o,s));i!==void 0&&setTimeout(()=>{n.update(()=>{for(const a of i){const c=g.$getNodeByKey(a);At(c)&&(c.deleteID(o,s),c.hasNoIDsForEveryType()&&_m(c))}},{tag:fc})})}})),null});function U1({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=ye();return w.useLayoutEffect(()=>{if(n)return r.registerUpdateListener(o=>{const{editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:u}=o;if(e&&i.size===0&&a.size===0||t&&u.has(g.HISTORY_MERGE_TAG)||c.isEmpty())return;const d=V1(r,o);d.length!==0&&n(s,r,u,d)})},[r,t,e,n]),null}function V1(t,{dirtyLeaves:e,prevEditorState:n}){let r=new Is;return t.getEditorState().read(()=>{const o=e.values().next().value??"";if(e.size===1&&g.$isTextNode(g.$getNodeByKey(o))){const s=g.$getNodeByKey(o),i=jm(s);if(g.$isTextNode(s)&&i!==void 0){const a=n.read(()=>{const d=g.$getNodeByKey(o);return new Is([g.$isTextNode(d)?gc(d):{insert:""}])}),c=new Is([gc(s)]),u=new Is(i>0?[{retain:i}]:[]);r=r.concat(u).concat(a.diff(c))}}else{const s=$p(n),i=$p(t.getEditorState());r=s.diff(i)}}),r.ops}function H1(t,e,n,r){let o=0;t.forEach(s=>{if("retain"in s)o+=z1(s,o,e,r);else if("delete"in s){if(typeof s.delete!="number"||s.delete<=0){r==null||r.error(`Invalid delete operation: ${JSON.stringify(s)}`);return}r==null||r.debug(`Delete: ${s.delete}`),K1(o,s.delete,r)}else"insert"in s?typeof s.insert=="string"?(r==null||r.debug(`Insert: '${s.insert}'`),o+=Y1(o,s.insert,s.attributes,e,r)):typeof s.insert=="object"&&s.insert!==null?(r==null||r.debug(`Insert embed: ${JSON.stringify(s.insert)}`),J1(o,s,e,n,r)?o+=1:r==null||r.error(`Failed to process insert embed operation: ${JSON.stringify(s.insert)} at index ${o}. Document may be inconsistent.`)):r==null||r.error(`Insert of unknown type: ${JSON.stringify(s.insert)}`):r==null||r.error(`Unknown operation: ${JSON.stringify(s)}`)})}function z1(t,e,n,r){return typeof t.retain!="number"||t.retain<0?(r==null||r.error(`Invalid retain operation: ${JSON.stringify(t)}`),0):(r==null||r.debug(`Retain: ${t.retain}`),t.attributes&&(r==null||r.debug(`Retain attributes: ${JSON.stringify(t.attributes)}`),G1(e,t.retain,t.attributes,n,r)),t.retain)}function G1(t,e,n,r,o){o==null||o.debug(`Applying attributes for range [${t}, ${t+e-1}] with attributes: ${JSON.stringify(n)}`);let s=e,i=0,a=-1;const c=g.$getRoot();function u(d){if(s<=0)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t<i+p&&i<t+e){const f=Math.max(0,t-i),h=p-f,b=Math.min(s,h);if(b>0){let x=d;const C=f>0,E=b<p-f;if(C&&E){const[,_]=d.splitText(f);[x]=_.splitText(b)}else C?[,x]=d.splitText(f):E&&([x]=d.splitText(b));if(xo(n)){const _=x.getParent();if(Be(_)){const S=n.char;let j;Array.isArray(S)?a>=0&&a<=S.length-1&&(j=S[a]):a===0&&(j=S);const P=j?vo(j,_):!1;if(P&&Array.isArray(S)&&S.length>1){const O=g.$createTextNode("");x.replace(O);const F=typeof n.segment=="string"?n.segment:void 0,q=gi(S.slice(1),r,x,F);let B=O;for(const W of q)B.insertAfter(W),B=W;O.remove(),pn(n,x)}else if(P)pn(n,x);else{x.remove();const O=qp(x,n,r,o);if(O&&O.length>0){let F=_;for(const q of O)F.insertAfter(q),F=q}}}else{const S=g.$createTextNode("");x.replace(S);const j=qp(x,n,r,o);if(j&&j.length>0){let P=S;for(const O of j)P.insertAfter(O),P=O;S.remove()}else S.replace(x)}}else pn(n,x);s-=b}}i+=p}else if(Mn(d))t<=i&&i<t+e&&s>0&&(Up(d,n),s-=1),i+=1;else if(Be(d)){a+=1;let p=!1;if(t<=i&&i<t+e&&s>0)if(xo(n)){const f=n.char;let h;if(Array.isArray(f)?a>=0&&a<=f.length-1&&(h=f[a]):a===0&&(h=f),h){d.setMarker(h.style),typeof h.cid=="string"&&g.$setState(d,mo,()=>h.cid);const b=_t(h,wa);b&&Object.keys(b).length>0?d.setUnknownAttributes({...d.getUnknownAttributes()??{},...b}):d.setUnknownAttributes(void 0)}}else(n.char===!1||n.char===null||oE(n.char))&&(p=!0);if(s>0){const f=d.getChildren();for(const h of f){if(s<=0)break;if(u(h)&&s<=0)return p&&rd(d),!0}}p&&rd(d),a-=1}else if(gn(d)){const p=d.getChildren();for(const h of p){if(s<=0)break;if(u(h)&&s<=0)return!0}const f=1;if(t<=i&&i<t+s&&s>0){if(!fr(d))Up(d,n);else if(Du(n)){const h=qm(n.para);h&&d.replace(h,!0)}s-=f}i+=f}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(s<=0)break;if(u(f)&&s<=0)return!0}}return s<=0}u(c),s>0&&(o==null||o.warn(`$applyAttributes: Not all characters in the retain operation (length ${e}) could be processed. Remaining: ${s}. targetIndex: ${t}, final currentIndex: ${i}`))}function qp(t,e,n,r){var o;const s=typeof e.segment=="string"?e.segment:void 0,i=gi(e.char,n,t,s),a=i.find(Be);if(!a){r==null||r.error(`Failed to create CharNode for text transformation. Style: ${Array.isArray(e.char)?e.char[0].style:(o=e.char)==null?void 0:o.style}. Falling back to standard text attributes.`),pn(e,t);return}const c={};Um.forEach(p=>{t.hasFormat(p)&&(c[p]="true")});const u={};Object.entries(e).forEach(([p,f])=>{p==="segment"||p==="char"||(typeof f=="string"?u[p]=f:f===!0?u[p]="true":f===!1&&(u[p]="false"))});const d={...a.getUnknownAttributes()??{},...c,...u};return Object.keys(d).length>0&&a.setUnknownAttributes(d),pn(e,t),i}function Up(t,e){for(const n of Object.keys(e)){const r=e[n];if(n==="char"&&Be(t)&&xo(e)){const o=r;if(t.setMarker(o.style),typeof o.cid=="string"){const i=o.cid;g.$setState(t,mo,()=>i)}const s=_t(o,wa);s&&Object.keys(s).length>0&&t.setUnknownAttributes({...t.getUnknownAttributes()??{},...s});continue}typeof r=="string"&&(hn(t)||wn(t)||Ba(t)||Se(t)||fi(t)?t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r}):(Qn(t)||jt(t)||Be(t))&&(n==="style"&&!Qn(t)?t.setMarker(r):n==="code"&&Qn(t)?t.setCode(r):t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r})),n==="segment"&&g.$setState(t,go,()=>r))}}function K1(t,e,n){if(e<=0)return;const r=g.$getRoot();let o=0,s=e;function i(a){if(s<=0)return!0;if(g.$isTextNode(a)){let c=a.getTextContentSize();if(t<o+c&&o<t+s){const u=Math.max(0,t-o),d=c-u,p=Math.min(s,d);p>0&&(a.spliceText(u,p,""),a.getTextContentSize()===0&&a.remove(),n==null||n.debug(`Deleted ${p} length from TextNode (key: ${a.getKey()}) at nodeOffset ${u}. Original targetIndex: ${t}, current currentIndex: ${o}.`),s-=p,c-=p)}o+=c}else if(Mn(a))t<=o&&o<t+s?(a.remove(),n==null||n.debug(`Deleted embed node (key: ${a.getKey()}) at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`),s-=1):o+=1;else if(gn(a)){const c=a.getChildren().slice(),u=a.getChildren();for(const d of u){if(s<=0)break;if(i(d)&&s<=0)return!0}if(t<=o&&o<t+s&&gn(a)){s-=1;const d=a.getChildren().length;if(c.length>0&&d===0){const p=a.getParent();((p==null?void 0:p.getChildren())??[]).length>1?(a.remove(),n==null||n.debug(`Removed entire ParaNode that had all its content deleted at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)):(a.replace(Nn(),!0),n==null||n.debug(`Replaced last ParaNode with ImpliedParaNode at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`))}else if(s>0){const p=a.getNextSibling();if(p&&kn(p)){let f=o+1;const h=p.getChildren();for(const x of h){if(s<=0)break;const C=o;if(o=f,i(x)){o=C;break}g.$isTextNode(x)?f+=x.getTextContentSize():Mn(x)&&(f+=1),o=C}const b=p.getChildren();for(const x of b)x.remove(),a.append(x);p.remove(),n==null||n.debug(`Merged next paragraph into current one after deleting symbolic close at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)}else a.replace(Nn(),!0)}else jt(a)?a.replace(Nn(),!0):a.remove()}o+=1}else if(g.$isElementNode(a)){const c=a.getChildren();for(const u of c){if(s<=0)break;if(i(u)&&s<=0)return!0}}return s<=0}i(r),s>0&&(n==null||n.warn(`Delete operation could not remove all requested characters. Remaining to delete: ${s}. Original targetIndex: ${t}, OT length: ${e}. Final currentIndex: ${o}`))}function Y1(t,e,n,r,o){if(e===ti)return Vp(t,n,o);if(e.endsWith(ti)&&!Du(n)){const s=e.slice(0,-1);let i=0;if(s.length>0){if(xo(n))throw new Error("Text + LF should not have char attributes");i+=ma(t,s,n,o)}return i+=Vp(t+i,n,o),i}else return xo(n)?W1(t,e,n,r,o):ma(t,e,n,o)}function W1(t,e,n,r,o){o==null||o.debug(`Attempting to insert CharNode with text "${e}" and attributes ${JSON.stringify(n.char)} at index ${t}`);const s=g.$createTextNode(e===""?Ae:e);pn(n,s);let i;{let h=function(C){if(g.$isTextNode(C)){const E=C.getTextContentSize();if(t>=x&&t<x+E){const _=C.getParent();return Be(_)&&(i=_),!0}x+=E}else if(Mn(C))x+=1;else if(Be(C)){const E=C.getChildren();for(const _ of E)if(h(_))return!0}else if(g.$isElementNode(C)){const E=C.getChildren();for(const _ of E)if(h(_))return!0;gn(C)&&(x+=1)}return!1};const b=g.$getRoot();let x=0;h(b)}let a=n.char;if(Array.isArray(a)){if(i){const h=a[0];h&&vo(h,i)?(a=a.slice(1),a.length===1&&(a=a[0])):i=void 0}}else i&&(vo(a,i)||(i=void 0));const c=typeof n.segment=="string"?n.segment:void 0,u=gi(a,r,s,c,i?[i]:void 0);if(u.length===0)return e.length;const d=u.find(Be);if(!d)return o==null||o.error(`CharNode style is missing for text "${e}". Attributes: ${JSON.stringify(n.char)}. Falling back to rich text insertion.`),ma(t,e,void 0,o);const p={};for(const[h,b]of Object.entries(n))h!=="char"&&h!=="segment"&&typeof b=="string"&&(p[h]=b);Object.keys(p).length>0&&d.setUnknownAttributes(p);let f=!0;for(const h of u)if(!Bm(t,h,o)){f=!1;break}return f?e.length:(o==null||o.error(`Failed to insert CharNode with text "${e}" at index ${t}. Falling back to rich text.`),ma(t,e,void 0,o))}function ma(t,e,n,r){if(e.length<=0)return r==null||r.debug("Attempted to insert empty string. No action taken."),0;const o=g.$getRoot();let s=0,i=!1;function a(c){if(i)return!0;if(g.$isTextNode(c)){const u=c.getTextContentSize();if(t>=s&&t<=s+u){const d=t-s,p=g.$createTextNode(e);if(pn(n,p),d===0)c.insertBefore(p);else if(d===u){const f=c.getParent();Be(f)&&!xo(n)?f.insertAfter(p):c.insertAfter(p)}else{const[,f]=c.splitText(d);f.insertBefore(p)}return r==null||r.debug(`Inserted text "${e}" in/around TextNode (key: ${c.getKey()}) at nodeOffset ${d}. Original targetIndex: ${t}, currentIndex at node start: ${s}.`),i=!0,!0}s+=u}else if(Mn(c))s+=1;else if(Be(c)){if(!i&&t===s){const d=g.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=g.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}}else if(gn(c)){if(!i&&t===s){const d=g.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=g.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}s+=1}else if(g.$isElementNode(c)){const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}}return i}if(a(o),!i&&t===s){r==null||r.debug(`Insertion point matches end of document (targetIndex: ${t}, final currentIndex: ${s}). Appending text to new ParaNode.`);const c=g.$createTextNode(e);pn(n,c);const u=Nn().append(c);o.append(u),i=!0}return i?e.length:(r==null||r.warn(`$insertRichText: Could not find insertion point for text "${e}" at targetIndex ${t}. Final currentIndex: ${s}. Text not inserted.`),0)}function Bm(t,e,n){const r=g.$getRoot();let o=0,s=!1;function i(a){if(s)return!0;if(a===r&&t===0&&!r.getFirstChild())return e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into empty root, wrapped in ImpliedParaNode. targetIndex: ${t}`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} directly into empty root. targetIndex: ${t}`),r.append(e)),s=!0,!0;if(!g.$isElementNode(a))return!1;const c=a.getChildren();for(const u of c){if(t===o&&!s){if(a===r&&e.isInline())if(kn(u)){n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into existing ${u.getType()} at beginning. targetIndex: ${t}`);const d=u.getFirstChild();d?d.insertBefore(e):u.append(e)}else n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into root before ${u.getType()}, wrapping in ImpliedParaNode. targetIndex: ${t}`),u.insertBefore(Nn().append(e));else u.insertBefore(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) before child ${u.getType()} (key: ${u.getKey()}) in ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, currentIndex: ${o}`);return s=!0,!0}if(g.$isTextNode(u)){const d=u.getTextContentSize();if(!s&&t>o&&t<o+d){const p=t-o,[f]=u.splitText(p);return f.insertAfter(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) by splitting TextNode (key: ${u.getKey()}) at offset ${p}. targetIndex: ${t}, currentIndex at node start: ${o}`),s=!0,!0}o+=d}else if(Mn(u))o+=1;else if(Be(u)){if(i(u))return!0}else if(gn(u)){const d=u;if(i(d))return!0;const p=o;if(fr(d)&&gn(e)&&t===p&&!s)return n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode (key: ${d.getKey()}) with block node '${e.getType()}' (key: ${e.getKey()}) at OT index ${t}.`),u.replace(e,!0),o=p+1,s=!0,!0;o+=1}else if(g.$isElementNode(u)&&i(u))return!0;if(s)return!0}return g.$isElementNode(a)&&!s&&(t===o||a===r&&t>o)?a===r?(e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending inline node ${e.getType()} to root. Wrapping in new ImpliedParaNode. targetIndex: ${t}, current document OT length: ${o}.`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending block node ${e.getType()} to root. targetIndex: ${t}, current document OT length: ${o}.`),r.append(e)),s=!0,!0):kn(a)?fr(a)&&jt(e)&&t===o?(n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode container (key: ${a.getKey()}) with ParaNode ${e.getType()} (key: ${e.getKey()}) via append logic. targetIndex: ${t}`),a.replace(e,!0),s=!0,!0):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to existing container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.append(e),s=!0,!0):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.insertAfter(e),s=!0,!0):(Be(a)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting node ${e.getType()} after CharNode (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.append(e)):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)),s=!0,!0):s}return i(r),s||n==null||n.warn(`$insertNodeAtCharacterOffset: Could not find insertion point for node ${e.getType()} (key: ${e.getKey()}) at targetIndex ${t}. Final currentIndex: ${o}. Node not inserted.`),s}function J1(t,e,n,r,o){let s;return Er("chapter",e)?s=X1(e.insert.chapter,n):Er("verse",e)?s=Q1(e.insert.verse,n):Er("ms",e)?s=Z1(e.insert.ms):Er("unmatched",e)?s=eE(e.insert.unmatched):Er("note",e)&&(s=tE(e,n,r,o)),s?Bm(t,s,o):(o==null||o.error(`$insertEmbedAtCurrentIndex: Cannot create LexicalNode for embed object: ${JSON.stringify(e.insert)}`),!1)}function Vp(t,e,n){let r;Du(e)?r=qm(e.para):rE(e)&&(r=nE(e.book)),r??(r=Nn());const o=r,s=jt(o),i=fr(o);let a=0,c=!1;function u(d){if(c)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t>=a&&t<=a+p){const f=d.getParent();if(jt(f)&&(s||i)){n==null||n.debug(`Splitting ParaNode (marker: ${f.getMarker()}) with LF attributes at targetIndex ${t}`);const h=t-a,[b]=h>0?d.splitText(h):[void 0];let x=b==null?void 0:b.getPreviousSibling();for(;x;){const C=x;x=x.getPreviousSibling();const E=o.getFirstChild();E?E.insertBefore(C):o.append(C)}return b&&o.append(b),f.insertBefore(o),c=!0,!0}}a+=p}else if(Mn(d))a+=1;else if(gn(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}if(t===a){if(fr(d)&&o)return n==null||n.debug(`Replacing ImpliedParaNode (key: ${d.getKey()}) with ParaNode at targetIndex ${t}`),d.replace(o,!0),c=!0,!0;if(jt(d)&&o){const f=d;return n==null||n.debug(`Creating new block node with LF attributes after existing ParaNode (marker: ${f.getMarker()}) at targetIndex ${t}`),f.insertAfter(o),c=!0,!0}}if(a+=1,t===a&&jt(d)&&o)return n==null||n.debug(`Creating new block node after existing ParaNode (marker: ${d.getMarker()}) at targetIndex ${t}`),d.insertAfter(o),c=!0,!0}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}}return c}return u(g.$getRoot()),c||n==null||n.warn(`Could not find location to handle newline with para attributes at targetIndex ${t}. Final currentIndex: ${a}.`),1}function X1(t,e){if(!t)return;const{number:n,sid:r,altnumber:o,pubnumber:s}=t;if(!n)return;const i=_t(t,GC);let a;if(e.markerMode==="editable")a=om(n,r,o,s,i);else{const c=e.markerMode==="visible";a=pu(n,c,r,o,s,i)}return a}function Q1(t,e){if(!t)return;const{style:n,number:r,sid:o,altnumber:s,pubnumber:i}=t;if(!r)return;const a=_t(t,KC);let c;if(e.markerMode==="editable"){if(!n)return;const u=wi(n,r);c=gm(r,u,o,s,i,a)}else{const u=e.markerMode==="visible";c=Eu(r,u,o,s,i,a)}return c}function Z1(t){if(!t)return;const{style:e,sid:n,eid:r}=t;if(!e)return;const o=_t(t,YC);return fm(e,n,r,o)}function eE(t){if(!t)return;const{marker:e}=t;if(e)return _u(e)}function tE(t,e,n,r){var o;const s=t.insert;if(!s.note)return;const{style:i,caller:a,category:c,contents:u}=s.note;if(!i||a==null)return;a===""&&(r==null||r.warn("Note has empty caller. Only use for note editing."));const d=_t(s.note,WC),p=(o=t.attributes)==null?void 0:o.segment;let f;p&&typeof p=="string"&&(f=p);const h=[];for(const b of(u==null?void 0:u.ops)??[])if(typeof b.insert=="string")if(xo(b.attributes)){const x=gi(b.attributes.char,e,g.$createTextNode(b.insert),void 0,h);h.push(...x)}else h.push(g.$createTextNode(b.insert));return Mm(i,a,h,e,n,f).setCategory(c).setUnknownAttributes(d)}function nE(t){const{style:e,code:n}=t;if(!e||e!==Xs||!n||!mn.isValidBookCode(n))return;const r=_t(t,zC);return tm(n,r)}function qm(t){const{style:e}=t;if(!e)return;const n=_t(t,HC);return Zs(e,n)}function gi(t,e,n,r,o){if(g.$isTextNode(n)&&n.getTextContentSize()===0&&n.setTextContent(Ae),Array.isArray(t)){if(t.length===0)throw new Error("Empty charAttr array");const s=t[0],i=o==null?void 0:o[o.length-1];if(Be(i)&&vo(s,i))return t.length>1?gi(t.slice(1),e,n).forEach(d=>i.append(d)):n&&i.append(n),[];const a=t.reduceRight((d,p,f)=>{const h=Hn(p.style,_t(p,wa));if(typeof p.cid=="string"&&g.$setState(h,mo,()=>p.cid),r&&f===t.length-1&&g.$setState(h,go,()=>r),d)if(Be(d)){const b=d.getMarker(),x=[];Dl(b,x,e),x.forEach(E=>h.append(E)),h.append(d);const C=[];Ml(b,C,e),C.forEach(E=>h.append(E))}else h.append(d);return h},n),c=[],u=t[0];return Dl(u.style,c,e),c.push(a),Ml(u.style,c,e),c}else{const s=o==null?void 0:o[o.length-1];if(Be(s)&&vo(t,s))return n&&s.append(n),[];const i=[];Dl(t.style,i,e);const a=Hn(t.style,_t(t,wa));return typeof t.cid=="string"&&g.$setState(a,mo,()=>t.cid),r&&g.$setState(a,go,()=>r),n&&a.append(n),i.push(a),Ml(t.style,i,e),i}}function Dl(t,e,n){(n==null?void 0:n.markerMode)==="editable"?e.push(ss(t)):(n==null?void 0:n.markerMode)==="visible"&&e.push(is("marker",br(t)))}function Ml(t,e,n,r=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((n==null?void 0:n.markerMode)==="editable"?r?e.push(ss("","selfClosing")):e.push(ss(t,"closing")):(n==null?void 0:n.markerMode)==="visible"&&e.push(is("marker",os(r?"":t))))}function rE(t){return!!t&&!!t.book&&typeof t.book=="object"&&t.book!==null&&"style"in t.book&&typeof t.book.style=="string"&&"code"in t.book&&typeof t.book.code=="string"}function Du(t){return!!t&&!!t.para&&typeof t.para=="object"&&t.para!==null&&"style"in t.para&&typeof t.para.style=="string"}function xo(t){return!!t&&!!t.char&&typeof t.char=="object"&&t.char!==null&&(!Array.isArray(t.char)&&"style"in t.char&&typeof t.char.style=="string"||Array.isArray(t.char)&&t.char.length>0&&"style"in t.char[0]&&typeof t.char[0].style=="string")}function oE(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&Object.keys(t).length===0}function pn(t,e){if(t)for(const n of Object.keys(t)){if(n==="segment"&&typeof t[n]=="string"){const r=t[n];g.$setState(e,go,()=>r);continue}if(sE(n)){const r=!!t[n],o=n,s=e.hasFormat(o);(r&&!s||!r&&s)&&e.toggleFormat(o)}}}const Um=["bold","underline","strikethrough","italic","highlight","code","subscript","superscript","lowercase","uppercase","capitalize"];function sE(t){return Um.includes(t)}function iE({viewOptions:t}){const[e]=ye();return aE(e,t),null}function aE(t,e){w.useEffect(()=>{if(!t.hasNodes([gr,qt,yt]))throw new Error("ArrowNavigationPlugin: ImmutableChapterNode, ImmutableVerseNode or NoteNode not registered on editor!");const n=r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return!1;const o=g.$getSelection();if(!g.$isRangeSelection(o)||!o.isCollapsed())return!1;const s=t.getRootElement();if(!s)return!1;const i=s.dir||"ltr";let a=!1;return lE(i,r.key)?a=uE(o):cE(i,r.key)&&(a=dE(o,e)),a&&r.preventDefault(),a};return t.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[t,e])}function lE(t,e){return t==="ltr"&&e==="ArrowRight"||t==="rtl"&&e==="ArrowLeft"}function cE(t,e){return t==="ltr"&&e==="ArrowLeft"||t==="rtl"&&e==="ArrowRight"}function uE(t){var e,n,r;const o=t.anchor.getNode(),s=lC(t);if(Se(s)&&!mi(s.getFirstChild())){if(kn(o)){if(t.anchor.offset===o.getChildrenSize())return!1}else if(t.anchor.offset!==o.getTextContentSize())return!1;if(s.getIsCollapsed()){if(s.is((e=s.getParent())==null?void 0:e.getLastChild()))return(r=(n=s.getParent())==null?void 0:n.getNextSibling())==null||r.selectStart(),!0}else return fa(s.getFirstChild())?s.select(2,2):s.select(1,1),!0}if(kn(o)&&Se(s)&&s.getIsCollapsed()){const a=s.getNextSibling();return a?a.selectStart():s.selectEnd(),!0}const i=s==null?void 0:s.getParent();if(fa(s)&&Se(i)&&s.is(i==null?void 0:i.getLastChild())){const a=i.getNextSibling();return a?a.selectStart():i.selectEnd(),!0}return!1}function dE(t,e){const n=cC(t);if(hi(n)&&!n.getPreviousSibling())return!0;if(t.anchor.offset!==0)return!1;const r=t.anchor.getNode();if(Qn(r.getParent()))return!0;if(Se(n)&&n.getIsCollapsed()){const s=n.getPreviousSibling();if(!xs(s))return!1;const i=n.getParent();if(!i)return!1;const a=n.getIndexWithinParent();return i.select(a,a),!0}if(kn(n)&&(e==null?void 0:e.noteMode)==="collapsed"){const s=n.getLastChild();if(!s)return!1;const i=Bs(s,a=>Se(a));if(Se(i)&&i.getIsCollapsed()){const a=i.getParent();if(!a)return!1;const c=i.getIndexWithinParent();return a.select(c,c),!0}}const o=bm(r);if(!o||o.getIsCollapsed())return!1;if(Kr(n)){const s=o.getParent();if(!s)return!1;const i=o.getIndexWithinParent();return s.select(i,i),!0}return!1}function pE(){const[t]=ye();return fE(t),null}function fE(t){w.useEffect(()=>{if(!t.hasNodes([Qe]))throw new Error("CharNodePlugin: CharNode not registered on editor!");return vt(t.registerNodeTransform(Qe,hE),t.registerNodeTransform(g.TextNode,wE))},[t])}function hE(t){if(!Be(t))return;if(t.isEmpty()){t.remove();return}const e=t.getMarker(),n=g.$getState(t,mo),r=t.getUnknownAttributes(),o=t.getNextSibling();Be(o)&&vo({style:e,cid:n},o)&&ir(r,o.getUnknownAttributes())&&(t.append(...o.getChildren()),o.remove());const s=t.getPreviousSibling();Be(s)&&vo({style:e,cid:n},s)&&ir(r,s.getUnknownAttributes())&&(s.append(...t.getChildren()),t.remove())}function wE(t){const e=t.getParent();if(!Be(e)||e.getChildrenSize()!==1)return;const n=t.getTextContent();n.length>1&&n.startsWith(Ae)&&(t.setTextContent(n.slice(1)),t.selectEnd())}function Vm(t){return t.replaceAll("	"," ")}const Mu=t=>{navigator.clipboard.read().then(async e=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const n=new DataTransfer,r=e[0];for(const s of r.types){const i=await(await r.getType(s)).text();n.setData(s,Vm(i))}const o=new ClipboardEvent("paste",{clipboardData:n});t.dispatchCommand(g.PASTE_COMMAND,o)})},Ru=t=>{navigator.clipboard.read().then(async()=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const e=new DataTransfer,n=await navigator.clipboard.readText();e.setData("text/plain",Vm(n));const r=new ClipboardEvent("paste",{clipboardData:e});t.dispatchCommand(g.PASTE_COMMAND,r)})};function mE(){const[t]=ye();return w.useEffect(()=>{const e=n=>{const{key:r,shiftKey:o,metaKey:s,ctrlKey:i,altKey:a}=n;!(Hl?s:i)||a||(!o&&r.toLowerCase()==="c"?(n.preventDefault(),t.dispatchCommand(g.COPY_COMMAND,null)):!o&&r.toLowerCase()==="x"?(n.preventDefault(),t.dispatchCommand(g.CUT_COMMAND,null)):r.toLowerCase()==="v"&&(n.preventDefault(),o?Ru(t):Mu(t)))};return t.registerRootListener((n,r)=>{r!==null&&r.removeEventListener("keydown",e),n!==null&&n.addEventListener("keydown",e)})},[t]),null}function gE({logger:t}){const[e]=ye();return w.useEffect(()=>vt(e.registerCommand(g.KEY_DOWN_COMMAND,n=>n.key!=="\\"&&n.key!=="/"?!1:(n.preventDefault(),!0),g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.PASTE_COMMAND,n=>{var r;const o=(r=n.clipboardData)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: paste containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.DROP_COMMAND,n=>{var r;const o=(r=n.dataTransfer)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: drag containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL)),[e,t]),null}function bE({index:t,isSelected:e,onClick:n,onMouseEnter:r,option:o}){let s="item";return e&&(s+=" selected"),o.isDisabled&&(s+=" disabled"),l.jsx("li",{tabIndex:-1,className:s,ref:o.setRefElement,role:"option","aria-selected":e,"aria-disabled":o.isDisabled,id:"typeahead-item-"+t,onMouseEnter:r,onClick:o.isDisabled?void 0:n,children:l.jsx("span",{className:"text",children:o.title})},o.key)}function vE({options:t,selectedItemIndex:e,onOptionClick:n,onOptionMouseEnter:r}){return l.jsx("div",{className:"typeahead-popover",children:l.jsx("ul",{children:t.map((o,s)=>l.jsx(bE,{index:s,isSelected:e===s,onClick:()=>n(o,s),onMouseEnter:()=>r(s),option:o},o.key))})})}class Vi extends Ny{constructor(e,n){super(e),de(this,"title"),de(this,"onSelect"),de(this,"isDisabled"),this.title=e,this.onSelect=n.onSelect.bind(this),this.isDisabled=n.isDisabled||!1}}function xE(t,e="editor-input"){return t?t.classList.contains(e):!1}function yE(){const[t]=ye(),[e,n]=w.useState(()=>!t.isEditable()),r=w.useRef(void 0),o=w.useRef(void 0),s=w.useRef(void 0),i=w.useMemo(()=>[new Vi("Cut",{onSelect:()=>{t.dispatchCommand(g.CUT_COMMAND,null)},isDisabled:e}),new Vi("Copy",{onSelect:()=>{t.dispatchCommand(g.COPY_COMMAND,null)}}),new Vi("Paste",{onSelect:()=>{Mu(t)},isDisabled:e}),new Vi("Paste as Plain Text",{onSelect:()=>{Ru(t)},isDisabled:e})],[t,e]),a=w.useCallback((c,u,d)=>{t.update(()=>{c==null||c.onSelect(u),d()})},[t]);return w.useEffect(()=>{var c;o.current=((c=t.getRootElement())==null?void 0:c.className)??""},[t]),w.useEffect(()=>{const c=()=>{var u;(u=s.current)==null||u.call(s)};return window.addEventListener("scroll",c,!0),()=>{window.removeEventListener("scroll",c,!0)}},[]),w.useEffect(()=>t.registerEditableListener(c=>{n(!c)}),[t]),l.jsx(Ay,{options:i,onSelectOption:a,onWillOpen:c=>{r.current=c.target},menuRenderFn:(c,{selectedIndex:u,options:d,selectOptionAndCleanUp:p,setHighlightedIndex:f},{setMenuRef:h})=>(s.current=()=>p(void 0),c.current&&!xE(r.current,o.current)&&!um(r.current)?Rb.createPortal(l.jsx("div",{className:"typeahead-popover auto-embed-menu",style:{marginLeft:c.current.style.width,userSelect:"none",width:200},ref:h,children:l.jsx(vE,{options:i,selectedItemIndex:u,onOptionClick:(b,x)=>{b.isDisabled||(f(x),p(b))},onOptionMouseEnter:b=>{f(b)}})}),c.current):null)})}function _E({isEditable:t}){const[e]=ye();return w.useLayoutEffect(()=>{e.setEditable(t)},[e,t]),null}function CE({scripture:t,nodeOptions:e,editorAdaptor:n,viewOptions:r,logger:o}){const[s]=ye();return w.useEffect(()=>{var i;(i=n.initialize)==null||i.call(n,e,o)},[n,o,e]),w.useEffect(()=>{var i;(i=n.reset)==null||i.call(n);const a=n.serializeEditorState(t,r);if(a==null){o==null||o.warn("LoadStatePlugin: serializedEditorState was null or undefined. Skipping editor update.");return}try{const c=s.parseEditorState(a);queueMicrotask(()=>{s.update(()=>{s.setEditorState(c),s.dispatchCommand(g.CLEAR_HISTORY_COMMAND,void 0)},{tag:uu})})}catch{o==null||o.error("LoadStatePlugin: error parsing or setting editor state.")}},[s,n,o,t,r]),null}function EE({expandedNoteKeyRef:t,nodeOptions:e,viewOptions:n,logger:r}){const[o]=ye();return kE(e,r),NE(o,t,n,r),null}function kE(t,e){const n=w.useRef(void 0),r=t.noteCallers;w.useEffect(()=>{let o=r;(!o||o.length<=0)&&(o=x1),n.current!==o&&(n.current=o,jE("note-callers",o,e))},[e,r])}function NE(t,e,n,r){w.useEffect(()=>{if(!t.hasNodes([Qe,yt,Tn]))throw new Error("NoteNodePlugin: CharNode, NoteNode or ImmutableNoteCallerNode not registered on editor!");const o=s=>t.update(()=>OE(s));return vt(t.registerNodeTransform(yt,s=>TE(s,n)),t.registerNodeTransform(Qe,SE),t.registerNodeTransform(g.TextNode,AE),t.registerNodeTransform(Tn,DE),t.registerMutationListener(Tn,(s,{prevEditorState:i})=>ME(s,i)),t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>RE(t,e,n,r),g.COMMAND_PRIORITY_LOW),t.registerRootListener((s,i)=>{i!==null&&i.removeEventListener("dblclick",o),s!==null&&s.addEventListener("dblclick",o)}))},[t,e,r,n])}function TE(t,e){const n=t.getChildren();if(!n.some(r=>Kr(r))&&(e==null?void 0:e.markerMode)!=="editable"&&t.getCaller()!==""&&t.remove(),n.length>0){const r=n[0];g.$isTextNode(r)&&!mi(r)&&t.insertBefore(r)}}function SE(t){const e=t.getParentOrThrow(),n=e.getChildren(),r=n.find(i=>Kr(i));if(!Be(t)||!Se(e)||!r)return;const o=xu(n);r.getPreviewText()!==o&&r.setPreviewText(o);const s=t.getNextSibling();g.$isTextNode(s)?s.getTextContent()!==Ae&&s.setTextContent(Ae):t.insertAfter(g.$createTextNode(Ae))}function AE(t){const e=bm(t),n=e==null?void 0:e.getChildren(),r=n==null?void 0:n.find(i=>Kr(i));if(!g.$isTextNode(t)||!Se(e)||!r||!n)return;const o=t.getParent();if(!mi(t)&&Se(o)&&t.getTextContent()!==Ae&&(t.setTextContent(Ae),t.selectEnd()),Be(o)&&o.getChildrenSize()===1){const i=t.getTextContent();i.length>1&&i.startsWith(Ae)&&(t.setTextContent(i.slice(1)),t.selectEnd())}const s=xu(n);r.getPreviewText()!==s&&r.setPreviewText(s)}function DE(t){if(!Kr(t))return;const e=t.getNextSibling();!g.$isTextNode(e)||mi(e)?t.insertAfter(g.$createTextNode(Ae)):e.getTextContent()!==Ae&&e.setTextContent(Ae)}function ME(t,e){for(const[n,r]of t){if(r!=="destroyed")continue;const o=e.read(()=>{const i=g.$getNodeByKey(n),a=i==null?void 0:i.getParent();return Kr(i)&&Se(a)&&a.getCaller()===Ir}),s=document.querySelector(".editor-input");!o||!s||(s.classList.add("reset-counters"),s.offsetHeight,s.classList.remove("reset-counters"))}}function RE(t,e,n,r){var o;if((n==null?void 0:n.noteMode)!=="expandInline")return!1;const s=g.$getSelection();if(!g.$isRangeSelection(s)||!s.isCollapsed())return!1;const i=s.anchor,a=i.getNode();if(e.current){const c=Bs(a,u=>Se(u));if(c)e.current!==c.getKey()&&(e.current=c.getKey());else{const u=g.$getNodeByKey(e.current);u&&!u.getIsCollapsed()&&(r==null||r.debug("Cursor moved away from NoteNode, collapsing it"),Ds(t,e.current,r)),e.current=void 0}}if(i.offset===0){const c=a.getPreviousSibling();if(Se(c)){r==null||r.debug("Cursor is just after a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,Ds(t,u,r)}}if(i.offset===a.getTextContentSize()){const c=a.getNextSibling();if(Se(c)){r==null||r.debug("Cursor is just before a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,Ds(t,u,r)}else if(!c){const u=Bs(a,d=>Se(d));if(u&&u.getIsCollapsed()&&kn(u.getParent())&&u.is((o=u.getParent())==null?void 0:o.getLastChild())){r==null||r.debug("Cursor is at end of note at end of para");const d=u.getKey();e.current=d,Ds(t,d,r)}}}if(kn(a)){const c=a.getChildAtIndex(i.offset),u=c==null?void 0:c.getPreviousSibling();if(xs(u)&&Se(c)){r==null||r.debug("Cursor is between verse and NoteNode");const d=c.getKey();c.getIsCollapsed()?e.current=d:e.current=void 0,Ds(t,d,r)}}return!1}function Ds(t,e,n){const r=g.$getNodeByKey(e);try{r==null||r.toggleIsCollapsed()}catch(o){if(o instanceof Error&&o.message.includes("read only"))n==null||n.warn("Fallback triggered after stabilization - edge case"),setTimeout(()=>{t.update(()=>{r==null||r.toggleIsCollapsed()})},0);else throw o}}function OE(t){const e=g.$getSelection();if(!g.$isRangeSelection(e))return;const n=e.anchor,r=e.focus,o=n.getNode(),s=r.getNode();if(Se(o)&&g.$isTextNode(s)){t.preventDefault();const i=g.$createRangeSelection();i.anchor.set(s.getKey(),0,"text"),i.focus.set(s.getKey(),r.offset,"text"),g.$setSelection(i)}}function jE(t,e,n){for(const r of document.styleSheets)try{const o=r.cssRules||r.rules;for(const s of o)if(IE(s,t)){const i=e.map(a=>`"${a}"`).join(" ");s.symbols=i;return}}catch{continue}n==null||n.warn(`Editor: counter style "${t}" not found.`)}function IE(t,e){return typeof t=="object"&&t!==null&&"name"in t&&t.name===e&&"symbols"in t&&typeof t.symbols=="string"}function LE({onChange:t}){const[e]=ye();return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const n=e.read(()=>Tm());return t==null||t(n),!1},g.COMMAND_PRIORITY_LOW),[e,t]),null}function PE(){const[t]=ye();return $E(t),null}function $E(t){w.useEffect(()=>{if(!t.hasNodes([Yt]))throw new Error("ParaNodePlugin: ParaNode not registered on editor!");return t.registerNodeTransform(Yt,e=>FE(e,t))},[t])}function FE(t,e){Nu(e,t.getKey())&&Om(t.getFirstChild()),!(!jt(t)||t.getMarker()!=="b"||t.isEmpty()||!e.getEditorState().read(()=>{const n=g.$getNodeByKey(t.getKey());return jt(n)&&((n==null?void 0:n.isEmpty())??!1)}))&&t.clear()}function Hm({onStateChange:t}){const[e]=ye(),[n,r]=w.useState(e),o=w.useRef(!1),s=w.useRef(!1),i=w.useRef(),a=w.useCallback(()=>{const c=g.$getSelection();if(g.$isRangeSelection(c)){const u=c.anchor.getNode();let d=u.getKey()==="root"?u:Bs(u,f=>{const h=f.getParent();return h!==null&&g.$isRootOrShadowRoot(h)});d===null&&(d=u.getTopLevelElementOrThrow());const p=d.getKey();n.getElementByKey(p)!==null&&(jt(d)||Qn(d)||hi(d))&&(i.current=d.getMarker(),t==null||t(o.current,s.current,i.current))}},[n,t]);return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,(c,u)=>(a(),r(u),!1),g.COMMAND_PRIORITY_CRITICAL),[e,a]),w.useEffect(()=>vt(n.registerUpdateListener(({editorState:c})=>{c.read(()=>{a()})}),n.registerCommand(g.CAN_UNDO_COMMAND,c=>(o.current=c,t==null||t(o.current,s.current,i.current),!1),g.COMMAND_PRIORITY_CRITICAL),n.registerCommand(g.CAN_REDO_COMMAND,c=>(s.current=c,t==null||t(o.current,s.current,i.current),!1),g.COMMAND_PRIORITY_CRITICAL)),[a,n,t]),null}function BE({textDirection:t}){const[e]=ye();return qE(e,t),UE(e),null}function qE(t,e){w.useEffect(()=>{function n(){const r=t.getRootElement();if(!r||e==="auto")return;r.dir=e;const o=t._config.theme.placeholder,s=document.getElementsByClassName(o)[0];s&&(s.dir=e)}return n(),t.registerUpdateListener(({dirtyElements:r})=>{r.size>0&&n()})},[t,e])}function UE(t){w.useEffect(()=>{const e=n=>{if(n.key!=="ArrowLeft"&&n.key!=="ArrowRight")return!1;const r=g.$getSelection();if(!g.$isRangeSelection(r))return!1;const o=r.anchor.getNode(),s=Bs(o,p=>mC(p,t)==="p");if(!s)return!1;const i=t.getElementByKey(s.getKey());if(!i)return!1;const a=i.parentElement,c=i.dir||"ltr",u=((a==null?void 0:a.dir)??"")||"ltr";if(!a||c===u)return!1;const d=a.dir==="rtl"&&n.key==="ArrowLeft"||a.dir==="ltr"&&n.key==="ArrowRight";return r.modify("move",d,"character"),n.preventDefault(),!0};return t.registerCommand(g.KEY_DOWN_COMMAND,e,g.COMMAND_PRIORITY_HIGH)},[t])}function VE(){const[t]=ye();return HE(t),null}function HE(t){w.useEffect(()=>{if(!t.hasNodes([Qe,qt,yt,g.TextNode,Bt]))throw new Error("TextSpacingPlugin: CharNode, ImmutableVerseNode, NoteNode, TextNode or VerseNode not registered on editor!");return vt(t.registerNodeTransform(g.TextNode,zE),t.registerNodeTransform(g.TextNode,e=>GE(e,t)),t.registerNodeTransform(Bt,Hp),t.registerNodeTransform(qt,Hp))},[t])}function zE(t){if(!t.isAttached())return;const e=t.getTextContent(),n=t.getNextSibling(),r=t.getParent();t.getMode()!=="normal"||e.endsWith(" ")&&e.length>1||Se(n)||Be(r)||At(r)||fi(r)||(e===" "&&!wn(n)?t.setTextContent(""):ku(t))}function GE(t,e){const n=t.getParent();!fi(n)||!t.isAttached()||Nu(e,t.getKey())&&n.insertAfter(t)}function Hp(t){if(!t.isAttached())return;const e=t.getPreviousSibling();e&&!wn(e)&&!g.$isTextNode(e)&&!fi(e)&&t.insertBefore(g.$createTextNode(" "))}function KE({trigger:t,scriptureReference:e,contextMarker:n,getMarkerAction:r}){const{markersMenuItems:o}=F1({scriptureReference:e,contextMarker:n,getMarkerAction:r});return l.jsx($1,{trigger:t,items:o})}function YE({trigger:t,scrRef:e,getMarkerAction:n}){const{book:r,chapterNum:o,verseNum:s,verse:i}=e,a=w.useMemo(()=>e,[r,o,s,i]),[c]=ye(),[u]=WE(c);return JE(c),l.jsx(KE,{trigger:t,scriptureReference:a,contextMarker:u,getMarkerAction:n})}function WE(t){const[e,n]=w.useState();return w.useEffect(()=>t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(t.read(()=>{const r=g.$getSelection();if(!g.$isRangeSelection(r)){e&&n(void 0);return}const o=g.$getNodeByKey(r.anchor.key),s=g.$getNodeByKey(r.focus.key);if(!o||!s){e&&n(void 0);return}const i=dC(o,s);if(!i||!VC(i)){e&&n(void 0);return}const a=i.getMarker();e!==a&&n(a)}),!1),g.COMMAND_PRIORITY_LOW),[e,t]),[e]}function JE(t){w.useEffect(()=>{if(!t.hasNodes([Bt,qt]))throw new Error("UsjNodesMenuPlugin: VerseNode or ImmutableVerseNode not registered on editor!");const e={},n={};return vt(t.registerNodeTransform(qt,r=>zp(r,t,e)),t.registerNodeTransform(Bt,r=>zp(r,t,e)),t.registerMutationListener(qt,r=>Wp(r,t,e,n)),t.registerMutationListener(Bt,r=>Wp(r,t,e,n)))},[t])}function zp(t,e,n){g.$hasUpdateTag(uu)||Nu(e,t.getKey())&&ZE(t,n)}function Gp(t){return RegExp(/(\d+)([a-zA-Z]+)?(-(\d+)([a-zA-Z]+)?)?/).exec(t)}const Kp=2,XE=3,Yp=4,QE=5;function ZE(t,e){var n;const r=gu(t),o=r==null?void 0:r.getNumber();if(!o)return;const s=e[o];if(!s)return;let i=parseInt(t.getNumber()),a=((n=Gp(t.getNumber()))==null?void 0:n[Kp])??"";s.forEach(c=>{const u=g.$getNodeByKey(c);if(!u)return;const d=u.getNumber(),p=parseInt(d),f=Gp(d),h=!!(f!=null&&f[XE]),b=h?parseInt(f[Yp]):p;if(b<i||p>i||b===i&&a)return;const x=(f==null?void 0:f[Kp])??"",C=(f==null?void 0:f[QE])??"",E=h?wc(parseInt(f[Yp]),void 0):"";let _=`${x}`;_+=h?`-${E}${C}`:"";const S=wc(p,void 0);u.setNumber(`${S}${_}`),i=parseInt(h?E:S),a=h?C:x})}function Wp(t,e,n,r){e.getEditorState().read(()=>{for(const[o,s]of t){const i=g.$getNodeByKey(o);if(wn(i)){if(s==="created"){const a=gu(i);if(!a)continue;const c=a.getNumber();n[c]||(n[c]=[]),n[c].push(o),r[o]=c}else if(s==="destroyed"){const a=r[o],c=n[a];if(!c)continue;const u=c.findIndex(d=>d===o);if(u===-1)continue;c.splice(u,1),Reflect.deleteProperty(r,o)}}}})}const zm="formatted",ek="unformatted";let Ou;function tk(t){const e=nk(t);if(!e)throw new Error(`Invalid view mode: ${t}`);Ou=e}tk(zm);const qa=()=>Ou;function nk(t){let e;switch(t){case zm:e={markerMode:"hidden",noteMode:"collapsed",hasSpacing:!0,isFormattedFont:!0};break;case ek:e={markerMode:"editable",noteMode:"expanded",hasSpacing:!1,isFormattedFont:!1};break}return e}function rk(t){if(t)return t.markerMode==="editable"?Bt:qt}function ok(t){const e=[],n=t??Ou;return n&&(e.push(`${$_}${n.markerMode}`),n.hasSpacing&&e.push(L_),n.isFormattedFont&&e.push(P_)),e}let bc;function sk(t){t&&(bc=t)}function ik(t){return t.isEmpty()?Lh:ak(t.toJSON())}function ak(t){if(!t.root||!t.root.children)return;const e=t.root.children;if(e.length===1&&fu(e[0])&&(!e[0].children||e[0].children.length===0))return Lh;const n=Gm(e),r=yr(n);return r?{type:Us,version:Vs,content:r}:void 0}function lk(t,e){const{type:n,marker:r,unknownAttributes:o}=t;let s;return t.code!==""&&(s=t.code),wt({type:n,marker:r,code:s,...o,content:e})}function ck(t){const{marker:e,number:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t;return wt({type:jn.getType(),marker:e,number:n,sid:r,altnumber:o,pubnumber:s,...i})}function uk(t,e){const{marker:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t,a=e&&typeof e[0]=="string"?e[0]:void 0;let{number:c}=t;return c=vm(n,a,c),wt({type:jn.getType(),marker:n,number:c,sid:r,altnumber:o,pubnumber:s,...i})}function dk(t){const{marker:e,sid:n,altnumber:r,pubnumber:o,unknownAttributes:s}=t,{text:i}=t;let{number:a}=t;return a=vm(e,i,a),wt({type:Bt.getType(),marker:e,number:a,sid:n,altnumber:r,pubnumber:o,...s})}function pk(t,e){const{type:n,marker:r,unknownAttributes:o}=t,s=r===""?void 0:r;return e==null||e.forEach((i,a)=>{typeof i=="string"&&i.startsWith(Ae)&&(e[a]=i.slice(1))}),wt({type:n,marker:s,...o,content:e})}function fk(t,e){const{type:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function hk(t,e){const{type:n,marker:r,caller:o,category:s,unknownAttributes:i}=t;return wt({type:n,marker:r,caller:o,category:s,...i,content:e})}function Bo(t){const{type:e,marker:n,sid:r,eid:o,unknownAttributes:s}=t;return wt({type:e,marker:n===""?void 0:n,sid:r,eid:o,...s})}function wk(t){return t.text}function mk(t,e){const{tag:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function gk(t){const{marker:e}=t;return{type:ha,marker:e===""?void 0:e}}function Jp(t,e){const n=t[t.length-1];n&&typeof n=="string"?t[t.length-1]=n+e:t.push(e)}function bk(t,e,n,r,o){const s=er.getType(),i=e.filter(a=>!n.includes(a));if(n.filter(a=>!e.includes(a)).forEach(a=>{const c=Bo({type:s,marker:Go,eid:a});o.push(c)}),i.forEach(a=>{const c=Bo({type:s,marker:bo,sid:a});o.push(c)}),e.length===0){const a=Bo({type:s,marker:bo});o.push(a)}if(o.push(...t),e.length===0){const a=Bo({type:s,marker:Go});o.push(a)}(!r||!_C(r))&&e.forEach(a=>{const c=Bo({type:s,marker:Go,eid:a});o.push(c)})}function yr(t,e){const n=[];let r,o=[];return t.forEach((s,i)=>{const a=s,c=s,u=s,d=s,p=s,f=s,h=s,b=s;switch(s.type){case mn.getType():n.push(lk(a,yr(a.children)));break;case gr.getType():n.push(ck(s));break;case jn.getType():n.push(uk(c,yr(c.children)));break;case qt.getType():case Bt.getType():n.push(dk(s));break;case Qe.getType():n.push(pk(u,yr(u.children)));break;case Yt.getType():n.push(fk(d,yr(d.children)));break;case yt.getType():n.push(hk(p,yr(p.children,p.caller)));break;case zr.getType():case Tn.getType():case g.LineBreakNode.getType():case Do.getType():break;case Tt.getType():if(r=yr(h.children),r){const x=h.typedIDs[Sr];if(x)bk(r,x,o,t[i+1],n),o=x;else{const C=r.shift();C&&(typeof C=="string"?Jp(n,C):n.push(C)),r.length>0&&n.push(...r)}}break;case er.getType():n.push(Bo(s));break;case g.TextNode.getType():f.text&&f.text!==Ae&&!f.text.startsWith(cu)&&(!e||f.text!==vu(e))&&Jp(n,wk(f));break;case Ao.getType():n.push(mk(b,yr(b.children)));break;case Gr.getType():n.push(gk(s));break;default:bc==null||bc.error(`Unexpected node type '${s.type}'!`)}}),n&&n.length>0?n:void 0}function Gm(t){const e=t.findIndex(n=>fu(n));if(e>=0){const n=t.slice(0,e),r=t[e].children,o=Gm(t.slice(e+1));t=[...n,...r,...o]}return t}const Rl={initialize:sk,deserializeEditorState:ik},Xp=Km([]),vk={type:g.LineBreakNode.getType(),version:1};let ga=[],ve,Xi,vc,ze;function xk(t,e){ga=[],Ck(t),Ek(e)}function yk(t=0){}function _k(t,e){ve=e??qa();let n;return t?(t.type!==Us&&(ze==null||ze.warn(`This USJ type '${t.type}' didn't match the expected type '${Us}'.`)),t.version!==Vs&&(ze==null||ze.warn(`This USJ version '${t.version}' didn't match the expected version '${Vs}'.`)),t.content.length>0?n=yc(Ls(t.content)):n=[Xp]):n=[Xp],vc==null||vc(ga),{root:{children:n,direction:null,format:"",indent:0,type:"root",version:1}}}function Ck(t){t&&(Xi=t),t!=null&&t.addMissingComments&&(vc=t.addMissingComments)}function Ek(t){t&&(ze=t)}function kk(t){return!t||t.length!==1||typeof t[0]!="string"?"":t[0]}function Nk(t){let{marker:e}=t;e!==Xs&&(ze==null||ze.warn(`Unexpected book marker '${e}'!`)),e=e??Xs;const{code:n}=t;(!n||!mn.isValidBookCode(n))&&(ze==null||ze.warn(`Unexpected book code '${n}'!`));const r=[];((ve==null?void 0:ve.markerMode)==="editable"||(ve==null?void 0:ve.markerMode)==="visible")&&r.push(yo("marker",br(e)+" "+n+Ae));const o=kk(t.content);o&&r.push(Pr(o));const s=_t(t);return wt({type:mn.getType(),marker:e,code:n??"",unknownAttributes:s,children:r,direction:null,format:"",indent:0,version:em})}function Tk(t){let{marker:e}=t;e!==da&&(ze==null||ze.warn(`Unexpected chapter marker '${e}'!`)),e=e??da;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=_t(t);let a;return(ve==null?void 0:ve.markerMode)==="visible"&&(a=!0),(ve==null?void 0:ve.markerMode)==="editable"?wt({type:jn.getType(),marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,children:[Pr(wi(e,n)??"")],direction:null,format:"",indent:0,version:rm}):wt({type:gr.getType(),marker:e,number:n??"",showMarker:a,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,version:lm})}function Sk(t){let{marker:e}=t;e!==pa&&(ze==null||ze.warn(`Unexpected verse marker '${e}'!`)),e=e??pa;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=(rk(ve)??qt).getType(),a=(ve==null?void 0:ve.markerMode)==="editable"?mm:Am;let c,u;(ve==null?void 0:ve.markerMode)==="editable"?c=wi(e,n):(ve==null?void 0:ve.markerMode)==="visible"&&(u=!0);const d=_t(t);return wt({type:i,text:c,marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,showMarker:u,unknownAttributes:d,version:a})}function Ak(t,e=[]){let{marker:n}=t;Qe.isValidMarker(n)||ze==null||ze.warn(`Unexpected char marker '${n}'!`),n=n??"",(ve==null?void 0:ve.markerMode)==="editable"&&e.forEach(o=>{bu(o)&&(o.text=Ae+o.text)}),e.length===0&&e.push(Pr(Ae));const r=_t(t);return wt({type:Qe.getType(),marker:n,unknownAttributes:r,children:[...e],direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:am})}function Km(t){return{type:Lr.getType(),children:t,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:dm}}function Dk(t,e=[]){let{marker:n}=t;Yt.isValidMarker(n)||ze==null||ze.warn(`Unexpected para marker '${n}'!`),n=n??Fa;const r=[];(ve==null?void 0:ve.markerMode)==="editable"?r.push(as(n),Pr(Ae)):(ve==null?void 0:ve.markerMode)==="visible"&&r.push(yo("marker",br(n)+Ae)),r.push(...e);const o=_t(t);return wt({type:Yt.getType(),marker:n,unknownAttributes:o,children:r,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:wm})}function Mk(t,e){const n=wC(e);let r=()=>{};return Xi!=null&&Xi.noteCallerOnClick&&(r=Xi.noteCallerOnClick),wt({type:Tn.getType(),caller:t,previewText:n,onClick:r,version:Pm})}function Rk(t,e){let{marker:n}=t;yt.isValidMarker(n)||ze==null||ze.warn(`Unexpected note marker '${n}'!`),n=n??hu;const{category:r}=t,o=t.caller??"*",s=(ve==null?void 0:ve.noteMode)!=="expanded",i=_t(t);let a,c;(ve==null?void 0:ve.markerMode)==="editable"?(a=as(n),c=as(n,"closing")):(ve==null?void 0:ve.markerMode)==="visible"&&(a=yo("marker",br(n)+Ae),c=yo("marker",os(n)+Ae));const u=[];let d;if(a&&u.push(a),(ve==null?void 0:ve.markerMode)==="editable")d=Pr(vu(o)),u.push(d,...e);else{const p=Pr(Ae);d=Mk(o,e),u.push(d,p,...e.flatMap(Ok(p)))}return c&&u.push(c),wt({type:yt.getType(),marker:n,caller:o,isCollapsed:s,category:r,unknownAttributes:i,children:u,direction:null,format:"",indent:0,version:hm})}function Ok(t){return e=>NC(e)?[e]:[e,t]}function jk(t){let{marker:e}=t;(!e||!er.isValidMarker(e))&&(ze==null||ze.warn(`Unexpected milestone marker '${e}'!`)),e=e??"";const{sid:n,eid:r}=t,o=_t(t);return wt({type:er.getType(),marker:e,sid:n,eid:r,unknownAttributes:o,version:pm})}function Qp(t,e=[]){return{type:Tt.getType(),typedIDs:{[Sr]:e},children:t,direction:null,format:"",indent:0,version:1}}function Ik(t,e){const{marker:n}=t,r=t.type,o=_t(t),s=[...e];return s.forEach(i=>{bu(i)&&(i.mode="token")}),wt({type:Ao.getType(),tag:r,marker:n,unknownAttributes:o,children:s,direction:null,format:"",indent:0,version:Qw})}function Lk(t){return{type:Gr.getType(),marker:t,version:km}}function as(t,e="opening"){return{type:Do.getType(),marker:t,markerSyntax:e,text:"",detail:0,format:0,mode:"normal",style:"",version:1}}function Pr(t,e="normal"){return{type:g.TextNode.getType(),text:t,detail:0,format:0,mode:e,style:"",version:1}}function yo(t,e){return{type:zr.getType(),text:e,textType:t,version:Em}}function Zp(t,e){(ve==null?void 0:ve.markerMode)==="editable"?e.push(as(t)):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(yo("marker",br(t)))}function ef(t,e,n=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((ve==null?void 0:ve.markerMode)==="editable"?n?e.push(as("","selfClosing")):e.push(as(t,"closing")):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(yo("marker",os(n?"":t))))}function Pk(t,e){if(t.type!=="ms")return;const n=[];if(t.sid&&n.push(`sid="${t.sid}"`),t.eid&&n.push(`eid="${t.eid}"`),n.length<=0)return;const r=cu+n.join(" ");(ve==null?void 0:ve.markerMode)==="editable"?e.push(Pr(r)):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(yo("attribute",r))}function tf(t,e){return t.length<=0||e===0?t:t.map(n=>n-e)}function $k(t,e){const n=t.indexOf(e,0);n>-1&&t.splice(n,1)}function nf(t,e){e.marker===bo&&e.sid!==void 0&&t.push(e.sid),e.marker===Go&&e.eid!==void 0&&$k(t,e.eid)}function xc(t,e,n=!1,r=[]){if(e.length<=0||e[0]>=t.length)return t;const o=e.shift(),s=e.length>0?e.shift():t.length-1;if(o===void 0||s===void 0||s>=t.length||t.length<=0)return t;const i=t.slice(0,o),a=n?[Qp(i,[...r])]:i,c=t[o];nf(r,c);const u=xc(t.slice(o+1,s),tf(e,o+1),c.marker===bo,r),d=Qp(u,[...r]),p=t[s];nf(r,p);const f=xc(t.slice(s+1),tf(e,s+1),p.marker===bo,r);return[...a,d,...f]}function Ls(t){const e=[],n=[];return t==null||t.forEach(r=>{if(typeof r=="string")r&&n.push(Pr(r));else if(!r.type)ze==null||ze.error("Marker type is missing!");else switch(r.type){case mn.getType():n.push(Nk(r));break;case jn.getType():n.push(Tk(r));break;case Bt.getType():ve!=null&&ve.hasSpacing||n.push(vk),n.push(Sk(r));break;case Qe.getType():Zp(r.marker??"",n),n.push(Ak(r,Ls(r.content))),ef(r.marker??"",n);break;case Yt.getType():n.push(Dk(r,Ls(r.content)));break;case yt.getType():n.push(Rk(r,Ls(r.content)));break;case er.getType():J_(r.marker??"")&&(e.push(n.length),r.sid!==void 0&&(ga==null||ga.push(r.sid))),n.push(jk(r)),Zp(r.marker??"",n),Pk(r,n),ef(r.marker??"",n,!0);break;case Gr.getType():n.push(Lk(r.marker??""));break;default:ze==null||ze.warn(`Unknown type-marker '${r.type}-${r.marker}'!`),n.push(Ik(r,Ls(r.content)))}}),xc(n,e)}function yc(t){const e=t.findIndex(n=>I_(n)||oC(n)||nC(n));if(e>=0){const n=yc(t.slice(0,e)),r=t[e],o=yc(t.slice(e+1));return[...n,r,...o]}else if(t.some(n=>"text"in n&&"mode"in n||IC(n)))return[Km(t)];return t}const _c={initialize:xk,reset:yk,serializeEditorState:_k},Hi=t=>{if(!yt.isValidMarker(t)||!t.includes("f"))throw new Error(`Invalid footnote marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"fr",content:[`${n}:${r}`]}),e.noteText&&o.push({type:"char",marker:"fq",content:[e.noteText]}),o.push({type:"char",marker:"ft"}),[{type:"note",marker:t,caller:Ir,content:o}]}}},rf=t=>{if(!yt.isValidMarker(t)||!t.includes("x"))throw new Error(`Invalid cross-reference marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"xo",content:[`${n}:${r}`]}),o.push({type:"char",marker:"xt"}),[{type:"note",marker:t,caller:Qs,content:o}]}}},Fk={c:{action:t=>{const{chapterNum:e}=t.reference;return[{type:"chapter",marker:"c",number:`${e+1}`}]}},v:{action:t=>{const{verseNum:e,verse:n}=t.reference;return[{type:"verse",marker:"v",number:`${wc(e,n)}`}]}},f:Hi("f"),fe:Hi("fe"),ef:Hi("ef"),efe:Hi("efe"),x:rf("x"),ex:rf("ex")};function Bk(t,e,n,r,o){const s=qk(t);return{action:i=>{i.editor.update(()=>{var a;const c=g.$getSelection();g.$isRangeSelection(c)&&(i.noteText=c.getTextContent());const u=(a=s==null?void 0:s.action)==null?void 0:a.call(s,i);if(!u)return;const d=Mp(u,_c,r),p=Tl(d);if(g.$isRangeSelection(c)){const f=c.anchor.getNode();if(Se(p))Dm(p,c,r),p.getIsCollapsed()||(e.current=p.getKey());else if(c.getTextContent().length>0)Uk(c,()=>Tl(d));else if(g.$isElementNode(p)&&!p.isInline()){const h=c.insertParagraph();if(h){const b=h.getChildren();p.append(...b),h.replace(p),p.selectStart()}}else if(g.$isTextNode(f)&&!mi(f)&&Se(f.getParent())&&c.isCollapsed()){let h=f.insertAfter(p);if(fa(p)){const b={...r||qa(),markerMode:"hidden"},x=Mp(u,_c,b),C=Tl(x);h=h.insertAfter(C)}h.insertAfter(g.$createTextNode(Ae))}else{c.insertNodes([p]),Kk(p);const h=p.getNextSibling();h?h.selectStart():p.selectStart()}}else c==null||c.insertNodes([p])},o)},label:s==null?void 0:s.label}}function qk(t){let e=Fk[t];return e||(Yt.isValidMarker(t)?e={action:()=>[{type:Yt.getType(),marker:t,content:[]}]}:Qe.isValidMarker(t)&&(e={action:()=>[{type:Qe.getType(),marker:t}]})),e}function Uk(t,e){const n=t.getNodes(),[r,o]=Vk(t);let s;n.forEach((i,a)=>{if(g.$isElementNode(s)&&s.isParentOf(i))return;const c=Hk(i,a===0,a===n.length-1,r,o);if(!c){s=void 0;return}s||(s=e(),c.insertBefore(s)),Gk(c,s)}),(g.$isTextNode(s)||g.$isElementNode(s))&&s.selectEnd()}function Vk(t){const e=t.anchor.offset,n=t.focus.offset;return t.isBackward()?[n,e]:[e,n]}function Hk(t,e,n,r,o){if(!(At(t)||Se(t)||Se(t.getParent()))){if(g.$isTextNode(t))return zk(t,e,n,r,o);if(g.$isElementNode(t)&&t.isInline())return t}}function zk(t,e,n,r,o){const s=t.getTextContentSize(),i=e?r:0,a=n?o:s;if(i===0&&a===0)return;const c=t.splitText(i,a);return c.length===1?c[0]:c.length===3||a===s?c[1]:c[0]}function Gk(t,e){var n;if(g.$isTextNode(e)){const r=of(t,e);e.setTextContent(r),t.remove()}else if(g.$isElementNode(e)){const r=e.getChildrenSize();e.append(t);for(let o=0;o<r;o++)(n=e.getFirstChild())==null||n.remove();of(t,e)}}function of(t,e){let n=t.getTextContent();if(g.$isTextNode(t)&&e.isInline()&&n.startsWith(" ")){n=n.trimStart(),t.setTextContent(n);const r=e.getPreviousSibling();ku(r),g.$isTextNode(r)||e.insertBefore(g.$createTextNode(" "))}return n}function Kk(t){wn(t)&&(ku(t.getPreviousSibling()),Om(t.getNextSibling()))}const Ym={chapter:"chapter",verse:"verse",char:"char",para:"para",typedMark:"editor-typed-mark",typedMarkOverlap:"editor-typed-markOverlap",mark:"editor-mark",markOverlap:"editor-markOverlap",placeholder:"editor-placeholder",paragraph:"editor-paragraph",quote:"editor-quote",heading:{h1:"editor-heading-h1",h2:"editor-heading-h2",h3:"editor-heading-h3",h4:"editor-heading-h4",h5:"editor-heading-h5"},list:{nested:{listitem:"editor-nested-listitem"},ol:"editor-list-ol",ul:"editor-list-ul",listitem:"editor-listitem"},image:"editor-image",link:"editor-link",text:{bold:"editor-text-bold",italic:"editor-text-italic",overflowed:"editor-text-overflowed",hashtag:"editor-text-hashtag",underline:"editor-text-underline",strikethrough:"editor-text-strikethrough",underlineStrikethrough:"editor-text-underlineStrikethrough"}};function Yk({options:t,editedUsjRef:e,usj:n,setUsj:r}){const{view:o,nodes:s}=t||{},{hasSpacing:i,isFormattedFont:a,markerMode:c}=o||{};return w.useEffect(()=>{e.current&&!ir(e.current,n)&&r(e.current)},[e,i,a,c,s,r,n]),null}function Wk({scrRef:t,onScrRefChange:e}){const[n]=ye(),r=w.useRef(!1),o=w.useRef(!1),{book:s,chapterNum:i,verseNum:a}=t;return w.useEffect(()=>n.registerMutationListener(mn,c=>{n.update(()=>{for(const[u,d]of c){const p=g.$getNodeByKey(u);p&&Qn(p)&&d==="created"&&sf(i,a,o)}},{tag:pc})},{skipInitialization:!0}),[n,i,a]),w.useEffect(()=>{r.current?r.current=!1:n.update(()=>sf(i,a,o),{tag:pc})},[n,i,a]),w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(o.current?o.current=!1:Jk(s,i,a,e,r),!1),g.COMMAND_PRIORITY_LOW),[n,s,i,a,e]),null}function sf(t,e,n){var r;const o=ym(g.$getSelection()),s=(r=Rm(o))==null?void 0:r.getNumber();if(gC(s)&&yu(e,s))return;const i=g.$getRoot().getChildren(),a=sC(i,t),c=hC(i,a),u=iC(c,!!a);if(u&&!a||!a)return;fC(c,u);const d=UC(c,e);if(d){if(jt(d)){const p=d.getFirstChild();g.$isTextNode(p)?p.select(0,0):d.select(0,0)}else d.selectNext(0,0);n.current=!0}}function Jk(t,e,n,r,o){const s=ym(g.$getSelection());if(!s)return;const i=gu(s),a=parseInt((i==null?void 0:i.getNumber())??"1",10),c=Rm(s),u=c==null?void 0:c.getNumber(),d=parseInt(u??"0",10),p=u?yu(n,u):n===d;if(o.current=!!(i&&a!==e||!p),o.current){const f={book:t,chapterNum:a,verseNum:d};u!=null&&d.toString()!==u&&(f.verse=u),r(f)}}function Xk(t){return Qn(t)?`${t.__code}`:du(t)?`${t.__marker} "${t.__number}"`:Be(t)?`${t.__marker}`:hi(t)?`${t.__marker} "${t.__number}"`:Kr(t)?`${t.__caller}`:xs(t)?`${t.__marker} "${t.__number}"`:Se(t)?`${t.__marker} "${t.__caller}"`+(t.__isCollapsed?" (collapsed)":" (expanded)"):jt(t)?`${t.__marker}`:At(t)?`ids: [ ${JSON.stringify(t.getTypedIDs())} ]`:mu(t)?`${t.__marker} "${t.__number}"`:""}function Qk(){const[t]=ye();return l.jsx(Sx,{viewClassName:"tree-view-output",treeTypeButtonClassName:"debug-treetype-button",timeTravelPanelClassName:"debug-timetravel-panel",timeTravelButtonClassName:"debug-timetravel-button",timeTravelPanelSliderClassName:"debug-timetravel-panel-slider",timeTravelPanelButtonClassName:"debug-timetravel-panel-button",customPrintNode:Xk,editor:t})}const Wm=w.createContext(null),af=4;function Zk({children:t,className:e,onClick:n,title:r}){const o=w.useRef(null),s=w.useContext(Wm);if(s===null)throw new Error("DropDownItem must be used within a DropDown");const{registerItem:i}=s;return w.useEffect(()=>{o&&o.current&&i(o)},[o,i]),l.jsx("button",{className:e,onClick:n,ref:o,title:r,type:"button",children:t})}function eN({children:t,dropDownRef:e,onClose:n}){const[r,o]=w.useState(),[s,i]=w.useState(),a=w.useCallback(d=>{o(p=>p?[...p,d]:[d])},[o]),c=d=>{if(!r)return;const p=d.key;["Escape","ArrowUp","ArrowDown","Tab"].includes(p)&&d.preventDefault(),p==="Escape"||p==="Tab"?n():p==="ArrowUp"?i(f=>{if(!f)return r[0];const h=r.indexOf(f)-1;return r[h===-1?r.length-1:h]}):p==="ArrowDown"&&i(f=>f?r[r.indexOf(f)+1]:r[0])},u=w.useMemo(()=>({registerItem:a}),[a]);return w.useEffect(()=>{r&&!s&&i(r[0]),s&&s.current&&s.current.focus()},[r,s]),l.jsx(Wm.Provider,{value:u,children:l.jsx("div",{className:"dropdown",ref:e,onKeyDown:c,children:t})})}function tN({disabled:t=!1,buttonLabel:e,buttonAriaLabel:n,buttonClassName:r,buttonIconClassName:o,children:s,stopCloseOnClickSelf:i}){const a=w.useRef(null),c=w.useRef(null),[u,d]=w.useState(!1),p=()=>{d(!1),c&&c.current&&c.current.focus()};return w.useEffect(()=>{const f=c.current,h=a.current;if(u&&f!==null&&h!==null){const{top:b,left:x}=f.getBoundingClientRect();h.style.top=`${b+f.offsetHeight+af}px`,h.style.left=`${Math.min(x,window.innerWidth-h.offsetWidth-20)}px`}},[a,c,u]),w.useEffect(()=>{const f=c.current;if(f!==null&&u){const h=b=>{const x=b.target;i&&a.current&&a.current.contains(x)||f.contains(x)||d(!1)};return document.addEventListener("click",h),()=>{document.removeEventListener("click",h)}}return()=>{}},[a,c,u,i]),w.useEffect(()=>{const f=()=>{if(u){const h=c.current,b=a.current;if(h!==null&&b!==null){const{top:x}=h.getBoundingClientRect(),C=x+h.offsetHeight+af;C!==b.getBoundingClientRect().top&&(b.style.top=`${C}px`)}}};return document.addEventListener("scroll",f),()=>{document.removeEventListener("scroll",f)}},[c,a,u]),l.jsxs(l.Fragment,{children:[l.jsxs("button",{type:"button",disabled:t,"aria-label":n||e,className:r,onClick:()=>d(!u),ref:c,children:[o&&l.jsx("span",{className:o}),e&&l.jsx("span",{className:"text dropdown-button-text",children:e}),l.jsx("i",{className:"chevron-down"})]}),u&&fn.createPortal(l.jsx(eN,{dropDownRef:a,onClose:p,children:s}),document.body)]})}const Cc={m:"m - Paragraph - Margin - No First Line Indent",ms:"ms - Heading - Major Section Level 1",nb:"nb - Paragraph - No Break with Previous Paragraph",p:"p - Paragraph - Normal - First Line Indent",pi:"pi - Paragraph - Indented - Level 1 - First Line Indent",q1:"q1 - Poetry - Indent Level 1",q2:"q2 - Poetry - Indent Level 2",r:"r - Heading - Parallel References",s:"s - Heading - Section Level 1"},Ec={...Cc,ide:"ide - File - Encoding",h:"h - File - Header",h1:"h1 - File - Header",h2:"h2 - File - Left Header",h3:"h3 - File - Right Header",toc1:"toc1 - File - Long Table of Contents Text",toc2:"toc2 - File - Short Table of Contents Text",toc3:"toc3 - File - Book Abbreviation",cl:"cl - Chapter - Publishing Label",mt:"mt - Title - Major Title Level 1",mt1:"mt1 - Title - Major Title Level 1",mt2:"mt2 - Title - Major Title Level 2",mt3:"mt3 - Title - Major Title Level 3",mt4:"mt4 - Title - Major Title Level 4",ms1:"ms1 - Heading - Major Section Level 1",ms2:"ms2 - Heading - Major Section Level 2",ms3:"ms3 - Heading - Major Section Level 3",b:"b - Poetry - Stanza Break (Blank Line)"};function nN({editorRef:t,blockMarker:e,disabled:n=!1}){return l.jsx(tN,{disabled:n,buttonClassName:"toolbar-item block-controls",buttonIconClassName:"icon block-marker "+rN(e),buttonLabel:oN(e),buttonAriaLabel:"Formatting options for block type",children:Object.keys(Cc).map(r=>l.jsxs(Zk,{className:"item block-marker "+sN(e===r),onClick:()=>{var o;return(o=t.current)==null?void 0:o.formatPara(r)},children:[l.jsx("i",{className:"icon block-marker "+r}),l.jsx("span",{className:"text usfm_"+r,children:Cc[r]})]},r))})}function rN(t){return t&&t in Ec?t:"ban"}function oN(t){return t&&t in Ec?Ec[t]:"No Style"}function sN(t){return t?"active dropdown-item-active":""}function lf(){return l.jsx("div",{className:"divider"})}const iN=w.forwardRef(function({editorRef:t,isReadonly:e=!1,onStateChange:n},r){const[o]=ye(),[s,i]=w.useState(o),[a,c]=w.useState(),[u,d]=w.useState(!1),[p,f]=w.useState(!1),h=w.useCallback((b,x,C)=>{d(b),f(x),c(C),n==null||n(b,x,C)},[n]);return w.useEffect(()=>o.registerCommand(g.SELECTION_CHANGE_COMMAND,(b,x)=>(i(x),!1),g.COMMAND_PRIORITY_CRITICAL),[o]),l.jsxs(l.Fragment,{children:[l.jsx(Hm,{onStateChange:h}),l.jsxs("div",{className:"toolbar",children:[l.jsx("button",{disabled:!u||e,onClick:()=>{s.dispatchCommand(g.UNDO_COMMAND,void 0)},title:Hl?"Undo (⌘Z)":"Undo (Ctrl+Z)",type:"button",className:"toolbar-item spaced","aria-label":"Undo",children:l.jsx("i",{className:"format undo"})}),l.jsx("button",{disabled:!p||e,onClick:()=>{s.dispatchCommand(g.REDO_COMMAND,void 0)},title:Hl?"Redo (⌘Y)":"Redo (Ctrl+Y)",type:"button",className:"toolbar-item","aria-label":"Redo",children:l.jsx("i",{className:"format redo"})}),l.jsx(lf,{}),s===o&&l.jsxs(l.Fragment,{children:[l.jsx(nN,{editorRef:t,blockMarker:a,disabled:e}),l.jsx(lf,{})]}),l.jsx("div",{ref:r,className:"end-container"})]})]})}),cf={namespace:"platformEditor",theme:Ym,editable:!0,editorState:void 0,onError(t){throw t},nodes:[Tt,...y1]},aN=qa(),lN={},cN={};function uN(){return l.jsx("div",{className:"editor-placeholder",children:"Enter some Scripture..."})}const Jm=w.forwardRef(function({defaultUsj:t,scrRef:e,onScrRefChange:n,onSelectionChange:r,onUsjChange:o,onStateChange:s,options:i,logger:a,children:c},u){const d=w.useRef(null),p=w.useRef(null),f=w.useRef(null),h=w.useRef(t),b=w.useRef(),[x,C]=w.useState(t),[E,_]=w.useState(0),{isReadonly:S=!1,hasExternalUI:j=!1,hasSpellCheck:P=!1,textDirection:O="ltr",markerMenuTrigger:F="\\",view:q=aN,nodes:B=lN,debug:W=!1}=i??cN;cf.editable=!S,Rl.initialize(a),w.useImperativeHandle(u,()=>({focus(){var M;(M=d.current)==null||M.focus()},undo(){var M;(M=d.current)==null||M.dispatchCommand(g.UNDO_COMMAND,void 0)},redo(){var M;(M=d.current)==null||M.dispatchCommand(g.REDO_COMMAND,void 0)},cut(){var M;(M=d.current)==null||M.dispatchCommand(g.CUT_COMMAND,null)},copy(){var M;(M=d.current)==null||M.dispatchCommand(g.COPY_COMMAND,null)},paste(){d.current&&Mu(d.current)},pastePlainText(){d.current&&Ru(d.current)},getUsj(){return h.current},setUsj(M){if(!ir(h.current,M)){h.current=M;const T=ir(x,M);C(M),T&&_(L=>L+1)}},applyUpdate(M,T="remote"){var L,A;(L=d.current)==null||L.update(()=>{T==="remote"&&g.$addUpdateTag(hc),H1(M,q,B,a)},{discrete:!0});const D=(A=d.current)==null?void 0:A.getEditorState();if(!D)return;const $=Rl.deserializeEditorState(D);if($){const z=!ir(h.current,$);if(z&&(h.current=$),z||!ir(x,$)){const U=Pp(M,D);o==null||o($,M,T,U)}}},replaceEmbedUpdate(M,T){var L;const A=(L=d.current)==null?void 0:L.read(()=>XC(M,T));A&&this.applyUpdate(A)},getSelection(){var M;return(M=d.current)==null?void 0:M.read(Tm)},setSelection(M){var T;(T=d.current)==null||T.update(()=>{const L=Cu(M);L!==void 0&&g.$setSelection(L)},{tag:nm})},addAnnotation(M,T,L){var A;(A=p.current)==null||A.addAnnotation(M,Ap(T),L)},removeAnnotation(M,T){var L;(L=p.current)==null||L.removeAnnotation(Ap(M),T)},formatPara(M){var T;(T=d.current)==null||T.update(()=>{const L=g.$getSelection();g.$isRangeSelection(L)&&_0(L,()=>Zs(M))})},getElementByKey(M){var T;return(T=d.current)==null?void 0:T.read(()=>{var L;return((L=d.current)==null?void 0:L.getElementByKey(M))??void 0})},insertNote(M,T,L){var A;(A=d.current)==null||A.update(()=>{const D=LC(M,T,L,e,q,B,a);D&&!D.getIsCollapsed()&&(b.current=D.getKey())})},selectNote(M){var T;(T=d.current)==null||T.update(()=>{const L=Ip(M);L&&($C(L,q),L.getIsCollapsed()||(b.current=L.getKey()))})},getNoteOps(M){var T;return(T=d.current)==null?void 0:T.read(()=>{const L=Ip(M);if(L)return Tu(L)})},get toolbarEndRef(){return f}}));const N=w.useCallback((M,T,L,A)=>{if(F_.some($=>L.has($)))return;const D=Rl.deserializeEditorState(M);if(D){const $=!ir(h.current,D);if($&&(h.current=D),$||!ir(x,D)){const z=L.has(hc)?"remote":"local",U=Pp(A,M);o==null||o(D,A,z,U)}}},[x,o]);return l.jsxs(Mc,{initialConfig:cf,children:[l.jsx(_E,{isEditable:!S}),l.jsxs("div",{className:"editor-container",children:[j?l.jsx(Hm,{onStateChange:s}):l.jsx("div",{className:"editor-toolbar-container"+(S?"-readonly":"-editable"),children:l.jsx(iN,{ref:f,editorRef:u,isReadonly:S,onStateChange:s})}),l.jsxs("div",{className:"editor-inner",children:[l.jsx(Jh,{editorRef:d}),l.jsx(eh,{contentEditable:l.jsx(Lc,{className:`editor-input usfm ${ok(q).join(" ")}`,spellCheck:P}),placeholder:l.jsx(uN,{}),ErrorBoundary:jc}),l.jsx(Xh,{}),e&&n&&l.jsx(Wk,{scrRef:e,onScrRefChange:n}),e&&l.jsx(YE,{trigger:F,scrRef:e,getMarkerAction:(M,T)=>Bk(M,b,T,q)}),l.jsx(Yk,{options:{view:q,nodes:B},editedUsjRef:h,usj:x,setUsj:C}),l.jsx(CE,{scripture:x,nodeOptions:B,editorAdaptor:_c,viewOptions:q,logger:a},E),l.jsx(LE,{onChange:r}),l.jsx(U1,{onChange:N,ignoreSelectionChange:!0,ignoreHistoryMergeTagChange:!0}),l.jsx(q1,{ref:p,logger:a}),l.jsx(iE,{viewOptions:q}),l.jsx(pE,{}),l.jsx(mE,{}),l.jsx(gE,{logger:a}),l.jsx(yE,{}),l.jsx(EE,{expandedNoteKeyRef:b,nodeOptions:B,viewOptions:q,logger:a}),l.jsx(PE,{}),l.jsx(BE,{textDirection:O}),l.jsx(VE,{}),c]}),W&&l.jsx(Qk,{})]})]})}),dN=w.forwardRef(function(t,e){const{children:n,...r}=t;return l.jsx(Jm,{ref:e,...r})});function Xm(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)}function ba(t,e,n,r,o){return{author:e,content:t,deleted:o===void 0?!1:o,id:n===void 0?Xm():n,timeStamp:r===void 0?performance.timeOrigin+performance.now():r,type:"comment"}}function Qm(t,e,n){return{comments:e,id:n===void 0?Xm():n,quote:t,type:"thread"}}function uf(t){return{comments:Array.from(t.comments),id:t.id,quote:t.quote,type:"thread"}}function pN(t){return{author:t.author,content:"[Deleted Comment]",deleted:!0,id:t.id,timeStamp:t.timeStamp,type:"comment"}}function Ol(t){const e=t._changeListeners;for(const n of e)n()}class fN{constructor(e,n){de(this,"_editor"),de(this,"_comments"),de(this,"_changeListeners"),de(this,"_collabProvider"),de(this,"logger"),this._comments=[],this._editor=e,this.logger=n,this._collabProvider=null,this._changeListeners=new Set}isCollaborative(){return this._collabProvider!==null}getComments(){return this._comments}setComments(e){this._comments=e,Ol(this)}addComment(e,n,r){const o=Array.from(this._comments),s=this._getCollabComments();if(n!==void 0&&e.type==="comment")for(let i=0;i<o.length;i++){const a=o[i];if(a.type==="thread"&&a.id===n.id){const c=uf(a);o.splice(i,1,c);const u=r!==void 0?r:c.comments.length;if(this.isCollaborative()&&s!==null){const d=s.get(i).get("comments");this._withRemoteTransaction(()=>{const p=this._createCollabSharedMap(e);d.insert(u,[p])})}c.comments.splice(u,0,e);break}}else{const i=r!==void 0?r:o.length;this.isCollaborative()&&s!==null&&this._withRemoteTransaction(()=>{const a=this._createCollabSharedMap(e);s.insert(i,[a])}),o.splice(i,0,e)}this._comments=o,Ol(this)}deleteCommentOrThread(e,n){const r=Array.from(this._comments),o=this._getCollabComments();let s=null;if(n!==void 0)for(let i=0;i<r.length;i++){const a=r[i];if(a.type==="thread"&&a.id===n.id){const c=uf(a);r.splice(i,1,c);const u=c.comments;if(s=u.indexOf(e),this.isCollaborative()&&o!==null){const d=o.get(i).get("comments"),p=s;this._withRemoteTransaction(()=>{d.delete(p)})}u.splice(s,1);break}}else s=r.indexOf(e),this.isCollaborative()&&o!==null&&this._withRemoteTransaction(()=>{o.delete(s)}),r.splice(s,1);return this._comments=r,Ol(this),e.type==="comment"?{index:s,markedComment:pN(e)}:null}registerOnChange(e){const n=this._changeListeners;return n.add(e),()=>{n.delete(e)}}_withRemoteTransaction(e){const n=this._collabProvider;n!==null&&n.doc.transact(e,this)}_withLocalTransaction(e){const n=this._collabProvider;try{this._collabProvider=null,e()}finally{this._collabProvider=n}}_getCollabComments(){const e=this._collabProvider;return e!==null?e.doc.get("comments",ao):null}_createCollabSharedMap(e){const n=new ts,r=e.type,o=e.id;if(n.set("type",r),n.set("id",o),r==="comment")n.set("author",e.author),n.set("content",e.content),n.set("deleted",e.deleted),n.set("timeStamp",e.timeStamp);else{n.set("quote",e.quote);const s=new ao;e.comments.forEach((i,a)=>{const c=this._createCollabSharedMap(i);s.insert(a,[c])}),n.set("comments",s)}return n}registerCollaboration(e){this._collabProvider=e;const n=this._getCollabComments(),r=()=>{e.connect()},o=()=>{try{e.disconnect()}catch{}},s=this._editor.registerCommand(D_,a=>{var c,u;return r!==void 0&&o!==void 0&&(a?((c=this.logger)==null||c.info("Comments connected!"),r()):((u=this.logger)==null||u.info("Comments disconnected!"),o())),!1},g.COMMAND_PRIORITY_LOW),i=(a,c)=>{if(c.origin!==this){for(const u of a)if(u instanceof Vw){const d=u.target,p=u.delta;let f=0;for(const h of p){const b=h.insert,x=h.retain,C=h.delete,E=d.parent,_=d===n?void 0:E instanceof ts&&this._comments.find(S=>S.id===E.get("id"));if(Array.isArray(b)){const S=f;b.slice().reverse().forEach(j=>{const P=j.get("id"),O=j.get("type")==="thread"?Qm(j.get("quote"),j.get("comments").toArray().map(F=>ba(F.get("content"),F.get("author"),F.get("id"),F.get("timeStamp"),F.get("deleted"))),P):ba(j.get("content"),j.get("author"),P,j.get("timeStamp"),j.get("deleted"));this._withLocalTransaction(()=>{this.addComment(O,_,S)})})}else if(typeof x=="number")f+=x;else if(typeof C=="number")for(let S=0;S<C;S++){const j=_===void 0||_===!1?this._comments[f]:_.comments[f];this._withLocalTransaction(()=>{this.deleteCommentOrThread(j,_)}),f++}}}}};return n===null?()=>null:(n.observeDeep(i),r(),()=>{n.unobserveDeep(i),s(),this._collabProvider=null})}}function hN(t){const[e,n]=w.useState(t.getComments());return w.useEffect(()=>t.registerOnChange(()=>{n(t.getComments())}),[t]),e}function wN({onClose:t,children:e,title:n,closeOnClickOutside:r}){const o=w.useRef(null);return w.useEffect(()=>{o.current!==null&&o.current.focus()},[]),w.useEffect(()=>{let s=null;const i=u=>{u.key==="Escape"&&t()},a=u=>{const d=u.target;o.current!==null&&!o.current.contains(d)&&r&&t()},c=o.current;return c!==null&&(s=c.parentElement,s!==null&&s.addEventListener("click",a)),window.addEventListener("keydown",i),()=>{window.removeEventListener("keydown",i),s!==null&&(s==null||s.removeEventListener("click",a))}},[r,t]),l.jsx("div",{className:"Modal__overlay",role:"dialog",children:l.jsxs("div",{className:"Modal__modal",tabIndex:-1,ref:o,children:[l.jsx("h2",{className:"Modal__title",children:n}),l.jsx("button",{className:"Modal__closeButton","aria-label":"Close modal",type:"button",onClick:t,children:"X"}),l.jsx("div",{className:"Modal__content",children:e})]})})}function mN({onClose:t,children:e,title:n,closeOnClickOutside:r=!1}){return fn.createPortal(l.jsx(wN,{onClose:t,title:n,closeOnClickOutside:r,children:e}),document.body)}function Zm(){const[t,e]=w.useState(null),n=w.useCallback(()=>{e(null)},[]),r=w.useMemo(()=>{if(t===null)return null;const{title:s,content:i,closeOnClickOutside:a}=t;return l.jsx(mN,{onClose:n,title:s,closeOnClickOutside:a,children:i})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}const gN={...Ym,paragraph:"CommentEditorTheme__paragraph"};function bN(...t){return t.filter(Boolean).join(" ")}function $r({"data-test-id":t,children:e,className:n,onClick:r,disabled:o,small:s,title:i}){return l.jsx("button",{disabled:o,className:bN("Button__root",o&&"Button__disabled",s&&"Button__small",n),onClick:r,title:i,"aria-label":i,...t&&{"data-test-id":t},children:e})}function vN({className:t}){return l.jsx(Lc,{className:t||"ContentEditable__root"})}function xN({children:t,className:e}){return l.jsx("div",{className:e||"Placeholder__root",children:t})}const df=g.createCommand("INSERT_INLINE_COMMAND");function yN({anchorKey:t,editor:e,showComments:n,onAddComment:r}){const o=w.useRef(null),s=w.useCallback(()=>{const i=o.current,a=e.getRootElement(),c=e.getElementByKey(t);if(i!==null&&a!==null&&c!==null){const{right:u}=a.getBoundingClientRect(),{top:d}=c.getBoundingClientRect();i.style.left=`${u-20}px`,i.style.top=`${d-30}px`}},[t,e]);return w.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[e,s]),w.useLayoutEffect(()=>{s()},[t,e,n,s]),l.jsx("div",{className:"CommentPlugin_AddCommentBox",ref:o,children:l.jsx("button",{className:"CommentPlugin_AddCommentBox_button",onClick:r,children:l.jsx("i",{className:"icon add-comment"})})})}function _N({onEscape:t}){const[e]=ye();return w.useEffect(()=>e.registerCommand(g.KEY_ESCAPE_COMMAND,n=>t(n),g.COMMAND_PRIORITY_NORMAL),[e,t]),null}function eg({className:t,autoFocus:e,onEscape:n,onChange:r,editorRef:o,placeholder:s="Type a comment..."}){return l.jsx(Mc,{initialConfig:{namespace:"Commenting",nodes:[],onError:i=>{throw i},theme:gN},children:l.jsxs("div",{className:"CommentPlugin_CommentInputBox_EditorContainer",children:[l.jsx(Fy,{contentEditable:l.jsx(vN,{className:t}),placeholder:l.jsx(xN,{children:s}),ErrorBoundary:jc}),l.jsx(Hf,{onChange:r}),l.jsx(Xh,{}),e!==!1&&l.jsx(th,{}),l.jsx(_N,{onEscape:n}),l.jsx(nh,{}),o!==void 0&&l.jsx(Jh,{editorRef:o})]})})}function tg(t,e){return w.useCallback((n,r)=>{n.read(()=>{t(Gf()),e(!Kf(r.isComposing(),!0))})},[e,t])}function CN({editor:t,cancelAddComment:e,submitAddComment:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=w.useMemo(()=>({container:document.createElement("div"),elements:[]}),[]),u=w.useRef(null),d=rg(),p=w.useCallback(()=>{t.getEditorState().read(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){u.current=x.clone();const C=x.anchor,E=x.focus,_=b0(t,C.getNode(),C.offset,E.getNode(),E.offset),S=a.current;if(_!==null&&S!==null){const{left:j,bottom:P,width:O}=_.getBoundingClientRect(),F=v0(t,_);let q=F.length===1?j+O/2-125:j-125;q<10&&(q=10),S.style.left=`${q}px`,S.style.top=`${P+20+(window.pageYOffset||document.documentElement.scrollTop)}px`;const B=F.length,{container:W}=c,N=c.elements,M=N.length;for(let T=0;T<B;T++){const L=F[T];let A=N[T];A===void 0&&(A=document.createElement("span"),N[T]=A,W.appendChild(A));const D=`position:absolute;top:${L.top+(window.pageYOffset||document.documentElement.scrollTop)}px;left:${L.left}px;height:${L.height}px;width:${L.width}px;background-color:rgba(255, 212, 0, 0.3);pointer-events:none;z-index:5;`;A.style.cssText=D}for(let T=M-1;T>=B;T--){const L=N[T];W.removeChild(L),N.pop()}}}})},[t,c]);w.useLayoutEffect(()=>{p();const x=c.container,C=document.body;return C!==null?(C.appendChild(x),()=>{C.removeChild(x)}):()=>{}},[c.container,p]),w.useEffect(()=>(window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}),[p]);const f=x=>(x.preventDefault(),e(),!0),h=()=>{if(s){let x=t.getEditorState().read(()=>{const C=u.current;return C?C.getTextContent():""});x.length>100&&(x=x.slice(0,99)+"…"),n(Qm(x,[ba(r,d)]),!0,void 0,u.current),u.current=null}},b=tg(o,i);return l.jsxs("div",{className:"CommentPlugin_CommentInputBox",ref:a,children:[l.jsx(eg,{className:"CommentPlugin_CommentInputBox_Editor",onEscape:f,onChange:b}),l.jsxs("div",{className:"CommentPlugin_CommentInputBox_Buttons",children:[l.jsx($r,{onClick:e,className:"CommentPlugin_CommentInputBox_Button",children:"Cancel"}),l.jsx($r,{onClick:h,disabled:!s,className:"CommentPlugin_CommentInputBox_Button primary",children:"Comment"})]})]})}function EN({submitAddComment:t,thread:e,placeholder:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=rg(),u=tg(o,i);return l.jsxs(l.Fragment,{children:[l.jsx(eg,{className:"CommentPlugin_CommentsPanel_Editor",autoFocus:!1,onEscape:()=>!0,onChange:u,editorRef:a,placeholder:n}),l.jsx($r,{className:"CommentPlugin_CommentsPanel_SendButton",onClick:()=>{if(s){t(ba(r,c),!1,e);const d=a.current;d!==null&&d.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)}},disabled:!s,children:l.jsx("i",{className:"send"})})]})}function ng({commentOrThread:t,deleteCommentOrThread:e,onClose:n,thread:r=void 0}){return l.jsxs(l.Fragment,{children:["Are you sure you want to delete this ",t.type,"?",l.jsxs("div",{className:"Modal__content",children:[l.jsx($r,{onClick:()=>{e(t,r),n()},children:"Delete"})," ",l.jsx($r,{onClick:()=>{n()},children:"Cancel"})]})]})}function pf({comment:t,deleteComment:e,thread:n,rtf:r}){const o=Math.round((t.timeStamp-(performance.timeOrigin+performance.now()))/1e3),s=Math.round(o/60),[i,a]=Zm();return l.jsxs("li",{className:"CommentPlugin_CommentsPanel_List_Comment",children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Details",children:[l.jsx("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Author",children:t.author}),l.jsxs("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Time",children:["· ",o>-10?"Just now":r.format(s,"minute")]})]}),l.jsx("p",{className:t.deleted?"CommentPlugin_CommentsPanel_DeletedComment":"",children:t.content}),!t.deleted&&l.jsxs(l.Fragment,{children:[l.jsx($r,{onClick:()=>{a("Delete Comment",c=>l.jsx(ng,{commentOrThread:t,deleteCommentOrThread:e,thread:n,onClose:c}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),i]})]})}function kN({activeIDs:t,comments:e,deleteCommentOrThread:n,listRef:r,submitAddComment:o,markNodeMap:s}){const[i]=ye(),[a,c]=w.useState(0),[u,d]=Zm(),p=w.useMemo(()=>new Intl.RelativeTimeFormat("en",{localeMatcher:"best fit",numeric:"auto",style:"short"}),[]);return w.useEffect(()=>{const f=setTimeout(()=>{c(a+1)},1e4);return()=>{clearTimeout(f)}},[a]),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List",ref:r,children:e.map(f=>{const h=f.id;return f.type==="thread"?l.jsxs("li",{onClick:()=>{const b=s.get(h);if(b!==void 0&&(t===null||t.indexOf(h)===-1)){const x=document.activeElement;i.update(()=>{const C=Array.from(b)[0],E=g.$getNodeByKey(C);At(E)&&E.selectStart()},{onUpdate(){x!==null&&x.focus()}})}},className:`CommentPlugin_CommentsPanel_List_Thread ${s.has(h)?"interactive":""} ${t.indexOf(h)===-1?"":"active"}`,children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Thread_QuoteBox",children:[l.jsxs("blockquote",{className:"CommentPlugin_CommentsPanel_List_Thread_Quote",children:["> ",l.jsx("span",{children:f.quote})]}),l.jsx($r,{onClick:()=>{d("Delete Thread",b=>l.jsx(ng,{commentOrThread:f,deleteCommentOrThread:n,onClose:b}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),u]}),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List_Thread_Comments",children:f.comments.map(b=>l.jsx(pf,{comment:b,deleteComment:n,thread:f,rtf:p},b.id))}),l.jsx("div",{className:"CommentPlugin_CommentsPanel_List_Thread_Editor",children:l.jsx(EN,{submitAddComment:o,thread:f,placeholder:"Reply to comment..."})})]},h):l.jsx(pf,{comment:f,deleteComment:n,rtf:p},h)})})}function NN({activeIDs:t,deleteCommentOrThread:e,comments:n,submitAddComment:r,markNodeMap:o}){const s=w.useRef(null),i=n.length===0;return l.jsxs("div",{className:"CommentPlugin_CommentsPanel",children:[l.jsx("h2",{className:"CommentPlugin_CommentsPanel_Heading",children:"Comments"}),i?l.jsx("div",{className:"CommentPlugin_CommentsPanel_Empty",children:"No Comments"}):l.jsx(kN,{activeIDs:t,comments:n,deleteCommentOrThread:e,listRef:s,submitAddComment:r,markNodeMap:o})]})}function rg(){const t=uw(),{yjsDocMap:e,name:n}=t;return e.has("comments")?n:"Scripture User"}function TN({providerFactory:t,setCommentStore:e,onChange:n,showCommentsContainerRef:r,commentContainerRef:o,logger:s}){const i=uw(),[a]=ye(),c=w.useMemo(()=>{const q=new fN(a,s);return n&&q.registerOnChange(n),e==null||e(q),q},[a,s,n,e]),u=hN(c),d=w.useMemo(()=>new Map,[]),[p,f]=w.useState(),[h,b]=w.useState([]),[x,C]=w.useState(!1),[E,_]=w.useState(!1),{yjsDocMap:S}=i;w.useEffect(()=>{if(t){const q=t("comments",S);return c.registerCollaboration(q)}return()=>{}},[c,t,S]);const j=w.useCallback(()=>{a.update(()=>{const q=g.$getSelection();q!==null&&(q.dirty=!0)}),C(!1)},[a]),P=w.useCallback((q,B)=>{if(q.type==="comment"){const W=c.deleteCommentOrThread(q,B);if(!W)return;const{markedComment:N,index:M}=W;c.addComment(N,B,M)}else{c.deleteCommentOrThread(q);const W=B!==void 0?B.id:q.id,N=d.get(W);N!==void 0&&setTimeout(()=>{a.update(()=>{for(const M of N){const T=g.$getNodeByKey(M);At(T)&&(T.deleteID(Sr,W),T.hasNoIDsForEveryType()&&_m(T))}})})}},[c,a,d]),O=w.useCallback((q,B,W,N)=>{c.addComment(q,W),B&&(a.update(()=>{g.$isRangeSelection(N)&&Cm(N,Sr,q.id)}),C(!1))},[c,a]);w.useEffect(()=>{const q=[];for(const B of h){const W=d.get(B);if(W!==void 0)for(const N of W){const M=a.getElementByKey(N);M!==null&&(M.classList.add("selected"),q.push(M),_(!0))}}return()=>{for(const B of q)B.classList.remove("selected")}},[h,a,d]),w.useEffect(()=>{if(!a.hasNodes([Tt]))throw new Error("CommentPlugin: TypedMarkNode not registered on editor!");const q=new Map;return vt(Xf(a,Tt,B=>ei(B.getTypedIDs()),(B,W)=>{for(const[N,M]of Object.entries(B.getTypedIDs()))M.forEach(T=>{W.addID(N,T)})}),a.registerMutationListener(Tt,B=>{a.getEditorState().read(()=>{for(const[W,N]of B){const M=g.$getNodeByKey(W);let T=[];N==="destroyed"?T=q.get(W)??[]:At(M)&&(T=M.getTypedIDs()[Sr]??[]);for(const L of T){let A=d.get(L);q.set(W,T),N==="destroyed"?A!==void 0&&(A.delete(W),A.size===0&&d.delete(L)):(A===void 0&&(A=new Set,d.set(L,A)),A.has(W)||A.add(W))}}})},{skipInitialization:!1}),a.registerUpdateListener(({editorState:B,tags:W})=>{B.read(()=>{const N=g.$getSelection();let M=!1,T=!1;if(g.$isRangeSelection(N)){const L=N.anchor.getNode();if(g.$isTextNode(L)){const A=CC(L,Sr,N.anchor.offset)??[];A!==null&&(b(A),M=!0),N.isCollapsed()||(f(L.getKey()),T=!0)}}M||b(L=>L.length===0?L:[]),T||f(null),!W.has("collaboration")&&g.$isRangeSelection(N)&&C(!1)})}),a.registerCommand(df,()=>{const B=window.getSelection();return B!==null&&B.removeAllRanges(),C(!0),!0},g.COMMAND_PRIORITY_EDITOR))},[a,d]);const F=()=>{a.dispatchCommand(df,void 0)};return l.jsxs(l.Fragment,{children:[x&&fn.createPortal(l.jsx(CN,{editor:a,cancelAddComment:j,submitAddComment:O}),document.body),p!=null&&!x&&fn.createPortal(l.jsx(yN,{anchorKey:p,editor:a,showComments:E,onAddComment:F}),document.body),r!==null&&fn.createPortal(l.jsx($r,{className:`CommentPlugin_ShowCommentsButton ${E?"active":""}`,onClick:()=>_(!E),title:E?"Hide Comments":"Show Comments",children:l.jsx("i",{className:"comments"})}),(r==null?void 0:r.current)??document.body),E&&fn.createPortal(l.jsx(NN,{comments:u,submitAddComment:O,deleteCommentOrThread:P,activeIDs:h,markNodeMap:d}),(o==null?void 0:o.current)??document.body)]})}function SN(){const t=w.useRef(void 0),e=w.useCallback(n=>{t.current=n},[]);return[t,e]}function AN(t,e){var n,r;const o=((n=e.current)==null?void 0:n.getComments())??[],s=o==null?void 0:o.map(a=>a.id),i=t.map(a=>{const c=s.findIndex(u=>u===a);return c!==void 0&&c>=0?o[c]:{comments:[{author:"unknown",content:"Comment not found",deleted:!1,id:"",timeStamp:0,type:"comment"}],id:a,quote:"",type:"thread"}});o.forEach(a=>{t.includes(a.id)||i.push(a)}),i&&((r=e.current)==null||r.setComments(i))}function DN(t,e){w.useEffect(()=>{var n;t.options??(t.options={}),(n=t.options).nodes??(n.nodes={}),t.options.nodes.addMissingComments=r=>{AN(r,e)}},[e,t])}w.forwardRef(function(t,e){const n=w.useRef(null),r=w.useRef(!0),o=w.useRef(null),[s,i]=w.useState(null),{children:a,onCommentChange:c,onUsjChange:u,showCommentsContainerRef:d,...p}=t,{options:{isReadonly:f}={}}=t,[h,b]=SN();DN(p,h),w.useImperativeHandle(e,()=>({focus(){var E;(E=n.current)==null||E.focus()},undo(){var E;(E=n.current)==null||E.undo()},redo(){var E;(E=n.current)==null||E.redo()},cut(){var E;(E=n.current)==null||E.cut()},copy(){var E;(E=n.current)==null||E.copy()},paste(){var E;(E=n.current)==null||E.paste()},pastePlainText(){var E;(E=n.current)==null||E.pastePlainText()},getUsj(){var E;return(E=n.current)==null?void 0:E.getUsj()},setUsj(E){var _;(_=n.current)==null||_.setUsj(E)},applyUpdate(E,_){var S;(S=n.current)==null||S.applyUpdate(E,_)},replaceEmbedUpdate(E,_){var S;return(S=n.current)==null?void 0:S.replaceEmbedUpdate(E,_)},getSelection(){var E;return(E=n.current)==null?void 0:E.getSelection()},setSelection(E){var _;(_=n.current)==null||_.setSelection(E)},addAnnotation(E,_,S){var j;(j=n.current)==null||j.addAnnotation(E,_,S)},removeAnnotation(E,_){var S;(S=n.current)==null||S.removeAnnotation(E,_)},formatPara(E){var _;(_=n.current)==null||_.formatPara(E)},getElementByKey(E){var _;return(_=n.current)==null?void 0:_.getElementByKey(E)},insertNote(E,_,S){var j;(j=n.current)==null||j.insertNote(E,_,S)},selectNote(E){var _;(_=n.current)==null||_.selectNote(E)},getNoteOps(E){var _;return(_=n.current)==null?void 0:_.getNoteOps(E)},setComments(E){var _;(_=h.current)==null||_.setComments(E),r.current=!0},get toolbarEndRef(){return s}}));const x=w.useCallback((E,_,S,j)=>{var P;if(!u)return;const O=(P=h.current)==null?void 0:P.getComments();u(E,O,_,S,j)},[h,u]),C=w.useCallback(()=>{var E;if(!c||r.current){r.current=!1;return}const _=(E=h.current)==null?void 0:E.getComments();c(_)},[h,r,c]);return w.useEffect(()=>{var E;return i(((E=n.current)==null?void 0:E.toolbarEndRef)??null),()=>i(null)},[]),l.jsxs(Jm,{ref:n,onUsjChange:x,...p,children:[l.jsx(TN,{setCommentStore:b,onChange:C,showCommentsContainerRef:f?null:d??s,commentContainerRef:o,logger:p.logger}),l.jsx("div",{ref:o,className:"comment-container"})]})});const Mo=w.forwardRef(({className:t,type:e,...n},r)=>l.jsx("input",{type:e,className:K("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...n}));Mo.displayName="Input";const MN=(t,e,n)=>t==="generated"?l.jsxs(l.Fragment,{children:[l.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?l.jsxs(l.Fragment,{children:[l.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):l.jsxs(l.Fragment,{children:[l.jsx("p",{children:n})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function RN({callerType:t,updateCallerType:e,customCaller:n,updateCustomCaller:r,localizedStrings:o}){const[s,i]=w.useState(t),[a,c]=w.useState(n);w.useEffect(()=>{i(t)},[t]),w.useEffect(()=>{a!==n&&c(n)},[n]);const u=d=>{d||(s!=="custom"||a?(e(s),r(a)):(i(t),c(n)))};return l.jsxs(Ur,{onOpenChange:u,children:[l.jsx(Kn,{children:l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:l.jsx(No,{asChild:!0,children:l.jsx(ge,{variant:"outline",className:"tw-h-6",children:MN(t,o,n)})})}),l.jsx(Yn,{children:o["%footnoteEditor_callerDropdown_tooltip%"]})]})}),l.jsxs(wr,{className:"tw-z-[300]",children:[l.jsx(ps,{children:o["%footnoteEditor_callerDropdown_label%"]}),l.jsx(To,{}),l.jsx(cr,{checked:s==="generated",onCheckedChange:()=>i("generated"),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[l.jsx("span",{children:o["%footnoteEditor_callerDropdown_item_generated%"]}),l.jsx("span",{className:"tw-w-10 tw-text-center",children:Ir})]})}),l.jsx(cr,{checked:s==="hidden",onCheckedChange:()=>i("hidden"),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[l.jsx("span",{children:o["%footnoteEditor_callerDropdown_item_hidden%"]}),l.jsx("span",{className:"tw-w-10 tw-text-center",children:Qs})]})}),l.jsx(cr,{checked:s==="custom",onCheckedChange:()=>i("custom"),onSelect:d=>d.preventDefault(),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[l.jsx("span",{children:o["%footnoteEditor_callerDropdown_item_custom%"]}),l.jsx(Mo,{className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:a,maxLength:1,onChange:d=>c(d.target.value)})]})})]})]})}const ON=(t,e)=>t==="f"?l.jsxs(l.Fragment,{children:[l.jsx(se.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?l.jsxs(l.Fragment,{children:[l.jsx(se.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):l.jsxs(l.Fragment,{children:[l.jsx(se.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),jN=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let n=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(n=e["%footnoteEditor_noteType_footnote_label%"]),ne.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:n})};function IN({noteType:t,handleNoteTypeChange:e,localizedStrings:n}){return l.jsxs(Ur,{children:[l.jsx(Kn,{children:l.jsxs(lr,{children:[l.jsx(wf.TooltipTrigger,{asChild:!0,children:l.jsx(No,{asChild:!0,children:l.jsx(ge,{variant:"outline",className:"tw-h-6 disabled:tw-pointer-events-auto",disabled:t==="x",children:ON(t,n)})})}),l.jsx(Yn,{children:l.jsx("p",{children:jN(t,n)})})]})}),t!=="x"&&l.jsxs(wr,{className:"tw-z-[300]",children:[l.jsx(ps,{children:n["%footnoteEditor_noteTypeDropdown_label%"]}),l.jsx(To,{}),l.jsxs(cr,{checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[l.jsx(se.FunctionSquare,{}),l.jsx("span",{children:n["%footnoteEditor_noteType_footnote_label%"]})]}),l.jsxs(cr,{checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[l.jsx(se.SquareSigma,{}),l.jsx("span",{children:n["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function LN({noteOps:t,onSave:e,onClose:n,scrRef:r,noteKey:o,editorOptions:s,localizedStrings:i}){const a=w.useRef(null),c=w.createRef(),[u,d]=w.useState("generated"),[p,f]=w.useState("*"),[h,b]=w.useState("f"),x=w.useMemo(()=>({...s,markerMenuTrigger:s.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...s.view??qa(),noteMode:"expanded"}}),[s]);w.useEffect(()=>{var S;(S=a.current)==null||S.focus()}),w.useEffect(()=>{var P,O;let S;const j=t==null?void 0:t.at(0);if(j&&Er("note",j)){const F=(P=j.insert.note)==null?void 0:P.caller;let q="custom";F===Ir?q="generated":F===Qs?q="hidden":F&&f(F),d(q),b(((O=j.insert.note)==null?void 0:O.style)??"f"),j.insert.note&&(j.insert.note.caller=""),S=setTimeout(()=>{var B;(B=a.current)==null||B.applyUpdate([{delete:1},j])},0)}return()=>{S&&clearTimeout(S)}},[t,o]);const C=w.useCallback(()=>{var j,P;const S=(P=(j=a.current)==null?void 0:j.getNoteOps(0))==null?void 0:P.at(0);S&&Er("note",S)&&(S.insert.note&&(u==="custom"?S.insert.note.caller=p:S.insert.note.caller=u==="generated"?Ir:Qs),e([S]))},[u,p,e]),E=()=>{var j;const S=(j=c.current)==null?void 0:j.getElementsByClassName("editor-input")[0];S!=null&&S.textContent&&navigator.clipboard.writeText(S.textContent)},_=S=>{var P,O,F;b(S);const j=(O=(P=a.current)==null?void 0:P.getNoteOps(0))==null?void 0:O.at(0);j&&Er("note",j)&&(j.insert.note&&(j.insert.note.style=S),(F=a.current)==null||F.applyUpdate([{delete:1},j]))};return l.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[l.jsxs("div",{className:"tw-flex",children:[l.jsxs("div",{className:"tw-flex tw-gap-4",children:[l.jsx(IN,{noteType:h,handleNoteTypeChange:_,localizedStrings:i}),l.jsx(RN,{callerType:u,updateCallerType:d,customCaller:p,updateCustomCaller:f,localizedStrings:i})]}),l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[l.jsx(Kn,{children:l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:l.jsx(ge,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:l.jsx(se.X,{})})}),l.jsx(Yn,{children:l.jsx("p",{children:i["%footnoteEditor_cancelButton_tooltip%"]})})]})}),l.jsx(Kn,{children:l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:l.jsx(ge,{onClick:C,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:l.jsx(se.Check,{})})}),l.jsx(Yn,{children:i["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),l.jsxs("div",{ref:c,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[l.jsx(dN,{options:x,onScrRefChange:()=>{},scrRef:r,ref:a}),l.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:l.jsx(Kn,{children:l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:l.jsx(ge,{onClick:E,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.Copy,{})})}),l.jsx(Yn,{children:l.jsx("p",{children:i["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const PN=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function og(t,e){if(!e||e.length===0)return t??"empty";const n=e.find(o=>typeof o=="string");if(n)return`key-${t??"unknown"}-${n.slice(0,10)}`;const r=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${r}`}function $N(t,e,n=!0,r=void 0){if(!e||e.length===0)return;const o=[],s=[];let i=[];return e.forEach(a=>{typeof a!="string"&&a.marker==="fp"?(i.length>0&&s.push(i),i=[a]):i.push(a)}),i.length>0&&s.push(i),s.map((a,c)=>{const u=c===s.length-1;return l.jsxs("p",{className:"tw-mb-2",children:[ju(t,a,n,!0,o),u&&r]},og(t,a))})}function ju(t,e,n=!0,r=!0,o=[]){if(!(!e||e.length===0))return e.map(s=>{if(typeof s=="string"){const i=`${t}-text-${s.slice(0,10)}`;if(r){const a=K(`usfm_${t}`);return l.jsx("span",{className:a,children:s},i)}return l.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),l.jsx("span",{children:s}),l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return FN(s,og(`${t}\\${s.marker}`,[s]),n,[...o,t??"unknown"])})}function FN(t,e,n,r=[]){const{marker:o}=t;return l.jsxs("span",{children:[o?n&&l.jsx("span",{className:"marker",children:`\\${o} `}):l.jsx(se.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),ju(o,t.content,n,!0,[...r,o??"unknown"])]},e)}function sg({footnote:t,layout:e="horizontal",formatCaller:n,showMarkers:r=!0}){const o=n?n(t.caller):t.caller,s=o!==t.caller;let i,a=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...a]=t.content);const c=r?l.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,u=r?l.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,d=l.jsxs(l.Fragment,{children:[o&&l.jsxs("span",{className:K("note-caller",{formatted:s}),children:[o," "]}),i&&l.jsxs(l.Fragment,{children:[ju(t.marker,[i],r,!1)," "]})]}),h=K(e==="horizontal"?"horizontal tw-table-cell":"vertical",r?"marker-visible":"");return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:K("textual-note-header tw-text-nowrap tw-pr-2",h),children:[c,d]}),l.jsx("div",{className:K("textual-note-body tw-pr-0.5",h),children:a&&a.length>0&&l.jsx(l.Fragment,{children:$N(t.marker,a,r,u)})})]})}const BN=["%webView_footnoteList_header%"],qN=(t,e)=>t[e]??e;function UN({className:t,classNameForItems:e,footnotes:n,layout:r="horizontal",listId:o,selectedFootnote:s,showMarkers:i=!0,suppressFormatting:a=!1,formatCaller:c,onFootnoteSelected:u,localizedStrings:d}){const p=d?qN(d,"%webView_footnoteList_header%"):"Footnotes",f=c??ne.getFormatCallerFunction(n,void 0),h=(S,j)=>{u==null||u(S,j,o)},b=s?n.findIndex(S=>S===s):0,[x,C]=w.useState(b),E=S=>{if(n.length)switch(S.key){case"ArrowDown":S.preventDefault(),C(j=>Math.min(j+1,n.length-1));break;case"ArrowUp":S.preventDefault(),C(j=>Math.max(j-1,0));break;case"Enter":case" ":S.preventDefault(),u==null||u(n[x],x,o);break}},_=w.useRef([]);return w.useEffect(()=>{var S;x>=0&&x<_.current.length&&((S=_.current[x])==null||S.focus())},[x]),l.jsxs(l.Fragment,{children:[r==="vertical"&&l.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:p}),l.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:K("tw-h-full tw-overflow-y-auto",t),onKeyDown:E,children:l.jsx("div",{className:K("tw-p-0.5 tw-pt-1",r==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!a&&"formatted-font"),children:n.map((S,j)=>{const P=S===s,O=`${o}-${j}`;return l.jsxs(l.Fragment,{children:[l.jsx(Ta,{ref:F=>{_.current[j]=F},role:"option","aria-selected":P,"data-marker":S.marker,"data-state":P?"selected":void 0,tabIndex:-1,className:K("data-[state=selected]:tw-bg-muted",u&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",e),onClick:()=>h(S,j),children:l.jsx(sg,{footnote:S,layout:r,formatCaller:()=>f(S.caller,j),showMarkers:i})},O),j<n.length-1&&r==="vertical"&&l.jsx(co,{})]})})})})]})}function VN({occurrenceData:t,setScriptureReference:e,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=w.useMemo(()=>{const i=[];return t.forEach(a=>{i.some(c=>ne.deepEqual(c,a))||i.push(a)}),i},[t]);return l.jsxs(ai,{stickyHeader:!0,children:[l.jsx(li,{stickyHeader:!0,children:l.jsxs(Gn,{children:[l.jsx(Wo,{children:r}),l.jsx(Wo,{children:o})]})}),l.jsx(ci,{children:s.length>0&&s.map(i=>l.jsxs(Gn,{onClick:()=>{e(i.reference)},children:[l.jsx(Dr,{children:`${Fe.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),l.jsx(Dr,{children:i.text})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Ua=w.forwardRef(({className:t,...e},n)=>l.jsx(Fl.Root,{ref:n,className:K("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:l.jsx(Fl.Indicator,{className:K("tw-flex tw-items-center tw-justify-center tw-text-current"),children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}));Ua.displayName=Fl.Root.displayName;const Va=t=>t==="asc"?l.jsx(se.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?l.jsx(se.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):l.jsx(se.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),HN=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>l.jsxs(ge,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Va(e.getIsSorted())]})}),zN=(t,e)=>({accessorKey:`item${e}`,accessorFn:n=>n.items[e],header:({column:n})=>l.jsxs(ge,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Va(n.getIsSorted())]})}),GN=t=>({accessorKey:"count",header:({column:e})=>l.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:l.jsxs(ge,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Va(e.getIsSorted())]})}),cell:({row:e})=>l.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),jl=(t,e,n,r,o,s)=>{let i=[...n];t.forEach(c=>{e==="approved"?i.includes(c)||i.push(c):i=i.filter(u=>u!==c)}),r(i);let a=[...o];t.forEach(c=>{e==="unapproved"?a.includes(c)||a.push(c):a=a.filter(u=>u!==c)}),s(a)},KN=(t,e,n,r,o)=>({accessorKey:"status",header:({column:s})=>l.jsx("div",{className:"tw-flex tw-justify-center",children:l.jsxs(ge,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,Va(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),a=s.getValue("item");return l.jsxs(Na,{value:i,variant:"outline",type:"single",children:[l.jsx(Vo,{onClick:c=>{c.stopPropagation(),jl([a],"approved",e,n,r,o)},value:"approved",children:l.jsx(se.CircleCheckIcon,{})}),l.jsx(Vo,{onClick:c=>{c.stopPropagation(),jl([a],"unapproved",e,n,r,o)},value:"unapproved",children:l.jsx(se.CircleXIcon,{})}),l.jsx(Vo,{onClick:c=>{c.stopPropagation(),jl([a],"unknown",e,n,r,o)},value:"unknown",children:l.jsx(se.CircleHelpIcon,{})})]})}}),YN=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),WN=t=>{const e=/^\\[vc]\s+(\d+)/,n=t.match(e);if(n)return+n[1]},JN=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ig=(t,e,n)=>n.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",XN=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),QN=(t,e,n)=>{let r=t;return e!=="all"&&(r=r.filter(o=>e==="approved"&&o.status==="approved"||e==="unapproved"&&o.status==="unapproved"||e==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},ZN=(t,e,n)=>{const r=[];return t.forEach(o=>{const s=r.find(i=>ne.deepEqual(i.items,ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(s)s.count+=1,s.occurrences.push({reference:o.verseRef,text:o.verse});else{const i={items:ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:ig(ne.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],e,n),occurrences:[{reference:o.verseRef,text:o.verse}]};r.push(i)}}),r},qn=(t,e)=>t[e]??e;function eT({inventoryItems:t,setVerseRef:e,localizedStrings:n,additionalItemsLabels:r,approvedItems:o,unapprovedItems:s,scope:i,onScopeChange:a,columns:c,id:u,areInventoryItemsLoading:d=!1}){const p=qn(n,"%webView_inventory_all%"),f=qn(n,"%webView_inventory_approved%"),h=qn(n,"%webView_inventory_unapproved%"),b=qn(n,"%webView_inventory_unknown%"),x=qn(n,"%webView_inventory_scope_currentBook%"),C=qn(n,"%webView_inventory_scope_chapter%"),E=qn(n,"%webView_inventory_scope_verse%"),_=qn(n,"%webView_inventory_filter_text%"),S=qn(n,"%webView_inventory_show_additional_items%"),j=qn(n,"%webView_inventory_no_results%"),[P,O]=w.useState(!1),[F,q]=w.useState("all"),[B,W]=w.useState(""),[N,M]=w.useState([]),T=w.useMemo(()=>{const J=t??[];return J.length===0?[]:ZN(J,o,s)},[t,o,s]),L=w.useMemo(()=>{if(P)return T;const J=[];return T.forEach(ee=>{const te=ee.items[0],Z=J.find(X=>X.items[0]===te);Z?(Z.count+=ee.count,Z.occurrences=Z.occurrences.concat(ee.occurrences)):J.push({items:[te],count:ee.count,occurrences:ee.occurrences,status:ee.status})}),J},[P,T]),A=w.useMemo(()=>L.length===0?[]:QN(L,F,B),[L,F,B]),D=w.useMemo(()=>{var te,Z;if(!P)return c;const J=(te=r==null?void 0:r.tableHeaders)==null?void 0:te.length;if(!J)return c;const ee=[];for(let X=0;X<J;X++)ee.push(zN(((Z=r==null?void 0:r.tableHeaders)==null?void 0:Z[X])||"Additional Item",X+1));return[...ee,...c]},[r==null?void 0:r.tableHeaders,c,P]);w.useEffect(()=>{A.length===0?M([]):A.length===1&&M(A[0].items)},[A]);const $=(J,ee)=>{ee.setRowSelection(()=>{const te={};return te[J.index]=!0,te}),M(J.original.items)},z=J=>{if(J==="book"||J==="chapter"||J==="verse")a(J);else throw new Error(`Invalid scope value: ${J}`)},U=J=>{if(J==="all"||J==="approved"||J==="unapproved"||J==="unknown")q(J);else throw new Error(`Invalid status filter value: ${J}`)},G=w.useMemo(()=>{if(L.length===0||N.length===0)return[];const J=L.filter(ee=>ne.deepEqual(P?ee.items:[ee.items[0]],N));if(J.length>1)throw new Error("Selected item is not unique");return J.length===0?[]:J[0].occurrences},[N,P,L]);return l.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[l.jsxs("div",{className:"tw-flex tw-items-stretch",children:[l.jsxs(uo,{onValueChange:J=>U(J),defaultValue:F,children:[l.jsx(Mr,{className:"tw-m-1",children:l.jsx(po,{placeholder:"Select filter"})}),l.jsxs(Rr,{children:[l.jsx(cn,{value:"all",children:p}),l.jsx(cn,{value:"approved",children:f}),l.jsx(cn,{value:"unapproved",children:h}),l.jsx(cn,{value:"unknown",children:b})]})]}),l.jsxs(uo,{onValueChange:J=>z(J),defaultValue:i,children:[l.jsx(Mr,{className:"tw-m-1",children:l.jsx(po,{placeholder:"Select scope"})}),l.jsxs(Rr,{children:[l.jsx(cn,{value:"book",children:x}),l.jsx(cn,{value:"chapter",children:C}),l.jsx(cn,{value:"verse",children:E})]})]}),l.jsx(Mo,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:B,onChange:J=>{W(J.target.value)}}),r&&l.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[l.jsx(Ua,{className:"tw-m-1",checked:P,onCheckedChange:J=>{O(J)}}),l.jsx(ht,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??S})]})]}),l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(Ah,{columns:D,data:A,onRowClickHandler:$,stickyHeader:!0,isLoading:d,noResultsMessage:j})}),G.length>0&&l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(VN,{occurrenceData:G,setScriptureReference:e,localizedStrings:n})})]})}const tT="16rem",nT="3rem",ag=w.createContext(void 0);function bi(){const t=w.useContext(ag);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Iu=w.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...a},c)=>{const[u,d]=w.useState(t),p=e??u,f=w.useCallback(S=>{const j=typeof S=="function"?S(p):S;n?n(j):d(j)},[n,p]),h=w.useCallback(()=>f(S=>!S),[f]),b=p?"expanded":"collapsed",E=Ct()==="ltr"?i:i==="primary"?"secondary":"primary",_=w.useMemo(()=>({state:b,open:p,setOpen:f,toggleSidebar:h,side:E}),[b,p,f,h,E]);return l.jsx(ag.Provider,{value:_,children:l.jsx(Kn,{delayDuration:0,children:l.jsx("div",{style:{"--sidebar-width":tT,"--sidebar-width-icon":nT,...o},className:K("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...a,children:s})})})});Iu.displayName="SidebarProvider";const Lu=w.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:n,children:r,...o},s)=>{const i=bi();return e==="none"?l.jsx("div",{className:K("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):l.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[l.jsx("div",{className:K("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),l.jsx("div",{className:K("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:l.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Lu.displayName="Sidebar";const lg=w.forwardRef(({className:t,onClick:e,...n},r)=>{const o=bi();return l.jsxs(ge,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:K("tw-h-7 tw-w-7",t),onClick:s=>{e==null||e(s),o.toggleSidebar()},...n,children:[o.side==="primary"?l.jsx(se.PanelLeft,{}):l.jsx(se.PanelRight,{}),l.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});lg.displayName="SidebarTrigger";const cg=w.forwardRef(({className:t,...e},n)=>{const{toggleSidebar:r}=bi();return l.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:K("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});cg.displayName="SidebarRail";const Pu=w.forwardRef(({className:t,...e},n)=>l.jsx("main",{ref:n,className:K("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Pu.displayName="SidebarInset";const ug=w.forwardRef(({className:t,...e},n)=>l.jsx(Mo,{ref:n,"data-sidebar":"input",className:K("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ug.displayName="SidebarInput";const dg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"header",className:K("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));dg.displayName="SidebarHeader";const pg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"footer",className:K("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));pg.displayName="SidebarFooter";const fg=w.forwardRef(({className:t,...e},n)=>l.jsx(co,{ref:n,"data-sidebar":"separator",className:K("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));fg.displayName="SidebarSeparator";const $u=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"content",className:K("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));$u.displayName="SidebarContent";const va=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group",className:K("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));va.displayName="SidebarGroup";const xa=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?ls.Slot:"div";return l.jsx(o,{ref:r,"data-sidebar":"group-label",className:K("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...n})});xa.displayName="SidebarGroupLabel";const hg=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?ls.Slot:"button";return l.jsx(o,{ref:r,"data-sidebar":"group-action",className:K("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...n})});hg.displayName="SidebarGroupAction";const ya=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group-content",className:K("tw-w-full tw-text-sm",t),...e}));ya.displayName="SidebarGroupContent";const Fu=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu",className:K("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Fu.displayName="SidebarMenu";const Bu=w.forwardRef(({className:t,...e},n)=>l.jsx("li",{ref:n,"data-sidebar":"menu-item",className:K("tw-group/menu-item tw-relative",t),...e}));Bu.displayName="SidebarMenuItem";const rT=Fr.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),qu=w.forwardRef(({asChild:t=!1,isActive:e=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},a)=>{const c=t?ls.Slot:"button",{state:u}=bi(),d=l.jsx(c,{ref:a,"data-sidebar":"menu-button","data-size":r,"data-active":e,className:K(rT({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:d}),l.jsx(Yn,{side:"right",align:"center",hidden:u!=="collapsed",...o})]})):d});qu.displayName="SidebarMenuButton";const wg=w.forwardRef(({className:t,asChild:e=!1,showOnHover:n=!1,...r},o)=>{const s=e?ls.Slot:"button";return l.jsx(s,{ref:o,"data-sidebar":"menu-action",className:K("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...r})});wg.displayName="SidebarMenuAction";const mg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:K("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));mg.displayName="SidebarMenuBadge";const gg=w.forwardRef(({className:t,showIcon:e=!1,...n},r)=>{const o=w.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return l.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:K("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...n,children:[e&&l.jsx(Zi,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),l.jsx(Zi,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});gg.displayName="SidebarMenuSkeleton";const bg=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:K("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));bg.displayName="SidebarMenuSub";const vg=w.forwardRef(({...t},e)=>l.jsx("li",{ref:e,...t}));vg.displayName="SidebarMenuSubItem";const xg=w.forwardRef(({asChild:t=!1,size:e="md",isActive:n,className:r,...o},s)=>{const i=t?ls.Slot:"a";return l.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":n,className:K("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});xg.displayName="SidebarMenuSubButton";function yg({id:t,extensionLabels:e,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:a,className:c}){const u=w.useCallback((f,h)=>{r(f,h)},[r]),d=w.useCallback(f=>{const h=n.find(b=>b.projectId===f);return h?h.projectName:f},[n]),p=w.useCallback(f=>!o.projectId&&f===o.label,[o]);return l.jsx(Lu,{id:t,collapsible:"none",variant:"inset",className:K("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:l.jsxs($u,{children:[l.jsxs(va,{children:[l.jsx(xa,{className:"tw-text-sm",children:s}),l.jsx(ya,{children:l.jsx(Fu,{children:Object.entries(e).map(([f,h])=>l.jsx(Bu,{children:l.jsx(qu,{onClick:()=>u(f),isActive:p(f),children:l.jsx("span",{className:"tw-pl-3",children:h})})},f))})})]}),l.jsxs(va,{children:[l.jsx(xa,{className:"tw-text-sm",children:i}),l.jsx(ya,{className:"tw-pl-3",children:l.jsx(Qi,{buttonVariant:"ghost",buttonClassName:K("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:d,buttonPlaceholder:a,onChange:f=>{const h=d(f);u(h,f)},value:(o==null?void 0:o.projectId)??void 0,icon:l.jsx(se.ScrollText,{})})})]})]})})}const Ha=w.forwardRef(({value:t,onSearch:e,placeholder:n,isFullWidth:r,className:o,isDisabled:s=!1,id:i},a)=>{const c=Ct();return l.jsxs("div",{id:i,className:K("tw-relative",{"tw-w-full":r},o),children:[l.jsx(se.Search,{className:K("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":c==="rtl"},{"tw-left-3":c==="ltr"})}),l.jsx(Mo,{ref:a,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:t,onChange:u=>e(u.target.value),disabled:s}),t&&l.jsxs(ge,{variant:"ghost",size:"icon",className:K("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":c==="rtl"},{"tw-right-0":c==="ltr"}),onClick:()=>{e("")},children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ha.displayName="SearchBar";function oT({id:t,extensionLabels:e,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:a,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}){return l.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[l.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:l.jsx(Ha,{className:"tw-w-9/12",value:i,onSearch:a,placeholder:"Search app settings, extension settings, and project settings"})}),l.jsxs(Iu,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[l.jsx(yg,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}),l.jsx(Pu,{className:"tw-min-w-[215px]",children:r})]})]})}const _r="scrBook",sT="scrRef",no="source",iT="details",aT="Scripture Reference",lT="Scripture Book",_g="Type",cT="Details";function uT(t,e){const n=e??!1;return[{accessorFn:r=>`${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,id:_r,header:(t==null?void 0:t.scriptureReferenceColumnName)??aT,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?Fe.bookIdToEnglishName(o.start.book):r.row.groupingColumnId===_r?ne.formatScrRef(o.start):void 0},getGroupingValue:r=>Fe.bookIdToNumber(r.start.book),sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>ne.formatScrRef(r.start),id:sT,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:ne.formatScrRef(o.start)},sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:no,header:n?(t==null?void 0:t.typeColumnName)??_g:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:iT,header:(t==null?void 0:t.detailsColumnName)??cT,cell:r=>r.getValue(),enableGrouping:!1}]}const dT=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let n=0;return t.end&&({offset:n}=t.end),!t.end||ne.compareScrRefs(t.start,t.end)===0?`${ne.scrRefToBBBCCCVVV(t.start)}+${e}`:`${ne.scrRefToBBBCCCVVV(t.start)}+${e}-${ne.scrRefToBBBCCCVVV(t.end)}+${n}`},ff=t=>`${dT({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function pT({sources:t,showColumnHeaders:e=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:a,id:c}){const[u,d]=w.useState([]),[p,f]=w.useState([{id:_r,desc:!1}]),[h,b]=w.useState({}),x=w.useMemo(()=>t.flatMap(B=>B.data.map(W=>({...W,source:B.source}))),[t]),C=w.useMemo(()=>uT({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);w.useEffect(()=>{u.includes(no)?f([{id:no,desc:!1},{id:_r,desc:!1}]):f([{id:_r,desc:!1}])},[u]);const E=Ft.useReactTable({data:x,columns:C,state:{grouping:u,sorting:p,rowSelection:h},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:Ft.getExpandedRowModel(),getGroupedRowModel:Ft.getGroupedRowModel(),getCoreRowModel:Ft.getCoreRowModel(),getSortedRowModel:Ft.getSortedRowModel(),getRowId:ff,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});w.useEffect(()=>{if(a){const B=E.getSelectedRowModel().rowsById,W=Object.keys(B);if(W.length===1){const N=x.find(M=>ff(M)===W[0])||void 0;N&&a(N)}}},[h,x,a,E]);const _=o??lT,S=s??_g,j=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[_r]},{label:`Group by ${S}`,value:[no]},{label:`Group by ${_} and ${S}`,value:[_r,no]},{label:`Group by ${S} and ${_}`,value:[no,_r]}],P=B=>{d(JSON.parse(B))},O=(B,W)=>{!B.getIsGrouped()&&!B.getIsSelected()&&B.getToggleSelectedHandler()(W)},F=(B,W)=>B.getIsGrouped()?"":K("banded-row",W%2===0?"even":"odd"),q=(B,W,N)=>{if(!((B==null?void 0:B.length)===0||W.depth<N.column.getGroupedIndex())){if(W.getIsGrouped())switch(W.depth){case 1:return"tw-ps-4";default:return}switch(W.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return l.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&l.jsxs(uo,{value:JSON.stringify(u),onValueChange:B=>{P(B)},children:[l.jsx(Mr,{className:"tw-mb-1 tw-mt-2",children:l.jsx(po,{})}),l.jsx(Rr,{position:"item-aligned",children:l.jsx(Ch,{children:j.map(B=>l.jsx(cn,{value:JSON.stringify(B.value),children:B.label},B.label))})})]}),l.jsxs(ai,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&l.jsx(li,{children:E.getHeaderGroups().map(B=>l.jsx(Gn,{children:B.headers.filter(W=>W.column.columnDef.header).map(W=>l.jsx(Wo,{colSpan:W.colSpan,className:"top-0 tw-sticky",children:W.isPlaceholder?void 0:l.jsxs("div",{children:[W.column.getCanGroup()?l.jsx(ge,{variant:"ghost",title:`Toggle grouping by ${W.column.columnDef.header}`,onClick:W.column.getToggleGroupingHandler(),type:"button",children:W.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ft.flexRender(W.column.columnDef.header,W.getContext())]})},W.id))},B.id))}),l.jsx(ci,{children:E.getRowModel().rows.map((B,W)=>{const N=Ct();return l.jsx(Gn,{"data-state":B.getIsSelected()?"selected":"",className:K(F(B,W)),onClick:M=>O(B,M),children:B.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==no||!n)))return l.jsx(Dr,{className:K(M.column.columnDef.id,"tw-p-[1px]",q(u,B,M)),children:M.getIsGrouped()?l.jsxs(ge,{variant:"link",onClick:B.getToggleExpandedHandler(),type:"button",children:[B.getIsExpanded()&&l.jsx(se.ChevronDown,{}),!B.getIsExpanded()&&(N==="ltr"?l.jsx(se.ChevronRight,{}):l.jsx(se.ChevronLeft,{}))," ",Ft.flexRender(M.column.columnDef.cell,M.getContext())," (",B.subRows.length,")"]}):Ft.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},B.id)})})]})]})}const Uu=(t,e)=>t.filter(n=>{try{return ne.getSectionForBook(n)===e}catch{return!1}}),Cg=(t,e,n)=>Uu(t,e).every(r=>n.includes(r));function fT({section:t,availableBookIds:e,selectedBookIds:n,onToggle:r,localizedStrings:o}){const s=Uu(e,t).length===0,i=o["%scripture_section_ot_short%"],a=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],u=o["%scripture_section_extra_short%"];return l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>r(t),className:K(Cg(e,t,n)&&!s&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:s,children:Jb(t,i,a,c,u)})}const hf=5,Il=6;function hT({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:n,localizedStrings:r,localizedBookNames:o}){const s=r["%webView_book_selector_books_selected%"],i=r["%webView_book_selector_select_books%"],a=r["%webView_book_selector_search_books%"],c=r["%webView_book_selector_select_all%"],u=r["%webView_book_selector_clear_all%"],d=r["%webView_book_selector_no_book_found%"],p=r["%webView_book_selector_more%"],{otLong:f,ntLong:h,dcLong:b,extraLong:x}={otLong:r==null?void 0:r["%scripture_section_ot_long%"],ntLong:r==null?void 0:r["%scripture_section_nt_long%"],dcLong:r==null?void 0:r["%scripture_section_dc_long%"],extraLong:r==null?void 0:r["%scripture_section_extra_long%"]},[C,E]=w.useState(!1),[_,S]=w.useState(""),j=w.useRef(void 0),P=w.useRef(!1);if(t.length!==Fe.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=w.useMemo(()=>Fe.allBookIds.filter((L,A)=>t[A]==="1"&&!Fe.isObsolete(Fe.bookIdToNumber(L))),[t]),F=w.useMemo(()=>{if(!_.trim()){const D={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return O.forEach($=>{const z=ne.getSectionForBook($);D[z].push($)}),D}const L=O.filter(D=>Dc(D,_,o)),A={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return L.forEach(D=>{const $=ne.getSectionForBook(D);A[$].push(D)}),A},[O,_,o]),q=w.useCallback((L,A=!1)=>{if(!A||!j.current){n(e.includes(L)?e.filter(J=>J!==L):[...e,L]),j.current=L;return}const D=O.findIndex(J=>J===j.current),$=O.findIndex(J=>J===L);if(D===-1||$===-1)return;const[z,U]=[Math.min(D,$),Math.max(D,$)],G=O.slice(z,U+1).map(J=>J);n(e.includes(L)?e.filter(J=>!G.includes(J)):[...new Set([...e,...G])])},[e,n,O]),B=L=>{q(L,P.current),P.current=!1},W=(L,A)=>{L.preventDefault(),q(A,L.shiftKey)},N=w.useCallback(L=>{const A=Uu(O,L).map(D=>D);n(Cg(O,L,e)?e.filter(D=>!A.includes(D)):[...new Set([...e,...A])])},[e,n,O]),M=()=>{n(O.map(L=>L))},T=()=>{n([])};return l.jsxs("div",{className:"tw-space-y-2",children:[l.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(ne.Section).map(L=>l.jsx(fT,{section:L,availableBookIds:O,selectedBookIds:e,onToggle:N,localizedStrings:r},L))}),l.jsxs(Eo,{open:C,onOpenChange:L=>{E(L),L||S("")},children:[l.jsx(ko,{asChild:!0,children:l.jsxs(ge,{variant:"outline",role:"combobox","aria-expanded":C,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${s}: ${e.length}`:i,l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(qr,{className:"tw-w-full tw-p-0",align:"start",children:l.jsxs(_o,{shouldFilter:!1,onKeyDown:L=>{L.key==="Enter"&&(P.current=L.shiftKey)},children:[l.jsx(us,{placeholder:a,value:_,onValueChange:S}),l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:M,children:c}),l.jsx(ge,{variant:"ghost",size:"sm",onClick:T,children:u})]}),l.jsxs(Co,{children:[l.jsx(oi,{children:d}),Object.values(ne.Section).map((L,A)=>{const D=F[L];if(D.length!==0)return l.jsxs(w.Fragment,{children:[l.jsx(ur,{heading:jf(L,f,h,b,x),children:D.map($=>l.jsx(Lf,{bookId:$,isSelected:e.includes($),onSelect:()=>B($),onMouseDown:z=>W(z,$),section:ne.getSectionForBook($),showCheck:!0,localizedBookNames:o,commandValue:Ul($,o),className:"tw-flex tw-items-center"},$))}),A<Object.values(ne.Section).length-1&&l.jsx(Tf,{})]},L)})]})]})})]}),e.length>0&&l.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Il?Il:hf).map(L=>l.jsx(Yo,{className:"hover:tw-bg-secondary",variant:"secondary",children:Uo(L,o)},L)),e.length>Il&&l.jsx(Yo,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-hf} ${p}`})]})]})}const wT=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),eo=(t,e)=>t[e]??e;function mT({scope:t,availableScopes:e,onScopeChange:n,availableBookInfo:r,selectedBookIds:o,onSelectedBookIdsChange:s,localizedStrings:i,localizedBookNames:a,id:c}){const u=eo(i,"%webView_scope_selector_selected_text%"),d=eo(i,"%webView_scope_selector_current_verse%"),p=eo(i,"%webView_scope_selector_current_chapter%"),f=eo(i,"%webView_scope_selector_current_book%"),h=eo(i,"%webView_scope_selector_choose_books%"),b=eo(i,"%webView_scope_selector_scope%"),x=eo(i,"%webView_scope_selector_select_books%"),C=[{value:"selectedText",label:u,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],E=e?C.filter(_=>e.includes(_.value)):C;return l.jsxs("div",{id:c,className:"tw-grid tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:b}),l.jsx(ka,{value:t,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:E.map(({value:_,label:S,id:j})=>l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Fs,{className:"tw-me-2",value:_,id:j}),l.jsx(ht,{htmlFor:j,children:S})]},j))})]}),t==="selectedBooks"&&l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:x}),l.jsx(hT,{availableBookInfo:r,selectedBookIds:o,onChangeSelectedBookIds:s,localizedStrings:i,localizedBookNames:a})]})]})}const Ll={[ne.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ne.getLocalizeKeyForScrollGroupId(0)]:"A",[ne.getLocalizeKeyForScrollGroupId(1)]:"B",[ne.getLocalizeKeyForScrollGroupId(2)]:"C",[ne.getLocalizeKeyForScrollGroupId(3)]:"D",[ne.getLocalizeKeyForScrollGroupId(4)]:"E",[ne.getLocalizeKeyForScrollGroupId(5)]:"F",[ne.getLocalizeKeyForScrollGroupId(6)]:"G",[ne.getLocalizeKeyForScrollGroupId(7)]:"H",[ne.getLocalizeKeyForScrollGroupId(8)]:"I",[ne.getLocalizeKeyForScrollGroupId(9)]:"J",[ne.getLocalizeKeyForScrollGroupId(10)]:"K",[ne.getLocalizeKeyForScrollGroupId(11)]:"L",[ne.getLocalizeKeyForScrollGroupId(12)]:"M",[ne.getLocalizeKeyForScrollGroupId(13)]:"N",[ne.getLocalizeKeyForScrollGroupId(14)]:"O",[ne.getLocalizeKeyForScrollGroupId(15)]:"P",[ne.getLocalizeKeyForScrollGroupId(16)]:"Q",[ne.getLocalizeKeyForScrollGroupId(17)]:"R",[ne.getLocalizeKeyForScrollGroupId(18)]:"S",[ne.getLocalizeKeyForScrollGroupId(19)]:"T",[ne.getLocalizeKeyForScrollGroupId(20)]:"U",[ne.getLocalizeKeyForScrollGroupId(21)]:"V",[ne.getLocalizeKeyForScrollGroupId(22)]:"W",[ne.getLocalizeKeyForScrollGroupId(23)]:"X",[ne.getLocalizeKeyForScrollGroupId(24)]:"Y",[ne.getLocalizeKeyForScrollGroupId(25)]:"Z"};function gT({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:n,localizedStrings:r={},size:o="sm",className:s,id:i}){const a={...Ll,...Object.fromEntries(Object.entries(r).map(([u,d])=>[u,u===d&&u in Ll?Ll[u]:d]))},c=Ct();return l.jsxs(uo,{value:`${e}`,onValueChange:u=>n(u==="undefined"?void 0:parseInt(u,10)),children:[l.jsx(Mr,{size:o,className:K("pr-twp tw-w-auto",s),children:l.jsx(po,{placeholder:a[ne.getLocalizeKeyForScrollGroupId(e)]??e})}),l.jsx(Rr,{id:i,align:c==="rtl"?"end":"start",style:{zIndex:250},children:t.map(u=>l.jsx(cn,{value:`${u}`,children:a[ne.getLocalizeKeyForScrollGroupId(u)]},`${u}`))})]})}function bT({children:t}){return l.jsx("div",{className:"pr-twp tw-grid",children:t})}function vT({primary:t,secondary:e,children:n,isLoading:r=!1,loadingMessage:o}){return l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),l.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),r?l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):l.jsx("div",{children:n})]})}function xT({primary:t,secondary:e,includeSeparator:n=!1}){return l.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),n?l.jsx(co,{}):""]})}function Eg(t,e){var n;return(n=Object.entries(t).find(([,r])=>"menuItem"in r&&r.menuItem===e))==null?void 0:n[0]}function _a({icon:t,menuLabel:e,leading:n}){return t?l.jsx("img",{className:K("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:t,alt:`${n?"Leading":"Trailing"} icon for ${e}`}):void 0}const kg=(t,e,n,r)=>n?Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order).flatMap(([s])=>e.filter(a=>a.group===s).sort((a,c)=>a.order-c.order).map(a=>l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:"command"in a?l.jsxs(Sa,{onClick:()=>{r(a)},children:[a.iconPathBefore&&l.jsx(_a,{icon:a.iconPathBefore,menuLabel:a.label,leading:!0}),a.label,a.iconPathAfter&&l.jsx(_a,{icon:a.iconPathAfter,menuLabel:a.label})]},`dropdown-menu-item-${a.label}-${a.command}`):l.jsxs(xh,{children:[l.jsx(Vc,{children:a.label}),l.jsx(vh,{children:l.jsx(Hc,{children:kg(t,e,Eg(t,a.id),r)})})]},`dropdown-menu-sub-${a.label}-${a.id}`)}),a.tooltip&&l.jsx(Yn,{children:a.tooltip})]},`tooltip-${a.label}-${"command"in a?a.command:a.id}`))):void 0;function Ca({onSelectMenuItem:t,menuData:e,tabLabel:n,icon:r,className:o,variant:s,buttonVariant:i="ghost",id:a}){return l.jsxs(Ur,{variant:s,children:[l.jsx(No,{"aria-label":n,className:o,asChild:!0,id:a,children:l.jsx(ge,{variant:i,size:"icon",children:r??l.jsx(se.MenuIcon,{})})}),l.jsx(wr,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,c])=>typeof c=="object").sort(([,c],[,u])=>typeof c=="boolean"||typeof u=="boolean"?0:c.order-u.order).map(([c],u,d)=>l.jsxs(w.Fragment,{children:[l.jsx(Uc,{children:l.jsx(Kn,{children:kg(e.groups,e.items,c,t)})}),u<d.length-1&&l.jsx(To,{})]},c))})]})}const Ng=w.forwardRef(({id:t,className:e,children:n},r)=>l.jsx("div",{ref:r,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:n}));function yT({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:n,tabViewMenuData:r,id:o,className:s,startAreaChildren:i,centerAreaChildren:a,endAreaChildren:c,menuButtonIcon:u}){return l.jsxs(Ng,{className:`tw-w-full tw-border ${s}`,id:o,children:[n&&l.jsx(Ca,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:u??l.jsx(se.Menu,{}),buttonVariant:"ghost"}),i&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),a&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:a}),l.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[r&&l.jsx(Ca,{onSelectMenuItem:e,menuData:r,tabLabel:"View Info",icon:l.jsx(se.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}function _T({onSelectProjectMenuItem:t,projectMenuData:e,id:n,className:r,menuButtonIcon:o}){return l.jsx(Ng,{className:"tw-pointer-events-none",id:n,children:e&&l.jsx(Ca,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:o,className:`tw-pointer-events-auto tw-shadow-lg ${r}`,buttonVariant:"outline"})})}const Vu=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsx(Jt.Root,{orientation:"vertical",ref:n,className:K("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:r})});Vu.displayName=Jt.List.displayName;const Hu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.List,{ref:n,className:K("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Hu.displayName=Jt.List.displayName;const Tg=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,...e,className:K("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),zu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:K("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));zu.displayName=Jt.Content.displayName;function CT({tabList:t,searchValue:e,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s,id:i}){return l.jsxs("div",{id:i,className:"pr-twp",children:[l.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?l.jsx("h1",{children:o}):"",l.jsx(Ha,{className:s,value:e,onSearch:n,placeholder:r})]}),l.jsxs(Vu,{children:[l.jsx(Hu,{children:t.map(a=>l.jsx(Tg,{value:a.value,children:a.value},a.key))}),t.map(a=>l.jsx(zu,{value:a.value,children:a.content},a.key))]})]})}function ET({...t}){return l.jsx(Ke.Menu,{...t})}function kT({...t}){return l.jsx(Ke.Sub,{"data-slot":"menubar-sub",...t})}const Sg=w.forwardRef(({className:t,variant:e="default",...n},r)=>{const o=w.useMemo(()=>({variant:e}),[e]);return l.jsx(qc.Provider,{value:o,children:l.jsx(Ke.Root,{ref:r,className:K("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...n})})});Sg.displayName=Ke.Root.displayName;const Ag=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.Trigger,{ref:n,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",hr({variant:r.variant,className:t})),...e})});Ag.displayName=Ke.Trigger.displayName;const Dg=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ke.SubTrigger,{ref:o,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",hr({variant:s.variant,className:t}),t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Dg.displayName=Ke.SubTrigger.displayName;const Mg=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.SubContent,{ref:n,className:K("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},t),...e})});Mg.displayName=Ke.SubContent.displayName;const Rg=w.forwardRef(({className:t,align:e="start",alignOffset:n=-4,sideOffset:r=8,...o},s)=>{const i=On();return l.jsx(Ke.Portal,{children:l.jsx(Ke.Content,{ref:s,align:e,alignOffset:n,sideOffset:r,className:K("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...o})})});Rg.displayName=Ke.Content.displayName;const Og=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=On();return l.jsx(Ke.Item,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",hr({variant:o.variant,className:t}),t),...n})});Og.displayName=Ke.Item.displayName;const NT=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ke.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",hr({variant:s.variant,className:t}),t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});NT.displayName=Ke.CheckboxItem.displayName;const TT=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ke.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",hr({variant:o.variant,className:t}),t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});TT.displayName=Ke.RadioItem.displayName;const ST=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ke.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));ST.displayName=Ke.Label.displayName;const jg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ke.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));jg.displayName=Ke.Separator.displayName;const Ms=(t,e)=>{setTimeout(()=>{e.forEach(n=>{var r;(r=t.current)==null||r.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},Ig=(t,e,n,r)=>{if(!n)return;const o=Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order);return o.flatMap(([s],i)=>{const a=e.filter(u=>u.group===s).sort((u,d)=>u.order-d.order).map(u=>l.jsxs(lr,{children:[l.jsx(Ar,{asChild:!0,children:"command"in u?l.jsxs(Og,{onClick:()=>{r(u)},children:[u.iconPathBefore&&l.jsx(_a,{icon:u.iconPathBefore,menuLabel:u.label,leading:!0}),u.label,u.iconPathAfter&&l.jsx(_a,{icon:u.iconPathAfter,menuLabel:u.label})]},`menubar-item-${u.label}-${u.command}`):l.jsxs(kT,{children:[l.jsx(Dg,{children:u.label}),l.jsx(Mg,{children:Ig(t,e,Eg(t,u.id),r)})]},`menubar-sub-${u.label}-${u.id}`)}),u.tooltip&&l.jsx(Yn,{children:u.tooltip})]},`tooltip-${u.label}-${"command"in u?u.command:u.id}`)),c=[...a];return a.length>0&&i<o.length-1&&c.push(l.jsx(jg,{},`separator-${s}`)),c})};function AT({menuData:t,onSelectMenuItem:e,onOpenChange:n,variant:r}){const o=w.useRef(void 0),s=w.useRef(void 0),i=w.useRef(void 0),a=w.useRef(void 0),c=w.useRef(void 0),u=d=>{switch(d){case"platform.app":return s;case"platform.window":return i;case"platform.layout":return a;case"platform.help":return c;default:return}};if(Nb.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(d,p)=>{var b,x,C,E;d.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":Ms(s,[f]);break;case"alt+p":(b=s.current)==null||b.focus(),Ms(s,[f,h]);break;case"alt+l":(x=i.current)==null||x.focus(),Ms(i,[f,h]);break;case"alt+n":(C=a.current)==null||C.focus(),Ms(a,[f,h]);break;case"alt+h":(E=c.current)==null||E.focus(),Ms(c,[f,h]);break}}),w.useEffect(()=>{if(!n||!o.current)return;const d=new MutationObserver(h=>{h.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const x=b.target.getAttribute("data-state");n(x==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(h=>{d.observe(h,{attributes:!0})}),()=>d.disconnect()},[n]),!!t)return l.jsx(Sg,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:r,children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,p])=>typeof d=="boolean"||typeof p=="boolean"?0:d.order-p.order).map(([d,p])=>l.jsxs(ET,{children:[l.jsx(Ag,{ref:u(d),children:typeof p=="object"&&"label"in p&&p.label}),l.jsx(Rg,{className:"tw-z-[250]",children:l.jsx(Kn,{children:Ig(t.groups,t.items,d,e)})})]},d))})}function DT(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function MT({menuData:t,onOpenChange:e,onSelectMenuItem:n,className:r,id:o,children:s,appMenuAreaChildren:i,configAreaChildren:a,shouldUseAsAppDragArea:c,menubarVariant:u="default"}){const d=w.useRef(void 0);return l.jsx("div",{className:K("tw-border tw-px-4 tw-text-foreground",r),ref:d,style:{position:"relative"},id:o,children:l.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[l.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&l.jsx(AT,{menuData:t,onOpenChange:e,onSelectMenuItem:n,variant:u})]})}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:s}),l.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:l.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:a})})]})})}const RT=(t,e)=>t[e]??e;function OT({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:a,id:c}){const u=RT(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[d,p]=w.useState(!1),f=b=>{o&&o(b),r&&r([b,...n.filter(x=>x!==b)]),s&&n.find(x=>x===b)&&s([...n.filter(x=>x!==b)]),p(!1)},h=(b,x)=>{var E,_,S,j,P,O;const C=x!==b?((_=(E=t[b])==null?void 0:E.uiNames)==null?void 0:_[x])??((j=(S=t[b])==null?void 0:S.uiNames)==null?void 0:j.en):void 0;return C?`${(P=t[b])==null?void 0:P.autonym} (${C})`:(O=t[b])==null?void 0:O.autonym};return l.jsxs("div",{id:c,className:K("pr-twp tw-max-w-sm",a),children:[l.jsxs(uo,{name:"uiLanguage",value:e,onValueChange:f,open:d,onOpenChange:b=>p(b),children:[l.jsx(Mr,{children:l.jsx(po,{})}),l.jsx(Rr,{className:"tw-z-[250]",children:Object.keys(t).map(b=>l.jsx(cn,{value:b,children:h(b,e)},b))})]}),e!=="en"&&l.jsx("div",{className:"tw-pt-3",children:l.jsx(ht,{className:"tw-font-normal tw-text-muted-foreground",children:ne.formatReplacementString(u,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(b=>h(b,e)).join(", "):t.en.autonym})})})]})}function jT({item:t,createLabel:e,createComplexLabel:n}){return e?l.jsx(ht,{children:e(t)}):n?l.jsx(ht,{children:n(t)}):l.jsx(ht,{children:t})}function IT({id:t,className:e,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s,createComplexLabel:i}){return l.jsx("div",{id:t,className:e,children:n.map(a=>l.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[l.jsx(Ua,{className:"tw-me-2 tw-align-middle",checked:r.includes(a),onCheckedChange:c=>o(a,c)}),l.jsx(jT,{item:a,createLabel:s,createComplexLabel:i})]},a))})}function LT({cardKey:t,isSelected:e,onSelect:n,isDenied:r,isHidden:o=!1,className:s,children:i,dropdownContent:a,additionalSelectedContent:c,accentColor:u}){const d=p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),n())};return l.jsxs("div",{hidden:o,onClick:n,onKeyDown:d,role:"button",tabIndex:0,"aria-pressed":e,className:K("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":r&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},s),children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[l.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[l.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&a&&l.jsxs(Ur,{children:[l.jsx(No,{className:K(u&&"tw-me-1"),asChild:!0,children:l.jsx(ge,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.MoreHorizontal,{})})}),l.jsx(wr,{align:"end",children:a})]})]}),e&&c&&l.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:c})]}),u&&l.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`})]},t)}const Lg=w.forwardRef(({className:t,...e},n)=>l.jsx(se.LoaderCircle,{size:35,className:K("tw-animate-spin",t),...e,ref:n}));Lg.displayName="Spinner";function PT({id:t,isDisabled:e=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:a=!1,className:c,defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}){return l.jsxs("div",{className:K("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[l.jsx(ht,{htmlFor:t,className:K({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${a?"*":""}`}),l.jsx(Mo,{id:t,disabled:e,placeholder:i,required:a,className:K(c,{"tw-border-red-600":n}),defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}),l.jsx("p",{className:K({"tw-hidden":!o}),children:o})]})}const $T=Fr.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Pg=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:K("pr-twp",$T({variant:e}),t),...n}));Pg.displayName="Alert";const $g=w.forwardRef(({className:t,...e},n)=>l.jsxs("h5",{ref:n,className:K("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));$g.displayName="AlertTitle";const Fg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Fg.displayName="AlertDescription";const FT=Ye.Root,BT=Ye.Trigger,qT=Ye.Group,UT=Ye.Portal,VT=Ye.Sub,HT=Ye.RadioGroup,Bg=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>l.jsxs(Ye.SubTrigger,{ref:o,className:K("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Bg.displayName=Ye.SubTrigger.displayName;const qg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.SubContent,{ref:n,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));qg.displayName=Ye.SubContent.displayName;const Ug=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Portal,{children:l.jsx(Ye.Content,{ref:n,className:K("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Ug.displayName=Ye.Content.displayName;const Vg=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Item,{ref:r,className:K("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...n}));Vg.displayName=Ye.Item.displayName;const Hg=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>l.jsxs(Ye.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Hg.displayName=Ye.CheckboxItem.displayName;const zg=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(Ye.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));zg.displayName=Ye.RadioItem.displayName;const Gg=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...n}));Gg.displayName=Ye.Label.displayName;const Kg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Kg.displayName=Ye.Separator.displayName;function Yg({className:t,...e}){return l.jsx("span",{className:K("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Yg.displayName="ContextMenuShortcut";const Wg=w.createContext({direction:"bottom"});function Jg({shouldScaleBackground:t=!0,direction:e="bottom",...n}){const r=w.useMemo(()=>({direction:e}),[e]);return l.jsx(Wg.Provider,{value:r,children:l.jsx(Rn.Drawer.Root,{shouldScaleBackground:t,direction:e,...n})})}Jg.displayName="Drawer";const zT=Rn.Drawer.Trigger,Xg=Rn.Drawer.Portal,GT=Rn.Drawer.Close,Gu=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Overlay,{ref:n,className:K("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Gu.displayName=Rn.Drawer.Overlay.displayName;const Qg=w.forwardRef(({className:t,children:e,hideDrawerHandle:n=!1,...r},o)=>{const{direction:s="bottom"}=w.useContext(Wg),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},a={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return l.jsxs(Xg,{children:[l.jsx(Gu,{}),l.jsxs(Rn.Drawer.Content,{ref:o,className:K("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",s==="bottom"||s==="top"?"tw-flex-col":"tw-flex-row",i[s],t),...r,children:[!n&&(s==="bottom"||s==="right")&&l.jsx("div",{className:a[s]}),l.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!n&&(s==="top"||s==="left")&&l.jsx("div",{className:a[s]})]})]})});Qg.displayName="DrawerContent";function Zg({className:t,...e}){return l.jsx("div",{className:K("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Zg.displayName="DrawerHeader";function eb({className:t,...e}){return l.jsx("div",{className:K("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}eb.displayName="DrawerFooter";const tb=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Title,{ref:n,className:K("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));tb.displayName=Rn.Drawer.Title.displayName;const nb=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Description,{ref:n,className:K("tw-text-sm tw-text-muted-foreground",t),...e}));nb.displayName=Rn.Drawer.Description.displayName;const rb=w.forwardRef(({className:t,value:e,...n},r)=>l.jsx(Bl.Root,{ref:r,className:K("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...n,children:l.jsx(Bl.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));rb.displayName=Bl.Root.displayName;function KT({className:t,...e}){return l.jsx(kc.PanelGroup,{className:K("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const YT=kc.Panel;function WT({withHandle:t,className:e,...n}){return l.jsx(kc.PanelResizeHandle,{className:K("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...n,children:t&&l.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:l.jsx(se.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function JT({...t}){return l.jsx(vf.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ob=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsxs(Rs.Root,{ref:n,className:K("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:r,children:[l.jsx(Rs.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:l.jsx(Rs.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),l.jsx(Rs.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ob.displayName=Rs.Root.displayName;const sb=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsx(ql.Root,{className:K("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:n,children:l.jsx(ql.Thumb,{className:K("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});sb.displayName=ql.Root.displayName;const XT=Jt.Root,ib=w.forwardRef(({className:t,...e},n)=>{const r=Ct();return l.jsx(Jt.List,{ref:n,className:K("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:r})});ib.displayName=Jt.List.displayName;const ab=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,className:K("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ab.displayName=Jt.Trigger.displayName;const lb=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:K("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));lb.displayName=Jt.Content.displayName;const cb=w.forwardRef(({className:t,...e},n)=>l.jsx("textarea",{className:K("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:n,...e}));cb.displayName="Textarea";const QT=(t,e)=>{w.useEffect(()=>{if(!t)return()=>{};const n=t(e);return()=>{n()}},[t,e])};function ZT(t){return{preserveValue:!0,...t}}const ub=(t,e,n={})=>{const r=w.useRef(e);r.current=e;const o=w.useRef(n);o.current=ZT(o.current);const[s,i]=w.useState(()=>r.current),[a,c]=w.useState(!0);return w.useEffect(()=>{let u=!0;return c(!!t),(async()=>{if(t){const d=await t();u&&(i(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||i(()=>r.current)}},[t]),[s,a]},Pl=()=>!1,eS=(t,e)=>{const[n]=ub(w.useCallback(async()=>{if(!t)return Pl;const r=await Promise.resolve(t(e));return async()=>r()},[e,t]),Pl,{preserveValue:!1});w.useEffect(()=>()=>{n!==Pl&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>vf.toast});exports.Alert=Pg;exports.AlertDescription=Fg;exports.AlertTitle=$g;exports.Avatar=Fc;exports.AvatarFallback=Bc;exports.AvatarImage=bh;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=r0;exports.BOOK_SELECTOR_STRING_KEYS=i0;exports.Badge=Yo;exports.BookChapterControl=n0;exports.BookSelectionMode=Bf;exports.BookSelector=a0;exports.Button=ge;exports.COMMENT_LIST_STRING_KEYS=l0;exports.Card=Ta;exports.CardContent=$c;exports.CardDescription=mh;exports.CardFooter=gh;exports.CardHeader=hh;exports.CardTitle=wh;exports.ChapterRangeSelector=Ff;exports.Checkbox=Ua;exports.Checklist=IT;exports.ComboBox=Qi;exports.Command=_o;exports.CommandEmpty=oi;exports.CommandGroup=ur;exports.CommandInput=us;exports.CommandItem=Br;exports.CommandList=Co;exports.CommentList=ev;exports.ContextMenu=FT;exports.ContextMenuCheckboxItem=Hg;exports.ContextMenuContent=Ug;exports.ContextMenuGroup=qT;exports.ContextMenuItem=Vg;exports.ContextMenuLabel=Gg;exports.ContextMenuPortal=UT;exports.ContextMenuRadioGroup=HT;exports.ContextMenuRadioItem=zg;exports.ContextMenuSeparator=Kg;exports.ContextMenuShortcut=Yg;exports.ContextMenuSub=VT;exports.ContextMenuSubContent=qg;exports.ContextMenuSubTrigger=Bg;exports.ContextMenuTrigger=BT;exports.DataTable=Ah;exports.Drawer=Jg;exports.DrawerClose=GT;exports.DrawerContent=Qg;exports.DrawerDescription=nb;exports.DrawerFooter=eb;exports.DrawerHeader=Zg;exports.DrawerOverlay=Gu;exports.DrawerPortal=Xg;exports.DrawerTitle=tb;exports.DrawerTrigger=zT;exports.DropdownMenu=Ur;exports.DropdownMenuCheckboxItem=cr;exports.DropdownMenuContent=wr;exports.DropdownMenuGroup=Uc;exports.DropdownMenuItem=Sa;exports.DropdownMenuItemType=Rh;exports.DropdownMenuLabel=ps;exports.DropdownMenuPortal=vh;exports.DropdownMenuRadioGroup=yh;exports.DropdownMenuRadioItem=zc;exports.DropdownMenuSeparator=To;exports.DropdownMenuShortcut=_h;exports.DropdownMenuSub=xh;exports.DropdownMenuSubContent=Hc;exports.DropdownMenuSubTrigger=Vc;exports.DropdownMenuTrigger=No;exports.ERROR_DUMP_STRING_KEYS=Dh;exports.ERROR_POPOVER_STRING_KEYS=lv;exports.ErrorDump=Mh;exports.ErrorPopover=cv;exports.FOOTNOTE_EDITOR_STRING_KEYS=PN;exports.FOOTNOTE_LIST_STRING_KEYS=BN;exports.Filter=hv;exports.FilterDropdown=uv;exports.Footer=fv;exports.FootnoteEditor=LN;exports.FootnoteItem=sg;exports.FootnoteList=UN;exports.INVENTORY_STRING_KEYS=XN;exports.Input=Mo;exports.Inventory=eT;exports.Label=ht;exports.MarkdownRenderer=av;exports.MoreInfo=dv;exports.MultiSelectComboBox=Oh;exports.NavigationContentSearch=CT;exports.Popover=Eo;exports.PopoverAnchor=Xb;exports.PopoverContent=qr;exports.PopoverTrigger=ko;exports.Progress=rb;exports.RadioGroup=ka;exports.RadioGroupItem=Fs;exports.RecentSearches=$f;exports.ResizableHandle=WT;exports.ResizablePanel=YT;exports.ResizablePanelGroup=KT;exports.ResultsCard=LT;exports.SCOPE_SELECTOR_STRING_KEYS=wT;exports.ScopeSelector=mT;exports.ScriptureResultsViewer=pT;exports.ScrollGroupSelector=gT;exports.SearchBar=Ha;exports.Select=uo;exports.SelectContent=Rr;exports.SelectGroup=Ch;exports.SelectItem=cn;exports.SelectLabel=kh;exports.SelectScrollDownButton=Kc;exports.SelectScrollUpButton=Gc;exports.SelectSeparator=Nh;exports.SelectTrigger=Mr;exports.SelectValue=po;exports.Separator=co;exports.SettingsList=bT;exports.SettingsListHeader=xT;exports.SettingsListItem=vT;exports.SettingsSidebar=yg;exports.SettingsSidebarContentSearch=oT;exports.Sidebar=Lu;exports.SidebarContent=$u;exports.SidebarFooter=pg;exports.SidebarGroup=va;exports.SidebarGroupAction=hg;exports.SidebarGroupContent=ya;exports.SidebarGroupLabel=xa;exports.SidebarHeader=dg;exports.SidebarInput=ug;exports.SidebarInset=Pu;exports.SidebarMenu=Fu;exports.SidebarMenuAction=wg;exports.SidebarMenuBadge=mg;exports.SidebarMenuButton=qu;exports.SidebarMenuItem=Bu;exports.SidebarMenuSkeleton=gg;exports.SidebarMenuSub=bg;exports.SidebarMenuSubButton=xg;exports.SidebarMenuSubItem=vg;exports.SidebarProvider=Iu;exports.SidebarRail=cg;exports.SidebarSeparator=fg;exports.SidebarTrigger=lg;exports.Skeleton=Zi;exports.Slider=ob;exports.Sonner=JT;exports.Spinner=Lg;exports.Switch=sb;exports.TabDropdownMenu=Ca;exports.TabFloatingMenu=_T;exports.TabToolbar=yT;exports.Table=ai;exports.TableBody=ci;exports.TableCaption=Sh;exports.TableCell=Dr;exports.TableFooter=Th;exports.TableHead=Wo;exports.TableHeader=li;exports.TableRow=Gn;exports.Tabs=XT;exports.TabsContent=lb;exports.TabsList=ib;exports.TabsTrigger=ab;exports.TextField=PT;exports.Textarea=cb;exports.ToggleGroup=Na;exports.ToggleGroupItem=Vo;exports.Toolbar=MT;exports.Tooltip=lr;exports.TooltipContent=Yn;exports.TooltipProvider=Kn;exports.TooltipTrigger=Ar;exports.UiLanguageSelector=OT;exports.VerticalTabs=Vu;exports.VerticalTabsContent=zu;exports.VerticalTabsList=Hu;exports.VerticalTabsTrigger=Tg;exports.badgeVariants=fh;exports.buttonVariants=Pf;exports.cn=K;exports.getBookIdFromUSFM=JN;exports.getLinesFromUSFM=YN;exports.getNumberFromUSFM=WN;exports.getStatusForItem=ig;exports.getToolbarOSReservedSpaceClassName=DT;exports.inventoryCountColumn=GN;exports.inventoryItemColumn=HN;exports.inventoryStatusColumn=KN;exports.selectTriggerVariants=Eh;exports.useEvent=QT;exports.useEventAsync=eS;exports.useListbox=qf;exports.usePromise=ub;exports.useRecentSearches=Qb;exports.useSidebar=bi;function tS(t,e="top"){if(!t||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),e==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}tS(`*, ::before, ::after {
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
