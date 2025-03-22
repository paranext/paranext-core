import{j as I}from"./jsx-runtime-DrLzXHSF.js";import{r as w,R as ze}from"./index-BzTIjXJV.js";function oe(e,r){if(typeof e=="function")return e(r);e!=null&&(e.current=r)}function Se(...e){return r=>{let t=!1;const o=e.map(s=>{const n=oe(s,r);return!t&&typeof n=="function"&&(t=!0),n});if(t)return()=>{for(let s=0;s<o.length;s++){const n=o[s];typeof n=="function"?n():oe(e[s],null)}}}}var me=w.forwardRef((e,r)=>{const{children:t,...o}=e,s=w.Children.toArray(t),n=s.find(Re);if(n){const l=n.props.children,i=s.map(d=>d===n?w.Children.count(l)>1?w.Children.only(null):w.isValidElement(l)?l.props.children:null:d);return I.jsx(H,{...o,ref:r,children:w.isValidElement(l)?w.cloneElement(l,void 0,i):null})}return I.jsx(H,{...o,ref:r,children:t})});me.displayName="Slot";var H=w.forwardRef((e,r)=>{const{children:t,...o}=e;if(w.isValidElement(t)){const s=Me(t),n=Pe(o,t.props);return t.type!==w.Fragment&&(n.ref=r?Se(r,s):s),w.cloneElement(t,n)}return w.Children.count(t)>1?w.Children.only(null):null});H.displayName="SlotClone";var Ae=({children:e})=>I.jsx(I.Fragment,{children:e});function Re(e){return w.isValidElement(e)&&e.type===Ae}function Pe(e,r){const t={...r};for(const o in r){const s=e[o],n=r[o];/^on[A-Z]/.test(o)?s&&n?t[o]=(...i)=>{n(...i),s(...i)}:s&&(t[o]=s):o==="style"?t[o]={...s,...n}:o==="className"&&(t[o]=[s,n].filter(Boolean).join(" "))}return{...e,...t}}function Me(e){var o,s;let r=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(r=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function he(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=he(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function ye(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=he(e))&&(o&&(o+=" "),o+=r);return o}const ne=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,se=ye,Ne=(e,r)=>t=>{var o;if((r==null?void 0:r.variants)==null)return se(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:s,defaultVariants:n}=r,l=Object.keys(s).map(c=>{const g=t==null?void 0:t[c],h=n==null?void 0:n[c];if(g===null)return null;const m=ne(g)||ne(h);return s[c][m]}),i=t&&Object.entries(t).reduce((c,g)=>{let[h,m]=g;return m===void 0||(c[h]=m),c},{}),d=r==null||(o=r.compoundVariants)===null||o===void 0?void 0:o.reduce((c,g)=>{let{class:h,className:m,...C}=g;return Object.entries(C).every(v=>{let[b,u]=v;return Array.isArray(u)?u.includes({...n,...i}[b]):{...n,...i}[b]===u})?[...c,h,m]:c},[]);return se(e,l,d,t==null?void 0:t.class,t==null?void 0:t.className)},Z="-",je=e=>{const r=Ge(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:l=>{const i=l.split(Z);return i[0]===""&&i.length!==1&&i.shift(),we(i,r)||Ee(l)},getConflictingClassGroupIds:(l,i)=>{const d=t[l]||[];return i&&o[l]?[...d,...o[l]]:d}}},we=(e,r)=>{var l;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),s=o?we(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;const n=e.join(Z);return(l=r.validators.find(({validator:i})=>i(n)))==null?void 0:l.classGroupId},ie=/^\[(.+)\]$/,Ee=e=>{if(ie.test(e)){const r=ie.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},Ge=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Ie(Object.entries(e.classGroups),t).forEach(([n,l])=>{K(l,o,n,r)}),o},K=(e,r,t,o)=>{e.forEach(s=>{if(typeof s=="string"){const n=s===""?r:le(r,s);n.classGroupId=t;return}if(typeof s=="function"){if(Ve(s)){K(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([n,l])=>{K(l,le(r,n),t,o)})})},le=(e,r)=>{let t=e;return r.split(Z).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t},Ve=e=>e.isThemeGetter,Ie=(e,r)=>r?e.map(([t,o])=>{const s=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([l,i])=>[r+l,i])):n);return[t,s]}):e,Te=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const s=(n,l)=>{t.set(n,l),r++,r>e&&(r=0,o=t,t=new Map)};return{get(n){let l=t.get(n);if(l!==void 0)return l;if((l=o.get(n))!==void 0)return s(n,l),l},set(n,l){t.has(n)?t.set(n,l):s(n,l)}}},ve="!",We=e=>{const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,s=r[0],n=r.length,l=i=>{const d=[];let c=0,g=0,h;for(let u=0;u<i.length;u++){let y=i[u];if(c===0){if(y===s&&(o||i.slice(u,u+n)===r)){d.push(i.slice(g,u)),g=u+n;continue}if(y==="/"){h=u;continue}}y==="["?c++:y==="]"&&c--}const m=d.length===0?i:i.substring(g),C=m.startsWith(ve),v=C?m.substring(1):m,b=h&&h>g?h-g:void 0;return{modifiers:d,hasImportantModifier:C,baseClassName:v,maybePostfixModifierPosition:b}};return t?i=>t({className:i,parseClassName:l}):l},_e=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r},Be=e=>({cache:Te(e.cacheSize),parseClassName:We(e),...je(e)}),Le=/\s+/,Oe=(e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,n=[],l=e.trim().split(Le);let i="";for(let d=l.length-1;d>=0;d-=1){const c=l[d],{modifiers:g,hasImportantModifier:h,baseClassName:m,maybePostfixModifierPosition:C}=t(c);let v=!!C,b=o(v?m.substring(0,C):m);if(!b){if(!v){i=c+(i.length>0?" "+i:i);continue}if(b=o(m),!b){i=c+(i.length>0?" "+i:i);continue}v=!1}const u=_e(g).join(":"),y=h?u+ve:u,x=y+b;if(n.includes(x))continue;n.push(x);const N=s(b,v);for(let R=0;R<N.length;++R){const T=N[R];n.push(y+T)}i=c+(i.length>0?" "+i:i)}return i};function Ue(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=xe(r))&&(o&&(o+=" "),o+=t);return o}const xe=e=>{if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=xe(e[o]))&&(t&&(t+=" "),t+=r);return t};function ae(e,...r){let t,o,s,n=l;function l(d){const c=r.reduce((g,h)=>h(g),e());return t=Be(c),o=t.cache.get,s=t.cache.set,n=i,i(d)}function i(d){const c=o(d);if(c)return c;const g=Oe(d,t);return s(d,g),g}return function(){return n(Ue.apply(null,arguments))}}const p=e=>{const r=t=>t[e]||[];return r.isThemeGetter=!0,r},Ce=/^\[(?:([a-z-]+):)?(.+)\]$/i,$e=/^\d+\/\d+$/,Fe=new Set(["px","full","screen"]),qe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,He=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Ke=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Ze=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,De=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,z=e=>P(e)||Fe.has(e)||$e.test(e),S=e=>M(e,"length",ot),P=e=>!!e&&!Number.isNaN(Number(e)),q=e=>M(e,"number",P),E=e=>!!e&&Number.isInteger(Number(e)),Je=e=>e.endsWith("%")&&P(e.slice(0,-1)),a=e=>Ce.test(e),A=e=>qe.test(e),Xe=new Set(["length","size","percentage"]),Qe=e=>M(e,Xe,ke),Ye=e=>M(e,"position",ke),et=new Set(["image","url"]),tt=e=>M(e,et,st),rt=e=>M(e,"",nt),G=()=>!0,M=(e,r,t)=>{const o=Ce.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1},ot=e=>He.test(e)&&!Ke.test(e),ke=()=>!1,nt=e=>Ze.test(e),st=e=>De.test(e),ce=()=>{const e=p("colors"),r=p("spacing"),t=p("blur"),o=p("brightness"),s=p("borderColor"),n=p("borderRadius"),l=p("borderSpacing"),i=p("borderWidth"),d=p("contrast"),c=p("grayscale"),g=p("hueRotate"),h=p("invert"),m=p("gap"),C=p("gradientColorStops"),v=p("gradientColorStopPositions"),b=p("inset"),u=p("margin"),y=p("opacity"),x=p("padding"),N=p("saturate"),R=p("scale"),T=p("sepia"),J=p("skew"),X=p("space"),Q=p("translate"),O=()=>["auto","contain","none"],U=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",a,r],f=()=>[a,r],Y=()=>["",z,S],W=()=>["auto",P,a],ee=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],_=()=>["solid","dashed","dotted","double","none"],te=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],F=()=>["start","end","center","between","around","evenly","stretch"],j=()=>["","0",a],re=()=>["auto","avoid","all","avoid-page","page","left","right","column"],k=()=>[P,a];return{cacheSize:500,separator:":",theme:{colors:[G],spacing:[z,S],blur:["none","",A,a],brightness:k(),borderColor:[e],borderRadius:["none","","full",A,a],borderSpacing:f(),borderWidth:Y(),contrast:k(),grayscale:j(),hueRotate:k(),invert:j(),gap:f(),gradientColorStops:[e],gradientColorStopPositions:[Je,S],inset:$(),margin:$(),opacity:k(),padding:f(),saturate:k(),scale:k(),sepia:j(),skew:k(),space:f(),translate:f()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[A]}],"break-after":[{"break-after":re()}],"break-before":[{"break-before":re()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...ee(),a]}],overflow:[{overflow:U()}],"overflow-x":[{"overflow-x":U()}],"overflow-y":[{"overflow-y":U()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",E,a]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:j()}],shrink:[{shrink:j()}],order:[{order:["first","last","none",E,a]}],"grid-cols":[{"grid-cols":[G]}],"col-start-end":[{col:["auto",{span:["full",E,a]},a]}],"col-start":[{"col-start":W()}],"col-end":[{"col-end":W()}],"grid-rows":[{"grid-rows":[G]}],"row-start-end":[{row:["auto",{span:[E,a]},a]}],"row-start":[{"row-start":W()}],"row-end":[{"row-end":W()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[m]}],"gap-x":[{"gap-x":[m]}],"gap-y":[{"gap-y":[m]}],"justify-content":[{justify:["normal",...F()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...F(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...F(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[x]}],px:[{px:[x]}],py:[{py:[x]}],ps:[{ps:[x]}],pe:[{pe:[x]}],pt:[{pt:[x]}],pr:[{pr:[x]}],pb:[{pb:[x]}],pl:[{pl:[x]}],m:[{m:[u]}],mx:[{mx:[u]}],my:[{my:[u]}],ms:[{ms:[u]}],me:[{me:[u]}],mt:[{mt:[u]}],mr:[{mr:[u]}],mb:[{mb:[u]}],ml:[{ml:[u]}],"space-x":[{"space-x":[X]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[X]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[A]},A]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",A,S]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",q]}],"font-family":[{font:[G]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",P,q]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",z,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[..._(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",z,S]}],"underline-offset":[{"underline-offset":["auto",z,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:f()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...ee(),Ye]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Qe]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},tt]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[C]}],"gradient-via":[{via:[C]}],"gradient-to":[{to:[C]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[..._(),"hidden"]}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:_()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",..._()]}],"outline-offset":[{"outline-offset":[z,a]}],"outline-w":[{outline:[z,S]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:Y()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[z,S]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",A,rt]}],"shadow-color":[{shadow:[G]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":[...te(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":te()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[d]}],"drop-shadow":[{"drop-shadow":["","none",A,a]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[g]}],invert:[{invert:[h]}],saturate:[{saturate:[N]}],sepia:[{sepia:[T]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[d]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[g]}],"backdrop-invert":[{"backdrop-invert":[h]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[N]}],"backdrop-sepia":[{"backdrop-sepia":[T]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:k()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:k()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[R]}],"scale-x":[{"scale-x":[R]}],"scale-y":[{"scale-y":[R]}],rotate:[{rotate:[E,a]}],"translate-x":[{"translate-x":[Q]}],"translate-y":[{"translate-y":[Q]}],"skew-x":[{"skew-x":[J]}],"skew-y":[{"skew-y":[J]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":f()}],"scroll-mx":[{"scroll-mx":f()}],"scroll-my":[{"scroll-my":f()}],"scroll-ms":[{"scroll-ms":f()}],"scroll-me":[{"scroll-me":f()}],"scroll-mt":[{"scroll-mt":f()}],"scroll-mr":[{"scroll-mr":f()}],"scroll-mb":[{"scroll-mb":f()}],"scroll-ml":[{"scroll-ml":f()}],"scroll-p":[{"scroll-p":f()}],"scroll-px":[{"scroll-px":f()}],"scroll-py":[{"scroll-py":f()}],"scroll-ps":[{"scroll-ps":f()}],"scroll-pe":[{"scroll-pe":f()}],"scroll-pt":[{"scroll-pt":f()}],"scroll-pr":[{"scroll-pr":f()}],"scroll-pb":[{"scroll-pb":f()}],"scroll-pl":[{"scroll-pl":f()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[z,S,q]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},it=(e,{cacheSize:r,prefix:t,separator:o,experimentalParseClassName:s,extend:n={},override:l={}})=>{V(e,"cacheSize",r),V(e,"prefix",t),V(e,"separator",o),V(e,"experimentalParseClassName",s);for(const i in l)lt(e[i],l[i]);for(const i in n)at(e[i],n[i]);return e},V=(e,r,t)=>{t!==void 0&&(e[r]=t)},lt=(e,r)=>{if(r)for(const t in r)V(e,t,r[t])},at=(e,r)=>{if(r)for(const t in r){const o=r[t];o!==void 0&&(e[t]=(e[t]||[]).concat(o))}},ct=(e,...r)=>typeof e=="function"?ae(ce,e,...r):ae(()=>it(ce(),e),...r),dt=ct({prefix:"tw-"});function ut(...e){return dt(ye(e))}const pt=Ne("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),D=ze.forwardRef(({className:e,variant:r,size:t,asChild:o=!1,...s},n)=>{const l=o?me:"button";return I.jsx(l,{className:ut(pt({variant:r,size:t,className:e})),ref:n,...s})});D.displayName="Button";D.__docgenInfo={description:`The Button component displays a button or a component that looks like a button. The component is
built and styled by Shadcn UI.

@param ButtonProps
@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}`,methods:[],displayName:"Button",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["VariantProps"]};const bt={title:"Shadcn/Button",component:D,argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},size:{options:["default","sm","lg"],control:{type:"select"}}}},B={args:{children:"Button"}},L={args:{children:"Destructive",variant:"destructive"}};var de,ue,pe;B.parameters={...B.parameters,docs:{...(de=B.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(pe=(ue=B.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};var fe,ge,be;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: 'Destructive',
    variant: 'destructive'
  }
}`,...(be=(ge=L.parameters)==null?void 0:ge.docs)==null?void 0:be.source}}};const mt=["Default","Destructive"];export{B as Default,L as Destructive,mt as __namedExportsOrder,bt as default};
