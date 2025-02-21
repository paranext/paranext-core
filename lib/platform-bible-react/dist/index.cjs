"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("react/jsx-runtime"),g=require("react"),X=require("lucide-react"),ct=require("clsx"),Pl=require("tailwind-merge"),bs=require("@radix-ui/react-dropdown-menu"),J=require("platform-bible-utils"),Jt=require("@radix-ui/react-slot"),Zt=require("class-variance-authority"),Il=require("@radix-ui/react-label"),Ml=require("@radix-ui/react-radio-group"),$l=require("@radix-ui/react-popover"),Pe=require("cmdk"),Al=require("@radix-ui/react-dialog"),Ee=require("@tanstack/react-table"),Dl=require("@radix-ui/react-select"),Bl=require("@radix-ui/react-checkbox"),zl=require("@radix-ui/react-toggle-group"),Vl=require("@radix-ui/react-toggle"),Fl=require("@radix-ui/react-tabs"),Ll=require("@radix-ui/react-separator"),Gl=require("@radix-ui/react-tooltip"),Zr=require("@mui/styled-engine"),Ye=require("@mui/material"),wn=require("react-dom"),Ul=require("@radix-ui/react-menubar"),vs=require("sonner"),ql=require("@radix-ui/react-slider"),Hl=require("@radix-ui/react-switch"),Xl=require("markdown-to-jsx");function Se(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const $=Se(g),fe=Se(bs),xs=Se(Il),Sn=Se(Ml),En=Se($l),Je=Se(Al),ve=Se(Dl),Qr=Se(Bl),pr=Se(zl),ys=Se(Vl),Ie=Se(Fl),Ns=Se(Ll),_n=Se(Gl),Yl=Se(wn),we=Se(Ul),fn=Se(ql),eo=Se(Hl);const Wl=Pl.extendTailwindMerge({prefix:"tw-"});function y(...e){return Wl(ct.clsx(e))}const _t=g.forwardRef(({className:e,type:t,...n},r)=>o.jsx("input",{type:t,className:y("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));_t.displayName="Input";const Kl="layoutDirection";function Ne(){const e=localStorage.getItem(Kl);return e==="rtl"?e:"ltr"}const Jl=g.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,className:a,...s},i)=>{const l=Ne();return o.jsxs("div",{className:"tw-relative",children:[o.jsx(_t,{...s,type:"text",className:y("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",a),onChange:c=>e(c.target.value),onKeyDown:c=>{c.key==="Enter"&&r(),t(c)},onClick:n,ref:i}),o.jsx(X.History,{className:y("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",{"tw-right-3":l==="ltr"},{"tw-left-3 tw-right-auto":l==="rtl"}),onClick:()=>{console.log("back in history")}})]})}),wr=fe.Root,bo=fe.Trigger,js=fe.Group,Zl=fe.Portal,Ql=fe.Sub,ec=fe.RadioGroup,ks=g.forwardRef(({className:e,inset:t,children:n,...r},a)=>o.jsxs(fe.SubTrigger,{ref:a,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,o.jsx(X.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ks.displayName=fe.SubTrigger.displayName;const Ss=g.forwardRef(({className:e,...t},n)=>o.jsx(fe.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));Ss.displayName=fe.SubContent.displayName;const Pn=g.forwardRef(({className:e,sideOffset:t=4,children:n,...r},a)=>{const s=Ne();return o.jsx(fe.Portal,{children:o.jsx(fe.Content,{ref:a,sideOffset:t,className:y("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,children:o.jsx("div",{dir:s,children:n})})})});Pn.displayName=fe.Content.displayName;const vo=g.forwardRef(({className:e,inset:t,...n},r)=>{const a=Ne();return o.jsx(fe.Item,{ref:r,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n,dir:a})});vo.displayName=fe.Item.displayName;const fr=g.forwardRef(({className:e,children:t,checked:n,...r},a)=>o.jsxs(fe.CheckboxItem,{ref:a,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[o.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:o.jsx(fe.ItemIndicator,{children:o.jsx(X.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));fr.displayName=fe.CheckboxItem.displayName;const xo=g.forwardRef(({className:e,children:t,...n},r)=>o.jsxs(fe.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[o.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:o.jsx(fe.ItemIndicator,{children:o.jsx(X.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));xo.displayName=fe.RadioItem.displayName;const Qt=g.forwardRef(({className:e,inset:t,...n},r)=>o.jsx(fe.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Qt.displayName=fe.Label.displayName;const In=g.forwardRef(({className:e,...t},n)=>o.jsx(fe.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));In.displayName=fe.Separator.displayName;function Es({className:e,...t}){return o.jsx("span",{className:y("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}Es.displayName="DropdownMenuShortcut";var tc=Object.defineProperty,nc=(e,t,n)=>t in e?tc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>nc(e,typeof t!="symbol"?t+"":t,n);const kt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],yo=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Cs=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Na=pc();function en(e,t=!0){return t&&(e=e.toUpperCase()),e in Na?Na[e]:0}function No(e){return en(e)>0}function rc(e){const t=typeof e=="string"?en(e):e;return t>=40&&t<=66}function oc(e){return(typeof e=="string"?en(e):e)<=39}function Ts(e){return e<=66}function ac(e){const t=typeof e=="string"?en(e):e;return _s(t)&&!Ts(t)}function*sc(){for(let e=1;e<=kt.length;e++)yield e}const ic=1,Rs=kt.length;function lc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function jo(e,t="***"){const n=e-1;return n<0||n>=kt.length?t:kt[n]}function Os(e){return e<=0||e>Rs?"******":Cs[e-1]}function cc(e){return Os(en(e))}function _s(e){const t=typeof e=="number"?jo(e):e;return No(t)&&!yo.includes(t)}function dc(e){const t=typeof e=="number"?jo(e):e;return No(t)&&yo.includes(t)}function uc(e){return Cs[e-1].includes("*obsolete*")}function pc(){const e={};for(let t=0;t<kt.length;t++)e[kt[t]]=t+1;return e}const se={allBookIds:kt,nonCanonicalIds:yo,bookIdToNumber:en,isBookIdValid:No,isBookNT:rc,isBookOT:oc,isBookOTNT:Ts,isBookDC:ac,allBookNumbers:sc,firstBook:ic,lastBook:Rs,extraBooks:lc,bookNumberToId:jo,bookNumberToEnglishName:Os,bookIdToEnglishName:cc,isCanonical:_s,isExtraMaterial:dc,isObsolete:uc};var We=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(We||{});const $e=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=We[t]):(this._type=t,this.name=We[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne($e,"Original",new $e(We.Original)),ne($e,"Septuagint",new $e(We.Septuagint)),ne($e,"Vulgate",new $e(We.Vulgate)),ne($e,"English",new $e(We.English)),ne($e,"RussianProtestant",new $e(We.RussianProtestant)),ne($e,"RussianOrthodox",new $e(We.RussianOrthodox));let bt=$e;function ja(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ps=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ps||{});const Te=class oe{constructor(t,n,r,a){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&a==null)if(t!=null&&typeof t=="string"){const s=t,i=n!=null&&n instanceof bt?n:void 0;this.setEmpty(i),this.parse(s)}else if(t!=null&&typeof t=="number"){const s=n!=null&&n instanceof bt?n:void 0;this.setEmpty(s),this._verseNum=t%oe.chapterDigitShifter,this._chapterNum=Math.floor(t%oe.bookDigitShifter/oe.chapterDigitShifter),this._bookNum=Math.floor(t/oe.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof oe){const s=t;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(t==null)return;const s=t instanceof bt?t:oe.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(a),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=a??oe.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new oe(t),{success:!0,verseRef:n}}catch(r){if(r instanceof ln)return n=new oe,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%oe.bcvMaxValue*oe.bookDigitShifter+(n>=0?n%oe.bcvMaxValue*oe.chapterDigitShifter:0)+(r>=0?r%oe.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:a,verse:s,versificationStr:i}=t,l=s||a.toString();let c;return i&&(c=new bt(i)),n?new oe(n,r.toString(),l,c):new oe}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let a=0;a<t.length;a++){if(r=t[a],r<"0"||r>"9")return a===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>oe.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(oe.verseRangeSeparator)||this._verse.includes(oe.verseSequenceIndicator))}get book(){return se.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=se.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=oe.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=oe.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>se.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new bt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(oe.verseRangeSeparators,oe.verseSequenceIndicators)}get BBBCCC(){return oe.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return oe.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const s=t.split("/");if(t=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new bt(We[i])}catch{throw new ln("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+t);const r=n[1].split(":"),a=+r[0];if(r.length!==2||se.bookIdToNumber(n[0])===0||!Number.isInteger(a)||a<0||!oe.isVerseParseable(r[1]))throw new ln("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new oe(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof oe?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=oe.verseRangeSeparators,r=oe.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],s=ja(this._verse,r);for(const i of s.map(l=>ja(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(a.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const f=new oe(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||a.push(f)}a.push(d)}}return a}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const a of this.allVerses(!0,t,n)){const s=a.internalValid;if(s!==0)return s;const i=a.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>se.lastBook?2:(se.isCanonical(this._bookNum),0)}setEmpty(t=oe.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=se.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Te,"defaultVersification",bt.English),ne(Te,"verseRangeSeparator","-"),ne(Te,"verseSequenceIndicator",","),ne(Te,"verseRangeSeparators",[Te.verseRangeSeparator]),ne(Te,"verseSequenceIndicators",[Te.verseSequenceIndicator]),ne(Te,"chapterDigitShifter",1e3),ne(Te,"bookDigitShifter",Te.chapterDigitShifter*Te.chapterDigitShifter),ne(Te,"bcvMaxValue",Te.chapterDigitShifter-1),ne(Te,"ValidStatusType",Ps);class ln extends Error{}const wc=g.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:a,bookType:s,children:i},l)=>o.jsxs(vo,{ref:l,textValue:e,className:y("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{a(c)},onFocus:r,onMouseMove:r,children:[o.jsx("span",{className:y("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:se.bookIdToEnglishName(e)}),n&&o.jsx("div",{children:i})]},e));function fc({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:a}){const s=Array.from({length:t},(l,c)=>c+1),i=g.useCallback(l=>{a(l)},[a]);return o.jsx("div",{className:y("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>o.jsx("div",{className:y("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function mc({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return o.jsxs(Qt,{className:"tw-flex tw-justify-between",children:[o.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),o.jsxs("div",{className:"tw-flex tw-items-center",children:[o.jsx(X.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),o.jsx(X.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),o.jsx(X.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const xn=se.allBookIds,hc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ka=["OT","NT","DC"],gc=32+32+32,bc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],vc=e=>({OT:xn.filter(n=>se.isBookOT(n)),NT:xn.filter(n=>se.isBookNT(n)),DC:xn.filter(n=>se.isBookDC(n))})[e],cn=e=>J.getChaptersForBook(se.bookIdToNumber(e));function xc(){return xn.map(t=>se.bookIdToEnglishName(t))}function yc(e){return xc().includes(e)}function Nc(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(yc(t))return xn.find(r=>se.bookIdToEnglishName(r)===t)}function jc({scrRef:e,handleSubmit:t,className:n}){const r=Ne(),[a,s]=g.useState(""),[i,l]=g.useState(se.bookNumberToId(e.bookNum)),[c,d]=g.useState(e.chapterNum??0),[u,f]=g.useState(se.bookNumberToId(e.bookNum)),[w,b]=g.useState(!1),[x,m]=g.useState(w),h=g.useRef(void 0),j=g.useRef(void 0),S=g.useRef(void 0),E=g.useCallback(O=>vc(O).filter(V=>{const A=se.bookIdToEnglishName(V).toLowerCase(),B=a.replace(/[^a-zA-Z]/g,"").toLowerCase();return A.includes(B)||V.toLowerCase().includes(B)}),[a]),k=O=>{s(O)},v=g.useRef(!1),P=g.useCallback(O=>{if(v.current){v.current=!1;return}b(O)},[]),D=g.useCallback((O,V,A,B)=>{if(d(se.bookNumberToId(e.bookNum)!==O?1:e.chapterNum),V||cn(O)===-1){t({bookNum:se.bookIdToNumber(O),chapterNum:A||1,verseNum:B||1}),b(!1),s("");return}l(i!==O?O:""),b(!V)},[t,e.bookNum,e.chapterNum,i]),T=O=>{O<=0||O>cn(i)||D(i,!0,O)},_=g.useCallback(()=>{bc.forEach(O=>{const V=a.match(O);if(V){const[A,B=void 0,q=void 0]=V.slice(1),re=Nc(A);(se.isBookIdValid(A)||re)&&D(re??A,!0,B?parseInt(B,10):1,q?parseInt(q,10):1)}})},[D,a]),L=g.useCallback(O=>{w?(O.key==="ArrowDown"||O.key==="ArrowUp")&&(typeof S<"u"&&S.current!==null?S.current.focus():typeof j<"u"&&j.current!==null&&j.current.focus(),O.preventDefault()):b(!0)},[w]),M=O=>{const{key:V}=O;V==="ArrowRight"||V==="ArrowLeft"||V==="ArrowDown"||V==="ArrowUp"||V==="Enter"||(h.current.dispatchEvent(new KeyboardEvent("keydown",{key:V})),h.current.focus())},ee=O=>{const{key:V}=O;if(u===i){if(V==="Enter"){O.preventDefault(),D(i,!0,c);return}const A=V==="ArrowRight"&&!r||V==="ArrowRight"&&r==="ltr"||V==="ArrowLeft"&&r==="rtl",B=V==="ArrowLeft"&&!r||V==="ArrowLeft"&&r==="ltr"||V==="ArrowRight"&&r==="rtl";let q=0;if(A)if(c<cn(u))q=1;else{O.preventDefault();return}else if(B)if(c>1)q=-1;else{O.preventDefault();return}else V==="ArrowDown"?q=6:V==="ArrowUp"&&(q=-6);c+q<=0||c+q>cn(u)?d(0):q!==0&&(d(c+q),O.preventDefault())}};return g.useEffect(()=>{i===u?i===se.bookNumberToId(e.bookNum)?d(e.chapterNum):d(1):d(0)},[u,e.bookNum,e.chapterNum,i]),g.useLayoutEffect(()=>{m(w)},[w]),g.useLayoutEffect(()=>{const O=setTimeout(()=>{if(x&&j.current&&S.current){const A=S.current.offsetTop-gc;j.current.scrollTo({top:A,behavior:"instant"})}},10);return()=>{clearTimeout(O)}},[x]),o.jsx("div",{className:"pr-twp tw-flex",children:o.jsxs(wr,{modal:!1,open:w,onOpenChange:P,children:[o.jsx(bo,{asChild:!0,children:o.jsx(Jl,{ref:h,value:a,handleSearch:k,handleKeyDown:L,handleOnClick:()=>{l(se.bookNumberToId(e.bookNum)),f(se.bookNumberToId(e.bookNum)),d(e.chapterNum>0?e.chapterNum:0),b(!0),h.current.focus()},onFocus:()=>{v.current=!0},handleSubmit:_,placeholder:`${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`,className:n})}),o.jsx(Pn,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:M,align:r==="ltr"?"start":"end",ref:j,children:o.jsxs("div",{className:"rtl:tw-ps-2",children:[o.jsx(mc,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ka.map((O,V)=>E(O).length>0&&o.jsxs("div",{children:[o.jsx(Qt,{className:"tw-font-semibold tw-text-foreground/80",children:hc[O]}),E(O).map(A=>o.jsx("div",{children:o.jsx(wc,{bookId:A,handleSelectBook:()=>D(A,!1),isSelected:i===A,handleHighlightBook:()=>f(A),handleKeyDown:ee,bookType:O,ref:B=>{i===A&&(S.current=B)},children:o.jsx(fc,{handleSelectChapter:T,endChapter:cn(A),activeChapter:e.bookNum===se.bookIdToNumber(A)?e.chapterNum:0,highlightedChapter:c,handleHighlightedChapter:B=>{d(B)}})})},A)),ka.length-1!==V?o.jsx(In,{}):void 0]},O))]})})]})})}const Is=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=g.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...a},s)=>{const i=r?Jt.Slot:"button";return o.jsx(i,{className:y(Is({variant:t,size:n,className:e})),ref:s,...a})});pe.displayName="Button";const kc=Zt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Re=g.forwardRef(({className:e,...t},n)=>o.jsx(xs.Root,{ref:n,className:y("pr-twp",kc(),e),...t}));Re.displayName=xs.Root.displayName;const ko=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsx(Sn.Root,{className:y("pr-twp tw-grid tw-gap-2",e),...t,ref:n,dir:r})});ko.displayName=Sn.Root.displayName;const rr=g.forwardRef(({className:e,...t},n)=>o.jsx(Sn.Item,{ref:n,className:y("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:o.jsx(Sn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:o.jsx(X.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));rr.displayName=Sn.Item.displayName;const So=En.Root,Eo=En.Trigger,mr=g.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},a)=>{const s=Ne();return o.jsx(En.Portal,{children:o.jsx(En.Content,{ref:a,align:t,sideOffset:n,className:y("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r,dir:s})})});mr.displayName=En.Content.displayName;const Sc=Je.Portal,Ms=g.forwardRef(({className:e,...t},n)=>o.jsx(Je.Overlay,{ref:n,className:y("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));Ms.displayName=Je.Overlay.displayName;const Ec=g.forwardRef(({className:e,children:t,...n},r)=>{const a=Ne();return o.jsxs(Sc,{children:[o.jsx(Ms,{}),o.jsxs(Je.Content,{ref:r,className:y("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,dir:a,children:[t,o.jsxs(Je.Close,{className:y("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[o.jsx(X.X,{className:"tw-h-4 tw-w-4"}),o.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ec.displayName=Je.Content.displayName;const Cc=g.forwardRef(({className:e,...t},n)=>o.jsx(Je.Title,{ref:n,className:y("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));Cc.displayName=Je.Title.displayName;const Tc=g.forwardRef(({className:e,...t},n)=>o.jsx(Je.Description,{ref:n,className:y("tw-text-sm tw-text-muted-foreground",e),...t}));Tc.displayName=Je.Description.displayName;const Co=g.forwardRef(({className:e,...t},n)=>o.jsx(Pe.Command,{ref:n,className:y("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));Co.displayName=Pe.Command.displayName;const To=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[o.jsx(X.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),o.jsx(Pe.Command.Input,{ref:n,className:y("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]})});To.displayName=Pe.Command.Input.displayName;const Ro=g.forwardRef(({className:e,...t},n)=>o.jsx(Pe.Command.List,{ref:n,className:y("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));Ro.displayName=Pe.Command.List.displayName;const Oo=g.forwardRef((e,t)=>o.jsx(Pe.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));Oo.displayName=Pe.Command.Empty.displayName;const $s=g.forwardRef(({className:e,...t},n)=>o.jsx(Pe.Command.Group,{ref:n,className:y("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));$s.displayName=Pe.Command.Group.displayName;const Rc=g.forwardRef(({className:e,...t},n)=>o.jsx(Pe.Command.Separator,{ref:n,className:y("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Rc.displayName=Pe.Command.Separator.displayName;const _o=g.forwardRef(({className:e,...t},n)=>o.jsx(Pe.Command.Item,{ref:n,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));_o.displayName=Pe.Command.Item.displayName;function Oc(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function or({id:e,options:t=[],className:n,buttonClassName:r,popoverContentClassName:a,value:s,onChange:i=()=>{},getOptionLabel:l=Oc,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:f="No option found",buttonVariant:w="outline",alignDropDown:b="start",isDisabled:x=!1,...m}){const[h,j]=g.useState(!1);return o.jsxs(So,{open:h,onOpenChange:j,...m,children:[o.jsx(Eo,{asChild:!0,children:o.jsxs(pe,{variant:w,role:"combobox","aria-expanded":h,id:e,className:y("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:x,children:[o.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&o.jsx("div",{className:"tw-pe-2",children:c}),o.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:s?l(s):d})]}),o.jsx(X.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),o.jsx(mr,{align:b,className:y("tw-w-[200px] tw-p-0",a),children:o.jsxs(Co,{children:[o.jsx(To,{placeholder:u,className:"tw-text-inherit"}),o.jsx(Oo,{children:f}),o.jsx(Ro,{children:t.map(S=>o.jsxs(_o,{value:l(S),onSelect:()=>{i(S),j(!1)},children:[o.jsx(X.Check,{className:y("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(S)})}),l(S)]},l(S)))})]})})]})}function As({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:a=!1,chapterCount:s}){const i=g.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return o.jsxs(o.Fragment,{children:[o.jsx(Re,{htmlFor:"start-chapters-combobox",children:"Chapters"}),o.jsx(or,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),o.jsx(Re,{htmlFor:"end-chapters-combobox",children:"to"}),o.jsx(or,{isDisabled:a,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var Ds=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Ds||{});const _c=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Br=(e,t)=>e[t]??t;function Pc({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:a,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=Br(d,"%webView_bookSelector_currentBook%"),f=Br(d,"%webView_bookSelector_choose%"),w=Br(d,"%webView_bookSelector_chooseBooks%"),[b,x]=g.useState("current book"),m=h=>{x(h),e(h)};return o.jsx(ko,{className:"pr-twp tw-flex",value:b,onValueChange:h=>m(h),children:o.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[o.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[o.jsxs("div",{className:"tw-flex tw-items-center",children:[o.jsx(rr,{value:"current book"}),o.jsx(Re,{className:"tw-ms-1",children:u})]}),o.jsx(Re,{className:"tw-flex tw-items-center",children:t}),o.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:o.jsx(As,{isDisabled:b==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:a,startChapter:l,endChapter:s})})]}),o.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[o.jsxs("div",{className:"tw-flex tw-items-center",children:[o.jsx(rr,{value:"choose books"}),o.jsx(Re,{className:"tw-ms-1",children:w})]}),o.jsx(Re,{className:"tw-flex tw-items-center",children:r.map(h=>se.bookIdToEnglishName(h)).join(", ")}),o.jsx(pe,{disabled:b==="current book",onClick:()=>n(),children:f})]})]})})}function Ic({table:e}){return o.jsxs(wr,{children:[o.jsx(bs.DropdownMenuTrigger,{asChild:!0,children:o.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[o.jsx(X.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),o.jsxs(Pn,{align:"end",className:"tw-w-[150px]",children:[o.jsx(Qt,{children:"Toggle columns"}),o.jsx(In,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>o.jsx(fr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const St=ve.Root,Bs=ve.Group,Et=ve.Value,ut=g.forwardRef(({className:e,children:t,...n},r)=>{const a=Ne();return o.jsxs(ve.Trigger,{ref:r,className:y("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,dir:a,children:[t,o.jsx(ve.Icon,{asChild:!0,children:o.jsx(X.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});ut.displayName=ve.Trigger.displayName;const Po=g.forwardRef(({className:e,...t},n)=>o.jsx(ve.ScrollUpButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:o.jsx(X.ChevronUp,{className:"tw-h-4 tw-w-4"})}));Po.displayName=ve.ScrollUpButton.displayName;const Io=g.forwardRef(({className:e,...t},n)=>o.jsx(ve.ScrollDownButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:o.jsx(X.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Io.displayName=ve.ScrollDownButton.displayName;const pt=g.forwardRef(({className:e,children:t,position:n="popper",...r},a)=>{const s=Ne();return o.jsx(ve.Portal,{children:o.jsxs(ve.Content,{ref:a,className:y("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[o.jsx(Po,{}),o.jsx(ve.Viewport,{className:y("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:o.jsx("div",{dir:s,children:t})}),o.jsx(Io,{})]})})});pt.displayName=ve.Content.displayName;const zs=g.forwardRef(({className:e,...t},n)=>o.jsx(ve.Label,{ref:n,className:y("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));zs.displayName=ve.Label.displayName;const Ae=g.forwardRef(({className:e,children:t,...n},r)=>o.jsxs(ve.Item,{ref:r,className:y("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[o.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:o.jsx(ve.ItemIndicator,{children:o.jsx(X.Check,{className:"tw-h-4 tw-w-4"})})}),o.jsx(ve.ItemText,{children:t})]}));Ae.displayName=ve.Item.displayName;const Vs=g.forwardRef(({className:e,...t},n)=>o.jsx(ve.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Vs.displayName=ve.Separator.displayName;function Mc({table:e}){return o.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:o.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[o.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),o.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[o.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),o.jsxs(St,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[o.jsx(ut,{className:"tw-h-8 tw-w-[70px]",children:o.jsx(Et,{placeholder:e.getState().pagination.pageSize})}),o.jsx(pt,{side:"top",children:[10,20,30,40,50].map(t=>o.jsx(Ae,{value:`${t}`,children:t},t))})]})]}),o.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),o.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[o.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[o.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),o.jsx(X.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),o.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[o.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),o.jsx(X.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),o.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[o.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),o.jsx(X.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),o.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[o.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),o.jsx(X.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Mn=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>o.jsx("div",{className:y("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:o.jsx("table",{ref:r,className:y("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));Mn.displayName="Table";const $n=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>o.jsx("thead",{ref:r,className:y({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));$n.displayName="TableHeader";const An=g.forwardRef(({className:e,...t},n)=>o.jsx("tbody",{ref:n,className:y("[&_tr:last-child]:tw-border-0",e),...t}));An.displayName="TableBody";const Fs=g.forwardRef(({className:e,...t},n)=>o.jsx("tfoot",{ref:n,className:y("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Fs.displayName="TableFooter";const nt=g.forwardRef(({className:e,...t},n)=>o.jsx("tr",{ref:n,className:y("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));nt.displayName="TableRow";const Ut=g.forwardRef(({className:e,...t},n)=>o.jsx("th",{ref:n,className:y("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ut.displayName="TableHead";const Ct=g.forwardRef(({className:e,...t},n)=>o.jsx("td",{ref:n,className:y("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Ct.displayName="TableCell";const Ls=g.forwardRef(({className:e,...t},n)=>o.jsx("caption",{ref:n,className:y("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Ls.displayName="TableCaption";function Gs({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:a=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var h;const[l,c]=g.useState([]),[d,u]=g.useState([]),[f,w]=g.useState({}),[b,x]=g.useState({}),m=Ee.useReactTable({data:t,columns:e,getCoreRowModel:Ee.getCoreRowModel(),...n&&{getPaginationRowModel:Ee.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ee.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Ee.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:f,rowSelection:b}});return o.jsxs("div",{className:"pr-twp",children:[a&&o.jsx(Ic,{table:m}),o.jsxs(Mn,{stickyHeader:s,children:[o.jsx($n,{stickyHeader:s,children:m.getHeaderGroups().map(j=>o.jsx(nt,{children:j.headers.map(S=>o.jsx(Ut,{children:S.isPlaceholder?void 0:Ee.flexRender(S.column.columnDef.header,S.getContext())},S.id))},j.id))}),o.jsx(An,{children:(h=m.getRowModel().rows)!=null&&h.length?m.getRowModel().rows.map(j=>o.jsx(nt,{onClick:()=>i(j,m),"data-state":j.getIsSelected()&&"selected",children:j.getVisibleCells().map(S=>o.jsx(Ct,{children:Ee.flexRender(S.column.columnDef.cell,S.getContext())},S.id))},j.id)):o.jsx(nt,{children:o.jsx(Ct,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&o.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[o.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.previousPage(),disabled:!m.getCanPreviousPage(),children:"Previous"}),o.jsx(pe,{variant:"outline",size:"sm",onClick:()=>m.nextPage(),disabled:!m.getCanNextPage(),children:"Next"})]}),n&&r&&o.jsx(Mc,{table:m})]})}function $c({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],a=n["%webView_inventory_occurrences_table_header_occurrence%"],s=g.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>J.deepEqual(c,l))||i.push(l)}),i},[e]);return o.jsxs(Mn,{stickyHeader:!0,children:[o.jsx($n,{stickyHeader:!0,children:o.jsxs(nt,{children:[o.jsx(Ut,{children:r}),o.jsx(Ut,{children:a})]})}),o.jsx(An,{children:s.length>0&&s.map(i=>o.jsxs(nt,{onClick:()=>{t(i.reference)},children:[o.jsx(Ct,{children:`${se.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),o.jsx(Ct,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const hr=g.forwardRef(({className:e,...t},n)=>o.jsx(Qr.Root,{ref:n,className:y("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:o.jsx(Qr.Indicator,{className:y("tw-flex tw-items-center tw-justify-center tw-text-current"),children:o.jsx(X.Check,{className:"tw-h-4 tw-w-4"})})}));hr.displayName=Qr.Root.displayName;const Us=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),to=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},qs=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?se.bookIdToNumber(t[1]):0},Hs=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Xs=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ac=g.forwardRef(({className:e,variant:t,size:n,...r},a)=>o.jsx(ys.Root,{ref:a,className:y(Xs({variant:t,size:n,className:e})),...r}));Ac.displayName=ys.Root.displayName;const Ys=g.createContext({size:"default",variant:"default"}),Mo=g.forwardRef(({className:e,variant:t,size:n,children:r,...a},s)=>{const i=Ne();return o.jsx(pr.Root,{ref:s,className:y("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...a,dir:i,children:o.jsx(Ys.Provider,{value:{variant:t,size:n},children:r})})});Mo.displayName=pr.Root.displayName;const yn=g.forwardRef(({className:e,children:t,variant:n,size:r,...a},s)=>{const i=g.useContext(Ys);return o.jsx(pr.Item,{ref:s,className:y(Xs({variant:i.variant||n,size:i.size||r}),e),...a,children:t})});yn.displayName=pr.Item.displayName;const gr=e=>e==="asc"?o.jsx(X.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?o.jsx(X.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):o.jsx(X.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Dc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>o.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,gr(t.getIsSorted())]})}),Bc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>o.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,gr(n.getIsSorted())]})}),zc=e=>({accessorKey:"count",header:({column:t})=>o.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:o.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,gr(t.getIsSorted())]})}),cell:({row:t})=>o.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),zr=(e,t,n,r,a,s)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...a];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Vc=(e,t,n,r,a)=>({accessorKey:"status",header:({column:s})=>o.jsx("div",{className:"tw-flex tw-justify-center",children:o.jsxs(pe,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[e,gr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return o.jsxs(Mo,{value:i,variant:"outline",type:"single",children:[o.jsx(yn,{onClick:()=>zr([l],"approved",t,n,r,a),value:"approved",children:o.jsx(X.CircleCheckIcon,{})}),o.jsx(yn,{onClick:()=>zr([l],"unapproved",t,n,r,a),value:"unapproved",children:o.jsx(X.CircleXIcon,{})}),o.jsx(yn,{onClick:()=>zr([l],"unknown",t,n,r,a),value:"unknown",children:o.jsx(X.CircleHelpIcon,{})})]})}}),Fc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Lc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(a=>t==="approved"&&a.status==="approved"||t==="unapproved"&&a.status==="unapproved"||t==="unknown"&&a.status==="unknown")),n!==""&&(r=r.filter(a=>a.items[0].includes(n))),r},Gc=(e,t,n,r,a)=>{if(!e)return[];const s=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Us(e).forEach(u=>{u.startsWith("\\id")&&(i=qs(u),l=0,c=0),u.startsWith("\\c")&&(l=to(u),c=0),u.startsWith("\\v")&&(c=to(u),l===0&&(l=t.chapterNum));let f=a.exec(u)??void 0;for(;f;){const w=[];f.forEach(h=>w.push(h));const b=f.index,x=s.find(h=>J.deepEqual(h.items,w)),m={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:J.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(x)x.count+=1,x.occurrences.push(m);else{const h={items:w,count:1,status:Hs(w[0],n,r),occurrences:[m]};s.push(h)}f=a.exec(u)??void 0}}),s},tt=(e,t)=>e[t]??t;function Uc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:a,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const f=tt(n,"%webView_inventory_all%"),w=tt(n,"%webView_inventory_approved%"),b=tt(n,"%webView_inventory_unapproved%"),x=tt(n,"%webView_inventory_unknown%"),m=tt(n,"%webView_inventory_scope_currentBook%"),h=tt(n,"%webView_inventory_scope_chapter%"),j=tt(n,"%webView_inventory_scope_verse%"),S=tt(n,"%webView_inventory_filter_text%"),E=tt(n,"%webView_inventory_show_additional_items%"),[k,v]=g.useState(!1),[P,D]=g.useState("all"),[T,_]=g.useState(""),[L,M]=g.useState([]),ee=g.useMemo(()=>l?r instanceof RegExp?Gc(l,e,s,i,r):r(l,e,s,i):[],[l,r,e,s,i]),O=g.useMemo(()=>{if(k)return ee;const N=[];return ee.forEach(C=>{const G=C.items[0],U=N.find(F=>F.items[0]===G);U?(U.count+=C.count,U.occurrences=U.occurrences.concat(C.occurrences)):N.push({items:[G],count:C.count,occurrences:C.occurrences,status:C.status})}),N},[k,ee]),V=g.useMemo(()=>Lc(O,P,T),[O,P,T]),A=g.useMemo(()=>{var G,U;if(!k)return u;const N=(G=a==null?void 0:a.tableHeaders)==null?void 0:G.length;if(!N)return u;const C=[];for(let F=0;F<N;F++)C.push(Bc(((U=a==null?void 0:a.tableHeaders)==null?void 0:U[F])||"Additional Item",F+1));return[...C,...u]},[a==null?void 0:a.tableHeaders,u,k]);g.useEffect(()=>{M([])},[V]);const B=(N,C)=>{C.setRowSelection(()=>{const G={};return G[N.index]=!0,G}),M(N.original.items)},q=N=>{if(N==="book"||N==="chapter"||N==="verse")d(N);else throw new Error(`Invalid scope value: ${N}`)},re=N=>{if(N==="all"||N==="approved"||N==="unapproved"||N==="unknown")D(N);else throw new Error(`Invalid status filter value: ${N}`)},ae=g.useMemo(()=>{if(O.length===0||L.length===0)return[];const N=O.filter(C=>J.deepEqual(k?C.items:[C.items[0]],L));if(N.length>1)throw new Error("Selected item is not unique");return N[0].occurrences},[L,k,O]);return o.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[o.jsxs("div",{className:"tw-flex tw-items-stretch",children:[o.jsxs(St,{onValueChange:N=>re(N),defaultValue:P,children:[o.jsx(ut,{className:"tw-m-1",children:o.jsx(Et,{placeholder:"Select filter"})}),o.jsxs(pt,{children:[o.jsx(Ae,{value:"all",children:f}),o.jsx(Ae,{value:"approved",children:w}),o.jsx(Ae,{value:"unapproved",children:b}),o.jsx(Ae,{value:"unknown",children:x})]})]}),o.jsxs(St,{onValueChange:N=>q(N),defaultValue:c,children:[o.jsx(ut,{className:"tw-m-1",children:o.jsx(Et,{placeholder:"Select scope"})}),o.jsxs(pt,{children:[o.jsx(Ae,{value:"book",children:m}),o.jsx(Ae,{value:"chapter",children:h}),o.jsx(Ae,{value:"verse",children:j})]})]}),o.jsx(_t,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:T,onChange:N=>{_(N.target.value)}}),a&&o.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[o.jsx(hr,{className:"tw-m-1",checked:k,onCheckedChange:N=>{M([]),v(N)}}),o.jsx(Re,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??E})]})]}),o.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:o.jsx(Gs,{columns:A,data:V,onRowClickHandler:B,stickyHeader:!0})}),ae.length>0&&o.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:o.jsx($c,{occurrenceData:ae,setScriptureReference:t,localizedStrings:n})})]})}function Ws({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:a,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,f]=g.useState(!1),w=g.useCallback(m=>{var j;const h=(j=e.find(S=>S.label===m))==null?void 0:j.value;h&&r(n.includes(h)?n.filter(S=>S!==h):[...n,h])},[e,n,r]),b=()=>i||a,x=g.useMemo(()=>{if(!l)return e;const m=e.filter(j=>j.starred).sort((j,S)=>j.label.localeCompare(S.label)),h=e.filter(j=>!j.starred).sort((j,S)=>{const E=n.includes(j.value),k=n.includes(S.value);return E&&!k?-1:!E&&k?1:j.label.localeCompare(S.label)});return[...m,...h]},[e,n,l]);return o.jsx("div",{className:d,children:o.jsxs(So,{open:u,onOpenChange:f,children:[o.jsx(Eo,{asChild:!0,children:o.jsxs(pe,{variant:"ghost",role:"combobox","aria-expanded":u,className:y("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary","tw-group"),children:[o.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[o.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:o.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),o.jsx("div",{className:y({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===e.length}),children:o.jsx("div",{className:"tw-font-normal",children:b()})})]}),o.jsx(X.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),o.jsx(mr,{align:"start",className:"tw-w-full tw-p-0",children:o.jsxs(Co,{children:[o.jsx(To,{placeholder:`Search ${a.toLowerCase()}...`}),o.jsxs(Ro,{children:[o.jsx(Oo,{children:s}),o.jsx($s,{children:x.map(m=>{const h=t?t(m):void 0;return o.jsxs(_o,{value:m.label,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[o.jsx("div",{className:"w-4",children:o.jsx(X.Check,{className:y("tw-h-4 tw-w-4",n.includes(m.value)?"tw-opacity-100":"tw-opacity-0")})}),o.jsx("div",{className:"tw-w-4",children:m.starred&&o.jsx(X.Star,{className:"tw-h-4 tw-w-4"})}),o.jsx("div",{className:"tw-flex-grow",children:m.label}),t&&o.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:h})]},m.label)})})]})]})})]})})}function $o({value:e,onSearch:t,placeholder:n,isFullWidth:r,className:a}){const s=Ne();return o.jsxs("div",{className:y("tw-relative",{"tw-w-full":r},a),children:[o.jsx(X.Search,{className:y("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":s==="rtl"},{"tw-left-3":s==="ltr"})}),o.jsx(_t,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:e,onChange:i=>t(i.target.value)}),e&&o.jsxs(pe,{variant:"ghost",size:"icon",className:y("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":s==="rtl"},{"tw-right-0":s==="ltr"}),onClick:()=>{t("")},children:[o.jsx(X.X,{className:"tw-h-4 tw-w-4"}),o.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const Ao=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsx(Ie.Root,{orientation:"vertical",ref:n,className:y("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t,dir:r})});Ao.displayName=Ie.List.displayName;const Do=g.forwardRef(({className:e,...t},n)=>o.jsx(Ie.List,{ref:n,className:y("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Do.displayName=Ie.List.displayName;const Ks=g.forwardRef(({className:e,...t},n)=>o.jsx(Ie.Trigger,{ref:n,...t,className:y("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),Bo=g.forwardRef(({className:e,...t},n)=>o.jsx(Ie.Content,{ref:n,className:y("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Bo.displayName=Ie.Content.displayName;function qc({tabList:e,searchValue:t,onSearch:n,searchPlaceholder:r,headerTitle:a,searchClassName:s}){return o.jsxs("div",{className:"pr-twp",children:[o.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?o.jsx("h1",{children:a}):"",o.jsx($o,{className:s,value:t,onSearch:n,placeholder:r})]}),o.jsxs(Ao,{children:[o.jsx(Do,{children:e.map(i=>o.jsx(Ks,{value:i.value,children:i.value},i.key))}),e.map(i=>o.jsx(Bo,{value:i.value,children:i.content},i.key))]})]})}const br=g.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},a)=>o.jsx(Ns.Root,{ref:a,decorative:n,orientation:t,className:y("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));br.displayName=Ns.Root.displayName;function Sa({className:e,...t}){return o.jsx("div",{className:y("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...t})}const Hc=_n.Provider,Xc=_n.Root,Yc=_n.Trigger,Js=g.forwardRef(({className:e,sideOffset:t=4,...n},r)=>o.jsx(_n.Content,{ref:r,sideOffset:t,className:y("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n}));Js.displayName=_n.Content.displayName;const Wc="16rem",Kc="3rem",Zs=g.createContext(void 0);function vr(){const e=g.useContext(Zs);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Qs=g.forwardRef(({defaultOpen:e=!0,open:t,onOpenChange:n,className:r,style:a,children:s,side:i="primary",...l},c)=>{const[d,u]=g.useState(e),f=t??d,w=g.useCallback(E=>{const k=typeof E=="function"?E(f):E;n?n(k):u(k)},[n,f]),b=g.useCallback(()=>w(E=>!E),[w]),x=f?"expanded":"collapsed",j=Ne()==="ltr"?i:i==="primary"?"secondary":"primary",S=g.useMemo(()=>({state:x,open:f,setOpen:w,toggleSidebar:b,side:j}),[x,f,w,b,j]);return o.jsx(Zs.Provider,{value:S,children:o.jsx(Hc,{delayDuration:0,children:o.jsx("div",{style:{"--sidebar-width":Wc,"--sidebar-width-icon":Kc,...a},className:y("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});Qs.displayName="SidebarProvider";const ei=g.forwardRef(({variant:e="sidebar",collapsible:t="offcanvas",className:n,children:r,...a},s)=>{const i=vr();return t==="none"?o.jsx("div",{className:y("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...a,children:r}):o.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?t:"","data-variant":e,"data-side":i.side,children:[o.jsx("div",{className:y("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),o.jsx("div",{className:y("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...a,children:o.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});ei.displayName="Sidebar";const Jc=g.forwardRef(({className:e,onClick:t,...n},r)=>{const a=vr();return o.jsxs(pe,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:y("tw-h-7 tw-w-7",e),onClick:s=>{t==null||t(s),a.toggleSidebar()},...n,children:[a.side==="primary"?o.jsx(X.PanelLeft,{}):o.jsx(X.PanelRight,{}),o.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Jc.displayName="SidebarTrigger";const Zc=g.forwardRef(({className:e,...t},n)=>{const{toggleSidebar:r}=vr();return o.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:y("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...t})});Zc.displayName="SidebarRail";const ti=g.forwardRef(({className:e,...t},n)=>o.jsx("main",{ref:n,className:y("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...t}));ti.displayName="SidebarInset";const Qc=g.forwardRef(({className:e,...t},n)=>o.jsx(_t,{ref:n,"data-sidebar":"input",className:y("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...t}));Qc.displayName="SidebarInput";const ed=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"header",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));ed.displayName="SidebarHeader";const td=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"footer",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...t}));td.displayName="SidebarFooter";const nd=g.forwardRef(({className:e,...t},n)=>o.jsx(br,{ref:n,"data-sidebar":"separator",className:y("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...t}));nd.displayName="SidebarSeparator";const ni=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"content",className:y("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...t}));ni.displayName="SidebarContent";const no=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"group",className:y("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...t}));no.displayName="SidebarGroup";const ro=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const a=t?Jt.Slot:"div";return o.jsx(a,{ref:r,"data-sidebar":"group-label",className:y("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...n})});ro.displayName="SidebarGroupLabel";const rd=g.forwardRef(({className:e,asChild:t=!1,...n},r)=>{const a=t?Jt.Slot:"button";return o.jsx(a,{ref:r,"data-sidebar":"group-action",className:y("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...n})});rd.displayName="SidebarGroupAction";const oo=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"group-content",className:y("tw-w-full tw-text-sm",e),...t}));oo.displayName="SidebarGroupContent";const ri=g.forwardRef(({className:e,...t},n)=>o.jsx("ul",{ref:n,"data-sidebar":"menu",className:y("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...t}));ri.displayName="SidebarMenu";const oi=g.forwardRef(({className:e,...t},n)=>o.jsx("li",{ref:n,"data-sidebar":"menu-item",className:y("tw-group/menu-item tw-relative",e),...t}));oi.displayName="SidebarMenuItem";const od=Zt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),ai=g.forwardRef(({asChild:e=!1,isActive:t=!1,variant:n="default",size:r="default",tooltip:a,className:s,...i},l)=>{const c=e?Jt.Slot:"button",{state:d}=vr(),u=o.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":t,className:y(od({variant:n,size:r}),s),...i});return a?(typeof a=="string"&&(a={children:a}),o.jsxs(Xc,{children:[o.jsx(Yc,{asChild:!0,children:u}),o.jsx(Js,{side:"right",align:"center",hidden:d!=="collapsed",...a})]})):u});ai.displayName="SidebarMenuButton";const ad=g.forwardRef(({className:e,asChild:t=!1,showOnHover:n=!1,...r},a)=>{const s=t?Jt.Slot:"button";return o.jsx(s,{ref:a,"data-sidebar":"menu-action",className:y("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...r})});ad.displayName="SidebarMenuAction";const sd=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:y("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));sd.displayName="SidebarMenuBadge";const id=g.forwardRef(({className:e,showIcon:t=!1,...n},r)=>{const a=g.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return o.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:y("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...n,children:[t&&o.jsx(Sa,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),o.jsx(Sa,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});id.displayName="SidebarMenuSkeleton";const ld=g.forwardRef(({className:e,...t},n)=>o.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:y("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...t}));ld.displayName="SidebarMenuSub";const cd=g.forwardRef(({...e},t)=>o.jsx("li",{ref:t,...e}));cd.displayName="SidebarMenuSubItem";const dd=g.forwardRef(({asChild:e=!1,size:t="md",isActive:n,className:r,...a},s)=>{const i=e?Jt.Slot:"a";return o.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":t,"data-active":n,className:y("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",t==="sm"&&"tw-text-xs",t==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...a})});dd.displayName="SidebarMenuSubButton";function si({id:e,extensionLabels:t,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:a,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l}){const c=g.useCallback((f,w)=>{r(f,w)},[r]),d=g.useCallback(f=>{const w=n.find(b=>b.projectId===f);return w?w.projectName:f},[n]),u=g.useCallback(f=>!a.projectId&&f===a.label,[a]);return o.jsx(ei,{id:e,collapsible:"none",variant:"inset",className:"tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",children:o.jsxs(ni,{children:[o.jsxs(no,{children:[o.jsx(ro,{className:"tw-text-sm tw-text-gray-400",children:s}),o.jsx(oo,{children:o.jsx(ri,{children:t.map(f=>o.jsx(oi,{children:o.jsx(ai,{className:y("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":u(f)}),onClick:()=>c(f),isActive:u(f),children:o.jsx("span",{className:"tw-pl-3",children:f})})},f))})})]}),o.jsxs(no,{children:[o.jsx(ro,{className:"tw-text-sm tw-text-gray-400",children:i}),o.jsx(oo,{className:"tw-pl-3",children:o.jsx(or,{popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:f=>d(f),buttonPlaceholder:l,onChange:f=>{const w=d(f);c(w,f)},value:(a==null?void 0:a.projectId)??void 0})})]})]})})}function ud({id:e,extensionLabels:t,projectInfo:n,children:r,handleSelectSidebarItem:a,selectedSidebarItem:s,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return o.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3",children:[o.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:o.jsx($o,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),o.jsxs(Qs,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto",children:[o.jsx(si,{extensionLabels:t,projectInfo:n,handleSelectSidebarItem:a,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),o.jsx(ti,{className:"tw-overflow-y-auto",children:r})]})]})}const lt="scrBook",pd="scrRef",vt="source",wd="details",fd="Scripture Reference",md="Scripture Book",ii="Type",hd="Details";function gd(e,t){const n=t??!1;return[{accessorFn:r=>`${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:lt,header:(e==null?void 0:e.scriptureReferenceColumnName)??fd,cell:r=>{const a=r.row.original;return r.row.getIsGrouped()?se.bookNumberToEnglishName(a.start.bookNum):r.row.groupingColumnId===lt?J.formatScrRef(a.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,a)=>J.compareScrRefs(r.original.start,a.original.start),enableGrouping:!0},{accessorFn:r=>J.formatScrRef(r.start),id:pd,header:void 0,cell:r=>{const a=r.row.original;return r.row.getIsGrouped()?void 0:J.formatScrRef(a.start)},sortingFn:(r,a)=>J.compareScrRefs(r.original.start,a.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:vt,header:n?(e==null?void 0:e.typeColumnName)??ii:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,a)=>r.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:wd,header:(e==null?void 0:e.detailsColumnName)??hd,cell:r=>r.getValue(),enableGrouping:!1}]}const bd=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||J.compareScrRefs(e.start,e.end)===0?`${J.scrRefToBBBCCCVVV(e.start)}+${t}`:`${J.scrRefToBBBCCCVVV(e.start)}+${t}-${J.scrRefToBBBCCCVVV(e.end)}+${n}`},Ea=e=>`${bd({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function vd({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:a,typeColumnName:s,detailsColumnName:i,onRowSelected:l}){const[c,d]=g.useState([]),[u,f]=g.useState([{id:lt,desc:!1}]),[w,b]=g.useState({}),x=g.useMemo(()=>e.flatMap(T=>T.data.map(_=>({..._,source:T.source}))),[e]),m=g.useMemo(()=>gd({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);g.useEffect(()=>{c.includes(vt)?f([{id:vt,desc:!1},{id:lt,desc:!1}]):f([{id:lt,desc:!1}])},[c]);const h=Ee.useReactTable({data:x,columns:m,state:{grouping:c,sorting:u,rowSelection:w},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:Ee.getExpandedRowModel(),getGroupedRowModel:Ee.getGroupedRowModel(),getCoreRowModel:Ee.getCoreRowModel(),getSortedRowModel:Ee.getSortedRowModel(),getRowId:Ea,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});g.useEffect(()=>{if(l){const T=h.getSelectedRowModel().rowsById,_=Object.keys(T);if(_.length===1){const L=x.find(M=>Ea(M)===_[0])||void 0;L&&l(L)}}},[w,x,l,h]);const j=a??md,S=s??ii,E=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[lt]},{label:`Group by ${S}`,value:[vt]},{label:`Group by ${j} and ${S}`,value:[lt,vt]},{label:`Group by ${S} and ${j}`,value:[vt,lt]}],k=T=>{d(JSON.parse(T))},v=(T,_)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(_)},P=(T,_)=>T.getIsGrouped()?"":y("banded-row",_%2===0?"even":"odd"),D=(T,_,L)=>{if(!((T==null?void 0:T.length)===0||_.depth<L.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return o.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&o.jsxs(St,{value:JSON.stringify(c),onValueChange:T=>{k(T)},children:[o.jsx(ut,{className:"tw-mb-1 tw-mt-2",children:o.jsx(Et,{})}),o.jsx(pt,{position:"item-aligned",children:o.jsx(Bs,{children:E.map(T=>o.jsx(Ae,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),o.jsxs(Mn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&o.jsx($n,{children:h.getHeaderGroups().map(T=>o.jsx(nt,{children:T.headers.filter(_=>_.column.columnDef.header).map(_=>o.jsx(Ut,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:o.jsxs("div",{children:[_.column.getCanGroup()?o.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ee.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},T.id))}),o.jsx(An,{children:h.getRowModel().rows.map((T,_)=>{const L=Ne();return o.jsx(nt,{"data-state":T.getIsSelected()?"selected":"",className:y(P(T,_)),onClick:M=>v(T,M),children:T.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==vt||!n)))return o.jsx(Ct,{className:y(M.column.columnDef.id,"tw-p-[1px]",D(c,T,M)),children:(()=>M.getIsGrouped()?o.jsxs(pe,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&o.jsx(X.ChevronDown,{}),!T.getIsExpanded()&&(L==="ltr"?o.jsx(X.ChevronRight,{}):o.jsx(X.ChevronLeft,{}))," ",Ee.flexRender(M.column.columnDef.cell,M.getContext())," (",T.subRows.length,")"]}):Ee.flexRender(M.column.columnDef.cell,M.getContext()))()},M.id)})},T.id)})})]})]})}const Vr={[J.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[J.getLocalizeKeyForScrollGroupId(0)]:"A",[J.getLocalizeKeyForScrollGroupId(1)]:"B",[J.getLocalizeKeyForScrollGroupId(2)]:"C",[J.getLocalizeKeyForScrollGroupId(3)]:"D",[J.getLocalizeKeyForScrollGroupId(4)]:"E",[J.getLocalizeKeyForScrollGroupId(5)]:"F",[J.getLocalizeKeyForScrollGroupId(6)]:"G",[J.getLocalizeKeyForScrollGroupId(7)]:"H",[J.getLocalizeKeyForScrollGroupId(8)]:"I",[J.getLocalizeKeyForScrollGroupId(9)]:"J",[J.getLocalizeKeyForScrollGroupId(10)]:"K",[J.getLocalizeKeyForScrollGroupId(11)]:"L",[J.getLocalizeKeyForScrollGroupId(12)]:"M",[J.getLocalizeKeyForScrollGroupId(13)]:"N",[J.getLocalizeKeyForScrollGroupId(14)]:"O",[J.getLocalizeKeyForScrollGroupId(15)]:"P",[J.getLocalizeKeyForScrollGroupId(16)]:"Q",[J.getLocalizeKeyForScrollGroupId(17)]:"R",[J.getLocalizeKeyForScrollGroupId(18)]:"S",[J.getLocalizeKeyForScrollGroupId(19)]:"T",[J.getLocalizeKeyForScrollGroupId(20)]:"U",[J.getLocalizeKeyForScrollGroupId(21)]:"V",[J.getLocalizeKeyForScrollGroupId(22)]:"W",[J.getLocalizeKeyForScrollGroupId(23)]:"X",[J.getLocalizeKeyForScrollGroupId(24)]:"Y",[J.getLocalizeKeyForScrollGroupId(25)]:"Z"};function xd({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={},className:a}){const s={...Vr,...Object.fromEntries(Object.entries(r).map(([l,c])=>[l,l===c&&l in Vr?Vr[l]:c]))},i=Ne();return o.jsxs(St,{value:`${t}`,onValueChange:l=>n(l==="undefined"?void 0:parseInt(l,10)),children:[o.jsx(ut,{className:y("pr-twp tw-w-auto",a),children:o.jsx(Et,{placeholder:s[J.getLocalizeKeyForScrollGroupId(t)]??t})}),o.jsx(pt,{align:i==="rtl"?"end":"start",style:{zIndex:250},children:e.map(l=>o.jsx(Ae,{value:`${l}`,children:s[J.getLocalizeKeyForScrollGroupId(l)]},`${l}`))})]})}function yd({children:e}){return o.jsx("div",{className:"pr-twp tw-grid",children:e})}function Nd({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:a}){return o.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[o.jsxs("div",{children:[o.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),o.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?o.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):o.jsx("div",{children:n})]})}function jd({primary:e,secondary:t,includeSeparator:n=!1}){return o.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[o.jsxs("div",{children:[o.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),o.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?o.jsx(br,{}):""]})}function kd({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:a,createLabel:s}){return o.jsx("div",{id:e,className:t,children:n.map(i=>o.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[o.jsx(hr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>a(i,l)}),o.jsx(Re,{children:s?s(i):i})]},i))})}function Sd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ed(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}),n}var zo={},li={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(li);var Cd=li.exports,Fr={};function Vo(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},R.apply(this,arguments)}function Nt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ci(e){if(!Nt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=ci(e[n])}),t}function rt(e,t,n={clone:!0}){const r=n.clone?R({},e):e;return Nt(e)&&Nt(t)&&Object.keys(t).forEach(a=>{a!=="__proto__"&&(Nt(t[a])&&a in e&&Nt(e[a])?r[a]=rt(e[a],t[a],n):n.clone?r[a]=Nt(t[a])?ci(t[a]):t[a]:r[a]=t[a])}),r}var ao={exports:{}},Xn={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca;function Td(){if(Ca)return ie;Ca=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,a=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,j=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(v){if(typeof v=="object"&&v!==null){var P=v.$$typeof;switch(P){case t:switch(v=v.type,v){case c:case d:case r:case s:case a:case f:return v;default:switch(v=v&&v.$$typeof,v){case l:case u:case x:case b:case i:return v;default:return P}}case n:return P}}}function k(v){return E(v)===d}return ie.AsyncMode=c,ie.ConcurrentMode=d,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=u,ie.Fragment=r,ie.Lazy=x,ie.Memo=b,ie.Portal=n,ie.Profiler=s,ie.StrictMode=a,ie.Suspense=f,ie.isAsyncMode=function(v){return k(v)||E(v)===c},ie.isConcurrentMode=k,ie.isContextConsumer=function(v){return E(v)===l},ie.isContextProvider=function(v){return E(v)===i},ie.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===t},ie.isForwardRef=function(v){return E(v)===u},ie.isFragment=function(v){return E(v)===r},ie.isLazy=function(v){return E(v)===x},ie.isMemo=function(v){return E(v)===b},ie.isPortal=function(v){return E(v)===n},ie.isProfiler=function(v){return E(v)===s},ie.isStrictMode=function(v){return E(v)===a},ie.isSuspense=function(v){return E(v)===f},ie.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===d||v===s||v===a||v===f||v===w||typeof v=="object"&&v!==null&&(v.$$typeof===x||v.$$typeof===b||v.$$typeof===i||v.$$typeof===l||v.$$typeof===u||v.$$typeof===h||v.$$typeof===j||v.$$typeof===S||v.$$typeof===m)},ie.typeOf=E,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ta;function Rd(){return Ta||(Ta=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,a=e?Symbol.for("react.strict_mode"):60108,s=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,j=e?Symbol.for("react.responder"):60118,S=e?Symbol.for("react.scope"):60119;function E(I){return typeof I=="string"||typeof I=="function"||I===r||I===d||I===s||I===a||I===f||I===w||typeof I=="object"&&I!==null&&(I.$$typeof===x||I.$$typeof===b||I.$$typeof===i||I.$$typeof===l||I.$$typeof===u||I.$$typeof===h||I.$$typeof===j||I.$$typeof===S||I.$$typeof===m)}function k(I){if(typeof I=="object"&&I!==null){var je=I.$$typeof;switch(je){case t:var z=I.type;switch(z){case c:case d:case r:case s:case a:case f:return z;default:var ye=z&&z.$$typeof;switch(ye){case l:case u:case x:case b:case i:return ye;default:return je}}case n:return je}}}var v=c,P=d,D=l,T=i,_=t,L=u,M=r,ee=x,O=b,V=n,A=s,B=a,q=f,re=!1;function ae(I){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),N(I)||k(I)===c}function N(I){return k(I)===d}function C(I){return k(I)===l}function G(I){return k(I)===i}function U(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function F(I){return k(I)===u}function K(I){return k(I)===r}function Y(I){return k(I)===x}function W(I){return k(I)===b}function H(I){return k(I)===n}function Z(I){return k(I)===s}function Q(I){return k(I)===a}function ue(I){return k(I)===f}le.AsyncMode=v,le.ConcurrentMode=P,le.ContextConsumer=D,le.ContextProvider=T,le.Element=_,le.ForwardRef=L,le.Fragment=M,le.Lazy=ee,le.Memo=O,le.Portal=V,le.Profiler=A,le.StrictMode=B,le.Suspense=q,le.isAsyncMode=ae,le.isConcurrentMode=N,le.isContextConsumer=C,le.isContextProvider=G,le.isElement=U,le.isForwardRef=F,le.isFragment=K,le.isLazy=Y,le.isMemo=W,le.isPortal=H,le.isProfiler=Z,le.isStrictMode=Q,le.isSuspense=ue,le.isValidElementType=E,le.typeOf=k}()),le}var Ra;function di(){return Ra||(Ra=1,process.env.NODE_ENV==="production"?Xn.exports=Td():Xn.exports=Rd()),Xn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Lr,Oa;function Od(){if(Oa)return Lr;Oa=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function a(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Lr=a()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Lr}var Gr,_a;function Fo(){if(_a)return Gr;_a=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Gr=e,Gr}var Ur,Pa;function ui(){return Pa||(Pa=1,Ur=Function.call.bind(Object.prototype.hasOwnProperty)),Ur}var qr,Ia;function _d(){if(Ia)return qr;Ia=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Fo(),n={},r=ui();e=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function a(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var f;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}f=s[u](i,u,c,l,null,t)}catch(x){f=x}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return a.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},qr=a,qr}var Hr,Ma;function Pd(){if(Ma)return Hr;Ma=1;var e=di(),t=Od(),n=Fo(),r=ui(),a=_d(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Hr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function f(N){var C=N&&(d&&N[d]||N[u]);if(typeof C=="function")return C}var w="<<anonymous>>",b={array:j("array"),bigint:j("bigint"),bool:j("boolean"),func:j("function"),number:j("number"),object:j("object"),string:j("string"),symbol:j("symbol"),any:S(),arrayOf:E,element:k(),elementType:v(),instanceOf:P,node:L(),objectOf:T,oneOf:D,oneOfType:_,shape:ee,exact:O};function x(N,C){return N===C?N!==0||1/N===1/C:N!==N&&C!==C}function m(N,C){this.message=N,this.data=C&&typeof C=="object"?C:{},this.stack=""}m.prototype=Error.prototype;function h(N){if(process.env.NODE_ENV!=="production")var C={},G=0;function U(K,Y,W,H,Z,Q,ue){if(H=H||w,Q=Q||W,ue!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var je=H+":"+W;!C[je]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+H+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),C[je]=!0,G++)}}return Y[W]==null?K?Y[W]===null?new m("The "+Z+" `"+Q+"` is marked as required "+("in `"+H+"`, but its value is `null`.")):new m("The "+Z+" `"+Q+"` is marked as required in "+("`"+H+"`, but its value is `undefined`.")):null:N(Y,W,H,Z,Q)}var F=U.bind(null,!1);return F.isRequired=U.bind(null,!0),F}function j(N){function C(G,U,F,K,Y,W){var H=G[U],Z=B(H);if(Z!==N){var Q=q(H);return new m("Invalid "+K+" `"+Y+"` of type "+("`"+Q+"` supplied to `"+F+"`, expected ")+("`"+N+"`."),{expectedType:N})}return null}return h(C)}function S(){return h(i)}function E(N){function C(G,U,F,K,Y){if(typeof N!="function")return new m("Property `"+Y+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var W=G[U];if(!Array.isArray(W)){var H=B(W);return new m("Invalid "+K+" `"+Y+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an array."))}for(var Z=0;Z<W.length;Z++){var Q=N(W,Z,F,K,Y+"["+Z+"]",n);if(Q instanceof Error)return Q}return null}return h(C)}function k(){function N(C,G,U,F,K){var Y=C[G];if(!l(Y)){var W=B(Y);return new m("Invalid "+F+" `"+K+"` of type "+("`"+W+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return h(N)}function v(){function N(C,G,U,F,K){var Y=C[G];if(!e.isValidElementType(Y)){var W=B(Y);return new m("Invalid "+F+" `"+K+"` of type "+("`"+W+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return h(N)}function P(N){function C(G,U,F,K,Y){if(!(G[U]instanceof N)){var W=N.name||w,H=ae(G[U]);return new m("Invalid "+K+" `"+Y+"` of type "+("`"+H+"` supplied to `"+F+"`, expected ")+("instance of `"+W+"`."))}return null}return h(C)}function D(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function C(G,U,F,K,Y){for(var W=G[U],H=0;H<N.length;H++)if(x(W,N[H]))return null;var Z=JSON.stringify(N,function(ue,I){var je=q(I);return je==="symbol"?String(I):I});return new m("Invalid "+K+" `"+Y+"` of value `"+String(W)+"` "+("supplied to `"+F+"`, expected one of "+Z+"."))}return h(C)}function T(N){function C(G,U,F,K,Y){if(typeof N!="function")return new m("Property `"+Y+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var W=G[U],H=B(W);if(H!=="object")return new m("Invalid "+K+" `"+Y+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an object."));for(var Z in W)if(r(W,Z)){var Q=N(W,Z,F,K,Y+"."+Z,n);if(Q instanceof Error)return Q}return null}return h(C)}function _(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var C=0;C<N.length;C++){var G=N[C];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+re(G)+" at index "+C+"."),i}function U(F,K,Y,W,H){for(var Z=[],Q=0;Q<N.length;Q++){var ue=N[Q],I=ue(F,K,Y,W,H,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&Z.push(I.data.expectedType)}var je=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new m("Invalid "+W+" `"+H+"` supplied to "+("`"+Y+"`"+je+"."))}return h(U)}function L(){function N(C,G,U,F,K){return V(C[G])?null:new m("Invalid "+F+" `"+K+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return h(N)}function M(N,C,G,U,F){return new m((N||"React class")+": "+C+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function ee(N){function C(G,U,F,K,Y){var W=G[U],H=B(W);if(H!=="object")return new m("Invalid "+K+" `"+Y+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));for(var Z in N){var Q=N[Z];if(typeof Q!="function")return M(F,K,Y,Z,q(Q));var ue=Q(W,Z,F,K,Y+"."+Z,n);if(ue)return ue}return null}return h(C)}function O(N){function C(G,U,F,K,Y){var W=G[U],H=B(W);if(H!=="object")return new m("Invalid "+K+" `"+Y+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));var Z=t({},G[U],N);for(var Q in Z){var ue=N[Q];if(r(N,Q)&&typeof ue!="function")return M(F,K,Y,Q,q(ue));if(!ue)return new m("Invalid "+K+" `"+Y+"` key `"+Q+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(N),null,"  "));var I=ue(W,Q,F,K,Y+"."+Q,n);if(I)return I}return null}return h(C)}function V(N){switch(typeof N){case"number":case"string":case"undefined":return!0;case"boolean":return!N;case"object":if(Array.isArray(N))return N.every(V);if(N===null||l(N))return!0;var C=f(N);if(C){var G=C.call(N),U;if(C!==N.entries){for(;!(U=G.next()).done;)if(!V(U.value))return!1}else for(;!(U=G.next()).done;){var F=U.value;if(F&&!V(F[1]))return!1}}else return!1;return!0;default:return!1}}function A(N,C){return N==="symbol"?!0:C?C["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&C instanceof Symbol:!1}function B(N){var C=typeof N;return Array.isArray(N)?"array":N instanceof RegExp?"object":A(C,N)?"symbol":C}function q(N){if(typeof N>"u"||N===null)return""+N;var C=B(N);if(C==="object"){if(N instanceof Date)return"date";if(N instanceof RegExp)return"regexp"}return C}function re(N){var C=q(N);switch(C){case"array":case"object":return"an "+C;case"boolean":case"date":case"regexp":return"a "+C;default:return C}}function ae(N){return!N.constructor||!N.constructor.name?w:N.constructor.name}return b.checkPropTypes=a,b.resetWarningCache=a.resetWarningCache,b.PropTypes=b,b},Hr}var Xr,$a;function Id(){if($a)return Xr;$a=1;var e=Fo();function t(){}function n(){}return n.resetWarningCache=t,Xr=function(){function r(i,l,c,d,u,f){if(f!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function a(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:a,element:r,elementType:r,instanceOf:a,node:r,objectOf:a,oneOf:a,oneOfType:a,shape:a,exact:a,checkPropTypes:n,resetWarningCache:t};return s.PropTypes=s,s},Xr}if(process.env.NODE_ENV!=="production"){var Md=di(),$d=!0;ao.exports=Pd()(Md.isElement,$d)}else ao.exports=Id()();var Ad=ao.exports;const p=Sd(Ad);function Dd(e){const{prototype:t={}}=e;return!!t.isReactComponent}function pi(e,t,n,r,a){const s=e[t],i=a||t;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Dd(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const wi=Vo(p.element,pi);wi.isRequired=Vo(p.element.isRequired,pi);const fi=wi,Bd="exact-prop: ​";function zd(e){return process.env.NODE_ENV==="production"?e:R({},e,{[Bd]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function qt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var so={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Aa;function Vd(){if(Aa)return ce;Aa=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function m(h){if(typeof h=="object"&&h!==null){var j=h.$$typeof;switch(j){case e:switch(h=h.type,h){case n:case a:case r:case d:case u:return h;default:switch(h=h&&h.$$typeof,h){case l:case i:case c:case w:case f:case s:return h;default:return j}}case t:return j}}}return ce.ContextConsumer=i,ce.ContextProvider=s,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=w,ce.Memo=f,ce.Portal=t,ce.Profiler=a,ce.StrictMode=r,ce.Suspense=d,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(h){return m(h)===i},ce.isContextProvider=function(h){return m(h)===s},ce.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ce.isForwardRef=function(h){return m(h)===c},ce.isFragment=function(h){return m(h)===n},ce.isLazy=function(h){return m(h)===w},ce.isMemo=function(h){return m(h)===f},ce.isPortal=function(h){return m(h)===t},ce.isProfiler=function(h){return m(h)===a},ce.isStrictMode=function(h){return m(h)===r},ce.isSuspense=function(h){return m(h)===d},ce.isSuspenseList=function(h){return m(h)===u},ce.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===n||h===a||h===r||h===d||h===u||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===w||h.$$typeof===f||h.$$typeof===s||h.$$typeof===i||h.$$typeof===c||h.$$typeof===x||h.getModuleId!==void 0)},ce.typeOf=m,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Da;function Fd(){return Da||(Da=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),x=!1,m=!1,h=!1,j=!1,S=!1,E;E=Symbol.for("react.module.reference");function k(z){return!!(typeof z=="string"||typeof z=="function"||z===n||z===a||S||z===r||z===d||z===u||j||z===b||x||m||h||typeof z=="object"&&z!==null&&(z.$$typeof===w||z.$$typeof===f||z.$$typeof===s||z.$$typeof===i||z.$$typeof===c||z.$$typeof===E||z.getModuleId!==void 0))}function v(z){if(typeof z=="object"&&z!==null){var ye=z.$$typeof;switch(ye){case e:var qe=z.type;switch(qe){case n:case a:case r:case d:case u:return qe;default:var mt=qe&&qe.$$typeof;switch(mt){case l:case i:case c:case w:case f:case s:return mt;default:return ye}}case t:return ye}}}var P=i,D=s,T=e,_=c,L=n,M=w,ee=f,O=t,V=a,A=r,B=d,q=u,re=!1,ae=!1;function N(z){return re||(re=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function C(z){return ae||(ae=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(z){return v(z)===i}function U(z){return v(z)===s}function F(z){return typeof z=="object"&&z!==null&&z.$$typeof===e}function K(z){return v(z)===c}function Y(z){return v(z)===n}function W(z){return v(z)===w}function H(z){return v(z)===f}function Z(z){return v(z)===t}function Q(z){return v(z)===a}function ue(z){return v(z)===r}function I(z){return v(z)===d}function je(z){return v(z)===u}de.ContextConsumer=P,de.ContextProvider=D,de.Element=T,de.ForwardRef=_,de.Fragment=L,de.Lazy=M,de.Memo=ee,de.Portal=O,de.Profiler=V,de.StrictMode=A,de.Suspense=B,de.SuspenseList=q,de.isAsyncMode=N,de.isConcurrentMode=C,de.isContextConsumer=G,de.isContextProvider=U,de.isElement=F,de.isForwardRef=K,de.isFragment=Y,de.isLazy=W,de.isMemo=H,de.isPortal=Z,de.isProfiler=Q,de.isStrictMode=ue,de.isSuspense=I,de.isSuspenseList=je,de.isValidElementType=k,de.typeOf=v}()),de}process.env.NODE_ENV==="production"?so.exports=Vd():so.exports=Fd();var Ba=so.exports;const Ld=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Gd(e){const t=`${e}`.match(Ld);return t&&t[1]||""}function mi(e,t=""){return e.displayName||e.name||Gd(e)||t}function za(e,t,n){const r=mi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Ud(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return mi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Ba.ForwardRef:return za(e,e.render,"ForwardRef");case Ba.Memo:return za(e,e.type,"memo");default:return}}}function Cn(e,t,n,r,a){if(process.env.NODE_ENV==="production")return null;const s=e[t],i=a||t;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const qd=p.oneOfType([p.func,p.object]),hi=qd;function Ze(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":qt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Hd(...e){return e.reduce((t,n)=>n==null?t:function(...a){t.apply(this,a),n.apply(this,a)},()=>{})}function Xd(e,t=166){let n;function r(...a){const s=()=>{e.apply(this,a)};clearTimeout(n),n=setTimeout(s,t)}return r.clear=()=>{clearTimeout(n)},r}function Yd(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,a,s,i)=>{const l=a||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Wd(e,t){var n,r;return $.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function ar(e){return e&&e.ownerDocument||document}function Kd(e){return ar(e).defaultView||window}function Jd(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?R({},t.propTypes):null;return a=>(s,i,l,c,d,...u)=>{const f=d||i,w=n==null?void 0:n[f];if(w){const b=w(s,i,l,c,d,...u);if(b)return b}return typeof s[i]<"u"&&!s[a]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${a}\` prop.`):null}}function sr(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Zd=typeof window<"u"?$.useLayoutEffect:$.useEffect,Ht=Zd;let Va=0;function Qd(e){const[t,n]=$.useState(e),r=e||t;return $.useEffect(()=>{t==null&&(Va+=1,n(`mui-${Va}`))},[t]),r}const Fa=$["useId".toString()];function gi(e){if(Fa!==void 0){const t=Fa();return e??t}return Qd(e)}function eu(e,t,n,r,a){if(process.env.NODE_ENV==="production")return null;const s=a||t;return typeof e[t]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function bi({controlled:e,default:t,name:n,state:r="value"}){const{current:a}=$.useRef(e!==void 0),[s,i]=$.useState(t),l=a?e:s;if(process.env.NODE_ENV!=="production"){$.useEffect(()=>{a!==(e!==void 0)&&console.error([`MUI: A component is changing the ${a?"":"un"}controlled ${r} state of ${n} to be ${a?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=$.useRef(t);$.useEffect(()=>{!a&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=$.useCallback(d=>{a||i(d)},[]);return[l,c]}function io(e){const t=$.useRef(e);return Ht(()=>{t.current=e}),$.useRef((...n)=>(0,t.current)(...n)).current}function Tt(...e){return $.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{sr(n,t)})},e)}const La={};function tu(e,t){const n=$.useRef(La);return n.current===La&&(n.current=e(t)),n}const nu=[];function ru(e){$.useEffect(e,nu)}class Dn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Dn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function mn(){const e=tu(Dn.create).current;return ru(e.disposeEffect),e}let xr=!0,lo=!1;const ou=new Dn,au={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function su(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&au[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function iu(e){e.metaKey||e.altKey||e.ctrlKey||(xr=!0)}function Yr(){xr=!1}function lu(){this.visibilityState==="hidden"&&lo&&(xr=!0)}function cu(e){e.addEventListener("keydown",iu,!0),e.addEventListener("mousedown",Yr,!0),e.addEventListener("pointerdown",Yr,!0),e.addEventListener("touchstart",Yr,!0),e.addEventListener("visibilitychange",lu,!0)}function du(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return xr||su(t)}function vi(){const e=$.useCallback(a=>{a!=null&&cu(a.ownerDocument)},[]),t=$.useRef(!1);function n(){return t.current?(lo=!0,ou.start(100,()=>{lo=!1}),t.current=!1,!0):!1}function r(a){return du(a)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function xi(e,t){const n=R({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=R({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const a=e[r]||{},s=t[r];n[r]={},!s||!Object.keys(s)?n[r]=a:!a||!Object.keys(a)?n[r]=s:(n[r]=R({},s),Object.keys(a).forEach(i=>{n[r][i]=xi(a[i],s[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Lo(e,t,n=void 0){const r={};return Object.keys(e).forEach(a=>{r[a]=e[a].reduce((s,i)=>{if(i){const l=t(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Ga=e=>e,uu=()=>{let e=Ga;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ga}}},pu=uu(),yi=pu,Ni={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function yr(e,t,n="Mui"){const r=Ni[t];return r?`${n}-${r}`:`${yi.generate(e)}-${t}`}function ji(e,t,n="Mui"){const r={};return t.forEach(a=>{r[a]=yr(e,a,n)}),r}function wu(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ke(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,s;for(s=0;s<r.length;s++)a=r[s],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}const fu=["values","unit","step"],mu=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>R({},n,{[r.key]:r.val}),{})};function hu(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,a=ke(e,fu),s=mu(t),i=Object.keys(s);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,b){const x=i.indexOf(b);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:b)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function f(w){const b=i.indexOf(w);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return R({keys:i,values:s,up:l,down:c,between:d,only:u,not:f,unit:n},a)}const gu={borderRadius:4},bu=gu,vu=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},wt=vu;function Nn(e,t){return t?rt(e,t,{clone:!1}):e}const Go={xs:0,sm:600,md:900,lg:1200,xl:1536},Ua={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Go[e]}px)`};function ot(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const s=r.breakpoints||Ua;return t.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const s=r.breakpoints||Ua;return Object.keys(t).reduce((i,l)=>{if(Object.keys(s.values||Go).indexOf(l)!==-1){const c=s.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function xu(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,a)=>{const s=e.up(a);return r[s]={},r},{}))||{}}function yu(e,t){return e.reduce((n,r)=>{const a=n[r];return(!a||Object.keys(a).length===0)&&delete n[r],n},t)}function Nr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((a,s)=>a&&a[s]?a[s]:null,e);if(r!=null)return r}return t.split(".").reduce((r,a)=>r&&r[a]!=null?r[a]:null,e)}function ir(e,t,n,r=n){let a;return typeof e=="function"?a=e(n):Array.isArray(e)?a=e[n]||r:a=Nr(e,n)||r,t&&(a=t(a,r,e)),a}function xe(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:a}=e,s=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=Nr(c,r)||{};return ot(i,l,f=>{let w=ir(d,a,f);return f===w&&typeof f=="string"&&(w=ir(d,a,`${t}${f==="default"?"":Ze(f)}`,f)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[t]:wt}:{},s.filterProps=[t],s}function Nu(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const ju={m:"margin",p:"padding"},ku={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},qa={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Su=Nu(e=>{if(e.length>2)if(qa[e])e=qa[e];else return[e];const[t,n]=e.split(""),r=ju[t],a=ku[n]||"";return Array.isArray(a)?a.map(s=>r+s):[r+a]}),jr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],kr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Eu=[...jr,...kr];function Bn(e,t,n,r){var a;const s=(a=Nr(e,t,!1))!=null?a:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function ki(e){return Bn(e,"spacing",8,"spacing")}function zn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Cu(e,t){return n=>e.reduce((r,a)=>(r[a]=zn(t,n),r),{})}function Tu(e,t,n,r){if(t.indexOf(n)===-1)return null;const a=Su(n),s=Cu(a,r),i=e[n];return ot(e,i,s)}function Si(e,t){const n=ki(e.theme);return Object.keys(e).map(r=>Tu(e,t,r,n)).reduce(Nn,{})}function ge(e){return Si(e,jr)}ge.propTypes=process.env.NODE_ENV!=="production"?jr.reduce((e,t)=>(e[t]=wt,e),{}):{};ge.filterProps=jr;function be(e){return Si(e,kr)}be.propTypes=process.env.NODE_ENV!=="production"?kr.reduce((e,t)=>(e[t]=wt,e),{}):{};be.filterProps=kr;process.env.NODE_ENV!=="production"&&Eu.reduce((e,t)=>(e[t]=wt,e),{});function Ru(e=8){if(e.mui)return e;const t=ki({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=t(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function Sr(...e){const t=e.reduce((r,a)=>(a.filterProps.forEach(s=>{r[s]=a}),r),{}),n=r=>Object.keys(r).reduce((a,s)=>t[s]?Nn(a,t[s](r)):a,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,a)=>Object.assign(r,a.propTypes),{}):{},n.filterProps=e.reduce((r,a)=>r.concat(a.filterProps),[]),n}function Ve(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return xe({prop:e,themeKey:"borders",transform:t})}const Ou=Ue("border",Ve),_u=Ue("borderTop",Ve),Pu=Ue("borderRight",Ve),Iu=Ue("borderBottom",Ve),Mu=Ue("borderLeft",Ve),$u=Ue("borderColor"),Au=Ue("borderTopColor"),Du=Ue("borderRightColor"),Bu=Ue("borderBottomColor"),zu=Ue("borderLeftColor"),Vu=Ue("outline",Ve),Fu=Ue("outlineColor"),Er=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=Bn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:zn(t,r)});return ot(e,e.borderRadius,n)}return null};Er.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:wt}:{};Er.filterProps=["borderRadius"];Sr(Ou,_u,Pu,Iu,Mu,$u,Au,Du,Bu,zu,Er,Vu,Fu);const Cr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=Bn(e.theme,"spacing",8,"gap"),n=r=>({gap:zn(t,r)});return ot(e,e.gap,n)}return null};Cr.propTypes=process.env.NODE_ENV!=="production"?{gap:wt}:{};Cr.filterProps=["gap"];const Tr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=Bn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:zn(t,r)});return ot(e,e.columnGap,n)}return null};Tr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:wt}:{};Tr.filterProps=["columnGap"];const Rr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=Bn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:zn(t,r)});return ot(e,e.rowGap,n)}return null};Rr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:wt}:{};Rr.filterProps=["rowGap"];const Lu=xe({prop:"gridColumn"}),Gu=xe({prop:"gridRow"}),Uu=xe({prop:"gridAutoFlow"}),qu=xe({prop:"gridAutoColumns"}),Hu=xe({prop:"gridAutoRows"}),Xu=xe({prop:"gridTemplateColumns"}),Yu=xe({prop:"gridTemplateRows"}),Wu=xe({prop:"gridTemplateAreas"}),Ku=xe({prop:"gridArea"});Sr(Cr,Tr,Rr,Lu,Gu,Uu,qu,Hu,Xu,Yu,Wu,Ku);function Gt(e,t){return t==="grey"?t:e}const Ju=xe({prop:"color",themeKey:"palette",transform:Gt}),Zu=xe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Gt}),Qu=xe({prop:"backgroundColor",themeKey:"palette",transform:Gt});Sr(Ju,Zu,Qu);function De(e){return e<=1&&e!==0?`${e*100}%`:e}const ep=xe({prop:"width",transform:De}),Uo=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,a;const s=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Go[n];return s?((a=e.theme)==null||(a=a.breakpoints)==null?void 0:a.unit)!=="px"?{maxWidth:`${s}${e.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:De(n)}};return ot(e,e.maxWidth,t)}return null};Uo.filterProps=["maxWidth"];const tp=xe({prop:"minWidth",transform:De}),np=xe({prop:"height",transform:De}),rp=xe({prop:"maxHeight",transform:De}),op=xe({prop:"minHeight",transform:De});xe({prop:"size",cssProperty:"width",transform:De});xe({prop:"size",cssProperty:"height",transform:De});const ap=xe({prop:"boxSizing"});Sr(ep,Uo,tp,np,rp,op,ap);const sp={border:{themeKey:"borders",transform:Ve},borderTop:{themeKey:"borders",transform:Ve},borderRight:{themeKey:"borders",transform:Ve},borderBottom:{themeKey:"borders",transform:Ve},borderLeft:{themeKey:"borders",transform:Ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Er},color:{themeKey:"palette",transform:Gt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Gt},backgroundColor:{themeKey:"palette",transform:Gt},p:{style:be},pt:{style:be},pr:{style:be},pb:{style:be},pl:{style:be},px:{style:be},py:{style:be},padding:{style:be},paddingTop:{style:be},paddingRight:{style:be},paddingBottom:{style:be},paddingLeft:{style:be},paddingX:{style:be},paddingY:{style:be},paddingInline:{style:be},paddingInlineStart:{style:be},paddingInlineEnd:{style:be},paddingBlock:{style:be},paddingBlockStart:{style:be},paddingBlockEnd:{style:be},m:{style:ge},mt:{style:ge},mr:{style:ge},mb:{style:ge},ml:{style:ge},mx:{style:ge},my:{style:ge},margin:{style:ge},marginTop:{style:ge},marginRight:{style:ge},marginBottom:{style:ge},marginLeft:{style:ge},marginX:{style:ge},marginY:{style:ge},marginInline:{style:ge},marginInlineStart:{style:ge},marginInlineEnd:{style:ge},marginBlock:{style:ge},marginBlockStart:{style:ge},marginBlockEnd:{style:ge},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Cr},rowGap:{style:Rr},columnGap:{style:Tr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:De},maxWidth:{style:Uo},minWidth:{transform:De},height:{transform:De},maxHeight:{transform:De},minHeight:{transform:De},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},qo=sp;function ip(...e){const t=e.reduce((r,a)=>r.concat(Object.keys(a)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function lp(e,t){return typeof e=="function"?e(t):e}function cp(){function e(n,r,a,s){const i={[n]:r,theme:a},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:f}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=Nr(a,d)||{};return f?f(i):ot(i,r,x=>{let m=ir(w,u,x);return x===m&&typeof x=="string"&&(m=ir(w,u,`${n}${x==="default"?"":Ze(x)}`,x)),c===!1?m:{[c]:m}})}function t(n){var r;const{sx:a,theme:s={}}=n||{};if(!a)return null;const i=(r=s.unstable_sxConfig)!=null?r:qo;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=xu(s.breakpoints),f=Object.keys(u);let w=u;return Object.keys(d).forEach(b=>{const x=lp(d[b],s);if(x!=null)if(typeof x=="object")if(i[b])w=Nn(w,e(b,x,s,i));else{const m=ot({theme:s},x,h=>({[b]:h}));ip(m,x)?w[b]=t({sx:x,theme:s}):w=Nn(w,m)}else w=Nn(w,e(b,x,s,i))}),yu(f,w)}return Array.isArray(a)?a.map(l):l(a)}return t}const Ei=cp();Ei.filterProps=["sx"];const Ho=Ei;function dp(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const up=["breakpoints","palette","spacing","shape"];function Xo(e={},...t){const{breakpoints:n={},palette:r={},spacing:a,shape:s={}}=e,i=ke(e,up),l=hu(n),c=Ru(a);let d=rt({breakpoints:l,direction:"ltr",components:{},palette:R({mode:"light"},r),spacing:c,shape:R({},bu,s)},i);return d.applyStyles=dp,d=t.reduce((u,f)=>rt(u,f),d),d.unstable_sxConfig=R({},qo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Ho({sx:f,theme:this})},d}function pp(e){return Object.keys(e).length===0}function Ci(e=null){const t=$.useContext(Zr.ThemeContext);return!t||pp(t)?e:t}const wp=Xo();function Ti(e=wp){return Ci(e)}const fp=["ownerState"],mp=["variants"],hp=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function gp(e){return Object.keys(e).length===0}function bp(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Qn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const vp=Xo(),Ha=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Yn({defaultTheme:e,theme:t,themeId:n}){return gp(t)?e:t[n]||t}function xp(e){return e?(t,n)=>n[e]:null}function er(e,t){let{ownerState:n}=t,r=ke(t,fp);const a=typeof e=="function"?e(R({ownerState:n},r)):e;if(Array.isArray(a))return a.flatMap(s=>er(s,R({ownerState:n},r)));if(a&&typeof a=="object"&&Array.isArray(a.variants)){const{variants:s=[]}=a;let l=ke(a,mp);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(R({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(R({ownerState:n},r,n)):c.style))}),l}return a}function yp(e={}){const{themeId:t,defaultTheme:n=vp,rootShouldForwardProp:r=Qn,slotShouldForwardProp:a=Qn}=e,s=i=>Ho(R({},i,{theme:Yn(R({},i,{defaultTheme:n,themeId:t}))}));return s.__mui_systemSx=!0,(i,l={})=>{Zr.internal_processStyles(i,v=>v.filter(P=>!(P!=null&&P.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:f,overridesResolver:w=xp(Ha(d))}=l,b=ke(l,hp),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,m=f||!1;let h;process.env.NODE_ENV!=="production"&&c&&(h=`${c}-${Ha(d||"Root")}`);let j=Qn;d==="Root"||d==="root"?j=r:d?j=a:bp(i)&&(j=void 0);const S=Zr(i,R({shouldForwardProp:j,label:h},b)),E=v=>typeof v=="function"&&v.__emotion_real!==v||Nt(v)?P=>er(v,R({},P,{theme:Yn({theme:P.theme,defaultTheme:n,themeId:t})})):v,k=(v,...P)=>{let D=E(v);const T=P?P.map(E):[];c&&w&&T.push(M=>{const ee=Yn(R({},M,{defaultTheme:n,themeId:t}));if(!ee.components||!ee.components[c]||!ee.components[c].styleOverrides)return null;const O=ee.components[c].styleOverrides,V={};return Object.entries(O).forEach(([A,B])=>{V[A]=er(B,R({},M,{theme:ee}))}),w(M,V)}),c&&!x&&T.push(M=>{var ee;const O=Yn(R({},M,{defaultTheme:n,themeId:t})),V=O==null||(ee=O.components)==null||(ee=ee[c])==null?void 0:ee.variants;return er({variants:V},R({},M,{theme:O}))}),m||T.push(s);const _=T.length-P.length;if(Array.isArray(v)&&_>0){const M=new Array(_).fill("");D=[...v,...M],D.raw=[...v.raw,...M]}const L=S(D,...T);if(process.env.NODE_ENV!=="production"){let M;c&&(M=`${c}${Ze(d||"")}`),M===void 0&&(M=`Styled(${Ud(i)})`),L.displayName=M}return i.muiName&&(L.muiName=i.muiName),L};return S.withConfig&&(k.withConfig=S.withConfig),k}}function Np(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:xi(t.components[n].defaultProps,r)}function jp({props:e,name:t,defaultTheme:n,themeId:r}){let a=Ti(n);return r&&(a=a[r]||a),Np({theme:a,name:t,props:e})}function Yo(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),wu(e,t,n)}function kp(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,a)=>a<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Rt(e){if(e.type)return e;if(e.charAt(0)==="#")return Rt(kp(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:qt(9,e));let r=e.substring(t+1,e.length-1),a;if(n==="color"){if(r=r.split(" "),a=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${a}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:qt(10,a))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:a}}function Or(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((a,s)=>s<3?parseInt(a,10):a):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Sp(e){e=Rt(e);const{values:t}=e,n=t[0],r=t[1]/100,a=t[2]/100,s=r*Math.min(a,1-a),i=(d,u=(d+n/30)%12)=>a-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Or({type:l,values:c})}function Xa(e){e=Rt(e);let t=e.type==="hsl"||e.type==="hsla"?Rt(Sp(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Ya(e,t){const n=Xa(e),r=Xa(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Ri(e,t){return e=Rt(e),t=Yo(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Or(e)}function Ep(e,t){if(e=Rt(e),t=Yo(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Or(e)}function Cp(e,t){if(e=Rt(e),t=Yo(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Or(e)}function Tp(e,t){return R({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Rp={black:"#000",white:"#fff"},Tn=Rp,Op={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},_p=Op,Pp={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},At=Pp,Ip={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Dt=Ip,Mp={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},dn=Mp,$p={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Bt=$p,Ap={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},zt=Ap,Dp={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Vt=Dp,Bp=["mode","contrastThreshold","tonalOffset"],Wa={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Wr={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Ka(e,t,n,r){const a=r.light||r,s=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Cp(e.main,a):t==="dark"&&(e.dark=Ep(e.main,s)))}function zp(e="light"){return e==="dark"?{main:Bt[200],light:Bt[50],dark:Bt[400]}:{main:Bt[700],light:Bt[400],dark:Bt[800]}}function Vp(e="light"){return e==="dark"?{main:At[200],light:At[50],dark:At[400]}:{main:At[500],light:At[300],dark:At[700]}}function Fp(e="light"){return e==="dark"?{main:Dt[500],light:Dt[300],dark:Dt[700]}:{main:Dt[700],light:Dt[400],dark:Dt[800]}}function Lp(e="light"){return e==="dark"?{main:zt[400],light:zt[300],dark:zt[700]}:{main:zt[700],light:zt[500],dark:zt[900]}}function Gp(e="light"){return e==="dark"?{main:Vt[400],light:Vt[300],dark:Vt[700]}:{main:Vt[800],light:Vt[500],dark:Vt[900]}}function Up(e="light"){return e==="dark"?{main:dn[400],light:dn[300],dark:dn[700]}:{main:"#ed6c02",light:dn[500],dark:dn[900]}}function qp(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,a=ke(e,Bp),s=e.primary||zp(t),i=e.secondary||Vp(t),l=e.error||Fp(t),c=e.info||Lp(t),d=e.success||Gp(t),u=e.warning||Up(t);function f(m){const h=Ya(m,Wr.text.primary)>=n?Wr.text.primary:Wa.text.primary;if(process.env.NODE_ENV!=="production"){const j=Ya(m,h);j<3&&console.error([`MUI: The contrast ratio of ${j}:1 for ${h} on ${m}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const w=({color:m,name:h,mainShade:j=500,lightShade:S=300,darkShade:E=700})=>{if(m=R({},m),!m.main&&m[j]&&(m.main=m[j]),!m.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${j}\` property.`:qt(11,h?` (${h})`:"",j));if(typeof m.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:qt(12,h?` (${h})`:"",JSON.stringify(m.main)));return Ka(m,"light",S,r),Ka(m,"dark",E,r),m.contrastText||(m.contrastText=f(m.main)),m},b={dark:Wr,light:Wa};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),rt(R({common:R({},Tn),mode:t,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:_p,contrastThreshold:n,getContrastText:f,augmentColor:w,tonalOffset:r},b[t]),a)}const Hp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Xp(e){return Math.round(e*1e5)/1e5}const Ja={textTransform:"uppercase"},Za='"Roboto", "Helvetica", "Arial", sans-serif';function Yp(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Za,fontSize:a=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:f}=n,w=ke(n,Hp);process.env.NODE_ENV!=="production"&&(typeof a!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=a/14,x=f||(j=>`${j/d*b}rem`),m=(j,S,E,k,v)=>R({fontFamily:r,fontWeight:j,fontSize:x(S),lineHeight:E},r===Za?{letterSpacing:`${Xp(k/S)}em`}:{},v,u),h={h1:m(s,96,1.167,-1.5),h2:m(s,60,1.2,-.5),h3:m(i,48,1.167,0),h4:m(i,34,1.235,.25),h5:m(i,24,1.334,0),h6:m(l,20,1.6,.15),subtitle1:m(i,16,1.75,.15),subtitle2:m(l,14,1.57,.1),body1:m(i,16,1.5,.15),body2:m(i,14,1.43,.15),button:m(l,14,1.75,.4,Ja),caption:m(i,12,1.66,.4),overline:m(i,12,2.66,1,Ja),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return rt(R({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:a,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},h),w,{clone:!1})}const Wp=.2,Kp=.14,Jp=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wp})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Kp})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Jp})`].join(",")}const Zp=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],Qp=Zp,ew=["duration","easing","delay"],tw={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},nw={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Qa(e){return`${Math.round(e)}ms`}function rw(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function ow(e){const t=R({},tw,e.easing),n=R({},nw,e.duration);return R({getAutoHeightDuration:rw,create:(a=["all"],s={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=s,d=ke(s,ew);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",f=w=>!isNaN(parseFloat(w));!u(a)&&!Array.isArray(a)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(a)?a:[a]).map(u=>`${u} ${typeof i=="string"?i:Qa(i)} ${l} ${typeof c=="string"?c:Qa(c)}`).join(",")}},e,{easing:t,duration:n})}const aw={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},sw=aw,iw=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function lw(e={},...t){const{mixins:n={},palette:r={},transitions:a={},typography:s={}}=e,i=ke(e,iw);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":qt(18));const l=qp(r),c=Xo(e);let d=rt(c,{mixins:Tp(c.breakpoints,n),palette:l,shadows:Qp.slice(),typography:Yp(l,s),transitions:ow(a),zIndex:R({},sw)});if(d=rt(d,i),d=t.reduce((u,f)=>rt(u,f),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(w,b)=>{let x;for(x in w){const m=w[x];if(u.indexOf(x)!==-1&&Object.keys(m).length>0){if(process.env.NODE_ENV!=="production"){const h=yr("",x);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:m}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const b=d.components[w].styleOverrides;b&&w.indexOf("Mui")===0&&f(b,w)})}return d.unstable_sxConfig=R({},qo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(f){return Ho({sx:f,theme:this})},d}const cw=lw(),Wo=cw,Ko="$$material";function Jo({props:e,name:t}){return jp({props:e,name:t,defaultTheme:Wo,themeId:Ko})}const dw=e=>Qn(e)&&e!=="classes",uw=yp({themeId:Ko,defaultTheme:Wo,rootShouldForwardProp:dw}),Vn=uw;function pw(e){return yr("MuiSvgIcon",e)}ji("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ww=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],fw=e=>{const{color:t,fontSize:n,classes:r}=e,a={root:["root",t!=="inherit"&&`color${Ze(t)}`,`fontSize${Ze(n)}`]};return Lo(a,pw,r)},mw=Vn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ze(n.color)}`],t[`fontSize${Ze(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,a,s,i,l,c,d,u,f,w,b,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(a=e.transitions)==null||(a=a.duration)==null?void 0:a.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(f=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),Zo=$.forwardRef(function(t,n){const r=Jo({props:t,name:"MuiSvgIcon"}),{children:a,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:f,viewBox:w="0 0 24 24"}=r,b=ke(r,ww),x=$.isValidElement(a)&&a.type==="svg",m=R({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),h={};u||(h.viewBox=w);const j=fw(m);return o.jsxs(mw,R({as:l,className:ct(j.root,s),focusable:"false",color:d,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},h,b,x&&a.props,{ownerState:m,children:[x?a.props.children:a,f?o.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Zo.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});Zo.muiName="SvgIcon";const es=Zo;function Oi(e,t){function n(r,a){return o.jsx(es,R({"data-testid":`${t}Icon`,ref:a},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=es.muiName,$.memo($.forwardRef(n))}const hw={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),yi.configure(e)}},gw=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ze,createChainedFunction:Hd,createSvgIcon:Oi,debounce:Xd,deprecatedPropType:Yd,isMuiElement:Wd,ownerDocument:ar,ownerWindow:Kd,requirePropFactory:Jd,setRef:sr,unstable_ClassNameGenerator:hw,unstable_useEnhancedEffect:Ht,unstable_useId:gi,unsupportedProp:eu,useControlled:bi,useEventCallback:io,useForkRef:Tt,useIsFocusVisible:vi},Symbol.toStringTag,{value:"Module"})),bw=Ed(gw);var ts;function vw(){return ts||(ts=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=bw}(Fr)),Fr}var xw=Cd;Object.defineProperty(zo,"__esModule",{value:!0});var _i=zo.default=void 0,yw=xw(vw()),Nw=o;_i=zo.default=(0,yw.default)((0,Nw.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function jw(e){return typeof e=="string"}function hn(e,t,n){return e===void 0||jw(e)?t:R({},t,{ownerState:R({},t.ownerState,n)})}const kw={disableDefaultClasses:!1},Sw=$.createContext(kw);function Ew(e){const{disableDefaultClasses:t}=$.useContext(Sw);return n=>t?"":e(n)}function Cw(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Tw(e,t,n){return typeof e=="function"?e(t,n):e}function ns(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Rw(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:a,className:s}=e;if(!t){const b=ct(n==null?void 0:n.className,s,a==null?void 0:a.className,r==null?void 0:r.className),x=R({},n==null?void 0:n.style,a==null?void 0:a.style,r==null?void 0:r.style),m=R({},n,a,r);return b.length>0&&(m.className=b),Object.keys(x).length>0&&(m.style=x),{props:m,internalRef:void 0}}const i=Cw(R({},a,r)),l=ns(r),c=ns(a),d=t(i),u=ct(d==null?void 0:d.className,n==null?void 0:n.className,s,a==null?void 0:a.className,r==null?void 0:r.className),f=R({},d==null?void 0:d.style,n==null?void 0:n.style,a==null?void 0:a.style,r==null?void 0:r.style),w=R({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(f).length>0&&(w.style=f),{props:w,internalRef:d.ref}}const Ow=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function _w(e){var t;const{elementType:n,externalSlotProps:r,ownerState:a,skipResolvingSlotProps:s=!1}=e,i=ke(e,Ow),l=s?{}:Tw(r,a),{props:c,internalRef:d}=Rw(R({},i,{externalSlotProps:l})),u=Tt(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return hn(n,R({},c,{ref:u}),a)}const Pi="base";function Pw(e){return`${Pi}--${e}`}function Iw(e,t){return`${Pi}-${e}-${t}`}function Ii(e,t){const n=Ni[t];return n?Pw(n):Iw(e,t)}function Mw(e,t){const n={};return t.forEach(r=>{n[r]=Ii(e,r)}),n}function $w(e){return typeof e=="function"?e():e}const lr=$.forwardRef(function(t,n){const{children:r,container:a,disablePortal:s=!1}=t,[i,l]=$.useState(null),c=Tt($.isValidElement(r)?r.ref:null,n);if(Ht(()=>{s||l($w(a)||document.body)},[a,s]),Ht(()=>{if(i&&!s)return sr(n,i),()=>{sr(n,null)}},[n,i,s]),s){if($.isValidElement(r)){const d={ref:c};return $.cloneElement(r,d)}return o.jsx($.Fragment,{children:r})}return o.jsx($.Fragment,{children:i&&Yl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(lr.propTypes={children:p.node,container:p.oneOfType([Cn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(lr["propTypes"]=zd(lr.propTypes));var Oe="top",Le="bottom",Ge="right",_e="left",Qo="auto",Fn=[Oe,Le,Ge,_e],Xt="start",Rn="end",Aw="clippingParents",Mi="viewport",un="popper",Dw="reference",rs=Fn.reduce(function(e,t){return e.concat([t+"-"+Xt,t+"-"+Rn])},[]),$i=[].concat(Fn,[Qo]).reduce(function(e,t){return e.concat([t,t+"-"+Xt,t+"-"+Rn])},[]),Bw="beforeRead",zw="read",Vw="afterRead",Fw="beforeMain",Lw="main",Gw="afterMain",Uw="beforeWrite",qw="write",Hw="afterWrite",Xw=[Bw,zw,Vw,Fw,Lw,Gw,Uw,qw,Hw];function Qe(e){return e?(e.nodeName||"").toLowerCase():null}function Be(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function Ot(e){var t=Be(e).Element;return e instanceof t||e instanceof Element}function Fe(e){var t=Be(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function ea(e){if(typeof ShadowRoot>"u")return!1;var t=Be(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Yw(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},a=t.attributes[n]||{},s=t.elements[n];!Fe(s)||!Qe(s)||(Object.assign(s.style,r),Object.keys(a).forEach(function(i){var l=a[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Ww(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var a=t.elements[r],s=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Fe(a)||!Qe(a)||(Object.assign(a.style,l),Object.keys(s).forEach(function(c){a.removeAttribute(c)}))})}}const Kw={name:"applyStyles",enabled:!0,phase:"write",fn:Yw,effect:Ww,requires:["computeStyles"]};function Ke(e){return e.split("-")[0]}var jt=Math.max,cr=Math.min,Yt=Math.round;function co(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ai(){return!/^((?!chrome|android).)*safari/i.test(co())}function Wt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),a=1,s=1;t&&Fe(e)&&(a=e.offsetWidth>0&&Yt(r.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Yt(r.height)/e.offsetHeight||1);var i=Ot(e)?Be(e):window,l=i.visualViewport,c=!Ai()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/a,u=(r.top+(c&&l?l.offsetTop:0))/s,f=r.width/a,w=r.height/s;return{width:f,height:w,top:u,right:d+f,bottom:u+w,left:d,x:d,y:u}}function ta(e){var t=Wt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Di(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&ea(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function at(e){return Be(e).getComputedStyle(e)}function Jw(e){return["table","td","th"].indexOf(Qe(e))>=0}function ft(e){return((Ot(e)?e.ownerDocument:e.document)||window.document).documentElement}function _r(e){return Qe(e)==="html"?e:e.assignedSlot||e.parentNode||(ea(e)?e.host:null)||ft(e)}function os(e){return!Fe(e)||at(e).position==="fixed"?null:e.offsetParent}function Zw(e){var t=/firefox/i.test(co()),n=/Trident/i.test(co());if(n&&Fe(e)){var r=at(e);if(r.position==="fixed")return null}var a=_r(e);for(ea(a)&&(a=a.host);Fe(a)&&["html","body"].indexOf(Qe(a))<0;){var s=at(a);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return a;a=a.parentNode}return null}function Ln(e){for(var t=Be(e),n=os(e);n&&Jw(n)&&at(n).position==="static";)n=os(n);return n&&(Qe(n)==="html"||Qe(n)==="body"&&at(n).position==="static")?t:n||Zw(e)||t}function na(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function jn(e,t,n){return jt(e,cr(t,n))}function Qw(e,t,n){var r=jn(e,t,n);return r>n?n:r}function Bi(){return{top:0,right:0,bottom:0,left:0}}function zi(e){return Object.assign({},Bi(),e)}function Vi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ef=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,zi(typeof t!="number"?t:Vi(t,Fn))};function tf(e){var t,n=e.state,r=e.name,a=e.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Ke(n.placement),c=na(l),d=[_e,Ge].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var f=ef(a.padding,n),w=ta(s),b=c==="y"?Oe:_e,x=c==="y"?Le:Ge,m=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],h=i[c]-n.rects.reference[c],j=Ln(s),S=j?c==="y"?j.clientHeight||0:j.clientWidth||0:0,E=m/2-h/2,k=f[b],v=S-w[u]-f[x],P=S/2-w[u]/2+E,D=jn(k,P,v),T=c;n.modifiersData[r]=(t={},t[T]=D,t.centerOffset=D-P,t)}}function nf(e){var t=e.state,n=e.options,r=n.element,a=r===void 0?"[data-popper-arrow]":r;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||Di(t.elements.popper,a)&&(t.elements.arrow=a))}const rf={name:"arrow",enabled:!0,phase:"main",fn:tf,effect:nf,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Kt(e){return e.split("-")[1]}var of={top:"auto",right:"auto",bottom:"auto",left:"auto"};function af(e,t){var n=e.x,r=e.y,a=t.devicePixelRatio||1;return{x:Yt(n*a)/a||0,y:Yt(r*a)/a||0}}function as(e){var t,n=e.popper,r=e.popperRect,a=e.placement,s=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,f=e.isFixed,w=i.x,b=w===void 0?0:w,x=i.y,m=x===void 0?0:x,h=typeof u=="function"?u({x:b,y:m}):{x:b,y:m};b=h.x,m=h.y;var j=i.hasOwnProperty("x"),S=i.hasOwnProperty("y"),E=_e,k=Oe,v=window;if(d){var P=Ln(n),D="clientHeight",T="clientWidth";if(P===Be(n)&&(P=ft(n),at(P).position!=="static"&&l==="absolute"&&(D="scrollHeight",T="scrollWidth")),P=P,a===Oe||(a===_e||a===Ge)&&s===Rn){k=Le;var _=f&&P===v&&v.visualViewport?v.visualViewport.height:P[D];m-=_-r.height,m*=c?1:-1}if(a===_e||(a===Oe||a===Le)&&s===Rn){E=Ge;var L=f&&P===v&&v.visualViewport?v.visualViewport.width:P[T];b-=L-r.width,b*=c?1:-1}}var M=Object.assign({position:l},d&&of),ee=u===!0?af({x:b,y:m},Be(n)):{x:b,y:m};if(b=ee.x,m=ee.y,c){var O;return Object.assign({},M,(O={},O[k]=S?"0":"",O[E]=j?"0":"",O.transform=(v.devicePixelRatio||1)<=1?"translate("+b+"px, "+m+"px)":"translate3d("+b+"px, "+m+"px, 0)",O))}return Object.assign({},M,(t={},t[k]=S?m+"px":"",t[E]=j?b+"px":"",t.transform="",t))}function sf(e){var t=e.state,n=e.options,r=n.gpuAcceleration,a=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Ke(t.placement),variation:Kt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,as(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,as(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const lf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:sf,data:{}};var Wn={passive:!0};function cf(e){var t=e.state,n=e.instance,r=e.options,a=r.scroll,s=a===void 0?!0:a,i=r.resize,l=i===void 0?!0:i,c=Be(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Wn)}),l&&c.addEventListener("resize",n.update,Wn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Wn)}),l&&c.removeEventListener("resize",n.update,Wn)}}const df={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cf,data:{}};var uf={left:"right",right:"left",bottom:"top",top:"bottom"};function tr(e){return e.replace(/left|right|bottom|top/g,function(t){return uf[t]})}var pf={start:"end",end:"start"};function ss(e){return e.replace(/start|end/g,function(t){return pf[t]})}function ra(e){var t=Be(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function oa(e){return Wt(ft(e)).left+ra(e).scrollLeft}function wf(e,t){var n=Be(e),r=ft(e),a=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(a){s=a.width,i=a.height;var d=Ai();(d||!d&&t==="fixed")&&(l=a.offsetLeft,c=a.offsetTop)}return{width:s,height:i,x:l+oa(e),y:c}}function ff(e){var t,n=ft(e),r=ra(e),a=(t=e.ownerDocument)==null?void 0:t.body,s=jt(n.scrollWidth,n.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),i=jt(n.scrollHeight,n.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),l=-r.scrollLeft+oa(e),c=-r.scrollTop;return at(a||n).direction==="rtl"&&(l+=jt(n.clientWidth,a?a.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function aa(e){var t=at(e),n=t.overflow,r=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+a+r)}function Fi(e){return["html","body","#document"].indexOf(Qe(e))>=0?e.ownerDocument.body:Fe(e)&&aa(e)?e:Fi(_r(e))}function kn(e,t){var n;t===void 0&&(t=[]);var r=Fi(e),a=r===((n=e.ownerDocument)==null?void 0:n.body),s=Be(r),i=a?[s].concat(s.visualViewport||[],aa(r)?r:[]):r,l=t.concat(i);return a?l:l.concat(kn(_r(i)))}function uo(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function mf(e,t){var n=Wt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function is(e,t,n){return t===Mi?uo(wf(e,n)):Ot(t)?mf(t,n):uo(ff(ft(e)))}function hf(e){var t=kn(_r(e)),n=["absolute","fixed"].indexOf(at(e).position)>=0,r=n&&Fe(e)?Ln(e):e;return Ot(r)?t.filter(function(a){return Ot(a)&&Di(a,r)&&Qe(a)!=="body"}):[]}function gf(e,t,n,r){var a=t==="clippingParents"?hf(e):[].concat(t),s=[].concat(a,[n]),i=s[0],l=s.reduce(function(c,d){var u=is(e,d,r);return c.top=jt(u.top,c.top),c.right=cr(u.right,c.right),c.bottom=cr(u.bottom,c.bottom),c.left=jt(u.left,c.left),c},is(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Li(e){var t=e.reference,n=e.element,r=e.placement,a=r?Ke(r):null,s=r?Kt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(a){case Oe:c={x:i,y:t.y-n.height};break;case Le:c={x:i,y:t.y+t.height};break;case Ge:c={x:t.x+t.width,y:l};break;case _e:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=a?na(a):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case Xt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case Rn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function On(e,t){t===void 0&&(t={});var n=t,r=n.placement,a=r===void 0?e.placement:r,s=n.strategy,i=s===void 0?e.strategy:s,l=n.boundary,c=l===void 0?Aw:l,d=n.rootBoundary,u=d===void 0?Mi:d,f=n.elementContext,w=f===void 0?un:f,b=n.altBoundary,x=b===void 0?!1:b,m=n.padding,h=m===void 0?0:m,j=zi(typeof h!="number"?h:Vi(h,Fn)),S=w===un?Dw:un,E=e.rects.popper,k=e.elements[x?S:w],v=gf(Ot(k)?k:k.contextElement||ft(e.elements.popper),c,u,i),P=Wt(e.elements.reference),D=Li({reference:P,element:E,strategy:"absolute",placement:a}),T=uo(Object.assign({},E,D)),_=w===un?T:P,L={top:v.top-_.top+j.top,bottom:_.bottom-v.bottom+j.bottom,left:v.left-_.left+j.left,right:_.right-v.right+j.right},M=e.modifiersData.offset;if(w===un&&M){var ee=M[a];Object.keys(L).forEach(function(O){var V=[Ge,Le].indexOf(O)>=0?1:-1,A=[Oe,Le].indexOf(O)>=0?"y":"x";L[O]+=ee[A]*V})}return L}function bf(e,t){t===void 0&&(t={});var n=t,r=n.placement,a=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?$i:c,u=Kt(r),f=u?l?rs:rs.filter(function(x){return Kt(x)===u}):Fn,w=f.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=f);var b=w.reduce(function(x,m){return x[m]=On(e,{placement:m,boundary:a,rootBoundary:s,padding:i})[Ke(m)],x},{});return Object.keys(b).sort(function(x,m){return b[x]-b[m]})}function vf(e){if(Ke(e)===Qo)return[];var t=tr(e);return[ss(e),t,ss(t)]}function xf(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var a=n.mainAxis,s=a===void 0?!0:a,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,f=n.rootBoundary,w=n.altBoundary,b=n.flipVariations,x=b===void 0?!0:b,m=n.allowedAutoPlacements,h=t.options.placement,j=Ke(h),S=j===h,E=c||(S||!x?[tr(h)]:vf(h)),k=[h].concat(E).reduce(function(F,K){return F.concat(Ke(K)===Qo?bf(t,{placement:K,boundary:u,rootBoundary:f,padding:d,flipVariations:x,allowedAutoPlacements:m}):K)},[]),v=t.rects.reference,P=t.rects.popper,D=new Map,T=!0,_=k[0],L=0;L<k.length;L++){var M=k[L],ee=Ke(M),O=Kt(M)===Xt,V=[Oe,Le].indexOf(ee)>=0,A=V?"width":"height",B=On(t,{placement:M,boundary:u,rootBoundary:f,altBoundary:w,padding:d}),q=V?O?Ge:_e:O?Le:Oe;v[A]>P[A]&&(q=tr(q));var re=tr(q),ae=[];if(s&&ae.push(B[ee]<=0),l&&ae.push(B[q]<=0,B[re]<=0),ae.every(function(F){return F})){_=M,T=!1;break}D.set(M,ae)}if(T)for(var N=x?3:1,C=function(K){var Y=k.find(function(W){var H=D.get(W);if(H)return H.slice(0,K).every(function(Z){return Z})});if(Y)return _=Y,"break"},G=N;G>0;G--){var U=C(G);if(U==="break")break}t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}}const yf={name:"flip",enabled:!0,phase:"main",fn:xf,requiresIfExists:["offset"],data:{_skip:!1}};function ls(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function cs(e){return[Oe,Ge,Le,_e].some(function(t){return e[t]>=0})}function Nf(e){var t=e.state,n=e.name,r=t.rects.reference,a=t.rects.popper,s=t.modifiersData.preventOverflow,i=On(t,{elementContext:"reference"}),l=On(t,{altBoundary:!0}),c=ls(i,r),d=ls(l,a,s),u=cs(c),f=cs(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":f})}const jf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Nf};function kf(e,t,n){var r=Ke(e),a=[_e,Oe].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*a,[_e,Ge].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function Sf(e){var t=e.state,n=e.options,r=e.name,a=n.offset,s=a===void 0?[0,0]:a,i=$i.reduce(function(u,f){return u[f]=kf(f,t.rects,s),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const Ef={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Sf};function Cf(e){var t=e.state,n=e.name;t.modifiersData[n]=Li({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Tf={name:"popperOffsets",enabled:!0,phase:"read",fn:Cf,data:{}};function Rf(e){return e==="x"?"y":"x"}function Of(e){var t=e.state,n=e.options,r=e.name,a=n.mainAxis,s=a===void 0?!0:a,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,f=n.padding,w=n.tether,b=w===void 0?!0:w,x=n.tetherOffset,m=x===void 0?0:x,h=On(t,{boundary:c,rootBoundary:d,padding:f,altBoundary:u}),j=Ke(t.placement),S=Kt(t.placement),E=!S,k=na(j),v=Rf(k),P=t.modifiersData.popperOffsets,D=t.rects.reference,T=t.rects.popper,_=typeof m=="function"?m(Object.assign({},t.rects,{placement:t.placement})):m,L=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,ee={x:0,y:0};if(P){if(s){var O,V=k==="y"?Oe:_e,A=k==="y"?Le:Ge,B=k==="y"?"height":"width",q=P[k],re=q+h[V],ae=q-h[A],N=b?-T[B]/2:0,C=S===Xt?D[B]:T[B],G=S===Xt?-T[B]:-D[B],U=t.elements.arrow,F=b&&U?ta(U):{width:0,height:0},K=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Bi(),Y=K[V],W=K[A],H=jn(0,D[B],F[B]),Z=E?D[B]/2-N-H-Y-L.mainAxis:C-H-Y-L.mainAxis,Q=E?-D[B]/2+N+H+W+L.mainAxis:G+H+W+L.mainAxis,ue=t.elements.arrow&&Ln(t.elements.arrow),I=ue?k==="y"?ue.clientTop||0:ue.clientLeft||0:0,je=(O=M==null?void 0:M[k])!=null?O:0,z=q+Z-je-I,ye=q+Q-je,qe=jn(b?cr(re,z):re,q,b?jt(ae,ye):ae);P[k]=qe,ee[k]=qe-q}if(l){var mt,Ce=k==="x"?Oe:_e,Gn=k==="x"?Le:Ge,He=P[v],Pt=v==="y"?"height":"width",ht=He+h[Ce],It=He-h[Gn],Mt=[Oe,_e].indexOf(j)!==-1,$t=(mt=M==null?void 0:M[v])!=null?mt:0,gt=Mt?ht:He-D[Pt]-T[Pt]-$t+L.altAxis,nn=Mt?He+D[Pt]+T[Pt]-$t-L.altAxis:It,Un=b&&Mt?Qw(gt,He,nn):jn(b?gt:ht,He,b?nn:It);P[v]=Un,ee[v]=Un-He}t.modifiersData[r]=ee}}const _f={name:"preventOverflow",enabled:!0,phase:"main",fn:Of,requiresIfExists:["offset"]};function Pf(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function If(e){return e===Be(e)||!Fe(e)?ra(e):Pf(e)}function Mf(e){var t=e.getBoundingClientRect(),n=Yt(t.width)/e.offsetWidth||1,r=Yt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function $f(e,t,n){n===void 0&&(n=!1);var r=Fe(t),a=Fe(t)&&Mf(t),s=ft(t),i=Wt(e,a,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Qe(t)!=="body"||aa(s))&&(l=If(t)),Fe(t)?(c=Wt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):s&&(c.x=oa(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Af(e){var t=new Map,n=new Set,r=[];e.forEach(function(s){t.set(s.name,s)});function a(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&a(c)}}),r.push(s)}return e.forEach(function(s){n.has(s.name)||a(s)}),r}function Df(e){var t=Af(e);return Xw.reduce(function(n,r){return n.concat(t.filter(function(a){return a.phase===r}))},[])}function Bf(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function zf(e){var t=e.reduce(function(n,r){var a=n[r.name];return n[r.name]=a?Object.assign({},a,r,{options:Object.assign({},a.options,r.options),data:Object.assign({},a.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var ds={placement:"bottom",modifiers:[],strategy:"absolute"};function us(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Vf(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,a=t.defaultOptions,s=a===void 0?ds:a;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},ds,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],w=!1,b={state:u,setOptions:function(j){var S=typeof j=="function"?j(u.options):j;m(),u.options=Object.assign({},s,u.options,S),u.scrollParents={reference:Ot(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var E=Df(zf([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(k){return k.enabled}),x(),b.update()},forceUpdate:function(){if(!w){var j=u.elements,S=j.reference,E=j.popper;if(us(S,E)){u.rects={reference:$f(S,Ln(E),u.options.strategy==="fixed"),popper:ta(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(L){return u.modifiersData[L.name]=Object.assign({},L.data)});for(var k=0;k<u.orderedModifiers.length;k++){if(u.reset===!0){u.reset=!1,k=-1;continue}var v=u.orderedModifiers[k],P=v.fn,D=v.options,T=D===void 0?{}:D,_=v.name;typeof P=="function"&&(u=P({state:u,options:T,name:_,instance:b})||u)}}}},update:Bf(function(){return new Promise(function(h){b.forceUpdate(),h(u)})}),destroy:function(){m(),w=!0}};if(!us(l,c))return b;b.setOptions(d).then(function(h){!w&&d.onFirstUpdate&&d.onFirstUpdate(h)});function x(){u.orderedModifiers.forEach(function(h){var j=h.name,S=h.options,E=S===void 0?{}:S,k=h.effect;if(typeof k=="function"){var v=k({state:u,name:j,instance:b,options:E}),P=function(){};f.push(v||P)}})}function m(){f.forEach(function(h){return h()}),f=[]}return b}}var Ff=[df,Tf,lf,Kw,Ef,yf,_f,rf,jf],Lf=Vf({defaultModifiers:Ff});const Gi="Popper";function Gf(e){return Ii(Gi,e)}Mw(Gi,["root"]);const Uf=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qf=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Hf(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function dr(e){return typeof e=="function"?e():e}function Pr(e){return e.nodeType!==void 0}function Xf(e){return!Pr(e)}const Yf=()=>Lo({root:["root"]},Ew(Gf)),Wf={},Kf=$.forwardRef(function(t,n){var r;const{anchorEl:a,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:f,popperRef:w,slotProps:b={},slots:x={},TransitionProps:m}=t,h=ke(t,Uf),j=$.useRef(null),S=Tt(j,n),E=$.useRef(null),k=Tt(E,w),v=$.useRef(k);Ht(()=>{v.current=k},[k]),$.useImperativeHandle(w,()=>E.current,[]);const P=Hf(u,i),[D,T]=$.useState(P),[_,L]=$.useState(dr(a));$.useEffect(()=>{E.current&&E.current.forceUpdate()}),$.useEffect(()=>{a&&L(dr(a))},[a]),Ht(()=>{if(!_||!d)return;const A=re=>{T(re.placement)};if(process.env.NODE_ENV!=="production"&&_&&Pr(_)&&_.nodeType===1){const re=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&re.top===0&&re.left===0&&re.right===0&&re.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let B=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:re})=>{A(re)}}];c!=null&&(B=B.concat(c)),f&&f.modifiers!=null&&(B=B.concat(f.modifiers));const q=Lf(_,j.current,R({placement:P},f,{modifiers:B}));return v.current(q),()=>{q.destroy(),v.current(null)}},[_,l,c,d,f,P]);const M={placement:D};m!==null&&(M.TransitionProps=m);const ee=Yf(),O=(r=x.root)!=null?r:"div",V=_w({elementType:O,externalSlotProps:b.root,externalForwardedProps:h,additionalProps:{role:"tooltip",ref:S},ownerState:t,className:ee.root});return o.jsx(O,R({},V,{children:typeof s=="function"?s(M):s}))}),Ui=$.forwardRef(function(t,n){const{anchorEl:r,children:a,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:f="bottom",popperOptions:w=Wf,popperRef:b,style:x,transition:m=!1,slotProps:h={},slots:j={}}=t,S=ke(t,qf),[E,k]=$.useState(!0),v=()=>{k(!1)},P=()=>{k(!0)};if(!c&&!u&&(!m||E))return null;let D;if(s)D=s;else if(r){const L=dr(r);D=L&&Pr(L)?ar(L).body:ar(null).body}const T=!u&&c&&(!m||E)?"none":void 0,_=m?{in:u,onEnter:v,onExited:P}:void 0;return o.jsx(lr,{disablePortal:l,container:D,children:o.jsx(Kf,R({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:m?!E:u,placement:f,popperOptions:w,popperRef:b,slotProps:h,slots:j},S,{style:R({position:"fixed",top:0,left:0,display:T},x),TransitionProps:_,children:a}))})});process.env.NODE_ENV!=="production"&&(Ui.propTypes={anchorEl:Vo(p.oneOfType([Cn,p.object,p.func]),e=>{if(e.open){const t=dr(e.anchorEl);if(t&&Pr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Xf(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Cn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:hi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function qi(){const e=Ti(Wo);return process.env.NODE_ENV!=="production"&&$.useDebugValue(e),e[Ko]||e}function po(e,t){return po=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,a){return r.__proto__=a,r},po(e,t)}function Jf(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,po(e,t)}const ps={disabled:!1};var Zf=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Hi=g.createContext(null);var Qf=function(t){return t.scrollTop},gn="unmounted",xt="exited",yt="entering",Lt="entered",wo="exiting",st=function(e){Jf(t,e);function t(r,a){var s;s=e.call(this,r,a)||this;var i=a,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=xt,s.appearStatus=yt):c=Lt:r.unmountOnExit||r.mountOnEnter?c=gn:c=xt,s.state={status:c},s.nextCallback=null,s}t.getDerivedStateFromProps=function(a,s){var i=a.in;return i&&s.status===gn?{status:xt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(a){var s=null;if(a!==this.props){var i=this.state.status;this.props.in?i!==yt&&i!==Lt&&(s=yt):(i===yt||i===Lt)&&(s=wo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var a=this.props.timeout,s,i,l;return s=i=l=a,a!=null&&typeof a!="number"&&(s=a.exit,i=a.enter,l=a.appear!==void 0?a.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(a,s){if(a===void 0&&(a=!1),s!==null)if(this.cancelNextCallback(),s===yt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this);i&&Qf(i)}this.performEnter(a)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xt&&this.setState({status:gn})},n.performEnter=function(a){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:a,c=this.props.nodeRef?[l]:[wn.findDOMNode(this),l],d=c[0],u=c[1],f=this.getTimeouts(),w=l?f.appear:f.enter;if(!a&&!i||ps.disabled){this.safeSetState({status:Lt},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:yt},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Lt},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var a=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:wn.findDOMNode(this);if(!s||ps.disabled){this.safeSetState({status:xt},function(){a.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:wo},function(){a.props.onExiting(l),a.onTransitionEnd(i.exit,function(){a.safeSetState({status:xt},function(){a.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(a,s){s=this.setNextCallback(s),this.setState(a,s)},n.setNextCallback=function(a){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,a(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(a,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:wn.findDOMNode(this),l=a==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}a!=null&&setTimeout(this.nextCallback,a)},n.render=function(){var a=this.state.status;if(a===gn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=ke(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return g.createElement(Hi.Provider,{value:null},typeof i=="function"?i(a,l):g.cloneElement(g.Children.only(i),l))},t}(g.Component);st.contextType=Hi;st.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,a,s){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,a,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Zf;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,a=new Array(r>1?r-1:0),s=1;s<r;s++)a[s-1]=arguments[s];return n.apply(void 0,[t].concat(a))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Ft(){}st.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ft,onEntering:Ft,onEntered:Ft,onExit:Ft,onExiting:Ft,onExited:Ft};st.UNMOUNTED=gn;st.EXITED=xt;st.ENTERING=yt;st.ENTERED=Lt;st.EXITING=wo;const em=st,tm=e=>e.scrollTop;function ws(e,t){var n,r;const{timeout:a,easing:s,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof a=="number"?a:a[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[t.mode]:s,delay:i.transitionDelay}}const nm=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function fo(e){return`scale(${e}, ${e**2})`}const rm={entering:{opacity:1,transform:fo(1)},entered:{opacity:1,transform:"none"}},Kr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),sa=$.forwardRef(function(t,n){const{addEndListener:r,appear:a=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:f,onExited:w,onExiting:b,style:x,timeout:m="auto",TransitionComponent:h=em}=t,j=ke(t,nm),S=mn(),E=$.useRef(),k=qi(),v=$.useRef(null),P=Tt(v,s.ref,n),D=A=>B=>{if(A){const q=v.current;B===void 0?A(q):A(q,B)}},T=D(u),_=D((A,B)=>{tm(A);const{duration:q,delay:re,easing:ae}=ws({style:x,timeout:m,easing:i},{mode:"enter"});let N;m==="auto"?(N=k.transitions.getAutoHeightDuration(A.clientHeight),E.current=N):N=q,A.style.transition=[k.transitions.create("opacity",{duration:N,delay:re}),k.transitions.create("transform",{duration:Kr?N:N*.666,delay:re,easing:ae})].join(","),c&&c(A,B)}),L=D(d),M=D(b),ee=D(A=>{const{duration:B,delay:q,easing:re}=ws({style:x,timeout:m,easing:i},{mode:"exit"});let ae;m==="auto"?(ae=k.transitions.getAutoHeightDuration(A.clientHeight),E.current=ae):ae=B,A.style.transition=[k.transitions.create("opacity",{duration:ae,delay:q}),k.transitions.create("transform",{duration:Kr?ae:ae*.666,delay:Kr?q:q||ae*.333,easing:re})].join(","),A.style.opacity=0,A.style.transform=fo(.75),f&&f(A)}),O=D(w),V=A=>{m==="auto"&&S.start(E.current||0,A),r&&r(v.current,A)};return o.jsx(h,R({appear:a,in:l,nodeRef:v,onEnter:_,onEntered:L,onEntering:T,onExit:ee,onExited:O,onExiting:M,addEndListener:V,timeout:m==="auto"?null:m},j,{children:(A,B)=>$.cloneElement(s,R({style:R({opacity:0,transform:fo(.75),visibility:A==="exited"&&!l?"hidden":void 0},rm[A],x,s.props.style),ref:P},B))}))});process.env.NODE_ENV!=="production"&&(sa.propTypes={addEndListener:p.func,appear:p.bool,children:fi.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});sa.muiSupportAuto=!0;const fs=sa,om=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],am=Vn(Ui,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Xi=$.forwardRef(function(t,n){var r;const a=Ci(),s=Jo({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:h,popperRef:j,transition:S,slots:E,slotProps:k}=s,v=ke(s,om),P=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,D=R({anchorEl:i,container:u,disablePortal:f,keepMounted:w,modifiers:b,open:x,placement:m,popperOptions:h,popperRef:j,transition:S},v);return o.jsx(am,R({as:l,direction:a==null?void 0:a.direction,slots:{root:P},slotProps:k??d},D,{ref:n}))});process.env.NODE_ENV!=="production"&&(Xi.propTypes={anchorEl:p.oneOfType([Cn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Cn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:hi,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const Yi=Xi;function sm(e){return yr("MuiTooltip",e)}const im=ji("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),dt=im,lm=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function cm(e){return Math.round(e*1e5)/1e5}const dm=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:a,placement:s}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",a&&"touch",`tooltipPlacement${Ze(s.split("-")[0])}`],arrow:["arrow"]};return Lo(i,sm,t)},um=Vn(Yi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>R({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${dt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${dt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${dt.arrow}`]:R({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${dt.arrow}`]:R({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),pm=Vn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ze(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>R({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ri(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${cm(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${dt.popper}[data-popper-placement*="left"] &`]:R({transformOrigin:"right center"},t.isRtl?R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):R({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${dt.popper}[data-popper-placement*="right"] &`]:R({transformOrigin:"left center"},t.isRtl?R({marginRight:"14px"},t.touch&&{marginRight:"24px"}):R({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${dt.popper}[data-popper-placement*="top"] &`]:R({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${dt.popper}[data-popper-placement*="bottom"] &`]:R({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),wm=Vn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ri(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Kn=!1;const ms=new Dn;let pn={x:0,y:0};function Jn(e,t){return n=>{t&&t(n),e(n)}}const Wi=$.forwardRef(function(t,n){var r,a,s,i,l,c,d,u,f,w,b,x,m,h,j,S,E,k,v;const P=Jo({props:t,name:"MuiTooltip"}),{arrow:D=!1,children:T,components:_={},componentsProps:L={},describeChild:M=!1,disableFocusListener:ee=!1,disableHoverListener:O=!1,disableInteractive:V=!1,disableTouchListener:A=!1,enterDelay:B=100,enterNextDelay:q=0,enterTouchDelay:re=700,followCursor:ae=!1,id:N,leaveDelay:C=0,leaveTouchDelay:G=1500,onClose:U,onOpen:F,open:K,placement:Y="bottom",PopperComponent:W,PopperProps:H={},slotProps:Z={},slots:Q={},title:ue,TransitionComponent:I=fs,TransitionProps:je}=P,z=ke(P,lm),ye=$.isValidElement(T)?T:o.jsx("span",{children:T}),qe=qi(),mt=qe.direction==="rtl",[Ce,Gn]=$.useState(),[He,Pt]=$.useState(null),ht=$.useRef(!1),It=V||ae,Mt=mn(),$t=mn(),gt=mn(),nn=mn(),[Un,la]=bi({controlled:K,default:!1,name:"Tooltip",state:"open"});let et=Un;if(process.env.NODE_ENV!=="production"){const{current:te}=$.useRef(K!==void 0);$.useEffect(()=>{Ce&&Ce.disabled&&!te&&ue!==""&&Ce.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,Ce,te])}const Ir=gi(N),rn=$.useRef(),qn=io(()=>{rn.current!==void 0&&(document.body.style.WebkitUserSelect=rn.current,rn.current=void 0),nn.clear()});$.useEffect(()=>qn,[qn]);const ca=te=>{ms.clear(),Kn=!0,la(!0),F&&!et&&F(te)},Hn=io(te=>{ms.start(800+C,()=>{Kn=!1}),la(!1),U&&et&&U(te),Mt.start(qe.transitions.duration.shortest,()=>{ht.current=!1})}),Mr=te=>{ht.current&&te.type!=="touchstart"||(Ce&&Ce.removeAttribute("title"),$t.clear(),gt.clear(),B||Kn&&q?$t.start(Kn?q:B,()=>{ca(te)}):ca(te))},da=te=>{$t.clear(),gt.start(C,()=>{Hn(te)})},{isFocusVisibleRef:ua,onBlur:xl,onFocus:yl,ref:Nl}=vi(),[,pa]=$.useState(!1),wa=te=>{xl(te),ua.current===!1&&(pa(!1),da(te))},fa=te=>{Ce||Gn(te.currentTarget),yl(te),ua.current===!0&&(pa(!0),Mr(te))},ma=te=>{ht.current=!0;const Me=ye.props;Me.onTouchStart&&Me.onTouchStart(te)},ha=Mr,ga=da,jl=te=>{ma(te),gt.clear(),Mt.clear(),qn(),rn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",nn.start(re,()=>{document.body.style.WebkitUserSelect=rn.current,Mr(te)})},kl=te=>{ye.props.onTouchEnd&&ye.props.onTouchEnd(te),qn(),gt.start(G,()=>{Hn(te)})};$.useEffect(()=>{if(!et)return;function te(Me){(Me.key==="Escape"||Me.key==="Esc")&&Hn(Me)}return document.addEventListener("keydown",te),()=>{document.removeEventListener("keydown",te)}},[Hn,et]);const Sl=Tt(ye.ref,Nl,Gn,n);!ue&&ue!==0&&(et=!1);const $r=$.useRef(),El=te=>{const Me=ye.props;Me.onMouseMove&&Me.onMouseMove(te),pn={x:te.clientX,y:te.clientY},$r.current&&$r.current.update()},on={},Ar=typeof ue=="string";M?(on.title=!et&&Ar&&!O?ue:null,on["aria-describedby"]=et?Ir:null):(on["aria-label"]=Ar?ue:null,on["aria-labelledby"]=et&&!Ar?Ir:null);const ze=R({},on,z,ye.props,{className:ct(z.className,ye.props.className),onTouchStart:ma,ref:Sl},ae?{onMouseMove:El}:{});process.env.NODE_ENV!=="production"&&(ze["data-mui-internal-clone-element"]=!0,$.useEffect(()=>{Ce&&!Ce.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ce]));const an={};A||(ze.onTouchStart=jl,ze.onTouchEnd=kl),O||(ze.onMouseOver=Jn(ha,ze.onMouseOver),ze.onMouseLeave=Jn(ga,ze.onMouseLeave),It||(an.onMouseOver=ha,an.onMouseLeave=ga)),ee||(ze.onFocus=Jn(fa,ze.onFocus),ze.onBlur=Jn(wa,ze.onBlur),It||(an.onFocus=fa,an.onBlur=wa)),process.env.NODE_ENV!=="production"&&ye.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));const Cl=$.useMemo(()=>{var te;let Me=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(te=H.popperOptions)!=null&&te.modifiers&&(Me=Me.concat(H.popperOptions.modifiers)),R({},H.popperOptions,{modifiers:Me})},[He,H]),sn=R({},P,{isRtl:mt,arrow:D,disableInteractive:It,placement:Y,PopperComponentProp:W,touch:ht.current}),Dr=dm(sn),ba=(r=(a=Q.popper)!=null?a:_.Popper)!=null?r:um,va=(s=(i=(l=Q.transition)!=null?l:_.Transition)!=null?i:I)!=null?s:fs,xa=(c=(d=Q.tooltip)!=null?d:_.Tooltip)!=null?c:pm,ya=(u=(f=Q.arrow)!=null?f:_.Arrow)!=null?u:wm,Tl=hn(ba,R({},H,(w=Z.popper)!=null?w:L.popper,{className:ct(Dr.popper,H==null?void 0:H.className,(b=(x=Z.popper)!=null?x:L.popper)==null?void 0:b.className)}),sn),Rl=hn(va,R({},je,(m=Z.transition)!=null?m:L.transition),sn),Ol=hn(xa,R({},(h=Z.tooltip)!=null?h:L.tooltip,{className:ct(Dr.tooltip,(j=(S=Z.tooltip)!=null?S:L.tooltip)==null?void 0:j.className)}),sn),_l=hn(ya,R({},(E=Z.arrow)!=null?E:L.arrow,{className:ct(Dr.arrow,(k=(v=Z.arrow)!=null?v:L.arrow)==null?void 0:k.className)}),sn);return o.jsxs($.Fragment,{children:[$.cloneElement(ye,ze),o.jsx(ba,R({as:W??Yi,placement:Y,anchorEl:ae?{getBoundingClientRect:()=>({top:pn.y,left:pn.x,right:pn.x,bottom:pn.y,width:0,height:0})}:Ce,popperRef:$r,open:Ce?et:!1,id:Ir,transition:!0},an,Tl,{popperOptions:Cl,children:({TransitionProps:te})=>o.jsx(va,R({timeout:qe.transitions.duration.shorter},te,Rl,{children:o.jsxs(xa,R({},Ol,{children:[ue,D?o.jsx(ya,R({},_l,{ref:Pt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={arrow:p.bool,children:fi.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const fm=Wi;function hs(e,t,n){return e?o.jsx(Ye.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:o.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function ia(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:a=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:f=!1,hasDisabledGutters:w=!1,hasDivider:b=!1,focusVisibleClassName:x,id:m,children:h}=e,j=o.jsx(Ye.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:b,focusVisibleClassName:x,onClick:t,id:m,children:n?o.jsxs(o.Fragment,{children:[hs(s,n,!0),o.jsx(Ye.ListItemText,{primary:n,inset:!s&&a}),f?o.jsx(Ye.ListItemIcon,{className:"papi-menu-icon-trailing",children:o.jsx(_i,{})}):hs(i,n,!1)]}):h});return r?o.jsx(fm,{title:r,placement:"right",children:o.jsx("div",{children:j})}):j}function Ki(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function mm(e){const[t,n]=g.useState(void 0),{parentMenuItem:r,parentItemProps:a,menuDefinition:s}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Ki(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),o.jsx(Ji,{...e,includedGroups:d})};return o.jsxs(o.Fragment,{children:[o.jsx(ia,{onClick:i,...a,isSubMenuParent:!0}),o.jsx(Ye.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const hm=(e,t)=>t.filter(a=>a.group===e).sort((a,s)=>(a.order||0)-(s.order||0));function Ji(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:a}=e,{items:s,allowForLeadingIcons:i}=g.useMemo(()=>{const u=a&&a.length>0?a:Ki(t).filter(x=>!("menuItem"in x.group)),f=Object.values(u).sort((x,m)=>(x.group.order||0)-(m.group.order||0)),w=[];f.forEach(x=>{hm(x.id,t.items).forEach(m=>w.push({item:m,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const b=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:b}},[a,t]),l=({item:u,isLastItemInGroup:f})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:i}),[c]=s;if(!c)return o.jsx("div",{});const d=c.item.group;return o.jsx("div",{role:"menu","aria-label":d,children:s.map((u,f)=>{const{item:w}=u,b=l(u);if("command"in w){const x=w.group+f;return o.jsx(ia,{onClick:m=>{n==null||n(m),r(w)},...b},x)}return o.jsx(mm,{parentMenuItem:w,parentItemProps:b,...e},d+w.id)})},d)}function gm(e){const{menuDefinition:t,columnId:n}=e;let s=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),o.jsx(Ji,{...e,includedGroups:s})}function bm({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:a,className:s}){return o.jsxs(Ye.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[o.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),o.jsx(Ye.List,{id:n,dense:!0,className:s??"",children:o.jsx(gm,{commandHandler:e,menuDefinition:t,columnId:n,onClick:a})})]})}function Zi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:a}=n,s=g.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(a).forEach(l=>{if(l==="isExtensible")return;const c=l,d=a[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[a,r]);return o.jsx(Ye.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>o.jsx(bm,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function vm(e){return{preserveValue:!0,...e}}const ur=(e,t,n={})=>{const r=g.useRef(t);r.current=t;const a=g.useRef(n);a.current=vm(a.current);const[s,i]=g.useState(()=>r.current),[l,c]=g.useState(!0);return g.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,a.current.preserveValue||i(()=>r.current)}},[e]),[s,l]},xm=Oi(o.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Qi({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:a,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=g.useState(!1),[u,f]=g.useState(!1),w=g.useCallback(()=>{c&&d(!1),f(!1)},[c]),b=g.useCallback(k=>{k.stopPropagation(),d(v=>{const P=!v;return P&&k.shiftKey?f(!0):P||f(!1),P})},[]),x=g.useCallback(k=>(w(),r(k)),[r,w]),[m,h]=g.useState({top:1,left:1});g.useEffect(()=>{if(c){const k=a==null?void 0:a.current;if(k){const v=k.getBoundingClientRect(),P=window.scrollY,D=window.scrollX,T=v.top+P+k.clientHeight,_=v.left+D;h({top:T,left:_})}}},[c,a]);const[j]=ur(g.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[S]=ur(g.useCallback(async()=>(e==null?void 0:e(!0))??n??j,[e,n,j,c]),n??j),E=u&&S?S:j;return o.jsxs(o.Fragment,{children:[o.jsx(Ye.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??o.jsx(xm,{})}),o.jsx(Ye.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:m.top,left:m.left}},children:E?o.jsx(Zi,{className:s,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:E}):void 0})]})}function ym({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:a=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return o.jsx(Ye.IconButton,{id:e,disabled:n,edge:s,size:i,"aria-label":t,title:a?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const tn=g.forwardRef(({className:e,...t},n)=>o.jsx(X.LoaderCircle,{size:35,className:y("tw-animate-spin",e),...t,ref:n}));tn.displayName="Spinner";function Nm({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:a,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}){return o.jsxs("div",{className:y("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[o.jsx(Re,{htmlFor:e,className:y({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),o.jsx(_t,{id:e,disabled:t,placeholder:i,required:l,className:y(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:f,onFocus:w,onBlur:b}),o.jsx("p",{className:y({"tw-hidden":!a}),children:a})]})}function Zn({...e}){return o.jsx(we.Menu,{...e})}function jm({...e}){return o.jsx(we.RadioGroup,{...e})}function gs({...e}){return o.jsx(we.Sub,{"data-slot":"menubar-sub",...e})}const el=g.forwardRef(({className:e,...t},n)=>o.jsx(we.Root,{ref:n,className:y("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...t}));el.displayName=we.Root.displayName;const bn=g.forwardRef(({className:e,...t},n)=>o.jsx(we.Trigger,{ref:n,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","hover:tw-bg-accent hover:tw-text-accent-foreground",e),...t}));bn.displayName=we.Trigger.displayName;const mo=g.forwardRef(({className:e,inset:t,children:n,...r},a)=>o.jsxs(we.SubTrigger,{ref:a,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",t&&"tw-pl-8",e),...r,children:[n,o.jsx(X.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));mo.displayName=we.SubTrigger.displayName;const ho=g.forwardRef(({className:e,...t},n)=>o.jsx(we.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));ho.displayName=we.SubContent.displayName;const vn=g.forwardRef(({className:e,align:t="start",alignOffset:n=-4,sideOffset:r=8,...a},s)=>o.jsx(we.Portal,{children:o.jsx(we.Content,{ref:s,align:t,alignOffset:n,sideOffset:r,className:y("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...a})}));vn.displayName=we.Content.displayName;const he=g.forwardRef(({className:e,inset:t,...n},r)=>o.jsx(we.Item,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));he.displayName=we.Item.displayName;const go=g.forwardRef(({className:e,children:t,checked:n,...r},a)=>o.jsxs(we.CheckboxItem,{ref:a,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[o.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:o.jsx(we.ItemIndicator,{children:o.jsx(X.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));go.displayName=we.CheckboxItem.displayName;const nr=g.forwardRef(({className:e,children:t,...n},r)=>o.jsxs(we.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[o.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:o.jsx(we.ItemIndicator,{children:o.jsx(X.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));nr.displayName=we.RadioItem.displayName;const km=g.forwardRef(({className:e,inset:t,...n},r)=>o.jsx(we.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));km.displayName=we.Label.displayName;const Xe=g.forwardRef(({className:e,...t},n)=>o.jsx(we.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Xe.displayName=we.Separator.displayName;function it({className:e,...t}){return o.jsx("span",{className:y("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",e),...t})}it.displayname="MenubarShortcut";function Sm(){return o.jsxs(el,{className:"pr-twp tw-border-0 tw-bg-transparent",children:[o.jsxs(Zn,{children:[o.jsx(bn,{children:"File"}),o.jsxs(vn,{children:[o.jsxs(he,{children:["New Tab ",o.jsx(it,{children:"⌘T"})]}),o.jsxs(he,{children:["New Window ",o.jsx(it,{children:"⌘N"})]}),o.jsx(he,{disabled:!0,children:"New Incognito Window"}),o.jsx(Xe,{}),o.jsxs(gs,{children:[o.jsx(mo,{children:"Share"}),o.jsxs(ho,{children:[o.jsx(he,{children:"Email link"}),o.jsx(he,{children:"Messages"}),o.jsx(he,{children:"Notes"})]})]}),o.jsx(Xe,{}),o.jsxs(he,{children:["Print... ",o.jsx(it,{children:"⌘P"})]})]})]}),o.jsxs(Zn,{children:[o.jsx(bn,{children:"Edit"}),o.jsxs(vn,{children:[o.jsxs(he,{children:["Undo ",o.jsx(it,{children:"⌘Z"})]}),o.jsxs(he,{children:["Redo ",o.jsx(it,{children:"⇧⌘Z"})]}),o.jsx(Xe,{}),o.jsxs(gs,{children:[o.jsx(mo,{children:"Find"}),o.jsxs(ho,{children:[o.jsx(he,{children:"Search the web"}),o.jsx(Xe,{}),o.jsx(he,{children:"Find..."}),o.jsx(he,{children:"Find Next"}),o.jsx(he,{children:"Find Previous"})]})]}),o.jsx(Xe,{}),o.jsx(he,{children:"Cut"}),o.jsx(he,{children:"Copy"}),o.jsx(he,{children:"Paste"})]})]}),o.jsxs(Zn,{children:[o.jsx(bn,{children:"View"}),o.jsxs(vn,{children:[o.jsx(go,{children:"Always Show Bookmarks Bar"}),o.jsx(go,{checked:!0,children:"Always Show Full URLs"}),o.jsx(Xe,{}),o.jsxs(he,{inset:!0,children:["Reload ",o.jsx(it,{children:"⌘R"})]}),o.jsxs(he,{disabled:!0,inset:!0,children:["Force Reload ",o.jsx(it,{children:"⇧⌘R"})]}),o.jsx(Xe,{}),o.jsx(he,{inset:!0,children:"Toggle Fullscreen"}),o.jsx(Xe,{}),o.jsx(he,{inset:!0,children:"Hide Sidebar"})]})]}),o.jsxs(Zn,{children:[o.jsx(bn,{children:"Profiles"}),o.jsxs(vn,{children:[o.jsxs(jm,{value:"benoit",children:[o.jsx(nr,{value:"andy",children:"Andy"}),o.jsx(nr,{value:"benoit",children:"Benoit"}),o.jsx(nr,{value:"Luis",children:"Luis"})]}),o.jsx(Xe,{}),o.jsx(he,{inset:!0,children:"Edit..."}),o.jsx(Xe,{}),o.jsx(he,{inset:!0,children:"Add Profile..."})]})]})]})}function Em({menuProvider:e,commandHandler:t,className:n,id:r,children:a,configAreaChildren:s,useAsAppDragArea:i}){const l=g.useRef(void 0);return o.jsx("div",{className:y("tw-border tw-bg-muted tw-px-4 tw-text-muted-foreground",n),ref:l,style:{position:"relative"},id:r,children:o.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between",style:i?{WebkitAppRegion:"drag"}:void 0,children:[o.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:o.jsx("div",{className:"tw-flex tw-items-center",style:{WebkitAppRegion:"no-drag"},children:e?o.jsxs(o.Fragment,{children:[o.jsx(Qi,{commandHandler:t,containerRef:l,menuProvider:e}),o.jsx(Sm,{})," "]}):void 0})}),o.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:{WebkitAppRegion:"no-drag"},children:a}),o.jsx("div",{className:"tw-flex tw-grow tw-basis-0 tw-justify-end",children:o.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",style:{WebkitAppRegion:"no-drag"},children:s})})]})})}const Cm=Zt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),tl=g.forwardRef(({className:e,variant:t,...n},r)=>o.jsx("div",{ref:r,role:"alert",className:y(Cm({variant:t}),e),...n}));tl.displayName="Alert";const nl=g.forwardRef(({className:e,...t},n)=>o.jsxs("h5",{ref:n,className:y("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));nl.displayName="AlertTitle";const rl=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,className:y("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));rl.displayName="AlertDescription";const ol=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function al({className:e,variant:t,...n}){return o.jsx("div",{className:y("pr-twp",ol({variant:t}),e),...n})}const sl=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,className:y("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));sl.displayName="Card";const il=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));il.displayName="CardHeader";const ll=g.forwardRef(({className:e,...t},n)=>o.jsx("h3",{ref:n,className:y("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));ll.displayName="CardTitle";const cl=g.forwardRef(({className:e,...t},n)=>o.jsx("p",{ref:n,className:y("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));cl.displayName="CardDescription";const dl=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,className:y("pr-twp tw-p-6 tw-pt-0",e),...t}));dl.displayName="CardContent";const ul=g.forwardRef(({className:e,...t},n)=>o.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));ul.displayName="CardFooter";function Tm({...e}){return o.jsx(vs.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const pl=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsxs(fn.Root,{ref:n,className:y("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:r,children:[o.jsx(fn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:o.jsx(fn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),o.jsx(fn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});pl.displayName=fn.Root.displayName;const wl=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsx(eo.Root,{className:y("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:o.jsx(eo.Thumb,{className:y("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});wl.displayName=eo.Root.displayName;const Rm=Ie.Root,fl=g.forwardRef(({className:e,...t},n)=>{const r=Ne();return o.jsx(Ie.List,{ref:n,className:y("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t,dir:r})});fl.displayName=Ie.List.displayName;const ml=g.forwardRef(({className:e,...t},n)=>o.jsx(Ie.Trigger,{ref:n,className:y("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));ml.displayName=Ie.Trigger.displayName;const hl=g.forwardRef(({className:e,...t},n)=>o.jsx(Ie.Content,{ref:n,className:y("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));hl.displayName=Ie.Content.displayName;function Om({isInstalling:e,handleClick:t,buttonText:n,className:r,...a}){return o.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...a,children:e?o.jsx(tn,{size:15}):o.jsxs(o.Fragment,{children:[o.jsx(X.Download,{size:25,className:y("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function _m({isEnabling:e,handleClick:t,className:n,...r}){return o.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?o.jsxs(o.Fragment,{children:[o.jsx(tn,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function Pm({isDisabling:e,handleClick:t,className:n,...r}){return o.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?o.jsxs(o.Fragment,{children:[o.jsx(tn,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function Im({isUpdating:e,handleClick:t,className:n,...r}){return o.jsx(pe,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?o.jsxs(o.Fragment,{children:[o.jsx(tn,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function Mm({id:e,markdown:t,className:n,anchorTarget:r}){const a=g.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return o.jsx("div",{id:e,className:y("pr-twp tw-prose",n),children:o.jsx(Xl,{options:a,children:t})})}const gl=g.forwardRef((e,t)=>o.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[o.jsx(X.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",o.jsx(X.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var bl=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(bl||{});function $m({id:e,groups:t}){return o.jsx("div",{id:e,children:o.jsxs(wr,{children:[o.jsx(bo,{asChild:!0,children:o.jsx(gl,{})}),o.jsx(Pn,{children:t.map(n=>o.jsxs("div",{children:[o.jsx(Qt,{children:n.label}),o.jsx(js,{children:n.items.map(r=>o.jsx("div",{children:r.itemType===0?o.jsx(fr,{onClick:r.onClick,children:r.label}):o.jsx(xo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),o.jsx(In,{})]},n.label))})]})})}function Am({id:e,message:t}){return o.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:o.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:o.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function Dm({id:e,category:t,downloads:n,languages:r,moreInfoUrl:a}){const s=new J.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return o.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[o.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[o.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:o.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),o.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),o.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),o.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[o.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[o.jsx(X.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),o.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),o.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),o.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),o.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[o.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>o.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&o.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),o.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),o.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[o.jsxs("a",{href:a,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",o.jsx(X.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),o.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",o.jsx(X.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function vl({id:e,versionHistory:t}){const[n,r]=g.useState(!1),a=new Date;function s(l){const c=new Date(l),d=new Date(a.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,f=d.getUTCMonth(),w=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:f>0?b=`${f.toString()} month${f===1?"":"s"} ago`:w===0?b="today":b=`${w.toString()} day${w===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return o.jsxs("div",{id:e,children:[o.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),o.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>o.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[o.jsx("div",{className:"tw-text-gray-600",children:o.jsx("li",{className:"tw-prose tw-text-xs",children:o.jsx("span",{children:l[1].description})})}),o.jsxs("div",{className:"tw-justify-end tw-text-right",children:[o.jsxs("div",{children:["Version ",l[0]]}),o.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&o.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Bm({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:a}){const s=g.useMemo(()=>J.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return o.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:o.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[o.jsx(vl,{versionHistory:a}),o.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),o.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[o.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),o.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[o.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[o.jsx("span",{className:"tw-mb-2",children:"Publisher"}),o.jsx("span",{className:"tw-font-semibold",children:t}),o.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),o.jsx("span",{className:"tw-font-semibold",children:s})]}),o.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:o.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[o.jsx("span",{className:"tw-mb-2",children:"Languages"}),o.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function zm({entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:a,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d,badgesPlaceholder:u}){return o.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[o.jsx(Ws,{entries:e,getEntriesCount:t,selected:n,onChange:r,placeholder:a,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0?o.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(f=>{var w;return o.jsxs(al,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[o.jsx(pe,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(b=>b!==f)),children:o.jsx(X.X,{className:"tw-h-3 tw-w-3"})}),(w=e.find(b=>b.value===f))==null?void 0:w.label]},f)})}):o.jsx(Re,{children:u})]})}const Vm=(e,t)=>e[t]??t;function Fm({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:a,onFallbackLanguagesChange:s,localizedStrings:i,className:l}){const c=Vm(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=g.useState(!1),f=b=>{a&&a(b),r&&r([b,...n.filter(x=>x!==b)]),s&&n.find(x=>x===b)&&s([...n.filter(x=>x!==b)]),u(!1)},w=(b,x)=>{var h,j,S,E,k,v;const m=x!==b?((j=(h=e[b])==null?void 0:h.uiNames)==null?void 0:j[x])??((E=(S=e[b])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return m?`${(k=e[b])==null?void 0:k.autonym} (${m})`:(v=e[b])==null?void 0:v.autonym};return o.jsxs("div",{className:y("pr-twp tw-max-w-sm",l),children:[o.jsxs(St,{name:"uiLanguage",value:t,onValueChange:f,open:d,onOpenChange:b=>u(b),children:[o.jsx(ut,{children:o.jsx(Et,{})}),o.jsx(pt,{className:"tw-z-[250]",children:Object.keys(e).map(b=>o.jsx(Ae,{value:b,children:w(b,t)},b))})]}),t!=="en"&&o.jsxs(o.Fragment,{children:[o.jsx(Re,{className:"tw-ms-3",children:c}),o.jsx("div",{className:"tw-ms-3",children:o.jsxs(Re,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(b=>w(b,t)).join(", ")}`:`default (${e.en.autonym})`]})})]})]})}const Lm=(e,t)=>{g.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Jr=()=>!1,Gm=(e,t)=>{const[n]=ur(g.useCallback(async()=>{if(!e)return Jr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Jr,{preserveValue:!1});g.useEffect(()=>()=>{n!==Jr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>vs.toast});exports.Alert=tl;exports.AlertDescription=rl;exports.AlertTitle=nl;exports.BOOK_SELECTOR_STRING_KEYS=_c;exports.Badge=al;exports.BookChapterControl=jc;exports.BookSelectionMode=Ds;exports.BookSelector=Pc;exports.Button=pe;exports.Card=sl;exports.CardContent=dl;exports.CardDescription=cl;exports.CardFooter=ul;exports.CardHeader=il;exports.CardTitle=ll;exports.ChapterRangeSelector=As;exports.Checkbox=hr;exports.Checklist=kd;exports.ComboBox=or;exports.DataTable=Gs;exports.DisableButton=Pm;exports.DropdownMenu=wr;exports.DropdownMenuCheckboxItem=fr;exports.DropdownMenuContent=Pn;exports.DropdownMenuGroup=js;exports.DropdownMenuItem=vo;exports.DropdownMenuItemType=bl;exports.DropdownMenuLabel=Qt;exports.DropdownMenuPortal=Zl;exports.DropdownMenuRadioGroup=ec;exports.DropdownMenuRadioItem=xo;exports.DropdownMenuSeparator=In;exports.DropdownMenuShortcut=Es;exports.DropdownMenuSub=Ql;exports.DropdownMenuSubContent=Ss;exports.DropdownMenuSubTrigger=ks;exports.DropdownMenuTrigger=bo;exports.EnableButton=_m;exports.Filter=zm;exports.FilterButton=gl;exports.FilterDropdown=$m;exports.Footer=Bm;exports.GridMenu=Zi;exports.HamburgerMenuButton=Qi;exports.INVENTORY_STRING_KEYS=Fc;exports.IconButton=ym;exports.Input=_t;exports.InstallButton=Om;exports.Inventory=Uc;exports.Label=Re;exports.MarkdownRenderer=Mm;exports.MenuItem=ia;exports.MoreInfo=Dm;exports.MultiSelectComboBox=Ws;exports.NavigationContentSearch=qc;exports.NoExtensionsFound=Am;exports.Popover=So;exports.PopoverContent=mr;exports.PopoverTrigger=Eo;exports.RadioGroup=ko;exports.RadioGroupItem=rr;exports.ScriptureResultsViewer=vd;exports.ScrollGroupSelector=xd;exports.SearchBar=$o;exports.Select=St;exports.SelectContent=pt;exports.SelectGroup=Bs;exports.SelectItem=Ae;exports.SelectLabel=zs;exports.SelectScrollDownButton=Io;exports.SelectScrollUpButton=Po;exports.SelectSeparator=Vs;exports.SelectTrigger=ut;exports.SelectValue=Et;exports.Separator=br;exports.SettingsList=yd;exports.SettingsListHeader=jd;exports.SettingsListItem=Nd;exports.SettingsSidebar=si;exports.SettingsSidebarContentSearch=ud;exports.Slider=pl;exports.Sonner=Tm;exports.Spinner=tn;exports.Switch=wl;exports.Table=Mn;exports.TableBody=An;exports.TableCaption=Ls;exports.TableCell=Ct;exports.TableFooter=Fs;exports.TableHead=Ut;exports.TableHeader=$n;exports.TableRow=nt;exports.Tabs=Rm;exports.TabsContent=hl;exports.TabsList=fl;exports.TabsTrigger=ml;exports.TextField=Nm;exports.ToggleGroup=Mo;exports.ToggleGroupItem=yn;exports.Toolbar=Em;exports.UiLanguageSelector=Fm;exports.UpdateButton=Im;exports.VersionHistory=vl;exports.VerticalTabs=Ao;exports.VerticalTabsContent=Bo;exports.VerticalTabsList=Do;exports.VerticalTabsTrigger=Ks;exports.badgeVariants=ol;exports.buttonVariants=Is;exports.cn=y;exports.getBookNumFromId=qs;exports.getLinesFromUSFM=Us;exports.getNumberFromUSFM=to;exports.getStatusForItem=Hs;exports.inventoryCountColumn=zc;exports.inventoryItemColumn=Dc;exports.inventoryStatusColumn=Vc;exports.useEvent=Lm;exports.useEventAsync=Gm;exports.usePromise=ur;function Um(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(a,r):n.appendChild(a)}Um(`*, ::before, ::after {
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

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 90%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }
  * {
  border-color: hsl(var(--border));
}

  body {
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
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
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
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
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
.tw-right-auto {
  right: auto;
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
.tw-z-30 {
  z-index: 30;
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
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
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
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
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
.tw-mt-20 {
  margin-top: 5rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
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
.tw-h-1\\/2 {
  height: 50%;
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
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/3 {
  width: 33.333333%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
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
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
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
.tw-w-9 {
  width: 2.25rem;
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
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
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
.tw-w-\\[5px\\] {
  width: 5px;
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
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-lg {
  max-width: 32rem;
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
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
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
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
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
.tw-cursor-not-allowed {
  cursor: not-allowed;
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
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
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
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
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
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
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
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
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
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
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
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
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
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pl-1 {
  padding-left: 0.25rem;
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
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
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
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
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
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
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
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
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
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
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
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
}

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

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
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

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}

.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
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

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
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

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
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

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
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

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
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

@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}

@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
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

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}

.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}

.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}

.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}

.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}

.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
}

@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
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
.papi-icon-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
}

.papi-icon-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-icon-button.secondary {
  background-color: transparent;
  color: #333;
}

.papi-icon-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-icon-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-multi-column-menu {
  background-color: rgb(222, 222, 222);
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu-column {
  font-size: 11pt;
  font-weight: 600;
  padding-bottom: 2px;
}

.papi-menu-column ul {
  padding-top: 0;
}

.papi-menu-column-header {
  background-color: rgb(181, 181, 181);
  padding-left: 24px;
  margin-top: 0;
  margin-bottom: 0;
}

.papi-multi-column-menu.paratext {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-multi-column-menu.paratext.bright {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
}
.papi-menu-item {
  background-color: transparent;
}

.papi-menu-icon-trailing {
  margin-left: 10px;
  place-content: flex-end;
}

.papi-menu-item img {
  max-width: 24px;
  max-height: 24px;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}
`,"top");
//# sourceMappingURL=index.cjs.map
