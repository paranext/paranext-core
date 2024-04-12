"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const x=require("react/jsx-runtime"),te=require("react"),qs=require("@radix-ui/react-dropdown-menu"),Rr=require("lucide-react"),xe=require("clsx"),Hs=require("tailwind-merge"),de=require("@mui/material"),br=require("@mui/styled-engine"),Kt=require("react-dom"),Fe=require("platform-bible-utils"),bo=require("react-data-grid");function Nr(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const E=Nr(te),ge=Nr(qs),Ws=Nr(Kt);function Qe(...e){return Hs.twMerge(xe.clsx(e))}const Gs=ge.Root,Xs=ge.Trigger,Ks=E.forwardRef(({className:e,inset:t,children:n,...r},o)=>x.jsxs(ge.SubTrigger,{ref:o,className:Qe("pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",t&&"pr-pl-8",e),...r,children:[n,x.jsx(Rr.ChevronRight,{className:"pr-ml-auto pr-h-4 pr-w-4"})]}));Ks.displayName=ge.SubTrigger.displayName;const Ys=E.forwardRef(({className:e,...t},n)=>x.jsx(ge.SubContent,{ref:n,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...t}));Ys.displayName=ge.SubContent.displayName;const mi=E.forwardRef(({className:e,sideOffset:t=4,...n},r)=>x.jsx(ge.Portal,{children:x.jsx(ge.Content,{ref:r,sideOffset:t,className:Qe("pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",e),...n})}));mi.displayName=ge.Content.displayName;const Js=E.forwardRef(({className:e,inset:t,...n},r)=>x.jsx(ge.Item,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",t&&"pr-pl-8",e),...n}));Js.displayName=ge.Item.displayName;const Zs=E.forwardRef(({className:e,children:t,checked:n,...r},o)=>x.jsxs(ge.CheckboxItem,{ref:o,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),checked:n,...r,children:[x.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:x.jsx(ge.ItemIndicator,{children:x.jsx(Rr.Check,{className:"pr-h-4 pr-w-4"})})}),t]}));Zs.displayName=ge.CheckboxItem.displayName;const Qs=E.forwardRef(({className:e,children:t,...n},r)=>x.jsxs(ge.RadioItem,{ref:r,className:Qe("pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",e),...n,children:[x.jsx("span",{className:"pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center",children:x.jsx(ge.ItemIndicator,{children:x.jsx(Rr.Circle,{className:"pr-h-2 pr-w-2 pr-fill-current"})})}),t]}));Qs.displayName=ge.RadioItem.displayName;const ea=E.forwardRef(({className:e,inset:t,...n},r)=>x.jsx(ge.Label,{ref:r,className:Qe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold",t&&"pr-pl-8",e),...n}));ea.displayName=ge.Label.displayName;const ta=E.forwardRef(({className:e,...t},n)=>x.jsx(ge.Separator,{ref:n,className:Qe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted",e),...t}));ta.displayName=ge.Separator.displayName;const gi=E.forwardRef(({className:e,type:t,...n},r)=>x.jsx("input",{type:t,className:Qe("pr-flex pr-h-10 pr-w-full pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",e),ref:r,...n}));gi.displayName="Input";const na=te.forwardRef(({handleSearch:e,handleClick:t,...n},r)=>x.jsx(gi,{...n,type:"text",className:"book-chapter-input",onChange:o=>e(o.target.value),onClick:t,ref:r}));function ra({endChapter:e,activeChapter:t,handleSelectChapter:n}){const r=Array.from({length:e},(o,i)=>i+1);return x.jsx("div",{className:"chapter-select",children:r.map(o=>x.jsx("div",{className:`chapter ${o===t?"active":void 0}`,onClick:()=>n(o),children:o},o))})}function oa(){const[e,t]=te.useState(""),n=o=>{t(o)},r=()=>{console.log("open")};return x.jsx("div",{children:x.jsxs(Gs,{children:[x.jsx(Xs,{asChild:!0,children:x.jsx(na,{value:e,handleSearch:n,handleClick:r,placeholder:"Hello"})}),x.jsx(mi,{children:x.jsx(ra,{endChapter:30,handleSelectChapter:o=>{throw new Error(`Function not implemented. ${o}`)},activeChapter:0})})]})})}function ut({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return x.jsx(de.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Rn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b}){return x.jsx(de.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b,renderInput:v=>x.jsx(de.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function ia({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=te.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return x.jsxs(x.Fragment,{children:[x.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:x.jsx(Rn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),x.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:x.jsx(Rn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var ft=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(ft||{});function bi({id:e,isChecked:t,labelText:n="",labelPosition:r=ft.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=x.jsx(de.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===ft.Before||r===ft.Above,b=x.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===ft.Before||r===ft.After,g=v?b:x.jsx("div",{children:b}),m=v?d:x.jsx("div",{children:d});f=x.jsxs(de.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&g,m,!p&&g]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function sa(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function aa(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var vr={exports:{}},xn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vo;function la(){if(vo)return se;vo=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function y(h){if(typeof h=="object"&&h!==null){var S=h.$$typeof;switch(S){case t:switch(h=h.type,h){case c:case u:case r:case i:case o:case f:return h;default:switch(h=h&&h.$$typeof,h){case l:case d:case v:case b:case a:return h;default:return S}}case n:return S}}}function w(h){return y(h)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(h){return w(h)||y(h)===c},se.isConcurrentMode=w,se.isContextConsumer=function(h){return y(h)===l},se.isContextProvider=function(h){return y(h)===a},se.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===t},se.isForwardRef=function(h){return y(h)===d},se.isFragment=function(h){return y(h)===r},se.isLazy=function(h){return y(h)===v},se.isMemo=function(h){return y(h)===b},se.isPortal=function(h){return y(h)===n},se.isProfiler=function(h){return y(h)===i},se.isStrictMode=function(h){return y(h)===o},se.isSuspense=function(h){return y(h)===f},se.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===r||h===u||h===i||h===o||h===f||h===p||typeof h=="object"&&h!==null&&(h.$$typeof===v||h.$$typeof===b||h.$$typeof===a||h.$$typeof===l||h.$$typeof===d||h.$$typeof===m||h.$$typeof===T||h.$$typeof===$||h.$$typeof===g)},se.typeOf=y,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yo;function ca(){return yo||(yo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function y(N){return typeof N=="string"||typeof N=="function"||N===r||N===u||N===i||N===o||N===f||N===p||typeof N=="object"&&N!==null&&(N.$$typeof===v||N.$$typeof===b||N.$$typeof===a||N.$$typeof===l||N.$$typeof===d||N.$$typeof===m||N.$$typeof===T||N.$$typeof===$||N.$$typeof===g)}function w(N){if(typeof N=="object"&&N!==null){var J=N.$$typeof;switch(J){case t:var P=N.type;switch(P){case c:case u:case r:case i:case o:case f:return P;default:var oe=P&&P.$$typeof;switch(oe){case l:case d:case v:case b:case a:return oe;default:return J}}case n:return J}}}var h=c,S=u,C=l,j=a,_=t,A=d,B=r,z=v,W=b,L=n,I=i,R=o,D=f,Q=!1;function Z(N){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(N)||w(N)===c}function O(N){return w(N)===u}function M(N){return w(N)===l}function V(N){return w(N)===a}function X(N){return typeof N=="object"&&N!==null&&N.$$typeof===t}function F(N){return w(N)===d}function U(N){return w(N)===r}function H(N){return w(N)===v}function G(N){return w(N)===b}function q(N){return w(N)===n}function K(N){return w(N)===i}function Y(N){return w(N)===o}function re(N){return w(N)===f}ae.AsyncMode=h,ae.ConcurrentMode=S,ae.ContextConsumer=C,ae.ContextProvider=j,ae.Element=_,ae.ForwardRef=A,ae.Fragment=B,ae.Lazy=z,ae.Memo=W,ae.Portal=L,ae.Profiler=I,ae.StrictMode=R,ae.Suspense=D,ae.isAsyncMode=Z,ae.isConcurrentMode=O,ae.isContextConsumer=M,ae.isContextProvider=V,ae.isElement=X,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=H,ae.isMemo=G,ae.isPortal=q,ae.isProfiler=K,ae.isStrictMode=Y,ae.isSuspense=re,ae.isValidElementType=y,ae.typeOf=w}()),ae}var xo;function vi(){return xo||(xo=1,process.env.NODE_ENV==="production"?xn.exports=la():xn.exports=ca()),xn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var nr,wo;function ua(){if(wo)return nr;wo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return nr=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},nr}var rr,Eo;function $r(){if(Eo)return rr;Eo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return rr=e,rr}var or,To;function yi(){return To||(To=1,or=Function.call.bind(Object.prototype.hasOwnProperty)),or}var ir,ko;function da(){if(ko)return ir;ko=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=$r(),n={},r=yi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},ir=o,ir}var sr,Oo;function pa(){if(Oo)return sr;Oo=1;var e=vi(),t=ua(),n=$r(),r=yi(),o=da(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return sr=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var M=O&&(u&&O[u]||O[d]);if(typeof M=="function")return M}var p="<<anonymous>>",b={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:$(),arrayOf:y,element:w(),elementType:h(),instanceOf:S,node:A(),objectOf:j,oneOf:C,oneOfType:_,shape:z,exact:W};function v(O,M){return O===M?O!==0||1/O===1/M:O!==O&&M!==M}function g(O,M){this.message=O,this.data=M&&typeof M=="object"?M:{},this.stack=""}g.prototype=Error.prototype;function m(O){if(process.env.NODE_ENV!=="production")var M={},V=0;function X(U,H,G,q,K,Y,re){if(q=q||p,Y=Y||G,re!==n){if(c){var N=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw N.name="Invariant Violation",N}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var J=q+":"+G;!M[J]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Y+"` prop on `"+q+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[J]=!0,V++)}}return H[G]==null?U?H[G]===null?new g("The "+K+" `"+Y+"` is marked as required "+("in `"+q+"`, but its value is `null`.")):new g("The "+K+" `"+Y+"` is marked as required in "+("`"+q+"`, but its value is `undefined`.")):null:O(H,G,q,K,Y)}var F=X.bind(null,!1);return F.isRequired=X.bind(null,!0),F}function T(O){function M(V,X,F,U,H,G){var q=V[X],K=R(q);if(K!==O){var Y=D(q);return new g("Invalid "+U+" `"+H+"` of type "+("`"+Y+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return m(M)}function $(){return m(a)}function y(O){function M(V,X,F,U,H){if(typeof O!="function")return new g("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[X];if(!Array.isArray(G)){var q=R(G);return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an array."))}for(var K=0;K<G.length;K++){var Y=O(G,K,F,U,H+"["+K+"]",n);if(Y instanceof Error)return Y}return null}return m(M)}function w(){function O(M,V,X,F,U){var H=M[V];if(!l(H)){var G=R(H);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(O)}function h(){function O(M,V,X,F,U){var H=M[V];if(!e.isValidElementType(H)){var G=R(H);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(O)}function S(O){function M(V,X,F,U,H){if(!(V[X]instanceof O)){var G=O.name||p,q=Z(V[X]);return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return m(M)}function C(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function M(V,X,F,U,H){for(var G=V[X],q=0;q<O.length;q++)if(v(G,O[q]))return null;var K=JSON.stringify(O,function(re,N){var J=D(N);return J==="symbol"?String(N):N});return new g("Invalid "+U+" `"+H+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+K+"."))}return m(M)}function j(O){function M(V,X,F,U,H){if(typeof O!="function")return new g("Property `"+H+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[X],q=R(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type "+("`"+q+"` supplied to `"+F+"`, expected an object."));for(var K in G)if(r(G,K)){var Y=O(G,K,F,U,H+"."+K,n);if(Y instanceof Error)return Y}return null}return m(M)}function _(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var M=0;M<O.length;M++){var V=O[M];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(V)+" at index "+M+"."),a}function X(F,U,H,G,q){for(var K=[],Y=0;Y<O.length;Y++){var re=O[Y],N=re(F,U,H,G,q,n);if(N==null)return null;N.data&&r(N.data,"expectedType")&&K.push(N.data.expectedType)}var J=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new g("Invalid "+G+" `"+q+"` supplied to "+("`"+H+"`"+J+"."))}return m(X)}function A(){function O(M,V,X,F,U){return L(M[V])?null:new g("Invalid "+F+" `"+U+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(O)}function B(O,M,V,X,F){return new g((O||"React class")+": "+M+" type `"+V+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function M(V,X,F,U,H){var G=V[X],q=R(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));for(var K in O){var Y=O[K];if(typeof Y!="function")return B(F,U,H,K,D(Y));var re=Y(G,K,F,U,H+"."+K,n);if(re)return re}return null}return m(M)}function W(O){function M(V,X,F,U,H){var G=V[X],q=R(G);if(q!=="object")return new g("Invalid "+U+" `"+H+"` of type `"+q+"` "+("supplied to `"+F+"`, expected `object`."));var K=t({},V[X],O);for(var Y in K){var re=O[Y];if(r(O,Y)&&typeof re!="function")return B(F,U,H,Y,D(re));if(!re)return new g("Invalid "+U+" `"+H+"` key `"+Y+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var N=re(G,Y,F,U,H+"."+Y,n);if(N)return N}return null}return m(M)}function L(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(L);if(O===null||l(O))return!0;var M=f(O);if(M){var V=M.call(O),X;if(M!==O.entries){for(;!(X=V.next()).done;)if(!L(X.value))return!1}else for(;!(X=V.next()).done;){var F=X.value;if(F&&!L(F[1]))return!1}}else return!1;return!0;default:return!1}}function I(O,M){return O==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function R(O){var M=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":I(M,O)?"symbol":M}function D(O){if(typeof O>"u"||O===null)return""+O;var M=R(O);if(M==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return M}function Q(O){var M=D(O);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},sr}var ar,So;function fa(){if(So)return ar;So=1;var e=$r();function t(){}function n(){}return n.resetWarningCache=t,ar=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ar}if(process.env.NODE_ENV!=="production"){var ha=vi(),ma=!0;vr.exports=pa()(ha.isElement,ma)}else vr.exports=fa()();var ga=vr.exports;const s=sa(ga);function Dt(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function ht(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function xi(e){if(!ht(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=xi(e[n])}),t}function Ke(e,t,n={clone:!0}){const r=n.clone?k({},e):e;return ht(e)&&ht(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(ht(t[o])&&o in e&&ht(e[o])?r[o]=Ke(e[o],t[o],n):n.clone?r[o]=ht(t[o])?xi(t[o]):t[o]:r[o]=t[o])}),r}function ba(e){const{prototype:t={}}=e;return!!t.isReactComponent}function wi(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!ba(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Ei=Dt(s.element,wi);Ei.isRequired=Dt(s.element.isRequired,wi);const un=Ei;function va(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ya(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!va(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const xa=Dt(s.elementType,ya),wa="exact-prop: ​";function Ti(e){return process.env.NODE_ENV==="production"?e:k({},e,{[wa]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function $t(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var yr={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Co;function Ea(){if(Co)return le;Co=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(m){if(typeof m=="object"&&m!==null){var T=m.$$typeof;switch(T){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case p:case f:case i:return m;default:return T}}case t:return T}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(m){return g(m)===a},le.isContextProvider=function(m){return g(m)===i},le.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},le.isForwardRef=function(m){return g(m)===c},le.isFragment=function(m){return g(m)===n},le.isLazy=function(m){return g(m)===p},le.isMemo=function(m){return g(m)===f},le.isPortal=function(m){return g(m)===t},le.isProfiler=function(m){return g(m)===o},le.isStrictMode=function(m){return g(m)===r},le.isSuspense=function(m){return g(m)===u},le.isSuspenseList=function(m){return g(m)===d},le.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===p||m.$$typeof===f||m.$$typeof===i||m.$$typeof===a||m.$$typeof===c||m.$$typeof===v||m.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Po;function Ta(){return Po||(Po=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,m=!1,T=!1,$=!1,y;y=Symbol.for("react.module.reference");function w(P){return!!(typeof P=="string"||typeof P=="function"||P===n||P===o||$||P===r||P===u||P===d||T||P===b||v||g||m||typeof P=="object"&&P!==null&&(P.$$typeof===p||P.$$typeof===f||P.$$typeof===i||P.$$typeof===a||P.$$typeof===c||P.$$typeof===y||P.getModuleId!==void 0))}function h(P){if(typeof P=="object"&&P!==null){var oe=P.$$typeof;switch(oe){case e:var ve=P.type;switch(ve){case n:case o:case r:case u:case d:return ve;default:var Te=ve&&ve.$$typeof;switch(Te){case l:case a:case c:case p:case f:case i:return Te;default:return oe}}case t:return oe}}}var S=a,C=i,j=e,_=c,A=n,B=p,z=f,W=t,L=o,I=r,R=u,D=d,Q=!1,Z=!1;function O(P){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(P){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(P){return h(P)===a}function X(P){return h(P)===i}function F(P){return typeof P=="object"&&P!==null&&P.$$typeof===e}function U(P){return h(P)===c}function H(P){return h(P)===n}function G(P){return h(P)===p}function q(P){return h(P)===f}function K(P){return h(P)===t}function Y(P){return h(P)===o}function re(P){return h(P)===r}function N(P){return h(P)===u}function J(P){return h(P)===d}ce.ContextConsumer=S,ce.ContextProvider=C,ce.Element=j,ce.ForwardRef=_,ce.Fragment=A,ce.Lazy=B,ce.Memo=z,ce.Portal=W,ce.Profiler=L,ce.StrictMode=I,ce.Suspense=R,ce.SuspenseList=D,ce.isAsyncMode=O,ce.isConcurrentMode=M,ce.isContextConsumer=V,ce.isContextProvider=X,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=H,ce.isLazy=G,ce.isMemo=q,ce.isPortal=K,ce.isProfiler=Y,ce.isStrictMode=re,ce.isSuspense=N,ce.isSuspenseList=J,ce.isValidElementType=w,ce.typeOf=h}()),ce}process.env.NODE_ENV==="production"?yr.exports=Ea():yr.exports=Ta();var Nn=yr.exports;const ka=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Oa(e){const t=`${e}`.match(ka);return t&&t[1]||""}function ki(e,t=""){return e.displayName||e.name||Oa(e)||t}function Ro(e,t,n){const r=ki(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function Sa(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ki(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Nn.ForwardRef:return Ro(e,e.render,"ForwardRef");case Nn.Memo:return Ro(e,e.type,"memo");default:return}}}function Ye(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const Ca=s.oneOfType([s.func,s.object]),Mr=Ca;function Ue(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":$t(7));return e.charAt(0).toUpperCase()+e.slice(1)}function xr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Oi(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function Pa(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function Ra(e,t){var n,r;return E.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function we(e){return e&&e.ownerDocument||document}function Mt(e){return we(e).defaultView||window}function Na(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?k({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const b=p(i,a,l,c,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function $n(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const $a=typeof window<"u"?E.useLayoutEffect:E.useEffect,gt=$a;let No=0;function Ma(e){const[t,n]=E.useState(e),r=e||t;return E.useEffect(()=>{t==null&&(No+=1,n(`mui-${No}`))},[t]),r}const $o=E["useId".toString()];function Si(e){if($o!==void 0){const t=$o();return e??t}return Ma(e)}function Ia(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ci({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=E.useRef(e!==void 0),[i,a]=E.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){E.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=E.useRef(t);E.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=E.useCallback(u=>{o||a(u)},[]);return[l,c]}function rn(e){const t=E.useRef(e);return gt(()=>{t.current=e}),E.useRef((...n)=>(0,t.current)(...n)).current}function Ae(...e){return E.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{$n(n,t)})},e)}const Mo={};function _a(e,t){const n=E.useRef(Mo);return n.current===Mo&&(n.current=e(t)),n}const ja=[];function Aa(e){E.useEffect(e,ja)}class dn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new dn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Yt(){const e=_a(dn.create).current;return Aa(e.disposeEffect),e}let Ln=!0,wr=!1;const Da=new dn,Ba={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function La(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&Ba[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Fa(e){e.metaKey||e.altKey||e.ctrlKey||(Ln=!0)}function lr(){Ln=!1}function Va(){this.visibilityState==="hidden"&&wr&&(Ln=!0)}function za(e){e.addEventListener("keydown",Fa,!0),e.addEventListener("mousedown",lr,!0),e.addEventListener("pointerdown",lr,!0),e.addEventListener("touchstart",lr,!0),e.addEventListener("visibilitychange",Va,!0)}function Ua(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Ln||La(t)}function Pi(){const e=E.useCallback(o=>{o!=null&&za(o.ownerDocument)},[]),t=E.useRef(!1);function n(){return t.current?(wr=!0,Da.start(100,()=>{wr=!1}),t.current=!1,!0):!1}function r(o){return Ua(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function Ri(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function qa(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Ha(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Wa=Number.isInteger||Ha;function Ni(e,t,n,r){const o=e[t];if(o==null||!Wa(o)){const i=qa(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function $i(e,t,...n){return e[t]===void 0?null:Ni(e,t,...n)}function Er(){return null}$i.isRequired=Ni;Er.isRequired=Er;const Mi=process.env.NODE_ENV==="production"?Er:$i;function Ii(e,t){const n=k({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=k({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=k({},i),Object.keys(o).forEach(a=>{n[r][a]=Ii(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function et(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Io=e=>e,Ga=()=>{let e=Io;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Io}}},Xa=Ga(),_i=Xa,ji={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function He(e,t,n="Mui"){const r=ji[t];return r?`${n}-${r}`:`${_i.generate(e)}-${t}`}function it(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=He(e,o,n)}),r}function Ka(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Ai(e){return typeof e=="string"}function Jt(e,t,n){return e===void 0||Ai(e)?t:k({},t,{ownerState:k({},t.ownerState,n)})}const Ya={disableDefaultClasses:!1},Ja=E.createContext(Ya);function Za(e){const{disableDefaultClasses:t}=E.useContext(Ja);return n=>t?"":e(n)}function Di(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Qa(e,t,n){return typeof e=="function"?e(t,n):e}function _o(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function el(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=xe(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=k({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=k({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=Di(k({},o,r)),l=_o(r),c=_o(o),u=t(a),d=xe(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=k({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=k({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const tl=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function bt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,tl),l=i?{}:Qa(r,o),{props:c,internalRef:u}=el(k({},a,{externalSlotProps:l})),d=Ae(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Jt(n,k({},c,{ref:d}),o)}const Bi="base";function nl(e){return`${Bi}--${e}`}function rl(e,t){return`${Bi}-${e}-${t}`}function Li(e,t){const n=ji[t];return n?nl(n):rl(e,t)}function ol(e,t){const n={};return t.forEach(r=>{n[r]=Li(e,r)}),n}const il=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function sl(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function al(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function ll(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||al(e))}function cl(e){const t=[],n=[];return Array.from(e.querySelectorAll(il)).forEach((r,o)=>{const i=sl(r);i===-1||!ll(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function ul(){return!0}function Mn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=cl,isEnabled:a=ul,open:l}=e,c=E.useRef(!1),u=E.useRef(null),d=E.useRef(null),f=E.useRef(null),p=E.useRef(null),b=E.useRef(!1),v=E.useRef(null),g=Ae(t.ref,v),m=E.useRef(null);E.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),E.useEffect(()=>{if(!l||!v.current)return;const y=we(v.current);return v.current.contains(y.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),E.useEffect(()=>{if(!l||!v.current)return;const y=we(v.current),w=C=>{m.current=C,!(r||!a()||C.key!=="Tab")&&y.activeElement===v.current&&C.shiftKey&&(c.current=!0,d.current&&d.current.focus())},h=()=>{const C=v.current;if(C===null)return;if(!y.hasFocus()||!a()||c.current){c.current=!1;return}if(C.contains(y.activeElement)||r&&y.activeElement!==u.current&&y.activeElement!==d.current)return;if(y.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!b.current)return;let j=[];if((y.activeElement===u.current||y.activeElement===d.current)&&(j=i(v.current)),j.length>0){var _,A;const B=!!((_=m.current)!=null&&_.shiftKey&&((A=m.current)==null?void 0:A.key)==="Tab"),z=j[0],W=j[j.length-1];typeof z!="string"&&typeof W!="string"&&(B?W.focus():z.focus())}else C.focus()};y.addEventListener("focusin",h),y.addEventListener("keydown",w,!0);const S=setInterval(()=>{y.activeElement&&y.activeElement.tagName==="BODY"&&h()},50);return()=>{clearInterval(S),y.removeEventListener("focusin",h),y.removeEventListener("keydown",w,!0)}},[n,r,o,a,l,i]);const T=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0,p.current=y.target;const w=t.props.onFocus;w&&w(y)},$=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0};return x.jsxs(E.Fragment,{children:[x.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),E.cloneElement(t,{ref:g,onFocus:T}),x.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Mn.propTypes={children:un,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(Mn["propTypes"]=Ti(Mn.propTypes));function dl(e){return typeof e=="function"?e():e}const on=E.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=E.useState(null),c=Ae(E.isValidElement(r)?r.ref:null,n);if(gt(()=>{i||l(dl(o)||document.body)},[o,i]),gt(()=>{if(a&&!i)return $n(n,a),()=>{$n(n,null)}},[n,a,i]),i){if(E.isValidElement(r)){const u={ref:c};return E.cloneElement(r,u)}return x.jsx(E.Fragment,{children:r})}return x.jsx(E.Fragment,{children:a&&Ws.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(on.propTypes={children:s.node,container:s.oneOfType([Ye,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(on["propTypes"]=Ti(on.propTypes));function pl(e){const t=we(e);return t.body===e?Mt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Qt(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function jo(e){return parseInt(Mt(e).getComputedStyle(e).paddingRight,10)||0}function fl(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Ao(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!fl(a);l&&c&&Qt(a,o)})}function cr(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function hl(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(pl(r)){const a=Ri(we(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${jo(r)+a}px`;const l=we(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${jo(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=we(r).body;else{const a=r.parentElement,l=Mt(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function ml(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class gl{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Qt(t.modalRef,!1);const o=ml(n);Ao(n,t.mount,t.modalRef,o,!0);const i=cr(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=cr(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=hl(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=cr(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&Qt(t.modalRef,n),Ao(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&Qt(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function bl(e){return typeof e=="function"?e():e}function vl(e){return e?e.props.hasOwnProperty("in"):!1}const yl=new gl;function xl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=yl,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=E.useRef({}),b=E.useRef(null),v=E.useRef(null),g=Ae(v,f),[m,T]=E.useState(!d),$=vl(c);let y=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(y=!1);const w=()=>we(b.current),h=()=>(p.current.modalRef=v.current,p.current.mount=b.current,p.current),S=()=>{o.mount(h(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},C=rn(()=>{const R=bl(t)||w().body;o.add(h(),R),v.current&&S()}),j=E.useCallback(()=>o.isTopModal(h()),[o]),_=rn(R=>{b.current=R,R&&(d&&j()?S():v.current&&Qt(v.current,y))}),A=E.useCallback(()=>{o.remove(h(),y)},[y,o]);E.useEffect(()=>()=>{A()},[A]),E.useEffect(()=>{d?C():(!$||!i)&&A()},[d,A,$,i,C]);const B=R=>D=>{var Q;(Q=R.onKeyDown)==null||Q.call(R,D),!(D.key!=="Escape"||D.which===229||!j())&&(n||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},z=R=>D=>{var Q;(Q=R.onClick)==null||Q.call(R,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:(R={})=>{const D=Di(e);delete D.onTransitionEnter,delete D.onTransitionExited;const Q=k({},D,R);return k({role:"presentation"},Q,{onKeyDown:B(Q),ref:g})},getBackdropProps:(R={})=>{const D=R;return k({"aria-hidden":!0},D,{onClick:z(D),open:d})},getTransitionProps:()=>{const R=()=>{T(!1),a&&a()},D=()=>{T(!0),l&&l(),i&&A()};return{onEnter:xr(R,c==null?void 0:c.props.onEnter),onExited:xr(D,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:_,isTopModal:j,exited:m,hasTransition:$}}var Se="top",De="bottom",Be="right",Ce="left",Ir="auto",pn=[Se,De,Be,Ce],It="start",sn="end",wl="clippingParents",Fi="viewport",qt="popper",El="reference",Do=pn.reduce(function(e,t){return e.concat([t+"-"+It,t+"-"+sn])},[]),Vi=[].concat(pn,[Ir]).reduce(function(e,t){return e.concat([t,t+"-"+It,t+"-"+sn])},[]),Tl="beforeRead",kl="read",Ol="afterRead",Sl="beforeMain",Cl="main",Pl="afterMain",Rl="beforeWrite",Nl="write",$l="afterWrite",Ml=[Tl,kl,Ol,Sl,Cl,Pl,Rl,Nl,$l];function qe(e){return e?(e.nodeName||"").toLowerCase():null}function Me(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function vt(e){var t=Me(e).Element;return e instanceof t||e instanceof Element}function je(e){var t=Me(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function _r(e){if(typeof ShadowRoot>"u")return!1;var t=Me(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Il(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!je(i)||!qe(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function _l(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!je(o)||!qe(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const jl={name:"applyStyles",enabled:!0,phase:"write",fn:Il,effect:_l,requires:["computeStyles"]};function ze(e){return e.split("-")[0]}var mt=Math.max,In=Math.min,_t=Math.round;function Tr(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function zi(){return!/^((?!chrome|android).)*safari/i.test(Tr())}function jt(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&je(e)&&(o=e.offsetWidth>0&&_t(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&_t(r.height)/e.offsetHeight||1);var a=vt(e)?Me(e):window,l=a.visualViewport,c=!zi()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function jr(e){var t=jt(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Ui(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&_r(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Je(e){return Me(e).getComputedStyle(e)}function Al(e){return["table","td","th"].indexOf(qe(e))>=0}function st(e){return((vt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Fn(e){return qe(e)==="html"?e:e.assignedSlot||e.parentNode||(_r(e)?e.host:null)||st(e)}function Bo(e){return!je(e)||Je(e).position==="fixed"?null:e.offsetParent}function Dl(e){var t=/firefox/i.test(Tr()),n=/Trident/i.test(Tr());if(n&&je(e)){var r=Je(e);if(r.position==="fixed")return null}var o=Fn(e);for(_r(o)&&(o=o.host);je(o)&&["html","body"].indexOf(qe(o))<0;){var i=Je(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function fn(e){for(var t=Me(e),n=Bo(e);n&&Al(n)&&Je(n).position==="static";)n=Bo(n);return n&&(qe(n)==="html"||qe(n)==="body"&&Je(n).position==="static")?t:n||Dl(e)||t}function Ar(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function en(e,t,n){return mt(e,In(t,n))}function Bl(e,t,n){var r=en(e,t,n);return r>n?n:r}function qi(){return{top:0,right:0,bottom:0,left:0}}function Hi(e){return Object.assign({},qi(),e)}function Wi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var Ll=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Hi(typeof t!="number"?t:Wi(t,pn))};function Fl(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=ze(n.placement),c=Ar(l),u=[Ce,Be].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=Ll(o.padding,n),p=jr(i),b=c==="y"?Se:Ce,v=c==="y"?De:Be,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],T=fn(i),$=T?c==="y"?T.clientHeight||0:T.clientWidth||0:0,y=g/2-m/2,w=f[b],h=$-p[d]-f[v],S=$/2-p[d]/2+y,C=en(w,S,h),j=c;n.modifiersData[r]=(t={},t[j]=C,t.centerOffset=C-S,t)}}function Vl(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Ui(t.elements.popper,o)&&(t.elements.arrow=o))}const zl={name:"arrow",enabled:!0,phase:"main",fn:Fl,effect:Vl,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function At(e){return e.split("-")[1]}var Ul={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ql(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:_t(n*o)/o||0,y:_t(r*o)/o||0}}function Lo(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,b=p===void 0?0:p,v=a.y,g=v===void 0?0:v,m=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=m.x,g=m.y;var T=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),y=Ce,w=Se,h=window;if(u){var S=fn(n),C="clientHeight",j="clientWidth";if(S===Me(n)&&(S=st(n),Je(S).position!=="static"&&l==="absolute"&&(C="scrollHeight",j="scrollWidth")),S=S,o===Se||(o===Ce||o===Be)&&i===sn){w=De;var _=f&&S===h&&h.visualViewport?h.visualViewport.height:S[C];g-=_-r.height,g*=c?1:-1}if(o===Ce||(o===Se||o===De)&&i===sn){y=Be;var A=f&&S===h&&h.visualViewport?h.visualViewport.width:S[j];b-=A-r.width,b*=c?1:-1}}var B=Object.assign({position:l},u&&Ul),z=d===!0?ql({x:b,y:g},Me(n)):{x:b,y:g};if(b=z.x,g=z.y,c){var W;return Object.assign({},B,(W={},W[w]=$?"0":"",W[y]=T?"0":"",W.transform=(h.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",W))}return Object.assign({},B,(t={},t[w]=$?g+"px":"",t[y]=T?b+"px":"",t.transform="",t))}function Hl(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:ze(t.placement),variation:At(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Lo(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Lo(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Wl={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Hl,data:{}};var wn={passive:!0};function Gl(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=Me(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,wn)}),l&&c.addEventListener("resize",n.update,wn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,wn)}),l&&c.removeEventListener("resize",n.update,wn)}}const Xl={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Gl,data:{}};var Kl={left:"right",right:"left",bottom:"top",top:"bottom"};function On(e){return e.replace(/left|right|bottom|top/g,function(t){return Kl[t]})}var Yl={start:"end",end:"start"};function Fo(e){return e.replace(/start|end/g,function(t){return Yl[t]})}function Dr(e){var t=Me(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Br(e){return jt(st(e)).left+Dr(e).scrollLeft}function Jl(e,t){var n=Me(e),r=st(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=zi();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Br(e),y:c}}function Zl(e){var t,n=st(e),r=Dr(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=mt(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=mt(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Br(e),c=-r.scrollTop;return Je(o||n).direction==="rtl"&&(l+=mt(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Lr(e){var t=Je(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Gi(e){return["html","body","#document"].indexOf(qe(e))>=0?e.ownerDocument.body:je(e)&&Lr(e)?e:Gi(Fn(e))}function tn(e,t){var n;t===void 0&&(t=[]);var r=Gi(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=Me(r),a=o?[i].concat(i.visualViewport||[],Lr(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(tn(Fn(a)))}function kr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Ql(e,t){var n=jt(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Vo(e,t,n){return t===Fi?kr(Jl(e,n)):vt(t)?Ql(t,n):kr(Zl(st(e)))}function ec(e){var t=tn(Fn(e)),n=["absolute","fixed"].indexOf(Je(e).position)>=0,r=n&&je(e)?fn(e):e;return vt(r)?t.filter(function(o){return vt(o)&&Ui(o,r)&&qe(o)!=="body"}):[]}function tc(e,t,n,r){var o=t==="clippingParents"?ec(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Vo(e,u,r);return c.top=mt(d.top,c.top),c.right=In(d.right,c.right),c.bottom=In(d.bottom,c.bottom),c.left=mt(d.left,c.left),c},Vo(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Xi(e){var t=e.reference,n=e.element,r=e.placement,o=r?ze(r):null,i=r?At(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case Se:c={x:a,y:t.y-n.height};break;case De:c={x:a,y:t.y+t.height};break;case Be:c={x:t.x+t.width,y:l};break;case Ce:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Ar(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case It:c[u]=c[u]-(t[d]/2-n[d]/2);break;case sn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function an(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?wl:l,u=n.rootBoundary,d=u===void 0?Fi:u,f=n.elementContext,p=f===void 0?qt:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,m=g===void 0?0:g,T=Hi(typeof m!="number"?m:Wi(m,pn)),$=p===qt?El:qt,y=e.rects.popper,w=e.elements[v?$:p],h=tc(vt(w)?w:w.contextElement||st(e.elements.popper),c,d,a),S=jt(e.elements.reference),C=Xi({reference:S,element:y,strategy:"absolute",placement:o}),j=kr(Object.assign({},y,C)),_=p===qt?j:S,A={top:h.top-_.top+T.top,bottom:_.bottom-h.bottom+T.bottom,left:h.left-_.left+T.left,right:_.right-h.right+T.right},B=e.modifiersData.offset;if(p===qt&&B){var z=B[o];Object.keys(A).forEach(function(W){var L=[Be,De].indexOf(W)>=0?1:-1,I=[Se,De].indexOf(W)>=0?"y":"x";A[W]+=z[I]*L})}return A}function nc(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Vi:c,d=At(r),f=d?l?Do:Do.filter(function(v){return At(v)===d}):pn,p=f.filter(function(v){return u.indexOf(v)>=0});p.length===0&&(p=f);var b=p.reduce(function(v,g){return v[g]=an(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[ze(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function rc(e){if(ze(e)===Ir)return[];var t=On(e);return[Fo(e),t,Fo(t)]}function oc(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,m=t.options.placement,T=ze(m),$=T===m,y=c||($||!v?[On(m)]:rc(m)),w=[m].concat(y).reduce(function(F,U){return F.concat(ze(U)===Ir?nc(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):U)},[]),h=t.rects.reference,S=t.rects.popper,C=new Map,j=!0,_=w[0],A=0;A<w.length;A++){var B=w[A],z=ze(B),W=At(B)===It,L=[Se,De].indexOf(z)>=0,I=L?"width":"height",R=an(t,{placement:B,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),D=L?W?Be:Ce:W?De:Se;h[I]>S[I]&&(D=On(D));var Q=On(D),Z=[];if(i&&Z.push(R[z]<=0),l&&Z.push(R[D]<=0,R[Q]<=0),Z.every(function(F){return F})){_=B,j=!1;break}C.set(B,Z)}if(j)for(var O=v?3:1,M=function(U){var H=w.find(function(G){var q=C.get(G);if(q)return q.slice(0,U).every(function(K){return K})});if(H)return _=H,"break"},V=O;V>0;V--){var X=M(V);if(X==="break")break}t.placement!==_&&(t.modifiersData[r]._skip=!0,t.placement=_,t.reset=!0)}}const ic={name:"flip",enabled:!0,phase:"main",fn:oc,requiresIfExists:["offset"],data:{_skip:!1}};function zo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Uo(e){return[Se,Be,De,Ce].some(function(t){return e[t]>=0})}function sc(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=an(t,{elementContext:"reference"}),l=an(t,{altBoundary:!0}),c=zo(a,r),u=zo(l,o,i),d=Uo(c),f=Uo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const ac={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:sc};function lc(e,t,n){var r=ze(e),o=[Ce,Se].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Ce,Be].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function cc(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Vi.reduce(function(d,f){return d[f]=lc(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const uc={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:cc};function dc(e){var t=e.state,n=e.name;t.modifiersData[n]=Xi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const pc={name:"popperOffsets",enabled:!0,phase:"read",fn:dc,data:{}};function fc(e){return e==="x"?"y":"x"}function hc(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,b=p===void 0?!0:p,v=n.tetherOffset,g=v===void 0?0:v,m=an(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),T=ze(t.placement),$=At(t.placement),y=!$,w=Ar(T),h=fc(w),S=t.modifiersData.popperOffsets,C=t.rects.reference,j=t.rects.popper,_=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,A=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(S){if(i){var W,L=w==="y"?Se:Ce,I=w==="y"?De:Be,R=w==="y"?"height":"width",D=S[w],Q=D+m[L],Z=D-m[I],O=b?-j[R]/2:0,M=$===It?C[R]:j[R],V=$===It?-j[R]:-C[R],X=t.elements.arrow,F=b&&X?jr(X):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:qi(),H=U[L],G=U[I],q=en(0,C[R],F[R]),K=y?C[R]/2-O-q-H-A.mainAxis:M-q-H-A.mainAxis,Y=y?-C[R]/2+O+q+G+A.mainAxis:V+q+G+A.mainAxis,re=t.elements.arrow&&fn(t.elements.arrow),N=re?w==="y"?re.clientTop||0:re.clientLeft||0:0,J=(W=B==null?void 0:B[w])!=null?W:0,P=D+K-J-N,oe=D+Y-J,ve=en(b?In(Q,P):Q,D,b?mt(Z,oe):Z);S[w]=ve,z[w]=ve-D}if(l){var Te,me=w==="x"?Se:Ce,lt=w==="x"?De:Be,ke=S[h],We=h==="y"?"height":"width",Pe=ke+m[me],Ge=ke-m[lt],ye=[Se,Ce].indexOf(T)!==-1,wt=(Te=B==null?void 0:B[h])!=null?Te:0,ct=ye?Pe:ke-C[We]-j[We]-wt+A.altAxis,Lt=ye?ke+C[We]+j[We]-wt-A.altAxis:Ge,bn=b&&ye?Bl(ct,ke,Lt):en(b?ct:Pe,ke,b?Lt:Ge);S[h]=bn,z[h]=bn-ke}t.modifiersData[r]=z}}const mc={name:"preventOverflow",enabled:!0,phase:"main",fn:hc,requiresIfExists:["offset"]};function gc(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function bc(e){return e===Me(e)||!je(e)?Dr(e):gc(e)}function vc(e){var t=e.getBoundingClientRect(),n=_t(t.width)/e.offsetWidth||1,r=_t(t.height)/e.offsetHeight||1;return n!==1||r!==1}function yc(e,t,n){n===void 0&&(n=!1);var r=je(t),o=je(t)&&vc(t),i=st(t),a=jt(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((qe(t)!=="body"||Lr(i))&&(l=bc(t)),je(t)?(c=jt(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Br(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function xc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function wc(e){var t=xc(e);return Ml.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function Ec(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function Tc(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var qo={placement:"bottom",modifiers:[],strategy:"absolute"};function Ho(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function kc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?qo:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},qo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,b={state:d,setOptions:function(T){var $=typeof T=="function"?T(d.options):T;g(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:vt(l)?tn(l):l.contextElement?tn(l.contextElement):[],popper:tn(c)};var y=wc(Tc([].concat(r,d.options.modifiers)));return d.orderedModifiers=y.filter(function(w){return w.enabled}),v(),b.update()},forceUpdate:function(){if(!p){var T=d.elements,$=T.reference,y=T.popper;if(Ho($,y)){d.rects={reference:yc($,fn(y),d.options.strategy==="fixed"),popper:jr(y)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(A){return d.modifiersData[A.name]=Object.assign({},A.data)});for(var w=0;w<d.orderedModifiers.length;w++){if(d.reset===!0){d.reset=!1,w=-1;continue}var h=d.orderedModifiers[w],S=h.fn,C=h.options,j=C===void 0?{}:C,_=h.name;typeof S=="function"&&(d=S({state:d,options:j,name:_,instance:b})||d)}}}},update:Ec(function(){return new Promise(function(m){b.forceUpdate(),m(d)})}),destroy:function(){g(),p=!0}};if(!Ho(l,c))return b;b.setOptions(u).then(function(m){!p&&u.onFirstUpdate&&u.onFirstUpdate(m)});function v(){d.orderedModifiers.forEach(function(m){var T=m.name,$=m.options,y=$===void 0?{}:$,w=m.effect;if(typeof w=="function"){var h=w({state:d,name:T,instance:b,options:y}),S=function(){};f.push(h||S)}})}function g(){f.forEach(function(m){return m()}),f=[]}return b}}var Oc=[Xl,pc,Wl,jl,uc,ic,mc,zl,ac],Sc=kc({defaultModifiers:Oc});const Ki="Popper";function Cc(e){return Li(Ki,e)}ol(Ki,["root"]);const Pc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Rc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Nc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function _n(e){return typeof e=="function"?e():e}function Vn(e){return e.nodeType!==void 0}function $c(e){return!Vn(e)}const Mc=()=>et({root:["root"]},Za(Cc)),Ic={},_c=E.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:b={},slots:v={},TransitionProps:g}=t,m=ue(t,Pc),T=E.useRef(null),$=Ae(T,n),y=E.useRef(null),w=Ae(y,p),h=E.useRef(w);gt(()=>{h.current=w},[w]),E.useImperativeHandle(p,()=>y.current,[]);const S=Nc(d,a),[C,j]=E.useState(S),[_,A]=E.useState(_n(o));E.useEffect(()=>{y.current&&y.current.forceUpdate()}),E.useEffect(()=>{o&&A(_n(o))},[o]),gt(()=>{if(!_||!u)return;const I=Q=>{j(Q.placement)};if(process.env.NODE_ENV!=="production"&&_&&Vn(_)&&_.nodeType===1){const Q=_.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let R=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{I(Q)}}];c!=null&&(R=R.concat(c)),f&&f.modifiers!=null&&(R=R.concat(f.modifiers));const D=Sc(_,T.current,k({placement:S},f,{modifiers:R}));return h.current(D),()=>{D.destroy(),h.current(null)}},[_,l,c,u,f,S]);const B={placement:C};g!==null&&(B.TransitionProps=g);const z=Mc(),W=(r=v.root)!=null?r:"div",L=bt({elementType:W,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:z.root});return x.jsx(W,k({},L,{children:typeof i=="function"?i(B):i}))}),Yi=E.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=Ic,popperRef:b,style:v,transition:g=!1,slotProps:m={},slots:T={}}=t,$=ue(t,Rc),[y,w]=E.useState(!0),h=()=>{w(!1)},S=()=>{w(!0)};if(!c&&!d&&(!g||y))return null;let C;if(i)C=i;else if(r){const A=_n(r);C=A&&Vn(A)?we(A).body:we(null).body}const j=!d&&c&&(!g||y)?"none":void 0,_=g?{in:d,onEnter:h,onExited:S}:void 0;return x.jsx(on,{disablePortal:l,container:C,children:x.jsx(_c,k({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!y:d,placement:f,popperOptions:p,popperRef:b,slotProps:m,slots:T},$,{style:k({position:"fixed",top:0,left:0,display:j},v),TransitionProps:_,children:o}))})});process.env.NODE_ENV!=="production"&&(Yi.propTypes={anchorEl:Dt(s.oneOfType([Ye,s.object,s.func]),e=>{if(e.open){const t=_n(e.anchorEl);if(t&&Vn(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||$c(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Ye,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Mr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const jc=["values","unit","step"],Ac=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>k({},n,{[r.key]:r.val}),{})};function Dc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,jc),i=Ac(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const b=a.indexOf(p);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return k({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const Bc={borderRadius:4},Lc=Bc,Fc=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},at=Fc;function nn(e,t){return t?Ke(e,t,{clone:!1}):e}const Fr={xs:0,sm:600,md:900,lg:1200,xl:1536},Wo={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Fr[e]}px)`};function Ze(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||Wo;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||Wo;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||Fr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function Vc(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function zc(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function zn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function jn(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=zn(e,n)||r,t&&(o=t(o,r,e)),o}function be(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=zn(c,r)||{};return Ze(a,l,f=>{let p=jn(u,o,f);return f===p&&typeof f=="string"&&(p=jn(u,o,`${t}${f==="default"?"":Ue(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:at}:{},i.filterProps=[t],i}function Uc(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const qc={m:"margin",p:"padding"},Hc={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Go={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Wc=Uc(e=>{if(e.length>2)if(Go[e])e=Go[e];else return[e];const[t,n]=e.split(""),r=qc[t],o=Hc[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Un=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],qn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Gc=[...Un,...qn];function hn(e,t,n,r){var o;const i=(o=zn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ji(e){return hn(e,"spacing",8,"spacing")}function mn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Xc(e,t){return n=>e.reduce((r,o)=>(r[o]=mn(t,n),r),{})}function Kc(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Wc(n),i=Xc(o,r),a=e[n];return Ze(e,a,i)}function Zi(e,t){const n=Ji(e.theme);return Object.keys(e).map(r=>Kc(e,t,r,n)).reduce(nn,{})}function fe(e){return Zi(e,Un)}fe.propTypes=process.env.NODE_ENV!=="production"?Un.reduce((e,t)=>(e[t]=at,e),{}):{};fe.filterProps=Un;function he(e){return Zi(e,qn)}he.propTypes=process.env.NODE_ENV!=="production"?qn.reduce((e,t)=>(e[t]=at,e),{}):{};he.filterProps=qn;process.env.NODE_ENV!=="production"&&Gc.reduce((e,t)=>(e[t]=at,e),{});function Yc(e=8){if(e.mui)return e;const t=Ji({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Hn(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?nn(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function _e(e){return typeof e!="number"?e:`${e}px solid`}function Le(e,t){return be({prop:e,themeKey:"borders",transform:t})}const Jc=Le("border",_e),Zc=Le("borderTop",_e),Qc=Le("borderRight",_e),eu=Le("borderBottom",_e),tu=Le("borderLeft",_e),nu=Le("borderColor"),ru=Le("borderTopColor"),ou=Le("borderRightColor"),iu=Le("borderBottomColor"),su=Le("borderLeftColor"),au=Le("outline",_e),lu=Le("outlineColor"),Wn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=hn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:mn(t,r)});return Ze(e,e.borderRadius,n)}return null};Wn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:at}:{};Wn.filterProps=["borderRadius"];Hn(Jc,Zc,Qc,eu,tu,nu,ru,ou,iu,su,Wn,au,lu);const Gn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=hn(e.theme,"spacing",8,"gap"),n=r=>({gap:mn(t,r)});return Ze(e,e.gap,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{gap:at}:{};Gn.filterProps=["gap"];const Xn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=hn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:mn(t,r)});return Ze(e,e.columnGap,n)}return null};Xn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:at}:{};Xn.filterProps=["columnGap"];const Kn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=hn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:mn(t,r)});return Ze(e,e.rowGap,n)}return null};Kn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:at}:{};Kn.filterProps=["rowGap"];const cu=be({prop:"gridColumn"}),uu=be({prop:"gridRow"}),du=be({prop:"gridAutoFlow"}),pu=be({prop:"gridAutoColumns"}),fu=be({prop:"gridAutoRows"}),hu=be({prop:"gridTemplateColumns"}),mu=be({prop:"gridTemplateRows"}),gu=be({prop:"gridTemplateAreas"}),bu=be({prop:"gridArea"});Hn(Gn,Xn,Kn,cu,uu,du,pu,fu,hu,mu,gu,bu);function Nt(e,t){return t==="grey"?t:e}const vu=be({prop:"color",themeKey:"palette",transform:Nt}),yu=be({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Nt}),xu=be({prop:"backgroundColor",themeKey:"palette",transform:Nt});Hn(vu,yu,xu);function $e(e){return e<=1&&e!==0?`${e*100}%`:e}const wu=be({prop:"width",transform:$e}),Vr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||Fr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:$e(n)}};return Ze(e,e.maxWidth,t)}return null};Vr.filterProps=["maxWidth"];const Eu=be({prop:"minWidth",transform:$e}),Tu=be({prop:"height",transform:$e}),ku=be({prop:"maxHeight",transform:$e}),Ou=be({prop:"minHeight",transform:$e});be({prop:"size",cssProperty:"width",transform:$e});be({prop:"size",cssProperty:"height",transform:$e});const Su=be({prop:"boxSizing"});Hn(wu,Vr,Eu,Tu,ku,Ou,Su);const Cu={border:{themeKey:"borders",transform:_e},borderTop:{themeKey:"borders",transform:_e},borderRight:{themeKey:"borders",transform:_e},borderBottom:{themeKey:"borders",transform:_e},borderLeft:{themeKey:"borders",transform:_e},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:_e},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Wn},color:{themeKey:"palette",transform:Nt},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Nt},backgroundColor:{themeKey:"palette",transform:Nt},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:fe},mt:{style:fe},mr:{style:fe},mb:{style:fe},ml:{style:fe},mx:{style:fe},my:{style:fe},margin:{style:fe},marginTop:{style:fe},marginRight:{style:fe},marginBottom:{style:fe},marginLeft:{style:fe},marginX:{style:fe},marginY:{style:fe},marginInline:{style:fe},marginInlineStart:{style:fe},marginInlineEnd:{style:fe},marginBlock:{style:fe},marginBlockStart:{style:fe},marginBlockEnd:{style:fe},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Gn},rowGap:{style:Kn},columnGap:{style:Xn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:$e},maxWidth:{style:Vr},minWidth:{transform:$e},height:{transform:$e},maxHeight:{transform:$e},minHeight:{transform:$e},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},zr=Cu;function Pu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function Ru(e,t){return typeof e=="function"?e(t):e}function Nu(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=zn(o,u)||{};return f?f(a):Ze(a,r,v=>{let g=jn(p,d,v);return v===g&&typeof v=="string"&&(g=jn(p,d,`${n}${v==="default"?"":Ue(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:zr;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=Vc(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(b=>{const v=Ru(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])p=nn(p,e(b,v,i,a));else{const g=Ze({theme:i},v,m=>({[b]:m}));Pu(g,v)?p[b]=t({sx:v,theme:i}):p=nn(p,g)}else p=nn(p,e(b,v,i,a))}),zc(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const Qi=Nu();Qi.filterProps=["sx"];const Ur=Qi;function $u(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const Mu=["breakpoints","palette","spacing","shape"];function qr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,Mu),l=Dc(n),c=Yc(o);let u=Ke({breakpoints:l,direction:"ltr",components:{},palette:k({mode:"light"},r),spacing:c,shape:k({},Lc,i)},a);return u.applyStyles=$u,u=t.reduce((d,f)=>Ke(d,f),u),u.unstable_sxConfig=k({},zr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Ur({sx:f,theme:this})},u}function Iu(e){return Object.keys(e).length===0}function es(e=null){const t=E.useContext(br.ThemeContext);return!t||Iu(t)?e:t}const _u=qr();function ts(e=_u){return es(e)}const ju=["ownerState"],Au=["variants"],Du=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function Bu(e){return Object.keys(e).length===0}function Lu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function Sn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Fu=qr(),Xo=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function En({defaultTheme:e,theme:t,themeId:n}){return Bu(t)?e:t[n]||t}function Vu(e){return e?(t,n)=>n[e]:null}function Cn(e,t){let{ownerState:n}=t,r=ue(t,ju);const o=typeof e=="function"?e(k({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>Cn(i,k({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,Au);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(k({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(k({ownerState:n},r,n)):c.style))}),l}return o}function zu(e={}){const{themeId:t,defaultTheme:n=Fu,rootShouldForwardProp:r=Sn,slotShouldForwardProp:o=Sn}=e,i=a=>Ur(k({},a,{theme:En(k({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{br.internal_processStyles(a,h=>h.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=Vu(Xo(u))}=l,b=ue(l,Du),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Xo(u||"Root")}`);let T=Sn;u==="Root"||u==="root"?T=r:u?T=o:Lu(a)&&(T=void 0);const $=br(a,k({shouldForwardProp:T,label:m},b)),y=h=>typeof h=="function"&&h.__emotion_real!==h||ht(h)?S=>Cn(h,k({},S,{theme:En({theme:S.theme,defaultTheme:n,themeId:t})})):h,w=(h,...S)=>{let C=y(h);const j=S?S.map(y):[];c&&p&&j.push(B=>{const z=En(k({},B,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[c]||!z.components[c].styleOverrides)return null;const W=z.components[c].styleOverrides,L={};return Object.entries(W).forEach(([I,R])=>{L[I]=Cn(R,k({},B,{theme:z}))}),p(B,L)}),c&&!v&&j.push(B=>{var z;const W=En(k({},B,{defaultTheme:n,themeId:t})),L=W==null||(z=W.components)==null||(z=z[c])==null?void 0:z.variants;return Cn({variants:L},k({},B,{theme:W}))}),g||j.push(i);const _=j.length-S.length;if(Array.isArray(h)&&_>0){const B=new Array(_).fill("");C=[...h,...B],C.raw=[...h.raw,...B]}const A=$(C,...j);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${Ue(u||"")}`),B===void 0&&(B=`Styled(${Sa(a)})`),A.displayName=B}return a.muiName&&(A.muiName=a.muiName),A};return $.withConfig&&(w.withConfig=$.withConfig),w}}function Uu(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ii(t.components[n].defaultProps,r)}function qu({props:e,name:t,defaultTheme:n,themeId:r}){let o=ts(n);return r&&(o=o[r]||o),Uu({theme:o,name:t,props:e})}function Hr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),Ka(e,t,n)}function Hu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function yt(e){if(e.type)return e;if(e.charAt(0)==="#")return yt(Hu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:$t(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:$t(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Yn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Wu(e){e=yt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Yn({type:l,values:c})}function Ko(e){e=yt(e);let t=e.type==="hsl"||e.type==="hsla"?yt(Wu(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Yo(e,t){const n=Ko(e),r=Ko(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function An(e,t){return e=yt(e),t=Hr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Yn(e)}function Gu(e,t){if(e=yt(e),t=Hr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Yn(e)}function Xu(e,t){if(e=yt(e),t=Hr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Yn(e)}function Ku(e,t){return k({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Yu={black:"#000",white:"#fff"},ln=Yu,Ju={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Zu=Ju,Qu={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Et=Qu,ed={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Tt=ed,td={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Ht=td,nd={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},kt=nd,rd={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ot=rd,od={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},St=od,id=["mode","contrastThreshold","tonalOffset"],Jo={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:ln.white,default:ln.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},ur={text:{primary:ln.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:ln.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Zo(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Xu(e.main,o):t==="dark"&&(e.dark=Gu(e.main,i)))}function sd(e="light"){return e==="dark"?{main:kt[200],light:kt[50],dark:kt[400]}:{main:kt[700],light:kt[400],dark:kt[800]}}function ad(e="light"){return e==="dark"?{main:Et[200],light:Et[50],dark:Et[400]}:{main:Et[500],light:Et[300],dark:Et[700]}}function ld(e="light"){return e==="dark"?{main:Tt[500],light:Tt[300],dark:Tt[700]}:{main:Tt[700],light:Tt[400],dark:Tt[800]}}function cd(e="light"){return e==="dark"?{main:Ot[400],light:Ot[300],dark:Ot[700]}:{main:Ot[700],light:Ot[500],dark:Ot[900]}}function ud(e="light"){return e==="dark"?{main:St[400],light:St[300],dark:St[700]}:{main:St[800],light:St[500],dark:St[900]}}function dd(e="light"){return e==="dark"?{main:Ht[400],light:Ht[300],dark:Ht[700]}:{main:"#ed6c02",light:Ht[500],dark:Ht[900]}}function pd(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,id),i=e.primary||sd(t),a=e.secondary||ad(t),l=e.error||ld(t),c=e.info||cd(t),u=e.success||ud(t),d=e.warning||dd(t);function f(g){const m=Yo(g,ur.text.primary)>=n?ur.text.primary:Jo.text.primary;if(process.env.NODE_ENV!=="production"){const T=Yo(g,m);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${m} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const p=({color:g,name:m,mainShade:T=500,lightShade:$=300,darkShade:y=700})=>{if(g=k({},g),!g.main&&g[T]&&(g.main=g[T]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:$t(11,m?` (${m})`:"",T));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:$t(12,m?` (${m})`:"",JSON.stringify(g.main)));return Zo(g,"light",$,r),Zo(g,"dark",y,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:ur,light:Jo};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Ke(k({common:k({},ln),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:Zu,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},b[t]),o)}const fd=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function hd(e){return Math.round(e*1e5)/1e5}const Qo={textTransform:"uppercase"},ei='"Roboto", "Helvetica", "Arial", sans-serif';function md(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=ei,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,fd);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(T=>`${T/u*b}rem`),g=(T,$,y,w,h)=>k({fontFamily:r,fontWeight:T,fontSize:v($),lineHeight:y},r===ei?{letterSpacing:`${hd(w/$)}em`}:{},h,d),m={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,Qo),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,Qo),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ke(k({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),p,{clone:!1})}const gd=.2,bd=.14,vd=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${gd})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${bd})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${vd})`].join(",")}const yd=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],xd=yd,wd=["duration","easing","delay"],Ed={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Td={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ti(e){return`${Math.round(e)}ms`}function kd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function Od(e){const t=k({},Ed,e.easing),n=k({},Td,e.duration);return k({getAutoHeightDuration:kd,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,wd);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:ti(a)} ${l} ${typeof c=="string"?c:ti(c)}`).join(",")}},e,{easing:t,duration:n})}const Sd={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Cd=Sd,Pd=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Rd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,Pd);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":$t(18));const l=pd(r),c=qr(e);let u=Ke(c,{mixins:Ku(c.breakpoints,n),palette:l,shadows:xd.slice(),typography:md(l,i),transitions:Od(o),zIndex:k({},Cd)});if(u=Ke(u,a),u=t.reduce((d,f)=>Ke(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,b)=>{let v;for(v in p){const g=p[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const m=He("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[v]={}}}};Object.keys(u.components).forEach(p=>{const b=u.components[p].styleOverrides;b&&p.indexOf("Mui")===0&&f(b,p)})}return u.unstable_sxConfig=k({},zr,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Ur({sx:f,theme:this})},u}const Nd=Rd(),Wr=Nd,Gr="$$material",ns=e=>Sn(e)&&e!=="classes",$d=zu({themeId:Gr,defaultTheme:Wr,rootShouldForwardProp:ns}),Ee=$d;function gn(){const e=ts(Wr);return process.env.NODE_ENV!=="production"&&E.useDebugValue(e),e[Gr]||e}function tt({props:e,name:t}){return qu({props:e,name:t,defaultTheme:Wr,themeId:Gr})}function Or(e,t){return Or=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Or(e,t)}function Md(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Or(e,t)}const ni={disabled:!1};var Id=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const rs=te.createContext(null);var _d=function(t){return t.scrollTop},Zt="unmounted",dt="exited",pt="entering",Pt="entered",Sr="exiting",nt=function(e){Md(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=dt,i.appearStatus=pt):c=Pt:r.unmountOnExit||r.mountOnEnter?c=Zt:c=dt,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Zt?{status:dt}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==pt&&a!==Pt&&(i=pt):(a===pt||a===Pt)&&(i=Sr)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===pt){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Kt.findDOMNode(this);a&&_d(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===dt&&this.setState({status:Zt})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Kt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||ni.disabled){this.safeSetState({status:Pt},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:pt},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:Pt},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Kt.findDOMNode(this);if(!i||ni.disabled){this.safeSetState({status:dt},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Sr},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:dt},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Kt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Zt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return te.createElement(rs.Provider,{value:null},typeof a=="function"?a(o,l):te.cloneElement(te.Children.only(a),l))},t}(te.Component);nt.contextType=rs;nt.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=Id;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Ct(){}nt.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ct,onEntering:Ct,onEntered:Ct,onExit:Ct,onExiting:Ct,onExited:Ct};nt.UNMOUNTED=Zt;nt.EXITED=dt;nt.ENTERING=pt;nt.ENTERED=Pt;nt.EXITING=Sr;const os=nt,is=e=>e.scrollTop;function Dn(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const jd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Cr(e){return`scale(${e}, ${e**2})`}const Ad={entering:{opacity:1,transform:Cr(1)},entered:{opacity:1,transform:"none"}},dr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Xr=E.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:b,style:v,timeout:g="auto",TransitionComponent:m=os}=t,T=ue(t,jd),$=Yt(),y=E.useRef(),w=gn(),h=E.useRef(null),S=Ae(h,i.ref,n),C=I=>R=>{if(I){const D=h.current;R===void 0?I(D):I(D,R)}},j=C(d),_=C((I,R)=>{is(I);const{duration:D,delay:Q,easing:Z}=Dn({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=w.transitions.getAutoHeightDuration(I.clientHeight),y.current=O):O=D,I.style.transition=[w.transitions.create("opacity",{duration:O,delay:Q}),w.transitions.create("transform",{duration:dr?O:O*.666,delay:Q,easing:Z})].join(","),c&&c(I,R)}),A=C(u),B=C(b),z=C(I=>{const{duration:R,delay:D,easing:Q}=Dn({style:v,timeout:g,easing:a},{mode:"exit"});let Z;g==="auto"?(Z=w.transitions.getAutoHeightDuration(I.clientHeight),y.current=Z):Z=R,I.style.transition=[w.transitions.create("opacity",{duration:Z,delay:D}),w.transitions.create("transform",{duration:dr?Z:Z*.666,delay:dr?D:D||Z*.333,easing:Q})].join(","),I.style.opacity=0,I.style.transform=Cr(.75),f&&f(I)}),W=C(p),L=I=>{g==="auto"&&$.start(y.current||0,I),r&&r(h.current,I)};return x.jsx(m,k({appear:o,in:l,nodeRef:h,onEnter:_,onEntered:A,onEntering:j,onExit:z,onExited:W,onExiting:B,addEndListener:L,timeout:g==="auto"?null:g},T,{children:(I,R)=>E.cloneElement(i,k({style:k({opacity:0,transform:Cr(.75),visibility:I==="exited"&&!l?"hidden":void 0},Ad[I],v,i.props.style),ref:S},R))}))});process.env.NODE_ENV!=="production"&&(Xr.propTypes={addEndListener:s.func,appear:s.bool,children:un.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Xr.muiSupportAuto=!0;const Pr=Xr,Dd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},ri=Dd,Bd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Ld=Ee(Yi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ss=E.forwardRef(function(t,n){var r;const o=es(),i=tt({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:T,transition:$,slots:y,slotProps:w}=i,h=ue(i,Bd),S=(r=y==null?void 0:y.root)!=null?r:c==null?void 0:c.Root,C=k({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:T,transition:$},h);return x.jsx(Ld,k({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:w??u},C,{ref:n}))});process.env.NODE_ENV!=="production"&&(ss.propTypes={anchorEl:s.oneOfType([Ye,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Mr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const as=ss;function Fd(e){return He("MuiTooltip",e)}const Vd=it("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),ot=Vd,zd=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Ud(e){return Math.round(e*1e5)/1e5}const qd=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${Ue(i.split("-")[0])}`],arrow:["arrow"]};return et(a,Fd,t)},Hd=Ee(as,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>k({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${ot.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${ot.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${ot.arrow}`]:k({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${ot.arrow}`]:k({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Wd=Ee("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${Ue(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>k({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:An(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Ud(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${ot.popper}[data-popper-placement*="left"] &`]:k({transformOrigin:"right center"},t.isRtl?k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):k({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${ot.popper}[data-popper-placement*="right"] &`]:k({transformOrigin:"left center"},t.isRtl?k({marginRight:"14px"},t.touch&&{marginRight:"24px"}):k({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${ot.popper}[data-popper-placement*="top"] &`]:k({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${ot.popper}[data-popper-placement*="bottom"] &`]:k({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Gd=Ee("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:An(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let Tn=!1;const oi=new dn;let Wt={x:0,y:0};function kn(e,t){return n=>{t&&t(n),e(n)}}const ls=E.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,b,v,g,m,T,$,y,w,h;const S=tt({props:t,name:"MuiTooltip"}),{arrow:C=!1,children:j,components:_={},componentsProps:A={},describeChild:B=!1,disableFocusListener:z=!1,disableHoverListener:W=!1,disableInteractive:L=!1,disableTouchListener:I=!1,enterDelay:R=100,enterNextDelay:D=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:O,leaveDelay:M=0,leaveTouchDelay:V=1500,onClose:X,onOpen:F,open:U,placement:H="bottom",PopperComponent:G,PopperProps:q={},slotProps:K={},slots:Y={},title:re,TransitionComponent:N=Pr,TransitionProps:J}=S,P=ue(S,zd),oe=E.isValidElement(j)?j:x.jsx("span",{children:j}),ve=gn(),Te=ve.direction==="rtl",[me,lt]=E.useState(),[ke,We]=E.useState(null),Pe=E.useRef(!1),Ge=L||Z,ye=Yt(),wt=Yt(),ct=Yt(),Lt=Yt(),[bn,no]=Ci({controlled:U,default:!1,name:"Tooltip",state:"open"});let Xe=bn;if(process.env.NODE_ENV!=="production"){const{current:ee}=E.useRef(U!==void 0);E.useEffect(()=>{me&&me.disabled&&!ee&&re!==""&&me.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,me,ee])}const Jn=Si(O),Ft=E.useRef(),vn=rn(()=>{Ft.current!==void 0&&(document.body.style.WebkitUserSelect=Ft.current,Ft.current=void 0),Lt.clear()});E.useEffect(()=>vn,[vn]);const ro=ee=>{oi.clear(),Tn=!0,no(!0),F&&!Xe&&F(ee)},yn=rn(ee=>{oi.start(800+M,()=>{Tn=!1}),no(!1),X&&Xe&&X(ee),ye.start(ve.transitions.duration.shortest,()=>{Pe.current=!1})}),Zn=ee=>{Pe.current&&ee.type!=="touchstart"||(me&&me.removeAttribute("title"),wt.clear(),ct.clear(),R||Tn&&D?wt.start(Tn?D:R,()=>{ro(ee)}):ro(ee))},oo=ee=>{wt.clear(),ct.start(M,()=>{yn(ee)})},{isFocusVisibleRef:io,onBlur:Ms,onFocus:Is,ref:_s}=Pi(),[,so]=E.useState(!1),ao=ee=>{Ms(ee),io.current===!1&&(so(!1),oo(ee))},lo=ee=>{me||lt(ee.currentTarget),Is(ee),io.current===!0&&(so(!0),Zn(ee))},co=ee=>{Pe.current=!0;const Re=oe.props;Re.onTouchStart&&Re.onTouchStart(ee)},uo=Zn,po=oo,js=ee=>{co(ee),ct.clear(),ye.clear(),vn(),Ft.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Lt.start(Q,()=>{document.body.style.WebkitUserSelect=Ft.current,Zn(ee)})},As=ee=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(ee),vn(),ct.start(V,()=>{yn(ee)})};E.useEffect(()=>{if(!Xe)return;function ee(Re){(Re.key==="Escape"||Re.key==="Esc")&&yn(Re)}return document.addEventListener("keydown",ee),()=>{document.removeEventListener("keydown",ee)}},[yn,Xe]);const Ds=Ae(oe.ref,_s,lt,n);!re&&re!==0&&(Xe=!1);const Qn=E.useRef(),Bs=ee=>{const Re=oe.props;Re.onMouseMove&&Re.onMouseMove(ee),Wt={x:ee.clientX,y:ee.clientY},Qn.current&&Qn.current.update()},Vt={},er=typeof re=="string";B?(Vt.title=!Xe&&er&&!W?re:null,Vt["aria-describedby"]=Xe?Jn:null):(Vt["aria-label"]=er?re:null,Vt["aria-labelledby"]=Xe&&!er?Jn:null);const Ie=k({},Vt,P,oe.props,{className:xe(P.className,oe.props.className),onTouchStart:co,ref:Ds},Z?{onMouseMove:Bs}:{});process.env.NODE_ENV!=="production"&&(Ie["data-mui-internal-clone-element"]=!0,E.useEffect(()=>{me&&!me.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[me]));const zt={};I||(Ie.onTouchStart=js,Ie.onTouchEnd=As),W||(Ie.onMouseOver=kn(uo,Ie.onMouseOver),Ie.onMouseLeave=kn(po,Ie.onMouseLeave),Ge||(zt.onMouseOver=uo,zt.onMouseLeave=po)),z||(Ie.onFocus=kn(lo,Ie.onFocus),Ie.onBlur=kn(ao,Ie.onBlur),Ge||(zt.onFocus=lo,zt.onBlur=ao)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const Ls=E.useMemo(()=>{var ee;let Re=[{name:"arrow",enabled:!!ke,options:{element:ke,padding:4}}];return(ee=q.popperOptions)!=null&&ee.modifiers&&(Re=Re.concat(q.popperOptions.modifiers)),k({},q.popperOptions,{modifiers:Re})},[ke,q]),Ut=k({},S,{isRtl:Te,arrow:C,disableInteractive:Ge,placement:H,PopperComponentProp:G,touch:Pe.current}),tr=qd(Ut),fo=(r=(o=Y.popper)!=null?o:_.Popper)!=null?r:Hd,ho=(i=(a=(l=Y.transition)!=null?l:_.Transition)!=null?a:N)!=null?i:Pr,mo=(c=(u=Y.tooltip)!=null?u:_.Tooltip)!=null?c:Wd,go=(d=(f=Y.arrow)!=null?f:_.Arrow)!=null?d:Gd,Fs=Jt(fo,k({},q,(p=K.popper)!=null?p:A.popper,{className:xe(tr.popper,q==null?void 0:q.className,(b=(v=K.popper)!=null?v:A.popper)==null?void 0:b.className)}),Ut),Vs=Jt(ho,k({},J,(g=K.transition)!=null?g:A.transition),Ut),zs=Jt(mo,k({},(m=K.tooltip)!=null?m:A.tooltip,{className:xe(tr.tooltip,(T=($=K.tooltip)!=null?$:A.tooltip)==null?void 0:T.className)}),Ut),Us=Jt(go,k({},(y=K.arrow)!=null?y:A.arrow,{className:xe(tr.arrow,(w=(h=K.arrow)!=null?h:A.arrow)==null?void 0:w.className)}),Ut);return x.jsxs(E.Fragment,{children:[E.cloneElement(oe,Ie),x.jsx(fo,k({as:G??as,placement:H,anchorEl:Z?{getBoundingClientRect:()=>({top:Wt.y,left:Wt.x,right:Wt.x,bottom:Wt.y,width:0,height:0})}:me,popperRef:Qn,open:me?Xe:!1,id:Jn,transition:!0},zt,Fs,{popperOptions:Ls,children:({TransitionProps:ee})=>x.jsx(ho,k({timeout:ve.transitions.duration.shorter},ee,Vs,{children:x.jsxs(mo,k({},zs,{children:[re,C?x.jsx(go,k({},Us,{ref:We})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(ls.propTypes={arrow:s.bool,children:un.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const Xd=ls;var Kr={},cs={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(cs);var Kd=cs.exports,pr={};function Yd(e){return He("MuiSvgIcon",e)}it("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Jd=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Zd=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${Ue(t)}`,`fontSize${Ue(n)}`]};return et(o,Yd,r)},Qd=Ee("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${Ue(n.color)}`],t[`fontSize${Ue(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),Yr=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,b=ue(r,Jd),v=E.isValidElement(o)&&o.type==="svg",g=k({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:v}),m={};d||(m.viewBox=p);const T=Zd(g);return x.jsxs(Qd,k({as:l,className:xe(T.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},m,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?x.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Yr.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Yr.muiName="SvgIcon";const ii=Yr;function us(e,t){function n(r,o){return x.jsx(ii,k({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ii.muiName,E.memo(E.forwardRef(n))}const ep={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),_i.configure(e)}},tp=Object.freeze(Object.defineProperty({__proto__:null,capitalize:Ue,createChainedFunction:xr,createSvgIcon:us,debounce:Oi,deprecatedPropType:Pa,isMuiElement:Ra,ownerDocument:we,ownerWindow:Mt,requirePropFactory:Na,setRef:$n,unstable_ClassNameGenerator:ep,unstable_useEnhancedEffect:gt,unstable_useId:Si,unsupportedProp:Ia,useControlled:Ci,useEventCallback:rn,useForkRef:Ae,useIsFocusVisible:Pi},Symbol.toStringTag,{value:"Module"})),np=aa(tp);var si;function rp(){return si||(si=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=np}(pr)),pr}var op=Kd;Object.defineProperty(Kr,"__esModule",{value:!0});var ds=Kr.default=void 0,ip=op(rp()),sp=x;ds=Kr.default=(0,ip.default)((0,sp.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ai(e,t,n){return e?x.jsx(de.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:x.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Jr(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:m}=e,T=x.jsx(de.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?x.jsxs(x.Fragment,{children:[ai(i,n,!0),x.jsx(de.ListItemText,{primary:n,inset:!i&&o}),f?x.jsx(de.ListItemIcon,{className:"papi-menu-icon-trailing",children:x.jsx(ds,{})}):ai(a,n,!1)]}):m});return r?x.jsx(Xd,{title:r,placement:"right",children:x.jsx("div",{children:T})}):T}function ps(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function ap(e){const[t,n]=te.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=ps(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),x.jsx(Zr,{...e,includedGroups:u})};return x.jsxs(x.Fragment,{children:[x.jsx(Jr,{onClick:a,...o,isSubMenuParent:!0}),x.jsx(de.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const lp=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Zr(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=te.useMemo(()=>{const d=o&&o.length>0?o:ps(t).filter(v=>!("menuItem"in v.group)),f=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),p=[];f.forEach(v=>{lp(v.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const b=p.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:p,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return x.jsx("div",{});const u=c.item.group;return x.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,b=l(d);if("command"in p){const v=p.group+f;return x.jsx(Jr,{onClick:g=>{n==null||n(g),r(p)},...b},v)}return x.jsx(ap,{parentMenuItem:p,parentItemProps:b,...e},u+p.id)})},u)}function cp(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),x.jsx(Zr,{...e,includedGroups:i})}function up({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return x.jsxs(de.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[x.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),x.jsx(de.List,{id:n,dense:!0,className:i??"",children:x.jsx(cp,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function fs({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=te.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return x.jsx(de.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>x.jsx(up,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const hs=E.createContext({});process.env.NODE_ENV!=="production"&&(hs.displayName="ListContext");const dp=hs;function pp(e){return He("MuiList",e)}it("MuiList",["root","padding","dense","subheader"]);const fp=["children","className","component","dense","disablePadding","subheader"],hp=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return et({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},pp,t)},mp=Ee("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>k({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ms=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,fp),f=E.useMemo(()=>({dense:l}),[l]),p=k({},r,{component:a,dense:l,disablePadding:c}),b=hp(p);return x.jsx(dp.Provider,{value:f,children:x.jsxs(mp,k({as:a,className:xe(b.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(ms.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const gp=ms,bp=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function fr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function li(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function gs(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function Gt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!gs(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const bs=E.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,bp),b=E.useRef(null),v=E.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});gt(()=>{o&&b.current.focus()},[o]),E.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(y,w)=>{const h=!b.current.style.width;if(y.clientHeight<b.current.clientHeight&&h){const S=`${Ri(we(y))}px`;b.current.style[w.direction==="rtl"?"paddingLeft":"paddingRight"]=S,b.current.style.width=`calc(100% + ${S})`}return b.current}}),[]);const g=y=>{const w=b.current,h=y.key,S=we(w).activeElement;if(h==="ArrowDown")y.preventDefault(),Gt(w,S,u,c,fr);else if(h==="ArrowUp")y.preventDefault(),Gt(w,S,u,c,li);else if(h==="Home")y.preventDefault(),Gt(w,null,u,c,fr);else if(h==="End")y.preventDefault(),Gt(w,null,u,c,li);else if(h.length===1){const C=v.current,j=h.toLowerCase(),_=performance.now();C.keys.length>0&&(_-C.lastTime>500?(C.keys=[],C.repeating=!0,C.previousKeyMatched=!0):C.repeating&&j!==C.keys[0]&&(C.repeating=!1)),C.lastTime=_,C.keys.push(j);const A=S&&!C.repeating&&gs(S,C);C.previousKeyMatched&&(A||Gt(w,S,!1,c,fr,C))?y.preventDefault():C.previousKeyMatched=!1}d&&d(y)},m=Ae(b,n);let T=-1;E.Children.forEach(a,(y,w)=>{if(!E.isValidElement(y)){T===w&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&Nn.isFragment(y)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),y.props.disabled||(f==="selectedMenu"&&y.props.selected||T===-1)&&(T=w),T===w&&(y.props.disabled||y.props.muiSkipListHighlight||y.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const $=E.Children.map(a,(y,w)=>{if(w===T){const h={};return i&&(h.autoFocus=!0),y.props.tabIndex===void 0&&f==="selectedMenu"&&(h.tabIndex=0),E.cloneElement(y,h)}return y});return x.jsx(gp,k({role:"menu",ref:m,className:l,onKeyDown:g,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(bs.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const vp=bs,yp=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],xp={entering:{opacity:1},entered:{opacity:1}},vs=E.forwardRef(function(t,n){const r=gn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:b,onExited:v,onExiting:g,style:m,timeout:T=o,TransitionComponent:$=os}=t,y=ue(t,yp),w=E.useRef(null),h=Ae(w,l.ref,n),S=L=>I=>{if(L){const R=w.current;I===void 0?L(R):L(R,I)}},C=S(p),j=S((L,I)=>{is(L);const R=Dn({style:m,timeout:T,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",R),L.style.transition=r.transitions.create("opacity",R),d&&d(L,I)}),_=S(f),A=S(g),B=S(L=>{const I=Dn({style:m,timeout:T,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",I),L.style.transition=r.transitions.create("opacity",I),b&&b(L)}),z=S(v),W=L=>{i&&i(w.current,L)};return x.jsx($,k({appear:a,in:u,nodeRef:w,onEnter:j,onEntered:_,onEntering:C,onExit:B,onExited:z,onExiting:A,addEndListener:W,timeout:T},y,{children:(L,I)=>E.cloneElement(l,k({style:k({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},xp[L],m,l.props.style),ref:h},I))}))});process.env.NODE_ENV!=="production"&&(vs.propTypes={addEndListener:s.func,appear:s.bool,children:un.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const wp=vs;function Ep(e){return He("MuiBackdrop",e)}it("MuiBackdrop",["root","invisible"]);const Tp=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],kp=e=>{const{classes:t,invisible:n}=e;return et({root:["root",n&&"invisible"]},Ep,t)},Op=Ee("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>k({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ys=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:m=wp,transitionDuration:T}=a,$=ue(a,Tp),y=k({},a,{component:u,invisible:p}),w=kp(y),h=(r=v.root)!=null?r:f.root;return x.jsx(m,k({in:b,timeout:T},$,{children:x.jsx(Op,k({"aria-hidden":!0},h,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:xe(w.root,c,h==null?void 0:h.className),ownerState:k({},y,h==null?void 0:h.ownerState),classes:w,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ys.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Sp=ys;function Cp(e){return He("MuiModal",e)}it("MuiModal",["root","hidden","backdrop"]);const Pp=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Rp=e=>{const{open:t,exited:n,classes:r}=e;return et({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},Cp,r)},Np=Ee("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>k({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),$p=Ee(Sp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),xs=E.forwardRef(function(t,n){var r,o,i,a,l,c;const u=tt({name:"MuiModal",props:t}),{BackdropComponent:d=$p,BackdropProps:f,className:p,closeAfterTransition:b=!1,children:v,container:g,component:m,components:T={},componentsProps:$={},disableAutoFocus:y=!1,disableEnforceFocus:w=!1,disableEscapeKeyDown:h=!1,disablePortal:S=!1,disableRestoreFocus:C=!1,disableScrollLock:j=!1,hideBackdrop:_=!1,keepMounted:A=!1,onBackdropClick:B,open:z,slotProps:W,slots:L}=u,I=ue(u,Pp),R=k({},u,{closeAfterTransition:b,disableAutoFocus:y,disableEnforceFocus:w,disableEscapeKeyDown:h,disablePortal:S,disableRestoreFocus:C,disableScrollLock:j,hideBackdrop:_,keepMounted:A}),{getRootProps:D,getBackdropProps:Q,getTransitionProps:Z,portalRef:O,isTopModal:M,exited:V,hasTransition:X}=xl(k({},R,{rootRef:n})),F=k({},R,{exited:V}),U=Rp(F),H={};if(v.props.tabIndex===void 0&&(H.tabIndex="-1"),X){const{onEnter:J,onExited:P}=Z();H.onEnter=J,H.onExited=P}const G=(r=(o=L==null?void 0:L.root)!=null?o:T.Root)!=null?r:Np,q=(i=(a=L==null?void 0:L.backdrop)!=null?a:T.Backdrop)!=null?i:d,K=(l=W==null?void 0:W.root)!=null?l:$.root,Y=(c=W==null?void 0:W.backdrop)!=null?c:$.backdrop,re=bt({elementType:G,externalSlotProps:K,externalForwardedProps:I,getSlotProps:D,additionalProps:{ref:n,as:m},ownerState:F,className:xe(p,K==null?void 0:K.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),N=bt({elementType:q,externalSlotProps:Y,additionalProps:f,getSlotProps:J=>Q(k({},J,{onClick:P=>{B&&B(P),J!=null&&J.onClick&&J.onClick(P)}})),className:xe(Y==null?void 0:Y.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!A&&!z&&(!X||V)?null:x.jsx(on,{ref:O,container:g,disablePortal:S,children:x.jsxs(G,k({},re,{children:[!_&&d?x.jsx(q,k({},N)):null,x.jsx(Mn,{disableEnforceFocus:w,disableAutoFocus:y,disableRestoreFocus:C,isEnabled:M,open:z,children:E.cloneElement(v,H)})]}))})});process.env.NODE_ENV!=="production"&&(xs.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:un.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ye,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Mp=xs;function Ip(e){return He("MuiPaper",e)}it("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const _p=["className","component","elevation","square","variant"],jp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return et(i,Ip,o)},Ap=Ee("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return k({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&k({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${An("#fff",ri(t.elevation))}, ${An("#fff",ri(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),ws=E.forwardRef(function(t,n){const r=tt({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,_p),d=k({},r,{component:i,elevation:a,square:l,variant:c}),f=jp(d);return process.env.NODE_ENV!=="production"&&gn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),x.jsx(Ap,k({as:i,ownerState:d,className:xe(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(ws.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:Dt(Mi,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Dp=ws;function Bp(e){return He("MuiPopover",e)}it("MuiPopover",["root","paper"]);const Lp=["onEntering"],Fp=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Vp=["slotProps"];function ci(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function ui(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function di(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Pn(e){return typeof e=="function"?e():e}const zp=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"]},Bp,t)},Up=Ee(Mp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Es=Ee(Dp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Ts=E.forwardRef(function(t,n){var r,o,i;const a=tt({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:b,container:v,elevation:g=8,marginThreshold:m=16,open:T,PaperProps:$={},slots:y,slotProps:w,transformOrigin:h={vertical:"top",horizontal:"left"},TransitionComponent:S=Pr,transitionDuration:C="auto",TransitionProps:{onEntering:j}={},disableScrollLock:_=!1}=a,A=ue(a.TransitionProps,Lp),B=ue(a,Fp),z=(r=w==null?void 0:w.paper)!=null?r:$,W=E.useRef(),L=Ae(W,z.ref),I=k({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:m,externalPaperSlotProps:z,transformOrigin:h,TransitionComponent:S,transitionDuration:C,TransitionProps:A}),R=zp(I),D=E.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const J=Pn(c),P=J&&J.nodeType===1?J:we(W.current).body,oe=P.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ve=P.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ve.top===0&&ve.left===0&&ve.right===0&&ve.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+ci(oe,u.vertical),left:oe.left+ui(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),Q=E.useCallback(J=>({vertical:ci(J,h.vertical),horizontal:ui(J,h.horizontal)}),[h.horizontal,h.vertical]),Z=E.useCallback(J=>{const P={width:J.offsetWidth,height:J.offsetHeight},oe=Q(P);if(f==="none")return{top:null,left:null,transformOrigin:di(oe)};const ve=D();let Te=ve.top-oe.vertical,me=ve.left-oe.horizontal;const lt=Te+P.height,ke=me+P.width,We=Mt(Pn(c)),Pe=We.innerHeight-m,Ge=We.innerWidth-m;if(m!==null&&Te<m){const ye=Te-m;Te-=ye,oe.vertical+=ye}else if(m!==null&&lt>Pe){const ye=lt-Pe;Te-=ye,oe.vertical+=ye}if(process.env.NODE_ENV!=="production"&&P.height>Pe&&P.height&&Pe&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${P.height-Pe}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&me<m){const ye=me-m;me-=ye,oe.horizontal+=ye}else if(ke>Ge){const ye=ke-Ge;me-=ye,oe.horizontal+=ye}return{top:`${Math.round(Te)}px`,left:`${Math.round(me)}px`,transformOrigin:di(oe)}},[c,f,D,Q,m]),[O,M]=E.useState(T),V=E.useCallback(()=>{const J=W.current;if(!J)return;const P=Z(J);P.top!==null&&(J.style.top=P.top),P.left!==null&&(J.style.left=P.left),J.style.transformOrigin=P.transformOrigin,M(!0)},[Z]);E.useEffect(()=>(_&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[c,_,V]);const X=(J,P)=>{j&&j(J,P),V()},F=()=>{M(!1)};E.useEffect(()=>{T&&V()}),E.useImperativeHandle(l,()=>T?{updatePosition:()=>{V()}}:null,[T,V]),E.useEffect(()=>{if(!T)return;const J=Oi(()=>{V()}),P=Mt(c);return P.addEventListener("resize",J),()=>{J.clear(),P.removeEventListener("resize",J)}},[c,T,V]);let U=C;C==="auto"&&!S.muiSupportAuto&&(U=void 0);const H=v||(c?we(Pn(c)).body:void 0),G=(o=y==null?void 0:y.root)!=null?o:Up,q=(i=y==null?void 0:y.paper)!=null?i:Es,K=bt({elementType:q,externalSlotProps:k({},z,{style:O?z.style:k({},z.style,{opacity:0})}),additionalProps:{elevation:g,ref:L},ownerState:I,className:xe(R.paper,z==null?void 0:z.className)}),Y=bt({elementType:G,externalSlotProps:(w==null?void 0:w.root)||{},externalForwardedProps:B,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:H,open:T},ownerState:I,className:xe(R.root,b)}),{slotProps:re}=Y,N=ue(Y,Vp);return x.jsx(G,k({},N,!Ai(G)&&{slotProps:re,disableScrollLock:_},{children:x.jsx(S,k({appear:!0,in:T,onEntering:X,onExited:F,timeout:U},A,{children:x.jsx(q,k({},K,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(Ts.propTypes={action:Mr,anchorEl:Dt(s.oneOfType([Ye,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Pn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Ye,s.func]),disableScrollLock:s.bool,elevation:Mi,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:xa}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const qp=Ts;function Hp(e){return He("MuiMenu",e)}it("MuiMenu",["root","paper","list"]);const Wp=["onEntering"],Gp=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Xp={vertical:"top",horizontal:"right"},Kp={vertical:"top",horizontal:"left"},Yp=e=>{const{classes:t}=e;return et({root:["root"],paper:["paper"],list:["list"]},Hp,t)},Jp=Ee(qp,{shouldForwardProp:e=>ns(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Zp=Ee(Es,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Qp=Ee(vp,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),ks=E.forwardRef(function(t,n){var r,o;const i=tt({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:m}={},variant:T="selectedMenu",slots:$={},slotProps:y={}}=i,w=ue(i.TransitionProps,Wp),h=ue(i,Gp),S=gn(),C=S.direction==="rtl",j=k({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:b,transitionDuration:g,TransitionProps:w,variant:T}),_=Yp(j),A=a&&!u&&p,B=E.useRef(null),z=(Z,O)=>{B.current&&B.current.adjustStyleForScrollbar(Z,S),m&&m(Z,O)},W=Z=>{Z.key==="Tab"&&(Z.preventDefault(),f&&f(Z,"tabKeyDown"))};let L=-1;E.Children.map(l,(Z,O)=>{E.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&Nn.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(T==="selectedMenu"&&Z.props.selected||L===-1)&&(L=O))});const I=(r=$.paper)!=null?r:Zp,R=(o=y.paper)!=null?o:b,D=bt({elementType:$.root,externalSlotProps:y.root,ownerState:j,className:[_.root,c]}),Q=bt({elementType:I,externalSlotProps:R,ownerState:j,className:_.paper});return x.jsx(Jp,k({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:C?"right":"left"},transformOrigin:C?Xp:Kp,slots:{paper:I,root:$.root},slotProps:{root:D,paper:Q},open:p,ref:n,transitionDuration:g,TransitionProps:k({onEntering:z},w),ownerState:j},h,{classes:v,children:x.jsx(Qp,k({onKeyDown:W,actions:B,autoFocus:a&&(L===-1||u),autoFocusItem:A,variant:T},d,{className:xe(_.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(ks.propTypes={anchorEl:s.oneOfType([Ye,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const ef=ks;function tf({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=te.useState(void 0),a=te.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=te.useCallback(()=>{i(void 0)},[]),c=te.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:x.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,x.jsx(ef,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:x.jsx(Zr,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const nf=us(x.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function rf(e){return{preserveValue:!0,...e}}const Bn=(e,t,n={})=>{const r=te.useRef(t);r.current=t;const o=te.useRef(n);o.current=rf(o.current);const[i,a]=te.useState(()=>r.current),[l,c]=te.useState(!0);return te.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Os({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=te.useState(!1),[d,f]=te.useState(!1),p=te.useCallback(()=>{c&&u(!1),f(!1)},[c]),b=te.useCallback(w=>{w.stopPropagation(),u(h=>{const S=!h;return S&&w.shiftKey?f(!0):S||f(!1),S})},[]),v=te.useCallback(w=>(p(),r(w)),[r,p]),[g,m]=te.useState({top:1,left:1});te.useEffect(()=>{if(c){const w=o==null?void 0:o.current;if(w){const h=w.getBoundingClientRect(),S=window.scrollY,C=window.scrollX,j=h.top+S+w.clientHeight,_=h.left+C;m({top:j,left:_})}}},[c,o]);const[T]=Bn(te.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=Bn(te.useCallback(async()=>(e==null?void 0:e(!0))??n??T,[e,n,T,c]),n??T),y=d&&$?$:T;return x.jsxs(x.Fragment,{children:[x.jsx(de.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??x.jsx(nf,{})}),x.jsx(de.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:y?x.jsx(fs,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:y}):void 0})]})}function of({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return x.jsx(de.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}var sf=Object.defineProperty,af=(e,t,n)=>t in e?sf(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n)=>(af(e,typeof t!="symbol"?t+"":t,n),n);const xt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Qr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Ss=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],pi=bf();function Bt(e,t=!0){return t&&(e=e.toUpperCase()),e in pi?pi[e]:0}function eo(e){return Bt(e)>0}function lf(e){const t=typeof e=="string"?Bt(e):e;return t>=40&&t<=66}function cf(e){return(typeof e=="string"?Bt(e):e)<=39}function Cs(e){return e<=66}function uf(e){const t=typeof e=="string"?Bt(e):e;return Ns(t)&&!Cs(t)}function*df(){for(let e=1;e<=xt.length;e++)yield e}const pf=1,Ps=xt.length;function ff(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function to(e,t="***"){const n=e-1;return n<0||n>=xt.length?t:xt[n]}function Rs(e){return e<=0||e>Ps?"******":Ss[e-1]}function hf(e){return Rs(Bt(e))}function Ns(e){const t=typeof e=="number"?to(e):e;return eo(t)&&!Qr.includes(t)}function mf(e){const t=typeof e=="number"?to(e):e;return eo(t)&&Qr.includes(t)}function gf(e){return Ss[e-1].includes("*obsolete*")}function bf(){const e={};for(let t=0;t<xt.length;t++)e[xt[t]]=t+1;return e}const Ve={allBookIds:xt,nonCanonicalIds:Qr,bookIdToNumber:Bt,isBookIdValid:eo,isBookNT:lf,isBookOT:cf,isBookOTNT:Cs,isBookDC:uf,allBookNumbers:df,firstBook:pf,lastBook:Ps,extraBooks:ff,bookNumberToId:to,bookNumberToEnglishName:Rs,bookIdToEnglishName:hf,isCanonical:Ns,isExtraMaterial:mf,isObsolete:gf};var rt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(rt||{});const Ne=class{constructor(t){if(ne(this,"name"),ne(this,"fullPath"),ne(this,"isPresent"),ne(this,"hasVerseSegments"),ne(this,"isCustomized"),ne(this,"baseVersification"),ne(this,"scriptureBooks"),ne(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};ne(Ne,"Original",new Ne(rt.Original)),ne(Ne,"Septuagint",new Ne(rt.Septuagint)),ne(Ne,"Vulgate",new Ne(rt.Vulgate)),ne(Ne,"English",new Ne(rt.English)),ne(Ne,"RussianProtestant",new Ne(rt.RussianProtestant)),ne(Ne,"RussianOrthodox",new Ne(rt.RussianOrthodox));let Rt=Ne;function fi(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var $s=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))($s||{});const Oe=class ie{constructor(t,n,r,o){if(ne(this,"firstChapter"),ne(this,"lastChapter"),ne(this,"lastVerse"),ne(this,"hasSegmentsDefined"),ne(this,"text"),ne(this,"BBBCCCVVVS"),ne(this,"longHashCode"),ne(this,"versification"),ne(this,"rtlMark","‏"),ne(this,"_bookNum",0),ne(this,"_chapterNum",0),ne(this,"_verseNum",0),ne(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Rt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Rt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Xt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return Ve.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=Ve.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>Ve.lastBook)throw new Xt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Rt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Rt(rt[a])}catch{throw new Xt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Xt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||Ve.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Xt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=fi(this._verse,r);for(const a of i.map(l=>fi(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Ve.lastBook?2:(Ve.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=Ve.bookIdToNumber(t),this.chapter=n,this.verse=r}};ne(Oe,"defaultVersification",Rt.English),ne(Oe,"verseRangeSeparator","-"),ne(Oe,"verseSequenceIndicator",","),ne(Oe,"verseRangeSeparators",[Oe.verseRangeSeparator]),ne(Oe,"verseSequenceIndicators",[Oe.verseSequenceIndicator]),ne(Oe,"chapterDigitShifter",1e3),ne(Oe,"bookDigitShifter",Oe.chapterDigitShifter*Oe.chapterDigitShifter),ne(Oe,"bcvMaxValue",Oe.chapterDigitShifter-1),ne(Oe,"ValidStatusType",$s);class Xt extends Error{}function cn({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v}){return x.jsx(de.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v})}let hr;const mr=()=>(hr||(hr=Ve.allBookIds.map(e=>({bookId:e,label:Ve.bookIdToEnglishName(e)}))),hr);function vf({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:Ve.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=te.useMemo(()=>mr()[e.bookNum-1],[e.bookNum]);return x.jsxs("span",{id:n,children:[x.jsx(Rn,{title:"Book",className:"papi-ref-selector book",value:l,options:mr(),onChange:o,isClearable:!1,width:200}),x.jsx(ut,{onClick:()=>r(Fe.offsetBook(e,-1)),isDisabled:e.bookNum<=Fe.FIRST_SCR_BOOK_NUM,children:"<"}),x.jsx(ut,{onClick:()=>r(Fe.offsetBook(e,1)),isDisabled:e.bookNum>=mr().length,children:">"}),x.jsx(cn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),x.jsx(ut,{onClick:()=>t(Fe.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Fe.FIRST_SCR_CHAPTER_NUM,children:"<"}),x.jsx(ut,{onClick:()=>t(Fe.offsetChapter(e,1)),isDisabled:e.chapterNum>=Fe.getChaptersForBook(e.bookNum),children:">"}),x.jsx(cn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),x.jsx(ut,{onClick:()=>t(Fe.offsetVerse(e,-1)),isDisabled:e.verseNum<=Fe.FIRST_SCR_VERSE_NUM,children:"<"}),x.jsx(ut,{onClick:()=>t(Fe.offsetVerse(e,1)),children:">"})]})}function yf({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=te.useState(""),i=a=>{o(a),e(a)};return x.jsx(de.Paper,{component:"form",className:"search-bar-paper",children:x.jsx(cn,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function xf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return x.jsx(de.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function wf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return x.jsx(de.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function Ef({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return x.jsx(de.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function hi({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return x.jsx(cn,{defaultValue:t[n.key],onChange:r})}const Tf=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return x.jsx(bi,{...r,isChecked:n,isDisabled:t,onChange:o})};function kf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:y,onCellContextMenu:w,onCellKeyDown:h,direction:S="ltr",enableVirtualization:C=!0,onCopy:j,onPaste:_,onScroll:A,className:B,"data-testid":z}){const W=te.useMemo(()=>{const L=e.map(I=>typeof I.editable=="function"?{...I,editable:D=>!!I.editable(D),renderEditCell:I.renderEditCell||hi}:I.editable&&!I.renderEditCell?{...I,renderEditCell:hi}:I.renderEditCell&&!I.editable?{...I,editable:!1}:I);return d?[{...bo.SelectColumn,minWidth:f},...L]:L},[e,d,f]);return x.jsx(bo,{columns:W,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:m,onRowsChange:T,onCellClick:$,onCellDoubleClick:y,onCellContextMenu:w,onCellKeyDown:h,direction:S,enableVirtualization:C,onCopy:j,onPaste:_,onScroll:A,renderers:{renderCheckbox:Tf},className:`papi-table ${B??"rdg-light"}`,"data-testid":z})}function Of({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=te.useRef(void 0);return x.jsx("div",{ref:i,style:{position:"relative"},children:x.jsx(de.AppBar,{position:"static",id:r,children:x.jsxs(de.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?x.jsx(Os,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?x.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const Sf=(e,t)=>{te.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},gr=()=>!1,Cf=(e,t)=>{const[n]=Bn(te.useCallback(async()=>{if(!e)return gr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),gr,{preserveValue:!1});te.useEffect(()=>()=>{n!==gr&&n()},[n])};exports.BookChapterControl=oa;exports.Button=ut;exports.ChapterRangeSelector=ia;exports.Checkbox=bi;exports.ComboBox=Rn;exports.ContextMenu=tf;exports.GridMenu=fs;exports.HamburgerMenuButton=Os;exports.IconButton=of;exports.LabelPosition=ft;exports.MenuItem=Jr;exports.RefSelector=vf;exports.SearchBar=yf;exports.Slider=xf;exports.Snackbar=wf;exports.Switch=Ef;exports.Table=kf;exports.TextField=cn;exports.Toolbar=Of;exports.useEvent=Sf;exports.useEventAsync=Cf;exports.usePromise=Bn;function Pf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}Pf(`.papi-checkbox {
  background-color: transparent;
}

.papi-checkbox.error {
  color: #f00;
}

.papi-checkbox.error:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.papi-checkbox.paratext {
  color: greenyellow;
}

.papi-checkbox-label.paratext {
  color: darkgreen;
}

.papi-checkbox.paratext:hover {
  background-color: rgba(0, 100, 0, 0.3);
}

.papi-checkbox.paratext.bright {
  color: darkgreen;
}

.papi-checkbox-label.paratext.bright {
  background-color: greenyellow;
}

.papi-checkbox.paratext.bright:hover {
  background-color: rgba(173, 255, 47, 0.3);
}

.papi-checkbox.below,
.papi-checkbox.above {
  text-align: center;
}
.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
}
.papi-slider {
  background-color: transparent;
  color: #1ea7fd;
}

.papi-slider.vertical {
  min-height: 200px;
}

.papi-slider.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-slider.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-context-menu-target {
  white-space: nowrap;
  cursor: context-menu;
}

.papi-context-menu-target * {
  white-space: normal;
}

.papi-context-menu-target:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext:hover {
  box-shadow: 0 0 10px rgba(0, 100, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext.bright:hover {
  box-shadow: 0 0 10px rgba(173, 255, 47, 0.07); /* Faint shadowy background */
}

.papi-context-menu.paratext ul {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-context-menu.paratext.bright ul {
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
.papi-switch {
  background-color: transparent;
}

.papi-switch.primary {
  background-color: #1ea7fd;
}

.papi-switch.secondary {
  background-color: #6fc8ff;
}

.papi-switch.error {
  background-color: #f00;
}

.papi-switch.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-switch.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-toolbar {
  background-color: #eee;
  color: black;
}

.papi-toolbar.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-toolbar.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  position: relative;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
}

.papi-snackbar.external {
  background-color: lightsteelblue;
  border-color: white;
  border-style: dotted;
  padding: 2%;
  width: 30%;
}

.papi-snackbar.secondary {
  background: transparent;
  color: #333;
}

.papi-snackbar.alert {
  background: lightcoral;
}

.papi-snackbar.paratext {
  background: darkgreen;
  color: greenyellow;
}

.papi-snackbar.bright {
  background: greenyellow;
  color: darkgreen;
}
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
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
  * {
    border-color: hsl(var(--border));
}

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
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
}
.pr-absolute {
    position: absolute;
}
.pr-relative {
    position: relative;
}
.pr-left-2 {
    left: 0.5rem;
}
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-flex {
    display: flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
}
.pr-h-3 {
    height: 0.75rem;
}
.pr-h-3\\.5 {
    height: 0.875rem;
}
.pr-h-4 {
    height: 1rem;
}
.pr-h-px {
    height: 1px;
}
.pr-w-2 {
    width: 0.5rem;
}
.pr-w-3 {
    width: 0.75rem;
}
.pr-w-3\\.5 {
    width: 0.875rem;
}
.pr-w-4 {
    width: 1rem;
}
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-cursor-default {
    cursor: default;
}
.pr-select-none {
    user-select: none;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-rounded-md {
    border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
    border-radius: calc(var(--radius) - 4px);
}
.pr-border {
    border-width: 1px;
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}
.pr-py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
.pr-py-1\\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}
.pr-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-semibold {
    font-weight: 600;
}
.pr-tracking-widest {
    letter-spacing: 0.1em;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-opacity-60 {
    opacity: 0.6;
}
.pr-shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-md {
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
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
.file\\:pr-border-0::file-selector-button {
    border-width: 0px;
}
.file\\:pr-bg-transparent::file-selector-button {
    background-color: transparent;
}
.file\\:pr-text-sm::file-selector-button {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.file\\:pr-font-medium::file-selector-button {
    font-weight: 500;
}
.placeholder\\:pr-text-muted-foreground::placeholder {
    color: hsl(var(--muted-foreground));
}
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.focus-visible\\:pr-outline-none:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.focus-visible\\:pr-ring-2:focus-visible {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state=open] {
    animation-name: enter;
    animation-duration: 150ms;
    --tw-enter-opacity: initial;
    --tw-enter-scale: initial;
    --tw-enter-rotate: initial;
    --tw-enter-translate-x: initial;
    --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state=closed] {
    animation-name: exit;
    animation-duration: 150ms;
    --tw-exit-opacity: initial;
    --tw-exit-scale: initial;
    --tw-exit-rotate: initial;
    --tw-exit-translate-x: initial;
    --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state=closed] {
    --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state=open] {
    --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state=closed] {
    --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state=open] {
    --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side=bottom] {
    --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side=left] {
    --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side=right] {
    --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side=top] {
    --tw-enter-translate-y: 0.5rem;
}
.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: hsl(0, 0%, 96%);
}

.chapter {
  display: flex;
  width: 16px;
  height: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chapter:hover {
  background: yellow;
}

.active {
  border-radius: 4px;
  background: yellow;
}

/* .chapterSelector {
  display: flex;
  padding: 0px 8px 0px 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background-color: whitesmoke;
}
.chapterSelector.focus\\:bg-accent:focus {
  background-color: whitesmoke;
}
.chapterSelector > * {
  display: flex;
  width: 36px;
  padding: 8px 12px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.chapterSelector > *.active {
  background-color: #fef3c7;
}
.chapterSelector > *:hover {
  background-color: hsl(48 100% 96.1%);
} */

/* State=default, type=default */
.book-chapter-input {
  width: 300px;
  height: 36px;
  padding: 0 12px 0 40px;
}

/* navigation menu item */
/*
box-sizing: border-box;

 Auto layout
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 12px 8px 16px;
gap: 10px;

width: 153px;
height: 36px;

background: #FFFFFF;
border: 1px solid #000000;
border-radius: 6px;

/* Inside auto layout
flex: none;
order: 0;
flex-grow: 0; */
@layer rdg {
  @layer Defaults,
    FocusSink,
    CheckboxInput,
    CheckboxIcon,
    CheckboxLabel,
    Cell,
    HeaderCell,
    SummaryCell,
    EditCell,
    Row,
    HeaderRow,
    SummaryRow,
    GroupedRow,
    Root;
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
    --rdg-selection-color: #66afe9;
    --rdg-font-size: 14px;

    display: grid;

    color-scheme: var(--rdg-color-scheme, light dark);

    /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
    /* We set a stacking context so internal elements don't render on top of external elements. */
    /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
    contain: content;
    content-visibility: auto;
    block-size: 350px;
    border: 1px solid var(--rdg-border-color);
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--rdg-background-color);
    color: var(--rdg-color);
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`,"top");
//# sourceMappingURL=index.cjs.map
