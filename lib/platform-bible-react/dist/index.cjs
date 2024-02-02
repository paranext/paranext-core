"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const k=require("react/jsx-runtime"),ce=require("@mui/material"),se=require("react"),ot=require("@mui/styled-engine"),un=require("react-dom"),Se=require("platform-bible-utils"),_t=require("react-data-grid");function Er(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:()=>e[t]})}}return n.default=e,Object.freeze(n)}const O=Er(se),mo=Er(un);function De({id:e,isDisabled:n=!1,className:t,onClick:r,onContextMenu:o,children:i}){return k.jsx(ce.Button,{id:e,disabled:n,className:`papi-button ${t??""}`,onClick:r,onContextMenu:o,children:i})}function wn({id:e,title:n,isDisabled:t=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:c=[],className:l,value:u,onChange:d,onFocus:p,onBlur:f,getOptionLabel:y}){return k.jsx(ce.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!r,fullWidth:i,options:c,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:u,onChange:d,onFocus:p,onBlur:f,getOptionLabel:y,renderInput:g=>k.jsx(ce.TextField,{...g,error:o,fullWidth:i,disabled:t,label:n,style:{width:a}})})}function bo({startChapter:e,endChapter:n,handleSelectStartChapter:t,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=se.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),c=(u,d)=>{t(d),d>n&&r(d)},l=(u,d)=>{r(d),d<e&&t(d)};return k.jsxs(k.Fragment,{children:[k.jsx(ce.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:k.jsx(wn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),k.jsx(ce.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:k.jsx(wn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ve=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ve||{});function Tr({id:e,isChecked:n,labelText:t="",labelPosition:r=Ve.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:c=!1,className:l,onChange:u}){const d=k.jsx(ce.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${c?"error":""} ${l??""}`,onChange:u});let p;if(t){const f=r===Ve.Before||r===Ve.Above,y=k.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${l??""}`,children:t}),g=r===Ve.Before||r===Ve.After,b=g?y:k.jsx("div",{children:y}),h=g?d:k.jsx("div",{children:d});p=k.jsxs(ce.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:c,children:[f&&b,h,!f&&b]})}else p=d;return p}function $t(e,n,t){return e?k.jsx(ce.ListItemIcon,{className:`papi-menu-icon-${t?"leading":"trailing"}`,children:k.jsx("img",{src:e,alt:`${t?"Leading":"Trailing"} icon for ${n}`})}):void 0}function kr(e){const{onClick:n,name:t,allowForLeadingIcons:r=!0,iconPathBefore:o=void 0,iconPathAfter:i=void 0,hasAutoFocus:a=!1,className:c,isDense:l=!0,hasDisabledGutters:u=!1,hasDivider:d=!1,focusVisibleClassName:p,id:f,children:y}=e;return k.jsx(ce.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:c,dense:l,disableGutters:u,divider:d,focusVisibleClassName:p,onClick:n,id:f,children:t?k.jsxs(k.Fragment,{children:[$t(o,t,!0),k.jsx(ce.ListItemText,{primary:t,inset:!o&&r}),$t(i,t,!1)]}):y})}function ft({commandHandler:e,items:n,onClick:t}){const r=(n==null?void 0:n.find(o=>o.iconPathBefore!==void 0))!==void 0;return n==null?void 0:n.map((o,i)=>k.jsx(kr,{className:`papi-menu-item ${o.className??""}`,allowForLeadingIcons:r,onClick:()=>{t&&t(),e(o)},...o},i))}function go({commandHandler:e,name:n,className:t,items:r,id:o}){return k.jsxs(ce.Grid,{id:o,item:!0,xs:"auto",className:`papi-menu-column ${t??""}`,children:[k.jsx("h3",{className:`papi-menu-column-header ${t??""}`,children:n}),k.jsx(ce.List,{id:o,dense:!0,className:t??"",children:k.jsx(ft,{className:t,commandHandler:e,items:r})})]})}function Sr({commandHandler:e,className:n,columns:t,id:r}){return k.jsx(ce.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:t.length,id:r,children:t.map((o,i)=>k.jsx(go,{commandHandler:e,name:o.name,className:n,items:o.items},i))})}function yo({id:e,label:n,isDisabled:t=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:c,onClick:l,children:u}){return k.jsx(ce.IconButton,{id:e,disabled:t,edge:i,size:a,"aria-label":n,title:o?void 0:r??n,className:`papi-icon-button ${c??""}`,onClick:l,children:u})}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},S.apply(this,arguments)}function le(e,n){if(e==null)return{};var t={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(n.indexOf(o)>=0)&&(t[o]=e[o]);return t}function vo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={exports:{}},ne={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mt;function xo(){if(Mt)return ne;Mt=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),g;g=Symbol.for("react.module.reference");function b(h){if(typeof h=="object"&&h!==null){var T=h.$$typeof;switch(T){case e:switch(h=h.type,h){case t:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case c:case a:case l:case f:case p:case i:return h;default:return T}}case n:return T}}}return ne.ContextConsumer=a,ne.ContextProvider=i,ne.Element=e,ne.ForwardRef=l,ne.Fragment=t,ne.Lazy=f,ne.Memo=p,ne.Portal=n,ne.Profiler=o,ne.StrictMode=r,ne.Suspense=u,ne.SuspenseList=d,ne.isAsyncMode=function(){return!1},ne.isConcurrentMode=function(){return!1},ne.isContextConsumer=function(h){return b(h)===a},ne.isContextProvider=function(h){return b(h)===i},ne.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ne.isForwardRef=function(h){return b(h)===l},ne.isFragment=function(h){return b(h)===t},ne.isLazy=function(h){return b(h)===f},ne.isMemo=function(h){return b(h)===p},ne.isPortal=function(h){return b(h)===n},ne.isProfiler=function(h){return b(h)===o},ne.isStrictMode=function(h){return b(h)===r},ne.isSuspense=function(h){return b(h)===u},ne.isSuspenseList=function(h){return b(h)===d},ne.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===t||h===o||h===r||h===u||h===d||h===y||typeof h=="object"&&h!==null&&(h.$$typeof===f||h.$$typeof===p||h.$$typeof===i||h.$$typeof===a||h.$$typeof===l||h.$$typeof===g||h.getModuleId!==void 0)},ne.typeOf=b,ne}var te={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var It;function Eo(){return It||(It=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),g=!1,b=!1,h=!1,T=!1,F=!1,v;v=Symbol.for("react.module.reference");function E(w){return!!(typeof w=="string"||typeof w=="function"||w===t||w===o||F||w===r||w===u||w===d||T||w===y||g||b||h||typeof w=="object"&&w!==null&&(w.$$typeof===f||w.$$typeof===p||w.$$typeof===i||w.$$typeof===a||w.$$typeof===l||w.$$typeof===v||w.getModuleId!==void 0))}function m(w){if(typeof w=="object"&&w!==null){var he=w.$$typeof;switch(he){case e:var be=w.type;switch(be){case t:case o:case r:case u:case d:return be;default:var Oe=be&&be.$$typeof;switch(Oe){case c:case a:case l:case f:case p:case i:return Oe;default:return he}}case n:return he}}}var I=a,_=i,K=e,Z=l,P=t,G=f,q=p,ee=n,M=o,N=r,$=u,D=d,ie=!1,Q=!1;function x(w){return ie||(ie=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function R(w){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(w){return m(w)===a}function z(w){return m(w)===i}function j(w){return typeof w=="object"&&w!==null&&w.$$typeof===e}function V(w){return m(w)===l}function B(w){return m(w)===t}function L(w){return m(w)===f}function W(w){return m(w)===p}function X(w){return m(w)===n}function U(w){return m(w)===o}function pe(w){return m(w)===r}function C(w){return m(w)===u}function H(w){return m(w)===d}te.ContextConsumer=I,te.ContextProvider=_,te.Element=K,te.ForwardRef=Z,te.Fragment=P,te.Lazy=G,te.Memo=q,te.Portal=ee,te.Profiler=M,te.StrictMode=N,te.Suspense=$,te.SuspenseList=D,te.isAsyncMode=x,te.isConcurrentMode=R,te.isContextConsumer=A,te.isContextProvider=z,te.isElement=j,te.isForwardRef=V,te.isFragment=B,te.isLazy=L,te.isMemo=W,te.isPortal=X,te.isProfiler=U,te.isStrictMode=pe,te.isSuspense=C,te.isSuspenseList=H,te.isValidElementType=E,te.typeOf=m}()),te}process.env.NODE_ENV==="production"?it.exports=xo():it.exports=Eo();var On=it.exports,st={exports:{}},En={exports:{}},re={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var At;function To(){if(At)return re;At=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,g=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,F=e?Symbol.for("react.scope"):60119;function v(m){if(typeof m=="object"&&m!==null){var I=m.$$typeof;switch(I){case n:switch(m=m.type,m){case l:case u:case r:case i:case o:case p:return m;default:switch(m=m&&m.$$typeof,m){case c:case d:case g:case y:case a:return m;default:return I}}case t:return I}}}function E(m){return v(m)===u}return re.AsyncMode=l,re.ConcurrentMode=u,re.ContextConsumer=c,re.ContextProvider=a,re.Element=n,re.ForwardRef=d,re.Fragment=r,re.Lazy=g,re.Memo=y,re.Portal=t,re.Profiler=i,re.StrictMode=o,re.Suspense=p,re.isAsyncMode=function(m){return E(m)||v(m)===l},re.isConcurrentMode=E,re.isContextConsumer=function(m){return v(m)===c},re.isContextProvider=function(m){return v(m)===a},re.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===n},re.isForwardRef=function(m){return v(m)===d},re.isFragment=function(m){return v(m)===r},re.isLazy=function(m){return v(m)===g},re.isMemo=function(m){return v(m)===y},re.isPortal=function(m){return v(m)===t},re.isProfiler=function(m){return v(m)===i},re.isStrictMode=function(m){return v(m)===o},re.isSuspense=function(m){return v(m)===p},re.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===p||m===f||typeof m=="object"&&m!==null&&(m.$$typeof===g||m.$$typeof===y||m.$$typeof===a||m.$$typeof===c||m.$$typeof===d||m.$$typeof===h||m.$$typeof===T||m.$$typeof===F||m.$$typeof===b)},re.typeOf=v,re}var oe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jt;function ko(){return jt||(jt=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,g=e?Symbol.for("react.lazy"):60116,b=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,T=e?Symbol.for("react.responder"):60118,F=e?Symbol.for("react.scope"):60119;function v(C){return typeof C=="string"||typeof C=="function"||C===r||C===u||C===i||C===o||C===p||C===f||typeof C=="object"&&C!==null&&(C.$$typeof===g||C.$$typeof===y||C.$$typeof===a||C.$$typeof===c||C.$$typeof===d||C.$$typeof===h||C.$$typeof===T||C.$$typeof===F||C.$$typeof===b)}function E(C){if(typeof C=="object"&&C!==null){var H=C.$$typeof;switch(H){case n:var w=C.type;switch(w){case l:case u:case r:case i:case o:case p:return w;default:var he=w&&w.$$typeof;switch(he){case c:case d:case g:case y:case a:return he;default:return H}}case t:return H}}}var m=l,I=u,_=c,K=a,Z=n,P=d,G=r,q=g,ee=y,M=t,N=i,$=o,D=p,ie=!1;function Q(C){return ie||(ie=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),x(C)||E(C)===l}function x(C){return E(C)===u}function R(C){return E(C)===c}function A(C){return E(C)===a}function z(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function j(C){return E(C)===d}function V(C){return E(C)===r}function B(C){return E(C)===g}function L(C){return E(C)===y}function W(C){return E(C)===t}function X(C){return E(C)===i}function U(C){return E(C)===o}function pe(C){return E(C)===p}oe.AsyncMode=m,oe.ConcurrentMode=I,oe.ContextConsumer=_,oe.ContextProvider=K,oe.Element=Z,oe.ForwardRef=P,oe.Fragment=G,oe.Lazy=q,oe.Memo=ee,oe.Portal=M,oe.Profiler=N,oe.StrictMode=$,oe.Suspense=D,oe.isAsyncMode=Q,oe.isConcurrentMode=x,oe.isContextConsumer=R,oe.isContextProvider=A,oe.isElement=z,oe.isForwardRef=j,oe.isFragment=V,oe.isLazy=B,oe.isMemo=L,oe.isPortal=W,oe.isProfiler=X,oe.isStrictMode=U,oe.isSuspense=pe,oe.isValidElementType=v,oe.typeOf=E}()),oe}var Dt;function wr(){return Dt||(Dt=1,process.env.NODE_ENV==="production"?En.exports=To():En.exports=ko()),En.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var qn,Bt;function So(){if(Bt)return qn;Bt=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},c=0;c<10;c++)a["_"+String.fromCharCode(c)]=c;var l=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(l.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return qn=o()?Object.assign:function(i,a){for(var c,l=r(i),u,d=1;d<arguments.length;d++){c=Object(arguments[d]);for(var p in c)n.call(c,p)&&(l[p]=c[p]);if(e){u=e(c);for(var f=0;f<u.length;f++)t.call(c,u[f])&&(l[u[f]]=c[u[f]])}}return l},qn}var Wn,Ft;function pt(){if(Ft)return Wn;Ft=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Wn=e,Wn}var Gn,Lt;function Or(){return Lt||(Lt=1,Gn=Function.call.bind(Object.prototype.hasOwnProperty)),Gn}var Kn,Vt;function wo(){if(Vt)return Kn;Vt=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=pt(),t={},r=Or();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,c,l,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var p;try{if(typeof i[d]!="function"){var f=Error((l||"React class")+": "+c+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}p=i[d](a,d,l,c,null,n)}catch(g){p=g}if(p&&!(p instanceof Error)&&e((l||"React class")+": type specification of "+c+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in t)){t[p.message]=!0;var y=u?u():"";e("Failed "+c+" type: "+p.message+(y??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},Kn=o,Kn}var Xn,zt;function Oo(){if(zt)return Xn;zt=1;var e=wr(),n=So(),t=pt(),r=Or(),o=wo(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(c){var l="Warning: "+c;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function a(){return null}return Xn=function(c,l){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function p(x){var R=x&&(u&&x[u]||x[d]);if(typeof R=="function")return R}var f="<<anonymous>>",y={array:T("array"),bigint:T("bigint"),bool:T("boolean"),func:T("function"),number:T("number"),object:T("object"),string:T("string"),symbol:T("symbol"),any:F(),arrayOf:v,element:E(),elementType:m(),instanceOf:I,node:P(),objectOf:K,oneOf:_,oneOfType:Z,shape:q,exact:ee};function g(x,R){return x===R?x!==0||1/x===1/R:x!==x&&R!==R}function b(x,R){this.message=x,this.data=R&&typeof R=="object"?R:{},this.stack=""}b.prototype=Error.prototype;function h(x){if(process.env.NODE_ENV!=="production")var R={},A=0;function z(V,B,L,W,X,U,pe){if(W=W||f,U=U||L,pe!==t){if(l){var C=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw C.name="Invariant Violation",C}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var H=W+":"+L;!R[H]&&A<3&&(i("You are manually calling a React.PropTypes validation function for the `"+U+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),R[H]=!0,A++)}}return B[L]==null?V?B[L]===null?new b("The "+X+" `"+U+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new b("The "+X+" `"+U+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:x(B,L,W,X,U)}var j=z.bind(null,!1);return j.isRequired=z.bind(null,!0),j}function T(x){function R(A,z,j,V,B,L){var W=A[z],X=$(W);if(X!==x){var U=D(W);return new b("Invalid "+V+" `"+B+"` of type "+("`"+U+"` supplied to `"+j+"`, expected ")+("`"+x+"`."),{expectedType:x})}return null}return h(R)}function F(){return h(a)}function v(x){function R(A,z,j,V,B){if(typeof x!="function")return new b("Property `"+B+"` of component `"+j+"` has invalid PropType notation inside arrayOf.");var L=A[z];if(!Array.isArray(L)){var W=$(L);return new b("Invalid "+V+" `"+B+"` of type "+("`"+W+"` supplied to `"+j+"`, expected an array."))}for(var X=0;X<L.length;X++){var U=x(L,X,j,V,B+"["+X+"]",t);if(U instanceof Error)return U}return null}return h(R)}function E(){function x(R,A,z,j,V){var B=R[A];if(!c(B)){var L=$(B);return new b("Invalid "+j+" `"+V+"` of type "+("`"+L+"` supplied to `"+z+"`, expected a single ReactElement."))}return null}return h(x)}function m(){function x(R,A,z,j,V){var B=R[A];if(!e.isValidElementType(B)){var L=$(B);return new b("Invalid "+j+" `"+V+"` of type "+("`"+L+"` supplied to `"+z+"`, expected a single ReactElement type."))}return null}return h(x)}function I(x){function R(A,z,j,V,B){if(!(A[z]instanceof x)){var L=x.name||f,W=Q(A[z]);return new b("Invalid "+V+" `"+B+"` of type "+("`"+W+"` supplied to `"+j+"`, expected ")+("instance of `"+L+"`."))}return null}return h(R)}function _(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function R(A,z,j,V,B){for(var L=A[z],W=0;W<x.length;W++)if(g(L,x[W]))return null;var X=JSON.stringify(x,function(pe,C){var H=D(C);return H==="symbol"?String(C):C});return new b("Invalid "+V+" `"+B+"` of value `"+String(L)+"` "+("supplied to `"+j+"`, expected one of "+X+"."))}return h(R)}function K(x){function R(A,z,j,V,B){if(typeof x!="function")return new b("Property `"+B+"` of component `"+j+"` has invalid PropType notation inside objectOf.");var L=A[z],W=$(L);if(W!=="object")return new b("Invalid "+V+" `"+B+"` of type "+("`"+W+"` supplied to `"+j+"`, expected an object."));for(var X in L)if(r(L,X)){var U=x(L,X,j,V,B+"."+X,t);if(U instanceof Error)return U}return null}return h(R)}function Z(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var R=0;R<x.length;R++){var A=x[R];if(typeof A!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ie(A)+" at index "+R+"."),a}function z(j,V,B,L,W){for(var X=[],U=0;U<x.length;U++){var pe=x[U],C=pe(j,V,B,L,W,t);if(C==null)return null;C.data&&r(C.data,"expectedType")&&X.push(C.data.expectedType)}var H=X.length>0?", expected one of type ["+X.join(", ")+"]":"";return new b("Invalid "+L+" `"+W+"` supplied to "+("`"+B+"`"+H+"."))}return h(z)}function P(){function x(R,A,z,j,V){return M(R[A])?null:new b("Invalid "+j+" `"+V+"` supplied to "+("`"+z+"`, expected a ReactNode."))}return h(x)}function G(x,R,A,z,j){return new b((x||"React class")+": "+R+" type `"+A+"."+z+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+j+"`.")}function q(x){function R(A,z,j,V,B){var L=A[z],W=$(L);if(W!=="object")return new b("Invalid "+V+" `"+B+"` of type `"+W+"` "+("supplied to `"+j+"`, expected `object`."));for(var X in x){var U=x[X];if(typeof U!="function")return G(j,V,B,X,D(U));var pe=U(L,X,j,V,B+"."+X,t);if(pe)return pe}return null}return h(R)}function ee(x){function R(A,z,j,V,B){var L=A[z],W=$(L);if(W!=="object")return new b("Invalid "+V+" `"+B+"` of type `"+W+"` "+("supplied to `"+j+"`, expected `object`."));var X=n({},A[z],x);for(var U in X){var pe=x[U];if(r(x,U)&&typeof pe!="function")return G(j,V,B,U,D(pe));if(!pe)return new b("Invalid "+V+" `"+B+"` key `"+U+"` supplied to `"+j+"`.\nBad object: "+JSON.stringify(A[z],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(x),null,"  "));var C=pe(L,U,j,V,B+"."+U,t);if(C)return C}return null}return h(R)}function M(x){switch(typeof x){case"number":case"string":case"undefined":return!0;case"boolean":return!x;case"object":if(Array.isArray(x))return x.every(M);if(x===null||c(x))return!0;var R=p(x);if(R){var A=R.call(x),z;if(R!==x.entries){for(;!(z=A.next()).done;)if(!M(z.value))return!1}else for(;!(z=A.next()).done;){var j=z.value;if(j&&!M(j[1]))return!1}}else return!1;return!0;default:return!1}}function N(x,R){return x==="symbol"?!0:R?R["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&R instanceof Symbol:!1}function $(x){var R=typeof x;return Array.isArray(x)?"array":x instanceof RegExp?"object":N(R,x)?"symbol":R}function D(x){if(typeof x>"u"||x===null)return""+x;var R=$(x);if(R==="object"){if(x instanceof Date)return"date";if(x instanceof RegExp)return"regexp"}return R}function ie(x){var R=D(x);switch(R){case"array":case"object":return"an "+R;case"boolean":case"date":case"regexp":return"a "+R;default:return R}}function Q(x){return!x.constructor||!x.constructor.name?f:x.constructor.name}return y.checkPropTypes=o,y.resetWarningCache=o.resetWarningCache,y.PropTypes=y,y},Xn}var Yn,Ut;function Co(){if(Ut)return Yn;Ut=1;var e=pt();function n(){}function t(){}return t.resetWarningCache=n,Yn=function(){function r(a,c,l,u,d,p){if(p!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:n};return i.PropTypes=i,i},Yn}if(process.env.NODE_ENV!=="production"){var Ro=wr(),Po=!0;st.exports=Oo()(Ro.isElement,Po)}else st.exports=Co()();var No=st.exports;const s=vo(No);function Cr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Cr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Pe(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Cr(e))&&(r&&(r+=" "),r+=n);return r}function yn(e,n){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||n(...r)}}function Ie(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Rr(e){if(!Ie(e))return e;const n={};return Object.keys(e).forEach(t=>{n[t]=Rr(e[t])}),n}function Te(e,n,t={clone:!0}){const r=t.clone?S({},e):e;return Ie(e)&&Ie(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ie(n[o])&&o in e&&Ie(e[o])?r[o]=Te(e[o],n[o],t):t.clone?r[o]=Ie(n[o])?Rr(n[o]):n[o]:r[o]=n[o])}),r}function _o(e){const{prototype:n={}}=e;return!!n.isReactComponent}function Pr(e,n,t,r,o){const i=e[n],a=o||n;if(i==null||typeof window>"u")return null;let c;const l=i.type;return typeof l=="function"&&!_o(l)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Nr=yn(s.element,Pr);Nr.isRequired=yn(s.element.isRequired,Pr);const In=Nr;function $o(e){const{prototype:n={}}=e;return!!n.isReactComponent}function Mo(e,n,t,r,o){const i=e[n],a=o||n;if(i==null||typeof window>"u")return null;let c;return typeof i=="function"&&!$o(i)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Io=yn(s.elementType,Mo),Ao="exact-prop: ​";function _r(e){return process.env.NODE_ENV==="production"?e:S({},e,{[Ao]:n=>{const t=Object.keys(n).filter(r=>!e.hasOwnProperty(r));return t.length>0?new Error(`The following props are not supported: ${t.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function tn(e){let n="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}const jo=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Do(e){const n=`${e}`.match(jo);return n&&n[1]||""}function $r(e,n=""){return e.displayName||e.name||Do(e)||n}function Ht(e,n,t){const r=$r(n);return e.displayName||(r!==""?`${t}(${r})`:t)}function Bo(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return $r(e,"Component");if(typeof e=="object")switch(e.$$typeof){case On.ForwardRef:return Ht(e,e.render,"ForwardRef");case On.Memo:return Ht(e,e.type,"memo");default:return}}}function hn(e,n,t,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[n],a=o||n;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an HTMLElement.`):null}const Fo=s.oneOfType([s.func,s.object]),Lo=Fo;function we(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":tn(7));return e.charAt(0).toUpperCase()+e.slice(1)}function qt(...e){return e.reduce((n,t)=>t==null?n:function(...o){n.apply(this,o),t.apply(this,o)},()=>{})}function Vo(e,n=166){let t;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(t),t=setTimeout(i,n)}return r.clear=()=>{clearTimeout(t)},r}function ve(e){return e&&e.ownerDocument||document}function mn(e){return ve(e).defaultView||window}function at(e,n){typeof e=="function"?e(n):e&&(e.current=n)}const zo=typeof window<"u"?O.useLayoutEffect:O.useEffect,Cn=zo;function Wt(e){const n=O.useRef(e);return Cn(()=>{n.current=e}),O.useRef((...t)=>(0,n.current)(...t)).current}function Ae(...e){return O.useMemo(()=>e.every(n=>n==null)?null:n=>{e.forEach(t=>{at(t,n)})},e)}function Mr(e){const n=e.documentElement.clientWidth;return Math.abs(window.innerWidth-n)}function Uo(e){const n=typeof e;switch(n){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return n}}function Ho(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const qo=Number.isInteger||Ho;function Ir(e,n,t,r){const o=e[n];if(o==null||!qo(o)){const i=Uo(o);return new RangeError(`Invalid ${r} \`${n}\` of type \`${i}\` supplied to \`${t}\`, expected \`integer\`.`)}return null}function Ar(e,n,...t){return e[n]===void 0?null:Ir(e,n,...t)}function ct(){return null}Ar.isRequired=Ir;ct.isRequired=ct;const jr=process.env.NODE_ENV==="production"?ct:Ar;function Dr(e,n){const t=S({},n);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))t[r]=S({},e[r],t[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=n[r];t[r]={},!i||!Object.keys(i)?t[r]=o:!o||!Object.keys(o)?t[r]=i:(t[r]=S({},i),Object.keys(o).forEach(a=>{t[r][a]=Dr(o[a],i[a])}))}else t[r]===void 0&&(t[r]=e[r])}),t}function He(e,n,t=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const c=n(a);c!==""&&i.push(c),t&&t[a]&&i.push(t[a])}return i},[]).join(" ")}),r}const Gt=e=>e,Wo=()=>{let e=Gt;return{configure(n){e=n},generate(n){return e(n)},reset(){e=Gt}}},Go=Wo(),Ko=Go,Xo={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function _e(e,n,t="Mui"){const r=Xo[n];return r?`${t}-${r}`:`${Ko.generate(e)}-${n}`}function qe(e,n,t="Mui"){const r={};return n.forEach(o=>{r[o]=_e(e,o,t)}),r}function Yo(e,n=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,t))}function Br(e){return typeof e=="string"}function Jo(e,n,t){return e===void 0||Br(e)?n:S({},n,{ownerState:S({},n.ownerState,t)})}function Fr(e,n=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!n.includes(r)).forEach(r=>{t[r]=e[r]}),t}function Zo(e,n,t){return typeof e=="function"?e(n,t):e}function Lr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Lr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Kt(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Lr(e))&&(r&&(r+=" "),r+=n);return r}function Xt(e){if(e===void 0)return{};const n={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{n[t]=e[t]}),n}function Qo(e){const{getSlotProps:n,additionalProps:t,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!n){const y=Kt(t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),g=S({},t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),b=S({},t,o,r);return y.length>0&&(b.className=y),Object.keys(g).length>0&&(b.style=g),{props:b,internalRef:void 0}}const a=Fr(S({},o,r)),c=Xt(r),l=Xt(o),u=n(a),d=Kt(u==null?void 0:u.className,t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),p=S({},u==null?void 0:u.style,t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),f=S({},u,t,l,c);return d.length>0&&(f.className=d),Object.keys(p).length>0&&(f.style=p),{props:f,internalRef:u.ref}}const ei=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function rn(e){var n;const{elementType:t,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=le(e,ei),c=i?{}:Zo(r,o),{props:l,internalRef:u}=Qo(S({},a,{externalSlotProps:c})),d=Ae(u,c==null?void 0:c.ref,(n=e.additionalProps)==null?void 0:n.ref);return Jo(t,S({},l,{ref:d}),o)}const ni=["values","unit","step"],ti=e=>{const n=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return n.sort((t,r)=>t.val-r.val),n.reduce((t,r)=>S({},t,{[r.key]:r.val}),{})};function ri(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:r=5}=e,o=le(e,ni),i=ti(n),a=Object.keys(i);function c(f){return`@media (min-width:${typeof n[f]=="number"?n[f]:f}${t})`}function l(f){return`@media (max-width:${(typeof n[f]=="number"?n[f]:f)-r/100}${t})`}function u(f,y){const g=a.indexOf(y);return`@media (min-width:${typeof n[f]=="number"?n[f]:f}${t}) and (max-width:${(g!==-1&&typeof n[a[g]]=="number"?n[a[g]]:y)-r/100}${t})`}function d(f){return a.indexOf(f)+1<a.length?u(f,a[a.indexOf(f)+1]):c(f)}function p(f){const y=a.indexOf(f);return y===0?c(a[1]):y===a.length-1?l(a[y]):u(f,a[a.indexOf(f)+1]).replace("@media","@media not all and")}return S({keys:a,values:i,up:c,down:l,between:u,only:d,not:p,unit:t},o)}const oi={borderRadius:4},ii=oi,si=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},je=si;function fn(e,n){return n?Te(e,n,{clone:!1}):e}const ht={xs:0,sm:600,md:900,lg:1200,xl:1536},Yt={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ht[e]}px)`};function Ne(e,n,t){const r=e.theme||{};if(Array.isArray(n)){const i=r.breakpoints||Yt;return n.reduce((a,c,l)=>(a[i.up(i.keys[l])]=t(n[l]),a),{})}if(typeof n=="object"){const i=r.breakpoints||Yt;return Object.keys(n).reduce((a,c)=>{if(Object.keys(i.values||ht).indexOf(c)!==-1){const l=i.up(c);a[l]=t(n[c],c)}else{const l=c;a[l]=n[l]}return a},{})}return t(n)}function ai(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function ci(e,n){return e.reduce((t,r)=>{const o=t[r];return(!o||Object.keys(o).length===0)&&delete t[r],t},n)}function An(e,n,t=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&t){const r=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return n.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Rn(e,n,t,r=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||r:o=An(e,t)||r,n&&(o=n(o,r,e)),o}function fe(e){const{prop:n,cssProperty:t=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[n]==null)return null;const c=a[n],l=a.theme,u=An(l,r)||{};return Ne(a,c,p=>{let f=Rn(u,o,p);return p===f&&typeof p=="string"&&(f=Rn(u,o,`${n}${p==="default"?"":we(p)}`,p)),t===!1?f:{[t]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:je}:{},i.filterProps=[n],i}function li(e){const n={};return t=>(n[t]===void 0&&(n[t]=e(t)),n[t])}const ui={m:"margin",p:"padding"},di={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Jt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},fi=li(e=>{if(e.length>2)if(Jt[e])e=Jt[e];else return[e];const[n,t]=e.split(""),r=ui[n],o=di[t]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),jn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Dn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],pi=[...jn,...Dn];function vn(e,n,t,r){var o;const i=(o=An(e,n,!1))!=null?o:t;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Vr(e){return vn(e,"spacing",8,"spacing")}function xn(e,n){if(typeof n=="string"||n==null)return n;const t=Math.abs(n),r=e(t);return n>=0?r:typeof r=="number"?-r:`-${r}`}function hi(e,n){return t=>e.reduce((r,o)=>(r[o]=xn(n,t),r),{})}function mi(e,n,t,r){if(n.indexOf(t)===-1)return null;const o=fi(t),i=hi(o,r),a=e[t];return Ne(e,a,i)}function zr(e,n){const t=Vr(e.theme);return Object.keys(e).map(r=>mi(e,n,r,t)).reduce(fn,{})}function ue(e){return zr(e,jn)}ue.propTypes=process.env.NODE_ENV!=="production"?jn.reduce((e,n)=>(e[n]=je,e),{}):{};ue.filterProps=jn;function de(e){return zr(e,Dn)}de.propTypes=process.env.NODE_ENV!=="production"?Dn.reduce((e,n)=>(e[n]=je,e),{}):{};de.filterProps=Dn;process.env.NODE_ENV!=="production"&&pi.reduce((e,n)=>(e[n]=je,e),{});function bi(e=8){if(e.mui)return e;const n=Vr({spacing:e}),t=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=n(i);return typeof a=="number"?`${a}px`:a}).join(" "));return t.mui=!0,t}function Bn(...e){const n=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),t=r=>Object.keys(r).reduce((o,i)=>n[i]?fn(o,n[i](r)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},t.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),t}function ge(e){return typeof e!="number"?e:`${e}px solid`}function xe(e,n){return fe({prop:e,themeKey:"borders",transform:n})}const gi=xe("border",ge),yi=xe("borderTop",ge),vi=xe("borderRight",ge),xi=xe("borderBottom",ge),Ei=xe("borderLeft",ge),Ti=xe("borderColor"),ki=xe("borderTopColor"),Si=xe("borderRightColor"),wi=xe("borderBottomColor"),Oi=xe("borderLeftColor"),Ci=xe("outline",ge),Ri=xe("outlineColor"),Fn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=vn(e.theme,"shape.borderRadius",4,"borderRadius"),t=r=>({borderRadius:xn(n,r)});return Ne(e,e.borderRadius,t)}return null};Fn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:je}:{};Fn.filterProps=["borderRadius"];Bn(gi,yi,vi,xi,Ei,Ti,ki,Si,wi,Oi,Fn,Ci,Ri);const Ln=e=>{if(e.gap!==void 0&&e.gap!==null){const n=vn(e.theme,"spacing",8,"gap"),t=r=>({gap:xn(n,r)});return Ne(e,e.gap,t)}return null};Ln.propTypes=process.env.NODE_ENV!=="production"?{gap:je}:{};Ln.filterProps=["gap"];const Vn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=vn(e.theme,"spacing",8,"columnGap"),t=r=>({columnGap:xn(n,r)});return Ne(e,e.columnGap,t)}return null};Vn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:je}:{};Vn.filterProps=["columnGap"];const zn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=vn(e.theme,"spacing",8,"rowGap"),t=r=>({rowGap:xn(n,r)});return Ne(e,e.rowGap,t)}return null};zn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:je}:{};zn.filterProps=["rowGap"];const Pi=fe({prop:"gridColumn"}),Ni=fe({prop:"gridRow"}),_i=fe({prop:"gridAutoFlow"}),$i=fe({prop:"gridAutoColumns"}),Mi=fe({prop:"gridAutoRows"}),Ii=fe({prop:"gridTemplateColumns"}),Ai=fe({prop:"gridTemplateRows"}),ji=fe({prop:"gridTemplateAreas"}),Di=fe({prop:"gridArea"});Bn(Ln,Vn,zn,Pi,Ni,_i,$i,Mi,Ii,Ai,ji,Di);function nn(e,n){return n==="grey"?n:e}const Bi=fe({prop:"color",themeKey:"palette",transform:nn}),Fi=fe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:nn}),Li=fe({prop:"backgroundColor",themeKey:"palette",transform:nn});Bn(Bi,Fi,Li);function me(e){return e<=1&&e!==0?`${e*100}%`:e}const Vi=fe({prop:"width",transform:me}),mt=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=t=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[t])||ht[t];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:me(t)}};return Ne(e,e.maxWidth,n)}return null};mt.filterProps=["maxWidth"];const zi=fe({prop:"minWidth",transform:me}),Ui=fe({prop:"height",transform:me}),Hi=fe({prop:"maxHeight",transform:me}),qi=fe({prop:"minHeight",transform:me});fe({prop:"size",cssProperty:"width",transform:me});fe({prop:"size",cssProperty:"height",transform:me});const Wi=fe({prop:"boxSizing"});Bn(Vi,mt,zi,Ui,Hi,qi,Wi);const Gi={border:{themeKey:"borders",transform:ge},borderTop:{themeKey:"borders",transform:ge},borderRight:{themeKey:"borders",transform:ge},borderBottom:{themeKey:"borders",transform:ge},borderLeft:{themeKey:"borders",transform:ge},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ge},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Fn},color:{themeKey:"palette",transform:nn},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:nn},backgroundColor:{themeKey:"palette",transform:nn},p:{style:de},pt:{style:de},pr:{style:de},pb:{style:de},pl:{style:de},px:{style:de},py:{style:de},padding:{style:de},paddingTop:{style:de},paddingRight:{style:de},paddingBottom:{style:de},paddingLeft:{style:de},paddingX:{style:de},paddingY:{style:de},paddingInline:{style:de},paddingInlineStart:{style:de},paddingInlineEnd:{style:de},paddingBlock:{style:de},paddingBlockStart:{style:de},paddingBlockEnd:{style:de},m:{style:ue},mt:{style:ue},mr:{style:ue},mb:{style:ue},ml:{style:ue},mx:{style:ue},my:{style:ue},margin:{style:ue},marginTop:{style:ue},marginRight:{style:ue},marginBottom:{style:ue},marginLeft:{style:ue},marginX:{style:ue},marginY:{style:ue},marginInline:{style:ue},marginInlineStart:{style:ue},marginInlineEnd:{style:ue},marginBlock:{style:ue},marginBlockStart:{style:ue},marginBlockEnd:{style:ue},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ln},rowGap:{style:zn},columnGap:{style:Vn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:me},maxWidth:{style:mt},minWidth:{transform:me},height:{transform:me},maxHeight:{transform:me},minHeight:{transform:me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},bt=Gi;function Ki(...e){const n=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),t=new Set(n);return e.every(r=>t.size===Object.keys(r).length)}function Xi(e,n){return typeof e=="function"?e(n):e}function Yi(){function e(t,r,o,i){const a={[t]:r,theme:o},c=i[t];if(!c)return{[t]:r};const{cssProperty:l=t,themeKey:u,transform:d,style:p}=c;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[t]:r};const f=An(o,u)||{};return p?p(a):Ne(a,r,g=>{let b=Rn(f,d,g);return g===b&&typeof g=="string"&&(b=Rn(f,d,`${t}${g==="default"?"":we(g)}`,g)),l===!1?b:{[l]:b}})}function n(t){var r;const{sx:o,theme:i={}}=t||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:bt;function c(l){let u=l;if(typeof l=="function")u=l(i);else if(typeof l!="object")return l;if(!u)return null;const d=ai(i.breakpoints),p=Object.keys(d);let f=d;return Object.keys(u).forEach(y=>{const g=Xi(u[y],i);if(g!=null)if(typeof g=="object")if(a[y])f=fn(f,e(y,g,i,a));else{const b=Ne({theme:i},g,h=>({[y]:h}));Ki(b,g)?f[y]=n({sx:g,theme:i}):f=fn(f,b)}else f=fn(f,e(y,g,i,a))}),ci(p,f)}return Array.isArray(o)?o.map(c):c(o)}return n}const Ur=Yi();Ur.filterProps=["sx"];const gt=Ur,Ji=["breakpoints","palette","spacing","shape"];function yt(e={},...n){const{breakpoints:t={},palette:r={},spacing:o,shape:i={}}=e,a=le(e,Ji),c=ri(t),l=bi(o);let u=Te({breakpoints:c,direction:"ltr",components:{},palette:S({mode:"light"},r),spacing:l,shape:S({},ii,i)},a);return u=n.reduce((d,p)=>Te(d,p),u),u.unstable_sxConfig=S({},bt,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(p){return gt({sx:p,theme:this})},u}function Zi(e){return Object.keys(e).length===0}function Qi(e=null){const n=O.useContext(ot.ThemeContext);return!n||Zi(n)?e:n}const es=yt();function Hr(e=es){return Qi(e)}const ns=["variant"];function Zt(e){return e.length===0}function qr(e){const{variant:n}=e,t=le(e,ns);let r=n||"";return Object.keys(t).sort().forEach(o=>{o==="color"?r+=Zt(r)?e[o]:we(e[o]):r+=`${Zt(r)?o:we(o)}${we(e[o].toString())}`}),r}const ts=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function rs(e){return Object.keys(e).length===0}function os(e){return typeof e=="string"&&e.charCodeAt(0)>96}const is=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,Pn=e=>{let n=0;const t={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${n}`,n+=1):o=qr(r.props),t[o]=r.style}),t},ss=(e,n)=>{let t=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(t=n.components[e].variants),Pn(t)},Nn=(e,n,t)=>{const{ownerState:r={}}=e,o=[];let i=0;return t&&t.forEach(a=>{let c=!0;if(typeof a.props=="function"){const l=S({},e,r);c=a.props(l)}else Object.keys(a.props).forEach(l=>{r[l]!==a.props[l]&&e[l]!==a.props[l]&&(c=!1)});c&&(typeof a.props=="function"?o.push(n[`callback${i}`]):o.push(n[qr(a.props)])),typeof a.props=="function"&&(i+=1)}),o},as=(e,n,t,r)=>{var o;const i=t==null||(o=t.components)==null||(o=o[r])==null?void 0:o.variants;return Nn(e,n,i)};function Tn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const cs=yt(),Qt=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function kn({defaultTheme:e,theme:n,themeId:t}){return rs(n)?e:n[t]||n}function ls(e){return e?(n,t)=>t[e]:null}const er=({styledArg:e,props:n,defaultTheme:t,themeId:r})=>{const o=e(S({},n,{theme:kn(S({},n,{defaultTheme:t,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const a=Nn(n,Pn(i),i);return[o,...a]}return o};function us(e={}){const{themeId:n,defaultTheme:t=cs,rootShouldForwardProp:r=Tn,slotShouldForwardProp:o=Tn}=e,i=a=>gt(S({},a,{theme:kn(S({},a,{defaultTheme:t,themeId:n}))}));return i.__mui_systemSx=!0,(a,c={})=>{ot.internal_processStyles(a,E=>E.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:l,slot:u,skipVariantsResolver:d,skipSx:p,overridesResolver:f=ls(Qt(u))}=c,y=le(c,ts),g=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,b=p||!1;let h;process.env.NODE_ENV!=="production"&&l&&(h=`${l}-${Qt(u||"Root")}`);let T=Tn;u==="Root"||u==="root"?T=r:u?T=o:os(a)&&(T=void 0);const F=ot(a,S({shouldForwardProp:T,label:h},y)),v=(E,...m)=>{const I=m?m.map(P=>{if(typeof P=="function"&&P.__emotion_real!==P)return G=>er({styledArg:P,props:G,defaultTheme:t,themeId:n});if(Ie(P)){let G=P,q;return P&&P.variants&&(q=P.variants,delete G.variants,G=ee=>{let M=P;return Nn(ee,Pn(q),q).forEach($=>{M=Te(M,$)}),M}),G}return P}):[];let _=E;if(Ie(E)){let P;E&&E.variants&&(P=E.variants,delete _.variants,_=G=>{let q=E;return Nn(G,Pn(P),P).forEach(M=>{q=Te(q,M)}),q})}else typeof E=="function"&&E.__emotion_real!==E&&(_=P=>er({styledArg:E,props:P,defaultTheme:t,themeId:n}));l&&f&&I.push(P=>{const G=kn(S({},P,{defaultTheme:t,themeId:n})),q=is(l,G);if(q){const ee={};return Object.entries(q).forEach(([M,N])=>{ee[M]=typeof N=="function"?N(S({},P,{theme:G})):N}),f(P,ee)}return null}),l&&!g&&I.push(P=>{const G=kn(S({},P,{defaultTheme:t,themeId:n}));return as(P,ss(l,G),G,l)}),b||I.push(i);const K=I.length-m.length;if(Array.isArray(E)&&K>0){const P=new Array(K).fill("");_=[...E,...P],_.raw=[...E.raw,...P]}const Z=F(_,...I);if(process.env.NODE_ENV!=="production"){let P;l&&(P=`${l}${we(u||"")}`),P===void 0&&(P=`Styled(${Bo(a)})`),Z.displayName=P}return a.muiName&&(Z.muiName=a.muiName),Z};return F.withConfig&&(v.withConfig=F.withConfig),v}}function ds(e){const{theme:n,name:t,props:r}=e;return!n||!n.components||!n.components[t]||!n.components[t].defaultProps?r:Dr(n.components[t].defaultProps,r)}function fs({props:e,name:n,defaultTheme:t,themeId:r}){let o=Hr(t);return r&&(o=o[r]||o),ds({theme:o,name:n,props:e})}function vt(e,n=0,t=1){return process.env.NODE_ENV!=="production"&&(e<n||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`),Yo(e,n,t)}function ps(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(n);return t&&t[0].length===1&&(t=t.map(r=>r+r)),t?`rgb${t.length===4?"a":""}(${t.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function ze(e){if(e.type)return e;if(e.charAt(0)==="#")return ze(ps(e));const n=e.indexOf("("),t=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:tn(9,e));let r=e.substring(n+1,e.length-1),o;if(t==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:tn(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:t,values:r,colorSpace:o}}function Un(e){const{type:n,colorSpace:t}=e;let{values:r}=e;return n.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),n.indexOf("color")!==-1?r=`${t} ${r.join(" ")}`:r=`${r.join(", ")}`,`${n}(${r})`}function hs(e){e=ze(e);const{values:n}=e,t=n[0],r=n[1]/100,o=n[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+t/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let c="rgb";const l=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(c+="a",l.push(n[3])),Un({type:c,values:l})}function nr(e){e=ze(e);let n=e.type==="hsl"||e.type==="hsla"?ze(hs(e)).values:e.values;return n=n.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function tr(e,n){const t=nr(e),r=nr(n);return(Math.max(t,r)+.05)/(Math.min(t,r)+.05)}function rr(e,n){return e=ze(e),n=vt(n),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${n}`:e.values[3]=n,Un(e)}function ms(e,n){if(e=ze(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-n;return Un(e)}function bs(e,n){if(e=ze(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*n;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*n;return Un(e)}function gs(e,n){return S({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const ys={black:"#000",white:"#fff"},bn=ys,vs={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},xs=vs,Es={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ke=Es,Ts={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Xe=Ts,ks={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=ks,Ss={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ye=Ss,ws={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Je=ws,Os={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ze=Os,Cs=["mode","contrastThreshold","tonalOffset"],or={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:bn.white,default:bn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Jn={text:{primary:bn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:bn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ir(e,n,t,r){const o=r.light||r,i=r.dark||r*1.5;e[n]||(e.hasOwnProperty(t)?e[n]=e[t]:n==="light"?e.light=bs(e.main,o):n==="dark"&&(e.dark=ms(e.main,i)))}function Rs(e="light"){return e==="dark"?{main:Ye[200],light:Ye[50],dark:Ye[400]}:{main:Ye[700],light:Ye[400],dark:Ye[800]}}function Ps(e="light"){return e==="dark"?{main:Ke[200],light:Ke[50],dark:Ke[400]}:{main:Ke[500],light:Ke[300],dark:Ke[700]}}function Ns(e="light"){return e==="dark"?{main:Xe[500],light:Xe[300],dark:Xe[700]}:{main:Xe[700],light:Xe[400],dark:Xe[800]}}function _s(e="light"){return e==="dark"?{main:Je[400],light:Je[300],dark:Je[700]}:{main:Je[700],light:Je[500],dark:Je[900]}}function $s(e="light"){return e==="dark"?{main:Ze[400],light:Ze[300],dark:Ze[700]}:{main:Ze[800],light:Ze[500],dark:Ze[900]}}function Ms(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function Is(e){const{mode:n="light",contrastThreshold:t=3,tonalOffset:r=.2}=e,o=le(e,Cs),i=e.primary||Rs(n),a=e.secondary||Ps(n),c=e.error||Ns(n),l=e.info||_s(n),u=e.success||$s(n),d=e.warning||Ms(n);function p(b){const h=tr(b,Jn.text.primary)>=t?Jn.text.primary:or.text.primary;if(process.env.NODE_ENV!=="production"){const T=tr(b,h);T<3&&console.error([`MUI: The contrast ratio of ${T}:1 for ${h} on ${b}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const f=({color:b,name:h,mainShade:T=500,lightShade:F=300,darkShade:v=700})=>{if(b=S({},b),!b.main&&b[T]&&(b.main=b[T]),!b.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${T}\` property.`:tn(11,h?` (${h})`:"",T));if(typeof b.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:tn(12,h?` (${h})`:"",JSON.stringify(b.main)));return ir(b,"light",F,r),ir(b,"dark",v,r),b.contrastText||(b.contrastText=p(b.main)),b},y={dark:Jn,light:or};return process.env.NODE_ENV!=="production"&&(y[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),Te(S({common:S({},bn),mode:n,primary:f({color:i,name:"primary"}),secondary:f({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:c,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:l,name:"info"}),success:f({color:u,name:"success"}),grey:xs,contrastThreshold:t,getContrastText:p,augmentColor:f,tonalOffset:r},y[n]),o)}const As=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function js(e){return Math.round(e*1e5)/1e5}const sr={textTransform:"uppercase"},ar='"Roboto", "Helvetica", "Arial", sans-serif';function Ds(e,n){const t=typeof n=="function"?n(e):n,{fontFamily:r=ar,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:c=500,fontWeightBold:l=700,htmlFontSize:u=16,allVariants:d,pxToRem:p}=t,f=le(t,As);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const y=o/14,g=p||(T=>`${T/u*y}rem`),b=(T,F,v,E,m)=>S({fontFamily:r,fontWeight:T,fontSize:g(F),lineHeight:v},r===ar?{letterSpacing:`${js(E/F)}em`}:{},m,d),h={h1:b(i,96,1.167,-1.5),h2:b(i,60,1.2,-.5),h3:b(a,48,1.167,0),h4:b(a,34,1.235,.25),h5:b(a,24,1.334,0),h6:b(c,20,1.6,.15),subtitle1:b(a,16,1.75,.15),subtitle2:b(c,14,1.57,.1),body1:b(a,16,1.5,.15),body2:b(a,14,1.43,.15),button:b(c,14,1.75,.4,sr),caption:b(a,12,1.66,.4),overline:b(a,12,2.66,1,sr),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Te(S({htmlFontSize:u,pxToRem:g,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:c,fontWeightBold:l},h),f,{clone:!1})}const Bs=.2,Fs=.14,Ls=.12;function ae(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Bs})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Fs})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ls})`].join(",")}const Vs=["none",ae(0,2,1,-1,0,1,1,0,0,1,3,0),ae(0,3,1,-2,0,2,2,0,0,1,5,0),ae(0,3,3,-2,0,3,4,0,0,1,8,0),ae(0,2,4,-1,0,4,5,0,0,1,10,0),ae(0,3,5,-1,0,5,8,0,0,1,14,0),ae(0,3,5,-1,0,6,10,0,0,1,18,0),ae(0,4,5,-2,0,7,10,1,0,2,16,1),ae(0,5,5,-3,0,8,10,1,0,3,14,2),ae(0,5,6,-3,0,9,12,1,0,3,16,2),ae(0,6,6,-3,0,10,14,1,0,4,18,3),ae(0,6,7,-4,0,11,15,1,0,4,20,3),ae(0,7,8,-4,0,12,17,2,0,5,22,4),ae(0,7,8,-4,0,13,19,2,0,5,24,4),ae(0,7,9,-4,0,14,21,2,0,5,26,4),ae(0,8,9,-5,0,15,22,2,0,6,28,5),ae(0,8,10,-5,0,16,24,2,0,6,30,5),ae(0,8,11,-5,0,17,26,2,0,6,32,5),ae(0,9,11,-5,0,18,28,2,0,7,34,6),ae(0,9,12,-6,0,19,29,2,0,7,36,6),ae(0,10,13,-6,0,20,31,3,0,8,38,7),ae(0,10,13,-6,0,21,33,3,0,8,40,7),ae(0,10,14,-6,0,22,35,3,0,8,42,7),ae(0,11,14,-7,0,23,36,3,0,9,44,8),ae(0,11,15,-7,0,24,38,3,0,9,46,8)],zs=Vs,Us=["duration","easing","delay"],Hs={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},qs={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function cr(e){return`${Math.round(e)}ms`}function Ws(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Gs(e){const n=S({},Hs,e.easing),t=S({},qs,e.duration);return S({getAutoHeightDuration:Ws,create:(o=["all"],i={})=>{const{duration:a=t.standard,easing:c=n.easeInOut,delay:l=0}=i,u=le(i,Us);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",p=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(c)||console.error('MUI: Argument "easing" must be a string.'),!p(l)&&!d(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:cr(a)} ${c} ${typeof l=="string"?l:cr(l)}`).join(",")}},e,{easing:n,duration:t})}const Ks={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Xs=Ks,Ys=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Js(e={},...n){const{mixins:t={},palette:r={},transitions:o={},typography:i={}}=e,a=le(e,Ys);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":tn(18));const c=Is(r),l=yt(e);let u=Te(l,{mixins:gs(l.breakpoints,t),palette:c,shadows:zs.slice(),typography:Ds(c,i),transitions:Gs(o),zIndex:S({},Xs),applyDarkStyles(d){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:d}:this.palette.mode==="dark"?d:{}}});if(u=Te(u,a),u=n.reduce((d,p)=>Te(d,p),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(f,y)=>{let g;for(g in f){const b=f[g];if(d.indexOf(g)!==-1&&Object.keys(b).length>0){if(process.env.NODE_ENV!=="production"){const h=_e("",g);console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${g}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:b}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[g]={}}}};Object.keys(u.components).forEach(f=>{const y=u.components[f].styleOverrides;y&&f.indexOf("Mui")===0&&p(y,f)})}return u.unstable_sxConfig=S({},bt,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(p){return gt({sx:p,theme:this})},u}const Zs=Js(),xt=Zs,Et="$$material",Wr=e=>Tn(e)&&e!=="classes",Qs=us({themeId:Et,defaultTheme:xt,rootShouldForwardProp:Wr}),ke=Qs;function We({props:e,name:n}){return fs({props:e,name:n,defaultTheme:xt,themeId:Et})}const Gr=O.createContext({});process.env.NODE_ENV!=="production"&&(Gr.displayName="ListContext");const ea=Gr;function na(e){return _e("MuiList",e)}qe("MuiList",["root","padding","dense","subheader"]);const ta=["children","className","component","dense","disablePadding","subheader"],ra=e=>{const{classes:n,disablePadding:t,dense:r,subheader:o}=e;return He({root:["root",!t&&"padding",r&&"dense",o&&"subheader"]},na,n)},oa=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.disablePadding&&n.padding,t.dense&&n.dense,t.subheader&&n.subheader]}})(({ownerState:e})=>S({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Kr=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:c=!1,disablePadding:l=!1,subheader:u}=r,d=le(r,ta),p=O.useMemo(()=>({dense:c}),[c]),f=S({},r,{component:a,dense:c,disablePadding:l}),y=ra(f);return k.jsx(ea.Provider,{value:p,children:k.jsxs(oa,S({as:a,className:Pe(y.root,i),ref:t,ownerState:f},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Kr.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const ia=Kr,sa=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Zn(e,n,t){return e===n?e.firstChild:n&&n.nextElementSibling?n.nextElementSibling:t?null:e.firstChild}function lr(e,n,t){return e===n?t?e.firstChild:e.lastChild:n&&n.previousElementSibling?n.previousElementSibling:t?null:e.lastChild}function Xr(e,n){if(n===void 0)return!0;let t=e.innerText;return t===void 0&&(t=e.textContent),t=t.trim().toLowerCase(),t.length===0?!1:n.repeating?t[0]===n.keys[0]:t.indexOf(n.keys.join(""))===0}function cn(e,n,t,r,o,i){let a=!1,c=o(e,n,n?t:!1);for(;c;){if(c===e.firstChild){if(a)return!1;a=!0}const l=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Xr(c,i)||l)c=o(e,c,t);else return c.focus(),!0}return!1}const Yr=O.forwardRef(function(n,t){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:c,disabledItemsFocusable:l=!1,disableListWrap:u=!1,onKeyDown:d,variant:p="selectedMenu"}=n,f=le(n,sa),y=O.useRef(null),g=O.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Cn(()=>{o&&y.current.focus()},[o]),O.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(v,E)=>{const m=!y.current.style.width;if(v.clientHeight<y.current.clientHeight&&m){const I=`${Mr(ve(v))}px`;y.current.style[E.direction==="rtl"?"paddingLeft":"paddingRight"]=I,y.current.style.width=`calc(100% + ${I})`}return y.current}}),[]);const b=v=>{const E=y.current,m=v.key,I=ve(E).activeElement;if(m==="ArrowDown")v.preventDefault(),cn(E,I,u,l,Zn);else if(m==="ArrowUp")v.preventDefault(),cn(E,I,u,l,lr);else if(m==="Home")v.preventDefault(),cn(E,null,u,l,Zn);else if(m==="End")v.preventDefault(),cn(E,null,u,l,lr);else if(m.length===1){const _=g.current,K=m.toLowerCase(),Z=performance.now();_.keys.length>0&&(Z-_.lastTime>500?(_.keys=[],_.repeating=!0,_.previousKeyMatched=!0):_.repeating&&K!==_.keys[0]&&(_.repeating=!1)),_.lastTime=Z,_.keys.push(K);const P=I&&!_.repeating&&Xr(I,_);_.previousKeyMatched&&(P||cn(E,I,!1,l,Zn,_))?v.preventDefault():_.previousKeyMatched=!1}d&&d(v)},h=Ae(y,t);let T=-1;O.Children.forEach(a,(v,E)=>{if(!O.isValidElement(v)){T===E&&(T+=1,T>=a.length&&(T=-1));return}process.env.NODE_ENV!=="production"&&On.isFragment(v)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),v.props.disabled||(p==="selectedMenu"&&v.props.selected||T===-1)&&(T=E),T===E&&(v.props.disabled||v.props.muiSkipListHighlight||v.type.muiSkipListHighlight)&&(T+=1,T>=a.length&&(T=-1))});const F=O.Children.map(a,(v,E)=>{if(E===T){const m={};return i&&(m.autoFocus=!0),v.props.tabIndex===void 0&&p==="selectedMenu"&&(m.tabIndex=0),O.cloneElement(v,m)}return v});return k.jsx(ia,S({role:"menu",ref:h,className:c,onKeyDown:b,tabIndex:o?0:-1},f,{children:F}))});process.env.NODE_ENV!=="production"&&(Yr.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const aa=Yr,ca=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function la(e){const n=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(n)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:n}function ua(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const n=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let t=n(`[name="${e.name}"]:checked`);return t||(t=n(`[name="${e.name}"]`)),t!==e}function da(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||ua(e))}function fa(e){const n=[],t=[];return Array.from(e.querySelectorAll(ca)).forEach((r,o)=>{const i=la(r);i===-1||!da(r)||(i===0?n.push(r):t.push({documentOrder:o,tabIndex:i,node:r}))}),t.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(n)}function pa(){return!0}function _n(e){const{children:n,disableAutoFocus:t=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=fa,isEnabled:a=pa,open:c}=e,l=O.useRef(!1),u=O.useRef(null),d=O.useRef(null),p=O.useRef(null),f=O.useRef(null),y=O.useRef(!1),g=O.useRef(null),b=Ae(n.ref,g),h=O.useRef(null);O.useEffect(()=>{!c||!g.current||(y.current=!t)},[t,c]),O.useEffect(()=>{if(!c||!g.current)return;const v=ve(g.current);return g.current.contains(v.activeElement)||(g.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),g.current.setAttribute("tabIndex","-1")),y.current&&g.current.focus()),()=>{o||(p.current&&p.current.focus&&(l.current=!0,p.current.focus()),p.current=null)}},[c]),O.useEffect(()=>{if(!c||!g.current)return;const v=ve(g.current),E=_=>{h.current=_,!(r||!a()||_.key!=="Tab")&&v.activeElement===g.current&&_.shiftKey&&(l.current=!0,d.current&&d.current.focus())},m=()=>{const _=g.current;if(_===null)return;if(!v.hasFocus()||!a()||l.current){l.current=!1;return}if(_.contains(v.activeElement)||r&&v.activeElement!==u.current&&v.activeElement!==d.current)return;if(v.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!y.current)return;let K=[];if((v.activeElement===u.current||v.activeElement===d.current)&&(K=i(g.current)),K.length>0){var Z,P;const G=!!((Z=h.current)!=null&&Z.shiftKey&&((P=h.current)==null?void 0:P.key)==="Tab"),q=K[0],ee=K[K.length-1];typeof q!="string"&&typeof ee!="string"&&(G?ee.focus():q.focus())}else _.focus()};v.addEventListener("focusin",m),v.addEventListener("keydown",E,!0);const I=setInterval(()=>{v.activeElement&&v.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(I),v.removeEventListener("focusin",m),v.removeEventListener("keydown",E,!0)}},[t,r,o,a,c,i]);const T=v=>{p.current===null&&(p.current=v.relatedTarget),y.current=!0,f.current=v.target;const E=n.props.onFocus;E&&E(v)},F=v=>{p.current===null&&(p.current=v.relatedTarget),y.current=!0};return k.jsxs(O.Fragment,{children:[k.jsx("div",{tabIndex:c?0:-1,onFocus:F,ref:u,"data-testid":"sentinelStart"}),O.cloneElement(n,{ref:b,onFocus:T}),k.jsx("div",{tabIndex:c?0:-1,onFocus:F,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:In,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=_r(_n.propTypes));function ha(e){return typeof e=="function"?e():e}const $n=O.forwardRef(function(n,t){const{children:r,container:o,disablePortal:i=!1}=n,[a,c]=O.useState(null),l=Ae(O.isValidElement(r)?r.ref:null,t);if(Cn(()=>{i||c(ha(o)||document.body)},[o,i]),Cn(()=>{if(a&&!i)return at(t,a),()=>{at(t,null)}},[t,a,i]),i){if(O.isValidElement(r)){const u={ref:l};return O.cloneElement(r,u)}return k.jsx(O.Fragment,{children:r})}return k.jsx(O.Fragment,{children:a&&mo.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&($n.propTypes={children:s.node,container:s.oneOfType([hn,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&($n["propTypes"]=_r($n.propTypes));function ma(e){const n=ve(e);return n.body===e?mn(e).innerWidth>n.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function pn(e,n){n?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ur(e){return parseInt(mn(e).getComputedStyle(e).paddingRight,10)||0}function ba(e){const t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return t||r}function dr(e,n,t,r,o){const i=[n,t,...r];[].forEach.call(e.children,a=>{const c=i.indexOf(a)===-1,l=!ba(a);c&&l&&pn(a,o)})}function Qn(e,n){let t=-1;return e.some((r,o)=>n(r)?(t=o,!0):!1),t}function ga(e,n){const t=[],r=e.container;if(!n.disableScrollLock){if(ma(r)){const a=Mr(ve(r));t.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ur(r)+a}px`;const c=ve(r).querySelectorAll(".mui-fixed");[].forEach.call(c,l=>{t.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${ur(l)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ve(r).body;else{const a=r.parentElement,c=mn(r);i=(a==null?void 0:a.nodeName)==="HTML"&&c.getComputedStyle(a).overflowY==="scroll"?a:r}t.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{t.forEach(({value:i,el:a,property:c})=>{i?a.style.setProperty(c,i):a.style.removeProperty(c)})}}function ya(e){const n=[];return[].forEach.call(e.children,t=>{t.getAttribute("aria-hidden")==="true"&&n.push(t)}),n}class va{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(n,t){let r=this.modals.indexOf(n);if(r!==-1)return r;r=this.modals.length,this.modals.push(n),n.modalRef&&pn(n.modalRef,!1);const o=ya(t);dr(t,n.mount,n.modalRef,o,!0);const i=Qn(this.containers,a=>a.container===t);return i!==-1?(this.containers[i].modals.push(n),r):(this.containers.push({modals:[n],container:t,restore:null,hiddenSiblings:o}),r)}mount(n,t){const r=Qn(this.containers,i=>i.modals.indexOf(n)!==-1),o=this.containers[r];o.restore||(o.restore=ga(o,t))}remove(n,t=!0){const r=this.modals.indexOf(n);if(r===-1)return r;const o=Qn(this.containers,a=>a.modals.indexOf(n)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(n),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),n.modalRef&&pn(n.modalRef,t),dr(i.container,n.mount,n.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&pn(a.modalRef,!1)}return r}isTopModal(n){return this.modals.length>0&&this.modals[this.modals.length-1]===n}}function xa(e){return typeof e=="function"?e():e}function Ea(e){return e?e.props.hasOwnProperty("in"):!1}const Ta=new va;function ka(e){const{container:n,disableEscapeKeyDown:t=!1,disableScrollLock:r=!1,manager:o=Ta,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:c,children:l,onClose:u,open:d,rootRef:p}=e,f=O.useRef({}),y=O.useRef(null),g=O.useRef(null),b=Ae(g,p),[h,T]=O.useState(!d),F=Ea(l);let v=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(v=!1);const E=()=>ve(y.current),m=()=>(f.current.modalRef=g.current,f.current.mount=y.current,f.current),I=()=>{o.mount(m(),{disableScrollLock:r}),g.current&&(g.current.scrollTop=0)},_=Wt(()=>{const $=xa(n)||E().body;o.add(m(),$),g.current&&I()}),K=O.useCallback(()=>o.isTopModal(m()),[o]),Z=Wt($=>{y.current=$,$&&(d&&K()?I():g.current&&pn(g.current,v))}),P=O.useCallback(()=>{o.remove(m(),v)},[v,o]);O.useEffect(()=>()=>{P()},[P]),O.useEffect(()=>{d?_():(!F||!i)&&P()},[d,P,F,i,_]);const G=$=>D=>{var ie;(ie=$.onKeyDown)==null||ie.call($,D),!(D.key!=="Escape"||D.which===229||!K())&&(t||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},q=$=>D=>{var ie;(ie=$.onClick)==null||ie.call($,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:($={})=>{const D=Fr(e);delete D.onTransitionEnter,delete D.onTransitionExited;const ie=S({},D,$);return S({role:"presentation"},ie,{onKeyDown:G(ie),ref:b})},getBackdropProps:($={})=>{const D=$;return S({"aria-hidden":!0},D,{onClick:q(D),open:d})},getTransitionProps:()=>{const $=()=>{T(!1),a&&a()},D=()=>{T(!0),c&&c(),i&&P()};return{onEnter:qt($,l==null?void 0:l.props.onEnter),onExited:qt(D,l==null?void 0:l.props.onExited)}},rootRef:b,portalRef:Z,isTopModal:K,exited:h,hasTransition:F}}function lt(e,n){return lt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},lt(e,n)}function Sa(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,lt(e,n)}const fr={disabled:!1};var wa=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const Jr=se.createContext(null);var Oa=function(n){return n.scrollTop},dn="unmounted",Be="exited",Fe="entering",en="entered",ut="exiting",$e=function(e){Sa(n,e);function n(r,o){var i;i=e.call(this,r,o)||this;var a=o,c=a&&!a.isMounting?r.enter:r.appear,l;return i.appearStatus=null,r.in?c?(l=Be,i.appearStatus=Fe):l=en:r.unmountOnExit||r.mountOnEnter?l=dn:l=Be,i.state={status:l},i.nextCallback=null,i}n.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===dn?{status:Be}:null};var t=n.prototype;return t.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},t.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==Fe&&a!==en&&(i=Fe):(a===Fe||a===en)&&(i=ut)}this.updateStatus(!1,i)},t.componentWillUnmount=function(){this.cancelNextCallback()},t.getTimeouts=function(){var o=this.props.timeout,i,a,c;return i=a=c=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,c=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:c}},t.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===Fe){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);a&&Oa(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Be&&this.setState({status:dn})},t.performEnter=function(o){var i=this,a=this.props.enter,c=this.context?this.context.isMounting:o,l=this.props.nodeRef?[c]:[un.findDOMNode(this),c],u=l[0],d=l[1],p=this.getTimeouts(),f=c?p.appear:p.enter;if(!o&&!a||fr.disabled){this.safeSetState({status:en},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:Fe},function(){i.props.onEntering(u,d),i.onTransitionEnd(f,function(){i.safeSetState({status:en},function(){i.props.onEntered(u,d)})})})},t.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),c=this.props.nodeRef?void 0:un.findDOMNode(this);if(!i||fr.disabled){this.safeSetState({status:Be},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:ut},function(){o.props.onExiting(c),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:Be},function(){o.props.onExited(c)})})})},t.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},t.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},t.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(c){a&&(a=!1,i.nextCallback=null,o(c))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},t.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!a||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=l[0],d=l[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},t.render=function(){var o=this.state.status;if(o===dn)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var c=le(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return se.createElement(Jr.Provider,{value:null},typeof a=="function"?a(o,c):se.cloneElement(se.Children.only(a),c))},n}(se.Component);$e.contextType=Jr;$e.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,n,t,r,o,i){var a=e[n];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,n,t,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(n){var t=wa;n.addEndListener||(t=t.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return t.apply(void 0,[n].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Qe(){}$e.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Qe,onEntering:Qe,onEntered:Qe,onExit:Qe,onExiting:Qe,onExited:Qe};$e.UNMOUNTED=dn;$e.EXITED=Be;$e.ENTERING=Fe;$e.ENTERED=en;$e.EXITING=ut;const Zr=$e;function Hn(){const e=Hr(xt);return process.env.NODE_ENV!=="production"&&O.useDebugValue(e),e[Et]||e}const Qr=e=>e.scrollTop;function Mn(e,n){var t,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(t=a.transitionDuration)!=null?t:typeof o=="number"?o:o[n.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[n.mode]:i,delay:a.transitionDelay}}const Ca=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function dt(e){return`scale(${e}, ${e**2})`}const Ra={entering:{opacity:1,transform:dt(1)},entered:{opacity:1,transform:"none"}},et=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Tt=O.forwardRef(function(n,t){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:c,onEnter:l,onEntered:u,onEntering:d,onExit:p,onExited:f,onExiting:y,style:g,timeout:b="auto",TransitionComponent:h=Zr}=n,T=le(n,Ca),F=O.useRef(),v=O.useRef(),E=Hn(),m=O.useRef(null),I=Ae(m,i.ref,t),_=N=>$=>{if(N){const D=m.current;$===void 0?N(D):N(D,$)}},K=_(d),Z=_((N,$)=>{Qr(N);const{duration:D,delay:ie,easing:Q}=Mn({style:g,timeout:b,easing:a},{mode:"enter"});let x;b==="auto"?(x=E.transitions.getAutoHeightDuration(N.clientHeight),v.current=x):x=D,N.style.transition=[E.transitions.create("opacity",{duration:x,delay:ie}),E.transitions.create("transform",{duration:et?x:x*.666,delay:ie,easing:Q})].join(","),l&&l(N,$)}),P=_(u),G=_(y),q=_(N=>{const{duration:$,delay:D,easing:ie}=Mn({style:g,timeout:b,easing:a},{mode:"exit"});let Q;b==="auto"?(Q=E.transitions.getAutoHeightDuration(N.clientHeight),v.current=Q):Q=$,N.style.transition=[E.transitions.create("opacity",{duration:Q,delay:D}),E.transitions.create("transform",{duration:et?Q:Q*.666,delay:et?D:D||Q*.333,easing:ie})].join(","),N.style.opacity=0,N.style.transform=dt(.75),p&&p(N)}),ee=_(f),M=N=>{b==="auto"&&(F.current=setTimeout(N,v.current||0)),r&&r(m.current,N)};return O.useEffect(()=>()=>{clearTimeout(F.current)},[]),k.jsx(h,S({appear:o,in:c,nodeRef:m,onEnter:Z,onEntered:P,onEntering:K,onExit:q,onExited:ee,onExiting:G,addEndListener:M,timeout:b==="auto"?null:b},T,{children:(N,$)=>O.cloneElement(i,S({style:S({opacity:0,transform:dt(.75),visibility:N==="exited"&&!c?"hidden":void 0},Ra[N],g,i.props.style),ref:I},$))}))});process.env.NODE_ENV!=="production"&&(Tt.propTypes={addEndListener:s.func,appear:s.bool,children:In.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Tt.muiSupportAuto=!0;const Pa=Tt,Na=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],_a={entering:{opacity:1},entered:{opacity:1}},eo=O.forwardRef(function(n,t){const r=Hn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:c,easing:l,in:u,onEnter:d,onEntered:p,onEntering:f,onExit:y,onExited:g,onExiting:b,style:h,timeout:T=o,TransitionComponent:F=Zr}=n,v=le(n,Na),E=O.useRef(null),m=Ae(E,c.ref,t),I=M=>N=>{if(M){const $=E.current;N===void 0?M($):M($,N)}},_=I(f),K=I((M,N)=>{Qr(M);const $=Mn({style:h,timeout:T,easing:l},{mode:"enter"});M.style.webkitTransition=r.transitions.create("opacity",$),M.style.transition=r.transitions.create("opacity",$),d&&d(M,N)}),Z=I(p),P=I(b),G=I(M=>{const N=Mn({style:h,timeout:T,easing:l},{mode:"exit"});M.style.webkitTransition=r.transitions.create("opacity",N),M.style.transition=r.transitions.create("opacity",N),y&&y(M)}),q=I(g),ee=M=>{i&&i(E.current,M)};return k.jsx(F,S({appear:a,in:u,nodeRef:E,onEnter:K,onEntered:Z,onEntering:_,onExit:G,onExited:q,onExiting:P,addEndListener:ee,timeout:T},v,{children:(M,N)=>O.cloneElement(c,S({style:S({opacity:0,visibility:M==="exited"&&!u?"hidden":void 0},_a[M],h,c.props.style),ref:m},N))}))});process.env.NODE_ENV!=="production"&&(eo.propTypes={addEndListener:s.func,appear:s.bool,children:In.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const $a=eo;function Ma(e){return _e("MuiBackdrop",e)}qe("MuiBackdrop",["root","invisible"]);const Ia=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Aa=e=>{const{classes:n,invisible:t}=e;return He({root:["root",t&&"invisible"]},Ma,n)},ja=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.invisible&&n.invisible]}})(({ownerState:e})=>S({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),no=O.forwardRef(function(n,t){var r,o,i;const a=We({props:n,name:"MuiBackdrop"}),{children:c,className:l,component:u="div",components:d={},componentsProps:p={},invisible:f=!1,open:y,slotProps:g={},slots:b={},TransitionComponent:h=$a,transitionDuration:T}=a,F=le(a,Ia),v=S({},a,{component:u,invisible:f}),E=Aa(v),m=(r=g.root)!=null?r:p.root;return k.jsx(h,S({in:y,timeout:T},F,{children:k.jsx(ja,S({"aria-hidden":!0},m,{as:(o=(i=b.root)!=null?i:d.Root)!=null?o:u,className:Pe(E.root,l,m==null?void 0:m.className),ownerState:S({},v,m==null?void 0:m.ownerState),classes:E,ref:t,children:c}))}))});process.env.NODE_ENV!=="production"&&(no.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Da=no;function Ba(e){return _e("MuiModal",e)}qe("MuiModal",["root","hidden","backdrop"]);const Fa=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],La=e=>{const{open:n,exited:t,classes:r}=e;return He({root:["root",!n&&t&&"hidden"],backdrop:["backdrop"]},Ba,r)},Va=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.open&&t.exited&&n.hidden]}})(({theme:e,ownerState:n})=>S({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!n.open&&n.exited&&{visibility:"hidden"})),za=ke(Da,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,n)=>n.backdrop})({zIndex:-1}),to=O.forwardRef(function(n,t){var r,o,i,a,c,l;const u=We({name:"MuiModal",props:n}),{BackdropComponent:d=za,BackdropProps:p,className:f,closeAfterTransition:y=!1,children:g,container:b,component:h,components:T={},componentsProps:F={},disableAutoFocus:v=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:m=!1,disablePortal:I=!1,disableRestoreFocus:_=!1,disableScrollLock:K=!1,hideBackdrop:Z=!1,keepMounted:P=!1,onBackdropClick:G,open:q,slotProps:ee,slots:M}=u,N=le(u,Fa),$=S({},u,{closeAfterTransition:y,disableAutoFocus:v,disableEnforceFocus:E,disableEscapeKeyDown:m,disablePortal:I,disableRestoreFocus:_,disableScrollLock:K,hideBackdrop:Z,keepMounted:P}),{getRootProps:D,getBackdropProps:ie,getTransitionProps:Q,portalRef:x,isTopModal:R,exited:A,hasTransition:z}=ka(S({},$,{rootRef:t})),j=S({},$,{exited:A}),V=La(j),B={};if(g.props.tabIndex===void 0&&(B.tabIndex="-1"),z){const{onEnter:H,onExited:w}=Q();B.onEnter=H,B.onExited=w}const L=(r=(o=M==null?void 0:M.root)!=null?o:T.Root)!=null?r:Va,W=(i=(a=M==null?void 0:M.backdrop)!=null?a:T.Backdrop)!=null?i:d,X=(c=ee==null?void 0:ee.root)!=null?c:F.root,U=(l=ee==null?void 0:ee.backdrop)!=null?l:F.backdrop,pe=rn({elementType:L,externalSlotProps:X,externalForwardedProps:N,getSlotProps:D,additionalProps:{ref:t,as:h},ownerState:j,className:Pe(f,X==null?void 0:X.className,V==null?void 0:V.root,!j.open&&j.exited&&(V==null?void 0:V.hidden))}),C=rn({elementType:W,externalSlotProps:U,additionalProps:p,getSlotProps:H=>ie(S({},H,{onClick:w=>{G&&G(w),H!=null&&H.onClick&&H.onClick(w)}})),className:Pe(U==null?void 0:U.className,p==null?void 0:p.className,V==null?void 0:V.backdrop),ownerState:j});return!P&&!q&&(!z||A)?null:k.jsx($n,{ref:x,container:b,disablePortal:I,children:k.jsxs(L,S({},pe,{children:[!Z&&d?k.jsx(W,S({},C)):null,k.jsx(_n,{disableEnforceFocus:E,disableAutoFocus:v,disableRestoreFocus:_,isEnabled:R,open:q,children:O.cloneElement(g,B)})]}))})});process.env.NODE_ENV!=="production"&&(to.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:In.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([hn,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Ua=to,Ha=e=>{let n;return e<1?n=5.11916*e**2:n=4.5*Math.log(e+1)+2,(n/100).toFixed(2)},pr=Ha;function qa(e){return _e("MuiPaper",e)}qe("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Wa=["className","component","elevation","square","variant"],Ga=e=>{const{square:n,elevation:t,variant:r,classes:o}=e,i={root:["root",r,!n&&"rounded",r==="elevation"&&`elevation${t}`]};return He(i,qa,o)},Ka=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,n[t.variant],!t.square&&n.rounded,t.variant==="elevation"&&n[`elevation${t.elevation}`]]}})(({theme:e,ownerState:n})=>{var t;return S({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!n.square&&{borderRadius:e.shape.borderRadius},n.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},n.variant==="elevation"&&S({boxShadow:(e.vars||e).shadows[n.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${rr("#fff",pr(n.elevation))}, ${rr("#fff",pr(n.elevation))})`},e.vars&&{backgroundImage:(t=e.vars.overlays)==null?void 0:t[n.elevation]}))}),ro=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:c=!1,variant:l="elevation"}=r,u=le(r,Wa),d=S({},r,{component:i,elevation:a,square:c,variant:l}),p=Ga(d);return process.env.NODE_ENV!=="production"&&Hn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),k.jsx(Ka,S({as:i,ownerState:d,className:Pe(p.root,o),ref:t},u))});process.env.NODE_ENV!=="production"&&(ro.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:yn(jr,e=>{const{elevation:n,variant:t}=e;return n>0&&t==="outlined"?new Error(`MUI: Combining \`elevation={${n}}\` with \`variant="${t}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const Xa=ro;function Ya(e){return _e("MuiPopover",e)}qe("MuiPopover",["root","paper"]);const Ja=["onEntering"],Za=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Qa=["slotProps"];function hr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.height/2:n==="bottom"&&(t=e.height),t}function mr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.width/2:n==="right"&&(t=e.width),t}function br(e){return[e.horizontal,e.vertical].map(n=>typeof n=="number"?`${n}px`:n).join(" ")}function Sn(e){return typeof e=="function"?e():e}const ec=e=>{const{classes:n}=e;return He({root:["root"],paper:["paper"]},Ya,n)},nc=ke(Ua,{name:"MuiPopover",slot:"Root",overridesResolver:(e,n)=>n.root})({}),oo=ke(Xa,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,n)=>n.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),io=O.forwardRef(function(n,t){var r,o,i;const a=We({props:n,name:"MuiPopover"}),{action:c,anchorEl:l,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:p="anchorEl",children:f,className:y,container:g,elevation:b=8,marginThreshold:h=16,open:T,PaperProps:F={},slots:v,slotProps:E,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:I=Pa,transitionDuration:_="auto",TransitionProps:{onEntering:K}={},disableScrollLock:Z=!1}=a,P=le(a.TransitionProps,Ja),G=le(a,Za),q=(r=E==null?void 0:E.paper)!=null?r:F,ee=O.useRef(),M=Ae(ee,q.ref),N=S({},a,{anchorOrigin:u,anchorReference:p,elevation:b,marginThreshold:h,externalPaperSlotProps:q,transformOrigin:m,TransitionComponent:I,transitionDuration:_,TransitionProps:P}),$=ec(N),D=O.useCallback(()=>{if(p==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const H=Sn(l),w=H&&H.nodeType===1?H:ve(ee.current).body,he=w.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const be=w.getBoundingClientRect();process.env.NODE_ENV!=="test"&&be.top===0&&be.left===0&&be.right===0&&be.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:he.top+hr(he,u.vertical),left:he.left+mr(he,u.horizontal)}},[l,u.horizontal,u.vertical,d,p]),ie=O.useCallback(H=>({vertical:hr(H,m.vertical),horizontal:mr(H,m.horizontal)}),[m.horizontal,m.vertical]),Q=O.useCallback(H=>{const w={width:H.offsetWidth,height:H.offsetHeight},he=ie(w);if(p==="none")return{top:null,left:null,transformOrigin:br(he)};const be=D();let Oe=be.top-he.vertical,Ge=be.left-he.horizontal;const Ct=Oe+w.height,Rt=Ge+w.width,Pt=mn(Sn(l)),sn=Pt.innerHeight-h,Nt=Pt.innerWidth-h;if(h!==null&&Oe<h){const Ee=Oe-h;Oe-=Ee,he.vertical+=Ee}else if(h!==null&&Ct>sn){const Ee=Ct-sn;Oe-=Ee,he.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&w.height>sn&&w.height&&sn&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${w.height-sn}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&Ge<h){const Ee=Ge-h;Ge-=Ee,he.horizontal+=Ee}else if(Rt>Nt){const Ee=Rt-Nt;Ge-=Ee,he.horizontal+=Ee}return{top:`${Math.round(Oe)}px`,left:`${Math.round(Ge)}px`,transformOrigin:br(he)}},[l,p,D,ie,h]),[x,R]=O.useState(T),A=O.useCallback(()=>{const H=ee.current;if(!H)return;const w=Q(H);w.top!==null&&(H.style.top=w.top),w.left!==null&&(H.style.left=w.left),H.style.transformOrigin=w.transformOrigin,R(!0)},[Q]);O.useEffect(()=>(Z&&window.addEventListener("scroll",A),()=>window.removeEventListener("scroll",A)),[l,Z,A]);const z=(H,w)=>{K&&K(H,w),A()},j=()=>{R(!1)};O.useEffect(()=>{T&&A()}),O.useImperativeHandle(c,()=>T?{updatePosition:()=>{A()}}:null,[T,A]),O.useEffect(()=>{if(!T)return;const H=Vo(()=>{A()}),w=mn(l);return w.addEventListener("resize",H),()=>{H.clear(),w.removeEventListener("resize",H)}},[l,T,A]);let V=_;_==="auto"&&!I.muiSupportAuto&&(V=void 0);const B=g||(l?ve(Sn(l)).body:void 0),L=(o=v==null?void 0:v.root)!=null?o:nc,W=(i=v==null?void 0:v.paper)!=null?i:oo,X=rn({elementType:W,externalSlotProps:S({},q,{style:x?q.style:S({},q.style,{opacity:0})}),additionalProps:{elevation:b,ref:M},ownerState:N,className:Pe($.paper,q==null?void 0:q.className)}),U=rn({elementType:L,externalSlotProps:(E==null?void 0:E.root)||{},externalForwardedProps:G,additionalProps:{ref:t,slotProps:{backdrop:{invisible:!0}},container:B,open:T},ownerState:N,className:Pe($.root,y)}),{slotProps:pe}=U,C=le(U,Qa);return k.jsx(L,S({},C,!Br(L)&&{slotProps:pe,disableScrollLock:Z},{children:k.jsx(I,S({appear:!0,in:T,onEntering:z,onExited:j,timeout:V},P,{children:k.jsx(W,S({},X,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(io.propTypes={action:Lo,anchorEl:yn(s.oneOfType([hn,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const n=Sn(e.anchorEl);if(n&&n.nodeType===1){const t=n.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&t.top===0&&t.left===0&&t.right===0&&t.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${n}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([hn,s.func]),disableScrollLock:s.bool,elevation:jr,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:Io}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const tc=io;function rc(e){return _e("MuiMenu",e)}qe("MuiMenu",["root","paper","list"]);const oc=["onEntering"],ic=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],sc={vertical:"top",horizontal:"right"},ac={vertical:"top",horizontal:"left"},cc=e=>{const{classes:n}=e;return He({root:["root"],paper:["paper"],list:["list"]},rc,n)},lc=ke(tc,{shouldForwardProp:e=>Wr(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,n)=>n.root})({}),uc=ke(oo,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,n)=>n.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),dc=ke(aa,{name:"MuiMenu",slot:"List",overridesResolver:(e,n)=>n.list})({outline:0}),so=O.forwardRef(function(n,t){var r,o;const i=We({props:n,name:"MuiMenu"}),{autoFocus:a=!0,children:c,className:l,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:p,open:f,PaperProps:y={},PopoverClasses:g,transitionDuration:b="auto",TransitionProps:{onEntering:h}={},variant:T="selectedMenu",slots:F={},slotProps:v={}}=i,E=le(i.TransitionProps,oc),m=le(i,ic),I=Hn(),_=I.direction==="rtl",K=S({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:y,transitionDuration:b,TransitionProps:E,variant:T}),Z=cc(K),P=a&&!u&&f,G=O.useRef(null),q=(Q,x)=>{G.current&&G.current.adjustStyleForScrollbar(Q,I),h&&h(Q,x)},ee=Q=>{Q.key==="Tab"&&(Q.preventDefault(),p&&p(Q,"tabKeyDown"))};let M=-1;O.Children.map(c,(Q,x)=>{O.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&On.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(T==="selectedMenu"&&Q.props.selected||M===-1)&&(M=x))});const N=(r=F.paper)!=null?r:uc,$=(o=v.paper)!=null?o:y,D=rn({elementType:F.root,externalSlotProps:v.root,ownerState:K,className:[Z.root,l]}),ie=rn({elementType:N,externalSlotProps:$,ownerState:K,className:Z.paper});return k.jsx(lc,S({onClose:p,anchorOrigin:{vertical:"bottom",horizontal:_?"right":"left"},transformOrigin:_?sc:ac,slots:{paper:N,root:F.root},slotProps:{root:D,paper:ie},open:f,ref:t,transitionDuration:b,TransitionProps:S({onEntering:q},E),ownerState:K},m,{classes:g,children:k.jsx(dc,S({onKeyDown:ee,actions:G,autoFocus:a&&(M===-1||u),autoFocusItem:P,variant:T},d,{className:Pe(Z.list,d.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(so.propTypes={anchorEl:s.oneOfType([hn,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const fc=so;function pc(e){const{className:n,commandHandler:t,items:r,children:o}=e,[i,a]=se.useState(void 0),c=u=>{u.preventDefault(),a(i===void 0?{mouseX:u.clientX+2,mouseY:u.clientY-6}:void 0)},l=()=>{a(void 0)};return((r==null?void 0:r.length)??0)===0||!o?o:k.jsxs("div",{className:`papi-context-menu-target ${n??""}`,onContextMenu:c,style:{cursor:"context-menu"},children:[o,k.jsx(fc,{className:`papi-context-menu ${n??""}`,open:i!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:i!==void 0?{top:i.mouseY,left:i.mouseX}:void 0,children:k.jsx(ft,{items:r,commandHandler:t,onClick:l})})]})}var hc=Object.defineProperty,mc=(e,n,t)=>n in e?hc(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,J=(e,n,t)=>(mc(e,typeof n!="symbol"?n+"":n,t),t);const Ue=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],kt=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ao=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],gr=wc();function on(e,n=!0){return n&&(e=e.toUpperCase()),e in gr?gr[e]:0}function St(e){return on(e)>0}function bc(e){const n=typeof e=="string"?on(e):e;return n>=40&&n<=66}function gc(e){return(typeof e=="string"?on(e):e)<=39}function co(e){return e<=66}function yc(e){const n=typeof e=="string"?on(e):e;return fo(n)&&!co(n)}function*vc(){for(let e=1;e<=Ue.length;e++)yield e}const xc=1,lo=Ue.length;function Ec(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wt(e,n="***"){const t=e-1;return t<0||t>=Ue.length?n:Ue[t]}function uo(e){return e<=0||e>lo?"******":ao[e-1]}function Tc(e){return uo(on(e))}function fo(e){const n=typeof e=="number"?wt(e):e;return St(n)&&!kt.includes(n)}function kc(e){const n=typeof e=="number"?wt(e):e;return St(n)&&kt.includes(n)}function Sc(e){return ao[e-1].includes("*obsolete*")}function wc(){const e={};for(let n=0;n<Ue.length;n++)e[Ue[n]]=n+1;return e}const Re={allBookIds:Ue,nonCanonicalIds:kt,bookIdToNumber:on,isBookIdValid:St,isBookNT:bc,isBookOT:gc,isBookOTNT:co,isBookDC:yc,allBookNumbers:vc,firstBook:xc,lastBook:lo,extraBooks:Ec,bookNumberToId:wt,bookNumberToEnglishName:uo,bookIdToEnglishName:Tc,isCanonical:fo,isExtraMaterial:kc,isObsolete:Sc};var Me=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Me||{});const Le=class{constructor(e){if(J(this,"name"),J(this,"fullPath"),J(this,"isPresent"),J(this,"hasVerseSegments"),J(this,"isCustomized"),J(this,"baseVersification"),J(this,"scriptureBooks"),J(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ye=Le;J(ye,"Original",new Le(Me.Original)),J(ye,"Septuagint",new Le(Me.Septuagint)),J(ye,"Vulgate",new Le(Me.Vulgate)),J(ye,"English",new Le(Me.English)),J(ye,"RussianProtestant",new Le(Me.RussianProtestant)),J(ye,"RussianOrthodox",new Le(Me.RussianOrthodox));function yr(e,n){const t=n[0];for(let r=1;r<n.length;r++)e=e.split(n[r]).join(t);return e.split(t)}var po=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(po||{});const Y=class{constructor(e,n,t,r){if(J(this,"firstChapter"),J(this,"lastChapter"),J(this,"lastVerse"),J(this,"hasSegmentsDefined"),J(this,"text"),J(this,"BBBCCCVVVS"),J(this,"longHashCode"),J(this,"versification"),J(this,"rtlMark","‏"),J(this,"_bookNum",0),J(this,"_chapterNum",0),J(this,"_verseNum",0),J(this,"_verse"),t==null&&r==null)if(e!=null&&typeof e=="string"){const o=e,i=n!=null&&n instanceof ye?n:void 0;this.setEmpty(i),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=n!=null&&n instanceof ye?n:void 0;this.setEmpty(o),this._verseNum=e%Y.chapterDigitShifter,this._chapterNum=Math.floor(e%Y.bookDigitShifter/Y.chapterDigitShifter),this._bookNum=Math.floor(e/Y.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Y){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof ye?e:Y.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&t!=null)if(typeof e=="string"&&typeof n=="string"&&typeof t=="string")this.setEmpty(r),this.updateInternal(e,n,t);else if(typeof e=="number"&&typeof n=="number"&&typeof t=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=t,this.versification=r??Y.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,n=Y.defaultVersification){const t=new Y(n);return t.parse(e),t}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=Y.parse(e),{success:!0,verseRef:n}}catch(t){if(t instanceof ln)return n=new Y,{success:!1,verseRef:n};throw t}}static getBBBCCCVVV(e,n,t){return e%Y.bcvMaxValue*Y.bookDigitShifter+(n>=0?n%Y.bcvMaxValue*Y.chapterDigitShifter:0)+(t>=0?t%Y.bcvMaxValue:0)}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let t;for(let r=0;r<e.length;r++){if(t=e[r],t<"0"||t>"9")return r===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +t-+"0",n>Y.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Y.verseRangeSeparator)||this._verse.includes(Y.verseSequenceIndicator))}get book(){return Re.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Re.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:t}=Y.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=Y.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Re.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new ye(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Y.verseRangeSeparators,Y.verseSequenceIndicators)}get BBBCCC(){return Y.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Y.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const i=+o[1].trim();this.versification=new ye(Me[i])}catch{throw new ln("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+e);const t=n[1].split(":"),r=+t[0];if(t.length!==2||Re.bookIdToNumber(n[0])===0||!Number.isInteger(r)||r<0||!Y.isVerseParseable(t[1]))throw new ln("Invalid reference : "+e);this.updateInternal(n[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new Y(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,n=Y.verseRangeSeparators,t=Y.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const r=[],o=yr(this._verse,t);for(const i of o.map(a=>yr(a,n))){const a=this.clone();a.verse=i[0];const c=a.verseNum;if(r.push(a),i.length>1){const l=this.clone();if(l.verse=i[1],!e)for(let u=c+1;u<l.verseNum;u++){const d=new Y(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||r.push(d)}r.push(l)}}return r}validateVerse(e,n){if(!this.verse)return this.internalValid;let t=0;for(const r of this.allVerses(!0,e,n)){const o=r.internalValid;if(o!==0)return o;const i=r.BBBCCCVVV;if(t>i)return 3;if(t===i)return 4;t=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Re.lastBook?2:0}setEmpty(e=Y.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,t){this.bookNum=Re.bookIdToNumber(e),this.chapter=n,this.verse=t}};let Ce=Y;J(Ce,"defaultVersification",ye.English),J(Ce,"verseRangeSeparator","-"),J(Ce,"verseSequenceIndicator",","),J(Ce,"verseRangeSeparators",[Y.verseRangeSeparator]),J(Ce,"verseSequenceIndicators",[Y.verseSequenceIndicator]),J(Ce,"chapterDigitShifter",1e3),J(Ce,"bookDigitShifter",Y.chapterDigitShifter*Y.chapterDigitShifter),J(Ce,"bcvMaxValue",Y.chapterDigitShifter-1),J(Ce,"ValidStatusType",po);class ln extends Error{}function gn({variant:e="outlined",id:n,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:c,isRequired:l=!1,className:u,defaultValue:d,value:p,onChange:f,onFocus:y,onBlur:g}){return k.jsx(ce.TextField,{variant:e,id:n,disabled:t,error:r,fullWidth:o,helperText:i,label:a,placeholder:c,required:l,className:`papi-textfield ${u??""}`,defaultValue:d,value:p,onChange:f,onFocus:y,onBlur:g})}let nt;const tt=()=>(nt||(nt=Re.allBookIds.map(e=>({bookId:e,label:Re.bookIdToEnglishName(e)}))),nt);function Oc({scrRef:e,handleSubmit:n,id:t}){const r=l=>{n(l)},o=(l,u)=>{const p={bookNum:Re.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(p)},i=l=>{n({...e,chapterNum:+l.target.value})},a=l=>{n({...e,verseNum:+l.target.value})},c=se.useMemo(()=>tt()[e.bookNum-1],[e.bookNum]);return k.jsxs("span",{id:t,children:[k.jsx(wn,{title:"Book",className:"papi-ref-selector book",value:c,options:tt(),onChange:o,isClearable:!1,width:200}),k.jsx(De,{onClick:()=>r(Se.offsetBook(e,-1)),isDisabled:e.bookNum<=Se.FIRST_SCR_BOOK_NUM,children:"<"}),k.jsx(De,{onClick:()=>r(Se.offsetBook(e,1)),isDisabled:e.bookNum>=tt().length,children:">"}),k.jsx(gn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),k.jsx(De,{onClick:()=>n(Se.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Se.FIRST_SCR_CHAPTER_NUM,children:"<"}),k.jsx(De,{onClick:()=>n(Se.offsetChapter(e,1)),isDisabled:e.chapterNum>=Se.getChaptersForBook(e.bookNum),children:">"}),k.jsx(gn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),k.jsx(De,{onClick:()=>n(Se.offsetVerse(e,-1)),isDisabled:e.verseNum<=Se.FIRST_SCR_VERSE_NUM,children:"<"}),k.jsx(De,{onClick:()=>n(Se.offsetVerse(e,1)),children:">"})]})}function Cc({onSearch:e,placeholder:n,isFullWidth:t}){const[r,o]=se.useState(""),i=a=>{o(a),e(a)};return k.jsx(ce.Paper,{component:"form",className:"search-bar-paper",children:k.jsx(gn,{isFullWidth:t,className:"search-bar-input",placeholder:n,value:r,onChange:a=>i(a.target.value)})})}function Rc({id:e,isDisabled:n=!1,orientation:t="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:c,value:l,valueLabelDisplay:u="off",className:d,onChange:p,onChangeCommitted:f}){return k.jsx(ce.Slider,{id:e,disabled:n,orientation:t,min:r,max:o,step:i,marks:a,defaultValue:c,value:l,valueLabelDisplay:u,className:`papi-slider ${t} ${d??""}`,onChange:p,onChangeCommitted:f})}function Pc({autoHideDuration:e=void 0,id:n,isOpen:t=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:c}){const l={action:(a==null?void 0:a.action)||c,message:a==null?void 0:a.message,className:r};return k.jsx(ce.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:i,id:n,ContentProps:l})}function Nc({id:e,isChecked:n,isDisabled:t=!1,hasError:r=!1,className:o,onChange:i}){return k.jsx(ce.Switch,{id:e,checked:n,disabled:t,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function vr({onRowChange:e,row:n,column:t}){const r=o=>{e({...n,[t.key]:o.target.value})};return k.jsx(gn,{defaultValue:n[t.key],onChange:r})}const _c=({onChange:e,disabled:n,checked:t,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return k.jsx(Tr,{...r,isChecked:t,isDisabled:n,onChange:o})};function $c({columns:e,sortColumns:n,onSortColumnsChange:t,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:c=!0,defaultColumnResizable:l=!0,rows:u,enableSelectColumn:d,selectColumnWidth:p=50,rowKeyGetter:f,rowHeight:y=35,headerRowHeight:g=35,selectedRows:b,onSelectedRowsChange:h,onRowsChange:T,onCellClick:F,onCellDoubleClick:v,onCellContextMenu:E,onCellKeyDown:m,direction:I="ltr",enableVirtualization:_=!0,onCopy:K,onPaste:Z,onScroll:P,className:G,id:q}){const ee=se.useMemo(()=>{const M=e.map(N=>typeof N.editable=="function"?{...N,editable:D=>!!N.editable(D),renderEditCell:N.renderEditCell||vr}:N.editable&&!N.renderEditCell?{...N,renderEditCell:vr}:N.renderEditCell&&!N.editable?{...N,editable:!1}:N);return d?[{..._t.SelectColumn,minWidth:p},...M]:M},[e,d,p]);return k.jsx(_t,{columns:ee,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:c,resizable:l},sortColumns:n,onSortColumnsChange:t,onColumnResize:r,rows:u,rowKeyGetter:f,rowHeight:y,headerRowHeight:g,selectedRows:b,onSelectedRowsChange:h,onRowsChange:T,onCellClick:F,onCellDoubleClick:v,onCellContextMenu:E,onCellKeyDown:m,direction:I,enableVirtualization:_,onCopy:K,onPaste:Z,onScroll:P,renderers:{renderCheckbox:_c},className:`papi-table ${G??"rdg-light"}`,id:q})}function Mc(e){return _e("MuiSvgIcon",e)}qe("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Ic=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Ac=e=>{const{color:n,fontSize:t,classes:r}=e,o={root:["root",n!=="inherit"&&`color${we(n)}`,`fontSize${we(t)}`]};return He(o,Mc,r)},jc=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.color!=="inherit"&&n[`color${we(t.color)}`],n[`fontSize${we(t.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var t,r,o,i,a,c,l,u,d,p,f,y,g;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(r=t.create)==null?void 0:r.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((c=e.typography)==null||(l=c.pxToRem)==null?void 0:l.call(c,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[n.fontSize],color:(p=(f=(e.vars||e).palette)==null||(f=f[n.color])==null?void 0:f.main)!=null?p:{action:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.active,disabled:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.disabled,inherit:void 0}[n.color]}}),Ot=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:c="svg",fontSize:l="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:p,viewBox:f="0 0 24 24"}=r,y=le(r,Ic),g=O.isValidElement(o)&&o.type==="svg",b=S({},r,{color:a,component:c,fontSize:l,instanceFontSize:n.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:g}),h={};d||(h.viewBox=f);const T=Ac(b);return k.jsxs(jc,S({as:c,className:Pe(T.root,i),focusable:"false",color:u,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:t},h,y,g&&o.props,{ownerState:b,children:[g?o.props.children:o,p?k.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Ot.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Ot.muiName="SvgIcon";const xr=Ot;function Dc(e,n){function t(r,o){return k.jsx(xr,S({"data-testid":`${n}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${n}Icon`),t.muiName=xr.muiName,O.memo(O.forwardRef(t))}const Bc=Dc(k.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Fc({menu:e,dataHandler:n,commandHandler:t,className:r,id:o,children:i}){const[a,c]=se.useState(!1),[l,u]=se.useState(!1),d=se.useCallback(()=>{a&&c(!1),u(!1)},[a]),p=se.useCallback(T=>{T.stopPropagation(),c(F=>{const v=!F;return v&&T.shiftKey?u(!0):v||u(!1),v})},[]),f=se.useRef(void 0),[y,g]=se.useState(0);se.useEffect(()=>{a&&f.current&&g(f.current.clientHeight)},[a]);const b=se.useCallback(T=>(d(),t(T)),[t,d]);let h=e;return!h&&n&&(h=n(l)),k.jsx("div",{ref:f,style:{position:"relative"},children:k.jsx(ce.AppBar,{position:"static",id:o,children:k.jsxs(ce.Toolbar,{className:`papi-toolbar ${r??""}`,variant:"dense",children:[h?k.jsx(ce.IconButton,{edge:"start",className:`papi-menuButton ${r??""}`,color:"inherit","aria-label":"open drawer",onClick:p,children:k.jsx(Bc,{})}):void 0,i?k.jsx("div",{className:"papi-menu-children",children:i}):void 0,h?k.jsx(ce.Drawer,{className:`papi-menu-drawer ${r??""}`,anchor:"left",variant:"persistent",open:a,onClose:d,PaperProps:{className:"papi-menu-drawer-paper",style:{top:y}},children:k.jsx(Sr,{className:r,commandHandler:b,columns:h.columns})}):void 0]})})})}const Lc=(e,n)=>{se.useEffect(()=>{if(!e)return()=>{};const t=e(n);return()=>{t()}},[e,n])};function Vc(e){return{preserveValue:!0,...e}}const ho=(e,n,t={})=>{const r=se.useRef(n);r.current=n;const o=se.useRef(t);o.current=Vc(o.current);const[i,a]=se.useState(()=>r.current),[c,l]=se.useState(!0);return se.useEffect(()=>{let u=!0;return l(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),l(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,c]},rt=()=>!1,zc=(e,n)=>{const[t]=ho(se.useCallback(async()=>{if(!e)return rt;const r=await Promise.resolve(e(n));return async()=>r()},[n,e]),rt,{preserveValue:!1});se.useEffect(()=>()=>{t!==rt&&t()},[t])};exports.Button=De;exports.ChapterRangeSelector=bo;exports.Checkbox=Tr;exports.ComboBox=wn;exports.ContextMenu=pc;exports.GridMenu=Sr;exports.IconButton=yo;exports.LabelPosition=Ve;exports.MenuItem=kr;exports.MenuItemList=ft;exports.RefSelector=Oc;exports.SearchBar=Cc;exports.Slider=Rc;exports.Snackbar=Pc;exports.Switch=Nc;exports.Table=$c;exports.TextField=gn;exports.Toolbar=Fc;exports.useEvent=Lc;exports.useEventAsync=zc;exports.usePromise=ho;function Uc(e,n="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),r=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&r?t.insertBefore(o,r):t.appendChild(o)}Uc(`.papi-button {
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
.papi-checkbox {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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

.papi-menu-column-header {
  background-color: rgb(181, 181, 181);
  padding-left: 24px;
  margin-top: 0;
}

.papi-multi-column-menu.paratext {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-multi-column-menu.paratext.bright {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
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
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
  }

@layer rdg.FocusSink {
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}
  }

@layer rdg.Cell {

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


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

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
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
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.papi-context-menu-target {
  white-space: nowrap;
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

.papi-menu-children {
  padding: 10px;
  position: relative;
}
`,"top");
//# sourceMappingURL=index.cjs.map
