"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("react/jsx-runtime"),g=require("react"),H=require("lucide-react"),at=require("clsx"),el=require("tailwind-merge"),ta=require("@radix-ui/react-dropdown-menu"),Q=require("platform-bible-utils"),tl=require("@radix-ui/react-slot"),Rn=require("class-variance-authority"),nl=require("@radix-ui/react-label"),rl=require("@radix-ui/react-radio-group"),ol=require("@radix-ui/react-popover"),Re=require("cmdk"),sl=require("@radix-ui/react-dialog"),Ne=require("@tanstack/react-table"),al=require("@radix-ui/react-select"),il=require("@radix-ui/react-checkbox"),ll=require("@radix-ui/react-toggle-group"),cl=require("@radix-ui/react-toggle"),dl=require("@radix-ui/react-tabs"),ul=require("@radix-ui/react-separator"),Lr=require("@mui/styled-engine"),De=require("@mui/material"),pn=require("react-dom"),na=require("sonner"),pl=require("@radix-ui/react-slider"),wl=require("@radix-ui/react-switch"),fl=require("markdown-to-jsx");function ke(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const A=ke(g),fe=ke(ta),ra=ke(nl),Nn=ke(rl),kn=ke(ol),Ke=ke(sl),be=ke(al),Fr=ke(il),sr=ke(ll),oa=ke(cl),_e=ke(dl),sa=ke(ul),ml=ke(pn),wn=ke(pl),zr=ke(wl);const hl=el.extendTailwindMerge({prefix:"tw-"});function S(...e){return hl(at.clsx(e))}const Tt=g.forwardRef(({className:e,type:t,...n},r)=>s.jsx("input",{type:t,className:S("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:r,...n}));Tt.displayName="Input";const gl=g.forwardRef(({handleSearch:e,handleKeyDown:t,handleOnClick:n,handleSubmit:r,...o},a)=>s.jsxs("div",{className:"tw-relative",children:[s.jsx(Tt,{...o,type:"text",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",onChange:i=>e(i.target.value),onKeyDown:i=>{i.key==="Enter"&&r(),t(i)},onClick:n,ref:a}),s.jsx(H.History,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",onClick:()=>{console.log("back in history")}})]}));var bl=Object.defineProperty,vl=(e,t,n)=>t in e?bl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,re=(e,t,n)=>vl(e,typeof t!="symbol"?t+"":t,n);const xt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Qr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],aa=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],as=Ol();function Wt(e,t=!0){return t&&(e=e.toUpperCase()),e in as?as[e]:0}function eo(e){return Wt(e)>0}function xl(e){const t=typeof e=="string"?Wt(e):e;return t>=40&&t<=66}function yl(e){return(typeof e=="string"?Wt(e):e)<=39}function ia(e){return e<=66}function Nl(e){const t=typeof e=="string"?Wt(e):e;return da(t)&&!ia(t)}function*kl(){for(let e=1;e<=xt.length;e++)yield e}const El=1,la=xt.length;function jl(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function to(e,t="***"){const n=e-1;return n<0||n>=xt.length?t:xt[n]}function ca(e){return e<=0||e>la?"******":aa[e-1]}function Sl(e){return ca(Wt(e))}function da(e){const t=typeof e=="number"?to(e):e;return eo(t)&&!Qr.includes(t)}function Tl(e){const t=typeof e=="number"?to(e):e;return eo(t)&&Qr.includes(t)}function Cl(e){return aa[e-1].includes("*obsolete*")}function Ol(){const e={};for(let t=0;t<xt.length;t++)e[xt[t]]=t+1;return e}const ie={allBookIds:xt,nonCanonicalIds:Qr,bookIdToNumber:Wt,isBookIdValid:eo,isBookNT:xl,isBookOT:yl,isBookOTNT:ia,isBookDC:Nl,allBookNumbers:kl,firstBook:El,lastBook:la,extraBooks:jl,bookNumberToId:to,bookNumberToEnglishName:ca,bookIdToEnglishName:Sl,isCanonical:da,isExtraMaterial:Tl,isObsolete:Cl};var Ye=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ye||{});const Ie=class{constructor(t){if(re(this,"name"),re(this,"fullPath"),re(this,"isPresent"),re(this,"hasVerseSegments"),re(this,"isCustomized"),re(this,"baseVersification"),re(this,"scriptureBooks"),re(this,"_type"),t==null)throw new Error("Argument undefined");typeof t=="string"?(this.name=t,this._type=Ye[t]):(this._type=t,this.name=Ye[t])}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};re(Ie,"Original",new Ie(Ye.Original)),re(Ie,"Septuagint",new Ie(Ye.Septuagint)),re(Ie,"Vulgate",new Ie(Ye.Vulgate)),re(Ie,"English",new Ie(Ye.English)),re(Ie,"RussianProtestant",new Ie(Ye.RussianProtestant)),re(Ie,"RussianOrthodox",new Ie(Ye.RussianOrthodox));let ft=Ie;function is(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var ua=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ua||{});const je=class ae{constructor(t,n,r,o){if(re(this,"firstChapter"),re(this,"lastChapter"),re(this,"lastVerse"),re(this,"hasSegmentsDefined"),re(this,"text"),re(this,"BBBCCCVVVS"),re(this,"longHashCode"),re(this,"versification"),re(this,"rtlMark","‏"),re(this,"_bookNum",0),re(this,"_chapterNum",0),re(this,"_verseNum",0),re(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const a=t,i=n!=null&&n instanceof ft?n:void 0;this.setEmpty(i),this.parse(a)}else if(t!=null&&typeof t=="number"){const a=n!=null&&n instanceof ft?n:void 0;this.setEmpty(a),this._verseNum=t%ae.chapterDigitShifter,this._chapterNum=Math.floor(t%ae.bookDigitShifter/ae.chapterDigitShifter),this._bookNum=Math.floor(t/ae.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ae){const a=t;this._bookNum=a.bookNum,this._chapterNum=a.chapterNum,this._verseNum=a.verseNum,this._verse=a.verse,this.versification=a.versification}else{if(t==null)return;const a=t instanceof ft?t:ae.defaultVersification;this.setEmpty(a)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ae.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=new ae(t),{success:!0,verseRef:n}}catch(r){if(r instanceof an)return n=new ae,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ae.bcvMaxValue*ae.bookDigitShifter+(n>=0?n%ae.bcvMaxValue*ae.chapterDigitShifter:0)+(r>=0?r%ae.bcvMaxValue:0)}static fromJSON(t){const{book:n,chapterNum:r,verseNum:o,verse:a,versificationStr:i}=t,l=a||o.toString();let c;return i&&(c=new ft(i)),n?new ae(n,r.toString(),l,c):new ae}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>ae.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ae.verseRangeSeparator)||this._verse.includes(ae.verseSequenceIndicator))}get book(){return ie.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=ie.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ae.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ae.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>ie.lastBook)throw new an("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new ft(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ae.verseRangeSeparators,ae.verseSequenceIndicators)}get BBBCCC(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ae.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const a=t.split("/");if(t=a[0],a.length>1)try{const i=+a[1].trim();this.versification=new ft(Ye[i])}catch{throw new an("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new an("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||ie.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ae.isVerseParseable(r[1]))throw new an("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ae(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}toJSON(){let t=this.verse;(t===""||t===this.verseNum.toString())&&(t=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:t,versificationStr:this.versificationStr};return t||delete n.verse,n}equals(t){return t instanceof ae?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&(t.versification==null&&this.versification==null||t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification)):!1}allVerses(t=!1,n=ae.verseRangeSeparators,r=ae.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],a=is(this._verse,r);for(const i of a.map(l=>is(l,n))){const l=this.clone();l.verse=i[0];const c=l.verseNum;if(o.push(l),i.length>1){const d=this.clone();if(d.verse=i[1],!t)for(let u=c+1;u<d.verseNum;u++){const h=new ae(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||o.push(h)}o.push(d)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const a=o.internalValid;if(a!==0)return a;const i=o.BBBCCCVVV;if(r>i)return 3;if(r===i)return 4;r=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>ie.lastBook?2:(ie.isCanonical(this._bookNum),0)}setEmpty(t=ae.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=ie.bookIdToNumber(t),this.chapter=n,this.verse=r}};re(je,"defaultVersification",ft.English),re(je,"verseRangeSeparator","-"),re(je,"verseSequenceIndicator",","),re(je,"verseRangeSeparators",[je.verseRangeSeparator]),re(je,"verseSequenceIndicators",[je.verseSequenceIndicator]),re(je,"chapterDigitShifter",1e3),re(je,"bookDigitShifter",je.chapterDigitShifter*je.chapterDigitShifter),re(je,"bcvMaxValue",je.chapterDigitShifter-1),re(je,"ValidStatusType",ua);class an extends Error{}const Lt=fe.Root,En=fe.Trigger,pa=fe.Group,Rl=fe.Portal,_l=fe.Sub,Pl=fe.RadioGroup,wa=g.forwardRef(({className:e,inset:t,children:n,...r},o)=>s.jsxs(fe.SubTrigger,{ref:o,className:S("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",t&&"tw-pl-8",e),...r,children:[n,s.jsx(H.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));wa.displayName=fe.SubTrigger.displayName;const fa=g.forwardRef(({className:e,...t},n)=>s.jsx(fe.SubContent,{ref:n,className:S("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...t}));fa.displayName=fe.SubContent.displayName;const yt=g.forwardRef(({className:e,sideOffset:t=4,...n},r)=>s.jsx(fe.Portal,{children:s.jsx(fe.Content,{ref:r,sideOffset:t,className:S("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n})}));yt.displayName=fe.Content.displayName;const jn=g.forwardRef(({className:e,inset:t,...n},r)=>s.jsx(fe.Item,{ref:r,className:S("tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t&&"tw-pl-8",e),...n}));jn.displayName=fe.Item.displayName;const _n=g.forwardRef(({className:e,children:t,checked:n,...r},o)=>s.jsxs(fe.CheckboxItem,{ref:o,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),checked:n,...r,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(H.Check,{className:"tw-h-4 tw-w-4"})})}),t]}));_n.displayName=fe.CheckboxItem.displayName;const no=g.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(fe.RadioItem,{ref:r,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(fe.ItemIndicator,{children:s.jsx(H.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),t]}));no.displayName=fe.RadioItem.displayName;const Kt=g.forwardRef(({className:e,inset:t,...n},r)=>s.jsx(fe.Label,{ref:r,className:S("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t&&"tw-pl-8",e),...n}));Kt.displayName=fe.Label.displayName;const Jt=g.forwardRef(({className:e,...t},n)=>s.jsx(fe.Separator,{ref:n,className:S("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));Jt.displayName=fe.Separator.displayName;function ma({className:e,...t}){return s.jsx("span",{className:S("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...t})}ma.displayName="DropdownMenuShortcut";const Il=g.forwardRef(({bookId:e,handleSelectBook:t,isSelected:n,handleHighlightBook:r,handleKeyDown:o,bookType:a,children:i},l)=>s.jsxs(jn,{ref:l,textValue:e,className:S("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":n}),onSelect:c=>{c.preventDefault(),t()},onKeyDown:c=>{o(c)},onFocus:r,onMouseMove:r,children:[s.jsx("span",{className:S("tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":n,"tw-border-l-red-200":a.toLowerCase()==="ot","tw-border-l-purple-200":a.toLowerCase()==="nt","tw-border-l-indigo-200":a.toLowerCase()==="dc"}),children:ie.bookIdToEnglishName(e)}),n&&s.jsx("div",{children:i})]},e));function $l({handleSelectChapter:e,endChapter:t,activeChapter:n,highlightedChapter:r,handleHighlightedChapter:o}){const a=Array.from({length:t},(l,c)=>c+1),i=g.useCallback(l=>{o(l)},[o]);return s.jsx("div",{className:S("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:a.map(l=>s.jsx("div",{className:S("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":l===n,"tw-bg-amber-200":l===r}),onClick:c=>{c.preventDefault(),c.stopPropagation(),e(l)},role:"button",onKeyDown:c=>{c.key==="Enter"&&e(l)},tabIndex:0,onMouseMove:()=>i(l),children:l},l))})}function Ml({handleSort:e,handleLocationHistory:t,handleBookmarks:n}){return s.jsxs(Kt,{className:"tw-flex tw-justify-between",children:[s.jsx("p",{className:"tw-inline-block tw-align-middle",children:"Go To"}),s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(H.ArrowDownWideNarrow,{onClick:e,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),s.jsx(H.Clock,{onClick:t,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"}),s.jsx(H.Bookmark,{onClick:n,className:"tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"})]})]})}const gn=ie.allBookIds,Dl={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},ls=["OT","NT","DC"],Al=32+32+32,Bl=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Vl=e=>({OT:gn.filter(n=>ie.isBookOT(n)),NT:gn.filter(n=>ie.isBookNT(n)),DC:gn.filter(n=>ie.isBookDC(n))})[e],ln=e=>Q.getChaptersForBook(ie.bookIdToNumber(e));function Ll(){return gn.map(t=>ie.bookIdToEnglishName(t))}function Fl(e){return Ll().includes(e)}function zl(e){const t=e.toLowerCase().replace(/^\w/,n=>n.toUpperCase());if(Fl(t))return gn.find(r=>ie.bookIdToEnglishName(r)===t)}function Gl({scrRef:e,handleSubmit:t}){const[n,r]=g.useState(""),[o,a]=g.useState(ie.bookNumberToId(e.bookNum)),[i,l]=g.useState(e.chapterNum??0),[c,d]=g.useState(ie.bookNumberToId(e.bookNum)),[u,h]=g.useState(!1),[w,v]=g.useState(u),x=g.useRef(void 0),f=g.useRef(void 0),m=g.useRef(void 0),N=g.useCallback(k=>Vl(k).filter(D=>{const M=ie.bookIdToEnglishName(D).toLowerCase(),ee=n.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(ee)||D.toLowerCase().includes(ee)}),[n]),$=k=>{r(k)},R=g.useRef(!1),E=g.useCallback(k=>{if(R.current){R.current=!1;return}h(k)},[]),b=g.useCallback((k,D,M,ee)=>{if(l(ie.bookNumberToId(e.bookNum)!==k?1:e.chapterNum),D||ln(k)===-1){t({bookNum:ie.bookIdToNumber(k),chapterNum:M||1,verseNum:ee||1}),h(!1),r("");return}a(o!==k?k:""),h(!D)},[t,e.bookNum,e.chapterNum,o]),I=k=>{k<=0||k>ln(o)||b(o,!0,k)},z=g.useCallback(()=>{Bl.forEach(k=>{const D=n.match(k);if(D){const[M,ee=void 0,J=void 0]=D.slice(1),q=zl(M);(ie.isBookIdValid(M)||q)&&b(q??M,!0,ee?parseInt(ee,10):1,J?parseInt(J,10):1)}})},[b,n]),Y=g.useCallback(k=>{u?(k.key==="ArrowDown"||k.key==="ArrowUp")&&(typeof m<"u"&&m.current!==null?m.current.focus():typeof f<"u"&&f.current!==null&&f.current.focus(),k.preventDefault()):h(!0)},[u]),C=k=>{const{key:D}=k;D==="ArrowRight"||D==="ArrowLeft"||D==="ArrowDown"||D==="ArrowUp"||D==="Enter"||(x.current.dispatchEvent(new KeyboardEvent("keydown",{key:D})),x.current.focus())},_=k=>{const{key:D}=k;if(c===o){if(D==="Enter"){k.preventDefault(),b(o,!0,i);return}let M=0;if(D==="ArrowRight")if(i<ln(c))M=1;else{k.preventDefault();return}else if(D==="ArrowLeft")if(i>1)M=-1;else{k.preventDefault();return}else D==="ArrowDown"?M=6:D==="ArrowUp"&&(M=-6);i+M<=0||i+M>ln(c)?l(0):M!==0&&(l(i+M),k.preventDefault())}};return g.useEffect(()=>{o===c?o===ie.bookNumberToId(e.bookNum)?l(e.chapterNum):l(1):l(0)},[c,e.bookNum,e.chapterNum,o]),g.useLayoutEffect(()=>{v(u)},[u]),g.useLayoutEffect(()=>{const k=setTimeout(()=>{if(w&&f.current&&m.current){const M=m.current.offsetTop-Al;f.current.scrollTo({top:M,behavior:"instant"})}},10);return()=>{clearTimeout(k)}},[w]),s.jsx("div",{className:"pr-twp tw-flex",children:s.jsxs(Lt,{modal:!1,open:u,onOpenChange:E,children:[s.jsx(En,{asChild:!0,children:s.jsx(gl,{ref:x,value:n,handleSearch:$,handleKeyDown:Y,handleOnClick:()=>{a(ie.bookNumberToId(e.bookNum)),d(ie.bookNumberToId(e.bookNum)),l(e.chapterNum>0?e.chapterNum:0),h(!0),x.current.focus()},onFocus:()=>{R.current=!0},handleSubmit:z,placeholder:`${ie.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`})}),s.jsxs(yt,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},onKeyDown:C,align:"start",ref:f,children:[s.jsx(Ml,{handleSort:()=>console.log("sorting"),handleLocationHistory:()=>console.log("location history"),handleBookmarks:()=>console.log("bookmarks")}),ls.map((k,D)=>N(k).length>0&&s.jsxs("div",{children:[s.jsx(Kt,{className:"tw-font-semibold tw-text-foreground/80",children:Dl[k]}),N(k).map(M=>s.jsx("div",{children:s.jsx(Il,{bookId:M,handleSelectBook:()=>b(M,!1),isSelected:o===M,handleHighlightBook:()=>d(M),handleKeyDown:_,bookType:k,ref:ee=>{o===M&&(m.current=ee)},children:s.jsx($l,{handleSelectChapter:I,endChapter:ln(M),activeChapter:e.bookNum===ie.bookIdToNumber(M)?e.chapterNum:0,highlightedChapter:i,handleHighlightedChapter:ee=>{l(ee)}})})},M)),ls.length-1!==D?s.jsx(Jt,{}):void 0]},k))]})]})})}const ha=Rn.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),pe=g.forwardRef(({className:e,variant:t,size:n,asChild:r=!1,...o},a)=>{const i=r?tl.Slot:"button";return s.jsx(i,{className:S(ha({variant:t,size:n,className:e})),ref:a,...o})});pe.displayName="Button";const Ul=Rn.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),Te=g.forwardRef(({className:e,...t},n)=>s.jsx(ra.Root,{ref:n,className:S("pr-twp",Ul(),e),...t}));Te.displayName=ra.Root.displayName;const ro=g.forwardRef(({className:e,...t},n)=>s.jsx(Nn.Root,{className:S("pr-twp tw-grid tw-gap-2",e),...t,ref:n}));ro.displayName=Nn.Root.displayName;const Kn=g.forwardRef(({className:e,...t},n)=>s.jsx(Nn.Item,{ref:n,className:S("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t,children:s.jsx(Nn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:s.jsx(H.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Kn.displayName=Nn.Item.displayName;const ga=kn.Root,ba=kn.Trigger,oo=g.forwardRef(({className:e,align:t="center",sideOffset:n=4,...r},o)=>s.jsx(kn.Portal,{children:s.jsx(kn.Content,{ref:o,align:t,sideOffset:n,className:S("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r})}));oo.displayName=kn.Content.displayName;const ql=Ke.Portal,va=g.forwardRef(({className:e,...t},n)=>s.jsx(Ke.Overlay,{ref:n,className:S("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...t}));va.displayName=Ke.Overlay.displayName;const Hl=g.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(ql,{children:[s.jsx(va,{}),s.jsxs(Ke.Content,{ref:r,className:S("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...n,children:[t,s.jsxs(Ke.Close,{className:"tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",children:[s.jsx(H.X,{className:"tw-h-4 tw-w-4"}),s.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]}));Hl.displayName=Ke.Content.displayName;const Xl=g.forwardRef(({className:e,...t},n)=>s.jsx(Ke.Title,{ref:n,className:S("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...t}));Xl.displayName=Ke.Title.displayName;const Yl=g.forwardRef(({className:e,...t},n)=>s.jsx(Ke.Description,{ref:n,className:S("tw-text-sm tw-text-muted-foreground",e),...t}));Yl.displayName=Ke.Description.displayName;const so=g.forwardRef(({className:e,...t},n)=>s.jsx(Re.Command,{ref:n,className:S("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...t}));so.displayName=Re.Command.displayName;const ao=g.forwardRef(({className:e,...t},n)=>s.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",children:[s.jsx(H.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),s.jsx(Re.Command.Input,{ref:n,className:S("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...t})]}));ao.displayName=Re.Command.Input.displayName;const io=g.forwardRef(({className:e,...t},n)=>s.jsx(Re.Command.List,{ref:n,className:S("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...t}));io.displayName=Re.Command.List.displayName;const lo=g.forwardRef((e,t)=>s.jsx(Re.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e}));lo.displayName=Re.Command.Empty.displayName;const xa=g.forwardRef(({className:e,...t},n)=>s.jsx(Re.Command.Group,{ref:n,className:S("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...t}));xa.displayName=Re.Command.Group.displayName;const Wl=g.forwardRef(({className:e,...t},n)=>s.jsx(Re.Command.Separator,{ref:n,className:S("tw--mx-1 tw-h-px tw-bg-border",e),...t}));Wl.displayName=Re.Command.Separator.displayName;const co=g.forwardRef(({className:e,...t},n)=>s.jsx(Re.Command.Item,{ref:n,className:S("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...t}));co.displayName=Re.Command.Item.displayName;function Kl(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Jn({id:e,options:t=[],className:n,value:r,onChange:o=()=>{},getOptionLabel:a=Kl,icon:i=void 0,buttonPlaceholder:l="",textPlaceholder:c="",commandEmptyMessage:d="No option found",buttonVariant:u="outline",alignDropDown:h="start",dir:w="ltr",isDisabled:v=!1,...x}){const[f,m]=g.useState(!1);return s.jsxs(ga,{open:f,onOpenChange:m,...x,children:[s.jsx(ba,{asChild:!0,children:s.jsxs(pe,{variant:u,role:"combobox","aria-expanded":f,id:e,className:S("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",n),disabled:v,children:[s.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[i&&s.jsx("div",{className:"tw-pr-2",children:i}),s.jsx("span",{className:"tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:r?a(r):l})]}),s.jsx(H.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),s.jsx(oo,{align:h,className:"tw-w-[200px] tw-p-0",dir:w,children:s.jsxs(so,{children:[s.jsx(ao,{dir:w,placeholder:c,className:"tw-text-inherit"}),s.jsx(lo,{children:d}),s.jsx(io,{children:t.map(N=>s.jsxs(co,{value:a(N),onSelect:()=>{o(N),m(!1)},children:[s.jsx(H.Check,{className:S("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!r||a(r)!==a(N)})}),a(N)]},a(N)))})]})})]})}function ya({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:a}){const i=g.useMemo(()=>Array.from({length:a},(d,u)=>u+1),[a]),l=d=>{n(d),d>t&&r(d)},c=d=>{r(d),d<e&&n(d)};return s.jsxs(s.Fragment,{children:[s.jsx(Te,{htmlFor:"start-chapters-combobox",children:"Chapters"}),s.jsx(Jn,{isDisabled:o,onChange:l,className:"tw-ml-2 tw-mr-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"start chapter"),s.jsx(Te,{htmlFor:"end-chapters-combobox",children:"to"}),s.jsx(Jn,{isDisabled:o,onChange:c,className:"tw-ml-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"end chapter")]})}var Na=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(Na||{});const Jl=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Sr=(e,t)=>e[t]??t;function Zl({handleBookSelectionModeChange:e,currentBookName:t,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:a,handleSelectEndChapter:i,startChapter:l,handleSelectStartChapter:c,localizedStrings:d}){const u=Sr(d,"%webView_bookSelector_currentBook%"),h=Sr(d,"%webView_bookSelector_choose%"),w=Sr(d,"%webView_bookSelector_chooseBooks%"),[v,x]=g.useState("current book"),f=m=>{x(m),e(m)};return s.jsx(ro,{className:"pr-twp tw-flex",value:v,onValueChange:m=>f(m),children:s.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[s.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(Kn,{value:"current book"}),s.jsx(Te,{className:"tw-ml-1",children:u})]}),s.jsx(Te,{className:"tw-flex tw-items-center",children:t}),s.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:s.jsx(ya,{isDisabled:v==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:i,chapterCount:o,startChapter:l,endChapter:a})})]}),s.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(Kn,{value:"choose books"}),s.jsx(Te,{className:"tw-ml-1",children:w})]}),s.jsx(Te,{className:"tw-flex tw-items-center",children:r.map(m=>ie.bookIdToEnglishName(m)).join(", ")}),s.jsx(pe,{disabled:v==="current book",onClick:()=>n(),children:h})]})]})})}function Ql({table:e}){return s.jsxs(Lt,{children:[s.jsx(ta.DropdownMenuTrigger,{asChild:!0,children:s.jsxs(pe,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[s.jsx(H.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),s.jsxs(yt,{align:"end",className:"tw-w-[150px]",children:[s.jsx(Kt,{children:"Toggle columns"}),s.jsx(Jt,{}),e.getAllColumns().filter(t=>t.getCanHide()).map(t=>s.jsx(_n,{className:"tw-capitalize",checked:t.getIsVisible(),onCheckedChange:n=>t.toggleVisibility(!!n),children:t.id},t.id))]})]})}const Ft=be.Root,ka=be.Group,zt=be.Value,Nt=g.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(be.Trigger,{ref:r,className:S("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",e),...n,children:[t,s.jsx(be.Icon,{asChild:!0,children:s.jsx(H.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]}));Nt.displayName=be.Trigger.displayName;const uo=g.forwardRef(({className:e,...t},n)=>s.jsx(be.ScrollUpButton,{ref:n,className:S("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:s.jsx(H.ChevronUp,{className:"tw-h-4 tw-w-4"})}));uo.displayName=be.ScrollUpButton.displayName;const po=g.forwardRef(({className:e,...t},n)=>s.jsx(be.ScrollDownButton,{ref:n,className:S("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...t,children:s.jsx(H.ChevronDown,{className:"tw-h-4 tw-w-4"})}));po.displayName=be.ScrollDownButton.displayName;const kt=g.forwardRef(({className:e,children:t,position:n="popper",...r},o)=>s.jsx(be.Portal,{children:s.jsxs(be.Content,{ref:o,className:S("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:n,...r,children:[s.jsx(uo,{}),s.jsx(be.Viewport,{className:S("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t}),s.jsx(po,{})]})}));kt.displayName=be.Content.displayName;const Ea=g.forwardRef(({className:e,...t},n)=>s.jsx(be.Label,{ref:n,className:S("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...t}));Ea.displayName=be.Label.displayName;const Ve=g.forwardRef(({className:e,children:t,...n},r)=>s.jsxs(be.Item,{ref:r,className:S("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...n,children:[s.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:s.jsx(be.ItemIndicator,{children:s.jsx(H.Check,{className:"tw-h-4 tw-w-4"})})}),s.jsx(be.ItemText,{children:t})]}));Ve.displayName=be.Item.displayName;const ja=g.forwardRef(({className:e,...t},n)=>s.jsx(be.Separator,{ref:n,className:S("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...t}));ja.displayName=be.Separator.displayName;function ec({table:e}){return s.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[s.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[s.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),s.jsxs(Ft,{value:`${e.getState().pagination.pageSize}`,onValueChange:t=>{e.setPageSize(Number(t))},children:[s.jsx(Nt,{className:"tw-h-8 tw-w-[70px]",children:s.jsx(zt,{placeholder:e.getState().pagination.pageSize})}),s.jsx(kt,{side:"top",children:[10,20,30,40,50].map(t=>s.jsx(Ve,{value:`${t}`,children:t},t))})]})]}),s.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]}),s.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[s.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),s.jsx(H.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),s.jsx(H.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(pe,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),s.jsx(H.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),s.jsxs(pe,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[s.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),s.jsx(H.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Zt=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>s.jsx("div",{className:S("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!t}),children:s.jsx("table",{ref:r,className:S("tw-w-full tw-caption-bottom tw-text-sm",e),...n})}));Zt.displayName="Table";const Qt=g.forwardRef(({className:e,stickyHeader:t,...n},r)=>s.jsx("thead",{ref:r,className:S({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":t},"[&_tr]:tw-border-b",e),...n}));Qt.displayName="TableHeader";const en=g.forwardRef(({className:e,...t},n)=>s.jsx("tbody",{ref:n,className:S("[&_tr:last-child]:tw-border-0",e),...t}));en.displayName="TableBody";const Sa=g.forwardRef(({className:e,...t},n)=>s.jsx("tfoot",{ref:n,className:S("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...t}));Sa.displayName="TableFooter";const Xe=g.forwardRef(({className:e,...t},n)=>s.jsx("tr",{ref:n,className:S("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...t}));Xe.displayName="TableRow";const $e=g.forwardRef(({className:e,...t},n)=>s.jsx("th",{ref:n,className:S("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...t}));$e.displayName="TableHead";const Se=g.forwardRef(({className:e,...t},n)=>s.jsx("td",{ref:n,className:S("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...t}));Se.displayName="TableCell";const Ta=g.forwardRef(({className:e,...t},n)=>s.jsx("caption",{ref:n,className:S("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...t}));Ta.displayName="TableCaption";function Ca({columns:e,data:t,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{}}){var m;const[l,c]=g.useState([]),[d,u]=g.useState([]),[h,w]=g.useState({}),[v,x]=g.useState({}),f=Ne.useReactTable({data:t,columns:e,getCoreRowModel:Ne.getCoreRowModel(),...n&&{getPaginationRowModel:Ne.getPaginationRowModel()},onSortingChange:c,getSortedRowModel:Ne.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:Ne.getFilteredRowModel(),onColumnVisibilityChange:w,onRowSelectionChange:x,state:{sorting:l,columnFilters:d,columnVisibility:h,rowSelection:v}});return s.jsxs("div",{className:"pr-twp",children:[o&&s.jsx(Ql,{table:f}),s.jsxs(Zt,{stickyHeader:a,children:[s.jsx(Qt,{stickyHeader:a,children:f.getHeaderGroups().map(N=>s.jsx(Xe,{children:N.headers.map($=>s.jsx($e,{children:$.isPlaceholder?void 0:Ne.flexRender($.column.columnDef.header,$.getContext())},$.id))},N.id))}),s.jsx(en,{children:(m=f.getRowModel().rows)!=null&&m.length?f.getRowModel().rows.map(N=>s.jsx(Xe,{onClick:()=>i(N,f),"data-state":N.getIsSelected()&&"selected",children:N.getVisibleCells().map($=>s.jsx(Se,{children:Ne.flexRender($.column.columnDef.cell,$.getContext())},$.id))},N.id)):s.jsx(Xe,{children:s.jsx(Se,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."})})})]}),n&&s.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[s.jsx(pe,{variant:"outline",size:"sm",onClick:()=>f.previousPage(),disabled:!f.getCanPreviousPage(),children:"Previous"}),s.jsx(pe,{variant:"outline",size:"sm",onClick:()=>f.nextPage(),disabled:!f.getCanNextPage(),children:"Next"})]}),n&&r&&s.jsx(ec,{table:f})]})}function tc({occurrenceData:e,setScriptureReference:t,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],a=g.useMemo(()=>{const i=[];return e.forEach(l=>{i.some(c=>Q.deepEqual(c,l))||i.push(l)}),i},[e]);return s.jsxs(Zt,{stickyHeader:!0,children:[s.jsx(Qt,{stickyHeader:!0,children:s.jsxs(Xe,{children:[s.jsx($e,{children:r}),s.jsx($e,{children:o})]})}),s.jsx(en,{children:a.length>0&&a.map(i=>s.jsxs(Xe,{onClick:()=>{t(i.reference)},children:[s.jsx(Se,{children:`${ie.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}`}),s.jsx(Se,{children:i.text})]},`${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`))})]})}const ar=g.forwardRef(({className:e,...t},n)=>s.jsx(Fr.Root,{ref:n,className:S("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...t,children:s.jsx(Fr.Indicator,{className:S("tw-flex tw-items-center tw-justify-center tw-text-current"),children:s.jsx(H.Check,{className:"tw-h-4 tw-w-4"})})}));ar.displayName=Fr.Root.displayName;const Oa=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Gr=e=>{const t=/^\\[vc]\s+(\d+)/,n=e.match(t);if(n)return+n[1]},Ra=e=>{const t=e.match(/^\\id\s+([A-Za-z]+)/);return t?ie.bookIdToNumber(t[1]):0},_a=(e,t,n)=>n.includes(e)?"unapproved":t.includes(e)?"approved":"unknown",Pa=Rn.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),nc=g.forwardRef(({className:e,variant:t,size:n,...r},o)=>s.jsx(oa.Root,{ref:o,className:S(Pa({variant:t,size:n,className:e})),...r}));nc.displayName=oa.Root.displayName;const Ia=g.createContext({size:"default",variant:"default"}),wo=g.forwardRef(({className:e,variant:t,size:n,children:r,...o},a)=>s.jsx(sr.Root,{ref:a,className:S("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,children:s.jsx(Ia.Provider,{value:{variant:t,size:n},children:r})}));wo.displayName=sr.Root.displayName;const bn=g.forwardRef(({className:e,children:t,variant:n,size:r,...o},a)=>{const i=g.useContext(Ia);return s.jsx(sr.Item,{ref:a,className:S(Pa({variant:i.variant||n,size:i.size||r}),e),...o,children:t})});bn.displayName=sr.Item.displayName;const ir=e=>e==="asc"?s.jsx(H.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):e==="desc"?s.jsx(H.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):s.jsx(H.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),rc=e=>({accessorKey:"item",accessorFn:t=>t.items[0],header:({column:t})=>s.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,ir(t.getIsSorted())]})}),oc=(e,t)=>({accessorKey:`item${t}`,accessorFn:n=>n.items[t],header:({column:n})=>s.jsxs(pe,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,ir(n.getIsSorted())]})}),sc=e=>({accessorKey:"count",header:({column:t})=>s.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:s.jsxs(pe,{variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[e,ir(t.getIsSorted())]})}),cell:({row:t})=>s.jsx("div",{className:"tw-flex tw-justify-end",children:t.getValue("count")})}),Tr=(e,t,n,r,o,a)=>{let i=[...n];e.forEach(c=>{t==="approved"?i.includes(c)||i.push(c):i=i.filter(d=>d!==c)}),r(i);let l=[...o];e.forEach(c=>{t==="unapproved"?l.includes(c)||l.push(c):l=l.filter(d=>d!==c)}),a(l)},ac=(e,t,n,r,o)=>({accessorKey:"status",header:({column:a})=>s.jsx("div",{className:"tw-flex tw-justify-center",children:s.jsxs(pe,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[e,ir(a.getIsSorted())]})}),cell:({row:a})=>{const i=a.getValue("status"),l=a.getValue("item");return s.jsxs(wo,{value:i,variant:"outline",type:"single",children:[s.jsx(bn,{onClick:()=>Tr([l],"approved",t,n,r,o),value:"approved",children:s.jsx(H.CircleCheckIcon,{})}),s.jsx(bn,{onClick:()=>Tr([l],"unapproved",t,n,r,o),value:"unapproved",children:s.jsx(H.CircleXIcon,{})}),s.jsx(bn,{onClick:()=>Tr([l],"unknown",t,n,r,o),value:"unknown",children:s.jsx(H.CircleHelpIcon,{})})]})}}),ic=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),lc=(e,t,n)=>{let r=e;return t!=="all"&&(r=r.filter(o=>t==="approved"&&o.status==="approved"||t==="unapproved"&&o.status==="unapproved"||t==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},cc=(e,t,n,r,o)=>{if(!e)return[];const a=[];let i=t.bookNum,l=t.chapterNum,c=t.verseNum;return Oa(e).forEach(u=>{u.startsWith("\\id")&&(i=Ra(u),l=0,c=0),u.startsWith("\\c")&&(l=Gr(u),c=0),u.startsWith("\\v")&&(c=Gr(u),l===0&&(l=t.chapterNum));let h=o.exec(u)??void 0;for(;h;){const w=[];h.forEach(m=>w.push(m));const v=h.index,x=a.find(m=>Q.deepEqual(m.items,w)),f={reference:{bookNum:i!==void 0?i:-1,chapterNum:l!==void 0?l:-1,verseNum:c!==void 0?c:-1},text:Q.substring(u,Math.max(0,v-25),Math.min(v+25,u.length))};if(x)x.count+=1,x.occurrences.push(f);else{const m={items:w,count:1,status:_a(w[0],n,r),occurrences:[f]};a.push(m)}h=o.exec(u)??void 0}}),a},et=(e,t)=>e[t]??t;function dc({scriptureReference:e,setScriptureReference:t,localizedStrings:n,extractItems:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,text:l,scope:c,onScopeChange:d,columns:u}){const h=et(n,"%webView_inventory_all%"),w=et(n,"%webView_inventory_approved%"),v=et(n,"%webView_inventory_unapproved%"),x=et(n,"%webView_inventory_unknown%"),f=et(n,"%webView_inventory_scope_currentBook%"),m=et(n,"%webView_inventory_scope_chapter%"),N=et(n,"%webView_inventory_scope_verse%"),$=et(n,"%webView_inventory_filter_text%"),R=et(n,"%webView_inventory_show_additional_items%"),[E,b]=g.useState(!1),[I,z]=g.useState("all"),[Y,C]=g.useState(""),[_,k]=g.useState([]),D=g.useMemo(()=>l?r instanceof RegExp?cc(l,e,a,i,r):r(l,e,a,i):[],[l,r,e,a,i]),M=g.useMemo(()=>{if(E)return D;const y=[];return D.forEach(O=>{const U=O.items[0],G=y.find(F=>F.items[0]===U);G?(G.count+=O.count,G.occurrences=G.occurrences.concat(O.occurrences)):y.push({items:[U],count:O.count,occurrences:O.occurrences,status:O.status})}),y},[E,D]),ee=g.useMemo(()=>lc(M,I,Y),[M,I,Y]),J=g.useMemo(()=>{var U,G;if(!E)return u;const y=(U=o==null?void 0:o.tableHeaders)==null?void 0:U.length;if(!y)return u;const O=[];for(let F=0;F<y;F++)O.push(oc(((G=o==null?void 0:o.tableHeaders)==null?void 0:G[F])||"Additional Item",F+1));return[...O,...u]},[o==null?void 0:o.tableHeaders,u,E]);g.useEffect(()=>{k([])},[ee]);const q=(y,O)=>{O.setRowSelection(()=>{const U={};return U[y.index]=!0,U}),k(y.original.items)},te=y=>{if(y==="book"||y==="chapter"||y==="verse")d(y);else throw new Error(`Invalid scope value: ${y}`)},oe=y=>{if(y==="all"||y==="approved"||y==="unapproved"||y==="unknown")z(y);else throw new Error(`Invalid status filter value: ${y}`)},se=g.useMemo(()=>{if(M.length===0||_.length===0)return[];const y=M.filter(O=>Q.deepEqual(E?O.items:[O.items[0]],_));if(y.length>1)throw new Error("Selected item is not unique");return y[0].occurrences},[_,E,M]);return s.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[s.jsxs("div",{className:"tw-flex tw-items-stretch",children:[s.jsxs(Ft,{onValueChange:y=>oe(y),defaultValue:I,children:[s.jsx(Nt,{className:"tw-m-1",children:s.jsx(zt,{placeholder:"Select filter"})}),s.jsxs(kt,{children:[s.jsx(Ve,{value:"all",children:h}),s.jsx(Ve,{value:"approved",children:w}),s.jsx(Ve,{value:"unapproved",children:v}),s.jsx(Ve,{value:"unknown",children:x})]})]}),s.jsxs(Ft,{onValueChange:y=>te(y),defaultValue:c,children:[s.jsx(Nt,{className:"tw-m-1",children:s.jsx(zt,{placeholder:"Select scope"})}),s.jsxs(kt,{children:[s.jsx(Ve,{value:"book",children:f}),s.jsx(Ve,{value:"chapter",children:m}),s.jsx(Ve,{value:"verse",children:N})]})]}),s.jsx(Tt,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:$,value:Y,onChange:y=>{C(y.target.value)}}),o&&s.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[s.jsx(ar,{className:"tw-m-1",checked:E,onCheckedChange:y=>{k([]),b(y)}}),s.jsx(Te,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??R})]})]}),s.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:s.jsx(Ca,{columns:J,data:ee,onRowClickHandler:q,stickyHeader:!0})}),se.length>0&&s.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:s.jsx(tc,{occurrenceData:se,setScriptureReference:t,localizedStrings:n})})]})}function uc({entries:e,getEntriesCount:t=void 0,selected:n,onChange:r,placeholder:o,commandEmptyMessage:a="No entries found",customSelectedText:i,sortSelected:l=!1,icon:c=void 0}){const[d,u]=g.useState(!1),h=g.useCallback(x=>{r(n.includes(x)?n.filter(f=>f!==x):[...n,x])},[n,r]),w=()=>{var x;return n.length===1?((x=e.find(f=>f.value===n[0]))==null?void 0:x.label)??o:i||o},v=g.useMemo(()=>{if(!l)return e;const x=e.filter(m=>m.starred).sort((m,N)=>m.label.localeCompare(N.label)),f=e.filter(m=>!m.starred).sort((m,N)=>{const $=n.includes(m.value),R=n.includes(N.value);return $&&!R?-1:!$&&R?1:m.label.localeCompare(N.label)});return[...x,...f]},[e,n,l]);return s.jsxs(ga,{open:d,onOpenChange:u,children:[s.jsx(ba,{asChild:!0,children:s.jsxs(pe,{variant:"outline",role:"combobox","aria-expanded":d,className:S("tw-w-full tw-justify-between",n.length>0&&n.length<e.length&&"tw-border-primary"),children:[s.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:s.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:c})}),s.jsx("div",{className:S((n.length===0||n.length===e.length)&&"tw-text-muted"),children:w()})]}),s.jsx(H.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),s.jsx(oo,{align:"start",className:"tw-w-full tw-p-0",children:s.jsxs(so,{children:[s.jsx(ao,{placeholder:`Search ${o.toLowerCase()}...`}),s.jsxs(io,{children:[s.jsx(lo,{children:a}),s.jsx(xa,{children:v.map(x=>{const f=t?t(x):void 0;return s.jsxs(co,{value:x.value,onSelect:h,className:"tw-flex tw-items-center tw-gap-2",children:[s.jsx("div",{className:"w-4",children:s.jsx(H.Check,{className:S("tw-h-4 tw-w-4",n.includes(x.value)?"tw-opacity-100":"tw-opacity-0")})}),s.jsx("div",{className:"tw-w-4",children:x.starred&&s.jsx(H.Star,{className:"tw-h-4 tw-w-4"})}),s.jsx("div",{className:"tw-flex-grow",children:x.label}),t&&s.jsx("div",{className:"tw-w-10 tw-text-right tw-text-muted-foreground",children:f})]},x.value)})})]})]})})]})}function $a({onSearch:e,placeholder:t,isFullWidth:n,className:r}){const[o,a]=g.useState(""),i=l=>{a(l),e(l)};return s.jsxs("div",{className:"tw-relative",children:[s.jsx(H.Search,{className:"tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50"}),s.jsx(Tt,{className:S("tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",{"tw-w-full":n},{"tw-pe-9":o},r),placeholder:t,value:o,onChange:l=>i(l.target.value)}),o&&s.jsxs(pe,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",children:[s.jsx(H.X,{className:"tw-h-4 tw-w-4",onClick:()=>{i("")}}),s.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})}const fo=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.Root,{orientation:"vertical",ref:n,className:S("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...t}));fo.displayName=_e.List.displayName;const mo=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.List,{ref:n,className:S("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));mo.displayName=_e.List.displayName;const Ma=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.Trigger,{ref:n,...t,className:S("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)})),ho=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.Content,{ref:n,className:S("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));ho.displayName=_e.Content.displayName;function pc({tabList:e,onSearch:t,searchPlaceholder:n,headerTitle:r,isSearchBarFullWidth:o=!1,direction:a="ltr"}){return s.jsxs("div",{className:"pr-twp",children:[s.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[r?s.jsx("h1",{children:r}):"",s.jsx($a,{isFullWidth:o,onSearch:t,placeholder:n})]}),s.jsxs(fo,{dir:a,children:[s.jsx(mo,{children:e.map(i=>s.jsx(Ma,{value:i.value,children:i.value},i.key))}),e.map(i=>s.jsx(ho,{value:i.value,children:i.content},i.key))]})]})}const st="scrBook",wc="scrRef",mt="source",fc="details",mc="Scripture Reference",hc="Scripture Book",Da="Type",gc="Details";function bc(e,t){const n=t??!1;return[{accessorFn:r=>`${ie.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,id:st,header:(e==null?void 0:e.scriptureReferenceColumnName)??mc,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?ie.bookNumberToEnglishName(o.start.bookNum):r.row.groupingColumnId===st?Q.formatScrRef(o.start):void 0},getGroupingValue:r=>r.start.bookNum,sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>Q.formatScrRef(r.start),id:wc,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:Q.formatScrRef(o.start)},sortingFn:(r,o)=>Q.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:mt,header:n?(e==null?void 0:e.typeColumnName)??Da:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:fc,header:(e==null?void 0:e.detailsColumnName)??gc,cell:r=>r.getValue(),enableGrouping:!1}]}const vc=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:t}=e.start;let n=0;return e.end&&({offset:n}=e.end),!e.end||Q.compareScrRefs(e.start,e.end)===0?`${Q.scrRefToBBBCCCVVV(e.start)}+${t}`:`${Q.scrRefToBBBCCCVVV(e.start)}+${t}-${Q.scrRefToBBBCCCVVV(e.end)}+${n}`},cs=e=>`${vc({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function xc({sources:e,showColumnHeaders:t=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:a,detailsColumnName:i,onRowSelected:l,direction:c="ltr"}){const[d,u]=g.useState([]),[h,w]=g.useState([{id:st,desc:!1}]),[v,x]=g.useState({}),f=g.useMemo(()=>e.flatMap(C=>C.data.map(_=>({..._,source:C.source}))),[e]),m=g.useMemo(()=>bc({scriptureReferenceColumnName:r,typeColumnName:a,detailsColumnName:i},n),[r,a,i,n]);g.useEffect(()=>{d.includes(mt)?w([{id:mt,desc:!1},{id:st,desc:!1}]):w([{id:st,desc:!1}])},[d]);const N=Ne.useReactTable({data:f,columns:m,state:{grouping:d,sorting:h,rowSelection:v},onGroupingChange:u,onSortingChange:w,onRowSelectionChange:x,getExpandedRowModel:Ne.getExpandedRowModel(),getGroupedRowModel:Ne.getGroupedRowModel(),getCoreRowModel:Ne.getCoreRowModel(),getSortedRowModel:Ne.getSortedRowModel(),getRowId:cs,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});g.useEffect(()=>{if(l){const C=N.getSelectedRowModel().rowsById,_=Object.keys(C);if(_.length===1){const k=f.find(D=>cs(D)===_[0])||void 0;k&&l(k)}}},[v,f,l,N]);const $=o??hc,R=a??Da,E=[{label:"No Grouping",value:[]},{label:`Group by ${$}`,value:[st]},{label:`Group by ${R}`,value:[mt]},{label:`Group by ${$} and ${R}`,value:[st,mt]},{label:`Group by ${R} and ${$}`,value:[mt,st]}],b=C=>{u(JSON.parse(C))},I=(C,_)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(_)},z=(C,_)=>C.getIsGrouped()?"":S("banded-row",_%2===0?"even":"odd"),Y=(C,_,k)=>{if(!((C==null?void 0:C.length)===0||_.depth<k.column.getGroupedIndex())){if(_.getIsGrouped())switch(_.depth){case 1:return"tw-ps-4";default:return}switch(_.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return s.jsxs("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!t&&s.jsxs(Ft,{value:JSON.stringify(d),onValueChange:C=>{b(C)},children:[s.jsx(Nt,{className:"tw-mb-1 tw-mt-2",children:s.jsx(zt,{})}),s.jsx(kt,{position:"item-aligned",children:s.jsx(ka,{children:E.map(C=>s.jsx(Ve,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),s.jsxs(Zt,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[t&&s.jsx(Qt,{children:N.getHeaderGroups().map(C=>s.jsx(Xe,{children:C.headers.filter(_=>_.column.columnDef.header).map(_=>s.jsx($e,{colSpan:_.colSpan,className:"top-0 tw-sticky",children:_.isPlaceholder?void 0:s.jsxs("div",{children:[_.column.getCanGroup()?s.jsx(pe,{variant:"ghost",title:`Toggle grouping by ${_.column.columnDef.header}`,onClick:_.column.getToggleGroupingHandler(),type:"button",children:_.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Ne.flexRender(_.column.columnDef.header,_.getContext())]})},_.id))},C.id))}),s.jsx(en,{children:N.getRowModel().rows.map((C,_)=>s.jsx(Xe,{"data-state":C.getIsSelected()?"selected":"",className:S(z(C,_)),onClick:k=>I(C,k),children:C.getVisibleCells().map(k=>{if(!(k.getIsPlaceholder()||k.column.columnDef.enableGrouping&&!k.getIsGrouped()&&(k.column.columnDef.id!==mt||!n)))return s.jsx(Se,{className:S(k.column.columnDef.id,"tw-p-[1px]",Y(d,C,k)),children:(()=>k.getIsGrouped()?s.jsxs(pe,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&s.jsx(H.ChevronDown,{}),!C.getIsExpanded()&&(c==="ltr"?s.jsx(H.ChevronRight,{}):s.jsx(H.ChevronLeft,{}))," ",Ne.flexRender(k.column.columnDef.cell,k.getContext())," (",C.subRows.length,")"]}):Ne.flexRender(k.column.columnDef.cell,k.getContext()))()},k.id)})},C.id))})]})]})}const Cr={[Q.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[Q.getLocalizeKeyForScrollGroupId(0)]:"A",[Q.getLocalizeKeyForScrollGroupId(1)]:"B",[Q.getLocalizeKeyForScrollGroupId(2)]:"C",[Q.getLocalizeKeyForScrollGroupId(3)]:"D",[Q.getLocalizeKeyForScrollGroupId(4)]:"E",[Q.getLocalizeKeyForScrollGroupId(5)]:"F",[Q.getLocalizeKeyForScrollGroupId(6)]:"G",[Q.getLocalizeKeyForScrollGroupId(7)]:"H",[Q.getLocalizeKeyForScrollGroupId(8)]:"I",[Q.getLocalizeKeyForScrollGroupId(9)]:"J",[Q.getLocalizeKeyForScrollGroupId(10)]:"K",[Q.getLocalizeKeyForScrollGroupId(11)]:"L",[Q.getLocalizeKeyForScrollGroupId(12)]:"M",[Q.getLocalizeKeyForScrollGroupId(13)]:"N",[Q.getLocalizeKeyForScrollGroupId(14)]:"O",[Q.getLocalizeKeyForScrollGroupId(15)]:"P",[Q.getLocalizeKeyForScrollGroupId(16)]:"Q",[Q.getLocalizeKeyForScrollGroupId(17)]:"R",[Q.getLocalizeKeyForScrollGroupId(18)]:"S",[Q.getLocalizeKeyForScrollGroupId(19)]:"T",[Q.getLocalizeKeyForScrollGroupId(20)]:"U",[Q.getLocalizeKeyForScrollGroupId(21)]:"V",[Q.getLocalizeKeyForScrollGroupId(22)]:"W",[Q.getLocalizeKeyForScrollGroupId(23)]:"X",[Q.getLocalizeKeyForScrollGroupId(24)]:"Y",[Q.getLocalizeKeyForScrollGroupId(25)]:"Z"};function yc({availableScrollGroupIds:e,scrollGroupId:t,onChangeScrollGroupId:n,localizedStrings:r={}}){const o={...Cr,...Object.fromEntries(Object.entries(r).map(([a,i])=>[a,a===i&&a in Cr?Cr[a]:i]))};return s.jsxs(Ft,{value:`${t}`,onValueChange:a=>n(a==="undefined"?void 0:parseInt(a,10)),children:[s.jsx(Nt,{className:"pr-twp tw-w-auto",children:s.jsx(zt,{placeholder:o[Q.getLocalizeKeyForScrollGroupId(t)]??t})}),s.jsx(kt,{style:{zIndex:250},children:e.map(a=>s.jsx(Ve,{value:`${a}`,children:o[Q.getLocalizeKeyForScrollGroupId(a)]},`${a}`))})]})}const go=g.forwardRef(({className:e,orientation:t="horizontal",decorative:n=!0,...r},o)=>s.jsx(sa.Root,{ref:o,decorative:n,orientation:t,className:S("pr-twp tw-shrink-0 tw-bg-border",t==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...r}));go.displayName=sa.Root.displayName;function Nc({children:e}){return s.jsx("div",{className:"pr-twp tw-grid",children:e})}function kc({primary:e,secondary:t,children:n,isLoading:r=!1,loadingMessage:o}){return s.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[s.jsxs("div",{children:[s.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e}),s.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:t})]}),r?s.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):s.jsx("div",{children:n})]})}function Ec({primary:e,secondary:t,includeSeparator:n=!1}){return s.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"tw-text-lg tw-font-medium",children:e}),s.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:t})]}),n?s.jsx(go,{}):""]})}function jc({id:e,className:t,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:a}){return s.jsx("div",{id:e,className:t,children:n.map(i=>s.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[s.jsx(ar,{className:"tw-mr-2 tw-align-middle",checked:r.includes(i),onCheckedChange:l=>o(i,l)}),s.jsx(Te,{children:a?a(i):i})]},i))})}function Sc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Tc(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var bo={},Aa={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(Aa);var Cc=Aa.exports,Or={};function vo(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function P(){return P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},P.apply(this,arguments)}function bt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ba(e){if(!bt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=Ba(e[n])}),t}function tt(e,t,n={clone:!0}){const r=n.clone?P({},e):e;return bt(e)&&bt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(bt(t[o])&&o in e&&bt(e[o])?r[o]=tt(e[o],t[o],n):n.clone?r[o]=bt(t[o])?Ba(t[o]):t[o]:r[o]=t[o])}),r}var Ur={exports:{}},zn={exports:{}},le={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ds;function Oc(){if(ds)return le;ds=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function R(b){if(typeof b=="object"&&b!==null){var I=b.$$typeof;switch(I){case t:switch(b=b.type,b){case c:case d:case r:case a:case o:case h:return b;default:switch(b=b&&b.$$typeof,b){case l:case u:case x:case v:case i:return b;default:return I}}case n:return I}}}function E(b){return R(b)===d}return le.AsyncMode=c,le.ConcurrentMode=d,le.ContextConsumer=l,le.ContextProvider=i,le.Element=t,le.ForwardRef=u,le.Fragment=r,le.Lazy=x,le.Memo=v,le.Portal=n,le.Profiler=a,le.StrictMode=o,le.Suspense=h,le.isAsyncMode=function(b){return E(b)||R(b)===c},le.isConcurrentMode=E,le.isContextConsumer=function(b){return R(b)===l},le.isContextProvider=function(b){return R(b)===i},le.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===t},le.isForwardRef=function(b){return R(b)===u},le.isFragment=function(b){return R(b)===r},le.isLazy=function(b){return R(b)===x},le.isMemo=function(b){return R(b)===v},le.isPortal=function(b){return R(b)===n},le.isProfiler=function(b){return R(b)===a},le.isStrictMode=function(b){return R(b)===o},le.isSuspense=function(b){return R(b)===h},le.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===r||b===d||b===a||b===o||b===h||b===w||typeof b=="object"&&b!==null&&(b.$$typeof===x||b.$$typeof===v||b.$$typeof===i||b.$$typeof===l||b.$$typeof===u||b.$$typeof===m||b.$$typeof===N||b.$$typeof===$||b.$$typeof===f)},le.typeOf=R,le}var ce={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var us;function Rc(){return us||(us=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,i=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,d=e?Symbol.for("react.concurrent_mode"):60111,u=e?Symbol.for("react.forward_ref"):60112,h=e?Symbol.for("react.suspense"):60113,w=e?Symbol.for("react.suspense_list"):60120,v=e?Symbol.for("react.memo"):60115,x=e?Symbol.for("react.lazy"):60116,f=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,N=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function R(j){return typeof j=="string"||typeof j=="function"||j===r||j===d||j===a||j===o||j===h||j===w||typeof j=="object"&&j!==null&&(j.$$typeof===x||j.$$typeof===v||j.$$typeof===i||j.$$typeof===l||j.$$typeof===u||j.$$typeof===m||j.$$typeof===N||j.$$typeof===$||j.$$typeof===f)}function E(j){if(typeof j=="object"&&j!==null){var we=j.$$typeof;switch(we){case t:var B=j.type;switch(B){case c:case d:case r:case a:case o:case h:return B;default:var xe=B&&B.$$typeof;switch(xe){case l:case u:case x:case v:case i:return xe;default:return we}}case n:return we}}}var b=c,I=d,z=l,Y=i,C=t,_=u,k=r,D=x,M=v,ee=n,J=a,q=o,te=h,oe=!1;function se(j){return oe||(oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),y(j)||E(j)===c}function y(j){return E(j)===d}function O(j){return E(j)===l}function U(j){return E(j)===i}function G(j){return typeof j=="object"&&j!==null&&j.$$typeof===t}function F(j){return E(j)===u}function W(j){return E(j)===r}function V(j){return E(j)===x}function K(j){return E(j)===v}function X(j){return E(j)===n}function Z(j){return E(j)===a}function T(j){return E(j)===o}function L(j){return E(j)===h}ce.AsyncMode=b,ce.ConcurrentMode=I,ce.ContextConsumer=z,ce.ContextProvider=Y,ce.Element=C,ce.ForwardRef=_,ce.Fragment=k,ce.Lazy=D,ce.Memo=M,ce.Portal=ee,ce.Profiler=J,ce.StrictMode=q,ce.Suspense=te,ce.isAsyncMode=se,ce.isConcurrentMode=y,ce.isContextConsumer=O,ce.isContextProvider=U,ce.isElement=G,ce.isForwardRef=F,ce.isFragment=W,ce.isLazy=V,ce.isMemo=K,ce.isPortal=X,ce.isProfiler=Z,ce.isStrictMode=T,ce.isSuspense=L,ce.isValidElementType=R,ce.typeOf=E}()),ce}var ps;function Va(){return ps||(ps=1,process.env.NODE_ENV==="production"?zn.exports=Oc():zn.exports=Rc()),zn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Rr,ws;function _c(){if(ws)return Rr;ws=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(a){if(a==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a)}function o(){try{if(!Object.assign)return!1;var a=new String("abc");if(a[5]="de",Object.getOwnPropertyNames(a)[0]==="5")return!1;for(var i={},l=0;l<10;l++)i["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(i).map(function(u){return i[u]});if(c.join("")!=="0123456789")return!1;var d={};return"abcdefghijklmnopqrst".split("").forEach(function(u){d[u]=u}),Object.keys(Object.assign({},d)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Rr=o()?Object.assign:function(a,i){for(var l,c=r(a),d,u=1;u<arguments.length;u++){l=Object(arguments[u]);for(var h in l)t.call(l,h)&&(c[h]=l[h]);if(e){d=e(l);for(var w=0;w<d.length;w++)n.call(l,d[w])&&(c[d[w]]=l[d[w]])}}return c},Rr}var _r,fs;function xo(){if(fs)return _r;fs=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return _r=e,_r}var Pr,ms;function La(){return ms||(ms=1,Pr=Function.call.bind(Object.prototype.hasOwnProperty)),Pr}var Ir,hs;function Pc(){if(hs)return Ir;hs=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=xo(),n={},r=La();e=function(a){var i="Warning: "+a;typeof console<"u"&&console.error(i);try{throw new Error(i)}catch{}}}function o(a,i,l,c,d){if(process.env.NODE_ENV!=="production"){for(var u in a)if(r(a,u)){var h;try{if(typeof a[u]!="function"){var w=Error((c||"React class")+": "+l+" type `"+u+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof a[u]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw w.name="Invariant Violation",w}h=a[u](i,u,c,l,null,t)}catch(x){h=x}if(h&&!(h instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+u+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof h+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),h instanceof Error&&!(h.message in n)){n[h.message]=!0;var v=d?d():"";e("Failed "+l+" type: "+h.message+(v??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},Ir=o,Ir}var $r,gs;function Ic(){if(gs)return $r;gs=1;var e=Va(),t=_c(),n=xo(),r=La(),o=Pc(),a=function(){};process.env.NODE_ENV!=="production"&&(a=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function i(){return null}return $r=function(l,c){var d=typeof Symbol=="function"&&Symbol.iterator,u="@@iterator";function h(y){var O=y&&(d&&y[d]||y[u]);if(typeof O=="function")return O}var w="<<anonymous>>",v={array:N("array"),bigint:N("bigint"),bool:N("boolean"),func:N("function"),number:N("number"),object:N("object"),string:N("string"),symbol:N("symbol"),any:$(),arrayOf:R,element:E(),elementType:b(),instanceOf:I,node:_(),objectOf:Y,oneOf:z,oneOfType:C,shape:D,exact:M};function x(y,O){return y===O?y!==0||1/y===1/O:y!==y&&O!==O}function f(y,O){this.message=y,this.data=O&&typeof O=="object"?O:{},this.stack=""}f.prototype=Error.prototype;function m(y){if(process.env.NODE_ENV!=="production")var O={},U=0;function G(W,V,K,X,Z,T,L){if(X=X||w,T=T||K,L!==n){if(c){var j=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw j.name="Invariant Violation",j}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var we=X+":"+K;!O[we]&&U<3&&(a("You are manually calling a React.PropTypes validation function for the `"+T+"` prop on `"+X+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),O[we]=!0,U++)}}return V[K]==null?W?V[K]===null?new f("The "+Z+" `"+T+"` is marked as required "+("in `"+X+"`, but its value is `null`.")):new f("The "+Z+" `"+T+"` is marked as required in "+("`"+X+"`, but its value is `undefined`.")):null:y(V,K,X,Z,T)}var F=G.bind(null,!1);return F.isRequired=G.bind(null,!0),F}function N(y){function O(U,G,F,W,V,K){var X=U[G],Z=q(X);if(Z!==y){var T=te(X);return new f("Invalid "+W+" `"+V+"` of type "+("`"+T+"` supplied to `"+F+"`, expected ")+("`"+y+"`."),{expectedType:y})}return null}return m(O)}function $(){return m(i)}function R(y){function O(U,G,F,W,V){if(typeof y!="function")return new f("Property `"+V+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var K=U[G];if(!Array.isArray(K)){var X=q(K);return new f("Invalid "+W+" `"+V+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an array."))}for(var Z=0;Z<K.length;Z++){var T=y(K,Z,F,W,V+"["+Z+"]",n);if(T instanceof Error)return T}return null}return m(O)}function E(){function y(O,U,G,F,W){var V=O[U];if(!l(V)){var K=q(V);return new f("Invalid "+F+" `"+W+"` of type "+("`"+K+"` supplied to `"+G+"`, expected a single ReactElement."))}return null}return m(y)}function b(){function y(O,U,G,F,W){var V=O[U];if(!e.isValidElementType(V)){var K=q(V);return new f("Invalid "+F+" `"+W+"` of type "+("`"+K+"` supplied to `"+G+"`, expected a single ReactElement type."))}return null}return m(y)}function I(y){function O(U,G,F,W,V){if(!(U[G]instanceof y)){var K=y.name||w,X=se(U[G]);return new f("Invalid "+W+" `"+V+"` of type "+("`"+X+"` supplied to `"+F+"`, expected ")+("instance of `"+K+"`."))}return null}return m(O)}function z(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&(arguments.length>1?a("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):a("Invalid argument supplied to oneOf, expected an array.")),i;function O(U,G,F,W,V){for(var K=U[G],X=0;X<y.length;X++)if(x(K,y[X]))return null;var Z=JSON.stringify(y,function(L,j){var we=te(j);return we==="symbol"?String(j):j});return new f("Invalid "+W+" `"+V+"` of value `"+String(K)+"` "+("supplied to `"+F+"`, expected one of "+Z+"."))}return m(O)}function Y(y){function O(U,G,F,W,V){if(typeof y!="function")return new f("Property `"+V+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var K=U[G],X=q(K);if(X!=="object")return new f("Invalid "+W+" `"+V+"` of type "+("`"+X+"` supplied to `"+F+"`, expected an object."));for(var Z in K)if(r(K,Z)){var T=y(K,Z,F,W,V+"."+Z,n);if(T instanceof Error)return T}return null}return m(O)}function C(y){if(!Array.isArray(y))return process.env.NODE_ENV!=="production"&&a("Invalid argument supplied to oneOfType, expected an instance of array."),i;for(var O=0;O<y.length;O++){var U=y[O];if(typeof U!="function")return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+oe(U)+" at index "+O+"."),i}function G(F,W,V,K,X){for(var Z=[],T=0;T<y.length;T++){var L=y[T],j=L(F,W,V,K,X,n);if(j==null)return null;j.data&&r(j.data,"expectedType")&&Z.push(j.data.expectedType)}var we=Z.length>0?", expected one of type ["+Z.join(", ")+"]":"";return new f("Invalid "+K+" `"+X+"` supplied to "+("`"+V+"`"+we+"."))}return m(G)}function _(){function y(O,U,G,F,W){return ee(O[U])?null:new f("Invalid "+F+" `"+W+"` supplied to "+("`"+G+"`, expected a ReactNode."))}return m(y)}function k(y,O,U,G,F){return new f((y||"React class")+": "+O+" type `"+U+"."+G+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function D(y){function O(U,G,F,W,V){var K=U[G],X=q(K);if(X!=="object")return new f("Invalid "+W+" `"+V+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));for(var Z in y){var T=y[Z];if(typeof T!="function")return k(F,W,V,Z,te(T));var L=T(K,Z,F,W,V+"."+Z,n);if(L)return L}return null}return m(O)}function M(y){function O(U,G,F,W,V){var K=U[G],X=q(K);if(X!=="object")return new f("Invalid "+W+" `"+V+"` of type `"+X+"` "+("supplied to `"+F+"`, expected `object`."));var Z=t({},U[G],y);for(var T in Z){var L=y[T];if(r(y,T)&&typeof L!="function")return k(F,W,V,T,te(L));if(!L)return new f("Invalid "+W+" `"+V+"` key `"+T+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(U[G],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(y),null,"  "));var j=L(K,T,F,W,V+"."+T,n);if(j)return j}return null}return m(O)}function ee(y){switch(typeof y){case"number":case"string":case"undefined":return!0;case"boolean":return!y;case"object":if(Array.isArray(y))return y.every(ee);if(y===null||l(y))return!0;var O=h(y);if(O){var U=O.call(y),G;if(O!==y.entries){for(;!(G=U.next()).done;)if(!ee(G.value))return!1}else for(;!(G=U.next()).done;){var F=G.value;if(F&&!ee(F[1]))return!1}}else return!1;return!0;default:return!1}}function J(y,O){return y==="symbol"?!0:O?O["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&O instanceof Symbol:!1}function q(y){var O=typeof y;return Array.isArray(y)?"array":y instanceof RegExp?"object":J(O,y)?"symbol":O}function te(y){if(typeof y>"u"||y===null)return""+y;var O=q(y);if(O==="object"){if(y instanceof Date)return"date";if(y instanceof RegExp)return"regexp"}return O}function oe(y){var O=te(y);switch(O){case"array":case"object":return"an "+O;case"boolean":case"date":case"regexp":return"a "+O;default:return O}}function se(y){return!y.constructor||!y.constructor.name?w:y.constructor.name}return v.checkPropTypes=o,v.resetWarningCache=o.resetWarningCache,v.PropTypes=v,v},$r}var Mr,bs;function $c(){if(bs)return Mr;bs=1;var e=xo();function t(){}function n(){}return n.resetWarningCache=t,Mr=function(){function r(i,l,c,d,u,h){if(h!==e){var w=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw w.name="Invariant Violation",w}}r.isRequired=r;function o(){return r}var a={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return a.PropTypes=a,a},Mr}if(process.env.NODE_ENV!=="production"){var Mc=Va(),Dc=!0;Ur.exports=Ic()(Mc.isElement,Dc)}else Ur.exports=$c()();var Ac=Ur.exports;const p=Sc(Ac);function Bc(e){const{prototype:t={}}=e;return!!t.isReactComponent}function Fa(e,t,n,r,o){const a=e[t],i=o||t;if(a==null||typeof window>"u")return null;let l;const c=a.type;return typeof c=="function"&&!Bc(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const za=vo(p.element,Fa);za.isRequired=vo(p.element.isRequired,Fa);const Ga=za,Vc="exact-prop: ​";function Lc(e){return process.env.NODE_ENV==="production"?e:P({},e,{[Vc]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Gt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var qr={exports:{}},de={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vs;function Fc(){if(vs)return de;vs=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),x;x=Symbol.for("react.module.reference");function f(m){if(typeof m=="object"&&m!==null){var N=m.$$typeof;switch(N){case e:switch(m=m.type,m){case n:case o:case r:case d:case u:return m;default:switch(m=m&&m.$$typeof,m){case l:case i:case c:case w:case h:case a:return m;default:return N}}case t:return N}}}return de.ContextConsumer=i,de.ContextProvider=a,de.Element=e,de.ForwardRef=c,de.Fragment=n,de.Lazy=w,de.Memo=h,de.Portal=t,de.Profiler=o,de.StrictMode=r,de.Suspense=d,de.SuspenseList=u,de.isAsyncMode=function(){return!1},de.isConcurrentMode=function(){return!1},de.isContextConsumer=function(m){return f(m)===i},de.isContextProvider=function(m){return f(m)===a},de.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},de.isForwardRef=function(m){return f(m)===c},de.isFragment=function(m){return f(m)===n},de.isLazy=function(m){return f(m)===w},de.isMemo=function(m){return f(m)===h},de.isPortal=function(m){return f(m)===t},de.isProfiler=function(m){return f(m)===o},de.isStrictMode=function(m){return f(m)===r},de.isSuspense=function(m){return f(m)===d},de.isSuspenseList=function(m){return f(m)===u},de.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===d||m===u||m===v||typeof m=="object"&&m!==null&&(m.$$typeof===w||m.$$typeof===h||m.$$typeof===a||m.$$typeof===i||m.$$typeof===c||m.$$typeof===x||m.getModuleId!==void 0)},de.typeOf=f,de}var ue={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xs;function zc(){return xs||(xs=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),i=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),v=Symbol.for("react.offscreen"),x=!1,f=!1,m=!1,N=!1,$=!1,R;R=Symbol.for("react.module.reference");function E(B){return!!(typeof B=="string"||typeof B=="function"||B===n||B===o||$||B===r||B===d||B===u||N||B===v||x||f||m||typeof B=="object"&&B!==null&&(B.$$typeof===w||B.$$typeof===h||B.$$typeof===a||B.$$typeof===i||B.$$typeof===c||B.$$typeof===R||B.getModuleId!==void 0))}function b(B){if(typeof B=="object"&&B!==null){var xe=B.$$typeof;switch(xe){case e:var qe=B.type;switch(qe){case n:case o:case r:case d:case u:return qe;default:var ut=qe&&qe.$$typeof;switch(ut){case l:case i:case c:case w:case h:case a:return ut;default:return xe}}case t:return xe}}}var I=i,z=a,Y=e,C=c,_=n,k=w,D=h,M=t,ee=o,J=r,q=d,te=u,oe=!1,se=!1;function y(B){return oe||(oe=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function O(B){return se||(se=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function U(B){return b(B)===i}function G(B){return b(B)===a}function F(B){return typeof B=="object"&&B!==null&&B.$$typeof===e}function W(B){return b(B)===c}function V(B){return b(B)===n}function K(B){return b(B)===w}function X(B){return b(B)===h}function Z(B){return b(B)===t}function T(B){return b(B)===o}function L(B){return b(B)===r}function j(B){return b(B)===d}function we(B){return b(B)===u}ue.ContextConsumer=I,ue.ContextProvider=z,ue.Element=Y,ue.ForwardRef=C,ue.Fragment=_,ue.Lazy=k,ue.Memo=D,ue.Portal=M,ue.Profiler=ee,ue.StrictMode=J,ue.Suspense=q,ue.SuspenseList=te,ue.isAsyncMode=y,ue.isConcurrentMode=O,ue.isContextConsumer=U,ue.isContextProvider=G,ue.isElement=F,ue.isForwardRef=W,ue.isFragment=V,ue.isLazy=K,ue.isMemo=X,ue.isPortal=Z,ue.isProfiler=T,ue.isStrictMode=L,ue.isSuspense=j,ue.isSuspenseList=we,ue.isValidElementType=E,ue.typeOf=b}()),ue}process.env.NODE_ENV==="production"?qr.exports=Fc():qr.exports=zc();var ys=qr.exports;const Gc=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Uc(e){const t=`${e}`.match(Gc);return t&&t[1]||""}function Ua(e,t=""){return e.displayName||e.name||Uc(e)||t}function Ns(e,t,n){const r=Ua(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function qc(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ua(e,"Component");if(typeof e=="object")switch(e.$$typeof){case ys.ForwardRef:return Ns(e,e.render,"ForwardRef");case ys.Memo:return Ns(e,e.type,"memo");default:return}}}function Sn(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=e[t],i=o||t;return a==null?null:a&&a.nodeType!==1?new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Hc=p.oneOfType([p.func,p.object]),qa=Hc;function Je(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Gt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Xc(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Yc(e,t=166){let n;function r(...o){const a=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(a,t)}return r.clear=()=>{clearTimeout(n)},r}function Wc(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,a,i)=>{const l=o||"<<anonymous>>",c=i||r;return typeof n[r]<"u"?new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Kc(e,t){var n,r;return A.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function Zn(e){return e&&e.ownerDocument||document}function Jc(e){return Zn(e).defaultView||window}function Zc(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?P({},t.propTypes):null;return o=>(a,i,l,c,d,...u)=>{const h=d||i,w=n==null?void 0:n[h];if(w){const v=w(a,i,l,c,d,...u);if(v)return v}return typeof a[i]<"u"&&!a[o]?new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Qn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const Qc=typeof window<"u"?A.useLayoutEffect:A.useEffect,Ut=Qc;let ks=0;function ed(e){const[t,n]=A.useState(e),r=e||t;return A.useEffect(()=>{t==null&&(ks+=1,n(`mui-${ks}`))},[t]),r}const Es=A["useId".toString()];function Ha(e){if(Es!==void 0){const t=Es();return e??t}return ed(e)}function td(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const a=o||t;return typeof e[t]<"u"?new Error(`The prop \`${a}\` is not supported. Please remove it.`):null}function Xa({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=A.useRef(e!==void 0),[a,i]=A.useState(t),l=o?e:a;if(process.env.NODE_ENV!=="production"){A.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:d}=A.useRef(t);A.useEffect(()=>{!o&&d!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=A.useCallback(d=>{o||i(d)},[]);return[l,c]}function Hr(e){const t=A.useRef(e);return Ut(()=>{t.current=e}),A.useRef((...n)=>(0,t.current)(...n)).current}function Et(...e){return A.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Qn(n,t)})},e)}const js={};function nd(e,t){const n=A.useRef(js);return n.current===js&&(n.current=e(t)),n}const rd=[];function od(e){A.useEffect(e,rd)}class Pn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new Pn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function fn(){const e=nd(Pn.create).current;return od(e.disposeEffect),e}let lr=!0,Xr=!1;const sd=new Pn,ad={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function id(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&ad[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function ld(e){e.metaKey||e.altKey||e.ctrlKey||(lr=!0)}function Dr(){lr=!1}function cd(){this.visibilityState==="hidden"&&Xr&&(lr=!0)}function dd(e){e.addEventListener("keydown",ld,!0),e.addEventListener("mousedown",Dr,!0),e.addEventListener("pointerdown",Dr,!0),e.addEventListener("touchstart",Dr,!0),e.addEventListener("visibilitychange",cd,!0)}function ud(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return lr||id(t)}function Ya(){const e=A.useCallback(o=>{o!=null&&dd(o.ownerDocument)},[]),t=A.useRef(!1);function n(){return t.current?(Xr=!0,sd.start(100,()=>{Xr=!1}),t.current=!1,!0):!1}function r(o){return ud(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Wa(e,t){const n=P({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=P({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},a=t[r];n[r]={},!a||!Object.keys(a)?n[r]=o:!o||!Object.keys(o)?n[r]=a:(n[r]=P({},a),Object.keys(o).forEach(i=>{n[r][i]=Wa(o[i],a[i])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function yo(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((a,i)=>{if(i){const l=t(i);l!==""&&a.push(l),n&&n[i]&&a.push(n[i])}return a},[]).join(" ")}),r}const Ss=e=>e,pd=()=>{let e=Ss;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ss}}},wd=pd(),Ka=wd,Ja={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function cr(e,t,n="Mui"){const r=Ja[t];return r?`${n}-${r}`:`${Ka.generate(e)}-${t}`}function Za(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=cr(e,o,n)}),r}function fd(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function ye(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,a;for(a=0;a<r.length;a++)o=r[a],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}const md=["values","unit","step"],hd=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>P({},n,{[r.key]:r.val}),{})};function gd(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ye(e,md),a=hd(t),i=Object.keys(a);function l(w){return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n})`}function c(w){return`@media (max-width:${(typeof t[w]=="number"?t[w]:w)-r/100}${n})`}function d(w,v){const x=i.indexOf(v);return`@media (min-width:${typeof t[w]=="number"?t[w]:w}${n}) and (max-width:${(x!==-1&&typeof t[i[x]]=="number"?t[i[x]]:v)-r/100}${n})`}function u(w){return i.indexOf(w)+1<i.length?d(w,i[i.indexOf(w)+1]):l(w)}function h(w){const v=i.indexOf(w);return v===0?l(i[1]):v===i.length-1?c(i[v]):d(w,i[i.indexOf(w)+1]).replace("@media","@media not all and")}return P({keys:i,values:a,up:l,down:c,between:d,only:u,not:h,unit:n},o)}const bd={borderRadius:4},vd=bd,xd=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.string,p.object,p.array]):{},lt=xd;function vn(e,t){return t?tt(e,t,{clone:!1}):e}const No={xs:0,sm:600,md:900,lg:1200,xl:1536},Ts={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${No[e]}px)`};function nt(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const a=r.breakpoints||Ts;return t.reduce((i,l,c)=>(i[a.up(a.keys[c])]=n(t[c]),i),{})}if(typeof t=="object"){const a=r.breakpoints||Ts;return Object.keys(t).reduce((i,l)=>{if(Object.keys(a.values||No).indexOf(l)!==-1){const c=a.up(l);i[c]=n(t[l],l)}else{const c=l;i[c]=t[c]}return i},{})}return n(t)}function yd(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const a=e.up(o);return r[a]={},r},{}))||{}}function Nd(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function dr(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,a)=>o&&o[a]?o[a]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function er(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=dr(e,n)||r,t&&(o=t(o,r,e)),o}function ve(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,a=i=>{if(i[t]==null)return null;const l=i[t],c=i.theme,d=dr(c,r)||{};return nt(i,l,h=>{let w=er(d,o,h);return h===w&&typeof h=="string"&&(w=er(d,o,`${t}${h==="default"?"":Je(h)}`,h)),n===!1?w:{[n]:w}})};return a.propTypes=process.env.NODE_ENV!=="production"?{[t]:lt}:{},a.filterProps=[t],a}function kd(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Ed={m:"margin",p:"padding"},jd={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Cs={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Sd=kd(e=>{if(e.length>2)if(Cs[e])e=Cs[e];else return[e];const[t,n]=e.split(""),r=Ed[t],o=jd[n]||"";return Array.isArray(o)?o.map(a=>r+a):[r+o]}),ur=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],pr=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Td=[...ur,...pr];function In(e,t,n,r){var o;const a=(o=dr(e,t,!1))!=null?o:n;return typeof a=="number"?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&typeof i!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`),a*i):Array.isArray(a)?i=>typeof i=="string"?i:(process.env.NODE_ENV!=="production"&&(Number.isInteger(i)?i>a.length-1&&console.error([`MUI: The value provided (${i}) overflows.`,`The supported values are: ${JSON.stringify(a)}.`,`${i} > ${a.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),a[i]):typeof a=="function"?a:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Qa(e){return In(e,"spacing",8,"spacing")}function $n(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Cd(e,t){return n=>e.reduce((r,o)=>(r[o]=$n(t,n),r),{})}function Od(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Sd(n),a=Cd(o,r),i=e[n];return nt(e,i,a)}function ei(e,t){const n=Qa(e.theme);return Object.keys(e).map(r=>Od(e,t,r,n)).reduce(vn,{})}function he(e){return ei(e,ur)}he.propTypes=process.env.NODE_ENV!=="production"?ur.reduce((e,t)=>(e[t]=lt,e),{}):{};he.filterProps=ur;function ge(e){return ei(e,pr)}ge.propTypes=process.env.NODE_ENV!=="production"?pr.reduce((e,t)=>(e[t]=lt,e),{}):{};ge.filterProps=pr;process.env.NODE_ENV!=="production"&&Td.reduce((e,t)=>(e[t]=lt,e),{});function Rd(e=8){if(e.mui)return e;const t=Qa({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(a=>{const i=t(a);return typeof i=="number"?`${i}px`:i}).join(" "));return n.mui=!0,n}function wr(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(a=>{r[a]=o}),r),{}),n=r=>Object.keys(r).reduce((o,a)=>t[a]?vn(o,t[a](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function Le(e){return typeof e!="number"?e:`${e}px solid`}function Ue(e,t){return ve({prop:e,themeKey:"borders",transform:t})}const _d=Ue("border",Le),Pd=Ue("borderTop",Le),Id=Ue("borderRight",Le),$d=Ue("borderBottom",Le),Md=Ue("borderLeft",Le),Dd=Ue("borderColor"),Ad=Ue("borderTopColor"),Bd=Ue("borderRightColor"),Vd=Ue("borderBottomColor"),Ld=Ue("borderLeftColor"),Fd=Ue("outline",Le),zd=Ue("outlineColor"),fr=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=In(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:$n(t,r)});return nt(e,e.borderRadius,n)}return null};fr.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:lt}:{};fr.filterProps=["borderRadius"];wr(_d,Pd,Id,$d,Md,Dd,Ad,Bd,Vd,Ld,fr,Fd,zd);const mr=e=>{if(e.gap!==void 0&&e.gap!==null){const t=In(e.theme,"spacing",8,"gap"),n=r=>({gap:$n(t,r)});return nt(e,e.gap,n)}return null};mr.propTypes=process.env.NODE_ENV!=="production"?{gap:lt}:{};mr.filterProps=["gap"];const hr=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=In(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:$n(t,r)});return nt(e,e.columnGap,n)}return null};hr.propTypes=process.env.NODE_ENV!=="production"?{columnGap:lt}:{};hr.filterProps=["columnGap"];const gr=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=In(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:$n(t,r)});return nt(e,e.rowGap,n)}return null};gr.propTypes=process.env.NODE_ENV!=="production"?{rowGap:lt}:{};gr.filterProps=["rowGap"];const Gd=ve({prop:"gridColumn"}),Ud=ve({prop:"gridRow"}),qd=ve({prop:"gridAutoFlow"}),Hd=ve({prop:"gridAutoColumns"}),Xd=ve({prop:"gridAutoRows"}),Yd=ve({prop:"gridTemplateColumns"}),Wd=ve({prop:"gridTemplateRows"}),Kd=ve({prop:"gridTemplateAreas"}),Jd=ve({prop:"gridArea"});wr(mr,hr,gr,Gd,Ud,qd,Hd,Xd,Yd,Wd,Kd,Jd);function Vt(e,t){return t==="grey"?t:e}const Zd=ve({prop:"color",themeKey:"palette",transform:Vt}),Qd=ve({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Vt}),eu=ve({prop:"backgroundColor",themeKey:"palette",transform:Vt});wr(Zd,Qd,eu);function Me(e){return e<=1&&e!==0?`${e*100}%`:e}const tu=ve({prop:"width",transform:Me}),ko=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const a=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||No[n];return a?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${a}${e.theme.breakpoints.unit}`}:{maxWidth:a}:{maxWidth:Me(n)}};return nt(e,e.maxWidth,t)}return null};ko.filterProps=["maxWidth"];const nu=ve({prop:"minWidth",transform:Me}),ru=ve({prop:"height",transform:Me}),ou=ve({prop:"maxHeight",transform:Me}),su=ve({prop:"minHeight",transform:Me});ve({prop:"size",cssProperty:"width",transform:Me});ve({prop:"size",cssProperty:"height",transform:Me});const au=ve({prop:"boxSizing"});wr(tu,ko,nu,ru,ou,su,au);const iu={border:{themeKey:"borders",transform:Le},borderTop:{themeKey:"borders",transform:Le},borderRight:{themeKey:"borders",transform:Le},borderBottom:{themeKey:"borders",transform:Le},borderLeft:{themeKey:"borders",transform:Le},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:Le},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:fr},color:{themeKey:"palette",transform:Vt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Vt},backgroundColor:{themeKey:"palette",transform:Vt},p:{style:ge},pt:{style:ge},pr:{style:ge},pb:{style:ge},pl:{style:ge},px:{style:ge},py:{style:ge},padding:{style:ge},paddingTop:{style:ge},paddingRight:{style:ge},paddingBottom:{style:ge},paddingLeft:{style:ge},paddingX:{style:ge},paddingY:{style:ge},paddingInline:{style:ge},paddingInlineStart:{style:ge},paddingInlineEnd:{style:ge},paddingBlock:{style:ge},paddingBlockStart:{style:ge},paddingBlockEnd:{style:ge},m:{style:he},mt:{style:he},mr:{style:he},mb:{style:he},ml:{style:he},mx:{style:he},my:{style:he},margin:{style:he},marginTop:{style:he},marginRight:{style:he},marginBottom:{style:he},marginLeft:{style:he},marginX:{style:he},marginY:{style:he},marginInline:{style:he},marginInlineStart:{style:he},marginInlineEnd:{style:he},marginBlock:{style:he},marginBlockStart:{style:he},marginBlockEnd:{style:he},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:mr},rowGap:{style:gr},columnGap:{style:hr},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Me},maxWidth:{style:ko},minWidth:{transform:Me},height:{transform:Me},maxHeight:{transform:Me},minHeight:{transform:Me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Eo=iu;function lu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function cu(e,t){return typeof e=="function"?e(t):e}function du(){function e(n,r,o,a){const i={[n]:r,theme:o},l=a[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:d,transform:u,style:h}=l;if(r==null)return null;if(d==="typography"&&r==="inherit")return{[n]:r};const w=dr(o,d)||{};return h?h(i):nt(i,r,x=>{let f=er(w,u,x);return x===f&&typeof x=="string"&&(f=er(w,u,`${n}${x==="default"?"":Je(x)}`,x)),c===!1?f:{[c]:f}})}function t(n){var r;const{sx:o,theme:a={}}=n||{};if(!o)return null;const i=(r=a.unstable_sxConfig)!=null?r:Eo;function l(c){let d=c;if(typeof c=="function")d=c(a);else if(typeof c!="object")return c;if(!d)return null;const u=yd(a.breakpoints),h=Object.keys(u);let w=u;return Object.keys(d).forEach(v=>{const x=cu(d[v],a);if(x!=null)if(typeof x=="object")if(i[v])w=vn(w,e(v,x,a,i));else{const f=nt({theme:a},x,m=>({[v]:m}));lu(f,x)?w[v]=t({sx:x,theme:a}):w=vn(w,f)}else w=vn(w,e(v,x,a,i))}),Nd(h,w)}return Array.isArray(o)?o.map(l):l(o)}return t}const ti=du();ti.filterProps=["sx"];const jo=ti;function uu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const pu=["breakpoints","palette","spacing","shape"];function So(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:a={}}=e,i=ye(e,pu),l=gd(n),c=Rd(o);let d=tt({breakpoints:l,direction:"ltr",components:{},palette:P({mode:"light"},r),spacing:c,shape:P({},vd,a)},i);return d.applyStyles=uu,d=t.reduce((u,h)=>tt(u,h),d),d.unstable_sxConfig=P({},Eo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(h){return jo({sx:h,theme:this})},d}function wu(e){return Object.keys(e).length===0}function ni(e=null){const t=A.useContext(Lr.ThemeContext);return!t||wu(t)?e:t}const fu=So();function ri(e=fu){return ni(e)}const mu=["ownerState"],hu=["variants"],gu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function bu(e){return Object.keys(e).length===0}function vu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Xn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const xu=So(),Os=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Gn({defaultTheme:e,theme:t,themeId:n}){return bu(t)?e:t[n]||t}function yu(e){return e?(t,n)=>n[e]:null}function Yn(e,t){let{ownerState:n}=t,r=ye(t,mu);const o=typeof e=="function"?e(P({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(a=>Yn(a,P({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:a=[]}=o;let l=ye(o,hu);return a.forEach(c=>{let d=!0;typeof c.props=="function"?d=c.props(P({ownerState:n},r,n)):Object.keys(c.props).forEach(u=>{(n==null?void 0:n[u])!==c.props[u]&&r[u]!==c.props[u]&&(d=!1)}),d&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(P({ownerState:n},r,n)):c.style))}),l}return o}function Nu(e={}){const{themeId:t,defaultTheme:n=xu,rootShouldForwardProp:r=Xn,slotShouldForwardProp:o=Xn}=e,a=i=>jo(P({},i,{theme:Gn(P({},i,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(i,l={})=>{Lr.internal_processStyles(i,b=>b.filter(I=>!(I!=null&&I.__mui_systemSx)));const{name:c,slot:d,skipVariantsResolver:u,skipSx:h,overridesResolver:w=yu(Os(d))}=l,v=ye(l,gu),x=u!==void 0?u:d&&d!=="Root"&&d!=="root"||!1,f=h||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Os(d||"Root")}`);let N=Xn;d==="Root"||d==="root"?N=r:d?N=o:vu(i)&&(N=void 0);const $=Lr(i,P({shouldForwardProp:N,label:m},v)),R=b=>typeof b=="function"&&b.__emotion_real!==b||bt(b)?I=>Yn(b,P({},I,{theme:Gn({theme:I.theme,defaultTheme:n,themeId:t})})):b,E=(b,...I)=>{let z=R(b);const Y=I?I.map(R):[];c&&w&&Y.push(k=>{const D=Gn(P({},k,{defaultTheme:n,themeId:t}));if(!D.components||!D.components[c]||!D.components[c].styleOverrides)return null;const M=D.components[c].styleOverrides,ee={};return Object.entries(M).forEach(([J,q])=>{ee[J]=Yn(q,P({},k,{theme:D}))}),w(k,ee)}),c&&!x&&Y.push(k=>{var D;const M=Gn(P({},k,{defaultTheme:n,themeId:t})),ee=M==null||(D=M.components)==null||(D=D[c])==null?void 0:D.variants;return Yn({variants:ee},P({},k,{theme:M}))}),f||Y.push(a);const C=Y.length-I.length;if(Array.isArray(b)&&C>0){const k=new Array(C).fill("");z=[...b,...k],z.raw=[...b.raw,...k]}const _=$(z,...Y);if(process.env.NODE_ENV!=="production"){let k;c&&(k=`${c}${Je(d||"")}`),k===void 0&&(k=`Styled(${qc(i)})`),_.displayName=k}return i.muiName&&(_.muiName=i.muiName),_};return $.withConfig&&(E.withConfig=$.withConfig),E}}function ku(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Wa(t.components[n].defaultProps,r)}function Eu({props:e,name:t,defaultTheme:n,themeId:r}){let o=ri(n);return r&&(o=o[r]||o),ku({theme:o,name:t,props:e})}function To(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),fd(e,t,n)}function ju(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function jt(e){if(e.type)return e;if(e.charAt(0)==="#")return jt(ju(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Gt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Gt(10,o))}else r=r.split(",");return r=r.map(a=>parseFloat(a)),{type:n,values:r,colorSpace:o}}function br(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,a)=>a<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Su(e){e=jt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,a=r*Math.min(o,1-o),i=(d,u=(d+n/30)%12)=>o-a*Math.max(Math.min(u-3,9-u,1),-1);let l="rgb";const c=[Math.round(i(0)*255),Math.round(i(8)*255),Math.round(i(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),br({type:l,values:c})}function Rs(e){e=jt(e);let t=e.type==="hsl"||e.type==="hsla"?jt(Su(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function _s(e,t){const n=Rs(e),r=Rs(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function oi(e,t){return e=jt(e),t=To(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,br(e)}function Tu(e,t){if(e=jt(e),t=To(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return br(e)}function Cu(e,t){if(e=jt(e),t=To(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return br(e)}function Ou(e,t){return P({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Ru={black:"#000",white:"#fff"},Tn=Ru,_u={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Pu=_u,Iu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Pt=Iu,$u={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},It=$u,Mu={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},cn=Mu,Du={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},$t=Du,Au={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Mt=Au,Bu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Dt=Bu,Vu=["mode","contrastThreshold","tonalOffset"],Ps={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:Tn.white,default:Tn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Ar={text:{primary:Tn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:Tn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Is(e,t,n,r){const o=r.light||r,a=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Cu(e.main,o):t==="dark"&&(e.dark=Tu(e.main,a)))}function Lu(e="light"){return e==="dark"?{main:$t[200],light:$t[50],dark:$t[400]}:{main:$t[700],light:$t[400],dark:$t[800]}}function Fu(e="light"){return e==="dark"?{main:Pt[200],light:Pt[50],dark:Pt[400]}:{main:Pt[500],light:Pt[300],dark:Pt[700]}}function zu(e="light"){return e==="dark"?{main:It[500],light:It[300],dark:It[700]}:{main:It[700],light:It[400],dark:It[800]}}function Gu(e="light"){return e==="dark"?{main:Mt[400],light:Mt[300],dark:Mt[700]}:{main:Mt[700],light:Mt[500],dark:Mt[900]}}function Uu(e="light"){return e==="dark"?{main:Dt[400],light:Dt[300],dark:Dt[700]}:{main:Dt[800],light:Dt[500],dark:Dt[900]}}function qu(e="light"){return e==="dark"?{main:cn[400],light:cn[300],dark:cn[700]}:{main:"#ed6c02",light:cn[500],dark:cn[900]}}function Hu(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ye(e,Vu),a=e.primary||Lu(t),i=e.secondary||Fu(t),l=e.error||zu(t),c=e.info||Gu(t),d=e.success||Uu(t),u=e.warning||qu(t);function h(f){const m=_s(f,Ar.text.primary)>=n?Ar.text.primary:Ps.text.primary;if(process.env.NODE_ENV!=="production"){const N=_s(f,m);N<3&&console.error([`MUI: The contrast ratio of ${N}:1 for ${m} on ${f}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const w=({color:f,name:m,mainShade:N=500,lightShade:$=300,darkShade:R=700})=>{if(f=P({},f),!f.main&&f[N]&&(f.main=f[N]),!f.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.`:Gt(11,m?` (${m})`:"",N));if(typeof f.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Gt(12,m?` (${m})`:"",JSON.stringify(f.main)));return Is(f,"light",$,r),Is(f,"dark",R,r),f.contrastText||(f.contrastText=h(f.main)),f},v={dark:Ar,light:Ps};return process.env.NODE_ENV!=="production"&&(v[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),tt(P({common:P({},Tn),mode:t,primary:w({color:a,name:"primary"}),secondary:w({color:i,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:w({color:l,name:"error"}),warning:w({color:u,name:"warning"}),info:w({color:c,name:"info"}),success:w({color:d,name:"success"}),grey:Pu,contrastThreshold:n,getContrastText:h,augmentColor:w,tonalOffset:r},v[t]),o)}const Xu=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Yu(e){return Math.round(e*1e5)/1e5}const $s={textTransform:"uppercase"},Ms='"Roboto", "Helvetica", "Arial", sans-serif';function Wu(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Ms,fontSize:o=14,fontWeightLight:a=300,fontWeightRegular:i=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:d=16,allVariants:u,pxToRem:h}=n,w=ye(n,Xu);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof d!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const v=o/14,x=h||(N=>`${N/d*v}rem`),f=(N,$,R,E,b)=>P({fontFamily:r,fontWeight:N,fontSize:x($),lineHeight:R},r===Ms?{letterSpacing:`${Yu(E/$)}em`}:{},b,u),m={h1:f(a,96,1.167,-1.5),h2:f(a,60,1.2,-.5),h3:f(i,48,1.167,0),h4:f(i,34,1.235,.25),h5:f(i,24,1.334,0),h6:f(l,20,1.6,.15),subtitle1:f(i,16,1.75,.15),subtitle2:f(l,14,1.57,.1),body1:f(i,16,1.5,.15),body2:f(i,14,1.43,.15),button:f(l,14,1.75,.4,$s),caption:f(i,12,1.66,.4),overline:f(i,12,2.66,1,$s),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return tt(P({htmlFontSize:d,pxToRem:x,fontFamily:r,fontSize:o,fontWeightLight:a,fontWeightRegular:i,fontWeightMedium:l,fontWeightBold:c},m),w,{clone:!1})}const Ku=.2,Ju=.14,Zu=.12;function me(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ku})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ju})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Zu})`].join(",")}const Qu=["none",me(0,2,1,-1,0,1,1,0,0,1,3,0),me(0,3,1,-2,0,2,2,0,0,1,5,0),me(0,3,3,-2,0,3,4,0,0,1,8,0),me(0,2,4,-1,0,4,5,0,0,1,10,0),me(0,3,5,-1,0,5,8,0,0,1,14,0),me(0,3,5,-1,0,6,10,0,0,1,18,0),me(0,4,5,-2,0,7,10,1,0,2,16,1),me(0,5,5,-3,0,8,10,1,0,3,14,2),me(0,5,6,-3,0,9,12,1,0,3,16,2),me(0,6,6,-3,0,10,14,1,0,4,18,3),me(0,6,7,-4,0,11,15,1,0,4,20,3),me(0,7,8,-4,0,12,17,2,0,5,22,4),me(0,7,8,-4,0,13,19,2,0,5,24,4),me(0,7,9,-4,0,14,21,2,0,5,26,4),me(0,8,9,-5,0,15,22,2,0,6,28,5),me(0,8,10,-5,0,16,24,2,0,6,30,5),me(0,8,11,-5,0,17,26,2,0,6,32,5),me(0,9,11,-5,0,18,28,2,0,7,34,6),me(0,9,12,-6,0,19,29,2,0,7,36,6),me(0,10,13,-6,0,20,31,3,0,8,38,7),me(0,10,13,-6,0,21,33,3,0,8,40,7),me(0,10,14,-6,0,22,35,3,0,8,42,7),me(0,11,14,-7,0,23,36,3,0,9,44,8),me(0,11,15,-7,0,24,38,3,0,9,46,8)],ep=Qu,tp=["duration","easing","delay"],np={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},rp={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Ds(e){return`${Math.round(e)}ms`}function op(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function sp(e){const t=P({},np,e.easing),n=P({},rp,e.duration);return P({getAutoHeightDuration:op,create:(o=["all"],a={})=>{const{duration:i=n.standard,easing:l=t.easeInOut,delay:c=0}=a,d=ye(a,tp);if(process.env.NODE_ENV!=="production"){const u=w=>typeof w=="string",h=w=>!isNaN(parseFloat(w));!u(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!h(i)&&!u(i)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`),u(l)||console.error('MUI: Argument "easing" must be a string.'),!h(c)&&!u(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof a!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(d).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(u=>`${u} ${typeof i=="string"?i:Ds(i)} ${l} ${typeof c=="string"?c:Ds(c)}`).join(",")}},e,{easing:t,duration:n})}const ap={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},ip=ap,lp=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function cp(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:a={}}=e,i=ye(e,lp);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Gt(18));const l=Hu(r),c=So(e);let d=tt(c,{mixins:Ou(c.breakpoints,n),palette:l,shadows:ep.slice(),typography:Wu(l,a),transitions:sp(o),zIndex:P({},ip)});if(d=tt(d,i),d=t.reduce((u,h)=>tt(u,h),d),process.env.NODE_ENV!=="production"){const u=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],h=(w,v)=>{let x;for(x in w){const f=w[x];if(u.indexOf(x)!==-1&&Object.keys(f).length>0){if(process.env.NODE_ENV!=="production"){const m=cr("",x);console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${x}\` internal state.`,"You can not override it like this: ",JSON.stringify(w,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:f}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}w[x]={}}}};Object.keys(d.components).forEach(w=>{const v=d.components[w].styleOverrides;v&&w.indexOf("Mui")===0&&h(v,w)})}return d.unstable_sxConfig=P({},Eo,i==null?void 0:i.unstable_sxConfig),d.unstable_sx=function(h){return jo({sx:h,theme:this})},d}const dp=cp(),Co=dp,Oo="$$material";function Ro({props:e,name:t}){return Eu({props:e,name:t,defaultTheme:Co,themeId:Oo})}const up=e=>Xn(e)&&e!=="classes",pp=Nu({themeId:Oo,defaultTheme:Co,rootShouldForwardProp:up}),Mn=pp;function wp(e){return cr("MuiSvgIcon",e)}Za("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const fp=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],mp=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Je(t)}`,`fontSize${Je(n)}`]};return yo(o,wp,r)},hp=Mn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Je(n.color)}`],t[`fontSize${Je(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,a,i,l,c,d,u,h,w,v,x;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((a=e.typography)==null||(i=a.pxToRem)==null?void 0:i.call(a,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((d=e.typography)==null||(u=d.pxToRem)==null?void 0:u.call(d,35))||"2.1875rem"}[t.fontSize],color:(h=(w=(e.vars||e).palette)==null||(w=w[t.color])==null?void 0:w.main)!=null?h:{action:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.active,disabled:(x=(e.vars||e).palette)==null||(x=x.action)==null?void 0:x.disabled,inherit:void 0}[t.color]}}),_o=A.forwardRef(function(t,n){const r=Ro({props:t,name:"MuiSvgIcon"}),{children:o,className:a,color:i="inherit",component:l="svg",fontSize:c="medium",htmlColor:d,inheritViewBox:u=!1,titleAccess:h,viewBox:w="0 0 24 24"}=r,v=ye(r,fp),x=A.isValidElement(o)&&o.type==="svg",f=P({},r,{color:i,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:u,viewBox:w,hasSvgAsChild:x}),m={};u||(m.viewBox=w);const N=mp(f);return s.jsxs(hp,P({as:l,className:at(N.root,a),focusable:"false",color:d,"aria-hidden":h?void 0:!0,role:h?"img":void 0,ref:n},m,v,x&&o.props,{ownerState:f,children:[x?o.props.children:o,h?s.jsx("title",{children:h}):null]}))});process.env.NODE_ENV!=="production"&&(_o.propTypes={children:p.node,classes:p.object,className:p.string,color:p.oneOfType([p.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),p.string]),component:p.elementType,fontSize:p.oneOfType([p.oneOf(["inherit","large","medium","small"]),p.string]),htmlColor:p.string,inheritViewBox:p.bool,shapeRendering:p.string,sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),titleAccess:p.string,viewBox:p.string});_o.muiName="SvgIcon";const As=_o;function si(e,t){function n(r,o){return s.jsx(As,P({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=As.muiName,A.memo(A.forwardRef(n))}const gp={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ka.configure(e)}},bp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Je,createChainedFunction:Xc,createSvgIcon:si,debounce:Yc,deprecatedPropType:Wc,isMuiElement:Kc,ownerDocument:Zn,ownerWindow:Jc,requirePropFactory:Zc,setRef:Qn,unstable_ClassNameGenerator:gp,unstable_useEnhancedEffect:Ut,unstable_useId:Ha,unsupportedProp:td,useControlled:Xa,useEventCallback:Hr,useForkRef:Et,useIsFocusVisible:Ya},Symbol.toStringTag,{value:"Module"})),vp=Tc(bp);var Bs;function xp(){return Bs||(Bs=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=vp}(Or)),Or}var yp=Cc;Object.defineProperty(bo,"__esModule",{value:!0});var ai=bo.default=void 0,Np=yp(xp()),kp=s;ai=bo.default=(0,Np.default)((0,kp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function Ep(e){return typeof e=="string"}function mn(e,t,n){return e===void 0||Ep(e)?t:P({},t,{ownerState:P({},t.ownerState,n)})}const jp={disableDefaultClasses:!1},Sp=A.createContext(jp);function Tp(e){const{disableDefaultClasses:t}=A.useContext(Sp);return n=>t?"":e(n)}function Cp(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Op(e,t,n){return typeof e=="function"?e(t,n):e}function Vs(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function Rp(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:a}=e;if(!t){const v=at(n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),x=P({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),f=P({},n,o,r);return v.length>0&&(f.className=v),Object.keys(x).length>0&&(f.style=x),{props:f,internalRef:void 0}}const i=Cp(P({},o,r)),l=Vs(r),c=Vs(o),d=t(i),u=at(d==null?void 0:d.className,n==null?void 0:n.className,a,o==null?void 0:o.className,r==null?void 0:r.className),h=P({},d==null?void 0:d.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),w=P({},d,n,c,l);return u.length>0&&(w.className=u),Object.keys(h).length>0&&(w.style=h),{props:w,internalRef:d.ref}}const _p=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Pp(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:a=!1}=e,i=ye(e,_p),l=a?{}:Op(r,o),{props:c,internalRef:d}=Rp(P({},i,{externalSlotProps:l})),u=Et(d,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return mn(n,P({},c,{ref:u}),o)}const ii="base";function Ip(e){return`${ii}--${e}`}function $p(e,t){return`${ii}-${e}-${t}`}function li(e,t){const n=Ja[t];return n?Ip(n):$p(e,t)}function Mp(e,t){const n={};return t.forEach(r=>{n[r]=li(e,r)}),n}function Dp(e){return typeof e=="function"?e():e}const tr=A.forwardRef(function(t,n){const{children:r,container:o,disablePortal:a=!1}=t,[i,l]=A.useState(null),c=Et(A.isValidElement(r)?r.ref:null,n);if(Ut(()=>{a||l(Dp(o)||document.body)},[o,a]),Ut(()=>{if(i&&!a)return Qn(n,i),()=>{Qn(n,null)}},[n,i,a]),a){if(A.isValidElement(r)){const d={ref:c};return A.cloneElement(r,d)}return s.jsx(A.Fragment,{children:r})}return s.jsx(A.Fragment,{children:i&&ml.createPortal(r,i)})});process.env.NODE_ENV!=="production"&&(tr.propTypes={children:p.node,container:p.oneOfType([Sn,p.func]),disablePortal:p.bool});process.env.NODE_ENV!=="production"&&(tr["propTypes"]=Lc(tr.propTypes));var Ce="top",ze="bottom",Ge="right",Oe="left",Po="auto",Dn=[Ce,ze,Ge,Oe],qt="start",Cn="end",Ap="clippingParents",ci="viewport",dn="popper",Bp="reference",Ls=Dn.reduce(function(e,t){return e.concat([t+"-"+qt,t+"-"+Cn])},[]),di=[].concat(Dn,[Po]).reduce(function(e,t){return e.concat([t,t+"-"+qt,t+"-"+Cn])},[]),Vp="beforeRead",Lp="read",Fp="afterRead",zp="beforeMain",Gp="main",Up="afterMain",qp="beforeWrite",Hp="write",Xp="afterWrite",Yp=[Vp,Lp,Fp,zp,Gp,Up,qp,Hp,Xp];function Ze(e){return e?(e.nodeName||"").toLowerCase():null}function Ae(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function St(e){var t=Ae(e).Element;return e instanceof t||e instanceof Element}function Fe(e){var t=Ae(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Io(e){if(typeof ShadowRoot>"u")return!1;var t=Ae(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Wp(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},a=t.elements[n];!Fe(a)||!Ze(a)||(Object.assign(a.style,r),Object.keys(o).forEach(function(i){var l=o[i];l===!1?a.removeAttribute(i):a.setAttribute(i,l===!0?"":l)}))})}function Kp(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],a=t.attributes[r]||{},i=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=i.reduce(function(c,d){return c[d]="",c},{});!Fe(o)||!Ze(o)||(Object.assign(o.style,l),Object.keys(a).forEach(function(c){o.removeAttribute(c)}))})}}const Jp={name:"applyStyles",enabled:!0,phase:"write",fn:Wp,effect:Kp,requires:["computeStyles"]};function We(e){return e.split("-")[0]}var vt=Math.max,nr=Math.min,Ht=Math.round;function Yr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function ui(){return!/^((?!chrome|android).)*safari/i.test(Yr())}function Xt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,a=1;t&&Fe(e)&&(o=e.offsetWidth>0&&Ht(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&Ht(r.height)/e.offsetHeight||1);var i=St(e)?Ae(e):window,l=i.visualViewport,c=!ui()&&n,d=(r.left+(c&&l?l.offsetLeft:0))/o,u=(r.top+(c&&l?l.offsetTop:0))/a,h=r.width/o,w=r.height/a;return{width:h,height:w,top:u,right:d+h,bottom:u+w,left:d,x:d,y:u}}function $o(e){var t=Xt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function pi(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Io(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function rt(e){return Ae(e).getComputedStyle(e)}function Zp(e){return["table","td","th"].indexOf(Ze(e))>=0}function ct(e){return((St(e)?e.ownerDocument:e.document)||window.document).documentElement}function vr(e){return Ze(e)==="html"?e:e.assignedSlot||e.parentNode||(Io(e)?e.host:null)||ct(e)}function Fs(e){return!Fe(e)||rt(e).position==="fixed"?null:e.offsetParent}function Qp(e){var t=/firefox/i.test(Yr()),n=/Trident/i.test(Yr());if(n&&Fe(e)){var r=rt(e);if(r.position==="fixed")return null}var o=vr(e);for(Io(o)&&(o=o.host);Fe(o)&&["html","body"].indexOf(Ze(o))<0;){var a=rt(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function An(e){for(var t=Ae(e),n=Fs(e);n&&Zp(n)&&rt(n).position==="static";)n=Fs(n);return n&&(Ze(n)==="html"||Ze(n)==="body"&&rt(n).position==="static")?t:n||Qp(e)||t}function Mo(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function xn(e,t,n){return vt(e,nr(t,n))}function ew(e,t,n){var r=xn(e,t,n);return r>n?n:r}function wi(){return{top:0,right:0,bottom:0,left:0}}function fi(e){return Object.assign({},wi(),e)}function mi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var tw=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,fi(typeof t!="number"?t:mi(t,Dn))};function nw(e){var t,n=e.state,r=e.name,o=e.options,a=n.elements.arrow,i=n.modifiersData.popperOffsets,l=We(n.placement),c=Mo(l),d=[Oe,Ge].indexOf(l)>=0,u=d?"height":"width";if(!(!a||!i)){var h=tw(o.padding,n),w=$o(a),v=c==="y"?Ce:Oe,x=c==="y"?ze:Ge,f=n.rects.reference[u]+n.rects.reference[c]-i[c]-n.rects.popper[u],m=i[c]-n.rects.reference[c],N=An(a),$=N?c==="y"?N.clientHeight||0:N.clientWidth||0:0,R=f/2-m/2,E=h[v],b=$-w[u]-h[x],I=$/2-w[u]/2+R,z=xn(E,I,b),Y=c;n.modifiersData[r]=(t={},t[Y]=z,t.centerOffset=z-I,t)}}function rw(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||pi(t.elements.popper,o)&&(t.elements.arrow=o))}const ow={name:"arrow",enabled:!0,phase:"main",fn:nw,effect:rw,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yt(e){return e.split("-")[1]}var sw={top:"auto",right:"auto",bottom:"auto",left:"auto"};function aw(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Ht(n*o)/o||0,y:Ht(r*o)/o||0}}function zs(e){var t,n=e.popper,r=e.popperRect,o=e.placement,a=e.variation,i=e.offsets,l=e.position,c=e.gpuAcceleration,d=e.adaptive,u=e.roundOffsets,h=e.isFixed,w=i.x,v=w===void 0?0:w,x=i.y,f=x===void 0?0:x,m=typeof u=="function"?u({x:v,y:f}):{x:v,y:f};v=m.x,f=m.y;var N=i.hasOwnProperty("x"),$=i.hasOwnProperty("y"),R=Oe,E=Ce,b=window;if(d){var I=An(n),z="clientHeight",Y="clientWidth";if(I===Ae(n)&&(I=ct(n),rt(I).position!=="static"&&l==="absolute"&&(z="scrollHeight",Y="scrollWidth")),I=I,o===Ce||(o===Oe||o===Ge)&&a===Cn){E=ze;var C=h&&I===b&&b.visualViewport?b.visualViewport.height:I[z];f-=C-r.height,f*=c?1:-1}if(o===Oe||(o===Ce||o===ze)&&a===Cn){R=Ge;var _=h&&I===b&&b.visualViewport?b.visualViewport.width:I[Y];v-=_-r.width,v*=c?1:-1}}var k=Object.assign({position:l},d&&sw),D=u===!0?aw({x:v,y:f},Ae(n)):{x:v,y:f};if(v=D.x,f=D.y,c){var M;return Object.assign({},k,(M={},M[E]=$?"0":"",M[R]=N?"0":"",M.transform=(b.devicePixelRatio||1)<=1?"translate("+v+"px, "+f+"px)":"translate3d("+v+"px, "+f+"px, 0)",M))}return Object.assign({},k,(t={},t[E]=$?f+"px":"",t[R]=N?v+"px":"",t.transform="",t))}function iw(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,a=n.adaptive,i=a===void 0?!0:a,l=n.roundOffsets,c=l===void 0?!0:l,d={placement:We(t.placement),variation:Yt(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,zs(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,zs(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const lw={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:iw,data:{}};var Un={passive:!0};function cw(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,a=o===void 0?!0:o,i=r.resize,l=i===void 0?!0:i,c=Ae(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(u){u.addEventListener("scroll",n.update,Un)}),l&&c.addEventListener("resize",n.update,Un),function(){a&&d.forEach(function(u){u.removeEventListener("scroll",n.update,Un)}),l&&c.removeEventListener("resize",n.update,Un)}}const dw={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:cw,data:{}};var uw={left:"right",right:"left",bottom:"top",top:"bottom"};function Wn(e){return e.replace(/left|right|bottom|top/g,function(t){return uw[t]})}var pw={start:"end",end:"start"};function Gs(e){return e.replace(/start|end/g,function(t){return pw[t]})}function Do(e){var t=Ae(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Ao(e){return Xt(ct(e)).left+Do(e).scrollLeft}function ww(e,t){var n=Ae(e),r=ct(e),o=n.visualViewport,a=r.clientWidth,i=r.clientHeight,l=0,c=0;if(o){a=o.width,i=o.height;var d=ui();(d||!d&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:a,height:i,x:l+Ao(e),y:c}}function fw(e){var t,n=ct(e),r=Do(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=vt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),i=vt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Ao(e),c=-r.scrollTop;return rt(o||n).direction==="rtl"&&(l+=vt(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:i,x:l,y:c}}function Bo(e){var t=rt(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function hi(e){return["html","body","#document"].indexOf(Ze(e))>=0?e.ownerDocument.body:Fe(e)&&Bo(e)?e:hi(vr(e))}function yn(e,t){var n;t===void 0&&(t=[]);var r=hi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),a=Ae(r),i=o?[a].concat(a.visualViewport||[],Bo(r)?r:[]):r,l=t.concat(i);return o?l:l.concat(yn(vr(i)))}function Wr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function mw(e,t){var n=Xt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Us(e,t,n){return t===ci?Wr(ww(e,n)):St(t)?mw(t,n):Wr(fw(ct(e)))}function hw(e){var t=yn(vr(e)),n=["absolute","fixed"].indexOf(rt(e).position)>=0,r=n&&Fe(e)?An(e):e;return St(r)?t.filter(function(o){return St(o)&&pi(o,r)&&Ze(o)!=="body"}):[]}function gw(e,t,n,r){var o=t==="clippingParents"?hw(e):[].concat(t),a=[].concat(o,[n]),i=a[0],l=a.reduce(function(c,d){var u=Us(e,d,r);return c.top=vt(u.top,c.top),c.right=nr(u.right,c.right),c.bottom=nr(u.bottom,c.bottom),c.left=vt(u.left,c.left),c},Us(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function gi(e){var t=e.reference,n=e.element,r=e.placement,o=r?We(r):null,a=r?Yt(r):null,i=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Ce:c={x:i,y:t.y-n.height};break;case ze:c={x:i,y:t.y+t.height};break;case Ge:c={x:t.x+t.width,y:l};break;case Oe:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var d=o?Mo(o):null;if(d!=null){var u=d==="y"?"height":"width";switch(a){case qt:c[d]=c[d]-(t[u]/2-n[u]/2);break;case Cn:c[d]=c[d]+(t[u]/2-n[u]/2);break}}return c}function On(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,a=n.strategy,i=a===void 0?e.strategy:a,l=n.boundary,c=l===void 0?Ap:l,d=n.rootBoundary,u=d===void 0?ci:d,h=n.elementContext,w=h===void 0?dn:h,v=n.altBoundary,x=v===void 0?!1:v,f=n.padding,m=f===void 0?0:f,N=fi(typeof m!="number"?m:mi(m,Dn)),$=w===dn?Bp:dn,R=e.rects.popper,E=e.elements[x?$:w],b=gw(St(E)?E:E.contextElement||ct(e.elements.popper),c,u,i),I=Xt(e.elements.reference),z=gi({reference:I,element:R,strategy:"absolute",placement:o}),Y=Wr(Object.assign({},R,z)),C=w===dn?Y:I,_={top:b.top-C.top+N.top,bottom:C.bottom-b.bottom+N.bottom,left:b.left-C.left+N.left,right:C.right-b.right+N.right},k=e.modifiersData.offset;if(w===dn&&k){var D=k[o];Object.keys(_).forEach(function(M){var ee=[Ge,ze].indexOf(M)>=0?1:-1,J=[Ce,ze].indexOf(M)>=0?"y":"x";_[M]+=D[J]*ee})}return _}function bw(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,a=n.rootBoundary,i=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,d=c===void 0?di:c,u=Yt(r),h=u?l?Ls:Ls.filter(function(x){return Yt(x)===u}):Dn,w=h.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=h);var v=w.reduce(function(x,f){return x[f]=On(e,{placement:f,boundary:o,rootBoundary:a,padding:i})[We(f)],x},{});return Object.keys(v).sort(function(x,f){return v[x]-v[f]})}function vw(e){if(We(e)===Po)return[];var t=Wn(e);return[Gs(e),t,Gs(t)]}function xw(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,a=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!0:i,c=n.fallbackPlacements,d=n.padding,u=n.boundary,h=n.rootBoundary,w=n.altBoundary,v=n.flipVariations,x=v===void 0?!0:v,f=n.allowedAutoPlacements,m=t.options.placement,N=We(m),$=N===m,R=c||($||!x?[Wn(m)]:vw(m)),E=[m].concat(R).reduce(function(F,W){return F.concat(We(W)===Po?bw(t,{placement:W,boundary:u,rootBoundary:h,padding:d,flipVariations:x,allowedAutoPlacements:f}):W)},[]),b=t.rects.reference,I=t.rects.popper,z=new Map,Y=!0,C=E[0],_=0;_<E.length;_++){var k=E[_],D=We(k),M=Yt(k)===qt,ee=[Ce,ze].indexOf(D)>=0,J=ee?"width":"height",q=On(t,{placement:k,boundary:u,rootBoundary:h,altBoundary:w,padding:d}),te=ee?M?Ge:Oe:M?ze:Ce;b[J]>I[J]&&(te=Wn(te));var oe=Wn(te),se=[];if(a&&se.push(q[D]<=0),l&&se.push(q[te]<=0,q[oe]<=0),se.every(function(F){return F})){C=k,Y=!1;break}z.set(k,se)}if(Y)for(var y=x?3:1,O=function(W){var V=E.find(function(K){var X=z.get(K);if(X)return X.slice(0,W).every(function(Z){return Z})});if(V)return C=V,"break"},U=y;U>0;U--){var G=O(U);if(G==="break")break}t.placement!==C&&(t.modifiersData[r]._skip=!0,t.placement=C,t.reset=!0)}}const yw={name:"flip",enabled:!0,phase:"main",fn:xw,requiresIfExists:["offset"],data:{_skip:!1}};function qs(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Hs(e){return[Ce,Ge,ze,Oe].some(function(t){return e[t]>=0})}function Nw(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,i=On(t,{elementContext:"reference"}),l=On(t,{altBoundary:!0}),c=qs(i,r),d=qs(l,o,a),u=Hs(c),h=Hs(d);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:d,isReferenceHidden:u,hasPopperEscaped:h},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":h})}const kw={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Nw};function Ew(e,t,n){var r=We(e),o=[Oe,Ce].indexOf(r)>=0?-1:1,a=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,i=a[0],l=a[1];return i=i||0,l=(l||0)*o,[Oe,Ge].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}function jw(e){var t=e.state,n=e.options,r=e.name,o=n.offset,a=o===void 0?[0,0]:o,i=di.reduce(function(u,h){return u[h]=Ew(h,t.rects,a),u},{}),l=i[t.placement],c=l.x,d=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=d),t.modifiersData[r]=i}const Sw={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:jw};function Tw(e){var t=e.state,n=e.name;t.modifiersData[n]=gi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Cw={name:"popperOffsets",enabled:!0,phase:"read",fn:Tw,data:{}};function Ow(e){return e==="x"?"y":"x"}function Rw(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,a=o===void 0?!0:o,i=n.altAxis,l=i===void 0?!1:i,c=n.boundary,d=n.rootBoundary,u=n.altBoundary,h=n.padding,w=n.tether,v=w===void 0?!0:w,x=n.tetherOffset,f=x===void 0?0:x,m=On(t,{boundary:c,rootBoundary:d,padding:h,altBoundary:u}),N=We(t.placement),$=Yt(t.placement),R=!$,E=Mo(N),b=Ow(E),I=t.modifiersData.popperOffsets,z=t.rects.reference,Y=t.rects.popper,C=typeof f=="function"?f(Object.assign({},t.rects,{placement:t.placement})):f,_=typeof C=="number"?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),k=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,D={x:0,y:0};if(I){if(a){var M,ee=E==="y"?Ce:Oe,J=E==="y"?ze:Ge,q=E==="y"?"height":"width",te=I[E],oe=te+m[ee],se=te-m[J],y=v?-Y[q]/2:0,O=$===qt?z[q]:Y[q],U=$===qt?-Y[q]:-z[q],G=t.elements.arrow,F=v&&G?$o(G):{width:0,height:0},W=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:wi(),V=W[ee],K=W[J],X=xn(0,z[q],F[q]),Z=R?z[q]/2-y-X-V-_.mainAxis:O-X-V-_.mainAxis,T=R?-z[q]/2+y+X+K+_.mainAxis:U+X+K+_.mainAxis,L=t.elements.arrow&&An(t.elements.arrow),j=L?E==="y"?L.clientTop||0:L.clientLeft||0:0,we=(M=k==null?void 0:k[E])!=null?M:0,B=te+Z-we-j,xe=te+T-we,qe=xn(v?nr(oe,B):oe,te,v?vt(se,xe):se);I[E]=qe,D[E]=qe-te}if(l){var ut,Ee=E==="x"?Ce:Oe,Bn=E==="x"?ze:Ge,He=I[b],Ct=b==="y"?"height":"width",pt=He+m[Ee],Ot=He-m[Bn],Rt=[Ce,Oe].indexOf(N)!==-1,_t=(ut=k==null?void 0:k[b])!=null?ut:0,wt=Rt?pt:He-z[Ct]-Y[Ct]-_t+_.altAxis,tn=Rt?He+z[Ct]+Y[Ct]-_t-_.altAxis:Ot,Vn=v&&Rt?ew(wt,He,tn):xn(v?wt:pt,He,v?tn:Ot);I[b]=Vn,D[b]=Vn-He}t.modifiersData[r]=D}}const _w={name:"preventOverflow",enabled:!0,phase:"main",fn:Rw,requiresIfExists:["offset"]};function Pw(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Iw(e){return e===Ae(e)||!Fe(e)?Do(e):Pw(e)}function $w(e){var t=e.getBoundingClientRect(),n=Ht(t.width)/e.offsetWidth||1,r=Ht(t.height)/e.offsetHeight||1;return n!==1||r!==1}function Mw(e,t,n){n===void 0&&(n=!1);var r=Fe(t),o=Fe(t)&&$w(t),a=ct(t),i=Xt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ze(t)!=="body"||Bo(a))&&(l=Iw(t)),Fe(t)?(c=Xt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):a&&(c.x=Ao(a))),{x:i.left+l.scrollLeft-c.x,y:i.top+l.scrollTop-c.y,width:i.width,height:i.height}}function Dw(e){var t=new Map,n=new Set,r=[];e.forEach(function(a){t.set(a.name,a)});function o(a){n.add(a.name);var i=[].concat(a.requires||[],a.requiresIfExists||[]);i.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(a)}return e.forEach(function(a){n.has(a.name)||o(a)}),r}function Aw(e){var t=Dw(e);return Yp.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Bw(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Vw(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Xs={placement:"bottom",modifiers:[],strategy:"absolute"};function Ys(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function Lw(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,a=o===void 0?Xs:o;return function(l,c,d){d===void 0&&(d=a);var u={placement:"bottom",orderedModifiers:[],options:Object.assign({},Xs,a),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},h=[],w=!1,v={state:u,setOptions:function(N){var $=typeof N=="function"?N(u.options):N;f(),u.options=Object.assign({},a,u.options,$),u.scrollParents={reference:St(l)?yn(l):l.contextElement?yn(l.contextElement):[],popper:yn(c)};var R=Aw(Vw([].concat(r,u.options.modifiers)));return u.orderedModifiers=R.filter(function(E){return E.enabled}),x(),v.update()},forceUpdate:function(){if(!w){var N=u.elements,$=N.reference,R=N.popper;if(Ys($,R)){u.rects={reference:Mw($,An(R),u.options.strategy==="fixed"),popper:$o(R)},u.reset=!1,u.placement=u.options.placement,u.orderedModifiers.forEach(function(_){return u.modifiersData[_.name]=Object.assign({},_.data)});for(var E=0;E<u.orderedModifiers.length;E++){if(u.reset===!0){u.reset=!1,E=-1;continue}var b=u.orderedModifiers[E],I=b.fn,z=b.options,Y=z===void 0?{}:z,C=b.name;typeof I=="function"&&(u=I({state:u,options:Y,name:C,instance:v})||u)}}}},update:Bw(function(){return new Promise(function(m){v.forceUpdate(),m(u)})}),destroy:function(){f(),w=!0}};if(!Ys(l,c))return v;v.setOptions(d).then(function(m){!w&&d.onFirstUpdate&&d.onFirstUpdate(m)});function x(){u.orderedModifiers.forEach(function(m){var N=m.name,$=m.options,R=$===void 0?{}:$,E=m.effect;if(typeof E=="function"){var b=E({state:u,name:N,instance:v,options:R}),I=function(){};h.push(b||I)}})}function f(){h.forEach(function(m){return m()}),h=[]}return v}}var Fw=[dw,Cw,lw,Jp,Sw,yw,_w,ow,kw],zw=Lw({defaultModifiers:Fw});const bi="Popper";function Gw(e){return li(bi,e)}Mp(bi,["root"]);const Uw=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],qw=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Hw(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function rr(e){return typeof e=="function"?e():e}function xr(e){return e.nodeType!==void 0}function Xw(e){return!xr(e)}const Yw=()=>yo({root:["root"]},Tp(Gw)),Ww={},Kw=A.forwardRef(function(t,n){var r;const{anchorEl:o,children:a,direction:i,disablePortal:l,modifiers:c,open:d,placement:u,popperOptions:h,popperRef:w,slotProps:v={},slots:x={},TransitionProps:f}=t,m=ye(t,Uw),N=A.useRef(null),$=Et(N,n),R=A.useRef(null),E=Et(R,w),b=A.useRef(E);Ut(()=>{b.current=E},[E]),A.useImperativeHandle(w,()=>R.current,[]);const I=Hw(u,i),[z,Y]=A.useState(I),[C,_]=A.useState(rr(o));A.useEffect(()=>{R.current&&R.current.forceUpdate()}),A.useEffect(()=>{o&&_(rr(o))},[o]),Ut(()=>{if(!C||!d)return;const J=oe=>{Y(oe.placement)};if(process.env.NODE_ENV!=="production"&&C&&xr(C)&&C.nodeType===1){const oe=C.getBoundingClientRect();process.env.NODE_ENV!=="test"&&oe.top===0&&oe.left===0&&oe.right===0&&oe.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let q=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:oe})=>{J(oe)}}];c!=null&&(q=q.concat(c)),h&&h.modifiers!=null&&(q=q.concat(h.modifiers));const te=zw(C,N.current,P({placement:I},h,{modifiers:q}));return b.current(te),()=>{te.destroy(),b.current(null)}},[C,l,c,d,h,I]);const k={placement:z};f!==null&&(k.TransitionProps=f);const D=Yw(),M=(r=x.root)!=null?r:"div",ee=Pp({elementType:M,externalSlotProps:v.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:D.root});return s.jsx(M,P({},ee,{children:typeof a=="function"?a(k):a}))}),vi=A.forwardRef(function(t,n){const{anchorEl:r,children:o,container:a,direction:i="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:d,open:u,placement:h="bottom",popperOptions:w=Ww,popperRef:v,style:x,transition:f=!1,slotProps:m={},slots:N={}}=t,$=ye(t,qw),[R,E]=A.useState(!0),b=()=>{E(!1)},I=()=>{E(!0)};if(!c&&!u&&(!f||R))return null;let z;if(a)z=a;else if(r){const _=rr(r);z=_&&xr(_)?Zn(_).body:Zn(null).body}const Y=!u&&c&&(!f||R)?"none":void 0,C=f?{in:u,onEnter:b,onExited:I}:void 0;return s.jsx(tr,{disablePortal:l,container:z,children:s.jsx(Kw,P({anchorEl:r,direction:i,disablePortal:l,modifiers:d,ref:n,open:f?!R:u,placement:h,popperOptions:w,popperRef:v,slotProps:m,slots:N},$,{style:P({position:"fixed",top:0,left:0,display:Y},x),TransitionProps:C,children:o}))})});process.env.NODE_ENV!=="production"&&(vi.propTypes={anchorEl:vo(p.oneOfType([Sn,p.object,p.func]),e=>{if(e.open){const t=rr(e.anchorEl);if(t&&xr(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||Xw(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:p.oneOfType([p.node,p.func]),container:p.oneOfType([Sn,p.func]),direction:p.oneOf(["ltr","rtl"]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:qa,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),transition:p.bool});function xi(){const e=ri(Co);return process.env.NODE_ENV!=="production"&&A.useDebugValue(e),e[Oo]||e}function Kr(e,t){return Kr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Kr(e,t)}function Jw(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Kr(e,t)}const Ws={disabled:!1};var Zw=process.env.NODE_ENV!=="production"?p.oneOfType([p.number,p.shape({enter:p.number,exit:p.number,appear:p.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&p.oneOfType([p.string,p.shape({enter:p.string,exit:p.string,active:p.string}),p.shape({enter:p.string,enterDone:p.string,enterActive:p.string,exit:p.string,exitDone:p.string,exitActive:p.string})]);const yi=g.createContext(null);var Qw=function(t){return t.scrollTop},hn="unmounted",ht="exited",gt="entering",Bt="entered",Jr="exiting",ot=function(e){Jw(t,e);function t(r,o){var a;a=e.call(this,r,o)||this;var i=o,l=i&&!i.isMounting?r.enter:r.appear,c;return a.appearStatus=null,r.in?l?(c=ht,a.appearStatus=gt):c=Bt:r.unmountOnExit||r.mountOnEnter?c=hn:c=ht,a.state={status:c},a.nextCallback=null,a}t.getDerivedStateFromProps=function(o,a){var i=o.in;return i&&a.status===hn?{status:ht}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var a=null;if(o!==this.props){var i=this.state.status;this.props.in?i!==gt&&i!==Bt&&(a=gt):(i===gt||i===Bt)&&(a=Jr)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,a,i,l;return a=i=l=o,o!=null&&typeof o!="number"&&(a=o.exit,i=o.enter,l=o.appear!==void 0?o.appear:i),{exit:a,enter:i,appear:l}},n.updateStatus=function(o,a){if(o===void 0&&(o=!1),a!==null)if(this.cancelNextCallback(),a===gt){if(this.props.unmountOnExit||this.props.mountOnEnter){var i=this.props.nodeRef?this.props.nodeRef.current:pn.findDOMNode(this);i&&Qw(i)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===ht&&this.setState({status:hn})},n.performEnter=function(o){var a=this,i=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[pn.findDOMNode(this),l],d=c[0],u=c[1],h=this.getTimeouts(),w=l?h.appear:h.enter;if(!o&&!i||Ws.disabled){this.safeSetState({status:Bt},function(){a.props.onEntered(d)});return}this.props.onEnter(d,u),this.safeSetState({status:gt},function(){a.props.onEntering(d,u),a.onTransitionEnd(w,function(){a.safeSetState({status:Bt},function(){a.props.onEntered(d,u)})})})},n.performExit=function(){var o=this,a=this.props.exit,i=this.getTimeouts(),l=this.props.nodeRef?void 0:pn.findDOMNode(this);if(!a||Ws.disabled){this.safeSetState({status:ht},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Jr},function(){o.props.onExiting(l),o.onTransitionEnd(i.exit,function(){o.safeSetState({status:ht},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,a){a=this.setNextCallback(a),this.setState(o,a)},n.setNextCallback=function(o){var a=this,i=!0;return this.nextCallback=function(l){i&&(i=!1,a.nextCallback=null,o(l))},this.nextCallback.cancel=function(){i=!1},this.nextCallback},n.onTransitionEnd=function(o,a){this.setNextCallback(a);var i=this.props.nodeRef?this.props.nodeRef.current:pn.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!i||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[i,this.nextCallback],d=c[0],u=c[1];this.props.addEndListener(d,u)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===hn)return null;var a=this.props,i=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var l=ye(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return g.createElement(yi.Provider,{value:null},typeof i=="function"?i(o,l):g.cloneElement(g.Children.only(i),l))},t}(g.Component);ot.contextType=yi;ot.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:p.shape({current:typeof Element>"u"?p.any:function(e,t,n,r,o,a){var i=e[t];return p.instanceOf(i&&"ownerDocument"in i?i.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,a)}}),children:p.oneOfType([p.func.isRequired,p.element.isRequired]).isRequired,in:p.bool,mountOnEnter:p.bool,unmountOnExit:p.bool,appear:p.bool,enter:p.bool,exit:p.bool,timeout:function(t){var n=Zw;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return n.apply(void 0,[t].concat(o))},addEndListener:p.func,onEnter:p.func,onEntering:p.func,onEntered:p.func,onExit:p.func,onExiting:p.func,onExited:p.func}:{};function At(){}ot.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:At,onEntering:At,onEntered:At,onExit:At,onExiting:At,onExited:At};ot.UNMOUNTED=hn;ot.EXITED=ht;ot.ENTERING=gt;ot.ENTERED=Bt;ot.EXITING=Jr;const ef=ot,tf=e=>e.scrollTop;function Ks(e,t){var n,r;const{timeout:o,easing:a,style:i={}}=e;return{duration:(n=i.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=i.transitionTimingFunction)!=null?r:typeof a=="object"?a[t.mode]:a,delay:i.transitionDelay}}const nf=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Zr(e){return`scale(${e}, ${e**2})`}const rf={entering:{opacity:1,transform:Zr(1)},entered:{opacity:1,transform:"none"}},Br=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Vo=A.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:a,easing:i,in:l,onEnter:c,onEntered:d,onEntering:u,onExit:h,onExited:w,onExiting:v,style:x,timeout:f="auto",TransitionComponent:m=ef}=t,N=ye(t,nf),$=fn(),R=A.useRef(),E=xi(),b=A.useRef(null),I=Et(b,a.ref,n),z=J=>q=>{if(J){const te=b.current;q===void 0?J(te):J(te,q)}},Y=z(u),C=z((J,q)=>{tf(J);const{duration:te,delay:oe,easing:se}=Ks({style:x,timeout:f,easing:i},{mode:"enter"});let y;f==="auto"?(y=E.transitions.getAutoHeightDuration(J.clientHeight),R.current=y):y=te,J.style.transition=[E.transitions.create("opacity",{duration:y,delay:oe}),E.transitions.create("transform",{duration:Br?y:y*.666,delay:oe,easing:se})].join(","),c&&c(J,q)}),_=z(d),k=z(v),D=z(J=>{const{duration:q,delay:te,easing:oe}=Ks({style:x,timeout:f,easing:i},{mode:"exit"});let se;f==="auto"?(se=E.transitions.getAutoHeightDuration(J.clientHeight),R.current=se):se=q,J.style.transition=[E.transitions.create("opacity",{duration:se,delay:te}),E.transitions.create("transform",{duration:Br?se:se*.666,delay:Br?te:te||se*.333,easing:oe})].join(","),J.style.opacity=0,J.style.transform=Zr(.75),h&&h(J)}),M=z(w),ee=J=>{f==="auto"&&$.start(R.current||0,J),r&&r(b.current,J)};return s.jsx(m,P({appear:o,in:l,nodeRef:b,onEnter:C,onEntered:_,onEntering:Y,onExit:D,onExited:M,onExiting:k,addEndListener:ee,timeout:f==="auto"?null:f},N,{children:(J,q)=>A.cloneElement(a,P({style:P({opacity:0,transform:Zr(.75),visibility:J==="exited"&&!l?"hidden":void 0},rf[J],x,a.props.style),ref:I},q))}))});process.env.NODE_ENV!=="production"&&(Vo.propTypes={addEndListener:p.func,appear:p.bool,children:Ga.isRequired,easing:p.oneOfType([p.shape({enter:p.string,exit:p.string}),p.string]),in:p.bool,onEnter:p.func,onEntered:p.func,onEntering:p.func,onExit:p.func,onExited:p.func,onExiting:p.func,style:p.object,timeout:p.oneOfType([p.oneOf(["auto"]),p.number,p.shape({appear:p.number,enter:p.number,exit:p.number})])});Vo.muiSupportAuto=!0;const Js=Vo,of=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],sf=Mn(vi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ni=A.forwardRef(function(t,n){var r;const o=ni(),a=Ro({props:t,name:"MuiPopper"}),{anchorEl:i,component:l,components:c,componentsProps:d,container:u,disablePortal:h,keepMounted:w,modifiers:v,open:x,placement:f,popperOptions:m,popperRef:N,transition:$,slots:R,slotProps:E}=a,b=ye(a,of),I=(r=R==null?void 0:R.root)!=null?r:c==null?void 0:c.Root,z=P({anchorEl:i,container:u,disablePortal:h,keepMounted:w,modifiers:v,open:x,placement:f,popperOptions:m,popperRef:N,transition:$},b);return s.jsx(sf,P({as:l,direction:o==null?void 0:o.direction,slots:{root:I},slotProps:E??d},z,{ref:n}))});process.env.NODE_ENV!=="production"&&(Ni.propTypes={anchorEl:p.oneOfType([Sn,p.object,p.func]),children:p.oneOfType([p.node,p.func]),component:p.elementType,components:p.shape({Root:p.elementType}),componentsProps:p.shape({root:p.oneOfType([p.func,p.object])}),container:p.oneOfType([Sn,p.func]),disablePortal:p.bool,keepMounted:p.bool,modifiers:p.arrayOf(p.shape({data:p.object,effect:p.func,enabled:p.bool,fn:p.func,name:p.any,options:p.object,phase:p.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:p.arrayOf(p.string),requiresIfExists:p.arrayOf(p.string)})),open:p.bool.isRequired,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:p.shape({modifiers:p.array,onFirstUpdate:p.func,placement:p.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:p.oneOf(["absolute","fixed"])}),popperRef:qa,slotProps:p.shape({root:p.oneOfType([p.func,p.object])}),slots:p.shape({root:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),transition:p.bool});const ki=Ni;function af(e){return cr("MuiTooltip",e)}const lf=Za("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),it=lf,cf=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function df(e){return Math.round(e*1e5)/1e5}const uf=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:a}=e,i={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Je(a.split("-")[0])}`],arrow:["arrow"]};return yo(i,af,t)},pf=Mn(ki,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>P({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${it.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${it.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${it.arrow}`]:P({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${it.arrow}`]:P({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),wf=Mn("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>P({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:oi(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${df(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${it.popper}[data-popper-placement*="left"] &`]:P({transformOrigin:"right center"},t.isRtl?P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):P({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${it.popper}[data-popper-placement*="right"] &`]:P({transformOrigin:"left center"},t.isRtl?P({marginRight:"14px"},t.touch&&{marginRight:"24px"}):P({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${it.popper}[data-popper-placement*="top"] &`]:P({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${it.popper}[data-popper-placement*="bottom"] &`]:P({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),ff=Mn("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:oi(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let qn=!1;const Zs=new Pn;let un={x:0,y:0};function Hn(e,t){return n=>{t&&t(n),e(n)}}const Ei=A.forwardRef(function(t,n){var r,o,a,i,l,c,d,u,h,w,v,x,f,m,N,$,R,E,b;const I=Ro({props:t,name:"MuiTooltip"}),{arrow:z=!1,children:Y,components:C={},componentsProps:_={},describeChild:k=!1,disableFocusListener:D=!1,disableHoverListener:M=!1,disableInteractive:ee=!1,disableTouchListener:J=!1,enterDelay:q=100,enterNextDelay:te=0,enterTouchDelay:oe=700,followCursor:se=!1,id:y,leaveDelay:O=0,leaveTouchDelay:U=1500,onClose:G,onOpen:F,open:W,placement:V="bottom",PopperComponent:K,PopperProps:X={},slotProps:Z={},slots:T={},title:L,TransitionComponent:j=Js,TransitionProps:we}=I,B=ye(I,cf),xe=A.isValidElement(Y)?Y:s.jsx("span",{children:Y}),qe=xi(),ut=qe.direction==="rtl",[Ee,Bn]=A.useState(),[He,Ct]=A.useState(null),pt=A.useRef(!1),Ot=ee||se,Rt=fn(),_t=fn(),wt=fn(),tn=fn(),[Vn,Ho]=Xa({controlled:W,default:!1,name:"Tooltip",state:"open"});let Qe=Vn;if(process.env.NODE_ENV!=="production"){const{current:ne}=A.useRef(W!==void 0);A.useEffect(()=>{Ee&&Ee.disabled&&!ne&&L!==""&&Ee.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[L,Ee,ne])}const yr=Ha(y),nn=A.useRef(),Ln=Hr(()=>{nn.current!==void 0&&(document.body.style.WebkitUserSelect=nn.current,nn.current=void 0),tn.clear()});A.useEffect(()=>Ln,[Ln]);const Xo=ne=>{Zs.clear(),qn=!0,Ho(!0),F&&!Qe&&F(ne)},Fn=Hr(ne=>{Zs.start(800+O,()=>{qn=!1}),Ho(!1),G&&Qe&&G(ne),Rt.start(qe.transitions.duration.shortest,()=>{pt.current=!1})}),Nr=ne=>{pt.current&&ne.type!=="touchstart"||(Ee&&Ee.removeAttribute("title"),_t.clear(),wt.clear(),q||qn&&te?_t.start(qn?te:q,()=>{Xo(ne)}):Xo(ne))},Yo=ne=>{_t.clear(),wt.start(O,()=>{Fn(ne)})},{isFocusVisibleRef:Wo,onBlur:zi,onFocus:Gi,ref:Ui}=Ya(),[,Ko]=A.useState(!1),Jo=ne=>{zi(ne),Wo.current===!1&&(Ko(!1),Yo(ne))},Zo=ne=>{Ee||Bn(ne.currentTarget),Gi(ne),Wo.current===!0&&(Ko(!0),Nr(ne))},Qo=ne=>{pt.current=!0;const Pe=xe.props;Pe.onTouchStart&&Pe.onTouchStart(ne)},es=Nr,ts=Yo,qi=ne=>{Qo(ne),wt.clear(),Rt.clear(),Ln(),nn.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",tn.start(oe,()=>{document.body.style.WebkitUserSelect=nn.current,Nr(ne)})},Hi=ne=>{xe.props.onTouchEnd&&xe.props.onTouchEnd(ne),Ln(),wt.start(U,()=>{Fn(ne)})};A.useEffect(()=>{if(!Qe)return;function ne(Pe){(Pe.key==="Escape"||Pe.key==="Esc")&&Fn(Pe)}return document.addEventListener("keydown",ne),()=>{document.removeEventListener("keydown",ne)}},[Fn,Qe]);const Xi=Et(xe.ref,Ui,Bn,n);!L&&L!==0&&(Qe=!1);const kr=A.useRef(),Yi=ne=>{const Pe=xe.props;Pe.onMouseMove&&Pe.onMouseMove(ne),un={x:ne.clientX,y:ne.clientY},kr.current&&kr.current.update()},rn={},Er=typeof L=="string";k?(rn.title=!Qe&&Er&&!M?L:null,rn["aria-describedby"]=Qe?yr:null):(rn["aria-label"]=Er?L:null,rn["aria-labelledby"]=Qe&&!Er?yr:null);const Be=P({},rn,B,xe.props,{className:at(B.className,xe.props.className),onTouchStart:Qo,ref:Xi},se?{onMouseMove:Yi}:{});process.env.NODE_ENV!=="production"&&(Be["data-mui-internal-clone-element"]=!0,A.useEffect(()=>{Ee&&!Ee.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[Ee]));const on={};J||(Be.onTouchStart=qi,Be.onTouchEnd=Hi),M||(Be.onMouseOver=Hn(es,Be.onMouseOver),Be.onMouseLeave=Hn(ts,Be.onMouseLeave),Ot||(on.onMouseOver=es,on.onMouseLeave=ts)),D||(Be.onFocus=Hn(Zo,Be.onFocus),Be.onBlur=Hn(Jo,Be.onBlur),Ot||(on.onFocus=Zo,on.onBlur=Jo)),process.env.NODE_ENV!=="production"&&xe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));const Wi=A.useMemo(()=>{var ne;let Pe=[{name:"arrow",enabled:!!He,options:{element:He,padding:4}}];return(ne=X.popperOptions)!=null&&ne.modifiers&&(Pe=Pe.concat(X.popperOptions.modifiers)),P({},X.popperOptions,{modifiers:Pe})},[He,X]),sn=P({},I,{isRtl:ut,arrow:z,disableInteractive:Ot,placement:V,PopperComponentProp:K,touch:pt.current}),jr=uf(sn),ns=(r=(o=T.popper)!=null?o:C.Popper)!=null?r:pf,rs=(a=(i=(l=T.transition)!=null?l:C.Transition)!=null?i:j)!=null?a:Js,os=(c=(d=T.tooltip)!=null?d:C.Tooltip)!=null?c:wf,ss=(u=(h=T.arrow)!=null?h:C.Arrow)!=null?u:ff,Ki=mn(ns,P({},X,(w=Z.popper)!=null?w:_.popper,{className:at(jr.popper,X==null?void 0:X.className,(v=(x=Z.popper)!=null?x:_.popper)==null?void 0:v.className)}),sn),Ji=mn(rs,P({},we,(f=Z.transition)!=null?f:_.transition),sn),Zi=mn(os,P({},(m=Z.tooltip)!=null?m:_.tooltip,{className:at(jr.tooltip,(N=($=Z.tooltip)!=null?$:_.tooltip)==null?void 0:N.className)}),sn),Qi=mn(ss,P({},(R=Z.arrow)!=null?R:_.arrow,{className:at(jr.arrow,(E=(b=Z.arrow)!=null?b:_.arrow)==null?void 0:E.className)}),sn);return s.jsxs(A.Fragment,{children:[A.cloneElement(xe,Be),s.jsx(ns,P({as:K??ki,placement:V,anchorEl:se?{getBoundingClientRect:()=>({top:un.y,left:un.x,right:un.x,bottom:un.y,width:0,height:0})}:Ee,popperRef:kr,open:Ee?Qe:!1,id:yr,transition:!0},on,Ki,{popperOptions:Wi,children:({TransitionProps:ne})=>s.jsx(rs,P({timeout:qe.transitions.duration.shorter},ne,Ji,{children:s.jsxs(os,P({},Zi,{children:[L,z?s.jsx(ss,P({},Qi,{ref:Ct})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(Ei.propTypes={arrow:p.bool,children:Ga.isRequired,classes:p.object,className:p.string,components:p.shape({Arrow:p.elementType,Popper:p.elementType,Tooltip:p.elementType,Transition:p.elementType}),componentsProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),describeChild:p.bool,disableFocusListener:p.bool,disableHoverListener:p.bool,disableInteractive:p.bool,disableTouchListener:p.bool,enterDelay:p.number,enterNextDelay:p.number,enterTouchDelay:p.number,followCursor:p.bool,id:p.string,leaveDelay:p.number,leaveTouchDelay:p.number,onClose:p.func,onOpen:p.func,open:p.bool,placement:p.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:p.elementType,PopperProps:p.object,slotProps:p.shape({arrow:p.object,popper:p.object,tooltip:p.object,transition:p.object}),slots:p.shape({arrow:p.elementType,popper:p.elementType,tooltip:p.elementType,transition:p.elementType}),sx:p.oneOfType([p.arrayOf(p.oneOfType([p.func,p.object,p.bool])),p.func,p.object]),title:p.node,TransitionComponent:p.elementType,TransitionProps:p.object});const mf=Ei;function Qs(e,t,n){return e?s.jsx(De.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:s.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Lo(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:a=void 0,iconPathAfter:i=void 0,hasAutoFocus:l=!1,className:c,isDisabled:d=!1,isDense:u=!0,isSubMenuParent:h=!1,hasDisabledGutters:w=!1,hasDivider:v=!1,focusVisibleClassName:x,id:f,children:m}=e,N=s.jsx(De.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:d,dense:u,disableGutters:w,divider:v,focusVisibleClassName:x,onClick:t,id:f,children:n?s.jsxs(s.Fragment,{children:[Qs(a,n,!0),s.jsx(De.ListItemText,{primary:n,inset:!a&&o}),h?s.jsx(De.ListItemIcon,{className:"papi-menu-icon-trailing",children:s.jsx(ai,{})}):Qs(i,n,!1)]}):m});return r?s.jsx(mf,{title:r,placement:"right",children:s.jsx("div",{children:N})}):N}function ji(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function hf(e){const[t,n]=g.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:a}=e,i=d=>{n(d.currentTarget)},l=()=>{n(void 0)},c=()=>{let d=ji(a).filter(u=>"menuItem"in u.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return d=d.filter(u=>"menuItem"in u.group&&u.group.menuItem===r.id),s.jsx(Si,{...e,includedGroups:d})};return s.jsxs(s.Fragment,{children:[s.jsx(Lo,{onClick:i,...o,isSubMenuParent:!0}),s.jsx(De.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const gf=(e,t)=>t.filter(o=>o.group===e).sort((o,a)=>(o.order||0)-(a.order||0));function Si(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:a,allowForLeadingIcons:i}=g.useMemo(()=>{const u=o&&o.length>0?o:ji(t).filter(x=>!("menuItem"in x.group)),h=Object.values(u).sort((x,f)=>(x.group.order||0)-(f.group.order||0)),w=[];h.forEach(x=>{gf(x.id,t.items).forEach(f=>w.push({item:f,isLastItemInGroup:!1})),w.length>0&&(w[w.length-1].isLastItemInGroup=!0)}),w.length>0&&(w[w.length-1].isLastItemInGroup=!1);const v=w.some(x=>"iconPathBefore"in x.item&&x.item.iconPathBefore);return{items:w,allowForLeadingIcons:v}},[o,t]),l=({item:u,isLastItemInGroup:h})=>({className:"papi-menu-item",label:u.label,tooltip:u.tooltip,iconPathBefore:"iconPathBefore"in u?u.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in u?u.iconPathAfter:void 0,hasDivider:h,allowForLeadingIcons:i}),[c]=a;if(!c)return s.jsx("div",{});const d=c.item.group;return s.jsx("div",{role:"menu","aria-label":d,children:a.map((u,h)=>{const{item:w}=u,v=l(u);if("command"in w){const x=w.group+h;return s.jsx(Lo,{onClick:f=>{n==null||n(f),r(w)},...v},x)}return s.jsx(hf,{parentMenuItem:w,parentItemProps:v,...e},d+w.id)})},d)}function bf(e){const{menuDefinition:t,columnId:n}=e;let a=Object.entries(t.groups).map(([i,l])=>({id:i,group:l})).filter(i=>"column"in i.group);return n&&"columns"in t&&t.columns[n]&&(a=a.filter(i=>"column"in i.group&&i.group.column===n)),s.jsx(Si,{...e,includedGroups:a})}function vf({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:a}){return s.jsxs(De.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${a??""}`,children:[s.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${a??""}`,children:r.label}),s.jsx(De.List,{id:n,dense:!0,className:a??"",children:s.jsx(bf,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function Ti({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,a=g.useMemo(()=>{const i=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,d=o[c];typeof d=="object"&&typeof d.order=="number"&&!Number.isNaN(d.order)?i.set(d.order,{id:c,metadata:d}):console.warn(`Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(i.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return s.jsx(De.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((i,l)=>s.jsx(vf,{commandHandler:e,menuDefinition:n,...i,className:t},l))})}function xf(e){return{preserveValue:!0,...e}}const or=(e,t,n={})=>{const r=g.useRef(t);r.current=t;const o=g.useRef(n);o.current=xf(o.current);const[a,i]=g.useState(()=>r.current),[l,c]=g.useState(!0);return g.useEffect(()=>{let d=!0;return c(!!e),(async()=>{if(e){const u=await e();d&&(i(()=>u),c(!1))}})(),()=>{d=!1,o.current.preserveValue||i(()=>r.current)}},[e]),[a,l]},yf=si(s.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Ci({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:a,ariaLabelPrefix:i,children:l}){const[c,d]=g.useState(!1),[u,h]=g.useState(!1),w=g.useCallback(()=>{c&&d(!1),h(!1)},[c]),v=g.useCallback(E=>{E.stopPropagation(),d(b=>{const I=!b;return I&&E.shiftKey?h(!0):I||h(!1),I})},[]),x=g.useCallback(E=>(w(),r(E)),[r,w]),[f,m]=g.useState({top:1,left:1});g.useEffect(()=>{if(c){const E=o==null?void 0:o.current;if(E){const b=E.getBoundingClientRect(),I=window.scrollY,z=window.scrollX,Y=b.top+I+E.clientHeight,C=b.left+z;m({top:Y,left:C})}}},[c,o]);const[N]=or(g.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=or(g.useCallback(async()=>(e==null?void 0:e(!0))??n??N,[e,n,N,c]),n??N),R=u&&$?$:N;return s.jsxs(s.Fragment,{children:[s.jsx(De.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${a??""}`,color:"inherit","aria-label":`${i??""} menu button`,onClick:v,children:l??s.jsx(yf,{})}),s.jsx(De.Drawer,{className:`papi-menu-drawer ${a??""}`,anchor:"left",variant:"temporary",open:c,onClose:w,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f.top,left:f.left}},children:R?s.jsx(Ti,{className:a,id:`${i??""} main menu`,commandHandler:x,multiColumnMenu:R}):void 0})]})}function Nf({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:a=!1,size:i="medium",className:l,onClick:c,children:d}){return s.jsx(De.IconButton,{id:e,disabled:n,edge:a,size:i,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:d})}const dt=g.forwardRef(({className:e,...t},n)=>s.jsx(H.LoaderCircle,{size:35,className:S("tw-animate-spin",e),...t,ref:n}));dt.displayName="Spinner";function kf({id:e,isDisabled:t=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:a,placeholder:i,isRequired:l=!1,className:c,defaultValue:d,value:u,onChange:h,onFocus:w,onBlur:v}){return s.jsxs("div",{className:S("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[s.jsx(Te,{htmlFor:e,className:S({"tw-text-red-600":n,"tw-hidden":!a}),children:`${a}${l?"*":""}`}),s.jsx(Tt,{id:e,disabled:t,placeholder:i,required:l,className:S(c,{"tw-border-red-600":n}),defaultValue:d,value:u,onChange:h,onFocus:w,onBlur:v}),s.jsx("p",{className:S({"tw-hidden":!o}),children:o})]})}function Ef({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const a=g.useRef(void 0);return s.jsx("div",{ref:a,style:{position:"relative"},children:s.jsx(De.AppBar,{position:"static",id:r,children:s.jsxs(De.Toolbar,{className:S("tw-bg-muted tw-text-muted-foreground",n),variant:"dense",children:[e?s.jsx(Ci,{commandHandler:t,containerRef:a,menuProvider:e}):void 0,o?s.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const jf=Rn.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Oi=g.forwardRef(({className:e,variant:t,...n},r)=>s.jsx("div",{ref:r,role:"alert",className:S(jf({variant:t}),e),...n}));Oi.displayName="Alert";const Ri=g.forwardRef(({className:e,...t},n)=>s.jsxs("h5",{ref:n,className:S("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...t,children:[t.children," "]}));Ri.displayName="AlertTitle";const _i=g.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("tw-text-sm [&_p]:tw-leading-relaxed",e),...t}));_i.displayName="AlertDescription";const Pi=Rn.cva("tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-text-foreground"}},defaultVariants:{variant:"default"}});function Sf({className:e,variant:t,...n}){return s.jsx("div",{className:S("pr-twp",Pi({variant:t}),e),...n})}const Fo=g.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...t}));Fo.displayName="Card";const zo=g.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...t}));zo.displayName="CardHeader";const Go=g.forwardRef(({className:e,...t},n)=>s.jsx("h3",{ref:n,className:S("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...t,children:t.children}));Go.displayName="CardTitle";const Uo=g.forwardRef(({className:e,...t},n)=>s.jsx("p",{ref:n,className:S("pr-twp tw-text-sm tw-text-muted-foreground",e),...t}));Uo.displayName="CardDescription";const qo=g.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-p-6 tw-pt-0",e),...t}));qo.displayName="CardContent";const Ii=g.forwardRef(({className:e,...t},n)=>s.jsx("div",{ref:n,className:S("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...t}));Ii.displayName="CardFooter";function Tf({...e}){return s.jsx(na.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}const $i=g.forwardRef(({className:e,...t},n)=>s.jsxs(wn.Root,{ref:n,className:S("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,children:[s.jsx(wn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:s.jsx(wn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),s.jsx(wn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]}));$i.displayName=wn.Root.displayName;const Mi=g.forwardRef(({className:e,...t},n)=>s.jsx(zr.Root,{className:S("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...t,ref:n,children:s.jsx(zr.Thumb,{className:S("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0")})}));Mi.displayName=zr.Root.displayName;const Cf=_e.Root,Di=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.List,{ref:n,className:S("tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...t}));Di.displayName=_e.List.displayName;const Ai=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.Trigger,{ref:n,className:S("tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...t}));Ai.displayName=_e.Trigger.displayName;const Bi=g.forwardRef(({className:e,...t},n)=>s.jsx(_e.Content,{ref:n,className:S("tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...t}));Bi.displayName=_e.Content.displayName;function Of({isInstalling:e,handleClick:t,buttonText:n,className:r,...o}){return s.jsx(pe,{className:S("tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e,"tw-bg-blue-600":!e,"tw-bg-white tw-text-blue-600 hover:tw-text-white":!n,"tw-w-20":n},r),onClick:t,...o,children:e?s.jsx(dt,{size:15}):s.jsxs(s.Fragment,{children:[s.jsx(H.Download,{size:25,className:S("tw-h-4 tw-w-4",{"tw-mr-1":n})}),n]})})}function Rf({isEnabling:e,handleClick:t,className:n,...r}){return s.jsx(pe,{className:S("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(dt,{size:15,className:"tw-mr-1 tw-text-white"}),"Enabling..."]}):"Enable"})}function _f({isDisabling:e,handleClick:t,className:n,...r}){return s.jsx(pe,{className:S("tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",{"tw-cursor-not-allowed tw-bg-gray-400":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(dt,{size:15,className:"tw-mr-1 tw-text-black"}),"Disabling..."]}):"Disable"})}function Pf({isUpdating:e,handleClick:t,className:n,...r}){return s.jsx(pe,{className:S("tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",{"tw-cursor-not-allowed tw-bg-blue-700":e},n),onClick:t,...r,children:e?s.jsxs(s.Fragment,{children:[s.jsx(dt,{size:15,className:"tw-mr-1 tw-text-white"}),"Updating..."]}):"Update"})}function If({id:e,markdown:t,className:n,anchorTarget:r}){const o=g.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return s.jsx("div",{id:e,className:S("pr-twp tw-prose",n),children:s.jsx(fl,{options:o,children:t})})}const Vi=g.forwardRef((e,t)=>s.jsxs(pe,{ref:t,className:"tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",...e,children:[s.jsx(H.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"}),"Filter",s.jsx(H.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"})]}));var Li=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Li||{});function $f({id:e,groups:t}){return s.jsx("div",{id:e,children:s.jsxs(Lt,{children:[s.jsx(En,{asChild:!0,children:s.jsx(Vi,{})}),s.jsx(yt,{children:t.map(n=>s.jsxs("div",{children:[s.jsx(Kt,{children:n.label}),s.jsx(pa,{children:n.items.map(r=>s.jsx("div",{children:r.itemType===0?s.jsx(_n,{onClick:r.onClick,children:r.label}):s.jsx(no,{onClick:r.onClick,value:r.label,children:r.label})},r.label))}),s.jsx(Jt,{})]},n.label))})]})})}function Mf({id:e,message:t}){return s.jsx("div",{id:e,className:"tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center",children:s.jsx("div",{className:"tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center",children:s.jsx("p",{className:"tw-text-lg tw-text-gray-800",children:t})})})}function Df({id:e,category:t,downloads:n,languages:r,moreInfoUrl:o}){const a=new Q.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((l,c)=>l+c,0)),i=()=>{window.scrollTo(0,document.body.scrollHeight)};return s.jsxs("div",{id:e,className:"tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",children:[s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsx("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:s.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:t})}),s.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"CATEGORY"})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsxs("div",{className:"tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1",children:[s.jsx(H.User,{className:"tw-mr-1 tw-h-4 tw-w-4"}),s.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-gray-700",children:a})]}),s.jsx("span",{className:"tw-text-xs tw-text-gray-500",children:"USERS"})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center",children:[s.jsx("div",{className:"tw-flex tw-items-center",children:r.slice(0,3).map(l=>s.jsx("span",{className:"tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",children:l.toUpperCase()},l))}),r.length>3&&s.jsxs("button",{type:"button",onClick:()=>i(),className:"tw-text-xs tw-text-gray-500 tw-underline",children:["+",r.length-3," more languages"]})]}),s.jsx("div",{className:"tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300"}),s.jsxs("div",{className:"tw-ml-auto tw-flex tw-flex-col tw-space-y-2",children:[s.jsxs("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Website",s.jsx(H.Link,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]}),s.jsxs("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",children:["Support",s.jsx(H.CircleHelp,{className:"tw-ml-1 tw-inline tw-h-4 tw-w-4"})]})]})]})}function Fi({id:e,versionHistory:t}){const[n,r]=g.useState(!1),o=new Date;function a(l){const c=new Date(l),d=new Date(o.getTime()-c.getTime()),u=d.getUTCFullYear()-1970,h=d.getUTCMonth(),w=d.getUTCDate()-1;let v="";return u>0?v=`${u.toString()} year${u===1?"":"s"} ago`:h>0?v=`${h.toString()} month${h===1?"":"s"} ago`:w===0?v="today":v=`${w.toString()} day${w===1?"":"s"} ago`,v}const i=Object.entries(t).sort((l,c)=>c[0].localeCompare(l[0]));return s.jsxs("div",{id:e,children:[s.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),s.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600",children:(n?i:i.slice(0,5)).map(l=>s.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[s.jsx("div",{className:"tw-text-gray-600",children:s.jsx("li",{className:"tw-prose tw-text-xs",children:s.jsx("span",{children:l[1].description})})}),s.jsxs("div",{className:"tw-justify-end tw-text-right",children:[s.jsxs("div",{children:["Version ",l[0]]}),s.jsx("div",{children:a(l[1].date)})]})]},l[0]))}),i.length>5&&s.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-gray-500 tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Af({id:e,publisherDisplayName:t,fileSize:n,locales:r,versionHistory:o}){const a=g.useMemo(()=>Q.formatBytes(n),[n]),l=(c=>{const d=new Intl.DisplayNames(navigator.language,{type:"language"});return c.map(u=>d.of(u))})(r);return s.jsx("div",{id:e,className:"tw-border-t tw-pb-4 tw-pt-4",children:s.jsxs("div",{className:"tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0",children:[s.jsx(Fi,{versionHistory:o}),s.jsx("div",{className:"tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300"}),s.jsxs("div",{className:"tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3",children:[s.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),s.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600",children:[s.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[s.jsx("span",{className:"tw-mb-2",children:"Publisher"}),s.jsx("span",{className:"tw-font-semibold",children:t}),s.jsx("span",{className:"tw-mb-2 tw-mt-4",children:"Size"}),s.jsx("span",{className:"tw-font-semibold",children:a})]}),s.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600",children:s.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start",children:[s.jsx("span",{className:"tw-mb-2",children:"Languages"}),s.jsx("span",{className:"tw-font-semibold",children:l.join(", ")})]})})]})]})]})})}const Bf=["%resources_action%","%resources_dialog_subtitle%","%resources_dialog_title%","%resources_filterInput%","%resources_fullName%","%resources_get%","%resources_installed%","%resources_language%","%resources_languageFilter%","%resources_loadingResources%","%resources_noResults%","%resources_open%","%resources_remove%","%resources_size%","%resources_type%","%resources_type_DBL%","%resources_type_ER%","%resources_type_SLR%","%resources_type_XR%","%resources_type_unknown%","%resources_update%"],Vf=(e,t)=>{const n=Array.from(new Set(e.map(o=>o.bestLanguageName))),r=new Set(t.concat(e.filter(o=>o.installed).map(o=>o.bestLanguageName)));return n.sort((o,a)=>{const i=r.has(o),l=r.has(a);return i&&l?o.localeCompare(a):i?-1:l?1:o.localeCompare(a)})},ea=(e,t,n)=>s.jsx(pe,{variant:"outline",onClick:()=>n(e.dblEntryUid,"install"),children:t}),Lf=(e,t,n,r,o,a)=>t.includes(e.dblEntryUid)?s.jsx(pe,{variant:"outline",children:s.jsx(dt,{className:"tw-h-5 tw-py-[1px]"})}):e.installed?e.updateAvailable?ea(e,r,a):s.jsx(Te,{className:"tw-my-2 tw-flex tw-h-6 tw-items-center",children:o}):ea(e,n,a);function Ff({localizedStrings:e,dblResources:t,isLoadingDblResources:n,typeFilter:r,setTypeFilter:o,languageFilter:a,setLanguageFilter:i,openResource:l,installResource:c,uninstallResource:d}){const u=e["%resources_action%"],h=e["%resources_dialog_subtitle%"],w=e["%resources_dialog_title%"],v=e["%resources_filterInput%"],x=e["%resources_fullName%"],f=e["%resources_get%"],m=e["%resources_installed%"],N=e["%resources_language%"],$=e["%resources_languageFilter%"],R=e["%resources_loadingResources%"],E=e["%resources_noResults%"],b=e["%resources_open%"],I=e["%resources_remove%"],z=e["%resources_size%"],Y=e["%resources_type%"],C=e["%resources_type_DBL%"],_=e["%resources_type_ER%"],k=e["%resources_type_SLR%"],D=e["%resources_type_XR%"],M=e["%resources_type_unknown%"],ee=e["%resources_update%"],[J,q]=g.useState([]),te=(T,L)=>{if(!c||!d)return;const j={dblEntryUid:T,action:L==="install"?"installing":"removing"};q(B=>[...B,j]),(L==="install"?c:d)(T).catch(B=>{console.debug(Q.getErrorMessage(B))})};g.useEffect(()=>{q(T=>T.filter(L=>{const j=t.find(we=>we.dblEntryUid===L.dblEntryUid);return j?!(L.action==="installing"&&j.installed||L.action==="removing"&&!j.installed):!0}))},[t]);const[oe,se]=g.useState(""),y=g.useMemo(()=>t.filter(T=>{const L=oe.toLowerCase();return T.displayName.toLowerCase().includes(L)||T.fullName.toLowerCase().includes(L)||T.bestLanguageName.toLowerCase().includes(L)}),[t,oe]),O=g.useMemo(()=>[{type:"DBLResource",localizedValue:C},{type:"EnhancedResource",localizedValue:_},{type:"SourceLanguageResource",localizedValue:k},{type:"XmlResource",localizedValue:D}],[C,_,k,D]),U=T=>{const L=[...r];let j=[];!L||L.length===0?j=[T]:j=L.includes(T)?L.filter(we=>we!==T):[...L,T],o(j)},G=g.useMemo(()=>y.filter(T=>r.includes(T.type)),[y,r]);g.useEffect(()=>{a.length===0&&i(t.filter(T=>T.installed===!0).map(T=>T.bestLanguageName))},[t,a.length,i]);const F=T=>{const L=[...a];let j=[];!L||L.length===0?j=[T]:j=L.includes(T)?L.filter(we=>we!==T):[...L,T],i(j)},W=g.useMemo(()=>G.filter(T=>a.includes(T.bestLanguageName)),[a,G]),[V,K]=g.useState({key:"bestLanguageName",direction:"ascending"}),X=g.useMemo(()=>[...W].sort((T,L)=>{const j=T[V.key],we=L[V.key];return j<we?V.direction==="ascending"?-1:1:j>we?V.direction==="ascending"?1:-1:0}),[V.direction,V.key,W]),Z=T=>{const L={key:T,direction:"ascending"};V.key===T&&V.direction==="ascending"&&(L.direction="descending"),K(L)};return s.jsxs(Fo,{className:"tw-rounded-none tw-border-0",children:[s.jsx(zo,{children:s.jsxs("div",{className:"tw-flex tw-items-center",children:[s.jsx(H.BookOpen,{size:36,className:"tw-mr-2"}),s.jsxs("div",{children:[s.jsx(Go,{children:w}),s.jsx(Uo,{className:"tw-mt-1",children:h})]})]})}),s.jsx(qo,{children:n||!t?s.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-2",children:[s.jsx(Te,{children:R}),s.jsx(dt,{})]}):s.jsxs("div",{children:[s.jsxs("div",{className:"tw-mb-1 tw-flex tw-gap-1",children:[s.jsxs("div",{className:"tw-relative",children:[s.jsx(Tt,{type:"text",className:"tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none",onChange:T=>se(T.target.value),value:oe,placeholder:v}),s.jsx(H.Search,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground"})]}),s.jsxs(Lt,{children:[s.jsx(En,{asChild:!0,children:s.jsxs(pe,{variant:"outline",children:[s.jsx(H.Loader,{className:"tw-mr-2 tw-w-4"}),Y]})}),s.jsx(yt,{align:"start",children:O.map(T=>s.jsx(_n,{checked:r.includes(T.type),onClick:L=>{L.preventDefault(),U(T.type)},children:s.jsx("span",{children:T.localizedValue})}))})]}),s.jsx(Jn,{className:"tw-w-auto tw-min-w-10 tw-flex-shrink",buttonPlaceholder:N,textPlaceholder:$,value:a[0],options:Vf(t,a),onChange:F})]}),X.length===0?s.jsx("div",{className:"tw-m-4 tw-flex tw-w-full tw-justify-center",children:s.jsx(Te,{children:E})}):s.jsxs(Zt,{stickyHeader:!0,children:[s.jsx(Qt,{className:"tw-bg-none",stickyHeader:!0,children:s.jsxs(Xe,{children:[s.jsx($e,{}),s.jsx($e,{}),s.jsx($e,{onClick:()=>Z("fullName"),children:s.jsxs("div",{className:"tw-flex tw-items-center",children:[x,V.key!=="fullName"&&s.jsx(H.ChevronsUpDown,{className:"tw-pl-1",size:16}),V.key==="fullName"&&(V.direction==="ascending"?s.jsx(H.ChevronUp,{className:"tw-pl-1",size:16}):s.jsx(H.ChevronDown,{className:"tw-pl-1",size:16}))]})}),s.jsx($e,{onClick:()=>Z("bestLanguageName"),children:s.jsxs("div",{className:"tw-flex tw-items-center",children:[N,V.key!=="bestLanguageName"&&s.jsx(H.ChevronsUpDown,{className:"tw-pl-1",size:16}),V.key==="bestLanguageName"&&(V.direction==="ascending"?s.jsx(H.ChevronUp,{className:"tw-pl-1",size:16}):s.jsx(H.ChevronDown,{className:"tw-pl-1",size:16}))]})}),s.jsx($e,{children:Y}),s.jsx($e,{children:z}),s.jsx($e,{children:u})]})}),s.jsx(en,{children:X.map(T=>{var L;return s.jsxs(Xe,{children:[s.jsx(Se,{children:s.jsx(H.BookOpen,{className:"tw-pr-0",size:18})}),s.jsx(Se,{children:T.displayName}),s.jsx(Se,{className:"tw-font-medium",children:T.fullName}),s.jsx(Se,{children:T.bestLanguageName}),s.jsx(Se,{children:((L=O.find(j=>j.type===T.type))==null?void 0:L.localizedValue)??M}),s.jsx(Se,{children:T.size}),s.jsx(Se,{children:s.jsxs("div",{className:"tw-flex tw-justify-between",children:[Lf(T,J.map(j=>j.dblEntryUid),f,ee,m,te),T.installed&&s.jsxs(Lt,{children:[s.jsx(En,{asChild:!0,children:s.jsx(pe,{variant:"ghost",children:s.jsx(H.Ellipsis,{className:"tw-w-4"})})}),s.jsxs(yt,{align:"start",children:[s.jsx(jn,{onClick:()=>l(T.projectId),children:s.jsx("span",{children:b})}),s.jsx(Jt,{}),s.jsx(jn,{onClick:()=>te(T.dblEntryUid,"remove"),children:s.jsx("span",{children:I})})]})]})]})})]},T.displayName+T.fullName)})})]})]})})]})}const zf=(e,t)=>{g.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},Vr=()=>!1,Gf=(e,t)=>{const[n]=or(g.useCallback(async()=>{if(!e)return Vr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),Vr,{preserveValue:!1});g.useEffect(()=>()=>{n!==Vr&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>na.toast});exports.Alert=Oi;exports.AlertDescription=_i;exports.AlertTitle=Ri;exports.BOOK_SELECTOR_STRING_KEYS=Jl;exports.Badge=Sf;exports.BookChapterControl=Gl;exports.BookSelectionMode=Na;exports.BookSelector=Zl;exports.Button=pe;exports.Card=Fo;exports.CardContent=qo;exports.CardDescription=Uo;exports.CardFooter=Ii;exports.CardHeader=zo;exports.CardTitle=Go;exports.ChapterRangeSelector=ya;exports.Checkbox=ar;exports.Checklist=jc;exports.ComboBox=Jn;exports.DataTable=Ca;exports.DisableButton=_f;exports.DropdownMenu=Lt;exports.DropdownMenuCheckboxItem=_n;exports.DropdownMenuContent=yt;exports.DropdownMenuGroup=pa;exports.DropdownMenuItem=jn;exports.DropdownMenuItemType=Li;exports.DropdownMenuLabel=Kt;exports.DropdownMenuPortal=Rl;exports.DropdownMenuRadioGroup=Pl;exports.DropdownMenuRadioItem=no;exports.DropdownMenuSeparator=Jt;exports.DropdownMenuShortcut=ma;exports.DropdownMenuSub=_l;exports.DropdownMenuSubContent=fa;exports.DropdownMenuSubTrigger=wa;exports.DropdownMenuTrigger=En;exports.EnableButton=Rf;exports.FILTERABLE_RESOURCE_LIST_STRING_KEYS=Bf;exports.FilterButton=Vi;exports.FilterDropdown=$f;exports.FilterableResourceList=Ff;exports.Footer=Af;exports.GridMenu=Ti;exports.HamburgerMenuButton=Ci;exports.INVENTORY_STRING_KEYS=ic;exports.IconButton=Nf;exports.Input=Tt;exports.InstallButton=Of;exports.Inventory=dc;exports.Label=Te;exports.MarkdownRenderer=If;exports.MenuItem=Lo;exports.MoreInfo=Df;exports.MultiSelectComboBox=uc;exports.NavigationContentSearch=pc;exports.NoExtensionsFound=Mf;exports.RadioGroup=ro;exports.RadioGroupItem=Kn;exports.ScriptureResultsViewer=xc;exports.ScrollGroupSelector=yc;exports.SearchBar=$a;exports.Select=Ft;exports.SelectContent=kt;exports.SelectGroup=ka;exports.SelectItem=Ve;exports.SelectLabel=Ea;exports.SelectScrollDownButton=po;exports.SelectScrollUpButton=uo;exports.SelectSeparator=ja;exports.SelectTrigger=Nt;exports.SelectValue=zt;exports.Separator=go;exports.SettingsList=Nc;exports.SettingsListHeader=Ec;exports.SettingsListItem=kc;exports.Slider=$i;exports.Sonner=Tf;exports.Spinner=dt;exports.Switch=Mi;exports.Table=Zt;exports.TableBody=en;exports.TableCaption=Ta;exports.TableCell=Se;exports.TableFooter=Sa;exports.TableHead=$e;exports.TableHeader=Qt;exports.TableRow=Xe;exports.Tabs=Cf;exports.TabsContent=Bi;exports.TabsList=Di;exports.TabsTrigger=Ai;exports.TextField=kf;exports.ToggleGroup=wo;exports.ToggleGroupItem=bn;exports.Toolbar=Ef;exports.UpdateButton=Pf;exports.VersionHistory=Fi;exports.VerticalTabs=fo;exports.VerticalTabsContent=ho;exports.VerticalTabsList=mo;exports.VerticalTabsTrigger=Ma;exports.badgeVariants=Pi;exports.buttonVariants=ha;exports.cn=S;exports.getBookNumFromId=Ra;exports.getLinesFromUSFM=Oa;exports.getNumberFromUSFM=Gr;exports.getStatusForItem=_a;exports.inventoryCountColumn=sc;exports.inventoryItemColumn=rc;exports.inventoryStatusColumn=ac;exports.useEvent=zf;exports.useEventAsync=Gf;exports.usePromise=or;function Uf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Uf(`*, ::before, ::after {
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
.tw-min-w-10 {
  min-width: 2.5rem;
}
.tw-min-w-72 {
  min-width: 18rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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
.tw-pe-3 {
  padding-inline-end: 0.75rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pl-1 {
  padding-left: 0.25rem;
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
