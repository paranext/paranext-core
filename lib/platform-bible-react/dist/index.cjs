"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),h=require("react"),ce=require("clsx"),$l=require("tailwind-merge"),Es=require("@radix-ui/react-dropdown-menu"),K=require("lucide-react"),J=require("platform-bible-utils"),Qe=require("@radix-ui/react-slot"),_e=require("class-variance-authority"),Dl=require("@radix-ui/react-label"),Al=require("@radix-ui/react-radio-group"),Bl=require("@radix-ui/react-popover"),Pt=require("cmdk"),zl=require("@radix-ui/react-dialog"),Et=require("@tanstack/react-table"),Vl=require("@radix-ui/react-select"),Fl=require("@radix-ui/react-checkbox"),Ll=require("@radix-ui/react-toggle-group"),Gl=require("@radix-ui/react-toggle"),Ul=require("@radix-ui/react-tabs"),ql=require("@radix-ui/react-separator"),Xl=require("@radix-ui/react-tooltip"),so=require("@mui/styled-engine"),Yt=require("@mui/material"),fn=require("react-dom"),Hl=require("@radix-ui/react-menubar"),Cs=require("sonner"),Yl=require("@radix-ui/react-slider"),Wl=require("@radix-ui/react-switch"),Kl=require("markdown-to-jsx");function St(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const n in t)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:()=>t[n]})}}return e.default=t,Object.freeze(e)}const A=St(h),ft=St(Es),Ts=St(Dl),Sn=St(Al),En=St(Bl),Jt=St(zl),vt=St(Vl),io=St(Fl),br=St(Ll),Rs=St(Gl),It=St(Ul),Os=St(ql),_n=St(Xl),Jl=St(fn),wt=St(Hl),mn=St(Yl),lo=St(Wl),Zl=$l.extendTailwindMerge({prefix:"tw-"});function y(...t){return Zl(ce.clsx(t))}const Pe=h.forwardRef(({className:t,type:e,...n},r)=>a.jsx("input",{type:e,className:y("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...n}));Pe.displayName="Input";const Ql=h.forwardRef(({handleSearch:t,handleKeyDown:e,handleOnClick:n,handleSubmit:r,className:o,...s},i)=>a.jsx("div",{className:"tw-relative",children:a.jsx(Pe,{...s,type:"text",className:y("tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:l=>t(l.target.value),onKeyDown:l=>{l.key==="Enter"&&r(),e(l)},onClick:n,ref:i})})),tc="layoutDirection";function Nt(){const t=localStorage.getItem(tc);return t==="rtl"?t:"ltr"}const vr=ft.Root,ko=ft.Trigger,_s=ft.Group,ec=ft.Portal,nc=ft.Sub,rc=ft.RadioGroup,Ps=h.forwardRef(({className:t,inset:e,children:n,...r},o)=>a.jsxs(ft.SubTrigger,{ref:o,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t),...r,children:[n,a.jsx(K.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Ps.displayName=ft.SubTrigger.displayName;const Is=h.forwardRef(({className:t,...e},n)=>a.jsx(ft.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Is.displayName=ft.SubContent.displayName;const Pn=h.forwardRef(({className:t,sideOffset:e=4,children:n,...r},o)=>{const s=Nt();return a.jsx(ft.Portal,{children:a.jsx(ft.Content,{ref:o,sideOffset:e,className:y("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:a.jsx("div",{dir:s,children:n})})})});Pn.displayName=ft.Content.displayName;const So=h.forwardRef(({className:t,inset:e,...n},r)=>{const o=Nt();return a.jsx(ft.Item,{ref:r,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...n,dir:o})});So.displayName=ft.Item.displayName;const xr=h.forwardRef(({className:t,children:e,checked:n,...r},o)=>a.jsxs(ft.CheckboxItem,{ref:o,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(ft.ItemIndicator,{children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));xr.displayName=ft.CheckboxItem.displayName;const Eo=h.forwardRef(({className:t,children:e,...n},r)=>a.jsxs(ft.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[a.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:a.jsx(ft.ItemIndicator,{children:a.jsx(K.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Eo.displayName=ft.RadioItem.displayName;const In=h.forwardRef(({className:t,inset:e,...n},r)=>a.jsx(ft.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));In.displayName=ft.Label.displayName;const Mn=h.forwardRef(({className:t,...e},n)=>a.jsx(ft.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Mn.displayName=ft.Separator.displayName;function Ms({className:t,...e}){return a.jsx("span",{className:y("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Ms.displayName="DropdownMenuShortcut";var oc=Object.defineProperty,ac=(t,e,n)=>e in t?oc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,rt=(t,e,n)=>ac(t,typeof e!="symbol"?e+"":e,n);const ke=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Co=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],$s=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Ta=mc();function tn(t,e=!0){return e&&(t=t.toUpperCase()),t in Ta?Ta[t]:0}function To(t){return tn(t)>0}function sc(t){const e=typeof t=="string"?tn(t):t;return e>=40&&e<=66}function ic(t){return(typeof t=="string"?tn(t):t)<=39}function Ds(t){return t<=66}function lc(t){const e=typeof t=="string"?tn(t):t;return zs(e)&&!Ds(e)}function*cc(){for(let t=1;t<=ke.length;t++)yield t}const dc=1,As=ke.length;function uc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Ro(t,e="***"){const n=t-1;return n<0||n>=ke.length?e:ke[n]}function Bs(t){return t<=0||t>As?"******":$s[t-1]}function pc(t){return Bs(tn(t))}function zs(t){const e=typeof t=="number"?Ro(t):t;return To(e)&&!Co.includes(e)}function wc(t){const e=typeof t=="number"?Ro(t):t;return To(e)&&Co.includes(e)}function fc(t){return $s[t-1].includes("*obsolete*")}function mc(){const t={};for(let e=0;e<ke.length;e++)t[ke[e]]=e+1;return t}const st={allBookIds:ke,nonCanonicalIds:Co,bookIdToNumber:tn,isBookIdValid:To,isBookNT:sc,isBookOT:ic,isBookOTNT:Ds,isBookDC:lc,allBookNumbers:cc,firstBook:dc,lastBook:As,extraBooks:uc,bookNumberToId:Ro,bookNumberToEnglishName:Bs,bookIdToEnglishName:pc,isCanonical:zs,isExtraMaterial:wc,isObsolete:fc};var Wt=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Wt||{});const $t=class{constructor(e){if(rt(this,"name"),rt(this,"fullPath"),rt(this,"isPresent"),rt(this,"hasVerseSegments"),rt(this,"isCustomized"),rt(this,"baseVersification"),rt(this,"scriptureBooks"),rt(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=Wt[e]):(this._type=e,this.name=Wt[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};rt($t,"Original",new $t(Wt.Original)),rt($t,"Septuagint",new $t(Wt.Septuagint)),rt($t,"Vulgate",new $t(Wt.Vulgate)),rt($t,"English",new $t(Wt.English)),rt($t,"RussianProtestant",new $t(Wt.RussianProtestant)),rt($t,"RussianOrthodox",new $t(Wt.RussianOrthodox));let be=$t;function Ra(t,e){const n=e[0];for(let r=1;r<e.length;r++)t=t.split(e[r]).join(n);return t.split(n)}var Vs=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Vs||{});const Tt=class at{constructor(e,n,r,o){if(rt(this,"firstChapter"),rt(this,"lastChapter"),rt(this,"lastVerse"),rt(this,"hasSegmentsDefined"),rt(this,"text"),rt(this,"BBBCCCVVVS"),rt(this,"longHashCode"),rt(this,"versification"),rt(this,"rtlMark","‏"),rt(this,"_bookNum",0),rt(this,"_chapterNum",0),rt(this,"_verseNum",0),rt(this,"_verse"),r==null&&o==null)if(e!=null&&typeof e=="string"){const s=e,i=n!=null&&n instanceof be?n:void 0;this.setEmpty(i),this.parse(s)}else if(e!=null&&typeof e=="number"){const s=n!=null&&n instanceof be?n:void 0;this.setEmpty(s),this._verseNum=e%at.chapterDigitShifter,this._chapterNum=Math.floor(e%at.bookDigitShifter/at.chapterDigitShifter),this._bookNum=Math.floor(e/at.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof at){const s=e;this._bookNum=s.bookNum,this._chapterNum=s.chapterNum,this._verseNum=s.verseNum,this._verse=s.verse,this.versification=s.versification}else{if(e==null)return;const s=e instanceof be?e:at.defaultVersification;this.setEmpty(s)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=o??at.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=new at(e),{success:!0,verseRef:n}}catch(r){if(r instanceof ln)return n=new at,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%at.bcvMaxValue*at.bookDigitShifter+(n>=0?n%at.bcvMaxValue*at.chapterDigitShifter:0)+(r>=0?r%at.bcvMaxValue:0)}static fromJSON(e){const{book:n,chapterNum:r,verseNum:o,verse:s,versificationStr:i}=e,l=s||o.toString();let c;return i&&(c=new be(i)),n?new at(n,r.toString(),l,c):new at}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<e.length;o++){if(r=e[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>at.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(at.verseRangeSeparator)||this._verse.includes(at.verseSequenceIndicator))}get book(){return st.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=st.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=at.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=at.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>st.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new be(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(at.verseRangeSeparators,at.verseSequenceIndicators)}get BBBCCC(){return at.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return at.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const s=e.split("/");if(e=s[0],s.length>1)try{const i=+s[1].trim();this.versification=new be(Wt[i])}catch{throw new ln("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+e);const r=n[1].split(":"),o=+r[0];if(r.length!==2||st.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!at.isVerseParseable(r[1]))throw new ln("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new at(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete n.verse,n}equals(e){return e instanceof at?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,n=at.verseRangeSeparators,r=at.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],s=Ra(this._verse,r);for(const i of s.map(l=>Ra(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!e)for(let u=c+1;u<d.verseNum;u++){const m=new at(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(m)}o.push(d)}}return o}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,e,n)){const s=o.internalValid;if(s!==0)return s;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>st.lastBook?2:(st.isCanonical(this._bookNum),0)}setEmpty(e=at.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=st.bookIdToNumber(e),this.chapter=n,this.verse=r}};rt(Tt,"defaultVersification",be.English),rt(Tt,"verseRangeSeparator","-"),rt(Tt,"verseSequenceIndicator",","),rt(Tt,"verseRangeSeparators",[Tt.verseRangeSeparator]),rt(Tt,"verseSequenceIndicators",[Tt.verseSequenceIndicator]),rt(Tt,"chapterDigitShifter",1e3),rt(Tt,"bookDigitShifter",Tt.chapterDigitShifter*Tt.chapterDigitShifter),rt(Tt,"bcvMaxValue",Tt.chapterDigitShifter-1),rt(Tt,"ValidStatusType",Vs);class ln extends Error{}const hc=h.forwardRef(({bookId:t,handleSelectBook:e,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:s,children:i},l)=>a.jsxs(So,{ref:l,textValue:t,className:y("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),e()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[a.jsx("span",{className:y("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-s-red-200":s.toLowerCase()==="ot","tw-border-s-purple-200":s.toLowerCase()==="nt","tw-border-s-indigo-200":s.toLowerCase()==="dc"}),children:st.bookIdToEnglishName(t)}),n&&a.jsx("div",{children:i})]},t));function gc({handleSelectChapter:t,endChapter:e,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const s=Array.from({length:e},(l,c)=>c+1),i=h.useCallback(l=>{o(l)},[o]);return a.jsx("div",{className:y("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:s.map(l=>a.jsx("div",{className:y("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),t(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&t(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}const Oo=st.allBookIds.filter(t=>!st.isObsolete(st.bookIdToNumber(t))),bc={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Oa=["OT","NT","DC"],vc=96,xc=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],cn=t=>J.getChaptersForBook(st.bookIdToNumber(t));function yc(){return Oo.map(e=>st.bookIdToEnglishName(e))}function Nc(t){return yc().includes(t)}function jc(t){const e=t.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Nc(e))return Oo.find(r=>st.bookIdToEnglishName(r)===e)}function kc({scrRef:t,handleSubmit:e,className:n,getActiveBookIds:r}){const o=Nt(),[s,i]=h.useState(""),[l,c]=h.useState(st.bookNumberToId(t.bookNum)),[d,u]=h.useState(t.chapterNum??0),[m,w]=h.useState(st.bookNumberToId(t.bookNum)),[g,v]=h.useState(!1),[f,b]=h.useState(g),j=h.useRef(void 0),S=h.useRef(void 0),E=h.useRef(void 0),k=h.useCallback(D=>{const I=r?r():Oo;return{OT:I.filter(M=>st.isBookOT(M)),NT:I.filter(M=>st.isBookNT(M)),DC:I.filter(M=>st.isBookDC(M))}[D].filter(M=>{const L=st.bookIdToEnglishName(M).toLowerCase(),X=s.replace(/[^a-zA-Z]/g,"").toLowerCase();return L.includes(X)||M.toLowerCase().includes(X)})},[s,r]),x=D=>{i(D)},O=h.useRef(!1),V=h.useCallback(D=>{if(O.current){O.current=!1;return}v(D)},[]),C=h.useCallback((D,I,M,L)=>{if(u(st.bookNumberToId(t.bookNum)!==D?1:t.chapterNum),I||cn(D)===-1){e({bookNum:st.bookIdToNumber(D),chapterNum:M||1,verseNum:L||1}),v(!1),i("");return}c(l!==D?D:""),v(!I)},[e,t.bookNum,t.chapterNum,l]),_=D=>{D<=0||D>cn(l)||C(l,!0,D)},F=h.useCallback(()=>{xc.forEach(D=>{const I=s.match(D);if(I){const[M,L=void 0,X=void 0]=I.slice(1),ot=jc(M);(st.isBookIdValid(M)||ot)&&C(ot??M,!0,L?parseInt(L,10):1,X?parseInt(X,10):1)}})},[C,s]),$=h.useCallback(D=>{g?(D.key==="ArrowDown"||D.key==="ArrowUp")&&(typeof E<"u"&&E.current!==null?E.current.focus():typeof S<"u"&&S.current!==null&&S.current.focus(),D.preventDefault()):v(!0)},[g]),et=D=>{const{key:I}=D;I==="ArrowRight"||I==="ArrowLeft"||I==="ArrowDown"||I==="ArrowUp"||I==="Enter"||(j.current.dispatchEvent(new KeyboardEvent("keydown",{key:I})),j.current.focus())},Z=D=>{const{key:I}=D;if(m===l){if(I==="Enter"){D.preventDefault(),C(l,!0,d);return}const M=I==="ArrowRight"&&!o||I==="ArrowRight"&&o==="ltr"||I==="ArrowLeft"&&o==="rtl",L=I==="ArrowLeft"&&!o||I==="ArrowLeft"&&o==="ltr"||I==="ArrowRight"&&o==="rtl";let X=0;if(M)if(d<cn(m))X=1;else{D.preventDefault();return}else if(L)if(d>1)X=-1;else{D.preventDefault();return}else I==="ArrowDown"?X=6:I==="ArrowUp"&&(X=-6);d+X<=0||d+X>cn(m)?u(0):X!==0&&(u(d+X),D.preventDefault())}};return h.useEffect(()=>{l===m?l===st.bookNumberToId(t.bookNum)?u(t.chapterNum):u(1):u(0)},[m,t.bookNum,t.chapterNum,l]),h.useLayoutEffect(()=>{b(g)},[g]),h.useLayoutEffect(()=>{const D=setTimeout(()=>{if(f&&S.current&&E.current){const M=E.current.offsetTop-vc;S.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(D)}},[f]),a.jsx("div",{className:"pr-twp tw-flex",children:a.jsxs(vr,{modal:!1,open:g,onOpenChange:V,children:[a.jsx(ko,{asChild:!0,children:a.jsx(Ql,{ref:j,value:s,handleSearch:x,handleKeyDown:$,handleOnClick:()=>{c(st.bookNumberToId(t.bookNum)),w(st.bookNumberToId(t.bookNum)),u(t.chapterNum>0?t.chapterNum:0),v(!0),j.current.focus()},onFocus:()=>{O.current=!0},handleSubmit:F,placeholder:`${st.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`,className:n})}),a.jsx(Pn,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:et,align:o==="ltr"?"start":"end",ref:S,children:a.jsx("div",{className:"rtl:tw-ps-2",children:Oa.map((D,I)=>{const M=k(D);return M.length>0&&a.jsxs("div",{children:[a.jsx(In,{className:"tw-font-semibold tw-text-foreground/80",children:bc[D]}),M.map(L=>a.jsx("div",{children:a.jsx(hc,{bookId:L,handleSelectBook:()=>C(L,!1),isSelected:l===L,handleHighlightBook:()=>w(L),handleKeyDown:Z,bookType:D,ref:X=>{l===L&&(E.current=X)},children:a.jsx(gc,{handleSelectChapter:_,endChapter:cn(L),activeChapter:t.bookNum===st.bookIdToNumber(L)?t.chapterNum:0,highlightedChapter:d,handleHighlightedChapter:X=>{u(X)}})})},L)),Oa.length-1!==I?a.jsx(Mn,{}):void 0]},D)})})})]})})}const Fs=_e.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pt=h.forwardRef(({className:t,variant:e,size:n,asChild:r=!1,...o},s)=>{const i=r?Qe.Slot:"button";return a.jsx(i,{className:y(Fs({variant:e,size:n,className:t})),ref:s,...o})});pt.displayName="Button";const Sc=_e.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Rt=h.forwardRef(({className:t,...e},n)=>a.jsx(Ts.Root,{ref:n,className:y("pr-twp",Sc(),t),...e}));Rt.displayName=Ts.Root.displayName;const _o=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsx(Sn.Root,{className:y("pr-twp tw-grid tw-gap-2",t),...e,ref:n,dir:r})});_o.displayName=Sn.Root.displayName;const ir=h.forwardRef(({className:t,...e},n)=>a.jsx(Sn.Item,{ref:n,className:y("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:a.jsx(Sn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:a.jsx(K.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ir.displayName=Sn.Item.displayName;const Po=En.Root,Io=En.Trigger,yr=h.forwardRef(({className:t,align:e="center",sideOffset:n=4,...r},o)=>{const s=Nt();return a.jsx(En.Portal,{children:a.jsx(En.Content,{ref:o,align:e,sideOffset:n,className:y("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,dir:s})})});yr.displayName=En.Content.displayName;const Ec=Jt.Portal,Ls=h.forwardRef(({className:t,...e},n)=>a.jsx(Jt.Overlay,{ref:n,className:y("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Ls.displayName=Jt.Overlay.displayName;const Cc=h.forwardRef(({className:t,children:e,...n},r)=>{const o=Nt();return a.jsxs(Ec,{children:[a.jsx(Ls,{}),a.jsxs(Jt.Content,{ref:r,className:y("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...n,dir:o,children:[e,a.jsxs(Jt.Close,{className:y("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[a.jsx(K.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Cc.displayName=Jt.Content.displayName;const Tc=h.forwardRef(({className:t,...e},n)=>a.jsx(Jt.Title,{ref:n,className:y("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Tc.displayName=Jt.Title.displayName;const Rc=h.forwardRef(({className:t,...e},n)=>a.jsx(Jt.Description,{ref:n,className:y("tw-text-sm tw-text-muted-foreground",t),...e}));Rc.displayName=Jt.Description.displayName;const Mo=h.forwardRef(({className:t,...e},n)=>a.jsx(Pt.Command,{ref:n,className:y("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Mo.displayName=Pt.Command.displayName;const $o=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[a.jsx(K.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),a.jsx(Pt.Command.Input,{ref:n,className:y("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});$o.displayName=Pt.Command.Input.displayName;const Do=h.forwardRef(({className:t,...e},n)=>a.jsx(Pt.Command.List,{ref:n,className:y("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Do.displayName=Pt.Command.List.displayName;const Ao=h.forwardRef((t,e)=>a.jsx(Pt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ao.displayName=Pt.Command.Empty.displayName;const Gs=h.forwardRef(({className:t,...e},n)=>a.jsx(Pt.Command.Group,{ref:n,className:y("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Gs.displayName=Pt.Command.Group.displayName;const Oc=h.forwardRef(({className:t,...e},n)=>a.jsx(Pt.Command.Separator,{ref:n,className:y("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Oc.displayName=Pt.Command.Separator.displayName;const Bo=h.forwardRef(({className:t,...e},n)=>a.jsx(Pt.Command.Item,{ref:n,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Bo.displayName=Pt.Command.Item.displayName;function _c(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function lr({id:t,options:e=[],className:n,buttonClassName:r,popoverContentClassName:o,value:s,onChange:i=()=>{},getOptionLabel:l=_c,icon:c=void 0,buttonPlaceholder:d="",textPlaceholder:u="",commandEmptyMessage:m="No option found",buttonVariant:w="outline",alignDropDown:g="start",isDisabled:v=!1,...f}){const[b,j]=h.useState(!1);return a.jsxs(Po,{open:b,onOpenChange:j,...f,children:[a.jsx(Io,{asChild:!0,children:a.jsxs(pt,{variant:w,role:"combobox","aria-expanded":b,id:t,className:y("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:v,children:[a.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&a.jsx("div",{className:"tw-pe-2",children:c}),a.jsx("span",{className:y("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",{"tw-text-muted-foreground":!s}),children:s?l(s):d})]}),a.jsx(K.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(yr,{align:g,className:y("tw-w-[200px] tw-p-0",o),children:a.jsxs(Mo,{children:[a.jsx($o,{placeholder:u,className:"tw-text-inherit"}),a.jsx(Ao,{children:m}),a.jsx(Do,{children:e.map(S=>a.jsxs(Bo,{value:l(S),onSelect:()=>{i(S),j(!1)},children:[a.jsx(K.Check,{className:y("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!s||l(s)!==l(S)})}),l(S)]},l(S)))})]})})]})}function Us({startChapter:t,endChapter:e,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:s}){const i=h.useMemo(()=>Array.from({length:s},(d,u)=>u+1),[s]),l=d=>{n(d),d>e&&r(d)},c=d=>{r(d),d<t&&n(d)};return a.jsxs(a.Fragment,{children:[a.jsx(Rt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),a.jsx(lr,{isDisabled:o,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"start chapter"),a.jsx(Rt,{htmlFor:"end-chapters-combobox",children:"to"}),a.jsx(lr,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var qs=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(qs||{});const Pc=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),qr=(t,e)=>t[e]??e;function Ic({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:s,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=qr(d,"%webView_bookSelector_currentBook%"),m=qr(d,"%webView_bookSelector_choose%"),w=qr(d,"%webView_bookSelector_chooseBooks%"),[g,v]=h.useState("current book"),f=b=>{v(b),t(b)};return a.jsx(_o,{className:"pr-twp tw-flex",value:g,onValueChange:b=>f(b),children:a.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(ir,{value:"current book"}),a.jsx(Rt,{className:"tw-ms-1",children:u})]}),a.jsx(Rt,{className:"tw-flex tw-items-center",children:e}),a.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:a.jsx(Us,{isDisabled:g==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:s})})]}),a.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[a.jsxs("div",{className:"tw-flex tw-items-center",children:[a.jsx(ir,{value:"choose books"}),a.jsx(Rt,{className:"tw-ms-1",children:w})]}),a.jsx(Rt,{className:"tw-flex tw-items-center",children:r.map(b=>st.bookIdToEnglishName(b)).join(", ")}),a.jsx(pt,{disabled:g==="current book",onClick:()=>n(),children:m})]})]})})}function Mc({table:t}){return a.jsxs(vr,{children:[a.jsx(Es.DropdownMenuTrigger,{asChild:!0,children:a.jsxs(pt,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[a.jsx(K.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),a.jsxs(Pn,{align:"end",className:"tw-w-[150px]",children:[a.jsx(In,{children:"Toggle columns"}),a.jsx(Mn,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>a.jsx(xr,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:n=>e.toggleVisibility(!!n),children:e.id},e.id))]})]})}const Se=vt.Root,Xs=vt.Group,Ee=vt.Value,ue=h.forwardRef(({className:t,children:e,...n},r)=>{const o=Nt();return a.jsxs(vt.Trigger,{ref:r,className:y("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",t),...n,dir:o,children:[e,a.jsx(vt.Icon,{asChild:!0,children:a.jsx(K.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});ue.displayName=vt.Trigger.displayName;const zo=h.forwardRef(({className:t,...e},n)=>a.jsx(vt.ScrollUpButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:a.jsx(K.ChevronUp,{className:"tw-h-4 tw-w-4"})}));zo.displayName=vt.ScrollUpButton.displayName;const Vo=h.forwardRef(({className:t,...e},n)=>a.jsx(vt.ScrollDownButton,{ref:n,className:y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:a.jsx(K.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Vo.displayName=vt.ScrollDownButton.displayName;const pe=h.forwardRef(({className:t,children:e,position:n="popper",...r},o)=>{const s=Nt();return a.jsx(vt.Portal,{children:a.jsxs(vt.Content,{ref:o,className:y("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:n,...r,children:[a.jsx(zo,{}),a.jsx(vt.Viewport,{className:y("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:a.jsx("div",{dir:s,children:e})}),a.jsx(Vo,{})]})})});pe.displayName=vt.Content.displayName;const Hs=h.forwardRef(({className:t,...e},n)=>a.jsx(vt.Label,{ref:n,className:y("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Hs.displayName=vt.Label.displayName;const Dt=h.forwardRef(({className:t,children:e,...n},r)=>a.jsxs(vt.Item,{ref:r,className:y("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[a.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(vt.ItemIndicator,{children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}),a.jsx(vt.ItemText,{children:e})]}));Dt.displayName=vt.Item.displayName;const Ys=h.forwardRef(({className:t,...e},n)=>a.jsx(vt.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ys.displayName=vt.Separator.displayName;function $c({table:t}){return a.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[a.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),a.jsxs(Se,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[a.jsx(ue,{className:"tw-h-8 tw-w-[70px]",children:a.jsx(Ee,{placeholder:t.getState().pagination.pageSize})}),a.jsx(pe,{side:"top",children:[10,20,30,40,50].map(e=>a.jsx(Dt,{value:`${e}`,children:e},e))})]})]}),a.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),a.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[a.jsxs(pt,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),a.jsx(K.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pt,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),a.jsx(K.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pt,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),a.jsx(K.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),a.jsxs(pt,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[a.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),a.jsx(K.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const $n=h.forwardRef(({className:t,stickyHeader:e,...n},r)=>a.jsx("div",{className:y("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!e}),children:a.jsx("table",{ref:r,className:y("tw-w-full tw-caption-bottom tw-text-sm",t),...n})}));$n.displayName="Table";const Dn=h.forwardRef(({className:t,stickyHeader:e,...n},r)=>a.jsx("thead",{ref:r,className:y({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...n}));Dn.displayName="TableHeader";const An=h.forwardRef(({className:t,...e},n)=>a.jsx("tbody",{ref:n,className:y("[&_tr:last-child]:tw-border-0",t),...e}));An.displayName="TableBody";const Ws=h.forwardRef(({className:t,...e},n)=>a.jsx("tfoot",{ref:n,className:y("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Ws.displayName="TableFooter";const ne=h.forwardRef(({className:t,...e},n)=>a.jsx("tr",{ref:n,className:y("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",t),...e}));ne.displayName="TableRow";const Xe=h.forwardRef(({className:t,...e},n)=>a.jsx("th",{ref:n,className:y("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Xe.displayName="TableHead";const Ce=h.forwardRef(({className:t,...e},n)=>a.jsx("td",{ref:n,className:y("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ce.displayName="TableCell";const Ks=h.forwardRef(({className:t,...e},n)=>a.jsx("caption",{ref:n,className:y("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Ks.displayName="TableCaption";function Js({columns:t,data:e,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:s=!1,onRowClickHandler:i=()=>{}}){var b;const[l,c]=h.useState([]),[d,u]=h.useState([]),[m,w]=h.useState({}),[g,v]=h.useState({}),f=Et.useReactTable({data:e,columns:t,getCoreRowModel:Et.getCoreRowModel(),...n&&{getPaginationRowModel:Et.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Et.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Et.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:v,state:{sorting:l,columnFilters:d,columnVisibility:m,rowSelection:g}});return a.jsxs("div",{className:"pr-twp",children:[o&&a.jsx(Mc,{table:f}),a.jsxs($n,{stickyHeader:s,children:[a.jsx(Dn,{stickyHeader:s,children:f.getHeaderGroups().map(j=>a.jsx(ne,{children:j.headers.map(S=>a.jsx(Xe,{children:S.isPlaceholder?void 0:Et.flexRender(S.column.columnDef.header,S.getContext())},S.id))},j.id))}),a.jsx(An,{children:(b=f.getRowModel().rows)!=null&&b.length?f.getRowModel().rows.map(j=>a.jsx(ne,{onClick:()=>i(j,f),"data-state":j.getIsSelected()&&"selected",children:j.getVisibleCells().map(S=>a.jsx(Ce,{children:Et.flexRender(S.column.columnDef.cell,S.getContext())},S.id))},j.id)):a.jsx(ne,{children:a.jsx(Ce,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[a.jsx(pt,{variant:"outline",size:"sm",onClick:()=>f.previousPage(),disabled:!f.getCanPreviousPage(),children:"Previous"}),a.jsx(pt,{variant:"outline",size:"sm",onClick:()=>f.nextPage(),disabled:!f.getCanNextPage(),children:"Next"})]}),n&&r&&a.jsx($c,{table:f})]})}function Dc({occurrenceData:t,setScriptureReference:e,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],s=h.useMemo(()=>{const i=[];return t.forEach(l=>{i.some(c=>J.deepEqual(c,l))||i.push(l)}),i},[t]);return a.jsxs($n,{stickyHeader:!0,children:[a.jsx(Dn,{stickyHeader:!0,children:a.jsxs(ne,{children:[a.jsx(Xe,{children:r}),a.jsx(Xe,{children:o})]})}),a.jsx(An,{children:s.length>0&&s.map(i=>a.jsxs(ne,{onClick:()=>{e(i.reference)},children:[a.jsx(Ce,{children:`${st.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),a.jsx(Ce,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const Nr=h.forwardRef(({className:t,...e},n)=>a.jsx(io.Root,{ref:n,className:y("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:a.jsx(io.Indicator,{className:y("tw-flex tw-items-center tw-justify-center tw-text-current"),children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}));Nr.displayName=io.Root.displayName;const Zs=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),co=t=>{const e=/^\\[vc]\s+(\d+)/,n=t.match(e);if(n)return+n[1]},Qs=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?st.bookIdToNumber(e[1]):0},ti=(t,e,n)=>n.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",ei=_e.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ac=h.forwardRef(({className:t,variant:e,size:n,...r},o)=>a.jsx(Rs.Root,{ref:o,className:y(ei({variant:e,size:n,className:t})),...r}));Ac.displayName=Rs.Root.displayName;const ni=h.createContext({size:"default",variant:"default"}),Fo=h.forwardRef(({className:t,variant:e,size:n,children:r,...o},s)=>{const i=Nt();return a.jsx(br.Root,{ref:s,className:y("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:i,children:a.jsx(ni.Provider,{value:{variant:e,size:n},children:r})})});Fo.displayName=br.Root.displayName;const yn=h.forwardRef(({className:t,children:e,variant:n,size:r,...o},s)=>{const i=h.useContext(ni);return a.jsx(br.Item,{ref:s,className:y(ei({variant:i.variant||n,size:i.size||r}),t),...o,children:e})});yn.displayName=br.Item.displayName;const jr=t=>t==="asc"?a.jsx(K.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?a.jsx(K.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):a.jsx(K.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Bc=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>a.jsxs(pt,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,jr(e.getIsSorted())]})}),zc=(t,e)=>({accessorKey:`item${e}`,accessorFn:n=>n.items[e],header:({column:n})=>a.jsxs(pt,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,jr(n.getIsSorted())]})}),Vc=t=>({accessorKey:"count",header:({column:e})=>a.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:a.jsxs(pt,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,jr(e.getIsSorted())]})}),cell:({row:e})=>a.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Xr=(t,e,n,r,o,s)=>{let i=[...n];t.forEach(c=>{e==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];t.forEach(c=>{e==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),s(l)},Fc=(t,e,n,r,o)=>({accessorKey:"status",header:({column:s})=>a.jsx("div",{className:"tw-flex tw-justify-center",children:a.jsxs(pt,{variant:"ghost",onClick:()=>s.toggleSorting(void 0),children:[t,jr(s.getIsSorted())]})}),cell:({row:s})=>{const i=s.getValue("status"),l=s.getValue("item");return a.jsxs(Fo,{value:i,variant:"outline",type:"single",children:[a.jsx(yn,{onClick:()=>Xr([l],"approved",e,n,r,o),value:"approved",children:a.jsx(K.CircleCheckIcon,{})}),a.jsx(yn,{onClick:()=>Xr([l],"unapproved",e,n,r,o),value:"unapproved",children:a.jsx(K.CircleXIcon,{})}),a.jsx(yn,{onClick:()=>Xr([l],"unknown",e,n,r,o),value:"unknown",children:a.jsx(K.CircleHelpIcon,{})})]})}}),Lc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Gc=(t,e,n)=>{let r=t;return e!=="all"&&(r=r.filter(o=>e==="approved"&&o.status==="approved"||e==="unapproved"&&o.status==="unapproved"||e==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},Uc=(t,e,n,r,o)=>{if(!t)return[];const s=[];let i=e.bookNum,l=e.chapterNum,c=e.verseNum;return Zs(t).forEach(u=>{u.startsWith("\\id")&&(i=Qs(u),l=0,c=0),u.startsWith("\\c")&&(l=co(u),c=0),u.startsWith("\\v")&&(c=co(u),l===0&&(l=e.chapterNum));let m=o.exec(u)??void 0;for(;m;){const w=[];m.forEach(b=>w.push(b));const g=m.index,v=s.find(b=>J.deepEqual(b.items,w)),f={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:J.substring(u,Math.max(0,g-25),Math.min(g+25,u.length))};if(v)v.count+=1,v.occurrences.push(f);else{const b={items:w,count:1,status:ti(w[0],n,r),occurrences:[f]};s.push(b)}m=o.exec(u)??void 0}}),s},ee=(t,e)=>t[e]??e;function qc({scriptureReference:t,setScriptureReference:e,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const m=ee(n,"%webView_inventory_all%"),w=ee(n,"%webView_inventory_approved%"),g=ee(n,"%webView_inventory_unapproved%"),v=ee(n,"%webView_inventory_unknown%"),f=ee(n,"%webView_inventory_scope_currentBook%"),b=ee(n,"%webView_inventory_scope_chapter%"),j=ee(n,"%webView_inventory_scope_verse%"),S=ee(n,"%webView_inventory_filter_text%"),E=ee(n,"%webView_inventory_show_additional_items%"),[k,x]=h.useState(!1),[O,V]=h.useState("all"),[C,_]=h.useState(""),[F,$]=h.useState([]),et=h.useMemo(()=>l?r instanceof RegExp?Uc(l,t,s,i,r):r(l,t,s,i):[],[l,r,t,s,i]),Z=h.useMemo(()=>{if(k)return et;const N=[];return et.forEach(T=>{const G=T.items[0],U=N.find(z=>z.items[0]===G);U?(U.count+=T.count,U.occurrences=U.occurrences.concat(T.occurrences)):N.push({items:[G],count:T.count,occurrences:T.occurrences,status:T.status})}),N},[k,et]),D=h.useMemo(()=>Gc(Z,O,C),[Z,O,C]),I=h.useMemo(()=>{var G,U;if(!k)return u;const N=(G=o==null?void 0:o.tableHeaders)==null?void 0:G.length;if(!N)return u;const T=[];for(let z=0;z<N;z++)T.push(zc(((U=o==null?void 0:o.tableHeaders)==null?void 0:U[z])||"Additional Item",z+1));return[...T,...u]},[o==null?void 0:o.tableHeaders,u,k]);h.useEffect(()=>{$([])},[D]);const M=(N,T)=>{T.setRowSelection(()=>{const G={};return G[N.index]=!0,G}),$(N.original.items)},L=N=>{if(N==="book"||N==="chapter"||N==="verse")d(N);else throw new Error(`Invalid scope value: ${N}`)},X=N=>{if(N==="all"||N==="approved"||N==="unapproved"||N==="unknown")V(N);else throw new Error(`Invalid status filter value: ${N}`)},ot=h.useMemo(()=>{if(Z.length===0||F.length===0)return[];const N=Z.filter(T=>J.deepEqual(k?T.items:[T.items[0]],F));if(N.length>1)throw new Error("Selected item is not unique");return N[0].occurrences},[F,k,Z]);return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[a.jsxs("div",{className:"tw-flex tw-items-stretch",children:[a.jsxs(Se,{onValueChange:N=>X(N),defaultValue:O,children:[a.jsx(ue,{className:"tw-m-1",children:a.jsx(Ee,{placeholder:"Select filter"})}),a.jsxs(pe,{children:[a.jsx(Dt,{value:"all",children:m}),a.jsx(Dt,{value:"approved",children:w}),a.jsx(Dt,{value:"unapproved",children:g}),a.jsx(Dt,{value:"unknown",children:v})]})]}),a.jsxs(Se,{onValueChange:N=>L(N),defaultValue:c,children:[a.jsx(ue,{className:"tw-m-1",children:a.jsx(Ee,{placeholder:"Select scope"})}),a.jsxs(pe,{children:[a.jsx(Dt,{value:"book",children:f}),a.jsx(Dt,{value:"chapter",children:b}),a.jsx(Dt,{value:"verse",children:j})]})]}),a.jsx(Pe,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:C,onChange:N=>{_(N.target.value)}}),o&&a.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[a.jsx(Nr,{className:"tw-m-1",checked:k,onCheckedChange:N=>{$([]),x(N)}}),a.jsx(Rt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??E})]})]}),a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Js,{columns:I,data:D,onRowClickHandler:M,stickyHeader:!0})}),ot.length>0&&a.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:a.jsx(Dc,{occurrenceData:ot,setScriptureReference:e,localizedStrings:n})})]})}function ri({entries:t,getEntriesCount:e=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0,className:d=void 0}){const[u,m]=h.useState(!1),w=h.useCallback(f=>{var j;const b=(j=t.find(S=>S.label===f))==null?void 0:j.value;b&&r(n.includes(b)?n.filter(S=>S!==b):[...n,b])},[t,n,r]),g=()=>i||o,v=h.useMemo(()=>{if(!l)return t;const f=t.filter(j=>j.starred).sort((j,S)=>j.label.localeCompare(S.label)),b=t.filter(j=>!j.starred).sort((j,S)=>{const E=n.includes(j.value),k=n.includes(S.value);return E&&!k?-1:!E&&k?1:j.label.localeCompare(S.label)});return[...f,...b]},[t,n,l]);return a.jsx("div",{className:d,children:a.jsxs(Po,{open:u,onOpenChange:m,children:[a.jsx(Io,{asChild:!0,children:a.jsxs(pt,{variant:"ghost",role:"combobox","aria-expanded":u,className:y("tw-w-full tw-justify-between",n.length>0&&n.length<t.length&&"tw-border-primary","tw-group"),children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:a.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),a.jsx("div",{className:y({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":n.length===0||n.length===t.length}),children:a.jsx("div",{className:"tw-font-normal",children:g()})})]}),a.jsx(K.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),a.jsx(yr,{align:"start",className:"tw-w-full tw-p-0",children:a.jsxs(Mo,{children:[a.jsx($o,{placeholder:`Search ${o.toLowerCase()}...`}),a.jsxs(Do,{children:[a.jsx(Ao,{children:s}),a.jsx(Gs,{children:v.map(f=>{const b=e?e(f):void 0;return a.jsxs(Bo,{value:f.label,onSelect:w,className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx("div",{className:"w-4",children:a.jsx(K.Check,{className:y("tw-h-4 tw-w-4",n.includes(f.value)?"tw-opacity-100":"tw-opacity-0")})}),a.jsx("div",{className:"tw-w-4",children:f.starred&&a.jsx(K.Star,{className:"tw-h-4 tw-w-4"})}),a.jsx("div",{className:"tw-flex-grow",children:f.label}),e&&a.jsx("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:b})]},f.label)})})]})]})})]})})}function Lo({value:t,onSearch:e,placeholder:n,isFullWidth:r,className:o}){const s=Nt();return a.jsxs("div",{className:y("tw-relative",{"tw-w-full":r},o),children:[a.jsx(K.Search,{className:y("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":s==="rtl"},{"tw-left-3":s==="ltr"})}),a.jsx(Pe,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:t,onChange:i=>e(i.target.value)}),t&&a.jsxs(pt,{variant:"ghost",size:"icon",className:y("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":s==="rtl"},{"tw-right-0":s==="ltr"}),onClick:()=>{e("")},children:[a.jsx(K.X,{className:"tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const Go=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsx(It.Root,{orientation:"vertical",ref:n,className:y("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:r})});Go.displayName=It.List.displayName;const Uo=h.forwardRef(({className:t,...e},n)=>a.jsx(It.List,{ref:n,className:y("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Uo.displayName=It.List.displayName;const oi=h.forwardRef(({className:t,...e},n)=>a.jsx(It.Trigger,{ref:n,...e,className:y("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),qo=h.forwardRef(({className:t,...e},n)=>a.jsx(It.Content,{ref:n,className:y("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));qo.displayName=It.Content.displayName;function Xc({tabList:t,searchValue:e,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:s}){return a.jsxs("div",{className:"pr-twp",children:[a.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?a.jsx("h1",{children:o}):"",a.jsx(Lo,{className:s,value:e,onSearch:n,placeholder:r})]}),a.jsxs(Go,{children:[a.jsx(Uo,{children:t.map(i=>a.jsx(oi,{value:i.value,children:i.value},i.key))}),t.map(i=>a.jsx(qo,{value:i.value,children:i.content},i.key))]})]})}const kr=h.forwardRef(({className:t,orientation:e="horizontal",decorative:n=!0,...r},o)=>a.jsx(Os.Root,{ref:o,decorative:n,orientation:e,className:y("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...r}));kr.displayName=Os.Root.displayName;function _a({className:t,...e}){return a.jsx("div",{className:y("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}const ai=_n.Provider,si=_n.Root,ii=_n.Trigger,Xo=h.forwardRef(({className:t,sideOffset:e=4,...n},r)=>a.jsx(_n.Content,{ref:r,sideOffset:e,className:y("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));Xo.displayName=_n.Content.displayName;const Hc="16rem",Yc="3rem",li=h.createContext(void 0);function Sr(){const t=h.useContext(li);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const ci=h.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:n,className:r,style:o,children:s,side:i="primary",...l},c)=>{const[d,u]=h.useState(t),m=e??d,w=h.useCallback(E=>{const k=typeof E=="function"?E(m):E;n?n(k):u(k)},[n,m]),g=h.useCallback(()=>w(E=>!E),[w]),v=m?"expanded":"collapsed",j=Nt()==="ltr"?i:i==="primary"?"secondary":"primary",S=h.useMemo(()=>({state:v,open:m,setOpen:w,toggleSidebar:g,side:j}),[v,m,w,g,j]);return a.jsx(li.Provider,{value:S,children:a.jsx(ai,{delayDuration:0,children:a.jsx("div",{style:{"--sidebar-width":Hc,"--sidebar-width-icon":Yc,...o},className:y("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...l,children:s})})})});ci.displayName="SidebarProvider";const di=h.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:n,children:r,...o},s)=>{const i=Sr();return e==="none"?a.jsx("div",{className:y("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:s,...o,children:r}):a.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[a.jsx("div",{className:y("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),a.jsx("div",{className:y("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:a.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});di.displayName="Sidebar";const Wc=h.forwardRef(({className:t,onClick:e,...n},r)=>{const o=Sr();return a.jsxs(pt,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:y("tw-h-7 tw-w-7",t),onClick:s=>{e==null||e(s),o.toggleSidebar()},...n,children:[o.side==="primary"?a.jsx(K.PanelLeft,{}):a.jsx(K.PanelRight,{}),a.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Wc.displayName="SidebarTrigger";const Kc=h.forwardRef(({className:t,...e},n)=>{const{toggleSidebar:r}=Sr();return a.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:y("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Kc.displayName="SidebarRail";const ui=h.forwardRef(({className:t,...e},n)=>a.jsx("main",{ref:n,className:y("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));ui.displayName="SidebarInset";const Jc=h.forwardRef(({className:t,...e},n)=>a.jsx(Pe,{ref:n,"data-sidebar":"input",className:y("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));Jc.displayName="SidebarInput";const Zc=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"header",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Zc.displayName="SidebarHeader";const Qc=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"footer",className:y("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Qc.displayName="SidebarFooter";const td=h.forwardRef(({className:t,...e},n)=>a.jsx(kr,{ref:n,"data-sidebar":"separator",className:y("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));td.displayName="SidebarSeparator";const pi=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"content",className:y("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));pi.displayName="SidebarContent";const uo=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"group",className:y("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));uo.displayName="SidebarGroup";const po=h.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Qe.Slot:"div";return a.jsx(o,{ref:r,"data-sidebar":"group-label",className:y("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...n})});po.displayName="SidebarGroupLabel";const ed=h.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?Qe.Slot:"button";return a.jsx(o,{ref:r,"data-sidebar":"group-action",className:y("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...n})});ed.displayName="SidebarGroupAction";const wo=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"group-content",className:y("tw-w-full tw-text-sm",t),...e}));wo.displayName="SidebarGroupContent";const wi=h.forwardRef(({className:t,...e},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu",className:y("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));wi.displayName="SidebarMenu";const fi=h.forwardRef(({className:t,...e},n)=>a.jsx("li",{ref:n,"data-sidebar":"menu-item",className:y("tw-group/menu-item tw-relative",t),...e}));fi.displayName="SidebarMenuItem";const nd=_e.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),mi=h.forwardRef(({asChild:t=!1,isActive:e=!1,variant:n="default",size:r="default",tooltip:o,className:s,...i},l)=>{const c=t?Qe.Slot:"button",{state:d}=Sr(),u=a.jsx(c,{ref:l,"data-sidebar":"menu-button","data-size":r,"data-active":e,className:y(nd({variant:n,size:r}),s),...i});return o?(typeof o=="string"&&(o={children:o}),a.jsxs(si,{children:[a.jsx(ii,{asChild:!0,children:u}),a.jsx(Xo,{side:"right",align:"center",hidden:d!=="collapsed",...o})]})):u});mi.displayName="SidebarMenuButton";const rd=h.forwardRef(({className:t,asChild:e=!1,showOnHover:n=!1,...r},o)=>{const s=e?Qe.Slot:"button";return a.jsx(s,{ref:o,"data-sidebar":"menu-action",className:y("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...r})});rd.displayName="SidebarMenuAction";const od=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:y("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));od.displayName="SidebarMenuBadge";const ad=h.forwardRef(({className:t,showIcon:e=!1,...n},r)=>{const o=h.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return a.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:y("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...n,children:[e&&a.jsx(_a,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),a.jsx(_a,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});ad.displayName="SidebarMenuSkeleton";const sd=h.forwardRef(({className:t,...e},n)=>a.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:y("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));sd.displayName="SidebarMenuSub";const id=h.forwardRef(({...t},e)=>a.jsx("li",{ref:e,...t}));id.displayName="SidebarMenuSubItem";const ld=h.forwardRef(({asChild:t=!1,size:e="md",isActive:n,className:r,...o},s)=>{const i=t?Qe.Slot:"a";return a.jsx(i,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":n,className:y("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});ld.displayName="SidebarMenuSubButton";function hi({id:t,extensionLabels:e,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:s,projectsSidebarGroupLabel:i,buttonPlaceholderText:l,className:c}){const d=h.useCallback((w,g)=>{r(w,g)},[r]),u=h.useCallback(w=>{const g=n.find(v=>v.projectId===w);return g?g.projectName:w},[n]),m=h.useCallback(w=>!o.projectId&&w===o.label,[o]);return a.jsx(di,{id:t,collapsible:"none",variant:"inset",className:y("tw-w-96 tw-gap-2 tw-overflow-y-auto tw-bg-muted/50",c),children:a.jsxs(pi,{children:[a.jsxs(uo,{children:[a.jsx(po,{className:"tw-text-sm tw-text-gray-400",children:s}),a.jsx(wo,{children:a.jsx(wi,{children:Object.entries(e).map(([w,g])=>a.jsx(fi,{children:a.jsx(mi,{className:y("tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",{"tw-bg-white tw-text-gray-900 tw-shadow-sm":m(w)}),onClick:()=>d(w),isActive:m(w),children:a.jsx("span",{className:"tw-pl-3",children:g})})},w))})})]}),a.jsxs(uo,{children:[a.jsx(po,{className:"tw-text-sm tw-text-gray-400",children:i}),a.jsx(wo,{className:"tw-pl-3",children:a.jsx(lr,{buttonVariant:o!=null&&o.projectId?"outline":"ghost",buttonClassName:"tw-w-full",popoverContentClassName:"tw-z-[1000]",options:n.flatMap(w=>w.projectId),getOptionLabel:w=>u(w),buttonPlaceholder:l,onChange:w=>{const g=u(w);d(g,w)},value:(o==null?void 0:o.projectId)??void 0,icon:a.jsx(K.ScrollText,{})})})]})]})})}function cd({id:t,extensionLabels:e,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:s,searchValue:i,onSearch:l,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return a.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[a.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:a.jsx(Lo,{className:"tw-w-9/12",value:i,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),a.jsxs(ci,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t-2 tw-border-muted",children:[a.jsx(hi,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e-2 tw-border-muted",extensionLabels:e,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),a.jsx(ui,{className:"tw-min-w-[215px]",children:r})]})]})}const le="scrBook",dd="scrRef",ve="source",ud="details",pd="Scripture Reference",wd="Scripture Book",gi="Type",fd="Details";function md(t,e){const n=e??!1;return[{accessorFn:r=>`${st.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:le,header:(t==null?void 0:t.scriptureReferenceColumnName)??pd,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?st.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===le?J.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>J.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>J.formatScrRef(r.start),id:dd,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:J.formatScrRef(o.start)},sortingFn:(r,o)=>J.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:ve,header:n?(t==null?void 0:t.typeColumnName)??gi:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:ud,header:(t==null?void 0:t.detailsColumnName)??fd,cell:r=>r.getValue(),enableGrouping:!1}]}const hd=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let n=0;return t.end&&({offset:n}=t.end),!t.end||J.compareScrRefs(t.start,t.end)===0?`${J.scrRefToBBBCCCVVV(t.start)}+${e}`:`${J.scrRefToBBBCCCVVV(t.start)}+${e}-${J.scrRefToBBBCCCVVV(t.end)}+${n}`},Pa=t=>`${hd({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function gd({sources:t,showColumnHeaders:e=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:s,detailsColumnName:i,onRowSelected:l}){const[c,d]=h.useState([]),[u,m]=h.useState([{id:le,desc:!1}]),[w,g]=h.useState({}),v=h.useMemo(()=>t.flatMap(C=>C.data.map(_=>({..._,source:C.source}))),[t]),f=h.useMemo(()=>md({scriptureReferenceColumnName:r,typeColumnName:s,detailsColumnName:i},n),[r,s,i,n]);h.useEffect(()=>{c.includes(ve)?m([{id:ve,desc:!1},{id:le,desc:!1}]):m([{id:le,desc:!1}])},[c]);const b=Et.useReactTable({data:v,columns:f,state:{grouping:c,sorting:u,rowSelection:w},onGroupingChange:d,onSortingChange:m,onRowSelectionChange:g,getExpandedRowModel:Et.getExpandedRowModel(),getGroupedRowModel:Et.getGroupedRowModel(),getCoreRowModel:Et.getCoreRowModel(),getSortedRowModel:Et.getSortedRowModel(),getRowId:Pa,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});h.useEffect(()=>{if(l){const C=b.getSelectedRowModel().rowsById,_=Object.keys(C);if(_.length===1){const F=v.find($=>Pa($)===_[0])||void 0;F&&l(F)}}},[w,v,l,b]);const j=o??wd,S=s??gi,E=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[le]},{label:`Group by ${S}`,value:[ve]},{label:`Group by ${j} and ${S}`,value:[le,ve]},{label:`Group by ${S} and ${j}`,value:[ve,le]}],k=C=>{d(JSON.parse(C))},x=(C,_)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(_)},O=(C,_)=>C.getIsGrouped()?"":y("banded-row",_%2===0?"even":"odd"),V=(C,_,F)=>{if(!((C==null?void 0:C.length)===0||_.depth<F.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return a.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&a.jsxs(Se,{value:JSON.stringify(c),onValueChange:C=>{k(C)},children:[a.jsx(ue,{className:"tw-mb-1 tw-mt-2",children:a.jsx(Ee,{})}),a.jsx(pe,{position:"item-aligned",children:a.jsx(Xs,{children:E.map(C=>a.jsx(Dt,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),a.jsxs($n,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&a.jsx(Dn,{children:b.getHeaderGroups().map(C=>a.jsx(ne,{children:C.headers.filter(_=>_.column.columnDef.header).map(_=>a.jsx(Xe,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:a.jsxs("div",{children:[_.column.getCanGroup()?a.jsx(pt,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Et.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},C.id))}),a.jsx(An,{children:b.getRowModel().rows.map((C,_)=>{const F=Nt();return a.jsx(ne,{"data-state":C.getIsSelected()?"selected":"",className:y(O(C,_)),onClick:$=>x(C,$),children:C.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==ve||!n)))return a.jsx(Ce,{className:y($.column.columnDef.id,"tw-p-[1px]",V(c,C,$)),children:$.getIsGrouped()?a.jsxs(pt,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&a.jsx(K.ChevronDown,{}),!C.getIsExpanded()&&(F==="ltr"?a.jsx(K.ChevronRight,{}):a.jsx(K.ChevronLeft,{}))," ",Et.flexRender($.column.columnDef.cell,$.getContext())," (",C.subRows.length,")"]}):Et.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},C.id)})})]})]})}const Hr={[J.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[J.getLocalizeKeyForScrollGroupId(0)]:"A",[J.getLocalizeKeyForScrollGroupId(1)]:"B",[J.getLocalizeKeyForScrollGroupId(2)]:"C",[J.getLocalizeKeyForScrollGroupId(3)]:"D",[J.getLocalizeKeyForScrollGroupId(4)]:"E",[J.getLocalizeKeyForScrollGroupId(5)]:"F",[J.getLocalizeKeyForScrollGroupId(6)]:"G",[J.getLocalizeKeyForScrollGroupId(7)]:"H",[J.getLocalizeKeyForScrollGroupId(8)]:"I",[J.getLocalizeKeyForScrollGroupId(9)]:"J",[J.getLocalizeKeyForScrollGroupId(10)]:"K",[J.getLocalizeKeyForScrollGroupId(11)]:"L",[J.getLocalizeKeyForScrollGroupId(12)]:"M",[J.getLocalizeKeyForScrollGroupId(13)]:"N",[J.getLocalizeKeyForScrollGroupId(14)]:"O",[J.getLocalizeKeyForScrollGroupId(15)]:"P",[J.getLocalizeKeyForScrollGroupId(16)]:"Q",[J.getLocalizeKeyForScrollGroupId(17)]:"R",[J.getLocalizeKeyForScrollGroupId(18)]:"S",[J.getLocalizeKeyForScrollGroupId(19)]:"T",[J.getLocalizeKeyForScrollGroupId(20)]:"U",[J.getLocalizeKeyForScrollGroupId(21)]:"V",[J.getLocalizeKeyForScrollGroupId(22)]:"W",[J.getLocalizeKeyForScrollGroupId(23)]:"X",[J.getLocalizeKeyForScrollGroupId(24)]:"Y",[J.getLocalizeKeyForScrollGroupId(25)]:"Z"};function bd({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:n,localizedStrings:r={},className:o}){const s={...Hr,...Object.fromEntries(Object.entries(r).map(([l,c])=>[l,l===c&&l in Hr?Hr[l]:c]))},i=Nt();return a.jsxs(Se,{value:`${e}`,onValueChange:l=>n(l==="undefined"?void 0:parseInt(l,10)),children:[a.jsx(ue,{className:y("pr-twp tw-w-auto",o),children:a.jsx(Ee,{placeholder:s[J.getLocalizeKeyForScrollGroupId(e)]??e})}),a.jsx(pe,{align:i==="rtl"?"end":"start",style:{zIndex:250},children:t.map(l=>a.jsx(Dt,{value:`${l}`,children:s[J.getLocalizeKeyForScrollGroupId(l)]},`${l}`))})]})}function vd({children:t}){return a.jsx("div",{className:"pr-twp tw-grid",children:t})}function xd({primary:t,secondary:e,children:n,isLoading:r=!1,loadingMessage:o}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),a.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),r?a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):a.jsx("div",{children:n})]})}function yd({primary:t,secondary:e,includeSeparator:n=!1}){return a.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[a.jsxs("div",{children:[a.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),a.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),n?a.jsx(kr,{}):""]})}function Nd({id:t,className:e,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:s}){return a.jsx("div",{id:t,className:e,children:n.map(i=>a.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[a.jsx(Nr,{className:"tw-me-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),a.jsx(Rt,{children:s?s(i):i})]},i))})}function bi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function jd(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}),n}var dn={},Yr={exports:{}},Ia;function kd(){return Ia||(Ia=1,function(t){function e(n){return n&&n.__esModule?n:{default:n}}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports}(Yr)),Yr.exports}var Wr={};function Ho(t,e){return process.env.NODE_ENV==="production"?()=>null:function(...r){return t(...r)||e(...r)}}function R(){return R=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},R.apply(this,arguments)}function Ne(t){if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)}function vi(t){if(!Ne(t))return t;const e={};return Object.keys(t).forEach(n=>{e[n]=vi(t[n])}),e}function re(t,e,n={clone:!0}){const r=n.clone?R({},t):t;return Ne(t)&&Ne(e)&&Object.keys(e).forEach(o=>{o!=="__proto__"&&(Ne(e[o])&&o in t&&Ne(t[o])?r[o]=re(t[o],e[o],n):n.clone?r[o]=Ne(e[o])?vi(e[o]):e[o]:r[o]=e[o])}),r}var Wn={exports:{}},Kn={exports:{}},it={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ma;function Sd(){if(Ma)return it;Ma=1;var t=typeof Symbol=="function"&&Symbol.for,e=t?Symbol.for("react.element"):60103,n=t?Symbol.for("react.portal"):60106,r=t?Symbol.for("react.fragment"):60107,o=t?Symbol.for("react.strict_mode"):60108,s=t?Symbol.for("react.profiler"):60114,i=t?Symbol.for("react.provider"):60109,l=t?Symbol.for("react.context"):60110,c=t?Symbol.for("react.async_mode"):60111,d=t?Symbol.for("react.concurrent_mode"):60111,u=t?Symbol.for("react.forward_ref"):60112,m=t?Symbol.for("react.suspense"):60113,w=t?Symbol.for("react.suspense_list"):60120,g=t?Symbol.for("react.memo"):60115,v=t?Symbol.for("react.lazy"):60116,f=t?Symbol.for("react.block"):60121,b=t?Symbol.for("react.fundamental"):60117,j=t?Symbol.for("react.responder"):60118,S=t?Symbol.for("react.scope"):60119;function E(x){if(typeof x=="object"&&x!==null){var O=x.$$typeof;switch(O){case e:switch(x=x.type,x){case c:case d:case r:case s:case o:case m:return x;default:switch(x=x&&x.$$typeof,x){case l:case u:case v:case g:case i:return x;default:return O}}case n:return O}}}function k(x){return E(x)===d}return it.AsyncMode=c,it.ConcurrentMode=d,it.ContextConsumer=l,it.ContextProvider=i,it.Element=e,it.ForwardRef=u,it.Fragment=r,it.Lazy=v,it.Memo=g,it.Portal=n,it.Profiler=s,it.StrictMode=o,it.Suspense=m,it.isAsyncMode=function(x){return k(x)||E(x)===c},it.isConcurrentMode=k,it.isContextConsumer=function(x){return E(x)===l},it.isContextProvider=function(x){return E(x)===i},it.isElement=function(x){return typeof x=="object"&&x!==null&&x.$$typeof===e},it.isForwardRef=function(x){return E(x)===u},it.isFragment=function(x){return E(x)===r},it.isLazy=function(x){return E(x)===v},it.isMemo=function(x){return E(x)===g},it.isPortal=function(x){return E(x)===n},it.isProfiler=function(x){return E(x)===s},it.isStrictMode=function(x){return E(x)===o},it.isSuspense=function(x){return E(x)===m},it.isValidElementType=function(x){return typeof x=="string"||typeof x=="function"||x===r||x===d||x===s||x===o||x===m||x===w||typeof x=="object"&&x!==null&&(x.$$typeof===v||x.$$typeof===g||x.$$typeof===i||x.$$typeof===l||x.$$typeof===u||x.$$typeof===b||x.$$typeof===j||x.$$typeof===S||x.$$typeof===f)},it.typeOf=E,it}var lt={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $a;function Ed(){return $a||($a=1,process.env.NODE_ENV!=="production"&&function(){var t=typeof Symbol=="function"&&Symbol.for,e=t?Symbol.for("react.element"):60103,n=t?Symbol.for("react.portal"):60106,r=t?Symbol.for("react.fragment"):60107,o=t?Symbol.for("react.strict_mode"):60108,s=t?Symbol.for("react.profiler"):60114,i=t?Symbol.for("react.provider"):60109,l=t?Symbol.for("react.context"):60110,c=t?Symbol.for("react.async_mode"):60111,d=t?Symbol.for("react.concurrent_mode"):60111,u=t?Symbol.for("react.forward_ref"):60112,m=t?Symbol.for("react.suspense"):60113,w=t?Symbol.for("react.suspense_list"):60120,g=t?Symbol.for("react.memo"):60115,v=t?Symbol.for("react.lazy"):60116,f=t?Symbol.for("react.block"):60121,b=t?Symbol.for("react.fundamental"):60117,j=t?Symbol.for("react.responder"):60118,S=t?Symbol.for("react.scope"):60119;function E(P){return typeof P=="string"||typeof P=="function"||P===r||P===d||P===s||P===o||P===m||P===w||typeof P=="object"&&P!==null&&(P.$$typeof===v||P.$$typeof===g||P.$$typeof===i||P.$$typeof===l||P.$$typeof===u||P.$$typeof===b||P.$$typeof===j||P.$$typeof===S||P.$$typeof===f)}function k(P){if(typeof P=="object"&&P!==null){var jt=P.$$typeof;switch(jt){case e:var B=P.type;switch(B){case c:case d:case r:case s:case o:case m:return B;default:var yt=B&&B.$$typeof;switch(yt){case l:case u:case v:case g:case i:return yt;default:return jt}}case n:return jt}}}var x=c,O=d,V=l,C=i,_=e,F=u,$=r,et=v,Z=g,D=n,I=s,M=o,L=m,X=!1;function ot(P){return X||(X=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),N(P)||k(P)===c}function N(P){return k(P)===d}function T(P){return k(P)===l}function G(P){return k(P)===i}function U(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function z(P){return k(P)===u}function W(P){return k(P)===r}function H(P){return k(P)===v}function Y(P){return k(P)===g}function q(P){return k(P)===n}function Q(P){return k(P)===s}function tt(P){return k(P)===o}function ut(P){return k(P)===m}lt.AsyncMode=x,lt.ConcurrentMode=O,lt.ContextConsumer=V,lt.ContextProvider=C,lt.Element=_,lt.ForwardRef=F,lt.Fragment=$,lt.Lazy=et,lt.Memo=Z,lt.Portal=D,lt.Profiler=I,lt.StrictMode=M,lt.Suspense=L,lt.isAsyncMode=ot,lt.isConcurrentMode=N,lt.isContextConsumer=T,lt.isContextProvider=G,lt.isElement=U,lt.isForwardRef=z,lt.isFragment=W,lt.isLazy=H,lt.isMemo=Y,lt.isPortal=q,lt.isProfiler=Q,lt.isStrictMode=tt,lt.isSuspense=ut,lt.isValidElementType=E,lt.typeOf=k}()),lt}var Da;function xi(){return Da||(Da=1,process.env.NODE_ENV==="production"?Kn.exports=Sd():Kn.exports=Ed()),Kn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Kr,Aa;function Cd(){if(Aa)return Kr;Aa=1;var t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(s){if(s==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(s)}function o(){try{if(!Object.assign)return!1;var s=new String("abc");if(s[5]="de",Object.getOwnPropertyNames(s)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Kr=o()?Object.assign:function(s,i){for(var l,c=r(s),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var m in l)e.call(l,m)&&(c[m]=l[m]);if(t){d=t(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Kr}var Jr,Ba;function Yo(){if(Ba)return Jr;Ba=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Jr=t,Jr}var Zr,za;function yi(){return za||(za=1,Zr=Function.call.bind(Object.prototype.hasOwnProperty)),Zr}var Qr,Va;function Td(){if(Va)return Qr;Va=1;var t=function(){};if(process.env.NODE_ENV!=="production"){var e=Yo(),n={},r=yi();t=function(s){var i="Warning: "+s;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(s,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in s)if(r(s,u)){var m;try{if(typeof s[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}m=s[u](i,u,c,l,null,e)}catch(v){m=v}if(m&&!(m instanceof Error)&&t((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof m+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),m instanceof Error&&!(m.message in n)){n[m.message]=!0;var g=d?d():"";t("Failed "+l+" type: "+m.message+(g??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Qr=o,Qr}var to,Fa;function Rd(){if(Fa)return to;Fa=1;var t=xi(),e=Cd(),n=Yo(),r=yi(),o=Td(),s=function(){};process.env.NODE_ENV!=="production"&&(s=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return to=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function m(N){var T=N&&(d&&N[d]||N[u]);if(typeof T=="function")return T}var w="<<anonymous>>",g={array:j("array"),bigint:j("bigint"),bool:j("boolean"),func:j("function"),number:j("number"),object:j("object"),string:j("string"),symbol:j("symbol"),any:S(),arrayOf:E,element:k(),elementType:x(),instanceOf:O,node:F(),objectOf:C,oneOf:V,oneOfType:_,shape:et,exact:Z};function v(N,T){return N===T?N!==0||1/N===1/T:N!==N&&T!==T}function f(N,T){this.message=N,this.data=T&&typeof T=="object"?T:{},this.stack=""}f.prototype=Error.prototype;function b(N){if(process.env.NODE_ENV!=="production")var T={},G=0;function U(W,H,Y,q,Q,tt,ut){if(q=q||w,tt=tt||Y,ut!==n){if(c){var P=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw P.name="Invariant Violation",P}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var jt=q+":"+Y;!T[jt]&&G<3&&(s("You are manually calling a React.PropTypes validation function for the `"+tt+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),T[jt]=!0,G++)}}return H[Y]==null?W?H[Y]===null?new f("The "+Q+" `"+tt+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new f("The "+Q+" `"+tt+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:N(H,Y,q,Q,tt)}var z=U.bind(null,!1);return z.isRequired=U.bind(null,!0),z}function j(N){function T(G,U,z,W,H,Y){var q=G[U],Q=M(q);if(Q!==N){var tt=L(q);return new f("Invalid "+W+" `"+H+"` of type "+("`"+tt+"` supplied to `"+z+"`, expected ")+("`"+N+"`."),{expectedType:N})}return null}return b(T)}function S(){return b(i)}function E(N){function T(G,U,z,W,H){if(typeof N!="function")return new f("Property `"+H+"` of component `"+z+"` has invalid PropType notation inside arrayOf.");var Y=G[U];if(!Array.isArray(Y)){var q=M(Y);return new f("Invalid "+W+" `"+H+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an array."))}for(var Q=0;Q<Y.length;Q++){var tt=N(Y,Q,z,W,H+"["+Q+"]",n);if(tt instanceof Error)return tt}return null}return b(T)}function k(){function N(T,G,U,z,W){var H=T[G];if(!l(H)){var Y=M(H);return new f("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement."))}return null}return b(N)}function x(){function N(T,G,U,z,W){var H=T[G];if(!t.isValidElementType(H)){var Y=M(H);return new f("Invalid "+z+" `"+W+"` of type "+("`"+Y+"` supplied to `"+U+"`, expected a single ReactElement type."))}return null}return b(N)}function O(N){function T(G,U,z,W,H){if(!(G[U]instanceof N)){var Y=N.name||w,q=ot(G[U]);return new f("Invalid "+W+" `"+H+"` of type "+("`"+q+"` supplied to `"+z+"`, expected ")+("instance of `"+Y+"`."))}return null}return b(T)}function V(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&(arguments.length>1?s("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):s("Invalid argument supplied to oneOf, expected an array.")),i;function T(G,U,z,W,H){for(var Y=G[U],q=0;q<N.length;q++)if(v(Y,N[q]))return null;var Q=JSON.stringify(N,function(ut,P){var jt=L(P);return jt==="symbol"?String(P):P});return new f("Invalid "+W+" `"+H+"` of value `"+String(Y)+"` "+("supplied to `"+z+"`, expected one of "+Q+"."))}return b(T)}function C(N){function T(G,U,z,W,H){if(typeof N!="function")return new f("Property `"+H+"` of component `"+z+"` has invalid PropType notation inside objectOf.");var Y=G[U],q=M(Y);if(q!=="object")return new f("Invalid "+W+" `"+H+"` of type "+("`"+q+"` supplied to `"+z+"`, expected an object."));for(var Q in Y)if(r(Y,Q)){var tt=N(Y,Q,z,W,H+"."+Q,n);if(tt instanceof Error)return tt}return null}return b(T)}function _(N){if(!Array.isArray(N))return process.env.NODE_ENV!=="production"&&s("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var T=0;T<N.length;T++){var G=N[T];if(typeof G!="function")return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+X(G)+" at index "+T+"."),i}function U(z,W,H,Y,q){for(var Q=[],tt=0;tt<N.length;tt++){var ut=N[tt],P=ut(z,W,H,Y,q,n);if(P==null)return null;P.data&&r(P.data,"expectedType")&&Q.push(P.data.expectedType)}var jt=Q.length>0?", expected one of type ["+Q.join(", ")+"]":"";return new f("Invalid "+Y+" `"+q+"` supplied to "+("`"+H+"`"+jt+"."))}return b(U)}function F(){function N(T,G,U,z,W){return D(T[G])?null:new f("Invalid "+z+" `"+W+"` supplied to "+("`"+U+"`, expected a ReactNode."))}return b(N)}function $(N,T,G,U,z){return new f((N||"React class")+": "+T+" type `"+G+"."+U+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+z+"`.")}function et(N){function T(G,U,z,W,H){var Y=G[U],q=M(Y);if(q!=="object")return new f("Invalid "+W+" `"+H+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));for(var Q in N){var tt=N[Q];if(typeof tt!="function")return $(z,W,H,Q,L(tt));var ut=tt(Y,Q,z,W,H+"."+Q,n);if(ut)return ut}return null}return b(T)}function Z(N){function T(G,U,z,W,H){var Y=G[U],q=M(Y);if(q!=="object")return new f("Invalid "+W+" `"+H+"` of type `"+q+"` "+("supplied to `"+z+"`, expected `object`."));var Q=e({},G[U],N);for(var tt in Q){var ut=N[tt];if(r(N,tt)&&typeof ut!="function")return $(z,W,H,tt,L(ut));if(!ut)return new f("Invalid "+W+" `"+H+"` key `"+tt+"` supplied to `"+z+"`.\nBad object: "+JSON.stringify(G[U],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(N),null,"  "));var P=ut(Y,tt,z,W,H+"."+tt,n);if(P)return P}return null}return b(T)}function D(N){switch(typeof N){case"number":case"string":case"undefined":return!0;case"boolean":return!N;case"object":if(Array.isArray(N))return N.every(D);if(N===null||l(N))return!0;var T=m(N);if(T){var G=T.call(N),U;if(T!==N.entries){for(;!(U=G.next()).done;)if(!D(U.value))return!1}else for(;!(U=G.next()).done;){var z=U.value;if(z&&!D(z[1]))return!1}}else return!1;return!0;default:return!1}}function I(N,T){return N==="symbol"?!0:T?T["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&T instanceof Symbol:!1}function M(N){var T=typeof N;return Array.isArray(N)?"array":N instanceof RegExp?"object":I(T,N)?"symbol":T}function L(N){if(typeof N>"u"||N===null)return""+N;var T=M(N);if(T==="object"){if(N instanceof Date)return"date";if(N instanceof RegExp)return"regexp"}return T}function X(N){var T=L(N);switch(T){case"array":case"object":return"an "+T;case"boolean":case"date":case"regexp":return"a "+T;default:return T}}function ot(N){return!N.constructor||!N.constructor.name?w:N.constructor.name}return g.checkPropTypes=o,g.resetWarningCache=o.resetWarningCache,g.PropTypes=g,g},to}var eo,La;function Od(){if(La)return eo;La=1;var t=Yo();function e(){}function n(){}return n.resetWarningCache=e,eo=function(){function r(i,l,c,d,u,m){if(m!==t){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var s={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:e};return s.PropTypes=s,s},eo}var Ga;function _d(){if(Ga)return Wn.exports;if(Ga=1,process.env.NODE_ENV!=="production"){var t=xi(),e=!0;Wn.exports=Rd()(t.isElement,e)}else Wn.exports=Od()();return Wn.exports}var Pd=_d();const p=bi(Pd);function Id(t){const{prototype:e={}}=t;return!!e.isReactComponent}function Ni(t,e,n,r,o){const s=t[e],i=o||e;if(s==null||typeof window>"u")return null;let l;const c=s.type;return typeof c=="function"&&!Id(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Wo=Ho(p.element,Ni);Wo.isRequired=Ho(p.element.isRequired,Ni);const Md="exact-prop: ​";function $d(t){return process.env.NODE_ENV==="production"?t:R({},t,{[Md]:e=>{const n=Object.keys(e).filter(r=>!t.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function He(t){let e="https://mui.com/production-error/?code="+t;for(let n=1;n<arguments.length;n+=1)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+t+"; visit "+e+" for the full message."}var Jn={exports:{}},ct={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ua;function Dd(){if(Ua)return ct;Ua=1;var t=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function f(b){if(typeof b=="object"&&b!==null){var j=b.$$typeof;switch(j){case t:switch(b=b.type,b){case n:case o:case r:case d:case u:return b;default:switch(b=b&&b.$$typeof,b){case l:case i:case c:case w:case m:case s:return b;default:return j}}case e:return j}}}return ct.ContextConsumer=i,ct.ContextProvider=s,ct.Element=t,ct.ForwardRef=c,ct.Fragment=n,ct.Lazy=w,ct.Memo=m,ct.Portal=e,ct.Profiler=o,ct.StrictMode=r,ct.Suspense=d,ct.SuspenseList=u,ct.isAsyncMode=function(){return!1},ct.isConcurrentMode=function(){return!1},ct.isContextConsumer=function(b){return f(b)===i},ct.isContextProvider=function(b){return f(b)===s},ct.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},ct.isForwardRef=function(b){return f(b)===c},ct.isFragment=function(b){return f(b)===n},ct.isLazy=function(b){return f(b)===w},ct.isMemo=function(b){return f(b)===m},ct.isPortal=function(b){return f(b)===e},ct.isProfiler=function(b){return f(b)===o},ct.isStrictMode=function(b){return f(b)===r},ct.isSuspense=function(b){return f(b)===d},ct.isSuspenseList=function(b){return f(b)===u},ct.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===n||b===o||b===r||b===d||b===u||b===g||typeof b=="object"&&b!==null&&(b.$$typeof===w||b.$$typeof===m||b.$$typeof===s||b.$$typeof===i||b.$$typeof===c||b.$$typeof===v||b.getModuleId!==void 0)},ct.typeOf=f,ct}var dt={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qa;function Ad(){return qa||(qa=1,process.env.NODE_ENV!=="production"&&function(){var t=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),v=!1,f=!1,b=!1,j=!1,S=!1,E;E=Symbol.for("react.module.reference");function k(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||S||B===r||B===d||B===u||j||B===g||v||f||b||typeof B=="object"&&B!==null&&(B.$$typeof===w||B.$$typeof===m||B.$$typeof===s||B.$$typeof===i||B.$$typeof===c||B.$$typeof===E||B.getModuleId!==void 0))}function x(B){if(typeof B=="object"&&B!==null){var yt=B.$$typeof;switch(yt){case t:var qt=B.type;switch(qt){case n:case o:case r:case d:case u:return qt;default:var me=qt&&qt.$$typeof;switch(me){case l:case i:case c:case w:case m:case s:return me;default:return yt}}case e:return yt}}}var O=i,V=s,C=t,_=c,F=n,$=w,et=m,Z=e,D=o,I=r,M=d,L=u,X=!1,ot=!1;function N(B){return X||(X=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function T(B){return ot||(ot=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function G(B){return x(B)===i}function U(B){return x(B)===s}function z(B){return typeof B=="object"&&B!==null&&B.$$typeof===t}function W(B){return x(B)===c}function H(B){return x(B)===n}function Y(B){return x(B)===w}function q(B){return x(B)===m}function Q(B){return x(B)===e}function tt(B){return x(B)===o}function ut(B){return x(B)===r}function P(B){return x(B)===d}function jt(B){return x(B)===u}dt.ContextConsumer=O,dt.ContextProvider=V,dt.Element=C,dt.ForwardRef=_,dt.Fragment=F,dt.Lazy=$,dt.Memo=et,dt.Portal=Z,dt.Profiler=D,dt.StrictMode=I,dt.Suspense=M,dt.SuspenseList=L,dt.isAsyncMode=N,dt.isConcurrentMode=T,dt.isContextConsumer=G,dt.isContextProvider=U,dt.isElement=z,dt.isForwardRef=W,dt.isFragment=H,dt.isLazy=Y,dt.isMemo=q,dt.isPortal=Q,dt.isProfiler=tt,dt.isStrictMode=ut,dt.isSuspense=P,dt.isSuspenseList=jt,dt.isValidElementType=k,dt.typeOf=x}()),dt}var Xa;function Bd(){return Xa||(Xa=1,process.env.NODE_ENV==="production"?Jn.exports=Dd():Jn.exports=Ad()),Jn.exports}var Ha=Bd();const zd=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vd(t){const e=`${t}`.match(zd);return e&&e[1]||""}function ji(t,e=""){return t.displayName||t.name||Vd(t)||e}function Ya(t,e,n){const r=ji(e);return t.displayName||(r!==""?`${n}(${r})`:n)}function Fd(t){if(t!=null){if(typeof t=="string")return t;if(typeof t=="function")return ji(t,"Component");if(typeof t=="object")switch(t.$$typeof){case Ha.ForwardRef:return Ya(t,t.render,"ForwardRef");case Ha.Memo:return Ya(t,t.type,"memo");default:return}}}function Cn(t,e,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=t[e],i=o||e;return s==null?null:s&&s.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const ki=p.oneOfType([p.func,p.object]);function Zt(t){if(typeof t!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":He(7));return t.charAt(0).toUpperCase()+t.slice(1)}function Ld(...t){return t.reduce((e,n)=>n==null?e:function(...o){e.apply(this,o),n.apply(this,o)},()=>{})}function Gd(t,e=166){let n;function r(...o){const s=()=>{t.apply(this,o)};clearTimeout(n),n=setTimeout(s,e)}return r.clear=()=>{clearTimeout(n)},r}function Ud(t,e){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,s,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${s} \`${c}\` of \`${l}\` is deprecated. ${e}`):null}}function qd(t,e){var n,r;return A.isValidElement(t)&&e.indexOf((n=t.type.muiName)!=null?n:(r=t.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function cr(t){return t&&t.ownerDocument||document}function Xd(t){return cr(t).defaultView||window}function Hd(t,e){if(process.env.NODE_ENV==="production")return()=>null;const n=e?R({},e.propTypes):null;return o=>(s,i,l,c,d,...u)=>{const m=d||i,w=n==null?void 0:n[m];if(w){const g=w(s,i,l,c,d,...u);if(g)return g}return typeof s[i]<"u"&&!s[o]?new Error(`The prop \`${m}\` of \`${t}\` can only be used together with the \`${o}\` prop.`):null}}function dr(t,e){typeof t=="function"?t(e):t&&(t.current=e)}const Ye=typeof window<"u"?A.useLayoutEffect:A.useEffect;let Wa=0;function Yd(t){const[e,n]=A.useState(t),r=t||e;return A.useEffect(()=>{e==null&&(Wa+=1,n(`mui-${Wa}`))},[e]),r}const Ka=A.useId;function Si(t){if(Ka!==void 0){const e=Ka();return t??e}return Yd(t)}function Wd(t,e,n,r,o){if(process.env.NODE_ENV==="production")return null;const s=o||e;return typeof t[e]<"u"?new Error(`The prop \`${s}\` is not supported. Please remove it.`):null}function Ei({controlled:t,default:e,name:n,state:r="value"}){const{current:o}=A.useRef(t!==void 0),[s,i]=A.useState(e),l=o?t:s;if(process.env.NODE_ENV!=="production"){A.useEffect(()=>{o!==(t!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,t]);const{current:d}=A.useRef(e);A.useEffect(()=>{!o&&d!==e&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(e)])}const c=A.useCallback(d=>{o||i(d)},[]);return[l,c]}function fo(t){const e=A.useRef(t);return Ye(()=>{e.current=t}),A.useRef((...n)=>(0,e.current)(...n)).current}function Te(...t){return A.useMemo(()=>t.every(e=>e==null)?null:e=>{t.forEach(n=>{dr(n,e)})},t)}const Ja={};function Kd(t,e){const n=A.useRef(Ja);return n.current===Ja&&(n.current=t(e)),n}const Jd=[];function Zd(t){A.useEffect(t,Jd)}class Bn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Bn}start(e,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},e)}}function hn(){const t=Kd(Bn.create).current;return Zd(t.disposeEffect),t}let Er=!0,mo=!1;const Qd=new Bn,tu={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function eu(t){const{type:e,tagName:n}=t;return!!(n==="INPUT"&&tu[e]&&!t.readOnly||n==="TEXTAREA"&&!t.readOnly||t.isContentEditable)}function nu(t){t.metaKey||t.altKey||t.ctrlKey||(Er=!0)}function no(){Er=!1}function ru(){this.visibilityState==="hidden"&&mo&&(Er=!0)}function ou(t){t.addEventListener("keydown",nu,!0),t.addEventListener("mousedown",no,!0),t.addEventListener("pointerdown",no,!0),t.addEventListener("touchstart",no,!0),t.addEventListener("visibilitychange",ru,!0)}function au(t){const{target:e}=t;try{return e.matches(":focus-visible")}catch{}return Er||eu(e)}function Ci(){const t=A.useCallback(o=>{o!=null&&ou(o.ownerDocument)},[]),e=A.useRef(!1);function n(){return e.current?(mo=!0,Qd.start(100,()=>{mo=!1}),e.current=!1,!0):!1}function r(o){return au(o)?(e.current=!0,!0):!1}return{isFocusVisibleRef:e,onFocus:r,onBlur:n,ref:t}}function Ti(t,e){const n=R({},e);return Object.keys(t).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=R({},t[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=t[r]||{},s=e[r];n[r]={},!s||!Object.keys(s)?n[r]=o:!o||!Object.keys(o)?n[r]=s:(n[r]=R({},s),Object.keys(o).forEach(i=>{n[r][i]=Ti(o[i],s[i])}))}else n[r]===void 0&&(n[r]=t[r])}),n}function Ko(t,e,n=void 0){const r={};return Object.keys(t).forEach(o=>{r[o]=t[o].reduce((s,i)=>{if(i){const l=e(i);l!==""&&s.push(l),n&&n[i]&&s.push(n[i])}return s},[]).join(" ")}),r}const Za=t=>t,su=()=>{let t=Za;return{configure(e){t=e},generate(e){return t(e)},reset(){t=Za}}},Ri=su(),Oi={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Cr(t,e,n="Mui"){const r=Oi[e];return r?`${n}-${r}`:`${Ri.generate(t)}-${e}`}function _i(t,e,n="Mui"){const r={};return e.forEach(o=>{r[o]=Cr(t,o,n)}),r}function iu(t,e=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(e,Math.min(t,n))}function kt(t,e){if(t==null)return{};var n={},r=Object.keys(t),o,s;for(s=0;s<r.length;s++)o=r[s],!(e.indexOf(o)>=0)&&(n[o]=t[o]);return n}const lu=["values","unit","step"],cu=t=>{const e=Object.keys(t).map(n=>({key:n,val:t[n]}))||[];return e.sort((n,r)=>n.val-r.val),e.reduce((n,r)=>R({},n,{[r.key]:r.val}),{})};function du(t){const{values:e={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=t,o=kt(t,lu),s=cu(e),i=Object.keys(s);function l(w){return`@media (min-width:${typeof e[w]=="number"?e[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof e[w]=="number"?e[w]:w)-r/100}${n})`}function d(w,g){const v=i.indexOf(g);return`@media (min-width:${typeof e[w]=="number"?e[w]:w}${n}) and (max-width:${(v!==-1&&typeof e[i[v]]=="number"?e[i[v]]:g)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function m(w){const g=i.indexOf(w);return g===0?l(i[1]):g===i.length-1?c(i[g]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return R({keys:i,values:s,up:l,down:c,between:d,only:u,not:m,unit:n},o)}const uu={borderRadius:4},we=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{};function Nn(t,e){return e?re(t,e,{clone:!1}):t}const Jo={xs:0,sm:600,md:900,lg:1200,xl:1536},Qa={keys:["xs","sm","md","lg","xl"],up:t=>`@media (min-width:${Jo[t]}px)`};function oe(t,e,n){const r=t.theme||{};if(Array.isArray(e)){const s=r.breakpoints||Qa;return e.reduce((i,l,c)=>(i[s.up(s.keys[c])]=n(e[c]),i),{})}if(typeof e=="object"){const s=r.breakpoints||Qa;return Object.keys(e).reduce((i,l)=>{if(Object.keys(s.values||Jo).indexOf(l)!==-1){const c=s.up(l);i[c]=n(e[l],l)}else{const c=l;i[c]=e[c]}return i},{})}return n(e)}function pu(t={}){var e;return((e=t.keys)==null?void 0:e.reduce((r,o)=>{const s=t.up(o);return r[s]={},r},{}))||{}}function wu(t,e){return t.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},e)}function Tr(t,e,n=!0){if(!e||typeof e!="string")return null;if(t&&t.vars&&n){const r=`vars.${e}`.split(".").reduce((o,s)=>o&&o[s]?o[s]:null,t);if(r!=null)return r}return e.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,t)}function ur(t,e,n,r=n){let o;return typeof t=="function"?o=t(n):Array.isArray(t)?o=t[n]||r:o=Tr(t,n)||r,e&&(o=e(o,r,t)),o}function xt(t){const{prop:e,cssProperty:n=t.prop,themeKey:r,transform:o}=t,s=i=>{if(i[e]==null)return null;const l=i[e],c=i.theme,d=Tr(c,r)||{};return oe(i,l,m=>{let w=ur(d,o,m);return m===w&&typeof m=="string"&&(w=ur(d,o,`${e}${m==="default"?"":Zt(m)}`,m)),n===!1?w:{[n]:w}})};return s.propTypes=process.env.NODE_ENV!=="production"?{[e]:we}:{},s.filterProps=[e],s}function fu(t){const e={};return n=>(e[n]===void 0&&(e[n]=t(n)),e[n])}const mu={m:"margin",p:"padding"},hu={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ts={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},gu=fu(t=>{if(t.length>2)if(ts[t])t=ts[t];else return[t];const[e,n]=t.split(""),r=mu[e],o=hu[n]||"";return Array.isArray(o)?o.map(s=>r+s):[r+o]}),Rr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Or=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],bu=[...Rr,...Or];function zn(t,e,n,r){var o;const s=(o=Tr(t,e,!1))!=null?o:n;return typeof s=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),s*i):Array.isArray(s)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>s.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(s)}.`,`${i} > ${s.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))),s[i]):typeof s=="function"?s:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${e}\` value (${s}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Pi(t){return zn(t,"spacing",8,"spacing")}function Vn(t,e){if(typeof e=="string"||e==null)return e;const n=Math.abs(e),r=t(n);return e>=0?r:typeof r=="number"?-r:`-${r}`}function vu(t,e){return n=>t.reduce((r,o)=>(r[o]=Vn(e,n),r),{})}function xu(t,e,n,r){if(e.indexOf(n)===-1)return null;const o=gu(n),s=vu(o,r),i=t[n];return oe(t,i,s)}function Ii(t,e){const n=Pi(t.theme);return Object.keys(t).map(r=>xu(t,e,r,n)).reduce(Nn,{})}function gt(t){return Ii(t,Rr)}gt.propTypes=process.env.NODE_ENV!=="production"?Rr.reduce((t,e)=>(t[e]=we,t),{}):{};gt.filterProps=Rr;function bt(t){return Ii(t,Or)}bt.propTypes=process.env.NODE_ENV!=="production"?Or.reduce((t,e)=>(t[e]=we,t),{}):{};bt.filterProps=Or;process.env.NODE_ENV!=="production"&&bu.reduce((t,e)=>(t[e]=we,t),{});function yu(t=8){if(t.mui)return t;const e=Pi({spacing:t}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(s=>{const i=e(s);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function _r(...t){const e=t.reduce((r,o)=>(o.filterProps.forEach(s=>{r[s]=o}),r),{}),n=r=>Object.keys(r).reduce((o,s)=>e[s]?Nn(o,e[s](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?t.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=t.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Vt(t){return typeof t!="number"?t:`${t}px solid`}function Ut(t,e){return xt({prop:t,themeKey:"borders",transform:e})}const Nu=Ut("border",Vt),ju=Ut("borderTop",Vt),ku=Ut("borderRight",Vt),Su=Ut("borderBottom",Vt),Eu=Ut("borderLeft",Vt),Cu=Ut("borderColor"),Tu=Ut("borderTopColor"),Ru=Ut("borderRightColor"),Ou=Ut("borderBottomColor"),_u=Ut("borderLeftColor"),Pu=Ut("outline",Vt),Iu=Ut("outlineColor"),Pr=t=>{if(t.borderRadius!==void 0&&t.borderRadius!==null){const e=zn(t.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Vn(e,r)});return oe(t,t.borderRadius,n)}return null};Pr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:we}:{};Pr.filterProps=["borderRadius"];_r(Nu,ju,ku,Su,Eu,Cu,Tu,Ru,Ou,_u,Pr,Pu,Iu);const Ir=t=>{if(t.gap!==void 0&&t.gap!==null){const e=zn(t.theme,"spacing",8,"gap"),n=r=>({gap:Vn(e,r)});return oe(t,t.gap,n)}return null};Ir.propTypes=process.env.NODE_ENV!=="production"?{gap:we}:{};Ir.filterProps=["gap"];const Mr=t=>{if(t.columnGap!==void 0&&t.columnGap!==null){const e=zn(t.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Vn(e,r)});return oe(t,t.columnGap,n)}return null};Mr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:we}:{};Mr.filterProps=["columnGap"];const $r=t=>{if(t.rowGap!==void 0&&t.rowGap!==null){const e=zn(t.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Vn(e,r)});return oe(t,t.rowGap,n)}return null};$r.propTypes=process.env.NODE_ENV!=="production"?{rowGap:we}:{};$r.filterProps=["rowGap"];const Mu=xt({prop:"gridColumn"}),$u=xt({prop:"gridRow"}),Du=xt({prop:"gridAutoFlow"}),Au=xt({prop:"gridAutoColumns"}),Bu=xt({prop:"gridAutoRows"}),zu=xt({prop:"gridTemplateColumns"}),Vu=xt({prop:"gridTemplateRows"}),Fu=xt({prop:"gridTemplateAreas"}),Lu=xt({prop:"gridArea"});_r(Ir,Mr,$r,Mu,$u,Du,Au,Bu,zu,Vu,Fu,Lu);function qe(t,e){return e==="grey"?e:t}const Gu=xt({prop:"color",themeKey:"palette",transform:qe}),Uu=xt({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:qe}),qu=xt({prop:"backgroundColor",themeKey:"palette",transform:qe});_r(Gu,Uu,qu);function At(t){return t<=1&&t!==0?`${t*100}%`:t}const Xu=xt({prop:"width",transform:At}),Zo=t=>{if(t.maxWidth!==void 0&&t.maxWidth!==null){const e=n=>{var r,o;const s=((r=t.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Jo[n];return s?((o=t.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${s}${t.theme.breakpoints.unit}`}:{maxWidth:s}:{maxWidth:At(n)}};return oe(t,t.maxWidth,e)}return null};Zo.filterProps=["maxWidth"];const Hu=xt({prop:"minWidth",transform:At}),Yu=xt({prop:"height",transform:At}),Wu=xt({prop:"maxHeight",transform:At}),Ku=xt({prop:"minHeight",transform:At});xt({prop:"size",cssProperty:"width",transform:At});xt({prop:"size",cssProperty:"height",transform:At});const Ju=xt({prop:"boxSizing"});_r(Xu,Zo,Hu,Yu,Wu,Ku,Ju);const Qo={border:{themeKey:"borders",transform:Vt},borderTop:{themeKey:"borders",transform:Vt},borderRight:{themeKey:"borders",transform:Vt},borderBottom:{themeKey:"borders",transform:Vt},borderLeft:{themeKey:"borders",transform:Vt},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Vt},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Pr},color:{themeKey:"palette",transform:qe},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:qe},backgroundColor:{themeKey:"palette",transform:qe},p:{style:bt},pt:{style:bt},pr:{style:bt},pb:{style:bt},pl:{style:bt},px:{style:bt},py:{style:bt},padding:{style:bt},paddingTop:{style:bt},paddingRight:{style:bt},paddingBottom:{style:bt},paddingLeft:{style:bt},paddingX:{style:bt},paddingY:{style:bt},paddingInline:{style:bt},paddingInlineStart:{style:bt},paddingInlineEnd:{style:bt},paddingBlock:{style:bt},paddingBlockStart:{style:bt},paddingBlockEnd:{style:bt},m:{style:gt},mt:{style:gt},mr:{style:gt},mb:{style:gt},ml:{style:gt},mx:{style:gt},my:{style:gt},margin:{style:gt},marginTop:{style:gt},marginRight:{style:gt},marginBottom:{style:gt},marginLeft:{style:gt},marginX:{style:gt},marginY:{style:gt},marginInline:{style:gt},marginInlineStart:{style:gt},marginInlineEnd:{style:gt},marginBlock:{style:gt},marginBlockStart:{style:gt},marginBlockEnd:{style:gt},displayPrint:{cssProperty:!1,transform:t=>({"@media print":{display:t}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ir},rowGap:{style:$r},columnGap:{style:Mr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:At},maxWidth:{style:Zo},minWidth:{transform:At},height:{transform:At},maxHeight:{transform:At},minHeight:{transform:At},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}};function Zu(...t){const e=t.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(e);return t.every(r=>n.size===Object.keys(r).length)}function Qu(t,e){return typeof t=="function"?t(e):t}function tp(){function t(n,r,o,s){const i={[n]:r,theme:o},l=s[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:m}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=Tr(o,d)||{};return m?m(i):oe(i,r,v=>{let f=ur(w,u,v);return v===f&&typeof v=="string"&&(f=ur(w,u,`${n}${v==="default"?"":Zt(v)}`,v)),c===!1?f:{[c]:f}})}function e(n){var r;const{sx:o,theme:s={}}=n||{};if(!o)return null;const i=(r=s.unstable_sxConfig)!=null?r:Qo;function l(c){let d=c;if(typeof c=="function")d=c(s);else if(typeof c!="object")return c;if(!d)return null;const u=pu(s.breakpoints),m=Object.keys(u);let w=u;return Object.keys(d).forEach(g=>{const v=Qu(d[g],s);if(v!=null)if(typeof v=="object")if(i[g])w=Nn(w,t(g,v,s,i));else{const f=oe({theme:s},v,b=>({[g]:b}));Zu(f,v)?w[g]=e({sx:v,theme:s}):w=Nn(w,f)}else w=Nn(w,t(g,v,s,i))}),wu(m,w)}return Array.isArray(o)?o.map(l):l(o)}return e}const Dr=tp();Dr.filterProps=["sx"];function ep(t,e){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/,"*:where($1)")]:e}:n.palette.mode===t?e:{}}const np=["breakpoints","palette","spacing","shape"];function ta(t={},...e){const{breakpoints:n={},palette:r={},spacing:o,shape:s={}}=t,i=kt(t,np),l=du(n),c=yu(o);let d=re({breakpoints:l,direction:"ltr",components:{},palette:R({mode:"light"},r),spacing:c,shape:R({},uu,s)},i);return d.applyStyles=ep,d=e.reduce((u,m)=>re(u,m),d),d.unstable_sxConfig=R({},Qo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(m){return Dr({sx:m,theme:this})},d}function rp(t){return Object.keys(t).length===0}function Mi(t=null){const e=A.useContext(so.ThemeContext);return!e||rp(e)?t:e}const op=ta();function $i(t=op){return Mi(t)}const ap=["ownerState"],sp=["variants"],ip=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function lp(t){return Object.keys(t).length===0}function cp(t){return typeof t=="string"&&t.charCodeAt(0)>96}function rr(t){return t!=="ownerState"&&t!=="theme"&&t!=="sx"&&t!=="as"}const dp=ta(),es=t=>t&&t.charAt(0).toLowerCase()+t.slice(1);function Zn({defaultTheme:t,theme:e,themeId:n}){return lp(e)?t:e[n]||e}function up(t){return t?(e,n)=>n[t]:null}function or(t,e){let{ownerState:n}=e,r=kt(e,ap);const o=typeof t=="function"?t(R({ownerState:n},r)):t;if(Array.isArray(o))return o.flatMap(s=>or(s,R({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let l=kt(o,sp);return s.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(R({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(R({ownerState:n},r,n)):c.style))}),l}return o}function pp(t={}){const{themeId:e,defaultTheme:n=dp,rootShouldForwardProp:r=rr,slotShouldForwardProp:o=rr}=t,s=i=>Dr(R({},i,{theme:Zn(R({},i,{defaultTheme:n,themeId:e}))}));return s.__mui_systemSx=!0,(i,l={})=>{so.internal_processStyles(i,x=>x.filter(O=>!(O!=null&&O.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:m,overridesResolver:w=up(es(d))}=l,g=kt(l,ip),v=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,f=m||!1;let b;process.env.NODE_ENV!=="production"&&c&&(b=`${c}-${es(d||"Root")}`);let j=rr;d==="Root"||d==="root"?j=r:d?j=o:cp(i)&&(j=void 0);const S=so(i,R({shouldForwardProp:j,label:b},g)),E=x=>typeof x=="function"&&x.__emotion_real!==x||Ne(x)?O=>or(x,R({},O,{theme:Zn({theme:O.theme,defaultTheme:n,themeId:e})})):x,k=(x,...O)=>{let V=E(x);const C=O?O.map(E):[];c&&w&&C.push($=>{const et=Zn(R({},$,{defaultTheme:n,themeId:e}));if(!et.components||!et.components[c]||!et.components[c].styleOverrides)return null;const Z=et.components[c].styleOverrides,D={};return Object.entries(Z).forEach(([I,M])=>{D[I]=or(M,R({},$,{theme:et}))}),w($,D)}),c&&!v&&C.push($=>{var et;const Z=Zn(R({},$,{defaultTheme:n,themeId:e})),D=Z==null||(et=Z.components)==null||(et=et[c])==null?void 0:et.variants;return or({variants:D},R({},$,{theme:Z}))}),f||C.push(s);const _=C.length-O.length;if(Array.isArray(x)&&_>0){const $=new Array(_).fill("");V=[...x,...$],V.raw=[...x.raw,...$]}const F=S(V,...C);if(process.env.NODE_ENV!=="production"){let $;c&&($=`${c}${Zt(d||"")}`),$===void 0&&($=`Styled(${Fd(i)})`),F.displayName=$}return i.muiName&&(F.muiName=i.muiName),F};return S.withConfig&&(k.withConfig=S.withConfig),k}}function wp(t){const{theme:e,name:n,props:r}=t;return!e||!e.components||!e.components[n]||!e.components[n].defaultProps?r:Ti(e.components[n].defaultProps,r)}function fp({props:t,name:e,defaultTheme:n,themeId:r}){let o=$i(n);return o=o[r]||o,wp({theme:o,name:e,props:t})}function ea(t,e=0,n=1){return process.env.NODE_ENV!=="production"&&(t<e||t>n)&&console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`),iu(t,e,n)}function mp(t){t=t.slice(1);const e=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let n=t.match(e);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Re(t){if(t.type)return t;if(t.charAt(0)==="#")return Re(mp(t));const e=t.indexOf("("),n=t.substring(0,e);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:He(9,t));let r=t.substring(e+1,t.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:He(10,o))}else r=r.split(",");return r=r.map(s=>parseFloat(s)),{type:n,values:r,colorSpace:o}}function Ar(t){const{type:e,colorSpace:n}=t;let{values:r}=t;return e.indexOf("rgb")!==-1?r=r.map((o,s)=>s<3?parseInt(o,10):o):e.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),e.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${e}(${r})`}function hp(t){t=Re(t);const{values:e}=t,n=e[0],r=e[1]/100,o=e[2]/100,s=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-s*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return t.type==="hsla"&&(l+="a",c.push(e[3])),Ar({type:l,values:c})}function ns(t){t=Re(t);let e=t.type==="hsl"||t.type==="hsla"?Re(hp(t)).values:t.values;return e=e.map(n=>(t.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*e[0]+.7152*e[1]+.0722*e[2]).toFixed(3))}function rs(t,e){const n=ns(t),r=ns(e);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Di(t,e){return t=Re(t),e=ea(e),(t.type==="rgb"||t.type==="hsl")&&(t.type+="a"),t.type==="color"?t.values[3]=`/${e}`:t.values[3]=e,Ar(t)}function gp(t,e){if(t=Re(t),e=ea(e),t.type.indexOf("hsl")!==-1)t.values[2]*=1-e;else if(t.type.indexOf("rgb")!==-1||t.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)t.values[n]*=1-e;return Ar(t)}function bp(t,e){if(t=Re(t),e=ea(e),t.type.indexOf("hsl")!==-1)t.values[2]+=(100-t.values[2])*e;else if(t.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)t.values[n]+=(255-t.values[n])*e;else if(t.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)t.values[n]+=(1-t.values[n])*e;return Ar(t)}function vp(t,e){return R({toolbar:{minHeight:56,[t.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[t.up("sm")]:{minHeight:64}}},e)}const Tn={black:"#000",white:"#fff"},xp={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Be={50:"#f3e5f5",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",700:"#7b1fa2"},ze={300:"#e57373",400:"#ef5350",500:"#f44336",700:"#d32f2f",800:"#c62828"},un={300:"#ffb74d",400:"#ffa726",500:"#ff9800",700:"#f57c00",900:"#e65100"},Ve={50:"#e3f2fd",200:"#90caf9",400:"#42a5f5",700:"#1976d2",800:"#1565c0"},Fe={300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",700:"#0288d1",900:"#01579b"},Le={300:"#81c784",400:"#66bb6a",500:"#4caf50",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},yp=["mode","contrastThreshold","tonalOffset"],os={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ro={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function as(t,e,n,r){const o=r.light||r,s=r.dark||r*1.5;t[e]||(t.hasOwnProperty(n)?t[e]=t[n]:e==="light"?t.light=bp(t.main,o):e==="dark"&&(t.dark=gp(t.main,s)))}function Np(t="light"){return t==="dark"?{main:Ve[200],light:Ve[50],dark:Ve[400]}:{main:Ve[700],light:Ve[400],dark:Ve[800]}}function jp(t="light"){return t==="dark"?{main:Be[200],light:Be[50],dark:Be[400]}:{main:Be[500],light:Be[300],dark:Be[700]}}function kp(t="light"){return t==="dark"?{main:ze[500],light:ze[300],dark:ze[700]}:{main:ze[700],light:ze[400],dark:ze[800]}}function Sp(t="light"){return t==="dark"?{main:Fe[400],light:Fe[300],dark:Fe[700]}:{main:Fe[700],light:Fe[500],dark:Fe[900]}}function Ep(t="light"){return t==="dark"?{main:Le[400],light:Le[300],dark:Le[700]}:{main:Le[800],light:Le[500],dark:Le[900]}}function Cp(t="light"){return t==="dark"?{main:un[400],light:un[300],dark:un[700]}:{main:"#ed6c02",light:un[500],dark:un[900]}}function Tp(t){const{mode:e="light",contrastThreshold:n=3,tonalOffset:r=.2}=t,o=kt(t,yp),s=t.primary||Np(e),i=t.secondary||jp(e),l=t.error||kp(e),c=t.info||Sp(e),d=t.success||Ep(e),u=t.warning||Cp(e);function m(f){const b=rs(f,ro.text.primary)>=n?ro.text.primary:os.text.primary;if(process.env.NODE_ENV!=="production"){const j=rs(f,b);j<3&&console.error([`MUI: The contrast ratio of ${j}:1 for ${b} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return b}const w=({color:f,name:b,mainShade:j=500,lightShade:S=300,darkShade:E=700})=>{if(f=R({},f),!f.main&&f[j]&&(f.main=f[j]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${j}\` property.`:He(11,b?` (${b})`:"",j));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${b?` (${b})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:He(12,b?` (${b})`:"",JSON.stringify(f.main)));return as(f,"light",S,r),as(f,"dark",E,r),f.contrastText||(f.contrastText=m(f.main)),f},g={dark:ro,light:os};return process.env.NODE_ENV!=="production"&&(g[e]||console.error(`MUI: The palette mode \`${e}\` is not supported.`)),re(R({common:R({},Tn),mode:e,primary:w({color:s,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:xp,contrastThreshold:n,getContrastText:m,augmentColor:w,tonalOffset:r},g[e]),o)}const Rp=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Op(t){return Math.round(t*1e5)/1e5}const ss={textTransform:"uppercase"},is='"Roboto", "Helvetica", "Arial", sans-serif';function _p(t,e){const n=typeof e=="function"?e(t):e,{fontFamily:r=is,fontSize:o=14,fontWeightLight:s=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:m}=n,w=kt(n,Rp);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const g=o/14,v=m||(j=>`${j/d*g}rem`),f=(j,S,E,k,x)=>R({fontFamily:r,fontWeight:j,fontSize:v(S),lineHeight:E},r===is?{letterSpacing:`${Op(k/S)}em`}:{},x,u),b={h1:f(s,96,1.167,-1.5),h2:f(s,60,1.2,-.5),h3:f(i,48,1.167,0),h4:f(i,34,1.235,.25),h5:f(i,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(i,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(i,16,1.5,.15),body2:f(i,14,1.43,.15),button:f(l,14,1.75,.4,ss),caption:f(i,12,1.66,.4),overline:f(i,12,2.66,1,ss),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return re(R({htmlFontSize:d,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:s,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},b),w,{clone:!1})}const Pp=.2,Ip=.14,Mp=.12;function mt(...t){return[`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${Pp})`,`${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Ip})`,`${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Mp})`].join(",")}const $p=["none",mt(0,2,1,-1,0,1,1,0,0,1,3,0),mt(0,3,1,-2,0,2,2,0,0,1,5,0),mt(0,3,3,-2,0,3,4,0,0,1,8,0),mt(0,2,4,-1,0,4,5,0,0,1,10,0),mt(0,3,5,-1,0,5,8,0,0,1,14,0),mt(0,3,5,-1,0,6,10,0,0,1,18,0),mt(0,4,5,-2,0,7,10,1,0,2,16,1),mt(0,5,5,-3,0,8,10,1,0,3,14,2),mt(0,5,6,-3,0,9,12,1,0,3,16,2),mt(0,6,6,-3,0,10,14,1,0,4,18,3),mt(0,6,7,-4,0,11,15,1,0,4,20,3),mt(0,7,8,-4,0,12,17,2,0,5,22,4),mt(0,7,8,-4,0,13,19,2,0,5,24,4),mt(0,7,9,-4,0,14,21,2,0,5,26,4),mt(0,8,9,-5,0,15,22,2,0,6,28,5),mt(0,8,10,-5,0,16,24,2,0,6,30,5),mt(0,8,11,-5,0,17,26,2,0,6,32,5),mt(0,9,11,-5,0,18,28,2,0,7,34,6),mt(0,9,12,-6,0,19,29,2,0,7,36,6),mt(0,10,13,-6,0,20,31,3,0,8,38,7),mt(0,10,13,-6,0,21,33,3,0,8,40,7),mt(0,10,14,-6,0,22,35,3,0,8,42,7),mt(0,11,14,-7,0,23,36,3,0,9,44,8),mt(0,11,15,-7,0,24,38,3,0,9,46,8)],Dp=["duration","easing","delay"],Ap={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Bp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ls(t){return`${Math.round(t)}ms`}function zp(t){if(!t)return 0;const e=t/36;return Math.round((4+15*e**.25+e/5)*10)}function Vp(t){const e=R({},Ap,t.easing),n=R({},Bp,t.duration);return R({getAutoHeightDuration:zp,create:(o=["all"],s={})=>{const{duration:i=n.standard,easing:l=e.easeInOut,delay:c=0}=s,d=kt(s,Dp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",m=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!m(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!m(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof s!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:ls(i)} ${l} ${typeof c=="string"?c:ls(c)}`).join(",")}},t,{easing:e,duration:n})}const Fp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Lp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Gp(t={},...e){const{mixins:n={},palette:r={},transitions:o={},typography:s={}}=t,i=kt(t,Lp);if(t.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":He(18));const l=Tp(r),c=ta(t);let d=re(c,{mixins:vp(c.breakpoints,n),palette:l,shadows:$p.slice(),typography:_p(l,s),transitions:Vp(o),zIndex:R({},Fp)});if(d=re(d,i),d=e.reduce((u,m)=>re(u,m),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],m=(w,g)=>{let v;for(v in w){const f=w[v];if(u.indexOf(v)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const b=Cr("",v);console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${b}' syntax:`,JSON.stringify({root:{[`&.${b}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[v]={}}}};Object.keys(d.components).forEach(w=>{const g=d.components[w].styleOverrides;g&&w.indexOf("Mui")===0&&m(g,w)})}return d.unstable_sxConfig=R({},Qo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(m){return Dr({sx:m,theme:this})},d}const na=Gp(),ra="$$material";function oa({props:t,name:e}){return fp({props:t,name:e,defaultTheme:na,themeId:ra})}const Up=t=>rr(t)&&t!=="classes",Fn=pp({themeId:ra,defaultTheme:na,rootShouldForwardProp:Up});function qp(t){return Cr("MuiSvgIcon",t)}_i("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Xp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Hp=t=>{const{color:e,fontSize:n,classes:r}=t,o={root:["root",e!=="inherit"&&`color${Zt(e)}`,`fontSize${Zt(n)}`]};return Ko(o,qp,r)},Yp=Fn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.color!=="inherit"&&e[`color${Zt(n.color)}`],e[`fontSize${Zt(n.fontSize)}`]]}})(({theme:t,ownerState:e})=>{var n,r,o,s,i,l,c,d,u,m,w,g,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:e.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=t.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=t.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((s=t.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((l=t.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=t.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[e.fontSize],color:(m=(w=(t.vars||t).palette)==null||(w=w[e.color])==null?void 0:w.main)!=null?m:{action:(g=(t.vars||t).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(v=(t.vars||t).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[e.color]}}),pr=A.forwardRef(function(e,n){const r=oa({props:e,name:"MuiSvgIcon"}),{children:o,className:s,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:m,viewBox:w="0 0 24 24"}=r,g=kt(r,Xp),v=A.isValidElement(o)&&o.type==="svg",f=R({},r,{color:i,component:l,fontSize:c,instanceFontSize:e.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:v}),b={};u||(b.viewBox=w);const j=Hp(f);return a.jsxs(Yp,R({as:l,className:ce(j.root,s),focusable:"false",color:d,"aria-hidden":m?void 0:!0,role:m?"img":void 0,ref:n},b,g,v&&o.props,{ownerState:f,children:[v?o.props.children:o,m?a.jsx("title",{children:m}):null]}))});process.env.NODE_ENV!=="production"&&(pr.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});pr.muiName="SvgIcon";function Ai(t,e){function n(r,o){return a.jsx(pr,R({"data-testid":`${e}Icon`,ref:o},r,{children:t}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${e}Icon`),n.muiName=pr.muiName,A.memo(A.forwardRef(n))}const Wp={configure:t=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ri.configure(t)}},Kp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Zt,createChainedFunction:Ld,createSvgIcon:Ai,debounce:Gd,deprecatedPropType:Ud,isMuiElement:qd,ownerDocument:cr,ownerWindow:Xd,requirePropFactory:Hd,setRef:dr,unstable_ClassNameGenerator:Wp,unstable_useEnhancedEffect:Ye,unstable_useId:Si,unsupportedProp:Wd,useControlled:Ei,useEventCallback:fo,useForkRef:Te,useIsFocusVisible:Ci},Symbol.toStringTag,{value:"Module"})),Jp=jd(Kp);var cs;function Zp(){return cs||(cs=1,function(t){"use client";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return e.createSvgIcon}});var e=Jp}(Wr)),Wr}var ds;function Qp(){if(ds)return dn;ds=1;var t=kd();Object.defineProperty(dn,"__esModule",{value:!0}),dn.default=void 0;var e=t(Zp()),n=a;return dn.default=(0,e.default)((0,n.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight"),dn}var tw=Qp();const ew=bi(tw);function nw(t){return typeof t=="string"}function gn(t,e,n){return t===void 0||nw(t)?e:R({},e,{ownerState:R({},e.ownerState,n)})}const rw={disableDefaultClasses:!1},ow=A.createContext(rw);function aw(t){const{disableDefaultClasses:e}=A.useContext(ow);return n=>e?"":t(n)}function sw(t,e=[]){if(t===void 0)return{};const n={};return Object.keys(t).filter(r=>r.match(/^on[A-Z]/)&&typeof t[r]=="function"&&!e.includes(r)).forEach(r=>{n[r]=t[r]}),n}function iw(t,e,n){return typeof t=="function"?t(e,n):t}function us(t){if(t===void 0)return{};const e={};return Object.keys(t).filter(n=>!(n.match(/^on[A-Z]/)&&typeof t[n]=="function")).forEach(n=>{e[n]=t[n]}),e}function lw(t){const{getSlotProps:e,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:s}=t;if(!e){const g=ce(n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),v=R({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=R({},n,o,r);return g.length>0&&(f.className=g),Object.keys(v).length>0&&(f.style=v),{props:f,internalRef:void 0}}const i=sw(R({},o,r)),l=us(r),c=us(o),d=e(i),u=ce(d==null?void 0:d.className,n==null?void 0:n.className,s,o==null?void 0:o.className,r==null?void 0:r.className),m=R({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=R({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(m).length>0&&(w.style=m),{props:w,internalRef:d.ref}}const cw=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function dw(t){var e;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:s=!1}=t,i=kt(t,cw),l=s?{}:iw(r,o),{props:c,internalRef:d}=lw(R({},i,{externalSlotProps:l})),u=Te(d,l==null?void 0:l.ref,(e=t.additionalProps)==null?void 0:e.ref);return gn(n,R({},c,{ref:u}),o)}const Bi="base";function uw(t){return`${Bi}--${t}`}function pw(t,e){return`${Bi}-${t}-${e}`}function ww(t,e){const n=Oi[e];return n?uw(n):pw(t,e)}function fw(t){return typeof t=="function"?t():t}const wr=A.forwardRef(function(e,n){const{children:r,container:o,disablePortal:s=!1}=e,[i,l]=A.useState(null),c=Te(A.isValidElement(r)?r.ref:null,n);if(Ye(()=>{s||l(fw(o)||document.body)},[o,s]),Ye(()=>{if(i&&!s)return dr(n,i),()=>{dr(n,null)}},[n,i,s]),s){if(A.isValidElement(r)){const d={ref:c};return A.cloneElement(r,d)}return a.jsx(A.Fragment,{children:r})}return a.jsx(A.Fragment,{children:i&&Jl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(wr.propTypes={children:p.node,container:p.oneOfType([Cn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(wr.propTypes=$d(wr.propTypes));var Ot="top",Lt="bottom",Gt="right",_t="left",aa="auto",Ln=[Ot,Lt,Gt,_t],We="start",Rn="end",mw="clippingParents",zi="viewport",pn="popper",hw="reference",ps=Ln.reduce(function(t,e){return t.concat([e+"-"+We,e+"-"+Rn])},[]),Vi=[].concat(Ln,[aa]).reduce(function(t,e){return t.concat([e,e+"-"+We,e+"-"+Rn])},[]),gw="beforeRead",bw="read",vw="afterRead",xw="beforeMain",yw="main",Nw="afterMain",jw="beforeWrite",kw="write",Sw="afterWrite",Ew=[gw,bw,vw,xw,yw,Nw,jw,kw,Sw];function Qt(t){return t?(t.nodeName||"").toLowerCase():null}function Bt(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Oe(t){var e=Bt(t).Element;return t instanceof e||t instanceof Element}function Ft(t){var e=Bt(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function sa(t){if(typeof ShadowRoot>"u")return!1;var e=Bt(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Cw(t){var e=t.state;Object.keys(e.elements).forEach(function(n){var r=e.styles[n]||{},o=e.attributes[n]||{},s=e.elements[n];!Ft(s)||!Qt(s)||(Object.assign(s.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?s.removeAttribute(i):s.setAttribute(i,l===!0?"":l)}))})}function Tw(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach(function(r){var o=e.elements[r],s=e.attributes[r]||{},i=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Ft(o)||!Qt(o)||(Object.assign(o.style,l),Object.keys(s).forEach(function(c){o.removeAttribute(c)}))})}}const Rw={name:"applyStyles",enabled:!0,phase:"write",fn:Cw,effect:Tw,requires:["computeStyles"]};function Kt(t){return t.split("-")[0]}var je=Math.max,fr=Math.min,Ke=Math.round;function ho(){var t=navigator.userAgentData;return t!=null&&t.brands&&Array.isArray(t.brands)?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function Fi(){return!/^((?!chrome|android).)*safari/i.test(ho())}function Je(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!1);var r=t.getBoundingClientRect(),o=1,s=1;e&&Ft(t)&&(o=t.offsetWidth>0&&Ke(r.width)/t.offsetWidth||1,s=t.offsetHeight>0&&Ke(r.height)/t.offsetHeight||1);var i=Oe(t)?Bt(t):window,l=i.visualViewport,c=!Fi()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/s,m=r.width/o,w=r.height/s;return{width:m,height:w,top:u,right:d+m,bottom:u+w,left:d,x:d,y:u}}function ia(t){var e=Je(t),n=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:r}}function Li(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&sa(n)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ae(t){return Bt(t).getComputedStyle(t)}function Ow(t){return["table","td","th"].indexOf(Qt(t))>=0}function fe(t){return((Oe(t)?t.ownerDocument:t.document)||window.document).documentElement}function Br(t){return Qt(t)==="html"?t:t.assignedSlot||t.parentNode||(sa(t)?t.host:null)||fe(t)}function ws(t){return!Ft(t)||ae(t).position==="fixed"?null:t.offsetParent}function _w(t){var e=/firefox/i.test(ho()),n=/Trident/i.test(ho());if(n&&Ft(t)){var r=ae(t);if(r.position==="fixed")return null}var o=Br(t);for(sa(o)&&(o=o.host);Ft(o)&&["html","body"].indexOf(Qt(o))<0;){var s=ae(o);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||e&&s.willChange==="filter"||e&&s.filter&&s.filter!=="none")return o;o=o.parentNode}return null}function Gn(t){for(var e=Bt(t),n=ws(t);n&&Ow(n)&&ae(n).position==="static";)n=ws(n);return n&&(Qt(n)==="html"||Qt(n)==="body"&&ae(n).position==="static")?e:n||_w(t)||e}function la(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function jn(t,e,n){return je(t,fr(e,n))}function Pw(t,e,n){var r=jn(t,e,n);return r>n?n:r}function Gi(){return{top:0,right:0,bottom:0,left:0}}function Ui(t){return Object.assign({},Gi(),t)}function qi(t,e){return e.reduce(function(n,r){return n[r]=t,n},{})}var Iw=function(e,n){return e=typeof e=="function"?e(Object.assign({},n.rects,{placement:n.placement})):e,Ui(typeof e!="number"?e:qi(e,Ln))};function Mw(t){var e,n=t.state,r=t.name,o=t.options,s=n.elements.arrow,i=n.modifiersData.popperOffsets,l=Kt(n.placement),c=la(l),d=[_t,Gt].indexOf(l)>=0,u=d?"height":"width";if(!(!s||!i)){var m=Iw(o.padding,n),w=ia(s),g=c==="y"?Ot:_t,v=c==="y"?Lt:Gt,f=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],b=i[c]-n.rects.reference[c],j=Gn(s),S=j?c==="y"?j.clientHeight||0:j.clientWidth||0:0,E=f/2-b/2,k=m[g],x=S-w[u]-m[v],O=S/2-w[u]/2+E,V=jn(k,O,x),C=c;n.modifiersData[r]=(e={},e[C]=V,e.centerOffset=V-O,e)}}function $w(t){var e=t.state,n=t.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=e.elements.popper.querySelector(o),!o)||Li(e.elements.popper,o)&&(e.elements.arrow=o))}const Dw={name:"arrow",enabled:!0,phase:"main",fn:Mw,effect:$w,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ze(t){return t.split("-")[1]}var Aw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Bw(t,e){var n=t.x,r=t.y,o=e.devicePixelRatio||1;return{x:Ke(n*o)/o||0,y:Ke(r*o)/o||0}}function fs(t){var e,n=t.popper,r=t.popperRect,o=t.placement,s=t.variation,i=t.offsets,l=t.position,c=t.gpuAcceleration,d=t.adaptive,u=t.roundOffsets,m=t.isFixed,w=i.x,g=w===void 0?0:w,v=i.y,f=v===void 0?0:v,b=typeof u=="function"?u({x:g,y:f}):{x:g,y:f};g=b.x,f=b.y;var j=i.hasOwnProperty("x"),S=i.hasOwnProperty("y"),E=_t,k=Ot,x=window;if(d){var O=Gn(n),V="clientHeight",C="clientWidth";if(O===Bt(n)&&(O=fe(n),ae(O).position!=="static"&&l==="absolute"&&(V="scrollHeight",C="scrollWidth")),O=O,o===Ot||(o===_t||o===Gt)&&s===Rn){k=Lt;var _=m&&O===x&&x.visualViewport?x.visualViewport.height:O[V];f-=_-r.height,f*=c?1:-1}if(o===_t||(o===Ot||o===Lt)&&s===Rn){E=Gt;var F=m&&O===x&&x.visualViewport?x.visualViewport.width:O[C];g-=F-r.width,g*=c?1:-1}}var $=Object.assign({position:l},d&&Aw),et=u===!0?Bw({x:g,y:f},Bt(n)):{x:g,y:f};if(g=et.x,f=et.y,c){var Z;return Object.assign({},$,(Z={},Z[k]=S?"0":"",Z[E]=j?"0":"",Z.transform=(x.devicePixelRatio||1)<=1?"translate("+g+"px, "+f+"px)":"translate3d("+g+"px, "+f+"px, 0)",Z))}return Object.assign({},$,(e={},e[k]=S?f+"px":"",e[E]=j?g+"px":"",e.transform="",e))}function zw(t){var e=t.state,n=t.options,r=n.gpuAcceleration,o=r===void 0?!0:r,s=n.adaptive,i=s===void 0?!0:s,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:Kt(e.placement),variation:Ze(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,fs(Object.assign({},d,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:i,roundOffsets:c})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,fs(Object.assign({},d,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const Vw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:zw,data:{}};var Qn={passive:!0};function Fw(t){var e=t.state,n=t.instance,r=t.options,o=r.scroll,s=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Bt(e.elements.popper),d=[].concat(e.scrollParents.reference,e.scrollParents.popper);return s&&d.forEach(function(u){u.addEventListener("scroll",n.update,Qn)}),l&&c.addEventListener("resize",n.update,Qn),function(){s&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Qn)}),l&&c.removeEventListener("resize",n.update,Qn)}}const Lw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Fw,data:{}};var Gw={left:"right",right:"left",bottom:"top",top:"bottom"};function ar(t){return t.replace(/left|right|bottom|top/g,function(e){return Gw[e]})}var Uw={start:"end",end:"start"};function ms(t){return t.replace(/start|end/g,function(e){return Uw[e]})}function ca(t){var e=Bt(t),n=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:n,scrollTop:r}}function da(t){return Je(fe(t)).left+ca(t).scrollLeft}function qw(t,e){var n=Bt(t),r=fe(t),o=n.visualViewport,s=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){s=o.width,i=o.height;var d=Fi();(d||!d&&e==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:s,height:i,x:l+da(t),y:c}}function Xw(t){var e,n=fe(t),r=ca(t),o=(e=t.ownerDocument)==null?void 0:e.body,s=je(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=je(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+da(t),c=-r.scrollTop;return ae(o||n).direction==="rtl"&&(l+=je(n.clientWidth,o?o.clientWidth:0)-s),{width:s,height:i,x:l,y:c}}function ua(t){var e=ae(t),n=e.overflow,r=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Xi(t){return["html","body","#document"].indexOf(Qt(t))>=0?t.ownerDocument.body:Ft(t)&&ua(t)?t:Xi(Br(t))}function kn(t,e){var n;e===void 0&&(e=[]);var r=Xi(t),o=r===((n=t.ownerDocument)==null?void 0:n.body),s=Bt(r),i=o?[s].concat(s.visualViewport||[],ua(r)?r:[]):r,l=e.concat(i);return o?l:l.concat(kn(Br(i)))}function go(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Hw(t,e){var n=Je(t,!1,e==="fixed");return n.top=n.top+t.clientTop,n.left=n.left+t.clientLeft,n.bottom=n.top+t.clientHeight,n.right=n.left+t.clientWidth,n.width=t.clientWidth,n.height=t.clientHeight,n.x=n.left,n.y=n.top,n}function hs(t,e,n){return e===zi?go(qw(t,n)):Oe(e)?Hw(e,n):go(Xw(fe(t)))}function Yw(t){var e=kn(Br(t)),n=["absolute","fixed"].indexOf(ae(t).position)>=0,r=n&&Ft(t)?Gn(t):t;return Oe(r)?e.filter(function(o){return Oe(o)&&Li(o,r)&&Qt(o)!=="body"}):[]}function Ww(t,e,n,r){var o=e==="clippingParents"?Yw(t):[].concat(e),s=[].concat(o,[n]),i=s[0],l=s.reduce(function(c,d){var u=hs(t,d,r);return c.top=je(u.top,c.top),c.right=fr(u.right,c.right),c.bottom=fr(u.bottom,c.bottom),c.left=je(u.left,c.left),c},hs(t,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Hi(t){var e=t.reference,n=t.element,r=t.placement,o=r?Kt(r):null,s=r?Ze(r):null,i=e.x+e.width/2-n.width/2,l=e.y+e.height/2-n.height/2,c;switch(o){case Ot:c={x:i,y:e.y-n.height};break;case Lt:c={x:i,y:e.y+e.height};break;case Gt:c={x:e.x+e.width,y:l};break;case _t:c={x:e.x-n.width,y:l};break;default:c={x:e.x,y:e.y}}var d=o?la(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(s){case We:c[d]=c[d]-(e[u]/2-n[u]/2);break;case Rn:c[d]=c[d]+(e[u]/2-n[u]/2);break}}return c}function On(t,e){e===void 0&&(e={});var n=e,r=n.placement,o=r===void 0?t.placement:r,s=n.strategy,i=s===void 0?t.strategy:s,l=n.boundary,c=l===void 0?mw:l,d=n.rootBoundary,u=d===void 0?zi:d,m=n.elementContext,w=m===void 0?pn:m,g=n.altBoundary,v=g===void 0?!1:g,f=n.padding,b=f===void 0?0:f,j=Ui(typeof b!="number"?b:qi(b,Ln)),S=w===pn?hw:pn,E=t.rects.popper,k=t.elements[v?S:w],x=Ww(Oe(k)?k:k.contextElement||fe(t.elements.popper),c,u,i),O=Je(t.elements.reference),V=Hi({reference:O,element:E,placement:o}),C=go(Object.assign({},E,V)),_=w===pn?C:O,F={top:x.top-_.top+j.top,bottom:_.bottom-x.bottom+j.bottom,left:x.left-_.left+j.left,right:_.right-x.right+j.right},$=t.modifiersData.offset;if(w===pn&&$){var et=$[o];Object.keys(F).forEach(function(Z){var D=[Gt,Lt].indexOf(Z)>=0?1:-1,I=[Ot,Lt].indexOf(Z)>=0?"y":"x";F[Z]+=et[I]*D})}return F}function Kw(t,e){e===void 0&&(e={});var n=e,r=n.placement,o=n.boundary,s=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?Vi:c,u=Ze(r),m=u?l?ps:ps.filter(function(v){return Ze(v)===u}):Ln,w=m.filter(function(v){return d.indexOf(v)>=0});w.length===0&&(w=m);var g=w.reduce(function(v,f){return v[f]=On(t,{placement:f,boundary:o,rootBoundary:s,padding:i})[Kt(f)],v},{});return Object.keys(g).sort(function(v,f){return g[v]-g[f]})}function Jw(t){if(Kt(t)===aa)return[];var e=ar(t);return[ms(t),e,ms(e)]}function Zw(t){var e=t.state,n=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,m=n.rootBoundary,w=n.altBoundary,g=n.flipVariations,v=g===void 0?!0:g,f=n.allowedAutoPlacements,b=e.options.placement,j=Kt(b),S=j===b,E=c||(S||!v?[ar(b)]:Jw(b)),k=[b].concat(E).reduce(function(z,W){return z.concat(Kt(W)===aa?Kw(e,{placement:W,boundary:u,rootBoundary:m,padding:d,flipVariations:v,allowedAutoPlacements:f}):W)},[]),x=e.rects.reference,O=e.rects.popper,V=new Map,C=!0,_=k[0],F=0;F<k.length;F++){var $=k[F],et=Kt($),Z=Ze($)===We,D=[Ot,Lt].indexOf(et)>=0,I=D?"width":"height",M=On(e,{placement:$,boundary:u,rootBoundary:m,altBoundary:w,padding:d}),L=D?Z?Gt:_t:Z?Lt:Ot;x[I]>O[I]&&(L=ar(L));var X=ar(L),ot=[];if(s&&ot.push(M[et]<=0),l&&ot.push(M[L]<=0,M[X]<=0),ot.every(function(z){return z})){_=$,C=!1;break}V.set($,ot)}if(C)for(var N=v?3:1,T=function(W){var H=k.find(function(Y){var q=V.get(Y);if(q)return q.slice(0,W).every(function(Q){return Q})});if(H)return _=H,"break"},G=N;G>0;G--){var U=T(G);if(U==="break")break}e.placement!==_&&(e.modifiersData[r]._skip=!0,e.placement=_,e.reset=!0)}}const Qw={name:"flip",enabled:!0,phase:"main",fn:Zw,requiresIfExists:["offset"],data:{_skip:!1}};function gs(t,e,n){return n===void 0&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function bs(t){return[Ot,Gt,Lt,_t].some(function(e){return t[e]>=0})}function tf(t){var e=t.state,n=t.name,r=e.rects.reference,o=e.rects.popper,s=e.modifiersData.preventOverflow,i=On(e,{elementContext:"reference"}),l=On(e,{altBoundary:!0}),c=gs(i,r),d=gs(l,o,s),u=bs(c),m=bs(d);e.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:m},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":m})}const ef={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:tf};function nf(t,e,n){var r=Kt(t),o=[_t,Ot].indexOf(r)>=0?-1:1,s=typeof n=="function"?n(Object.assign({},e,{placement:t})):n,i=s[0],l=s[1];return i=i||0,l=(l||0)*o,[_t,Gt].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function rf(t){var e=t.state,n=t.options,r=t.name,o=n.offset,s=o===void 0?[0,0]:o,i=Vi.reduce(function(u,m){return u[m]=nf(m,e.rects,s),u},{}),l=i[e.placement],c=l.x,d=l.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=c,e.modifiersData.popperOffsets.y+=d),e.modifiersData[r]=i}const of={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:rf};function af(t){var e=t.state,n=t.name;e.modifiersData[n]=Hi({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})}const sf={name:"popperOffsets",enabled:!0,phase:"read",fn:af,data:{}};function lf(t){return t==="x"?"y":"x"}function cf(t){var e=t.state,n=t.options,r=t.name,o=n.mainAxis,s=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,m=n.padding,w=n.tether,g=w===void 0?!0:w,v=n.tetherOffset,f=v===void 0?0:v,b=On(e,{boundary:c,rootBoundary:d,padding:m,altBoundary:u}),j=Kt(e.placement),S=Ze(e.placement),E=!S,k=la(j),x=lf(k),O=e.modifiersData.popperOffsets,V=e.rects.reference,C=e.rects.popper,_=typeof f=="function"?f(Object.assign({},e.rects,{placement:e.placement})):f,F=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),$=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,et={x:0,y:0};if(O){if(s){var Z,D=k==="y"?Ot:_t,I=k==="y"?Lt:Gt,M=k==="y"?"height":"width",L=O[k],X=L+b[D],ot=L-b[I],N=g?-C[M]/2:0,T=S===We?V[M]:C[M],G=S===We?-C[M]:-V[M],U=e.elements.arrow,z=g&&U?ia(U):{width:0,height:0},W=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Gi(),H=W[D],Y=W[I],q=jn(0,V[M],z[M]),Q=E?V[M]/2-N-q-H-F.mainAxis:T-q-H-F.mainAxis,tt=E?-V[M]/2+N+q+Y+F.mainAxis:G+q+Y+F.mainAxis,ut=e.elements.arrow&&Gn(e.elements.arrow),P=ut?k==="y"?ut.clientTop||0:ut.clientLeft||0:0,jt=(Z=$==null?void 0:$[k])!=null?Z:0,B=L+Q-jt-P,yt=L+tt-jt,qt=jn(g?fr(X,B):X,L,g?je(ot,yt):ot);O[k]=qt,et[k]=qt-L}if(l){var me,Ct=k==="x"?Ot:_t,qn=k==="x"?Lt:Gt,Xt=O[x],Me=x==="y"?"height":"width",he=Xt+b[Ct],$e=Xt-b[qn],De=[Ot,_t].indexOf(j)!==-1,Ae=(me=$==null?void 0:$[x])!=null?me:0,ge=De?he:Xt-V[Me]-C[Me]-Ae+F.altAxis,nn=De?Xt+V[Me]+C[Me]-Ae-F.altAxis:$e,Xn=g&&De?Pw(ge,Xt,nn):jn(g?ge:he,Xt,g?nn:$e);O[x]=Xn,et[x]=Xn-Xt}e.modifiersData[r]=et}}const df={name:"preventOverflow",enabled:!0,phase:"main",fn:cf,requiresIfExists:["offset"]};function uf(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function pf(t){return t===Bt(t)||!Ft(t)?ca(t):uf(t)}function wf(t){var e=t.getBoundingClientRect(),n=Ke(e.width)/t.offsetWidth||1,r=Ke(e.height)/t.offsetHeight||1;return n!==1||r!==1}function ff(t,e,n){n===void 0&&(n=!1);var r=Ft(e),o=Ft(e)&&wf(e),s=fe(e),i=Je(t,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Qt(e)!=="body"||ua(s))&&(l=pf(e)),Ft(e)?(c=Je(e,!0),c.x+=e.clientLeft,c.y+=e.clientTop):s&&(c.x=da(s))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function mf(t){var e=new Map,n=new Set,r=[];t.forEach(function(s){e.set(s.name,s)});function o(s){n.add(s.name);var i=[].concat(s.requires||[],s.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=e.get(l);c&&o(c)}}),r.push(s)}return t.forEach(function(s){n.has(s.name)||o(s)}),r}function hf(t){var e=mf(t);return Ew.reduce(function(n,r){return n.concat(e.filter(function(o){return o.phase===r}))},[])}function gf(t){var e;return function(){return e||(e=new Promise(function(n){Promise.resolve().then(function(){e=void 0,n(t())})})),e}}function bf(t){var e=t.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(e).map(function(n){return e[n]})}var vs={placement:"bottom",modifiers:[],strategy:"absolute"};function xs(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function vf(t){t===void 0&&(t={});var e=t,n=e.defaultModifiers,r=n===void 0?[]:n,o=e.defaultOptions,s=o===void 0?vs:o;return function(l,c,d){d===void 0&&(d=s);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},vs,s),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},m=[],w=!1,g={state:u,setOptions:function(j){var S=typeof j=="function"?j(u.options):j;f(),u.options=Object.assign({},s,u.options,S),u.scrollParents={reference:Oe(l)?kn(l):l.contextElement?kn(l.contextElement):[],popper:kn(c)};var E=hf(bf([].concat(r,u.options.modifiers)));return u.orderedModifiers=E.filter(function(k){return k.enabled}),v(),g.update()},forceUpdate:function(){if(!w){var j=u.elements,S=j.reference,E=j.popper;if(xs(S,E)){u.rects={reference:ff(S,Gn(E),u.options.strategy==="fixed"),popper:ia(E)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(F){return u.modifiersData[F.name]=Object.assign({},F.data)});for(var k=0;k<u.orderedModifiers.length;k++){if(u.reset===!0){u.reset=!1,k=-1;continue}var x=u.orderedModifiers[k],O=x.fn,V=x.options,C=V===void 0?{}:V,_=x.name;typeof O=="function"&&(u=O({state:u,options:C,name:_,instance:g})||u)}}}},update:gf(function(){return new Promise(function(b){g.forceUpdate(),b(u)})}),destroy:function(){f(),w=!0}};if(!xs(l,c))return g;g.setOptions(d).then(function(b){!w&&d.onFirstUpdate&&d.onFirstUpdate(b)});function v(){u.orderedModifiers.forEach(function(b){var j=b.name,S=b.options,E=S===void 0?{}:S,k=b.effect;if(typeof k=="function"){var x=k({state:u,name:j,instance:g,options:E}),O=function(){};m.push(x||O)}})}function f(){m.forEach(function(b){return b()}),m=[]}return g}}var xf=[Lw,sf,Vw,Rw,of,Qw,df,Dw,ef],yf=vf({defaultModifiers:xf});const Nf="Popper";function jf(t){return ww(Nf,t)}const kf=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Sf=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Ef(t,e){if(e==="ltr")return t;switch(t){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return t}}function mr(t){return typeof t=="function"?t():t}function zr(t){return t.nodeType!==void 0}function Cf(t){return!zr(t)}const Tf=()=>Ko({root:["root"]},aw(jf)),Rf={},Of=A.forwardRef(function(e,n){var r;const{anchorEl:o,children:s,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:m,popperRef:w,slotProps:g={},slots:v={},TransitionProps:f}=e,b=kt(e,kf),j=A.useRef(null),S=Te(j,n),E=A.useRef(null),k=Te(E,w),x=A.useRef(k);Ye(()=>{x.current=k},[k]),A.useImperativeHandle(w,()=>E.current,[]);const O=Ef(u,i),[V,C]=A.useState(O),[_,F]=A.useState(mr(o));A.useEffect(()=>{E.current&&E.current.forceUpdate()}),A.useEffect(()=>{o&&F(mr(o))},[o]),Ye(()=>{if(!_||!d)return;const I=X=>{C(X.placement)};if(process.env.NODE_ENV!=="production"&&_&&zr(_)&&_.nodeType===1){const X=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&X.top===0&&X.left===0&&X.right===0&&X.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let M=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:X})=>{I(X)}}];c!=null&&(M=M.concat(c)),m&&m.modifiers!=null&&(M=M.concat(m.modifiers));const L=yf(_,j.current,R({placement:O},m,{modifiers:M}));return x.current(L),()=>{L.destroy(),x.current(null)}},[_,l,c,d,m,O]);const $={placement:V};f!==null&&($.TransitionProps=f);const et=Tf(),Z=(r=v.root)!=null?r:"div",D=dw({elementType:Z,externalSlotProps:g.root,externalForwardedProps:b,additionalProps:{role:"tooltip",ref:S},ownerState:e,className:et.root});return a.jsx(Z,R({},D,{children:typeof s=="function"?s($):s}))}),Yi=A.forwardRef(function(e,n){const{anchorEl:r,children:o,container:s,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:m="bottom",popperOptions:w=Rf,popperRef:g,style:v,transition:f=!1,slotProps:b={},slots:j={}}=e,S=kt(e,Sf),[E,k]=A.useState(!0),x=()=>{k(!1)},O=()=>{k(!0)};if(!c&&!u&&(!f||E))return null;let V;if(s)V=s;else if(r){const F=mr(r);V=F&&zr(F)?cr(F).body:cr(null).body}const C=!u&&c&&(!f||E)?"none":void 0,_=f?{in:u,onEnter:x,onExited:O}:void 0;return a.jsx(wr,{disablePortal:l,container:V,children:a.jsx(Of,R({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:f?!E:u,placement:m,popperOptions:w,popperRef:g,slotProps:b,slots:j},S,{style:R({position:"fixed",top:0,left:0,display:C},v),TransitionProps:_,children:o}))})});process.env.NODE_ENV!=="production"&&(Yi.propTypes={anchorEl:Ho(p.oneOfType([Cn,p.object,p.func]),t=>{if(t.open){const e=mr(t.anchorEl);if(e&&zr(e)&&e.nodeType===1){const n=e.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!e||typeof e.getBoundingClientRect!="function"||Cf(e)&&e.contextElement!=null&&e.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Cn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:ki,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function Wi(){const t=$i(na);return process.env.NODE_ENV!=="production"&&A.useDebugValue(t),t[ra]||t}function bo(t,e){return bo=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},bo(t,e)}function _f(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,bo(t,e)}const ys={disabled:!1};var Pf=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const Ki=h.createContext(null);var If=function(e){return e.scrollTop},bn="unmounted",xe="exited",ye="entering",Ue="entered",vo="exiting",se=function(t){_f(e,t);function e(r,o){var s;s=t.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return s.appearStatus=null,r.in?l?(c=xe,s.appearStatus=ye):c=Ue:r.unmountOnExit||r.mountOnEnter?c=bn:c=xe,s.state={status:c},s.nextCallback=null,s}e.getDerivedStateFromProps=function(o,s){var i=o.in;return i&&s.status===bn?{status:xe}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var s=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==ye&&i!==Ue&&(s=ye):(i===ye||i===Ue)&&(s=vo)}this.updateStatus(!1,s)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,s,i,l;return s=i=l=o,o!=null&&typeof o!="number"&&(s=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:s,enter:i,appear:l}},n.updateStatus=function(o,s){if(o===void 0&&(o=!1),s!==null)if(this.cancelNextCallback(),s===ye){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this);i&&If(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===xe&&this.setState({status:bn})},n.performEnter=function(o){var s=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[fn.findDOMNode(this),l],d=c[0],u=c[1],m=this.getTimeouts(),w=l?m.appear:m.enter;if(!o&&!i||ys.disabled){this.safeSetState({status:Ue},function(){s.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:ye},function(){s.props.onEntering(d,u),s.onTransitionEnd(w,function(){s.safeSetState({status:Ue},function(){s.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,s=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:fn.findDOMNode(this);if(!s||ys.disabled){this.safeSetState({status:xe},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:vo},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:xe},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,s){s=this.setNextCallback(s),this.setState(o,s)},n.setNextCallback=function(o){var s=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,s.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,s){this.setNextCallback(s);var i=this.props.nodeRef?this.props.nodeRef.current:fn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===bn)return null;var s=this.props,i=s.children;s.in,s.mountOnEnter,s.unmountOnExit,s.appear,s.enter,s.exit,s.timeout,s.addEndListener,s.onEnter,s.onEntering,s.onEntered,s.onExit,s.onExiting,s.onExited,s.nodeRef;var l=kt(s,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return h.createElement(Ki.Provider,{value:null},typeof i=="function"?i(o,l):h.cloneElement(h.Children.only(i),l))},e}(h.Component);se.contextType=Ki;se.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(t,e,n,r,o,s){var i=t[e];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(t,e,n,r,o,s)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(e){var n=Pf;e.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return n.apply(void 0,[e].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Ge(){}se.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ge,onEntering:Ge,onEntered:Ge,onExit:Ge,onExiting:Ge,onExited:Ge};se.UNMOUNTED=bn;se.EXITED=xe;se.ENTERING=ye;se.ENTERED=Ue;se.EXITING=vo;const Mf=t=>t.scrollTop;function Ns(t,e){var n,r;const{timeout:o,easing:s,style:i={}}=t;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[e.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof s=="object"?s[e.mode]:s,delay:i.transitionDelay}}const $f=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function xo(t){return`scale(${t}, ${t**2})`}const Df={entering:{opacity:1,transform:xo(1)},entered:{opacity:1,transform:"none"}},oo=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),hr=A.forwardRef(function(e,n){const{addEndListener:r,appear:o=!0,children:s,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:m,onExited:w,onExiting:g,style:v,timeout:f="auto",TransitionComponent:b=se}=e,j=kt(e,$f),S=hn(),E=A.useRef(),k=Wi(),x=A.useRef(null),O=Te(x,s.ref,n),V=I=>M=>{if(I){const L=x.current;M===void 0?I(L):I(L,M)}},C=V(u),_=V((I,M)=>{Mf(I);const{duration:L,delay:X,easing:ot}=Ns({style:v,timeout:f,easing:i},{mode:"enter"});let N;f==="auto"?(N=k.transitions.getAutoHeightDuration(I.clientHeight),E.current=N):N=L,I.style.transition=[k.transitions.create("opacity",{duration:N,delay:X}),k.transitions.create("transform",{duration:oo?N:N*.666,delay:X,easing:ot})].join(","),c&&c(I,M)}),F=V(d),$=V(g),et=V(I=>{const{duration:M,delay:L,easing:X}=Ns({style:v,timeout:f,easing:i},{mode:"exit"});let ot;f==="auto"?(ot=k.transitions.getAutoHeightDuration(I.clientHeight),E.current=ot):ot=M,I.style.transition=[k.transitions.create("opacity",{duration:ot,delay:L}),k.transitions.create("transform",{duration:oo?ot:ot*.666,delay:oo?L:L||ot*.333,easing:X})].join(","),I.style.opacity=0,I.style.transform=xo(.75),m&&m(I)}),Z=V(w),D=I=>{f==="auto"&&S.start(E.current||0,I),r&&r(x.current,I)};return a.jsx(b,R({appear:o,in:l,nodeRef:x,onEnter:_,onEntered:F,onEntering:C,onExit:et,onExited:Z,onExiting:$,addEndListener:D,timeout:f==="auto"?null:f},j,{children:(I,M)=>A.cloneElement(s,R({style:R({opacity:0,transform:xo(.75),visibility:I==="exited"&&!l?"hidden":void 0},Df[I],v,s.props.style),ref:O},M))}))});process.env.NODE_ENV!=="production"&&(hr.propTypes={addEndListener:p.func,appear:p.bool,children:Wo.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});hr.muiSupportAuto=!0;const Af=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Bf=Fn(Yi,{name:"MuiPopper",slot:"Root",overridesResolver:(t,e)=>e.root})({}),pa=A.forwardRef(function(e,n){var r;const o=Mi(),s=oa({props:e,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:m,keepMounted:w,modifiers:g,open:v,placement:f,popperOptions:b,popperRef:j,transition:S,slots:E,slotProps:k}=s,x=kt(s,Af),O=(r=E==null?void 0:E.root)!=null?r:c==null?void 0:c.Root,V=R({anchorEl:i,container:u,disablePortal:m,keepMounted:w,modifiers:g,open:v,placement:f,popperOptions:b,popperRef:j,transition:S},x);return a.jsx(Bf,R({as:l,direction:o==null?void 0:o.direction,slots:{root:O},slotProps:k??d},V,{ref:n}))});process.env.NODE_ENV!=="production"&&(pa.propTypes={anchorEl:p.oneOfType([Cn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Cn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:ki,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});function zf(t){return Cr("MuiTooltip",t)}const de=_i("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),Vf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Ff(t){return Math.round(t*1e5)/1e5}const Lf=t=>{const{classes:e,disableInteractive:n,arrow:r,touch:o,placement:s}=t,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Zt(s.split("-")[0])}`],arrow:["arrow"]};return Ko(i,zf,e)},Gf=Fn(pa,{name:"MuiTooltip",slot:"Popper",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.popper,!n.disableInteractive&&e.popperInteractive,n.arrow&&e.popperArrow,!n.open&&e.popperClose]}})(({theme:t,ownerState:e,open:n})=>R({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none"},!e.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},e.arrow&&{[`&[data-popper-placement*="bottom"] .${de.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${de.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${de.arrow}`]:R({},e.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${de.arrow}`]:R({},e.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Uf=Fn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.tooltip,n.touch&&e.touch,n.arrow&&e.tooltipArrow,e[`tooltipPlacement${Zt(n.placement.split("-")[0])}`]]}})(({theme:t,ownerState:e})=>R({backgroundColor:t.vars?t.vars.palette.Tooltip.bg:Di(t.palette.grey[700],.92),borderRadius:(t.vars||t).shape.borderRadius,color:(t.vars||t).palette.common.white,fontFamily:t.typography.fontFamily,padding:"4px 8px",fontSize:t.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:t.typography.fontWeightMedium},e.arrow&&{position:"relative",margin:0},e.touch&&{padding:"8px 16px",fontSize:t.typography.pxToRem(14),lineHeight:`${Ff(16/14)}em`,fontWeight:t.typography.fontWeightRegular},{[`.${de.popper}[data-popper-placement*="left"] &`]:R({transformOrigin:"right center"},e.isRtl?R({marginLeft:"14px"},e.touch&&{marginLeft:"24px"}):R({marginRight:"14px"},e.touch&&{marginRight:"24px"})),[`.${de.popper}[data-popper-placement*="right"] &`]:R({transformOrigin:"left center"},e.isRtl?R({marginRight:"14px"},e.touch&&{marginRight:"24px"}):R({marginLeft:"14px"},e.touch&&{marginLeft:"24px"})),[`.${de.popper}[data-popper-placement*="top"] &`]:R({transformOrigin:"center bottom",marginBottom:"14px"},e.touch&&{marginBottom:"24px"}),[`.${de.popper}[data-popper-placement*="bottom"] &`]:R({transformOrigin:"center top",marginTop:"14px"},e.touch&&{marginTop:"24px"})})),qf=Fn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(({theme:t})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?t.vars.palette.Tooltip.bg:Di(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let tr=!1;const js=new Bn;let wn={x:0,y:0};function er(t,e){return n=>{e&&e(n),t(n)}}const Ji=A.forwardRef(function(e,n){var r,o,s,i,l,c,d,u,m,w,g,v,f,b,j,S,E,k,x;const O=oa({props:e,name:"MuiTooltip"}),{arrow:V=!1,children:C,components:_={},componentsProps:F={},describeChild:$=!1,disableFocusListener:et=!1,disableHoverListener:Z=!1,disableInteractive:D=!1,disableTouchListener:I=!1,enterDelay:M=100,enterNextDelay:L=0,enterTouchDelay:X=700,followCursor:ot=!1,id:N,leaveDelay:T=0,leaveTouchDelay:G=1500,onClose:U,onOpen:z,open:W,placement:H="bottom",PopperComponent:Y,PopperProps:q={},slotProps:Q={},slots:tt={},title:ut,TransitionComponent:P=hr,TransitionProps:jt}=O,B=kt(O,Vf),yt=A.isValidElement(C)?C:a.jsx("span",{children:C}),qt=Wi(),me=qt.direction==="rtl",[Ct,qn]=A.useState(),[Xt,Me]=A.useState(null),he=A.useRef(!1),$e=D||ot,De=hn(),Ae=hn(),ge=hn(),nn=hn(),[Xn,fa]=Ei({controlled:W,default:!1,name:"Tooltip",state:"open"});let te=Xn;if(process.env.NODE_ENV!=="production"){const{current:nt}=A.useRef(W!==void 0);A.useEffect(()=>{Ct&&Ct.disabled&&!nt&&ut!==""&&Ct.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ut,Ct,nt])}const Vr=Si(N),rn=A.useRef(),Hn=fo(()=>{rn.current!==void 0&&(document.body.style.WebkitUserSelect=rn.current,rn.current=void 0),nn.clear()});A.useEffect(()=>Hn,[Hn]);const ma=nt=>{js.clear(),tr=!0,fa(!0),z&&!te&&z(nt)},Yn=fo(nt=>{js.start(800+T,()=>{tr=!1}),fa(!1),U&&te&&U(nt),De.start(qt.transitions.duration.shortest,()=>{he.current=!1})}),Fr=nt=>{he.current&&nt.type!=="touchstart"||(Ct&&Ct.removeAttribute("title"),Ae.clear(),ge.clear(),M||tr&&L?Ae.start(tr?L:M,()=>{ma(nt)}):ma(nt))},ha=nt=>{Ae.clear(),ge.start(T,()=>{Yn(nt)})},{isFocusVisibleRef:ga,onBlur:jl,onFocus:kl,ref:Sl}=Ci(),[,ba]=A.useState(!1),va=nt=>{jl(nt),ga.current===!1&&(ba(!1),ha(nt))},xa=nt=>{Ct||qn(nt.currentTarget),kl(nt),ga.current===!0&&(ba(!0),Fr(nt))},ya=nt=>{he.current=!0;const Mt=yt.props;Mt.onTouchStart&&Mt.onTouchStart(nt)},Na=Fr,ja=ha,El=nt=>{ya(nt),ge.clear(),De.clear(),Hn(),rn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",nn.start(X,()=>{document.body.style.WebkitUserSelect=rn.current,Fr(nt)})},Cl=nt=>{yt.props.onTouchEnd&&yt.props.onTouchEnd(nt),Hn(),ge.start(G,()=>{Yn(nt)})};A.useEffect(()=>{if(!te)return;function nt(Mt){(Mt.key==="Escape"||Mt.key==="Esc")&&Yn(Mt)}return document.addEventListener("keydown",nt),()=>{document.removeEventListener("keydown",nt)}},[Yn,te]);const Tl=Te(yt.ref,Sl,qn,n);!ut&&ut!==0&&(te=!1);const Lr=A.useRef(),Rl=nt=>{const Mt=yt.props;Mt.onMouseMove&&Mt.onMouseMove(nt),wn={x:nt.clientX,y:nt.clientY},Lr.current&&Lr.current.update()},on={},Gr=typeof ut=="string";$?(on.title=!te&&Gr&&!Z?ut:null,on["aria-describedby"]=te?Vr:null):(on["aria-label"]=Gr?ut:null,on["aria-labelledby"]=te&&!Gr?Vr:null);const zt=R({},on,B,yt.props,{className:ce(B.className,yt.props.className),onTouchStart:ya,ref:Tl},ot?{onMouseMove:Rl}:{});process.env.NODE_ENV!=="production"&&(zt["data-mui-internal-clone-element"]=!0,A.useEffect(()=>{Ct&&!Ct.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ct]));const an={};I||(zt.onTouchStart=El,zt.onTouchEnd=Cl),Z||(zt.onMouseOver=er(Na,zt.onMouseOver),zt.onMouseLeave=er(ja,zt.onMouseLeave),$e||(an.onMouseOver=Na,an.onMouseLeave=ja)),et||(zt.onFocus=er(xa,zt.onFocus),zt.onBlur=er(va,zt.onBlur),$e||(an.onFocus=xa,an.onBlur=va)),process.env.NODE_ENV!=="production"&&yt.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${yt.props.title}\` or the Tooltip component.`].join(`
`));const Ol=A.useMemo(()=>{var nt;let Mt=[{name:"arrow",enabled:!!Xt,options:{element:Xt,padding:4}}];return(nt=q.popperOptions)!=null&&nt.modifiers&&(Mt=Mt.concat(q.popperOptions.modifiers)),R({},q.popperOptions,{modifiers:Mt})},[Xt,q]),sn=R({},O,{isRtl:me,arrow:V,disableInteractive:$e,placement:H,PopperComponentProp:Y,touch:he.current}),Ur=Lf(sn),ka=(r=(o=tt.popper)!=null?o:_.Popper)!=null?r:Gf,Sa=(s=(i=(l=tt.transition)!=null?l:_.Transition)!=null?i:P)!=null?s:hr,Ea=(c=(d=tt.tooltip)!=null?d:_.Tooltip)!=null?c:Uf,Ca=(u=(m=tt.arrow)!=null?m:_.Arrow)!=null?u:qf,_l=gn(ka,R({},q,(w=Q.popper)!=null?w:F.popper,{className:ce(Ur.popper,q==null?void 0:q.className,(g=(v=Q.popper)!=null?v:F.popper)==null?void 0:g.className)}),sn),Pl=gn(Sa,R({},jt,(f=Q.transition)!=null?f:F.transition),sn),Il=gn(Ea,R({},(b=Q.tooltip)!=null?b:F.tooltip,{className:ce(Ur.tooltip,(j=(S=Q.tooltip)!=null?S:F.tooltip)==null?void 0:j.className)}),sn),Ml=gn(Ca,R({},(E=Q.arrow)!=null?E:F.arrow,{className:ce(Ur.arrow,(k=(x=Q.arrow)!=null?x:F.arrow)==null?void 0:k.className)}),sn);return a.jsxs(A.Fragment,{children:[A.cloneElement(yt,zt),a.jsx(ka,R({as:Y??pa,placement:H,anchorEl:ot?{getBoundingClientRect:()=>({top:wn.y,left:wn.x,right:wn.x,bottom:wn.y,width:0,height:0})}:Ct,popperRef:Lr,open:Ct?te:!1,id:Vr,transition:!0},an,_l,{popperOptions:Ol,children:({TransitionProps:nt})=>a.jsx(Sa,R({timeout:qt.transitions.duration.shorter},nt,Pl,{children:a.jsxs(Ea,R({},Il,{children:[ut,V?a.jsx(Ca,R({},Ml,{ref:Me})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ji.propTypes={arrow:p.bool,children:Wo.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});function ks(t,e,n){return t?a.jsx(Yt.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:a.jsx("img",{src:t,alt:`${n?"Leading":"Trailing"} icon for ${e}`})}):void 0}function wa(t){const{onClick:e,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:s=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:m=!1,hasDisabledGutters:w=!1,hasDivider:g=!1,focusVisibleClassName:v,id:f,children:b}=t,j=a.jsx(Yt.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:g,focusVisibleClassName:v,onClick:e,id:f,children:n?a.jsxs(a.Fragment,{children:[ks(s,n,!0),a.jsx(Yt.ListItemText,{primary:n,inset:!s&&o}),m?a.jsx(Yt.ListItemIcon,{className:"papi-menu-icon-trailing",children:a.jsx(ew,{})}):ks(i,n,!1)]}):b});return r?a.jsx(Ji,{title:r,placement:"right",children:a.jsx("div",{children:j})}):j}function Zi(t){return Object.entries(t.groups).map(([n,r])=>({id:n,group:r}))}function Xf(t){const[e,n]=h.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:s}=t,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=Zi(s).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),a.jsx(Qi,{...t,includedGroups:d})};return a.jsxs(a.Fragment,{children:[a.jsx(wa,{onClick:i,...o,isSubMenuParent:!0}),a.jsx(Yt.Menu,{anchorEl:e,open:!!e,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Hf=(t,e)=>e.filter(o=>o.group===t).sort((o,s)=>(o.order||0)-(s.order||0));function Qi(t){const{menuDefinition:e,onClick:n,commandHandler:r,includedGroups:o}=t,{items:s,allowForLeadingIcons:i}=h.useMemo(()=>{const u=o&&o.length>0?o:Zi(e).filter(v=>!("menuItem"in v.group)),m=Object.values(u).sort((v,f)=>(v.group.order||0)-(f.group.order||0)),w=[];m.forEach(v=>{Hf(v.id,e.items).forEach(f=>w.push({item:f,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const g=w.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:w,allowForLeadingIcons:g}},[o,e]),l=({item:u,isLastItemInGroup:m})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:m,allowForLeadingIcons:i}),[c]=s;if(!c)return a.jsx("div",{});const d=c.item.group;return a.jsx("div",{role:"menu","aria-label":d,children:s.map((u,m)=>{const{item:w}=u,g=l(u);if("command"in w){const v=w.group+m;return a.jsx(wa,{onClick:f=>{n==null||n(f),r(w)},...g},v)}return a.jsx(Xf,{parentMenuItem:w,parentItemProps:g,...t},d+w.id)})},d)}function Yf(t){const{menuDefinition:e,columnId:n}=t;let s=Object.entries(e.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in e&&e.columns[n]&&(s=s.filter(i=>"column"in i.group&&i.group.column===n)),a.jsx(Qi,{...t,includedGroups:s})}function Wf({commandHandler:t,menuDefinition:e,id:n,metadata:r,onClick:o,className:s}){return a.jsxs(Yt.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${s??""}`,children:[a.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${s??""}`,children:r.label}),a.jsx(Yt.List,{id:n,dense:!0,className:s??"",children:a.jsx(Yf,{commandHandler:t,menuDefinition:e,columnId:n,onClick:o})})]})}function tl({commandHandler:t,className:e,multiColumnMenu:n,id:r}){const{columns:o}=n,s=h.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return a.jsx(Yt.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${e??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((i,l)=>a.jsx(Wf,{commandHandler:t,menuDefinition:n,...i,className:e},l))})}function Kf(t){return{preserveValue:!0,...t}}const gr=(t,e,n={})=>{const r=h.useRef(e);r.current=e;const o=h.useRef(n);o.current=Kf(o.current);const[s,i]=h.useState(()=>r.current),[l,c]=h.useState(!0);return h.useEffect(()=>{let d=!0;return c(!!t),(async()=>{if(t){const u=await t();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[t]),[s,l]},Jf=Ai(a.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function el({menuProvider:t,normalMenu:e,fullMenu:n,commandHandler:r,containerRef:o,className:s,ariaLabelPrefix:i,children:l}){const[c,d]=h.useState(!1),[u,m]=h.useState(!1),w=h.useCallback(()=>{c&&d(!1),m(!1)},[c]),g=h.useCallback(k=>{k.stopPropagation(),d(x=>{const O=!x;return O&&k.shiftKey?m(!0):O||m(!1),O})},[]),v=h.useCallback(k=>(w(),r(k)),[r,w]),[f,b]=h.useState({top:1,left:1});h.useEffect(()=>{if(c){const k=o==null?void 0:o.current;if(k){const x=k.getBoundingClientRect(),O=window.scrollY,V=window.scrollX,C=x.top+O+k.clientHeight,_=x.left+V;b({top:C,left:_})}}},[c,o]);const[j]=gr(h.useCallback(async()=>(t==null?void 0:t(!1))??e,[t,e,c]),e),[S]=gr(h.useCallback(async()=>(t==null?void 0:t(!0))??n??j,[t,n,j,c]),n??j),E=u&&S?S:j;return a.jsxs(a.Fragment,{children:[a.jsx(Yt.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${s??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:g,children:l??a.jsx(Jf,{})}),a.jsx(Yt.Drawer,{className:`papi-menu-drawer ${s??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:E?a.jsx(tl,{className:s,id:`${i??""} main menu`,commandHandler:v,multiColumnMenu:E}):void 0})]})}function Zf({id:t,label:e,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:s=!1,size:i="medium",className:l,onClick:c,children:d}){return a.jsx(Yt.IconButton,{id:t,disabled:n,edge:s,size:i,"aria-label":e,title:o?void 0:r??e,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const en=h.forwardRef(({className:t,...e},n)=>a.jsx(K.LoaderCircle,{size:35,className:y("tw-animate-spin",t),...e,ref:n}));en.displayName="Spinner";function Qf({id:t,isDisabled:e=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:s,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:m,onFocus:w,onBlur:g}){return a.jsxs("div",{className:y("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[a.jsx(Rt,{htmlFor:t,className:y({"tw-text-red-600":n,"tw-hidden":!s}),children:`${s}${l?"*":""}`}),a.jsx(Pe,{id:t,disabled:e,placeholder:i,required:l,className:y(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:m,onFocus:w,onBlur:g}),a.jsx("p",{className:y({"tw-hidden":!o}),children:o})]})}const nl=h.createContext(void 0);function Ie(){const t=h.useContext(nl);if(!t)throw new Error("useContext must be used within a MenubarProvider.");return t}const Un=_e.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}});function nr({...t}){return a.jsx(wt.Menu,{...t})}function tm({...t}){return a.jsx(wt.RadioGroup,{...t})}function Ss({...t}){return a.jsx(wt.Sub,{"data-slot":"menubar-sub",...t})}const rl=h.forwardRef(({className:t,variant:e="default",...n},r)=>{const o=h.useMemo(()=>({variant:e}),[e]);return a.jsx(nl.Provider,{value:o,children:a.jsx(wt.Root,{ref:r,className:y("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...n})})});rl.displayName=wt.Root.displayName;const vn=h.forwardRef(({className:t,...e},n)=>{const r=Ie();return a.jsx(wt.Trigger,{ref:n,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",Un({variant:r.variant,className:t})),...e})});vn.displayName=wt.Trigger.displayName;const yo=h.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const s=Ie();return a.jsxs(wt.SubTrigger,{ref:o,className:y("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Un({variant:s.variant,className:t}),t),...r,children:[n,a.jsx(K.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});yo.displayName=wt.SubTrigger.displayName;const No=h.forwardRef(({className:t,...e},n)=>{const r=Ie();return a.jsx(wt.SubContent,{ref:n,className:y("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},t),...e})});No.displayName=wt.SubContent.displayName;const xn=h.forwardRef(({className:t,align:e="start",alignOffset:n=-4,sideOffset:r=8,...o},s)=>{const i=Ie();return a.jsx(wt.Portal,{children:a.jsx(wt.Content,{ref:s,align:e,alignOffset:n,sideOffset:r,className:y("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...o})})});xn.displayName=wt.Content.displayName;const ht=h.forwardRef(({className:t,inset:e,...n},r)=>{const o=Ie();return a.jsx(wt.Item,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Un({variant:o.variant,className:t}),t),...n})});ht.displayName=wt.Item.displayName;const jo=h.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const s=Ie();return a.jsxs(wt.CheckboxItem,{ref:o,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Un({variant:s.variant,className:t}),t),checked:n,...r,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(wt.ItemIndicator,{children:a.jsx(K.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});jo.displayName=wt.CheckboxItem.displayName;const sr=h.forwardRef(({className:t,children:e,...n},r)=>{const o=Ie();return a.jsxs(wt.RadioItem,{ref:r,className:y("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Un({variant:o.variant,className:t}),t),...n,children:[a.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:a.jsx(wt.ItemIndicator,{children:a.jsx(K.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});sr.displayName=wt.RadioItem.displayName;const em=h.forwardRef(({className:t,inset:e,...n},r)=>a.jsx(wt.Label,{ref:r,className:y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));em.displayName=wt.Label.displayName;const Ht=h.forwardRef(({className:t,...e},n)=>a.jsx(wt.Separator,{ref:n,className:y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ht.displayName=wt.Separator.displayName;function ie({className:t,...e}){return a.jsx("span",{className:y("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ie.displayname="MenubarShortcut";function nm({variant:t}){return a.jsxs(rl,{className:"pr-twp tw-border-0 tw-bg-transparent",variant:t,children:[a.jsxs(nr,{children:[a.jsx(vn,{children:"File"}),a.jsxs(xn,{children:[a.jsxs(ht,{children:["New Tab ",a.jsx(ie,{children:"⌘T"})]}),a.jsxs(ht,{children:["New Window ",a.jsx(ie,{children:"⌘N"})]}),a.jsx(ht,{disabled:!0,children:"New Incognito Window"}),a.jsx(Ht,{}),a.jsxs(Ss,{children:[a.jsx(yo,{children:"Share"}),a.jsxs(No,{children:[a.jsx(ht,{children:"Email link"}),a.jsx(ht,{children:"Messages"}),a.jsx(ht,{children:"Notes"})]})]}),a.jsx(Ht,{}),a.jsxs(ht,{children:["Print... ",a.jsx(ie,{children:"⌘P"})]})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"Edit"}),a.jsxs(xn,{children:[a.jsxs(ht,{children:["Undo ",a.jsx(ie,{children:"⌘Z"})]}),a.jsxs(ht,{children:["Redo ",a.jsx(ie,{children:"⇧⌘Z"})]}),a.jsx(Ht,{}),a.jsxs(Ss,{children:[a.jsx(yo,{children:"Find"}),a.jsxs(No,{children:[a.jsx(ht,{children:"Search the web"}),a.jsx(Ht,{}),a.jsx(ht,{children:"Find..."}),a.jsx(ht,{children:"Find Next"}),a.jsx(ht,{children:"Find Previous"})]})]}),a.jsx(Ht,{}),a.jsx(ht,{children:"Cut"}),a.jsx(ht,{children:"Copy"}),a.jsx(ht,{children:"Paste"})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"View"}),a.jsxs(xn,{children:[a.jsx(jo,{children:"Always Show Bookmarks Bar"}),a.jsx(jo,{checked:!0,children:"Always Show Full URLs"}),a.jsx(Ht,{}),a.jsxs(ht,{inset:!0,children:["Reload ",a.jsx(ie,{children:"⌘R"})]}),a.jsxs(ht,{disabled:!0,inset:!0,children:["Force Reload ",a.jsx(ie,{children:"⇧⌘R"})]}),a.jsx(Ht,{}),a.jsx(ht,{inset:!0,children:"Toggle Fullscreen"}),a.jsx(Ht,{}),a.jsx(ht,{inset:!0,children:"Hide Sidebar"})]})]}),a.jsxs(nr,{children:[a.jsx(vn,{children:"Profiles"}),a.jsxs(xn,{children:[a.jsxs(tm,{value:"benoit",children:[a.jsx(sr,{value:"andy",children:"Andy"}),a.jsx(sr,{value:"benoit",children:"Benoit"}),a.jsx(sr,{value:"Luis",children:"Luis"})]}),a.jsx(Ht,{}),a.jsx(ht,{inset:!0,children:"Edit..."}),a.jsx(Ht,{}),a.jsx(ht,{inset:!0,children:"Add Profile..."})]})]})]})}function rm({menuProvider:t,commandHandler:e,className:n,id:r,children:o,configAreaChildren:s,useAsAppDragArea:i,reserveOSSpecificSpace:l=void 0,menubarVariant:c="default"}){const d=h.useRef(void 0);return a.jsx("div",{className:y("tw-border tw-px-4 tw-text-foreground",{"tw-ps-[85px]":l==="darwin"},{"tw-pe-[calc(138px+1rem)]":l==="win32"||l==="linux"},n),ref:d,style:{position:"relative"},id:r,children:a.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:i?{WebkitAppRegion:"drag"}:void 0,children:[a.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:a.jsx("div",{className:"tw-flex tw-items-center",style:{WebkitAppRegion:"no-drag"},children:t?a.jsxs(a.Fragment,{children:[a.jsx(el,{commandHandler:e,containerRef:d,menuProvider:t}),a.jsx(nm,{variant:c})]}):void 0})}),a.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:{WebkitAppRegion:"no-drag"},children:o}),a.jsx("div",{className:"tw-flex tw-grow tw-basis-0 tw-justify-end",children:a.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",style:{WebkitAppRegion:"no-drag"},children:s})})]})})}const om=_e.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),ol=h.forwardRef(({className:t,variant:e,...n},r)=>a.jsx("div",{ref:r,role:"alert",className:y(om({variant:e}),t),...n}));ol.displayName="Alert";const al=h.forwardRef(({className:t,...e},n)=>a.jsxs("h5",{ref:n,className:y("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));al.displayName="AlertTitle";const sl=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,className:y("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));sl.displayName="AlertDescription";const il=_e.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function ll({className:t,variant:e,...n}){return a.jsx("div",{className:y("pr-twp",il({variant:e}),t),...n})}const cl=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));cl.displayName="Card";const dl=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));dl.displayName="CardHeader";const ul=h.forwardRef(({className:t,...e},n)=>a.jsx("h3",{ref:n,className:y("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));ul.displayName="CardTitle";const pl=h.forwardRef(({className:t,...e},n)=>a.jsx("p",{ref:n,className:y("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));pl.displayName="CardDescription";const wl=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-p-6 tw-pt-0",t),...e}));wl.displayName="CardContent";const fl=h.forwardRef(({className:t,...e},n)=>a.jsx("div",{ref:n,className:y("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));fl.displayName="CardFooter";function am({...t}){return a.jsx(Cs.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ml=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsxs(mn.Root,{ref:n,className:y("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:r,children:[a.jsx(mn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:a.jsx(mn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),a.jsx(mn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ml.displayName=mn.Root.displayName;const hl=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsx(lo.Root,{className:y("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:n,children:a.jsx(lo.Thumb,{className:y("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});hl.displayName=lo.Root.displayName;const sm=It.Root,gl=h.forwardRef(({className:t,...e},n)=>{const r=Nt();return a.jsx(It.List,{ref:n,className:y("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:r})});gl.displayName=It.List.displayName;const bl=h.forwardRef(({className:t,...e},n)=>a.jsx(It.Trigger,{ref:n,className:y("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));bl.displayName=It.Trigger.displayName;const vl=h.forwardRef(({className:t,...e},n)=>a.jsx(It.Content,{ref:n,className:y("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));vl.displayName=It.Content.displayName;function im({isInstalling:t,handleClick:e,buttonText:n,className:r,...o}){return a.jsx(pt,{className:y("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t,"tw-bg-blue-600":!t,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:e,...o,children:t?a.jsx(en,{size:15}):a.jsxs(a.Fragment,{children:[a.jsx(K.Download,{size:25,className:y("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function lm({isEnabling:t,handleClick:e,className:n,...r}){return a.jsx(pt,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":t},n),onClick:e,...r,children:t?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function cm({isDisabling:t,handleClick:e,className:n,...r}){return a.jsx(pt,{className:y("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":t},n),onClick:e,...r,children:t?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function dm({isUpdating:t,handleClick:e,className:n,...r}){return a.jsx(pt,{className:y("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":t},n),onClick:e,...r,children:t?a.jsxs(a.Fragment,{children:[a.jsx(en,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function um({id:t,markdown:e,className:n,anchorTarget:r}){const o=h.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return a.jsx("div",{id:t,className:y("pr-twp tw-prose",n),children:a.jsx(Kl,{options:o,children:e})})}const xl=h.forwardRef((t,e)=>a.jsxs(pt,{ref:e,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...t,children:[a.jsx(K.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",a.jsx(K.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var yl=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(yl||{});function pm({id:t,groups:e}){return a.jsx("div",{id:t,children:a.jsxs(vr,{children:[a.jsx(ko,{asChild:!0,children:a.jsx(xl,{})}),a.jsx(Pn,{children:e.map(n=>a.jsxs("div",{children:[a.jsx(In,{children:n.label}),a.jsx(_s,{children:n.items.map(r=>a.jsx("div",{children:r.itemType===0?a.jsx(xr,{onClick:r.onClick,children:r.label}):a.jsx(Eo,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),a.jsx(Mn,{})]},n.label))})]})})}function wm({id:t,message:e}){return a.jsx("div",{id:t,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:a.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:a.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:e})})})}function fm({id:t,category:e,downloads:n,languages:r,moreInfoUrl:o}){const s=new J.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return a.jsxs("div",{id:t,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:e})}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[a.jsx(K.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),a.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:s})]}),a.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[a.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>a.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&a.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),a.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),a.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[a.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",a.jsx(K.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),a.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",a.jsx(K.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function Nl({id:t,versionHistory:e}){const[n,r]=h.useState(!1),o=new Date;function s(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),w=d.getUTCDate()-1;let g="";return u>0?g=`${u.toString()} year${u===1?"":"s"} ago`:m>0?g=`${m.toString()} month${m===1?"":"s"} ago`:w===0?g="today":g=`${w.toString()} day${w===1?"":"s"} ago`,g}const i=Object.entries(e).sort((l,c)=>c[0].localeCompare(l[0]));return a.jsxs("div",{id:t,children:[a.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),a.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>a.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[a.jsx("div",{className:"tw-text-gray-600",children:a.jsx("li",{className:"tw-prose tw-text-xs",children:a.jsx("span",{children:l[1].description})})}),a.jsxs("div",{className:"tw-justify-end tw-text-right",children:[a.jsxs("div",{children:["Version ",l[0]]}),a.jsx("div",{children:s(l[1].date)})]})]},l[0]))}),i.length>5&&a.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function mm({id:t,publisherDisplayName:e,fileSize:n,locales:r,versionHistory:o}){const s=h.useMemo(()=>J.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return a.jsx("div",{id:t,className:"tw-border-t tw-pb-4 tw-pt-4",children:a.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[a.jsx(Nl,{versionHistory:o}),a.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),a.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[a.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),a.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Publisher"}),a.jsx("span",{className:"tw-font-semibold",children:e}),a.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),a.jsx("span",{className:"tw-font-semibold",children:s})]}),a.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:a.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[a.jsx("span",{className:"tw-mb-2",children:"Languages"}),a.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}function hm({entries:t,getEntriesCount:e,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d,badgesPlaceholder:u}){return a.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[a.jsx(ri,{entries:t,getEntriesCount:e,selected:n,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,sortSelected:l,icon:c,className:d}),n.length>0?a.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(m=>{var w;return a.jsxs(ll,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[a.jsx(pt,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(n.filter(g=>g!==m)),children:a.jsx(K.X,{className:"tw-h-3 tw-w-3"})}),(w=t.find(g=>g.value===m))==null?void 0:w.label]},m)})}):a.jsx(Rt,{children:u})]})}const gm=(t,e)=>t[e]??e;function bm({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:s,localizedStrings:i,className:l}){const c=gm(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=h.useState(!1),m=g=>{o&&o(g),r&&r([g,...n.filter(v=>v!==g)]),s&&n.find(v=>v===g)&&s([...n.filter(v=>v!==g)]),u(!1)},w=(g,v)=>{var b,j,S,E,k,x;const f=v!==g?((j=(b=t[g])==null?void 0:b.uiNames)==null?void 0:j[v])??((E=(S=t[g])==null?void 0:S.uiNames)==null?void 0:E.en):void 0;return f?`${(k=t[g])==null?void 0:k.autonym} (${f})`:(x=t[g])==null?void 0:x.autonym};return a.jsxs("div",{className:y("pr-twp tw-max-w-sm",l),children:[a.jsxs(Se,{name:"uiLanguage",value:e,onValueChange:m,open:d,onOpenChange:g=>u(g),children:[a.jsx(ue,{children:a.jsx(Ee,{})}),a.jsx(pe,{className:"tw-z-[250]",children:Object.keys(t).map(g=>a.jsx(Dt,{value:g,children:w(g,e)},g))})]}),e!=="en"&&a.jsxs(a.Fragment,{children:[a.jsx(Rt,{className:"tw-ms-3",children:c}),a.jsx("div",{className:"tw-ms-3",children:a.jsxs(Rt,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(g=>w(g,e)).join(", ")}`:`default (${t.en.autonym})`]})})]})]})}const vm=(t,e)=>{h.useEffect(()=>{if(!t)return()=>{};const n=t(e);return()=>{n()}},[t,e])},ao=()=>!1,xm=(t,e)=>{const[n]=gr(h.useCallback(async()=>{if(!t)return ao;const r=await Promise.resolve(t(e));return async()=>r()},[e,t]),ao,{preserveValue:!1});h.useEffect(()=>()=>{n!==ao&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Cs.toast});exports.Alert=ol;exports.AlertDescription=sl;exports.AlertTitle=al;exports.BOOK_SELECTOR_STRING_KEYS=Pc;exports.Badge=ll;exports.BookChapterControl=kc;exports.BookSelectionMode=qs;exports.BookSelector=Ic;exports.Button=pt;exports.Card=cl;exports.CardContent=wl;exports.CardDescription=pl;exports.CardFooter=fl;exports.CardHeader=dl;exports.CardTitle=ul;exports.ChapterRangeSelector=Us;exports.Checkbox=Nr;exports.Checklist=Nd;exports.ComboBox=lr;exports.DataTable=Js;exports.DisableButton=cm;exports.DropdownMenu=vr;exports.DropdownMenuCheckboxItem=xr;exports.DropdownMenuContent=Pn;exports.DropdownMenuGroup=_s;exports.DropdownMenuItem=So;exports.DropdownMenuItemType=yl;exports.DropdownMenuLabel=In;exports.DropdownMenuPortal=ec;exports.DropdownMenuRadioGroup=rc;exports.DropdownMenuRadioItem=Eo;exports.DropdownMenuSeparator=Mn;exports.DropdownMenuShortcut=Ms;exports.DropdownMenuSub=nc;exports.DropdownMenuSubContent=Is;exports.DropdownMenuSubTrigger=Ps;exports.DropdownMenuTrigger=ko;exports.EnableButton=lm;exports.Filter=hm;exports.FilterButton=xl;exports.FilterDropdown=pm;exports.Footer=mm;exports.GridMenu=tl;exports.HamburgerMenuButton=el;exports.INVENTORY_STRING_KEYS=Lc;exports.IconButton=Zf;exports.Input=Pe;exports.InstallButton=im;exports.Inventory=qc;exports.Label=Rt;exports.MarkdownRenderer=um;exports.MenuItem=wa;exports.MoreInfo=fm;exports.MultiSelectComboBox=ri;exports.NavigationContentSearch=Xc;exports.NoExtensionsFound=wm;exports.Popover=Po;exports.PopoverContent=yr;exports.PopoverTrigger=Io;exports.RadioGroup=_o;exports.RadioGroupItem=ir;exports.ScriptureResultsViewer=gd;exports.ScrollGroupSelector=bd;exports.SearchBar=Lo;exports.Select=Se;exports.SelectContent=pe;exports.SelectGroup=Xs;exports.SelectItem=Dt;exports.SelectLabel=Hs;exports.SelectScrollDownButton=Vo;exports.SelectScrollUpButton=zo;exports.SelectSeparator=Ys;exports.SelectTrigger=ue;exports.SelectValue=Ee;exports.Separator=kr;exports.SettingsList=vd;exports.SettingsListHeader=yd;exports.SettingsListItem=xd;exports.SettingsSidebar=hi;exports.SettingsSidebarContentSearch=cd;exports.Slider=ml;exports.Sonner=am;exports.Spinner=en;exports.Switch=hl;exports.Table=$n;exports.TableBody=An;exports.TableCaption=Ks;exports.TableCell=Ce;exports.TableFooter=Ws;exports.TableHead=Xe;exports.TableHeader=Dn;exports.TableRow=ne;exports.Tabs=sm;exports.TabsContent=vl;exports.TabsList=gl;exports.TabsTrigger=bl;exports.TextField=Qf;exports.ToggleGroup=Fo;exports.ToggleGroupItem=yn;exports.Toolbar=rm;exports.Tooltip=si;exports.TooltipContent=Xo;exports.TooltipProvider=ai;exports.TooltipTrigger=ii;exports.UiLanguageSelector=bm;exports.UpdateButton=dm;exports.VersionHistory=Nl;exports.VerticalTabs=Go;exports.VerticalTabsContent=qo;exports.VerticalTabsList=Uo;exports.VerticalTabsTrigger=oi;exports.badgeVariants=il;exports.buttonVariants=Fs;exports.cn=y;exports.getBookNumFromId=Qs;exports.getLinesFromUSFM=Zs;exports.getNumberFromUSFM=co;exports.getStatusForItem=ti;exports.inventoryCountColumn=Vc;exports.inventoryItemColumn=Bc;exports.inventoryStatusColumn=Fc;exports.useEvent=vm;exports.useEventAsync=xm;exports.usePromise=gr;function ym(t,e="top"){if(!t||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),e==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}ym(`.papi-multi-column-menu {
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
*, ::before, ::after {
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

    --popover: 210 20% 98%;
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
    --popover: 40 20% 98%;
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
.tw-w-1\\/2 {
  width: 50%;
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
.tw-w-\\[46px\\] {
  width: 46px;
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
.tw-max-w-64 {
  max-width: 16rem;
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
.tw-border-e-2 {
  border-inline-end-width: 2px;
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
.tw-border-t-2 {
  border-top-width: 2px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
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
.tw-border-muted {
  border-color: hsl(var(--muted));
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
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
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
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
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
.tw-ps-3 {
  padding-inline-start: 0.75rem;
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

.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
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
`,"top");
//# sourceMappingURL=index.cjs.map
