"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),w=require("react"),Wt=require("cmdk"),se=require("lucide-react"),ob=require("clsx"),sb=require("tailwind-merge"),ib=require("@radix-ui/react-dialog"),ne=require("platform-bible-utils"),Jo=require("@radix-ui/react-slot"),Dr=require("class-variance-authority"),ab=require("@radix-ui/react-popover"),lb=require("@radix-ui/react-label"),cb=require("@radix-ui/react-radio-group"),ub=require("@radix-ui/react-separator"),m=require("lexical"),db=require("@radix-ui/react-tooltip"),Il=require("@lexical/rich-text"),fn=require("react-dom"),gf=require("@lexical/table"),pb=require("@radix-ui/react-toggle-group"),fb=require("@radix-ui/react-toggle"),hb=require("markdown-to-jsx"),wb=require("@radix-ui/react-avatar"),Ft=require("@tanstack/react-table"),mf=require("@radix-ui/react-dropdown-menu"),gb=require("@radix-ui/react-select"),mb=require("@radix-ui/react-checkbox"),bb=require("@radix-ui/react-tabs"),vb=require("@radix-ui/react-menubar"),xb=require("react-hotkeys-hook"),yb=require("@radix-ui/react-context-menu"),Rn=require("vaul"),_b=require("@radix-ui/react-progress"),Cb=require("react-resizable-panels"),bf=require("sonner"),Eb=require("@radix-ui/react-slider"),kb=require("@radix-ui/react-switch");function st(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const n in t)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:()=>t[n]})}}return e.default=t,Object.freeze(e)}const Ao=st(w),Sn=st(ib),Io=st(ab),vf=st(lb),Ss=st(cb),xf=st(ub),Gs=st(db),Nb=st(fn),ba=st(pb),yf=st(fb),Xo=st(wb),Ge=st(mf),rt=st(gb),Ll=st(mb),Jt=st(bb),Ke=st(vb),Ye=st(yb),Pl=st(_b),yc=st(Cb),_s=st(Eb),$l=st(kb),Tb=sb.extendTailwindMerge({prefix:"tw-"});function z(...t){return Tb(ob.clsx(t))}const Sb="layoutDirection";function _t(){const t=localStorage.getItem(Sb);return t==="rtl"?t:"ltr"}const Ab=Sn.Root,Db=Sn.Portal,_f=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Overlay,{ref:n,className:z("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));_f.displayName=Sn.Overlay.displayName;const Cf=w.forwardRef(({className:t,children:e,...n},r)=>{const o=_t();return l.jsxs(Db,{children:[l.jsx(_f,{}),l.jsxs(Sn.Content,{ref:r,className:z("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...n,dir:o,children:[e,l.jsxs(Sn.Close,{className:z("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Cf.displayName=Sn.Content.displayName;function Ef({className:t,...e}){return l.jsx("div",{className:z("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Ef.displayName="DialogHeader";const kf=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Title,{ref:n,className:z("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));kf.displayName=Sn.Title.displayName;const Mb=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Description,{ref:n,className:z("tw-text-sm tw-text-muted-foreground",t),...e}));Mb.displayName=Sn.Description.displayName;const fo=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command,{ref:n,className:z("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));fo.displayName=Wt.Command.displayName;const Qo=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[l.jsx(se.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),l.jsx(Wt.Command.Input,{ref:n,className:z("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Qo.displayName=Wt.Command.Input.displayName;const ho=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.List,{ref:n,className:z("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));ho.displayName=Wt.Command.List.displayName;const Ks=w.forwardRef((t,e)=>l.jsx(Wt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ks.displayName=Wt.Command.Empty.displayName;const ir=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Group,{ref:n,className:z("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));ir.displayName=Wt.Command.Group.displayName;const Nf=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Separator,{ref:n,className:z("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Nf.displayName=Wt.Command.Separator.displayName;const Mr=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Item,{ref:n,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Mr.displayName=Wt.Command.Item.displayName;var Rb=Object.defineProperty,Ob=(t,e,n)=>e in t?Rb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Te=(t,e,n)=>Ob(t,typeof e!="symbol"?e+"":e,n);const Xr=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],_c=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Tf=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Yu=Vb();function Zo(t,e=!0){return e&&(t=t.toUpperCase()),t in Yu?Yu[t]:0}function Cc(t){return Zo(t)>0}function jb(t){const e=typeof t=="string"?Zo(t):t;return e>=40&&e<=66}function Ib(t){return(typeof t=="string"?Zo(t):t)<=39}function Sf(t){return t<=66}function Lb(t){const e=typeof t=="string"?Zo(t):t;return Mf(e)&&!Sf(e)}function*Pb(){for(let t=1;t<=Xr.length;t++)yield t}const $b=1,Af=Xr.length;function Fb(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ec(t,e="***"){const n=t-1;return n<0||n>=Xr.length?e:Xr[n]}function Df(t){return t<=0||t>Af?"******":Tf[t-1]}function Bb(t){return Df(Zo(t))}function Mf(t){const e=typeof t=="number"?Ec(t):t;return Cc(e)&&!_c.includes(e)}function qb(t){const e=typeof t=="number"?Ec(t):t;return Cc(e)&&_c.includes(e)}function Ub(t){return Tf[t-1].includes("*obsolete*")}function Vb(){const t={};for(let e=0;e<Xr.length;e++)t[Xr[e]]=e+1;return t}const $e={allBookIds:Xr,nonCanonicalIds:_c,bookIdToNumber:Zo,isBookIdValid:Cc,isBookNT:jb,isBookOT:Ib,isBookOTNT:Sf,isBookDC:Lb,allBookNumbers:Pb,firstBook:$b,lastBook:Af,extraBooks:Fb,bookNumberToId:Ec,bookNumberToEnglishName:Df,bookIdToEnglishName:Bb,isCanonical:Mf,isExtraMaterial:qb,isObsolete:Ub};var Un=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Un||{});const an=class{constructor(e){if(Te(this,"name"),Te(this,"fullPath"),Te(this,"isPresent"),Te(this,"hasVerseSegments"),Te(this,"isCustomized"),Te(this,"baseVersification"),Te(this,"scriptureBooks"),Te(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=Un[e]):(this._type=e,this.name=Un[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};Te(an,"Original",new an(Un.Original)),Te(an,"Septuagint",new an(Un.Septuagint)),Te(an,"Vulgate",new an(Un.Vulgate)),Te(an,"English",new an(Un.English)),Te(an,"RussianProtestant",new an(Un.RussianProtestant)),Te(an,"RussianOrthodox",new an(Un.RussianOrthodox));let zr=an;function Wu(t,e){const n=e[0];for(let r=1;r<e.length;r++)t=t.split(e[r]).join(n);return t.split(n)}var Rf=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Rf||{});const Gt=class Re{constructor(e,n,r,o){if(Te(this,"firstChapter"),Te(this,"lastChapter"),Te(this,"lastVerse"),Te(this,"hasSegmentsDefined"),Te(this,"text"),Te(this,"BBBCCCVVVS"),Te(this,"longHashCode"),Te(this,"versification"),Te(this,"rtlMark","‏"),Te(this,"_bookNum",0),Te(this,"_chapterNum",0),Te(this,"_verseNum",0),Te(this,"_verse"),r==null&&o==null)if(e!=null&&typeof e=="string"){const s=e,i=n!=null&&n instanceof zr?n:void 0;this.setEmpty(i),this.parse(s)}else if(e!=null&&typeof e=="number"){const s=n!=null&&n instanceof zr?n:void 0;this.setEmpty(s),this._verseNum=e%Re.chapterDigitShifter,this._chapterNum=Math.floor(e%Re.bookDigitShifter/Re.chapterDigitShifter),this._bookNum=Math.floor(e/Re.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Re){const s=e;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(e==null)return;const s=e instanceof zr?e:Re.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=o??Re.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=new Re(e),{success:!0,verseRef:n}}catch(r){if(r instanceof gs)return n=new Re,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%Re.bcvMaxValue*Re.bookDigitShifter+(n>=0?n%Re.bcvMaxValue*Re.chapterDigitShifter:0)+(r>=0?r%Re.bcvMaxValue:0)}static fromJSON(e){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=e,a=s||o.toString();let c;return i&&(c=new zr(i)),n?new Re(n,r.toString(),a,c):new Re}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<e.length;o++){if(r=e[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>Re.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Re.verseRangeSeparator)||this._verse.includes(Re.verseSequenceIndicator))}get book(){return $e.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=$e.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=Re.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=Re.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>$e.lastBook)throw new gs("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new zr(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Re.verseRangeSeparators,Re.verseSequenceIndicators)}get BBBCCC(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const s=e.split("/");if(e=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new zr(Un[i])}catch{throw new gs("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new gs("Invalid reference : "+e);const r=n[1].split(":"),o=+r[0];if(r.length!==2||$e.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!Re.isVerseParseable(r[1]))throw new gs("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new Re(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete n.verse,n}equals(e){return e instanceof Re?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,n=Re.verseRangeSeparators,r=Re.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Wu(this._verse,r);for(const i of s.map(a=>Wu(a,n))){const a=this.clone();a.verse=i[0];const c=a.verseNum;if(o.push(a),i.length>1){const u=this.clone();if(u.verse=i[1],!e)for(let d=c+1;d<u.verseNum;d++){const p=new Re(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(p)}o.push(u)}}return o}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,e,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>$e.lastBook?2:($e.isCanonical(this._bookNum),0)}setEmpty(e=Re.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=$e.bookIdToNumber(e),this.chapter=n,this.verse=r}};Te(Gt,"defaultVersification",zr.English),Te(Gt,"verseRangeSeparator","-"),Te(Gt,"verseSequenceIndicator",","),Te(Gt,"verseRangeSeparators",[Gt.verseRangeSeparator]),Te(Gt,"verseSequenceIndicators",[Gt.verseSequenceIndicator]),Te(Gt,"chapterDigitShifter",1e3),Te(Gt,"bookDigitShifter",Gt.chapterDigitShifter*Gt.chapterDigitShifter),Te(Gt,"bcvMaxValue",Gt.chapterDigitShifter-1),Te(Gt,"ValidStatusType",Rf);let gs=class extends Error{};const Of=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"Old Testament";case ne.Section.NT:return n??"New Testament";case ne.Section.DC:return r??"Deuterocanon";case ne.Section.Extra:return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Hb=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"OT";case ne.Section.NT:return n??"NT";case ne.Section.DC:return r??"DC";case ne.Section.Extra:return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Do(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedName)??$e.bookIdToEnglishName(t)}function kc(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedId)??t.toUpperCase()}const jf=$e.allBookIds.filter(t=>!$e.isObsolete($e.bookIdToNumber(t))),Yr=Object.fromEntries(jf.map(t=>[t,$e.bookIdToEnglishName(t)]));function Nc(t,e,n){const r=e.trim().toLowerCase();if(!r)return!1;const o=$e.bookIdToEnglishName(t),s=n==null?void 0:n.get(t);return!!(ne.includes(o.toLowerCase(),r)||ne.includes(t.toLowerCase(),r)||(s?ne.includes(s.localizedName.toLowerCase(),r)||ne.includes(s.localizedId.toLowerCase(),r):!1))}const If=w.forwardRef(({bookId:t,isSelected:e,onSelect:n,onMouseDown:r,section:o,className:s,showCheck:i=!1,localizedBookNames:a,commandValue:c},u)=>{const d=w.useRef(!1),p=()=>{d.current||n==null||n(t),setTimeout(()=>{d.current=!1},100)},f=x=>{d.current=!0,r?r(x):n==null||n(t)},h=w.useMemo(()=>Do(t,a),[t,a]),v=w.useMemo(()=>kc(t,a),[t,a]);return l.jsx("div",{className:z("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":o===ne.Section.OT,"tw-border-s-purple-200":o===ne.Section.NT,"tw-border-s-indigo-200":o===ne.Section.DC,"tw-border-s-amber-200":o===ne.Section.Extra}),children:l.jsxs(Mr,{ref:u,value:c||`${t} ${$e.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${$e.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:s,children:[i&&l.jsx(se.Check,{className:z("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),l.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:h}),l.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:v})]})})}),Lf=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=w.forwardRef(({className:t,variant:e,size:n,asChild:r=!1,...o},s)=>{const i=r?Jo.Slot:"button";return l.jsx(i,{className:z(Lf({variant:e,size:n,className:t})),ref:s,...o})});ve.displayName="Button";const wo=Io.Root,go=Io.Trigger,zb=Io.Anchor,Rr=w.forwardRef(({className:t,align:e="center",sideOffset:n=4,...r},o)=>{const s=_t();return l.jsx(Io.Portal,{children:l.jsx(Io.Content,{ref:o,align:e,sideOffset:n,className:z("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,dir:s})})});Rr.displayName=Io.Content.displayName;function Fl(t,e,n){return`${t} ${Yr[t]}${e?` ${kc(t,e)} ${Do(t,e)}`:""}${n?` ${n}`:""}`}function Pf({recentSearches:t,onSearchItemSelect:e,renderItem:n=a=>String(a),getItemKey:r=a=>String(a),ariaLabel:o="Show recent searches",groupHeading:s="Recent",id:i}){const[a,c]=w.useState(!1);if(t.length===0)return;const u=d=>{e(d),c(!1)};return l.jsxs(wo,{open:a,onOpenChange:c,children:[l.jsx(go,{asChild:!0,children:l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":o,children:l.jsx(se.Clock,{className:"tw-h-4 tw-w-4"})})}),l.jsx(Rr,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:l.jsx(fo,{children:l.jsx(ho,{children:l.jsx(ir,{heading:s,children:t.map(d=>l.jsxs(Mr,{onSelect:()=>u(d),className:"tw-flex tw-items-center",children:[l.jsx(se.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),l.jsx("span",{children:n(d)})]},r(d)))})})})})]})}function Gb(t,e,n=(o,s)=>o===s,r=15){return o=>{const s=t.filter(a=>!n(a,o)),i=[o,...s.slice(0,r-1)];e(i)}}const ll={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Kb=[ll.BOOK_ONLY,ll.BOOK_CHAPTER,ll.BOOK_CHAPTER_VERSE];function Ju(t){const e=/^[a-zA-Z]$/.test(t),n=/^[0-9]$/.test(t);return{isLetter:e,isDigit:n}}function zn(t){return ne.getChaptersForBook($e.bookIdToNumber(t))}function Yb(t,e,n){if(!t.trim()||e.length===0)return;const r=Kb.reduce((o,s)=>{if(o)return o;const i=s.exec(t.trim());if(i){const[a,c=void 0,u=void 0]=i.slice(1);let d;const p=e.filter(f=>Nc(f,a,n));if(p.length===1&&([d]=p),!d&&c){if($e.isBookIdValid(a)){const f=a.toUpperCase();e.includes(f)&&(d=f)}if(!d&&n){const f=Array.from(n.entries()).find(([,h])=>h.localizedId.toLowerCase()===a.toLowerCase());f&&e.includes(f[0])&&([d]=f)}}if(!d&&c){const h=(v=>Object.keys(Yr).find(x=>Yr[x].toLowerCase()===v.toLowerCase()))(a);if(h&&e.includes(h)&&(d=h),!d&&n){const v=Array.from(n.entries()).find(([,x])=>x.localizedName.toLowerCase()===a.toLowerCase());v&&e.includes(v[0])&&([d]=v)}}if(d){let f=c?parseInt(c,10):void 0;f&&f>zn(d)&&(f=Math.max(zn(d),1));const h=u?parseInt(u,10):void 0;return{book:d,chapterNum:f,verseNum:h}}}},void 0);if(r)return r}function Wb(t,e,n,r){const o=w.useCallback(()=>{if(t.chapterNum>1)r({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const c=e.indexOf(t.book);if(c>0){const u=e[c-1],d=Math.max(zn(u),1);r({book:u,chapterNum:d,verseNum:1})}}},[t,e,r]),s=w.useCallback(()=>{const c=zn(t.book);if(t.chapterNum<c)r({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const u=e.indexOf(t.book);if(u<e.length-1){const d=e[u+1];r({book:d,chapterNum:1,verseNum:1})}}},[t,e,r]),i=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,r]),a=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,r]);return w.useMemo(()=>[{onClick:o,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:n==="ltr"?se.ChevronsLeft:se.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:n==="ltr"?se.ChevronLeft:se.ChevronRight},{onClick:a,disabled:e.length===0,title:"Next verse",icon:n==="ltr"?se.ChevronRight:se.ChevronLeft},{onClick:s,disabled:e.length===0||(t.chapterNum===zn(t.book)||zn(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:n==="ltr"?se.ChevronsRight:se.ChevronsLeft}],[t,e,n,o,i,a,s])}function Xu({bookId:t,scrRef:e,onChapterSelect:n,setChapterRef:r,isChapterDimmed:o,className:s}){if(t)return l.jsx(ir,{children:l.jsx("div",{className:z("tw-grid tw-grid-cols-6 tw-gap-1",s),children:Array.from({length:zn(t)},(i,a)=>a+1).map(i=>l.jsx(Mr,{value:`${t} ${Yr[t]||""} ${i}`,onSelect:()=>n(i),ref:r(i),className:z("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(o==null?void 0:o(i))??!1}),children:i},i))})})}function Jb({scrRef:t,handleSubmit:e,className:n,getActiveBookIds:r,localizedBookNames:o,localizedStrings:s,recentSearches:i,onAddRecentSearch:a,id:c}){const u=_t(),[d,p]=w.useState(!1),[f,h]=w.useState(""),[v,x]=w.useState(""),[N,C]=w.useState("books"),[_,D]=w.useState(void 0),[L,V]=w.useState(!1),O=w.useRef(void 0),U=w.useRef(void 0),F=w.useRef(void 0),$=w.useRef(void 0),Y=w.useRef({}),k=w.useCallback(oe=>{e(oe),a&&a(oe)},[e,a]),R=w.useMemo(()=>r?r():jf,[r]),S=w.useMemo(()=>({[ne.Section.OT]:R.filter(me=>$e.isBookOT(me)),[ne.Section.NT]:R.filter(me=>$e.isBookNT(me)),[ne.Section.DC]:R.filter(me=>$e.isBookDC(me)),[ne.Section.Extra]:R.filter(me=>$e.extraBooks().includes(me))}),[R]),I=w.useMemo(()=>Object.values(S).flat(),[S]),A=w.useMemo(()=>{if(!v.trim())return S;const oe={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return[ne.Section.OT,ne.Section.NT,ne.Section.DC,ne.Section.Extra].forEach(Ne=>{oe[Ne]=S[Ne].filter(Oe=>Nc(Oe,v,o))}),oe},[S,v,o]),T=w.useMemo(()=>Yb(v,I,o),[v,I,o]),P=w.useCallback(()=>{T&&(k({book:T.book,chapterNum:T.chapterNum??1,verseNum:T.verseNum??1}),p(!1),x(""),h(""))},[k,T]),H=w.useCallback(oe=>{if(zn(oe)<=1){k({book:oe,chapterNum:1,verseNum:1}),p(!1),x("");return}D(oe),C("chapters")},[k]),J=w.useCallback(oe=>{const me=N==="chapters"?_:T==null?void 0:T.book;me&&(k({book:me,chapterNum:oe,verseNum:1}),p(!1),C("books"),D(void 0),x(""))},[k,N,_,T]),K=w.useCallback(oe=>{k(oe),p(!1),x("")},[k]),W=Wb(t,I,u,e),ee=w.useCallback(()=>{C("books"),D(void 0),setTimeout(()=>{U.current&&U.current.focus()},0)},[]),te=w.useCallback(oe=>{if(!oe&&N==="chapters"){ee();return}p(oe),oe&&(C("books"),D(void 0),x(""))},[N,ee]),{otLong:Z,ntLong:X,dcLong:le,extraLong:ce}={otLong:s==null?void 0:s["%scripture_section_ot_long%"],ntLong:s==null?void 0:s["%scripture_section_nt_long%"],dcLong:s==null?void 0:s["%scripture_section_dc_long%"],extraLong:s==null?void 0:s["%scripture_section_extra_long%"]},ue=w.useCallback(oe=>Of(oe,Z,X,le,ce),[Z,X,le,ce]),ge=w.useCallback(oe=>T?!!T.chapterNum&&!oe.toString().includes(T.chapterNum.toString()):!1,[T]),he=w.useMemo(()=>ne.formatScrRef(t,o?Do(t.book,o):"English"),[t,o]),we=w.useCallback(oe=>me=>{Y.current[oe]=me},[]),ie=w.useCallback(oe=>{(oe.key==="Home"||oe.key==="End")&&oe.stopPropagation()},[]),Ce=w.useCallback(oe=>{if(oe.ctrlKey)return;const{isLetter:me,isDigit:Ne}=Ju(oe.key);if(N==="chapters"){if(oe.key==="Backspace"){oe.preventDefault(),oe.stopPropagation(),ee();return}if(me||Ne){if(oe.preventDefault(),oe.stopPropagation(),C("books"),D(void 0),Ne&&_){const Oe=Yr[_];x(`${Oe} ${oe.key}`)}else x(oe.key);setTimeout(()=>{U.current&&U.current.focus()},0);return}}if((N==="chapters"||N==="books"&&T)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(oe.key)){const Oe=N==="chapters"?_:T==null?void 0:T.book;if(!Oe)return;const Fe=(()=>{if(!f)return 1;const Ee=f.match(/(\d+)$/);return Ee?parseInt(Ee[1],10):0})(),Ze=zn(Oe);if(!Ze)return;let Je=Fe;const ot=6;switch(oe.key){case"ArrowLeft":Fe!==0&&(Je=Fe>1?Fe-1:Ze);break;case"ArrowRight":Fe!==0&&(Je=Fe<Ze?Fe+1:1);break;case"ArrowUp":Je=Fe===0?Ze:Math.max(1,Fe-ot);break;case"ArrowDown":Je=Fe===0?1:Math.min(Ze,Fe+ot);break;default:return}Je!==Fe&&(oe.preventDefault(),oe.stopPropagation(),h(Fl(Oe,o,Je)),setTimeout(()=>{const Ee=Y.current[Je];Ee&&Ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[N,T,ee,_,f,o]),De=w.useCallback(oe=>{if(oe.shiftKey||oe.key==="Tab"||oe.key===" ")return;const{isLetter:me,isDigit:Ne}=Ju(oe.key);(me||Ne)&&(oe.preventDefault(),x(Oe=>Oe+oe.key),U.current.focus(),V(!1))},[]);return w.useLayoutEffect(()=>{const oe=setTimeout(()=>{if(d&&N==="books"&&F.current&&$.current){const me=F.current,Ne=$.current,Oe=Ne.offsetTop,Fe=me.clientHeight,Ze=Ne.clientHeight,Je=Oe-Fe/2+Ze/2;me.scrollTo({top:Math.max(0,Je),behavior:"smooth"}),h(Fl(t.book))}},0);return()=>{clearTimeout(oe)}},[d,N,v,T,t.book]),w.useLayoutEffect(()=>{if(N==="chapters"&&_){const oe=_===t.book;setTimeout(()=>{if(F.current)if(oe){const me=Y.current[t.chapterNum];me&&me.scrollIntoView({block:"center",behavior:"smooth"})}else F.current.scrollTo({top:0});O.current&&O.current.focus()},0)}},[N,_,T,t.book,t.chapterNum]),l.jsxs(wo,{open:d,onOpenChange:te,children:[l.jsx(go,{asChild:!0,children:l.jsx(ve,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":d,className:z("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:l.jsx("span",{className:"tw-truncate",children:he})})}),l.jsx(Rr,{id:c,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:l.jsxs(fo,{ref:O,onKeyDown:Ce,loop:!0,value:f,onValueChange:h,shouldFilter:!1,children:[N==="books"?l.jsxs("div",{className:"tw-flex tw-items-end",children:[l.jsxs("div",{className:"tw-relative tw-flex-1",children:[l.jsx(Qo,{ref:U,value:v,onValueChange:x,onKeyDown:ie,onFocus:()=>V(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&l.jsx(Pf,{recentSearches:i,onSearchItemSelect:K,renderItem:oe=>ne.formatScrRef(oe,"English"),getItemKey:oe=>`${oe.book}-${oe.chapterNum}-${oe.verseNum}`,ariaLabel:s==null?void 0:s["%history_recentSearches_ariaLabel%"],groupHeading:s==null?void 0:s["%history_recent%"]})]}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:W.map(({onClick:oe,disabled:me,title:Ne,icon:Oe})=>l.jsx(ve,{variant:"ghost",size:"sm",onClick:()=>{V(!0),oe()},disabled:me,className:"tw-h-10 tw-w-4 tw-p-0",title:Ne,onKeyDown:De,children:l.jsx(Oe,{})},Ne))})]}):l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:ee,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:u==="ltr"?l.jsx(se.ArrowLeft,{className:"tw-h-4 tw-w-4"}):l.jsx(se.ArrowRight,{className:"tw-h-4 tw-w-4"})}),_&&l.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Do(_,o)})]}),!L&&l.jsxs(ho,{ref:F,children:[N==="books"&&l.jsxs(l.Fragment,{children:[!T&&Object.entries(A).map(([oe,me])=>{if(me.length!==0)return l.jsx(ir,{heading:ue(oe),children:me.map(Ne=>l.jsx(If,{bookId:Ne,onSelect:Oe=>H(Oe),section:ne.getSectionForBook(Ne),commandValue:`${Ne} ${Yr[Ne]}`,ref:Ne===t.book?$:void 0,localizedBookNames:o},Ne))},oe)}),T&&l.jsx(ir,{children:l.jsx(Mr,{value:`${T.book} ${Yr[T.book]} ${T.chapterNum||""}:${T.verseNum||""})}`,onSelect:P,className:"tw-font-semibold tw-text-primary",children:ne.formatScrRef({book:T.book,chapterNum:T.chapterNum??1,verseNum:T.verseNum??1},o?kc(T.book,o):void 0)},"top-match")}),T&&zn(T.book)>1&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Do(T.book,o)}),l.jsx(Xu,{bookId:T.book,scrRef:t,onChapterSelect:J,setChapterRef:we,isChapterDimmed:ge,className:"tw-px-4 tw-pb-4"})]})]}),N==="chapters"&&_&&l.jsx(Xu,{bookId:_,scrRef:t,onChapterSelect:J,setChapterRef:we,className:"tw-p-4"})]})]})})]})}const Xb=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Qb=Dr.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ht=w.forwardRef(({className:t,...e},n)=>l.jsx(vf.Root,{ref:n,className:z("pr-twp",Qb(),t),...e}));ht.displayName=vf.Root.displayName;const va=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Ss.Root,{className:z("pr-twp tw-grid tw-gap-2",t),...e,ref:n,dir:r})});va.displayName=Ss.Root.displayName;const As=w.forwardRef(({className:t,...e},n)=>l.jsx(Ss.Item,{ref:n,className:z("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:l.jsx(Ss.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:l.jsx(se.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));As.displayName=Ss.Item.displayName;function Zb(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Gi({id:t,options:e=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:a=Zb,getButtonLabel:c,icon:u=void 0,buttonPlaceholder:d="",textPlaceholder:p="",commandEmptyMessage:f="No option found",buttonVariant:h="outline",alignDropDown:v="start",isDisabled:x=!1,ariaLabel:N,...C}){const[_,D]=w.useState(!1),L=c??a,V=U=>U.length>0&&typeof U[0]=="object"&&"options"in U[0],O=(U,F)=>{const $=a(U),Y=typeof U=="object"&&"secondaryLabel"in U?U.secondaryLabel:void 0,k=`${F??""}${$}${Y??""}`;return l.jsxs(Mr,{value:$,onSelect:()=>{i(U),D(!1)},className:"tw-flex tw-items-center",children:[l.jsx(se.Check,{className:z("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!s||a(s)!==$})}),l.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[$,Y&&l.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",Y]})]})]},k)};return l.jsxs(wo,{open:_,onOpenChange:D,...C,children:[l.jsx(go,{asChild:!0,children:l.jsxs(ve,{variant:h,role:"combobox","aria-expanded":_,"aria-label":N,id:t,className:z("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&l.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),l.jsx("span",{className:z("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:s?L(s):d})]}),l.jsx(se.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{align:v,className:z("tw-w-[200px] tw-p-0",o),children:l.jsxs(fo,{children:[l.jsx(Qo,{placeholder:p,className:"tw-text-inherit"}),l.jsx(Ks,{children:f}),l.jsx(ho,{children:V(e)?e.map(U=>l.jsx(ir,{heading:U.groupHeading,children:U.options.map(F=>O(F,U.groupHeading))},U.groupHeading)):e.map(U=>O(U))})]})})]})}function $f({startChapter:t,endChapter:e,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=w.useMemo(()=>Array.from({length:s},(u,d)=>d+1),[s]),a=u=>{n(u),u>e&&r(u)},c=u=>{r(u),u<t&&n(u)};return l.jsxs(l.Fragment,{children:[l.jsx(ht,{htmlFor:"start-chapters-combobox",children:"Chapters"}),l.jsx(Gi,{isDisabled:o,onChange:a,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:t},"start chapter"),l.jsx(ht,{htmlFor:"end-chapters-combobox",children:"to"}),l.jsx(Gi,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:e},"end chapter")]})}var Ff=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Ff||{});const e0=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),cl=(t,e)=>t[e]??e;function t0({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:a,handleSelectStartChapter:c,localizedStrings:u}){const d=cl(u,"%webView_bookSelector_currentBook%"),p=cl(u,"%webView_bookSelector_choose%"),f=cl(u,"%webView_bookSelector_chooseBooks%"),[h,v]=w.useState("current book"),x=N=>{v(N),t(N)};return l.jsx(va,{className:"pr-twp tw-flex",value:h,onValueChange:N=>x(N),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(As,{value:"current book"}),l.jsx(ht,{className:"tw-ms-1",children:d})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:e}),l.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:l.jsx($f,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:a,endChapter:s})})]}),l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(As,{value:"choose books"}),l.jsx(ht,{className:"tw-ms-1",children:f})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:r.map(N=>$e.bookIdToEnglishName(N)).join(", ")}),l.jsx(ve,{disabled:h==="current book",onClick:()=>n(),children:p})]})]})})}const n0=["input","select","textarea","button"],r0=["button","textbox"],Bf=({options:t,onFocusChange:e,onOptionSelect:n,onCharacterPress:r})=>{const o=w.useRef(null),[s,i]=w.useState(void 0),[a,c]=w.useState(void 0),u=w.useCallback(h=>{i(h);const v=t.find(N=>N.id===h);v&&(e==null||e(v));const x=document.getElementById(h);x&&(x.scrollIntoView({block:"center"}),x.focus()),o.current&&o.current.setAttribute("aria-activedescendant",h)},[e,t]),d=w.useCallback(h=>{const v=t.find(x=>x.id===h);v&&(c(x=>x===h?void 0:h),n==null||n(v))},[n,t]),p=h=>{if(!h)return!1;const v=h.tagName.toLowerCase();if(h.isContentEditable||n0.includes(v))return!0;const x=h.getAttribute("role");if(x&&r0.includes(x))return!0;const N=h.getAttribute("tabindex");return N!==void 0&&N!=="-1"},f=w.useCallback(h=>{var U;const v=h.target,x=F=>F?document.getElementById(F):void 0,N=x(a),C=x(s);if(!!(N&&v&&N.contains(v)&&v!==N)&&p(v)){if(h.key==="Escape"||h.key==="ArrowLeft"&&!v.isContentEditable){if(a){h.preventDefault(),h.stopPropagation();const F=t.find($=>$.id===a);F&&u(F.id)}return}if(h.key==="ArrowDown"||h.key==="ArrowUp"){if(!N)return;const F=Array.from(N.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(F.length===0)return;const $=F.findIndex(k=>k===v);if($===-1)return;let Y;h.key==="ArrowDown"?Y=Math.min($+1,F.length-1):Y=Math.max($-1,0),Y!==$&&(h.preventDefault(),h.stopPropagation(),(U=F[Y])==null||U.focus());return}return}const L=t.findIndex(F=>F.id===s);let V=L;switch(h.key){case"ArrowDown":V=Math.min(L+1,t.length-1),h.preventDefault();break;case"ArrowUp":V=Math.max(L-1,0),h.preventDefault();break;case"Home":V=0,h.preventDefault();break;case"End":V=t.length-1,h.preventDefault();break;case" ":case"Enter":s&&d(s),h.preventDefault(),h.stopPropagation();return;case"ArrowRight":{const F=C;if(F){const $=F.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),Y=F.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),k=$??Y;if(k){h.preventDefault(),k.focus();return}}break}default:h.key.length===1&&!h.metaKey&&!h.ctrlKey&&!h.altKey&&(p(v)||(r==null||r(h.key),h.preventDefault()));return}const O=t[V];O&&u(O.id)},[t,u,s,a,d,r]);return{listboxRef:o,activeId:s,selectedId:a,handleKeyDown:f,focusOption:u}},xa=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));xa.displayName="Card";const qf=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));qf.displayName="CardHeader";const Uf=w.forwardRef(({className:t,...e},n)=>l.jsx("h3",{ref:n,className:z("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Uf.displayName="CardTitle";const Vf=w.forwardRef(({className:t,...e},n)=>l.jsx("p",{ref:n,className:z("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Vf.displayName="CardDescription";const Tc=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-p-6 tw-pt-0",t),...e}));Tc.displayName="CardContent";const Hf=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Hf.displayName="CardFooter";const Qr=w.forwardRef(({className:t,orientation:e="horizontal",decorative:n=!0,...r},o)=>l.jsx(xf.Root,{ref:o,decorative:n,orientation:e,className:z("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...r}));Qr.displayName=xf.Root.displayName;const zf=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Lo=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,className:z("pr-twp",zf({variant:e}),t),...n}));Lo.displayName="Badge";const Gf=w.createContext(null);function o0(t,e){return{getTheme:function(){return e??null}}}function _e(){const t=w.useContext(Gf);return t==null&&function(e,...n){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of n)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Kf=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,s0=Kf?w.useLayoutEffect:w.useEffect,Ci={tag:m.HISTORY_MERGE_TAG};function Sc({initialConfig:t,children:e}){const n=w.useMemo(()=>{const{theme:r,namespace:o,nodes:s,onError:i,editorState:a,html:c}=t,u=o0(null,r),d=m.createEditor({editable:t.editable,html:c,namespace:o,nodes:s,onError:p=>i(p,d),theme:r});return function(p,f){if(f!==null){if(f===void 0)p.update(()=>{const h=m.$getRoot();if(h.isEmpty()){const v=m.$createParagraphNode();h.append(v);const x=Kf?document.activeElement:null;(m.$getSelection()!==null||x!==null&&x===p.getRootElement())&&v.select()}},Ci);else if(f!==null)switch(typeof f){case"string":{const h=p.parseEditorState(f);p.setEditorState(h,Ci);break}case"object":p.setEditorState(f,Ci);break;case"function":p.update(()=>{m.$getRoot().isEmpty()&&f(p)},Ci)}}}(d,a),[d,u]},[]);return s0(()=>{const r=t.editable,[o]=n;o.setEditable(r===void 0||r)},[]),l.jsx(Gf.Provider,{value:n,children:e})}const i0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function Yf({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=_e();return i0(()=>{if(n)return r.registerUpdateListener(({editorState:o,dirtyElements:s,dirtyLeaves:i,prevEditorState:a,tags:c})=>{e&&s.size===0&&i.size===0||t&&c.has(m.HISTORY_MERGE_TAG)||a.isEmpty()||n(o,r,c)})},[r,t,e,n]),null}const Ac={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Ys=Gs.Provider,ya=Gs.Root,_a=Gs.Trigger,Ws=w.forwardRef(({className:t,sideOffset:e=4,...n},r)=>l.jsx(Gs.Content,{ref:r,sideOffset:e,className:z("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Ws.displayName=Gs.Content.displayName;const Dc=[Il.HeadingNode,m.ParagraphNode,m.TextNode,Il.QuoteNode];function Bl(t,e){return Bl=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},Bl(t,e)}var Qu={error:null},a0=function(t){var e,n;function r(){for(var s,i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];return(s=t.call.apply(t,[this].concat(a))||this).state=Qu,s.resetErrorBoundary=function(){for(var u,d=arguments.length,p=new Array(d),f=0;f<d;f++)p[f]=arguments[f];s.props.onReset==null||(u=s.props).onReset.apply(u,p),s.reset()},s}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,Bl(e,n),r.getDerivedStateFromError=function(s){return{error:s}};var o=r.prototype;return o.reset=function(){this.setState(Qu)},o.componentDidCatch=function(s,i){var a,c;(a=(c=this.props).onError)==null||a.call(c,s,i)},o.componentDidUpdate=function(s,i){var a,c,u,d,p=this.state.error,f=this.props.resetKeys;p!==null&&i.error!==null&&((u=s.resetKeys)===void 0&&(u=[]),(d=f)===void 0&&(d=[]),u.length!==d.length||u.some(function(h,v){return!Object.is(h,d[v])}))&&((a=(c=this.props).onResetKeysChange)==null||a.call(c,s.resetKeys,f),this.reset())},o.render=function(){var s=this.state.error,i=this.props,a=i.fallbackRender,c=i.FallbackComponent,u=i.fallback;if(s!==null){var d={error:s,resetErrorBoundary:this.resetErrorBoundary};if(Ao.isValidElement(u))return u;if(typeof a=="function")return a(d);if(c)return Ao.createElement(c,d);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},r}(Ao.Component);function Mc({children:t,onError:e}){return l.jsx(a0,{fallback:l.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const l0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function c0(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Wf(){return function(t){const[e]=_e(),n=w.useMemo(()=>t(e),[e,t]),[r,o]=w.useState(()=>n.initialValueFn()),s=w.useRef(r);return l0(()=>{const{initialValueFn:i,subscribe:a}=n,c=i();return s.current!==c&&(s.current=c,o(c)),a(u=>{s.current=u,o(u)})},[n,t]),r}(c0)}function Jf(){return m.$getRoot().getTextContent()}function Xf(t,e=!0){if(t)return!1;let n=Jf();return e&&(n=n.trim()),n===""}function u0(t){if(!Xf(t,!1))return!1;const e=m.$getRoot().getChildren(),n=e.length;if(n>1)return!1;for(let r=0;r<n;r++){const o=e[r];if(m.$isDecoratorNode(o))return!1;if(m.$isElementNode(o)){if(!m.$isParagraphNode(o)||o.__indent!==0)return!1;const s=o.getChildren(),i=s.length;for(let a=0;a<i;a++){const c=s[r];if(!m.$isTextNode(c))return!1}}}return!0}function Rc(t){return()=>u0(t)}function Zu(t){let e=t;for(;e!=null;){if(e.nodeType===Node.TEXT_NODE)return e;e=e.firstChild}return null}function ed(t){const e=t.parentNode;if(e==null)throw new Error("Should never happen");return[e,Array.from(e.childNodes).indexOf(t)]}function d0(t,e,n,r,o){const s=e.getKey(),i=r.getKey(),a=document.createRange();let c=t.getElementByKey(s),u=t.getElementByKey(i),d=n,p=o;if(m.$isTextNode(e)&&(c=Zu(c)),m.$isTextNode(r)&&(u=Zu(u)),e===void 0||r===void 0||c===null||u===null)return null;c.nodeName==="BR"&&([c,d]=ed(c)),u.nodeName==="BR"&&([u,p]=ed(u));const f=c.firstChild;c===u&&f!=null&&f.nodeName==="BR"&&d===0&&p===0&&(p=1);try{a.setStart(c,d),a.setEnd(u,p)}catch{return null}return!a.collapsed||d===p&&s===i||(a.setStart(u,p),a.setEnd(c,d)),a}function p0(t,e){const n=t.getRootElement();if(n===null)return[];const r=n.getBoundingClientRect(),o=getComputedStyle(n),s=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),i=Array.from(e.getClientRects());let a,c=i.length;i.sort((u,d)=>{const p=u.top-d.top;return Math.abs(p)<=3?u.left-d.left:p});for(let u=0;u<c;u++){const d=i[u],p=a&&a.top<=d.top&&a.top+a.height>d.top&&a.left+a.width>d.left,f=d.width+s===r.width;p||f?(i.splice(u--,1),c--):a=d}return i}function f0(t,e){const n=t.getStartEndPoints();if(e.isSelected(t)&&!m.$isTokenOrSegmented(e)&&n!==null){const[r,o]=n,s=t.isBackward(),i=r.getNode(),a=o.getNode(),c=e.is(i),u=e.is(a);if(c||u){const[d,p]=m.$getCharacterOffsets(t),f=i.is(a),h=e.is(s?a:i),v=e.is(s?i:a);let x,N=0;f?(N=d>p?p:d,x=d>p?d:p):h?(N=s?p:d,x=void 0):v&&(N=0,x=s?d:p),e.__text=e.__text.slice(N,x)}}return e}function h0(t,e){const n=t.getFormatType(),r=t.getIndent();n!==e.getFormatType()&&e.setFormat(n),r!==e.getIndent()&&e.setIndent(r)}function w0(t,e,n=h0){if(t===null)return;const r=t.getStartEndPoints(),o=new Map;let s=null;if(r){const[i,a]=r;s=m.$createRangeSelection(),s.anchor.set(i.key,i.offset,i.type),s.focus.set(a.key,a.offset,a.type);const c=ul(i.getNode(),m.INTERNAL_$isBlock),u=ul(a.getNode(),m.INTERNAL_$isBlock);m.$isElementNode(c)&&o.set(c.getKey(),c),m.$isElementNode(u)&&o.set(u.getKey(),u)}for(const i of t.getNodes())if(m.$isElementNode(i)&&m.INTERNAL_$isBlock(i))o.set(i.getKey(),i);else if(r===null){const a=ul(i,m.INTERNAL_$isBlock);m.$isElementNode(a)&&o.set(a.getKey(),a)}for(const[i,a]of o){const c=e();n(a,c),a.replace(c,!0),s&&(i===s.anchor.key&&s.anchor.set(c.getKey(),s.anchor.offset,s.anchor.type),i===s.focus.key&&s.focus.set(c.getKey(),s.focus.offset,s.focus.type))}s&&t.is(m.$getSelection())&&m.$setSelection(s)}function Qf(t){const e=t.anchor.getNode(),n=m.$isRootNode(e)?e:e.getParentOrThrow(),r=m.$getEditor().getElementByKey(n.getKey());if(r===null)return!1;const o=r.ownerDocument.defaultView;return o===null?!1:o.getComputedStyle(r).writingMode==="vertical-rl"}function td(t,e){let n=Qf(t)?!e:e;Zf(t)&&(n=!n);const r=m.$caretFromPoint(t.focus,n?"previous":"next");if(m.$isExtendableTextPointCaret(r))return!1;for(const o of m.$extendCaretToRange(r)){if(m.$isChildCaret(o))return!o.origin.isInline();if(!m.$isElementNode(o.origin)){if(m.$isDecoratorNode(o.origin))return!0;break}}return!1}function g0(t,e,n,r){t.modify(e?"extend":"move",n,r)}function Zf(t){const e=t.anchor.getNode();return(m.$isRootNode(e)?e:e.getParentOrThrow()).getDirection()==="rtl"}function nd(t,e,n){const r=Zf(t);let o;o=Qf(t)||r?!n:n,g0(t,e,o,"character")}function ul(t,e){let n=t;for(;n!==null&&n.getParent()!==null&&!e(n);)n=n.getParentOrThrow();return e(n)?n:null}const Js=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,m0=Js&&"documentMode"in document?document.documentMode:null,b0=Js&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),v0=Js&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);!(!Js||!("InputEvent"in window)||m0)&&"getTargetRanges"in new window.InputEvent("input");function eh(...t){const e=[];for(const n of t)if(n&&typeof n=="string")for(const[r]of n.matchAll(/\S+/g))e.push(r);return e}function At(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}const x0=Js,ql=b0,y0=v0;function vr(t,...e){const n=eh(...e);n.length>0&&t.classList.add(...n)}function Ul(t,...e){const n=eh(...e);n.length>0&&t.classList.remove(...n)}function Xs(t,e){return Array.from(_0(t))}function _0(t,e){return C0("next",t)}function C0(t,e,n){const r=m.$getRoot(),o=e||r,s=m.$isElementNode(o)?m.$getChildCaret(o,t):m.$getSiblingCaret(o,t),i=E0(o),a=function(u,d){const p=od(m.$getSiblingCaret(u,d));return p&&p[0]}(o,t);let c=i;return m.makeStepwiseIterator({hasNext:u=>u!==null,initial:s,map:u=>({depth:c,node:u.origin}),step:u=>{if(u.isSameNodeCaret(a))return null;m.$isChildCaret(u)&&c++;const d=od(u);return!d||d[0].isSameNodeCaret(a)?null:(c+=d[1],d[0])}})}function E0(t){let e=-1;for(let n=t;n!==null;n=n.getParent())e++;return e}const Ds=(t,e)=>{let n=t;for(;n!==m.$getRoot()&&n!=null;){if(e(n))return n;n=n.getParent()}return null};function th(t,e,n,r){const o=s=>s instanceof e;return t.registerNodeTransform(e,s=>{const i=(a=>{const c=a.getChildren();for(let p=0;p<c.length;p++){const f=c[p];if(o(f))return null}let u=a,d=a;for(;u!==null;)if(d=u,u=u.getParent(),o(u))return{child:d,parent:u};return null})(s);if(i!==null){const{child:a,parent:c}=i;if(a.is(s)){r(c,s);const u=a.getNextSiblings(),d=u.length;if(c.insertAfter(a),d!==0){const p=n(c);a.insertAfter(p);for(let f=0;f<d;f++)p.append(u[f])}c.canBeEmpty()||c.getChildrenSize()!==0||c.remove()}}})}function nh(t,e){return t!==null&&Object.getPrototypeOf(t).constructor.name===e.name}let dl=!(y0||!x0)&&void 0;function k0(t){let e=1;if(function(){if(dl===void 0){const n=document.createElement("div");n.style.cssText="position: absolute; opacity: 0; width: 100px; left: -1000px;",document.body.appendChild(n);const r=n.getBoundingClientRect();n.style.setProperty("zoom","2"),dl=n.getBoundingClientRect().width===r.width,document.body.removeChild(n)}return dl}())for(;t;)e*=Number(window.getComputedStyle(t).getPropertyValue("zoom")),t=t.parentElement;return e}function rd(t){m.$rewindSiblingCaret(m.$getSiblingCaret(t,"next")).splice(1,t.getChildren())}function od(t,e="root"){let n=0,r=t,o=m.$getAdjacentChildCaret(r);for(;o===null;){if(n--,o=r.getParentCaret(e),!o)return null;r=o,o=m.$getAdjacentChildCaret(r)}return o&&[o,n]}function rh(t){const e=window.location.origin,n=r=>{if(r.origin!==e)return;const o=t.getRootElement();if(document.activeElement!==o)return;const s=r.data;if(typeof s=="string"){let i;try{i=JSON.parse(s)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const a=i.payload;if(a&&a.functionId==="makeChanges"){const c=a.args;if(c){const[u,d,p,f,h,v]=c;t.update(()=>{const x=m.$getSelection();if(m.$isRangeSelection(x)){const N=x.anchor;let C=N.getNode(),_=0,D=0;if(m.$isTextNode(C)&&u>=0&&d>=0&&(_=u,D=u+d,x.setTextNodeRange(C,_,C,D)),_===D&&p===""||(x.insertRawText(p),C=N.getNode()),m.$isTextNode(C)){_=f,D=f+h;const L=C.getTextContentSize();_=_>L?L:_,D=D>L?L:D,x.setTextNodeRange(C,_,C,D)}r.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}const Vl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function sd(t){return t.getEditorState().read(Rc(t.isComposing()))}function oh({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=_e(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return Vl(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),v=s.getElementByKey(f);v!==null&&u.push(fn.createPortal(h,v,f))}return u},[i,a,s])}(r,n);return function(s){Vl(()=>At(Il.registerRichText(s),rh(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(N0,{content:e}),o]})}function N0({content:t}){const[e]=_e(),n=function(o){const[s,i]=w.useState(()=>sd(o));return Vl(()=>{function a(){const c=sd(o);i(c)}return a(),At(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=Wf();return n?typeof t=="function"?t(r):t:null}function sh({defaultSelection:t}){const[e]=_e();return w.useEffect(()=>{e.focus(()=>{const n=document.activeElement,r=e.getRootElement();r===null||n!==null&&r.contains(n)||r.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const ih=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function T0({editor:t,ariaActiveDescendant:e,ariaAutoComplete:n,ariaControls:r,ariaDescribedBy:o,ariaErrorMessage:s,ariaExpanded:i,ariaInvalid:a,ariaLabel:c,ariaLabelledBy:u,ariaMultiline:d,ariaOwns:p,ariaRequired:f,autoCapitalize:h,className:v,id:x,role:N="textbox",spellCheck:C=!0,style:_,tabIndex:D,"data-testid":L,...V},O){const[U,F]=w.useState(t.isEditable()),$=w.useCallback(k=>{k&&k.ownerDocument&&k.ownerDocument.defaultView?t.setRootElement(k):t.setRootElement(null)},[t]),Y=w.useMemo(()=>function(...k){return R=>{k.forEach(S=>{typeof S=="function"?S(R):S!=null&&(S.current=R)})}}(O,$),[$,O]);return ih(()=>(F(t.isEditable()),t.registerEditableListener(k=>{F(k)})),[t]),l.jsx("div",{"aria-activedescendant":U?e:void 0,"aria-autocomplete":U?n:"none","aria-controls":U?r:void 0,"aria-describedby":o,...s!=null?{"aria-errormessage":s}:{},"aria-expanded":U&&N==="combobox"?!!i:void 0,...a!=null?{"aria-invalid":a}:{},"aria-label":c,"aria-labelledby":u,"aria-multiline":d,"aria-owns":U?p:void 0,"aria-readonly":!U||void 0,"aria-required":f,autoCapitalize:h,className:v,contentEditable:U,"data-testid":L,id:x,ref:Y,role:N,spellCheck:C,style:_,tabIndex:D,...V})}const S0=w.forwardRef(T0);function id(t){return t.getEditorState().read(Rc(t.isComposing()))}const Oc=w.forwardRef(A0);function A0(t,e){const{placeholder:n,...r}=t,[o]=_e();return l.jsxs(l.Fragment,{children:[l.jsx(S0,{editor:o,...r,ref:e}),n!=null&&l.jsx(D0,{editor:o,content:n})]})}function D0({content:t,editor:e}){const n=function(i){const[a,c]=w.useState(()=>id(i));return ih(()=>{function u(){const d=id(i);c(d)}return u(),At(i.registerUpdateListener(()=>{u()}),i.registerEditableListener(()=>{u()}))},[i]),a}(e),[r,o]=w.useState(e.isEditable());if(w.useLayoutEffect(()=>(o(e.isEditable()),e.registerEditableListener(i=>{o(i)})),[e]),!n)return null;let s=null;return typeof t=="function"?s=t(r):t!==null&&(s=t),s===null?null:l.jsx("div",{"aria-hidden":!0,children:s})}function M0({placeholder:t,className:e,placeholderClassName:n}){return l.jsx(Oc,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:l.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-left-0 tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const ah=w.createContext(void 0);function R0({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o,children:s}){const i=w.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o}),[t,e,n,r,o]);return l.jsx(ah.Provider,{value:i,children:s})}function lh(){const t=w.useContext(ah);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function O0(){const[t,e]=w.useState(void 0),n=w.useCallback(()=>{e(void 0)},[]),r=w.useMemo(()=>{if(t===void 0)return;const{title:s,content:i}=t;return l.jsx(Ab,{open:!0,onOpenChange:n,children:l.jsxs(Cf,{children:[l.jsx(Ef,{children:l.jsx(kf,{children:s})}),i]})})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}function j0({children:t}){const[e]=_e(),[n,r]=w.useState(e),[o,s]=w.useState("paragraph"),[i,a]=O0(),c=()=>{};return w.useEffect(()=>n.registerCommand(m.SELECTION_CHANGE_COMMAND,(u,d)=>(r(d),!1),m.COMMAND_PRIORITY_CRITICAL),[n]),l.jsxs(R0,{activeEditor:n,$updateToolbar:c,blockType:o,setBlockType:s,showModal:a,children:[i,t({blockType:o})]})}function I0(t){const[e]=_e(),{activeEditor:n}=lh();w.useEffect(()=>n.registerCommand(m.SELECTION_CHANGE_COMMAND,()=>{const r=m.$getSelection();return r&&t(r),!1},m.COMMAND_PRIORITY_CRITICAL),[e,t]),w.useEffect(()=>{n.getEditorState().read(()=>{const r=m.$getSelection();r&&t(r)})},[n,t])}const ch=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),L0=w.forwardRef(({className:t,variant:e,size:n,...r},o)=>l.jsx(yf.Root,{ref:o,className:z(ch({variant:e,size:n,className:t})),...r}));L0.displayName=yf.Root.displayName;const uh=w.createContext({size:"default",variant:"default"}),Ca=w.forwardRef(({className:t,variant:e,size:n,children:r,...o},s)=>{const i=_t();return l.jsx(ba.Root,{ref:s,className:z("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:i,children:l.jsx(uh.Provider,{value:{variant:e,size:n},children:r})})});Ca.displayName=ba.Root.displayName;const Mo=w.forwardRef(({className:t,children:e,variant:n,size:r,...o},s)=>{const i=w.useContext(uh);return l.jsx(ba.Item,{ref:s,className:z(ch({variant:i.variant||n,size:i.size||r}),t),...o,children:e})});Mo.displayName=ba.Item.displayName;const ad=[{format:"bold",icon:se.BoldIcon,label:"Bold"},{format:"italic",icon:se.ItalicIcon,label:"Italic"},{format:"underline",icon:se.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:se.StrikethroughIcon,label:"Strikethrough"}];function P0(){const{activeEditor:t}=lh(),[e,n]=w.useState([]),r=w.useCallback(o=>{if(m.$isRangeSelection(o)||gf.$isTableSelection(o)){const s=[];ad.forEach(({format:i})=>{o.hasFormat(i)&&s.push(i)}),n(i=>i.length!==s.length||!s.every(a=>i.includes(a))?s:i)}},[]);return I0(r),l.jsx(Ca,{type:"multiple",value:e,onValueChange:n,variant:"outline",size:"sm",children:ad.map(({format:o,icon:s,label:i})=>l.jsx(Mo,{value:o,"aria-label":i,onClick:()=>{t.dispatchCommand(m.FORMAT_TEXT_COMMAND,o)},children:l.jsx(s,{className:"tw-h-4 tw-w-4"})},o))})}function $0({placeholder:t="Start typing ...",autoFocus:e=!1}){const[,n]=w.useState(void 0),r=o=>{o!==void 0&&n(o)};return l.jsxs("div",{className:"tw-relative",children:[l.jsx(j0,{children:()=>l.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:l.jsx(P0,{})})}),l.jsxs("div",{className:"tw-relative",children:[l.jsx(oh,{contentEditable:l.jsx("div",{ref:r,children:l.jsx(M0,{placeholder:t})}),ErrorBoundary:Mc}),e&&l.jsx(sh,{defaultSelection:"rootStart"})]})]})}const F0={namespace:"Editor",theme:Ac,nodes:Dc,onError:t=>{console.error(t)}};function ld({editorState:t,editorSerializedState:e,onChange:n,onSerializedChange:r,placeholder:o="Start typing…",autoFocus:s=!1}){return l.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:l.jsx(Sc,{initialConfig:{...F0,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:l.jsxs(Ys,{children:[l.jsx($0,{placeholder:o,autoFocus:s}),l.jsx(Yf,{ignoreSelectionChange:!0,onChange:i=>{n==null||n(i),r==null||r(i.toJSON())}})]})})})}function jc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),r=m.$getRoot().getChildren();for(let o=0;o<r.length;o++)dh(t,r[o],n,e);return n.innerHTML}function dh(t,e,n,r=null){let o=r===null||e.isSelected(r);const s=m.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;if(r!==null){let h=m.$cloneWithProperties(e);h=m.$isTextNode(h)&&r!==null?f0(r,h):h,i=h}const a=m.$isElementNode(i)?i.getChildren():[],c=m.getRegisteredNode(t,i.getType());let u;u=c&&c.exportDOM!==void 0?c.exportDOM(t,i):i.exportDOM(t);const{element:d,after:p}=u;if(!d)return!1;const f=document.createDocumentFragment();for(let h=0;h<a.length;h++){const v=a[h],x=dh(t,v,f,r);!o&&m.$isElementNode(e)&&x&&e.extractWithChild(v,r,"html")&&(o=!0)}if(o&&!s){if((m.isHTMLElement(d)||m.isDocumentFragment(d))&&d.append(f),n.append(d),p){const h=p.call(i,d);h&&(m.isDocumentFragment(d)?d.replaceChildren(h):d.replaceWith(h))}}else n.append(f);return o}function Ei(t){if(!t)return!1;const e=m.createEditor({namespace:"EditorUtils",theme:Ac,nodes:Dc,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r=!1;return e.getEditorState().read(()=>{r=m.$getRoot().getTextContent().trim().length>0}),r}function B0(t){const e=m.createEditor({namespace:"EditorUtils",theme:Ac,nodes:Dc,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r="";return e.getEditorState().read(()=>{r=jc(e)}),r=r.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>"),r}function q0(t){return t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/color>/gi,(e,n,r)=>`<span style="color: ${{red:"#ef4444",green:"#22c55e",blue:"#3b82f6"}[n.toLowerCase()]||n}">${r}</span>`).replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1")}function U0(t){const e=t.replace(/[#*_~`[\]()]/g,"").replace(/<[^>]*>/g,"").trim(),n=150;if(e.length<=n)return t;let r=n;return[". ","! ","? ",`
`," "].find(i=>{const a=e.lastIndexOf(i,n);return a>n*.7?(r=a+i.length,!0):!1})||(r=n),`${t.slice(0,r).trim()}...`}function ph({id:t,markdown:e,className:n,anchorTarget:r,truncate:o}){const s=w.useMemo(()=>q0(e),[e]),i=w.useMemo(()=>o?U0(s):s,[s,o]),a=w.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return l.jsx("div",{id:t,className:z("pr-twp",n),children:l.jsx(hb,{options:a,children:i})})}const Ic=w.forwardRef(({className:t,...e},n)=>l.jsx(Xo.Root,{ref:n,className:z("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Ic.displayName=Xo.Root.displayName;const fh=w.forwardRef(({className:t,...e},n)=>l.jsx(Xo.Image,{ref:n,className:z("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));fh.displayName=Xo.Image.displayName;const Lc=w.forwardRef(({className:t,...e},n)=>l.jsx(Xo.Fallback,{ref:n,className:z("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Lc.displayName=Xo.Fallback.displayName;function cd({comment:t,isReply:e=!1,localizedStrings:n,isThreadExpanded:r=!1}){const o=w.useMemo(()=>{const a=new Date(t.date),c=ne.formatRelativeDate(a,n["%comment_date_today%"],n["%comment_date_yesterday%"]),u=a.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return ne.formatReplacementString(n["%comment_dateAtTime%"],{date:c,time:u})},[t.date,n]),s=w.useMemo(()=>!e&&t.assignedUser?ne.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:t.assignedUser}):t.user,[e,t.assignedUser,t.user,n]),i=w.useMemo(()=>t.user.split(" ").map(a=>a[0]).join("").toUpperCase().slice(0,2),[t.user]);return l.jsxs("div",{className:z("tw-flex tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[l.jsx(Ic,{className:"tw-h-8 tw-w-8",children:l.jsx(Lc,{className:"tw-text-xs tw-font-medium",children:i})}),l.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[l.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[l.jsx("p",{className:"tw-text-sm tw-font-medium",children:s}),l.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:o})]}),l.jsx("div",{className:"tw-flex tw-flex-row tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",children:l.jsx(ph,{className:"tw-text-sm tw-font-normal tw-text-primary",markdown:t.contents,truncate:!r})})]})]})}const ud={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function V0({comments:t,localizedStrings:e,isSelected:n=!1,verseRef:r,assignedUser:o,handleSelectThread:s,threadId:i,threadStatus:a,handleResolveCommentThread:c,handleAddComment:u}){const[d,p]=w.useState(ud),[f,h]=w.useState(!1),[v,x]=w.useState(!1),[N,C]=w.useState(!1),[_,D]=w.useState(0),L=w.useMemo(()=>t[0],[t]),V=w.useRef(null);w.useEffect(()=>{const T=V.current;if(!T)return;const P=()=>{x(T.scrollWidth>T.clientWidth)};return P(),window.addEventListener("resize",P),()=>window.removeEventListener("resize",P)},[L.verse]),w.useEffect(()=>{C(!1)},[n]);const O=w.useMemo(()=>({singleReply:e["%comment_thread_single_reply%"],multipleReplies:e["%comment_thread_multiple_replies%"]}),[e]),U=w.useMemo(()=>o?ne.formatReplacementString(e["%comment_assigned_to%"],{assignedUser:o}):void 0,[o,e]),F=w.useMemo(()=>t.slice(1),[t]),$=w.useMemo(()=>F.length??0,[F.length]),Y=w.useMemo(()=>$>0,[$]),k=w.useMemo(()=>N||$<=2?F:F.slice(-2),[F,$,N]),R=w.useMemo(()=>N||$<=2?0:$-2,[$,N]),S=w.useMemo(()=>$===1?O.singleReply:ne.formatReplacementString(O.multipleReplies,{count:$}),[$,O]),I=w.useMemo(()=>R===1?O.singleReply:ne.formatReplacementString(O.multipleReplies,{count:R}),[R,O]),A=w.useCallback(async()=>{await u(i,B0(d))&&(p(ud),D(P=>P+1))},[d,u,i]);return l.jsx(xa,{role:"option","aria-selected":n,id:i,className:z("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer tw-bg-slate-50 hover:tw-shadow-md":!n},{"tw-bg-background":n}),onClick:()=>{s(i)},tabIndex:-1,children:l.jsxs(Tc,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[U&&l.jsx(Lo,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:U}),l.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[l.jsxs("p",{ref:V,className:z("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":f},{"tw-whitespace-nowrap":!f}),children:[r," ",L.verse]}),v&&l.jsx(ve,{variant:"ghost",size:"icon",onClick:T=>{T.stopPropagation(),h(!f)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":f?"Collapse text":"Expand text",children:f?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})})]}),l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3",children:[l.jsx("div",{className:"tw-flex-1",children:l.jsx(cd,{comment:L,localizedStrings:e,isThreadExpanded:n})}),n&&a!=="Resolved"&&l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:T=>{T.stopPropagation(),c(i)},children:l.jsx(se.Check,{})})]})]}),l.jsxs(l.Fragment,{children:[Y&&!n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(Qr,{})}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:S})]}),!n&&Ei(d)&&l.jsx(ld,{editorSerializedState:d,onSerializedChange:T=>p(T),placeholder:e["%comment_replyOrAssign%"]}),n&&l.jsxs(l.Fragment,{children:[R>0&&l.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:T=>{T.stopPropagation(),C(!0)},role:"button",tabIndex:0,onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),T.stopPropagation(),C(!0))},children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(Qr,{})}),l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:I}),N?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})]})]}),k.map(T=>l.jsx("div",{children:l.jsx(cd,{comment:T,localizedStrings:e,isReply:!0,isThreadExpanded:n})},T.id)),l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:T=>T.stopPropagation(),onKeyDownCapture:T=>{T.key==="Enter"&&T.shiftKey&&(T.preventDefault(),T.stopPropagation(),Ei(d)&&A())},onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},children:[l.jsx(ld,{editorSerializedState:d,onSerializedChange:T=>p(T),placeholder:e["%comment_replyOrAssign%"],autoFocus:!0},_),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ve,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ei(d),children:l.jsx(se.AtSign,{})}),l.jsx(ve,{size:"icon",onClick:A,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Ei(d),children:l.jsx(se.ArrowUp,{})})]})]})]})]})]})})}const ki=t=>`thread-${t}`;function H0({className:t="",threads:e,localizedStrings:n,handleAddComment:r,handleResolveCommentThread:o}){const[s,i]=w.useState(),a=e.map(v=>({id:ki(v.id)})),c=w.useCallback(v=>{i(v.id)},[]),u=w.useCallback(v=>{i(v)},[]),{listboxRef:d,activeId:p,handleKeyDown:f}=Bf({options:a,onOptionSelect:c}),h=w.useCallback(v=>{v.key==="Escape"?(i(void 0),v.preventDefault(),v.stopPropagation()):f(v)},[f]);return w.useEffect(()=>{if(!s)return;const v=document.getElementById(s);if(!v)return;const x=requestAnimationFrame(()=>{const N=requestAnimationFrame(()=>{const C=v.querySelector('[contenteditable="true"]'),_=v.querySelector("textarea:not([disabled]), select:not([disabled]), button:not([disabled])"),D=C??_;if(D&&(D.focus(),C&&D===C)){const L=window.getSelection(),V=document.createRange();V.selectNodeContents(C),V.collapse(!1),L==null||L.removeAllRanges(),L==null||L.addRange(V)}});return()=>cancelAnimationFrame(N)});return()=>cancelAnimationFrame(x)},[s]),l.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:d,"aria-activedescendant":p??void 0,"aria-label":"Comments",className:z("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:h,children:e.map(v=>l.jsx("div",{children:l.jsx(V0,{comments:v.comments,localizedStrings:n,verseRef:v.verseRef,handleSelectThread:u,threadId:ki(v.id),isSelected:s===ki(v.id),assignedUser:v.assignedUser,threadStatus:v.status,handleAddComment:r,handleResolveCommentThread:o})},ki(v.id)))})}const Pc=w.createContext(void 0);function On(){const t=w.useContext(Pc);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ur=Dr.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ea=Ge.Trigger,$c=Ge.Group,hh=Ge.Portal,wh=Ge.Sub,gh=Ge.RadioGroup;function Qs({variant:t="default",...e}){const n=w.useMemo(()=>({variant:t}),[t]);return l.jsx(Pc.Provider,{value:n,children:l.jsx(Ge.Root,{...e})})}const Fc=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ge.SubTrigger,{ref:o,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ur({variant:s.variant})),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Fc.displayName=Ge.SubTrigger.displayName;const Bc=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.SubContent,{ref:n,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Bc.displayName=Ge.SubContent.displayName;const es=w.forwardRef(({className:t,sideOffset:e=4,children:n,...r},o)=>{const s=_t();return l.jsx(Ge.Portal,{children:l.jsx(Ge.Content,{ref:o,sideOffset:e,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:l.jsx("div",{dir:s,children:n})})})});es.displayName=Ge.Content.displayName;const qc=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=_t(),s=On();return l.jsx(Ge.Item,{ref:r,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ur({variant:s.variant})),...n,dir:o})});qc.displayName=Ge.Item.displayName;const ka=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ge.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ur({variant:s.variant})),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});ka.displayName=Ge.CheckboxItem.displayName;const Uc=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ge.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ur({variant:o.variant})),...n,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Uc.displayName=Ge.RadioItem.displayName;const Na=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ge.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));Na.displayName=Ge.Label.displayName;const Zs=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Zs.displayName=Ge.Separator.displayName;function mh({className:t,...e}){return l.jsx("span",{className:z("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}mh.displayName="DropdownMenuShortcut";function z0({table:t}){return l.jsxs(Qs,{children:[l.jsx(mf.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ve,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[l.jsx(se.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),l.jsxs(es,{align:"end",className:"tw-w-[150px]",children:[l.jsx(Na,{children:"Toggle columns"}),l.jsx(Zs,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>l.jsx(ka,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:n=>e.toggleVisibility(!!n),children:e.id},e.id))]})]})}const Zr=rt.Root,bh=rt.Group,eo=rt.Value,vh=Dr.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Er=w.forwardRef(({className:t,children:e,size:n,...r},o)=>{const s=_t();return l.jsxs(rt.Trigger,{className:z(vh({size:n,className:t})),ref:o,...r,dir:s,children:[e,l.jsx(rt.Icon,{asChild:!0,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Er.displayName=rt.Trigger.displayName;const Vc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollUpButton,{ref:n,className:z("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Vc.displayName=rt.ScrollUpButton.displayName;const Hc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollDownButton,{ref:n,className:z("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Hc.displayName=rt.ScrollDownButton.displayName;const kr=w.forwardRef(({className:t,children:e,position:n="popper",...r},o)=>{const s=_t();return l.jsx(rt.Portal,{children:l.jsxs(rt.Content,{ref:o,className:z("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:n,...r,children:[l.jsx(Vc,{}),l.jsx(rt.Viewport,{className:z("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:l.jsx("div",{dir:s,children:e})}),l.jsx(Hc,{})]})})});kr.displayName=rt.Content.displayName;const xh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Label,{ref:n,className:z("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));xh.displayName=rt.Label.displayName;const cn=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(rt.Item,{ref:r,className:z("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(rt.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),l.jsx(rt.ItemText,{children:e})]}));cn.displayName=rt.Item.displayName;const yh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));yh.displayName=rt.Separator.displayName;function G0({table:t}){return l.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[l.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),l.jsxs(Zr,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[l.jsx(Er,{className:"tw-h-8 tw-w-[70px]",children:l.jsx(eo,{placeholder:t.getState().pagination.pageSize})}),l.jsx(kr,{side:"top",children:[10,20,30,40,50].map(e=>l.jsx(cn,{value:`${e}`,children:e},e))})]})]}),l.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),l.jsx(se.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),l.jsx(se.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),l.jsx(se.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),l.jsx(se.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const dd=`
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
`;function K0(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ms(t,e){const n=e?`${dd}, ${e}`:dd;return Array.from(t.querySelectorAll(n)).filter(r=>!r.hasAttribute("disabled")&&!r.getAttribute("aria-hidden")&&K0(r))}const ei=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>{const o=w.useRef(null);w.useEffect(()=>{typeof r=="function"?r(o.current):r&&"current"in r&&(r.current=o.current)},[r]),w.useEffect(()=>{const i=o.current;if(!i)return;const a=()=>{requestAnimationFrame(()=>{Ms(i,'[tabindex]:not([tabindex="-1"])').forEach(d=>{d.setAttribute("tabindex","-1")})})};a();const c=new MutationObserver(()=>{a()});return c.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{c.disconnect()}},[]);const s=i=>{const{current:a}=o;if(a){if(i.key==="ArrowDown"){i.preventDefault(),Ms(a)[0].focus();return}i.key===" "&&document.activeElement===a&&i.preventDefault()}};return l.jsx("div",{className:z("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:l.jsx("table",{tabIndex:0,onKeyDown:s,ref:o,className:z("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...n})})});ei.displayName="Table";const ti=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>l.jsx("thead",{ref:r,className:z({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...n}));ti.displayName="TableHeader";const ni=w.forwardRef(({className:t,...e},n)=>l.jsx("tbody",{ref:n,className:z("[&_tr:last-child]:tw-border-0",t),...e}));ni.displayName="TableBody";const _h=w.forwardRef(({className:t,...e},n)=>l.jsx("tfoot",{ref:n,className:z("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));_h.displayName="TableFooter";function Y0(t){w.useEffect(()=>{const e=t.current;if(!e)return;const n=r=>{if(e.contains(document.activeElement)){if(r.key==="ArrowRight"||r.key==="ArrowLeft"){r.preventDefault(),r.stopPropagation();const o=t.current?Ms(t.current):[],s=o.indexOf(document.activeElement),i=r.key==="ArrowRight"?s+1:s-1;i>=0&&i<o.length&&o[i].focus()}r.key==="Escape"&&(r.preventDefault(),e.focus()),(r.key==="ArrowDown"||r.key==="ArrowUp")&&r.preventDefault()}};return e.addEventListener("keydown",n),()=>{e.removeEventListener("keydown",n)}},[t])}function W0(t,e,n){let r;return n==="ArrowLeft"&&e>0?r=t[e-1]:n==="ArrowRight"&&e<t.length-1&&(r=t[e+1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}function J0(t,e,n){let r;return n==="ArrowDown"&&e<t.length-1?r=t[e+1]:n==="ArrowUp"&&e>0&&(r=t[e-1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}const Gn=w.forwardRef(({className:t,onKeyDown:e,onSelect:n,setFocusAlsoRunsSelect:r=!1,...o},s)=>{const i=w.useRef(null);w.useEffect(()=>{typeof s=="function"?s(i.current):s&&"current"in s&&(s.current=i.current)},[s]),Y0(i);const a=w.useMemo(()=>i.current?Ms(i.current):[],[i]),c=w.useCallback(d=>{const{current:p}=i;if(!p||!p.parentElement)return;const f=p.closest("table"),h=f?Ms(f).filter(N=>N.tagName==="TR"):[],v=h.indexOf(p),x=a.indexOf(document.activeElement);if(d.key==="ArrowDown"||d.key==="ArrowUp")d.preventDefault(),J0(h,v,d.key);else if(d.key==="ArrowLeft"||d.key==="ArrowRight")d.preventDefault(),W0(a,x,d.key);else if(d.key==="Escape"){d.preventDefault();const N=p.closest("table");N&&N.focus()}e==null||e(d)},[i,a,e]),u=w.useCallback(d=>{r&&(n==null||n(d))},[r,n]);return l.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:c,onFocus:u,className:z("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});Gn.displayName="TableRow";const Po=w.forwardRef(({className:t,...e},n)=>l.jsx("th",{ref:n,className:z("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Po.displayName="TableHead";const Cr=w.forwardRef(({className:t,...e},n)=>l.jsx("td",{ref:n,className:z("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Cr.displayName="TableCell";const Ch=w.forwardRef(({className:t,...e},n)=>l.jsx("caption",{ref:n,className:z("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Ch.displayName="TableCaption";function Ki({className:t,...e}){return l.jsx("div",{className:z("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Eh({columns:t,data:e,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{},id:a,isLoading:c=!1,noResultsMessage:u}){var O;const[d,p]=w.useState([]),[f,h]=w.useState([]),[v,x]=w.useState({}),[N,C]=w.useState({}),_=w.useMemo(()=>e??[],[e]),D=Ft.useReactTable({data:_,columns:t,getCoreRowModel:Ft.getCoreRowModel(),...n&&{getPaginationRowModel:Ft.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ft.getSortedRowModel(),onColumnFiltersChange:h,getFilteredRowModel:Ft.getFilteredRowModel(),onColumnVisibilityChange:x,onRowSelectionChange:C,state:{sorting:d,columnFilters:f,columnVisibility:v,rowSelection:N}}),L=D.getVisibleFlatColumns();let V;return c?V=Array.from({length:10}).map(($,Y)=>`skeleton-row-${Y}`).map($=>l.jsx(Gn,{children:l.jsx(Cr,{colSpan:L.length??t.length,className:"tw-border-0 tw-p-0",children:l.jsx("div",{className:"tw-w-full tw-py-2",children:l.jsx(Ki,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},$)):((O=D.getRowModel().rows)==null?void 0:O.length)>0?V=D.getRowModel().rows.map(U=>l.jsx(Gn,{onClick:()=>i(U,D),"data-state":U.getIsSelected()&&"selected",children:U.getVisibleCells().map(F=>l.jsx(Cr,{children:Ft.flexRender(F.column.columnDef.cell,F.getContext())},F.id))},U.id)):V=l.jsx(Gn,{children:l.jsx(Cr,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:u})}),l.jsxs("div",{className:"pr-twp",id:a,children:[o&&l.jsx(z0,{table:D}),l.jsxs(ei,{stickyHeader:s,children:[l.jsx(ti,{stickyHeader:s,children:D.getHeaderGroups().map(U=>l.jsx(Gn,{children:U.headers.map(F=>l.jsx(Po,{children:F.isPlaceholder?void 0:Ft.flexRender(F.column.columnDef.header,F.getContext())},F.id))},U.id))}),l.jsx(ni,{children:V})]}),n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>D.previousPage(),disabled:!D.getCanPreviousPage(),children:"Previous"}),l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>D.nextPage(),disabled:!D.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(G0,{table:D})]})}const kh=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),pd=(t,e)=>t[e]??e;function Nh({errorDetails:t,handleCopyNotify:e,localizedStrings:n,id:r}){const o=pd(n,"%webView_error_dump_header%"),s=pd(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return l.jsxs("div",{id:r,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[l.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[l.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[l.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),l.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:s})]}),l.jsx(ve,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:l.jsx(se.Copy,{})})]}),l.jsx("div",{className:"tw-prose tw-w-full",children:l.jsx("pre",{className:"tw-text-xs",children:t})})]})}const X0=Object.freeze([...kh,"%webView_error_dump_copied_message%"]);function Q0({errorDetails:t,handleCopyNotify:e,localizedStrings:n,children:r,className:o,id:s}){const[i,a]=w.useState(!1),c=()=>{a(!0),e&&e()},u=d=>{d||a(!1)};return l.jsxs(wo,{onOpenChange:u,children:[l.jsx(go,{asChild:!0,children:r}),l.jsxs(Rr,{id:s,className:z("tw-min-w-80 tw-max-w-96",o),children:[i&&n["%webView_error_dump_copied_message%"]&&l.jsx(ht,{children:n["%webView_error_dump_copied_message%"]}),l.jsx(Nh,{errorDetails:t,handleCopyNotify:c,localizedStrings:n})]})]})}var Th=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Th||{});function Z0({id:t,label:e,groups:n}){const[r,o]=w.useState(Object.fromEntries(n.map((u,d)=>u.itemType===0?[d,[]]:void 0).filter(u=>!!u))),[s,i]=w.useState({}),a=(u,d)=>{const p=!r[u][d];o(h=>(h[u][d]=p,{...h}));const f=n[u].items[d];f.onUpdate(f.id,p)},c=(u,d)=>{i(f=>(f[u]=d,{...f}));const p=n[u].items.find(f=>f.id===d);p?p.onUpdate(d):console.error(`Could not find dropdown radio item with id '${d}'!`)};return l.jsx("div",{id:t,children:l.jsxs(Qs,{children:[l.jsx(Ea,{asChild:!0,children:l.jsxs(ve,{variant:"default",children:[l.jsx(se.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,l.jsx(se.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),l.jsx(es,{children:n.map((u,d)=>l.jsxs("div",{children:[l.jsx(Na,{children:u.label}),l.jsx($c,{children:u.itemType===0?l.jsx(l.Fragment,{children:u.items.map((p,f)=>l.jsx("div",{children:l.jsx(ka,{checked:r[d][f],onCheckedChange:()=>a(d,f),children:p.label})},p.id))}):l.jsx(gh,{value:s[d],onValueChange:p=>c(d,p),children:u.items.map(p=>l.jsx("div",{children:l.jsx(Uc,{value:p.id,children:p.label})},p.id))})}),l.jsx(Zs,{})]},u.label))})]})})}function ev({id:t,category:e,downloads:n,languages:r,moreInfoUrl:o,handleMoreInfoLinkClick:s,supportUrl:i,handleSupportLinkClick:a}){const c=new ne.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((d,p)=>d+p,0)),u=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[l.jsx("div",{className:"tw-flex",children:l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsxs("div",{className:"tw-flex tw-gap-1",children:[l.jsx(se.User,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:c})]}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsx("div",{className:"tw-flex tw-gap-2",children:r.slice(0,3).map(d=>l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d.toUpperCase()},d))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>u(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",r.length-3," more languages"]})]}),(o||i)&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ve,{onClick:()=>s(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",l.jsx(se.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ve,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",l.jsx(se.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function tv({id:t,versionHistory:e}){const[n,r]=w.useState(!1),o=new Date;function s(a){const c=new Date(a),u=new Date(o.getTime()-c.getTime()),d=u.getUTCFullYear()-1970,p=u.getUTCMonth(),f=u.getUTCDate()-1;let h="";return d>0?h=`${d.toString()} year${d===1?"":"s"} ago`:p>0?h=`${p.toString()} month${p===1?"":"s"} ago`:f===0?h="today":h=`${f.toString()} day${f===1?"":"s"} ago`,h}const i=Object.entries(e).sort((a,c)=>c[0].localeCompare(a[0]));return l.jsxs("div",{className:"pr-twp",id:t,children:[l.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(a=>l.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[l.jsx("div",{className:"tw-text-foreground",children:l.jsx("li",{className:"tw-prose tw-text-xs",children:l.jsx("span",{children:a[1].description})})}),l.jsxs("div",{className:"tw-justify-end tw-text-right",children:[l.jsxs("div",{children:["Version ",a[0]]}),l.jsx("div",{children:s(a[1].date)})]})]},a[0]))}),i.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function nv({id:t,publisherDisplayName:e,fileSize:n,locales:r,versionHistory:o,currentVersion:s}){const i=w.useMemo(()=>ne.formatBytes(n),[n]),c=(u=>{const d=new Intl.DisplayNames(ne.getCurrentLocale(),{type:"language"});return u.map(p=>d.of(p))})(r);return l.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(o).length>0&&l.jsx(tv,{versionHistory:o}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[l.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),l.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Publisher"}),l.jsx("span",{className:"tw-font-semibold",children:e}),l.jsx("span",{children:"Size"}),l.jsx("span",{className:"tw-font-semibold",children:i})]}),l.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Version"}),l.jsx("span",{className:"tw-font-semibold",children:s}),l.jsx("span",{children:"Languages"}),l.jsx("span",{className:"tw-font-semibold",children:c.join(", ")})]})})]})]})]})})}function Sh({entries:t,selected:e,onChange:n,placeholder:r,hasToggleAllFeature:o=!1,selectAllText:s="Select All",clearAllText:i="Clear All",commandEmptyMessage:a="No entries found",customSelectedText:c,isOpen:u=void 0,onOpenChange:d=void 0,isDisabled:p=!1,sortSelected:f=!1,icon:h=void 0,className:v=void 0,variant:x="ghost",id:N}){const[C,_]=w.useState(!1),D=w.useCallback(Y=>{var R;const k=(R=t.find(S=>S.label===Y))==null?void 0:R.value;k&&n(e.includes(k)?e.filter(S=>S!==k):[...e,k])},[t,e,n]),L=()=>c||r,V=w.useMemo(()=>{if(!f)return t;const Y=t.filter(R=>R.starred).sort((R,S)=>R.label.localeCompare(S.label)),k=t.filter(R=>!R.starred).sort((R,S)=>{const I=e.includes(R.value),A=e.includes(S.value);return I&&!A?-1:!I&&A?1:R.label.localeCompare(S.label)});return[...Y,...k]},[t,e,f]),O=()=>{n(t.map(Y=>Y.value))},U=()=>{n([])},F=u??C,$=d??_;return l.jsx("div",{id:N,className:v,children:l.jsxs(wo,{open:F,onOpenChange:$,children:[l.jsx(go,{asChild:!0,children:l.jsxs(ve,{variant:x,role:"combobox","aria-expanded":F,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[h&&l.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:l.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:h})}),l.jsx("span",{className:z("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:L()})]}),l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{align:"start",className:"tw-w-full tw-p-0",children:l.jsxs(fo,{children:[l.jsx(Qo,{placeholder:`Search ${r.toLowerCase()}...`}),o&&l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:O,children:s}),l.jsx(ve,{variant:"ghost",size:"sm",onClick:U,children:i})]}),l.jsxs(ho,{children:[l.jsx(Ks,{children:a}),l.jsx(ir,{children:V.map(Y=>l.jsxs(Mr,{value:Y.label,onSelect:D,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("div",{className:"w-4",children:l.jsx(se.Check,{className:z("tw-h-4 tw-w-4",e.includes(Y.value)?"tw-opacity-100":"tw-opacity-0")})}),Y.starred&&l.jsx(se.Star,{className:"tw-h-4 tw-w-4"}),l.jsx("div",{className:"tw-flex-grow",children:Y.label}),Y.secondaryLabel&&l.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:Y.secondaryLabel})]},Y.label))})]})]})})]})})}function rv({entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u,badgesPlaceholder:d,id:p}){return l.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx(Sh,{entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u}),e.length>0?l.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var h;return l.jsxs(Lo,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(e.filter(v=>v!==f)),children:l.jsx(se.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(v=>v.value===f))==null?void 0:h.label]},f)})}):l.jsx(ht,{children:d})]})}var xr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ov(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ae={},mt={},fd;function ts(){if(fd)return mt;fd=1;function t(C,_,D){if(D===void 0&&(D=Array.prototype),C&&typeof D.find=="function")return D.find.call(C,_);for(var L=0;L<C.length;L++)if(n(C,L)){var V=C[L];if(_.call(void 0,V,L,C))return V}}function e(C,_){return _===void 0&&(_=Object),_&&typeof _.getOwnPropertyDescriptors=="function"&&(C=_.create(null,_.getOwnPropertyDescriptors(C))),_&&typeof _.freeze=="function"?_.freeze(C):C}function n(C,_){return Object.prototype.hasOwnProperty.call(C,_)}function r(C,_){if(C===null||typeof C!="object")throw new TypeError("target is not an object");for(var D in _)n(_,D)&&(C[D]=_[D]);return C}var o=e({allowfullscreen:!0,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,default:!0,defer:!0,disabled:!0,formnovalidate:!0,hidden:!0,ismap:!0,itemscope:!0,loop:!0,multiple:!0,muted:!0,nomodule:!0,novalidate:!0,open:!0,playsinline:!0,readonly:!0,required:!0,reversed:!0,selected:!0});function s(C){return n(o,C.toLowerCase())}var i=e({area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function a(C){return n(i,C.toLowerCase())}var c=e({script:!1,style:!1,textarea:!0,title:!0});function u(C){var _=C.toLowerCase();return n(c,_)&&!c[_]}function d(C){var _=C.toLowerCase();return n(c,_)&&c[_]}function p(C){return C===h.HTML}function f(C){return p(C)||C===h.XML_XHTML_APPLICATION}var h=e({HTML:"text/html",XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),v=Object.keys(h).map(function(C){return h[C]});function x(C){return v.indexOf(C)>-1}var N=e({HTML:"http://www.w3.org/1999/xhtml",SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});return mt.assign=r,mt.find=t,mt.freeze=e,mt.HTML_BOOLEAN_ATTRIBUTES=o,mt.HTML_RAW_TEXT_ELEMENTS=c,mt.HTML_VOID_ELEMENTS=i,mt.hasDefaultHTMLNamespace=f,mt.hasOwn=n,mt.isHTMLBooleanAttribute=s,mt.isHTMLRawTextElement=u,mt.isHTMLEscapableRawTextElement=d,mt.isHTMLMimeType=p,mt.isHTMLVoidElement=a,mt.isValidMimeType=x,mt.MIME_TYPE=h,mt.NAMESPACE=N,mt}var No={},hd;function Ta(){if(hd)return No;hd=1;var t=ts();function e(f,h){f.prototype=Object.create(Error.prototype,{constructor:{value:f},name:{value:f.name,enumerable:!0,writable:h}})}var n=t.freeze({Error:"Error",IndexSizeError:"IndexSizeError",DomstringSizeError:"DomstringSizeError",HierarchyRequestError:"HierarchyRequestError",WrongDocumentError:"WrongDocumentError",InvalidCharacterError:"InvalidCharacterError",NoDataAllowedError:"NoDataAllowedError",NoModificationAllowedError:"NoModificationAllowedError",NotFoundError:"NotFoundError",NotSupportedError:"NotSupportedError",InUseAttributeError:"InUseAttributeError",InvalidStateError:"InvalidStateError",SyntaxError:"SyntaxError",InvalidModificationError:"InvalidModificationError",NamespaceError:"NamespaceError",InvalidAccessError:"InvalidAccessError",ValidationError:"ValidationError",TypeMismatchError:"TypeMismatchError",SecurityError:"SecurityError",NetworkError:"NetworkError",AbortError:"AbortError",URLMismatchError:"URLMismatchError",QuotaExceededError:"QuotaExceededError",TimeoutError:"TimeoutError",InvalidNodeTypeError:"InvalidNodeTypeError",DataCloneError:"DataCloneError",EncodingError:"EncodingError",NotReadableError:"NotReadableError",UnknownError:"UnknownError",ConstraintError:"ConstraintError",DataError:"DataError",TransactionInactiveError:"TransactionInactiveError",ReadOnlyError:"ReadOnlyError",VersionError:"VersionError",OperationError:"OperationError",NotAllowedError:"NotAllowedError",OptOutError:"OptOutError"}),r=Object.keys(n);function o(f){return typeof f=="number"&&f>=1&&f<=25}function s(f){return typeof f=="string"&&f.substring(f.length-n.Error.length)===n.Error}function i(f,h){o(f)?(this.name=r[f],this.message=h||""):(this.message=f,this.name=s(h)?h:n.Error),Error.captureStackTrace&&Error.captureStackTrace(this,i)}e(i,!0),Object.defineProperties(i.prototype,{code:{enumerable:!0,get:function(){var f=r.indexOf(this.name);return o(f)?f:0}}});for(var a={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25},c=Object.entries(a),u=0;u<c.length;u++){var d=c[u][0];i[d]=c[u][1]}function p(f,h){this.message=f,this.locator=h,Error.captureStackTrace&&Error.captureStackTrace(this,p)}return e(p),No.DOMException=i,No.DOMExceptionName=n,No.ExceptionCode=a,No.ParseError=p,No}var tt={},ye={},wd;function Ah(){if(wd)return ye;wd=1;function t(Pe){try{typeof Pe!="function"&&(Pe=RegExp);var Xe=new Pe("𝌆","u").exec("𝌆");return!!Xe&&Xe[0].length===2}catch{}return!1}var e=t();function n(Pe){if(Pe.source[0]!=="[")throw new Error(Pe+" can not be used with chars");return Pe.source.slice(1,Pe.source.lastIndexOf("]"))}function r(Pe,Xe){if(Pe.source[0]!=="[")throw new Error("/"+Pe.source+"/ can not be used with chars_without");if(!Xe||typeof Xe!="string")throw new Error(JSON.stringify(Xe)+" is not a valid search");if(Pe.source.indexOf(Xe)===-1)throw new Error('"'+Xe+'" is not is /'+Pe.source+"/");if(Xe==="-"&&Pe.source.indexOf(Xe)!==1)throw new Error('"'+Xe+'" is not at the first postion of /'+Pe.source+"/");return new RegExp(Pe.source.replace(Xe,""),e?"u":"")}function o(Pe){var Xe=this;return new RegExp(Array.prototype.slice.call(arguments).map(function(Lt){var Pt=typeof Lt=="string";if(Pt&&Xe===void 0&&Lt==="|")throw new Error("use regg instead of reg to wrap expressions with `|`!");return Pt?Lt:Lt.source}).join(""),e?"mu":"m")}function s(Pe){if(arguments.length===0)throw new Error("no parameters provided");return o.apply(s,["(?:"].concat(Array.prototype.slice.call(arguments),[")"]))}var i="�",a=/[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;e&&(a=o("[",n(a),"\\u{10000}-\\u{10FFFF}","]"));var c=/[\x20\x09\x0D\x0A]/,u=n(c),d=o(c,"+"),p=o(c,"*"),f=/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;e&&(f=o("[",n(f),"\\u{10000}-\\u{10FFFF}","]"));var h=n(f),v=o("[",h,n(/[-.0-9\xB7]/),n(/[\u0300-\u036F\u203F-\u2040]/),"]"),x=o(f,v,"*"),N=o(v,"+"),C=o("&",x,";"),_=s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/),D=s(C,"|",_),L=o("%",x,";"),V=s(o('"',s(/[^%&"]/,"|",L,"|",D),"*",'"'),"|",o("'",s(/[^%&']/,"|",L,"|",D),"*","'")),O=s('"',s(/[^<&"]/,"|",D),"*",'"',"|","'",s(/[^<&']/,"|",D),"*","'"),U=r(f,":"),F=r(v,":"),$=o(U,F,"*"),Y=o($,s(":",$),"?"),k=o("^",Y,"$"),R=o("(",Y,")"),S=s(/"[^"]*"|'[^']*'/),I=o(/^<\?/,"(",x,")",s(d,"(",a,"*?)"),"?",/\?>/),A=/[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/,T=s('"',A,'*"',"|","'",r(A,"'"),"*'"),P="<!--",H="-->",J=o(P,s(r(a,"-"),"|",o("-",r(a,"-"))),"*",H),K="#PCDATA",W=s(o(/\(/,p,K,s(p,/\|/,p,Y),"*",p,/\)\*/),"|",o(/\(/,p,K,p,/\)/)),ee=/[?*+]?/,te=o(/\([^>]+\)/,ee),Z=s("EMPTY","|","ANY","|",W,"|",te),X="<!ELEMENT",le=o(X,d,s(Y,"|",L),d,s(Z,"|",L),p,">"),ce=o("NOTATION",d,/\(/,p,x,s(p,/\|/,p,x),"*",p,/\)/),ue=o(/\(/,p,N,s(p,/\|/,p,N),"*",p,/\)/),ge=s(ce,"|",ue),he=s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/,"|",ge),we=s(/#REQUIRED|#IMPLIED/,"|",s(s("#FIXED",d),"?",O)),ie=s(d,x,d,he,d,we),Ce="<!ATTLIST",De=o(Ce,d,x,ie,"*",p,">"),oe="about:legacy-compat",me=s('"'+oe+'"',"|","'"+oe+"'"),Ne="SYSTEM",Oe="PUBLIC",Fe=s(s(Ne,d,S),"|",s(Oe,d,T,d,S)),Ze=o("^",s(s(Ne,d,"(?<SystemLiteralOnly>",S,")"),"|",s(Oe,d,"(?<PubidLiteral>",T,")",d,"(?<SystemLiteral>",S,")"))),Je=s(d,"NDATA",d,x),ot=s(V,"|",s(Fe,Je,"?")),Ee="<!ENTITY",ut=o(Ee,d,x,d,ot,p,">"),Ve=s(V,"|",Fe),bn=o(Ee,d,"%",d,x,d,Ve,p,">"),Xt=s(ut,"|",bn),Ut=o(Oe,d,T),Qt=o("<!NOTATION",d,x,d,s(Fe,"|",Ut),p,">"),fe=o(p,"=",p),Le=/1[.]\d+/,dt=o(d,"version",fe,s("'",Le,"'","|",'"',Le,'"')),gt=/[A-Za-z][-A-Za-z0-9._]*/,Zt=s(d,"encoding",fe,s('"',gt,'"',"|","'",gt,"'")),en=s(d,"standalone",fe,s("'",s("yes","|","no"),"'","|",'"',s("yes","|","no"),'"')),vn=o(/^<\?xml/,dt,Zt,"?",en,"?",p,/\?>/),tn="<!DOCTYPE",nn="<![CDATA[",Ct="]]>",rn=/<!\[CDATA\[/,on=/\]\]>/,Vt=o(a,"*?",on),In=o(rn,Vt);return ye.chars=n,ye.chars_without=r,ye.detectUnicodeSupport=t,ye.reg=o,ye.regg=s,ye.ABOUT_LEGACY_COMPAT=oe,ye.ABOUT_LEGACY_COMPAT_SystemLiteral=me,ye.AttlistDecl=De,ye.CDATA_START=nn,ye.CDATA_END=Ct,ye.CDSect=In,ye.Char=a,ye.Comment=J,ye.COMMENT_START=P,ye.COMMENT_END=H,ye.DOCTYPE_DECL_START=tn,ye.elementdecl=le,ye.EntityDecl=Xt,ye.EntityValue=V,ye.ExternalID=Fe,ye.ExternalID_match=Ze,ye.Name=x,ye.NotationDecl=Qt,ye.Reference=D,ye.PEReference=L,ye.PI=I,ye.PUBLIC=Oe,ye.PubidLiteral=T,ye.QName=Y,ye.QName_exact=k,ye.QName_group=R,ye.S=d,ye.SChar_s=u,ye.S_OPT=p,ye.SYSTEM=Ne,ye.SystemLiteral=S,ye.UNICODE_REPLACEMENT_CHARACTER=i,ye.UNICODE_SUPPORT=e,ye.XMLDecl=vn,ye}var gd;function Dh(){if(gd)return tt;gd=1;var t=ts(),e=t.find,n=t.hasDefaultHTMLNamespace,r=t.hasOwn,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.isHTMLVoidElement,a=t.MIME_TYPE,c=t.NAMESPACE,u=Symbol(),d=Ta(),p=d.DOMException,f=d.DOMExceptionName,h=Ah();function v(b){if(b!==u)throw new TypeError("Illegal constructor")}function x(b){return b!==""}function N(b){return b?b.split(/[\t\n\f\r ]+/).filter(x):[]}function C(b,y){return r(b,y)||(b[y]=!0),b}function _(b){if(!b)return[];var y=N(b);return Object.keys(y.reduce(C,{}))}function D(b){return function(y){return b&&b.indexOf(y)!==-1}}function L(b){if(!h.QName_exact.test(b))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in qualified name "'+b+'"')}function V(b,y){L(y),b=b||null;var M=null,G=y;if(y.indexOf(":")>=0){var re=y.split(":");M=re[0],G=re[1]}if(M!==null&&b===null)throw new p(p.NAMESPACE_ERR,"prefix is non-null and namespace is null");if(M==="xml"&&b!==t.NAMESPACE.XML)throw new p(p.NAMESPACE_ERR,'prefix is "xml" and namespace is not the XML namespace');if((M==="xmlns"||y==="xmlns")&&b!==t.NAMESPACE.XMLNS)throw new p(p.NAMESPACE_ERR,'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');if(b===t.NAMESPACE.XMLNS&&M!=="xmlns"&&y!=="xmlns")throw new p(p.NAMESPACE_ERR,'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');return[b,M,G]}function O(b,y){for(var M in b)r(b,M)&&(y[M]=b[M])}function U(b,y){var M=b.prototype;if(!(M instanceof y)){let G=function(){};G.prototype=y.prototype,G=new G,O(M,G),b.prototype=M=G}M.constructor!=b&&(typeof b!="function"&&console.error("unknown Class:"+b),M.constructor=b)}var F={},$=F.ELEMENT_NODE=1,Y=F.ATTRIBUTE_NODE=2,k=F.TEXT_NODE=3,R=F.CDATA_SECTION_NODE=4,S=F.ENTITY_REFERENCE_NODE=5,I=F.ENTITY_NODE=6,A=F.PROCESSING_INSTRUCTION_NODE=7,T=F.COMMENT_NODE=8,P=F.DOCUMENT_NODE=9,H=F.DOCUMENT_TYPE_NODE=10,J=F.DOCUMENT_FRAGMENT_NODE=11,K=F.NOTATION_NODE=12,W=t.freeze({DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:2,DOCUMENT_POSITION_FOLLOWING:4,DOCUMENT_POSITION_CONTAINS:8,DOCUMENT_POSITION_CONTAINED_BY:16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32});function ee(b,y){if(y.length<b.length)return ee(y,b);var M=null;for(var G in b){if(b[G]!==y[G])return M;M=b[G]}return M}function te(b){return b.guid||(b.guid=Math.random()),b.guid}function Z(){}Z.prototype={length:0,item:function(b){return b>=0&&b<this.length?this[b]:null},toString:function(b){for(var y=[],M=0;M<this.length;M++)Pt(this[M],y,b);return y.join("")},filter:function(b){return Array.prototype.filter.call(this,b)},indexOf:function(b){return Array.prototype.indexOf.call(this,b)}},Z.prototype[Symbol.iterator]=function(){var b=this,y=0;return{next:function(){return y<b.length?{value:b[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function X(b,y){this._node=b,this._refresh=y,le(this)}function le(b){var y=b._node._inc||b._node.ownerDocument._inc;if(b._inc!==y){var M=b._refresh(b._node);if(dn(b,"length",M.length),!b.$$length||M.length<b.$$length)for(var G=M.length;G in b;G++)r(b,G)&&delete b[G];O(M,b),b._inc=y}}X.prototype.item=function(b){return le(this),this[b]||null},U(X,Z);function ce(){}function ue(b,y){for(var M=0;M<b.length;){if(b[M]===y)return M;M++}}function ge(b,y,M,G){if(G?y[ue(y,G)]=M:(y[y.length]=M,y.length++),b){M.ownerElement=b;var re=b.ownerDocument;re&&(G&&Ne(re,b,G),me(re,b,M))}}function he(b,y,M){var G=ue(y,M);if(G>=0){for(var re=y.length-1;G<=re;)y[G]=y[++G];if(y.length=re,b){var ae=b.ownerDocument;ae&&Ne(ae,b,M),M.ownerElement=null}}}ce.prototype={length:0,item:Z.prototype.item,getNamedItem:function(b){this._ownerElement&&this._ownerElement._isInHTMLDocumentAndNamespace()&&(b=b.toLowerCase());for(var y=0;y<this.length;){var M=this[y];if(M.nodeName===b)return M;y++}return null},setNamedItem:function(b){var y=b.ownerElement;if(y&&y!==this._ownerElement)throw new p(p.INUSE_ATTRIBUTE_ERR);var M=this.getNamedItemNS(b.namespaceURI,b.localName);return M===b?b:(ge(this._ownerElement,this,b,M),M)},setNamedItemNS:function(b){return this.setNamedItem(b)},removeNamedItem:function(b){var y=this.getNamedItem(b);if(!y)throw new p(p.NOT_FOUND_ERR,b);return he(this._ownerElement,this,y),y},removeNamedItemNS:function(b,y){var M=this.getNamedItemNS(b,y);if(!M)throw new p(p.NOT_FOUND_ERR,b?b+" : "+y:y);return he(this._ownerElement,this,M),M},getNamedItemNS:function(b,y){b||(b=null);for(var M=0;M<this.length;){var G=this[M];if(G.localName===y&&G.namespaceURI===b)return G;M++}return null}},ce.prototype[Symbol.iterator]=function(){var b=this,y=0;return{next:function(){return y<b.length?{value:b[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function we(){}we.prototype={hasFeature:function(b,y){return!0},createDocument:function(b,y,M){var G=a.XML_APPLICATION;b===c.HTML?G=a.XML_XHTML_APPLICATION:b===c.SVG&&(G=a.XML_SVG_IMAGE);var re=new oe(u,{contentType:G});if(re.implementation=this,re.childNodes=new Z,re.doctype=M||null,M&&re.appendChild(M),y){var ae=re.createElementNS(b,y);re.appendChild(ae)}return re},createDocumentType:function(b,y,M,G){L(b);var re=new tn(u);return re.name=b,re.nodeName=b,re.publicId=y||"",re.systemId=M||"",re.internalSubset=G||"",re.childNodes=new Z,re},createHTMLDocument:function(b){var y=new oe(u,{contentType:a.HTML});if(y.implementation=this,y.childNodes=new Z,b!==!1){y.doctype=this.createDocumentType("html"),y.doctype.ownerDocument=y,y.appendChild(y.doctype);var M=y.createElement("html");y.appendChild(M);var G=y.createElement("head");if(M.appendChild(G),typeof b=="string"){var re=y.createElement("title");re.appendChild(y.createTextNode(b)),G.appendChild(re)}M.appendChild(y.createElement("body"))}return y}};function ie(b){v(b)}ie.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,parentNode:null,get parentElement(){return this.parentNode&&this.parentNode.nodeType===this.ELEMENT_NODE?this.parentNode:null},childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,baseURI:"about:blank",get isConnected(){var b=this.getRootNode();return b&&b.nodeType===b.DOCUMENT_NODE},contains:function(b){if(!b)return!1;var y=b;do{if(this===y)return!0;y=b.parentNode}while(y);return!1},getRootNode:function(b){var y=this;do{if(!y.parentNode)return y;y=y.parentNode}while(y)},isEqualNode:function(b){if(!b||this.nodeType!==b.nodeType)return!1;switch(this.nodeType){case this.DOCUMENT_TYPE_NODE:if(this.name!==b.name||this.publicId!==b.publicId||this.systemId!==b.systemId)return!1;break;case this.ELEMENT_NODE:if(this.namespaceURI!==b.namespaceURI||this.prefix!==b.prefix||this.localName!==b.localName||this.attributes.length!==b.attributes.length)return!1;for(var y=0;y<this.attributes.length;y++){var M=this.attributes.item(y);if(!M.isEqualNode(b.getAttributeNodeNS(M.namespaceURI,M.localName)))return!1}break;case this.ATTRIBUTE_NODE:if(this.namespaceURI!==b.namespaceURI||this.localName!==b.localName||this.value!==b.value)return!1;break;case this.PROCESSING_INSTRUCTION_NODE:if(this.target!==b.target||this.data!==b.data)return!1;break;case this.TEXT_NODE:case this.COMMENT_NODE:if(this.data!==b.data)return!1;break}if(this.childNodes.length!==b.childNodes.length)return!1;for(var y=0;y<this.childNodes.length;y++)if(!this.childNodes[y].isEqualNode(b.childNodes[y]))return!1;return!0},isSameNode:function(b){return this===b},insertBefore:function(b,y){return fe(this,b,y)},replaceChild:function(b,y){fe(this,b,y,Qt),y&&this.removeChild(y)},removeChild:function(b){return Fe(this,b)},appendChild:function(b){return this.insertBefore(b,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(b){return hr(this.ownerDocument||this,this,b)},normalize:function(){for(var b=this.firstChild;b;){var y=b.nextSibling;y&&y.nodeType==k&&b.nodeType==k?(this.removeChild(y),b.appendData(y.data)):(b.normalize(),b=y)}},isSupported:function(b,y){return this.ownerDocument.implementation.hasFeature(b,y)},lookupPrefix:function(b){for(var y=this;y;){var M=y._nsMap;if(M){for(var G in M)if(r(M,G)&&M[G]===b)return G}y=y.nodeType==Y?y.ownerDocument:y.parentNode}return null},lookupNamespaceURI:function(b){for(var y=this;y;){var M=y._nsMap;if(M&&r(M,b))return M[b];y=y.nodeType==Y?y.ownerDocument:y.parentNode}return null},isDefaultNamespace:function(b){var y=this.lookupPrefix(b);return y==null},compareDocumentPosition:function(b){if(this===b)return 0;var y=b,M=this,G=null,re=null;if(y instanceof dt&&(G=y,y=G.ownerElement),M instanceof dt&&(re=M,M=re.ownerElement,G&&y&&M===y))for(var ae=0,ke;ke=M.attributes[ae];ae++){if(ke===G)return W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+W.DOCUMENT_POSITION_PRECEDING;if(ke===re)return W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+W.DOCUMENT_POSITION_FOLLOWING}if(!y||!M||M.ownerDocument!==y.ownerDocument)return W.DOCUMENT_POSITION_DISCONNECTED+W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+(te(M.ownerDocument)>te(y.ownerDocument)?W.DOCUMENT_POSITION_FOLLOWING:W.DOCUMENT_POSITION_PRECEDING);if(re&&y===M)return W.DOCUMENT_POSITION_CONTAINS+W.DOCUMENT_POSITION_PRECEDING;if(G&&y===M)return W.DOCUMENT_POSITION_CONTAINED_BY+W.DOCUMENT_POSITION_FOLLOWING;for(var et=[],it=y.parentNode;it;){if(!re&&it===M)return W.DOCUMENT_POSITION_CONTAINED_BY+W.DOCUMENT_POSITION_FOLLOWING;et.push(it),it=it.parentNode}et.reverse();for(var Et=[],pt=M.parentNode;pt;){if(!G&&pt===y)return W.DOCUMENT_POSITION_CONTAINS+W.DOCUMENT_POSITION_PRECEDING;Et.push(pt),pt=pt.parentNode}Et.reverse();var We=ee(et,Et);for(var sn in We.childNodes){var Dt=We.childNodes[sn];if(Dt===M)return W.DOCUMENT_POSITION_FOLLOWING;if(Dt===y)return W.DOCUMENT_POSITION_PRECEDING;if(Et.indexOf(Dt)>=0)return W.DOCUMENT_POSITION_FOLLOWING;if(et.indexOf(Dt)>=0)return W.DOCUMENT_POSITION_PRECEDING}return 0}};function Ce(b){return b=="<"&&"&lt;"||b==">"&&"&gt;"||b=="&"&&"&amp;"||b=='"'&&"&quot;"||"&#"+b.charCodeAt()+";"}O(F,ie),O(F,ie.prototype),O(W,ie),O(W,ie.prototype);function De(b,y){if(y(b))return!0;if(b=b.firstChild)do if(De(b,y))return!0;while(b=b.nextSibling)}function oe(b,y){v(b);var M=y||{};this.ownerDocument=this,this.contentType=M.contentType||a.XML_APPLICATION,this.type=o(this.contentType)?"html":"xml"}function me(b,y,M){b&&b._inc++;var G=M.namespaceURI;G===c.XMLNS&&(y._nsMap[M.prefix?M.localName:""]=M.value)}function Ne(b,y,M,G){b&&b._inc++;var re=M.namespaceURI;re===c.XMLNS&&delete y._nsMap[M.prefix?M.localName:""]}function Oe(b,y,M){if(b&&b._inc){b._inc++;var G=y.childNodes;if(M&&!M.nextSibling)G[G.length++]=M;else{for(var re=y.firstChild,ae=0;re;)G[ae++]=re,re=re.nextSibling;G.length=ae,delete G[G.length]}}}function Fe(b,y){if(b!==y.parentNode)throw new p(p.NOT_FOUND_ERR,"child's parent is not parent");var M=y.previousSibling,G=y.nextSibling;return M?M.nextSibling=G:b.firstChild=G,G?G.previousSibling=M:b.lastChild=M,Oe(b.ownerDocument,b),y.parentNode=null,y.previousSibling=null,y.nextSibling=null,y}function Ze(b){return b&&(b.nodeType===ie.DOCUMENT_NODE||b.nodeType===ie.DOCUMENT_FRAGMENT_NODE||b.nodeType===ie.ELEMENT_NODE)}function Je(b){return b&&(b.nodeType===ie.CDATA_SECTION_NODE||b.nodeType===ie.COMMENT_NODE||b.nodeType===ie.DOCUMENT_FRAGMENT_NODE||b.nodeType===ie.DOCUMENT_TYPE_NODE||b.nodeType===ie.ELEMENT_NODE||b.nodeType===ie.PROCESSING_INSTRUCTION_NODE||b.nodeType===ie.TEXT_NODE)}function ot(b){return b&&b.nodeType===ie.DOCUMENT_TYPE_NODE}function Ee(b){return b&&b.nodeType===ie.ELEMENT_NODE}function ut(b){return b&&b.nodeType===ie.TEXT_NODE}function Ve(b,y){var M=b.childNodes||[];if(e(M,Ee)||ot(y))return!1;var G=e(M,ot);return!(y&&G&&M.indexOf(G)>M.indexOf(y))}function bn(b,y){var M=b.childNodes||[];function G(ae){return Ee(ae)&&ae!==y}if(e(M,G))return!1;var re=e(M,ot);return!(y&&re&&M.indexOf(re)>M.indexOf(y))}function Xt(b,y,M){if(!Ze(b))throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected parent node type "+b.nodeType);if(M&&M.parentNode!==b)throw new p(p.NOT_FOUND_ERR,"child not in parent");if(!Je(y)||ot(y)&&b.nodeType!==ie.DOCUMENT_NODE)throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected node type "+y.nodeType+" for parent node type "+b.nodeType)}function Ut(b,y,M){var G=b.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!Ve(b,M))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!Ve(b,M))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(G,ot))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(G,Ee);if(M&&G.indexOf(ke)<G.indexOf(M))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element");if(!M&&ke)throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can not be appended since element is present")}}function Qt(b,y,M){var G=b.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!bn(b,M))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!bn(b,M))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(G,function(it){return ot(it)&&it!==M}))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(G,Ee);if(M&&G.indexOf(ke)<G.indexOf(M))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element")}}function fe(b,y,M,G){Xt(b,y,M),b.nodeType===ie.DOCUMENT_NODE&&(G||Ut)(b,y,M);var re=y.parentNode;if(re&&re.removeChild(y),y.nodeType===J){var ae=y.firstChild;if(ae==null)return y;var ke=y.lastChild}else ae=ke=y;var et=M?M.previousSibling:b.lastChild;ae.previousSibling=et,ke.nextSibling=M,et?et.nextSibling=ae:b.firstChild=ae,M==null?b.lastChild=ke:M.previousSibling=ke;do ae.parentNode=b;while(ae!==ke&&(ae=ae.nextSibling));return Oe(b.ownerDocument||b,b,y),y.nodeType==J&&(y.firstChild=y.lastChild=null),y}oe.prototype={implementation:null,nodeName:"#document",nodeType:P,doctype:null,documentElement:null,_inc:1,insertBefore:function(b,y){if(b.nodeType===J){for(var M=b.firstChild;M;){var G=M.nextSibling;this.insertBefore(M,y),M=G}return b}return fe(this,b,y),b.ownerDocument=this,this.documentElement===null&&b.nodeType===$&&(this.documentElement=b),b},removeChild:function(b){var y=Fe(this,b);return y===this.documentElement&&(this.documentElement=null),y},replaceChild:function(b,y){fe(this,b,y,Qt),b.ownerDocument=this,y&&this.removeChild(y),Ee(b)&&(this.documentElement=b)},importNode:function(b,y){return xn(this,b,y)},getElementById:function(b){var y=null;return De(this.documentElement,function(M){if(M.nodeType==$&&M.getAttribute("id")==b)return y=M,!0}),y},createElement:function(b){var y=new Le(u);y.ownerDocument=this,this.type==="html"&&(b=b.toLowerCase()),n(this.contentType)&&(y.namespaceURI=c.HTML),y.nodeName=b,y.tagName=b,y.localName=b,y.childNodes=new Z;var M=y.attributes=new ce;return M._ownerElement=y,y},createDocumentFragment:function(){var b=new on(u);return b.ownerDocument=this,b.childNodes=new Z,b},createTextNode:function(b){var y=new Zt(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(b),y},createComment:function(b){var y=new en(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(b),y},createCDATASection:function(b){var y=new vn(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(b),y},createProcessingInstruction:function(b,y){var M=new Vt(u);return M.ownerDocument=this,M.childNodes=new Z,M.nodeName=M.target=b,M.nodeValue=M.data=y,M},createAttribute:function(b){if(!h.QName_exact.test(b))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in name "'+b+'"');return this.type==="html"&&(b=b.toLowerCase()),this._createAttribute(b)},_createAttribute:function(b){var y=new dt(u);return y.ownerDocument=this,y.childNodes=new Z,y.name=b,y.nodeName=b,y.localName=b,y.specified=!0,y},createEntityReference:function(b){if(!h.Name.test(b))throw new p(p.INVALID_CHARACTER_ERR,'not a valid xml name "'+b+'"');if(this.type==="html")throw new p("document is an html document",f.NotSupportedError);var y=new rn(u);return y.ownerDocument=this,y.childNodes=new Z,y.nodeName=b,y},createElementNS:function(b,y){var M=V(b,y),G=new Le(u),re=G.attributes=new ce;return G.childNodes=new Z,G.ownerDocument=this,G.nodeName=y,G.tagName=y,G.namespaceURI=M[0],G.prefix=M[1],G.localName=M[2],re._ownerElement=G,G},createAttributeNS:function(b,y){var M=V(b,y),G=new dt(u);return G.ownerDocument=this,G.childNodes=new Z,G.nodeName=y,G.name=y,G.specified=!0,G.namespaceURI=M[0],G.prefix=M[1],G.localName=M[2],G}},U(oe,ie);function Le(b){v(b),this._nsMap=Object.create(null)}Le.prototype={nodeType:$,attributes:null,getQualifiedName:function(){return this.prefix?this.prefix+":"+this.localName:this.localName},_isInHTMLDocumentAndNamespace:function(){return this.ownerDocument.type==="html"&&this.namespaceURI===c.HTML},hasAttributes:function(){return!!(this.attributes&&this.attributes.length)},hasAttribute:function(b){return!!this.getAttributeNode(b)},getAttribute:function(b){var y=this.getAttributeNode(b);return y?y.value:null},getAttributeNode:function(b){return this._isInHTMLDocumentAndNamespace()&&(b=b.toLowerCase()),this.attributes.getNamedItem(b)},setAttribute:function(b,y){this._isInHTMLDocumentAndNamespace()&&(b=b.toLowerCase());var M=this.getAttributeNode(b);M?M.value=M.nodeValue=""+y:(M=this.ownerDocument._createAttribute(b),M.value=M.nodeValue=""+y,this.setAttributeNode(M))},removeAttribute:function(b){var y=this.getAttributeNode(b);y&&this.removeAttributeNode(y)},setAttributeNode:function(b){return this.attributes.setNamedItem(b)},setAttributeNodeNS:function(b){return this.attributes.setNamedItemNS(b)},removeAttributeNode:function(b){return this.attributes.removeNamedItem(b.nodeName)},removeAttributeNS:function(b,y){var M=this.getAttributeNodeNS(b,y);M&&this.removeAttributeNode(M)},hasAttributeNS:function(b,y){return this.getAttributeNodeNS(b,y)!=null},getAttributeNS:function(b,y){var M=this.getAttributeNodeNS(b,y);return M?M.value:null},setAttributeNS:function(b,y,M){var G=V(b,y),re=G[2],ae=this.getAttributeNodeNS(b,re);ae?ae.value=ae.nodeValue=""+M:(ae=this.ownerDocument.createAttributeNS(b,y),ae.value=ae.nodeValue=""+M,this.setAttributeNode(ae))},getAttributeNodeNS:function(b,y){return this.attributes.getNamedItemNS(b,y)},getElementsByClassName:function(b){var y=_(b);return new X(this,function(M){var G=[];return y.length>0&&De(M,function(re){if(re!==M&&re.nodeType===$){var ae=re.getAttribute("class");if(ae){var ke=b===ae;if(!ke){var et=_(ae);ke=y.every(D(et))}ke&&G.push(re)}}}),G})},getElementsByTagName:function(b){var y=(this.nodeType===P?this:this.ownerDocument).type==="html",M=b.toLowerCase();return new X(this,function(G){var re=[];return De(G,function(ae){if(!(ae===G||ae.nodeType!==$))if(b==="*")re.push(ae);else{var ke=ae.getQualifiedName(),et=y&&ae.namespaceURI===c.HTML?M:b;ke===et&&re.push(ae)}}),re})},getElementsByTagNameNS:function(b,y){return new X(this,function(M){var G=[];return De(M,function(re){re!==M&&re.nodeType===$&&(b==="*"||re.namespaceURI===b)&&(y==="*"||re.localName==y)&&G.push(re)}),G})}},oe.prototype.getElementsByClassName=Le.prototype.getElementsByClassName,oe.prototype.getElementsByTagName=Le.prototype.getElementsByTagName,oe.prototype.getElementsByTagNameNS=Le.prototype.getElementsByTagNameNS,U(Le,ie);function dt(b){v(b),this.namespaceURI=null,this.prefix=null,this.ownerElement=null}dt.prototype.nodeType=Y,U(dt,ie);function gt(b){v(b)}gt.prototype={data:"",substringData:function(b,y){return this.data.substring(b,b+y)},appendData:function(b){b=this.data+b,this.nodeValue=this.data=b,this.length=b.length},insertData:function(b,y){this.replaceData(b,0,y)},deleteData:function(b,y){this.replaceData(b,y,"")},replaceData:function(b,y,M){var G=this.data.substring(0,b),re=this.data.substring(b+y);M=G+M+re,this.nodeValue=this.data=M,this.length=M.length}},U(gt,ie);function Zt(b){v(b)}Zt.prototype={nodeName:"#text",nodeType:k,splitText:function(b){var y=this.data,M=y.substring(b);y=y.substring(0,b),this.data=this.nodeValue=y,this.length=y.length;var G=this.ownerDocument.createTextNode(M);return this.parentNode&&this.parentNode.insertBefore(G,this.nextSibling),G}},U(Zt,gt);function en(b){v(b)}en.prototype={nodeName:"#comment",nodeType:T},U(en,gt);function vn(b){v(b)}vn.prototype={nodeName:"#cdata-section",nodeType:R},U(vn,Zt);function tn(b){v(b)}tn.prototype.nodeType=H,U(tn,ie);function nn(b){v(b)}nn.prototype.nodeType=K,U(nn,ie);function Ct(b){v(b)}Ct.prototype.nodeType=I,U(Ct,ie);function rn(b){v(b)}rn.prototype.nodeType=S,U(rn,ie);function on(b){v(b)}on.prototype.nodeName="#document-fragment",on.prototype.nodeType=J,U(on,ie);function Vt(b){v(b)}Vt.prototype.nodeType=A,U(Vt,gt);function In(){}In.prototype.serializeToString=function(b,y){return Pe.call(b,y)},ie.prototype.toString=Pe;function Pe(b){var y=[],M=this.nodeType===P&&this.documentElement||this,G=M.prefix,re=M.namespaceURI;if(re&&G==null){var G=M.lookupPrefix(re);if(G==null)var ae=[{namespace:re,prefix:null}]}return Pt(this,y,b,ae),y.join("")}function Xe(b,y,M){var G=b.prefix||"",re=b.namespaceURI;if(!re||G==="xml"&&re===c.XML||re===c.XMLNS)return!1;for(var ae=M.length;ae--;){var ke=M[ae];if(ke.prefix===G)return ke.namespace!==re}return!0}function Lt(b,y,M){b.push(" ",y,'="',M.replace(/[<>&"\t\n\r]/g,Ce),'"')}function Pt(b,y,M,G){G||(G=[]);var re=b.nodeType===P?b:b.ownerDocument,ae=re.type==="html";if(M)if(b=M(b),b){if(typeof b=="string"){y.push(b);return}}else return;switch(b.nodeType){case $:var ke=b.attributes,et=ke.length,lt=b.firstChild,it=b.tagName,Et=it;if(!ae&&!b.prefix&&b.namespaceURI){for(var pt,We=0;We<ke.length;We++)if(ke.item(We).name==="xmlns"){pt=ke.item(We).value;break}if(!pt)for(var sn=G.length-1;sn>=0;sn--){var Dt=G[sn];if(Dt.prefix===""&&Dt.namespace===b.namespaceURI){pt=Dt.namespace;break}}if(pt!==b.namespaceURI)for(var sn=G.length-1;sn>=0;sn--){var Dt=G[sn];if(Dt.namespace===b.namespaceURI){Dt.prefix&&(Et=Dt.prefix+":"+it);break}}}y.push("<",Et);for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);Ht.prefix=="xmlns"?G.push({prefix:Ht.localName,namespace:Ht.value}):Ht.nodeName=="xmlns"&&G.push({prefix:"",namespace:Ht.value})}for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);if(Xe(Ht,ae,G)){var _n=Ht.prefix||"",at=Ht.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),G.push({prefix:_n,namespace:at})}Pt(Ht,y,M,G)}if(it===Et&&Xe(b,ae,G)){var _n=b.prefix||"",at=b.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),G.push({prefix:_n,namespace:at})}var $r=!lt;if($r&&(ae||b.namespaceURI===c.HTML)&&($r=i(it)),$r)y.push("/>");else{if(y.push(">"),ae&&s(it))for(;lt;)lt.data?y.push(lt.data):Pt(lt,y,M,G.slice()),lt=lt.nextSibling;else for(;lt;)Pt(lt,y,M,G.slice()),lt=lt.nextSibling;y.push("</",Et,">")}return;case P:case J:for(var lt=b.firstChild;lt;)Pt(lt,y,M,G.slice()),lt=lt.nextSibling;return;case Y:return Lt(y,b.name,b.value);case k:return y.push(b.data.replace(/[<&>]/g,Ce));case R:return y.push(h.CDATA_START,b.data,h.CDATA_END);case T:return y.push(h.COMMENT_START,b.data,h.COMMENT_END);case H:var xo=b.publicId,Ln=b.systemId;y.push(h.DOCTYPE_DECL_START," ",b.name),xo?(y.push(" ",h.PUBLIC," ",xo),Ln&&Ln!=="."&&y.push(" ",Ln)):Ln&&Ln!=="."&&y.push(" ",h.SYSTEM," ",Ln),b.internalSubset&&y.push(" [",b.internalSubset,"]"),y.push(">");return;case A:return y.push("<?",b.target," ",b.data,"?>");case S:return y.push("&",b.nodeName,";");default:y.push("??",b.nodeName)}}function xn(b,y,M){var G;switch(y.nodeType){case $:G=y.cloneNode(!1),G.ownerDocument=b;case J:break;case Y:M=!0;break}if(G||(G=y.cloneNode(!1)),G.ownerDocument=b,G.parentNode=null,M)for(var re=y.firstChild;re;)G.appendChild(xn(b,re,M)),re=re.nextSibling;return G}function hr(b,y,M){var G=new y.constructor(u);for(var re in y)if(r(y,re)){var ae=y[re];typeof ae!="object"&&ae!=G[re]&&(G[re]=ae)}switch(y.childNodes&&(G.childNodes=new Z),G.ownerDocument=b,G.nodeType){case $:var ke=y.attributes,et=G.attributes=new ce,it=ke.length;et._ownerElement=G;for(var Et=0;Et<it;Et++)G.setAttributeNode(hr(b,ke.item(Et),!0));break;case Y:M=!0}if(M)for(var pt=y.firstChild;pt;)G.appendChild(hr(b,pt,M)),pt=pt.nextSibling;return G}function dn(b,y,M){b[y]=M}try{if(Object.defineProperty){let b=function(y){switch(y.nodeType){case $:case J:var M=[];for(y=y.firstChild;y;)y.nodeType!==7&&y.nodeType!==8&&M.push(b(y)),y=y.nextSibling;return M.join("");default:return y.nodeValue}};Object.defineProperty(X.prototype,"length",{get:function(){return le(this),this.$$length}}),Object.defineProperty(ie.prototype,"textContent",{get:function(){return b(this)},set:function(y){switch(this.nodeType){case $:case J:for(;this.firstChild;)this.removeChild(this.firstChild);(y||String(y))&&this.appendChild(this.ownerDocument.createTextNode(y));break;default:this.data=y,this.value=y,this.nodeValue=y}}}),dn=function(y,M,G){y["$$"+M]=G}}}catch{}return tt._updateLiveList=le,tt.Attr=dt,tt.CDATASection=vn,tt.CharacterData=gt,tt.Comment=en,tt.Document=oe,tt.DocumentFragment=on,tt.DocumentType=tn,tt.DOMImplementation=we,tt.Element=Le,tt.Entity=Ct,tt.EntityReference=rn,tt.LiveNodeList=X,tt.NamedNodeMap=ce,tt.Node=ie,tt.NodeList=Z,tt.Notation=nn,tt.Text=Zt,tt.ProcessingInstruction=Vt,tt.XMLSerializer=In,tt}var Ur={},pl={},md;function sv(){return md||(md=1,function(t){var e=ts().freeze;t.XML_ENTITIES=e({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),t.HTML_ENTITIES=e({Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",Gt:"≫",GT:">",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬",int:"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",Lt:"≪",LT:"<",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}),t.entityMap=t.HTML_ENTITIES}(pl)),pl}var ms={},bd;function iv(){if(bd)return ms;bd=1;var t=ts(),e=Ah(),n=Ta(),r=t.isHTMLEscapableRawTextElement,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.hasOwn,a=t.NAMESPACE,c=n.ParseError,u=n.DOMException,d=0,p=1,f=2,h=3,v=4,x=5,N=6,C=7;function _(){}_.prototype={parse:function(A,T,P){var H=this.domBuilder;H.startDocument(),$(T,T=Object.create(null)),L(A,T,P,H,this.errorHandler),H.endDocument()}};var D=/&#?\w+;?/g;function L(A,T,P,H,J){var K=o(H.mimeType);A.indexOf(e.UNICODE_REPLACEMENT_CHARACTER)>=0&&J.warning("Unicode replacement character detected, source encoding issues?");function W(fe){if(fe>65535){fe-=65536;var Le=55296+(fe>>10),dt=56320+(fe&1023);return String.fromCharCode(Le,dt)}else return String.fromCharCode(fe)}function ee(fe){var Le=fe[fe.length-1]===";"?fe:fe+";";if(!K&&Le!==fe)return J.error("EntityRef: expecting ;"),fe;var dt=e.Reference.exec(Le);if(!dt||dt[0].length!==Le.length)return J.error("entity not matching Reference production: "+fe),fe;var gt=Le.slice(1,-1);return i(P,gt)?P[gt]:gt.charAt(0)==="#"?W(parseInt(gt.substring(1).replace("x","0x"))):(J.error("entity not found:"+fe),fe)}function te(fe){if(fe>we){var Le=A.substring(we,fe).replace(D,ee);ce&&ue(we),H.characters(Le,0,fe-we),we=fe}}var Z=0,X=0,le=/\r\n?|\n|$/g,ce=H.locator;function ue(fe,Le){for(;fe>=X&&(Le=le.exec(A));)Z=X,X=Le.index+Le[0].length,ce.lineNumber++;ce.columnNumber=fe-Z+1}for(var ge=[{currentNSMap:T}],he=[],we=0;;){try{var ie=A.indexOf("<",we);if(ie<0){if(!K&&he.length>0)return J.fatalError("unclosed xml tag(s): "+he.join(", "));if(!A.substring(we).match(/^\s*$/)){var Ce=H.doc,De=Ce.createTextNode(A.substring(we));if(Ce.documentElement)return J.error("Extra content at the end of the document");Ce.appendChild(De),H.currentElement=De}return}if(ie>we){var oe=A.substring(we,ie);!K&&he.length===0&&(oe=oe.replace(new RegExp(e.S_OPT.source,"g"),""),oe&&J.error("Unexpected content outside root element: '"+oe+"'")),te(ie)}switch(A.charAt(ie+1)){case"/":var Ve=A.indexOf(">",ie+2),me=A.substring(ie+2,Ve>0?Ve:void 0);if(!me)return J.fatalError("end tag name missing");var Ne=Ve>0&&e.reg("^",e.QName_group,e.S_OPT,"$").exec(me);if(!Ne)return J.fatalError('end tag name contains invalid characters: "'+me+'"');if(!H.currentElement&&!H.doc.documentElement)return;var Oe=he[he.length-1]||H.currentElement.tagName||H.doc.documentElement.tagName||"";if(Oe!==Ne[1]){var Fe=Ne[1].toLowerCase();if(!K||Oe.toLowerCase()!==Fe)return J.fatalError('Opening and ending tag mismatch: "'+Oe+'" != "'+me+'"')}var Ze=ge.pop();he.pop();var Je=Ze.localNSMap;if(H.endElement(Ze.uri,Ze.localName,Oe),Je)for(var ot in Je)i(Je,ot)&&H.endPrefixMapping(ot);Ve++;break;case"?":ce&&ue(ie),Ve=S(A,ie,H,J);break;case"!":ce&&ue(ie),Ve=R(A,ie,H,J,K);break;default:ce&&ue(ie);var Ee=new I,ut=ge[ge.length-1].currentNSMap,Ve=O(A,ie,Ee,ut,ee,J,K),bn=Ee.length;if(Ee.closed||(K&&t.isHTMLVoidElement(Ee.tagName)?Ee.closed=!0:he.push(Ee.tagName)),ce&&bn){for(var Xt=V(ce,{}),Ut=0;Ut<bn;Ut++){var Qt=Ee[Ut];ue(Qt.offset),Qt.locator=V(ce,{})}H.locator=Xt,U(Ee,H,ut)&&ge.push(Ee),H.locator=ce}else U(Ee,H,ut)&&ge.push(Ee);K&&!Ee.closed?Ve=F(A,Ve,Ee.tagName,ee,H):Ve++}}catch(fe){if(fe instanceof c)throw fe;if(fe instanceof u)throw new c(fe.name+": "+fe.message,H.locator,fe);J.error("element parse error: "+fe),Ve=-1}Ve>we?we=Ve:te(Math.max(ie,we)+1)}}function V(A,T){return T.lineNumber=A.lineNumber,T.columnNumber=A.columnNumber,T}function O(A,T,P,H,J,K,W){function ee(ue,ge,he){if(i(P.attributeNames,ue))return K.fatalError("Attribute "+ue+" redefined");if(!W&&ge.indexOf("<")>=0)return K.fatalError("Unescaped '<' not allowed in attributes values");P.addValue(ue,ge.replace(/[\t\n\r]/g," ").replace(D,J),he)}for(var te,Z,X=++T,le=d;;){var ce=A.charAt(X);switch(ce){case"=":if(le===p)te=A.slice(T,X),le=h;else if(le===f)le=h;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(le===h||le===p)if(le===p&&(K.warning('attribute value must after "="'),te=A.slice(T,X)),T=X+1,X=A.indexOf(ce,T),X>0)Z=A.slice(T,X),ee(te,Z,T-1),le=x;else throw new Error("attribute value no end '"+ce+"' match");else if(le==v)Z=A.slice(T,X),ee(te,Z,T),K.warning('attribute "'+te+'" missed start quot('+ce+")!!"),T=X+1,le=x;else throw new Error('attribute value must after "="');break;case"/":switch(le){case d:P.setTagName(A.slice(T,X));case x:case N:case C:le=C,P.closed=!0;case v:case p:break;case f:P.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return K.error("unexpected end of input"),le==d&&P.setTagName(A.slice(T,X)),X;case">":switch(le){case d:P.setTagName(A.slice(T,X));case x:case N:case C:break;case v:case p:Z=A.slice(T,X),Z.slice(-1)==="/"&&(P.closed=!0,Z=Z.slice(0,-1));case f:le===f&&(Z=te),le==v?(K.warning('attribute "'+Z+'" missed quot(")!'),ee(te,Z,T)):(W||K.warning('attribute "'+Z+'" missed value!! "'+Z+'" instead!!'),ee(Z,Z,T));break;case h:if(!W)return K.fatalError(`AttValue: ' or " expected`)}return X;case"":ce=" ";default:if(ce<=" ")switch(le){case d:P.setTagName(A.slice(T,X)),le=N;break;case p:te=A.slice(T,X),le=f;break;case v:var Z=A.slice(T,X);K.warning('attribute "'+Z+'" missed quot(")!!'),ee(te,Z,T);case x:le=N;break}else switch(le){case f:W||K.warning('attribute "'+te+'" missed value!! "'+te+'" instead2!!'),ee(te,te,T),T=X,le=p;break;case x:K.warning('attribute space is required"'+te+'"!!');case N:le=p,T=X;break;case h:le=v,T=X;break;case C:throw new Error("elements closed character '/' and '>' must be connected to")}}X++}}function U(A,T,P){for(var H=A.tagName,J=null,le=A.length;le--;){var K=A[le],W=K.qName,ee=K.value,ce=W.indexOf(":");if(ce>0)var te=K.prefix=W.slice(0,ce),Z=W.slice(ce+1),X=te==="xmlns"&&Z;else Z=W,te=null,X=W==="xmlns"&&"";K.localName=Z,X!==!1&&(J==null&&(J=Object.create(null),$(P,P=Object.create(null))),P[X]=J[X]=ee,K.uri=a.XMLNS,T.startPrefixMapping(X,ee))}for(var le=A.length;le--;)K=A[le],K.prefix&&(K.prefix==="xml"&&(K.uri=a.XML),K.prefix!=="xmlns"&&(K.uri=P[K.prefix]));var ce=H.indexOf(":");ce>0?(te=A.prefix=H.slice(0,ce),Z=A.localName=H.slice(ce+1)):(te=null,Z=A.localName=H);var ue=A.uri=P[te||""];if(T.startElement(ue,Z,H,A),A.closed){if(T.endElement(ue,Z,H),J)for(te in J)i(J,te)&&T.endPrefixMapping(te)}else return A.currentNSMap=P,A.localNSMap=J,!0}function F(A,T,P,H,J){var K=r(P);if(K||s(P)){var W=A.indexOf("</"+P+">",T),ee=A.substring(T+1,W);return K&&(ee=ee.replace(D,H)),J.characters(ee,0,ee.length),W}return T+1}function $(A,T){for(var P in A)i(A,P)&&(T[P]=A[P])}function Y(A,T){var P=T;function H(X){return X=X||0,A.charAt(P+X)}function J(X){X=X||1,P+=X}function K(){for(var X=0;P<A.length;){var le=H();if(le!==" "&&le!==`
`&&le!=="	"&&le!=="\r")return X;X++,J()}return-1}function W(){return A.substring(P)}function ee(X){return A.substring(P,P+X.length)===X}function te(X){return A.substring(P,P+X.length).toUpperCase()===X.toUpperCase()}function Z(X){var le=e.reg("^",X),ce=le.exec(W());return ce?(J(ce[0].length),ce[0]):null}return{char:H,getIndex:function(){return P},getMatch:Z,getSource:function(){return A},skip:J,skipBlanks:K,substringFromIndex:W,substringStartsWith:ee,substringStartsWithCaseInsensitive:te}}function k(A,T){function P(ee,te){var Z=e.PI.exec(ee.substringFromIndex());return Z?Z[1].toLowerCase()==="xml"?te.fatalError("xml declaration is only allowed at the start of the document, but found at position "+ee.getIndex()):(ee.skip(Z[0].length),Z[0]):te.fatalError("processing instruction is not well-formed at position "+ee.getIndex())}var H=A.getSource();if(A.char()==="["){A.skip(1);for(var J=A.getIndex();A.getIndex()<H.length;){if(A.skipBlanks(),A.char()==="]"){var K=H.substring(J,A.getIndex());return A.skip(1),K}var W=null;if(A.char()==="<"&&A.char(1)==="!")switch(A.char(2)){case"E":A.char(3)==="L"?W=A.getMatch(e.elementdecl):A.char(3)==="N"&&(W=A.getMatch(e.EntityDecl));break;case"A":W=A.getMatch(e.AttlistDecl);break;case"N":W=A.getMatch(e.NotationDecl);break;case"-":W=A.getMatch(e.Comment);break}else if(A.char()==="<"&&A.char(1)==="?")W=P(A,T);else if(A.char()==="%")W=A.getMatch(e.PEReference);else return T.fatalError("Error detected in Markup declaration");if(!W)return T.fatalError("Error in internal subset at position "+A.getIndex())}return T.fatalError("doctype internal subset is not well-formed, missing ]")}}function R(A,T,P,H,J){var K=Y(A,T);switch(J?K.char(2).toUpperCase():K.char(2)){case"-":var W=K.getMatch(e.Comment);return W?(P.comment(W,e.COMMENT_START.length,W.length-e.COMMENT_START.length-e.COMMENT_END.length),K.getIndex()):H.fatalError("comment is not well-formed at position "+K.getIndex());case"[":var ee=K.getMatch(e.CDSect);return ee?!J&&!P.currentElement?H.fatalError("CDATA outside of element"):(P.startCDATA(),P.characters(ee,e.CDATA_START.length,ee.length-e.CDATA_START.length-e.CDATA_END.length),P.endCDATA(),K.getIndex()):H.fatalError("Invalid CDATA starting at position "+T);case"D":{if(P.doc&&P.doc.documentElement)return H.fatalError("Doctype not allowed inside or after documentElement at position "+K.getIndex());if(J?!K.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START):!K.substringStartsWith(e.DOCTYPE_DECL_START))return H.fatalError("Expected "+e.DOCTYPE_DECL_START+" at position "+K.getIndex());if(K.skip(e.DOCTYPE_DECL_START.length),K.skipBlanks()<1)return H.fatalError("Expected whitespace after "+e.DOCTYPE_DECL_START+" at position "+K.getIndex());var te={name:void 0,publicId:void 0,systemId:void 0,internalSubset:void 0};if(te.name=K.getMatch(e.Name),!te.name)return H.fatalError("doctype name missing or contains unexpected characters at position "+K.getIndex());if(J&&te.name.toLowerCase()!=="html"&&H.warning("Unexpected DOCTYPE in HTML document at position "+K.getIndex()),K.skipBlanks(),K.substringStartsWith(e.PUBLIC)||K.substringStartsWith(e.SYSTEM)){var Z=e.ExternalID_match.exec(K.substringFromIndex());if(!Z)return H.fatalError("doctype external id is not well-formed at position "+K.getIndex());Z.groups.SystemLiteralOnly!==void 0?te.systemId=Z.groups.SystemLiteralOnly:(te.systemId=Z.groups.SystemLiteral,te.publicId=Z.groups.PubidLiteral),K.skip(Z[0].length)}else if(J&&K.substringStartsWithCaseInsensitive(e.SYSTEM)){if(K.skip(e.SYSTEM.length),K.skipBlanks()<1)return H.fatalError("Expected whitespace after "+e.SYSTEM+" at position "+K.getIndex());if(te.systemId=K.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral),!te.systemId)return H.fatalError("Expected "+e.ABOUT_LEGACY_COMPAT+" in single or double quotes after "+e.SYSTEM+" at position "+K.getIndex())}return J&&te.systemId&&!e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(te.systemId)&&H.warning("Unexpected doctype.systemId in HTML document at position "+K.getIndex()),J||(K.skipBlanks(),te.internalSubset=k(K,H)),K.skipBlanks(),K.char()!==">"?H.fatalError("doctype not terminated with > at position "+K.getIndex()):(K.skip(1),P.startDTD(te.name,te.publicId,te.systemId,te.internalSubset),P.endDTD(),K.getIndex())}default:return H.fatalError('Not well-formed XML starting with "<!" at position '+T)}}function S(A,T,P,H){var J=A.substring(T).match(e.PI);if(!J)return H.fatalError("Invalid processing instruction starting at position "+T);if(J[1].toLowerCase()==="xml"){if(T>0)return H.fatalError("processing instruction at position "+T+" is an xml declaration which is only at the start of the document");if(!e.XMLDecl.test(A.substring(T)))return H.fatalError("xml declaration is not well-formed")}return P.processingInstruction(J[1],J[2]),T+J[0].length}function I(){this.attributeNames=Object.create(null)}return I.prototype={setTagName:function(A){if(!e.QName_exact.test(A))throw new Error("invalid tagName:"+A);this.tagName=A},addValue:function(A,T,P){if(!e.QName_exact.test(A))throw new Error("invalid attribute:"+A);this.attributeNames[A]=this.length,this[this.length++]={qName:A,value:T,offset:P}},length:0,getLocalName:function(A){return this[A].localName},getLocator:function(A){return this[A].locator},getQName:function(A){return this[A].qName},getURI:function(A){return this[A].uri},getValue:function(A){return this[A].value}},ms.XMLReader=_,ms.parseUtils=Y,ms.parseDoctypeCommentOrCData=R,ms}var vd;function av(){if(vd)return Ur;vd=1;var t=ts(),e=Dh(),n=Ta(),r=sv(),o=iv(),s=e.DOMImplementation,i=t.hasDefaultHTMLNamespace,a=t.isHTMLMimeType,c=t.isValidMimeType,u=t.MIME_TYPE,d=t.NAMESPACE,p=n.ParseError,f=o.XMLReader;function h(O){return O.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028\u2029]/g,`
`)}function v(O){if(O=O||{},O.locator===void 0&&(O.locator=!0),this.assign=O.assign||t.assign,this.domHandler=O.domHandler||x,this.onError=O.onError||O.errorHandler,O.errorHandler&&typeof O.errorHandler!="function")throw new TypeError("errorHandler object is no longer supported, switch to onError!");O.errorHandler&&O.errorHandler("warning","The `errorHandler` option has been deprecated, use `onError` instead!",this),this.normalizeLineEndings=O.normalizeLineEndings||h,this.locator=!!O.locator,this.xmlns=this.assign(Object.create(null),O.xmlns)}v.prototype.parseFromString=function(O,U){if(!c(U))throw new TypeError('DOMParser.parseFromString: the provided mimeType "'+U+'" is not valid.');var F=this.assign(Object.create(null),this.xmlns),$=r.XML_ENTITIES,Y=F[""]||null;i(U)?($=r.HTML_ENTITIES,Y=d.HTML):U===u.XML_SVG_IMAGE&&(Y=d.SVG),F[""]=Y,F.xml=F.xml||d.XML;var k=new this.domHandler({mimeType:U,defaultNamespace:Y,onError:this.onError}),R=this.locator?{}:void 0;this.locator&&k.setDocumentLocator(R);var S=new f;S.errorHandler=k,S.domBuilder=k;var I=!t.isHTMLMimeType(U);return I&&typeof O!="string"&&S.errorHandler.fatalError("source is not a string"),S.parse(this.normalizeLineEndings(String(O)),F,$),k.doc.documentElement||S.errorHandler.fatalError("missing root element"),k.doc};function x(O){var U=O||{};this.mimeType=U.mimeType||u.XML_APPLICATION,this.defaultNamespace=U.defaultNamespace||null,this.cdata=!1,this.currentElement=void 0,this.doc=void 0,this.locator=void 0,this.onError=U.onError}function N(O,U){U.lineNumber=O.lineNumber,U.columnNumber=O.columnNumber}x.prototype={startDocument:function(){var O=new s;this.doc=a(this.mimeType)?O.createHTMLDocument(!1):O.createDocument(this.defaultNamespace,"")},startElement:function(O,U,F,$){var Y=this.doc,k=Y.createElementNS(O,F||U),R=$.length;D(this,k),this.currentElement=k,this.locator&&N(this.locator,k);for(var S=0;S<R;S++){var O=$.getURI(S),I=$.getValue(S),F=$.getQName(S),A=Y.createAttributeNS(O,F);this.locator&&N($.getLocator(S),A),A.value=A.nodeValue=I,k.setAttributeNode(A)}},endElement:function(O,U,F){this.currentElement=this.currentElement.parentNode},startPrefixMapping:function(O,U){},endPrefixMapping:function(O){},processingInstruction:function(O,U){var F=this.doc.createProcessingInstruction(O,U);this.locator&&N(this.locator,F),D(this,F)},ignorableWhitespace:function(O,U,F){},characters:function(O,U,F){if(O=_.apply(this,arguments),O){if(this.cdata)var $=this.doc.createCDATASection(O);else var $=this.doc.createTextNode(O);this.currentElement?this.currentElement.appendChild($):/^\s*$/.test(O)&&this.doc.appendChild($),this.locator&&N(this.locator,$)}},skippedEntity:function(O){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(O){O&&(O.lineNumber=0),this.locator=O},comment:function(O,U,F){O=_.apply(this,arguments);var $=this.doc.createComment(O);this.locator&&N(this.locator,$),D(this,$)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(O,U,F,$){var Y=this.doc.implementation;if(Y&&Y.createDocumentType){var k=Y.createDocumentType(O,U,F,$);this.locator&&N(this.locator,k),D(this,k),this.doc.doctype=k}},reportError:function(O,U){if(typeof this.onError=="function")try{this.onError(O,U,this)}catch(F){throw new p("Reporting "+O+' "'+U+'" caused '+F,this.locator)}else console.error("[xmldom "+O+"]	"+U,C(this.locator))},warning:function(O){this.reportError("warning",O)},error:function(O){this.reportError("error",O)},fatalError:function(O){throw this.reportError("fatalError",O),new p(O,this.locator)}};function C(O){if(O)return`
@#[line:`+O.lineNumber+",col:"+O.columnNumber+"]"}function _(O,U,F){return typeof O=="string"?O.substr(U,F):O.length>=U+F||U?new java.lang.String(O,U,F)+"":O}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(O){x.prototype[O]=function(){return null}});function D(O,U){O.currentElement?O.currentElement.appendChild(U):O.doc.appendChild(U)}function L(O){if(O==="error")throw"onErrorStopParsing"}function V(){throw"onWarningStopParsing"}return Ur.__DOMHandler=x,Ur.DOMParser=v,Ur.normalizeLineEndings=h,Ur.onErrorStopParsing=L,Ur.onWarningStopParsing=V,Ur}var xd;function lv(){if(xd)return Ae;xd=1;var t=ts();Ae.assign=t.assign,Ae.hasDefaultHTMLNamespace=t.hasDefaultHTMLNamespace,Ae.isHTMLMimeType=t.isHTMLMimeType,Ae.isValidMimeType=t.isValidMimeType,Ae.MIME_TYPE=t.MIME_TYPE,Ae.NAMESPACE=t.NAMESPACE;var e=Ta();Ae.DOMException=e.DOMException,Ae.DOMExceptionName=e.DOMExceptionName,Ae.ExceptionCode=e.ExceptionCode,Ae.ParseError=e.ParseError;var n=Dh();Ae.Attr=n.Attr,Ae.CDATASection=n.CDATASection,Ae.CharacterData=n.CharacterData,Ae.Comment=n.Comment,Ae.Document=n.Document,Ae.DocumentFragment=n.DocumentFragment,Ae.DocumentType=n.DocumentType,Ae.DOMImplementation=n.DOMImplementation,Ae.Element=n.Element,Ae.Entity=n.Entity,Ae.EntityReference=n.EntityReference,Ae.LiveNodeList=n.LiveNodeList,Ae.NamedNodeMap=n.NamedNodeMap,Ae.Node=n.Node,Ae.NodeList=n.NodeList,Ae.Notation=n.Notation,Ae.ProcessingInstruction=n.ProcessingInstruction,Ae.Text=n.Text,Ae.XMLSerializer=n.XMLSerializer;var r=av();return Ae.DOMParser=r.DOMParser,Ae.normalizeLineEndings=r.normalizeLineEndings,Ae.onErrorStopParsing=r.onErrorStopParsing,Ae.onWarningStopParsing=r.onWarningStopParsing,Ae}lv();const Rs="USJ",Os="3.1",zc=Object.freeze({type:Rs,version:Os,content:[]}),cv=["type","marker","content","sid","eid","number","code","altnumber","pubnumber","caller","align","category"];function uv(t){return dv.includes(t)}const dv=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","EZA","5EZ","6EZ","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX","XXA","XXB","XXC","XXD","XXE","XXF","XXG"],Hl="$",Mh=".content[";function pv(t){const e=t.split(Mh);if(e.shift()!==Hl)throw new Error(`indexesFromJsonPath: jsonPath didn't start with '${Hl}'`);return e.map(n=>parseInt(n,10))}function fv(t){return t.reduce((e,n)=>`${e}${Mh}${n}]`,Hl)}var Ni={exports:{}},fl,yd;function hv(){if(yd)return fl;yd=1;var t=-1,e=1,n=0;function r(k,R,S,I,A){if(k===R)return k?[[n,k]]:[];if(S!=null){var T=$(k,R,S);if(T)return T}var P=a(k,R),H=k.substring(0,P);k=k.substring(P),R=R.substring(P),P=u(k,R);var J=k.substring(k.length-P);k=k.substring(0,k.length-P),R=R.substring(0,R.length-P);var K=o(k,R);return H&&K.unshift([n,H]),J&&K.push([n,J]),_(K,A),I&&p(K),K}function o(k,R){var S;if(!k)return[[e,R]];if(!R)return[[t,k]];var I=k.length>R.length?k:R,A=k.length>R.length?R:k,T=I.indexOf(A);if(T!==-1)return S=[[e,I.substring(0,T)],[n,A],[e,I.substring(T+A.length)]],k.length>R.length&&(S[0][0]=S[2][0]=t),S;if(A.length===1)return[[t,k],[e,R]];var P=d(k,R);if(P){var H=P[0],J=P[1],K=P[2],W=P[3],ee=P[4],te=r(H,K),Z=r(J,W);return te.concat([[n,ee]],Z)}return s(k,R)}function s(k,R){for(var S=k.length,I=R.length,A=Math.ceil((S+I)/2),T=A,P=2*A,H=new Array(P),J=new Array(P),K=0;K<P;K++)H[K]=-1,J[K]=-1;H[T+1]=0,J[T+1]=0;for(var W=S-I,ee=W%2!==0,te=0,Z=0,X=0,le=0,ce=0;ce<A;ce++){for(var ue=-ce+te;ue<=ce-Z;ue+=2){var ge=T+ue,he;ue===-ce||ue!==ce&&H[ge-1]<H[ge+1]?he=H[ge+1]:he=H[ge-1]+1;for(var we=he-ue;he<S&&we<I&&k.charAt(he)===R.charAt(we);)he++,we++;if(H[ge]=he,he>S)Z+=2;else if(we>I)te+=2;else if(ee){var ie=T+W-ue;if(ie>=0&&ie<P&&J[ie]!==-1){var Ce=S-J[ie];if(he>=Ce)return i(k,R,he,we)}}}for(var De=-ce+X;De<=ce-le;De+=2){var ie=T+De,Ce;De===-ce||De!==ce&&J[ie-1]<J[ie+1]?Ce=J[ie+1]:Ce=J[ie-1]+1;for(var oe=Ce-De;Ce<S&&oe<I&&k.charAt(S-Ce-1)===R.charAt(I-oe-1);)Ce++,oe++;if(J[ie]=Ce,Ce>S)le+=2;else if(oe>I)X+=2;else if(!ee){var ge=T+W-De;if(ge>=0&&ge<P&&H[ge]!==-1){var he=H[ge],we=T+he-ge;if(Ce=S-Ce,he>=Ce)return i(k,R,he,we)}}}}return[[t,k],[e,R]]}function i(k,R,S,I){var A=k.substring(0,S),T=R.substring(0,I),P=k.substring(S),H=R.substring(I),J=r(A,T),K=r(P,H);return J.concat(K)}function a(k,R){if(!k||!R||k.charAt(0)!==R.charAt(0))return 0;for(var S=0,I=Math.min(k.length,R.length),A=I,T=0;S<A;)k.substring(T,A)==R.substring(T,A)?(S=A,T=S):I=A,A=Math.floor((I-S)/2+S);return D(k.charCodeAt(A-1))&&A--,A}function c(k,R){var S=k.length,I=R.length;if(S==0||I==0)return 0;S>I?k=k.substring(S-I):S<I&&(R=R.substring(0,S));var A=Math.min(S,I);if(k==R)return A;for(var T=0,P=1;;){var H=k.substring(A-P),J=R.indexOf(H);if(J==-1)return T;P+=J,(J==0||k.substring(A-P)==R.substring(0,P))&&(T=P,P++)}}function u(k,R){if(!k||!R||k.slice(-1)!==R.slice(-1))return 0;for(var S=0,I=Math.min(k.length,R.length),A=I,T=0;S<A;)k.substring(k.length-A,k.length-T)==R.substring(R.length-A,R.length-T)?(S=A,T=S):I=A,A=Math.floor((I-S)/2+S);return L(k.charCodeAt(k.length-A))&&A--,A}function d(k,R){var S=k.length>R.length?k:R,I=k.length>R.length?R:k;if(S.length<4||I.length*2<S.length)return null;function A(Z,X,le){for(var ce=Z.substring(le,le+Math.floor(Z.length/4)),ue=-1,ge="",he,we,ie,Ce;(ue=X.indexOf(ce,ue+1))!==-1;){var De=a(Z.substring(le),X.substring(ue)),oe=u(Z.substring(0,le),X.substring(0,ue));ge.length<oe+De&&(ge=X.substring(ue-oe,ue)+X.substring(ue,ue+De),he=Z.substring(0,le-oe),we=Z.substring(le+De),ie=X.substring(0,ue-oe),Ce=X.substring(ue+De))}return ge.length*2>=Z.length?[he,we,ie,Ce,ge]:null}var T=A(S,I,Math.ceil(S.length/4)),P=A(S,I,Math.ceil(S.length/2)),H;if(!T&&!P)return null;P?T?H=T[4].length>P[4].length?T:P:H=P:H=T;var J,K,W,ee;k.length>R.length?(J=H[0],K=H[1],W=H[2],ee=H[3]):(W=H[0],ee=H[1],J=H[2],K=H[3]);var te=H[4];return[J,K,W,ee,te]}function p(k){for(var R=!1,S=[],I=0,A=null,T=0,P=0,H=0,J=0,K=0;T<k.length;)k[T][0]==n?(S[I++]=T,P=J,H=K,J=0,K=0,A=k[T][1]):(k[T][0]==e?J+=k[T][1].length:K+=k[T][1].length,A&&A.length<=Math.max(P,H)&&A.length<=Math.max(J,K)&&(k.splice(S[I-1],0,[t,A]),k[S[I-1]+1][0]=e,I--,I--,T=I>0?S[I-1]:-1,P=0,H=0,J=0,K=0,A=null,R=!0)),T++;for(R&&_(k),C(k),T=1;T<k.length;){if(k[T-1][0]==t&&k[T][0]==e){var W=k[T-1][1],ee=k[T][1],te=c(W,ee),Z=c(ee,W);te>=Z?(te>=W.length/2||te>=ee.length/2)&&(k.splice(T,0,[n,ee.substring(0,te)]),k[T-1][1]=W.substring(0,W.length-te),k[T+1][1]=ee.substring(te),T++):(Z>=W.length/2||Z>=ee.length/2)&&(k.splice(T,0,[n,W.substring(0,Z)]),k[T-1][0]=e,k[T-1][1]=ee.substring(0,ee.length-Z),k[T+1][0]=t,k[T+1][1]=W.substring(Z),T++),T++}T++}}var f=/[^a-zA-Z0-9]/,h=/\s/,v=/[\r\n]/,x=/\n\r?\n$/,N=/^\r?\n\r?\n/;function C(k){function R(Z,X){if(!Z||!X)return 6;var le=Z.charAt(Z.length-1),ce=X.charAt(0),ue=le.match(f),ge=ce.match(f),he=ue&&le.match(h),we=ge&&ce.match(h),ie=he&&le.match(v),Ce=we&&ce.match(v),De=ie&&Z.match(x),oe=Ce&&X.match(N);return De||oe?5:ie||Ce?4:ue&&!he&&we?3:he||we?2:ue||ge?1:0}for(var S=1;S<k.length-1;){if(k[S-1][0]==n&&k[S+1][0]==n){var I=k[S-1][1],A=k[S][1],T=k[S+1][1],P=u(I,A);if(P){var H=A.substring(A.length-P);I=I.substring(0,I.length-P),A=H+A.substring(0,A.length-P),T=H+T}for(var J=I,K=A,W=T,ee=R(I,A)+R(A,T);A.charAt(0)===T.charAt(0);){I+=A.charAt(0),A=A.substring(1)+T.charAt(0),T=T.substring(1);var te=R(I,A)+R(A,T);te>=ee&&(ee=te,J=I,K=A,W=T)}k[S-1][1]!=J&&(J?k[S-1][1]=J:(k.splice(S-1,1),S--),k[S][1]=K,W?k[S+1][1]=W:(k.splice(S+1,1),S--))}S++}}function _(k,R){k.push([n,""]);for(var S=0,I=0,A=0,T="",P="",H;S<k.length;){if(S<k.length-1&&!k[S][1]){k.splice(S,1);continue}switch(k[S][0]){case e:A++,P+=k[S][1],S++;break;case t:I++,T+=k[S][1],S++;break;case n:var J=S-A-I-1;if(R){if(J>=0&&O(k[J][1])){var K=k[J][1].slice(-1);if(k[J][1]=k[J][1].slice(0,-1),T=K+T,P=K+P,!k[J][1]){k.splice(J,1),S--;var W=J-1;k[W]&&k[W][0]===e&&(A++,P=k[W][1]+P,W--),k[W]&&k[W][0]===t&&(I++,T=k[W][1]+T,W--),J=W}}if(V(k[S][1])){var K=k[S][1].charAt(0);k[S][1]=k[S][1].slice(1),T+=K,P+=K}}if(S<k.length-1&&!k[S][1]){k.splice(S,1);break}if(T.length>0||P.length>0){T.length>0&&P.length>0&&(H=a(P,T),H!==0&&(J>=0?k[J][1]+=P.substring(0,H):(k.splice(0,0,[n,P.substring(0,H)]),S++),P=P.substring(H),T=T.substring(H)),H=u(P,T),H!==0&&(k[S][1]=P.substring(P.length-H)+k[S][1],P=P.substring(0,P.length-H),T=T.substring(0,T.length-H)));var ee=A+I;T.length===0&&P.length===0?(k.splice(S-ee,ee),S=S-ee):T.length===0?(k.splice(S-ee,ee,[e,P]),S=S-ee+1):P.length===0?(k.splice(S-ee,ee,[t,T]),S=S-ee+1):(k.splice(S-ee,ee,[t,T],[e,P]),S=S-ee+2)}S!==0&&k[S-1][0]===n?(k[S-1][1]+=k[S][1],k.splice(S,1)):S++,A=0,I=0,T="",P="";break}}k[k.length-1][1]===""&&k.pop();var te=!1;for(S=1;S<k.length-1;)k[S-1][0]===n&&k[S+1][0]===n&&(k[S][1].substring(k[S][1].length-k[S-1][1].length)===k[S-1][1]?(k[S][1]=k[S-1][1]+k[S][1].substring(0,k[S][1].length-k[S-1][1].length),k[S+1][1]=k[S-1][1]+k[S+1][1],k.splice(S-1,1),te=!0):k[S][1].substring(0,k[S+1][1].length)==k[S+1][1]&&(k[S-1][1]+=k[S+1][1],k[S][1]=k[S][1].substring(k[S+1][1].length)+k[S+1][1],k.splice(S+1,1),te=!0)),S++;te&&_(k,R)}function D(k){return k>=55296&&k<=56319}function L(k){return k>=56320&&k<=57343}function V(k){return L(k.charCodeAt(0))}function O(k){return D(k.charCodeAt(k.length-1))}function U(k){for(var R=[],S=0;S<k.length;S++)k[S][1].length>0&&R.push(k[S]);return R}function F(k,R,S,I){return O(k)||V(I)?null:U([[n,k],[t,R],[e,S],[n,I]])}function $(k,R,S){var I=typeof S=="number"?{index:S,length:0}:S.oldRange,A=typeof S=="number"?null:S.newRange,T=k.length,P=R.length;if(I.length===0&&(A===null||A.length===0)){var H=I.index,J=k.slice(0,H),K=k.slice(H),W=A?A.index:null;e:{var ee=H+P-T;if(W!==null&&W!==ee||ee<0||ee>P)break e;var te=R.slice(0,ee),Z=R.slice(ee);if(Z!==K)break e;var X=Math.min(H,ee),le=J.slice(0,X),ce=te.slice(0,X);if(le!==ce)break e;var ue=J.slice(X),ge=te.slice(X);return F(le,ue,ge,K)}e:{if(W!==null&&W!==H)break e;var he=H,te=R.slice(0,he),Z=R.slice(he);if(te!==J)break e;var we=Math.min(T-he,P-he),ie=K.slice(K.length-we),Ce=Z.slice(Z.length-we);if(ie!==Ce)break e;var ue=K.slice(0,K.length-we),ge=Z.slice(0,Z.length-we);return F(J,ue,ge,ie)}}if(I.length>0&&A&&A.length===0)e:{var le=k.slice(0,I.index),ie=k.slice(I.index+I.length),X=le.length,we=ie.length;if(P<X+we)break e;var ce=R.slice(0,X),Ce=R.slice(P-we);if(le!==ce||ie!==Ce)break e;var ue=k.slice(X,T-we),ge=R.slice(X,P-we);return F(le,ue,ge,ie)}return null}function Y(k,R,S,I){return r(k,R,S,I,!0)}return Y.INSERT=e,Y.DELETE=t,Y.EQUAL=n,fl=Y,fl}var Cs={exports:{}};Cs.exports;var _d;function Rh(){return _d||(_d=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=9007199254740991,s="[object Arguments]",i="[object Array]",a="[object Boolean]",c="[object Date]",u="[object Error]",d="[object Function]",p="[object GeneratorFunction]",f="[object Map]",h="[object Number]",v="[object Object]",x="[object Promise]",N="[object RegExp]",C="[object Set]",_="[object String]",D="[object Symbol]",L="[object WeakMap]",V="[object ArrayBuffer]",O="[object DataView]",U="[object Float32Array]",F="[object Float64Array]",$="[object Int8Array]",Y="[object Int16Array]",k="[object Int32Array]",R="[object Uint8Array]",S="[object Uint8ClampedArray]",I="[object Uint16Array]",A="[object Uint32Array]",T=/[\\^$.*+?()[\]{}|]/g,P=/\w*$/,H=/^\[object .+?Constructor\]$/,J=/^(?:0|[1-9]\d*)$/,K={};K[s]=K[i]=K[V]=K[O]=K[a]=K[c]=K[U]=K[F]=K[$]=K[Y]=K[k]=K[f]=K[h]=K[v]=K[N]=K[C]=K[_]=K[D]=K[R]=K[S]=K[I]=K[A]=!0,K[u]=K[d]=K[L]=!1;var W=typeof xr=="object"&&xr&&xr.Object===Object&&xr,ee=typeof self=="object"&&self&&self.Object===Object&&self,te=W||ee||Function("return this")(),Z=e&&!e.nodeType&&e,X=Z&&!0&&t&&!t.nodeType&&t,le=X&&X.exports===Z;function ce(g,E){return g.set(E[0],E[1]),g}function ue(g,E){return g.add(E),g}function ge(g,E){for(var j=-1,Q=g?g.length:0;++j<Q&&E(g[j],j,g)!==!1;);return g}function he(g,E){for(var j=-1,Q=E.length,xe=g.length;++j<Q;)g[xe+j]=E[j];return g}function we(g,E,j,Q){for(var xe=-1,pe=g?g.length:0;++xe<pe;)j=E(j,g[xe],xe,g);return j}function ie(g,E){for(var j=-1,Q=Array(g);++j<g;)Q[j]=E(j);return Q}function Ce(g,E){return g==null?void 0:g[E]}function De(g){var E=!1;if(g!=null&&typeof g.toString!="function")try{E=!!(g+"")}catch{}return E}function oe(g){var E=-1,j=Array(g.size);return g.forEach(function(Q,xe){j[++E]=[xe,Q]}),j}function me(g,E){return function(j){return g(E(j))}}function Ne(g){var E=-1,j=Array(g.size);return g.forEach(function(Q){j[++E]=Q}),j}var Oe=Array.prototype,Fe=Function.prototype,Ze=Object.prototype,Je=te["__core-js_shared__"],ot=function(){var g=/[^.]+$/.exec(Je&&Je.keys&&Je.keys.IE_PROTO||"");return g?"Symbol(src)_1."+g:""}(),Ee=Fe.toString,ut=Ze.hasOwnProperty,Ve=Ze.toString,bn=RegExp("^"+Ee.call(ut).replace(T,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Xt=le?te.Buffer:void 0,Ut=te.Symbol,Qt=te.Uint8Array,fe=me(Object.getPrototypeOf,Object),Le=Object.create,dt=Ze.propertyIsEnumerable,gt=Oe.splice,Zt=Object.getOwnPropertySymbols,en=Xt?Xt.isBuffer:void 0,vn=me(Object.keys,Object),tn=Cn(te,"DataView"),nn=Cn(te,"Map"),Ct=Cn(te,"Promise"),rn=Cn(te,"Set"),on=Cn(te,"WeakMap"),Vt=Cn(Object,"create"),In=$t(tn),Pe=$t(nn),Xe=$t(Ct),Lt=$t(rn),Pt=$t(on),xn=Ut?Ut.prototype:void 0,hr=xn?xn.valueOf:void 0;function dn(g){var E=-1,j=g?g.length:0;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function b(){this.__data__=Vt?Vt(null):{}}function y(g){return this.has(g)&&delete this.__data__[g]}function M(g){var E=this.__data__;if(Vt){var j=E[g];return j===r?void 0:j}return ut.call(E,g)?E[g]:void 0}function G(g){var E=this.__data__;return Vt?E[g]!==void 0:ut.call(E,g)}function re(g,E){var j=this.__data__;return j[g]=Vt&&E===void 0?r:E,this}dn.prototype.clear=b,dn.prototype.delete=y,dn.prototype.get=M,dn.prototype.has=G,dn.prototype.set=re;function ae(g){var E=-1,j=g?g.length:0;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function ke(){this.__data__=[]}function et(g){var E=this.__data__,j=_o(E,g);if(j<0)return!1;var Q=E.length-1;return j==Q?E.pop():gt.call(E,j,1),!0}function it(g){var E=this.__data__,j=_o(E,g);return j<0?void 0:E[j][1]}function Et(g){return _o(this.__data__,g)>-1}function pt(g,E){var j=this.__data__,Q=_o(j,g);return Q<0?j.push([g,E]):j[Q][1]=E,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=Et,ae.prototype.set=pt;function We(g){var E=-1,j=g?g.length:0;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function sn(){this.__data__={hash:new dn,map:new(nn||ae),string:new dn}}function Dt(g){return Br(this,g).delete(g)}function yn(g){return Br(this,g).get(g)}function Ht(g){return Br(this,g).has(g)}function _n(g,E){return Br(this,g).set(g,E),this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(g){this.__data__=new ae(g)}function $r(){this.__data__=new ae}function lt(g){return this.__data__.delete(g)}function xo(g){return this.__data__.get(g)}function Ln(g){return this.__data__.has(g)}function Ua(g,E){var j=this.__data__;if(j instanceof ae){var Q=j.__data__;if(!nn||Q.length<n-1)return Q.push([g,E]),this;j=this.__data__=new We(Q)}return j.set(g,E),this}at.prototype.clear=$r,at.prototype.delete=lt,at.prototype.get=xo,at.prototype.has=Ln,at.prototype.set=Ua;function yo(g,E){var j=fs(g)||Eo(g)?ie(g.length,String):[],Q=j.length,xe=!!Q;for(var pe in g)ut.call(g,pe)&&!(xe&&(pe=="length"||nl(pe,Q)))&&j.push(pe);return j}function pi(g,E,j){var Q=g[E];(!(ut.call(g,E)&&mi(Q,j))||j===void 0&&!(E in g))&&(g[E]=j)}function _o(g,E){for(var j=g.length;j--;)if(mi(g[j][0],E))return j;return-1}function Pn(g,E){return g&&ps(E,ws(E),g)}function us(g,E,j,Q,xe,pe,je){var Me;if(Q&&(Me=pe?Q(g,xe,pe,je):Q(g)),Me!==void 0)return Me;if(!Fn(g))return g;var ct=fs(g);if(ct){if(Me=el(g),!E)return Xa(g,Me)}else{var Ie=tr(g),Mt=Ie==d||Ie==p;if(bi(g))return Co(g,E);if(Ie==v||Ie==s||Mt&&!pe){if(De(g))return pe?g:{};if(Me=$n(Mt?{}:g),!E)return Qa(g,Pn(Me,g))}else{if(!K[Ie])return pe?g:{};Me=tl(g,Ie,us,E)}}je||(je=new at);var zt=je.get(g);if(zt)return zt;if(je.set(g,Me),!ct)var ft=j?Za(g):ws(g);return ge(ft||g,function(Rt,kt){ft&&(kt=Rt,Rt=g[kt]),pi(Me,kt,us(Rt,E,j,Q,kt,g,je))}),Me}function Va(g){return Fn(g)?Le(g):{}}function Ha(g,E,j){var Q=E(g);return fs(g)?Q:he(Q,j(g))}function za(g){return Ve.call(g)}function Ga(g){if(!Fn(g)||ol(g))return!1;var E=hs(g)||De(g)?bn:H;return E.test($t(g))}function Ka(g){if(!wi(g))return vn(g);var E=[];for(var j in Object(g))ut.call(g,j)&&j!="constructor"&&E.push(j);return E}function Co(g,E){if(E)return g.slice();var j=new g.constructor(g.length);return g.copy(j),j}function ds(g){var E=new g.constructor(g.byteLength);return new Qt(E).set(new Qt(g)),E}function Fr(g,E){var j=E?ds(g.buffer):g.buffer;return new g.constructor(j,g.byteOffset,g.byteLength)}function fi(g,E,j){var Q=E?j(oe(g),!0):oe(g);return we(Q,ce,new g.constructor)}function hi(g){var E=new g.constructor(g.source,P.exec(g));return E.lastIndex=g.lastIndex,E}function Ya(g,E,j){var Q=E?j(Ne(g),!0):Ne(g);return we(Q,ue,new g.constructor)}function Wa(g){return hr?Object(hr.call(g)):{}}function Ja(g,E){var j=E?ds(g.buffer):g.buffer;return new g.constructor(j,g.byteOffset,g.length)}function Xa(g,E){var j=-1,Q=g.length;for(E||(E=Array(Q));++j<Q;)E[j]=g[j];return E}function ps(g,E,j,Q){j||(j={});for(var xe=-1,pe=E.length;++xe<pe;){var je=E[xe],Me=void 0;pi(j,je,Me===void 0?g[je]:Me)}return j}function Qa(g,E){return ps(g,er(g),E)}function Za(g){return Ha(g,ws,er)}function Br(g,E){var j=g.__data__;return rl(E)?j[typeof E=="string"?"string":"hash"]:j.map}function Cn(g,E){var j=Ce(g,E);return Ga(j)?j:void 0}var er=Zt?me(Zt,Object):il,tr=za;(tn&&tr(new tn(new ArrayBuffer(1)))!=O||nn&&tr(new nn)!=f||Ct&&tr(Ct.resolve())!=x||rn&&tr(new rn)!=C||on&&tr(new on)!=L)&&(tr=function(g){var E=Ve.call(g),j=E==v?g.constructor:void 0,Q=j?$t(j):void 0;if(Q)switch(Q){case In:return O;case Pe:return f;case Xe:return x;case Lt:return C;case Pt:return L}return E});function el(g){var E=g.length,j=g.constructor(E);return E&&typeof g[0]=="string"&&ut.call(g,"index")&&(j.index=g.index,j.input=g.input),j}function $n(g){return typeof g.constructor=="function"&&!wi(g)?Va(fe(g)):{}}function tl(g,E,j,Q){var xe=g.constructor;switch(E){case V:return ds(g);case a:case c:return new xe(+g);case O:return Fr(g,Q);case U:case F:case $:case Y:case k:case R:case S:case I:case A:return Ja(g,Q);case f:return fi(g,Q,j);case h:case _:return new xe(g);case N:return hi(g);case C:return Ya(g,Q,j);case D:return Wa(g)}}function nl(g,E){return E=E??o,!!E&&(typeof g=="number"||J.test(g))&&g>-1&&g%1==0&&g<E}function rl(g){var E=typeof g;return E=="string"||E=="number"||E=="symbol"||E=="boolean"?g!=="__proto__":g===null}function ol(g){return!!ot&&ot in g}function wi(g){var E=g&&g.constructor,j=typeof E=="function"&&E.prototype||Ze;return g===j}function $t(g){if(g!=null){try{return Ee.call(g)}catch{}try{return g+""}catch{}}return""}function gi(g){return us(g,!0,!0)}function mi(g,E){return g===E||g!==g&&E!==E}function Eo(g){return sl(g)&&ut.call(g,"callee")&&(!dt.call(g,"callee")||Ve.call(g)==s)}var fs=Array.isArray;function ko(g){return g!=null&&vi(g.length)&&!hs(g)}function sl(g){return xi(g)&&ko(g)}var bi=en||al;function hs(g){var E=Fn(g)?Ve.call(g):"";return E==d||E==p}function vi(g){return typeof g=="number"&&g>-1&&g%1==0&&g<=o}function Fn(g){var E=typeof g;return!!g&&(E=="object"||E=="function")}function xi(g){return!!g&&typeof g=="object"}function ws(g){return ko(g)?yo(g):Ka(g)}function il(){return[]}function al(){return!1}t.exports=gi}(Cs,Cs.exports)),Cs.exports}var Es={exports:{}};Es.exports;var Cd;function Oh(){return Cd||(Cd=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=1,s=2,i=9007199254740991,a="[object Arguments]",c="[object Array]",u="[object AsyncFunction]",d="[object Boolean]",p="[object Date]",f="[object Error]",h="[object Function]",v="[object GeneratorFunction]",x="[object Map]",N="[object Number]",C="[object Null]",_="[object Object]",D="[object Promise]",L="[object Proxy]",V="[object RegExp]",O="[object Set]",U="[object String]",F="[object Symbol]",$="[object Undefined]",Y="[object WeakMap]",k="[object ArrayBuffer]",R="[object DataView]",S="[object Float32Array]",I="[object Float64Array]",A="[object Int8Array]",T="[object Int16Array]",P="[object Int32Array]",H="[object Uint8Array]",J="[object Uint8ClampedArray]",K="[object Uint16Array]",W="[object Uint32Array]",ee=/[\\^$.*+?()[\]{}|]/g,te=/^\[object .+?Constructor\]$/,Z=/^(?:0|[1-9]\d*)$/,X={};X[S]=X[I]=X[A]=X[T]=X[P]=X[H]=X[J]=X[K]=X[W]=!0,X[a]=X[c]=X[k]=X[d]=X[R]=X[p]=X[f]=X[h]=X[x]=X[N]=X[_]=X[V]=X[O]=X[U]=X[Y]=!1;var le=typeof xr=="object"&&xr&&xr.Object===Object&&xr,ce=typeof self=="object"&&self&&self.Object===Object&&self,ue=le||ce||Function("return this")(),ge=e&&!e.nodeType&&e,he=ge&&!0&&t&&!t.nodeType&&t,we=he&&he.exports===ge,ie=we&&le.process,Ce=function(){try{return ie&&ie.binding&&ie.binding("util")}catch{}}(),De=Ce&&Ce.isTypedArray;function oe(g,E){for(var j=-1,Q=g==null?0:g.length,xe=0,pe=[];++j<Q;){var je=g[j];E(je,j,g)&&(pe[xe++]=je)}return pe}function me(g,E){for(var j=-1,Q=E.length,xe=g.length;++j<Q;)g[xe+j]=E[j];return g}function Ne(g,E){for(var j=-1,Q=g==null?0:g.length;++j<Q;)if(E(g[j],j,g))return!0;return!1}function Oe(g,E){for(var j=-1,Q=Array(g);++j<g;)Q[j]=E(j);return Q}function Fe(g){return function(E){return g(E)}}function Ze(g,E){return g.has(E)}function Je(g,E){return g==null?void 0:g[E]}function ot(g){var E=-1,j=Array(g.size);return g.forEach(function(Q,xe){j[++E]=[xe,Q]}),j}function Ee(g,E){return function(j){return g(E(j))}}function ut(g){var E=-1,j=Array(g.size);return g.forEach(function(Q){j[++E]=Q}),j}var Ve=Array.prototype,bn=Function.prototype,Xt=Object.prototype,Ut=ue["__core-js_shared__"],Qt=bn.toString,fe=Xt.hasOwnProperty,Le=function(){var g=/[^.]+$/.exec(Ut&&Ut.keys&&Ut.keys.IE_PROTO||"");return g?"Symbol(src)_1."+g:""}(),dt=Xt.toString,gt=RegExp("^"+Qt.call(fe).replace(ee,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Zt=we?ue.Buffer:void 0,en=ue.Symbol,vn=ue.Uint8Array,tn=Xt.propertyIsEnumerable,nn=Ve.splice,Ct=en?en.toStringTag:void 0,rn=Object.getOwnPropertySymbols,on=Zt?Zt.isBuffer:void 0,Vt=Ee(Object.keys,Object),In=er(ue,"DataView"),Pe=er(ue,"Map"),Xe=er(ue,"Promise"),Lt=er(ue,"Set"),Pt=er(ue,"WeakMap"),xn=er(Object,"create"),hr=$t(In),dn=$t(Pe),b=$t(Xe),y=$t(Lt),M=$t(Pt),G=en?en.prototype:void 0,re=G?G.valueOf:void 0;function ae(g){var E=-1,j=g==null?0:g.length;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function ke(){this.__data__=xn?xn(null):{},this.size=0}function et(g){var E=this.has(g)&&delete this.__data__[g];return this.size-=E?1:0,E}function it(g){var E=this.__data__;if(xn){var j=E[g];return j===r?void 0:j}return fe.call(E,g)?E[g]:void 0}function Et(g){var E=this.__data__;return xn?E[g]!==void 0:fe.call(E,g)}function pt(g,E){var j=this.__data__;return this.size+=this.has(g)?0:1,j[g]=xn&&E===void 0?r:E,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=Et,ae.prototype.set=pt;function We(g){var E=-1,j=g==null?0:g.length;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function sn(){this.__data__=[],this.size=0}function Dt(g){var E=this.__data__,j=Co(E,g);if(j<0)return!1;var Q=E.length-1;return j==Q?E.pop():nn.call(E,j,1),--this.size,!0}function yn(g){var E=this.__data__,j=Co(E,g);return j<0?void 0:E[j][1]}function Ht(g){return Co(this.__data__,g)>-1}function _n(g,E){var j=this.__data__,Q=Co(j,g);return Q<0?(++this.size,j.push([g,E])):j[Q][1]=E,this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(g){var E=-1,j=g==null?0:g.length;for(this.clear();++E<j;){var Q=g[E];this.set(Q[0],Q[1])}}function $r(){this.size=0,this.__data__={hash:new ae,map:new(Pe||We),string:new ae}}function lt(g){var E=Cn(this,g).delete(g);return this.size-=E?1:0,E}function xo(g){return Cn(this,g).get(g)}function Ln(g){return Cn(this,g).has(g)}function Ua(g,E){var j=Cn(this,g),Q=j.size;return j.set(g,E),this.size+=j.size==Q?0:1,this}at.prototype.clear=$r,at.prototype.delete=lt,at.prototype.get=xo,at.prototype.has=Ln,at.prototype.set=Ua;function yo(g){var E=-1,j=g==null?0:g.length;for(this.__data__=new at;++E<j;)this.add(g[E])}function pi(g){return this.__data__.set(g,r),this}function _o(g){return this.__data__.has(g)}yo.prototype.add=yo.prototype.push=pi,yo.prototype.has=_o;function Pn(g){var E=this.__data__=new We(g);this.size=E.size}function us(){this.__data__=new We,this.size=0}function Va(g){var E=this.__data__,j=E.delete(g);return this.size=E.size,j}function Ha(g){return this.__data__.get(g)}function za(g){return this.__data__.has(g)}function Ga(g,E){var j=this.__data__;if(j instanceof We){var Q=j.__data__;if(!Pe||Q.length<n-1)return Q.push([g,E]),this.size=++j.size,this;j=this.__data__=new at(Q)}return j.set(g,E),this.size=j.size,this}Pn.prototype.clear=us,Pn.prototype.delete=Va,Pn.prototype.get=Ha,Pn.prototype.has=za,Pn.prototype.set=Ga;function Ka(g,E){var j=Eo(g),Q=!j&&mi(g),xe=!j&&!Q&&ko(g),pe=!j&&!Q&&!xe&&xi(g),je=j||Q||xe||pe,Me=je?Oe(g.length,String):[],ct=Me.length;for(var Ie in g)fe.call(g,Ie)&&!(je&&(Ie=="length"||xe&&(Ie=="offset"||Ie=="parent")||pe&&(Ie=="buffer"||Ie=="byteLength"||Ie=="byteOffset")||tl(Ie,ct)))&&Me.push(Ie);return Me}function Co(g,E){for(var j=g.length;j--;)if(gi(g[j][0],E))return j;return-1}function ds(g,E,j){var Q=E(g);return Eo(g)?Q:me(Q,j(g))}function Fr(g){return g==null?g===void 0?$:C:Ct&&Ct in Object(g)?tr(g):wi(g)}function fi(g){return Fn(g)&&Fr(g)==a}function hi(g,E,j,Q,xe){return g===E?!0:g==null||E==null||!Fn(g)&&!Fn(E)?g!==g&&E!==E:Ya(g,E,j,Q,hi,xe)}function Ya(g,E,j,Q,xe,pe){var je=Eo(g),Me=Eo(E),ct=je?c:$n(g),Ie=Me?c:$n(E);ct=ct==a?_:ct,Ie=Ie==a?_:Ie;var Mt=ct==_,zt=Ie==_,ft=ct==Ie;if(ft&&ko(g)){if(!ko(E))return!1;je=!0,Mt=!1}if(ft&&!Mt)return pe||(pe=new Pn),je||xi(g)?ps(g,E,j,Q,xe,pe):Qa(g,E,ct,j,Q,xe,pe);if(!(j&o)){var Rt=Mt&&fe.call(g,"__wrapped__"),kt=zt&&fe.call(E,"__wrapped__");if(Rt||kt){var wr=Rt?g.value():g,nr=kt?E.value():E;return pe||(pe=new Pn),xe(wr,nr,j,Q,pe)}}return ft?(pe||(pe=new Pn),Za(g,E,j,Q,xe,pe)):!1}function Wa(g){if(!vi(g)||rl(g))return!1;var E=bi(g)?gt:te;return E.test($t(g))}function Ja(g){return Fn(g)&&hs(g.length)&&!!X[Fr(g)]}function Xa(g){if(!ol(g))return Vt(g);var E=[];for(var j in Object(g))fe.call(g,j)&&j!="constructor"&&E.push(j);return E}function ps(g,E,j,Q,xe,pe){var je=j&o,Me=g.length,ct=E.length;if(Me!=ct&&!(je&&ct>Me))return!1;var Ie=pe.get(g);if(Ie&&pe.get(E))return Ie==E;var Mt=-1,zt=!0,ft=j&s?new yo:void 0;for(pe.set(g,E),pe.set(E,g);++Mt<Me;){var Rt=g[Mt],kt=E[Mt];if(Q)var wr=je?Q(kt,Rt,Mt,E,g,pe):Q(Rt,kt,Mt,g,E,pe);if(wr!==void 0){if(wr)continue;zt=!1;break}if(ft){if(!Ne(E,function(nr,qr){if(!Ze(ft,qr)&&(Rt===nr||xe(Rt,nr,j,Q,pe)))return ft.push(qr)})){zt=!1;break}}else if(!(Rt===kt||xe(Rt,kt,j,Q,pe))){zt=!1;break}}return pe.delete(g),pe.delete(E),zt}function Qa(g,E,j,Q,xe,pe,je){switch(j){case R:if(g.byteLength!=E.byteLength||g.byteOffset!=E.byteOffset)return!1;g=g.buffer,E=E.buffer;case k:return!(g.byteLength!=E.byteLength||!pe(new vn(g),new vn(E)));case d:case p:case N:return gi(+g,+E);case f:return g.name==E.name&&g.message==E.message;case V:case U:return g==E+"";case x:var Me=ot;case O:var ct=Q&o;if(Me||(Me=ut),g.size!=E.size&&!ct)return!1;var Ie=je.get(g);if(Ie)return Ie==E;Q|=s,je.set(g,E);var Mt=ps(Me(g),Me(E),Q,xe,pe,je);return je.delete(g),Mt;case F:if(re)return re.call(g)==re.call(E)}return!1}function Za(g,E,j,Q,xe,pe){var je=j&o,Me=Br(g),ct=Me.length,Ie=Br(E),Mt=Ie.length;if(ct!=Mt&&!je)return!1;for(var zt=ct;zt--;){var ft=Me[zt];if(!(je?ft in E:fe.call(E,ft)))return!1}var Rt=pe.get(g);if(Rt&&pe.get(E))return Rt==E;var kt=!0;pe.set(g,E),pe.set(E,g);for(var wr=je;++zt<ct;){ft=Me[zt];var nr=g[ft],qr=E[ft];if(Q)var Ku=je?Q(qr,nr,ft,E,g,pe):Q(nr,qr,ft,g,E,pe);if(!(Ku===void 0?nr===qr||xe(nr,qr,j,Q,pe):Ku)){kt=!1;break}wr||(wr=ft=="constructor")}if(kt&&!wr){var yi=g.constructor,_i=E.constructor;yi!=_i&&"constructor"in g&&"constructor"in E&&!(typeof yi=="function"&&yi instanceof yi&&typeof _i=="function"&&_i instanceof _i)&&(kt=!1)}return pe.delete(g),pe.delete(E),kt}function Br(g){return ds(g,ws,el)}function Cn(g,E){var j=g.__data__;return nl(E)?j[typeof E=="string"?"string":"hash"]:j.map}function er(g,E){var j=Je(g,E);return Wa(j)?j:void 0}function tr(g){var E=fe.call(g,Ct),j=g[Ct];try{g[Ct]=void 0;var Q=!0}catch{}var xe=dt.call(g);return Q&&(E?g[Ct]=j:delete g[Ct]),xe}var el=rn?function(g){return g==null?[]:(g=Object(g),oe(rn(g),function(E){return tn.call(g,E)}))}:il,$n=Fr;(In&&$n(new In(new ArrayBuffer(1)))!=R||Pe&&$n(new Pe)!=x||Xe&&$n(Xe.resolve())!=D||Lt&&$n(new Lt)!=O||Pt&&$n(new Pt)!=Y)&&($n=function(g){var E=Fr(g),j=E==_?g.constructor:void 0,Q=j?$t(j):"";if(Q)switch(Q){case hr:return R;case dn:return x;case b:return D;case y:return O;case M:return Y}return E});function tl(g,E){return E=E??i,!!E&&(typeof g=="number"||Z.test(g))&&g>-1&&g%1==0&&g<E}function nl(g){var E=typeof g;return E=="string"||E=="number"||E=="symbol"||E=="boolean"?g!=="__proto__":g===null}function rl(g){return!!Le&&Le in g}function ol(g){var E=g&&g.constructor,j=typeof E=="function"&&E.prototype||Xt;return g===j}function wi(g){return dt.call(g)}function $t(g){if(g!=null){try{return Qt.call(g)}catch{}try{return g+""}catch{}}return""}function gi(g,E){return g===E||g!==g&&E!==E}var mi=fi(function(){return arguments}())?fi:function(g){return Fn(g)&&fe.call(g,"callee")&&!tn.call(g,"callee")},Eo=Array.isArray;function fs(g){return g!=null&&hs(g.length)&&!bi(g)}var ko=on||al;function sl(g,E){return hi(g,E)}function bi(g){if(!vi(g))return!1;var E=Fr(g);return E==h||E==v||E==u||E==L}function hs(g){return typeof g=="number"&&g>-1&&g%1==0&&g<=i}function vi(g){var E=typeof g;return g!=null&&(E=="object"||E=="function")}function Fn(g){return g!=null&&typeof g=="object"}var xi=De?Fe(De):Ja;function ws(g){return fs(g)?Ka(g):Xa(g)}function il(){return[]}function al(){return!1}t.exports=sl}(Es,Es.exports)),Es.exports}var Ti={},Ed;function wv(){if(Ed)return Ti;Ed=1,Object.defineProperty(Ti,"__esModule",{value:!0});const t=Rh(),e=Oh();var n;return function(r){function o(c={},u={},d=!1){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});let p=t(u);d||(p=Object.keys(p).reduce((f,h)=>(p[h]!=null&&(f[h]=p[h]),f),{}));for(const f in c)c[f]!==void 0&&u[f]===void 0&&(p[f]=c[f]);return Object.keys(p).length>0?p:void 0}r.compose=o;function s(c={},u={}){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});const d=Object.keys(c).concat(Object.keys(u)).reduce((p,f)=>(e(c[f],u[f])||(p[f]=u[f]===void 0?null:u[f]),p),{});return Object.keys(d).length>0?d:void 0}r.diff=s;function i(c={},u={}){c=c||{};const d=Object.keys(u).reduce((p,f)=>(u[f]!==c[f]&&c[f]!==void 0&&(p[f]=u[f]),p),{});return Object.keys(c).reduce((p,f)=>(c[f]!==u[f]&&u[f]===void 0&&(p[f]=null),p),d)}r.invert=i;function a(c,u,d=!1){if(typeof c!="object")return u;if(typeof u!="object")return;if(!d)return u;const p=Object.keys(u).reduce((f,h)=>(c[h]===void 0&&(f[h]=u[h]),f),{});return Object.keys(p).length>0?p:void 0}r.transform=a}(n||(n={})),Ti.default=n,Ti}var Si={},kd;function jh(){if(kd)return Si;kd=1,Object.defineProperty(Si,"__esModule",{value:!0});var t;return function(e){function n(r){return typeof r.delete=="number"?r.delete:typeof r.retain=="number"?r.retain:typeof r.retain=="object"&&r.retain!==null?1:typeof r.insert=="string"?r.insert.length:1}e.length=n}(t||(t={})),Si.default=t,Si}var Ai={},Nd;function gv(){if(Nd)return Ai;Nd=1,Object.defineProperty(Ai,"__esModule",{value:!0});const t=jh();class e{constructor(r){this.ops=r,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(r){r||(r=1/0);const o=this.ops[this.index];if(o){const s=this.offset,i=t.default.length(o);if(r>=i-s?(r=i-s,this.index+=1,this.offset=0):this.offset+=r,typeof o.delete=="number")return{delete:r};{const a={};return o.attributes&&(a.attributes=o.attributes),typeof o.retain=="number"?a.retain=r:typeof o.retain=="object"&&o.retain!==null?a.retain=o.retain:typeof o.insert=="string"?a.insert=o.insert.substr(s,r):a.insert=o.insert,a}}else return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?t.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const r=this.ops[this.index];return r?typeof r.delete=="number"?"delete":typeof r.retain=="number"||typeof r.retain=="object"&&r.retain!==null?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(this.offset===0)return this.ops.slice(this.index);{const r=this.offset,o=this.index,s=this.next(),i=this.ops.slice(this.index);return this.offset=r,this.index=o,[s].concat(i)}}else return[]}}return Ai.default=e,Ai}var Td;function mv(){return Td||(Td=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const n=hv(),r=Rh(),o=Oh(),s=wv();e.AttributeMap=s.default;const i=jh();e.Op=i.default;const a=gv();e.OpIterator=a.default;const c="\0",u=(p,f)=>{if(typeof p!="object"||p===null)throw new Error(`cannot retain a ${typeof p}`);if(typeof f!="object"||f===null)throw new Error(`cannot retain a ${typeof f}`);const h=Object.keys(p)[0];if(!h||h!==Object.keys(f)[0])throw new Error(`embed types not matched: ${h} != ${Object.keys(f)[0]}`);return[h,p[h],f[h]]};class d{constructor(f){Array.isArray(f)?this.ops=f:f!=null&&Array.isArray(f.ops)?this.ops=f.ops:this.ops=[]}static registerEmbed(f,h){this.handlers[f]=h}static unregisterEmbed(f){delete this.handlers[f]}static getHandler(f){const h=this.handlers[f];if(!h)throw new Error(`no handlers for embed type "${f}"`);return h}insert(f,h){const v={};return typeof f=="string"&&f.length===0?this:(v.insert=f,h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(v.attributes=h),this.push(v))}delete(f){return f<=0?this:this.push({delete:f})}retain(f,h){if(typeof f=="number"&&f<=0)return this;const v={retain:f};return h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(v.attributes=h),this.push(v)}push(f){let h=this.ops.length,v=this.ops[h-1];if(f=r(f),typeof v=="object"){if(typeof f.delete=="number"&&typeof v.delete=="number")return this.ops[h-1]={delete:v.delete+f.delete},this;if(typeof v.delete=="number"&&f.insert!=null&&(h-=1,v=this.ops[h-1],typeof v!="object"))return this.ops.unshift(f),this;if(o(f.attributes,v.attributes)){if(typeof f.insert=="string"&&typeof v.insert=="string")return this.ops[h-1]={insert:v.insert+f.insert},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this;if(typeof f.retain=="number"&&typeof v.retain=="number")return this.ops[h-1]={retain:v.retain+f.retain},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this}}return h===this.ops.length?this.ops.push(f):this.ops.splice(h,0,f),this}chop(){const f=this.ops[this.ops.length-1];return f&&typeof f.retain=="number"&&!f.attributes&&this.ops.pop(),this}filter(f){return this.ops.filter(f)}forEach(f){this.ops.forEach(f)}map(f){return this.ops.map(f)}partition(f){const h=[],v=[];return this.forEach(x=>{(f(x)?h:v).push(x)}),[h,v]}reduce(f,h){return this.ops.reduce(f,h)}changeLength(){return this.reduce((f,h)=>h.insert?f+i.default.length(h):h.delete?f-h.delete:f,0)}length(){return this.reduce((f,h)=>f+i.default.length(h),0)}slice(f=0,h=1/0){const v=[],x=new a.default(this.ops);let N=0;for(;N<h&&x.hasNext();){let C;N<f?C=x.next(f-N):(C=x.next(h-N),v.push(C)),N+=i.default.length(C)}return new d(v)}compose(f){const h=new a.default(this.ops),v=new a.default(f.ops),x=[],N=v.peek();if(N!=null&&typeof N.retain=="number"&&N.attributes==null){let _=N.retain;for(;h.peekType()==="insert"&&h.peekLength()<=_;)_-=h.peekLength(),x.push(h.next());N.retain-_>0&&v.next(N.retain-_)}const C=new d(x);for(;h.hasNext()||v.hasNext();)if(v.peekType()==="insert")C.push(v.next());else if(h.peekType()==="delete")C.push(h.next());else{const _=Math.min(h.peekLength(),v.peekLength()),D=h.next(_),L=v.next(_);if(L.retain){const V={};if(typeof D.retain=="number")V.retain=typeof L.retain=="number"?_:L.retain;else if(typeof L.retain=="number")D.retain==null?V.insert=D.insert:V.retain=D.retain;else{const U=D.retain==null?"insert":"retain",[F,$,Y]=u(D[U],L.retain),k=d.getHandler(F);V[U]={[F]:k.compose($,Y,U==="retain")}}const O=s.default.compose(D.attributes,L.attributes,typeof D.retain=="number");if(O&&(V.attributes=O),C.push(V),!v.hasNext()&&o(C.ops[C.ops.length-1],V)){const U=new d(h.rest());return C.concat(U).chop()}}else typeof L.delete=="number"&&(typeof D.retain=="number"||typeof D.retain=="object"&&D.retain!==null)&&C.push(L)}return C.chop()}concat(f){const h=new d(this.ops.slice());return f.ops.length>0&&(h.push(f.ops[0]),h.ops=h.ops.concat(f.ops.slice(1))),h}diff(f,h){if(this.ops===f.ops)return new d;const v=[this,f].map(D=>D.map(L=>{if(L.insert!=null)return typeof L.insert=="string"?L.insert:c;const V=D===f?"on":"with";throw new Error("diff() called "+V+" non-document")}).join("")),x=new d,N=n(v[0],v[1],h,!0),C=new a.default(this.ops),_=new a.default(f.ops);return N.forEach(D=>{let L=D[1].length;for(;L>0;){let V=0;switch(D[0]){case n.INSERT:V=Math.min(_.peekLength(),L),x.push(_.next(V));break;case n.DELETE:V=Math.min(L,C.peekLength()),C.next(V),x.delete(V);break;case n.EQUAL:V=Math.min(C.peekLength(),_.peekLength(),L);const O=C.next(V),U=_.next(V);o(O.insert,U.insert)?x.retain(V,s.default.diff(O.attributes,U.attributes)):x.push(U).delete(V);break}L-=V}}),x.chop()}eachLine(f,h=`
`){const v=new a.default(this.ops);let x=new d,N=0;for(;v.hasNext();){if(v.peekType()!=="insert")return;const C=v.peek(),_=i.default.length(C)-v.peekLength(),D=typeof C.insert=="string"?C.insert.indexOf(h,_)-_:-1;if(D<0)x.push(v.next());else if(D>0)x.push(v.next(D));else{if(f(x,v.next(1).attributes||{},N)===!1)return;N+=1,x=new d}}x.length()>0&&f(x,{},N)}invert(f){const h=new d;return this.reduce((v,x)=>{if(x.insert)h.delete(i.default.length(x));else{if(typeof x.retain=="number"&&x.attributes==null)return h.retain(x.retain),v+x.retain;if(x.delete||typeof x.retain=="number"){const N=x.delete||x.retain;return f.slice(v,v+N).forEach(_=>{x.delete?h.push(_):x.retain&&x.attributes&&h.retain(i.default.length(_),s.default.invert(x.attributes,_.attributes))}),v+N}else if(typeof x.retain=="object"&&x.retain!==null){const N=f.slice(v,v+1),C=new a.default(N.ops).next(),[_,D,L]=u(x.retain,C.insert),V=d.getHandler(_);return h.retain({[_]:V.invert(D,L)},s.default.invert(x.attributes,C.attributes)),v+1}}return v},0),h.chop()}transform(f,h=!1){if(h=!!h,typeof f=="number")return this.transformPosition(f,h);const v=f,x=new a.default(this.ops),N=new a.default(v.ops),C=new d;for(;x.hasNext()||N.hasNext();)if(x.peekType()==="insert"&&(h||N.peekType()!=="insert"))C.retain(i.default.length(x.next()));else if(N.peekType()==="insert")C.push(N.next());else{const _=Math.min(x.peekLength(),N.peekLength()),D=x.next(_),L=N.next(_);if(D.delete)continue;if(L.delete)C.push(L);else{const V=D.retain,O=L.retain;let U=typeof O=="object"&&O!==null?O:_;if(typeof V=="object"&&V!==null&&typeof O=="object"&&O!==null){const F=Object.keys(V)[0];if(F===Object.keys(O)[0]){const $=d.getHandler(F);$&&(U={[F]:$.transform(V[F],O[F],h)})}}C.retain(U,s.default.transform(D.attributes,L.attributes,h))}}return C.chop()}transformPosition(f,h=!1){h=!!h;const v=new a.default(this.ops);let x=0;for(;v.hasNext()&&x<=f;){const N=v.peekLength(),C=v.peekType();if(v.next(),C==="delete"){f-=Math.min(N,f-x);continue}else C==="insert"&&(x<f||!h)&&(f+=N);x+=N}return f}}d.Op=i.default,d.OpIterator=a.default,d.AttributeMap=s.default,d.handlers={},e.default=d,t.exports=d,t.exports.default=d}(Ni,Ni.exports)),Ni.exports}var bv=mv();const ks=ov(bv);var vv=Object.getOwnPropertyNames,xv=Object.getOwnPropertySymbols,yv=Object.prototype.hasOwnProperty;function Sd(t,e){return function(r,o,s){return t(r,o,s)&&e(r,o,s)}}function Di(t){return function(n,r,o){if(!n||!r||typeof n!="object"||typeof r!="object")return t(n,r,o);var s=o.cache,i=s.get(n),a=s.get(r);if(i&&a)return i===r&&a===n;s.set(n,r),s.set(r,n);var c=t(n,r,o);return s.delete(n),s.delete(r),c}}function Ad(t){return vv(t).concat(xv(t))}var _v=Object.hasOwn||function(t,e){return yv.call(t,e)};function mo(t,e){return t===e||!t&&!e&&t!==t&&e!==e}var Cv="__v",Ev="__o",kv="_owner",Dd=Object.getOwnPropertyDescriptor,Md=Object.keys;function Nv(t,e,n){var r=t.length;if(e.length!==r)return!1;for(;r-- >0;)if(!n.equals(t[r],e[r],r,r,t,e,n))return!1;return!0}function Tv(t,e){return mo(t.getTime(),e.getTime())}function Sv(t,e){return t.name===e.name&&t.message===e.message&&t.cause===e.cause&&t.stack===e.stack}function Av(t,e){return t===e}function Rd(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.entries(),i,a,c=0;(i=s.next())&&!i.done;){for(var u=e.entries(),d=!1,p=0;(a=u.next())&&!a.done;){if(o[p]){p++;continue}var f=i.value,h=a.value;if(n.equals(f[0],h[0],c,p,t,e,n)&&n.equals(f[1],h[1],f[0],h[0],t,e,n)){d=o[p]=!0;break}p++}if(!d)return!1;c++}return!0}var Dv=mo;function Mv(t,e,n){var r=Md(t),o=r.length;if(Md(e).length!==o)return!1;for(;o-- >0;)if(!Ih(t,e,n,r[o]))return!1;return!0}function bs(t,e,n){var r=Ad(t),o=r.length;if(Ad(e).length!==o)return!1;for(var s,i,a;o-- >0;)if(s=r[o],!Ih(t,e,n,s)||(i=Dd(t,s),a=Dd(e,s),(i||a)&&(!i||!a||i.configurable!==a.configurable||i.enumerable!==a.enumerable||i.writable!==a.writable)))return!1;return!0}function Rv(t,e){return mo(t.valueOf(),e.valueOf())}function Ov(t,e){return t.source===e.source&&t.flags===e.flags}function Od(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.values(),i,a;(i=s.next())&&!i.done;){for(var c=e.values(),u=!1,d=0;(a=c.next())&&!a.done;){if(!o[d]&&n.equals(i.value,a.value,i.value,a.value,t,e,n)){u=o[d]=!0;break}d++}if(!u)return!1}return!0}function jv(t,e){var n=t.length;if(e.length!==n)return!1;for(;n-- >0;)if(t[n]!==e[n])return!1;return!0}function Iv(t,e){return t.hostname===e.hostname&&t.pathname===e.pathname&&t.protocol===e.protocol&&t.port===e.port&&t.hash===e.hash&&t.username===e.username&&t.password===e.password}function Ih(t,e,n,r){return(r===kv||r===Ev||r===Cv)&&(t.$$typeof||e.$$typeof)?!0:_v(e,r)&&n.equals(t[r],e[r],r,r,t,e,n)}var Lv="[object Arguments]",Pv="[object Boolean]",$v="[object Date]",Fv="[object Error]",Bv="[object Map]",qv="[object Number]",Uv="[object Object]",Vv="[object RegExp]",Hv="[object Set]",zv="[object String]",Gv="[object URL]",Kv=Array.isArray,jd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,Id=Object.assign,Yv=Object.prototype.toString.call.bind(Object.prototype.toString);function Wv(t){var e=t.areArraysEqual,n=t.areDatesEqual,r=t.areErrorsEqual,o=t.areFunctionsEqual,s=t.areMapsEqual,i=t.areNumbersEqual,a=t.areObjectsEqual,c=t.arePrimitiveWrappersEqual,u=t.areRegExpsEqual,d=t.areSetsEqual,p=t.areTypedArraysEqual,f=t.areUrlsEqual;return function(v,x,N){if(v===x)return!0;if(v==null||x==null)return!1;var C=typeof v;if(C!==typeof x)return!1;if(C!=="object")return C==="number"?i(v,x,N):C==="function"?o(v,x,N):!1;var _=v.constructor;if(_!==x.constructor)return!1;if(_===Object)return a(v,x,N);if(Kv(v))return e(v,x,N);if(jd!=null&&jd(v))return p(v,x,N);if(_===Date)return n(v,x,N);if(_===RegExp)return u(v,x,N);if(_===Map)return s(v,x,N);if(_===Set)return d(v,x,N);var D=Yv(v);return D===$v?n(v,x,N):D===Vv?u(v,x,N):D===Bv?s(v,x,N):D===Hv?d(v,x,N):D===Uv?typeof v.then!="function"&&typeof x.then!="function"&&a(v,x,N):D===Gv?f(v,x,N):D===Fv?r(v,x,N):D===Lv?a(v,x,N):D===Pv||D===qv||D===zv?c(v,x,N):!1}}function Jv(t){var e=t.circular,n=t.createCustomConfig,r=t.strict,o={areArraysEqual:r?bs:Nv,areDatesEqual:Tv,areErrorsEqual:Sv,areFunctionsEqual:Av,areMapsEqual:r?Sd(Rd,bs):Rd,areNumbersEqual:Dv,areObjectsEqual:r?bs:Mv,arePrimitiveWrappersEqual:Rv,areRegExpsEqual:Ov,areSetsEqual:r?Sd(Od,bs):Od,areTypedArraysEqual:r?bs:jv,areUrlsEqual:Iv};if(n&&(o=Id({},o,n(o))),e){var s=Di(o.areArraysEqual),i=Di(o.areMapsEqual),a=Di(o.areObjectsEqual),c=Di(o.areSetsEqual);o=Id({},o,{areArraysEqual:s,areMapsEqual:i,areObjectsEqual:a,areSetsEqual:c})}return o}function Xv(t){return function(e,n,r,o,s,i,a){return t(e,n,a)}}function Qv(t){var e=t.circular,n=t.comparator,r=t.createState,o=t.equals,s=t.strict;if(r)return function(c,u){var d=r(),p=d.cache,f=p===void 0?e?new WeakMap:void 0:p,h=d.meta;return n(c,u,{cache:f,equals:o,meta:h,strict:s})};if(e)return function(c,u){return n(c,u,{cache:new WeakMap,equals:o,meta:void 0,strict:s})};var i={cache:void 0,equals:o,meta:void 0,strict:s};return function(c,u){return n(c,u,i)}}var or=Or();Or({strict:!0});Or({circular:!0});Or({circular:!0,strict:!0});Or({createInternalComparator:function(){return mo}});Or({strict:!0,createInternalComparator:function(){return mo}});Or({circular:!0,createInternalComparator:function(){return mo}});Or({circular:!0,createInternalComparator:function(){return mo},strict:!0});function Or(t){t===void 0&&(t={});var e=t.circular,n=e===void 0?!1:e,r=t.createInternalComparator,o=t.createState,s=t.strict,i=s===void 0?!1:s,a=Jv(t),c=Wv(a),u=r?r(c):Xv(c);return Qv({circular:n,comparator:c,createState:o,equals:u,strict:i})}const Zv=new Set(["http:","https:","mailto:","sms:","tel:"]);let Lh=class Ph extends m.ElementNode{static getType(){return"link"}static clone(e){return new Ph(e.__url,{rel:e.__rel,target:e.__target,title:e.__title},e.__key)}constructor(e="",n={},r){super(r);const{target:o=null,rel:s=null,title:i=null}=n;this.__url=e,this.__target=o,this.__rel=s,this.__title=i}createDOM(e){const n=document.createElement("a");return this.updateLinkDOM(null,n,e),vr(n,e.theme.link),n}updateLinkDOM(e,n,r){if(m.isHTMLAnchorElement(n)){e&&e.__url===this.__url||(n.href=this.sanitizeUrl(this.__url));for(const o of["target","rel","title"]){const s=`__${o}`,i=this[s];e&&e[s]===i||(i?n[o]=i:n.removeAttribute(o))}}}updateDOM(e,n,r){return this.updateLinkDOM(e,n,r),!1}static importDOM(){return{a:e=>({conversion:ex,priority:1})}}static importJSON(e){return zl().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setURL(e.url).setRel(e.rel||null).setTarget(e.target||null).setTitle(e.title||null)}sanitizeUrl(e){e=Ld(e);try{const n=new URL(Ld(e));if(!Zv.has(n.protocol))return"about:blank"}catch{return e}return e}exportJSON(){return{...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),url:this.getURL()}}getURL(){return this.getLatest().__url}setURL(e){const n=this.getWritable();return n.__url=e,n}getTarget(){return this.getLatest().__target}setTarget(e){const n=this.getWritable();return n.__target=e,n}getRel(){return this.getLatest().__rel}setRel(e){const n=this.getWritable();return n.__rel=e,n}getTitle(){return this.getLatest().__title}setTitle(e){const n=this.getWritable();return n.__title=e,n}insertNewAfter(e,n=!0){const r=zl(this.__url,{rel:this.__rel,target:this.__target,title:this.__title});return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!m.$isRangeSelection(n))return!1;const o=n.anchor.getNode(),s=n.focus.getNode();return this.isParentOf(o)&&this.isParentOf(s)&&n.getTextContent().length>0}isEmailURI(){return this.__url.startsWith("mailto:")}isWebSiteURI(){return this.__url.startsWith("https://")||this.__url.startsWith("http://")}};function ex(t){let e=null;if(m.isHTMLAnchorElement(t)){const n=t.textContent;(n!==null&&n!==""||t.children.length>0)&&(e=zl(t.getAttribute("href")||"",{rel:t.getAttribute("rel"),target:t.getAttribute("target"),title:t.getAttribute("title")}))}return{node:e}}function zl(t="",e){return m.$applyNodeReplacement(new Lh(t,e))}function tx(t){return t instanceof Lh}m.createCommand("TOGGLE_LINK_COMMAND");const nx=/^\+?[0-9\s()-]{5,}$/;function Ld(t){return t.match(/^[a-z][a-z0-9+.-]*:/i)||t.match(/^[/#.]/)?t:t.includes("@")?`mailto:${t}`:nx.test(t)?`tel:${t}`:`https://${t}`}const $h=[];let Fh=class Bh extends m.ElementNode{static getType(){return"mark"}static clone(e){return new Bh(e.__ids,e.__key)}static importDOM(){return null}static importJSON(e){return Pd().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setIDs(e.ids)}exportJSON(){return{...super.exportJSON(),ids:this.getIDs()}}constructor(e=$h,n){super(n),this.__ids=e}createDOM(e){const n=document.createElement("mark");return vr(n,e.theme.mark),this.__ids.length>1&&vr(n,e.theme.markOverlap),n}updateDOM(e,n,r){const o=e.__ids,s=this.__ids,i=o.length,a=s.length,c=r.theme.markOverlap;return i!==a&&(i===1?a===2&&vr(n,c):a===1&&Ul(n,c)),!1}hasID(e){return this.getIDs().includes(e)}getIDs(){return Array.from(this.getLatest().__ids)}setIDs(e){const n=this.getWritable();return n.__ids=e,n}addID(e){const n=this.getWritable();return n.__ids.includes(e)?n:n.setIDs([...n.__ids,e])}deleteID(e){const n=this.getWritable(),r=n.__ids.indexOf(e);if(r===-1)return n;const o=Array.from(n.__ids);return o.splice(r,1),n.setIDs(o)}insertNewAfter(e,n=!0){const r=Pd(this.__ids);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!m.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}};function Pd(t=$h){return m.$applyNodeReplacement(new Fh(t))}function rx(t){return t instanceof Fh}const qh=Object.freeze({"	":"\\t","\n":"\\n"}),$d=new RegExp(Object.keys(qh).join("|"),"g"),Vn=Object.freeze({ancestorHasNextSibling:"|",ancestorIsLastChild:" ",hasNextSibling:"├",isLastChild:"└",selectedChar:"^",selectedLine:">"}),ox=[t=>t.hasFormat("bold")&&"Bold",t=>t.hasFormat("code")&&"Code",t=>t.hasFormat("italic")&&"Italic",t=>t.hasFormat("strikethrough")&&"Strikethrough",t=>t.hasFormat("subscript")&&"Subscript",t=>t.hasFormat("superscript")&&"Superscript",t=>t.hasFormat("underline")&&"Underline",t=>t.hasFormat("highlight")&&"Highlight"],sx=[t=>t.hasTextFormat("bold")&&"Bold",t=>t.hasTextFormat("code")&&"Code",t=>t.hasTextFormat("italic")&&"Italic",t=>t.hasTextFormat("strikethrough")&&"Strikethrough",t=>t.hasTextFormat("subscript")&&"Subscript",t=>t.hasTextFormat("superscript")&&"Superscript",t=>t.hasTextFormat("underline")&&"Underline",t=>t.hasTextFormat("highlight")&&"Highlight"],ix=[t=>t.isDirectionless()&&"Directionless",t=>t.isUnmergeable()&&"Unmergeable"],ax=[t=>t.isToken()&&"Token",t=>t.isSegmented()&&"Segmented"];function lx(t,e,n,r,o=!1){const s=t.getEditorState(),i=t._config,a=t._compositionKey,c=t._editable;if(n){let f="";return s.read(()=>{f=function(h){const v=document.createElement("div");return v.innerHTML=h.trim(),Vh(v,0).innerHTML}(jc(t))}),f}let u=` root
`;const d=s.read(()=>{const f=m.$getSelection();return Uh(m.$getRoot(),(h,v)=>{const x=`(${h.getKey()})`,N=h.getType()||"",C=h.isSelected();u+=`${C?Vn.selectedLine:" "} ${v.join(" ")} ${x} ${N} ${function(_,D,L=!1){const V=D?D(_,L):void 0;if(V!==void 0&&V.length>0)return V;if(m.$isTextNode(_)){const O=_.getTextContent(),U=O.length===0?"(empty)":`"${Fd(O,L)}"`,F=function($){return[Bd($),cx($),ux($),qd($)].filter(Boolean).join(", ")}(_);return[U,F.length!==0?`{ ${F} }`:null].filter(Boolean).join(" ").trim()}if(tx(_)){const O=_.getURL(),U=O.length===0?"(empty)":`"${Fd(O,L)}"`,F=function($){return[dx($),px($),fx($),qd($)].filter(Boolean).join(", ")}(_);return[U,F.length!==0?`{ ${F} }`:null].filter(Boolean).join(" ").trim()}if(rx(_))return`ids: [ ${_.getIDs().join(", ")} ]`;if(m.$isParagraphNode(_)){const O=function(F){let $=sx.map(Y=>Y(F)).filter(Boolean).join(", ").toLocaleLowerCase();return $!==""&&($="format: "+$),$}(_);let U=O!==""?`{ ${O} }`:"";return U+=_.__style?`(${_.__style})`:"",U}return""}(h,r,o)}
`,u+=function({indent:_,isSelected:D,node:L,nodeKeyDisplay:V,selection:O,typeDisplay:U}){if(!m.$isTextNode(L)||!m.$isRangeSelection(O)||!D||m.$isElementNode(L))return"";const F=O.anchor,$=O.focus;if(L.getTextContent()===""||F.getNode()===O.focus.getNode()&&F.offset===$.offset)return"";const[Y,k]=function(H,J){const K=J.getStartEndPoints();if(m.$isNodeSelection(J)||K===null)return[-1,-1];const[W,ee]=K,te=H.getTextContent(),Z=te.length;let X=-1,le=-1;if(W.type==="text"&&ee.type==="text"){const ge=W.getNode(),he=ee.getNode();ge===he&&H===ge&&W.offset!==ee.offset?[X,le]=W.offset<ee.offset?[W.offset,ee.offset]:[ee.offset,W.offset]:[X,le]=H===ge?ge.isBefore(he)?[W.offset,Z]:[0,W.offset]:H===he?he.isBefore(ge)?[ee.offset,Z]:[0,ee.offset]:[0,Z]}const ce=(te.slice(0,X).match($d)||[]).length,ue=(te.slice(X,le).match($d)||[]).length;return[X+ce,le+ce+ue]}(L,O);if(Y===k)return"";const R=_[_.length-1]===Vn.hasNextSibling?Vn.ancestorHasNextSibling:Vn.ancestorIsLastChild,S=[..._.slice(0,_.length-1),R],I=Array(Y+1).fill(" "),A=Array(k-Y).fill(Vn.selectedChar),T=U.length+2,P=Array(V.length+T).fill(" ");return[Vn.selectedLine,S.join(" "),[...P,...I,...A].join("")].join(" ")+`
`}({indent:v,isSelected:C,node:h,nodeKeyDisplay:x,selection:f,typeDisplay:N})}),f===null?": null":m.$isRangeSelection(f)?function(h){let v="";const x=Bd(h);v+=`: range ${x!==""?`{ ${x} }`:""} ${h.style!==""?`{ style: ${h.style} } `:""}`;const N=h.anchor,C=h.focus,_=N.offset,D=C.offset;return v+=`
  ├ anchor { key: ${N.key}, offset: ${_===null?"null":_}, type: ${N.type} }`,v+=`
  └ focus { key: ${C.key}, offset: ${D===null?"null":D}, type: ${C.type} }`,v}(f):gf.$isTableSelection(f)?function(h){return`: table
  └ { table: ${h.tableKey}, anchorCell: ${h.anchor.key}, focusCell: ${h.focus.key} }`}(f):function(h){return m.$isNodeSelection(h)?`: node
  └ [${Array.from(h._nodes).join(", ")}]`:""}(f)});if(u+=`
 selection`+d,u+=`

 commands:`,e.length)for(const{index:f,type:h,payload:v}of e)u+=`
  └ ${f}. { type: ${h}, payload: ${v instanceof Event?v.constructor.name:v} }`;else u+=`
  └ None dispatched.`;const{version:p}=t.constructor;return u+=`

 editor${p?` (v${p})`:""}:`,u+=`
  └ namespace ${i.namespace}`,a!==null&&(u+=`
  └ compositionKey ${a}`),u+=`
  └ editable ${String(c)}`,u}function Uh(t,e,n=[]){const r=t.getChildren(),o=r.length;r.forEach((s,i)=>{e(s,n.concat(i===o-1?Vn.isLastChild:Vn.hasNextSibling)),m.$isElementNode(s)&&Uh(s,e,n.concat(i===o-1?Vn.ancestorIsLastChild:Vn.ancestorHasNextSibling))})}function Fd(t,e=!1){const n=Object.entries(qh).reduce((r,[o,s])=>r.replace(new RegExp(o,"g"),String(s)),t);return e?n.replace(/[^\s]/g,"*"):n}function cx(t){let e=ix.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="detail: "+e),e}function ux(t){let e=ax.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="mode: "+e),e}function Bd(t){let e=ox.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="format: "+e),e}function dx(t){let e=t.getTarget();return e!=null&&(e="target: "+e),e}function px(t){let e=t.getRel();return e!=null&&(e="rel: "+e),e}function fx(t){let e=t.getTitle();return e!=null&&(e="title: "+e),e}function qd(t){if(!t.__state)return!1;const e=[];for(const[r,o]of t.__state.knownState.entries()){if(r.isEqual(o,r.defaultValue))continue;const s=JSON.stringify(r.unparse(o));e.push(`[${r.key}: ${s}]`)}let n=e.join(",");return n!==""&&(n="state: "+n),n}function Vh(t,e){const n=new Array(1+e++).join("  "),r=new Array(e-1).join("  ");let o;for(let s=0;s<t.children.length;s++)o=document.createTextNode(`
`+n),t.insertBefore(o,t.children[s]),Vh(t.children[s],e),t.lastElementChild===t.children[s]&&(o=document.createTextNode(`
`+r),t.appendChild(o));return t}const hx=w.forwardRef(function({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:o,timeTravelPanelClassName:s,editorState:i,setEditorState:a,setEditorReadOnly:c,generateContent:u,commandsLog:d=[]},p){const[f,h]=w.useState([]),[v,x]=w.useState(""),[N,C]=w.useState(!1),[_,D]=w.useState(!1),L=w.useRef(0),V=w.useRef(null),[O,U]=w.useState(!1),[F,$]=w.useState(!1),[Y,k]=w.useState(!1),R=w.useRef(),S=w.useRef([]),I=w.useRef(0),A=w.useCallback(P=>{const H=++I.current;u(P).then(J=>{H===I.current&&x(J)}).catch(J=>{H===I.current&&x(`Error rendering tree: ${J.message}

Stack:
${J.stack}`)})},[u]);w.useEffect(()=>{if(!(!Y&&i._nodeMap.size>1e3&&($(!0),!Y))&&(R.current!==i||S.current!==d)){const P=R.current!==i;R.current=i,S.current=d,A(_),!N&&P&&h(H=>[...H,[Date.now(),i]])}},[i,A,_,Y,N,d]);const T=f.length;return w.useEffect(()=>{if(O){let P;const H=()=>{const J=L.current;if(J===T-1)return void U(!1);const K=f[J][0],W=f[J+1][0];P=setTimeout(()=>{L.current++;const ee=L.current,te=V.current;te!==null&&(te.value=String(ee)),a(f[ee][1]),H()},W-K)};return H(),()=>{clearTimeout(P)}}},[f,O,T,a]),l.jsxs("div",{className:o,children:[!Y&&F?l.jsxs("div",{style:{padding:20},children:[l.jsx("span",{style:{marginRight:20},children:"Detected large EditorState, this can impact debugging performance."}),l.jsx("button",{onClick:()=>{k(!0)},style:{background:"transparent",border:"1px solid white",color:"white",cursor:"pointer",padding:5},children:"Show full tree"})]}):null,Y?null:l.jsx("button",{onClick:()=>(A(!_),void D(!_)),className:t,type:"button",children:_?"Tree":"Export DOM"}),!N&&(Y||!F)&&T>2&&l.jsx("button",{onClick:()=>{c(!0),L.current=T-1,C(!0)},className:e,type:"button",children:"Time Travel"}),(Y||!F)&&l.jsx("pre",{ref:p,children:v}),N&&(Y||!F)&&l.jsxs("div",{className:s,children:[l.jsx("button",{className:r,onClick:()=>{L.current===T-1&&(L.current=1),U(!O)},type:"button",children:O?"Pause":"Play"}),l.jsx("input",{className:n,ref:V,onChange:P=>{const H=Number(P.target.value),J=f[H];J&&(L.current=H,a(J[1]))},type:"range",min:"1",max:T-1}),l.jsx("button",{className:r,onClick:()=>{c(!1);const P=f.length-1,H=f[P];a(H[1]);const J=V.current;J!==null&&(J.value=String(P)),C(!1),U(!1)},type:"button",children:"Exit"})]})]})});function wx(t,e){const n=new Set;let r=0;for(const[o]of t._commands)n.add(t.registerCommand(o,s=>(e(i=>{r+=1;const a=[...i];return a.push({index:r,payload:s,type:o.type?o.type:"UNKNOWN"}),a.length>10&&a.shift(),a}),!1),m.COMMAND_PRIORITY_CRITICAL));return()=>n.forEach(o=>o())}function gx(t){const[e,n]=w.useState([]);return w.useEffect(()=>wx(t,n),[t]),w.useMemo(()=>e,[e])}function mx({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,timeTravelPanelClassName:o,viewClassName:s,editor:i,customPrintNode:a}){const c=Ao.createRef(),[u,d]=w.useState(i.getEditorState()),p=gx(i);return w.useEffect(()=>At(i.registerUpdateListener(({editorState:f})=>{d(f)}),i.registerEditableListener(()=>{d(i.getEditorState())})),[i]),w.useEffect(()=>{const f=c.current;if(f!==null)return f.__lexicalEditor=i,()=>{f.__lexicalEditor=null}},[i,c]),l.jsx(hx,{treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:s,timeTravelPanelClassName:o,setEditorReadOnly:f=>{const h=i.getRootElement();h!=null&&(h.contentEditable=f?"false":"true")},editorState:u,setEditorState:f=>i.setEditorState(f),generateContent:async function(f){return lx(i,p,f,a)},ref:c,commandsLog:p})}function Hh({editorRef:t}){const[e]=_e();return Ao.useEffect(()=>{typeof t=="function"?t(e):typeof t=="object"&&(t.current=e)},[e]),null}const Mi=0,Gl=1,Kl=2,En=0,bx=1,Ud=2,vx=3,xx=4;function yx(t,e,n,r,o){if(t===null||n.size===0&&r.size===0&&!o)return En;const s=e._selection,i=t._selection;if(o)return bx;if(!(m.$isRangeSelection(s)&&m.$isRangeSelection(i)&&i.isCollapsed()&&s.isCollapsed()))return En;const a=function(C,_,D){const L=C._nodeMap,V=[];for(const O of _){const U=L.get(O);U!==void 0&&V.push(U)}for(const[O,U]of D){if(!U)continue;const F=L.get(O);F===void 0||m.$isRootNode(F)||V.push(F)}return V}(e,n,r);if(a.length===0)return En;if(a.length>1){const C=e._nodeMap,_=C.get(s.anchor.key),D=C.get(i.anchor.key);return _&&D&&!t._nodeMap.has(_.__key)&&m.$isTextNode(_)&&_.__text.length===1&&s.anchor.offset===1?Ud:En}const c=a[0],u=t._nodeMap.get(c.__key);if(!m.$isTextNode(u)||!m.$isTextNode(c)||u.__mode!==c.__mode)return En;const d=u.__text,p=c.__text;if(d===p)return En;const f=s.anchor,h=i.anchor;if(f.key!==h.key||f.type!=="text")return En;const v=f.offset,x=h.offset,N=p.length-d.length;return N===1&&x===v-1?Ud:N===-1&&x===v+1?vx:N===-1&&x===v?xx:En}function _x(t,e){let n=Date.now(),r=En;return(o,s,i,a,c,u)=>{const d=Date.now();if(u.has(m.HISTORIC_TAG))return r=En,n=d,Kl;const p=yx(o,s,a,c,t.isComposing()),f=(()=>{const h=i===null||i.editor===t,v=u.has(m.HISTORY_PUSH_TAG);if(!v&&h&&u.has(m.HISTORY_MERGE_TAG))return Mi;if(o===null)return Gl;const x=s._selection;return a.size>0||c.size>0?v===!1&&p!==En&&p===r&&d<n+e&&h||a.size===1&&function(N,C,_){const D=C._nodeMap.get(N),L=_._nodeMap.get(N),V=C._selection,O=_._selection;return!(m.$isRangeSelection(V)&&m.$isRangeSelection(O)&&V.anchor.type==="element"&&V.focus.type==="element"&&O.anchor.type==="text"&&O.focus.type==="text"||!m.$isTextNode(D)||!m.$isTextNode(L)||D.__parent!==L.__parent)&&JSON.stringify(C.read(()=>D.exportJSON()))===JSON.stringify(_.read(()=>L.exportJSON()))}(Array.from(a)[0],o,s)?Mi:Gl:x!==null?Mi:Kl})();return n=d,r=p,f}}function Vd(t){t.undoStack=[],t.redoStack=[],t.current=null}function Cx(t,e,n){const r=_x(t,n);return At(t.registerCommand(m.UNDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(c.length!==0){const u=i.current,d=c.pop();u!==null&&(a.push(u),s.dispatchCommand(m.CAN_REDO_COMMAND,!0)),c.length===0&&s.dispatchCommand(m.CAN_UNDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:m.HISTORIC_TAG})}}(t,e),!0),m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.REDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(a.length!==0){const u=i.current;u!==null&&(c.push(u),s.dispatchCommand(m.CAN_UNDO_COMMAND,!0));const d=a.pop();a.length===0&&s.dispatchCommand(m.CAN_REDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:m.HISTORIC_TAG})}}(t,e),!0),m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.CLEAR_EDITOR_COMMAND,()=>(Vd(e),!1),m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.CLEAR_HISTORY_COMMAND,()=>(Vd(e),t.dispatchCommand(m.CAN_REDO_COMMAND,!1),t.dispatchCommand(m.CAN_UNDO_COMMAND,!1),!0),m.COMMAND_PRIORITY_EDITOR),t.registerUpdateListener(({editorState:s,prevEditorState:i,dirtyLeaves:a,dirtyElements:c,tags:u})=>{const d=e.current,p=e.redoStack,f=e.undoStack,h=d===null?null:d.editorState;if(d!==null&&s===h)return;const v=r(i,s,d,a,c,u);if(v===Gl)p.length!==0&&(e.redoStack=[],t.dispatchCommand(m.CAN_REDO_COMMAND,!1)),d!==null&&(f.push({...d}),t.dispatchCommand(m.CAN_UNDO_COMMAND,!0));else if(v===Kl)return;e.current={editor:t,editorState:s}}))}function Ex(){return{current:null,redoStack:[],undoStack:[]}}function zh({delay:t,externalHistoryState:e}){const[n]=_e();return function(r,o,s=1e3){const i=w.useMemo(()=>o||Ex(),[o]);w.useEffect(()=>Cx(r,i,s),[s,r,i])}(n,e,t),null}const Yi=Math.min,Wr=Math.max,Wi=Math.round,Ri=Math.floor,Kn=t=>({x:t,y:t}),kx={left:"right",right:"left",bottom:"top",top:"bottom"},Nx={start:"end",end:"start"};function Hd(t,e,n){return Wr(t,Yi(e,n))}function Gc(t,e){return typeof t=="function"?t(e):t}function $o(t){return t.split("-")[0]}function Kc(t){return t.split("-")[1]}function Gh(t){return t==="x"?"y":"x"}function Kh(t){return t==="y"?"height":"width"}const Tx=new Set(["top","bottom"]);function Kr(t){return Tx.has($o(t))?"y":"x"}function Yh(t){return Gh(Kr(t))}function Sx(t,e,n){n===void 0&&(n=!1);const r=Kc(t),o=Yh(t),s=Kh(o);let i=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(i=Ji(i)),[i,Ji(i)]}function Ax(t){const e=Ji(t);return[Yl(t),e,Yl(e)]}function Yl(t){return t.replace(/start|end/g,e=>Nx[e])}const zd=["left","right"],Gd=["right","left"],Dx=["top","bottom"],Mx=["bottom","top"];function Rx(t,e,n){switch(t){case"top":case"bottom":return n?e?Gd:zd:e?zd:Gd;case"left":case"right":return e?Dx:Mx;default:return[]}}function Ox(t,e,n,r){const o=Kc(t);let s=Rx($o(t),n==="start",r);return o&&(s=s.map(i=>i+"-"+o),e&&(s=s.concat(s.map(Yl)))),s}function Ji(t){return t.replace(/left|right|bottom|top/g,e=>kx[e])}function jx(t){return{top:0,right:0,bottom:0,left:0,...t}}function Ix(t){return typeof t!="number"?jx(t):{top:t,right:t,bottom:t,left:t}}function Xi(t){const{x:e,y:n,width:r,height:o}=t;return{width:r,height:o,top:n,left:e,right:e+r,bottom:n+o,x:e,y:n}}function Kd(t,e,n){let{reference:r,floating:o}=t;const s=Kr(e),i=Yh(e),a=Kh(i),c=$o(e),u=s==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,f=r[a]/2-o[a]/2;let h;switch(c){case"top":h={x:d,y:r.y-o.height};break;case"bottom":h={x:d,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-o.width,y:p};break;default:h={x:r.x,y:r.y}}switch(Kc(e)){case"start":h[i]-=f*(n&&u?-1:1);break;case"end":h[i]+=f*(n&&u?-1:1);break}return h}const Lx=async(t,e,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:i}=n,a=s.filter(Boolean),c=await(i.isRTL==null?void 0:i.isRTL(e));let u=await i.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Kd(u,r,c),f=r,h={},v=0;for(let x=0;x<a.length;x++){const{name:N,fn:C}=a[x],{x:_,y:D,data:L,reset:V}=await C({x:d,y:p,initialPlacement:r,placement:f,strategy:o,middlewareData:h,rects:u,platform:i,elements:{reference:t,floating:e}});d=_??d,p=D??p,h={...h,[N]:{...h[N],...L}},V&&v<=50&&(v++,typeof V=="object"&&(V.placement&&(f=V.placement),V.rects&&(u=V.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:o}):V.rects),{x:d,y:p}=Kd(u,f,c)),x=-1)}return{x:d,y:p,placement:f,strategy:o,middlewareData:h}};async function Wh(t,e){var n;e===void 0&&(e={});const{x:r,y:o,platform:s,rects:i,elements:a,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:f=!1,padding:h=0}=Gc(e,t),v=Ix(h),N=a[f?p==="floating"?"reference":"floating":p],C=Xi(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(N)))==null||n?N:N.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:u,rootBoundary:d,strategy:c})),_=p==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,D=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),L=await(s.isElement==null?void 0:s.isElement(D))?await(s.getScale==null?void 0:s.getScale(D))||{x:1,y:1}:{x:1,y:1},V=Xi(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:_,offsetParent:D,strategy:c}):_);return{top:(C.top-V.top+v.top)/L.y,bottom:(V.bottom-C.bottom+v.bottom)/L.y,left:(C.left-V.left+v.left)/L.x,right:(V.right-C.right+v.right)/L.x}}const Px=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,r;const{placement:o,middlewareData:s,rects:i,initialPlacement:a,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:v="none",flipAlignment:x=!0,...N}=Gc(t,e);if((n=s.arrow)!=null&&n.alignmentOffset)return{};const C=$o(o),_=Kr(a),D=$o(a)===a,L=await(c.isRTL==null?void 0:c.isRTL(u.floating)),V=f||(D||!x?[Ji(a)]:Ax(a)),O=v!=="none";!f&&O&&V.push(...Ox(a,x,v,L));const U=[a,...V],F=await Wh(e,N),$=[];let Y=((r=s.flip)==null?void 0:r.overflows)||[];if(d&&$.push(F[C]),p){const I=Sx(o,i,L);$.push(F[I[0]],F[I[1]])}if(Y=[...Y,{placement:o,overflows:$}],!$.every(I=>I<=0)){var k,R;const I=(((k=s.flip)==null?void 0:k.index)||0)+1,A=U[I];if(A&&(!(p==="alignment"?_!==Kr(A):!1)||Y.every(H=>Kr(H.placement)===_?H.overflows[0]>0:!0)))return{data:{index:I,overflows:Y},reset:{placement:A}};let T=(R=Y.filter(P=>P.overflows[0]<=0).sort((P,H)=>P.overflows[1]-H.overflows[1])[0])==null?void 0:R.placement;if(!T)switch(h){case"bestFit":{var S;const P=(S=Y.filter(H=>{if(O){const J=Kr(H.placement);return J===_||J==="y"}return!0}).map(H=>[H.placement,H.overflows.filter(J=>J>0).reduce((J,K)=>J+K,0)]).sort((H,J)=>H[1]-J[1])[0])==null?void 0:S[0];P&&(T=P);break}case"initialPlacement":T=a;break}if(o!==T)return{reset:{placement:T}}}return{}}}},$x=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:o}=e,{mainAxis:s=!0,crossAxis:i=!1,limiter:a={fn:N=>{let{x:C,y:_}=N;return{x:C,y:_}}},...c}=Gc(t,e),u={x:n,y:r},d=await Wh(e,c),p=Kr($o(o)),f=Gh(p);let h=u[f],v=u[p];if(s){const N=f==="y"?"top":"left",C=f==="y"?"bottom":"right",_=h+d[N],D=h-d[C];h=Hd(_,h,D)}if(i){const N=p==="y"?"top":"left",C=p==="y"?"bottom":"right",_=v+d[N],D=v-d[C];v=Hd(_,v,D)}const x=a.fn({...e,[f]:h,[p]:v});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:s,[p]:i}}}}}};function Sa(){return typeof window<"u"}function ns(t){return Jh(t)?(t.nodeName||"").toLowerCase():"#document"}function un(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Zn(t){var e;return(e=(Jh(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Jh(t){return Sa()?t instanceof Node||t instanceof un(t).Node:!1}function An(t){return Sa()?t instanceof Element||t instanceof un(t).Element:!1}function Xn(t){return Sa()?t instanceof HTMLElement||t instanceof un(t).HTMLElement:!1}function Yd(t){return!Sa()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof un(t).ShadowRoot}const Fx=new Set(["inline","contents"]);function ri(t){const{overflow:e,overflowX:n,overflowY:r,display:o}=Dn(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+n)&&!Fx.has(o)}const Bx=new Set(["table","td","th"]);function qx(t){return Bx.has(ns(t))}const Ux=[":popover-open",":modal"];function Aa(t){return Ux.some(e=>{try{return t.matches(e)}catch{return!1}})}const Vx=["transform","translate","scale","rotate","perspective"],Hx=["transform","translate","scale","rotate","perspective","filter"],zx=["paint","layout","strict","content"];function Yc(t){const e=Wc(),n=An(t)?Dn(t):t;return Vx.some(r=>n[r]?n[r]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||Hx.some(r=>(n.willChange||"").includes(r))||zx.some(r=>(n.contain||"").includes(r))}function Gx(t){let e=Nr(t);for(;Xn(e)&&!Fo(e);){if(Yc(e))return e;if(Aa(e))return null;e=Nr(e)}return null}function Wc(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Kx=new Set(["html","body","#document"]);function Fo(t){return Kx.has(ns(t))}function Dn(t){return un(t).getComputedStyle(t)}function Da(t){return An(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Nr(t){if(ns(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Yd(t)&&t.host||Zn(t);return Yd(e)?e.host:e}function Xh(t){const e=Nr(t);return Fo(e)?t.ownerDocument?t.ownerDocument.body:t.body:Xn(e)&&ri(e)?e:Xh(e)}function js(t,e,n){var r;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=Xh(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),i=un(o);if(s){const a=Wl(i);return e.concat(i,i.visualViewport||[],ri(o)?o:[],a&&n?js(a):[])}return e.concat(o,js(o,[],n))}function Wl(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Qh(t){const e=Dn(t);let n=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const o=Xn(t),s=o?t.offsetWidth:n,i=o?t.offsetHeight:r,a=Wi(n)!==s||Wi(r)!==i;return a&&(n=s,r=i),{width:n,height:r,$:a}}function Jc(t){return An(t)?t:t.contextElement}function Ro(t){const e=Jc(t);if(!Xn(e))return Kn(1);const n=e.getBoundingClientRect(),{width:r,height:o,$:s}=Qh(e);let i=(s?Wi(n.width):n.width)/r,a=(s?Wi(n.height):n.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!a||!Number.isFinite(a))&&(a=1),{x:i,y:a}}const Yx=Kn(0);function Zh(t){const e=un(t);return!Wc()||!e.visualViewport?Yx:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Wx(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==un(t)?!1:e}function to(t,e,n,r){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),s=Jc(t);let i=Kn(1);e&&(r?An(r)&&(i=Ro(r)):i=Ro(t));const a=Wx(s,n,r)?Zh(s):Kn(0);let c=(o.left+a.x)/i.x,u=(o.top+a.y)/i.y,d=o.width/i.x,p=o.height/i.y;if(s){const f=un(s),h=r&&An(r)?un(r):r;let v=f,x=Wl(v);for(;x&&r&&h!==v;){const N=Ro(x),C=x.getBoundingClientRect(),_=Dn(x),D=C.left+(x.clientLeft+parseFloat(_.paddingLeft))*N.x,L=C.top+(x.clientTop+parseFloat(_.paddingTop))*N.y;c*=N.x,u*=N.y,d*=N.x,p*=N.y,c+=D,u+=L,v=un(x),x=Wl(v)}}return Xi({width:d,height:p,x:c,y:u})}function Ma(t,e){const n=Da(t).scrollLeft;return e?e.left+n:to(Zn(t)).left+n}function ew(t,e){const n=t.getBoundingClientRect(),r=n.left+e.scrollLeft-Ma(t,n),o=n.top+e.scrollTop;return{x:r,y:o}}function Jx(t){let{elements:e,rect:n,offsetParent:r,strategy:o}=t;const s=o==="fixed",i=Zn(r),a=e?Aa(e.floating):!1;if(r===i||a&&s)return n;let c={scrollLeft:0,scrollTop:0},u=Kn(1);const d=Kn(0),p=Xn(r);if((p||!p&&!s)&&((ns(r)!=="body"||ri(i))&&(c=Da(r)),Xn(r))){const h=to(r);u=Ro(r),d.x=h.x+r.clientLeft,d.y=h.y+r.clientTop}const f=i&&!p&&!s?ew(i,c):Kn(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+f.x,y:n.y*u.y-c.scrollTop*u.y+d.y+f.y}}function Xx(t){return Array.from(t.getClientRects())}function Qx(t){const e=Zn(t),n=Da(t),r=t.ownerDocument.body,o=Wr(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=Wr(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+Ma(t);const a=-n.scrollTop;return Dn(r).direction==="rtl"&&(i+=Wr(e.clientWidth,r.clientWidth)-o),{width:o,height:s,x:i,y:a}}const Wd=25;function Zx(t,e){const n=un(t),r=Zn(t),o=n.visualViewport;let s=r.clientWidth,i=r.clientHeight,a=0,c=0;if(o){s=o.width,i=o.height;const d=Wc();(!d||d&&e==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}const u=Ma(r);if(u<=0){const d=r.ownerDocument,p=d.body,f=getComputedStyle(p),h=d.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,v=Math.abs(r.clientWidth-p.clientWidth-h);v<=Wd&&(s-=v)}else u<=Wd&&(s+=u);return{width:s,height:i,x:a,y:c}}const ey=new Set(["absolute","fixed"]);function ty(t,e){const n=to(t,!0,e==="fixed"),r=n.top+t.clientTop,o=n.left+t.clientLeft,s=Xn(t)?Ro(t):Kn(1),i=t.clientWidth*s.x,a=t.clientHeight*s.y,c=o*s.x,u=r*s.y;return{width:i,height:a,x:c,y:u}}function Jd(t,e,n){let r;if(e==="viewport")r=Zx(t,n);else if(e==="document")r=Qx(Zn(t));else if(An(e))r=ty(e,n);else{const o=Zh(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Xi(r)}function tw(t,e){const n=Nr(t);return n===e||!An(n)||Fo(n)?!1:Dn(n).position==="fixed"||tw(n,e)}function ny(t,e){const n=e.get(t);if(n)return n;let r=js(t,[],!1).filter(a=>An(a)&&ns(a)!=="body"),o=null;const s=Dn(t).position==="fixed";let i=s?Nr(t):t;for(;An(i)&&!Fo(i);){const a=Dn(i),c=Yc(i);!c&&a.position==="fixed"&&(o=null),(s?!c&&!o:!c&&a.position==="static"&&!!o&&ey.has(o.position)||ri(i)&&!c&&tw(t,i))?r=r.filter(d=>d!==i):o=a,i=Nr(i)}return e.set(t,r),r}function ry(t){let{element:e,boundary:n,rootBoundary:r,strategy:o}=t;const i=[...n==="clippingAncestors"?Aa(e)?[]:ny(e,this._c):[].concat(n),r],a=i[0],c=i.reduce((u,d)=>{const p=Jd(e,d,o);return u.top=Wr(p.top,u.top),u.right=Yi(p.right,u.right),u.bottom=Yi(p.bottom,u.bottom),u.left=Wr(p.left,u.left),u},Jd(e,a,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function oy(t){const{width:e,height:n}=Qh(t);return{width:e,height:n}}function sy(t,e,n){const r=Xn(e),o=Zn(e),s=n==="fixed",i=to(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=Kn(0);function u(){c.x=Ma(o)}if(r||!r&&!s)if((ns(e)!=="body"||ri(o))&&(a=Da(e)),r){const h=to(e,!0,s,e);c.x=h.x+e.clientLeft,c.y=h.y+e.clientTop}else o&&u();s&&!r&&o&&u();const d=o&&!r&&!s?ew(o,a):Kn(0),p=i.left+a.scrollLeft-c.x-d.x,f=i.top+a.scrollTop-c.y-d.y;return{x:p,y:f,width:i.width,height:i.height}}function hl(t){return Dn(t).position==="static"}function Xd(t,e){if(!Xn(t)||Dn(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return Zn(t)===n&&(n=n.ownerDocument.body),n}function nw(t,e){const n=un(t);if(Aa(t))return n;if(!Xn(t)){let o=Nr(t);for(;o&&!Fo(o);){if(An(o)&&!hl(o))return o;o=Nr(o)}return n}let r=Xd(t,e);for(;r&&qx(r)&&hl(r);)r=Xd(r,e);return r&&Fo(r)&&hl(r)&&!Yc(r)?n:r||Gx(t)||n}const iy=async function(t){const e=this.getOffsetParent||nw,n=this.getDimensions,r=await n(t.floating);return{reference:sy(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ay(t){return Dn(t).direction==="rtl"}const ly={convertOffsetParentRelativeRectToViewportRelativeRect:Jx,getDocumentElement:Zn,getClippingRect:ry,getOffsetParent:nw,getElementRects:iy,getClientRects:Xx,getDimensions:oy,getScale:Ro,isElement:An,isRTL:ay};function rw(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function cy(t,e){let n=null,r;const o=Zn(t);function s(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function i(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),s();const u=t.getBoundingClientRect(),{left:d,top:p,width:f,height:h}=u;if(a||e(),!f||!h)return;const v=Ri(p),x=Ri(o.clientWidth-(d+f)),N=Ri(o.clientHeight-(p+h)),C=Ri(d),D={rootMargin:-v+"px "+-x+"px "+-N+"px "+-C+"px",threshold:Wr(0,Yi(1,c))||1};let L=!0;function V(O){const U=O[0].intersectionRatio;if(U!==c){if(!L)return i();U?i(!1,U):r=setTimeout(()=>{i(!1,1e-7)},1e3)}U===1&&!rw(u,t.getBoundingClientRect())&&i(),L=!1}try{n=new IntersectionObserver(V,{...D,root:o.ownerDocument})}catch{n=new IntersectionObserver(V,D)}n.observe(t)}return i(!0),s}function uy(t,e,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,u=Jc(t),d=o||s?[...u?js(u):[],...js(e)]:[];d.forEach(C=>{o&&C.addEventListener("scroll",n,{passive:!0}),s&&C.addEventListener("resize",n)});const p=u&&a?cy(u,n):null;let f=-1,h=null;i&&(h=new ResizeObserver(C=>{let[_]=C;_&&_.target===u&&h&&(h.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var D;(D=h)==null||D.observe(e)})),n()}),u&&!c&&h.observe(u),h.observe(e));let v,x=c?to(t):null;c&&N();function N(){const C=to(t);x&&!rw(x,C)&&n(),x=C,v=requestAnimationFrame(N)}return n(),()=>{var C;d.forEach(_=>{o&&_.removeEventListener("scroll",n),s&&_.removeEventListener("resize",n)}),p==null||p(),(C=h)==null||C.disconnect(),h=null,c&&cancelAnimationFrame(v)}}const dy=$x,py=Px,fy=(t,e,n)=>{const r=new Map,o={platform:ly,...n},s={...o.platform,_c:r};return Lx(t,e,{...o,platform:s})},Jl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,hy=Jl?w.useLayoutEffect:w.useEffect;let wy=class{constructor(e){this.key=e,this.ref={current:null},this.setRefElement=this.setRefElement.bind(this)}setRefElement(e){this.ref={current:e}}};const Qd=t=>{const e=document.getElementById("typeahead-menu");if(!e)return;const n=e.getBoundingClientRect();n.top+n.height>window.innerHeight&&e.scrollIntoView({block:"center"}),n.top<0&&e.scrollIntoView({block:"center"}),t.scrollIntoView({block:"nearest"})};function Zd(t,e){const n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top>r.top&&n.top<r.bottom}function gy(t,e,n,r){const[o]=_e();w.useEffect(()=>{if(e!=null&&t!=null){const s=o.getRootElement(),i=s!=null?function(p,f){let h=getComputedStyle(p);const v=h.position==="absolute",x=/(auto|scroll)/;if(h.position==="fixed")return document.body;for(let N=p;N=N.parentElement;)if(h=getComputedStyle(N),(!v||h.position!=="static")&&x.test(h.overflow+h.overflowY+h.overflowX))return N;return document.body}(s):document.body;let a=!1,c=Zd(e,i);const u=function(){a||(window.requestAnimationFrame(function(){n(),a=!1}),a=!0);const p=Zd(e,i);p!==c&&(c=p,r!=null&&r(p))},d=new ResizeObserver(n);return window.addEventListener("resize",n),document.addEventListener("scroll",u,{capture:!0,passive:!0}),d.observe(e),()=>{d.unobserve(e),window.removeEventListener("resize",n),document.removeEventListener("scroll",u,!0)}}},[e,o,r,n,t])}const ep=m.createCommand("SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND");function my({close:t,editor:e,anchorElementRef:n,resolution:r,options:o,menuRenderFn:s,onSelectOption:i,shouldSplitNodeWithQuery:a=!1,commandPriority:c=m.COMMAND_PRIORITY_LOW,preselectFirstItem:u=!0}){const[d,p]=w.useState(null),f=r.match&&r.match.matchingString;w.useEffect(()=>{u&&p(0)},[f,u]);const h=w.useCallback(x=>{e.update(()=>{const N=r.match!=null&&a?function(C){const _=m.$getSelection();if(!m.$isRangeSelection(_)||!_.isCollapsed())return null;const D=_.anchor;if(D.type!=="text")return null;const L=D.getNode();if(!L.isSimpleText())return null;const V=D.offset,O=L.getTextContent().slice(0,V),U=C.replaceableString.length,F=V-function(Y,k,R){let S=R;for(let I=S;I<=k.length;I++)Y.slice(-I)===k.substring(0,I)&&(S=I);return S}(O,C.matchingString,U);if(F<0)return null;let $;return F===0?[$]=L.splitText(V):[,$]=L.splitText(F,V),$}(r.match):null;i(x,N,t,r.match?r.match.matchingString:"")})},[e,a,r.match,i,t]),v=w.useCallback(x=>{const N=e.getRootElement();N!==null&&(N.setAttribute("aria-activedescendant","typeahead-item-"+x),p(x))},[e]);return w.useEffect(()=>()=>{const x=e.getRootElement();x!==null&&x.removeAttribute("aria-activedescendant")},[e]),hy(()=>{o===null?p(null):d===null&&u&&v(0)},[o,d,v,u]),w.useEffect(()=>At(e.registerCommand(ep,({option:x})=>!(!x.ref||x.ref.current==null)&&(Qd(x.ref.current),!0),c)),[e,v,c]),w.useEffect(()=>At(e.registerCommand(m.KEY_ARROW_DOWN_COMMAND,x=>{const N=x;if(o!==null&&o.length){const C=d===null?0:d!==o.length-1?d+1:0;v(C);const _=o[C];_.ref!=null&&_.ref.current&&e.dispatchCommand(ep,{index:C,option:_}),N.preventDefault(),N.stopImmediatePropagation()}return!0},c),e.registerCommand(m.KEY_ARROW_UP_COMMAND,x=>{const N=x;if(o!==null&&o.length){const C=d===null?o.length-1:d!==0?d-1:o.length-1;v(C);const _=o[C];_.ref!=null&&_.ref.current&&Qd(_.ref.current),N.preventDefault(),N.stopImmediatePropagation()}return!0},c),e.registerCommand(m.KEY_ESCAPE_COMMAND,x=>{const N=x;return N.preventDefault(),N.stopImmediatePropagation(),t(),!0},c),e.registerCommand(m.KEY_TAB_COMMAND,x=>{const N=x;return o!==null&&d!==null&&o[d]!=null&&(N.preventDefault(),N.stopImmediatePropagation(),h(o[d]),!0)},c),e.registerCommand(m.KEY_ENTER_COMMAND,x=>o!==null&&d!==null&&o[d]!=null&&(x!==null&&(x.preventDefault(),x.stopImmediatePropagation()),h(o[d]),!0),c)),[h,t,e,o,d,v,c]),s(n,w.useMemo(()=>({options:o,selectOptionAndCleanUp:h,selectedIndex:d,setHighlightedIndex:p}),[h,d,o]),r.match?r.match.matchingString:"")}function tp(t,e){e!=null&&(t.className=e),t.setAttribute("aria-label","Typeahead menu"),t.setAttribute("role","listbox"),t.style.display="block",t.style.position="absolute"}function by({options:t,onWillOpen:e,onClose:n,onOpen:r,onSelectOption:o,menuRenderFn:s,anchorClassName:i,commandPriority:a=m.COMMAND_PRIORITY_LOW,parent:c}){const[u]=_e(),[d,p]=w.useState(null),f=Ao.useRef(null),h=function(_,D,L,V=Jl?document.body:void 0,O=!0){const[U]=_e(),F=Jl?document.createElement("div"):null,$=w.useRef(F),Y=w.useCallback(()=>{if($.current===null||V===void 0)return;$.current.style.top=$.current.style.bottom;const R=U.getRootElement(),S=$.current,I=S.firstChild;if(R!==null&&_!==null){const{left:A,top:T,width:P,height:H}=_.getRect(),J=$.current.offsetHeight;if(S.style.top=`${T+J+3+(O?window.pageYOffset:0)}px`,S.style.left=`${A+window.pageXOffset}px`,S.style.height=`${H}px`,S.style.width=`${P}px`,I!==null){I.style.top=`${T}`;const K=I.getBoundingClientRect(),W=K.height,ee=K.width,te=R.getBoundingClientRect();A+ee>te.right&&(S.style.left=`${te.right-ee+window.pageXOffset}px`),(T+W>window.innerHeight||T+W>te.bottom)&&T-te.top>W+H&&(S.style.top=`${T-W-H+(O?window.pageYOffset:0)}px`)}S.isConnected||(tp(S,L),V.append(S)),S.setAttribute("id","typeahead-menu"),R.setAttribute("aria-controls","typeahead-menu")}},[U,_,O,L,V]);w.useEffect(()=>{const R=U.getRootElement();return _!==null&&Y(),()=>{R!==null&&R.removeAttribute("aria-controls");const S=$.current;S!==null&&S.isConnected&&(S.remove(),S.removeAttribute("id"))}},[U,Y,_]);const k=w.useCallback(R=>{_!==null&&(R||D(null))},[_,D]);return gy(_,$.current,Y,k),F!=null&&F===$.current&&(tp(F,L),V!=null&&V.append(F)),$}(d,p,i,c),v=w.useCallback(()=>{p(null),n!=null&&d!==null&&n()},[n,d]),x=w.useCallback(_=>{p(_),r!=null&&d===null&&r(_)},[r,d]),N=w.useCallback(_=>{_.preventDefault(),e!=null&&e(_);const D=k0(_.target);x({getRect:()=>new DOMRect(_.clientX/D,_.clientY/D,1,1)})},[x,e]),C=w.useCallback(_=>{d!==null&&f.current!=null&&_.target!=null&&m.isDOMNode(_.target)&&!f.current.contains(_.target)&&v()},[v,d]);return w.useEffect(()=>{const _=u.getRootElement();if(_)return _.addEventListener("contextmenu",N),()=>_.removeEventListener("contextmenu",N)},[u,N]),w.useEffect(()=>(document.addEventListener("click",C),()=>document.removeEventListener("click",C)),[u,C]),h.current===null||d===null||u===null?null:l.jsx(my,{close:v,resolution:d,editor:u,anchorElementRef:h,options:t,menuRenderFn:(_,D)=>s(_,D,{setMenuRef:L=>{f.current=L}}),onSelectOption:o,commandPriority:a})}const vy=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function xy({onClear:t}){const[e]=_e();return vy(()=>e.registerCommand(m.CLEAR_EDITOR_COMMAND,n=>(e.update(()=>{if(t==null){const r=m.$getRoot(),o=m.$getSelection(),s=m.$createParagraphNode();r.clear(),r.append(s),o!==null&&s.select(),m.$isRangeSelection(o)&&(o.format=0)}else t()}),!0),m.COMMAND_PRIORITY_EDITOR),[e,t]),null}const np=[["Cat","rgb(125, 50, 0)"],["Dog","rgb(100, 0, 0)"],["Rabbit","rgb(150, 0, 0)"],["Frog","rgb(200, 0, 0)"],["Fox","rgb(200, 75, 0)"],["Hedgehog","rgb(0, 75, 0)"],["Pigeon","rgb(0, 125, 0)"],["Squirrel","rgb(75, 100, 0)"],["Bear","rgb(125, 100, 0)"],["Tiger","rgb(0, 0, 150)"],["Leopard","rgb(0, 0, 200)"],["Zebra","rgb(0, 0, 250)"],["Wolf","rgb(0, 100, 150)"],["Owl","rgb(0, 100, 100)"],["Gull","rgb(100, 0, 100)"],["Squid","rgb(150, 0, 150)"]],rp=np[Math.floor(Math.random()*np.length)],yy=w.createContext({clientID:0,color:rp[1],isCollabActive:!1,name:rp[0],yjsDocMap:new Map});function ow(t,e){return w.useContext(yy)}function _y(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Cy(t,e=m.$getSelection()){return e==null&&_y(166),m.$isRangeSelection(e)&&e.isCollapsed()||e.getNodes().length===0?"":jc(t,e)}function op(t,e){const n=t.getData("text/plain")||t.getData("text/uri-list");n!=null&&e.insertRawText(n)}const rs=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ey=rs&&"documentMode"in document?document.documentMode:null,ky=!(!rs||!("InputEvent"in window)||Ey)&&"getTargetRanges"in new window.InputEvent("input"),Ny=rs&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),sp=rs&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Ty=rs&&/^(?=.*Chrome).*/i.test(navigator.userAgent),Sy=rs&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!Ty;function ip(t,e){e.update(()=>{if(t!==null){const n=nh(t,KeyboardEvent)?null:t.clipboardData,r=m.$getSelection();if(r!==null&&n!=null){t.preventDefault();const o=Cy(e);o!==null&&n.setData("text/html",o),n.setData("text/plain",r.getTextContent())}}})}function Ay(t){return At(t.registerCommand(m.DELETE_CHARACTER_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(n.deleteCharacter(e),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.DELETE_WORD_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(n.deleteWord(e),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.DELETE_LINE_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(n.deleteLine(e),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.CONTROLLED_TEXT_INSERTION_COMMAND,e=>{const n=m.$getSelection();if(!m.$isRangeSelection(n))return!1;if(typeof e=="string")n.insertText(e);else{const r=e.dataTransfer;if(r!=null)op(r,n);else{const o=e.data;o&&n.insertText(o)}}return!0},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.REMOVE_TEXT_COMMAND,()=>{const e=m.$getSelection();return!!m.$isRangeSelection(e)&&(e.removeText(),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.INSERT_LINE_BREAK_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(n.insertLineBreak(e),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.INSERT_PARAGRAPH_COMMAND,()=>{const e=m.$getSelection();return!!m.$isRangeSelection(e)&&(e.insertLineBreak(),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.KEY_ARROW_LEFT_COMMAND,e=>{const n=m.$getSelection();if(!m.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!0)&&(r.preventDefault(),nd(n,o,!0),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.KEY_ARROW_RIGHT_COMMAND,e=>{const n=m.$getSelection();if(!m.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!1)&&(r.preventDefault(),nd(n,o,!1),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.KEY_BACKSPACE_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(!sp||navigator.language!=="ko-KR")&&(e.preventDefault(),t.dispatchCommand(m.DELETE_CHARACTER_COMMAND,!0))},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.KEY_DELETE_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(e.preventDefault(),t.dispatchCommand(m.DELETE_CHARACTER_COMMAND,!1))},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.KEY_ENTER_COMMAND,e=>{const n=m.$getSelection();if(!m.$isRangeSelection(n))return!1;if(e!==null){if((sp||Ny||Sy)&&ky)return!1;e.preventDefault()}return t.dispatchCommand(m.INSERT_LINE_BREAK_COMMAND,!1)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.SELECT_ALL_COMMAND,()=>(m.$selectAll(),!0),m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.COPY_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(ip(e,t),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.CUT_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(function(r,o){ip(r,o),o.update(()=>{const s=m.$getSelection();m.$isRangeSelection(s)&&s.removeText()})}(e,t),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.PASTE_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(function(r,o){r.preventDefault(),o.update(()=>{const s=m.$getSelection(),i=nh(r,ClipboardEvent)?r.clipboardData:null;i!=null&&m.$isRangeSelection(s)&&op(i,s)},{tag:m.PASTE_TAG})}(e,t),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.DROP_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(e.preventDefault(),!0)},m.COMMAND_PRIORITY_EDITOR),t.registerCommand(m.DRAGSTART_COMMAND,e=>{const n=m.$getSelection();return!!m.$isRangeSelection(n)&&(e.preventDefault(),!0)},m.COMMAND_PRIORITY_EDITOR))}const Xl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function ap(t){return t.getEditorState().read(Rc(t.isComposing()))}function Dy({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=_e(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return Xl(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),v=s.getElementByKey(f);v!==null&&u.push(fn.createPortal(h,v,f))}return u},[i,a,s])}(r,n);return function(s){Xl(()=>At(Ay(s),rh(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(My,{content:e}),o]})}function My({content:t}){const[e]=_e(),n=function(o){const[s,i]=w.useState(()=>ap(o));return Xl(()=>{function a(){const c=ap(o);i(c)}return a(),At(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=Wf();return n?typeof t=="function"?t(r):t:null}const Yn=()=>new Map,Ql=t=>{const e=Yn();return t.forEach((n,r)=>{e.set(r,n)}),e},os=(t,e,n)=>{let r=t.get(e);return r===void 0&&t.set(e,r=n()),r},Ry=(t,e)=>{const n=[];for(const[r,o]of t)n.push(e(o,r));return n},Oy=(t,e)=>{for(const[n,r]of t)if(e(r,n))return!0;return!1},Bo=()=>new Set,wl=t=>t[t.length-1],qo=Array.from,jy=Array.isArray;class Iy{constructor(){this._observers=Yn()}on(e,n){return os(this._observers,e,Bo).add(n),n}once(e,n){const r=(...o)=>{this.off(e,r),n(...o)};this.on(e,r)}off(e,n){const r=this._observers.get(e);r!==void 0&&(r.delete(n),r.size===0&&this._observers.delete(e))}emit(e,n){return qo((this._observers.get(e)||Yn()).values()).forEach(r=>r(...n))}destroy(){this._observers=Yn()}}const no=Math.floor,Fi=Math.abs,sw=(t,e)=>t<e?t:e,ss=(t,e)=>t>e?t:e,Ly=t=>t!==0?t<0:1/t<0,lp=1,cp=2,gl=4,ml=8,Py=32,iw=64,Qi=128,$y=31,up=63,Ts=127,Fy=2147483647,By=Number.isInteger||(t=>typeof t=="number"&&isFinite(t)&&no(t)===t),qy=t=>t.toLowerCase(),Uy=/^\s*/g,Vy=t=>t.replace(Uy,""),Hy=/([A-Z])/g,dp=(t,e)=>Vy(t.replace(Hy,n=>`${e}${qy(n)}`)),zy=t=>{const e=unescape(encodeURIComponent(t)),n=e.length,r=new Uint8Array(n);for(let o=0;o<n;o++)r[o]=e.codePointAt(o);return r},Is=typeof TextEncoder<"u"?new TextEncoder:null,Gy=t=>Is.encode(t),Ky=Is?Gy:zy;let bl=typeof TextDecoder>"u"?null:new TextDecoder("utf-8",{fatal:!0,ignoreBOM:!0});bl&&bl.decode(new Uint8Array).length===1&&(bl=null);class oi{constructor(){this.cpos=0,this.cbuf=new Uint8Array(100),this.bufs=[]}}const Xc=()=>new oi,Yy=t=>{let e=t.cpos;for(let n=0;n<t.bufs.length;n++)e+=t.bufs[n].length;return e},sr=t=>{const e=new Uint8Array(Yy(t));let n=0;for(let r=0;r<t.bufs.length;r++){const o=t.bufs[r];e.set(o,n),n+=o.length}return e.set(new Uint8Array(t.cbuf.buffer,0,t.cpos),n),e},Wy=(t,e)=>{const n=t.cbuf.length;n-t.cpos<e&&(t.bufs.push(new Uint8Array(t.cbuf.buffer,0,t.cpos)),t.cbuf=new Uint8Array(ss(n,e)*2),t.cpos=0)},bt=(t,e)=>{const n=t.cbuf.length;t.cpos===n&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(n*2),t.cpos=0),t.cbuf[t.cpos++]=e},Zl=bt,Be=(t,e)=>{for(;e>Ts;)bt(t,Qi|Ts&e),e=no(e/128);bt(t,Ts&e)},Qc=(t,e)=>{const n=Ly(e);for(n&&(e=-e),bt(t,(e>up?Qi:0)|(n?iw:0)|up&e),e=no(e/64);e>0;)bt(t,(e>Ts?Qi:0)|Ts&e),e=no(e/128)},ec=new Uint8Array(3e4),Jy=ec.length/3,Xy=(t,e)=>{if(e.length<Jy){const n=Is.encodeInto(e,ec).written||0;Be(t,n);for(let r=0;r<n;r++)bt(t,ec[r])}else ln(t,Ky(e))},Qy=(t,e)=>{const n=unescape(encodeURIComponent(e)),r=n.length;Be(t,r);for(let o=0;o<r;o++)bt(t,n.codePointAt(o))},Oo=Is&&Is.encodeInto?Xy:Qy,Zc=(t,e)=>{const n=t.cbuf.length,r=t.cpos,o=sw(n-r,e.length),s=e.length-o;t.cbuf.set(e.subarray(0,o),r),t.cpos+=o,s>0&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(ss(n*2,s)),t.cbuf.set(e.subarray(o)),t.cpos=s)},ln=(t,e)=>{Be(t,e.byteLength),Zc(t,e)},eu=(t,e)=>{Wy(t,e);const n=new DataView(t.cbuf.buffer,t.cpos,e);return t.cpos+=e,n},Zy=(t,e)=>eu(t,4).setFloat32(0,e,!1),e2=(t,e)=>eu(t,8).setFloat64(0,e,!1),t2=(t,e)=>eu(t,8).setBigInt64(0,e,!1),pp=new DataView(new ArrayBuffer(4)),n2=t=>(pp.setFloat32(0,t),pp.getFloat32(0)===t),Ls=(t,e)=>{switch(typeof e){case"string":bt(t,119),Oo(t,e);break;case"number":By(e)&&Fi(e)<=Fy?(bt(t,125),Qc(t,e)):n2(e)?(bt(t,124),Zy(t,e)):(bt(t,123),e2(t,e));break;case"bigint":bt(t,122),t2(t,e);break;case"object":if(e===null)bt(t,126);else if(jy(e)){bt(t,117),Be(t,e.length);for(let n=0;n<e.length;n++)Ls(t,e[n])}else if(e instanceof Uint8Array)bt(t,116),ln(t,e);else{bt(t,118);const n=Object.keys(e);Be(t,n.length);for(let r=0;r<n.length;r++){const o=n[r];Oo(t,o),Ls(t,e[o])}}break;case"boolean":bt(t,e?120:121);break;default:bt(t,127)}};class fp extends oi{constructor(e){super(),this.w=e,this.s=null,this.count=0}write(e){this.s===e?this.count++:(this.count>0&&Be(this,this.count-1),this.count=1,this.w(this,e),this.s=e)}}const hp=t=>{t.count>0&&(Qc(t.encoder,t.count===1?t.s:-t.s),t.count>1&&Be(t.encoder,t.count-2))};class Bi{constructor(){this.encoder=new oi,this.s=0,this.count=0}write(e){this.s===e?this.count++:(hp(this),this.count=1,this.s=e)}toUint8Array(){return hp(this),sr(this.encoder)}}const wp=t=>{if(t.count>0){const e=t.diff*2+(t.count===1?0:1);Qc(t.encoder,e),t.count>1&&Be(t.encoder,t.count-2)}};class vl{constructor(){this.encoder=new oi,this.s=0,this.count=0,this.diff=0}write(e){this.diff===e-this.s?(this.s=e,this.count++):(wp(this),this.count=1,this.diff=e-this.s,this.s=e)}toUint8Array(){return wp(this),sr(this.encoder)}}class r2{constructor(){this.sarr=[],this.s="",this.lensE=new Bi}write(e){this.s+=e,this.s.length>19&&(this.sarr.push(this.s),this.s=""),this.lensE.write(e.length)}toUint8Array(){const e=new oi;return this.sarr.push(this.s),this.s="",Oo(e,this.sarr.join("")),Zc(e,this.lensE.toUint8Array()),sr(e)}}const Uo=t=>new Error(t),Wn=()=>{throw Uo("Method unimplemented")},ro=()=>{throw Uo("Unexpected case")},o2=crypto.getRandomValues.bind(crypto),aw=()=>o2(new Uint32Array(1))[0],s2="10000000-1000-4000-8000"+-1e11,i2=()=>s2.replace(/[018]/g,t=>(t^aw()&15>>t/4).toString(16)),gp=t=>new Promise(t);Promise.all.bind(Promise);const mp=t=>t===void 0?null:t;class a2{constructor(){this.map=new Map}setItem(e,n){this.map.set(e,n)}getItem(e){return this.map.get(e)}}let lw=new a2,l2=!0;try{typeof localStorage<"u"&&localStorage&&(lw=localStorage,l2=!1)}catch{}const c2=lw,u2=Object.assign,d2=Object.keys,p2=(t,e)=>{for(const n in t)e(t[n],n)},bp=t=>d2(t).length,f2=t=>{for(const e in t)return!1;return!0},h2=(t,e)=>{for(const n in t)if(!e(t[n],n))return!1;return!0},w2=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),g2=(t,e)=>t===e||bp(t)===bp(e)&&h2(t,(n,r)=>(n!==void 0||w2(e,r))&&e[r]===n),m2=Object.freeze,cw=t=>{for(const e in t){const n=t[e];(typeof n=="object"||typeof n=="function")&&cw(t[e])}return m2(t)},tu=(t,e,n=0)=>{try{for(;n<t.length;n++)t[n](...e)}finally{n<t.length&&tu(t,e,n+1)}},b2=(t,e)=>e.includes(t),Ps=typeof process<"u"&&process.release&&/node|io\.js/.test(process.release.name)&&Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]";let Bn;const v2=()=>{if(Bn===void 0)if(Ps){Bn=Yn();const t=process.argv;let e=null;for(let n=0;n<t.length;n++){const r=t[n];r[0]==="-"?(e!==null&&Bn.set(e,""),e=r):e!==null&&(Bn.set(e,r),e=null)}e!==null&&Bn.set(e,"")}else typeof location=="object"?(Bn=Yn(),(location.search||"?").slice(1).split("&").forEach(t=>{if(t.length!==0){const[e,n]=t.split("=");Bn.set(`--${dp(e,"-")}`,n),Bn.set(`-${dp(e,"-")}`,n)}})):Bn=Yn();return Bn},tc=t=>v2().has(t),Zi=t=>mp(Ps?process.env[t.toUpperCase().replaceAll("-","_")]:c2.getItem(t)),uw=t=>tc("--"+t)||Zi(t)!==null;uw("production");const x2=Ps&&b2(process.env.FORCE_COLOR,["true","1","2"]),y2=x2||!tc("--no-colors")&&!uw("no-color")&&(!Ps||process.stdout.isTTY)&&(!Ps||tc("--color")||Zi("COLORTERM")!==null||(Zi("TERM")||"").includes("color"));class _2{constructor(e,n){this.left=e,this.right=n}}const rr=(t,e)=>new _2(t,e);typeof DOMParser<"u"&&new DOMParser;const C2=t=>Ry(t,(e,n)=>`${n}:${e};`).join(""),dr=Symbol,dw=dr(),pw=dr(),E2=dr(),k2=dr(),N2=dr(),fw=dr(),T2=dr(),nu=dr(),S2=dr(),A2=t=>{var o;t.length===1&&((o=t[0])==null?void 0:o.constructor)===Function&&(t=t[0]());const e=[],n=[];let r=0;for(;r<t.length;r++){const s=t[r];if(s===void 0)break;if(s.constructor===String||s.constructor===Number)e.push(s);else if(s.constructor===Object)break}for(r>0&&n.push(e.join(""));r<t.length;r++){const s=t[r];s instanceof Symbol||n.push(s)}return n},D2={[dw]:rr("font-weight","bold"),[pw]:rr("font-weight","normal"),[E2]:rr("color","blue"),[N2]:rr("color","green"),[k2]:rr("color","grey"),[fw]:rr("color","red"),[T2]:rr("color","purple"),[nu]:rr("color","orange"),[S2]:rr("color","black")},M2=t=>{var i;t.length===1&&((i=t[0])==null?void 0:i.constructor)===Function&&(t=t[0]());const e=[],n=[],r=Yn();let o=[],s=0;for(;s<t.length;s++){const a=t[s],c=D2[a];if(c!==void 0)r.set(c.left,c.right);else{if(a===void 0)break;if(a.constructor===String||a.constructor===Number){const u=C2(r);s>0||u.length>0?(e.push("%c"+a),n.push(u)):e.push(a)}else break}}for(s>0&&(o=n,o.unshift(e.join("")));s<t.length;s++){const a=t[s];a instanceof Symbol||o.push(a)}return o},hw=y2?M2:A2,R2=(...t)=>{console.log(...hw(t)),ww.forEach(e=>e.print(t))},O2=(...t)=>{console.warn(...hw(t)),t.unshift(nu),ww.forEach(e=>e.print(t))},ww=Bo(),gw=t=>({[Symbol.iterator](){return this},next:t}),j2=(t,e)=>gw(()=>{let n;do n=t.next();while(!n.done&&!e(n.value));return n}),xl=(t,e)=>gw(()=>{const{done:n,value:r}=t.next();return{done:n,value:n?void 0:e(r)}});class I2{constructor(e,n){this.clock=e,this.len=n}}class L2{constructor(){this.clients=new Map}}const mw=(t,e,n)=>e.clients.forEach((r,o)=>{const s=t.doc.store.clients.get(o);if(s!=null){const i=s[s.length-1],a=i.id.clock+i.length;for(let c=0,u=r[c];c<r.length&&u.clock<a;u=r[++c])Ew(t,s,u.clock,u.len,n)}}),P2=(t,e)=>{let n=0,r=t.length-1;for(;n<=r;){const o=no((n+r)/2),s=t[o],i=s.clock;if(i<=e){if(e<i+s.len)return o;n=o+1}else r=o-1}return null},bw=(t,e)=>{const n=t.clients.get(e.client);return n!==void 0&&P2(n,e.clock)!==null},vw=t=>{t.clients.forEach(e=>{e.sort((o,s)=>o.clock-s.clock);let n,r;for(n=1,r=1;n<e.length;n++){const o=e[r-1],s=e[n];o.clock+o.len>=s.clock?o.len=ss(o.len,s.clock+s.len-o.clock):(r<n&&(e[r]=s),r++)}e.length=r})},xw=(t,e,n,r)=>{os(t.clients,e,()=>[]).push(new I2(n,r))},$2=(t,e)=>{Be(t.restEncoder,e.clients.size),qo(e.clients.entries()).sort((n,r)=>r[0]-n[0]).forEach(([n,r])=>{t.resetDsCurVal(),Be(t.restEncoder,n);const o=r.length;Be(t.restEncoder,o);for(let s=0;s<o;s++){const i=r[s];t.writeDsClock(i.clock),t.writeDsLen(i.len)}})},yw=aw;class si extends Iy{constructor({guid:e=i2(),collectionid:n=null,gc:r=!0,gcFilter:o=()=>!0,meta:s=null,autoLoad:i=!1,shouldLoad:a=!0}={}){super(),this.gc=r,this.gcFilter=o,this.clientID=yw(),this.guid=e,this.collectionid=n,this.share=new Map,this.store=new Y2,this._transaction=null,this._transactionCleanups=[],this.subdocs=new Set,this._item=null,this.shouldLoad=a,this.autoLoad=i,this.meta=s,this.isLoaded=!1,this.isSynced=!1,this.isDestroyed=!1,this.whenLoaded=gp(u=>{this.on("load",()=>{this.isLoaded=!0,u(this)})});const c=()=>gp(u=>{const d=p=>{(p===void 0||p===!0)&&(this.off("sync",d),u())};this.on("sync",d)});this.on("sync",u=>{u===!1&&this.isSynced&&(this.whenSynced=c()),this.isSynced=u===void 0||u===!0,this.isSynced&&!this.isLoaded&&this.emit("load",[this])}),this.whenSynced=c()}load(){const e=this._item;e!==null&&!this.shouldLoad&&He(e.parent.doc,n=>{n.subdocsLoaded.add(this)},null,!0),this.shouldLoad=!0}getSubdocs(){return this.subdocs}getSubdocGuids(){return new Set(qo(this.subdocs).map(e=>e.guid))}transact(e,n=null){return He(this,e,n)}get(e,n=Tt){const r=os(this.share,e,()=>{const s=new n;return s._integrate(this,null),s}),o=r.constructor;if(n!==Tt&&o!==n)if(o===Tt){const s=new n;s._map=r._map,r._map.forEach(i=>{for(;i!==null;i=i.left)i.parent=s}),s._start=r._start;for(let i=s._start;i!==null;i=i.right)i.parent=s;return s._length=r._length,this.share.set(e,s),s._integrate(this,null),s}else throw new Error(`Type with the name ${e} has already been defined with a different constructor`);return r}getArray(e=""){return this.get(e,Jr)}getText(e=""){return this.get(e,na)}getMap(e=""){return this.get(e,Vo)}getXmlElement(e=""){return this.get(e,Bs)}getXmlFragment(e=""){return this.get(e,Ho)}toJSON(){const e={};return this.share.forEach((n,r)=>{e[r]=n.toJSON()}),e}destroy(){this.isDestroyed=!0,qo(this.subdocs).forEach(n=>n.destroy());const e=this._item;if(e!==null){this._item=null;const n=e.content;n.doc=new si({guid:this.guid,...n.opts,shouldLoad:!1}),n.doc._item=e,He(e.parent.doc,r=>{const o=n.doc;e.deleted||r.subdocsAdded.add(o),r.subdocsRemoved.add(this)},null,!0)}this.emit("destroyed",[!0]),this.emit("destroy",[this]),super.destroy()}}class F2{constructor(){this.restEncoder=Xc()}toUint8Array(){return sr(this.restEncoder)}resetDsCurVal(){}writeDsClock(e){Be(this.restEncoder,e)}writeDsLen(e){Be(this.restEncoder,e)}}class B2 extends F2{writeLeftID(e){Be(this.restEncoder,e.client),Be(this.restEncoder,e.clock)}writeRightID(e){Be(this.restEncoder,e.client),Be(this.restEncoder,e.clock)}writeClient(e){Be(this.restEncoder,e)}writeInfo(e){Zl(this.restEncoder,e)}writeString(e){Oo(this.restEncoder,e)}writeParentInfo(e){Be(this.restEncoder,e?1:0)}writeTypeRef(e){Be(this.restEncoder,e)}writeLen(e){Be(this.restEncoder,e)}writeAny(e){Ls(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){Oo(this.restEncoder,JSON.stringify(e))}writeKey(e){Oo(this.restEncoder,e)}}class q2{constructor(){this.restEncoder=Xc(),this.dsCurrVal=0}toUint8Array(){return sr(this.restEncoder)}resetDsCurVal(){this.dsCurrVal=0}writeDsClock(e){const n=e-this.dsCurrVal;this.dsCurrVal=e,Be(this.restEncoder,n)}writeDsLen(e){e===0&&ro(),Be(this.restEncoder,e-1),this.dsCurrVal+=e}}class U2 extends q2{constructor(){super(),this.keyMap=new Map,this.keyClock=0,this.keyClockEncoder=new vl,this.clientEncoder=new Bi,this.leftClockEncoder=new vl,this.rightClockEncoder=new vl,this.infoEncoder=new fp(Zl),this.stringEncoder=new r2,this.parentInfoEncoder=new fp(Zl),this.typeRefEncoder=new Bi,this.lenEncoder=new Bi}toUint8Array(){const e=Xc();return Be(e,0),ln(e,this.keyClockEncoder.toUint8Array()),ln(e,this.clientEncoder.toUint8Array()),ln(e,this.leftClockEncoder.toUint8Array()),ln(e,this.rightClockEncoder.toUint8Array()),ln(e,sr(this.infoEncoder)),ln(e,this.stringEncoder.toUint8Array()),ln(e,sr(this.parentInfoEncoder)),ln(e,this.typeRefEncoder.toUint8Array()),ln(e,this.lenEncoder.toUint8Array()),Zc(e,sr(this.restEncoder)),sr(e)}writeLeftID(e){this.clientEncoder.write(e.client),this.leftClockEncoder.write(e.clock)}writeRightID(e){this.clientEncoder.write(e.client),this.rightClockEncoder.write(e.clock)}writeClient(e){this.clientEncoder.write(e)}writeInfo(e){this.infoEncoder.write(e)}writeString(e){this.stringEncoder.write(e)}writeParentInfo(e){this.parentInfoEncoder.write(e?1:0)}writeTypeRef(e){this.typeRefEncoder.write(e)}writeLen(e){this.lenEncoder.write(e)}writeAny(e){Ls(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){Ls(this.restEncoder,e)}writeKey(e){const n=this.keyMap.get(e);n===void 0?(this.keyClockEncoder.write(this.keyClock++),this.stringEncoder.write(e)):this.keyClockEncoder.write(n)}}const V2=(t,e,n,r)=>{r=ss(r,e[0].id.clock);const o=ar(e,r);Be(t.restEncoder,e.length-o),t.writeClient(n),Be(t.restEncoder,r);const s=e[o];s.write(t,r-s.id.clock);for(let i=o+1;i<e.length;i++)e[i].write(t,0)},H2=(t,e,n)=>{const r=new Map;n.forEach((o,s)=>{Kt(e,s)>o&&r.set(s,o)}),ru(e).forEach((o,s)=>{n.has(s)||r.set(s,0)}),Be(t.restEncoder,r.size),qo(r.entries()).sort((o,s)=>s[0]-o[0]).forEach(([o,s])=>{V2(t,e.clients.get(o),o,s)})},z2=(t,e)=>H2(t,e.doc.store,e.beforeState);class G2{constructor(){this.l=[]}}const vp=()=>new G2,xp=(t,e)=>t.l.push(e),yp=(t,e)=>{const n=t.l,r=n.length;t.l=n.filter(o=>e!==o),r===t.l.length&&console.error("[yjs] Tried to remove event handler that doesn't exist.")},_w=(t,e,n)=>tu(t.l,[e,n]);class qi{constructor(e,n){this.client=e,this.clock=n}}const Oi=(t,e)=>t===e||t!==null&&e!==null&&t.client===e.client&&t.clock===e.clock,nt=(t,e)=>new qi(t,e),K2=t=>{for(const[e,n]of t.doc.share.entries())if(n===t)return e;throw ro()},To=(t,e)=>e===void 0?!t.deleted:e.sv.has(t.id.client)&&(e.sv.get(t.id.client)||0)>t.id.clock&&!bw(e.ds,t.id),nc=(t,e)=>{const n=os(t.meta,nc,Bo),r=t.doc.store;n.has(e)||(e.sv.forEach((o,s)=>{o<Kt(r,s)&&Tr(t,nt(s,o))}),mw(t,e.ds,o=>{}),n.add(e))};class Y2{constructor(){this.clients=new Map,this.pendingStructs=null,this.pendingDs=null}}const ru=t=>{const e=new Map;return t.clients.forEach((n,r)=>{const o=n[n.length-1];e.set(r,o.id.clock+o.length)}),e},Kt=(t,e)=>{const n=t.clients.get(e);if(n===void 0)return 0;const r=n[n.length-1];return r.id.clock+r.length},Cw=(t,e)=>{let n=t.clients.get(e.id.client);if(n===void 0)n=[],t.clients.set(e.id.client,n);else{const r=n[n.length-1];if(r.id.clock+r.length!==e.id.clock)throw ro()}n.push(e)},ar=(t,e)=>{let n=0,r=t.length-1,o=t[r],s=o.id.clock;if(s===e)return r;let i=no(e/(s+o.length-1)*r);for(;n<=r;){if(o=t[i],s=o.id.clock,s<=e){if(e<s+o.length)return i;n=i+1}else r=i-1;i=no((n+r)/2)}throw ro()},W2=(t,e)=>{const n=t.clients.get(e.client);return n[ar(n,e.clock)]},yl=W2,rc=(t,e,n)=>{const r=ar(e,n),o=e[r];return o.id.clock<n&&o instanceof Ot?(e.splice(r+1,0,Vw(t,o,n-o.id.clock)),r+1):r},Tr=(t,e)=>{const n=t.doc.store.clients.get(e.client);return n[rc(t,n,e.clock)]},_p=(t,e,n)=>{const r=e.clients.get(n.client),o=ar(r,n.clock),s=r[o];return n.clock!==s.id.clock+s.length-1&&s.constructor!==br&&r.splice(o+1,0,Vw(t,s,n.clock-s.id.clock+1)),s},J2=(t,e,n)=>{const r=t.clients.get(e.id.client);r[ar(r,e.id.clock)]=n},Ew=(t,e,n,r,o)=>{if(r===0)return;const s=n+r;let i=rc(t,e,n),a;do a=e[i++],s<a.id.clock+a.length&&rc(t,e,s),o(a);while(i<e.length&&e[i].id.clock<s)};class X2{constructor(e,n,r){this.doc=e,this.deleteSet=new L2,this.beforeState=ru(e.store),this.afterState=new Map,this.changed=new Map,this.changedParentTypes=new Map,this._mergeStructs=[],this.origin=n,this.meta=new Map,this.local=r,this.subdocsAdded=new Set,this.subdocsRemoved=new Set,this.subdocsLoaded=new Set,this._needFormattingCleanup=!1}}const Cp=(t,e)=>e.deleteSet.clients.size===0&&!Oy(e.afterState,(n,r)=>e.beforeState.get(r)!==n)?!1:(vw(e.deleteSet),z2(t,e),$2(t,e.deleteSet),!0),Ep=(t,e,n)=>{const r=e._item;(r===null||r.id.clock<(t.beforeState.get(r.id.client)||0)&&!r.deleted)&&os(t.changed,e,Bo).add(n)},Ui=(t,e)=>{let n=t[e],r=t[e-1],o=e;for(;o>0;n=r,r=t[--o-1]){if(r.deleted===n.deleted&&r.constructor===n.constructor&&r.mergeWith(n)){n instanceof Ot&&n.parentSub!==null&&n.parent._map.get(n.parentSub)===n&&n.parent._map.set(n.parentSub,r);continue}break}const s=e-o;return s&&t.splice(e+1-s,s),s},Q2=(t,e,n)=>{for(const[r,o]of t.clients.entries()){const s=e.clients.get(r);for(let i=o.length-1;i>=0;i--){const a=o[i],c=a.clock+a.len;for(let u=ar(s,a.clock),d=s[u];u<s.length&&d.id.clock<c;d=s[++u]){const p=s[u];if(a.clock+a.len<=p.id.clock)break;p instanceof Ot&&p.deleted&&!p.keep&&n(p)&&p.gc(e,!1)}}}},Z2=(t,e)=>{t.clients.forEach((n,r)=>{const o=e.clients.get(r);for(let s=n.length-1;s>=0;s--){const i=n[s],a=sw(o.length-1,1+ar(o,i.clock+i.len-1));for(let c=a,u=o[c];c>0&&u.id.clock>=i.clock;u=o[c])c-=1+Ui(o,c)}})},kw=(t,e)=>{if(e<t.length){const n=t[e],r=n.doc,o=r.store,s=n.deleteSet,i=n._mergeStructs;try{vw(s),n.afterState=ru(n.doc.store),r.emit("beforeObserverCalls",[n,r]);const a=[];n.changed.forEach((c,u)=>a.push(()=>{(u._item===null||!u._item.deleted)&&u._callObserver(n,c)})),a.push(()=>{n.changedParentTypes.forEach((c,u)=>{u._dEH.l.length>0&&(u._item===null||!u._item.deleted)&&(c=c.filter(d=>d.target._item===null||!d.target._item.deleted),c.forEach(d=>{d.currentTarget=u,d._path=null}),c.sort((d,p)=>d.path.length-p.path.length),_w(u._dEH,c,n))})}),a.push(()=>r.emit("afterTransaction",[n,r])),tu(a,[]),n._needFormattingCleanup&&u_(n)}finally{r.gc&&Q2(s,o,r.gcFilter),Z2(s,o),n.afterState.forEach((d,p)=>{const f=n.beforeState.get(p)||0;if(f!==d){const h=o.clients.get(p),v=ss(ar(h,f),1);for(let x=h.length-1;x>=v;)x-=1+Ui(h,x)}});for(let d=i.length-1;d>=0;d--){const{client:p,clock:f}=i[d].id,h=o.clients.get(p),v=ar(h,f);v+1<h.length&&Ui(h,v+1)>1||v>0&&Ui(h,v)}if(!n.local&&n.afterState.get(r.clientID)!==n.beforeState.get(r.clientID)&&(R2(nu,dw,"[yjs] ",pw,fw,"Changed the client-id because another client seems to be using it."),r.clientID=yw()),r.emit("afterTransactionCleanup",[n,r]),r._observers.has("update")){const d=new B2;Cp(d,n)&&r.emit("update",[d.toUint8Array(),n.origin,r,n])}if(r._observers.has("updateV2")){const d=new U2;Cp(d,n)&&r.emit("updateV2",[d.toUint8Array(),n.origin,r,n])}const{subdocsAdded:a,subdocsLoaded:c,subdocsRemoved:u}=n;(a.size>0||u.size>0||c.size>0)&&(a.forEach(d=>{d.clientID=r.clientID,d.collectionid==null&&(d.collectionid=r.collectionid),r.subdocs.add(d)}),u.forEach(d=>r.subdocs.delete(d)),r.emit("subdocs",[{loaded:c,added:a,removed:u},r,n]),u.forEach(d=>d.destroy())),t.length<=e+1?(r._transactionCleanups=[],r.emit("afterAllTransactions",[r,t])):kw(t,e+1)}}},He=(t,e,n=null,r=!0)=>{const o=t._transactionCleanups;let s=!1,i=null;t._transaction===null&&(s=!0,t._transaction=new X2(t,n,r),o.push(t._transaction),o.length===1&&t.emit("beforeAllTransactions",[t]),t.emit("beforeTransaction",[t._transaction,t]));try{i=e(t._transaction)}finally{if(s){const a=t._transaction===o[0];t._transaction=null,a&&kw(o,0)}}return i},kp="You must not compute changes after the event-handler fired.";class Ra{constructor(e,n){this.target=e,this.currentTarget=e,this.transaction=n,this._changes=null,this._keys=null,this._delta=null,this._path=null}get path(){return this._path||(this._path=e_(this.currentTarget,this.target))}deletes(e){return bw(this.transaction.deleteSet,e.id)}get keys(){if(this._keys===null){if(this.transaction.doc._transactionCleanups.length===0)throw Uo(kp);const e=new Map,n=this.target;this.transaction.changed.get(n).forEach(o=>{if(o!==null){const s=n._map.get(o);let i,a;if(this.adds(s)){let c=s.left;for(;c!==null&&this.adds(c);)c=c.left;if(this.deletes(s))if(c!==null&&this.deletes(c))i="delete",a=wl(c.content.getContent());else return;else c!==null&&this.deletes(c)?(i="update",a=wl(c.content.getContent())):(i="add",a=void 0)}else if(this.deletes(s))i="delete",a=wl(s.content.getContent());else return;e.set(o,{action:i,oldValue:a})}}),this._keys=e}return this._keys}get delta(){return this.changes.delta}adds(e){return e.id.clock>=(this.transaction.beforeState.get(e.id.client)||0)}get changes(){let e=this._changes;if(e===null){if(this.transaction.doc._transactionCleanups.length===0)throw Uo(kp);const n=this.target,r=Bo(),o=Bo(),s=[];if(e={added:r,deleted:o,delta:s,keys:this.keys},this.transaction.changed.get(n).has(null)){let a=null;const c=()=>{a&&s.push(a)};for(let u=n._start;u!==null;u=u.right)u.deleted?this.deletes(u)&&!this.adds(u)&&((a===null||a.delete===void 0)&&(c(),a={delete:0}),a.delete+=u.length,o.add(u)):this.adds(u)?((a===null||a.insert===void 0)&&(c(),a={insert:[]}),a.insert=a.insert.concat(u.content.getContent()),r.add(u)):((a===null||a.retain===void 0)&&(c(),a={retain:0}),a.retain+=u.length);a!==null&&a.retain===void 0&&c()}this._changes=e}return e}}const e_=(t,e)=>{const n=[];for(;e._item!==null&&e!==t;){if(e._item.parentSub!==null)n.unshift(e._item.parentSub);else{let r=0,o=e._item.parent._start;for(;o!==e._item&&o!==null;)!o.deleted&&o.countable&&(r+=o.length),o=o.right;n.unshift(r)}e=e._item.parent}return n},It=()=>{O2("Invalid access: Add Yjs type to a document before reading data.")},Nw=80;let ou=0;class t_{constructor(e,n){e.marker=!0,this.p=e,this.index=n,this.timestamp=ou++}}const n_=t=>{t.timestamp=ou++},Tw=(t,e,n)=>{t.p.marker=!1,t.p=e,e.marker=!0,t.index=n,t.timestamp=ou++},r_=(t,e,n)=>{if(t.length>=Nw){const r=t.reduce((o,s)=>o.timestamp<s.timestamp?o:s);return Tw(r,e,n),r}else{const r=new t_(e,n);return t.push(r),r}},Oa=(t,e)=>{if(t._start===null||e===0||t._searchMarker===null)return null;const n=t._searchMarker.length===0?null:t._searchMarker.reduce((s,i)=>Fi(e-s.index)<Fi(e-i.index)?s:i);let r=t._start,o=0;for(n!==null&&(r=n.p,o=n.index,n_(n));r.right!==null&&o<e;){if(!r.deleted&&r.countable){if(e<o+r.length)break;o+=r.length}r=r.right}for(;r.left!==null&&o>e;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);for(;r.left!==null&&r.left.id.client===r.id.client&&r.left.id.clock+r.left.length===r.id.clock;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);return n!==null&&Fi(n.index-o)<r.parent.length/Nw?(Tw(n,r,o),n):r_(t._searchMarker,r,o)},$s=(t,e,n)=>{for(let r=t.length-1;r>=0;r--){const o=t[r];if(n>0){let s=o.p;for(s.marker=!1;s&&(s.deleted||!s.countable);)s=s.left,s&&!s.deleted&&s.countable&&(o.index-=s.length);if(s===null||s.marker===!0){t.splice(r,1);continue}o.p=s,s.marker=!0}(e<o.index||n>0&&e===o.index)&&(o.index=ss(e,o.index+n))}},ja=(t,e,n)=>{const r=t,o=e.changedParentTypes;for(;os(o,t,()=>[]).push(n),t._item!==null;)t=t._item.parent;_w(r._eH,n,e)};class Tt{constructor(){this._item=null,this._map=new Map,this._start=null,this.doc=null,this._length=0,this._eH=vp(),this._dEH=vp(),this._searchMarker=null}get parent(){return this._item?this._item.parent:null}_integrate(e,n){this.doc=e,this._item=n}_copy(){throw Wn()}clone(){throw Wn()}_write(e){}get _first(){let e=this._start;for(;e!==null&&e.deleted;)e=e.right;return e}_callObserver(e,n){!e.local&&this._searchMarker&&(this._searchMarker.length=0)}observe(e){xp(this._eH,e)}observeDeep(e){xp(this._dEH,e)}unobserve(e){yp(this._eH,e)}unobserveDeep(e){yp(this._dEH,e)}toJSON(){}}const Sw=(t,e,n)=>{t.doc??It(),e<0&&(e=t._length+e),n<0&&(n=t._length+n);let r=n-e;const o=[];let s=t._start;for(;s!==null&&r>0;){if(s.countable&&!s.deleted){const i=s.content.getContent();if(i.length<=e)e-=i.length;else{for(let a=e;a<i.length&&r>0;a++)o.push(i[a]),r--;e=0}}s=s.right}return o},Aw=t=>{t.doc??It();const e=[];let n=t._start;for(;n!==null;){if(n.countable&&!n.deleted){const r=n.content.getContent();for(let o=0;o<r.length;o++)e.push(r[o])}n=n.right}return e},Fs=(t,e)=>{let n=0,r=t._start;for(t.doc??It();r!==null;){if(r.countable&&!r.deleted){const o=r.content.getContent();for(let s=0;s<o.length;s++)e(o[s],n++,t)}r=r.right}},Dw=(t,e)=>{const n=[];return Fs(t,(r,o)=>{n.push(e(r,o,t))}),n},o_=t=>{let e=t._start,n=null,r=0;return{[Symbol.iterator](){return this},next:()=>{if(n===null){for(;e!==null&&e.deleted;)e=e.right;if(e===null)return{done:!0,value:void 0};n=e.content.getContent(),r=0,e=e.right}const o=n[r++];return n.length<=r&&(n=null),{done:!1,value:o}}}},Mw=(t,e)=>{t.doc??It();const n=Oa(t,e);let r=t._start;for(n!==null&&(r=n.p,e-=n.index);r!==null;r=r.right)if(!r.deleted&&r.countable){if(e<r.length)return r.content.getContent()[e];e-=r.length}},ea=(t,e,n,r)=>{let o=n;const s=t.doc,i=s.clientID,a=s.store,c=n===null?e._start:n.right;let u=[];const d=()=>{u.length>0&&(o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new zo(u)),o.integrate(t,0),u=[])};r.forEach(p=>{if(p===null)u.push(p);else switch(p.constructor){case Number:case Object:case Boolean:case Array:case String:u.push(p);break;default:switch(d(),p.constructor){case Uint8Array:case ArrayBuffer:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new Ia(new Uint8Array(p))),o.integrate(t,0);break;case si:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new La(p)),o.integrate(t,0);break;default:if(p instanceof Tt)o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new jr(p)),o.integrate(t,0);else throw new Error("Unexpected content type in insert operation")}}}),d()},Rw=()=>Uo("Length exceeded!"),Ow=(t,e,n,r)=>{if(n>e._length)throw Rw();if(n===0)return e._searchMarker&&$s(e._searchMarker,n,r.length),ea(t,e,null,r);const o=n,s=Oa(e,n);let i=e._start;for(s!==null&&(i=s.p,n-=s.index,n===0&&(i=i.prev,n+=i&&i.countable&&!i.deleted?i.length:0));i!==null;i=i.right)if(!i.deleted&&i.countable){if(n<=i.length){n<i.length&&Tr(t,nt(i.id.client,i.id.clock+n));break}n-=i.length}return e._searchMarker&&$s(e._searchMarker,o,r.length),ea(t,e,i,r)},s_=(t,e,n)=>{let o=(e._searchMarker||[]).reduce((s,i)=>i.index>s.index?i:s,{index:0,p:e._start}).p;if(o)for(;o.right;)o=o.right;return ea(t,e,o,n)},jw=(t,e,n,r)=>{if(r===0)return;const o=n,s=r,i=Oa(e,n);let a=e._start;for(i!==null&&(a=i.p,n-=i.index);a!==null&&n>0;a=a.right)!a.deleted&&a.countable&&(n<a.length&&Tr(t,nt(a.id.client,a.id.clock+n)),n-=a.length);for(;r>0&&a!==null;)a.deleted||(r<a.length&&Tr(t,nt(a.id.client,a.id.clock+r)),a.delete(t),r-=a.length),a=a.right;if(r>0)throw Rw();e._searchMarker&&$s(e._searchMarker,o,-s+r)},ta=(t,e,n)=>{const r=e._map.get(n);r!==void 0&&r.delete(t)},su=(t,e,n,r)=>{const o=e._map.get(n)||null,s=t.doc,i=s.clientID;let a;if(r==null)a=new zo([r]);else switch(r.constructor){case Number:case Object:case Boolean:case Array:case String:case Date:case BigInt:a=new zo([r]);break;case Uint8Array:a=new Ia(r);break;case si:a=new La(r);break;default:if(r instanceof Tt)a=new jr(r);else throw new Error("Unexpected content type")}new Ot(nt(i,Kt(s.store,i)),o,o&&o.lastId,null,null,e,n,a).integrate(t,0)},iu=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted?n.content.getContent()[n.length-1]:void 0},Iw=t=>{const e={};return t.doc??It(),t._map.forEach((n,r)=>{n.deleted||(e[r]=n.content.getContent()[n.length-1])}),e},Lw=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted},i_=(t,e)=>{const n={};return t._map.forEach((r,o)=>{let s=r;for(;s!==null&&(!e.sv.has(s.id.client)||s.id.clock>=(e.sv.get(s.id.client)||0));)s=s.left;s!==null&&To(s,e)&&(n[o]=s.content.getContent()[s.length-1])}),n},ji=t=>(t.doc??It(),j2(t._map.entries(),e=>!e[1].deleted));class Pw extends Ra{}class Jr extends Tt{constructor(){super(),this._prelimContent=[],this._searchMarker=[]}static from(e){const n=new Jr;return n.push(e),n}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new Jr}clone(){const e=new Jr;return e.insert(0,this.toArray().map(n=>n instanceof Tt?n.clone():n)),e}get length(){return this.doc??It(),this._length}_callObserver(e,n){super._callObserver(e,n),ja(this,e,new Pw(this,e))}insert(e,n){this.doc!==null?He(this.doc,r=>{Ow(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}push(e){this.doc!==null?He(this.doc,n=>{s_(n,this,e)}):this._prelimContent.push(...e)}unshift(e){this.insert(0,e)}delete(e,n=1){this.doc!==null?He(this.doc,r=>{jw(r,this,e,n)}):this._prelimContent.splice(e,n)}get(e){return Mw(this,e)}toArray(){return Aw(this)}slice(e=0,n=this.length){return Sw(this,e,n)}toJSON(){return this.map(e=>e instanceof Tt?e.toJSON():e)}map(e){return Dw(this,e)}forEach(e){Fs(this,e)}[Symbol.iterator](){return o_(this)}_write(e){e.writeTypeRef(g_)}}class a_ extends Ra{constructor(e,n,r){super(e,n),this.keysChanged=r}}class Vo extends Tt{constructor(e){super(),this._prelimContent=null,e===void 0?this._prelimContent=new Map:this._prelimContent=new Map(e)}_integrate(e,n){super._integrate(e,n),this._prelimContent.forEach((r,o)=>{this.set(o,r)}),this._prelimContent=null}_copy(){return new Vo}clone(){const e=new Vo;return this.forEach((n,r)=>{e.set(r,n instanceof Tt?n.clone():n)}),e}_callObserver(e,n){ja(this,e,new a_(this,e,n))}toJSON(){this.doc??It();const e={};return this._map.forEach((n,r)=>{if(!n.deleted){const o=n.content.getContent()[n.length-1];e[r]=o instanceof Tt?o.toJSON():o}}),e}get size(){return[...ji(this)].length}keys(){return xl(ji(this),e=>e[0])}values(){return xl(ji(this),e=>e[1].content.getContent()[e[1].length-1])}entries(){return xl(ji(this),e=>[e[0],e[1].content.getContent()[e[1].length-1]])}forEach(e){this.doc??It(),this._map.forEach((n,r)=>{n.deleted||e(n.content.getContent()[n.length-1],r,this)})}[Symbol.iterator](){return this.entries()}delete(e){this.doc!==null?He(this.doc,n=>{ta(n,this,e)}):this._prelimContent.delete(e)}set(e,n){return this.doc!==null?He(this.doc,r=>{su(r,this,e,n)}):this._prelimContent.set(e,n),n}get(e){return iu(this,e)}has(e){return Lw(this,e)}clear(){this.doc!==null?He(this.doc,e=>{this.forEach(function(n,r,o){ta(e,o,r)})}):this._prelimContent.clear()}_write(e){e.writeTypeRef(m_)}}const yr=(t,e)=>t===e||typeof t=="object"&&typeof e=="object"&&t&&e&&g2(t,e);class oc{constructor(e,n,r,o){this.left=e,this.right=n,this.index=r,this.currentAttributes=o}forward(){switch(this.right===null&&ro(),this.right.content.constructor){case vt:this.right.deleted||is(this.currentAttributes,this.right.content);break;default:this.right.deleted||(this.index+=this.right.length);break}this.left=this.right,this.right=this.right.right}}const Np=(t,e,n)=>{for(;e.right!==null&&n>0;){switch(e.right.content.constructor){case vt:e.right.deleted||is(e.currentAttributes,e.right.content);break;default:e.right.deleted||(n<e.right.length&&Tr(t,nt(e.right.id.client,e.right.id.clock+n)),e.index+=e.right.length,n-=e.right.length);break}e.left=e.right,e.right=e.right.right}return e},Ii=(t,e,n,r)=>{const o=new Map,s=r?Oa(e,n):null;if(s){const i=new oc(s.p.left,s.p,s.index,o);return Np(t,i,n-s.index)}else{const i=new oc(null,e._start,0,o);return Np(t,i,n)}},$w=(t,e,n,r)=>{for(;n.right!==null&&(n.right.deleted===!0||n.right.content.constructor===vt&&yr(r.get(n.right.content.key),n.right.content.value));)n.right.deleted||r.delete(n.right.content.key),n.forward();const o=t.doc,s=o.clientID;r.forEach((i,a)=>{const c=n.left,u=n.right,d=new Ot(nt(s,Kt(o.store,s)),c,c&&c.lastId,u,u&&u.id,e,null,new vt(a,i));d.integrate(t,0),n.right=d,n.forward()})},is=(t,e)=>{const{key:n,value:r}=e;r===null?t.delete(n):t.set(n,r)},Fw=(t,e)=>{for(;t.right!==null;){if(!(t.right.deleted||t.right.content.constructor===vt&&yr(e[t.right.content.key]??null,t.right.content.value)))break;t.forward()}},Bw=(t,e,n,r)=>{const o=t.doc,s=o.clientID,i=new Map;for(const a in r){const c=r[a],u=n.currentAttributes.get(a)??null;if(!yr(u,c)){i.set(a,u);const{left:d,right:p}=n;n.right=new Ot(nt(s,Kt(o.store,s)),d,d&&d.lastId,p,p&&p.id,e,null,new vt(a,c)),n.right.integrate(t,0),n.forward()}}return i},_l=(t,e,n,r,o)=>{n.currentAttributes.forEach((f,h)=>{o[h]===void 0&&(o[h]=null)});const s=t.doc,i=s.clientID;Fw(n,o);const a=Bw(t,e,n,o),c=r.constructor===String?new lr(r):r instanceof Tt?new jr(r):new as(r);let{left:u,right:d,index:p}=n;e._searchMarker&&$s(e._searchMarker,n.index,c.getLength()),d=new Ot(nt(i,Kt(s.store,i)),u,u&&u.lastId,d,d&&d.id,e,null,c),d.integrate(t,0),n.right=d,n.index=p,n.forward(),$w(t,e,n,a)},Tp=(t,e,n,r,o)=>{const s=t.doc,i=s.clientID;Fw(n,o);const a=Bw(t,e,n,o);e:for(;n.right!==null&&(r>0||a.size>0&&(n.right.deleted||n.right.content.constructor===vt));){if(!n.right.deleted)switch(n.right.content.constructor){case vt:{const{key:c,value:u}=n.right.content,d=o[c];if(d!==void 0){if(yr(d,u))a.delete(c);else{if(r===0)break e;a.set(c,u)}n.right.delete(t)}else n.currentAttributes.set(c,u);break}default:r<n.right.length&&Tr(t,nt(n.right.id.client,n.right.id.clock+r)),r-=n.right.length;break}n.forward()}if(r>0){let c="";for(;r>0;r--)c+=`
`;n.right=new Ot(nt(i,Kt(s.store,i)),n.left,n.left&&n.left.lastId,n.right,n.right&&n.right.id,e,null,new lr(c)),n.right.integrate(t,0),n.forward()}$w(t,e,n,a)},qw=(t,e,n,r,o)=>{let s=e;const i=Yn();for(;s&&(!s.countable||s.deleted);){if(!s.deleted&&s.content.constructor===vt){const u=s.content;i.set(u.key,u)}s=s.right}let a=0,c=!1;for(;e!==s;){if(n===e&&(c=!0),!e.deleted){const u=e.content;switch(u.constructor){case vt:{const{key:d,value:p}=u,f=r.get(d)??null;(i.get(d)!==u||f===p)&&(e.delete(t),a++,!c&&(o.get(d)??null)===p&&f!==p&&(f===null?o.delete(d):o.set(d,f))),!c&&!e.deleted&&is(o,u);break}}}e=e.right}return a},l_=(t,e)=>{for(;e&&e.right&&(e.right.deleted||!e.right.countable);)e=e.right;const n=new Set;for(;e&&(e.deleted||!e.countable);){if(!e.deleted&&e.content.constructor===vt){const r=e.content.key;n.has(r)?e.delete(t):n.add(r)}e=e.left}},c_=t=>{let e=0;return He(t.doc,n=>{let r=t._start,o=t._start,s=Yn();const i=Ql(s);for(;o;){if(o.deleted===!1)switch(o.content.constructor){case vt:is(i,o.content);break;default:e+=qw(n,r,o,s,i),s=Ql(i),r=o;break}o=o.right}}),e},u_=t=>{const e=new Set,n=t.doc;for(const[r,o]of t.afterState.entries()){const s=t.beforeState.get(r)||0;o!==s&&Ew(t,n.store.clients.get(r),s,o,i=>{!i.deleted&&i.content.constructor===vt&&i.constructor!==br&&e.add(i.parent)})}He(n,r=>{mw(t,t.deleteSet,o=>{if(o instanceof br||!o.parent._hasFormatting||e.has(o.parent))return;const s=o.parent;o.content.constructor===vt?e.add(s):l_(r,o)});for(const o of e)c_(o)})},Sp=(t,e,n)=>{const r=n,o=Ql(e.currentAttributes),s=e.right;for(;n>0&&e.right!==null;){if(e.right.deleted===!1)switch(e.right.content.constructor){case jr:case as:case lr:n<e.right.length&&Tr(t,nt(e.right.id.client,e.right.id.clock+n)),n-=e.right.length,e.right.delete(t);break}e.forward()}s&&qw(t,s,e.right,o,e.currentAttributes);const i=(e.left||e.right).parent;return i._searchMarker&&$s(i._searchMarker,e.index,-r+n),e};class d_ extends Ra{constructor(e,n,r){super(e,n),this.childListChanged=!1,this.keysChanged=new Set,r.forEach(o=>{o===null?this.childListChanged=!0:this.keysChanged.add(o)})}get changes(){if(this._changes===null){const e={keys:this.keys,delta:this.delta,added:new Set,deleted:new Set};this._changes=e}return this._changes}get delta(){if(this._delta===null){const e=this.target.doc,n=[];He(e,r=>{const o=new Map,s=new Map;let i=this.target._start,a=null;const c={};let u="",d=0,p=0;const f=()=>{if(a!==null){let h=null;switch(a){case"delete":p>0&&(h={delete:p}),p=0;break;case"insert":(typeof u=="object"||u.length>0)&&(h={insert:u},o.size>0&&(h.attributes={},o.forEach((v,x)=>{v!==null&&(h.attributes[x]=v)}))),u="";break;case"retain":d>0&&(h={retain:d},f2(c)||(h.attributes=u2({},c))),d=0;break}h&&n.push(h),a=null}};for(;i!==null;){switch(i.content.constructor){case jr:case as:this.adds(i)?this.deletes(i)||(f(),a="insert",u=i.content.getContent()[0],f()):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=1):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=1);break;case lr:this.adds(i)?this.deletes(i)||(a!=="insert"&&(f(),a="insert"),u+=i.content.str):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=i.length):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=i.length);break;case vt:{const{key:h,value:v}=i.content;if(this.adds(i)){if(!this.deletes(i)){const x=o.get(h)??null;yr(x,v)?v!==null&&i.delete(r):(a==="retain"&&f(),yr(v,s.get(h)??null)?delete c[h]:c[h]=v)}}else if(this.deletes(i)){s.set(h,v);const x=o.get(h)??null;yr(x,v)||(a==="retain"&&f(),c[h]=x)}else if(!i.deleted){s.set(h,v);const x=c[h];x!==void 0&&(yr(x,v)?x!==null&&i.delete(r):(a==="retain"&&f(),v===null?delete c[h]:c[h]=v))}i.deleted||(a==="insert"&&f(),is(o,i.content));break}}i=i.right}for(f();n.length>0;){const h=n[n.length-1];if(h.retain!==void 0&&h.attributes===void 0)n.pop();else break}}),this._delta=n}return this._delta}}class na extends Tt{constructor(e){super(),this._pending=e!==void 0?[()=>this.insert(0,e)]:[],this._searchMarker=[],this._hasFormatting=!1}get length(){return this.doc??It(),this._length}_integrate(e,n){super._integrate(e,n);try{this._pending.forEach(r=>r())}catch(r){console.error(r)}this._pending=null}_copy(){return new na}clone(){const e=new na;return e.applyDelta(this.toDelta()),e}_callObserver(e,n){super._callObserver(e,n);const r=new d_(this,e,n);ja(this,e,r),!e.local&&this._hasFormatting&&(e._needFormattingCleanup=!0)}toString(){this.doc??It();let e="",n=this._start;for(;n!==null;)!n.deleted&&n.countable&&n.content.constructor===lr&&(e+=n.content.str),n=n.right;return e}toJSON(){return this.toString()}applyDelta(e,{sanitize:n=!0}={}){this.doc!==null?He(this.doc,r=>{const o=new oc(null,this._start,0,new Map);for(let s=0;s<e.length;s++){const i=e[s];if(i.insert!==void 0){const a=!n&&typeof i.insert=="string"&&s===e.length-1&&o.right===null&&i.insert.slice(-1)===`
`?i.insert.slice(0,-1):i.insert;(typeof a!="string"||a.length>0)&&_l(r,this,o,a,i.attributes||{})}else i.retain!==void 0?Tp(r,this,o,i.retain,i.attributes||{}):i.delete!==void 0&&Sp(r,o,i.delete)}}):this._pending.push(()=>this.applyDelta(e))}toDelta(e,n,r){this.doc??It();const o=[],s=new Map,i=this.doc;let a="",c=this._start;function u(){if(a.length>0){const p={};let f=!1;s.forEach((v,x)=>{f=!0,p[x]=v});const h={insert:a};f&&(h.attributes=p),o.push(h),a=""}}const d=()=>{for(;c!==null;){if(To(c,e)||n!==void 0&&To(c,n))switch(c.content.constructor){case lr:{const p=s.get("ychange");e!==void 0&&!To(c,e)?(p===void 0||p.user!==c.id.client||p.type!=="removed")&&(u(),s.set("ychange",r?r("removed",c.id):{type:"removed"})):n!==void 0&&!To(c,n)?(p===void 0||p.user!==c.id.client||p.type!=="added")&&(u(),s.set("ychange",r?r("added",c.id):{type:"added"})):p!==void 0&&(u(),s.delete("ychange")),a+=c.content.str;break}case jr:case as:{u();const p={insert:c.content.getContent()[0]};if(s.size>0){const f={};p.attributes=f,s.forEach((h,v)=>{f[v]=h})}o.push(p);break}case vt:To(c,e)&&(u(),is(s,c.content));break}c=c.right}u()};return e||n?He(i,p=>{e&&nc(p,e),n&&nc(p,n),d()},"cleanup"):d(),o}insert(e,n,r){if(n.length<=0)return;const o=this.doc;o!==null?He(o,s=>{const i=Ii(s,this,e,!r);r||(r={},i.currentAttributes.forEach((a,c)=>{r[c]=a})),_l(s,this,i,n,r)}):this._pending.push(()=>this.insert(e,n,r))}insertEmbed(e,n,r){const o=this.doc;o!==null?He(o,s=>{const i=Ii(s,this,e,!r);_l(s,this,i,n,r||{})}):this._pending.push(()=>this.insertEmbed(e,n,r||{}))}delete(e,n){if(n===0)return;const r=this.doc;r!==null?He(r,o=>{Sp(o,Ii(o,this,e,!0),n)}):this._pending.push(()=>this.delete(e,n))}format(e,n,r){if(n===0)return;const o=this.doc;o!==null?He(o,s=>{const i=Ii(s,this,e,!1);i.right!==null&&Tp(s,this,i,n,r)}):this._pending.push(()=>this.format(e,n,r))}removeAttribute(e){this.doc!==null?He(this.doc,n=>{ta(n,this,e)}):this._pending.push(()=>this.removeAttribute(e))}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{su(r,this,e,n)}):this._pending.push(()=>this.setAttribute(e,n))}getAttribute(e){return iu(this,e)}getAttributes(){return Iw(this)}_write(e){e.writeTypeRef(b_)}}class Cl{constructor(e,n=()=>!0){this._filter=n,this._root=e,this._currentNode=e._start,this._firstCall=!0,e.doc??It()}[Symbol.iterator](){return this}next(){let e=this._currentNode,n=e&&e.content&&e.content.type;if(e!==null&&(!this._firstCall||e.deleted||!this._filter(n)))do if(n=e.content.type,!e.deleted&&(n.constructor===Bs||n.constructor===Ho)&&n._start!==null)e=n._start;else for(;e!==null;){const r=e.next;if(r!==null){e=r;break}else e.parent===this._root?e=null:e=e.parent._item}while(e!==null&&(e.deleted||!this._filter(e.content.type)));return this._firstCall=!1,e===null?{value:void 0,done:!0}:(this._currentNode=e,{value:e.content.type,done:!1})}}class Ho extends Tt{constructor(){super(),this._prelimContent=[]}get firstChild(){const e=this._first;return e?e.content.getContent()[0]:null}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new Ho}clone(){const e=new Ho;return e.insert(0,this.toArray().map(n=>n instanceof Tt?n.clone():n)),e}get length(){return this.doc??It(),this._prelimContent===null?this._length:this._prelimContent.length}createTreeWalker(e){return new Cl(this,e)}querySelector(e){e=e.toUpperCase();const r=new Cl(this,o=>o.nodeName&&o.nodeName.toUpperCase()===e).next();return r.done?null:r.value}querySelectorAll(e){return e=e.toUpperCase(),qo(new Cl(this,n=>n.nodeName&&n.nodeName.toUpperCase()===e))}_callObserver(e,n){ja(this,e,new p_(this,n,e))}toString(){return Dw(this,e=>e.toString()).join("")}toJSON(){return this.toString()}toDOM(e=document,n={},r){const o=e.createDocumentFragment();return r!==void 0&&r._createAssociation(o,this),Fs(this,s=>{o.insertBefore(s.toDOM(e,n,r),null)}),o}insert(e,n){this.doc!==null?He(this.doc,r=>{Ow(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}insertAfter(e,n){if(this.doc!==null)He(this.doc,r=>{const o=e&&e instanceof Tt?e._item:e;ea(r,this,o,n)});else{const r=this._prelimContent,o=e===null?0:r.findIndex(s=>s===e)+1;if(o===0&&e!==null)throw Uo("Reference item not found");r.splice(o,0,...n)}}delete(e,n=1){this.doc!==null?He(this.doc,r=>{jw(r,this,e,n)}):this._prelimContent.splice(e,n)}toArray(){return Aw(this)}push(e){this.insert(this.length,e)}unshift(e){this.insert(0,e)}get(e){return Mw(this,e)}slice(e=0,n=this.length){return Sw(this,e,n)}forEach(e){Fs(this,e)}_write(e){e.writeTypeRef(x_)}}class Bs extends Ho{constructor(e="UNDEFINED"){super(),this.nodeName=e,this._prelimAttrs=new Map}get nextSibling(){const e=this._item?this._item.next:null;return e?e.content.type:null}get prevSibling(){const e=this._item?this._item.prev:null;return e?e.content.type:null}_integrate(e,n){super._integrate(e,n),this._prelimAttrs.forEach((r,o)=>{this.setAttribute(o,r)}),this._prelimAttrs=null}_copy(){return new Bs(this.nodeName)}clone(){const e=new Bs(this.nodeName),n=this.getAttributes();return p2(n,(r,o)=>{typeof r=="string"&&e.setAttribute(o,r)}),e.insert(0,this.toArray().map(r=>r instanceof Tt?r.clone():r)),e}toString(){const e=this.getAttributes(),n=[],r=[];for(const a in e)r.push(a);r.sort();const o=r.length;for(let a=0;a<o;a++){const c=r[a];n.push(c+'="'+e[c]+'"')}const s=this.nodeName.toLocaleLowerCase(),i=n.length>0?" "+n.join(" "):"";return`<${s}${i}>${super.toString()}</${s}>`}removeAttribute(e){this.doc!==null?He(this.doc,n=>{ta(n,this,e)}):this._prelimAttrs.delete(e)}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{su(r,this,e,n)}):this._prelimAttrs.set(e,n)}getAttribute(e){return iu(this,e)}hasAttribute(e){return Lw(this,e)}getAttributes(e){return e?i_(this,e):Iw(this)}toDOM(e=document,n={},r){const o=e.createElement(this.nodeName),s=this.getAttributes();for(const i in s){const a=s[i];typeof a=="string"&&o.setAttribute(i,a)}return Fs(this,i=>{o.appendChild(i.toDOM(e,n,r))}),r!==void 0&&r._createAssociation(o,this),o}_write(e){e.writeTypeRef(v_),e.writeKey(this.nodeName)}}class p_ extends Ra{constructor(e,n,r){super(e,r),this.childListChanged=!1,this.attributesChanged=new Set,n.forEach(o=>{o===null?this.childListChanged=!0:this.attributesChanged.add(o)})}}class Uw{constructor(e,n){this.id=e,this.length=n}get deleted(){throw Wn()}mergeWith(e){return!1}write(e,n,r){throw Wn()}integrate(e,n){throw Wn()}}const f_=0;class br extends Uw{get deleted(){return!0}delete(){}mergeWith(e){return this.constructor!==e.constructor?!1:(this.length+=e.length,!0)}integrate(e,n){n>0&&(this.id.clock+=n,this.length-=n),Cw(e.doc.store,this)}write(e,n){e.writeInfo(f_),e.writeLen(this.length-n)}getMissing(e,n){return null}}class Ia{constructor(e){this.content=e}getLength(){return 1}getContent(){return[this.content]}isCountable(){return!0}copy(){return new Ia(this.content)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeBuf(this.content)}getRef(){return 3}}class ra{constructor(e){this.len=e}getLength(){return this.len}getContent(){return[]}isCountable(){return!1}copy(){return new ra(this.len)}splice(e){const n=new ra(this.len-e);return this.len=e,n}mergeWith(e){return this.len+=e.len,!0}integrate(e,n){xw(e.deleteSet,n.id.client,n.id.clock,this.len),n.markDeleted()}delete(e){}gc(e){}write(e,n){e.writeLen(this.len-n)}getRef(){return 1}}const h_=(t,e)=>new si({guid:t,...e,shouldLoad:e.shouldLoad||e.autoLoad||!1});class La{constructor(e){e._item&&console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."),this.doc=e;const n={};this.opts=n,e.gc||(n.gc=!1),e.autoLoad&&(n.autoLoad=!0),e.meta!==null&&(n.meta=e.meta)}getLength(){return 1}getContent(){return[this.doc]}isCountable(){return!0}copy(){return new La(h_(this.doc.guid,this.opts))}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){this.doc._item=n,e.subdocsAdded.add(this.doc),this.doc.shouldLoad&&e.subdocsLoaded.add(this.doc)}delete(e){e.subdocsAdded.has(this.doc)?e.subdocsAdded.delete(this.doc):e.subdocsRemoved.add(this.doc)}gc(e){}write(e,n){e.writeString(this.doc.guid),e.writeAny(this.opts)}getRef(){return 9}}class as{constructor(e){this.embed=e}getLength(){return 1}getContent(){return[this.embed]}isCountable(){return!0}copy(){return new as(this.embed)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeJSON(this.embed)}getRef(){return 5}}class vt{constructor(e,n){this.key=e,this.value=n}getLength(){return 1}getContent(){return[]}isCountable(){return!1}copy(){return new vt(this.key,this.value)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){const r=n.parent;r._searchMarker=null,r._hasFormatting=!0}delete(e){}gc(e){}write(e,n){e.writeKey(this.key),e.writeJSON(this.value)}getRef(){return 6}}const w_=Zi("node_env")==="development";class zo{constructor(e){this.arr=e,w_&&cw(e)}getLength(){return this.arr.length}getContent(){return this.arr}isCountable(){return!0}copy(){return new zo(this.arr)}splice(e){const n=new zo(this.arr.slice(e));return this.arr=this.arr.slice(0,e),n}mergeWith(e){return this.arr=this.arr.concat(e.arr),!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){const r=this.arr.length;e.writeLen(r-n);for(let o=n;o<r;o++){const s=this.arr[o];e.writeAny(s)}}getRef(){return 8}}class lr{constructor(e){this.str=e}getLength(){return this.str.length}getContent(){return this.str.split("")}isCountable(){return!0}copy(){return new lr(this.str)}splice(e){const n=new lr(this.str.slice(e));this.str=this.str.slice(0,e);const r=this.str.charCodeAt(e-1);return r>=55296&&r<=56319&&(this.str=this.str.slice(0,e-1)+"�",n.str="�"+n.str.slice(1)),n}mergeWith(e){return this.str+=e.str,!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeString(n===0?this.str:this.str.slice(n))}getRef(){return 4}}const g_=0,m_=1,b_=2,v_=3,x_=4;class jr{constructor(e){this.type=e}getLength(){return 1}getContent(){return[this.type]}isCountable(){return!0}copy(){return new jr(this.type._copy())}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){this.type._integrate(e.doc,n)}delete(e){let n=this.type._start;for(;n!==null;)n.deleted?n.id.clock<(e.beforeState.get(n.id.client)||0)&&e._mergeStructs.push(n):n.delete(e),n=n.right;this.type._map.forEach(r=>{r.deleted?r.id.clock<(e.beforeState.get(r.id.client)||0)&&e._mergeStructs.push(r):r.delete(e)}),e.changed.delete(this.type)}gc(e){let n=this.type._start;for(;n!==null;)n.gc(e,!0),n=n.right;this.type._start=null,this.type._map.forEach(r=>{for(;r!==null;)r.gc(e,!0),r=r.left}),this.type._map=new Map}write(e,n){this.type._write(e)}getRef(){return 7}}const Vw=(t,e,n)=>{const{client:r,clock:o}=e.id,s=new Ot(nt(r,o+n),e,nt(r,o+n-1),e.right,e.rightOrigin,e.parent,e.parentSub,e.content.splice(n));return e.deleted&&s.markDeleted(),e.keep&&(s.keep=!0),e.redone!==null&&(s.redone=nt(e.redone.client,e.redone.clock+n)),e.right=s,s.right!==null&&(s.right.left=s),t._mergeStructs.push(s),s.parentSub!==null&&s.right===null&&s.parent._map.set(s.parentSub,s),e.length=n,s};class Ot extends Uw{constructor(e,n,r,o,s,i,a,c){super(e,c.getLength()),this.origin=r,this.left=n,this.right=o,this.rightOrigin=s,this.parent=i,this.parentSub=a,this.redone=null,this.content=c,this.info=this.content.isCountable()?cp:0}set marker(e){(this.info&ml)>0!==e&&(this.info^=ml)}get marker(){return(this.info&ml)>0}get keep(){return(this.info&lp)>0}set keep(e){this.keep!==e&&(this.info^=lp)}get countable(){return(this.info&cp)>0}get deleted(){return(this.info&gl)>0}set deleted(e){this.deleted!==e&&(this.info^=gl)}markDeleted(){this.info|=gl}getMissing(e,n){if(this.origin&&this.origin.client!==this.id.client&&this.origin.clock>=Kt(n,this.origin.client))return this.origin.client;if(this.rightOrigin&&this.rightOrigin.client!==this.id.client&&this.rightOrigin.clock>=Kt(n,this.rightOrigin.client))return this.rightOrigin.client;if(this.parent&&this.parent.constructor===qi&&this.id.client!==this.parent.client&&this.parent.clock>=Kt(n,this.parent.client))return this.parent.client;if(this.origin&&(this.left=_p(e,n,this.origin),this.origin=this.left.lastId),this.rightOrigin&&(this.right=Tr(e,this.rightOrigin),this.rightOrigin=this.right.id),this.left&&this.left.constructor===br||this.right&&this.right.constructor===br)this.parent=null;else if(!this.parent)this.left&&this.left.constructor===Ot?(this.parent=this.left.parent,this.parentSub=this.left.parentSub):this.right&&this.right.constructor===Ot&&(this.parent=this.right.parent,this.parentSub=this.right.parentSub);else if(this.parent.constructor===qi){const r=yl(n,this.parent);r.constructor===br?this.parent=null:this.parent=r.content.type}return null}integrate(e,n){if(n>0&&(this.id.clock+=n,this.left=_p(e,e.doc.store,nt(this.id.client,this.id.clock-1)),this.origin=this.left.lastId,this.content=this.content.splice(n),this.length-=n),this.parent){if(!this.left&&(!this.right||this.right.left!==null)||this.left&&this.left.right!==this.right){let r=this.left,o;if(r!==null)o=r.right;else if(this.parentSub!==null)for(o=this.parent._map.get(this.parentSub)||null;o!==null&&o.left!==null;)o=o.left;else o=this.parent._start;const s=new Set,i=new Set;for(;o!==null&&o!==this.right;){if(i.add(o),s.add(o),Oi(this.origin,o.origin)){if(o.id.client<this.id.client)r=o,s.clear();else if(Oi(this.rightOrigin,o.rightOrigin))break}else if(o.origin!==null&&i.has(yl(e.doc.store,o.origin)))s.has(yl(e.doc.store,o.origin))||(r=o,s.clear());else break;o=o.right}this.left=r}if(this.left!==null){const r=this.left.right;this.right=r,this.left.right=this}else{let r;if(this.parentSub!==null)for(r=this.parent._map.get(this.parentSub)||null;r!==null&&r.left!==null;)r=r.left;else r=this.parent._start,this.parent._start=this;this.right=r}this.right!==null?this.right.left=this:this.parentSub!==null&&(this.parent._map.set(this.parentSub,this),this.left!==null&&this.left.delete(e)),this.parentSub===null&&this.countable&&!this.deleted&&(this.parent._length+=this.length),Cw(e.doc.store,this),this.content.integrate(e,this),Ep(e,this.parent,this.parentSub),(this.parent._item!==null&&this.parent._item.deleted||this.parentSub!==null&&this.right!==null)&&this.delete(e)}else new br(this.id,this.length).integrate(e,0)}get next(){let e=this.right;for(;e!==null&&e.deleted;)e=e.right;return e}get prev(){let e=this.left;for(;e!==null&&e.deleted;)e=e.left;return e}get lastId(){return this.length===1?this.id:nt(this.id.client,this.id.clock+this.length-1)}mergeWith(e){if(this.constructor===e.constructor&&Oi(e.origin,this.lastId)&&this.right===e&&Oi(this.rightOrigin,e.rightOrigin)&&this.id.client===e.id.client&&this.id.clock+this.length===e.id.clock&&this.deleted===e.deleted&&this.redone===null&&e.redone===null&&this.content.constructor===e.content.constructor&&this.content.mergeWith(e.content)){const n=this.parent._searchMarker;return n&&n.forEach(r=>{r.p===e&&(r.p=this,!this.deleted&&this.countable&&(r.index-=this.length))}),e.keep&&(this.keep=!0),this.right=e.right,this.right!==null&&(this.right.left=this),this.length+=e.length,!0}return!1}delete(e){if(!this.deleted){const n=this.parent;this.countable&&this.parentSub===null&&(n._length-=this.length),this.markDeleted(),xw(e.deleteSet,this.id.client,this.id.clock,this.length),Ep(e,n,this.parentSub),this.content.delete(e)}}gc(e,n){if(!this.deleted)throw ro();this.content.gc(e),n?J2(e,this,new br(this.id,this.length)):this.content=new ra(this.length)}write(e,n){const r=n>0?nt(this.id.client,this.id.clock+n-1):this.origin,o=this.rightOrigin,s=this.parentSub,i=this.content.getRef()&$y|(r===null?0:Qi)|(o===null?0:iw)|(s===null?0:Py);if(e.writeInfo(i),r!==null&&e.writeLeftID(r),o!==null&&e.writeRightID(o),r===null&&o===null){const a=this.parent;if(a._item!==void 0){const c=a._item;if(c===null){const u=K2(a);e.writeParentInfo(!0),e.writeString(u)}else e.writeParentInfo(!1),e.writeLeftID(c.id)}else a.constructor===String?(e.writeParentInfo(!0),e.writeString(a)):a.constructor===qi?(e.writeParentInfo(!1),e.writeLeftID(a)):ro();s!==null&&e.writeString(s)}this.content.write(e,n)}}const Hw=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:{},zw="__ $YJS$ __";Hw[zw]===!0&&console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");Hw[zw]=!0;m.createCommand("CONNECTED_COMMAND");const y_=m.createCommand("TOGGLE_CONNECT_COMMAND");var __=Object.defineProperty,C_=(t,e,n)=>e in t?__(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>C_(t,typeof e!="symbol"?e+"":e,n);const El=t=>m.$applyNodeReplacement(m.$parseSerializedNode(t)),oo=m.createState("cid",{parse:t=>typeof t=="string"?t:void 0}),so=m.createState("segment",{parse:t=>typeof t=="string"?t:void 0}),sc="unknown",Gw=1;class bo extends m.ElementNode{constructor(e="",n,r,o){super(o),de(this,"__tag"),de(this,"__marker"),de(this,"__unknownAttributes"),this.__tag=e,this.__marker=n,this.__unknownAttributes=r}static getType(){return"unknown"}static clone(e){const{__tag:n,__marker:r,__unknownAttributes:o,__key:s}=e;return new bo(n,r,o,s)}static importDOM(){return{[sc]:e=>k_(e)?{conversion:E_,priority:1}:null}}static importJSON(e){return Kw().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTag(e.tag).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setTag(e){if(this.__tag===e)return this;const n=this.getWritable();return n.__tag=e,n}getTag(){return this.getLatest().__tag}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(sc);return e.style.display="none",e}updateDOM(){return!1}exportDOM(){return{element:null}}exportJSON(){return{...super.exportJSON(),type:this.getType(),tag:this.getTag(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:Gw}}canBeEmpty(){return!0}isInline(){return!0}extractWithChild(){return!1}excludeFromCopy(e){return e!=="clone"}}function E_(t){const e=t.getAttribute("data-tag")??"",n=t.getAttribute("data-marker")??"";return{node:Kw(e,n)}}function Kw(t,e,n){return m.$applyNodeReplacement(new bo(t,e,n))}function k_(t){return(t==null?void 0:t.tagName)===sc}function ii(t){return t instanceof bo}const qs="id",Yw=1;class gn extends m.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker",qs),de(this,"__code"),de(this,"__unknownAttributes"),this.__code=e,this.__unknownAttributes=n}static getType(){return"book"}static clone(e){const{__code:n,__unknownAttributes:r,__key:o}=e;return new gn(n,r,o)}static importJSON(e){const{code:n}=e;return Ww(n).updateFromJSON(e)}static isValidBookCode(e){return uv(e)}updateFromJSON(e){return super.updateFromJSON(e).setCode(e.code).setUnknownAttributes(e.unknownAttributes)}getMarker(){return this.getLatest().__marker}setCode(e){if(this.__code===e)return this;const n=this.getWritable();return n.__code=e,n}getCode(){return this.getLatest().__code}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e.setAttribute("data-code",this.__code),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),code:this.getCode(),unknownAttributes:this.getUnknownAttributes(),version:Yw}}}function Ww(t,e){return m.$applyNodeReplacement(new gn(t,e))}function Jn(t){return t instanceof gn}function N_(t){return(t==null?void 0:t.type)===gn.getType()}const qe=" ",ic="​",au=`${qe}|`,Pa="p",io="+",lu="-",oa="chapter",ac="verse",Ap="invalid",T_="text-spacing",S_="formatted-font",A_="marker-",cu="external-usj-mutation",Jw="selection-change",lc="cursor-change",cc="annotation-change",uc="delta-change",D_=[cu,Jw,lc,cc,uc],sa="c",Xw=1;class jn extends m.ElementNode{constructor(e="",n,r,o,s,i){super(i),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=sa,this.__number=e,this.__sid=n,this.__altnumber=r,this.__pubnumber=o,this.__unknownAttributes=s}static getType(){return"chapter"}static clone(e){const{__number:n,__sid:r,__altnumber:o,__pubnumber:s,__unknownAttributes:i,__key:a}=e;return new jn(n,r,o,s,i,a)}static importJSON(e){return Qw().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(oa,`usfm_${this.__marker}`),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:Xw}}}function Qw(t,e,n,r,o){return m.$applyNodeReplacement(new jn(t,e,n,r,o))}function uu(t){return t instanceof jn}function M_(t){return(t==null?void 0:t.type)===jn.getType()}const Zw=["fr","fq","fqa","fk","ft","fl","fw","fp","fv","fdc","fm"],eg=["xo","xop","xk","xq","xt","xta","xot","xnt","xdc"],R_=["ca","cp","va","vp","add","bk","dc","em","jmp","k","nd","ord","pn","png","qt","rb","rq","sig","sls","tl","w","wa","wg","wh","wj","bd","it","bdit","no","sc","sup","ior","iqt","qac","qs","litl","lik","liv","liv1","liv2","liv3","liv4","liv5",...Zw,...eg],tg=1;class Qe extends m.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"char"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Qe(n,r,o)}static isValidMarker(e){return e!==void 0&&R_.includes(e)}static isValidFootnoteMarker(e){return e!==void 0&&Zw.includes(e)}static isValidCrossReferenceMarker(e){return e!==void 0&&eg.includes(e)}static importDOM(){return{span:e=>j_(e)?{conversion:O_,priority:1}:null}}static importJSON(e){return Hn().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.setAttribute("title",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:tg}}insertNewAfter(e,n){const r=Hn(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}canBeEmpty(){return!1}isInline(){return!0}}function O_(t){const e=t.getAttribute("data-marker")??"f";return{node:Hn(e)}}function Hn(t,e){return m.$applyNodeReplacement(new Qe(t,e))}function j_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return Qe.isValidMarker(e)&&t.classList.contains(Qe.getType())}function Ue(t){return t instanceof Qe}function I_(t){return(t==null?void 0:t.type)===Qe.getType()}const ng=1,L_="c",rg="span";class pr extends m.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=L_,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-chapter"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new pr(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>og(e)?{conversion:P_,priority:1}:null}}static importJSON(e){return du().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(rg);return e.setAttribute("data-marker",this.__marker),e.classList.add(oa,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(oa,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return this.getShowMarker()?li(this.getMarker(),this.getNumber()):this.getNumber()}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:ng}}isInline(){return!1}isKeyboardSelectable(){return!1}}function P_(t){const e=t.getAttribute("data-number")??"0";return{node:du(e)}}function du(t,e,n,r,o,s){return m.$applyNodeReplacement(new pr(t,e,n,r,o,s))}function og(t){return t?t.classList.contains(oa)&&t.tagName.toLowerCase()===rg:!1}function ai(t){return t instanceof pr}function $_(t){return(t==null?void 0:t.type)===pr.getType()}const sg=1;class Sr extends m.ParagraphNode{static getType(){return"implied-para"}static clone(e){return new Sr(e.__key)}static importJSON(e){return Nn().updateFromJSON(e)}getMarker(){return Pa}exportJSON(){return{...super.exportJSON(),type:this.getType(),version:sg}}insertNewAfter(e,n){const r=Nn();return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function Nn(){return m.$applyNodeReplacement(new Sr)}function cr(t){return t instanceof Sr}function pu(t){return(t==null?void 0:t.type)===Sr.getType()}const ao="zmsc-s",jo="zmsc-e",F_=[ao,jo],B_=["ts-s","ts-e","t-s","t-e","ts","qt1-s","qt1-e","qt2-s","qt2-e","qt3-s","qt3-e","qt4-s","qt4-e","qt5-s","qt5-e","qt-s","qt-e",ao,jo],ig=1;class Qn extends m.DecoratorNode{constructor(e="",n,r,o,s){super(s),de(this,"__marker"),de(this,"__sid"),de(this,"__eid"),de(this,"__unknownAttributes"),this.__marker=e,this.__sid=n,this.__eid=r,this.__unknownAttributes=o}static getType(){return"ms"}static clone(e){const{__marker:n,__sid:r,__eid:o,__unknownAttributes:s,__key:i}=e;return new Qn(n,r,o,s,i)}static importJSON(e){return ag().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&(B_.includes(e)||e.startsWith("z"))}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setSid(e.sid).setEid(e.eid).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setEid(e){if(this.__eid===e)return this;const n=this.getWritable();return n.__eid=e,n}getEid(){return this.getLatest().__eid}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}decorate(){return""}exportJSON(){return{type:this.getType(),marker:this.getMarker(),sid:this.getSid(),eid:this.getEid(),unknownAttributes:this.getUnknownAttributes(),version:ig}}isKeyboardSelectable(){return!1}}function q_(t){return F_.includes(t)}function ag(t,e,n,r){return m.$applyNodeReplacement(new Qn(t,e,n,r))}function $a(t){return t instanceof Qn}const fu="f",U_=[fu,"fe","ef","efe","x","ex"],lg=1;class xt extends m.ElementNode{constructor(e=fu,n,r=!0,o,s,i){super(i),de(this,"__marker"),de(this,"__caller"),de(this,"__isCollapsed"),de(this,"__category"),de(this,"__unknownAttributes"),this.__marker=e,this.__caller=n??(e==="x"||e==="ex"?lu:io),this.__isCollapsed=r,this.__category=o,this.__unknownAttributes=s}static getType(){return"note"}static clone(e){const{__marker:n,__caller:r,__isCollapsed:o,__category:s,__unknownAttributes:i,__key:a}=e;return new xt(n,r,o,s,i,a)}static importDOM(){return{span:e=>H_(e)?{conversion:V_,priority:1}:null}}static importJSON(e){return hu().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&U_.includes(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setCaller(e.caller).setIsCollapsed(e.isCollapsed).setCategory(e.category).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setIsCollapsed(e){if(this.__isCollapsed===e)return this;const n=this.getWritable();return n.__isCollapsed=e,n}toggleIsCollapsed(){const e=this.getWritable();return e.__isCollapsed=!e.__isCollapsed,e}getIsCollapsed(){return this.getLatest().__isCollapsed}setCategory(e){if(this.__category===e)return this;const n=this.getWritable();return n.__category=e,n}getCategory(){return this.getLatest().__category}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`,this.__isCollapsed?"collapsed":"expanded"),e.setAttribute("data-caller",this.__caller),e}updateDOM(e){return e.__isCollapsed!==this.__isCollapsed}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`,this.getIsCollapsed()?"collapsed":"expanded"),n.setAttribute("data-caller",this.getCaller())),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),caller:this.getCaller(),isCollapsed:this.getIsCollapsed(),category:this.getCategory(),unknownAttributes:this.getUnknownAttributes(),version:lg}}canBeEmpty(){return!1}isInline(){return!0}}function V_(t){const e=t.getAttribute("data-marker")??"f",n=t.getAttribute("data-caller")??"",r=t.classList.contains("collapsed");return{node:hu(e,n,r)}}function hu(t,e,n,r,o){return m.$applyNodeReplacement(new xt(t,e,n,r,o))}function H_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return xt.isValidMarker(e)&&t.classList.contains(xt.getType())}function Se(t){return t instanceof xt}const z_=["ide","sts","rem","h","toc1","toc2","toc3","toca1","toca2","toca3","imt","imt1","imt2","imt3","imt4","is","is1","is2","ip","ipi","im","imi","ipq","imq","ipr","iq","iq1","iq2","iq3","ili","ili1","ili2","ib","iot","io","io1","io2","io3","io4","iex","imte","imte1","imte2","ie","mt","mt1","mt2","mt3","mt4","mte","mte1","mte2","cl","cd","ms","ms1","ms2","ms3","mr","s","s1","s2","s3","s4","sr","r","d","sp","sd","sd1","sd2","sd3","sd4",Pa,"m","po","cls","pr","pc","pm","pmo","pmc","pmr","pi","pi1","pi2","pi3","mi","lit","nb","q","q1","q2","q3","q4","qr","qc","qa","qm","qm1","qm2","qm3","qd","b","lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4","pb"],cg=1;class Yt extends m.ParagraphNode{constructor(e=Pa,n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"para"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Yt(n,r,o)}static isValidMarker(e){return e!==void 0&&z_.includes(e)}static importDOM(){return{p:()=>({conversion:G_,priority:1})}}static importJSON(e){return Us().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:cg}}insertNewAfter(e,n){const r=Us(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function G_(t){const e=t.getAttribute("data-marker")??void 0,n=Us(e);if(t.style){n.setFormat(t.style.textAlign);const r=parseInt(t.style.textIndent,10)/20;r>0&&n.setIndent(r)}return{node:n}}function Us(t,e){return m.$applyNodeReplacement(new Yt(t,e))}function jt(t){return t instanceof Yt}function K_(t){return(t==null?void 0:t.type)===Yt.getType()}const ia="v",ug=1;class Bt extends m.TextNode{constructor(e="",n,r,o,s,i,a){super(n??e,a),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=ia,this.__number=e,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"verse"}static clone(e){const{__number:n,__text:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new Bt(n,r,o,s,i,a,c)}static importJSON(e){return dg().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(ac,`usfm_${this.__marker}`),n.setAttribute("data-number",this.__number),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:ug}}}function dg(t,e,n,r,o,s){return m.$applyNodeReplacement(new Bt(t,e,n,r,o,s))}function wu(t){return t instanceof Bt}function Y_(t){return(t==null?void 0:t.type)===Bt.getType()}function W_(t){return M_(t)||$_(t)}function hn(t){return uu(t)||ai(t)}function J_(t,e){return t.find(n=>hn(n)&&n.getNumber()===e.toString())}function X_(t,e=!1){return t.find((n,r)=>(!e||r>0)&&hn(n))}function gu(t){var e;if(!t)return;if(hn(t))return t;let n=(e=t.getTopLevelElement())==null?void 0:e.getPreviousSibling();for(;n&&!hn(n);)n=n.getPreviousSibling();if(n&&hn(n))return n}function pg(t){let e=t;for(;e!==null;){if(Se(e))return e;e=e.getParent()}}function Q_(t){return Jn(t)||uu(t)||Ue(t)||ai(t)||cr(t)||$a(t)||jt(t)||Se(t)||wu(t)||ii(t)}function Z_(t){var e;if(t.anchor.type==="element"){const r=t.anchor.getNode(),o=t.anchor.offset;if(o<r.getChildrenSize())return r.getChildAtIndex(o)}const n=t.anchor.getNode();return n.getNextSibling()??((e=n.getParent())==null?void 0:e.getNextSibling())??null}function e1(t){var e;const n=t.anchor.offset;if(t.anchor.type==="element"&&n>0)return t.anchor.getNode().getChildAtIndex(n-1);const r=t.anchor.getNode();return r.getPreviousSibling()??((e=r.getParent())==null?void 0:e.getPreviousSibling())??null}function kn(t){return jt(t)||cr(t)}function t1(t,e){let n=t.getParent();for(;n;){if(n.getKey()===e)return!0;n=n.getParent()}return!1}function lo(t,e){const n=m.$getState(e,oo),r=!!(t.cid&&n),o=!t.cid&&!n;return t.style===e.getMarker()&&(o||r&&t.cid===n)}function n1(t,e){const n=m.$isElementNode(t)?t:t.getParent(),r=m.$isElementNode(e)?e:e.getParent(),o=n&&r?m.$getCommonAncestor(n,r):void 0;return o?o.commonAncestor:void 0}function r1(t){const e=t.getStartEndPoints();if(!e)return;const[n,r]=e,o=t.isBackward()?n:r;t.focus.set(o.key,o.offset,o.type),t.anchor.set(o.key,o.offset,o.type)}function mu(t){return(t==null?void 0:t.type)===m.TextNode.getType()}function o1(t,e){if(!e)return;const n=t.findIndex(r=>r===e);n&&(t.length=n)}function s1(t,e){if(!e)return t;const n=e.getIndexWithinParent();return t.splice(n+1,t.length-n-1)}function fr(t){return`\\${t}`}function Go(t){return`\\${t}*`}function fg(t,e,n){const r=fr(t);if(e!=null&&e.startsWith(r)){const o=parseInt(e.slice(r.length),10);isNaN(o)||(n=o.toString())}return n}function li(t,e){let n=fr(t);return e&&(n+=`${qe}${e}`),n+=" ",n}function hg(t){return mu(t)?t.text:I_(t)?t.children.map(e=>hg(e)).join(""):""}function i1(t){return t.map(e=>hg(e)).join(" ").trim()}function bu(t){return qe+t+" "}function vu(t){return t.reduce((e,n)=>e+(Ue(n)?` ${n.getTextContent()}`:""),"").trim()}function yt(t,e=cv){const n={...t};return e.forEach(r=>{Reflect.deleteProperty(n,r)}),Object.keys(n).length===0?void 0:n}function a1(t,e){const n=e.getElementByKey(t.getKey());return n?n.tagName.toLowerCase():void 0}function wt(t){return Object.fromEntries(Object.entries(t).filter(([,e])=>e!==void 0))}function wg(t){if(!t)return;const e=t.getNodes();if(e.length>0)return t.isBackward()?e[e.length-1]:e[0]}function dc(t,e){if(!e)return(t+1).toString();const n=e.split("-");if(n.length===2)return parseInt(n[1])?`${parseInt(n[1])+1}`:`${parseInt(n[0])+1}`;const r=RegExp(/^(\d+)([a-yA-Y]{1,3})$/).exec(e);if(!r)return(parseInt(e)+1).toString();const o=String.fromCharCode(r[2].charCodeAt(0)+1);return`${r[1]}${o}`}function xu(t,e){if(!e)return!1;const n=e.split("-").map(r=>parseInt(r));if(n.length<1||n.length>2||n[0]>n[1])throw new Error("isVerseInRange: invalid range");return n.length===1?t===n[0]:n.length===2&&isNaN(n[1])?t>=n[0]:(n.length===2&&isNaN(n[0])||t>=n[0])&&t<=n[1]}function l1(t){return!!t&&t.includes("-")}const c1=1;class vo extends m.TextNode{constructor(e="",n="opening",r){super(kl(e,n),r),de(this,"__marker"),de(this,"__markerSyntax"),this.__marker=e,this.__markerSyntax=n}static getType(){return"marker"}static clone(e){return new vo(e.__marker,e.__markerSyntax,e.__key)}static importJSON(e){return Ko().updateFromJSON(e)}updateFromJSON(e){const{marker:n,markerSyntax:r="opening"}=e;return super.updateFromJSON(e).setMarker(n).setMarkerSyntax(r)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n.__text=kl(e,n.__markerSyntax),n}getMarker(){return this.getLatest().__marker}setMarkerSyntax(e){if(this.__markerSyntax===e)return this;const n=this.getWritable();return n.__markerSyntax=e,n.__text=kl(n.__marker,e),n}getMarkerSyntax(){return this.getLatest().__markerSyntax}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(this.__markerSyntax),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),text:this.getTextContent(),marker:this.getMarker(),markerSyntax:this.getMarkerSyntax(),version:c1}}}function Ko(t,e){return m.$applyNodeReplacement(new vo(t,e))}function ci(t){return t instanceof vo}function kl(t,e){return e==="closing"?Go(t):e==="selfClosing"?Go(""):fr(t)}const _r="internal-comment",u1=[_r],d1={},p1=1;class Nt extends m.ElementNode{constructor(e=d1,n){super(n),de(this,"__typedIDs"),this.__typedIDs=e}static getType(){return"typed-mark"}static clone(e){const n=JSON.parse(JSON.stringify(e.__typedIDs));return new Nt(n,e.__key)}static isReservedType(e){return u1.includes(e)}static importDOM(){return null}static importJSON(e){return Vs().updateFromJSON(e)}exportJSON(){return{...super.exportJSON(),type:this.getType(),typedIDs:this.getTypedIDs(),version:p1}}createDOM(e){const n=document.createElement("mark");for(const[r,o]of Object.entries(this.__typedIDs))vr(n,Li(e.theme.typedMark,r)),o.length>1&&vr(n,Li(e.theme.typedMarkOverlap,r));return n}updateDOM(e,n,r){for(const[o,s]of Object.entries(this.__typedIDs)){const i=e.__typedIDs[o].length,a=s.length,c=Li(r.theme.typedMark,o),u=Li(r.theme.typedMarkOverlap,o);i!==a&&(i===0?a===1&&vr(n,c):a===0&&Ul(n,c),i===1?a===2&&vr(n,u):a===1&&Ul(n,u))}return!1}updateFromJSON(e){return super.updateFromJSON(e).setTypedIDs(e.typedIDs)}hasID(e,n){const r=this.getTypedIDs()[e];if(!r)return!1;for(const o of r)if(n===o)return!0;return!1}getTypedIDs(){const e=this.getLatest();return St(e)?e.__typedIDs:{}}setTypedIDs(e){const n=this.getWritable();return n.__typedIDs=e,n}addID(e,n){const r=this.getWritable();if(!St(r))return;const o=r.__typedIDs[e]??[];r.__typedIDs[e]=o;for(const s of o)if(n===s)return;o.push(n)}deleteID(e,n){const r=this.getWritable();if(!St(r))return;const o=r.__typedIDs[e];for(let s=0;s<o.length;s++)if(n===o[s]){o.splice(s,1);return}}hasNoIDsForEveryType(){return Object.values(this.getTypedIDs()).every(e=>e===void 0||e.length===0)}insertNewAfter(e,n=!0){const r=Vs(this.__typedIDs);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!m.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}}function Li(t,e){return`${t}-${e}`}function Vs(t){return m.$applyNodeReplacement(new Nt(t))}function St(t){return t instanceof Nt}function f1(t){return(t==null?void 0:t.type)===Nt.getType()}function gg(t){const e=t.getChildren();let n=null;for(const r of e)n===null?t.insertBefore(r):n.insertAfter(r),n=r;t.remove()}function mg(t,e,n,r){const o=t.getNodes(),s=t.anchor.offset,i=t.focus.offset,a=o.length,c=t.isBackward(),u=c?i:s,d=c?s:i;let p,f;for(let h=0;h<a;h++){const v=o[h];if(m.$isElementNode(f)&&f.isParentOf(v))continue;const x=h===0,N=h===a-1;let C=null;if(m.$isTextNode(v)){const _=v.getTextContentSize(),D=x?u:0,L=N?d:_;if(D===0&&L===0)continue;const V=v.splitText(D,L);C=V.length>1&&(V.length===3||x&&!N||L===_)?V[1]:V[0]}else{if(St(v))continue;m.$isElementNode(v)&&v.isInline()&&(C=v)}if(C!==null){if(C&&C.is(p))continue;const _=C.getParent();(_==null||!_.is(p))&&(f=void 0),p=_,f===void 0&&(f=Vs({[e]:[n]}),C.insertBefore(f)),f.append(C)}else p=void 0,f=void 0}e===_r&&m.$isElementNode(f)&&(c?f.selectStart():f.selectEnd())}function h1(t,e,n){let r=t;for(;r!==null;){if(St(r))return r.getTypedIDs()[e];if(m.$isTextNode(r)&&n===r.getTextContentSize()){const o=r.getNextSibling();if(St(o))return o.getTypedIDs()[e]}r=r.getParent()}}function Dp(t){return`external-${t}`}const bg=1;class Ir extends m.DecoratorNode{constructor(e="",n="",r){super(r),de(this,"__textType"),de(this,"__text"),this.__textType=e,this.__text=n}static getType(){return"immutable-typed-text"}static clone(e){const{__textType:n,__text:r,__key:o}=e;return new Ir(n,r,o)}static importDOM(){return{span:e=>g1(e)?{conversion:w1,priority:1}:null}}static importJSON(e){return Yo().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTextType(e.textType).setTextContent(e.text)}setTextType(e){if(this.__textType===e)return this;const n=this.getWritable();return n.__textType=e,n}getTextType(){return this.getLatest().__textType}setTextContent(e){if(this.__text===e)return this;const n=this.getWritable();return n.__text=e,n}getTextContent(){return this.getLatest().__text}createDOM(){const e=document.createElement("span");return e.setAttribute("data-text-type",this.__textType),e.classList.add(this.__textType),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&n.setAttribute("data-text-type",this.getTextType()),{element:n}}decorate(){return this.getTextContent()}exportJSON(){return{type:this.getType(),textType:this.getTextType(),text:this.getTextContent(),version:bg}}isKeyboardSelectable(){return!1}}function w1(t){const e=t.getAttribute("data-text-type")??"",n=t.textContent??"";return{node:Yo(e,n)}}function Yo(t,e){return m.$applyNodeReplacement(new Ir(t,e))}function g1(t){return(t==null?void 0:t.tagName)==="span"}function aa(t){return t instanceof Ir}function m1(t){return(t==null?void 0:t.type)===Ir.getType()}const la="unmatched",vg=1;class Lr extends m.DecoratorNode{constructor(e="",n){super(n),de(this,"__marker"),this.__marker=e}static getType(){return"unmatched"}static clone(e){const{__marker:n,__key:r}=e;return new Lr(n,r)}static importDOM(){return{[la]:e=>v1(e)?{conversion:b1,priority:1}:null}}static importJSON(e){return yu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}createDOM(){const e=document.createElement(la);e.setAttribute("data-marker",this.__marker),e.classList.add(Ap);const n=this.__marker.endsWith("*");return e.title=n?"This closing marker has no matching opening marker!":"This opening marker has no matching closing marker!",e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(Ap)),{element:n}}decorate(){return`\\${this.getMarker()}${ic}`}exportJSON(){return{type:this.getType(),marker:this.getMarker(),version:vg}}isKeyboardSelectable(){return!1}}function b1(t){const e=t.getAttribute("data-marker")??"";return{node:yu(e)}}function yu(t){return m.$applyNodeReplacement(new Lr(t))}function v1(t){return(t==null?void 0:t.tagName)===la}function xg(t){return t instanceof Lr}const x1=[gn,pr,jn,Bt,Qe,xt,Qn,vo,bo,Ir,Lr,Yt,Sr,{replace:m.ParagraphNode,with:()=>Nn(),withKlass:Sr}];var q;(function(t){t.FileIdentification="FileIdentification",t.Headers="Headers",t.Remarks="Remarks",t.Introduction="Introduction",t.DivisionMarks="DivisionMarks",t.Paragraphs="Paragraphs",t.Poetry="Poetry",t.TitlesHeadings="TitlesHeadings",t.Tables="Tables",t.CenterTables="CenterTables",t.RightTables="RightTables",t.Lists="Lists",t.Footnotes="Footnotes",t.CrossReferences="CrossReferences",t.SpecialText="SpecialText",t.CharacterStyling="CharacterStyling",t.Breaks="Breaks",t.SpecialFeatures="SpecialFeatures",t.PeripheralReferences="PeripheralReferences",t.PeripheralMaterials="PeripheralMaterials",t.Uncategorized="Uncategorized"})(q||(q={}));var B;(function(t){t.Paragraph="Paragraph",t.Character="Character",t.Note="Note",t.Unknown="Unknown"})(B||(B={}));const y1={id:{category:q.FileIdentification,type:B.Paragraph,description:"File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)",hasEndMarker:!1,children:{FileIdentification:["usfm","ide"],Headers:["h","h1","h2","h3","toc1","toc2","toc3"],Remarks:["rem","sts","restore"],Introduction:["imt","imt1","imt2","imt3","imt4","imte","imte1","imte2","is","is1","is2","iot","io","io1","io2","io3","io4","ior","ip","im","ipi","imi","ili","ili1","ili2","ipq","imq","ipr","ib","iq","iq1","iq2","iq3","iex","ie"],DivisionMarks:["c","cl"],TitlesHeadings:["mt","mt1","mt2","mt3","mt4"]}},usfm:{category:q.FileIdentification,type:B.Paragraph,description:"File markup version information",hasEndMarker:!1,children:void 0},ide:{category:q.FileIdentification,type:B.Paragraph,description:"File encoding information",hasEndMarker:!1,children:{Remarks:["rem","sts"]}},h:{category:q.Headers,type:B.Paragraph,description:"Running header text for a book (basic)",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h1:{category:q.Headers,type:B.Paragraph,description:"Running header text",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h2:{category:q.Headers,type:B.Paragraph,description:"Running header text, left side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h3:{category:q.Headers,type:B.Paragraph,description:"Running header text, right side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},toc1:{category:q.Headers,type:B.Paragraph,description:"Long table of contents text",hasEndMarker:!1,children:void 0},toc2:{category:q.Headers,type:B.Paragraph,description:"Short table of contents text",hasEndMarker:!1,children:void 0},toc3:{category:q.Headers,type:B.Paragraph,description:"Book Abbreviation",hasEndMarker:!1,children:void 0},toca1:{category:q.Headers,type:B.Paragraph,description:"Alternative language long table of contents text",hasEndMarker:!1,children:void 0},toca2:{category:q.Headers,type:B.Paragraph,description:"Alternative language short table of contents text",hasEndMarker:!1,children:void 0},toca3:{category:q.Headers,type:B.Paragraph,description:"Alternative language book Abbreviation",hasEndMarker:!1,children:void 0},rem:{category:q.Remarks,type:B.Paragraph,description:"Comments and remarks",hasEndMarker:!1,children:void 0},sts:{category:q.Remarks,type:B.Paragraph,description:"Status of this file",hasEndMarker:!1,children:void 0},restore:{category:q.Remarks,type:B.Paragraph,description:"Project restore information",hasEndMarker:!1,children:void 0},imt:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt1:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt2:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt3:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt4:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title, level 4 (usually within parenthesis)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title at introduction end, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte1:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title at introduction end, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte2:{category:q.Introduction,type:B.Paragraph,description:"Introduction major title at introduction end, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is:{category:q.Introduction,type:B.Paragraph,description:"Introduction section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"],CharacterStyling:["no"]}},is1:{category:q.Introduction,type:B.Paragraph,description:"Introduction section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is2:{category:q.Introduction,type:B.Paragraph,description:"Introduction section heading, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},iot:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline title (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},io:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},io1:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline text, level 1 (if multiple levels) (basic)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io2:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline text, level 2",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io3:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline text, level 3",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io4:{category:q.Introduction,type:B.Paragraph,description:"Introduction outline text, level 4",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ior:{category:q.Introduction,type:B.Character,description:"Introduction references range for outline entry; for marking references separately",hasEndMarker:!0,children:void 0},ip:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],Footnotes:["f","fe","fm"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},im:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph, with no first line indent (may occur after poetry)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipi:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph, indented, with first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imi:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph text, indented, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili:{category:q.Introduction,type:B.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili1:{category:q.Introduction,type:B.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili2:{category:q.Introduction,type:B.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipq:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph, quote from the body text",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imq:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph, quote from the body text, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipr:{category:q.Introduction,type:B.Paragraph,description:"Introduction prose paragraph, right aligned",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ib:{category:q.Introduction,type:B.Paragraph,description:"Introduction blank line",hasEndMarker:!1,children:{Introduction:["iqt"]}},iq:{category:q.Introduction,type:B.Paragraph,description:"Introduction poetry text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},iq1:{category:q.Introduction,type:B.Paragraph,description:"Introduction poetry text, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq2:{category:q.Introduction,type:B.Paragraph,description:"Introduction poetry text, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq3:{category:q.Introduction,type:B.Paragraph,description:"Introduction poetry text, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iex:{category:q.Introduction,type:B.Paragraph,description:"Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},iqt:{category:q.Introduction,type:B.Character,description:"For quoted scripture text appearing in the introduction",hasEndMarker:!0,children:void 0},ie:{category:q.Introduction,type:B.Paragraph,description:"Introduction ending marker",hasEndMarker:!1,children:void 0},c:{category:q.DivisionMarks,type:B.Paragraph,description:"Chapter number",hasEndMarker:!1,children:{DivisionMarks:["ca","cp","cl","cd"],Paragraphs:["p","m","po","pr","cls","pi","pi1","pi2","pi3","pc","mi","nb"],Poetry:["q","q1","q2","q3","q4","qc","qr","qa","qd","b"],TitlesHeadings:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],Lists:["lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4"],Footnotes:["f","fe"],SpecialText:["lit"],Breaks:["pb"]}},ca:{category:q.DivisionMarks,type:B.Character,description:"Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)",hasEndMarker:!0,children:void 0},cp:{category:q.DivisionMarks,type:B.Paragraph,description:"Published chapter number (chapter string that should appear in the published text)",hasEndMarker:!1,children:{Footnotes:["f"]}},cl:{category:q.DivisionMarks,type:B.Paragraph,description:"Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",hasEndMarker:!1,children:void 0},cd:{category:q.DivisionMarks,type:B.Paragraph,description:"Chapter Description (Publishing option D, e.g. in Russian Bibles)",hasEndMarker:!1,children:{DivisionMarks:["vp"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},v:{category:q.DivisionMarks,type:B.Character,description:"A verse number",hasEndMarker:!1,children:void 0},va:{category:q.DivisionMarks,type:B.Character,description:"Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)",hasEndMarker:!0,children:void 0},vp:{category:q.DivisionMarks,type:B.Character,description:"Published verse marker (verse string that should appear in the published text)",hasEndMarker:!0,children:void 0},p:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, with first line indent (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},m:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, with no first line indent (may occur after poetry) (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},po:{category:q.Paragraphs,type:B.Paragraph,description:"Letter opening",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pr:{category:q.Paragraphs,type:B.Paragraph,description:"Text refrain (paragraph text, right aligned)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},cls:{category:q.Paragraphs,type:B.Paragraph,description:"Letter Closing",hasEndMarker:!1,children:{SpecialText:["tl","sig","pn","png","addpn","add"]}},pmo:{category:q.Paragraphs,type:B.Paragraph,description:"Embedded text opening",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pm:{category:q.Paragraphs,type:B.Paragraph,description:"Embedded text paragraph",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmc:{category:q.Paragraphs,type:B.Paragraph,description:"Embedded text closing",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmr:{category:q.Paragraphs,type:B.Paragraph,description:"Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi1:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi2:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, level 2 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi3:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, level 3 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pc:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, centered (for Inscription)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},mi:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, indented, with no first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},nb:{category:q.Paragraphs,type:B.Paragraph,description:"Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, level 1 indent (if single level)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q1:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, level 1 indent (if multiple levels) (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q2:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, level 2 indent (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q3:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, level 3 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q4:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, level 4 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qc:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, centered",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qr:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, Right Aligned",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qs:{category:q.Poetry,type:B.Character,description:"Poetry text, Selah",hasEndMarker:!0,children:{Footnotes:["f"],CrossReferences:["x"]}},qa:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, Acrostic marker/heading",hasEndMarker:!1,children:void 0},qac:{category:q.Poetry,type:B.Character,description:"Poetry text, Acrostic markup of the first character of a line of acrostic poetry",hasEndMarker:!0,children:void 0},qm:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, embedded, level 1 indent (if single level)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm1:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, embedded, level 1 indent (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm2:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, embedded, level 2 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm3:{category:q.Poetry,type:B.Paragraph,description:"Poetry text, embedded, level 3 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qd:{category:q.Poetry,type:B.Paragraph,description:"A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},b:{category:q.Poetry,type:B.Paragraph,description:"Poetry text stanza break (e.g. stanza break) (basic)",hasEndMarker:!1,children:void 0},mt:{category:q.TitlesHeadings,type:B.Paragraph,description:"The main title of the book (if single level)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt1:{category:q.TitlesHeadings,type:B.Paragraph,description:"The main title of the book (if multiple levels) (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt2:{category:q.TitlesHeadings,type:B.Paragraph,description:"A secondary title usually occurring before the main title (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt3:{category:q.TitlesHeadings,type:B.Paragraph,description:"A secondary title occurring after the main title",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt4:{category:q.TitlesHeadings,type:B.Paragraph,description:"A small secondary title sometimes occurring within parentheses",hasEndMarker:!1,children:void 0},mte:{category:q.TitlesHeadings,type:B.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if single level)",hasEndMarker:!1,children:void 0},mte1:{category:q.TitlesHeadings,type:B.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte2"]}},mte2:{category:q.TitlesHeadings,type:B.Paragraph,description:"A secondary title occurring before or after the 'ending' main title",hasEndMarker:!1,children:void 0},ms:{category:q.TitlesHeadings,type:B.Paragraph,description:"A major section division heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms1:{category:q.TitlesHeadings,type:B.Paragraph,description:"A major section division heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms2:{category:q.TitlesHeadings,type:B.Paragraph,description:"A major section division heading, level 2",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms3:{category:q.TitlesHeadings,type:B.Paragraph,description:"A major section division heading, level 3",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe"]}},mr:{category:q.TitlesHeadings,type:B.Paragraph,description:"A major section division references range heading (basic)",hasEndMarker:!1,children:void 0},s:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s1:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s2:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section heading, level 2 (e.g. Proverbs 22-24)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s3:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section heading, level 3 (e.g. Genesis 'The First Day')",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s4:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section heading, level 4",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sr:{category:q.TitlesHeadings,type:B.Paragraph,description:"A section division references range heading",hasEndMarker:!1,children:void 0},r:{category:q.TitlesHeadings,type:B.Paragraph,description:"Parallel reference(s) (basic)",hasEndMarker:!1,children:void 0},sp:{category:q.TitlesHeadings,type:B.Paragraph,description:"A heading, to identify the speaker (e.g. Job)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},d:{category:q.TitlesHeadings,type:B.Paragraph,description:"A Hebrew text heading, to provide description (e.g. Psalms)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sd:{category:q.TitlesHeadings,type:B.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if single level)",hasEndMarker:!1,children:void 0},sd1:{category:q.TitlesHeadings,type:B.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if multiple levels)",hasEndMarker:!1,children:void 0},sd2:{category:q.TitlesHeadings,type:B.Paragraph,description:"Vertical space used to divide the text into sections, level 2",hasEndMarker:!1,children:void 0},sd3:{category:q.TitlesHeadings,type:B.Paragraph,description:"Vertical space used to divide the text into sections, level 3",hasEndMarker:!1,children:void 0},sd4:{category:q.TitlesHeadings,type:B.Paragraph,description:"Vertical space used to divide the text into sections, level 4",hasEndMarker:!1,children:void 0},lh:{category:q.Lists,type:B.Paragraph,description:"List header (introductory remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li:{category:q.Lists,type:B.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li1:{category:q.Lists,type:B.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li2:{category:q.Lists,type:B.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li3:{category:q.Lists,type:B.Paragraph,description:"A list entry, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li4:{category:q.Lists,type:B.Paragraph,description:"A list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lf:{category:q.Lists,type:B.Paragraph,description:"List footer (concluding remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim:{category:q.Lists,type:B.Paragraph,description:"An embedded list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim1:{category:q.Lists,type:B.Paragraph,description:"An embedded list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim2:{category:q.Lists,type:B.Paragraph,description:"An embedded list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim3:{category:q.Lists,type:B.Paragraph,description:"An embedded list item, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim4:{category:q.Lists,type:B.Paragraph,description:"An embedded list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},litl:{category:q.Lists,type:B.Character,description:"List entry total text",hasEndMarker:!0,children:void 0},lik:{category:q.Lists,type:B.Character,description:"Structured list entry key text",hasEndMarker:!0,children:void 0},liv:{category:q.Lists,type:B.Character,description:"Structured list entry value 1 content (if single value)",hasEndMarker:!0,children:void 0},liv1:{category:q.Lists,type:B.Character,description:"Structured list entry value 1 content (if multiple values)",hasEndMarker:!0,children:void 0},liv2:{category:q.Lists,type:B.Character,description:"Structured list entry value 2 content",hasEndMarker:!0,children:void 0},liv3:{category:q.Lists,type:B.Character,description:"Structured list entry value 3 content",hasEndMarker:!0,children:void 0},liv4:{category:q.Lists,type:B.Character,description:"Structured list entry value 4 content",hasEndMarker:!0,children:void 0},liv5:{category:q.Lists,type:B.Character,description:"Structured list entry value 5 content",hasEndMarker:!0,children:void 0},f:{category:q.Footnotes,type:B.Note,description:"A Footnote text item (basic)",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fe:{category:q.Footnotes,type:B.Note,description:"An Endnote text item",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fr:{category:q.Footnotes,type:B.Character,description:"The origin reference for the footnote (basic)",hasEndMarker:!0,children:void 0},ft:{category:q.Footnotes,type:B.Character,description:"Footnote text, Protocanon (basic)",hasEndMarker:!0,children:void 0},fk:{category:q.Footnotes,type:B.Character,description:"A footnote keyword (basic)",hasEndMarker:!0,children:void 0},fq:{category:q.Footnotes,type:B.Character,description:"A footnote scripture quote or alternate rendering (basic)",hasEndMarker:!0,children:void 0},fqa:{category:q.Footnotes,type:B.Character,description:"A footnote alternate rendering for a portion of scripture text",hasEndMarker:!0,children:void 0},fl:{category:q.Footnotes,type:B.Character,description:"A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",hasEndMarker:!0,children:void 0},fw:{category:q.Footnotes,type:B.Character,description:"A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",hasEndMarker:!0,children:void 0},fp:{category:q.Footnotes,type:B.Character,description:"A Footnote additional paragraph marker",hasEndMarker:!0,children:void 0},fv:{category:q.Footnotes,type:B.Character,description:"A verse number within the footnote text",hasEndMarker:!0,children:void 0},fdc:{category:q.Footnotes,type:B.Character,description:"Footnote text, applies to Deuterocanon only",hasEndMarker:!0,children:void 0},fm:{category:q.Footnotes,type:B.Character,description:"An additional footnote marker location for a previous footnote",hasEndMarker:!0,children:void 0},x:{category:q.CrossReferences,type:B.Note,description:"A list of cross references (basic)",hasEndMarker:!0,children:{CrossReferences:["xo","xop","xt","xta","xk","xq","xot","xnt","xdc"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},xo:{category:q.CrossReferences,type:B.Character,description:"The cross reference origin reference (basic)",hasEndMarker:!0,children:void 0},xop:{category:q.CrossReferences,type:B.Character,description:"Published cross reference origin reference (origin reference that should appear in the published text)",hasEndMarker:!0,children:void 0},xt:{category:q.CrossReferences,type:B.Character,description:"The cross reference target reference(s), protocanon only (basic)",hasEndMarker:!0,children:void 0},xta:{category:q.CrossReferences,type:B.Character,description:"Cross reference target references added text",hasEndMarker:!0,children:void 0},xk:{category:q.CrossReferences,type:B.Character,description:"A cross reference keyword",hasEndMarker:!0,children:void 0},xq:{category:q.CrossReferences,type:B.Character,description:"A cross-reference quotation from the scripture text",hasEndMarker:!0,children:void 0},xot:{category:q.CrossReferences,type:B.Character,description:"Cross-reference target reference(s), Old Testament only",hasEndMarker:!0,children:void 0},xnt:{category:q.CrossReferences,type:B.Character,description:"Cross-reference target reference(s), New Testament only",hasEndMarker:!0,children:void 0},xdc:{category:q.CrossReferences,type:B.Character,description:"Cross-reference target reference(s), Deuterocanon only",hasEndMarker:!0,children:void 0},rq:{category:q.CrossReferences,type:B.Character,description:"A cross-reference indicating the source text for the preceding quotation.",hasEndMarker:!0,children:void 0},qt:{category:q.SpecialText,type:B.Character,description:"For Old Testament quoted text appearing in the New Testament (basic)",hasEndMarker:!0,children:void 0},nd:{category:q.SpecialText,type:B.Character,description:"For name of deity (basic)",hasEndMarker:!0,children:void 0},tl:{category:q.SpecialText,type:B.Character,description:"For transliterated words",hasEndMarker:!0,children:void 0},dc:{category:q.SpecialText,type:B.Character,description:"Deuterocanonical/LXX additions or insertions in the Protocanonical text",hasEndMarker:!0,children:void 0},bk:{category:q.SpecialText,type:B.Character,description:"For the quoted name of a book",hasEndMarker:!0,children:void 0},sig:{category:q.SpecialText,type:B.Character,description:"For the signature of the author of an Epistle",hasEndMarker:!0,children:void 0},pn:{category:q.SpecialText,type:B.Character,description:"For a proper name",hasEndMarker:!0,children:void 0},png:{category:q.SpecialText,type:B.Character,description:"For a geographic proper name",hasEndMarker:!0,children:void 0},addpn:{category:q.SpecialText,type:B.Character,description:"For chinese words to be dot underline & underline",hasEndMarker:!0,children:void 0},wj:{category:q.SpecialText,type:B.Character,description:"For marking the words of Jesus",hasEndMarker:!0,children:void 0},k:{category:q.SpecialText,type:B.Character,description:"For a keyword",hasEndMarker:!0,children:void 0},sls:{category:q.SpecialText,type:B.Character,description:"To represent where the original text is in a secondary language or from an alternate text source",hasEndMarker:!0,children:void 0},ord:{category:q.SpecialText,type:B.Character,description:"For the text portion of an ordinal number",hasEndMarker:!0,children:void 0},add:{category:q.SpecialText,type:B.Character,description:"For a translational addition to the text",hasEndMarker:!0,children:void 0},lit:{category:q.SpecialText,type:B.Paragraph,description:"For a comment or note inserted for liturgical use",hasEndMarker:!1,children:void 0},no:{category:q.CharacterStyling,type:B.Character,description:"A character style, use normal text",hasEndMarker:!0,children:void 0},it:{category:q.CharacterStyling,type:B.Character,description:"A character style, use italic text",hasEndMarker:!0,children:void 0},bd:{category:q.CharacterStyling,type:B.Character,description:"A character style, use bold text",hasEndMarker:!0,children:void 0},bdit:{category:q.CharacterStyling,type:B.Character,description:"A character style, use bold + italic text",hasEndMarker:!0,children:void 0},em:{category:q.CharacterStyling,type:B.Character,description:"A character style, use emphasized text style",hasEndMarker:!0,children:void 0},sc:{category:q.CharacterStyling,type:B.Character,description:"A character style, for small capitalization text",hasEndMarker:!0,children:void 0},sup:{category:q.CharacterStyling,type:B.Character,description:"A character style, for superscript text. Typically for use in critical edition footnotes.",hasEndMarker:!0,children:void 0},pb:{category:q.Breaks,type:B.Paragraph,description:"Page Break used for new reader portions and children's bibles where content is controlled by the page",hasEndMarker:!1,children:void 0}},Vr={DivisionMarks:{add:["v","c"],remove:[]},Paragraphs:{add:["p"],remove:[]},Poetry:{add:["q","q1","q2","q3","q4","b"],remove:[]},TitlesHeadings:{add:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],remove:[]}},_1={p:{children:Vr},q:{children:Vr},q1:{children:Vr},q2:{children:Vr},q3:{children:Vr},q4:{children:Vr},b:{children:Vr},qm:{children:{Paragraphs:{add:["p"],remove:[]}}},c:{type:B.Paragraph,children:null},v:{children:null}};function Mp(t){const e=y1[t],n=_1[t];if(!e)return;if(!n)return e;let r=e.children?{...e.children}:void 0;if(n.children===null&&(r=void 0),n.children){r=r||{};for(const[o,s]of Object.entries(n.children)){const i=o;if(s===null)Reflect.deleteProperty(r,i);else{let a=r[i]||[];s.remove&&(a=a.filter(c=>!s.remove.includes(c))),s.add&&(a=[...new Set([...a,...s.add])]),a.length>0?r[i]=a:Reflect.deleteProperty(r,i)}}Object.keys(r).length===0&&(r=void 0)}return{...e,...n,children:r}}function Rp(t,e,n){const r={type:Rs,version:Os,content:t},o=e.serializeEditorState(r,n);return pu(o.root.children[0])?o.root.children[0].children[0]:o.root.children[0]}function pc(t,e){if(!t||!m.$isTextNode(t))return[void 0,void 0];const n=t.getTextContent();if(e>=0&&e<n.length)return[t,e];let r=t.getNextSibling();if(!r){const s=t.getParent();St(s)&&(r=s.getNextSibling())}if(!r||!St(r)&&!m.$isTextNode(r))return[void 0,void 0];const o=e-n.length;return r&&m.$isTextNode(r)?pc(r,o):pc(r.getFirstChild()??void 0,o)}function Op(t){const e=pv(t.jsonPath);let n=m.$getRoot();for(const r of e){if(!n||!m.$isElementNode(n))return[void 0,void 0];n=n.getChildAtIndex(r)??void 0}return pc(n,t.offset)}function jp(t){return m.$isElementNode(t)?"element":"text"}function _u(t){const{start:e}=t;let{end:n}=t;n===void 0&&(n=e);const[r,o]=Op(e),[s,i]=Op(n);if(!r||!s||o===void 0||i===void 0)return;const a=m.$createRangeSelection();return a.anchor=m.$createPoint(r.getKey(),o,jp(r)),a.focus=m.$createPoint(s.getKey(),i,jp(s)),a}function Ip(t,e){const n=[];let r=t;for(;r!=null&&r.getParent();){const o=r.getParent();if(o){const s=o==null?void 0:o.getChildren().indexOf(r);s>=0&&n.unshift(s)}r=o}return{jsonPath:fv(n),offset:e}}function yg(){const t=m.$getSelection();if(!t||!m.$isRangeSelection(t))return;const e=t.isBackward()?t.focus.getNode():t.anchor.getNode(),n=t.isBackward()?t.focus.offset:t.anchor.offset,r=Ip(e,n);if(t.isCollapsed())return{start:r};const o=t.isBackward()?t.anchor.getNode():t.focus.getNode(),s=t.isBackward()?t.anchor.offset:t.focus.offset,i=Ip(o,s);return{start:r,end:i}}const _g="v",Cg=1;class qt extends m.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=_g,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-verse"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new qt(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>E1(e)?{conversion:C1,priority:1}:null}}static importJSON(e){return Cu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(ac,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(ac,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return l.jsx("span",{children:this.getShowMarker()?li(this.getMarker(),this.getNumber()):ic+this.getNumber()+ic})}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:Cg}}isKeyboardSelectable(){return!1}}function C1(t){const e=t.getAttribute("data-number")??"0";return{node:Cu(e)}}function Cu(t,e,n,r,o,s){return m.$applyNodeReplacement(new qt(t,e,n,r,o,s))}function E1(t){return((t==null?void 0:t.getAttribute("data-marker"))??void 0)===_g}function ls(t){return t instanceof qt}function k1(t){return(t==null?void 0:t.type)===qt.getType()}function wn(t){return wu(t)||ls(t)}function N1(t){return Y_(t)||k1(t)}function T1(t,e,n,r,o,s,i){if(!xt.isValidMarker(t))throw new Error(`$insertNote: Invalid note marker '${t}'`);const a=n?_u(n):m.$getSelection();if(!m.$isRangeSelection(a))return;const c=S1(a,t,r,i);if(c===void 0)return;const u=kg(t,e,c,o,s);return Eg(u,a,o),u}function Eg(t,e,n){const r=(n==null?void 0:n.noteMode)==="collapsed";if(t.setIsCollapsed(r),e.isCollapsed()||r1(e),e.insertNodes([t]),!r){const o=t.getChildren().reverse().find(Ue);o==null||o.selectEnd()}}function S1(t,e,n,r){const o=[],{chapterNum:s,verseNum:i}=n??{};switch(e){case"f":case"fe":case"ef":case"efe":if(s!==void 0&&i!==void 0&&o.push(Hn("fr").append(m.$createTextNode(`${s}:${i}`))),!t.isCollapsed()){const a=t.getTextContent().trim();if(a.length>0){const c=Hn("fq");c.append(m.$createTextNode(a)),o.push(c)}}o.push(Hn("ft").append(m.$createTextNode("-")));break;case"x":case"ex":s!==void 0&&i!==void 0&&o.push(Hn("xo").append(m.$createTextNode(`${s}:${i}`))),o.push(Hn("xt").append(m.$createTextNode("-")));break;default:r==null||r.warn(`$createNoteChildren: Unsupported note marker '${e}'`);return}return o}function kg(t,e,n,r,o,s){const i=(r==null?void 0:r.noteMode)!=="expanded",a=hu(t,e,i);s&&m.$setState(a,so,()=>s);let c,u;(r==null?void 0:r.markerMode)==="editable"?(c=Ko(t),u=Ko(t,"closing")):(r==null?void 0:r.markerMode)==="visible"&&(c=Yo("marker",fr(t)+qe),u=Yo("marker",Go(t)+qe));let d;if(c&&a.append(c),(r==null?void 0:r.markerMode)==="editable")e===""?a.append(...n):(d=m.$createTextNode(bu(a.__caller)),a.append(d,...n));else{const p=()=>m.$createTextNode(qe),f=n.flatMap(D1(p));if(e==="")a.append(...f);else{const h=vu(n);let v=()=>{};o!=null&&o.noteCallerOnClick&&(v=o.noteCallerOnClick),d=Tu(a.__caller,h,v),a.append(d,p(),...f)}}return u&&a.append(u),a}function Lp(t){var e;if(typeof t=="string"){const o=m.$getNodeByKey(t);return Se(o)?o:void 0}const n=Xs();if(n.length<=0)return;const r=(e=n.filter(o=>Se(o.node))[t])==null?void 0:e.node;if(Se(r))return r}function A1(t,e){const n=(e==null?void 0:e.noteMode)==="collapsed";if(t.setIsCollapsed(n),n){const r=t.getPreviousSibling();if(ls(r)||!r){const o=t.getParent();if(o){const s=t.getIndexWithinParent();o.select(s,s)}}else r.selectEnd()}else{const r=t.getChildren().reverse().find(Ue);r==null||r.selectEnd()}}function D1(t){return e=>aa(e)?[e]:[e,t()]}function M1(t){return t.find(e=>jt(e))}function R1(t,e){return m.$isElementNode(t)?t.getChildren().find(n=>wn(n)&&xu(e,n.getNumber())):void 0}function O1(t,e){return e===0?M1(t):t.map(n=>R1(n,e)).filter(n=>n)[0]}function Pp(t){return!t||!m.$isElementNode(t)?void 0:t.getChildren().findLast(e=>wn(e))}function Ng(t){var e,n;if(!t||hn(t))return;if(wn(t))return t;let r=St(t.getParent())?(e=t.getParent())==null?void 0:e.getPreviousSibling():t.getPreviousSibling();for(;r&&!wn(r)&&!hn(r);)r=r.getPreviousSibling();if(r&&wn(r))return r;let o=(n=t.getTopLevelElement())==null?void 0:n.getPreviousSibling(),s=Pp(o),i=s;for(;o&&!s&&!hn(o);)s=i,o=o.getPreviousSibling(),i=Pp(o);if(!(!s&&hn(o)))return s}function j1(t){return Q_(t)||ls(t)}function Eu(t){if(m.$isTextNode(t)){const e=t.getTextContent();!e.endsWith(" ")&&!e.endsWith(qe)&&t.setTextContent(`${e} `)}}function Tg(t){if(m.$isTextNode(t)){const e=t.getTextContent();e.startsWith(" ")&&t.setTextContent(e.trimStart())}}function ku(t,e){return t.getEditorState().read(()=>!m.$getNodeByKey(e))}const I1=["style"],L1=["style","code"],ca=["style","cid"],P1=["style","number","sid","altnumber","pubnumber"],$1=["style","number","sid","altnumber","pubnumber"],F1=["style","sid","eid"],B1=["style","caller","category","contents"],q1=["chapter","immutable-chapter","verse","immutable-verse","ms","note","unmatched"],Hs=`
`;function U1(t,e){const n=m.$getNodeByKey(t);if(!Mn(n))return;const r=Sg(n);return r===void 0?void 0:[{retain:r},...e,{delete:1}]}function Sg(t){if(!t)return;const e=Xs();let n=0;const r=[];let o,s;const i=t.getKey();let a;for(const c of e){const u=c.node;for(let d=r.length-1;d>=0;d--)if(zs(r[d],c)){const p=r[d];if(r.splice(d,1),n+=1,a&&p.getKey()===a.getKey())return n-1}if(o&&zs(o,c)&&(o=void 0,s=void 0),o){if(u.getKey()===i)return s;continue}if(u.getKey()===i){if(m.$isTextNode(u)||Mn(u))return n;mn(u)&&(a=u)}if(mn(u)&&(r.includes(u)||r.push(u)),Se(u)){o=u,s=n,n+=1;continue}n+=Ag(u)}if(a)return n}function $p(t,e){if(t.length<2||!z1(t[0])||!H1(t[1]))return;const n=t[0].retain;return e.read(()=>{const r=V1(n);return r==null?void 0:r.getKey()})}function V1(t){const e=Xs();let n=0;const r=[];let o,s;for(const i of e){const a=i.node;for(let u=r.length-1;u>=0;u--)if(zs(r[u],i)){const d=r[u];if(r.splice(u,1),n===t)return d;n+=1}if(o&&zs(o,i)&&(o=void 0,s=void 0),o){if(s===t)return o;continue}if(mn(a)&&(r.includes(a)||r.push(a)),Se(a)){if(o=a,s=n,n===t)return a;n+=1;continue}const c=Ag(a);if(m.$isTextNode(a)&&c>0&&t>=n&&t<n+c||Mn(a)&&n===t)return a;n+=c}for(const i of r){if(n===t)return i;n+=1}}function zs(t,e){return t?e?!t1(e.node,t.getKey()):!0:!1}function Mn(t){return hn(t)||wn(t)||$a(t)||Se(t)||xg(t)}function mn(t){return kn(t)||Jn(t)}function vs(t,e){return e.insert!=null&&typeof e.insert=="object"&&t in e.insert}function H1(t){if(t.insert==null||typeof t.insert!="object")return!1;const e=Object.keys(t.insert)[0];return t.insert!=null&&typeof t.insert=="object"&&e in t.insert&&q1.includes(e)}function z1(t){return t.retain!=null&&typeof t.retain=="number"}function Ag(t){return m.$isTextNode(t)?t.getTextContentSize():Mn(t)?1:0}function fc(t,e){const n={insert:t.__text},r=m.$getState(t,so);if(r&&(n.attributes={segment:r}),e&&e.length>0){let o=e.map(s=>{const i={style:s.__marker},a=m.$getState(s,oo);a&&(i.cid=a);const c=s.getUnknownAttributes();return c&&Object.keys(c).length>0&&Object.assign(i,c),i});o.length===1&&(o=o[0]),n.attributes={...n.attributes,char:o}}return n}function Fp(t){const e=new ks;return t.isEmpty()||t.read(()=>{const n=m.$getRoot();if(!n||n.isEmpty())return;const r=n.getChildren();if(r.length===1&&cr(r[0])&&(!r[0].getChildren()||r[0].getChildrenSize()===0))return;const o=G1();for(const s of o)e.push(s)}),e}function Nu(t,e){const n=[],r=Xs(t),o=[],s=[],i={children:[],contentsOps:[]};for(let a=0;a<r.length;a++){const c=r[a].node;n.push(...Bp(c,a,r,o,s,i))}for(const a of o)n.push(...Bp(a,r.length,r,o,s,i));return n}function G1(){return Nu()}function Bp(t,e,n,r,o,s){if(!t)return[];const i=[];return K1(t,i,r),Y1(t,i,o,s),W1(t,e,n,o),hn(t)&&i.push(Q1(t)),wn(t)&&i.push(eC(t)),$a(t)&&i.push(tC(t)),xg(t)&&i.push(nC(t)),J1(t,i,s),i}function K1(t,e,n){if(!t.isInline()){const r=n.pop();Jn(r)?e.push(X1(r)):jt(r)?e.push(Z1(r)):cr(r)&&e.push({insert:Hs})}mn(t)&&(n.includes(t)||n.push(t))}function Y1(t,e,n,r){var o;if(!m.$isTextNode(t))return;const s=t.getParent();if(Se(s)&&s.getFirstChild()===t)return;const i=fc(t,n);if(r.children.includes(t)){const a=t.getTextContent();if(!a||a===qe||a.startsWith(au))return;(o=r.contentsOps)==null||o.push(i)}else e.push(i)}function W1(t,e,n,r){Ue(t)&&!r.includes(t)&&r.push(t);const o=n[e+1];for(const s of r.toReversed())zs(s,o)&&r.pop()}function J1(t,e,n){var r,o;if(!Se(t))return;Xs(t).forEach(i=>n.children.push(i.node));const s=rC(t);n.contentsOps=(o=(r=s.insert.note)==null?void 0:r.contents)==null?void 0:o.ops,e.push(s)}function X1(t){const e={style:qs,code:t.__code};return{insert:Hs,attributes:{book:e}}}function Q1(t){const e={style:sa,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{chapter:e}}}function Z1(t){const e={style:t.__marker};return{insert:Hs,attributes:{para:e}}}function eC(t){const e={style:ia,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{verse:e}}}function tC(t){const e={style:t.__marker};return t.__sid&&(e.sid=t.__sid),t.__eid&&(e.eid=t.__eid),{insert:{milestone:e}}}function nC(t){return{insert:{unmatched:{marker:t.__marker}}}}function rC(t){const e={style:t.__marker,caller:t.__caller};t.__category&&(e.category=t.__category),t.getChildrenSize()>1&&(e.contents={ops:[]});const n={insert:{note:e}},r=m.$getState(t,so);return r&&(n.attributes={segment:r}),n}const Dg=1;class Tn extends m.DecoratorNode{constructor(e=io,n="",r,o){super(o),de(this,"__caller"),de(this,"__previewText"),de(this,"__onClick"),this.__caller=e,this.__previewText=n,this.__onClick=r??(()=>{})}static getType(){return"immutable-note-caller"}static clone(e){const{__caller:n,__previewText:r,__onClick:o,__key:s}=e;return new Tn(n,r,o,s)}static importDOM(){return{span:e=>sC(e)?{conversion:oC,priority:1}:null}}static importJSON(e){return Tu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setCaller(e.caller).setPreviewText(e.previewText).setOnClick(e.onClick)}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setPreviewText(e){if(this.__previewText===e)return this;const n=this.getWritable();return n.__previewText=e,n}getPreviewText(){return this.getLatest().__previewText}setOnClick(e){if(this.__onClick===e)return this;const n=this.getWritable();return n.__onClick=e,n}getOnClick(){return this.getLatest().__onClick}createDOM(){const e=document.createElement("span");return e.classList.add(this.__type),e.setAttribute("data-caller",this.__caller),e.setAttribute("data-preview-text",this.__previewText),e}updateDOM(e){return e.__caller!==this.__caller}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&m.isHTMLElement(n)&&(n.classList.add(this.getType()),n.setAttribute("data-caller",this.getCaller()),n.setAttribute("data-preview-text",this.getPreviewText())),{element:n}}decorate(e){const n=this.getParent();if(!n)return null;const r=n.getKey(),o=n.getIsCollapsed(),s=this.__key,i=c=>{var u;return(u=this.__onClick)==null?void 0:u.call(this,c,r,o,()=>iC(e,r),d=>aC(e,r,s,d),()=>lC(e,r))},a=`${this.__caller}_${this.__previewText}}`.replace(/\s+/g,"").substring(0,25);return l.jsx("button",{onClick:i,title:this.__previewText,"data-caller-id":a,children:this.__caller===io&&o?"":this.__caller})}exportJSON(){return{type:this.getType(),caller:this.getCaller(),previewText:this.getPreviewText(),onClick:this.getOnClick(),version:Dg}}isKeyboardSelectable(){return!1}}function oC(t){const e=t.getAttribute("data-caller")??"",n=t.getAttribute("data-preview-text")??"";return{node:Tu(e,n)}}function Tu(t,e,n){return m.$applyNodeReplacement(new Tn(t,e,n))}function sC(t){return t?t.classList.contains(Tn.getType()):!1}function Pr(t){return t instanceof Tn}function iC(t,e){return t.read(()=>{const n=m.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteCaller: Note node not found: ${e}`);return n.getCaller()})}function aC(t,e,n,r){t.update(()=>{const o=m.$getNodeByKey(e);if(!Se(o))throw new Error(`setNoteCaller: Note node not found: ${e}`);o.setCaller(r);const s=m.$getNodeByKey(n);if(!Pr(s))throw new Error(`setNoteCaller: Caller node not found: ${n}`);s.setCaller(r)})}function lC(t,e){return t.read(()=>{const n=m.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteOps: Note node not found: ${e}`);return Nu(n)})}const cC=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],uC=[Tn,qt,...x1],dC=w.forwardRef((t,e)=>{const{coords:n,children:r,style:o,...s}=t,i=n!==void 0;return l.jsx("div",{ref:e,className:"floating-box","aria-hidden":!i,style:{...o,position:"absolute",zIndex:1e3,top:n==null?void 0:n.y,left:n==null?void 0:n.x,visibility:i?"visible":"hidden",opacity:i?1:0},...s,children:r})});function pC(){const[t,e]=w.useState(void 0),[n,r]=w.useState(),o=w.useRef(null),s=w.useCallback((a,c)=>{o.current&&o.current();const u=a.commonAncestorContainer.nodeType===a.commonAncestorContainer.TEXT_NODE?a:a.commonAncestorContainer;o.current=uy(u,c,()=>{fy(u,c,{placement:"bottom-start",middleware:[dy(),py()]}).then(d=>{r(d.placement),e(p=>(p==null?void 0:p.x)===d.x&&(p==null?void 0:p.y)===d.y?p:{x:d.x,y:d.y})}).catch(()=>{e(void 0)})})},[]),i=w.useCallback(()=>{o.current&&(e(void 0),o.current(),o.current=null)},[]);return w.useEffect(()=>i,[i]),{coords:t,placement:n,updatePosition:s,cleanup:i}}function fC({isOpen:t,floatingBoxRef:e}){const{coords:n,updatePosition:r,cleanup:o,placement:s}=pC();return w.useEffect(()=>{var i;if(!t||!e.current){o();return}const a=(i=window.getSelection())==null?void 0:i.getRangeAt(0);if(!a){o();return}return r(a,e.current),o},[o,t,e,r]),{coords:n,placement:s}}const hC=document.body,wC=w.memo(dC);function gC({isOpen:t=!1,children:e}){const n=w.useRef(null),{coords:r,placement:o}=fC({isOpen:t,floatingBoxRef:n}),s=w.useMemo(()=>r?typeof e=="function"?e:()=>e:()=>null,[e,r]);return fn.createPortal(l.jsx(wC,{ref:n,coords:r,style:r?void 0:{display:"none"},children:s({isOpen:t,placement:o})}),hC)}const Mg=w.createContext(void 0);function Su(){const t=w.useContext(Mg);if(!t)throw new Error("useMenuContext must be used within a MenuProvider");return t}function mC(t,e){const[n,r]=w.useState(0),[o,s]=w.useState(-1),i=w.useMemo(()=>t??[],[t]),a={menuItems:i,activeIndex:n,selectedIndex:o,onSelectOption:e??(()=>{})},c=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p-1+f)%f:0})},[i.length]),u=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p+1)%f:0})},[i.length]),d=w.useCallback(()=>{const p=i.length;if(n>=0&&n<p){const f=i[n];e==null||e(f),s(n)}},[n,i,e]);return{state:a,moveUp:c,moveDown:u,select:d,setActiveIndex:r,setSelectedIndex:s}}function bC({children:t,menuItems:e,onSelectOption:n,...r}){const o=mC(e,n);return l.jsx(Mg.Provider,{value:o,children:l.jsx("div",{...r,children:t})})}const Rg=w.forwardRef(({index:t,children:e,onMouseEnter:n,onClick:r,...o},s)=>{const{state:{activeIndex:i},setActiveIndex:a,setSelectedIndex:c,select:u}=Su(),d=w.useCallback(f=>{u(),c(-1),r==null||r(f)},[r,u,c]),p=w.useCallback(f=>{a(t),n==null||n(f)},[t,a,n]);return l.jsx("button",{ref:s,role:"menuitem",...o,onClick:d,onMouseEnter:p,"aria-selected":t!==void 0&&i===t?"true":void 0,tabIndex:-1,children:e})});function vC({children:t,autoIndex:e=!0,...n}){const r=w.useRef(null),{state:{activeIndex:o,menuItems:s}}=Su(),i=w.useMemo(()=>s?typeof t=="function"?t:()=>t:()=>null,[t,s]),a=w.useMemo(()=>{const c=i(s);return e?w.Children.map(c,(u,d)=>w.isValidElement(u)&&u.type===Rg&&u.props.index===void 0?w.cloneElement(u,{index:d}):u):c},[i,e,s]);return w.useEffect(()=>{if(r.current){const c=r.current,u=c.children[o];if(u){const d=c.getBoundingClientRect(),p=u.getBoundingClientRect();p.bottom>d.bottom?c.scrollTop+=p.bottom-d.bottom:p.top<d.top&&(c.scrollTop-=d.top-p.top)}}},[o]),l.jsx("div",{ref:r,role:"menu",...n,children:a})}const Nl={Root:bC,Options:vC,Option:Rg},xC=(t,e,n)=>Vi(t,n).toLowerCase().includes(e.toLowerCase()),qp=t=>Object.keys(t).find(e=>typeof t[e]=="string")||"",Vi=(t,e)=>{const n=t[e];return typeof n=="string"?n:String(n)};function yC(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t,{caseSensitive:a=!1,priorityOrder:c=["exact","startsWith","contains"]}=i||{},u=a?e:e.toLowerCase();let d,p;o?(p=o,d=n.length>0?qp(n[0]):""):(d=r||(n.length>0?qp(n[0]):""),p=(v,x)=>xC(v,x,d));const f=s||d,h=new Map;return n.filter(v=>{try{return p(v,e)}catch(x){return console.warn("Error filtering item:",v,x),!1}}).sort((v,x)=>{const N=D=>(h.has(D)||h.set(D,Vi(D,f).toLowerCase()),h.get(D)??""),C=a?Vi(v,f):N(v),_=a?Vi(x,f):N(x);for(const D of c)switch(D){case"exact":if(C===u&&_!==u)return-1;if(_===u&&C!==u)return 1;break;case"startsWith":if(C.startsWith(u)&&!_.startsWith(u))return-1;if(_.startsWith(u)&&!C.startsWith(u))return 1;break;case"contains":{const L=C.indexOf(u),V=_.indexOf(u);if(L!==-1&&V===-1)return-1;if(V!==-1&&L===-1)return 1;if(L!==-1&&V!==-1)return L-V;break}}return C.localeCompare(_)})}function _C(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t;return w.useMemo(()=>yC({query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}),[e,n,r,o,s,i])}function CC(){const{moveUp:t,moveDown:e,select:n}=Su();return w.useMemo(()=>({moveUp:t,moveDown:e,select:n}),[t,e,n])}const EC=()=>{const t=CC(),[e]=_e();w.useEffect(()=>{const n=r=>{const o={ArrowDown:()=>t==null?void 0:t.moveDown(),ArrowUp:()=>t==null?void 0:t.moveUp(),Enter:()=>t==null?void 0:t.select(),Tab:()=>t==null?void 0:t.select()}[r.key];return o?(o(),r.preventDefault(),r.stopPropagation(),!0):!1};return e.registerCommand(m.KEY_DOWN_COMMAND,n,m.COMMAND_PRIORITY_HIGH)},[e,t])};function kC(){return EC(),null}function NC(t){const{options:e,onSelectOption:n,onClose:r,inverse:o,query:s,menuOpenKey:i}=t,[a]=_e(),c=s!==void 0,[u,d]=w.useState(""),p=c?s??"":u,f=_C({query:p,items:e,filterBy:"name"}),h=v=>{r==null||r(),n?n(v):v.action(a)};return w.useEffect(()=>a.registerCommand(m.KEY_DOWN_COMMAND,v=>{if(c)return!1;const x={Escape:()=>r==null?void 0:r(),Backspace:()=>{p.length===0?r==null||r():d(N=>N.slice(0,-1))}}[v.key];return x?(v.stopPropagation(),v.preventDefault(),x(),!0):v.key.length===1?(v.stopPropagation(),v.preventDefault(),v.key!==i&&d(N=>N+v.key),!0):!1},m.COMMAND_PRIORITY_HIGH),[a,c,p,i,r]),l.jsxs(Nl.Root,{className:`autocomplete-menu-container ${o?"inverse":""}`,menuItems:f,onSelectOption:v=>h(v),children:[!c&&l.jsx("input",{value:p,type:"text",disabled:!0}),l.jsx(kC,{}),l.jsx(Nl.Options,{className:"autocomplete-menu-options",autoIndex:!1,children:v=>v.map((x,N)=>l.jsxs(Nl.Option,{index:N,children:[l.jsx("span",{className:"label",children:x.label??x.name}),l.jsx("span",{className:"description",children:x.description})]},x.name))})]})}function TC({trigger:t,items:e}){const[n]=_e(),[r,o]=w.useState(!1),s=w.useCallback(i=>{i.key==="Escape"&&r?(o(!1),n.focus()):i.key===t&&!r&&(i.preventDefault(),o(!0))},[n,t,r]);return w.useEffect(()=>n.registerRootListener(i=>{if(i)return i.addEventListener("keydown",s),()=>{i.removeEventListener("keydown",s)}}),[n,s]),w.useEffect(()=>n.registerUpdateListener(({prevEditorState:i,editorState:a})=>{const c=i.read(()=>{const u=m.$getSelection();if(m.$isRangeSelection(u))return u});a.read(()=>{const u=m.$getSelection();!m.$isRangeSelection(u)||c!=null&&c.is(u)||o(!1)})}),[n]),e&&l.jsx(gC,{isOpen:r,children:({placement:i})=>l.jsx(NC,{options:e,onClose:()=>o(!1),inverse:i==="top-start",menuOpenKey:t})})}function SC({scriptureReference:t,contextMarker:e,getMarkerAction:n}){return{markersMenuItems:w.useMemo(()=>{if(!e||!t)return;const r=Mp(e);if(r!=null&&r.children)return Object.values(r.children).flatMap(o=>o.map(s=>{const i=Mp(s),{action:a}=n(s,i);return{name:s,label:s,description:(i==null?void 0:i.description)??"",action:c=>{a({editor:c,reference:t})}}}))},[e,n,t])}}function Hi(t,e){return`${t}:${e}`}function AC(t,e){w.useEffect(()=>{if(!t.hasNodes([Nt]))throw new Error("AnnotationPlugin: TypedMarkNode not registered on editor!");const n=new Map;return At(th(t,Nt,r=>Vs(r.getTypedIDs()),(r,o)=>{for(const[s,i]of Object.entries(r.getTypedIDs()))i.forEach(a=>{o.addID(s,a)})}),t.registerMutationListener(Nt,r=>{t.getEditorState().read(()=>{for(const[o,s]of r){const i=m.$getNodeByKey(o);let a={};s==="destroyed"?a=n.get(o)??{}:St(i)&&(a=i.getTypedIDs());for(const[c,u]of Object.entries(a))if(!Nt.isReservedType(c))for(const d of u){let p=e.get(Hi(c,d));a[c]=u,n.set(o,a),s==="destroyed"?p!==void 0&&(p.delete(o),p.size===0&&e.delete(Hi(c,d))):(p===void 0&&(p=new Set,e.set(Hi(c,d),p)),p.has(o)||p.add(o))}}})},{skipInitialization:!0}))},[t,e])}const DC=w.forwardRef(function({logger:t},e){const[n]=_e(),r=w.useMemo(()=>new Map,[]);return AC(n,r),w.useImperativeHandle(e,()=>({addAnnotation(o,s,i){if(Nt.isReservedType(s))throw new Error(`addAnnotation: Can't directly add this reserved annotation type '${s}'. Use the appropriate plugin instead.`);n.update(()=>{const a=_u(o);if(a===void 0){t==null||t.error("Failed to find start or end node of the annotation.");return}mg(a,s,i)},{tag:cc})},removeAnnotation(o,s){if(Nt.isReservedType(o))throw new Error(`removeAnnotation: Can't directly remove this reserved annotation type '${o}'. Use the appropriate plugin instead.`);const i=r.get(Hi(o,s));i!==void 0&&setTimeout(()=>{n.update(()=>{for(const a of i){const c=m.$getNodeByKey(a);St(c)&&(c.deleteID(o,s),c.hasNoIDsForEveryType()&&gg(c))}},{tag:cc})})}})),null});function MC({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=_e();return w.useLayoutEffect(()=>{if(n)return r.registerUpdateListener(o=>{const{editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:u}=o;if(e&&i.size===0&&a.size===0||t&&u.has(m.HISTORY_MERGE_TAG)||c.isEmpty())return;const d=RC(r,o);d.length!==0&&n(s,r,u,d)})},[r,t,e,n]),null}function RC(t,{dirtyLeaves:e,prevEditorState:n}){let r=new ks;return t.getEditorState().read(()=>{const o=e.values().next().value??"";if(e.size===1&&m.$isTextNode(m.$getNodeByKey(o))){const s=m.$getNodeByKey(o),i=Sg(s);if(m.$isTextNode(s)&&i!==void 0){const a=n.read(()=>{const d=m.$getNodeByKey(o);return new ks([m.$isTextNode(d)?fc(d):{insert:""}])}),c=new ks([fc(s)]),u=new ks(i>0?[{retain:i}]:[]);r=r.concat(u).concat(a.diff(c))}}else{const s=Fp(n),i=Fp(t.getEditorState());r=s.diff(i)}}),r.ops}function OC(t,e,n,r){let o=0;t.forEach(s=>{if("retain"in s)o+=jC(s,o,e,r);else if("delete"in s){if(typeof s.delete!="number"||s.delete<=0){r==null||r.error(`Invalid delete operation: ${JSON.stringify(s)}`);return}r==null||r.debug(`Delete: ${s.delete}`),LC(o,s.delete,r)}else"insert"in s?typeof s.insert=="string"?(r==null||r.debug(`Insert: '${s.insert}'`),o+=PC(o,s.insert,s.attributes,e,r)):typeof s.insert=="object"&&s.insert!==null?(r==null||r.debug(`Insert embed: ${JSON.stringify(s.insert)}`),FC(o,s,e,n,r)?o+=1:r==null||r.error(`Failed to process insert embed operation: ${JSON.stringify(s.insert)} at index ${o}. Document may be inconsistent.`)):r==null||r.error(`Insert of unknown type: ${JSON.stringify(s.insert)}`):r==null||r.error(`Unknown operation: ${JSON.stringify(s)}`)})}function jC(t,e,n,r){return typeof t.retain!="number"||t.retain<0?(r==null||r.error(`Invalid retain operation: ${JSON.stringify(t)}`),0):(r==null||r.debug(`Retain: ${t.retain}`),t.attributes&&(r==null||r.debug(`Retain attributes: ${JSON.stringify(t.attributes)}`),IC(e,t.retain,t.attributes,n,r)),t.retain)}function IC(t,e,n,r,o){o==null||o.debug(`Applying attributes for range [${t}, ${t+e-1}] with attributes: ${JSON.stringify(n)}`);let s=e,i=0,a=-1;const c=m.$getRoot();function u(d){if(s<=0)return!0;if(m.$isTextNode(d)){const p=d.getTextContentSize();if(t<i+p&&i<t+e){const f=Math.max(0,t-i),h=p-f,v=Math.min(s,h);if(v>0){let x=d;const N=f>0,C=v<p-f;if(N&&C){const[,_]=d.splitText(f);[x]=_.splitText(v)}else N?[,x]=d.splitText(f):C&&([x]=d.splitText(v));if(co(n)){const _=x.getParent();if(Ue(_)){const D=n.char;let L;Array.isArray(D)?a>=0&&a<=D.length-1&&(L=D[a]):a===0&&(L=D);const V=L?lo(L,_):!1;if(V&&Array.isArray(D)&&D.length>1){const O=m.$createTextNode("");x.replace(O);const U=typeof n.segment=="string"?n.segment:void 0,F=ui(D.slice(1),r,x,U);let $=O;for(const Y of F)$.insertAfter(Y),$=Y;O.remove(),pn(n,x)}else if(V)pn(n,x);else{x.remove();const O=Up(x,n,r,o);if(O&&O.length>0){let U=_;for(const F of O)U.insertAfter(F),U=F}}}else{const D=m.$createTextNode("");x.replace(D);const L=Up(x,n,r,o);if(L&&L.length>0){let V=D;for(const O of L)V.insertAfter(O),V=O;D.remove()}else D.replace(x)}}else pn(n,x);s-=v}}i+=p}else if(Mn(d))t<=i&&i<t+e&&s>0&&(Vp(d,n),s-=1),i+=1;else if(Ue(d)){a+=1;let p=!1;if(t<=i&&i<t+e&&s>0)if(co(n)){const f=n.char;let h;if(Array.isArray(f)?a>=0&&a<=f.length-1&&(h=f[a]):a===0&&(h=f),h){d.setMarker(h.style),typeof h.cid=="string"&&m.$setState(d,oo,()=>h.cid);const v=yt(h,ca);v&&Object.keys(v).length>0?d.setUnknownAttributes({...d.getUnknownAttributes()??{},...v}):d.setUnknownAttributes(void 0)}}else(n.char===!1||n.char===null||KC(n.char))&&(p=!0);if(s>0){const f=d.getChildren();for(const h of f){if(s<=0)break;if(u(h)&&s<=0)return p&&rd(d),!0}}p&&rd(d),a-=1}else if(mn(d)){const p=d.getChildren();for(const h of p){if(s<=0)break;if(u(h)&&s<=0)return!0}const f=1;if(t<=i&&i<t+s&&s>0){if(!cr(d))Vp(d,n);else if(Au(n)){const h=jg(n.para);h&&d.replace(h,!0)}s-=f}i+=f}else if(m.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(s<=0)break;if(u(f)&&s<=0)return!0}}return s<=0}u(c),s>0&&(o==null||o.warn(`$applyAttributes: Not all characters in the retain operation (length ${e}) could be processed. Remaining: ${s}. targetIndex: ${t}, final currentIndex: ${i}`))}function Up(t,e,n,r){var o;const s=typeof e.segment=="string"?e.segment:void 0,i=ui(e.char,n,t,s),a=i.find(Ue);if(!a){r==null||r.error(`Failed to create CharNode for text transformation. Style: ${Array.isArray(e.char)?e.char[0].style:(o=e.char)==null?void 0:o.style}. Falling back to standard text attributes.`),pn(e,t);return}const c={};Ig.forEach(p=>{t.hasFormat(p)&&(c[p]="true")});const u={};Object.entries(e).forEach(([p,f])=>{p==="segment"||p==="char"||(typeof f=="string"?u[p]=f:f===!0?u[p]="true":f===!1&&(u[p]="false"))});const d={...a.getUnknownAttributes()??{},...c,...u};return Object.keys(d).length>0&&a.setUnknownAttributes(d),pn(e,t),i}function Vp(t,e){for(const n of Object.keys(e)){const r=e[n];if(n==="char"&&Ue(t)&&co(e)){const o=r;if(t.setMarker(o.style),typeof o.cid=="string"){const i=o.cid;m.$setState(t,oo,()=>i)}const s=yt(o,ca);s&&Object.keys(s).length>0&&t.setUnknownAttributes({...t.getUnknownAttributes()??{},...s});continue}typeof r=="string"&&(hn(t)||wn(t)||$a(t)||Se(t)||ii(t)?t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r}):(Jn(t)||jt(t)||Ue(t))&&(n==="style"&&!Jn(t)?t.setMarker(r):n==="code"&&Jn(t)?t.setCode(r):t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r})),n==="segment"&&m.$setState(t,so,()=>r))}}function LC(t,e,n){if(e<=0)return;const r=m.$getRoot();let o=0,s=e;function i(a){if(s<=0)return!0;if(m.$isTextNode(a)){let c=a.getTextContentSize();if(t<o+c&&o<t+s){const u=Math.max(0,t-o),d=c-u,p=Math.min(s,d);p>0&&(a.spliceText(u,p,""),a.getTextContentSize()===0&&a.remove(),n==null||n.debug(`Deleted ${p} length from TextNode (key: ${a.getKey()}) at nodeOffset ${u}. Original targetIndex: ${t}, current currentIndex: ${o}.`),s-=p,c-=p)}o+=c}else if(Mn(a))t<=o&&o<t+s?(a.remove(),n==null||n.debug(`Deleted embed node (key: ${a.getKey()}) at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`),s-=1):o+=1;else if(mn(a)){const c=a.getChildren().slice(),u=a.getChildren();for(const d of u){if(s<=0)break;if(i(d)&&s<=0)return!0}if(t<=o&&o<t+s&&mn(a)){s-=1;const d=a.getChildren().length;if(c.length>0&&d===0){const p=a.getParent();((p==null?void 0:p.getChildren())??[]).length>1?(a.remove(),n==null||n.debug(`Removed entire ParaNode that had all its content deleted at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)):(a.replace(Nn(),!0),n==null||n.debug(`Replaced last ParaNode with ImpliedParaNode at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`))}else if(s>0){const p=a.getNextSibling();if(p&&kn(p)){let f=o+1;const h=p.getChildren();for(const x of h){if(s<=0)break;const N=o;if(o=f,i(x)){o=N;break}m.$isTextNode(x)?f+=x.getTextContentSize():Mn(x)&&(f+=1),o=N}const v=p.getChildren();for(const x of v)x.remove(),a.append(x);p.remove(),n==null||n.debug(`Merged next paragraph into current one after deleting symbolic close at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)}else a.replace(Nn(),!0)}else jt(a)?a.replace(Nn(),!0):a.remove()}o+=1}else if(m.$isElementNode(a)){const c=a.getChildren();for(const u of c){if(s<=0)break;if(i(u)&&s<=0)return!0}}return s<=0}i(r),s>0&&(n==null||n.warn(`Delete operation could not remove all requested characters. Remaining to delete: ${s}. Original targetIndex: ${t}, OT length: ${e}. Final currentIndex: ${o}`))}function PC(t,e,n,r,o){if(e===Hs)return Hp(t,n,o);if(e.endsWith(Hs)&&!Au(n)){const s=e.slice(0,-1);let i=0;if(s.length>0){if(co(n))throw new Error("Text + LF should not have char attributes");i+=ua(t,s,n,o)}return i+=Hp(t+i,n,o),i}else return co(n)?$C(t,e,n,r,o):ua(t,e,n,o)}function $C(t,e,n,r,o){o==null||o.debug(`Attempting to insert CharNode with text "${e}" and attributes ${JSON.stringify(n.char)} at index ${t}`);const s=m.$createTextNode(e);pn(n,s);let i;{let h=function(N){if(m.$isTextNode(N)){const C=N.getTextContentSize();if(t>=x&&t<x+C){const _=N.getParent();return Ue(_)&&(i=_),!0}x+=C}else if(Mn(N))x+=1;else if(Ue(N)){const C=N.getChildren();for(const _ of C)if(h(_))return!0}else if(m.$isElementNode(N)){const C=N.getChildren();for(const _ of C)if(h(_))return!0;mn(N)&&(x+=1)}return!1};const v=m.$getRoot();let x=0;h(v)}let a=n.char;if(Array.isArray(a)){if(i){const h=a[0];h&&lo(h,i)?(a=a.slice(1),a.length===1&&(a=a[0])):i=void 0}}else i&&(lo(a,i)||(i=void 0));const c=typeof n.segment=="string"?n.segment:void 0,u=ui(a,r,s,c,i?[i]:void 0);if(u.length===0)return e.length;const d=u.find(Ue);if(!d)return o==null||o.error(`CharNode style is missing for text "${e}". Attributes: ${JSON.stringify(n.char)}. Falling back to rich text insertion.`),ua(t,e,void 0,o);const p={};for(const[h,v]of Object.entries(n))h!=="char"&&h!=="segment"&&typeof v=="string"&&(p[h]=v);Object.keys(p).length>0&&d.setUnknownAttributes(p);let f=!0;for(const h of u)if(!Og(t,h,o)){f=!1;break}return f?e.length:(o==null||o.error(`Failed to insert CharNode with text "${e}" at index ${t}. Falling back to rich text.`),ua(t,e,void 0,o))}function ua(t,e,n,r){if(e.length<=0)return r==null||r.debug("Attempted to insert empty string. No action taken."),0;const o=m.$getRoot();let s=0,i=!1;function a(c){if(i)return!0;if(m.$isTextNode(c)){const u=c.getTextContentSize();if(t>=s&&t<=s+u){const d=t-s,p=m.$createTextNode(e);if(pn(n,p),d===0)c.insertBefore(p);else if(d===u){const f=c.getParent();Ue(f)&&!co(n)?f.insertAfter(p):c.insertAfter(p)}else{const[,f]=c.splitText(d);f.insertBefore(p)}return r==null||r.debug(`Inserted text "${e}" in/around TextNode (key: ${c.getKey()}) at nodeOffset ${d}. Original targetIndex: ${t}, currentIndex at node start: ${s}.`),i=!0,!0}s+=u}else if(Mn(c))s+=1;else if(Ue(c)){if(!i&&t===s){const d=m.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=m.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}}else if(mn(c)){if(!i&&t===s){const d=m.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=m.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}s+=1}else if(m.$isElementNode(c)){const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}}return i}if(a(o),!i&&t===s){r==null||r.debug(`Insertion point matches end of document (targetIndex: ${t}, final currentIndex: ${s}). Appending text to new ParaNode.`);const c=m.$createTextNode(e);pn(n,c);const u=Nn().append(c);o.append(u),i=!0}return i?e.length:(r==null||r.warn(`$insertRichText: Could not find insertion point for text "${e}" at targetIndex ${t}. Final currentIndex: ${s}. Text not inserted.`),0)}function Og(t,e,n){const r=m.$getRoot();let o=0,s=!1;function i(a){if(s)return!0;if(a===r&&t===0&&!r.getFirstChild())return e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into empty root, wrapped in ImpliedParaNode. targetIndex: ${t}`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} directly into empty root. targetIndex: ${t}`),r.append(e)),s=!0,!0;if(!m.$isElementNode(a))return!1;const c=a.getChildren();for(const u of c){if(t===o&&!s){if(a===r&&e.isInline())if(kn(u)){n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into existing ${u.getType()} at beginning. targetIndex: ${t}`);const d=u.getFirstChild();d?d.insertBefore(e):u.append(e)}else n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into root before ${u.getType()}, wrapping in ImpliedParaNode. targetIndex: ${t}`),u.insertBefore(Nn().append(e));else u.insertBefore(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) before child ${u.getType()} (key: ${u.getKey()}) in ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, currentIndex: ${o}`);return s=!0,!0}if(m.$isTextNode(u)){const d=u.getTextContentSize();if(!s&&t>o&&t<o+d){const p=t-o,[f]=u.splitText(p);return f.insertAfter(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) by splitting TextNode (key: ${u.getKey()}) at offset ${p}. targetIndex: ${t}, currentIndex at node start: ${o}`),s=!0,!0}o+=d}else if(Mn(u))o+=1;else if(Ue(u)){if(i(u))return!0}else if(mn(u)){const d=u;if(i(d))return!0;const p=o;if(cr(d)&&mn(e)&&t===p&&!s)return n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode (key: ${d.getKey()}) with block node '${e.getType()}' (key: ${e.getKey()}) at OT index ${t}.`),u.replace(e,!0),o=p+1,s=!0,!0;o+=1}else if(m.$isElementNode(u)&&i(u))return!0;if(s)return!0}return m.$isElementNode(a)&&!s&&(t===o||a===r&&t>o)?a===r?(e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending inline node ${e.getType()} to root. Wrapping in new ImpliedParaNode. targetIndex: ${t}, current document OT length: ${o}.`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending block node ${e.getType()} to root. targetIndex: ${t}, current document OT length: ${o}.`),r.append(e)),s=!0,!0):kn(a)?cr(a)&&jt(e)&&t===o?(n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode container (key: ${a.getKey()}) with ParaNode ${e.getType()} (key: ${e.getKey()}) via append logic. targetIndex: ${t}`),a.replace(e,!0),s=!0,!0):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to existing container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.append(e),s=!0,!0):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.insertAfter(e),s=!0,!0):(Ue(a)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting node ${e.getType()} after CharNode (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.append(e)):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)),s=!0,!0):s}return i(r),s||n==null||n.warn(`$insertNodeAtCharacterOffset: Could not find insertion point for node ${e.getType()} (key: ${e.getKey()}) at targetIndex ${t}. Final currentIndex: ${o}. Node not inserted.`),s}function FC(t,e,n,r,o){let s;return vs("chapter",e)?s=BC(e.insert.chapter,n):vs("verse",e)?s=qC(e.insert.verse,n):vs("ms",e)?s=UC(e.insert.ms):vs("unmatched",e)?s=VC(e.insert.unmatched):vs("note",e)&&(s=HC(e,n,r,o)),s?Og(t,s,o):(o==null||o.error(`$insertEmbedAtCurrentIndex: Cannot create LexicalNode for embed object: ${JSON.stringify(e.insert)}`),!1)}function Hp(t,e,n){let r;Au(e)?r=jg(e.para):GC(e)&&(r=zC(e.book)),r??(r=Nn());const o=r,s=jt(o),i=cr(o);let a=0,c=!1;function u(d){if(c)return!0;if(m.$isTextNode(d)){const p=d.getTextContentSize();if(t>=a&&t<=a+p){const f=d.getParent();if(jt(f)&&(s||i)){n==null||n.debug(`Splitting ParaNode (marker: ${f.getMarker()}) with LF attributes at targetIndex ${t}`);const h=t-a,[v]=h>0?d.splitText(h):[void 0];let x=v==null?void 0:v.getPreviousSibling();for(;x;){const N=x;x=x.getPreviousSibling();const C=o.getFirstChild();C?C.insertBefore(N):o.append(N)}return v&&o.append(v),f.insertBefore(o),c=!0,!0}}a+=p}else if(Mn(d))a+=1;else if(mn(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}if(t===a){if(cr(d)&&o)return n==null||n.debug(`Replacing ImpliedParaNode (key: ${d.getKey()}) with ParaNode at targetIndex ${t}`),d.replace(o,!0),c=!0,!0;if(jt(d)&&o){const f=d;return n==null||n.debug(`Creating new block node with LF attributes after existing ParaNode (marker: ${f.getMarker()}) at targetIndex ${t}`),f.insertAfter(o),c=!0,!0}}if(a+=1,t===a&&jt(d)&&o)return n==null||n.debug(`Creating new block node after existing ParaNode (marker: ${d.getMarker()}) at targetIndex ${t}`),d.insertAfter(o),c=!0,!0}else if(m.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}}return c}return u(m.$getRoot()),c||n==null||n.warn(`Could not find location to handle newline with para attributes at targetIndex ${t}. Final currentIndex: ${a}.`),1}function BC(t,e){if(!t)return;const{number:n,sid:r,altnumber:o,pubnumber:s}=t;if(!n)return;const i=yt(t,P1);let a;if(e.markerMode==="editable")a=Qw(n,r,o,s,i);else{const c=e.markerMode==="visible";a=du(n,c,r,o,s,i)}return a}function qC(t,e){if(!t)return;const{style:n,number:r,sid:o,altnumber:s,pubnumber:i}=t;if(!r)return;const a=yt(t,$1);let c;if(e.markerMode==="editable"){if(!n)return;const u=li(n,r);c=dg(r,u,o,s,i,a)}else{const u=e.markerMode==="visible";c=Cu(r,u,o,s,i,a)}return c}function UC(t){if(!t)return;const{style:e,sid:n,eid:r}=t;if(!e)return;const o=yt(t,F1);return ag(e,n,r,o)}function VC(t){if(!t)return;const{marker:e}=t;if(e)return yu(e)}function HC(t,e,n,r){var o;const s=t.insert;if(!s.note)return;const{style:i,caller:a,category:c,contents:u}=s.note;if(!i||a==null)return;a===""&&(r==null||r.warn("Note has empty caller. Only use for note editing."));const d=yt(s.note,B1),p=(o=t.attributes)==null?void 0:o.segment;let f;p&&typeof p=="string"&&(f=p);const h=[];for(const v of(u==null?void 0:u.ops)??[])if(typeof v.insert=="string")if(co(v.attributes)){const x=ui(v.attributes.char,e,m.$createTextNode(v.insert),void 0,h);h.push(...x)}else h.push(m.$createTextNode(v.insert));return kg(i,a,h,e,n,f).setCategory(c).setUnknownAttributes(d)}function zC(t){const{style:e,code:n}=t;if(!e||e!==qs||!n||!gn.isValidBookCode(n))return;const r=yt(t,L1);return Ww(n,r)}function jg(t){const{style:e}=t;if(!e)return;const n=yt(t,I1);return Us(e,n)}function ui(t,e,n,r,o){if(Array.isArray(t)){if(t.length===0)throw new Error("Empty charAttr array");const s=t[0],i=o==null?void 0:o[o.length-1];if(Ue(i)&&lo(s,i))return t.length>1?ui(t.slice(1),e,n).forEach(d=>i.append(d)):n&&i.append(n),[];const a=t.reduceRight((d,p,f)=>{const h=Hn(p.style,yt(p,ca));if(typeof p.cid=="string"&&m.$setState(h,oo,()=>p.cid),r&&f===t.length-1&&m.$setState(h,so,()=>r),d)if(Ue(d)){const v=d.getMarker(),x=[];Tl(v,x,e),x.forEach(C=>h.append(C)),h.append(d);const N=[];Sl(v,N,e),N.forEach(C=>h.append(C))}else h.append(d);return h},n),c=[],u=t[0];return Tl(u.style,c,e),c.push(a),Sl(u.style,c,e),c}else{const s=o==null?void 0:o[o.length-1];if(Ue(s)&&lo(t,s))return n&&s.append(n),[];const i=[];Tl(t.style,i,e);const a=Hn(t.style,yt(t,ca));return typeof t.cid=="string"&&m.$setState(a,oo,()=>t.cid),r&&m.$setState(a,so,()=>r),n&&a.append(n),i.push(a),Sl(t.style,i,e),i}}function Tl(t,e,n){(n==null?void 0:n.markerMode)==="editable"?e.push(Ko(t)):(n==null?void 0:n.markerMode)==="visible"&&e.push(Yo("marker",fr(t)))}function Sl(t,e,n,r=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((n==null?void 0:n.markerMode)==="editable"?r?e.push(Ko("","selfClosing")):e.push(Ko(t,"closing")):(n==null?void 0:n.markerMode)==="visible"&&e.push(Yo("marker",Go(r?"":t))))}function GC(t){return!!t&&!!t.book&&typeof t.book=="object"&&t.book!==null&&"style"in t.book&&typeof t.book.style=="string"&&"code"in t.book&&typeof t.book.code=="string"}function Au(t){return!!t&&!!t.para&&typeof t.para=="object"&&t.para!==null&&"style"in t.para&&typeof t.para.style=="string"}function co(t){return!!t&&!!t.char&&typeof t.char=="object"&&t.char!==null&&(!Array.isArray(t.char)&&"style"in t.char&&typeof t.char.style=="string"||Array.isArray(t.char)&&t.char.length>0&&"style"in t.char[0]&&typeof t.char[0].style=="string")}function KC(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&Object.keys(t).length===0}function pn(t,e){if(t)for(const n of Object.keys(t)){if(n==="segment"&&typeof t[n]=="string"){const r=t[n];m.$setState(e,so,()=>r);continue}if(YC(n)){const r=!!t[n],o=n,s=e.hasFormat(o);(r&&!s||!r&&s)&&e.toggleFormat(o)}}}const Ig=["bold","underline","strikethrough","italic","highlight","code","subscript","superscript","lowercase","uppercase","capitalize"];function YC(t){return Ig.includes(t)}function WC({viewOptions:t}){const[e]=_e();return JC(e,t),null}function JC(t,e){w.useEffect(()=>{if(!t.hasNodes([pr,qt,xt]))throw new Error("ArrowNavigationPlugin: ImmutableChapterNode, ImmutableVerseNode or NoteNode not registered on editor!");const n=r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return!1;const o=m.$getSelection();if(!m.$isRangeSelection(o)||!o.isCollapsed())return!1;const s=t.getRootElement();if(!s)return!1;const i=s.dir||"ltr";let a=!1;return XC(i,r.key)?a=ZC(o):QC(i,r.key)&&(a=eE(o,e)),a&&r.preventDefault(),a};return t.registerCommand(m.KEY_DOWN_COMMAND,n,m.COMMAND_PRIORITY_HIGH)},[t,e])}function XC(t,e){return t==="ltr"&&e==="ArrowRight"||t==="rtl"&&e==="ArrowLeft"}function QC(t,e){return t==="ltr"&&e==="ArrowLeft"||t==="rtl"&&e==="ArrowRight"}function ZC(t){var e,n,r;const o=t.anchor.getNode(),s=Z_(t);if(Se(s)&&!ci(s.getFirstChild())){if(kn(o)){if(t.anchor.offset===o.getChildrenSize())return!1}else if(t.anchor.offset!==o.getTextContentSize())return!1;if(s.getIsCollapsed()){if(s.is((e=s.getParent())==null?void 0:e.getLastChild()))return(r=(n=s.getParent())==null?void 0:n.getNextSibling())==null||r.selectStart(),!0}else return aa(s.getFirstChild())?s.select(2,2):s.select(1,1),!0}if(kn(o)&&Se(s)&&s.getIsCollapsed()){const a=s.getNextSibling();return a?a.selectStart():s.selectEnd(),!0}const i=s==null?void 0:s.getParent();if(aa(s)&&Se(i)&&s.is(i==null?void 0:i.getLastChild())){const a=i.getNextSibling();return a?a.selectStart():i.selectEnd(),!0}return!1}function eE(t,e){const n=e1(t);if(ai(n)&&!n.getPreviousSibling())return!0;if(t.anchor.offset!==0)return!1;const r=t.anchor.getNode();if(Jn(r.getParent()))return!0;if(Se(n)&&n.getIsCollapsed()){const s=n.getPreviousSibling();if(!ls(s))return!1;const i=n.getParent();if(!i)return!1;const a=n.getIndexWithinParent();return i.select(a,a),!0}if(kn(n)&&(e==null?void 0:e.noteMode)==="collapsed"){const s=n.getLastChild();if(!s)return!1;const i=Ds(s,a=>Se(a));if(Se(i)&&i.getIsCollapsed()){const a=i.getParent();if(!a)return!1;const c=i.getIndexWithinParent();return a.select(c,c),!0}}const o=pg(r);if(!o||o.getIsCollapsed())return!1;if(Pr(n)){const s=o.getParent();if(!s)return!1;const i=o.getIndexWithinParent();return s.select(i,i),!0}return!1}function tE(){const[t]=_e();return nE(t),null}function nE(t){w.useEffect(()=>{if(!t.hasNodes([Qe]))throw new Error("CharNodePlugin: CharNode not registered on editor!");return t.registerNodeTransform(Qe,rE)},[t])}function rE(t){if(!Ue(t))return;if(t.isEmpty()){t.remove();return}const e=t.getMarker(),n=m.$getState(t,oo),r=t.getUnknownAttributes(),o=t.getNextSibling();Ue(o)&&lo({style:e,cid:n},o)&&or(r,o.getUnknownAttributes())&&(t.append(...o.getChildren()),o.remove());const s=t.getPreviousSibling();Ue(s)&&lo({style:e,cid:n},s)&&or(r,s.getUnknownAttributes())&&(s.append(...t.getChildren()),t.remove())}function Lg(t){return t.replaceAll("	"," ")}const Du=t=>{navigator.clipboard.read().then(async e=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const n=new DataTransfer,r=e[0];for(const s of r.types){const i=await(await r.getType(s)).text();n.setData(s,Lg(i))}const o=new ClipboardEvent("paste",{clipboardData:n});t.dispatchCommand(m.PASTE_COMMAND,o)})},Mu=t=>{navigator.clipboard.read().then(async()=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const e=new DataTransfer,n=await navigator.clipboard.readText();e.setData("text/plain",Lg(n));const r=new ClipboardEvent("paste",{clipboardData:e});t.dispatchCommand(m.PASTE_COMMAND,r)})};function oE(){const[t]=_e();return w.useEffect(()=>{const e=n=>{const{key:r,shiftKey:o,metaKey:s,ctrlKey:i,altKey:a}=n;!(ql?s:i)||a||(!o&&r.toLowerCase()==="c"?(n.preventDefault(),t.dispatchCommand(m.COPY_COMMAND,null)):!o&&r.toLowerCase()==="x"?(n.preventDefault(),t.dispatchCommand(m.CUT_COMMAND,null)):r.toLowerCase()==="v"&&(n.preventDefault(),o?Mu(t):Du(t)))};return t.registerRootListener((n,r)=>{r!==null&&r.removeEventListener("keydown",e),n!==null&&n.addEventListener("keydown",e)})},[t]),null}function sE({logger:t}){const[e]=_e();return w.useEffect(()=>At(e.registerCommand(m.KEY_DOWN_COMMAND,n=>n.key!=="\\"&&n.key!=="/"?!1:(n.preventDefault(),!0),m.COMMAND_PRIORITY_NORMAL),e.registerCommand(m.PASTE_COMMAND,n=>{var r;const o=(r=n.clipboardData)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: paste containing backslash or forward slash ignored."),n.preventDefault(),!0)},m.COMMAND_PRIORITY_NORMAL),e.registerCommand(m.DROP_COMMAND,n=>{var r;const o=(r=n.dataTransfer)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: drag containing backslash or forward slash ignored."),n.preventDefault(),!0)},m.COMMAND_PRIORITY_NORMAL)),[e,t]),null}function iE({index:t,isSelected:e,onClick:n,onMouseEnter:r,option:o}){let s="item";return e&&(s+=" selected"),o.isDisabled&&(s+=" disabled"),l.jsx("li",{tabIndex:-1,className:s,ref:o.setRefElement,role:"option","aria-selected":e,"aria-disabled":o.isDisabled,id:"typeahead-item-"+t,onMouseEnter:r,onClick:o.isDisabled?void 0:n,children:l.jsx("span",{className:"text",children:o.title})},o.key)}function aE({options:t,selectedItemIndex:e,onOptionClick:n,onOptionMouseEnter:r}){return l.jsx("div",{className:"typeahead-popover",children:l.jsx("ul",{children:t.map((o,s)=>l.jsx(iE,{index:s,isSelected:e===s,onClick:()=>n(o,s),onMouseEnter:()=>r(s),option:o},o.key))})})}class Pi extends wy{constructor(e,n){super(e),de(this,"title"),de(this,"onSelect"),de(this,"isDisabled"),this.title=e,this.onSelect=n.onSelect.bind(this),this.isDisabled=n.isDisabled||!1}}function lE(t,e="editor-input"){return t?t.classList.contains(e):!1}function cE(){const[t]=_e(),[e,n]=w.useState(()=>!t.isEditable()),r=w.useRef(void 0),o=w.useRef(void 0),s=w.useRef(void 0),i=w.useMemo(()=>[new Pi("Cut",{onSelect:()=>{t.dispatchCommand(m.CUT_COMMAND,null)},isDisabled:e}),new Pi("Copy",{onSelect:()=>{t.dispatchCommand(m.COPY_COMMAND,null)}}),new Pi("Paste",{onSelect:()=>{Du(t)},isDisabled:e}),new Pi("Paste as Plain Text",{onSelect:()=>{Mu(t)},isDisabled:e})],[t,e]),a=w.useCallback((c,u,d)=>{t.update(()=>{c==null||c.onSelect(u),d()})},[t]);return w.useEffect(()=>{var c;o.current=((c=t.getRootElement())==null?void 0:c.className)??""},[t]),w.useEffect(()=>{const c=()=>{var u;(u=s.current)==null||u.call(s)};return window.addEventListener("scroll",c,!0),()=>{window.removeEventListener("scroll",c,!0)}},[]),w.useEffect(()=>t.registerEditableListener(c=>{n(!c)}),[t]),l.jsx(by,{options:i,onSelectOption:a,onWillOpen:c=>{r.current=c.target},menuRenderFn:(c,{selectedIndex:u,options:d,selectOptionAndCleanUp:p,setHighlightedIndex:f},{setMenuRef:h})=>(s.current=()=>p(void 0),c.current&&!lE(r.current,o.current)&&!og(r.current)?Nb.createPortal(l.jsx("div",{className:"typeahead-popover auto-embed-menu",style:{marginLeft:c.current.style.width,userSelect:"none",width:200},ref:h,children:l.jsx(aE,{options:i,selectedItemIndex:u,onOptionClick:(v,x)=>{v.isDisabled||(f(x),p(v))},onOptionMouseEnter:v=>{f(v)}})}),c.current):null)})}function uE({isEditable:t}){const[e]=_e();return w.useLayoutEffect(()=>{e.setEditable(t)},[e,t]),null}function dE({scripture:t,nodeOptions:e,editorAdaptor:n,viewOptions:r,logger:o}){const[s]=_e();return w.useEffect(()=>{var i;(i=n.initialize)==null||i.call(n,e,o)},[n,o,e]),w.useEffect(()=>{var i;(i=n.reset)==null||i.call(n);const a=n.serializeEditorState(t,r);if(a==null){o==null||o.warn("LoadStatePlugin: serializedEditorState was null or undefined. Skipping editor update.");return}try{const c=s.parseEditorState(a);queueMicrotask(()=>{s.update(()=>{s.setEditorState(c),s.dispatchCommand(m.CLEAR_HISTORY_COMMAND,void 0)},{tag:cu})})}catch{o==null||o.error("LoadStatePlugin: error parsing or setting editor state.")}},[s,n,o,t,r]),null}function pE({expandedNoteKeyRef:t,nodeOptions:e,viewOptions:n,logger:r}){const[o]=_e();return fE(e,r),hE(o,t,n,r),null}function fE(t,e){const n=w.useRef(void 0),r=t.noteCallers;w.useEffect(()=>{let o=r;(!o||o.length<=0)&&(o=cC),n.current!==o&&(n.current=o,_E("note-callers",o,e))},[e,r])}function hE(t,e,n,r){w.useEffect(()=>{if(!t.hasNodes([Qe,xt,Tn]))throw new Error("NoteNodePlugin: CharNode, NoteNode or ImmutableNoteCallerNode not registered on editor!");const o=s=>t.update(()=>yE(s));return At(t.registerNodeTransform(xt,s=>wE(s,n)),t.registerNodeTransform(Qe,gE),t.registerNodeTransform(m.TextNode,mE),t.registerNodeTransform(Tn,bE),t.registerMutationListener(Tn,(s,{prevEditorState:i})=>vE(s,i)),t.registerCommand(m.SELECTION_CHANGE_COMMAND,()=>xE(t,e,n,r),m.COMMAND_PRIORITY_LOW),t.registerRootListener((s,i)=>{i!==null&&i.removeEventListener("dblclick",o),s!==null&&s.addEventListener("dblclick",o)}))},[t,e,r,n])}function wE(t,e){const n=t.getChildren();if(!n.some(r=>Pr(r))&&(e==null?void 0:e.markerMode)!=="editable"&&t.getCaller()!==""&&t.remove(),n.length>0){const r=n[0];m.$isTextNode(r)&&!ci(r)&&t.insertBefore(r)}}function gE(t){const e=t.getParentOrThrow(),n=e.getChildren(),r=n.find(i=>Pr(i));if(!Ue(t)||!Se(e)||!r)return;const o=vu(n);r.getPreviewText()!==o&&r.setPreviewText(o);const s=t.getNextSibling();m.$isTextNode(s)?s.getTextContent()!==qe&&s.setTextContent(qe):t.insertAfter(m.$createTextNode(qe))}function mE(t){const e=pg(t),n=e==null?void 0:e.getChildren(),r=n==null?void 0:n.find(s=>Pr(s));if(!m.$isTextNode(t)||!Se(e)||!r||!n)return;const o=vu(n);r.getPreviewText()!==o&&r.setPreviewText(o),!(ci(t)||!Se(t.getParent()))&&t.getTextContent()!==qe&&(t.setTextContent(qe),t.selectEnd())}function bE(t){if(!Pr(t))return;const e=t.getNextSibling();!m.$isTextNode(e)||ci(e)?t.insertAfter(m.$createTextNode(qe)):e.getTextContent()!==qe&&e.setTextContent(qe)}function vE(t,e){for(const[n,r]of t){if(r!=="destroyed")continue;const o=e.read(()=>{const i=m.$getNodeByKey(n),a=i==null?void 0:i.getParent();return Pr(i)&&Se(a)&&a.getCaller()===io}),s=document.querySelector(".editor-input");!o||!s||(s.classList.add("reset-counters"),s.offsetHeight,s.classList.remove("reset-counters"))}}function xE(t,e,n,r){var o;if((n==null?void 0:n.noteMode)!=="expandInline")return!1;const s=m.$getSelection();if(!m.$isRangeSelection(s)||!s.isCollapsed())return!1;const i=s.anchor,a=i.getNode();if(e.current){const c=Ds(a,u=>Se(u));if(c)e.current!==c.getKey()&&(e.current=c.getKey());else{const u=m.$getNodeByKey(e.current);u&&!u.getIsCollapsed()&&(r==null||r.debug("Cursor moved away from NoteNode, collapsing it"),xs(t,e.current,r)),e.current=void 0}}if(i.offset===0){const c=a.getPreviousSibling();if(Se(c)){r==null||r.debug("Cursor is just after a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,xs(t,u,r)}}if(i.offset===a.getTextContentSize()){const c=a.getNextSibling();if(Se(c)){r==null||r.debug("Cursor is just before a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,xs(t,u,r)}else if(!c){const u=Ds(a,d=>Se(d));if(u&&u.getIsCollapsed()&&kn(u.getParent())&&u.is((o=u.getParent())==null?void 0:o.getLastChild())){r==null||r.debug("Cursor is at end of note at end of para");const d=u.getKey();e.current=d,xs(t,d,r)}}}if(kn(a)){const c=a.getChildAtIndex(i.offset),u=c==null?void 0:c.getPreviousSibling();if(ls(u)&&Se(c)){r==null||r.debug("Cursor is between verse and NoteNode");const d=c.getKey();c.getIsCollapsed()?e.current=d:e.current=void 0,xs(t,d,r)}}return!1}function xs(t,e,n){const r=m.$getNodeByKey(e);try{r==null||r.toggleIsCollapsed()}catch(o){if(o instanceof Error&&o.message.includes("read only"))n==null||n.warn("Fallback triggered after stabilization - edge case"),setTimeout(()=>{t.update(()=>{r==null||r.toggleIsCollapsed()})},0);else throw o}}function yE(t){const e=m.$getSelection();if(!m.$isRangeSelection(e))return;const n=e.anchor,r=e.focus,o=n.getNode(),s=r.getNode();if(Se(o)&&m.$isTextNode(s)){t.preventDefault();const i=m.$createRangeSelection();i.anchor.set(s.getKey(),0,"text"),i.focus.set(s.getKey(),r.offset,"text"),m.$setSelection(i)}}function _E(t,e,n){for(const r of document.styleSheets)try{const o=r.cssRules||r.rules;for(const s of o)if(CE(s,t)){const i=e.map(a=>`"${a}"`).join(" ");s.symbols=i;return}}catch{continue}n==null||n.warn(`Editor: counter style "${t}" not found.`)}function CE(t,e){return typeof t=="object"&&t!==null&&"name"in t&&t.name===e&&"symbols"in t&&typeof t.symbols=="string"}function EE({onChange:t}){const[e]=_e();return w.useEffect(()=>e.registerCommand(m.SELECTION_CHANGE_COMMAND,()=>{const n=e.read(()=>yg());return t==null||t(n),!1},m.COMMAND_PRIORITY_LOW),[e,t]),null}function kE(){const[t]=_e();return NE(t),null}function NE(t){w.useEffect(()=>{if(!t.hasNodes([Yt]))throw new Error("ParaNodePlugin: ParaNode not registered on editor!");return t.registerNodeTransform(Yt,e=>TE(e,t))},[t])}function TE(t,e){ku(e,t.getKey())&&Tg(t.getFirstChild()),!(!jt(t)||t.getMarker()!=="b"||t.isEmpty()||!e.getEditorState().read(()=>{const n=m.$getNodeByKey(t.getKey());return jt(n)&&((n==null?void 0:n.isEmpty())??!1)}))&&t.clear()}function Pg({onStateChange:t}){const[e]=_e(),[n,r]=w.useState(e),o=w.useRef(!1),s=w.useRef(!1),i=w.useRef(),a=w.useCallback(()=>{const c=m.$getSelection();if(m.$isRangeSelection(c)){const u=c.anchor.getNode();let d=u.getKey()==="root"?u:Ds(u,f=>{const h=f.getParent();return h!==null&&m.$isRootOrShadowRoot(h)});d===null&&(d=u.getTopLevelElementOrThrow());const p=d.getKey();n.getElementByKey(p)!==null&&(jt(d)||Jn(d)||ai(d))&&(i.current=d.getMarker(),t==null||t(o.current,s.current,i.current))}},[n,t]);return w.useEffect(()=>e.registerCommand(m.SELECTION_CHANGE_COMMAND,(c,u)=>(a(),r(u),!1),m.COMMAND_PRIORITY_CRITICAL),[e,a]),w.useEffect(()=>At(n.registerUpdateListener(({editorState:c})=>{c.read(()=>{a()})}),n.registerCommand(m.CAN_UNDO_COMMAND,c=>(o.current=c,t==null||t(o.current,s.current,i.current),!1),m.COMMAND_PRIORITY_CRITICAL),n.registerCommand(m.CAN_REDO_COMMAND,c=>(s.current=c,t==null||t(o.current,s.current,i.current),!1),m.COMMAND_PRIORITY_CRITICAL)),[a,n,t]),null}function SE({textDirection:t}){const[e]=_e();return AE(e,t),DE(e),null}function AE(t,e){w.useEffect(()=>{function n(){const r=t.getRootElement();if(!r||e==="auto")return;r.dir=e;const o=t._config.theme.placeholder,s=document.getElementsByClassName(o)[0];s&&(s.dir=e)}return n(),t.registerUpdateListener(({dirtyElements:r})=>{r.size>0&&n()})},[t,e])}function DE(t){w.useEffect(()=>{const e=n=>{if(n.key!=="ArrowLeft"&&n.key!=="ArrowRight")return!1;const r=m.$getSelection();if(!m.$isRangeSelection(r))return!1;const o=r.anchor.getNode(),s=Ds(o,p=>a1(p,t)==="p");if(!s)return!1;const i=t.getElementByKey(s.getKey());if(!i)return!1;const a=i.parentElement,c=i.dir||"ltr",u=((a==null?void 0:a.dir)??"")||"ltr";if(!a||c===u)return!1;const d=a.dir==="rtl"&&n.key==="ArrowLeft"||a.dir==="ltr"&&n.key==="ArrowRight";return r.modify("move",d,"character"),n.preventDefault(),!0};return t.registerCommand(m.KEY_DOWN_COMMAND,e,m.COMMAND_PRIORITY_HIGH)},[t])}function ME(){const[t]=_e();return RE(t),null}function RE(t){w.useEffect(()=>{if(!t.hasNodes([Qe,qt,xt,m.TextNode,Bt]))throw new Error("TextSpacingPlugin: CharNode, ImmutableVerseNode, NoteNode, TextNode or VerseNode not registered on editor!");return At(t.registerNodeTransform(m.TextNode,OE),t.registerNodeTransform(m.TextNode,e=>jE(e,t)),t.registerNodeTransform(Bt,zp),t.registerNodeTransform(qt,zp))},[t])}function OE(t){if(!t.isAttached())return;const e=t.getTextContent(),n=t.getNextSibling(),r=t.getParent();t.getMode()!=="normal"||e.endsWith(" ")&&e.length>1||Se(n)||Ue(r)||St(r)||ii(r)||(e===" "&&!wn(n)?t.setTextContent(""):Eu(t))}function jE(t,e){const n=t.getParent();!ii(n)||!t.isAttached()||ku(e,t.getKey())&&n.insertAfter(t)}function zp(t){if(!t.isAttached())return;const e=t.getPreviousSibling();e&&!wn(e)&&!m.$isTextNode(e)&&!ii(e)&&t.insertBefore(m.$createTextNode(" "))}function IE({trigger:t,scriptureReference:e,contextMarker:n,getMarkerAction:r}){const{markersMenuItems:o}=SC({scriptureReference:e,contextMarker:n,getMarkerAction:r});return l.jsx(TC,{trigger:t,items:o})}function LE({trigger:t,scrRef:e,getMarkerAction:n}){const{book:r,chapterNum:o,verseNum:s,verse:i}=e,a=w.useMemo(()=>e,[r,o,s,i]),[c]=_e(),[u]=PE(c);return $E(c),l.jsx(IE,{trigger:t,scriptureReference:a,contextMarker:u,getMarkerAction:n})}function PE(t){const[e,n]=w.useState();return w.useEffect(()=>t.registerCommand(m.SELECTION_CHANGE_COMMAND,()=>(t.read(()=>{const r=m.$getSelection();if(!m.$isRangeSelection(r)){e&&n(void 0);return}const o=m.$getNodeByKey(r.anchor.key),s=m.$getNodeByKey(r.focus.key);if(!o||!s){e&&n(void 0);return}const i=n1(o,s);if(!i||!j1(i)){e&&n(void 0);return}const a=i.getMarker();e!==a&&n(a)}),!1),m.COMMAND_PRIORITY_LOW),[e,t]),[e]}function $E(t){w.useEffect(()=>{if(!t.hasNodes([Bt,qt]))throw new Error("UsjNodesMenuPlugin: VerseNode or ImmutableVerseNode not registered on editor!");const e={},n={};return At(t.registerNodeTransform(qt,r=>Gp(r,t,e)),t.registerNodeTransform(Bt,r=>Gp(r,t,e)),t.registerMutationListener(qt,r=>Jp(r,t,e,n)),t.registerMutationListener(Bt,r=>Jp(r,t,e,n)))},[t])}function Gp(t,e,n){m.$hasUpdateTag(cu)||ku(e,t.getKey())&&qE(t,n)}function Kp(t){return RegExp(/(\d+)([a-zA-Z]+)?(-(\d+)([a-zA-Z]+)?)?/).exec(t)}const Yp=2,FE=3,Wp=4,BE=5;function qE(t,e){var n;const r=gu(t),o=r==null?void 0:r.getNumber();if(!o)return;const s=e[o];if(!s)return;let i=parseInt(t.getNumber()),a=((n=Kp(t.getNumber()))==null?void 0:n[Yp])??"";s.forEach(c=>{const u=m.$getNodeByKey(c);if(!u)return;const d=u.getNumber(),p=parseInt(d),f=Kp(d),h=!!(f!=null&&f[FE]),v=h?parseInt(f[Wp]):p;if(v<i||p>i||v===i&&a)return;const x=(f==null?void 0:f[Yp])??"",N=(f==null?void 0:f[BE])??"",C=h?dc(parseInt(f[Wp]),void 0):"";let _=`${x}`;_+=h?`-${C}${N}`:"";const D=dc(p,void 0);u.setNumber(`${D}${_}`),i=parseInt(h?C:D),a=h?N:x})}function Jp(t,e,n,r){e.getEditorState().read(()=>{for(const[o,s]of t){const i=m.$getNodeByKey(o);if(wn(i)){if(s==="created"){const a=gu(i);if(!a)continue;const c=a.getNumber();n[c]||(n[c]=[]),n[c].push(o),r[o]=c}else if(s==="destroyed"){const a=r[o],c=n[a];if(!c)continue;const u=c.findIndex(d=>d===o);if(u===-1)continue;c.splice(u,1),Reflect.deleteProperty(r,o)}}}})}const $g="formatted",UE="unformatted";let Ru;function VE(t){const e=HE(t);if(!e)throw new Error(`Invalid view mode: ${t}`);Ru=e}VE($g);const Ou=()=>Ru;function HE(t){let e;switch(t){case $g:e={markerMode:"hidden",noteMode:"collapsed",hasSpacing:!0,isFormattedFont:!0};break;case UE:e={markerMode:"editable",noteMode:"expanded",hasSpacing:!1,isFormattedFont:!1};break}return e}function zE(t){if(t)return t.markerMode==="editable"?Bt:qt}function GE(t){const e=[],n=t??Ru;return n&&(e.push(`${A_}${n.markerMode}`),n.hasSpacing&&e.push(T_),n.isFormattedFont&&e.push(S_)),e}let hc;function KE(t){t&&(hc=t)}function YE(t){return t.isEmpty()?zc:WE(t.toJSON())}function WE(t){if(!t.root||!t.root.children)return;const e=t.root.children;if(e.length===1&&pu(e[0])&&(!e[0].children||e[0].children.length===0))return zc;const n=Fg(e),r=gr(n);return r?{type:Rs,version:Os,content:r}:void 0}function JE(t,e){const{type:n,marker:r,unknownAttributes:o}=t;let s;return t.code!==""&&(s=t.code),wt({type:n,marker:r,code:s,...o,content:e})}function XE(t){const{marker:e,number:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t;return wt({type:jn.getType(),marker:e,number:n,sid:r,altnumber:o,pubnumber:s,...i})}function QE(t,e){const{marker:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t,a=e&&typeof e[0]=="string"?e[0]:void 0;let{number:c}=t;return c=fg(n,a,c),wt({type:jn.getType(),marker:n,number:c,sid:r,altnumber:o,pubnumber:s,...i})}function ZE(t){const{marker:e,sid:n,altnumber:r,pubnumber:o,unknownAttributes:s}=t,{text:i}=t;let{number:a}=t;return a=fg(e,i,a),wt({type:Bt.getType(),marker:e,number:a,sid:n,altnumber:r,pubnumber:o,...s})}function ek(t,e){const{type:n,marker:r,unknownAttributes:o}=t,s=r===""?void 0:r;return e==null||e.forEach((i,a)=>{typeof i=="string"&&i.startsWith(qe)&&(e[a]=i.slice(1))}),wt({type:n,marker:s,...o,content:e})}function tk(t,e){const{type:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function nk(t,e){const{type:n,marker:r,caller:o,category:s,unknownAttributes:i}=t;return wt({type:n,marker:r,caller:o,category:s,...i,content:e})}function So(t){const{type:e,marker:n,sid:r,eid:o,unknownAttributes:s}=t;return wt({type:e,marker:n===""?void 0:n,sid:r,eid:o,...s})}function rk(t){return t.text}function ok(t,e){const{tag:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function sk(t){const{marker:e}=t;return{type:la,marker:e===""?void 0:e}}function Xp(t,e){const n=t[t.length-1];n&&typeof n=="string"?t[t.length-1]=n+e:t.push(e)}function ik(t,e,n,r,o){const s=Qn.getType(),i=e.filter(a=>!n.includes(a));if(n.filter(a=>!e.includes(a)).forEach(a=>{const c=So({type:s,marker:jo,eid:a});o.push(c)}),i.forEach(a=>{const c=So({type:s,marker:ao,sid:a});o.push(c)}),e.length===0){const a=So({type:s,marker:ao});o.push(a)}if(o.push(...t),e.length===0){const a=So({type:s,marker:jo});o.push(a)}(!r||!f1(r))&&e.forEach(a=>{const c=So({type:s,marker:jo,eid:a});o.push(c)})}function gr(t,e){const n=[];let r,o=[];return t.forEach((s,i)=>{const a=s,c=s,u=s,d=s,p=s,f=s,h=s,v=s;switch(s.type){case gn.getType():n.push(JE(a,gr(a.children)));break;case pr.getType():n.push(XE(s));break;case jn.getType():n.push(QE(c,gr(c.children)));break;case qt.getType():case Bt.getType():n.push(ZE(s));break;case Qe.getType():n.push(ek(u,gr(u.children)));break;case Yt.getType():n.push(tk(d,gr(d.children)));break;case xt.getType():n.push(nk(p,gr(p.children,p.caller)));break;case Ir.getType():case Tn.getType():case m.LineBreakNode.getType():case vo.getType():break;case Nt.getType():if(r=gr(h.children),r){const x=h.typedIDs[_r];if(x)ik(r,x,o,t[i+1],n),o=x;else{const N=r.shift();N&&(typeof N=="string"?Xp(n,N):n.push(N)),r.length>0&&n.push(...r)}}break;case Qn.getType():n.push(So(s));break;case m.TextNode.getType():f.text&&f.text!==qe&&!f.text.startsWith(au)&&(!e||f.text!==bu(e))&&Xp(n,rk(f));break;case bo.getType():n.push(ok(v,gr(v.children)));break;case Lr.getType():n.push(sk(s));break;default:hc==null||hc.error(`Unexpected node type '${s.type}'!`)}}),n&&n.length>0?n:void 0}function Fg(t){const e=t.findIndex(n=>pu(n));if(e>=0){const n=t.slice(0,e),r=t[e].children,o=Fg(t.slice(e+1));t=[...n,...r,...o]}return t}const Al={initialize:KE,deserializeEditorState:YE},Qp=Bg([]),ak={type:m.LineBreakNode.getType(),version:1};let da=[],be,zi,wc,ze;function lk(t,e){da=[],dk(t),pk(e)}function ck(t=0){}function uk(t,e){be=e??Ou();let n;return t?(t.type!==Rs&&(ze==null||ze.warn(`This USJ type '${t.type}' didn't match the expected type '${Rs}'.`)),t.version!==Os&&(ze==null||ze.warn(`This USJ version '${t.version}' didn't match the expected version '${Os}'.`)),t.content.length>0?n=mc(Ns(t.content)):n=[Qp]):n=[Qp],wc==null||wc(da),{root:{children:n,direction:null,format:"",indent:0,type:"root",version:1}}}function dk(t){t&&(zi=t),t!=null&&t.addMissingComments&&(wc=t.addMissingComments)}function pk(t){t&&(ze=t)}function fk(t){return!t||t.length!==1||typeof t[0]!="string"?"":t[0]}function hk(t){let{marker:e}=t;e!==qs&&(ze==null||ze.warn(`Unexpected book marker '${e}'!`)),e=e??qs;const{code:n}=t;(!n||!gn.isValidBookCode(n))&&(ze==null||ze.warn(`Unexpected book code '${n}'!`));const r=[];((be==null?void 0:be.markerMode)==="editable"||(be==null?void 0:be.markerMode)==="visible")&&r.push(po("marker",fr(e)+" "+n+qe));const o=fk(t.content);o&&r.push(uo(o));const s=yt(t);return wt({type:gn.getType(),marker:e,code:n??"",unknownAttributes:s,children:r,direction:null,format:"",indent:0,version:Yw})}function wk(t){let{marker:e}=t;e!==sa&&(ze==null||ze.warn(`Unexpected chapter marker '${e}'!`)),e=e??sa;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=yt(t);let a;return(be==null?void 0:be.markerMode)==="visible"&&(a=!0),(be==null?void 0:be.markerMode)==="editable"?wt({type:jn.getType(),marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,children:[uo(li(e,n)??"")],direction:null,format:"",indent:0,version:Xw}):wt({type:pr.getType(),marker:e,number:n??"",showMarker:a,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,version:ng})}function gk(t){let{marker:e}=t;e!==ia&&(ze==null||ze.warn(`Unexpected verse marker '${e}'!`)),e=e??ia;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=(zE(be)??qt).getType(),a=(be==null?void 0:be.markerMode)==="editable"?ug:Cg;let c,u;(be==null?void 0:be.markerMode)==="editable"?c=li(e,n):(be==null?void 0:be.markerMode)==="visible"&&(u=!0);const d=yt(t);return wt({type:i,text:c,marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,showMarker:u,unknownAttributes:d,version:a})}function mk(t,e=[]){let{marker:n}=t;Qe.isValidMarker(n)||ze==null||ze.warn(`Unexpected char marker '${n}'!`),n=n??"",(be==null?void 0:be.markerMode)==="editable"&&e.forEach(o=>{mu(o)&&(o.text=qe+o.text)});const r=yt(t);return wt({type:Qe.getType(),marker:n,unknownAttributes:r,children:[...e],direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:tg})}function Bg(t){return{type:Sr.getType(),children:t,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:sg}}function bk(t,e=[]){let{marker:n}=t;Yt.isValidMarker(n)||ze==null||ze.warn(`Unexpected para marker '${n}'!`),n=n??Pa;const r=[];(be==null?void 0:be.markerMode)==="editable"?r.push(Wo(n),uo(qe)):(be==null?void 0:be.markerMode)==="visible"&&r.push(po("marker",fr(n)+qe)),r.push(...e);const o=yt(t);return wt({type:Yt.getType(),marker:n,unknownAttributes:o,children:r,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:cg})}function vk(t,e){const n=i1(e);let r=()=>{};return zi!=null&&zi.noteCallerOnClick&&(r=zi.noteCallerOnClick),wt({type:Tn.getType(),caller:t,previewText:n,onClick:r,version:Dg})}function xk(t,e){let{marker:n}=t;xt.isValidMarker(n)||ze==null||ze.warn(`Unexpected note marker '${n}'!`),n=n??fu;const{category:r}=t,o=t.caller??"*",s=(be==null?void 0:be.noteMode)!=="expanded",i=yt(t);let a,c;(be==null?void 0:be.markerMode)==="editable"?(a=Wo(n),c=Wo(n,"closing")):(be==null?void 0:be.markerMode)==="visible"&&(a=po("marker",fr(n)+qe),c=po("marker",Go(n)+qe));const u=[];let d;if(a&&u.push(a),(be==null?void 0:be.markerMode)==="editable")d=uo(bu(o)),u.push(d,...e);else{const p=uo(qe);d=vk(o,e),u.push(d,p,...e.flatMap(yk(p)))}return c&&u.push(c),wt({type:xt.getType(),marker:n,caller:o,isCollapsed:s,category:r,unknownAttributes:i,children:u,direction:null,format:"",indent:0,version:lg})}function yk(t){return e=>m1(e)?[e]:[e,t]}function _k(t){let{marker:e}=t;(!e||!Qn.isValidMarker(e))&&(ze==null||ze.warn(`Unexpected milestone marker '${e}'!`)),e=e??"";const{sid:n,eid:r}=t,o=yt(t);return wt({type:Qn.getType(),marker:e,sid:n,eid:r,unknownAttributes:o,version:ig})}function Zp(t,e=[]){return{type:Nt.getType(),typedIDs:{[_r]:e},children:t,direction:null,format:"",indent:0,version:1}}function Ck(t,e){const{marker:n}=t,r=t.type,o=yt(t),s=[...e];return s.forEach(i=>{mu(i)&&(i.mode="token")}),wt({type:bo.getType(),tag:r,marker:n,unknownAttributes:o,children:s,direction:null,format:"",indent:0,version:Gw})}function Ek(t){return{type:Lr.getType(),marker:t,version:vg}}function Wo(t,e="opening"){return{type:vo.getType(),marker:t,markerSyntax:e,text:"",detail:0,format:0,mode:"normal",style:"",version:1}}function uo(t,e="normal"){return{type:m.TextNode.getType(),text:t,detail:0,format:0,mode:e,style:"",version:1}}function po(t,e){return{type:Ir.getType(),text:e,textType:t,version:bg}}function ef(t,e){(be==null?void 0:be.markerMode)==="editable"?e.push(Wo(t)):(be==null?void 0:be.markerMode)==="visible"&&e.push(po("marker",fr(t)))}function tf(t,e,n=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((be==null?void 0:be.markerMode)==="editable"?n?e.push(Wo("","selfClosing")):e.push(Wo(t,"closing")):(be==null?void 0:be.markerMode)==="visible"&&e.push(po("marker",Go(n?"":t))))}function kk(t,e){if(t.type!=="ms")return;const n=[];if(t.sid&&n.push(`sid="${t.sid}"`),t.eid&&n.push(`eid="${t.eid}"`),n.length<=0)return;const r=au+n.join(" ");(be==null?void 0:be.markerMode)==="editable"?e.push(uo(r)):(be==null?void 0:be.markerMode)==="visible"&&e.push(po("attribute",r))}function nf(t,e){return t.length<=0||e===0?t:t.map(n=>n-e)}function Nk(t,e){const n=t.indexOf(e,0);n>-1&&t.splice(n,1)}function rf(t,e){e.marker===ao&&e.sid!==void 0&&t.push(e.sid),e.marker===jo&&e.eid!==void 0&&Nk(t,e.eid)}function gc(t,e,n=!1,r=[]){if(e.length<=0||e[0]>=t.length)return t;const o=e.shift(),s=e.length>0?e.shift():t.length-1;if(o===void 0||s===void 0||s>=t.length||t.length<=0)return t;const i=t.slice(0,o),a=n?[Zp(i,[...r])]:i,c=t[o];rf(r,c);const u=gc(t.slice(o+1,s),nf(e,o+1),c.marker===ao,r),d=Zp(u,[...r]),p=t[s];rf(r,p);const f=gc(t.slice(s+1),nf(e,s+1),p.marker===ao,r);return[...a,d,...f]}function Ns(t){const e=[],n=[];return t==null||t.forEach(r=>{if(typeof r=="string")r&&n.push(uo(r));else if(!r.type)ze==null||ze.error("Marker type is missing!");else switch(r.type){case gn.getType():n.push(hk(r));break;case jn.getType():n.push(wk(r));break;case Bt.getType():be!=null&&be.hasSpacing||n.push(ak),n.push(gk(r));break;case Qe.getType():ef(r.marker??"",n),n.push(mk(r,Ns(r.content))),tf(r.marker??"",n);break;case Yt.getType():n.push(bk(r,Ns(r.content)));break;case xt.getType():n.push(xk(r,Ns(r.content)));break;case Qn.getType():q_(r.marker??"")&&(e.push(n.length),r.sid!==void 0&&(da==null||da.push(r.sid))),n.push(_k(r)),ef(r.marker??"",n),kk(r,n),tf(r.marker??"",n,!0);break;case Lr.getType():n.push(Ek(r.marker??""));break;default:ze==null||ze.warn(`Unknown type-marker '${r.type}-${r.marker}'!`),n.push(Ck(r,Ns(r.content)))}}),gc(n,e)}function mc(t){const e=t.findIndex(n=>N_(n)||W_(n)||K_(n));if(e>=0){const n=mc(t.slice(0,e)),r=t[e],o=mc(t.slice(e+1));return[...n,r,...o]}else if(t.some(n=>"text"in n&&"mode"in n||N1(n)))return[Bg(t)];return t}const bc={initialize:lk,reset:ck,serializeEditorState:uk},$i=t=>{if(!xt.isValidMarker(t)||!t.includes("f"))throw new Error(`Invalid footnote marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"fr",content:[`${n}:${r}`]}),e.noteText&&o.push({type:"char",marker:"fq",content:[e.noteText]}),o.push({type:"char",marker:"ft",content:["-"]}),[{type:"note",marker:t,caller:io,content:o}]}}},of=t=>{if(!xt.isValidMarker(t)||!t.includes("x"))throw new Error(`Invalid cross-reference marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"xo",content:[`${n}:${r}`]}),o.push({type:"char",marker:"xt",content:["-"]}),[{type:"note",marker:t,caller:lu,content:o}]}}},Tk={c:{action:t=>{const{chapterNum:e}=t.reference;return[{type:"chapter",marker:"c",number:`${e+1}`}]}},v:{action:t=>{const{verseNum:e,verse:n}=t.reference;return[{type:"verse",marker:"v",number:`${dc(e,n)}`}]}},f:$i("f"),fe:$i("fe"),ef:$i("ef"),efe:$i("efe"),x:of("x"),ex:of("ex")};function Sk(t,e,n,r,o){const s=Ak(t);return{action:i=>{i.editor.update(()=>{var a;const c=m.$getSelection();m.$isRangeSelection(c)&&(i.noteText=c.getTextContent());const u=(a=s==null?void 0:s.action)==null?void 0:a.call(s,i);if(!u)return;const d=Rp(u,bc,r),p=El(d);if(m.$isRangeSelection(c)){const f=c.anchor.getNode();if(Se(p))Eg(p,c,r),p.getIsCollapsed()||(e.current=p.getKey());else if(c.getTextContent().length>0)Dk(c,()=>El(d));else if(m.$isElementNode(p)&&!p.isInline()){const h=c.insertParagraph();if(h){const v=h.getChildren();p.append(...v),h.replace(p),p.selectStart()}}else if(m.$isTextNode(f)&&!ci(f)&&Se(f.getParent())&&c.isCollapsed()){let h=f.insertAfter(p);if(aa(p)){const v={...r||Ou(),markerMode:"hidden"},x=Rp(u,bc,v),N=El(x);h=h.insertAfter(N)}h.insertAfter(m.$createTextNode(qe))}else{c.insertNodes([p]),Ik(p);const h=p.getNextSibling();h?h.selectStart():p.selectStart()}}else c==null||c.insertNodes([p])},o)},label:s==null?void 0:s.label}}function Ak(t){let e=Tk[t];return e||(Yt.isValidMarker(t)?e={action:()=>[{type:Yt.getType(),marker:t,content:[]}]}:Qe.isValidMarker(t)&&(e={action:()=>[{type:Qe.getType(),marker:t,content:["-"]}]})),e}function Dk(t,e){const n=t.getNodes(),[r,o]=Mk(t);let s;n.forEach((i,a)=>{if(m.$isElementNode(s)&&s.isParentOf(i))return;const c=Rk(i,a===0,a===n.length-1,r,o);if(!c){s=void 0;return}s||(s=e(),c.insertBefore(s)),jk(c,s)}),(m.$isTextNode(s)||m.$isElementNode(s))&&s.selectEnd()}function Mk(t){const e=t.anchor.offset,n=t.focus.offset;return t.isBackward()?[n,e]:[e,n]}function Rk(t,e,n,r,o){if(!(St(t)||Se(t)||Se(t.getParent()))){if(m.$isTextNode(t))return Ok(t,e,n,r,o);if(m.$isElementNode(t)&&t.isInline())return t}}function Ok(t,e,n,r,o){const s=t.getTextContentSize(),i=e?r:0,a=n?o:s;if(i===0&&a===0)return;const c=t.splitText(i,a);return c.length===1?c[0]:c.length===3||a===s?c[1]:c[0]}function jk(t,e){var n;if(m.$isTextNode(e)){const r=sf(t,e);e.setTextContent(r),t.remove()}else if(m.$isElementNode(e)){const r=e.getChildrenSize();e.append(t);for(let o=0;o<r;o++)(n=e.getFirstChild())==null||n.remove();sf(t,e)}}function sf(t,e){let n=t.getTextContent();if(m.$isTextNode(t)&&e.isInline()&&n.startsWith(" ")){n=n.trimStart(),t.setTextContent(n);const r=e.getPreviousSibling();Eu(r),m.$isTextNode(r)||e.insertBefore(m.$createTextNode(" "))}return n}function Ik(t){wn(t)&&(Eu(t.getPreviousSibling()),Tg(t.getNextSibling()))}const qg={chapter:"chapter",verse:"verse",char:"char",para:"para",typedMark:"editor-typed-mark",typedMarkOverlap:"editor-typed-markOverlap",mark:"editor-mark",markOverlap:"editor-markOverlap",placeholder:"editor-placeholder",paragraph:"editor-paragraph",quote:"editor-quote",heading:{h1:"editor-heading-h1",h2:"editor-heading-h2",h3:"editor-heading-h3",h4:"editor-heading-h4",h5:"editor-heading-h5"},list:{nested:{listitem:"editor-nested-listitem"},ol:"editor-list-ol",ul:"editor-list-ul",listitem:"editor-listitem"},image:"editor-image",link:"editor-link",text:{bold:"editor-text-bold",italic:"editor-text-italic",overflowed:"editor-text-overflowed",hashtag:"editor-text-hashtag",underline:"editor-text-underline",strikethrough:"editor-text-strikethrough",underlineStrikethrough:"editor-text-underlineStrikethrough"}};function Lk({options:t,editedUsjRef:e,usj:n,setUsj:r}){const{view:o,nodes:s}=t||{},{hasSpacing:i,isFormattedFont:a,markerMode:c}=o||{};return w.useEffect(()=>{e.current&&!or(e.current,n)&&r(e.current)},[e,i,a,c,s,r,n]),null}function Pk({scrRef:t,onScrRefChange:e}){const[n]=_e(),r=w.useRef(!1),o=w.useRef(!1),{book:s,chapterNum:i,verseNum:a}=t;return w.useEffect(()=>n.registerMutationListener(gn,c=>{n.update(()=>{for(const[u,d]of c){const p=m.$getNodeByKey(u);p&&Jn(p)&&d==="created"&&af(i,a,o)}},{tag:lc})},{skipInitialization:!0}),[n,i,a]),w.useEffect(()=>{r.current?r.current=!1:n.update(()=>af(i,a,o),{tag:lc})},[n,i,a]),w.useEffect(()=>n.registerCommand(m.SELECTION_CHANGE_COMMAND,()=>(o.current?o.current=!1:$k(s,i,a,e,r),!1),m.COMMAND_PRIORITY_LOW),[n,s,i,a,e]),null}function af(t,e,n){var r;const o=wg(m.$getSelection()),s=(r=Ng(o))==null?void 0:r.getNumber();if(l1(s)&&xu(e,s))return;const i=m.$getRoot().getChildren(),a=J_(i,t),c=s1(i,a),u=X_(c,!!a);if(u&&!a||!a)return;o1(c,u);const d=O1(c,e);if(d){if(jt(d)){const p=d.getFirstChild();m.$isTextNode(p)?p.select(0,0):d.select(0,0)}else d.selectNext(0,0);n.current=!0}}function $k(t,e,n,r,o){const s=wg(m.$getSelection());if(!s)return;const i=gu(s),a=parseInt((i==null?void 0:i.getNumber())??"1",10),c=Ng(s),u=c==null?void 0:c.getNumber(),d=parseInt(u??"0",10),p=u?xu(n,u):n===d;if(o.current=!!(i&&a!==e||!p),o.current){const f={book:t,chapterNum:a,verseNum:d};u!=null&&d.toString()!==u&&(f.verse=u),r(f)}}function Fk(t){return Jn(t)?`${t.__code}`:uu(t)?`${t.__marker} "${t.__number}"`:Ue(t)?`${t.__marker}`:ai(t)?`${t.__marker} "${t.__number}"`:Pr(t)?`${t.__caller}`:ls(t)?`${t.__marker} "${t.__number}"`:Se(t)?`${t.__marker} "${t.__caller}"`+(t.__isCollapsed?" (collapsed)":" (expanded)"):jt(t)?`${t.__marker}`:St(t)?`ids: [ ${JSON.stringify(t.getTypedIDs())} ]`:wu(t)?`${t.__marker} "${t.__number}"`:""}function Bk(){const[t]=_e();return l.jsx(mx,{viewClassName:"tree-view-output",treeTypeButtonClassName:"debug-treetype-button",timeTravelPanelClassName:"debug-timetravel-panel",timeTravelButtonClassName:"debug-timetravel-button",timeTravelPanelSliderClassName:"debug-timetravel-panel-slider",timeTravelPanelButtonClassName:"debug-timetravel-panel-button",customPrintNode:Fk,editor:t})}const Ug=w.createContext(null),lf=4;function qk({children:t,className:e,onClick:n,title:r}){const o=w.useRef(null),s=w.useContext(Ug);if(s===null)throw new Error("DropDownItem must be used within a DropDown");const{registerItem:i}=s;return w.useEffect(()=>{o&&o.current&&i(o)},[o,i]),l.jsx("button",{className:e,onClick:n,ref:o,title:r,type:"button",children:t})}function Uk({children:t,dropDownRef:e,onClose:n}){const[r,o]=w.useState(),[s,i]=w.useState(),a=w.useCallback(d=>{o(p=>p?[...p,d]:[d])},[o]),c=d=>{if(!r)return;const p=d.key;["Escape","ArrowUp","ArrowDown","Tab"].includes(p)&&d.preventDefault(),p==="Escape"||p==="Tab"?n():p==="ArrowUp"?i(f=>{if(!f)return r[0];const h=r.indexOf(f)-1;return r[h===-1?r.length-1:h]}):p==="ArrowDown"&&i(f=>f?r[r.indexOf(f)+1]:r[0])},u=w.useMemo(()=>({registerItem:a}),[a]);return w.useEffect(()=>{r&&!s&&i(r[0]),s&&s.current&&s.current.focus()},[r,s]),l.jsx(Ug.Provider,{value:u,children:l.jsx("div",{className:"dropdown",ref:e,onKeyDown:c,children:t})})}function Vk({disabled:t=!1,buttonLabel:e,buttonAriaLabel:n,buttonClassName:r,buttonIconClassName:o,children:s,stopCloseOnClickSelf:i}){const a=w.useRef(null),c=w.useRef(null),[u,d]=w.useState(!1),p=()=>{d(!1),c&&c.current&&c.current.focus()};return w.useEffect(()=>{const f=c.current,h=a.current;if(u&&f!==null&&h!==null){const{top:v,left:x}=f.getBoundingClientRect();h.style.top=`${v+f.offsetHeight+lf}px`,h.style.left=`${Math.min(x,window.innerWidth-h.offsetWidth-20)}px`}},[a,c,u]),w.useEffect(()=>{const f=c.current;if(f!==null&&u){const h=v=>{const x=v.target;i&&a.current&&a.current.contains(x)||f.contains(x)||d(!1)};return document.addEventListener("click",h),()=>{document.removeEventListener("click",h)}}return()=>{}},[a,c,u,i]),w.useEffect(()=>{const f=()=>{if(u){const h=c.current,v=a.current;if(h!==null&&v!==null){const{top:x}=h.getBoundingClientRect(),N=x+h.offsetHeight+lf;N!==v.getBoundingClientRect().top&&(v.style.top=`${N}px`)}}};return document.addEventListener("scroll",f),()=>{document.removeEventListener("scroll",f)}},[c,a,u]),l.jsxs(l.Fragment,{children:[l.jsxs("button",{type:"button",disabled:t,"aria-label":n||e,className:r,onClick:()=>d(!u),ref:c,children:[o&&l.jsx("span",{className:o}),e&&l.jsx("span",{className:"text dropdown-button-text",children:e}),l.jsx("i",{className:"chevron-down"})]}),u&&fn.createPortal(l.jsx(Uk,{dropDownRef:a,onClose:p,children:s}),document.body)]})}const vc={m:"m - Paragraph - Margin - No First Line Indent",ms:"ms - Heading - Major Section Level 1",nb:"nb - Paragraph - No Break with Previous Paragraph",p:"p - Paragraph - Normal - First Line Indent",pi:"pi - Paragraph - Indented - Level 1 - First Line Indent",q1:"q1 - Poetry - Indent Level 1",q2:"q2 - Poetry - Indent Level 2",r:"r - Heading - Parallel References",s:"s - Heading - Section Level 1"},xc={...vc,ide:"ide - File - Encoding",h:"h - File - Header",h1:"h1 - File - Header",h2:"h2 - File - Left Header",h3:"h3 - File - Right Header",toc1:"toc1 - File - Long Table of Contents Text",toc2:"toc2 - File - Short Table of Contents Text",toc3:"toc3 - File - Book Abbreviation",cl:"cl - Chapter - Publishing Label",mt:"mt - Title - Major Title Level 1",mt1:"mt1 - Title - Major Title Level 1",mt2:"mt2 - Title - Major Title Level 2",mt3:"mt3 - Title - Major Title Level 3",mt4:"mt4 - Title - Major Title Level 4",ms1:"ms1 - Heading - Major Section Level 1",ms2:"ms2 - Heading - Major Section Level 2",ms3:"ms3 - Heading - Major Section Level 3",b:"b - Poetry - Stanza Break (Blank Line)"};function Hk({editorRef:t,blockMarker:e,disabled:n=!1}){return l.jsx(Vk,{disabled:n,buttonClassName:"toolbar-item block-controls",buttonIconClassName:"icon block-marker "+zk(e),buttonLabel:Gk(e),buttonAriaLabel:"Formatting options for block type",children:Object.keys(vc).map(r=>l.jsxs(qk,{className:"item block-marker "+Kk(e===r),onClick:()=>{var o;return(o=t.current)==null?void 0:o.formatPara(r)},children:[l.jsx("i",{className:"icon block-marker "+r}),l.jsx("span",{className:"text usfm_"+r,children:vc[r]})]},r))})}function zk(t){return t&&t in xc?t:"ban"}function Gk(t){return t&&t in xc?xc[t]:"No Style"}function Kk(t){return t?"active dropdown-item-active":""}function cf(){return l.jsx("div",{className:"divider"})}const Yk=w.forwardRef(function({editorRef:t,isReadonly:e=!1,onStateChange:n},r){const[o]=_e(),[s,i]=w.useState(o),[a,c]=w.useState(),[u,d]=w.useState(!1),[p,f]=w.useState(!1),h=w.useCallback((v,x,N)=>{d(v),f(x),c(N),n==null||n(v,x,N)},[n]);return w.useEffect(()=>o.registerCommand(m.SELECTION_CHANGE_COMMAND,(v,x)=>(i(x),!1),m.COMMAND_PRIORITY_CRITICAL),[o]),l.jsxs(l.Fragment,{children:[l.jsx(Pg,{onStateChange:h}),l.jsxs("div",{className:"toolbar",children:[l.jsx("button",{disabled:!u||e,onClick:()=>{s.dispatchCommand(m.UNDO_COMMAND,void 0)},title:ql?"Undo (⌘Z)":"Undo (Ctrl+Z)",type:"button",className:"toolbar-item spaced","aria-label":"Undo",children:l.jsx("i",{className:"format undo"})}),l.jsx("button",{disabled:!p||e,onClick:()=>{s.dispatchCommand(m.REDO_COMMAND,void 0)},title:ql?"Redo (⌘Y)":"Redo (Ctrl+Y)",type:"button",className:"toolbar-item","aria-label":"Redo",children:l.jsx("i",{className:"format redo"})}),l.jsx(cf,{}),s===o&&l.jsxs(l.Fragment,{children:[l.jsx(Hk,{editorRef:t,blockMarker:a,disabled:e}),l.jsx(cf,{})]}),l.jsx("div",{ref:r,className:"end-container"})]})]})}),uf={namespace:"platformEditor",theme:qg,editable:!0,editorState:void 0,onError(t){throw t},nodes:[Nt,...uC]},Wk=Ou(),Jk={},Xk={};function Qk(){return l.jsx("div",{className:"editor-placeholder",children:"Enter some Scripture..."})}const Vg=w.forwardRef(function({defaultUsj:t,scrRef:e,onScrRefChange:n,onSelectionChange:r,onUsjChange:o,onStateChange:s,options:i,logger:a,children:c},u){const d=w.useRef(null),p=w.useRef(null),f=w.useRef(null),h=w.useRef(t),v=w.useRef(),[x,N]=w.useState(t),[C,_]=w.useState(0),{isReadonly:D=!1,hasExternalUI:L=!1,hasSpellCheck:V=!1,textDirection:O="ltr",markerMenuTrigger:U="\\",view:F=Wk,nodes:$=Jk,debug:Y=!1}=i??Xk;uf.editable=!D,Al.initialize(a),w.useImperativeHandle(u,()=>({focus(){var R;(R=d.current)==null||R.focus()},undo(){var R;(R=d.current)==null||R.dispatchCommand(m.UNDO_COMMAND,void 0)},redo(){var R;(R=d.current)==null||R.dispatchCommand(m.REDO_COMMAND,void 0)},cut(){var R;(R=d.current)==null||R.dispatchCommand(m.CUT_COMMAND,null)},copy(){var R;(R=d.current)==null||R.dispatchCommand(m.COPY_COMMAND,null)},paste(){d.current&&Du(d.current)},pastePlainText(){d.current&&Mu(d.current)},getUsj(){return h.current},setUsj(R){if(!or(h.current,R)){h.current=R;const S=or(x,R);N(R),S&&_(I=>I+1)}},applyUpdate(R,S="remote"){var I,A;(I=d.current)==null||I.update(()=>{S==="remote"&&m.$addUpdateTag(uc),OC(R,F,$,a)},{discrete:!0});const T=(A=d.current)==null?void 0:A.getEditorState();if(!T)return;const P=Al.deserializeEditorState(T);if(P){const H=!or(h.current,P);if(H&&(h.current=P),H||!or(x,P)){const J=$p(R,T);o==null||o(P,R,S,J)}}},replaceEmbedUpdate(R,S){var I;const A=(I=d.current)==null?void 0:I.read(()=>U1(R,S));A&&this.applyUpdate(A)},getSelection(){var R;return(R=d.current)==null?void 0:R.read(yg)},setSelection(R){var S;(S=d.current)==null||S.update(()=>{const I=_u(R);I!==void 0&&m.$setSelection(I)},{tag:Jw})},addAnnotation(R,S,I){var A;(A=p.current)==null||A.addAnnotation(R,Dp(S),I)},removeAnnotation(R,S){var I;(I=p.current)==null||I.removeAnnotation(Dp(R),S)},formatPara(R){var S;(S=d.current)==null||S.update(()=>{const I=m.$getSelection();m.$isRangeSelection(I)&&w0(I,()=>Us(R))})},getElementByKey(R){var S;return(S=d.current)==null?void 0:S.read(()=>{var I;return((I=d.current)==null?void 0:I.getElementByKey(R))??void 0})},insertNote(R,S,I){var A;(A=d.current)==null||A.update(()=>{const T=T1(R,S,I,e,F,$,a);T&&!T.getIsCollapsed()&&(v.current=T.getKey())})},selectNote(R){var S;(S=d.current)==null||S.update(()=>{const I=Lp(R);I&&(A1(I,F),I.getIsCollapsed()||(v.current=I.getKey()))})},getNoteOps(R){var S;return(S=d.current)==null?void 0:S.read(()=>{const I=Lp(R);if(I)return Nu(I)})},get toolbarEndRef(){return f}}));const k=w.useCallback((R,S,I,A)=>{if(D_.some(P=>I.has(P)))return;const T=Al.deserializeEditorState(R);if(T){const P=!or(h.current,T);if(P&&(h.current=T),P||!or(x,T)){const H=I.has(uc)?"remote":"local",J=$p(A,R);o==null||o(T,A,H,J)}}},[x,o]);return l.jsxs(Sc,{initialConfig:uf,children:[l.jsx(uE,{isEditable:!D}),l.jsxs("div",{className:"editor-container",children:[L?l.jsx(Pg,{onStateChange:s}):l.jsx("div",{className:"editor-toolbar-container"+(D?"-readonly":"-editable"),children:l.jsx(Yk,{ref:f,editorRef:u,isReadonly:D,onStateChange:s})}),l.jsxs("div",{className:"editor-inner",children:[l.jsx(Hh,{editorRef:d}),l.jsx(oh,{contentEditable:l.jsx(Oc,{className:`editor-input usfm ${GE(F).join(" ")}`,spellCheck:V}),placeholder:l.jsx(Qk,{}),ErrorBoundary:Mc}),l.jsx(zh,{}),e&&n&&l.jsx(Pk,{scrRef:e,onScrRefChange:n}),e&&l.jsx(LE,{trigger:U,scrRef:e,getMarkerAction:(R,S)=>Sk(R,v,S,F)}),l.jsx(Lk,{options:{view:F,nodes:$},editedUsjRef:h,usj:x,setUsj:N}),l.jsx(dE,{scripture:x,nodeOptions:$,editorAdaptor:bc,viewOptions:F,logger:a},C),l.jsx(EE,{onChange:r}),l.jsx(MC,{onChange:k,ignoreSelectionChange:!0,ignoreHistoryMergeTagChange:!0}),l.jsx(DC,{ref:p,logger:a}),l.jsx(WC,{viewOptions:F}),l.jsx(tE,{}),l.jsx(oE,{}),l.jsx(sE,{logger:a}),l.jsx(cE,{}),l.jsx(pE,{expandedNoteKeyRef:v,nodeOptions:$,viewOptions:F,logger:a}),l.jsx(kE,{}),l.jsx(SE,{textDirection:O}),l.jsx(ME,{}),c]}),Y&&l.jsx(Bk,{})]})]})}),Zk=w.forwardRef(function(t,e){const{children:n,...r}=t;return l.jsx(Vg,{ref:e,...r})});function Hg(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)}function pa(t,e,n,r,o){return{author:e,content:t,deleted:o===void 0?!1:o,id:n===void 0?Hg():n,timeStamp:r===void 0?performance.timeOrigin+performance.now():r,type:"comment"}}function zg(t,e,n){return{comments:e,id:n===void 0?Hg():n,quote:t,type:"thread"}}function df(t){return{comments:Array.from(t.comments),id:t.id,quote:t.quote,type:"thread"}}function eN(t){return{author:t.author,content:"[Deleted Comment]",deleted:!0,id:t.id,timeStamp:t.timeStamp,type:"comment"}}function Dl(t){const e=t._changeListeners;for(const n of e)n()}class tN{constructor(e,n){de(this,"_editor"),de(this,"_comments"),de(this,"_changeListeners"),de(this,"_collabProvider"),de(this,"logger"),this._comments=[],this._editor=e,this.logger=n,this._collabProvider=null,this._changeListeners=new Set}isCollaborative(){return this._collabProvider!==null}getComments(){return this._comments}setComments(e){this._comments=e,Dl(this)}addComment(e,n,r){const o=Array.from(this._comments),s=this._getCollabComments();if(n!==void 0&&e.type==="comment")for(let i=0;i<o.length;i++){const a=o[i];if(a.type==="thread"&&a.id===n.id){const c=df(a);o.splice(i,1,c);const u=r!==void 0?r:c.comments.length;if(this.isCollaborative()&&s!==null){const d=s.get(i).get("comments");this._withRemoteTransaction(()=>{const p=this._createCollabSharedMap(e);d.insert(u,[p])})}c.comments.splice(u,0,e);break}}else{const i=r!==void 0?r:o.length;this.isCollaborative()&&s!==null&&this._withRemoteTransaction(()=>{const a=this._createCollabSharedMap(e);s.insert(i,[a])}),o.splice(i,0,e)}this._comments=o,Dl(this)}deleteCommentOrThread(e,n){const r=Array.from(this._comments),o=this._getCollabComments();let s=null;if(n!==void 0)for(let i=0;i<r.length;i++){const a=r[i];if(a.type==="thread"&&a.id===n.id){const c=df(a);r.splice(i,1,c);const u=c.comments;if(s=u.indexOf(e),this.isCollaborative()&&o!==null){const d=o.get(i).get("comments"),p=s;this._withRemoteTransaction(()=>{d.delete(p)})}u.splice(s,1);break}}else s=r.indexOf(e),this.isCollaborative()&&o!==null&&this._withRemoteTransaction(()=>{o.delete(s)}),r.splice(s,1);return this._comments=r,Dl(this),e.type==="comment"?{index:s,markedComment:eN(e)}:null}registerOnChange(e){const n=this._changeListeners;return n.add(e),()=>{n.delete(e)}}_withRemoteTransaction(e){const n=this._collabProvider;n!==null&&n.doc.transact(e,this)}_withLocalTransaction(e){const n=this._collabProvider;try{this._collabProvider=null,e()}finally{this._collabProvider=n}}_getCollabComments(){const e=this._collabProvider;return e!==null?e.doc.get("comments",Jr):null}_createCollabSharedMap(e){const n=new Vo,r=e.type,o=e.id;if(n.set("type",r),n.set("id",o),r==="comment")n.set("author",e.author),n.set("content",e.content),n.set("deleted",e.deleted),n.set("timeStamp",e.timeStamp);else{n.set("quote",e.quote);const s=new Jr;e.comments.forEach((i,a)=>{const c=this._createCollabSharedMap(i);s.insert(a,[c])}),n.set("comments",s)}return n}registerCollaboration(e){this._collabProvider=e;const n=this._getCollabComments(),r=()=>{e.connect()},o=()=>{try{e.disconnect()}catch{}},s=this._editor.registerCommand(y_,a=>{var c,u;return r!==void 0&&o!==void 0&&(a?((c=this.logger)==null||c.info("Comments connected!"),r()):((u=this.logger)==null||u.info("Comments disconnected!"),o())),!1},m.COMMAND_PRIORITY_LOW),i=(a,c)=>{if(c.origin!==this){for(const u of a)if(u instanceof Pw){const d=u.target,p=u.delta;let f=0;for(const h of p){const v=h.insert,x=h.retain,N=h.delete,C=d.parent,_=d===n?void 0:C instanceof Vo&&this._comments.find(D=>D.id===C.get("id"));if(Array.isArray(v)){const D=f;v.slice().reverse().forEach(L=>{const V=L.get("id"),O=L.get("type")==="thread"?zg(L.get("quote"),L.get("comments").toArray().map(U=>pa(U.get("content"),U.get("author"),U.get("id"),U.get("timeStamp"),U.get("deleted"))),V):pa(L.get("content"),L.get("author"),V,L.get("timeStamp"),L.get("deleted"));this._withLocalTransaction(()=>{this.addComment(O,_,D)})})}else if(typeof x=="number")f+=x;else if(typeof N=="number")for(let D=0;D<N;D++){const L=_===void 0||_===!1?this._comments[f]:_.comments[f];this._withLocalTransaction(()=>{this.deleteCommentOrThread(L,_)}),f++}}}}};return n===null?()=>null:(n.observeDeep(i),r(),()=>{n.unobserveDeep(i),s(),this._collabProvider=null})}}function nN(t){const[e,n]=w.useState(t.getComments());return w.useEffect(()=>t.registerOnChange(()=>{n(t.getComments())}),[t]),e}function rN({onClose:t,children:e,title:n,closeOnClickOutside:r}){const o=w.useRef(null);return w.useEffect(()=>{o.current!==null&&o.current.focus()},[]),w.useEffect(()=>{let s=null;const i=u=>{u.key==="Escape"&&t()},a=u=>{const d=u.target;o.current!==null&&!o.current.contains(d)&&r&&t()},c=o.current;return c!==null&&(s=c.parentElement,s!==null&&s.addEventListener("click",a)),window.addEventListener("keydown",i),()=>{window.removeEventListener("keydown",i),s!==null&&(s==null||s.removeEventListener("click",a))}},[r,t]),l.jsx("div",{className:"Modal__overlay",role:"dialog",children:l.jsxs("div",{className:"Modal__modal",tabIndex:-1,ref:o,children:[l.jsx("h2",{className:"Modal__title",children:n}),l.jsx("button",{className:"Modal__closeButton","aria-label":"Close modal",type:"button",onClick:t,children:"X"}),l.jsx("div",{className:"Modal__content",children:e})]})})}function oN({onClose:t,children:e,title:n,closeOnClickOutside:r=!1}){return fn.createPortal(l.jsx(rN,{onClose:t,title:n,closeOnClickOutside:r,children:e}),document.body)}function Gg(){const[t,e]=w.useState(null),n=w.useCallback(()=>{e(null)},[]),r=w.useMemo(()=>{if(t===null)return null;const{title:s,content:i,closeOnClickOutside:a}=t;return l.jsx(oN,{onClose:n,title:s,closeOnClickOutside:a,children:i})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}const sN={...qg,paragraph:"CommentEditorTheme__paragraph"};function iN(...t){return t.filter(Boolean).join(" ")}function Ar({"data-test-id":t,children:e,className:n,onClick:r,disabled:o,small:s,title:i}){return l.jsx("button",{disabled:o,className:iN("Button__root",o&&"Button__disabled",s&&"Button__small",n),onClick:r,title:i,"aria-label":i,...t&&{"data-test-id":t},children:e})}function aN({className:t}){return l.jsx(Oc,{className:t||"ContentEditable__root"})}function lN({children:t,className:e}){return l.jsx("div",{className:e||"Placeholder__root",children:t})}const pf=m.createCommand("INSERT_INLINE_COMMAND");function cN({anchorKey:t,editor:e,showComments:n,onAddComment:r}){const o=w.useRef(null),s=w.useCallback(()=>{const i=o.current,a=e.getRootElement(),c=e.getElementByKey(t);if(i!==null&&a!==null&&c!==null){const{right:u}=a.getBoundingClientRect(),{top:d}=c.getBoundingClientRect();i.style.left=`${u-20}px`,i.style.top=`${d-30}px`}},[t,e]);return w.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[e,s]),w.useLayoutEffect(()=>{s()},[t,e,n,s]),l.jsx("div",{className:"CommentPlugin_AddCommentBox",ref:o,children:l.jsx("button",{className:"CommentPlugin_AddCommentBox_button",onClick:r,children:l.jsx("i",{className:"icon add-comment"})})})}function uN({onEscape:t}){const[e]=_e();return w.useEffect(()=>e.registerCommand(m.KEY_ESCAPE_COMMAND,n=>t(n),m.COMMAND_PRIORITY_NORMAL),[e,t]),null}function Kg({className:t,autoFocus:e,onEscape:n,onChange:r,editorRef:o,placeholder:s="Type a comment..."}){return l.jsx(Sc,{initialConfig:{namespace:"Commenting",nodes:[],onError:i=>{throw i},theme:sN},children:l.jsxs("div",{className:"CommentPlugin_CommentInputBox_EditorContainer",children:[l.jsx(Dy,{contentEditable:l.jsx(aN,{className:t}),placeholder:l.jsx(lN,{children:s}),ErrorBoundary:Mc}),l.jsx(Yf,{onChange:r}),l.jsx(zh,{}),e!==!1&&l.jsx(sh,{}),l.jsx(uN,{onEscape:n}),l.jsx(xy,{}),o!==void 0&&l.jsx(Hh,{editorRef:o})]})})}function Yg(t,e){return w.useCallback((n,r)=>{n.read(()=>{t(Jf()),e(!Xf(r.isComposing(),!0))})},[e,t])}function dN({editor:t,cancelAddComment:e,submitAddComment:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=w.useMemo(()=>({container:document.createElement("div"),elements:[]}),[]),u=w.useRef(null),d=Jg(),p=w.useCallback(()=>{t.getEditorState().read(()=>{const x=m.$getSelection();if(m.$isRangeSelection(x)){u.current=x.clone();const N=x.anchor,C=x.focus,_=d0(t,N.getNode(),N.offset,C.getNode(),C.offset),D=a.current;if(_!==null&&D!==null){const{left:L,bottom:V,width:O}=_.getBoundingClientRect(),U=p0(t,_);let F=U.length===1?L+O/2-125:L-125;F<10&&(F=10),D.style.left=`${F}px`,D.style.top=`${V+20+(window.pageYOffset||document.documentElement.scrollTop)}px`;const $=U.length,{container:Y}=c,k=c.elements,R=k.length;for(let S=0;S<$;S++){const I=U[S];let A=k[S];A===void 0&&(A=document.createElement("span"),k[S]=A,Y.appendChild(A));const T=`position:absolute;top:${I.top+(window.pageYOffset||document.documentElement.scrollTop)}px;left:${I.left}px;height:${I.height}px;width:${I.width}px;background-color:rgba(255, 212, 0, 0.3);pointer-events:none;z-index:5;`;A.style.cssText=T}for(let S=R-1;S>=$;S--){const I=k[S];Y.removeChild(I),k.pop()}}}})},[t,c]);w.useLayoutEffect(()=>{p();const x=c.container,N=document.body;return N!==null?(N.appendChild(x),()=>{N.removeChild(x)}):()=>{}},[c.container,p]),w.useEffect(()=>(window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}),[p]);const f=x=>(x.preventDefault(),e(),!0),h=()=>{if(s){let x=t.getEditorState().read(()=>{const N=u.current;return N?N.getTextContent():""});x.length>100&&(x=x.slice(0,99)+"…"),n(zg(x,[pa(r,d)]),!0,void 0,u.current),u.current=null}},v=Yg(o,i);return l.jsxs("div",{className:"CommentPlugin_CommentInputBox",ref:a,children:[l.jsx(Kg,{className:"CommentPlugin_CommentInputBox_Editor",onEscape:f,onChange:v}),l.jsxs("div",{className:"CommentPlugin_CommentInputBox_Buttons",children:[l.jsx(Ar,{onClick:e,className:"CommentPlugin_CommentInputBox_Button",children:"Cancel"}),l.jsx(Ar,{onClick:h,disabled:!s,className:"CommentPlugin_CommentInputBox_Button primary",children:"Comment"})]})]})}function pN({submitAddComment:t,thread:e,placeholder:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=Jg(),u=Yg(o,i);return l.jsxs(l.Fragment,{children:[l.jsx(Kg,{className:"CommentPlugin_CommentsPanel_Editor",autoFocus:!1,onEscape:()=>!0,onChange:u,editorRef:a,placeholder:n}),l.jsx(Ar,{className:"CommentPlugin_CommentsPanel_SendButton",onClick:()=>{if(s){t(pa(r,c),!1,e);const d=a.current;d!==null&&d.dispatchCommand(m.CLEAR_EDITOR_COMMAND,void 0)}},disabled:!s,children:l.jsx("i",{className:"send"})})]})}function Wg({commentOrThread:t,deleteCommentOrThread:e,onClose:n,thread:r=void 0}){return l.jsxs(l.Fragment,{children:["Are you sure you want to delete this ",t.type,"?",l.jsxs("div",{className:"Modal__content",children:[l.jsx(Ar,{onClick:()=>{e(t,r),n()},children:"Delete"})," ",l.jsx(Ar,{onClick:()=>{n()},children:"Cancel"})]})]})}function ff({comment:t,deleteComment:e,thread:n,rtf:r}){const o=Math.round((t.timeStamp-(performance.timeOrigin+performance.now()))/1e3),s=Math.round(o/60),[i,a]=Gg();return l.jsxs("li",{className:"CommentPlugin_CommentsPanel_List_Comment",children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Details",children:[l.jsx("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Author",children:t.author}),l.jsxs("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Time",children:["· ",o>-10?"Just now":r.format(s,"minute")]})]}),l.jsx("p",{className:t.deleted?"CommentPlugin_CommentsPanel_DeletedComment":"",children:t.content}),!t.deleted&&l.jsxs(l.Fragment,{children:[l.jsx(Ar,{onClick:()=>{a("Delete Comment",c=>l.jsx(Wg,{commentOrThread:t,deleteCommentOrThread:e,thread:n,onClose:c}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),i]})]})}function fN({activeIDs:t,comments:e,deleteCommentOrThread:n,listRef:r,submitAddComment:o,markNodeMap:s}){const[i]=_e(),[a,c]=w.useState(0),[u,d]=Gg(),p=w.useMemo(()=>new Intl.RelativeTimeFormat("en",{localeMatcher:"best fit",numeric:"auto",style:"short"}),[]);return w.useEffect(()=>{const f=setTimeout(()=>{c(a+1)},1e4);return()=>{clearTimeout(f)}},[a]),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List",ref:r,children:e.map(f=>{const h=f.id;return f.type==="thread"?l.jsxs("li",{onClick:()=>{const v=s.get(h);if(v!==void 0&&(t===null||t.indexOf(h)===-1)){const x=document.activeElement;i.update(()=>{const N=Array.from(v)[0],C=m.$getNodeByKey(N);St(C)&&C.selectStart()},{onUpdate(){x!==null&&x.focus()}})}},className:`CommentPlugin_CommentsPanel_List_Thread ${s.has(h)?"interactive":""} ${t.indexOf(h)===-1?"":"active"}`,children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Thread_QuoteBox",children:[l.jsxs("blockquote",{className:"CommentPlugin_CommentsPanel_List_Thread_Quote",children:["> ",l.jsx("span",{children:f.quote})]}),l.jsx(Ar,{onClick:()=>{d("Delete Thread",v=>l.jsx(Wg,{commentOrThread:f,deleteCommentOrThread:n,onClose:v}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),u]}),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List_Thread_Comments",children:f.comments.map(v=>l.jsx(ff,{comment:v,deleteComment:n,thread:f,rtf:p},v.id))}),l.jsx("div",{className:"CommentPlugin_CommentsPanel_List_Thread_Editor",children:l.jsx(pN,{submitAddComment:o,thread:f,placeholder:"Reply to comment..."})})]},h):l.jsx(ff,{comment:f,deleteComment:n,rtf:p},h)})})}function hN({activeIDs:t,deleteCommentOrThread:e,comments:n,submitAddComment:r,markNodeMap:o}){const s=w.useRef(null),i=n.length===0;return l.jsxs("div",{className:"CommentPlugin_CommentsPanel",children:[l.jsx("h2",{className:"CommentPlugin_CommentsPanel_Heading",children:"Comments"}),i?l.jsx("div",{className:"CommentPlugin_CommentsPanel_Empty",children:"No Comments"}):l.jsx(fN,{activeIDs:t,comments:n,deleteCommentOrThread:e,listRef:s,submitAddComment:r,markNodeMap:o})]})}function Jg(){const t=ow(),{yjsDocMap:e,name:n}=t;return e.has("comments")?n:"Scripture User"}function wN({providerFactory:t,setCommentStore:e,onChange:n,showCommentsContainerRef:r,commentContainerRef:o,logger:s}){const i=ow(),[a]=_e(),c=w.useMemo(()=>{const F=new tN(a,s);return n&&F.registerOnChange(n),e==null||e(F),F},[a,s,n,e]),u=nN(c),d=w.useMemo(()=>new Map,[]),[p,f]=w.useState(),[h,v]=w.useState([]),[x,N]=w.useState(!1),[C,_]=w.useState(!1),{yjsDocMap:D}=i;w.useEffect(()=>{if(t){const F=t("comments",D);return c.registerCollaboration(F)}return()=>{}},[c,t,D]);const L=w.useCallback(()=>{a.update(()=>{const F=m.$getSelection();F!==null&&(F.dirty=!0)}),N(!1)},[a]),V=w.useCallback((F,$)=>{if(F.type==="comment"){const Y=c.deleteCommentOrThread(F,$);if(!Y)return;const{markedComment:k,index:R}=Y;c.addComment(k,$,R)}else{c.deleteCommentOrThread(F);const Y=$!==void 0?$.id:F.id,k=d.get(Y);k!==void 0&&setTimeout(()=>{a.update(()=>{for(const R of k){const S=m.$getNodeByKey(R);St(S)&&(S.deleteID(_r,Y),S.hasNoIDsForEveryType()&&gg(S))}})})}},[c,a,d]),O=w.useCallback((F,$,Y,k)=>{c.addComment(F,Y),$&&(a.update(()=>{m.$isRangeSelection(k)&&mg(k,_r,F.id)}),N(!1))},[c,a]);w.useEffect(()=>{const F=[];for(const $ of h){const Y=d.get($);if(Y!==void 0)for(const k of Y){const R=a.getElementByKey(k);R!==null&&(R.classList.add("selected"),F.push(R),_(!0))}}return()=>{for(const $ of F)$.classList.remove("selected")}},[h,a,d]),w.useEffect(()=>{if(!a.hasNodes([Nt]))throw new Error("CommentPlugin: TypedMarkNode not registered on editor!");const F=new Map;return At(th(a,Nt,$=>Vs($.getTypedIDs()),($,Y)=>{for(const[k,R]of Object.entries($.getTypedIDs()))R.forEach(S=>{Y.addID(k,S)})}),a.registerMutationListener(Nt,$=>{a.getEditorState().read(()=>{for(const[Y,k]of $){const R=m.$getNodeByKey(Y);let S=[];k==="destroyed"?S=F.get(Y)??[]:St(R)&&(S=R.getTypedIDs()[_r]??[]);for(const I of S){let A=d.get(I);F.set(Y,S),k==="destroyed"?A!==void 0&&(A.delete(Y),A.size===0&&d.delete(I)):(A===void 0&&(A=new Set,d.set(I,A)),A.has(Y)||A.add(Y))}}})},{skipInitialization:!1}),a.registerUpdateListener(({editorState:$,tags:Y})=>{$.read(()=>{const k=m.$getSelection();let R=!1,S=!1;if(m.$isRangeSelection(k)){const I=k.anchor.getNode();if(m.$isTextNode(I)){const A=h1(I,_r,k.anchor.offset)??[];A!==null&&(v(A),R=!0),k.isCollapsed()||(f(I.getKey()),S=!0)}}R||v(I=>I.length===0?I:[]),S||f(null),!Y.has("collaboration")&&m.$isRangeSelection(k)&&N(!1)})}),a.registerCommand(pf,()=>{const $=window.getSelection();return $!==null&&$.removeAllRanges(),N(!0),!0},m.COMMAND_PRIORITY_EDITOR))},[a,d]);const U=()=>{a.dispatchCommand(pf,void 0)};return l.jsxs(l.Fragment,{children:[x&&fn.createPortal(l.jsx(dN,{editor:a,cancelAddComment:L,submitAddComment:O}),document.body),p!=null&&!x&&fn.createPortal(l.jsx(cN,{anchorKey:p,editor:a,showComments:C,onAddComment:U}),document.body),r!==null&&fn.createPortal(l.jsx(Ar,{className:`CommentPlugin_ShowCommentsButton ${C?"active":""}`,onClick:()=>_(!C),title:C?"Hide Comments":"Show Comments",children:l.jsx("i",{className:"comments"})}),(r==null?void 0:r.current)??document.body),C&&fn.createPortal(l.jsx(hN,{comments:u,submitAddComment:O,deleteCommentOrThread:V,activeIDs:h,markNodeMap:d}),(o==null?void 0:o.current)??document.body)]})}function gN(){const t=w.useRef(void 0),e=w.useCallback(n=>{t.current=n},[]);return[t,e]}function mN(t,e){var n,r;const o=((n=e.current)==null?void 0:n.getComments())??[],s=o==null?void 0:o.map(a=>a.id),i=t.map(a=>{const c=s.findIndex(u=>u===a);return c!==void 0&&c>=0?o[c]:{comments:[{author:"unknown",content:"Comment not found",deleted:!1,id:"",timeStamp:0,type:"comment"}],id:a,quote:"",type:"thread"}});o.forEach(a=>{t.includes(a.id)||i.push(a)}),i&&((r=e.current)==null||r.setComments(i))}function bN(t,e){w.useEffect(()=>{var n;t.options??(t.options={}),(n=t.options).nodes??(n.nodes={}),t.options.nodes.addMissingComments=r=>{mN(r,e)}},[e,t])}w.forwardRef(function(t,e){const n=w.useRef(null),r=w.useRef(!0),o=w.useRef(null),[s,i]=w.useState(null),{children:a,onCommentChange:c,onUsjChange:u,showCommentsContainerRef:d,...p}=t,{options:{isReadonly:f}={}}=t,[h,v]=gN();bN(p,h),w.useImperativeHandle(e,()=>({focus(){var C;(C=n.current)==null||C.focus()},undo(){var C;(C=n.current)==null||C.undo()},redo(){var C;(C=n.current)==null||C.redo()},cut(){var C;(C=n.current)==null||C.cut()},copy(){var C;(C=n.current)==null||C.copy()},paste(){var C;(C=n.current)==null||C.paste()},pastePlainText(){var C;(C=n.current)==null||C.pastePlainText()},getUsj(){var C;return(C=n.current)==null?void 0:C.getUsj()},setUsj(C){var _;(_=n.current)==null||_.setUsj(C)},applyUpdate(C,_){var D;(D=n.current)==null||D.applyUpdate(C,_)},replaceEmbedUpdate(C,_){var D;return(D=n.current)==null?void 0:D.replaceEmbedUpdate(C,_)},getSelection(){var C;return(C=n.current)==null?void 0:C.getSelection()},setSelection(C){var _;(_=n.current)==null||_.setSelection(C)},addAnnotation(C,_,D){var L;(L=n.current)==null||L.addAnnotation(C,_,D)},removeAnnotation(C,_){var D;(D=n.current)==null||D.removeAnnotation(C,_)},formatPara(C){var _;(_=n.current)==null||_.formatPara(C)},getElementByKey(C){var _;return(_=n.current)==null?void 0:_.getElementByKey(C)},insertNote(C,_,D){var L;(L=n.current)==null||L.insertNote(C,_,D)},selectNote(C){var _;(_=n.current)==null||_.selectNote(C)},getNoteOps(C){var _;return(_=n.current)==null?void 0:_.getNoteOps(C)},setComments(C){var _;(_=h.current)==null||_.setComments(C),r.current=!0},get toolbarEndRef(){return s}}));const x=w.useCallback((C,_,D,L)=>{var V;if(!u)return;const O=(V=h.current)==null?void 0:V.getComments();u(C,O,_,D,L)},[h,u]),N=w.useCallback(()=>{var C;if(!c||r.current){r.current=!1;return}const _=(C=h.current)==null?void 0:C.getComments();c(_)},[h,r,c]);return w.useEffect(()=>{var C;return i(((C=n.current)==null?void 0:C.toolbarEndRef)??null),()=>i(null)},[]),l.jsxs(Vg,{ref:n,onUsjChange:x,...p,children:[l.jsx(wN,{setCommentStore:v,onChange:N,showCommentsContainerRef:f?null:d??s,commentContainerRef:o,logger:p.logger}),l.jsx("div",{ref:o,className:"comment-container"})]})});function vN({noteOps:t,onSave:e,onClose:n,scrRef:r,noteKey:o,viewOptions:s}){const i=w.useRef(null),a=w.createRef(),c=w.useMemo(()=>({isReadonly:!1,hasSpellCheck:!1,hasExternalUI:!0,textDirection:"auto",nodes:{noteCallerOnClick:(p,f,h,v,x)=>{h||(v()===io?x(lu):x(io))}},view:{...s,noteMode:"expanded"}}),[s]);w.useEffect(()=>{var f,h;let p;return t&&!((h=(f=i.current)==null?void 0:f.getUsj())!=null&&h.content)&&(p=setTimeout(()=>{var v,x;(v=i.current)==null||v.setUsj(zc),(x=i.current)==null||x.applyUpdate(t)},0)),()=>{p&&clearTimeout(p)}},[t,o]);const u=()=>{var f;const p=(f=i.current)==null?void 0:f.getNoteOps(0);p&&e(p)},d=()=>{var f;const p=(f=a.current)==null?void 0:f.getElementsByClassName("editor-input")[0];p!=null&&p.textContent&&navigator.clipboard.writeText(p.textContent)};return l.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[l.jsx(ve,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:l.jsx(se.X,{})}),l.jsx(ve,{onClick:u,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:l.jsx(se.Check,{})})]}),l.jsxs("div",{ref:a,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[l.jsx(Zk,{options:c,onScrRefChange:()=>{},scrRef:r,ref:i}),l.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:l.jsx(ve,{onClick:d,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.Copy,{})})})]})]})}function Xg(t,e){if(!e||e.length===0)return t??"empty";const n=e.find(o=>typeof o=="string");if(n)return`key-${t??"unknown"}-${n.slice(0,10)}`;const r=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${r}`}function xN(t,e,n=!0,r=void 0){if(!e||e.length===0)return;const o=[],s=[];let i=[];return e.forEach(a=>{typeof a!="string"&&a.marker==="fp"?(i.length>0&&s.push(i),i=[a]):i.push(a)}),i.length>0&&s.push(i),s.map((a,c)=>{const u=c===s.length-1;return l.jsxs("p",{className:"tw-mb-2",children:[ju(t,a,n,!0,o),u&&r]},Xg(t,a))})}function ju(t,e,n=!0,r=!0,o=[]){if(!(!e||e.length===0))return e.map(s=>{if(typeof s=="string"){const i=`${t}-text-${s.slice(0,10)}`;if(r){const a=z(`usfm_${t}`);return l.jsx("span",{className:a,children:s},i)}return l.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),l.jsx("span",{children:s}),l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return yN(s,Xg(`${t}\\${s.marker}`,[s]),n,[...o,t??"unknown"])})}function yN(t,e,n,r=[]){const{marker:o}=t;return l.jsxs("span",{children:[o?n&&l.jsx("span",{className:"marker",children:`\\${o} `}):l.jsx(se.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),ju(o,t.content,n,!0,[...r,o??"unknown"])]},e)}function Qg({footnote:t,layout:e="horizontal",formatCaller:n,showMarkers:r=!0}){const o=n?n(t.caller):t.caller,s=o!==t.caller;let i,a=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...a]=t.content);const c=r?l.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,u=r?l.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,d=l.jsxs(l.Fragment,{children:[o&&l.jsxs("span",{className:z("note-caller",{formatted:s}),children:[o," "]}),i&&l.jsxs(l.Fragment,{children:[ju(t.marker,[i],r,!1)," "]})]}),h=z(e==="horizontal"?"horizontal tw-table-cell":"vertical",r?"marker-visible":"");return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:z("textual-note-header tw-text-nowrap tw-pr-2",h),children:[c,d]}),l.jsx("div",{className:z("textual-note-body tw-pr-0.5",h),children:a&&a.length>0&&l.jsx(l.Fragment,{children:xN(t.marker,a,r,u)})})]})}const _N=["%webView_footnoteList_header%"],CN=(t,e)=>t[e]??e;function EN({className:t,classNameForItems:e,footnotes:n,layout:r="horizontal",listId:o,selectedFootnote:s,showMarkers:i=!0,suppressFormatting:a=!1,formatCaller:c,onFootnoteSelected:u,localizedStrings:d}){const p=d?CN(d,"%webView_footnoteList_header%"):"Footnotes",f=c??ne.getFormatCallerFunction(n,void 0),h=(D,L)=>{u==null||u(D,L,o)},v=s?n.findIndex(D=>D===s):0,[x,N]=w.useState(v),C=D=>{if(n.length)switch(D.key){case"ArrowDown":D.preventDefault(),N(L=>Math.min(L+1,n.length-1));break;case"ArrowUp":D.preventDefault(),N(L=>Math.max(L-1,0));break;case"Enter":case" ":D.preventDefault(),u==null||u(n[x],x,o);break}},_=w.useRef([]);return w.useEffect(()=>{var D;x>=0&&x<_.current.length&&((D=_.current[x])==null||D.focus())},[x]),l.jsxs(l.Fragment,{children:[r==="vertical"&&l.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:p}),l.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:z("tw-h-full tw-overflow-y-auto",t),onKeyDown:C,children:l.jsx("div",{className:z("tw-p-0.5 tw-pt-1",r==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!a&&"formatted-font"),children:n.map((D,L)=>{const V=D===s,O=`${o}-${L}`;return l.jsxs(l.Fragment,{children:[l.jsx(xa,{ref:U=>{_.current[L]=U},role:"option","aria-selected":V,"data-marker":D.marker,"data-state":V?"selected":void 0,tabIndex:-1,className:z("data-[state=selected]:tw-bg-muted",u&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",e),onClick:()=>h(D,L),children:l.jsx(Qg,{footnote:D,layout:r,formatCaller:()=>f(D.caller,L),showMarkers:i})},O),L<n.length-1&&r==="vertical"&&l.jsx(Qr,{})]})})})})]})}function kN({occurrenceData:t,setScriptureReference:e,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=w.useMemo(()=>{const i=[];return t.forEach(a=>{i.some(c=>ne.deepEqual(c,a))||i.push(a)}),i},[t]);return l.jsxs(ei,{stickyHeader:!0,children:[l.jsx(ti,{stickyHeader:!0,children:l.jsxs(Gn,{children:[l.jsx(Po,{children:r}),l.jsx(Po,{children:o})]})}),l.jsx(ni,{children:s.length>0&&s.map(i=>l.jsxs(Gn,{onClick:()=>{e(i.reference)},children:[l.jsx(Cr,{children:`${$e.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),l.jsx(Cr,{children:i.text})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Fa=w.forwardRef(({className:t,...e},n)=>l.jsx(Ll.Root,{ref:n,className:z("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:l.jsx(Ll.Indicator,{className:z("tw-flex tw-items-center tw-justify-center tw-text-current"),children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}));Fa.displayName=Ll.Root.displayName;const cs=w.forwardRef(({className:t,type:e,...n},r)=>l.jsx("input",{type:e,className:z("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...n}));cs.displayName="Input";const Ba=t=>t==="asc"?l.jsx(se.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?l.jsx(se.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):l.jsx(se.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),NN=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>l.jsxs(ve,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Ba(e.getIsSorted())]})}),TN=(t,e)=>({accessorKey:`item${e}`,accessorFn:n=>n.items[e],header:({column:n})=>l.jsxs(ve,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,Ba(n.getIsSorted())]})}),SN=t=>({accessorKey:"count",header:({column:e})=>l.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:l.jsxs(ve,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,Ba(e.getIsSorted())]})}),cell:({row:e})=>l.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Ml=(t,e,n,r,o,s)=>{let i=[...n];t.forEach(c=>{e==="approved"?i.includes(c)||i.push(c):i=i.filter(u=>u!==c)}),r(i);let a=[...o];t.forEach(c=>{e==="unapproved"?a.includes(c)||a.push(c):a=a.filter(u=>u!==c)}),s(a)},AN=(t,e,n,r,o)=>({accessorKey:"status",header:({column:s})=>l.jsx("div",{className:"tw-flex tw-justify-center",children:l.jsxs(ve,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,Ba(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),a=s.getValue("item");return l.jsxs(Ca,{value:i,variant:"outline",type:"single",children:[l.jsx(Mo,{onClick:c=>{c.stopPropagation(),Ml([a],"approved",e,n,r,o)},value:"approved",children:l.jsx(se.CircleCheckIcon,{})}),l.jsx(Mo,{onClick:c=>{c.stopPropagation(),Ml([a],"unapproved",e,n,r,o)},value:"unapproved",children:l.jsx(se.CircleXIcon,{})}),l.jsx(Mo,{onClick:c=>{c.stopPropagation(),Ml([a],"unknown",e,n,r,o)},value:"unknown",children:l.jsx(se.CircleHelpIcon,{})})]})}}),DN=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),MN=t=>{const e=/^\\[vc]\s+(\d+)/,n=t.match(e);if(n)return+n[1]},RN=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Zg=(t,e,n)=>n.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",ON=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),jN=(t,e,n)=>{let r=t;return e!=="all"&&(r=r.filter(o=>e==="approved"&&o.status==="approved"||e==="unapproved"&&o.status==="unapproved"||e==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},IN=(t,e,n)=>{const r=[];return t.forEach(o=>{const s=r.find(i=>ne.deepEqual(i.items,ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(s)s.count+=1,s.occurrences.push({reference:o.verseRef,text:o.verse});else{const i={items:ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:Zg(ne.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],e,n),occurrences:[{reference:o.verseRef,text:o.verse}]};r.push(i)}}),r},qn=(t,e)=>t[e]??e;function LN({inventoryItems:t,setVerseRef:e,localizedStrings:n,additionalItemsLabels:r,approvedItems:o,unapprovedItems:s,scope:i,onScopeChange:a,columns:c,id:u,areInventoryItemsLoading:d=!1}){const p=qn(n,"%webView_inventory_all%"),f=qn(n,"%webView_inventory_approved%"),h=qn(n,"%webView_inventory_unapproved%"),v=qn(n,"%webView_inventory_unknown%"),x=qn(n,"%webView_inventory_scope_currentBook%"),N=qn(n,"%webView_inventory_scope_chapter%"),C=qn(n,"%webView_inventory_scope_verse%"),_=qn(n,"%webView_inventory_filter_text%"),D=qn(n,"%webView_inventory_show_additional_items%"),L=qn(n,"%webView_inventory_no_results%"),[V,O]=w.useState(!1),[U,F]=w.useState("all"),[$,Y]=w.useState(""),[k,R]=w.useState([]),S=w.useMemo(()=>{const W=t??[];return W.length===0?[]:IN(W,o,s)},[t,o,s]),I=w.useMemo(()=>{if(V)return S;const W=[];return S.forEach(ee=>{const te=ee.items[0],Z=W.find(X=>X.items[0]===te);Z?(Z.count+=ee.count,Z.occurrences=Z.occurrences.concat(ee.occurrences)):W.push({items:[te],count:ee.count,occurrences:ee.occurrences,status:ee.status})}),W},[V,S]),A=w.useMemo(()=>I.length===0?[]:jN(I,U,$),[I,U,$]),T=w.useMemo(()=>{var te,Z;if(!V)return c;const W=(te=r==null?void 0:r.tableHeaders)==null?void 0:te.length;if(!W)return c;const ee=[];for(let X=0;X<W;X++)ee.push(TN(((Z=r==null?void 0:r.tableHeaders)==null?void 0:Z[X])||"Additional Item",X+1));return[...ee,...c]},[r==null?void 0:r.tableHeaders,c,V]);w.useEffect(()=>{A.length===0?R([]):A.length===1&&R(A[0].items)},[A]);const P=(W,ee)=>{ee.setRowSelection(()=>{const te={};return te[W.index]=!0,te}),R(W.original.items)},H=W=>{if(W==="book"||W==="chapter"||W==="verse")a(W);else throw new Error(`Invalid scope value: ${W}`)},J=W=>{if(W==="all"||W==="approved"||W==="unapproved"||W==="unknown")F(W);else throw new Error(`Invalid status filter value: ${W}`)},K=w.useMemo(()=>{if(I.length===0||k.length===0)return[];const W=I.filter(ee=>ne.deepEqual(V?ee.items:[ee.items[0]],k));if(W.length>1)throw new Error("Selected item is not unique");return W.length===0?[]:W[0].occurrences},[k,V,I]);return l.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[l.jsxs("div",{className:"tw-flex tw-items-stretch",children:[l.jsxs(Zr,{onValueChange:W=>J(W),defaultValue:U,children:[l.jsx(Er,{className:"tw-m-1",children:l.jsx(eo,{placeholder:"Select filter"})}),l.jsxs(kr,{children:[l.jsx(cn,{value:"all",children:p}),l.jsx(cn,{value:"approved",children:f}),l.jsx(cn,{value:"unapproved",children:h}),l.jsx(cn,{value:"unknown",children:v})]})]}),l.jsxs(Zr,{onValueChange:W=>H(W),defaultValue:i,children:[l.jsx(Er,{className:"tw-m-1",children:l.jsx(eo,{placeholder:"Select scope"})}),l.jsxs(kr,{children:[l.jsx(cn,{value:"book",children:x}),l.jsx(cn,{value:"chapter",children:N}),l.jsx(cn,{value:"verse",children:C})]})]}),l.jsx(cs,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:$,onChange:W=>{Y(W.target.value)}}),r&&l.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[l.jsx(Fa,{className:"tw-m-1",checked:V,onCheckedChange:W=>{O(W)}}),l.jsx(ht,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??D})]})]}),l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(Eh,{columns:T,data:A,onRowClickHandler:P,stickyHeader:!0,isLoading:d,noResultsMessage:L})}),K.length>0&&l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(kN,{occurrenceData:K,setScriptureReference:e,localizedStrings:n})})]})}const PN="16rem",$N="3rem",em=w.createContext(void 0);function di(){const t=w.useContext(em);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Iu=w.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...a},c)=>{const[u,d]=w.useState(t),p=e??u,f=w.useCallback(D=>{const L=typeof D=="function"?D(p):D;n?n(L):d(L)},[n,p]),h=w.useCallback(()=>f(D=>!D),[f]),v=p?"expanded":"collapsed",C=_t()==="ltr"?i:i==="primary"?"secondary":"primary",_=w.useMemo(()=>({state:v,open:p,setOpen:f,toggleSidebar:h,side:C}),[v,p,f,h,C]);return l.jsx(em.Provider,{value:_,children:l.jsx(Ys,{delayDuration:0,children:l.jsx("div",{style:{"--sidebar-width":PN,"--sidebar-width-icon":$N,...o},className:z("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...a,children:s})})})});Iu.displayName="SidebarProvider";const Lu=w.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:n,children:r,...o},s)=>{const i=di();return e==="none"?l.jsx("div",{className:z("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):l.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[l.jsx("div",{className:z("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),l.jsx("div",{className:z("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:l.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Lu.displayName="Sidebar";const tm=w.forwardRef(({className:t,onClick:e,...n},r)=>{const o=di();return l.jsxs(ve,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:z("tw-h-7 tw-w-7",t),onClick:s=>{e==null||e(s),o.toggleSidebar()},...n,children:[o.side==="primary"?l.jsx(se.PanelLeft,{}):l.jsx(se.PanelRight,{}),l.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});tm.displayName="SidebarTrigger";const nm=w.forwardRef(({className:t,...e},n)=>{const{toggleSidebar:r}=di();return l.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:z("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});nm.displayName="SidebarRail";const Pu=w.forwardRef(({className:t,...e},n)=>l.jsx("main",{ref:n,className:z("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Pu.displayName="SidebarInset";const rm=w.forwardRef(({className:t,...e},n)=>l.jsx(cs,{ref:n,"data-sidebar":"input",className:z("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));rm.displayName="SidebarInput";const om=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"header",className:z("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));om.displayName="SidebarHeader";const sm=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"footer",className:z("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));sm.displayName="SidebarFooter";const im=w.forwardRef(({className:t,...e},n)=>l.jsx(Qr,{ref:n,"data-sidebar":"separator",className:z("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));im.displayName="SidebarSeparator";const $u=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"content",className:z("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));$u.displayName="SidebarContent";const fa=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group",className:z("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));fa.displayName="SidebarGroup";const ha=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Jo.Slot:"div";return l.jsx(o,{ref:r,"data-sidebar":"group-label",className:z("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...n})});ha.displayName="SidebarGroupLabel";const am=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Jo.Slot:"button";return l.jsx(o,{ref:r,"data-sidebar":"group-action",className:z("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...n})});am.displayName="SidebarGroupAction";const wa=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group-content",className:z("tw-w-full tw-text-sm",t),...e}));wa.displayName="SidebarGroupContent";const Fu=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu",className:z("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Fu.displayName="SidebarMenu";const Bu=w.forwardRef(({className:t,...e},n)=>l.jsx("li",{ref:n,"data-sidebar":"menu-item",className:z("tw-group/menu-item tw-relative",t),...e}));Bu.displayName="SidebarMenuItem";const FN=Dr.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),qu=w.forwardRef(({asChild:t=!1,isActive:e=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},a)=>{const c=t?Jo.Slot:"button",{state:u}=di(),d=l.jsx(c,{ref:a,"data-sidebar":"menu-button","data-size":r,"data-active":e,className:z(FN({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:d}),l.jsx(Ws,{side:"right",align:"center",hidden:u!=="collapsed",...o})]})):d});qu.displayName="SidebarMenuButton";const lm=w.forwardRef(({className:t,asChild:e=!1,showOnHover:n=!1,...r},o)=>{const s=e?Jo.Slot:"button";return l.jsx(s,{ref:o,"data-sidebar":"menu-action",className:z("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...r})});lm.displayName="SidebarMenuAction";const cm=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:z("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));cm.displayName="SidebarMenuBadge";const um=w.forwardRef(({className:t,showIcon:e=!1,...n},r)=>{const o=w.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return l.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:z("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...n,children:[e&&l.jsx(Ki,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),l.jsx(Ki,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});um.displayName="SidebarMenuSkeleton";const dm=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:z("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));dm.displayName="SidebarMenuSub";const pm=w.forwardRef(({...t},e)=>l.jsx("li",{ref:e,...t}));pm.displayName="SidebarMenuSubItem";const fm=w.forwardRef(({asChild:t=!1,size:e="md",isActive:n,className:r,...o},s)=>{const i=t?Jo.Slot:"a";return l.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":n,className:z("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});fm.displayName="SidebarMenuSubButton";function hm({id:t,extensionLabels:e,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:a,className:c}){const u=w.useCallback((f,h)=>{r(f,h)},[r]),d=w.useCallback(f=>{const h=n.find(v=>v.projectId===f);return h?h.projectName:f},[n]),p=w.useCallback(f=>!o.projectId&&f===o.label,[o]);return l.jsx(Lu,{id:t,collapsible:"none",variant:"inset",className:z("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:l.jsxs($u,{children:[l.jsxs(fa,{children:[l.jsx(ha,{className:"tw-text-sm",children:s}),l.jsx(wa,{children:l.jsx(Fu,{children:Object.entries(e).map(([f,h])=>l.jsx(Bu,{children:l.jsx(qu,{onClick:()=>u(f),isActive:p(f),children:l.jsx("span",{className:"tw-pl-3",children:h})})},f))})})]}),l.jsxs(fa,{children:[l.jsx(ha,{className:"tw-text-sm",children:i}),l.jsx(wa,{className:"tw-pl-3",children:l.jsx(Gi,{buttonVariant:"ghost",buttonClassName:z("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:d,buttonPlaceholder:a,onChange:f=>{const h=d(f);u(h,f)},value:(o==null?void 0:o.projectId)??void 0,icon:l.jsx(se.ScrollText,{})})})]})]})})}const qa=w.forwardRef(({value:t,onSearch:e,placeholder:n,isFullWidth:r,className:o,isDisabled:s=!1,id:i},a)=>{const c=_t();return l.jsxs("div",{id:i,className:z("tw-relative",{"tw-w-full":r},o),children:[l.jsx(se.Search,{className:z("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":c==="rtl"},{"tw-left-3":c==="ltr"})}),l.jsx(cs,{ref:a,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:t,onChange:u=>e(u.target.value),disabled:s}),t&&l.jsxs(ve,{variant:"ghost",size:"icon",className:z("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":c==="rtl"},{"tw-right-0":c==="ltr"}),onClick:()=>{e("")},children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});qa.displayName="SearchBar";function BN({id:t,extensionLabels:e,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:a,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}){return l.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[l.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:l.jsx(qa,{className:"tw-w-9/12",value:i,onSearch:a,placeholder:"Search app settings, extension settings, and project settings"})}),l.jsxs(Iu,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[l.jsx(hm,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}),l.jsx(Pu,{className:"tw-min-w-[215px]",children:r})]})]})}const mr="scrBook",qN="scrRef",Gr="source",UN="details",VN="Scripture Reference",HN="Scripture Book",wm="Type",zN="Details";function GN(t,e){const n=e??!1;return[{accessorFn:r=>`${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,id:mr,header:(t==null?void 0:t.scriptureReferenceColumnName)??VN,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?$e.bookIdToEnglishName(o.start.book):r.row.groupingColumnId===mr?ne.formatScrRef(o.start):void 0},getGroupingValue:r=>$e.bookIdToNumber(r.start.book),sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>ne.formatScrRef(r.start),id:qN,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:ne.formatScrRef(o.start)},sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Gr,header:n?(t==null?void 0:t.typeColumnName)??wm:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:UN,header:(t==null?void 0:t.detailsColumnName)??zN,cell:r=>r.getValue(),enableGrouping:!1}]}const KN=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let n=0;return t.end&&({offset:n}=t.end),!t.end||ne.compareScrRefs(t.start,t.end)===0?`${ne.scrRefToBBBCCCVVV(t.start)}+${e}`:`${ne.scrRefToBBBCCCVVV(t.start)}+${e}-${ne.scrRefToBBBCCCVVV(t.end)}+${n}`},hf=t=>`${KN({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function YN({sources:t,showColumnHeaders:e=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:a,id:c}){const[u,d]=w.useState([]),[p,f]=w.useState([{id:mr,desc:!1}]),[h,v]=w.useState({}),x=w.useMemo(()=>t.flatMap($=>$.data.map(Y=>({...Y,source:$.source}))),[t]),N=w.useMemo(()=>GN({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);w.useEffect(()=>{u.includes(Gr)?f([{id:Gr,desc:!1},{id:mr,desc:!1}]):f([{id:mr,desc:!1}])},[u]);const C=Ft.useReactTable({data:x,columns:N,state:{grouping:u,sorting:p,rowSelection:h},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:v,getExpandedRowModel:Ft.getExpandedRowModel(),getGroupedRowModel:Ft.getGroupedRowModel(),getCoreRowModel:Ft.getCoreRowModel(),getSortedRowModel:Ft.getSortedRowModel(),getRowId:hf,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});w.useEffect(()=>{if(a){const $=C.getSelectedRowModel().rowsById,Y=Object.keys($);if(Y.length===1){const k=x.find(R=>hf(R)===Y[0])||void 0;k&&a(k)}}},[h,x,a,C]);const _=o??HN,D=s??wm,L=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[mr]},{label:`Group by ${D}`,value:[Gr]},{label:`Group by ${_} and ${D}`,value:[mr,Gr]},{label:`Group by ${D} and ${_}`,value:[Gr,mr]}],V=$=>{d(JSON.parse($))},O=($,Y)=>{!$.getIsGrouped()&&!$.getIsSelected()&&$.getToggleSelectedHandler()(Y)},U=($,Y)=>$.getIsGrouped()?"":z("banded-row",Y%2===0?"even":"odd"),F=($,Y,k)=>{if(!(($==null?void 0:$.length)===0||Y.depth<k.column.getGroupedIndex())){if(Y.getIsGrouped())switch(Y.depth){case 1:return"tw-ps-4";default:return}switch(Y.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return l.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&l.jsxs(Zr,{value:JSON.stringify(u),onValueChange:$=>{V($)},children:[l.jsx(Er,{className:"tw-mb-1 tw-mt-2",children:l.jsx(eo,{})}),l.jsx(kr,{position:"item-aligned",children:l.jsx(bh,{children:L.map($=>l.jsx(cn,{value:JSON.stringify($.value),children:$.label},$.label))})})]}),l.jsxs(ei,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&l.jsx(ti,{children:C.getHeaderGroups().map($=>l.jsx(Gn,{children:$.headers.filter(Y=>Y.column.columnDef.header).map(Y=>l.jsx(Po,{colSpan:Y.colSpan,className:"top-0 tw-sticky",children:Y.isPlaceholder?void 0:l.jsxs("div",{children:[Y.column.getCanGroup()?l.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${Y.column.columnDef.header}`,onClick:Y.column.getToggleGroupingHandler(),type:"button",children:Y.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ft.flexRender(Y.column.columnDef.header,Y.getContext())]})},Y.id))},$.id))}),l.jsx(ni,{children:C.getRowModel().rows.map(($,Y)=>{const k=_t();return l.jsx(Gn,{"data-state":$.getIsSelected()?"selected":"",className:z(U($,Y)),onClick:R=>O($,R),children:$.getVisibleCells().map(R=>{if(!(R.getIsPlaceholder()||R.column.columnDef.enableGrouping&&!R.getIsGrouped()&&(R.column.columnDef.id!==Gr||!n)))return l.jsx(Cr,{className:z(R.column.columnDef.id,"tw-p-[1px]",F(u,$,R)),children:R.getIsGrouped()?l.jsxs(ve,{variant:"link",onClick:$.getToggleExpandedHandler(),type:"button",children:[$.getIsExpanded()&&l.jsx(se.ChevronDown,{}),!$.getIsExpanded()&&(k==="ltr"?l.jsx(se.ChevronRight,{}):l.jsx(se.ChevronLeft,{}))," ",Ft.flexRender(R.column.columnDef.cell,R.getContext())," (",$.subRows.length,")"]}):Ft.flexRender(R.column.columnDef.cell,R.getContext())},R.id)})},$.id)})})]})]})}const Uu=(t,e)=>t.filter(n=>{try{return ne.getSectionForBook(n)===e}catch{return!1}}),gm=(t,e,n)=>Uu(t,e).every(r=>n.includes(r));function WN({section:t,availableBookIds:e,selectedBookIds:n,onToggle:r,localizedStrings:o}){const s=Uu(e,t).length===0,i=o["%scripture_section_ot_short%"],a=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],u=o["%scripture_section_extra_short%"];return l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>r(t),className:z(gm(e,t,n)&&!s&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:s,children:Hb(t,i,a,c,u)})}const wf=5,Rl=6;function JN({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:n,localizedStrings:r,localizedBookNames:o}){const s=r["%webView_book_selector_books_selected%"],i=r["%webView_book_selector_select_books%"],a=r["%webView_book_selector_search_books%"],c=r["%webView_book_selector_select_all%"],u=r["%webView_book_selector_clear_all%"],d=r["%webView_book_selector_no_book_found%"],p=r["%webView_book_selector_more%"],{otLong:f,ntLong:h,dcLong:v,extraLong:x}={otLong:r==null?void 0:r["%scripture_section_ot_long%"],ntLong:r==null?void 0:r["%scripture_section_nt_long%"],dcLong:r==null?void 0:r["%scripture_section_dc_long%"],extraLong:r==null?void 0:r["%scripture_section_extra_long%"]},[N,C]=w.useState(!1),[_,D]=w.useState(""),L=w.useRef(void 0),V=w.useRef(!1);if(t.length!==$e.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=w.useMemo(()=>$e.allBookIds.filter((I,A)=>t[A]==="1"&&!$e.isObsolete($e.bookIdToNumber(I))),[t]),U=w.useMemo(()=>{if(!_.trim()){const T={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return O.forEach(P=>{const H=ne.getSectionForBook(P);T[H].push(P)}),T}const I=O.filter(T=>Nc(T,_,o)),A={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return I.forEach(T=>{const P=ne.getSectionForBook(T);A[P].push(T)}),A},[O,_,o]),F=w.useCallback((I,A=!1)=>{if(!A||!L.current){n(e.includes(I)?e.filter(W=>W!==I):[...e,I]),L.current=I;return}const T=O.findIndex(W=>W===L.current),P=O.findIndex(W=>W===I);if(T===-1||P===-1)return;const[H,J]=[Math.min(T,P),Math.max(T,P)],K=O.slice(H,J+1).map(W=>W);n(e.includes(I)?e.filter(W=>!K.includes(W)):[...new Set([...e,...K])])},[e,n,O]),$=I=>{F(I,V.current),V.current=!1},Y=(I,A)=>{I.preventDefault(),F(A,I.shiftKey)},k=w.useCallback(I=>{const A=Uu(O,I).map(T=>T);n(gm(O,I,e)?e.filter(T=>!A.includes(T)):[...new Set([...e,...A])])},[e,n,O]),R=()=>{n(O.map(I=>I))},S=()=>{n([])};return l.jsxs("div",{className:"tw-space-y-2",children:[l.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(ne.Section).map(I=>l.jsx(WN,{section:I,availableBookIds:O,selectedBookIds:e,onToggle:k,localizedStrings:r},I))}),l.jsxs(wo,{open:N,onOpenChange:I=>{C(I),I||D("")},children:[l.jsx(go,{asChild:!0,children:l.jsxs(ve,{variant:"outline",role:"combobox","aria-expanded":N,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${s}: ${e.length}`:i,l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{className:"tw-w-full tw-p-0",align:"start",children:l.jsxs(fo,{shouldFilter:!1,onKeyDown:I=>{I.key==="Enter"&&(V.current=I.shiftKey)},children:[l.jsx(Qo,{placeholder:a,value:_,onValueChange:D}),l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:R,children:c}),l.jsx(ve,{variant:"ghost",size:"sm",onClick:S,children:u})]}),l.jsxs(ho,{children:[l.jsx(Ks,{children:d}),Object.values(ne.Section).map((I,A)=>{const T=U[I];if(T.length!==0)return l.jsxs(w.Fragment,{children:[l.jsx(ir,{heading:Of(I,f,h,v,x),children:T.map(P=>l.jsx(If,{bookId:P,isSelected:e.includes(P),onSelect:()=>$(P),onMouseDown:H=>Y(H,P),section:ne.getSectionForBook(P),showCheck:!0,localizedBookNames:o,commandValue:Fl(P,o),className:"tw-flex tw-items-center"},P))}),A<Object.values(ne.Section).length-1&&l.jsx(Nf,{})]},I)})]})]})})]}),e.length>0&&l.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Rl?Rl:wf).map(I=>l.jsx(Lo,{className:"hover:tw-bg-secondary",variant:"secondary",children:Do(I,o)},I)),e.length>Rl&&l.jsx(Lo,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-wf} ${p}`})]})]})}const XN=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Hr=(t,e)=>t[e]??e;function QN({scope:t,availableScopes:e,onScopeChange:n,availableBookInfo:r,selectedBookIds:o,onSelectedBookIdsChange:s,localizedStrings:i,localizedBookNames:a,id:c}){const u=Hr(i,"%webView_scope_selector_selected_text%"),d=Hr(i,"%webView_scope_selector_current_verse%"),p=Hr(i,"%webView_scope_selector_current_chapter%"),f=Hr(i,"%webView_scope_selector_current_book%"),h=Hr(i,"%webView_scope_selector_choose_books%"),v=Hr(i,"%webView_scope_selector_scope%"),x=Hr(i,"%webView_scope_selector_select_books%"),N=[{value:"selectedText",label:u,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],C=e?N.filter(_=>e.includes(_.value)):N;return l.jsxs("div",{id:c,className:"tw-grid tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:v}),l.jsx(va,{value:t,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:C.map(({value:_,label:D,id:L})=>l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(As,{className:"tw-me-2",value:_,id:L}),l.jsx(ht,{htmlFor:L,children:D})]},L))})]}),t==="selectedBooks"&&l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:x}),l.jsx(JN,{availableBookInfo:r,selectedBookIds:o,onChangeSelectedBookIds:s,localizedStrings:i,localizedBookNames:a})]})]})}const Ol={[ne.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ne.getLocalizeKeyForScrollGroupId(0)]:"A",[ne.getLocalizeKeyForScrollGroupId(1)]:"B",[ne.getLocalizeKeyForScrollGroupId(2)]:"C",[ne.getLocalizeKeyForScrollGroupId(3)]:"D",[ne.getLocalizeKeyForScrollGroupId(4)]:"E",[ne.getLocalizeKeyForScrollGroupId(5)]:"F",[ne.getLocalizeKeyForScrollGroupId(6)]:"G",[ne.getLocalizeKeyForScrollGroupId(7)]:"H",[ne.getLocalizeKeyForScrollGroupId(8)]:"I",[ne.getLocalizeKeyForScrollGroupId(9)]:"J",[ne.getLocalizeKeyForScrollGroupId(10)]:"K",[ne.getLocalizeKeyForScrollGroupId(11)]:"L",[ne.getLocalizeKeyForScrollGroupId(12)]:"M",[ne.getLocalizeKeyForScrollGroupId(13)]:"N",[ne.getLocalizeKeyForScrollGroupId(14)]:"O",[ne.getLocalizeKeyForScrollGroupId(15)]:"P",[ne.getLocalizeKeyForScrollGroupId(16)]:"Q",[ne.getLocalizeKeyForScrollGroupId(17)]:"R",[ne.getLocalizeKeyForScrollGroupId(18)]:"S",[ne.getLocalizeKeyForScrollGroupId(19)]:"T",[ne.getLocalizeKeyForScrollGroupId(20)]:"U",[ne.getLocalizeKeyForScrollGroupId(21)]:"V",[ne.getLocalizeKeyForScrollGroupId(22)]:"W",[ne.getLocalizeKeyForScrollGroupId(23)]:"X",[ne.getLocalizeKeyForScrollGroupId(24)]:"Y",[ne.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ZN({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:n,localizedStrings:r={},size:o="sm",className:s,id:i}){const a={...Ol,...Object.fromEntries(Object.entries(r).map(([u,d])=>[u,u===d&&u in Ol?Ol[u]:d]))},c=_t();return l.jsxs(Zr,{value:`${e}`,onValueChange:u=>n(u==="undefined"?void 0:parseInt(u,10)),children:[l.jsx(Er,{size:o,className:z("pr-twp tw-w-auto",s),children:l.jsx(eo,{placeholder:a[ne.getLocalizeKeyForScrollGroupId(e)]??e})}),l.jsx(kr,{id:i,align:c==="rtl"?"end":"start",style:{zIndex:250},children:t.map(u=>l.jsx(cn,{value:`${u}`,children:a[ne.getLocalizeKeyForScrollGroupId(u)]},`${u}`))})]})}function eT({children:t}){return l.jsx("div",{className:"pr-twp tw-grid",children:t})}function tT({primary:t,secondary:e,children:n,isLoading:r=!1,loadingMessage:o}){return l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),l.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),r?l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):l.jsx("div",{children:n})]})}function nT({primary:t,secondary:e,includeSeparator:n=!1}){return l.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),n?l.jsx(Qr,{}):""]})}function mm(t,e){var n;return(n=Object.entries(t).find(([,r])=>"menuItem"in r&&r.menuItem===e))==null?void 0:n[0]}function ga({icon:t,menuLabel:e,leading:n}){return t?l.jsx("img",{className:z("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:t,alt:`${n?"Leading":"Trailing"} icon for ${e}`}):void 0}const bm=(t,e,n,r)=>n?Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order).flatMap(([s])=>e.filter(a=>a.group===s).sort((a,c)=>a.order-c.order).map(a=>l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:"command"in a?l.jsxs(qc,{onClick:()=>{r(a)},children:[a.iconPathBefore&&l.jsx(ga,{icon:a.iconPathBefore,menuLabel:a.label,leading:!0}),a.label,a.iconPathAfter&&l.jsx(ga,{icon:a.iconPathAfter,menuLabel:a.label})]},`dropdown-menu-item-${a.label}-${a.command}`):l.jsxs(wh,{children:[l.jsx(Fc,{children:a.label}),l.jsx(hh,{children:l.jsx(Bc,{children:bm(t,e,mm(t,a.id),r)})})]},`dropdown-menu-sub-${a.label}-${a.id}`)}),a.tooltip&&l.jsx(Ws,{children:a.tooltip})]},`tooltip-${a.label}-${"command"in a?a.command:a.id}`))):void 0;function ma({onSelectMenuItem:t,menuData:e,tabLabel:n,icon:r,className:o,variant:s,buttonVariant:i="ghost",id:a}){return l.jsxs(Qs,{variant:s,children:[l.jsx(Ea,{"aria-label":n,className:o,asChild:!0,id:a,children:l.jsx(ve,{variant:i,size:"icon",children:r??l.jsx(se.MenuIcon,{})})}),l.jsx(es,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,c])=>typeof c=="object").sort(([,c],[,u])=>typeof c=="boolean"||typeof u=="boolean"?0:c.order-u.order).map(([c],u,d)=>l.jsxs(w.Fragment,{children:[l.jsx($c,{children:l.jsx(Ys,{children:bm(e.groups,e.items,c,t)})}),u<d.length-1&&l.jsx(Zs,{})]},c))})]})}const vm=w.forwardRef(({id:t,className:e,children:n},r)=>l.jsx("div",{ref:r,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:n}));function rT({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:n,tabViewMenuData:r,id:o,className:s,startAreaChildren:i,centerAreaChildren:a,endAreaChildren:c,menuButtonIcon:u}){return l.jsxs(vm,{className:`tw-w-full tw-border ${s}`,id:o,children:[n&&l.jsx(ma,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:u??l.jsx(se.Menu,{}),buttonVariant:"ghost"}),i&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),a&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:a}),l.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[r&&l.jsx(ma,{onSelectMenuItem:e,menuData:r,tabLabel:"View Info",icon:l.jsx(se.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}function oT({onSelectProjectMenuItem:t,projectMenuData:e,id:n,className:r,menuButtonIcon:o}){return l.jsx(vm,{className:"tw-pointer-events-none",id:n,children:e&&l.jsx(ma,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:o,className:`tw-pointer-events-auto tw-shadow-lg ${r}`,buttonVariant:"outline"})})}const Vu=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Jt.Root,{orientation:"vertical",ref:n,className:z("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:r})});Vu.displayName=Jt.List.displayName;const Hu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.List,{ref:n,className:z("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Hu.displayName=Jt.List.displayName;const xm=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,...e,className:z("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),zu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:z("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));zu.displayName=Jt.Content.displayName;function sT({tabList:t,searchValue:e,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s,id:i}){return l.jsxs("div",{id:i,className:"pr-twp",children:[l.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?l.jsx("h1",{children:o}):"",l.jsx(qa,{className:s,value:e,onSearch:n,placeholder:r})]}),l.jsxs(Vu,{children:[l.jsx(Hu,{children:t.map(a=>l.jsx(xm,{value:a.value,children:a.value},a.key))}),t.map(a=>l.jsx(zu,{value:a.value,children:a.content},a.key))]})]})}function iT({...t}){return l.jsx(Ke.Menu,{...t})}function aT({...t}){return l.jsx(Ke.Sub,{"data-slot":"menubar-sub",...t})}const ym=w.forwardRef(({className:t,variant:e="default",...n},r)=>{const o=w.useMemo(()=>({variant:e}),[e]);return l.jsx(Pc.Provider,{value:o,children:l.jsx(Ke.Root,{ref:r,className:z("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...n})})});ym.displayName=Ke.Root.displayName;const _m=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.Trigger,{ref:n,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ur({variant:r.variant,className:t})),...e})});_m.displayName=Ke.Trigger.displayName;const Cm=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ke.SubTrigger,{ref:o,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ur({variant:s.variant,className:t}),t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Cm.displayName=Ke.SubTrigger.displayName;const Em=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.SubContent,{ref:n,className:z("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},t),...e})});Em.displayName=Ke.SubContent.displayName;const km=w.forwardRef(({className:t,align:e="start",alignOffset:n=-4,sideOffset:r=8,...o},s)=>{const i=On();return l.jsx(Ke.Portal,{children:l.jsx(Ke.Content,{ref:s,align:e,alignOffset:n,sideOffset:r,className:z("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...o})})});km.displayName=Ke.Content.displayName;const Nm=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=On();return l.jsx(Ke.Item,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ur({variant:o.variant,className:t}),t),...n})});Nm.displayName=Ke.Item.displayName;const lT=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ke.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ur({variant:s.variant,className:t}),t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});lT.displayName=Ke.CheckboxItem.displayName;const cT=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ke.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ur({variant:o.variant,className:t}),t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});cT.displayName=Ke.RadioItem.displayName;const uT=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ke.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));uT.displayName=Ke.Label.displayName;const Tm=w.forwardRef(({className:t,...e},n)=>l.jsx(Ke.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Tm.displayName=Ke.Separator.displayName;const ys=(t,e)=>{setTimeout(()=>{e.forEach(n=>{var r;(r=t.current)==null||r.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},Sm=(t,e,n,r)=>{if(!n)return;const o=Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order);return o.flatMap(([s],i)=>{const a=e.filter(u=>u.group===s).sort((u,d)=>u.order-d.order).map(u=>l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:"command"in u?l.jsxs(Nm,{onClick:()=>{r(u)},children:[u.iconPathBefore&&l.jsx(ga,{icon:u.iconPathBefore,menuLabel:u.label,leading:!0}),u.label,u.iconPathAfter&&l.jsx(ga,{icon:u.iconPathAfter,menuLabel:u.label})]},`menubar-item-${u.label}-${u.command}`):l.jsxs(aT,{children:[l.jsx(Cm,{children:u.label}),l.jsx(Em,{children:Sm(t,e,mm(t,u.id),r)})]},`menubar-sub-${u.label}-${u.id}`)}),u.tooltip&&l.jsx(Ws,{children:u.tooltip})]},`tooltip-${u.label}-${"command"in u?u.command:u.id}`)),c=[...a];return a.length>0&&i<o.length-1&&c.push(l.jsx(Tm,{},`separator-${s}`)),c})};function dT({menuData:t,onSelectMenuItem:e,onOpenChange:n,variant:r}){const o=w.useRef(void 0),s=w.useRef(void 0),i=w.useRef(void 0),a=w.useRef(void 0),c=w.useRef(void 0),u=d=>{switch(d){case"platform.app":return s;case"platform.window":return i;case"platform.layout":return a;case"platform.help":return c;default:return}};if(xb.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(d,p)=>{var v,x,N,C;d.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":ys(s,[f]);break;case"alt+p":(v=s.current)==null||v.focus(),ys(s,[f,h]);break;case"alt+l":(x=i.current)==null||x.focus(),ys(i,[f,h]);break;case"alt+n":(N=a.current)==null||N.focus(),ys(a,[f,h]);break;case"alt+h":(C=c.current)==null||C.focus(),ys(c,[f,h]);break}}),w.useEffect(()=>{if(!n||!o.current)return;const d=new MutationObserver(h=>{h.forEach(v=>{if(v.attributeName==="data-state"&&v.target instanceof HTMLElement){const x=v.target.getAttribute("data-state");n(x==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(h=>{d.observe(h,{attributes:!0})}),()=>d.disconnect()},[n]),!!t)return l.jsx(ym,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:r,children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,p])=>typeof d=="boolean"||typeof p=="boolean"?0:d.order-p.order).map(([d,p])=>l.jsxs(iT,{children:[l.jsx(_m,{ref:u(d),children:typeof p=="object"&&"label"in p&&p.label}),l.jsx(km,{className:"tw-z-[250]",children:l.jsx(Ys,{children:Sm(t.groups,t.items,d,e)})})]},d))})}function pT(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function fT({menuData:t,onOpenChange:e,onSelectMenuItem:n,className:r,id:o,children:s,appMenuAreaChildren:i,configAreaChildren:a,shouldUseAsAppDragArea:c,menubarVariant:u="default"}){const d=w.useRef(void 0);return l.jsx("div",{className:z("tw-border tw-px-4 tw-text-foreground",r),ref:d,style:{position:"relative"},id:o,children:l.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[l.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&l.jsx(dT,{menuData:t,onOpenChange:e,onSelectMenuItem:n,variant:u})]})}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:s}),l.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:l.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:a})})]})})}const hT=(t,e)=>t[e]??e;function wT({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:a,id:c}){const u=hT(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[d,p]=w.useState(!1),f=v=>{o&&o(v),r&&r([v,...n.filter(x=>x!==v)]),s&&n.find(x=>x===v)&&s([...n.filter(x=>x!==v)]),p(!1)},h=(v,x)=>{var C,_,D,L,V,O;const N=x!==v?((_=(C=t[v])==null?void 0:C.uiNames)==null?void 0:_[x])??((L=(D=t[v])==null?void 0:D.uiNames)==null?void 0:L.en):void 0;return N?`${(V=t[v])==null?void 0:V.autonym} (${N})`:(O=t[v])==null?void 0:O.autonym};return l.jsxs("div",{id:c,className:z("pr-twp tw-max-w-sm",a),children:[l.jsxs(Zr,{name:"uiLanguage",value:e,onValueChange:f,open:d,onOpenChange:v=>p(v),children:[l.jsx(Er,{children:l.jsx(eo,{})}),l.jsx(kr,{className:"tw-z-[250]",children:Object.keys(t).map(v=>l.jsx(cn,{value:v,children:h(v,e)},v))})]}),e!=="en"&&l.jsx("div",{className:"tw-pt-3",children:l.jsx(ht,{className:"tw-font-normal tw-text-muted-foreground",children:ne.formatReplacementString(u,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(v=>h(v,e)).join(", "):t.en.autonym})})})]})}function gT({item:t,createLabel:e,createComplexLabel:n}){return e?l.jsx(ht,{children:e(t)}):n?l.jsx(ht,{children:n(t)}):l.jsx(ht,{children:t})}function mT({id:t,className:e,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s,createComplexLabel:i}){return l.jsx("div",{id:t,className:e,children:n.map(a=>l.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[l.jsx(Fa,{className:"tw-me-2 tw-align-middle",checked:r.includes(a),onCheckedChange:c=>o(a,c)}),l.jsx(gT,{item:a,createLabel:s,createComplexLabel:i})]},a))})}function bT({cardKey:t,isSelected:e,onSelect:n,isDenied:r,isHidden:o=!1,className:s,children:i,dropdownContent:a,additionalSelectedContent:c,accentColor:u}){const d=p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),n())};return l.jsxs("div",{hidden:o,onClick:n,onKeyDown:d,role:"button",tabIndex:0,"aria-pressed":e,className:z("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":r&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},s),children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[l.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[l.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&a&&l.jsxs(Qs,{children:[l.jsx(Ea,{className:z(u&&"tw-me-1"),asChild:!0,children:l.jsx(ve,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.MoreHorizontal,{})})}),l.jsx(es,{align:"end",children:a})]})]}),e&&c&&l.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:c})]}),u&&l.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`})]},t)}const Am=w.forwardRef(({className:t,...e},n)=>l.jsx(se.LoaderCircle,{size:35,className:z("tw-animate-spin",t),...e,ref:n}));Am.displayName="Spinner";function vT({id:t,isDisabled:e=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:a=!1,className:c,defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}){return l.jsxs("div",{className:z("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[l.jsx(ht,{htmlFor:t,className:z({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${a?"*":""}`}),l.jsx(cs,{id:t,disabled:e,placeholder:i,required:a,className:z(c,{"tw-border-red-600":n}),defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}),l.jsx("p",{className:z({"tw-hidden":!o}),children:o})]})}const xT=Dr.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Dm=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:z("pr-twp",xT({variant:e}),t),...n}));Dm.displayName="Alert";const Mm=w.forwardRef(({className:t,...e},n)=>l.jsxs("h5",{ref:n,className:z("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Mm.displayName="AlertTitle";const Rm=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Rm.displayName="AlertDescription";const yT=Ye.Root,_T=Ye.Trigger,CT=Ye.Group,ET=Ye.Portal,kT=Ye.Sub,NT=Ye.RadioGroup,Om=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>l.jsxs(Ye.SubTrigger,{ref:o,className:z("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Om.displayName=Ye.SubTrigger.displayName;const jm=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.SubContent,{ref:n,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));jm.displayName=Ye.SubContent.displayName;const Im=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Portal,{children:l.jsx(Ye.Content,{ref:n,className:z("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Im.displayName=Ye.Content.displayName;const Lm=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Item,{ref:r,className:z("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...n}));Lm.displayName=Ye.Item.displayName;const Pm=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>l.jsxs(Ye.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Pm.displayName=Ye.CheckboxItem.displayName;const $m=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(Ye.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));$m.displayName=Ye.RadioItem.displayName;const Fm=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...n}));Fm.displayName=Ye.Label.displayName;const Bm=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Bm.displayName=Ye.Separator.displayName;function qm({className:t,...e}){return l.jsx("span",{className:z("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}qm.displayName="ContextMenuShortcut";const Um=w.createContext({direction:"bottom"});function Vm({shouldScaleBackground:t=!0,direction:e="bottom",...n}){const r=w.useMemo(()=>({direction:e}),[e]);return l.jsx(Um.Provider,{value:r,children:l.jsx(Rn.Drawer.Root,{shouldScaleBackground:t,direction:e,...n})})}Vm.displayName="Drawer";const TT=Rn.Drawer.Trigger,Hm=Rn.Drawer.Portal,ST=Rn.Drawer.Close,Gu=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Overlay,{ref:n,className:z("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Gu.displayName=Rn.Drawer.Overlay.displayName;const zm=w.forwardRef(({className:t,children:e,hideDrawerHandle:n=!1,...r},o)=>{const{direction:s="bottom"}=w.useContext(Um),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},a={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return l.jsxs(Hm,{children:[l.jsx(Gu,{}),l.jsxs(Rn.Drawer.Content,{ref:o,className:z("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",s==="bottom"||s==="top"?"tw-flex-col":"tw-flex-row",i[s],t),...r,children:[!n&&(s==="bottom"||s==="right")&&l.jsx("div",{className:a[s]}),l.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!n&&(s==="top"||s==="left")&&l.jsx("div",{className:a[s]})]})]})});zm.displayName="DrawerContent";function Gm({className:t,...e}){return l.jsx("div",{className:z("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Gm.displayName="DrawerHeader";function Km({className:t,...e}){return l.jsx("div",{className:z("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Km.displayName="DrawerFooter";const Ym=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Title,{ref:n,className:z("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ym.displayName=Rn.Drawer.Title.displayName;const Wm=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Description,{ref:n,className:z("tw-text-sm tw-text-muted-foreground",t),...e}));Wm.displayName=Rn.Drawer.Description.displayName;const Jm=w.forwardRef(({className:t,value:e,...n},r)=>l.jsx(Pl.Root,{ref:r,className:z("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...n,children:l.jsx(Pl.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Jm.displayName=Pl.Root.displayName;function AT({className:t,...e}){return l.jsx(yc.PanelGroup,{className:z("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const DT=yc.Panel;function MT({withHandle:t,className:e,...n}){return l.jsx(yc.PanelResizeHandle,{className:z("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...n,children:t&&l.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:l.jsx(se.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function RT({...t}){return l.jsx(bf.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Xm=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsxs(_s.Root,{ref:n,className:z("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:r,children:[l.jsx(_s.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:l.jsx(_s.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),l.jsx(_s.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Xm.displayName=_s.Root.displayName;const Qm=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx($l.Root,{className:z("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:n,children:l.jsx($l.Thumb,{className:z("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});Qm.displayName=$l.Root.displayName;const OT=Jt.Root,Zm=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Jt.List,{ref:n,className:z("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:r})});Zm.displayName=Jt.List.displayName;const eb=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,className:z("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));eb.displayName=Jt.Trigger.displayName;const tb=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:z("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));tb.displayName=Jt.Content.displayName;const nb=w.forwardRef(({className:t,...e},n)=>l.jsx("textarea",{className:z("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:n,...e}));nb.displayName="Textarea";const jT=(t,e)=>{w.useEffect(()=>{if(!t)return()=>{};const n=t(e);return()=>{n()}},[t,e])};function IT(t){return{preserveValue:!0,...t}}const rb=(t,e,n={})=>{const r=w.useRef(e);r.current=e;const o=w.useRef(n);o.current=IT(o.current);const[s,i]=w.useState(()=>r.current),[a,c]=w.useState(!0);return w.useEffect(()=>{let u=!0;return c(!!t),(async()=>{if(t){const d=await t();u&&(i(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||i(()=>r.current)}},[t]),[s,a]},jl=()=>!1,LT=(t,e)=>{const[n]=rb(w.useCallback(async()=>{if(!t)return jl;const r=await Promise.resolve(t(e));return async()=>r()},[e,t]),jl,{preserveValue:!1});w.useEffect(()=>()=>{n!==jl&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>bf.toast});exports.Alert=Dm;exports.AlertDescription=Rm;exports.AlertTitle=Mm;exports.Avatar=Ic;exports.AvatarFallback=Lc;exports.AvatarImage=fh;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Xb;exports.BOOK_SELECTOR_STRING_KEYS=e0;exports.Badge=Lo;exports.BookChapterControl=Jb;exports.BookSelectionMode=Ff;exports.BookSelector=t0;exports.Button=ve;exports.Card=xa;exports.CardContent=Tc;exports.CardDescription=Vf;exports.CardFooter=Hf;exports.CardHeader=qf;exports.CardTitle=Uf;exports.ChapterRangeSelector=$f;exports.Checkbox=Fa;exports.Checklist=mT;exports.ComboBox=Gi;exports.Command=fo;exports.CommandEmpty=Ks;exports.CommandGroup=ir;exports.CommandInput=Qo;exports.CommandItem=Mr;exports.CommandList=ho;exports.CommentList=H0;exports.ContextMenu=yT;exports.ContextMenuCheckboxItem=Pm;exports.ContextMenuContent=Im;exports.ContextMenuGroup=CT;exports.ContextMenuItem=Lm;exports.ContextMenuLabel=Fm;exports.ContextMenuPortal=ET;exports.ContextMenuRadioGroup=NT;exports.ContextMenuRadioItem=$m;exports.ContextMenuSeparator=Bm;exports.ContextMenuShortcut=qm;exports.ContextMenuSub=kT;exports.ContextMenuSubContent=jm;exports.ContextMenuSubTrigger=Om;exports.ContextMenuTrigger=_T;exports.DataTable=Eh;exports.Drawer=Vm;exports.DrawerClose=ST;exports.DrawerContent=zm;exports.DrawerDescription=Wm;exports.DrawerFooter=Km;exports.DrawerHeader=Gm;exports.DrawerOverlay=Gu;exports.DrawerPortal=Hm;exports.DrawerTitle=Ym;exports.DrawerTrigger=TT;exports.DropdownMenu=Qs;exports.DropdownMenuCheckboxItem=ka;exports.DropdownMenuContent=es;exports.DropdownMenuGroup=$c;exports.DropdownMenuItem=qc;exports.DropdownMenuItemType=Th;exports.DropdownMenuLabel=Na;exports.DropdownMenuPortal=hh;exports.DropdownMenuRadioGroup=gh;exports.DropdownMenuRadioItem=Uc;exports.DropdownMenuSeparator=Zs;exports.DropdownMenuShortcut=mh;exports.DropdownMenuSub=wh;exports.DropdownMenuSubContent=Bc;exports.DropdownMenuSubTrigger=Fc;exports.DropdownMenuTrigger=Ea;exports.ERROR_DUMP_STRING_KEYS=kh;exports.ERROR_POPOVER_STRING_KEYS=X0;exports.ErrorDump=Nh;exports.ErrorPopover=Q0;exports.FOOTNOTE_LIST_STRING_KEYS=_N;exports.Filter=rv;exports.FilterDropdown=Z0;exports.Footer=nv;exports.FootnoteEditor=vN;exports.FootnoteItem=Qg;exports.FootnoteList=EN;exports.INVENTORY_STRING_KEYS=ON;exports.Input=cs;exports.Inventory=LN;exports.Label=ht;exports.MarkdownRenderer=ph;exports.MoreInfo=ev;exports.MultiSelectComboBox=Sh;exports.NavigationContentSearch=sT;exports.Popover=wo;exports.PopoverAnchor=zb;exports.PopoverContent=Rr;exports.PopoverTrigger=go;exports.Progress=Jm;exports.RadioGroup=va;exports.RadioGroupItem=As;exports.RecentSearches=Pf;exports.ResizableHandle=MT;exports.ResizablePanel=DT;exports.ResizablePanelGroup=AT;exports.ResultsCard=bT;exports.SCOPE_SELECTOR_STRING_KEYS=XN;exports.ScopeSelector=QN;exports.ScriptureResultsViewer=YN;exports.ScrollGroupSelector=ZN;exports.SearchBar=qa;exports.Select=Zr;exports.SelectContent=kr;exports.SelectGroup=bh;exports.SelectItem=cn;exports.SelectLabel=xh;exports.SelectScrollDownButton=Hc;exports.SelectScrollUpButton=Vc;exports.SelectSeparator=yh;exports.SelectTrigger=Er;exports.SelectValue=eo;exports.Separator=Qr;exports.SettingsList=eT;exports.SettingsListHeader=nT;exports.SettingsListItem=tT;exports.SettingsSidebar=hm;exports.SettingsSidebarContentSearch=BN;exports.Sidebar=Lu;exports.SidebarContent=$u;exports.SidebarFooter=sm;exports.SidebarGroup=fa;exports.SidebarGroupAction=am;exports.SidebarGroupContent=wa;exports.SidebarGroupLabel=ha;exports.SidebarHeader=om;exports.SidebarInput=rm;exports.SidebarInset=Pu;exports.SidebarMenu=Fu;exports.SidebarMenuAction=lm;exports.SidebarMenuBadge=cm;exports.SidebarMenuButton=qu;exports.SidebarMenuItem=Bu;exports.SidebarMenuSkeleton=um;exports.SidebarMenuSub=dm;exports.SidebarMenuSubButton=fm;exports.SidebarMenuSubItem=pm;exports.SidebarProvider=Iu;exports.SidebarRail=nm;exports.SidebarSeparator=im;exports.SidebarTrigger=tm;exports.Skeleton=Ki;exports.Slider=Xm;exports.Sonner=RT;exports.Spinner=Am;exports.Switch=Qm;exports.TabDropdownMenu=ma;exports.TabFloatingMenu=oT;exports.TabToolbar=rT;exports.Table=ei;exports.TableBody=ni;exports.TableCaption=Ch;exports.TableCell=Cr;exports.TableFooter=_h;exports.TableHead=Po;exports.TableHeader=ti;exports.TableRow=Gn;exports.Tabs=OT;exports.TabsContent=tb;exports.TabsList=Zm;exports.TabsTrigger=eb;exports.TextField=vT;exports.Textarea=nb;exports.ToggleGroup=Ca;exports.ToggleGroupItem=Mo;exports.Toolbar=fT;exports.Tooltip=ya;exports.TooltipContent=Ws;exports.TooltipProvider=Ys;exports.TooltipTrigger=_a;exports.UiLanguageSelector=wT;exports.VerticalTabs=Vu;exports.VerticalTabsContent=zu;exports.VerticalTabsList=Hu;exports.VerticalTabsTrigger=xm;exports.badgeVariants=zf;exports.buttonVariants=Lf;exports.cn=z;exports.getBookIdFromUSFM=RN;exports.getLinesFromUSFM=DN;exports.getNumberFromUSFM=MN;exports.getStatusForItem=Zg;exports.getToolbarOSReservedSpaceClassName=pT;exports.inventoryCountColumn=SN;exports.inventoryItemColumn=NN;exports.inventoryStatusColumn=AN;exports.selectTriggerVariants=vh;exports.useEvent=jT;exports.useEventAsync=LT;exports.useListbox=Bf;exports.usePromise=rb;exports.useRecentSearches=Gb;exports.useSidebar=di;function PT(t,e="top"){if(!t||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),e==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}PT(`*, ::before, ::after {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
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
