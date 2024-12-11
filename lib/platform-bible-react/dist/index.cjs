"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("react/jsx-runtime"),y=require("react"),J=require("lucide-react"),ot=require("clsx"),Qi=require("tailwind-merge"),Ws=require("@radix-ui/react-dropdown-menu"),W=require("platform-bible-utils"),el=require("@radix-ui/react-slot"),Nn=require("class-variance-authority"),tl=require("@radix-ui/react-label"),nl=require("@radix-ui/react-radio-group"),rl=require("@radix-ui/react-popover"),Ce=require("cmdk"),ol=require("@radix-ui/react-dialog"),Ne=require("@tanstack/react-table"),sl=require("@radix-ui/react-select"),al=require("@radix-ui/react-checkbox"),il=require("@radix-ui/react-toggle-group"),ll=require("@radix-ui/react-toggle"),cl=require("@radix-ui/react-tabs"),dl=require("@radix-ui/react-separator"),Ar=require("@mui/styled-engine"),Me=require("@mui/material"),sn=require("react-dom"),Ks=require("sonner"),ul=require("@radix-ui/react-slider"),pl=require("@radix-ui/react-switch"),wl=require("markdown-to-jsx");function ke(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const M=ke(y),pe=ke(Ws),Js=ke(tl),hn=ke(nl),gn=ke(rl),Xe=ke(ol),ge=ke(sl),Br=ke(al),er=ke(il),Zs=ke(ll),Oe=ke(cl),Qs=ke(dl),fl=ke(sn),an=ke(ul),Vr=ke(pl);const ml=Qi.extendTailwindMerge({prefix:"tw-"});function S(...e){return ml(ot.clsx(e))}const qt=y.forwardRef(({className:e,type:t,...n},r)=>s.jsx("input",{type:t,className:S("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));qt.displayName="Input";const hl=y.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>s.jsxs("div",{className:"tw-relative",children:[s.jsx(qt,{...o,type:"text",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:a}),s.jsx(J.History,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var gl=Object.defineProperty,bl=(e,t,n)=>t in e?gl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>bl(e,typeof t!="symbol"?t+"":t,n);const vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Jr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ea=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],ts=Cl();function Ht(e,t=!0){return t&&(e=e.toUpperCase()),e in ts?ts[e]:0}function Zr(e){return Ht(e)>0}function vl(e){const t=typeof e=="string"?Ht(e):e;return t>=40&&t<=66}function yl(e){return(typeof e=="string"?Ht(e):e)<=39}function ta(e){return e<=66}function xl(e){const t=typeof e=="string"?Ht(e):e;return oa(t)&&!ta(t)}function*Nl(){for(let e=1;e<=vt.length;e++)yield e}const kl=1,na=vt.length;function El(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Qr(e,t="***"){const n=e-1;return n<0||n>=vt.length?t:vt[n]}function ra(e){return e<=0||e>na?"******":ea[e-1]}function Sl(e){return ra(Ht(e))}function oa(e){const t=typeof e=="number"?Qr(e):e;return Zr(t)&&!Jr.includes(t)}function jl(e){const t=typeof e=="number"?Qr(e):e;return Zr(t)&&Jr.includes(t)}function Tl(e){return ea[e-1].includes("*obsolete*")}function Cl(){const e={};for(let t=0;t<vt.length;t++)e[vt[t]]=t+1;return e}const se={allBookIds:vt,nonCanonicalIds:Jr,bookIdToNumber:Ht,isBookIdValid:Zr,isBookNT:vl,isBookOT:yl,isBookOTNT:ta,isBookDC:xl,allBookNumbers:Nl,firstBook:kl,lastBook:na,extraBooks:El,bookNumberToId:Qr,bookNumberToEnglishName:ra,bookIdToEnglishName:Sl,isCanonical:oa,isExtraMaterial:jl,isObsolete:Tl};var qe=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(qe||{});const Pe=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=qe[t]):(this._type=t,this.name=qe[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Pe,"Original",new Pe(qe.Original)),ne(Pe,"Septuagint",new Pe(qe.Septuagint)),ne(Pe,"Vulgate",new Pe(qe.Vulgate)),ne(Pe,"English",new Pe(qe.English)),ne(Pe,"RussianProtestant",new Pe(qe.RussianProtestant)),ne(Pe,"RussianOrthodox",new Pe(qe.RussianOrthodox));let wt=Pe;function ns(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var sa=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(sa||{});const Se=class re{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,i=n!=null&&n instanceof wt?n:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof wt?n:void 0;this.setEmpty(a),this._verseNum=t%re.chapterDigitShifter,this._chapterNum=Math.floor(t%re.bookDigitShifter/re.chapterDigitShifter),this._bookNum=Math.floor(t/re.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof re){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof wt?t:re.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??re.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new re(t),{success:!0,verseRef:n}}catch(r){if(r instanceof en)return n=new re,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%re.bcvMaxValue*re.bookDigitShifter+(n>=0?n%re.bcvMaxValue*re.chapterDigitShifter:0)+(r>=0?r%re.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:i}=t,l=a||o.toString();let c;return i&&(c=new wt(i)),n?new re(n,r.toString(),l,c):new re}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>re.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(re.verseRangeSeparator)||this._verse.includes(re.verseSequenceIndicator))}get book(){return se.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=se.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=re.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=re.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>se.lastBook)throw new en("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new wt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(re.verseRangeSeparators,re.verseSequenceIndicators)}get BBBCCC(){return re.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return re.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new wt(qe[i])}catch{throw new en("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new en("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||se.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!re.isVerseParseable(r[1]))throw new en("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new re(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof re?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=re.verseRangeSeparators,r=re.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=ns(this._verse,r);for(const i of a.map(l=>ns(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const h=new re(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(h)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>se.lastBook?2:(se.isCanonical(this._bookNum),0)}setEmpty(t=re.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=se.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Se,"defaultVersification",wt.English),ne(Se,"verseRangeSeparator","-"),ne(Se,"verseSequenceIndicator",","),ne(Se,"verseRangeSeparators",[Se.verseRangeSeparator]),ne(Se,"verseSequenceIndicators",[Se.verseSequenceIndicator]),ne(Se,"chapterDigitShifter",1e3),ne(Se,"bookDigitShifter",Se.chapterDigitShifter*Se.chapterDigitShifter),ne(Se,"bcvMaxValue",Se.chapterDigitShifter-1),ne(Se,"ValidStatusType",sa);class en extends Error{}const tr=pe.Root,eo=pe.Trigger,aa=pe.Group,Ol=pe.Portal,Rl=pe.Sub,Pl=pe.RadioGroup,ia=y.forwardRef(({className:e,inset:t,children:n,...r},o)=>s.jsxs(pe.SubTrigger,{ref:o,className:S("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,s.jsx(J.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ia.displayName=pe.SubTrigger.displayName;const la=y.forwardRef(({className:e,...t},n)=>s.jsx(pe.SubContent,{ref:n,className:S("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));la.displayName=pe.SubContent.displayName;const kn=y.forwardRef(({className:e,sideOffset:t=4,...n},r)=>s.jsx(pe.Portal,{children:s.jsx(pe.Content,{ref:r,sideOffset:t,className:S("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n})}));kn.displayName=pe.Content.displayName;const to=y.forwardRef(({className:e,inset:t,...n},r)=>s.jsx(pe.Item,{ref:r,className:S("tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));to.displayName=pe.Item.displayName;const nr=y.forwardRef(({className:e,children:t,checked:n,...r},o)=>s.jsxs(pe.CheckboxItem,{ref:o,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(pe.ItemIndicator,{children:s.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));nr.displayName=pe.CheckboxItem.displayName;const no=y.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(pe.RadioItem,{ref:r,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(pe.ItemIndicator,{children:s.jsx(J.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));no.displayName=pe.RadioItem.displayName;const Xt=y.forwardRef(({className:e,inset:t,...n},r)=>s.jsx(pe.Label,{ref:r,className:S("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Xt.displayName=pe.Label.displayName;const En=y.forwardRef(({className:e,...t},n)=>s.jsx(pe.Separator,{ref:n,className:S("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));En.displayName=pe.Separator.displayName;function ca({className:e,...t}){return s.jsx("span",{className:S("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ca.displayName="DropdownMenuShortcut";const _l=y.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:i},l)=>s.jsxs(to,{ref:l,textValue:e,className:S("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[s.jsx("span",{className:S("tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-l-red-200":a.toLowerCase()==="ot","tw-border-l-purple-200":a.toLowerCase()==="nt","tw-border-l-indigo-200":a.toLowerCase()==="dc"}),children:se.bookIdToEnglishName(e)}),n&&s.jsx("div",{children:i})]},e));function Il({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),i=y.useCallback(l=>{o(l)},[o]);return s.jsx("div",{className:S("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:a.map(l=>s.jsx("div",{className:S("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function $l({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return s.jsxs(Xt,{className:"tw-flex tw-justify-between",children:[s.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(J.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),s.jsx(J.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),s.jsx(J.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const un=se.allBookIds,Ml={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},rs=["OT","NT","DC"],Dl=32+32+32,Al=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Bl=e=>({OT:un.filter(n=>se.isBookOT(n)),NT:un.filter(n=>se.isBookNT(n)),DC:un.filter(n=>se.isBookDC(n))})[e],tn=e=>W.getChaptersForBook(se.bookIdToNumber(e));function Vl(){return un.map(t=>se.bookIdToEnglishName(t))}function Fl(e){return Vl().includes(e)}function Ll(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Fl(t))return un.find(r=>se.bookIdToEnglishName(r)===t)}function zl({scrRef:e,handleSubmit:t}){const[n,r]=y.useState(""),[o,a]=y.useState(se.bookNumberToId(e.bookNum)),[i,l]=y.useState(e.chapterNum??0),[c,d]=y.useState(se.bookNumberToId(e.bookNum)),[u,h]=y.useState(!1),[f,b]=y.useState(u),v=y.useRef(void 0),w=y.useRef(void 0),m=y.useRef(void 0),N=y.useCallback(k=>Bl(k).filter(D=>{const $=se.bookIdToEnglishName(D).toLowerCase(),Z=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return $.includes(Z)||D.toLowerCase().includes(Z)}),[n]),_=k=>{r(k)},j=y.useRef(!1),E=y.useCallback(k=>{if(j.current){j.current=!1;return}h(k)},[]),g=y.useCallback((k,D,$,Z)=>{if(l(se.bookNumberToId(e.bookNum)!==k?1:e.chapterNum),D||tn(k)===-1){t({bookNum:se.bookIdToNumber(k),chapterNum:$||1,verseNum:Z||1}),h(!1),r("");return}a(o!==k?k:""),h(!D)},[t,e.bookNum,e.chapterNum,o]),R=k=>{k<=0||k>tn(o)||g(o,!0,k)},A=y.useCallback(()=>{Al.forEach(k=>{const D=n.match(k);if(D){const[$,Z=void 0,Y=void 0]=D.slice(1),z=Ll($);(se.isBookIdValid($)||z)&&g(z??$,!0,Z?parseInt(Z,10):1,Y?parseInt(Y,10):1)}})},[g,n]),U=y.useCallback(k=>{u?(k.key==="ArrowDown"||k.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof w<"u"&&w.current!==null&&w.current.focus(),k.preventDefault()):h(!0)},[u]),T=k=>{const{key:D}=k;D==="ArrowRight"||D==="ArrowLeft"||D==="ArrowDown"||D==="ArrowUp"||D==="Enter"||(v.current.dispatchEvent(new KeyboardEvent("keydown",{key:D})),v.current.focus())},P=k=>{const{key:D}=k;if(c===o){if(D==="Enter"){k.preventDefault(),g(o,!0,i);return}let $=0;if(D==="ArrowRight")if(i<tn(c))$=1;else{k.preventDefault();return}else if(D==="ArrowLeft")if(i>1)$=-1;else{k.preventDefault();return}else D==="ArrowDown"?$=6:D==="ArrowUp"&&($=-6);i+$<=0||i+$>tn(c)?l(0):$!==0&&(l(i+$),k.preventDefault())}};return y.useEffect(()=>{o===c?o===se.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),y.useLayoutEffect(()=>{b(u)},[u]),y.useLayoutEffect(()=>{const k=setTimeout(()=>{if(f&&w.current&&m.current){const $=m.current.offsetTop-Dl;w.current.scrollTo({top:$,behavior:"instant"})}},10);return()=>{clearTimeout(k)}},[f]),s.jsx("div",{className:"pr-twp tw-flex",children:s.jsxs(tr,{modal:!1,open:u,onOpenChange:E,children:[s.jsx(eo,{asChild:!0,children:s.jsx(hl,{ref:v,value:n,handleSearch:_,handleKeyDown:U,handleOnClick:()=>{a(se.bookNumberToId(e.bookNum)),d(se.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),h(!0),v.current.focus()},onFocus:()=>{j.current=!0},handleSubmit:A,placeholder:`${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),s.jsxs(kn,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:T,align:"start",ref:w,children:[s.jsx($l,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),rs.map((k,D)=>N(k).length>0&&s.jsxs("div",{children:[s.jsx(Xt,{className:"tw-font-semibold tw-text-foreground/80",children:Ml[k]}),N(k).map($=>s.jsx("div",{children:s.jsx(_l,{bookId:$,handleSelectBook:()=>g($,!1),isSelected:o===$,handleHighlightBook:()=>d($),handleKeyDown:P,bookType:k,ref:Z=>{o===$&&(m.current=Z)},children:s.jsx(Il,{handleSelectChapter:R,endChapter:tn($),activeChapter:e.bookNum===se.bookIdToNumber($)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:Z=>{l(Z)}})})},$)),rs.length-1!==D?s.jsx(En,{}):void 0]},k))]})]})})}const da=Nn.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),fe=y.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const i=r?el.Slot:"button";return s.jsx(i,{className:S(da({variant:t,size:n,className:e})),ref:a,...o})});fe.displayName="Button";const Gl=Nn.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),$e=y.forwardRef(({className:e,...t},n)=>s.jsx(Js.Root,{ref:n,className:S("pr-twp",Gl(),e),...t}));$e.displayName=Js.Root.displayName;const ro=y.forwardRef(({className:e,...t},n)=>s.jsx(hn.Root,{className:S("pr-twp tw-grid tw-gap-2",e),...t,ref:n}));ro.displayName=hn.Root.displayName;const Hn=y.forwardRef(({className:e,...t},n)=>s.jsx(hn.Item,{ref:n,className:S("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:s.jsx(hn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:s.jsx(J.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Hn.displayName=hn.Item.displayName;const ua=gn.Root,pa=gn.Trigger,oo=y.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>s.jsx(gn.Portal,{children:s.jsx(gn.Content,{ref:o,align:t,sideOffset:n,className:S("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));oo.displayName=gn.Content.displayName;const Ul=Xe.Portal,wa=y.forwardRef(({className:e,...t},n)=>s.jsx(Xe.Overlay,{ref:n,className:S("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));wa.displayName=Xe.Overlay.displayName;const ql=y.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(Ul,{children:[s.jsx(wa,{}),s.jsxs(Xe.Content,{ref:r,className:S("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,children:[t,s.jsxs(Xe.Close,{className:"tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",children:[s.jsx(J.X,{className:"tw-h-4 tw-w-4"}),s.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]}));ql.displayName=Xe.Content.displayName;const Hl=y.forwardRef(({className:e,...t},n)=>s.jsx(Xe.Title,{ref:n,className:S("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));Hl.displayName=Xe.Title.displayName;const Xl=y.forwardRef(({className:e,...t},n)=>s.jsx(Xe.Description,{ref:n,className:S("tw-text-sm tw-text-muted-foreground",e),...t}));Xl.displayName=Xe.Description.displayName;const so=y.forwardRef(({className:e,...t},n)=>s.jsx(Ce.Command,{ref:n,className:S("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));so.displayName=Ce.Command.displayName;const ao=y.forwardRef(({className:e,...t},n)=>s.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",children:[s.jsx(J.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),s.jsx(Ce.Command.Input,{ref:n,className:S("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]}));ao.displayName=Ce.Command.Input.displayName;const io=y.forwardRef(({className:e,...t},n)=>s.jsx(Ce.Command.List,{ref:n,className:S("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));io.displayName=Ce.Command.List.displayName;const lo=y.forwardRef((e,t)=>s.jsx(Ce.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));lo.displayName=Ce.Command.Empty.displayName;const fa=y.forwardRef(({className:e,...t},n)=>s.jsx(Ce.Command.Group,{ref:n,className:S("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));fa.displayName=Ce.Command.Group.displayName;const Yl=y.forwardRef(({className:e,...t},n)=>s.jsx(Ce.Command.Separator,{ref:n,className:S("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Yl.displayName=Ce.Command.Separator.displayName;const co=y.forwardRef(({className:e,...t},n)=>s.jsx(Ce.Command.Item,{ref:n,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));co.displayName=Ce.Command.Item.displayName;function Wl(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Fr({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Wl,icon:i=void 0,buttonPlaceholder:l="",textPlaceholder:c="",commandEmptyMessage:d="No option found",buttonVariant:u="outline",alignDropDown:h="start",dir:f="ltr",isDisabled:b=!1,...v}){const[w,m]=y.useState(!1);return s.jsxs(ua,{open:w,onOpenChange:m,...v,children:[s.jsx(pa,{asChild:!0,children:s.jsxs(fe,{variant:u,role:"combobox","aria-expanded":w,id:e,className:S("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",n),disabled:b,children:[s.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[i&&s.jsx("div",{className:"tw-pr-2",children:i}),s.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:r?a(r):l})]}),s.jsx(J.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),s.jsx(oo,{align:h,className:"tw-w-[200px] tw-p-0",dir:f,children:s.jsxs(so,{children:[s.jsx(ao,{dir:f,placeholder:c,className:"tw-text-inherit"}),s.jsx(lo,{children:d}),s.jsx(io,{children:t.map(N=>s.jsxs(co,{value:a(N),onSelect:()=>{o(N),m(!1)},children:[s.jsx(J.Check,{className:S("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!r||a(r)!==a(N)})}),a(N)]},a(N)))})]})})]})}function ma({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:a}){const i=y.useMemo(()=>Array.from({length:a},(d,u)=>u+1),[a]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return s.jsxs(s.Fragment,{children:[s.jsx($e,{htmlFor:"start-chapters-combobox",children:"Chapters"}),s.jsx(Fr,{isDisabled:o,onChange:l,className:"tw-ml-2 tw-mr-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),s.jsx($e,{htmlFor:"end-chapters-combobox",children:"to"}),s.jsx(Fr,{isDisabled:o,onChange:c,className:"tw-ml-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var ha=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(ha||{});const Kl=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),kr=(e,t)=>e[t]??t;function Jl({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:a,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=kr(d,"%webView_bookSelector_currentBook%"),h=kr(d,"%webView_bookSelector_choose%"),f=kr(d,"%webView_bookSelector_chooseBooks%"),[b,v]=y.useState("current book"),w=m=>{v(m),e(m)};return s.jsx(ro,{className:"pr-twp tw-flex",value:b,onValueChange:m=>w(m),children:s.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[s.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(Hn,{value:"current book"}),s.jsx($e,{className:"tw-ml-1",children:u})]}),s.jsx($e,{className:"tw-flex tw-items-center",children:t}),s.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:s.jsx(ma,{isDisabled:b==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:a})})]}),s.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(Hn,{value:"choose books"}),s.jsx($e,{className:"tw-ml-1",children:f})]}),s.jsx($e,{className:"tw-flex tw-items-center",children:r.map(m=>se.bookIdToEnglishName(m)).join(", ")}),s.jsx(fe,{disabled:b==="current book",onClick:()=>n(),children:h})]})]})})}function Zl({table:e}){return s.jsxs(tr,{children:[s.jsx(Ws.DropdownMenuTrigger,{asChild:!0,children:s.jsxs(fe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[s.jsx(J.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),s.jsxs(kn,{align:"end",className:"tw-w-[150px]",children:[s.jsx(Xt,{children:"Toggle columns"}),s.jsx(En,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>s.jsx(nr,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const yt=ge.Root,ga=ge.Group,xt=ge.Value,at=y.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(ge.Trigger,{ref:r,className:S("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,children:[t,s.jsx(ge.Icon,{asChild:!0,children:s.jsx(J.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]}));at.displayName=ge.Trigger.displayName;const uo=y.forwardRef(({className:e,...t},n)=>s.jsx(ge.ScrollUpButton,{ref:n,className:S("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:s.jsx(J.ChevronUp,{className:"tw-h-4 tw-w-4"})}));uo.displayName=ge.ScrollUpButton.displayName;const po=y.forwardRef(({className:e,...t},n)=>s.jsx(ge.ScrollDownButton,{ref:n,className:S("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:s.jsx(J.ChevronDown,{className:"tw-h-4 tw-w-4"})}));po.displayName=ge.ScrollDownButton.displayName;const it=y.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>s.jsx(ge.Portal,{children:s.jsxs(ge.Content,{ref:o,className:S("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[s.jsx(uo,{}),s.jsx(ge.Viewport,{className:S("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t}),s.jsx(po,{})]})}));it.displayName=ge.Content.displayName;const ba=y.forwardRef(({className:e,...t},n)=>s.jsx(ge.Label,{ref:n,className:S("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));ba.displayName=ge.Label.displayName;const _e=y.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(ge.Item,{ref:r,className:S("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(ge.ItemIndicator,{children:s.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}),s.jsx(ge.ItemText,{children:t})]}));_e.displayName=ge.Item.displayName;const va=y.forwardRef(({className:e,...t},n)=>s.jsx(ge.Separator,{ref:n,className:S("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));va.displayName=ge.Separator.displayName;function Ql({table:e}){return s.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[s.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[s.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),s.jsxs(yt,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[s.jsx(at,{className:"tw-h-8 tw-w-[70px]",children:s.jsx(xt,{placeholder:e.getState().pagination.pageSize})}),s.jsx(it,{side:"top",children:[10,20,30,40,50].map(t=>s.jsx(_e,{value:`${t}`,children:t},t))})]})]}),s.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[s.jsxs(fe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),s.jsx(J.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(fe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),s.jsx(J.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(fe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),s.jsx(J.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(fe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),s.jsx(J.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Sn=y.forwardRef(({className:e,stickyHeader:t,...n},r)=>s.jsx("div",{className:S("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:s.jsx("table",{ref:r,className:S("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));Sn.displayName="Table";const jn=y.forwardRef(({className:e,stickyHeader:t,...n},r)=>s.jsx("thead",{ref:r,className:S({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));jn.displayName="TableHeader";const Tn=y.forwardRef(({className:e,...t},n)=>s.jsx("tbody",{ref:n,className:S("[&_tr:last-child]:tw-border-0",e),...t}));Tn.displayName="TableBody";const ya=y.forwardRef(({className:e,...t},n)=>s.jsx("tfoot",{ref:n,className:S("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));ya.displayName="TableFooter";const Ze=y.forwardRef(({className:e,...t},n)=>s.jsx("tr",{ref:n,className:S("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Ze.displayName="TableRow";const Bt=y.forwardRef(({className:e,...t},n)=>s.jsx("th",{ref:n,className:S("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));Bt.displayName="TableHead";const Nt=y.forwardRef(({className:e,...t},n)=>s.jsx("td",{ref:n,className:S("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Nt.displayName="TableCell";const xa=y.forwardRef(({className:e,...t},n)=>s.jsx("caption",{ref:n,className:S("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));xa.displayName="TableCaption";function Na({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{}}){var m;const[l,c]=y.useState([]),[d,u]=y.useState([]),[h,f]=y.useState({}),[b,v]=y.useState({}),w=Ne.useReactTable({data:t,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...n&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:f,onRowSelectionChange:v,state:{sorting:l,columnFilters:d,columnVisibility:h,rowSelection:b}});return s.jsxs("div",{className:"pr-twp",children:[o&&s.jsx(Zl,{table:w}),s.jsxs(Sn,{stickyHeader:a,children:[s.jsx(jn,{stickyHeader:a,children:w.getHeaderGroups().map(N=>s.jsx(Ze,{children:N.headers.map(_=>s.jsx(Bt,{children:_.isPlaceholder?void 0:Ne.flexRender(_.column.columnDef.header,_.getContext())},_.id))},N.id))}),s.jsx(Tn,{children:(m=w.getRowModel().rows)!=null&&m.length?w.getRowModel().rows.map(N=>s.jsx(Ze,{onClick:()=>i(N,w),"data-state":N.getIsSelected()&&"selected",children:N.getVisibleCells().map(_=>s.jsx(Nt,{children:Ne.flexRender(_.column.columnDef.cell,_.getContext())},_.id))},N.id)):s.jsx(Ze,{children:s.jsx(Nt,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&s.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[s.jsx(fe,{variant:"outline",size:"sm",onClick:()=>w.previousPage(),disabled:!w.getCanPreviousPage(),children:"Previous"}),s.jsx(fe,{variant:"outline",size:"sm",onClick:()=>w.nextPage(),disabled:!w.getCanNextPage(),children:"Next"})]}),n&&r&&s.jsx(Ql,{table:w})]})}function ec({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],a=y.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>W.deepEqual(c,l))||i.push(l)}),i},[e]);return s.jsxs(Sn,{stickyHeader:!0,children:[s.jsx(jn,{stickyHeader:!0,children:s.jsxs(Ze,{children:[s.jsx(Bt,{children:r}),s.jsx(Bt,{children:o})]})}),s.jsx(Tn,{children:a.length>0&&a.map(i=>s.jsxs(Ze,{onClick:()=>{t(i.reference)},children:[s.jsx(Nt,{children:`${se.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),s.jsx(Nt,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const rr=y.forwardRef(({className:e,...t},n)=>s.jsx(Br.Root,{ref:n,className:S("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:s.jsx(Br.Indicator,{className:S("tw-flex tw-items-center tw-justify-center tw-text-current"),children:s.jsx(J.Check,{className:"tw-h-4 tw-w-4"})})}));rr.displayName=Br.Root.displayName;const ka=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Lr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Ea=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?se.bookIdToNumber(t[1]):0},Sa=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",ja=Nn.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),tc=y.forwardRef(({className:e,variant:t,size:n,...r},o)=>s.jsx(Zs.Root,{ref:o,className:S(ja({variant:t,size:n,className:e})),...r}));tc.displayName=Zs.Root.displayName;const Ta=y.createContext({size:"default",variant:"default"}),wo=y.forwardRef(({className:e,variant:t,size:n,children:r,...o},a)=>s.jsx(er.Root,{ref:a,className:S("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,children:s.jsx(Ta.Provider,{value:{variant:t,size:n},children:r})}));wo.displayName=er.Root.displayName;const pn=y.forwardRef(({className:e,children:t,variant:n,size:r,...o},a)=>{const i=y.useContext(Ta);return s.jsx(er.Item,{ref:a,className:S(ja({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});pn.displayName=er.Item.displayName;const or=e=>e==="asc"?s.jsx(J.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?s.jsx(J.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):s.jsx(J.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),nc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>s.jsxs(fe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,or(t.getIsSorted())]})}),rc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>s.jsxs(fe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,or(n.getIsSorted())]})}),oc=e=>({accessorKey:"count",header:({column:t})=>s.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:s.jsxs(fe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,or(t.getIsSorted())]})}),cell:({row:t})=>s.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Er=(e,t,n,r,o,a)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),a(l)},sc=(e,t,n,r,o)=>({accessorKey:"status",header:({column:a})=>s.jsx("div",{className:"tw-flex tw-justify-center",children:s.jsxs(fe,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,or(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),l=a.getValue("item");return s.jsxs(wo,{value:i,variant:"outline",type:"single",children:[s.jsx(pn,{onClick:()=>Er([l],"approved",t,n,r,o),value:"approved",children:s.jsx(J.CircleCheckIcon,{})}),s.jsx(pn,{onClick:()=>Er([l],"unapproved",t,n,r,o),value:"unapproved",children:s.jsx(J.CircleXIcon,{})}),s.jsx(pn,{onClick:()=>Er([l],"unknown",t,n,r,o),value:"unknown",children:s.jsx(J.CircleHelpIcon,{})})]})}}),ac=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),ic=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},lc=(e,t,n,r,o)=>{if(!e)return[];const a=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return ka(e).forEach(u=>{u.startsWith("\\id")&&(i=Ea(u),l=0,c=0),u.startsWith("\\c")&&(l=Lr(u),c=0),u.startsWith("\\v")&&(c=Lr(u),l===0&&(l=t.chapterNum));let h=o.exec(u)??void 0;for(;h;){const f=[];h.forEach(m=>f.push(m));const b=h.index,v=a.find(m=>W.deepEqual(m.items,f)),w={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:W.substring(u,Math.max(0,b-25),Math.min(b+25,u.length))};if(v)v.count+=1,v.occurrences.push(w);else{const m={items:f,count:1,status:Sa(f[0],n,r),occurrences:[w]};a.push(m)}h=o.exec(u)??void 0}}),a},Je=(e,t)=>e[t]??t;function cc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const h=Je(n,"%webView_inventory_all%"),f=Je(n,"%webView_inventory_approved%"),b=Je(n,"%webView_inventory_unapproved%"),v=Je(n,"%webView_inventory_unknown%"),w=Je(n,"%webView_inventory_scope_currentBook%"),m=Je(n,"%webView_inventory_scope_chapter%"),N=Je(n,"%webView_inventory_scope_verse%"),_=Je(n,"%webView_inventory_filter_text%"),j=Je(n,"%webView_inventory_show_additional_items%"),[E,g]=y.useState(!1),[R,A]=y.useState("all"),[U,T]=y.useState(""),[P,k]=y.useState([]),D=y.useMemo(()=>l?r instanceof RegExp?lc(l,e,a,i,r):r(l,e,a,i):[],[l,r,e,a,i]),$=y.useMemo(()=>{if(E)return D;const x=[];return D.forEach(C=>{const F=C.items[0],L=x.find(V=>V.items[0]===F);L?(L.count+=C.count,L.occurrences=L.occurrences.concat(C.occurrences)):x.push({items:[F],count:C.count,occurrences:C.occurrences,status:C.status})}),x},[E,D]),Z=y.useMemo(()=>ic($,R,U),[$,R,U]),Y=y.useMemo(()=>{var F,L;if(!E)return u;const x=(F=o==null?void 0:o.tableHeaders)==null?void 0:F.length;if(!x)return u;const C=[];for(let V=0;V<x;V++)C.push(rc(((L=o==null?void 0:o.tableHeaders)==null?void 0:L[V])||"Additional Item",V+1));return[...C,...u]},[o==null?void 0:o.tableHeaders,u,E]);y.useEffect(()=>{k([])},[Z]);const z=(x,C)=>{C.setRowSelection(()=>{const F={};return F[x.index]=!0,F}),k(x.original.items)},te=x=>{if(x==="book"||x==="chapter"||x==="verse")d(x);else throw new Error(`Invalid scope value: ${x}`)},ae=x=>{if(x==="all"||x==="approved"||x==="unapproved"||x==="unknown")A(x);else throw new Error(`Invalid status filter value: ${x}`)},oe=y.useMemo(()=>{if($.length===0||P.length===0)return[];const x=$.filter(C=>W.deepEqual(E?C.items:[C.items[0]],P));if(x.length>1)throw new Error("Selected item is not unique");return x[0].occurrences},[P,E,$]);return s.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[s.jsxs("div",{className:"tw-flex tw-items-stretch",children:[s.jsxs(yt,{onValueChange:x=>ae(x),defaultValue:R,children:[s.jsx(at,{className:"tw-m-1",children:s.jsx(xt,{placeholder:"Select filter"})}),s.jsxs(it,{children:[s.jsx(_e,{value:"all",children:h}),s.jsx(_e,{value:"approved",children:f}),s.jsx(_e,{value:"unapproved",children:b}),s.jsx(_e,{value:"unknown",children:v})]})]}),s.jsxs(yt,{onValueChange:x=>te(x),defaultValue:c,children:[s.jsx(at,{className:"tw-m-1",children:s.jsx(xt,{placeholder:"Select scope"})}),s.jsxs(it,{children:[s.jsx(_e,{value:"book",children:w}),s.jsx(_e,{value:"chapter",children:m}),s.jsx(_e,{value:"verse",children:N})]})]}),s.jsx(qt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:U,onChange:x=>{T(x.target.value)}}),o&&s.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[s.jsx(rr,{className:"tw-m-1",checked:E,onCheckedChange:x=>{k([]),g(x)}}),s.jsx($e,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??j})]})]}),s.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:s.jsx(Na,{columns:Y,data:Z,onRowClickHandler:z,stickyHeader:!0})}),oe.length>0&&s.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:s.jsx(ec,{occurrenceData:oe,setScriptureReference:t,localizedStrings:n})})]})}function dc({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0}){const[d,u]=y.useState(!1),h=y.useCallback(v=>{r(n.includes(v)?n.filter(w=>w!==v):[...n,v])},[n,r]),f=()=>{var v;return n.length===1?((v=e.find(w=>w.value===n[0]))==null?void 0:v.label)??o:i||o},b=y.useMemo(()=>{if(!l)return e;const v=e.filter(m=>m.starred).sort((m,N)=>m.label.localeCompare(N.label)),w=e.filter(m=>!m.starred).sort((m,N)=>{const _=n.includes(m.value),j=n.includes(N.value);return _&&!j?-1:!_&&j?1:m.label.localeCompare(N.label)});return[...v,...w]},[e,n,l]);return s.jsxs(ua,{open:d,onOpenChange:u,children:[s.jsx(pa,{asChild:!0,children:s.jsxs(fe,{variant:"outline",role:"combobox","aria-expanded":d,className:S("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary"),children:[s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:s.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),s.jsx("div",{className:S((n.length===0||n.length===e.length)&&"tw-text-muted"),children:f()})]}),s.jsx(J.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),s.jsx(oo,{align:"start",className:"tw-w-full tw-p-0",children:s.jsxs(so,{children:[s.jsx(ao,{placeholder:`Search ${o.toLowerCase()}...`}),s.jsxs(io,{children:[s.jsx(lo,{children:a}),s.jsx(fa,{children:b.map(v=>{const w=t?t(v):void 0;return s.jsxs(co,{value:v.value,onSelect:h,className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx("div",{className:"w-4",children:s.jsx(J.Check,{className:S("tw-h-4 tw-w-4",n.includes(v.value)?"tw-opacity-100":"tw-opacity-0")})}),s.jsx("div",{className:"tw-w-4",children:v.starred&&s.jsx(J.Star,{className:"tw-h-4 tw-w-4"})}),s.jsx("div",{className:"tw-flex-grow",children:v.label}),t&&s.jsx("div",{className:"tw-w-10 tw-text-right tw-text-muted-foreground",children:w})]},v.value)})})]})]})})]})}function Ca({onSearch:e,placeholder:t,isFullWidth:n,className:r}){const[o,a]=y.useState(""),i=l=>{a(l),e(l)};return s.jsxs("div",{className:"tw-relative",children:[s.jsx(J.Search,{className:"tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50"}),s.jsx(qt,{className:S("tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",{"tw-w-full":n},{"tw-pe-9":o},r),placeholder:t,value:o,onChange:l=>i(l.target.value)}),o&&s.jsxs(fe,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",children:[s.jsx(J.X,{className:"tw-h-4 tw-w-4",onClick:()=>{i("")}}),s.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const fo=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.Root,{orientation:"vertical",ref:n,className:S("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t}));fo.displayName=Oe.List.displayName;const mo=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.List,{ref:n,className:S("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));mo.displayName=Oe.List.displayName;const Oa=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.Trigger,{ref:n,...t,className:S("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),ho=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.Content,{ref:n,className:S("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));ho.displayName=Oe.Content.displayName;function uc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return s.jsxs("div",{className:"pr-twp",children:[s.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?s.jsx("h1",{children:r}):"",s.jsx(Ca,{isFullWidth:o,onSearch:t,placeholder:n})]}),s.jsxs(fo,{dir:a,children:[s.jsx(mo,{children:e.map(i=>s.jsx(Oa,{value:i.value,children:i.value},i.key))}),e.map(i=>s.jsx(ho,{value:i.value,children:i.content},i.key))]})]})}const rt="scrBook",pc="scrRef",ft="source",wc="details",fc="Scripture Reference",mc="Scripture Book",Ra="Type",hc="Details";function gc(e,t){const n=t??!1;return[{accessorFn:r=>`${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:rt,header:(e==null?void 0:e.scriptureReferenceColumnName)??fc,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?se.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===rt?W.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>W.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>W.formatScrRef(r.start),id:pc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:W.formatScrRef(o.start)},sortingFn:(r,o)=>W.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:ft,header:n?(e==null?void 0:e.typeColumnName)??Ra:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:wc,header:(e==null?void 0:e.detailsColumnName)??hc,cell:r=>r.getValue(),enableGrouping:!1}]}const bc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||W.compareScrRefs(e.start,e.end)===0?`${W.scrRefToBBBCCCVVV(e.start)}+${t}`:`${W.scrRefToBBBCCCVVV(e.start)}+${t}-${W.scrRefToBBBCCCVVV(e.end)}+${n}`},os=e=>`${bc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function vc({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[d,u]=y.useState([]),[h,f]=y.useState([{id:rt,desc:!1}]),[b,v]=y.useState({}),w=y.useMemo(()=>e.flatMap(T=>T.data.map(P=>({...P,source:T.source}))),[e]),m=y.useMemo(()=>gc({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:i},n),[r,a,i,n]);y.useEffect(()=>{d.includes(ft)?f([{id:ft,desc:!1},{id:rt,desc:!1}]):f([{id:rt,desc:!1}])},[d]);const N=Ne.useReactTable({data:w,columns:m,state:{grouping:d,sorting:h,rowSelection:b},onGroupingChange:u,onSortingChange:f,onRowSelectionChange:v,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:os,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});y.useEffect(()=>{if(l){const T=N.getSelectedRowModel().rowsById,P=Object.keys(T);if(P.length===1){const k=w.find(D=>os(D)===P[0])||void 0;k&&l(k)}}},[b,w,l,N]);const _=o??mc,j=a??Ra,E=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[rt]},{label:`Group by ${j}`,value:[ft]},{label:`Group by ${_} and ${j}`,value:[rt,ft]},{label:`Group by ${j} and ${_}`,value:[ft,rt]}],g=T=>{u(JSON.parse(T))},R=(T,P)=>{!T.getIsGrouped()&&!T.getIsSelected()&&T.getToggleSelectedHandler()(P)},A=(T,P)=>T.getIsGrouped()?"":S("banded-row",P%2===0?"even":"odd"),U=(T,P,k)=>{if(!((T==null?void 0:T.length)===0||P.depth<k.column.getGroupedIndex())){if(P.getIsGrouped())switch(P.depth){case 1:return"tw-ps-4";default:return}switch(P.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return s.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&s.jsxs(yt,{value:JSON.stringify(d),onValueChange:T=>{g(T)},children:[s.jsx(at,{className:"tw-mb-1 tw-mt-2",children:s.jsx(xt,{})}),s.jsx(it,{position:"item-aligned",children:s.jsx(ga,{children:E.map(T=>s.jsx(_e,{value:JSON.stringify(T.value),children:T.label},T.label))})})]}),s.jsxs(Sn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&s.jsx(jn,{children:N.getHeaderGroups().map(T=>s.jsx(Ze,{children:T.headers.filter(P=>P.column.columnDef.header).map(P=>s.jsx(Bt,{colSpan:P.colSpan,className:"top-0 tw-sticky",children:P.isPlaceholder?void 0:s.jsxs("div",{children:[P.column.getCanGroup()?s.jsx(fe,{variant:"ghost",title:`Toggle grouping by ${P.column.columnDef.header}`,onClick:P.column.getToggleGroupingHandler(),type:"button",children:P.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(P.column.columnDef.header,P.getContext())]})},P.id))},T.id))}),s.jsx(Tn,{children:N.getRowModel().rows.map((T,P)=>s.jsx(Ze,{"data-state":T.getIsSelected()?"selected":"",className:S(A(T,P)),onClick:k=>R(T,k),children:T.getVisibleCells().map(k=>{if(!(k.getIsPlaceholder()||k.column.columnDef.enableGrouping&&!k.getIsGrouped()&&(k.column.columnDef.id!==ft||!n)))return s.jsx(Nt,{className:S(k.column.columnDef.id,"tw-p-[1px]",U(d,T,k)),children:(()=>k.getIsGrouped()?s.jsxs(fe,{variant:"link",onClick:T.getToggleExpandedHandler(),type:"button",children:[T.getIsExpanded()&&s.jsx(J.ChevronDown,{}),!T.getIsExpanded()&&(c==="ltr"?s.jsx(J.ChevronRight,{}):s.jsx(J.ChevronLeft,{}))," ",Ne.flexRender(k.column.columnDef.cell,k.getContext())," (",T.subRows.length,")"]}):Ne.flexRender(k.column.columnDef.cell,k.getContext()))()},k.id)})},T.id))})]})]})}const Sr={[W.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[W.getLocalizeKeyForScrollGroupId(0)]:"A",[W.getLocalizeKeyForScrollGroupId(1)]:"B",[W.getLocalizeKeyForScrollGroupId(2)]:"C",[W.getLocalizeKeyForScrollGroupId(3)]:"D",[W.getLocalizeKeyForScrollGroupId(4)]:"E",[W.getLocalizeKeyForScrollGroupId(5)]:"F",[W.getLocalizeKeyForScrollGroupId(6)]:"G",[W.getLocalizeKeyForScrollGroupId(7)]:"H",[W.getLocalizeKeyForScrollGroupId(8)]:"I",[W.getLocalizeKeyForScrollGroupId(9)]:"J",[W.getLocalizeKeyForScrollGroupId(10)]:"K",[W.getLocalizeKeyForScrollGroupId(11)]:"L",[W.getLocalizeKeyForScrollGroupId(12)]:"M",[W.getLocalizeKeyForScrollGroupId(13)]:"N",[W.getLocalizeKeyForScrollGroupId(14)]:"O",[W.getLocalizeKeyForScrollGroupId(15)]:"P",[W.getLocalizeKeyForScrollGroupId(16)]:"Q",[W.getLocalizeKeyForScrollGroupId(17)]:"R",[W.getLocalizeKeyForScrollGroupId(18)]:"S",[W.getLocalizeKeyForScrollGroupId(19)]:"T",[W.getLocalizeKeyForScrollGroupId(20)]:"U",[W.getLocalizeKeyForScrollGroupId(21)]:"V",[W.getLocalizeKeyForScrollGroupId(22)]:"W",[W.getLocalizeKeyForScrollGroupId(23)]:"X",[W.getLocalizeKeyForScrollGroupId(24)]:"Y",[W.getLocalizeKeyForScrollGroupId(25)]:"Z"};function yc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={...Sr,...Object.fromEntries(Object.entries(r).map(([a,i])=>[a,a===i&&a in Sr?Sr[a]:i]))};return s.jsxs(yt,{value:`${t}`,onValueChange:a=>n(a==="undefined"?void 0:parseInt(a,10)),children:[s.jsx(at,{className:"pr-twp tw-w-auto",children:s.jsx(xt,{placeholder:o[W.getLocalizeKeyForScrollGroupId(t)]??t})}),s.jsx(it,{style:{zIndex:250},children:e.map(a=>s.jsx(_e,{value:`${a}`,children:o[W.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const go=y.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>s.jsx(Qs.Root,{ref:o,decorative:n,orientation:t,className:S("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));go.displayName=Qs.Root.displayName;function xc({children:e}){return s.jsx("div",{className:"pr-twp tw-grid",children:e})}function Nc({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return s.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[s.jsxs("div",{children:[s.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),s.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?s.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):s.jsx("div",{children:n})]})}function kc({primary:e,secondary:t,includeSeparator:n=!1}){return s.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),s.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?s.jsx(go,{}):""]})}function Ec({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:a}){return s.jsx("div",{id:e,className:t,children:n.map(i=>s.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[s.jsx(rr,{className:"tw-mr-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),s.jsx($e,{children:a?a(i):i})]},i))})}function Sc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var bo={},Pa={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Pa);var Tc=Pa.exports,jr={};function vo(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}function gt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function _a(e){if(!gt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=_a(e[n])}),t}function Qe(e,t,n={clone:!0}){const r=n.clone?O({},e):e;return gt(e)&&gt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(gt(t[o])&&o in e&&gt(e[o])?r[o]=Qe(e[o],t[o],n):n.clone?r[o]=gt(t[o])?_a(t[o]):t[o]:r[o]=t[o])}),r}var zr={exports:{}},Bn={exports:{}},ie={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ss;function Cc(){if(ss)return ie;ss=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,w=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function j(g){if(typeof g=="object"&&g!==null){var R=g.$$typeof;switch(R){case t:switch(g=g.type,g){case c:case d:case r:case a:case o:case h:return g;default:switch(g=g&&g.$$typeof,g){case l:case u:case v:case b:case i:return g;default:return R}}case n:return R}}}function E(g){return j(g)===d}return ie.AsyncMode=c,ie.ConcurrentMode=d,ie.ContextConsumer=l,ie.ContextProvider=i,ie.Element=t,ie.ForwardRef=u,ie.Fragment=r,ie.Lazy=v,ie.Memo=b,ie.Portal=n,ie.Profiler=a,ie.StrictMode=o,ie.Suspense=h,ie.isAsyncMode=function(g){return E(g)||j(g)===c},ie.isConcurrentMode=E,ie.isContextConsumer=function(g){return j(g)===l},ie.isContextProvider=function(g){return j(g)===i},ie.isElement=function(g){return typeof g=="object"&&g!==null&&g.$$typeof===t},ie.isForwardRef=function(g){return j(g)===u},ie.isFragment=function(g){return j(g)===r},ie.isLazy=function(g){return j(g)===v},ie.isMemo=function(g){return j(g)===b},ie.isPortal=function(g){return j(g)===n},ie.isProfiler=function(g){return j(g)===a},ie.isStrictMode=function(g){return j(g)===o},ie.isSuspense=function(g){return j(g)===h},ie.isValidElementType=function(g){return typeof g=="string"||typeof g=="function"||g===r||g===d||g===a||g===o||g===h||g===f||typeof g=="object"&&g!==null&&(g.$$typeof===v||g.$$typeof===b||g.$$typeof===i||g.$$typeof===l||g.$$typeof===u||g.$$typeof===m||g.$$typeof===N||g.$$typeof===_||g.$$typeof===w)},ie.typeOf=j,ie}var le={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var as;function Oc(){return as||(as=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,w=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,_=e?Symbol.for("react.scope"):60119;function j(I){return typeof I=="string"||typeof I=="function"||I===r||I===d||I===a||I===o||I===h||I===f||typeof I=="object"&&I!==null&&(I.$$typeof===v||I.$$typeof===b||I.$$typeof===i||I.$$typeof===l||I.$$typeof===u||I.$$typeof===m||I.$$typeof===N||I.$$typeof===_||I.$$typeof===w)}function E(I){if(typeof I=="object"&&I!==null){var ye=I.$$typeof;switch(ye){case t:var B=I.type;switch(B){case c:case d:case r:case a:case o:case h:return B;default:var ve=B&&B.$$typeof;switch(ve){case l:case u:case v:case b:case i:return ve;default:return ye}}case n:return ye}}}var g=c,R=d,A=l,U=i,T=t,P=u,k=r,D=v,$=b,Z=n,Y=a,z=o,te=h,ae=!1;function oe(I){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),x(I)||E(I)===c}function x(I){return E(I)===d}function C(I){return E(I)===l}function F(I){return E(I)===i}function L(I){return typeof I=="object"&&I!==null&&I.$$typeof===t}function V(I){return E(I)===u}function X(I){return E(I)===r}function q(I){return E(I)===v}function H(I){return E(I)===b}function G(I){return E(I)===n}function K(I){return E(I)===a}function Q(I){return E(I)===o}function ue(I){return E(I)===h}le.AsyncMode=g,le.ConcurrentMode=R,le.ContextConsumer=A,le.ContextProvider=U,le.Element=T,le.ForwardRef=P,le.Fragment=k,le.Lazy=D,le.Memo=$,le.Portal=Z,le.Profiler=Y,le.StrictMode=z,le.Suspense=te,le.isAsyncMode=oe,le.isConcurrentMode=x,le.isContextConsumer=C,le.isContextProvider=F,le.isElement=L,le.isForwardRef=V,le.isFragment=X,le.isLazy=q,le.isMemo=H,le.isPortal=G,le.isProfiler=K,le.isStrictMode=Q,le.isSuspense=ue,le.isValidElementType=j,le.typeOf=E}()),le}var is;function Ia(){return is||(is=1,process.env.NODE_ENV==="production"?Bn.exports=Cc():Bn.exports=Oc()),Bn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Tr,ls;function Rc(){if(ls)return Tr;ls=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Tr=o()?Object.assign:function(a,i){for(var l,c=r(a),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var h in l)t.call(l,h)&&(c[h]=l[h]);if(e){d=e(l);for(var f=0;f<d.length;f++)n.call(l,d[f])&&(c[d[f]]=l[d[f]])}}return c},Tr}var Cr,cs;function yo(){if(cs)return Cr;cs=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Cr=e,Cr}var Or,ds;function $a(){return ds||(ds=1,Or=Function.call.bind(Object.prototype.hasOwnProperty)),Or}var Rr,us;function Pc(){if(us)return Rr;us=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=yo(),n={},r=$a();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in a)if(r(a,u)){var h;try{if(typeof a[u]!="function"){var f=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}h=a[u](i,u,c,l,null,t)}catch(v){h=v}if(h&&!(h instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof h+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),h instanceof Error&&!(h.message in n)){n[h.message]=!0;var b=d?d():"";e("Failed "+l+" type: "+h.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Rr=o,Rr}var Pr,ps;function _c(){if(ps)return Pr;ps=1;var e=Ia(),t=Rc(),n=yo(),r=$a(),o=Pc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return Pr=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function h(x){var C=x&&(d&&x[d]||x[u]);if(typeof C=="function")return C}var f="<<anonymous>>",b={array:N("array"),bigint:N("bigint"),bool:N("boolean"),func:N("function"),number:N("number"),object:N("object"),string:N("string"),symbol:N("symbol"),any:_(),arrayOf:j,element:E(),elementType:g(),instanceOf:R,node:P(),objectOf:U,oneOf:A,oneOfType:T,shape:D,exact:$};function v(x,C){return x===C?x!==0||1/x===1/C:x!==x&&C!==C}function w(x,C){this.message=x,this.data=C&&typeof C=="object"?C:{},this.stack=""}w.prototype=Error.prototype;function m(x){if(process.env.NODE_ENV!=="production")var C={},F=0;function L(X,q,H,G,K,Q,ue){if(G=G||f,Q=Q||H,ue!==n){if(c){var I=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw I.name="Invariant Violation",I}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var ye=G+":"+H;!C[ye]&&F<3&&(a("You are manually calling a React.PropTypes validation function for the `"+Q+"` prop on `"+G+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),C[ye]=!0,F++)}}return q[H]==null?X?q[H]===null?new w("The "+K+" `"+Q+"` is marked as required "+("in `"+G+"`, but its value is `null`.")):new w("The "+K+" `"+Q+"` is marked as required in "+("`"+G+"`, but its value is `undefined`.")):null:x(q,H,G,K,Q)}var V=L.bind(null,!1);return V.isRequired=L.bind(null,!0),V}function N(x){function C(F,L,V,X,q,H){var G=F[L],K=z(G);if(K!==x){var Q=te(G);return new w("Invalid "+X+" `"+q+"` of type "+("`"+Q+"` supplied to `"+V+"`, expected ")+("`"+x+"`."),{expectedType:x})}return null}return m(C)}function _(){return m(i)}function j(x){function C(F,L,V,X,q){if(typeof x!="function")return new w("Property `"+q+"` of component `"+V+"` has invalid PropType notation inside arrayOf.");var H=F[L];if(!Array.isArray(H)){var G=z(H);return new w("Invalid "+X+" `"+q+"` of type "+("`"+G+"` supplied to `"+V+"`, expected an array."))}for(var K=0;K<H.length;K++){var Q=x(H,K,V,X,q+"["+K+"]",n);if(Q instanceof Error)return Q}return null}return m(C)}function E(){function x(C,F,L,V,X){var q=C[F];if(!l(q)){var H=z(q);return new w("Invalid "+V+" `"+X+"` of type "+("`"+H+"` supplied to `"+L+"`, expected a single ReactElement."))}return null}return m(x)}function g(){function x(C,F,L,V,X){var q=C[F];if(!e.isValidElementType(q)){var H=z(q);return new w("Invalid "+V+" `"+X+"` of type "+("`"+H+"` supplied to `"+L+"`, expected a single ReactElement type."))}return null}return m(x)}function R(x){function C(F,L,V,X,q){if(!(F[L]instanceof x)){var H=x.name||f,G=oe(F[L]);return new w("Invalid "+X+" `"+q+"` of type "+("`"+G+"` supplied to `"+V+"`, expected ")+("instance of `"+H+"`."))}return null}return m(C)}function A(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function C(F,L,V,X,q){for(var H=F[L],G=0;G<x.length;G++)if(v(H,x[G]))return null;var K=JSON.stringify(x,function(ue,I){var ye=te(I);return ye==="symbol"?String(I):I});return new w("Invalid "+X+" `"+q+"` of value `"+String(H)+"` "+("supplied to `"+V+"`, expected one of "+K+"."))}return m(C)}function U(x){function C(F,L,V,X,q){if(typeof x!="function")return new w("Property `"+q+"` of component `"+V+"` has invalid PropType notation inside objectOf.");var H=F[L],G=z(H);if(G!=="object")return new w("Invalid "+X+" `"+q+"` of type "+("`"+G+"` supplied to `"+V+"`, expected an object."));for(var K in H)if(r(H,K)){var Q=x(H,K,V,X,q+"."+K,n);if(Q instanceof Error)return Q}return null}return m(C)}function T(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var C=0;C<x.length;C++){var F=x[C];if(typeof F!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ae(F)+" at index "+C+"."),i}function L(V,X,q,H,G){for(var K=[],Q=0;Q<x.length;Q++){var ue=x[Q],I=ue(V,X,q,H,G,n);if(I==null)return null;I.data&&r(I.data,"expectedType")&&K.push(I.data.expectedType)}var ye=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new w("Invalid "+H+" `"+G+"` supplied to "+("`"+q+"`"+ye+"."))}return m(L)}function P(){function x(C,F,L,V,X){return Z(C[F])?null:new w("Invalid "+V+" `"+X+"` supplied to "+("`"+L+"`, expected a ReactNode."))}return m(x)}function k(x,C,F,L,V){return new w((x||"React class")+": "+C+" type `"+F+"."+L+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+V+"`.")}function D(x){function C(F,L,V,X,q){var H=F[L],G=z(H);if(G!=="object")return new w("Invalid "+X+" `"+q+"` of type `"+G+"` "+("supplied to `"+V+"`, expected `object`."));for(var K in x){var Q=x[K];if(typeof Q!="function")return k(V,X,q,K,te(Q));var ue=Q(H,K,V,X,q+"."+K,n);if(ue)return ue}return null}return m(C)}function $(x){function C(F,L,V,X,q){var H=F[L],G=z(H);if(G!=="object")return new w("Invalid "+X+" `"+q+"` of type `"+G+"` "+("supplied to `"+V+"`, expected `object`."));var K=t({},F[L],x);for(var Q in K){var ue=x[Q];if(r(x,Q)&&typeof ue!="function")return k(V,X,q,Q,te(ue));if(!ue)return new w("Invalid "+X+" `"+q+"` key `"+Q+"` supplied to `"+V+"`.\nBad object: "+JSON.stringify(F[L],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(x),null,"  "));var I=ue(H,Q,V,X,q+"."+Q,n);if(I)return I}return null}return m(C)}function Z(x){switch(typeof x){case"number":case"string":case"undefined":return!0;case"boolean":return!x;case"object":if(Array.isArray(x))return x.every(Z);if(x===null||l(x))return!0;var C=h(x);if(C){var F=C.call(x),L;if(C!==x.entries){for(;!(L=F.next()).done;)if(!Z(L.value))return!1}else for(;!(L=F.next()).done;){var V=L.value;if(V&&!Z(V[1]))return!1}}else return!1;return!0;default:return!1}}function Y(x,C){return x==="symbol"?!0:C?C["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&C instanceof Symbol:!1}function z(x){var C=typeof x;return Array.isArray(x)?"array":x instanceof RegExp?"object":Y(C,x)?"symbol":C}function te(x){if(typeof x>"u"||x===null)return""+x;var C=z(x);if(C==="object"){if(x instanceof Date)return"date";if(x instanceof RegExp)return"regexp"}return C}function ae(x){var C=te(x);switch(C){case"array":case"object":return"an "+C;case"boolean":case"date":case"regexp":return"a "+C;default:return C}}function oe(x){return!x.constructor||!x.constructor.name?f:x.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Pr}var _r,ws;function Ic(){if(ws)return _r;ws=1;var e=yo();function t(){}function n(){}return n.resetWarningCache=t,_r=function(){function r(i,l,c,d,u,h){if(h!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},_r}if(process.env.NODE_ENV!=="production"){var $c=Ia(),Mc=!0;zr.exports=_c()($c.isElement,Mc)}else zr.exports=Ic()();var Dc=zr.exports;const p=Sc(Dc);function Ac(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Ma(e,t,n,r,o){const a=e[t],i=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!Ac(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Da=vo(p.element,Ma);Da.isRequired=vo(p.element.isRequired,Ma);const Aa=Da,Bc="exact-prop: ​";function Vc(e){return process.env.NODE_ENV==="production"?e:O({},e,{[Bc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Vt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var Gr={exports:{}},ce={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fs;function Fc(){if(fs)return ce;fs=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function w(m){if(typeof m=="object"&&m!==null){var N=m.$$typeof;switch(N){case e:switch(m=m.type,m){case n:case o:case r:case d:case u:return m;default:switch(m=m&&m.$$typeof,m){case l:case i:case c:case f:case h:case a:return m;default:return N}}case t:return N}}}return ce.ContextConsumer=i,ce.ContextProvider=a,ce.Element=e,ce.ForwardRef=c,ce.Fragment=n,ce.Lazy=f,ce.Memo=h,ce.Portal=t,ce.Profiler=o,ce.StrictMode=r,ce.Suspense=d,ce.SuspenseList=u,ce.isAsyncMode=function(){return!1},ce.isConcurrentMode=function(){return!1},ce.isContextConsumer=function(m){return w(m)===i},ce.isContextProvider=function(m){return w(m)===a},ce.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},ce.isForwardRef=function(m){return w(m)===c},ce.isFragment=function(m){return w(m)===n},ce.isLazy=function(m){return w(m)===f},ce.isMemo=function(m){return w(m)===h},ce.isPortal=function(m){return w(m)===t},ce.isProfiler=function(m){return w(m)===o},ce.isStrictMode=function(m){return w(m)===r},ce.isSuspense=function(m){return w(m)===d},ce.isSuspenseList=function(m){return w(m)===u},ce.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===d||m===u||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===f||m.$$typeof===h||m.$$typeof===a||m.$$typeof===i||m.$$typeof===c||m.$$typeof===v||m.getModuleId!==void 0)},ce.typeOf=w,ce}var de={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ms;function Lc(){return ms||(ms=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,w=!1,m=!1,N=!1,_=!1,j;j=Symbol.for("react.module.reference");function E(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||_||B===r||B===d||B===u||N||B===b||v||w||m||typeof B=="object"&&B!==null&&(B.$$typeof===f||B.$$typeof===h||B.$$typeof===a||B.$$typeof===i||B.$$typeof===c||B.$$typeof===j||B.getModuleId!==void 0))}function g(B){if(typeof B=="object"&&B!==null){var ve=B.$$typeof;switch(ve){case e:var Ge=B.type;switch(Ge){case n:case o:case r:case d:case u:return Ge;default:var dt=Ge&&Ge.$$typeof;switch(dt){case l:case i:case c:case f:case h:case a:return dt;default:return ve}}case t:return ve}}}var R=i,A=a,U=e,T=c,P=n,k=f,D=h,$=t,Z=o,Y=r,z=d,te=u,ae=!1,oe=!1;function x(B){return ae||(ae=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function C(B){return oe||(oe=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function F(B){return g(B)===i}function L(B){return g(B)===a}function V(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function X(B){return g(B)===c}function q(B){return g(B)===n}function H(B){return g(B)===f}function G(B){return g(B)===h}function K(B){return g(B)===t}function Q(B){return g(B)===o}function ue(B){return g(B)===r}function I(B){return g(B)===d}function ye(B){return g(B)===u}de.ContextConsumer=R,de.ContextProvider=A,de.Element=U,de.ForwardRef=T,de.Fragment=P,de.Lazy=k,de.Memo=D,de.Portal=$,de.Profiler=Z,de.StrictMode=Y,de.Suspense=z,de.SuspenseList=te,de.isAsyncMode=x,de.isConcurrentMode=C,de.isContextConsumer=F,de.isContextProvider=L,de.isElement=V,de.isForwardRef=X,de.isFragment=q,de.isLazy=H,de.isMemo=G,de.isPortal=K,de.isProfiler=Q,de.isStrictMode=ue,de.isSuspense=I,de.isSuspenseList=ye,de.isValidElementType=E,de.typeOf=g}()),de}process.env.NODE_ENV==="production"?Gr.exports=Fc():Gr.exports=Lc();var hs=Gr.exports;const zc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Gc(e){const t=`${e}`.match(zc);return t&&t[1]||""}function Ba(e,t=""){return e.displayName||e.name||Gc(e)||t}function gs(e,t,n){const r=Ba(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Uc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ba(e,"Component");if(typeof e=="object")switch(e.$$typeof){case hs.ForwardRef:return gs(e,e.render,"ForwardRef");case hs.Memo:return gs(e,e.type,"memo");default:return}}}function bn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],i=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const qc=p.oneOfType([p.func,p.object]),Va=qc;function Ye(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Vt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Hc(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Xc(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Yc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Wc(e,t){var n,r;return M.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Xn(e){return e&&e.ownerDocument||document}function Kc(e){return Xn(e).defaultView||window}function Jc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?O({},t.propTypes):null;return o=>(a,i,l,c,d,...u)=>{const h=d||i,f=n==null?void 0:n[h];if(f){const b=f(a,i,l,c,d,...u);if(b)return b}return typeof a[i]<"u"&&!a[o]?new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Yn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Zc=typeof window<"u"?M.useLayoutEffect:M.useEffect,Ft=Zc;let bs=0;function Qc(e){const[t,n]=M.useState(e),r=e||t;return M.useEffect(()=>{t==null&&(bs+=1,n(`mui-${bs}`))},[t]),r}const vs=M["useId".toString()];function Fa(e){if(vs!==void 0){const t=vs();return e??t}return Qc(e)}function ed(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function La({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=M.useRef(e!==void 0),[a,i]=M.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){M.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=M.useRef(t);M.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=M.useCallback(d=>{o||i(d)},[]);return[l,c]}function Ur(e){const t=M.useRef(e);return Ft(()=>{t.current=e}),M.useRef((...n)=>(0,t.current)(...n)).current}function kt(...e){return M.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Yn(n,t)})},e)}const ys={};function td(e,t){const n=M.useRef(ys);return n.current===ys&&(n.current=e(t)),n}const nd=[];function rd(e){M.useEffect(e,nd)}class Cn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Cn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function ln(){const e=td(Cn.create).current;return rd(e.disposeEffect),e}let sr=!0,qr=!1;const od=new Cn,sd={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ad(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&sd[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function id(e){e.metaKey||e.altKey||e.ctrlKey||(sr=!0)}function Ir(){sr=!1}function ld(){this.visibilityState==="hidden"&&qr&&(sr=!0)}function cd(e){e.addEventListener("keydown",id,!0),e.addEventListener("mousedown",Ir,!0),e.addEventListener("pointerdown",Ir,!0),e.addEventListener("touchstart",Ir,!0),e.addEventListener("visibilitychange",ld,!0)}function dd(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return sr||ad(t)}function za(){const e=M.useCallback(o=>{o!=null&&cd(o.ownerDocument)},[]),t=M.useRef(!1);function n(){return t.current?(qr=!0,od.start(100,()=>{qr=!1}),t.current=!1,!0):!1}function r(o){return dd(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Ga(e,t){const n=O({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=O({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=O({},a),Object.keys(o).forEach(i=>{n[r][i]=Ga(o[i],a[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function xo(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,i)=>{if(i){const l=t(i);l!==""&&a.push(l),n&&n[i]&&a.push(n[i])}return a},[]).join(" ")}),r}const xs=e=>e,ud=()=>{let e=xs;return{configure(t){e=t},generate(t){return e(t)},reset(){e=xs}}},pd=ud(),Ua=pd,qa={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function ar(e,t,n="Mui"){const r=qa[t];return r?`${n}-${r}`:`${Ua.generate(e)}-${t}`}function Ha(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=ar(e,o,n)}),r}function wd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function xe(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const fd=["values","unit","step"],md=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>O({},n,{[r.key]:r.val}),{})};function hd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=xe(e,fd),a=md(t),i=Object.keys(a);function l(f){return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n})`}function c(f){return`@media (max-width:${(typeof t[f]=="number"?t[f]:f)-r/100}${n})`}function d(f,b){const v=i.indexOf(b);return`@media (min-width:${typeof t[f]=="number"?t[f]:f}${n}) and (max-width:${(v!==-1&&typeof t[i[v]]=="number"?t[i[v]]:b)-r/100}${n})`}function u(f){return i.indexOf(f)+1<i.length?d(f,i[i.indexOf(f)+1]):l(f)}function h(f){const b=i.indexOf(f);return b===0?l(i[1]):b===i.length-1?c(i[b]):d(f,i[i.indexOf(f)+1]).replace("@media","@media not all and")}return O({keys:i,values:a,up:l,down:c,between:d,only:u,not:h,unit:n},o)}const gd={borderRadius:4},bd=gd,vd=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},lt=vd;function wn(e,t){return t?Qe(e,t,{clone:!1}):e}const No={xs:0,sm:600,md:900,lg:1200,xl:1536},Ns={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${No[e]}px)`};function et(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ns;return t.reduce((i,l,c)=>(i[a.up(a.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const a=r.breakpoints||Ns;return Object.keys(t).reduce((i,l)=>{if(Object.keys(a.values||No).indexOf(l)!==-1){const c=a.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function yd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function xd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function ir(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Wn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=ir(e,n)||r,t&&(o=t(o,r,e)),o}function be(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=ir(c,r)||{};return et(i,l,h=>{let f=Wn(d,o,h);return h===f&&typeof h=="string"&&(f=Wn(d,o,`${t}${h==="default"?"":Ye(h)}`,h)),n===!1?f:{[n]:f}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:lt}:{},a.filterProps=[t],a}function Nd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const kd={m:"margin",p:"padding"},Ed={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},ks={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Sd=Nd(e=>{if(e.length>2)if(ks[e])e=ks[e];else return[e];const[t,n]=e.split(""),r=kd[t],o=Ed[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),lr=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],cr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],jd=[...lr,...cr];function On(e,t,n,r){var o;const a=(o=ir(e,t,!1))!=null?o:n;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Xa(e){return On(e,"spacing",8,"spacing")}function Rn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Td(e,t){return n=>e.reduce((r,o)=>(r[o]=Rn(t,n),r),{})}function Cd(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Sd(n),a=Td(o,r),i=e[n];return et(e,i,a)}function Ya(e,t){const n=Xa(e.theme);return Object.keys(e).map(r=>Cd(e,t,r,n)).reduce(wn,{})}function me(e){return Ya(e,lr)}me.propTypes=process.env.NODE_ENV!=="production"?lr.reduce((e,t)=>(e[t]=lt,e),{}):{};me.filterProps=lr;function he(e){return Ya(e,cr)}he.propTypes=process.env.NODE_ENV!=="production"?cr.reduce((e,t)=>(e[t]=lt,e),{}):{};he.filterProps=cr;process.env.NODE_ENV!=="production"&&jd.reduce((e,t)=>(e[t]=lt,e),{});function Od(e=8){if(e.mui)return e;const t=Xa({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const i=t(a);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function dr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?wn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Be(e){return typeof e!="number"?e:`${e}px solid`}function ze(e,t){return be({prop:e,themeKey:"borders",transform:t})}const Rd=ze("border",Be),Pd=ze("borderTop",Be),_d=ze("borderRight",Be),Id=ze("borderBottom",Be),$d=ze("borderLeft",Be),Md=ze("borderColor"),Dd=ze("borderTopColor"),Ad=ze("borderRightColor"),Bd=ze("borderBottomColor"),Vd=ze("borderLeftColor"),Fd=ze("outline",Be),Ld=ze("outlineColor"),ur=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=On(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:Rn(t,r)});return et(e,e.borderRadius,n)}return null};ur.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:lt}:{};ur.filterProps=["borderRadius"];dr(Rd,Pd,_d,Id,$d,Md,Dd,Ad,Bd,Vd,ur,Fd,Ld);const pr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=On(e.theme,"spacing",8,"gap"),n=r=>({gap:Rn(t,r)});return et(e,e.gap,n)}return null};pr.propTypes=process.env.NODE_ENV!=="production"?{gap:lt}:{};pr.filterProps=["gap"];const wr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=On(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:Rn(t,r)});return et(e,e.columnGap,n)}return null};wr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:lt}:{};wr.filterProps=["columnGap"];const fr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=On(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:Rn(t,r)});return et(e,e.rowGap,n)}return null};fr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:lt}:{};fr.filterProps=["rowGap"];const zd=be({prop:"gridColumn"}),Gd=be({prop:"gridRow"}),Ud=be({prop:"gridAutoFlow"}),qd=be({prop:"gridAutoColumns"}),Hd=be({prop:"gridAutoRows"}),Xd=be({prop:"gridTemplateColumns"}),Yd=be({prop:"gridTemplateRows"}),Wd=be({prop:"gridTemplateAreas"}),Kd=be({prop:"gridArea"});dr(pr,wr,fr,zd,Gd,Ud,qd,Hd,Xd,Yd,Wd,Kd);function At(e,t){return t==="grey"?t:e}const Jd=be({prop:"color",themeKey:"palette",transform:At}),Zd=be({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:At}),Qd=be({prop:"backgroundColor",themeKey:"palette",transform:At});dr(Jd,Zd,Qd);function Ie(e){return e<=1&&e!==0?`${e*100}%`:e}const eu=be({prop:"width",transform:Ie}),ko=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||No[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Ie(n)}};return et(e,e.maxWidth,t)}return null};ko.filterProps=["maxWidth"];const tu=be({prop:"minWidth",transform:Ie}),nu=be({prop:"height",transform:Ie}),ru=be({prop:"maxHeight",transform:Ie}),ou=be({prop:"minHeight",transform:Ie});be({prop:"size",cssProperty:"width",transform:Ie});be({prop:"size",cssProperty:"height",transform:Ie});const su=be({prop:"boxSizing"});dr(eu,ko,tu,nu,ru,ou,su);const au={border:{themeKey:"borders",transform:Be},borderTop:{themeKey:"borders",transform:Be},borderRight:{themeKey:"borders",transform:Be},borderBottom:{themeKey:"borders",transform:Be},borderLeft:{themeKey:"borders",transform:Be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:ur},color:{themeKey:"palette",transform:At},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:At},backgroundColor:{themeKey:"palette",transform:At},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:me},mt:{style:me},mr:{style:me},mb:{style:me},ml:{style:me},mx:{style:me},my:{style:me},margin:{style:me},marginTop:{style:me},marginRight:{style:me},marginBottom:{style:me},marginLeft:{style:me},marginX:{style:me},marginY:{style:me},marginInline:{style:me},marginInlineStart:{style:me},marginInlineEnd:{style:me},marginBlock:{style:me},marginBlockStart:{style:me},marginBlockEnd:{style:me},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:pr},rowGap:{style:fr},columnGap:{style:wr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ie},maxWidth:{style:ko},minWidth:{transform:Ie},height:{transform:Ie},maxHeight:{transform:Ie},minHeight:{transform:Ie},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Eo=au;function iu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function lu(e,t){return typeof e=="function"?e(t):e}function cu(){function e(n,r,o,a){const i={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:h}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const f=ir(o,d)||{};return h?h(i):et(i,r,v=>{let w=Wn(f,u,v);return v===w&&typeof v=="string"&&(w=Wn(f,u,`${n}${v==="default"?"":Ye(v)}`,v)),c===!1?w:{[c]:w}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const i=(r=a.unstable_sxConfig)!=null?r:Eo;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const u=yd(a.breakpoints),h=Object.keys(u);let f=u;return Object.keys(d).forEach(b=>{const v=lu(d[b],a);if(v!=null)if(typeof v=="object")if(i[b])f=wn(f,e(b,v,a,i));else{const w=et({theme:a},v,m=>({[b]:m}));iu(w,v)?f[b]=t({sx:v,theme:a}):f=wn(f,w)}else f=wn(f,e(b,v,a,i))}),xd(h,f)}return Array.isArray(o)?o.map(l):l(o)}return t}const Wa=cu();Wa.filterProps=["sx"];const So=Wa;function du(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const uu=["breakpoints","palette","spacing","shape"];function jo(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,i=xe(e,uu),l=hd(n),c=Od(o);let d=Qe({breakpoints:l,direction:"ltr",components:{},palette:O({mode:"light"},r),spacing:c,shape:O({},bd,a)},i);return d.applyStyles=du,d=t.reduce((u,h)=>Qe(u,h),d),d.unstable_sxConfig=O({},Eo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(h){return So({sx:h,theme:this})},d}function pu(e){return Object.keys(e).length===0}function Ka(e=null){const t=M.useContext(Ar.ThemeContext);return!t||pu(t)?e:t}const wu=jo();function Ja(e=wu){return Ka(e)}const fu=["ownerState"],mu=["variants"],hu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function gu(e){return Object.keys(e).length===0}function bu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Gn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const vu=jo(),Es=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Vn({defaultTheme:e,theme:t,themeId:n}){return gu(t)?e:t[n]||t}function yu(e){return e?(t,n)=>n[e]:null}function Un(e,t){let{ownerState:n}=t,r=xe(t,fu);const o=typeof e=="function"?e(O({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>Un(a,O({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=xe(o,mu);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(O({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(O({ownerState:n},r,n)):c.style))}),l}return o}function xu(e={}){const{themeId:t,defaultTheme:n=vu,rootShouldForwardProp:r=Gn,slotShouldForwardProp:o=Gn}=e,a=i=>So(O({},i,{theme:Vn(O({},i,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(i,l={})=>{Ar.internal_processStyles(i,g=>g.filter(R=>!(R!=null&&R.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:h,overridesResolver:f=yu(Es(d))}=l,b=xe(l,hu),v=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,w=h||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Es(d||"Root")}`);let N=Gn;d==="Root"||d==="root"?N=r:d?N=o:bu(i)&&(N=void 0);const _=Ar(i,O({shouldForwardProp:N,label:m},b)),j=g=>typeof g=="function"&&g.__emotion_real!==g||gt(g)?R=>Un(g,O({},R,{theme:Vn({theme:R.theme,defaultTheme:n,themeId:t})})):g,E=(g,...R)=>{let A=j(g);const U=R?R.map(j):[];c&&f&&U.push(k=>{const D=Vn(O({},k,{defaultTheme:n,themeId:t}));if(!D.components||!D.components[c]||!D.components[c].styleOverrides)return null;const $=D.components[c].styleOverrides,Z={};return Object.entries($).forEach(([Y,z])=>{Z[Y]=Un(z,O({},k,{theme:D}))}),f(k,Z)}),c&&!v&&U.push(k=>{var D;const $=Vn(O({},k,{defaultTheme:n,themeId:t})),Z=$==null||(D=$.components)==null||(D=D[c])==null?void 0:D.variants;return Un({variants:Z},O({},k,{theme:$}))}),w||U.push(a);const T=U.length-R.length;if(Array.isArray(g)&&T>0){const k=new Array(T).fill("");A=[...g,...k],A.raw=[...g.raw,...k]}const P=_(A,...U);if(process.env.NODE_ENV!=="production"){let k;c&&(k=`${c}${Ye(d||"")}`),k===void 0&&(k=`Styled(${Uc(i)})`),P.displayName=k}return i.muiName&&(P.muiName=i.muiName),P};return _.withConfig&&(E.withConfig=_.withConfig),E}}function Nu(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ga(t.components[n].defaultProps,r)}function ku({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ja(n);return r&&(o=o[r]||o),Nu({theme:o,name:t,props:e})}function To(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),wd(e,t,n)}function Eu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Et(e){if(e.type)return e;if(e.charAt(0)==="#")return Et(Eu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Vt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Vt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function mr(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Su(e){e=Et(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),mr({type:l,values:c})}function Ss(e){e=Et(e);let t=e.type==="hsl"||e.type==="hsla"?Et(Su(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function js(e,t){const n=Ss(e),r=Ss(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function Za(e,t){return e=Et(e),t=To(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,mr(e)}function ju(e,t){if(e=Et(e),t=To(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return mr(e)}function Tu(e,t){if(e=Et(e),t=To(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return mr(e)}function Cu(e,t){return O({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Ou={black:"#000",white:"#fff"},vn=Ou,Ru={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Pu=Ru,_u={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Rt=_u,Iu={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Pt=Iu,$u={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},nn=$u,Mu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},_t=Mu,Du={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},It=Du,Au={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},$t=Au,Bu=["mode","contrastThreshold","tonalOffset"],Ts={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:vn.white,default:vn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},$r={text:{primary:vn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:vn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Cs(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Tu(e.main,o):t==="dark"&&(e.dark=ju(e.main,a)))}function Vu(e="light"){return e==="dark"?{main:_t[200],light:_t[50],dark:_t[400]}:{main:_t[700],light:_t[400],dark:_t[800]}}function Fu(e="light"){return e==="dark"?{main:Rt[200],light:Rt[50],dark:Rt[400]}:{main:Rt[500],light:Rt[300],dark:Rt[700]}}function Lu(e="light"){return e==="dark"?{main:Pt[500],light:Pt[300],dark:Pt[700]}:{main:Pt[700],light:Pt[400],dark:Pt[800]}}function zu(e="light"){return e==="dark"?{main:It[400],light:It[300],dark:It[700]}:{main:It[700],light:It[500],dark:It[900]}}function Gu(e="light"){return e==="dark"?{main:$t[400],light:$t[300],dark:$t[700]}:{main:$t[800],light:$t[500],dark:$t[900]}}function Uu(e="light"){return e==="dark"?{main:nn[400],light:nn[300],dark:nn[700]}:{main:"#ed6c02",light:nn[500],dark:nn[900]}}function qu(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=xe(e,Bu),a=e.primary||Vu(t),i=e.secondary||Fu(t),l=e.error||Lu(t),c=e.info||zu(t),d=e.success||Gu(t),u=e.warning||Uu(t);function h(w){const m=js(w,$r.text.primary)>=n?$r.text.primary:Ts.text.primary;if(process.env.NODE_ENV!=="production"){const N=js(w,m);N<3&&console.error([`MUI: The contrast ratio of ${N}:1 for ${m} on ${w}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const f=({color:w,name:m,mainShade:N=500,lightShade:_=300,darkShade:j=700})=>{if(w=O({},w),!w.main&&w[N]&&(w.main=w[N]),!w.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`:Vt(11,m?` (${m})`:"",N));if(typeof w.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(w.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Vt(12,m?` (${m})`:"",JSON.stringify(w.main)));return Cs(w,"light",_,r),Cs(w,"dark",j,r),w.contrastText||(w.contrastText=h(w.main)),w},b={dark:$r,light:Ts};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Qe(O({common:O({},vn),mode:t,primary:f({color:a,name:"primary"}),secondary:f({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:l,name:"error"}),warning:f({color:u,name:"warning"}),info:f({color:c,name:"info"}),success:f({color:d,name:"success"}),grey:Pu,contrastThreshold:n,getContrastText:h,augmentColor:f,tonalOffset:r},b[t]),o)}const Hu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Xu(e){return Math.round(e*1e5)/1e5}const Os={textTransform:"uppercase"},Rs='"Roboto", "Helvetica", "Arial", sans-serif';function Yu(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Rs,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:h}=n,f=xe(n,Hu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=h||(N=>`${N/d*b}rem`),w=(N,_,j,E,g)=>O({fontFamily:r,fontWeight:N,fontSize:v(_),lineHeight:j},r===Rs?{letterSpacing:`${Xu(E/_)}em`}:{},g,u),m={h1:w(a,96,1.167,-1.5),h2:w(a,60,1.2,-.5),h3:w(i,48,1.167,0),h4:w(i,34,1.235,.25),h5:w(i,24,1.334,0),h6:w(l,20,1.6,.15),subtitle1:w(i,16,1.75,.15),subtitle2:w(l,14,1.57,.1),body1:w(i,16,1.5,.15),body2:w(i,14,1.43,.15),button:w(l,14,1.75,.4,Os),caption:w(i,12,1.66,.4),overline:w(i,12,2.66,1,Os),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Qe(O({htmlFontSize:d,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},m),f,{clone:!1})}const Wu=.2,Ku=.14,Ju=.12;function we(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ku})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ju})`].join(",")}const Zu=["none",we(0,2,1,-1,0,1,1,0,0,1,3,0),we(0,3,1,-2,0,2,2,0,0,1,5,0),we(0,3,3,-2,0,3,4,0,0,1,8,0),we(0,2,4,-1,0,4,5,0,0,1,10,0),we(0,3,5,-1,0,5,8,0,0,1,14,0),we(0,3,5,-1,0,6,10,0,0,1,18,0),we(0,4,5,-2,0,7,10,1,0,2,16,1),we(0,5,5,-3,0,8,10,1,0,3,14,2),we(0,5,6,-3,0,9,12,1,0,3,16,2),we(0,6,6,-3,0,10,14,1,0,4,18,3),we(0,6,7,-4,0,11,15,1,0,4,20,3),we(0,7,8,-4,0,12,17,2,0,5,22,4),we(0,7,8,-4,0,13,19,2,0,5,24,4),we(0,7,9,-4,0,14,21,2,0,5,26,4),we(0,8,9,-5,0,15,22,2,0,6,28,5),we(0,8,10,-5,0,16,24,2,0,6,30,5),we(0,8,11,-5,0,17,26,2,0,6,32,5),we(0,9,11,-5,0,18,28,2,0,7,34,6),we(0,9,12,-6,0,19,29,2,0,7,36,6),we(0,10,13,-6,0,20,31,3,0,8,38,7),we(0,10,13,-6,0,21,33,3,0,8,40,7),we(0,10,14,-6,0,22,35,3,0,8,42,7),we(0,11,14,-7,0,23,36,3,0,9,44,8),we(0,11,15,-7,0,24,38,3,0,9,46,8)],Qu=Zu,ep=["duration","easing","delay"],tp={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},np={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ps(e){return`${Math.round(e)}ms`}function rp(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function op(e){const t=O({},tp,e.easing),n=O({},np,e.duration);return O({getAutoHeightDuration:rp,create:(o=["all"],a={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=xe(a,ep);if(process.env.NODE_ENV!=="production"){const u=f=>typeof f=="string",h=f=>!isNaN(parseFloat(f));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!h(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!h(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:Ps(i)} ${l} ${typeof c=="string"?c:Ps(c)}`).join(",")}},e,{easing:t,duration:n})}const sp={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},ap=sp,ip=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function lp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,i=xe(e,ip);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Vt(18));const l=qu(r),c=jo(e);let d=Qe(c,{mixins:Cu(c.breakpoints,n),palette:l,shadows:Qu.slice(),typography:Yu(l,a),transitions:op(o),zIndex:O({},ap)});if(d=Qe(d,i),d=t.reduce((u,h)=>Qe(u,h),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],h=(f,b)=>{let v;for(v in f){const w=f[v];if(u.indexOf(v)!==-1&&Object.keys(w).length>0){if(process.env.NODE_ENV!=="production"){const m=ar("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:w}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[v]={}}}};Object.keys(d.components).forEach(f=>{const b=d.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&h(b,f)})}return d.unstable_sxConfig=O({},Eo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(h){return So({sx:h,theme:this})},d}const cp=lp(),Co=cp,Oo="$$material";function Ro({props:e,name:t}){return ku({props:e,name:t,defaultTheme:Co,themeId:Oo})}const dp=e=>Gn(e)&&e!=="classes",up=xu({themeId:Oo,defaultTheme:Co,rootShouldForwardProp:dp}),Pn=up;function pp(e){return ar("MuiSvgIcon",e)}Ha("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const wp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],fp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ye(t)}`,`fontSize${Ye(n)}`]};return xo(o,pp,r)},mp=Pn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ye(n.color)}`],t[`fontSize${Ye(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,i,l,c,d,u,h,f,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(h=(f=(e.vars||e).palette)==null||(f=f[t.color])==null?void 0:f.main)!=null?h:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),Po=M.forwardRef(function(t,n){const r=Ro({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:h,viewBox:f="0 0 24 24"}=r,b=xe(r,wp),v=M.isValidElement(o)&&o.type==="svg",w=O({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:f,hasSvgAsChild:v}),m={};u||(m.viewBox=f);const N=fp(w);return s.jsxs(mp,O({as:l,className:ot(N.root,a),focusable:"false",color:d,"aria-hidden":h?void 0:!0,role:h?"img":void 0,ref:n},m,b,v&&o.props,{ownerState:w,children:[v?o.props.children:o,h?s.jsx("title",{children:h}):null]}))});process.env.NODE_ENV!=="production"&&(Po.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});Po.muiName="SvgIcon";const _s=Po;function Qa(e,t){function n(r,o){return s.jsx(_s,O({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=_s.muiName,M.memo(M.forwardRef(n))}const hp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ua.configure(e)}},gp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ye,createChainedFunction:Hc,createSvgIcon:Qa,debounce:Xc,deprecatedPropType:Yc,isMuiElement:Wc,ownerDocument:Xn,ownerWindow:Kc,requirePropFactory:Jc,setRef:Yn,unstable_ClassNameGenerator:hp,unstable_useEnhancedEffect:Ft,unstable_useId:Fa,unsupportedProp:ed,useControlled:La,useEventCallback:Ur,useForkRef:kt,useIsFocusVisible:za},Symbol.toStringTag,{value:"Module"})),bp=jc(gp);var Is;function vp(){return Is||(Is=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=bp}(jr)),jr}var yp=Tc;Object.defineProperty(bo,"__esModule",{value:!0});var ei=bo.default=void 0,xp=yp(vp()),Np=s;ei=bo.default=(0,xp.default)((0,Np.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function kp(e){return typeof e=="string"}function cn(e,t,n){return e===void 0||kp(e)?t:O({},t,{ownerState:O({},t.ownerState,n)})}const Ep={disableDefaultClasses:!1},Sp=M.createContext(Ep);function jp(e){const{disableDefaultClasses:t}=M.useContext(Sp);return n=>t?"":e(n)}function Tp(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Cp(e,t,n){return typeof e=="function"?e(t,n):e}function $s(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Op(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const b=ot(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),v=O({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=O({},n,o,r);return b.length>0&&(w.className=b),Object.keys(v).length>0&&(w.style=v),{props:w,internalRef:void 0}}const i=Tp(O({},o,r)),l=$s(r),c=$s(o),d=t(i),u=ot(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=O({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=O({},d,n,c,l);return u.length>0&&(f.className=u),Object.keys(h).length>0&&(f.style=h),{props:f,internalRef:d.ref}}const Rp=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Pp(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,i=xe(e,Rp),l=a?{}:Cp(r,o),{props:c,internalRef:d}=Op(O({},i,{externalSlotProps:l})),u=kt(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return cn(n,O({},c,{ref:u}),o)}const ti="base";function _p(e){return`${ti}--${e}`}function Ip(e,t){return`${ti}-${e}-${t}`}function ni(e,t){const n=qa[t];return n?_p(n):Ip(e,t)}function $p(e,t){const n={};return t.forEach(r=>{n[r]=ni(e,r)}),n}function Mp(e){return typeof e=="function"?e():e}const Kn=M.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[i,l]=M.useState(null),c=kt(M.isValidElement(r)?r.ref:null,n);if(Ft(()=>{a||l(Mp(o)||document.body)},[o,a]),Ft(()=>{if(i&&!a)return Yn(n,i),()=>{Yn(n,null)}},[n,i,a]),a){if(M.isValidElement(r)){const d={ref:c};return M.cloneElement(r,d)}return s.jsx(M.Fragment,{children:r})}return s.jsx(M.Fragment,{children:i&&fl.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(Kn.propTypes={children:p.node,container:p.oneOfType([bn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(Kn["propTypes"]=Vc(Kn.propTypes));var je="top",Fe="bottom",Le="right",Te="left",_o="auto",_n=[je,Fe,Le,Te],Lt="start",yn="end",Dp="clippingParents",ri="viewport",rn="popper",Ap="reference",Ms=_n.reduce(function(e,t){return e.concat([t+"-"+Lt,t+"-"+yn])},[]),oi=[].concat(_n,[_o]).reduce(function(e,t){return e.concat([t,t+"-"+Lt,t+"-"+yn])},[]),Bp="beforeRead",Vp="read",Fp="afterRead",Lp="beforeMain",zp="main",Gp="afterMain",Up="beforeWrite",qp="write",Hp="afterWrite",Xp=[Bp,Vp,Fp,Lp,zp,Gp,Up,qp,Hp];function We(e){return e?(e.nodeName||"").toLowerCase():null}function De(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function St(e){var t=De(e).Element;return e instanceof t||e instanceof Element}function Ve(e){var t=De(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Io(e){if(typeof ShadowRoot>"u")return!1;var t=De(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Yp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Ve(a)||!We(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?a.removeAttribute(i):a.setAttribute(i,l===!0?"":l)}))})}function Wp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Ve(o)||!We(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Kp={name:"applyStyles",enabled:!0,phase:"write",fn:Yp,effect:Wp,requires:["computeStyles"]};function He(e){return e.split("-")[0]}var bt=Math.max,Jn=Math.min,zt=Math.round;function Hr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function si(){return!/^((?!chrome|android).)*safari/i.test(Hr())}function Gt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Ve(e)&&(o=e.offsetWidth>0&&zt(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&zt(r.height)/e.offsetHeight||1);var i=St(e)?De(e):window,l=i.visualViewport,c=!si()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/a,h=r.width/o,f=r.height/a;return{width:h,height:f,top:u,right:d+h,bottom:u+f,left:d,x:d,y:u}}function $o(e){var t=Gt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function ai(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Io(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function tt(e){return De(e).getComputedStyle(e)}function Jp(e){return["table","td","th"].indexOf(We(e))>=0}function ct(e){return((St(e)?e.ownerDocument:e.document)||window.document).documentElement}function hr(e){return We(e)==="html"?e:e.assignedSlot||e.parentNode||(Io(e)?e.host:null)||ct(e)}function Ds(e){return!Ve(e)||tt(e).position==="fixed"?null:e.offsetParent}function Zp(e){var t=/firefox/i.test(Hr()),n=/Trident/i.test(Hr());if(n&&Ve(e)){var r=tt(e);if(r.position==="fixed")return null}var o=hr(e);for(Io(o)&&(o=o.host);Ve(o)&&["html","body"].indexOf(We(o))<0;){var a=tt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function In(e){for(var t=De(e),n=Ds(e);n&&Jp(n)&&tt(n).position==="static";)n=Ds(n);return n&&(We(n)==="html"||We(n)==="body"&&tt(n).position==="static")?t:n||Zp(e)||t}function Mo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function fn(e,t,n){return bt(e,Jn(t,n))}function Qp(e,t,n){var r=fn(e,t,n);return r>n?n:r}function ii(){return{top:0,right:0,bottom:0,left:0}}function li(e){return Object.assign({},ii(),e)}function ci(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var ew=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,li(typeof t!="number"?t:ci(t,_n))};function tw(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,i=n.modifiersData.popperOffsets,l=He(n.placement),c=Mo(l),d=[Te,Le].indexOf(l)>=0,u=d?"height":"width";if(!(!a||!i)){var h=ew(o.padding,n),f=$o(a),b=c==="y"?je:Te,v=c==="y"?Fe:Le,w=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],m=i[c]-n.rects.reference[c],N=In(a),_=N?c==="y"?N.clientHeight||0:N.clientWidth||0:0,j=w/2-m/2,E=h[b],g=_-f[u]-h[v],R=_/2-f[u]/2+j,A=fn(E,R,g),U=c;n.modifiersData[r]=(t={},t[U]=A,t.centerOffset=A-R,t)}}function nw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||ai(t.elements.popper,o)&&(t.elements.arrow=o))}const rw={name:"arrow",enabled:!0,phase:"main",fn:tw,effect:nw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ut(e){return e.split("-")[1]}var ow={top:"auto",right:"auto",bottom:"auto",left:"auto"};function sw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:zt(n*o)/o||0,y:zt(r*o)/o||0}}function As(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,h=e.isFixed,f=i.x,b=f===void 0?0:f,v=i.y,w=v===void 0?0:v,m=typeof u=="function"?u({x:b,y:w}):{x:b,y:w};b=m.x,w=m.y;var N=i.hasOwnProperty("x"),_=i.hasOwnProperty("y"),j=Te,E=je,g=window;if(d){var R=In(n),A="clientHeight",U="clientWidth";if(R===De(n)&&(R=ct(n),tt(R).position!=="static"&&l==="absolute"&&(A="scrollHeight",U="scrollWidth")),R=R,o===je||(o===Te||o===Le)&&a===yn){E=Fe;var T=h&&R===g&&g.visualViewport?g.visualViewport.height:R[A];w-=T-r.height,w*=c?1:-1}if(o===Te||(o===je||o===Fe)&&a===yn){j=Le;var P=h&&R===g&&g.visualViewport?g.visualViewport.width:R[U];b-=P-r.width,b*=c?1:-1}}var k=Object.assign({position:l},d&&ow),D=u===!0?sw({x:b,y:w},De(n)):{x:b,y:w};if(b=D.x,w=D.y,c){var $;return Object.assign({},k,($={},$[E]=_?"0":"",$[j]=N?"0":"",$.transform=(g.devicePixelRatio||1)<=1?"translate("+b+"px, "+w+"px)":"translate3d("+b+"px, "+w+"px, 0)",$))}return Object.assign({},k,(t={},t[E]=_?w+"px":"",t[j]=N?b+"px":"",t.transform="",t))}function aw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,i=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:He(t.placement),variation:Ut(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,As(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,As(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const iw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:aw,data:{}};var Fn={passive:!0};function lw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=De(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(u){u.addEventListener("scroll",n.update,Fn)}),l&&c.addEventListener("resize",n.update,Fn),function(){a&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Fn)}),l&&c.removeEventListener("resize",n.update,Fn)}}const cw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:lw,data:{}};var dw={left:"right",right:"left",bottom:"top",top:"bottom"};function qn(e){return e.replace(/left|right|bottom|top/g,function(t){return dw[t]})}var uw={start:"end",end:"start"};function Bs(e){return e.replace(/start|end/g,function(t){return uw[t]})}function Do(e){var t=De(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Ao(e){return Gt(ct(e)).left+Do(e).scrollLeft}function pw(e,t){var n=De(e),r=ct(e),o=n.visualViewport,a=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){a=o.width,i=o.height;var d=si();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:i,x:l+Ao(e),y:c}}function ww(e){var t,n=ct(e),r=Do(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=bt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=bt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Ao(e),c=-r.scrollTop;return tt(o||n).direction==="rtl"&&(l+=bt(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:i,x:l,y:c}}function Bo(e){var t=tt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function di(e){return["html","body","#document"].indexOf(We(e))>=0?e.ownerDocument.body:Ve(e)&&Bo(e)?e:di(hr(e))}function mn(e,t){var n;t===void 0&&(t=[]);var r=di(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=De(r),i=o?[a].concat(a.visualViewport||[],Bo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(mn(hr(i)))}function Xr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function fw(e,t){var n=Gt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Vs(e,t,n){return t===ri?Xr(pw(e,n)):St(t)?fw(t,n):Xr(ww(ct(e)))}function mw(e){var t=mn(hr(e)),n=["absolute","fixed"].indexOf(tt(e).position)>=0,r=n&&Ve(e)?In(e):e;return St(r)?t.filter(function(o){return St(o)&&ai(o,r)&&We(o)!=="body"}):[]}function hw(e,t,n,r){var o=t==="clippingParents"?mw(e):[].concat(t),a=[].concat(o,[n]),i=a[0],l=a.reduce(function(c,d){var u=Vs(e,d,r);return c.top=bt(u.top,c.top),c.right=Jn(u.right,c.right),c.bottom=Jn(u.bottom,c.bottom),c.left=bt(u.left,c.left),c},Vs(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function ui(e){var t=e.reference,n=e.element,r=e.placement,o=r?He(r):null,a=r?Ut(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case je:c={x:i,y:t.y-n.height};break;case Fe:c={x:i,y:t.y+t.height};break;case Le:c={x:t.x+t.width,y:l};break;case Te:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Mo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(a){case Lt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case yn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function xn(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,i=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Dp:l,d=n.rootBoundary,u=d===void 0?ri:d,h=n.elementContext,f=h===void 0?rn:h,b=n.altBoundary,v=b===void 0?!1:b,w=n.padding,m=w===void 0?0:w,N=li(typeof m!="number"?m:ci(m,_n)),_=f===rn?Ap:rn,j=e.rects.popper,E=e.elements[v?_:f],g=hw(St(E)?E:E.contextElement||ct(e.elements.popper),c,u,i),R=Gt(e.elements.reference),A=ui({reference:R,element:j,strategy:"absolute",placement:o}),U=Xr(Object.assign({},j,A)),T=f===rn?U:R,P={top:g.top-T.top+N.top,bottom:T.bottom-g.bottom+N.bottom,left:g.left-T.left+N.left,right:T.right-g.right+N.right},k=e.modifiersData.offset;if(f===rn&&k){var D=k[o];Object.keys(P).forEach(function($){var Z=[Le,Fe].indexOf($)>=0?1:-1,Y=[je,Fe].indexOf($)>=0?"y":"x";P[$]+=D[Y]*Z})}return P}function gw(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?oi:c,u=Ut(r),h=u?l?Ms:Ms.filter(function(v){return Ut(v)===u}):_n,f=h.filter(function(v){return d.indexOf(v)>=0});f.length===0&&(f=h);var b=f.reduce(function(v,w){return v[w]=xn(e,{placement:w,boundary:o,rootBoundary:a,padding:i})[He(w)],v},{});return Object.keys(b).sort(function(v,w){return b[v]-b[w]})}function bw(e){if(He(e)===_o)return[];var t=qn(e);return[Bs(e),t,Bs(t)]}function vw(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,h=n.rootBoundary,f=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,w=n.allowedAutoPlacements,m=t.options.placement,N=He(m),_=N===m,j=c||(_||!v?[qn(m)]:bw(m)),E=[m].concat(j).reduce(function(V,X){return V.concat(He(X)===_o?gw(t,{placement:X,boundary:u,rootBoundary:h,padding:d,flipVariations:v,allowedAutoPlacements:w}):X)},[]),g=t.rects.reference,R=t.rects.popper,A=new Map,U=!0,T=E[0],P=0;P<E.length;P++){var k=E[P],D=He(k),$=Ut(k)===Lt,Z=[je,Fe].indexOf(D)>=0,Y=Z?"width":"height",z=xn(t,{placement:k,boundary:u,rootBoundary:h,altBoundary:f,padding:d}),te=Z?$?Le:Te:$?Fe:je;g[Y]>R[Y]&&(te=qn(te));var ae=qn(te),oe=[];if(a&&oe.push(z[D]<=0),l&&oe.push(z[te]<=0,z[ae]<=0),oe.every(function(V){return V})){T=k,U=!1;break}A.set(k,oe)}if(U)for(var x=v?3:1,C=function(X){var q=E.find(function(H){var G=A.get(H);if(G)return G.slice(0,X).every(function(K){return K})});if(q)return T=q,"break"},F=x;F>0;F--){var L=C(F);if(L==="break")break}t.placement!==T&&(t.modifiersData[r]._skip=!0,t.placement=T,t.reset=!0)}}const yw={name:"flip",enabled:!0,phase:"main",fn:vw,requiresIfExists:["offset"],data:{_skip:!1}};function Fs(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Ls(e){return[je,Le,Fe,Te].some(function(t){return e[t]>=0})}function xw(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,i=xn(t,{elementContext:"reference"}),l=xn(t,{altBoundary:!0}),c=Fs(i,r),d=Fs(l,o,a),u=Ls(c),h=Ls(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":h})}const Nw={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:xw};function kw(e,t,n){var r=He(e),o=[Te,je].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=a[0],l=a[1];return i=i||0,l=(l||0)*o,[Te,Le].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function Ew(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,i=oi.reduce(function(u,h){return u[h]=kw(h,t.rects,a),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const Sw={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Ew};function jw(e){var t=e.state,n=e.name;t.modifiersData[n]=ui({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Tw={name:"popperOffsets",enabled:!0,phase:"read",fn:jw,data:{}};function Cw(e){return e==="x"?"y":"x"}function Ow(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,h=n.padding,f=n.tether,b=f===void 0?!0:f,v=n.tetherOffset,w=v===void 0?0:v,m=xn(t,{boundary:c,rootBoundary:d,padding:h,altBoundary:u}),N=He(t.placement),_=Ut(t.placement),j=!_,E=Mo(N),g=Cw(E),R=t.modifiersData.popperOffsets,A=t.rects.reference,U=t.rects.popper,T=typeof w=="function"?w(Object.assign({},t.rects,{placement:t.placement})):w,P=typeof T=="number"?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0};if(R){if(a){var $,Z=E==="y"?je:Te,Y=E==="y"?Fe:Le,z=E==="y"?"height":"width",te=R[E],ae=te+m[Z],oe=te-m[Y],x=b?-U[z]/2:0,C=_===Lt?A[z]:U[z],F=_===Lt?-U[z]:-A[z],L=t.elements.arrow,V=b&&L?$o(L):{width:0,height:0},X=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:ii(),q=X[Z],H=X[Y],G=fn(0,A[z],V[z]),K=j?A[z]/2-x-G-q-P.mainAxis:C-G-q-P.mainAxis,Q=j?-A[z]/2+x+G+H+P.mainAxis:F+G+H+P.mainAxis,ue=t.elements.arrow&&In(t.elements.arrow),I=ue?E==="y"?ue.clientTop||0:ue.clientLeft||0:0,ye=($=k==null?void 0:k[E])!=null?$:0,B=te+K-ye-I,ve=te+Q-ye,Ge=fn(b?Jn(ae,B):ae,te,b?bt(oe,ve):oe);R[E]=Ge,D[E]=Ge-te}if(l){var dt,Ee=E==="x"?je:Te,$n=E==="x"?Fe:Le,Ue=R[g],jt=g==="y"?"height":"width",ut=Ue+m[Ee],Tt=Ue-m[$n],Ct=[je,Te].indexOf(N)!==-1,Ot=(dt=k==null?void 0:k[g])!=null?dt:0,pt=Ct?ut:Ue-A[jt]-U[jt]-Ot+P.altAxis,Wt=Ct?Ue+A[jt]+U[jt]-Ot-P.altAxis:Tt,Mn=b&&Ct?Qp(pt,Ue,Wt):fn(b?pt:ut,Ue,b?Wt:Tt);R[g]=Mn,D[g]=Mn-Ue}t.modifiersData[r]=D}}const Rw={name:"preventOverflow",enabled:!0,phase:"main",fn:Ow,requiresIfExists:["offset"]};function Pw(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function _w(e){return e===De(e)||!Ve(e)?Do(e):Pw(e)}function Iw(e){var t=e.getBoundingClientRect(),n=zt(t.width)/e.offsetWidth||1,r=zt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function $w(e,t,n){n===void 0&&(n=!1);var r=Ve(t),o=Ve(t)&&Iw(t),a=ct(t),i=Gt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((We(t)!=="body"||Bo(a))&&(l=_w(t)),Ve(t)?(c=Gt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Ao(a))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Mw(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var i=[].concat(a.requires||[],a.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Dw(e){var t=Mw(e);return Xp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Aw(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Bw(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var zs={placement:"bottom",modifiers:[],strategy:"absolute"};function Gs(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Vw(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?zs:o;return function(l,c,d){d===void 0&&(d=a);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},zs,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},h=[],f=!1,b={state:u,setOptions:function(N){var _=typeof N=="function"?N(u.options):N;w(),u.options=Object.assign({},a,u.options,_),u.scrollParents={reference:St(l)?mn(l):l.contextElement?mn(l.contextElement):[],popper:mn(c)};var j=Dw(Bw([].concat(r,u.options.modifiers)));return u.orderedModifiers=j.filter(function(E){return E.enabled}),v(),b.update()},forceUpdate:function(){if(!f){var N=u.elements,_=N.reference,j=N.popper;if(Gs(_,j)){u.rects={reference:$w(_,In(j),u.options.strategy==="fixed"),popper:$o(j)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(P){return u.modifiersData[P.name]=Object.assign({},P.data)});for(var E=0;E<u.orderedModifiers.length;E++){if(u.reset===!0){u.reset=!1,E=-1;continue}var g=u.orderedModifiers[E],R=g.fn,A=g.options,U=A===void 0?{}:A,T=g.name;typeof R=="function"&&(u=R({state:u,options:U,name:T,instance:b})||u)}}}},update:Aw(function(){return new Promise(function(m){b.forceUpdate(),m(u)})}),destroy:function(){w(),f=!0}};if(!Gs(l,c))return b;b.setOptions(d).then(function(m){!f&&d.onFirstUpdate&&d.onFirstUpdate(m)});function v(){u.orderedModifiers.forEach(function(m){var N=m.name,_=m.options,j=_===void 0?{}:_,E=m.effect;if(typeof E=="function"){var g=E({state:u,name:N,instance:b,options:j}),R=function(){};h.push(g||R)}})}function w(){h.forEach(function(m){return m()}),h=[]}return b}}var Fw=[cw,Tw,iw,Kp,Sw,yw,Rw,rw,Nw],Lw=Vw({defaultModifiers:Fw});const pi="Popper";function zw(e){return ni(pi,e)}$p(pi,["root"]);const Gw=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Uw=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function qw(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Zn(e){return typeof e=="function"?e():e}function gr(e){return e.nodeType!==void 0}function Hw(e){return!gr(e)}const Xw=()=>xo({root:["root"]},jp(zw)),Yw={},Ww=M.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:h,popperRef:f,slotProps:b={},slots:v={},TransitionProps:w}=t,m=xe(t,Gw),N=M.useRef(null),_=kt(N,n),j=M.useRef(null),E=kt(j,f),g=M.useRef(E);Ft(()=>{g.current=E},[E]),M.useImperativeHandle(f,()=>j.current,[]);const R=qw(u,i),[A,U]=M.useState(R),[T,P]=M.useState(Zn(o));M.useEffect(()=>{j.current&&j.current.forceUpdate()}),M.useEffect(()=>{o&&P(Zn(o))},[o]),Ft(()=>{if(!T||!d)return;const Y=ae=>{U(ae.placement)};if(process.env.NODE_ENV!=="production"&&T&&gr(T)&&T.nodeType===1){const ae=T.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ae.top===0&&ae.left===0&&ae.right===0&&ae.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let z=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:ae})=>{Y(ae)}}];c!=null&&(z=z.concat(c)),h&&h.modifiers!=null&&(z=z.concat(h.modifiers));const te=Lw(T,N.current,O({placement:R},h,{modifiers:z}));return g.current(te),()=>{te.destroy(),g.current(null)}},[T,l,c,d,h,R]);const k={placement:A};w!==null&&(k.TransitionProps=w);const D=Xw(),$=(r=v.root)!=null?r:"div",Z=Pp({elementType:$,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:_},ownerState:t,className:D.root});return s.jsx($,O({},Z,{children:typeof a=="function"?a(k):a}))}),wi=M.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:h="bottom",popperOptions:f=Yw,popperRef:b,style:v,transition:w=!1,slotProps:m={},slots:N={}}=t,_=xe(t,Uw),[j,E]=M.useState(!0),g=()=>{E(!1)},R=()=>{E(!0)};if(!c&&!u&&(!w||j))return null;let A;if(a)A=a;else if(r){const P=Zn(r);A=P&&gr(P)?Xn(P).body:Xn(null).body}const U=!u&&c&&(!w||j)?"none":void 0,T=w?{in:u,onEnter:g,onExited:R}:void 0;return s.jsx(Kn,{disablePortal:l,container:A,children:s.jsx(Ww,O({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:w?!j:u,placement:h,popperOptions:f,popperRef:b,slotProps:m,slots:N},_,{style:O({position:"fixed",top:0,left:0,display:U},v),TransitionProps:T,children:o}))})});process.env.NODE_ENV!=="production"&&(wi.propTypes={anchorEl:vo(p.oneOfType([bn,p.object,p.func]),e=>{if(e.open){const t=Zn(e.anchorEl);if(t&&gr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Hw(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([bn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:Va,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function fi(){const e=Ja(Co);return process.env.NODE_ENV!=="production"&&M.useDebugValue(e),e[Oo]||e}function Yr(e,t){return Yr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Yr(e,t)}function Kw(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Yr(e,t)}const Us={disabled:!1};var Jw=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const mi=y.createContext(null);var Zw=function(t){return t.scrollTop},dn="unmounted",mt="exited",ht="entering",Dt="entered",Wr="exiting",nt=function(e){Kw(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=mt,a.appearStatus=ht):c=Dt:r.unmountOnExit||r.mountOnEnter?c=dn:c=mt,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var i=o.in;return i&&a.status===dn?{status:mt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==ht&&i!==Dt&&(a=ht):(i===ht||i===Dt)&&(a=Wr)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,i,l;return a=i=l=o,o!=null&&typeof o!="number"&&(a=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:a,enter:i,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===ht){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:sn.findDOMNode(this);i&&Zw(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===mt&&this.setState({status:dn})},n.performEnter=function(o){var a=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[sn.findDOMNode(this),l],d=c[0],u=c[1],h=this.getTimeouts(),f=l?h.appear:h.enter;if(!o&&!i||Us.disabled){this.safeSetState({status:Dt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:ht},function(){a.props.onEntering(d,u),a.onTransitionEnd(f,function(){a.safeSetState({status:Dt},function(){a.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,a=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:sn.findDOMNode(this);if(!a||Us.disabled){this.safeSetState({status:mt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Wr},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:mt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var i=this.props.nodeRef?this.props.nodeRef.current:sn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===dn)return null;var a=this.props,i=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=xe(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return y.createElement(mi.Provider,{value:null},typeof i=="function"?i(o,l):y.cloneElement(y.Children.only(i),l))},t}(y.Component);nt.contextType=mi;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,a){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Jw;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function Mt(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Mt,onEntering:Mt,onEntered:Mt,onExit:Mt,onExiting:Mt,onExited:Mt};nt.UNMOUNTED=dn;nt.EXITED=mt;nt.ENTERING=ht;nt.ENTERED=Dt;nt.EXITING=Wr;const Qw=nt,ef=e=>e.scrollTop;function qs(e,t){var n,r;const{timeout:o,easing:a,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:i.transitionDelay}}const tf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Kr(e){return`scale(${e}, ${e**2})`}const nf={entering:{opacity:1,transform:Kr(1)},entered:{opacity:1,transform:"none"}},Mr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Vo=M.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:h,onExited:f,onExiting:b,style:v,timeout:w="auto",TransitionComponent:m=Qw}=t,N=xe(t,tf),_=ln(),j=M.useRef(),E=fi(),g=M.useRef(null),R=kt(g,a.ref,n),A=Y=>z=>{if(Y){const te=g.current;z===void 0?Y(te):Y(te,z)}},U=A(u),T=A((Y,z)=>{ef(Y);const{duration:te,delay:ae,easing:oe}=qs({style:v,timeout:w,easing:i},{mode:"enter"});let x;w==="auto"?(x=E.transitions.getAutoHeightDuration(Y.clientHeight),j.current=x):x=te,Y.style.transition=[E.transitions.create("opacity",{duration:x,delay:ae}),E.transitions.create("transform",{duration:Mr?x:x*.666,delay:ae,easing:oe})].join(","),c&&c(Y,z)}),P=A(d),k=A(b),D=A(Y=>{const{duration:z,delay:te,easing:ae}=qs({style:v,timeout:w,easing:i},{mode:"exit"});let oe;w==="auto"?(oe=E.transitions.getAutoHeightDuration(Y.clientHeight),j.current=oe):oe=z,Y.style.transition=[E.transitions.create("opacity",{duration:oe,delay:te}),E.transitions.create("transform",{duration:Mr?oe:oe*.666,delay:Mr?te:te||oe*.333,easing:ae})].join(","),Y.style.opacity=0,Y.style.transform=Kr(.75),h&&h(Y)}),$=A(f),Z=Y=>{w==="auto"&&_.start(j.current||0,Y),r&&r(g.current,Y)};return s.jsx(m,O({appear:o,in:l,nodeRef:g,onEnter:T,onEntered:P,onEntering:U,onExit:D,onExited:$,onExiting:k,addEndListener:Z,timeout:w==="auto"?null:w},N,{children:(Y,z)=>M.cloneElement(a,O({style:O({opacity:0,transform:Kr(.75),visibility:Y==="exited"&&!l?"hidden":void 0},nf[Y],v,a.props.style),ref:R},z))}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={addEndListener:p.func,appear:p.bool,children:Aa.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Vo.muiSupportAuto=!0;const Hs=Vo,rf=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],of=Pn(wi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),hi=M.forwardRef(function(t,n){var r;const o=Ka(),a=Ro({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:h,keepMounted:f,modifiers:b,open:v,placement:w,popperOptions:m,popperRef:N,transition:_,slots:j,slotProps:E}=a,g=xe(a,rf),R=(r=j==null?void 0:j.root)!=null?r:c==null?void 0:c.Root,A=O({anchorEl:i,container:u,disablePortal:h,keepMounted:f,modifiers:b,open:v,placement:w,popperOptions:m,popperRef:N,transition:_},g);return s.jsx(of,O({as:l,direction:o==null?void 0:o.direction,slots:{root:R},slotProps:E??d},A,{ref:n}))});process.env.NODE_ENV!=="production"&&(hi.propTypes={anchorEl:p.oneOfType([bn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([bn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:Va,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const gi=hi;function sf(e){return ar("MuiTooltip",e)}const af=Ha("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),st=af,lf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function cf(e){return Math.round(e*1e5)/1e5}const df=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ye(a.split("-")[0])}`],arrow:["arrow"]};return xo(i,sf,t)},uf=Pn(gi,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>O({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${st.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${st.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${st.arrow}`]:O({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${st.arrow}`]:O({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),pf=Pn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ye(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>O({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Za(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${cf(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${st.popper}[data-popper-placement*="left"] &`]:O({transformOrigin:"right center"},t.isRtl?O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):O({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${st.popper}[data-popper-placement*="right"] &`]:O({transformOrigin:"left center"},t.isRtl?O({marginRight:"14px"},t.touch&&{marginRight:"24px"}):O({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${st.popper}[data-popper-placement*="top"] &`]:O({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${st.popper}[data-popper-placement*="bottom"] &`]:O({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),wf=Pn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Za(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Ln=!1;const Xs=new Cn;let on={x:0,y:0};function zn(e,t){return n=>{t&&t(n),e(n)}}const bi=M.forwardRef(function(t,n){var r,o,a,i,l,c,d,u,h,f,b,v,w,m,N,_,j,E,g;const R=Ro({props:t,name:"MuiTooltip"}),{arrow:A=!1,children:U,components:T={},componentsProps:P={},describeChild:k=!1,disableFocusListener:D=!1,disableHoverListener:$=!1,disableInteractive:Z=!1,disableTouchListener:Y=!1,enterDelay:z=100,enterNextDelay:te=0,enterTouchDelay:ae=700,followCursor:oe=!1,id:x,leaveDelay:C=0,leaveTouchDelay:F=1500,onClose:L,onOpen:V,open:X,placement:q="bottom",PopperComponent:H,PopperProps:G={},slotProps:K={},slots:Q={},title:ue,TransitionComponent:I=Hs,TransitionProps:ye}=R,B=xe(R,lf),ve=M.isValidElement(U)?U:s.jsx("span",{children:U}),Ge=fi(),dt=Ge.direction==="rtl",[Ee,$n]=M.useState(),[Ue,jt]=M.useState(null),ut=M.useRef(!1),Tt=Z||oe,Ct=ln(),Ot=ln(),pt=ln(),Wt=ln(),[Mn,Lo]=La({controlled:X,default:!1,name:"Tooltip",state:"open"});let Ke=Mn;if(process.env.NODE_ENV!=="production"){const{current:ee}=M.useRef(X!==void 0);M.useEffect(()=>{Ee&&Ee.disabled&&!ee&&ue!==""&&Ee.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[ue,Ee,ee])}const br=Fa(x),Kt=M.useRef(),Dn=Ur(()=>{Kt.current!==void 0&&(document.body.style.WebkitUserSelect=Kt.current,Kt.current=void 0),Wt.clear()});M.useEffect(()=>Dn,[Dn]);const zo=ee=>{Xs.clear(),Ln=!0,Lo(!0),V&&!Ke&&V(ee)},An=Ur(ee=>{Xs.start(800+C,()=>{Ln=!1}),Lo(!1),L&&Ke&&L(ee),Ct.start(Ge.transitions.duration.shortest,()=>{ut.current=!1})}),vr=ee=>{ut.current&&ee.type!=="touchstart"||(Ee&&Ee.removeAttribute("title"),Ot.clear(),pt.clear(),z||Ln&&te?Ot.start(Ln?te:z,()=>{zo(ee)}):zo(ee))},Go=ee=>{Ot.clear(),pt.start(C,()=>{An(ee)})},{isFocusVisibleRef:Uo,onBlur:Li,onFocus:zi,ref:Gi}=za(),[,qo]=M.useState(!1),Ho=ee=>{Li(ee),Uo.current===!1&&(qo(!1),Go(ee))},Xo=ee=>{Ee||$n(ee.currentTarget),zi(ee),Uo.current===!0&&(qo(!0),vr(ee))},Yo=ee=>{ut.current=!0;const Re=ve.props;Re.onTouchStart&&Re.onTouchStart(ee)},Wo=vr,Ko=Go,Ui=ee=>{Yo(ee),pt.clear(),Ct.clear(),Dn(),Kt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Wt.start(ae,()=>{document.body.style.WebkitUserSelect=Kt.current,vr(ee)})},qi=ee=>{ve.props.onTouchEnd&&ve.props.onTouchEnd(ee),Dn(),pt.start(F,()=>{An(ee)})};M.useEffect(()=>{if(!Ke)return;function ee(Re){(Re.key==="Escape"||Re.key==="Esc")&&An(Re)}return document.addEventListener("keydown",ee),()=>{document.removeEventListener("keydown",ee)}},[An,Ke]);const Hi=kt(ve.ref,Gi,$n,n);!ue&&ue!==0&&(Ke=!1);const yr=M.useRef(),Xi=ee=>{const Re=ve.props;Re.onMouseMove&&Re.onMouseMove(ee),on={x:ee.clientX,y:ee.clientY},yr.current&&yr.current.update()},Jt={},xr=typeof ue=="string";k?(Jt.title=!Ke&&xr&&!$?ue:null,Jt["aria-describedby"]=Ke?br:null):(Jt["aria-label"]=xr?ue:null,Jt["aria-labelledby"]=Ke&&!xr?br:null);const Ae=O({},Jt,B,ve.props,{className:ot(B.className,ve.props.className),onTouchStart:Yo,ref:Hi},oe?{onMouseMove:Xi}:{});process.env.NODE_ENV!=="production"&&(Ae["data-mui-internal-clone-element"]=!0,M.useEffect(()=>{Ee&&!Ee.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ee]));const Zt={};Y||(Ae.onTouchStart=Ui,Ae.onTouchEnd=qi),$||(Ae.onMouseOver=zn(Wo,Ae.onMouseOver),Ae.onMouseLeave=zn(Ko,Ae.onMouseLeave),Tt||(Zt.onMouseOver=Wo,Zt.onMouseLeave=Ko)),D||(Ae.onFocus=zn(Xo,Ae.onFocus),Ae.onBlur=zn(Ho,Ae.onBlur),Tt||(Zt.onFocus=Xo,Zt.onBlur=Ho)),process.env.NODE_ENV!=="production"&&ve.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${ve.props.title}\` or the Tooltip component.`].join(`
`));const Yi=M.useMemo(()=>{var ee;let Re=[{name:"arrow",enabled:!!Ue,options:{element:Ue,padding:4}}];return(ee=G.popperOptions)!=null&&ee.modifiers&&(Re=Re.concat(G.popperOptions.modifiers)),O({},G.popperOptions,{modifiers:Re})},[Ue,G]),Qt=O({},R,{isRtl:dt,arrow:A,disableInteractive:Tt,placement:q,PopperComponentProp:H,touch:ut.current}),Nr=df(Qt),Jo=(r=(o=Q.popper)!=null?o:T.Popper)!=null?r:uf,Zo=(a=(i=(l=Q.transition)!=null?l:T.Transition)!=null?i:I)!=null?a:Hs,Qo=(c=(d=Q.tooltip)!=null?d:T.Tooltip)!=null?c:pf,es=(u=(h=Q.arrow)!=null?h:T.Arrow)!=null?u:wf,Wi=cn(Jo,O({},G,(f=K.popper)!=null?f:P.popper,{className:ot(Nr.popper,G==null?void 0:G.className,(b=(v=K.popper)!=null?v:P.popper)==null?void 0:b.className)}),Qt),Ki=cn(Zo,O({},ye,(w=K.transition)!=null?w:P.transition),Qt),Ji=cn(Qo,O({},(m=K.tooltip)!=null?m:P.tooltip,{className:ot(Nr.tooltip,(N=(_=K.tooltip)!=null?_:P.tooltip)==null?void 0:N.className)}),Qt),Zi=cn(es,O({},(j=K.arrow)!=null?j:P.arrow,{className:ot(Nr.arrow,(E=(g=K.arrow)!=null?g:P.arrow)==null?void 0:E.className)}),Qt);return s.jsxs(M.Fragment,{children:[M.cloneElement(ve,Ae),s.jsx(Jo,O({as:H??gi,placement:q,anchorEl:oe?{getBoundingClientRect:()=>({top:on.y,left:on.x,right:on.x,bottom:on.y,width:0,height:0})}:Ee,popperRef:yr,open:Ee?Ke:!1,id:br,transition:!0},Zt,Wi,{popperOptions:Yi,children:({TransitionProps:ee})=>s.jsx(Zo,O({timeout:Ge.transitions.duration.shorter},ee,Ki,{children:s.jsxs(Qo,O({},Ji,{children:[ue,A?s.jsx(es,O({},Zi,{ref:jt})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(bi.propTypes={arrow:p.bool,children:Aa.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const ff=bi;function Ys(e,t,n){return e?s.jsx(Me.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:s.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Fo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:h=!1,hasDisabledGutters:f=!1,hasDivider:b=!1,focusVisibleClassName:v,id:w,children:m}=e,N=s.jsx(Me.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:f,divider:b,focusVisibleClassName:v,onClick:t,id:w,children:n?s.jsxs(s.Fragment,{children:[Ys(a,n,!0),s.jsx(Me.ListItemText,{primary:n,inset:!a&&o}),h?s.jsx(Me.ListItemIcon,{className:"papi-menu-icon-trailing",children:s.jsx(ei,{})}):Ys(i,n,!1)]}):m});return r?s.jsx(ff,{title:r,placement:"right",children:s.jsx("div",{children:N})}):N}function vi(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function mf(e){const[t,n]=y.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=vi(a).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),s.jsx(yi,{...e,includedGroups:d})};return s.jsxs(s.Fragment,{children:[s.jsx(Fo,{onClick:i,...o,isSubMenuParent:!0}),s.jsx(Me.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const hf=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function yi(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:i}=y.useMemo(()=>{const u=o&&o.length>0?o:vi(t).filter(v=>!("menuItem"in v.group)),h=Object.values(u).sort((v,w)=>(v.group.order||0)-(w.group.order||0)),f=[];h.forEach(v=>{hf(v.id,t.items).forEach(w=>f.push({item:w,isLastItemInGroup:!1})),f.length>0&&(f[f.length-1].isLastItemInGroup=!0)}),f.length>0&&(f[f.length-1].isLastItemInGroup=!1);const b=f.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:f,allowForLeadingIcons:b}},[o,t]),l=({item:u,isLastItemInGroup:h})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:h,allowForLeadingIcons:i}),[c]=a;if(!c)return s.jsx("div",{});const d=c.item.group;return s.jsx("div",{role:"menu","aria-label":d,children:a.map((u,h)=>{const{item:f}=u,b=l(u);if("command"in f){const v=f.group+h;return s.jsx(Fo,{onClick:w=>{n==null||n(w),r(f)},...b},v)}return s.jsx(mf,{parentMenuItem:f,parentItemProps:b,...e},d+f.id)})},d)}function gf(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(i=>"column"in i.group&&i.group.column===n)),s.jsx(yi,{...e,includedGroups:a})}function bf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return s.jsxs(Me.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[s.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),s.jsx(Me.List,{id:n,dense:!0,className:a??"",children:s.jsx(gf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function xi({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=y.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return s.jsx(Me.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((i,l)=>s.jsx(bf,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function vf(e){return{preserveValue:!0,...e}}const Qn=(e,t,n={})=>{const r=y.useRef(t);r.current=t;const o=y.useRef(n);o.current=vf(o.current);const[a,i]=y.useState(()=>r.current),[l,c]=y.useState(!0);return y.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[a,l]},yf=Qa(s.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Ni({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:i,children:l}){const[c,d]=y.useState(!1),[u,h]=y.useState(!1),f=y.useCallback(()=>{c&&d(!1),h(!1)},[c]),b=y.useCallback(E=>{E.stopPropagation(),d(g=>{const R=!g;return R&&E.shiftKey?h(!0):R||h(!1),R})},[]),v=y.useCallback(E=>(f(),r(E)),[r,f]),[w,m]=y.useState({top:1,left:1});y.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const g=E.getBoundingClientRect(),R=window.scrollY,A=window.scrollX,U=g.top+R+E.clientHeight,T=g.left+A;m({top:U,left:T})}}},[c,o]);const[N]=Qn(y.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[_]=Qn(y.useCallback(async()=>(e==null?void 0:e(!0))??n??N,[e,n,N,c]),n??N),j=u&&_?_:N;return s.jsxs(s.Fragment,{children:[s.jsx(Me.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:b,children:l??s.jsx(yf,{})}),s.jsx(Me.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:f,PaperProps:{className:"papi-menu-drawer-paper",style:{top:w.top,left:w.left}},children:j?s.jsx(xi,{className:a,id:`${i??""} main menu`,commandHandler:v,multiColumnMenu:j}):void 0})]})}function xf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:l,onClick:c,children:d}){return s.jsx(Me.IconButton,{id:e,disabled:n,edge:a,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const Yt=y.forwardRef(({className:e,...t},n)=>s.jsx(J.LoaderCircle,{size:35,className:S("tw-animate-spin",e),...t,ref:n}));Yt.displayName="Spinner";function Nf({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:h,onFocus:f,onBlur:b}){return s.jsxs("div",{className:S("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[s.jsx($e,{htmlFor:e,className:S({"tw-text-red-600":n,"tw-hidden":!a}),children:`${a}${l?"*":""}`}),s.jsx(qt,{id:e,disabled:t,placeholder:i,required:l,className:S(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:h,onFocus:f,onBlur:b}),s.jsx("p",{className:S({"tw-hidden":!o}),children:o})]})}function kf({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=y.useRef(void 0);return s.jsx("div",{ref:a,style:{position:"relative"},children:s.jsx(Me.AppBar,{position:"static",id:r,children:s.jsxs(Me.Toolbar,{className:S("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?s.jsx(Ni,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?s.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Ef=Nn.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),ki=y.forwardRef(({className:e,variant:t,...n},r)=>s.jsx("div",{ref:r,role:"alert",className:S(Ef({variant:t}),e),...n}));ki.displayName="Alert";const Ei=y.forwardRef(({className:e,...t},n)=>s.jsxs("h5",{ref:n,className:S("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Ei.displayName="AlertTitle";const Si=y.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));Si.displayName="AlertDescription";const ji=Nn.cva("tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-text-foreground"}},defaultVariants:{variant:"default"}});function Sf({className:e,variant:t,...n}){return s.jsx("div",{className:S("pr-twp",ji({variant:t}),e),...n})}const Ti=y.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Ti.displayName="Card";const Ci=y.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));Ci.displayName="CardHeader";const Oi=y.forwardRef(({className:e,...t},n)=>s.jsx("h3",{ref:n,className:S("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Oi.displayName="CardTitle";const Ri=y.forwardRef(({className:e,...t},n)=>s.jsx("p",{ref:n,className:S("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Ri.displayName="CardDescription";const Pi=y.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-p-6 tw-pt-0",e),...t}));Pi.displayName="CardContent";const _i=y.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));_i.displayName="CardFooter";function jf({...e}){return s.jsx(Ks.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const Ii=y.forwardRef(({className:e,...t},n)=>s.jsxs(an.Root,{ref:n,className:S("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,children:[s.jsx(an.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:s.jsx(an.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),s.jsx(an.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]}));Ii.displayName=an.Root.displayName;const $i=y.forwardRef(({className:e,...t},n)=>s.jsx(Vr.Root,{className:S("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:s.jsx(Vr.Thumb,{className:S("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0")})}));$i.displayName=Vr.Root.displayName;const Tf=Oe.Root,Mi=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.List,{ref:n,className:S("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Mi.displayName=Oe.List.displayName;const Di=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.Trigger,{ref:n,className:S("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));Di.displayName=Oe.Trigger.displayName;const Ai=y.forwardRef(({className:e,...t},n)=>s.jsx(Oe.Content,{ref:n,className:S("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Ai.displayName=Oe.Content.displayName;function Cf({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return s.jsx(fe,{className:S("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?s.jsx(Yt,{size:15}):s.jsxs(s.Fragment,{children:[s.jsx(J.Download,{size:25,className:S("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function Of({isEnabling:e,handleClick:t,className:n,...r}){return s.jsx(fe,{className:S("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Yt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function Rf({isDisabling:e,handleClick:t,className:n,...r}){return s.jsx(fe,{className:S("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Yt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function Pf({isUpdating:e,handleClick:t,className:n,...r}){return s.jsx(fe,{className:S("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(Yt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function _f({id:e,markdown:t,className:n,anchorTarget:r}){const o=y.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return s.jsx("div",{id:e,className:S("pr-twp tw-prose",n),children:s.jsx(wl,{options:o,children:t})})}const Bi=y.forwardRef((e,t)=>s.jsxs(fe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[s.jsx(J.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",s.jsx(J.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var Vi=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Vi||{});function If({id:e,groups:t}){return s.jsx("div",{id:e,children:s.jsxs(tr,{children:[s.jsx(eo,{asChild:!0,children:s.jsx(Bi,{})}),s.jsx(kn,{children:t.map(n=>s.jsxs("div",{children:[s.jsx(Xt,{children:n.label}),s.jsx(aa,{children:n.items.map(r=>s.jsx("div",{children:r.itemType===0?s.jsx(nr,{onClick:r.onClick,children:r.label}):s.jsx(no,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),s.jsx(En,{})]},n.label))})]})})}function $f({id:e,message:t}){return s.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:s.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:s.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function Mf({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const a=new W.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return s.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:s.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),s.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[s.jsx(J.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),s.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:a})]}),s.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>s.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&s.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[s.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",s.jsx(J.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),s.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",s.jsx(J.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function Fi({id:e,versionHistory:t}){const[n,r]=y.useState(!1),o=new Date;function a(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,h=d.getUTCMonth(),f=d.getUTCDate()-1;let b="";return u>0?b=`${u.toString()} year${u===1?"":"s"} ago`:h>0?b=`${h.toString()} month${h===1?"":"s"} ago`:f===0?b="today":b=`${f.toString()} day${f===1?"":"s"} ago`,b}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return s.jsxs("div",{id:e,children:[s.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),s.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>s.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[s.jsx("div",{className:"tw-text-gray-600",children:s.jsx("li",{className:"tw-prose tw-text-xs",children:s.jsx("span",{children:l[1].description})})}),s.jsxs("div",{className:"tw-justify-end tw-text-right",children:[s.jsxs("div",{children:["Version ",l[0]]}),s.jsx("div",{children:a(l[1].date)})]})]},l[0]))}),i.length>5&&s.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Df({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const a=y.useMemo(()=>W.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return s.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:s.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[s.jsx(Fi,{versionHistory:o}),s.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),s.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[s.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),s.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[s.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[s.jsx("span",{className:"tw-mb-2",children:"Publisher"}),s.jsx("span",{className:"tw-font-semibold",children:t}),s.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),s.jsx("span",{className:"tw-font-semibold",children:a})]}),s.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:s.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[s.jsx("span",{className:"tw-mb-2",children:"Languages"}),s.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const Af=(e,t)=>e[t]??t;function Bf({knownUiLanguages:e,primaryLanguage:t="en",fallbackLanguages:n=[],handleLanguageChanges:r,handlePrimaryLanguageChange:o,handleFallbackLanguagesChange:a,localizedStrings:i,className:l}){const c=Af(i,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[d,u]=y.useState(t),[h,f]=y.useState(!1),b=w=>{u(w),o&&o(w),r&&r([w,...n.filter(m=>m!==w)]),a&&n.find(m=>m===w)&&a([...n.filter(m=>m!==w)]),f(!1)},v=(w,m)=>{var _,j,E,g,R,A;const N=m!==w?((j=(_=e[w])==null?void 0:_.uiNames)==null?void 0:j[m])??((g=(E=e[w])==null?void 0:E.uiNames)==null?void 0:g.en):void 0;return N?`${(R=e[w])==null?void 0:R.autonym} (${N})`:(A=e[w])==null?void 0:A.autonym};return s.jsxs("div",{className:S("pr-twp tw-max-w-sm tw-p-4",l),children:[s.jsxs(yt,{name:"uiLanguage",value:d,onValueChange:b,open:h,onOpenChange:w=>f(w),children:[s.jsx(at,{children:s.jsx(xt,{})}),s.jsx(it,{style:{zIndex:250},children:Object.keys(e).map(w=>s.jsx(_e,{value:w,children:v(w,t)},w))})]}),d!=="en"&&s.jsxs(s.Fragment,{children:[s.jsx($e,{className:"tw-ml-3",children:c}),s.jsx("div",{children:s.jsxs($e,{children:["Currently:"," ",(n==null?void 0:n.length)>0?`${n.map(w=>v(w,t)).join(", ")}`:`${e.en.autonym}`]})})]})]})}const Vf=(e,t)=>{y.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Dr=()=>!1,Ff=(e,t)=>{const[n]=Qn(y.useCallback(async()=>{if(!e)return Dr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Dr,{preserveValue:!1});y.useEffect(()=>()=>{n!==Dr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Ks.toast});exports.Alert=ki;exports.AlertDescription=Si;exports.AlertTitle=Ei;exports.BOOK_SELECTOR_STRING_KEYS=Kl;exports.Badge=Sf;exports.BookChapterControl=zl;exports.BookSelectionMode=ha;exports.BookSelector=Jl;exports.Button=fe;exports.Card=Ti;exports.CardContent=Pi;exports.CardDescription=Ri;exports.CardFooter=_i;exports.CardHeader=Ci;exports.CardTitle=Oi;exports.ChapterRangeSelector=ma;exports.Checkbox=rr;exports.Checklist=Ec;exports.ComboBox=Fr;exports.DataTable=Na;exports.DisableButton=Rf;exports.DropdownMenu=tr;exports.DropdownMenuCheckboxItem=nr;exports.DropdownMenuContent=kn;exports.DropdownMenuGroup=aa;exports.DropdownMenuItem=to;exports.DropdownMenuItemType=Vi;exports.DropdownMenuLabel=Xt;exports.DropdownMenuPortal=Ol;exports.DropdownMenuRadioGroup=Pl;exports.DropdownMenuRadioItem=no;exports.DropdownMenuSeparator=En;exports.DropdownMenuShortcut=ca;exports.DropdownMenuSub=Rl;exports.DropdownMenuSubContent=la;exports.DropdownMenuSubTrigger=ia;exports.DropdownMenuTrigger=eo;exports.EnableButton=Of;exports.FilterButton=Bi;exports.FilterDropdown=If;exports.Footer=Df;exports.GridMenu=xi;exports.HamburgerMenuButton=Ni;exports.INVENTORY_STRING_KEYS=ac;exports.IconButton=xf;exports.Input=qt;exports.InstallButton=Cf;exports.Inventory=cc;exports.Label=$e;exports.MarkdownRenderer=_f;exports.MenuItem=Fo;exports.MoreInfo=Mf;exports.MultiSelectComboBox=dc;exports.NavigationContentSearch=uc;exports.NoExtensionsFound=$f;exports.RadioGroup=ro;exports.RadioGroupItem=Hn;exports.ScriptureResultsViewer=vc;exports.ScrollGroupSelector=yc;exports.SearchBar=Ca;exports.Select=yt;exports.SelectContent=it;exports.SelectGroup=ga;exports.SelectItem=_e;exports.SelectLabel=ba;exports.SelectScrollDownButton=po;exports.SelectScrollUpButton=uo;exports.SelectSeparator=va;exports.SelectTrigger=at;exports.SelectValue=xt;exports.Separator=go;exports.SettingsList=xc;exports.SettingsListHeader=kc;exports.SettingsListItem=Nc;exports.Slider=Ii;exports.Sonner=jf;exports.Spinner=Yt;exports.Switch=$i;exports.Table=Sn;exports.TableBody=Tn;exports.TableCaption=xa;exports.TableCell=Nt;exports.TableFooter=ya;exports.TableHead=Bt;exports.TableHeader=jn;exports.TableRow=Ze;exports.Tabs=Tf;exports.TabsContent=Ai;exports.TabsList=Mi;exports.TabsTrigger=Di;exports.TextField=Nf;exports.ToggleGroup=wo;exports.ToggleGroupItem=pn;exports.Toolbar=kf;exports.UiLanguageSelector=Bf;exports.UpdateButton=Pf;exports.VersionHistory=Fi;exports.VerticalTabs=fo;exports.VerticalTabsContent=ho;exports.VerticalTabsList=mo;exports.VerticalTabsTrigger=Oa;exports.badgeVariants=ji;exports.buttonVariants=da;exports.cn=S;exports.getBookNumFromId=Ea;exports.getLinesFromUSFM=ka;exports.getNumberFromUSFM=Lr;exports.getStatusForItem=Sa;exports.inventoryCountColumn=oc;exports.inventoryItemColumn=nc;exports.inventoryStatusColumn=sc;exports.useEvent=Vf;exports.useEventAsync=Ff;exports.usePromise=Qn;function Lf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Lf(`*, ::before, ::after {
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
[hidden]:where(.pr-twp,.pr-twp *) {
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
.tw-left-1\\/2 {
  left: 50%;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-2\\.5 {
  left: 0.625rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-48 {
  top: 12rem;
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
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.tw-mb-6 {
  margin-bottom: 1.5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-3 {
  margin-left: 0.75rem;
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
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
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
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-9 {
  width: 2.25rem;
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
.tw-w-\\[30px\\] {
  width: 30px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
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
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-64 {
  max-width: 16rem;
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
.tw-caption-bottom {
  caption-side: bottom;
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
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
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
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
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-r-0 {
  border-right-width: 0px;
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
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
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
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.tw-bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.tw-bg-slate-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(203 213 225 / var(--tw-bg-opacity));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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
.tw-pe-3 {
  padding-inline-end: 0.75rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
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
.tw-pr-8 {
  padding-right: 2rem;
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
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
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
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted {
  color: hsl(var(--muted));
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
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
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
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.tw-fade-in {
  --tw-enter-opacity: 0;
}
.tw-slide-in-from-bottom-4 {
  --tw-enter-translate-y: 1rem;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
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

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-primary:hover {
  color: hsl(var(--primary));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
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
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
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

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
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

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
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

  .sm\\:tw-text-left {
    text-align: left;
  }
}

@media (min-width: 768px) {

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

  .md\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
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

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
}
`,"top");
//# sourceMappingURL=index.cjs.map
