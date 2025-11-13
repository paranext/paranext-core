"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),w=require("react"),Wt=require("cmdk"),se=require("lucide-react"),cb=require("clsx"),ub=require("tailwind-merge"),db=require("@radix-ui/react-dialog"),ne=require("platform-bible-utils"),Qo=require("@radix-ui/react-slot"),Dr=require("class-variance-authority"),pb=require("@radix-ui/react-popover"),fb=require("@radix-ui/react-label"),hb=require("@radix-ui/react-radio-group"),g=require("lexical"),Ll=require("@lexical/rich-text"),wb=require("@radix-ui/react-tooltip"),fn=require("react-dom"),mf=require("@lexical/table"),mb=require("@radix-ui/react-toggle-group"),gb=require("@radix-ui/react-toggle"),bb=require("@radix-ui/react-separator"),vb=require("@radix-ui/react-avatar"),gf=require("@radix-ui/react-dropdown-menu"),Ft=require("@tanstack/react-table"),xb=require("@radix-ui/react-select"),yb=require("markdown-to-jsx"),_b=require("@radix-ui/react-checkbox"),Cb=require("@radix-ui/react-tabs"),Eb=require("@radix-ui/react-menubar"),kb=require("react-hotkeys-hook"),Nb=require("@radix-ui/react-context-menu"),Rn=require("vaul"),Tb=require("@radix-ui/react-progress"),Sb=require("react-resizable-panels"),bf=require("sonner"),Ab=require("@radix-ui/react-slider"),Db=require("@radix-ui/react-switch");function st(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const n in t)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:()=>t[n]})}}return e.default=t,Object.freeze(e)}const Mo=st(w),Sn=st(db),Po=st(pb),vf=st(fb),Ds=st(hb),Ys=st(wb),Mb=st(fn),va=st(mb),xf=st(gb),yf=st(bb),Zo=st(vb),Ge=st(gf),rt=st(xb),Pl=st(_b),Jt=st(Cb),Ke=st(Eb),Ye=st(Nb),$l=st(Tb),Cc=st(Sb),Es=st(Ab),Fl=st(Db),Rb=ub.extendTailwindMerge({prefix:"tw-"});function K(...t){return Rb(cb.clsx(t))}const Ob="layoutDirection";function _t(){const t=localStorage.getItem(Ob);return t==="rtl"?t:"ltr"}const jb=Sn.Root,Ib=Sn.Portal,_f=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Overlay,{ref:n,className:K("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));_f.displayName=Sn.Overlay.displayName;const Cf=w.forwardRef(({className:t,children:e,...n},r)=>{const o=_t();return l.jsxs(Ib,{children:[l.jsx(_f,{}),l.jsxs(Sn.Content,{ref:r,className:K("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...n,dir:o,children:[e,l.jsxs(Sn.Close,{className:K("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Cf.displayName=Sn.Content.displayName;function Ef({className:t,...e}){return l.jsx("div",{className:K("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Ef.displayName="DialogHeader";const kf=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Title,{ref:n,className:K("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));kf.displayName=Sn.Title.displayName;const Lb=w.forwardRef(({className:t,...e},n)=>l.jsx(Sn.Description,{ref:n,className:K("tw-text-sm tw-text-muted-foreground",t),...e}));Lb.displayName=Sn.Description.displayName;const ho=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command,{ref:n,className:K("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));ho.displayName=Wt.Command.displayName;const es=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[l.jsx(se.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),l.jsx(Wt.Command.Input,{ref:n,className:K("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});es.displayName=Wt.Command.Input.displayName;const wo=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.List,{ref:n,className:K("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));wo.displayName=Wt.Command.List.displayName;const Ws=w.forwardRef((t,e)=>l.jsx(Wt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ws.displayName=Wt.Command.Empty.displayName;const ir=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Group,{ref:n,className:K("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));ir.displayName=Wt.Command.Group.displayName;const Nf=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Separator,{ref:n,className:K("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Nf.displayName=Wt.Command.Separator.displayName;const Mr=w.forwardRef(({className:t,...e},n)=>l.jsx(Wt.Command.Item,{ref:n,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Mr.displayName=Wt.Command.Item.displayName;var Pb=Object.defineProperty,$b=(t,e,n)=>e in t?Pb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Te=(t,e,n)=>$b(t,typeof e!="symbol"?e+"":e,n);const Qr=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ec=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Tf=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Wu=Yb();function ts(t,e=!0){return e&&(t=t.toUpperCase()),t in Wu?Wu[t]:0}function kc(t){return ts(t)>0}function Fb(t){const e=typeof t=="string"?ts(t):t;return e>=40&&e<=66}function Bb(t){return(typeof t=="string"?ts(t):t)<=39}function Sf(t){return t<=66}function qb(t){const e=typeof t=="string"?ts(t):t;return Mf(e)&&!Sf(e)}function*Ub(){for(let t=1;t<=Qr.length;t++)yield t}const Vb=1,Af=Qr.length;function Hb(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Nc(t,e="***"){const n=t-1;return n<0||n>=Qr.length?e:Qr[n]}function Df(t){return t<=0||t>Af?"******":Tf[t-1]}function zb(t){return Df(ts(t))}function Mf(t){const e=typeof t=="number"?Nc(t):t;return kc(e)&&!Ec.includes(e)}function Gb(t){const e=typeof t=="number"?Nc(t):t;return kc(e)&&Ec.includes(e)}function Kb(t){return Tf[t-1].includes("*obsolete*")}function Yb(){const t={};for(let e=0;e<Qr.length;e++)t[Qr[e]]=e+1;return t}const $e={allBookIds:Qr,nonCanonicalIds:Ec,bookIdToNumber:ts,isBookIdValid:kc,isBookNT:Fb,isBookOT:Bb,isBookOTNT:Sf,isBookDC:qb,allBookNumbers:Ub,firstBook:Vb,lastBook:Af,extraBooks:Hb,bookNumberToId:Nc,bookNumberToEnglishName:Df,bookIdToEnglishName:zb,isCanonical:Mf,isExtraMaterial:Gb,isObsolete:Kb};var Un=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Un||{});const an=class{constructor(e){if(Te(this,"name"),Te(this,"fullPath"),Te(this,"isPresent"),Te(this,"hasVerseSegments"),Te(this,"isCustomized"),Te(this,"baseVersification"),Te(this,"scriptureBooks"),Te(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=Un[e]):(this._type=e,this.name=Un[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};Te(an,"Original",new an(Un.Original)),Te(an,"Septuagint",new an(Un.Septuagint)),Te(an,"Vulgate",new an(Un.Vulgate)),Te(an,"English",new an(Un.English)),Te(an,"RussianProtestant",new an(Un.RussianProtestant)),Te(an,"RussianOrthodox",new an(Un.RussianOrthodox));let zr=an;function Ju(t,e){const n=e[0];for(let r=1;r<e.length;r++)t=t.split(e[r]).join(n);return t.split(n)}var Rf=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Rf||{});const Gt=class Re{constructor(e,n,r,o){if(Te(this,"firstChapter"),Te(this,"lastChapter"),Te(this,"lastVerse"),Te(this,"hasSegmentsDefined"),Te(this,"text"),Te(this,"BBBCCCVVVS"),Te(this,"longHashCode"),Te(this,"versification"),Te(this,"rtlMark","‏"),Te(this,"_bookNum",0),Te(this,"_chapterNum",0),Te(this,"_verseNum",0),Te(this,"_verse"),r==null&&o==null)if(e!=null&&typeof e=="string"){const s=e,i=n!=null&&n instanceof zr?n:void 0;this.setEmpty(i),this.parse(s)}else if(e!=null&&typeof e=="number"){const s=n!=null&&n instanceof zr?n:void 0;this.setEmpty(s),this._verseNum=e%Re.chapterDigitShifter,this._chapterNum=Math.floor(e%Re.bookDigitShifter/Re.chapterDigitShifter),this._bookNum=Math.floor(e/Re.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Re){const s=e;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(e==null)return;const s=e instanceof zr?e:Re.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=o??Re.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=new Re(e),{success:!0,verseRef:n}}catch(r){if(r instanceof bs)return n=new Re,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%Re.bcvMaxValue*Re.bookDigitShifter+(n>=0?n%Re.bcvMaxValue*Re.chapterDigitShifter:0)+(r>=0?r%Re.bcvMaxValue:0)}static fromJSON(e){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=e,a=s||o.toString();let c;return i&&(c=new zr(i)),n?new Re(n,r.toString(),a,c):new Re}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<e.length;o++){if(r=e[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>Re.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Re.verseRangeSeparator)||this._verse.includes(Re.verseSequenceIndicator))}get book(){return $e.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=$e.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=Re.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=Re.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>$e.lastBook)throw new bs("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new zr(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Re.verseRangeSeparators,Re.verseSequenceIndicators)}get BBBCCC(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const s=e.split("/");if(e=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new zr(Un[i])}catch{throw new bs("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new bs("Invalid reference : "+e);const r=n[1].split(":"),o=+r[0];if(r.length!==2||$e.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!Re.isVerseParseable(r[1]))throw new bs("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new Re(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete n.verse,n}equals(e){return e instanceof Re?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,n=Re.verseRangeSeparators,r=Re.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Ju(this._verse,r);for(const i of s.map(a=>Ju(a,n))){const a=this.clone();a.verse=i[0];const c=a.verseNum;if(o.push(a),i.length>1){const u=this.clone();if(u.verse=i[1],!e)for(let d=c+1;d<u.verseNum;d++){const p=new Re(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(p)}o.push(u)}}return o}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,e,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>$e.lastBook?2:($e.isCanonical(this._bookNum),0)}setEmpty(e=Re.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=$e.bookIdToNumber(e),this.chapter=n,this.verse=r}};Te(Gt,"defaultVersification",zr.English),Te(Gt,"verseRangeSeparator","-"),Te(Gt,"verseSequenceIndicator",","),Te(Gt,"verseRangeSeparators",[Gt.verseRangeSeparator]),Te(Gt,"verseSequenceIndicators",[Gt.verseSequenceIndicator]),Te(Gt,"chapterDigitShifter",1e3),Te(Gt,"bookDigitShifter",Gt.chapterDigitShifter*Gt.chapterDigitShifter),Te(Gt,"bcvMaxValue",Gt.chapterDigitShifter-1),Te(Gt,"ValidStatusType",Rf);let bs=class extends Error{};const Of=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"Old Testament";case ne.Section.NT:return n??"New Testament";case ne.Section.DC:return r??"Deuterocanon";case ne.Section.Extra:return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Wb=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"OT";case ne.Section.NT:return n??"NT";case ne.Section.DC:return r??"DC";case ne.Section.Extra:return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ro(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedName)??$e.bookIdToEnglishName(t)}function Tc(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedId)??t.toUpperCase()}const jf=$e.allBookIds.filter(t=>!$e.isObsolete($e.bookIdToNumber(t))),Wr=Object.fromEntries(jf.map(t=>[t,$e.bookIdToEnglishName(t)]));function Sc(t,e,n){const r=e.trim().toLowerCase();if(!r)return!1;const o=$e.bookIdToEnglishName(t),s=n==null?void 0:n.get(t);return!!(ne.includes(o.toLowerCase(),r)||ne.includes(t.toLowerCase(),r)||(s?ne.includes(s.localizedName.toLowerCase(),r)||ne.includes(s.localizedId.toLowerCase(),r):!1))}const If=w.forwardRef(({bookId:t,isSelected:e,onSelect:n,onMouseDown:r,section:o,className:s,showCheck:i=!1,localizedBookNames:a,commandValue:c},u)=>{const d=w.useRef(!1),p=()=>{d.current||n==null||n(t),setTimeout(()=>{d.current=!1},100)},f=x=>{d.current=!0,r?r(x):n==null||n(t)},h=w.useMemo(()=>Ro(t,a),[t,a]),b=w.useMemo(()=>Tc(t,a),[t,a]);return l.jsx("div",{className:K("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":o===ne.Section.OT,"tw-border-s-purple-200":o===ne.Section.NT,"tw-border-s-indigo-200":o===ne.Section.DC,"tw-border-s-amber-200":o===ne.Section.Extra}),children:l.jsxs(Mr,{ref:u,value:c||`${t} ${$e.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${$e.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:s,children:[i&&l.jsx(se.Check,{className:K("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),l.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:h}),l.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),Lf=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ge=w.forwardRef(({className:t,variant:e,size:n,asChild:r=!1,...o},s)=>{const i=r?Qo.Slot:"button";return l.jsx(i,{className:K(Lf({variant:e,size:n,className:t})),ref:s,...o})});ge.displayName="Button";const mo=Po.Root,go=Po.Trigger,Jb=Po.Anchor,Rr=w.forwardRef(({className:t,align:e="center",sideOffset:n=4,...r},o)=>{const s=_t();return l.jsx(Po.Portal,{children:l.jsx(Po.Content,{ref:o,align:e,sideOffset:n,className:K("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,dir:s})})});Rr.displayName=Po.Content.displayName;function Bl(t,e,n){return`${t} ${Wr[t]}${e?` ${Tc(t,e)} ${Ro(t,e)}`:""}${n?` ${n}`:""}`}function Pf({recentSearches:t,onSearchItemSelect:e,renderItem:n=a=>String(a),getItemKey:r=a=>String(a),ariaLabel:o="Show recent searches",groupHeading:s="Recent",id:i}){const[a,c]=w.useState(!1);if(t.length===0)return;const u=d=>{e(d),c(!1)};return l.jsxs(mo,{open:a,onOpenChange:c,children:[l.jsx(go,{asChild:!0,children:l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":o,children:l.jsx(se.Clock,{className:"tw-h-4 tw-w-4"})})}),l.jsx(Rr,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:l.jsx(ho,{children:l.jsx(wo,{children:l.jsx(ir,{heading:s,children:t.map(d=>l.jsxs(Mr,{onSelect:()=>u(d),className:"tw-flex tw-items-center",children:[l.jsx(se.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),l.jsx("span",{children:n(d)})]},r(d)))})})})})]})}function Xb(t,e,n=(o,s)=>o===s,r=15){return o=>{const s=t.filter(a=>!n(a,o)),i=[o,...s.slice(0,r-1)];e(i)}}const cl={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Qb=[cl.BOOK_ONLY,cl.BOOK_CHAPTER,cl.BOOK_CHAPTER_VERSE];function Xu(t){const e=/^[a-zA-Z]$/.test(t),n=/^[0-9]$/.test(t);return{isLetter:e,isDigit:n}}function zn(t){return ne.getChaptersForBook($e.bookIdToNumber(t))}function Zb(t,e,n){if(!t.trim()||e.length===0)return;const r=Qb.reduce((o,s)=>{if(o)return o;const i=s.exec(t.trim());if(i){const[a,c=void 0,u=void 0]=i.slice(1);let d;const p=e.filter(f=>Sc(f,a,n));if(p.length===1&&([d]=p),!d&&c){if($e.isBookIdValid(a)){const f=a.toUpperCase();e.includes(f)&&(d=f)}if(!d&&n){const f=Array.from(n.entries()).find(([,h])=>h.localizedId.toLowerCase()===a.toLowerCase());f&&e.includes(f[0])&&([d]=f)}}if(!d&&c){const h=(b=>Object.keys(Wr).find(x=>Wr[x].toLowerCase()===b.toLowerCase()))(a);if(h&&e.includes(h)&&(d=h),!d&&n){const b=Array.from(n.entries()).find(([,x])=>x.localizedName.toLowerCase()===a.toLowerCase());b&&e.includes(b[0])&&([d]=b)}}if(d){let f=c?parseInt(c,10):void 0;f&&f>zn(d)&&(f=Math.max(zn(d),1));const h=u?parseInt(u,10):void 0;return{book:d,chapterNum:f,verseNum:h}}}},void 0);if(r)return r}function e0(t,e,n,r){const o=w.useCallback(()=>{if(t.chapterNum>1)r({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const c=e.indexOf(t.book);if(c>0){const u=e[c-1],d=Math.max(zn(u),1);r({book:u,chapterNum:d,verseNum:1})}}},[t,e,r]),s=w.useCallback(()=>{const c=zn(t.book);if(t.chapterNum<c)r({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const u=e.indexOf(t.book);if(u<e.length-1){const d=e[u+1];r({book:d,chapterNum:1,verseNum:1})}}},[t,e,r]),i=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,r]),a=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,r]);return w.useMemo(()=>[{onClick:o,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:n==="ltr"?se.ChevronsLeft:se.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:n==="ltr"?se.ChevronLeft:se.ChevronRight},{onClick:a,disabled:e.length===0,title:"Next verse",icon:n==="ltr"?se.ChevronRight:se.ChevronLeft},{onClick:s,disabled:e.length===0||(t.chapterNum===zn(t.book)||zn(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:n==="ltr"?se.ChevronsRight:se.ChevronsLeft}],[t,e,n,o,i,a,s])}function Qu({bookId:t,scrRef:e,onChapterSelect:n,setChapterRef:r,isChapterDimmed:o,className:s}){if(t)return l.jsx(ir,{children:l.jsx("div",{className:K("tw-grid tw-grid-cols-6 tw-gap-1",s),children:Array.from({length:zn(t)},(i,a)=>a+1).map(i=>l.jsx(Mr,{value:`${t} ${Wr[t]||""} ${i}`,onSelect:()=>n(i),ref:r(i),className:K("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(o==null?void 0:o(i))??!1}),children:i},i))})})}function t0({scrRef:t,handleSubmit:e,className:n,getActiveBookIds:r,localizedBookNames:o,localizedStrings:s,recentSearches:i,onAddRecentSearch:a,id:c}){const u=_t(),[d,p]=w.useState(!1),[f,h]=w.useState(""),[b,x]=w.useState(""),[C,E]=w.useState("books"),[_,A]=w.useState(void 0),[j,G]=w.useState(!1),O=w.useRef(void 0),V=w.useRef(void 0),F=w.useRef(void 0),$=w.useRef(void 0),W=w.useRef({}),N=w.useCallback(oe=>{e(oe),a&&a(oe)},[e,a]),M=w.useMemo(()=>r?r():jf,[r]),T=w.useMemo(()=>({[ne.Section.OT]:M.filter(be=>$e.isBookOT(be)),[ne.Section.NT]:M.filter(be=>$e.isBookNT(be)),[ne.Section.DC]:M.filter(be=>$e.isBookDC(be)),[ne.Section.Extra]:M.filter(be=>$e.extraBooks().includes(be))}),[M]),L=w.useMemo(()=>Object.values(T).flat(),[T]),S=w.useMemo(()=>{if(!b.trim())return T;const oe={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return[ne.Section.OT,ne.Section.NT,ne.Section.DC,ne.Section.Extra].forEach(Ne=>{oe[Ne]=T[Ne].filter(Oe=>Sc(Oe,b,o))}),oe},[T,b,o]),D=w.useMemo(()=>Zb(b,L,o),[b,L,o]),P=w.useCallback(()=>{D&&(N({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),p(!1),x(""),h(""))},[N,D]),H=w.useCallback(oe=>{if(zn(oe)<=1){N({book:oe,chapterNum:1,verseNum:1}),p(!1),x("");return}A(oe),E("chapters")},[N]),B=w.useCallback(oe=>{const be=C==="chapters"?_:D==null?void 0:D.book;be&&(N({book:be,chapterNum:oe,verseNum:1}),p(!1),E("books"),A(void 0),x(""))},[N,C,_,D]),z=w.useCallback(oe=>{N(oe),p(!1),x("")},[N]),J=e0(t,L,u,e),ee=w.useCallback(()=>{E("books"),A(void 0),setTimeout(()=>{V.current&&V.current.focus()},0)},[]),te=w.useCallback(oe=>{if(!oe&&C==="chapters"){ee();return}p(oe),oe&&(E("books"),A(void 0),x(""))},[C,ee]),{otLong:Z,ntLong:X,dcLong:le,extraLong:ce}={otLong:s==null?void 0:s["%scripture_section_ot_long%"],ntLong:s==null?void 0:s["%scripture_section_nt_long%"],dcLong:s==null?void 0:s["%scripture_section_dc_long%"],extraLong:s==null?void 0:s["%scripture_section_extra_long%"]},ue=w.useCallback(oe=>Of(oe,Z,X,le,ce),[Z,X,le,ce]),me=w.useCallback(oe=>D?!!D.chapterNum&&!oe.toString().includes(D.chapterNum.toString()):!1,[D]),he=w.useMemo(()=>ne.formatScrRef(t,o?Ro(t.book,o):"English"),[t,o]),we=w.useCallback(oe=>be=>{W.current[oe]=be},[]),ie=w.useCallback(oe=>{(oe.key==="Home"||oe.key==="End")&&oe.stopPropagation()},[]),Ce=w.useCallback(oe=>{if(oe.ctrlKey)return;const{isLetter:be,isDigit:Ne}=Xu(oe.key);if(C==="chapters"){if(oe.key==="Backspace"){oe.preventDefault(),oe.stopPropagation(),ee();return}if(be||Ne){if(oe.preventDefault(),oe.stopPropagation(),E("books"),A(void 0),Ne&&_){const Oe=Wr[_];x(`${Oe} ${oe.key}`)}else x(oe.key);setTimeout(()=>{V.current&&V.current.focus()},0);return}}if((C==="chapters"||C==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(oe.key)){const Oe=C==="chapters"?_:D==null?void 0:D.book;if(!Oe)return;const Fe=(()=>{if(!f)return 1;const Ee=f.match(/(\d+)$/);return Ee?parseInt(Ee[1],10):0})(),Ze=zn(Oe);if(!Ze)return;let Je=Fe;const ot=6;switch(oe.key){case"ArrowLeft":Fe!==0&&(Je=Fe>1?Fe-1:Ze);break;case"ArrowRight":Fe!==0&&(Je=Fe<Ze?Fe+1:1);break;case"ArrowUp":Je=Fe===0?Ze:Math.max(1,Fe-ot);break;case"ArrowDown":Je=Fe===0?1:Math.min(Ze,Fe+ot);break;default:return}Je!==Fe&&(oe.preventDefault(),oe.stopPropagation(),h(Bl(Oe,o,Je)),setTimeout(()=>{const Ee=W.current[Je];Ee&&Ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[C,D,ee,_,f,o]),De=w.useCallback(oe=>{if(oe.shiftKey||oe.key==="Tab"||oe.key===" ")return;const{isLetter:be,isDigit:Ne}=Xu(oe.key);(be||Ne)&&(oe.preventDefault(),x(Oe=>Oe+oe.key),V.current.focus(),G(!1))},[]);return w.useLayoutEffect(()=>{const oe=setTimeout(()=>{if(d&&C==="books"&&F.current&&$.current){const be=F.current,Ne=$.current,Oe=Ne.offsetTop,Fe=be.clientHeight,Ze=Ne.clientHeight,Je=Oe-Fe/2+Ze/2;be.scrollTo({top:Math.max(0,Je),behavior:"smooth"}),h(Bl(t.book))}},0);return()=>{clearTimeout(oe)}},[d,C,b,D,t.book]),w.useLayoutEffect(()=>{if(C==="chapters"&&_){const oe=_===t.book;setTimeout(()=>{if(F.current)if(oe){const be=W.current[t.chapterNum];be&&be.scrollIntoView({block:"center",behavior:"smooth"})}else F.current.scrollTo({top:0});O.current&&O.current.focus()},0)}},[C,_,D,t.book,t.chapterNum]),l.jsxs(mo,{open:d,onOpenChange:te,children:[l.jsx(go,{asChild:!0,children:l.jsx(ge,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":d,className:K("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:l.jsx("span",{className:"tw-truncate",children:he})})}),l.jsx(Rr,{id:c,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:l.jsxs(ho,{ref:O,onKeyDown:Ce,loop:!0,value:f,onValueChange:h,shouldFilter:!1,children:[C==="books"?l.jsxs("div",{className:"tw-flex tw-items-end",children:[l.jsxs("div",{className:"tw-relative tw-flex-1",children:[l.jsx(es,{ref:V,value:b,onValueChange:x,onKeyDown:ie,onFocus:()=>G(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&l.jsx(Pf,{recentSearches:i,onSearchItemSelect:z,renderItem:oe=>ne.formatScrRef(oe,"English"),getItemKey:oe=>`${oe.book}-${oe.chapterNum}-${oe.verseNum}`,ariaLabel:s==null?void 0:s["%history_recentSearches_ariaLabel%"],groupHeading:s==null?void 0:s["%history_recent%"]})]}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:J.map(({onClick:oe,disabled:be,title:Ne,icon:Oe})=>l.jsx(ge,{variant:"ghost",size:"sm",onClick:()=>{G(!0),oe()},disabled:be,className:"tw-h-10 tw-w-4 tw-p-0",title:Ne,onKeyDown:De,children:l.jsx(Oe,{})},Ne))})]}):l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:ee,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:u==="ltr"?l.jsx(se.ArrowLeft,{className:"tw-h-4 tw-w-4"}):l.jsx(se.ArrowRight,{className:"tw-h-4 tw-w-4"})}),_&&l.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ro(_,o)})]}),!j&&l.jsxs(wo,{ref:F,children:[C==="books"&&l.jsxs(l.Fragment,{children:[!D&&Object.entries(S).map(([oe,be])=>{if(be.length!==0)return l.jsx(ir,{heading:ue(oe),children:be.map(Ne=>l.jsx(If,{bookId:Ne,onSelect:Oe=>H(Oe),section:ne.getSectionForBook(Ne),commandValue:`${Ne} ${Wr[Ne]}`,ref:Ne===t.book?$:void 0,localizedBookNames:o},Ne))},oe)}),D&&l.jsx(ir,{children:l.jsx(Mr,{value:`${D.book} ${Wr[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:P,className:"tw-font-semibold tw-text-primary",children:ne.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},o?Tc(D.book,o):void 0)},"top-match")}),D&&zn(D.book)>1&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ro(D.book,o)}),l.jsx(Qu,{bookId:D.book,scrRef:t,onChapterSelect:B,setChapterRef:we,isChapterDimmed:me,className:"tw-px-4 tw-pb-4"})]})]}),C==="chapters"&&_&&l.jsx(Qu,{bookId:_,scrRef:t,onChapterSelect:B,setChapterRef:we,className:"tw-p-4"})]})]})})]})}const n0=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),r0=Dr.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ht=w.forwardRef(({className:t,...e},n)=>l.jsx(vf.Root,{ref:n,className:K("pr-twp",r0(),t),...e}));ht.displayName=vf.Root.displayName;const xa=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Ds.Root,{className:K("pr-twp tw-grid tw-gap-2",t),...e,ref:n,dir:r})});xa.displayName=Ds.Root.displayName;const Ms=w.forwardRef(({className:t,...e},n)=>l.jsx(Ds.Item,{ref:n,className:K("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:l.jsx(Ds.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:l.jsx(se.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Ms.displayName=Ds.Item.displayName;function o0(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Ki({id:t,options:e=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:a=o0,getButtonLabel:c,icon:u=void 0,buttonPlaceholder:d="",textPlaceholder:p="",commandEmptyMessage:f="No option found",buttonVariant:h="outline",alignDropDown:b="start",isDisabled:x=!1,ariaLabel:C,...E}){const[_,A]=w.useState(!1),j=c??a,G=V=>V.length>0&&typeof V[0]=="object"&&"options"in V[0],O=(V,F)=>{const $=a(V),W=typeof V=="object"&&"secondaryLabel"in V?V.secondaryLabel:void 0,N=`${F??""}${$}${W??""}`;return l.jsxs(Mr,{value:$,onSelect:()=>{i(V),A(!1)},className:"tw-flex tw-items-center",children:[l.jsx(se.Check,{className:K("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!s||a(s)!==$})}),l.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[$,W&&l.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",W]})]})]},N)};return l.jsxs(mo,{open:_,onOpenChange:A,...E,children:[l.jsx(go,{asChild:!0,children:l.jsxs(ge,{variant:h,role:"combobox","aria-expanded":_,"aria-label":C,id:t,className:K("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&l.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),l.jsx("span",{className:K("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:s?j(s):d})]}),l.jsx(se.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{align:b,className:K("tw-w-[200px] tw-p-0",o),children:l.jsxs(ho,{children:[l.jsx(es,{placeholder:p,className:"tw-text-inherit"}),l.jsx(Ws,{children:f}),l.jsx(wo,{children:G(e)?e.map(V=>l.jsx(ir,{heading:V.groupHeading,children:V.options.map(F=>O(F,V.groupHeading))},V.groupHeading)):e.map(V=>O(V))})]})})]})}function $f({startChapter:t,endChapter:e,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=w.useMemo(()=>Array.from({length:s},(u,d)=>d+1),[s]),a=u=>{n(u),u>e&&r(u)},c=u=>{r(u),u<t&&n(u)};return l.jsxs(l.Fragment,{children:[l.jsx(ht,{htmlFor:"start-chapters-combobox",children:"Chapters"}),l.jsx(Ki,{isDisabled:o,onChange:a,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:t},"start chapter"),l.jsx(ht,{htmlFor:"end-chapters-combobox",children:"to"}),l.jsx(Ki,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:u=>u.toString(),value:e},"end chapter")]})}var Ff=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Ff||{});const s0=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),ul=(t,e)=>t[e]??e;function i0({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:a,handleSelectStartChapter:c,localizedStrings:u}){const d=ul(u,"%webView_bookSelector_currentBook%"),p=ul(u,"%webView_bookSelector_choose%"),f=ul(u,"%webView_bookSelector_chooseBooks%"),[h,b]=w.useState("current book"),x=C=>{b(C),t(C)};return l.jsx(xa,{className:"pr-twp tw-flex",value:h,onValueChange:C=>x(C),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Ms,{value:"current book"}),l.jsx(ht,{className:"tw-ms-1",children:d})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:e}),l.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:l.jsx($f,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:a,endChapter:s})})]}),l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Ms,{value:"choose books"}),l.jsx(ht,{className:"tw-ms-1",children:f})]}),l.jsx(ht,{className:"tw-flex tw-items-center",children:r.map(C=>$e.bookIdToEnglishName(C)).join(", ")}),l.jsx(ge,{disabled:h==="current book",onClick:()=>n(),children:p})]})]})})}const a0=["%comment_assigned_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_editComment%","%comment_replyOrAssign%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%no_comments%"],l0=["input","select","textarea","button"],c0=["button","textbox"],Bf=({options:t,onFocusChange:e,onOptionSelect:n,onCharacterPress:r})=>{const o=w.useRef(null),[s,i]=w.useState(void 0),[a,c]=w.useState(void 0),u=w.useCallback(h=>{i(h);const b=t.find(C=>C.id===h);b&&(e==null||e(b));const x=document.getElementById(h);x&&(x.scrollIntoView({block:"center"}),x.focus()),o.current&&o.current.setAttribute("aria-activedescendant",h)},[e,t]),d=w.useCallback(h=>{const b=t.find(x=>x.id===h);b&&(c(x=>x===h?void 0:h),n==null||n(b))},[n,t]),p=h=>{if(!h)return!1;const b=h.tagName.toLowerCase();if(h.isContentEditable||l0.includes(b))return!0;const x=h.getAttribute("role");if(x&&c0.includes(x))return!0;const C=h.getAttribute("tabindex");return C!==void 0&&C!=="-1"},f=w.useCallback(h=>{var V;const b=h.target,x=F=>F?document.getElementById(F):void 0,C=x(a),E=x(s);if(!!(C&&b&&C.contains(b)&&b!==C)&&p(b)){if(h.key==="Escape"||h.key==="ArrowLeft"&&!b.isContentEditable){if(a){h.preventDefault(),h.stopPropagation();const F=t.find($=>$.id===a);F&&u(F.id)}return}if(h.key==="ArrowDown"||h.key==="ArrowUp"){if(!C)return;const F=Array.from(C.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(F.length===0)return;const $=F.findIndex(N=>N===b);if($===-1)return;let W;h.key==="ArrowDown"?W=Math.min($+1,F.length-1):W=Math.max($-1,0),W!==$&&(h.preventDefault(),h.stopPropagation(),(V=F[W])==null||V.focus());return}return}const j=t.findIndex(F=>F.id===s);let G=j;switch(h.key){case"ArrowDown":G=Math.min(j+1,t.length-1),h.preventDefault();break;case"ArrowUp":G=Math.max(j-1,0),h.preventDefault();break;case"Home":G=0,h.preventDefault();break;case"End":G=t.length-1,h.preventDefault();break;case" ":case"Enter":s&&d(s),h.preventDefault(),h.stopPropagation();return;case"ArrowRight":{const F=E;if(F){const $=F.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),W=F.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),N=$??W;if(N){h.preventDefault(),N.focus();return}}break}default:h.key.length===1&&!h.metaKey&&!h.ctrlKey&&!h.altKey&&(p(b)||(r==null||r(h.key),h.preventDefault()));return}const O=t[G];O&&u(O.id)},[t,u,s,a,d,r]);return{listboxRef:o,activeId:s,selectedId:a,handleKeyDown:f,focusOption:u}},Ac={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""};function Zu(t){let e=t;for(;e!=null;){if(e.nodeType===Node.TEXT_NODE)return e;e=e.firstChild}return null}function ed(t){const e=t.parentNode;if(e==null)throw new Error("Should never happen");return[e,Array.from(e.childNodes).indexOf(t)]}function u0(t,e,n,r,o){const s=e.getKey(),i=r.getKey(),a=document.createRange();let c=t.getElementByKey(s),u=t.getElementByKey(i),d=n,p=o;if(g.$isTextNode(e)&&(c=Zu(c)),g.$isTextNode(r)&&(u=Zu(u)),e===void 0||r===void 0||c===null||u===null)return null;c.nodeName==="BR"&&([c,d]=ed(c)),u.nodeName==="BR"&&([u,p]=ed(u));const f=c.firstChild;c===u&&f!=null&&f.nodeName==="BR"&&d===0&&p===0&&(p=1);try{a.setStart(c,d),a.setEnd(u,p)}catch{return null}return!a.collapsed||d===p&&s===i||(a.setStart(u,p),a.setEnd(c,d)),a}function d0(t,e){const n=t.getRootElement();if(n===null)return[];const r=n.getBoundingClientRect(),o=getComputedStyle(n),s=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),i=Array.from(e.getClientRects());let a,c=i.length;i.sort((u,d)=>{const p=u.top-d.top;return Math.abs(p)<=3?u.left-d.left:p});for(let u=0;u<c;u++){const d=i[u],p=a&&a.top<=d.top&&a.top+a.height>d.top&&a.left+a.width>d.left,f=d.width+s===r.width;p||f?(i.splice(u--,1),c--):a=d}return i}function p0(t,e){const n=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&n!==null){const[r,o]=n,s=t.isBackward(),i=r.getNode(),a=o.getNode(),c=e.is(i),u=e.is(a);if(c||u){const[d,p]=g.$getCharacterOffsets(t),f=i.is(a),h=e.is(s?a:i),b=e.is(s?i:a);let x,C=0;f?(C=d>p?p:d,x=d>p?d:p):h?(C=s?p:d,x=void 0):b&&(C=0,x=s?d:p),e.__text=e.__text.slice(C,x)}}return e}function f0(t,e){const n=t.getFormatType(),r=t.getIndent();n!==e.getFormatType()&&e.setFormat(n),r!==e.getIndent()&&e.setIndent(r)}function h0(t,e,n=f0){if(t===null)return;const r=t.getStartEndPoints(),o=new Map;let s=null;if(r){const[i,a]=r;s=g.$createRangeSelection(),s.anchor.set(i.key,i.offset,i.type),s.focus.set(a.key,a.offset,a.type);const c=dl(i.getNode(),g.INTERNAL_$isBlock),u=dl(a.getNode(),g.INTERNAL_$isBlock);g.$isElementNode(c)&&o.set(c.getKey(),c),g.$isElementNode(u)&&o.set(u.getKey(),u)}for(const i of t.getNodes())if(g.$isElementNode(i)&&g.INTERNAL_$isBlock(i))o.set(i.getKey(),i);else if(r===null){const a=dl(i,g.INTERNAL_$isBlock);g.$isElementNode(a)&&o.set(a.getKey(),a)}for(const[i,a]of o){const c=e();n(a,c),a.replace(c,!0),s&&(i===s.anchor.key&&s.anchor.set(c.getKey(),s.anchor.offset,s.anchor.type),i===s.focus.key&&s.focus.set(c.getKey(),s.focus.offset,s.focus.type))}s&&t.is(g.$getSelection())&&g.$setSelection(s)}function qf(t){const e=t.anchor.getNode(),n=g.$isRootNode(e)?e:e.getParentOrThrow(),r=g.$getEditor().getElementByKey(n.getKey());if(r===null)return!1;const o=r.ownerDocument.defaultView;return o===null?!1:o.getComputedStyle(r).writingMode==="vertical-rl"}function td(t,e){let n=qf(t)?!e:e;Uf(t)&&(n=!n);const r=g.$caretFromPoint(t.focus,n?"previous":"next");if(g.$isExtendableTextPointCaret(r))return!1;for(const o of g.$extendCaretToRange(r)){if(g.$isChildCaret(o))return!o.origin.isInline();if(!g.$isElementNode(o.origin)){if(g.$isDecoratorNode(o.origin))return!0;break}}return!1}function w0(t,e,n,r){t.modify(e?"extend":"move",n,r)}function Uf(t){const e=t.anchor.getNode();return(g.$isRootNode(e)?e:e.getParentOrThrow()).getDirection()==="rtl"}function nd(t,e,n){const r=Uf(t);let o;o=qf(t)||r?!n:n,w0(t,e,o,"character")}function dl(t,e){let n=t;for(;n!==null&&n.getParent()!==null&&!e(n);)n=n.getParentOrThrow();return e(n)?n:null}const Js=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,m0=Js&&"documentMode"in document?document.documentMode:null,g0=Js&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),b0=Js&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);!(!Js||!("InputEvent"in window)||m0)&&"getTargetRanges"in new window.InputEvent("input");function Vf(...t){const e=[];for(const n of t)if(n&&typeof n=="string")for(const[r]of n.matchAll(/\S+/g))e.push(r);return e}function At(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}const v0=Js,ql=g0,x0=b0;function vr(t,...e){const n=Vf(...e);n.length>0&&t.classList.add(...n)}function Ul(t,...e){const n=Vf(...e);n.length>0&&t.classList.remove(...n)}function Xs(t,e){return Array.from(y0(t))}function y0(t,e){return _0("next",t)}function _0(t,e,n){const r=g.$getRoot(),o=e||r,s=g.$isElementNode(o)?g.$getChildCaret(o,t):g.$getSiblingCaret(o,t),i=C0(o),a=function(u,d){const p=od(g.$getSiblingCaret(u,d));return p&&p[0]}(o,t);let c=i;return g.makeStepwiseIterator({hasNext:u=>u!==null,initial:s,map:u=>({depth:c,node:u.origin}),step:u=>{if(u.isSameNodeCaret(a))return null;g.$isChildCaret(u)&&c++;const d=od(u);return!d||d[0].isSameNodeCaret(a)?null:(c+=d[1],d[0])}})}function C0(t){let e=-1;for(let n=t;n!==null;n=n.getParent())e++;return e}const Rs=(t,e)=>{let n=t;for(;n!==g.$getRoot()&&n!=null;){if(e(n))return n;n=n.getParent()}return null};function Hf(t,e,n,r){const o=s=>s instanceof e;return t.registerNodeTransform(e,s=>{const i=(a=>{const c=a.getChildren();for(let p=0;p<c.length;p++){const f=c[p];if(o(f))return null}let u=a,d=a;for(;u!==null;)if(d=u,u=u.getParent(),o(u))return{child:d,parent:u};return null})(s);if(i!==null){const{child:a,parent:c}=i;if(a.is(s)){r(c,s);const u=a.getNextSiblings(),d=u.length;if(c.insertAfter(a),d!==0){const p=n(c);a.insertAfter(p);for(let f=0;f<d;f++)p.append(u[f])}c.canBeEmpty()||c.getChildrenSize()!==0||c.remove()}}})}function zf(t,e){return t!==null&&Object.getPrototypeOf(t).constructor.name===e.name}let pl=!(x0||!v0)&&void 0;function E0(t){let e=1;if(function(){if(pl===void 0){const n=document.createElement("div");n.style.cssText="position: absolute; opacity: 0; width: 100px; left: -1000px;",document.body.appendChild(n);const r=n.getBoundingClientRect();n.style.setProperty("zoom","2"),pl=n.getBoundingClientRect().width===r.width,document.body.removeChild(n)}return pl}())for(;t;)e*=Number(window.getComputedStyle(t).getPropertyValue("zoom")),t=t.parentElement;return e}function rd(t){g.$rewindSiblingCaret(g.$getSiblingCaret(t,"next")).splice(1,t.getChildren())}function od(t,e="root"){let n=0,r=t,o=g.$getAdjacentChildCaret(r);for(;o===null;){if(n--,o=r.getParentCaret(e),!o)return null;r=o,o=g.$getAdjacentChildCaret(r)}return o&&[o,n]}function k0(t,e){const n=e.body?e.body.childNodes:[];let r=[];const o=[];for(let s=0;s<n.length;s++){const i=n[s];if(!Kf.has(i.nodeName)){const a=Yf(i,t,o,!1);a!==null&&(r=r.concat(a))}}return function(s){for(const i of s)i.getNextSibling()instanceof g.ArtificialNode__DO_NOT_USE&&i.insertAfter(g.$createLineBreakNode());for(const i of s){const a=i.getChildren();for(const c of a)i.insertBefore(c);i.remove()}}(o),r}function Dc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),r=g.$getRoot().getChildren();for(let o=0;o<r.length;o++)Gf(t,r[o],n,e);return n.innerHTML}function Gf(t,e,n,r=null){let o=r===null||e.isSelected(r);const s=g.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;if(r!==null){let h=g.$cloneWithProperties(e);h=g.$isTextNode(h)&&r!==null?p0(r,h):h,i=h}const a=g.$isElementNode(i)?i.getChildren():[],c=g.getRegisteredNode(t,i.getType());let u;u=c&&c.exportDOM!==void 0?c.exportDOM(t,i):i.exportDOM(t);const{element:d,after:p}=u;if(!d)return!1;const f=document.createDocumentFragment();for(let h=0;h<a.length;h++){const b=a[h],x=Gf(t,b,f,r);!o&&g.$isElementNode(e)&&x&&e.extractWithChild(b,r,"html")&&(o=!0)}if(o&&!s){if((g.isHTMLElement(d)||g.isDocumentFragment(d))&&d.append(f),n.append(d),p){const h=p.call(i,d);h&&(g.isDocumentFragment(d)?d.replaceChildren(h):d.replaceWith(h))}}else n.append(f);return o}const Kf=new Set(["STYLE","SCRIPT"]);function Yf(t,e,n,r,o=new Map,s){let i=[];if(Kf.has(t.nodeName))return i;let a=null;const c=function(b,x){const{nodeName:C}=b,E=x._htmlConversions.get(C.toLowerCase());let _=null;if(E!==void 0)for(const A of E){const j=A(b);j!==null&&(_===null||(_.priority||0)<=(j.priority||0))&&(_=j)}return _!==null?_.conversion:null}(t,e),u=c?c(t):null;let d=null;if(u!==null){d=u.after;const b=u.node;if(a=Array.isArray(b)?b[b.length-1]:b,a!==null){for(const[,x]of o)if(a=x(a,s),!a)break;a&&i.push(...Array.isArray(b)?b:[a])}u.forChild!=null&&o.set(t.nodeName,u.forChild)}const p=t.childNodes;let f=[];const h=(a==null||!g.$isRootOrShadowRoot(a))&&(a!=null&&g.$isBlockElementNode(a)||r);for(let b=0;b<p.length;b++)f.push(...Yf(p[b],e,n,h,new Map(o),a));return d!=null&&(f=d(f)),g.isBlockDomNode(t)&&(f=N0(t,f,h?()=>{const b=new g.ArtificialNode__DO_NOT_USE;return n.push(b),b}:g.$createParagraphNode)),a==null?f.length>0?i=i.concat(f):g.isBlockDomNode(t)&&function(b){return b.nextSibling==null||b.previousSibling==null?!1:g.isInlineDomNode(b.nextSibling)&&g.isInlineDomNode(b.previousSibling)}(t)&&(i=i.concat(g.$createLineBreakNode())):g.$isElementNode(a)&&a.append(...f),i}function N0(t,e,n){const r=t.style.textAlign,o=[];let s=[];for(let i=0;i<e.length;i++){const a=e[i];if(g.$isBlockElementNode(a))r&&!a.getFormat()&&a.setFormat(r),o.push(a);else if(s.push(a),i===e.length-1||i<e.length-1&&g.$isBlockElementNode(e[i+1])){const c=n();c.setFormat(r),c.append(...s),o.push(c),s=[]}}return o}const Mc=[Ll.HeadingNode,g.ParagraphNode,g.TextNode,Ll.QuoteNode];function Wf(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const n=window.getSelection(),r=document.createRange();return r.selectNodeContents(e),r.collapse(!1),n==null||n.removeAllRanges(),n==null||n.addRange(r),!0}function Kr(t){if(!(t!=null&&t.root))return!1;const e=n=>n.text&&n.text.trim()?!0:n.children?n.children.some(e):!1;return e(t.root)}function T0(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*>([\s\S]*?)<\/color>/gi,"$1").replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1"),n=g.createEditor({namespace:"EditorUtils",theme:Ac,nodes:Mc,onError:o=>{console.error(o)}});let r;if(n.update(()=>{const s=new DOMParser().parseFromString(e,"text/html"),i=k0(n,s);g.$getRoot().clear(),g.$insertNodes(i)},{discrete:!0}),n.getEditorState().read(()=>{r=n.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function Jf(t){const e=g.createEditor({namespace:"EditorUtils",theme:Ac,nodes:Mc,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r="";return e.getEditorState().read(()=>{r=Dc(e)}),r=r.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<s>(.*?)<\/s>/g,"<strikethrough>$1</strikethrough>"),r}function Xf(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const Qf=w.createContext(null);function S0(t,e){return{getTheme:function(){return e??null}}}function ye(){const t=w.useContext(Qf);return t==null&&function(e,...n){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const s of n)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Zf=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,A0=Zf?w.useLayoutEffect:w.useEffect,ki={tag:g.HISTORY_MERGE_TAG};function Rc({initialConfig:t,children:e}){const n=w.useMemo(()=>{const{theme:r,namespace:o,nodes:s,onError:i,editorState:a,html:c}=t,u=S0(null,r),d=g.createEditor({editable:t.editable,html:c,namespace:o,nodes:s,onError:p=>i(p,d),theme:r});return function(p,f){if(f!==null){if(f===void 0)p.update(()=>{const h=g.$getRoot();if(h.isEmpty()){const b=g.$createParagraphNode();h.append(b);const x=Zf?document.activeElement:null;(g.$getSelection()!==null||x!==null&&x===p.getRootElement())&&b.select()}},ki);else if(f!==null)switch(typeof f){case"string":{const h=p.parseEditorState(f);p.setEditorState(h,ki);break}case"object":p.setEditorState(f,ki);break;case"function":p.update(()=>{g.$getRoot().isEmpty()&&f(p)},ki)}}}(d,a),[d,u]},[]);return A0(()=>{const r=t.editable,[o]=n;o.setEditable(r===void 0||r)},[]),l.jsx(Qf.Provider,{value:n,children:e})}const D0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function eh({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=ye();return D0(()=>{if(n)return r.registerUpdateListener(({editorState:o,dirtyElements:s,dirtyLeaves:i,prevEditorState:a,tags:c})=>{e&&s.size===0&&i.size===0||t&&c.has(g.HISTORY_MERGE_TAG)||a.isEmpty()||n(o,r,c)})},[r,t,e,n]),null}const Qs=Ys.Provider,ya=Ys.Root,_a=Ys.Trigger,Zs=w.forwardRef(({className:t,sideOffset:e=4,...n},r)=>l.jsx(Ys.Content,{ref:r,sideOffset:e,className:K("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Zs.displayName=Ys.Content.displayName;function Vl(t,e){return Vl=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},Vl(t,e)}var sd={error:null},M0=function(t){var e,n;function r(){for(var s,i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];return(s=t.call.apply(t,[this].concat(a))||this).state=sd,s.resetErrorBoundary=function(){for(var u,d=arguments.length,p=new Array(d),f=0;f<d;f++)p[f]=arguments[f];s.props.onReset==null||(u=s.props).onReset.apply(u,p),s.reset()},s}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,Vl(e,n),r.getDerivedStateFromError=function(s){return{error:s}};var o=r.prototype;return o.reset=function(){this.setState(sd)},o.componentDidCatch=function(s,i){var a,c;(a=(c=this.props).onError)==null||a.call(c,s,i)},o.componentDidUpdate=function(s,i){var a,c,u,d,p=this.state.error,f=this.props.resetKeys;p!==null&&i.error!==null&&((u=s.resetKeys)===void 0&&(u=[]),(d=f)===void 0&&(d=[]),u.length!==d.length||u.some(function(h,b){return!Object.is(h,d[b])}))&&((a=(c=this.props).onResetKeysChange)==null||a.call(c,s.resetKeys,f),this.reset())},o.render=function(){var s=this.state.error,i=this.props,a=i.fallbackRender,c=i.FallbackComponent,u=i.fallback;if(s!==null){var d={error:s,resetErrorBoundary:this.resetErrorBoundary};if(Mo.isValidElement(u))return u;if(typeof a=="function")return a(d);if(c)return Mo.createElement(c,d);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},r}(Mo.Component);function Oc({children:t,onError:e}){return l.jsx(M0,{fallback:l.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const R0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function O0(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function th(){return function(t){const[e]=ye(),n=w.useMemo(()=>t(e),[e,t]),[r,o]=w.useState(()=>n.initialValueFn()),s=w.useRef(r);return R0(()=>{const{initialValueFn:i,subscribe:a}=n,c=i();return s.current!==c&&(s.current=c,o(c)),a(u=>{s.current=u,o(u)})},[n,t]),r}(O0)}function nh(){return g.$getRoot().getTextContent()}function rh(t,e=!0){if(t)return!1;let n=nh();return e&&(n=n.trim()),n===""}function j0(t){if(!rh(t,!1))return!1;const e=g.$getRoot().getChildren(),n=e.length;if(n>1)return!1;for(let r=0;r<n;r++){const o=e[r];if(g.$isDecoratorNode(o))return!1;if(g.$isElementNode(o)){if(!g.$isParagraphNode(o)||o.__indent!==0)return!1;const s=o.getChildren(),i=s.length;for(let a=0;a<i;a++){const c=s[r];if(!g.$isTextNode(c))return!1}}}return!0}function jc(t){return()=>j0(t)}function oh(t){const e=window.location.origin,n=r=>{if(r.origin!==e)return;const o=t.getRootElement();if(document.activeElement!==o)return;const s=r.data;if(typeof s=="string"){let i;try{i=JSON.parse(s)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const a=i.payload;if(a&&a.functionId==="makeChanges"){const c=a.args;if(c){const[u,d,p,f,h,b]=c;t.update(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){const C=x.anchor;let E=C.getNode(),_=0,A=0;if(g.$isTextNode(E)&&u>=0&&d>=0&&(_=u,A=u+d,x.setTextNodeRange(E,_,E,A)),_===A&&p===""||(x.insertRawText(p),E=C.getNode()),g.$isTextNode(E)){_=f,A=f+h;const j=E.getTextContentSize();_=_>j?j:_,A=A>j?j:A,x.setTextNodeRange(E,_,E,A)}r.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}const Hl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function id(t){return t.getEditorState().read(jc(t.isComposing()))}function sh({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=ye(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return Hl(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=s.getElementByKey(f);b!==null&&u.push(fn.createPortal(h,b,f))}return u},[i,a,s])}(r,n);return function(s){Hl(()=>At(Ll.registerRichText(s),oh(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(I0,{content:e}),o]})}function I0({content:t}){const[e]=ye(),n=function(o){const[s,i]=w.useState(()=>id(o));return Hl(()=>{function a(){const c=id(o);i(c)}return a(),At(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=th();return n?typeof t=="function"?t(r):t:null}function ih({defaultSelection:t}){const[e]=ye();return w.useEffect(()=>{e.focus(()=>{const n=document.activeElement,r=e.getRootElement();r===null||n!==null&&r.contains(n)||r.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const L0=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function ah({onClear:t}){const[e]=ye();return L0(()=>e.registerCommand(g.CLEAR_EDITOR_COMMAND,n=>(e.update(()=>{if(t==null){const r=g.$getRoot(),o=g.$getSelection(),s=g.$createParagraphNode();r.clear(),r.append(s),o!==null&&s.select(),g.$isRangeSelection(o)&&(o.format=0)}else t()}),!0),g.COMMAND_PRIORITY_EDITOR),[e,t]),null}const lh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function P0({editor:t,ariaActiveDescendant:e,ariaAutoComplete:n,ariaControls:r,ariaDescribedBy:o,ariaErrorMessage:s,ariaExpanded:i,ariaInvalid:a,ariaLabel:c,ariaLabelledBy:u,ariaMultiline:d,ariaOwns:p,ariaRequired:f,autoCapitalize:h,className:b,id:x,role:C="textbox",spellCheck:E=!0,style:_,tabIndex:A,"data-testid":j,...G},O){const[V,F]=w.useState(t.isEditable()),$=w.useCallback(N=>{N&&N.ownerDocument&&N.ownerDocument.defaultView?t.setRootElement(N):t.setRootElement(null)},[t]),W=w.useMemo(()=>function(...N){return M=>{N.forEach(T=>{typeof T=="function"?T(M):T!=null&&(T.current=M)})}}(O,$),[$,O]);return lh(()=>(F(t.isEditable()),t.registerEditableListener(N=>{F(N)})),[t]),l.jsx("div",{"aria-activedescendant":V?e:void 0,"aria-autocomplete":V?n:"none","aria-controls":V?r:void 0,"aria-describedby":o,...s!=null?{"aria-errormessage":s}:{},"aria-expanded":V&&C==="combobox"?!!i:void 0,...a!=null?{"aria-invalid":a}:{},"aria-label":c,"aria-labelledby":u,"aria-multiline":d,"aria-owns":V?p:void 0,"aria-readonly":!V||void 0,"aria-required":f,autoCapitalize:h,className:b,contentEditable:V,"data-testid":j,id:x,ref:W,role:C,spellCheck:E,style:_,tabIndex:A,...G})}const $0=w.forwardRef(P0);function ad(t){return t.getEditorState().read(jc(t.isComposing()))}const Ic=w.forwardRef(F0);function F0(t,e){const{placeholder:n,...r}=t,[o]=ye();return l.jsxs(l.Fragment,{children:[l.jsx($0,{editor:o,...r,ref:e}),n!=null&&l.jsx(B0,{editor:o,content:n})]})}function B0({content:t,editor:e}){const n=function(i){const[a,c]=w.useState(()=>ad(i));return lh(()=>{function u(){const d=ad(i);c(d)}return u(),At(i.registerUpdateListener(()=>{u()}),i.registerEditableListener(()=>{u()}))},[i]),a}(e),[r,o]=w.useState(e.isEditable());if(w.useLayoutEffect(()=>(o(e.isEditable()),e.registerEditableListener(i=>{o(i)})),[e]),!n)return null;let s=null;return typeof t=="function"?s=t(r):t!==null&&(s=t),s===null?null:l.jsx("div",{"aria-hidden":!0,children:s})}function q0({placeholder:t,className:e,placeholderClassName:n}){return l.jsx(Ic,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:l.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const ch=w.createContext(void 0);function U0({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o,children:s}){const i=w.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o}),[t,e,n,r,o]);return l.jsx(ch.Provider,{value:i,children:s})}function uh(){const t=w.useContext(ch);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function V0(){const[t,e]=w.useState(void 0),n=w.useCallback(()=>{e(void 0)},[]),r=w.useMemo(()=>{if(t===void 0)return;const{title:s,content:i}=t;return l.jsx(jb,{open:!0,onOpenChange:n,children:l.jsxs(Cf,{children:[l.jsx(Ef,{children:l.jsx(kf,{children:s})}),i]})})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}function H0({children:t}){const[e]=ye(),[n,r]=w.useState(e),[o,s]=w.useState("paragraph"),[i,a]=V0(),c=()=>{};return w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,(u,d)=>(r(d),!1),g.COMMAND_PRIORITY_CRITICAL),[n]),l.jsxs(U0,{activeEditor:n,$updateToolbar:c,blockType:o,setBlockType:s,showModal:a,children:[i,t({blockType:o})]})}function z0(t){const[e]=ye(),{activeEditor:n}=uh();w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const r=g.$getSelection();return r&&t(r),!1},g.COMMAND_PRIORITY_CRITICAL),[e,t]),w.useEffect(()=>{n.getEditorState().read(()=>{const r=g.$getSelection();r&&t(r)})},[n,t])}const dh=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),G0=w.forwardRef(({className:t,variant:e,size:n,...r},o)=>l.jsx(xf.Root,{ref:o,className:K(dh({variant:e,size:n,className:t})),...r}));G0.displayName=xf.Root.displayName;const ph=w.createContext({size:"default",variant:"default"}),Ca=w.forwardRef(({className:t,variant:e,size:n,children:r,...o},s)=>{const i=_t();return l.jsx(va.Root,{ref:s,className:K("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:i,children:l.jsx(ph.Provider,{value:{variant:e,size:n},children:r})})});Ca.displayName=va.Root.displayName;const Oo=w.forwardRef(({className:t,children:e,variant:n,size:r,...o},s)=>{const i=w.useContext(ph);return l.jsx(va.Item,{ref:s,className:K(dh({variant:i.variant||n,size:i.size||r}),t),...o,children:e})});Oo.displayName=va.Item.displayName;const ld=[{format:"bold",icon:se.BoldIcon,label:"Bold"},{format:"italic",icon:se.ItalicIcon,label:"Italic"},{format:"underline",icon:se.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:se.StrikethroughIcon,label:"Strikethrough"}];function K0(){const{activeEditor:t}=uh(),[e,n]=w.useState([]),r=w.useCallback(o=>{if(g.$isRangeSelection(o)||mf.$isTableSelection(o)){const s=[];ld.forEach(({format:i})=>{o.hasFormat(i)&&s.push(i)}),n(i=>i.length!==s.length||!s.every(a=>i.includes(a))?s:i)}},[]);return z0(r),l.jsx(Ca,{type:"multiple",value:e,onValueChange:n,variant:"outline",size:"sm",children:ld.map(({format:o,icon:s,label:i})=>l.jsx(Oo,{value:o,"aria-label":i,onClick:()=>{t.dispatchCommand(g.FORMAT_TEXT_COMMAND,o)},children:l.jsx(s,{className:"tw-h-4 tw-w-4"})},o))})}function Y0({onClear:t}){const[e]=ye();w.useEffect(()=>{t&&t(()=>{e.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function W0({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:n}){const[,r]=w.useState(void 0),o=s=>{s!==void 0&&r(s)};return l.jsxs("div",{className:"tw-relative",children:[l.jsx(H0,{children:()=>l.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:l.jsx(K0,{})})}),l.jsxs("div",{className:"tw-relative",children:[l.jsx(sh,{contentEditable:l.jsx("div",{ref:o,children:l.jsx(q0,{placeholder:t})}),ErrorBoundary:Oc}),e&&l.jsx(ih,{defaultSelection:"rootStart"}),l.jsx(Y0,{onClear:n}),l.jsx(ah,{})]})]})}const J0={namespace:"Editor",theme:Ac,nodes:Mc,onError:t=>{console.error(t)}};function zl({editorState:t,editorSerializedState:e,onChange:n,onSerializedChange:r,placeholder:o="Start typing…",autoFocus:s=!1,onClear:i}){return l.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:l.jsx(Rc,{initialConfig:{...J0,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:l.jsxs(Qs,{children:[l.jsx(W0,{placeholder:o,autoFocus:s,onClear:i}),l.jsx(eh,{ignoreSelectionChange:!0,onChange:a=>{n==null||n(a),r==null||r(a.toJSON())}})]})})})}const fh=Dr.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),$o=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,className:K("pr-twp",fh({variant:e}),t),...n}));$o.displayName="Badge";const Ea=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Ea.displayName="Card";const hh=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));hh.displayName="CardHeader";const wh=w.forwardRef(({className:t,...e},n)=>l.jsx("h3",{ref:n,className:K("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));wh.displayName="CardTitle";const mh=w.forwardRef(({className:t,...e},n)=>l.jsx("p",{ref:n,className:K("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));mh.displayName="CardDescription";const Lc=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-p-6 tw-pt-0",t),...e}));Lc.displayName="CardContent";const gh=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));gh.displayName="CardFooter";const Zr=w.forwardRef(({className:t,orientation:e="horizontal",decorative:n=!0,...r},o)=>l.jsx(yf.Root,{ref:o,decorative:n,orientation:e,className:K("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...r}));Zr.displayName=yf.Root.displayName;const Pc=w.forwardRef(({className:t,...e},n)=>l.jsx(Zo.Root,{ref:n,className:K("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Pc.displayName=Zo.Root.displayName;const bh=w.forwardRef(({className:t,...e},n)=>l.jsx(Zo.Image,{ref:n,className:K("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));bh.displayName=Zo.Image.displayName;const $c=w.forwardRef(({className:t,...e},n)=>l.jsx(Zo.Fallback,{ref:n,className:K("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));$c.displayName=Zo.Fallback.displayName;const Fc=w.createContext(void 0);function On(){const t=w.useContext(Fc);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ur=Dr.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ei=Ge.Trigger,Bc=Ge.Group,vh=Ge.Portal,xh=Ge.Sub,yh=Ge.RadioGroup;function ns({variant:t="default",...e}){const n=w.useMemo(()=>({variant:t}),[t]);return l.jsx(Fc.Provider,{value:n,children:l.jsx(Ge.Root,{...e})})}const qc=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ge.SubTrigger,{ref:o,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ur({variant:s.variant})),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});qc.displayName=Ge.SubTrigger.displayName;const Uc=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.SubContent,{ref:n,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Uc.displayName=Ge.SubContent.displayName;const bo=w.forwardRef(({className:t,sideOffset:e=4,children:n,...r},o)=>{const s=_t();return l.jsx(Ge.Portal,{children:l.jsx(Ge.Content,{ref:o,sideOffset:e,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:l.jsx("div",{dir:s,children:n})})})});bo.displayName=Ge.Content.displayName;const ka=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=_t(),s=On();return l.jsx(Ge.Item,{ref:r,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ur({variant:s.variant})),...n,dir:o})});ka.displayName=Ge.Item.displayName;const Na=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ge.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ur({variant:s.variant})),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Na.displayName=Ge.CheckboxItem.displayName;const Vc=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ge.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ur({variant:o.variant})),...n,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ge.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Vc.displayName=Ge.RadioItem.displayName;const Ta=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ge.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));Ta.displayName=Ge.Label.displayName;const ti=w.forwardRef(({className:t,...e},n)=>l.jsx(Ge.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ti.displayName=Ge.Separator.displayName;function _h({className:t,...e}){return l.jsx("span",{className:K("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}_h.displayName="DropdownMenuShortcut";function cd({comment:t,isReply:e=!1,isEditable:n=!1,localizedStrings:r,isThreadExpanded:o=!1,threadStatus:s="Unspecified",handleResolveCommentThread:i=()=>{},handleUpdateComment:a,onEditingChange:c}){const[u,d]=w.useState(!1),[p,f]=w.useState(),h=w.useRef(null);w.useEffect(()=>{if(!u)return;let j=!0;const G=h.current;if(!G)return;const O=setTimeout(()=>{j&&Wf(G)},300);return()=>{j=!1,clearTimeout(O)}},[u]);const b=w.useCallback(()=>{d(!1),f(void 0),c==null||c(!1)},[c]),x=w.useCallback(async()=>{if(!p||!a)return;await a(t.id,Jf(p))&&(d(!1),f(void 0),c==null||c(!1))},[p,a,t.id,c]),C=w.useMemo(()=>{const j=new Date(t.date),G=ne.formatRelativeDate(j,r["%comment_date_today%"],r["%comment_date_yesterday%"]),O=j.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return ne.formatReplacementString(r["%comment_dateAtTime%"],{date:G,time:O})},[t.date,r]),E=w.useMemo(()=>!e&&t.assignedUser?ne.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:t.assignedUser}):t.user,[e,t.assignedUser,t.user,r]),_=w.useMemo(()=>t.user.split(" ").map(j=>j[0]).join("").toUpperCase().slice(0,2),[t.user]),A=w.useMemo(()=>{if(o&&n&&!ne.hasCustomParatextTags(t.contents))return l.jsxs(ka,{onClick:()=>{d(!0),f(T0(ne.parseParatextHtml(t.contents))),c==null||c(!0)},children:[l.jsx(se.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]})},[n,o,r,t.contents,c]);return l.jsxs("div",{className:K("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[l.jsx(Pc,{className:"tw-h-8 tw-w-8",children:l.jsx($c,{className:"tw-text-xs tw-font-medium",children:_})}),l.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[l.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[l.jsx("p",{className:"tw-text-sm tw-font-medium",children:E}),l.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:C})]}),u&&l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),b()):j.key==="Enter"&&j.shiftKey&&(j.preventDefault(),j.stopPropagation(),Kr(p)&&x())},onKeyDown:j=>{Xf(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:[l.jsx(zl,{editorSerializedState:p,onSerializedChange:j=>f(j)}),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ge,{size:"icon",onClick:b,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:l.jsx(se.X,{})}),l.jsx(ge,{size:"icon",onClick:x,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Kr(p),children:l.jsx(se.ArrowUp,{})})]})]}),!u&&l.jsx("div",{className:K("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:ne.parseParatextHtml(t.contents)}})]}),o&&!e&&s!=="Resolved"&&l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:j=>{j.stopPropagation(),i(t.thread)},children:l.jsx(se.Check,{})}),A&&l.jsxs(ns,{children:[l.jsx(ei,{asChild:!0,children:l.jsx(ge,{variant:"ghost",size:"icon",children:l.jsx(se.MoreHorizontal,{})})}),l.jsx(bo,{align:"end",children:A})]})]})}const ud={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],format:"",indent:0,type:"paragraph",version:1}],format:"",indent:0,type:"root",version:1}};function X0({comments:t,localizedStrings:e,isSelected:n=!1,verseRef:r,assignedUser:o,currentUser:s,handleSelectThread:i,threadId:a,threadStatus:c,handleResolveCommentThread:u,handleAddComment:d,handleUpdateComment:p}){const[f,h]=w.useState(ud),[b,x]=w.useState(!1),[C,E]=w.useState(!1),[_,A]=w.useState(!1),[j,G]=w.useState(!1),O=w.useMemo(()=>t[0],[t]),V=w.useRef(null),F=w.useRef(void 0);w.useEffect(()=>{const B=V.current;if(!B)return;const z=()=>{E(B.scrollWidth>B.clientWidth)};return z(),window.addEventListener("resize",z),()=>window.removeEventListener("resize",z)},[O.verse]),w.useEffect(()=>{A(!1)},[n]);const $=w.useMemo(()=>({singleReply:e["%comment_thread_single_reply%"],multipleReplies:e["%comment_thread_multiple_replies%"]}),[e]),W=w.useMemo(()=>o?ne.formatReplacementString(e["%comment_assigned_to%"],{assignedUser:o}):void 0,[o,e]),N=w.useMemo(()=>t.slice(1),[t]),M=w.useMemo(()=>N.length??0,[N.length]),T=w.useMemo(()=>M>0,[M]),L=w.useMemo(()=>_||M<=2?N:N.slice(-2),[N,M,_]),S=w.useMemo(()=>_||M<=2?0:M-2,[M,_]),D=w.useMemo(()=>M===1?$.singleReply:ne.formatReplacementString($.multipleReplies,{count:M}),[M,$]),P=w.useMemo(()=>S===1?$.singleReply:ne.formatReplacementString($.multipleReplies,{count:S}),[S,$]),H=w.useCallback(async()=>{var z;await d(a,Jf(f))&&((z=F.current)==null||z.call(F),h(ud))},[f,d,a]);return l.jsx(Ea,{role:"option","aria-selected":n,id:a,className:K("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer tw-bg-slate-50 hover:tw-shadow-md":!n},{"tw-bg-background":n}),onClick:()=>{i(a)},tabIndex:-1,children:l.jsxs(Lc,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[W&&l.jsx($o,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:W}),l.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[l.jsxs("p",{ref:V,className:K("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":b},{"tw-whitespace-nowrap":!b}),children:[r," ",O.verse]}),C&&l.jsx(ge,{variant:"ghost",size:"icon",onClick:B=>{B.stopPropagation(),x(!b)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":b?"Collapse text":"Expand text",children:b?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})})]}),l.jsx(cd,{comment:O,localizedStrings:e,isThreadExpanded:n,threadStatus:c,isEditable:t.length===1&&O.user===s,handleResolveCommentThread:u,handleUpdateComment:p,onEditingChange:G})]}),l.jsxs(l.Fragment,{children:[T&&!n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(Zr,{})}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:D})]}),!n&&Kr(f)&&l.jsx(zl,{editorSerializedState:f,onSerializedChange:B=>h(B),placeholder:e["%comment_replyOrAssign%"]}),n&&l.jsxs(l.Fragment,{children:[S>0&&l.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:B=>{B.stopPropagation(),A(!0)},role:"button",tabIndex:0,onKeyDown:B=>{(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),B.stopPropagation(),A(!0))},children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(Zr,{})}),l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:P}),_?l.jsx(se.ChevronUp,{}):l.jsx(se.ChevronDown,{})]})]}),L.map(B=>{const J=B.id===N[N.length-1].id&&B.user===s;return l.jsx("div",{children:l.jsx(cd,{comment:B,localizedStrings:e,isReply:!0,isThreadExpanded:n,isEditable:J,handleUpdateComment:p,onEditingChange:G})},B.id)}),(!j||Kr(f))&&l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:B=>B.stopPropagation(),onKeyDownCapture:B=>{B.key==="Enter"&&B.shiftKey&&(B.preventDefault(),B.stopPropagation(),Kr(f)&&H())},onKeyDown:B=>{Xf(B),(B.key==="Enter"||B.key===" ")&&B.stopPropagation()},children:[l.jsx(zl,{editorSerializedState:f,onSerializedChange:B=>h(B),placeholder:e["%comment_replyOrAssign%"],autoFocus:!0,onClear:B=>{F.current=B}}),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ge,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Kr(f),children:l.jsx(se.AtSign,{})}),l.jsx(ge,{size:"icon",onClick:H,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Kr(f),children:l.jsx(se.ArrowUp,{})})]})]})]})]})]})})}const Ni=t=>`thread-${t}`;function Q0({className:t="",threads:e,currentUser:n,localizedStrings:r,handleAddComment:o,handleResolveCommentThread:s,handleUpdateComment:i}){const[a,c]=w.useState(),u=e.map(C=>({id:Ni(C.id)})),d=w.useCallback(C=>{c(C.id)},[]),p=w.useCallback(C=>{c(C)},[]),{listboxRef:f,activeId:h,handleKeyDown:b}=Bf({options:u,onOptionSelect:d}),x=w.useCallback(C=>{C.key==="Escape"?(c(void 0),C.preventDefault(),C.stopPropagation()):b(C)},[b]);return w.useEffect(()=>{if(!a)return;const C=document.getElementById(a);if(!C)return;const E=requestAnimationFrame(()=>{const _=requestAnimationFrame(()=>{if(!Wf(C)){const A=C.querySelector("textarea:not([disabled]), select:not([disabled]), button:not([disabled])");A==null||A.focus()}});return()=>cancelAnimationFrame(_)});return()=>cancelAnimationFrame(E)},[a]),l.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:f,"aria-activedescendant":h??void 0,"aria-label":"Comments",className:K("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:x,children:e.map(C=>l.jsx("div",{children:l.jsx(X0,{comments:C.comments,localizedStrings:r,verseRef:C.verseRef,handleSelectThread:p,threadId:Ni(C.id),isSelected:a===Ni(C.id),currentUser:n,assignedUser:C.assignedUser,threadStatus:C.status,handleAddComment:o,handleResolveCommentThread:s,handleUpdateComment:i})},Ni(C.id)))})}function Z0({table:t}){return l.jsxs(ns,{children:[l.jsx(gf.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ge,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[l.jsx(se.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),l.jsxs(bo,{align:"end",className:"tw-w-[150px]",children:[l.jsx(Ta,{children:"Toggle columns"}),l.jsx(ti,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>l.jsx(Na,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:n=>e.toggleVisibility(!!n),children:e.id},e.id))]})]})}const eo=rt.Root,Ch=rt.Group,to=rt.Value,Eh=Dr.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Er=w.forwardRef(({className:t,children:e,size:n,...r},o)=>{const s=_t();return l.jsxs(rt.Trigger,{className:K(Eh({size:n,className:t})),ref:o,...r,dir:s,children:[e,l.jsx(rt.Icon,{asChild:!0,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Er.displayName=rt.Trigger.displayName;const Hc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollUpButton,{ref:n,className:K("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Hc.displayName=rt.ScrollUpButton.displayName;const zc=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.ScrollDownButton,{ref:n,className:K("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(se.ChevronDown,{className:"tw-h-4 tw-w-4"})}));zc.displayName=rt.ScrollDownButton.displayName;const kr=w.forwardRef(({className:t,children:e,position:n="popper",...r},o)=>{const s=_t();return l.jsx(rt.Portal,{children:l.jsxs(rt.Content,{ref:o,className:K("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:n,...r,children:[l.jsx(Hc,{}),l.jsx(rt.Viewport,{className:K("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:l.jsx("div",{dir:s,children:e})}),l.jsx(zc,{})]})})});kr.displayName=rt.Content.displayName;const kh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Label,{ref:n,className:K("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));kh.displayName=rt.Label.displayName;const cn=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(rt.Item,{ref:r,className:K("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(rt.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),l.jsx(rt.ItemText,{children:e})]}));cn.displayName=rt.Item.displayName;const Nh=w.forwardRef(({className:t,...e},n)=>l.jsx(rt.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Nh.displayName=rt.Separator.displayName;function ev({table:t}){return l.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[l.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),l.jsxs(eo,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[l.jsx(Er,{className:"tw-h-8 tw-w-[70px]",children:l.jsx(to,{placeholder:t.getState().pagination.pageSize})}),l.jsx(kr,{side:"top",children:[10,20,30,40,50].map(e=>l.jsx(cn,{value:`${e}`,children:e},e))})]})]}),l.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),l.jsx(se.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),l.jsx(se.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),l.jsx(se.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ge,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),l.jsx(se.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const dd=`
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
`;function tv(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Os(t,e){const n=e?`${dd}, ${e}`:dd;return Array.from(t.querySelectorAll(n)).filter(r=>!r.hasAttribute("disabled")&&!r.getAttribute("aria-hidden")&&tv(r))}const ni=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>{const o=w.useRef(null);w.useEffect(()=>{typeof r=="function"?r(o.current):r&&"current"in r&&(r.current=o.current)},[r]),w.useEffect(()=>{const i=o.current;if(!i)return;const a=()=>{requestAnimationFrame(()=>{Os(i,'[tabindex]:not([tabindex="-1"])').forEach(d=>{d.setAttribute("tabindex","-1")})})};a();const c=new MutationObserver(()=>{a()});return c.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{c.disconnect()}},[]);const s=i=>{const{current:a}=o;if(a){if(i.key==="ArrowDown"){i.preventDefault(),Os(a)[0].focus();return}i.key===" "&&document.activeElement===a&&i.preventDefault()}};return l.jsx("div",{className:K("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:l.jsx("table",{tabIndex:0,onKeyDown:s,ref:o,className:K("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...n})})});ni.displayName="Table";const ri=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>l.jsx("thead",{ref:r,className:K({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...n}));ri.displayName="TableHeader";const oi=w.forwardRef(({className:t,...e},n)=>l.jsx("tbody",{ref:n,className:K("[&_tr:last-child]:tw-border-0",t),...e}));oi.displayName="TableBody";const Th=w.forwardRef(({className:t,...e},n)=>l.jsx("tfoot",{ref:n,className:K("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Th.displayName="TableFooter";function nv(t){w.useEffect(()=>{const e=t.current;if(!e)return;const n=r=>{if(e.contains(document.activeElement)){if(r.key==="ArrowRight"||r.key==="ArrowLeft"){r.preventDefault(),r.stopPropagation();const o=t.current?Os(t.current):[],s=o.indexOf(document.activeElement),i=r.key==="ArrowRight"?s+1:s-1;i>=0&&i<o.length&&o[i].focus()}r.key==="Escape"&&(r.preventDefault(),e.focus()),(r.key==="ArrowDown"||r.key==="ArrowUp")&&r.preventDefault()}};return e.addEventListener("keydown",n),()=>{e.removeEventListener("keydown",n)}},[t])}function rv(t,e,n){let r;return n==="ArrowLeft"&&e>0?r=t[e-1]:n==="ArrowRight"&&e<t.length-1&&(r=t[e+1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}function ov(t,e,n){let r;return n==="ArrowDown"&&e<t.length-1?r=t[e+1]:n==="ArrowUp"&&e>0&&(r=t[e-1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}const Gn=w.forwardRef(({className:t,onKeyDown:e,onSelect:n,setFocusAlsoRunsSelect:r=!1,...o},s)=>{const i=w.useRef(null);w.useEffect(()=>{typeof s=="function"?s(i.current):s&&"current"in s&&(s.current=i.current)},[s]),nv(i);const a=w.useMemo(()=>i.current?Os(i.current):[],[i]),c=w.useCallback(d=>{const{current:p}=i;if(!p||!p.parentElement)return;const f=p.closest("table"),h=f?Os(f).filter(C=>C.tagName==="TR"):[],b=h.indexOf(p),x=a.indexOf(document.activeElement);if(d.key==="ArrowDown"||d.key==="ArrowUp")d.preventDefault(),ov(h,b,d.key);else if(d.key==="ArrowLeft"||d.key==="ArrowRight")d.preventDefault(),rv(a,x,d.key);else if(d.key==="Escape"){d.preventDefault();const C=p.closest("table");C&&C.focus()}e==null||e(d)},[i,a,e]),u=w.useCallback(d=>{r&&(n==null||n(d))},[r,n]);return l.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:c,onFocus:u,className:K("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});Gn.displayName="TableRow";const Fo=w.forwardRef(({className:t,...e},n)=>l.jsx("th",{ref:n,className:K("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Fo.displayName="TableHead";const Cr=w.forwardRef(({className:t,...e},n)=>l.jsx("td",{ref:n,className:K("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Cr.displayName="TableCell";const Sh=w.forwardRef(({className:t,...e},n)=>l.jsx("caption",{ref:n,className:K("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Sh.displayName="TableCaption";function Yi({className:t,...e}){return l.jsx("div",{className:K("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Ah({columns:t,data:e,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{},id:a,isLoading:c=!1,noResultsMessage:u}){var O;const[d,p]=w.useState([]),[f,h]=w.useState([]),[b,x]=w.useState({}),[C,E]=w.useState({}),_=w.useMemo(()=>e??[],[e]),A=Ft.useReactTable({data:_,columns:t,getCoreRowModel:Ft.getCoreRowModel(),...n&&{getPaginationRowModel:Ft.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Ft.getSortedRowModel(),onColumnFiltersChange:h,getFilteredRowModel:Ft.getFilteredRowModel(),onColumnVisibilityChange:x,onRowSelectionChange:E,state:{sorting:d,columnFilters:f,columnVisibility:b,rowSelection:C}}),j=A.getVisibleFlatColumns();let G;return c?G=Array.from({length:10}).map(($,W)=>`skeleton-row-${W}`).map($=>l.jsx(Gn,{children:l.jsx(Cr,{colSpan:j.length??t.length,className:"tw-border-0 tw-p-0",children:l.jsx("div",{className:"tw-w-full tw-py-2",children:l.jsx(Yi,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},$)):((O=A.getRowModel().rows)==null?void 0:O.length)>0?G=A.getRowModel().rows.map(V=>l.jsx(Gn,{onClick:()=>i(V,A),"data-state":V.getIsSelected()&&"selected",children:V.getVisibleCells().map(F=>l.jsx(Cr,{children:Ft.flexRender(F.column.columnDef.cell,F.getContext())},F.id))},V.id)):G=l.jsx(Gn,{children:l.jsx(Cr,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:u})}),l.jsxs("div",{className:"pr-twp",id:a,children:[o&&l.jsx(Z0,{table:A}),l.jsxs(ni,{stickyHeader:s,children:[l.jsx(ri,{stickyHeader:s,children:A.getHeaderGroups().map(V=>l.jsx(Gn,{children:V.headers.map(F=>l.jsx(Fo,{children:F.isPlaceholder?void 0:Ft.flexRender(F.column.columnDef.header,F.getContext())},F.id))},V.id))}),l.jsx(oi,{children:G})]}),n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>A.previousPage(),disabled:!A.getCanPreviousPage(),children:"Previous"}),l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>A.nextPage(),disabled:!A.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(ev,{table:A})]})}function sv({id:t,markdown:e,className:n,anchorTarget:r,truncate:o}){const s=w.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return l.jsx("div",{id:t,className:K("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":o},n),children:l.jsx(yb,{options:s,children:e})})}const Dh=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),pd=(t,e)=>t[e]??e;function Mh({errorDetails:t,handleCopyNotify:e,localizedStrings:n,id:r}){const o=pd(n,"%webView_error_dump_header%"),s=pd(n,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return l.jsxs("div",{id:r,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[l.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[l.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[l.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),l.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:s})]}),l.jsx(ge,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:l.jsx(se.Copy,{})})]}),l.jsx("div",{className:"tw-prose tw-w-full",children:l.jsx("pre",{className:"tw-text-xs",children:t})})]})}const iv=Object.freeze([...Dh,"%webView_error_dump_copied_message%"]);function av({errorDetails:t,handleCopyNotify:e,localizedStrings:n,children:r,className:o,id:s}){const[i,a]=w.useState(!1),c=()=>{a(!0),e&&e()},u=d=>{d||a(!1)};return l.jsxs(mo,{onOpenChange:u,children:[l.jsx(go,{asChild:!0,children:r}),l.jsxs(Rr,{id:s,className:K("tw-min-w-80 tw-max-w-96",o),children:[i&&n["%webView_error_dump_copied_message%"]&&l.jsx(ht,{children:n["%webView_error_dump_copied_message%"]}),l.jsx(Mh,{errorDetails:t,handleCopyNotify:c,localizedStrings:n})]})]})}var Rh=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Rh||{});function lv({id:t,label:e,groups:n}){const[r,o]=w.useState(Object.fromEntries(n.map((u,d)=>u.itemType===0?[d,[]]:void 0).filter(u=>!!u))),[s,i]=w.useState({}),a=(u,d)=>{const p=!r[u][d];o(h=>(h[u][d]=p,{...h}));const f=n[u].items[d];f.onUpdate(f.id,p)},c=(u,d)=>{i(f=>(f[u]=d,{...f}));const p=n[u].items.find(f=>f.id===d);p?p.onUpdate(d):console.error(`Could not find dropdown radio item with id '${d}'!`)};return l.jsx("div",{id:t,children:l.jsxs(ns,{children:[l.jsx(ei,{asChild:!0,children:l.jsxs(ge,{variant:"default",children:[l.jsx(se.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,l.jsx(se.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),l.jsx(bo,{children:n.map((u,d)=>l.jsxs("div",{children:[l.jsx(Ta,{children:u.label}),l.jsx(Bc,{children:u.itemType===0?l.jsx(l.Fragment,{children:u.items.map((p,f)=>l.jsx("div",{children:l.jsx(Na,{checked:r[d][f],onCheckedChange:()=>a(d,f),children:p.label})},p.id))}):l.jsx(yh,{value:s[d],onValueChange:p=>c(d,p),children:u.items.map(p=>l.jsx("div",{children:l.jsx(Vc,{value:p.id,children:p.label})},p.id))})}),l.jsx(ti,{})]},u.label))})]})})}function cv({id:t,category:e,downloads:n,languages:r,moreInfoUrl:o,handleMoreInfoLinkClick:s,supportUrl:i,handleSupportLinkClick:a}){const c=new ne.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((d,p)=>d+p,0)),u=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[l.jsx("div",{className:"tw-flex",children:l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsxs("div",{className:"tw-flex tw-gap-1",children:[l.jsx(se.User,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:c})]}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsx("div",{className:"tw-flex tw-gap-2",children:r.slice(0,3).map(d=>l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d.toUpperCase()},d))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>u(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",r.length-3," more languages"]})]}),(o||i)&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ge,{onClick:()=>s(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",l.jsx(se.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ge,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",l.jsx(se.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function uv({id:t,versionHistory:e}){const[n,r]=w.useState(!1),o=new Date;function s(a){const c=new Date(a),u=new Date(o.getTime()-c.getTime()),d=u.getUTCFullYear()-1970,p=u.getUTCMonth(),f=u.getUTCDate()-1;let h="";return d>0?h=`${d.toString()} year${d===1?"":"s"} ago`:p>0?h=`${p.toString()} month${p===1?"":"s"} ago`:f===0?h="today":h=`${f.toString()} day${f===1?"":"s"} ago`,h}const i=Object.entries(e).sort((a,c)=>c[0].localeCompare(a[0]));return l.jsxs("div",{className:"pr-twp",id:t,children:[l.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?i:i.slice(0,5)).map(a=>l.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[l.jsx("div",{className:"tw-text-foreground",children:l.jsx("li",{className:"tw-prose tw-text-xs",children:l.jsx("span",{children:a[1].description})})}),l.jsxs("div",{className:"tw-justify-end tw-text-right",children:[l.jsxs("div",{children:["Version ",a[0]]}),l.jsx("div",{children:s(a[1].date)})]})]},a[0]))}),i.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function dv({id:t,publisherDisplayName:e,fileSize:n,locales:r,versionHistory:o,currentVersion:s}){const i=w.useMemo(()=>ne.formatBytes(n),[n]),c=(u=>{const d=new Intl.DisplayNames(ne.getCurrentLocale(),{type:"language"});return u.map(p=>d.of(p))})(r);return l.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(o).length>0&&l.jsx(uv,{versionHistory:o}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[l.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),l.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Publisher"}),l.jsx("span",{className:"tw-font-semibold",children:e}),l.jsx("span",{children:"Size"}),l.jsx("span",{className:"tw-font-semibold",children:i})]}),l.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Version"}),l.jsx("span",{className:"tw-font-semibold",children:s}),l.jsx("span",{children:"Languages"}),l.jsx("span",{className:"tw-font-semibold",children:c.join(", ")})]})})]})]})]})})}function Oh({entries:t,selected:e,onChange:n,placeholder:r,hasToggleAllFeature:o=!1,selectAllText:s="Select All",clearAllText:i="Clear All",commandEmptyMessage:a="No entries found",customSelectedText:c,isOpen:u=void 0,onOpenChange:d=void 0,isDisabled:p=!1,sortSelected:f=!1,icon:h=void 0,className:b=void 0,variant:x="ghost",id:C}){const[E,_]=w.useState(!1),A=w.useCallback(W=>{var M;const N=(M=t.find(T=>T.label===W))==null?void 0:M.value;N&&n(e.includes(N)?e.filter(T=>T!==N):[...e,N])},[t,e,n]),j=()=>c||r,G=w.useMemo(()=>{if(!f)return t;const W=t.filter(M=>M.starred).sort((M,T)=>M.label.localeCompare(T.label)),N=t.filter(M=>!M.starred).sort((M,T)=>{const L=e.includes(M.value),S=e.includes(T.value);return L&&!S?-1:!L&&S?1:M.label.localeCompare(T.label)});return[...W,...N]},[t,e,f]),O=()=>{n(t.map(W=>W.value))},V=()=>{n([])},F=u??E,$=d??_;return l.jsx("div",{id:C,className:b,children:l.jsxs(mo,{open:F,onOpenChange:$,children:[l.jsx(go,{asChild:!0,children:l.jsxs(ge,{variant:x,role:"combobox","aria-expanded":F,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[l.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[h&&l.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:l.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:h})}),l.jsx("span",{className:K("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:j()})]}),l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{align:"start",className:"tw-w-full tw-p-0",children:l.jsxs(ho,{children:[l.jsx(es,{placeholder:`Search ${r.toLowerCase()}...`}),o&&l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:O,children:s}),l.jsx(ge,{variant:"ghost",size:"sm",onClick:V,children:i})]}),l.jsxs(wo,{children:[l.jsx(Ws,{children:a}),l.jsx(ir,{children:G.map(W=>l.jsxs(Mr,{value:W.label,onSelect:A,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("div",{className:"w-4",children:l.jsx(se.Check,{className:K("tw-h-4 tw-w-4",e.includes(W.value)?"tw-opacity-100":"tw-opacity-0")})}),W.starred&&l.jsx(se.Star,{className:"tw-h-4 tw-w-4"}),l.jsx("div",{className:"tw-flex-grow",children:W.label}),W.secondaryLabel&&l.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:W.secondaryLabel})]},W.label))})]})]})})]})})}function pv({entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u,badgesPlaceholder:d,id:p}){return l.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx(Oh,{entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:s,isDisabled:i,sortSelected:a,icon:c,className:u}),e.length>0?l.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var h;return l.jsxs($o,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[l.jsx(ge,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(e.filter(b=>b!==f)),children:l.jsx(se.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(b=>b.value===f))==null?void 0:h.label]},f)})}):l.jsx(ht,{children:d})]})}var xr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function fv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ae={},gt={},fd;function rs(){if(fd)return gt;fd=1;function t(E,_,A){if(A===void 0&&(A=Array.prototype),E&&typeof A.find=="function")return A.find.call(E,_);for(var j=0;j<E.length;j++)if(n(E,j)){var G=E[j];if(_.call(void 0,G,j,E))return G}}function e(E,_){return _===void 0&&(_=Object),_&&typeof _.getOwnPropertyDescriptors=="function"&&(E=_.create(null,_.getOwnPropertyDescriptors(E))),_&&typeof _.freeze=="function"?_.freeze(E):E}function n(E,_){return Object.prototype.hasOwnProperty.call(E,_)}function r(E,_){if(E===null||typeof E!="object")throw new TypeError("target is not an object");for(var A in _)n(_,A)&&(E[A]=_[A]);return E}var o=e({allowfullscreen:!0,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,default:!0,defer:!0,disabled:!0,formnovalidate:!0,hidden:!0,ismap:!0,itemscope:!0,loop:!0,multiple:!0,muted:!0,nomodule:!0,novalidate:!0,open:!0,playsinline:!0,readonly:!0,required:!0,reversed:!0,selected:!0});function s(E){return n(o,E.toLowerCase())}var i=e({area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function a(E){return n(i,E.toLowerCase())}var c=e({script:!1,style:!1,textarea:!0,title:!0});function u(E){var _=E.toLowerCase();return n(c,_)&&!c[_]}function d(E){var _=E.toLowerCase();return n(c,_)&&c[_]}function p(E){return E===h.HTML}function f(E){return p(E)||E===h.XML_XHTML_APPLICATION}var h=e({HTML:"text/html",XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),b=Object.keys(h).map(function(E){return h[E]});function x(E){return b.indexOf(E)>-1}var C=e({HTML:"http://www.w3.org/1999/xhtml",SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});return gt.assign=r,gt.find=t,gt.freeze=e,gt.HTML_BOOLEAN_ATTRIBUTES=o,gt.HTML_RAW_TEXT_ELEMENTS=c,gt.HTML_VOID_ELEMENTS=i,gt.hasDefaultHTMLNamespace=f,gt.hasOwn=n,gt.isHTMLBooleanAttribute=s,gt.isHTMLRawTextElement=u,gt.isHTMLEscapableRawTextElement=d,gt.isHTMLMimeType=p,gt.isHTMLVoidElement=a,gt.isValidMimeType=x,gt.MIME_TYPE=h,gt.NAMESPACE=C,gt}var So={},hd;function Sa(){if(hd)return So;hd=1;var t=rs();function e(f,h){f.prototype=Object.create(Error.prototype,{constructor:{value:f},name:{value:f.name,enumerable:!0,writable:h}})}var n=t.freeze({Error:"Error",IndexSizeError:"IndexSizeError",DomstringSizeError:"DomstringSizeError",HierarchyRequestError:"HierarchyRequestError",WrongDocumentError:"WrongDocumentError",InvalidCharacterError:"InvalidCharacterError",NoDataAllowedError:"NoDataAllowedError",NoModificationAllowedError:"NoModificationAllowedError",NotFoundError:"NotFoundError",NotSupportedError:"NotSupportedError",InUseAttributeError:"InUseAttributeError",InvalidStateError:"InvalidStateError",SyntaxError:"SyntaxError",InvalidModificationError:"InvalidModificationError",NamespaceError:"NamespaceError",InvalidAccessError:"InvalidAccessError",ValidationError:"ValidationError",TypeMismatchError:"TypeMismatchError",SecurityError:"SecurityError",NetworkError:"NetworkError",AbortError:"AbortError",URLMismatchError:"URLMismatchError",QuotaExceededError:"QuotaExceededError",TimeoutError:"TimeoutError",InvalidNodeTypeError:"InvalidNodeTypeError",DataCloneError:"DataCloneError",EncodingError:"EncodingError",NotReadableError:"NotReadableError",UnknownError:"UnknownError",ConstraintError:"ConstraintError",DataError:"DataError",TransactionInactiveError:"TransactionInactiveError",ReadOnlyError:"ReadOnlyError",VersionError:"VersionError",OperationError:"OperationError",NotAllowedError:"NotAllowedError",OptOutError:"OptOutError"}),r=Object.keys(n);function o(f){return typeof f=="number"&&f>=1&&f<=25}function s(f){return typeof f=="string"&&f.substring(f.length-n.Error.length)===n.Error}function i(f,h){o(f)?(this.name=r[f],this.message=h||""):(this.message=f,this.name=s(h)?h:n.Error),Error.captureStackTrace&&Error.captureStackTrace(this,i)}e(i,!0),Object.defineProperties(i.prototype,{code:{enumerable:!0,get:function(){var f=r.indexOf(this.name);return o(f)?f:0}}});for(var a={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25},c=Object.entries(a),u=0;u<c.length;u++){var d=c[u][0];i[d]=c[u][1]}function p(f,h){this.message=f,this.locator=h,Error.captureStackTrace&&Error.captureStackTrace(this,p)}return e(p),So.DOMException=i,So.DOMExceptionName=n,So.ExceptionCode=a,So.ParseError=p,So}var tt={},_e={},wd;function jh(){if(wd)return _e;wd=1;function t(Pe){try{typeof Pe!="function"&&(Pe=RegExp);var Xe=new Pe("𝌆","u").exec("𝌆");return!!Xe&&Xe[0].length===2}catch{}return!1}var e=t();function n(Pe){if(Pe.source[0]!=="[")throw new Error(Pe+" can not be used with chars");return Pe.source.slice(1,Pe.source.lastIndexOf("]"))}function r(Pe,Xe){if(Pe.source[0]!=="[")throw new Error("/"+Pe.source+"/ can not be used with chars_without");if(!Xe||typeof Xe!="string")throw new Error(JSON.stringify(Xe)+" is not a valid search");if(Pe.source.indexOf(Xe)===-1)throw new Error('"'+Xe+'" is not is /'+Pe.source+"/");if(Xe==="-"&&Pe.source.indexOf(Xe)!==1)throw new Error('"'+Xe+'" is not at the first postion of /'+Pe.source+"/");return new RegExp(Pe.source.replace(Xe,""),e?"u":"")}function o(Pe){var Xe=this;return new RegExp(Array.prototype.slice.call(arguments).map(function(Lt){var Pt=typeof Lt=="string";if(Pt&&Xe===void 0&&Lt==="|")throw new Error("use regg instead of reg to wrap expressions with `|`!");return Pt?Lt:Lt.source}).join(""),e?"mu":"m")}function s(Pe){if(arguments.length===0)throw new Error("no parameters provided");return o.apply(s,["(?:"].concat(Array.prototype.slice.call(arguments),[")"]))}var i="�",a=/[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;e&&(a=o("[",n(a),"\\u{10000}-\\u{10FFFF}","]"));var c=/[\x20\x09\x0D\x0A]/,u=n(c),d=o(c,"+"),p=o(c,"*"),f=/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;e&&(f=o("[",n(f),"\\u{10000}-\\u{10FFFF}","]"));var h=n(f),b=o("[",h,n(/[-.0-9\xB7]/),n(/[\u0300-\u036F\u203F-\u2040]/),"]"),x=o(f,b,"*"),C=o(b,"+"),E=o("&",x,";"),_=s(/&#[0-9]+;|&#x[0-9a-fA-F]+;/),A=s(E,"|",_),j=o("%",x,";"),G=s(o('"',s(/[^%&"]/,"|",j,"|",A),"*",'"'),"|",o("'",s(/[^%&']/,"|",j,"|",A),"*","'")),O=s('"',s(/[^<&"]/,"|",A),"*",'"',"|","'",s(/[^<&']/,"|",A),"*","'"),V=r(f,":"),F=r(b,":"),$=o(V,F,"*"),W=o($,s(":",$),"?"),N=o("^",W,"$"),M=o("(",W,")"),T=s(/"[^"]*"|'[^']*'/),L=o(/^<\?/,"(",x,")",s(d,"(",a,"*?)"),"?",/\?>/),S=/[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/,D=s('"',S,'*"',"|","'",r(S,"'"),"*'"),P="<!--",H="-->",B=o(P,s(r(a,"-"),"|",o("-",r(a,"-"))),"*",H),z="#PCDATA",J=s(o(/\(/,p,z,s(p,/\|/,p,W),"*",p,/\)\*/),"|",o(/\(/,p,z,p,/\)/)),ee=/[?*+]?/,te=o(/\([^>]+\)/,ee),Z=s("EMPTY","|","ANY","|",J,"|",te),X="<!ELEMENT",le=o(X,d,s(W,"|",j),d,s(Z,"|",j),p,">"),ce=o("NOTATION",d,/\(/,p,x,s(p,/\|/,p,x),"*",p,/\)/),ue=o(/\(/,p,C,s(p,/\|/,p,C),"*",p,/\)/),me=s(ce,"|",ue),he=s(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/,"|",me),we=s(/#REQUIRED|#IMPLIED/,"|",s(s("#FIXED",d),"?",O)),ie=s(d,x,d,he,d,we),Ce="<!ATTLIST",De=o(Ce,d,x,ie,"*",p,">"),oe="about:legacy-compat",be=s('"'+oe+'"',"|","'"+oe+"'"),Ne="SYSTEM",Oe="PUBLIC",Fe=s(s(Ne,d,T),"|",s(Oe,d,D,d,T)),Ze=o("^",s(s(Ne,d,"(?<SystemLiteralOnly>",T,")"),"|",s(Oe,d,"(?<PubidLiteral>",D,")",d,"(?<SystemLiteral>",T,")"))),Je=s(d,"NDATA",d,x),ot=s(G,"|",s(Fe,Je,"?")),Ee="<!ENTITY",ut=o(Ee,d,x,d,ot,p,">"),Ve=s(G,"|",Fe),bn=o(Ee,d,"%",d,x,d,Ve,p,">"),Xt=s(ut,"|",bn),Ut=o(Oe,d,D),Qt=o("<!NOTATION",d,x,d,s(Fe,"|",Ut),p,">"),fe=o(p,"=",p),Le=/1[.]\d+/,dt=o(d,"version",fe,s("'",Le,"'","|",'"',Le,'"')),mt=/[A-Za-z][-A-Za-z0-9._]*/,Zt=s(d,"encoding",fe,s('"',mt,'"',"|","'",mt,"'")),en=s(d,"standalone",fe,s("'",s("yes","|","no"),"'","|",'"',s("yes","|","no"),'"')),vn=o(/^<\?xml/,dt,Zt,"?",en,"?",p,/\?>/),tn="<!DOCTYPE",nn="<![CDATA[",Ct="]]>",rn=/<!\[CDATA\[/,on=/\]\]>/,Vt=o(a,"*?",on),In=o(rn,Vt);return _e.chars=n,_e.chars_without=r,_e.detectUnicodeSupport=t,_e.reg=o,_e.regg=s,_e.ABOUT_LEGACY_COMPAT=oe,_e.ABOUT_LEGACY_COMPAT_SystemLiteral=be,_e.AttlistDecl=De,_e.CDATA_START=nn,_e.CDATA_END=Ct,_e.CDSect=In,_e.Char=a,_e.Comment=B,_e.COMMENT_START=P,_e.COMMENT_END=H,_e.DOCTYPE_DECL_START=tn,_e.elementdecl=le,_e.EntityDecl=Xt,_e.EntityValue=G,_e.ExternalID=Fe,_e.ExternalID_match=Ze,_e.Name=x,_e.NotationDecl=Qt,_e.Reference=A,_e.PEReference=j,_e.PI=L,_e.PUBLIC=Oe,_e.PubidLiteral=D,_e.QName=W,_e.QName_exact=N,_e.QName_group=M,_e.S=d,_e.SChar_s=u,_e.S_OPT=p,_e.SYSTEM=Ne,_e.SystemLiteral=T,_e.UNICODE_REPLACEMENT_CHARACTER=i,_e.UNICODE_SUPPORT=e,_e.XMLDecl=vn,_e}var md;function Ih(){if(md)return tt;md=1;var t=rs(),e=t.find,n=t.hasDefaultHTMLNamespace,r=t.hasOwn,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.isHTMLVoidElement,a=t.MIME_TYPE,c=t.NAMESPACE,u=Symbol(),d=Sa(),p=d.DOMException,f=d.DOMExceptionName,h=jh();function b(v){if(v!==u)throw new TypeError("Illegal constructor")}function x(v){return v!==""}function C(v){return v?v.split(/[\t\n\f\r ]+/).filter(x):[]}function E(v,y){return r(v,y)||(v[y]=!0),v}function _(v){if(!v)return[];var y=C(v);return Object.keys(y.reduce(E,{}))}function A(v){return function(y){return v&&v.indexOf(y)!==-1}}function j(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in qualified name "'+v+'"')}function G(v,y){j(y),v=v||null;var R=null,Y=y;if(y.indexOf(":")>=0){var re=y.split(":");R=re[0],Y=re[1]}if(R!==null&&v===null)throw new p(p.NAMESPACE_ERR,"prefix is non-null and namespace is null");if(R==="xml"&&v!==t.NAMESPACE.XML)throw new p(p.NAMESPACE_ERR,'prefix is "xml" and namespace is not the XML namespace');if((R==="xmlns"||y==="xmlns")&&v!==t.NAMESPACE.XMLNS)throw new p(p.NAMESPACE_ERR,'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');if(v===t.NAMESPACE.XMLNS&&R!=="xmlns"&&y!=="xmlns")throw new p(p.NAMESPACE_ERR,'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');return[v,R,Y]}function O(v,y){for(var R in v)r(v,R)&&(y[R]=v[R])}function V(v,y){var R=v.prototype;if(!(R instanceof y)){let Y=function(){};Y.prototype=y.prototype,Y=new Y,O(R,Y),v.prototype=R=Y}R.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),R.constructor=v)}var F={},$=F.ELEMENT_NODE=1,W=F.ATTRIBUTE_NODE=2,N=F.TEXT_NODE=3,M=F.CDATA_SECTION_NODE=4,T=F.ENTITY_REFERENCE_NODE=5,L=F.ENTITY_NODE=6,S=F.PROCESSING_INSTRUCTION_NODE=7,D=F.COMMENT_NODE=8,P=F.DOCUMENT_NODE=9,H=F.DOCUMENT_TYPE_NODE=10,B=F.DOCUMENT_FRAGMENT_NODE=11,z=F.NOTATION_NODE=12,J=t.freeze({DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:2,DOCUMENT_POSITION_FOLLOWING:4,DOCUMENT_POSITION_CONTAINS:8,DOCUMENT_POSITION_CONTAINED_BY:16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32});function ee(v,y){if(y.length<v.length)return ee(y,v);var R=null;for(var Y in v){if(v[Y]!==y[Y])return R;R=v[Y]}return R}function te(v){return v.guid||(v.guid=Math.random()),v.guid}function Z(){}Z.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v){for(var y=[],R=0;R<this.length;R++)Pt(this[R],y,v);return y.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}},Z.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function X(v,y){this._node=v,this._refresh=y,le(this)}function le(v){var y=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==y){var R=v._refresh(v._node);if(dn(v,"length",R.length),!v.$$length||R.length<v.$$length)for(var Y=R.length;Y in v;Y++)r(v,Y)&&delete v[Y];O(R,v),v._inc=y}}X.prototype.item=function(v){return le(this),this[v]||null},V(X,Z);function ce(){}function ue(v,y){for(var R=0;R<v.length;){if(v[R]===y)return R;R++}}function me(v,y,R,Y){if(Y?y[ue(y,Y)]=R:(y[y.length]=R,y.length++),v){R.ownerElement=v;var re=v.ownerDocument;re&&(Y&&Ne(re,v,Y),be(re,v,R))}}function he(v,y,R){var Y=ue(y,R);if(Y>=0){for(var re=y.length-1;Y<=re;)y[Y]=y[++Y];if(y.length=re,v){var ae=v.ownerDocument;ae&&Ne(ae,v,R),R.ownerElement=null}}}ce.prototype={length:0,item:Z.prototype.item,getNamedItem:function(v){this._ownerElement&&this._ownerElement._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());for(var y=0;y<this.length;){var R=this[y];if(R.nodeName===v)return R;y++}return null},setNamedItem:function(v){var y=v.ownerElement;if(y&&y!==this._ownerElement)throw new p(p.INUSE_ATTRIBUTE_ERR);var R=this.getNamedItemNS(v.namespaceURI,v.localName);return R===v?v:(me(this._ownerElement,this,v,R),R)},setNamedItemNS:function(v){return this.setNamedItem(v)},removeNamedItem:function(v){var y=this.getNamedItem(v);if(!y)throw new p(p.NOT_FOUND_ERR,v);return he(this._ownerElement,this,y),y},removeNamedItemNS:function(v,y){var R=this.getNamedItemNS(v,y);if(!R)throw new p(p.NOT_FOUND_ERR,v?v+" : "+y:y);return he(this._ownerElement,this,R),R},getNamedItemNS:function(v,y){v||(v=null);for(var R=0;R<this.length;){var Y=this[R];if(Y.localName===y&&Y.namespaceURI===v)return Y;R++}return null}},ce.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function we(){}we.prototype={hasFeature:function(v,y){return!0},createDocument:function(v,y,R){var Y=a.XML_APPLICATION;v===c.HTML?Y=a.XML_XHTML_APPLICATION:v===c.SVG&&(Y=a.XML_SVG_IMAGE);var re=new oe(u,{contentType:Y});if(re.implementation=this,re.childNodes=new Z,re.doctype=R||null,R&&re.appendChild(R),y){var ae=re.createElementNS(v,y);re.appendChild(ae)}return re},createDocumentType:function(v,y,R,Y){j(v);var re=new tn(u);return re.name=v,re.nodeName=v,re.publicId=y||"",re.systemId=R||"",re.internalSubset=Y||"",re.childNodes=new Z,re},createHTMLDocument:function(v){var y=new oe(u,{contentType:a.HTML});if(y.implementation=this,y.childNodes=new Z,v!==!1){y.doctype=this.createDocumentType("html"),y.doctype.ownerDocument=y,y.appendChild(y.doctype);var R=y.createElement("html");y.appendChild(R);var Y=y.createElement("head");if(R.appendChild(Y),typeof v=="string"){var re=y.createElement("title");re.appendChild(y.createTextNode(v)),Y.appendChild(re)}R.appendChild(y.createElement("body"))}return y}};function ie(v){b(v)}ie.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,parentNode:null,get parentElement(){return this.parentNode&&this.parentNode.nodeType===this.ELEMENT_NODE?this.parentNode:null},childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,baseURI:"about:blank",get isConnected(){var v=this.getRootNode();return v&&v.nodeType===v.DOCUMENT_NODE},contains:function(v){if(!v)return!1;var y=v;do{if(this===y)return!0;y=v.parentNode}while(y);return!1},getRootNode:function(v){var y=this;do{if(!y.parentNode)return y;y=y.parentNode}while(y)},isEqualNode:function(v){if(!v||this.nodeType!==v.nodeType)return!1;switch(this.nodeType){case this.DOCUMENT_TYPE_NODE:if(this.name!==v.name||this.publicId!==v.publicId||this.systemId!==v.systemId)return!1;break;case this.ELEMENT_NODE:if(this.namespaceURI!==v.namespaceURI||this.prefix!==v.prefix||this.localName!==v.localName||this.attributes.length!==v.attributes.length)return!1;for(var y=0;y<this.attributes.length;y++){var R=this.attributes.item(y);if(!R.isEqualNode(v.getAttributeNodeNS(R.namespaceURI,R.localName)))return!1}break;case this.ATTRIBUTE_NODE:if(this.namespaceURI!==v.namespaceURI||this.localName!==v.localName||this.value!==v.value)return!1;break;case this.PROCESSING_INSTRUCTION_NODE:if(this.target!==v.target||this.data!==v.data)return!1;break;case this.TEXT_NODE:case this.COMMENT_NODE:if(this.data!==v.data)return!1;break}if(this.childNodes.length!==v.childNodes.length)return!1;for(var y=0;y<this.childNodes.length;y++)if(!this.childNodes[y].isEqualNode(v.childNodes[y]))return!1;return!0},isSameNode:function(v){return this===v},insertBefore:function(v,y){return fe(this,v,y)},replaceChild:function(v,y){fe(this,v,y,Qt),y&&this.removeChild(y)},removeChild:function(v){return Fe(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return hr(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var y=v.nextSibling;y&&y.nodeType==N&&v.nodeType==N?(this.removeChild(y),v.appendData(y.data)):(v.normalize(),v=y)}},isSupported:function(v,y){return this.ownerDocument.implementation.hasFeature(v,y)},lookupPrefix:function(v){for(var y=this;y;){var R=y._nsMap;if(R){for(var Y in R)if(r(R,Y)&&R[Y]===v)return Y}y=y.nodeType==W?y.ownerDocument:y.parentNode}return null},lookupNamespaceURI:function(v){for(var y=this;y;){var R=y._nsMap;if(R&&r(R,v))return R[v];y=y.nodeType==W?y.ownerDocument:y.parentNode}return null},isDefaultNamespace:function(v){var y=this.lookupPrefix(v);return y==null},compareDocumentPosition:function(v){if(this===v)return 0;var y=v,R=this,Y=null,re=null;if(y instanceof dt&&(Y=y,y=Y.ownerElement),R instanceof dt&&(re=R,R=re.ownerElement,Y&&y&&R===y))for(var ae=0,ke;ke=R.attributes[ae];ae++){if(ke===Y)return J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+J.DOCUMENT_POSITION_PRECEDING;if(ke===re)return J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+J.DOCUMENT_POSITION_FOLLOWING}if(!y||!R||R.ownerDocument!==y.ownerDocument)return J.DOCUMENT_POSITION_DISCONNECTED+J.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+(te(R.ownerDocument)>te(y.ownerDocument)?J.DOCUMENT_POSITION_FOLLOWING:J.DOCUMENT_POSITION_PRECEDING);if(re&&y===R)return J.DOCUMENT_POSITION_CONTAINS+J.DOCUMENT_POSITION_PRECEDING;if(Y&&y===R)return J.DOCUMENT_POSITION_CONTAINED_BY+J.DOCUMENT_POSITION_FOLLOWING;for(var et=[],it=y.parentNode;it;){if(!re&&it===R)return J.DOCUMENT_POSITION_CONTAINED_BY+J.DOCUMENT_POSITION_FOLLOWING;et.push(it),it=it.parentNode}et.reverse();for(var Et=[],pt=R.parentNode;pt;){if(!Y&&pt===y)return J.DOCUMENT_POSITION_CONTAINS+J.DOCUMENT_POSITION_PRECEDING;Et.push(pt),pt=pt.parentNode}Et.reverse();var We=ee(et,Et);for(var sn in We.childNodes){var Dt=We.childNodes[sn];if(Dt===R)return J.DOCUMENT_POSITION_FOLLOWING;if(Dt===y)return J.DOCUMENT_POSITION_PRECEDING;if(Et.indexOf(Dt)>=0)return J.DOCUMENT_POSITION_FOLLOWING;if(et.indexOf(Dt)>=0)return J.DOCUMENT_POSITION_PRECEDING}return 0}};function Ce(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}O(F,ie),O(F,ie.prototype),O(J,ie),O(J,ie.prototype);function De(v,y){if(y(v))return!0;if(v=v.firstChild)do if(De(v,y))return!0;while(v=v.nextSibling)}function oe(v,y){b(v);var R=y||{};this.ownerDocument=this,this.contentType=R.contentType||a.XML_APPLICATION,this.type=o(this.contentType)?"html":"xml"}function be(v,y,R){v&&v._inc++;var Y=R.namespaceURI;Y===c.XMLNS&&(y._nsMap[R.prefix?R.localName:""]=R.value)}function Ne(v,y,R,Y){v&&v._inc++;var re=R.namespaceURI;re===c.XMLNS&&delete y._nsMap[R.prefix?R.localName:""]}function Oe(v,y,R){if(v&&v._inc){v._inc++;var Y=y.childNodes;if(R&&!R.nextSibling)Y[Y.length++]=R;else{for(var re=y.firstChild,ae=0;re;)Y[ae++]=re,re=re.nextSibling;Y.length=ae,delete Y[Y.length]}}}function Fe(v,y){if(v!==y.parentNode)throw new p(p.NOT_FOUND_ERR,"child's parent is not parent");var R=y.previousSibling,Y=y.nextSibling;return R?R.nextSibling=Y:v.firstChild=Y,Y?Y.previousSibling=R:v.lastChild=R,Oe(v.ownerDocument,v),y.parentNode=null,y.previousSibling=null,y.nextSibling=null,y}function Ze(v){return v&&(v.nodeType===ie.DOCUMENT_NODE||v.nodeType===ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===ie.ELEMENT_NODE)}function Je(v){return v&&(v.nodeType===ie.CDATA_SECTION_NODE||v.nodeType===ie.COMMENT_NODE||v.nodeType===ie.DOCUMENT_FRAGMENT_NODE||v.nodeType===ie.DOCUMENT_TYPE_NODE||v.nodeType===ie.ELEMENT_NODE||v.nodeType===ie.PROCESSING_INSTRUCTION_NODE||v.nodeType===ie.TEXT_NODE)}function ot(v){return v&&v.nodeType===ie.DOCUMENT_TYPE_NODE}function Ee(v){return v&&v.nodeType===ie.ELEMENT_NODE}function ut(v){return v&&v.nodeType===ie.TEXT_NODE}function Ve(v,y){var R=v.childNodes||[];if(e(R,Ee)||ot(y))return!1;var Y=e(R,ot);return!(y&&Y&&R.indexOf(Y)>R.indexOf(y))}function bn(v,y){var R=v.childNodes||[];function Y(ae){return Ee(ae)&&ae!==y}if(e(R,Y))return!1;var re=e(R,ot);return!(y&&re&&R.indexOf(re)>R.indexOf(y))}function Xt(v,y,R){if(!Ze(v))throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected parent node type "+v.nodeType);if(R&&R.parentNode!==v)throw new p(p.NOT_FOUND_ERR,"child not in parent");if(!Je(y)||ot(y)&&v.nodeType!==ie.DOCUMENT_NODE)throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected node type "+y.nodeType+" for parent node type "+v.nodeType)}function Ut(v,y,R){var Y=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!Ve(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!Ve(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(Y,ot))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(Y,Ee);if(R&&Y.indexOf(ke)<Y.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element");if(!R&&ke)throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can not be appended since element is present")}}function Qt(v,y,R){var Y=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===ie.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,ut))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!bn(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!bn(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(ot(y)){if(e(Y,function(it){return ot(it)&&it!==R}))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(Y,Ee);if(R&&Y.indexOf(ke)<Y.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element")}}function fe(v,y,R,Y){Xt(v,y,R),v.nodeType===ie.DOCUMENT_NODE&&(Y||Ut)(v,y,R);var re=y.parentNode;if(re&&re.removeChild(y),y.nodeType===B){var ae=y.firstChild;if(ae==null)return y;var ke=y.lastChild}else ae=ke=y;var et=R?R.previousSibling:v.lastChild;ae.previousSibling=et,ke.nextSibling=R,et?et.nextSibling=ae:v.firstChild=ae,R==null?v.lastChild=ke:R.previousSibling=ke;do ae.parentNode=v;while(ae!==ke&&(ae=ae.nextSibling));return Oe(v.ownerDocument||v,v,y),y.nodeType==B&&(y.firstChild=y.lastChild=null),y}oe.prototype={implementation:null,nodeName:"#document",nodeType:P,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,y){if(v.nodeType===B){for(var R=v.firstChild;R;){var Y=R.nextSibling;this.insertBefore(R,y),R=Y}return v}return fe(this,v,y),v.ownerDocument=this,this.documentElement===null&&v.nodeType===$&&(this.documentElement=v),v},removeChild:function(v){var y=Fe(this,v);return y===this.documentElement&&(this.documentElement=null),y},replaceChild:function(v,y){fe(this,v,y,Qt),v.ownerDocument=this,y&&this.removeChild(y),Ee(v)&&(this.documentElement=v)},importNode:function(v,y){return xn(this,v,y)},getElementById:function(v){var y=null;return De(this.documentElement,function(R){if(R.nodeType==$&&R.getAttribute("id")==v)return y=R,!0}),y},createElement:function(v){var y=new Le(u);y.ownerDocument=this,this.type==="html"&&(v=v.toLowerCase()),n(this.contentType)&&(y.namespaceURI=c.HTML),y.nodeName=v,y.tagName=v,y.localName=v,y.childNodes=new Z;var R=y.attributes=new ce;return R._ownerElement=y,y},createDocumentFragment:function(){var v=new on(u);return v.ownerDocument=this,v.childNodes=new Z,v},createTextNode:function(v){var y=new Zt(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createComment:function(v){var y=new en(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createCDATASection:function(v){var y=new vn(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createProcessingInstruction:function(v,y){var R=new Vt(u);return R.ownerDocument=this,R.childNodes=new Z,R.nodeName=R.target=v,R.nodeValue=R.data=y,R},createAttribute:function(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in name "'+v+'"');return this.type==="html"&&(v=v.toLowerCase()),this._createAttribute(v)},_createAttribute:function(v){var y=new dt(u);return y.ownerDocument=this,y.childNodes=new Z,y.name=v,y.nodeName=v,y.localName=v,y.specified=!0,y},createEntityReference:function(v){if(!h.Name.test(v))throw new p(p.INVALID_CHARACTER_ERR,'not a valid xml name "'+v+'"');if(this.type==="html")throw new p("document is an html document",f.NotSupportedError);var y=new rn(u);return y.ownerDocument=this,y.childNodes=new Z,y.nodeName=v,y},createElementNS:function(v,y){var R=G(v,y),Y=new Le(u),re=Y.attributes=new ce;return Y.childNodes=new Z,Y.ownerDocument=this,Y.nodeName=y,Y.tagName=y,Y.namespaceURI=R[0],Y.prefix=R[1],Y.localName=R[2],re._ownerElement=Y,Y},createAttributeNS:function(v,y){var R=G(v,y),Y=new dt(u);return Y.ownerDocument=this,Y.childNodes=new Z,Y.nodeName=y,Y.name=y,Y.specified=!0,Y.namespaceURI=R[0],Y.prefix=R[1],Y.localName=R[2],Y}},V(oe,ie);function Le(v){b(v),this._nsMap=Object.create(null)}Le.prototype={nodeType:$,attributes:null,getQualifiedName:function(){return this.prefix?this.prefix+":"+this.localName:this.localName},_isInHTMLDocumentAndNamespace:function(){return this.ownerDocument.type==="html"&&this.namespaceURI===c.HTML},hasAttributes:function(){return!!(this.attributes&&this.attributes.length)},hasAttribute:function(v){return!!this.getAttributeNode(v)},getAttribute:function(v){var y=this.getAttributeNode(v);return y?y.value:null},getAttributeNode:function(v){return this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase()),this.attributes.getNamedItem(v)},setAttribute:function(v,y){this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());var R=this.getAttributeNode(v);R?R.value=R.nodeValue=""+y:(R=this.ownerDocument._createAttribute(v),R.value=R.nodeValue=""+y,this.setAttributeNode(R))},removeAttribute:function(v){var y=this.getAttributeNode(v);y&&this.removeAttributeNode(y)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);R&&this.removeAttributeNode(R)},hasAttributeNS:function(v,y){return this.getAttributeNodeNS(v,y)!=null},getAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);return R?R.value:null},setAttributeNS:function(v,y,R){var Y=G(v,y),re=Y[2],ae=this.getAttributeNodeNS(v,re);ae?ae.value=ae.nodeValue=""+R:(ae=this.ownerDocument.createAttributeNS(v,y),ae.value=ae.nodeValue=""+R,this.setAttributeNode(ae))},getAttributeNodeNS:function(v,y){return this.attributes.getNamedItemNS(v,y)},getElementsByClassName:function(v){var y=_(v);return new X(this,function(R){var Y=[];return y.length>0&&De(R,function(re){if(re!==R&&re.nodeType===$){var ae=re.getAttribute("class");if(ae){var ke=v===ae;if(!ke){var et=_(ae);ke=y.every(A(et))}ke&&Y.push(re)}}}),Y})},getElementsByTagName:function(v){var y=(this.nodeType===P?this:this.ownerDocument).type==="html",R=v.toLowerCase();return new X(this,function(Y){var re=[];return De(Y,function(ae){if(!(ae===Y||ae.nodeType!==$))if(v==="*")re.push(ae);else{var ke=ae.getQualifiedName(),et=y&&ae.namespaceURI===c.HTML?R:v;ke===et&&re.push(ae)}}),re})},getElementsByTagNameNS:function(v,y){return new X(this,function(R){var Y=[];return De(R,function(re){re!==R&&re.nodeType===$&&(v==="*"||re.namespaceURI===v)&&(y==="*"||re.localName==y)&&Y.push(re)}),Y})}},oe.prototype.getElementsByClassName=Le.prototype.getElementsByClassName,oe.prototype.getElementsByTagName=Le.prototype.getElementsByTagName,oe.prototype.getElementsByTagNameNS=Le.prototype.getElementsByTagNameNS,V(Le,ie);function dt(v){b(v),this.namespaceURI=null,this.prefix=null,this.ownerElement=null}dt.prototype.nodeType=W,V(dt,ie);function mt(v){b(v)}mt.prototype={data:"",substringData:function(v,y){return this.data.substring(v,v+y)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,y){this.replaceData(v,0,y)},deleteData:function(v,y){this.replaceData(v,y,"")},replaceData:function(v,y,R){var Y=this.data.substring(0,v),re=this.data.substring(v+y);R=Y+R+re,this.nodeValue=this.data=R,this.length=R.length}},V(mt,ie);function Zt(v){b(v)}Zt.prototype={nodeName:"#text",nodeType:N,splitText:function(v){var y=this.data,R=y.substring(v);y=y.substring(0,v),this.data=this.nodeValue=y,this.length=y.length;var Y=this.ownerDocument.createTextNode(R);return this.parentNode&&this.parentNode.insertBefore(Y,this.nextSibling),Y}},V(Zt,mt);function en(v){b(v)}en.prototype={nodeName:"#comment",nodeType:D},V(en,mt);function vn(v){b(v)}vn.prototype={nodeName:"#cdata-section",nodeType:M},V(vn,Zt);function tn(v){b(v)}tn.prototype.nodeType=H,V(tn,ie);function nn(v){b(v)}nn.prototype.nodeType=z,V(nn,ie);function Ct(v){b(v)}Ct.prototype.nodeType=L,V(Ct,ie);function rn(v){b(v)}rn.prototype.nodeType=T,V(rn,ie);function on(v){b(v)}on.prototype.nodeName="#document-fragment",on.prototype.nodeType=B,V(on,ie);function Vt(v){b(v)}Vt.prototype.nodeType=S,V(Vt,mt);function In(){}In.prototype.serializeToString=function(v,y){return Pe.call(v,y)},ie.prototype.toString=Pe;function Pe(v){var y=[],R=this.nodeType===P&&this.documentElement||this,Y=R.prefix,re=R.namespaceURI;if(re&&Y==null){var Y=R.lookupPrefix(re);if(Y==null)var ae=[{namespace:re,prefix:null}]}return Pt(this,y,v,ae),y.join("")}function Xe(v,y,R){var Y=v.prefix||"",re=v.namespaceURI;if(!re||Y==="xml"&&re===c.XML||re===c.XMLNS)return!1;for(var ae=R.length;ae--;){var ke=R[ae];if(ke.prefix===Y)return ke.namespace!==re}return!0}function Lt(v,y,R){v.push(" ",y,'="',R.replace(/[<>&"\t\n\r]/g,Ce),'"')}function Pt(v,y,R,Y){Y||(Y=[]);var re=v.nodeType===P?v:v.ownerDocument,ae=re.type==="html";if(R)if(v=R(v),v){if(typeof v=="string"){y.push(v);return}}else return;switch(v.nodeType){case $:var ke=v.attributes,et=ke.length,lt=v.firstChild,it=v.tagName,Et=it;if(!ae&&!v.prefix&&v.namespaceURI){for(var pt,We=0;We<ke.length;We++)if(ke.item(We).name==="xmlns"){pt=ke.item(We).value;break}if(!pt)for(var sn=Y.length-1;sn>=0;sn--){var Dt=Y[sn];if(Dt.prefix===""&&Dt.namespace===v.namespaceURI){pt=Dt.namespace;break}}if(pt!==v.namespaceURI)for(var sn=Y.length-1;sn>=0;sn--){var Dt=Y[sn];if(Dt.namespace===v.namespaceURI){Dt.prefix&&(Et=Dt.prefix+":"+it);break}}}y.push("<",Et);for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);Ht.prefix=="xmlns"?Y.push({prefix:Ht.localName,namespace:Ht.value}):Ht.nodeName=="xmlns"&&Y.push({prefix:"",namespace:Ht.value})}for(var yn=0;yn<et;yn++){var Ht=ke.item(yn);if(Xe(Ht,ae,Y)){var _n=Ht.prefix||"",at=Ht.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),Y.push({prefix:_n,namespace:at})}Pt(Ht,y,R,Y)}if(it===Et&&Xe(v,ae,Y)){var _n=v.prefix||"",at=v.namespaceURI;Lt(y,_n?"xmlns:"+_n:"xmlns",at),Y.push({prefix:_n,namespace:at})}var $r=!lt;if($r&&(ae||v.namespaceURI===c.HTML)&&($r=i(it)),$r)y.push("/>");else{if(y.push(">"),ae&&s(it))for(;lt;)lt.data?y.push(lt.data):Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;else for(;lt;)Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;y.push("</",Et,">")}return;case P:case B:for(var lt=v.firstChild;lt;)Pt(lt,y,R,Y.slice()),lt=lt.nextSibling;return;case W:return Lt(y,v.name,v.value);case N:return y.push(v.data.replace(/[<&>]/g,Ce));case M:return y.push(h.CDATA_START,v.data,h.CDATA_END);case D:return y.push(h.COMMENT_START,v.data,h.COMMENT_END);case H:var _o=v.publicId,Ln=v.systemId;y.push(h.DOCTYPE_DECL_START," ",v.name),_o?(y.push(" ",h.PUBLIC," ",_o),Ln&&Ln!=="."&&y.push(" ",Ln)):Ln&&Ln!=="."&&y.push(" ",h.SYSTEM," ",Ln),v.internalSubset&&y.push(" [",v.internalSubset,"]"),y.push(">");return;case S:return y.push("<?",v.target," ",v.data,"?>");case T:return y.push("&",v.nodeName,";");default:y.push("??",v.nodeName)}}function xn(v,y,R){var Y;switch(y.nodeType){case $:Y=y.cloneNode(!1),Y.ownerDocument=v;case B:break;case W:R=!0;break}if(Y||(Y=y.cloneNode(!1)),Y.ownerDocument=v,Y.parentNode=null,R)for(var re=y.firstChild;re;)Y.appendChild(xn(v,re,R)),re=re.nextSibling;return Y}function hr(v,y,R){var Y=new y.constructor(u);for(var re in y)if(r(y,re)){var ae=y[re];typeof ae!="object"&&ae!=Y[re]&&(Y[re]=ae)}switch(y.childNodes&&(Y.childNodes=new Z),Y.ownerDocument=v,Y.nodeType){case $:var ke=y.attributes,et=Y.attributes=new ce,it=ke.length;et._ownerElement=Y;for(var Et=0;Et<it;Et++)Y.setAttributeNode(hr(v,ke.item(Et),!0));break;case W:R=!0}if(R)for(var pt=y.firstChild;pt;)Y.appendChild(hr(v,pt,R)),pt=pt.nextSibling;return Y}function dn(v,y,R){v[y]=R}try{if(Object.defineProperty){let v=function(y){switch(y.nodeType){case $:case B:var R=[];for(y=y.firstChild;y;)y.nodeType!==7&&y.nodeType!==8&&R.push(v(y)),y=y.nextSibling;return R.join("");default:return y.nodeValue}};Object.defineProperty(X.prototype,"length",{get:function(){return le(this),this.$$length}}),Object.defineProperty(ie.prototype,"textContent",{get:function(){return v(this)},set:function(y){switch(this.nodeType){case $:case B:for(;this.firstChild;)this.removeChild(this.firstChild);(y||String(y))&&this.appendChild(this.ownerDocument.createTextNode(y));break;default:this.data=y,this.value=y,this.nodeValue=y}}}),dn=function(y,R,Y){y["$$"+R]=Y}}}catch{}return tt._updateLiveList=le,tt.Attr=dt,tt.CDATASection=vn,tt.CharacterData=mt,tt.Comment=en,tt.Document=oe,tt.DocumentFragment=on,tt.DocumentType=tn,tt.DOMImplementation=we,tt.Element=Le,tt.Entity=Ct,tt.EntityReference=rn,tt.LiveNodeList=X,tt.NamedNodeMap=ce,tt.Node=ie,tt.NodeList=Z,tt.Notation=nn,tt.Text=Zt,tt.ProcessingInstruction=Vt,tt.XMLSerializer=In,tt}var Ur={},fl={},gd;function hv(){return gd||(gd=1,function(t){var e=rs().freeze;t.XML_ENTITIES=e({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),t.HTML_ENTITIES=e({Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",Gt:"≫",GT:">",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬",int:"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",Lt:"≪",LT:"<",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}),t.entityMap=t.HTML_ENTITIES}(fl)),fl}var vs={},bd;function wv(){if(bd)return vs;bd=1;var t=rs(),e=jh(),n=Sa(),r=t.isHTMLEscapableRawTextElement,o=t.isHTMLMimeType,s=t.isHTMLRawTextElement,i=t.hasOwn,a=t.NAMESPACE,c=n.ParseError,u=n.DOMException,d=0,p=1,f=2,h=3,b=4,x=5,C=6,E=7;function _(){}_.prototype={parse:function(S,D,P){var H=this.domBuilder;H.startDocument(),$(D,D=Object.create(null)),j(S,D,P,H,this.errorHandler),H.endDocument()}};var A=/&#?\w+;?/g;function j(S,D,P,H,B){var z=o(H.mimeType);S.indexOf(e.UNICODE_REPLACEMENT_CHARACTER)>=0&&B.warning("Unicode replacement character detected, source encoding issues?");function J(fe){if(fe>65535){fe-=65536;var Le=55296+(fe>>10),dt=56320+(fe&1023);return String.fromCharCode(Le,dt)}else return String.fromCharCode(fe)}function ee(fe){var Le=fe[fe.length-1]===";"?fe:fe+";";if(!z&&Le!==fe)return B.error("EntityRef: expecting ;"),fe;var dt=e.Reference.exec(Le);if(!dt||dt[0].length!==Le.length)return B.error("entity not matching Reference production: "+fe),fe;var mt=Le.slice(1,-1);return i(P,mt)?P[mt]:mt.charAt(0)==="#"?J(parseInt(mt.substring(1).replace("x","0x"))):(B.error("entity not found:"+fe),fe)}function te(fe){if(fe>we){var Le=S.substring(we,fe).replace(A,ee);ce&&ue(we),H.characters(Le,0,fe-we),we=fe}}var Z=0,X=0,le=/\r\n?|\n|$/g,ce=H.locator;function ue(fe,Le){for(;fe>=X&&(Le=le.exec(S));)Z=X,X=Le.index+Le[0].length,ce.lineNumber++;ce.columnNumber=fe-Z+1}for(var me=[{currentNSMap:D}],he=[],we=0;;){try{var ie=S.indexOf("<",we);if(ie<0){if(!z&&he.length>0)return B.fatalError("unclosed xml tag(s): "+he.join(", "));if(!S.substring(we).match(/^\s*$/)){var Ce=H.doc,De=Ce.createTextNode(S.substring(we));if(Ce.documentElement)return B.error("Extra content at the end of the document");Ce.appendChild(De),H.currentElement=De}return}if(ie>we){var oe=S.substring(we,ie);!z&&he.length===0&&(oe=oe.replace(new RegExp(e.S_OPT.source,"g"),""),oe&&B.error("Unexpected content outside root element: '"+oe+"'")),te(ie)}switch(S.charAt(ie+1)){case"/":var Ve=S.indexOf(">",ie+2),be=S.substring(ie+2,Ve>0?Ve:void 0);if(!be)return B.fatalError("end tag name missing");var Ne=Ve>0&&e.reg("^",e.QName_group,e.S_OPT,"$").exec(be);if(!Ne)return B.fatalError('end tag name contains invalid characters: "'+be+'"');if(!H.currentElement&&!H.doc.documentElement)return;var Oe=he[he.length-1]||H.currentElement.tagName||H.doc.documentElement.tagName||"";if(Oe!==Ne[1]){var Fe=Ne[1].toLowerCase();if(!z||Oe.toLowerCase()!==Fe)return B.fatalError('Opening and ending tag mismatch: "'+Oe+'" != "'+be+'"')}var Ze=me.pop();he.pop();var Je=Ze.localNSMap;if(H.endElement(Ze.uri,Ze.localName,Oe),Je)for(var ot in Je)i(Je,ot)&&H.endPrefixMapping(ot);Ve++;break;case"?":ce&&ue(ie),Ve=T(S,ie,H,B);break;case"!":ce&&ue(ie),Ve=M(S,ie,H,B,z);break;default:ce&&ue(ie);var Ee=new L,ut=me[me.length-1].currentNSMap,Ve=O(S,ie,Ee,ut,ee,B,z),bn=Ee.length;if(Ee.closed||(z&&t.isHTMLVoidElement(Ee.tagName)?Ee.closed=!0:he.push(Ee.tagName)),ce&&bn){for(var Xt=G(ce,{}),Ut=0;Ut<bn;Ut++){var Qt=Ee[Ut];ue(Qt.offset),Qt.locator=G(ce,{})}H.locator=Xt,V(Ee,H,ut)&&me.push(Ee),H.locator=ce}else V(Ee,H,ut)&&me.push(Ee);z&&!Ee.closed?Ve=F(S,Ve,Ee.tagName,ee,H):Ve++}}catch(fe){if(fe instanceof c)throw fe;if(fe instanceof u)throw new c(fe.name+": "+fe.message,H.locator,fe);B.error("element parse error: "+fe),Ve=-1}Ve>we?we=Ve:te(Math.max(ie,we)+1)}}function G(S,D){return D.lineNumber=S.lineNumber,D.columnNumber=S.columnNumber,D}function O(S,D,P,H,B,z,J){function ee(ue,me,he){if(i(P.attributeNames,ue))return z.fatalError("Attribute "+ue+" redefined");if(!J&&me.indexOf("<")>=0)return z.fatalError("Unescaped '<' not allowed in attributes values");P.addValue(ue,me.replace(/[\t\n\r]/g," ").replace(A,B),he)}for(var te,Z,X=++D,le=d;;){var ce=S.charAt(X);switch(ce){case"=":if(le===p)te=S.slice(D,X),le=h;else if(le===f)le=h;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(le===h||le===p)if(le===p&&(z.warning('attribute value must after "="'),te=S.slice(D,X)),D=X+1,X=S.indexOf(ce,D),X>0)Z=S.slice(D,X),ee(te,Z,D-1),le=x;else throw new Error("attribute value no end '"+ce+"' match");else if(le==b)Z=S.slice(D,X),ee(te,Z,D),z.warning('attribute "'+te+'" missed start quot('+ce+")!!"),D=X+1,le=x;else throw new Error('attribute value must after "="');break;case"/":switch(le){case d:P.setTagName(S.slice(D,X));case x:case C:case E:le=E,P.closed=!0;case b:case p:break;case f:P.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return z.error("unexpected end of input"),le==d&&P.setTagName(S.slice(D,X)),X;case">":switch(le){case d:P.setTagName(S.slice(D,X));case x:case C:case E:break;case b:case p:Z=S.slice(D,X),Z.slice(-1)==="/"&&(P.closed=!0,Z=Z.slice(0,-1));case f:le===f&&(Z=te),le==b?(z.warning('attribute "'+Z+'" missed quot(")!'),ee(te,Z,D)):(J||z.warning('attribute "'+Z+'" missed value!! "'+Z+'" instead!!'),ee(Z,Z,D));break;case h:if(!J)return z.fatalError(`AttValue: ' or " expected`)}return X;case"":ce=" ";default:if(ce<=" ")switch(le){case d:P.setTagName(S.slice(D,X)),le=C;break;case p:te=S.slice(D,X),le=f;break;case b:var Z=S.slice(D,X);z.warning('attribute "'+Z+'" missed quot(")!!'),ee(te,Z,D);case x:le=C;break}else switch(le){case f:J||z.warning('attribute "'+te+'" missed value!! "'+te+'" instead2!!'),ee(te,te,D),D=X,le=p;break;case x:z.warning('attribute space is required"'+te+'"!!');case C:le=p,D=X;break;case h:le=b,D=X;break;case E:throw new Error("elements closed character '/' and '>' must be connected to")}}X++}}function V(S,D,P){for(var H=S.tagName,B=null,le=S.length;le--;){var z=S[le],J=z.qName,ee=z.value,ce=J.indexOf(":");if(ce>0)var te=z.prefix=J.slice(0,ce),Z=J.slice(ce+1),X=te==="xmlns"&&Z;else Z=J,te=null,X=J==="xmlns"&&"";z.localName=Z,X!==!1&&(B==null&&(B=Object.create(null),$(P,P=Object.create(null))),P[X]=B[X]=ee,z.uri=a.XMLNS,D.startPrefixMapping(X,ee))}for(var le=S.length;le--;)z=S[le],z.prefix&&(z.prefix==="xml"&&(z.uri=a.XML),z.prefix!=="xmlns"&&(z.uri=P[z.prefix]));var ce=H.indexOf(":");ce>0?(te=S.prefix=H.slice(0,ce),Z=S.localName=H.slice(ce+1)):(te=null,Z=S.localName=H);var ue=S.uri=P[te||""];if(D.startElement(ue,Z,H,S),S.closed){if(D.endElement(ue,Z,H),B)for(te in B)i(B,te)&&D.endPrefixMapping(te)}else return S.currentNSMap=P,S.localNSMap=B,!0}function F(S,D,P,H,B){var z=r(P);if(z||s(P)){var J=S.indexOf("</"+P+">",D),ee=S.substring(D+1,J);return z&&(ee=ee.replace(A,H)),B.characters(ee,0,ee.length),J}return D+1}function $(S,D){for(var P in S)i(S,P)&&(D[P]=S[P])}function W(S,D){var P=D;function H(X){return X=X||0,S.charAt(P+X)}function B(X){X=X||1,P+=X}function z(){for(var X=0;P<S.length;){var le=H();if(le!==" "&&le!==`
`&&le!=="	"&&le!=="\r")return X;X++,B()}return-1}function J(){return S.substring(P)}function ee(X){return S.substring(P,P+X.length)===X}function te(X){return S.substring(P,P+X.length).toUpperCase()===X.toUpperCase()}function Z(X){var le=e.reg("^",X),ce=le.exec(J());return ce?(B(ce[0].length),ce[0]):null}return{char:H,getIndex:function(){return P},getMatch:Z,getSource:function(){return S},skip:B,skipBlanks:z,substringFromIndex:J,substringStartsWith:ee,substringStartsWithCaseInsensitive:te}}function N(S,D){function P(ee,te){var Z=e.PI.exec(ee.substringFromIndex());return Z?Z[1].toLowerCase()==="xml"?te.fatalError("xml declaration is only allowed at the start of the document, but found at position "+ee.getIndex()):(ee.skip(Z[0].length),Z[0]):te.fatalError("processing instruction is not well-formed at position "+ee.getIndex())}var H=S.getSource();if(S.char()==="["){S.skip(1);for(var B=S.getIndex();S.getIndex()<H.length;){if(S.skipBlanks(),S.char()==="]"){var z=H.substring(B,S.getIndex());return S.skip(1),z}var J=null;if(S.char()==="<"&&S.char(1)==="!")switch(S.char(2)){case"E":S.char(3)==="L"?J=S.getMatch(e.elementdecl):S.char(3)==="N"&&(J=S.getMatch(e.EntityDecl));break;case"A":J=S.getMatch(e.AttlistDecl);break;case"N":J=S.getMatch(e.NotationDecl);break;case"-":J=S.getMatch(e.Comment);break}else if(S.char()==="<"&&S.char(1)==="?")J=P(S,D);else if(S.char()==="%")J=S.getMatch(e.PEReference);else return D.fatalError("Error detected in Markup declaration");if(!J)return D.fatalError("Error in internal subset at position "+S.getIndex())}return D.fatalError("doctype internal subset is not well-formed, missing ]")}}function M(S,D,P,H,B){var z=W(S,D);switch(B?z.char(2).toUpperCase():z.char(2)){case"-":var J=z.getMatch(e.Comment);return J?(P.comment(J,e.COMMENT_START.length,J.length-e.COMMENT_START.length-e.COMMENT_END.length),z.getIndex()):H.fatalError("comment is not well-formed at position "+z.getIndex());case"[":var ee=z.getMatch(e.CDSect);return ee?!B&&!P.currentElement?H.fatalError("CDATA outside of element"):(P.startCDATA(),P.characters(ee,e.CDATA_START.length,ee.length-e.CDATA_START.length-e.CDATA_END.length),P.endCDATA(),z.getIndex()):H.fatalError("Invalid CDATA starting at position "+D);case"D":{if(P.doc&&P.doc.documentElement)return H.fatalError("Doctype not allowed inside or after documentElement at position "+z.getIndex());if(B?!z.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START):!z.substringStartsWith(e.DOCTYPE_DECL_START))return H.fatalError("Expected "+e.DOCTYPE_DECL_START+" at position "+z.getIndex());if(z.skip(e.DOCTYPE_DECL_START.length),z.skipBlanks()<1)return H.fatalError("Expected whitespace after "+e.DOCTYPE_DECL_START+" at position "+z.getIndex());var te={name:void 0,publicId:void 0,systemId:void 0,internalSubset:void 0};if(te.name=z.getMatch(e.Name),!te.name)return H.fatalError("doctype name missing or contains unexpected characters at position "+z.getIndex());if(B&&te.name.toLowerCase()!=="html"&&H.warning("Unexpected DOCTYPE in HTML document at position "+z.getIndex()),z.skipBlanks(),z.substringStartsWith(e.PUBLIC)||z.substringStartsWith(e.SYSTEM)){var Z=e.ExternalID_match.exec(z.substringFromIndex());if(!Z)return H.fatalError("doctype external id is not well-formed at position "+z.getIndex());Z.groups.SystemLiteralOnly!==void 0?te.systemId=Z.groups.SystemLiteralOnly:(te.systemId=Z.groups.SystemLiteral,te.publicId=Z.groups.PubidLiteral),z.skip(Z[0].length)}else if(B&&z.substringStartsWithCaseInsensitive(e.SYSTEM)){if(z.skip(e.SYSTEM.length),z.skipBlanks()<1)return H.fatalError("Expected whitespace after "+e.SYSTEM+" at position "+z.getIndex());if(te.systemId=z.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral),!te.systemId)return H.fatalError("Expected "+e.ABOUT_LEGACY_COMPAT+" in single or double quotes after "+e.SYSTEM+" at position "+z.getIndex())}return B&&te.systemId&&!e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(te.systemId)&&H.warning("Unexpected doctype.systemId in HTML document at position "+z.getIndex()),B||(z.skipBlanks(),te.internalSubset=N(z,H)),z.skipBlanks(),z.char()!==">"?H.fatalError("doctype not terminated with > at position "+z.getIndex()):(z.skip(1),P.startDTD(te.name,te.publicId,te.systemId,te.internalSubset),P.endDTD(),z.getIndex())}default:return H.fatalError('Not well-formed XML starting with "<!" at position '+D)}}function T(S,D,P,H){var B=S.substring(D).match(e.PI);if(!B)return H.fatalError("Invalid processing instruction starting at position "+D);if(B[1].toLowerCase()==="xml"){if(D>0)return H.fatalError("processing instruction at position "+D+" is an xml declaration which is only at the start of the document");if(!e.XMLDecl.test(S.substring(D)))return H.fatalError("xml declaration is not well-formed")}return P.processingInstruction(B[1],B[2]),D+B[0].length}function L(){this.attributeNames=Object.create(null)}return L.prototype={setTagName:function(S){if(!e.QName_exact.test(S))throw new Error("invalid tagName:"+S);this.tagName=S},addValue:function(S,D,P){if(!e.QName_exact.test(S))throw new Error("invalid attribute:"+S);this.attributeNames[S]=this.length,this[this.length++]={qName:S,value:D,offset:P}},length:0,getLocalName:function(S){return this[S].localName},getLocator:function(S){return this[S].locator},getQName:function(S){return this[S].qName},getURI:function(S){return this[S].uri},getValue:function(S){return this[S].value}},vs.XMLReader=_,vs.parseUtils=W,vs.parseDoctypeCommentOrCData=M,vs}var vd;function mv(){if(vd)return Ur;vd=1;var t=rs(),e=Ih(),n=Sa(),r=hv(),o=wv(),s=e.DOMImplementation,i=t.hasDefaultHTMLNamespace,a=t.isHTMLMimeType,c=t.isValidMimeType,u=t.MIME_TYPE,d=t.NAMESPACE,p=n.ParseError,f=o.XMLReader;function h(O){return O.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028\u2029]/g,`
`)}function b(O){if(O=O||{},O.locator===void 0&&(O.locator=!0),this.assign=O.assign||t.assign,this.domHandler=O.domHandler||x,this.onError=O.onError||O.errorHandler,O.errorHandler&&typeof O.errorHandler!="function")throw new TypeError("errorHandler object is no longer supported, switch to onError!");O.errorHandler&&O.errorHandler("warning","The `errorHandler` option has been deprecated, use `onError` instead!",this),this.normalizeLineEndings=O.normalizeLineEndings||h,this.locator=!!O.locator,this.xmlns=this.assign(Object.create(null),O.xmlns)}b.prototype.parseFromString=function(O,V){if(!c(V))throw new TypeError('DOMParser.parseFromString: the provided mimeType "'+V+'" is not valid.');var F=this.assign(Object.create(null),this.xmlns),$=r.XML_ENTITIES,W=F[""]||null;i(V)?($=r.HTML_ENTITIES,W=d.HTML):V===u.XML_SVG_IMAGE&&(W=d.SVG),F[""]=W,F.xml=F.xml||d.XML;var N=new this.domHandler({mimeType:V,defaultNamespace:W,onError:this.onError}),M=this.locator?{}:void 0;this.locator&&N.setDocumentLocator(M);var T=new f;T.errorHandler=N,T.domBuilder=N;var L=!t.isHTMLMimeType(V);return L&&typeof O!="string"&&T.errorHandler.fatalError("source is not a string"),T.parse(this.normalizeLineEndings(String(O)),F,$),N.doc.documentElement||T.errorHandler.fatalError("missing root element"),N.doc};function x(O){var V=O||{};this.mimeType=V.mimeType||u.XML_APPLICATION,this.defaultNamespace=V.defaultNamespace||null,this.cdata=!1,this.currentElement=void 0,this.doc=void 0,this.locator=void 0,this.onError=V.onError}function C(O,V){V.lineNumber=O.lineNumber,V.columnNumber=O.columnNumber}x.prototype={startDocument:function(){var O=new s;this.doc=a(this.mimeType)?O.createHTMLDocument(!1):O.createDocument(this.defaultNamespace,"")},startElement:function(O,V,F,$){var W=this.doc,N=W.createElementNS(O,F||V),M=$.length;A(this,N),this.currentElement=N,this.locator&&C(this.locator,N);for(var T=0;T<M;T++){var O=$.getURI(T),L=$.getValue(T),F=$.getQName(T),S=W.createAttributeNS(O,F);this.locator&&C($.getLocator(T),S),S.value=S.nodeValue=L,N.setAttributeNode(S)}},endElement:function(O,V,F){this.currentElement=this.currentElement.parentNode},startPrefixMapping:function(O,V){},endPrefixMapping:function(O){},processingInstruction:function(O,V){var F=this.doc.createProcessingInstruction(O,V);this.locator&&C(this.locator,F),A(this,F)},ignorableWhitespace:function(O,V,F){},characters:function(O,V,F){if(O=_.apply(this,arguments),O){if(this.cdata)var $=this.doc.createCDATASection(O);else var $=this.doc.createTextNode(O);this.currentElement?this.currentElement.appendChild($):/^\s*$/.test(O)&&this.doc.appendChild($),this.locator&&C(this.locator,$)}},skippedEntity:function(O){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(O){O&&(O.lineNumber=0),this.locator=O},comment:function(O,V,F){O=_.apply(this,arguments);var $=this.doc.createComment(O);this.locator&&C(this.locator,$),A(this,$)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(O,V,F,$){var W=this.doc.implementation;if(W&&W.createDocumentType){var N=W.createDocumentType(O,V,F,$);this.locator&&C(this.locator,N),A(this,N),this.doc.doctype=N}},reportError:function(O,V){if(typeof this.onError=="function")try{this.onError(O,V,this)}catch(F){throw new p("Reporting "+O+' "'+V+'" caused '+F,this.locator)}else console.error("[xmldom "+O+"]	"+V,E(this.locator))},warning:function(O){this.reportError("warning",O)},error:function(O){this.reportError("error",O)},fatalError:function(O){throw this.reportError("fatalError",O),new p(O,this.locator)}};function E(O){if(O)return`
@#[line:`+O.lineNumber+",col:"+O.columnNumber+"]"}function _(O,V,F){return typeof O=="string"?O.substr(V,F):O.length>=V+F||V?new java.lang.String(O,V,F)+"":O}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(O){x.prototype[O]=function(){return null}});function A(O,V){O.currentElement?O.currentElement.appendChild(V):O.doc.appendChild(V)}function j(O){if(O==="error")throw"onErrorStopParsing"}function G(){throw"onWarningStopParsing"}return Ur.__DOMHandler=x,Ur.DOMParser=b,Ur.normalizeLineEndings=h,Ur.onErrorStopParsing=j,Ur.onWarningStopParsing=G,Ur}var xd;function gv(){if(xd)return Ae;xd=1;var t=rs();Ae.assign=t.assign,Ae.hasDefaultHTMLNamespace=t.hasDefaultHTMLNamespace,Ae.isHTMLMimeType=t.isHTMLMimeType,Ae.isValidMimeType=t.isValidMimeType,Ae.MIME_TYPE=t.MIME_TYPE,Ae.NAMESPACE=t.NAMESPACE;var e=Sa();Ae.DOMException=e.DOMException,Ae.DOMExceptionName=e.DOMExceptionName,Ae.ExceptionCode=e.ExceptionCode,Ae.ParseError=e.ParseError;var n=Ih();Ae.Attr=n.Attr,Ae.CDATASection=n.CDATASection,Ae.CharacterData=n.CharacterData,Ae.Comment=n.Comment,Ae.Document=n.Document,Ae.DocumentFragment=n.DocumentFragment,Ae.DocumentType=n.DocumentType,Ae.DOMImplementation=n.DOMImplementation,Ae.Element=n.Element,Ae.Entity=n.Entity,Ae.EntityReference=n.EntityReference,Ae.LiveNodeList=n.LiveNodeList,Ae.NamedNodeMap=n.NamedNodeMap,Ae.Node=n.Node,Ae.NodeList=n.NodeList,Ae.Notation=n.Notation,Ae.ProcessingInstruction=n.ProcessingInstruction,Ae.Text=n.Text,Ae.XMLSerializer=n.XMLSerializer;var r=mv();return Ae.DOMParser=r.DOMParser,Ae.normalizeLineEndings=r.normalizeLineEndings,Ae.onErrorStopParsing=r.onErrorStopParsing,Ae.onWarningStopParsing=r.onWarningStopParsing,Ae}gv();const js="USJ",Is="3.1",Gc=Object.freeze({type:js,version:Is,content:[]}),bv=["type","marker","content","sid","eid","number","code","altnumber","pubnumber","caller","align","category"];function vv(t){return xv.includes(t)}const xv=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","EZA","5EZ","6EZ","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX","XXA","XXB","XXC","XXD","XXE","XXF","XXG"],Gl="$",Lh=".content[";function yv(t){const e=t.split(Lh);if(e.shift()!==Gl)throw new Error(`indexesFromJsonPath: jsonPath didn't start with '${Gl}'`);return e.map(n=>parseInt(n,10))}function _v(t){return t.reduce((e,n)=>`${e}${Lh}${n}]`,Gl)}var Ti={exports:{}},hl,yd;function Cv(){if(yd)return hl;yd=1;var t=-1,e=1,n=0;function r(N,M,T,L,S){if(N===M)return N?[[n,N]]:[];if(T!=null){var D=$(N,M,T);if(D)return D}var P=a(N,M),H=N.substring(0,P);N=N.substring(P),M=M.substring(P),P=u(N,M);var B=N.substring(N.length-P);N=N.substring(0,N.length-P),M=M.substring(0,M.length-P);var z=o(N,M);return H&&z.unshift([n,H]),B&&z.push([n,B]),_(z,S),L&&p(z),z}function o(N,M){var T;if(!N)return[[e,M]];if(!M)return[[t,N]];var L=N.length>M.length?N:M,S=N.length>M.length?M:N,D=L.indexOf(S);if(D!==-1)return T=[[e,L.substring(0,D)],[n,S],[e,L.substring(D+S.length)]],N.length>M.length&&(T[0][0]=T[2][0]=t),T;if(S.length===1)return[[t,N],[e,M]];var P=d(N,M);if(P){var H=P[0],B=P[1],z=P[2],J=P[3],ee=P[4],te=r(H,z),Z=r(B,J);return te.concat([[n,ee]],Z)}return s(N,M)}function s(N,M){for(var T=N.length,L=M.length,S=Math.ceil((T+L)/2),D=S,P=2*S,H=new Array(P),B=new Array(P),z=0;z<P;z++)H[z]=-1,B[z]=-1;H[D+1]=0,B[D+1]=0;for(var J=T-L,ee=J%2!==0,te=0,Z=0,X=0,le=0,ce=0;ce<S;ce++){for(var ue=-ce+te;ue<=ce-Z;ue+=2){var me=D+ue,he;ue===-ce||ue!==ce&&H[me-1]<H[me+1]?he=H[me+1]:he=H[me-1]+1;for(var we=he-ue;he<T&&we<L&&N.charAt(he)===M.charAt(we);)he++,we++;if(H[me]=he,he>T)Z+=2;else if(we>L)te+=2;else if(ee){var ie=D+J-ue;if(ie>=0&&ie<P&&B[ie]!==-1){var Ce=T-B[ie];if(he>=Ce)return i(N,M,he,we)}}}for(var De=-ce+X;De<=ce-le;De+=2){var ie=D+De,Ce;De===-ce||De!==ce&&B[ie-1]<B[ie+1]?Ce=B[ie+1]:Ce=B[ie-1]+1;for(var oe=Ce-De;Ce<T&&oe<L&&N.charAt(T-Ce-1)===M.charAt(L-oe-1);)Ce++,oe++;if(B[ie]=Ce,Ce>T)le+=2;else if(oe>L)X+=2;else if(!ee){var me=D+J-De;if(me>=0&&me<P&&H[me]!==-1){var he=H[me],we=D+he-me;if(Ce=T-Ce,he>=Ce)return i(N,M,he,we)}}}}return[[t,N],[e,M]]}function i(N,M,T,L){var S=N.substring(0,T),D=M.substring(0,L),P=N.substring(T),H=M.substring(L),B=r(S,D),z=r(P,H);return B.concat(z)}function a(N,M){if(!N||!M||N.charAt(0)!==M.charAt(0))return 0;for(var T=0,L=Math.min(N.length,M.length),S=L,D=0;T<S;)N.substring(D,S)==M.substring(D,S)?(T=S,D=T):L=S,S=Math.floor((L-T)/2+T);return A(N.charCodeAt(S-1))&&S--,S}function c(N,M){var T=N.length,L=M.length;if(T==0||L==0)return 0;T>L?N=N.substring(T-L):T<L&&(M=M.substring(0,T));var S=Math.min(T,L);if(N==M)return S;for(var D=0,P=1;;){var H=N.substring(S-P),B=M.indexOf(H);if(B==-1)return D;P+=B,(B==0||N.substring(S-P)==M.substring(0,P))&&(D=P,P++)}}function u(N,M){if(!N||!M||N.slice(-1)!==M.slice(-1))return 0;for(var T=0,L=Math.min(N.length,M.length),S=L,D=0;T<S;)N.substring(N.length-S,N.length-D)==M.substring(M.length-S,M.length-D)?(T=S,D=T):L=S,S=Math.floor((L-T)/2+T);return j(N.charCodeAt(N.length-S))&&S--,S}function d(N,M){var T=N.length>M.length?N:M,L=N.length>M.length?M:N;if(T.length<4||L.length*2<T.length)return null;function S(Z,X,le){for(var ce=Z.substring(le,le+Math.floor(Z.length/4)),ue=-1,me="",he,we,ie,Ce;(ue=X.indexOf(ce,ue+1))!==-1;){var De=a(Z.substring(le),X.substring(ue)),oe=u(Z.substring(0,le),X.substring(0,ue));me.length<oe+De&&(me=X.substring(ue-oe,ue)+X.substring(ue,ue+De),he=Z.substring(0,le-oe),we=Z.substring(le+De),ie=X.substring(0,ue-oe),Ce=X.substring(ue+De))}return me.length*2>=Z.length?[he,we,ie,Ce,me]:null}var D=S(T,L,Math.ceil(T.length/4)),P=S(T,L,Math.ceil(T.length/2)),H;if(!D&&!P)return null;P?D?H=D[4].length>P[4].length?D:P:H=P:H=D;var B,z,J,ee;N.length>M.length?(B=H[0],z=H[1],J=H[2],ee=H[3]):(J=H[0],ee=H[1],B=H[2],z=H[3]);var te=H[4];return[B,z,J,ee,te]}function p(N){for(var M=!1,T=[],L=0,S=null,D=0,P=0,H=0,B=0,z=0;D<N.length;)N[D][0]==n?(T[L++]=D,P=B,H=z,B=0,z=0,S=N[D][1]):(N[D][0]==e?B+=N[D][1].length:z+=N[D][1].length,S&&S.length<=Math.max(P,H)&&S.length<=Math.max(B,z)&&(N.splice(T[L-1],0,[t,S]),N[T[L-1]+1][0]=e,L--,L--,D=L>0?T[L-1]:-1,P=0,H=0,B=0,z=0,S=null,M=!0)),D++;for(M&&_(N),E(N),D=1;D<N.length;){if(N[D-1][0]==t&&N[D][0]==e){var J=N[D-1][1],ee=N[D][1],te=c(J,ee),Z=c(ee,J);te>=Z?(te>=J.length/2||te>=ee.length/2)&&(N.splice(D,0,[n,ee.substring(0,te)]),N[D-1][1]=J.substring(0,J.length-te),N[D+1][1]=ee.substring(te),D++):(Z>=J.length/2||Z>=ee.length/2)&&(N.splice(D,0,[n,J.substring(0,Z)]),N[D-1][0]=e,N[D-1][1]=ee.substring(0,ee.length-Z),N[D+1][0]=t,N[D+1][1]=J.substring(Z),D++),D++}D++}}var f=/[^a-zA-Z0-9]/,h=/\s/,b=/[\r\n]/,x=/\n\r?\n$/,C=/^\r?\n\r?\n/;function E(N){function M(Z,X){if(!Z||!X)return 6;var le=Z.charAt(Z.length-1),ce=X.charAt(0),ue=le.match(f),me=ce.match(f),he=ue&&le.match(h),we=me&&ce.match(h),ie=he&&le.match(b),Ce=we&&ce.match(b),De=ie&&Z.match(x),oe=Ce&&X.match(C);return De||oe?5:ie||Ce?4:ue&&!he&&we?3:he||we?2:ue||me?1:0}for(var T=1;T<N.length-1;){if(N[T-1][0]==n&&N[T+1][0]==n){var L=N[T-1][1],S=N[T][1],D=N[T+1][1],P=u(L,S);if(P){var H=S.substring(S.length-P);L=L.substring(0,L.length-P),S=H+S.substring(0,S.length-P),D=H+D}for(var B=L,z=S,J=D,ee=M(L,S)+M(S,D);S.charAt(0)===D.charAt(0);){L+=S.charAt(0),S=S.substring(1)+D.charAt(0),D=D.substring(1);var te=M(L,S)+M(S,D);te>=ee&&(ee=te,B=L,z=S,J=D)}N[T-1][1]!=B&&(B?N[T-1][1]=B:(N.splice(T-1,1),T--),N[T][1]=z,J?N[T+1][1]=J:(N.splice(T+1,1),T--))}T++}}function _(N,M){N.push([n,""]);for(var T=0,L=0,S=0,D="",P="",H;T<N.length;){if(T<N.length-1&&!N[T][1]){N.splice(T,1);continue}switch(N[T][0]){case e:S++,P+=N[T][1],T++;break;case t:L++,D+=N[T][1],T++;break;case n:var B=T-S-L-1;if(M){if(B>=0&&O(N[B][1])){var z=N[B][1].slice(-1);if(N[B][1]=N[B][1].slice(0,-1),D=z+D,P=z+P,!N[B][1]){N.splice(B,1),T--;var J=B-1;N[J]&&N[J][0]===e&&(S++,P=N[J][1]+P,J--),N[J]&&N[J][0]===t&&(L++,D=N[J][1]+D,J--),B=J}}if(G(N[T][1])){var z=N[T][1].charAt(0);N[T][1]=N[T][1].slice(1),D+=z,P+=z}}if(T<N.length-1&&!N[T][1]){N.splice(T,1);break}if(D.length>0||P.length>0){D.length>0&&P.length>0&&(H=a(P,D),H!==0&&(B>=0?N[B][1]+=P.substring(0,H):(N.splice(0,0,[n,P.substring(0,H)]),T++),P=P.substring(H),D=D.substring(H)),H=u(P,D),H!==0&&(N[T][1]=P.substring(P.length-H)+N[T][1],P=P.substring(0,P.length-H),D=D.substring(0,D.length-H)));var ee=S+L;D.length===0&&P.length===0?(N.splice(T-ee,ee),T=T-ee):D.length===0?(N.splice(T-ee,ee,[e,P]),T=T-ee+1):P.length===0?(N.splice(T-ee,ee,[t,D]),T=T-ee+1):(N.splice(T-ee,ee,[t,D],[e,P]),T=T-ee+2)}T!==0&&N[T-1][0]===n?(N[T-1][1]+=N[T][1],N.splice(T,1)):T++,S=0,L=0,D="",P="";break}}N[N.length-1][1]===""&&N.pop();var te=!1;for(T=1;T<N.length-1;)N[T-1][0]===n&&N[T+1][0]===n&&(N[T][1].substring(N[T][1].length-N[T-1][1].length)===N[T-1][1]?(N[T][1]=N[T-1][1]+N[T][1].substring(0,N[T][1].length-N[T-1][1].length),N[T+1][1]=N[T-1][1]+N[T+1][1],N.splice(T-1,1),te=!0):N[T][1].substring(0,N[T+1][1].length)==N[T+1][1]&&(N[T-1][1]+=N[T+1][1],N[T][1]=N[T][1].substring(N[T+1][1].length)+N[T+1][1],N.splice(T+1,1),te=!0)),T++;te&&_(N,M)}function A(N){return N>=55296&&N<=56319}function j(N){return N>=56320&&N<=57343}function G(N){return j(N.charCodeAt(0))}function O(N){return A(N.charCodeAt(N.length-1))}function V(N){for(var M=[],T=0;T<N.length;T++)N[T][1].length>0&&M.push(N[T]);return M}function F(N,M,T,L){return O(N)||G(L)?null:V([[n,N],[t,M],[e,T],[n,L]])}function $(N,M,T){var L=typeof T=="number"?{index:T,length:0}:T.oldRange,S=typeof T=="number"?null:T.newRange,D=N.length,P=M.length;if(L.length===0&&(S===null||S.length===0)){var H=L.index,B=N.slice(0,H),z=N.slice(H),J=S?S.index:null;e:{var ee=H+P-D;if(J!==null&&J!==ee||ee<0||ee>P)break e;var te=M.slice(0,ee),Z=M.slice(ee);if(Z!==z)break e;var X=Math.min(H,ee),le=B.slice(0,X),ce=te.slice(0,X);if(le!==ce)break e;var ue=B.slice(X),me=te.slice(X);return F(le,ue,me,z)}e:{if(J!==null&&J!==H)break e;var he=H,te=M.slice(0,he),Z=M.slice(he);if(te!==B)break e;var we=Math.min(D-he,P-he),ie=z.slice(z.length-we),Ce=Z.slice(Z.length-we);if(ie!==Ce)break e;var ue=z.slice(0,z.length-we),me=Z.slice(0,Z.length-we);return F(B,ue,me,ie)}}if(L.length>0&&S&&S.length===0)e:{var le=N.slice(0,L.index),ie=N.slice(L.index+L.length),X=le.length,we=ie.length;if(P<X+we)break e;var ce=M.slice(0,X),Ce=M.slice(P-we);if(le!==ce||ie!==Ce)break e;var ue=N.slice(X,D-we),me=M.slice(X,P-we);return F(le,ue,me,ie)}return null}function W(N,M,T,L){return r(N,M,T,L,!0)}return W.INSERT=e,W.DELETE=t,W.EQUAL=n,hl=W,hl}var ks={exports:{}};ks.exports;var _d;function Ph(){return _d||(_d=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=9007199254740991,s="[object Arguments]",i="[object Array]",a="[object Boolean]",c="[object Date]",u="[object Error]",d="[object Function]",p="[object GeneratorFunction]",f="[object Map]",h="[object Number]",b="[object Object]",x="[object Promise]",C="[object RegExp]",E="[object Set]",_="[object String]",A="[object Symbol]",j="[object WeakMap]",G="[object ArrayBuffer]",O="[object DataView]",V="[object Float32Array]",F="[object Float64Array]",$="[object Int8Array]",W="[object Int16Array]",N="[object Int32Array]",M="[object Uint8Array]",T="[object Uint8ClampedArray]",L="[object Uint16Array]",S="[object Uint32Array]",D=/[\\^$.*+?()[\]{}|]/g,P=/\w*$/,H=/^\[object .+?Constructor\]$/,B=/^(?:0|[1-9]\d*)$/,z={};z[s]=z[i]=z[G]=z[O]=z[a]=z[c]=z[V]=z[F]=z[$]=z[W]=z[N]=z[f]=z[h]=z[b]=z[C]=z[E]=z[_]=z[A]=z[M]=z[T]=z[L]=z[S]=!0,z[u]=z[d]=z[j]=!1;var J=typeof xr=="object"&&xr&&xr.Object===Object&&xr,ee=typeof self=="object"&&self&&self.Object===Object&&self,te=J||ee||Function("return this")(),Z=e&&!e.nodeType&&e,X=Z&&!0&&t&&!t.nodeType&&t,le=X&&X.exports===Z;function ce(m,k){return m.set(k[0],k[1]),m}function ue(m,k){return m.add(k),m}function me(m,k){for(var I=-1,Q=m?m.length:0;++I<Q&&k(m[I],I,m)!==!1;);return m}function he(m,k){for(var I=-1,Q=k.length,xe=m.length;++I<Q;)m[xe+I]=k[I];return m}function we(m,k,I,Q){for(var xe=-1,pe=m?m.length:0;++xe<pe;)I=k(I,m[xe],xe,m);return I}function ie(m,k){for(var I=-1,Q=Array(m);++I<m;)Q[I]=k(I);return Q}function Ce(m,k){return m==null?void 0:m[k]}function De(m){var k=!1;if(m!=null&&typeof m.toString!="function")try{k=!!(m+"")}catch{}return k}function oe(m){var k=-1,I=Array(m.size);return m.forEach(function(Q,xe){I[++k]=[xe,Q]}),I}function be(m,k){return function(I){return m(k(I))}}function Ne(m){var k=-1,I=Array(m.size);return m.forEach(function(Q){I[++k]=Q}),I}var Oe=Array.prototype,Fe=Function.prototype,Ze=Object.prototype,Je=te["__core-js_shared__"],ot=function(){var m=/[^.]+$/.exec(Je&&Je.keys&&Je.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),Ee=Fe.toString,ut=Ze.hasOwnProperty,Ve=Ze.toString,bn=RegExp("^"+Ee.call(ut).replace(D,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Xt=le?te.Buffer:void 0,Ut=te.Symbol,Qt=te.Uint8Array,fe=be(Object.getPrototypeOf,Object),Le=Object.create,dt=Ze.propertyIsEnumerable,mt=Oe.splice,Zt=Object.getOwnPropertySymbols,en=Xt?Xt.isBuffer:void 0,vn=be(Object.keys,Object),tn=Cn(te,"DataView"),nn=Cn(te,"Map"),Ct=Cn(te,"Promise"),rn=Cn(te,"Set"),on=Cn(te,"WeakMap"),Vt=Cn(Object,"create"),In=$t(tn),Pe=$t(nn),Xe=$t(Ct),Lt=$t(rn),Pt=$t(on),xn=Ut?Ut.prototype:void 0,hr=xn?xn.valueOf:void 0;function dn(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function v(){this.__data__=Vt?Vt(null):{}}function y(m){return this.has(m)&&delete this.__data__[m]}function R(m){var k=this.__data__;if(Vt){var I=k[m];return I===r?void 0:I}return ut.call(k,m)?k[m]:void 0}function Y(m){var k=this.__data__;return Vt?k[m]!==void 0:ut.call(k,m)}function re(m,k){var I=this.__data__;return I[m]=Vt&&k===void 0?r:k,this}dn.prototype.clear=v,dn.prototype.delete=y,dn.prototype.get=R,dn.prototype.has=Y,dn.prototype.set=re;function ae(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=[]}function et(m){var k=this.__data__,I=Eo(k,m);if(I<0)return!1;var Q=k.length-1;return I==Q?k.pop():mt.call(k,I,1),!0}function it(m){var k=this.__data__,I=Eo(k,m);return I<0?void 0:k[I][1]}function Et(m){return Eo(this.__data__,m)>-1}function pt(m,k){var I=this.__data__,Q=Eo(I,m);return Q<0?I.push([m,k]):I[Q][1]=k,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=Et,ae.prototype.set=pt;function We(m){var k=-1,I=m?m.length:0;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function sn(){this.__data__={hash:new dn,map:new(nn||ae),string:new dn}}function Dt(m){return Br(this,m).delete(m)}function yn(m){return Br(this,m).get(m)}function Ht(m){return Br(this,m).has(m)}function _n(m,k){return Br(this,m).set(m,k),this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(m){this.__data__=new ae(m)}function $r(){this.__data__=new ae}function lt(m){return this.__data__.delete(m)}function _o(m){return this.__data__.get(m)}function Ln(m){return this.__data__.has(m)}function Va(m,k){var I=this.__data__;if(I instanceof ae){var Q=I.__data__;if(!nn||Q.length<n-1)return Q.push([m,k]),this;I=this.__data__=new We(Q)}return I.set(m,k),this}at.prototype.clear=$r,at.prototype.delete=lt,at.prototype.get=_o,at.prototype.has=Ln,at.prototype.set=Va;function Co(m,k){var I=ws(m)||No(m)?ie(m.length,String):[],Q=I.length,xe=!!Q;for(var pe in m)ut.call(m,pe)&&!(xe&&(pe=="length"||rl(pe,Q)))&&I.push(pe);return I}function hi(m,k,I){var Q=m[k];(!(ut.call(m,k)&&vi(Q,I))||I===void 0&&!(k in m))&&(m[k]=I)}function Eo(m,k){for(var I=m.length;I--;)if(vi(m[I][0],k))return I;return-1}function Pn(m,k){return m&&hs(k,gs(k),m)}function ps(m,k,I,Q,xe,pe,je){var Me;if(Q&&(Me=pe?Q(m,xe,pe,je):Q(m)),Me!==void 0)return Me;if(!Fn(m))return m;var ct=ws(m);if(ct){if(Me=tl(m),!k)return Qa(m,Me)}else{var Ie=tr(m),Mt=Ie==d||Ie==p;if(xi(m))return ko(m,k);if(Ie==b||Ie==s||Mt&&!pe){if(De(m))return pe?m:{};if(Me=$n(Mt?{}:m),!k)return Za(m,Pn(Me,m))}else{if(!z[Ie])return pe?m:{};Me=nl(m,Ie,ps,k)}}je||(je=new at);var zt=je.get(m);if(zt)return zt;if(je.set(m,Me),!ct)var ft=I?el(m):gs(m);return me(ft||m,function(Rt,kt){ft&&(kt=Rt,Rt=m[kt]),hi(Me,kt,ps(Rt,k,I,Q,kt,m,je))}),Me}function Ha(m){return Fn(m)?Le(m):{}}function za(m,k,I){var Q=k(m);return ws(m)?Q:he(Q,I(m))}function Ga(m){return Ve.call(m)}function Ka(m){if(!Fn(m)||sl(m))return!1;var k=ms(m)||De(m)?bn:H;return k.test($t(m))}function Ya(m){if(!gi(m))return vn(m);var k=[];for(var I in Object(m))ut.call(m,I)&&I!="constructor"&&k.push(I);return k}function ko(m,k){if(k)return m.slice();var I=new m.constructor(m.length);return m.copy(I),I}function fs(m){var k=new m.constructor(m.byteLength);return new Qt(k).set(new Qt(m)),k}function Fr(m,k){var I=k?fs(m.buffer):m.buffer;return new m.constructor(I,m.byteOffset,m.byteLength)}function wi(m,k,I){var Q=k?I(oe(m),!0):oe(m);return we(Q,ce,new m.constructor)}function mi(m){var k=new m.constructor(m.source,P.exec(m));return k.lastIndex=m.lastIndex,k}function Wa(m,k,I){var Q=k?I(Ne(m),!0):Ne(m);return we(Q,ue,new m.constructor)}function Ja(m){return hr?Object(hr.call(m)):{}}function Xa(m,k){var I=k?fs(m.buffer):m.buffer;return new m.constructor(I,m.byteOffset,m.length)}function Qa(m,k){var I=-1,Q=m.length;for(k||(k=Array(Q));++I<Q;)k[I]=m[I];return k}function hs(m,k,I,Q){I||(I={});for(var xe=-1,pe=k.length;++xe<pe;){var je=k[xe],Me=void 0;hi(I,je,Me===void 0?m[je]:Me)}return I}function Za(m,k){return hs(m,er(m),k)}function el(m){return za(m,gs,er)}function Br(m,k){var I=m.__data__;return ol(k)?I[typeof k=="string"?"string":"hash"]:I.map}function Cn(m,k){var I=Ce(m,k);return Ka(I)?I:void 0}var er=Zt?be(Zt,Object):al,tr=Ga;(tn&&tr(new tn(new ArrayBuffer(1)))!=O||nn&&tr(new nn)!=f||Ct&&tr(Ct.resolve())!=x||rn&&tr(new rn)!=E||on&&tr(new on)!=j)&&(tr=function(m){var k=Ve.call(m),I=k==b?m.constructor:void 0,Q=I?$t(I):void 0;if(Q)switch(Q){case In:return O;case Pe:return f;case Xe:return x;case Lt:return E;case Pt:return j}return k});function tl(m){var k=m.length,I=m.constructor(k);return k&&typeof m[0]=="string"&&ut.call(m,"index")&&(I.index=m.index,I.input=m.input),I}function $n(m){return typeof m.constructor=="function"&&!gi(m)?Ha(fe(m)):{}}function nl(m,k,I,Q){var xe=m.constructor;switch(k){case G:return fs(m);case a:case c:return new xe(+m);case O:return Fr(m,Q);case V:case F:case $:case W:case N:case M:case T:case L:case S:return Xa(m,Q);case f:return wi(m,Q,I);case h:case _:return new xe(m);case C:return mi(m);case E:return Wa(m,Q,I);case A:return Ja(m)}}function rl(m,k){return k=k??o,!!k&&(typeof m=="number"||B.test(m))&&m>-1&&m%1==0&&m<k}function ol(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function sl(m){return!!ot&&ot in m}function gi(m){var k=m&&m.constructor,I=typeof k=="function"&&k.prototype||Ze;return m===I}function $t(m){if(m!=null){try{return Ee.call(m)}catch{}try{return m+""}catch{}}return""}function bi(m){return ps(m,!0,!0)}function vi(m,k){return m===k||m!==m&&k!==k}function No(m){return il(m)&&ut.call(m,"callee")&&(!dt.call(m,"callee")||Ve.call(m)==s)}var ws=Array.isArray;function To(m){return m!=null&&yi(m.length)&&!ms(m)}function il(m){return _i(m)&&To(m)}var xi=en||ll;function ms(m){var k=Fn(m)?Ve.call(m):"";return k==d||k==p}function yi(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=o}function Fn(m){var k=typeof m;return!!m&&(k=="object"||k=="function")}function _i(m){return!!m&&typeof m=="object"}function gs(m){return To(m)?Co(m):Ya(m)}function al(){return[]}function ll(){return!1}t.exports=bi}(ks,ks.exports)),ks.exports}var Ns={exports:{}};Ns.exports;var Cd;function $h(){return Cd||(Cd=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=1,s=2,i=9007199254740991,a="[object Arguments]",c="[object Array]",u="[object AsyncFunction]",d="[object Boolean]",p="[object Date]",f="[object Error]",h="[object Function]",b="[object GeneratorFunction]",x="[object Map]",C="[object Number]",E="[object Null]",_="[object Object]",A="[object Promise]",j="[object Proxy]",G="[object RegExp]",O="[object Set]",V="[object String]",F="[object Symbol]",$="[object Undefined]",W="[object WeakMap]",N="[object ArrayBuffer]",M="[object DataView]",T="[object Float32Array]",L="[object Float64Array]",S="[object Int8Array]",D="[object Int16Array]",P="[object Int32Array]",H="[object Uint8Array]",B="[object Uint8ClampedArray]",z="[object Uint16Array]",J="[object Uint32Array]",ee=/[\\^$.*+?()[\]{}|]/g,te=/^\[object .+?Constructor\]$/,Z=/^(?:0|[1-9]\d*)$/,X={};X[T]=X[L]=X[S]=X[D]=X[P]=X[H]=X[B]=X[z]=X[J]=!0,X[a]=X[c]=X[N]=X[d]=X[M]=X[p]=X[f]=X[h]=X[x]=X[C]=X[_]=X[G]=X[O]=X[V]=X[W]=!1;var le=typeof xr=="object"&&xr&&xr.Object===Object&&xr,ce=typeof self=="object"&&self&&self.Object===Object&&self,ue=le||ce||Function("return this")(),me=e&&!e.nodeType&&e,he=me&&!0&&t&&!t.nodeType&&t,we=he&&he.exports===me,ie=we&&le.process,Ce=function(){try{return ie&&ie.binding&&ie.binding("util")}catch{}}(),De=Ce&&Ce.isTypedArray;function oe(m,k){for(var I=-1,Q=m==null?0:m.length,xe=0,pe=[];++I<Q;){var je=m[I];k(je,I,m)&&(pe[xe++]=je)}return pe}function be(m,k){for(var I=-1,Q=k.length,xe=m.length;++I<Q;)m[xe+I]=k[I];return m}function Ne(m,k){for(var I=-1,Q=m==null?0:m.length;++I<Q;)if(k(m[I],I,m))return!0;return!1}function Oe(m,k){for(var I=-1,Q=Array(m);++I<m;)Q[I]=k(I);return Q}function Fe(m){return function(k){return m(k)}}function Ze(m,k){return m.has(k)}function Je(m,k){return m==null?void 0:m[k]}function ot(m){var k=-1,I=Array(m.size);return m.forEach(function(Q,xe){I[++k]=[xe,Q]}),I}function Ee(m,k){return function(I){return m(k(I))}}function ut(m){var k=-1,I=Array(m.size);return m.forEach(function(Q){I[++k]=Q}),I}var Ve=Array.prototype,bn=Function.prototype,Xt=Object.prototype,Ut=ue["__core-js_shared__"],Qt=bn.toString,fe=Xt.hasOwnProperty,Le=function(){var m=/[^.]+$/.exec(Ut&&Ut.keys&&Ut.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),dt=Xt.toString,mt=RegExp("^"+Qt.call(fe).replace(ee,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Zt=we?ue.Buffer:void 0,en=ue.Symbol,vn=ue.Uint8Array,tn=Xt.propertyIsEnumerable,nn=Ve.splice,Ct=en?en.toStringTag:void 0,rn=Object.getOwnPropertySymbols,on=Zt?Zt.isBuffer:void 0,Vt=Ee(Object.keys,Object),In=er(ue,"DataView"),Pe=er(ue,"Map"),Xe=er(ue,"Promise"),Lt=er(ue,"Set"),Pt=er(ue,"WeakMap"),xn=er(Object,"create"),hr=$t(In),dn=$t(Pe),v=$t(Xe),y=$t(Lt),R=$t(Pt),Y=en?en.prototype:void 0,re=Y?Y.valueOf:void 0;function ae(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=xn?xn(null):{},this.size=0}function et(m){var k=this.has(m)&&delete this.__data__[m];return this.size-=k?1:0,k}function it(m){var k=this.__data__;if(xn){var I=k[m];return I===r?void 0:I}return fe.call(k,m)?k[m]:void 0}function Et(m){var k=this.__data__;return xn?k[m]!==void 0:fe.call(k,m)}function pt(m,k){var I=this.__data__;return this.size+=this.has(m)?0:1,I[m]=xn&&k===void 0?r:k,this}ae.prototype.clear=ke,ae.prototype.delete=et,ae.prototype.get=it,ae.prototype.has=Et,ae.prototype.set=pt;function We(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function sn(){this.__data__=[],this.size=0}function Dt(m){var k=this.__data__,I=ko(k,m);if(I<0)return!1;var Q=k.length-1;return I==Q?k.pop():nn.call(k,I,1),--this.size,!0}function yn(m){var k=this.__data__,I=ko(k,m);return I<0?void 0:k[I][1]}function Ht(m){return ko(this.__data__,m)>-1}function _n(m,k){var I=this.__data__,Q=ko(I,m);return Q<0?(++this.size,I.push([m,k])):I[Q][1]=k,this}We.prototype.clear=sn,We.prototype.delete=Dt,We.prototype.get=yn,We.prototype.has=Ht,We.prototype.set=_n;function at(m){var k=-1,I=m==null?0:m.length;for(this.clear();++k<I;){var Q=m[k];this.set(Q[0],Q[1])}}function $r(){this.size=0,this.__data__={hash:new ae,map:new(Pe||We),string:new ae}}function lt(m){var k=Cn(this,m).delete(m);return this.size-=k?1:0,k}function _o(m){return Cn(this,m).get(m)}function Ln(m){return Cn(this,m).has(m)}function Va(m,k){var I=Cn(this,m),Q=I.size;return I.set(m,k),this.size+=I.size==Q?0:1,this}at.prototype.clear=$r,at.prototype.delete=lt,at.prototype.get=_o,at.prototype.has=Ln,at.prototype.set=Va;function Co(m){var k=-1,I=m==null?0:m.length;for(this.__data__=new at;++k<I;)this.add(m[k])}function hi(m){return this.__data__.set(m,r),this}function Eo(m){return this.__data__.has(m)}Co.prototype.add=Co.prototype.push=hi,Co.prototype.has=Eo;function Pn(m){var k=this.__data__=new We(m);this.size=k.size}function ps(){this.__data__=new We,this.size=0}function Ha(m){var k=this.__data__,I=k.delete(m);return this.size=k.size,I}function za(m){return this.__data__.get(m)}function Ga(m){return this.__data__.has(m)}function Ka(m,k){var I=this.__data__;if(I instanceof We){var Q=I.__data__;if(!Pe||Q.length<n-1)return Q.push([m,k]),this.size=++I.size,this;I=this.__data__=new at(Q)}return I.set(m,k),this.size=I.size,this}Pn.prototype.clear=ps,Pn.prototype.delete=Ha,Pn.prototype.get=za,Pn.prototype.has=Ga,Pn.prototype.set=Ka;function Ya(m,k){var I=No(m),Q=!I&&vi(m),xe=!I&&!Q&&To(m),pe=!I&&!Q&&!xe&&_i(m),je=I||Q||xe||pe,Me=je?Oe(m.length,String):[],ct=Me.length;for(var Ie in m)fe.call(m,Ie)&&!(je&&(Ie=="length"||xe&&(Ie=="offset"||Ie=="parent")||pe&&(Ie=="buffer"||Ie=="byteLength"||Ie=="byteOffset")||nl(Ie,ct)))&&Me.push(Ie);return Me}function ko(m,k){for(var I=m.length;I--;)if(bi(m[I][0],k))return I;return-1}function fs(m,k,I){var Q=k(m);return No(m)?Q:be(Q,I(m))}function Fr(m){return m==null?m===void 0?$:E:Ct&&Ct in Object(m)?tr(m):gi(m)}function wi(m){return Fn(m)&&Fr(m)==a}function mi(m,k,I,Q,xe){return m===k?!0:m==null||k==null||!Fn(m)&&!Fn(k)?m!==m&&k!==k:Wa(m,k,I,Q,mi,xe)}function Wa(m,k,I,Q,xe,pe){var je=No(m),Me=No(k),ct=je?c:$n(m),Ie=Me?c:$n(k);ct=ct==a?_:ct,Ie=Ie==a?_:Ie;var Mt=ct==_,zt=Ie==_,ft=ct==Ie;if(ft&&To(m)){if(!To(k))return!1;je=!0,Mt=!1}if(ft&&!Mt)return pe||(pe=new Pn),je||_i(m)?hs(m,k,I,Q,xe,pe):Za(m,k,ct,I,Q,xe,pe);if(!(I&o)){var Rt=Mt&&fe.call(m,"__wrapped__"),kt=zt&&fe.call(k,"__wrapped__");if(Rt||kt){var wr=Rt?m.value():m,nr=kt?k.value():k;return pe||(pe=new Pn),xe(wr,nr,I,Q,pe)}}return ft?(pe||(pe=new Pn),el(m,k,I,Q,xe,pe)):!1}function Ja(m){if(!yi(m)||ol(m))return!1;var k=xi(m)?mt:te;return k.test($t(m))}function Xa(m){return Fn(m)&&ms(m.length)&&!!X[Fr(m)]}function Qa(m){if(!sl(m))return Vt(m);var k=[];for(var I in Object(m))fe.call(m,I)&&I!="constructor"&&k.push(I);return k}function hs(m,k,I,Q,xe,pe){var je=I&o,Me=m.length,ct=k.length;if(Me!=ct&&!(je&&ct>Me))return!1;var Ie=pe.get(m);if(Ie&&pe.get(k))return Ie==k;var Mt=-1,zt=!0,ft=I&s?new Co:void 0;for(pe.set(m,k),pe.set(k,m);++Mt<Me;){var Rt=m[Mt],kt=k[Mt];if(Q)var wr=je?Q(kt,Rt,Mt,k,m,pe):Q(Rt,kt,Mt,m,k,pe);if(wr!==void 0){if(wr)continue;zt=!1;break}if(ft){if(!Ne(k,function(nr,qr){if(!Ze(ft,qr)&&(Rt===nr||xe(Rt,nr,I,Q,pe)))return ft.push(qr)})){zt=!1;break}}else if(!(Rt===kt||xe(Rt,kt,I,Q,pe))){zt=!1;break}}return pe.delete(m),pe.delete(k),zt}function Za(m,k,I,Q,xe,pe,je){switch(I){case M:if(m.byteLength!=k.byteLength||m.byteOffset!=k.byteOffset)return!1;m=m.buffer,k=k.buffer;case N:return!(m.byteLength!=k.byteLength||!pe(new vn(m),new vn(k)));case d:case p:case C:return bi(+m,+k);case f:return m.name==k.name&&m.message==k.message;case G:case V:return m==k+"";case x:var Me=ot;case O:var ct=Q&o;if(Me||(Me=ut),m.size!=k.size&&!ct)return!1;var Ie=je.get(m);if(Ie)return Ie==k;Q|=s,je.set(m,k);var Mt=hs(Me(m),Me(k),Q,xe,pe,je);return je.delete(m),Mt;case F:if(re)return re.call(m)==re.call(k)}return!1}function el(m,k,I,Q,xe,pe){var je=I&o,Me=Br(m),ct=Me.length,Ie=Br(k),Mt=Ie.length;if(ct!=Mt&&!je)return!1;for(var zt=ct;zt--;){var ft=Me[zt];if(!(je?ft in k:fe.call(k,ft)))return!1}var Rt=pe.get(m);if(Rt&&pe.get(k))return Rt==k;var kt=!0;pe.set(m,k),pe.set(k,m);for(var wr=je;++zt<ct;){ft=Me[zt];var nr=m[ft],qr=k[ft];if(Q)var Yu=je?Q(qr,nr,ft,k,m,pe):Q(nr,qr,ft,m,k,pe);if(!(Yu===void 0?nr===qr||xe(nr,qr,I,Q,pe):Yu)){kt=!1;break}wr||(wr=ft=="constructor")}if(kt&&!wr){var Ci=m.constructor,Ei=k.constructor;Ci!=Ei&&"constructor"in m&&"constructor"in k&&!(typeof Ci=="function"&&Ci instanceof Ci&&typeof Ei=="function"&&Ei instanceof Ei)&&(kt=!1)}return pe.delete(m),pe.delete(k),kt}function Br(m){return fs(m,gs,tl)}function Cn(m,k){var I=m.__data__;return rl(k)?I[typeof k=="string"?"string":"hash"]:I.map}function er(m,k){var I=Je(m,k);return Ja(I)?I:void 0}function tr(m){var k=fe.call(m,Ct),I=m[Ct];try{m[Ct]=void 0;var Q=!0}catch{}var xe=dt.call(m);return Q&&(k?m[Ct]=I:delete m[Ct]),xe}var tl=rn?function(m){return m==null?[]:(m=Object(m),oe(rn(m),function(k){return tn.call(m,k)}))}:al,$n=Fr;(In&&$n(new In(new ArrayBuffer(1)))!=M||Pe&&$n(new Pe)!=x||Xe&&$n(Xe.resolve())!=A||Lt&&$n(new Lt)!=O||Pt&&$n(new Pt)!=W)&&($n=function(m){var k=Fr(m),I=k==_?m.constructor:void 0,Q=I?$t(I):"";if(Q)switch(Q){case hr:return M;case dn:return x;case v:return A;case y:return O;case R:return W}return k});function nl(m,k){return k=k??i,!!k&&(typeof m=="number"||Z.test(m))&&m>-1&&m%1==0&&m<k}function rl(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function ol(m){return!!Le&&Le in m}function sl(m){var k=m&&m.constructor,I=typeof k=="function"&&k.prototype||Xt;return m===I}function gi(m){return dt.call(m)}function $t(m){if(m!=null){try{return Qt.call(m)}catch{}try{return m+""}catch{}}return""}function bi(m,k){return m===k||m!==m&&k!==k}var vi=wi(function(){return arguments}())?wi:function(m){return Fn(m)&&fe.call(m,"callee")&&!tn.call(m,"callee")},No=Array.isArray;function ws(m){return m!=null&&ms(m.length)&&!xi(m)}var To=on||ll;function il(m,k){return mi(m,k)}function xi(m){if(!yi(m))return!1;var k=Fr(m);return k==h||k==b||k==u||k==j}function ms(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=i}function yi(m){var k=typeof m;return m!=null&&(k=="object"||k=="function")}function Fn(m){return m!=null&&typeof m=="object"}var _i=De?Fe(De):Xa;function gs(m){return ws(m)?Ya(m):Qa(m)}function al(){return[]}function ll(){return!1}t.exports=il}(Ns,Ns.exports)),Ns.exports}var Si={},Ed;function Ev(){if(Ed)return Si;Ed=1,Object.defineProperty(Si,"__esModule",{value:!0});const t=Ph(),e=$h();var n;return function(r){function o(c={},u={},d=!1){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});let p=t(u);d||(p=Object.keys(p).reduce((f,h)=>(p[h]!=null&&(f[h]=p[h]),f),{}));for(const f in c)c[f]!==void 0&&u[f]===void 0&&(p[f]=c[f]);return Object.keys(p).length>0?p:void 0}r.compose=o;function s(c={},u={}){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});const d=Object.keys(c).concat(Object.keys(u)).reduce((p,f)=>(e(c[f],u[f])||(p[f]=u[f]===void 0?null:u[f]),p),{});return Object.keys(d).length>0?d:void 0}r.diff=s;function i(c={},u={}){c=c||{};const d=Object.keys(u).reduce((p,f)=>(u[f]!==c[f]&&c[f]!==void 0&&(p[f]=u[f]),p),{});return Object.keys(c).reduce((p,f)=>(c[f]!==u[f]&&u[f]===void 0&&(p[f]=null),p),d)}r.invert=i;function a(c,u,d=!1){if(typeof c!="object")return u;if(typeof u!="object")return;if(!d)return u;const p=Object.keys(u).reduce((f,h)=>(c[h]===void 0&&(f[h]=u[h]),f),{});return Object.keys(p).length>0?p:void 0}r.transform=a}(n||(n={})),Si.default=n,Si}var Ai={},kd;function Fh(){if(kd)return Ai;kd=1,Object.defineProperty(Ai,"__esModule",{value:!0});var t;return function(e){function n(r){return typeof r.delete=="number"?r.delete:typeof r.retain=="number"?r.retain:typeof r.retain=="object"&&r.retain!==null?1:typeof r.insert=="string"?r.insert.length:1}e.length=n}(t||(t={})),Ai.default=t,Ai}var Di={},Nd;function kv(){if(Nd)return Di;Nd=1,Object.defineProperty(Di,"__esModule",{value:!0});const t=Fh();class e{constructor(r){this.ops=r,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(r){r||(r=1/0);const o=this.ops[this.index];if(o){const s=this.offset,i=t.default.length(o);if(r>=i-s?(r=i-s,this.index+=1,this.offset=0):this.offset+=r,typeof o.delete=="number")return{delete:r};{const a={};return o.attributes&&(a.attributes=o.attributes),typeof o.retain=="number"?a.retain=r:typeof o.retain=="object"&&o.retain!==null?a.retain=o.retain:typeof o.insert=="string"?a.insert=o.insert.substr(s,r):a.insert=o.insert,a}}else return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?t.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const r=this.ops[this.index];return r?typeof r.delete=="number"?"delete":typeof r.retain=="number"||typeof r.retain=="object"&&r.retain!==null?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(this.offset===0)return this.ops.slice(this.index);{const r=this.offset,o=this.index,s=this.next(),i=this.ops.slice(this.index);return this.offset=r,this.index=o,[s].concat(i)}}else return[]}}return Di.default=e,Di}var Td;function Nv(){return Td||(Td=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const n=Cv(),r=Ph(),o=$h(),s=Ev();e.AttributeMap=s.default;const i=Fh();e.Op=i.default;const a=kv();e.OpIterator=a.default;const c="\0",u=(p,f)=>{if(typeof p!="object"||p===null)throw new Error(`cannot retain a ${typeof p}`);if(typeof f!="object"||f===null)throw new Error(`cannot retain a ${typeof f}`);const h=Object.keys(p)[0];if(!h||h!==Object.keys(f)[0])throw new Error(`embed types not matched: ${h} != ${Object.keys(f)[0]}`);return[h,p[h],f[h]]};class d{constructor(f){Array.isArray(f)?this.ops=f:f!=null&&Array.isArray(f.ops)?this.ops=f.ops:this.ops=[]}static registerEmbed(f,h){this.handlers[f]=h}static unregisterEmbed(f){delete this.handlers[f]}static getHandler(f){const h=this.handlers[f];if(!h)throw new Error(`no handlers for embed type "${f}"`);return h}insert(f,h){const b={};return typeof f=="string"&&f.length===0?this:(b.insert=f,h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b))}delete(f){return f<=0?this:this.push({delete:f})}retain(f,h){if(typeof f=="number"&&f<=0)return this;const b={retain:f};return h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b)}push(f){let h=this.ops.length,b=this.ops[h-1];if(f=r(f),typeof b=="object"){if(typeof f.delete=="number"&&typeof b.delete=="number")return this.ops[h-1]={delete:b.delete+f.delete},this;if(typeof b.delete=="number"&&f.insert!=null&&(h-=1,b=this.ops[h-1],typeof b!="object"))return this.ops.unshift(f),this;if(o(f.attributes,b.attributes)){if(typeof f.insert=="string"&&typeof b.insert=="string")return this.ops[h-1]={insert:b.insert+f.insert},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this;if(typeof f.retain=="number"&&typeof b.retain=="number")return this.ops[h-1]={retain:b.retain+f.retain},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this}}return h===this.ops.length?this.ops.push(f):this.ops.splice(h,0,f),this}chop(){const f=this.ops[this.ops.length-1];return f&&typeof f.retain=="number"&&!f.attributes&&this.ops.pop(),this}filter(f){return this.ops.filter(f)}forEach(f){this.ops.forEach(f)}map(f){return this.ops.map(f)}partition(f){const h=[],b=[];return this.forEach(x=>{(f(x)?h:b).push(x)}),[h,b]}reduce(f,h){return this.ops.reduce(f,h)}changeLength(){return this.reduce((f,h)=>h.insert?f+i.default.length(h):h.delete?f-h.delete:f,0)}length(){return this.reduce((f,h)=>f+i.default.length(h),0)}slice(f=0,h=1/0){const b=[],x=new a.default(this.ops);let C=0;for(;C<h&&x.hasNext();){let E;C<f?E=x.next(f-C):(E=x.next(h-C),b.push(E)),C+=i.default.length(E)}return new d(b)}compose(f){const h=new a.default(this.ops),b=new a.default(f.ops),x=[],C=b.peek();if(C!=null&&typeof C.retain=="number"&&C.attributes==null){let _=C.retain;for(;h.peekType()==="insert"&&h.peekLength()<=_;)_-=h.peekLength(),x.push(h.next());C.retain-_>0&&b.next(C.retain-_)}const E=new d(x);for(;h.hasNext()||b.hasNext();)if(b.peekType()==="insert")E.push(b.next());else if(h.peekType()==="delete")E.push(h.next());else{const _=Math.min(h.peekLength(),b.peekLength()),A=h.next(_),j=b.next(_);if(j.retain){const G={};if(typeof A.retain=="number")G.retain=typeof j.retain=="number"?_:j.retain;else if(typeof j.retain=="number")A.retain==null?G.insert=A.insert:G.retain=A.retain;else{const V=A.retain==null?"insert":"retain",[F,$,W]=u(A[V],j.retain),N=d.getHandler(F);G[V]={[F]:N.compose($,W,V==="retain")}}const O=s.default.compose(A.attributes,j.attributes,typeof A.retain=="number");if(O&&(G.attributes=O),E.push(G),!b.hasNext()&&o(E.ops[E.ops.length-1],G)){const V=new d(h.rest());return E.concat(V).chop()}}else typeof j.delete=="number"&&(typeof A.retain=="number"||typeof A.retain=="object"&&A.retain!==null)&&E.push(j)}return E.chop()}concat(f){const h=new d(this.ops.slice());return f.ops.length>0&&(h.push(f.ops[0]),h.ops=h.ops.concat(f.ops.slice(1))),h}diff(f,h){if(this.ops===f.ops)return new d;const b=[this,f].map(A=>A.map(j=>{if(j.insert!=null)return typeof j.insert=="string"?j.insert:c;const G=A===f?"on":"with";throw new Error("diff() called "+G+" non-document")}).join("")),x=new d,C=n(b[0],b[1],h,!0),E=new a.default(this.ops),_=new a.default(f.ops);return C.forEach(A=>{let j=A[1].length;for(;j>0;){let G=0;switch(A[0]){case n.INSERT:G=Math.min(_.peekLength(),j),x.push(_.next(G));break;case n.DELETE:G=Math.min(j,E.peekLength()),E.next(G),x.delete(G);break;case n.EQUAL:G=Math.min(E.peekLength(),_.peekLength(),j);const O=E.next(G),V=_.next(G);o(O.insert,V.insert)?x.retain(G,s.default.diff(O.attributes,V.attributes)):x.push(V).delete(G);break}j-=G}}),x.chop()}eachLine(f,h=`
`){const b=new a.default(this.ops);let x=new d,C=0;for(;b.hasNext();){if(b.peekType()!=="insert")return;const E=b.peek(),_=i.default.length(E)-b.peekLength(),A=typeof E.insert=="string"?E.insert.indexOf(h,_)-_:-1;if(A<0)x.push(b.next());else if(A>0)x.push(b.next(A));else{if(f(x,b.next(1).attributes||{},C)===!1)return;C+=1,x=new d}}x.length()>0&&f(x,{},C)}invert(f){const h=new d;return this.reduce((b,x)=>{if(x.insert)h.delete(i.default.length(x));else{if(typeof x.retain=="number"&&x.attributes==null)return h.retain(x.retain),b+x.retain;if(x.delete||typeof x.retain=="number"){const C=x.delete||x.retain;return f.slice(b,b+C).forEach(_=>{x.delete?h.push(_):x.retain&&x.attributes&&h.retain(i.default.length(_),s.default.invert(x.attributes,_.attributes))}),b+C}else if(typeof x.retain=="object"&&x.retain!==null){const C=f.slice(b,b+1),E=new a.default(C.ops).next(),[_,A,j]=u(x.retain,E.insert),G=d.getHandler(_);return h.retain({[_]:G.invert(A,j)},s.default.invert(x.attributes,E.attributes)),b+1}}return b},0),h.chop()}transform(f,h=!1){if(h=!!h,typeof f=="number")return this.transformPosition(f,h);const b=f,x=new a.default(this.ops),C=new a.default(b.ops),E=new d;for(;x.hasNext()||C.hasNext();)if(x.peekType()==="insert"&&(h||C.peekType()!=="insert"))E.retain(i.default.length(x.next()));else if(C.peekType()==="insert")E.push(C.next());else{const _=Math.min(x.peekLength(),C.peekLength()),A=x.next(_),j=C.next(_);if(A.delete)continue;if(j.delete)E.push(j);else{const G=A.retain,O=j.retain;let V=typeof O=="object"&&O!==null?O:_;if(typeof G=="object"&&G!==null&&typeof O=="object"&&O!==null){const F=Object.keys(G)[0];if(F===Object.keys(O)[0]){const $=d.getHandler(F);$&&(V={[F]:$.transform(G[F],O[F],h)})}}E.retain(V,s.default.transform(A.attributes,j.attributes,h))}}return E.chop()}transformPosition(f,h=!1){h=!!h;const b=new a.default(this.ops);let x=0;for(;b.hasNext()&&x<=f;){const C=b.peekLength(),E=b.peekType();if(b.next(),E==="delete"){f-=Math.min(C,f-x);continue}else E==="insert"&&(x<f||!h)&&(f+=C);x+=C}return f}}d.Op=i.default,d.OpIterator=a.default,d.AttributeMap=s.default,d.handlers={},e.default=d,t.exports=d,t.exports.default=d}(Ti,Ti.exports)),Ti.exports}var Tv=Nv();const Ts=fv(Tv);var Sv=Object.getOwnPropertyNames,Av=Object.getOwnPropertySymbols,Dv=Object.prototype.hasOwnProperty;function Sd(t,e){return function(r,o,s){return t(r,o,s)&&e(r,o,s)}}function Mi(t){return function(n,r,o){if(!n||!r||typeof n!="object"||typeof r!="object")return t(n,r,o);var s=o.cache,i=s.get(n),a=s.get(r);if(i&&a)return i===r&&a===n;s.set(n,r),s.set(r,n);var c=t(n,r,o);return s.delete(n),s.delete(r),c}}function Ad(t){return Sv(t).concat(Av(t))}var Mv=Object.hasOwn||function(t,e){return Dv.call(t,e)};function vo(t,e){return t===e||!t&&!e&&t!==t&&e!==e}var Rv="__v",Ov="__o",jv="_owner",Dd=Object.getOwnPropertyDescriptor,Md=Object.keys;function Iv(t,e,n){var r=t.length;if(e.length!==r)return!1;for(;r-- >0;)if(!n.equals(t[r],e[r],r,r,t,e,n))return!1;return!0}function Lv(t,e){return vo(t.getTime(),e.getTime())}function Pv(t,e){return t.name===e.name&&t.message===e.message&&t.cause===e.cause&&t.stack===e.stack}function $v(t,e){return t===e}function Rd(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.entries(),i,a,c=0;(i=s.next())&&!i.done;){for(var u=e.entries(),d=!1,p=0;(a=u.next())&&!a.done;){if(o[p]){p++;continue}var f=i.value,h=a.value;if(n.equals(f[0],h[0],c,p,t,e,n)&&n.equals(f[1],h[1],f[0],h[0],t,e,n)){d=o[p]=!0;break}p++}if(!d)return!1;c++}return!0}var Fv=vo;function Bv(t,e,n){var r=Md(t),o=r.length;if(Md(e).length!==o)return!1;for(;o-- >0;)if(!Bh(t,e,n,r[o]))return!1;return!0}function xs(t,e,n){var r=Ad(t),o=r.length;if(Ad(e).length!==o)return!1;for(var s,i,a;o-- >0;)if(s=r[o],!Bh(t,e,n,s)||(i=Dd(t,s),a=Dd(e,s),(i||a)&&(!i||!a||i.configurable!==a.configurable||i.enumerable!==a.enumerable||i.writable!==a.writable)))return!1;return!0}function qv(t,e){return vo(t.valueOf(),e.valueOf())}function Uv(t,e){return t.source===e.source&&t.flags===e.flags}function Od(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),s=t.values(),i,a;(i=s.next())&&!i.done;){for(var c=e.values(),u=!1,d=0;(a=c.next())&&!a.done;){if(!o[d]&&n.equals(i.value,a.value,i.value,a.value,t,e,n)){u=o[d]=!0;break}d++}if(!u)return!1}return!0}function Vv(t,e){var n=t.length;if(e.length!==n)return!1;for(;n-- >0;)if(t[n]!==e[n])return!1;return!0}function Hv(t,e){return t.hostname===e.hostname&&t.pathname===e.pathname&&t.protocol===e.protocol&&t.port===e.port&&t.hash===e.hash&&t.username===e.username&&t.password===e.password}function Bh(t,e,n,r){return(r===jv||r===Ov||r===Rv)&&(t.$$typeof||e.$$typeof)?!0:Mv(e,r)&&n.equals(t[r],e[r],r,r,t,e,n)}var zv="[object Arguments]",Gv="[object Boolean]",Kv="[object Date]",Yv="[object Error]",Wv="[object Map]",Jv="[object Number]",Xv="[object Object]",Qv="[object RegExp]",Zv="[object Set]",ex="[object String]",tx="[object URL]",nx=Array.isArray,jd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,Id=Object.assign,rx=Object.prototype.toString.call.bind(Object.prototype.toString);function ox(t){var e=t.areArraysEqual,n=t.areDatesEqual,r=t.areErrorsEqual,o=t.areFunctionsEqual,s=t.areMapsEqual,i=t.areNumbersEqual,a=t.areObjectsEqual,c=t.arePrimitiveWrappersEqual,u=t.areRegExpsEqual,d=t.areSetsEqual,p=t.areTypedArraysEqual,f=t.areUrlsEqual;return function(b,x,C){if(b===x)return!0;if(b==null||x==null)return!1;var E=typeof b;if(E!==typeof x)return!1;if(E!=="object")return E==="number"?i(b,x,C):E==="function"?o(b,x,C):!1;var _=b.constructor;if(_!==x.constructor)return!1;if(_===Object)return a(b,x,C);if(nx(b))return e(b,x,C);if(jd!=null&&jd(b))return p(b,x,C);if(_===Date)return n(b,x,C);if(_===RegExp)return u(b,x,C);if(_===Map)return s(b,x,C);if(_===Set)return d(b,x,C);var A=rx(b);return A===Kv?n(b,x,C):A===Qv?u(b,x,C):A===Wv?s(b,x,C):A===Zv?d(b,x,C):A===Xv?typeof b.then!="function"&&typeof x.then!="function"&&a(b,x,C):A===tx?f(b,x,C):A===Yv?r(b,x,C):A===zv?a(b,x,C):A===Gv||A===Jv||A===ex?c(b,x,C):!1}}function sx(t){var e=t.circular,n=t.createCustomConfig,r=t.strict,o={areArraysEqual:r?xs:Iv,areDatesEqual:Lv,areErrorsEqual:Pv,areFunctionsEqual:$v,areMapsEqual:r?Sd(Rd,xs):Rd,areNumbersEqual:Fv,areObjectsEqual:r?xs:Bv,arePrimitiveWrappersEqual:qv,areRegExpsEqual:Uv,areSetsEqual:r?Sd(Od,xs):Od,areTypedArraysEqual:r?xs:Vv,areUrlsEqual:Hv};if(n&&(o=Id({},o,n(o))),e){var s=Mi(o.areArraysEqual),i=Mi(o.areMapsEqual),a=Mi(o.areObjectsEqual),c=Mi(o.areSetsEqual);o=Id({},o,{areArraysEqual:s,areMapsEqual:i,areObjectsEqual:a,areSetsEqual:c})}return o}function ix(t){return function(e,n,r,o,s,i,a){return t(e,n,a)}}function ax(t){var e=t.circular,n=t.comparator,r=t.createState,o=t.equals,s=t.strict;if(r)return function(c,u){var d=r(),p=d.cache,f=p===void 0?e?new WeakMap:void 0:p,h=d.meta;return n(c,u,{cache:f,equals:o,meta:h,strict:s})};if(e)return function(c,u){return n(c,u,{cache:new WeakMap,equals:o,meta:void 0,strict:s})};var i={cache:void 0,equals:o,meta:void 0,strict:s};return function(c,u){return n(c,u,i)}}var or=Or();Or({strict:!0});Or({circular:!0});Or({circular:!0,strict:!0});Or({createInternalComparator:function(){return vo}});Or({strict:!0,createInternalComparator:function(){return vo}});Or({circular:!0,createInternalComparator:function(){return vo}});Or({circular:!0,createInternalComparator:function(){return vo},strict:!0});function Or(t){t===void 0&&(t={});var e=t.circular,n=e===void 0?!1:e,r=t.createInternalComparator,o=t.createState,s=t.strict,i=s===void 0?!1:s,a=sx(t),c=ox(a),u=r?r(c):ix(c);return ax({circular:n,comparator:c,createState:o,equals:u,strict:i})}const lx=new Set(["http:","https:","mailto:","sms:","tel:"]);let qh=class Uh extends g.ElementNode{static getType(){return"link"}static clone(e){return new Uh(e.__url,{rel:e.__rel,target:e.__target,title:e.__title},e.__key)}constructor(e="",n={},r){super(r);const{target:o=null,rel:s=null,title:i=null}=n;this.__url=e,this.__target=o,this.__rel=s,this.__title=i}createDOM(e){const n=document.createElement("a");return this.updateLinkDOM(null,n,e),vr(n,e.theme.link),n}updateLinkDOM(e,n,r){if(g.isHTMLAnchorElement(n)){e&&e.__url===this.__url||(n.href=this.sanitizeUrl(this.__url));for(const o of["target","rel","title"]){const s=`__${o}`,i=this[s];e&&e[s]===i||(i?n[o]=i:n.removeAttribute(o))}}}updateDOM(e,n,r){return this.updateLinkDOM(e,n,r),!1}static importDOM(){return{a:e=>({conversion:cx,priority:1})}}static importJSON(e){return Kl().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setURL(e.url).setRel(e.rel||null).setTarget(e.target||null).setTitle(e.title||null)}sanitizeUrl(e){e=Ld(e);try{const n=new URL(Ld(e));if(!lx.has(n.protocol))return"about:blank"}catch{return e}return e}exportJSON(){return{...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),url:this.getURL()}}getURL(){return this.getLatest().__url}setURL(e){const n=this.getWritable();return n.__url=e,n}getTarget(){return this.getLatest().__target}setTarget(e){const n=this.getWritable();return n.__target=e,n}getRel(){return this.getLatest().__rel}setRel(e){const n=this.getWritable();return n.__rel=e,n}getTitle(){return this.getLatest().__title}setTitle(e){const n=this.getWritable();return n.__title=e,n}insertNewAfter(e,n=!0){const r=Kl(this.__url,{rel:this.__rel,target:this.__target,title:this.__title});return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n))return!1;const o=n.anchor.getNode(),s=n.focus.getNode();return this.isParentOf(o)&&this.isParentOf(s)&&n.getTextContent().length>0}isEmailURI(){return this.__url.startsWith("mailto:")}isWebSiteURI(){return this.__url.startsWith("https://")||this.__url.startsWith("http://")}};function cx(t){let e=null;if(g.isHTMLAnchorElement(t)){const n=t.textContent;(n!==null&&n!==""||t.children.length>0)&&(e=Kl(t.getAttribute("href")||"",{rel:t.getAttribute("rel"),target:t.getAttribute("target"),title:t.getAttribute("title")}))}return{node:e}}function Kl(t="",e){return g.$applyNodeReplacement(new qh(t,e))}function ux(t){return t instanceof qh}g.createCommand("TOGGLE_LINK_COMMAND");const dx=/^\+?[0-9\s()-]{5,}$/;function Ld(t){return t.match(/^[a-z][a-z0-9+.-]*:/i)||t.match(/^[/#.]/)?t:t.includes("@")?`mailto:${t}`:dx.test(t)?`tel:${t}`:`https://${t}`}const Vh=[];let Hh=class zh extends g.ElementNode{static getType(){return"mark"}static clone(e){return new zh(e.__ids,e.__key)}static importDOM(){return null}static importJSON(e){return Pd().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setIDs(e.ids)}exportJSON(){return{...super.exportJSON(),ids:this.getIDs()}}constructor(e=Vh,n){super(n),this.__ids=e}createDOM(e){const n=document.createElement("mark");return vr(n,e.theme.mark),this.__ids.length>1&&vr(n,e.theme.markOverlap),n}updateDOM(e,n,r){const o=e.__ids,s=this.__ids,i=o.length,a=s.length,c=r.theme.markOverlap;return i!==a&&(i===1?a===2&&vr(n,c):a===1&&Ul(n,c)),!1}hasID(e){return this.getIDs().includes(e)}getIDs(){return Array.from(this.getLatest().__ids)}setIDs(e){const n=this.getWritable();return n.__ids=e,n}addID(e){const n=this.getWritable();return n.__ids.includes(e)?n:n.setIDs([...n.__ids,e])}deleteID(e){const n=this.getWritable(),r=n.__ids.indexOf(e);if(r===-1)return n;const o=Array.from(n.__ids);return o.splice(r,1),n.setIDs(o)}insertNewAfter(e,n=!0){const r=Pd(this.__ids);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}};function Pd(t=Vh){return g.$applyNodeReplacement(new Hh(t))}function px(t){return t instanceof Hh}const Gh=Object.freeze({"	":"\\t","\n":"\\n"}),$d=new RegExp(Object.keys(Gh).join("|"),"g"),Vn=Object.freeze({ancestorHasNextSibling:"|",ancestorIsLastChild:" ",hasNextSibling:"├",isLastChild:"└",selectedChar:"^",selectedLine:">"}),fx=[t=>t.hasFormat("bold")&&"Bold",t=>t.hasFormat("code")&&"Code",t=>t.hasFormat("italic")&&"Italic",t=>t.hasFormat("strikethrough")&&"Strikethrough",t=>t.hasFormat("subscript")&&"Subscript",t=>t.hasFormat("superscript")&&"Superscript",t=>t.hasFormat("underline")&&"Underline",t=>t.hasFormat("highlight")&&"Highlight"],hx=[t=>t.hasTextFormat("bold")&&"Bold",t=>t.hasTextFormat("code")&&"Code",t=>t.hasTextFormat("italic")&&"Italic",t=>t.hasTextFormat("strikethrough")&&"Strikethrough",t=>t.hasTextFormat("subscript")&&"Subscript",t=>t.hasTextFormat("superscript")&&"Superscript",t=>t.hasTextFormat("underline")&&"Underline",t=>t.hasTextFormat("highlight")&&"Highlight"],wx=[t=>t.isDirectionless()&&"Directionless",t=>t.isUnmergeable()&&"Unmergeable"],mx=[t=>t.isToken()&&"Token",t=>t.isSegmented()&&"Segmented"];function gx(t,e,n,r,o=!1){const s=t.getEditorState(),i=t._config,a=t._compositionKey,c=t._editable;if(n){let f="";return s.read(()=>{f=function(h){const b=document.createElement("div");return b.innerHTML=h.trim(),Yh(b,0).innerHTML}(Dc(t))}),f}let u=` root
`;const d=s.read(()=>{const f=g.$getSelection();return Kh(g.$getRoot(),(h,b)=>{const x=`(${h.getKey()})`,C=h.getType()||"",E=h.isSelected();u+=`${E?Vn.selectedLine:" "} ${b.join(" ")} ${x} ${C} ${function(_,A,j=!1){const G=A?A(_,j):void 0;if(G!==void 0&&G.length>0)return G;if(g.$isTextNode(_)){const O=_.getTextContent(),V=O.length===0?"(empty)":`"${Fd(O,j)}"`,F=function($){return[Bd($),bx($),vx($),qd($)].filter(Boolean).join(", ")}(_);return[V,F.length!==0?`{ ${F} }`:null].filter(Boolean).join(" ").trim()}if(ux(_)){const O=_.getURL(),V=O.length===0?"(empty)":`"${Fd(O,j)}"`,F=function($){return[xx($),yx($),_x($),qd($)].filter(Boolean).join(", ")}(_);return[V,F.length!==0?`{ ${F} }`:null].filter(Boolean).join(" ").trim()}if(px(_))return`ids: [ ${_.getIDs().join(", ")} ]`;if(g.$isParagraphNode(_)){const O=function(F){let $=hx.map(W=>W(F)).filter(Boolean).join(", ").toLocaleLowerCase();return $!==""&&($="format: "+$),$}(_);let V=O!==""?`{ ${O} }`:"";return V+=_.__style?`(${_.__style})`:"",V}return""}(h,r,o)}
`,u+=function({indent:_,isSelected:A,node:j,nodeKeyDisplay:G,selection:O,typeDisplay:V}){if(!g.$isTextNode(j)||!g.$isRangeSelection(O)||!A||g.$isElementNode(j))return"";const F=O.anchor,$=O.focus;if(j.getTextContent()===""||F.getNode()===O.focus.getNode()&&F.offset===$.offset)return"";const[W,N]=function(H,B){const z=B.getStartEndPoints();if(g.$isNodeSelection(B)||z===null)return[-1,-1];const[J,ee]=z,te=H.getTextContent(),Z=te.length;let X=-1,le=-1;if(J.type==="text"&&ee.type==="text"){const me=J.getNode(),he=ee.getNode();me===he&&H===me&&J.offset!==ee.offset?[X,le]=J.offset<ee.offset?[J.offset,ee.offset]:[ee.offset,J.offset]:[X,le]=H===me?me.isBefore(he)?[J.offset,Z]:[0,J.offset]:H===he?he.isBefore(me)?[ee.offset,Z]:[0,ee.offset]:[0,Z]}const ce=(te.slice(0,X).match($d)||[]).length,ue=(te.slice(X,le).match($d)||[]).length;return[X+ce,le+ce+ue]}(j,O);if(W===N)return"";const M=_[_.length-1]===Vn.hasNextSibling?Vn.ancestorHasNextSibling:Vn.ancestorIsLastChild,T=[..._.slice(0,_.length-1),M],L=Array(W+1).fill(" "),S=Array(N-W).fill(Vn.selectedChar),D=V.length+2,P=Array(G.length+D).fill(" ");return[Vn.selectedLine,T.join(" "),[...P,...L,...S].join("")].join(" ")+`
`}({indent:b,isSelected:E,node:h,nodeKeyDisplay:x,selection:f,typeDisplay:C})}),f===null?": null":g.$isRangeSelection(f)?function(h){let b="";const x=Bd(h);b+=`: range ${x!==""?`{ ${x} }`:""} ${h.style!==""?`{ style: ${h.style} } `:""}`;const C=h.anchor,E=h.focus,_=C.offset,A=E.offset;return b+=`
  ├ anchor { key: ${C.key}, offset: ${_===null?"null":_}, type: ${C.type} }`,b+=`
  └ focus { key: ${E.key}, offset: ${A===null?"null":A}, type: ${E.type} }`,b}(f):mf.$isTableSelection(f)?function(h){return`: table
  └ { table: ${h.tableKey}, anchorCell: ${h.anchor.key}, focusCell: ${h.focus.key} }`}(f):function(h){return g.$isNodeSelection(h)?`: node
  └ [${Array.from(h._nodes).join(", ")}]`:""}(f)});if(u+=`
 selection`+d,u+=`

 commands:`,e.length)for(const{index:f,type:h,payload:b}of e)u+=`
  └ ${f}. { type: ${h}, payload: ${b instanceof Event?b.constructor.name:b} }`;else u+=`
  └ None dispatched.`;const{version:p}=t.constructor;return u+=`

 editor${p?` (v${p})`:""}:`,u+=`
  └ namespace ${i.namespace}`,a!==null&&(u+=`
  └ compositionKey ${a}`),u+=`
  └ editable ${String(c)}`,u}function Kh(t,e,n=[]){const r=t.getChildren(),o=r.length;r.forEach((s,i)=>{e(s,n.concat(i===o-1?Vn.isLastChild:Vn.hasNextSibling)),g.$isElementNode(s)&&Kh(s,e,n.concat(i===o-1?Vn.ancestorIsLastChild:Vn.ancestorHasNextSibling))})}function Fd(t,e=!1){const n=Object.entries(Gh).reduce((r,[o,s])=>r.replace(new RegExp(o,"g"),String(s)),t);return e?n.replace(/[^\s]/g,"*"):n}function bx(t){let e=wx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="detail: "+e),e}function vx(t){let e=mx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="mode: "+e),e}function Bd(t){let e=fx.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="format: "+e),e}function xx(t){let e=t.getTarget();return e!=null&&(e="target: "+e),e}function yx(t){let e=t.getRel();return e!=null&&(e="rel: "+e),e}function _x(t){let e=t.getTitle();return e!=null&&(e="title: "+e),e}function qd(t){if(!t.__state)return!1;const e=[];for(const[r,o]of t.__state.knownState.entries()){if(r.isEqual(o,r.defaultValue))continue;const s=JSON.stringify(r.unparse(o));e.push(`[${r.key}: ${s}]`)}let n=e.join(",");return n!==""&&(n="state: "+n),n}function Yh(t,e){const n=new Array(1+e++).join("  "),r=new Array(e-1).join("  ");let o;for(let s=0;s<t.children.length;s++)o=document.createTextNode(`
`+n),t.insertBefore(o,t.children[s]),Yh(t.children[s],e),t.lastElementChild===t.children[s]&&(o=document.createTextNode(`
`+r),t.appendChild(o));return t}const Cx=w.forwardRef(function({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:o,timeTravelPanelClassName:s,editorState:i,setEditorState:a,setEditorReadOnly:c,generateContent:u,commandsLog:d=[]},p){const[f,h]=w.useState([]),[b,x]=w.useState(""),[C,E]=w.useState(!1),[_,A]=w.useState(!1),j=w.useRef(0),G=w.useRef(null),[O,V]=w.useState(!1),[F,$]=w.useState(!1),[W,N]=w.useState(!1),M=w.useRef(),T=w.useRef([]),L=w.useRef(0),S=w.useCallback(P=>{const H=++L.current;u(P).then(B=>{H===L.current&&x(B)}).catch(B=>{H===L.current&&x(`Error rendering tree: ${B.message}

Stack:
${B.stack}`)})},[u]);w.useEffect(()=>{if(!(!W&&i._nodeMap.size>1e3&&($(!0),!W))&&(M.current!==i||T.current!==d)){const P=M.current!==i;M.current=i,T.current=d,S(_),!C&&P&&h(H=>[...H,[Date.now(),i]])}},[i,S,_,W,C,d]);const D=f.length;return w.useEffect(()=>{if(O){let P;const H=()=>{const B=j.current;if(B===D-1)return void V(!1);const z=f[B][0],J=f[B+1][0];P=setTimeout(()=>{j.current++;const ee=j.current,te=G.current;te!==null&&(te.value=String(ee)),a(f[ee][1]),H()},J-z)};return H(),()=>{clearTimeout(P)}}},[f,O,D,a]),l.jsxs("div",{className:o,children:[!W&&F?l.jsxs("div",{style:{padding:20},children:[l.jsx("span",{style:{marginRight:20},children:"Detected large EditorState, this can impact debugging performance."}),l.jsx("button",{onClick:()=>{N(!0)},style:{background:"transparent",border:"1px solid white",color:"white",cursor:"pointer",padding:5},children:"Show full tree"})]}):null,W?null:l.jsx("button",{onClick:()=>(S(!_),void A(!_)),className:t,type:"button",children:_?"Tree":"Export DOM"}),!C&&(W||!F)&&D>2&&l.jsx("button",{onClick:()=>{c(!0),j.current=D-1,E(!0)},className:e,type:"button",children:"Time Travel"}),(W||!F)&&l.jsx("pre",{ref:p,children:b}),C&&(W||!F)&&l.jsxs("div",{className:s,children:[l.jsx("button",{className:r,onClick:()=>{j.current===D-1&&(j.current=1),V(!O)},type:"button",children:O?"Pause":"Play"}),l.jsx("input",{className:n,ref:G,onChange:P=>{const H=Number(P.target.value),B=f[H];B&&(j.current=H,a(B[1]))},type:"range",min:"1",max:D-1}),l.jsx("button",{className:r,onClick:()=>{c(!1);const P=f.length-1,H=f[P];a(H[1]);const B=G.current;B!==null&&(B.value=String(P)),E(!1),V(!1)},type:"button",children:"Exit"})]})]})});function Ex(t,e){const n=new Set;let r=0;for(const[o]of t._commands)n.add(t.registerCommand(o,s=>(e(i=>{r+=1;const a=[...i];return a.push({index:r,payload:s,type:o.type?o.type:"UNKNOWN"}),a.length>10&&a.shift(),a}),!1),g.COMMAND_PRIORITY_CRITICAL));return()=>n.forEach(o=>o())}function kx(t){const[e,n]=w.useState([]);return w.useEffect(()=>Ex(t,n),[t]),w.useMemo(()=>e,[e])}function Nx({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,timeTravelPanelClassName:o,viewClassName:s,editor:i,customPrintNode:a}){const c=Mo.createRef(),[u,d]=w.useState(i.getEditorState()),p=kx(i);return w.useEffect(()=>At(i.registerUpdateListener(({editorState:f})=>{d(f)}),i.registerEditableListener(()=>{d(i.getEditorState())})),[i]),w.useEffect(()=>{const f=c.current;if(f!==null)return f.__lexicalEditor=i,()=>{f.__lexicalEditor=null}},[i,c]),l.jsx(Cx,{treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:s,timeTravelPanelClassName:o,setEditorReadOnly:f=>{const h=i.getRootElement();h!=null&&(h.contentEditable=f?"false":"true")},editorState:u,setEditorState:f=>i.setEditorState(f),generateContent:async function(f){return gx(i,p,f,a)},ref:c,commandsLog:p})}function Wh({editorRef:t}){const[e]=ye();return Mo.useEffect(()=>{typeof t=="function"?t(e):typeof t=="object"&&(t.current=e)},[e]),null}const Ri=0,Yl=1,Wl=2,En=0,Tx=1,Ud=2,Sx=3,Ax=4;function Dx(t,e,n,r,o){if(t===null||n.size===0&&r.size===0&&!o)return En;const s=e._selection,i=t._selection;if(o)return Tx;if(!(g.$isRangeSelection(s)&&g.$isRangeSelection(i)&&i.isCollapsed()&&s.isCollapsed()))return En;const a=function(E,_,A){const j=E._nodeMap,G=[];for(const O of _){const V=j.get(O);V!==void 0&&G.push(V)}for(const[O,V]of A){if(!V)continue;const F=j.get(O);F===void 0||g.$isRootNode(F)||G.push(F)}return G}(e,n,r);if(a.length===0)return En;if(a.length>1){const E=e._nodeMap,_=E.get(s.anchor.key),A=E.get(i.anchor.key);return _&&A&&!t._nodeMap.has(_.__key)&&g.$isTextNode(_)&&_.__text.length===1&&s.anchor.offset===1?Ud:En}const c=a[0],u=t._nodeMap.get(c.__key);if(!g.$isTextNode(u)||!g.$isTextNode(c)||u.__mode!==c.__mode)return En;const d=u.__text,p=c.__text;if(d===p)return En;const f=s.anchor,h=i.anchor;if(f.key!==h.key||f.type!=="text")return En;const b=f.offset,x=h.offset,C=p.length-d.length;return C===1&&x===b-1?Ud:C===-1&&x===b+1?Sx:C===-1&&x===b?Ax:En}function Mx(t,e){let n=Date.now(),r=En;return(o,s,i,a,c,u)=>{const d=Date.now();if(u.has(g.HISTORIC_TAG))return r=En,n=d,Wl;const p=Dx(o,s,a,c,t.isComposing()),f=(()=>{const h=i===null||i.editor===t,b=u.has(g.HISTORY_PUSH_TAG);if(!b&&h&&u.has(g.HISTORY_MERGE_TAG))return Ri;if(o===null)return Yl;const x=s._selection;return a.size>0||c.size>0?b===!1&&p!==En&&p===r&&d<n+e&&h||a.size===1&&function(C,E,_){const A=E._nodeMap.get(C),j=_._nodeMap.get(C),G=E._selection,O=_._selection;return!(g.$isRangeSelection(G)&&g.$isRangeSelection(O)&&G.anchor.type==="element"&&G.focus.type==="element"&&O.anchor.type==="text"&&O.focus.type==="text"||!g.$isTextNode(A)||!g.$isTextNode(j)||A.__parent!==j.__parent)&&JSON.stringify(E.read(()=>A.exportJSON()))===JSON.stringify(_.read(()=>j.exportJSON()))}(Array.from(a)[0],o,s)?Ri:Yl:x!==null?Ri:Wl})();return n=d,r=p,f}}function Vd(t){t.undoStack=[],t.redoStack=[],t.current=null}function Rx(t,e,n){const r=Mx(t,n);return At(t.registerCommand(g.UNDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(c.length!==0){const u=i.current,d=c.pop();u!==null&&(a.push(u),s.dispatchCommand(g.CAN_REDO_COMMAND,!0)),c.length===0&&s.dispatchCommand(g.CAN_UNDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REDO_COMMAND,()=>(function(s,i){const a=i.redoStack,c=i.undoStack;if(a.length!==0){const u=i.current;u!==null&&(c.push(u),s.dispatchCommand(g.CAN_UNDO_COMMAND,!0));const d=a.pop();a.length===0&&s.dispatchCommand(g.CAN_REDO_COMMAND,!1),i.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_EDITOR_COMMAND,()=>(Vd(e),!1),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_HISTORY_COMMAND,()=>(Vd(e),t.dispatchCommand(g.CAN_REDO_COMMAND,!1),t.dispatchCommand(g.CAN_UNDO_COMMAND,!1),!0),g.COMMAND_PRIORITY_EDITOR),t.registerUpdateListener(({editorState:s,prevEditorState:i,dirtyLeaves:a,dirtyElements:c,tags:u})=>{const d=e.current,p=e.redoStack,f=e.undoStack,h=d===null?null:d.editorState;if(d!==null&&s===h)return;const b=r(i,s,d,a,c,u);if(b===Yl)p.length!==0&&(e.redoStack=[],t.dispatchCommand(g.CAN_REDO_COMMAND,!1)),d!==null&&(f.push({...d}),t.dispatchCommand(g.CAN_UNDO_COMMAND,!0));else if(b===Wl)return;e.current={editor:t,editorState:s}}))}function Ox(){return{current:null,redoStack:[],undoStack:[]}}function Jh({delay:t,externalHistoryState:e}){const[n]=ye();return function(r,o,s=1e3){const i=w.useMemo(()=>o||Ox(),[o]);w.useEffect(()=>Rx(r,i,s),[s,r,i])}(n,e,t),null}const Wi=Math.min,Jr=Math.max,Ji=Math.round,Oi=Math.floor,Kn=t=>({x:t,y:t}),jx={left:"right",right:"left",bottom:"top",top:"bottom"},Ix={start:"end",end:"start"};function Hd(t,e,n){return Jr(t,Wi(e,n))}function Kc(t,e){return typeof t=="function"?t(e):t}function Bo(t){return t.split("-")[0]}function Yc(t){return t.split("-")[1]}function Xh(t){return t==="x"?"y":"x"}function Qh(t){return t==="y"?"height":"width"}const Lx=new Set(["top","bottom"]);function Yr(t){return Lx.has(Bo(t))?"y":"x"}function Zh(t){return Xh(Yr(t))}function Px(t,e,n){n===void 0&&(n=!1);const r=Yc(t),o=Zh(t),s=Qh(o);let i=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(i=Xi(i)),[i,Xi(i)]}function $x(t){const e=Xi(t);return[Jl(t),e,Jl(e)]}function Jl(t){return t.replace(/start|end/g,e=>Ix[e])}const zd=["left","right"],Gd=["right","left"],Fx=["top","bottom"],Bx=["bottom","top"];function qx(t,e,n){switch(t){case"top":case"bottom":return n?e?Gd:zd:e?zd:Gd;case"left":case"right":return e?Fx:Bx;default:return[]}}function Ux(t,e,n,r){const o=Yc(t);let s=qx(Bo(t),n==="start",r);return o&&(s=s.map(i=>i+"-"+o),e&&(s=s.concat(s.map(Jl)))),s}function Xi(t){return t.replace(/left|right|bottom|top/g,e=>jx[e])}function Vx(t){return{top:0,right:0,bottom:0,left:0,...t}}function Hx(t){return typeof t!="number"?Vx(t):{top:t,right:t,bottom:t,left:t}}function Qi(t){const{x:e,y:n,width:r,height:o}=t;return{width:r,height:o,top:n,left:e,right:e+r,bottom:n+o,x:e,y:n}}function Kd(t,e,n){let{reference:r,floating:o}=t;const s=Yr(e),i=Zh(e),a=Qh(i),c=Bo(e),u=s==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,f=r[a]/2-o[a]/2;let h;switch(c){case"top":h={x:d,y:r.y-o.height};break;case"bottom":h={x:d,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-o.width,y:p};break;default:h={x:r.x,y:r.y}}switch(Yc(e)){case"start":h[i]-=f*(n&&u?-1:1);break;case"end":h[i]+=f*(n&&u?-1:1);break}return h}const zx=async(t,e,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:s=[],platform:i}=n,a=s.filter(Boolean),c=await(i.isRTL==null?void 0:i.isRTL(e));let u=await i.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Kd(u,r,c),f=r,h={},b=0;for(let x=0;x<a.length;x++){const{name:C,fn:E}=a[x],{x:_,y:A,data:j,reset:G}=await E({x:d,y:p,initialPlacement:r,placement:f,strategy:o,middlewareData:h,rects:u,platform:i,elements:{reference:t,floating:e}});d=_??d,p=A??p,h={...h,[C]:{...h[C],...j}},G&&b<=50&&(b++,typeof G=="object"&&(G.placement&&(f=G.placement),G.rects&&(u=G.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:o}):G.rects),{x:d,y:p}=Kd(u,f,c)),x=-1)}return{x:d,y:p,placement:f,strategy:o,middlewareData:h}};async function ew(t,e){var n;e===void 0&&(e={});const{x:r,y:o,platform:s,rects:i,elements:a,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:f=!1,padding:h=0}=Kc(e,t),b=Hx(h),C=a[f?p==="floating"?"reference":"floating":p],E=Qi(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(C)))==null||n?C:C.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:u,rootBoundary:d,strategy:c})),_=p==="floating"?{x:r,y:o,width:i.floating.width,height:i.floating.height}:i.reference,A=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),j=await(s.isElement==null?void 0:s.isElement(A))?await(s.getScale==null?void 0:s.getScale(A))||{x:1,y:1}:{x:1,y:1},G=Qi(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:_,offsetParent:A,strategy:c}):_);return{top:(E.top-G.top+b.top)/j.y,bottom:(G.bottom-E.bottom+b.bottom)/j.y,left:(E.left-G.left+b.left)/j.x,right:(G.right-E.right+b.right)/j.x}}const Gx=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,r;const{placement:o,middlewareData:s,rects:i,initialPlacement:a,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=!0,...C}=Kc(t,e);if((n=s.arrow)!=null&&n.alignmentOffset)return{};const E=Bo(o),_=Yr(a),A=Bo(a)===a,j=await(c.isRTL==null?void 0:c.isRTL(u.floating)),G=f||(A||!x?[Xi(a)]:$x(a)),O=b!=="none";!f&&O&&G.push(...Ux(a,x,b,j));const V=[a,...G],F=await ew(e,C),$=[];let W=((r=s.flip)==null?void 0:r.overflows)||[];if(d&&$.push(F[E]),p){const L=Px(o,i,j);$.push(F[L[0]],F[L[1]])}if(W=[...W,{placement:o,overflows:$}],!$.every(L=>L<=0)){var N,M;const L=(((N=s.flip)==null?void 0:N.index)||0)+1,S=V[L];if(S&&(!(p==="alignment"?_!==Yr(S):!1)||W.every(H=>Yr(H.placement)===_?H.overflows[0]>0:!0)))return{data:{index:L,overflows:W},reset:{placement:S}};let D=(M=W.filter(P=>P.overflows[0]<=0).sort((P,H)=>P.overflows[1]-H.overflows[1])[0])==null?void 0:M.placement;if(!D)switch(h){case"bestFit":{var T;const P=(T=W.filter(H=>{if(O){const B=Yr(H.placement);return B===_||B==="y"}return!0}).map(H=>[H.placement,H.overflows.filter(B=>B>0).reduce((B,z)=>B+z,0)]).sort((H,B)=>H[1]-B[1])[0])==null?void 0:T[0];P&&(D=P);break}case"initialPlacement":D=a;break}if(o!==D)return{reset:{placement:D}}}return{}}}},Kx=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:o}=e,{mainAxis:s=!0,crossAxis:i=!1,limiter:a={fn:C=>{let{x:E,y:_}=C;return{x:E,y:_}}},...c}=Kc(t,e),u={x:n,y:r},d=await ew(e,c),p=Yr(Bo(o)),f=Xh(p);let h=u[f],b=u[p];if(s){const C=f==="y"?"top":"left",E=f==="y"?"bottom":"right",_=h+d[C],A=h-d[E];h=Hd(_,h,A)}if(i){const C=p==="y"?"top":"left",E=p==="y"?"bottom":"right",_=b+d[C],A=b-d[E];b=Hd(_,b,A)}const x=a.fn({...e,[f]:h,[p]:b});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:s,[p]:i}}}}}};function Aa(){return typeof window<"u"}function os(t){return tw(t)?(t.nodeName||"").toLowerCase():"#document"}function un(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Zn(t){var e;return(e=(tw(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function tw(t){return Aa()?t instanceof Node||t instanceof un(t).Node:!1}function An(t){return Aa()?t instanceof Element||t instanceof un(t).Element:!1}function Xn(t){return Aa()?t instanceof HTMLElement||t instanceof un(t).HTMLElement:!1}function Yd(t){return!Aa()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof un(t).ShadowRoot}const Yx=new Set(["inline","contents"]);function si(t){const{overflow:e,overflowX:n,overflowY:r,display:o}=Dn(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+n)&&!Yx.has(o)}const Wx=new Set(["table","td","th"]);function Jx(t){return Wx.has(os(t))}const Xx=[":popover-open",":modal"];function Da(t){return Xx.some(e=>{try{return t.matches(e)}catch{return!1}})}const Qx=["transform","translate","scale","rotate","perspective"],Zx=["transform","translate","scale","rotate","perspective","filter"],ey=["paint","layout","strict","content"];function Wc(t){const e=Jc(),n=An(t)?Dn(t):t;return Qx.some(r=>n[r]?n[r]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||Zx.some(r=>(n.willChange||"").includes(r))||ey.some(r=>(n.contain||"").includes(r))}function ty(t){let e=Nr(t);for(;Xn(e)&&!qo(e);){if(Wc(e))return e;if(Da(e))return null;e=Nr(e)}return null}function Jc(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const ny=new Set(["html","body","#document"]);function qo(t){return ny.has(os(t))}function Dn(t){return un(t).getComputedStyle(t)}function Ma(t){return An(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Nr(t){if(os(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Yd(t)&&t.host||Zn(t);return Yd(e)?e.host:e}function nw(t){const e=Nr(t);return qo(e)?t.ownerDocument?t.ownerDocument.body:t.body:Xn(e)&&si(e)?e:nw(e)}function Ls(t,e,n){var r;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=nw(t),s=o===((r=t.ownerDocument)==null?void 0:r.body),i=un(o);if(s){const a=Xl(i);return e.concat(i,i.visualViewport||[],si(o)?o:[],a&&n?Ls(a):[])}return e.concat(o,Ls(o,[],n))}function Xl(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function rw(t){const e=Dn(t);let n=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const o=Xn(t),s=o?t.offsetWidth:n,i=o?t.offsetHeight:r,a=Ji(n)!==s||Ji(r)!==i;return a&&(n=s,r=i),{width:n,height:r,$:a}}function Xc(t){return An(t)?t:t.contextElement}function jo(t){const e=Xc(t);if(!Xn(e))return Kn(1);const n=e.getBoundingClientRect(),{width:r,height:o,$:s}=rw(e);let i=(s?Ji(n.width):n.width)/r,a=(s?Ji(n.height):n.height)/o;return(!i||!Number.isFinite(i))&&(i=1),(!a||!Number.isFinite(a))&&(a=1),{x:i,y:a}}const ry=Kn(0);function ow(t){const e=un(t);return!Jc()||!e.visualViewport?ry:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function oy(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==un(t)?!1:e}function no(t,e,n,r){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),s=Xc(t);let i=Kn(1);e&&(r?An(r)&&(i=jo(r)):i=jo(t));const a=oy(s,n,r)?ow(s):Kn(0);let c=(o.left+a.x)/i.x,u=(o.top+a.y)/i.y,d=o.width/i.x,p=o.height/i.y;if(s){const f=un(s),h=r&&An(r)?un(r):r;let b=f,x=Xl(b);for(;x&&r&&h!==b;){const C=jo(x),E=x.getBoundingClientRect(),_=Dn(x),A=E.left+(x.clientLeft+parseFloat(_.paddingLeft))*C.x,j=E.top+(x.clientTop+parseFloat(_.paddingTop))*C.y;c*=C.x,u*=C.y,d*=C.x,p*=C.y,c+=A,u+=j,b=un(x),x=Xl(b)}}return Qi({width:d,height:p,x:c,y:u})}function Ra(t,e){const n=Ma(t).scrollLeft;return e?e.left+n:no(Zn(t)).left+n}function sw(t,e){const n=t.getBoundingClientRect(),r=n.left+e.scrollLeft-Ra(t,n),o=n.top+e.scrollTop;return{x:r,y:o}}function sy(t){let{elements:e,rect:n,offsetParent:r,strategy:o}=t;const s=o==="fixed",i=Zn(r),a=e?Da(e.floating):!1;if(r===i||a&&s)return n;let c={scrollLeft:0,scrollTop:0},u=Kn(1);const d=Kn(0),p=Xn(r);if((p||!p&&!s)&&((os(r)!=="body"||si(i))&&(c=Ma(r)),Xn(r))){const h=no(r);u=jo(r),d.x=h.x+r.clientLeft,d.y=h.y+r.clientTop}const f=i&&!p&&!s?sw(i,c):Kn(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+f.x,y:n.y*u.y-c.scrollTop*u.y+d.y+f.y}}function iy(t){return Array.from(t.getClientRects())}function ay(t){const e=Zn(t),n=Ma(t),r=t.ownerDocument.body,o=Jr(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),s=Jr(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let i=-n.scrollLeft+Ra(t);const a=-n.scrollTop;return Dn(r).direction==="rtl"&&(i+=Jr(e.clientWidth,r.clientWidth)-o),{width:o,height:s,x:i,y:a}}const Wd=25;function ly(t,e){const n=un(t),r=Zn(t),o=n.visualViewport;let s=r.clientWidth,i=r.clientHeight,a=0,c=0;if(o){s=o.width,i=o.height;const d=Jc();(!d||d&&e==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}const u=Ra(r);if(u<=0){const d=r.ownerDocument,p=d.body,f=getComputedStyle(p),h=d.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(r.clientWidth-p.clientWidth-h);b<=Wd&&(s-=b)}else u<=Wd&&(s+=u);return{width:s,height:i,x:a,y:c}}const cy=new Set(["absolute","fixed"]);function uy(t,e){const n=no(t,!0,e==="fixed"),r=n.top+t.clientTop,o=n.left+t.clientLeft,s=Xn(t)?jo(t):Kn(1),i=t.clientWidth*s.x,a=t.clientHeight*s.y,c=o*s.x,u=r*s.y;return{width:i,height:a,x:c,y:u}}function Jd(t,e,n){let r;if(e==="viewport")r=ly(t,n);else if(e==="document")r=ay(Zn(t));else if(An(e))r=uy(e,n);else{const o=ow(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Qi(r)}function iw(t,e){const n=Nr(t);return n===e||!An(n)||qo(n)?!1:Dn(n).position==="fixed"||iw(n,e)}function dy(t,e){const n=e.get(t);if(n)return n;let r=Ls(t,[],!1).filter(a=>An(a)&&os(a)!=="body"),o=null;const s=Dn(t).position==="fixed";let i=s?Nr(t):t;for(;An(i)&&!qo(i);){const a=Dn(i),c=Wc(i);!c&&a.position==="fixed"&&(o=null),(s?!c&&!o:!c&&a.position==="static"&&!!o&&cy.has(o.position)||si(i)&&!c&&iw(t,i))?r=r.filter(d=>d!==i):o=a,i=Nr(i)}return e.set(t,r),r}function py(t){let{element:e,boundary:n,rootBoundary:r,strategy:o}=t;const i=[...n==="clippingAncestors"?Da(e)?[]:dy(e,this._c):[].concat(n),r],a=i[0],c=i.reduce((u,d)=>{const p=Jd(e,d,o);return u.top=Jr(p.top,u.top),u.right=Wi(p.right,u.right),u.bottom=Wi(p.bottom,u.bottom),u.left=Jr(p.left,u.left),u},Jd(e,a,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function fy(t){const{width:e,height:n}=rw(t);return{width:e,height:n}}function hy(t,e,n){const r=Xn(e),o=Zn(e),s=n==="fixed",i=no(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=Kn(0);function u(){c.x=Ra(o)}if(r||!r&&!s)if((os(e)!=="body"||si(o))&&(a=Ma(e)),r){const h=no(e,!0,s,e);c.x=h.x+e.clientLeft,c.y=h.y+e.clientTop}else o&&u();s&&!r&&o&&u();const d=o&&!r&&!s?sw(o,a):Kn(0),p=i.left+a.scrollLeft-c.x-d.x,f=i.top+a.scrollTop-c.y-d.y;return{x:p,y:f,width:i.width,height:i.height}}function wl(t){return Dn(t).position==="static"}function Xd(t,e){if(!Xn(t)||Dn(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return Zn(t)===n&&(n=n.ownerDocument.body),n}function aw(t,e){const n=un(t);if(Da(t))return n;if(!Xn(t)){let o=Nr(t);for(;o&&!qo(o);){if(An(o)&&!wl(o))return o;o=Nr(o)}return n}let r=Xd(t,e);for(;r&&Jx(r)&&wl(r);)r=Xd(r,e);return r&&qo(r)&&wl(r)&&!Wc(r)?n:r||ty(t)||n}const wy=async function(t){const e=this.getOffsetParent||aw,n=this.getDimensions,r=await n(t.floating);return{reference:hy(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function my(t){return Dn(t).direction==="rtl"}const gy={convertOffsetParentRelativeRectToViewportRelativeRect:sy,getDocumentElement:Zn,getClippingRect:py,getOffsetParent:aw,getElementRects:wy,getClientRects:iy,getDimensions:fy,getScale:jo,isElement:An,isRTL:my};function lw(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function by(t,e){let n=null,r;const o=Zn(t);function s(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function i(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),s();const u=t.getBoundingClientRect(),{left:d,top:p,width:f,height:h}=u;if(a||e(),!f||!h)return;const b=Oi(p),x=Oi(o.clientWidth-(d+f)),C=Oi(o.clientHeight-(p+h)),E=Oi(d),A={rootMargin:-b+"px "+-x+"px "+-C+"px "+-E+"px",threshold:Jr(0,Wi(1,c))||1};let j=!0;function G(O){const V=O[0].intersectionRatio;if(V!==c){if(!j)return i();V?i(!1,V):r=setTimeout(()=>{i(!1,1e-7)},1e3)}V===1&&!lw(u,t.getBoundingClientRect())&&i(),j=!1}try{n=new IntersectionObserver(G,{...A,root:o.ownerDocument})}catch{n=new IntersectionObserver(G,A)}n.observe(t)}return i(!0),s}function vy(t,e,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,u=Xc(t),d=o||s?[...u?Ls(u):[],...Ls(e)]:[];d.forEach(E=>{o&&E.addEventListener("scroll",n,{passive:!0}),s&&E.addEventListener("resize",n)});const p=u&&a?by(u,n):null;let f=-1,h=null;i&&(h=new ResizeObserver(E=>{let[_]=E;_&&_.target===u&&h&&(h.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var A;(A=h)==null||A.observe(e)})),n()}),u&&!c&&h.observe(u),h.observe(e));let b,x=c?no(t):null;c&&C();function C(){const E=no(t);x&&!lw(x,E)&&n(),x=E,b=requestAnimationFrame(C)}return n(),()=>{var E;d.forEach(_=>{o&&_.removeEventListener("scroll",n),s&&_.removeEventListener("resize",n)}),p==null||p(),(E=h)==null||E.disconnect(),h=null,c&&cancelAnimationFrame(b)}}const xy=Kx,yy=Gx,_y=(t,e,n)=>{const r=new Map,o={platform:gy,...n},s={...o.platform,_c:r};return zx(t,e,{...o,platform:s})},Ql=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Cy=Ql?w.useLayoutEffect:w.useEffect;let Ey=class{constructor(e){this.key=e,this.ref={current:null},this.setRefElement=this.setRefElement.bind(this)}setRefElement(e){this.ref={current:e}}};const Qd=t=>{const e=document.getElementById("typeahead-menu");if(!e)return;const n=e.getBoundingClientRect();n.top+n.height>window.innerHeight&&e.scrollIntoView({block:"center"}),n.top<0&&e.scrollIntoView({block:"center"}),t.scrollIntoView({block:"nearest"})};function Zd(t,e){const n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top>r.top&&n.top<r.bottom}function ky(t,e,n,r){const[o]=ye();w.useEffect(()=>{if(e!=null&&t!=null){const s=o.getRootElement(),i=s!=null?function(p,f){let h=getComputedStyle(p);const b=h.position==="absolute",x=/(auto|scroll)/;if(h.position==="fixed")return document.body;for(let C=p;C=C.parentElement;)if(h=getComputedStyle(C),(!b||h.position!=="static")&&x.test(h.overflow+h.overflowY+h.overflowX))return C;return document.body}(s):document.body;let a=!1,c=Zd(e,i);const u=function(){a||(window.requestAnimationFrame(function(){n(),a=!1}),a=!0);const p=Zd(e,i);p!==c&&(c=p,r!=null&&r(p))},d=new ResizeObserver(n);return window.addEventListener("resize",n),document.addEventListener("scroll",u,{capture:!0,passive:!0}),d.observe(e),()=>{d.unobserve(e),window.removeEventListener("resize",n),document.removeEventListener("scroll",u,!0)}}},[e,o,r,n,t])}const ep=g.createCommand("SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND");function Ny({close:t,editor:e,anchorElementRef:n,resolution:r,options:o,menuRenderFn:s,onSelectOption:i,shouldSplitNodeWithQuery:a=!1,commandPriority:c=g.COMMAND_PRIORITY_LOW,preselectFirstItem:u=!0}){const[d,p]=w.useState(null),f=r.match&&r.match.matchingString;w.useEffect(()=>{u&&p(0)},[f,u]);const h=w.useCallback(x=>{e.update(()=>{const C=r.match!=null&&a?function(E){const _=g.$getSelection();if(!g.$isRangeSelection(_)||!_.isCollapsed())return null;const A=_.anchor;if(A.type!=="text")return null;const j=A.getNode();if(!j.isSimpleText())return null;const G=A.offset,O=j.getTextContent().slice(0,G),V=E.replaceableString.length,F=G-function(W,N,M){let T=M;for(let L=T;L<=N.length;L++)W.slice(-L)===N.substring(0,L)&&(T=L);return T}(O,E.matchingString,V);if(F<0)return null;let $;return F===0?[$]=j.splitText(G):[,$]=j.splitText(F,G),$}(r.match):null;i(x,C,t,r.match?r.match.matchingString:"")})},[e,a,r.match,i,t]),b=w.useCallback(x=>{const C=e.getRootElement();C!==null&&(C.setAttribute("aria-activedescendant","typeahead-item-"+x),p(x))},[e]);return w.useEffect(()=>()=>{const x=e.getRootElement();x!==null&&x.removeAttribute("aria-activedescendant")},[e]),Cy(()=>{o===null?p(null):d===null&&u&&b(0)},[o,d,b,u]),w.useEffect(()=>At(e.registerCommand(ep,({option:x})=>!(!x.ref||x.ref.current==null)&&(Qd(x.ref.current),!0),c)),[e,b,c]),w.useEffect(()=>At(e.registerCommand(g.KEY_ARROW_DOWN_COMMAND,x=>{const C=x;if(o!==null&&o.length){const E=d===null?0:d!==o.length-1?d+1:0;b(E);const _=o[E];_.ref!=null&&_.ref.current&&e.dispatchCommand(ep,{index:E,option:_}),C.preventDefault(),C.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ARROW_UP_COMMAND,x=>{const C=x;if(o!==null&&o.length){const E=d===null?o.length-1:d!==0?d-1:o.length-1;b(E);const _=o[E];_.ref!=null&&_.ref.current&&Qd(_.ref.current),C.preventDefault(),C.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ESCAPE_COMMAND,x=>{const C=x;return C.preventDefault(),C.stopImmediatePropagation(),t(),!0},c),e.registerCommand(g.KEY_TAB_COMMAND,x=>{const C=x;return o!==null&&d!==null&&o[d]!=null&&(C.preventDefault(),C.stopImmediatePropagation(),h(o[d]),!0)},c),e.registerCommand(g.KEY_ENTER_COMMAND,x=>o!==null&&d!==null&&o[d]!=null&&(x!==null&&(x.preventDefault(),x.stopImmediatePropagation()),h(o[d]),!0),c)),[h,t,e,o,d,b,c]),s(n,w.useMemo(()=>({options:o,selectOptionAndCleanUp:h,selectedIndex:d,setHighlightedIndex:p}),[h,d,o]),r.match?r.match.matchingString:"")}function tp(t,e){e!=null&&(t.className=e),t.setAttribute("aria-label","Typeahead menu"),t.setAttribute("role","listbox"),t.style.display="block",t.style.position="absolute"}function Ty({options:t,onWillOpen:e,onClose:n,onOpen:r,onSelectOption:o,menuRenderFn:s,anchorClassName:i,commandPriority:a=g.COMMAND_PRIORITY_LOW,parent:c}){const[u]=ye(),[d,p]=w.useState(null),f=Mo.useRef(null),h=function(_,A,j,G=Ql?document.body:void 0,O=!0){const[V]=ye(),F=Ql?document.createElement("div"):null,$=w.useRef(F),W=w.useCallback(()=>{if($.current===null||G===void 0)return;$.current.style.top=$.current.style.bottom;const M=V.getRootElement(),T=$.current,L=T.firstChild;if(M!==null&&_!==null){const{left:S,top:D,width:P,height:H}=_.getRect(),B=$.current.offsetHeight;if(T.style.top=`${D+B+3+(O?window.pageYOffset:0)}px`,T.style.left=`${S+window.pageXOffset}px`,T.style.height=`${H}px`,T.style.width=`${P}px`,L!==null){L.style.top=`${D}`;const z=L.getBoundingClientRect(),J=z.height,ee=z.width,te=M.getBoundingClientRect();S+ee>te.right&&(T.style.left=`${te.right-ee+window.pageXOffset}px`),(D+J>window.innerHeight||D+J>te.bottom)&&D-te.top>J+H&&(T.style.top=`${D-J-H+(O?window.pageYOffset:0)}px`)}T.isConnected||(tp(T,j),G.append(T)),T.setAttribute("id","typeahead-menu"),M.setAttribute("aria-controls","typeahead-menu")}},[V,_,O,j,G]);w.useEffect(()=>{const M=V.getRootElement();return _!==null&&W(),()=>{M!==null&&M.removeAttribute("aria-controls");const T=$.current;T!==null&&T.isConnected&&(T.remove(),T.removeAttribute("id"))}},[V,W,_]);const N=w.useCallback(M=>{_!==null&&(M||A(null))},[_,A]);return ky(_,$.current,W,N),F!=null&&F===$.current&&(tp(F,j),G!=null&&G.append(F)),$}(d,p,i,c),b=w.useCallback(()=>{p(null),n!=null&&d!==null&&n()},[n,d]),x=w.useCallback(_=>{p(_),r!=null&&d===null&&r(_)},[r,d]),C=w.useCallback(_=>{_.preventDefault(),e!=null&&e(_);const A=E0(_.target);x({getRect:()=>new DOMRect(_.clientX/A,_.clientY/A,1,1)})},[x,e]),E=w.useCallback(_=>{d!==null&&f.current!=null&&_.target!=null&&g.isDOMNode(_.target)&&!f.current.contains(_.target)&&b()},[b,d]);return w.useEffect(()=>{const _=u.getRootElement();if(_)return _.addEventListener("contextmenu",C),()=>_.removeEventListener("contextmenu",C)},[u,C]),w.useEffect(()=>(document.addEventListener("click",E),()=>document.removeEventListener("click",E)),[u,E]),h.current===null||d===null||u===null?null:l.jsx(Ny,{close:b,resolution:d,editor:u,anchorElementRef:h,options:t,menuRenderFn:(_,A)=>s(_,A,{setMenuRef:j=>{f.current=j}}),onSelectOption:o,commandPriority:a})}const np=[["Cat","rgb(125, 50, 0)"],["Dog","rgb(100, 0, 0)"],["Rabbit","rgb(150, 0, 0)"],["Frog","rgb(200, 0, 0)"],["Fox","rgb(200, 75, 0)"],["Hedgehog","rgb(0, 75, 0)"],["Pigeon","rgb(0, 125, 0)"],["Squirrel","rgb(75, 100, 0)"],["Bear","rgb(125, 100, 0)"],["Tiger","rgb(0, 0, 150)"],["Leopard","rgb(0, 0, 200)"],["Zebra","rgb(0, 0, 250)"],["Wolf","rgb(0, 100, 150)"],["Owl","rgb(0, 100, 100)"],["Gull","rgb(100, 0, 100)"],["Squid","rgb(150, 0, 150)"]],rp=np[Math.floor(Math.random()*np.length)],Sy=w.createContext({clientID:0,color:rp[1],isCollabActive:!1,name:rp[0],yjsDocMap:new Map});function cw(t,e){return w.useContext(Sy)}function Ay(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Dy(t,e=g.$getSelection()){return e==null&&Ay(166),g.$isRangeSelection(e)&&e.isCollapsed()||e.getNodes().length===0?"":Dc(t,e)}function op(t,e){const n=t.getData("text/plain")||t.getData("text/uri-list");n!=null&&e.insertRawText(n)}const ss=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,My=ss&&"documentMode"in document?document.documentMode:null,Ry=!(!ss||!("InputEvent"in window)||My)&&"getTargetRanges"in new window.InputEvent("input"),Oy=ss&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),sp=ss&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,jy=ss&&/^(?=.*Chrome).*/i.test(navigator.userAgent),Iy=ss&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!jy;function ip(t,e){e.update(()=>{if(t!==null){const n=zf(t,KeyboardEvent)?null:t.clipboardData,r=g.$getSelection();if(r!==null&&n!=null){t.preventDefault();const o=Dy(e);o!==null&&n.setData("text/html",o),n.setData("text/plain",r.getTextContent())}}})}function Ly(t){return At(t.registerCommand(g.DELETE_CHARACTER_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteCharacter(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_WORD_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteWord(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_LINE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteLine(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CONTROLLED_TEXT_INSERTION_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(typeof e=="string")n.insertText(e);else{const r=e.dataTransfer;if(r!=null)op(r,n);else{const o=e.data;o&&n.insertText(o)}}return!0},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REMOVE_TEXT_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.removeText(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_LINE_BREAK_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.insertLineBreak(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_PARAGRAPH_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.insertLineBreak(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_LEFT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!0)&&(r.preventDefault(),nd(n,o,!0),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_RIGHT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!td(n,!1)&&(r.preventDefault(),nd(n,o,!1),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_BACKSPACE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(!sp||navigator.language!=="ko-KR")&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!0))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_DELETE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!1))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ENTER_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(e!==null){if((sp||Oy||Iy)&&Ry)return!1;e.preventDefault()}return t.dispatchCommand(g.INSERT_LINE_BREAK_COMMAND,!1)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.SELECT_ALL_COMMAND,()=>(g.$selectAll(),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.COPY_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(ip(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CUT_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){ip(r,o),o.update(()=>{const s=g.$getSelection();g.$isRangeSelection(s)&&s.removeText()})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.PASTE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){r.preventDefault(),o.update(()=>{const s=g.$getSelection(),i=zf(r,ClipboardEvent)?r.clipboardData:null;i!=null&&g.$isRangeSelection(s)&&op(i,s)},{tag:g.PASTE_TAG})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DROP_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DRAGSTART_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR))}const Zl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function ap(t){return t.getEditorState().read(jc(t.isComposing()))}function Py({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=ye(),o=function(s,i){const[a,c]=w.useState(()=>s.getDecorators());return Zl(()=>s.registerDecoratorListener(u=>{fn.flushSync(()=>{c(u)})}),[s]),w.useEffect(()=>{c(s.getDecorators())},[s]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(i,{onError:x=>s._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=s.getElementByKey(f);b!==null&&u.push(fn.createPortal(h,b,f))}return u},[i,a,s])}(r,n);return function(s){Zl(()=>At(Ly(s),oh(s)),[s])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx($y,{content:e}),o]})}function $y({content:t}){const[e]=ye(),n=function(o){const[s,i]=w.useState(()=>ap(o));return Zl(()=>{function a(){const c=ap(o);i(c)}return a(),At(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),s}(e),r=th();return n?typeof t=="function"?t(r):t:null}const Yn=()=>new Map,ec=t=>{const e=Yn();return t.forEach((n,r)=>{e.set(r,n)}),e},is=(t,e,n)=>{let r=t.get(e);return r===void 0&&t.set(e,r=n()),r},Fy=(t,e)=>{const n=[];for(const[r,o]of t)n.push(e(o,r));return n},By=(t,e)=>{for(const[n,r]of t)if(e(r,n))return!0;return!1},Uo=()=>new Set,ml=t=>t[t.length-1],Vo=Array.from,qy=Array.isArray;class Uy{constructor(){this._observers=Yn()}on(e,n){return is(this._observers,e,Uo).add(n),n}once(e,n){const r=(...o)=>{this.off(e,r),n(...o)};this.on(e,r)}off(e,n){const r=this._observers.get(e);r!==void 0&&(r.delete(n),r.size===0&&this._observers.delete(e))}emit(e,n){return Vo((this._observers.get(e)||Yn()).values()).forEach(r=>r(...n))}destroy(){this._observers=Yn()}}const ro=Math.floor,Bi=Math.abs,uw=(t,e)=>t<e?t:e,as=(t,e)=>t>e?t:e,Vy=t=>t!==0?t<0:1/t<0,lp=1,cp=2,gl=4,bl=8,Hy=32,dw=64,Zi=128,zy=31,up=63,As=127,Gy=2147483647,Ky=Number.isInteger||(t=>typeof t=="number"&&isFinite(t)&&ro(t)===t),Yy=t=>t.toLowerCase(),Wy=/^\s*/g,Jy=t=>t.replace(Wy,""),Xy=/([A-Z])/g,dp=(t,e)=>Jy(t.replace(Xy,n=>`${e}${Yy(n)}`)),Qy=t=>{const e=unescape(encodeURIComponent(t)),n=e.length,r=new Uint8Array(n);for(let o=0;o<n;o++)r[o]=e.codePointAt(o);return r},Ps=typeof TextEncoder<"u"?new TextEncoder:null,Zy=t=>Ps.encode(t),e2=Ps?Zy:Qy;let vl=typeof TextDecoder>"u"?null:new TextDecoder("utf-8",{fatal:!0,ignoreBOM:!0});vl&&vl.decode(new Uint8Array).length===1&&(vl=null);class ii{constructor(){this.cpos=0,this.cbuf=new Uint8Array(100),this.bufs=[]}}const Qc=()=>new ii,t2=t=>{let e=t.cpos;for(let n=0;n<t.bufs.length;n++)e+=t.bufs[n].length;return e},sr=t=>{const e=new Uint8Array(t2(t));let n=0;for(let r=0;r<t.bufs.length;r++){const o=t.bufs[r];e.set(o,n),n+=o.length}return e.set(new Uint8Array(t.cbuf.buffer,0,t.cpos),n),e},n2=(t,e)=>{const n=t.cbuf.length;n-t.cpos<e&&(t.bufs.push(new Uint8Array(t.cbuf.buffer,0,t.cpos)),t.cbuf=new Uint8Array(as(n,e)*2),t.cpos=0)},bt=(t,e)=>{const n=t.cbuf.length;t.cpos===n&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(n*2),t.cpos=0),t.cbuf[t.cpos++]=e},tc=bt,Be=(t,e)=>{for(;e>As;)bt(t,Zi|As&e),e=ro(e/128);bt(t,As&e)},Zc=(t,e)=>{const n=Vy(e);for(n&&(e=-e),bt(t,(e>up?Zi:0)|(n?dw:0)|up&e),e=ro(e/64);e>0;)bt(t,(e>As?Zi:0)|As&e),e=ro(e/128)},nc=new Uint8Array(3e4),r2=nc.length/3,o2=(t,e)=>{if(e.length<r2){const n=Ps.encodeInto(e,nc).written||0;Be(t,n);for(let r=0;r<n;r++)bt(t,nc[r])}else ln(t,e2(e))},s2=(t,e)=>{const n=unescape(encodeURIComponent(e)),r=n.length;Be(t,r);for(let o=0;o<r;o++)bt(t,n.codePointAt(o))},Io=Ps&&Ps.encodeInto?o2:s2,eu=(t,e)=>{const n=t.cbuf.length,r=t.cpos,o=uw(n-r,e.length),s=e.length-o;t.cbuf.set(e.subarray(0,o),r),t.cpos+=o,s>0&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(as(n*2,s)),t.cbuf.set(e.subarray(o)),t.cpos=s)},ln=(t,e)=>{Be(t,e.byteLength),eu(t,e)},tu=(t,e)=>{n2(t,e);const n=new DataView(t.cbuf.buffer,t.cpos,e);return t.cpos+=e,n},i2=(t,e)=>tu(t,4).setFloat32(0,e,!1),a2=(t,e)=>tu(t,8).setFloat64(0,e,!1),l2=(t,e)=>tu(t,8).setBigInt64(0,e,!1),pp=new DataView(new ArrayBuffer(4)),c2=t=>(pp.setFloat32(0,t),pp.getFloat32(0)===t),$s=(t,e)=>{switch(typeof e){case"string":bt(t,119),Io(t,e);break;case"number":Ky(e)&&Bi(e)<=Gy?(bt(t,125),Zc(t,e)):c2(e)?(bt(t,124),i2(t,e)):(bt(t,123),a2(t,e));break;case"bigint":bt(t,122),l2(t,e);break;case"object":if(e===null)bt(t,126);else if(qy(e)){bt(t,117),Be(t,e.length);for(let n=0;n<e.length;n++)$s(t,e[n])}else if(e instanceof Uint8Array)bt(t,116),ln(t,e);else{bt(t,118);const n=Object.keys(e);Be(t,n.length);for(let r=0;r<n.length;r++){const o=n[r];Io(t,o),$s(t,e[o])}}break;case"boolean":bt(t,e?120:121);break;default:bt(t,127)}};class fp extends ii{constructor(e){super(),this.w=e,this.s=null,this.count=0}write(e){this.s===e?this.count++:(this.count>0&&Be(this,this.count-1),this.count=1,this.w(this,e),this.s=e)}}const hp=t=>{t.count>0&&(Zc(t.encoder,t.count===1?t.s:-t.s),t.count>1&&Be(t.encoder,t.count-2))};class qi{constructor(){this.encoder=new ii,this.s=0,this.count=0}write(e){this.s===e?this.count++:(hp(this),this.count=1,this.s=e)}toUint8Array(){return hp(this),sr(this.encoder)}}const wp=t=>{if(t.count>0){const e=t.diff*2+(t.count===1?0:1);Zc(t.encoder,e),t.count>1&&Be(t.encoder,t.count-2)}};class xl{constructor(){this.encoder=new ii,this.s=0,this.count=0,this.diff=0}write(e){this.diff===e-this.s?(this.s=e,this.count++):(wp(this),this.count=1,this.diff=e-this.s,this.s=e)}toUint8Array(){return wp(this),sr(this.encoder)}}class u2{constructor(){this.sarr=[],this.s="",this.lensE=new qi}write(e){this.s+=e,this.s.length>19&&(this.sarr.push(this.s),this.s=""),this.lensE.write(e.length)}toUint8Array(){const e=new ii;return this.sarr.push(this.s),this.s="",Io(e,this.sarr.join("")),eu(e,this.lensE.toUint8Array()),sr(e)}}const Ho=t=>new Error(t),Wn=()=>{throw Ho("Method unimplemented")},oo=()=>{throw Ho("Unexpected case")},d2=crypto.getRandomValues.bind(crypto),pw=()=>d2(new Uint32Array(1))[0],p2="10000000-1000-4000-8000"+-1e11,f2=()=>p2.replace(/[018]/g,t=>(t^pw()&15>>t/4).toString(16)),mp=t=>new Promise(t);Promise.all.bind(Promise);const gp=t=>t===void 0?null:t;class h2{constructor(){this.map=new Map}setItem(e,n){this.map.set(e,n)}getItem(e){return this.map.get(e)}}let fw=new h2,w2=!0;try{typeof localStorage<"u"&&localStorage&&(fw=localStorage,w2=!1)}catch{}const m2=fw,g2=Object.assign,b2=Object.keys,v2=(t,e)=>{for(const n in t)e(t[n],n)},bp=t=>b2(t).length,x2=t=>{for(const e in t)return!1;return!0},y2=(t,e)=>{for(const n in t)if(!e(t[n],n))return!1;return!0},_2=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),C2=(t,e)=>t===e||bp(t)===bp(e)&&y2(t,(n,r)=>(n!==void 0||_2(e,r))&&e[r]===n),E2=Object.freeze,hw=t=>{for(const e in t){const n=t[e];(typeof n=="object"||typeof n=="function")&&hw(t[e])}return E2(t)},nu=(t,e,n=0)=>{try{for(;n<t.length;n++)t[n](...e)}finally{n<t.length&&nu(t,e,n+1)}},k2=(t,e)=>e.includes(t),Fs=typeof process<"u"&&process.release&&/node|io\.js/.test(process.release.name)&&Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]";let Bn;const N2=()=>{if(Bn===void 0)if(Fs){Bn=Yn();const t=process.argv;let e=null;for(let n=0;n<t.length;n++){const r=t[n];r[0]==="-"?(e!==null&&Bn.set(e,""),e=r):e!==null&&(Bn.set(e,r),e=null)}e!==null&&Bn.set(e,"")}else typeof location=="object"?(Bn=Yn(),(location.search||"?").slice(1).split("&").forEach(t=>{if(t.length!==0){const[e,n]=t.split("=");Bn.set(`--${dp(e,"-")}`,n),Bn.set(`-${dp(e,"-")}`,n)}})):Bn=Yn();return Bn},rc=t=>N2().has(t),ea=t=>gp(Fs?process.env[t.toUpperCase().replaceAll("-","_")]:m2.getItem(t)),ww=t=>rc("--"+t)||ea(t)!==null;ww("production");const T2=Fs&&k2(process.env.FORCE_COLOR,["true","1","2"]),S2=T2||!rc("--no-colors")&&!ww("no-color")&&(!Fs||process.stdout.isTTY)&&(!Fs||rc("--color")||ea("COLORTERM")!==null||(ea("TERM")||"").includes("color"));class A2{constructor(e,n){this.left=e,this.right=n}}const rr=(t,e)=>new A2(t,e);typeof DOMParser<"u"&&new DOMParser;const D2=t=>Fy(t,(e,n)=>`${n}:${e};`).join(""),dr=Symbol,mw=dr(),gw=dr(),M2=dr(),R2=dr(),O2=dr(),bw=dr(),j2=dr(),ru=dr(),I2=dr(),L2=t=>{var o;t.length===1&&((o=t[0])==null?void 0:o.constructor)===Function&&(t=t[0]());const e=[],n=[];let r=0;for(;r<t.length;r++){const s=t[r];if(s===void 0)break;if(s.constructor===String||s.constructor===Number)e.push(s);else if(s.constructor===Object)break}for(r>0&&n.push(e.join(""));r<t.length;r++){const s=t[r];s instanceof Symbol||n.push(s)}return n},P2={[mw]:rr("font-weight","bold"),[gw]:rr("font-weight","normal"),[M2]:rr("color","blue"),[O2]:rr("color","green"),[R2]:rr("color","grey"),[bw]:rr("color","red"),[j2]:rr("color","purple"),[ru]:rr("color","orange"),[I2]:rr("color","black")},$2=t=>{var i;t.length===1&&((i=t[0])==null?void 0:i.constructor)===Function&&(t=t[0]());const e=[],n=[],r=Yn();let o=[],s=0;for(;s<t.length;s++){const a=t[s],c=P2[a];if(c!==void 0)r.set(c.left,c.right);else{if(a===void 0)break;if(a.constructor===String||a.constructor===Number){const u=D2(r);s>0||u.length>0?(e.push("%c"+a),n.push(u)):e.push(a)}else break}}for(s>0&&(o=n,o.unshift(e.join("")));s<t.length;s++){const a=t[s];a instanceof Symbol||o.push(a)}return o},vw=S2?$2:L2,F2=(...t)=>{console.log(...vw(t)),xw.forEach(e=>e.print(t))},B2=(...t)=>{console.warn(...vw(t)),t.unshift(ru),xw.forEach(e=>e.print(t))},xw=Uo(),yw=t=>({[Symbol.iterator](){return this},next:t}),q2=(t,e)=>yw(()=>{let n;do n=t.next();while(!n.done&&!e(n.value));return n}),yl=(t,e)=>yw(()=>{const{done:n,value:r}=t.next();return{done:n,value:n?void 0:e(r)}});class U2{constructor(e,n){this.clock=e,this.len=n}}class V2{constructor(){this.clients=new Map}}const _w=(t,e,n)=>e.clients.forEach((r,o)=>{const s=t.doc.store.clients.get(o);if(s!=null){const i=s[s.length-1],a=i.id.clock+i.length;for(let c=0,u=r[c];c<r.length&&u.clock<a;u=r[++c])Aw(t,s,u.clock,u.len,n)}}),H2=(t,e)=>{let n=0,r=t.length-1;for(;n<=r;){const o=ro((n+r)/2),s=t[o],i=s.clock;if(i<=e){if(e<i+s.len)return o;n=o+1}else r=o-1}return null},Cw=(t,e)=>{const n=t.clients.get(e.client);return n!==void 0&&H2(n,e.clock)!==null},Ew=t=>{t.clients.forEach(e=>{e.sort((o,s)=>o.clock-s.clock);let n,r;for(n=1,r=1;n<e.length;n++){const o=e[r-1],s=e[n];o.clock+o.len>=s.clock?o.len=as(o.len,s.clock+s.len-o.clock):(r<n&&(e[r]=s),r++)}e.length=r})},kw=(t,e,n,r)=>{is(t.clients,e,()=>[]).push(new U2(n,r))},z2=(t,e)=>{Be(t.restEncoder,e.clients.size),Vo(e.clients.entries()).sort((n,r)=>r[0]-n[0]).forEach(([n,r])=>{t.resetDsCurVal(),Be(t.restEncoder,n);const o=r.length;Be(t.restEncoder,o);for(let s=0;s<o;s++){const i=r[s];t.writeDsClock(i.clock),t.writeDsLen(i.len)}})},Nw=pw;class ai extends Uy{constructor({guid:e=f2(),collectionid:n=null,gc:r=!0,gcFilter:o=()=>!0,meta:s=null,autoLoad:i=!1,shouldLoad:a=!0}={}){super(),this.gc=r,this.gcFilter=o,this.clientID=Nw(),this.guid=e,this.collectionid=n,this.share=new Map,this.store=new t_,this._transaction=null,this._transactionCleanups=[],this.subdocs=new Set,this._item=null,this.shouldLoad=a,this.autoLoad=i,this.meta=s,this.isLoaded=!1,this.isSynced=!1,this.isDestroyed=!1,this.whenLoaded=mp(u=>{this.on("load",()=>{this.isLoaded=!0,u(this)})});const c=()=>mp(u=>{const d=p=>{(p===void 0||p===!0)&&(this.off("sync",d),u())};this.on("sync",d)});this.on("sync",u=>{u===!1&&this.isSynced&&(this.whenSynced=c()),this.isSynced=u===void 0||u===!0,this.isSynced&&!this.isLoaded&&this.emit("load",[this])}),this.whenSynced=c()}load(){const e=this._item;e!==null&&!this.shouldLoad&&He(e.parent.doc,n=>{n.subdocsLoaded.add(this)},null,!0),this.shouldLoad=!0}getSubdocs(){return this.subdocs}getSubdocGuids(){return new Set(Vo(this.subdocs).map(e=>e.guid))}transact(e,n=null){return He(this,e,n)}get(e,n=Tt){const r=is(this.share,e,()=>{const s=new n;return s._integrate(this,null),s}),o=r.constructor;if(n!==Tt&&o!==n)if(o===Tt){const s=new n;s._map=r._map,r._map.forEach(i=>{for(;i!==null;i=i.left)i.parent=s}),s._start=r._start;for(let i=s._start;i!==null;i=i.right)i.parent=s;return s._length=r._length,this.share.set(e,s),s._integrate(this,null),s}else throw new Error(`Type with the name ${e} has already been defined with a different constructor`);return r}getArray(e=""){return this.get(e,Xr)}getText(e=""){return this.get(e,ra)}getMap(e=""){return this.get(e,zo)}getXmlElement(e=""){return this.get(e,Us)}getXmlFragment(e=""){return this.get(e,Go)}toJSON(){const e={};return this.share.forEach((n,r)=>{e[r]=n.toJSON()}),e}destroy(){this.isDestroyed=!0,Vo(this.subdocs).forEach(n=>n.destroy());const e=this._item;if(e!==null){this._item=null;const n=e.content;n.doc=new ai({guid:this.guid,...n.opts,shouldLoad:!1}),n.doc._item=e,He(e.parent.doc,r=>{const o=n.doc;e.deleted||r.subdocsAdded.add(o),r.subdocsRemoved.add(this)},null,!0)}this.emit("destroyed",[!0]),this.emit("destroy",[this]),super.destroy()}}class G2{constructor(){this.restEncoder=Qc()}toUint8Array(){return sr(this.restEncoder)}resetDsCurVal(){}writeDsClock(e){Be(this.restEncoder,e)}writeDsLen(e){Be(this.restEncoder,e)}}class K2 extends G2{writeLeftID(e){Be(this.restEncoder,e.client),Be(this.restEncoder,e.clock)}writeRightID(e){Be(this.restEncoder,e.client),Be(this.restEncoder,e.clock)}writeClient(e){Be(this.restEncoder,e)}writeInfo(e){tc(this.restEncoder,e)}writeString(e){Io(this.restEncoder,e)}writeParentInfo(e){Be(this.restEncoder,e?1:0)}writeTypeRef(e){Be(this.restEncoder,e)}writeLen(e){Be(this.restEncoder,e)}writeAny(e){$s(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){Io(this.restEncoder,JSON.stringify(e))}writeKey(e){Io(this.restEncoder,e)}}class Y2{constructor(){this.restEncoder=Qc(),this.dsCurrVal=0}toUint8Array(){return sr(this.restEncoder)}resetDsCurVal(){this.dsCurrVal=0}writeDsClock(e){const n=e-this.dsCurrVal;this.dsCurrVal=e,Be(this.restEncoder,n)}writeDsLen(e){e===0&&oo(),Be(this.restEncoder,e-1),this.dsCurrVal+=e}}class W2 extends Y2{constructor(){super(),this.keyMap=new Map,this.keyClock=0,this.keyClockEncoder=new xl,this.clientEncoder=new qi,this.leftClockEncoder=new xl,this.rightClockEncoder=new xl,this.infoEncoder=new fp(tc),this.stringEncoder=new u2,this.parentInfoEncoder=new fp(tc),this.typeRefEncoder=new qi,this.lenEncoder=new qi}toUint8Array(){const e=Qc();return Be(e,0),ln(e,this.keyClockEncoder.toUint8Array()),ln(e,this.clientEncoder.toUint8Array()),ln(e,this.leftClockEncoder.toUint8Array()),ln(e,this.rightClockEncoder.toUint8Array()),ln(e,sr(this.infoEncoder)),ln(e,this.stringEncoder.toUint8Array()),ln(e,sr(this.parentInfoEncoder)),ln(e,this.typeRefEncoder.toUint8Array()),ln(e,this.lenEncoder.toUint8Array()),eu(e,sr(this.restEncoder)),sr(e)}writeLeftID(e){this.clientEncoder.write(e.client),this.leftClockEncoder.write(e.clock)}writeRightID(e){this.clientEncoder.write(e.client),this.rightClockEncoder.write(e.clock)}writeClient(e){this.clientEncoder.write(e)}writeInfo(e){this.infoEncoder.write(e)}writeString(e){this.stringEncoder.write(e)}writeParentInfo(e){this.parentInfoEncoder.write(e?1:0)}writeTypeRef(e){this.typeRefEncoder.write(e)}writeLen(e){this.lenEncoder.write(e)}writeAny(e){$s(this.restEncoder,e)}writeBuf(e){ln(this.restEncoder,e)}writeJSON(e){$s(this.restEncoder,e)}writeKey(e){const n=this.keyMap.get(e);n===void 0?(this.keyClockEncoder.write(this.keyClock++),this.stringEncoder.write(e)):this.keyClockEncoder.write(n)}}const J2=(t,e,n,r)=>{r=as(r,e[0].id.clock);const o=ar(e,r);Be(t.restEncoder,e.length-o),t.writeClient(n),Be(t.restEncoder,r);const s=e[o];s.write(t,r-s.id.clock);for(let i=o+1;i<e.length;i++)e[i].write(t,0)},X2=(t,e,n)=>{const r=new Map;n.forEach((o,s)=>{Kt(e,s)>o&&r.set(s,o)}),ou(e).forEach((o,s)=>{n.has(s)||r.set(s,0)}),Be(t.restEncoder,r.size),Vo(r.entries()).sort((o,s)=>s[0]-o[0]).forEach(([o,s])=>{J2(t,e.clients.get(o),o,s)})},Q2=(t,e)=>X2(t,e.doc.store,e.beforeState);class Z2{constructor(){this.l=[]}}const vp=()=>new Z2,xp=(t,e)=>t.l.push(e),yp=(t,e)=>{const n=t.l,r=n.length;t.l=n.filter(o=>e!==o),r===t.l.length&&console.error("[yjs] Tried to remove event handler that doesn't exist.")},Tw=(t,e,n)=>nu(t.l,[e,n]);class Ui{constructor(e,n){this.client=e,this.clock=n}}const ji=(t,e)=>t===e||t!==null&&e!==null&&t.client===e.client&&t.clock===e.clock,nt=(t,e)=>new Ui(t,e),e_=t=>{for(const[e,n]of t.doc.share.entries())if(n===t)return e;throw oo()},Ao=(t,e)=>e===void 0?!t.deleted:e.sv.has(t.id.client)&&(e.sv.get(t.id.client)||0)>t.id.clock&&!Cw(e.ds,t.id),oc=(t,e)=>{const n=is(t.meta,oc,Uo),r=t.doc.store;n.has(e)||(e.sv.forEach((o,s)=>{o<Kt(r,s)&&Tr(t,nt(s,o))}),_w(t,e.ds,o=>{}),n.add(e))};class t_{constructor(){this.clients=new Map,this.pendingStructs=null,this.pendingDs=null}}const ou=t=>{const e=new Map;return t.clients.forEach((n,r)=>{const o=n[n.length-1];e.set(r,o.id.clock+o.length)}),e},Kt=(t,e)=>{const n=t.clients.get(e);if(n===void 0)return 0;const r=n[n.length-1];return r.id.clock+r.length},Sw=(t,e)=>{let n=t.clients.get(e.id.client);if(n===void 0)n=[],t.clients.set(e.id.client,n);else{const r=n[n.length-1];if(r.id.clock+r.length!==e.id.clock)throw oo()}n.push(e)},ar=(t,e)=>{let n=0,r=t.length-1,o=t[r],s=o.id.clock;if(s===e)return r;let i=ro(e/(s+o.length-1)*r);for(;n<=r;){if(o=t[i],s=o.id.clock,s<=e){if(e<s+o.length)return i;n=i+1}else r=i-1;i=ro((n+r)/2)}throw oo()},n_=(t,e)=>{const n=t.clients.get(e.client);return n[ar(n,e.clock)]},_l=n_,sc=(t,e,n)=>{const r=ar(e,n),o=e[r];return o.id.clock<n&&o instanceof Ot?(e.splice(r+1,0,Yw(t,o,n-o.id.clock)),r+1):r},Tr=(t,e)=>{const n=t.doc.store.clients.get(e.client);return n[sc(t,n,e.clock)]},_p=(t,e,n)=>{const r=e.clients.get(n.client),o=ar(r,n.clock),s=r[o];return n.clock!==s.id.clock+s.length-1&&s.constructor!==br&&r.splice(o+1,0,Yw(t,s,n.clock-s.id.clock+1)),s},r_=(t,e,n)=>{const r=t.clients.get(e.id.client);r[ar(r,e.id.clock)]=n},Aw=(t,e,n,r,o)=>{if(r===0)return;const s=n+r;let i=sc(t,e,n),a;do a=e[i++],s<a.id.clock+a.length&&sc(t,e,s),o(a);while(i<e.length&&e[i].id.clock<s)};class o_{constructor(e,n,r){this.doc=e,this.deleteSet=new V2,this.beforeState=ou(e.store),this.afterState=new Map,this.changed=new Map,this.changedParentTypes=new Map,this._mergeStructs=[],this.origin=n,this.meta=new Map,this.local=r,this.subdocsAdded=new Set,this.subdocsRemoved=new Set,this.subdocsLoaded=new Set,this._needFormattingCleanup=!1}}const Cp=(t,e)=>e.deleteSet.clients.size===0&&!By(e.afterState,(n,r)=>e.beforeState.get(r)!==n)?!1:(Ew(e.deleteSet),Q2(t,e),z2(t,e.deleteSet),!0),Ep=(t,e,n)=>{const r=e._item;(r===null||r.id.clock<(t.beforeState.get(r.id.client)||0)&&!r.deleted)&&is(t.changed,e,Uo).add(n)},Vi=(t,e)=>{let n=t[e],r=t[e-1],o=e;for(;o>0;n=r,r=t[--o-1]){if(r.deleted===n.deleted&&r.constructor===n.constructor&&r.mergeWith(n)){n instanceof Ot&&n.parentSub!==null&&n.parent._map.get(n.parentSub)===n&&n.parent._map.set(n.parentSub,r);continue}break}const s=e-o;return s&&t.splice(e+1-s,s),s},s_=(t,e,n)=>{for(const[r,o]of t.clients.entries()){const s=e.clients.get(r);for(let i=o.length-1;i>=0;i--){const a=o[i],c=a.clock+a.len;for(let u=ar(s,a.clock),d=s[u];u<s.length&&d.id.clock<c;d=s[++u]){const p=s[u];if(a.clock+a.len<=p.id.clock)break;p instanceof Ot&&p.deleted&&!p.keep&&n(p)&&p.gc(e,!1)}}}},i_=(t,e)=>{t.clients.forEach((n,r)=>{const o=e.clients.get(r);for(let s=n.length-1;s>=0;s--){const i=n[s],a=uw(o.length-1,1+ar(o,i.clock+i.len-1));for(let c=a,u=o[c];c>0&&u.id.clock>=i.clock;u=o[c])c-=1+Vi(o,c)}})},Dw=(t,e)=>{if(e<t.length){const n=t[e],r=n.doc,o=r.store,s=n.deleteSet,i=n._mergeStructs;try{Ew(s),n.afterState=ou(n.doc.store),r.emit("beforeObserverCalls",[n,r]);const a=[];n.changed.forEach((c,u)=>a.push(()=>{(u._item===null||!u._item.deleted)&&u._callObserver(n,c)})),a.push(()=>{n.changedParentTypes.forEach((c,u)=>{u._dEH.l.length>0&&(u._item===null||!u._item.deleted)&&(c=c.filter(d=>d.target._item===null||!d.target._item.deleted),c.forEach(d=>{d.currentTarget=u,d._path=null}),c.sort((d,p)=>d.path.length-p.path.length),Tw(u._dEH,c,n))})}),a.push(()=>r.emit("afterTransaction",[n,r])),nu(a,[]),n._needFormattingCleanup&&g_(n)}finally{r.gc&&s_(s,o,r.gcFilter),i_(s,o),n.afterState.forEach((d,p)=>{const f=n.beforeState.get(p)||0;if(f!==d){const h=o.clients.get(p),b=as(ar(h,f),1);for(let x=h.length-1;x>=b;)x-=1+Vi(h,x)}});for(let d=i.length-1;d>=0;d--){const{client:p,clock:f}=i[d].id,h=o.clients.get(p),b=ar(h,f);b+1<h.length&&Vi(h,b+1)>1||b>0&&Vi(h,b)}if(!n.local&&n.afterState.get(r.clientID)!==n.beforeState.get(r.clientID)&&(F2(ru,mw,"[yjs] ",gw,bw,"Changed the client-id because another client seems to be using it."),r.clientID=Nw()),r.emit("afterTransactionCleanup",[n,r]),r._observers.has("update")){const d=new K2;Cp(d,n)&&r.emit("update",[d.toUint8Array(),n.origin,r,n])}if(r._observers.has("updateV2")){const d=new W2;Cp(d,n)&&r.emit("updateV2",[d.toUint8Array(),n.origin,r,n])}const{subdocsAdded:a,subdocsLoaded:c,subdocsRemoved:u}=n;(a.size>0||u.size>0||c.size>0)&&(a.forEach(d=>{d.clientID=r.clientID,d.collectionid==null&&(d.collectionid=r.collectionid),r.subdocs.add(d)}),u.forEach(d=>r.subdocs.delete(d)),r.emit("subdocs",[{loaded:c,added:a,removed:u},r,n]),u.forEach(d=>d.destroy())),t.length<=e+1?(r._transactionCleanups=[],r.emit("afterAllTransactions",[r,t])):Dw(t,e+1)}}},He=(t,e,n=null,r=!0)=>{const o=t._transactionCleanups;let s=!1,i=null;t._transaction===null&&(s=!0,t._transaction=new o_(t,n,r),o.push(t._transaction),o.length===1&&t.emit("beforeAllTransactions",[t]),t.emit("beforeTransaction",[t._transaction,t]));try{i=e(t._transaction)}finally{if(s){const a=t._transaction===o[0];t._transaction=null,a&&Dw(o,0)}}return i},kp="You must not compute changes after the event-handler fired.";class Oa{constructor(e,n){this.target=e,this.currentTarget=e,this.transaction=n,this._changes=null,this._keys=null,this._delta=null,this._path=null}get path(){return this._path||(this._path=a_(this.currentTarget,this.target))}deletes(e){return Cw(this.transaction.deleteSet,e.id)}get keys(){if(this._keys===null){if(this.transaction.doc._transactionCleanups.length===0)throw Ho(kp);const e=new Map,n=this.target;this.transaction.changed.get(n).forEach(o=>{if(o!==null){const s=n._map.get(o);let i,a;if(this.adds(s)){let c=s.left;for(;c!==null&&this.adds(c);)c=c.left;if(this.deletes(s))if(c!==null&&this.deletes(c))i="delete",a=ml(c.content.getContent());else return;else c!==null&&this.deletes(c)?(i="update",a=ml(c.content.getContent())):(i="add",a=void 0)}else if(this.deletes(s))i="delete",a=ml(s.content.getContent());else return;e.set(o,{action:i,oldValue:a})}}),this._keys=e}return this._keys}get delta(){return this.changes.delta}adds(e){return e.id.clock>=(this.transaction.beforeState.get(e.id.client)||0)}get changes(){let e=this._changes;if(e===null){if(this.transaction.doc._transactionCleanups.length===0)throw Ho(kp);const n=this.target,r=Uo(),o=Uo(),s=[];if(e={added:r,deleted:o,delta:s,keys:this.keys},this.transaction.changed.get(n).has(null)){let a=null;const c=()=>{a&&s.push(a)};for(let u=n._start;u!==null;u=u.right)u.deleted?this.deletes(u)&&!this.adds(u)&&((a===null||a.delete===void 0)&&(c(),a={delete:0}),a.delete+=u.length,o.add(u)):this.adds(u)?((a===null||a.insert===void 0)&&(c(),a={insert:[]}),a.insert=a.insert.concat(u.content.getContent()),r.add(u)):((a===null||a.retain===void 0)&&(c(),a={retain:0}),a.retain+=u.length);a!==null&&a.retain===void 0&&c()}this._changes=e}return e}}const a_=(t,e)=>{const n=[];for(;e._item!==null&&e!==t;){if(e._item.parentSub!==null)n.unshift(e._item.parentSub);else{let r=0,o=e._item.parent._start;for(;o!==e._item&&o!==null;)!o.deleted&&o.countable&&(r+=o.length),o=o.right;n.unshift(r)}e=e._item.parent}return n},It=()=>{B2("Invalid access: Add Yjs type to a document before reading data.")},Mw=80;let su=0;class l_{constructor(e,n){e.marker=!0,this.p=e,this.index=n,this.timestamp=su++}}const c_=t=>{t.timestamp=su++},Rw=(t,e,n)=>{t.p.marker=!1,t.p=e,e.marker=!0,t.index=n,t.timestamp=su++},u_=(t,e,n)=>{if(t.length>=Mw){const r=t.reduce((o,s)=>o.timestamp<s.timestamp?o:s);return Rw(r,e,n),r}else{const r=new l_(e,n);return t.push(r),r}},ja=(t,e)=>{if(t._start===null||e===0||t._searchMarker===null)return null;const n=t._searchMarker.length===0?null:t._searchMarker.reduce((s,i)=>Bi(e-s.index)<Bi(e-i.index)?s:i);let r=t._start,o=0;for(n!==null&&(r=n.p,o=n.index,c_(n));r.right!==null&&o<e;){if(!r.deleted&&r.countable){if(e<o+r.length)break;o+=r.length}r=r.right}for(;r.left!==null&&o>e;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);for(;r.left!==null&&r.left.id.client===r.id.client&&r.left.id.clock+r.left.length===r.id.clock;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);return n!==null&&Bi(n.index-o)<r.parent.length/Mw?(Rw(n,r,o),n):u_(t._searchMarker,r,o)},Bs=(t,e,n)=>{for(let r=t.length-1;r>=0;r--){const o=t[r];if(n>0){let s=o.p;for(s.marker=!1;s&&(s.deleted||!s.countable);)s=s.left,s&&!s.deleted&&s.countable&&(o.index-=s.length);if(s===null||s.marker===!0){t.splice(r,1);continue}o.p=s,s.marker=!0}(e<o.index||n>0&&e===o.index)&&(o.index=as(e,o.index+n))}},Ia=(t,e,n)=>{const r=t,o=e.changedParentTypes;for(;is(o,t,()=>[]).push(n),t._item!==null;)t=t._item.parent;Tw(r._eH,n,e)};class Tt{constructor(){this._item=null,this._map=new Map,this._start=null,this.doc=null,this._length=0,this._eH=vp(),this._dEH=vp(),this._searchMarker=null}get parent(){return this._item?this._item.parent:null}_integrate(e,n){this.doc=e,this._item=n}_copy(){throw Wn()}clone(){throw Wn()}_write(e){}get _first(){let e=this._start;for(;e!==null&&e.deleted;)e=e.right;return e}_callObserver(e,n){!e.local&&this._searchMarker&&(this._searchMarker.length=0)}observe(e){xp(this._eH,e)}observeDeep(e){xp(this._dEH,e)}unobserve(e){yp(this._eH,e)}unobserveDeep(e){yp(this._dEH,e)}toJSON(){}}const Ow=(t,e,n)=>{t.doc??It(),e<0&&(e=t._length+e),n<0&&(n=t._length+n);let r=n-e;const o=[];let s=t._start;for(;s!==null&&r>0;){if(s.countable&&!s.deleted){const i=s.content.getContent();if(i.length<=e)e-=i.length;else{for(let a=e;a<i.length&&r>0;a++)o.push(i[a]),r--;e=0}}s=s.right}return o},jw=t=>{t.doc??It();const e=[];let n=t._start;for(;n!==null;){if(n.countable&&!n.deleted){const r=n.content.getContent();for(let o=0;o<r.length;o++)e.push(r[o])}n=n.right}return e},qs=(t,e)=>{let n=0,r=t._start;for(t.doc??It();r!==null;){if(r.countable&&!r.deleted){const o=r.content.getContent();for(let s=0;s<o.length;s++)e(o[s],n++,t)}r=r.right}},Iw=(t,e)=>{const n=[];return qs(t,(r,o)=>{n.push(e(r,o,t))}),n},d_=t=>{let e=t._start,n=null,r=0;return{[Symbol.iterator](){return this},next:()=>{if(n===null){for(;e!==null&&e.deleted;)e=e.right;if(e===null)return{done:!0,value:void 0};n=e.content.getContent(),r=0,e=e.right}const o=n[r++];return n.length<=r&&(n=null),{done:!1,value:o}}}},Lw=(t,e)=>{t.doc??It();const n=ja(t,e);let r=t._start;for(n!==null&&(r=n.p,e-=n.index);r!==null;r=r.right)if(!r.deleted&&r.countable){if(e<r.length)return r.content.getContent()[e];e-=r.length}},ta=(t,e,n,r)=>{let o=n;const s=t.doc,i=s.clientID,a=s.store,c=n===null?e._start:n.right;let u=[];const d=()=>{u.length>0&&(o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new Ko(u)),o.integrate(t,0),u=[])};r.forEach(p=>{if(p===null)u.push(p);else switch(p.constructor){case Number:case Object:case Boolean:case Array:case String:u.push(p);break;default:switch(d(),p.constructor){case Uint8Array:case ArrayBuffer:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new La(new Uint8Array(p))),o.integrate(t,0);break;case ai:o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new Pa(p)),o.integrate(t,0);break;default:if(p instanceof Tt)o=new Ot(nt(i,Kt(a,i)),o,o&&o.lastId,c,c&&c.id,e,null,new jr(p)),o.integrate(t,0);else throw new Error("Unexpected content type in insert operation")}}}),d()},Pw=()=>Ho("Length exceeded!"),$w=(t,e,n,r)=>{if(n>e._length)throw Pw();if(n===0)return e._searchMarker&&Bs(e._searchMarker,n,r.length),ta(t,e,null,r);const o=n,s=ja(e,n);let i=e._start;for(s!==null&&(i=s.p,n-=s.index,n===0&&(i=i.prev,n+=i&&i.countable&&!i.deleted?i.length:0));i!==null;i=i.right)if(!i.deleted&&i.countable){if(n<=i.length){n<i.length&&Tr(t,nt(i.id.client,i.id.clock+n));break}n-=i.length}return e._searchMarker&&Bs(e._searchMarker,o,r.length),ta(t,e,i,r)},p_=(t,e,n)=>{let o=(e._searchMarker||[]).reduce((s,i)=>i.index>s.index?i:s,{index:0,p:e._start}).p;if(o)for(;o.right;)o=o.right;return ta(t,e,o,n)},Fw=(t,e,n,r)=>{if(r===0)return;const o=n,s=r,i=ja(e,n);let a=e._start;for(i!==null&&(a=i.p,n-=i.index);a!==null&&n>0;a=a.right)!a.deleted&&a.countable&&(n<a.length&&Tr(t,nt(a.id.client,a.id.clock+n)),n-=a.length);for(;r>0&&a!==null;)a.deleted||(r<a.length&&Tr(t,nt(a.id.client,a.id.clock+r)),a.delete(t),r-=a.length),a=a.right;if(r>0)throw Pw();e._searchMarker&&Bs(e._searchMarker,o,-s+r)},na=(t,e,n)=>{const r=e._map.get(n);r!==void 0&&r.delete(t)},iu=(t,e,n,r)=>{const o=e._map.get(n)||null,s=t.doc,i=s.clientID;let a;if(r==null)a=new Ko([r]);else switch(r.constructor){case Number:case Object:case Boolean:case Array:case String:case Date:case BigInt:a=new Ko([r]);break;case Uint8Array:a=new La(r);break;case ai:a=new Pa(r);break;default:if(r instanceof Tt)a=new jr(r);else throw new Error("Unexpected content type")}new Ot(nt(i,Kt(s.store,i)),o,o&&o.lastId,null,null,e,n,a).integrate(t,0)},au=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted?n.content.getContent()[n.length-1]:void 0},Bw=t=>{const e={};return t.doc??It(),t._map.forEach((n,r)=>{n.deleted||(e[r]=n.content.getContent()[n.length-1])}),e},qw=(t,e)=>{t.doc??It();const n=t._map.get(e);return n!==void 0&&!n.deleted},f_=(t,e)=>{const n={};return t._map.forEach((r,o)=>{let s=r;for(;s!==null&&(!e.sv.has(s.id.client)||s.id.clock>=(e.sv.get(s.id.client)||0));)s=s.left;s!==null&&Ao(s,e)&&(n[o]=s.content.getContent()[s.length-1])}),n},Ii=t=>(t.doc??It(),q2(t._map.entries(),e=>!e[1].deleted));class Uw extends Oa{}class Xr extends Tt{constructor(){super(),this._prelimContent=[],this._searchMarker=[]}static from(e){const n=new Xr;return n.push(e),n}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new Xr}clone(){const e=new Xr;return e.insert(0,this.toArray().map(n=>n instanceof Tt?n.clone():n)),e}get length(){return this.doc??It(),this._length}_callObserver(e,n){super._callObserver(e,n),Ia(this,e,new Uw(this,e))}insert(e,n){this.doc!==null?He(this.doc,r=>{$w(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}push(e){this.doc!==null?He(this.doc,n=>{p_(n,this,e)}):this._prelimContent.push(...e)}unshift(e){this.insert(0,e)}delete(e,n=1){this.doc!==null?He(this.doc,r=>{Fw(r,this,e,n)}):this._prelimContent.splice(e,n)}get(e){return Lw(this,e)}toArray(){return jw(this)}slice(e=0,n=this.length){return Ow(this,e,n)}toJSON(){return this.map(e=>e instanceof Tt?e.toJSON():e)}map(e){return Iw(this,e)}forEach(e){qs(this,e)}[Symbol.iterator](){return d_(this)}_write(e){e.writeTypeRef(C_)}}class h_ extends Oa{constructor(e,n,r){super(e,n),this.keysChanged=r}}class zo extends Tt{constructor(e){super(),this._prelimContent=null,e===void 0?this._prelimContent=new Map:this._prelimContent=new Map(e)}_integrate(e,n){super._integrate(e,n),this._prelimContent.forEach((r,o)=>{this.set(o,r)}),this._prelimContent=null}_copy(){return new zo}clone(){const e=new zo;return this.forEach((n,r)=>{e.set(r,n instanceof Tt?n.clone():n)}),e}_callObserver(e,n){Ia(this,e,new h_(this,e,n))}toJSON(){this.doc??It();const e={};return this._map.forEach((n,r)=>{if(!n.deleted){const o=n.content.getContent()[n.length-1];e[r]=o instanceof Tt?o.toJSON():o}}),e}get size(){return[...Ii(this)].length}keys(){return yl(Ii(this),e=>e[0])}values(){return yl(Ii(this),e=>e[1].content.getContent()[e[1].length-1])}entries(){return yl(Ii(this),e=>[e[0],e[1].content.getContent()[e[1].length-1]])}forEach(e){this.doc??It(),this._map.forEach((n,r)=>{n.deleted||e(n.content.getContent()[n.length-1],r,this)})}[Symbol.iterator](){return this.entries()}delete(e){this.doc!==null?He(this.doc,n=>{na(n,this,e)}):this._prelimContent.delete(e)}set(e,n){return this.doc!==null?He(this.doc,r=>{iu(r,this,e,n)}):this._prelimContent.set(e,n),n}get(e){return au(this,e)}has(e){return qw(this,e)}clear(){this.doc!==null?He(this.doc,e=>{this.forEach(function(n,r,o){na(e,o,r)})}):this._prelimContent.clear()}_write(e){e.writeTypeRef(E_)}}const yr=(t,e)=>t===e||typeof t=="object"&&typeof e=="object"&&t&&e&&C2(t,e);class ic{constructor(e,n,r,o){this.left=e,this.right=n,this.index=r,this.currentAttributes=o}forward(){switch(this.right===null&&oo(),this.right.content.constructor){case vt:this.right.deleted||ls(this.currentAttributes,this.right.content);break;default:this.right.deleted||(this.index+=this.right.length);break}this.left=this.right,this.right=this.right.right}}const Np=(t,e,n)=>{for(;e.right!==null&&n>0;){switch(e.right.content.constructor){case vt:e.right.deleted||ls(e.currentAttributes,e.right.content);break;default:e.right.deleted||(n<e.right.length&&Tr(t,nt(e.right.id.client,e.right.id.clock+n)),e.index+=e.right.length,n-=e.right.length);break}e.left=e.right,e.right=e.right.right}return e},Li=(t,e,n,r)=>{const o=new Map,s=r?ja(e,n):null;if(s){const i=new ic(s.p.left,s.p,s.index,o);return Np(t,i,n-s.index)}else{const i=new ic(null,e._start,0,o);return Np(t,i,n)}},Vw=(t,e,n,r)=>{for(;n.right!==null&&(n.right.deleted===!0||n.right.content.constructor===vt&&yr(r.get(n.right.content.key),n.right.content.value));)n.right.deleted||r.delete(n.right.content.key),n.forward();const o=t.doc,s=o.clientID;r.forEach((i,a)=>{const c=n.left,u=n.right,d=new Ot(nt(s,Kt(o.store,s)),c,c&&c.lastId,u,u&&u.id,e,null,new vt(a,i));d.integrate(t,0),n.right=d,n.forward()})},ls=(t,e)=>{const{key:n,value:r}=e;r===null?t.delete(n):t.set(n,r)},Hw=(t,e)=>{for(;t.right!==null;){if(!(t.right.deleted||t.right.content.constructor===vt&&yr(e[t.right.content.key]??null,t.right.content.value)))break;t.forward()}},zw=(t,e,n,r)=>{const o=t.doc,s=o.clientID,i=new Map;for(const a in r){const c=r[a],u=n.currentAttributes.get(a)??null;if(!yr(u,c)){i.set(a,u);const{left:d,right:p}=n;n.right=new Ot(nt(s,Kt(o.store,s)),d,d&&d.lastId,p,p&&p.id,e,null,new vt(a,c)),n.right.integrate(t,0),n.forward()}}return i},Cl=(t,e,n,r,o)=>{n.currentAttributes.forEach((f,h)=>{o[h]===void 0&&(o[h]=null)});const s=t.doc,i=s.clientID;Hw(n,o);const a=zw(t,e,n,o),c=r.constructor===String?new lr(r):r instanceof Tt?new jr(r):new cs(r);let{left:u,right:d,index:p}=n;e._searchMarker&&Bs(e._searchMarker,n.index,c.getLength()),d=new Ot(nt(i,Kt(s.store,i)),u,u&&u.lastId,d,d&&d.id,e,null,c),d.integrate(t,0),n.right=d,n.index=p,n.forward(),Vw(t,e,n,a)},Tp=(t,e,n,r,o)=>{const s=t.doc,i=s.clientID;Hw(n,o);const a=zw(t,e,n,o);e:for(;n.right!==null&&(r>0||a.size>0&&(n.right.deleted||n.right.content.constructor===vt));){if(!n.right.deleted)switch(n.right.content.constructor){case vt:{const{key:c,value:u}=n.right.content,d=o[c];if(d!==void 0){if(yr(d,u))a.delete(c);else{if(r===0)break e;a.set(c,u)}n.right.delete(t)}else n.currentAttributes.set(c,u);break}default:r<n.right.length&&Tr(t,nt(n.right.id.client,n.right.id.clock+r)),r-=n.right.length;break}n.forward()}if(r>0){let c="";for(;r>0;r--)c+=`
`;n.right=new Ot(nt(i,Kt(s.store,i)),n.left,n.left&&n.left.lastId,n.right,n.right&&n.right.id,e,null,new lr(c)),n.right.integrate(t,0),n.forward()}Vw(t,e,n,a)},Gw=(t,e,n,r,o)=>{let s=e;const i=Yn();for(;s&&(!s.countable||s.deleted);){if(!s.deleted&&s.content.constructor===vt){const u=s.content;i.set(u.key,u)}s=s.right}let a=0,c=!1;for(;e!==s;){if(n===e&&(c=!0),!e.deleted){const u=e.content;switch(u.constructor){case vt:{const{key:d,value:p}=u,f=r.get(d)??null;(i.get(d)!==u||f===p)&&(e.delete(t),a++,!c&&(o.get(d)??null)===p&&f!==p&&(f===null?o.delete(d):o.set(d,f))),!c&&!e.deleted&&ls(o,u);break}}}e=e.right}return a},w_=(t,e)=>{for(;e&&e.right&&(e.right.deleted||!e.right.countable);)e=e.right;const n=new Set;for(;e&&(e.deleted||!e.countable);){if(!e.deleted&&e.content.constructor===vt){const r=e.content.key;n.has(r)?e.delete(t):n.add(r)}e=e.left}},m_=t=>{let e=0;return He(t.doc,n=>{let r=t._start,o=t._start,s=Yn();const i=ec(s);for(;o;){if(o.deleted===!1)switch(o.content.constructor){case vt:ls(i,o.content);break;default:e+=Gw(n,r,o,s,i),s=ec(i),r=o;break}o=o.right}}),e},g_=t=>{const e=new Set,n=t.doc;for(const[r,o]of t.afterState.entries()){const s=t.beforeState.get(r)||0;o!==s&&Aw(t,n.store.clients.get(r),s,o,i=>{!i.deleted&&i.content.constructor===vt&&i.constructor!==br&&e.add(i.parent)})}He(n,r=>{_w(t,t.deleteSet,o=>{if(o instanceof br||!o.parent._hasFormatting||e.has(o.parent))return;const s=o.parent;o.content.constructor===vt?e.add(s):w_(r,o)});for(const o of e)m_(o)})},Sp=(t,e,n)=>{const r=n,o=ec(e.currentAttributes),s=e.right;for(;n>0&&e.right!==null;){if(e.right.deleted===!1)switch(e.right.content.constructor){case jr:case cs:case lr:n<e.right.length&&Tr(t,nt(e.right.id.client,e.right.id.clock+n)),n-=e.right.length,e.right.delete(t);break}e.forward()}s&&Gw(t,s,e.right,o,e.currentAttributes);const i=(e.left||e.right).parent;return i._searchMarker&&Bs(i._searchMarker,e.index,-r+n),e};class b_ extends Oa{constructor(e,n,r){super(e,n),this.childListChanged=!1,this.keysChanged=new Set,r.forEach(o=>{o===null?this.childListChanged=!0:this.keysChanged.add(o)})}get changes(){if(this._changes===null){const e={keys:this.keys,delta:this.delta,added:new Set,deleted:new Set};this._changes=e}return this._changes}get delta(){if(this._delta===null){const e=this.target.doc,n=[];He(e,r=>{const o=new Map,s=new Map;let i=this.target._start,a=null;const c={};let u="",d=0,p=0;const f=()=>{if(a!==null){let h=null;switch(a){case"delete":p>0&&(h={delete:p}),p=0;break;case"insert":(typeof u=="object"||u.length>0)&&(h={insert:u},o.size>0&&(h.attributes={},o.forEach((b,x)=>{b!==null&&(h.attributes[x]=b)}))),u="";break;case"retain":d>0&&(h={retain:d},x2(c)||(h.attributes=g2({},c))),d=0;break}h&&n.push(h),a=null}};for(;i!==null;){switch(i.content.constructor){case jr:case cs:this.adds(i)?this.deletes(i)||(f(),a="insert",u=i.content.getContent()[0],f()):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=1):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=1);break;case lr:this.adds(i)?this.deletes(i)||(a!=="insert"&&(f(),a="insert"),u+=i.content.str):this.deletes(i)?(a!=="delete"&&(f(),a="delete"),p+=i.length):i.deleted||(a!=="retain"&&(f(),a="retain"),d+=i.length);break;case vt:{const{key:h,value:b}=i.content;if(this.adds(i)){if(!this.deletes(i)){const x=o.get(h)??null;yr(x,b)?b!==null&&i.delete(r):(a==="retain"&&f(),yr(b,s.get(h)??null)?delete c[h]:c[h]=b)}}else if(this.deletes(i)){s.set(h,b);const x=o.get(h)??null;yr(x,b)||(a==="retain"&&f(),c[h]=x)}else if(!i.deleted){s.set(h,b);const x=c[h];x!==void 0&&(yr(x,b)?x!==null&&i.delete(r):(a==="retain"&&f(),b===null?delete c[h]:c[h]=b))}i.deleted||(a==="insert"&&f(),ls(o,i.content));break}}i=i.right}for(f();n.length>0;){const h=n[n.length-1];if(h.retain!==void 0&&h.attributes===void 0)n.pop();else break}}),this._delta=n}return this._delta}}class ra extends Tt{constructor(e){super(),this._pending=e!==void 0?[()=>this.insert(0,e)]:[],this._searchMarker=[],this._hasFormatting=!1}get length(){return this.doc??It(),this._length}_integrate(e,n){super._integrate(e,n);try{this._pending.forEach(r=>r())}catch(r){console.error(r)}this._pending=null}_copy(){return new ra}clone(){const e=new ra;return e.applyDelta(this.toDelta()),e}_callObserver(e,n){super._callObserver(e,n);const r=new b_(this,e,n);Ia(this,e,r),!e.local&&this._hasFormatting&&(e._needFormattingCleanup=!0)}toString(){this.doc??It();let e="",n=this._start;for(;n!==null;)!n.deleted&&n.countable&&n.content.constructor===lr&&(e+=n.content.str),n=n.right;return e}toJSON(){return this.toString()}applyDelta(e,{sanitize:n=!0}={}){this.doc!==null?He(this.doc,r=>{const o=new ic(null,this._start,0,new Map);for(let s=0;s<e.length;s++){const i=e[s];if(i.insert!==void 0){const a=!n&&typeof i.insert=="string"&&s===e.length-1&&o.right===null&&i.insert.slice(-1)===`
`?i.insert.slice(0,-1):i.insert;(typeof a!="string"||a.length>0)&&Cl(r,this,o,a,i.attributes||{})}else i.retain!==void 0?Tp(r,this,o,i.retain,i.attributes||{}):i.delete!==void 0&&Sp(r,o,i.delete)}}):this._pending.push(()=>this.applyDelta(e))}toDelta(e,n,r){this.doc??It();const o=[],s=new Map,i=this.doc;let a="",c=this._start;function u(){if(a.length>0){const p={};let f=!1;s.forEach((b,x)=>{f=!0,p[x]=b});const h={insert:a};f&&(h.attributes=p),o.push(h),a=""}}const d=()=>{for(;c!==null;){if(Ao(c,e)||n!==void 0&&Ao(c,n))switch(c.content.constructor){case lr:{const p=s.get("ychange");e!==void 0&&!Ao(c,e)?(p===void 0||p.user!==c.id.client||p.type!=="removed")&&(u(),s.set("ychange",r?r("removed",c.id):{type:"removed"})):n!==void 0&&!Ao(c,n)?(p===void 0||p.user!==c.id.client||p.type!=="added")&&(u(),s.set("ychange",r?r("added",c.id):{type:"added"})):p!==void 0&&(u(),s.delete("ychange")),a+=c.content.str;break}case jr:case cs:{u();const p={insert:c.content.getContent()[0]};if(s.size>0){const f={};p.attributes=f,s.forEach((h,b)=>{f[b]=h})}o.push(p);break}case vt:Ao(c,e)&&(u(),ls(s,c.content));break}c=c.right}u()};return e||n?He(i,p=>{e&&oc(p,e),n&&oc(p,n),d()},"cleanup"):d(),o}insert(e,n,r){if(n.length<=0)return;const o=this.doc;o!==null?He(o,s=>{const i=Li(s,this,e,!r);r||(r={},i.currentAttributes.forEach((a,c)=>{r[c]=a})),Cl(s,this,i,n,r)}):this._pending.push(()=>this.insert(e,n,r))}insertEmbed(e,n,r){const o=this.doc;o!==null?He(o,s=>{const i=Li(s,this,e,!r);Cl(s,this,i,n,r||{})}):this._pending.push(()=>this.insertEmbed(e,n,r||{}))}delete(e,n){if(n===0)return;const r=this.doc;r!==null?He(r,o=>{Sp(o,Li(o,this,e,!0),n)}):this._pending.push(()=>this.delete(e,n))}format(e,n,r){if(n===0)return;const o=this.doc;o!==null?He(o,s=>{const i=Li(s,this,e,!1);i.right!==null&&Tp(s,this,i,n,r)}):this._pending.push(()=>this.format(e,n,r))}removeAttribute(e){this.doc!==null?He(this.doc,n=>{na(n,this,e)}):this._pending.push(()=>this.removeAttribute(e))}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{iu(r,this,e,n)}):this._pending.push(()=>this.setAttribute(e,n))}getAttribute(e){return au(this,e)}getAttributes(){return Bw(this)}_write(e){e.writeTypeRef(k_)}}class El{constructor(e,n=()=>!0){this._filter=n,this._root=e,this._currentNode=e._start,this._firstCall=!0,e.doc??It()}[Symbol.iterator](){return this}next(){let e=this._currentNode,n=e&&e.content&&e.content.type;if(e!==null&&(!this._firstCall||e.deleted||!this._filter(n)))do if(n=e.content.type,!e.deleted&&(n.constructor===Us||n.constructor===Go)&&n._start!==null)e=n._start;else for(;e!==null;){const r=e.next;if(r!==null){e=r;break}else e.parent===this._root?e=null:e=e.parent._item}while(e!==null&&(e.deleted||!this._filter(e.content.type)));return this._firstCall=!1,e===null?{value:void 0,done:!0}:(this._currentNode=e,{value:e.content.type,done:!1})}}class Go extends Tt{constructor(){super(),this._prelimContent=[]}get firstChild(){const e=this._first;return e?e.content.getContent()[0]:null}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new Go}clone(){const e=new Go;return e.insert(0,this.toArray().map(n=>n instanceof Tt?n.clone():n)),e}get length(){return this.doc??It(),this._prelimContent===null?this._length:this._prelimContent.length}createTreeWalker(e){return new El(this,e)}querySelector(e){e=e.toUpperCase();const r=new El(this,o=>o.nodeName&&o.nodeName.toUpperCase()===e).next();return r.done?null:r.value}querySelectorAll(e){return e=e.toUpperCase(),Vo(new El(this,n=>n.nodeName&&n.nodeName.toUpperCase()===e))}_callObserver(e,n){Ia(this,e,new v_(this,n,e))}toString(){return Iw(this,e=>e.toString()).join("")}toJSON(){return this.toString()}toDOM(e=document,n={},r){const o=e.createDocumentFragment();return r!==void 0&&r._createAssociation(o,this),qs(this,s=>{o.insertBefore(s.toDOM(e,n,r),null)}),o}insert(e,n){this.doc!==null?He(this.doc,r=>{$w(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}insertAfter(e,n){if(this.doc!==null)He(this.doc,r=>{const o=e&&e instanceof Tt?e._item:e;ta(r,this,o,n)});else{const r=this._prelimContent,o=e===null?0:r.findIndex(s=>s===e)+1;if(o===0&&e!==null)throw Ho("Reference item not found");r.splice(o,0,...n)}}delete(e,n=1){this.doc!==null?He(this.doc,r=>{Fw(r,this,e,n)}):this._prelimContent.splice(e,n)}toArray(){return jw(this)}push(e){this.insert(this.length,e)}unshift(e){this.insert(0,e)}get(e){return Lw(this,e)}slice(e=0,n=this.length){return Ow(this,e,n)}forEach(e){qs(this,e)}_write(e){e.writeTypeRef(T_)}}class Us extends Go{constructor(e="UNDEFINED"){super(),this.nodeName=e,this._prelimAttrs=new Map}get nextSibling(){const e=this._item?this._item.next:null;return e?e.content.type:null}get prevSibling(){const e=this._item?this._item.prev:null;return e?e.content.type:null}_integrate(e,n){super._integrate(e,n),this._prelimAttrs.forEach((r,o)=>{this.setAttribute(o,r)}),this._prelimAttrs=null}_copy(){return new Us(this.nodeName)}clone(){const e=new Us(this.nodeName),n=this.getAttributes();return v2(n,(r,o)=>{typeof r=="string"&&e.setAttribute(o,r)}),e.insert(0,this.toArray().map(r=>r instanceof Tt?r.clone():r)),e}toString(){const e=this.getAttributes(),n=[],r=[];for(const a in e)r.push(a);r.sort();const o=r.length;for(let a=0;a<o;a++){const c=r[a];n.push(c+'="'+e[c]+'"')}const s=this.nodeName.toLocaleLowerCase(),i=n.length>0?" "+n.join(" "):"";return`<${s}${i}>${super.toString()}</${s}>`}removeAttribute(e){this.doc!==null?He(this.doc,n=>{na(n,this,e)}):this._prelimAttrs.delete(e)}setAttribute(e,n){this.doc!==null?He(this.doc,r=>{iu(r,this,e,n)}):this._prelimAttrs.set(e,n)}getAttribute(e){return au(this,e)}hasAttribute(e){return qw(this,e)}getAttributes(e){return e?f_(this,e):Bw(this)}toDOM(e=document,n={},r){const o=e.createElement(this.nodeName),s=this.getAttributes();for(const i in s){const a=s[i];typeof a=="string"&&o.setAttribute(i,a)}return qs(this,i=>{o.appendChild(i.toDOM(e,n,r))}),r!==void 0&&r._createAssociation(o,this),o}_write(e){e.writeTypeRef(N_),e.writeKey(this.nodeName)}}class v_ extends Oa{constructor(e,n,r){super(e,r),this.childListChanged=!1,this.attributesChanged=new Set,n.forEach(o=>{o===null?this.childListChanged=!0:this.attributesChanged.add(o)})}}class Kw{constructor(e,n){this.id=e,this.length=n}get deleted(){throw Wn()}mergeWith(e){return!1}write(e,n,r){throw Wn()}integrate(e,n){throw Wn()}}const x_=0;class br extends Kw{get deleted(){return!0}delete(){}mergeWith(e){return this.constructor!==e.constructor?!1:(this.length+=e.length,!0)}integrate(e,n){n>0&&(this.id.clock+=n,this.length-=n),Sw(e.doc.store,this)}write(e,n){e.writeInfo(x_),e.writeLen(this.length-n)}getMissing(e,n){return null}}class La{constructor(e){this.content=e}getLength(){return 1}getContent(){return[this.content]}isCountable(){return!0}copy(){return new La(this.content)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeBuf(this.content)}getRef(){return 3}}class oa{constructor(e){this.len=e}getLength(){return this.len}getContent(){return[]}isCountable(){return!1}copy(){return new oa(this.len)}splice(e){const n=new oa(this.len-e);return this.len=e,n}mergeWith(e){return this.len+=e.len,!0}integrate(e,n){kw(e.deleteSet,n.id.client,n.id.clock,this.len),n.markDeleted()}delete(e){}gc(e){}write(e,n){e.writeLen(this.len-n)}getRef(){return 1}}const y_=(t,e)=>new ai({guid:t,...e,shouldLoad:e.shouldLoad||e.autoLoad||!1});class Pa{constructor(e){e._item&&console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."),this.doc=e;const n={};this.opts=n,e.gc||(n.gc=!1),e.autoLoad&&(n.autoLoad=!0),e.meta!==null&&(n.meta=e.meta)}getLength(){return 1}getContent(){return[this.doc]}isCountable(){return!0}copy(){return new Pa(y_(this.doc.guid,this.opts))}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){this.doc._item=n,e.subdocsAdded.add(this.doc),this.doc.shouldLoad&&e.subdocsLoaded.add(this.doc)}delete(e){e.subdocsAdded.has(this.doc)?e.subdocsAdded.delete(this.doc):e.subdocsRemoved.add(this.doc)}gc(e){}write(e,n){e.writeString(this.doc.guid),e.writeAny(this.opts)}getRef(){return 9}}class cs{constructor(e){this.embed=e}getLength(){return 1}getContent(){return[this.embed]}isCountable(){return!0}copy(){return new cs(this.embed)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeJSON(this.embed)}getRef(){return 5}}class vt{constructor(e,n){this.key=e,this.value=n}getLength(){return 1}getContent(){return[]}isCountable(){return!1}copy(){return new vt(this.key,this.value)}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){const r=n.parent;r._searchMarker=null,r._hasFormatting=!0}delete(e){}gc(e){}write(e,n){e.writeKey(this.key),e.writeJSON(this.value)}getRef(){return 6}}const __=ea("node_env")==="development";class Ko{constructor(e){this.arr=e,__&&hw(e)}getLength(){return this.arr.length}getContent(){return this.arr}isCountable(){return!0}copy(){return new Ko(this.arr)}splice(e){const n=new Ko(this.arr.slice(e));return this.arr=this.arr.slice(0,e),n}mergeWith(e){return this.arr=this.arr.concat(e.arr),!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){const r=this.arr.length;e.writeLen(r-n);for(let o=n;o<r;o++){const s=this.arr[o];e.writeAny(s)}}getRef(){return 8}}class lr{constructor(e){this.str=e}getLength(){return this.str.length}getContent(){return this.str.split("")}isCountable(){return!0}copy(){return new lr(this.str)}splice(e){const n=new lr(this.str.slice(e));this.str=this.str.slice(0,e);const r=this.str.charCodeAt(e-1);return r>=55296&&r<=56319&&(this.str=this.str.slice(0,e-1)+"�",n.str="�"+n.str.slice(1)),n}mergeWith(e){return this.str+=e.str,!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeString(n===0?this.str:this.str.slice(n))}getRef(){return 4}}const C_=0,E_=1,k_=2,N_=3,T_=4;class jr{constructor(e){this.type=e}getLength(){return 1}getContent(){return[this.type]}isCountable(){return!0}copy(){return new jr(this.type._copy())}splice(e){throw Wn()}mergeWith(e){return!1}integrate(e,n){this.type._integrate(e.doc,n)}delete(e){let n=this.type._start;for(;n!==null;)n.deleted?n.id.clock<(e.beforeState.get(n.id.client)||0)&&e._mergeStructs.push(n):n.delete(e),n=n.right;this.type._map.forEach(r=>{r.deleted?r.id.clock<(e.beforeState.get(r.id.client)||0)&&e._mergeStructs.push(r):r.delete(e)}),e.changed.delete(this.type)}gc(e){let n=this.type._start;for(;n!==null;)n.gc(e,!0),n=n.right;this.type._start=null,this.type._map.forEach(r=>{for(;r!==null;)r.gc(e,!0),r=r.left}),this.type._map=new Map}write(e,n){this.type._write(e)}getRef(){return 7}}const Yw=(t,e,n)=>{const{client:r,clock:o}=e.id,s=new Ot(nt(r,o+n),e,nt(r,o+n-1),e.right,e.rightOrigin,e.parent,e.parentSub,e.content.splice(n));return e.deleted&&s.markDeleted(),e.keep&&(s.keep=!0),e.redone!==null&&(s.redone=nt(e.redone.client,e.redone.clock+n)),e.right=s,s.right!==null&&(s.right.left=s),t._mergeStructs.push(s),s.parentSub!==null&&s.right===null&&s.parent._map.set(s.parentSub,s),e.length=n,s};class Ot extends Kw{constructor(e,n,r,o,s,i,a,c){super(e,c.getLength()),this.origin=r,this.left=n,this.right=o,this.rightOrigin=s,this.parent=i,this.parentSub=a,this.redone=null,this.content=c,this.info=this.content.isCountable()?cp:0}set marker(e){(this.info&bl)>0!==e&&(this.info^=bl)}get marker(){return(this.info&bl)>0}get keep(){return(this.info&lp)>0}set keep(e){this.keep!==e&&(this.info^=lp)}get countable(){return(this.info&cp)>0}get deleted(){return(this.info&gl)>0}set deleted(e){this.deleted!==e&&(this.info^=gl)}markDeleted(){this.info|=gl}getMissing(e,n){if(this.origin&&this.origin.client!==this.id.client&&this.origin.clock>=Kt(n,this.origin.client))return this.origin.client;if(this.rightOrigin&&this.rightOrigin.client!==this.id.client&&this.rightOrigin.clock>=Kt(n,this.rightOrigin.client))return this.rightOrigin.client;if(this.parent&&this.parent.constructor===Ui&&this.id.client!==this.parent.client&&this.parent.clock>=Kt(n,this.parent.client))return this.parent.client;if(this.origin&&(this.left=_p(e,n,this.origin),this.origin=this.left.lastId),this.rightOrigin&&(this.right=Tr(e,this.rightOrigin),this.rightOrigin=this.right.id),this.left&&this.left.constructor===br||this.right&&this.right.constructor===br)this.parent=null;else if(!this.parent)this.left&&this.left.constructor===Ot?(this.parent=this.left.parent,this.parentSub=this.left.parentSub):this.right&&this.right.constructor===Ot&&(this.parent=this.right.parent,this.parentSub=this.right.parentSub);else if(this.parent.constructor===Ui){const r=_l(n,this.parent);r.constructor===br?this.parent=null:this.parent=r.content.type}return null}integrate(e,n){if(n>0&&(this.id.clock+=n,this.left=_p(e,e.doc.store,nt(this.id.client,this.id.clock-1)),this.origin=this.left.lastId,this.content=this.content.splice(n),this.length-=n),this.parent){if(!this.left&&(!this.right||this.right.left!==null)||this.left&&this.left.right!==this.right){let r=this.left,o;if(r!==null)o=r.right;else if(this.parentSub!==null)for(o=this.parent._map.get(this.parentSub)||null;o!==null&&o.left!==null;)o=o.left;else o=this.parent._start;const s=new Set,i=new Set;for(;o!==null&&o!==this.right;){if(i.add(o),s.add(o),ji(this.origin,o.origin)){if(o.id.client<this.id.client)r=o,s.clear();else if(ji(this.rightOrigin,o.rightOrigin))break}else if(o.origin!==null&&i.has(_l(e.doc.store,o.origin)))s.has(_l(e.doc.store,o.origin))||(r=o,s.clear());else break;o=o.right}this.left=r}if(this.left!==null){const r=this.left.right;this.right=r,this.left.right=this}else{let r;if(this.parentSub!==null)for(r=this.parent._map.get(this.parentSub)||null;r!==null&&r.left!==null;)r=r.left;else r=this.parent._start,this.parent._start=this;this.right=r}this.right!==null?this.right.left=this:this.parentSub!==null&&(this.parent._map.set(this.parentSub,this),this.left!==null&&this.left.delete(e)),this.parentSub===null&&this.countable&&!this.deleted&&(this.parent._length+=this.length),Sw(e.doc.store,this),this.content.integrate(e,this),Ep(e,this.parent,this.parentSub),(this.parent._item!==null&&this.parent._item.deleted||this.parentSub!==null&&this.right!==null)&&this.delete(e)}else new br(this.id,this.length).integrate(e,0)}get next(){let e=this.right;for(;e!==null&&e.deleted;)e=e.right;return e}get prev(){let e=this.left;for(;e!==null&&e.deleted;)e=e.left;return e}get lastId(){return this.length===1?this.id:nt(this.id.client,this.id.clock+this.length-1)}mergeWith(e){if(this.constructor===e.constructor&&ji(e.origin,this.lastId)&&this.right===e&&ji(this.rightOrigin,e.rightOrigin)&&this.id.client===e.id.client&&this.id.clock+this.length===e.id.clock&&this.deleted===e.deleted&&this.redone===null&&e.redone===null&&this.content.constructor===e.content.constructor&&this.content.mergeWith(e.content)){const n=this.parent._searchMarker;return n&&n.forEach(r=>{r.p===e&&(r.p=this,!this.deleted&&this.countable&&(r.index-=this.length))}),e.keep&&(this.keep=!0),this.right=e.right,this.right!==null&&(this.right.left=this),this.length+=e.length,!0}return!1}delete(e){if(!this.deleted){const n=this.parent;this.countable&&this.parentSub===null&&(n._length-=this.length),this.markDeleted(),kw(e.deleteSet,this.id.client,this.id.clock,this.length),Ep(e,n,this.parentSub),this.content.delete(e)}}gc(e,n){if(!this.deleted)throw oo();this.content.gc(e),n?r_(e,this,new br(this.id,this.length)):this.content=new oa(this.length)}write(e,n){const r=n>0?nt(this.id.client,this.id.clock+n-1):this.origin,o=this.rightOrigin,s=this.parentSub,i=this.content.getRef()&zy|(r===null?0:Zi)|(o===null?0:dw)|(s===null?0:Hy);if(e.writeInfo(i),r!==null&&e.writeLeftID(r),o!==null&&e.writeRightID(o),r===null&&o===null){const a=this.parent;if(a._item!==void 0){const c=a._item;if(c===null){const u=e_(a);e.writeParentInfo(!0),e.writeString(u)}else e.writeParentInfo(!1),e.writeLeftID(c.id)}else a.constructor===String?(e.writeParentInfo(!0),e.writeString(a)):a.constructor===Ui?(e.writeParentInfo(!1),e.writeLeftID(a)):oo();s!==null&&e.writeString(s)}this.content.write(e,n)}}const Ww=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:{},Jw="__ $YJS$ __";Ww[Jw]===!0&&console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");Ww[Jw]=!0;g.createCommand("CONNECTED_COMMAND");const S_=g.createCommand("TOGGLE_CONNECT_COMMAND");var A_=Object.defineProperty,D_=(t,e,n)=>e in t?A_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>D_(t,typeof e!="symbol"?e+"":e,n);const kl=t=>g.$applyNodeReplacement(g.$parseSerializedNode(t)),so=g.createState("cid",{parse:t=>typeof t=="string"?t:void 0}),io=g.createState("segment",{parse:t=>typeof t=="string"?t:void 0}),ac="unknown",Xw=1;class xo extends g.ElementNode{constructor(e="",n,r,o){super(o),de(this,"__tag"),de(this,"__marker"),de(this,"__unknownAttributes"),this.__tag=e,this.__marker=n,this.__unknownAttributes=r}static getType(){return"unknown"}static clone(e){const{__tag:n,__marker:r,__unknownAttributes:o,__key:s}=e;return new xo(n,r,o,s)}static importDOM(){return{[ac]:e=>R_(e)?{conversion:M_,priority:1}:null}}static importJSON(e){return Qw().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTag(e.tag).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setTag(e){if(this.__tag===e)return this;const n=this.getWritable();return n.__tag=e,n}getTag(){return this.getLatest().__tag}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(ac);return e.style.display="none",e}updateDOM(){return!1}exportDOM(){return{element:null}}exportJSON(){return{...super.exportJSON(),type:this.getType(),tag:this.getTag(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:Xw}}canBeEmpty(){return!0}isInline(){return!0}extractWithChild(){return!1}excludeFromCopy(e){return e!=="clone"}}function M_(t){const e=t.getAttribute("data-tag")??"",n=t.getAttribute("data-marker")??"";return{node:Qw(e,n)}}function Qw(t,e,n){return g.$applyNodeReplacement(new xo(t,e,n))}function R_(t){return(t==null?void 0:t.tagName)===ac}function li(t){return t instanceof xo}const Vs="id",Zw=1;class mn extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker",Vs),de(this,"__code"),de(this,"__unknownAttributes"),this.__code=e,this.__unknownAttributes=n}static getType(){return"book"}static clone(e){const{__code:n,__unknownAttributes:r,__key:o}=e;return new mn(n,r,o)}static importJSON(e){const{code:n}=e;return em(n).updateFromJSON(e)}static isValidBookCode(e){return vv(e)}updateFromJSON(e){return super.updateFromJSON(e).setCode(e.code).setUnknownAttributes(e.unknownAttributes)}getMarker(){return this.getLatest().__marker}setCode(e){if(this.__code===e)return this;const n=this.getWritable();return n.__code=e,n}getCode(){return this.getLatest().__code}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e.setAttribute("data-code",this.__code),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),code:this.getCode(),unknownAttributes:this.getUnknownAttributes(),version:Zw}}}function em(t,e){return g.$applyNodeReplacement(new mn(t,e))}function Jn(t){return t instanceof mn}function O_(t){return(t==null?void 0:t.type)===mn.getType()}const qe=" ",lc="​",lu=`${qe}|`,$a="p",ao="+",cu="-",sa="chapter",cc="verse",Ap="invalid",j_="text-spacing",I_="formatted-font",L_="marker-",uu="external-usj-mutation",tm="selection-change",uc="cursor-change",dc="annotation-change",pc="delta-change",P_=[uu,tm,uc,dc,pc],ia="c",nm=1;class jn extends g.ElementNode{constructor(e="",n,r,o,s,i){super(i),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=ia,this.__number=e,this.__sid=n,this.__altnumber=r,this.__pubnumber=o,this.__unknownAttributes=s}static getType(){return"chapter"}static clone(e){const{__number:n,__sid:r,__altnumber:o,__pubnumber:s,__unknownAttributes:i,__key:a}=e;return new jn(n,r,o,s,i,a)}static importJSON(e){return rm().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(sa,`usfm_${this.__marker}`),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:nm}}}function rm(t,e,n,r,o){return g.$applyNodeReplacement(new jn(t,e,n,r,o))}function du(t){return t instanceof jn}function $_(t){return(t==null?void 0:t.type)===jn.getType()}const om=["fr","fq","fqa","fk","ft","fl","fw","fp","fv","fdc","fm"],sm=["xo","xop","xk","xq","xt","xta","xot","xnt","xdc"],F_=["ca","cp","va","vp","add","bk","dc","em","jmp","k","nd","ord","pn","png","qt","rb","rq","sig","sls","tl","w","wa","wg","wh","wj","bd","it","bdit","no","sc","sup","ior","iqt","qac","qs","litl","lik","liv","liv1","liv2","liv3","liv4","liv5",...om,...sm],im=1;class Qe extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"char"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Qe(n,r,o)}static isValidMarker(e){return e!==void 0&&F_.includes(e)}static isValidFootnoteMarker(e){return e!==void 0&&om.includes(e)}static isValidCrossReferenceMarker(e){return e!==void 0&&sm.includes(e)}static importDOM(){return{span:e=>q_(e)?{conversion:B_,priority:1}:null}}static importJSON(e){return Hn().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.setAttribute("title",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:im}}insertNewAfter(e,n){const r=Hn(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}canBeEmpty(){return!1}isInline(){return!0}}function B_(t){const e=t.getAttribute("data-marker")??"f";return{node:Hn(e)}}function Hn(t,e){return g.$applyNodeReplacement(new Qe(t,e))}function q_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return Qe.isValidMarker(e)&&t.classList.contains(Qe.getType())}function Ue(t){return t instanceof Qe}function U_(t){return(t==null?void 0:t.type)===Qe.getType()}const am=1,V_="c",lm="span";class pr extends g.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=V_,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-chapter"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new pr(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>cm(e)?{conversion:H_,priority:1}:null}}static importJSON(e){return pu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(lm);return e.setAttribute("data-marker",this.__marker),e.classList.add(sa,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(sa,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return this.getShowMarker()?ui(this.getMarker(),this.getNumber()):this.getNumber()}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:am}}isInline(){return!1}isKeyboardSelectable(){return!1}}function H_(t){const e=t.getAttribute("data-number")??"0";return{node:pu(e)}}function pu(t,e,n,r,o,s){return g.$applyNodeReplacement(new pr(t,e,n,r,o,s))}function cm(t){return t?t.classList.contains(sa)&&t.tagName.toLowerCase()===lm:!1}function ci(t){return t instanceof pr}function z_(t){return(t==null?void 0:t.type)===pr.getType()}const um=1;class Sr extends g.ParagraphNode{static getType(){return"implied-para"}static clone(e){return new Sr(e.__key)}static importJSON(e){return Nn().updateFromJSON(e)}getMarker(){return $a}exportJSON(){return{...super.exportJSON(),type:this.getType(),version:um}}insertNewAfter(e,n){const r=Nn();return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function Nn(){return g.$applyNodeReplacement(new Sr)}function cr(t){return t instanceof Sr}function fu(t){return(t==null?void 0:t.type)===Sr.getType()}const lo="zmsc-s",Lo="zmsc-e",G_=[lo,Lo],K_=["ts-s","ts-e","t-s","t-e","ts","qt1-s","qt1-e","qt2-s","qt2-e","qt3-s","qt3-e","qt4-s","qt4-e","qt5-s","qt5-e","qt-s","qt-e",lo,Lo],dm=1;class Qn extends g.DecoratorNode{constructor(e="",n,r,o,s){super(s),de(this,"__marker"),de(this,"__sid"),de(this,"__eid"),de(this,"__unknownAttributes"),this.__marker=e,this.__sid=n,this.__eid=r,this.__unknownAttributes=o}static getType(){return"ms"}static clone(e){const{__marker:n,__sid:r,__eid:o,__unknownAttributes:s,__key:i}=e;return new Qn(n,r,o,s,i)}static importJSON(e){return pm().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&(K_.includes(e)||e.startsWith("z"))}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setSid(e.sid).setEid(e.eid).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setEid(e){if(this.__eid===e)return this;const n=this.getWritable();return n.__eid=e,n}getEid(){return this.getLatest().__eid}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}decorate(){return""}exportJSON(){return{type:this.getType(),marker:this.getMarker(),sid:this.getSid(),eid:this.getEid(),unknownAttributes:this.getUnknownAttributes(),version:dm}}isKeyboardSelectable(){return!1}}function Y_(t){return G_.includes(t)}function pm(t,e,n,r){return g.$applyNodeReplacement(new Qn(t,e,n,r))}function Fa(t){return t instanceof Qn}const hu="f",W_=[hu,"fe","ef","efe","x","ex"],fm=1;class xt extends g.ElementNode{constructor(e=hu,n,r=!0,o,s,i){super(i),de(this,"__marker"),de(this,"__caller"),de(this,"__isCollapsed"),de(this,"__category"),de(this,"__unknownAttributes"),this.__marker=e,this.__caller=n??(e==="x"||e==="ex"?cu:ao),this.__isCollapsed=r,this.__category=o,this.__unknownAttributes=s}static getType(){return"note"}static clone(e){const{__marker:n,__caller:r,__isCollapsed:o,__category:s,__unknownAttributes:i,__key:a}=e;return new xt(n,r,o,s,i,a)}static importDOM(){return{span:e=>X_(e)?{conversion:J_,priority:1}:null}}static importJSON(e){return wu().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&W_.includes(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setCaller(e.caller).setIsCollapsed(e.isCollapsed).setCategory(e.category).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setIsCollapsed(e){if(this.__isCollapsed===e)return this;const n=this.getWritable();return n.__isCollapsed=e,n}toggleIsCollapsed(){const e=this.getWritable();return e.__isCollapsed=!e.__isCollapsed,e}getIsCollapsed(){return this.getLatest().__isCollapsed}setCategory(e){if(this.__category===e)return this;const n=this.getWritable();return n.__category=e,n}getCategory(){return this.getLatest().__category}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`,this.__isCollapsed?"collapsed":"expanded"),e.setAttribute("data-caller",this.__caller),e}updateDOM(e){return e.__isCollapsed!==this.__isCollapsed}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`,this.getIsCollapsed()?"collapsed":"expanded"),n.setAttribute("data-caller",this.getCaller())),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),caller:this.getCaller(),isCollapsed:this.getIsCollapsed(),category:this.getCategory(),unknownAttributes:this.getUnknownAttributes(),version:fm}}canBeEmpty(){return!1}isInline(){return!0}}function J_(t){const e=t.getAttribute("data-marker")??"f",n=t.getAttribute("data-caller")??"",r=t.classList.contains("collapsed");return{node:wu(e,n,r)}}function wu(t,e,n,r,o){return g.$applyNodeReplacement(new xt(t,e,n,r,o))}function X_(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return xt.isValidMarker(e)&&t.classList.contains(xt.getType())}function Se(t){return t instanceof xt}const Q_=["ide","sts","rem","h","toc1","toc2","toc3","toca1","toca2","toca3","imt","imt1","imt2","imt3","imt4","is","is1","is2","ip","ipi","im","imi","ipq","imq","ipr","iq","iq1","iq2","iq3","ili","ili1","ili2","ib","iot","io","io1","io2","io3","io4","iex","imte","imte1","imte2","ie","mt","mt1","mt2","mt3","mt4","mte","mte1","mte2","cl","cd","ms","ms1","ms2","ms3","mr","s","s1","s2","s3","s4","sr","r","d","sp","sd","sd1","sd2","sd3","sd4",$a,"m","po","cls","pr","pc","pm","pmo","pmc","pmr","pi","pi1","pi2","pi3","mi","lit","nb","q","q1","q2","q3","q4","qr","qc","qa","qm","qm1","qm2","qm3","qd","b","lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4","pb"],hm=1;class Yt extends g.ParagraphNode{constructor(e=$a,n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"para"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Yt(n,r,o)}static isValidMarker(e){return e!==void 0&&Q_.includes(e)}static importDOM(){return{p:()=>({conversion:Z_,priority:1})}}static importJSON(e){return Hs().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:hm}}insertNewAfter(e,n){const r=Hs(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function Z_(t){const e=t.getAttribute("data-marker")??void 0,n=Hs(e);if(t.style){n.setFormat(t.style.textAlign);const r=parseInt(t.style.textIndent,10)/20;r>0&&n.setIndent(r)}return{node:n}}function Hs(t,e){return g.$applyNodeReplacement(new Yt(t,e))}function jt(t){return t instanceof Yt}function e1(t){return(t==null?void 0:t.type)===Yt.getType()}const aa="v",wm=1;class Bt extends g.TextNode{constructor(e="",n,r,o,s,i,a){super(n??e,a),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=aa,this.__number=e,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"verse"}static clone(e){const{__number:n,__text:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new Bt(n,r,o,s,i,a,c)}static importJSON(e){return mm().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(cc,`usfm_${this.__marker}`),n.setAttribute("data-number",this.__number),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:wm}}}function mm(t,e,n,r,o,s){return g.$applyNodeReplacement(new Bt(t,e,n,r,o,s))}function mu(t){return t instanceof Bt}function t1(t){return(t==null?void 0:t.type)===Bt.getType()}function n1(t){return $_(t)||z_(t)}function hn(t){return du(t)||ci(t)}function r1(t,e){return t.find(n=>hn(n)&&n.getNumber()===e.toString())}function o1(t,e=!1){return t.find((n,r)=>(!e||r>0)&&hn(n))}function gu(t){var e;if(!t)return;if(hn(t))return t;let n=(e=t.getTopLevelElement())==null?void 0:e.getPreviousSibling();for(;n&&!hn(n);)n=n.getPreviousSibling();if(n&&hn(n))return n}function gm(t){let e=t;for(;e!==null;){if(Se(e))return e;e=e.getParent()}}function s1(t){return Jn(t)||du(t)||Ue(t)||ci(t)||cr(t)||Fa(t)||jt(t)||Se(t)||mu(t)||li(t)}function i1(t){var e;if(t.anchor.type==="element"){const r=t.anchor.getNode(),o=t.anchor.offset;if(o<r.getChildrenSize())return r.getChildAtIndex(o)}const n=t.anchor.getNode();return n.getNextSibling()??((e=n.getParent())==null?void 0:e.getNextSibling())??null}function a1(t){var e;const n=t.anchor.offset;if(t.anchor.type==="element"&&n>0)return t.anchor.getNode().getChildAtIndex(n-1);const r=t.anchor.getNode();return r.getPreviousSibling()??((e=r.getParent())==null?void 0:e.getPreviousSibling())??null}function kn(t){return jt(t)||cr(t)}function l1(t,e){let n=t.getParent();for(;n;){if(n.getKey()===e)return!0;n=n.getParent()}return!1}function co(t,e){const n=g.$getState(e,so),r=!!(t.cid&&n),o=!t.cid&&!n;return t.style===e.getMarker()&&(o||r&&t.cid===n)}function c1(t,e){const n=g.$isElementNode(t)?t:t.getParent(),r=g.$isElementNode(e)?e:e.getParent(),o=n&&r?g.$getCommonAncestor(n,r):void 0;return o?o.commonAncestor:void 0}function u1(t){const e=t.getStartEndPoints();if(!e)return;const[n,r]=e,o=t.isBackward()?n:r;t.focus.set(o.key,o.offset,o.type),t.anchor.set(o.key,o.offset,o.type)}function bu(t){return(t==null?void 0:t.type)===g.TextNode.getType()}function d1(t,e){if(!e)return;const n=t.findIndex(r=>r===e);n&&(t.length=n)}function p1(t,e){if(!e)return t;const n=e.getIndexWithinParent();return t.splice(n+1,t.length-n-1)}function fr(t){return`\\${t}`}function Yo(t){return`\\${t}*`}function bm(t,e,n){const r=fr(t);if(e!=null&&e.startsWith(r)){const o=parseInt(e.slice(r.length),10);isNaN(o)||(n=o.toString())}return n}function ui(t,e){let n=fr(t);return e&&(n+=`${qe}${e}`),n+=" ",n}function vm(t){return bu(t)?t.text:U_(t)?t.children.map(e=>vm(e)).join(""):""}function f1(t){return t.map(e=>vm(e)).join(" ").trim()}function vu(t){return qe+t+" "}function xu(t){return t.reduce((e,n)=>e+(Ue(n)?` ${n.getTextContent()}`:""),"").trim()}function yt(t,e=bv){const n={...t};return e.forEach(r=>{Reflect.deleteProperty(n,r)}),Object.keys(n).length===0?void 0:n}function h1(t,e){const n=e.getElementByKey(t.getKey());return n?n.tagName.toLowerCase():void 0}function wt(t){return Object.fromEntries(Object.entries(t).filter(([,e])=>e!==void 0))}function xm(t){if(!t)return;const e=t.getNodes();if(e.length>0)return t.isBackward()?e[e.length-1]:e[0]}function fc(t,e){if(!e)return(t+1).toString();const n=e.split("-");if(n.length===2)return parseInt(n[1])?`${parseInt(n[1])+1}`:`${parseInt(n[0])+1}`;const r=RegExp(/^(\d+)([a-yA-Y]{1,3})$/).exec(e);if(!r)return(parseInt(e)+1).toString();const o=String.fromCharCode(r[2].charCodeAt(0)+1);return`${r[1]}${o}`}function yu(t,e){if(!e)return!1;const n=e.split("-").map(r=>parseInt(r));if(n.length<1||n.length>2||n[0]>n[1])throw new Error("isVerseInRange: invalid range");return n.length===1?t===n[0]:n.length===2&&isNaN(n[1])?t>=n[0]:(n.length===2&&isNaN(n[0])||t>=n[0])&&t<=n[1]}function w1(t){return!!t&&t.includes("-")}const m1=1;class yo extends g.TextNode{constructor(e="",n="opening",r){super(Nl(e,n),r),de(this,"__marker"),de(this,"__markerSyntax"),this.__marker=e,this.__markerSyntax=n}static getType(){return"marker"}static clone(e){return new yo(e.__marker,e.__markerSyntax,e.__key)}static importJSON(e){return Wo().updateFromJSON(e)}updateFromJSON(e){const{marker:n,markerSyntax:r="opening"}=e;return super.updateFromJSON(e).setMarker(n).setMarkerSyntax(r)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n.__text=Nl(e,n.__markerSyntax),n}getMarker(){return this.getLatest().__marker}setMarkerSyntax(e){if(this.__markerSyntax===e)return this;const n=this.getWritable();return n.__markerSyntax=e,n.__text=Nl(n.__marker,e),n}getMarkerSyntax(){return this.getLatest().__markerSyntax}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(this.__markerSyntax),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),text:this.getTextContent(),marker:this.getMarker(),markerSyntax:this.getMarkerSyntax(),version:m1}}}function Wo(t,e){return g.$applyNodeReplacement(new yo(t,e))}function di(t){return t instanceof yo}function Nl(t,e){return e==="closing"?Yo(t):e==="selfClosing"?Yo(""):fr(t)}const _r="internal-comment",g1=[_r],b1={},v1=1;class Nt extends g.ElementNode{constructor(e=b1,n){super(n),de(this,"__typedIDs"),this.__typedIDs=e}static getType(){return"typed-mark"}static clone(e){const n=JSON.parse(JSON.stringify(e.__typedIDs));return new Nt(n,e.__key)}static isReservedType(e){return g1.includes(e)}static importDOM(){return null}static importJSON(e){return zs().updateFromJSON(e)}exportJSON(){return{...super.exportJSON(),type:this.getType(),typedIDs:this.getTypedIDs(),version:v1}}createDOM(e){const n=document.createElement("mark");for(const[r,o]of Object.entries(this.__typedIDs))vr(n,Pi(e.theme.typedMark,r)),o.length>1&&vr(n,Pi(e.theme.typedMarkOverlap,r));return n}updateDOM(e,n,r){for(const[o,s]of Object.entries(this.__typedIDs)){const i=e.__typedIDs[o].length,a=s.length,c=Pi(r.theme.typedMark,o),u=Pi(r.theme.typedMarkOverlap,o);i!==a&&(i===0?a===1&&vr(n,c):a===0&&Ul(n,c),i===1?a===2&&vr(n,u):a===1&&Ul(n,u))}return!1}updateFromJSON(e){return super.updateFromJSON(e).setTypedIDs(e.typedIDs)}hasID(e,n){const r=this.getTypedIDs()[e];if(!r)return!1;for(const o of r)if(n===o)return!0;return!1}getTypedIDs(){const e=this.getLatest();return St(e)?e.__typedIDs:{}}setTypedIDs(e){const n=this.getWritable();return n.__typedIDs=e,n}addID(e,n){const r=this.getWritable();if(!St(r))return;const o=r.__typedIDs[e]??[];r.__typedIDs[e]=o;for(const s of o)if(n===s)return;o.push(n)}deleteID(e,n){const r=this.getWritable();if(!St(r))return;const o=r.__typedIDs[e];for(let s=0;s<o.length;s++)if(n===o[s]){o.splice(s,1);return}}hasNoIDsForEveryType(){return Object.values(this.getTypedIDs()).every(e=>e===void 0||e.length===0)}insertNewAfter(e,n=!0){const r=zs(this.__typedIDs);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,s=n.focus,i=o.getNode(),a=s.getNode(),c=n.isBackward()?o.offset-s.offset:s.offset-o.offset;return this.isParentOf(i)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}}function Pi(t,e){return`${t}-${e}`}function zs(t){return g.$applyNodeReplacement(new Nt(t))}function St(t){return t instanceof Nt}function x1(t){return(t==null?void 0:t.type)===Nt.getType()}function ym(t){const e=t.getChildren();let n=null;for(const r of e)n===null?t.insertBefore(r):n.insertAfter(r),n=r;t.remove()}function _m(t,e,n,r){const o=t.getNodes(),s=t.anchor.offset,i=t.focus.offset,a=o.length,c=t.isBackward(),u=c?i:s,d=c?s:i;let p,f;for(let h=0;h<a;h++){const b=o[h];if(g.$isElementNode(f)&&f.isParentOf(b))continue;const x=h===0,C=h===a-1;let E=null;if(g.$isTextNode(b)){const _=b.getTextContentSize(),A=x?u:0,j=C?d:_;if(A===0&&j===0)continue;const G=b.splitText(A,j);E=G.length>1&&(G.length===3||x&&!C||j===_)?G[1]:G[0]}else{if(St(b))continue;g.$isElementNode(b)&&b.isInline()&&(E=b)}if(E!==null){if(E&&E.is(p))continue;const _=E.getParent();(_==null||!_.is(p))&&(f=void 0),p=_,f===void 0&&(f=zs({[e]:[n]}),E.insertBefore(f)),f.append(E)}else p=void 0,f=void 0}e===_r&&g.$isElementNode(f)&&(c?f.selectStart():f.selectEnd())}function y1(t,e,n){let r=t;for(;r!==null;){if(St(r))return r.getTypedIDs()[e];if(g.$isTextNode(r)&&n===r.getTextContentSize()){const o=r.getNextSibling();if(St(o))return o.getTypedIDs()[e]}r=r.getParent()}}function Dp(t){return`external-${t}`}const Cm=1;class Ir extends g.DecoratorNode{constructor(e="",n="",r){super(r),de(this,"__textType"),de(this,"__text"),this.__textType=e,this.__text=n}static getType(){return"immutable-typed-text"}static clone(e){const{__textType:n,__text:r,__key:o}=e;return new Ir(n,r,o)}static importDOM(){return{span:e=>C1(e)?{conversion:_1,priority:1}:null}}static importJSON(e){return Jo().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTextType(e.textType).setTextContent(e.text)}setTextType(e){if(this.__textType===e)return this;const n=this.getWritable();return n.__textType=e,n}getTextType(){return this.getLatest().__textType}setTextContent(e){if(this.__text===e)return this;const n=this.getWritable();return n.__text=e,n}getTextContent(){return this.getLatest().__text}createDOM(){const e=document.createElement("span");return e.setAttribute("data-text-type",this.__textType),e.classList.add(this.__textType),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&n.setAttribute("data-text-type",this.getTextType()),{element:n}}decorate(){return this.getTextContent()}exportJSON(){return{type:this.getType(),textType:this.getTextType(),text:this.getTextContent(),version:Cm}}isKeyboardSelectable(){return!1}}function _1(t){const e=t.getAttribute("data-text-type")??"",n=t.textContent??"";return{node:Jo(e,n)}}function Jo(t,e){return g.$applyNodeReplacement(new Ir(t,e))}function C1(t){return(t==null?void 0:t.tagName)==="span"}function la(t){return t instanceof Ir}function E1(t){return(t==null?void 0:t.type)===Ir.getType()}const ca="unmatched",Em=1;class Lr extends g.DecoratorNode{constructor(e="",n){super(n),de(this,"__marker"),this.__marker=e}static getType(){return"unmatched"}static clone(e){const{__marker:n,__key:r}=e;return new Lr(n,r)}static importDOM(){return{[ca]:e=>N1(e)?{conversion:k1,priority:1}:null}}static importJSON(e){return _u().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}createDOM(){const e=document.createElement(ca);e.setAttribute("data-marker",this.__marker),e.classList.add(Ap);const n=this.__marker.endsWith("*");return e.title=n?"This closing marker has no matching opening marker!":"This opening marker has no matching closing marker!",e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(Ap)),{element:n}}decorate(){return`\\${this.getMarker()}${lc}`}exportJSON(){return{type:this.getType(),marker:this.getMarker(),version:Em}}isKeyboardSelectable(){return!1}}function k1(t){const e=t.getAttribute("data-marker")??"";return{node:_u(e)}}function _u(t){return g.$applyNodeReplacement(new Lr(t))}function N1(t){return(t==null?void 0:t.tagName)===ca}function km(t){return t instanceof Lr}const T1=[mn,pr,jn,Bt,Qe,xt,Qn,yo,xo,Ir,Lr,Yt,Sr,{replace:g.ParagraphNode,with:()=>Nn(),withKlass:Sr}];var U;(function(t){t.FileIdentification="FileIdentification",t.Headers="Headers",t.Remarks="Remarks",t.Introduction="Introduction",t.DivisionMarks="DivisionMarks",t.Paragraphs="Paragraphs",t.Poetry="Poetry",t.TitlesHeadings="TitlesHeadings",t.Tables="Tables",t.CenterTables="CenterTables",t.RightTables="RightTables",t.Lists="Lists",t.Footnotes="Footnotes",t.CrossReferences="CrossReferences",t.SpecialText="SpecialText",t.CharacterStyling="CharacterStyling",t.Breaks="Breaks",t.SpecialFeatures="SpecialFeatures",t.PeripheralReferences="PeripheralReferences",t.PeripheralMaterials="PeripheralMaterials",t.Uncategorized="Uncategorized"})(U||(U={}));var q;(function(t){t.Paragraph="Paragraph",t.Character="Character",t.Note="Note",t.Unknown="Unknown"})(q||(q={}));const S1={id:{category:U.FileIdentification,type:q.Paragraph,description:"File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)",hasEndMarker:!1,children:{FileIdentification:["usfm","ide"],Headers:["h","h1","h2","h3","toc1","toc2","toc3"],Remarks:["rem","sts","restore"],Introduction:["imt","imt1","imt2","imt3","imt4","imte","imte1","imte2","is","is1","is2","iot","io","io1","io2","io3","io4","ior","ip","im","ipi","imi","ili","ili1","ili2","ipq","imq","ipr","ib","iq","iq1","iq2","iq3","iex","ie"],DivisionMarks:["c","cl"],TitlesHeadings:["mt","mt1","mt2","mt3","mt4"]}},usfm:{category:U.FileIdentification,type:q.Paragraph,description:"File markup version information",hasEndMarker:!1,children:void 0},ide:{category:U.FileIdentification,type:q.Paragraph,description:"File encoding information",hasEndMarker:!1,children:{Remarks:["rem","sts"]}},h:{category:U.Headers,type:q.Paragraph,description:"Running header text for a book (basic)",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h1:{category:U.Headers,type:q.Paragraph,description:"Running header text",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h2:{category:U.Headers,type:q.Paragraph,description:"Running header text, left side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h3:{category:U.Headers,type:q.Paragraph,description:"Running header text, right side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},toc1:{category:U.Headers,type:q.Paragraph,description:"Long table of contents text",hasEndMarker:!1,children:void 0},toc2:{category:U.Headers,type:q.Paragraph,description:"Short table of contents text",hasEndMarker:!1,children:void 0},toc3:{category:U.Headers,type:q.Paragraph,description:"Book Abbreviation",hasEndMarker:!1,children:void 0},toca1:{category:U.Headers,type:q.Paragraph,description:"Alternative language long table of contents text",hasEndMarker:!1,children:void 0},toca2:{category:U.Headers,type:q.Paragraph,description:"Alternative language short table of contents text",hasEndMarker:!1,children:void 0},toca3:{category:U.Headers,type:q.Paragraph,description:"Alternative language book Abbreviation",hasEndMarker:!1,children:void 0},rem:{category:U.Remarks,type:q.Paragraph,description:"Comments and remarks",hasEndMarker:!1,children:void 0},sts:{category:U.Remarks,type:q.Paragraph,description:"Status of this file",hasEndMarker:!1,children:void 0},restore:{category:U.Remarks,type:q.Paragraph,description:"Project restore information",hasEndMarker:!1,children:void 0},imt:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt1:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt2:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt3:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt4:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 4 (usually within parenthesis)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte1:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte2:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"],CharacterStyling:["no"]}},is1:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is2:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},iot:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline title (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},io:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},io1:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 1 (if multiple levels) (basic)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io2:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 2",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io3:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 3",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io4:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 4",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ior:{category:U.Introduction,type:q.Character,description:"Introduction references range for outline entry; for marking references separately",hasEndMarker:!0,children:void 0},ip:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],Footnotes:["f","fe","fm"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},im:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, with no first line indent (may occur after poetry)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipi:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, indented, with first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imi:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph text, indented, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili1:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili2:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipq:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, quote from the body text",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imq:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, quote from the body text, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipr:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, right aligned",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ib:{category:U.Introduction,type:q.Paragraph,description:"Introduction blank line",hasEndMarker:!1,children:{Introduction:["iqt"]}},iq:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},iq1:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq2:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq3:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iex:{category:U.Introduction,type:q.Paragraph,description:"Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},iqt:{category:U.Introduction,type:q.Character,description:"For quoted scripture text appearing in the introduction",hasEndMarker:!0,children:void 0},ie:{category:U.Introduction,type:q.Paragraph,description:"Introduction ending marker",hasEndMarker:!1,children:void 0},c:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter number",hasEndMarker:!1,children:{DivisionMarks:["ca","cp","cl","cd"],Paragraphs:["p","m","po","pr","cls","pi","pi1","pi2","pi3","pc","mi","nb"],Poetry:["q","q1","q2","q3","q4","qc","qr","qa","qd","b"],TitlesHeadings:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],Lists:["lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4"],Footnotes:["f","fe"],SpecialText:["lit"],Breaks:["pb"]}},ca:{category:U.DivisionMarks,type:q.Character,description:"Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)",hasEndMarker:!0,children:void 0},cp:{category:U.DivisionMarks,type:q.Paragraph,description:"Published chapter number (chapter string that should appear in the published text)",hasEndMarker:!1,children:{Footnotes:["f"]}},cl:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",hasEndMarker:!1,children:void 0},cd:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter Description (Publishing option D, e.g. in Russian Bibles)",hasEndMarker:!1,children:{DivisionMarks:["vp"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},v:{category:U.DivisionMarks,type:q.Character,description:"A verse number",hasEndMarker:!1,children:void 0},va:{category:U.DivisionMarks,type:q.Character,description:"Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)",hasEndMarker:!0,children:void 0},vp:{category:U.DivisionMarks,type:q.Character,description:"Published verse marker (verse string that should appear in the published text)",hasEndMarker:!0,children:void 0},p:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with first line indent (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},m:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with no first line indent (may occur after poetry) (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},po:{category:U.Paragraphs,type:q.Paragraph,description:"Letter opening",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pr:{category:U.Paragraphs,type:q.Paragraph,description:"Text refrain (paragraph text, right aligned)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},cls:{category:U.Paragraphs,type:q.Paragraph,description:"Letter Closing",hasEndMarker:!1,children:{SpecialText:["tl","sig","pn","png","addpn","add"]}},pmo:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text opening",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pm:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text paragraph",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmc:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text closing",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmr:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi1:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi2:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 2 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi3:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 3 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pc:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, centered (for Inscription)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},mi:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, indented, with no first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},nb:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 1 indent (if single level)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q1:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 1 indent (if multiple levels) (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q2:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 2 indent (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q3:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 3 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q4:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 4 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qc:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, centered",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qr:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, Right Aligned",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qs:{category:U.Poetry,type:q.Character,description:"Poetry text, Selah",hasEndMarker:!0,children:{Footnotes:["f"],CrossReferences:["x"]}},qa:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, Acrostic marker/heading",hasEndMarker:!1,children:void 0},qac:{category:U.Poetry,type:q.Character,description:"Poetry text, Acrostic markup of the first character of a line of acrostic poetry",hasEndMarker:!0,children:void 0},qm:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 1 indent (if single level)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm1:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 1 indent (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm2:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 2 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm3:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 3 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qd:{category:U.Poetry,type:q.Paragraph,description:"A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},b:{category:U.Poetry,type:q.Paragraph,description:"Poetry text stanza break (e.g. stanza break) (basic)",hasEndMarker:!1,children:void 0},mt:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book (if single level)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt1:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book (if multiple levels) (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title usually occurring before the main title (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title occurring after the main title",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt4:{category:U.TitlesHeadings,type:q.Paragraph,description:"A small secondary title sometimes occurring within parentheses",hasEndMarker:!1,children:void 0},mte:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if single level)",hasEndMarker:!1,children:void 0},mte1:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte2"]}},mte2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title occurring before or after the 'ending' main title",hasEndMarker:!1,children:void 0},ms:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms1:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 2",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 3",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe"]}},mr:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division references range heading (basic)",hasEndMarker:!1,children:void 0},s:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s1:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 2 (e.g. Proverbs 22-24)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 3 (e.g. Genesis 'The First Day')",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s4:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 4",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sr:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section division references range heading",hasEndMarker:!1,children:void 0},r:{category:U.TitlesHeadings,type:q.Paragraph,description:"Parallel reference(s) (basic)",hasEndMarker:!1,children:void 0},sp:{category:U.TitlesHeadings,type:q.Paragraph,description:"A heading, to identify the speaker (e.g. Job)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},d:{category:U.TitlesHeadings,type:q.Paragraph,description:"A Hebrew text heading, to provide description (e.g. Psalms)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sd:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if single level)",hasEndMarker:!1,children:void 0},sd1:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if multiple levels)",hasEndMarker:!1,children:void 0},sd2:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 2",hasEndMarker:!1,children:void 0},sd3:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 3",hasEndMarker:!1,children:void 0},sd4:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 4",hasEndMarker:!1,children:void 0},lh:{category:U.Lists,type:q.Paragraph,description:"List header (introductory remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li1:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li2:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li3:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li4:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lf:{category:U.Lists,type:q.Paragraph,description:"List footer (concluding remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim1:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim2:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim3:{category:U.Lists,type:q.Paragraph,description:"An embedded list item, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim4:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},litl:{category:U.Lists,type:q.Character,description:"List entry total text",hasEndMarker:!0,children:void 0},lik:{category:U.Lists,type:q.Character,description:"Structured list entry key text",hasEndMarker:!0,children:void 0},liv:{category:U.Lists,type:q.Character,description:"Structured list entry value 1 content (if single value)",hasEndMarker:!0,children:void 0},liv1:{category:U.Lists,type:q.Character,description:"Structured list entry value 1 content (if multiple values)",hasEndMarker:!0,children:void 0},liv2:{category:U.Lists,type:q.Character,description:"Structured list entry value 2 content",hasEndMarker:!0,children:void 0},liv3:{category:U.Lists,type:q.Character,description:"Structured list entry value 3 content",hasEndMarker:!0,children:void 0},liv4:{category:U.Lists,type:q.Character,description:"Structured list entry value 4 content",hasEndMarker:!0,children:void 0},liv5:{category:U.Lists,type:q.Character,description:"Structured list entry value 5 content",hasEndMarker:!0,children:void 0},f:{category:U.Footnotes,type:q.Note,description:"A Footnote text item (basic)",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fe:{category:U.Footnotes,type:q.Note,description:"An Endnote text item",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fr:{category:U.Footnotes,type:q.Character,description:"The origin reference for the footnote (basic)",hasEndMarker:!0,children:void 0},ft:{category:U.Footnotes,type:q.Character,description:"Footnote text, Protocanon (basic)",hasEndMarker:!0,children:void 0},fk:{category:U.Footnotes,type:q.Character,description:"A footnote keyword (basic)",hasEndMarker:!0,children:void 0},fq:{category:U.Footnotes,type:q.Character,description:"A footnote scripture quote or alternate rendering (basic)",hasEndMarker:!0,children:void 0},fqa:{category:U.Footnotes,type:q.Character,description:"A footnote alternate rendering for a portion of scripture text",hasEndMarker:!0,children:void 0},fl:{category:U.Footnotes,type:q.Character,description:"A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",hasEndMarker:!0,children:void 0},fw:{category:U.Footnotes,type:q.Character,description:"A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",hasEndMarker:!0,children:void 0},fp:{category:U.Footnotes,type:q.Character,description:"A Footnote additional paragraph marker",hasEndMarker:!0,children:void 0},fv:{category:U.Footnotes,type:q.Character,description:"A verse number within the footnote text",hasEndMarker:!0,children:void 0},fdc:{category:U.Footnotes,type:q.Character,description:"Footnote text, applies to Deuterocanon only",hasEndMarker:!0,children:void 0},fm:{category:U.Footnotes,type:q.Character,description:"An additional footnote marker location for a previous footnote",hasEndMarker:!0,children:void 0},x:{category:U.CrossReferences,type:q.Note,description:"A list of cross references (basic)",hasEndMarker:!0,children:{CrossReferences:["xo","xop","xt","xta","xk","xq","xot","xnt","xdc"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},xo:{category:U.CrossReferences,type:q.Character,description:"The cross reference origin reference (basic)",hasEndMarker:!0,children:void 0},xop:{category:U.CrossReferences,type:q.Character,description:"Published cross reference origin reference (origin reference that should appear in the published text)",hasEndMarker:!0,children:void 0},xt:{category:U.CrossReferences,type:q.Character,description:"The cross reference target reference(s), protocanon only (basic)",hasEndMarker:!0,children:void 0},xta:{category:U.CrossReferences,type:q.Character,description:"Cross reference target references added text",hasEndMarker:!0,children:void 0},xk:{category:U.CrossReferences,type:q.Character,description:"A cross reference keyword",hasEndMarker:!0,children:void 0},xq:{category:U.CrossReferences,type:q.Character,description:"A cross-reference quotation from the scripture text",hasEndMarker:!0,children:void 0},xot:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), Old Testament only",hasEndMarker:!0,children:void 0},xnt:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), New Testament only",hasEndMarker:!0,children:void 0},xdc:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), Deuterocanon only",hasEndMarker:!0,children:void 0},rq:{category:U.CrossReferences,type:q.Character,description:"A cross-reference indicating the source text for the preceding quotation.",hasEndMarker:!0,children:void 0},qt:{category:U.SpecialText,type:q.Character,description:"For Old Testament quoted text appearing in the New Testament (basic)",hasEndMarker:!0,children:void 0},nd:{category:U.SpecialText,type:q.Character,description:"For name of deity (basic)",hasEndMarker:!0,children:void 0},tl:{category:U.SpecialText,type:q.Character,description:"For transliterated words",hasEndMarker:!0,children:void 0},dc:{category:U.SpecialText,type:q.Character,description:"Deuterocanonical/LXX additions or insertions in the Protocanonical text",hasEndMarker:!0,children:void 0},bk:{category:U.SpecialText,type:q.Character,description:"For the quoted name of a book",hasEndMarker:!0,children:void 0},sig:{category:U.SpecialText,type:q.Character,description:"For the signature of the author of an Epistle",hasEndMarker:!0,children:void 0},pn:{category:U.SpecialText,type:q.Character,description:"For a proper name",hasEndMarker:!0,children:void 0},png:{category:U.SpecialText,type:q.Character,description:"For a geographic proper name",hasEndMarker:!0,children:void 0},addpn:{category:U.SpecialText,type:q.Character,description:"For chinese words to be dot underline & underline",hasEndMarker:!0,children:void 0},wj:{category:U.SpecialText,type:q.Character,description:"For marking the words of Jesus",hasEndMarker:!0,children:void 0},k:{category:U.SpecialText,type:q.Character,description:"For a keyword",hasEndMarker:!0,children:void 0},sls:{category:U.SpecialText,type:q.Character,description:"To represent where the original text is in a secondary language or from an alternate text source",hasEndMarker:!0,children:void 0},ord:{category:U.SpecialText,type:q.Character,description:"For the text portion of an ordinal number",hasEndMarker:!0,children:void 0},add:{category:U.SpecialText,type:q.Character,description:"For a translational addition to the text",hasEndMarker:!0,children:void 0},lit:{category:U.SpecialText,type:q.Paragraph,description:"For a comment or note inserted for liturgical use",hasEndMarker:!1,children:void 0},no:{category:U.CharacterStyling,type:q.Character,description:"A character style, use normal text",hasEndMarker:!0,children:void 0},it:{category:U.CharacterStyling,type:q.Character,description:"A character style, use italic text",hasEndMarker:!0,children:void 0},bd:{category:U.CharacterStyling,type:q.Character,description:"A character style, use bold text",hasEndMarker:!0,children:void 0},bdit:{category:U.CharacterStyling,type:q.Character,description:"A character style, use bold + italic text",hasEndMarker:!0,children:void 0},em:{category:U.CharacterStyling,type:q.Character,description:"A character style, use emphasized text style",hasEndMarker:!0,children:void 0},sc:{category:U.CharacterStyling,type:q.Character,description:"A character style, for small capitalization text",hasEndMarker:!0,children:void 0},sup:{category:U.CharacterStyling,type:q.Character,description:"A character style, for superscript text. Typically for use in critical edition footnotes.",hasEndMarker:!0,children:void 0},pb:{category:U.Breaks,type:q.Paragraph,description:"Page Break used for new reader portions and children's bibles where content is controlled by the page",hasEndMarker:!1,children:void 0}},Vr={DivisionMarks:{add:["v","c"],remove:[]},Paragraphs:{add:["p"],remove:[]},Poetry:{add:["q","q1","q2","q3","q4","b"],remove:[]},TitlesHeadings:{add:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],remove:[]}},A1={p:{children:Vr},q:{children:Vr},q1:{children:Vr},q2:{children:Vr},q3:{children:Vr},q4:{children:Vr},b:{children:Vr},qm:{children:{Paragraphs:{add:["p"],remove:[]}}},c:{type:q.Paragraph,children:null},v:{children:null}};function Mp(t){const e=S1[t],n=A1[t];if(!e)return;if(!n)return e;let r=e.children?{...e.children}:void 0;if(n.children===null&&(r=void 0),n.children){r=r||{};for(const[o,s]of Object.entries(n.children)){const i=o;if(s===null)Reflect.deleteProperty(r,i);else{let a=r[i]||[];s.remove&&(a=a.filter(c=>!s.remove.includes(c))),s.add&&(a=[...new Set([...a,...s.add])]),a.length>0?r[i]=a:Reflect.deleteProperty(r,i)}}Object.keys(r).length===0&&(r=void 0)}return{...e,...n,children:r}}function Rp(t,e,n){const r={type:js,version:Is,content:t},o=e.serializeEditorState(r,n);return fu(o.root.children[0])?o.root.children[0].children[0]:o.root.children[0]}function hc(t,e){if(!t||!g.$isTextNode(t))return[void 0,void 0];const n=t.getTextContent();if(e>=0&&e<n.length)return[t,e];let r=t.getNextSibling();if(!r){const s=t.getParent();St(s)&&(r=s.getNextSibling())}if(!r||!St(r)&&!g.$isTextNode(r))return[void 0,void 0];const o=e-n.length;return r&&g.$isTextNode(r)?hc(r,o):hc(r.getFirstChild()??void 0,o)}function Op(t){const e=yv(t.jsonPath);let n=g.$getRoot();for(const r of e){if(!n||!g.$isElementNode(n))return[void 0,void 0];n=n.getChildAtIndex(r)??void 0}return hc(n,t.offset)}function jp(t){return g.$isElementNode(t)?"element":"text"}function Cu(t){const{start:e}=t;let{end:n}=t;n===void 0&&(n=e);const[r,o]=Op(e),[s,i]=Op(n);if(!r||!s||o===void 0||i===void 0)return;const a=g.$createRangeSelection();return a.anchor=g.$createPoint(r.getKey(),o,jp(r)),a.focus=g.$createPoint(s.getKey(),i,jp(s)),a}function Ip(t,e){const n=[];let r=t;for(;r!=null&&r.getParent();){const o=r.getParent();if(o){const s=o==null?void 0:o.getChildren().indexOf(r);s>=0&&n.unshift(s)}r=o}return{jsonPath:_v(n),offset:e}}function Nm(){const t=g.$getSelection();if(!t||!g.$isRangeSelection(t))return;const e=t.isBackward()?t.focus.getNode():t.anchor.getNode(),n=t.isBackward()?t.focus.offset:t.anchor.offset,r=Ip(e,n);if(t.isCollapsed())return{start:r};const o=t.isBackward()?t.anchor.getNode():t.focus.getNode(),s=t.isBackward()?t.anchor.offset:t.focus.offset,i=Ip(o,s);return{start:r,end:i}}const Tm="v",Sm=1;class qt extends g.DecoratorNode{constructor(e="",n=!1,r,o,s,i,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=Tm,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=s,this.__unknownAttributes=i}static getType(){return"immutable-verse"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:s,__pubnumber:i,__unknownAttributes:a,__key:c}=e;return new qt(n,r,o,s,i,a,c)}static importDOM(){return{span:e=>M1(e)?{conversion:D1,priority:1}:null}}static importJSON(e){return Eu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(cc,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(cc,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return l.jsx("span",{children:this.getShowMarker()?ui(this.getMarker(),this.getNumber()):lc+this.getNumber()+lc})}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:Sm}}isKeyboardSelectable(){return!1}}function D1(t){const e=t.getAttribute("data-number")??"0";return{node:Eu(e)}}function Eu(t,e,n,r,o,s){return g.$applyNodeReplacement(new qt(t,e,n,r,o,s))}function M1(t){return((t==null?void 0:t.getAttribute("data-marker"))??void 0)===Tm}function us(t){return t instanceof qt}function R1(t){return(t==null?void 0:t.type)===qt.getType()}function wn(t){return mu(t)||us(t)}function O1(t){return t1(t)||R1(t)}function j1(t,e,n,r,o,s,i){if(!xt.isValidMarker(t))throw new Error(`$insertNote: Invalid note marker '${t}'`);const a=n?Cu(n):g.$getSelection();if(!g.$isRangeSelection(a))return;const c=I1(a,t,r,i);if(c===void 0)return;const u=Dm(t,e,c,o,s);return Am(u,a,o),u}function Am(t,e,n){const r=(n==null?void 0:n.noteMode)==="collapsed";if(t.setIsCollapsed(r),e.isCollapsed()||u1(e),e.insertNodes([t]),!r){const o=t.getChildren().reverse().find(Ue);o==null||o.selectEnd()}}function I1(t,e,n,r){const o=[],{chapterNum:s,verseNum:i}=n??{};switch(e){case"f":case"fe":case"ef":case"efe":if(s!==void 0&&i!==void 0&&o.push(Hn("fr").append(g.$createTextNode(`${s}:${i}`))),!t.isCollapsed()){const a=t.getTextContent().trim();if(a.length>0){const c=Hn("fq");c.append(g.$createTextNode(a)),o.push(c)}}o.push(Hn("ft").append(g.$createTextNode("-")));break;case"x":case"ex":s!==void 0&&i!==void 0&&o.push(Hn("xo").append(g.$createTextNode(`${s}:${i}`))),o.push(Hn("xt").append(g.$createTextNode("-")));break;default:r==null||r.warn(`$createNoteChildren: Unsupported note marker '${e}'`);return}return o}function Dm(t,e,n,r,o,s){const i=(r==null?void 0:r.noteMode)!=="expanded",a=wu(t,e,i);s&&g.$setState(a,io,()=>s);let c,u;(r==null?void 0:r.markerMode)==="editable"?(c=Wo(t),u=Wo(t,"closing")):(r==null?void 0:r.markerMode)==="visible"&&(c=Jo("marker",fr(t)+qe),u=Jo("marker",Yo(t)+qe));let d;if(c&&a.append(c),(r==null?void 0:r.markerMode)==="editable")e===""?a.append(...n):(d=g.$createTextNode(vu(a.__caller)),a.append(d,...n));else{const p=()=>g.$createTextNode(qe),f=n.flatMap(P1(p));if(e==="")a.append(...f);else{const h=xu(n);let b=()=>{};o!=null&&o.noteCallerOnClick&&(b=o.noteCallerOnClick),d=Su(a.__caller,h,b),a.append(d,p(),...f)}}return u&&a.append(u),a}function Lp(t){var e;if(typeof t=="string"){const o=g.$getNodeByKey(t);return Se(o)?o:void 0}const n=Xs();if(n.length<=0)return;const r=(e=n.filter(o=>Se(o.node))[t])==null?void 0:e.node;if(Se(r))return r}function L1(t,e){const n=(e==null?void 0:e.noteMode)==="collapsed";if(t.setIsCollapsed(n),n){const r=t.getPreviousSibling();if(us(r)||!r){const o=t.getParent();if(o){const s=t.getIndexWithinParent();o.select(s,s)}}else r.selectEnd()}else{const r=t.getChildren().reverse().find(Ue);r==null||r.selectEnd()}}function P1(t){return e=>la(e)?[e]:[e,t()]}function $1(t){return t.find(e=>jt(e))}function F1(t,e){return g.$isElementNode(t)?t.getChildren().find(n=>wn(n)&&yu(e,n.getNumber())):void 0}function B1(t,e){return e===0?$1(t):t.map(n=>F1(n,e)).filter(n=>n)[0]}function Pp(t){return!t||!g.$isElementNode(t)?void 0:t.getChildren().findLast(e=>wn(e))}function Mm(t){var e,n;if(!t||hn(t))return;if(wn(t))return t;let r=St(t.getParent())?(e=t.getParent())==null?void 0:e.getPreviousSibling():t.getPreviousSibling();for(;r&&!wn(r)&&!hn(r);)r=r.getPreviousSibling();if(r&&wn(r))return r;let o=(n=t.getTopLevelElement())==null?void 0:n.getPreviousSibling(),s=Pp(o),i=s;for(;o&&!s&&!hn(o);)s=i,o=o.getPreviousSibling(),i=Pp(o);if(!(!s&&hn(o)))return s}function q1(t){return s1(t)||us(t)}function ku(t){if(g.$isTextNode(t)){const e=t.getTextContent();!e.endsWith(" ")&&!e.endsWith(qe)&&t.setTextContent(`${e} `)}}function Rm(t){if(g.$isTextNode(t)){const e=t.getTextContent();e.startsWith(" ")&&t.setTextContent(e.trimStart())}}function Nu(t,e){return t.getEditorState().read(()=>!g.$getNodeByKey(e))}const U1=["style"],V1=["style","code"],ua=["style","cid"],H1=["style","number","sid","altnumber","pubnumber"],z1=["style","number","sid","altnumber","pubnumber"],G1=["style","sid","eid"],K1=["style","caller","category","contents"],Y1=["chapter","immutable-chapter","verse","immutable-verse","ms","note","unmatched"],Gs=`
`;function W1(t,e){const n=g.$getNodeByKey(t);if(!Mn(n))return;const r=Om(n);return r===void 0?void 0:[{retain:r},...e,{delete:1}]}function Om(t){if(!t)return;const e=Xs();let n=0;const r=[];let o,s;const i=t.getKey();let a;for(const c of e){const u=c.node;for(let d=r.length-1;d>=0;d--)if(Ks(r[d],c)){const p=r[d];if(r.splice(d,1),n+=1,a&&p.getKey()===a.getKey())return n-1}if(o&&Ks(o,c)&&(o=void 0,s=void 0),o){if(u.getKey()===i)return s;continue}if(u.getKey()===i){if(g.$isTextNode(u)||Mn(u))return n;gn(u)&&(a=u)}if(gn(u)&&(r.includes(u)||r.push(u)),Se(u)){o=u,s=n,n+=1;continue}n+=jm(u)}if(a)return n}function $p(t,e){if(t.length<2||!Q1(t[0])||!X1(t[1]))return;const n=t[0].retain;return e.read(()=>{const r=J1(n);return r==null?void 0:r.getKey()})}function J1(t){const e=Xs();let n=0;const r=[];let o,s;for(const i of e){const a=i.node;for(let u=r.length-1;u>=0;u--)if(Ks(r[u],i)){const d=r[u];if(r.splice(u,1),n===t)return d;n+=1}if(o&&Ks(o,i)&&(o=void 0,s=void 0),o){if(s===t)return o;continue}if(gn(a)&&(r.includes(a)||r.push(a)),Se(a)){if(o=a,s=n,n===t)return a;n+=1;continue}const c=jm(a);if(g.$isTextNode(a)&&c>0&&t>=n&&t<n+c||Mn(a)&&n===t)return a;n+=c}for(const i of r){if(n===t)return i;n+=1}}function Ks(t,e){return t?e?!l1(e.node,t.getKey()):!0:!1}function Mn(t){return hn(t)||wn(t)||Fa(t)||Se(t)||km(t)}function gn(t){return kn(t)||Jn(t)}function ys(t,e){return e.insert!=null&&typeof e.insert=="object"&&t in e.insert}function X1(t){if(t.insert==null||typeof t.insert!="object")return!1;const e=Object.keys(t.insert)[0];return t.insert!=null&&typeof t.insert=="object"&&e in t.insert&&Y1.includes(e)}function Q1(t){return t.retain!=null&&typeof t.retain=="number"}function jm(t){return g.$isTextNode(t)?t.getTextContentSize():Mn(t)?1:0}function wc(t,e){const n={insert:t.__text},r=g.$getState(t,io);if(r&&(n.attributes={segment:r}),e&&e.length>0){let o=e.map(s=>{const i={style:s.__marker},a=g.$getState(s,so);a&&(i.cid=a);const c=s.getUnknownAttributes();return c&&Object.keys(c).length>0&&Object.assign(i,c),i});o.length===1&&(o=o[0]),n.attributes={...n.attributes,char:o}}return n}function Fp(t){const e=new Ts;return t.isEmpty()||t.read(()=>{const n=g.$getRoot();if(!n||n.isEmpty())return;const r=n.getChildren();if(r.length===1&&cr(r[0])&&(!r[0].getChildren()||r[0].getChildrenSize()===0))return;const o=Z1();for(const s of o)e.push(s)}),e}function Tu(t,e){const n=[],r=Xs(t),o=[],s=[],i={children:[],contentsOps:[]};for(let a=0;a<r.length;a++){const c=r[a].node;n.push(...Bp(c,a,r,o,s,i))}for(const a of o)n.push(...Bp(a,r.length,r,o,s,i));return n}function Z1(){return Tu()}function Bp(t,e,n,r,o,s){if(!t)return[];const i=[];return eC(t,i,r),tC(t,i,o,s),nC(t,e,n,o),hn(t)&&i.push(sC(t)),wn(t)&&i.push(aC(t)),Fa(t)&&i.push(lC(t)),km(t)&&i.push(cC(t)),rC(t,i,s),i}function eC(t,e,n){if(!t.isInline()){const r=n.pop();Jn(r)?e.push(oC(r)):jt(r)?e.push(iC(r)):cr(r)&&e.push({insert:Gs})}gn(t)&&(n.includes(t)||n.push(t))}function tC(t,e,n,r){var o;if(!g.$isTextNode(t))return;const s=t.getParent();if(Se(s)&&s.getFirstChild()===t)return;const i=wc(t,n);if(r.children.includes(t)){const a=t.getTextContent();if(!a||a===qe||a.startsWith(lu))return;(o=r.contentsOps)==null||o.push(i)}else e.push(i)}function nC(t,e,n,r){Ue(t)&&!r.includes(t)&&r.push(t);const o=n[e+1];for(const s of r.toReversed())Ks(s,o)&&r.pop()}function rC(t,e,n){var r,o;if(!Se(t))return;Xs(t).forEach(i=>n.children.push(i.node));const s=uC(t);n.contentsOps=(o=(r=s.insert.note)==null?void 0:r.contents)==null?void 0:o.ops,e.push(s)}function oC(t){const e={style:Vs,code:t.__code};return{insert:Gs,attributes:{book:e}}}function sC(t){const e={style:ia,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{chapter:e}}}function iC(t){const e={style:t.__marker};return{insert:Gs,attributes:{para:e}}}function aC(t){const e={style:aa,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{verse:e}}}function lC(t){const e={style:t.__marker};return t.__sid&&(e.sid=t.__sid),t.__eid&&(e.eid=t.__eid),{insert:{milestone:e}}}function cC(t){return{insert:{unmatched:{marker:t.__marker}}}}function uC(t){const e={style:t.__marker,caller:t.__caller};t.__category&&(e.category=t.__category),t.getChildrenSize()>1&&(e.contents={ops:[]});const n={insert:{note:e}},r=g.$getState(t,io);return r&&(n.attributes={segment:r}),n}const Im=1;class Tn extends g.DecoratorNode{constructor(e=ao,n="",r,o){super(o),de(this,"__caller"),de(this,"__previewText"),de(this,"__onClick"),this.__caller=e,this.__previewText=n,this.__onClick=r??(()=>{})}static getType(){return"immutable-note-caller"}static clone(e){const{__caller:n,__previewText:r,__onClick:o,__key:s}=e;return new Tn(n,r,o,s)}static importDOM(){return{span:e=>pC(e)?{conversion:dC,priority:1}:null}}static importJSON(e){return Su().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setCaller(e.caller).setPreviewText(e.previewText).setOnClick(e.onClick)}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setPreviewText(e){if(this.__previewText===e)return this;const n=this.getWritable();return n.__previewText=e,n}getPreviewText(){return this.getLatest().__previewText}setOnClick(e){if(this.__onClick===e)return this;const n=this.getWritable();return n.__onClick=e,n}getOnClick(){return this.getLatest().__onClick}createDOM(){const e=document.createElement("span");return e.classList.add(this.__type),e.setAttribute("data-caller",this.__caller),e.setAttribute("data-preview-text",this.__previewText),e}updateDOM(e){return e.__caller!==this.__caller}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.classList.add(this.getType()),n.setAttribute("data-caller",this.getCaller()),n.setAttribute("data-preview-text",this.getPreviewText())),{element:n}}decorate(e){const n=this.getParent();if(!n)return null;const r=n.getKey(),o=n.getIsCollapsed(),s=this.__key,i=c=>{var u;return(u=this.__onClick)==null?void 0:u.call(this,c,r,o,()=>fC(e,r),d=>hC(e,r,s,d),()=>wC(e,r))},a=`${this.__caller}_${this.__previewText}}`.replace(/\s+/g,"").substring(0,25);return l.jsx("button",{onClick:i,title:this.__previewText,"data-caller-id":a,children:this.__caller===ao&&o?"":this.__caller})}exportJSON(){return{type:this.getType(),caller:this.getCaller(),previewText:this.getPreviewText(),onClick:this.getOnClick(),version:Im}}isKeyboardSelectable(){return!1}}function dC(t){const e=t.getAttribute("data-caller")??"",n=t.getAttribute("data-preview-text")??"";return{node:Su(e,n)}}function Su(t,e,n){return g.$applyNodeReplacement(new Tn(t,e,n))}function pC(t){return t?t.classList.contains(Tn.getType()):!1}function Pr(t){return t instanceof Tn}function fC(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteCaller: Note node not found: ${e}`);return n.getCaller()})}function hC(t,e,n,r){t.update(()=>{const o=g.$getNodeByKey(e);if(!Se(o))throw new Error(`setNoteCaller: Note node not found: ${e}`);o.setCaller(r);const s=g.$getNodeByKey(n);if(!Pr(s))throw new Error(`setNoteCaller: Caller node not found: ${n}`);s.setCaller(r)})}function wC(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Se(n))throw new Error(`getNoteOps: Note node not found: ${e}`);return Tu(n)})}const mC=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],gC=[Tn,qt,...T1],bC=w.forwardRef((t,e)=>{const{coords:n,children:r,style:o,...s}=t,i=n!==void 0;return l.jsx("div",{ref:e,className:"floating-box","aria-hidden":!i,style:{...o,position:"absolute",zIndex:1e3,top:n==null?void 0:n.y,left:n==null?void 0:n.x,visibility:i?"visible":"hidden",opacity:i?1:0},...s,children:r})});function vC(){const[t,e]=w.useState(void 0),[n,r]=w.useState(),o=w.useRef(null),s=w.useCallback((a,c)=>{o.current&&o.current();const u=a.commonAncestorContainer.nodeType===a.commonAncestorContainer.TEXT_NODE?a:a.commonAncestorContainer;o.current=vy(u,c,()=>{_y(u,c,{placement:"bottom-start",middleware:[xy(),yy()]}).then(d=>{r(d.placement),e(p=>(p==null?void 0:p.x)===d.x&&(p==null?void 0:p.y)===d.y?p:{x:d.x,y:d.y})}).catch(()=>{e(void 0)})})},[]),i=w.useCallback(()=>{o.current&&(e(void 0),o.current(),o.current=null)},[]);return w.useEffect(()=>i,[i]),{coords:t,placement:n,updatePosition:s,cleanup:i}}function xC({isOpen:t,floatingBoxRef:e}){const{coords:n,updatePosition:r,cleanup:o,placement:s}=vC();return w.useEffect(()=>{var i;if(!t||!e.current){o();return}const a=(i=window.getSelection())==null?void 0:i.getRangeAt(0);if(!a){o();return}return r(a,e.current),o},[o,t,e,r]),{coords:n,placement:s}}const yC=document.body,_C=w.memo(bC);function CC({isOpen:t=!1,children:e}){const n=w.useRef(null),{coords:r,placement:o}=xC({isOpen:t,floatingBoxRef:n}),s=w.useMemo(()=>r?typeof e=="function"?e:()=>e:()=>null,[e,r]);return fn.createPortal(l.jsx(_C,{ref:n,coords:r,style:r?void 0:{display:"none"},children:s({isOpen:t,placement:o})}),yC)}const Lm=w.createContext(void 0);function Au(){const t=w.useContext(Lm);if(!t)throw new Error("useMenuContext must be used within a MenuProvider");return t}function EC(t,e){const[n,r]=w.useState(0),[o,s]=w.useState(-1),i=w.useMemo(()=>t??[],[t]),a={menuItems:i,activeIndex:n,selectedIndex:o,onSelectOption:e??(()=>{})},c=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p-1+f)%f:0})},[i.length]),u=w.useCallback(()=>{r(p=>{const f=i.length;return f?(p+1)%f:0})},[i.length]),d=w.useCallback(()=>{const p=i.length;if(n>=0&&n<p){const f=i[n];e==null||e(f),s(n)}},[n,i,e]);return{state:a,moveUp:c,moveDown:u,select:d,setActiveIndex:r,setSelectedIndex:s}}function kC({children:t,menuItems:e,onSelectOption:n,...r}){const o=EC(e,n);return l.jsx(Lm.Provider,{value:o,children:l.jsx("div",{...r,children:t})})}const Pm=w.forwardRef(({index:t,children:e,onMouseEnter:n,onClick:r,...o},s)=>{const{state:{activeIndex:i},setActiveIndex:a,setSelectedIndex:c,select:u}=Au(),d=w.useCallback(f=>{u(),c(-1),r==null||r(f)},[r,u,c]),p=w.useCallback(f=>{a(t),n==null||n(f)},[t,a,n]);return l.jsx("button",{ref:s,role:"menuitem",...o,onClick:d,onMouseEnter:p,"aria-selected":t!==void 0&&i===t?"true":void 0,tabIndex:-1,children:e})});function NC({children:t,autoIndex:e=!0,...n}){const r=w.useRef(null),{state:{activeIndex:o,menuItems:s}}=Au(),i=w.useMemo(()=>s?typeof t=="function"?t:()=>t:()=>null,[t,s]),a=w.useMemo(()=>{const c=i(s);return e?w.Children.map(c,(u,d)=>w.isValidElement(u)&&u.type===Pm&&u.props.index===void 0?w.cloneElement(u,{index:d}):u):c},[i,e,s]);return w.useEffect(()=>{if(r.current){const c=r.current,u=c.children[o];if(u){const d=c.getBoundingClientRect(),p=u.getBoundingClientRect();p.bottom>d.bottom?c.scrollTop+=p.bottom-d.bottom:p.top<d.top&&(c.scrollTop-=d.top-p.top)}}},[o]),l.jsx("div",{ref:r,role:"menu",...n,children:a})}const Tl={Root:kC,Options:NC,Option:Pm},TC=(t,e,n)=>Hi(t,n).toLowerCase().includes(e.toLowerCase()),qp=t=>Object.keys(t).find(e=>typeof t[e]=="string")||"",Hi=(t,e)=>{const n=t[e];return typeof n=="string"?n:String(n)};function SC(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t,{caseSensitive:a=!1,priorityOrder:c=["exact","startsWith","contains"]}=i||{},u=a?e:e.toLowerCase();let d,p;o?(p=o,d=n.length>0?qp(n[0]):""):(d=r||(n.length>0?qp(n[0]):""),p=(b,x)=>TC(b,x,d));const f=s||d,h=new Map;return n.filter(b=>{try{return p(b,e)}catch(x){return console.warn("Error filtering item:",b,x),!1}}).sort((b,x)=>{const C=A=>(h.has(A)||h.set(A,Hi(A,f).toLowerCase()),h.get(A)??""),E=a?Hi(b,f):C(b),_=a?Hi(x,f):C(x);for(const A of c)switch(A){case"exact":if(E===u&&_!==u)return-1;if(_===u&&E!==u)return 1;break;case"startsWith":if(E.startsWith(u)&&!_.startsWith(u))return-1;if(_.startsWith(u)&&!E.startsWith(u))return 1;break;case"contains":{const j=E.indexOf(u),G=_.indexOf(u);if(j!==-1&&G===-1)return-1;if(G!==-1&&j===-1)return 1;if(j!==-1&&G!==-1)return j-G;break}}return E.localeCompare(_)})}function AC(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}=t;return w.useMemo(()=>SC({query:e,items:n,filterBy:r,filter:o,sortBy:s,sortingOptions:i}),[e,n,r,o,s,i])}function DC(){const{moveUp:t,moveDown:e,select:n}=Au();return w.useMemo(()=>({moveUp:t,moveDown:e,select:n}),[t,e,n])}const MC=()=>{const t=DC(),[e]=ye();w.useEffect(()=>{const n=r=>{const o={ArrowDown:()=>t==null?void 0:t.moveDown(),ArrowUp:()=>t==null?void 0:t.moveUp(),Enter:()=>t==null?void 0:t.select(),Tab:()=>t==null?void 0:t.select()}[r.key];return o?(o(),r.preventDefault(),r.stopPropagation(),!0):!1};return e.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[e,t])};function RC(){return MC(),null}function OC(t){const{options:e,onSelectOption:n,onClose:r,inverse:o,query:s,menuOpenKey:i}=t,[a]=ye(),c=s!==void 0,[u,d]=w.useState(""),p=c?s??"":u,f=AC({query:p,items:e,filterBy:"name"}),h=b=>{r==null||r(),n?n(b):b.action(a)};return w.useEffect(()=>a.registerCommand(g.KEY_DOWN_COMMAND,b=>{if(c)return!1;const x={Escape:()=>r==null?void 0:r(),Backspace:()=>{p.length===0?r==null||r():d(C=>C.slice(0,-1))}}[b.key];return x?(b.stopPropagation(),b.preventDefault(),x(),!0):b.key.length===1?(b.stopPropagation(),b.preventDefault(),b.key!==i&&d(C=>C+b.key),!0):!1},g.COMMAND_PRIORITY_HIGH),[a,c,p,i,r]),l.jsxs(Tl.Root,{className:`autocomplete-menu-container ${o?"inverse":""}`,menuItems:f,onSelectOption:b=>h(b),children:[!c&&l.jsx("input",{value:p,type:"text",disabled:!0}),l.jsx(RC,{}),l.jsx(Tl.Options,{className:"autocomplete-menu-options",autoIndex:!1,children:b=>b.map((x,C)=>l.jsxs(Tl.Option,{index:C,children:[l.jsx("span",{className:"label",children:x.label??x.name}),l.jsx("span",{className:"description",children:x.description})]},x.name))})]})}function jC({trigger:t,items:e}){const[n]=ye(),[r,o]=w.useState(!1),s=w.useCallback(i=>{i.key==="Escape"&&r?(o(!1),n.focus()):i.key===t&&!r&&(i.preventDefault(),o(!0))},[n,t,r]);return w.useEffect(()=>n.registerRootListener(i=>{if(i)return i.addEventListener("keydown",s),()=>{i.removeEventListener("keydown",s)}}),[n,s]),w.useEffect(()=>n.registerUpdateListener(({prevEditorState:i,editorState:a})=>{const c=i.read(()=>{const u=g.$getSelection();if(g.$isRangeSelection(u))return u});a.read(()=>{const u=g.$getSelection();!g.$isRangeSelection(u)||c!=null&&c.is(u)||o(!1)})}),[n]),e&&l.jsx(CC,{isOpen:r,children:({placement:i})=>l.jsx(OC,{options:e,onClose:()=>o(!1),inverse:i==="top-start",menuOpenKey:t})})}function IC({scriptureReference:t,contextMarker:e,getMarkerAction:n}){return{markersMenuItems:w.useMemo(()=>{if(!e||!t)return;const r=Mp(e);if(r!=null&&r.children)return Object.values(r.children).flatMap(o=>o.map(s=>{const i=Mp(s),{action:a}=n(s,i);return{name:s,label:s,description:(i==null?void 0:i.description)??"",action:c=>{a({editor:c,reference:t})}}}))},[e,n,t])}}function zi(t,e){return`${t}:${e}`}function LC(t,e){w.useEffect(()=>{if(!t.hasNodes([Nt]))throw new Error("AnnotationPlugin: TypedMarkNode not registered on editor!");const n=new Map;return At(Hf(t,Nt,r=>zs(r.getTypedIDs()),(r,o)=>{for(const[s,i]of Object.entries(r.getTypedIDs()))i.forEach(a=>{o.addID(s,a)})}),t.registerMutationListener(Nt,r=>{t.getEditorState().read(()=>{for(const[o,s]of r){const i=g.$getNodeByKey(o);let a={};s==="destroyed"?a=n.get(o)??{}:St(i)&&(a=i.getTypedIDs());for(const[c,u]of Object.entries(a))if(!Nt.isReservedType(c))for(const d of u){let p=e.get(zi(c,d));a[c]=u,n.set(o,a),s==="destroyed"?p!==void 0&&(p.delete(o),p.size===0&&e.delete(zi(c,d))):(p===void 0&&(p=new Set,e.set(zi(c,d),p)),p.has(o)||p.add(o))}}})},{skipInitialization:!0}))},[t,e])}const PC=w.forwardRef(function({logger:t},e){const[n]=ye(),r=w.useMemo(()=>new Map,[]);return LC(n,r),w.useImperativeHandle(e,()=>({addAnnotation(o,s,i){if(Nt.isReservedType(s))throw new Error(`addAnnotation: Can't directly add this reserved annotation type '${s}'. Use the appropriate plugin instead.`);n.update(()=>{const a=Cu(o);if(a===void 0){t==null||t.error("Failed to find start or end node of the annotation.");return}_m(a,s,i)},{tag:dc})},removeAnnotation(o,s){if(Nt.isReservedType(o))throw new Error(`removeAnnotation: Can't directly remove this reserved annotation type '${o}'. Use the appropriate plugin instead.`);const i=r.get(zi(o,s));i!==void 0&&setTimeout(()=>{n.update(()=>{for(const a of i){const c=g.$getNodeByKey(a);St(c)&&(c.deleteID(o,s),c.hasNoIDsForEveryType()&&ym(c))}},{tag:dc})})}})),null});function $C({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=ye();return w.useLayoutEffect(()=>{if(n)return r.registerUpdateListener(o=>{const{editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:u}=o;if(e&&i.size===0&&a.size===0||t&&u.has(g.HISTORY_MERGE_TAG)||c.isEmpty())return;const d=FC(r,o);d.length!==0&&n(s,r,u,d)})},[r,t,e,n]),null}function FC(t,{dirtyLeaves:e,prevEditorState:n}){let r=new Ts;return t.getEditorState().read(()=>{const o=e.values().next().value??"";if(e.size===1&&g.$isTextNode(g.$getNodeByKey(o))){const s=g.$getNodeByKey(o),i=Om(s);if(g.$isTextNode(s)&&i!==void 0){const a=n.read(()=>{const d=g.$getNodeByKey(o);return new Ts([g.$isTextNode(d)?wc(d):{insert:""}])}),c=new Ts([wc(s)]),u=new Ts(i>0?[{retain:i}]:[]);r=r.concat(u).concat(a.diff(c))}}else{const s=Fp(n),i=Fp(t.getEditorState());r=s.diff(i)}}),r.ops}function BC(t,e,n,r){let o=0;t.forEach(s=>{if("retain"in s)o+=qC(s,o,e,r);else if("delete"in s){if(typeof s.delete!="number"||s.delete<=0){r==null||r.error(`Invalid delete operation: ${JSON.stringify(s)}`);return}r==null||r.debug(`Delete: ${s.delete}`),VC(o,s.delete,r)}else"insert"in s?typeof s.insert=="string"?(r==null||r.debug(`Insert: '${s.insert}'`),o+=HC(o,s.insert,s.attributes,e,r)):typeof s.insert=="object"&&s.insert!==null?(r==null||r.debug(`Insert embed: ${JSON.stringify(s.insert)}`),GC(o,s,e,n,r)?o+=1:r==null||r.error(`Failed to process insert embed operation: ${JSON.stringify(s.insert)} at index ${o}. Document may be inconsistent.`)):r==null||r.error(`Insert of unknown type: ${JSON.stringify(s.insert)}`):r==null||r.error(`Unknown operation: ${JSON.stringify(s)}`)})}function qC(t,e,n,r){return typeof t.retain!="number"||t.retain<0?(r==null||r.error(`Invalid retain operation: ${JSON.stringify(t)}`),0):(r==null||r.debug(`Retain: ${t.retain}`),t.attributes&&(r==null||r.debug(`Retain attributes: ${JSON.stringify(t.attributes)}`),UC(e,t.retain,t.attributes,n,r)),t.retain)}function UC(t,e,n,r,o){o==null||o.debug(`Applying attributes for range [${t}, ${t+e-1}] with attributes: ${JSON.stringify(n)}`);let s=e,i=0,a=-1;const c=g.$getRoot();function u(d){if(s<=0)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t<i+p&&i<t+e){const f=Math.max(0,t-i),h=p-f,b=Math.min(s,h);if(b>0){let x=d;const C=f>0,E=b<p-f;if(C&&E){const[,_]=d.splitText(f);[x]=_.splitText(b)}else C?[,x]=d.splitText(f):E&&([x]=d.splitText(b));if(uo(n)){const _=x.getParent();if(Ue(_)){const A=n.char;let j;Array.isArray(A)?a>=0&&a<=A.length-1&&(j=A[a]):a===0&&(j=A);const G=j?co(j,_):!1;if(G&&Array.isArray(A)&&A.length>1){const O=g.$createTextNode("");x.replace(O);const V=typeof n.segment=="string"?n.segment:void 0,F=pi(A.slice(1),r,x,V);let $=O;for(const W of F)$.insertAfter(W),$=W;O.remove(),pn(n,x)}else if(G)pn(n,x);else{x.remove();const O=Up(x,n,r,o);if(O&&O.length>0){let V=_;for(const F of O)V.insertAfter(F),V=F}}}else{const A=g.$createTextNode("");x.replace(A);const j=Up(x,n,r,o);if(j&&j.length>0){let G=A;for(const O of j)G.insertAfter(O),G=O;A.remove()}else A.replace(x)}}else pn(n,x);s-=b}}i+=p}else if(Mn(d))t<=i&&i<t+e&&s>0&&(Vp(d,n),s-=1),i+=1;else if(Ue(d)){a+=1;let p=!1;if(t<=i&&i<t+e&&s>0)if(uo(n)){const f=n.char;let h;if(Array.isArray(f)?a>=0&&a<=f.length-1&&(h=f[a]):a===0&&(h=f),h){d.setMarker(h.style),typeof h.cid=="string"&&g.$setState(d,so,()=>h.cid);const b=yt(h,ua);b&&Object.keys(b).length>0?d.setUnknownAttributes({...d.getUnknownAttributes()??{},...b}):d.setUnknownAttributes(void 0)}}else(n.char===!1||n.char===null||eE(n.char))&&(p=!0);if(s>0){const f=d.getChildren();for(const h of f){if(s<=0)break;if(u(h)&&s<=0)return p&&rd(d),!0}}p&&rd(d),a-=1}else if(gn(d)){const p=d.getChildren();for(const h of p){if(s<=0)break;if(u(h)&&s<=0)return!0}const f=1;if(t<=i&&i<t+s&&s>0){if(!cr(d))Vp(d,n);else if(Du(n)){const h=Fm(n.para);h&&d.replace(h,!0)}s-=f}i+=f}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(s<=0)break;if(u(f)&&s<=0)return!0}}return s<=0}u(c),s>0&&(o==null||o.warn(`$applyAttributes: Not all characters in the retain operation (length ${e}) could be processed. Remaining: ${s}. targetIndex: ${t}, final currentIndex: ${i}`))}function Up(t,e,n,r){var o;const s=typeof e.segment=="string"?e.segment:void 0,i=pi(e.char,n,t,s),a=i.find(Ue);if(!a){r==null||r.error(`Failed to create CharNode for text transformation. Style: ${Array.isArray(e.char)?e.char[0].style:(o=e.char)==null?void 0:o.style}. Falling back to standard text attributes.`),pn(e,t);return}const c={};Bm.forEach(p=>{t.hasFormat(p)&&(c[p]="true")});const u={};Object.entries(e).forEach(([p,f])=>{p==="segment"||p==="char"||(typeof f=="string"?u[p]=f:f===!0?u[p]="true":f===!1&&(u[p]="false"))});const d={...a.getUnknownAttributes()??{},...c,...u};return Object.keys(d).length>0&&a.setUnknownAttributes(d),pn(e,t),i}function Vp(t,e){for(const n of Object.keys(e)){const r=e[n];if(n==="char"&&Ue(t)&&uo(e)){const o=r;if(t.setMarker(o.style),typeof o.cid=="string"){const i=o.cid;g.$setState(t,so,()=>i)}const s=yt(o,ua);s&&Object.keys(s).length>0&&t.setUnknownAttributes({...t.getUnknownAttributes()??{},...s});continue}typeof r=="string"&&(hn(t)||wn(t)||Fa(t)||Se(t)||li(t)?t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r}):(Jn(t)||jt(t)||Ue(t))&&(n==="style"&&!Jn(t)?t.setMarker(r):n==="code"&&Jn(t)?t.setCode(r):t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r})),n==="segment"&&g.$setState(t,io,()=>r))}}function VC(t,e,n){if(e<=0)return;const r=g.$getRoot();let o=0,s=e;function i(a){if(s<=0)return!0;if(g.$isTextNode(a)){let c=a.getTextContentSize();if(t<o+c&&o<t+s){const u=Math.max(0,t-o),d=c-u,p=Math.min(s,d);p>0&&(a.spliceText(u,p,""),a.getTextContentSize()===0&&a.remove(),n==null||n.debug(`Deleted ${p} length from TextNode (key: ${a.getKey()}) at nodeOffset ${u}. Original targetIndex: ${t}, current currentIndex: ${o}.`),s-=p,c-=p)}o+=c}else if(Mn(a))t<=o&&o<t+s?(a.remove(),n==null||n.debug(`Deleted embed node (key: ${a.getKey()}) at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`),s-=1):o+=1;else if(gn(a)){const c=a.getChildren().slice(),u=a.getChildren();for(const d of u){if(s<=0)break;if(i(d)&&s<=0)return!0}if(t<=o&&o<t+s&&gn(a)){s-=1;const d=a.getChildren().length;if(c.length>0&&d===0){const p=a.getParent();((p==null?void 0:p.getChildren())??[]).length>1?(a.remove(),n==null||n.debug(`Removed entire ParaNode that had all its content deleted at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)):(a.replace(Nn(),!0),n==null||n.debug(`Replaced last ParaNode with ImpliedParaNode at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`))}else if(s>0){const p=a.getNextSibling();if(p&&kn(p)){let f=o+1;const h=p.getChildren();for(const x of h){if(s<=0)break;const C=o;if(o=f,i(x)){o=C;break}g.$isTextNode(x)?f+=x.getTextContentSize():Mn(x)&&(f+=1),o=C}const b=p.getChildren();for(const x of b)x.remove(),a.append(x);p.remove(),n==null||n.debug(`Merged next paragraph into current one after deleting symbolic close at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${s}.`)}else a.replace(Nn(),!0)}else jt(a)?a.replace(Nn(),!0):a.remove()}o+=1}else if(g.$isElementNode(a)){const c=a.getChildren();for(const u of c){if(s<=0)break;if(i(u)&&s<=0)return!0}}return s<=0}i(r),s>0&&(n==null||n.warn(`Delete operation could not remove all requested characters. Remaining to delete: ${s}. Original targetIndex: ${t}, OT length: ${e}. Final currentIndex: ${o}`))}function HC(t,e,n,r,o){if(e===Gs)return Hp(t,n,o);if(e.endsWith(Gs)&&!Du(n)){const s=e.slice(0,-1);let i=0;if(s.length>0){if(uo(n))throw new Error("Text + LF should not have char attributes");i+=da(t,s,n,o)}return i+=Hp(t+i,n,o),i}else return uo(n)?zC(t,e,n,r,o):da(t,e,n,o)}function zC(t,e,n,r,o){o==null||o.debug(`Attempting to insert CharNode with text "${e}" and attributes ${JSON.stringify(n.char)} at index ${t}`);const s=g.$createTextNode(e);pn(n,s);let i;{let h=function(C){if(g.$isTextNode(C)){const E=C.getTextContentSize();if(t>=x&&t<x+E){const _=C.getParent();return Ue(_)&&(i=_),!0}x+=E}else if(Mn(C))x+=1;else if(Ue(C)){const E=C.getChildren();for(const _ of E)if(h(_))return!0}else if(g.$isElementNode(C)){const E=C.getChildren();for(const _ of E)if(h(_))return!0;gn(C)&&(x+=1)}return!1};const b=g.$getRoot();let x=0;h(b)}let a=n.char;if(Array.isArray(a)){if(i){const h=a[0];h&&co(h,i)?(a=a.slice(1),a.length===1&&(a=a[0])):i=void 0}}else i&&(co(a,i)||(i=void 0));const c=typeof n.segment=="string"?n.segment:void 0,u=pi(a,r,s,c,i?[i]:void 0);if(u.length===0)return e.length;const d=u.find(Ue);if(!d)return o==null||o.error(`CharNode style is missing for text "${e}". Attributes: ${JSON.stringify(n.char)}. Falling back to rich text insertion.`),da(t,e,void 0,o);const p={};for(const[h,b]of Object.entries(n))h!=="char"&&h!=="segment"&&typeof b=="string"&&(p[h]=b);Object.keys(p).length>0&&d.setUnknownAttributes(p);let f=!0;for(const h of u)if(!$m(t,h,o)){f=!1;break}return f?e.length:(o==null||o.error(`Failed to insert CharNode with text "${e}" at index ${t}. Falling back to rich text.`),da(t,e,void 0,o))}function da(t,e,n,r){if(e.length<=0)return r==null||r.debug("Attempted to insert empty string. No action taken."),0;const o=g.$getRoot();let s=0,i=!1;function a(c){if(i)return!0;if(g.$isTextNode(c)){const u=c.getTextContentSize();if(t>=s&&t<=s+u){const d=t-s,p=g.$createTextNode(e);if(pn(n,p),d===0)c.insertBefore(p);else if(d===u){const f=c.getParent();Ue(f)&&!uo(n)?f.insertAfter(p):c.insertAfter(p)}else{const[,f]=c.splitText(d);f.insertBefore(p)}return r==null||r.debug(`Inserted text "${e}" in/around TextNode (key: ${c.getKey()}) at nodeOffset ${d}. Original targetIndex: ${t}, currentIndex at node start: ${s}.`),i=!0,!0}s+=u}else if(Mn(c))s+=1;else if(Ue(c)){if(!i&&t===s){const d=g.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=g.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of CharNode ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}}else if(gn(c)){if(!i&&t===s){const d=g.$createTextNode(e);pn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}if(!i&&t===s){const d=g.$createTextNode(e);return pn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of container ${c.getType()} (key: ${c.getKey()}).`),i=!0,!0}s+=1}else if(g.$isElementNode(c)){const u=c.getChildren();for(const d of u){if(a(d))return!0;if(i)break}}return i}if(a(o),!i&&t===s){r==null||r.debug(`Insertion point matches end of document (targetIndex: ${t}, final currentIndex: ${s}). Appending text to new ParaNode.`);const c=g.$createTextNode(e);pn(n,c);const u=Nn().append(c);o.append(u),i=!0}return i?e.length:(r==null||r.warn(`$insertRichText: Could not find insertion point for text "${e}" at targetIndex ${t}. Final currentIndex: ${s}. Text not inserted.`),0)}function $m(t,e,n){const r=g.$getRoot();let o=0,s=!1;function i(a){if(s)return!0;if(a===r&&t===0&&!r.getFirstChild())return e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into empty root, wrapped in ImpliedParaNode. targetIndex: ${t}`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} directly into empty root. targetIndex: ${t}`),r.append(e)),s=!0,!0;if(!g.$isElementNode(a))return!1;const c=a.getChildren();for(const u of c){if(t===o&&!s){if(a===r&&e.isInline())if(kn(u)){n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into existing ${u.getType()} at beginning. targetIndex: ${t}`);const d=u.getFirstChild();d?d.insertBefore(e):u.append(e)}else n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into root before ${u.getType()}, wrapping in ImpliedParaNode. targetIndex: ${t}`),u.insertBefore(Nn().append(e));else u.insertBefore(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) before child ${u.getType()} (key: ${u.getKey()}) in ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, currentIndex: ${o}`);return s=!0,!0}if(g.$isTextNode(u)){const d=u.getTextContentSize();if(!s&&t>o&&t<o+d){const p=t-o,[f]=u.splitText(p);return f.insertAfter(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) by splitting TextNode (key: ${u.getKey()}) at offset ${p}. targetIndex: ${t}, currentIndex at node start: ${o}`),s=!0,!0}o+=d}else if(Mn(u))o+=1;else if(Ue(u)){if(i(u))return!0}else if(gn(u)){const d=u;if(i(d))return!0;const p=o;if(cr(d)&&gn(e)&&t===p&&!s)return n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode (key: ${d.getKey()}) with block node '${e.getType()}' (key: ${e.getKey()}) at OT index ${t}.`),u.replace(e,!0),o=p+1,s=!0,!0;o+=1}else if(g.$isElementNode(u)&&i(u))return!0;if(s)return!0}return g.$isElementNode(a)&&!s&&(t===o||a===r&&t>o)?a===r?(e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending inline node ${e.getType()} to root. Wrapping in new ImpliedParaNode. targetIndex: ${t}, current document OT length: ${o}.`),r.append(Nn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending block node ${e.getType()} to root. targetIndex: ${t}, current document OT length: ${o}.`),r.append(e)),s=!0,!0):kn(a)?cr(a)&&jt(e)&&t===o?(n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode container (key: ${a.getKey()}) with ParaNode ${e.getType()} (key: ${e.getKey()}) via append logic. targetIndex: ${t}`),a.replace(e,!0),s=!0,!0):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to existing container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.append(e),s=!0,!0):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.insertAfter(e),s=!0,!0):(Ue(a)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting node ${e.getType()} after CharNode (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)):e.isInline()||!kn(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.append(e)):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)),s=!0,!0):s}return i(r),s||n==null||n.warn(`$insertNodeAtCharacterOffset: Could not find insertion point for node ${e.getType()} (key: ${e.getKey()}) at targetIndex ${t}. Final currentIndex: ${o}. Node not inserted.`),s}function GC(t,e,n,r,o){let s;return ys("chapter",e)?s=KC(e.insert.chapter,n):ys("verse",e)?s=YC(e.insert.verse,n):ys("ms",e)?s=WC(e.insert.ms):ys("unmatched",e)?s=JC(e.insert.unmatched):ys("note",e)&&(s=XC(e,n,r,o)),s?$m(t,s,o):(o==null||o.error(`$insertEmbedAtCurrentIndex: Cannot create LexicalNode for embed object: ${JSON.stringify(e.insert)}`),!1)}function Hp(t,e,n){let r;Du(e)?r=Fm(e.para):ZC(e)&&(r=QC(e.book)),r??(r=Nn());const o=r,s=jt(o),i=cr(o);let a=0,c=!1;function u(d){if(c)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t>=a&&t<=a+p){const f=d.getParent();if(jt(f)&&(s||i)){n==null||n.debug(`Splitting ParaNode (marker: ${f.getMarker()}) with LF attributes at targetIndex ${t}`);const h=t-a,[b]=h>0?d.splitText(h):[void 0];let x=b==null?void 0:b.getPreviousSibling();for(;x;){const C=x;x=x.getPreviousSibling();const E=o.getFirstChild();E?E.insertBefore(C):o.append(C)}return b&&o.append(b),f.insertBefore(o),c=!0,!0}}a+=p}else if(Mn(d))a+=1;else if(gn(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}if(t===a){if(cr(d)&&o)return n==null||n.debug(`Replacing ImpliedParaNode (key: ${d.getKey()}) with ParaNode at targetIndex ${t}`),d.replace(o,!0),c=!0,!0;if(jt(d)&&o){const f=d;return n==null||n.debug(`Creating new block node with LF attributes after existing ParaNode (marker: ${f.getMarker()}) at targetIndex ${t}`),f.insertAfter(o),c=!0,!0}}if(a+=1,t===a&&jt(d)&&o)return n==null||n.debug(`Creating new block node after existing ParaNode (marker: ${d.getMarker()}) at targetIndex ${t}`),d.insertAfter(o),c=!0,!0}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}}return c}return u(g.$getRoot()),c||n==null||n.warn(`Could not find location to handle newline with para attributes at targetIndex ${t}. Final currentIndex: ${a}.`),1}function KC(t,e){if(!t)return;const{number:n,sid:r,altnumber:o,pubnumber:s}=t;if(!n)return;const i=yt(t,H1);let a;if(e.markerMode==="editable")a=rm(n,r,o,s,i);else{const c=e.markerMode==="visible";a=pu(n,c,r,o,s,i)}return a}function YC(t,e){if(!t)return;const{style:n,number:r,sid:o,altnumber:s,pubnumber:i}=t;if(!r)return;const a=yt(t,z1);let c;if(e.markerMode==="editable"){if(!n)return;const u=ui(n,r);c=mm(r,u,o,s,i,a)}else{const u=e.markerMode==="visible";c=Eu(r,u,o,s,i,a)}return c}function WC(t){if(!t)return;const{style:e,sid:n,eid:r}=t;if(!e)return;const o=yt(t,G1);return pm(e,n,r,o)}function JC(t){if(!t)return;const{marker:e}=t;if(e)return _u(e)}function XC(t,e,n,r){var o;const s=t.insert;if(!s.note)return;const{style:i,caller:a,category:c,contents:u}=s.note;if(!i||a==null)return;a===""&&(r==null||r.warn("Note has empty caller. Only use for note editing."));const d=yt(s.note,K1),p=(o=t.attributes)==null?void 0:o.segment;let f;p&&typeof p=="string"&&(f=p);const h=[];for(const b of(u==null?void 0:u.ops)??[])if(typeof b.insert=="string")if(uo(b.attributes)){const x=pi(b.attributes.char,e,g.$createTextNode(b.insert),void 0,h);h.push(...x)}else h.push(g.$createTextNode(b.insert));return Dm(i,a,h,e,n,f).setCategory(c).setUnknownAttributes(d)}function QC(t){const{style:e,code:n}=t;if(!e||e!==Vs||!n||!mn.isValidBookCode(n))return;const r=yt(t,V1);return em(n,r)}function Fm(t){const{style:e}=t;if(!e)return;const n=yt(t,U1);return Hs(e,n)}function pi(t,e,n,r,o){if(Array.isArray(t)){if(t.length===0)throw new Error("Empty charAttr array");const s=t[0],i=o==null?void 0:o[o.length-1];if(Ue(i)&&co(s,i))return t.length>1?pi(t.slice(1),e,n).forEach(d=>i.append(d)):n&&i.append(n),[];const a=t.reduceRight((d,p,f)=>{const h=Hn(p.style,yt(p,ua));if(typeof p.cid=="string"&&g.$setState(h,so,()=>p.cid),r&&f===t.length-1&&g.$setState(h,io,()=>r),d)if(Ue(d)){const b=d.getMarker(),x=[];Sl(b,x,e),x.forEach(E=>h.append(E)),h.append(d);const C=[];Al(b,C,e),C.forEach(E=>h.append(E))}else h.append(d);return h},n),c=[],u=t[0];return Sl(u.style,c,e),c.push(a),Al(u.style,c,e),c}else{const s=o==null?void 0:o[o.length-1];if(Ue(s)&&co(t,s))return n&&s.append(n),[];const i=[];Sl(t.style,i,e);const a=Hn(t.style,yt(t,ua));return typeof t.cid=="string"&&g.$setState(a,so,()=>t.cid),r&&g.$setState(a,io,()=>r),n&&a.append(n),i.push(a),Al(t.style,i,e),i}}function Sl(t,e,n){(n==null?void 0:n.markerMode)==="editable"?e.push(Wo(t)):(n==null?void 0:n.markerMode)==="visible"&&e.push(Jo("marker",fr(t)))}function Al(t,e,n,r=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((n==null?void 0:n.markerMode)==="editable"?r?e.push(Wo("","selfClosing")):e.push(Wo(t,"closing")):(n==null?void 0:n.markerMode)==="visible"&&e.push(Jo("marker",Yo(r?"":t))))}function ZC(t){return!!t&&!!t.book&&typeof t.book=="object"&&t.book!==null&&"style"in t.book&&typeof t.book.style=="string"&&"code"in t.book&&typeof t.book.code=="string"}function Du(t){return!!t&&!!t.para&&typeof t.para=="object"&&t.para!==null&&"style"in t.para&&typeof t.para.style=="string"}function uo(t){return!!t&&!!t.char&&typeof t.char=="object"&&t.char!==null&&(!Array.isArray(t.char)&&"style"in t.char&&typeof t.char.style=="string"||Array.isArray(t.char)&&t.char.length>0&&"style"in t.char[0]&&typeof t.char[0].style=="string")}function eE(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&Object.keys(t).length===0}function pn(t,e){if(t)for(const n of Object.keys(t)){if(n==="segment"&&typeof t[n]=="string"){const r=t[n];g.$setState(e,io,()=>r);continue}if(tE(n)){const r=!!t[n],o=n,s=e.hasFormat(o);(r&&!s||!r&&s)&&e.toggleFormat(o)}}}const Bm=["bold","underline","strikethrough","italic","highlight","code","subscript","superscript","lowercase","uppercase","capitalize"];function tE(t){return Bm.includes(t)}function nE({viewOptions:t}){const[e]=ye();return rE(e,t),null}function rE(t,e){w.useEffect(()=>{if(!t.hasNodes([pr,qt,xt]))throw new Error("ArrowNavigationPlugin: ImmutableChapterNode, ImmutableVerseNode or NoteNode not registered on editor!");const n=r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return!1;const o=g.$getSelection();if(!g.$isRangeSelection(o)||!o.isCollapsed())return!1;const s=t.getRootElement();if(!s)return!1;const i=s.dir||"ltr";let a=!1;return oE(i,r.key)?a=iE(o):sE(i,r.key)&&(a=aE(o,e)),a&&r.preventDefault(),a};return t.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[t,e])}function oE(t,e){return t==="ltr"&&e==="ArrowRight"||t==="rtl"&&e==="ArrowLeft"}function sE(t,e){return t==="ltr"&&e==="ArrowLeft"||t==="rtl"&&e==="ArrowRight"}function iE(t){var e,n,r;const o=t.anchor.getNode(),s=i1(t);if(Se(s)&&!di(s.getFirstChild())){if(kn(o)){if(t.anchor.offset===o.getChildrenSize())return!1}else if(t.anchor.offset!==o.getTextContentSize())return!1;if(s.getIsCollapsed()){if(s.is((e=s.getParent())==null?void 0:e.getLastChild()))return(r=(n=s.getParent())==null?void 0:n.getNextSibling())==null||r.selectStart(),!0}else return la(s.getFirstChild())?s.select(2,2):s.select(1,1),!0}if(kn(o)&&Se(s)&&s.getIsCollapsed()){const a=s.getNextSibling();return a?a.selectStart():s.selectEnd(),!0}const i=s==null?void 0:s.getParent();if(la(s)&&Se(i)&&s.is(i==null?void 0:i.getLastChild())){const a=i.getNextSibling();return a?a.selectStart():i.selectEnd(),!0}return!1}function aE(t,e){const n=a1(t);if(ci(n)&&!n.getPreviousSibling())return!0;if(t.anchor.offset!==0)return!1;const r=t.anchor.getNode();if(Jn(r.getParent()))return!0;if(Se(n)&&n.getIsCollapsed()){const s=n.getPreviousSibling();if(!us(s))return!1;const i=n.getParent();if(!i)return!1;const a=n.getIndexWithinParent();return i.select(a,a),!0}if(kn(n)&&(e==null?void 0:e.noteMode)==="collapsed"){const s=n.getLastChild();if(!s)return!1;const i=Rs(s,a=>Se(a));if(Se(i)&&i.getIsCollapsed()){const a=i.getParent();if(!a)return!1;const c=i.getIndexWithinParent();return a.select(c,c),!0}}const o=gm(r);if(!o||o.getIsCollapsed())return!1;if(Pr(n)){const s=o.getParent();if(!s)return!1;const i=o.getIndexWithinParent();return s.select(i,i),!0}return!1}function lE(){const[t]=ye();return cE(t),null}function cE(t){w.useEffect(()=>{if(!t.hasNodes([Qe]))throw new Error("CharNodePlugin: CharNode not registered on editor!");return t.registerNodeTransform(Qe,uE)},[t])}function uE(t){if(!Ue(t))return;if(t.isEmpty()){t.remove();return}const e=t.getMarker(),n=g.$getState(t,so),r=t.getUnknownAttributes(),o=t.getNextSibling();Ue(o)&&co({style:e,cid:n},o)&&or(r,o.getUnknownAttributes())&&(t.append(...o.getChildren()),o.remove());const s=t.getPreviousSibling();Ue(s)&&co({style:e,cid:n},s)&&or(r,s.getUnknownAttributes())&&(s.append(...t.getChildren()),t.remove())}function qm(t){return t.replaceAll("	"," ")}const Mu=t=>{navigator.clipboard.read().then(async e=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const n=new DataTransfer,r=e[0];for(const s of r.types){const i=await(await r.getType(s)).text();n.setData(s,qm(i))}const o=new ClipboardEvent("paste",{clipboardData:n});t.dispatchCommand(g.PASTE_COMMAND,o)})},Ru=t=>{navigator.clipboard.read().then(async()=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const e=new DataTransfer,n=await navigator.clipboard.readText();e.setData("text/plain",qm(n));const r=new ClipboardEvent("paste",{clipboardData:e});t.dispatchCommand(g.PASTE_COMMAND,r)})};function dE(){const[t]=ye();return w.useEffect(()=>{const e=n=>{const{key:r,shiftKey:o,metaKey:s,ctrlKey:i,altKey:a}=n;!(ql?s:i)||a||(!o&&r.toLowerCase()==="c"?(n.preventDefault(),t.dispatchCommand(g.COPY_COMMAND,null)):!o&&r.toLowerCase()==="x"?(n.preventDefault(),t.dispatchCommand(g.CUT_COMMAND,null)):r.toLowerCase()==="v"&&(n.preventDefault(),o?Ru(t):Mu(t)))};return t.registerRootListener((n,r)=>{r!==null&&r.removeEventListener("keydown",e),n!==null&&n.addEventListener("keydown",e)})},[t]),null}function pE({logger:t}){const[e]=ye();return w.useEffect(()=>At(e.registerCommand(g.KEY_DOWN_COMMAND,n=>n.key!=="\\"&&n.key!=="/"?!1:(n.preventDefault(),!0),g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.PASTE_COMMAND,n=>{var r;const o=(r=n.clipboardData)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: paste containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.DROP_COMMAND,n=>{var r;const o=(r=n.dataTransfer)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: drag containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL)),[e,t]),null}function fE({index:t,isSelected:e,onClick:n,onMouseEnter:r,option:o}){let s="item";return e&&(s+=" selected"),o.isDisabled&&(s+=" disabled"),l.jsx("li",{tabIndex:-1,className:s,ref:o.setRefElement,role:"option","aria-selected":e,"aria-disabled":o.isDisabled,id:"typeahead-item-"+t,onMouseEnter:r,onClick:o.isDisabled?void 0:n,children:l.jsx("span",{className:"text",children:o.title})},o.key)}function hE({options:t,selectedItemIndex:e,onOptionClick:n,onOptionMouseEnter:r}){return l.jsx("div",{className:"typeahead-popover",children:l.jsx("ul",{children:t.map((o,s)=>l.jsx(fE,{index:s,isSelected:e===s,onClick:()=>n(o,s),onMouseEnter:()=>r(s),option:o},o.key))})})}class $i extends Ey{constructor(e,n){super(e),de(this,"title"),de(this,"onSelect"),de(this,"isDisabled"),this.title=e,this.onSelect=n.onSelect.bind(this),this.isDisabled=n.isDisabled||!1}}function wE(t,e="editor-input"){return t?t.classList.contains(e):!1}function mE(){const[t]=ye(),[e,n]=w.useState(()=>!t.isEditable()),r=w.useRef(void 0),o=w.useRef(void 0),s=w.useRef(void 0),i=w.useMemo(()=>[new $i("Cut",{onSelect:()=>{t.dispatchCommand(g.CUT_COMMAND,null)},isDisabled:e}),new $i("Copy",{onSelect:()=>{t.dispatchCommand(g.COPY_COMMAND,null)}}),new $i("Paste",{onSelect:()=>{Mu(t)},isDisabled:e}),new $i("Paste as Plain Text",{onSelect:()=>{Ru(t)},isDisabled:e})],[t,e]),a=w.useCallback((c,u,d)=>{t.update(()=>{c==null||c.onSelect(u),d()})},[t]);return w.useEffect(()=>{var c;o.current=((c=t.getRootElement())==null?void 0:c.className)??""},[t]),w.useEffect(()=>{const c=()=>{var u;(u=s.current)==null||u.call(s)};return window.addEventListener("scroll",c,!0),()=>{window.removeEventListener("scroll",c,!0)}},[]),w.useEffect(()=>t.registerEditableListener(c=>{n(!c)}),[t]),l.jsx(Ty,{options:i,onSelectOption:a,onWillOpen:c=>{r.current=c.target},menuRenderFn:(c,{selectedIndex:u,options:d,selectOptionAndCleanUp:p,setHighlightedIndex:f},{setMenuRef:h})=>(s.current=()=>p(void 0),c.current&&!wE(r.current,o.current)&&!cm(r.current)?Mb.createPortal(l.jsx("div",{className:"typeahead-popover auto-embed-menu",style:{marginLeft:c.current.style.width,userSelect:"none",width:200},ref:h,children:l.jsx(hE,{options:i,selectedItemIndex:u,onOptionClick:(b,x)=>{b.isDisabled||(f(x),p(b))},onOptionMouseEnter:b=>{f(b)}})}),c.current):null)})}function gE({isEditable:t}){const[e]=ye();return w.useLayoutEffect(()=>{e.setEditable(t)},[e,t]),null}function bE({scripture:t,nodeOptions:e,editorAdaptor:n,viewOptions:r,logger:o}){const[s]=ye();return w.useEffect(()=>{var i;(i=n.initialize)==null||i.call(n,e,o)},[n,o,e]),w.useEffect(()=>{var i;(i=n.reset)==null||i.call(n);const a=n.serializeEditorState(t,r);if(a==null){o==null||o.warn("LoadStatePlugin: serializedEditorState was null or undefined. Skipping editor update.");return}try{const c=s.parseEditorState(a);queueMicrotask(()=>{s.update(()=>{s.setEditorState(c),s.dispatchCommand(g.CLEAR_HISTORY_COMMAND,void 0)},{tag:uu})})}catch{o==null||o.error("LoadStatePlugin: error parsing or setting editor state.")}},[s,n,o,t,r]),null}function vE({expandedNoteKeyRef:t,nodeOptions:e,viewOptions:n,logger:r}){const[o]=ye();return xE(e,r),yE(o,t,n,r),null}function xE(t,e){const n=w.useRef(void 0),r=t.noteCallers;w.useEffect(()=>{let o=r;(!o||o.length<=0)&&(o=mC),n.current!==o&&(n.current=o,AE("note-callers",o,e))},[e,r])}function yE(t,e,n,r){w.useEffect(()=>{if(!t.hasNodes([Qe,xt,Tn]))throw new Error("NoteNodePlugin: CharNode, NoteNode or ImmutableNoteCallerNode not registered on editor!");const o=s=>t.update(()=>SE(s));return At(t.registerNodeTransform(xt,s=>_E(s,n)),t.registerNodeTransform(Qe,CE),t.registerNodeTransform(g.TextNode,EE),t.registerNodeTransform(Tn,kE),t.registerMutationListener(Tn,(s,{prevEditorState:i})=>NE(s,i)),t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>TE(t,e,n,r),g.COMMAND_PRIORITY_LOW),t.registerRootListener((s,i)=>{i!==null&&i.removeEventListener("dblclick",o),s!==null&&s.addEventListener("dblclick",o)}))},[t,e,r,n])}function _E(t,e){const n=t.getChildren();if(!n.some(r=>Pr(r))&&(e==null?void 0:e.markerMode)!=="editable"&&t.getCaller()!==""&&t.remove(),n.length>0){const r=n[0];g.$isTextNode(r)&&!di(r)&&t.insertBefore(r)}}function CE(t){const e=t.getParentOrThrow(),n=e.getChildren(),r=n.find(i=>Pr(i));if(!Ue(t)||!Se(e)||!r)return;const o=xu(n);r.getPreviewText()!==o&&r.setPreviewText(o);const s=t.getNextSibling();g.$isTextNode(s)?s.getTextContent()!==qe&&s.setTextContent(qe):t.insertAfter(g.$createTextNode(qe))}function EE(t){const e=gm(t),n=e==null?void 0:e.getChildren(),r=n==null?void 0:n.find(s=>Pr(s));if(!g.$isTextNode(t)||!Se(e)||!r||!n)return;const o=xu(n);r.getPreviewText()!==o&&r.setPreviewText(o),!(di(t)||!Se(t.getParent()))&&t.getTextContent()!==qe&&(t.setTextContent(qe),t.selectEnd())}function kE(t){if(!Pr(t))return;const e=t.getNextSibling();!g.$isTextNode(e)||di(e)?t.insertAfter(g.$createTextNode(qe)):e.getTextContent()!==qe&&e.setTextContent(qe)}function NE(t,e){for(const[n,r]of t){if(r!=="destroyed")continue;const o=e.read(()=>{const i=g.$getNodeByKey(n),a=i==null?void 0:i.getParent();return Pr(i)&&Se(a)&&a.getCaller()===ao}),s=document.querySelector(".editor-input");!o||!s||(s.classList.add("reset-counters"),s.offsetHeight,s.classList.remove("reset-counters"))}}function TE(t,e,n,r){var o;if((n==null?void 0:n.noteMode)!=="expandInline")return!1;const s=g.$getSelection();if(!g.$isRangeSelection(s)||!s.isCollapsed())return!1;const i=s.anchor,a=i.getNode();if(e.current){const c=Rs(a,u=>Se(u));if(c)e.current!==c.getKey()&&(e.current=c.getKey());else{const u=g.$getNodeByKey(e.current);u&&!u.getIsCollapsed()&&(r==null||r.debug("Cursor moved away from NoteNode, collapsing it"),_s(t,e.current,r)),e.current=void 0}}if(i.offset===0){const c=a.getPreviousSibling();if(Se(c)){r==null||r.debug("Cursor is just after a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,_s(t,u,r)}}if(i.offset===a.getTextContentSize()){const c=a.getNextSibling();if(Se(c)){r==null||r.debug("Cursor is just before a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,_s(t,u,r)}else if(!c){const u=Rs(a,d=>Se(d));if(u&&u.getIsCollapsed()&&kn(u.getParent())&&u.is((o=u.getParent())==null?void 0:o.getLastChild())){r==null||r.debug("Cursor is at end of note at end of para");const d=u.getKey();e.current=d,_s(t,d,r)}}}if(kn(a)){const c=a.getChildAtIndex(i.offset),u=c==null?void 0:c.getPreviousSibling();if(us(u)&&Se(c)){r==null||r.debug("Cursor is between verse and NoteNode");const d=c.getKey();c.getIsCollapsed()?e.current=d:e.current=void 0,_s(t,d,r)}}return!1}function _s(t,e,n){const r=g.$getNodeByKey(e);try{r==null||r.toggleIsCollapsed()}catch(o){if(o instanceof Error&&o.message.includes("read only"))n==null||n.warn("Fallback triggered after stabilization - edge case"),setTimeout(()=>{t.update(()=>{r==null||r.toggleIsCollapsed()})},0);else throw o}}function SE(t){const e=g.$getSelection();if(!g.$isRangeSelection(e))return;const n=e.anchor,r=e.focus,o=n.getNode(),s=r.getNode();if(Se(o)&&g.$isTextNode(s)){t.preventDefault();const i=g.$createRangeSelection();i.anchor.set(s.getKey(),0,"text"),i.focus.set(s.getKey(),r.offset,"text"),g.$setSelection(i)}}function AE(t,e,n){for(const r of document.styleSheets)try{const o=r.cssRules||r.rules;for(const s of o)if(DE(s,t)){const i=e.map(a=>`"${a}"`).join(" ");s.symbols=i;return}}catch{continue}n==null||n.warn(`Editor: counter style "${t}" not found.`)}function DE(t,e){return typeof t=="object"&&t!==null&&"name"in t&&t.name===e&&"symbols"in t&&typeof t.symbols=="string"}function ME({onChange:t}){const[e]=ye();return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const n=e.read(()=>Nm());return t==null||t(n),!1},g.COMMAND_PRIORITY_LOW),[e,t]),null}function RE(){const[t]=ye();return OE(t),null}function OE(t){w.useEffect(()=>{if(!t.hasNodes([Yt]))throw new Error("ParaNodePlugin: ParaNode not registered on editor!");return t.registerNodeTransform(Yt,e=>jE(e,t))},[t])}function jE(t,e){Nu(e,t.getKey())&&Rm(t.getFirstChild()),!(!jt(t)||t.getMarker()!=="b"||t.isEmpty()||!e.getEditorState().read(()=>{const n=g.$getNodeByKey(t.getKey());return jt(n)&&((n==null?void 0:n.isEmpty())??!1)}))&&t.clear()}function Um({onStateChange:t}){const[e]=ye(),[n,r]=w.useState(e),o=w.useRef(!1),s=w.useRef(!1),i=w.useRef(),a=w.useCallback(()=>{const c=g.$getSelection();if(g.$isRangeSelection(c)){const u=c.anchor.getNode();let d=u.getKey()==="root"?u:Rs(u,f=>{const h=f.getParent();return h!==null&&g.$isRootOrShadowRoot(h)});d===null&&(d=u.getTopLevelElementOrThrow());const p=d.getKey();n.getElementByKey(p)!==null&&(jt(d)||Jn(d)||ci(d))&&(i.current=d.getMarker(),t==null||t(o.current,s.current,i.current))}},[n,t]);return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,(c,u)=>(a(),r(u),!1),g.COMMAND_PRIORITY_CRITICAL),[e,a]),w.useEffect(()=>At(n.registerUpdateListener(({editorState:c})=>{c.read(()=>{a()})}),n.registerCommand(g.CAN_UNDO_COMMAND,c=>(o.current=c,t==null||t(o.current,s.current,i.current),!1),g.COMMAND_PRIORITY_CRITICAL),n.registerCommand(g.CAN_REDO_COMMAND,c=>(s.current=c,t==null||t(o.current,s.current,i.current),!1),g.COMMAND_PRIORITY_CRITICAL)),[a,n,t]),null}function IE({textDirection:t}){const[e]=ye();return LE(e,t),PE(e),null}function LE(t,e){w.useEffect(()=>{function n(){const r=t.getRootElement();if(!r||e==="auto")return;r.dir=e;const o=t._config.theme.placeholder,s=document.getElementsByClassName(o)[0];s&&(s.dir=e)}return n(),t.registerUpdateListener(({dirtyElements:r})=>{r.size>0&&n()})},[t,e])}function PE(t){w.useEffect(()=>{const e=n=>{if(n.key!=="ArrowLeft"&&n.key!=="ArrowRight")return!1;const r=g.$getSelection();if(!g.$isRangeSelection(r))return!1;const o=r.anchor.getNode(),s=Rs(o,p=>h1(p,t)==="p");if(!s)return!1;const i=t.getElementByKey(s.getKey());if(!i)return!1;const a=i.parentElement,c=i.dir||"ltr",u=((a==null?void 0:a.dir)??"")||"ltr";if(!a||c===u)return!1;const d=a.dir==="rtl"&&n.key==="ArrowLeft"||a.dir==="ltr"&&n.key==="ArrowRight";return r.modify("move",d,"character"),n.preventDefault(),!0};return t.registerCommand(g.KEY_DOWN_COMMAND,e,g.COMMAND_PRIORITY_HIGH)},[t])}function $E(){const[t]=ye();return FE(t),null}function FE(t){w.useEffect(()=>{if(!t.hasNodes([Qe,qt,xt,g.TextNode,Bt]))throw new Error("TextSpacingPlugin: CharNode, ImmutableVerseNode, NoteNode, TextNode or VerseNode not registered on editor!");return At(t.registerNodeTransform(g.TextNode,BE),t.registerNodeTransform(g.TextNode,e=>qE(e,t)),t.registerNodeTransform(Bt,zp),t.registerNodeTransform(qt,zp))},[t])}function BE(t){if(!t.isAttached())return;const e=t.getTextContent(),n=t.getNextSibling(),r=t.getParent();t.getMode()!=="normal"||e.endsWith(" ")&&e.length>1||Se(n)||Ue(r)||St(r)||li(r)||(e===" "&&!wn(n)?t.setTextContent(""):ku(t))}function qE(t,e){const n=t.getParent();!li(n)||!t.isAttached()||Nu(e,t.getKey())&&n.insertAfter(t)}function zp(t){if(!t.isAttached())return;const e=t.getPreviousSibling();e&&!wn(e)&&!g.$isTextNode(e)&&!li(e)&&t.insertBefore(g.$createTextNode(" "))}function UE({trigger:t,scriptureReference:e,contextMarker:n,getMarkerAction:r}){const{markersMenuItems:o}=IC({scriptureReference:e,contextMarker:n,getMarkerAction:r});return l.jsx(jC,{trigger:t,items:o})}function VE({trigger:t,scrRef:e,getMarkerAction:n}){const{book:r,chapterNum:o,verseNum:s,verse:i}=e,a=w.useMemo(()=>e,[r,o,s,i]),[c]=ye(),[u]=HE(c);return zE(c),l.jsx(UE,{trigger:t,scriptureReference:a,contextMarker:u,getMarkerAction:n})}function HE(t){const[e,n]=w.useState();return w.useEffect(()=>t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(t.read(()=>{const r=g.$getSelection();if(!g.$isRangeSelection(r)){e&&n(void 0);return}const o=g.$getNodeByKey(r.anchor.key),s=g.$getNodeByKey(r.focus.key);if(!o||!s){e&&n(void 0);return}const i=c1(o,s);if(!i||!q1(i)){e&&n(void 0);return}const a=i.getMarker();e!==a&&n(a)}),!1),g.COMMAND_PRIORITY_LOW),[e,t]),[e]}function zE(t){w.useEffect(()=>{if(!t.hasNodes([Bt,qt]))throw new Error("UsjNodesMenuPlugin: VerseNode or ImmutableVerseNode not registered on editor!");const e={},n={};return At(t.registerNodeTransform(qt,r=>Gp(r,t,e)),t.registerNodeTransform(Bt,r=>Gp(r,t,e)),t.registerMutationListener(qt,r=>Jp(r,t,e,n)),t.registerMutationListener(Bt,r=>Jp(r,t,e,n)))},[t])}function Gp(t,e,n){g.$hasUpdateTag(uu)||Nu(e,t.getKey())&&YE(t,n)}function Kp(t){return RegExp(/(\d+)([a-zA-Z]+)?(-(\d+)([a-zA-Z]+)?)?/).exec(t)}const Yp=2,GE=3,Wp=4,KE=5;function YE(t,e){var n;const r=gu(t),o=r==null?void 0:r.getNumber();if(!o)return;const s=e[o];if(!s)return;let i=parseInt(t.getNumber()),a=((n=Kp(t.getNumber()))==null?void 0:n[Yp])??"";s.forEach(c=>{const u=g.$getNodeByKey(c);if(!u)return;const d=u.getNumber(),p=parseInt(d),f=Kp(d),h=!!(f!=null&&f[GE]),b=h?parseInt(f[Wp]):p;if(b<i||p>i||b===i&&a)return;const x=(f==null?void 0:f[Yp])??"",C=(f==null?void 0:f[KE])??"",E=h?fc(parseInt(f[Wp]),void 0):"";let _=`${x}`;_+=h?`-${E}${C}`:"";const A=fc(p,void 0);u.setNumber(`${A}${_}`),i=parseInt(h?E:A),a=h?C:x})}function Jp(t,e,n,r){e.getEditorState().read(()=>{for(const[o,s]of t){const i=g.$getNodeByKey(o);if(wn(i)){if(s==="created"){const a=gu(i);if(!a)continue;const c=a.getNumber();n[c]||(n[c]=[]),n[c].push(o),r[o]=c}else if(s==="destroyed"){const a=r[o],c=n[a];if(!c)continue;const u=c.findIndex(d=>d===o);if(u===-1)continue;c.splice(u,1),Reflect.deleteProperty(r,o)}}}})}const Vm="formatted",WE="unformatted";let Ou;function JE(t){const e=XE(t);if(!e)throw new Error(`Invalid view mode: ${t}`);Ou=e}JE(Vm);const ju=()=>Ou;function XE(t){let e;switch(t){case Vm:e={markerMode:"hidden",noteMode:"collapsed",hasSpacing:!0,isFormattedFont:!0};break;case WE:e={markerMode:"editable",noteMode:"expanded",hasSpacing:!1,isFormattedFont:!1};break}return e}function QE(t){if(t)return t.markerMode==="editable"?Bt:qt}function ZE(t){const e=[],n=t??Ou;return n&&(e.push(`${L_}${n.markerMode}`),n.hasSpacing&&e.push(j_),n.isFormattedFont&&e.push(I_)),e}let mc;function ek(t){t&&(mc=t)}function tk(t){return t.isEmpty()?Gc:nk(t.toJSON())}function nk(t){if(!t.root||!t.root.children)return;const e=t.root.children;if(e.length===1&&fu(e[0])&&(!e[0].children||e[0].children.length===0))return Gc;const n=Hm(e),r=mr(n);return r?{type:js,version:Is,content:r}:void 0}function rk(t,e){const{type:n,marker:r,unknownAttributes:o}=t;let s;return t.code!==""&&(s=t.code),wt({type:n,marker:r,code:s,...o,content:e})}function ok(t){const{marker:e,number:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t;return wt({type:jn.getType(),marker:e,number:n,sid:r,altnumber:o,pubnumber:s,...i})}function sk(t,e){const{marker:n,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i}=t,a=e&&typeof e[0]=="string"?e[0]:void 0;let{number:c}=t;return c=bm(n,a,c),wt({type:jn.getType(),marker:n,number:c,sid:r,altnumber:o,pubnumber:s,...i})}function ik(t){const{marker:e,sid:n,altnumber:r,pubnumber:o,unknownAttributes:s}=t,{text:i}=t;let{number:a}=t;return a=bm(e,i,a),wt({type:Bt.getType(),marker:e,number:a,sid:n,altnumber:r,pubnumber:o,...s})}function ak(t,e){const{type:n,marker:r,unknownAttributes:o}=t,s=r===""?void 0:r;return e==null||e.forEach((i,a)=>{typeof i=="string"&&i.startsWith(qe)&&(e[a]=i.slice(1))}),wt({type:n,marker:s,...o,content:e})}function lk(t,e){const{type:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function ck(t,e){const{type:n,marker:r,caller:o,category:s,unknownAttributes:i}=t;return wt({type:n,marker:r,caller:o,category:s,...i,content:e})}function Do(t){const{type:e,marker:n,sid:r,eid:o,unknownAttributes:s}=t;return wt({type:e,marker:n===""?void 0:n,sid:r,eid:o,...s})}function uk(t){return t.text}function dk(t,e){const{tag:n,marker:r,unknownAttributes:o}=t;return wt({type:n,marker:r,...o,content:e})}function pk(t){const{marker:e}=t;return{type:ca,marker:e===""?void 0:e}}function Xp(t,e){const n=t[t.length-1];n&&typeof n=="string"?t[t.length-1]=n+e:t.push(e)}function fk(t,e,n,r,o){const s=Qn.getType(),i=e.filter(a=>!n.includes(a));if(n.filter(a=>!e.includes(a)).forEach(a=>{const c=Do({type:s,marker:Lo,eid:a});o.push(c)}),i.forEach(a=>{const c=Do({type:s,marker:lo,sid:a});o.push(c)}),e.length===0){const a=Do({type:s,marker:lo});o.push(a)}if(o.push(...t),e.length===0){const a=Do({type:s,marker:Lo});o.push(a)}(!r||!x1(r))&&e.forEach(a=>{const c=Do({type:s,marker:Lo,eid:a});o.push(c)})}function mr(t,e){const n=[];let r,o=[];return t.forEach((s,i)=>{const a=s,c=s,u=s,d=s,p=s,f=s,h=s,b=s;switch(s.type){case mn.getType():n.push(rk(a,mr(a.children)));break;case pr.getType():n.push(ok(s));break;case jn.getType():n.push(sk(c,mr(c.children)));break;case qt.getType():case Bt.getType():n.push(ik(s));break;case Qe.getType():n.push(ak(u,mr(u.children)));break;case Yt.getType():n.push(lk(d,mr(d.children)));break;case xt.getType():n.push(ck(p,mr(p.children,p.caller)));break;case Ir.getType():case Tn.getType():case g.LineBreakNode.getType():case yo.getType():break;case Nt.getType():if(r=mr(h.children),r){const x=h.typedIDs[_r];if(x)fk(r,x,o,t[i+1],n),o=x;else{const C=r.shift();C&&(typeof C=="string"?Xp(n,C):n.push(C)),r.length>0&&n.push(...r)}}break;case Qn.getType():n.push(Do(s));break;case g.TextNode.getType():f.text&&f.text!==qe&&!f.text.startsWith(lu)&&(!e||f.text!==vu(e))&&Xp(n,uk(f));break;case xo.getType():n.push(dk(b,mr(b.children)));break;case Lr.getType():n.push(pk(s));break;default:mc==null||mc.error(`Unexpected node type '${s.type}'!`)}}),n&&n.length>0?n:void 0}function Hm(t){const e=t.findIndex(n=>fu(n));if(e>=0){const n=t.slice(0,e),r=t[e].children,o=Hm(t.slice(e+1));t=[...n,...r,...o]}return t}const Dl={initialize:ek,deserializeEditorState:tk},Qp=zm([]),hk={type:g.LineBreakNode.getType(),version:1};let pa=[],ve,Gi,gc,ze;function wk(t,e){pa=[],bk(t),vk(e)}function mk(t=0){}function gk(t,e){ve=e??ju();let n;return t?(t.type!==js&&(ze==null||ze.warn(`This USJ type '${t.type}' didn't match the expected type '${js}'.`)),t.version!==Is&&(ze==null||ze.warn(`This USJ version '${t.version}' didn't match the expected version '${Is}'.`)),t.content.length>0?n=vc(Ss(t.content)):n=[Qp]):n=[Qp],gc==null||gc(pa),{root:{children:n,direction:null,format:"",indent:0,type:"root",version:1}}}function bk(t){t&&(Gi=t),t!=null&&t.addMissingComments&&(gc=t.addMissingComments)}function vk(t){t&&(ze=t)}function xk(t){return!t||t.length!==1||typeof t[0]!="string"?"":t[0]}function yk(t){let{marker:e}=t;e!==Vs&&(ze==null||ze.warn(`Unexpected book marker '${e}'!`)),e=e??Vs;const{code:n}=t;(!n||!mn.isValidBookCode(n))&&(ze==null||ze.warn(`Unexpected book code '${n}'!`));const r=[];((ve==null?void 0:ve.markerMode)==="editable"||(ve==null?void 0:ve.markerMode)==="visible")&&r.push(fo("marker",fr(e)+" "+n+qe));const o=xk(t.content);o&&r.push(po(o));const s=yt(t);return wt({type:mn.getType(),marker:e,code:n??"",unknownAttributes:s,children:r,direction:null,format:"",indent:0,version:Zw})}function _k(t){let{marker:e}=t;e!==ia&&(ze==null||ze.warn(`Unexpected chapter marker '${e}'!`)),e=e??ia;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=yt(t);let a;return(ve==null?void 0:ve.markerMode)==="visible"&&(a=!0),(ve==null?void 0:ve.markerMode)==="editable"?wt({type:jn.getType(),marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,children:[po(ui(e,n)??"")],direction:null,format:"",indent:0,version:nm}):wt({type:pr.getType(),marker:e,number:n??"",showMarker:a,sid:r,altnumber:o,pubnumber:s,unknownAttributes:i,version:am})}function Ck(t){let{marker:e}=t;e!==aa&&(ze==null||ze.warn(`Unexpected verse marker '${e}'!`)),e=e??aa;const{number:n,sid:r,altnumber:o,pubnumber:s}=t,i=(QE(ve)??qt).getType(),a=(ve==null?void 0:ve.markerMode)==="editable"?wm:Sm;let c,u;(ve==null?void 0:ve.markerMode)==="editable"?c=ui(e,n):(ve==null?void 0:ve.markerMode)==="visible"&&(u=!0);const d=yt(t);return wt({type:i,text:c,marker:e,number:n??"",sid:r,altnumber:o,pubnumber:s,showMarker:u,unknownAttributes:d,version:a})}function Ek(t,e=[]){let{marker:n}=t;Qe.isValidMarker(n)||ze==null||ze.warn(`Unexpected char marker '${n}'!`),n=n??"",(ve==null?void 0:ve.markerMode)==="editable"&&e.forEach(o=>{bu(o)&&(o.text=qe+o.text)});const r=yt(t);return wt({type:Qe.getType(),marker:n,unknownAttributes:r,children:[...e],direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:im})}function zm(t){return{type:Sr.getType(),children:t,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:um}}function kk(t,e=[]){let{marker:n}=t;Yt.isValidMarker(n)||ze==null||ze.warn(`Unexpected para marker '${n}'!`),n=n??$a;const r=[];(ve==null?void 0:ve.markerMode)==="editable"?r.push(Xo(n),po(qe)):(ve==null?void 0:ve.markerMode)==="visible"&&r.push(fo("marker",fr(n)+qe)),r.push(...e);const o=yt(t);return wt({type:Yt.getType(),marker:n,unknownAttributes:o,children:r,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:hm})}function Nk(t,e){const n=f1(e);let r=()=>{};return Gi!=null&&Gi.noteCallerOnClick&&(r=Gi.noteCallerOnClick),wt({type:Tn.getType(),caller:t,previewText:n,onClick:r,version:Im})}function Tk(t,e){let{marker:n}=t;xt.isValidMarker(n)||ze==null||ze.warn(`Unexpected note marker '${n}'!`),n=n??hu;const{category:r}=t,o=t.caller??"*",s=(ve==null?void 0:ve.noteMode)!=="expanded",i=yt(t);let a,c;(ve==null?void 0:ve.markerMode)==="editable"?(a=Xo(n),c=Xo(n,"closing")):(ve==null?void 0:ve.markerMode)==="visible"&&(a=fo("marker",fr(n)+qe),c=fo("marker",Yo(n)+qe));const u=[];let d;if(a&&u.push(a),(ve==null?void 0:ve.markerMode)==="editable")d=po(vu(o)),u.push(d,...e);else{const p=po(qe);d=Nk(o,e),u.push(d,p,...e.flatMap(Sk(p)))}return c&&u.push(c),wt({type:xt.getType(),marker:n,caller:o,isCollapsed:s,category:r,unknownAttributes:i,children:u,direction:null,format:"",indent:0,version:fm})}function Sk(t){return e=>E1(e)?[e]:[e,t]}function Ak(t){let{marker:e}=t;(!e||!Qn.isValidMarker(e))&&(ze==null||ze.warn(`Unexpected milestone marker '${e}'!`)),e=e??"";const{sid:n,eid:r}=t,o=yt(t);return wt({type:Qn.getType(),marker:e,sid:n,eid:r,unknownAttributes:o,version:dm})}function Zp(t,e=[]){return{type:Nt.getType(),typedIDs:{[_r]:e},children:t,direction:null,format:"",indent:0,version:1}}function Dk(t,e){const{marker:n}=t,r=t.type,o=yt(t),s=[...e];return s.forEach(i=>{bu(i)&&(i.mode="token")}),wt({type:xo.getType(),tag:r,marker:n,unknownAttributes:o,children:s,direction:null,format:"",indent:0,version:Xw})}function Mk(t){return{type:Lr.getType(),marker:t,version:Em}}function Xo(t,e="opening"){return{type:yo.getType(),marker:t,markerSyntax:e,text:"",detail:0,format:0,mode:"normal",style:"",version:1}}function po(t,e="normal"){return{type:g.TextNode.getType(),text:t,detail:0,format:0,mode:e,style:"",version:1}}function fo(t,e){return{type:Ir.getType(),text:e,textType:t,version:Cm}}function ef(t,e){(ve==null?void 0:ve.markerMode)==="editable"?e.push(Xo(t)):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(fo("marker",fr(t)))}function tf(t,e,n=!1){Qe.isValidFootnoteMarker(t)||Qe.isValidCrossReferenceMarker(t)||((ve==null?void 0:ve.markerMode)==="editable"?n?e.push(Xo("","selfClosing")):e.push(Xo(t,"closing")):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(fo("marker",Yo(n?"":t))))}function Rk(t,e){if(t.type!=="ms")return;const n=[];if(t.sid&&n.push(`sid="${t.sid}"`),t.eid&&n.push(`eid="${t.eid}"`),n.length<=0)return;const r=lu+n.join(" ");(ve==null?void 0:ve.markerMode)==="editable"?e.push(po(r)):(ve==null?void 0:ve.markerMode)==="visible"&&e.push(fo("attribute",r))}function nf(t,e){return t.length<=0||e===0?t:t.map(n=>n-e)}function Ok(t,e){const n=t.indexOf(e,0);n>-1&&t.splice(n,1)}function rf(t,e){e.marker===lo&&e.sid!==void 0&&t.push(e.sid),e.marker===Lo&&e.eid!==void 0&&Ok(t,e.eid)}function bc(t,e,n=!1,r=[]){if(e.length<=0||e[0]>=t.length)return t;const o=e.shift(),s=e.length>0?e.shift():t.length-1;if(o===void 0||s===void 0||s>=t.length||t.length<=0)return t;const i=t.slice(0,o),a=n?[Zp(i,[...r])]:i,c=t[o];rf(r,c);const u=bc(t.slice(o+1,s),nf(e,o+1),c.marker===lo,r),d=Zp(u,[...r]),p=t[s];rf(r,p);const f=bc(t.slice(s+1),nf(e,s+1),p.marker===lo,r);return[...a,d,...f]}function Ss(t){const e=[],n=[];return t==null||t.forEach(r=>{if(typeof r=="string")r&&n.push(po(r));else if(!r.type)ze==null||ze.error("Marker type is missing!");else switch(r.type){case mn.getType():n.push(yk(r));break;case jn.getType():n.push(_k(r));break;case Bt.getType():ve!=null&&ve.hasSpacing||n.push(hk),n.push(Ck(r));break;case Qe.getType():ef(r.marker??"",n),n.push(Ek(r,Ss(r.content))),tf(r.marker??"",n);break;case Yt.getType():n.push(kk(r,Ss(r.content)));break;case xt.getType():n.push(Tk(r,Ss(r.content)));break;case Qn.getType():Y_(r.marker??"")&&(e.push(n.length),r.sid!==void 0&&(pa==null||pa.push(r.sid))),n.push(Ak(r)),ef(r.marker??"",n),Rk(r,n),tf(r.marker??"",n,!0);break;case Lr.getType():n.push(Mk(r.marker??""));break;default:ze==null||ze.warn(`Unknown type-marker '${r.type}-${r.marker}'!`),n.push(Dk(r,Ss(r.content)))}}),bc(n,e)}function vc(t){const e=t.findIndex(n=>O_(n)||n1(n)||e1(n));if(e>=0){const n=vc(t.slice(0,e)),r=t[e],o=vc(t.slice(e+1));return[...n,r,...o]}else if(t.some(n=>"text"in n&&"mode"in n||O1(n)))return[zm(t)];return t}const xc={initialize:wk,reset:mk,serializeEditorState:gk},Fi=t=>{if(!xt.isValidMarker(t)||!t.includes("f"))throw new Error(`Invalid footnote marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"fr",content:[`${n}:${r}`]}),e.noteText&&o.push({type:"char",marker:"fq",content:[e.noteText]}),o.push({type:"char",marker:"ft",content:["-"]}),[{type:"note",marker:t,caller:ao,content:o}]}}},of=t=>{if(!xt.isValidMarker(t)||!t.includes("x"))throw new Error(`Invalid cross-reference marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"xo",content:[`${n}:${r}`]}),o.push({type:"char",marker:"xt",content:["-"]}),[{type:"note",marker:t,caller:cu,content:o}]}}},jk={c:{action:t=>{const{chapterNum:e}=t.reference;return[{type:"chapter",marker:"c",number:`${e+1}`}]}},v:{action:t=>{const{verseNum:e,verse:n}=t.reference;return[{type:"verse",marker:"v",number:`${fc(e,n)}`}]}},f:Fi("f"),fe:Fi("fe"),ef:Fi("ef"),efe:Fi("efe"),x:of("x"),ex:of("ex")};function Ik(t,e,n,r,o){const s=Lk(t);return{action:i=>{i.editor.update(()=>{var a;const c=g.$getSelection();g.$isRangeSelection(c)&&(i.noteText=c.getTextContent());const u=(a=s==null?void 0:s.action)==null?void 0:a.call(s,i);if(!u)return;const d=Rp(u,xc,r),p=kl(d);if(g.$isRangeSelection(c)){const f=c.anchor.getNode();if(Se(p))Am(p,c,r),p.getIsCollapsed()||(e.current=p.getKey());else if(c.getTextContent().length>0)Pk(c,()=>kl(d));else if(g.$isElementNode(p)&&!p.isInline()){const h=c.insertParagraph();if(h){const b=h.getChildren();p.append(...b),h.replace(p),p.selectStart()}}else if(g.$isTextNode(f)&&!di(f)&&Se(f.getParent())&&c.isCollapsed()){let h=f.insertAfter(p);if(la(p)){const b={...r||ju(),markerMode:"hidden"},x=Rp(u,xc,b),C=kl(x);h=h.insertAfter(C)}h.insertAfter(g.$createTextNode(qe))}else{c.insertNodes([p]),Uk(p);const h=p.getNextSibling();h?h.selectStart():p.selectStart()}}else c==null||c.insertNodes([p])},o)},label:s==null?void 0:s.label}}function Lk(t){let e=jk[t];return e||(Yt.isValidMarker(t)?e={action:()=>[{type:Yt.getType(),marker:t,content:[]}]}:Qe.isValidMarker(t)&&(e={action:()=>[{type:Qe.getType(),marker:t,content:["-"]}]})),e}function Pk(t,e){const n=t.getNodes(),[r,o]=$k(t);let s;n.forEach((i,a)=>{if(g.$isElementNode(s)&&s.isParentOf(i))return;const c=Fk(i,a===0,a===n.length-1,r,o);if(!c){s=void 0;return}s||(s=e(),c.insertBefore(s)),qk(c,s)}),(g.$isTextNode(s)||g.$isElementNode(s))&&s.selectEnd()}function $k(t){const e=t.anchor.offset,n=t.focus.offset;return t.isBackward()?[n,e]:[e,n]}function Fk(t,e,n,r,o){if(!(St(t)||Se(t)||Se(t.getParent()))){if(g.$isTextNode(t))return Bk(t,e,n,r,o);if(g.$isElementNode(t)&&t.isInline())return t}}function Bk(t,e,n,r,o){const s=t.getTextContentSize(),i=e?r:0,a=n?o:s;if(i===0&&a===0)return;const c=t.splitText(i,a);return c.length===1?c[0]:c.length===3||a===s?c[1]:c[0]}function qk(t,e){var n;if(g.$isTextNode(e)){const r=sf(t,e);e.setTextContent(r),t.remove()}else if(g.$isElementNode(e)){const r=e.getChildrenSize();e.append(t);for(let o=0;o<r;o++)(n=e.getFirstChild())==null||n.remove();sf(t,e)}}function sf(t,e){let n=t.getTextContent();if(g.$isTextNode(t)&&e.isInline()&&n.startsWith(" ")){n=n.trimStart(),t.setTextContent(n);const r=e.getPreviousSibling();ku(r),g.$isTextNode(r)||e.insertBefore(g.$createTextNode(" "))}return n}function Uk(t){wn(t)&&(ku(t.getPreviousSibling()),Rm(t.getNextSibling()))}const Gm={chapter:"chapter",verse:"verse",char:"char",para:"para",typedMark:"editor-typed-mark",typedMarkOverlap:"editor-typed-markOverlap",mark:"editor-mark",markOverlap:"editor-markOverlap",placeholder:"editor-placeholder",paragraph:"editor-paragraph",quote:"editor-quote",heading:{h1:"editor-heading-h1",h2:"editor-heading-h2",h3:"editor-heading-h3",h4:"editor-heading-h4",h5:"editor-heading-h5"},list:{nested:{listitem:"editor-nested-listitem"},ol:"editor-list-ol",ul:"editor-list-ul",listitem:"editor-listitem"},image:"editor-image",link:"editor-link",text:{bold:"editor-text-bold",italic:"editor-text-italic",overflowed:"editor-text-overflowed",hashtag:"editor-text-hashtag",underline:"editor-text-underline",strikethrough:"editor-text-strikethrough",underlineStrikethrough:"editor-text-underlineStrikethrough"}};function Vk({options:t,editedUsjRef:e,usj:n,setUsj:r}){const{view:o,nodes:s}=t||{},{hasSpacing:i,isFormattedFont:a,markerMode:c}=o||{};return w.useEffect(()=>{e.current&&!or(e.current,n)&&r(e.current)},[e,i,a,c,s,r,n]),null}function Hk({scrRef:t,onScrRefChange:e}){const[n]=ye(),r=w.useRef(!1),o=w.useRef(!1),{book:s,chapterNum:i,verseNum:a}=t;return w.useEffect(()=>n.registerMutationListener(mn,c=>{n.update(()=>{for(const[u,d]of c){const p=g.$getNodeByKey(u);p&&Jn(p)&&d==="created"&&af(i,a,o)}},{tag:uc})},{skipInitialization:!0}),[n,i,a]),w.useEffect(()=>{r.current?r.current=!1:n.update(()=>af(i,a,o),{tag:uc})},[n,i,a]),w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(o.current?o.current=!1:zk(s,i,a,e,r),!1),g.COMMAND_PRIORITY_LOW),[n,s,i,a,e]),null}function af(t,e,n){var r;const o=xm(g.$getSelection()),s=(r=Mm(o))==null?void 0:r.getNumber();if(w1(s)&&yu(e,s))return;const i=g.$getRoot().getChildren(),a=r1(i,t),c=p1(i,a),u=o1(c,!!a);if(u&&!a||!a)return;d1(c,u);const d=B1(c,e);if(d){if(jt(d)){const p=d.getFirstChild();g.$isTextNode(p)?p.select(0,0):d.select(0,0)}else d.selectNext(0,0);n.current=!0}}function zk(t,e,n,r,o){const s=xm(g.$getSelection());if(!s)return;const i=gu(s),a=parseInt((i==null?void 0:i.getNumber())??"1",10),c=Mm(s),u=c==null?void 0:c.getNumber(),d=parseInt(u??"0",10),p=u?yu(n,u):n===d;if(o.current=!!(i&&a!==e||!p),o.current){const f={book:t,chapterNum:a,verseNum:d};u!=null&&d.toString()!==u&&(f.verse=u),r(f)}}function Gk(t){return Jn(t)?`${t.__code}`:du(t)?`${t.__marker} "${t.__number}"`:Ue(t)?`${t.__marker}`:ci(t)?`${t.__marker} "${t.__number}"`:Pr(t)?`${t.__caller}`:us(t)?`${t.__marker} "${t.__number}"`:Se(t)?`${t.__marker} "${t.__caller}"`+(t.__isCollapsed?" (collapsed)":" (expanded)"):jt(t)?`${t.__marker}`:St(t)?`ids: [ ${JSON.stringify(t.getTypedIDs())} ]`:mu(t)?`${t.__marker} "${t.__number}"`:""}function Kk(){const[t]=ye();return l.jsx(Nx,{viewClassName:"tree-view-output",treeTypeButtonClassName:"debug-treetype-button",timeTravelPanelClassName:"debug-timetravel-panel",timeTravelButtonClassName:"debug-timetravel-button",timeTravelPanelSliderClassName:"debug-timetravel-panel-slider",timeTravelPanelButtonClassName:"debug-timetravel-panel-button",customPrintNode:Gk,editor:t})}const Km=w.createContext(null),lf=4;function Yk({children:t,className:e,onClick:n,title:r}){const o=w.useRef(null),s=w.useContext(Km);if(s===null)throw new Error("DropDownItem must be used within a DropDown");const{registerItem:i}=s;return w.useEffect(()=>{o&&o.current&&i(o)},[o,i]),l.jsx("button",{className:e,onClick:n,ref:o,title:r,type:"button",children:t})}function Wk({children:t,dropDownRef:e,onClose:n}){const[r,o]=w.useState(),[s,i]=w.useState(),a=w.useCallback(d=>{o(p=>p?[...p,d]:[d])},[o]),c=d=>{if(!r)return;const p=d.key;["Escape","ArrowUp","ArrowDown","Tab"].includes(p)&&d.preventDefault(),p==="Escape"||p==="Tab"?n():p==="ArrowUp"?i(f=>{if(!f)return r[0];const h=r.indexOf(f)-1;return r[h===-1?r.length-1:h]}):p==="ArrowDown"&&i(f=>f?r[r.indexOf(f)+1]:r[0])},u=w.useMemo(()=>({registerItem:a}),[a]);return w.useEffect(()=>{r&&!s&&i(r[0]),s&&s.current&&s.current.focus()},[r,s]),l.jsx(Km.Provider,{value:u,children:l.jsx("div",{className:"dropdown",ref:e,onKeyDown:c,children:t})})}function Jk({disabled:t=!1,buttonLabel:e,buttonAriaLabel:n,buttonClassName:r,buttonIconClassName:o,children:s,stopCloseOnClickSelf:i}){const a=w.useRef(null),c=w.useRef(null),[u,d]=w.useState(!1),p=()=>{d(!1),c&&c.current&&c.current.focus()};return w.useEffect(()=>{const f=c.current,h=a.current;if(u&&f!==null&&h!==null){const{top:b,left:x}=f.getBoundingClientRect();h.style.top=`${b+f.offsetHeight+lf}px`,h.style.left=`${Math.min(x,window.innerWidth-h.offsetWidth-20)}px`}},[a,c,u]),w.useEffect(()=>{const f=c.current;if(f!==null&&u){const h=b=>{const x=b.target;i&&a.current&&a.current.contains(x)||f.contains(x)||d(!1)};return document.addEventListener("click",h),()=>{document.removeEventListener("click",h)}}return()=>{}},[a,c,u,i]),w.useEffect(()=>{const f=()=>{if(u){const h=c.current,b=a.current;if(h!==null&&b!==null){const{top:x}=h.getBoundingClientRect(),C=x+h.offsetHeight+lf;C!==b.getBoundingClientRect().top&&(b.style.top=`${C}px`)}}};return document.addEventListener("scroll",f),()=>{document.removeEventListener("scroll",f)}},[c,a,u]),l.jsxs(l.Fragment,{children:[l.jsxs("button",{type:"button",disabled:t,"aria-label":n||e,className:r,onClick:()=>d(!u),ref:c,children:[o&&l.jsx("span",{className:o}),e&&l.jsx("span",{className:"text dropdown-button-text",children:e}),l.jsx("i",{className:"chevron-down"})]}),u&&fn.createPortal(l.jsx(Wk,{dropDownRef:a,onClose:p,children:s}),document.body)]})}const yc={m:"m - Paragraph - Margin - No First Line Indent",ms:"ms - Heading - Major Section Level 1",nb:"nb - Paragraph - No Break with Previous Paragraph",p:"p - Paragraph - Normal - First Line Indent",pi:"pi - Paragraph - Indented - Level 1 - First Line Indent",q1:"q1 - Poetry - Indent Level 1",q2:"q2 - Poetry - Indent Level 2",r:"r - Heading - Parallel References",s:"s - Heading - Section Level 1"},_c={...yc,ide:"ide - File - Encoding",h:"h - File - Header",h1:"h1 - File - Header",h2:"h2 - File - Left Header",h3:"h3 - File - Right Header",toc1:"toc1 - File - Long Table of Contents Text",toc2:"toc2 - File - Short Table of Contents Text",toc3:"toc3 - File - Book Abbreviation",cl:"cl - Chapter - Publishing Label",mt:"mt - Title - Major Title Level 1",mt1:"mt1 - Title - Major Title Level 1",mt2:"mt2 - Title - Major Title Level 2",mt3:"mt3 - Title - Major Title Level 3",mt4:"mt4 - Title - Major Title Level 4",ms1:"ms1 - Heading - Major Section Level 1",ms2:"ms2 - Heading - Major Section Level 2",ms3:"ms3 - Heading - Major Section Level 3",b:"b - Poetry - Stanza Break (Blank Line)"};function Xk({editorRef:t,blockMarker:e,disabled:n=!1}){return l.jsx(Jk,{disabled:n,buttonClassName:"toolbar-item block-controls",buttonIconClassName:"icon block-marker "+Qk(e),buttonLabel:Zk(e),buttonAriaLabel:"Formatting options for block type",children:Object.keys(yc).map(r=>l.jsxs(Yk,{className:"item block-marker "+eN(e===r),onClick:()=>{var o;return(o=t.current)==null?void 0:o.formatPara(r)},children:[l.jsx("i",{className:"icon block-marker "+r}),l.jsx("span",{className:"text usfm_"+r,children:yc[r]})]},r))})}function Qk(t){return t&&t in _c?t:"ban"}function Zk(t){return t&&t in _c?_c[t]:"No Style"}function eN(t){return t?"active dropdown-item-active":""}function cf(){return l.jsx("div",{className:"divider"})}const tN=w.forwardRef(function({editorRef:t,isReadonly:e=!1,onStateChange:n},r){const[o]=ye(),[s,i]=w.useState(o),[a,c]=w.useState(),[u,d]=w.useState(!1),[p,f]=w.useState(!1),h=w.useCallback((b,x,C)=>{d(b),f(x),c(C),n==null||n(b,x,C)},[n]);return w.useEffect(()=>o.registerCommand(g.SELECTION_CHANGE_COMMAND,(b,x)=>(i(x),!1),g.COMMAND_PRIORITY_CRITICAL),[o]),l.jsxs(l.Fragment,{children:[l.jsx(Um,{onStateChange:h}),l.jsxs("div",{className:"toolbar",children:[l.jsx("button",{disabled:!u||e,onClick:()=>{s.dispatchCommand(g.UNDO_COMMAND,void 0)},title:ql?"Undo (⌘Z)":"Undo (Ctrl+Z)",type:"button",className:"toolbar-item spaced","aria-label":"Undo",children:l.jsx("i",{className:"format undo"})}),l.jsx("button",{disabled:!p||e,onClick:()=>{s.dispatchCommand(g.REDO_COMMAND,void 0)},title:ql?"Redo (⌘Y)":"Redo (Ctrl+Y)",type:"button",className:"toolbar-item","aria-label":"Redo",children:l.jsx("i",{className:"format redo"})}),l.jsx(cf,{}),s===o&&l.jsxs(l.Fragment,{children:[l.jsx(Xk,{editorRef:t,blockMarker:a,disabled:e}),l.jsx(cf,{})]}),l.jsx("div",{ref:r,className:"end-container"})]})]})}),uf={namespace:"platformEditor",theme:Gm,editable:!0,editorState:void 0,onError(t){throw t},nodes:[Nt,...gC]},nN=ju(),rN={},oN={};function sN(){return l.jsx("div",{className:"editor-placeholder",children:"Enter some Scripture..."})}const Ym=w.forwardRef(function({defaultUsj:t,scrRef:e,onScrRefChange:n,onSelectionChange:r,onUsjChange:o,onStateChange:s,options:i,logger:a,children:c},u){const d=w.useRef(null),p=w.useRef(null),f=w.useRef(null),h=w.useRef(t),b=w.useRef(),[x,C]=w.useState(t),[E,_]=w.useState(0),{isReadonly:A=!1,hasExternalUI:j=!1,hasSpellCheck:G=!1,textDirection:O="ltr",markerMenuTrigger:V="\\",view:F=nN,nodes:$=rN,debug:W=!1}=i??oN;uf.editable=!A,Dl.initialize(a),w.useImperativeHandle(u,()=>({focus(){var M;(M=d.current)==null||M.focus()},undo(){var M;(M=d.current)==null||M.dispatchCommand(g.UNDO_COMMAND,void 0)},redo(){var M;(M=d.current)==null||M.dispatchCommand(g.REDO_COMMAND,void 0)},cut(){var M;(M=d.current)==null||M.dispatchCommand(g.CUT_COMMAND,null)},copy(){var M;(M=d.current)==null||M.dispatchCommand(g.COPY_COMMAND,null)},paste(){d.current&&Mu(d.current)},pastePlainText(){d.current&&Ru(d.current)},getUsj(){return h.current},setUsj(M){if(!or(h.current,M)){h.current=M;const T=or(x,M);C(M),T&&_(L=>L+1)}},applyUpdate(M,T="remote"){var L,S;(L=d.current)==null||L.update(()=>{T==="remote"&&g.$addUpdateTag(pc),BC(M,F,$,a)},{discrete:!0});const D=(S=d.current)==null?void 0:S.getEditorState();if(!D)return;const P=Dl.deserializeEditorState(D);if(P){const H=!or(h.current,P);if(H&&(h.current=P),H||!or(x,P)){const B=$p(M,D);o==null||o(P,M,T,B)}}},replaceEmbedUpdate(M,T){var L;const S=(L=d.current)==null?void 0:L.read(()=>W1(M,T));S&&this.applyUpdate(S)},getSelection(){var M;return(M=d.current)==null?void 0:M.read(Nm)},setSelection(M){var T;(T=d.current)==null||T.update(()=>{const L=Cu(M);L!==void 0&&g.$setSelection(L)},{tag:tm})},addAnnotation(M,T,L){var S;(S=p.current)==null||S.addAnnotation(M,Dp(T),L)},removeAnnotation(M,T){var L;(L=p.current)==null||L.removeAnnotation(Dp(M),T)},formatPara(M){var T;(T=d.current)==null||T.update(()=>{const L=g.$getSelection();g.$isRangeSelection(L)&&h0(L,()=>Hs(M))})},getElementByKey(M){var T;return(T=d.current)==null?void 0:T.read(()=>{var L;return((L=d.current)==null?void 0:L.getElementByKey(M))??void 0})},insertNote(M,T,L){var S;(S=d.current)==null||S.update(()=>{const D=j1(M,T,L,e,F,$,a);D&&!D.getIsCollapsed()&&(b.current=D.getKey())})},selectNote(M){var T;(T=d.current)==null||T.update(()=>{const L=Lp(M);L&&(L1(L,F),L.getIsCollapsed()||(b.current=L.getKey()))})},getNoteOps(M){var T;return(T=d.current)==null?void 0:T.read(()=>{const L=Lp(M);if(L)return Tu(L)})},get toolbarEndRef(){return f}}));const N=w.useCallback((M,T,L,S)=>{if(P_.some(P=>L.has(P)))return;const D=Dl.deserializeEditorState(M);if(D){const P=!or(h.current,D);if(P&&(h.current=D),P||!or(x,D)){const H=L.has(pc)?"remote":"local",B=$p(S,M);o==null||o(D,S,H,B)}}},[x,o]);return l.jsxs(Rc,{initialConfig:uf,children:[l.jsx(gE,{isEditable:!A}),l.jsxs("div",{className:"editor-container",children:[j?l.jsx(Um,{onStateChange:s}):l.jsx("div",{className:"editor-toolbar-container"+(A?"-readonly":"-editable"),children:l.jsx(tN,{ref:f,editorRef:u,isReadonly:A,onStateChange:s})}),l.jsxs("div",{className:"editor-inner",children:[l.jsx(Wh,{editorRef:d}),l.jsx(sh,{contentEditable:l.jsx(Ic,{className:`editor-input usfm ${ZE(F).join(" ")}`,spellCheck:G}),placeholder:l.jsx(sN,{}),ErrorBoundary:Oc}),l.jsx(Jh,{}),e&&n&&l.jsx(Hk,{scrRef:e,onScrRefChange:n}),e&&l.jsx(VE,{trigger:V,scrRef:e,getMarkerAction:(M,T)=>Ik(M,b,T,F)}),l.jsx(Vk,{options:{view:F,nodes:$},editedUsjRef:h,usj:x,setUsj:C}),l.jsx(bE,{scripture:x,nodeOptions:$,editorAdaptor:xc,viewOptions:F,logger:a},E),l.jsx(ME,{onChange:r}),l.jsx($C,{onChange:N,ignoreSelectionChange:!0,ignoreHistoryMergeTagChange:!0}),l.jsx(PC,{ref:p,logger:a}),l.jsx(nE,{viewOptions:F}),l.jsx(lE,{}),l.jsx(dE,{}),l.jsx(pE,{logger:a}),l.jsx(mE,{}),l.jsx(vE,{expandedNoteKeyRef:b,nodeOptions:$,viewOptions:F,logger:a}),l.jsx(RE,{}),l.jsx(IE,{textDirection:O}),l.jsx($E,{}),c]}),W&&l.jsx(Kk,{})]})]})}),iN=w.forwardRef(function(t,e){const{children:n,...r}=t;return l.jsx(Ym,{ref:e,...r})});function Wm(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)}function fa(t,e,n,r,o){return{author:e,content:t,deleted:o===void 0?!1:o,id:n===void 0?Wm():n,timeStamp:r===void 0?performance.timeOrigin+performance.now():r,type:"comment"}}function Jm(t,e,n){return{comments:e,id:n===void 0?Wm():n,quote:t,type:"thread"}}function df(t){return{comments:Array.from(t.comments),id:t.id,quote:t.quote,type:"thread"}}function aN(t){return{author:t.author,content:"[Deleted Comment]",deleted:!0,id:t.id,timeStamp:t.timeStamp,type:"comment"}}function Ml(t){const e=t._changeListeners;for(const n of e)n()}class lN{constructor(e,n){de(this,"_editor"),de(this,"_comments"),de(this,"_changeListeners"),de(this,"_collabProvider"),de(this,"logger"),this._comments=[],this._editor=e,this.logger=n,this._collabProvider=null,this._changeListeners=new Set}isCollaborative(){return this._collabProvider!==null}getComments(){return this._comments}setComments(e){this._comments=e,Ml(this)}addComment(e,n,r){const o=Array.from(this._comments),s=this._getCollabComments();if(n!==void 0&&e.type==="comment")for(let i=0;i<o.length;i++){const a=o[i];if(a.type==="thread"&&a.id===n.id){const c=df(a);o.splice(i,1,c);const u=r!==void 0?r:c.comments.length;if(this.isCollaborative()&&s!==null){const d=s.get(i).get("comments");this._withRemoteTransaction(()=>{const p=this._createCollabSharedMap(e);d.insert(u,[p])})}c.comments.splice(u,0,e);break}}else{const i=r!==void 0?r:o.length;this.isCollaborative()&&s!==null&&this._withRemoteTransaction(()=>{const a=this._createCollabSharedMap(e);s.insert(i,[a])}),o.splice(i,0,e)}this._comments=o,Ml(this)}deleteCommentOrThread(e,n){const r=Array.from(this._comments),o=this._getCollabComments();let s=null;if(n!==void 0)for(let i=0;i<r.length;i++){const a=r[i];if(a.type==="thread"&&a.id===n.id){const c=df(a);r.splice(i,1,c);const u=c.comments;if(s=u.indexOf(e),this.isCollaborative()&&o!==null){const d=o.get(i).get("comments"),p=s;this._withRemoteTransaction(()=>{d.delete(p)})}u.splice(s,1);break}}else s=r.indexOf(e),this.isCollaborative()&&o!==null&&this._withRemoteTransaction(()=>{o.delete(s)}),r.splice(s,1);return this._comments=r,Ml(this),e.type==="comment"?{index:s,markedComment:aN(e)}:null}registerOnChange(e){const n=this._changeListeners;return n.add(e),()=>{n.delete(e)}}_withRemoteTransaction(e){const n=this._collabProvider;n!==null&&n.doc.transact(e,this)}_withLocalTransaction(e){const n=this._collabProvider;try{this._collabProvider=null,e()}finally{this._collabProvider=n}}_getCollabComments(){const e=this._collabProvider;return e!==null?e.doc.get("comments",Xr):null}_createCollabSharedMap(e){const n=new zo,r=e.type,o=e.id;if(n.set("type",r),n.set("id",o),r==="comment")n.set("author",e.author),n.set("content",e.content),n.set("deleted",e.deleted),n.set("timeStamp",e.timeStamp);else{n.set("quote",e.quote);const s=new Xr;e.comments.forEach((i,a)=>{const c=this._createCollabSharedMap(i);s.insert(a,[c])}),n.set("comments",s)}return n}registerCollaboration(e){this._collabProvider=e;const n=this._getCollabComments(),r=()=>{e.connect()},o=()=>{try{e.disconnect()}catch{}},s=this._editor.registerCommand(S_,a=>{var c,u;return r!==void 0&&o!==void 0&&(a?((c=this.logger)==null||c.info("Comments connected!"),r()):((u=this.logger)==null||u.info("Comments disconnected!"),o())),!1},g.COMMAND_PRIORITY_LOW),i=(a,c)=>{if(c.origin!==this){for(const u of a)if(u instanceof Uw){const d=u.target,p=u.delta;let f=0;for(const h of p){const b=h.insert,x=h.retain,C=h.delete,E=d.parent,_=d===n?void 0:E instanceof zo&&this._comments.find(A=>A.id===E.get("id"));if(Array.isArray(b)){const A=f;b.slice().reverse().forEach(j=>{const G=j.get("id"),O=j.get("type")==="thread"?Jm(j.get("quote"),j.get("comments").toArray().map(V=>fa(V.get("content"),V.get("author"),V.get("id"),V.get("timeStamp"),V.get("deleted"))),G):fa(j.get("content"),j.get("author"),G,j.get("timeStamp"),j.get("deleted"));this._withLocalTransaction(()=>{this.addComment(O,_,A)})})}else if(typeof x=="number")f+=x;else if(typeof C=="number")for(let A=0;A<C;A++){const j=_===void 0||_===!1?this._comments[f]:_.comments[f];this._withLocalTransaction(()=>{this.deleteCommentOrThread(j,_)}),f++}}}}};return n===null?()=>null:(n.observeDeep(i),r(),()=>{n.unobserveDeep(i),s(),this._collabProvider=null})}}function cN(t){const[e,n]=w.useState(t.getComments());return w.useEffect(()=>t.registerOnChange(()=>{n(t.getComments())}),[t]),e}function uN({onClose:t,children:e,title:n,closeOnClickOutside:r}){const o=w.useRef(null);return w.useEffect(()=>{o.current!==null&&o.current.focus()},[]),w.useEffect(()=>{let s=null;const i=u=>{u.key==="Escape"&&t()},a=u=>{const d=u.target;o.current!==null&&!o.current.contains(d)&&r&&t()},c=o.current;return c!==null&&(s=c.parentElement,s!==null&&s.addEventListener("click",a)),window.addEventListener("keydown",i),()=>{window.removeEventListener("keydown",i),s!==null&&(s==null||s.removeEventListener("click",a))}},[r,t]),l.jsx("div",{className:"Modal__overlay",role:"dialog",children:l.jsxs("div",{className:"Modal__modal",tabIndex:-1,ref:o,children:[l.jsx("h2",{className:"Modal__title",children:n}),l.jsx("button",{className:"Modal__closeButton","aria-label":"Close modal",type:"button",onClick:t,children:"X"}),l.jsx("div",{className:"Modal__content",children:e})]})})}function dN({onClose:t,children:e,title:n,closeOnClickOutside:r=!1}){return fn.createPortal(l.jsx(uN,{onClose:t,title:n,closeOnClickOutside:r,children:e}),document.body)}function Xm(){const[t,e]=w.useState(null),n=w.useCallback(()=>{e(null)},[]),r=w.useMemo(()=>{if(t===null)return null;const{title:s,content:i,closeOnClickOutside:a}=t;return l.jsx(dN,{onClose:n,title:s,closeOnClickOutside:a,children:i})},[t,n]),o=w.useCallback((s,i,a=!1)=>{e({closeOnClickOutside:a,content:i(n),title:s})},[n]);return[r,o]}const pN={...Gm,paragraph:"CommentEditorTheme__paragraph"};function fN(...t){return t.filter(Boolean).join(" ")}function Ar({"data-test-id":t,children:e,className:n,onClick:r,disabled:o,small:s,title:i}){return l.jsx("button",{disabled:o,className:fN("Button__root",o&&"Button__disabled",s&&"Button__small",n),onClick:r,title:i,"aria-label":i,...t&&{"data-test-id":t},children:e})}function hN({className:t}){return l.jsx(Ic,{className:t||"ContentEditable__root"})}function wN({children:t,className:e}){return l.jsx("div",{className:e||"Placeholder__root",children:t})}const pf=g.createCommand("INSERT_INLINE_COMMAND");function mN({anchorKey:t,editor:e,showComments:n,onAddComment:r}){const o=w.useRef(null),s=w.useCallback(()=>{const i=o.current,a=e.getRootElement(),c=e.getElementByKey(t);if(i!==null&&a!==null&&c!==null){const{right:u}=a.getBoundingClientRect(),{top:d}=c.getBoundingClientRect();i.style.left=`${u-20}px`,i.style.top=`${d-30}px`}},[t,e]);return w.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[e,s]),w.useLayoutEffect(()=>{s()},[t,e,n,s]),l.jsx("div",{className:"CommentPlugin_AddCommentBox",ref:o,children:l.jsx("button",{className:"CommentPlugin_AddCommentBox_button",onClick:r,children:l.jsx("i",{className:"icon add-comment"})})})}function gN({onEscape:t}){const[e]=ye();return w.useEffect(()=>e.registerCommand(g.KEY_ESCAPE_COMMAND,n=>t(n),g.COMMAND_PRIORITY_NORMAL),[e,t]),null}function Qm({className:t,autoFocus:e,onEscape:n,onChange:r,editorRef:o,placeholder:s="Type a comment..."}){return l.jsx(Rc,{initialConfig:{namespace:"Commenting",nodes:[],onError:i=>{throw i},theme:pN},children:l.jsxs("div",{className:"CommentPlugin_CommentInputBox_EditorContainer",children:[l.jsx(Py,{contentEditable:l.jsx(hN,{className:t}),placeholder:l.jsx(wN,{children:s}),ErrorBoundary:Oc}),l.jsx(eh,{onChange:r}),l.jsx(Jh,{}),e!==!1&&l.jsx(ih,{}),l.jsx(gN,{onEscape:n}),l.jsx(ah,{}),o!==void 0&&l.jsx(Wh,{editorRef:o})]})})}function Zm(t,e){return w.useCallback((n,r)=>{n.read(()=>{t(nh()),e(!rh(r.isComposing(),!0))})},[e,t])}function bN({editor:t,cancelAddComment:e,submitAddComment:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=w.useMemo(()=>({container:document.createElement("div"),elements:[]}),[]),u=w.useRef(null),d=tg(),p=w.useCallback(()=>{t.getEditorState().read(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){u.current=x.clone();const C=x.anchor,E=x.focus,_=u0(t,C.getNode(),C.offset,E.getNode(),E.offset),A=a.current;if(_!==null&&A!==null){const{left:j,bottom:G,width:O}=_.getBoundingClientRect(),V=d0(t,_);let F=V.length===1?j+O/2-125:j-125;F<10&&(F=10),A.style.left=`${F}px`,A.style.top=`${G+20+(window.pageYOffset||document.documentElement.scrollTop)}px`;const $=V.length,{container:W}=c,N=c.elements,M=N.length;for(let T=0;T<$;T++){const L=V[T];let S=N[T];S===void 0&&(S=document.createElement("span"),N[T]=S,W.appendChild(S));const D=`position:absolute;top:${L.top+(window.pageYOffset||document.documentElement.scrollTop)}px;left:${L.left}px;height:${L.height}px;width:${L.width}px;background-color:rgba(255, 212, 0, 0.3);pointer-events:none;z-index:5;`;S.style.cssText=D}for(let T=M-1;T>=$;T--){const L=N[T];W.removeChild(L),N.pop()}}}})},[t,c]);w.useLayoutEffect(()=>{p();const x=c.container,C=document.body;return C!==null?(C.appendChild(x),()=>{C.removeChild(x)}):()=>{}},[c.container,p]),w.useEffect(()=>(window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}),[p]);const f=x=>(x.preventDefault(),e(),!0),h=()=>{if(s){let x=t.getEditorState().read(()=>{const C=u.current;return C?C.getTextContent():""});x.length>100&&(x=x.slice(0,99)+"…"),n(Jm(x,[fa(r,d)]),!0,void 0,u.current),u.current=null}},b=Zm(o,i);return l.jsxs("div",{className:"CommentPlugin_CommentInputBox",ref:a,children:[l.jsx(Qm,{className:"CommentPlugin_CommentInputBox_Editor",onEscape:f,onChange:b}),l.jsxs("div",{className:"CommentPlugin_CommentInputBox_Buttons",children:[l.jsx(Ar,{onClick:e,className:"CommentPlugin_CommentInputBox_Button",children:"Cancel"}),l.jsx(Ar,{onClick:h,disabled:!s,className:"CommentPlugin_CommentInputBox_Button primary",children:"Comment"})]})]})}function vN({submitAddComment:t,thread:e,placeholder:n}){const[r,o]=w.useState(""),[s,i]=w.useState(!1),a=w.useRef(null),c=tg(),u=Zm(o,i);return l.jsxs(l.Fragment,{children:[l.jsx(Qm,{className:"CommentPlugin_CommentsPanel_Editor",autoFocus:!1,onEscape:()=>!0,onChange:u,editorRef:a,placeholder:n}),l.jsx(Ar,{className:"CommentPlugin_CommentsPanel_SendButton",onClick:()=>{if(s){t(fa(r,c),!1,e);const d=a.current;d!==null&&d.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)}},disabled:!s,children:l.jsx("i",{className:"send"})})]})}function eg({commentOrThread:t,deleteCommentOrThread:e,onClose:n,thread:r=void 0}){return l.jsxs(l.Fragment,{children:["Are you sure you want to delete this ",t.type,"?",l.jsxs("div",{className:"Modal__content",children:[l.jsx(Ar,{onClick:()=>{e(t,r),n()},children:"Delete"})," ",l.jsx(Ar,{onClick:()=>{n()},children:"Cancel"})]})]})}function ff({comment:t,deleteComment:e,thread:n,rtf:r}){const o=Math.round((t.timeStamp-(performance.timeOrigin+performance.now()))/1e3),s=Math.round(o/60),[i,a]=Xm();return l.jsxs("li",{className:"CommentPlugin_CommentsPanel_List_Comment",children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Details",children:[l.jsx("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Author",children:t.author}),l.jsxs("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Time",children:["· ",o>-10?"Just now":r.format(s,"minute")]})]}),l.jsx("p",{className:t.deleted?"CommentPlugin_CommentsPanel_DeletedComment":"",children:t.content}),!t.deleted&&l.jsxs(l.Fragment,{children:[l.jsx(Ar,{onClick:()=>{a("Delete Comment",c=>l.jsx(eg,{commentOrThread:t,deleteCommentOrThread:e,thread:n,onClose:c}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),i]})]})}function xN({activeIDs:t,comments:e,deleteCommentOrThread:n,listRef:r,submitAddComment:o,markNodeMap:s}){const[i]=ye(),[a,c]=w.useState(0),[u,d]=Xm(),p=w.useMemo(()=>new Intl.RelativeTimeFormat("en",{localeMatcher:"best fit",numeric:"auto",style:"short"}),[]);return w.useEffect(()=>{const f=setTimeout(()=>{c(a+1)},1e4);return()=>{clearTimeout(f)}},[a]),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List",ref:r,children:e.map(f=>{const h=f.id;return f.type==="thread"?l.jsxs("li",{onClick:()=>{const b=s.get(h);if(b!==void 0&&(t===null||t.indexOf(h)===-1)){const x=document.activeElement;i.update(()=>{const C=Array.from(b)[0],E=g.$getNodeByKey(C);St(E)&&E.selectStart()},{onUpdate(){x!==null&&x.focus()}})}},className:`CommentPlugin_CommentsPanel_List_Thread ${s.has(h)?"interactive":""} ${t.indexOf(h)===-1?"":"active"}`,children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Thread_QuoteBox",children:[l.jsxs("blockquote",{className:"CommentPlugin_CommentsPanel_List_Thread_Quote",children:["> ",l.jsx("span",{children:f.quote})]}),l.jsx(Ar,{onClick:()=>{d("Delete Thread",b=>l.jsx(eg,{commentOrThread:f,deleteCommentOrThread:n,onClose:b}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),u]}),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List_Thread_Comments",children:f.comments.map(b=>l.jsx(ff,{comment:b,deleteComment:n,thread:f,rtf:p},b.id))}),l.jsx("div",{className:"CommentPlugin_CommentsPanel_List_Thread_Editor",children:l.jsx(vN,{submitAddComment:o,thread:f,placeholder:"Reply to comment..."})})]},h):l.jsx(ff,{comment:f,deleteComment:n,rtf:p},h)})})}function yN({activeIDs:t,deleteCommentOrThread:e,comments:n,submitAddComment:r,markNodeMap:o}){const s=w.useRef(null),i=n.length===0;return l.jsxs("div",{className:"CommentPlugin_CommentsPanel",children:[l.jsx("h2",{className:"CommentPlugin_CommentsPanel_Heading",children:"Comments"}),i?l.jsx("div",{className:"CommentPlugin_CommentsPanel_Empty",children:"No Comments"}):l.jsx(xN,{activeIDs:t,comments:n,deleteCommentOrThread:e,listRef:s,submitAddComment:r,markNodeMap:o})]})}function tg(){const t=cw(),{yjsDocMap:e,name:n}=t;return e.has("comments")?n:"Scripture User"}function _N({providerFactory:t,setCommentStore:e,onChange:n,showCommentsContainerRef:r,commentContainerRef:o,logger:s}){const i=cw(),[a]=ye(),c=w.useMemo(()=>{const F=new lN(a,s);return n&&F.registerOnChange(n),e==null||e(F),F},[a,s,n,e]),u=cN(c),d=w.useMemo(()=>new Map,[]),[p,f]=w.useState(),[h,b]=w.useState([]),[x,C]=w.useState(!1),[E,_]=w.useState(!1),{yjsDocMap:A}=i;w.useEffect(()=>{if(t){const F=t("comments",A);return c.registerCollaboration(F)}return()=>{}},[c,t,A]);const j=w.useCallback(()=>{a.update(()=>{const F=g.$getSelection();F!==null&&(F.dirty=!0)}),C(!1)},[a]),G=w.useCallback((F,$)=>{if(F.type==="comment"){const W=c.deleteCommentOrThread(F,$);if(!W)return;const{markedComment:N,index:M}=W;c.addComment(N,$,M)}else{c.deleteCommentOrThread(F);const W=$!==void 0?$.id:F.id,N=d.get(W);N!==void 0&&setTimeout(()=>{a.update(()=>{for(const M of N){const T=g.$getNodeByKey(M);St(T)&&(T.deleteID(_r,W),T.hasNoIDsForEveryType()&&ym(T))}})})}},[c,a,d]),O=w.useCallback((F,$,W,N)=>{c.addComment(F,W),$&&(a.update(()=>{g.$isRangeSelection(N)&&_m(N,_r,F.id)}),C(!1))},[c,a]);w.useEffect(()=>{const F=[];for(const $ of h){const W=d.get($);if(W!==void 0)for(const N of W){const M=a.getElementByKey(N);M!==null&&(M.classList.add("selected"),F.push(M),_(!0))}}return()=>{for(const $ of F)$.classList.remove("selected")}},[h,a,d]),w.useEffect(()=>{if(!a.hasNodes([Nt]))throw new Error("CommentPlugin: TypedMarkNode not registered on editor!");const F=new Map;return At(Hf(a,Nt,$=>zs($.getTypedIDs()),($,W)=>{for(const[N,M]of Object.entries($.getTypedIDs()))M.forEach(T=>{W.addID(N,T)})}),a.registerMutationListener(Nt,$=>{a.getEditorState().read(()=>{for(const[W,N]of $){const M=g.$getNodeByKey(W);let T=[];N==="destroyed"?T=F.get(W)??[]:St(M)&&(T=M.getTypedIDs()[_r]??[]);for(const L of T){let S=d.get(L);F.set(W,T),N==="destroyed"?S!==void 0&&(S.delete(W),S.size===0&&d.delete(L)):(S===void 0&&(S=new Set,d.set(L,S)),S.has(W)||S.add(W))}}})},{skipInitialization:!1}),a.registerUpdateListener(({editorState:$,tags:W})=>{$.read(()=>{const N=g.$getSelection();let M=!1,T=!1;if(g.$isRangeSelection(N)){const L=N.anchor.getNode();if(g.$isTextNode(L)){const S=y1(L,_r,N.anchor.offset)??[];S!==null&&(b(S),M=!0),N.isCollapsed()||(f(L.getKey()),T=!0)}}M||b(L=>L.length===0?L:[]),T||f(null),!W.has("collaboration")&&g.$isRangeSelection(N)&&C(!1)})}),a.registerCommand(pf,()=>{const $=window.getSelection();return $!==null&&$.removeAllRanges(),C(!0),!0},g.COMMAND_PRIORITY_EDITOR))},[a,d]);const V=()=>{a.dispatchCommand(pf,void 0)};return l.jsxs(l.Fragment,{children:[x&&fn.createPortal(l.jsx(bN,{editor:a,cancelAddComment:j,submitAddComment:O}),document.body),p!=null&&!x&&fn.createPortal(l.jsx(mN,{anchorKey:p,editor:a,showComments:E,onAddComment:V}),document.body),r!==null&&fn.createPortal(l.jsx(Ar,{className:`CommentPlugin_ShowCommentsButton ${E?"active":""}`,onClick:()=>_(!E),title:E?"Hide Comments":"Show Comments",children:l.jsx("i",{className:"comments"})}),(r==null?void 0:r.current)??document.body),E&&fn.createPortal(l.jsx(yN,{comments:u,submitAddComment:O,deleteCommentOrThread:G,activeIDs:h,markNodeMap:d}),(o==null?void 0:o.current)??document.body)]})}function CN(){const t=w.useRef(void 0),e=w.useCallback(n=>{t.current=n},[]);return[t,e]}function EN(t,e){var n,r;const o=((n=e.current)==null?void 0:n.getComments())??[],s=o==null?void 0:o.map(a=>a.id),i=t.map(a=>{const c=s.findIndex(u=>u===a);return c!==void 0&&c>=0?o[c]:{comments:[{author:"unknown",content:"Comment not found",deleted:!1,id:"",timeStamp:0,type:"comment"}],id:a,quote:"",type:"thread"}});o.forEach(a=>{t.includes(a.id)||i.push(a)}),i&&((r=e.current)==null||r.setComments(i))}function kN(t,e){w.useEffect(()=>{var n;t.options??(t.options={}),(n=t.options).nodes??(n.nodes={}),t.options.nodes.addMissingComments=r=>{EN(r,e)}},[e,t])}w.forwardRef(function(t,e){const n=w.useRef(null),r=w.useRef(!0),o=w.useRef(null),[s,i]=w.useState(null),{children:a,onCommentChange:c,onUsjChange:u,showCommentsContainerRef:d,...p}=t,{options:{isReadonly:f}={}}=t,[h,b]=CN();kN(p,h),w.useImperativeHandle(e,()=>({focus(){var E;(E=n.current)==null||E.focus()},undo(){var E;(E=n.current)==null||E.undo()},redo(){var E;(E=n.current)==null||E.redo()},cut(){var E;(E=n.current)==null||E.cut()},copy(){var E;(E=n.current)==null||E.copy()},paste(){var E;(E=n.current)==null||E.paste()},pastePlainText(){var E;(E=n.current)==null||E.pastePlainText()},getUsj(){var E;return(E=n.current)==null?void 0:E.getUsj()},setUsj(E){var _;(_=n.current)==null||_.setUsj(E)},applyUpdate(E,_){var A;(A=n.current)==null||A.applyUpdate(E,_)},replaceEmbedUpdate(E,_){var A;return(A=n.current)==null?void 0:A.replaceEmbedUpdate(E,_)},getSelection(){var E;return(E=n.current)==null?void 0:E.getSelection()},setSelection(E){var _;(_=n.current)==null||_.setSelection(E)},addAnnotation(E,_,A){var j;(j=n.current)==null||j.addAnnotation(E,_,A)},removeAnnotation(E,_){var A;(A=n.current)==null||A.removeAnnotation(E,_)},formatPara(E){var _;(_=n.current)==null||_.formatPara(E)},getElementByKey(E){var _;return(_=n.current)==null?void 0:_.getElementByKey(E)},insertNote(E,_,A){var j;(j=n.current)==null||j.insertNote(E,_,A)},selectNote(E){var _;(_=n.current)==null||_.selectNote(E)},getNoteOps(E){var _;return(_=n.current)==null?void 0:_.getNoteOps(E)},setComments(E){var _;(_=h.current)==null||_.setComments(E),r.current=!0},get toolbarEndRef(){return s}}));const x=w.useCallback((E,_,A,j)=>{var G;if(!u)return;const O=(G=h.current)==null?void 0:G.getComments();u(E,O,_,A,j)},[h,u]),C=w.useCallback(()=>{var E;if(!c||r.current){r.current=!1;return}const _=(E=h.current)==null?void 0:E.getComments();c(_)},[h,r,c]);return w.useEffect(()=>{var E;return i(((E=n.current)==null?void 0:E.toolbarEndRef)??null),()=>i(null)},[]),l.jsxs(Ym,{ref:n,onUsjChange:x,...p,children:[l.jsx(_N,{setCommentStore:b,onChange:C,showCommentsContainerRef:f?null:d??s,commentContainerRef:o,logger:p.logger}),l.jsx("div",{ref:o,className:"comment-container"})]})});function NN({noteOps:t,onSave:e,onClose:n,scrRef:r,noteKey:o,viewOptions:s}){const i=w.useRef(null),a=w.createRef(),c=w.useMemo(()=>({isReadonly:!1,hasSpellCheck:!1,hasExternalUI:!0,textDirection:"auto",nodes:{noteCallerOnClick:(p,f,h,b,x)=>{h||(b()===ao?x(cu):x(ao))}},view:{...s,noteMode:"expanded"}}),[s]);w.useEffect(()=>{var f,h;let p;return t&&!((h=(f=i.current)==null?void 0:f.getUsj())!=null&&h.content)&&(p=setTimeout(()=>{var b,x;(b=i.current)==null||b.setUsj(Gc),(x=i.current)==null||x.applyUpdate(t)},0)),()=>{p&&clearTimeout(p)}},[t,o]);const u=()=>{var f;const p=(f=i.current)==null?void 0:f.getNoteOps(0);p&&e(p)},d=()=>{var f;const p=(f=a.current)==null?void 0:f.getElementsByClassName("editor-input")[0];p!=null&&p.textContent&&navigator.clipboard.writeText(p.textContent)};return l.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[l.jsx(ge,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:l.jsx(se.X,{})}),l.jsx(ge,{onClick:u,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:l.jsx(se.Check,{})})]}),l.jsxs("div",{ref:a,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[l.jsx(iN,{options:c,onScrRefChange:()=>{},scrRef:r,ref:i}),l.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:l.jsx(ge,{onClick:d,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.Copy,{})})})]})]})}function ng(t,e){if(!e||e.length===0)return t??"empty";const n=e.find(o=>typeof o=="string");if(n)return`key-${t??"unknown"}-${n.slice(0,10)}`;const r=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${r}`}function TN(t,e,n=!0,r=void 0){if(!e||e.length===0)return;const o=[],s=[];let i=[];return e.forEach(a=>{typeof a!="string"&&a.marker==="fp"?(i.length>0&&s.push(i),i=[a]):i.push(a)}),i.length>0&&s.push(i),s.map((a,c)=>{const u=c===s.length-1;return l.jsxs("p",{className:"tw-mb-2",children:[Iu(t,a,n,!0,o),u&&r]},ng(t,a))})}function Iu(t,e,n=!0,r=!0,o=[]){if(!(!e||e.length===0))return e.map(s=>{if(typeof s=="string"){const i=`${t}-text-${s.slice(0,10)}`;if(r){const a=K(`usfm_${t}`);return l.jsx("span",{className:a,children:s},i)}return l.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),l.jsx("span",{children:s}),l.jsx(se.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return SN(s,ng(`${t}\\${s.marker}`,[s]),n,[...o,t??"unknown"])})}function SN(t,e,n,r=[]){const{marker:o}=t;return l.jsxs("span",{children:[o?n&&l.jsx("span",{className:"marker",children:`\\${o} `}):l.jsx(se.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Iu(o,t.content,n,!0,[...r,o??"unknown"])]},e)}function rg({footnote:t,layout:e="horizontal",formatCaller:n,showMarkers:r=!0}){const o=n?n(t.caller):t.caller,s=o!==t.caller;let i,a=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...a]=t.content);const c=r?l.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,u=r?l.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,d=l.jsxs(l.Fragment,{children:[o&&l.jsxs("span",{className:K("note-caller",{formatted:s}),children:[o," "]}),i&&l.jsxs(l.Fragment,{children:[Iu(t.marker,[i],r,!1)," "]})]}),h=K(e==="horizontal"?"horizontal tw-table-cell":"vertical",r?"marker-visible":"");return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:K("textual-note-header tw-text-nowrap tw-pr-2",h),children:[c,d]}),l.jsx("div",{className:K("textual-note-body tw-pr-0.5",h),children:a&&a.length>0&&l.jsx(l.Fragment,{children:TN(t.marker,a,r,u)})})]})}const AN=["%webView_footnoteList_header%"],DN=(t,e)=>t[e]??e;function MN({className:t,classNameForItems:e,footnotes:n,layout:r="horizontal",listId:o,selectedFootnote:s,showMarkers:i=!0,suppressFormatting:a=!1,formatCaller:c,onFootnoteSelected:u,localizedStrings:d}){const p=d?DN(d,"%webView_footnoteList_header%"):"Footnotes",f=c??ne.getFormatCallerFunction(n,void 0),h=(A,j)=>{u==null||u(A,j,o)},b=s?n.findIndex(A=>A===s):0,[x,C]=w.useState(b),E=A=>{if(n.length)switch(A.key){case"ArrowDown":A.preventDefault(),C(j=>Math.min(j+1,n.length-1));break;case"ArrowUp":A.preventDefault(),C(j=>Math.max(j-1,0));break;case"Enter":case" ":A.preventDefault(),u==null||u(n[x],x,o);break}},_=w.useRef([]);return w.useEffect(()=>{var A;x>=0&&x<_.current.length&&((A=_.current[x])==null||A.focus())},[x]),l.jsxs(l.Fragment,{children:[r==="vertical"&&l.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:p}),l.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:K("tw-h-full tw-overflow-y-auto",t),onKeyDown:E,children:l.jsx("div",{className:K("tw-p-0.5 tw-pt-1",r==="horizontal"?"tw-table tw-min-w-full":"tw-flex tw-flex-col tw-gap-0.5",!a&&"formatted-font"),children:n.map((A,j)=>{const G=A===s,O=`${o}-${j}`;return l.jsxs(l.Fragment,{children:[l.jsx(Ea,{ref:V=>{_.current[j]=V},role:"option","aria-selected":G,"data-marker":A.marker,"data-state":G?"selected":void 0,tabIndex:-1,className:K("data-[state=selected]:tw-bg-muted",u&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",e),onClick:()=>h(A,j),children:l.jsx(rg,{footnote:A,layout:r,formatCaller:()=>f(A.caller,j),showMarkers:i})},O),j<n.length-1&&r==="vertical"&&l.jsx(Zr,{})]})})})})]})}function RN({occurrenceData:t,setScriptureReference:e,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=w.useMemo(()=>{const i=[];return t.forEach(a=>{i.some(c=>ne.deepEqual(c,a))||i.push(a)}),i},[t]);return l.jsxs(ni,{stickyHeader:!0,children:[l.jsx(ri,{stickyHeader:!0,children:l.jsxs(Gn,{children:[l.jsx(Fo,{children:r}),l.jsx(Fo,{children:o})]})}),l.jsx(oi,{children:s.length>0&&s.map(i=>l.jsxs(Gn,{onClick:()=>{e(i.reference)},children:[l.jsx(Cr,{children:`${$e.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),l.jsx(Cr,{children:i.text})]},`${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Ba=w.forwardRef(({className:t,...e},n)=>l.jsx(Pl.Root,{ref:n,className:K("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:l.jsx(Pl.Indicator,{className:K("tw-flex tw-items-center tw-justify-center tw-text-current"),children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}));Ba.displayName=Pl.Root.displayName;const ds=w.forwardRef(({className:t,type:e,...n},r)=>l.jsx("input",{type:e,className:K("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...n}));ds.displayName="Input";const qa=t=>t==="asc"?l.jsx(se.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?l.jsx(se.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):l.jsx(se.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),ON=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>l.jsxs(ge,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,qa(e.getIsSorted())]})}),jN=(t,e)=>({accessorKey:`item${e}`,accessorFn:n=>n.items[e],header:({column:n})=>l.jsxs(ge,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,qa(n.getIsSorted())]})}),IN=t=>({accessorKey:"count",header:({column:e})=>l.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:l.jsxs(ge,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,qa(e.getIsSorted())]})}),cell:({row:e})=>l.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Rl=(t,e,n,r,o,s)=>{let i=[...n];t.forEach(c=>{e==="approved"?i.includes(c)||i.push(c):i=i.filter(u=>u!==c)}),r(i);let a=[...o];t.forEach(c=>{e==="unapproved"?a.includes(c)||a.push(c):a=a.filter(u=>u!==c)}),s(a)},LN=(t,e,n,r,o)=>({accessorKey:"status",header:({column:s})=>l.jsx("div",{className:"tw-flex tw-justify-center",children:l.jsxs(ge,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,qa(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),a=s.getValue("item");return l.jsxs(Ca,{value:i,variant:"outline",type:"single",children:[l.jsx(Oo,{onClick:c=>{c.stopPropagation(),Rl([a],"approved",e,n,r,o)},value:"approved",children:l.jsx(se.CircleCheckIcon,{})}),l.jsx(Oo,{onClick:c=>{c.stopPropagation(),Rl([a],"unapproved",e,n,r,o)},value:"unapproved",children:l.jsx(se.CircleXIcon,{})}),l.jsx(Oo,{onClick:c=>{c.stopPropagation(),Rl([a],"unknown",e,n,r,o)},value:"unknown",children:l.jsx(se.CircleHelpIcon,{})})]})}}),PN=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),$N=t=>{const e=/^\\[vc]\s+(\d+)/,n=t.match(e);if(n)return+n[1]},FN=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},og=(t,e,n)=>n.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",BN=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),qN=(t,e,n)=>{let r=t;return e!=="all"&&(r=r.filter(o=>e==="approved"&&o.status==="approved"||e==="unapproved"&&o.status==="unapproved"||e==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},UN=(t,e,n)=>{const r=[];return t.forEach(o=>{const s=r.find(i=>ne.deepEqual(i.items,ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(s)s.count+=1,s.occurrences.push({reference:o.verseRef,text:o.verse});else{const i={items:ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:og(ne.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],e,n),occurrences:[{reference:o.verseRef,text:o.verse}]};r.push(i)}}),r},qn=(t,e)=>t[e]??e;function VN({inventoryItems:t,setVerseRef:e,localizedStrings:n,additionalItemsLabels:r,approvedItems:o,unapprovedItems:s,scope:i,onScopeChange:a,columns:c,id:u,areInventoryItemsLoading:d=!1}){const p=qn(n,"%webView_inventory_all%"),f=qn(n,"%webView_inventory_approved%"),h=qn(n,"%webView_inventory_unapproved%"),b=qn(n,"%webView_inventory_unknown%"),x=qn(n,"%webView_inventory_scope_currentBook%"),C=qn(n,"%webView_inventory_scope_chapter%"),E=qn(n,"%webView_inventory_scope_verse%"),_=qn(n,"%webView_inventory_filter_text%"),A=qn(n,"%webView_inventory_show_additional_items%"),j=qn(n,"%webView_inventory_no_results%"),[G,O]=w.useState(!1),[V,F]=w.useState("all"),[$,W]=w.useState(""),[N,M]=w.useState([]),T=w.useMemo(()=>{const J=t??[];return J.length===0?[]:UN(J,o,s)},[t,o,s]),L=w.useMemo(()=>{if(G)return T;const J=[];return T.forEach(ee=>{const te=ee.items[0],Z=J.find(X=>X.items[0]===te);Z?(Z.count+=ee.count,Z.occurrences=Z.occurrences.concat(ee.occurrences)):J.push({items:[te],count:ee.count,occurrences:ee.occurrences,status:ee.status})}),J},[G,T]),S=w.useMemo(()=>L.length===0?[]:qN(L,V,$),[L,V,$]),D=w.useMemo(()=>{var te,Z;if(!G)return c;const J=(te=r==null?void 0:r.tableHeaders)==null?void 0:te.length;if(!J)return c;const ee=[];for(let X=0;X<J;X++)ee.push(jN(((Z=r==null?void 0:r.tableHeaders)==null?void 0:Z[X])||"Additional Item",X+1));return[...ee,...c]},[r==null?void 0:r.tableHeaders,c,G]);w.useEffect(()=>{S.length===0?M([]):S.length===1&&M(S[0].items)},[S]);const P=(J,ee)=>{ee.setRowSelection(()=>{const te={};return te[J.index]=!0,te}),M(J.original.items)},H=J=>{if(J==="book"||J==="chapter"||J==="verse")a(J);else throw new Error(`Invalid scope value: ${J}`)},B=J=>{if(J==="all"||J==="approved"||J==="unapproved"||J==="unknown")F(J);else throw new Error(`Invalid status filter value: ${J}`)},z=w.useMemo(()=>{if(L.length===0||N.length===0)return[];const J=L.filter(ee=>ne.deepEqual(G?ee.items:[ee.items[0]],N));if(J.length>1)throw new Error("Selected item is not unique");return J.length===0?[]:J[0].occurrences},[N,G,L]);return l.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[l.jsxs("div",{className:"tw-flex tw-items-stretch",children:[l.jsxs(eo,{onValueChange:J=>B(J),defaultValue:V,children:[l.jsx(Er,{className:"tw-m-1",children:l.jsx(to,{placeholder:"Select filter"})}),l.jsxs(kr,{children:[l.jsx(cn,{value:"all",children:p}),l.jsx(cn,{value:"approved",children:f}),l.jsx(cn,{value:"unapproved",children:h}),l.jsx(cn,{value:"unknown",children:b})]})]}),l.jsxs(eo,{onValueChange:J=>H(J),defaultValue:i,children:[l.jsx(Er,{className:"tw-m-1",children:l.jsx(to,{placeholder:"Select scope"})}),l.jsxs(kr,{children:[l.jsx(cn,{value:"book",children:x}),l.jsx(cn,{value:"chapter",children:C}),l.jsx(cn,{value:"verse",children:E})]})]}),l.jsx(ds,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:$,onChange:J=>{W(J.target.value)}}),r&&l.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[l.jsx(Ba,{className:"tw-m-1",checked:G,onCheckedChange:J=>{O(J)}}),l.jsx(ht,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??A})]})]}),l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(Ah,{columns:D,data:S,onRowClickHandler:P,stickyHeader:!0,isLoading:d,noResultsMessage:j})}),z.length>0&&l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(RN,{occurrenceData:z,setScriptureReference:e,localizedStrings:n})})]})}const HN="16rem",zN="3rem",sg=w.createContext(void 0);function fi(){const t=w.useContext(sg);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Lu=w.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...a},c)=>{const[u,d]=w.useState(t),p=e??u,f=w.useCallback(A=>{const j=typeof A=="function"?A(p):A;n?n(j):d(j)},[n,p]),h=w.useCallback(()=>f(A=>!A),[f]),b=p?"expanded":"collapsed",E=_t()==="ltr"?i:i==="primary"?"secondary":"primary",_=w.useMemo(()=>({state:b,open:p,setOpen:f,toggleSidebar:h,side:E}),[b,p,f,h,E]);return l.jsx(sg.Provider,{value:_,children:l.jsx(Qs,{delayDuration:0,children:l.jsx("div",{style:{"--sidebar-width":HN,"--sidebar-width-icon":zN,...o},className:K("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...a,children:s})})})});Lu.displayName="SidebarProvider";const Pu=w.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:n,children:r,...o},s)=>{const i=fi();return e==="none"?l.jsx("div",{className:K("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):l.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[l.jsx("div",{className:K("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),l.jsx("div",{className:K("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:l.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});Pu.displayName="Sidebar";const ig=w.forwardRef(({className:t,onClick:e,...n},r)=>{const o=fi();return l.jsxs(ge,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:K("tw-h-7 tw-w-7",t),onClick:s=>{e==null||e(s),o.toggleSidebar()},...n,children:[o.side==="primary"?l.jsx(se.PanelLeft,{}):l.jsx(se.PanelRight,{}),l.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ig.displayName="SidebarTrigger";const ag=w.forwardRef(({className:t,...e},n)=>{const{toggleSidebar:r}=fi();return l.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:K("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ag.displayName="SidebarRail";const $u=w.forwardRef(({className:t,...e},n)=>l.jsx("main",{ref:n,className:K("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));$u.displayName="SidebarInset";const lg=w.forwardRef(({className:t,...e},n)=>l.jsx(ds,{ref:n,"data-sidebar":"input",className:K("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));lg.displayName="SidebarInput";const cg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"header",className:K("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));cg.displayName="SidebarHeader";const ug=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"footer",className:K("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ug.displayName="SidebarFooter";const dg=w.forwardRef(({className:t,...e},n)=>l.jsx(Zr,{ref:n,"data-sidebar":"separator",className:K("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));dg.displayName="SidebarSeparator";const Fu=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"content",className:K("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));Fu.displayName="SidebarContent";const ha=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group",className:K("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));ha.displayName="SidebarGroup";const wa=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Qo.Slot:"div";return l.jsx(o,{ref:r,"data-sidebar":"group-label",className:K("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...n})});wa.displayName="SidebarGroupLabel";const pg=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Qo.Slot:"button";return l.jsx(o,{ref:r,"data-sidebar":"group-action",className:K("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...n})});pg.displayName="SidebarGroupAction";const ma=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group-content",className:K("tw-w-full tw-text-sm",t),...e}));ma.displayName="SidebarGroupContent";const Bu=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu",className:K("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Bu.displayName="SidebarMenu";const qu=w.forwardRef(({className:t,...e},n)=>l.jsx("li",{ref:n,"data-sidebar":"menu-item",className:K("tw-group/menu-item tw-relative",t),...e}));qu.displayName="SidebarMenuItem";const GN=Dr.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Uu=w.forwardRef(({asChild:t=!1,isActive:e=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},a)=>{const c=t?Qo.Slot:"button",{state:u}=fi(),d=l.jsx(c,{ref:a,"data-sidebar":"menu-button","data-size":r,"data-active":e,className:K(GN({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:d}),l.jsx(Zs,{side:"right",align:"center",hidden:u!=="collapsed",...o})]})):d});Uu.displayName="SidebarMenuButton";const fg=w.forwardRef(({className:t,asChild:e=!1,showOnHover:n=!1,...r},o)=>{const s=e?Qo.Slot:"button";return l.jsx(s,{ref:o,"data-sidebar":"menu-action",className:K("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...r})});fg.displayName="SidebarMenuAction";const hg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:K("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));hg.displayName="SidebarMenuBadge";const wg=w.forwardRef(({className:t,showIcon:e=!1,...n},r)=>{const o=w.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return l.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:K("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...n,children:[e&&l.jsx(Yi,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),l.jsx(Yi,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});wg.displayName="SidebarMenuSkeleton";const mg=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:K("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));mg.displayName="SidebarMenuSub";const gg=w.forwardRef(({...t},e)=>l.jsx("li",{ref:e,...t}));gg.displayName="SidebarMenuSubItem";const bg=w.forwardRef(({asChild:t=!1,size:e="md",isActive:n,className:r,...o},s)=>{const i=t?Qo.Slot:"a";return l.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":n,className:K("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});bg.displayName="SidebarMenuSubButton";function vg({id:t,extensionLabels:e,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:a,className:c}){const u=w.useCallback((f,h)=>{r(f,h)},[r]),d=w.useCallback(f=>{const h=n.find(b=>b.projectId===f);return h?h.projectName:f},[n]),p=w.useCallback(f=>!o.projectId&&f===o.label,[o]);return l.jsx(Pu,{id:t,collapsible:"none",variant:"inset",className:K("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:l.jsxs(Fu,{children:[l.jsxs(ha,{children:[l.jsx(wa,{className:"tw-text-sm",children:s}),l.jsx(ma,{children:l.jsx(Bu,{children:Object.entries(e).map(([f,h])=>l.jsx(qu,{children:l.jsx(Uu,{onClick:()=>u(f),isActive:p(f),children:l.jsx("span",{className:"tw-pl-3",children:h})})},f))})})]}),l.jsxs(ha,{children:[l.jsx(wa,{className:"tw-text-sm",children:i}),l.jsx(ma,{className:"tw-pl-3",children:l.jsx(Ki,{buttonVariant:"ghost",buttonClassName:K("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:d,buttonPlaceholder:a,onChange:f=>{const h=d(f);u(h,f)},value:(o==null?void 0:o.projectId)??void 0,icon:l.jsx(se.ScrollText,{})})})]})]})})}const Ua=w.forwardRef(({value:t,onSearch:e,placeholder:n,isFullWidth:r,className:o,isDisabled:s=!1,id:i},a)=>{const c=_t();return l.jsxs("div",{id:i,className:K("tw-relative",{"tw-w-full":r},o),children:[l.jsx(se.Search,{className:K("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":c==="rtl"},{"tw-left-3":c==="ltr"})}),l.jsx(ds,{ref:a,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:t,onChange:u=>e(u.target.value),disabled:s}),t&&l.jsxs(ge,{variant:"ghost",size:"icon",className:K("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":c==="rtl"},{"tw-right-0":c==="ltr"}),onClick:()=>{e("")},children:[l.jsx(se.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ua.displayName="SearchBar";function KN({id:t,extensionLabels:e,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:a,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}){return l.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[l.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:l.jsx(Ua,{className:"tw-w-9/12",value:i,onSearch:a,placeholder:"Search app settings, extension settings, and project settings"})}),l.jsxs(Lu,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[l.jsx(vg,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}),l.jsx($u,{className:"tw-min-w-[215px]",children:r})]})]})}const gr="scrBook",YN="scrRef",Gr="source",WN="details",JN="Scripture Reference",XN="Scripture Book",xg="Type",QN="Details";function ZN(t,e){const n=e??!1;return[{accessorFn:r=>`${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,id:gr,header:(t==null?void 0:t.scriptureReferenceColumnName)??JN,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?$e.bookIdToEnglishName(o.start.book):r.row.groupingColumnId===gr?ne.formatScrRef(o.start):void 0},getGroupingValue:r=>$e.bookIdToNumber(r.start.book),sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>ne.formatScrRef(r.start),id:YN,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:ne.formatScrRef(o.start)},sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:Gr,header:n?(t==null?void 0:t.typeColumnName)??xg:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:WN,header:(t==null?void 0:t.detailsColumnName)??QN,cell:r=>r.getValue(),enableGrouping:!1}]}const eT=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let n=0;return t.end&&({offset:n}=t.end),!t.end||ne.compareScrRefs(t.start,t.end)===0?`${ne.scrRefToBBBCCCVVV(t.start)}+${e}`:`${ne.scrRefToBBBCCCVVV(t.start)}+${e}-${ne.scrRefToBBBCCCVVV(t.end)}+${n}`},hf=t=>`${eT({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function tT({sources:t,showColumnHeaders:e=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:a,id:c}){const[u,d]=w.useState([]),[p,f]=w.useState([{id:gr,desc:!1}]),[h,b]=w.useState({}),x=w.useMemo(()=>t.flatMap($=>$.data.map(W=>({...W,source:$.source}))),[t]),C=w.useMemo(()=>ZN({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);w.useEffect(()=>{u.includes(Gr)?f([{id:Gr,desc:!1},{id:gr,desc:!1}]):f([{id:gr,desc:!1}])},[u]);const E=Ft.useReactTable({data:x,columns:C,state:{grouping:u,sorting:p,rowSelection:h},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:Ft.getExpandedRowModel(),getGroupedRowModel:Ft.getGroupedRowModel(),getCoreRowModel:Ft.getCoreRowModel(),getSortedRowModel:Ft.getSortedRowModel(),getRowId:hf,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});w.useEffect(()=>{if(a){const $=E.getSelectedRowModel().rowsById,W=Object.keys($);if(W.length===1){const N=x.find(M=>hf(M)===W[0])||void 0;N&&a(N)}}},[h,x,a,E]);const _=o??XN,A=s??xg,j=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[gr]},{label:`Group by ${A}`,value:[Gr]},{label:`Group by ${_} and ${A}`,value:[gr,Gr]},{label:`Group by ${A} and ${_}`,value:[Gr,gr]}],G=$=>{d(JSON.parse($))},O=($,W)=>{!$.getIsGrouped()&&!$.getIsSelected()&&$.getToggleSelectedHandler()(W)},V=($,W)=>$.getIsGrouped()?"":K("banded-row",W%2===0?"even":"odd"),F=($,W,N)=>{if(!(($==null?void 0:$.length)===0||W.depth<N.column.getGroupedIndex())){if(W.getIsGrouped())switch(W.depth){case 1:return"tw-ps-4";default:return}switch(W.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return l.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&l.jsxs(eo,{value:JSON.stringify(u),onValueChange:$=>{G($)},children:[l.jsx(Er,{className:"tw-mb-1 tw-mt-2",children:l.jsx(to,{})}),l.jsx(kr,{position:"item-aligned",children:l.jsx(Ch,{children:j.map($=>l.jsx(cn,{value:JSON.stringify($.value),children:$.label},$.label))})})]}),l.jsxs(ni,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&l.jsx(ri,{children:E.getHeaderGroups().map($=>l.jsx(Gn,{children:$.headers.filter(W=>W.column.columnDef.header).map(W=>l.jsx(Fo,{colSpan:W.colSpan,className:"top-0 tw-sticky",children:W.isPlaceholder?void 0:l.jsxs("div",{children:[W.column.getCanGroup()?l.jsx(ge,{variant:"ghost",title:`Toggle grouping by ${W.column.columnDef.header}`,onClick:W.column.getToggleGroupingHandler(),type:"button",children:W.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ft.flexRender(W.column.columnDef.header,W.getContext())]})},W.id))},$.id))}),l.jsx(oi,{children:E.getRowModel().rows.map(($,W)=>{const N=_t();return l.jsx(Gn,{"data-state":$.getIsSelected()?"selected":"",className:K(V($,W)),onClick:M=>O($,M),children:$.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==Gr||!n)))return l.jsx(Cr,{className:K(M.column.columnDef.id,"tw-p-[1px]",F(u,$,M)),children:M.getIsGrouped()?l.jsxs(ge,{variant:"link",onClick:$.getToggleExpandedHandler(),type:"button",children:[$.getIsExpanded()&&l.jsx(se.ChevronDown,{}),!$.getIsExpanded()&&(N==="ltr"?l.jsx(se.ChevronRight,{}):l.jsx(se.ChevronLeft,{}))," ",Ft.flexRender(M.column.columnDef.cell,M.getContext())," (",$.subRows.length,")"]}):Ft.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},$.id)})})]})]})}const Vu=(t,e)=>t.filter(n=>{try{return ne.getSectionForBook(n)===e}catch{return!1}}),yg=(t,e,n)=>Vu(t,e).every(r=>n.includes(r));function nT({section:t,availableBookIds:e,selectedBookIds:n,onToggle:r,localizedStrings:o}){const s=Vu(e,t).length===0,i=o["%scripture_section_ot_short%"],a=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],u=o["%scripture_section_extra_short%"];return l.jsx(ge,{variant:"outline",size:"sm",onClick:()=>r(t),className:K(yg(e,t,n)&&!s&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:s,children:Wb(t,i,a,c,u)})}const wf=5,Ol=6;function rT({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:n,localizedStrings:r,localizedBookNames:o}){const s=r["%webView_book_selector_books_selected%"],i=r["%webView_book_selector_select_books%"],a=r["%webView_book_selector_search_books%"],c=r["%webView_book_selector_select_all%"],u=r["%webView_book_selector_clear_all%"],d=r["%webView_book_selector_no_book_found%"],p=r["%webView_book_selector_more%"],{otLong:f,ntLong:h,dcLong:b,extraLong:x}={otLong:r==null?void 0:r["%scripture_section_ot_long%"],ntLong:r==null?void 0:r["%scripture_section_nt_long%"],dcLong:r==null?void 0:r["%scripture_section_dc_long%"],extraLong:r==null?void 0:r["%scripture_section_extra_long%"]},[C,E]=w.useState(!1),[_,A]=w.useState(""),j=w.useRef(void 0),G=w.useRef(!1);if(t.length!==$e.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=w.useMemo(()=>$e.allBookIds.filter((L,S)=>t[S]==="1"&&!$e.isObsolete($e.bookIdToNumber(L))),[t]),V=w.useMemo(()=>{if(!_.trim()){const D={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return O.forEach(P=>{const H=ne.getSectionForBook(P);D[H].push(P)}),D}const L=O.filter(D=>Sc(D,_,o)),S={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return L.forEach(D=>{const P=ne.getSectionForBook(D);S[P].push(D)}),S},[O,_,o]),F=w.useCallback((L,S=!1)=>{if(!S||!j.current){n(e.includes(L)?e.filter(J=>J!==L):[...e,L]),j.current=L;return}const D=O.findIndex(J=>J===j.current),P=O.findIndex(J=>J===L);if(D===-1||P===-1)return;const[H,B]=[Math.min(D,P),Math.max(D,P)],z=O.slice(H,B+1).map(J=>J);n(e.includes(L)?e.filter(J=>!z.includes(J)):[...new Set([...e,...z])])},[e,n,O]),$=L=>{F(L,G.current),G.current=!1},W=(L,S)=>{L.preventDefault(),F(S,L.shiftKey)},N=w.useCallback(L=>{const S=Vu(O,L).map(D=>D);n(yg(O,L,e)?e.filter(D=>!S.includes(D)):[...new Set([...e,...S])])},[e,n,O]),M=()=>{n(O.map(L=>L))},T=()=>{n([])};return l.jsxs("div",{className:"tw-space-y-2",children:[l.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(ne.Section).map(L=>l.jsx(nT,{section:L,availableBookIds:O,selectedBookIds:e,onToggle:N,localizedStrings:r},L))}),l.jsxs(mo,{open:C,onOpenChange:L=>{E(L),L||A("")},children:[l.jsx(go,{asChild:!0,children:l.jsxs(ge,{variant:"outline",role:"combobox","aria-expanded":C,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${s}: ${e.length}`:i,l.jsx(se.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Rr,{className:"tw-w-full tw-p-0",align:"start",children:l.jsxs(ho,{shouldFilter:!1,onKeyDown:L=>{L.key==="Enter"&&(G.current=L.shiftKey)},children:[l.jsx(es,{placeholder:a,value:_,onValueChange:A}),l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ge,{variant:"ghost",size:"sm",onClick:M,children:c}),l.jsx(ge,{variant:"ghost",size:"sm",onClick:T,children:u})]}),l.jsxs(wo,{children:[l.jsx(Ws,{children:d}),Object.values(ne.Section).map((L,S)=>{const D=V[L];if(D.length!==0)return l.jsxs(w.Fragment,{children:[l.jsx(ir,{heading:Of(L,f,h,b,x),children:D.map(P=>l.jsx(If,{bookId:P,isSelected:e.includes(P),onSelect:()=>$(P),onMouseDown:H=>W(H,P),section:ne.getSectionForBook(P),showCheck:!0,localizedBookNames:o,commandValue:Bl(P,o),className:"tw-flex tw-items-center"},P))}),S<Object.values(ne.Section).length-1&&l.jsx(Nf,{})]},L)})]})]})})]}),e.length>0&&l.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Ol?Ol:wf).map(L=>l.jsx($o,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ro(L,o)},L)),e.length>Ol&&l.jsx($o,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-wf} ${p}`})]})]})}const oT=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Hr=(t,e)=>t[e]??e;function sT({scope:t,availableScopes:e,onScopeChange:n,availableBookInfo:r,selectedBookIds:o,onSelectedBookIdsChange:s,localizedStrings:i,localizedBookNames:a,id:c}){const u=Hr(i,"%webView_scope_selector_selected_text%"),d=Hr(i,"%webView_scope_selector_current_verse%"),p=Hr(i,"%webView_scope_selector_current_chapter%"),f=Hr(i,"%webView_scope_selector_current_book%"),h=Hr(i,"%webView_scope_selector_choose_books%"),b=Hr(i,"%webView_scope_selector_scope%"),x=Hr(i,"%webView_scope_selector_select_books%"),C=[{value:"selectedText",label:u,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],E=e?C.filter(_=>e.includes(_.value)):C;return l.jsxs("div",{id:c,className:"tw-grid tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:b}),l.jsx(xa,{value:t,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:E.map(({value:_,label:A,id:j})=>l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(Ms,{className:"tw-me-2",value:_,id:j}),l.jsx(ht,{htmlFor:j,children:A})]},j))})]}),t==="selectedBooks"&&l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(ht,{children:x}),l.jsx(rT,{availableBookInfo:r,selectedBookIds:o,onChangeSelectedBookIds:s,localizedStrings:i,localizedBookNames:a})]})]})}const jl={[ne.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ne.getLocalizeKeyForScrollGroupId(0)]:"A",[ne.getLocalizeKeyForScrollGroupId(1)]:"B",[ne.getLocalizeKeyForScrollGroupId(2)]:"C",[ne.getLocalizeKeyForScrollGroupId(3)]:"D",[ne.getLocalizeKeyForScrollGroupId(4)]:"E",[ne.getLocalizeKeyForScrollGroupId(5)]:"F",[ne.getLocalizeKeyForScrollGroupId(6)]:"G",[ne.getLocalizeKeyForScrollGroupId(7)]:"H",[ne.getLocalizeKeyForScrollGroupId(8)]:"I",[ne.getLocalizeKeyForScrollGroupId(9)]:"J",[ne.getLocalizeKeyForScrollGroupId(10)]:"K",[ne.getLocalizeKeyForScrollGroupId(11)]:"L",[ne.getLocalizeKeyForScrollGroupId(12)]:"M",[ne.getLocalizeKeyForScrollGroupId(13)]:"N",[ne.getLocalizeKeyForScrollGroupId(14)]:"O",[ne.getLocalizeKeyForScrollGroupId(15)]:"P",[ne.getLocalizeKeyForScrollGroupId(16)]:"Q",[ne.getLocalizeKeyForScrollGroupId(17)]:"R",[ne.getLocalizeKeyForScrollGroupId(18)]:"S",[ne.getLocalizeKeyForScrollGroupId(19)]:"T",[ne.getLocalizeKeyForScrollGroupId(20)]:"U",[ne.getLocalizeKeyForScrollGroupId(21)]:"V",[ne.getLocalizeKeyForScrollGroupId(22)]:"W",[ne.getLocalizeKeyForScrollGroupId(23)]:"X",[ne.getLocalizeKeyForScrollGroupId(24)]:"Y",[ne.getLocalizeKeyForScrollGroupId(25)]:"Z"};function iT({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:n,localizedStrings:r={},size:o="sm",className:s,id:i}){const a={...jl,...Object.fromEntries(Object.entries(r).map(([u,d])=>[u,u===d&&u in jl?jl[u]:d]))},c=_t();return l.jsxs(eo,{value:`${e}`,onValueChange:u=>n(u==="undefined"?void 0:parseInt(u,10)),children:[l.jsx(Er,{size:o,className:K("pr-twp tw-w-auto",s),children:l.jsx(to,{placeholder:a[ne.getLocalizeKeyForScrollGroupId(e)]??e})}),l.jsx(kr,{id:i,align:c==="rtl"?"end":"start",style:{zIndex:250},children:t.map(u=>l.jsx(cn,{value:`${u}`,children:a[ne.getLocalizeKeyForScrollGroupId(u)]},`${u}`))})]})}function aT({children:t}){return l.jsx("div",{className:"pr-twp tw-grid",children:t})}function lT({primary:t,secondary:e,children:n,isLoading:r=!1,loadingMessage:o}){return l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),l.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),r?l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):l.jsx("div",{children:n})]})}function cT({primary:t,secondary:e,includeSeparator:n=!1}){return l.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),n?l.jsx(Zr,{}):""]})}function _g(t,e){var n;return(n=Object.entries(t).find(([,r])=>"menuItem"in r&&r.menuItem===e))==null?void 0:n[0]}function ga({icon:t,menuLabel:e,leading:n}){return t?l.jsx("img",{className:K("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:t,alt:`${n?"Leading":"Trailing"} icon for ${e}`}):void 0}const Cg=(t,e,n,r)=>n?Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order).flatMap(([s])=>e.filter(a=>a.group===s).sort((a,c)=>a.order-c.order).map(a=>l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:"command"in a?l.jsxs(ka,{onClick:()=>{r(a)},children:[a.iconPathBefore&&l.jsx(ga,{icon:a.iconPathBefore,menuLabel:a.label,leading:!0}),a.label,a.iconPathAfter&&l.jsx(ga,{icon:a.iconPathAfter,menuLabel:a.label})]},`dropdown-menu-item-${a.label}-${a.command}`):l.jsxs(xh,{children:[l.jsx(qc,{children:a.label}),l.jsx(vh,{children:l.jsx(Uc,{children:Cg(t,e,_g(t,a.id),r)})})]},`dropdown-menu-sub-${a.label}-${a.id}`)}),a.tooltip&&l.jsx(Zs,{children:a.tooltip})]},`tooltip-${a.label}-${"command"in a?a.command:a.id}`))):void 0;function ba({onSelectMenuItem:t,menuData:e,tabLabel:n,icon:r,className:o,variant:s,buttonVariant:i="ghost",id:a}){return l.jsxs(ns,{variant:s,children:[l.jsx(ei,{"aria-label":n,className:o,asChild:!0,id:a,children:l.jsx(ge,{variant:i,size:"icon",children:r??l.jsx(se.MenuIcon,{})})}),l.jsx(bo,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,c])=>typeof c=="object").sort(([,c],[,u])=>typeof c=="boolean"||typeof u=="boolean"?0:c.order-u.order).map(([c],u,d)=>l.jsxs(w.Fragment,{children:[l.jsx(Bc,{children:l.jsx(Qs,{children:Cg(e.groups,e.items,c,t)})}),u<d.length-1&&l.jsx(ti,{})]},c))})]})}const Eg=w.forwardRef(({id:t,className:e,children:n},r)=>l.jsx("div",{ref:r,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:n}));function uT({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:n,tabViewMenuData:r,id:o,className:s,startAreaChildren:i,centerAreaChildren:a,endAreaChildren:c,menuButtonIcon:u}){return l.jsxs(Eg,{className:`tw-w-full tw-border ${s}`,id:o,children:[n&&l.jsx(ba,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:u??l.jsx(se.Menu,{}),buttonVariant:"ghost"}),i&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),a&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:a}),l.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[r&&l.jsx(ba,{onSelectMenuItem:e,menuData:r,tabLabel:"View Info",icon:l.jsx(se.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}function dT({onSelectProjectMenuItem:t,projectMenuData:e,id:n,className:r,menuButtonIcon:o}){return l.jsx(Eg,{className:"tw-pointer-events-none",id:n,children:e&&l.jsx(ba,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:o,className:`tw-pointer-events-auto tw-shadow-lg ${r}`,buttonVariant:"outline"})})}const Hu=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Jt.Root,{orientation:"vertical",ref:n,className:K("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:r})});Hu.displayName=Jt.List.displayName;const zu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.List,{ref:n,className:K("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));zu.displayName=Jt.List.displayName;const kg=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,...e,className:K("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Gu=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:K("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Gu.displayName=Jt.Content.displayName;function pT({tabList:t,searchValue:e,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s,id:i}){return l.jsxs("div",{id:i,className:"pr-twp",children:[l.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?l.jsx("h1",{children:o}):"",l.jsx(Ua,{className:s,value:e,onSearch:n,placeholder:r})]}),l.jsxs(Hu,{children:[l.jsx(zu,{children:t.map(a=>l.jsx(kg,{value:a.value,children:a.value},a.key))}),t.map(a=>l.jsx(Gu,{value:a.value,children:a.content},a.key))]})]})}function fT({...t}){return l.jsx(Ke.Menu,{...t})}function hT({...t}){return l.jsx(Ke.Sub,{"data-slot":"menubar-sub",...t})}const Ng=w.forwardRef(({className:t,variant:e="default",...n},r)=>{const o=w.useMemo(()=>({variant:e}),[e]);return l.jsx(Fc.Provider,{value:o,children:l.jsx(Ke.Root,{ref:r,className:K("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...n})})});Ng.displayName=Ke.Root.displayName;const Tg=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.Trigger,{ref:n,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ur({variant:r.variant,className:t})),...e})});Tg.displayName=Ke.Trigger.displayName;const Sg=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=On();return l.jsxs(Ke.SubTrigger,{ref:o,className:K("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ur({variant:s.variant,className:t}),t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Sg.displayName=Ke.SubTrigger.displayName;const Ag=w.forwardRef(({className:t,...e},n)=>{const r=On();return l.jsx(Ke.SubContent,{ref:n,className:K("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},t),...e})});Ag.displayName=Ke.SubContent.displayName;const Dg=w.forwardRef(({className:t,align:e="start",alignOffset:n=-4,sideOffset:r=8,...o},s)=>{const i=On();return l.jsx(Ke.Portal,{children:l.jsx(Ke.Content,{ref:s,align:e,alignOffset:n,sideOffset:r,className:K("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...o})})});Dg.displayName=Ke.Content.displayName;const Mg=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=On();return l.jsx(Ke.Item,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ur({variant:o.variant,className:t}),t),...n})});Mg.displayName=Ke.Item.displayName;const wT=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=On();return l.jsxs(Ke.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ur({variant:s.variant,className:t}),t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});wT.displayName=Ke.CheckboxItem.displayName;const mT=w.forwardRef(({className:t,children:e,...n},r)=>{const o=On();return l.jsxs(Ke.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ur({variant:o.variant,className:t}),t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ke.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});mT.displayName=Ke.RadioItem.displayName;const gT=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ke.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));gT.displayName=Ke.Label.displayName;const Rg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ke.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Rg.displayName=Ke.Separator.displayName;const Cs=(t,e)=>{setTimeout(()=>{e.forEach(n=>{var r;(r=t.current)==null||r.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},Og=(t,e,n,r)=>{if(!n)return;const o=Object.entries(t).filter(([s,i])=>"column"in i&&i.column===n||s===n).sort(([,s],[,i])=>s.order-i.order);return o.flatMap(([s],i)=>{const a=e.filter(u=>u.group===s).sort((u,d)=>u.order-d.order).map(u=>l.jsxs(ya,{children:[l.jsx(_a,{asChild:!0,children:"command"in u?l.jsxs(Mg,{onClick:()=>{r(u)},children:[u.iconPathBefore&&l.jsx(ga,{icon:u.iconPathBefore,menuLabel:u.label,leading:!0}),u.label,u.iconPathAfter&&l.jsx(ga,{icon:u.iconPathAfter,menuLabel:u.label})]},`menubar-item-${u.label}-${u.command}`):l.jsxs(hT,{children:[l.jsx(Sg,{children:u.label}),l.jsx(Ag,{children:Og(t,e,_g(t,u.id),r)})]},`menubar-sub-${u.label}-${u.id}`)}),u.tooltip&&l.jsx(Zs,{children:u.tooltip})]},`tooltip-${u.label}-${"command"in u?u.command:u.id}`)),c=[...a];return a.length>0&&i<o.length-1&&c.push(l.jsx(Rg,{},`separator-${s}`)),c})};function bT({menuData:t,onSelectMenuItem:e,onOpenChange:n,variant:r}){const o=w.useRef(void 0),s=w.useRef(void 0),i=w.useRef(void 0),a=w.useRef(void 0),c=w.useRef(void 0),u=d=>{switch(d){case"platform.app":return s;case"platform.window":return i;case"platform.layout":return a;case"platform.help":return c;default:return}};if(kb.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(d,p)=>{var b,x,C,E;d.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":Cs(s,[f]);break;case"alt+p":(b=s.current)==null||b.focus(),Cs(s,[f,h]);break;case"alt+l":(x=i.current)==null||x.focus(),Cs(i,[f,h]);break;case"alt+n":(C=a.current)==null||C.focus(),Cs(a,[f,h]);break;case"alt+h":(E=c.current)==null||E.focus(),Cs(c,[f,h]);break}}),w.useEffect(()=>{if(!n||!o.current)return;const d=new MutationObserver(h=>{h.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const x=b.target.getAttribute("data-state");n(x==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(h=>{d.observe(h,{attributes:!0})}),()=>d.disconnect()},[n]),!!t)return l.jsx(Ng,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:r,children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,p])=>typeof d=="boolean"||typeof p=="boolean"?0:d.order-p.order).map(([d,p])=>l.jsxs(fT,{children:[l.jsx(Tg,{ref:u(d),children:typeof p=="object"&&"label"in p&&p.label}),l.jsx(Dg,{className:"tw-z-[250]",children:l.jsx(Qs,{children:Og(t.groups,t.items,d,e)})})]},d))})}function vT(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function xT({menuData:t,onOpenChange:e,onSelectMenuItem:n,className:r,id:o,children:s,appMenuAreaChildren:i,configAreaChildren:a,shouldUseAsAppDragArea:c,menubarVariant:u="default"}){const d=w.useRef(void 0);return l.jsx("div",{className:K("tw-border tw-px-4 tw-text-foreground",r),ref:d,style:{position:"relative"},id:o,children:l.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[l.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&l.jsx(bT,{menuData:t,onOpenChange:e,onSelectMenuItem:n,variant:u})]})}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:s}),l.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:l.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:a})})]})})}const yT=(t,e)=>t[e]??e;function _T({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:a,id:c}){const u=yT(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[d,p]=w.useState(!1),f=b=>{o&&o(b),r&&r([b,...n.filter(x=>x!==b)]),s&&n.find(x=>x===b)&&s([...n.filter(x=>x!==b)]),p(!1)},h=(b,x)=>{var E,_,A,j,G,O;const C=x!==b?((_=(E=t[b])==null?void 0:E.uiNames)==null?void 0:_[x])??((j=(A=t[b])==null?void 0:A.uiNames)==null?void 0:j.en):void 0;return C?`${(G=t[b])==null?void 0:G.autonym} (${C})`:(O=t[b])==null?void 0:O.autonym};return l.jsxs("div",{id:c,className:K("pr-twp tw-max-w-sm",a),children:[l.jsxs(eo,{name:"uiLanguage",value:e,onValueChange:f,open:d,onOpenChange:b=>p(b),children:[l.jsx(Er,{children:l.jsx(to,{})}),l.jsx(kr,{className:"tw-z-[250]",children:Object.keys(t).map(b=>l.jsx(cn,{value:b,children:h(b,e)},b))})]}),e!=="en"&&l.jsx("div",{className:"tw-pt-3",children:l.jsx(ht,{className:"tw-font-normal tw-text-muted-foreground",children:ne.formatReplacementString(u,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(b=>h(b,e)).join(", "):t.en.autonym})})})]})}function CT({item:t,createLabel:e,createComplexLabel:n}){return e?l.jsx(ht,{children:e(t)}):n?l.jsx(ht,{children:n(t)}):l.jsx(ht,{children:t})}function ET({id:t,className:e,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s,createComplexLabel:i}){return l.jsx("div",{id:t,className:e,children:n.map(a=>l.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[l.jsx(Ba,{className:"tw-me-2 tw-align-middle",checked:r.includes(a),onCheckedChange:c=>o(a,c)}),l.jsx(CT,{item:a,createLabel:s,createComplexLabel:i})]},a))})}function kT({cardKey:t,isSelected:e,onSelect:n,isDenied:r,isHidden:o=!1,className:s,children:i,dropdownContent:a,additionalSelectedContent:c,accentColor:u}){const d=p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),n())};return l.jsxs("div",{hidden:o,onClick:n,onKeyDown:d,role:"button",tabIndex:0,"aria-pressed":e,className:K("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":r&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},s),children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[l.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[l.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&a&&l.jsxs(ns,{children:[l.jsx(ei,{className:K(u&&"tw-me-1"),asChild:!0,children:l.jsx(ge,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(se.MoreHorizontal,{})})}),l.jsx(bo,{align:"end",children:a})]})]}),e&&c&&l.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:c})]}),u&&l.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`})]},t)}const jg=w.forwardRef(({className:t,...e},n)=>l.jsx(se.LoaderCircle,{size:35,className:K("tw-animate-spin",t),...e,ref:n}));jg.displayName="Spinner";function NT({id:t,isDisabled:e=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:a=!1,className:c,defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}){return l.jsxs("div",{className:K("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[l.jsx(ht,{htmlFor:t,className:K({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${a?"*":""}`}),l.jsx(ds,{id:t,disabled:e,placeholder:i,required:a,className:K(c,{"tw-border-red-600":n}),defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}),l.jsx("p",{className:K({"tw-hidden":!o}),children:o})]})}const TT=Dr.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ig=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:K("pr-twp",TT({variant:e}),t),...n}));Ig.displayName="Alert";const Lg=w.forwardRef(({className:t,...e},n)=>l.jsxs("h5",{ref:n,className:K("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Lg.displayName="AlertTitle";const Pg=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:K("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Pg.displayName="AlertDescription";const ST=Ye.Root,AT=Ye.Trigger,DT=Ye.Group,MT=Ye.Portal,RT=Ye.Sub,OT=Ye.RadioGroup,$g=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>l.jsxs(Ye.SubTrigger,{ref:o,className:K("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...r,children:[n,l.jsx(se.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));$g.displayName=Ye.SubTrigger.displayName;const Fg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.SubContent,{ref:n,className:K("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Fg.displayName=Ye.SubContent.displayName;const Bg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Portal,{children:l.jsx(Ye.Content,{ref:n,className:K("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Bg.displayName=Ye.Content.displayName;const qg=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Item,{ref:r,className:K("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...n}));qg.displayName=Ye.Item.displayName;const Ug=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>l.jsxs(Ye.CheckboxItem,{ref:o,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Ug.displayName=Ye.CheckboxItem.displayName;const Vg=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(Ye.RadioItem,{ref:r,className:K("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(se.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Vg.displayName=Ye.RadioItem.displayName;const Hg=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Label,{ref:r,className:K("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...n}));Hg.displayName=Ye.Label.displayName;const zg=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Separator,{ref:n,className:K("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));zg.displayName=Ye.Separator.displayName;function Gg({className:t,...e}){return l.jsx("span",{className:K("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Gg.displayName="ContextMenuShortcut";const Kg=w.createContext({direction:"bottom"});function Yg({shouldScaleBackground:t=!0,direction:e="bottom",...n}){const r=w.useMemo(()=>({direction:e}),[e]);return l.jsx(Kg.Provider,{value:r,children:l.jsx(Rn.Drawer.Root,{shouldScaleBackground:t,direction:e,...n})})}Yg.displayName="Drawer";const jT=Rn.Drawer.Trigger,Wg=Rn.Drawer.Portal,IT=Rn.Drawer.Close,Ku=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Overlay,{ref:n,className:K("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Ku.displayName=Rn.Drawer.Overlay.displayName;const Jg=w.forwardRef(({className:t,children:e,hideDrawerHandle:n=!1,...r},o)=>{const{direction:s="bottom"}=w.useContext(Kg),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},a={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return l.jsxs(Wg,{children:[l.jsx(Ku,{}),l.jsxs(Rn.Drawer.Content,{ref:o,className:K("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",s==="bottom"||s==="top"?"tw-flex-col":"tw-flex-row",i[s],t),...r,children:[!n&&(s==="bottom"||s==="right")&&l.jsx("div",{className:a[s]}),l.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!n&&(s==="top"||s==="left")&&l.jsx("div",{className:a[s]})]})]})});Jg.displayName="DrawerContent";function Xg({className:t,...e}){return l.jsx("div",{className:K("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Xg.displayName="DrawerHeader";function Qg({className:t,...e}){return l.jsx("div",{className:K("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Qg.displayName="DrawerFooter";const Zg=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Title,{ref:n,className:K("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Zg.displayName=Rn.Drawer.Title.displayName;const eb=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Drawer.Description,{ref:n,className:K("tw-text-sm tw-text-muted-foreground",t),...e}));eb.displayName=Rn.Drawer.Description.displayName;const tb=w.forwardRef(({className:t,value:e,...n},r)=>l.jsx($l.Root,{ref:r,className:K("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...n,children:l.jsx($l.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));tb.displayName=$l.Root.displayName;function LT({className:t,...e}){return l.jsx(Cc.PanelGroup,{className:K("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const PT=Cc.Panel;function $T({withHandle:t,className:e,...n}){return l.jsx(Cc.PanelResizeHandle,{className:K("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...n,children:t&&l.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:l.jsx(se.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function FT({...t}){return l.jsx(bf.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const nb=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsxs(Es.Root,{ref:n,className:K("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:r,children:[l.jsx(Es.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:l.jsx(Es.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),l.jsx(Es.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});nb.displayName=Es.Root.displayName;const rb=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Fl.Root,{className:K("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:n,children:l.jsx(Fl.Thumb,{className:K("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});rb.displayName=Fl.Root.displayName;const BT=Jt.Root,ob=w.forwardRef(({className:t,...e},n)=>{const r=_t();return l.jsx(Jt.List,{ref:n,className:K("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:r})});ob.displayName=Jt.List.displayName;const sb=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Trigger,{ref:n,className:K("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));sb.displayName=Jt.Trigger.displayName;const ib=w.forwardRef(({className:t,...e},n)=>l.jsx(Jt.Content,{ref:n,className:K("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));ib.displayName=Jt.Content.displayName;const ab=w.forwardRef(({className:t,...e},n)=>l.jsx("textarea",{className:K("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:n,...e}));ab.displayName="Textarea";const qT=(t,e)=>{w.useEffect(()=>{if(!t)return()=>{};const n=t(e);return()=>{n()}},[t,e])};function UT(t){return{preserveValue:!0,...t}}const lb=(t,e,n={})=>{const r=w.useRef(e);r.current=e;const o=w.useRef(n);o.current=UT(o.current);const[s,i]=w.useState(()=>r.current),[a,c]=w.useState(!0);return w.useEffect(()=>{let u=!0;return c(!!t),(async()=>{if(t){const d=await t();u&&(i(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||i(()=>r.current)}},[t]),[s,a]},Il=()=>!1,VT=(t,e)=>{const[n]=lb(w.useCallback(async()=>{if(!t)return Il;const r=await Promise.resolve(t(e));return async()=>r()},[e,t]),Il,{preserveValue:!1});w.useEffect(()=>()=>{n!==Il&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>bf.toast});exports.Alert=Ig;exports.AlertDescription=Pg;exports.AlertTitle=Lg;exports.Avatar=Pc;exports.AvatarFallback=$c;exports.AvatarImage=bh;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=n0;exports.BOOK_SELECTOR_STRING_KEYS=s0;exports.Badge=$o;exports.BookChapterControl=t0;exports.BookSelectionMode=Ff;exports.BookSelector=i0;exports.Button=ge;exports.COMMENT_LIST_STRING_KEYS=a0;exports.Card=Ea;exports.CardContent=Lc;exports.CardDescription=mh;exports.CardFooter=gh;exports.CardHeader=hh;exports.CardTitle=wh;exports.ChapterRangeSelector=$f;exports.Checkbox=Ba;exports.Checklist=ET;exports.ComboBox=Ki;exports.Command=ho;exports.CommandEmpty=Ws;exports.CommandGroup=ir;exports.CommandInput=es;exports.CommandItem=Mr;exports.CommandList=wo;exports.CommentList=Q0;exports.ContextMenu=ST;exports.ContextMenuCheckboxItem=Ug;exports.ContextMenuContent=Bg;exports.ContextMenuGroup=DT;exports.ContextMenuItem=qg;exports.ContextMenuLabel=Hg;exports.ContextMenuPortal=MT;exports.ContextMenuRadioGroup=OT;exports.ContextMenuRadioItem=Vg;exports.ContextMenuSeparator=zg;exports.ContextMenuShortcut=Gg;exports.ContextMenuSub=RT;exports.ContextMenuSubContent=Fg;exports.ContextMenuSubTrigger=$g;exports.ContextMenuTrigger=AT;exports.DataTable=Ah;exports.Drawer=Yg;exports.DrawerClose=IT;exports.DrawerContent=Jg;exports.DrawerDescription=eb;exports.DrawerFooter=Qg;exports.DrawerHeader=Xg;exports.DrawerOverlay=Ku;exports.DrawerPortal=Wg;exports.DrawerTitle=Zg;exports.DrawerTrigger=jT;exports.DropdownMenu=ns;exports.DropdownMenuCheckboxItem=Na;exports.DropdownMenuContent=bo;exports.DropdownMenuGroup=Bc;exports.DropdownMenuItem=ka;exports.DropdownMenuItemType=Rh;exports.DropdownMenuLabel=Ta;exports.DropdownMenuPortal=vh;exports.DropdownMenuRadioGroup=yh;exports.DropdownMenuRadioItem=Vc;exports.DropdownMenuSeparator=ti;exports.DropdownMenuShortcut=_h;exports.DropdownMenuSub=xh;exports.DropdownMenuSubContent=Uc;exports.DropdownMenuSubTrigger=qc;exports.DropdownMenuTrigger=ei;exports.ERROR_DUMP_STRING_KEYS=Dh;exports.ERROR_POPOVER_STRING_KEYS=iv;exports.ErrorDump=Mh;exports.ErrorPopover=av;exports.FOOTNOTE_LIST_STRING_KEYS=AN;exports.Filter=pv;exports.FilterDropdown=lv;exports.Footer=dv;exports.FootnoteEditor=NN;exports.FootnoteItem=rg;exports.FootnoteList=MN;exports.INVENTORY_STRING_KEYS=BN;exports.Input=ds;exports.Inventory=VN;exports.Label=ht;exports.MarkdownRenderer=sv;exports.MoreInfo=cv;exports.MultiSelectComboBox=Oh;exports.NavigationContentSearch=pT;exports.Popover=mo;exports.PopoverAnchor=Jb;exports.PopoverContent=Rr;exports.PopoverTrigger=go;exports.Progress=tb;exports.RadioGroup=xa;exports.RadioGroupItem=Ms;exports.RecentSearches=Pf;exports.ResizableHandle=$T;exports.ResizablePanel=PT;exports.ResizablePanelGroup=LT;exports.ResultsCard=kT;exports.SCOPE_SELECTOR_STRING_KEYS=oT;exports.ScopeSelector=sT;exports.ScriptureResultsViewer=tT;exports.ScrollGroupSelector=iT;exports.SearchBar=Ua;exports.Select=eo;exports.SelectContent=kr;exports.SelectGroup=Ch;exports.SelectItem=cn;exports.SelectLabel=kh;exports.SelectScrollDownButton=zc;exports.SelectScrollUpButton=Hc;exports.SelectSeparator=Nh;exports.SelectTrigger=Er;exports.SelectValue=to;exports.Separator=Zr;exports.SettingsList=aT;exports.SettingsListHeader=cT;exports.SettingsListItem=lT;exports.SettingsSidebar=vg;exports.SettingsSidebarContentSearch=KN;exports.Sidebar=Pu;exports.SidebarContent=Fu;exports.SidebarFooter=ug;exports.SidebarGroup=ha;exports.SidebarGroupAction=pg;exports.SidebarGroupContent=ma;exports.SidebarGroupLabel=wa;exports.SidebarHeader=cg;exports.SidebarInput=lg;exports.SidebarInset=$u;exports.SidebarMenu=Bu;exports.SidebarMenuAction=fg;exports.SidebarMenuBadge=hg;exports.SidebarMenuButton=Uu;exports.SidebarMenuItem=qu;exports.SidebarMenuSkeleton=wg;exports.SidebarMenuSub=mg;exports.SidebarMenuSubButton=bg;exports.SidebarMenuSubItem=gg;exports.SidebarProvider=Lu;exports.SidebarRail=ag;exports.SidebarSeparator=dg;exports.SidebarTrigger=ig;exports.Skeleton=Yi;exports.Slider=nb;exports.Sonner=FT;exports.Spinner=jg;exports.Switch=rb;exports.TabDropdownMenu=ba;exports.TabFloatingMenu=dT;exports.TabToolbar=uT;exports.Table=ni;exports.TableBody=oi;exports.TableCaption=Sh;exports.TableCell=Cr;exports.TableFooter=Th;exports.TableHead=Fo;exports.TableHeader=ri;exports.TableRow=Gn;exports.Tabs=BT;exports.TabsContent=ib;exports.TabsList=ob;exports.TabsTrigger=sb;exports.TextField=NT;exports.Textarea=ab;exports.ToggleGroup=Ca;exports.ToggleGroupItem=Oo;exports.Toolbar=xT;exports.Tooltip=ya;exports.TooltipContent=Zs;exports.TooltipProvider=Qs;exports.TooltipTrigger=_a;exports.UiLanguageSelector=_T;exports.VerticalTabs=Hu;exports.VerticalTabsContent=Gu;exports.VerticalTabsList=zu;exports.VerticalTabsTrigger=kg;exports.badgeVariants=fh;exports.buttonVariants=Lf;exports.cn=K;exports.getBookIdFromUSFM=FN;exports.getLinesFromUSFM=PN;exports.getNumberFromUSFM=$N;exports.getStatusForItem=og;exports.getToolbarOSReservedSpaceClassName=vT;exports.inventoryCountColumn=IN;exports.inventoryItemColumn=ON;exports.inventoryStatusColumn=LN;exports.selectTriggerVariants=Eh;exports.useEvent=qT;exports.useEventAsync=VT;exports.useListbox=Bf;exports.usePromise=lb;exports.useRecentSearches=Xb;exports.useSidebar=fi;function HT(t,e="top"){if(!t||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),e==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}HT(`*, ::before, ::after {
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
